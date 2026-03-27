---
name: training-extractor-agent
description: "Comprehensively extracts ALL training material, corrections, and preferences from the RAG database for a given topic. Used when building a new agent's SOP or when you need to find every piece of guidance Peterson has given on how to do a specific task. Searches Fathom recordings, Loom videos, Slack messages, Gmail threads, ClickUp comments, and agent_knowledge corrections."
tools: Bash, Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql
model: sonnet
db_record: 1d7222e6-50f4-46e9-931c-6908c351774f
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'training-extractor-agent';
