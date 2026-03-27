---
name: gmail-organizer-agent
description: "Executes Gmail label changes from a triage plan. Applies GPS folder labels, client labels, and removes from inbox. Uses the gmail_organizer.py script with gmail.modify OAuth scope."
tools: Bash, Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql
model: sonnet
db_record: 8ffcb7b3-3b54-49d3-9acd-6326d85c904e
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'gmail-organizer-agent';
