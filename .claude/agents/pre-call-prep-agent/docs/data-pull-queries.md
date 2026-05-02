## Data Pull Queries

Run only the sections relevant to the classified call type. All queries enforce the 3-month recency window unless noted. Use `search_all()` and `keyword_search_all()` to discover records first, then pull specific columns directly from tables for fields the search functions don't return.

---

### Common Queries (Sales + Client + Joint Pitch Calls)

#### Unified Search (run first -- discovers records across all tables)
```sql
SELECT * FROM search_all('PERSON_NAME COMPANY_NAME', 15);
SELECT * FROM keyword_search_all('PERSON_NAME', 15);
```
Use the record IDs returned here to drive subsequent direct queries.

#### Prior Calls with This Person
```sql
-- Within 3-month window (active context)
SELECT id, meeting_title, meeting_date, meeting_type, participants, summary, action_items
FROM fathom_entries
WHERE (participants::text ILIKE '%PERSON_NAME%' OR meeting_title ILIKE '%PERSON_NAME%')
AND meeting_date > NOW() - INTERVAL '3 months'
ORDER BY meeting_date DESC LIMIT 5;

-- Relationship context (outside window -- count only, no details surfaced as current)
SELECT COUNT(*) as total_calls,
  MIN(meeting_date) as first_call,
  MAX(meeting_date) as most_recent
FROM fathom_entries
WHERE participants::text ILIKE '%PERSON_NAME%' OR meeting_title ILIKE '%PERSON_NAME%';
```

#### Full Transcript of Most Recent Call (MANDATORY when a prior call exists)
```sql
SELECT full_text FROM raw_content
WHERE source_table = 'fathom_entries' AND source_id = 'MOST_RECENT_FATHOM_ID';
```
Never prep from the `summary` field alone. If `full_text` is NULL or empty, use `summary` + `action_items` array and flag: `[PARTIAL -- no transcript available]`.

#### Action Item Extraction from Prior Call (MANDATORY for follow-ups)
After pulling the transcript, extract EVERY commitment and action item from it:
1. Start with the `action_items` array from `fathom_entries` (quick starting list)
2. Supplement by reading the raw transcript for commitments the array missed
3. For each item, check current status by searching ClickUp tasks, emails, and chats:
```sql
-- Check if action items became ClickUp tasks
SELECT task_name, status, assignees, due_date FROM clickup_entries
WHERE client_id = 'CLIENT_UUID'
AND created_at > 'PRIOR_CALL_DATE'
AND status NOT IN ('closed', 'complete', 'done', 'archived')
ORDER BY created_at ASC LIMIT 10;
```
Present as a checklist with status: done / not done / in progress / unknown. This is the highest-value section for recurring calls.

#### Delta: Activity Since Last Call
Replace `LAST_CALL_DATE` with the date of the most recent prior call. If this is a first interaction, pull the last 30 days instead.

```sql
-- Emails since last call
SELECT id, date, participants, ai_summary FROM gmail_summaries
WHERE (participants::text ILIKE '%PERSON_NAME%' OR participants::text ILIKE '%PERSON_EMAIL%')
AND date > 'LAST_CALL_DATE'
ORDER BY date DESC LIMIT 10;

-- Google Chat since last call
SELECT id, space_name, date, ai_summary FROM gchat_summaries
WHERE (ai_summary ILIKE '%PERSON_NAME%' OR ai_summary ILIKE '%CLIENT_NAME%')
AND date > 'LAST_CALL_DATE'
ORDER BY date DESC LIMIT 5;

-- ClickUp chat messages since last call
SELECT id, date, channel_name, ai_summary FROM clickup_chat_entries
WHERE (ai_summary ILIKE '%PERSON_NAME%' OR ai_summary ILIKE '%CLIENT_NAME%')
AND date > 'LAST_CALL_DATE'
ORDER BY date DESC LIMIT 5;
```

---

### Sales Call Queries (Types 1, 2, 2b, 7)

#### Lead Record
```sql
SELECT id, name, business_name, source, source_detail, status, website,
  interested_in, notes, first_contact_date, last_contact_date, source_refs
FROM leads
WHERE name ILIKE '%LEAD_NAME%' OR business_name ILIKE '%LEAD_NAME%'
ORDER BY created_at DESC LIMIT 5;
```

