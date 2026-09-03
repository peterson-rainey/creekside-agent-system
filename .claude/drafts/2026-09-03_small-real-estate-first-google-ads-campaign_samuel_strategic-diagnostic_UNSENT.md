# Upwork Proposal - Small real estate company, first Google Ads campaign (setup + keyword research + monitoring)
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-03 (Postgres now(), US Central)
Length: 337 words / 1,932 chars. Well under the 5,000 char hard limit and inside the 250-350 word style range.

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
- Paid-click CPC band: 9 of 10 paying clicks fell **$45.13 to $57.79**; one outlier at $23.57.
  Stated in-body as "most ran $45 to $58," which is the accurate read.

**The rebuild** (`Search - Seller - 27 Aug`, id 24185790848, ENABLED): $42.10 / 127 impr / **11 clicks /
$3.83 CPC / 0 conversions**, live 7 days as of today. Also `Pmax - Seller - 2 Sep` at $0, zero impressions.

## THE CAUSATION TRAP I DELIBERATELY DID NOT WALK INTO

$52.21 to $3.83 is a 13.6x CPC drop in the same account, same vertical, before and after a restructure.
It is real and it is tempting. **It is not citable as a result.** Eleven clicks, seven days, zero conversions
on either side, and the two campaigns do not hold identical keyword sets. Leading with that ratio would be
exactly the unbacked before/after arc the standing rule forbids
(`reference_no_small_budget_turnaround_proof`), and it would trip the no-implied-causation rule.

Body mentions the rebuild without the ratio and hedges it in the same breath ("a week old and nothing has
converted yet, so I would not sell you on it"). Refusing to oversell here is what makes the rest credible.

## DELIBERATELY OUT

- **ZERO real estate case studies exist.** All 28 `case_studies` rows screened; the only keyword hit was
  South River Mortgage (Finance), which is CHURNED 2026-08-11 and whose $81 CPL already fails live
  verification. Excluded.
- **Canvas Homes as a success story.** Zero conversions account-wide on $2,541. Cited ONLY as a live
  diagnostic and explicitly as a campaign we paused. Never framed as a win.
- **Victory Land Sales** (the other real estate-adjacent row): CHURNED, industry NULL, vacant land not
  residential. Its blended figures are window-skewed per standing rule. Excluded.
- **Client name withheld.** Body says "a Nashville seller campaign," never "Canvas Homes," consistent with
  the "multi location dental group" precedent.
- **Book-level scale numbers omitted entirely.** Style forbids opening on stats, and omitting them sidesteps
  the pooling rule cleanly rather than half-satisfying it.

## ATTACHMENT DECISION

**ATTACH NOTHING.** Zero real estate case studies exist in the library. There is no PDF to verify, so the
usual underscore-twin check does not engage. Nothing referenced in the body needs an attachment.

## KNOWN AMBIGUITY - FLAGGING, NOT RESOLVING

"Small real estate company" does not say whether they are a brokerage chasing buyer and listing leads or a
cash homebuyer chasing sellers. Our live diagnostic is seller-side, which may or may not be their side.
Handled in-body by naming the buyer-side fork as an alternative rather than assuming, and the closing
questions invite the correction. If Queenie knows which side they are on, the opener can be sharpened.

## COMPLIANCE

No links or URLs. No contact info. No calendar link (first touch). No pricing in body. **No em dashes
(verified 0).** No certifications claimed. No years-of-experience claim. No client names. No lists, all prose.
Does not open with "I". Opens on their own nouns (real estate, keywords, first campaign) carrying a claim they
do not already have, so it does not parrot the post back. Portfolio material is the diagnostic itself and lands
in the middle, not up front. Closes on the two open screens. Past tense on the paused campaign, present on the
rebuild. **Unsigned.**

---

Real estate seller keywords are some of the most expensive inventory Google sells, and a first campaign usually loses most of its budget before anyone sees a lead. Worth knowing what a click actually costs before the account gets built.

A live example from a Nashville seller campaign we launched about six weeks ago. Twenty four search terms, roughly $1,100 spent, twenty two clicks. Most of those clicks ran $45 to $58. Zero converted.

Where the money went is the useful part. Eighteen of the twenty five matches were close variants rather than the keywords themselves. About $160 went to people typing competitor company names, another $105 to people researching how iBuyers work, and $56 to a search for a city three hours outside the target area. None of those is a seller ready to talk. Roughly a quarter of the budget on searches that were never going to convert, and that is with someone watching the account.

That is the part worth planning around before anything gets built. At $50 a click, a small monthly budget buys twenty or thirty clicks, which is not enough volume to tell a good keyword from a bad one. So the first decision is not keyword research. It is whether the budget clears the cost of a click in your market, and if it does not, whether the buyer side or a tighter geography gets you there instead.

Practically, tracking goes in before spend does. Calls and form fills as separate conversion actions, an exact match core with a negative list built on day one rather than after the first invoice, and a weekly search term review while close variants are still cheap to catch.

We paused that Nashville structure and rebuilt it. Clicks are running a lot lower now, though it is a week old and nothing has converted yet, so I would not sell you on it.

Two things before I could size this. Where do you operate, and what monthly range are you considering for spend?
