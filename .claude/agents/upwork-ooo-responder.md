---
name: upwork-ooo-responder
description: LOCAL scheduled routine (launchd, every 30 min). Sends a single out-of-office message on Peterson's Upwork account when client messages go unanswered outside business hours (Mon-Fri 8am-6pm CT, Sat 8am-12pm CT). Timer accumulates only outside business hours and pauses when Queenie is working. Never double-sends (48-hour cooldown per room). Peterson's profile only. Status=draft -- Peterson must review OOO message template and manually activate (launchplist load) before going live.
model: sonnet
agent_type: scheduled-task
department: operations
tools:
  - Bash
read_only: false
---

# Upwork OOO Responder

You are a stub agent entry for the `upwork-ooo-responder` routine. This agent is implemented as a fully deterministic Python script -- no AI calls are made at runtime.

## Implementation

**Script:** `~/upwork-api/upwork_ooo.py`
**Ledger:** `~/upwork-api/.ooo-ledger.json`
**Log:** `~/logs/upwork-ooo.log`
**Plist:** `~/Library/LaunchAgents/com.creekside.upwork-ooo.plist`

## Status: DRAFT

Peterson must review and approve the OOO message template before activating.

The OOO_MESSAGE constant is at the top of `upwork_ooo.py` -- easy to edit.

To arm the launchd job after approval:
```bash
launchctl load ~/Library/LaunchAgents/com.creekside.upwork-ooo.plist
```

To disable:
```bash
launchctl unload ~/Library/LaunchAgents/com.creekside.upwork-ooo.plist
```

To run manually (one-off test):
```bash
python3 ~/upwork-api/upwork_ooo.py
```

## Business Logic (in the script)

**Business hours (America/Chicago):**
- Mon-Fri: 8:00 AM - 6:00 PM CT
- Sat: 8:00 AM - 12:00 PM CT
- Sun: OFF

**Send conditions (ALL must be true):**
1. Currently outside business hours
2. A client message exists in the room that has NOT been replied to (no message from us after their last message)
3. Client's last message is at least 30 minutes old (handles typing bursts)
4. 3+ hours have elapsed OUTSIDE business hours since the client's last message (the timer pauses during business hours)
5. If the client messaged during business hours, business hours must have ended before the OOO fires (Queenie's window to respond)
6. No OOO sent to this room in the last 48 hours (ledger check)

**Timer pause rule:** The 3-hour outside-hours threshold accumulates only during non-business periods. Example:
- Client messages at 4:30 AM Saturday (outside BH)
- Timer runs from 4:30 AM to 8:00 AM (3.5h) -- threshold hit at ~7:30 AM, OOO sends
- If still unanswered at 8:00 AM, Queenie has the room for the morning (BH start)
- After 12:00 PM Saturday (BH end), if still unanswered, timer restarts -- OOO fires at 3:00 PM

**What it does NOT do:**
- Does NOT send during business hours
- Does NOT send if we already replied after the client's message
- Does NOT double-send to the same room within 48 hours
- Does NOT cover Lindsey's Upwork profile
- Does NOT use Claude / AI -- pure deterministic Python

## Auth and Credentials

Uses `~/upwork-api/upwork_auth.py` for Upwork GraphQL authentication.
Service role key: `~/upwork-api/.supabase-key` (same fallback chain as all ~/upwork-api/ scripts).

## Error Handling

- Individual room failures do not abort the run (logged, counted)
- Fatal failures (room list fetch failure) write a `pipeline_alerts` row with severity=high
- All output logged to `~/logs/upwork-ooo.log`

## Supabase Project

Project ID: `suhnpazajrmfcmbwckkx`

## Access Requirements

This routine is admin-only (Peterson's Upwork OAuth tokens). Contractors cannot run it.

- Requires `~/upwork-api/tokens.json` (Upwork OAuth)
- Requires `~/upwork-api/.supabase-key` or SUPABASE_SERVICE_ROLE_KEY (for pipeline_alert writes)
- Requires `~/upwork-api/upwork_auth.py` to be importable

## Critic Spec (Tier 3)

The following checks apply to the operation of this routine. They are enforced deterministically in the script itself, not by a separate validator.

1. OOO message MUST NOT be sent if `is_business_hours(now_utc)` returns True -- BLOCK
2. OOO message MUST NOT be sent if our last message in the room is newer than the client's last message -- BLOCK
3. OOO message MUST NOT be sent if client's last message is less than 30 minutes old -- BLOCK
4. OOO message MUST NOT be sent to a room that received an OOO within the last 48 hours (ledger check) -- BLOCK
5. OOO message MUST NOT be sent if client messaged during business hours and business hours have not yet ended -- BLOCK
6. Timer must accumulate ONLY outside-business-hours minutes (business hours pause the clock) -- BLOCK
7. Ledger MUST be updated immediately after a successful send before processing the next room -- BLOCK
8. Failed sends (API error, no story_id returned) MUST be logged as errors and NOT update the ledger -- BLOCK
9. Rate limit: MUST include 0.15s delay between all Upwork API calls -- WARN
10. Fatal errors (room list fetch failure) MUST write a pipeline_alert entry -- WARN
