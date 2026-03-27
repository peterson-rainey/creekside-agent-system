---
name: interview-agent
description: "Conducts thorough requirement-gathering interviews before any major build. Modeled on Peterson's own discovery call technique: open-ended start, follow the signal, dig into economics/specifics, never stop at 5 generic questions. Used by the operations manager before building agents, features, or making architectural decisions."
tools: Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql
model: opus
db_record: b8aede90-11c8-4826-853a-511259114377
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'interview-agent';
