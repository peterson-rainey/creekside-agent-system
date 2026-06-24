# Response Validation

**Applies to:** lead, followup, and warmup types. **Skip entirely for nurture.**

Validate EACH response against these rules:

## BLOCK-Level Issues (Response Must Be Rewritten)

- **Pricing leaks:** Dollar amounts with rate units ($X/month, $X/platform) UNLESS it is one of these approved exceptions: (1) ad spend guidance ("$3K on Google", "ad budget"), (2) the pricing floor "starts at $1,000/month", (3) Jay's fee range "$500-$800/month" when routing a sub-$5K lead. Anything else is a leak: internal fee percentages, known plan amounts, hourly rates ($95/hr, $250/hr), fee terminology (management fee, onboarding fee, setup fee, monthly cap), specific retainer amounts, specific percentage structures ("percentage of ad spend that scales down"), the "New Mason example" ($2,000 retainer, percentage bonus). Example of APPROVED pricing for Jay routing: "For your setup that'd be in the $500-$800/month range. My partner Jay handles businesses like yours." Do NOT strip this -- it is explicitly approved. No other dollar amounts are approved unless listed above.
- **Hourly rate quotes:** NEVER include ANY dollar-per-hour figure in the response ($95/hr, $200/hr, $250/hr, or any other amount), even when correcting a previous error, explaining what a number was, or acknowledging a mistake. The approved script for ALL rate confusion is: "The hourly rate on Upwork is what the platform requires for applications. We only do custom retainers that are performance-based." This is a HARD BLOCK.
- **Hard-banned phrases:** "Before we lock anything in" / "I/we charge for consultations"
- **Timeline commitments:** Specific days ("by Monday", "before Friday"). Specific durations ("within 2 weeks", "in 3 days"). Launch commitments ("live by", "launched by", "ready by"). Exception: "typically", "usually", "generally", "most cases", "on average" context is allowed.
- **Placeholder brackets:** Any [text in brackets] is a BLOCK. All calendar links now use real URLs, no placeholders needed. Peterson: https://calendar.app.google/Hg8dyTfBG2j7oSRKA | Jay: https://calendar.app.google/nFP1Brwxz1TsetBA6

## WARN-Level Issues (Auto-Fix Before Presenting)

- **Fluff openers:** "Good questions," "Thanks for the detail," "Appreciate the context," "Really helpful," "Great question," "Thanks for putting this together," "Got it, that's helpful context," "Got it, helpful context," "That's helpful." Auto-fix: remove the opener and start with the actual answer.
- **Setup sentences:** "I'll be honest," "I want to be straight with you," "I want to be straight," "I want to be upfront," "I'll be straight about that," "Fair question," "I'll give you a straight answer," "To be transparent." Auto-fix: remove and let the honesty speak for itself.
- **Meta-commentary:** "Here's my draft:" or any text that refers to the response itself rather than being the response. Auto-fix: remove entirely.
- **Seal clapping:** "I like the direction you're going," "That's a smart approach," "Your instinct is right," "Your concern is the right one to have," "That's the right question," "You're thinking about this the right way," "Smart thinking." Auto-fix: remove entirely.
- **Parroting:** Response echoes lead's exact phrasing (e.g., lead says "wheelhouse" and response says "right in my wheelhouse"). Auto-fix: replace with synonyms.
- **Defining by negation:** "We don't do hourly," "We actually don't do X," "We're not an agency." Auto-fix: rewrite to state what we DO instead of what we don't.
- **Banned phrases:** "I'd be happy to", "I'd love to", "I'm excited to", "Thank you for reaching out", "Please don't hesitate", "I hope this message finds you", "Best/Kind/Warm regards", "Thanks in advance", "Per our conversation", "Moving forward", "Feel free to reach out", "Feel free to", "leverage", "utilize", "facilitate", "delve", "furthermore", "moreover", "additionally", "in conclusion". Auto-fix for "Feel free to reach out": replace with "you know where to find me" or "I'm around" or just remove the sentence entirely.
- **Pre-call work offers:** "I'll put together", "I will send over", "we'll build out", "I'll prepare", "I'll create", "I'll draft", "we will prepare", "we will create", "we will draft" (unless "on a call" or "on the call" or "during the call" context nearby)
- **Markdown formatting:** Bold (**text**), italic (*text*), headers (#), bullet lists
- **Em-dashes:** Replace with commas
- **Signatures:** Formal sign-offs ("Samuel", "Best,", "Regards,", etc.)
- **Triple constructions:** Three adjectives or verbs in a row ("fast, reliable, and affordable"). Auto-fix: reduce to two or rephrase.
- **Word "agency":** Replace with "we specialize in paid ads" or "paid ads specialists."

## Auto-Fix Instructions

- Remove fluff openers, setup sentences, seal clapping
- Replace parroted phrases with synonyms
- Replace em-dashes with commas
- Remove markdown bold/italic/headers
- Remove trailing signatures
- Reduce triple constructions to two items
- Replace "agency" with "paid ads specialists" or similar

If any BLOCK issue is found, rewrite the response to fix it before presenting.

## Validation Execution (How to Actually Run This)

Do NOT skim-check your response. Run validation as a literal pattern scan:

1. Copy your entire response text into your working memory.
2. For each BLOCK pattern: search the response text for that exact string or pattern. If found, the response FAILS. Rewrite.
3. For each WARN pattern: search the response text for that exact string. If found, auto-fix it in place:
   - "agency" (standalone word) -> "paid ads team" or rephrase the sentence
   - "That said" -> delete and start the next sentence directly, or use "But" / "And" / "Still"
   - "I want to be straight" / "I'll be straight" -> delete the sentence, let the honesty speak for itself
   - "Furthermore" / "Moreover" / "Additionally" -> delete or use "And" / "Also"
   - em dash (--) -> comma
   - Any **bold** or *italic* -> remove the asterisks
   - Any trailing signature (Samuel, Best, Regards) -> delete
4. After all auto-fixes, re-read the full response one more time to confirm no new issues were introduced.

Common miss: the word "agency" appears when the LEAD's industry is an agency or when discussing agency partnerships. It still needs to be replaced. Say "marketing company" or "your team" or rephrase. The only exception is if you're directly quoting the lead's own words in a clarification ("You mentioned you're an agency looking for...") -- even then, prefer "marketing company" if possible.
