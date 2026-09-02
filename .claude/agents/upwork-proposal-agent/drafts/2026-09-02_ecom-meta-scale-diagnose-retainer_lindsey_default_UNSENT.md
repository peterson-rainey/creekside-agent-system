# Upwork Proposal — E-commerce Meta Ads Specialist (diagnose + scale, monthly retainer)

- **Profile:** Lindsey
- **Style:** lindsey_default (user resolved the "strategic + diagnostic" mismatch by naming lindsey_default explicitly)
- **Date:** 2026-09-02 (per Postgres now(); local clock reads 09-03)
- **Status:** UNSENT
- **Screen:** DRAFT — both required items answerable, with disclosure. See Screen Notes.

---

## PROPOSAL (paste-ready)

Do you know what your ROAS looks like with retargeting and promotional campaigns stripped out? In most accounts I audit that one split explains the entire gap between a strong month and a flat one.

I ask because of a luxury furniture brand on our book. Its best month read as 4.17x on just over $40K in Meta spend. Underneath that, a 50 percent off promotion carried $23.8K, retargeting carried $7.5K at 7.92x, and the one campaign prospecting cold at full price returned 0.45x. Turning on a promo and tightening retargeting always produces a fast lift, because it harvests demand that already existed. Weeks later the warm pool is empty, cold acquisition was never rebuilt, and the account settles back where it started. I would look there before touching your creative.

Fatigue is also easy to rule out, and rarely checked. On a spa parts store we ran, cost per purchase went from $44.93 in December to $19.89 in April and conversions from 349 to 665, on 16 percent less spend. Frequency never left the 1.6 to 1.8 range. What moved was auction cost. CPM was $11.68 in December and $8.18 in April. Same audiences, same fatigue, different economics.

I built and sold my own e-commerce brand before doing this for other people, and after 10+ years the accounts that scale cleanly fund testing separately from scaling.

Both examples are live pulled, and both accounts have since ended, the furniture brand in August and the parts store in May. Our current e-commerce accounts are too early to quote honestly. Rather than screenshots, I would put Ads Manager on a screen share and let you pull any date range yourself.

On rate, we bill a percentage of ad spend rather than a flat retainer, so the incentive tracks yours. 20 percent up to $30K a month, 15 percent to $60K, 10 percent above that, capped at $15K. At $20K in Meta spend that is $4,000. Onboarding is $1,500 once, covering the audit and rebuild. What is your current monthly Meta spend, and is that a ceiling or a starting point?

We are US based, not Australian. If that is firm rather than preferred, better to know now.

There is a short video on my profile on how I separate the prospecting and retargeting lanes.

---

## Screen Notes (internal — do not send)

### Screens cleared

| Screen | Result |
|---|---|
| Geo (ads market) | PASS. AU is inside US/CA/UK/AU. |
| Worker-location requirement | PASS, not foreclosed. Post says "Based in Australia (**preferred**)". Preference, not a requirement, so the `dq_worker_location_requirement` rule does not fire. Addressed head-on in the body rather than ignored. |
| Ad spend floor ($5K/mo) | OPEN, not a DQ. Spend is unstated. Asked as a relative range (ceiling vs starting point). |
| No-ads-in-scope | PASS. Meta is the whole job. |
| White-label / subcontractor | PASS. Direct brand owner. |
| Full-time employment seat | PASS. "Monthly retainer basis." |
| Self-funded / profit-share | PASS. |
| Flat-fee portfolio owner | PASS. |
| Duplicate profile bid | No matching `upwork_leads` row created since 2026-08-20. No collision found. |
| Char limit | ~2,450 chars, under 5,000. |

### Required items — both answerable

**1. "2–3 examples of most recent Meta ad results for e-commerce clients."**
Delivered TWO, not three, and the shortfall is stated in the body rather than padded.

**Master Spa Parts** (masterspaparts.com, spa/hot-tub parts ecom, CHURNED 2026-05-28). Live from `meta_insights_daily` + `meta_campaigns`, 2026-09-02:

| Month | Spend | Conv | CPA | CPM | Freq |
|---|---|---|---|---|---|
| Dec 2025 | $15,681.83 | 349 | $44.93 | $11.68 | 1.69 |
| Apr 2026 | $13,223.56 | 665 | $19.89 | $8.18 | 1.63 |

