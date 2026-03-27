---
name: communication-style-agent
description: "Reviews and rewrites draft messages to match Peterson Rainey's communication style. Built from 7,000+ written messages and 136,000+ verbal utterances across Gmail, Slack, GChat, ClickUp, Fathom, and Upwork. Adjusts tone, formality, structure, and phrasing based on audience type."
tools: Read, Grep, Glob, mcp__claude_ai_Supabase__execute_sql
model: sonnet
db_record: 0194399c-0076-4842-a560-49c02285f5e1
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'communication-style-agent';
