#!/bin/bash
# SessionStart hook: Auto-pull latest infrastructure from git.
# Ensures every new chat starts with the latest hooks, agents, and settings.
# Fails silently — a network issue should never block a session from starting.

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0

# Only pull if this is a git repo with a remote
git remote -v 2>/dev/null | grep -q 'creekside-agent-system' || exit 0

# Pull latest (quiet, fast-forward only — never creates merge commits)
PULL_OUTPUT=$(git pull --ff-only --quiet origin main 2>&1)
PULL_STATUS=$?

if [ $PULL_STATUS -eq 0 ]; then
  # Check if anything actually changed
  if echo "$PULL_OUTPUT" | grep -q "Already up to date"; then
    exit 0
  fi
  # Files were updated — make hooks executable
  chmod +x .claude/hooks/*.sh 2>/dev/null
  echo '{"systemMessage": "Infrastructure updated from git (auto-pull)."}'
fi

# If pull fails (network, merge conflict), silently continue with local files
exit 0
