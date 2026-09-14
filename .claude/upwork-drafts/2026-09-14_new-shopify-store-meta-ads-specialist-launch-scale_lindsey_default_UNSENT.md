# Upwork Proposal: New Shopify store, Meta Ads specialist (Pixel/CAPI, testing, retargeting, scaling to profitable sales)

- **Profile:** Lindsey | **Style:** lindsey_default (request said "Lindsey's strategic version, write it in lindsey_default", resolved in the same message) | **Date:** 2026-09-14 (Postgres now()) | **Status:** UNSENT, QC + expert review applied
- **TWIN EXISTS: SEND ONE PROFILE.** `.claude/upwork-drafts/2026-09-15_new-shopify-store-meta-ads-specialist-launch-to-scale_samuel_strategic_UNSENT.md` (commit b0b9457, parallel session, landed after this session's start-of-draft duplicate check). Meta-first Shopify normally routes to Lindsey.
- **Attachment:** NONE. No Lindsey-operated ecom PDF is attachable (Master Spa Parts has no case-study PDF; Blush_Camera.pdf is DO-NOT-ATTACH, its revenue headline omits ~$23K of spend). Results line deliberately left out of the body.

## PROPOSAL (paste-ready)

What does one order leave you after product cost, shipping and fees? On a new store that number sets the starting budget, how much an ad can spend before it gets cut, and which ROAS is actually profitable.

I ask because I built and sold my own e-commerce business, and new stores rarely fail on the ads. They fail on the math. Meta wants roughly 50 purchases a week before an ad set settles. If a purchase costs around $40, that's about $2,000 a week for one ad set, more than most new stores spend. So a first month stays in one campaign: three or four ads with different hooks on your one or two strongest products, broad targeting, and retargeting once there are visitors to retarget.

Two Meta stores I ran. A replacement parts store: a little over $120,000 in spend, about 4,260 purchases at roughly $29 each, around 5.5x ROAS. A consumer camera brand: about $58,000, 623 purchases at $94 each. Neither was brand-new. On the camera brand, cost per purchase started near $120, dropped to about $70 in months two and three, then climbed back above $115.

Each new ad gets about two to three times your target cost per purchase to prove itself. No sale by then, it's off. A winner gets budget in steps of roughly 20% every few days, and only while cost per purchase stays under break-even.

I'd start at about $5,000 a month, around $165 a day. Our tracking specialist sets up the Pixel and Conversions API and checks for double-counted purchases before spending. Setup is a one-time $1,500, then management is the greater of $1,500 a month or 20% of ad spend, with a 90-day minimum.

Realistically: setup and launch in the first two weeks, about a month finding which products and ads sell, then scaling from around day 45 if cost per purchase holds. Steady profit inside 60 days is possible, but I wouldn't promise it on a store with no history.

I recorded a short video on my profile showing how I run accounts.

---

## Screening notes (internal, not part of the proposal)

| Screen | Result |
|---|---|
| Already drafted / dual bid | PASS at start. `upwork_jobs` full-row ILIKE on "recently launched a new Shopify store" / "little or no sales data": 0 rows. Leads index and all draft folders: 0 hits. Re-grep before commit. |
| Ads in scope, white-label, full-time seat | PASS. Store owner, ongoing Meta management. |
| Platform fit (Lindsey scope) | PASS. Meta + Shopify only. |
| Required items (8 questions) | All 8 answered in the body. Proof item (spend, sales, CPA, ROAS) answerable from Lindsey's own operator book. |
| "New store from little or no sales data" | PROOF GAP, disclosed. No Lindsey account in the data is a verified brand-new store. Body says "Neither was brand-new." Stated as a preference in the post, not a required item, so not foreclosing. |
| Ad spend ($5K floor) | UNSTATED; poster asks us to recommend. Body recommends ~$5,000/mo. New-store prose leans low: if they come back under $5K, the screen fires. Provisional. |
| Trial / 90-day | "Long-term if campaigns perform well" is not a posted trial term. 90-day minimum stated in the fee line. |
| Booking CTA | Suppressed. Poster already said they want to discuss before hiring. |
| Geo / payment verification | UNKNOWN. Confirm on the job page. |

## Proof used, verified live 2026-09-14 via contractor_query

- **Master Spa Parts** (`act_2752863238119036`, replacement parts ecom, operator Lindsey B., CHURNED 2026-05-28, "not performance-related"). Monthly Sep 2025 to May 2026 sums to $123,050 spend / 4,260 conv; all conversions sit on purchase-type objectives (OUTCOME_SALES 2,383, CONVERSIONS 1,134, PRODUCT_CATALOG_SALES 743). CPA $28.89. Spend-weighted ROAS ~5.5x (prior canonical 5.52x / 5.53x).
- **Blush Camera** (`act_2050081878799128`, consumer camera, operator Lindsey B., CHURNED 2026-06-16). $58,298 spend / 623 conv, all 623 on OUTCOME_SALES, $93.58 CPA. Monthly CPA (all spend): Feb $120.05 (40 conv, first month of data, client start 2026-01-28), Mar $68.52, Apr $73.28, May $116.12 on $19,972, Jun $118.92. ROAS NOT cited (partial coverage).
- **Excluded on purpose:** the May spend jump alongside a CPA rise (June stayed high on lower spend, so a scale-caused-it story is not supported); Tiami (Meta results near zero); Neue Maison (no clean purchase count); Punch Drunk / Chris Ideson (ROAS corrupt or unsupported).

## General platform practice in the body (not DB-backed)

- ~50 optimization events per ad set per week to exit learning (used in prior Lindsey drafts).
- Kill threshold of 2-3x target CPA; budget increases in ~20% steps. Working rules stated as practice, a commitment to flag.
- Pricing per canonical pricing-reference.md: $1,500 onboarding per platform, greater of $1,500/mo or 20% of spend, 90-day minimum.
- Tracking by role ("our tracking specialist"), no name.

## Divergence from the Samuel twin (b0b9457)

| Samuel strategic | Lindsey default |
|---|---|
| Opener: purchase vs add-to-cart optimization, camera brand $289 vs $56 per sale | Opener: what one order leaves after costs (margin sets budget, kill point, profitable ROAS) |
| "Hot tub and spa parts store", exact $123,049 / $28.88 / 5.52x, ~$679K revenue | "Replacement parts store", rounded figures |
| Q4 CPM timing argument ($27.50 Oct to $44.93 Dec) | Camera brand monthly CPA swing ($120 to ~$70 to above $115) |
| Budget $5,000-$7,500/mo | Budget ~$5,000/mo |
| Advantage+ sales campaign, dynamic catalog retargeting, frequency stop signal | none of these |
| Closes on AOV + margin question | Closes on profile video |
| Shared: spa parts store + camera brand accounts, ~50 purchases/week learning, 2-3x CPA kill rule, ~20% budget steps, canonical fee line | |

If Samuel is sent instead, the budget figure differs; do not send both.

## QC + expert review, applied 2026-09-14

`qc-reviewer-agent`: PASS WITH FIXES.
1. ACCEPTED, modified: "settling near $70" hid May $116 / June $119. Now "started near $120, dropped to about $70 in months two and three, then climbed back above $115." QC's extra "I plan around that kind of swing" line cut for length.
2. ACCEPTED: creative-testing method now explicit ("three or four ads with different hooks").
3. ACCEPTED: $40 now reads as a hypothetical ("If a purchase costs around $40").
4. NOTED: no results-attached line, correct given nothing is attachable.

`expert-review-agent`: Needs Work (3/5). Platform facts WebSearch-confirmed (50 events/week, 20% steps).
1. ACCEPTED, modified: $2,000/week per ad set contradicted the $5,000/mo recommendation. Now framed as "more than most new stores spend", so month one stays in one campaign. Rejected its $5,000-8,500 range (collides with Samuel twin's $5,000-7,500 and would push past Lindsey's positioning).
2. ACCEPTED, modified: hooks-based creative variants (3-4, not 4-6).
3. REJECTED: "(ROAS isn't clean on that account, a data gap I won't paper over)" reads as a tracking failure on our account.

## Open for Queenie before sending

- Recommended $5K/mo start vs a new store's likely budget: if they answer lower, it's a DQ under the $5K screen.
- Commitments in body: 2-3x CPA kill rule, ~20% scaling steps, tracking check before spend, day-45 scaling window.
- No attachment and no "results attached" line (lindsey_default normally has one).
- Geo and payment verification unknown.
- DB log to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).
