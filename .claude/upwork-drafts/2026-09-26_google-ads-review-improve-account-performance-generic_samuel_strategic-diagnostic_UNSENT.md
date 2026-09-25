# Upwork Proposal - Generic "review and improve our Google Ads account performance" (freelancer, implement + track results, no industry/spend/geo/rate)
Profile: Samuel Rainey (General) | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-25 ~17:30 US Central (DB now() 2026-09-25 22:28 UTC; filename uses the 9/26 Manila date like today's other drafts)

## THE POST (verbatim, this is all we have)
"We need a freelancer to review and improve our Google Ads account performance. The work includes analyzing current campaigns, identifying optimization opportunities, adjusting targeting and bidding strategies, and improving overall campaign efficiency. You should be able to recommend changes, implement updates, and track results to help increase performance and reduce wasted spend. Experience with account-level optimization and clear communication of findings is important for this role."

## SCREENS (run this session)
- Ads in scope: YES (Google Ads account review, changes made, results tracked).
- Platform: Google-only, so Samuel. Lindsey is a total platform fail (she cannot sell Google Ads); no twin drafted.
- NOT fired: white-label ("our Google Ads account"), full-time seat, hourly-seat wording, trial, required-items list, screening questions, CRO gate, gate word, hidden AI-canary line (post is four sentences, checked).
- NOT in the paste, so unscreened: ad spend, geo, hourly range or fixed price, payment verification, client history, industry. **Check the job page before sending.** The $5,000 anchor in the close sits AT our floor, so the question is not a spend screen; screen from the sidebar.
- Fee: none typed (post asks for none). The bid rate on General has been $90 on every recent Google-optimization bid; if the job turns out fixed-price, revisit. Raise the 90-day minimum and onboarding fee ($1,500 per platform, audit inside it) on a call, not in the body.
- Prior bid: none by text. `upwork_jobs` searched on five distinctive phrases ("communication of findings", "adjusting targeting and bidding", "reduce wasted spend", "recommend changes, implement updates", "account-level optimization"): no post with this wording. Same template family, different wording, both General at $90, both NOT viewed / NOT messaged / not won: 9/17 "Google Ads Optimization Specialist" (`c9f86e73`, US) and 8/10 "Google Ads Optimization for Supplement Brand" (`0b70444f`, Dominican Republic). Two data points only. A same-day bid would not have synced yet.
- Twin/sibling check (drafts folders, leads index, `git log`, narrow phrase grep, re-run right before QC and again before commit): no draft of this exact job. Nearest siblings are DIFFERENT posts by the same profile:
  - `2026-09-26_generic-google-ads-optimize-existing-campaigns-roi-parttime_samuel_strategic-diagnostic_v2_UNSENT.md` ("manage and improve our Google Ads campaigns", part-time). Its argument is branded search flattering ROI, so no overlap. It attaches the SAME Winterbotham PDF and closes on a spend bracket ($5,000 or $20,000). **If the job page or client name shows these two posts are the same buyer, send ONE profile-bid only, not both.** This draft reworded the Winterbotham paragraph and the close to keep shared 3-grams at 6 (generic phrases only).
  - `2026-09-26_national-preschool-40-locations-...` makes the location-bid-adjustment point in one sentence as support. Different buyer, different argument.
- The 9/17 sibling letter (`c9f86e73`) argued conversion-action corruption, PMax absorbing brand, and a "30 conversions per campaign per month" rule. That last figure is unverified; do not reuse it.

## THE ARGUMENT
Opener: bid adjustments (city, hour, audience) only exist on some bid strategies, so a review that recommends them without checking strategy lists changes the campaigns can't take. Then where changes go instead, and how results get judged (click-date reporting, learning triggers, dated log, equal-stretch comparison, custom experiment where volume allows). Winterbotham as the structure example. One spend question with a reason.

## VERIFIED THIS SESSION (Google help pages fetched 2026-09-25/26 US Central)
- **Help 2732132 (bid adjustments + Smart Bidding compatibility table):** Target CPA, Maximize conversions, Maximize conversion value = device "-100% only", location / ad schedule / audience / demographic all unsupported. Target ROAS = device supported, the rest unsupported. Quote: "If you make a manual bid adjustment to your automated Smart Bidding strategy, it won't be supported." Also: "Device bid adjustments for Target CPA allows you to modify the value of your CPA target, rather than the bids themselves." Performance Max: no bid adjustment types (one fetch omitted PMax from the table; the 9/21 and 9/25 fetches and the first fetch today said none). **Device is deliberately left out of the opener** because Target ROAS supports it.
- **Help 6270625:** "The primary conversion columns mentioned above are calculated based on the time of the click, not the time of the conversion." "Google's main conversion columns" is the scoped wording (by-conversion-time columns exist).
- **Help 6263057:** learning triggers = new strategy, setting change, composition change (campaigns, ad groups or keywords added or removed). "...so you may not want to measure performance until the learning period is over." No conversion or day count cited (the old "50 conversions" wording is gone from Google's pages).
- **Help 10683687 (About custom experiments):** "Custom experiments let you create custom experiment campaigns to test how your changes perform against your original campaign." You set "how much of your original campaign's traffic (and budget) you'd like it to use", so both arms run at the same time. Example on the page is a Target ROAS bid-change experiment. Supported: Search, Display, Demand Gen, Video. Standard custom experiments NOT supported for App and Shopping. So the draft says "Where a Search campaign has the volume".
- **Winterbotham Parham Teeple** (`case_studies` row d740fec4 + CLEAN PDF text re-read): bankruptcy law, Google Ads, Orange County. Prior period 117 conversions at $86.09; now 229 at $50.29; $11.5K spend, "Only $1.44K more than the prior period"; restructured into focused segments incl. an Orange County-only campaign; "Budget was reallocated toward the highest-converting markets and keywords". The PDF says "We restructured" and calls the conversions "qualified leads". No `reporting_clients` row, so no operator claim; the body says "Our team". The PDF's "four segments" text lists only three; the body does not count them.
- **Rejected proof, checked live:** Nightlark Google (acct 9235447590, Ahmed I., active): paused Shopping campaign spent $1,857.92 for 0 conversions (8/3 to 9/2) and paused Cold Search spent $2,148.86 for 1.5 conversions (ROAS 0.08). That reads as our own waste, and live branded ROAS is 2.13, not the "~4" the 8/27 call note says. Not used. Perfect Parking and Aura were used in the sibling v2, so they stay out here.

## ATTACHMENT
**SEND WITH `.claude/attachments/winterbotham_parham_teeple_CLEAN.pdf`** (785,596 bytes, real 3-page PDF, text re-read this session, zero localhost/Railway/http strings, tracked in git). Body says "Its case study is attached." Drop that sentence if the PDF is dropped. Do not attach the raw Drive download.

## REVIEW
- qc-reviewer-agent round 1: **PASS WITH FIXES**. Applied: (1) opener no longer claims "targeting" depends on bid strategy, only bid adjustments; (2) "Google's main conversion columns" (click-date wording scoped to the primary columns); optional fixes taken: "once learning has ended and", "main levers", case study under its own header, "put a bid strategy into learning" (was "a campaign").
- expert-review-agent: **Good**. Applied: sentence 1 rebuilt to a concrete claim that survives the preview cut; "nothing to act on there" softened to "changes those campaigns can't take"; search terms and negatives added to the levers; "Approved items get made in the account" added to answer "implement"; "Changes are easy to make and hard to grade" cut as an aphorism; custom experiments added for the seasonality confound (verified above); "shows the structure lever at work" cut. Not taken: "$5,000, $15,000, or more" (kept the two-anchor bracket per house rule), and any lead-quality claim for Winterbotham (no data).
- qc-reviewer-agent recheck on the revised text: **PASS**, no required fixes. It re-matched every Winterbotham figure to the PDF facts, found no house-rule violation, and confirmed the custom-experiment sentence is supported by the Help 10683687 quotes. Two optional fixes taken: "so seasonality hits both sides equally" (a concurrent run puts seasonality on both arms, it does not remove it) and "After the restructure, the account delivered" (less causal than "Restructured"). It also caught that the draft has THREE bold headers, not four.

## CONSTRAINTS
250-350 words (this: 345 incl. three bold headers, 334 prose, 2,107 chars). No sign-off, no URLs, no contact info, no price, zero em dashes. Bold headers per the 9/25 standing instruction (paste as literal asterisks); opener left un-headered. "Our team" for delivered work, never a named principal.

---

PROPOSAL (paste below this line)

Bidding up one city or down one hour of the day works on some campaigns in a Google Ads account and not on others. On Target CPA, Target ROAS, Maximize conversions and Maximize conversion value, Google's own table marks location, ad schedule and audience bid adjustments as unsupported, and Performance Max takes none. A review that recommends those adjustments without checking bid strategy first lists changes those campaigns can't take.

**Where changes go instead**

On those campaigns the main levers are budgets, targets, search terms and negatives, campaign structure, and what counts as a conversion. So the first pass labels each campaign by bid strategy and conversion goal, then sets the past quarter's spend against cost per result. The output is a short list ranked in dollars: what to cut, what to fix, what to leave alone. Approved items get made in the account.

**How results get judged**

Google's main conversion columns report a conversion on the date of the click, so where leads or sales lag the click, the newest days understate the result. A new strategy, a changed setting, or campaigns, ad groups or keywords added or removed can each put a bid strategy into learning, and Google says you may not want to measure performance until that ends. So every change goes into a dated log, and results are compared with an equal stretch beforehand, once learning has ended and conversions have landed. Where a Search campaign has the volume, a custom experiment runs the change against the original at the same time, so seasonality hits both sides equally.

**Structure in practice**

An Orange County bankruptcy firm was getting 117 leads at $86.09 each. Our team split its campaigns into focused segments, including an Orange County-only campaign, and moved budget toward the markets and keywords that converted. After the restructure, the account delivered 229 leads at $50.29 each on roughly $1,400 more spend. Its case study is attached.

Roughly what is the account spending each month, nearer $5,000 or $15,000? The answer sets how many campaigns it can feed with enough conversions.
