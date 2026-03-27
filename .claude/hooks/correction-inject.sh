#!/bin/bash
# PreToolUse hook (Agent tool): Inject relevant corrections into agent prompts.
# Mirrors what agent_dispatcher.py does for scheduled agents — ensures on-demand
# agents also get corrections so they don't repeat known mistakes.
# Always exits 0 (informational injection, never blocks).

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Only fire on Agent tool
[ "$TOOL" != "Agent" ] && exit 0

# Query recent corrections from agent_knowledge
SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

[ -z "$SUPA_KEY" ] && exit 0

# Fetch corrections (last 20, most recent first)
CORRECTIONS=$(curl -s --max-time 5 \
  "${SUPA_URL}/agent_knowledge?type=eq.correction&order=created_at.desc&limit=20&select=title,content" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)

COUNT=$(echo "$CORRECTIONS" | jq 'length' 2>/dev/null || echo "0")

if [ "$COUNT" -gt 0 ] && [ "$COUNT" != "null" ]; then
  TITLES=$(echo "$CORRECTIONS" | jq -r '.[].title' 2>/dev/null | head -20 | tr '\n' '; ' | sed 's/;$//')
  echo "{\"systemMessage\": \"CORRECTIONS LOADED (${COUNT}): Inject these into the spawned agent prompt — ${TITLES}. Query agent_knowledge WHERE type='correction' for full details.\"}"
fi

exit 0
