# Outway — AU DTC solar garden lighting → home aesthetics, Meta specialist, US market entry

- **Date (US Central, Postgres now()):** 2026-09-22
- **Profile:** Samuel (General) · **Style:** strategic · **Status:** UNSENT
- **Job type:** hourly (Upwork) — answered with % of spend, never hourly
- **Attachment:** none (see note)

## ⚠ THIS IS A RE-BID — the job is a verbatim repost

`upwork_jobs` holds this exact job description twice:

| Applied | Profile | Viewed | Messaged | Won | Sheet row |
|---|---|---|---|---|---|
| 2026-08-18 | General (Samuel), `strategic_dq` | **YES** | no | no | 4997 |
| 2026-08-19 | Lindsey | no | no | no | 201 |

Both cover letters were noun-matched to the job (Lindsey's names "Outway" outright), so the
`+5 sheet row` offset issue does not apply — these are genuinely what we sent.

**Samuel's 8/18 letter was opened and ignored.** This draft is deliberately built to not repeat it.

### What the 8/18 letter did that this one fixes
1. Cited the furniture brand's **4.2x** headline with no breakdown — to a buyer who screens on **CAC**.
   That ROAS is carried by a 50%-off sitewide sale and retargeting. Now volunteered up front.
2. Cited "fitness equipment retailer, 7x baseline / **40x peaks**" — the 40x is **unbacked** in the book
   and that account is churned. Dropped entirely.
3. Argued "split the markets" as **theory**. Now backed with real numbers from our own book.
4. Deferred the rate ("tell me your budget and I'll give you a number"). Now answers item (3) directly.
5. Ended with the sign-off "Samuel" — banned since the 9/4 ruling. Removed.

## Screen

| Check | Result |
|---|---|
| Geo (US/CA/UK/AU) | **PASS** — AU brand, US expansion |
| Ad spend ≥ $5K/mo | **Unmeasurable, not cleared** — no number given; nothing in the prose forecloses it |
| Hourly | Upwork type is hourly → answered as % of spend |
| White-label / full-time seat | PASS — "ongoing partner", the words "full time" do not appear |
| Worker-location requirement | PASS — "responsive during business hours", no location *requirement* |
| **Ads + landing page owned together** | **CLEARS** — see below |

### CRO screen — clears, closest to the 2026-08-19 override
No landing-page build anywhere in scope. The funnel item is **"analyze… and identify"** (diagnosis),
CRO appears once as a *grasp* requirement, and required item (2) asks for **approach/method**, not proof.
**Zero CRO-proof-gated questions** — the "two CRO-gated questions" line is not reached. Handled as
ad-to-page intent + measurement. **No conversion-rate-lift results claimed anywhere.**

### Required item (1): "1-2 DTC/ecom case studies with metrics", home/outdoor preferred
Both supplied and both on-vertical physical consumer products. Verified live this session.

## Facts verified live (Supabase, this session)

**Master Spa Parts** `act_2752863238119036` (Meta, churned, operator Lindsey B.) — home/outdoor product:
| Month | Spend | Conv | CPA | CPM | ROAS |
|---|---|---|---|---|---|
| Jan 2026 *(inherited, pre-takeover)* | $15,587.79 | 449 | **$34.72** | $8.10 | 4.57x |
| Feb (takeover 2/3) | $12,320.68 | 388 | $31.75 | $7.38 | 4.87x |
| Mar | $14,900.10 | 589 | $25.30 | $8.25 | 5.87x |
| Apr | $13,223.56 | 665 | **$19.89** | $8.18 | **8.07x** |

CPA −43% while CPM stayed flat → efficiency, not cheap media. Jan is correctly framed as *inherited*.

**Neue Maison** `act_782415276397596` (Meta, churned, operator Lindsey B.) — luxury furniture:
tenure-filtered 2026-04-10→08-10: **$105,010.24 / 343 conv / $306.15 / CPM $51.33** (matches memory exactly).
Stripping the 9 non-purchase conversions (`TRADE PROGRAM` 1, `Local Campaign | Calendly` 8 = $13,185.48):
**$91,824.76 / 334 purchases / $274.92.**
- `July 4th - 50%` $23,843 → $99,425 = 4.17x @ **$567.70 CPA** (the headline, and the most expensive)
- `Retargeting` $16,999.77 → $92,141.96 = 5.42x @ $200
- `Conversions | 5/8` (undifferentiated) $5,264.05 → $423.80 = **0.08x**
- `Conversions | Forge` (product-specific) $5,700.78 → $13,447.38 = **2.36x**

**Myriad Traders Meta** `act_1529816118863696` (active, operator Lindsey B.) — the geo-split proof,
2026-07-08→07-15 (8 days, the full extent of the DB table):
| Campaign | Spend | Revenue | ROAS | CPM |
|---|---|---|---|---|
| `UK \| Prospecting Broad` | $2,150.63 | $624.01 | **0.29x** | **$29.59** |
| `PS Prospecting Broad CBO` (home mkt) | $1,587.40 | $6,452.07 | **4.06x** | $39.63 |
| `PS Scaling ProvenAds` | $584.23 | $2,439.82 | 4.18x | $44.27 |
| `PS WarmRetargeting` | $320.55 | $1,094.94 | 3.42x | $46.88 |

Blended = $4,642.81 → $10,610.84 = **2.29x**, which hides the 0.29x market.

## Caveats / things I could NOT verify
- **The geo-split window is only 8 days.** Memory records a six-week live pull (9/21: UK 0.59x vs US 3.79x,
  blended 2.32x) but **PipeBoard is still at its free-plan weekly limit** — one attempt made, hard-failed,
  not retried. The draft therefore says "eight days" rather than claiming the wider window.
- **Zero Australian-market proof.** Swept `meta_campaigns` for australia/AU/AUS/Sydney/Melbourne/Brisbane/
  Perth → **no rows**. Nothing in the draft claims AU experience.
- Discarded mid-research: `Conversions | Miami` looked like an $84.21 CPA win but is **0.70x ROAS** —
  cheap low-value conversions, not purchases. Not used.
- `Conversions | Membership` $184.93 CPA is also a low-value event (0.39x). Not used.

## Attachment decision
**None.** The two closely-matching case studies (Master Spa Parts, Neue Maison) have **no attachable PDF**.
The only safe DTC/Meta artifact is `unrefined_meal_prep_CLEAN.pdf` (meal prep) — off-vertical against a post
that says home/outdoor "strongly preferred", and weaker than the two in-letter cases. Metrics carried in-body,
which is what item (1) actually asks for.

## Compliance
Statement opener (not "I") · client's nouns, no parroting · no URLs / no calendar link / no contact info ·
**no sign-off name** (9/4 ruling) · no em dashes · % of spend not hourly · budget asked as a **range** ·
tradeoffs stated (AEST coverage, the ROAS breakdown) · delivery attributed to "our team", principals not in a
delivery seat · book pooled, never first person · **398 words / 2317 chars** (limit 5,000)

---

## PROPOSAL

Entering the US while Australia is still the core market is where most category expansions quietly lose money, and the tell shows up in CPM before revenue.

On one account our team runs, the new-market prospecting campaign had the cheapest CPM in the account, $29.59 against $39.63 for the home market, and returned 0.29x while home-market prospecting returned 4.06x over the same eight days. Blended, the account read 2.29x and looked healthy. Cheap inventory in a market that does not know you is not a discount, it is the cost of attention without brand context. So the US and AU lines get separate campaigns, separate targets and separate pacing from day one.

Opposite seasons sharpen it. Your outdoor range peaks in AU around September to November and in the US around March to May, so a US launch judged during the AU peak reads as failure when it is only off season.

On the funnel, the first pass is not in Ads Manager. It is whether Meta's reported purchases reconcile with actual Shopify orders, so pixel and CAPI deduplication come first, because everything after inherits the error. Then segment click to landing page view to add to cart to checkout, and let the largest drop name the problem.

Two from our book, both physical consumer products. A spa and outdoor parts brand we inherited at $34.72 per conversion, down to $19.89 inside three months on $12-15K a month, with CPM flat near $8, so efficiency rather than cheap media. ROAS went 4.57x to 8.07x. And a luxury furniture brand, $105K of Meta spend across four months, 334 purchases at about $275 once the trade and lead lanes are stripped. Worth saying plainly, that account's headline ROAS was carried by a 50 percent sitewide sale and by retargeting, while undifferentiated catalog prospecting ran 0.08x against 2.36x for product specific prospecting. Same risk when one product becomes a full range.

Availability is US Central from Nashville, so we would lock a fixed daily overlap rather than promise full AEST coverage. Day to day sits with our team, I stay across strategy and direction.

Rate is 20 percent of monthly Meta spend, stepping to 15 percent above $30K, with a $1,500 monthly minimum and a one time $1,500 onboarding. Not hourly.

What range is the Meta budget landing in for the US launch, and does AU hold steady while it ramps?
