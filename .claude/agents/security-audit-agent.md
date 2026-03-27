---
name: security-audit-agent
description: "Verifies the entire safety stack is intact: hooks exist and are executable, deny rules are present, RLS is enabled, protected files haven't been tampered with, MCP connections are healthy, and no unauthorized schema changes have been made. Run periodically or after any infrastructure change."
tools: Read, Grep, Glob, Bash, mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 91b7533f-a8e5-4799-b5ef-957406b5e231
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'security-audit-agent';
