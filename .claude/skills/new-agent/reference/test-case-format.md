# Test Case Format

Every new agent must have 3 test cases stored as a JSONB array. These are inserted into the `agent_definitions.test_cases` column.

## Schema

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

## Field Descriptions

| Field | Purpose |
|-------|---------|
| `name` | Unique identifier for the test case. Use snake_case. |
| `prompt` | The exact text a user would send to trigger this agent. Write it naturally. |
| `expected_behavior` | What the agent should do: which tables it queries, what format it returns, what citations it includes. |
| `validation` | Concrete check: "Output includes [source: table, id]", "Returns markdown table with columns X, Y, Z", "Declines with suggestion to use [other-agent]". |

## Pattern

- **basic_query**: The happy path. The most common request this agent will handle. Should exercise the core SQL queries and output format.
- **edge_case**: Tests boundaries. Examples: missing data, ambiguous client names, stale records (>90 days), conflicting sources.
- **out_of_scope**: Tests that the agent correctly refuses work outside its domain and redirects to the right agent.
