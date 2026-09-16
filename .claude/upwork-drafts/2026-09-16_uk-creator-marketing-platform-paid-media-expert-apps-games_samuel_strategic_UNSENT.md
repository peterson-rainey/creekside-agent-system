# UK Creator Marketing Platform: Paid Media Expert, mobile apps + games (Samuel strategic)

Profile: Samuel Rainey
Style: strategic
Date: 2026-09-16 (Postgres now(); the local clock reads 9/17)
Status: UNSENT, v2. White-label DQ plus stacked screens reported first; Queenie chose "Draft anyway, gaps disclosed." QC PASS WITH FIXES (2 of 3 applied, 1 rejected on live data), expert review "Good" (all 4 fixes applied or adapted). 360 words, 2,004 characters.

## Screening
First sighting: no `upwork_jobs` match on the post's distinctive phrases, and no draft in `.claude/upwork-drafts/` or `.claude/drafts/`.

- **White-label (clients test fires, front-facing and back-end):** "help with our client campaigns", "own paid media strategy for our client accounts", "Our team handles day-to-day management with you guiding them", "when a client asks a hard question", "You'll be in front of clients".
- **Advisory-only, no pricing base:** their team runs the accounts day to day, and "help shape our platform" is product work. No budget or rate posted, so the $5K spend screen and $40/hr floor are unmeasurable. Pricing is not raised in the draft (the post asks for no rate).
- **Seat-shaped, but no "full time" wording** (5+ years bar, "small, fast company", UK/EU timezone as a nice-to-have). The full-time auto-DQ did not fire.
- **Proof gap on the core requirement:** mobile games / app UA with MMPs and day-7 ROAS.
- UK or European timezone is a nice-to-have (preference wording), not raised in the draft. Ad markets unstated.

## Verification (live via contractor_query, 2026-09-16)
- **Birthday Club App:** `case_studies` "restaurant rewards app", Meta, 2,662 installs, CPI $7.36 to $3.90. `reporting_clients`: meta, CHURNED 2026-01-01, monthly_budget $2,000, account_manager Cade. Case-study figures only: there is no app-install objective in `meta_campaigns`, so they cannot be re-derived from live data. PDF 404s, so attach nothing.
- **BDC App:** no metric, not cited.
- **Games, gaming, UGC, influencer, creator:** zero rows across `case_studies` and `reporting_clients`. No APP_INSTALLS or app promotion objective in `meta_campaigns`.
- **MMP / AppsFlyer / Adjust / SKAN:** zero (see reference_mobile_app_and_attribution_proof).
- **Meta spend** (`meta_insights_daily`, 2026): Jan $215,812; Feb $230,074; Mar $238,643; Apr $222,085; May $266,003; Jun $232,816; Jul $232,154; Aug $185,273; Sep 1-16 $77,593. YTD $1,900,453, so "about $1.9M in client spend this year".
- **2026 Meta spend by `reporting_clients.client_type`** (joined on ad account): lead_gen about $1,286,870 (Doctor Laleh, Fusion Dental, South River Mortgage, MedWriter, Adventures in Wisdom and others); ecom about $441,018 (Neue Maison, Tiami, Master Spa Parts, meal prep accounts and others); unclassified $172,566. Backs "mostly lead gen and ecommerce".
- **Advantage+ campaigns in the book:** 10, mostly Advantage+ shopping on ecom accounts. Not cited numerically.
- **ad-account-monitor-agent:** status active; 23 successful "ad-account-monitor" runs in the last 30 days, last run 2026-09-16 11:00 UTC; weekday morning checks include budget pacing, KPI trend, frequency, pixel and CAPI health. Still in test phase (digest goes to Cade only), so the draft says "AI already runs our morning account checks" with no coverage count.

