#!/bin/bash
# PostToolUse hook (all write tools + Agent): Persistent QC enforcement.
# After any write occurs, nags on EVERY subsequent tool call until QC is spawned.
# This is the "persistent in-session nag" pattern — impossible to ignore.
# Always exits 0 (informational, never blocks).

INPUT=$(cat)
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')

STATE_DIR="/tmp/claude-session-state"
STATE_FILE="$STATE_DIR/$SESSION.state"

# Only process if state file exists
[ ! -f "$STATE_FILE" ] && exit 0

# ─── Check: has this session had writes? ─────────────────────────────────
SQL_WRITES=$(grep -c "^SQL_WRITE=" "$STATE_FILE" 2>/dev/null || echo "0")
FILE_WRITES=$(grep -c "^FILE_WRITE=" "$STATE_FILE" 2>/dev/null || echo "0")
TOTAL_WRITES=$((SQL_WRITES + FILE_WRITES))

# No writes → no QC needed
[ "$TOTAL_WRITES" -eq 0 ] && exit 0

# ─── Check: has QC already been spawned? ──────────────────────────────────
QC_SPAWNED=$(grep -cE "AGENT_SPAWN=.*\|(qc-reviewer-agent|expert-review-agent)" "$STATE_FILE" 2>/dev/null || echo "0")

# ─── Check: has code-audit been spawned if code was written? ──────────────
CODE_WRITTEN=$(grep -cE "FILE_WRITE=.*\.(py|sh|js)$" "$STATE_FILE" 2>/dev/null || echo "0")
CODE_AUDIT_SPAWNED=$(grep -cE "AGENT_SPAWN=.*code-audit-agent" "$STATE_FILE" 2>/dev/null || echo "0")

# ─── Build nag message ────────────────────────────────────────────────────
NAGS=""

if [ "$QC_SPAWNED" -eq 0 ]; then
  NAGS="QC REQUIRED: ${TOTAL_WRITES} write(s) in this session but qc-reviewer-agent has NOT been spawned. Spawn it before presenting final output to the user."
fi

if [ "$CODE_WRITTEN" -gt 0 ] && [ "$CODE_AUDIT_SPAWNED" -eq 0 ]; then
  if [ -n "$NAGS" ]; then
    NAGS="${NAGS} ALSO: ${CODE_WRITTEN} script(s) written without code-audit-agent."
  else
    NAGS="CODE AUDIT REQUIRED: ${CODE_WRITTEN} script(s) written but code-audit-agent not spawned. Spawn it before presenting output."
  fi
fi

if [ -n "$NAGS" ]; then
  echo "{\"systemMessage\": \"${NAGS}\"}"
fi

exit 0
