# Upwork Proposal — Google Ads to grow a YouTube channel (part-time, ongoing ownership)
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-08 (Postgres now(), Central)

## RECOMMENDATION: WEAK FIT / lean SKIP on proof. NOT foreclosed. Drafted as requested.

The entire job is YouTube channel growth. That is the one shelf in the book that is bare. It is a
substantive fit problem, but it is NOT a required-items foreclosure, so this is a draft-with-concession
rather than a hard skip. See the demand-gen ruling: "on a Demand Gen or YouTube job, this is a DRAFT not
a skip."

## PROFILE / STYLE RESOLUTION
Platform test first, per the styles rule. Post is **Google Ads**, which sits outside Lindsey's permitted
scope (her doc bans claiming Google Ads). So **Samuel**, and "strategic + diagnostic" is Samuel-only.
No mismatch to surface.

## SCREENS RUN
- **Ads in scope: YES.** Google Ads campaign design, launch, optimization. Primary and explicit.
- **Full-time employment seat: NOT triggered.** Post says "part-time project." The words "full time" are absent.
- **White-label / subcontractor: NO.** Direct client.
- **Self-funded / profit-share: NO.**
- **Coaching Upwork competitors: NO.**
- **Detection-evasion: NO.**
- **Flat-fee portfolio owner: NO.**
- **Geo: UNSTATED.** Unmeasurable, not cleared.
- **Ad spend: UNSTATED.** Unmeasurable, not cleared. "Part-time project" describes the freelancer's hours,
  not the media budget, so it is not itself a spend signal, but it leans small. The $5K/mo floor cannot be
  applied. Per the stated-budget rule, an unstated budget leaves it open. **The draft asks for it as a
  relative range.**
- **Hourly rate: not listed.** $40/hr floor unmeasurable.
- **Required-items list: NONE.** No numbered proof demands, no screenshot demand, no exclusion clause.
  This is what keeps it from foreclosing.

## ENGAGEMENT ECONOMICS FLAG (scored separately per the hourly rule)
Creekside bills % of ad spend, $1,500/platform/month floor. A **view-objective channel-growth campaign**
is an awkward fit for that instrument: there is no conversion event and often a small media budget, so the
floor can exceed a sensible fee. Nothing is priced in the draft (first touch, no rate asked). If this
advances, the budget answer decides whether the engagement is priceable at all.

## PROOF VERIFIED LIVE 2026-09-08 (contractor_query)

**channel_type = VIDEO, entire book:** 1 account (South River Mortgage), 2 campaigns
(`Video views - 2025-08-01 audience`, `Video views - 2025-08-01 Keywords`), **ZERO conversions**, both
PAUSED, ran a handful of days and dead since 2025-09-08. Retained-window spend now reads **$8.54** because
the rolling 12-month window has rolled past the run; memory has carried $495 and $139 for the same two
campaigns at different times. **Do not quote a dollar figure for VIDEO** — it keeps changing with the
window. The body says "a few days on almost no budget," which is stable and true.

**Every YouTube-inventory DEMAND_GEN campaign:**

| Campaign | Account | Spend | Conv | Status |
|---|---|---|---|---|
| `Deman Gen - YT Ads` | Doctor Laleh | $12,216.45 | 59.9 (~$204 CPA) | **PAUSED** 2026-08-20 |
| `DG (YT) - Remarketing - 5 Dec` | Retirement Income Solutions | $3,047.14 | **0** | ENABLED, spending 2026-09-07 |
| `DG(YT) - Jen Hatmaker - 20 Aug` | Tiami Sleep | $1,534.30 | **0** | ENABLED, spending 2026-09-07 |
| `DG (YT) - Triple Monitor - 2 Feb` | Aura Displays | $108.41 | **0** | PAUSED |

One converted, three returned nothing. This is the sanctioned concession and the draft uses it.

**The DEMAND_GEN aggregate ($44,326 / 451.8 conv, 8 accounts) is UNUSABLE here.** The converting share is
Discover, Gmail and remarketing placements, not YouTube. Presenting it on a YouTube post is the
implied-causation trap that has fired twice before.

**Root Hair NOT used.** Its "YouTube + Search" label is contradicted by the sanctioned SOP and has zero
campaign rows to break the tie. It is the single most tempting row for a YouTube job and it would ship a
fabricated credential.

**Creekside's own channel NOT used.** 211 videos, 29,348 total views, **139.1 avg views**, all ad-manager
tutorials, published 2024-07-10 to 2026-08-27. Verified live. Never citable as growth proof.

**Zero client YouTube channels grown.** Confirmed: `agent_knowledge` returns nothing on channel growth,
subscribers or earned actions, and `google_insights_daily` carries no view, view-rate or earned-action
columns at all. There is no channel-growth data anywhere in the system.

## STRATEGIC CONTENT — accuracy notes
- **Paid watch time is excluded from the 4,000 valid public watch hours** for YouTube Partner Program
  monetization. Documented YouTube policy, checkable, and it is the fact most bidders on this post will miss.
- **Earned views / earned subscribers / earned likes only report when the YouTube channel is linked to the
  Google Ads account.** Concrete, verifiable, actionable.
- **Demand Gen does not support placement or contextual keyword targeting** — those are Video-campaign
  levers. This is the campaign-type/lever distinction that decided the 2026-08-25 UK job, used here as a
  recommendation rather than a claim.
- The retention argument (ad-driven viewers depress average view duration, which the browse/suggested
  surfaces read) is a mechanism claim, not a performance claim about our book. No number attached to it.

