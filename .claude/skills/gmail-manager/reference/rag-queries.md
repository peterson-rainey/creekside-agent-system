# RAG Queries

SQL patterns for pulling context before drafting. Summaries find, raw text answers.

## Keyword + Semantic Search (always both)

Unified search — use the specific-entity form for draft context:

```sql
SELECT src, rid, ttl, snippet, cname FROM keyword_search_all(
  '[sender_name] [entity_name]', 5, NULL, NULL, false
);
```

Run both `search_all` AND `keyword_search_all` in parallel when doing broader discovery. For ClickUp queries, use `search_all_expanded` instead (auto-pulls task families).

## Get Full Content for Top Hits

Summaries find, raw text answers. For the top 2 results from keyword_search_all:

```sql
SELECT full_text FROM get_full_content('[source_table]', '[source_id]');
```

Or batch:

```sql
SELECT * FROM get_full_content_batch('[source_table]',
  ARRAY['id1', 'id2']::uuid[]);
```

**Mandatory** before quoting any dollar amount, date, commitment, or action item.

## 48-Hour Calendar Check

Is this sender on Peterson's calendar soon?

```sql
SELECT title, start_time, end_time, attendees
FROM google_calendar_entries
WHERE start_time BETWEEN now() AND now() + INTERVAL '48 hours'
  AND (attendees ILIKE '%[sender_email]%' OR title ILIKE '%[entity_name]%')
ORDER BY start_time ASC LIMIT 3;
```

If a meeting is found, weave into the draft naturally: "Looking forward to chatting [tomorrow/Thursday]" or reference the topic. Flag pre-meeting emails in the run log.

## Client Context Cache (check first for client questions)

```sql
SELECT summary, last_interaction, key_contacts, active_projects
FROM client_context_cache
WHERE client_name ILIKE '%[entity_name]%'
ORDER BY last_updated DESC LIMIT 1;
```

Only fall back to full search if cache is stale (>7 days) or missing.

## Prior Emails from Same Sender

```sql
SELECT message_id, subject, sent_at, snippet
FROM gmail_summaries
WHERE sender_email = '[sender_email]'
ORDER BY sent_at DESC LIMIT 5;
```

Gives thread history context — prior commitments, open loops, tone calibration.

## ClickUp Task Expansion

For open tasks with this client / entity:

```sql
SELECT * FROM search_all_expanded('[entity_name]', 5);
```

`search_all_expanded` auto-pulls task families (parent + subtasks + comments) so you don't need separate queries.

## Freshness Rules

- Anything >90 days old → flag with its age in the run log and tag `[MEDIUM]` or `[LOW]` confidence
- Client context cache >7 days → refresh via full search before relying on it
- Gmail thread >30 days idle → factor into tone (re-introduction may be needed)

## Citation Format

Every factual claim in internal output carries:

```
[source: table_name, record_id]
```

Inferences: `[INFERRED]`. Confidence: `[HIGH]` direct record, `[MEDIUM]` derived/aggregated, `[LOW]` inferred or >90 days.

Never silently pick between conflicting sources — present both with citations.

**Citations are for internal output only. Never include `[source: …]` inside a customer-facing draft.**

## MCP Fallback (Empty Database Results)

If BOTH `search_all` and `keyword_search_all` return zero rows for a needed context pull, search MCP in order before giving up:
1. Google Drive (`google_drive_search`)
2. Gmail (`gmail_search_messages`)
3. ClickUp (`clickup_search` / `clickup_filter_tasks`)
4. Slack (`slack_search_public`)
5. Google Calendar (`gcal_list_events`)

Skip sources clearly irrelevant. Tag MCP-sourced facts `[SOURCE: MCP/<service>]` with `[MEDIUM]` confidence.
