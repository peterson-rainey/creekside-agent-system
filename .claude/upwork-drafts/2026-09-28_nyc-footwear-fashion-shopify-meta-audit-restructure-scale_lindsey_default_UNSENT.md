# US footwear + fashion brand (Shopify + Midtown Manhattan store), Meta audit, restructure and scale | Lindsey | lindsey_default | UNSENT

- **Date drafted:** 2026-09-28 Central (Postgres `now()` 10:23 Central at session start)
- **Profile / style:** Lindsey / `lindsey_default`
- **Status:** UNSENT. Draft only, nothing sent.
- **Length:** 510 prose words + 22 header words = 532; 3,027 chars. Band is 200-300 (350 multi-question), but the post has **7 required questions**, so this runs over on purpose. Upwork's 5,000-char cap is clear.
- **Review:** QC PASS WITH FIXES (1 required: the camera line read as if Lindsey set the budget, now "went from ... while I ran its ads"; optional spend-range tweak taken). Expert review SHIP WITH CHANGES (footwear line chained to the boutique out-of-stock rule; parts store marked "through May"; cadence line added per the 9/23 + 9/25 rulings; paid for by cutting "View access is enough for the audit" and "and judge what each step adds" and trimming answer 6). Recheck not run; every change came from the two reviews and uses already-verified facts.
- **Twin on this job:** none. `upwork_jobs` (job_name, description, cover letter: footwear / Midtown / "Campaign Structure, Optimization"), drafts grep (`midtown|footwear`) and `git log -3` all came back empty, checked at start and again before QC.
- **Fashion bid record:** Saynt & Syren women's fashion Meta post, Lindsey 8/10 and General 8/7, both not viewed.

## Style-name note
"Lindsey's strategic + diagnostic style ... write it in lindsey_default": the mismatch and its fix came in one sentence, so it was noted here and not re-asked. `lindsey_default` IS the diagnostic style; "strategic" is Samuel-only.

