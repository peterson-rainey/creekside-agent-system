#!/bin/bash
# Check if KILLSWITCH.md exists in project root
# Usage: Run before any autonomous agent invocation
if [ -f "KILLSWITCH.md" ]; then
  echo "KILL SWITCH ACTIVE — aborting autonomous run"
  exit 1
fi
echo "OK — no kill switch detected"
exit 0
