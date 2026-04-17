#!/bin/bash
# UserPromptSubmit hook: persist the live transcript into chat_sessions on every turn.
#
# Design: DUMB HOOK — no title/summary generation here. A nightly server-side
# agent (session-summarizer-agent) reads raw_transcript and fills in the
# narrative fields. No AI calls, no API keys beyond Supabase.
#
# Cadence:
#   Turn 1  → generate session UUID, UPSERT starter row (raw_transcript empty)
#   Every 3rd turn → read transcript file, UPSERT raw_transcript + turn_count
#
# Failure policy: log to .claude/hook-errors.log and exit 0. NEVER block the
# conversation. Missing jq/curl/uuidgen => silent exit 0.

set +e

LOG_DIR="$CLAUDE_PROJECT_DIR/.claude"
LOG_FILE="$LOG_DIR/hook-errors.log"
STATE_FILE="$LOG_DIR/session-state.json"

log_err() {
  mkdir -p "$LOG_DIR" 2>/dev/null
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] session-autosave: $1" >> "$LOG_FILE" 2>/dev/null
}

# --- 0. Dependencies & env ---
command -v jq >/dev/null 2>&1 || exit 0
command -v curl >/dev/null 2>&1 || exit 0
command -v uuidgen >/dev/null 2>&1 || exit 0

SUPABASE_URL_VAL="${SUPABASE_URL:-}"
KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

if [ -z "$SUPABASE_URL_VAL" ] || [ -z "$KEY" ]; then
  log_err "missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
  exit 0
fi

REST_URL="${SUPABASE_URL_VAL%/}/rest/v1"

# --- 1. Read stdin payload from Claude Code ---
STDIN_JSON=$(cat)
if [ -z "$STDIN_JSON" ]; then
  log_err "empty stdin"
  exit 0
fi

TRANSCRIPT_PATH=$(echo "$STDIN_JSON" | jq -r '.transcript_path // empty' 2>/dev/null)
CC_SESSION_ID=$(echo "$STDIN_JSON" | jq -r '.session_id // empty' 2>/dev/null)

# --- 2. Load or initialize state ---
SESSION_UUID=""
TURN_COUNT=0
FIRST_TURN="false"

if [ -f "$STATE_FILE" ]; then
  SESSION_UUID=$(jq -r '.session_uuid // empty' "$STATE_FILE" 2>/dev/null)
  TURN_COUNT=$(jq -r '.turn_count // 0' "$STATE_FILE" 2>/dev/null)
fi

if [ -z "$SESSION_UUID" ]; then
  SESSION_UUID=$(uuidgen | tr '[:upper:]' '[:lower:]')
  TURN_COUNT=0
  FIRST_TURN="true"
fi

TURN_COUNT=$((TURN_COUNT + 1))

# Write state back
jq -n \
  --arg sid "$SESSION_UUID" \
  --arg ccid "$CC_SESSION_ID" \
  --argjson tc "$TURN_COUNT" \
  '{session_uuid: $sid, cc_session_id: $ccid, turn_count: $tc}' \
  > "$STATE_FILE" 2>/dev/null

# --- 3. Resolve created_by_user_id from user-role.conf (optional) ---
CREATED_BY=""
ROLE_FILE="$CLAUDE_PROJECT_DIR/.claude/user-role.conf"
if [ -f "$ROLE_FILE" ]; then
  USER_EMAIL=$(grep -E '^email=' "$ROLE_FILE" 2>/dev/null | cut -d= -f2 | tr -d '[:space:]')
  if [ -n "$USER_EMAIL" ]; then
    ENCODED_EMAIL=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$USER_EMAIL" 2>/dev/null)
    [ -z "$ENCODED_EMAIL" ] && ENCODED_EMAIL="$USER_EMAIL"
    USER_LOOKUP=$(curl -s --max-time 5 \
      "${REST_URL}/system_users?email=eq.${ENCODED_EMAIL}&is_active=eq.true&select=id&limit=1" \
      -H "apikey: ${KEY}" \
      -H "Authorization: Bearer ${KEY}" 2>/dev/null)
    CREATED_BY=$(echo "$USER_LOOKUP" | jq -r '.[0].id // empty' 2>/dev/null)
  fi
fi

# --- 4. Decide whether to write transcript this turn ---
WRITE_TRANSCRIPT="false"
if [ "$FIRST_TURN" = "true" ]; then
  # Starter row — no transcript yet
  WRITE_TRANSCRIPT="false"
elif [ $((TURN_COUNT % 3)) -eq 0 ]; then
  WRITE_TRANSCRIPT="true"
fi

# --- 5. Build UPSERT payload ---
TODAY=$(date -u '+%Y-%m-%d')

PAYLOAD=$(jq -n \
  --arg sid "$SESSION_UUID" \
  --arg sdate "$TODAY" \
  --argjson tc "$TURN_COUNT" \
  --arg cby "$CREATED_BY" \
  '{
    session_id: $sid,
    session_date: $sdate,
    turn_count: $tc,
    summary_generated: false
  } + (if $cby == "" then {} else {created_by_user_id: $cby} end)')

if [ "$WRITE_TRANSCRIPT" = "true" ] && [ -n "$TRANSCRIPT_PATH" ] && [ -f "$TRANSCRIPT_PATH" ]; then
  # Read transcript file (JSONL). Cap to ~500KB to avoid payload bloat.
  TRANSCRIPT_RAW=$(head -c 500000 "$TRANSCRIPT_PATH" 2>/dev/null)
  if [ -n "$TRANSCRIPT_RAW" ]; then
    PAYLOAD=$(echo "$PAYLOAD" | jq --arg t "$TRANSCRIPT_RAW" '. + {raw_transcript: $t}')
  fi
fi

# --- 6. UPSERT via PostgREST (on_conflict=session_id, merge-duplicates) ---
HTTP_CODE=$(curl -s -o /tmp/session-autosave-resp -w '%{http_code}' --max-time 8 \
  -X POST "${REST_URL}/chat_sessions?on_conflict=session_id" \
  -H "apikey: ${KEY}" \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates,return=minimal" \
  -d "$PAYLOAD" 2>/dev/null)

if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "201" ] && [ "$HTTP_CODE" != "204" ]; then
  RESP_BODY=$(cat /tmp/session-autosave-resp 2>/dev/null | head -c 500)
  log_err "upsert failed http=$HTTP_CODE turn=$TURN_COUNT session=$SESSION_UUID body=$RESP_BODY"
fi

rm -f /tmp/session-autosave-resp 2>/dev/null

exit 0
