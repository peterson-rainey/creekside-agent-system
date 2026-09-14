# Upwork Proposal: E-commerce marketer to manage and grow online store through paid ads (Meta primary, TikTok/Google potential)

- **Profile:** Lindsey | **Style:** lindsey_default (request said "strategic version, write it in lindsey_default", resolved in the same message) | **Date:** 2026-09-15 | **Status:** UNSENT, v2 (rewritten off the Samuel twin), QC + expert review applied
- **Attachment:** NONE. No Lindsey-operated ecom PDF is attachable (Master Spa Parts, Tiami, Neue Maison have no case-study PDF; Blush Camera PDF is DO-NOT-ATTACH).
- **TWIN EXISTS: SEND ONE PROFILE.** `.claude/upwork-drafts/2026-09-14_ecommerce-marketer-grow-online-store-paid-ads_samuel_strategic_UNSENT.md` (commit a782e32, parallel session). v1 of this draft used the same Q4 CTR-vs-CPM spa parts argument as the Samuel twin, so v2 was rewritten on offers (full price vs promo) and warm-audience size. Master Spa Parts still appears in one results line in both drafts.

## PROPOSAL (paste-ready)

When a discount ad wins one of your tests, do you know whether that same ad would still sell at full price? For a store, a winner that only works on sale costs margin on every order once you scale it.

I ask because I ran a luxury furniture brand on Meta until August, about $105,000 in spend over four months. In May, June and July the biggest campaign each month was a sale, and in July the 50% off campaign alone took 59% of the budget. A 50% off ad mostly proves people want 50% off. So I test offers in two groups, full price and promo, and an ad only earns more budget once it holds up at full price.

Audiences have a similar trap when you scale. On a consumer camera brand I ran, about $58,000 in spend, retargeting brought in roughly one purchase in seven. Its cost per purchase was a little lower, but there are only so many past visitors to show ads to, so growth still had to come from people who had never heard of the brand.

I also ran Meta for a replacement parts store, a little over $120,000 in spend at about 5.5x ROAS, and I run a luxury mattress brand now. I've done this for over 10 years, and I built and sold my own e-commerce business before working with clients, which is why I watch margin as closely as ROAS.

Roughly where does your monthly Meta spend sit right now, a few thousand or well into five figures? That decides how many offer tests can run side by side.

I recorded a quick video on my profile that shows how I take over and run an account.

---

## Screening notes (internal, not part of the proposal)

| Screen | Result |
|---|---|
| Already drafted / dual bid | **SAMUEL TWIN FOUND AT SAVE TIME.** Start-of-session checks were empty (`upwork_jobs` ILIKE on post text: 0 rows; draft-folder grep: 0 hits). Pre-commit grep found `2026-09-14_ecommerce-marketer-grow-online-store-paid-ads_samuel_strategic_UNSENT.md`, committed a782e32 by a parallel session. Neither is sent. Send one. |
| Ads in scope, white-label, full-time seat | PASS. Direct store owner, ongoing paid ads management. |
| Platform fit (Lindsey scope) | PASS. Meta primary. TikTok/Google "potentially" is outside Lindsey's permitted services, left unmentioned. |
| Proof demand ("examples of stores, results, experience") | ANSWERABLE from Lindsey's own operator book; every cited account has platform_operator = Lindsey. |
| Geo | UNKNOWN. Pasted text only. Confirm on the job page. |
| Payment verification | UNKNOWN. Confirm on the job page. |
| Ad spend ($5K floor) | UNSTATED. Asked as a relative range. Provisional until it clears $5K. |
| Budget / rate / trial | None stated. Pricing not raised. |

### Divergence from the Samuel twin

| Samuel strategic | Lindsey default v2 |
|---|---|
| Opener: ROAS drop = broken campaign or pricier auction | Opener: does a discount winner still sell at full price |
| Spa parts Q4 ROAS/CPM/CTR series | Furniture brand sale-campaign share |
| Google tech accessories non-brand scaling curve | Camera brand retargeting share (warm pool is finite) |
| Break-even ROAS, Events Manager, broad + retargeting structure, TikTok disclosure | none of these |
| Pricing paragraph | no pricing |
| Close: margin + $5K vs $20K spend | Close: spend as a relative range |
| Shared: Master Spa Parts (Samuel: "spa and hot tub parts store", Q4 numbers; Lindsey: "replacement parts store", tenure total only) | |

