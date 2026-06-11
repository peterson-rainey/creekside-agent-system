#!/usr/bin/env python3
"""GA4 Data API query tool for Creekside agents.

Auth: user OAuth (same pattern as gdrive_pipeline). One-time browser consent,
then the token at ~/.creekside-keys/token_ga4.json auto-refreshes.

Usage:
  python3 scripts/ga4_query.py auth                      # one-time consent flow
  python3 scripts/ga4_query.py properties                # list GA4 properties (find numeric IDs)
  python3 scripts/ga4_query.py events [--days 7]         # event counts for the dental LP property
  python3 scripts/ga4_query.py report --dimensions eventName,deviceCategory \
      --metrics eventCount [--days 7] [--property 123456]

Default property is set via GA4_PROPERTY_ID below (numeric GA4 property ID,
not the G- measurement ID).
"""

import argparse
import json
import os
import sys

CREDENTIALS_FILE = os.path.expanduser("~/gdrive_pipeline/credentials.json")
TOKEN_FILE = os.path.expanduser("~/.creekside-keys/token_ga4.json")
SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]

# "Dental LP" property (measurement ID G-REHLM40KCD), Creekside Marketing account.
# Other Creekside properties: Main site 388420570, Dental Calculator 522262712.
# Override per-call with --property or the GA4_PROPERTY_ID env var.
GA4_PROPERTY_ID = os.environ.get("GA4_PROPERTY_ID", "522247053")


def get_credentials():
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials

    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        save_token(creds)
    if not creds or not creds.valid:
        from google_auth_oauthlib.flow import InstalledAppFlow

        flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
        creds = flow.run_local_server(port=0)
        save_token(creds)
    return creds


def save_token(creds):
    os.makedirs(os.path.dirname(TOKEN_FILE), exist_ok=True)
    with open(TOKEN_FILE, "w") as f:
        f.write(creds.to_json())
    os.chmod(TOKEN_FILE, 0o600)


def cmd_auth(_args):
    get_credentials()
    print(f"OK -- token saved to {TOKEN_FILE}")


def cmd_properties(_args):
    from googleapiclient.discovery import build

    admin = build("analyticsadmin", "v1beta", credentials=get_credentials())
    resp = admin.accountSummaries().list().execute()
    for acct in resp.get("accountSummaries", []):
        print(f"Account: {acct.get('displayName')} ({acct.get('account')})")
        for prop in acct.get("propertySummaries", []):
            prop_id = prop.get("property", "").split("/")[-1]
            print(f"  Property: {prop.get('displayName')}  id={prop_id}")


def run_report(prop_id, dimensions, metrics, days):
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange,
        Dimension,
        Metric,
        RunReportRequest,
    )

    client = BetaAnalyticsDataClient(credentials=get_credentials())
    request = RunReportRequest(
        property=f"properties/{prop_id}",
        dimensions=[Dimension(name=d) for d in dimensions],
        metrics=[Metric(name=m) for m in metrics],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        limit=250,
    )
    resp = client.run_report(request)
    header = [d.name for d in resp.dimension_headers] + [m.name for m in resp.metric_headers]
    print("\t".join(header))
    for row in resp.rows:
        vals = [v.value for v in row.dimension_values] + [v.value for v in row.metric_values]
        print("\t".join(vals))


def resolve_property(args):
    prop_id = getattr(args, "property", None) or GA4_PROPERTY_ID
    if not prop_id:
        sys.exit("No property ID. Run `properties` to discover, then pass --property or set GA4_PROPERTY_ID.")
    return prop_id


def cmd_events(args):
    run_report(resolve_property(args), ["eventName"], ["eventCount", "totalUsers"], args.days)


def cmd_report(args):
    run_report(
        resolve_property(args),
        [d for d in args.dimensions.split(",") if d],
        [m for m in args.metrics.split(",") if m],
        args.days,
    )


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("auth")
    sub.add_parser("properties")

    pe = sub.add_parser("events")
    pe.add_argument("--days", type=int, default=7)
    pe.add_argument("--property", default=None)

    pr = sub.add_parser("report")
    pr.add_argument("--dimensions", required=True)
    pr.add_argument("--metrics", required=True)
    pr.add_argument("--days", type=int, default=7)
    pr.add_argument("--property", default=None)

    args = p.parse_args()
    {"auth": cmd_auth, "properties": cmd_properties, "events": cmd_events, "report": cmd_report}[args.cmd](args)


if __name__ == "__main__":
    main()
