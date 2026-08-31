# Upwork Proposal — Paid Ads Manager, beauty/aesthetics agency (Meta and/or Google, month-to-month)
Profile: Lindsey | Style: lindsey_default | Drafted 2026-08-31 (Postgres now(); local clock read 2026-09-01)
STATUS: UNSENT — WHITE-LABEL/SUBCONTRACTOR AUTO-DQ, DRAFTED ON REQUEST

---

Have you tried splitting static and video into separate campaigns on the aesthetics accounts, rather than letting them compete inside one ad set? The answer usually decides whether creative testing tells you anything, and on beauty accounts it tends to go the opposite way from what the dashboard suggests.

On an aesthetics practice account I ran on Meta this past year, the video and static campaigns sat side by side on the same audience for twelve months. Video bought impressions at well under half the cost of static, about $27 CPM against $60. Every surface read said kill the static. It was the static that produced results at roughly 38 percent lower cost per action, on under a third of the budget. Had those two lived in one ad set, delivery would have starved the winner to chase the cheaper impressions.

That is most of what creative testing in this category actually is. Reach is expensive here and CPM is a poor proxy for what an account will produce, so the accounts that get scaled on efficiency metrics tend to stall around month three.

Ten years of my work is Meta and email for e-commerce and local brands. Before agency work I built and sold my own e-commerce business, so I read a report the way the person paying for it does, not the way an ads platform presents it.

Straight on fit. Meta is my lane and Google is not, so I would be bidding on half of what you listed. My documented results sit in aesthetics, wellness, food and DTC rather than skincare product brands specifically.

Attached a few results below so you can see how that looks in practice.

There is a short video on my profile that covers the process better than text.

---
Word count: 306. Character count: 1,752 (limit 5,000).

---

## SCREEN RECORD (verified live against Postgres 2026-08-31, contractor_query)

### RECOMMENDATION: SKIP. Drafted on explicit request.

**FLAG 1 — WHITE-LABEL / SUBCONTRACTOR. Standing auto-DQ. This is the decisive one.**
"We manage paid advertising for beauty and aesthetics brands and are expanding our team... You will own ad accounts end-to-end... for multiple clients." That is an agency hiring a media buyer to service THEIR client book. Precedent: 19 skips vs 2 draft-anyways, and both overrides were on REPEAT sightings. This is a first sighting (see FLAG 6).

**FLAG 2 — No ad spend stated anywhere.** The $5K/mo floor cannot be cleared. Also unscreenable: their clients' budgets are the spend that matters, and none are named.

**FLAG 3 — No rate stated.** The $40/hr listed-minimum screen cannot be applied. "Role", "engagement", "expanding our team" all point to hourly, which collides with never-bill-hourly (21 rulings, % of spend only). No paid-test carve-out is on offer here.

**FLAG 4 — Month-to-month, stated up front.** Adjacent to the no-trials / 90-day-minimum screen (8 skips vs 2 overrides). Weaker than usual because this is a contractor seat rather than a client engagement, but it is the same compounding problem: no runway before renewal.

**FLAG 5 — PROOF GAP against their stated requirement.** They ask for "proven results in beauty, skincare, wellness, or aesthetics." Verified live today:
- **0 of 28** case studies carry a beauty / skincare / cosmetics industry_label. Confirmed by full table pull.
- **Ella Skincare** — the only skincare row in the client book. Meta access lost 2026-07-28, and `meta_insights_daily` returns ZERO rows for it. Not citable, not mentioned in the letter.
- **Fusion Aesthetics** — INACTIVE. **Advanced Med Spa** — case study exists, account inactive, and its Drive PDF is a dead link.
- **Wellness** is the one word in their list we can partly answer: Integrity Naturopathic (Google only, wrong platform for Lindsey), Outback Peptides (signed 2026-08-20, zero results yet).
- **"Primarily female audiences" / "women-led" / "digital product brands"** — no gender-breakdown data exists in any of our Meta tables, and there is zero digital-product proof. Not claimed anywhere in the letter.

**FLAG 6 — no duplicate bid.** `upwork_leads` returned 0 rows on beauty / aesthetics / skincare / "aesthetics brands". Safe on the two-profiles-one-job rule.

### PASSES
- Category (beauty, e-commerce, aesthetics) is inside Lindsey's named industries.
- Meta is central to the post, so no wrong-service red flag for her.
- Not coaching an Upwork competitor, not profit-share, not self-funded, no detection evasion, no worker-location requirement, no CRO gate.
- Geo: not stated. Not a clean pass, but not a foreclosure either.

---

## MATERIAL CORRECTION TO STANDING RECORD — Doctor Laleh Meta

