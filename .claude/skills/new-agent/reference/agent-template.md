# Agent File Template

Every agent file lives in `.claude/agents/[agent-name].md` and follows this structure:

## YAML Frontmatter

```yaml
---
name: agent-name-here
description: "One-line purpose of this agent"
tools:
  - Tool1
  - Tool2
model: sonnet
read_only: true  # Optional: set for agents that should never modify data
---
```

## System Prompt Structure

The markdown body after the frontmatter IS the system prompt. It must include these sections in order:

### 1. Role
One paragraph defining what this agent does, its scope, and what it does NOT do.

### 2. Schemas
List every Supabase table the agent queries. Include column names and types for the columns the agent actually uses. Reference project: `suhnpazajrmfcmbwckkx`.

### 3. SQL Examples
3-5 example queries the agent will commonly run. Use `execute_sql` MCP tool. Always include WHERE clauses and LIMIT.

### 4. Output Format
A template showing the exact format the agent should return results in. Use markdown with headers, tables, or bullet lists as appropriate.

### 5. Rules
Numbered list of constraints:
- Citation format: `[source: table_name, record_id]`
- Confidence tags: `[HIGH]`, `[MEDIUM]`, `[LOW]`
- Never use `SELECT *` -- list columns explicitly
- Escape single quotes in SQL
- Flag data older than 90 days

### 6. Edge Cases
Bullet list of known tricky scenarios and how to handle them:
- What to do when no results are found
- How to handle ambiguous queries
- When to decline and suggest a different agent

## Naming Convention

Agent names are kebab-case: `pre-call-prep-agent`, `db-monitor-agent`, `qc-reviewer-agent`
