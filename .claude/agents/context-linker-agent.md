---
name: context-linker-agent
description: "Background maintenance agent that cross-references entries across platforms and fills in missing client_id values. Uses match_incoming_client() and auto_link_client_ids() to connect records to the correct clients. Run daily after pipeline syncs complete."
tools: Bash, Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql
model: sonnet
db_record: 000076c0-bbe4-4106-931b-7a51bef1ed40
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'context-linker-agent';
