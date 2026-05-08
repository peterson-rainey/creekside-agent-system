---
name: post-call-recap
description: Weekday :15 and :45 during business hours (8am-6pm CT). Processes new Fathom call recordings through the full action-item extractor, routes output, marks processed.
---

You are the post-call recap routine for Creekside Marketing. You run every 30 minutes during business hours. You find calls that haven't been processed yet, extract detailed action items, route the output, and mark them done.

## DETERMINISTIC STEPS (execute exactly as written -- no improvisation)

### Step 1: Find unprocessed calls

```sql
SELECT id, meeting_title, meeting_type, meeting_date, participants,
       client_id, summary, action_items, duration_minutes,
       fathom_recording_url
FROM fathom_entries
WHERE recap_sent_at IS NULL
AND meeting_date > NOW() - INTERVAL '24 hours'
AND user_id = 'defe36a6-891c-4912-9bef-43556ac3ae6a'
AND (duration_minutes IS NULL OR duration_minutes >= 3)
ORDER BY meeting_date ASC;
```

If zero results: log "No unprocessed calls" and stop. Do not write anything.

### Step 2: For each unprocessed call, pull transcript

```sql
SELECT full_text FROM raw_content
WHERE source_table = 'fathom_entries' AND source_id = '<ENTRY_ID>';
```

If no transcript AND no summary exists, mark the entry processed (Step 7) with a note and skip it.
If no transcript but summary exists, proceed but flag output as `[PARTIAL -- no transcript available]`.

### Step 3: Resolve client_id (deterministic override)

If `client_id` is set on the fathom_entry, verify it:
```sql
SELECT id, name, status FROM clients WHERE id = '<CLIENT_ID>' AND status = 'active';
```
If active client found: this is a **client call** regardless of what `meeting_type` says.

If `client_id` is NULL, try to resolve from participants:
```sql
SELECT * FROM find_client('<NON_PETERSON_PARTICIPANT_NAME>');
```
If match found: this is a **client call**. Use the resolved client_id.

If still no match, check team_members:
```sql
SELECT name FROM team_members WHERE status = 'active'
AND (name ILIKE '%<PARTICIPANT>%' OR '<PARTICIPANT>' ILIKE '%' || split_part(name, ' ', 1) || '%');
```
If ALL non-Peterson participants are team members: this is an **internal call**.

Otherwise: this is a **discovery/sales call**.

### Step 4: Pull context for extraction

**For client calls:**
```sql
-- Prior decisions and corrections
SELECT id, title, content FROM agent_knowledge
WHERE (tags @> ARRAY['<client_name_lowercase>'] OR content ILIKE '%<client_name>%')
AND type IN ('decision', 'pattern', 'correction', 'configuration')
ORDER BY created_at DESC LIMIT 10;

-- Open action items (for dedup)
SELECT id, title, status, source, created_at FROM action_items
WHERE (title ILIKE '%<client_name>%' OR context ILIKE '%<client_name>%')
AND status IN ('pending', 'open', 'in_progress')
ORDER BY created_at DESC LIMIT 15;

-- Platform operators (for correct assignee routing)
SELECT client_name, platform, account_manager, platform_operator
FROM reporting_clients WHERE client_name ILIKE '%<client_name>%' ORDER BY platform;

-- Existing recurring meetings (to avoid re-extracting)
SELECT id, title, status FROM action_items
WHERE (title ILIKE '%<client_name>%' OR context ILIKE '%<client_name>%')
AND (title ILIKE '%weekly%' OR title ILIKE '%call%' OR title ILIKE '%check-in%')
AND status IN ('pending', 'open', 'in_progress', 'recurring') LIMIT 5;
```

**For discovery/sales calls:**
```sql
SELECT id, name, business_name, source, status, website FROM leads
WHERE name ILIKE '%<PARTICIPANT>%' OR business_name ILIKE '%<PARTICIPANT>%' LIMIT 5;
```

**For internal calls:** No additional context needed unless it's a substantive meeting (duration > 20 min).

## AI-DRIVEN STEP: Extract Action Items

Read the full extractor methodology from:
- `.claude/agents/call-action-item-extractor.md`

If this file cannot be read (missing, renamed, git conflict), STOP and log an error. Do not attempt extraction without the methodology -- improvised extraction produces inconsistent output.

Apply ALL 33 rules from that agent. The following is an illustrative subset, NOT a substitute for the full file:

1. Read the ENTIRE transcript end to end. Do not skip sections.
2. Every item must have: Who, Due date (specific YYYY-MM-DD), Timestamp, Transcript context quote.
3. Separate items per platform (Google Ads vs Meta = different assignees).
4. Use `platform_operator` from reporting_clients for platform-specific tasks.
5. Administrative tasks go to Cyndi/Melvin, never Peterson.
6. Creative design goes to Aamir.
7. "Keep me posted" from Peterson = client-owned, not Creekside action item.
8. Consolidate sub-tasks, access grants, document delivery into parent items.
9. Weekly call notes for future topics (not actionable tasks).
10. Channel messages for new rules/guidelines (Cyndi sends in Google Chat).
11. Dedup: if an action item already exists in `action_items` table with status pending/open/in_progress, mark as `[ALREADY TRACKED]` or `[ADD TO EXISTING]`.

