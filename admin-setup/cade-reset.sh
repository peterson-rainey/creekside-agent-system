#!/bin/bash
# Creekside Reset Script for Cade
# Authorized by Peterson - 2026-04-29
# Run with: bash $REPO/admin-setup/cade-reset.sh

echo "=== Creekside Reset for Cade ==="
echo ""

echo "=== Step 1: Check auto-pull log ==="
cat ~/.creekside-hook.log 2>/dev/null | tail -10 || echo "(no log file)"
echo ""

echo "=== Step 2: Navigate to repo ==="
REPO="$HOME/Desktop/creekside-workspace"
[ ! -d "$REPO" ] && REPO="$HOME/C-Code - Rag database"
cd "$REPO" || { echo "ERROR: Repo not found. Ask Peterson."; exit 1; }
echo "Found repo."
echo ""

echo "=== Step 3: Stash any local work ==="
git stash --include-untracked -m "pre-reset-$(date +%Y%m%d)" 2>/dev/null || echo "(nothing to stash)"
echo ""

echo "=== Step 4: Force sync to latest ==="
git fetch origin main
git reset --hard origin/main
chmod +x .claude/hooks/*.sh 2>/dev/null || true
echo "Brain repo synced."
echo ""

echo "=== Step 5: Set admin role ==="
printf 'role=admin\nemail=cade@creeksidemarketingpros.com\n' > .claude/user-role.conf
git update-index --skip-worktree .claude/user-role.conf
echo "Role set to admin."
echo ""

echo "=== Step 6: Kill rogue hook ==="
rm -f .claude/hooks/enforce-cade-write-scope.sh
echo "Rogue hook removed."
echo ""

echo "=== Step 7: Reset dashboard repo ==="
if [ -d ~/creekside-dashboard/.git ]; then
  cd ~/creekside-dashboard
  git fetch origin main
  git reset --hard origin/main
  echo "Dashboard synced."
else
  git clone https://github.com/creekside-marketing/creekside-dashboard.git ~/creekside-dashboard
  echo "Dashboard cloned."
fi
echo ""

echo "=== Verify ==="
echo "Role file:"
cat $REPO/.claude/user-role.conf

echo "Rogue hook:"
if [ -f $REPO/.claude/hooks/enforce-cade-write-scope.sh ]; then
  echo "STILL EXISTS (bad)"
else
  echo "GONE (good)"
fi

echo "Dashboard:"
if [ -f ~/creekside-dashboard/package.json ]; then
  echo "EXISTS (good)"
else
  echo "MISSING (bad)"
fi

echo ""
echo "=== DONE. Quit Claude Code (Cmd+Q) and reopen it. ==="
