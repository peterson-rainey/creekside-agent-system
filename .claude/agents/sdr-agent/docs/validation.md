# Response Validation

**Applies to:** all types -- lead, followup, nurture, and warmup.

Validate EACH response against these rules:

## BLOCK-Level Issues (Response Must Be Rewritten)

- **Non-whitelisted calendar/booking URLs:** Any URL matching `calendar.app.google/*` or `calendly.com/*` that is not one of the three approved URLs is an automatic BLOCK. The only permitted URLs are: https://calendar.app.google/wSdVbfwaJRzkw12E7 (samuel), https://calendly.com/lindsey-bouffard/30min (lindsey), https://calendar.app.google/nFP1Brwxz1TsetBA6 (jay). Historical sdr_responses may contain other calendar URLs -- they are context only and must never be copied into a response.
- **"Cade" in response text:** WARN-level -- the name "Cade" appearing in the lead-facing response body triggers a WARN. Cade is an internal team member and must not be referenced in lead-facing messages. The only routing targets are the active profile persona and Jay.
- **AI/human identity claim:** Before sending any response where the lead asked "are you an AI?", "is this automated?", or similar: verify the response does NOT claim to be a human or that messages are hand-typed. If it does, rewrite or flag for human review. This is a manual check (not caught by the deterministic script).


