# Response Validation

**Applies to:** all types -- lead, followup, nurture, and warmup.

Validate EACH response against these rules:

## BLOCK-Level Issues (Response Must Be Rewritten)

- **Non-whitelisted calendar/booking URLs:** Any calendar or booking URL (`calendar.app.google/*`, `calendar.google.com/calendar/*`, `calendly.com/*`, `app.reclaim.ai/*`) that is not on the approved list is an automatic BLOCK. The only permitted URLs are: https://calendar.app.google/iwVAR8raqiD9a7dx6 (samuel), https://calendly.com/lindsey-bouffard/30min (lindsey), and the active white-label partner's calendar URL for the current profile (from the loaded partner doc). Historical sdr_responses may contain other calendar URLs -- they are context only and must never be copied into a response. On the lindsey profile, Samuel's calendar.app.google URL is ALWAYS a BLOCK; the active partner's calendar (Brady's reclaim.ai link) IS allowed. The validator enforces this per-profile via a registry in `validate_response.py`; any inactive partner's calendar URL is also a BLOCK.
- **"Cade" in response text (profile-dependent, ruling 2026-07-23):** Under the **samuel** profile, referencing Cade is ALLOWED using partner framings only ("Cade, my partner," "my co-founder") -- never internal role labels. Cade owns Meta for default-path (higher-value) leads; for partner-routed leads (especially sub-$3K/month ad spend), the active white-label partner is positioned as the Meta specialist instead. Cade's calendar URL is NOT on the whitelist -- any Cade booking link still BLOCKs, so call CTAs stay on the profile calendar (or the active partner's). Under the **lindsey** profile, any "Cade" mention is a BLOCK (solo persona, no agency/co-founder references); lindsey routing targets remain the persona and the active white-label partner only.
- **Inactive partner bleed:** Any response containing an inactive partner's name (word-boundary, case-insensitive) or calendar URL is a BLOCK. Any mention of an inactive partner's name or their calendar URL is a BLOCK. The validator enforces this via a partner registry in `validate_response.py`.
- **AI/human identity claim (updated policy):** A real person reads and sends every message, so affirming the human relationship is now ALLOWED. GOOD: "You're talking to a real person -- I read and send everything here myself." This no longer triggers a WARN. The one remaining ban: if a lead asks specifically whether AI is used to WRITE or DRAFT the messages, do NOT flatly deny AI drafting involvement. Approved posture: "I use tools to help draft, but I read and send everything myself." BAD: "hand-typed," "no AI involved," "100% human, no AI anywhere." Fabricated personal-life details (what you had for breakfast, what you were doing at 2am) remain banned. The deterministic script (below) has been updated to match -- it will WARN on false drafting-denial claims and will NOT flag affirmations of human sending.


