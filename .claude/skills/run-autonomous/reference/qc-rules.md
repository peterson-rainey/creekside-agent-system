# QC Rules for Autonomous Runs

## When to QC

Run `qc-reviewer-agent` after any autonomous agent that **writes data**:
- Database inserts/updates
- File creation/modification
- Email drafts or sends
- Task creation in ClickUp

## When to Skip QC

Skip QC for **read-only** autonomous runs:
- Database health checks (db-monitor-agent)
- Pipeline status reports
- KPI dashboards
- Data quality scans

## QC Failure Handling

When QC fails on an autonomous run:
1. **LOG** the failure with full details
2. **DO NOT** attempt to fix it autonomously
3. **Flag** for human review
4. Record in agent_knowledge with type='issue' for tracking
