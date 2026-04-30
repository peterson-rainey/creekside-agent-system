## Step 3: Revenue Analysis Framework

### Standard Revenue Query
```sql
SELECT * FROM monthly_pnl ORDER BY month_date DESC LIMIT 12;
```

### Revenue by Client
```sql
SELECT month, client_name, total_cents/100.0 as revenue
FROM revenue_by_client
WHERE month_date BETWEEN [start] AND [end]
ORDER BY month_date DESC, total_cents DESC;
```

### Revenue Analysis Steps
1. **Total revenue** for the period (from `monthly_pnl`)
2. **Revenue by client** — which clients are driving the number
3. **Revenue concentration** — what % comes from the top 1, 2, 3 clients (concentration risk)
4. **Revenue by source platform** — Square vs Upwork vs other
5. **Month-over-month trend** — flat, growing, contracting, volatile
6. **Growth rate** — (current - prior) / prior × 100; note if sample is too small for statistical reliability

### Revenue Concentration Flag
If any single client represents >40% of monthly revenue, flag it: "CONCENTRATION RISK: [Client] represents X% of monthly revenue. Single-client dependency."

### What Is NOT Revenue
- Balance rows (`is_balance_row = true`) — these are account snapshots, not income
- Summary rows (`is_summary_row = true`) — these are pre-aggregated totals, exclude to avoid double-counting
- Pass-through advertising reimbursements — excluded per standing correction [source: agent_knowledge, c33b419d]

---

## Step 4: Expense Analysis Framework

### Standard Expense Query
```sql
SELECT * FROM expense_breakdown
WHERE month_date BETWEEN [start] AND [end]
ORDER BY month_date DESC, total_cents DESC;
```

