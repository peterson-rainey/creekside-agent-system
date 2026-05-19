#!/bin/bash
# PostToolUse hook: Monitor agent/skill/scheduled-task file edits + auto-commit to git + push to GitHub
# - New file creation: commit + push, no QC needed
# - Existing file modification: commit + push, log QC recommendation
# Always exits 0 (never blocks)

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
SESSION=$(echo "$INPUT" | jq -r '.session_id // "unknown"')
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Only care about Write/Edit to tracked files
if ! echo "$TOOL" | grep -qiE '^(Write|Edit)$'; then
  exit 0
fi

# Check if it's an agent file, skill file, scheduled task, or other .claude/ file worth tracking
IS_AGENT=false
IS_SKILL=false
IS_TASK=false
IS_TRACKED=false

IS_CLAUDE_MD=false

IS_CONTRACTOR_SKILL=false

if echo "$FILE" | grep -qE '\.claude/agents/.*\.md$'; then
  IS_AGENT=true
  IS_TRACKED=true
elif echo "$FILE" | grep -qE '\.claude/skills/.*\.md$'; then
  IS_SKILL=true
  IS_TRACKED=true
elif echo "$FILE" | grep -qE '\.claude/contractor-skills/.*\.md$'; then
  IS_CONTRACTOR_SKILL=true
  IS_SKILL=true
  IS_TRACKED=true
elif echo "$FILE" | grep -qE '\.claude/scheduled-tasks/.*\.md$'; then
  IS_TASK=true
  IS_TRACKED=true
elif echo "$FILE" | grep -qE 'CLAUDE\.md$'; then
  IS_CLAUDE_MD=true
  IS_TRACKED=true
fi

# Skip if not a tracked file
[ "$IS_TRACKED" = false ] && exit 0

AGENT_NAME=$(basename "$FILE" .md)
# For scheduled tasks, use the parent directory name (task ID) instead of generic "SKILL"
if [ "$IS_TASK" = true ]; then
  AGENT_NAME=$(basename "$(dirname "$FILE")")
elif [ "$IS_CLAUDE_MD" = true ]; then
  AGENT_NAME="CLAUDE.md"
fi

LOG_FILE="/tmp/claude-agent-edits-$(date +%Y%m%d).jsonl"
CLAUDE_DIR="$(echo "$FILE" | sed 's|/agents/.*||;s|/contractor-skills/.*||;s|/skills/.*||;s|/scheduled-tasks/.*||')"

# Determine if new or modified (subshell to avoid changing cwd)
IS_NEW="true"
if [ -d "$CLAUDE_DIR/.git" ]; then
  if (cd "$CLAUDE_DIR" && git log --oneline -1 -- "$(echo "$FILE" | sed "s|$CLAUDE_DIR/||")" 2>/dev/null) | grep -q .; then
    IS_NEW="false"
  fi
fi

# Determine file type label for commit message
if [ "$IS_AGENT" = true ]; then
  TYPE_LABEL="agent"
elif [ "$IS_CONTRACTOR_SKILL" = true ]; then
  TYPE_LABEL="contractor-skill"
elif [ "$IS_SKILL" = true ]; then
  TYPE_LABEL="skill"
elif [ "$IS_TASK" = true ]; then
  TYPE_LABEL="scheduled-task"
elif [ "$IS_CLAUDE_MD" = true ]; then
  TYPE_LABEL="system-config"
else
  TYPE_LABEL="file"
fi

# Log the change
if [ "$IS_NEW" = "true" ]; then
  ACTION="CREATED"
  QC_NEEDED="false"
  COMMIT_MSG="New $TYPE_LABEL: $AGENT_NAME"
else
  ACTION="MODIFIED"
  QC_NEEDED="true"
  COMMIT_MSG="Updated $TYPE_LABEL: $AGENT_NAME"
fi

jq -cn \
  --arg ts "$TIMESTAMP" \
  --arg session "$SESSION" \
  --arg agent "$AGENT_NAME" \
  --arg type "$TYPE_LABEL" \
  --arg action "$ACTION" \
  --arg qc "$QC_NEEDED" \
  '{timestamp: $ts, session: $session, name: $agent, type: $type, action: $action, qc_needed: ($qc == "true")}' \
  >> "$LOG_FILE" 2>/dev/null

# Auto-commit and push to GitHub (subshell to avoid changing cwd, background)
if [ -d "$CLAUDE_DIR/.git" ]; then
  (
    cd "$CLAUDE_DIR"
    git add -A 2>/dev/null
    # Only commit if there are staged changes
    if ! git diff --cached --quiet 2>/dev/null; then
      git commit -m "$COMMIT_MSG" --quiet 2>/dev/null
      git push origin main --quiet 2>/dev/null &
    fi
  )
