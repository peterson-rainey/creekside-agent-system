#!/bin/bash
# Stop hook: Enforce compliance and ALWAYS save session summary on exit.
#
# This hook fires on every session end (/quit, Ctrl+C, etc).
# It does NOT rely on the agent to save — it saves directly via Supabase REST API.
#
# Actions:
# 1. Auto-clean ADMIN_MODE if still active
# 2. Save detailed session summary to chat_sessions (always, if meaningful work occurred)
#    - Meaningful titles derived from actual work (tables, projects, agents)
#    - Deduplication: updates recent session if one exists within 30 minutes
#    - Skips empty/noise sessions (filters /tmp/ and .claude/hooks/ writes)
#    - Meaningful summaries describing what was accomplished
# 3. Save to raw_content for embedding generation
# 4. Report QC compliance status

# ─── Read session context from stdin ─────────────────────────────────────────

INPUT=$(cat)
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')

# ─── Config ──────────────────────────────────────────────────────────────────

STATE_DIR="/tmp/claude-session-state"
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
TODAY=$(date -u +%Y-%m-%d)
NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)
WARNINGS=""

# ─── Read user identity (persisted by session-init.sh) ───────────────────────
CURRENT_USER_ID=""
if [ -f "$STATE_DIR/current-user-id" ]; then
  CURRENT_USER_ID=$(cat "$STATE_DIR/current-user-id" 2>/dev/null | tr -d '[:space:]')
fi

# ─── Action 1: Auto-clean ADMIN_MODE ─────────────────────────────────────────

if [ -f "$PROJECT_ROOT/.claude/ADMIN_MODE" ]; then
  rm -f "$PROJECT_ROOT/.claude/ADMIN_MODE"
  WARNINGS="${WARNINGS}\n- ADMIN_MODE was still active — auto-cleaned by compliance hook."
fi

# ─── Find session state ──────────────────────────────────────────────────────

LATEST_STATE=""
if [ -d "$STATE_DIR" ] && [ "$SESSION" != "unknown" ]; then
  LATEST_STATE="$STATE_DIR/$SESSION.state"
fi

if [ -z "$LATEST_STATE" ] || [ ! -f "$LATEST_STATE" ]; then
  echo '{"systemMessage": "No write activity tracked. Read-only session — no summary needed."}'
  exit 0
fi

# ─── Parse session activity ──────────────────────────────────────────────────

SQL_WRITES=$(grep -c "^SQL_WRITE=" "$LATEST_STATE" 2>/dev/null) || SQL_WRITES=0
FILE_WRITES=$(grep -c "^FILE_WRITE=" "$LATEST_STATE" 2>/dev/null) || FILE_WRITES=0
AGENT_SPAWNS=$(grep -c "^AGENT_SPAWN=" "$LATEST_STATE" 2>/dev/null) || AGENT_SPAWNS=0
QC_SPAWNED=$(grep -E "AGENT_SPAWN=.*\|(qc-reviewer-agent|code-audit-agent|data-quality-agent|expert-review-agent|security-audit-agent)" "$LATEST_STATE" 2>/dev/null | wc -l | tr -d ' ')

# ─── Filter out noise: /tmp/ paths and .claude/hooks/ don't count ───────────

MEANINGFUL_FILE_WRITES=$(grep "^FILE_WRITE=" "$LATEST_STATE" 2>/dev/null \
  | grep -v '|/tmp/' \
  | grep -v '|.*/\.claude/hooks/' \
  | wc -l | tr -d ' ')

# Boilerplate-only agent spawns (just QC with no other agents) don't count
MEANINGFUL_AGENT_SPAWNS=$(grep "^AGENT_SPAWN=" "$LATEST_STATE" 2>/dev/null \
  | grep -v '|\(qc-reviewer-agent\|expert-review-agent\)$' \
  | wc -l | tr -d ' ')

