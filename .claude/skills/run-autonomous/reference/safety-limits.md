# Autonomous Agent Safety Limits

Single source of truth for all autonomous run parameters.

## Runtime Limits

| Setting | Value | Rationale |
|---------|-------|-----------|
| Max turns | 200 | Peterson-approved default. Covers chained workflows (worker + QC + expert review). |
| Timeout | 30 minutes | Hard cap — if still running after 30 min, something is wrong. |
| Max retries | 2 | If the agent fails twice, stop and log. Don't retry indefinitely. |

## Model Selection

| Agent Type | Model | Why |
|------------|-------|-----|
| Workers (write operations) | sonnet | Balance of capability and cost |
| Read-only analysis | haiku | Fast and cheap for simple queries |
| Background/autonomous | sonnet or haiku | Never use Opus for autonomous work — cost is too high |

## Permission Model

Use granular allow rules configured in settings. **NEVER** use `--dangerously-skip-permissions`.

## Logging Format

### Pre-Run
```
[timestamp] AUTONOMOUS RUN START: agent=[name], task=[description], max_turns=200, timeout=30m
```
Write to `/tmp/claude-autonomous-$(date +%Y%m%d).log`

### Post-Run
```
[timestamp] AUTONOMOUS RUN END: agent=[name], status=[success/failure/partial], turns_used=[N]
```

## Error Handling

1. Log the error with full details
2. Check if recoverable (e.g., API timeout — retry once)
3. If not recoverable after 2 attempts, log and stop
4. NEVER enter a retry loop that could run indefinitely
5. If unexpected results, create KILLSWITCH.md and halt all agents
