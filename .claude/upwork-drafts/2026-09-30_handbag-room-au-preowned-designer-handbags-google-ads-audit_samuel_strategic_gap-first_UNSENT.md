# The Handbag Room (AU pre-owned designer handbags), Google Ads ecommerce audit + management (Samuel, strategic, gap-first) UNSENT
Profile: Samuel Rainey (General) | Style: samuel_strategic, gap-first | Date: 2026-09-30 US Central (Postgres now())

## SCREEN
- Dual-bid check: `upwork_jobs` searched on handbag / LUXURY ECOMMERCE / Lovable; no prior bid on this post or buyer. Draft folders grepped before save: no twin.
- REQUIRED-ITEMS SCREEN FIRED: Q1 two ecom Google accounts "personally improved" (both candidates are builds, not takeovers; not Samuel personally), Q2 luxury/fashion/resale = zero, Q3 single-quantity = zero, Q8 checkout fix with result = zero, Q11 + "no junior hand-off" = team model. Recommended skip; Queenie chose **Draft gap-first**.
- Pricing ruling (Queenie, this session): Q9 = $1,500 onboarding fee with the audit inside it. Q10 = 20% of spend, $1,500 minimum, marginal step-down above $30K.
- Spend unstated, so $5K floor unmeasurable; closing asks the ecommerce vs valuation split.
- Geo AU: passes. Worker-location, white-label, full-time: none.

## VERIFIED 2026-09-30 (live contractor_query)
- Myriad Traders Google (5137213886), first spend 2026-07-07. US non-brand: Jul $5,357 / $10,706 / 2.00x; Aug $8,147 / $22,187 / 2.72x / 261 conv; Sep 1-29 $9,211 / $21,611 / 2.35x / 250.4 conv. UK excluded, client-directed pause never mentioned.
- Aura Displays (7860902494), paused, last spend 8/31. Non-brand Shopping $18,048 / $98,731 / 5.47x / 186.1 conv; non-brand Search $27,183 / $144,293 / 5.31x. Dec 7.94x (first full month) to Aug 3.41x.
- Tiami (1537044023): Shopping Aug $1,460 / 0.69% CTR / 0 conv, PAUSED. MC price mismatch + sale_price overrides and $214M Begin Checkout demotion from agent_knowledge (Ahmed Tiami context).
- Google help: campaign-specific conversion goals; secondary actions excluded from bidding (10995103). GA4 cross-domain `_gl` linker, self-referrals across subdomains (10071811).
- Operator on all three Google accounts: Ahmed Imran.

## QC + EXPERT REVIEW
- qc-reviewer-agent: PASS WITH FIXES. Applied: Q8 no longer claims we paused Shopping for price reasons or implies fix-then-fail; "all five variants"; Q6 contradiction fixed; Setup/Results split in Q1; "Google accounts our team built"; Q3 reworded; closing margin question. Not taken: dropping "luxury" for Tiami (memory records it as a luxury mattress brand, list $1,995-$3,495).
- expert-review-agent: Good. Applied: out of stock "within hours"; Q6 own lead goal + sell/consign/worth negatives; Q4 cheapest bag, test purchase no longer presented as Ads-attribution proof; Q5 auto-tagging + normal gap; Q7 margin tier + unavailable-page causes; Q9 deliverable; Q12 Lovable dev contact. Skipped for space: condition=used / no GTIN, enhanced conversions, GST.
- Recheck not run. 799 words / 4,795 chars (over the 400-word band; 12 required answers, char limit binds).
- DB log: skipped, contractor_query cannot INSERT.

## PROPOSAL

LUXURY ECOMMERCE

With mostly one-off handbags, Google never gets to learn a product. By the time a Chanel flap has enough clicks to judge, it has sold, so the account has to learn at the house and price-band level, and a sold bag has to go out of stock within hours or you keep paying for clicks to an unavailable page. The attribution gap usually sits at the hop to the Wix subdomain: if the ad click isn't stored on the Lovable site first, GA4 can still record the sale while Google Ads can't tie it to an ad.

