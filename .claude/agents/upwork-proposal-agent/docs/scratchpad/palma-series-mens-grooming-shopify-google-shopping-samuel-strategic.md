Palma's bundle is probably the only SKU that can carry Shopping profitably right now. At $25 to $75 CAD on individual styling products, Google Shopping in men's grooming drops you into the same auction as Amazon listings and established brands on terms like pomade and hair clay, and a single-unit order at that price rarely survives the CPC. The fix is usually structural rather than bidding. Split the feed so the bundle and your higher-margin SKUs sit in their own product groups with their own bids, instead of one catch-all group where the cheapest product quietly eats the budget.

On your questions:

1. Tracking, before anything else. With little conversion history, every optimization decision rests on a number I cannot yet trust. I check whether purchase value passes net of tax and shipping, whether the conversion action counts transactions or line items, which actions are set to Primary, and then Merchant Center for disapprovals and limited product status that suppress impressions silently.

2. Standard Shopping. Performance Max needs conversion history to learn from, and on a new account it tends to absorb brand and remarketing traffic, then report a ROAS that looks good and tells you nothing about cold demand. Standard Shopping gives you search terms, negatives and product-level data, which is what you actually need to find out which products sell profitably. I would move to PMax once purchases are stable and you know which SKUs carry.

3. Compare Google Ads conversions against Shopify orders for the same date range, then find the cause. Usually it is the Shopify Google channel app and a separate GTM or hardcoded gtag purchase tag both firing. Run a real checkout in preview and count how many purchase hits go out. Check for two purchase conversion actions both marked Primary, and check the counting setting, since Every rather than One inflates multi-line orders. The fix is to keep one source and demote the other to secondary rather than delete it, so history stays intact. We took over a telehealth account with duplicate tracking and brand-only targeting, and cleaning that up was step one before any number in the account meant anything.

4. A Shopify consumer electronics brand we run on Google Ads and Merchant Center. Over the last six months it averaged roughly $7,800 a month in Google spend at about 9.5x blended ROAS across roughly 850 conversions. Being straight about the mix, Shopping itself sits near 5.75x and Performance Max near 5.29x. Branded Search carries the higher blended figure, so 9.5x is not a cold traffic number.

5. At $10 a day the budget usually is not the binding constraint, the bid is. I would look at whether impression share is lost to rank or lost to budget. Lost to rank means the bid sits under the auction floor for those products, and spreading $10 across a whole catalog guarantees that. Narrowing to a handful of products at a real bid beats thin coverage everywhere. I would also confirm the products are approved and actually eligible in Canada. Honestly though, $300 a month will not produce enough purchases to build the baseline you are after.

6. Titles do most of the work. Front-load them the way people search, so brand, then product type, then the attribute that matters, rather than a creative product name. Beyond that, correct google_product_category, a real product_type hierarchy you can bid on by margin tier, GTINs where they exist, gender and age_group filled in, descriptions carrying the actual search language, and clean image and availability sync.

One tradeoff worth naming. Two weeks is enough to fix tracking, clean the feed and restructure Shopping, and you would see traffic quality and impression share move. It is not enough to establish a CAC and ROAS baseline you can trust at this AOV, because that takes a few dozen purchases, not a few. I would scope the two weeks as the audit and rebuild, then judge the baseline over about 90 days.

Happy to walk through what I would look at in the account first.


Samuel
