### Step 3: Pull Financial KPIs

```sql
-- Current and prior month P&L (monthly_pnl returns DOLLAR values, NOT cents)
SELECT month, month_date, total_revenue, total_expenses, net_profit, profit_margin_pct,
       square_revenue, upwork_revenue, labor_cost, software_cost, processing_fees,
       marketing_cost, advertising_cost
FROM monthly_pnl
WHERE month_date >= (SELECT MAX(month_date) - INTERVAL '2 months' FROM monthly_pnl)
ORDER BY month_date DESC
LIMIT 3;
```

IMPORTANT: monthly_pnl values are already in DOLLARS. Do NOT divide by 100.

```sql
-- Revenue by client for concentration analysis
SELECT name, client_id, total_revenue, source_platform
FROM revenue_by_client
WHERE month_date = 'CURRENT_YYYY-MM-01'
ORDER BY total_revenue DESC;
```

```sql
-- Owner draws for the period (to separate from team labor)
-- Replace name filters with current owner names from domain knowledge loaded in Step 1
SELECT name, amount_cents / 100.0 as amount_dollars, month
FROM accounting_entries
WHERE entry_type = 'expense'
AND category = 'Labor'
AND month_date = 'CURRENT_YYYY-MM-01'
AND (name ILIKE '%peterson%' OR name ILIKE '%rainey%'
     OR name ILIKE '%cade%' OR name ILIKE '%maclean%')
ORDER BY amount_cents DESC;
```

### Step 4: Pull Client Health KPIs

```sql
-- Active client count and new clients
SELECT
  COUNT(CASE WHEN status = 'active' THEN 1 END) as active_clients,
  COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_clients,
  COUNT(CASE WHEN start_date >= 'CURRENT_YYYY-MM-01' THEN 1 END) as new_this_month
FROM clients;
```

```sql
-- Churn detection: clients with revenue LAST month but NOT this month
SELECT rc_prior.name, rc_prior.total_revenue as prior_rev
FROM revenue_by_client rc_prior
WHERE rc_prior.month_date = 'PRIOR_YYYY-MM-01'
AND (rc_prior.client_id IS NULL OR rc_prior.client_id NOT IN (
  SELECT client_id FROM revenue_by_client
  WHERE month_date = 'CURRENT_YYYY-MM-01'
  AND client_id IS NOT NULL
))
AND rc_prior.client_id IS NOT NULL
ORDER BY rc_prior.total_revenue DESC;
```

```sql
-- Revenue stats for active clients this month
SELECT COUNT(DISTINCT client_id) as clients_with_revenue,
       SUM(total_revenue) as total_billed,
       AVG(total_revenue) as avg_per_client,
       MAX(total_revenue) as largest_client_rev
FROM revenue_by_client
WHERE month_date = 'CURRENT_YYYY-MM-01'
AND client_id IS NOT NULL;
```

### Step 5: Pull Communication Activity KPIs

```sql
-- Meetings per client this month
SELECT fe.client_id, c.name, COUNT(*) as meeting_count
FROM fathom_entries fe
JOIN clients c ON c.id = fe.client_id
WHERE fe.client_id IS NOT NULL
AND fe.meeting_date >= 'CURRENT_YYYY-MM-01'
AND fe.meeting_date < 'NEXT_YYYY-MM-01'
GROUP BY fe.client_id, c.name
ORDER BY meeting_count DESC;
```

```sql
-- Email activity per client this month
SELECT gs.client_id, c.name, COUNT(*) as email_count
FROM gmail_summaries gs
JOIN clients c ON c.id = gs.client_id
WHERE gs.client_id IS NOT NULL
AND gs.date >= 'CURRENT_YYYY-MM-01'
AND gs.date < 'NEXT_YYYY-MM-01'
GROUP BY gs.client_id, c.name
ORDER BY email_count DESC;
```

```sql
-- Days since last contact per active client (all platforms combined)
SELECT c.id, c.name, c.status,
  GREATEST(
    MAX(fe.meeting_date),
    MAX(gs.date::timestamp),
    MAX(ss.date::timestamp)
  )::date as last_contact,
  CURRENT_DATE - GREATEST(
    MAX(fe.meeting_date),
    MAX(gs.date::timestamp),
    MAX(ss.date::timestamp)
  )::date as days_since_contact
FROM clients c
LEFT JOIN fathom_entries fe ON fe.client_id = c.id
LEFT JOIN gmail_summaries gs ON gs.client_id = c.id
LEFT JOIN slack_summaries ss ON ss.client_id = c.id
WHERE c.status = 'active'
GROUP BY c.id, c.name, c.status
ORDER BY days_since_contact DESC NULLS FIRST;
```

### Step 6: Pull Raw Text for Significant Anomalies

For any churn event detected, pull the raw meeting/email records to understand the reason:

```sql
-- Batch pull for churn investigation
SELECT * FROM get_full_content_batch('fathom_entries', ARRAY['id1','id2','id3']);
```

This is mandatory for churn flags. Never report "client X churned" without checking for a documented reason in Fathom, Gmail, or Slack.

### Step 7: Synthesize and Build the Dashboard Report

Combine all findings. Tag every number. Cite every source. Apply threshold flags from domain knowledge.

---