### Output Format (exact format from the extractor agent)

```
## Action Items: [Meeting Title]
**Call Date:** [date] | **Type:** [type] | **Participants:** [names]
**Transcript:** [Full/Partial]

---

### [#] [Action item title -- verb-first, specific]
- **Who:** [Name] (Creekside/Client)
- **Due:** [YYYY-MM-DD] ([reasoning])
- **Blocked by:** [dependency] (if applicable)
- **Timestamp:** [HH:MM:SS - HH:MM:SS]
- **Transcript context:** [Direct quote with speaker attribution]
- **Status:** New | [POSSIBLE] | [ADD TO EXISTING: <task>] | [ALREADY TRACKED]

---

### Weekly Call Notes (for Cyndi to add to Peterson's ClickUp notes page)
- [Topic] [HH:MM:SS]: [brief description]

### Messages (for Cyndi to send in Google Chat)
- **To:** [names]. [HH:MM:SS] **Message:** [content]

### Summary
- **Total items:** [N] | **Firm:** [N] | **Possible:** [N]
- **New tasks:** [N] | **Add to existing:** [N] | **Blocked:** [N]
- **Weekly call notes:** [N] | **Channel messages:** [N]
```

## DETERMINISTIC STEPS (resume after AI extraction)

### Step 5: Route the output

**Route by call type. Each type has different destinations.**

---

#### A. Discovery/Sales Calls

**Full extraction → ClickUp sales task comment**

Find the sales task:
```sql
SELECT clickup_task_id, task_name FROM clickup_entries
WHERE context_type = 'sales'
AND task_name ILIKE '%<FULL_PARTICIPANT_NAME>%'
LIMIT 1;
```
If no match by full name, try last name only. If still no match, search live via ClickUp MCP.

If found: post the FULL extraction as a comment on that task using `mcp__claude_ai_ClickUp__clickup_create_task_comment`.

If no sales task found: **email fallback.**

**Action items → `fathom_entries.action_items`** (overwrite the Fathom AI extraction with our better one):
```sql
UPDATE fathom_entries SET action_items = '<structured_extraction_json>'
WHERE id = '<ENTRY_ID>';
```

---

#### B. Client Calls

**Full extraction → client's ClickUp chat channel** (3-tier lookup)

Tier 1: `SELECT DISTINCT view_id FROM clickup_chat_entries WHERE client_id = '<CLIENT_ID>' LIMIT 1;`
Tier 2: `SELECT DISTINCT view_id FROM clickup_chat_entries WHERE space_name ILIKE '%<CLIENT_NAME>%' LIMIT 1;`
Tier 3: `mcp__claude_ai_ClickUp__clickup_get_chat_channels` -- search live for client name.

If found: send via `mcp__claude_ai_ClickUp__clickup_send_chat_message`.
If not found: **email fallback.**

**Action items → `fathom_entries.action_items`** (same UPDATE as sales calls)

**Weekly call notes → TWO destinations:**

1. `client_context_cache` (weekly_call_notes section) -- so pre-call-prep sees them:
   ```sql
   INSERT INTO client_context_cache (client_id, section, content, data_sources, source_record_count, date_range_start, date_range_end, last_updated, stale_after)
   VALUES ('<CLIENT_ID>', 'weekly_call_notes', '<notes_json>', ARRAY['fathom_entries'], 1, CURRENT_DATE, CURRENT_DATE, NOW(), NOW() + INTERVAL '14 days')
   ON CONFLICT (client_id, section) DO UPDATE SET
     content = EXCLUDED.content, last_updated = NOW(), stale_after = NOW() + INTERVAL '14 days';
   ```

2. Peterson's ClickUp weekly call notes doc for that client (see Step 5.5 below)

**[ADD TO EXISTING] → ClickUp task comment** on the existing task using `mcp__claude_ai_ClickUp__clickup_create_task_comment`.

**Channel messages → included in the full extraction.** Cyndi sends them in Google Chat after Peterson reviews.

---

#### C. Internal Calls

**Full extraction → daily digest only** (Step 6). Internal discussions are not broadcast.

**Action items → `fathom_entries.action_items`** (same UPDATE) + relevant team member's ClickUp channel.
Find the team member's channel: `mcp__claude_ai_ClickUp__clickup_get_chat_channels`, match by team member name (e.g., "Ahmed", "Lindsey", "Ade"). Send the action items relevant to that person via `mcp__claude_ai_ClickUp__clickup_send_chat_message`.
If team member's channel not found: **email fallback.**

**Weekly call notes → persistent.** Same ClickUp doc pattern as clients but under Creekside Internal > [Team Member] > [Name] Notes doc (see Step 5.5 below).

