# Upwork Proposal - Mitchell Wool Co (US farm yarn brand, Meta + Google purchase funnel, fixed-price 3 milestones)
Profile: Lindsey | Style: lindsey_default | Status: UNSENT | Drafted 2026-09-04

---

The number that decides most of this: what is your average order value now, and what share of orders contain a kit rather than one skein? A $30 skein sits near the floor at which Purchase optimization stops working, which shapes M2 more than tracking does.

1. FIRST THREE THINGS I INSPECT

Dataset quality. Whether Purchase fires, whether browser and server events share an event_id so Meta deduplicates rather than double counts, and what Event Match Quality reads. Then I reconcile Ads Manager purchases to Shopify over the same window before trusting any number.

Exclusions and overlap. Whether past purchasers and recent visitors sit inside prospecting. Self-built funnels often look converted because warm traffic sat in cold campaigns.

Where the money went. Spend by objective across the account's history, and the landing page on every ad. Traffic spend pointed at a homepage explains "did not reliably convert" by itself.

2. PIXEL VS CAPI FOR iOS

Both, deduplicated, server side primary. Shopify's native Meta channel or a server-side GTM container sends Purchase, InitiateCheckout, AddToCart and ViewContent from your server with hashed email, phone and external_id. The browser pixel fires on the same event_id, so Meta merges the pair rather than double counting. Domain verified, Purchase first in the Aggregated Event Measurement slots. Proof is a Test Events recording showing both sources arrive and deduplicate, plus a match quality reading. I will not call M2 live without it.

3. MONTH ONE OPTIMIZATION EVENT

Purchase. ThruPlay and landing page views buy the cheapest available human, and Meta is very good at finding people who will watch a beautiful farm film and buy nothing. Your funnel already showed traffic was not the constraint.

The risk with Purchase is volume, not correctness. An ad set needs roughly 50 conversions a week to leave learning, and a $30 skein will not hand that to five ad sets. The fix is consolidation, not a softer event: one broad prospecting ad set carrying the budget so signal pools, retargeting and catalog underneath. If counts stay thin after two weeks I would raise order value with kits and bundles rather than drop to a shallower event, which also keeps us off discounting.

4. FARM FOOTAGE THAT SELLS A $30 SKEIN

"Slow down. Touch something real." is a brand film, raw material rather than a direct response ad, and asking it to be one is part of why the funnel stalled. Someone choosing $30 US wool over $8 acrylic is buying provenance and hand. The ad has to show what justifies the price inside three seconds: the flock, the dye pot, fiber in hands, the finished stitch. A claim, not a mood. From there, a matrix of five concepts minimum: origin, maker, product in hand, honest comparison against commodity yarn, kit or bundle. Each cut as film and raw vertical, because raw usually wins cold.

No countdown timers, no urgency theatre, no discount codes. Gimmicks make an earnest brand read like every dropshipper in the feed, and discounting is what your shops feel first.

5. M1 AND M2 FEES

M1 $1,500. M2 $1,500. $3,000 USD one time, media separate. That is our standard onboarding of $1,500 per platform, Meta and Google, mapped across your milestones. The audit sits inside it rather than billed on top, with no separate tracking or build charge.

M3 is management, a percentage of spend with a monthly minimum per platform, never hourly. Exact figure in writing once you name a monthly media range. If that range is small enough that a management fee eats it, I would rather say so at M1 than sell you M3.

6. REPORT SAMPLE

Attached is a redacted weekly scorecard from a live store: spend, purchases, revenue, ROAS, cost per purchase, order value, and that week's kill and keep list. Two rows, MER and new customer share, sit empty. That account has no store revenue feed connected. I would rather send a real report with two honest gaps than a filled-in demo. Yours carries both from the first full week after M2.

TWO STORES, PHYSICAL GOODS

A replacement parts store I ran on Meta for nine months: $128,518 spend, 4,440 purchases, $28.95 per purchase, roughly 5.5x blended. Shape matters more than the headline: December ran $44.93 per purchase and April $19.89, from consolidating campaigns and killing hooks rather than adding budget. Prospecting, retargeting and catalog ran as separate layers, purchasers excluded throughout. That engagement has ended.

