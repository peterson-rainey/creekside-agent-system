# Upwork Proposal - Bree Coach (AI personal growth / coaching consumer app, early-stage B2C UA)
Profile: Samuel Rainey | Style: strategic | Status: UNSENT, GAP-FIRST | Date: 2026-09-24 (US Central, Postgres now(); local clock read 9/25)
Chars: 4,951 | Em dashes: 0 | Attachments: NONE | Links: none | Price: structure only, no figure

## SCREEN: recommend SKIP. Drafted gap-first on Queenie's explicit "generate, strategic version".
Required-items screen fires hard. Of six required items, three are unanswerable from our book:
1. "Two or three consumer apps you've supported" -> we have ONE (Birthday Club App), team work, churned.
2. Per-platform experience across Meta / TikTok / Apple Search Ads / Google App Campaigns -> Meta only. Three of four are zero.
3. "Examples of in-app events and attribution tools you've implemented or managed" -> ZERO MMP. No AppsFlyer, no Adjust,
   no SKAN conversion value schema. Post explicitly asks to separate personally-configured tracking from dev-coordinated work.
5. "One campaign example... ideally beyond installs" -> our app numbers stop at the install.
Items 4 (budgets) and 6 (availability / rate / 30 days) are answerable.
Precedent: this is the same shape as 2026-09-16 (new social app, Apple Search Ads) and 2026-09-16 (UK creator platform, apps+games),
both of which Queenie overrode to "draft anyway, gaps first". Upwork app-bid record: ~12 app/app-adjacent bids since 8/11, ZERO won,
zero messaged. Closest prior posts: "Media Buyer / Paid Ads Specialist - Self-Development App (iOS & Android)" (FRQNCY, UK, 8/31)
and "Meta Ads Performance Marketer for Wellness App" (Quantum Body, 9/12). Neither is this buyer. No upwork_jobs row for Bree Coach,
no existing draft file -> FIRST SIGHTING, no duplicate bid risk.
Not screened out on: spend (unstated, $5K floor unmeasurable), geo (unstated), white-label (n/a), full-time seat (not worded as one).

## VERIFIED LIVE 2026-09-24 (contractor_query against Supabase; Meta help read in the in-app browser)
- case_studies: ONE consumer app. "Birthday Club App", Meta Ads, key_result "Drove 2,662 app installs and cut cost per install
  47% (from $7.36 to $3.90) through campaign restructuring and systematic creative testing." keywords include restaurant/dining/
  rewards/loyalty, so "restaurant rewards app" is supported. "BDC App" is the same account with no metric. ReferPro is B2B SaaS.
- reporting_clients: Birthday Club App, meta, monthly_budget $2,000, status churned, AM Cade, operator NULL -> team work, past tense,
  NEVER first person. Cannot be re-derived from live data (no app-install objective in meta_campaigns).
- reporting_clients.platform distinct = meta, google, email, chatgpt, other, lsa, programmatic. NO tiktok. TikTok proof = zero.
- Zero agent_knowledge rows mention AppsFlyer or Apple Search Ads.
- Meta book monthly_budget range across 42 accounts: $900 to $100,000 -> "about $1,000 a month to $100,000".
- meta_insights_daily 2026 YTD = $1,945,624 -> "about $1.9 million".

## Meta mechanics, read verbatim in the in-app browser 2026-09-24
- Help 584603712214119 (SKAdNetwork reporting): "delays of at least 24 hours. Results will be reported based on the time they are
  reported to Meta, and not when they occurred." / "aggregated at the campaign level. To provide a more complete view of results,
  statistical modeling may be used at the ad set and ad levels. If there is a single ad OR ad set in the campaign then statistical
  modeling won't be used." / "doesn't support 1-day, 7-day or 28-day click-through or view-through attribution windows." /
  "A/B testing is only available at the campaign level." / limits do not apply to AEM campaigns, Android, or iOS 13 and below.
- Help 112167992830700 (learning phase): exits "usually... after about 50 results in the week after the ad set's last significant
  edit"; "By combining similar ad sets, you also combine learnings."
- Help 721422165168355 (About AEM), app events section: "Aggregated Event Measurement has expanded to include campaigns that use
  the app promotion objective. This means you can now run app promotion campaigns without configuring app events for Apple's
  SKAdNetwork, and more app events will be available for ad delivery optimization." / AEM as campaign attribution method gives
  "near real-time reporting" and "access to 1-day click and 7-day click reporting for campaigns that use app event optimization
  and value optimization." / "It's currently not supported for custom event optimization." / eligibility checked in Events Manager.

## Review log
- qc-reviewer-agent: PASS WITH FIXES. Applied: (1) SKAN modeling exception corrected from "single ad set AND a single ad" to
  "OR", which is what Meta's page says and was a real error; (2) required item 4 (budgets managed) was unanswered, now answered
  with the verified $1,000-$100,000 range and the app's own $2,000/mo; (3) availability was missing from item 6, now "inside a
  week". REJECTED: QC flagged "restaurant rewards app" as unsupported, but case_studies keywords carry restaurant/dining/rewards.
