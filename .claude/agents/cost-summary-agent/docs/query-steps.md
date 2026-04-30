## Step 2: Yesterday's Total API Spend

Pull the total spend captured by cost-monitor for yesterday:

```sql
SELECT
  SUM(estimated_cost_cents) AS total_cents,
  SUM(input_tokens) AS total_input_tokens,
  SUM(output_tokens) AS total_output_tokens,
  COUNT(*) AS cost_records
FROM api_cost_tracking
WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day')
  AND created_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago');
```

Also pull the active budget limits:

```sql
SELECT limit_name, max_cost_cents, window_minutes, action_on_breach
FROM api_cost_limits
WHERE enabled = true
ORDER BY max_cost_cents DESC;
```

Report: total spend in dollars (cents / 100), percentage of $10/day normal budget, percentage of $25/day hard max. Tag [HIGH] — from direct database records.

---

## Step 3: Per-Agent Breakdown (Yesterday)

Pull cost records for yesterday by agent:

```sql
SELECT
  agent_name,
  model,
  COUNT(*) AS run_count,
  SUM(estimated_cost_cents) AS total_cents,
  ROUND(AVG(estimated_cost_cents), 1) AS avg_cents_per_run,
  SUM(input_tokens) AS total_input,
  SUM(output_tokens) AS total_output
FROM api_cost_tracking
WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day')
  AND created_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago')
GROUP BY agent_name, model
ORDER BY total_cents DESC;
```

Cross-reference against agent_run_history to capture agents that ran but may not yet have cost records:

```sql
SELECT
  agent_name,
  COUNT(*) AS runs,
  SUM(turns_used) AS total_turns,
  SUM(total_tokens) AS total_tokens,
  AVG(total_tokens) AS avg_tokens_per_run,
  ROUND(SUM(EXTRACT(EPOCH FROM (completed_at - started_at))/60), 1) AS total_minutes,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) AS failed_runs
FROM agent_run_history
WHERE started_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day')
  AND started_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago')
GROUP BY agent_name
ORDER BY total_tokens DESC NULLS LAST;
```

Present the top 5 most expensive agents in a markdown table: Agent | Model | Runs | Cost Yesterday | Avg Cost/Run | Total Tokens.

If an agent appears in agent_run_history but not in api_cost_tracking, note it as "run recorded, cost estimate pending" — cost-monitor may not have processed it yet.

---

## Step 4: Trend Analysis (7-Day and 30-Day Averages)

### 7-Day Daily Cost Series
```sql
SELECT
  DATE_TRUNC('day', created_at AT TIME ZONE 'America/Chicago') AS day,
  SUM(estimated_cost_cents) AS daily_cents,
  COUNT(DISTINCT agent_name) AS active_agents
FROM api_cost_tracking
WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '7 days')
  AND created_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago')
GROUP BY 1
ORDER BY 1 DESC;
```

### 30-Day Statistics
```sql
SELECT
  ROUND(AVG(daily_cents), 0) AS avg_30d_cents,
  MIN(daily_cents) AS min_daily_cents,
  MAX(daily_cents) AS max_daily_cents,
  ROUND(STDDEV(daily_cents), 0) AS stddev_cents,
  COUNT(*) AS days_with_data
FROM (
  SELECT
    DATE_TRUNC('day', created_at AT TIME ZONE 'America/Chicago') AS day,
    SUM(estimated_cost_cents) AS daily_cents
  FROM api_cost_tracking
  WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '30 days')
    AND created_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago')
  GROUP BY 1
) daily;
```

Compute and report:
- Yesterday vs 7-day average: percent change
- Yesterday vs 30-day average: percent change
- Direction indicators: "above avg", "below avg", "within normal range" (within 1 stddev = normal)

If days_with_data < 7, tag the 30-day average as [LOW] — insufficient history for reliable baseline.

Tag all derived figures [MEDIUM].

---

## Step 5: Anomaly Detection

An anomaly is any agent whose yesterday cost is >= 3x its 30-day daily average for that agent.

