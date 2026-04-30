### Step 3: Check 1 — Scheduled Agent Run Timing Compliance

Scheduled agents must run within their scheduled window. A missed window or late run is a compliance failure.
```sql
-- Get all scheduled agents with their cron schedules and last run
SELECT name, cron_expression, enabled, last_run_at, last_status, run_count,
  EXTRACT(HOUR FROM NOW() - last_run_at) AS hours_since_last_run
FROM scheduled_agents
ORDER BY last_run_at ASC NULLS FIRST;
```

Then check actual run history for each agent in the last 7 days:
```sql
-- Run history per agent: count, success rate, timing
SELECT agent_name,
  COUNT(*) AS total_runs,
  COUNT(*) FILTER (WHERE status = 'success') AS successful,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed,
  MIN(started_at) AS first_run,
  MAX(started_at) AS last_run,
  ROUND(AVG(turns_used)) AS avg_turns
FROM agent_run_history
WHERE started_at >= NOW() - INTERVAL '7 days'
GROUP BY agent_name
ORDER BY last_run ASC;
```

Compliance thresholds (loaded from agent_knowledge at runtime — do not hard-code values):
- A daily scheduled agent with no run in >26h on a weekday = WARN
- Two or more consecutive failures for the same agent = FAIL
- An enabled agent with NULL last_run_at that has been enabled for >24h = NEEDS ATTENTION
- Weekly agents: missing run by more than the cron period + 2h grace = WARN

### Step 4: Check 2 — Runtime Output Quality Compliance

Check whether agent outputs in agent_run_history contain expected compliance markers. This checks actual behavior, not just what the prompt says.

```sql
-- Sample recent result_summaries and check for citation and confidence patterns
SELECT agent_name, started_at, status,
  result_summary ILIKE '%[source:%' AS has_source_citation,
  (result_summary ILIKE '%[HIGH]%' OR result_summary ILIKE '%[MEDIUM]%' OR result_summary ILIKE '%[LOW]%') AS has_confidence_tags,
  length(result_summary) AS output_length,
  left(result_summary, 300) AS summary_preview
FROM agent_run_history
WHERE status = 'success'
AND result_summary IS NOT NULL
AND started_at >= NOW() - INTERVAL '30 days'
ORDER BY started_at DESC;
```

Interpretation:
- Client-facing agents (pre-call-prep, client-context, financial-analyst, gmail-draft, expert-review): REQUIRE citations
- Infrastructure/monitoring agents (db-monitor, connectivity-auditor, error-monitor, action-item-closer, context-linker, entity-detector, docs-refresh, data-quality-audit, security-audit, agent-quality-audit, fathom-action-extractor): EXEMPT from citation requirement
- Communication agents (gmail-triage, gmail-organizer): compliance measured by SOP-specific behavior, not generic citations

Gmail Triage Specific Compliance check:
```sql
-- Check recent gmail-triage runs for GPS label compliance
SELECT agent_name, started_at, status,
  (result_summary ILIKE '%Done%' OR result_summary ILIKE '%For Peterson%' OR result_summary ILIKE '%VA Handling%') AS mentions_gps_labels,
  result_summary ILIKE '%category:primary%' AS uses_correct_filter,
  left(result_summary, 400) AS summary_preview
FROM agent_run_history
WHERE agent_name ILIKE '%gmail%triage%'
AND started_at >= NOW() - INTERVAL '14 days'
ORDER BY started_at DESC;
```

Per the Email Inbox Management SOP (stored in agent_knowledge): triage must use the `category:primary` filter and apply GPS label double-tags. If a run shows no label application in its result_summary, that is a compliance gap.

### Step 5: Check 3 — Action Item Closure Rate and Overdue Tracking

```sql
-- Action item age distribution by status
SELECT status,
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE created_at < NOW() - INTERVAL '7 days') AS older_than_7d,
  COUNT(*) FILTER (WHERE created_at < NOW() - INTERVAL '30 days') AS older_than_30d,
  COUNT(*) FILTER (WHERE created_at < NOW() - INTERVAL '90 days') AS older_than_90d
FROM action_items
GROUP BY status;
```