#### ClickUp Lead Task (check for pasted transcripts -- Malik pastes them here)
```sql
SELECT clickup_task_id, task_name, status, ai_summary, due_date
FROM clickup_entries
WHERE task_name ILIKE '%PERSON_NAME%' OR task_name ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;
```
If a match is found, pull full content:
```sql
SELECT * FROM get_full_content('clickup_entries', 'CLICKUP_ENTRY_ID');
```

#### Upwork Lead Messages (ClickUp Comment Threads -- PRIMARY source for Upwork leads)
Upwork prospect conversations are captured as comments on ClickUp "Upwork Leads" list tasks. This is often the richest pre-call data for Upwork-sourced prospects.
```sql
-- Find the lead's ClickUp task
SELECT id, clickup_task_id, task_name, ai_summary FROM clickup_entries
WHERE task_name ILIKE '%PERSON_NAME%' OR task_name ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;

-- Pull ALL comment threads on that task (contains full Upwork message history)
SELECT id, date_range_start, ai_summary FROM clickup_comment_threads
WHERE clickup_task_id = 'CLICKUP_TASK_ID'
ORDER BY date_range_start ASC;
```
If comments exist, pull full content for the most recent ones:
```sql
SELECT * FROM get_full_content('clickup_comment_threads', 'COMMENT_THREAD_ID');
```
Peterson has already read the Upwork chat directly, but the ClickUp comments may contain team annotations, warm-up tracking, and context Peterson hasn't seen from other team members (Queenie's notes, Cyndi's follow-ups, ClickBot triggers).

#### SDR / Upwork History (supplementary)
```sql
SELECT id, title, created_at, ai_summary FROM sdr_responses
WHERE ai_summary ILIKE '%PERSON_NAME%' OR ai_summary ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;
```

#### Warm-Up Messaging Sent
The warm-up SOP sends resource messages before the call. Report: how many were sent and which resources were shared (this tells Peterson what the prospect has already seen).
```sql
SELECT * FROM keyword_search_all('warm-up PERSON_NAME', 10);
```

#### Audit Videos / Looms Sent
```sql
SELECT id, title, created_at, ai_summary FROM loom_entries
WHERE title ILIKE '%PERSON_NAME%' OR title ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;
```

#### Proposals / Documents Sent
```sql
SELECT id, title, doc_type, ai_summary FROM gdrive_operations
WHERE title ILIKE '%PERSON_NAME%' OR title ILIKE '%COMPANY_NAME%'
ORDER BY modified_at DESC LIMIT 5;
```

#### Cade's Prior Contact
Cade handles Facebook-only consultations. Check if he had a call first:
```sql
SELECT id, meeting_title, meeting_date, summary, action_items
FROM fathom_entries
WHERE meeting_title ILIKE '%PERSON_NAME%'
AND participants::text ILIKE '%Cade%'
ORDER BY meeting_date DESC LIMIT 3;
```

#### Referral Partner Context (When a known partner is on the call with an unknown prospect)
If a known partner (Erika Schlick, Adam Holcomb, Full Circle) is bringing a third party:
```sql
-- Search partner's recent communications for referral context
SELECT id, date, ai_summary FROM gmail_summaries
WHERE participants::text ILIKE '%PARTNER_EMAIL%'
AND (ai_summary ILIKE '%PROSPECT_NAME%' OR ai_summary ILIKE '%referr%' OR ai_summary ILIKE '%intro%')
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 5;

-- Check partner's recent Fathom calls for context
SELECT id, meeting_title, meeting_date, summary FROM fathom_entries
WHERE participants::text ILIKE '%PARTNER_NAME%'
AND meeting_date > NOW() - INTERVAL '30 days'
ORDER BY meeting_date DESC LIMIT 5;

-- Check if prospect was mentioned in any gchat
SELECT id, date, ai_summary FROM gchat_summaries
WHERE ai_summary ILIKE '%PROSPECT_NAME%'
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 5;
```
Surface: who referred this prospect, why, what the partner said about them, and any context on the prospect's business.

---

### Client Call Queries (Type 3)

