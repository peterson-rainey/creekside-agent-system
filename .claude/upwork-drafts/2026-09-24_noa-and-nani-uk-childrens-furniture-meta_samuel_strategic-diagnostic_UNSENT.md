# Upwork Proposal - Noa & Nani (Nöa & Nani), UK children's furniture, Meta Ads
Profile: Samuel Rainey | Style: strategic + diagnostic | Status: UNSENT
Date drafted: 2026-09-24 (US Central, confirmed via Postgres now())
Chars: 4,729 | Attaching: nothing

## Screens
- Geo UK: PASS (US/CA/UK/AU allowed)
- Ads in scope: PASS (Meta required)
- Spend: unstated, not foreclosed -> PASS, asked as bracket
- White-label / employment seat / CRO gate: none fire
- Trial period requested: budget unstated so it does not foreclose; addressed in body, 90-day minimum held
- Duplicate bid: none. Nearest prior bids are different jobs (High-End Furniture 2026-09-18, UK Furniture & Bed 2026-09-03). No Lindsey twin.

## Verified facts used
- Storefront live read 2026-09-24: 554 products, 322 fully OOS; 566 variants, 239 in stock (327 OOS)
- Core beds: 250 products / 253 variants, 55.3% OOS, median GBP 201
- OpenBox: 81 products, 100% OOS
- product_type empty on 472/554 (85.2%), 100% of core beds
- Shopify noanani.myshopify.com, Velstar theme; Meta pixel 1516019901777966; GTM-MGCJTKH; AW-844119247; GA4 G-B49TKFCW23; Klaviyo
- Master Spa Parts (genericised as US home/spa parts ecom), tracked rows only, conversions+roas NOT NULL
- Neue Maison (genericised as luxury furniture), weighted monthly ROAS 3.88 to 20.11, AOV 602.98 to 1810.51

## Gaps named in body
- Zero children's/nursery clients (verified: clients + industry_experience both empty)
- Zero UK clients (verified: clients.target_locations / website .co.uk both empty)
- No ad-level Meta table, so no controlled creative test can be offered

## TWIN ALERT (added after commit)

A concurrent session drafted this SAME job under Lindsey:
`2026-09-24_noa-nani-uk-childrens-furniture-bedroom-meta_lindsey_default_UNSENT.md`
Both are legitimate per the two-profiles-one-job rule. Checked for collision:

- THESIS: distinct. Lindsey argues one blended CPA target hides a 5x price-tier spread. This draft argues the
  product feed sets the ceiling and a trial period mismeasures a considered purchase. No overlap.
- HEADERS: no collision. Lindsey uses "One target, two different businesses" / "What the discount months
  actually cost" / "What I can and cannot show you". This draft uses none of those.
- SHARED ACCOUNT: both cite Neue Maison genericised. Lindsey uses campaign-level CPA/AOV spread
  ($104-$527, AOV $460-$2,367). This draft uses month-level weighted ROAS (3.88-20.11) and month-level AOV
  ($603-$1,810). Different aggregations of the same account, so both hold; campaign-level extremes are
  legitimately wider than month-level ones.
- METHOD: both filtered spend>0 AND conversions IS NOT NULL AND roas IS NOT NULL. Consistent.
- COVERAGE: Neue Maison ROAS figures describe the roas-recorded subset only, not the whole account. Neither
  draft claims an account total. Master Spa Jan/Apr comparison is spend-matched rather than calendar-matched
  (Jan 31/31 days, Apr 26/30), which is why purchases are compared at matched spend and the rest are ratios.

## Body

I read your product feed before writing this, because on a catalogue this size the feed usually sets the ceiling before targeting gets a say.

There are 554 products published right now. 322 of them cannot be bought. At variant level that is 327 of 566 unavailable, and inside the core bed range it is 55 percent, median price £201. All 81 OpenBox items are sold out. Separately, 472 of the 554 carry no product_type value, including every bed, and that is the field Meta uses to build product sets.

If your Meta catalogue is generated from Shopify without a filter, that is what Advantage+ and any catalogue retargeting are bidding against. Sold out items get suppressed unevenly rather than cleanly, and untyped products cannot be split into sets, so spend cannot be steered toward the ranges carrying margin. If you already filter the feed then this point dies, and I would rather find that out on a call than assume it.

**On the trial period**

A trial measures the wrong thing on a considered purchase, and I would rather say that now than after you have paid for one.

A cabin bed is a weeks long decision. Meta reports on a seven day click window by default, so purchases your ads genuinely caused land outside the window the trial gets judged in. The reading comes back low, and the pressure goes onto whatever converts same day, which is mattresses and accessories rather than beds.

Two things from our own book rather than theory. On a luxury furniture account we ran for twelve months, monthly ROAS swung between 3.88 and 20.11 with the same team on it throughout, average order value moving between $600 and $1,800 month to month. Pick any single month as the verdict and you get a different answer about whether Meta works. On a second account, the worst month of a nine month run was December, at 4.30 ROAS and $33.59 cost per purchase. Four months later it was the best month of the nine. A December trial would have ended that engagement.

That is why we work to a 90 day minimum. The low commitment entry is the onboarding fee, a single one time cost that includes a full account and feed audit in writing. If the audit says we are not the right fit, you keep it and we stop there.

**What actually moved the number**

That second account is US home and spa parts ecommerce, so treat it as category adjacent rather than exact. Two months, matched spend:

January, $12,666 spend, 28,919 clicks, 449 purchases, $28.21 cost per purchase, 5.62 ROAS.
April, $12,455 spend, 22,342 clicks, 665 purchases, $18.73 cost per purchase, 8.57 ROAS.

CPM was flat across both, $8.16 against $8.40. Same attention for the same money, 23 percent fewer clicks, yet purchases rose 48 percent and return by half. Click to purchase went 1.55, 1.91, 2.60, 2.98 percent across those four months without a break.

Being straight about what that shows and what it does not. I have account and campaign level numbers on it, not ad level, so I cannot hand you a controlled creative test as proof. What it does show is that the gain sat in conversion rate after the click, not in cheaper or more plentiful traffic, because the traffic got smaller and no cheaper. That is why I opened on your feed rather than on targeting.

**What I would do first**

Reconcile Meta reported purchases against Shopify for the same period and confirm which event is primary. Then rebuild the catalogue around availability and a real product type, split into sets by range and price band, so budget follows stock and margin. Then consolidate to two campaigns, broad prospecting on purchase and a catalogue campaign for retargeting, because splitting a starting budget across five ad sets usually leaves all five stuck in learning.

Creative testing comes after that, at ad level inside the consolidated campaign, three or four genuinely different arguments at a time rather than recrops of one hero image.

**Where we are thin**

We have not run a children's or nursery brand, and we have not run UK media. The furniture and home ecommerce experience is real and so is the Meta work, but the seasonal and competitive read on your market would take me a cycle to earn rather than arrive with. Weigh that against anyone telling you otherwise.

**Rate and availability**

We bill a percentage of ad spend rather than hourly, which keeps the incentive on return instead of hours logged, plus the one time onboarding fee above. Day to day sits with a dedicated ecommerce media buyer and a tracking specialist, reporting every two weeks against agreed ROAS and cost per purchase targets, with a live dashboard in between.

I have not quoted a percentage because it moves on volume. Roughly where does monthly Meta spend sit today, above or below about £4,000?
