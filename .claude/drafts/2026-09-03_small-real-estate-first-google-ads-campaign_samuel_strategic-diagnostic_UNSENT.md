# Upwork Proposal - Small real estate company, first Google Ads campaign (setup + keyword research + monitoring)
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-03 (Postgres now(), US Central)
Length: 391 words / 2216 chars. Well under the 5,000 char hard limit. OVER the 350 style ceiling, under the 400
hard ceiling. Deliberate: the keyword-planner price tier, the disclosed spend base and the missing call
action all earned their place. Flagged rather than hidden. Rev 3, post QC + expert review.

## RESOLUTION

- Step 0 (already-drafted check) run against BOTH folders: `.claude/drafts/` and
  `.claude/agents/upwork-proposal-agent/drafts/`. Grepped "real estate", "first campaign", "adwords".
  ZERO relevant hits (only false positive: a Lindsey timeboxed-measurement draft). No `upwork_leads` row.
  First submission, no duplicate-profile risk.
- Style named by Queenie ("strategic + diagnostic"), profile not named. Strategic is Samuel-only, so Samuel.
- **UNSIGNED**, per the 2026-09-01 workspace precedent. `docs/samuel-strategic.md` still says sign "Samuel"
  and is STALE against the 2026-08-29 rename.

## SCREENS RUN

| Screen | Result |
|---|---|
| Ads in scope | PASS. Google Ads setup, keyword research, monitoring. Core work, nothing else in scope. |
| Client names themselves as operator | PASS. They are hiring out, not buying coaching. |
| White-label / subcontractor | PASS. Direct client. |
| Full-time seat | PASS. No "full time" language, no hours-per-week count. |
| Self-funded / profit-share | PASS. They fund spend. |
| Coaching Upwork competitors | PASS. |
| Detection evasion | PASS. |
| Flat-fee portfolio owner | PASS. Not a portfolio landlord. |
| **Hourly ban** | **AT RISK.** "consult, setup, monitor" reads like an hourly posting. We never bill hourly for management. See PRICING. |
| **Ad spend** | **NOT STATED.** "small campaign" + "small company" is a real sub-$5K risk, but an unstated budget leaves the screen OPEN rather than foreclosing it. Asked in-body as a relative range, no brackets. |
| **Geo** | **NOT STATED.** US/CA/UK/AU screen OPEN, not passed. Asked in-body. |
| Required items | PASS. No unanswerable proof demand, no certification request. |

**The honest risk, stated plainly:** this is the profile most likely to come back under $5K/mo. If they do,
the standing routing is Keith below $3K, decline below $2K. Worth knowing before Queenie invests in a follow-up.

## PRICING - QUEENIE DECISION REQUIRED

Body quotes NO price (the post does not ask in-body). But Upwork requires a bid number, so a number gets
chosen before this sends.

Canonical instrument (`pricing-reference.md`, current as of 2026-05-25): onboarding **$1,500 per platform**,
audit included. Google only = **$1,500 one-time**. Management is 20% of spend to $30K with a **$1,500/mo
minimum per platform**; the minimum threshold is $7,500 of spend, so at any "small" budget the **$1,500/mo
minimum is what applies**, not the percentage.

**Hourly collision.** If Upwork forces an hourly rate field on this posting, the standing rule is that we do
not bill management hourly. Samuel's listed rate is $73/hr. Recommend submitting fixed-price against the
onboarding fee and letting management price itself once spend is known. Not my call.

## VERIFIED LIVE THIS SESSION (Google Ads connector + contractor_query, 2026-09-03)

**Canvas Homes** (`clients`): ACTIVE, industry Real Estate, Google Ads only, monthly_budget $5,000,
target_locations Nashville TN, start_date 2026-07-29, customer 8835651880. **Our only live real estate account.**

**Account lifetime (LAST_90_DAYS = its whole life, 7 campaigns):**
$2,541.46 spend / 12,482 impressions / 210 clicks / **0 conversions**. Blended CPC $12.10.

**The campaign the proposal cites** (`SellMyHomeFast-Nashville-8.11-8.20-8.23`, id 24127091936, now PAUSED):
$2,401.58 / 1,314 impr / 46 clicks / **$52.21 CPC** / 0 conversions.

**Search terms report, ALL_TIME, that campaign** (the diagnostic core):
25 rows / 24 unique terms / 383 impr / 22 clicks / **$1,106.80** / **0 conversions**.
- **18 of 25 rows are NEAR_PHRASE or NEAR_EXACT** (Google close variants), not the chosen keyword.
  Only 3 rows carry status=ADDED, covering 2 unique terms ("sell my house for cash", "sell my house fast").
