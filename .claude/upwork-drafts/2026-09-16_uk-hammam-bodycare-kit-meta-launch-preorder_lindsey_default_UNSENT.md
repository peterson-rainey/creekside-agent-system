# Upwork Proposal: UK Moroccan hammam bodycare brand, Hammam Kit launch, hands-on Meta Ads specialist (prospecting, retargeting, creative testing, preorders)

- **Profile:** Lindsey | **Style:** lindsey_default (request said "Lindsey's strategic version, write it in lindsey_default", resolved in the same message, not re-asked) | **Date:** 2026-09-16 (Postgres now(), US Central) | **Status:** UNSENT, v2, QC + expert review applied
- **Attachment:** NONE. No attachable Meta ecom artifact exists (Master Spa Parts has no PDF; Blush_Camera.pdf is DO-NOT-ATTACH; the only skincare Drive files are client contracts). Results line dropped; the two results sit in the body as bullets.

## PROPOSAL (paste-ready)

When a customer preorders the Hammam Kit, does Meta see it as a purchase, with the order value? Depending on the preorder app and checkout setup, preorders don't always reach Meta that way. When they don't, Meta has no sales to learn from, so campaigns fall back on shallower signals like add-to-cart, and Ads Manager shows fewer sales than Shopify right when you're deciding what to scale.

I ask because I've seen what that fallback costs. On a consumer camera brand I ran, campaigns optimized for add-to-cart or checkout paid about $289 per purchase over the same weeks that purchase-optimized campaigns paid $56. Different audiences and a small sample, so not a controlled test, but I wouldn't launch the kit on anything less than a real purchase signal. Having built and sold my own e-commerce business, I read Shopify first and Ads Manager second.

Two Meta accounts I ran:

- A hot tub and spa parts store: about $122,000 in spend over eight months, 4,212 purchases at roughly $29 each, around 5.5x ROAS.
- The camera brand: $58,298 over four and a half months, 623 purchases at $93.58. Retargeting brought in about one purchase in seven.

Neither was body care or a preorder launch, but Meta learns from purchases the same way. On creative, I'd start from the organic videos that got people asking where to buy, not the most-viewed ones. Meta can reach your Instagram engagers, site visitors and email list, but not your TikTok followers, so prospecting has to carry the launch.

Rate: a one-time $1,500 setup, then the greater of $1,500 a month or 20% of ad spend, in USD, with a 90-day minimum. What monthly range are you planning for Meta at launch? Any budget I suggest only helps if it fits that range.

Availability: I can start with the tracking check as soon as I have access. I work US Pacific time, about 8 hours behind you. Weekly reports would put Shopify and Ads Manager numbers side by side.

There's a short video on my profile that shows how I work.

---

## Screening notes (internal, not part of the proposal)

| Screen | Result |
|---|---|
| Already drafted / dual bid | PASS. `upwork_jobs` ILIKE on hammam / zahra / moroccan / kessa / ghassoul / black soap / bodycare / preorder across job_name, job_description, client_name, cover letter: 0 rows. No local draft or memory hit. |
| Comp / engagement shape | PASS. Ongoing management, direct brand, no profit share, no trial term stated. |
| Platform fit (Lindsey scope) | CLEAN PASS. Meta + Shopify only. |
| Geo | PASS. UK. |
| White-label / full-time seat / worker-location | PASS. Direct brand; no "full time" wording; no location requirement. |
| Ad spend ($5K floor) | UNSTATED, unmeasurable. "Lean, founder-run" describes working style, not budget; no low-spend prose. Asked in-proposal as a relative range. Provisional: if the range comes back under $5K/mo, the screen fires. |
| Required items (3) | (1) 2-3 Meta results: answered with two, both Lindsey-operated, verified live. (2) Rate structure: canonical fee. (3) Availability: start on access, US Pacific, no hours claimed. |
| Soft preferences | Product launch / preorder = verified ZERO (no preorder / pre-order / launch / bundle / kit campaign with ecom spend anywhere in `meta_campaigns`). Beauty / skincare / body care = verified ZERO (Ella Skincare has no insight rows, access lost 7/28). Both disclosed in one line; neither is a required item. |
| Payment verification / hourly range / job type | UNKNOWN from the paste. Confirm on the job page. |
| Price point | Probable match found (NOT confirmed as the same company): a London hammam bodycare brand on Shopify whose storefront is currently password-protected, consistent with a pre-launch. No prices visible. Nothing from it is used in the proposal. |

## Proof used, verified live 2026-09-16 via contractor_query

