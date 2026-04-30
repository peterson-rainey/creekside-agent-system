## Query Templates

### 12-Month Revenue Trend
```sql
SELECT month, month_date, total_revenue, net_profit, profit_margin_pct,
       LAG(total_revenue) OVER (ORDER BY month_date) as prior_month_rev,
       ROUND(((total_revenue - LAG(total_revenue) OVER (ORDER BY month_date)) /
              NULLIF(LAG(total_revenue) OVER (ORDER BY month_date), 0)) * 100, 1) as mom_growth_pct
FROM monthly_pnl
ORDER BY month_date DESC
LIMIT 12;
```

### Revenue Concentration Check
```sql
WITH client_rev AS (
  SELECT name, total_revenue,
         total_revenue / SUM(total_revenue) OVER () * 100 as pct_of_total
  FROM revenue_by_client
  WHERE month_date = 'YYYY-MM-01' AND client_id IS NOT NULL
)
SELECT name, total_revenue, ROUND(pct_of_total::numeric, 1) as pct_of_total,
       CASE WHEN pct_of_total > 25 THEN 'HIGH RISK'
            WHEN pct_of_total > 15 THEN 'MODERATE'
            ELSE 'OK' END as concentration_flag
FROM client_rev
ORDER BY pct_of_total DESC;
```

### Churn vs New Client Rolling 6 Months
```sql
WITH monthly_clients AS (
  SELECT month_date, COUNT(DISTINCT client_id) as clients_with_revenue
  FROM revenue_by_client
  WHERE client_id IS NOT NULL
  GROUP BY month_date
)
SELECT month_date, clients_with_revenue,
       clients_with_revenue - LAG(clients_with_revenue) OVER (ORDER BY month_date) as net_change
FROM monthly_clients
ORDER BY month_date DESC
LIMIT 6;
```

### Unlinked Revenue Check
```sql
SELECT month, SUM(total_revenue) as unlinked_revenue, COUNT(*) as rows
FROM revenue_by_client
WHERE client_id IS NULL
GROUP BY month
ORDER BY month_date DESC
LIMIT 6;
```

### Labor Cost Split (Owners vs Team)
```sql
-- Use owner names from agent_knowledge loaded in Step 1
SELECT
  SUM(CASE WHEN name ILIKE '%peterson%' OR name ILIKE '%rainey%'
            OR name ILIKE '%cade%' OR name ILIKE '%maclean%'
      THEN amount_cents ELSE 0 END) / 100.0 as owner_draws,
  SUM(CASE WHEN name NOT ILIKE '%peterson%' AND name NOT ILIKE '%rainey%'
            AND name NOT ILIKE '%cade%' AND name NOT ILIKE '%maclean%'
      THEN amount_cents ELSE 0 END) / 100.0 as team_labor
FROM accounting_entries
WHERE entry_type = 'expense'
AND category = 'Labor'
AND month_date = 'YYYY-MM-01';
```

---