```sql
WITH agent_30d AS (
  SELECT
    agent_name,
    AVG(daily_cents) AS avg_daily_cents,
    COUNT(*) AS days_in_baseline
  FROM (
    SELECT
      agent_name,
      DATE_TRUNC('day', created_at AT TIME ZONE 'America/Chicago') AS day,
      SUM(estimated_cost_cents) AS daily_cents
    FROM api_cost_tracking
    WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '30 days')
      AND created_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day'
    GROUP BY agent_name, day
  ) d
  GROUP BY agent_name
),
yesterday AS (
  SELECT
    agent_name,
    SUM(estimated_cost_cents) AS yesterday_cents
  FROM api_cost_tracking
  WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day')
    AND created_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago')
  GROUP BY agent_name
)
SELECT
  y.agent_name,
  y.yesterday_cents,
  ROUND(a.avg_daily_cents, 0) AS avg_daily_cents,
  ROUND(y.yesterday_cents / NULLIF(a.avg_daily_cents, 0), 2) AS ratio,
  a.days_in_baseline
FROM yesterday y
LEFT JOIN agent_30d a ON y.agent_name = a.agent_name
WHERE y.yesterday_cents >= a.avg_daily_cents * 3
ORDER BY ratio DESC;
```

Also check for any breaches logged yesterday:

```sql
SELECT limit_name, breach_amount_cents, window_start, window_end, action_taken
FROM api_cost_breaches
WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day')
ORDER BY created_at DESC;
```

Flag format: "ANOMALY: [agent] cost $X.XX yesterday vs $Y.YY 30-day average (Zx normal)."
If no anomalies: "No anomalies detected — all agents within 3x normal range."

---

## Step 6: Failed Runs Analysis

Failed runs consume tokens without producing value. Identify and quantify the waste:

```sql
SELECT
  agent_name,
  COUNT(*) AS failed_count,
  SUM(total_tokens) AS wasted_tokens,
  ROUND(SUM(total_tokens) * 6.60 / 1000000, 4) AS estimated_wasted_dollars,
  STRING_AGG(DISTINCT SUBSTRING(COALESCE(error_message, 'no message'), 1, 80), ' | ') AS error_sample
FROM agent_run_history
WHERE started_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day')
  AND started_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago')
  AND status = 'failed'
  AND total_tokens IS NOT NULL
GROUP BY agent_name
ORDER BY wasted_tokens DESC;
```

Note: wasted_dollars uses Sonnet blended rate ($6.60/1M). If agent uses Haiku, actual waste is ~7.5% of that estimate — flag when agent model is known to be Haiku.

---

## Step 7: Claude Max Plan Utilization (CLI Sessions)

Claude Max is a fixed $200/month plan — there is no per-token API cost for CLI sessions. The goal is utilization insight only.

Pull CLI session activity from chat_sessions:

```sql
SELECT
  COUNT(*) AS sessions_yesterday,
  STRING_AGG(title, ' | ' ORDER BY session_date DESC) AS session_titles
FROM chat_sessions
WHERE session_date >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '1 day')
  AND session_date < DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago');
```

For 30-day utilization:

```sql
SELECT
  COUNT(*) AS sessions_30d,
  ROUND(COUNT(*) / 30.0, 1) AS avg_sessions_per_day,
  MIN(session_date) AS oldest_session,
  MAX(session_date) AS newest_session
FROM chat_sessions
WHERE session_date >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '30 days');
```

Also pull trigger_type breakdown from agent_run_history for context:

```sql
SELECT trigger_type, COUNT(*) AS runs, SUM(COALESCE(total_tokens, 0)) AS tokens
FROM agent_run_history
WHERE started_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '30 days')
GROUP BY trigger_type;
```

Report:
- Sessions yesterday and 30-day total
- Implied cost per session: $200 / sessions_30d (if sessions_30d > 0, else "no sessions recorded")
- Plan fit assessment: if avg_sessions_per_day >= 2 = "well-utilized", 1–2 = "moderate use", < 1 = "underutilized — evaluate if Max plan is warranted vs usage-based API access"

Tag all inferences [LOW] — CLI token data is not available, this is session-count only.

---

