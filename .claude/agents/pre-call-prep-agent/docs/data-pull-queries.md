## Data Pull Queries

Run only the sections relevant to the classified call type. All queries enforce the 3-month recency window unless noted.

---

### Common Queries (All Call Types)

#### Prior Calls with This Person
```sql
SELECT id, meeting_title, meeting_date, meeting_type, participants, summary, action_items
FROM fathom_entries
WHERE (participants::text ILIKE '%PERSON_NAME%' OR meeting_title ILIKE '%PERSON_NAME%')
AND meeting_date > NOW() - INTERVAL '3 months'
ORDER BY meeting_date DESC LIMIT 5;
```

For relationship context only (not surfaced as current info):
```sql
SELECT COUNT(*) as total_calls,
  MIN(meeting_date) as first_call,
  MAX(meeting_date) as most_recent
FROM fathom_entries
WHERE participants::text ILIKE '%PERSON_NAME%' OR meeting_title ILIKE '%PERSON_NAME%';
```

#### Full Transcript of Most Recent Call
Always pull raw text for the most recent call. Never prep from the summary field alone.
```sql
SELECT * FROM get_full_content('fathom_entries', 'MOST_RECENT_FATHOM_ID');
```

#### Delta: Activity Since Last Call
Replace `LAST_CALL_DATE` with the date of the most recent prior call.

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

If this is a first interaction (no prior calls), pull the last 30 days of communication instead.

#### Cross-Platform Search (Catch Unlinked Records)
Always run both -- semantic finds conceptual matches, keyword finds exact names.
```sql
SELECT * FROM search_all('PERSON_NAME COMPANY_NAME', 10);
SELECT * FROM keyword_search_all('PERSON_NAME', 10);
```

#### Time Pressure Check
```sql
-- Or use list_events MCP tool with a tight time window after meeting end
SELECT event_title, start_time FROM google_calendar_entries
WHERE start_time > 'MEETING_END_TIME'
AND start_time < 'MEETING_END_TIME'::timestamp + INTERVAL '15 minutes'
LIMIT 1;
```
If found, flag at the top of the brief.

---

### Client Call Queries

#### Client Context Cache (check first -- fastest path)
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
WHERE client_name ILIKE '%CLIENT_NAME%'
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

#### Ad Performance (Last 7 Days vs Prior 7 Days)
```sql
-- Meta
SELECT date, campaign_name, spend, impressions, clicks, conversions, cost_per_result
FROM meta_insights_daily
WHERE client_id = 'CLIENT_UUID' AND date > NOW() - INTERVAL '14 days'
ORDER BY date DESC;

-- Google
SELECT date, campaign_name, cost_micros/1000000.0 as spend, impressions, clicks, conversions
FROM google_insights_daily
WHERE client_id = 'CLIENT_UUID' AND date > NOW() - INTERVAL '14 days'
ORDER BY date DESC;
```
Compare the two 7-day windows to show trend direction. Surface anomalies (spend 20%+ over/under budget, ROAS drop, conversion tracking gaps).

#### Analyst Notes
```sql
SELECT id, title, content, created_at FROM ads_knowledge
WHERE client_id = 'CLIENT_UUID'
AND created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC LIMIT 3;
```

#### Client Health Score
```sql
SELECT overall_score, communication_score, meeting_score, task_score, revenue_score, calculated_at
FROM client_health_scores
WHERE client_id = 'CLIENT_UUID'
ORDER BY calculated_at DESC LIMIT 1;
```

#### Mentions in Other Calls
Was this client discussed in internal or other client calls recently?
```sql
SELECT fm.context_summary, fe.meeting_title, fe.meeting_date
FROM fathom_client_mentions fm
JOIN fathom_entries fe ON fm.fathom_entry_id = fe.id
WHERE fm.client_id = 'CLIENT_UUID'
AND fe.meeting_date > NOW() - INTERVAL '30 days'
ORDER BY fe.meeting_date DESC LIMIT 5;
```

---

### Sales Call Queries

#### Lead Record
```sql
SELECT id, name, business_name, source, source_detail, status, website,
  interested_in, notes, first_contact_date, last_contact_date, source_refs
FROM leads
WHERE name ILIKE '%LEAD_NAME%' OR business_name ILIKE '%LEAD_NAME%'
ORDER BY created_at DESC LIMIT 5;
```

#### ClickUp Lead Task
Team members sometimes paste call transcripts or notes into ClickUp task descriptions.
```sql
SELECT clickup_task_id, task_name, status, ai_summary, due_date
FROM clickup_entries
WHERE task_name ILIKE '%PERSON_NAME%' OR task_name ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;
```
If a match is found, pull full content -- it may contain a pasted transcript or detailed notes:
```sql
SELECT * FROM get_full_content('clickup_entries', 'CLICKUP_ENTRY_ID');
```

#### SDR / Upwork History
```sql
SELECT id, title, created_at, ai_summary FROM sdr_responses
WHERE ai_summary ILIKE '%PERSON_NAME%' OR ai_summary ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;
```
If the lead came from Upwork, Peterson has already read the Upwork chat. Surface only info from OTHER sources that adds to what he already knows.

#### Audit Videos Sent
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

---

### Internal Call Queries

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

#### Client Issues in Their Portfolio
```sql
SELECT c.name as client_name, chs.overall_score, chs.calculated_at
FROM client_health_scores chs
JOIN clients c ON chs.client_id = c.id
WHERE chs.overall_score < 60
AND c.id IN (
  SELECT DISTINCT cl.id FROM clients cl
  JOIN reporting_clients rc ON rc.client_name = cl.name
  WHERE rc.account_manager ILIKE '%PERSON_NAME%' OR rc.platform_operator ILIKE '%PERSON_NAME%'
)
ORDER BY chs.overall_score ASC;
```
If this join is unreliable, fall back to listing their portfolio clients and checking health scores individually.

#### Open Action Items Involving This Person
```sql
SELECT title, status, priority, category, context FROM action_items
WHERE (title ILIKE '%PERSON_NAME%' OR description ILIKE '%PERSON_NAME%' OR context ILIKE '%PERSON_NAME%')
AND status IN ('open', 'pending', 'in_progress')
ORDER BY priority ASC LIMIT 10;
```

#### Recent Pipeline Alerts (Ops Context)
```sql
SELECT alert_type, severity, message, created_at FROM pipeline_alerts
WHERE severity IN ('high', 'critical') AND acknowledged = false
ORDER BY created_at DESC LIMIT 5;
```
Only include for ops-level team syncs (Cade, Scott). Skip for VA or contractor syncs.
