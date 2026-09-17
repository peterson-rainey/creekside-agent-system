# Upwork Proposal: Skincare brand $250K+/mo revenue, Meta paid social ownership (creative testing, CAC/ROAS, scale decisions)

**Profile:** Lindsey | **Style:** lindsey_default (request said "Lindsey's strategic version, write it in lindsey_default" — resolved in-message, same as the 9/14, 9/15 and 9/16 precedents) | **Date:** 2026-09-18 | **Status:** UNSENT
**Attachment:** NONE. No attachable Lindsey ecom artifact exists (Blush_Camera.pdf is DO-NOT-ATTACH; Master Spa Parts has no case-study PDF). Results-attached line omitted.
**Char count:** ~3,450 of 5,000.

## PROPOSAL (paste-ready)

At $250K a month, how much of what Meta reports as revenue is new customers versus people who were going to buy anyway? That number, not ROAS, is what tells you whether a campaign has earned more budget.

I ask because the most convincing month I had this year wasn't real growth. A luxury furniture brand I run hit $40,389 in July at 4.17x, its best month in a year of management. It was a 50% off promo plus retargeting. Nothing in the prospecting had improved. Scaling off that number would have made August an expensive lesson.

That's the gap between a good couple of days and a real signal, and it's mostly a measurement question. A few strong days on the same creative, inside a normal frequency and CPM band, is usually noise. A real signal is a new hook holding cost per purchase at higher spend while new-customer share holds. So I hold a winner flat for three to five days after a raise before touching it again, and I move budget in steps of about 20%, because a bigger jump resets learning and costs you the read you were trying to get.

The ecommerce accounts I've personally run on Meta:

A replacement parts store. $12,000 to $15,700 a month across nine months, about $121,000 total, 4,188 purchases at roughly $29 each, around 5.5x. Mine end to end: account structure, budget, testing, creative direction, reporting.

The luxury furniture brand above. $17,000 to $40,000 a month, about $210,000 over the past year, same scope. I split prospecting by product line instead of running one blended campaign, which is how I caught a chair lane sitting at 0.40x and cut it in 12 days while another lane held 2.36x.

A consumer camera brand. Up to $19,972 a month, $58,298 total, 623 purchases at $93.58. Cost per purchase started near $120, dropped to about $70 in months two and three, then climbed back above $115 as the creative fatigued.

My largest single Meta account runs about $99,000 a month and peaked at $114,587, though that one is cosmetic dental rather than ecommerce.

Skincare and beauty are not in my account history, and I'd rather say that than dress an adjacent brand up as one.

On creative, with designers and editors already on hand I'd rather brief angles than ask for variations. Ingredient story, texture, routine, the objection that stops the second purchase. Each new ad gets about two to three times target cost per purchase to prove itself and comes out if it doesn't earn it. That testing runs at the ad level inside the campaign rather than by spinning up new ad sets, because Meta wants roughly 50 purchases a week per ad set and splitting your budget across five of them keeps all five in learning.

I built and sold my own ecommerce business before this, and after 10+ years the first thing I still look at is what one order leaves after product cost, shipping and fees. I also work with a dedicated tracking specialist on pixel, CAPI and attribution, so what Meta reports and what your backend reports don't quietly drift apart.

There's a short video on my profile showing how I run an account day to day.

## Screening notes (internal)

| Screen | Result |
|---|---|
| Duplicate / twin bid | PASS. Grep across all draft folders for this post (skincare + $250K/mo + paid social ownership): 0 hits. Clean-beauty Samuel draft (9/02) and DTC unit-economics Lindsey draft (9/16) are different posts. |
| Ads in scope | PASS. Meta paid social management, ongoing. |
| Ad spend ($5K floor) | PASS. $250K+/mo revenue, "larger budgets" stated. No number given; not needed to clear the floor. |
| Full-time seat | PASS. "someone else running the paid social side", ownership framing. No "full time" wording, so the auto-DQ did not fire. Surface only. |
| White-label / subcontractor | PASS. Direct brand owner. |
| Geo | UNKNOWN. Not stated in the post. Confirm on the job page before sending. |
| Payment verification | UNKNOWN. Confirm on the job page. |
| Required items (3) | All three answered: named ecom verticals, approximate monthly spend per account, personal scope of responsibility. |
| Skincare/beauty proof | GAP, disclosed in the body. See below. |
| Booking CTA | Suppressed. Post asks for examples, not a call. |
| Trial / 90-day | Not raised by the post. No fee or term stated in the body. |

