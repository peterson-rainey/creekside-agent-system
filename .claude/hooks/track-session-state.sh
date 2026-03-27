#!/bin/bash
# PostToolUse hook: Track session activity for compliance checking
# Records what the session has done so the Stop hook can verify mandatory patterns.
# Always exits 0 (tracking only, never blocks).

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // "unknown"')
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')

# Session state file — one per session, read by compliance-check.sh at Stop
STATE_DIR="/tmp/claude-session-state"
mkdir -p "$STATE_DIR"
STATE_FILE="$STATE_DIR/$SESSION.state"

# ─── Track SQL mutations ────────────────────────────────────────────────────
if echo "$TOOL" | grep -qiE '(execute_sql|apply_migration)'; then
  QUERY=$(echo "$INPUT" | jq -r '.tool_input.query // empty' 2>/dev/null)
  if echo "$QUERY" | grep -qiE '^\s*(INSERT|UPDATE|DELETE|ALTER|CREATE)'; then
    echo "SQL_WRITE=$(date -u +%Y-%m-%dT%H:%M:%SZ)|$(echo "$QUERY" | head -c 100)" >> "$STATE_FILE"
  fi
fi

# ─── Track file writes ──────────────────────────────────────────────────────
if echo "$TOOL" | grep -qiE '^(Write|Edit)$'; then
  FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
  if [ -n "$FILE_PATH" ]; then
    echo "FILE_WRITE=$(date -u +%Y-%m-%dT%H:%M:%SZ)|$FILE_PATH" >> "$STATE_FILE"
  fi
fi

# ─── Track agent spawns (for QC verification) ───────────────────────────────
if echo "$TOOL" | grep -qiE '^Agent$'; then
  AGENT_TYPE=$(echo "$INPUT" | jq -r '.tool_input.subagent_type // "general-purpose"' 2>/dev/null)
  echo "AGENT_SPAWN=$(date -u +%Y-%m-%dT%H:%M:%SZ)|$AGENT_TYPE" >> "$STATE_FILE"
fi

exit 0
