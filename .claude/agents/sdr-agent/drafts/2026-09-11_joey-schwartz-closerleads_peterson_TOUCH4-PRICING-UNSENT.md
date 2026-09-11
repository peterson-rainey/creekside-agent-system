# Joey Schwartz / CloserLeads - pre-call touch 4 (pricing card + call ask)
**Date drafted:** 2026-09-11 (Friday, confirmed via Postgres now(); Sept 12 in GMT+8)
**Profile:** Peterson Rainey (Upwork profile renamed from Samuel Rainey 2026-08-29)
**Type:** pre-call follow-up, touch 4, performance-pricing card + conditional call ask (directed by Queenie)
**Lead record:** upwork_leads 92639676-a10d-4aa5-8415-1d4315aff377, ClickUp 86e2tgfvd, status "follow up pre-call", salesman Peterson, due 2026-09-11
**Status:** UNSENT

---

## FINAL MESSAGE (Response 1, recommended: dollar figures)

We charge a percentage of ad spend with a cap of $15,000 a month, and at your spend you'd hit the cap. So adding budget wouldn't pay us a dollar more. Onboarding is $1,500 per platform, billed once, with an account audit included. If that works for you, want to grab a time? https://calendar.app.google/iwVAR8raqiD9a7dx6

## ALTERNATE (Response 2: no dollar figures, passes validation.md on the letter only)

We charge a percentage of ad spend with a cap, and at your spend you'd hit the cap. So adding budget wouldn't pay us anything more. Onboarding is billed once per platform, with an account audit included. If that structure works for you, want to grab a time to go over exact figures? https://calendar.app.google/iwVAR8raqiD9a7dx6

---

## VERIFIED FIGURES

Source: `.claude/agents/pricing-update-agent/docs/pricing-reference.md` (current as of 2026-05-25). Tiers are MARGINAL.

| Item | Value |
|---|---|
| Meta spend (stated in both job posts) | $200,000/mo |
| 20% on the first $30K | $6,000 |
| 15% on $30K to $60K | $4,500 |
| 10% on $60K to $200K | $14,000 |
| Uncapped fee | $24,500 |
| Monthly cap (total) | **$15,000, applies** |
| Cap applies from | ~$105,000/mo spend (4,500 + 0.10 x spend = 15,000) |
| Onboarding | $1,500 per platform, one time, audit included (ruled 2026-09-02) |

- No insurance, lead-gen or AI-consulting vertical pricing exists in `agent_knowledge`; the only vertical model is reverse mortgage (n/a). Correction fb8459a6: percentage of spend is the only model.
- Calendar `iwVAR8raqiD9a7dx6`: curl 2026-09-11, HTTP 200, "Marketing Strategy Call", schedule `AcZssZ3qAcdQsDDq...`, the same schedule as `wSdVbfwaJRzkw12E7` already in the thread.
- Kept OUT of the message: the $105K threshold, the 7.5% effective rate, the tier breakdown.

## RULE COMPLIANCE

- No sign-off (ruled 9/4, restated 9/9). No em dashes. No hourly rate, no hours.
- Stale card copy NOT used: "minimal retainer, majority earned on results" (touch-library.md:11, nurture.md:30) describes the Plan B/C model retired 2026-05-25. No New Mason example, no "custom".
- No proof claims, no scope commitments, no free work, no availability, no re-asked questions, no re-argued angles, no parroting (spend figure and "pay per lead" not restated).
- Touch 3 ("I'll drop it") not referenced; the call ask is conditional on the price working.
- Not Cade's link, not `4ierPN3nNxLMMTAz7`.

## FLAGS

1. `validation.md` BLOCK-level pricing-leak list fails Response 1 by design. Directed practice sends canonical numbers (Chaise Barnes 7/21, Brady Ulrich 7/28, Vahe Ovsepyan 7/28). Docs fix belongs to agent-builder-agent.
2. Price objection risk: Casey Ark (insurance comparison, ~$150K/mo target, creative in-house) lost 6/25 citing "% rates at higher spend levels and $15k cap would kill most of our profit" (memory file only; CRM loss reason is "unknown"). Joey posted $25-65/hr, about $11.3K/mo even at 40 hrs/wk at the top rate.
3. Two profiles: Lindsey bid both posts at $75/hr (8/13, 8/20); ours bid $90/hr (8/12, 8/19). No Lindsey conversation or quoted fee found.
4. Booking links already in thread: Cade's `85PWYBwxqYNq18qe9` (8/13; produced his one booking, cancelled 8/15), `4ierPN3nNxLMMTAz7` (8/15, 8/17; a DIFFERENT schedule, `AcZssZ2nCjLOuBQY...`, so check that calendar if he books from it), `wSdVbfwaJRzkw12E7` (8/22, 8/28).
5. $15,000 assumes the full Meta spend is in scope; a narrower scope under ~$105K prices lower. Every bid on both posts was hourly, so contract type is for Peterson on a call.
6. `sdr_generation_log` not written (contractor_query cannot INSERT).
