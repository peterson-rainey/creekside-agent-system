"""
create_gmail_draft.py -- Create a Gmail draft with optional attachments.

Reference implementation: /tmp/update_shin_draft.py (2026-05-15).
Uses token_gmail_send.json from the creekside-pipelines repo for auth.

Usage:
    python3 create_gmail_draft.py --json '{"to": "...", "subject": "...", "body": "...", "attachments": [...]}'
    python3 create_gmail_draft.py  # reads JSON from stdin

Required JSON fields:
    to          str     recipient email address
    subject     str     email subject line
    body        str     plain text body (no HTML)

Optional JSON fields:
    attachments                 list of file paths to attach (must exist locally)
    delete_existing_draft_id    str -- if provided, deletes that draft before creating new one
    from_name                   str -- display name override (default: "Peterson Rainey")

Output:
    Prints draft ID and message ID on success (for agent to report to user).
    Exits 0 on success, 1 on failure.
"""

import argparse
import base64
import json
import os
import sys
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

TOKEN_PATH = "/Users/petersonrainey/creekside-pipelines/token_gmail_send.json"

try:
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
except ImportError:
    print(
        "ERROR: google-auth and google-api-python-client are required.\n"
        "Run: pip install google-auth google-auth-oauthlib google-api-python-client",
        file=sys.stderr,
    )
    sys.exit(1)


def load_service():
    if not os.path.exists(TOKEN_PATH):
        print(f"ERROR: Gmail token not found at {TOKEN_PATH}", file=sys.stderr)
        sys.exit(1)
    creds = Credentials.from_authorized_user_file(TOKEN_PATH)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
    return build("gmail", "v1", credentials=creds)


def delete_draft(service, draft_id: str):
    try:
        service.users().drafts().delete(userId="me", id=draft_id).execute()
        print(f"Deleted existing draft: {draft_id}")
    except Exception as e:
        print(f"Note: could not delete draft {draft_id} (may already be gone): {e}")


def build_message(params: dict) -> MIMEMultipart:
    msg = MIMEMultipart()
    msg["To"] = params["to"]
    msg["Subject"] = params["subject"]
    msg.attach(MIMEText(params["body"], "plain"))

    for path in params.get("attachments", []):
        if not os.path.exists(path):
            print(f"ERROR: Attachment not found: {path}", file=sys.stderr)
            sys.exit(1)
        filename = os.path.basename(path)
        with open(path, "rb") as f:
            data = f.read()

        # Determine MIME subtype from extension
        ext = os.path.splitext(filename)[1].lower()
        subtype_map = {
            ".docx": "vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".pdf": "pdf",
            ".xlsx": "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".png": "png",
            ".jpg": "jpeg",
            ".jpeg": "jpeg",
        }
        subtype = subtype_map.get(ext, "octet-stream")

        part = MIMEApplication(data, _subtype=subtype)
        part.add_header("Content-Disposition", "attachment", filename=filename)
        msg.attach(part)

    return msg


def create_draft(service, msg: MIMEMultipart) -> dict:
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")
    draft = service.users().drafts().create(
        userId="me", body={"message": {"raw": raw}}
    ).execute()
    return draft


def main():
    parser = argparse.ArgumentParser(description="Create a Gmail draft with attachments")
    parser.add_argument(
        "--json", dest="json_str",
        help="JSON string with draft parameters (reads from stdin if omitted)"
    )
    args = parser.parse_args()

    if args.json_str:
        params = json.loads(args.json_str)
    else:
        params = json.load(sys.stdin)

    # Validate required fields
    required = ["to", "subject", "body"]
    missing = [f for f in required if f not in params]
    if missing:
        print(f"ERROR: Missing required fields: {missing}", file=sys.stderr)
        sys.exit(1)

    service = load_service()

    # Delete old draft if requested
    old_draft_id = params.get("delete_existing_draft_id")
    if old_draft_id:
        delete_draft(service, old_draft_id)

    msg = build_message(params)
    draft = create_draft(service, msg)

    draft_id = draft["id"]
    message_id = draft["message"]["id"]
    print(f"Draft created successfully.")
    print(f"  Draft ID:   {draft_id}")
    print(f"  Message ID: {message_id}")
    print(f"  To: {params['to']}")
    print(f"  Subject: {params['subject']}")
    if params.get("attachments"):
        print(f"  Attachments: {len(params['attachments'])} file(s)")
        for a in params["attachments"]:
            print(f"    - {os.path.basename(a)}")
    print(f"\nReady to review in Gmail Drafts.")


if __name__ == "__main__":
    main()
