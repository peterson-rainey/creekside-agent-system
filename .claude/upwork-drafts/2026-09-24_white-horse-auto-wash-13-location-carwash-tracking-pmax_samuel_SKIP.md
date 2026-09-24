# White Horse Auto Wash (Charleston SC + Virginia): 13 car washes, conversion tracking + PMax restructure + Meta rebuild
Profile: Samuel | Style requested: strategic | Status: **SKIP** (ruled by Queenie 2026-09-24) | No draft produced

## Screens (2026-09-24 US Central, Postgres now() 19:14 UTC / 14:14 Central -- local shell clock read 9/25, off by one)
- Twin check: NO White Horse row in `upwork_jobs`; no draft in `.claude/upwork-drafts`, `.claude/drafts`, root `drafts/` or `upwork-drafts/`.
- Prior car-wash cohort: 3 bids, 0 viewed, 0 messaged, 0 calls, 0 won.
  - "Social Media & Digital & Meta Ads Manager for Car Wash *US Only*" 9/16, Lindsey (the Faevaa draft)
  - "Google Ads Expert ... Mobile Car Wash Services" 5/19, General, ON
  - "Google Ads & Analytics Manager ... Local Service Business (Monthly Retainer)" 3/25, General, NJ
- Geo: Charleston SC + Virginia. **PASS** (US).
- Ad spend: $6,600/mo stated. **PASS** ($5K screen).
- Ads in scope: yes, Google PMax + Meta. **PASS**
- White-label / subcontractor: direct owner, independently owned. **PASS**
- Full-time seat: "5-8 hours a week", no seat tells, no negative-duties clause. **PASS**
- Self-funded / profit-share: absent. **PASS**
- Ads + landing-page CRO: **DOES NOT FIRE.** They own the 13 per-store landing pages and want GA4/GTM events on them. Tracking, not CRO. Zero CRO-gated screening questions.
- Payment verified: not checkable logged out.

## Why it was skipped -- ENGAGEMENT ECONOMICS (decisive)
- Stated fee ceiling: **$1,000-$1,500/month** for Google AND Meta, explicitly capped ("depending on experience").
- Creekside floor: **$1,500/platform x 2 platforms = $3,000/month**, plus $1,500/platform onboarding = $3,000 one-time.
- Their ceiling is **50% of our floor.**
- Percentage math does not rescue it: $6,600 x 20% = **$1,320**, below even a SINGLE platform minimum.
- **NEW MECHANISM WORTH NAMING:** the $5K/mo spend screen PASSED while the engagement still failed. `feedback_min_ad_spend_5k` predicts the fee can exceed viability below $5K, but here spend cleared $5K and the *fee ceiling* is what foreclosed it. At $6,600 spend across two platforms, a compliant $3,000/mo fee is 45% of spend -- structurally absurd for the client. **Screen the fee ceiling separately from the spend floor; clearing $5K does not clear the economics.**

## Secondary failures
- **$40/hr floor FAILS at the bottom.** 5-8 hrs/wk against $1,000-$1,500/mo spans roughly **$28.84 to $69.23/hr** (8 hrs/wk = 34.67 hrs/mo; $1,000 / 34.67 = $28.84). Screening the bottom of the range per `feedback_upwork_min_hourly_40`, this fires.
- **Standalone audit underpriced.** $400 for five business days of read-only review across Google Ads, GA4 and Meta ending in written findings. At the ruled $90/hr standalone-audit rate that buys **4.4 hours** for a three-platform review.
- **"We are not hiring an agency"** (own section) collides with the strategic style's pooling of all three operator books under "our team." Their other exclusion -- running media through our own account -- does NOT hit us; they keep ownership and we do not require it.

## What CLEARED, and is worth reusing
- **The $400 audit passes the IVC hourly carve-out 4-for-4**, the cleanest example since IVC itself: capped (5 business days, hard stop), paid ($400), an explicit gate to ongoing management ("The findings decide it. Then a 60-day engagement"), and no rate demanded of us (their number). This is the "hourly is fine when it is a doorway" shape. It was NOT the reason for the skip -- the engagement behind the door was.
- **All three required items were answerable.** Verified, not assumed:
  1. *Multi-location or local-service account* -- Victory Land Sales: 48 Meta campaigns, one per parcel, named `<Texas county> <acreage> - <variant>`, per-county CPL $14.86-$17.92 best vs $52-$56 worst, $26,341.82 / 1,136 leads / $23.19 blended (4/16-6/9/26). Operators Scott C. (Meta) + Ade A. (Google), so **available to Samuel, foreclosed under Lindsey**. Secondary: Retirement Income Solutions dispersion card (one owner, two active Meta accounts, $183.20 vs $1,851.69 CPL, weaker account holding 42.5% of budget).
  2. *Conversion action optimized to* -- Victory Land all `OUTCOME_LEADS`; Tooth Co within-account Engagement-vs-Leads pair (Aug 2026, $1,845.88 / zero recorded conversions vs $1,955.17 / 124 / $15.77).
  3. *One time you told a client to spend less* -- **ONE verified instance**, Fathom 2026-08-27 "Quick Touchbase" (Steven Stone + Ahmed Imran): Nightlark Google Shopping underperforming with zero sales, Ahmed recommended pausing it, decision to turn it off and reallocate to Meta; branded search CROAS ~4 kept running. **Honest framing is "turn off what is not producing," NOT a net budget cut** -- it is a reallocation. `agent_knowledge` has ZERO rows matching spend-reduction language; this Fathom row is the only record system-wide.

## If this client ever comes back
The only shape that works is a fee at or above $3,000/mo for both platforms, or a single-platform engagement at $1,500/mo. Their November deadline and the per-store code infrastructure they already built make the tracking work genuinely attractive -- the economics are the whole problem, not the scope.
