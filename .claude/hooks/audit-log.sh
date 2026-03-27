#!/bin/bash
# PostToolUse hook: Log all write operations for audit trail
# Always exits 0 (informational only, never blocks)

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // "unknown"')
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')

# Extract a summary of what was done (first 300 chars)
SUMMARY=$(echo "$INPUT" | jq -r '
  if .tool_input.file_path then "file: " + .tool_input.file_path
  elif .tool_input.command then "cmd: " + (.tool_input.command | .[0:200])
  elif .tool_input.query then "sql: " + (.tool_input.query | .[0:200])
  else .tool_input | tostring | .[0:200]
  end
')

LOG_FILE="/tmp/claude-audit-$(date +%Y%m%d).log"
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) | $SESSION | $TOOL | $SUMMARY" >> "$LOG_FILE"

exit 0
