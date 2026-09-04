# Upwork Proposal - Online tire store, Google Ads from zero (Shopping / PMax / Merchant Center)
Profile: Peterson (formerly "Samuel") | Style: strategic | Status: UNSENT | Drafted 2026-09-05
Body: 372 words / 2,178 chars. Under the 400 hard ceiling and far under the 5,000 char limit.
Plus 4 screening answers (the post says "To apply, answer these questions").

## SIGN-OFF

Signed **"Peterson"**, per Queenie's 2026-09-03 standing ruling. The local file
`docs/samuel-strategic.md` still says sign "Samuel" and is STALE against the 2026-08-29
system-wide profile rename. Local workspace override applied deliberately.

## STEP 0 - DUPLICATE CHECK

Grepped `.claude/drafts/`, `.claude/upwork-drafts/`, and the proposal-agent scratchpad for
tire/tyre. Zero relevant hits (only "entire"/"tired" false positives). No `upwork_leads` row
for a tire business. First submission, no duplicate-profile risk.

## SCREENS RUN

| Screen | Result |
|---|---|
| Ads in scope | PASS. Google Ads build + run. Core work. |
| Geo | PASS. US, ads run US. |
| White-label / subcontractor | PASS. Direct brand. |
| Full-time seat | PASS. No "full time" language. |
| Self-funded / profit-share | PASS. They fund spend. |
| Coaching Upwork competitors | PASS. |
| Detection evasion | PASS. |
| Flat-fee portfolio owner | PASS. |
| Landing page / CRO gating | PASS. Site is theirs, not in scope. |
| **Ad spend** | **NOT STATED.** They ask US to name month one. Q3 is therefore answered with a number, not a question. Recommended range keeps us above the $5K floor by construction. |
| **Hourly** | **UNKNOWN.** Contract type not visible in the post. We never bill management hourly. |
| **Top Rated / 90%+ JSS** | **UNVERIFIED - QUEENIE MUST CHECK.** Stated eligibility bar. Nothing in the DB confirms the current profile badge. Only JSS figure found anywhere is Lindsey at 94 in June 2026 (Loom "Fixing Your Upwork Job Success Score"), which is neither this profile nor current. Check the badge before submitting. |
| **Required items** | **PARTIAL - see below.** |

### The required-item gap, stated plainly

"Big-catalog experience (thousands of products)" is a **real miss**. Our feed accounts are
catalogs in the hundreds. Nothing in the book is thousands of SKUs. This is disclosed in the
body rather than hidden, which is also the right play against a post that ends with "don't
apply if you guarantee results before seeing our data."

The other three demands are answerable honestly:
- Merchant Center feed from scratch: YES, just not at their scale.
- Shopping/PMax for online stores with real numbers: YES, verified live this session.
- Real ROAS numbers not percentages: YES.

## CONVERSION WARNING - QUEENIE SHOULD SEE THIS BEFORE INVESTING

`agent_knowledge` "Upwork Job Filtering Analysis - April 2026" (3,441 applications, 37 wins).
Baseline last 6 months: 27.9% view / 12.3% reply / 4.1% call. This post hits **five** separate
2x-below-baseline markers at once:

| Marker | Jobs | Call rate |
|---|---|---|
| "merchant center" | 45 | **0%** |
| "product feed" | 30 | **0%** |
| "shopping campaign" | 21 | **0%** (also 0% reply) |
| "google shopping" | 51 | 2.0% |
| "google ads expert" (title) | 123 | 0.8% |

Roughly 270 historical applications carrying these markers produced almost no calls. This is
the single worst-converting job archetype in our data. Drafting anyway because Queenie asked,
but the prior is poor and worth knowing.

## VERIFIED LIVE THIS SESSION (contractor_query, 2026-09-05)

### Aura Displays - the account the body cites

Shopify, Google-only, `google_insights_daily` JOIN `google_campaigns` JOIN `google_ad_accounts`.
**Built from zero by us:** `clients.start_date` 2025-11-06, earliest insights row 2025-11-02,
every material campaign carries the `CM -` prefix. There is no pre-tenure baseline, so no
takeover or before/after framing is available (and none is used).

