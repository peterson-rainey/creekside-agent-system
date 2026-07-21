# Routines -- Folder Rules

- These repo files are the SOURCE OF TRUTH for local scheduled routines. The matching `~/.claude/scheduled-tasks/*/SKILL.md` files are thin pointers that read these files at runtime. Edit here, not there.
- To change a routine's schedule or tool approvals, use `mcp__scheduled-tasks__update_scheduled_task` (re-arms the task). `CronList` and `RemoteTrigger list` do NOT see local routines.
- Files here are NOT DB-synced by `agent-edit-monitor.sh` (it only handles agents/, skills/, contractor-skills/, scheduled-tasks/).
- Active inventory: `SELECT content FROM agent_knowledge WHERE title = 'Local Claude Code Routines -- Active Inventory';`