## Screens
| Screen | Result |
|---|---|
| Step 0 already-drafted | Empty |
| Platform test | CLEAN PASS. Meta only (FB/IG, Pixel + CAPI, catalog, Advantage+ sales), Shopify |
| Geo | US (Shopify US + Midtown Manhattan store) |
| Ad spend / $5K floor | UNSTATED ("appropriate for our current budget"), so unmeasurable. Asked as a relative range in the close ($5,000 vs $25,000; no incumbent agency, no low-budget wording) |
| Lindsey's $3,000/mo floor, fee | No rate asked, so no fee typed. See Open item 1 |
| White-label / full-time / self-funded / evasion / organic | None. Own brand, paid audit then management |
| Hidden AI-canary lines | None found |
| "Personally" requirement | "someone who will personally review and manage" + "do not send a generic agency proposal": strict first person, no "our team", no pooling. Every cited account has `platform_operator` = Lindsey |
| Proof screen | Gate "hands-on Meta for e-commerce brands" PASSES. "Preferably fashion, footwear, apparel, accessories": PARTIAL (women's boutique, craft only, no numbers; footwear, handbags, jewelry = zero). "Physical retail/store-location advertising is a plus": ZERO store-traffic campaigns, conceded in answer 6 |
| Weekly reporting (listed duty) | Per the 9/23 + 9/25 rulings, no weekly promised. Draft offers the approved wording: live report any day + a written read every two weeks |
| Payment verified / client history | Unknown (no `upwork_jobs` row). Check the live job page |

## Proof, verified live 2026-09-28 (`contractor_query`)
- **Q1 spend:** Lindsey's active Meta accounts, 2026-08-28 to 2026-09-26: Lux Dental Spa (Doctor Laleh) $91,868.39, Nightlark $16,595.36, Vida Dentistry $7,019.91, Tiami $4,466.96, Punch Drunk Chef $4,192.47, Quivr $2,047.83, Chris Ideson $1,724.95, Mark My Words $913.22 = **$128,829.09 across 8 accounts**. Lux Dental Spa Aug $96,862.44. E-commerce (Nightlark, Tiami, Punch Drunk, CI) $1.7K-$16.6K. The Tooth Co is paused ($467.80, Aug 28-31 only).
- **Replacement-parts store** (Master Spa Parts, `act_2752863238119036`, operator Lindsey B., taken over 2026-02-03, churned 2026-05-28, client moved in-house): owner email 1/27/26 "232 active ads" (gmail_summaries `197abe68`). Jan (inherited) $15,587.79 / 449 conv / CPM $8.10 / 4.57x / 11 campaigns with spend; Feb $12,320.68 / 14 (transition); Mar $14,900.10 / 7; **Apr (to 4/29) $13,223.56 / 665 / CPM $8.18 / 8.07x / 7**; May (5/3-5/26) $11,614.54 / 507 / 6.53x / 7. ROAS on the all-spend denominator; null roas = no purchases on this account. No record says WHY it improved (the audit also changed targeting and creative), so no mechanism is claimed. Magento, not Shopify, so "store" only.
- **Consumer camera brand** (Blush Camera, `act_2050081878799128`, operator Lindsey B., churned 2026-06-16, moved in-house): no Meta spend before 2026-02-02. Feb $4,801.98 / 40 / $120.05; Mar $10,757.85 / 157 / $68.52 / CPM $12.24; Apr $11,944.21 / 163 / $73.28 / CPM $17.06; **May $19,972.01 / 172 / $116.12 / CPM $31.60**; Jun 1-15 $10,822.04 / 91. Total $58,298.09 / 623 / **$93.58**. Apr to May: +$8,027.80 spend, +9 conversions, CPM +85%. Conversion count has drifted 166-172 for May between pulls, so the copy says "fewer than 10 extra sales". ROAS NOT cited (partial coverage).
- **Women's boutique** (Pink Moon Bay, churned 9/15): raw Loom `d3b4317b` (Lindsey to David, 2026-06-17): four locations; "Come Visit Our Store" ad "not running", waiting on content; catalog ads on new arrivals, never out-of-stock; retargeting catalog hides items under $25. No numbers exist.
- **Meal-prep brand** (Punch Drunk Chef, active, operator Lindsey): per-city sales campaigns (Dallas, Frisco, Plano, Denton, McKinney).

## Meta rules, read on Meta's own help pages 2026-09-28 (in-app browser)
- **1212227546879178 / 424052537147870:** existing customers = "an audience you define in your ad account settings"; sources include website, catalog, customer list, offline activity. New audience = "people who have not interacted".
- **1142614290190459:** "Existing customer budget cap ... is no longer available. You can still do the same thing manually" (custom audience exclusion, or a capped ad set that includes existing customers).
- **1423851372208214:** creative test runs 2 to 7 test ads inside an existing campaign; winners keep running "with delivery system learnings retained. There's no need to merge them into another campaign." Highest volume only; no confidence level.
- **316478108955072:** "Adding a new ad to your ad set" is a significant edit (ad set reenters learning). Budget changes may or may not be, by size ($100 to $1,000 may).

## Spec deviations (intentional)
- **Over length** (517 total): 7 required questions. Nothing required was dropped.
- **No "results attached" line.** Nothing attachable fits: no PDF for Master Spa Parts or the boutique; `Blush_Camera.pdf` is DO-NOT-ATTACH (revenue headline fails the real spend denominator); every other file in `.claude/attachments/` is another operator's or off-vertical.
- **Identity anchors** ("built and sold my own e-commerce business", "10+ years") cut for length. Optional add in Open item 4.
- **Numbered bold headers** (1-7) so the buyer can check every question was answered. No header above the opener.

## Open for Queenie
1. **Bid / fee.** Job type and rate aren't in the paste. The post's shape (paid audit + restructure, then management) maps to the ONE-fee ruling: **onboarding $1,500 per platform (Meta only = $1,500), audit and restructure included**, then canonical % of spend ($1,500/mo minimum, 20% to $30K, 90-day minimum). If fixed-price, bid $1,500. Nothing is typed in the body. Her doc's $3,000/mo floor vs canonical is still formally open; canonical was the 9/21 pick.
2. **Weekly reporting** is a listed duty. Per your 9/23 + 9/25 rulings the draft offers the live report + every-two-weeks read instead. If you'd rather stay silent on cadence, delete that one sentence (-18 words).
3. **Lindsey to confirm** (all record-backed, but first person): she cut the parts store from 11 campaigns to 7 in Feb-Mar 2026, and the boutique's store-visit ad never launched while she ran it.
4. **Optional add** to answer 1: "Before this I built and sold my own e-commerce business." (+10 words, from her style doc; not in the DB)

PROPOSAL (paste below this line)

When a regular at your Midtown store buys online for the first time after seeing an ad, does Meta know they were already a customer? Only if their email or phone from the register gets uploaded to Meta, because it only knows the existing customers you define. Otherwise they can pad your prospecting results, and you can't exclude them.

**1. Spend I manage**
About $129,000 over the last 30 days across eight live Meta accounts, most of it one cosmetic dental account at roughly $90,000 to $100,000 a month. My e-commerce accounts today run $2,000 to $17,000 a month.

**2. E-commerce accounts**
A replacement-parts store I ran through May, at about $12,000 to $15,000 a month. I took it over at 232 live ads in 11 campaigns and cut it to 7 campaigns. Blended ROAS went from 4.6x to 8.1x by April at the same $8 CPM, then 6.5x in May. The audit also changed targeting and creative, so I don't credit structure alone.

A consumer camera brand that went from no Meta spend in February to about $20,000 a month by May while I ran its ads: 600+ sales at about $94 each over four and a half months.

**3. Structure**
Usually three campaigns: a purchase-optimized one for new customers, a catalog one for people who viewed or carted, and a Midtown one with its own creative once store sales can be measured. Meta dropped the existing-customer budget cap from Advantage+ sales campaigns, so keeping spend on new customers takes an exclusion or a capped ad set. At a women's boutique I ran Meta for, catalog ads ran on new arrivals only, never out-of-stock items, and retargeting skipped anything under $25. In footwear I'd treat broken size runs the same way as out-of-stock items.

**4. Adding budget**
When the added spend still buys sales above your break-even ROAS, not when the average looks good. The camera brand held around $70 a sale at $10,000 to $12,000 a month. In May it spent about $8,000 more for fewer than 10 extra sales, with CPM nearly doubling. So I raise budgets in steps, since a big jump can restart learning.

**5. Creative testing**
Inside the live campaign, using Meta's creative test: 2 to 7 test ads, winners keep running on what the campaign already learned, and nothing needs merging later. Other new ads go in batches, since adding an ad restarts learning. Winners go back to your content team as briefs: hook, format, product.

**6. Online and local**
Online, yes, most of my book. Local, yes, for dental practices and a meal-prep brand with a campaign per city. Store foot-traffic campaigns, no. The boutique's store-visit ad never launched while I ran it.

**7. Audit access**
Partner access in Business Manager to the ad account, Pixel/dataset and catalog, plus a Shopify staff login that sees orders and the Facebook & Instagram app.

You'd get a live report you can check any day and a written read from me every two weeks. There's a short video on my profile on how I work. Any structure only works if the budget can feed it, so where does your monthly Meta spend sit, nearer $5,000 or $25,000?
