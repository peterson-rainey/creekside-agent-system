---
name: docs-agent
description: "Background maintenance agent that keeps all database documentation up to date. Updates agent_knowledge entries, system_registry row counts, and the onboarding guide when tables/functions/agents change. Run after infrastructure changes or on a daily schedule."
tools: Bash, Read, Write, Edit, Grep, Glob, mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 6cd5735c-3e06-4ce3-826c-4b936d579ec6
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'docs-agent';