# Skip if no meaningful work at all
if [ "$SQL_WRITES" -eq 0 ] && [ "$MEANINGFUL_FILE_WRITES" -eq 0 ] && [ "$MEANINGFUL_AGENT_SPAWNS" -eq 0 ]; then
  echo '{"systemMessage": "Read-only session — no summary needed (only noise/boilerplate activity filtered out)."}'
  exit 0
fi

# ─── Check if agent already saved ────────────────────────────────────────────

SESSION_ALREADY_SAVED=$(grep "SQL_WRITE=.*chat_sessions" "$LATEST_STATE" 2>/dev/null | wc -l | tr -d ' ')
if [ "$SESSION_ALREADY_SAVED" -gt 0 ]; then
  # Agent saved its own summary — try to auto-close action items from it
  if [ -n "$SUPA_KEY" ]; then
    # Get the most recent session saved today
    RECENT_RESP=$(curl -s --max-time 10 \
      "${SUPA_URL}/chat_sessions?session_date=eq.${TODAY}&order=created_at.desc&limit=1&select=id,items_completed" \
      -H "apikey: ${SUPA_KEY}" \
      -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)

    RECENT_ITEMS=$(echo "$RECENT_RESP" | jq -r '.[0].items_completed // "[]"' 2>/dev/null)
    RECENT_COUNT=$(echo "$RECENT_ITEMS" | jq 'length' 2>/dev/null || echo "0")

    CLOSE_MSG=""
    if [ "$RECENT_COUNT" -gt 0 ]; then
      CLOSE_RESP=$(curl -s --max-time 15 \
        "${SUPA_URL}/rpc/auto_close_action_items" \
        -H "apikey: ${SUPA_KEY}" \
        -H "Authorization: Bearer ${SUPA_KEY}" \
        -H "Content-Type: application/json" \
        -d "{\"completed_items\": ${RECENT_ITEMS}}" 2>/dev/null)

      CLOSED_COUNT=$(echo "$CLOSE_RESP" | jq 'length' 2>/dev/null || echo "0")
      if [ "$CLOSED_COUNT" -gt 0 ]; then
        CLOSED_TITLES=$(echo "$CLOSE_RESP" | jq -r '.[].action_item_title' 2>/dev/null | tr '\n' ', ' | sed 's/,$//')
        CLOSE_MSG=" Auto-closed ${CLOSED_COUNT} action item(s): ${CLOSED_TITLES}."
      fi
    fi
  fi

  STATS="Session saved by agent. Activity: $SQL_WRITES SQL write(s), $FILE_WRITES file write(s), $AGENT_SPAWNS agent(s) spawned, $QC_SPAWNED QC agent(s).${CLOSE_MSG}"
  echo "{\"systemMessage\": \"$(echo "$STATS" | sed 's/"/\\"/g')\"}"
  exit 0
fi

# ─── Build detailed session data ─────────────────────────────────────────────

# Collect all meaningful files changed (deduplicated, paths only — exclude noise)
FILES_LIST=$(grep "^FILE_WRITE=" "$LATEST_STATE" 2>/dev/null \
  | sed 's/^FILE_WRITE=[^|]*|//' \
  | grep -v '^/tmp/' \
  | grep -v '\.claude/hooks/' \
  | sort -u)
FILES_JSON="[]"
if [ -n "$FILES_LIST" ]; then
  FILES_JSON=$(echo "$FILES_LIST" | head -30 | jq -R -s 'split("\n") | map(select(. != ""))')
fi

# Collect all SQL operations (first 100 chars of each, deduplicated)
SQL_OPS=$(grep "^SQL_WRITE=" "$LATEST_STATE" 2>/dev/null | sed 's/^SQL_WRITE=[^|]*|//' | sort -u | head -20)

# Collect all agents spawned (deduplicated)
AGENTS_LIST=$(grep "^AGENT_SPAWN=" "$LATEST_STATE" 2>/dev/null | sed 's/^AGENT_SPAWN=[^|]*|//' | sort -u)
AGENTS_DISPLAY=$(echo "$AGENTS_LIST" | tr '\n' ', ' | sed 's/,$//')

