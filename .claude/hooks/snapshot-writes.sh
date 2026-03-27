#!/bin/bash
# PostToolUse hook: Capture write operations for rollback forensics
# Logs SQL mutations (INSERT/UPDATE/DELETE) with enough detail to reverse them.
# Logs file writes with the file path.
#
# Log location: /tmp/claude-snapshots-YYYYMMDD.jsonl (one JSON object per line)
# Always exits 0 (informational only, never blocks)

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
LOG_FILE="/tmp/claude-snapshots-$(date +%Y%m%d).jsonl"

# --- SQL WRITES ---
if echo "$TOOL" | grep -qiE '(execute_sql|apply_migration)'; then
  QUERY=$(echo "$INPUT" | jq -r '.tool_input.query // empty')

  # Only log mutations, not reads
  if echo "$QUERY" | grep -qiE '^\s*(INSERT|UPDATE|DELETE|ALTER|CREATE|DROP)'; then
    TABLE=$(echo "$QUERY" | grep -oiE '(INSERT\s+INTO|UPDATE|DELETE\s+FROM|ALTER\s+TABLE|CREATE\s+TABLE|DROP\s+TABLE)\s+\w+' | head -1 | awk '{print $NF}')
    WHERE=$(echo "$QUERY" | grep -oiE 'WHERE\s+.*' | head -1 | head -c 200)
    OP=$(echo "$QUERY" | grep -oiE '^\s*(INSERT|UPDATE|DELETE|ALTER|CREATE|DROP)' | head -1 | tr '[:lower:]' '[:upper:]' | xargs)

    jq -cn \
      --arg ts "$TIMESTAMP" \
      --arg session "$SESSION" \
      --arg tool "$TOOL" \
      --arg op "$OP" \
      --arg table "$TABLE" \
      --arg where_clause "$WHERE" \
      --arg query "$QUERY" \
      '{timestamp: $ts, session: $session, tool: $tool, operation: $op, table: $table, where_clause: $where_clause, query: ($query | .[0:500])}' \
      >> "$LOG_FILE"
  fi
fi

# --- FILE WRITES ---
if echo "$TOOL" | grep -qiE '^(Write|Edit)$'; then
  FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

  if [ -n "$FILE_PATH" ]; then
    FILE_SIZE=$(stat -f%z "$FILE_PATH" 2>/dev/null || echo "new_file")

    jq -cn \
      --arg ts "$TIMESTAMP" \
      --arg session "$SESSION" \
      --arg tool "$TOOL" \
      --arg file "$FILE_PATH" \
      --arg size "$FILE_SIZE" \
      '{timestamp: $ts, session: $session, tool: $tool, operation: "FILE_WRITE", file_path: $file, file_size: $size}' \
      >> "$LOG_FILE"
  fi
fi

exit 0
