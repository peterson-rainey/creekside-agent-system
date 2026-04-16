---
name: sync-agents
description: "Sync local agent definitions from .claude/agents/ to the Supabase agent_definitions table. Use after adding, modifying, or deleting any agent definition file."
disable-model-invocation: true
---

# Sync Agent Definitions to Supabase

Sync all `.md` files in `.claude/agents/` to the `agent_definitions` table (project: `suhnpazajrmfcmbwckkx`).

## Steps

1. **Discover agents**: Glob all `.md` files in `.claude/agents/`.

2. **Parse each file**: For each file, run `scripts/parse-frontmatter.sh` to extract YAML fields (name, description, tools, model). The markdown body after the second `---` becomes `system_prompt`.

3. **Determine metadata**: From file content, derive: `department` (look for tags like [comms], [client], etc., default "utility"), `agent_type` ("qc" if reviewer, "research" if read-only, "worker" otherwise), `read_only` (true if no Write/Edit/Bash tools), `source` ("custom" unless VoltAgent patterns detected).

4. **Upsert**: Read `reference/upsert-template.sql` for the SQL pattern. For each agent, execute the upsert via `execute_sql`. Escape single quotes in system_prompt by doubling them.

5. **Report**: Count of agents synced, new vs updated, any errors.