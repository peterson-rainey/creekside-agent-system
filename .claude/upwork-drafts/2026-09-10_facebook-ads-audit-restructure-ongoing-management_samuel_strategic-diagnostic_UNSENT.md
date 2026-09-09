# Upwork Proposal — Facebook Ads audit, restructure and ongoing management
**Profile:** Samuel Rainey | **Style:** samuel_strategic-diagnostic | **Date:** 2026-09-10 | **Status:** UNSENT

Companion to the lindsey_default draft of the same job (commit 3da6959). Different proof cut: that one used the Q4 CPM/CPA pair as the centrepiece; this one leads with the pre/post restructure decomposition and uses the Q4 pair only as a Q4 planning warning.

## Screening
- Platform test: Meta only. PASS for Samuel.
- Required items: none. No gating questions, no proof demands.
- Ad spend: NOT STATED. $5K/mo auto-DQ could not be screened. Nothing in the prose forecloses it (live account, ongoing management sought), so not an auto-DQ.
- Geo: NOT STATED. US/CA/UK/AU screen open.
- Vertical: NOT STATED.
- No white-label, no full-time seat, no worker-location requirement, no self-funding, no CRO/landing-page ownership.

## Proof verified this session (all Master Spa Parts, act_2752863238119036, Meta, Lindsey operator of record, churned 2026-05-28 — written as "our team" / "an account our team managed", never first person)
- Pre/post restructure split: Sep25–Feb26 $85,763 / CPM $9.01 / 2,598 conv / CPA $33.01 vs Mar–May26 $39,738 / CPM $8.07 / 1,761 conv / CPA $22.57. CPM −10.4%, CPA −31.6%.
  This is the sanctioned cut that RETIRED the old "CPM rose so not cheaper media" claim, and the draft states the ~10% media saving explicitly rather than banking all 32% on structure.
- Campaign count 11–14 (Sep25–Feb26) → 7 (Mar–May26). Six warm pools by behaviour: Customer List, FB Engagers v2, Website Visits, View Content, Add to Cart, Time Spent on Site.
- Monthly CPA arc: Feb $31.75 → Mar $25.30 → Apr $19.89 → May $22.91. April named as the peak and May as the steady state, per the standing "8.07x is a peak, settles 6.53x" correction.
- Objective pair, time-matched 2025-09-09 → 2026-02-11, same broad audience: "No Targeting" (CONVERSIONS) $5,924 / 137 conv / CPA $43.24 / 3.36x vs "No Targeting - Simp Obj" (OUTCOME_SALES) $41,838 / 986 conv / CPA $42.43 / 3.80x. Stated as directional, not dramatic.
- Q4 pair, spend within $18.03: Oct25 $15,699.86 / CPM $8.06 / CPA $27.50 vs Dec25 $15,681.83 / CPM $11.68 / CPA $44.93 = CPM +44.9%, CPA +63.4%. CPM share of the CPA rise ≈ 70%.
- Video objective share: 53 of 1,815 Meta campaigns = 2.9%. Structural fact, labelled as such.
- Meta book: $185,273–$266,003/mo over the last five full months (Mar–Aug 2026). Largest single account ~$99K/mo (Laleh).

## Draft

The split that decides this job is one nobody can see from the campaign view: whether the account got more expensive to buy, or more expensive to convert. Those look identical on a cost per lead line and they have almost nothing to do with each other.

If CPM is climbing and cost per lead is climbing with it, that is the auction, and no restructure touches it. If CPM is flat or falling while cost per lead climbs, the account is drifting on its own, and that part is fixable. Most accounts we inherit are some ratio of the two, and the first job is to price the ratio rather than assume it.

Here is that decomposition run on a replacement parts ecommerce account our team managed, before and after we restructured it. Six months before: $85,763 spend, CPM $9.01, cost per purchase $33.01. Three months after: $39,738 spend, CPM $8.07, cost per purchase $22.57. Media got about 10 percent cheaper. Cost per purchase came down 32 percent. The distance between those two figures is what the restructure was worth, and I would rather show it that way than hand you the 32 percent on its own.

What the restructure was, concretely. The account ran 11 to 14 campaigns on roughly $15K a month, six of which were warm pools split by behaviour: customer list, page engagers, site visitors, view content, add to cart, time on site. Each one was individually defensible and collectively fatal, because Meta wants around 50 conversions per ad set per week to leave the learning phase, and one warm pool cut six ways clears that on none of them. We took it to seven campaigns. Cost per purchase went from $31.75 in February to $25.30, then $19.89, then $22.91. April was a peak and May is the honest steady state, and you should have both numbers rather than the flattering one.

On creative that works and then quietly stops, the usual cause is that it is being graded against the wrong yardstick. Worth checking what objective those campaigns carry. Across roughly 1,800 Meta campaigns in the accounts we run, only 53 carry a video objective, about 3 percent, and that is deliberate rather than incidental. A video objective optimises toward ThruPlay and view-through, so a tired ad keeps posting healthy completion rates long after it stops producing leads. On that same account, same broad audience, time matched: the legacy conversions campaign ran 3.36x and the sales-objective version of it ran 3.80x at effectively the same cost per purchase. Directional rather than dramatic, but the objective is checkable in an hour.

One thing worth pricing in now, given the calendar. Q4 auction pressure is real and it is not a performance failure. On that account, October and December spend landed within $18 of each other, so the pair is clean: CPM rose 44.9 percent and cost per purchase rose 63.4 percent. The CPM move accounts for roughly 70 percent of it. Anything restructured between now and December gets graded against a rising floor, and the reporting has to separate the two or good work reads as a regression.

How we would sequence it. Week one is diagnosis only, nothing paused: event and Conversions API integrity first, because every number after that depends on it, then learning phase status per ad set, then overlap between cold and warm, then creative fatigue by frequency and first-impression ratio. You get the findings in writing whether or not they flatter whoever built the account. From there the work is ordinary: rebuild around the real money event, consolidate until ad sets can learn, exclude warm from cold properly, and run creative on a testing structure rather than swapping images.

So the above is not theory from a small account, our team runs roughly $185,000 to $265,000 a month in Meta spend across the client book, largest single account around $99,000 a month. Six years on the platform.

Two things I need to size this properly.

What is current monthly spend, and what can a lead cost for the math to work? A cost per lead target with no customer value behind it is just a number somebody liked.

What event does the account optimise to today, and does the pixel or Conversions API fire on the actual sale or booking rather than a form view? That single answer usually predicts most of the first ninety days.

We bill as a percentage of ad spend rather than hourly, so we are not paid to be slow and not paid more for adding complexity. I can put a specific number against it once I know the spend level.

Tell me the spend level and the current optimisation event and I can tell you which half of that first split you are actually in.
