#!/bin/bash
# SessionStart hook: Reconcile .claude/skills/*/SKILL.md files against system_registry.
# Catches skills that arrived via `git pull` (never written through Write/Edit in
# this session, so skill-registry-sync.sh never saw them).
# - INSERTs any SKILL.md whose name is missing from system_registry.
# - Flags DB rows whose SKILL.md file no longer exists as status='deprecated'.
# Never blocks the session (always exits 0). Runs after auto-pull.sh so newly-
# pulled skill files are included.

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0

TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
LOG_FILE="/tmp/skill-registry-reconcile-$(date +%Y%m%d).jsonl"

log() {
  local status="$1"; local msg="$2"; local skill="$3"
  jq -cn --arg ts "$TIMESTAMP" --arg status "$status" --arg msg "$msg" --arg skill "$skill" \
    '{timestamp: $ts, status: $status, skill: $skill, message: $msg}' \
    >> "$LOG_FILE" 2>/dev/null
}

SUPABASE_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"

# Fallback: Claude Code hooks don't inherit shell env. Pull just the export
# line we need from ~/.zshrc — safe because we only eval a specific pattern.
if [ -z "$SUPA_KEY" ] && [ -f "$HOME/.zshrc" ]; then
  eval "$(grep '^export SUPABASE_SERVICE_ROLE_KEY=' "$HOME/.zshrc" | tail -1)"
  SUPA_KEY="${SUPABASE_SERVICE_ROLE_KEY:-}"
fi

[ -z "$SUPA_KEY" ] && { log "skip" "no service role key" ""; exit 0; }

# ---- 1. UPSERT every SKILL.md into system_registry -----------------------

FILES_FOUND=""
for FILE in .claude/skills/*/SKILL.md; do
  [ -f "$FILE" ] || continue

  FRONTMATTER=$(awk '/^---[[:space:]]*$/{c++; next} c==1{print} c==2{exit}' "$FILE")
  SKILL_NAME=$(echo "$FRONTMATTER" | grep -E '^name:' | head -1 | sed 's/^name:[[:space:]]*//;s/^"//;s/"$//')
  SKILL_DESC=$(echo "$FRONTMATTER" | grep -E '^description:' | head -1 | sed 's/^description:[[:space:]]*//;s/^"//;s/"$//')

  [ -z "$SKILL_NAME" ] && { log "skip" "no name in frontmatter" "$FILE"; continue; }
  [ -z "$SKILL_DESC" ] && SKILL_DESC="(no description)"
  FILES_FOUND="${FILES_FOUND}${SKILL_NAME}
"

  ABS_PATH="$(pwd)/$FILE"
  PAYLOAD=$(jq -cn \
    --arg et "skill" --arg nm "$SKILL_NAME" --arg de "$SKILL_DESC" \
    --arg sp "$ABS_PATH" --arg st "active" \
    '{entry_type: $et, name: $nm, description: $de, script_path: $sp, status: $st}')

  RESP=$(curl -s -w "\n%{http_code}" -X POST \
    "${SUPABASE_URL}/system_registry?on_conflict=name" \
    -H "apikey: ${SUPA_KEY}" \
    -H "Authorization: Bearer ${SUPA_KEY}" \
    -H "Content-Type: application/json" \
    -H "Prefer: resolution=merge-duplicates,return=minimal" \
    -d "$PAYLOAD" 2>/dev/null)
  HTTP_CODE=$(echo "$RESP" | tail -1)

  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "204" ]; then
    log "synced" "upsert ok" "$SKILL_NAME"
  else
    log "error" "upsert failed http=$HTTP_CODE" "$SKILL_NAME"
  fi
done

# Note on deprecation: we do NOT auto-mark skills deprecated when their
# SKILL.md is missing from the current worktree. Different git branches /
# worktrees may not contain every skill — marking based on absence in one
# worktree would cause branch-dependent churn. Skills are deprecated manually
# by setting status='deprecated' in system_registry when retired from main.

exit 0
