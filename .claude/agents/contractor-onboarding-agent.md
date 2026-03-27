---
name: contractor-onboarding-agent
description: "Automates contractor onboarding at Creekside Marketing. Takes a new contractor's name, role, email, and pay structure; deduplicates against team_members; creates the team_member record; generates a role-specific checklist; creates action_items for each onboarding step; and outputs a formatted onboarding brief. Spawn when Peterson or Cade says they hired a new contractor and want to kick off onboarding."
tools: mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: bb20cf28-cfb5-4fe5-9010-da5e24b767d0
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'contractor-onboarding-agent';
