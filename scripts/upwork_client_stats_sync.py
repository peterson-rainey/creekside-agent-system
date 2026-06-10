#!/usr/bin/env python3
"""
Upwork Client Stats Sync -- runs daily via launchd.

For recent applications in upwork_jobs, looks each job up in the Upwork
marketplaceJobPostingsSearch API (only works while the job is still OPEN)
and snapshots client stats + applicant count into the DB:

    client_rating, client_review_count, client_jobs_posted,
    client_total_spent, client_total_hires, api_total_applicants,
    client_stats_synced_at

Also fills payment_verified and job_posting_uid when they are null.

Modes:
    python3 upwork_client_stats_sync.py                  # rows from last 5 days, not yet synced
    python3 upwork_client_stats_sync.py --backfill-active # all rows with job_workflow_state=ACTIVE

No AI needed -- purely mechanical. Uses PostgREST table endpoints.
Upwork auth via ~/upwork-api/upwork_auth.py (auto-refreshing token).
"""

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

sys.path.insert(0, os.path.expanduser('~/upwork-api'))
from upwork_auth import upwork_graphql  # noqa: E402


def load_env_from_zshrc():
    """Load env vars from .zshrc for launchd (which doesn't inherit shell env)."""
    zshrc = os.path.expanduser('~/.zshrc')
    if not os.path.exists(zshrc):
        return
    with open(zshrc) as f:
        for line in f:
            line = line.strip()
            if line.startswith('#') or '=' not in line:
                continue
            m = re.match(r'export\s+(\w+)=["\']?([^"\'#]*)["\']?', line)
            if m and m.group(1) not in os.environ:
                os.environ[m.group(1)] = m.group(2).strip()


load_env_from_zshrc()

SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://suhnpazajrmfcmbwckkx.supabase.co')
SUPABASE_URL = SUPABASE_URL.rstrip('/').removesuffix('/rest/v1').removesuffix('/rest')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
LOG_FILE = os.path.expanduser('~/logs/upwork-client-stats.log')
LOOKBACK_DAYS = 5
SEARCH_SLEEP_SECONDS = 1.0

HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
}

SEARCH_QUERY = '''
query($f: MarketplaceJobPostingsSearchFilter) {
  marketplaceJobPostingsSearch(marketPlaceJobFilter: $f, searchType: USER_JOBS_SEARCH, sortAttributes: [{field: RECENCY}]) {
    edges { node {
      id
      title
      totalApplicants
      applied
      client {
        totalHires
        totalPostedJobs
        totalSpent { rawValue }
        totalReviews
        totalFeedback
        verificationStatus
      }
    } }
  }
}
'''


def log(msg: str):
    ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f'[{ts}] {msg}'
    print(line)
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    with open(LOG_FILE, 'a') as f:
        f.write(line + '\n')


def postgrest_get(table: str, params: str, select: str = '*') -> list:
    url = f'{SUPABASE_URL}/rest/v1/{table}?select={select}&{params}'
    req = urllib.request.Request(url, headers=HEADERS, method='GET')
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def postgrest_patch(table: str, params: str, body: dict) -> list:
    url = f'{SUPABASE_URL}/rest/v1/{table}?{params}'
    data = json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, headers=HEADERS, method='PATCH')
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def search_job(title: str):
    """Search Upwork by exact full title. Returns list of result nodes."""
    variables = {'f': {
        'titleExpression_eq': title,
        # 'after' MUST be "0" -- omitting it causes an upstream 500
        'pagination_eq': {'after': '0', 'first': 10},
    }}
    result = upwork_graphql(SEARCH_QUERY, variables)
    search = (result.get('data') or {}).get('marketplaceJobPostingsSearch') or {}
    return [e['node'] for e in (search.get('edges') or [])]


def match_node(nodes: list, job_uid, title: str):
    """Match a search result to our DB row. Prefer uid match; fall back to
    exact title + applied=true when uid is missing (and the match is unique)."""
    if job_uid:
        for n in nodes:
            if str(n['id']) == str(job_uid):
                return n
        return None
    candidates = [n for n in nodes if n['title'] == title and n['applied']]
    return candidates[0] if len(candidates) == 1 else None


def build_patch(node: dict, row: dict) -> dict:
    client = node['client'] or {}
    spent = (client.get('totalSpent') or {}).get('rawValue')
    patch = {
        'client_rating': client.get('totalFeedback'),
        'client_review_count': client.get('totalReviews'),
        'client_jobs_posted': client.get('totalPostedJobs'),
        'client_total_spent': float(spent) if spent is not None else None,
        'client_total_hires': client.get('totalHires'),
        'api_total_applicants': node.get('totalApplicants'),
        'client_stats_synced_at': datetime.now().astimezone().isoformat(),
    }
    # Bonus fills -- only when currently null in the DB
    if row.get('payment_verified') is None and client.get('verificationStatus') is not None:
        patch['payment_verified'] = client['verificationStatus'] == 'VERIFIED'
    if not row.get('job_posting_uid'):
        patch['job_posting_uid'] = str(node['id'])
    return patch


def main():
    backfill_active = '--backfill-active' in sys.argv

    if not SUPABASE_KEY:
        log('ERROR: SUPABASE_SERVICE_ROLE_KEY not set')
        sys.exit(1)

    select = 'id,job_name,job_posting_uid,payment_verified,application_date'
    if backfill_active:
        params = 'job_workflow_state=eq.ACTIVE&client_stats_synced_at=is.null&order=application_date.desc'
    else:
        cutoff = (datetime.now() - timedelta(days=LOOKBACK_DAYS)).strftime('%Y-%m-%d')
        params = (f'client_stats_synced_at=is.null&application_date=gte.{cutoff}'
                  f'&order=application_date.desc')

    rows = postgrest_get('upwork_jobs', params, select)
    log(f'Run start ({"backfill-active" if backfill_active else "daily"}): {len(rows)} rows to sync')

    synced = missed = errors = 0
    for row in rows:
        title = (row.get('job_name') or '').strip()
        if not title:
            continue
        try:
            nodes = search_job(title)
            node = match_node(nodes, row.get('job_posting_uid'), title)
            if node is None:
                missed += 1
            else:
                patch = build_patch(node, row)
                postgrest_patch('upwork_jobs', f'id=eq.{row["id"]}', patch)
                synced += 1
        except Exception as e:
            errors += 1
            log(f'  ERROR on "{title[:60]}": {str(e)[:200]}')
        time.sleep(SEARCH_SLEEP_SECONDS)

    log(f'Run done: {synced} synced, {missed} not found in search (likely closed), {errors} errors')


if __name__ == '__main__':
    main()