### Proof used, verified live 2026-09-15 via contractor_query

- **Neue Maison** (luxury furniture, operator Lindsey B., CHURNED 2026-08-11). `meta_insights_daily` JOIN `meta_campaigns` JOIN `meta_ad_accounts`, from 2026-04-10: $105,010.24, last row 2026-08-10. Top campaign by month: Apr `Conversions | Rolo | 4/13` (not a sale); May `Conversions | 30% Off | 5/13` $8,222.44 of $24,861.44 (33.1%); Jun same $7,846.34 of $23,870.58 (32.9%); Jul `Conversions | July 4th - 50%` $23,843.26 of $40,389.21 (**59.0%**); Aug partial. No purchase count, CPA or ROAS cited (343 is not purchases).
- **Blush Camera** (`act_2050081878799128`, consumer camera, operator Lindsey B., CHURNED 2026-06-16): $58,298.09, 623 conv, 2026-02-02 to 2026-06-15. Retargeting = `Retargeting | 5/5/26` ($5,838.21 / 79) + `Retargeting | 2/22/26` ($457.20 / 10) = $6,295.41 / 89 conv = 14.3% of conversions ("roughly one purchase in seven"). "A bit better" CPA: lane aggregate $70.73 vs $92.85; time-matched 5/26-6/15 $87.61 vs $102.14 (memory 9/8; `CBO | Prospecting 5/26` $102.14 re-confirmed live). No number quoted for the CPA gap. ROAS not cited.
- **Master Spa Parts** (`act_2752863238119036`, replacement parts ecom, operator Lindsey B., CHURNED 2026-05-28): $123,049 spend / 4,260 conv / 5.52x on this join (canonical elsewhere $131,597 / 5.53x). "A little over $120,000 at about 5.5x" holds on both.
- **Tiami Sleep** (`act_1401195627889544`, luxury mattress, operator Lindsey B., ACTIVE): $13,261 Meta spend last 60 days, last row 2026-09-13. Present tense, category only.

### Deliberately excluded

- Master Spa Q4 CTR/CPM series (Samuel twin's argument; v1 of this draft).
- Blush Camera add-to-cart vs purchase optimization pair (adjacent to Samuel's Events Manager / purchase-data line).
- Blush Camera CPA values and PDF; Neue Maison purchases/ROAS.
- Any TikTok or Google mention (Lindsey scope ban). Pricing, 90-day minimum (not asked).

### Open for Queenie before sending

- **Two profiles drafted for this post. Send one.** Meta-first DTC normally routes to Lindsey.
- **Samuel twin cites superseded Master Spa ROAS** (7.69x Oct / 4.30x Dec, computed over measured spend only). Canonical all-spend method returns 6.45x / 3.22x. The shape of the argument holds; the figures should be corrected if Samuel is the one sent. Not edited from this session.
- Geo and payment verification unknown. Spend unstated; $5K screen provisional.
- Commitment in body: offers tested in full-price and promo groups.
- DB log to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).

### QC + expert review on v2, applied 2026-09-15

`qc-reviewer-agent`: PASS WITH FIXES. Facts, tense, scope and twin overlap all clean.
1. ACCEPTED: "For a store trying to grow profitably" echoed the post's "grow the business profitably". Now "For a store".
2. ACCEPTED: "I ask because of a luxury furniture brand I ran" now "I ask because I ran a luxury furniture brand".
3. FLAGGED (above): full-price/promo testing stated as working practice.

`expert-review-agent`: Good.
1. ACCEPTED: camera brand tense marker ("I ran").
2. PARTIAL: "looked a bit better" is now "was a little lower". Rejected "about 14% lower over the same weeks": the time-matched pair ($87.61 vs $102.14) is a three-week, two-campaign window not re-verified live this session.
3. REJECTED: move the video line above the spend question. lindsey_default's structure closes on the profile video CTA.
4. NOTED, not fixable: furniture brand has no outcome metric; three of four cited accounts are churned.
