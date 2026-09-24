# High-End Lighting Ecom -- Google Ads Profitability -- Samuel Strategic (GAP-FIRST)

**Drafted 2026-09-25. STATUS: UNSENT.** Profile: Samuel. Style: strategic, gap-first.

## Job post
Ecommerce lighting store (chandeliers, pendants, outdoor wall, pathway). ~5 months self-managed
Google Ads. $19,300 spend, ~$35,000 revenue, near break-even after COGS/shipping/fees/refunds.
CR 1.2-1.5%, AOV $380-515. Wants audit-first, tracking verified, profitability not revenue.
Initial 30-day contract. Requires proposal to open with the words "LIGHTING ADS" and name a
previously managed lighting account.

## Screens: TWO HARD GATES FIRE, both overridden by Queenie 2026-09-25
1. **Unanswerable proof demand.** "Start your proposal with the words 'LIGHTING ADS' and then tell
   me what lighting account you previously managed" + "If you have never worked with a lighting
   store before ... this job is not the right fit." Live query confirms ZERO lighting clients.
   Nearest adjacency: Neue Maison (E-commerce / Luxury Furniture), **churned**. Same wall the
   2026-09-03 UK lighting draft hit; that draft also refused to offer Neue Maison as proof.
2. **Sub-floor spend.** $19,300 / ~5 months = **~$3,860/mo**, below the $5K/mo minimum. No range to
   screen; that is the actual run rate, and he explicitly does not want to scale spend.

Other screens PASS: ads in scope, not white-label, not an employment seat, not self-funded, not a
flat-fee portfolio owner, not detection-evasion. Geo unstated but USD pricing and Shopify imply
US. No duplicate draft under either profile; no matching `upwork_jobs` row by job name.

## Verified claims used (live query 2026-09-25, google_insights_daily)
| Claim in draft | Source | Verified |
|---|---|---|
| "consumer electronics Shopify brand, built from zero last November" | Aura Displays, first spend 2025-11-02 (per 09-03 verification) | yes |
| "average order around $580" | Aura Shopping 180d AOV $583 | yes |
| "about $7,000 a month through Google" | Aura $37,630 / 155 days = $7,285/mo | yes |
| "unbranded Shopping did 4.14x across 78 purchases over about five months through August" | Aura SHOPPING 180d: $10,913 / $45,226 / 78 conv, 2026-03-28 to 2026-08-31 (5.1 months). Campaign-level check 09-25: BOTH Aura Shopping campaigns are UNBRANDED-designated ("CM - Shop - All Products - UNBRANDED" 4.44x/77, and the "(49 Locs, No USA)" sibling 0.65x/1). No branded Shopping campaign exists in the window, so channel-level IS the unbranded aggregate. | yes |
| "439 Shopping purchases on $17,018" | Myriad Traders SHOPPING: $17,018 / $37,453 / 439 conv | yes |
| "a luxury furniture brand that churned" (no date) | Neue Maison, status churned. `clients` has NO churn_date column, so the 09-03 draft's "2026-08-11" could not be re-verified. Timing dropped. | yes, undated |
| "$1,500 monthly minimum, $1,500 onboarding" | pricing-reference.md; 20% of $3,860 = $772 < $1,500 floor | yes |
| "add to cart and begin checkout among them ... whether any are still marked primary" | agent memory, Shopify Google & YouTube app default conversions, verified 2026-09-21. Primary status is NOT observable from outside, so the draft asks rather than asserts. | yes, hedged |

**Deliberately EXCLUDED:** Aura blended 9.18x and branded Search 10.26x/180d (brand-inflated on an
account built from zero). Aura PMax 4.27x ($385 spend, 3 conversions, far too thin). Nightlark
(0.53x). Any "$20M spend / 200+ audits" line. Neue Maison as live proof.

**Window note:** Aura data stops 2026-08-31 (25-day gap to today). Draft uses past tense and names
the window ("the six months through August") rather than implying it is running right now.

**Twin-figure note:** the same-day Crescent Candles draft cites "4.4x and 2.4x across 424 purchases"
for these two accounts on a trailing-180d basis. Figures here were recomputed today and come out
4.14x / 2.20x / 439 purchases. Different runs, not a contradiction, but the two live drafts do not
match to the decimal if both get sent.

**Derived from his own numbers (arithmetic, shown so QC can re-check):**
- Blended ROAS: $35,000 / $19,300 = 1.81x
- Orders: $35,000 / ~$450 midpoint AOV = ~78 purchases over 5 months = **~16/month**
- That is below the ~30 conversions / 30 days threshold for stable Smart Bidding, and he is
  splitting those 16 across PMax + Shopping + Search.

**Attachment decision: DO NOT ATTACH.** No lighting artifact exists. The Aura case-study PDF is a
consumer-electronics story and attaching it against an explicit lighting-only requirement would
read as exactly the "generic copy-and-paste" he ruled out.

**NOT LOGGED to `upwork_proposal_logs`:** contractor mode, `contractor_query` cannot INSERT.

## Rule checks
Bold section headers present, de-colliding from both same-day Samuel twins. No em dashes. No links
or contact info. "Our team" for delivery, first person for analysis only. No hourly. No trial
offered (90-day minimum stated plainly). No self-blame, no answer-validating filler, no booking CTA.
No mechanism-then-number juxtaposition. 4,256 characters / 744 words, under the 5,000 limit.

## Review round 1 (2026-09-25)

**qc-reviewer-agent: FAIL**, 3 blocking defects, all fixed.
1. "over the six months through August" overstated a 5.1-month window. Now "about five months".
2. "it churned last month" asserted a date that cannot be re-verified (no churn_date column). Timing dropped.
3. Myriad 2.20x carried no brand/non-brand qualifier while the adjacent Aura figure was labelled
   "unbranded". Resolved harder than QC asked: the underlying query groups by `channel_type =
   SHOPPING`, which does not by itself exclude brand queries. Myriad is now cited for volume rather
   than as a ROAS proof point. See round 2 below for the Aura half, which resolved differently.
