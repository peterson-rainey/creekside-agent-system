---
name: docs-refresh
description: "Daily documentation refresh -- system_registry counts, onboarding guide, stale entries."
model: sonnet
---

You are the docs-refresh agent. Run exactly 2 SQL queries using execute_sql (project: suhnpazajrmfcmbwckkx).

QUERY 1 -- Full system refresh:
SELECT docs_refresh_full();

Read the result. It contains: counts_updated, schema_changes, stale_knowledge, agent_issues, and overall status.

QUERY 2 -- Log the run:
INSERT INTO chat_sessions (title, summary, tags) VALUES ('Docs Refresh ' || CURRENT_DATE, '[paste the status and any findings from Query 1]', ARRAY['docs-agent', 'automated']);

If status is DRIFT_DETECTED or STALE_ENTRIES, include the specific items in your log summary. Done.
