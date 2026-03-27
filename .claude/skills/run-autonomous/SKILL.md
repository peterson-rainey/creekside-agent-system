---
name: run-autonomous
description: "Run a sub-agent autonomously with built-in safety limits. Wraps agent invocation with max_turns, timeout, and kill switch checks. Use this whenever running agents in the background or on a schedule."
disable-model-invocation: true
argument-hint: "[agent-name] [task description]
---

# Autonomous Agent Runner

Run a sub-agent with enforced safety limits. Arguments: `$ARGUMENTS`

## Safety Limits (MANDATORY — never skip these)

Before spawning the agent:

### 1. Kill Switch Check
```bash
if [ -f "KILLSWITCH.md" ]; then
  echo "KILL SWITCH ACTIVE — aborting autonomous run"
  exit
fi
```

### 2. Runtime Configuration
Apply these limits to EVERY autonomous agent invocation:

| Setting | Value | Why |
|---------|-------|-----|
| **Max turns** | 200 per session | Peterson-approved default. Covers chained workflows (worker + QC + expert review). |
| **Timeout** | 30 minutes per agent | Hard cap — if the agent is still running after 30 min, something is wrong. |
| **Max retries** | 2 | If the agent fails twice, stop and log the error. Don't retry indefinitely. |
| **Cost awareness** | Sonnet for workers, Haiku for read-only | Don't use Opus for autonomous background work. |
| **Launch command** | `claude --dangerously-skip-permissions --max-turns 200` | Safe with our hook stack. |

### 3. Pre-Run Logging
Before spawning, log the intent:
```
[timestamp] AUTONOMOUS RUN START: agent=[name], task=[description], max_turns=50, timeout=10m
```
Write to `/tmp/claude-autonomous-$(date +%Y%m%d).log`

### 4. Spawn the Agent
Invoke the specified agent with the task description. Include in the agent prompt:
- "You have a maximum of 50 turns to complete this task."
- "If you cannot complete the task within this limit, summarize what you accomplished and what remains."
- "Do NOT enter retry loops — if something fails twice, report the failure and stop."

### 5. Post-Run Logging
After the agent returns, log:
```
[timestamp] AUTONOMOUS RUN END: agent=[name], status=[success/failure/partial], turns_used=[N]
```

### 6. Error Handling
If the agent fails:
1. Log the error with full details
2. Check if the failure is recoverable (e.g., API timeout → retry once)
3. If not recoverable, log and notify (don't retry)
4. NEVER enter a retry loop that could run indefinitely

### 7. QC for Autonomous Runs
For autonomous runs that WRITE data:
- After the worker agent returns, spawn qc-reviewer-agent to validate
- If QC fails, LOG the failure but do NOT attempt to fix it autonomously
- Flag for human review

## Example Usage

User: `/run-autonomous db-monitor-agent Run a full database health check`

Agent flow:
1. Check kill switch → not active
2. Log: "AUTONOMOUS RUN START: agent=db-monitor-agent, task=full health check"
3. Spawn db-monitor-agent with 50-turn limit
4. db-monitor-agent runs health checks, returns report
5. Log: "AUTONOMOUS RUN END: agent=db-monitor-agent, status=success, turns_used=12"
6. Present report (db-monitor is read-only, skip QC)

## Rules
- NEVER run an autonomous agent without the kill switch check
- NEVER run an autonomous agent without the 50-turn / 10-minute limit
- NEVER use --dangerously-skip-permissions — use granular allow rules instead
- If an autonomous run produces unexpected results, create a KILLSWITCH.md and stop all agents
- Log EVERYTHING — autonomous runs have no human watching, so the logs are the only evidence
