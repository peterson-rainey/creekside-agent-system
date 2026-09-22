# Outway — AU DTC solar garden lighting → home aesthetics, Meta specialist, US market entry

- **Date (US Central, Postgres now()):** 2026-09-22
- **Profile:** Samuel (General) · **Style:** strategic · **Status:** UNSENT
- **Job type:** hourly (Upwork) — answered as % of spend, never hourly
- **Attachment:** none (see note)
- **Angle:** CATEGORY expansion (product-lane split). Deliberately *not* the geo angle — see sibling note.

## ⚠ 1. THIS IS A RE-BID — the job is a verbatim repost

`upwork_jobs` holds this exact description twice:

| Applied | Profile | Viewed | Messaged | Won | Sheet row |
|---|---|---|---|---|---|
| 2026-08-18 | General (Samuel), `strategic_dq` | **YES** | no | no | 4997 |
| 2026-08-19 | Lindsey | no | no | no | 201 |

Cover letters are noun-matched to the job (Lindsey's names "Outway" outright), so the `+5 sheet row`
offset issue does not apply — these are genuinely what we sent.

**Samuel's 8/18 letter was opened and ignored.** This draft is built to not repeat it:
1. It cited the furniture brand's **4.2x** headline with no breakdown, to a buyer who screens on **CAC**.
   That ROAS is carried by a 50%-off sitewide sale and by retargeting. Now volunteered up front.
2. It cited "fitness equipment retailer, 7x baseline / **40x peaks**" — the 40x is **unbacked** in the book
   and that account is churned. Dropped entirely.
3. It deferred the rate ("tell me your budget and I'll give you a number"). Now answers item (3) directly.
4. It ended with the sign-off "Samuel" — banned since the 9/4 ruling. Removed.

## ⚠ 2. A SIBLING LINDSEY DRAFT EXISTS FOR THIS SAME JOB — read before sending either

`2026-09-23_outway-au-dtc-home-aesthetics-meta-us-expansion_lindsey_default_UNSENT.md` (written 06:42,
two minutes before this one; it did **not** exist at this session's first grep). Two profiles bidding one
job is allowed, but as first written **both drafts led on the same geo story and used the same three
accounts**, which would have read as one proposal sent twice.

**Resolved by splitting the two halves of the client's post:**
- **Lindsey → GEOGRAPHIC expansion.** Leads on Myriad's country split (3.79x vs 0.59x, blended 2.32x).
- **Samuel (this draft) → CATEGORY expansion.** Leads on Neue Maison's product-lane split (0.08x vs 2.36x),
  which the Lindsey draft does not use at all, plus the demand-type argument.

This draft therefore spends only **one sentence** on market separation and no hero numbers on it.
If only one goes out, they are not interchangeable — pick by which half of the post matters more.

## 3. Screen

| Check | Result |
|---|---|
| Geo (US/CA/UK/AU) | **PASS** — AU brand, US expansion |
| Ad spend ≥ $5K/mo | **Unmeasurable, not cleared** — no number given; nothing in the prose forecloses it |
| Hourly | Upwork type is hourly → answered as % of spend |
| White-label / full-time seat | PASS — "ongoing partner"; the words "full time" do not appear |
| Worker-location requirement | PASS — "responsive during business hours", no location *requirement* |
| **Ads + landing page owned together** | **CLEARS** — see below |

### CRO screen — clears, closest to the 2026-08-19 override
No landing-page build anywhere in scope. The funnel item is **"analyze… and identify"** (diagnosis), CRO
appears once as a *grasp* requirement, and required item (2) asks for **approach/method**, not proof.
**Zero CRO-proof-gated questions**, so the "two CRO-gated questions" line is not reached. Handled as
ad-to-page intent plus measurement. **No conversion-rate-lift result claimed anywhere.**

### Required item (1): "1-2 DTC/ecom case studies with metrics", home/outdoor preferred
Both supplied, both on-vertical physical consumer products, both verified live this session.

## 4. Facts verified live (Supabase, this session)

**Neue Maison** `act_782415276397596` (Meta, churned, operator Lindsey B.) — luxury furniture.
Tenure-filtered 2026-04-10→08-10: **$105,010.24 / 343 conv / $306.15 / CPM $51.33** (matches memory).
Removing the 9 non-purchase conversions (`TRADE PROGRAM` 1 conv $7,828.26; `Local Campaign | Calendly`
8 conv $5,357.22 = $13,185.48) leaves **$91,824.76 / 334 purchases / $274.92**.
- `July 4th - 50%` $23,843.26 → $99,424.88 = 4.17x @ **$567.70 CPA** (the headline, and the priciest)
- `Retargeting | 4/13` $16,999.77 → $92,141.96 = 5.42x @ $200.00
- **`Conversions | 5/8` (undifferentiated catalog) $5,264.05 → $423.80 = 0.08x**
- **`Conversions | Forge` (product-specific) $5,700.78 → $13,447.38 = 2.36x**  ← the lead insight

**Master Spa Parts** `act_2752863238119036` (Meta, churned, operator Lindsey B.) — home/outdoor product.
Takeover 2026-02-03, so **Jan is inherited/pre-tenure**:
| Month | Spend | Conv | CPA | CPM | ROAS |
|---|---|---|---|---|---|
| Jan 2026 *(inherited)* | $15,587.79 | 449 | **$34.72** | $8.10 | 4.57x |
| Feb (takeover 2/3) | $12,320.68 | 388 | $31.75 | $7.38 | 4.87x |
| Mar | $14,900.10 | 589 | $25.30 | $8.25 | 5.87x |
| Apr | $13,223.56 | 665 | **$19.89** | $8.18 | 8.07x |

CPA −43% with CPM flat → rules out a cheaper auction. Jan framed as *inherited*, never as our result.

**Myriad Traders Meta** `act_1529816118863696` — geo split, ceded to the Lindsey draft. Not used here.
(My own DB check, 7/08-7/15: UK 0.29x @ CPM $29.59 vs home market 4.06x @ CPM $39.63, blended 2.29x —
corroborates the six-week figures in the sibling draft from the same direction.)

## 5. Caveats / not verified
- **PipeBoard is still at its free-plan weekly limit.** One live attempt made, hard-failed, not retried.
  All figures above come from Supabase, which I verified directly.
- **Zero Australian-market proof.** Swept `meta_campaigns` for australia/AU/AUS/Sydney/Melbourne/Brisbane/
  Perth → **no rows**. Nothing in the draft claims AU experience.
- Discarded mid-research: `Conversions | Miami` looked like an $84.21 CPA win but is **0.70x ROAS** — cheap
  low-value conversions, not purchases. `Conversions | Membership` $184.93 CPA is likewise 0.39x. Neither used.
- Both cited accounts are **churned**. Past tense used throughout; a sharp prospect may ask.

## 6. QC pass (qc-reviewer-agent) — 3 blockers raised, 2 accepted, 1 rejected
- **Accepted — $105K paired with $275 did not reconcile** ($105K/334 = $314). Rewritten to $92K / 334 / ~$275.
- **Accepted — "ROAS went 4.57x to 8.07x" reused the inherited Jan baseline** without the qualifier. The ROAS
  sentence is cut; the CPA arc keeps its explicit "inherited" framing.
- **Accepted — the geo example inverts Outway's direction** (in Myriad the US is the *proven* market, the UK
  the new one). Moot now: the geo story moved to the Lindsey draft.
- **Rejected — "I stay across strategy and direction" flagged as a principal in a delivery seat.** It is the
  opposite: the sentence assigns delivery to the team. The pooling rule sanctions exactly this shape
  ("I sit on that account with the operator"). Kept.
- Noted, no change: third pricing tier (10% above $60K) omitted deliberately for a first touch.

## 7. Attachment decision
**None.** The two closely-matching case studies (Neue Maison, Master Spa Parts) have **no attachable PDF**.
The only safe DTC/Meta artifact is `unrefined_meal_prep_CLEAN.pdf` (meal prep) — off-vertical against a post
that says home/outdoor "strongly preferred", and weaker than the two carried in-body. Metrics in-body is what
item (1) actually asks for.

## 8. Compliance
Statement opener (not "I") · client's nouns, no parroting · no URLs / calendar link / contact info ·
**no sign-off name** (9/4 ruling) · no em dashes · % of spend, not hourly · budget asked as a **range** ·
tradeoffs stated (AEST coverage, the ROAS breakdown) · delivery attributed to the team · book pooled,
never first person · **400 words / 2346 chars** (limit 400 words, 5,000 chars)

---

## PROPOSAL

Going from one hero product into a full home range is where catalog prospecting quietly eats the budget. On a luxury furniture brand our team ran, the undifferentiated catalog campaign returned 0.08x inside the same four month window that product specific prospecting returned 2.36x. Same brand, same period. A single product gives the ad something to argue. A catalog gives it nothing, so budget goes to people who like the category rather than buyers.

That matters more for Outway than for most, because your two categories are not the same kind of demand. Solar garden lighting is solution aware. Someone already wants the garden lit. Home aesthetics indoor and outdoor is mostly unaware demand, so the creative has to build the want before it sells the product. Carry the lighting playbook straight into the wider range and the decay reads as creative fatigue when it is really message to intent mismatch.

The US move needs the same separation, its own campaigns and pacing, not a budget line inside the existing account.

On the funnel, the first pass is not in Ads Manager. It is whether Meta's reported purchases reconcile with actual Shopify orders, so pixel and CAPI deduplication come first, because everything after inherits that error. Then segment click to landing page view to cart to checkout and let the largest drop name the problem.

Numbers from that furniture account. $105K of Meta spend across four months. Strip the trade and lead lanes and the retail side was about $92K against 334 purchases, roughly $275 each. Worth saying plainly, its headline ROAS was carried by a 50 percent sitewide sale and by retargeting, which is why the catalog versus product split is the part worth copying. Separately, a spa and outdoor parts brand we inherited at $34.72 per conversion was at $19.89 within three months on $12-15K a month, with CPM flat near $8, which rules out a cheaper auction.

Availability is US Central from Nashville, so we would lock a fixed daily overlap rather than promise full AEST coverage. Day to day sits with our team, I stay across strategy and direction.

Rate is 20 percent of monthly Meta spend, stepping to 15 percent above $30K, with a $1,500 monthly minimum and a one time $1,500 onboarding. Not hourly.

What range is the Meta budget landing in for the US launch, and does AU hold steady while it ramps?
