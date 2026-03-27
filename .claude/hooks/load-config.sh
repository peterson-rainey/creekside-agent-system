#!/bin/bash
# SessionStart hook: Verify database connectivity and load lightweight context
# Full config lives in agent_knowledge (type='configuration') — queried on-demand, not injected.
# This replaces the old approach of loading ~28KB of config into every session.

SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

if [ -z "$SUPA_KEY" ]; then
  echo '{"systemMessage": "WARNING: SUPABASE_SERVICE_ROLE_KEY not set. Database queries will fail."}'
  exit 0
fi

# Quick connectivity check + get active agent count (lightweight)
HEALTH=$(curl -s --max-time 5 \
  "${SUPA_URL}/agent_definitions?status=eq.active&select=name" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)

if [ -z "$HEALTH" ] || echo "$HEALTH" | grep -q '"code"'; then
  echo '{"systemMessage": "WARNING: Database connectivity check failed. Supabase may be down."}'
  exit 0
fi

AGENT_COUNT=$(echo "$HEALTH" | jq 'length' 2>/dev/null || echo "?")

# Check for in-progress work from other sessions
WIP=$(curl -s --max-time 5 \
  "${SUPA_URL}/rpc/get_in_progress_items" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" \
  -H "Content-Type: application/json" \
  -d '{}' 2>/dev/null)

WIP_TEXT=""
WIP_COUNT=$(echo "$WIP" | jq 'length' 2>/dev/null || echo "0")
if [ "$WIP_COUNT" -gt 0 ] 2>/dev/null; then
  WIP_TEXT="\nACTIVE WORK IN PROGRESS (other sessions):\n"
  WIP_TEXT="${WIP_TEXT}$(echo "$WIP" | jq -r '.[] | "- [" + .assigned_session + "] " + .title' 2>/dev/null)"
  WIP_TEXT="${WIP_TEXT}\nDo NOT duplicate this work."
fi

# Release stale claims
curl -s --max-time 3 \
  "${SUPA_URL}/rpc/release_stale_claims" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" \
  -H "Content-Type: application/json" \
  -d '{}' 2>/dev/null > /dev/null

MSG="Database connected. ${AGENT_COUNT} active agents available (query agent_definitions for details).${WIP_TEXT}"
ESCAPED=$(echo -e "$MSG" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))' 2>/dev/null || echo '""')

echo "{\"systemMessage\": ${ESCAPED}}"
exit 0
