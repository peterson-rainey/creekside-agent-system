---
name: sop-compliance-agent
description: "Audits agent behavior and team processes against documented SOPs. Checks that scheduled agents ran on time, operational procedures were followed (email GPS labels, action item closure), agent outputs contained required citations and confidence tags, and agent_knowledge entries are current. Complements connectivity-auditor (which checks prompt compliance) and agent-quality-audit (which checks agent completeness) — this agent checks RUNTIME behavior. Spawn when you want a behavioral compliance report, not just a structural one."
tools: mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 4e7adf2e-6a74-48eb-a1bf-405ed75f22c0
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'sop-compliance-agent';
