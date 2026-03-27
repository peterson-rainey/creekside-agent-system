---
name: data-promotion-agent
description: "Reviews contributor data and promotes worthy entries to the authoritative dataset"
tools: ["Read", "Grep", "Glob", "mcp__claude_ai_Supabase__execute_sql"]
model: sonnet
db_record: a77f6cd2-6445-4fe0-b167-d7baac2418ae
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'data-promotion-agent';
