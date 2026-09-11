# Upwork Proposal - UNSENT
Job: Tangy Oak, manufacturing-led D2C home decor brand on Shopify (India, AOV ~INR 2,400, large catalog). Google Ads specialist to manage and scale: Merchant Center/feed, GA4/GTM purchase tracking, Shopping/PMax, Search, negatives, product-level optimization, remarketing. Limited historical data, wants a 30-day test plan. Asks for case studies with approximate spend and ROAS. Long-term freelancer, "initial evaluation period."
Profile: Samuel Rainey | Style: samuel_strategic-diagnostic | Date: 2026-09-11 (Postgres now())

SCREEN (read before sending):
- GEO: INR AOV means ads run in India. Memory rule says auto-DQ outside US/CA/UK/AU, judged by where ads run. upwork_jobs holds 13 prior India-country bids (all General profile, 2025-09 to 2026-06): 0 messaged, 0 won, 4 viewed. google_ad_accounts has ZERO INR accounts (58 USD, 1 AUD, 1 CAD). Drafted anyway because Queenie asked for it explicitly; the gap is disclosed inside the draft (Geld Wealth 9/3 pattern). Queenie/Peterson decide whether to send.
- SPEND: not stated. Scale path volunteered ("manage and scale"), so the $5K screen is unmeasurable, not foreclosed. Draft ends on the bracket ask ($2,000 vs $10,000).
- TRIAL: "initial evaluation period" with no capped budget = open. Draft reframes it as the 90-day minimum term.
- PRICING MISMATCH: $1,500/mo minimum is roughly INR 125,000/mo against a INR 2,400 AOV brand. Likely a fee objection; left in because the 9/2 ruling puts the fee in every Samuel draft.
- "Personally managed" requirement: answered honestly (Samuel has; specialist runs day-to-day, Samuel sets strategy). No certifications claimed. No links, no attachment promised, no sign-off name.
- REPEAT CHECK: no Tangy Oak row in upwork_jobs, no existing draft. No two-profile collision.

VERIFIED (google_insights_daily via contractor_query, 2025-11-02 to 2026-08-31, Aura Displays, Google-only, ACTIVE, operator Ahmed I., $7,500/mo budget):
- Non-brand Search: $27,743 spend, 260.7 conv, $144,292 value, 5.20x
- Non-brand Shopping: $22,947 spend, 251.7 conv, $131,563 value, 5.73x
- PMax: $6,632 spend, 67.8 conv, $35,082 value, 5.29x (ended 2026-07-21)
- All non-brand: ~$57,430 spend, 580 conv, ~$310,937 value, 5.41x
- Brand Search: $25,497 spend, $732,637 value, 28.7x (NOT cited as a result; cited as the blended-report trap)
- Case-study PDF (1xKnrCC...) IS a real PDF (813 KB, %PDF-1.4, readable). It claims 8-10x non-brand ROAS and $34.56 CPA. Live non-brand is 5.4x and ~$99/conv. DO NOT ATTACH. Body cites live numbers only.
- Myriad Traders Google (active): Shopping 2.16x, non-brand Search 1.99x last 90d. Not cited.
- Tiami Sleep Google: non-brand conversions ZERO. Not cited.
- Neue Maison (furniture) is Meta-only and churned 8/11. Not cited on a Google job.
- Fee: greater of $1,500/mo or 20% of Google spend, $1,500 onboarding includes audit, 90-day minimum (pricing-reference.md, 9/2 ruling).
- DB log step (upwork_proposal_logs INSERT) SKIPPED: contractor_query cannot INSERT.

---

A large home décor catalog on Shopify with limited historical data has a problem that comes before keywords or bidding. At a ₹2,400 AOV Google needs a lot of purchases before target ROAS bidding does anything but throttle spend. So the first 30 days aren't about finding winners across the whole catalog. They're about picking a small product set that already converts on the site, giving Google concentrated purchase data on it, and widening only once there's a real conversion history.

Your Shopify data picks that first set, not ad data. Which collections convert best on organic traffic, which have the margin to survive a paid customer, what's in stock at depth. Those get a custom label in the feed and a Standard Shopping campaign first, not Performance Max. Standard Shopping shows the search terms, so we can see whether "wooden wall shelf" or "brass planter" actually converts and build the negatives and Search campaigns from that. PMax hides all of it, and on a new account it leans on brand searches and remarketing, which flatters ROAS and hides whether anyone new came in. It earns its place in month two.

The feed usually needs the most work on a décor catalog. Titles written the way people search, material and room and style up front, GTIN gaps closed, and purchase tracking sending order value and transaction ID through GTM so an order isn't counted twice.

One honest gap: our accounts are US based and I haven't run Shopping into India, where Merchant Center, shipping and payment rules sit differently.

A Shopify brand we run on Google has brand search near 28x, which would flatter any blended report. Non-brand Search, Shopping and PMax across about $57,000 in spend since last November returned about 5.4x. Shopping did best at 5.7x and PMax 5.3x, which is why Shopping goes first on a thin-data account.

I've personally run ecommerce Google accounts on Shopify. A specialist on our team makes the day-to-day changes while I set strategy and review the search terms weekly. We don't bill hourly. Management is the greater of $1,500 a month or 20% of Google spend, plus a one-time $1,500 onboarding covering the audit, tracking, feed and build. Minimum term is 90 days, which is the evaluation period I'd propose, since 30 days on a fresh account tells you about tracking, not the catalog.

Roughly where is monthly Google spend today, closer to $2,000 or $10,000, and is that a ceiling or a starting point?
