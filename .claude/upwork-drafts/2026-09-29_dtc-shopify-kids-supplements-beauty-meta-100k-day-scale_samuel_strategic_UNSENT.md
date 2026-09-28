# Portfolio of 3 DTC Shopify brands (kids' supplements, wellness, beauty), Meta media buyer to $100K/day, Samuel: DRAFTED, gaps disclosed

Date: 2026-09-29. Style: Samuel strategic-diagnostic (user explicitly asked for "the strategic version").
Status: **UNSENT**.

## Context

Same job independently screened under Lindsey earlier today and SKIPPED (see
`2026-09-29_dtc-portfolio-kids-supplements-wellness-beauty-meta-100k-day-scale_lindsey_default_SKIP.md`).
This session ran the same required-items screen, reported it to Queenie before drafting per the standing
rule on unanswerable proof demands, and she chose **"draft anyway, gaps disclosed"** rather than skip.

Two hard gaps, both disclosed directly in the proposal body rather than glossed over:
1. **Scale** — job requires proof of $50K+/day on Meta for ecommerce. Our real ceiling: ~$3,300/day
   (Laleh, dental/aesthetics, lead-gen not ecom, no CPA/ROAS citable). Largest ecom account ever run
   (Neue Maison, furniture, churned): peaked ~$40,389/month (~$1,300/day), tenure-wide (4/10-8/10/26)
   sales-objective slice $91,824.76 / 334 conversions / $274.92 CPA.
2. **Vertical** — zero supplement, zero kids, zero live beauty-ecommerce proof anywhere in the system.

## Numeric corrections made during drafting (for the record)

The first-draft version (from `upwork-proposal-agent`, which had no SQL access and worked off secondhand
figures I fed it) cited "$91,500 over four months at $274 CPA." I then pulled `meta_insights_daily` live
myself to sharpen the peak-month figure and made **two consecutive calculation errors**:
- First pass: `AVG(roas)` unweighted across daily rows -> **14.9x** for July 2026 (wrong; a few small-spend
  days with abnormally high daily ROAS skewed the naive average).
- Second pass: weighted by spend but filtered the denominator to `roas IS NOT NULL` rows only -> **5.66x**
  (still wrong; excludes the ~26% of July spend with no roas value from the denominator).
- QC review (`qc-reviewer-agent`) caught the first version's 14.9x against 9+ independently re-verified
  prior sessions all landing on **4.17x**, sourced from `reference_neue_maison_dtc_scale_proof.md`.
- Correct method: `SUM(spend*roas) / SUM(spend)` over ALL rows (COALESCE null roas to 0 in the numerator,
  keep full spend in the denominator) = $168,244.46 / $40,389.21 = **4.17x**. Matches the memory file exactly.
- Also corrected: the memory file explicitly warns never to pair "$105,010" (whole-tenure spend, including
  ~$13K of lead-type spend) with "$275" (the sales-objective-only CPA) in the same breath. Final draft
  pairs $275 CPA correctly with the $91,824.76 sales-objective slice ("roughly $92,000"), not the $105K
  total.
