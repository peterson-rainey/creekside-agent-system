---
name: agent-builder-agent
description: "Builds new sub-agents for the Creekside Marketing agent system. Follows the full 7-step process: research training data, gather requirements, store domain knowledge, create agent file (methodology only), update documentation, run mandatory QC validation (spawns qc-reviewer-agent — build is NOT complete until QC passes), and present results. Use when Peterson requests a new agent or when the operations manager identifies a capability gap."
tools: Bash, Read, Write, Edit, Grep, Glob, mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 01593202-e3cf-4d10-a874-87f5de0a6be9
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'agent-builder-agent';