- **Competitor brand searches: $158.95** — "oakridge homebuyers" $135.38 (3 clicks, $45.13 CPC),
  "jenkins homebuyers" $23.57. Plus "oakridge home buyers", "redwood home buyers", "clever offers",
  "mark spain vs opendoor" at $0.
- **iBuyer research traffic: $103.65** — "how does open door work" $50.03, "how does open door work for
  sellers" $53.62. Plus "what is opendoor" at $0.
- **Combined $262.60 of $1,106.80 = 23.7%.** Stated in-body as "about a quarter."
- **Geo leak: "we buy houses knoxville" $56.39** on a Nashville-targeted campaign. Knoxville is ~180 miles.
  **MECHANISM CORRECTED, verified 2026-09-03.** I hypothesised a location-targeting fault ("presence or
  interest" instead of "presence") and it is WRONG. `get_google_ads_geo_performance` ALL_TIME on that campaign
  returns exactly ONE location row: `LOCATION_OF_PRESENCE`, country 2840 (US), carrying all 1,314 impressions
  and the full $2,401.58. There is NO area-of-interest row, so targeting did not leak. The user was physically
  inside the target area and typed a query naming another city; the KEYWORD matched it, not the geo setting.
  The body line therefore describes the SEARCH ("a search for a city three hours outside the target area") and
  sits in the close-variant paragraph, which is its correct home. **Do not "improve" this by adding a
  presence/interest claim to the body. The data does not support one.**
- Paid-click CPC band: 9 of 10 paying clicks fell **$45.13 to $57.79**; one outlier at $23.57.
  Stated in-body as "most ran $45 to $58," which is the accurate read.

**The rebuild** (`Search - Seller - 27 Aug`, id 24185790848, ENABLED): $42.10 / 127 impr / **11 clicks /
$3.83 CPC / 0 conversions**, live 7 days as of today. Also `Pmax - Seller - 2 Sep` at $0, zero impressions.

**REBUILD STRUCTURE - THIS CORRECTED MY OWN DRAFT.** Pulled the rebuild's keyword list to check whether my
recommendation matched our actual practice. It did not. The rebuild runs **27 keywords, ALL PHRASE match,
ZERO exact match**, split across two intent-separated ad groups: **"Seller"** (14 terms: "we buy houses for
cash", "sell house as is for cash", "companies that buy houses for cash", "cash home buyers near me") and
**"Investor"** (13 terms, all off-market: "off market listings", "off market real estate deals",
"offmarket land for sale"). The old paused campaign had ONE ad group, `SellHomeKeywords`, holding shorter
head terms.

My v1 body recommended "an exact match core." **That contradicted the account I was citing.** Had the
prospect hired us and asked what we did in Nashville, the honest answer would have been phrase match, not
exact. It is also weaker advice on the merits: exact match on a brand-new account starves it of the very
search term data needed to build the negative list. Body now reads "long specific phrases rather than short
head terms, different intents split into separate ad groups," which is what we actually do.

Same-keyword comparison worth noting internally but NOT citable: "sell my house for cash" cost **$53.74** in
the paused campaign and **$9.89** in the rebuild. One click each side. Directionally striking, statistically
nothing. Stays out of the body.

## KEYWORD PLANNER MARKET DATA (GenerateKeywordIdeas, US, English, pulled 2026-09-03)

Pulled to stress-test the opening claim. It does more than back it: it produced the proposal's lead insight.
**Top of page bid ranges, Google's own estimates, US:**

| Keyword | Avg monthly searches | Top of page bid range |
|---|---|---|
| sell my house | 6,600 | **$50.52 - $142.77** |
| we buy houses for cash | 2,900 | $34.35 - $118.78 |
| we buy houses | 9,900 | $25.61 - $100.96 |
| sell my house fast | 9,900 | $18.23 - $115.09 |
| cash home buyers | 6,600 | $17.89 - $96.70 |
| real estate agent near me | 49,500 | $5.24 - $26.40 |
| **homes for sale** | 368,000 | **$0.08 - $2.43** |
| houses for sale near me | 550,000 | $0.06 - $1.35 |
| real estate | 368,000 | $0.07 - $2.55 |

**Seller intent runs roughly 50x buyer intent at the top of the range** ($142.77 vs $2.43). That split is the
new opening insight and it also quantifies the buyer-side fork that was previously an unsupported aside.

**Precision guard:** these are top-of-page BID estimates, not realised CPCs. The body attributes them to
Google explicitly ("Google's own top of page range") and never presents them as what we paid. Our realised
CPCs are cited separately and only from our own account.


## THE CAUSATION TRAP I DELIBERATELY DID NOT WALK INTO

$52.21 to $3.83 is a 13.6x CPC drop in the same account, same vertical, before and after a restructure.
It is real and it is tempting. **It is not citable as a result.** Eleven clicks, seven days, zero conversions
on either side, and the two campaigns do not hold identical keyword sets. Leading with that ratio would be
exactly the unbacked before/after arc the standing rule forbids
(`reference_no_small_budget_turnaround_proof`), and it would trip the no-implied-causation rule.

Body mentions the rebuild without the ratio and hedges it in the same breath ("a week old and nothing has
converted yet, so I would not sell you on it"). Refusing to oversell here is what makes the rest credible.

## DELIBERATELY OUT

- **ZERO real estate case studies exist.** Confirmed by FULL ENUMERATION of all 28 `case_studies` rows, not
  by keyword search alone (the PMax precedent says an empty search is not a data absence). The complete
  industry_label set is: Apps, Auto Repair, E-Commerce, Education, Finance, Food, Healthcare, Home Services,
  Legal, Professional Services, SaaS, Travel. **No Real Estate row exists.** The only keyword hit was
  South River Mortgage (Finance), CHURNED 2026-08-11, whose $81 CPL already fails live verification. Excluded.
- **UrCovered Construction screened and REJECTED** (Home Services, Google Ads, "custom homes and
  barndominiums in Tennessee", 15 to 60 leads, CPL $454 to $239). It is the nearest adjacent row and the only
  residential-property lead-gen study we own. Rejected on three counts: a custom home BUILDER is a different
  business model from a brokerage or a cash homebuyer, so the keyword economics do not transfer; the standing
  "include all closely-matching case studies" rule reads it as adjacent, not closely-matching; and its
  headline is a before/after CPL arc, the exact shape flagged as unbacked in
  `reference_no_small_budget_turnaround_proof`. Citing it would also dilute the honest positioning that the
  live diagnostic earns.
- **Canvas Homes as a success story.** Zero conversions account-wide on $2,541. Cited ONLY as a live
  diagnostic and explicitly as a campaign we paused. Never framed as a win.
- **Victory Land Sales** (the other real estate-adjacent row): CHURNED, industry NULL, vacant land not
  residential. Its blended figures are window-skewed per standing rule. Excluded.
- **Client name withheld.** Body says "a Nashville seller campaign," never "Canvas Homes," consistent with
  the "multi location dental group" precedent.
- **Book-level scale numbers omitted entirely.** Style forbids opening on stats, and omitting them sidesteps
  the pooling rule cleanly rather than half-satisfying it.

## ATTACHMENT DECISION (curl-verified 2026-09-03, revisited on Queenie's direct question)

**ATTACH NOTHING.** Zero real estate case studies exist (full enumeration of all 28 rows). The three nearest
candidates were curl-verified as live files anyway, so an override is not blocked by a dead link:

| Candidate | file_id | curl result | Verdict |
|---|---|---|---|
| UrCovered Construction | `1onNdpUyrXBZaKw3soT2yOuD4Ah3SSiNU` | 200, application/octet-stream, **746,801 bytes** | REAL. Closest match. Still no. |
| South River Mortgage (underscore twin) | `15jPcipTl4yI-r1Xou-OTx1c7P0nrr8kx` | 200, octet-stream, 295,303 bytes | REAL file, unusable content. |
| Landmark Lawn (underscore twin) | `1RfCUEFzjuF1bUSZjBVQrPJCpjZzgYVQ-` | 200, octet-stream, 242,673 bytes | REAL. Wrong vertical. |
| Landmark Lawn (spaced filename) | `1b4T_0CxXvPFd6DWzXSgC_1b3im2eD-dl` | 200 but **text/html, 0 bytes** | DEAD. Twin rule now **8/8**. |

**The decisive reason is structural, not evidentiary: the body references no case study.** It cites only our
own unnamed Nashville account and Google Keyword Planner. Attaching a study the body never mentions invites
"what did you get for a real estate client," whose honest answer is zero conversions.

Per-candidate rejection:
- **UrCovered** is the only defensible override. Residential property, Tennessee, Google Ads. But a custom home
  BUILDER sells construction contracts, not real estate transactions, so the keyword economics do not transfer,
  and its headline is a $454 to $239 CPL arc, the unbacked before/after shape.
- **South River Mortgage** is the trap: the Drive filename literally reads "FinanceReal Estate Study." It is
  reverse mortgage lending, CHURNED 2026-08-11, and its $81 CPL fails live verification (blended $390, 7 of 13
  months with no conversion data).
- **Landmark Lawn** rhymes geographically (Nashville, Google Ads) and is lawn care.

**If overridden to UrCovered:** the body must gain a line referencing it, scoped explicitly to custom home
building in Tennessee, citing lead volume rather than the CPL arc.

## KNOWN AMBIGUITY - FLAGGING, NOT RESOLVING

"Small real estate company" does not say whether they are a brokerage chasing buyer and listing leads or a
cash homebuyer chasing sellers. Our live diagnostic is seller-side, which may or may not be their side.
Handled in-body by naming the buyer-side fork as an alternative rather than assuming, and the closing
questions invite the correction. If Queenie knows which side they are on, the opener can be sharpened.

## CONVERSION TRACKING VERIFIED (GAQL, 2026-09-04) - ANSWERS THE EXPERT'S BIGGEST RISK

expert-review-agent raised (MEDIUM confidence, inference) that "zero converted" might mean "zero tracked."
Checked `conversion_action` on 8835651880. **Tracking WAS live.** Six actions:

| Action | Type | Status | Primary |
|---|---|---|---|
| Submit contact us form (canvas.homes/formsubmitted) | WEBPAGE_CODELESS / SUBMIT_LEAD_FORM | **ENABLED** | **true** |
| Instant Quote - Form Submit (GTM) | WEBPAGE / SUBMIT_LEAD_FORM | **ENABLED** | **true** |
| close_convert_lead / qualify_lead / purchase / contact_us | GA4 imports | HIDDEN | false |

**Two enabled primary form-submit actions, so the zero is a REAL zero on form fills, not a tracking gap.**

**But the expert's instinct paid off sideways, and this is the strongest find of the review round: there is NO
call conversion action of ANY type on the account.** No CALL_FROM_ADS, no phone-call action, no import. On a
"sell my house fast" campaign, where distressed sellers phone rather than fill in forms, that is a real hole.
Body now says the exact, defensible thing: the account "counted form submissions and had no call conversion
set up, so if the phone rang nobody would know." That converts a credibility risk into the concrete lesson
behind the recommendation, and it preempts the question a sharp real estate prospect would ask.
Body claim downgraded from "converted nobody" to "produced no form fills at all."

## QC LOG (qc-reviewer-agent, 2026-09-04) - reviewed the v1 body; all live findings applied

1. **HIGH, CONFIRMED BY MY OWN RECOMPUTE, applied. The base swap.** v1 said "roughly $1,100 spent" then
   "a quarter of the budget." $1,106.80 is the SEARCH TERMS REPORT total, not campaign spend. The campaign
   spent **$2,401.58 over 46 clicks**; the report itemises only **46.1% of spend and 47.8% of clicks**.
   $262.60/$1,106.80 = 23.7%, but $262.60/$2,401.58 = **10.9%**. Undisclosed base swap inflating the headline
   claim roughly 2.2x. Body now states the true campaign total FIRST, then discloses that Google itemises less
   than half, then scopes the quarter explicitly to "the itemised spend."
2. **MEDIUM-HIGH, applied.** "Clicks are running a lot lower" names the wrong metric; click VOLUME is roughly
   flat, COST per click fell. Reads as the opposite of the point. Now "what each click costs is running a lot
   lower," with the hedge moved AHEAD of the claim to defuse the mechanism-then-number ordering.
3. **MEDIUM, applied.** The 24-vs-25 seam. Now "about three in four" (18/25 = 72%), one precise anchor only.
4. **LOW-MEDIUM, applied.** "About six weeks ago" was wrong on both readings (account 7/29 is ~5 weeks; the
   campaign itself ran 8.11-8.23). Now "we ran in August," which is unambiguous and suits the paused past tense.
5. **LOW, applied.** "Three hours outside the target area" was a drive-time estimate never pulled from any
   source. Now "a city outside the target metro."
6. **Moot.** The unbacked "most expensive inventory Google sells" line was the v1 opener and was already
   replaced by the keyword-planner price-tier finding, which IS sourced.
7. **Noted, internal only.** My notes omitted "clever offers reviews" from the $0 competitor list. No body
   claim depends on it.

## EXPERT REVIEW LOG (expert-review-agent, 2026-09-04) - 6 applied, 1 REJECTED on data

1. **[FACTUALLY WRONG AS WRITTEN] applied, and it independently corroborates QC #1 from a second angle.**
   $158.95 + $103.65 + $56.39 = $318.99 = 28.8%, so a reader adding the three numbers given lands on "a third,"
   not "a quarter." The quarter only holds when Knoxville is excluded, which nothing signalled. Body now sums
   only the two waste categories into the quarter and states the $56 as a separate sentence.
2. **REJECTED. The presence-vs-interest claim is contradicted by live data I pulled BEFORE the review ran.**
   The reviewer web-searched the "Presence or interest" default and applied it to this account without access
   to it. `get_google_ads_geo_performance` ALL_TIME on campaign 24127091936 returns **exactly one row,
   `LOCATION_OF_PRESENCE`, country 2840**, carrying all 1,314 impressions and the full $2,401.58. **There is no
   area-of-interest row, so targeting did not leak.** The searcher was physically in-area and typed a query
   naming another city; the KEYWORD matched it. The general article is right about Google's default and wrong
   about this account. Recommendation not adopted; the standing "do not add a presence/interest claim" warning
   in this file stands.
3. **[OPEN RISK] investigated and resolved.** See CONVERSION TRACKING VERIFIED above. Tracking was live, so the
   zero holds, but the reviewer's instinct surfaced the missing CALL action, which is now in the body.
4. **[DEFENSIBLE, applied] the volume tension.** v1 used 22 clicks for a confident diagnosis, then argued
   20-30 clicks is too little volume. The reconciliation is real and was undrawn. Body now separates the two
   questions: relevance needs little volume, conversion-rate comparison needs a lot.
5. **Moot, and it reinforces the correction already made.** The reviewer defended "exact match core" while
   noting exact match has included close variants since ~2017-18. That line was already replaced with "long
   specific phrases" after I found our own rebuild runs 27 keywords, ALL phrase match.
6. **[DEFENSIBLE, IMPRECISE] applied, good catch, two parts.** (a) Narrowing a radius does not mechanically
   lower CPC, since CPC is auction-driven; the lever is a lower-competition MARKET. Reworded. (b) "Buyer side"
   is incoherent for a cash buyer or wholesaler, who IS the buyer. Since the opener now turns on which side you
   buy, closing without asking was a real gap. Buyer-vs-seller promoted from a buried mid-body hedge to the
   closing question. **Deliberate precedent deviation: three closing questions rather than the usual two.**
7. **Applied**, same as QC #2.
8. **Applied**, same as QC #4.
9. **[MINOR] applied.** Weekly search-term review is too loose during ramp at ~$50/click. Now daily for the
   first few weeks.


## COMPLIANCE

No links or URLs. No contact info. No calendar link (first touch). No pricing in body. **No em dashes
(verified 0).** No certifications claimed. No years-of-experience claim. No client names. No lists, all prose.
Does not open with "I". Opens on their own nouns (real estate, keywords) carrying a claim they
do not already have, so it does not parrot the post back. Keyword-planner figures are attributed to Google
in-body and never presented as our realised CPCs. Portfolio material is the diagnostic itself and lands
in the middle, not up front. Closes on the two open screens. Past tense on the paused campaign, present on the
rebuild. **Unsigned.**

---

Real estate keywords sit in two very different price tiers, and which side you advertise on decides more than the keyword list does. Google's own top of page range for sell my house runs past $140. Homes for sale sits under $3.

Seller intent is the expensive end, and a first campaign there usually loses most of its budget before anyone sees a lead. A Nashville seller campaign we ran in August spent $2,401 across forty six clicks and produced no form fills at all.

Where it went is the useful part, and less than half of it is even itemised. Google breaks out $1,107 across twenty two clicks and keeps the rest as queries it will not show you. Inside that part, about three in four searches were close variants rather than the keywords themselves. Roughly $160 went to competitor company names and another $105 to people researching how iBuyers work, about a quarter of the itemised spend on clicks that were never going to convert. A separate $56 bought a search naming a city outside the target metro.

That is worth planning around before anything gets built. At $50 a click, a small monthly budget buys twenty or thirty clicks, enough to see whether the traffic is relevant but nowhere near enough to tell which keyword converts best. Only one of those questions needs scale. So the first decision is whether the budget clears the cost of a click on the side you want, and if not, whether a lower competition market gets you there.

Practically, tracking goes in before spend does. That account counted form submissions and had no call conversion set up, so if the phone rang nobody would know. Calls and form fills as separate actions, long specific phrases rather than short head terms, intents split into separate ad groups, negatives built on day one rather than after the first invoice, and search terms reviewed daily for the first few weeks while a single click costs this much.

We paused that structure and rebuilt it a week ago. Too early to credit it with anything and nothing has converted yet, but what each click costs is running a lot lower.

Three things before I could size this. Where do you operate, are you chasing sellers or buyers, and what monthly range are you considering for spend?
