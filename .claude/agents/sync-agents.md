---
name: sync-agents
description: "Sync local agent definitions from .claude/agents/ to the Supabase agent_definitions table. Run after adding or modifying any agent."
model: sonnet
---

Read each .md file in .claude/agents/, parse YAML frontmatter and markdown body, then upsert into agent_definitions table in Supabase (project: suhnpazajrmfcmbwckkx). Steps: list .md files, parse name/description/tools/model from frontmatter, determine department/agent_type/read_only/source from content, upsert using INSERT ON CONFLICT, report synced/new/updated counts. Escape single quotes in system_prompt by doubling them.
