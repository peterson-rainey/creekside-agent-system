## Query Templates

```sql
-- Template: All scheduled agents and timing
SELECT name, cron_expression, enabled, last_run_at, last_status, run_count,
  EXTRACT(HOUR FROM NOW() - last_run_at) AS hours_since_last_run
FROM scheduled_agents
ORDER BY last_run_at ASC NULLS FIRST;

-- Template: Runs for a specific agent in last N days
SELECT started_at, status, turns_used, total_tokens,
  left(result_summary, 500) AS summary_preview,
  left(error_message, 200) AS error_preview
FROM agent_run_history
WHERE agent_name = 'AGENT_NAME'
AND started_at >= NOW() - INTERVAL 'N days'
ORDER BY started_at DESC;

-- Template: Action item age buckets
SELECT category,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS last_7d,
  COUNT(*) FILTER (WHERE created_at BETWEEN NOW() - INTERVAL '30 days' AND NOW() - INTERVAL '7 days') AS d7_to_d30,
  COUNT(*) FILTER (WHERE created_at < NOW() - INTERVAL '30 days') AS older_than_30d
FROM action_items
WHERE status = 'open'
GROUP BY category;

-- Template: agent_knowledge staleness by type
SELECT type,
  COUNT(*) FILTER (WHERE updated_at >= NOW() - INTERVAL '30 days') AS fresh,
  COUNT(*) FILTER (WHERE updated_at BETWEEN NOW() - INTERVAL '90 days' AND NOW() - INTERVAL '30 days') AS aging,
  COUNT(*) FILTER (WHERE updated_at < NOW() - INTERVAL '90 days') AS stale
FROM agent_knowledge
GROUP BY type
ORDER BY stale DESC;

-- Template: Citations in recent runs
SELECT agent_name, started_at,
  result_summary ILIKE '%[source:%' AS has_citation,
  (result_summary ILIKE '%[HIGH]%' OR result_summary ILIKE '%[MEDIUM]%') AS has_confidence
FROM agent_run_history
WHERE started_at >= NOW() - INTERVAL '30 days'
AND status = 'success'
ORDER BY agent_name, started_at DESC;
```

## Interpretation Rules

**Run timing:**
- Compare `last_run_at` against cron_expression to assess expected frequency
- Daily weekday agents (cron patterns with 1-5 day-of-week): expect run every 24h on weekdays
- Weekly agents (cron with specific day): expect run within cron period + 2h grace
- Agents with run_count = 0 that are newly enabled: flag as "pending first run" not FAIL

**Output quality:**
- Infrastructure agents are exempt from citations — they produce reports, not client-facing answers
- Client agents must show citation patterns in result_summary to pass
- Short result_summaries (<100 chars) may not have enough content to assess — score as N/A

**Action item velocity:**
- Items with category=client_work accumulating >30d may be legitimately waiting on client action — do not auto-fail
- Items with category=internal/infrastructure accumulating >30d = likely closer is not matching — WARN
- Priority=1 items >7d old = WARN regardless of category

**Stale knowledge severity:**
- SOPs 90-180 days: WARN
- SOPs >180 days: FAIL
- Configuration/domain_knowledge 90-180 days: LOW concern
- Corrections >180 days: verify if superseded

**SOP coverage gaps:**
- Interactive-only enforcement (no scheduled agent): acceptable if the SOP is applied on demand
- No enforcement at all (no agent, no scheduled process): WARN
