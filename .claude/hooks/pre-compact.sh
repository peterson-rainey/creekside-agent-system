#!/bin/bash
# PreCompact hook: Save important context before Claude compacts
# Adapted from ECC's pre-compact.js
# Logs compaction events and preserves session state so context isn't lost silently

TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
SESSION_ID="${CLAUDE_SESSION_ID:-unknown}"
LOG_DIR="$HOME/.claude/session-data"
LOG_FILE="${LOG_DIR}/compaction-log.txt"

# Ensure directory exists
mkdir -p "$LOG_DIR" 2>/dev/null

# Log the compaction event
echo "[${TIMESTAMP}] Session ${SESSION_ID}: context compaction triggered" >> "$LOG_FILE" 2>/dev/null

# Inject reminder to save important context
echo "{\"systemMessage\": \"Context is being compacted. Before this happens: if you discovered important facts, corrections, or decisions this session that aren't saved yet, note them now — they may be lost after compaction. Key items to preserve: client facts → client_context_cache, process learnings → agent_knowledge, session progress → update your task list.\"}"

exit 0