# ─── Derive meaningful title from actual work ────────────────────────────────

TITLE_PARTS=""

# Extract SQL table names that were written to
if [ -n "$SQL_OPS" ]; then
  SQL_TABLES=$(echo "$SQL_OPS" \
    | grep -oiE '(INSERT INTO|UPDATE|DELETE FROM|UPSERT INTO)\s+[a-z_]+' \
    | sed -E 's/(INSERT INTO|UPDATE|DELETE FROM|UPSERT INTO)\s+//i' \
    | sort -u | tr '\n' ', ' | sed 's/,$//')
  if [ -n "$SQL_TABLES" ]; then
    TITLE_PARTS="DB: ${SQL_TABLES}"
  fi
fi

# Group file paths by project
if [ -n "$FILES_LIST" ]; then
  FILE_PROJECTS=""
  if echo "$FILES_LIST" | grep -q 'creekside-pipelines'; then
    FILE_PROJECTS="${FILE_PROJECTS}creekside-pipelines, "
  fi
  if echo "$FILES_LIST" | grep -q 'creekside-dashboard'; then
    FILE_PROJECTS="${FILE_PROJECTS}creekside-dashboard, "
  fi
  if echo "$FILES_LIST" | grep -q 'creekside-website'; then
    FILE_PROJECTS="${FILE_PROJECTS}creekside-website, "
  fi
  if echo "$FILES_LIST" | grep -q 'creekside-tools'; then
    FILE_PROJECTS="${FILE_PROJECTS}creekside-tools, "
  fi
  if echo "$FILES_LIST" | grep -q 'C-Code - Rag database'; then
    FILE_PROJECTS="${FILE_PROJECTS}agent-system, "
  fi
  # Fallback: list individual filenames if no project matched
  if [ -z "$FILE_PROJECTS" ]; then
    FILE_PROJECTS=$(echo "$FILES_LIST" | xargs -I{} basename {} | sort -u | head -5 | tr '\n' ', ')
  fi
  FILE_PROJECTS=$(echo "$FILE_PROJECTS" | sed 's/, $//')
  if [ -n "$FILE_PROJECTS" ]; then
    [ -n "$TITLE_PARTS" ] && TITLE_PARTS="${TITLE_PARTS}; "
    TITLE_PARTS="${TITLE_PARTS}Files: ${FILE_PROJECTS}"
  fi
fi

# Add named agents (skip QC boilerplate)
NAMED_AGENTS=$(echo "$AGENTS_LIST" 2>/dev/null \
  | grep -v '^$' \
  | grep -v 'qc-reviewer-agent' \
  | grep -v 'expert-review-agent' \
  | sort -u | tr '\n' ', ' | sed 's/,$//')
if [ -n "$NAMED_AGENTS" ]; then
  [ -n "$TITLE_PARTS" ] && TITLE_PARTS="${TITLE_PARTS}; "
  TITLE_PARTS="${TITLE_PARTS}Agents: ${NAMED_AGENTS}"
fi

# Final title — truncate to 200 chars for safety
if [ -z "$TITLE_PARTS" ]; then
  TITLE_PARTS="Session ${TODAY} — misc activity"
fi
SESSION_TITLE=$(echo "$TITLE_PARTS" | head -c 200)

# ─── Build meaningful summary ────────────────────────────────────────────────

SUMMARY_PARTS=""

# Describe SQL work
if [ -n "$SQL_OPS" ] && [ "$SQL_WRITES" -gt 0 ]; then
  SQL_TABLES_FULL=$(echo "$SQL_OPS" \
    | grep -oiE '(INSERT INTO|UPDATE|DELETE FROM|UPSERT INTO)\s+[a-z_]+' \
    | sed -E 's/(INSERT INTO|UPDATE|DELETE FROM|UPSERT INTO)\s+//i' \
    | sort | uniq -c | sort -rn \
    | awk '{print $2 " (" $1 " ops)"}' | tr '\n' ', ' | sed 's/,$//')
  if [ -n "$SQL_TABLES_FULL" ]; then
    SUMMARY_PARTS="Database writes: ${SQL_TABLES_FULL}."
  else
    SUMMARY_PARTS="Executed ${SQL_WRITES} SQL write(s)."
  fi
