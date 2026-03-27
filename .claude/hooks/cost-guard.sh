#!/bin/bash
# PreToolUse hook (Agent tool): Check daily API spend before spawning agents.
# Warns at 80% of daily limit, blocks at 100%.
# Exit 0 = allow, Exit 2 = block.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Only fire on Agent tool
[ "$TOOL" != "Agent" ] && exit 0

SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Skip if no key (can't check costs)
[ -z "$SUPA_KEY" ] && exit 0

# Get today's total spend from api_cost_tracking
TODAY=$(date -u +%Y-%m-%d)
SPEND_RESP=$(curl -s --max-time 5 \
  "${SUPA_URL}/api_cost_tracking?created_at=gte.${TODAY}T00:00:00Z&select=estimated_cost_cents" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)

TOTAL_CENTS=$(echo "$SPEND_RESP" | jq '[.[].estimated_cost_cents // 0] | add // 0' 2>/dev/null || echo "0")

# Get the daily limit
LIMIT_RESP=$(curl -s --max-time 5 \
  "${SUPA_URL}/api_cost_limits?scope=eq.daily&enabled=eq.true&select=limit_cents&limit=1" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)

LIMIT_CENTS=$(echo "$LIMIT_RESP" | jq '.[0].limit_cents // 99999' 2>/dev/null || echo "99999")

# Calculate percentage
if [ "$LIMIT_CENTS" -gt 0 ] 2>/dev/null; then
  PCT=$((TOTAL_CENTS * 100 / LIMIT_CENTS))
else
  PCT=0
fi

TOTAL_DOLLARS=$(echo "scale=2; $TOTAL_CENTS / 100" | bc 2>/dev/null || echo "?")
LIMIT_DOLLARS=$(echo "scale=2; $LIMIT_CENTS / 100" | bc 2>/dev/null || echo "?")

# Block if over 100%
if [ "$PCT" -ge 100 ] 2>/dev/null; then
  echo "BLOCKED: Daily API spend (\$${TOTAL_DOLLARS}) has exceeded the limit (\$${LIMIT_DOLLARS}). Spawning additional agents is blocked until tomorrow or the limit is raised." >&2
  exit 2
fi

# Warn if over 80%
if [ "$PCT" -ge 80 ] 2>/dev/null; then
  echo "{\"systemMessage\": \"COST WARNING: Daily API spend is at \$${TOTAL_DOLLARS}/\$${LIMIT_DOLLARS} (${PCT}%). Consider using Haiku or reducing agent turns.\"}"
fi

exit 0
