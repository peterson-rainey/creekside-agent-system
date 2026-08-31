# Upwork Proposal — Paid Ads Manager, beauty/aesthetics agency (Meta and/or Google, month-to-month)
Profile: Lindsey | Style: lindsey_default | Drafted 2026-08-31 (Postgres now(); local clock read 2026-09-01)
STATUS: UNSENT — WHITE-LABEL/SUBCONTRACTOR AUTO-DQ, DRAFTED ON REQUEST

---

Have you tried splitting static and video into separate campaigns on the beauty accounts, rather than letting them compete inside one ad set? The answer usually decides whether creative testing tells you anything, and in this category it tends to run opposite to what the dashboard suggests.

On a smaller aesthetics practice account I ran on Meta this past year, video and static sat side by side against the same audience for twelve months. Video bought impressions at well under half the cost of static, about $27 CPM against $60. Every surface read said kill the static. Static was the one producing results at a materially lower cost per action, on under a third of the budget. Inside a single ad set, delivery would have starved the winner to chase the cheaper impressions.

That is most of what creative testing in beauty actually is. Reach is expensive here and CPM is a poor proxy for what an account will produce, so accounts scaled on efficiency metrics tend to stall around month three.

Scale is a separate account. I run a cosmetic and aesthetic practice on Meta at just under $100,000 a month, roughly $1.19 million across the last twelve months, still live today.

Ten years of my work is Meta and email for e-commerce and local brands. Before agency work I built and sold my own e-commerce business, so I read a report the way the person paying for it does.

Straight on fit. Meta is my lane and Google is not, so I would be bidding half of what you listed, and my documented results sit in aesthetics and wellness rather than skincare product brands specifically.

Attached a few results below so you can see how that looks in practice.

There is a short video on my profile that covers the process better than text.

---
Word count: 311. Character count: 1,802 (limit 5,000).

---

## SCREEN RECORD (verified live against Postgres 2026-08-31, contractor_query)

### RECOMMENDATION: SKIP. Drafted on explicit request.

**FLAG 1 — WHITE-LABEL / SUBCONTRACTOR. Standing auto-DQ. This is the decisive one.**
"We manage paid advertising for beauty and aesthetics brands and are expanding our team... You will own ad accounts end-to-end... for multiple clients." That is an agency hiring a media buyer to service THEIR client book. Precedent: 19 skips vs 2 draft-anyways, and both overrides were on REPEAT sightings. This is a first sighting (see FLAG 6).

**FLAG 2 — No ad spend stated anywhere.** The $5K/mo floor cannot be cleared. Their clients' budgets are the spend that matters and none are named.

**FLAG 3 — No rate stated.** The $40/hr listed-minimum screen cannot be applied. "Role", "engagement", "expanding our team" all point to hourly, which collides with never-bill-hourly (21 rulings, % of spend only). No paid-test carve-out is on offer.

**FLAG 4 — Month-to-month, stated up front.** Adjacent to the no-trials / 90-day-minimum screen (8 skips vs 2 overrides). Weaker than usual because this is a contractor seat rather than a client engagement, but it is the same compounding problem.

**FLAG 5 — PROOF GAP, partially answerable.** They ask for "proven results in beauty, skincare, wellness, or aesthetics."
- **Aesthetics: ANSWERABLE.** See the two accounts cited below. This is the one requirement we clear.
- **Skincare: ZERO.** 0 of 28 case studies carry a beauty / skincare / cosmetics industry_label (full table pull). **Ella Skincare** is the only skincare row in the client book, Meta access lost 2026-07-28, and `meta_insights_daily` returns ZERO rows for it. Not citable, not mentioned. **Fusion Aesthetics** INACTIVE; **Advanced Med Spa** case study exists but account inactive and its Drive PDF is a dead link.
- **Wellness: THIN.** Integrity Naturopathic is Google-only (wrong platform for Lindsey); Outback Peptides signed 2026-08-20 with zero results yet.
- **"Primarily female audiences" / "women-led" / "digital product brands"** — no gender-breakdown data exists in any Meta table, and there is zero digital-product proof. Not claimed anywhere in the letter.

**FLAG 6 — no duplicate bid.** `upwork_leads` returned 0 rows on beauty / aesthetics / skincare / "aesthetics brands". Safe on the two-profiles-one-job rule.

### PASSES
- Category is inside Lindsey's named industries, and aesthetics is her single strongest live vertical.
- Meta is central to the post, so no wrong-service red flag.
- Not coaching an Upwork competitor, not profit-share, not self-funded, no detection evasion, no worker-location requirement, no CRO gate.
- Geo not stated. Not a clean pass, not a foreclosure.

---

## NUMBERS CITED, AND THEIR BASIS

### Claim 1 — the creative split. Account `act_1216889619869757`, "Doctor Laleh Main Ad Account"
Small account, $15,671.05 over 2025-08-31 to 2026-08-30. Campaign-level, same window, same audience:

