# Upwork Proposal - UNSENT
Job: Meta Ads specialist for a recently launched Shopify store. Full process (Pixel + CAPI, campaigns, audience testing, retargeting, creative testing, optimization, scaling). Wants experience taking new stores from little/no sales data to consistent purchases. Sales + profitability objective. 8 explain-items: Shopify/ecom experience, case studies with spend/sales/CPA/ROAS, new-store approach, starting budget, creative + product testing, scale/stop rules, setup + management fee, realistic 30-60 day results. Long-term if it performs; wants to discuss before hiring. No title, spend, AOV, product, geo or payment status in the pasted text.
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-15 (Postgres now())
Disposition: drafted on request (Queenie asked for the strategic version).

## SCREEN

| Screen | Result |
|---|---|
| Repeat / two-profile | PASS. No upwork_jobs row with this description text. The two 9/10 Lindsey Shopify + Meta bids are different jobs (satin pillowcase dropshipping; Denman Tea). No existing draft. |
| Ads in scope | PASS. Meta only. |
| White-label / employment seat / self-funded / trial / coaching | PASS on pasted text. |
| Ad spend $5K floor | UNMEASURABLE. No number; scale + long-term language volunteered, so not foreclosed. Draft recommends $5,000-$7,500/mo and closes on AOV + margin. |
| Required items: case studies with spend, sales, CPA, ROAS | PARTIAL. Spa parts store gives all four. Camera brand gives spend + CPA, ROAS withheld (partial revenue coverage). Zero-to-first-sale launch case with full reporting = GAP, disclosed in the draft. |
| Required items: "new store from little or no data" | GAP on proof, answered with method + the camera brand's event-optimization split. |
| Routing | Meta-first Shopify normally routes to Lindsey; Samuel strategic used because Queenie asked. Proof pooled (both accounts are Lindsey-operated, written as "we ran"). Send ONE profile. |
| Booking CTA | SUPPRESSED. Prospect already said they want to discuss before hiring; first-touch link ban applies anyway. |
| Geo / payment | UNMEASURABLE from pasted text. Check the job page before sending. |
| Attachment | None. Master Spa Parts has no PDF; Blush_Camera.pdf is do-not-attach (revenue headline fails the spend denominator). |

## VERIFIED CLAIMS (live via contractor_query 2026-09-15)

