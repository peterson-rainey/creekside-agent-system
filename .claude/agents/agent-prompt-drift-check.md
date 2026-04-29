---
name: agent-prompt-drift-check
description: "Nightly check that detects drift between agent file content and DB system_prompt. Catches stub reversions, suspiciously short prompts, and stale syncs on the 3 Railway ai_dispatcher agents. Writes alerts to pipeline_alerts."
model: none
execution_mode: pg_cron
cron: "0 4 * * *"
---

# Agent Prompt Drift Detection

Pure SQL function `check_agent_prompt_drift()` that runs nightly at 4am CT via pg_cron.

## What it checks

1. **Stub content**: Any active agent whose system_prompt contains old stub patterns ("SELECT system_prompt FROM", "Agent prompt lives in the database", "See .claude/agents/", etc.)
2. **Suspiciously short prompts**: Any active agent with system_prompt < 100 chars (excludes known Python scripts and deprecated agents)
3. **Stale ai_dispatcher syncs**: The 3 Railway ai_dispatcher agents (client-field-sync, sop-refinement-agent, session-summarizer-agent) not updated in > 14 days

## Severity levels

- **critical**: Stub or short prompt on an ai_dispatcher agent (Railway runs stale prompt)
- **high**: Stub content on any active agent, or stale ai_dispatcher sync
- **medium**: Short prompt on a non-dispatcher agent

## Alerts

Writes to `pipeline_alerts` with:
- pipeline_name: `agent-prompt-drift`
- alert_type: `drift_detected`, `short_prompt`, or `stale_sync`
- source: `check_agent_prompt_drift`
- details: JSON with agent name, prompt length, check type

## How to investigate

```sql
-- See current drift alerts
SELECT * FROM pipeline_alerts WHERE pipeline_name = 'agent-prompt-drift' AND acknowledged = false;

-- Run the check manually
SELECT * FROM check_agent_prompt_drift();

-- Compare file vs DB for a specific agent
SELECT name, LENGTH(system_prompt), LEFT(system_prompt, 200) FROM agent_definitions WHERE name = 'agent-name';
```

## How to fix drift

Edit the agent's `.claude/agents/{name}.md` file. The `agent-edit-monitor.sh` hook will auto-sync the change to the DB. If the hook failed, manually run:
```sql
UPDATE agent_definitions SET system_prompt = 'file content here', updated_at = NOW() WHERE name = 'agent-name';
```
