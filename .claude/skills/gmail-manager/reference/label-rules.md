# Label Rules

Every email gets TWO labels. Batch writes. Use IDs not names.

## Double-Tag Rule (MANDATORY)

Every email gets:
1. **GPS folder label** — For Peterson / To Review / VA Handling / Done / Info
2. **Client/entity label** — if the entity was identified

If no client label exists for the entity, apply GPS label only. Never skip the GPS label.

## label_map Source of Truth

Use `gmail_get_label_map()` from Phase 1 context load. The map returns label IDs — always use the ID, never the human-readable name. Gmail's API requires IDs.

```sql
SELECT * FROM gmail_get_label_map();
```

De-duplicate: if a label is already on the message, do not add it again. Check the current labels from the queue row or the gmail_read response before constructing `add_labels`.

## Batch INSERT Template

For the entire classified batch, use ONE multi-row INSERT:

```sql
INSERT INTO gmail_label_actions (message_id, thread_id, add_labels, remove_labels, gps_label, reason)
VALUES
  ('msg_id_1', 'thread_id_1', ARRAY['label_id_gps', 'label_id_client'], ARRAY['INBOX'], 'Done',          'reason1'),
  ('msg_id_2', 'thread_id_2', ARRAY['label_id_gps'],                    ARRAY['INBOX'], 'For Peterson',  'reason2'),
  ('msg_id_3', 'thread_id_3', ARRAY['label_id_gps', 'label_id_client'], ARRAY['INBOX'], 'VA Handling',   'reason3');
```

## Hard Rules

- **NEVER** add `TRASH` or `SPAM` to `add_labels`. Python filter handles true spam upstream.
- **ALWAYS** include `'INBOX'` in `remove_labels`. Every email gets removed from inbox after labeling. No exceptions.
- Use label IDs from `gmail_get_label_map()`, not human-readable names.
- `reason` should be short and auditable — why this GPS choice (e.g., "Kade strategy email → Peterson judgment").
- `gps_label` is the human-readable GPS folder name (For Peterson / To Review / VA Handling / Done / Info) for reporting; the actual label ID goes in `add_labels`.

## Naming Conventions (for new labels, reference only)

- Client labels: exact client name as stored in `clients.name`
- GPS labels: proper-case ("For Peterson", not "for-peterson")
- Sub-labels: parent/child ("Info/Newsletter", "Info/Finance")

Peterson creates new labels manually. Agents never invent new label names — if a needed label doesn't exist, apply only the GPS label and flag in the run log.

## De-duplication

Before constructing `add_labels` for a message, compare against existing labels on the message (from queue row or read response). Do not re-add a label that is already applied. This prevents the label-action worker from churning on no-op updates.