```sql
-- Infrastructure and agent-related items that should be auto-closed
SELECT id, title, status, priority, category, created_at,
  EXTRACT(DAY FROM NOW() - created_at) AS age_days
FROM action_items
WHERE status IN ('open', 'in_progress')
AND (category IN ('agent_improvement', 'new_agent', 'infrastructure', 'internal')
     OR title ILIKE '%agent%' OR title ILIKE '%scheduled%' OR title ILIKE '%pipeline%')
ORDER BY priority ASC, created_at ASC
LIMIT 20;
```

```sql
-- Verify action-item-closer ran recently
SELECT started_at, status, left(result_summary, 300)
FROM agent_run_history
WHERE agent_name = 'action-item-closer'
ORDER BY started_at DESC LIMIT 3;
```

Compliance check: If action-item-closer has NOT run in 48h = FAIL. If it ran but items still accumulate >30d in open status = WARN (closer may be under-matching).

### Step 6: Check 4 — agent_knowledge Staleness Audit

```sql
-- All agent_knowledge entries older than 90 days
SELECT id, title, type, tags, created_at, updated_at,
  EXTRACT(DAY FROM NOW() - updated_at) AS days_since_update
FROM agent_knowledge
WHERE updated_at < NOW() - INTERVAL '90 days'
ORDER BY updated_at ASC;
```

```sql
-- Aggregate staleness by type
SELECT type,
  COUNT(*) FILTER (WHERE updated_at >= NOW() - INTERVAL '30 days') AS fresh,
  COUNT(*) FILTER (WHERE updated_at BETWEEN NOW() - INTERVAL '90 days' AND NOW() - INTERVAL '30 days') AS aging,
  COUNT(*) FILTER (WHERE updated_at < NOW() - INTERVAL '90 days') AS stale,
  COUNT(*) FILTER (WHERE updated_at < NOW() - INTERVAL '180 days') AS very_stale
FROM agent_knowledge
GROUP BY type
ORDER BY stale DESC;
```

Flag: SOP or configuration entries >90 days = WARN. Any entry >180 days = FAIL.

### Step 7: Check 5 — SOP Coverage Gap Analysis

```sql
-- Which SOPs have a tag matching an active scheduled agent?
SELECT ak.title AS sop_title, ak.tags, ak.updated_at,
  sa.name AS enforcing_scheduled_agent, sa.enabled
FROM agent_knowledge ak
LEFT JOIN scheduled_agents sa ON (
  ak.tags @> ARRAY[sa.name]
  OR ak.title ILIKE '%' || sa.name || '%'
)
WHERE ak.type = 'sop'
ORDER BY sa.name NULLS LAST, ak.title;
```

For each SOP with no matching scheduled agent: determine whether it is enforced by an interactive agent (acceptable) or has no enforcement at all (gap). Report coverage gaps as WARN.

### Step 8: Check 6 — Inter-Agent QC Workflow Compliance

```sql
-- Look at recent sessions that list agents involved
SELECT title, agents_involved, items_completed, created_at
FROM chat_sessions
WHERE created_at >= NOW() - INTERVAL '30 days'
AND agents_involved IS NOT NULL
ORDER BY created_at DESC
LIMIT 20;
```

```sql
-- Check if QC agent runs correlate with write-capable agent activity
SELECT agent_name, COUNT(*) AS runs, MAX(started_at) AS last_run
FROM agent_run_history
WHERE started_at >= NOW() - INTERVAL '30 days'
GROUP BY agent_name
ORDER BY runs DESC;
```

If write-capable agents (gmail-organizer, correction-capture, context-linker, docs-agent) show frequent runs but qc-reviewer-agent shows zero runs in the same period = WARN.

### Step 9: Check 7 — Corrections Compliance

```sql
-- Recent corrections
SELECT id, title, content, created_at,
  EXTRACT(DAY FROM NOW() - created_at) AS days_old
FROM agent_knowledge
WHERE type = 'correction'
AND created_at >= NOW() - INTERVAL '90 days'
ORDER BY created_at DESC;
```

For each correction that targets a specific agent behavior, verify the agent's subsequent runs show the corrected behavior by searching result_summary for the corrected pattern. Cite both the correction record and the run record.