## Meta mechanics (Meta Business Help Center, read in the in-app browser 2026-09-16)
1. **316478108955072, "Significant edits and learning phase":** "Only a significant edit causes an ad set to reenter the learning phase." Significant edits include "Adding a new ad to your ad set" and "Changing bid strategy". "When using Advantage+ campaign budget ... switching your campaign bid strategy might cause multiple ad sets within the campaign to reenter the learning phase."
2. **1000688343301256, "About ad delivery":** "If you have multiple ads in your ad set ..., we'll show the ad that's most likely to achieve the lowest cost per optimization event for the given person. This means that each of your ads won't necessarily be delivered the same number of times."
3. **1423851372208214, "Set up a creative test in Meta Ads Manager":** "compare up to 7 creative variants with delivery provided to new test ads"; set up in an existing campaign so high performers continue "with delivery system learnings retained"; "There's no need to merge them into another campaign where the learnings would reset"; "supported in campaigns using the Highest volume bid strategy only"; "To run a creative test, switch your bid strategy to Highest volume"; "We suggest using no more than 20% of your existing budget"; results carry no confidence level. This page does not say the budget is split evenly.
4. **1376764284076031, "About creative testing for the Meta Marketing API":** "programmatically test up to 7 creative versions within an evergreen (always-on) campaign"; "The test budget is split evenly across all variants"; "no migration or learning phase reset"; objectives: all supported; bid strategy: "Highest Volume only. Cost cap and bid cap are not supported."; 2 to 7 ads; "Not compatible with Advantage+ shopping campaigns in the current release." Advantage+ app campaigns are not mentioned either way.
5. **584603712214119, "About Meta Ads Manager reporting for Apple's SKAdNetwork":** "SKAdNetwork will report results to Meta aggregated at the campaign level. To provide a more complete view of results, statistical modeling may be used at the ad set and ad levels"; "delays of at least 24 hours"; "A/B testing is only available at the campaign level and is not available at the ad or ad set level." The limits apply to iOS 14+ app promotion campaigns that use SKAdNetwork, not to Aggregated Event Measurement campaigns; "Reporting for Android or iOS 13 and below don't depend on data from SKAdNetwork."
6. **Learning phase exit** (about 50 results in the week after the last significant edit): Business Help 112167992830700, verified 9/16 per reference_meta_lead_to_purchase_mechanics_verified. Not quoted in the draft.

## Review log
- **QC (v1): PASS WITH FIXES.**
  - Hedge "so the ad set relearns each time": applied as "the kind that sends an ad set back into learning" (Meta's own framing).
  - "mostly ecommerce and lead gen" to "mostly ecommerce": REJECTED. The live client_type split shows lead gen is about two thirds of 2026 Meta spend, so the line became "mostly lead gen and ecommerce".
  - Add "current release" to the Advantage+ shopping exclusion: applied as "for now".
- **Expert review (v1): Good.**
  - Add the iOS/SKAN caveat before any per-ad read: applied, built on Meta page 584603712214119 rather than the reviewer's third-party wording.
  - Sharpen the disclosure: applied without echoing the post's "core vs nice to have" split.
  - Label the CPI stat: adapted as "our app numbers stop at the install" ("Meta-reported" is unverified, so not used).
  - Tighten the 101-level opener: applied by moving the non-obvious bid-strategy chain into the first two sentences.
- v2 changes were checked against the quoted Meta text above; no second QC pass was run.

## Rules applied
- Opens on an insight built from their nouns; does not start with "I"; no sign-off name; no links; no em dashes.
- Team pooled by role (Meta account manager week to week, Samuel on strategy), per principals-never-deliver and the 9/14 "I stay on strategy" precedent.
- Gaps disclosed only on the required item (games, MMP). TikTok, Google App Campaigns, UGC/partnership ads (zero proof) and UK timezone are neither claimed nor confessed.
- Spend asked as a relative range. Attach nothing.

## Open items before send
- The post wants one person. If this converts, a named team member has to own the week-to-week work before signature.
- Birthday Club figures are case-study only and cannot be checked against live data.

<!-- PROPOSAL START -->
Creator-heavy app and game accounts hit a testing trap on Meta. Every new video added to a live ad set is a significant edit, the kind that sends an ad set back into learning, and Meta's own fix, its creative test, only runs on Highest volume bidding. A title on a cost cap has to switch bid strategy to use it, which is also a significant edit, and on Advantage+ campaign budget that switch can put several ad sets back into learning at once.

The test is good: 2 to 7 new ads inside the running campaign, each getting delivery, winners kept running with learning intact. Delivery isn't split evenly between ads otherwise, so a lone new creator video can get written off on very little spend. I'd batch videos into fewer, bigger tests rather than drip them in.

That's also where I'd start on the platform. The Marketing API version splits the test budget evenly, so each batch of creator videos could be tested automatically. First check: Meta excludes Advantage+ shopping for now and doesn't mention Advantage+ app campaigns. Second: on iOS campaigns reporting through SKAdNetwork, results reach Meta at campaign level a day or more late, ad-level numbers may be modeled, and A/B tests only run at campaign level, so I'd score creators on Android first.

Straight on fit: our Meta book is about $1.9M in client spend this year, mostly lead gen and ecommerce. Apps are one past account, a small restaurant rewards app where cost per install went from $7.36 to $3.90 over 2,662 installs. We haven't run games or worked inside an MMP, so our app numbers stop at the install. That's a real gap for this role, better said now than on a client call.

We'd be a small team, not one hire: our Meta account manager with your team week to week, and me on the strategy side. AI already runs our morning account checks; what to test stays a human call.

Spend sets how many creator videos get a fair test each month, so where does a typical client account sit on Meta: under $10K a month, $10K to $50K, or above?
<!-- PROPOSAL END -->
