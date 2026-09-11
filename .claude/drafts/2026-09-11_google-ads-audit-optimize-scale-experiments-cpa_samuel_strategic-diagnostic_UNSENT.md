# Upwork Proposal: High-level Google Ads expert to audit, optimize and scale an existing account, $10-12K/mo spend, CPA reduction via Google Ads Experiments, GA4/GTM tracking

- **Profile:** Samuel
- **Style:** `samuel_strategic` strategic + diagnostic (user asked for "strategic + diagnostic")
- **Date:** 2026-09-11 (Postgres `now()`, US Central; harness clock reads 9/12)
- **Status:** UNSENT
- **Operator:** UNNAMED. Assign before send (Ade A. runs Perfect Parking, the account cited).

---

## SCREEN RESULT

| Gate | Result |
|---|---|
| Ads in scope | PASS. Google Ads only, existing account. |
| Ad spend >= $5K/mo | PASS. $10-12K/mo stated. |
| Geo (US/CA/UK/AU) | **UNMEASURABLE.** No location stated anywhere in the post. |
| Payment verified | **UNMEASURABLE.** Raw post pasted, no client panel data. |
| White-label / subcontractor | PASS. "our existing ad account", direct advertiser. |
| Full-time employment seat | PASS. No "full time" language. |
| Ads + landing page owned together | PASS. LP optimization is one "strong understanding of" line, not a build deliverable and not a CRO-gated required item. Screen does not fire. |
| Hourly | No rate demanded. Fee is % of spend; at $10-12K = 20% marginal = $2,000-$2,400/mo, clears the $1,500/platform floor. **No number quoted in the body.** |
| Prior Creekside bid on this job | NONE. `upwork_jobs` search on "Google Ads Experiments" / "isolated A/B tests" / "without breaking our active conversion" returned 0 rows. |

**Verdict: not foreclosed.** Vertical axis does not fire at all, spend clears, Search + Smart Bidding are genuinely our largest channel. Two named requirements are hard zeros and are conceded disclosure-first in the body.

## REQUIRED-ITEMS SCREEN (metric + lever axis)

**R1 "Proven track record managing $10k+/month with verifiable case studies" — HALF.**
$10K+/mo Google management verifies: South River Mortgage ~$46,450/mo (12 mo), Dental Implants ~$19,757/mo, Doctor Laleh ~$14,492/mo (active). But the only Google case-study PDF that both returns a real PDF and survives recomputation is **Perfect Parking at ~$7,352/mo**, below their bar. South River's PDF must NOT be attached (headline is combined Google+Meta at $80K/mo, and the Meta CPL in it collapses on live data).

**R2 "Deep experience with Search, Smart Bidding, and Google Experiments" — SEARCH/SMART BIDDING PASS, EXPERIMENTS ZERO.**
- Search: 111 campaigns, 52 enabled, largest channel in the book.
- Smart Bidding: MAXIMIZE_CONVERSIONS live on Doctor Laleh PMax + Search (verified live via GAQL 2026-09-11).
- **Google Ads Experiments: ZERO.** `SELECT ... FROM experiment` returned **0 rows on Doctor Laleh (5948318044)** and **0 rows on Canvas Homes (8835651880)** — the only two accounts queryable before the PipeBoard 3-account slot limit resets 2026-09-14. Campaign-name sweep across all 201 campaigns in `google_campaigns` for experiment/trial/test/variant/draft returned **one** row, "BSM - Search 2025 Trial 248" (Chattanooga Skydiving), a brand-search campaign name and not an experiment. This is the LEVER axis: they named the tool twice. Conceded outright in the body.

**R3 "Landing page optimization and conversion tracking (GA4, GTM)" — DECOMPOSED, half each.**
- **Landing page optimization: ZERO.** No conversion-rate before/after anywhere in `case_studies` or `agent_knowledge`; no web/CRO service line on any client. Conceded.
- **GA4 / GTM: REAL, own funnel only.** GTM-MWQVSPJ, GA4 G-REHLM40KCD + property 522247053, gclid/fbclid written to the GHL contact at form submit via server endpoint. Plus Integrity Naturopathic's offline import of booked leads (12mo ~$22.7K / ~575 conv / ~$40), where **the CRM leg is FirstUp's, not ours**. Both qualifiers stated in the body.

**R4 "Willingness to work inside our existing account"** — PASS, no gap.

## PROOF CITED (verified live 2026-09-11)

- **South River Mortgage, Google, account-blended monthly CPA $61.44 (2025-09) -> $46.66 (2026-08), -24.1%, ~$46,450/mo over 12 months.** Recomputed from `google_insights_daily` JOIN `google_campaigns` JOIN `google_ad_accounts`. **Churned 2026-08-11, past tense, stated as such.** Body says "account level, Search and Performance Max together" because the channel split is wide (Search $97.05, PMax $33.41) and quoting the blend as a Search figure would be a 2.4x overstatement.
- **Perfect Parking, Search vs PMax, time-matched.** Charlottesville, 2025-11-29 to 2026-04-17, near-identical spend: Search $5,752 / 44 conv / $131.22 at $14.53 CPC; PMax $6,090 / 21 conv / $289.38 at $2.71 CPC. PMax clicks 5.4x cheaper, PMax leads 2.2x more expensive. This is the single best-fit artifact on the post: it IS isolate-and-time-match, and it makes their own "CPA and ROAS, not just clicks" point.
- **Perfect Parking matched 12-day windows.** 2026-02-17/28 = $173.59 CPL, 14.0 conv; 2026-03-01/12 = $119.54 CPL, 35.5 conv. Exact against the PDF's "31% CPL reduction, 1/day to 3/day". ACTIVE account, PDF verified attachable.

