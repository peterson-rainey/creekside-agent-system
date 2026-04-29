#!/bin/bash
# PostToolUse hook: Monitor agent/skill/scheduled-task file edits + auto-commit to git + push to GitHub
# - New file creation: commit + push, no QC needed
# - Existing file modification: commit + push, log QC recommendation
# Always exits 0 (never blocks)

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Only care about Write/Edit to tracked files
if ! echo "$TOOL" | grep -qiE '^(Write|Edit)$'; then
  exit 0
fi

# Check if it's an agent file, skill file, scheduled task, or other .claude/ file worth tracking
IS_AGENT=false
IS_SKILL=false
IS_TASK=false
IS_TRACKED=false

IS_CLAUDE_MD=false

if echo "$FILE" | grep -qE '\.claude/agents/.*\.md$'; then
  IS_AGENT=true
  IS_TRACKED=true
elif echo "$FILE" | grep -qE '\.claude/skills/.*\.md$'; then
  IS_SKILL=true
  IS_TRACKED=true
elif echo "$FILE" | grep -qE '\.claude/scheduled-tasks/.*\.md$'; then
  IS_TASK=true
  IS_TRACKED=true
elif echo "$FILE" | grep -qE 'CLAUDE\.md$'; then
  IS_CLAUDE_MD=true
  IS_TRACKED=true
fi

# Skip if not a tracked file
[ "$IS_TRACKED" = false ] && exit 0

AGENT_NAME=$(basename "$FILE" .md)
# For scheduled tasks, use the parent directory name (task ID) instead of generic "SKILL"
if [ "$IS_TASK" = true ]; then
  AGENT_NAME=$(basename "$(dirname "$FILE")")
elif [ "$IS_CLAUDE_MD" = true ]; then
  AGENT_NAME="CLAUDE.md"
fi

LOG_FILE="/tmp/claude-agent-edits-$(date +%Y%m%d).jsonl"
CLAUDE_DIR="$(echo "$FILE" | sed 's|/agents/.*||;s|/skills/.*||;s|/scheduled-tasks/.*||')"

# Determine if new or modified (subshell to avoid changing cwd)
IS_NEW="true"
if [ -d "$CLAUDE_DIR/.git" ]; then
  if (cd "$CLAUDE_DIR" && git log --oneline -1 -- "$(echo "$FILE" | sed "s|$CLAUDE_DIR/||")" 2>/dev/null) | grep -q .; then
    IS_NEW="false"
  fi
fi

# Determine file type label for commit message
if [ "$IS_AGENT" = true ]; then
  TYPE_LABEL="agent"
elif [ "$IS_SKILL" = true ]; then
  TYPE_LABEL="skill"
elif [ "$IS_TASK" = true ]; then
  TYPE_LABEL="scheduled-task"
elif [ "$IS_CLAUDE_MD" = true ]; then
  TYPE_LABEL="system-config"
else
  TYPE_LABEL="file"
fi

# Log the change
if [ "$IS_NEW" = "true" ]; then
  ACTION="CREATED"
  QC_NEEDED="false"
  COMMIT_MSG="New $TYPE_LABEL: $AGENT_NAME"
else
  ACTION="MODIFIED"
  QC_NEEDED="true"
  COMMIT_MSG="Updated $TYPE_LABEL: $AGENT_NAME"
fi

jq -cn \
  --arg ts "$TIMESTAMP" \
  --arg session "$SESSION" \
  --arg agent "$AGENT_NAME" \
  --arg type "$TYPE_LABEL" \
  --arg action "$ACTION" \
  --arg qc "$QC_NEEDED" \
  '{timestamp: $ts, session: $session, name: $agent, type: $type, action: $action, qc_needed: ($qc == "true")}' \
  >> "$LOG_FILE" 2>/dev/null

# Auto-commit and push to GitHub (subshell to avoid changing cwd, background)
if [ -d "$CLAUDE_DIR/.git" ]; then
  (
    cd "$CLAUDE_DIR"
    git add -A 2>/dev/null
    # Only commit if there are staged changes
    if ! git diff --cached --quiet 2>/dev/null; then
      git commit -m "$COMMIT_MSG" --quiet 2>/dev/null
      git push origin main --quiet 2>/dev/null &
    fi
  )
fi

# DB mirroring: sync agent file content to agent_definitions.system_prompt
# Files are the source of truth; DB copy exists for Railway scheduled agents and routing.
if [ "$IS_AGENT" = true ] && [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  (
    SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
    SUPA_KEY="$SUPABASE_SERVICE_ROLE_KEY"

    # Read full file content
    FILE_CONTENT=$(cat "$FILE" 2>/dev/null) || true

    if [ -n "$FILE_CONTENT" ]; then
      # JSON-encode the file content for the API call
      ENCODED=$(python3 -c "
import sys, json
content = sys.stdin.read()
print(json.dumps({'system_prompt': content}))
" <<< "$FILE_CONTENT" 2>/dev/null)

      if [ -n "$ENCODED" ]; then
        curl -s --max-time 10 \
          "${SUPA_URL}/agent_definitions?name=eq.${AGENT_NAME}" \
          -X PATCH \
          -H "apikey: ${SUPA_KEY}" \
          -H "Authorization: Bearer ${SUPA_KEY}" \
          -H "Content-Type: application/json" \
          -H "Prefer: return=minimal" \
          -d "$ENCODED" \
          2>/dev/null > /dev/null &
      fi
    fi
  ) 2>/dev/null
fi

exit 0