| Campaign | Channel | Spend | Conv | Value | ROAS | Window |
|---|---|---|---|---|---|---|
| `CM - Shop - All Products - UNBRANDED` | SHOPPING | $18,048 | 186.1 | $98,731 | **5.47x** | 11/11/25 - 8/31/26 |
| `Shop - Best Seller (Triple Screen)` | SHOPPING | $3,889 | 64.5 | $32,274 | **8.30x** | 12/10/25 - 3/9/26 |
| `CM - Search - Triple Screen - UNBRANDED` | SEARCH | $27,183 | 260.8 | $144,293 | 5.31x | 11/14/25 - 8/31/26 |
| `Pmax - All Products (Updated)` | PMAX | $1,718 | 25.5 | $14,751 | 8.58x | 12/9/25 - 1/26/26 |
| `Pmax - Cat-Wise Sgmnt [Feed Only]` | PMAX | $2,951 | 27.9 | $13,459 | 4.56x | 2/12/26 - 3/11/26 |
| `CM - Pmax - All Products (New Cust) - UNBRANDED` | PMAX | $385 | 3 | $1,642 | 4.27x | 7/9/26 - **7/21/26** |
| `CM - Branded - Search - 11/1` | SEARCH | $25,496 | 1,508.5 | $732,637 | 28.74x | **NEVER CITE** |

**Two hard rules applied.** (1) Never quote Aura's blended ROAS. It is carried by 28.74x branded
search, and quoting a blend inside a proposal that argues for isolating branded is
self-contradicting. Body quotes segments only. (2) The `Shop - Best Seller` carve-out at 8.30x
against the 5.47x all-products pool it came out of is the single most on-point fact we own for a
thousands-of-SKU store, because it IS the segmentation argument, measured.

**The PMax story is honest and strong.** Three PMax builds, 4.27x to 8.58x, and the last one was
turned OFF on 7/21/26 when it landed under the Shopping campaigns it competed with. That answers
"real Shopping/PMax experience" with a measurement, not a belief. Per
`reference_pmax_proof_exists_correction`, this is the stronger framing than "PMax won."

**Non-brand decay, disclosed in body:** 11.56x (Nov 25, $1.9K spend) to ~4.2-4.4x (Aug 26, $3.4K),
as cold spend scaled roughly 4x. Stated so the attached PDF's older "8-10x" headline cannot be
discovered as a contradiction.

### AURA WENT DARK 8/31/26 - PAST TENSE ONLY

Every Aura campaign reads `PAUSED` and its last data day is **2026-08-31**, while twelve other
Google accounts ran through 9/3. It spent $6,254 in August and stopped. `reporting_clients` still
says `active` with no `churned_date`, so the row is stale or the account is paused.
**Consequence: no present-tense "an account we run" claim.** Body uses past tense throughout
("we built", "ran 5.47x"). Worth Queenie confirming the account's real status separately.

### Tire / auto adjacency - REAL but small and white-label

`Tilly Mill Goodyear Auto Center`, ACTIVE, Google, **$450/mo**, white-label via FirstUp / Denise
Mistich. `Tilly Mill Pmax`: $2,347, 896.4 conv, $0.54 CPC, live through 9/3. `Tilly Mill Search`:
$2,732, 171 conv, $15.98 CPA.
**Its ROAS of 0.38 is meaningless** (conversion_value is $1 per conversion, a placeholder, not
revenue). Never cite that number. Referenced in the body only as vertical familiarity, unnamed,
with its limitation stated. It is local service lead gen, not ecommerce.

### Other feed accounts checked and left out

- **Myriad Traders** (survival gear, ACTIVE): Shopping `Shop - All Products` $11,197 at **2.47x**,
  `Search - Cat Segmented` $3,761 at 2.25x. Real and current but weaker than Aura. Its UK
  expansion failed (Shopping 0.64x, Search 0.19x, both paused Aug 10/11), which corroborates the
  same geo lesson as Aura's international zero. Not cited; one strong example beats three mediocre.
