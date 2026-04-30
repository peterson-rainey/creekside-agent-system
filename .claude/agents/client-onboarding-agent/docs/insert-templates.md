### Phase 4: Insert into `clients` Table

This is the foundational record. All 26+ FK tables link to this ID.

```sql
INSERT INTO clients (
  name,
  display_names,
  email_domains,
  email_addresses,
  primary_contact_name,
  primary_contact_email,
  business_email,
  business_phone,
  website,
  industry,
  status,
  client_type,
  services,
  monthly_budget,
  target_audience,
  target_locations,
  competitors,
  crm_platform,
  website_platform,
  start_date,
  notes,
  meta_account_ids,
  google_ads_account_ids
) VALUES (
  '{name}',
  ARRAY['{display_name_variants}'],
  ARRAY['{email_domain}'],
  ARRAY['{email_addresses}'],
  '{contact_name}',
  '{contact_email}',
  '{business_email}',
  '{phone}',
  '{website}',
  '{industry}',
  'active',
  'direct',
  ARRAY['{services}'],
  {budget},
  '{target_audience}',
  ARRAY['{locations}'],
  ARRAY['{competitors}'],
  '{crm}',
  '{website_platform}',
  CURRENT_DATE,
  '{onboarding_notes}',
  CASE WHEN '{platform}' IN ('meta', 'both') THEN ARRAY['{meta_account_id}'] ELSE NULL END,
  CASE WHEN '{platform}' IN ('google', 'both') THEN ARRAY['{google_account_id}'] ELSE NULL END
)
RETURNING id, name;
```

**IMPORTANT:** Store the returned `id` — every subsequent insert uses it as `client_id`.

For any field you don't have data for, use NULL — do NOT guess or fabricate values.

### Phase 5: Insert into `reporting_clients` Table

Create one row per platform. This is what the Creekside dashboard reads.

```sql
-- For Meta (if applicable)
INSERT INTO reporting_clients (
  client_id,
  client_name,
  platform,
  ad_account_id,
  ad_account_name,
  monthly_budget,
  monthly_revenue,
  goals,
  priority,
  account_manager,
  platform_operator,
  status,
  client_category,
  segment_name,
  goal_type,
  goal_target,
  fee_config
) VALUES (
  '{client_id}',
  '{client_name}',
  'meta',
  '{ad_account_id}',
  '{ad_account_name}',
  {monthly_budget},
  {monthly_revenue},
  '{goals}',
  'medium',
  '{account_manager}',
  '{platform_operator}',
  'active',
  'active',
  NULL,
  '{goal_type}',
  {goal_target},
  '{fee_config_json}'
)
RETURNING id, client_name, platform;

-- Repeat for Google if applicable, changing platform to 'google'
```

**Dashboard fields that MUST be populated** (even if defaults):
- `client_category` → default 'active'
- `priority` → default 'medium'
- `status` → 'active'
- `account_manager` → default 'Peterson' if not specified

**Report template customization (optional, lazy)**

New reports stay on the shared default template by default. This is intentional — template improvements propagate automatically. If a client needs day-1 report customization, run from the creekside-dashboard repo:

```bash
npm run branch-report -- "<client name>" <google|meta>
```

This creates a standalone report file for the client, registers it, updates the DB, and pushes to main. Do NOT auto-run this during onboarding. Only branch when actually diverging from the default.

### Phase 6: Seed `client_health_scores`

Every new client starts at LOW health — they are in their most fragile state during onboarding.

```sql
INSERT INTO client_health_scores (
  client_id,
  score,
  risk_level,
  signals,
  last_email_days,
  last_call_days,
  last_slack_days,
  open_overdue_tasks,
  revenue_trend
) VALUES (
  '{client_id}',
  30,
  'at_risk',
  '{"onboarding": true, "new_client": true, "initial_score": true, "note": "New client - fragile onboarding period"}'::jsonb,
  0,
  0,
  NULL,
  0,
  'unknown'
);
```

<!-- Allowed enum values: risk_level: healthy, watch, at_risk, critical | revenue_trend: growing, stable, declining, unknown -->
Note: score=30 and risk_level='at_risk' means the client-retention-agent will flag this client for proactive check-ins, which is exactly what new clients need.

### Phase 7: Link Leads Record (if applicable)

If a matching lead was found in Phase 1:

```sql
UPDATE leads 
SET converted_client_id = '{client_id}',
    status = 'closed_won',
    updated_at = NOW()
WHERE id = '{lead_id}';
```

**GHL Note:** If the client came through GHL CRM, spawn `ghl-crm-agent` to move the opportunity to "Closed Won" and add an "active-client" tag. This is not automated in this agent — trigger it as a follow-up step.

### Phase 8: Insert `raw_content` for Embedding

This ensures `search_all()` can find the new client semantically.

```sql
INSERT INTO raw_content (
  source_table,
  source_id,
  full_text,
  content_format
) VALUES (
  'clients',
  '{client_id}',
  'New client: {client_name}. Industry: {industry}. Services: {services}. Contact: {contact_name} ({contact_email}). Website: {website}. Monthly budget: {budget}. Started: {start_date}.',
  'text'
);
```

Do NOT include `char_count` — it is a generated column.

### Phase 9: Initialize `client_context_cache`

Seed the overview section so other agents have immediate context:

```sql
INSERT INTO client_context_cache (
  client_id,
  section,
  content,
  data_sources,
  source_record_count,
  date_range_start,
  date_range_end,
  stale_after
) VALUES (
  '{client_id}',
  'overview',
  'New client onboarded {today}. Services: {services}. Monthly budget: ${budget}. Platform(s): {platforms}. Account manager: {account_manager}. Status: Active — onboarding phase. Primary contact: {contact_name} ({contact_email}).',
  ARRAY['client-onboarding-agent'],
  1,
  CURRENT_DATE,
  CURRENT_DATE,
  INTERVAL '7 days'
);
```

### Phase 10: Run Auto-Link

Retroactively connect any existing emails, calls, Slack messages, etc. to the new client_id:

```sql
SELECT auto_link_client_ids();
```

This function scans all FK tables and matches unlinked records to clients based on display_names and email_domains. It may take a moment.

### Phase 10.5: Verify Drive Folder Completeness

Check that the client's Google Drive folder contains all expected documents:

```sql
SELECT file_name, document_type FROM gdrive_operations
WHERE ai_summary ILIKE '%{client_name}%' OR file_name ILIKE '%{client_name}%'
ORDER BY document_type, file_name;
```

Expected documents in a client folder:
- [ ] Signed contract/services agreement
- [ ] Onboarding sheet (with ad account IDs, contact info)
- [ ] Weekly updates tracking spreadsheet
- [ ] Ads tracking spreadsheet(s)
- [ ] Pricing breakdown / proposal (if one was emailed to the client)

If the pricing breakdown document was emailed but is NOT in the Drive folder, flag it:
"Warning: Pricing breakdown was emailed to {contact} on {date} but is not in the Google Drive folder. This document should be moved there."
