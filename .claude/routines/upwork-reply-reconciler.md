---
name: upwork-reply-reconciler
description: Sundays 9am CT. Checks Upwork messages from the past week (Friday to previous Friday) for client replies with no matching ClickUp lead. Reports missed leads via pipeline_alert.
---

You are the Upwork reply reconciler. Run the following deterministic steps exactly as written.

Read the full methodology from `.claude/agents/upwork-reply-reconciler.md` before starting.

## DETERMINISTIC STEPS

### Step 0: Check for corrections

```sql
SELECT title, content FROM agent_knowledge
WHERE type = 'correction'
AND (content ILIKE '%upwork%reconcil%' OR title ILIKE '%upwork%reconcil%')
ORDER BY created_at DESC LIMIT 5;
```

### Step 1: Run the reconciliation script

```bash
cd /Users/petersonrainey && python3 - << 'PYEOF'
import sys
import json
import time
import traceback
from datetime import date, datetime, timedelta, timezone

# --- Auth ---
sys.path.insert(0, '/Users/petersonrainey/upwork-api')
from upwork_auth import upwork_graphql

# --- Supabase (service role key) ---
import os
from pathlib import Path

def get_supabase_key():
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if not key:
        key_file = Path('/Users/petersonrainey/upwork-api/.supabase-key')
        if key_file.exists():
            key = key_file.read_text().strip()
    if not key:
        settings = Path('/Users/petersonrainey/C-Code - Rag database/.claude/settings.local.json')
        if settings.exists():
            import json as _j
            env = _j.loads(settings.read_text()).get("env", {})
            key = env.get("SUPABASE_SERVICE_ROLE_KEY", "")
    if not key:
        raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY not found")
    return key

import urllib.request
import urllib.parse

SUPABASE_URL = "https://suhnpazajrmfcmbwckkx.supabase.co"

def sb_rpc(func_name, params, key):
    """Call a Supabase RPC function."""
    url = f"{SUPABASE_URL}/rest/v1/rpc/{func_name}"
    body = json.dumps(params).encode()
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("apikey", key)
    req.add_header("Authorization", f"Bearer {key}")
    req.add_header("Content-Type", "application/json")
    resp = urllib.request.urlopen(req, timeout=30)
    return json.loads(resp.read())

def sb_insert(table, row, key):
    """Insert a row into a Supabase table."""
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    body = json.dumps(row).encode()
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("apikey", key)
    req.add_header("Authorization", f"Bearer {key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Prefer", "return=minimal")
    urllib.request.urlopen(req, timeout=30)

def sb_select(table, select, filters, key):
    """SELECT from a Supabase table with optional filters dict."""
    params = {"select": select}
    params.update(filters)
    qs = urllib.parse.urlencode(params)
    url = f"{SUPABASE_URL}/rest/v1/{table}?{qs}"
    req = urllib.request.Request(url)
    req.add_header("apikey", key)
    req.add_header("Authorization", f"Bearer {key}")
    req.add_header("Prefer", "count=exact")
    resp = urllib.request.urlopen(req, timeout=30)
    return json.loads(resp.read())

# --- Window ---
today = date.today()
window_end = today - timedelta(days=2)    # Friday
window_start = window_end - timedelta(days=7)  # previous Friday

window_start_dt = datetime(window_start.year, window_start.month, window_start.day, tzinfo=timezone.utc)
window_end_dt = datetime(window_end.year, window_end.month, window_end.day, 23, 59, 59, tzinfo=timezone.utc)

print(f"=== UPWORK REPLY RECONCILER ===")
print(f"Run date: {today}")
print(f"Review window: {window_start} to {window_end}")
print()

# --- Queries ---
ROOMLIST_PAGE = (
    '{roomList(filter:{roomType_eq:ALL},pagination:{first:200%s})'
    '{pageInfo{endCursor}'
    ' edges{node{id roomName latestStory{createdDateTime}}}}}'
)

ROOM_STORIES = (
    '{roomStories(filter:{roomId_eq:"%s",storyFilter:{pagination:{first:500}}})'
    '{edges{node{createdDateTime message user{name}}}}}'
)

DELAY = 0.15
OUR_SENDER_KEYWORDS = ["peterson", "samuel", "creekside"]

def parse_dt(s):
    if not s:
        return None
    return datetime.fromisoformat(s.replace("Z", "+00:00"))

def is_our_message(sender_name):
    if not sender_name:
        return False
    n = sender_name.lower()
    return any(kw in n for kw in OUR_SENDER_KEYWORDS)

def fetch_all_rooms():
    rooms = []
    cursor = None
    while True:
        after = ',after:"%s"' % cursor if cursor else ""
        r = upwork_graphql(ROOMLIST_PAGE % after)
        rl = (r.get("data") or {}).get("roomList")
        edges = (rl or {}).get("edges")
        if not edges:
            break
        for e in edges:
            n = (e or {}).get("node")
            if n:
                rooms.append(n)
        cursor = (rl.get("pageInfo") or {}).get("endCursor")
        if not cursor:
            break
        time.sleep(DELAY)
    return rooms

def fetch_client_messages(room_id):
    try:
        r = upwork_graphql(ROOM_STORIES % room_id)
        rs = (r.get("data") or {}).get("roomStories")
        if rs is None:
            return None
        client_msgs = []
        for e in rs.get("edges") or []:
            n = (e or {}).get("node")
            if not n:
                continue  # system story
            ts = parse_dt(n.get("createdDateTime"))
            if not ts:
                continue
            if ts < window_start_dt or ts > window_end_dt:
                continue
            sender = (n.get("user") or {}).get("name", "")
            if is_our_message(sender):
                continue
            client_msgs.append({
                "sender": sender,
                "timestamp": ts.isoformat(),
                "message": (n.get("message") or "")[:200],
            })
        time.sleep(DELAY)
        return client_msgs
    except Exception as e:
        print(f"  WARNING: message fetch error for {room_id}: {e}")
        return None

try:
    sk = get_supabase_key()

    # Step 1: Load upwork_leads for matching
    print("Loading upwork_leads...")
    leads_raw = sb_select("upwork_leads", "lead_name,clickup_task_id", {}, sk)
    lead_names_lower = set()
    for row in leads_raw:
        if row.get("lead_name"):
            lead_names_lower.add(row["lead_name"].strip().lower())
    print(f"  Loaded {len(lead_names_lower)} leads from upwork_leads")

    def has_matching_lead(room_name):
        if not room_name:
            return False
        rn = room_name.strip().lower()
        for lead in lead_names_lower:
            if lead in rn or rn in lead:
                return True
        return False

    # Step 2: Fetch all rooms
    print("Fetching all Upwork rooms...")
    all_rooms = fetch_all_rooms()
    print(f"  Total rooms fetched: {len(all_rooms)}")

    # Step 3: Pre-filter by window
    active_rooms = []
    for room in all_rooms:
        latest = parse_dt((room.get("latestStory") or {}).get("createdDateTime"))
        if latest and latest >= window_start_dt:
            active_rooms.append(room)
    print(f"  Rooms with activity in window: {len(active_rooms)}")

    # Step 4: Fetch messages and find client replies
    rooms_with_client_replies = {}
    skipped = 0
    for room in active_rooms:
        room_id = room["id"]
        room_name = room.get("roomName") or ""
        msgs = fetch_client_messages(room_id)
        if msgs is None:
            skipped += 1
            continue
        if msgs:
            rooms_with_client_replies[room_name] = {
                "room_id": room_id,
                "messages": msgs,
            }

    print(f"  Rooms with client replies in window: {len(rooms_with_client_replies)}")
    if skipped:
        print(f"  Rooms skipped (fetch error): {skipped}")

    # Step 5: Cross-reference
    missed_leads = []
    matched_count = 0
    for room_name, data in rooms_with_client_replies.items():
        if has_matching_lead(room_name):
            matched_count += 1
        else:
            msgs = data["messages"]
            missed_leads.append({
                "room_name": room_name,
                "room_id": data["room_id"],
                "client_message_count": len(msgs),
                "first_reply_date": msgs[0]["timestamp"][:10],
                "last_reply_date": msgs[-1]["timestamp"][:10],
                "sample_sender": msgs[0]["sender"],
            })

    print(f"  Rooms matched to existing leads: {matched_count}")
    print(f"  Missed leads: {len(missed_leads)}")
    print()

    # Step 6a: pipeline_alert if missed leads found
    if missed_leads:
        names_list = ", ".join(m["room_name"] for m in missed_leads[:10])
        if len(missed_leads) > 10:
            names_list += f" ... and {len(missed_leads) - 10} more"
        alert_msg = (
            f"Upwork reply reconciler found {len(missed_leads)} missed lead(s) "
            f"for week of {window_start} to {window_end}. "
            f"Client replied on Upwork with no ClickUp lead: {names_list}"
        )
        sb_insert("pipeline_alerts", {
            "pipeline_name": "upwork-reply-reconciler",
            "alert_type": "missed_leads",
            "message": alert_msg,
            "severity": "high",
            "source": "upwork-reply-reconciler",
            "details": json.dumps({"missed_leads": missed_leads, "window_start": str(window_start), "window_end": str(window_end)}),
            "acknowledged": False,
            "status": "open",
        }, sk)
        print(f"pipeline_alert created: severity=high")

    # Step 6b: quality_audit entry (always)
    run_date_str = str(today)
    title = f"Upwork Reply Reconciliation -- {run_date_str}"
    report_lines = [
        f"# Upwork Reply Reconciliation -- {run_date_str}",
        f"Review window: {window_start} to {window_end}",
        f"",
        f"## Summary",
        f"- Total rooms fetched: {len(all_rooms)}",
        f"- Rooms with activity in window: {len(active_rooms)}",
        f"- Rooms with client replies: {len(rooms_with_client_replies)}",
        f"- Rooms matched to existing leads: {matched_count}",
        f"- Missed leads: {len(missed_leads)}",
        f"- Rooms skipped (fetch error): {skipped}",
        f"",
    ]
    if missed_leads:
        report_lines.append("## Missed Leads")
        for i, m in enumerate(missed_leads, 1):
            report_lines += [
                f"{i}. {m['room_name']}",
                f"   Sender: {m['sample_sender']}",
                f"   Replies: {m['client_message_count']} message(s), {m['first_reply_date']} to {m['last_reply_date']}",
                f"   Room ID: {m['room_id']}",
                "",
            ]
    else:
        report_lines.append("## Result\nNo missed leads. All client replies matched to existing ClickUp leads.")

    report_content = "\n".join(report_lines)

    # Check for existing entry (if run twice same day)
    existing = sb_select("agent_knowledge", "id", {"title": f"eq.{title}", "type": "eq.quality_audit"}, sk)
    if existing:
        # UPDATE
        url = f"{SUPABASE_URL}/rest/v1/agent_knowledge?title=eq.{urllib.parse.quote(title)}&type=eq.quality_audit"
        body = json.dumps({"content": report_content}).encode()
        req = urllib.request.Request(url, data=body, method="PATCH")
        req.add_header("apikey", sk)
        req.add_header("Authorization", f"Bearer {sk}")
        req.add_header("Content-Type", "application/json")
        req.add_header("Prefer", "return=minimal")
        urllib.request.urlopen(req, timeout=30)
        print(f"Quality audit UPDATED in agent_knowledge: {title}")
    else:
        sb_insert("agent_knowledge", {
            "type": "quality_audit",
            "title": title,
            "content": report_content,
            "tags": ["upwork", "reconciliation", "lead-tracking"],
            "source_context": "upwork-reply-reconciler Sunday run",
            "confidence": "verified",
        }, sk)
        print(f"Quality audit saved to agent_knowledge: {title}")

    # Step 7: Print final report
    print()
    print("=== FINAL REPORT ===")
    print(report_content)

except Exception as exc:
    tb = traceback.format_exc()
    print(f"ERROR: {exc}")
    print(tb)
    # Attempt to log to pipeline_alerts
    try:
        sk2 = get_supabase_key()
        sb_insert("pipeline_alerts", {
            "pipeline_name": "upwork-reply-reconciler",
            "alert_type": "agent_error",
            "message": f"upwork-reply-reconciler failed: {str(exc)[:300]}",
            "severity": "high",
            "source": "upwork-reply-reconciler",
            "details": json.dumps({"traceback": tb[:2000]}),
            "acknowledged": False,
            "status": "open",
        }, sk2)
    except Exception:
        pass
    sys.exit(1)

PYEOF
```

## Supabase

Project ID: `suhnpazajrmfcmbwckkx`
Use `mcp__claude_ai_Supabase__execute_sql` for all database queries in Step 0.

## Rules

- This runs Sundays only. The window is always Friday-to-Friday (2 days back to 9 days back).
- Peterson's profile only. Lindsey's Upwork account is not accessible.
- Do NOT use `viewedByClient` -- always False, meaningless.
- Rate limit: 0.15s delay between API calls.
- Skip null nodes in story edges (system stories).
- Always save the quality_audit entry even if no missed leads found.
