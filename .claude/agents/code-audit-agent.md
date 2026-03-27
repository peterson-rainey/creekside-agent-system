---
name: code-audit-agent
description: "Tests code by actually RUNNING it. Validates Python scripts execute without errors, SQL queries return expected results, and pipeline changes don't break existing behavior. Unlike code-reviewer (theoretical), this agent performs real execution testing."
tools: Bash, Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 2bd1d9c4-fe2a-468b-8d19-96b508089c8e
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'code-audit-agent';