- expert-review-agent: "Needs Work", one claimed BLOCKER on AEM. I checked the objection against Meta's own AEM page rather than
  accepting it: the reviewer's claim (that AEM only runs in parallel with SKAN and never replaces it) is CONTRADICTED by Meta's
  text above, which says AEM campaigns can run "without configuring app events for Apple's SKAdNetwork". The reviewer's sources
  were third-party. The AEM framing was kept and strengthened with the verified payoff, and the genuinely valuable find from that
  page, that AEM does NOT support custom event optimization, was added because it lands precisely on this client's funnel events.
  ALSO APPLIED from the review: the MMP question (real launch dependency, now in the close). NOT APPLIED: the claimed Feb 2026
  Advantage+ App Campaigns default-merge, MEDIUM confidence from third-party sources only and not verified in Meta's own docs,
  so nothing is asserted about it either way and the narrow-structure recommendation was demoted to a fallback behind AEM.

## Open items before send
- Birthday Club figures are case-study only and cannot be checked against live data. Attach nothing (PDF is compromised).
- No price figure is typed. Standard terms are marginal % of spend, $1,500 minimum and $1,500 onboarding per platform
  (pricing-reference.md); the number cannot be computed until the spend bracket comes back.
- If this converts, a named Meta account manager has to own week-to-week work before signature.

<!-- PROPOSAL START -->
The funnel you laid out is readable on Android and largely modeled on iOS. That is not a tracking setup problem, it is how Apple's SKAdNetwork hands results to Meta, and it decides your campaign structure before anyone writes an ad.

Under SKAdNetwork, results reach Meta aggregated at the campaign level, at least 24 hours late. Ad set and ad level numbers come from statistical modeling unless the campaign holds a single ad set or a single ad. The 1, 7 and 28 day windows do not apply, and A/B tests run at campaign level only. So a genuinely measured read of one creative means a campaign per ad, while Meta's other guidance pushes the opposite way: combine ad sets, because combining them combines learning, and an ad set needs roughly 50 results in a week to leave the learning phase. Most early app accounts resolve that by accident. A wide structure, modeled numbers read as though they were measured, and creative killed on evidence that was never there.

Which is why the first thing I would check is not structure. It is whether your app is eligible for Aggregated Event Measurement. Meta has extended AEM to the app promotion objective, and where AEM is the campaign attribution method you can run app promotion without configuring SKAdNetwork events at all: near real time reporting instead of a 24 hour floor, 1 day and 7 day click reporting back, and more app events available for delivery optimization.

The catch sits exactly where your funnel sits. AEM does not currently support custom event optimization. So whether a first coaching interaction or a repeat session can be a bid target at all depends on how those events are defined, which is a decision to make with your developers in week one rather than discover in month two.

The second decision is which event campaigns bid toward. Your list ends at a paid subscription, the event that matters and almost certainly the wrong one to bid on at launch. At roughly 50 results a week per ad set, an early app on disciplined budgets will not produce enough subscriptions to pull an ad set out of learning, so bidding to subscription starves delivery while the report reads like the creative failed. The deepest event that clears volume becomes the bid target and subscription stays the scoring metric.

**Where we do not clear your bar**

Five of your six questions get a straight answer.

Consumer apps supported: one, not two or three. A restaurant rewards app on Meta, where cost per install went from $7.36 to $3.90 across 2,662 installs after a restructure. It had been optimizing for traffic and pointing at a web page instead of the store listing. That was our team's work rather than mine personally, and the account has since churned.

Platforms: Meta is real. TikTok, Apple Search Ads and Google App Campaigns are zero delivered accounts between them.

In-app events and attribution: we have never run an MMP. No AppsFlyer, no Adjust, no conversion value schema shipped. On the distinction you asked for, what we have configured ourselves is web side, pixel and Conversions API and server side event work. Everything above is documented behavior I have read closely, not behavior I have shipped against.

Budgets managed: individual Meta accounts on our book run from about $1,000 a month to $100,000. The app was one of the small ones, roughly $2,000 a month.

A campaign example past the install: our app numbers stop at the install, so there is not one.

If hands-on early-stage mobile UA with MMP work is the bar, we do not clear it, and that is better said here than on a call. What we do have is about $1.9 million in Meta spend across our book this year, mostly lead generation and ecommerce, and the discipline that comes with it: creative batched into tests large enough to read, and budget and bid changes handled so ad sets stay out of learning.

**First 30 days**

Week one is measurement rather than spend: which events exist, whether they fire, AEM eligibility, and the bid target agreed with your developers before anything runs. Week two, Meta live, structured so the reads you need are measured rather than modeled. If AEM is not available, Android goes first for the honest creative read, since Android reporting does not depend on SKAdNetwork at all. Weeks three and four, creative tested in batches rather than drip fed, and a first real read of where people stop between install and the first coaching session.

**Availability and terms**

A Meta account manager would run the account week to week with me on structure, so this is a small team rather than a single hire. We can start inside a week.

We do not bill hourly. Management is a percentage of ad spend with a monthly minimum per platform, plus a one time onboarding fee per platform, and the percentage steps down as spend grows. Two things would tell me most: are you on an MMP already, and where is monthly paid spend heading in the first quarter, under $10K, $10K to $30K, or above that?
<!-- PROPOSAL END -->
