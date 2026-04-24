#!/bin/bash
# PreToolUse hook (Agent tool): Warn if building an agent without agent-builder-agent.
# Informational only — always exits 0, never blocks.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null)

# Only fire on Agent tool
[ "$TOOL" != "Agent" ] && exit 0

PROMPT=$(echo "$INPUT" | jq -r '.tool_input.prompt // empty' 2>/dev/null)
SUBAGENT=$(echo "$INPUT" | jq -r '.tool_input.subagent_type // empty' 2>/dev/null)

# If already using agent-builder-agent, no warning needed
[ "$SUBAGENT" = "agent-builder-agent" ] && exit 0

# Check if the prompt looks like an agent-building task
BUILD_KEYWORDS="build.*agent|create.*agent|new.*agent|scaffold.*agent|write.*agent.*file|agent.*definition|build.*sub-?agent"
if echo "$PROMPT" | grep -qiE "$BUILD_KEYWORDS"; then
  echo '{"systemMessage": "AGENT BUILD DETECTED: You must use agent-builder-agent (subagent_type=\"agent-builder-agent\") for all agent builds. Do not build agents inline or with general-purpose agents."}'
fi

exit 0