fi

# Describe file work
if [ -n "$FILES_LIST" ]; then
  FILE_COUNT=$(echo "$FILES_LIST" | wc -l | tr -d ' ')
  FILES_DISPLAY=$(echo "$FILES_LIST" | head -10 | xargs -I{} basename {} | sort -u | tr '\n' ', ' | sed 's/,$//')
  SUMMARY_PARTS="${SUMMARY_PARTS} Modified ${FILE_COUNT} file(s): ${FILES_DISPLAY}."
fi

# Describe agent work
if [ -n "$NAMED_AGENTS" ]; then
  SUMMARY_PARTS="${SUMMARY_PARTS} Used agents: ${NAMED_AGENTS}."
fi
if [ "$QC_SPAWNED" -gt 0 ]; then
  SUMMARY_PARTS="${SUMMARY_PARTS} QC: ${QC_SPAWNED} review(s) run."
fi

# Fallback if somehow empty
if [ -z "$SUMMARY_PARTS" ]; then
  SUMMARY_PARTS="Session activity: ${SQL_WRITES} SQL write(s), ${FILE_WRITES} file write(s), ${AGENT_SPAWNS} agent(s) spawned."
fi

SUMMARY="$SUMMARY_PARTS"

# Build tags from agents used
TAGS='["auto-saved"]'
if [ -n "$AGENTS_LIST" ]; then
  TAGS=$(echo "$AGENTS_LIST" | head -10 | jq -R -s 'split("\n") | map(select(. != "")) | . + ["auto-saved"]')
fi

# Build items_pending — include any pending action items context
PENDING='["Review auto-saved session for additional context"]'

# ─── Save to chat_sessions (with deduplication) ─────────────────────────────

if [ -z "$SUPA_KEY" ]; then
  echo '{"systemMessage": "WARNING: Cannot auto-save session — SUPABASE_SERVICE_ROLE_KEY not set."}'
  exit 0
fi

# Escape summary for JSON
SUMMARY_ESC=$(echo "$SUMMARY" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | tr '\n' ' ')
TITLE_ESC=$(echo "$SESSION_TITLE" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | tr '\n' ' ')

USER_ID_FIELD=""
if [ -n "$CURRENT_USER_ID" ]; then
  USER_ID_FIELD="\"created_by_user_id\": \"$CURRENT_USER_ID\","
fi

# ─── Deduplication: check for auto-saved session within the last 30 minutes ─

THIRTY_MIN_AGO=$(date -u -v-30M +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d '30 minutes ago' +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo "")

EXISTING_SESSION_ID=""
if [ -n "$THIRTY_MIN_AGO" ] && [ -n "$SUPA_KEY" ]; then
  DEDUP_RESP=$(curl -s --max-time 10 \
    "${SUPA_URL}/chat_sessions?tags=cs.%7B%22auto-saved%22%7D&created_at=gte.${THIRTY_MIN_AGO}&order=created_at.desc&limit=1&select=id" \
    -H "apikey: ${SUPA_KEY}" \
    -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)
  EXISTING_SESSION_ID=$(echo "$DEDUP_RESP" | jq -r '.[0].id // empty' 2>/dev/null)
fi

BODY=$(cat <<EOF
{
  ${USER_ID_FIELD}
  "title": "$TITLE_ESC",
  "session_date": "$TODAY",
  "summary": "$SUMMARY_ESC",
  "items_completed": [],
  "items_pending": $PENDING,
  "files_modified": $FILES_JSON,
  "tags": $TAGS
}
EOF
)

SESSION_ID=""