Frequency range across the full Sep 2025 to May 2026 window: 1.63 to 1.82. That flatness is what licenses the "not fatigue" claim.

**Neue Maison** (luxury furniture DTC, CHURNED 2026-08-04, took Meta in-house). Filtered to `date >= 2026-04-10`, our management start:

| Month | Spend | Conv | Revenue | Blended ROAS |
|---|---|---|---|---|
| Jun 2026 | $23,870.58 | 78 | $44,033.91 | 1.84x |
| Jul 2026 | $40,389.21 | 129 | $168,244.46 | 4.17x |

July campaign split (the point of the story):

| Campaign | Spend | ROAS |
|---|---|---|
| Conversions \| July 4th - 50% | $23,843.26 | 4.17x |
| Retargeting \| 4/13 | $7,492.83 | 7.92x |
| Conversions \| Membership \| 7/22 | $6,141.49 | **0.45x** |
| TRADE PROGRAM (leads objective) | $2,214.58 | n/a |

**2. "Confirm your monthly retainer rate."**
Answered by reframing to % of spend, since we do not sell flat retainers. Marginal tiers per `pricing-reference.md`: 20% to $30K, 15% $30K–$60K, 10% above, $1,500 min/platform, $15K cap, $1,500/platform onboarding. Worked example at $20K spend = $4,000 (20% × $20,000, above the $7,500 min threshold). No hourly.

### Deliberate departure from a prior ruling — flag for Queenie

The 2026-09-02 DTC-ecom draft ruled Neue Maison ROAS **not citable** ("the real 4.17x is promo plus retargeting, not cold"). This draft **does** cite 4.17x, but as the cautionary example, with the promo/retargeting/cold split shown including our own 0.45x cold line. The prior ruling was protecting against presenting 4.17x bare as a cold-acquisition win. Using it as the disclosure is the inverse of that misuse, and it is the single best-matched artifact in the book for this prospect's stated symptom. **If you want the earlier ruling read strictly, cut paragraph two and the proposal still stands on Master Spa Parts alone.**

### Deliberately NOT cited

- **Myriad Traders** (active ecom, practicalsurvivalgear.com). Only **8 days** of data exist (2026-07-08 to 07-15, $4,642.81, 2.29x). Too thin to present as a result. This is why the answer is two examples, not three.
- **Tiami, Nightlark, MLS Signs, Disc It.** Active or recent ecom Meta accounts with real spend ($5.5K–$7.8K/mo) but zero conversion/revenue values in `meta_insights_daily`. Not quotable, and I did not characterise it as broken client tracking, since it may be pipeline field coverage.
- **Fitness Superstore.** The only E-Commerce Meta row in `case_studies`, keyed on "40x+ peak ROAS". Unbacked and churned.
- **Master Spa Parts ROAS.** Prior ruling stands. CPA, CPM and frequency cited instead, all computed directly.
- **Outback Peptides.** The one live Australian account, which would have partly answered the geo preference. Excluded because it is Google, and Lindsey's profile must not present Google as a service. Also zero results since signing 2026-08-20.
- **Any attachment.** No ecom Meta case-study PDF exists for either account cited. Body carries the numbers instead, and the screen-share offer replaces the standard "results attached" beat.

### Rule compliance

lindsey_default opener is L4 (Missing Piece), diagnostic question first, no "I" opener, no parroting of the post's own phrasing. Experience-heavy body. Built-and-sold anchor plus 10+ years, both Lindsey-correct. Profile video close, no sign-off name. No links, no contact info. No em dashes, no bold, no headers in the paste-ready block. Meta and ecommerce only, no Google. Percentage of spend, never hourly. Pooled the book ("on our book", "a spa parts store we ran"), never the first person as operator. Spend ask phrased as ceiling-vs-starting-point per the relative-range rule. No trial offered and none requested. Availability not fabricated and not mentioned.

### Open items

- Monthly Meta spend unstated. If it comes back under $5K the auto-DQ fires and this routes away.
- Australia preference may harden into a requirement on reply.
