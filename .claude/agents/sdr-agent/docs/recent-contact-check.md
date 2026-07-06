# Recent Contact Check

**Applies to:** `followup` and `nurture` response types only.

**Purpose:** Before generating any follow-up or nurture message, verify that Creekside has not already been in recent contact with this lead through another channel. If recent contact is found, stop and notify the operator so they can decide whether a new touch is actually warranted.

---

## When This Check Runs

Run this check immediately after loading the profile doc (Step 0) and BEFORE Step 1 (context retrieval). Do not generate any response until this check completes and is either clear or overridden by the operator.

---

## Recency Window

**14 days.** This aligns with the followup cadence maximum: touches at ~day 2, 4, 7, and 14. Any contact within this window means the lead is still inside the active outreach cycle from at least one channel, and an additional touch would likely feel duplicative or excessive.

---

## Step 1: Extract Lead Identifiers

From the pasted conversation, extract:
- **Lead first name and last name** (e.g., "Byren Foster")
- **Lead first name only** (for partial matching)
- **Company name** (if mentioned)
- **Any email address visible in the thread** (some leads share their email during conversation)

If no name is identifiable, skip this check and proceed with a note: "Lead name not identifiable -- skipping recent contact check."

---

## Step 2: Query All Communication Channels

Run these queries in parallel. Use the lead identifiers extracted in Step 1.

### Channel 1: Gmail (Peterson + Cade)

```sql
SELECT id, date, context_subtype, ai_summary, user_id, participants
FROM gmail_summaries
WHERE date >= CURRENT_DATE - INTERVAL '14 days'
  AND (
    ai_summary ILIKE '%{lead_first_name}%'
    OR ai_summary ILIKE '%{lead_last_name}%'
    OR ai_summary ILIKE '%{company_name}%'
    OR EXISTS (
      SELECT 1 FROM unnest(participants) AS p
      WHERE p ILIKE '%{lead_email}%'
    )
  )
  AND user_id IN (
    'defe36a6-891c-4912-9bef-43556ac3ae6a',
    '307b2652-effa-4ca0-82b6-8908ecd23a09'
  )
ORDER BY date DESC
LIMIT 10;
```

Note: Some older Peterson emails have `user_id = NULL` (pre-dating user tracking). If the lead email is known, also run:

```sql
SELECT id, date, context_subtype, ai_summary, participants
FROM gmail_summaries
WHERE date >= CURRENT_DATE - INTERVAL '14 days'
  AND user_id IS NULL
  AND (
    ai_summary ILIKE '%{lead_first_name}%'
    OR ai_summary ILIKE '%{lead_last_name}%'
  )
ORDER BY date DESC
LIMIT 5;
```

### Channel 2: Upwork Conversations (synced threads)

```sql
SELECT room_id, room_name, last_message_at, message_count
FROM upwork_conversations
WHERE last_message_at >= NOW() - INTERVAL '14 days'
  AND (
    room_name ILIKE '%{lead_first_name}%'
    OR room_name ILIKE '%{lead_last_name}%'
  )
ORDER BY last_message_at DESC
LIMIT 5;
```

This catches cases where a lead re-engaged independently in a synced thread, or where someone else already sent a touch in the same room.

### Channel 3: Fathom Calls

```sql
SELECT id, meeting_title, meeting_date, LEFT(summary, 200) AS summary_preview, participants
FROM fathom_entries
WHERE meeting_date >= NOW() - INTERVAL '14 days'
  AND (
    meeting_title ILIKE '%{lead_first_name}%'
    OR meeting_title ILIKE '%{lead_last_name}%'
    OR meeting_title ILIKE '%{company_name}%'
    OR (
      participants IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM unnest(participants) AS p
        WHERE p ILIKE '%{lead_first_name}%'
          OR p ILIKE '%{lead_last_name}%'
      )
    )
  )
ORDER BY meeting_date DESC
LIMIT 5;
```

### Channel 4: SDR Generation Log (recent drafts for this lead)

```sql
SELECT id, response_type, profile, conversation_summary, created_at
FROM sdr_generation_log
WHERE created_at >= NOW() - INTERVAL '14 days'
  AND (
    conversation_text ILIKE '%{lead_first_name}%'
    OR conversation_summary ILIKE '%{lead_first_name}%'
  )
ORDER BY created_at DESC
LIMIT 5;
```

This catches cases where a different profile (samuel or lindsey) already generated a response for this lead within the window.

---

## Step 3: Evaluate Results

### If NO results found across all channels:

Proceed normally. Do not mention this check in the output. Continue to Step 1 (context retrieval).

### If results ARE found:

**STOP. Do not generate a response.**

Present the findings using this format:

---

**Recent Contact Found -- Follow-up May Not Be Needed**

Before generating, I checked all communication channels for recent contact with {lead_name} in the last 14 days. Here is what I found:

| Channel | Date | Detail |
|---------|------|--------|
| {channel} | {date} | {one-line description from ai_summary, meeting title, or message snippet} |

A follow-up is not necessary at this moment. To proceed anyway, reply "generate anyway" and I will continue. There are valid reasons to send (different context, different angle, the other contact didn't land) -- I just want to make sure you have the full picture first.

---

### Judgment calls on ambiguous results:

- **Same Upwork thread, lead just replied:** This is a lead-response scenario, not a follow-up. Tell the operator to switch response type to `lead`.
- **Gmail result is clearly a newsletter, notification, automated email, or marketing message (not a personal exchange):** Ignore it -- not relevant contact. Indicators: mass marketing sender, `context_subtype` contains "Mail" with a publication name, no reply from Creekside visible in summary.
- **SDR log result is for the same thread but a different response type (e.g., `lead` vs. `followup`):** Flag it but note the distinction -- the previous generation may not have been sent as a follow-up.
- **Fathom result is a call with a current client who shares a first name with the lead:** Use company name or email to disambiguate before flagging.
- **Lead first name is very common (e.g., "David", "Sarah"):** Require at least a last name or company name match before treating it as a hit. A first-name-only match on a common name is not reliable.

---

## Step 4: Override Path

If the operator says "generate anyway" (or any affirmative equivalent), note in the output header:

> **Recent contact override:** Contact found within 14 days -- operator confirmed to proceed.

Then continue to Step 1 (context retrieval) as normal.
