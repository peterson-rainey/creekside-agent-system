#!/bin/bash
# PreToolUse hook: Suggest /compact after sustained tool use
# Adapted from ECC's suggest-compact.js for bash
# Fires on Edit|Write — tracks tool call count and suggests compaction at intervals

SESSION_ID="${CLAUDE_SESSION_ID:-$$}"
COUNTER_FILE="/tmp/claude-compact-counter-${SESSION_ID}"
THRESHOLD="${COMPACT_THRESHOLD:-50}"
REMIND_INTERVAL=25

# Initialize or increment counter
if [ -f "$COUNTER_FILE" ]; then
  COUNT=$(cat "$COUNTER_FILE")
  COUNT=$((COUNT + 1))
else
  COUNT=1
fi
echo "$COUNT" > "$COUNTER_FILE"

# Check if we should suggest compaction
if [ "$COUNT" -eq "$THRESHOLD" ]; then
  echo "{\"systemMessage\": \"Context management: You have made ${COUNT} tool calls this session. Consider running /compact at the next natural break point to free up context budget.\"}"
elif [ "$COUNT" -gt "$THRESHOLD" ]; then
  SINCE_THRESHOLD=$(( (COUNT - THRESHOLD) % REMIND_INTERVAL ))
  if [ "$SINCE_THRESHOLD" -eq 0 ]; then
    echo "{\"systemMessage\": \"Context reminder: ${COUNT} tool calls this session. Run /compact if context is getting long.\"}"
  fi
fi

exit 0