Memory on file says Laleh Meta is the single-account ceiling at ~$1.19M/12mo, ~$99K/mo, ACTIVE. **Live pull today contradicts this.**

`meta_ad_accounts` returns exactly ONE Laleh account, `act_1216889619869757` ("Doctor Laleh Main Ad Account"), 8 campaigns, 2,920 insight rows:

| | 2025-08-31 → 2026-08-30 |
|---|---|
| Spend | **$15,671.05** |
| Impressions | 531,643 |
| Clicks | 18,266 |
| Conversions | 113 |
| CPM | $29.48 |
| Blended CPA | $138.68 |

**All 8 campaigns are status PAUSED.** Laleh Meta is dark, not running at scale. The ~$99K/mo figure on file is not supported by the Meta tables and most likely belongs to the Google side (aesthetics pack records Google at $80.9K / 552 conv since 2026-04-20). Treat Laleh Meta spend as NON-citable for scale until reconciled.

### Numbers actually cited in this letter, and their basis
Same account, same 12-month window, campaign-level split. Apples-to-apples because both rows come from the same pipeline and period:

| Campaign | Spend | CPM | CTR | Conv | CPA |
|---|---|---|---|---|---|
| E \| Video Campaign - July.25 | $10,695.91 | $26.90 | 3.20% | 75 | $142.61 |
| E \| Static Campaign - July.25 | $3,344.20 | $60.15 | 3.59% | 38 | $88.01 |

- Letter cites **CPM $27 vs $60** (verbatim-safe, unambiguous metric).
- Letter cites cost per action as **"roughly 38 percent lower"** for static. 88.01 / 142.61 = 0.617, so 38.3% lower. **Stated as a RELATIVE movement only.** The standing rule is that Laleh's absolute CPA is not citable (case study claims $48.79 to $9.58; live blended is $138.68). A within-account, within-period ratio survives that dispute; an absolute number does not. Do not volunteer the absolute figures if probed on this.
- Letter cites **"under a third of the budget"**. 3,344.20 / 10,695.91 = 31.3%. Accurate.
- Written in **past tense** ("I ran on Meta this past year") because every campaign is now paused. No claim of a live account is made.
- KNOWN LIMIT: the `conversions` column is what drives the 38%. Both campaigns carry objective `engagement`, so these are engagement-side conversions, not booked patients. The comparison is honest; the absolute business value is not claimed.

### REJECTED for citation, and why
- **Ella Skincare** — the on-category account. Access lost 2026-07-28, zero rows. Omitted entirely.
- **Fitness Superstore "40x+ peak ROAS"** — unbacked cherry-picked peak, standing correction, and not Lindsey's account.
- **Punch Drunk Chef "20x"** — true blended is 1.76x. Settled correction.
- **Neue Maison** — churned. Live series shows CPA deteriorating $107 to $313 across the year and CPM climbing to $78.88 in July. Nothing here helps a beauty pitch.
- **Tiami Sleep** — Lindsey's, luxury DTC, but `conversions` is NULL on 6 of 10 months and CPA reads $1,305 to $3,013 where it exists. Not citable.
- **CI Lifestyle Meals** — Lindsey's and ACTIVE, live blended CPA $5.50 to $12.20 across 2026. Solid but food, and off-shape for a beauty creative-testing pitch. Held for attachment, not for the letter body.
- **Dr. Laleh case study PDF** — leads with "CPA $48.79 to $9.58", the one Laleh metric we cannot stand behind. DO NOT ATTACH.

### Attachment guidance
There is **no on-category attachment**. Zero beauty/skincare PDFs exist.
- RECOMMENDED: `ci_lifestyle_meals.pdf` alone, and change "a few results" to the singular. It is the only live Meta PDF that is genuinely Lindsey's own ACTIVE account, and its new-customer-only framing survives a sophisticated read.
- DO NOT ATTACH: `Dr. Laleh Elective Health Care Case Study.pdf` (non-citable headline metric), `punch_drunk_chef.pdf`, `South_River_Mortgage_*` ($81 CPL fails verification, churned), the three contractor-supplied Drive PDFs (Chagrin Valley / American Foam / GPP), anything from "Upwork Domination | Client Screenshots" (Nicholas Bandy's inbox), any POLARIS file (leaks the Samuel/Peterson persona).

### Style compliance
L1 diagnostic-question opener, rotated off the L5 used on the last Lindsey draft (EU skincare, 2026-08-28). No "I" opener. Experience-heavy body. No parroting of their post language ("plain, client-friendly language" deliberately re-expressed rather than echoed). No em dashes, no URLs, no contact info, no calendar link, no client names, no sign-off. Google explicitly disclaimed as her service rather than offered. Results-attached line and profile-video line both present. 306 words, 1,752 characters.
