# Upwork Proposal — Welham / premium men's eyewear (UK, Meta primary + TikTok secondary)

- **Profile:** Lindsey
- **Style:** `lindsey_default` (user asked for "Lindsey's strategic version"; `strategic` is a Samuel-only label — resolved to `lindsey_default` per the explicit "write it in lindsey_default" instruction)
- **Date:** 2026-09-08 (Postgres `now()`, US Central; local/harness clock was reading ahead)
- **Status:** UNSENT
- **Screen verdict:** DRAFT WITH A LIVE FORECLOSURE RISK. One firm requirement (live TikTok "structured and scaled") cannot be met with proof. See TikTok section — user's call whether to send.
- **Char count (paste-ready block):** 3,493 / 633 words, 0 em dashes (under the 5,000 Upwork cap)

---

## PROPOSAL (paste-ready)

What decides your Black Friday is not the Black Friday campaign, it is how many proven winners the account already carries before Q4 auction costs climb. An account still testing in November pays that tuition at the most expensive CPMs of the year, with no time left to act on what it learns. So the real deadline is mid-October, an account whose audiences and creative have already earned their spend.

On a young account the first constraint is almost never targeting, it is signal. Meta wants roughly 50 conversions a week per ad set to clear the learning phase, and a store with thin pixel history rarely hits that optimizing straight to purchase, so you either consolidate or optimize on a shallower event for the first few weeks and move up once the data is real. I launched a DTC brand called Blush Camera cold into the Instagram fashion and lifestyle audience yours lives in. Month one, cost per purchase was about $120. Month two, $68, once the account had signal and enough creative in rotation to hold frequency down. Then we scaled spend about 70 percent and CPA snapped back to $116, not from targeting, from running out of fresh creative while CPMs climbed. That is the real ceiling on scale for a brand like yours, and it is why the buyer and the creative team cannot sit in separate lanes. My job is to tell your strategist which angle is holding CPA at volume and which one won a test and died at scale.

Structure follows the same logic. Prospecting and retargeting get separate budgets and separate scaling rules, and on a young account retargeting is a thin slice, on Blush it held about 1.8x on a tenth of the spend, so the account has to work on cold economics first.

When the account is mature and the structure is right, the same discipline reads very differently. On a store we ran, cost per purchase went from $45 to $20 over four months and conversions from 349 to 665, on slightly less spend and with frequency flat the entire time. What moved was auction cost, CPM $11.68 down to $8.18. And we scaled a design-led premium brand from around $24K to $40K a month on Meta. After 10-plus years on ecommerce paid social, knowing which lever, creative or auction, is moving your number is most of the job.

None of it counts if the numbers are wrong. Before I scale I confirm the pixel and Conversions API are both firing, deduplication is clean, and event match quality is high enough to trust, then set attribution windows on purpose rather than taking the default.

Straight with you on TikTok, since you listed it as firm. Meta is where my depth and my numbers are. TikTok I run as the second channel, and what carries over is exactly what matters here, the testing discipline and the signal quality, because TikTok burns creative faster than Meta, not slower. If it has to be a proven day-one track record rather than the second channel built on the same method, better you hear that from me now than in week two.

Rather than blurred screenshots, I would put Ads Manager on a screen share and let you pull any date range yourself. On rate, we bill a percentage of ad spend, not a flat retainer, so the incentive tracks yours, 20 percent to start and dropping to 15 then 10 as monthly spend scales, plus a one-time onboarding that covers the audit and the 30-day plan. At £10K a month that is £2,000. What are you spending now, and is that a ceiling or a starting point?

There is a short video on my profile that shows how I work an account from a standing start.

---

## Screen Notes (internal — do not send)

### Screens cleared
| Screen | Result |
|---|---|
| Ad spend floor ($5K/mo) | PASS. £5,000–£20,000/mo. £5K ≈ $6.3K, above floor even at the bottom. |
| Geo (ads market) | PASS. UK brand + UK audience; UK ∈ US/CA/UK/AU. |
| Ads in scope | PASS. Owning the Meta + TikTok buying, structure, testing, scaling = core service. |
| Full-time employment seat | PASS. "Ongoing engagement rather than a one-off build," media-buyer contractor. No "full time" language. |
| White-label / subcontractor | PASS. Direct brand. |
| Self-funded / profit-share | PASS. They fund spend; rate is separate (hourly / retainer / retainer+perf, our choice). |
| Worker-location requirement | PASS. "Some overlap with UK hours" is a rhythm ask, not a location gate. |
| Flat-fee portfolio owner | PASS. |
| Duplicate profile bid | CLEAR. No `upwork_leads` row matches Welham/eyewear — no Samuel twin to collide with. |
| Char limit | PASS. 3,806 chars < 5,000. |

### The one firm requirement we FAIL — foreclosure risk (user's call)
Post: "Live TikTok Ads experience. Not 'I've read about it' — campaigns you have structured and scaled." Listed under REQUIREMENTS ("These are firm. Applications that don't meet them won't be reviewed.").