#### Client Resolution (MANDATORY -- never query clients by name directly)
```sql
SELECT * FROM find_client('CLIENT_NAME');
```
Use the returned `client_id` (UUID) for all subsequent queries.

#### Client Context Cache (fastest path -- check first)
```sql
SELECT section, content, last_updated FROM client_context_cache
WHERE client_id = 'CLIENT_UUID'
ORDER BY last_updated DESC;
```
If cache is < 7 days old, use as foundation and supplement with delta queries below. If stale or missing, rely on direct queries.

#### Team Assignments
```sql
SELECT client_name, platform, account_manager, platform_operator
FROM reporting_clients
WHERE client_id = 'CLIENT_UUID'
ORDER BY platform;
```

#### Open Tasks
```sql
SELECT clickup_task_id, task_name, status, assignees, due_date, ai_summary
FROM clickup_entries
WHERE client_id = 'CLIENT_UUID'
AND status NOT IN ('closed', 'complete', 'done', 'archived')
ORDER BY due_date ASC NULLS LAST LIMIT 10;
```

#### Financial Snapshot
```sql
-- Revenue trend (last 3 months)
SELECT month, total_revenue FROM revenue_by_client
WHERE client_id = 'CLIENT_UUID'
ORDER BY month DESC LIMIT 3;

-- Open or overdue invoices
SELECT id, source_timestamp, payment_status, amount_cents / 100.0 as amount
FROM square_entries
WHERE client_id = 'CLIENT_UUID' AND data_type = 'invoice'
AND payment_status NOT IN ('COMPLETED')
ORDER BY source_timestamp DESC LIMIT 5;
```

#### Ad Performance (Last 30 Days -- Weekly Rollups)
```sql
-- Meta (30 days, aggregated by week for trend visibility)
SELECT date_trunc('week', date) as week,
  SUM(spend) as spend, SUM(impressions) as impressions, SUM(clicks) as clicks,
  SUM(conversions) as conversions,
  CASE WHEN SUM(conversions) > 0 THEN SUM(spend) / SUM(conversions) ELSE NULL END as cost_per_conversion
FROM meta_insights_daily
WHERE client_id = 'CLIENT_UUID' AND date > NOW() - INTERVAL '30 days'
GROUP BY date_trunc('week', date)
ORDER BY week DESC;

-- Google (30 days, aggregated by week)
SELECT date_trunc('week', date) as week,
  SUM(cost_micros)/1000000.0 as spend, SUM(impressions) as impressions, SUM(clicks) as clicks,
  SUM(conversions) as conversions,
  CASE WHEN SUM(conversions) > 0 THEN (SUM(cost_micros)/1000000.0) / SUM(conversions) ELSE NULL END as cost_per_conversion
FROM google_insights_daily
WHERE client_id = 'CLIENT_UUID' AND date > NOW() - INTERVAL '30 days'
GROUP BY date_trunc('week', date)
ORDER BY week DESC;
```
Show 4-week trend with weekly rollups. Identify the metrics that matter most for THIS client's business (e.g., cost per lead for lead gen, ROAS for ecomm, cost per call for service businesses). Surface anomalies: spend 20%+ over/under budget, conversion drops, tracking gaps. Never cite ROAS targets unless confirmed in Fathom recordings or client records.

**FALLBACK: If DB tables return empty (no rows for this client), pull live data via MCP:**
- **Meta:** Use `mcp__claude_ai_PipeBoard__get_ad_accounts` to find the client's account, then `mcp__claude_ai_PipeBoard__get_campaigns` and `mcp__claude_ai_PipeBoard__get_insights` for last 30 days
- **Google:** Use `mcp__claude_ai_Pipeboard_google__list_google_ads_customers` to find the account, then `mcp__claude_ai_Pipeboard_google__get_google_ads_campaign_metrics` for last 30 days

Do NOT leave the performance section blank when MCP tools can provide live data. Flag the source: `[source: PipeBoard MCP, live pull]`