fi

# DB mirroring: sync agent file content to agent_definitions (upsert)
# Files are the source of truth; DB copy exists for Railway scheduled agents and routing.
# Uses POST with on-conflict upsert so NEW agents get inserted automatically.
if [ "$IS_AGENT" = true ] && [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  (
    SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
    SUPA_KEY="$SUPABASE_SERVICE_ROLE_KEY"

    # Read full file content
    FILE_CONTENT=$(cat "$FILE" 2>/dev/null) || true

    if [ -n "$FILE_CONTENT" ]; then
      # Parse YAML frontmatter for metadata (between first pair of ---)
      FRONTMATTER=$(sed -n '/^---$/,/^---$/p' "$FILE" 2>/dev/null | sed '1d;$d')

      # Extract fields from frontmatter (with defaults for required NOT NULL columns)
      FM_DESC=$(echo "$FRONTMATTER" | sed -n 's/^description: *"\{0,1\}\(.*\)"\{0,1\}$/\1/p' | head -1)
      FM_DEPT=$(echo "$FRONTMATTER" | sed -n 's/^department: *//p' | head -1)
      FM_TYPE=$(echo "$FRONTMATTER" | sed -n 's/^agent_type: *//p' | head -1)
      FM_MODEL=$(echo "$FRONTMATTER" | sed -n 's/^model: *//p' | head -1)
      FM_READONLY=$(echo "$FRONTMATTER" | sed -n 's/^read_only: *//p' | head -1)

      # Derive display_name from AGENT_NAME: meta-audit-agent -> Meta Audit Agent
      DISPLAY_NAME=$(echo "$AGENT_NAME" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')

      # Apply defaults for required fields
      [ -z "$FM_DESC" ] && FM_DESC="Agent: $AGENT_NAME"
      [ -z "$FM_DEPT" ] && FM_DEPT="operations"
      [ -z "$FM_TYPE" ] && FM_TYPE="worker"
      [ -z "$FM_MODEL" ] && FM_MODEL="sonnet"
      [ -z "$FM_READONLY" ] && FM_READONLY="false"

      # Build the full upsert payload
      PAYLOAD=$(jq -n \
        --arg name "$AGENT_NAME" \
        --arg display_name "$DISPLAY_NAME" \
        --arg description "$FM_DESC" \
        --arg department "$FM_DEPT" \
        --arg agent_type "$FM_TYPE" \
        --arg model "$FM_MODEL" \
        --argjson read_only "$FM_READONLY" \
        --arg system_prompt "$FILE_CONTENT" \
        --arg status "active" \
        '{name: $name, display_name: $display_name, description: $description, department: $department, agent_type: $agent_type, model: $model, read_only: $read_only, system_prompt: $system_prompt, status: $status}' 2>/dev/null)

      if [ -n "$PAYLOAD" ]; then
        # POST with upsert: inserts new rows, updates existing ones (on name conflict)
        curl -s --max-time 10 \
          "${SUPA_URL}/agent_definitions" \
          -X POST \
          -H "apikey: ${SUPA_KEY}" \
          -H "Authorization: Bearer ${SUPA_KEY}" \
          -H "Content-Type: application/json" \
          -H "Prefer: return=minimal,resolution=merge-duplicates" \
          -d "$PAYLOAD" \
          2>/dev/null > /dev/null &
      fi
    fi
  ) 2>/dev/null
fi

# DB mirroring: sync core skill file metadata to agent_knowledge
# Updates the content preview for "Skill (filesystem):" entries when a core SKILL.md changes.
if [ "$IS_SKILL" = true ] && [ "$IS_CONTRACTOR_SKILL" != true ] && [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  (
    SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
    SUPA_KEY="$SUPABASE_SERVICE_ROLE_KEY"

    SKILL_NAME=$(echo "$FILE" | sed -E 's|.*/skills/([^/]+)/.*|\1|')
    SKILL_CONTENT=$(head -c 2000 "$FILE" 2>/dev/null) || true

    if [ -n "$SKILL_CONTENT" ] && [ -n "$SKILL_NAME" ]; then
      ENCODED=$(jq -n \
        --arg content "$SKILL_CONTENT" \
        --arg updated "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
        '{"content": $content, "updated_at": $updated}' 2>/dev/null)

      if [ -n "$ENCODED" ]; then
        FILTER_TITLE=$(python3 -c "import urllib.parse; print(urllib.parse.quote('Skill (filesystem): $SKILL_NAME'))" 2>/dev/null)
        [ -z "$FILTER_TITLE" ] && FILTER_TITLE=$(printf 'Skill (filesystem): %s' "$SKILL_NAME" | sed 's/ /%20/g; s/(/%28/g; s/)/%29/g; s/:/%3A/g')
        curl -s --max-time 10 \
          "${SUPA_URL}/agent_knowledge?type=eq.skill&title=eq.${FILTER_TITLE}" \
          -X PATCH \
          -H "apikey: ${SUPA_KEY}" \
          -H "Authorization: Bearer ${SUPA_KEY}" \
          -H "Content-Type: application/json" \
          -H "Prefer: return=minimal" \
          -d "$ENCODED" \
          2>/dev/null > /dev/null &
      fi
    fi
  ) 2>/dev/null
fi

# DB mirroring: sync contractor skill to agent_knowledge
# Auto-creates the entry if it doesn't exist (POST with Prefer: resolution=merge-duplicates).
if [ "$IS_CONTRACTOR_SKILL" = true ] && [ -n "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  (
    SUPA_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1"
    SUPA_KEY="$SUPABASE_SERVICE_ROLE_KEY"

    # Path: .claude/contractor-skills/{contractor}/{skill-name}/SKILL.md
    CONTRACTOR_NAME=$(echo "$FILE" | sed -E 's|.*/contractor-skills/([^/]+)/.*|\1|')
    SKILL_NAME=$(echo "$FILE" | sed -E 's|.*/contractor-skills/[^/]+/([^/]+)/.*|\1|')
    SKILL_CONTENT=$(head -c 2000 "$FILE" 2>/dev/null) || true

    if [ -n "$SKILL_CONTENT" ] && [ -n "$SKILL_NAME" ] && [ -n "$CONTRACTOR_NAME" ]; then
      TITLE="Contractor skill (${CONTRACTOR_NAME}): ${SKILL_NAME}"

      # Upsert: POST with on-conflict resolution
      PAYLOAD=$(jq -n \
        --arg title "$TITLE" \
        --arg content "$SKILL_CONTENT" \
        --arg type "skill" \
        --arg contractor "$CONTRACTOR_NAME" \
        --arg skill "$SKILL_NAME" \
        '{type: $type, title: $title, content: $content, tags: ["contractor-skill", ("contractor:" + $contractor)], source_context: ("contractor-skills/" + $contractor + "/" + $skill), confidence: "verified"}' 2>/dev/null)

      if [ -n "$PAYLOAD" ]; then
        # Try PATCH first (update existing)
        FILTER_TITLE=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$TITLE'))" 2>/dev/null)
        [ -z "$FILTER_TITLE" ] && FILTER_TITLE=$(echo "$TITLE" | sed 's/ /%20/g; s/(/%28/g; s/)/%29/g; s/:/%3A/g')

        HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 \
          "${SUPA_URL}/agent_knowledge?title=eq.${FILTER_TITLE}" \
          -X PATCH \
          -H "apikey: ${SUPA_KEY}" \
          -H "Authorization: Bearer ${SUPA_KEY}" \
          -H "Content-Type: application/json" \
          -H "Prefer: return=minimal" \
          -d "$(jq -n --arg content "$SKILL_CONTENT" --arg updated "$(date -u +%Y-%m-%dT%H:%M:%SZ)" '{"content": $content, "updated_at": $updated}')" \
          2>/dev/null)

        # If PATCH matched 0 rows (204 with no changes), create new entry
        if [ "$HTTP_CODE" = "204" ]; then
          # Check if row actually exists
          EXISTS=$(curl -s --max-time 5 \
            "${SUPA_URL}/agent_knowledge?title=eq.${FILTER_TITLE}&select=id" \
            -H "apikey: ${SUPA_KEY}" \
            -H "Authorization: Bearer ${SUPA_KEY}" 2>/dev/null)
          ROW_COUNT=$(echo "$EXISTS" | jq 'length' 2>/dev/null || echo "0")
          if [ "$ROW_COUNT" = "0" ]; then
            curl -s --max-time 10 \
              "${SUPA_URL}/agent_knowledge" \
              -X POST \
              -H "apikey: ${SUPA_KEY}" \
              -H "Authorization: Bearer ${SUPA_KEY}" \
              -H "Content-Type: application/json" \
              -H "Prefer: return=minimal" \
              -d "$PAYLOAD" \
              2>/dev/null > /dev/null
          fi
        fi
      fi
    fi
  ) 2>/dev/null &
fi

exit 0
