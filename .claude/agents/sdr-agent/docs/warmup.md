# Call Warm-Up Message Generation

This doc fires when `response_type: warmup`. The lead has already booked a call. The goal is to send a personalized message that (1) nudges them toward the profile video, and (2) asks ONLY the discovery questions they have NOT already answered.

---

## When This Type Is Used

Triggered after a lead books a call. Queenie or the operator invokes this with `response_type: warmup` and pastes the full conversation thread. The resulting message is sent between the booking confirmation and the call itself.

This is NOT a follow-up. It is NOT a sales message. It is a low-friction pre-call prep message that shows we read their information.

**Jay-booked calls:** If the lead was routed to Jay's calendar, skip the warmup entirely. Jay handles his own pre-call prep. Only generate warmup messages for leads booked on the active profile's calendar (see the loaded profile doc for eligibility). Samuel profile: Samuel's/Peterson's calendar. Lindsey profile: Lindsey's calendar. If booked on Jay's calendar for any profile, skip.

---

## Step W1: Read the Conversation and Extract Answered Questions

Before generating anything, scan the FULL conversation thread AND any job description for evidence that each of the 7 discovery questions has already been answered.

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
> If you haven't yet, worth checking out my profile video before we chat. It covers how we work and answers most of the setup questions upfront. We also have a YouTube channel if you want to learn more about us: youtube.com/@creeksidemarketing1. Looking forward to getting into the [their specific topic] side of things on the call.

---

### Case C: Some questions unanswered (1-6 remaining)

Structure:
1. One natural sentence nudging the profile video (skip if video already mentioned).
2. A brief context line showing you've read their info (reference one specific detail from the conversation).
3. Ask ONLY the unanswered questions.

Keep it conversational. Do NOT use a numbered list for the questions -- write them as natural flowing sentences unless there are 4+ unanswered, in which case a short list is acceptable for readability.

Do NOT include a preamble like "So I can better prep for our call." That's filler. Just ask.

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

- The profile video nudge must feel natural. NOT: "I definitely recommend going to my profile to check out my intro video." Instead: "Worth checking out my profile video before we chat" or "If you haven't already, take a look at my profile video."
- After the profile video nudge, optionally mention our YouTube channel: "We also have a YouTube channel if you want to learn more about us: youtube.com/@creeksidemarketing1". Separate from the profile video nudge, not a replacement.
- Don't frame the questions as "so I can better prep." Just ask them.
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

> Take a look at my profile video if you haven't. It walks through exactly how we work and covers most setup questions upfront. We also have a YouTube channel if you want to learn more about us: youtube.com/@creeksidemarketing1
>
> What's your target cost per acquisition or ROAS goal? How long has the practice been open, and what's the revenue running at now? And go ahead and drop your website link if you have one.

Note what this message does NOT do:
- Does not ask about prior agency experience (they already told us)
- Does not ask about current strategy (they already told us)
- Does not ask about ad spend (they already told us)
- Does not use "looking forward to speaking with you" as a generic close
- Does not say "so I can better prep for our call" -- just asks
