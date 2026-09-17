The stale campaigns are the easy part. The harder problem is that your dataset has been trained on single skein buyers. Nearly every Purchase event in it is worth about what a skein costs, so when you point a kit at ten or twenty times that price at the same dataset, Meta keeps finding the people who bought the cheap thing. A neglected account is not a neutral starting point for a new offer, it is a biased one, and Phase 1 has to say whether that dataset is worth keeping or starting clean.

Volume is the other half. At kit prices a media cap buys few purchases per week against the roughly fifty per ad set Meta wants to leave learning, so Purchase may not be the right optimization event on day one. Your cap decides that.

1. First three things I inspect

Events Manager before campaigns. Last received timestamp per event, whether CAPI is genuinely connected or it is only the Shopify app's browser pixel, event match quality, whether Purchase still carries value and currency. If the dataset is dead, reviewing campaigns is academic.

Asset ownership and account standing. Who owns the pixel, page, catalog and ad account, whether a former developer or agency still holds admin, payment method state, any policy restriction. Access problems take longest to fix and some cannot be fixed, so they surface on day one.

Destinations and the feed. Every live ad's final URL resolved rather than read off the ad, plus the catalog item by item for 404s, out of stock items and price mismatches. That last one is the quiet killer on Shopify: automatic discounts do not sync out as sale price, only variant price and compare at price do, so ads can quote a price that no longer exists. Leftover audiences get rebuilt either way, since retention windows have emptied them.

2. Making a kit Purchase report the full kit total

Two usual causes: Purchase fires per line item, so each skein reports its own price, or value is read from a product price field instead of the order total.

The fix is to stop relying on the Shopify Meta app's defaults. Purchase fires once per completed order from a custom pixel on checkout completed: value from the checkout total, currency explicit, content_ids set to the kit SKU rather than the component skeins, content_type product, num_items. The same event goes server side through Conversions API on order creation with an identical event_id so the two deduplicate rather than double count. GA4 gets the same value and item detail. Then it is verified: Test Events for payload shape, the deduplication column once traffic is live, and one real Shopify order reconciled against Ads Manager to the dollar.

Two notes. The kit must sit in the catalog as one item at kit price with size as a variant, or catalog placements go back to serving the thirty dollar skein. And if skein and kit purchases both report as Purchase into one dataset, the kit needs its own custom conversion, or optimization averages down toward the skein.

3. The two weeks before the kit page exists

Days one to ten are the audit, the go or no go, and the kill list. Alongside it, no spend needed: tracking rebuilt and validated against the interim kit URL, test orders proving full value before a dollar moves; kit loaded into the catalog and Merchant Center feed at kit price; audiences rebuilt from your Shopify customer file and site traffic; ads cut from the farm and sweater footage, built around the size decision rather than a discount; naming and UTM convention set so orders reconcile.

The piece worth planning deliberately is the swap. Changing a live ad's destination is a significant edit and can drop the ad set back into learning, expensive at kit volume. So the new page ships as prepared ads launched alongside, not as an edit to what is already learning.

4. Fees

Phase 1, the audit across Meta and Google, the written go or no go and the kit funnel plan: 1,500 USD fixed.

Phase 2, implementation: 2,500 USD fixed. Pixel, CAPI and GA4 rebuild, the kit landing path, Meta prospecting and retargeting, Google brand Search plus Shopping or PMax if the kit can live in the feed, and the ads. No separate onboarding or setup fee on top.

Better you hear this from me than find it later. Our team rebuilt a Google account where duplicate conversion tracking was inflating every number and targeting had collapsed onto brand; deduplicated, the honest figure was 8.81x, not the 10x the broken setup had reported. We have inherited neglected accounts, though those are lead generation rather than Shopify, and we run consumer ecommerce on Meta including Shopify catalog work. We have no published case study of a client Conversions API build. That work is real and a dedicated specialist on our side does it, browser and server side.

Three things would sharpen Phase 1 scope: what the kit will retail for, roughly what range the monthly media cap sits in, and whether the Business Manager, pixel and catalog are still under your own admin or with whoever built the 2025 funnel.