- **Scattered Kind** (yarn/tufting, ACTIVE): PMax Local $8,595 at 7.52x, PMax Yarns $3,671 at
  4.63x, Shopping $2,573 at 2.98x. **This CORRECTS `reference_pmax_proof_exists_correction`,
  which recorded on 9/4 that "Scattered Kind returns ZERO Google rows." That is wrong.** Rows
  exist across three channels. Left out of the body only because Aura is the better match.
- **Night Lark USA**: launched 8/3/26, Shopping $1,858 at **zero conversions**, cold Search
  $1,569 at 0.12x. A recent from-scratch feed build that is not working. Deliberately excluded.
- **Tiami Sleep**: Shopping $1,460, zero conversions. Excluded.

## ATTACHMENT DECISION (curl-verified 2026-09-05)

| Candidate | file_id | curl result | Verdict |
|---|---|---|---|
| **Aura Displays** | `1xKnrCCnakTPNnj8HaDiyEjp1z_ygloFN` | **200, application/octet-stream, 813,371 bytes** | **REAL. ATTACH.** |
| Axle Solutions (Auto Repair) | `1YnM0jqMHFzVh0jGSTusO8YtoRs6O7E0-` | 200 but **text/html, 0 bytes** | **DEAD. DO NOT ATTACH.** |
| Fitness Superstore | `1xF6mHAgni4KWAfklREG6eZH1pQAZ0S7p` | not pulled | Meta-only, numbers fail live verification. OUT. |

**ATTACH AURA.** It is the only ecom + Google + Shopping + PMax + Merchant Center study in the
book, the post explicitly asks for one real store, and the standing rule is to include every
closely-matching real study. Same call as the 5,000-SKU lead, the closest prior analog.

**Axle Solutions is the trap worth recording.** It is the one Auto Repair case study and it looks
perfect for a tire post. The `case_studies.download_url` ID returns **HTTP 200 with a 0-byte
text/html body**, the exact "200 is not liveness" failure. The alternate ID recorded in
`reference_b2b_proof_has_no_attachable_artifact` (`1vIvJ6QQzV16kBItpD9dODDt9sWIT4HhZ`) is live but
has an **empty Results block** and sells GMB optimization and "proprietary local SEO processes",
which collides with `reference_no_seo_service_line`. Fatal against a post demanding real numbers.

**Residual risk on the Aura PDF, flagged not hidden:** its headline says "8-10x ROAS on
non-branded" and "scaled across 49 countries." The first was true for the period it documents and
is now ~4.2x, which is why the body states the decay first. The second describes an attempt, not a
result: `CM - Shop - All Products - UNBRANDED (49 Locs, No USA)` ran one week in May 2026 at
**0.65x** and was paused. If Queenie would rather not carry that line, attach nothing. The body
stands alone and cites no study by name.

## PRICING - NOT IN BODY, QUEENIE DECIDES THE BID

No price in body (the post does not ask). Upwork will require a number.
Canonical instrument: onboarding **$1,500 per platform** with the audit included, so Google-only
is **$1,500 one-time**. Management is 20% of spend to $30K with a **$1,500/mo minimum per
platform**; the minimum threshold is $7,500 of spend. At the $8-10K month one the answers
recommend, the percentage takes over from the minimum.
**Do not bill this hourly.**

## SCOPE RISK TO CARRY INTO ANY CLOSE

Fitness Superstore churned 2026-02-15. Recorded reason: *"Wanted 2,000 catalog items updated,
outside our scope. Results were actually good."* A thousands-of-SKU tire feed is the same shape,
larger. **Feed strategy and segmentation is ours; bulk catalog data entry is theirs.** That
boundary needs to be written down before signature, not discovered in month two. The body states
it once, deliberately, because saying it now is cheaper than renegotiating it later.

## DELIBERATELY OUT

