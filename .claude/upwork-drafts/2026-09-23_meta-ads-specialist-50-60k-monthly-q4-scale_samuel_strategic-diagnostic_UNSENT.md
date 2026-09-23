# Upwork Proposal - Meta Ads Specialist, $50k-$60k+/mo, scaling into Q4
Profile: Samuel Rainey | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-23 (Postgres now(), Central)
Length: 349 words / 2,011 chars (Samuel strategic band is 250-350 for a post with no screening questions; Upwork cap 5,000)
No attachments. No pricing quoted (post does not ask).

## SCREENS RUN
- Ads in scope: YES, Meta only, client-side. Not white-label, not profit-share, not a flat-fee portfolio
  owner, not coaching Upwork competitors, no detection-evasion shape.
- Spend: $50k-$60k+/mo STATED. Clears the $5k/mo floor by a wide margin. Screen PASSED on the bottom of
  the range ($50k).
- Full-time seat: NOT fired. Post says "long-term project", never "full time".
- Hourly floor ($40): no rate stated, so unmeasurable. No fee quoted.
- Geo: NOT STATED. US/CA/UK/AU screen left OPEN, not assumed. Asked in the close, and it is load-bearing
  here because the CPM series cited is mostly US auction behavior.
- Payment verification: CANNOT BE CHECKED. Only the pasted post text was supplied, no job URL, no client
  profile. Per the auto-DQ rule this needs eyes on the live posting before sending.
- Required items: ZERO numbered questions, so the proof-gap screen is light.
- Landing page / CRO not in scope, so the ads+LP-owned-together skip rule does not fire.
- Dedupe: no collision. Grepped upwork-drafts/, drafts/, .claude/upwork-drafts/, .claude/drafts/ and all
  .claude/agents/*/drafts/. Queried upwork_jobs for 'Meta Ads Specialist%' since 9/15 and for $50k/Q4-scale
  descriptions: the 9/22 "Meta Ads Specialist" row is Shots Creative Studio (Melbourne video studio), a
  different job. No second Creekside profile is bidding this one.

## VERIFIED LIVE THIS SESSION (Supabase execute_sql, 2026-09-23)
- Book blended Meta CPM, sum(spend)/sum(impressions)*1000, ALL accounts:
  Oct 2025 $24.45 ($207,671.93 / 1,456 campaigns) - Nov $33.78 ($213,933.26) - Dec $33.90 ($199,706.45)
  - Jan 2026 $24.17 ($215,811.93) - Jul 2026 $46.90 - Aug $37.99 - Sep MTD $38.09 ($118,030.50, 1,118
  campaigns, through ~9/23).
  Oct/Nov/Dec 2025 spend sits in a +/-3.5% band, so "essentially flat spend" is defensible at book level
  for that window only. Nov is +38.2% and Dec +38.7% vs Oct.
- Largest single Meta account (act_868498138612020, ACTIVE): $1,187,770.98 trailing 12mo = $98,980.92/mo.
  Discrete months Apr $102,651.79 / May $100,029.64 / Jun $99,803.03 / Jul $99,138.21 / Aug $96,862.44,
  Sep MTD $69,801.24 through 9/22. Second-largest account averages ~$17k/mo, so this is the only account
  at or above the prospect's band.
- Meta ad placements (facebook.com/business/help/407108559393196, in-app browser, 2026-09-23): Audience
  Network is STILL a current placement (native, banner, interstitial, plus rewarded video). QC raised a
  low-confidence flag that it had been wound down. That flag was WRONG; the line stays.

## QC + EXPERT REVIEW, AND WHAT CHANGED
qc-reviewer-agent returned FAIL on v1. Both blocking findings accepted and fixed:
1. Forecast rule. v1 read "That is not a prediction about this December. It means whatever Q4 premium
   arrives stacks on a base already higher than last year's holiday peak." The disclaimer was followed by
   a directional forecast. Rewritten to state observed levels only.
2. Parroting. v1 closed "What does scale as much as possible mean in your numbers" which echoed the post
   verbatim. Rewritten to ask for the CAC ceiling instead.
QC's adversarial finding also accepted: v1 cited Sep 2026 against last year's Nov/Dec while omitting
Jul 2026 at $46.90, which made the trend read as a climb toward a Q4 record. July and August are now
in the body. Including them makes the argument stronger, not weaker, because the point is that the
BASELINE reset, not that a spike is coming.
Precision fix: "a little under $100k a month" was average-true but not every-month-true (Apr and May
were at or above $100k). Replaced with the verified range, $97k to $103k since the spring.
expert-review-agent verdict was "marginal, leaning yes". Its highest-leverage change (creative testing
was entirely absent although the post names it) is now the fourth paragraph.

## DELIBERATELY OUT
- No CPA, CPL or ROAS from the ceiling account. Its conversions column is ~99% NULL, so any cost metric
  off it is a tracking artifact. Spend only. Expert review asked to pair the scale claim with a CAC
  outcome; there is no citable one, so the claim stays a capacity claim and says so plainly.
- The account is never named, and no principal is placed in a delivery seat. Book claims are pooled as
  "our team" / "the book".
- No attachment. The post asks for none, every Meta PDF in the book is a headline-peak ROAS/CPA document
  that argues against a "decompose the blended number" thesis, and the only Meta ecom PDF prints ~$8k/mo
  against a $50-60k/mo buyer.
- No certifications claimed. No links, URLs, calendar link or contact info (first touch). No em dashes.
  No sign-off name per the 9/4 ruling.
- Q4 is never called the year's CPM peak; July 2026 at $46.90 was higher, and it is in the body.

---

Most Q4 planning uses last year's Q4 as the reference point. Across the Meta accounts our team runs, this year's baseline already sits above last year's holiday peak, which changes what pushing budget in November costs you.

The book blended $24.45 CPM last October, stepped to $33.78 in November and $33.90 in December on essentially flat spend, then fell back to $24.17 by January. This year has run higher than that peak for months: $46.90 in July, $37.99 in August, about $38 so far in September. Last year's step reversed completely. The level underneath it did not.

At $50k to $60k going up, that decides what you judge the increase against. Blended CPA or ROAS mixes your account's performance with the auction's price, so in a rising-cost month it will tell you to throttle whether or not anything is wrong. Cost per outcome on the incremental spend is the number that answers it, which means fixing the ceiling and the measurement window before you push, not during.

Creative is the lever that is actually yours. Placement and bidding changes mostly move you along the auction's price curve. A better hook moves cost per outcome independently of it, which is why testing volume matters more in an expensive quarter, not less.

The trap is that the fastest ways to pull CPM down cost you elsewhere. Audience Network, fully broad targeting and heavy Reels weighting all drop cost per thousand quickly, and often drop conversion rate faster. Placement mix has to be judged on cost per outcome, never on CPM, which is exactly the metric an expensive quarter makes you stare at.

On scale, the largest Meta account our team runs has held between roughly $97k and $103k a month since the spring, so your range is inside what we handle, not at the edge of it.

What is the ceiling you are willing to push cost per acquisition to this quarter, and which markets are you buying in? Protecting a number and buying volume are two different quarters, and most of the calls above depend on which you are running.
