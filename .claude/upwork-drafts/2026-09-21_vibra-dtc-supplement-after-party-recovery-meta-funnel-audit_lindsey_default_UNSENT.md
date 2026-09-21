# Upwork Proposal - UNSENT
Job: VIBRA (owner-posted), DTC supplement brand selling in the US through Shopify. Wants an experienced Meta ads specialist "with direct supplement/CPG experience" to audit the full acquisition funnel and find why traffic isn't converting into consistent sales. Not a campaign setup. Review list: Ads Manager structure and targeting; creative and messaging; CTR, CPC, CPM and traffic quality; Pixel/CAPI and conversion tracking; Shopify landing and product pages; offer, pricing, bundles and checkout; where the funnel leaks; what to pause, keep or change first. Goal: a prioritized action plan for the next 1-2 weeks. Soft item: "Please mention any direct experience you have with supplements, wellness, CPG or similar DTC brands, especially early-stage brands that needed to find product-market fit and profitable customer acquisition."
Profile: Lindsey | Style: lindsey_default (request said "Lindsey's strategic + diagnostic style proposal - write it in lindsey_default"; pre-resolved, not re-asked) | Date: 2026-09-21 Central (Postgres now() 22:42 UTC)

## DISPOSITION
No screen forecloses the draft. Drafted directly. Open items for Queenie: store identity (high confidence, not Ad Library-confirmed), the bid-field amount (standalone audit fee is UNRULED), and the listing details not in the paste.

