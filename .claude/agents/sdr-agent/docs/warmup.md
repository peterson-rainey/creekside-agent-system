# Call Warm-Up Message Generation

This doc fires when `response_type: warmup`. The lead has already booked a call. The goal is to send a personalized message that (1) nudges them toward the profile video, and (2) asks ONLY the discovery questions they have NOT already answered.

---

## When This Type Is Used

Triggered after a lead books a call. Queenie or the operator invokes this with `response_type: warmup` and pastes the full conversation thread. The resulting message is sent between the booking confirmation and the call itself.

## What a Pre-Call Warmup May and May Not Do

A warmup message is a LOW-FRICTION prep note. It is NOT a diagnostic, NOT a sales message, and NOT a commit to findings.

**Permitted:**
- State that a review was committed to, if and only if the pasted thread explicitly shows that commitment (e.g., the lead or the agent said "I'll take a look before we talk").
- Tease topics without asserting findings: "I spotted a few things I want to pressure-test with you on the call" is fine. It signals preparation without claiming specific conclusions.
- Ask any discovery questions still unanswered (see Step W1 below).

**Prohibited:**
- Asserting specific findings, conclusions, or diagnoses that came from automated or AI analysis, or from anything not explicitly verified in the pasted thread. Example violation: "there's a version selling the same analysis for 27 bucks" -- this is an unverified AI-generated claim. A wrong specific claim destroys credibility before the call.
- Promising fixes, outcomes, or deliverables before the call ("simple to fix", "easy win", "I can fix this for you").
- Skipping discovery questions because you "already know the issue." The discovery-question case matrix (Step W1) still runs in full. Unanswered questions must still be asked regardless of what the warmup analysis surfaced.

This is NOT a follow-up. It is NOT a sales message. It is a low-friction pre-call prep message that shows we read their information.

**Jay-booked calls:** If the lead was routed to Jay's calendar, skip the warmup entirely. Jay handles his own pre-call prep. Only generate warmup messages for leads booked on the active profile's calendar (see the loaded profile doc for eligibility). Samuel profile: Samuel's/Peterson's calendar. Lindsey profile: Lindsey's calendar. If booked on Jay's calendar for any profile, skip.