- **Master Spa Parts** (`act_2752863238119036`, `reporting_clients` operator Lindsey B., CHURNED 2026-05-28). Table window 2025-09-16 to 2026-05-26 (older months have aged out of `meta_insights_daily`): **$121,905.82 spend / 4,212 conversions / $28.94 / 5.51x** (revenue = SUM(spend x COALESCE(roas,0)) = $671,545.11, nulls counted as zero, so conservative). All 4,212 sit on purchase-type objectives (CONVERSIONS 1,108, OUTCOME_SALES 2,368, PRODUCT_CATALOG_SALES 736). Prior drafts' $123,050 / 4,260 included Sep 1-15 2025, now aged out.
- **Blush Camera** (`act_2050081878799128`, operator Lindsey B., CHURNED 2026-06-16). 2026-02-02 to 2026-06-15: **$58,298.09 / 623 / $93.58**. Retargeting (2 campaigns) $6,295.41 / 89 = 14.3%, "about one in seven".
- **Optimization-event pair, time-matched 2026-02-17 to 2026-04-09:** ATC/IC-named campaigns (5) $3,466.11 / 12 / **$288.84** vs Purchase-named campaigns (4) $9,644.86 / 172 / **$56.07**. Audiences differed, shallow side has 12 purchases, so "not a controlled test" is stated in the body.
- **Why "purchases" is safe:** on Blush Camera the `Conversions | ATC | 2/2/26` campaign shows 5 conversions on $1,432.78; if the column counted the optimization event it would show far more, so `conversions` is counting purchases.
- **Lindsey:** `team_members` timezone America/Los_Angeles. No available-hours figure exists, so none is claimed.

## Excluded on purpose

- Neue Maison product-lane ROAS (retired 9/14: 19-29% ROAS coverage, CPA ranks the lanes in reverse). Furniture, off-shape anyway.
- Master Spa Parts 14 to 7 consolidation arc (needs the CPM and May give-back caveats; no room).
- Blush warm vs cold time-matched $87.61 vs $102.14 (the one-in-seven share makes the same point in fewer words).
- CI Lifestyle / Punch Drunk / Unrefined (ROAS column corrupt, 20x uncorroborated, not Lindsey's respectively).
- Dr. Laleh Cosmetic as "beauty" (service practice, not DTC product; would overstate the bonus criterion).
- "10+ years" anchor dropped for length; "built and sold my own e-commerce business" kept.

## Open for Queenie before sending

- Fee: canonical ($1,500 setup, greater of $1,500/mo or 20%, 90-day minimum). Lindsey's style doc says $3,000/mo floor and the 8/24 authorization allows $1,000/mo; still unresolved, recent Lindsey drafts quote canonical.
- Commitments in body: tracking check on access, weekly Shopify-vs-Ads-Manager report. Confirm Lindsey can start now.
- Timezone: US Pacific is about 8 hours behind the UK, so live overlap is the UK evening. The gap is now stated in the body.
- No "our team" / Creekside framing (9/16 reply ruling applied by caution; still unruled for proposals). Pooling not needed: her own book answers the examples item.
- DB log to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).

## QC + expert review, applied 2026-09-16

`qc-reviewer-agent`: PASS WITH FIXES.
1. NOTED, not a text change: fee floor conflict ($3,000 style doc / $1,500 canonical / $1,000 8-24 authorization). Canonical kept, matching recent Lindsey drafts; Queenie to confirm before sending.
2. ACCEPTED: "working weekdays" dropped (no availability record beyond timezone).
3. ACCEPTED: UK gap stated ("about 8 hours behind you"; BST vs PDT = 8, one week at 7 in late Oct).
4. REJECTED: dropping "consumer". Blush Camera identity is recorded as a consumer camera brand (DTC, consumer electronics).
5. NOTED: payment verification still unscreened.

`expert-review-agent`: Good. Web checks passed: preorders don't always reach Meta as a valued Purchase (depends on app/checkout; Shopify Community reports of $0-value and missing Purchase events); Meta custom audiences cover IG engagement, pixel/CAPI visitors and customer lists, no TikTok bridge.
1. REJECTED as written, caveat strengthened instead: its "Separately..." rewrite severs the evidence from the point. The split IS by optimization event (campaign names), so the record documents the mechanism the text names; the confound is disclosed. Added "and a small sample" (shallow side = 12 purchases).
2. ACCEPTED (merged with QC 3): timezone gap stated, no overlap window invented.
3. ACCEPTED, modified: its "the tracking problem is the same" would be untrue of both accounts; used "but Meta learns from purchases the same way".
4. NOTED: fee floor (same as QC 1).
5. ACCEPTED: "Happy to walk through either account." cut for length.
6. REJECTED: naming ROAS/CPA in the report line (+3 words, near parroting their metric list).
Other trims: "Two results from Meta accounts I ran" to "Two Meta accounts I ran"; budget ask compressed; "not the ones with the most views" to "not the most-viewed ones"; "set up in Shopify" to "preorder app and checkout setup".
Advantage+ 2026 note (primary + secondary event blend) kept for the call, not the proposal.
