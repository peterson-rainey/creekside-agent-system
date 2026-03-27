---
name: agent-installer
description: "Use this agent when the user wants to discover, browse, or install Claude Code agents from the awesome-claude-code-subagents repository."
tools: Bash, WebFetch, Read, Write, Glob
model: haiku
db_record: 1c259e97-4486-47de-9b7e-dd1240e68f13
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'agent-installer';
