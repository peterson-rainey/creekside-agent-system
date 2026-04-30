# Creekside Billing Model & Square API

## Creekside Billing Model

### Pricing Structure
**Pricing is maintained in Google Drive and must not be hardcoded.** Always pull current pricing from the Creekside Pricing folder: https://drive.google.com/drive/folders/1M3csGxV6OLZFeXJUHv_jXLSkn-N9oOiJ. If the pricing information doesn't come from this folder, disregard it entirely.

The folder contains:
- **Pricing_Plans (1).pdf** -- the 3-plan pricing structure (Plan A Growth, Plan B Shared, Plan C Retainer)
- **Pricing_Proposal_Creekside_v2.docx** -- the full proposal template

Invoice amounts vary month-to-month based on client ad spend. Revenue grows as clients increase ad budgets. Invoices are NOT predictable fixed amounts — always verify against actual Square data.

### Square API Access (MCP Tools)
- `mcp__claude_ai_Square__make_api_request` — execute Square API calls
- `mcp__claude_ai_Square__get_service_info` — get available Square API services
- `mcp__claude_ai_Square__get_type_info` — get Square type definitions

### Common Square API Endpoints
- List invoices: `GET /v2/invoices` with `location_id=L8AJXPFZFC6TE`
- Create invoice: `POST /v2/invoices`
- Get invoice: `GET /v2/invoices/{invoice_id}`
- Publish invoice: `POST /v2/invoices/{invoice_id}/publish`
- Cancel invoice: `POST /v2/invoices/{invoice_id}/cancel`
- List payments: `GET /v2/payments`
- List customers: `GET /v2/customers`

### Important Constraints
- Always use location_id L8AJXPFZFC6TE for Creekside operations
- 92 of 1,020 Square customers are transaction-relevant
- When creating invoices, always verify customer exists in Square first
- Invoice creation requires: customer_id, location_id, payment_requests (with due_date), line_items
- After creating an invoice, it must be PUBLISHED to send to the customer

---

# Payment Reconciliation Methodology

## Reconciling Square Payments with Accounting Entries

### Current State
- `accounting_entries.square_entry_id` column EXISTS but is NOT populated (0 linked records)
- Reconciliation must be done by matching amount + date + customer name between tables

### Reconciliation Query Pattern
```sql
SELECT se.id as square_id, se.customer_name, se.amount_cents/100.0 as square_amount,
       se.metadata->>'invoice_status' as status,
       ae.id as accounting_id, ae.name as accounting_name, ae.amount_cents/100.0 as accounting_amount,
       ae.month_date
FROM square_entries se
LEFT JOIN accounting_entries ae 
  ON ae.entry_type = 'income'
  AND ae.amount_cents = se.amount_cents
  AND ae.month_date = DATE_TRUNC('month', se.created_at)::date
  AND LOWER(ae.name) ILIKE '%' || LOWER(SPLIT_PART(se.customer_name, ' ', 2)) || '%'
WHERE se.data_type = 'invoice'
  AND se.metadata->>'invoice_status' = 'PAID';
```

### Reconciliation Rules
1. Match on amount_cents first (most reliable)
2. Then narrow by month (accounting_entries.month_date vs square_entries.created_at month)
3. Then fuzzy-match customer name to accounting name
4. Unmatched records are flagged for manual review
5. Never auto-update square_entry_id without presenting matches to user first

### Integration with Financial Views
- `monthly_pnl`, `expense_breakdown`, `revenue_by_client`, `labor_by_team_member` are downstream of accounting_entries
- Billing agent feeds reconciled data upward — does NOT modify these views directly
- For revenue attribution, cross-reference `revenue_by_client` view with square_entries invoice data

---

# Square Invoice Schema & Status Patterns

## Square Invoice Data in square_entries

### Invoice Status Detection
- Invoice status is stored in `metadata->>'invoice_status'` — NOT in `payment_status` column (which is NULL for invoices)
- Valid statuses: PAID (416), UNPAID (8), REFUNDED (6), SCHEDULED (3), PARTIALLY_REFUNDED (2)
- Canceled invoices are excluded from square_entries (27 of 482 original were excluded)

### Key Metadata Fields for Invoices
- `metadata->>'invoice_status'` — current status
- `metadata->>'due_date'` — payment due date
- `metadata->>'invoice_number'` — Square invoice number
- `amount_cents` — invoice amount in cents (divide by 100 for dollars)
- `customer_name` — client name as stored in Square
- `customer_email` — client email from Square
- `data_type = 'invoice'` — filter for invoice records

### Overdue Invoice Detection Pattern
```sql
SELECT customer_name, amount_cents/100.0 as amount, 
       metadata->>'due_date' as due_date,
       metadata->>'invoice_number' as invoice_num
FROM square_entries
WHERE data_type = 'invoice'
  AND metadata->>'invoice_status' = 'UNPAID'
  AND (metadata->>'due_date')::date < CURRENT_DATE
ORDER BY (metadata->>'due_date')::date ASC;
```

### Square Location ID
All Creekside transactions use location: L8AJXPFZFC6TE

### Customer Name Matching
- square_entries.customer_name does NOT reliably match clients.name
- Only ~7% of square_entries have client_id populated
- Must do fuzzy matching: `WHERE LOWER(se.customer_name) ILIKE '%' || LOWER(c.name) || '%'`

---

