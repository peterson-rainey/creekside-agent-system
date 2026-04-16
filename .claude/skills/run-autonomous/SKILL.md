---
name: run-autonomous
description: "Run a sub-agent autonomously with enforced safety limits. Use when running agents in the background, on a schedule, or without human supervision."
disable-model-invocation: true
argument-hint: "[agent-name] [task description]"
---

# Autonomous Agent Runner

Run a sub-agent with enforced safety limits. Arguments: `$ARGUMENTS`

## Steps

1. **Kill switch check**: Run `scripts/check-killswitch.sh`. If exit code 1, abort immediately.

2. **Load safety limits**: Read `reference/safety-limits.md` for turn limits, timeout, model selection, and permission model. Apply all limits to the agent invocation.

3. **Pre-run log**: Log start to `/tmp/claude-autonomous-$(date +%Y%m%d).log` with agent name, task, and limits.

4. **Spawn agent**: Invoke the specified agent with the task description. Include in prompt: turn limit reminder, failure-stop instruction, no-retry-loop rule.

5. **Post-run log**: Log completion with agent name, status (success/failure/partial), and turns used.

6. **QC gate**: Read `reference/qc-rules.md`. If the agent wrote data, spawn `qc-reviewer-agent`. If QC fails, log but do NOT auto-fix — flag for human review.

7. **Error handling**: On failure, check recoverability per safety-limits.md. Max 2 retries. If unrecoverable, log and stop.