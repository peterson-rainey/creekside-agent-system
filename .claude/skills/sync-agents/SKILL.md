---
name: sync-agents
description: "Sync local agent definitions from .claude/agents/ to the Supabase agent_definitions table. Run after adding or modifying any agent."
disable-model-invocation: true
---

# Sync Agent Definitions to Supabase

Read each `.md` file in `.claude/agents/`, parse the YAML frontmatter and markdown body, then upsert into the `agent_definitions` table in Supabase (project: `suhnpazajrmfcmbwckkx`).

## Steps

1. List all `.md` files in `.claude/agents/` using Glob
2. For each file, read it and parse:
   - **YAML frontmatter** (between `---` markers): extract `name`, `description`, `tools`, `model`
   - **Markdown body** (after second `---`): this becomes `system_prompt`
3. Determine metadata from the file content:
   - `department`: Look for department tags like [comms], [client], [qc], [infra], [meta], [sales], [ops], [utility] in the description or body. Default to "utility" if not found.
   - `agent_type`: "qc" if name contains "qc" or "reviewer", "research" if read-only analysis, "meta" if agent management, "worker" for everything else
   - `read_only`: true if tools list does NOT include Write, Edit, or Bash with write operations
   - `source`: "voltagent" if the file was downloaded from the VoltAgent repo (check for VoltAgent patterns), "custom" otherwise
4. For each agent, upsert into Supabase using `execute_sql`:

```sql
INSERT INTO agent_definitions (name, display_name, description, department, agent_type, system_prompt, tools, read_only, model, source, version, updated_at)
VALUES ('AGENT_NAME', 'DISPLAY NAME', 'DESCRIPTION', 'DEPARTMENT', 'TYPE', 'FULL_SYSTEM_PROMPT', ARRAY['tool1','tool2'], READ_ONLY_BOOL, 'MODEL', 'SOURCE', 1, now())
ON CONFLICT (name)
DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  department = EXCLUDED.department,
  agent_type = EXCLUDED.agent_type,
  system_prompt = EXCLUDED.system_prompt,
  tools = EXCLUDED.tools,
  read_only = EXCLUDED.read_only,
  model = EXCLUDED.model,
  source = EXCLUDED.source,
  version = agent_definitions.version + 1,
  updated_at = now();
```

5. After syncing all agents, report:
   - How many agents synced
   - Any new agents (first time sync)
   - Any updated agents (version bumped)
   - Current state of agent_definitions table

**Important**: When constructing SQL, escape single quotes in the system_prompt by doubling them (`''`).