**We have zero citable TikTok proof.** Verified this session: there is **no `%tiktok%` table in the database at all** — no TikTok insights pipeline exists. The only TikTok-tagged row is a `reporting_clients` config row for Doctor Laleh (dental/aesthetics, no backing data). So we cannot show "campaigns structured and scaled" on TikTok, and even the one config row is off-vertical.

Handled by **not fabricating it**: the draft concedes TikTok is the second channel, not a day-one track record, in Lindsey's own candor register ("better you hear that from me now than in week two"). This is honest but it may trip their auto-filter. **If sent, expect the TikTok gap to be the deciding factor.** Options for the user: (a) send as-is and let Meta depth carry it; (b) skip on the firm-requirement rule; (c) if Lindsey has any real (even off-DB) TikTok reps we can cite, add them and the draft gets materially stronger.

### Proof gaps disclosed, not hidden
- **Eyewear / sunglasses / optical:** absolute zero (0 rows in `case_studies` / `clients`). Never claimed.
- **UK:** zero UK-located client/case-study proof surfaced. Never claimed; not disclosed in-body (no reason to volunteer, geo passes).
- **Fashion / apparel / accessories:** 0 real case studies (only the unbacked, churned "Fitness Superstore 40x" row and Google-only Aura Displays). Handled via Blush Camera, presented for exactly what it is — a DTC brand in the same Instagram fashion/lifestyle audience, evidenced by its own targeting — not as an eyewear/fashion case study.

### Every number verified live this session (all three accounts CHURNED = frozen historicals; operator = Lindsey B. on all three)
**Blush Camera** (`act_2050081878799128`, DTC fashion/lifestyle, churned 2026-06-16) — `meta_insights_daily`+`meta_campaigns`:

| Month | Spend | Conv | CPA | CPM |
|---|---|---|---|---|
| Feb 2026 | $4,801.98 | 40 | $120.05 | $12.44 |
| Mar 2026 | $10,757.85 | 157 | $68.52 | $12.24 |
| Apr 2026 | $11,944.21 | 163 | $73.28 | $17.06 |
| May 2026 | $19,972.01 | 172 | $116.12 | $31.60 |

- "Scaled ~70%" = Apr→May spend +67%. "CPA back to $116" = May. "CPMs climbed" = Mar $12.24 → May $31.60. All exact.
- **Lane split (freshly re-derived, spend-weighted):** prospecting $52,002.68 @ **1.41x**, retargeting $6,295.41 @ **1.83x**. Retargeting = 10.8% of the $58,298.09 total → "about 1.8x on a tenth of the spend." **NOTE:** this CORRECTS the 2026-09-02 Milana draft, which claimed prospecting 1.93x / retargeting 2.96x — those do not reproduce. Totals reconcile: $58,298.09 spend / 623 conv.

**Master Spa Parts** (`act_2752863238119036`, churned 2026-05-28):

| Month | Spend | Conv | CPA | CPM | Avg freq |
|---|---|---|---|---|---|
| Dec 2025 | $15,681.83 | 349 | $44.93 | $11.68 | 1.69 |
| Apr 2026 | $13,223.56 | 665 | $19.89 | $8.18 | 1.63 |

- Cited "$45→$20, 349→665, slightly less spend, frequency flat, CPM $11.68→$8.18." Freq band Dec–Apr = 1.63–1.74. **ROAS deliberately NOT cited** (standing ruling: Master Spa cite CPA/CPM/frequency only).

**Neue Maison** (`act_782415276397596`, design-led premium furniture, churned 2026-08-11, mgmt from 2026-04-10):
- Spend cited "~$24K → $40K a month": May $24,861.44 → Jul $40,389.21 (both in-tenure). **ROAS/CPM arc NOT cited** (Jul 4.17x is promo+retargeting, not cold — standing ruling). Spend scaling only.

### Rate math
20% ≤$30K, 15% $30–60K, 10% >$60K; $1,500/platform min; $1,500/platform onboarding; $15K cap (`pricing-reference.md`, per-platform, marginal). Worked example £10K Meta → £2,000/mo (20%). Chose £10K (mid-range) so the example sits above the $1,500/platform floor — at their £5K floor the minimum would apply; that's a call detail, not first-touch. Onboarding framed as covering "the audit and the 30-day plan" to map onto their Definition of Done.

### Rule compliance
lindsey_default: diagnostic opener (no "I" first word, no parroting their scope list — reframes "Black Friday" into a mid-October insight they don't have). Experience-heavy, numbers-dense (post explicitly rewards numbers). Book pooled ("we ran", "we scaled"); Blush first-person is honest (Lindsey = verified operator). No principals named. Profile-video close, no sign-off name. No links / contact info / calendar link (first touch). No em dashes, no bold/bullets/headers in the paste block. Meta + ecommerce framing only. % of spend, never hourly (post offered hourly; declined it structurally). Spend ask as relative range (ceiling vs starting point). No trial offered, none requested. UK-hours overlap not fabricated into a specific promise.

### Not sendable-blind — open items before any send
- **TikTok firm requirement** (above) — the deciding call.
- **Screening questions** were referenced ("Please answer the screening questions") but NOT included in the post text provided. Cannot draft answers without them. If they exist, paste them and I'll answer separately (own file).
- **Payment-method verification** — unchecked (logged out). Screen before sending.
