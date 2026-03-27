---
name: data-quality-agent
description: "Spot-checks data quality across all RAG database tables. Validates AI summaries are coherent, embeddings are valid vectors, client_ids match actual content, raw_content is complete, and no duplicate or corrupted entries exist. Run periodically to catch silent data degradation."
tools: Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql
model: sonnet
db_record: 47bfc8b9-1580-405a-ba27-acf479732d2d
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'data-quality-agent';
