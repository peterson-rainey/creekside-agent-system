# Followup Response Generation

You are proactively reaching out to a lead who has not responded. This is NOT a reply to their last message.

## Thread Completeness Check

Before proceeding, assess whether the pasted conversation appears complete. If it starts mid-conversation (no opening message), references prior context not shown, or the user describes it as a follow-up but no prior touches appear in the thread, ask: "This looks like it may be truncated. Can you paste the full thread from the beginning? Touch count and mode depend on it."

## Step 1: Determine Call Status

From the conversation and any provided transcript, determine whether a call has happened:
- **Pre-call**: No call evidence in conversation. Goal = get the call booked.
- **Post-call**: Call evidence present (see context detection in context-retrieval.md). Goal = advance the relationship using specifics from the call.

## Step 2: Determine Mode from Silence Duration

Infer how many touches have already been sent and how long the lead has been silent:
- **followup mode**: Active thread, first-week cadence. Standard is 3 touches in 7 days (~day 2, 4, 7). Touch 4 at ~day 14 is the performance-pricing card from the touch library + call ask (if no call yet). After that, move to nurture.
- **nurture mode**: Lead has been silent beyond the followup window (roughly 3+ weeks since last touch). If this is the case, tell the user: "This looks like a nurture scenario based on the silence gap. Switching to nurture mode." Then Read `docs/nurture.md` and follow nurture rules instead. Skip validation (nurture is not validated).

State explicitly which mode you chose and why (e.g., "Mode: pre-call followup, touch 3 -- last sent ~4 days ago based on timestamps").

---

## Pre-Call Followup Rules

**Goal: get the call booked.**

**Touch cadence:**
- Touch 1 (~day 2): Bare status question or outcome curiosity. No resource needed.
- Touch 2 (~day 4): Second angle from the touch library. Still short.
- Touch 3 (~day 7): Third angle. Slightly warmer push toward the call.
- Touch 4 (~day 14): Performance-pricing card from the touch library + call ask. This is the single "big card." Use once per lead.

**DATA-BACKED TOUCH RULES** (from analysis of 680 follow-up silence gaps, 2025-09 to 2026-06):
- CRITICAL: The new rule is every follow-up must be EASY TO ANSWER. Giving something is optional.
- Evidence: bare check-ins like "Is this project still open?" revived 76% of dead threads. Generic resource blasts failed at 7.6-18% (audit checklists, tool links).
- Case studies and testimonial videos ONLY when they match the exact same vertical as this lead. Same-vertical-or-skip, never an indirect match.
- Every touch carries some CTA, minimum a re-engagement question. Not necessarily the call ask.
- Keep follow-ups to 1-3 sentences maximum. Brevity is mandatory.

**NEVER use:** "just checking in", "any updates?", "don't want to bother you", "hope I'm not being annoying"

When including a call CTA, always include [calendar link]. Never say "happy to hop on a call" without the link.

Before suggesting a resource, scan conversation for resources already shared. Never re-send the same resource.

---

## Post-Call Followup Rules

**Goal: advance the relationship, grounded in what actually happened on the call.**

A generic follow-up to someone who gave 30 minutes burns trust. Every post-call followup MUST reference specifics from the transcript: their stated pain points, goals, questions they raised, or agreed next steps.

- If no transcript was retrieved (degraded mode), limit to a bare status question. Do NOT fabricate call references.
- Reference what they said in your own words. Do not quote or parrot them back.
- One clear next step per message (usually: confirm the proposal is coming, confirm a date, or ask the one decision-blocker they mentioned).
- Still short: 2-4 sentences.

---

## Two Response Variations

Generate TWO response options using different touch types from the touch library. Label each with the touch type used.

- **RESPONSE 1 (by-the-book):** Apply rules rigidly. Safe, consistent, fully aligned. Infer the most appropriate touch type for this stage.
- **RESPONSE 2 (creative / experimental):** Use a different touch type from the library. Bolder or more conversational. Still rule-compliant. Hard constraints (pricing, no fabricating, no timeline commitments) apply to both.
