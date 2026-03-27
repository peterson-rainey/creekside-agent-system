#!/bin/bash
# SessionStart hook: Load pending action items, recent session context, corrections,
# and overnight failure alerts. Gives every new chat full context from prior sessions.
# Fails silently on any error — never blocks session start.

SUPABASE_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Skip if no key available
[ -z "$KEY" ] && exit 0

OUTPUT=""

# --- 1. Pending Action Items ---
ACTION_ITEMS=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/rpc/get_pending_action_items" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" \
  -d '{"max_items": 10}' 2>/dev/null)

if [ -n "$ACTION_ITEMS" ] && ! echo "$ACTION_ITEMS" | grep -q '"code"'; then
  AI_COUNT=$(echo "$ACTION_ITEMS" | jq -r 'length' 2>/dev/null)
  if [ "$AI_COUNT" != "0" ] && [ -n "$AI_COUNT" ]; then
    AI_LIST=$(echo "$ACTION_ITEMS" | jq -r '.[] | "  [\(.priority)] \(.category): \(.title)"' 2>/dev/null)
    OUTPUT="${OUTPUT}PENDING ACTION ITEMS (${AI_COUNT}):\n${AI_LIST}\n\n"
  fi
fi

# --- 2. Recent Session Context (last 3 sessions, now with key_decisions) ---
SESSIONS=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/chat_sessions?order=session_date.desc&limit=3&select=title,session_date,key_decisions,items_pending,next_steps" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" 2>/dev/null)

if [ -n "$SESSIONS" ] && ! echo "$SESSIONS" | grep -q '"code"'; then
  S_COUNT=$(echo "$SESSIONS" | jq -r 'length' 2>/dev/null)
  if [ "$S_COUNT" != "0" ] && [ -n "$S_COUNT" ]; then
    S_LIST=$(echo "$SESSIONS" | jq -r '.[] | "  [\(.session_date)] \(.title)\n    Decisions: \(.key_decisions // "none")\n    Pending: \(.items_pending // "none")\n    Next: \(.next_steps // "none")"' 2>/dev/null)
    OUTPUT="${OUTPUT}RECENT SESSIONS:\n${S_LIST}\n\n"
  fi
fi

# --- 3. Recent Corrections (last 3, FULL content so agent has them in working memory) ---
CORRECTIONS=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/agent_knowledge?type=eq.correction&order=created_at.desc&limit=3&select=title,content,created_at" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" 2>/dev/null)

if [ -n "$CORRECTIONS" ] && ! echo "$CORRECTIONS" | grep -q '"code"'; then
  C_COUNT=$(echo "$CORRECTIONS" | jq -r 'length' 2>/dev/null)
  if [ "$C_COUNT" != "0" ] && [ -n "$C_COUNT" ]; then
    C_LIST=$(echo "$CORRECTIONS" | jq -r '.[] | "  - \(.title) [\(.created_at | split("T")[0])]: \(.content | split("\n")[0])"' 2>/dev/null)
    OUTPUT="${OUTPUT}ACTIVE CORRECTIONS (${C_COUNT} — obey these rules):\n${C_LIST}\n\n"
  fi
fi

# --- 4. Overnight Failures (pipeline + agent failures in last 24h) ---
FAILURES=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/pipeline_alerts?severity=in.(high,critical)&acknowledged=eq.false&created_at=gte.$(date -u -v-24H +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ 2>/dev/null)&select=pipeline_name,alert_type,message,created_at&order=created_at.desc&limit=5" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" 2>/dev/null)

if [ -n "$FAILURES" ] && ! echo "$FAILURES" | grep -q '"code"'; then
  F_COUNT=$(echo "$FAILURES" | jq -r 'length' 2>/dev/null)
  if [ "$F_COUNT" != "0" ] && [ "$F_COUNT" != "null" ] && [ -n "$F_COUNT" ]; then
    F_LIST=$(echo "$FAILURES" | jq -r '.[] | "  ⚠ [\(.alert_type)] \(.pipeline_name // "unknown"): \(.message | .[0:150])"' 2>/dev/null)
    OUTPUT="${OUTPUT}OVERNIGHT FAILURES (${F_COUNT} unacknowledged):\n${F_LIST}\n\n"
  fi
fi

# Also check for failed scheduled agent runs
AGENT_FAILS=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/agent_run_history?status=in.(failure,timeout)&started_at=gte.$(date -u -v-24H +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d '24 hours ago' +%Y-%m-%dT%H:%M:%SZ 2>/dev/null)&select=agent_name,status,error_message,started_at&order=started_at.desc&limit=5" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" 2>/dev/null)

if [ -n "$AGENT_FAILS" ] && ! echo "$AGENT_FAILS" | grep -q '"code"'; then
  AF_COUNT=$(echo "$AGENT_FAILS" | jq -r 'length' 2>/dev/null)
  if [ "$AF_COUNT" != "0" ] && [ "$AF_COUNT" != "null" ] && [ -n "$AF_COUNT" ]; then
    AF_LIST=$(echo "$AGENT_FAILS" | jq -r '.[] | "  ⚠ \(.agent_name) [\(.status)]: \(.error_message // "no details" | .[0:100])"' 2>/dev/null)
    OUTPUT="${OUTPUT}FAILED AGENT RUNS (last 24h):\n${AF_LIST}\n\n"
  fi
fi

# --- 5. Output ---
if [ -n "$OUTPUT" ]; then
  FULL_MSG=$(printf 'SESSION CONTEXT (auto-loaded):\n%b\nThis context was loaded automatically from prior sessions. Act on corrections immediately. Investigate failures if relevant to current work.' "$OUTPUT")
  ESCAPED=$(echo "$FULL_MSG" | python3 -c 'import sys,json; print(json.dumps({"systemMessage": sys.stdin.read().strip()}))' 2>/dev/null)
  [ -n "$ESCAPED" ] && echo "$ESCAPED"
fi

exit 0