**1. Two accounts**
Neither is luxury, and both are Google accounts our team built from launch rather than inherited, so "improved" means against our own first months.
A US survival-gear store on Shopify, launched in July. Setup: full-catalog Shopping, Search split by product category, brand in its own campaign, feed on one Shopify source. Results, not tied to any single change, US non-brand: July (partial month) $5,357 spend, $10,706 purchase value, 2.00x. August $8,147, $22,187, 2.72x. September to date $9,211, $21,611, 2.35x, 250 conversions at about $37 each.
A US Shopify monitor store at about $530 an order, Nov 2025 to Aug 2026, now paused, brand in its own campaign. Non-brand Shopping: $18,048 spend, $98,731 value, 5.47x, about $97 per purchase. Non-brand Search: $27,183, $144,293, 5.31x. Not a clean improvement story: non-brand ROAS went from 7.9x in the first full month to 3.4x by August.

**2. Luxury or high-value**
No handbags, fashion, jewellery or resale. If that's the line, we don't clear it. Closest is a US luxury mattress brand at about $1,300 net per order, on a headless store where the storefront and the Shopify backend sit on different domains.

**3. Single-quantity inventory**
No. None of our accounts carries single-quantity stock, so I won't claim it.

**4. Verifying the Lovable to Wix journey**
Tag Assistant across both sites. Confirm the Google tag and conversion linker fire on the Lovable landing page, the same GA4 user and session carry onto the Wix subdomain with no self-referral, and the click ID is still readable at checkout. Then one authorised purchase on your cheapest bag, refunded, checked for value, AUD and transaction ID in GA4. Ads attribution needs a real ad click, so that gets confirmed on live orders.

**5. In GA4 but not Google Ads**
First, is auto-tagging on, and what is Google Ads counting: imported GA4 purchase or its own tag, primary or secondary. Then whether the click ID survives Lovable's routing to Wix. Then the event: double firing, missing transaction ID, wrong currency. Some gap is normal, since Ads only counts ad-driven orders.

**6. Keeping valuations out of purchase bidding**
Valuation enquiries get their own lead goal, applied only to valuation campaigns, while Shopping and PMax bid on purchases alone, with sell, consign and worth-type searches negated. On the mattress account we demoted Shopping app micro-events to secondary after Begin Checkout logged $214M in value.

**7. Shopping and PMax for one-offs**
Custom labels for house, price band and margin tier, so bidding learns by group, not by bag. Standard Shopping first for negatives and control, feed-led PMax once purchase tracking is trusted. Remarketing shows similar bags from the same house, since the one viewed may be gone. For the unavailable-page errors: sold bags lingering in the feed, URLs breaking between Wix and Lovable, and whether Google can read price and availability on the page.

**8. A site issue we caught**
No checkout fix with a sales number after it. On the mattress account our Google specialist found Merchant Center prices about $599 above the live site, because Shopify automatic discounts don't sync as sale prices. Fixed with manual sale-price overrides on all five variants. I can't show you a sales lift from it: Shopping ran about 0.7% CTR in August with no purchases, and that campaign is paused.

**9. Audit price**
$1,500 USD fixed, for the full audit and written report. It's our onboarding fee, so moving to implementation carries no second setup charge.

**10. Ongoing**
20% of monthly ad spend, $1,500 USD minimum, stepping down above $30,000 a month.

**11. Who does it**
Not me at the keyboard. Our Google specialist, who ran all three stores above, does the audit and then runs the account. Our conversion tracking specialist owns GA4, GTM and the cross-domain work. I stay on strategy. Nothing goes to a junior after onboarding.

**12. Access**
Read-only in Google Ads, GA4, GTM and Merchant Center, view access to the Wix store, a Lovable developer contact, and sign-off for one test purchase.

What share of spend goes to ecommerce versus valuations today? And what margin do you keep on a consigned bag versus one you own? That sets break-even ROAS and the value we send Google.
