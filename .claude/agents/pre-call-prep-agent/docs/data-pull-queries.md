### Step 5: Full Data Pull (Combined Queries)

#### 5a. Prior Meetings + Call History (CRITICAL for follow-ups)
```sql
-- All Fathom meetings involving this person
SELECT id, meeting_title, meeting_date, participants, summary, action_items
FROM fathom_entries
WHERE participants::text ILIKE '%PERSON_NAME%'
   OR meeting_title ILIKE '%PERSON_NAME%'
   OR meeting_title ILIKE '%COMPANY_NAME%'
ORDER BY meeting_date DESC LIMIT 10;

-- Also check fathom_client_mentions for indirect references
SELECT fm.id, fm.context_summary, fe.meeting_title, fe.meeting_date
FROM fathom_client_mentions fm
JOIN fathom_entries fe ON fm.fathom_entry_id = fe.id
WHERE fm.client_id = 'CLIENT_UUID'
ORDER BY fe.meeting_date DESC LIMIT 10;
```

#### 5b. Recent Communication (Last 30 Days)
```sql
-- Gmail threads with this person
SELECT id, date, participants, ai_summary
FROM gmail_summaries
WHERE (participants::text ILIKE '%PERSON_NAME%'
   OR participants::text ILIKE '%PERSON_EMAIL%')
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 10;

-- Slack messages mentioning this person/client
SELECT id, channel_name, date, ai_summary
FROM slack_summaries
WHERE ai_summary ILIKE '%PERSON_NAME%'
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 10;

-- Google Chat messages
SELECT id, space_name, date, ai_summary
FROM gchat_summaries
WHERE ai_summary ILIKE '%PERSON_NAME%'
AND date > NOW() - INTERVAL '30 days'
ORDER BY date DESC LIMIT 5;
```

#### 5c. Open Tasks and Projects
```sql
SELECT clickup_task_id, task_name, status, assignees, due_date, ai_summary
FROM clickup_entries
WHERE client_id = 'CLIENT_UUID'
AND status NOT IN ('closed', 'complete', 'done', 'archived')
ORDER BY due_date ASC NULLS LAST LIMIT 15;
```

#### 5d. Financial Context (Active Clients Only)
```sql
-- Recent revenue from this client
SELECT month, total_revenue
FROM revenue_by_client
WHERE client_id = 'CLIENT_UUID'
ORDER BY month_date DESC LIMIT 6;

-- Any open/overdue invoices
SELECT id, source_timestamp, payment_status, order_status, amount_cents / 100.0 as amount_dollars
FROM square_entries
WHERE client_id = 'CLIENT_UUID'
AND data_type = 'invoice'
AND payment_status NOT IN ('COMPLETED')
ORDER BY source_timestamp DESC LIMIT 5;
```

#### 5d2. Google Drive Documents (Proposals, Audits, SOPs)
```sql
SELECT id, title, doc_type, ai_summary
FROM gdrive_summaries
WHERE client_id = 'CLIENT_UUID'
   OR title ILIKE '%PERSON_NAME%'
   OR title ILIKE '%COMPANY_NAME%'
ORDER BY modified_at DESC LIMIT 10;
```

#### 5e. ClickUp Lead Record (Sales/Follow-Up Calls)
Prior call transcripts are sometimes pasted into ClickUp lead record descriptions by team members. Check this source in addition to Fathom:
```sql
SELECT clickup_task_id, task_name, status, ai_summary, due_date
FROM clickup_entries
WHERE task_name ILIKE '%PERSON_NAME%' OR task_name ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;
```
If a matching lead record is found, pull its full content — the description field may contain a pasted call transcript.

#### 5f. Upwork Conversation Context (Sales Calls)
Peterson reads the Upwork chat before every discovery call. The brief should NOT repeat what's already in the Upwork chat — instead, surface what Peterson does NOT already know:
```sql
-- Check for Upwork messages/proposals related to this person
SELECT id, title, created_at, ai_summary
FROM sdr_responses
WHERE ai_summary ILIKE '%PERSON_NAME%' OR ai_summary ILIKE '%COMPANY_NAME%'
ORDER BY created_at DESC LIMIT 5;
```
In the brief, note: "Peterson likely already reviewed the Upwork chat. Key items NOT in the Upwork chat: [list new info from other sources]."

#### 5g. Cross-Platform Search (Catch Unlinked Records)
```sql
-- Dual search — always run BOTH
SELECT * FROM search_all('PERSON_NAME', NULL, 15);
SELECT * FROM keyword_search_all('PERSON_NAME', NULL, 15);
```

#### 5h. Pull Raw Text for Key Records
For the most recent Fathom meeting, any flagged emails, and any records with action items — pull full text:
```sql
SELECT * FROM get_full_content_batch('fathom_entries', ARRAY['most_recent_id', 'second_most_recent_id']);
```

**MANDATORY:** For follow-up calls (Type 2/2b), ALWAYS pull full transcript of the most recent prior call. Check BOTH Fathom entries AND ClickUp task descriptions — transcripts live in both places. Never summarize a prior call from the summary field alone.

#### 5i. Time Pressure Check
Check if Peterson has another call immediately after this one:
```sql
SELECT id, event_title, start_time
FROM google_calendar_entries
WHERE start_time > 'THIS_MEETING_END_TIME'
AND start_time < 'THIS_MEETING_END_TIME' + INTERVAL '15 minutes'
LIMIT 1;
```
If yes, flag in the brief: "Hard cutoff at [time] — Peterson has [next meeting] right after. He typically sets time expectations at the start of calls when back-to-back."

