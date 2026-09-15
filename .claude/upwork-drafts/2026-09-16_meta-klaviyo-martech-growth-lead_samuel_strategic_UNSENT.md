# Upwork Proposal - Meta + Klaviyo + tracking/testing growth lead (seat-shaped)
Profile: Samuel | Style: strategic | Status: UNSENT | Drafted 2026-09-16

## Screen
- No literal "full time" string, so auto-DQ did not fire. Seat tells present: "hands-on leadership role", "What You'll Own", third-person careers voice. Pitched as agency, seat conceded in body.
- Post appears truncated (email section and requirements cut off). Spend, geo, company unstated.
- Service-scope rule says ignore email, but Klaviyo is a real service line (reference_klaviyo_email_is_real_service_line), so kept.

## Facts used
- Our own site duplicate GTM container (GTM-KFQDMCH5) removed 2026-08-14.
- Nightlark Klaviyo: onsite tracking returning zero Added to Cart; Tiami cart-flow exclusion mirror / double-send guard.
- Neue Maison prospecting lanes, full tenure: 2.36x / 1.36x / 0.40x killed in 11 days / 0.08x. Not designed as a test.
- Dedicated tracking specialist, server-side GTM (no CAPI case study, no completed CAPI build claimed).
- 6 years, ~$249K/mo managed (verified 9/8).
- QC agents and DB log not run (contractor_query cannot INSERT).

## Draft

When Meta and Klaviyo run against the same Shopify store, both platforms will claim a big share of the same orders. Someone clicks a retargeting ad, abandons checkout, then buys from the abandoned checkout email. Meta counts that purchase inside its click window, Klaviyo counts it inside its own, and adding the two dashboards makes email look like it carries revenue it actually shares with ads. The usual result is prospecting getting underfunded because retargeting and flows appear to be doing all the work.

That is why we would start the testing program with holdouts before creative. Hold a small random share of the list out of the checkout and cart flows, and run a holdout on Meta retargeting. It tells you what each channel adds on its own, and it stops retargeting budget and flow timing from competing for the same buyer.

The tracking layer needs the same skepticism. Browser pixel and server events have to carry a matching event_id or Meta counts purchases twice and optimizes toward an inflated signal. The failures are rarely exotic. On our own site we found a second Tag Manager container quietly firing on funnel pages. On a client Klaviyo build, onsite tracking was returning zero Added to Cart events, so the cart flow would have fired on nobody. A new cart flow also has to mirror the checkout flow's exclusions or customers get both emails.

On killing variants fast: on a furniture brand's Meta account, splitting prospecting by product showed one lane at 2.36x, another at 1.36x, a chair lane at 0.40x that was cut after 11 days, and a generic catch-all at 0.08x. Nobody designed that as a test, but it is why we separate lanes early rather than let one blended campaign hide the losers.

One thing to be direct about. We are an agency, not a single hire. Our team covers this with a Meta buyer, a dedicated conversion tracking specialist working in browser and server-side Tag Manager, and in-house Klaviyo builds for ecommerce clients. Six years in, roughly $249K a month in managed spend. If the role needs one person embedded exclusively, that is not us, and better to know now.

Roughly where is monthly Meta spend today, low five figures or well past that, and is anyone measuring Klaviyo revenue against a holdout yet?