A Shopify DTC brand our team runs on Google now: Shopping 5.73x on $22,947, Performance Max 5.29x, feed and Merchant Center managed by us. The Shopping and PMax half of your M2, live.

WHAT I DO NOT HAVE

No yarn, fiber, or farm brand in the book. Not one. Nearest neighbours are premium home goods and considered purchase DTC, where the decision is craft rather than price. If a proposal claims regenerative wool experience, ask which brand.

WHAT I NEED

Your target monthly media range, and read access to Shopify, GA4 and both ad accounts before day one.

---

## Screening notes (internal, not part of the proposal)

**BLOCKER: this job is already drafted on the Samuel profile.** `.claude/upwork-drafts/mitchell-wool-co-samuel-strategic.md` covers the identical post in samuel_strategic. Per the standing rule (two Creekside profiles can bid one job; a prospect noticed this on 2026-08-27), **do not send both.** Pick one profile. No `upwork_leads` row exists for Mitchell Wool yet, so the duplicate was only caught on the filesystem.

**Numbers in the existing Samuel draft do not match live data.** It cites "$131K spend, 4,500 purchases" and monthly ROAS of 3.22x (Dec) / 8.07x (Apr). Recomputed live: **$128,517.74 / 4,440 purchases**, and monthly ROAS reads 4.30x (Dec) / 8.57x (Apr). If Samuel is the profile that goes out, correct those first.

**Style:** Request said "strategic + diagnostic ... write it in lindsey_default." `strategic` is a Samuel-only style label; Lindsey has one sanctioned style and it is diagnostic by construction, so lindsey_default was used as instructed. Mismatch resolved, not left open.

**Verified live against the DB, 2026-09-04 (all via `contractor_query`):**
- Replacement parts store = **New Master Spa Parts** (`meta_insights_daily` joined to `meta_campaigns`/`meta_ad_accounts`, platform_operator Lindsey B.): $128,517.74 spend, 4,440 conversions, **$28.95** cost per purchase, 2025-09-03 to 2026-05-26. Monthly: Dec $44.93, Apr $19.89. **Churned 2026-05-28**, written in past tense.
  - Blended ROAS: revenue/spend across rows with a non-null roas gives 6.57x, but that subset covers only $108,622 of $128,518 spend. Over **full** spend it is **5.55x**, consistent with the canon ruling of 5.53x. Draft says "roughly 5.5x" deliberately. Do not let anyone raise this to 6.5x.
- Shopify DTC brand on Google = **Aura Displays** (`google_insights_daily`): Shopping **5.73x** on $22,947.27 / 251.7 conv (through 2026-08-31); PMax **5.29x** on $6,632.46. **ACTIVE**, so present tense is correct. Attributed to "our team" not "I" — operator is Ahmed I., account manager Peterson. Book pooled, first person not overclaimed.
- Aura is **Google-only**; no Meta account. Draft never implies otherwise.
- Neue Maison held in reserve, not cited (cut for length). If re-added, the only citable window is tenure **2026-04-10 to 2026-08-10: $105,010.24 / 343 purchases / $306.15 CPA** — verified exactly. The 12-month table totals ($216,204 / 957 / $225.92) are pre-tenure contaminated. Churned 2026-08-11, past tense.
- **Yarn / wool / fiber / craft proof: zero.** No match in `clients` or `case_studies`. Disclosed in the draft rather than papered over.
- Also verified and deliberately NOT used: Scattered Kind PMax 6.91x on $13,446 (active, Scott C.) and Myriad Traders Shopping 2.23x (active, only since 2026-07-07). Scattered Kind is a legitimate third Google cite if length allows.

**Pricing:** From `pricing-reference.md` (canonical, 2026-05-25). Onboarding **$1,500/platform** with the audit included, two platforms = $3,000 split across M1/M2. M3 management = 20/15/10 marginal at $30K/$60K breakpoints, **$1,500/platform monthly minimum**, $15K cap. Never hourly. Fee stated because the job makes it a required answer and says incomplete proposals are declined; that overrides lindsey_default's usual no-pricing-first-touch.