- **Pricing leaks:** Dollar amounts with rate units ($X/month, $X/platform) UNLESS it is one of these approved exceptions: (1) ad spend guidance ("$3K on Google", "ad budget"), (2) Jay's fee range "$500-$800/month" when routing a sub-$5K lead. Anything else is a leak: internal fee percentages, known plan amounts, hourly rates ($95/hr, $250/hr), fee terminology (management fee, onboarding fee, setup fee, monthly cap), specific retainer amounts, the "New Mason example" ($2,000 retainer, percentage bonus). Example of APPROVED pricing for Jay routing: "For your setup that'd be in the $500-$800/month range. My partner Jay handles businesses like yours." Do NOT strip this -- it is explicitly approved. No other dollar amounts are approved unless listed above. **Specific percentage structures ("percentage of ad spend that scales down"):** These are a BLOCK UNLESS the Stage-2 conditions from response-guidelines.md Pricing Rules both hold -- i.e., the lead already received the Stage-1 custom/performance-based answer in a prior message AND has explicitly pushed for a rough range. Outside Stage 2, percentage tiers remain a violation. The validator flags all percentage-of-spend constructions as WARN for human/agent review (it cannot see conversation stage); the agent must confirm Stage-2 conditions are met before presenting.
- **Hourly rate quotes:** NEVER include ANY dollar-per-hour figure in the response ($95/hr, $200/hr, $250/hr, or any other amount), even when correcting a previous error, explaining what a number was, or acknowledging a mistake. The approved script for ALL rate confusion is: "The hourly rate on Upwork is what the platform requires for applications. We only do custom retainers that are performance-based." This is a HARD BLOCK.
- **Hard-banned phrases:** "Before we lock anything in" / "I/we charge for consultations"
- **Timeline commitments:** Specific days ("by Monday", "before Friday"). Specific durations ("within 2 weeks", "in 3 days"). Launch commitments ("live by", "launched by", "ready by"). Exception: "typically", "usually", "generally", "most cases", "on average" context is allowed.
- **Placeholder brackets:** Any [text in brackets] is a BLOCK. All calendar links now use real URLs, no placeholders needed. Default path calendar is in the loaded profile doc (samuel: https://calendar.app.google/wSdVbfwaJRzkw12E7 | lindsey: https://calendly.com/lindsey-bouffard/30min). Jay: https://calendar.app.google/nFP1Brwxz1TsetBA6

## WARN-Level Issues (Auto-Fix Before Presenting)

- **Fluff openers:** "Good questions," "Thanks for the detail," "Appreciate the context," "Really helpful," "Great question," "Thanks for putting this together," "Got it, that's helpful context," "Got it, helpful context," "That's helpful." Auto-fix: remove the opener and start with the actual answer.
- **Setup sentences:** "I'll be honest," "I want to be straight with you," "I want to be straight," "I want to be upfront," "I'll be straight about that," "Fair question," "I'll give you a straight answer," "To be transparent." Auto-fix: remove and let the honesty speak for itself.
- **Meta-commentary:** "Here's my draft:" or any text that refers to the response itself rather than being the response. Auto-fix: remove entirely.
- **Seal clapping:** "I like the direction you're going," "That's a smart approach," "Your instinct is right," "Your concern is the right one to have," "That's the right question," "You're thinking about this the right way," "Smart thinking." Auto-fix: remove entirely.
- **Parroting:** Response echoes lead's exact phrasing (e.g., lead says "wheelhouse" and response says "right in my wheelhouse"). Auto-fix: replace with synonyms.
- **Defining by negation:** "We don't do hourly," "We actually don't do X," "We're not an agency." Auto-fix: rewrite to state what we DO instead of what we don't.
- **Banned phrases:** "I'd be happy to", "I'd love to", "I'm excited to", "Thank you for reaching out", "Please don't hesitate", "I hope this message finds you", "Best/Kind/Warm regards", "Thanks in advance", "Per our conversation", "Moving forward", "Feel free to reach out", "Feel free to", "leverage", "utilize", "facilitate", "delve", "furthermore", "moreover", "additionally", "in conclusion", "Look forward to hearing back". Auto-fix for "Feel free to reach out": replace with "you know where to find me" or "I'm around" or just remove the sentence entirely.
- **Hours-scoped phrasing:** Any response that quotes, accepts, or promises hours-based scoping triggers a WARN. Patterns caught: `\d+\s*[-–]\s*\d+\s+hours`, `hours?\s+break(s)?\s+down`, `per\s+hour\s+of\s+work`. No auto-fix -- the agent must reframe around our actual engagement model (custom retainer, performance-based). See "No hours-scoped engagements" in response-guidelines.md.
- **Pre-call work offers:** "I'll put together", "I will send over", "we'll build out", "I'll prepare", "I'll create", "I'll draft", "we will prepare", "we will create", "we will draft" (unless "on a call" or "on the call" or "during the call" context nearby)
- **Markdown formatting:** Bold (**text**), italic (*text*), headers (#), bullet lists
- **Em-dashes:** Replace with commas
- **Signatures:** Formal sign-offs ("Samuel", "Best,", "Regards,", etc.)
- **Triple constructions:** Three adjectives or verbs in a row ("fast, reliable, and affordable"). Auto-fix: reduce to two or rephrase.
- **Word "agency":** Replace with "we specialize in paid ads" or "paid ads specialists." Exception: asking the lead about their own past experience with other agencies is NOT a violation ("Have you worked with an agency or freelancer before?", "past experience with an agency", "what went wrong with your last agency"). The ban applies to describing ourselves as an agency, not to referencing the lead's history.
- **Anti-fabrication client counts:** Any specific client/account count (`\d+\+?\s*(active\s+)?(accounts|clients)`) triggers a WARN. The agent must confirm the number appears in verified retrieved context before using it. Rephrase to "a number of accounts" if unverified. No auto-fix.
- **Anti-fabrication geographic claims:** "all 50 states" triggers a WARN. Only state geographic coverage if it appears in verified company rules or retrieved context. No auto-fix.
- **Bare fee terminology:** "management fee", "onboarding fee", "setup fee", "monthly cap" (without a dollar amount) triggers a WARN. Approved rephrase: "our pricing is custom and performance-based." Exception: these phrases inside an approved Stage-2 percentage-tier presentation are acceptable -- since the script cannot see conversation stage, this is WARN (not BLOCK) so the agent reviews it. No auto-fix.

## Auto-Fix Instructions

- Remove fluff openers, setup sentences, seal clapping
- Replace parroted phrases with synonyms
- Replace em-dashes with commas
- Remove markdown bold/italic/headers
- Remove trailing signatures
- Reduce triple constructions to two items
- Replace "agency" with "paid ads specialists" or similar

If any BLOCK issue is found, rewrite the response to fix it before presenting.

## Deterministic Validation Script

Validation is handled by `validate_response.py` in the agent directory. The script runs every BLOCK and WARN pattern as deterministic regex checks and auto-fixes WARNs. See Step 6 in `sdr-agent.md` for how to call it.

The rules above are the reference documentation. The script is the enforcement. If there's ever a conflict between what the script catches and what the rules say, update the script to match the rules -- the rules are the source of truth, the script is the mechanism.