if [ -n "$EXISTING_SESSION_ID" ]; then
  # UPDATE existing session (merge/patch) instead of creating a duplicate
  RESPONSE=$(curl -s --max-time 10 \
    "${SUPA_URL}/chat_sessions?id=eq.${EXISTING_SESSION_ID}" \
    -X PATCH \
    -H "apikey: ${SUPA_KEY}" \
    -H "Authorization: Bearer ${SUPA_KEY}" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=representation" \
    -d "$BODY" 2>/dev/null)
  SESSION_ID=$(echo "$RESPONSE" | jq -r '.[0].id // empty' 2>/dev/null)
  SAVE_MODE="updated"
else
  # INSERT new session
  RESPONSE=$(curl -s --max-time 10 \
    "${SUPA_URL}/chat_sessions" \
    -H "apikey: ${SUPA_KEY}" \
    -H "Authorization: Bearer ${SUPA_KEY}" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=representation" \
    -d "$BODY" 2>/dev/null)
  SESSION_ID=$(echo "$RESPONSE" | jq -r '.[0].id // empty' 2>/dev/null)
  SAVE_MODE="created"
fi

# ─── Save to raw_content for embeddings ──────────────────────────────────────

if [ -n "$SESSION_ID" ]; then
  RAW_BODY=$(cat <<EOF
{
  "source_table": "chat_sessions",
  "source_id": "$SESSION_ID",
  "full_text": "$SUMMARY_ESC"
}
EOF
)

  if [ "$SAVE_MODE" = "updated" ]; then
    # Update existing raw_content entry for this session
    curl -s --max-time 10 \
      "${SUPA_URL}/raw_content?source_table=eq.chat_sessions&source_id=eq.${SESSION_ID}" \
      -X PATCH \
      -H "apikey: ${SUPA_KEY}" \
      -H "Authorization: Bearer ${SUPA_KEY}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=minimal" \
      -d "{\"full_text\": \"$SUMMARY_ESC\"}" 2>/dev/null
  else
    curl -s --max-time 10 \
      "${SUPA_URL}/raw_content" \
      -H "apikey: ${SUPA_KEY}" \
      -H "Authorization: Bearer ${SUPA_KEY}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=minimal" \
      -d "$RAW_BODY" 2>/dev/null
  fi
fi

# ─── Action: Auto-close matching action items ────────────────────────────────

# If the agent saved the session (with items_completed), pull those and auto-close
# If the hook saved it (fallback), items_completed is empty so this is a no-op
if [ -n "$SESSION_ID" ]; then
  # Fetch the items_completed from the just-saved session
  ITEMS_RESP=$(curl -s --max-time 10 \
    "${SUPA_URL}/chat_sessions?id=eq.${SESSION_ID}&select=items_completed" \
    -H "apikey: ${SUPA_KEY}" \
    -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)

  ITEMS_JSON=$(echo "$ITEMS_RESP" | jq -r '.[0].items_completed // "[]"' 2>/dev/null)
  ITEMS_COUNT=$(echo "$ITEMS_JSON" | jq 'length' 2>/dev/null || echo "0")

  if [ "$ITEMS_COUNT" -gt 0 ]; then
    # Call auto_close_action_items RPC
    CLOSE_RESP=$(curl -s --max-time 15 \
      "${SUPA_URL}/rpc/auto_close_action_items" \
      -H "apikey: ${SUPA_KEY}" \
      -H "Authorization: Bearer ${SUPA_KEY}" \
      -H "Content-Type: application/json" \
      -d "{\"completed_items\": ${ITEMS_JSON}}" 2>/dev/null)

    CLOSED_COUNT=$(echo "$CLOSE_RESP" | jq 'length' 2>/dev/null || echo "0")
    if [ "$CLOSED_COUNT" -gt 0 ]; then
      CLOSED_TITLES=$(echo "$CLOSE_RESP" | jq -r '.[].action_item_title' 2>/dev/null | tr '\n' ', ' | sed 's/,$//')
      WARNINGS="${WARNINGS}\n- Auto-closed ${CLOSED_COUNT} action item(s): ${CLOSED_TITLES}"
    fi
  fi
fi

# ─── QC compliance warning (informational) ───────────────────────────────────

if [ "$SQL_WRITES" -gt 0 ] || [ "$FILE_WRITES" -gt 0 ]; then
  if [ "$QC_SPAWNED" -eq 0 ]; then
    WARNINGS="${WARNINGS}\n- CRITICAL: QC agent was not spawned during a session with writes."
  fi
fi

# Check if executable code was written but code-audit-agent wasn't spawned
CODE_FILES_WRITTEN=$(grep -E "FILE_WRITE=.*\.(sh|js|py)$" "$LATEST_STATE" 2>/dev/null | wc -l | tr -d ' ')
CODE_AUDIT_RAN=$(grep -E "AGENT_SPAWN=.*code-audit-agent" "$LATEST_STATE" 2>/dev/null | wc -l | tr -d ' ')
if [ "$CODE_FILES_WRITTEN" -gt 0 ] && [ "$CODE_AUDIT_RAN" -eq 0 ]; then
  WARNINGS="${WARNINGS}\n- WARNING: ${CODE_FILES_WRITTEN} executable script(s) were written but code-audit-agent was not spawned to verify they run correctly."
fi

# ─── Auto-sync .claude/ to git ────────────────────────────────────────────

SYNC_MSG=""
cd "$PROJECT_ROOT" 2>/dev/null
if git remote -v 2>/dev/null | grep -q 'creekside-agent-system'; then
  if ! git diff --quiet .claude/ 2>/dev/null || git ls-files --others --exclude-standard .claude/ 2>/dev/null | grep -q .; then
    git add .claude/ CLAUDE.md .gitignore 2>/dev/null
    git commit -m "Auto-sync: session $(date +%Y-%m-%d-%H%M)" --quiet 2>/dev/null
    if git push origin main --quiet 2>/dev/null; then
      SYNC_MSG=" Infrastructure auto-pushed to creekside-agent-system."
    else
      SYNC_MSG=" WARNING: .claude/ changes detected but git push failed."
    fi
  fi
fi

# ─── Auto-sync ~/creekside-pipelines to git ──────────────────────────────────

PIPELINES_DIR="$HOME/creekside-pipelines"
if [ -d "$PIPELINES_DIR/.git" ]; then
  cd "$PIPELINES_DIR" 2>/dev/null
  if ! git diff --quiet 2>/dev/null || git ls-files --others --exclude-standard 2>/dev/null | grep -q .; then
    git add -A 2>/dev/null
    git commit -m "Auto-sync: session $(date +%Y-%m-%d-%H%M)" --quiet 2>/dev/null
    if git push origin main --quiet 2>/dev/null; then
      SYNC_MSG="${SYNC_MSG} Pipelines auto-pushed to creekside-pipelines."
    else
      SYNC_MSG="${SYNC_MSG} WARNING: creekside-pipelines changes detected but git push failed."
    fi
  fi
  cd "$PROJECT_ROOT" 2>/dev/null
fi

# ─── Clean up stale state files (older than 24h) ────────────────────────────

find "$STATE_DIR" -name "*.state" -mtime +1 -delete 2>/dev/null

# ─── Output ──────────────────────────────────────────────────────────────────

STATS="Session ${SAVE_MODE} in chat_sessions (${SESSION_TITLE}). ${SQL_WRITES} SQL, ${MEANINGFUL_FILE_WRITES} file(s), ${AGENT_SPAWNS} agent(s), ${QC_SPAWNED} QC.${SYNC_MSG}"
if [ -n "$WARNINGS" ]; then
  STATS="${STATS} Notes:${WARNINGS}"
fi

echo "{\"systemMessage\": \"$(echo "$STATS" | sed 's/"/\\"/g' | tr '\n' ' ')\"}"
exit 0