- **No guarantee, no projected ROAS, no promised number.** The post screens for exactly this.
- **Aura blended ROAS and the 28.74x branded figure.** Composition artifact.
- **Tilly Mill's 0.38 ROAS.** Placeholder conversion values, not revenue.
- **"49 countries."** An attempt at 0.65x, not a win.
- **Book-level scale stats** ($20M+ spend, 200+ audits). Style forbids opening on stats and
  omitting them sidesteps the pooling rule cleanly.
- **Client names.** Body says "a Shopify store" and "a tire and auto service center."
- **Certifications.** We hold none. Never claimed.
- **Calendar link.** First touch.

## COMPLIANCE

No links or URLs. No contact info. No calendar link. No pricing in body. **No em dashes (verified
0).** No lists in body, all prose. Does not open with "I". Opens on their own nouns (tire SKUs,
lowest pricing) carrying a claim they do not already have, so it does not parrot the post back.
No certifications. No years-of-experience claim. Past tense on Aura throughout. Every number
traced to a live query this session. Signed "Peterson".

---

## PROPOSAL BODY

Thousands of tire SKUs and a lowest price position is a combination Google will reward, but only where the feed is built so the price advantage is visible. Merchant Center benchmarks every product against what other sellers charge for the same tire. Most stores never split on it. Run one all products campaign and the SKUs where you genuinely undercut the market get averaged in with the ones where you sit mid pack, so budget lands wherever Google finds volume first rather than where you actually win.

That is also the honest answer to competitors at six figures. You do not outbid them. Their scale buys coverage, not efficiency, and at that budget their campaigns are optimizing across an enormous average. The room is in the size and fitment queries underneath the head terms, where the buyer already knows what they need and price is the last decision. Tire demand is unusually literal that way. People search a size or a vehicle, so whether size, load index and fitment are clean in the feed decides whether you appear at all, well before bidding is the question.

For an account starting at zero, sequence matters more than structure. PMax before any conversion history means Google optimizes blind, and on a new account it tends to find your own brand terms and report them back as a win. Merchant Center and tracking first, then non brand Shopping across a deliberately narrow slice of the catalog to buy product level and search term data, then segmentation on margin, velocity and price competitiveness. PMax after there is a real value signal and a brand exclusion list.

The closest thing we can show you is a Shopify store we built from zero last November. Non brand Shopping ran 5.47x on just over $18,000 across ten months, and one product line carved out of that same pool ran 8.30x. We tested PMax against it three times and switched the last one off in July when it came in under the Shopping campaigns it was competing with.

Worth saying outright though, that catalog ran to the hundreds, not thousands. Yours is bigger than anything we have built a feed for.

What does the AOV spread look like across the range, and do you have margin at the SKU level?


Peterson

---

## SCREENING ANSWERS (the post says "To apply, answer these questions")

### Q1. Have you built a Merchant Center feed from scratch for a large catalog? Tell us about it.

From scratch yes, at your scale no, and it is worth being straight about that up front. The build we would point to is a Shopify store we took from no ad account, no Merchant Center and no tracking to Search, Shopping and PMax all running off one feed, starting last November. Three more feed builds since, two of them launched this summer. Those catalogs ran to the hundreds of products. Thousands is a bigger job than anything we have done.

What does carry over is the part that actually decides performance on a big catalog, which is not the initial upload. It is the supplemental feed and the labels. Product titles that come out of a store database are written for humans browsing a category page, and for tires they usually bury the size, load index and speed rating behind a brand and model name, which is the opposite of how people search. Rewriting titles to lead with the attributes buyers type is normally the single biggest lift available, and it is done in a supplemental feed so nobody has to touch the store data.

Then custom labels, which is where a catalog this size gets controlled. Not the store's own category tree, which is built for navigation. Labels for margin tier, ninety day sell through, stock depth and price competitiveness against the Merchant Center benchmark. Those become the campaign and listing group structure, so budget can be pushed at the SKUs that are both profitable and genuinely cheaper than the market, and held back from the ones that are neither.

