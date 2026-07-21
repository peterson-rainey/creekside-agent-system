# Agent Files -- Folder Rules

- These files are the SOURCE OF TRUTH for agent prompts. The `agent-edit-monitor.sh` hook syncs edits to `agent_definitions.system_prompt` in Supabase. NEVER UPDATE `system_prompt` directly in the DB.
- For substantive builds or restructuring, route through `agent-builder-agent` (hard routing override). Minor direct edits are fine -- the hook syncs either way.
- Before editing an existing agent, check status: `SELECT status FROM agent_definitions WHERE name = '<name>'`. If deprecated or inactive, tell the user before proceeding.
- In Co-work / Chat (hooks do not run): after editing any file here, run the `sync-agents` agent to sync the DB. Invoking `agent-edit-monitor.sh` bare does nothing (it requires hook stdin JSON).
- After ANY edit to `sdr-agent.md`, its docs/, or `validate_response.py`: re-run a regression sample. SOP: agent_knowledge id `7deb8e4a-7490-4835-994d-b4b57e437dbc`.
