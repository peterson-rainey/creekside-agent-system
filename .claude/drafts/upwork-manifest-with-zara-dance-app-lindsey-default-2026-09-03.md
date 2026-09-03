# Upwork Proposal - Manifest with Zara (dance training app, mobile growth)
Profile: Lindsey | Style: lindsey_default | Status: UNSENT | Drafted 2026-09-03

**DRAFTED ON EXPLICIT OVERRIDE.** Four settled screens fire on this posting (see screening notes). Queenie chose "draft anyway, full disclosure" on 2026-09-03.

---

Do you know what share of those 5,000 downloads came from people who already followed Zara before they saw the post that converted them?

That number decides most of what happens next, and it is the one most app teams do not have yet. Organic hooks work partly because the viewer already trusts the person on screen. Paid takes those same hooks to people who have never heard of her, and the familiarity was doing a lot of quiet work in the background. The angles that convert best organically are often the ones that fall hardest cold, because they assume a relationship that is not there yet. Nothing wrong with the hooks. They just have to earn in three seconds what her following already gave for free.

A consumer app our team ran on Meta landed 2,662 installs with cost per install cut from $7.36 to $3.90, and almost none of that came from cleverer targeting. It came from restructuring the account and testing creative until the winners were obvious. After 10 years, and building and selling my own e-commerce brand before that, the pattern I keep seeing is that install cost falls when the creative gets sharper, not when the audiences get narrower.

One thing worth raising now rather than in week six. A subscription app judged on return inside 60 days is being judged before most of its revenue has arrived. If dancers start on a trial before they subscribe, early spend will look worse than it is, and the honest fix is agreeing upfront which event we are optimizing toward and what payback window counts as success.

Straight with you on scope. Meta is my lane. Apple Search Ads and TikTok are not, and AppsFlyer is not a platform I have run.

I have attached some relevant results below. There is also a short video on my profile covering how I work.

---

## Screening notes (internal, not part of the proposal)

**Style:** Request said "Lindsey's strategic version ... write it in lindsey_default." `strategic` is a Samuel-only label; Lindsey has exactly one sanctioned style. Written as lindsey_default per the explicit instruction. Mismatch resolved, not left open.

**FOUR SCREENS FIRE. Drafted on explicit override 2026-09-03.**

1. **Ad spend below the $5,000/month floor.** $5,000-$10,000 is a *total* testing budget across a 1-2 month period, so the monthly equivalent is $2,500-$5,000. Screening the bottom of the range gives $2,500/mo. Also below Lindsey's own $3,000/mo Meta minimum.
2. **Hourly only, $15-$60/hr.** Bottom of range is $15/hr against the $40/hr listed minimum. No percentage-of-spend path is offered anywhere in the post. The paid-test carve-out to the never-bill-hourly rule is arguable here since the trial gates ongoing work, but the rate floor still fails on its own.
3. **1-2 month performance trial** against the 90-day minimum. Decisive factor: the budget is **capped**, which is the condition that forecloses rather than leaves the screen open.
4. **Required-items foreclosure.** 3 of the 7 requested application items are unanswerable (AppsFlyer/attribution, Apple Search Ads, hands-on TikTok).

**Verified live against the DB, 2026-09-03 (Postgres `now()`, not the local clock):**
- **AppsFlyer / SKAN / mobile attribution / app-install: ZERO.** Keyword sweep of `agent_knowledge` for appsflyer, SKAN, apple search ads, app install returned only unrelated internal ops entries. No MMP experience exists anywhere in the system.
- **Apple Search Ads: ZERO.** No such platform value exists in `reporting_clients`.
- **TikTok: ZERO RESULTS, and worse than a clean zero.** Two rows only, both Lindsey's, both unlaunched: Doctor Laleh (`platform=tiktok`, status active, notes "Lindsey needs to get tiktok situated", no operator, no ad account) and Nightlark (`platform=other`, notes "TikTok launch deferred pending IG Reels test on Meta"). Confirms the existing memory. Style spec independently bars Lindsey from naming TikTok as a service, so the concession is doubly required.
- **App-install proof = ONE churned case study.** `case_studies`: Birthday Club App, Meta Ads only, "2,662 app installs and cut cost per install 47% (from $7.36 to $3.90)". `reporting_clients`: **churned 2026-01-01**, $2,000/mo, account_manager **Cade**, platform_operator null.
- **The Birthday Club CPI figures CANNOT be verified live.** Checked all Meta campaign objectives: there is **no APP_INSTALLS objective among the 1,812 campaigns** in `meta_campaigns`, and no Birthday Club campaign rows exist. `meta_insights_daily` covers 2025-09-03 onward and holds nothing for this account. The numbers are case-study-only, consistent with the standing warning that case-study cost figures fail live verification. Cited because it is the only mobile-app proof that exists; **no attachment of its PDF is promised** (that PDF 404s per prior ruling).
- Birthday Club is written as **"our team"**, never first person. account_manager is Cade, not Lindsey, so pooling the book is required and first-person attribution would be false.
- Second app row, **BDC App**, deliberately NOT cited: `key_result` is "Digital marketing campaign for a B2B/B2C application" with no metric attached. Unciteable.
- **Duplicate-bid check: no matching row in `upwork_leads`, and zero matching drafts across all four draft directories on either profile.** Fresh posting.

**What the draft concedes outright:** Apple Search Ads, TikTok, and AppsFlyer, all named explicitly. No attempt to imply mobile attribution experience we do not have.

**Lead angle:** the organic-to-paid familiarity gap. Their 5,000 downloads came through Zara's own following, where the creator relationship does the persuasion for free. Cold paid traffic strips that out, which is why organically-proven hooks routinely underperform as ads. Second angle is the measurement trap: a trial-based subscription app judged on ROAS inside 60 days is being scored before its revenue lands.

**Deliberate omissions:** no pricing or hourly rate (lindsey_default carries no fee table first touch, and stating a rate inside a $15-60 band would either anchor low or self-disqualify). No calendar link, no URLs, first touch on a job post. No sign-off name. No em dashes. Principals never named as the worker.

**Screens that remain OPEN and were NOT cleared:**
- Geography is never stated in the post. Not cleared against the US/CA/UK/AU rule.
- The hourly-only structure is unresolved and will surface the moment rate is discussed.
- Whether the $5-10K is genuinely a floor with real scaling budget behind it, as the post hints, or a hard ceiling.

**Length:** 315 words, 1,765 characters. Within the 200-350 multi-question window, far under the 5,000 character Upwork limit.
