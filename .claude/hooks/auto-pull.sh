#!/bin/bash
# SessionStart hook: Auto-pull latest infrastructure from git.
# Ensures every new chat starts with the latest hooks, agents, and settings.
# Also ensures ~/creekside-dashboard/ is cloned + up to date so contractors
# can edit client reports through the report-editor-agent without any setup.
# Fails silently on session start — a network issue should never block startup.
# Logs failures to $LOG_FILE so Peterson can diagnose remotely.

LOG_FILE="$HOME/.creekside-hook.log"
log_err() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] auto-pull: $*" >> "$LOG_FILE"; }

BRAIN_UPDATED=0
BRAIN_PULL_FAILED=0

# --- Brain repo (current project dir) ---
if cd "$CLAUDE_PROJECT_DIR" 2>/dev/null; then
  if git remote -v 2>/dev/null | grep -q 'creekside-agent-system'; then
    PULL_OUTPUT=$(git pull --ff-only --quiet origin main 2>&1)
    PULL_STATUS=$?
    if [ $PULL_STATUS -eq 0 ]; then
      if ! echo "$PULL_OUTPUT" | grep -q "Already up to date"; then
        chmod +x .claude/hooks/*.sh 2>/dev/null
        BRAIN_UPDATED=1
      fi
    else
      log_err "brain pull failed: $PULL_OUTPUT"
      BRAIN_PULL_FAILED=1
    fi
  fi
fi

# --- Dashboard repo ($HOME/creekside-dashboard) ---
# Synchronous (no &) — eliminates race with report-editor-agent on first session.
# Adds ~1-2s to session start on subsequent runs, ~10s once on first-ever clone.
DASH_DIR="$HOME/creekside-dashboard"

if [ ! -d "$DASH_DIR/.git" ]; then
  CLONE_OUTPUT=$(git clone --quiet https://github.com/creekside-marketing/creekside-dashboard.git "$DASH_DIR" 2>&1)
  if [ $? -ne 0 ]; then
    log_err "dashboard clone failed: $CLONE_OUTPUT"
    echo '{"systemMessage": "Warning: could not clone creekside-dashboard. Check ~/.creekside-hook.log."}'
  fi
elif cd "$DASH_DIR" 2>/dev/null; then
  # Only pull if working tree is clean — never clobber a contractor's in-progress edits
  if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
    PULL_OUTPUT=$(git pull --ff-only --quiet origin main 2>&1)
    if [ $? -ne 0 ]; then
      log_err "dashboard pull failed: $PULL_OUTPUT"
    fi
  else
    log_err "dashboard has local changes, skipping pull: $(git status --porcelain | head -3 | tr '\n' ';')"
  fi
fi

if [ $BRAIN_UPDATED -eq 1 ]; then
  echo '{"systemMessage": "Infrastructure updated from git (auto-pull)."}'
fi

# Loud failure: a silently stale machine caused weeks of degraded output
# (Queenie, Sep 2026 -- local commits on main made ff-only fail every session).
# Make the session itself announce the problem instead of burying it in a log.
if [ $BRAIN_PULL_FAILED -eq 1 ]; then
  echo '{"systemMessage": "WARNING: auto-pull FAILED -- this machine may be running STALE infrastructure (diverged clone or network issue). Claude: before doing any client or proposal work, run git fetch origin && git rev-list --count origin/main..HEAD in the project repo. If the count is greater than 0, this clone has diverged and cannot self-update. STOP and tell the user to message Peterson in ClickUp with a screenshot of this warning."}'
fi

exit 0
