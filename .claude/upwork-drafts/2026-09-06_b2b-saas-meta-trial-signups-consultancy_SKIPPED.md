# SKIPPED — B2B SaaS Meta Ads consultancy (free-trial sign-ups)

**Date screened:** 2026-09-06
**Requested profile/style:** Samuel, strategic-diagnostic
**Disposition:** SKIP — not drafted, not sent

## The seat
Growing B2B SaaS testing Meta as an acquisition channel for free-trial sign-ups.
Results below expectations. Wants a consultant to audit campaigns / targeting /
creative / funnel, diagnose what is capping performance, recommend campaign
structure + testing strategy, advise on creative, messaging, audiences and
conversion tracking, and judge whether Meta can scale for them. Ongoing
management if the consultancy goes well.

Two stated gates in the post:
1. "Please include examples of B2B SaaS campaigns you have worked on, including results where possible."
2. "Please do not apply if your experience is primarily e-commerce or local businesses."

## Why we skipped

### Gate 1 — the B2B SaaS results demand is unanswerable
Exactly 1 of 28 rows in `case_studies` carries `industry_label = 'SaaS'`: ReferPro.
Its `key_result` is prose with no numbers behind it ("Doubled inbound leads and
ARR within 6 months post-seed funding").

Live verification against `meta_campaigns` + `meta_insights_daily`:

| Account | Recorded spend | Conversions | Note |
|---|---|---|---|
| ReferPro `act_941419971419732` | $131.62 across 4 campaigns | 4 | Only ONE day of insight data ingested (2026-04-16). `reporting_clients` = churned on both Google and Meta. |
| Quivr `act_26665370033052679` | $17,924.02 lifetime | 4 total; the one campaign with data sits at $172.40 CPA | Live (~$3K/mo), Lindsey operator+AM. This is a counter-proof, not proof. |
| Jybr (Creekside's own AI SaaS) | — | — | No `reporting_clients` row at all; zero performance rows. |

There is no honest, defensible trial/demo/customer number we can put in front of
this prospect. Presenting ReferPro's ARR line as a result would be overstating a
row that has a single ingested day and $131 of recorded spend behind it.

### Gate 2 — we are the excluded profile, by their own words
Of the 28 case studies: 7 Home Services, 6 Healthcare, 4 Food, 2 E-Commerce,
2 Legal, 2 Apps, 1 Auto Repair, 1 Travel, 1 Professional Services, 1 Education,
1 Finance, 1 SaaS. Twenty-six of twenty-eight are ecom or local business. The
prospect pre-screened us out in the post itself.

### Precedent applied
- **Screen the required-items list first** — an unanswerable proof demand
  forecloses the draft rather than getting conceded in-body.
- **Exclusion clause = auto-DQ** — the same reasoning that governs attaching
  nothing when an exclusion clause rejects every artifact. Here the clause
  rejects the whole book, not just the attachments.

Drafting would have required either overstating ReferPro or opening on a
concession that we are precisely the profile they said should not apply.
Neither wins the seat.

## The one override path (not taken)
Sell the diagnostic on mechanism rather than on SaaS proof — funnel, event/CAPI
tracking integrity, campaign structure, learning-phase math — and disclose the
vertical gap up front. Viable only as a deliberate override of both gates.
Note that CAPI / server-side attribution is itself a verified system-wide zero
(see the 2026-09-05 skip), which thins even that angle.

## Open unknowns (not chased, moot given the skip)
- Monthly Meta spend unstated — cannot screen against the $5K/mo floor.
- Geo unstated — cannot screen against US/CA/UK/AU.
- Consultancy-only phase is audit-shaped work with management behind it, which
  would have raised the engagement-economics question separately.
