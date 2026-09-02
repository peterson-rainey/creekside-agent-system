# Upwork Proposal - Milana L., new women's fashion brand, Instagram growth + Meta ads
Profile: Samuel Rainey | Style: strategic | Status: UNSENT | Drafted 2026-09-02 (Postgres now(), US Central)
Length: 336 words / ~2,050 chars. Inside the 250-350 word strategic band and the 5,000 char hard limit.

## RESOLUTION

- Style was named by Queenie as "strategic + diagnostic", then corrected mid-session to **strategic**.
  Strategic is Samuel-only, so this is a Samuel artifact. Rebuilt to the 250-350 word strategic spec.
- Step 0 duplicate check run against BOTH `.claude/drafts/` and `.claude/agents/upwork-proposal-agent/drafts/`.
  ZERO hits on milana / fashion / womens fashion. No `upwork_leads` row. First touch, no duplicate-profile risk.
- UNSIGNED. `docs/samuel-strategic.md` still says sign "Samuel", but every recent strategic draft
  (aji-teneriffe 2026-09-01, fire-apparatus 2026-09-02, multilocation 2026-09-03) ends on the closing
  question with no signature. Drafts over stale doc.
- DTC ecom normally routes to Lindsey for delivery, but the requested style is Samuel-only. Resolved the
  same way the clean-beauty precedent did: "our team" framing throughout, no individual named.

## SCREENS RUN

| Screen | Result |
|---|---|
| Ads in scope | PASS. Meta ad strategy, targeting, retargeting, campaign setup, optimization. Core work. |
| White-label / subcontractor | PASS. Direct brand owner. |
| Full-time seat | PASS. No "full time" language, no hours-per-week count. |
| Self-funded / profit-share | PASS. Standard client-funded engagement. |
| Coaching Upwork competitors | PASS. |
| Detection evasion | PASS. |
| Flat-fee portfolio owner | PASS. |
| Hourly ban | NOT ENGAGED. No rate field collision in an invitation. |
| **Ad spend** | **NOT STATED.** $5K/mo floor UNMEASURABLE. New brand launch makes sub-$5K a live risk. Asked in-body as a relative range per the standing rule. |
| **Geo** | **NOT STATED.** Post never says where she sells. US/CA/UK/AU screen OPEN, not passed. Asked in-body. |
| **Organic IG growth** | **PARTIAL SCOPE GAP.** Ads are primary so `dq_no_ads_in_scope` does NOT fire. But organic is a real zero (see below) and is declined explicitly in-body. |
| Required items | PASS. She asks for "brands/accounts you've worked with and any results you're able to share." Fashion/beauty/ecom is "strongly preferred", not required, and ecommerce we genuinely have. Answerable, no foreclosure. |

## VERIFIED LIVE THIS SESSION (contractor_query, 2026-09-02, US Central 17:49)

**Local clock was wrong again.** Shell said 2026-09-03; Postgres `now()` says **2026-09-02**. Memory rule held.

**THE APPAREL PROOF IS A MIRAGE. This is the important finding.**
`meta_ad_accounts` contains seductive names: **Pink Moon Bay Boutique** (act_1466518810943738),
**The SoHo Boutique** (act_346997089662994), **Field Day Ad Account** (act_3989648536473),
**Elaa Skincare** (act_2395802691227119), **Aura Beauty TM** (act_1068355580643081).
All five return **0 campaigns and 0 insight rows**. Access shells only, the same "access not spend" pattern
as the 33 Google accounts. NONE are citable. Anyone drafting fashion proof off account names will invent
a case study that does not exist.

`clients` corroborates: **Field Day Apparel** is churned, industry NULL, services `[]`, `meta_account_ids` NULL,
start 2026-04-30. An empty record.

**ZERO fashion/apparel rows in `case_studies`.** All 28 screened. Closest E-Commerce rows are Aura Displays
(Google Shopping, no Meta account) and Fitness Superstore (churned, 40x unbacked per standing rule).

**ZERO organic-social service line.** `unnest(services)` across all 130 clients returns only paid ads, email,
SEO, GBP, analytics, programmatic. No social media management, no content creation, no Instagram growth.
Zero `agent_knowledge` rows on organic/Instagram either. The organic half of her ask is a true system-wide gap.

**Master Spa Parts** (act_2752863238119036, CHURNED, past tense):
2025-09-02 to 2026-05-26, $129,025.94 spend, $718,533.99 revenue, **5.57x over TOTAL spend**,
4,464 conversions, $28.90 CPA, avg CPM $9.74, avg CTR 1.973%.
Reconciles memory's 5.53x. The 6.59x figure is spend-weighted over only the 85% of spend with non-null roas.
**Cited as "about 5.5x", the conservative total-spend read.**

