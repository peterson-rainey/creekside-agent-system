---
name: db-monitor-agent
description: "Background maintenance agent that monitors the RAG database for errors, data gaps, and anomalies. Detects: missing daily pipeline data, orphaned raw_content rows, embedding NULL gaps, table size anomalies, stale pipelines, client_id linkage gaps, and pipeline_alerts. Run autonomously on a schedule or on-demand."
tools: Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 30dbe93e-0561-4786-b83d-4a0813507d4a
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'db-monitor-agent';
