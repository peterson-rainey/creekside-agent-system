### Step 3: Check for Existing Case Study Documents (run in parallel with Step 4)
```sql
-- Search GDrive marketing folder for existing case study files
SELECT id, file_name, ai_summary, doc_type, modified_date
FROM gdrive_marketing
WHERE (file_name ILIKE '%CLIENT_NAME%' OR ai_summary ILIKE '%CLIENT_NAME%')
ORDER BY modified_date DESC LIMIT 10;

-- Also check gdrive_operations
SELECT id, file_name, document_type, ai_summary, modified_date
FROM gdrive_operations
WHERE client_id = 'CLIENT_UUID'
   OR file_name ILIKE '%CLIENT_NAME%'
   OR ai_summary ILIKE '%CLIENT_NAME%'
ORDER BY modified_date DESC LIMIT 10;
```
If an existing case study document exists, pull its raw text — it may already have the formatted structure you need to build from.

### Step 4: Platform Data Inventory
```sql
-- Count all records for this client across every platform
SELECT
  (SELECT count(*) FROM fathom_entries WHERE client_id = 'CLIENT_UUID') as fathom_meetings,
  (SELECT count(*) FROM fathom_client_mentions WHERE client_id = 'CLIENT_UUID') as fathom_mentions,
  (SELECT count(*) FROM loom_entries WHERE client_id = 'CLIENT_UUID') as loom_videos,
  (SELECT count(*) FROM slack_summaries WHERE client_id = 'CLIENT_UUID') as slack,
  (SELECT count(*) FROM gmail_summaries WHERE client_id = 'CLIENT_UUID') as gmail,
  (SELECT count(*) FROM gchat_summaries WHERE client_id = 'CLIENT_UUID') as gchat,
  (SELECT count(*) FROM square_entries WHERE client_id = 'CLIENT_UUID') as square,
  (SELECT count(*) FROM accounting_entries WHERE client_id = 'CLIENT_UUID') as accounting,
  (SELECT count(*) FROM clickup_entries WHERE client_id = 'CLIENT_UUID') as clickup,
  (SELECT count(*) FROM gdrive_marketing WHERE client_id = 'CLIENT_UUID') as gdrive_marketing,
  (SELECT count(*) FROM gdrive_operations WHERE client_id = 'CLIENT_UUID') as gdrive_ops;
```
Report these counts. They tell you what evidence is available.

### Step 5: Pull Performance Data (all sources in parallel)

**Fathom — call notes mentioning results:**
```sql
-- Direct meetings with this client
SELECT id, title, meeting_date, summary
FROM fathom_entries
WHERE client_id = 'CLIENT_UUID'
ORDER BY meeting_date DESC LIMIT 20;

-- Mentions in OTHER meetings (Peterson discussing results internally)
SELECT fm.id, fe.meeting_date, fe.title, fm.context_summary
FROM fathom_client_mentions fm
JOIN fathom_entries fe ON fm.fathom_entry_id = fe.id
WHERE fm.client_id = 'CLIENT_UUID'
ORDER BY fe.meeting_date DESC LIMIT 20;
```

**Loom — training videos with result walkthroughs:**
```sql
SELECT id, title, ai_summary, recorded_at
FROM loom_entries
WHERE client_id = 'CLIENT_UUID'
   OR ai_summary ILIKE '%CLIENT_NAME%'
ORDER BY recorded_at DESC LIMIT 10;
```

**Slack/Gmail — client feedback, testimonials, result reports:**
```sql
(SELECT 'slack' as platform, id::text, message_date::text as activity_date, ai_summary as summary
 FROM slack_summaries WHERE client_id = 'CLIENT_UUID' ORDER BY message_date DESC LIMIT 10)
UNION ALL
(SELECT 'gmail', id::text, date::text, ai_summary
 FROM gmail_summaries WHERE client_id = 'CLIENT_UUID' ORDER BY date DESC LIMIT 10)
ORDER BY activity_date DESC;
```

**Revenue data — engagement length and billing:**
```sql
-- Square payments
SELECT source_timestamp, amount_cents, payment_status, description
FROM square_entries
WHERE client_id = 'CLIENT_UUID'
AND payment_status = 'COMPLETED'
ORDER BY source_timestamp ASC;

-- Accounting entries for total revenue
SELECT month, entry_type, category, amount_cents, description
FROM accounting_entries
WHERE client_id = 'CLIENT_UUID'
AND entry_type = 'income'
ORDER BY month_date ASC;
```

**Unified search — catch any unlinked records:**
```sql
SELECT * FROM keyword_search_all(
  query_text => 'CLIENT_NAME results performance ROAS leads conversions',
  filter_table => NULL,
  max_results => 20,
  include_unpromoted => true,
  filter_client_id => NULL
);
```

### Step 6: Pull Raw Text for High-Value Records (MANDATORY)
Never answer important questions from summaries alone. For every Fathom entry, Loom, GDrive document, or Slack message that mentions specific metrics — pull the full text.

```sql
-- Batch pull for fathom entries found in Step 5
SELECT * FROM get_full_content_batch('fathom_entries', ARRAY['id1','id2','id3','id4','id5']);

-- Pull any GDrive case study documents found in Step 3
SELECT * FROM get_full_content_batch('gdrive_marketing', ARRAY['id1','id2']);

-- Pull Loom with performance data
SELECT * FROM get_full_content_batch('loom_entries', ARRAY['id1','id2']);
```

Direct raw_content query (if RPC is slow):
```sql
SELECT full_text FROM raw_content
WHERE source_table = 'fathom_entries' AND source_id IN ('id1','id2','id3');
```

### Step 7: Extract Data Points and Classify

From the raw text, extract and classify every data point found:

**Challenge indicators** (look for):
- Why they came to Creekside (prior agency failure, inconsistent leads, lack of brand awareness, platform ban, poor ROAS)
- What the business situation was before Creekside (declining revenue, facing closure, relying on referrals)
- Budget constraints or timeline pressure

**Solution indicators** (look for):
- Services deployed (Google Ads, Meta Ads, Local Service Ads, GMB optimization)
- Strategy specifics (keyword targeting approach, creative strategy, landing page work, conversion tracking)
- Creekside's 3-part approach pattern (always numbered: 1. targeting, 2. optimization tool usage, 3. creative/landing page)

**Results indicators** (look for):
- ROAS figures (before and after if available)
- Cost per conversion / cost per lead (before and after)
- Lead volume (monthly or total)
- Impression share / ranking improvements
- Revenue generated or added
- ROI percentage
- Specific date range of the campaign

**Business outcome indicators** (look for):
- New location opened / franchise expansion
- Increased ad budget (client putting more money in = confidence signal)
- Business saved from closing
- Revenue milestone hit
- Market expansion

**Quote indicators** (look for):
- Verbatim client statements in Slack, Gmail, Fathom transcripts
- Positive feedback sent directly to Peterson or team
- Third-party mentions of the client's satisfaction
