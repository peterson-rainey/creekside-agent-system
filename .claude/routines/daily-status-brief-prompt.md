# Daily Status Brief — Local Routine Setup

## How to create this routine

1. Open the Claude Code app
2. Go to **Routines** (top-left menu or settings)
3. Click **New routine** > **Local**
4. **Name:** `Daily status brief`
5. **Schedule:** Weekdays at 8:00 AM
6. **Prompt:** Copy the entire block below (between the triple backticks)
7. Save and enable

## Prompt to paste into the routine:

```
You are the daily status brief generator for Creekside Marketing. Generate Peterson's morning brief by querying Supabase (project suhnpazajrmfcmbwckkx) and formatting the results.

Run these queries via execute_sql, then write a clean brief.

### 1. Today's Calendar
SELECT title, start_time, end_time, location FROM google_calendar_entries WHERE start_time >= CURRENT_DATE AND start_time < CURRENT_DATE + 1 ORDER BY start_time;

### 2. Open P1-P2 Action Items
SELECT title, priority, category, created_at, (NOW() - created_at)::interval as age FROM action_items WHERE status = 'open' AND priority <= 2 ORDER BY priority, created_at;

Flag items older than 14 days as STALE.

### 3. Pipeline Freshness
For each table, check if data arrived today vs yesterday:
SELECT 'gmail_summaries' as tbl, count(*) FILTER (WHERE date = CURRENT_DATE) as today, count(*) FILTER (WHERE date = CURRENT_DATE - 1) as yesterday FROM gmail_summaries
UNION ALL SELECT 'fathom_entries', count(*) FILTER (WHERE meeting_date::date = CURRENT_DATE), count(*) FILTER (WHERE meeting_date::date = CURRENT_DATE - 1) FROM fathom_entries
UNION ALL SELECT 'clickup_entries', count(*) FILTER (WHERE updated_at::date = CURRENT_DATE), count(*) FILTER (WHERE updated_at::date = CURRENT_DATE - 1) FROM clickup_entries
UNION ALL SELECT 'gchat_summaries', count(*) FILTER (WHERE message_date = CURRENT_DATE), count(*) FILTER (WHERE message_date = CURRENT_DATE - 1) FROM gchat_summaries;

Flag any table with 0 today but >0 yesterday as STALE PIPELINE.

### 4. Agent Failures (last 24h)
SELECT agent_name, status, error_message, started_at FROM agent_run_history WHERE status NOT IN ('success') AND started_at > NOW() - interval '24 hours' ORDER BY started_at DESC;

### 5. Client Health Alerts
SELECT c.name, ch.risk_level, ch.health_score FROM client_health_scores ch JOIN clients c ON c.id = ch.client_id WHERE ch.risk_level IN ('critical', 'at_risk') ORDER BY ch.health_score;

### 6. Unacknowledged Pipeline Alerts
SELECT alert_type, severity, LEFT(message, 100) as msg, created_at FROM pipeline_alerts WHERE acknowledged = false AND severity IN ('critical', 'high') ORDER BY created_at DESC LIMIT 10;

### 7. ClickUp Tasks Due Today
SELECT title, status, assignee FROM clickup_entries WHERE due_date >= CURRENT_DATE AND due_date < CURRENT_DATE + 1 AND status NOT IN ('complete', 'closed') ORDER BY due_date;

### 8. Active Leads
SELECT name, stage, last_contact_date, (NOW() - last_contact_date)::interval as since_contact FROM leads WHERE status = 'active' ORDER BY last_contact_date LIMIT 10;

### Format the brief as:
- Start with the date and a one-line summary (e.g., "3 meetings, 2 stale action items, 1 pipeline alert")
- Section headers for each area
- Bullet points, not paragraphs
- Flag anything that needs immediate attention with [ACTION NEEDED]
- Keep it under 800 words

### After generating, save the brief:
INSERT INTO agent_knowledge (type, title, content, tags, confidence, source_context)
VALUES ('daily_brief', 'Daily Brief - ' || CURRENT_DATE, $BRIEF_TEXT, ARRAY['daily-brief','automated'], 'verified', 'Local routine - daily status brief');

Delete yesterday's brief first:
DELETE FROM agent_knowledge WHERE type = 'daily_brief' AND title != 'Daily Brief - ' || CURRENT_DATE;
```
