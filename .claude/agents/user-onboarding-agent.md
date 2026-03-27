---
name: user-onboarding-agent
description: "Onboards new users into the multi-tenant RAG database system"
tools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep", "mcp__claude_ai_Supabase__execute_sql", "mcp__claude_ai_Supabase__apply_migration"]
model: sonnet
db_record: ba8272fc-2f44-4123-b7ef-658f4bd1dc4a
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'user-onboarding-agent';