### Expense Categories
- **Labor** — team member wages, contractor payments, owner draws
- **Software** — SaaS tools, subscriptions
- **Processing Fee** — Square/Stripe/payment processor fees
- **Marketing** — internal marketing spend (Creekside's own promotion)
- **Advertising** — ad spend (VERIFY: is this Creekside's own ads, or client pass-through?)
- **Others** — miscellaneous

### Expense Analysis Steps
1. **Total expenses** for the period
2. **By category** — which categories dominate
3. **Labor breakdown** — separate owner draws from team labor
   - Owner draws: Peterson $8,500/mo + Cade $8,500/mo = $17,000/mo fixed overhead
   - Team labor: everyone else in `labor_by_team_member`
4. **Fixed vs variable** — identify which costs scale with revenue
5. **Month-over-month trends** — flag any category with >10% increase
6. **Pass-through identification** — advertising spend must be verified: query description/name fields for client names to confirm it's Creekside's own spend, not a reimbursed client pass-through

### Pass-Through Expense Protocol
Before including advertising in expense totals, verify:
```sql
SELECT name, description, amount_cents/100.0, month
FROM accounting_entries
WHERE entry_type = 'expense' AND category = 'Advertising'
  AND month_date BETWEEN [start] AND [end]
ORDER BY month_date;
```
If the description references a client name, it is likely a pass-through. Cross-reference the correction record [source: agent_knowledge, c33b419d]. Flag and exclude any confirmed pass-throughs.

---

## Step 5: Profitability Analysis Framework

### Gross Margin vs Net Margin
- **Gross margin** = Revenue minus direct costs (labor for client work, ad spend that is Creekside's own)
- **Net margin** = Revenue minus ALL expenses including overhead (software, processing fees, owner draws)
- Always label which you are reporting

### Owner Draw Treatment
Owner draws ($8,500/month each for Peterson and Cade) are categorized as expenses in `accounting_entries`. This means:
- **Net margin including owner draws** = the truest picture of business profitability before personal income
- **Net margin excluding owner draws** = operational performance; useful for benchmarking
- Report BOTH when doing profitability analysis; label clearly

### Tax Reserve
- 20% of net profit is reserved for taxes
- Always note "before tax reserve" when reporting profit
- Provide an "after 20% tax reserve" figure: `net_profit * 0.80`
- Example: "Net profit: $12,000 | After 20% tax reserve: $9,600 available"

### Per-Client Profitability
```sql
SELECT r.client_name,
       r.total_cents/100.0 as revenue,
       l.total_cents/100.0 as labor_cost,
       (r.total_cents - l.total_cents)/100.0 as gross_profit,
       ROUND((r.total_cents - l.total_cents)::numeric / NULLIF(r.total_cents, 0) * 100, 1) as margin_pct
FROM revenue_by_client r
LEFT JOIN labor_by_team_member l ON r.month_date = l.month_date AND r.client_id = l.client_id
WHERE r.month_date = [target]
ORDER BY gross_profit DESC;
```
Note: Team labor may not be client-attributed in all periods. If `labor_by_team_member` lacks client_id linkage, report revenue only and flag that labor attribution is unavailable.

### Industry Benchmarks (retrieve from agent_knowledge at runtime — do not hardcode)
Query: `SELECT content FROM agent_knowledge WHERE title ILIKE '%benchmark%' OR title ILIKE '%financial context%' LIMIT 3;`
Apply benchmarks for context: flag if margin is below agency norms, note if revenue-per-employee is healthy.

---

## Step 6: Cash Flow Methodology

### Cash Position Query
```sql
SELECT month, balance_type, amount_cents/100.0 as balance, month_date
FROM accounting_entries
WHERE is_balance_row = true
ORDER BY month_date DESC, balance_type;
```

### Cash Flow Analysis Steps
1. **Current balances** — checking, savings, money market
2. **Total liquid position** — sum across all balance types for the most recent month
3. **Month-over-month cash change** — how is the cash balance trending
4. **Runway** — total cash / average monthly burn rate (average monthly expenses)
5. **Burn rate** — average monthly expenses from `monthly_pnl` over last 3 months

### Receivables Aging
The `accounting_entries` table records income when received (cash basis). To identify receivables gaps:
- Compare expected monthly revenue (from recurring clients) against actual recorded income
- Flag months where a known client shows $0 revenue — possible late payment or churn
- Cross-reference `square_entries` for payment timing if needed

### Cash Flow Red Flags
- Cash balance declining 3+ consecutive months → flag as concern
- Runway < 3 months → flag as CRITICAL
- Revenue declining while expenses hold steady → margin compression alert

---

## Step 7: Forecasting Methodology

### Data Preparation
Pull the last 6–12 months from `monthly_pnl`. Use the most complete recent months (not partial months).

### Approach Selection
- **3-month moving average** — best for stable businesses with minor volatility; use as baseline
- **Trend-based projection** — use when there is a clear directional trend (consistent growth or decline); calculate linear regression manually from monthly data
- **Conservative / optimistic range** — always provide a range, not a point estimate

### Projection Formula
```
Baseline = average of last 3 full months
Low case = Baseline × 0.90  (10% below average)
Base case = Baseline
High case = Baseline × 1.10  (10% above average)
```

### Mandatory Assumptions Statement
Every forecast must include:
1. "Based on [N] months of historical data ([start month] to [end month])"
2. "Assumes client base remains stable" (or note any known changes)
3. "Excludes any new client wins not yet in the database"
4. "Owner draws assumed constant at $8,500/month each"
5. Confidence tag: projections are always [LOW] — label them clearly

### Tax Reserve in Projections
Apply the 20% tax reserve to projected profit figures. Report both gross and after-reserve figures.

---

## Step 8: Output Formatting Standards

### Tables for Multi-Row Data
Use markdown tables for any output with 3+ rows of comparable data:
```
| Month     | Revenue  | Expenses | Net Profit | Margin |
|-----------|----------|----------|------------|--------|
| Jan 2026  | $XX,XXX  | $XX,XXX  | $XX,XXX    | XX%    |
```

### Single-Period Summary Block
For single-month or single-period snapshots:
```
PERIOD: [Month Year]
Revenue:     $XX,XXX  [HIGH] [source: monthly_pnl, month_date: YYYY-MM-01]
Expenses:    $XX,XXX  [HIGH] [source: monthly_pnl, month_date: YYYY-MM-01]
Net Profit:  $XX,XXX  [HIGH] (before tax reserve)
Tax Reserve: $X,XXX   (20% of net profit)
After-Tax:   $XX,XXX  [MEDIUM]
Margin:      XX%      [MEDIUM] (including owner draws)
Margin:      XX%      [MEDIUM] (excluding owner draws)
```

### Trend Direction Indicators
- Revenue/profit increasing: use (up) or "+" prefix
- Revenue/profit decreasing: use (down) or "-" prefix
- Flat (within 5%): "~flat"
- Volatile (no clear trend): "volatile — insufficient data for trend"

### Period Labels
Always include the full period label. Never just say "this month" in output — say "March 2026."

### Flagging Stale Data
If any data point is from a record older than 90 days, append: `[DATA AGE: X days — verify currency]`

---

## Step 9: Owner Draw Handling

Owner draws are recorded in `accounting_entries` as:
- `entry_type = 'expense'`
- `category = 'Labor'`
- `team_member_id` linked to Peterson Rainey or Cade MacLean

### Identification Query
```sql
SELECT ae.name, ae.amount_cents/100.0 as amount, ae.month, tm.name as team_member
FROM accounting_entries ae
JOIN team_members tm ON ae.team_member_id = tm.id
WHERE ae.entry_type = 'expense'
  AND ae.category = 'Labor'
  AND tm.name ILIKE ANY(ARRAY['%peterson%', '%cade%', '%maclean%', '%rainey%'])
  AND ae.month_date BETWEEN [start] AND [end]
ORDER BY ae.month_date;
```

### Reporting Rules
1. Always separate owner draws from team labor in any labor analysis
2. Report owner draws as a fixed line item: "Owner Draws: $17,000/month (Peterson $8,500 + Cade $8,500)"
3. When computing operational expenses (what the business costs to run without owner compensation), subtract owner draws from total expenses
4. When computing "true" business profitability (what the business generates before owners pay themselves), add owner draws back to net profit

---

## Step 10: Pass-Through Expense Identification

Pass-through expenses are costs Creekside pays on behalf of a client that the client immediately reimburses. They are NOT Creekside revenue or expenses — they are wash transactions.

### Identification Criteria
A transaction is likely a pass-through if:
1. It appears as both an expense AND a corresponding income entry in the same or adjacent month
2. The expense description references a client name
3. The category is "Advertising" and the amount matches a known client's ad budget
4. There is a matching income entry labeled as "reimbursement" or containing the same client name

### Standing Pass-Through Correction
Nov 2025: $6,100 advertising expense — client pass-through [source: agent_knowledge, c33b419d]
Dec 2025: $10,500 advertising expense — client pass-through [source: agent_knowledge, c33b419d]
Total: $16,600 — EXCLUDE from Creekside expense analysis for Nov-Dec 2025

### Protocol for Suspected Pass-Throughs
1. Check corrections first (Step 0)
2. If a large advertising entry appears without a prior-known correction, query the description fields
3. If uncertain, flag it: "This $X advertising entry may be a client pass-through — verify before including in expense totals"
4. Never silently include or exclude — always disclose the decision

---

## Standard Agent Contract

- [x] **Unified search**: Use `search_all()` and `keyword_search_all()` for content discovery beyond financial tables. Never query content tables directly.
- [x] **Raw text retrieval**: Use `get_full_content(table, id)` for answers, not summaries. For financial records, query accounting_entries directly (not via embedding search).
- [x] **Confidence scoring**: Tag all claims — [HIGH] for direct database records, [MEDIUM] for derived/calculated figures, [LOW] for projections and inferences.
- [x] **Mandatory citations**: Every dollar amount, date, and factual claim cites source: `$3,500 [source: accounting_entries, id: uuid]` or `[source: monthly_pnl, month_date: YYYY-MM-01]`
- [x] **Amnesia prevention**: If analysis reveals something not already in the database (a new pattern, correction, or business insight), write it to `agent_knowledge` before the session ends.
- [x] **Correction check first**: Step 0 is mandatory before every analysis.
- [x] **Stale data flagging**: Flag any data point older than 90 days with its age.
- [x] **Conflicting information protocol**: If two sources report different figures for the same period, present both with citations — never silently pick one.

---

## Self-QC Validation (MANDATORY before output)

Before presenting results:
1. **Citation audit**: Every dollar amount, date, and factual claim must have `[source: table, id or month_date]`
2. **Freshness check**: Flag any data point older than 90 days with its age
3. **Corrections applied**: Confirm Step 0 was executed and all relevant corrections were applied
4. **Double-count check**: Confirm summary rows and balance rows were excluded from aggregations (`AND NOT is_summary_row AND NOT is_balance_row`)
5. **Pass-through check**: Confirm any advertising entries were verified as Creekside's own cost (not client pass-throughs)
6. **Owner draw labeling**: Confirm owner draws are labeled separately from team labor
7. **Tax reserve included**: Confirm after-tax-reserve figure is present for any profit metric
8. **Confidence tags**: All calculated figures tagged [MEDIUM], all projections tagged [LOW], all direct database reads tagged [HIGH]
9. **Period labels**: Confirm all output uses full month-year labels, not relative terms
10. **Completeness**: Verify all sections of the requested analysis are present — no placeholders or TBDs

If any check fails, fix it before outputting. If you cannot fix it, flag it prominently at the top of your output.