- Also corrected: the July 4.17x is 59% carried by a sitewide discount promo and another ~19% by
  retargeting (77.6% of that month's spend combined), per the file's decomposition. Final draft volunteers
  this breakdown in the Q1 answer rather than letting a sharp buyer find it — matches the file's explicit
  "volunteering it first is the stronger play" guidance.
- Dropped "orders"/"purchases" language entirely (the 334-conversion figure has an unresolved asterisk
  around a Membership campaign's 39 conversions that may not be product purchases) — final draft says
  "conversions"/"spend" only, never "orders."

## QC + expert review

- `qc-reviewer-agent`: FAIL on the first version (blocking: fabricated 14.9x ROAS, described above).
  Structure/style otherwise clean (opens with "SCALE", answers all 6 screening questions, no em dashes,
  no certifications claimed, no Blush Camera reference, correct Laleh CPA/ROAS restriction, ends on a
  "Suggested case study" block not a name sign-off).
- `expert-review-agent`: Needs Work on the first version. Flagged: reporting cadence (draft promised
  daily+weekly, house policy is biweekly + live dashboard, never promise weekly) as a HIGH-risk standing-
  rule conflict; CBO/ABO framing read as dated 2022/23 logic vs. current CBO-default practice; no mention
  of CAPI/attribution rigor despite claiming "unit economics over platform ROAS"; creative-testing cadence
  (10-15/week, taken verbatim from the job's own Q4) undersold relative to the "more winners than you can
  spend" thesis, no whitelisting/Advantage+ mention.
- All of the above were fixed in the final version below (ROAS corrected + volunteered breakdown used as
  the concrete "we don't trust platform ROAS" proof point; reporting cadence rewritten to biweekly +
  dashboard with an offered weekly-summary add-on; CBO/ABO modernized to CBO-default + tactical ABO +
  duplicate-into-scaling-campaign; CAPI/pixel match-rate line added; whitelisting + Advantage+ variants
  added to the creative-testing answer). Not re-run through a third QC/expert pass; the fix directly
  resolves QC's blocking finding and is independently re-verified against both a fresh live SQL pull and
  the canonical memory record (9+ prior convergent verifications).

## Mechanical facts

- Starts with literal "SCALE" (their explicit gate).
- Answers all 6 screening questions.
- 4,958 bytes / ~4,957 characters (Upwork limit 5,000).
- No pricing figure typed (rate structure unstated in the post); closes by asking their current/target
  spend as a relative range instead.
- No case study attached (none are honestly attachable at this scale/vertical — disclosed in the closing
  block rather than forcing a mismatched attachment).
- No contact info / links (first-touch proposal).

## Final proposal (ready to paste into Upwork)

SCALE. Getting three Shopify brands to $100,000 a day in spend without CPA drifting is a supply and infrastructure problem before it is a media buying one, you need more tested creative winners than you can spend on and enough BM and account redundancy that a scale push does not stall on a policy flag. I want to be straight about where we actually sit against that before anything else. The largest single Meta account our team runs tops out around $3,300 a day, an ongoing dental and aesthetics account, and the biggest e-commerce account we have managed was a furniture brand that peaked at about $40,000 in its best month, close to $1,300 a day, and tracked roughly $92,000 in sales-driving spend at a $275 CPA across its four month run, not $50,000 a day. That's a real gap against your floor, better to say it now than waste your time.

**What we'd actually bring**
Where we do have real reps is in the mechanics: reading CPM by geography and audience, keeping budgets under CBO by default and using ABO only to protect a new winner while it proves itself, and deciding scale versus kill off unit economics instead of whatever ROAS the platform hands us. On one ecom account, UK versus US Meta CPM data, 27 dollars against 41, told us where incremental budget bought cheaper impressions. On another, we broke a headline ROAS down by campaign and found most of it was one promo, not cold traffic, the same lens we'd bring to your CPM spike. We also watch CAPI match rate so a tracking gap doesn't quietly inflate CPA. We have not touched supplements or kids products, and have no live beauty ecommerce account either, so the vertical is genuinely new even though the mechanics are not.

**Screening questions**
1. Highest spend, CPA, ROAS: around $3,300 a day is our ceiling on the lead-gen side, that dental and aesthetics account. I won't give you a CPA or ROAS for it, it runs on cost per lead, not ecom economics, and forcing a number would not be honest. On the ecom side, our largest account, a furniture brand, peaked at about $40,000 in its best month, roughly $1,300 a day, and across its four month run tracked about $92,000 in sales-driving spend at a $275 CPA. On ROAS, the honest answer depends which slice you look at: that peak month blended to about 4x, but close to 78 percent of that month's spend sat in a sitewide discount and retargeting, not cold prospecting. That's exactly the kind of platform-reported number we'd break down rather than hand you at face value. The account has since churned.
2. CPM up 30 percent week over week: first I check whether it's auction wide or just us, then frequency and creative fatigue since that shows fastest, then audience overlap, then structure changes. Inside 48 hours I'd have fresh creative queued, cap cost on the worst ad set to protect CPA while diagnosing, and hold budget rather than cutting, since cutting into a spike usually resets learning and makes it worse.
3. New ad beating CPA target by 40 percent after two days: two days is thin, so first I duplicate it into the existing scaling campaign under the same CBO rather than hand-raising its own ad set budget, let delivery reallocate toward it, and only push net new budget 20 to 30 percent every 2 to 3 days once it's proven past a real sample. Horizontal scaling into new audiences comes once vertical scaling plateaus.
4. Structuring 10 to 15 creatives a week: group by hook or angle, run a dedicated testing campaign with a floor budget per ad so each gets a fair read, and kill anything that hasn't hit a CPA or hook rate benchmark inside 3 to 4 days of real spend. Winners graduate into scaling, and once the creator roster runs thin, whitelisting top organic posts and Advantage+ variants extend supply without new shoots.
5. Supplement or health brand experience: none specifically, and I'd rather say that than stretch it. What we do have is restricted category work from dental and medical aesthetics, where Meta's health claims policy and disapproval patterns run just as strict. That transfers to keeping supplement ads compliant, but it's not the same as having run one before.
6. Reporting: a live dashboard you can check anytime, same-day flags if something needs your attention, and a full written report every two weeks on what moved, why, and what's next. Can layer in a lighter weekly summary too if you want it.

**Where you're at**
Rather than guess, where does the portfolio actually sit against that $50,000 a day floor, meaningfully under it, close, or already past it and pushing further? That changes whether this is a scaling problem or closer to a rebuild.

**Suggested case study**
Being straight here too, none of our e-commerce case studies are attachable at your scale or vertical. The closest ecom work we have, furniture and survival gear, proves testing and scaling discipline, not supplements, wellness, or beauty specifically, so I'd rather not attach something that overstates the match.