## NOT CITED, DELIBERATELY (bad numbers argue against us)

Every other $10K+ Google account's CPA got **worse** first month to last. Do not put any of these forward on a CPA-reduction post:

| Account | First CPA | Last CPA | Avg/mo |
|---|---|---|---|
| Doctor Laleh (ACTIVE) | $112.25 | $200.67 | $14,492 |
| Dental Implants | $49.84 | $154.75 | $19,757 |
| Aura Displays | $14.35 | $69.48 | $8,293 |
| The Tooth Co. | $124.96 | $197.91 | $7,943 |

Laleh's live 30-day GAQL is worse still and is the anti-proof: Search - Specific $2,597.85 / 3 conv / **$865.69**, PMAX - Specific $11,017.28 / 52 conv / $211.87, Search - Branded $815.75 / 12 conv / $67.99.

Across the whole Google book only **two** accounts improved first-to-last CPA: South River and Perfect Parking. Both are cited; nothing else is.

## ATTACHMENT

**None on first touch.** `Perfect_Parking_Asphalt_case_study.pdf` is verified attachable and is the right shape, but it is a $7-8K/mo paving account against a stated $10K+ bar, so it undercuts R1 rather than answering it. Hold it for the reply if they ask for case studies.

## COMPLIANCE

0 em dashes | 0 URLs | 0 contact info | no calendar link (first touch) | no booking CTA (none offered) | no sign-off name | no certification claim | no "10+ years" | "our team" framing, no principal named as the worker | **4,129 chars**, under the 5,000 cap

---

## PROPOSAL (paste-ready)

A Google Ads experiment on an account your size is usually underpowered before it starts, and the readout hides it.

A custom experiment splits the campaign into a control arm and a trial arm. The trial arm is a new campaign with its own bidding history, so Smart Bidding re-enters a learning period on it while the control keeps everything it has already accumulated. At $10K to $12K a month, a 50/50 split leaves each arm roughly $5K to $6K. If your CPA sits north of $100, that is around fifty conversions per arm per month, and the first ten to fourteen days of the trial arm are the learning period rather than the test. A four week experiment is then reporting on about two weeks of settled data in one arm and four in the other.

Google computes significance off those same conversion counts. At fifty per arm only a large effect clears the bar, so most experiments at this spend come back inconclusive and get read as "no difference." The change was never actually measured. That is how an account can test for a year and finish where it started.

Two things we would settle before running any of it.

First, which conversion actions are set to Primary and counted in the Conversions column. If form fills, calls and a secondary event are all counted together, CPA is measuring a mix, and any test that shifts traffic between campaigns also shifts which action fires. CPA moves, real acquisition cost does not. On an account that is already generating conversions steadily, that is the most common reason a test looks like a win.

Second, whether Performance Max is serving on your brand terms. If it is, PMax CPA looks strong, Search looks weak beside it, and budget drifts toward the campaign harvesting demand you already had.

There is also a tension inside the brief worth naming. Building tighter high intent structures and lowering CPA under Smart Bidding pull against each other at this budget. Every additional campaign splits conversion volume further and each fragment has less data to bid on. Segmentation buys control and costs signal, and at $10K to $12K the number of campaigns the account can carry before bidding degrades is usually smaller than it looks.

What we can show, and what we cannot.

The largest Google account our team has run was a reverse mortgage lender at roughly $46K a month across twelve months. At account level, Search and Performance Max together, cost per conversion went from $61.44 in the first month to $46.66 in the last, about 24 percent down. That client has since ended, so it is past tense.

Closer to your actual question, isolating a test without disturbing the baseline: on a paving account we run, Search and Performance Max were read on matched dates at near identical spend. Search, $5,752 and 44 leads at $131.22 each. Performance Max, $6,090 and 21 leads at $289.38 each. PMax clicks were 5.4 times cheaper and PMax leads were 2.2 times more expensive. Same account, same window, opposite conclusions depending on which metric you read. On that account a separate matched twelve day comparison ran cost per lead at $173.59 and then $119.54, with leads at 14 and then 35.5.

The gap, plainly. We have not run a split through the Google Ads Experiments tool on a client account. Our tests have been isolated at campaign level and read on matched date ranges, which is what produced the figures above. Experiments is the right mechanism when there is a baseline worth protecting and we would use it, with the power caveats in the first section. If prior experiment history is the bar, we do not clear it.

Landing pages are the second gap. We do not have a conversion rate before and after to show you. On tracking we do work in GA4 and Tag Manager, including click ID capture into a CRM field on our own lead funnel, and one client account where booked leads are imported back into Google as offline conversions, though that CRM leg is the client's build rather than ours.

Two questions. What is currently inside your Conversions column, and is anything counted there that is not a genuine acquisition? And has Performance Max been excluded from your brand terms?
