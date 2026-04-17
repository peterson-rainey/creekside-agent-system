#!/bin/bash
# Stop hook: finalize the session transcript in chat_sessions.
#
# Design: DUMB HOOK. Writes the final raw_transcript and session_ended_at,
# flags the row for nightly AI summarization (summary_generated=false is the
# default, we just make it explicit), then deletes session-state.json so the
# next session starts clean.
#
# If .claude/session-state.json is missing, the session is too short / never
# saved — exit 0 silently.
#
# Failure policy: log to .claude/hook-errors.log, exit 0. NEVER block.

set +e

LOG_DIR="$CLAUDE_PROJECT_DIR/.claude"
LOG_FILE="$LOG_DIR/hook-errors.log"
STATE_FILE="$LOG_DIR/session-state.json"

log_err() {
  mkdir -p "$LOG_DIR" 2>/dev/null
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] session-finalize: $1" >> "$LOG_FILE" 2>/dev/null
}

# --- 0. Dependencies ---
command -v jq >/dev/null 2>&1 || exit 0
command -v curl >/dev/null 2>&1 || exit 0

# --- 1. Need prior state to finalize ---
if [ ! -f "$STATE_FILE" ]; then
  exit 0
fi

SESSION_UUID=$(jq -r '.session_uuid // empty' "$STATE_FILE" 2>/dev/null)
TURN_COUNT=$(jq -r '.turn_count // 0' "$STATE_FILE" 2>/dev/null)

if [ -z "$SESSION_UUID" ]; then
  log_err "state file missing session_uuid"
  rm -f "$STATE_FILE" 2>/dev/null
  exit 0
fi

# --- 2. Env check ---
SUPABASE_URL_VAL="${SUPABASE_URL:-}"
KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

if [ -z "$SUPABASE_URL_VAL" ] || [ -z "$KEY" ]; then
  log_err "missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY; leaving state file for retry"
  exit 0
fi

REST_URL="${SUPABASE_URL_VAL%/}/rest/v1"

# --- 3. Read stdin for transcript_path ---
STDIN_JSON=$(cat)
TRANSCRIPT_PATH=$(echo "$STDIN_JSON" | jq -r '.transcript_path // empty' 2>/dev/null)

# --- 4. Read final transcript (cap ~500KB) ---
TRANSCRIPT_RAW=""
if [ -n "$TRANSCRIPT_PATH" ] && [ -f "$TRANSCRIPT_PATH" ]; then
  TRANSCRIPT_RAW=$(head -c 500000 "$TRANSCRIPT_PATH" 2>/dev/null)
fi

# --- 5. Build UPSERT payload ---
NOW_UTC=$(date -u '+%Y-%m-%dT%H:%M:%SZ')

PAYLOAD=$(jq -n \
  --arg sid "$SESSION_UUID" \
  --arg ended "$NOW_UTC" \
  --argjson tc "$TURN_COUNT" \
  --arg t "$TRANSCRIPT_RAW" \
  '{
    session_id: $sid,
    turn_count: $tc,
    session_ended_at: $ended,
    summary_generated: false
  } + (if $t == "" then {} else {raw_transcript: $t} end)')

# --- 6. UPSERT ---
HTTP_CODE=$(curl -s -o /tmp/session-finalize-resp -w '%{http_code}' --max-time 10 \
  -X POST "${REST_URL}/chat_sessions?on_conflict=session_id" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates,return=minimal" \
  -d "$PAYLOAD" 2>/dev/null)

if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "201" ] && [ "$HTTP_CODE" != "204" ]; then
  RESP_BODY=$(cat /tmp/session-finalize-resp 2>/dev/null | head -c 500)
  log_err "finalize upsert failed http=$HTTP_CODE session=$SESSION_UUID body=$RESP_BODY"
  # Leave state file so next run can retry? No — next session needs clean slate.
  # The row was previously upserted by autosave, so at worst we miss final turn.
fi

rm -f /tmp/session-finalize-resp 2>/dev/null

# --- 7. Clear state so next session starts fresh ---
rm -f "$STATE_FILE" 2>/dev/null

exit 0