**Channel messages → included in the full extraction.** Not sent separately for internal calls.

---

### Email Fallback (universal)

Whenever ANY routing destination can't be found (sales task, client channel, team member channel, weekly notes doc), send the undelivered content to Peterson via email:
```bash
python3 ~/creekside-pipelines/pipelines/gmail/gmail_sender.py send \
  --to peterson@creeksidemarketingpros.com \
  --subject "[Post-Call Recap] <MEETING_TITLE> -- <DATE>" \
  --body "<content with [ROUTING GAP] prefix describing what couldn't be found>"
```
This ensures nothing is silently lost. Peterson always gets the output.

---

### Step 5.5: Write weekly call notes to ClickUp Docs

For any call that produced weekly call notes (client OR internal):

**1. Find the doc and parent page from the database:**

For client calls:
```sql
SELECT doc_id, page_id, page_name FROM clickup_doc_entries
WHERE page_name ILIKE '%<CLIENT_NAME>%' AND page_name ILIKE '%weekly%'
AND space_name = 'Client Management'
LIMIT 1;
```

For internal calls:
```sql
SELECT doc_id, page_id, page_name FROM clickup_doc_entries
WHERE (doc_name ILIKE '%<TEAM_MEMBER_NAME>%notes%'
       OR page_name ILIKE '%<TEAM_MEMBER_NAME>%weekly%kickoff%')
AND space_name = 'Creekside Internal'
LIMIT 1;
```

If no match: try looser search (first name only, or just "Weekly" in the client's folder_id). If still nothing: **Cyndi's channel fallback → email fallback.**

**2. List all pages in the doc to find date sub-pages:**

Use `mcp__claude_ai_ClickUp__clickup_list_document_pages` with the `doc_id`. This returns the full page tree including sub-pages.

**3. Find the most recent date sub-page:**

Look for sub-pages under the parent page found in step 1. Page names are dates in varying formats (e.g., "5/14/26", "4/27/26", "5/7/26"). Parse each name as a date. Sort descending. Take the most recent.

If no date sub-pages found or none can be parsed as dates: **Cyndi's channel fallback → email fallback.**

**4. Read the current content, append, write back:**

Use `mcp__claude_ai_ClickUp__clickup_get_document_pages` with the `doc_id` and `page_id` of the most recent date page. Read existing content.

Append the new weekly call notes as bullet points below the existing content.

Use `mcp__claude_ai_ClickUp__clickup_update_document_page` to write the combined content back. WARNING: this REPLACES the entire page, so the existing content MUST be included.

**5. Fallback chain:**

Doc/page not found in DB → loose search → Cyndi's ClickUp channel (with notes + `[WEEKLY NOTES GAP]` flag) → email to Peterson. Continue processing other calls regardless.

### Step 6: Write daily digest to agent_knowledge

After processing ALL pending calls in this run, write or update a digest:

```sql
-- Check if today's digest already exists
SELECT id FROM agent_knowledge
WHERE type = 'daily_brief'
AND title = 'Post-Call Action Items -- ' || TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD')
LIMIT 1;
```

If exists: UPDATE the content by APPENDING new call extractions.
If not: INSERT a new row:
```sql
INSERT INTO agent_knowledge (type, title, content, tags, source_context, confidence)
VALUES (
  'daily_brief',
  'Post-Call Action Items -- ' || TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD'),
  '<ALL_EXTRACTIONS>',
  ARRAY['post-call-recap', 'action-items', 'daily'],
  'post-call-recap-routine',
  'verified'
);
```

### Step 7: Mark each call as processed

After successful extraction and routing, mark EACH fathom_entry:
```sql
UPDATE fathom_entries SET recap_sent_at = NOW() WHERE id = '<ENTRY_ID>';
```

This prevents reprocessing on the next run. Do this per-call, not in batch -- if one call fails, the others still get marked.

### Step 8: Log the run

```sql
INSERT INTO ingestion_log (source, status, duration_ms, triggered_by, records_inserted, started_at, completed_at, user_id)
VALUES (
  'post_call_recap',
  '<completed|partial|failed>',
  <duration_ms>,
  'claude_code_local',
  <calls_processed>,
  '<start_time>',
  NOW(),
  'defe36a6-891c-4912-9bef-43556ac3ae6a'
);
```

## Error Handling

- If transcript pull fails for one call: skip it, do NOT mark recap_sent_at, log the error, continue to next call.
- If ClickUp routing fails: still write to agent_knowledge digest, still mark recap_sent_at. The extraction is the valuable part; routing is best-effort.
- If Supabase is unreachable: stop entirely, do not retry.

## Supabase

Project ID: `suhnpazajrmfcmbwckkx`
Use `execute_sql` for all database queries.

## Rules

- Google Chat, not Slack. Creekside uses Google Chat and ClickUp.
- Content dates, not created_at.
- Never extract from summary alone when transcript exists.
- Process one call at a time. If multiple are pending, process oldest first.
- Calls under 3 minutes are already filtered out in the Step 1 query.
