#!/bin/bash
# SessionStart hook: Load pending action items, recent session context, and corrections
# Gives every new chat full context so Peterson never has to re-explain
# Modeled on surface-admin-questions.sh — fails silently on any error

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

# --- 2. Recent Session Context (last 3 sessions) ---
SESSIONS=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/chat_sessions?order=session_date.desc&limit=3&select=title,session_date,items_pending,next_steps" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" 2>/dev/null)

if [ -n "$SESSIONS" ] && ! echo "$SESSIONS" | grep -q '"code"'; then
  S_COUNT=$(echo "$SESSIONS" | jq -r 'length' 2>/dev/null)
  if [ "$S_COUNT" != "0" ] && [ -n "$S_COUNT" ]; then
    S_LIST=$(echo "$SESSIONS" | jq -r '.[] | "  [\(.session_date)] \(.title)\n    Pending: \(.items_pending // "none")\n    Next: \(.next_steps // "none")"' 2>/dev/null)
    OUTPUT="${OUTPUT}RECENT SESSIONS:\n${S_LIST}\n\n"
  fi
fi

# --- 3. Recent Corrections (last 5, titles only — full content queried on-demand) ---
CORRECTIONS=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/agent_knowledge?type=eq.correction&order=created_at.desc&limit=5&select=title,created_at" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" 2>/dev/null)

if [ -n "$CORRECTIONS" ] && ! echo "$CORRECTIONS" | grep -q '"code"'; then
  C_COUNT=$(echo "$CORRECTIONS" | jq -r 'length' 2>/dev/null)
  if [ "$C_COUNT" != "0" ] && [ -n "$C_COUNT" ]; then
    C_LIST=$(echo "$CORRECTIONS" | jq -r '.[] | "  - \(.title) [\(.created_at | split("T")[0])]"' 2>/dev/null)
    OUTPUT="${OUTPUT}RECENT CORRECTIONS (${C_COUNT}; query agent_knowledge for full content):\n${C_LIST}\n\n"
  fi
fi

# --- 4. Output ---
if [ -n "$OUTPUT" ]; then
  FULL_MSG=$(printf 'SESSION CONTEXT (auto-loaded):\n%b\nThis context was loaded automatically. Check action_items and agent_knowledge for details.' "$OUTPUT")
  ESCAPED=$(echo "$FULL_MSG" | python3 -c 'import sys,json; print(json.dumps({"systemMessage": sys.stdin.read().strip()}))' 2>/dev/null)
  [ -n "$ESCAPED" ] && echo "$ESCAPED"
fi

exit 0