## COMPLIANCE CHECK
No em dashes. No sign-off name. No links, no calendar link, no contact info (first touch). Does not open
with "I". Does not parrot the post's own terms back. Flags a tradeoff. Budget asked as a relative range.
"Our team" for delivery; no principal placed in a delivery seat; no fabricated YouTube specialist named.
Concession leads with numbers rather than hedging. 396 words, 2330 characters (limit 5,000).

---

## QC PASS (qc-reviewer-agent, 2026-09-08) — 3 findings applied
1. **HIGH, valid.** Concession said "four campaigns across four accounts" (Demand Gen subset only), omitting
   the 2 VIDEO campaigns. True record is **6 campaigns / 5 accounts**. Sharper point: the VIDEO campaigns were
   the view-objective audience-vs-keywords test, i.e. the exact lever para 3 recommends. Recommending a play we
   already ran without disclosing it is selective honesty. **Rewritten to 6/5 and the test named explicitly**,
   framed accurately as too short and too small to learn from rather than as a failure (a view-objective
   campaign returning zero *conversions* is not a performance signal, the objective was not conversions).
2. **MEDIUM, valid.** "Two cent cost per view" was false precision — `google_insights_daily` has no view, CPV
   or earned-action columns, so there is zero data behind it, and it sat adjacent to "and a worse channel."
   **Changed to "pennies a view."**
3. **MEDIUM, valid (notes defect).** Line 46 asserted the body said "a few days over a year ago" when it did
   not; that phrasing was tightened out and the note never updated. **Note corrected.**
4. LOW: "first ten seconds" softened to "first few seconds." "Month three" left as rhetorical timing, not a
   data claim.
5. Style: PASS (no em dashes, no URLs, no sign-off, does not open with "I", no parroting, tradeoff flagged,
   closes on a question). Platform facts (a)-(d): all four confirmed accurate.

---

## ATTACHMENT RULING 2026-09-08: ATTACH NOTHING

Swept all 28 rows of `case_studies` live. **Root Hair is the ONLY row mentioning YouTube anywhere**, and
zero rows mention video, channel growth, or awareness. No vertical is named in the post, so vertical
matching is impossible; on the lever axis the whole book is conversion/lead-gen/CPA documents.

**Root Hair (`1VDSUo_e37Hv_kL-iDS9ZsWwVAfCsM3Zt`) is the trap. DO NOT ATTACH.** Two independent blockers:
1. The PDF is titled "How Root Hair Generated 690 Conversions with YouTube + Search Ads" and prints
   "Campaign Types: YouTube Shorts, Long-Form, Search." The YouTube attribution is NOT citable —
   `case_studies` says "YouTube + Search", the sanctioned SDR SOP says plain "Google Ads", and Root Hair is
   a Track Digital white-label account with ZERO `google_campaigns` rows to break the tie. Attaching it
   asserts the forbidden credential on letterhead.
2. **It contradicts this draft's own concession paragraph**, which states we have not grown a client's
   YouTube channel. This is the "attachment that argues against the proposal" hazard class at its sharpest:
   it would destroy the credibility of the paragraph carrying all the trust in this draft.

**Everything else fails the question axis.** Perfect Parking, UrCovered, Integrity Naturopathic, LawnValue,
Green Shield and NYC Notary are attachable and clean, but every one answers "cheaper leads," not channel
growth. The "lead with metrics not vertical" framing note does NOT rescue them here — that applies when the
same *question* is answered in a different industry, and none of these answer this question.

**No screenshot library exists** (chased to ground 2026-08-27; the one Drive folder that looks like one is
Nicholas Bandy's inbox and is NOT OURS).

Send clean. The concession is stronger unaccompanied.

---

PROPOSAL (paste into the proposal box):

Paid views and channel growth pull against each other more often than people expect, and that gap decides whether this works. Watch time bought through Google Ads does not count toward the 4,000 public watch hours YouTube requires for monetization. More important, ad-driven viewers arrive interrupted rather than searching, so more of them leave in the first few seconds, pulling down the average view duration the browse and suggested surfaces read when deciding how hard to push a video. So the campaign posts a rising view count and a falling cost per view while making the channel's own engine slower.

So the scorecard gets set before launch. Link the channel to the ads account, which turns on earned views, earned subscribers and earned likes, the only place the platform reports what happened after the ad. Then split by traffic source in YouTube Analytics and compare the paid cohort against organic on average view duration and returning viewers. If paid retention lands near organic, spending more is the right call. If it does not, the targeting is wrong and more budget makes it worse faster.

On structure, the first lever I would reach for is placement and contextual targeting against adjacent channels and videos, not broad audience reach. The cheapest retentive view comes from someone already watching that subject. Broad reach hands you pennies a view and a worse channel, worth choosing on purpose rather than finding in month three.

Where we are thin, plainly. Our team runs Google at scale, mostly Search, Performance Max and Shopping, and we have not grown a client's YouTube channel. On YouTube inventory we have run six campaigns across five accounts. Four were Demand Gen, one of which converted and is now paused while the other three returned nothing. The last two were a view-objective audience against keywords test, the lever I just recommended, on one account over a year ago. They ran a few days on almost no budget, which is not long enough to learn from. If a record of channels grown is what you are buying, that is a real gap, better weighed now than later.

Two things would help me size this. Roughly what monthly budget are you working with, closer to a few thousand or well past that, and is the growth pointed at monetization, at an audience for something you sell, or at reach itself?
