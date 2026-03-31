#!/bin/bash
# SessionStart hook: Fetch the startup guide + correction titles from agent_knowledge.
# Two API calls. Guide content is maintained in the database so any chat can update it.
# Critical record ID: 83308752-50a8-42cd-bb15-54bfa04e7764 (see agent_knowledge 873e2c75 for docs)
# Fails silently on any error — never blocks session start.

SUPABASE_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Skip if no key or jq unavailable
[ -z "$KEY" ] && exit 0
command -v jq >/dev/null 2>&1 || exit 0

# --- 1. Fetch the startup guide (single record) ---
GUIDE=$(curl -s --max-time 8 \
  "${SUPABASE_URL}/agent_knowledge?id=eq.83308752-50a8-42cd-bb15-54bfa04e7764&select=content" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" 2>/dev/null)

CONTENT=$(echo "$GUIDE" | jq -r '.[0].content // empty' 2>/dev/null)
[ -z "$CONTENT" ] && exit 0

# --- 2. Fetch correction titles (lightweight — titles only, not full content) ---
CORRECTIONS=$(curl -s --max-time 5 \
  "${SUPABASE_URL}/agent_knowledge?type=eq.correction&order=created_at.desc&limit=20&select=title" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" 2>/dev/null)

CORR_LIST=""
CORR_COUNT=$(echo "$CORRECTIONS" | jq -r 'length' 2>/dev/null || echo "0")
if [ "$CORR_COUNT" -gt 0 ] 2>/dev/null; then
  CORR_LIST=$(echo "$CORRECTIONS" | jq -r '[.[].title] | join("; ")' 2>/dev/null)
fi

# --- 3. Build and inject system message ---
if [ -n "$CORR_LIST" ]; then
  FULL_MSG="${CONTENT}

### Active Corrections (${CORR_COUNT} — MUST check before producing output)
${CORR_LIST}

Query full content: SELECT title, content FROM agent_knowledge WHERE type='correction' ORDER BY created_at DESC;"
else
  FULL_MSG="$CONTENT"
fi

ESCAPED=$(echo "$FULL_MSG" | python3 -c 'import sys,json; print(json.dumps({"systemMessage": sys.stdin.read().strip()}))' 2>/dev/null)
[ -n "$ESCAPED" ] && echo "$ESCAPED"

exit 0
