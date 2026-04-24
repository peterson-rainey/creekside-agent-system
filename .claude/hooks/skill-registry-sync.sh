#!/bin/bash
# PostToolUse hook: Auto-sync .claude/skills/*/SKILL.md edits into system_registry.
# Fires after any Write/Edit to a SKILL.md file. Parses YAML frontmatter for
# name + description, then UPSERTs to Supabase system_registry.
# Never blocks (always exits 0). Failures log silently to /tmp.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Normalize FILE to a repo-root-relative path so the stored script_path is
# stable across worktrees (each worktree has its own absolute path). Strip
# the working-tree prefix using git if available; fall back to the existing
# value otherwise.
REPO_ROOT=$(cd "$(dirname "$FILE")" 2>/dev/null && git rev-parse --show-toplevel 2>/dev/null)
if [ -n "$REPO_ROOT" ] && [ -n "$FILE" ]; then
  REL_FILE="${FILE#$REPO_ROOT/}"
else
  REL_FILE="$FILE"
fi
LOG_FILE="/tmp/skill-registry-sync-$(date +%Y%m%d).jsonl"

log() {
  local status="$1"; local msg="$2"; local skill="$3"
  jq -cn --arg ts "$TIMESTAMP" --arg status "$status" --arg msg "$msg" --arg skill "$skill" \
    '{timestamp: $ts, status: $status, skill: $skill, message: $msg}' \
    >> "$LOG_FILE" 2>/dev/null
}

# Only care about Write/Edit to a SKILL.md file
echo "$TOOL" | grep -qiE '^(Write|Edit)$' || exit 0
echo "$FILE" | grep -qE '\.claude/skills/[^/]+/SKILL\.md$' || exit 0
[ -f "$FILE" ] || { log "skip" "file missing" ""; exit 0; }

SUPABASE_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Fallback: Claude Code hooks don't inherit shell env. Pull just the export
# line we need from ~/.zshrc — safe because we only eval a specific pattern.
if [ -z "$SUPA_KEY" ] && [ -f "$HOME/.zshrc" ]; then
  eval "$(grep '^export SUPABASE_SERVICE_ROLE_KEY=' "$HOME/.zshrc" | tail -1)"
  SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
fi

[ -z "$SUPA_KEY" ] && { log "skip" "no service role key" ""; exit 0; }

# Parse YAML frontmatter: content between first two '---' markers.
# Extract name + description. Description is single-line (quoted or bare) per
# the skill-creator convention; multi-line descriptions are not currently used.
FRONTMATTER=$(awk '/^---[[:space:]]*$/{c++; next} c==1{print} c==2{exit}' "$FILE")
SKILL_NAME=$(echo "$FRONTMATTER" | grep -E '^name:' | head -1 | sed 's/^name:[[:space:]]*//;s/^"//;s/"$//')
SKILL_DESC=$(echo "$FRONTMATTER" | grep -E '^description:' | head -1 | sed 's/^description:[[:space:]]*//;s/^"//;s/"$//')

[ -z "$SKILL_NAME" ] && { log "skip" "no name in frontmatter" ""; exit 0; }
[ -z "$SKILL_DESC" ] && SKILL_DESC="(no description)"

# Build JSON payload. Use jq for safe escaping of quotes/newlines in description.
# script_path stores REL_FILE (repo-root-relative) so rows don't go stale when
# the worktree that wrote them is cleaned up after merge.
PAYLOAD=$(jq -cn \
  --arg et "skill" \
  --arg nm "$SKILL_NAME" \
  --arg de "$SKILL_DESC" \
  --arg sp "$REL_FILE" \
  --arg st "active" \
  '{entry_type: $et, name: $nm, description: $de, script_path: $sp, status: $st}')

# UPSERT via Supabase REST: on_conflict on (name) — system_registry has a
# UNIQUE constraint on name only.
RESP=$(curl -s -w "\n%{http_code}" -X POST \
  "${SUPABASE_URL}/system_registry?on_conflict=name" \
  -H "apikey: ${SUPA_KEY}" \
  -H "Authorization: Bearer ${SUPA_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates,return=minimal" \
  -d "$PAYLOAD" 2>/dev/null)

HTTP_CODE=$(echo "$RESP" | tail -1)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "204" ]; then
  log "synced" "upsert ok http=$HTTP_CODE" "$SKILL_NAME"
else
  BODY=$(echo "$RESP" | sed '$d')
  log "error" "upsert failed http=$HTTP_CODE body=$BODY" "$SKILL_NAME"
fi

exit 0
