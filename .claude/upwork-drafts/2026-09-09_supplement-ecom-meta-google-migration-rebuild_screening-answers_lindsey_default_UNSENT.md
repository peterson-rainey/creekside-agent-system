# Screening Answers — Supplement/Vitamin Ecom, Meta + Google Migration & Rebuild
Profile: Lindsey | Style: lindsey_default | Status: UNSENT | Drafted: 2026-09-09
Companion to: 2026-09-09_supplement-ecom-meta-google-migration-rebuild_lindsey_default_UNSENT.md

## Verified for these answers (live, 2026-09-09)
Master Spa Parts, act_2752863238119036, Meta, churned. $125,500.81 / 4,359 conv / $28.79 blended,
2025-09-09..2026-05-26. 9 calendar months, 252 active days => ~$13,945/mo calendar, ~$14,941 per 30 active days.
Cited as "roughly $14,000 a month."

FEB 2026 RESTRUCTURE (verified by campaign start_time + first/last spend):
 Legacy objective=CONVERSIONS campaigns dating to 2019-2020 retired in sequence —
 Add to Cart last spend 02-06 | Time Spent on Site 02-09 | No Targeting 02-11 | DPA v2 02-14
 | Website Visits 02-15 | View Content 02-23.
 New ODAX campaigns launched — Awareness|2/3/26 and Traffic|2/3/26 (start 02-04), Conversions|3/5/26
 (OUTCOME_SALES, start 02-09). Survivors to 05-26: No Targeting - Simp Obj (OUTCOME_SALES), DPA v3,
 Customer List, FB Engagers v2, Purchases.

PRE/POST split at 2026-02-09:
 pre  153 days $77,460.83 / 2,310 conv / $33.53 CPA / CPM $10.54
 post  99 days $48,039.98 / 2,049 conv / $23.45 CPA / CPM $7.80
 !! CONFOUNDED: pre-window contains Q4 peak CPM, post-window is cheap-media season.
 Seasonality caveat is stated in the answer itself. No causal claim made.

TIME-MATCHED tier comparison (same account, same period — this is the load-bearing evidence):
 Add to Cart $28.22 | View Content $30.35 | Time-on-Site $35.46 | broad "No Targeting - Simp Obj" $32.11
 | Customer List $25.68 | DPA v3 $23.10 | DPA v2 $16.26

## Gaps conceded on purpose
- NO third-party-platform -> native migration exists anywhere in the book. Q1 concedes this in the first line.
- Lindsey is Meta-only per lindsey-default.md. Q2 concedes the Google half is the team's search side.
- Zero supplement results citable (Outback Peptides active, no performance rows). Not cited as a result.

## Q3 pricing math
$3,000 fixed = canonical $1,500/platform onboarding x 2. 40 hrs => $75/hr implied.
Above the $40 Upwork floor; consistent with the internal $75-$100/hr costing rate (Cade/Peterson 2026-03-30).

---

## DRAFT — ANSWERS

**1. Have you migrated/rebuilt Meta and Google Ads campaigns from another advertising platform into native Meta Ads Manager and Google Ads?**

Straight answer first: not from a third-party platform into native. What I have done repeatedly is the harder half of what you're describing, which is rebuilding a live account in place without losing the performance that was already there.

The clearest example is an e-commerce account I restructured this past February. It had been running since 2019 on Meta's legacy conversion objective, with a separate campaign for every signal tier the previous manager could think of, Add to Cart, View Content, Time on Site, Website Visits, each one its own line item. I retired six of those campaigns over about three weeks, staggered rather than all at once so the account never went dark, and consolidated onto the current simplified objective set alongside the catalog and customer-list layers that were actually carrying the account.

Personally handled: the audit that decided what stayed, the consolidation plan and sequencing, the new campaign and ad set builds, the audience rebuild, and the verification afterward. Cost per conversion moved from about $33.50 to about $23.45 across the change, though I'd be careful reading all of that as the restructure, since the earlier window included Q4 and media was simply more expensive then.

The part that transfers to your project is the sequencing. Retiring and rebuilding in a deliberate order, rather than flipping everything at once, is what keeps a rebuild from looking like a failure in week two.

**2. Tell us about one e-commerce account where you personally built or rebuilt Meta and Google campaigns. Approximate monthly ad spend, and what did you do?**

Same account, and I'll be precise about scope: I ran the Meta side. Google on our accounts sits with our search side, so I won't claim that half as mine.

Spend was roughly $14,000 a month on Meta, about $125,000 across the engagement. It was a parts and accessories catalog business, so a wide SKU count and a lot of repeat buyers, which is closer to your situation than it sounds.

What I did: audited the legacy structure, killed the signal-tier retargeting campaigns, rebuilt onto broad prospecting plus a dynamic catalog layer plus a customer-list layer, restructured the audiences, and rebuilt creative into the new ad sets.

The finding worth passing to you, because it bears directly on the Add-to-Cart campaigns in your spec: measured over the same period in the same account, the Add-to-Cart campaign came in around $28 per conversion, View Content around $30, Time on Site around $35, against broad targeting at about $32. Meanwhile the catalog feed ran at $23 and the customer list at $26. The consideration tier was the most expensive thing in the account and the least necessary. That's why I'd want to look hard at yours before rebuilding it as-is.

**3. Hours estimate and fixed price, broken down.**

$3,000 fixed for the full build across both platforms. Roughly 40 hours:

- Meta rebuild, 12 hours. Audit of the current structure, campaign and ad set architecture, audience build and segmentation, retargeting, creative and copy migration, budget and optimization settings.
- Google and keyword research, 14 hours. The largest line, deliberately. Keyword and intent research from scratch, grouping, match type and negative strategy, campaign and ad group structure, responsive search ads and copy. Built from the SERP and your product catalog, not exported from what's running now.
- Tracking verification, 7 hours. Pixel and Conversions API, purchase and Add-to-Cart event validation, deduplication, Google conversion tracking, and confirming the events actually belong to your native pixel rather than the outgoing platform's.
- QA and documentation, 7 hours. Pre-launch QA on both platforms, plus the structure summary and recommendations you asked for as a deliverable.

Two to three weeks from access. The honest variable is the tracking line. If the purchase event turns out to be firing through the old platform, that number moves, and I'd rather tell you that now than discover it in week two.
