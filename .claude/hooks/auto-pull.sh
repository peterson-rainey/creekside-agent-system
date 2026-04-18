#!/bin/bash
# SessionStart hook: Auto-pull latest infrastructure from git.
# Ensures every new chat starts with the latest hooks, agents, and settings.
# Also ensures ~/creekside-dashboard/ is cloned + up to date so contractors
# can edit client reports through the report-editor-agent without any setup.
# Fails silently — a network issue should never block a session from starting.

BRAIN_UPDATED=0
DASH_UPDATED=0

# --- Brain repo (current project dir) ---
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null && {
  if git remote -v 2>/dev/null | grep -q 'creekside-agent-system'; then
    PULL_OUTPUT=$(git pull --ff-only --quiet origin main 2>&1)
    if [ $? -eq 0 ] && ! echo "$PULL_OUTPUT" | grep -q "Already up to date"; then
      chmod +x .claude/hooks/*.sh 2>/dev/null
      BRAIN_UPDATED=1
    fi
  fi
}

# --- Dashboard repo ($HOME/creekside-dashboard) ---
# Contractors need this for the report-editor-agent to edit client report files.
DASH_DIR="$HOME/creekside-dashboard"
(
  if [ ! -d "$DASH_DIR/.git" ]; then
    git clone --quiet https://github.com/creekside-marketing/creekside-dashboard.git "$DASH_DIR" 2>/dev/null \
      && DASH_UPDATED=1
  else
    cd "$DASH_DIR" 2>/dev/null || exit 0
    # Only pull if working tree is clean — never clobber a contractor's in-progress edits
    if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
      PULL_OUTPUT=$(git pull --ff-only --quiet origin main 2>&1)
      if [ $? -eq 0 ] && ! echo "$PULL_OUTPUT" | grep -q "Already up to date"; then
        DASH_UPDATED=1
      fi
    fi
  fi
) &
# Don't block session start on the dashboard pull — let it run in background
# (the brain pull above is synchronous because its hooks/agents may be needed immediately)

if [ $BRAIN_UPDATED -eq 1 ]; then
  echo '{"systemMessage": "Infrastructure updated from git (auto-pull)."}'
fi

exit 0
