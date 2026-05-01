# ClickUp Task Creation Patterns

## Creating ClickUp Tasks from Meeting Action Items

**Core pattern:**
For each action item in `fathom_entries.action_items` JSON array, create a ClickUp task via Zapier MCP.

**Task mapping:**
- **Task name:** Use the action item 'text' field exactly as extracted
- **Description:** Include meeting context: "From [meeting_title] on [meeting_date]. [relevant transcript excerpt if available]"
- **Assignee:** Look for 'owner' field in action item JSON, or infer from participants array. Default to Peterson if unclear.
- **Due date:** Use 'due_date' from action item JSON if present. If mentioned in transcript but not parsed, extract from context. Otherwise leave null.
- **List/Folder:** Query `clients.clickup_folder_id` if client_id is known. Fall back to default list if no client match.
- **Priority:** Infer from transcript urgency language. Default to normal.
- **Tags:** Include 'meeting-followup', meeting type ('client', 'discovery', 'internal'), and client name if known

**Subtask pattern:**
If an action item implies multiple steps, create subtasks using `clickup_create_subtask` for the parent task.

**Deduplication:**
Before creating, check `action_items` table for existing tasks from the same meeting (match on `source` containing the fathom_entries.id). Do NOT create duplicates.

**Database tracking:**
After creating ClickUp task, INSERT into `action_items` table:
```sql
INSERT INTO action_items (
  title, description, category, priority, status, 
  source, source_agent, context, created_session_id
) VALUES (
  task_name, task_description, 'client', 'normal', 'pending',
  'fathom_entries:' || fathom_id, 'meeting-followup-agent',
  jsonb_build_object('meeting_title', title, 'meeting_date', date),
  current_session_id
);
```

---

# client_context_cache Update Pattern

## Updating Client Context Cache After Meetings

**When:** After processing any client or discovery meeting from fathom_entries

**What to update:** `client_context_cache` table, section 'last_meeting_summary'

**UPSERT pattern:**
```sql
INSERT INTO client_context_cache (
  client_id, section, content, data_sources, 
  source_record_count, date_range_start, date_range_end, 
  last_updated, stale_after
) VALUES (
  client_uuid,
  'last_meeting_summary',
  jsonb_build_object(
    'meeting_title', meeting_title,
    'meeting_date', meeting_date,
    'participants', participants_array,
    'key_topics', key_topics_array,
    'action_items_summary', action_items_brief_text,
    'next_steps', next_steps_text,
    'sentiment', sentiment,
    'fathom_url', recording_url
  ),
  ARRAY['fathom_entries'],
  1,
  meeting_date,
  meeting_date,
  NOW(),
  NOW() + INTERVAL '7 days'
)
ON CONFLICT (client_id, section) 
DO UPDATE SET
  content = EXCLUDED.content,
  data_sources = EXCLUDED.data_sources,
  source_record_count = EXCLUDED.source_record_count,
  date_range_start = EXCLUDED.date_range_start,
  date_range_end = EXCLUDED.date_range_end,
  last_updated = EXCLUDED.last_updated,
  stale_after = EXCLUDED.stale_after;
```

**Why 7 days stale_after:** Client meetings typically happen weekly or bi-weekly. After 7 days, cached summary is considered outdated and should be refreshed.

**Content structure:** Store as JSONB with keys: meeting_title, meeting_date, participants, key_topics, action_items_summary (brief text, not full array), next_steps, sentiment, fathom_url.

**Use case:** Other agents querying client context will see the most recent meeting summary without having to scan full fathom_entries + transcripts.

---

# Fathom Data Model

## Fathom Entries Schema

**Table:** `fathom_entries`

**Key columns:**
- `id` (uuid, primary key)
- `meeting_title` (text) - may contain client names or project references
- `meeting_date` (date) - **CRITICAL: Use this for date ordering, NOT created_at**
- `duration_minutes` (integer)
- `participants` (text[]) - array of participant names
- `summary` (text) - AI-generated summary
- **Full transcript**: stored in `raw_content` table (source_table='fathom_entries', source_id=id). Use `get_full_content('fathom_entries', id)` to retrieve.
- `action_items` (jsonb) - **Already parsed JSON array** of action items extracted from transcript
- `key_topics` (text[])
- `sentiment` (text)
- `fathom_recording_url` (text)
- `meeting_type` (text) - values: 'internal', 'discovery', 'client'
- `client_id` (uuid, foreign key to clients table)

**Action items format:**
```json
[
  {"text": "Follow up on pricing proposal", "owner": "Peterson", "due_date": null},
  {"text": "Send contract for review", "owner": "Peterson", "due_date": "2026-04-01"}
]
```

**How to find meetings:**
1. By client name: Use `match_incoming_client(meeting_title, 'fathom')` to resolve client_id
2. By date range: `WHERE meeting_date BETWEEN start_date AND end_date`
3. By type: `WHERE meeting_type = 'client' OR meeting_type = 'discovery'`
4. Always ORDER BY meeting_date DESC (most recent first)

**Data source note:** Fathom Railway pipeline is a placeholder — actual data came from one-time manual load. Work with what exists in the database.

---

# Follow-Up Email Style Rules

## Peterson's Post-Meeting Email Style

**Formality level:** Professional-Warm (3.5/5)
**Target length:** 50-150 words (75% of Peterson's emails are ≤50 words)

### Structure

**Greeting:**
- Existing contacts: "Hey [First Name],"
- New/cold contacts: "Hi [First Name],"

**Body (3 parts):**
1. **Brief recap** (1 sentence): "Great chatting about [main topic]."
2. **Action items** (bulleted, max 3-4):
   - Use Peterson's characteristic phrases: "let me know", "happy to", "feel free"
   - Be specific with deadlines if discussed
3. **Next step** (1 sentence): "Let's reconnect [timeframe]" OR "Feel free to reach out with questions."

**Sign-off:**
- **Default (96% of emails):** No formal sign-off, just the draft ends
- **Formal call recap only:** Use "— Peterson\nCreekside Marketing Pros"

### Banned phrases
NEVER use:
- "Per our conversation"
- "Best regards" / "Sincerely"
- "I hope this email finds you well"
- "Moving forward"
- "Circling back"
- "Touching base"

### Required elements
- **Calendly link** if scheduling mentioned: https://calendar.app.google/4ierPN3nNxLMMTAz7
- **Peterson's email** in draft metadata: peterson@creeksidemarketingpros.com
- **Thread reply:** Always create draft as reply to original meeting invite thread if available

### Example (client follow-up):
```
Hey Sarah,

Great talking through your Q2 ad strategy today. Here's what we covered:

• I'll send over the Meta audit by Friday
• You'll get approval on the $8K budget increase
• We'll start the new creative test on April 1st

Let me know if you have questions before Friday. Happy to jump on a quick call if needed.
```

**Why this style:** Derived from 7,000+ Peterson Gmail messages. Mirrors his actual voice: direct, helpful, low-friction.

---

