---
name: querying-the-database
description: "Database querying patterns for the Creekside brain. Search functions, client lookups, common query routing, agent_knowledge types, and on-demand reference queries. Load this skill when you need to query the RAG database."
---

# Querying the Database

## Search

Three modes. Hybrid is preferred when you have both the embedding and the text query.

- **Hybrid (best quality):** `hybrid_search_all(embedding, text, count)` or `logged_hybrid_search(embedding, text, count, filter_source, filter_client_id, source_agent)` -- Reciprocal Rank Fusion of semantic + keyword. Records found by both methods get boosted.
- **Semantic:** `search_all(query, count)` or `logged_search_all(query, count, NULL, NULL, 'agent_name')`
- **Keyword:** `keyword_search_all(term, count)` or `logged_keyword_search(term, count, NULL, NULL, 'agent_name')`
- **ClickUp (with task families):** `search_all_expanded(query, count)`

Never rely on a single search method. Semantic finds conceptual matches; keyword finds exact names and IDs.

## Summaries vs Raw Text

Summaries are for FINDING records. Raw text is for ANSWERING questions.
- Single record: `get_full_content(table, id)`
- Batch: `get_full_content_batch(table, ids[])`
- **Never answer dollar amounts, dates, commitments, or action items from summaries alone.** Always pull raw text first.

**Two-step rule (mandatory, no exceptions):**
1. Use search + summaries to identify the relevant 1-3 records
2. Call `get_full_content()` before answering any content question

**Tables that require `get_full_content()` before answering** (main row has summary only):
- `fathom_entries` -> full transcript in `raw_content` (source_table='fathom_entries')
- `loom_entries` -> full transcript in `raw_content` (source_table='loom_entries')
- `gdrive_operations`, `gdrive_legal`, `gdrive_marketing` -> full doc text in `raw_content`

**Tables with full content already in the main row** (no extra step needed):
- `gchat_messages`, `clickup_chat_messages`, `clickup_task_comments`, `gmail_threads`, `linkedin_post_examples`, `youtube_entries`

For large transcripts exceeding SQL return limits: save to a tool-results file and extract with Python regex + unescape passes.

## Client Queries -- Cache First

1. `client_context_cache` -- check first (fast, pre-built sections)
2. `get_client_360(client_id)` -- full cross-platform view (rebuild if cache is stale >7 days)
3. `get_client_timeline(client_id, max)` -- chronological activity feed
4. Name resolution: `find_client(name)` or `match_incoming_client(name, source)`

## Common Query Routing

| User asks about... | Query |
|---|---|
| What to work on next | `get_whats_next(14, 30)` -- live ClickUp + Fathom + Gmail, ranked churn > revenue > internal. NEVER `get_pending_action_items` (stale, unmaintained) |
| Recent sessions / prior work | `chat_sessions ORDER BY session_date DESC LIMIT 5` |
| What changed recently | `get_recent_changes(7)` |
| Outstanding admin questions | `admin_questions WHERE status = 'open'` |
| Pipeline or agent failures | `pipeline_alerts WHERE severity IN ('high','critical') AND acknowledged = false` |
| Failed agent runs | `agent_run_history WHERE status IN ('failure','timeout') AND started_at > NOW() - interval '24h'` |
| System health (all-in-one) | `system_health_dashboard()` |
| SOPs and procedures | `agent_knowledge WHERE type = 'sop' AND title ILIKE '%keyword%'` |
| Everything on a topic / "how do I do X" | `get_topic_360('topic', client_id)` -- resolves 38 canonical topics + aliases across 19 tables. Training videos: agent_knowledge entries titled `Loom How-To Index -- <category>`. Topic list: `SELECT name, category, aliases FROM topic_taxonomy` |
| Schema, columns, relationships | `SELECT content FROM agent_knowledge WHERE id = '104ec927-073d-4a8e-aaaa-6fa66c6abd66';` |

## agent_knowledge Types

Filter by type for targeted results:

`configuration` | `sop` | `pattern` | `correction` | `skill` | `decision` | `troubleshooting` | `reference` | `quality_audit` | `api_reference` | `feedback` | `strategy_update` | `strategy_update_pending` | `strategy_update_proposal` | `daily_brief` | `daily_brief_snapshot`

## On-Demand Reference

Everything else lives in the database. Query when needed:

```sql
-- Scheduled agents and their schedules
SELECT name, cron_expression, description, enabled FROM scheduled_agents ORDER BY name;

-- Architectural principles and system reference
SELECT title, content FROM agent_knowledge WHERE type = 'configuration' AND tags @> ARRAY['config','admin'];

-- Pipeline status
SELECT * FROM get_all_pipeline_status();

-- Full infrastructure startup guide
SELECT content FROM agent_knowledge WHERE id = '83308752-50a8-42cd-bb15-54bfa04e7764';
```
