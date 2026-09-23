# Upwork Proposal - Meta Ads Specialist, $50K-$60K+/mo, scaling into Q4

**Profile:** Lindsey · **Style:** lindsey_default · **Status:** UNSENT · **Drafted:** 2026-09-23 (US Central, confirmed via Postgres `now()`, local shell clock was off)

Requested as "Lindsey's strategic + diagnostic style, write it in lindsey_default". There is no Lindsey strategic style (strategic is Samuel-only); the same sentence named lindsey_default, so that is what this is. 10th recorded hit on that phrasing, self-resolved, not re-asked.

## Job post (verbatim)

> I'm looking for a Meta Ads Specialist to handle the strategy when it comes to Meta Ads.
> We're currently spending $50k-$60k+ a month on ads, and we're looking to scale as much as possible going into Q4.
> You will manage everything from campaign strategy, to daily optimization, testing of creatives and scaling.
> This is a long-term project for the right fit.

## Proposal

Meta Scaling Into Q4

What CPM is the Q4 plan built on, the one you are paying now or a higher one?

I ask because scaling and Q4 each raise CPM on their own, and they land in the same eight weeks. A budget modeled on today's reach buys less of it by November. The ROAS drop that follows reads like a creative problem when it is a media cost problem, and those need opposite responses. One you fix, the other you fund.

On a DTC furniture brand I ran, monthly spend went from about $24K to about $40K in a month and account CPM went from $45 to $79. Almost none of that was the existing ads getting more expensive. Most of the new budget landed in one new campaign clearing at a much higher CPM, and the one campaign running in both months moved about 7%. The blended number said the account was degrading. Split by campaign, it was not.

Across the Meta accounts our team runs, November and December CPM sat about 25% above October, and on the largest account closer to 77%. January came back to the October level almost exactly. That reversion is what most Q4 plans miss. Winners cut in November stay cut, and the auction hands the money back in January to whoever is still running them.

The Meta account I run now is about $99K a month, so $50K to $60K sits inside the range I work in.

Two things I would want in place before the budget goes up:

1. A spend band read on your current winners, so we know which ads hold efficiency at 1.5x their daily budget and which only work at today's. That decides where the Q4 money goes, instead of splitting it evenly and finding out in December.

2. A clean read on retargeting before Q4 rather than during it. On that furniture account retargeting took 16% of the spend and returned about a third of the recorded revenue, the split that makes a blended number look healthy while prospecting gets more expensive.

On fees: $1,500 onboarding for Meta, then 20% of monthly spend to $30K, 15% from $30K to $60K, and 10% above that. At $50K that is $9,000 a month, at $60K it is $10,500, and the rate keeps dropping as you scale.

What are you selling, and which countries does the spend run in?

There is a short video on my profile that explains how I work.

---

## Screens run

- **Ads in scope:** YES. Meta paid social, client-side, own the channel. PASS.
- **PLATFORM TEST: CLEAN PASS.** Meta-only post. Squarely inside Lindsey's permitted scope. No Google/TikTok/programmatic component to concede.
- **Spend: strongest possible PASS.** $50K-$60K+/mo stated, scaling. Far above the $5K floor. Bottom of the range ($50K) clears on its own.
- **Not** white-label, **not** a full-time seat (post says "long-term project", never "full time"), not profit-share, not coaching Upwork competitors, not a flat-fee portfolio owner, not detection evasion, no landing-page/CRO gate, no worker-location requirement.
- **Geo: NOT STATED. UNMEASURABLE, not cleared.** No country anywhere in the post. Prose does not foreclose it, so per `feedback_stated_budget_is_not_a_ceiling` logic the ask goes in the close rather than routing away. **If the answer is outside US/CA/UK/AU this is a skip.**
- **Vertical: NOT STATED.** No industry given, so no vertical proof-gap screen could be run. Asked in the close alongside geo.
- **Payment verified:** unknown (logged out). Job not in `upwork_jobs` yet.
- **Required items:** NONE. No screening questions, no case-study demand in the post.
- **Duplicate check:** `upwork_jobs` searched by job_name and description. The "Meta Ads Specialist" Lindsey row dated 2026-09-22 (sheet row 509) is **Shots Creative Studio**, a Melbourne creative studio, a different job. Local drafts re-grepped: no Samuel twin, nothing modified in the last 3 hours.

## Numbers used (all live-verified 2026-09-23 against `meta_insights_daily` JOIN `meta_campaigns` JOIN `meta_ad_accounts`)

**Neue Maison** (DTC luxury furniture, Meta, CHURNED). Lindsey's, tenure 2026-04-10 to 2026-08-10.
- Jun 2026: $23,871 spend, CPM $45.37. Jul 2026: $40,389 spend, CPM $78.88. Cited as "about $24K to about $40K" and "$45 to $79".
- Tenure spend $105,011. `Retargeting | 4/13`: $17,000 spend (16.2%) and $92,142 of ~$292,666 recorded revenue (31.5%). Cited as "16% of the spend" and "about a third of the recorded revenue".
- **Deliberately NOT cited:** the July 4.17x, any ROAS, any cost per purchase. July's headline is carried by a `July 4th - 50%` sitewide promo ($23,843 of that month's spend). No revenue multiple appears in the body.