**No booking links in warmup messages.** The lead has already booked. Never include any calendar link (profile calendar, Jay's calendar, or any other) in a warmup message. The warmup is a pre-call prep message, not a booking prompt. Including a booking link creates a double-booking scenario. Observed failure: warmup messages included Jay's booking link sent to leads who had already booked.

**Rescheduled calls -- do not re-send questions already asked and answered.** If a warmup was already sent before a prior call date (questions asked, some or all answered), and the lead subsequently rescheduled, do NOT generate a fresh full warmup. The correct output is one of:
(a) If all discovery questions were already asked and answered: output a 1-2 sentence Case-A-style date-confirmation note only ("Looking forward to talking [new date]" + a specific forward-look). Nothing more.
(b) If some questions remain genuinely unanswered AND the prior warmup was substantively different: ask only the truly unanswered questions in 1-2 sentences.
Never re-ask a question the lead already answered (budget, years in business, website, prior agency, etc.) just because the call date changed. Observed failure: sent a second warmup to a rescheduled lead asking Q1 and Q6 that had already been asked and answered before the first call date.

---

## Step W0: Inventory What the Lead Already Answered

Before doing anything else, scan the FULL conversation thread, the job description, AND any pre-call or screening answers the lead submitted. For every piece of information they have already provided, note it. Then map those answers against the 7 discovery questions below and mark each one ANSWERED or UNANSWERED.

**This step is the most important part of warmup generation.** The #1 real-world failure has been asking leads questions they already answered -- their budget, years in business, website, and past-agency experience -- because the agent skipped reading the full thread before drafting. Do not skip this step. Do not skim. If the lead answered something in an Upwork screening question, in their job description, or anywhere in the conversation, it is ANSWERED.

Build an explicit answered/unanswered inventory before writing a single word of the message (see Step W1 format below). Only the UNANSWERED questions go in the message.

---

## Step W1: Map Answers to the 7 Discovery Questions

Using the inventory from Step W0, build the answered/unanswered list:

### The 7 Discovery Questions

| # | Question | What counts as "answered" |
|---|----------|--------------------------|
| 1 | Have you worked with an agency or freelancer before? If so, what went wrong? | Any mention of prior experience with ads/marketing help, good or bad. Saying "we tried Google Ads in-house" counts. |
| 2 | What do your current marketing strategies consist of? What works, what doesn't? | Any description of what they're currently running or doing for marketing. |
| 3 | What's your current monthly ad spend, or what are you planning to invest? | Any dollar amount for ad budget, spend, or investment. Approximate ranges count ("around $5K", "looking to spend $10K+"). |
| 4 | What's your target cost per acquisition or ROAS goal? | Any mention of CPA target, ROAS goal, cost per lead target, return goals, or efficiency benchmarks. |
| 5 | How long have you been in business? | Years in business, founding year, "been doing this for X years", or context that makes it obvious (e.g., "we're a new brand"). |
| 6 | What is your average yearly revenue? | Any revenue figure, whether monthly or annual. Annual run rate counts. Saying "we're a startup with no revenue yet" counts. |
| 7 | Please share a link to your website | A URL, domain, or any "our website is..." mention. The job description URL field counts if present. |

Build a simple answered/unanswered list:

```
Q1 (prior agency): [ANSWERED -- "tried running ads ourselves, it didn't work"] / [UNANSWERED]
Q2 (current strategy): [ANSWERED -- "running Google Ads right now"] / [UNANSWERED]
Q3 (ad spend): [ANSWERED -- "$3K/month currently"] / [UNANSWERED]
Q4 (CPA/ROAS goal): [UNANSWERED]
Q5 (years in business): [ANSWERED -- "been open 5 years"] / [UNANSWERED]
Q6 (avg yearly revenue): [UNANSWERED]
Q7 (website): [ANSWERED -- "creeksidedental.com"] / [UNANSWERED]
```

**Budget is pre-qualification.** If Q3 (ad spend / budget) is still UNANSWERED after W0, it is MANDATORY in the message. Budget is the pre-qualification lever before the call. Every other question can be skipped if answered; Q3 cannot.

**Protect the booked call.** The call is already booked. Nothing in the warmup may jeopardize it: no pricing discussion, no spend floors or minimums, no disqualification language. Keep it short and low-friction. If the lead's answers later reveal a low budget, that is handled on the call or afterward (Jay routing) -- never in the warmup.

---

## Step W2: Check Whether Profile Video Was Already Mentioned

Scan the conversation for any mention of:
- Peterson's Upwork profile
- An intro video, profile video, or "the video"
- Explicit confirmation they watched it ("I checked out your video", "saw your intro")
- They referenced something that only appears in the video (confirms they watched it)

Mark as: **video mentioned** or **video not mentioned**.

---

## Step W3: Generate the Warm-Up Message

### Case A: 0 questions unanswered + video mentioned

Skip the questions entirely. Skip the video nudge. Skip the YouTube mention (YouTube only appears alongside the profile video nudge). Send a brief, personalized note that references something specific from the conversation, plus a soft forward-look to the call.

Example tone:
> Looking forward to digging into the Meta setup you've been running. I've looked at everything you shared and have some thoughts ready.

Keep it to 1-2 sentences. No fluff. No "I look forward to hearing from you."

---

### Case B: 0 questions unanswered + video NOT mentioned

Send the profile video nudge (one natural sentence) + a brief personalized forward-look to the call. No questions.

Example tone:
> If you haven't already, I definitely recommend going to my profile to check out my intro video and all the resources I have linked in my bio. We also have a YouTube channel if you want to learn more about us: youtube.com/@creeksidemarketing1. Looking forward to getting into the [their specific topic] side of things on the call.

**(samuel profile only -- Lindsey warmups omit the YouTube channel sentence)**

---

### Case C: Some questions unanswered (1-6 remaining)

Structure:
1. One short, specific opening line referencing something they already shared (shows you read it).
2. One natural sentence nudging the profile video (skip if video already mentioned).
3. A brief framing line -- it is fine to say something like "So I can better prep for our call, a few quick things:" or similar -- then ask ONLY the unanswered questions.

Keep it conversational. Do NOT use a numbered list for the questions -- write them as natural flowing sentences unless there are 4+ unanswered, in which case a short list is acceptable for readability.

Profile video line examples: "If you haven't already, I definitely recommend going to my profile to check out my intro video and all the resources I have linked in my bio." / "Worth checking out my profile video before we chat, it covers how we work and answers most of the setup questions upfront."

---

### Case D: ALL 7 questions unanswered (rare -- usually means the thread is very short)

This is the closest to the original static template. Still personalize: reference whatever context IS available (industry, what they're trying to accomplish, etc.).

Structure:
1. Profile video nudge (one sentence).
2. Ask the questions. A short list is fine here since there are many.

Even here, personalize the intro beyond "looking forward to speaking with you." Reference something from their post or conversation.

---

## Voice Rules (Warmup-Specific)

All standard voice rules from sdr-agent.md and validation.md apply. Additionally:

- The profile video nudge should feel natural. Both formal and casual phrasing are acceptable: "If you haven't already, I definitely recommend going to my profile to check out my intro video and all the resources I have linked in my bio" is approved and encouraged. "Worth checking out my profile video before we chat" is also fine. Match the tone of the thread.
- After the profile video nudge, optionally mention our YouTube channel (samuel profile only): "We also have a YouTube channel if you want to learn more about us: youtube.com/@creeksidemarketing1". Separate from the profile video nudge, not a replacement. Do NOT include the YouTube channel reference in Lindsey's warmup messages -- see the lindsey profile doc.
- A brief prep-framing sentence ("So I can better prep for our call...") is realistic and natural -- it is not filler, it is fine to use.
- No fluff closings. A forward-look sentence is fine if it's specific (references their situation).
- Keep the whole message under 150 words unless you have 5+ unanswered questions.

---

## Validation for Warmup Type

Warmup responses go through the Final Checklist (Step 5 in the main router) and validation (Step 6). However, the following checklist items do NOT apply to warmup:

- "If they asked for a call: response is JUST the calendar link" -- warmup is post-booking, not in response to a call request.
- "No call warm-up info before they've booked" -- they've already booked, so warm-up is appropriate.

The following validation rules from `docs/validation.md` apply normally:
- No em dashes (WARN)
- No banned phrases (WARN)
- No fluff openers (WARN)
- No placeholder brackets (BLOCK)
- No timeline commitments (BLOCK)
- No pricing leaks (BLOCK)

---

## Output Format

Follow the same output format as the main router (Step 7):

**Context Retrieved:**
- Industry detected: {industry}
- Mode: warmup
- Profile video: {mentioned / not mentioned}
- Questions answered: {list answered questions with brief evidence}
- Questions unanswered: {list what needs to be asked}
- Case: {A / B / C / D}

**---RESPONSE---**
{Message, ready to paste}

**Validation:** {PASSED / FAILED: list issues}

---

## Example: Partial Question Set (Case C)

**Conversation summary:** Lead runs a dental practice, mentioned they've tried running Google Ads in-house without success (Q1 and Q2 answered), mentioned they'd like to spend around $5K/month on ads (Q3 answered). No mention of ROAS goals, years in business, revenue, or website.

**Unanswered:** Q4 (ROAS/CPA goal), Q5 (years in business), Q6 (revenue), Q7 (website)

**Message:**

> Running Google in-house for a dental practice is a tough way to learn the platform, so I get why you're bringing someone in. We'll dig into what happened there on the call.
>
> If you haven't already, I definitely recommend going to my profile to check out my intro video and all the resources I have linked in my bio. We also have a YouTube channel if you want to learn more about us: youtube.com/@creeksidemarketing1
>
> So I can better prep for our call, a few quick things: What's your target cost per acquisition or ROAS goal? How long has the practice been open, and what's the revenue running at now? And go ahead and drop your website link if you have one.

**(samuel profile only -- Lindsey warmups omit the YouTube channel sentence)**

Note what this message does NOT do:
- Does not ask about prior agency experience (they already told us)
- Does not ask about current strategy (they already told us)
- Does not ask about ad spend (they already told us)
- Does not use "looking forward to speaking with you" as a generic close