| Campaign | Spend | CPM | CTR | Conv | CPA |
|---|---|---|---|---|---|
| E \| Video Campaign - July.25 | $10,695.91 | $26.90 | 3.20% | 75 | $142.61 |
| E \| Static Campaign - July.25 | $3,344.20 | $60.15 | 3.59% | 38 | $88.01 |

- Letter cites **$27 CPM vs $60** (unambiguous metric) and **"under a third of the budget"** (3,344.20 / 10,695.91 = 31.3%).
- Cost per action is stated only as **"materially lower"**, deliberately with no figure. The ratio is 38% lower (88.01 / 142.61 = 0.617), but Laleh CPA is non-citable as a standing rule, so no number is published. Do not volunteer the absolutes if probed.
- **Past tense**, because all 8 campaigns on this account are now status PAUSED. The letter says "ran", and calls it "a smaller account" so scale is never implied from it.
- KNOWN LIMIT: both campaigns carry objective `engagement`, so these are engagement-side conversions, not booked patients. The comparison is honest; business value is not claimed.

### Claim 2 — the scale figure. Account `act_868498138612020`, " Lux Dental Spa FB Ads "
Re-verified live this session via the 12-month account leaderboard:

| | Trailing 12 months |
|---|---|
| Spend | **$1,186,491.11** |
| Avg/month | **$98,874.26** |
| Impressions | 30,750,177 |
| CPM | $38.58 |
| Rows with non-null conversions | **412 of 47,450 (99.1% NULL)** |

- Letter cites **"just under $100,000 a month"** and **"roughly $1.19 million across the last twelve months"**, present tense (account is live). Both accurate.
- **NO CPA, CPL, or cost-per-patient is cited.** At 99.1% NULL conversions any computed CPA is a tracking artifact. Standing rule upheld.
- Vertical is cosmetic/aesthetic dentistry and med spa, which is why it carries this post. Lindsey is the platform operator, so first person is legitimate.
- The two accounts are placed in **separate paragraphs** with "Scale is a separate account" as an explicit divider, so the CPM finding is never juxtaposed against the $1.19M in a way that reads causal.

### RETRIEVAL TRAP — hit and corrected this session
`WHERE account_name ILIKE '%laleh%'` returns ONLY the small $15.7K account and silently understates the ceiling by ~76x, with no error to tip you off. The ceiling account is named `" Lux Dental Spa FB Ads "` (leading and trailing spaces), not anything containing "Laleh". An earlier version of this screen record wrongly concluded from that query that Laleh Meta was dark and that the ~$99K/mo record was inflated. **That conclusion was wrong and has been removed.** Always join through `act_868498138612020` or read the top row of the full leaderboard.

### REJECTED for citation, and why
- **Ella Skincare** — the on-category account. Access lost 2026-07-28, zero rows. Omitted entirely.
- **Fitness Superstore "40x+ peak ROAS"** — unbacked cherry-picked peak, and not Lindsey's account.
- **Punch Drunk Chef "20x"** — true blended is 1.76x. Settled correction.
- **Neue Maison** — churned; live series shows CPA deteriorating $107 to $313 over the year, CPM up to $78.88 in July. Nothing here helps a beauty pitch.
- **Tiami Sleep** — Lindsey's, luxury DTC, but only 10 of 9,601 rows carry conversions. Not citable.
- **CI Lifestyle Meals** — Lindsey's and ACTIVE, live blended CPA $5.50 to $12.20 across 2026. Solid but food. Held for attachment, not the letter body.
- **Dr. Laleh case study PDF** — headline is "CPA $48.79 to $9.58", the one Laleh metric we cannot stand behind. DO NOT ATTACH.

### Attachment guidance
There is **no skincare-category attachment**. Zero beauty/skincare PDFs exist.
- RECOMMENDED: `ci_lifestyle_meals.pdf` alone, and change "a few results" to the singular. Only live Meta PDF that is genuinely Lindsey's own ACTIVE account; its new-customer-only framing survives a sophisticated read.
- DO NOT ATTACH: `Dr. Laleh Elective Health Care Case Study.pdf` (leads with the non-citable CPA), `punch_drunk_chef.pdf`, `South_River_Mortgage_*` ($81 CPL fails verification, churned), the three contractor-supplied Drive PDFs (Chagrin Valley / American Foam / GPP), anything from "Upwork Domination | Client Screenshots" (Nicholas Bandy's inbox), any POLARIS file (leaks the Samuel/Peterson persona).

### Style compliance
L1 diagnostic-question opener, rotated off the L5 used on the last Lindsey draft (EU skincare, 2026-08-28). No "I" opener. Experience-heavy body. No parroting of their post language ("plain, client-friendly language" deliberately re-expressed rather than echoed). No em dashes, no URLs, no contact info, no calendar link, no client names, no sign-off. Google explicitly disclaimed as her service rather than offered. Results-attached line and profile-video line both present. 311 words, 1,802 characters.