#### Contractor Ad Performance Notes
Pull recent notes the platform operator has shared about this client's campaigns -- Google Chat messages, ClickUp comments, and ads_knowledge entries.
```sql
-- Operator notes in ads_knowledge
SELECT id, title, content, created_at FROM ads_knowledge
WHERE client_id = 'CLIENT_UUID'
AND created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC LIMIT 5;

-- Operator's Google Chat messages about this client (last 30 days)
SELECT id, date, ai_summary FROM gchat_summaries
WHERE ai_summary ILIKE '%CLIENT_NAME%'
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 10;

-- Operator's ClickUp comments about this client (last 30 days)
SELECT id, date_range_start, ai_summary FROM clickup_comment_threads
WHERE client_id = 'CLIENT_UUID'
AND date_range_start > NOW() - INTERVAL '30 days'
ORDER BY date_range_start DESC LIMIT 10;
```
Summarize the contractor's recent observations, recommendations, and flags. These are the operator's ground-level insights -- often more current than formal reports.


#### Mentions in Other Calls (Was This Client Discussed Elsewhere?)
```sql
SELECT fm.context_summary, fe.meeting_title, fe.meeting_date
FROM fathom_client_mentions fm
JOIN fathom_entries fe ON fm.fathom_entry_id = fe.id
WHERE fm.client_id = 'CLIENT_UUID'
AND fe.meeting_date > NOW() - INTERVAL '30 days'
ORDER BY fe.meeting_date DESC LIMIT 5;
```

---

### Internal Call Queries (Type 5)

For internal calls, skip the Common queries unless there is a prior Fathom call with this person. Focus on their work context.

#### Team Member Profile
```sql
SELECT id, name, role, email FROM team_members
WHERE name ILIKE '%PERSON_NAME%' OR email ILIKE '%EMAIL%';
```

#### Their Client Portfolio
```sql
SELECT client_name, platform, account_manager, platform_operator
FROM reporting_clients
WHERE account_manager ILIKE '%PERSON_NAME%' OR platform_operator ILIKE '%PERSON_NAME%'
ORDER BY client_name;
```

#### Last 30 Days of Context Per Portfolio Client
For each client in their portfolio, pull the last 30 days of activity to understand where things stand. Run these per client:
```sql
-- Recent calls mentioning this client
SELECT id, meeting_title, meeting_date, summary, action_items
FROM fathom_entries
WHERE (meeting_title ILIKE '%CLIENT_NAME%' OR summary ILIKE '%CLIENT_NAME%')
AND meeting_date > NOW() - INTERVAL '30 days'
ORDER BY meeting_date DESC LIMIT 3;

-- Recent emails about this client
SELECT id, date, ai_summary FROM gmail_summaries
WHERE ai_summary ILIKE '%CLIENT_NAME%'
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 5;

-- Recent Google Chat about this client
SELECT id, date, ai_summary FROM gchat_summaries
WHERE ai_summary ILIKE '%CLIENT_NAME%'
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 5;

-- Open tasks for this client
SELECT task_name, status, assignees, due_date FROM clickup_entries
WHERE client_id = 'CLIENT_UUID'
AND status NOT IN ('closed', 'complete', 'done', 'archived')
ORDER BY due_date ASC NULLS LAST LIMIT 5;
```
Batch these where possible. The goal is a 2-3 line summary per client: what's happening, what's stuck, what needs discussion. Skip clients with zero activity in 30 days -- note them as "no recent activity" in one line.

#### Open Action Items Involving This Person
```sql
SELECT title, status, priority, category, context FROM action_items
WHERE (title ILIKE '%PERSON_NAME%' OR description ILIKE '%PERSON_NAME%' OR context ILIKE '%PERSON_NAME%')
AND status IN ('open', 'pending', 'in_progress')
ORDER BY priority ASC LIMIT 10;
```

#### Recent Pipeline Alerts (Ops-Level Syncs Only -- Cade, Scott)
```sql
SELECT alert_type, severity, message, created_at FROM pipeline_alerts
WHERE severity IN ('high', 'critical') AND acknowledged = false
ORDER BY created_at DESC LIMIT 5;
```
Skip for VA or contractor syncs.

#### Prior Call with This Person (for delta)
```sql
SELECT id, meeting_title, meeting_date, summary, action_items
FROM fathom_entries
WHERE (participants::text ILIKE '%PERSON_NAME%' OR meeting_title ILIKE '%PERSON_NAME%')
ORDER BY meeting_date DESC LIMIT 1;
```
If found, pull full transcript and identify what was discussed last time.
