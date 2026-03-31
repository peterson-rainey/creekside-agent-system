#!/bin/bash
# SessionStart hook: Fetch the startup guide from agent_knowledge and inject it.
# One API call. The guide content is maintained in the database so any chat can update it.
# Fails silently on any error — never blocks session start.

SUPABASE_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Skip if no key available
[ -z "$KEY" ] && exit 0

# Fetch the startup guide (single record)
GUIDE=$(curl -s --max-time 8 \
  "${SUPABASE_URL}/agent_knowledge?id=eq.83308752-50a8-42cd-bb15-54bfa04e7764&select=content" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" 2>/dev/null)

# Extract content from JSON array
CONTENT=$(echo "$GUIDE" | jq -r '.[0].content // empty' 2>/dev/null)

# Skip if empty or error
[ -z "$CONTENT" ] && exit 0

# Inject as system message
ESCAPED=$(echo "$CONTENT" | python3 -c 'import sys,json; print(json.dumps({"systemMessage": sys.stdin.read().strip()}))' 2>/dev/null)
[ -n "$ESCAPED" ] && echo "$ESCAPED"

exit 0
