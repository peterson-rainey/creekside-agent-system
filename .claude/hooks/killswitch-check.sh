#!/bin/bash
# PreToolUse hook: KILL SWITCH — blocks ALL operations when KILLSWITCH.md exists
# Drop KILLSWITCH.md in the project root to freeze all agents instantly.
# Delete KILLSWITCH.md to resume normal operations.
#
# Exit 2 = BLOCK ALL OPERATIONS
# Exit 0 = ALLOW (no kill switch active)

# Find the project root (where .claude/ lives)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Check for KILLSWITCH.md in project root
if [ -f "$PROJECT_ROOT/KILLSWITCH.md" ]; then
  REASON=$(head -1 "$PROJECT_ROOT/KILLSWITCH.md" 2>/dev/null || echo "No reason given")
  echo "KILL SWITCH ACTIVE: All agent operations are frozen. Reason: $REASON — Delete KILLSWITCH.md to resume." >&2
  exit 2
fi

exit 0
