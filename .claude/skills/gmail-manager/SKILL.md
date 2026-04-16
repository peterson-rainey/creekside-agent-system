---
name: gmail-manager
description: "Unified Gmail inbox management. Triages incoming emails from gmail_ai_queue, routes to GPS folders (For Peterson, To Review, VA Handling, Done, Info), applies double-tag labels, and drafts context-aware replies in Peterson's voice. Use when triaging the inbox, organizing emails, processing the AI queue, or creating draft responses. Replaces gmail-inbox-agent and gmail-intelligence-agent."
---

# Gmail Manager

Unified inbox management for Creekside Marketing. Runs three phases: triage, organize, draft. Never sends — always drafts. Stops immediately on empty queues.

## Phase 1: TRIAGE (gmail_ai_queue)

Pull pending queue rows:

```sql
SELECT id, message_id, thread_id, sender_email, sender_name, subject, snippet,
       entity_type, entity_name, client_id, escalation_reason, confidence
FROM gmail_ai_queue WHERE status = 'pending' ORDER BY created_at ASC LIMIT 30;
```

**STOP rule:** If 0 results, say "No emails needing AI review." and STOP IMMEDIATELY. Do not run any other queries.

Load context ONCE for the entire batch (3 parallel SQL calls):

```sql
SELECT * FROM gmail_preprocess_entities();
SELECT * FROM gmail_get_label_map();
SELECT * FROM gmail_get_corrections();
```

Corrections override all defaults. See `reference/triage-rules.md` for full classification logic, entity rules, and confidence thresholds. See `reference/folder-map.md` for GPS folder routing criteria.

Use the pre-fetched `snippet` field (up to 2000 chars) to classify. Do NOT call `gmail_read_message` unless the snippet is empty. Classify ALL emails mentally first, then write labels in ONE batched SQL call.

For emails labeled "For Peterson" or "To Review" that need a response, INSERT into `draft_queue` (see `reference/triage-rules.md` for the draft-queue decision criteria).

## Phase 2: ORGANIZE (gmail_label_actions)

Batch INSERT all label actions. See `reference/label-rules.md` for:
- Double-tag rule (GPS folder label + client/entity label)
- Multi-row INSERT template
- Hard rules (never TRASH/SPAM; always remove INBOX)
- Label-map source of truth (use IDs, not names)

After writing labels, mark queue items completed:

```sql
UPDATE gmail_ai_queue SET status = 'completed', processed_at = now()
WHERE id IN ('id1', 'id2', ...);
```

Flag auto-filter candidates per `reference/triage-rules.md` (potential_auto_filter column).

If you queued any drafts, trigger draft phase inline (do not wait for the separate scheduled run):

```sql
UPDATE scheduled_agents SET trigger_now = true WHERE name = 'gmail-intelligence';
```

## Phase 3: DRAFT (draft_queue)

Pull pending drafts:

```sql
SELECT * FROM draft_queue WHERE status = 'pending' ORDER BY created_at ASC LIMIT 10;
```

**STOP rule:** If 0 results, say "No drafts queued." and STOP IMMEDIATELY. Do not check awaiting responses, do not log.

For each queued email:

1. Read the thread via `gmail_read_thread` using the `thread_id`.
2. Pull RAG context — see `reference/rag-queries.md` for the exact SQL for `keyword_search_all`, `get_full_content`, the 48h calendar lookup, `client_context_cache`, prior-email search, and `search_all_expanded` for ClickUp.
3. Compose initial draft following `reference/draft-rules.md` (Peterson's voice, audience tone matrix, thread-position word counts, composition checklist).
4. **MANDATORY:** Spawn `communication-style-agent` to review and rewrite the draft. Pass it: the draft text, the audience type (client/team/lead/vendor/unknown), thread position (first/second/third+), and `platform: "gmail"`. Use the rewritten version. Do NOT skip this step.
5. Call `gmail_create_draft` with `to`, `subject` ("Re: " + original), `body_text` (the reviewed reply), and `thread_id` from the queue.
6. Mark processed: `UPDATE draft_queue SET status = 'processed', processed_at = now() WHERE id = '[queue_id]';`

When NOT to draft: purely informational CCs, meeting recaps, decisions Peterson hasn't made (mark 'skipped'). See `reference/draft-rules.md`.

Stale-thread follow-up logic (Awaiting Reply > 3 days), URGENT handling, and special-sender rules live in `reference/edge-cases.md`.

## Self-QC (MANDATORY before final output)

1. Corrections applied (gmail_get_corrections checked)
2. Entity coverage: every email has an entity_type (even 'unknown')
3. Double-tag rule: every label action has GPS label + client label (when matched)
4. URGENT routing: Tony/Aura Displays flagged as URGENT
5. Peterson list discipline: only judgment-required emails routed to For Peterson
6. Drafts reviewed by communication-style-agent (non-negotiable)
7. No internal leakage: no drafts contain agent system details or internal discussion
8. Citation audit: every dollar/date/factual claim has `[source: table, id]`
9. Freshness: flag data >90 days with age
10. Confidence tag on output: `[HIGH]` / `[MEDIUM]` / `[LOW]`

If any check fails, fix it before outputting. If you cannot fix it, flag it prominently at the top of your output.

## Logging + Amnesia Prevention

Log run into `agent_knowledge` (type 'note', tags `['gmail-manager', 'run-log']`). For unknown senders and newly-discovered entity→email mappings, write discovery notes per `reference/edge-cases.md` so context does not die with the session.

## Citations Format

Every factual claim pulled from the database must carry `[source: table_name, record_id]`. Inferences tagged `[INFERRED]`. Confidence: `[HIGH]` direct record, `[MEDIUM]` derived, `[LOW]` inferred or stale.

## Session Closure

Before ending any session with meaningful work, INSERT into `chat_sessions` (title, summary, key_decisions, items_completed, items_pending, files_modified, next_steps, tags) and INSERT into `raw_content` (source_table='chat_sessions', source_id=new_id) for embedding.

## Budget

Max 40 turns. Target: 4-6 turns per batch (1. check queue, 2. load context, 3. classify + write labels, 4. write drafts + mark complete, 5. log). If budget runs out mid-batch, log progress and stop cleanly per `reference/edge-cases.md`.
