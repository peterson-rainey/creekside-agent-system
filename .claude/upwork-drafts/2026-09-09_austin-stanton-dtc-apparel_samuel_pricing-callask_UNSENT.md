# Austin Stanton / 8-figure DTC apparel -- pricing + call ask (touch 5)

**Status:** UNSENT (draft only)
**Thread:** Upwork, Samuel Rainey profile
**Date drafted:** 2026-09-09
**Last lead reply:** 2026-08-14 (his only reply)
**Unanswered touches since:** Aug 14 (answers), Aug 16 (Neue Maison correction), Aug 20 (product spread), Aug 27 (bare status)
**Calendar link:** Lindsey -- AcZssZ3k7SIWdQNr... (curl-verified 2026-09-09, HTTP 200, title "30 min with Lindsey"; same link already sent 8/14)

---

## MESSAGE BODY (send this one)

At $100,000 a month on Meta the management fee is $14,500. At $105,000 it hits our cap and stops there. $150,000 in spend is $15,000. $200,000 is $15,000.

At the range you gave me, call it $15,000 a month. Meta is the only platform in scope, so that is the whole number. Onboarding is a one time $1,500 and the audit sits inside it rather than being billed on its own.

Two things follow. None of it is indexed to hours. And above $105,000 the fee stops moving, so spend you add after that does not cost you more in fees.

Lindsey would own the work. Want 30 minutes with her?
https://calendar.google.com/calendar/appointments/schedules/AcZssZ3k7SIWdQNr-6j7lBi5MqhJyExtzSOTAajqMKJk1ycQQqYhGKadwPXyQThAU4pJU3T9qBuUaYC5

If the number does not fit, no reply needed and I will close the loop on my side.

---

## Verification notes

- Fee computed from the Python formula in `.claude/agents/pricing-update-agent/docs/pricing-reference.md`, NEVER from company_rules 41's flat-sounding prose. Re-confirmed live in DB this session (Plan A, single-plan since 2026-05-25).
- Arithmetic independently derived three times (me, sdr-agent, qc-reviewer-agent), all agree:
  $100K = 6,000 + 4,500 + 4,000 = $14,500. Cap binds at exactly $105,000. $150K uncapped $19,500 -> $15,000. $200K uncapped $24,500 -> $15,000.
- **company_rules 41 followed:** lead disclosed spend, so the DOLLAR AMOUNT is given and the percentage formula is withheld. The sdr-agent variant that spelled out 20/15/10 was REJECTED by QC on this rule.
- Onboarding stated as ONE fee with audit included, per the 2026-09-02 ruling. Standalone audit band deliberately not quoted.
- $1,500/platform minimum omitted deliberately: it cannot bind at his spend, and naming a floor to a six-figure spender invites a question about who the floor is for.
- Hours question NOT re-asked (would have been the 4th ask). The fee structure answers it instead.
- Zero case studies. Neue Maison, the per-product spread, and Master Spa Parts all deliberately unspent. Master Spa Parts stays banked for the call.
- No apparel proof and no eight-figure DTC proof claimed. We have neither.
- No sign-off name, no em dashes, exactly one question, no commitments, dignified no-reply exit.

## QC record

`qc-reviewer-agent` returned WARN. Send Variant A, do not send Variant B. Fixes applied:
1. Cut "which settles the question I had left open" -- after four unanswered touches it risks reading as a pointed reminder that he ghosted three asks, and it carries no information he needs.
2. Tightened "Two things follow from how it is built" to "Two things follow" -- with the formula withheld, "how it is built" referenced something no longer stated.
3. Variant B rejected on two hard blockers: it disclosed the bracket formula (breaks company_rules 41), and "every additional dollar you move through Meta is managed at no extra cost" generalized a fee-cap fact into a service-inclusion promise, the same failure mode as the no-other-fees guarantee caught on the Bardia thread.

## Open risk, accepted not fixed

$15,000/mo against his stated 10-15 hrs/week implies roughly $230-330/hr if he does the division. "Not indexed to hours" addresses the mechanism but does not move the anchor. QC and I both judged over-explaining it as more damaging than the objection itself on a fifth touch. If he raises it, that is a live call topic, not a message to pre-empt. We never counter with an hourly rate.

## Cadence flag

This is the FIFTH consecutive unanswered outbound. The internal plan recorded on 8/27 said touch 5 should be a clean breakup. This draft is the pricing card, which that plan had reserved and left unspent, and it carries the breakup exit in its last line, so it discharges both. The pricing card is now retired for this thread.

## SOP conflict (surfaced, not silently obeyed)

`sdr-agent/docs/validation.md` line 9 BLOCKs lead-facing dollar figures and names $15,000 explicitly; `company_rules` 22 restricts lead-facing pricing to "performance-based, custom, starts at $1K/month." Both overridden by explicit user direction to include pricing. `company_rules` 41 is the most specific active rule for a lead who HAS disclosed spend and it is compatible with that direction, so it governed the form. Docs reconciliation remains open and belongs to `agent-builder-agent`.
