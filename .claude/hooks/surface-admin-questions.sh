#!/bin/bash
# SessionStart hook: Surface open admin_questions for the current user
# Queries Supabase for unanswered questions and injects them as a system message

SUPABASE_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Skip if no key available
[ -z "$KEY" ] && exit 0

# Query open questions
RESPONSE=$(curl -s --max-time 10 \
  "${SUPABASE_URL}/admin_questions?status=eq.open&order=priority.asc,created_at.asc" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" 2>/dev/null)

# Skip if curl failed or empty
[ -z "$RESPONSE" ] || echo "$RESPONSE" | grep -q '"code"' && exit 0

# Count questions
COUNT=$(echo "$RESPONSE" | jq -r 'length' 2>/dev/null)
[ "$COUNT" = "0" ] || [ -z "$COUNT" ] && exit 0

# Format questions for display
QUESTIONS=$(echo "$RESPONSE" | jq -r '.[] | "- [\(.priority // "normal")] (for \(.for_whom), from \(.asked_by)): \(.question)"' 2>/dev/null)

# Return as system message
printf '{"systemMessage": "OPEN ADMIN QUESTIONS (%s pending):\\n%s\\n\\nTo answer: UPDATE admin_questions SET status=answered, answer=your_answer, answered_by=your_name, answered_at=NOW() WHERE id=question_id;"}\n' "$COUNT" "$QUESTIONS"
