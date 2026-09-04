# Bardia Rezaei / @thestopdrinkingcoach -- pricing + call ask (touch 5)

**Status:** UNSENT (draft only)
**Thread:** Upwork, Samuel Rainey profile
**Date drafted:** 2026-09-04
**Last lead reply:** 2026-08-07 ("Are you available for a call to chat further?")
**Unanswered touches since:** Aug 11, Aug 15, Aug 22
**Calendar link:** Cade -- https://calendar.app.google/85PWYBwxqYNq18qe9 (curl-verified 2026-09-04, HTTP 200)

---

## MESSAGE BODY

One thing that hasn't come up in this thread is what we actually charge. Here it is in full, so you can weigh it up front.

We bill a percentage of ad spend, never hourly. The tiers are marginal, like tax brackets, and they run per platform: 20% on spend up to $30K a month, 15% on the portion from $30K to $60K, 10% on anything above $60K. There's a $1,500 per month minimum per platform, which is the same as 20% on $7,500 in spend, so under roughly that level the floor is what applies. Total fee across platforms caps at $15,000 a month. Onboarding is a one-time $1,500 per platform.

That's the full fee structure as it stands.

If those numbers line up with where you're at, do you want to get a call on the books with Cade? His calendar: https://calendar.app.google/85PWYBwxqYNq18qe9

If the structure doesn't fit your stage right now, no reply needed.

---

## Verification notes

- All pricing values match `.claude/agents/pricing-update-agent/docs/pricing-reference.md` (current as of 2026-05-25). Tiers stated as MARGINAL per that file's formula. $1,500 / 0.20 = $7,500 arithmetic confirmed.
- Tiers scoped per platform, cap scoped as total across platforms, per the formula's structure.
- Lead has NEVER disclosed ad budget. The $5K/mo minimum-spend screen is still uncleared; the pricing itself is the qualifier.
- No attachment referenced (Birthday Club PDF 404s).
- No sign-off name, no em dashes, one question.

## Known SOP conflict (surfaced, not silently obeyed)

`sdr-agent/docs/validation.md:9` bans all lead-facing dollar amounts and names $1,500/$15,000 explicitly; `docs/response-guidelines.md:38` bans volunteering pricing unless the lead discloses spend. Both are overridden here by explicit user direction to include pricing. The docs' sanctioned "New Mason" pushback example was NOT used: it reflects the retired pre-2026-05-25 Plan B model. Docs reconciliation is still open and belongs to `agent-builder-agent`.

## QC

`qc-reviewer-agent` returned WARN with two blockers, both fixed in the text above:
1. "That's the whole structure. Nothing else underneath it." was an unsupported absolute no-other-fees guarantee. Replaced with "That's the full fee structure as it stands."
2. "Cade, my co-founder, runs Meta on our side" near-verbatim repeated the Aug 7 line "My partner Cade handles our Meta side." Cut; Cade is now named without restating his role.
Also cut: "it's usually what decides whether a conversation is worth having" (answer-validating filler) and "the piece you can't get off a booking page" (dig at the link we sent three times).
QC's own para 4 replacement dropped the explicit call ask; the ask was restored per the user's directive.
