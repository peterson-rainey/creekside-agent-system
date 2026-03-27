#!/bin/bash
# PostToolUse hook (Bash): After git push to creekside-pipelines, remind agent
# to verify Railway deploy via pipeline_alerts.
# Always exits 0 (informational, never blocks).

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Only fire on Bash tool
[ "$TOOL" != "Bash" ] && exit 0

# Check if the command was a git push
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
  echo '{"systemMessage": "DEPLOY VERIFICATION REQUIRED: Push to creekside-pipelines detected. Wait ~2 minutes, then verify: SELECT message, created_at FROM pipeline_alerts WHERE alert_type = '"'"'deploy_success'"'"' ORDER BY created_at DESC LIMIT 1; — Do NOT skip this step."}'
fi

exit 0