- Master Spa Parts (act_2752863238119036, Meta, operator Lindsey B., CHURNED 2026-05-28, past tense, unnamed, Magento so never called Shopify): 2025-09-14 to 2026-05-26, $123,048.94 spend, 4,260 conversions, $28.88 CPA, 5.52x ROAS on all-spend denominator (6.52x on measured-only, 84.6% coverage), ~$679,004 Meta-reported revenue. "Over eight months" = 8.4 months.
- Master Spa Parts Q4: Oct 2025 $15,699.86 / CPA $27.50 / CPM $8.06 / CTR 1.59%; Dec 2025 $15,681.83 / CPA $44.93 / CPM $11.68 / CTR 1.86%. CPM +44.9%, CPA +63.4%; auction share of the CPA rise ~76% on log decomposition, so "most of that" holds (never "half").
- Blush Camera (act_2050081878799128, operator Lindsey B., CHURNED 2026-06-16, unnamed "consumer camera brand"): 2026-02-02 to 2026-06-15, $58,298.09 spend / 623 purchases / $93.58 CPA. ROAS NOT cited (partial coverage).
- Blush Camera event split, time-matched 2026-02-17 to 2026-04-09 (51 days, ~7 weeks), all OUTCOME_SALES: ATC/IC (ATC 2/2, IC 2/4, IC Nostalgia copy, Conversions/IC Fashion copy, Conversions/IC Selfie) $3,466.11 / 12 / $288.84; purchase (Broad Purchase 2/16, Broad Purchase 3/10, Urban Outfitters Purchase, Purchases Nostalgia 4/8) $9,644.86 / 172 / $56.07. Audiences differed, shallow side is 12 purchases, so "not a clean test" is stated in the draft.
- Pricing: pricing-reference.md. $1,500 onboarding per platform; management greater of $1,500/mo or 20% of spend (marginal tiers above $30K irrelevant at the recommended spend); 90-day minimum. At $5,000-$7,500 spend the $1,500 minimum applies.
- Meta learning phase: ~50 optimization events per ad set in 7 days (Meta's published guidance).
- DB LOG (upwork_proposal_logs INSERT): SKIPPED, contractor_query cannot INSERT.

## QC + EXPERT REVIEW (2026-09-15)

qc-reviewer-agent: PASS WITH FIXES.
1. ACCEPTED, modified: close now ends on the question (explanation folded in).
2. ACCEPTED, modified: "revenue tracking was incomplete" read as our tracking failing; now attributes the gap to Meta's revenue reporting covering part of the spend (roas non-null on ~$41.8K of ~$55.9K sales spend).
3. ACCEPTED, modified: "not a clean test" caveat moved ahead of the $289 vs $56 numbers. QC wording rejected (em dash).
4. REJECTED: added line "from established catalogs to brand-new launches" is the exact unverified claim the draft discloses as a gap. Item 1 is answered by the two results.

expert-review-agent (no DB access): Good.
1. ACCEPTED, modified: campaign named as an Advantage+ sales campaign (Meta folded Advantage+ Shopping into Advantage+ sales campaigns in 2025, so "Shopping Campaign" not used), plus the audience-testing position stated outright.
2. ACCEPTED: dynamic catalog ads named for retargeting.
3. ACCEPTED, modified: frequency stop signal added without the 3-4 threshold.
Noted, no change: at $5,000 spend the $1,500 minimum is 30% of spend; "greater of" wording is accurate.

## OPEN BEFORE SENDING

- Client location and payment verification on the job page.
- Attachment: none.

## PROPOSAL (paste-ready)

A new store's first problem on Meta isn't the ads. It's that Meta has no purchases to learn from yet, so the tempting move is to optimize for add-to-carts, which come in faster and look cheaper. On a consumer camera brand we ran, two groups of campaigns ran over the same seven weeks with different audiences, so it isn't a clean test. Still, the ones optimized for add-to-cart or checkout paid about $289 per sale, and the purchase-optimized ones paid about $56. That gap is why I'd optimize for purchases from day one and size the budget to feed it.

Results, with the numbers you asked for:
- A hot tub and spa parts store we ran on Meta: $123,049 in spend over eight months, 4,260 purchases at $28.88 each, and 5.52x ROAS, roughly $679,000 in Meta-reported sales.
- The camera brand: $58,298 in spend and 623 purchases at $93.58 each. Meta only reported revenue on part of that spend, so I won't quote a ROAS built on partial numbers.

What I can't show you is a store taken from its very first sale with complete reporting, and I'd rather say that than stretch one of these to fit.

How I'd approach a brand-new store:
- Tracking first. Pixel and Conversions API connected through Shopify, then test orders checked in Events Manager against real Shopify orders, with deduplication so no sale counts twice. Nothing spends until those match.
- One broad Advantage+ sales campaign, purchase-optimized and built around one or two hero products instead of the full catalog. With this little data, splitting it across audience segments just slows learning, so the creative does the audience testing.
- Dynamic catalog ads retargeting site visitors and add-to-carts, kept small at first because a new store's warm audience is small.

Budget: an ad set needs roughly 50 purchases in a week for Meta to finish learning. A new store won't get there early, but the closer it gets, the sooner results settle. For most new stores I'd plan on $5,000 to $7,500 a month, about $170 to $250 a day. Less still works, it just takes a lot longer to learn anything.

Creative and product testing: three or four genuinely different angles per product (a demo, the problem it solves, a customer-style video, an offer), not small edits to one ad. Products get tested the same way, side by side in the same weeks, so the winner comes from sales data.

Scaling and stopping: before scaling, I'd set a break-even ROAS from your margin. An ad gets cut after spending two to three times your target cost per purchase with no sale, when frequency climbs while its cost per purchase rises, or when it keeps trailing the other ads running that week. Budgets rise about 20% at a time once cost per purchase holds under break-even for a full week, and each step is judged by what the added spend brings in, not the account average.

First 30 to 60 days: week one is tracking and the build. In weeks two to four Meta is learning, cost per purchase swings, and the job is finding which product and angle sell. I wouldn't expect a new store to be profitable on ads in month one. Days 30 to 60 bring a second creative round built on the first round's winners, steadier costs, and the first budget steps if the numbers hold.

Timing matters too. Launching now puts most of those 60 days into October and November, when ads usually get more expensive. On the spa parts store, cost per purchase went from $27.50 in October to $44.93 in December on the same spend, and most of that was CPMs rising about 45%. So ads get judged against each other in the same week, not against September.

A Meta specialist on our team builds and runs the account, I stay on strategy, and you get regular updates on what's being tested and where budget is moving. We don't bill hourly. Setup is a one-time $1,500 covering tracking, account setup and the campaign build. Management is the greater of $1,500 a month or 20% of ad spend, with a 90-day minimum, since the first two months are mostly learning.

What's your average order value, and what margin do you keep on a sale, so the break-even ROAS and starting budget come from your numbers rather than a guess?
