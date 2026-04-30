## Step 8: Cost Optimization Recommendations

Based on Steps 2–7, generate specific, evidence-backed recommendations. Run these rule-based checks:

### Model Tier Check
```sql
SELECT
  agent_name,
  model,
  SUM(estimated_cost_cents) AS total_cost_cents_30d,
  COUNT(*) AS runs_30d,
  ROUND(AVG(estimated_cost_cents), 1) AS avg_cents_per_run
FROM api_cost_tracking
WHERE created_at >= (DATE_TRUNC('day', NOW() AT TIME ZONE 'America/Chicago') - INTERVAL '30 days')
GROUP BY agent_name, model
ORDER BY total_cost_cents_30d DESC;
```

Also pull the recommended model assignment record:

```sql
SELECT content FROM agent_knowledge
WHERE title = 'Railway Scheduled Agents - Daily Cost Breakdown (2026-03-25)';
```

Compare actual model in api_cost_tracking against the recommended assignment in agent_knowledge. Flag any mismatch. Agents classified as "simple" (monitoring, counting, status checks) should be Haiku. Agents using Sonnet for simple work are downgrade candidates.

Haiku savings estimate formula: `sonnet_monthly_cost * 0.925` (Haiku is ~7.5% of Sonnet cost at blended rates, saving ~92.5%).

### Token Growth Check
```sql
WITH recent AS (
  SELECT agent_name, AVG(total_tokens) AS avg_recent
  FROM agent_run_history
  WHERE started_at >= NOW() - INTERVAL '7 days'
  GROUP BY agent_name
),
baseline AS (
  SELECT agent_name, AVG(total_tokens) AS avg_baseline
  FROM agent_run_history
  WHERE started_at BETWEEN NOW() - INTERVAL '30 days' AND NOW() - INTERVAL '7 days'
  GROUP BY agent_name
)
SELECT
  r.agent_name,
  ROUND(r.avg_recent) AS avg_tokens_recent,
  ROUND(b.avg_baseline) AS avg_tokens_baseline,
  ROUND((r.avg_recent - b.avg_baseline) / NULLIF(b.avg_baseline, 0) * 100, 1) AS pct_change
FROM recent r
JOIN baseline b ON r.agent_name = b.agent_name
WHERE r.avg_recent > b.avg_baseline * 1.2
ORDER BY pct_change DESC;
```

Agents with >20% token growth in the past 7 days vs prior 23 days are candidates for prompt compression review.

### Frequency Check
The cost-monitor runs 96x/day at ~$0.40/day — 22% of total fleet cost. If it remains the single most expensive agent, recommend evaluating reduction to 30-minute intervals ($0.20/day estimated savings).

### Produce Numbered Recommendations

Each recommendation format:
```
N. [RECOMMENDATION TITLE]
   Evidence: [specific data point with citation]
   Action: [exact what to change]
   Estimated savings: $X.XX/day | $X.XX/month
   Risk: Low | Medium
```

---
