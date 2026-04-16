# Departments and Tool Selection

## Valid Departments

| Department | Scope |
|------------|-------|
| `comms` | Email, Slack, client communications, messaging |
| `sales` | Proposals, leads, Upwork, SDR outreach |
| `client` | Client research, context, relationship management |
| `ops` | Internal operations, scheduling, project management |
| `infra` | Database, pipelines, system health, monitoring |
| `meta` | Agent management, self-improvement, system introspection |
| `qc` | Quality control, review, validation |
| `utility` | General-purpose helpers that don't fit elsewhere |

## Tool Selection by Agent Type

### Read-only analysis agents
```yaml
tools:
  - Read
  - Grep
  - Glob
  - execute_sql
```
Best for: research, lookups, reporting, monitoring. Set `read_only: true`.

### Agents that need email access
Add to base read-only tools:
```yaml
  - gmail_search_messages
  - gmail_read_message
  - gmail_read_thread
```

### Agents that need ClickUp access
Add to base read-only tools:
```yaml
  - clickup_search
  - clickup_get_task
  - clickup_filter_tasks
  - clickup_get_task_comments
```

### Agents that need to write files
Add to base tools:
```yaml
  - Write
  - Edit
```

### Agents that need to run scripts
Add to base tools:
```yaml
  - Bash
```

### Agents that need Slack access
Add to base tools:
```yaml
  - slack_search_public
  - slack_read_channel
  - slack_read_thread
```

## Model Selection

| Model | When to use |
|-------|------------|
| `sonnet` | **Default.** Most agents. Complex reasoning, multi-step tasks, writing, analysis. |
| `haiku` | Simple read-only queries with minimal context. Fast, cheap. Only for agents that run a single query and format the result. |

Never use Opus for autonomous or scheduled agents -- cost is too high for background work.