## SCREEN
- Step 0 (already drafted): nothing in `.claude/upwork-drafts/`, `.claude/drafts/`, `drafts/`, `upwork-drafts/` (grep vibra / vibranow / after-party recovery, run twice, second time right before QC). `upwork_jobs` (job_name, job_description, client_name ILIKE vibra, plus the post's own phrases) and `upwork_leads`: no match. No Samuel twin.
- Style: pre-resolved in the request, noted in one line.
- Platform: CLEAN PASS. Meta plus a Shopify site/offer/checkout review, all inside her scope (Meta, email, Shopify/ecom).
- Required items: one soft item, not a numbered gate. Its OR-list includes "similar DTC brands", so the supplement zero does not foreclose. Supplement = verified zero for Lindsey and near-zero company-wide (only Outback Peptides: Google, Australia, operator Dustin Bowser). Disclosed as the first sentence of paragraph two.
- Spend: unstated, so the $5K screen is unmeasurable. This is a standalone audit, where the audit fee band governs, not the management minimum. Store signals a small, early brand ($5 single stick, $11.99 3-pack, gmail support address, theme defaults unchanged). Spend asked as a relative range in the close.
- Engagement/fee: standalone audit plus a 1-2 week plan. No rate asked in the post, and her format has no fee slot, so no fee in the body. BID FIELD needs a pick (UNRULED per reference_standalone_audit_fee): band $1,000-$1,500 scaled by active campaigns / Peterson's $90/hr x ~5 hrs (~$450) / catalog Meta audit $499 / the 9/16 Rocket Bookkeeper $1,500 review-and-launch precedent.
- Geo: US. PASS. Store ships only within the United States, USD.
- Not in the paste, check the listing: budget and fixed vs hourly, payment verification, proposal count, screening questions, client location.
- Bid history (upwork_jobs, supplement jobs since 9/1): Lindsey 9/11 "Senior Media Buyer for a DTC Supplement Brand" (not viewed), 9/18 "Native ads Media Buyer for 8 Fig DTC Supplement Brand" (not viewed). General 9/18 native (viewed, not messaged), 9/19 Google supplement (not viewed).
- Pooling: strict first person. Pooling adds nothing here (the only company supplement account is a Google peptide store in Australia).
- Attachments: NONE. Blush_Camera.pdf is DO-NOT-ATTACH (revenue headline fails the real spend denominator; manus.im print artifacts). No supplement artifact exists. Results-attached line replaced by the month-by-month walkthrough offer.
- Anchors: "built and sold my own e-commerce business" kept (it answers the early-stage part of the soft item). "10+ years" dropped for length.
- IDENTITY: VIBRA = vibranow.com, high confidence, not confirmed. Matches: exact name and logo "VIBRA", Shopify (`bv7rhx-5m.myshopify.com`), US-only shipping, USD, supplement, early-stage. Meta Ad Library (US, in-app browser) found nothing under VIBRA, vibranow, vibranow.com, "after-party hero", "after-party recovery", or DHM 5-HTP (53 results, none VIBRA); US keyword search is unreliable for this and the Page name is unknown (the site's social icons point to Shopify's own accounts). The near-name Vibras (drinkvibras.com, "Hydration Meets Energy Drink Mix") is a different brand: plural name, ships to 20+ countries. Confirm from the Upwork client profile before sending. Fallback paragraphs below if it's not them.

## FACTS
### vibranow.com (curl + in-app browser, 2026-09-21)
- Shopify `bv7rhx-5m.myshopify.com`, `Shopify.country = "US"`, USD. Title tag: "VIBRA: Smart After-Party Recovery Supplement & Best Hangover Relief". Meta description: "...VIBRA restores serotonin, guarantees next-day confidence..."
- Products (`/products.json`): VIBRA single stick `vibra-stickpack` $5.00 (compare $8.00, created 2025-04-29, tags include "hangover relief"); VIBRA `vibra` $11.99 (compare $15.00, created 2025-05-05); hand fan $19.99; ebook $17.99 (requires_shipping true). Both supplement products share the title "VIBRA – Berry-flavored hydration and mood support supplement" and the same description. The $11.99 product's only image is a pouch mockup reading "VIBRA AFTER-PARTY RECOVERY STICKS / BERRY FLAVOR / 3 STICKS • NET WT. 40 g" (file name "ChatGPTImageApr8_2025..."). Neither title nor description states a count.
- Pre-order: `/products/<handle>.js` for both supplement products: `requires_selling_plan: true`, selling plan group "Pre-order", option "Pay in full now, save 15%" ($4.25 and $10.19). EarlyBird Pre-order Manager app embed is live.
- Rendered product page (in-app browser): price block "$8.00 $4.25 USD Pre-order" badge; "Purchase option * Pay in full now, save 15%"; "Expected ship date: ASAP."; the only visible buy button is "Add pre-order to cart" (theme's own Add to cart hidden, no Shop Pay/dynamic checkout button); Shopify's deferred-purchase consent is visible ("This item is a deferred, subscription, or recurring purchase. By continuing, I agree to the cancellation policy..."); "Shipping calculated at checkout."
- Phone view (375x812), tested ON THE PRODUCT PAGE URL `/products/vibra-stickpack`: the first load opens a "PRESALE NOW LIVE / Exclusive Product Presale with 15% Discount / Get early access to our newest products before they launch!" popup plus a fixed "Product Presale Now Available" bottom banner (201px). The popup also showed (display "flex") on the earlier desktop load of the same product URL; after it was dismissed it stayed closed for the session. The product template renders the site's "Healthy Body, Crazy Mind" hero ABOVE the product (hero heading at 320px, product media starts at 636px), so after closing the popup the first phone screen shows no product. "Add pre-order to cart" sits at 1,709px on the single-stick page (2.1 screens) and 1,535px on the 3-pack page (1.9 screens), right under "Expected ship date: ASAP."
- Shipping: announcement bar "FREE SHIPPING FOR ORDERS OVER $150". Shipping policy page: "We ship orders within 1–2 business days... We currently ship only within the United States. Shipping is free for orders over $50." Second bar message: "SIGN UP FOR 10% OFF YOUR FIRST PURCHASE".
- Social icons (header/footer) link to `instagram.com/shopify` and `tiktok.com/@shopify` (theme defaults). Support email vibra.supplement@gmail.com.
- Tracking (webPixelsConfigList): Meta pixel 1130698042584638 via Shopify's Facebook & Instagram app (so CAPI runs through the app's data-sharing setting, level not visible publicly); Google & YouTube app (GT-K8DZMJMB, view_item/purchase/page_view); a custom pixel named "google analytics1". No hardcoded fbq.

### Lindsey proof (contractor_query, 2026-09-21)
- Blush Camera Meta `act_2050081878799128`: platform_operator Lindsey B., churned 2026-06-16 ("Results were strong, but client (Mark Wolf) moved Meta in-house to save money"). No spend before 2026-02-02 in retained data (starts 2025-09-21). Monthly: Feb $4,801.98 / 40 / $120.05; Mar $10,757.85 / 157 / $68.52; Apr $11,944.21 / 163 / $73.28; May $19,972.01 / 172 / $116.12 (drifts between 166 and 172 across pulls, so "around $120"); Jun 1-15 $10,822.04 / 91 / $118.92.
- Blush purchase vs add-to-cart/checkout, 2026-02-17 to 2026-04-09 (reproduced to the cent): purchase-labeled 4 campaigns $9,644.86 / 172 / $56.07; ATC/IC-labeled 5 campaigns $3,466.11 / 12 / $288.84. Three unlabeled campaigns; under every assignment purchase stays under $60 and ATC/IC stays more than double. Safe copy used verbatim in spirit, plus "It wasn't a controlled test."
- Meal prep, both ACTIVE and hers: Chris Ideson Meal Prep (cilifestylemeals.com, `act_312458589232737`, operator Lindsey Bouffard, $1,615.94 last 30 days, last day 9/20); Punch Drunk Chef Meal Prep (`act_1248382100071649`, operator Lindsey Bouffard, $4,187.35 last 30 days, last day 9/20). No numbers cited (CI conversion data corrupt, PDC tracking gap).
- Supplement zero: `reporting_clients` + `clients` scan (supplement / vitamin / nutri / peptide / wellness / CPG): only Outback Peptides (Google, AU, Dustin Bowser). NutriPro is meal delivery (Scott C.). Snackify (snacks) operator Aldo V., no ad account, budget 0. Comet Fuel paused, no ad account.

### Regulatory (for the call, not the proposal)
- FDA, "FDA Sends Warning Letters to Seven Companies Illegally Selling Hangover Products" (July 29, 2020), read first-hand: "Under the Federal Food, Drug, and Cosmetic Act, products intended to cure, treat, mitigate, or prevent disease are drugs and are subject to the requirements that apply to drugs, even if they are labeled as dietary supplements." Also flags young adults specifically.

## REVIEW LOG
- qc-reviewer-agent: PASS WITH FIXES. All store and proof facts traced; format, house rules, soft-item honesty and the fallback design PASS. Must-fix was "the product page opens behind a presale popup" (FACTS only said "first visit"). Resolved with evidence, not rewording: the phone test and the earlier desktop load were both on `/products/vibra-stickpack`, and the popup showed on both first loads. FACTS bullet clarified, proposal line kept. Should-fix applied: fallback "two different leaks" -> "two different problems".
- expert-review-agent: Good. Applied: the close now names account structure, targeting and creative (the post's missing areas), the campaign-count question is cut, and the spend question gets a reason. Wording "That tells me how much data there is to read" replaces the expert's "That range decides how deep the review goes", which reads as if the fee scales with spend. Not applied: "Two more leaks on your site" (echoes the post's "where the funnel is leaking").
- No QC re-check on the close edit (no new facts).
- Twin re-check right before finalizing: only this file matches vibra / vibranow in any draft folder.
- Final: 350 words / 1,904 chars, at the multi-question ceiling. Upwork's 5,000-char limit not in play.
- Last question: "Is monthly spend closer to $1,000 or $10,000?" Last sentence: "There's a short video on my profile about how I work, and on a call I can walk you through the camera brand month by month."
- DB LOG: skipped, contractor_query cannot INSERT.

---

Quick question before anything else: is the pre-order setting on your stick packs still meant to be on? On a phone, the product page opens behind a presale popup, and the only buy button, "Add pre-order to cart," sits about two screens down under "Expected ship date: ASAP." Your shipping policy says orders go out in 1-2 business days. For something people buy before a weekend or a festival, "pre-order" reads as "might not arrive in time," so the ad can work and the sale still dies on the page.

I haven't run a supplement brand. The closest are two meal prep brands I run on Meta now, and a consumer camera brand whose Meta ads I ran from zero spend. Cost per sale went from about $120 in month one to $69 to $73 at $11,000 to $12,000 a month, then back to around $120 when May spend hit about $20,000. I also built and sold my own e-commerce business, so I know this problem from the owner's side.

On that same camera account, campaigns optimized for purchases paid under $60 a sale, while add-to-cart and checkout campaigns over the same weeks paid more than double. It wasn't a controlled test, but it's why I check what each campaign is told to find before judging clicks or creative.

Two more things from your site. The banner says free shipping over $150, and the shipping policy says $50. And the 3-stick pouch and the single stick share one product name, so the pack size only shows in the photo. With the biggest pack at $11.99, do you know what a typical first order comes to after shipping? That number decides whether the fix is cheaper traffic or a bigger first basket.

You'd get a ranked list, site and checkout first, then account structure, targeting and creative. Is monthly spend closer to $1,000 or $10,000? That tells me how much data there is to read. There's a short video on my profile about how I work, and on a call I can walk you through the camera brand month by month.

---

## FALLBACK (only if VIBRA is NOT vibranow.com)
Replace paragraph 1 with: "Quick question before anything else: when a sale doesn't happen, is it people leaving the product page, or adding to cart and dropping at checkout? Those are two different problems with different fixes, and the answer decides whether the first week goes to the site or to Ads Manager."
Replace paragraph 4 with: "On the offer side, the number I'd want first is what a typical first order comes to after shipping, because it decides whether the fix is cheaper traffic or a bigger first basket."

## FOR THE CALL, NOT THE PROPOSAL
- Social icons in the header and footer go to Shopify's own Instagram and TikTok. A shopper checking social proof lands on Shopify.
- Claims: title tag "Best Hangover Relief", homepage "Hangover? Mood crash? VIBRA is your After-Party Hero", "effective, natural alcohol detox supplement", "true natural serotonin boost", meta description "guarantees next-day confidence". FDA's 2020 hangover warning letters treat products intended to "cure, treat, mitigate, or prevent" hangovers as unapproved drugs even when labeled as supplements. If ad copy mirrors the site, that's a messaging risk to raise. Meta's own policy on alcohol-referencing ads was NOT verified this session, so don't assert an age-targeting rule.
- Two discounts compete on entry: 10% off for signup and 15% off the presale.
- The ebook is set to require shipping, so checkout asks for a shipping address on a digital product.
- Product photos: the 3-pack is an AI mockup, the single stick is a phone photo.
- Tracking: Meta pixel through the Facebook & Instagram app is the right base. Check the data-sharing level (CAPI) and that each Shopify order lands once as a Purchase in Events Manager.
- If asked which meal prep brands: both are active and hers, but cite no numbers (CI Lifestyle conversion data corrupt, Punch Drunk tracking gap).
- Blush Camera churned 6/16 because the client moved Meta in-house to save money. Cite unnamed unless Queenie OKs naming.
- An after-party product sells around weekends, holidays and festivals, so "consistent sales" may need a stock-up or bigger-pack offer rather than steadier ads. Worth raising once spend and first-order value are known.
