---
name: new-agent
description: "Scaffold a new agent definition from a template. Creates the .md file, generates test cases, and syncs to Supabase. Use when building a new sub-agent."
disable-model-invocation: true
argument-hint: "[agent-name] [department] [one-line purpose]"
---

# New Agent Scaffolder

Create a new agent definition following the patterns established by existing agents. Arguments: `$ARGUMENTS`

## Steps

1. **Parse arguments**: Extract agent name, department, and purpose from `$ARGUMENTS`
   - Agent name should be kebab-case (e.g., `pre-call-prep-agent`)
   - Department must be one of: comms, sales, client, ops, infra, meta, qc, utility
   - Purpose is a one-line description

2. **Analyze existing agents**: Read 2-3 existing agents from `.claude/agents/` to understand the patterns:
   - YAML frontmatter format
   - System prompt structure (sections, SQL examples, output format, rules)
   - Tool selection patterns (read-only agents get limited tools, write agents get more)

3. **Determine agent configuration**:
   - **Tools**: Based on what the agent needs to do:
     - Read-only analysis → `Read, Grep, Glob, execute_sql`
     - Needs Gmail → add Gmail MCP tools
     - Needs ClickUp → add ClickUp MCP tools
     - Needs to write files → add `Write, Edit`
     - Needs to run scripts → add `Bash`
   - **Model**: `sonnet` for most agents, `haiku` for simple read-only queries with minimal context
   - **Read-only**: true if the agent should never modify data

4. **Generate the agent file**: Create `.claude/agents/[agent-name].md` with:
   - YAML frontmatter (name, description, tools, model)
   - Detailed system prompt including:
     - Role description
     - Supabase project reference
     - Relevant table schemas and column names
     - Example SQL queries for the agent's domain
     - Output format template
     - Rules and constraints
     - Edge case handling

5. **Generate test cases**: Create 3 test cases as a JSONB array:
   ```json
   [
     {
       "name": "basic_query",
       "prompt": "A typical user request this agent should handle",
       "expected_behavior": "What the agent should do and return",
       "validation": "How to verify the output is correct"
     },
     {
       "name": "edge_case",
       "prompt": "A tricky request that tests the agent's limits",
       "expected_behavior": "How it should handle the edge case",
       "validation": "How to verify correct handling"
     },
     {
       "name": "out_of_scope",
       "prompt": "A request this agent should NOT handle",
       "expected_behavior": "Agent should decline and suggest the correct agent",
       "validation": "Verify it doesn't attempt the task"
     }
   ]
   ```

6. **Sync to Supabase**: Run the `/sync-agents` skill to push the new agent to the `agent_definitions` table

7. **Report**: Tell the user:
   - Agent file created at `.claude/agents/[name].md`
   - Test cases generated
   - Synced to Supabase
   - Remind them to update CLAUDE.md's agent table (requires user approval due to protected file hook)
   - Suggest testing the agent with the first test case

**Important**: The new agent file will be in `.claude/agents/` which is a protected directory. The user must approve the file creation via the hook system.
