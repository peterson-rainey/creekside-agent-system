Stale campaigns are the easy part. The harder problem is that your pixel was trained on single skein buyers, so nearly every Purchase in it is worth about what a skein costs. Point a kit at ten or twenty times that price at the same dataset and Meta keeps finding the people who bought the cheap thing. A neglected account is not a neutral start for a new offer, it is a biased one, and Phase 1 has to say whether that dataset is worth keeping.

Your media cap decides the rest. At kit prices a small cap buys few purchases a week, against the roughly fifty a week per ad set Meta wants to leave learning. One boutique I ran at fifty a day had to come off purchase optimization onto add to cart to leave learning. A higher volume one stayed on purchase. The cap picks the build.

1. First three things I inspect

Events Manager before campaigns. Last received timestamp per event, whether CAPI is really connected or it is only the Shopify app's browser pixel, event match quality, and whether Purchase still carries a value and currency. If the dataset is dead, reading campaigns is academic.

Asset ownership and account standing. Who holds the pixel, page, catalog and ad account in Business Manager, whether a former developer still has admin, payment method state, any policy restriction. Access problems take longest to fix and some cannot be fixed, so they surface on day one, not day nine.

Destinations and the feed. Every live ad's final URL resolved rather than read off the ad, then the catalog item by item for 404s, stockouts and price mismatches. On Shopify the quiet killer is that automatic discounts do not sync out as sale price, only variant price and compare at price do, so ads can quote a price that no longer exists. I found exactly that on a Shopify Plus account. Leftover audiences come last, since the retention windows have emptied.

2. Making a kit Purchase report the full kit total

Two usual causes. Either Purchase fires per line item so each skein reports its own price, or value reads from a product price field, not the order total.

The fix is to stop relying on the Shopify Meta app's defaults. Purchase fires once per order from a custom pixel on checkout completed: value from the checkout total, currency explicit, content_ids set to the kit SKU rather than the component skeins, content_type product, num_items in. The same event goes server side through Conversions API on order creation with an identical event_id so the two deduplicate instead of double counting. GA4 gets the same value and item detail. Then verified, not assumed: Test Events for payload shape, the deduplication column once traffic exists, and one real Shopify order reconciled against Ads Manager to the dollar.

Two notes. The kit has to sit in the catalog as one item at kit price with size as a variant, or catalog placements serve the thirty dollar skein again. And if skein and kit purchases both report as Purchase into one dataset, the kit needs its own custom conversion or value rule, or optimization averages down toward the skein.

3. The two weeks before the kit page exists

Days one to ten are the audit, the go or no go, and the kill list. Alongside it, none of it needing spend: tracking rebuilt and validated against the interim kit URL, with test orders proving full value before a dollar moves; the kit loaded into the catalog and Merchant Center feed at kit price; audiences rebuilt from your Shopify customer file and site traffic; three to five ads cut from your farm and sweater footage, built around the size decision rather than a discount; naming and UTM convention set so Shopify orders and Ads Manager reconcile.

The swap I plan deliberately. Changing a live ad's destination is a significant edit and can push the ad set back into learning, which at kit volume is expensive. So the new page ships as prepared ads launched alongside, not an edit to what is already learning.

4. Fees

Phase 1, the audit across Meta and Google, the written go or no go, and the kit funnel plan: 1,500 USD fixed, paid when you accept the document.

Phase 2, implementation: 2,500 USD fixed. Pixel, CAPI and GA4 rebuild, the single kit landing path, Meta prospecting and retargeting, Google brand Search plus Shopping or PMax if the kit can live in the feed, and the ads. No separate setup fee on top. If Phase 1 says everything goes dark until tracking is rebuilt, that is what the document will say, and Phase 1 is still delivered.

On the record: I have inherited neglected accounts and I run consumer ecommerce on Meta including Shopify catalog work, but my published proof is not a client Conversions API rebuild. The tracking work is real and a dedicated tracking specialist on my side does it, browser and server side.

Three answers would sharpen Phase 1 scope: what the kit will retail for, roughly what range the monthly media cap sits in, and whether the Business Manager, pixel and catalog are still under your own admin or with whoever built the 2025 funnel.
