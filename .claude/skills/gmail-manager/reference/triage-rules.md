# Triage Rules

How to classify emails pulled from `gmail_ai_queue`.

## Queue Row Fields

- `snippet` — pre-fetched body text (up to 2000 chars). Use this for classification; do NOT call `gmail_read_message` unless snippet is empty.
- `escalation_reason` — why the Python classifier couldn't handle it. Use as context.
- `confidence` — how the sender was matched:
  - `high` — exact email match in entity_data
  - `medium` — domain match only
  - `low` — unknown sender

## Corrections Override Defaults

Apply every rule returned by `gmail_get_corrections()` before applying the defaults below.

## Named-Entity Rules

Require reading snippet content.

- **Sweet Hands** business emails → ALWAYS For Peterson
- **Kade** strategy/decision emails → For Peterson. If just scheduling → Done (ensure on calendar)
- **Tony / Aura Displays** → For Peterson. Flag as URGENT in log.
- **Ahmed** technical draft responses → For Peterson (he reviews before sending)
- **Lindsay**-related messages → For Peterson. Never clear without Peterson seeing.
- **Denise / FirstUp Marketing** website design inquiries → VA Handling (forward to Denise)
- **Ad Management Agreements from Kade** → VA Handling (Cyndi signs, Kade already verified pricing)
- **Google Performance Marketing Team** → For Peterson
- **ChatGPT product updates** (not invitations) → To Review
- **Fathom meeting recaps** → Info (real meeting content, worth keeping)
- **Gemini meeting notes** → Info (auto-generated Google Meet notes)

## Always Route to Peterson

- Bank/financial info requiring personal review (especially Square "balance too low" or "action needed" alerts)
- Invoice confusion or discrepancies (NOT routine successful payments)
- New client onboarding / contracts signed
- Direct job applications (NOT from Online Jobs platform)
- CC'd on strategy conversations with no clear VA action
- New partnership / business-opportunity emails
- Replies to Awaiting Responses threads needing Peterson's response
- Client cancellation or churn signals ("wrapping up", "moving in a different direction")

## General Routing (fallback when no named-entity rule matches)

1. Spam/noise missed by classifier → Done, remove from inbox
2. Personal finance (mortgage, tax, credit) → Info/Finance, remove from inbox
3. Newsletter → Info/Newsletter, remove from inbox
4. Client-related with clear VA action (<15 min) → VA Handling + client label, remove from inbox
5. Client technical question → For Peterson (Ahmed may draft, Peterson reviews)
6. Lead/prospect email → For Peterson (respond within 2 hours)
7. Platform invitation (FB Business, Google Tag Manager, GMB transfer, Drive access) → VA Handling, remove from inbox
8. Calendar cancellation from team member → Done (informational, no action needed)
9. Unsure → To Review + client label if identifiable. Remove from inbox.

## Confidence Thresholds

- `high` confidence on sender → trust entity_type as-is; apply entity-specific rules
- `medium` confidence (domain only) → use snippet content to confirm entity; downgrade to general routing if ambiguous
- `low` confidence (unknown) → use general routing rules only; flag for sender discovery note

## Snippets vs Full Read

Default: classify from `snippet`. Only call `gmail_read_message` when:
- snippet is empty or <50 chars
- classification confidence on first pass is < medium and content is load-bearing

Never read every message by default — burns the 40-turn budget.

## draft_queue Decision Criteria

INSERT into `draft_queue` when:
- `gps_label` is "For Peterson" or "To Review" AND
- The email requires a written reply (question, request, scheduling ask, commitment)

Do NOT queue when:
- Informational CC with no action needed
- Meeting recap / auto-generated notes
- Bank/Square alert with no response required (just Peterson's eyes)
- Newsletter or platform digest

Insert template:

```sql
INSERT INTO draft_queue (message_id, thread_id, sender_email, sender_name, subject,
                          entity_type, entity_name, gps_label)
VALUES ('msg_id', 'thread_id', 'sender@email.com', 'Sender Name',
        'Subject line', 'client', 'Entity Name', 'For Peterson');
```

## potential_auto_filter Flagging

After classifying to Done, Info, or VA Handling, flag candidates where the sender+type combination is ALWAYS low-value:

```sql
UPDATE gmail_ai_queue SET potential_auto_filter = true
WHERE id IN ('id_of_candidate_1', 'id_of_candidate_2');
```

Good candidates:
- Recurring notifications
- Newsletters Peterson hasn't opted out of
- Platform digests
- Automated reports

Do NOT flag:
- Client emails (even routine — content varies)
- Team member emails (context-dependent)
- Anything that required reading the body to classify

## Mark Queue Items Completed (Batch)

```sql
UPDATE gmail_ai_queue SET status = 'completed', processed_at = now()
WHERE id IN ('id1', 'id2', 'id3');
```
