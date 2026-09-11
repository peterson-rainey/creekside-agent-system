# Upwork Proposal - UNSENT
Job: Facebook/Instagram Ads + Website Redesign / CRO. Existing business, wants one vendor across the whole
customer journey: Meta audit, build and manage campaigns, targeting and structure, creative/offer testing,
reduce wasted spend, pixel/CAPI review, retargeting, reporting. Second half is website redesign, mobile
experience, paid landing pages, clearer CTAs, conversion rate, messaging and layout recommendations.
Five required items. Open to a freelancer or small team. Potential ongoing relationship.
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-11 (Postgres now(), US Central)

DATE NOTE: harness said 2026-09-12; Postgres now() returned 2026-09-11 22:12 UTC = 2026-09-11 17:12 Central.
Used the DB per the standing rule.

## SCREEN: this post FIRES the ads+landing-page screen. Queenie chose "Draft anyway, gaps disclosed."
- Ads in scope: YES, Meta is co-equal half the post. PASS.
- **Website redesign / CRO is the other half, and it is BUILD scope** ("Redesign key pages", "Improve the
  mobile experience"). Out of service scope (Google + Meta management only).
- **TWO CRO-gated required items**, which is the documented line for this screen:
  item 2 "examples of websites or landing pages you've redesigned" and item 3 "examples where you improved
  conversion rate or overall sales after making website changes." Precedent is 6 skips vs 1 override, and the
  one override (NJ home services, 8/19) had ZERO CRO screening questions. Reported with a recommendation to
  skip; Queenie selected "Draft anyway, gaps disclosed." Both items are conceded outright in the body.
- Anti-workaround clause present: "not looking for someone who simply makes the website prettier or turns on
  some Facebook ads." Same shape as the 8/14 pet-care skip, where advisory-only CRO scope tripped it just as
  hard as build scope. No dodge available, so the draft does not attempt one.
- Spend: NOT STATED anywhere. $5K/mo floor is UNMEASURABLE, not cleared. Sixth consecutive time this screen
  has coincided with an absent spend figure. Close asks for it as a relative range.
- Geo: NOT STATED. US/CA/UK/AU screen unresolved. Not asked in the close (spend and site ownership were the
  two higher-value questions); flag for the reply if it comes back.
- Fee: post asks "project fee or ongoing monthly." % of ad spend is not excluded anywhere in the post, so no
  enumerated-exclusion collision. No dollar figure typed (spend unknown, so nothing is computable anyway).
  No hourly. The website half has no fee instrument and the body does not invent one.
- Full-time seat: no. White-label: no. Self-funded/profit-share: no. Detection-evasion: no.
  Worker-location requirement: no. Coaching Upwork competitors: no. Flat-fee portfolio owner: no.
- Duplicate bid: clean. Grepped all three draft directories for the post's distinctive phrases, and searched
  `upwork_jobs.job_description` for "prettier" / "entire customer journey" / "Website Redesign / CRO".
  No matching job row. No Lindsey twin drafted. (Post was pasted without a title, so the check is by
  description text only.)

## VERIFIED LIVE THIS SESSION (execute_sql -> contractor_query, 2026-09-11)
- **The CRO gap is REAL and re-verified twice.** `case_studies` scanned for landing page / CRO / conversion
  rate optimi / redesign / a/b test / hotjar / session record / bounce rate across summary + key_result +
  keywords: **ZERO rows.** (A first pass returned 5 rows because the regex matched "cro" inside "across";
  corrected with word boundaries and it returns nothing.) `agent_knowledge` scanned for a conversion-rate
  before/after or a landing-page/redesign service line: **ZERO rows.** No client in `clients` carries a web
  design, landing page or CRO service line; the three keyword hits (Fusion Dental x2, Neue Maison) list only
  ads management services.
- **Master Spa Parts** (Meta ecom, `act_2752863238119036`, operator Lindsey B., CHURNED 2026-05-28, past
  tense, genericized as "an ecommerce account our team ran" since there is no case_studies row and no PDF).
  Recomputed live this session, monthly, and it reproduces the prior verified pull exactly:

  | Month | Spend | CPM | CTR | Click-to-conversion | CPA |
  |---|---|---|---|---|---|
  | 2025-10 | $15,699.86 | $8.06 | 1.59% | 1.85% | $27.50 |
  | 2025-12 | $15,681.83 | $11.68 | 1.86% | 1.40% | $44.93 |

  Ratios: CPM x1.449 (+45%), CTR x1.171 (+17%), post-click conversion x0.757 (-24%), CPA x1.634 (+63%).
  Decomposition check: 1.449 / (1.171 x 0.757) = 1.635. Matches.
- **The "roughly half" phrasing is BANNED on this pair** (9/10 correction): on a log decomposition the auction
  is ~76% of the CPA rise, not half. Body says "most of it was the auction getting more expensive, and the gap
  between those two numbers is the account drifting on its own." No 50/50 split claimed, and no cause is
  asserted for the conversion-rate fall.
- Own-site tracking asset: `agent_knowledge` "Website Tracking Setup - GTM + Meta Pixel" (2026-08-14), second
  GTM container GTM-KFQDMCH5 removed from funnel pages, consolidated to GTM-MWQVSPJ. Stated as our own site,
  never as a client engagement.

## DELIBERATELY OUT
- No redesign portfolio claimed, no CRO results claimed, no conversion-rate before/after. Both are hard zeros.
- No CAPI implementation claimed. Pixel/CAPI is a service-line zero, so the body speaks diagnostically about
  what bad event setup does and cites only the own-site duplicate-container catch.
- Jybr and the dental funnel are NOT cited. They are Creekside's own properties with zero performance data,
  and on a post whose whole ask is "show me a site you improved," offering our own pages invites the exact
  follow-up we cannot answer.
- No availability assertion. Item 5 asks for it and nothing in the book records Samuel's current capacity, so
  the body states the engagement shape (ongoing monthly, not a project fee) without inventing a start date or
  an hours figure. **Queenie: add a line if you want availability answered directly.**
- No attachment. Every CRO-adjacent artifact is a zero, and the Meta PDFs either fail live verification
  (Punch Drunk Chef) or are unverifiable (Fitness Superstore, Duck A Diet). Master Spa Parts has no PDF.
- No pricing figure, no hourly rate, no links, no calendar link, no contact info, no em dashes.
- UNSIGNED per the no-name-signoff ruling.

## CHAR COUNT
Body is 2,234 characters, 398 words (measured, not estimated). Under the 5,000 Upwork cap and inside the
samuel_strategic ceiling of 400 words for a multi-question post. First draft ran 462 words and was trimmed.

## QC
qc-reviewer-agent and expert-review-agent have no working Supabase tool in this session (documented gap), so
QC ran inline against the live queries above. Every number in the body traces to one.

---

When the ads look healthy and the sales do not follow, the thing that actually moved is usually hiding inside cost per sale. That number is built from three others: what impressions cost, how many people click, and how many of those clickers buy. Split them apart weekly and they tell you which half of the journey broke. A rising CPM on its own is the auction getting more expensive. Click-through sliding is the ad or the audience. Click-through holding steady while the post-click rate falls is the page, the checkout or the tracking, and no amount of creative testing fixes that one.

An ecommerce account our team ran shows the shape. October to December, on nearly identical spend, cost per purchase rose 63%. CPM was up 45% and click-through actually rose 17%, so the ads were pulling harder. What fell was the share of clickers who bought, down about a quarter. Most of that cost rise was auction pressure, and the gap between those two numbers is the account drifting on its own. Rotating out creative would have been the wrong call there, and it is the usual one.

Straight about two things you asked for: there is no website redesign portfolio here, and no before and after conversion rate to show you. Our book is Google and Meta management. If the person you hire has to own the redesign itself, keep looking. You would find that gap in week three anyway.

What we would own is the ads and the diagnosis. Which pages paid traffic lands on, where it leaks, whether the ad and the page make the same promise, and what to change, written as briefs your developer or designer builds. The person reading the click data is then the one specifying the page.

Worth asking anyone you talk to what they check before trusting a conversion number at all. Duplicate events, a second tag container firing on the same pages, a thank-you page URL that changed quietly. We found a second container on our own site recently and cut it. A conversion drop is sometimes just a tracking drop.

On shape, the ads side is ongoing monthly work rather than a project fee.

Two things would let me size this. Roughly where does monthly ad spend sit, closer to $5,000 or $25,000? And who owns the site build today, an in-house developer or nobody?
