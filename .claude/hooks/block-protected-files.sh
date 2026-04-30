#!/bin/bash
# PreToolUse hook: Block modifications to critical system files
# Exit 2 = BLOCK (stderr message shown to Claude)
# Exit 0 = ALLOW

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Skip if no file path (not a file operation)
[ -z "$FILE" ] && exit 0

# ADMIN MODE: if .claude/ADMIN_MODE exists, allow all file writes.
# Peterson enables it with `touch .claude/ADMIN_MODE`.
# The agent MUST delete it after completing all protected file edits.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ADMIN_FLAG="$(dirname "$SCRIPT_DIR")/ADMIN_MODE"
if [ -f "$ADMIN_FLAG" ]; then
  exit 0
fi

# --- CLAUDE.md ---
# Agent table additions are allowed without ADMIN_MODE.
# The Edit tool sends old_string/new_string — if the edit is ONLY adding a row
# to the agent table (contains "| `" pattern for a table row and doesn't remove lines),
# we allow it. All other CLAUDE.md edits still require ADMIN_MODE.
if echo "$FILE" | grep -qE '/CLAUDE\.md$'; then
  # Check if this is an Edit tool call (has old_string/new_string)
  OLD_STR=$(echo "$INPUT" | jq -r '.tool_input.old_string // empty')
  NEW_STR=$(echo "$INPUT" | jq -r '.tool_input.new_string // empty')

  # Allow if: it's an Edit, the new_string contains the old_string (pure addition),
  # and the addition is a table row (starts with "| `")
  if [ -n "$OLD_STR" ] && [ -n "$NEW_STR" ]; then
    # Check that old_string is fully contained in new_string (only adding, not removing)
    if echo "$NEW_STR" | grep -qF "$OLD_STR"; then
      # Extract just the added content by filtering out non-empty OLD_STR lines.
      # NOTE: Must filter empty lines from OLD_STR patterns first, because
      # grep -F "" matches every line, which would make ADDED empty and block valid edits.
      OLD_LINES=$(echo "$OLD_STR" | grep -v '^$' || true)
      if [ -n "$OLD_LINES" ]; then
        ADDED=$(echo "$NEW_STR" | grep -vF "$OLD_LINES" || true)
      else
        ADDED="$NEW_STR"
      fi
      # Allow if added content is only agent table rows (| ` pattern) or empty lines
      if echo "$ADDED" | grep -qE '^\| `' && ! echo "$ADDED" | grep -qvE '^\| `|^$'; then
        exit 0
      fi
    fi
  fi

  echo "BLOCKED: Cannot modify CLAUDE.md — requires ADMIN_MODE." >&2
  exit 2
fi

# --- Agent definitions ---
# ALLOWED: Agents can create and edit agent definitions in .claude/agents/
# QC review of edits to EXISTING agents is handled by a PostToolUse hook
# (see snapshot-agent-edits.sh)

# --- Settings files ---
if echo "$FILE" | grep -qE '\.claude/settings'; then
  echo "BLOCKED: Cannot modify .claude/settings files — requires explicit user approval." >&2
  exit 2
fi

# --- Role files ---
if echo "$FILE" | grep -qE '\.claude/roles/'; then
  echo "BLOCKED: Cannot modify role files in .claude/roles/ — requires ADMIN_MODE." >&2
  exit 2
fi

# --- Hook scripts ---
if echo "$FILE" | grep -qE '\.claude/hooks/'; then
  echo "BLOCKED: Cannot modify hook scripts in .claude/hooks/ — requires explicit user approval." >&2
  exit 2
fi

# --- Environment files ---
if echo "$FILE" | grep -qE '(\.env|\.env\..*)$'; then
  echo "BLOCKED: Cannot modify environment files — requires explicit user approval." >&2
  exit 2
fi

# --- Shell config ---
if echo "$FILE" | grep -qE '(\.zshrc|\.bashrc|\.bash_profile|\.zprofile)$'; then
  echo "BLOCKED: Cannot modify shell config files — requires explicit user approval." >&2
  exit 2
fi

# All checks passed
exit 0
