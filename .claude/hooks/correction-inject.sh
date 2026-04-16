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

# Fetch top 5 corrections by usage (most-used first, then most recent)
CORRECTIONS=$(curl -s --max-time 5 \
  "${SUPA_URL}/agent_knowledge?type=eq.correction&order=usage_count.desc.nullslast,created_at.desc&limit=5&select=id,title,content" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)

COUNT=$(echo "$CORRECTIONS" | jq 'length' 2>/dev/null || echo "0")

if [ "$COUNT" != "null" ] && [ "$COUNT" -gt 0 ]; then
  TITLES=$(echo "$CORRECTIONS" | jq -r '.[].title' 2>/dev/null | head -5 | tr '\n' '; ' | sed 's/;$//')
  echo "{\"systemMessage\": \"CORRECTIONS LOADED (${COUNT}): Inject these into the spawned agent prompt — ${TITLES}. Query agent_knowledge WHERE type='correction' for full details.\"}"

  # Increment usage_count atomically via execute_sql (background, non-blocking)
  IDS=$(echo "$CORRECTIONS" | jq -r '.[].id' 2>/dev/null | sed "s/.*/'&'/" | paste -sd ',' -)
  if [ -n "$IDS" ]; then
    curl -s --max-time 3 \
      "https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1/rpc/execute_sql" \
      -X POST \
      -H "apikey: ${SUPA_KEY}" \
      -H "Authorization: Bearer ${SUPA_KEY}" \
      -H "Content-Type: application/json" \
      -d "{\"query\": \"UPDATE agent_knowledge SET usage_count = COALESCE(usage_count, 0) + 1 WHERE id IN (${IDS})\"}" \
      >/dev/null 2>&1 &
  fi
fi

exit 0