- **Off-platform contact info (email) -- `offplatform_contact_email`:** Any email address in the draft is a BLOCK. This includes the lead's address, Lindsey's, Samuel's, Peterson's, any @creeksidemarketingpros.com address, or any other email retrieved from context (gmail_summaries, sdr_responses history, etc.). Retrieved context containing an email does NOT make it available for use in a draft. The only permitted contact mechanism is a whitelisted calendar/booking URL.
- **Off-platform contact info (phone) -- `offplatform_contact_phone`:** Any US-format phone number in the draft is a BLOCK. Conservative patterns only: `(xxx) xxx-xxxx`, `xxx-xxx-xxxx`, `xxx.xxx.xxxx`, `+1`-prefixed variants. Dollar figures, ad-spend ranges ($3,000-5,000), ROAS stats (4-6x), and CPAs ($27.92) do NOT trigger this check.
- **Pricing leaks:** Dollar amounts with rate units ($X/month, $X/platform) UNLESS it is one of these approved exceptions: (1) ad spend guidance ("$3K on Google", "ad budget"), (2) the active partner's fee range "$500-$800/month" when routing a lead to the active partner. Anything else is a leak: internal fee percentages, known plan amounts, hourly rates ($95/hr, $250/hr), fee terminology (management fee, onboarding fee, setup fee, monthly cap), specific retainer amounts, the "New Mason example" ($2,000 retainer, percentage bonus). Example of APPROVED pricing for partner routing: "For your setup that'd be in the $500-$800/month range. My partner [active partner name] handles businesses like yours." Do NOT strip this -- it is explicitly approved. No other dollar amounts are approved unless listed above. **Specific percentage structures ("percentage of ad spend that scales down"):** These are a BLOCK UNLESS the Stage-2 conditions from response-guidelines.md Pricing Rules both hold -- i.e., the lead already received the Stage-1 custom/performance-based answer in a prior message AND has explicitly pushed for a rough range. Outside Stage 2, percentage tiers remain a violation. The validator flags all percentage-of-spend constructions as WARN for human/agent review (it cannot see conversation stage); the agent must confirm Stage-2 conditions are met before presenting.
- **Hourly rate quotes:** NEVER include ANY dollar-per-hour figure in the response ($95/hr, $200/hr, $250/hr, or any other amount), even when correcting a previous error, explaining what a number was, or acknowledging a mistake. The approved script for ALL rate confusion is: "The hourly rate on Upwork is what the platform requires for applications. We only do custom retainers that are performance-based." This is a HARD BLOCK.
- **Hard-banned phrases:** "Before we lock anything in" / "I/we charge for consultations"
- **Timeline commitments:** Specific days ("by Monday", "before Friday"). Specific durations ("within 2 weeks", "in 3 days"). Launch commitments ("live by", "launched by", "ready by"). Exception: "typically", "usually", "generally", "most cases", "on average" context is allowed.
- **Placeholder brackets:** Any [text in brackets] is a BLOCK. All calendar links now use real URLs, no placeholders needed. Default path calendar is in the loaded profile doc (samuel: https://calendar.app.google/iwVAR8raqiD9a7dx6 | lindsey: https://calendly.com/lindsey-bouffard/30min). Active partner calendar: from the loaded partner doc.

## WARN-Level Issues (Auto-Fix Before Presenting)

- **Fluff openers:** "Good questions," "Thanks for the detail," "Appreciate the context," "Really helpful," "Great question," "Thanks for putting this together," "Got it, that's helpful context," "Got it, helpful context," "That's helpful." Auto-fix: remove the opener and start with the actual answer.
- **Setup sentences:** "I'll be honest," "I want to be straight with you," "I want to be straight," "I want to be upfront," "I'll be straight about that," "Fair question," "I'll give you a straight answer," "To be transparent," "you asked for honest, so here it is" (and close variants like "you want honest, here it is," "since you want me to be honest"). Auto-fix: remove and let the honesty speak for itself.
- **Meta-commentary:** "Here's my draft:" or any text that refers to the response itself rather than being the response. Auto-fix: remove entirely.
- **Seal clapping:** "I like the direction you're going," "That's a smart approach," "Your instinct is right," "Your concern is the right one to have," "That's the right question," "You're thinking about this the right way," "Smart thinking," "can tell the difference between X and Y" (as a compliment to the lead), "that one thing changes everything." Auto-fix: remove entirely.
- **Parroting:** Response echoes lead's exact phrasing (e.g., lead says "wheelhouse" and response says "right in my wheelhouse"). Auto-fix: replace with synonyms.
- **Defining by negation:** "We don't do hourly," "We actually don't do X," "We're not an agency." Auto-fix: rewrite to state what we DO instead of what we don't.
- **Banned phrases:** "I'd be happy to", "I'd love to", "I'm excited to", "Thank you for reaching out", "Please don't hesitate", "I hope this message finds you", "Best/Kind/Warm regards", "Thanks in advance", "Per our conversation", "Moving forward", "Feel free to reach out", "Feel free to", "leverage", "utilize", "facilitate", "delve", "furthermore", "moreover", "additionally", "in conclusion", "Look forward to hearing back". Auto-fix for "Feel free to reach out": replace with "you know where to find me" or "I'm around" or just remove the sentence entirely.
- **Hours-scoped phrasing:** Any response that quotes, accepts, or promises hours-based scoping triggers a WARN. Patterns caught: `\d+\s*[-–]\s*\d+\s+hours`, `hours?\s+break(s)?\s+down`, `per\s+hour\s+of\s+work`. No auto-fix -- the agent must reframe around our actual engagement model (custom retainer, performance-based). See "No hours-scoped engagements" in response-guidelines.md.
- **Pre-call work offers:** "I'll put together", "I will send over", "we'll build out", "I'll prepare", "I'll create", "I'll draft", "we will prepare", "we will create", "we will draft" (unless "on a call" or "on the call" or "during the call" context nearby)
- **Markdown formatting:** Bold (**text**), italic (*text*), headers (#), bullet lists
- **Em-dashes:** Replace with commas
- **Signatures:** Formal sign-offs at end of response. Caught and auto-stripped: bare persona names ("Samuel", "Lindsey"), dash-prefixed names ("- Lindsey", "-- Lindsey"), full names/initials ("Lindsey Bouffard", "Samuel Rainey", "Lindsey B."), closing-plus-name on one line ("Thanks, Lindsey", "Talk soon, Samuel"), multi-line closings ("Best,\nLindsey Bouffard"), and standalone closings ("Best,", "Regards,", "Cheers,"). Applies to both profiles.
- **Triple constructions:** Three adjectives or verbs in a row ("fast, reliable, and affordable"). Auto-fix: reduce to two or rephrase.
- **Word "agency":** Replace with "we specialize in paid ads" or "paid ads specialists." Exception: asking the lead about their own past experience with other agencies is NOT a violation ("Have you worked with an agency or freelancer before?", "past experience with an agency", "what went wrong with your last agency"). The ban applies to describing ourselves as an agency, not to referencing the lead's history.
- **Anti-fabrication client counts:** Any specific client/account count (`\d+\+?\s*(active\s+)?(accounts|clients)`) triggers a WARN. The agent must confirm the number appears in verified retrieved context before using it. Rephrase to "a number of accounts" if unverified. No auto-fix.
- **Anti-fabrication geographic claims:** "all 50 states" triggers a WARN. Only state geographic coverage if it appears in verified company rules or retrieved context. No auto-fix.
- **Bare fee terminology:** "management fee", "onboarding fee", "setup fee", "monthly cap" (without a dollar amount) triggers a WARN. Approved rephrase: "our pricing is custom and performance-based." Exception: these phrases inside an approved Stage-2 percentage-tier presentation are acceptable -- since the script cannot see conversation stage, this is WARN (not BLOCK) so the agent reviews it. No auto-fix.

- **Name-comma DM opener (S2):** Starting a DM response with the lead's name + comma as an opener (e.g., "Jerry, good questions" / "Patrick," at the start of the message) is a WARN. This is a DM thread, not an email -- drop the name opener entirely. (Distinct from the name-as-greeting BLOCK which targets "Hey [Name]," openers; this catches bare "Name," openers too.) Auto-fix: strip the leading name-comma opener.
- **Availability-assumption phrases (S4):** "should be wide open," "I'll make it work," "any time works," "we can definitely make that work" in the context of scheduling/availability. The calendar is the only availability source. Auto-fix: not applicable -- the agent must rephrase to point to the calendar link.
- **Self-blame phrases (S6 extension -- mid-conversation):** "I was sloppy," "I was careless," "I dropped the ball," "that was sloppy of me," "I was hasty" -- these self-blame phrases are banned even outside lost-lead contexts. If an error occurred, correct it matter-of-factly without flagellating. Auto-fix: not applicable -- agent must reword. (The existing lost-lead WARN covers the lost-lead context; this extends the rule to all contexts.)

## WARN Semantics (S5 -- Framework)

**What BLOCK means:** The response MUST be rewritten to eliminate the BLOCK issue. After rewriting, re-run the validator. Maximum 1 retry; if still BLOCK after 1 rewrite, escalate to Peterson. A BLOCK verdict alone drives the loop guard -- not WARNs.

**What WARN means:** Two cases:
1. **Auto-fixable WARNs** (fluff openers, setup sentences, seal clapping, em-dashes, banned phrases, signatures, formal transitions, markdown, triple constructions, agency word): The validator auto-fixes these deterministically and outputs the fixed text after `---FIXED---`. Use the fixed text. No regeneration required.
2. **Non-auto-fixable WARNs** (hours-scoped phrasing, fabrication claims, bare fee terminology, reply length, question count, name-comma opener, availability phrases, self-blame, dollar-magnitude): Surfaced alongside the draft for agent review. The agent must decide whether to revise. A WARN alone NEVER triggers full regeneration -- only a BLOCK does.

**Loop guard:** The BLOCK retry limit is 1 (one rewrite, then escalate). WARN retries are not counted -- WARNs do not drive the retry loop.

## Auto-Fix Instructions

- Remove fluff openers, setup sentences, seal clapping
- Replace parroted phrases with synonyms
- Replace em-dashes with commas
- Remove markdown bold/italic/headers
- Remove trailing signatures
- Reduce triple constructions to two items
- Replace "agency" with "paid ads specialists" or similar

If any BLOCK issue is found, rewrite the response to fix it before presenting.

## Outside Links Rule (D2 / D4)

**Verbal references to the Upwork profile video or YouTube channel ARE allowed.** Saying "go to my profile and watch the video there" or "check out my YouTube channel" in text is permitted.

**Sending any outside LINK is NOT allowed.** This includes creeksidemarketingpros.com homepage URLs, youtube.com URLs, and any other non-whitelisted URL.

**Validator coverage (as of 2026-08-18):** The validator now BLOCKs all non-whitelisted URLs including website and YouTube links (`outside_link_block`). Prior to this fix, the validator only caught booking/calendar domains -- an Aug 7 warm-up draft that contained website + YouTube links would NOT have been caught by the validator (it was a validator gap, not a non-agent message). This gap is now closed.

Whitelisted links (may always appear in a response):
- The active profile's booking calendar URL (from loaded profile doc)
- The active partner's booking calendar URL (from loaded partner doc)
- Creekside case study URLs: creeksidemarketingpros.com/case-study-digital-marketing/...
- Sample report URLs: creekside-dashboard.up.railway.app/report/...

All other URLs are BLOCK-level in the validator (`outside_link_block`).

All other URLs are off-limits in lead-facing messages.

## Additional WARN Patterns (2026-08-18 Batch)

**AI-slop follow-up openers (W30 -- WARN, non-auto-fixable):** "circling back", "touching base", "I wanted to reach out", "I hope this [message] finds you well" are flagged as `ai_slop_warn`. These are high-frequency SDR-tool phrases that read as automated outreach. Rephrase to open with the actual point or re-engagement angle.

**Template meaning, not scripts (guidance, not a validator check):** Example phrasings in touch-library.md and nurture.md define MEANING and register, not literal words. Paraphrase fresh per lead; never reuse the same closer twice with the same lead. See the "Templates Are Meaning, Not Scripts" section in `docs/touch-library.md`.

**Micro-variance between touches (guidance):** Consecutive touches to the same lead must vary in sentence count, sentence length, and structure. Parallel construction across touches (e.g., both opening with a question, both ending with the same CTA shape) is an AI tell. See the MICRO-VARIANCE BETWEEN TOUCHES rule in `docs/followup.md`.

**Soft-close rotation bank (guidance):** When a nurture touch uses a "no pressure" close, pick from the approved variants in the Soft-Close Rotation Bank section of `docs/nurture.md`. Never repeat a closer already used with this lead.

## Deterministic Validation Script

Validation is handled by `validate_response.py` in the agent directory. The script runs every BLOCK and WARN pattern as deterministic regex checks and auto-fixes WARNs. See Step 6 in `sdr-agent.md` for how to call it.

Pass `--profile lindsey` when validating a Lindsey-profile draft. When omitted, the script defaults to samuel behavior.

The rules above are the reference documentation. The script is the enforcement. If there's ever a conflict between what the script catches and what the rules say, update the script to match the rules -- the rules are the source of truth, the script is the mechanism.