**Neue Maison** (act_782415276397596, CHURNED **2026-08-04**, reason "taking in-house"):
2025-09-02 to 2026-08-10, $216,499.26 spend, $536,364.69 revenue, **2.48x blended over total spend**,
959 conversions, $225.76 CPA.
Campaign level, which is the proposal's whole argument:
- `Retargeting | 4/13` **5.42x** ($16,999.77, 85 conv)
- `Conversions | July 4th - 50%` **4.17x** ($23,843.26, 42 conv)
- `{w} Andromeda | TOF + MOF` **0.90x** ($7,686.98, 38 conv)
Confirms the standing rule exactly: the 4.17x is promo, not cold. Cold prospecting ran under 1x.

**INDEX CORRECTIONS MADE THIS SESSION:**
1. Neue Maison churn date is **2026-08-04**, not 8/11/26.
2. Neue Maison is **luxury furniture**, NOT fashion or fashion-adjacent. Must never be sold as apparel proof.
3. The 7.36x spend-weighted Neue Maison ROAS is a **trap**: it covers only $72,871 of $216,499 (34%).
   True blended is 2.48x.

## DELIBERATELY OUT

- **Tiami Sleep**: 16 conversions on $48,513.95, roas NULL on every row. Standing rule held, not cited.
- **Neue Maison 7.36x**: window-skewed, see above. The honest 2.48x is used instead.
- **Dr. Laleh** ($99K/mo female-audience Meta): med spa lead gen, wrong funnel shape for DTC fashion. Omitted
  rather than stretched.
- **Pink Moon Bay / SoHo Boutique / Field Day / Elaa / Aura Beauty**: zero data. See above.
- **Fitness Superstore 40x**: unbacked and churned.
- **Any Instagram follower-growth or Reels-organic claim**: system-wide zero.

## ATTACHMENT DECISION

**ATTACH NOTHING.** No fashion, apparel, boutique or organic-social case study exists in any form. The only
ecommerce PDFs are Aura Displays (Google Shopping, headline contradicted by live ex-brand data per the
2026-09-03 ruling) and Fitness Superstore (unbacked). Nothing in the body references an attachment.

## COMPLIANCE

No links or URLs. No contact info. No calendar link (first touch). No pricing in body. No em dashes (verified 0).
No certifications. No years-of-experience claim. No client names. Does not open with "I". Opens on her own
words (launching, retargeting) used to invert an assumption rather than restate her ask. Portfolio lands last.
Closes on the two open screens. Past tense on both churned accounts. No lists. Unsigned.

## OPEN FOR QUEENIE

1. **Spend is unstated and this is a brand launch.** Sub-$5K/mo is a live possibility and would be a settled
   SKIP. The draft asks rather than assumes, but if it comes back under $5K the answer is no.
2. **Organic is declined in the body.** It is roughly a third of what she asked for. Honest and rule-compliant,
   but it is the single biggest reason this could lose. Flagging it as a deliberate choice, not an oversight.

---

Launching a fashion brand puts the retargeting question in an awkward spot, because at launch there is nothing to retarget. No pixel history, no customer list, no site traffic worth chasing. That matters more than it sounds, since retargeting is usually where the flattering numbers come from, and for the first stretch almost all of the budget has to ride on cold traffic instead.

Our team saw that split clearly on a luxury home brand we ran on Meta. Retargeting returned 5.42x and a discount push 4.17x, while the cold prospecting campaign sat at 0.90x. Blended across the account it was 2.48x on $216K. Different category, same structure: the strong campaigns were the ones feeding off an audience that already existed. A launch spends its first months building that audience, and the early blended number will understate what the account is actually doing. Worth agreeing on before anyone panics at week three.

The other consequence is that targeting does very little work early. With no conversion history, Meta finds the buyer by watching who responds to each creative, so in practice the creative is the targeting. That argues for more angles rather than more audiences, and for treating Feed, Reels and Stories as one auction instead of three budgets. Splitting spend by placement this early just starves the system of the volume it needs to get out of learning.

Straight with you on scope. Organic page growth is not something our team runs. Paid does feed the profile, since people follow off Reels and Stories ads, but that is a byproduct rather than a content plan. If a posting calendar and community management are central to the role, that is not our side of the house.

On ecommerce itself we work on Meta directly. The closest comparison on our book was a replacement parts retailer, about 5.5x over nine months on roughly $129K in spend. Fashion specifically is adjacent for us rather than a wall of case studies, which is better said now than later.

What monthly range are you considering for spend, and where are you selling?