## Proof verified live 2026-09-18 via contractor_query (meta_insights_daily x meta_campaigns)

- **Master Spa Parts** `act_2752863238119036`, CHURNED 2026-05-28. Sep 2025 to May 2026: $121,420.92 spend / 4,188 conversions / $28.99 CPA. Monthly range $7,067 (partial Sep) to $15,699.86 (Oct peak); full months $11.6K to $15.7K. ROAS ~5.5x carried from the 2026-09-15 live verification ($122,461 / $674,942 = 5.51x); cited as "around 5.5x", not exact.
- **Neue Maison (Anthony Newman)** `act_782415276397596`, luxury furniture, CHURNED. Sep 2025 to Aug 2026: $210,468.08 total. Jul 2026 peak $40,389.21 / 129 conv. Aug 2026 only $3,515 (wind-down), excluded from the stated range. Lane figures (2.79x blended, 2.36x / 1.36x / 0.40x chair lane cut in 12 days, Jul = promo + retargeting) carried from the 2026-09-11 live verification.
- **Blush Camera** `act_2050081878799128`, CHURNED 2026-06-16. Feb to Jun 2026: $58,298.09 / 623 conv / $93.58 CPA. Monthly CPA: Feb $120.05, Mar $68.52, Apr $73.28, May $116.12 on $19,972.01, Jun $118.92.
- **Doctor Laleh** `act_868498138612020`, ACTIVE, cosmetic dental. Oct 2025 to Aug 2026 average $99,349/mo; Mar 2026 peak $114,586.56. Spend only. CPA and ROAS barred on this account.

## Proof gap: skincare / beauty

`reporting_clients` has **Ella Skincare** (status `active`, platform meta) with a **NULL `ad_account_id`** and zero rows in `meta_insights_daily`. Per the standing rule, an `active` row with a NULL account is a never-launched trap, not a managed account. There is no citable skincare or beauty performance anywhere in Lindsey's book. Dr. Laleh Cosmetic is a dental/med spa practice, not a beauty product brand.

**This corrects the 2026-09-16 DTC draft**, which listed "skincare" among Lindsey's DTC verticals. That claim rests on Ella Skincare and is not supportable. Do not repeat it.

## General platform practice in the body (not DB-backed)

- ~50 purchases per ad set per week to exit learning.
- Kill threshold of 2-3x target CPA; budget raises in ~20% steps; 3-5 day hold after a raise.
- Testing at the ad level inside one campaign rather than by ad set proliferation.
- Tracking named by role only ("a dedicated tracking specialist"), no person named, no agency named.

## Open for Queenie before sending

- **Geo and payment verification unknown.** Both need a look at the live job page.
- **No attachment and no "results attached" line**, which lindsey_default normally carries. Nothing of Lindsey's is attachable here.
- **Agency framing:** body says "I work with a dedicated tracking specialist" and never names Creekside, consistent with the 9/16 no-Creekside-framing ruling. The 9/17 "our team" pooling allowance was not used. Say if you want it switched.
- **Commitments stated in the body:** 2-3x CPA kill rule, ~20% budget steps, 3-5 day hold after a raise, ad-level testing inside one campaign.
- **No price, no term, no fee line.** Post asks only for examples and spend.
- **QC agents not run** (qc-reviewer-agent / expert-review-agent unavailable this session).
- **DB log to `upwork_proposal_logs` skipped** (contractor_query cannot INSERT).
