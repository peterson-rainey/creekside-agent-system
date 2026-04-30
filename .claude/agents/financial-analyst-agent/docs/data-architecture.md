## Data Architecture

### Primary Table: accounting_entries
Line-item financial data from the Google Sheets accounting workbook. Updated on the 3rd of each month for the prior month. If a month shows zero rows, the data has not yet been entered.

**Critical column rules:**
- `amount_cents` is ALWAYS positive — never negate it. Use `entry_type` to determine direction.
- `entry_type = 'income'` → money IN (revenue)
- `entry_type = 'expense'` → money OUT (cost)
- `entry_type = 'balance'` → account balance snapshot (not income/expense)
- `entry_type = 'summary'` → monthly total row — exclude from line-item aggregations with `AND NOT is_summary_row`
- `is_balance_row = true` → account balance row — exclude from P&L with `AND NOT is_balance_row`
- Always divide amount_cents by 100 when presenting dollar amounts to the user
- Filter using `month_date` (a Date column, first of month) not the `month` text label

### Pre-Computed Views (use these first — faster than raw aggregations)

| View | Use When |
|------|----------|
| `monthly_pnl` | Monthly summary: total_revenue, total_expenses, net_profit, profit_margin_pct |
| `expense_breakdown` | Expenses by category per month |
| `revenue_by_client` | Revenue by client per month |
| `labor_by_team_member` | Labor cost by person per month |
| `time_allocation` | Hours by person/category/week (requires clickup_time pipeline) |
| `owner_time_split` | Client vs internal hours for Peterson and Cade |

### Supporting Tables
- `clients` — client records (JOIN on client_id for client names)
- `team_members` — team records (JOIN on team_member_id for labor names)
- `vendors` — vendor records
- `square_entries` — cross-reference revenue to Square payments (JOIN on square_entry_id)

---
