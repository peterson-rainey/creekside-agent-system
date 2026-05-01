#!/bin/bash
# PostToolUse hook (Bash): After git push to creekside-pipelines, verify
# branch is merged and remind to check Railway deploy.
# Always exits 0 (informational, never blocks).

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Only fire on Bash tool
[ "$TOOL" != "Bash" ] && exit 0

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
TOOL_OUTPUT=$(echo "$INPUT" | jq -r '.tool_output // empty' 2>/dev/null)

# Detect push to creekside-pipelines from command or output
PUSH_DETECTED=false

if echo "$COMMAND" | grep -q 'git push'; then
  PUSH_DETECTED=true
fi

if echo "$TOOL_OUTPUT" | grep -qE 'creekside-pipelines\.git.*->'; then
  PUSH_DETECTED=true
fi

if [ "$PUSH_DETECTED" = true ]; then
  # Check for unmerged branches in creekside-pipelines
  PIPELINES_DIR="$HOME/creekside-pipelines"
  BRANCH_WARNING=""
  if [ -d "$PIPELINES_DIR/.git" ]; then
    CURRENT=$(git -C "$PIPELINES_DIR" branch --show-current 2>/dev/null)
    if [ "$CURRENT" != "main" ] && [ -n "$CURRENT" ]; then
      BRANCH_WARNING="WARNING: Push was from branch '$CURRENT', not main. Railway deploys from main only. If this branch has unmerged commits, Railway is running OLD code. Merge to main first: cd ~/creekside-pipelines && git checkout main && git merge $CURRENT && git push. "
    fi
    # Check for local branches with unmerged commits
    UNMERGED=$(git -C "$PIPELINES_DIR" branch --no-merged main 2>/dev/null | grep -v '^\*' | tr -d ' ' | head -5)
    if [ -n "$UNMERGED" ]; then
      BRANCH_WARNING="${BRANCH_WARNING}UNMERGED BRANCHES: $(echo $UNMERGED | tr '\n' ', '). These contain code Railway is NOT deploying. "
    fi
  fi

  echo "{\"systemMessage\": \"DEPLOY VERIFICATION REQUIRED: ${BRANCH_WARNING}Push to creekside-pipelines detected. Wait ~2 minutes, then verify: SELECT message, created_at FROM pipeline_alerts WHERE alert_type = 'deploy_success' ORDER BY created_at DESC LIMIT 1;\"}"
fi

exit 0
