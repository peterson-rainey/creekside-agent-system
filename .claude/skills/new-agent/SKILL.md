---
name: new-agent
description: "Scaffold a new agent definition with tests and Supabase sync. Use when building a new sub-agent, creating an agent from scratch, or adding a new capability to the system."
disable-model-invocation: true
argument-hint: "[agent-name] [department] [one-line purpose]"
---

# New Agent Scaffolder

Create a new agent definition. Arguments: `$ARGUMENTS`

## Steps

1. **Parse arguments**: Extract agent name (kebab-case), department, and purpose from `$ARGUMENTS`.

2. **Validate**: Read `reference/department-tools.md` for valid departments and tool mappings. Verify the department is valid. Check `.claude/agents/` for existing agents with the same name.

3. **Analyze patterns**: Read 2-3 existing agents from `.claude/agents/` to understand current conventions.

4. **Generate agent file**: Read `reference/agent-template.md` for the required structure. Create `.claude/agents/[agent-name].md` with YAML frontmatter and a detailed system prompt following the template.

5. **Generate test cases**: Read `reference/test-case-format.md` for the schema. Create 3 test cases (basic_query, edge_case, out_of_scope) as a JSONB array.

6. **Sync to Supabase**: Run `/sync-agents` to push the new agent to `agent_definitions`.

7. **Report**: Agent file path, test cases, sync status. Remind user to test with the first test case.