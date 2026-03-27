---
name: issue-tracking-agent
description: "Scans all communication platforms for client complaints, escalations, tracking failures, and negative sentiment. Classifies issues by severity (critical/high/medium/low) and flags clients as churn risks. Spawn when Peterson wants to know what client problems are brewing, or on a scheduled basis to surface issues before they become cancellations."
tools: mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 0eded00a-c633-44d0-b206-79d5837a494d
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'issue-tracking-agent';