One boundary worth agreeing before anyone starts, because it has bitten us. Feed strategy, structure, labels, title rules and diagnostics are ours. Bulk catalog data entry across thousands of rows is not, and it should sit with whoever owns your product data. We have had a client relationship end over that exact ambiguity and the results were fine, the scope was not. Better settled in week one.

### Q2. Our competitors spend six figures a month. How do we compete against them with less?

By not competing where the money decides it.

Six figures a month buys coverage, not efficiency. At that spend the campaigns are almost certainly optimizing across an enormous average, which means they are winning the head terms and simultaneously carrying a lot of product level waste they cannot see, because nobody looks at SKU level performance across a catalog that size when the blended number looks acceptable.

Three places that leaves room.

First, the long tail of size and fitment queries. Someone searching a specific size in a specific brand has already decided what they need and is choosing on price and availability. That is your best traffic and it is the traffic large accounts serve worst, because it is fragmented and it does not show up as a priority in an aggregate report.

Second, price competitiveness as a targeting input rather than a marketing claim. If the lowest pricing position is real, Merchant Center will show it per product against the benchmark. That is a filter. Concentrate spend on the products where the data says you actually win, and stay out of the auctions where you do not. Most stores never do this, which is why a smaller budget can beat a larger one on those specific products.

Third, patience on the head terms. Bidding on a generic tire query against someone spending a hundred thousand a month is a losing trade for a new account and we would not recommend it in month one, or possibly at all.

What this does not do is beat them on total volume. It should not be sold that way. It wins specific auctions profitably and compounds from there.

### Q3. What would you spend in month one, and why?

Eight to ten thousand, and deliberately concentrated rather than spread.

The reasoning is about data, not reach. Month one on an account with no history is a purchase of information, and the thing that makes it useful or useless is whether any single product group accumulates enough conversions to support a decision at the end of it. Spread eight thousand evenly across thousands of SKUs and every group ends the month with two or three conversions, which tells you nothing and leaves you guessing in month two. Put the same eight thousand behind a narrow slice, your best selling and most price competitive lines, and several groups finish with enough volume to act on. Then the catalog opens up from a position of knowing something.

Below about five thousand the arithmetic stops working on a catalog this size. You can still run, but you are choosing to learn slowly, and month one becomes month three. If that is the constraint, the honest structure is narrower still, a few product lines only, and a longer runway before anyone judges it.

Two things would move that number. A high AOV spread across the range argues for more, because a wider price band needs more data to separate. Thin margins on the lowest priced tires argue for less, because those SKUs may not be worth buying traffic for at all regardless of ROAS.

Also worth setting expectations, month one is not the month to judge this on. Shopping needs conversion history before the bidding gets good, and a new Merchant Center account usually spends its first week or two in review and disapprovals rather than delivery.

### Q4. Share one real store you've run ads for, with actual results.

A Shopify store selling monitor and display hardware. Built from zero last November, no prior account.

Non branded Shopping, the all products campaign: $18,048 spent, 186 conversions, $98,731 in tracked revenue. **5.47x.** That ran from November through the end of August.

The more useful number is what happened when we carved the best selling product line out of that same pool into its own campaign. **8.30x** on $3,889. Same feed, same account, same period, roughly 50% better return purely from letting one line compete on its own budget instead of averaging inside the pool. That is the segmentation argument for a big catalog, measured rather than asserted.

PMax we tested three times against it, landing between 4.27x and 8.58x. We turned the last one off in July when it came in below the Shopping campaigns it was competing against. Worth mentioning because it cuts against how PMax is usually sold. It is not automatically the answer, and on a feed account it needs to earn its budget against a Shopping campaign you can actually see into.

The honest shape of scaling it, since you asked for real numbers. Non branded return started near 11.5x in the first month at under two thousand in spend, and settled around 4.2x by August as we scaled cold traffic spend roughly four times over. That decay is normal and it was still worth doing at that store's order value, but anyone showing you a first month number and implying it holds while you scale is not showing you the whole line.

Branded search in that account runs far higher and we are deliberately not quoting it, because a blended figure carried by people already searching the brand name is not evidence of anything you would be buying.
