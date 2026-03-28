#!/bin/bash
# PreToolUse hook: BLOCK write operations when QC has not been spawned.
# This is a BLOCKING gate (exit 2) — not a nag. The tool will not execute.
# Matches: Write, Edit, Bash, execute_sql, apply_migration (NOT Agent — so QC can be spawned).
#
# Threshold: 5+ writes without QC → blocked.
# Once qc-reviewer-agent is spawned, gate lifts permanently for the session.
# If executable scripts were written, code-audit-agent is also required.

INPUT=$(cat)
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')

STATE_DIR="/tmp/claude-session-state"
STATE_FILE="$STATE_DIR/$SESSION.state"

# No state file → no writes yet → allow
[ ! -f "$STATE_FILE" ] && exit 0

# Count writes (grep -c exits 1 when count is 0; use default to avoid || echo double-output bug)
SQL_WRITES=$(grep -c "^SQL_WRITE=" "$STATE_FILE" 2>/dev/null); SQL_WRITES=${SQL_WRITES:-0}
FILE_WRITES=$(grep -c "^FILE_WRITE=" "$STATE_FILE" 2>/dev/null); FILE_WRITES=${FILE_WRITES:-0}
TOTAL_WRITES=$((SQL_WRITES + FILE_WRITES))

# Under threshold → allow (agent needs room to do initial work)
[ "$TOTAL_WRITES" -lt 5 ] && exit 0

# Check if QC was spawned
QC_SPAWNED=$(grep -cE "AGENT_SPAWN=.*\|(qc-reviewer-agent|expert-review-agent)" "$STATE_FILE" 2>/dev/null); QC_SPAWNED=${QC_SPAWNED:-0}

# Check if code-audit was spawned (if scripts written)
CODE_WRITTEN=$(grep -cE "FILE_WRITE=.*\.(py|sh|js)$" "$STATE_FILE" 2>/dev/null); CODE_WRITTEN=${CODE_WRITTEN:-0}
CODE_AUDIT_SPAWNED=$(grep -cE "AGENT_SPAWN=.*code-audit-agent" "$STATE_FILE" 2>/dev/null); CODE_AUDIT_SPAWNED=${CODE_AUDIT_SPAWNED:-0}

# If QC spawned and (no code written OR code-audit spawned) → allow
if [ "$QC_SPAWNED" -gt 0 ]; then
  if [ "$CODE_WRITTEN" -eq 0 ] || [ "$CODE_AUDIT_SPAWNED" -gt 0 ]; then
    exit 0
  fi
fi

# Build block message
MSG="BLOCKED: ${TOTAL_WRITES} writes in this session. You MUST spawn"
NEEDS=""
[ "$QC_SPAWNED" -eq 0 ] && NEEDS="qc-reviewer-agent"
if [ "$CODE_WRITTEN" -gt 0 ] && [ "$CODE_AUDIT_SPAWNED" -eq 0 ]; then
  [ -n "$NEEDS" ] && NEEDS="${NEEDS} and code-audit-agent" || NEEDS="code-audit-agent"
fi
MSG="${MSG} ${NEEDS} before more writes are allowed."

echo "$MSG" >&2
exit 2