**ACTION REQUIRED BEFORE SENDING — the attachment.** Q6 and the must-have list both demand a redacted report. The draft says "Attached is a redacted weekly scorecard." **Nothing is attached yet and no redacted sample file exists on disk.** One has to be produced and attached, or that line becomes a false claim. Real weekly-report structure to model it on lives in `agent_knowledge` (the Fusion Meta Weekly Report rows) and in the live `reporting_clients` dashboards. Do not send until the file is attached. No case-study PDF should be attached in its place; per canon those are unverified or Samuel-bylined.

**Screens OPEN (not cleared):**
- **Ad spend vs the $5,000/month minimum.** No budget stated anywhere in the post, and the signals cut small: a family farm, a $30 unit price, fixed-price milestones. Unstated is not low, so this is not an auto-DQ, but it is the likeliest kill. The draft asks for a range and pre-commits to declining M3 if the number cannot carry a fee.
- Geography: US brand, US wool, US shops. In territory.
- Payment method verification not checkable while logged out.

**Deliberate omissions:** no URLs and no calendar link (first touch on a job post). No sign-off name. No em dashes. No guaranteed ROAS, matching their out-of-scope list. The profile-video line was cut purely for length; re-add it if the attachment lets characters free up.

**Length:** 4,996 characters, inside the 5,000 Upwork limit as written.

---

## Attachment (built 2026-09-04)

`.claude/attachments/weekly-scorecard-sample-redacted.pdf` (1 page, Letter). Source HTML and the
generator script sit alongside it; every figure is computed in the script from the pulled rows, none
typed by hand.

**Source account: Myriad Traders** (`practicalsurvivalgear.com`, DTC outdoor gear, Shopify, multi-SKU
catalog). **ACTIVE**, so "a live store" is accurate. Google Ads only. Week of **Mon 2026-08-24 to Sun
2026-08-30**, compared against **2026-08-17 to 08-23**. Both are complete weeks; the 08-31 week is
partial (data ends 09-02) and was deliberately not used.

Verified totals, current week: **$2,602.84 spend, 96.5 purchases, $8,433.99 revenue, 3.24x ROAS,
$26.97 cost per purchase, $87.40 AOV**. Prior week: $1,134.43 / 33.99 / $2,375.11 / 2.09x / $33.38 /
$69.88. Campaign split and the kill/keep list are real: Search Branded genuinely spent $52.69 for zero
purchases on 73 impressions that week.

**Why this account and not the two in the proposal.** The scorecard needed a *live* store. Master Spa
Parts churned 5/28/26. Aura is live but sits at a $452 AOV, nothing like a $30 skein. Myriad's $87 AOV
and $26.97 cost per purchase are the closest economic shape to a yarn brand selling skeins and kits.
The proposal never claims the scorecard comes from either named case study, so there is no conflict.

**Why it is Google and not Meta.** Checked every Meta account with spend in that week: **all of them
return NULL conversions and NULL roas**, including the live e-commerce ones. There is no live Meta
account capable of producing a credible weekly purchase scorecard right now. This is worth knowing
beyond this proposal.

**MER and new customer share are shown empty, on purpose.** Neither is sourceable: `reporting_clients.
monthly_revenue` is *our fee*, not store revenue, and no Shopify or customer table exists in the DB.
Fabricating them was the only alternative, so the report shows the rows blank with a footnote, and
**the proposal's answer 6 was rewritten to match** rather than left claiming both were populated.

**Redaction applied:** client name, website, product names, account identifiers, and campaign launch
dates all removed ("Shop - All Products - 24 Jun" became "Shopping — All Products"). Category is
described only as "DTC outdoor gear retailer". No URLs anywhere in the file.

**Deliberately unbranded.** No Creekside logo or agency name, because I could not confirm how
Lindsey's Upwork profile presents agency affiliation and a mismatch is worse than a plain header. Add
branding before sending if her profile carries it.
