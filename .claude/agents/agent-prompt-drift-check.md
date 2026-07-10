---
name: agent-prompt-drift-check
description: "Nightly check that detects broken agent prompts. Catches ai_dispatcher agents with missing executed prompts and active agents with short prompts matching no intentional-stub convention. Writes alerts to pipeline_alerts."
model: none
execution_mode: pg_cron
cron: "0 4 * * *"
---

# Agent Prompt Drift Detection

Pure SQL function `check_agent_prompt_drift()` that runs nightly at 4am CT via pg_cron.

## What it checks (redesigned 2026-07-06)

1. **Missing dispatcher prompt** (`drift_detected`, critical): Any enabled `ai_dispatcher` agent in `scheduled_agents` whose `system_prompt` (the prompt the dispatcher actually executes) is NULL or < 100 chars.
1b. **Pointer prompt in dispatcher** (`drift_detected`, critical, added 2026-07-09): Any enabled `ai_dispatcher` agent whose executed prompt is 100-299 chars AND references `agent_definitions`, `.claude/agents/`, "see file", "prompt lives in", or `SELECT system_prompt`. The dispatcher sends `scheduled_agents.system_prompt` verbatim -- it never resolves pointers, so a pointer-only prompt is circular and the run executes with no real instructions. Caught in the wild: ai-analyst-agent's 113-char circular prompt evaded the < 100 rule. The < 300 length gate keeps long legit prompts that merely mention agent_definitions (e.g. fusion-weekly-report at 1074 chars) from firing.
2. **Unconventional short prompt** (`short_prompt`, medium): Any active agent in `agent_definitions` with system_prompt < 100 chars that matches NO intentional-stub convention (file pointer "See .claude/agents/", DB pointer "Agent prompt lives in the database", "python script", "no AI prompt", "DEPRECATED", "status: needs-rebuild", "deterministic pipeline").

## What it deliberately does NOT check anymore

- **Intentional stubs in agent_definitions**: Stub system_prompt entries are intentional for file-based agents and deterministic scripts (registry/discovery only, not execution). The old check alerted daily on klaviyo-campaign-agent and ai-analyst-agent.
- **Age-based stale_sync**: The old Check 3 flagged any dispatcher not edited in 14+ days. Age is not breakage; it fired daily for fusion-weekly-report-agent, ai-analyst-agent, sop-refinement-agent, and client-field-sync. Removed per Peterson 2026-07-06.

## Alerts

Writes to `pipeline_alerts` with:
- pipeline_name: `agent-prompt-drift`
- alert_type: `drift_detected` or `short_prompt`
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
