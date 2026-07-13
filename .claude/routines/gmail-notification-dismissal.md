---
name: gmail-notification-dismissal
description: Daily 8 AM CT. Scans the [GPS] Peterson Gmail label for self-sent system notification emails and dismisses the ones already handled. Dismiss = remove label + UNREAD flag. Runs as a local launchd routine (NOT Railway -- requires local Gmail OAuth token). Deterministic python script, no LLM calls.
---

You are the gmail-notification-dismissal routine for Creekside Marketing.

Your job is to invoke the dismissal script, verify it ran cleanly, and report any failures that need Peterson's attention.

## What This Routine Does

Runs `scripts/gmail_notification_dismissal.py` once. The script:

1. Connects to Gmail via the local OAuth token at `~/gdrive_pipeline/token_gmail.json`.
2. Fetches all threads in the `[#1. [GPS] Peterson]` label (label ID `Label_4515801409617459764`).
3. Evaluates each thread against the four dismissal rules below.
4. Removes `Label_4515801409617459764` + `UNREAD` from threads that pass their rule.
5. Logs every action (dismiss/keep/skip) to `~/logs/gmail-notification-dismissal.log`.

NEVER deletes or trashes anything. NEVER touches emails from human senders. Only the four exact subject patterns are eligible.

## Dismissal Rules (in the script)

| Subject pattern | Dismiss when... |
|---|---|
| `[Auto-Remediation] ACTION REQUIRED: ...` | A NEWER ACTION REQUIRED thread exists (superseded). Keep the newest one always. |
| `[Auto-Remediation] chronic:<pipeline>/<alert_type> ...` | All `pipeline_alerts` rows for that pipeline/alert_type are acknowledged/resolved, OR no new alerts of that type in last 48h. |
| `[Agent Disabled] <agent-name>` | The agent is `enabled=true` again in `scheduled_agents`, OR its description contains a deliberate-disable marker (e.g. `[DISABLED 2026-07-11 ...]` or `[LOCAL-ONLY — DISABLED ...]`). |
| `Daily Status Brief - YYYY-MM-DD` | The date is not today (yesterday's brief is stale by 8 AM). |

## Invocation (launchd runs this automatically)

```bash
cd /Users/petersonrainey/C-Code\ -\ Rag\ database
python3 scripts/gmail_notification_dismissal.py
```

Logs: `~/logs/gmail-notification-dismissal.log`

## On Failure

If the script exits non-zero or the log contains `[FATAL]` or `[UNHANDLED EXCEPTION]`:

1. Read the log: `tail -50 ~/logs/gmail-notification-dismissal.log`
2. Common causes:
   - Gmail token expired: re-auth via `cd ~/gdrive_pipeline && python3 drive_crawler.py` (this refreshes the token)
   - `SUPABASE_SERVICE_ROLE_KEY` missing from `~/gdrive_pipeline/.env`
   - `google-api-python-client` not installed: `pip install google-api-python-client google-auth-oauthlib`
3. Re-run manually once fixed.

## Access Requirements

This routine is admin-only. It depends on:

- `~/gdrive_pipeline/token_gmail.json` -- local Gmail OAuth token (peterson@ account, gmail.modify scope). Contractors do not have this.
- `~/gdrive_pipeline/.env` -- contains `SUPABASE_SERVICE_ROLE_KEY`.
- `google-api-python-client` Python package (installed on Peterson's Mac).
