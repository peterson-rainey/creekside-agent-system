# Edge Cases

Special scenarios, error handling, and amnesia prevention.

## Stale Awaiting-Reply Threads

After the main draft pass in Phase 3, check for stale awaiting responses:

```sql
SELECT sender_email, sender_name, subject, thread_id, created_at
FROM draft_queue
WHERE gps_label = 'Awaiting Reply' AND status = 'pending'
  AND created_at < now() - INTERVAL '3 days';
```

For each stale thread, compose a gentle follow-up. Use the "just checking in" pattern:
- "Hey [Name], just wanted to follow up on this — let me know if you have any questions."
- Keep under 30 words. No pressure. Never "per my last email."
- Run through `communication-style-agent` like any other draft.

Only run this check if Phase 3 already had queued drafts (otherwise skip — STOP rule on empty queue still applies).

## URGENT Email Handling

Tony / Aura Displays → flag as URGENT in the run log. Route to For Peterson. Do not queue a draft unless the email explicitly asks a question — Peterson wants to see urgent messages raw first.

## Special Senders

See `reference/triage-rules.md` Named-Entity Rules for the full list. Key ones that need careful handling:
- **Sweet Hands business** — always Peterson, never VA
- **Lindsay** — never clear without Peterson seeing
- **Kade** — route scheduling vs strategy differently (Done vs For Peterson)
- **Ahmed** — technical drafts come to Peterson for review before reply

## 40-Turn Batching Budget

Max 40 turns per run. Target 4-6 turns:
1. Check queue(s)
2. Load context (parallel SQL)
3. Classify + batch-write labels
4. Write drafts + mark completed
5. Log run

If the batch is large and budget is running low:
- Write a partial log noting progress so far
- Mark processed queue items completed
- Leave unprocessed items as 'pending' (next run picks them up)
- Exit cleanly — do NOT try to finish everything in one run at the cost of error

## Noise Flagging Beyond AI Queue

This skill only processes `gmail_ai_queue`. It does NOT search the inbox directly. If you notice senders in the batch that should be auto-filtered upstream, flag via `potential_auto_filter` per `reference/triage-rules.md` — the Python filter maintainer uses those flags to tune entity_data.

## Amnesia Prevention — Sender Discovery

For unknown senders (confidence = low) that you classified, write a discovery note:

```sql
INSERT INTO agent_knowledge (type, title, content, tags, confidence)
VALUES ('note',
  'New sender discovered: [sender_email]',
  'Sender: [sender_name] <[sender_email]>. Subject: [subject]. Classified as: [gps_label]. Entity type: [entity_type]. Potential lead: [yes/no].',
  ARRAY['gmail-manager', 'sender-discovery', 'amnesia-prevention'],
  'verified')
ON CONFLICT DO NOTHING;
```

## Amnesia Prevention — Entity Mapping

If you match a sender to an entity by reading content (not via `gmail_preprocess_entities`), write a configuration entry so entity_data.py can be updated:

```sql
INSERT INTO agent_knowledge (type, title, content, tags, confidence)
VALUES ('configuration',
  'Email mapping: [sender_email] → [entity_name]',
  'Discovered [sender_email] is associated with [entity_name]. Should be added to entity_data.py.',
  ARRAY['gmail-manager', 'entity-match', 'amnesia-prevention'],
  'verified');
```

Before inserting into `agent_knowledge`, run `SELECT validate_new_knowledge('configuration', 'Email mapping: ...', ARRAY['gmail-manager', 'entity-match', 'amnesia-prevention'])` — if BLOCKED, UPDATE instead.

## Single-Email Error Handling

If one email errors during classification or draft composition:
- Log the error to the run log with message_id and sender
- Mark that queue row `status = 'error'` with `notes` explaining
- **Continue with the rest of the batch.** Never let one bad email abort the run.

## Empty-Queue Stop Behavior

The STOP rules are absolute:
- `gmail_ai_queue` empty → "No emails needing AI review." and STOP. Do not load context, do not check draft_queue.
- `draft_queue` empty (when Phase 3 runs standalone) → "No drafts queued." and STOP. Do not check awaiting responses, do not log.

These prevent wasted tool calls and protect the 40-turn budget.

## Corrections Override

`gmail_get_corrections()` rules override every default in `triage-rules.md` and `folder-map.md`. Always load and apply corrections FIRST. If a correction conflicts with a named-entity rule below, the correction wins.

If you discover Peterson has been manually re-routing a certain sender (visible via audit of recent gmail_label_actions vs our classifications), flag in the run log — he may want a correction added.

## Logging — Run Note (always)

```sql
INSERT INTO agent_knowledge (type, title, content, tags, confidence)
VALUES ('note',
  'Gmail Manager Run — ' || NOW()::TEXT,
  'Phase 1: [N] triaged. Phase 2: [N] labels written. Phase 3: [N] drafts created, [N] skipped. RAG sources used: [list]. URGENT flags: [list]. Stale follow-ups: [N].',
  ARRAY['gmail-manager', 'run-log'],
  'verified');
```