QC also flagged the unbolded "LIGHTING ADS" opener (WARN, non-blocking). Left as plain caps
deliberately: the client demanded the proposal "start with the words LIGHTING ADS", and bolding a
line he specified verbatim reads like decoration on his own instruction.

**expert-review-agent: Needs Work**, 5 recommendations, 4 applied.
1. APPLIED. Consolidation math did not close. Even fully consolidated, ~16/month is under the 30
   threshold, so the draft now says so outright and shifts the claim to what consolidation actually
   buys (structural constraint instead of target tuning).
2. APPLIED. Conversion-COUNT integrity was missing and is the stronger first check. New opening
   section, built on the verified Shopify Google & YouTube default-conversion-actions fact.
3. APPLIED. PMax/Shopping auction cannibalization named as the sharper form of campaign overlap.
4. APPLIED. The "two bands" ceiling now shows its arithmetic (three bands = ~5 orders each) instead
   of asserting on authority.
5. APPLIED in part. Myriad's 2.20x multiple removed and recast as volume evidence, which also
   resolves QC defect 3.

## Review round 2 (2026-09-25), campaign-level check

Round 1 stripped "unbranded" from the Aura figure on the assumption that a `channel_type = SHOPPING`
grouping could not evidence it. Campaign-level query shows otherwise: Aura's only two Shopping
campaigns are both UNBRANDED-designated, and there is no branded Shopping campaign in the window, so
the 4.14x channel aggregate IS the unbranded aggregate. The qualifier is restored on Aura. It stays
off Myriad, whose "Shop - All Products - 24 Jun" carries no unbranded designation.

**Cross-draft, resolved:** the flag raised against the same-day Crescent Candles draft was wrong on
its stated grounds. That draft sourced "unbranded" from a campaign name, not from a channel grouping.
It did carry three real defects in the same sentence, now fixed there: the qualifier distributed
across both stores by grammar, present tense on two PAUSED campaigns, and a cherry-pick of the
better of Aura's two unbranded campaigns (4.44x) over the 4.14x aggregate. Both live drafts now cite
the same 4.14x / 78 purchases.

---

## PROPOSAL (paste-ready)

LIGHTING ADS

None, and I am not going to dress that up. Our team has not run a lighting store, or a home decor store, or anything closer than the accounts described below. You said plainly that this ends it, so read the rest only if the reasoning earns the two minutes.

**Check the conversion count before the conversion value**

The Google and YouTube channel on Shopify creates several conversion actions when it installs, add to cart and begin checkout among them. The question is whether any of those are still marked primary. If they are, the bidding has been optimising toward carts rather than purchases, and every ROAS figure in the account has been measuring something other than what you think. The same class of check covers whether the purchase event fires once or twice, once from that channel and again from anything sitting in Tag Manager.

That comes first because it decides whether the next number is real.

**The figure that stood out was not the ROAS**

It was the order count. Thirty five thousand dollars at a $450 average order is about 16 orders a month. Performance Max generally wants something like 30 conversions in 30 days before its bidding settles, so at 16 no campaign in the account has had enough to learn from, and splitting them three ways makes that worse. Consolidating helps but does not solve it, because 16 is still short of 30. What it changes is what you can reasonably ask the bidding to do. At that volume a target ROAS is a number the system cannot hold steady, and you are better off constraining it structurally, with fewer campaigns, tighter product sets and a longer conversion window, than tuning targets.

The overlap has a sharper version worth checking. Where Performance Max and a standalone Shopping campaign carry the same SKUs, Performance Max usually takes the auction, so Shopping is serving what PMax declined and the two sets of numbers are not comparable.

**What the account is being told to value**

If Shopify is passing order revenue into Google and refunds are never adjusted back out, target ROAS is bidding toward gross revenue. On a lighting catalogue that is a specific problem rather than a general one. A wide chandelier or a tall outdoor post carries freight and breakage that a pathway kit does not, so the orders that look strongest to the algorithm can be the ones that cost the most to fulfil. That is consistent with what you describe, real revenue and nothing left at the end of it.

The fix is a margin band in Merchant Center as a custom label, net of freight and typical refund rate, with conversion value sent as margin or a margin proxy. The constraint is the volume problem again. Three bands would leave roughly five orders a month in each, which is not enough to bid on, so two bands plus a hard exclusion list for the SKUs that never clear is where I would start.

**The lighting answer, in full**

Not lighting. The closest is a consumer electronics Shopify brand, built from zero last November. Average order around $580, about $7,000 a month through Google, running Search, Shopping and Performance Max, with our team on both the Merchant Center feed and the conversion tracking. Its unbranded Shopping did 4.14x across 78 purchases over about five months through August. A second feed account sits at a much lower order value, where the useful part is the volume rather than the multiple, 439 Shopping purchases on $17,018. The nearest thing we have had to your category was a luxury furniture brand that churned, so I will not offer it as proof.

**Two places our terms may not fit**

We work on a percentage of spend with a $1,500 monthly minimum, plus a one time $1,500 onboarding that includes the audit. At your current spend the percentage does not reach that minimum, so you would be paying the floor, and the floor is a large share of a $3,900 budget. Our management also runs on a 90 day minimum rather than 30, because a tracking rebuild and a bidding reset do not produce a readable answer inside one month.

Before anything else, which conversion actions are marked primary in that account, and is purchase the only one? That single setting decides whether the last five months of reported ROAS means what you have been taking it to mean.


Samuel
