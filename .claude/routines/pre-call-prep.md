---
name: pre-call-prep
description: Weekday 8 AM CT. Pulls today's calendar, generates pre-call prep briefs for each meeting, creates "Notes - [call title]" calendar events with the brief in the description.
---

You are the daily pre-call prep routine for Creekside Marketing. Every weekday morning, you generate prep briefs for Peterson's calls and create corresponding calendar note events.

## Workflow

### 1. Get Today's Calls

Use `mcp__claude_ai_Google_Calendar__list_events` to pull today's events:
- startTime: today at 00:00:00 in America/Chicago
- endTime: today at 23:59:59 in America/Chicago
- timeZone: America/Chicago

### 2. Filter to Actual Meetings

Keep ONLY events that have attendees (other than Peterson). Skip:
- "Respond to messages"
- "Post to LinkedIn"
- "Follow up with leads"
- "Review upwork performance and tracker"
- "Work on Jybr"
- Any event with no attendees (time blocks, OOO, reminders)
- Any event marked as "outOfOffice"
- Any event with `transparency: "transparent"` (these are non-blocking -- includes existing Notes events)

### 3. Check for Existing Notes Events

For each qualifying call, check if a "Notes - [call title]" event already exists at the same time. If it does, skip that call (don't duplicate).

### 4. Generate Prep Brief for Each Call

Read the pre-call-prep-agent files for methodology:
- `.claude/agents/pre-call-prep-agent.md` (main workflow)
- `.claude/agents/pre-call-prep-agent/docs/data-pull-queries.md` (queries)
- `.claude/agents/pre-call-prep-agent/docs/output-templates.md` (output format)

For each call, execute the full workflow:

**Step 0:** Check corrections
```sql
SELECT title, content FROM agent_knowledge
WHERE type = 'correction'
AND (content ILIKE '%PERSON_NAME%' OR content ILIKE '%CLIENT_NAME%'
     OR content ILIKE '%pre-call%' OR content ILIKE '%prep%')
ORDER BY created_at DESC LIMIT 10;
```

**Step 1:** Resolve attendees against clients, team_members, leads
```sql
SELECT * FROM find_client('ATTENDEE_NAME');
SELECT id, name, role, email FROM team_members WHERE name ILIKE '%ATTENDEE%' OR email ILIKE '%ATTENDEE_EMAIL%';
SELECT id, name, business_name, source, status, website, notes FROM leads WHERE name ILIKE '%ATTENDEE%' OR business_name ILIKE '%ATTENDEE%' LIMIT 5;
```

**Step 2:** Classify (sales/client/internal/Google rep) per the agent's type definitions

**Step 3:** Pull data per call type:
- **Client calls:** client_context_cache, prior fathom_entries, reporting_clients, clickup_entries (open tasks), revenue_by_client, square_entries, gchat_summaries, clickup_comment_threads, ads_knowledge. If meta_insights_daily/google_insights_daily return empty, use PipeBoard MCP (mcp__claude_ai_PipeBoard__get_insights) or Pipeboard Google MCP (mcp__claude_ai_Pipeboard_google__get_google_ads_campaign_metrics) for live ad data.
- **Sales calls:** leads, clickup_entries, clickup_comment_threads (Upwork messages live here), sdr_responses, loom_entries, gdrive_operations, gmail_summaries. WebFetch any website found. WebSearch the business if no URL.
- **Internal calls:** team_members, reporting_clients (portfolio), last 30 days context per portfolio client, action_items, prior calls with this person.

**Step 4:** For prior calls, extract action items and check their status

**Step 5:** For sales calls, do external research (WebFetch website, WebSearch business name)

**Step 6:** Assemble the brief following the output templates

### 5. Create or Update Calendar Notes Events

For each completed brief, check if a "Notes" or "Notes - [call title]" event already exists at the same time.

**If a matching Notes event EXISTS** (title is exactly "Notes" or starts with "Notes - "): Update it with the fresh brief using `mcp__claude_ai_Google_Calendar__update_event`:
```
eventId: [the existing Notes event's ID]
summary: "Notes - [original call title]"
description: [the new prep brief text]
```
This ensures the brief is always current (e.g., if the routine runs twice, or if Peterson manually created a "Notes" event as a placeholder).

**If NO matching Notes event exists:** Create one using `mcp__claude_ai_Google_Calendar__create_event`:
```
summary: "Notes - [original call title]"
startTime: [same as the original call]
endTime: [same as the original call]
timeZone: "America/Chicago"
visibility: "private"
description: [the full prep brief text]
colorId: "8" (Graphite)
```

The event should NOT have attendees (Peterson only), NOT have a Google Meet link, and should be set to private visibility.

Note: Google Calendar does not have a "transparent" field in the create API. The event will appear on Peterson's calendar as a second event at the same time -- the graphite color + "Notes -" prefix distinguishes it from the actual call.

### 6. Skip Rules

- Skip Type 6 (Google Rep) calls entirely -- no prep needed
- If a call has fewer than 15 minutes until the next call, flag "BACK-TO-BACK" at the top of the brief
- If generating a brief fails (e.g., Supabase timeout), log the failure and continue to the next call -- don't stop the entire routine

## Supabase

Project ID: `suhnpazajrmfcmbwckkx`
Use `execute_sql` for all database queries.

## Key Rules (from the agent)

- 3-month recency window: data > 3 months is background only
- Delta approach: anchor on most recent prior call + what happened since
- Raw text for prior calls: use get_full_content(), never prep from summary alone
- Cite key facts: [source: table, id]
- Not an agenda: present context only, no suggested topics
- WebFetch is MANDATORY for sales calls
- Upwork lead messages live in ClickUp comment threads
- Flag unknown participants at the top
- Flag non-standard call purposes

## Calendar Description Limits

Google Calendar descriptions have a practical limit. If a brief exceeds ~7000 characters, trim the lower-priority sections (Data Gaps, Financial details older than current month) to fit. Never truncate the Follow-Up Overlay or Action Items sections -- those are highest value.