**CORRECTED AFTER QC (finding f, implied causation).** The first draft of paragraph three said the CPM rise was existing reach getting more expensive ("The audience and the creative had not gotten worse. The incremental reach just cost more."). **That was wrong and is now cut.** Campaign-level decomposition of Jun vs Jul 2026:

| Campaign | Jun spend / CPM | Jul spend / CPM |
|---|---|---|
| `Conversions \| July 4th - 50%` (new in July) | not running | **$23,843 / $84.79** |
| `Retargeting \| 4/13` (both months) | $4,234 / $50.34 | $7,493 / **$54.05** |
| `Conversions \| Membership \| 7/22` (new) | not running | $6,141 / $95.35 |
| `TRADE PROGRAM` | $1,943 / $68.82 | $2,215 / $108.33 |
| `Conversions \| 30% Off \| 5/13` | $7,846 / $42.02 | ended |

The account CPM nearly doubled mainly as a **mix effect**: a new promo campaign took 59% of July spend at an $84.79 CPM. The only campaign running in both months moved **+7.4%** ($50.34 to $54.05). Non-promo July spend (~$16.5K) was actually *below* June's $23.9K. The body now says this plainly and uses it as the argument, which is both honest and a stronger diagnostic than the original claim.

**Book-wide Meta CPM.** First pass cited the all-in book number (+38%). **Corrected before delivery:** Lux Dental Spa is roughly half of total book spend, so the all-in figure was carried by one account. Re-pulled excluding it:

| | Oct 2025 | Nov 2025 | Dec 2025 | Jan 2026 |
|---|---|---|---|---|
| All accounts (21-22) | $24.45 | $33.78 (+38%) | $33.90 (+39%) | $24.17 |
| **Excluding Lux (20-22)** | **$19.12** | **$25.13 (+31%)** | **$22.72 (+19%)** | **$19.19 (+0.4%)** |
| Lux Dental Spa alone | $35.81 | $59.52 | $67.59 | $35.01 |

Nov+Dec combined vs Oct: ex-Lux **+25.4%**, Lux alone **+77%**. Monthly spend was comparable across all four months ($200K-$215K book-wide), so this is a seasonal read, not a spend-mix artifact.

Body now cites **"about 25% above October"** (ex-Lux, the breadth-supported figure) and **"closer to 77%"** for the largest account, reported as two observed numbers with no causal mechanism asserted. The size gradient brackets the prospect, who sits between the two at $50K-$60K. Reversion is the strongest fact in the set: ex-Lux January $19.19 against October $19.12. Attributed to "our team", never first person.

**Lux Dental Spa FB Ads:** $1,187,771 trailing 12 months = $98,981/mo, ACTIVE, last data day 2026-09-22. Cited as "about $99K a month", **present tense only, no duration claim**, per the tenure constraint on file (handed to another operator ~09/2025, operator again now). Spend only. **CPA deliberately not cited** for this account.

**Pricing** from `pricing-reference.md` (marginal tiers): $1,500 onboarding/platform; 20% to $30K, 15% $30K-$60K, 10% above $60K; $15,000 total monthly cap. $50K -> 30,000x0.20 + 20,000x0.15 = **$9,000**. $60K -> 6,000 + 4,500 = **$10,500**. (Cap binds at ~$105K/mo spend. Not stated in the body.)

## Flags for Queenie

1. **"Our team" pooling is used once**, on the book-wide Q4 CPM sentence. Lindsey proposals may pool but the rule is to ask each time. Say the word and it comes out, though the 38% figure goes with it since it is a 22-account number, not hers.
2. **Geo is an open screen.** The close asks it. If the ads run outside US/CA/UK/AU, do not send a follow-up.
3. **Q4 CPM arc is not first-person.** Lindsey was not the operator on Lux through Q4 2025, and Master Spa Parts' Q4 2025 is pre-takeover (Feb 2026), so neither is available as a personal war story. The draft routes around both: her own scaling-cost proof is Neue Maison, which is inside her tenure.
4. **No attachments.** No artifact was attached or claimed.

## QC (qc-reviewer-agent): PASS WITH FIXES. Both fixes applied.

1. **Finding (f), implied causation: CONFIRMED, was a real error.** Verified independently at campaign level (table above) before acting on it. Paragraph three rewritten from a false mechanism claim into the mix-vs-degradation read the data actually supports.
2. **Finding (e), the 90-day minimum line: CONFIRMED, cut.** `reference_no_client_trial_90day_minimum.md` records that Queenie cut this line from two first-touch proposals in a row (Tools For Veterans 9/22 `a6cf363`, Shine Tech 9/23 `57391b0`) and that **since 9/23 first-touch proposals leave it out by default.** Today is 9/23. Removed from the fee paragraph. The term still must be raised before any contract, and a trial is still never to be agreed to.
3. Fee math re-verified against the marginal tiers: PASS. Format rules, tense discipline, no fabricated figures: PASS.
4. **Finding (a), "our team" pooling:** wording matches sanctioned phrasing; still needs Queenie's per-post confirmation. Flagged above.
5. **Finding (g), compound closing question:** optional polish only. Kept both clauses since vertical is unknown and needed for any follow-up. QC's note is that geo is the higher-value half if one has to go.

## Conventions

No em dashes, no sign-off, no name, no links, no contact info, no hourly rate, no 90-day line, no commitments pre-signature. 414 words, 2,202 characters, well inside the 5,000 limit.
