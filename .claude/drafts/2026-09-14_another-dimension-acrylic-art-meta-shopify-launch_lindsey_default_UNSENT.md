# Upwork Proposal: Another Dimension, premium acrylic art (digital artists), Meta + Shopify + Webflow + Klaviyo + GA4/GTM launch

- **Profile:** Lindsey | **Style:** lindsey_default (request said "strategic + diagnostic", resolved to lindsey_default in the same message) | **Date:** 2026-09-14 (Postgres, US Central) | **Status:** UNSENT
- **Disposition:** Queenie chose "Draft, ask spend range" at the fork. Job page shows no budget, rate or spend figure. Provisional until spend clears $5K/month.
- **Attachment:** NONE. Results-reference line from the lindsey_default template dropped on purpose (no attachable Lindsey artifact exists).

## PROPOSAL (paste-ready)

Another Dimension is running Webflow and Shopify side by side, so where will a buyer add to cart and check out, on Webflow pages or inside Shopify? That decides where your Pixel and Conversions API have to live. Shopify's Meta channel only tracks the pages Shopify hosts, so a Webflow product page with a Shopify cart button can send Meta your purchases and none of the add-to-carts before them.

I ask because split setups fail quietly. A luxury mattress brand I run sells through headless Shopify Plus, and its add-to-cart events reach Klaviyo carrying Shopify's backend address instead of the real site, so an email button built from them would send buyers to the wrong domain. Nothing flags it. You find it by checking the events, which is why my first step is a test order traced through Events Manager, Shopify, GA4 and Klaviyo.

I've run Meta and email for e-commerce brands for over 10 years, and I built and sold my own e-commerce business before doing this for clients. For high-ticket work, that mattress brand lists between $2,000 and $3,500, and I ran Meta for a luxury furniture brand until August, about $105,000 over four months. I haven't marketed fine art, and I'd rather you hear that from me. Most accounts I run today spend $1,500 to $15,000 a month. The largest, a cosmetic dentistry practice, runs just under $100,000 a month on one Meta account.

On Shopify, Conversions API is a data sharing setting in the Meta channel that should sit at Maximum, and one risk with a separate developer is a second pixel added through GTM or site code that can double count purchases. In Klaviyo, another store I run email for was recording zero add-to-cart events, so its abandoned cart flow had nobody to send to. GA4 and GTM I review for what they do to ad attribution, mainly whether visits survive the hop from Webflow to Shopify and whether each purchase counts once.

For the first 30 days, week one puts Business Manager, the ad account, Pixel, catalog and Instagram in Another Dimension's name, then the test order. Collectors you already know can go into Klaviyo with their consent and into Meta as an audience excluded from prospecting, so month one CAC shows new buyers rather than people who already know you. Week two builds one purchase-optimized prospecting campaign, with artists tested as individual ads instead of separate ad sets so purchases aren't split too thin to read, plus retargeting. On a consumer camera brand I ran, campaigns optimized for add-to-cart or checkout paid about $311 per purchase while purchase-optimized ones paid about $59 over the same months. It wasn't a controlled test, but it's why the event stays on purchases even while sales are slow. Weeks three and four are launch and first cuts, read on click-through and add-to-cart rate by artist, with a short weekly report on new-customer CAC and ROAS.

I don't quote hours because setup isn't billed by the hour. The audit, tracking work, build and launch are a one-time $1,500 onboarding fee. Management after that is 20% of ad spend with a $1,500 monthly minimum and a 90-day minimum term, since the first month on a new account is mostly Meta learning. Training runs through that period and finishes with a handoff session on how the account is built and what to watch.

I'd do all of it myself, from the audit to your training. The one exception is a GTM rebuild. If your developer's container needs rebuilding rather than reviewing, a conversion tracking specialist I work with handles it, and you'd know before anyone touches it.

What monthly range are you planning for ads once tracking checks out, a few thousand or closer to $10,000? The account I'd build for each looks different, so the range changes what I'd recommend.

There's a short video on my profile that walks through how I run accounts like this.

---

## Screening notes (internal, not part of the proposal)

### Screens

| Screen | Result |
|---|---|
| Already drafted / dual bid | PASS. No draft in any draft dir, no `upwork_jobs` row by title or description, no `upwork_leads` row. |
| Ads in scope | PASS. Meta/Instagram is the core. |
| Platform fit (Lindsey scope) | PASS. Meta + Shopify + Klaviyo. GA4/GTM mentioned only as attribution review. No Google Ads claimed. |
| White-label | PASS. Direct brand owner. |
| Full-time seat | PASS. No seat language. |
| Geo | OPEN. No market stated. |
| Payment verification | UNCHECKED. Confirm on the job page before sending. |
| Ad spend ($5K floor) | SIGNALLED LOW, UNMEASURED. "Disciplined startup marketing budget", "start carefully", "begin relatively lean", "not a large ongoing retainer", with a conditional ramp ("scale based on actual performance", "potential for ongoing consulting"). Queenie confirmed no figure on the job page and chose draft + spend range ask. |
| "Individual freelancer, not an agency" + "do you personally perform all of the work" | ANSWERED HONESTLY. Lindsey does the audit, tracking checks, build, launch, optimization, reporting and training. A GTM rebuild goes to the team's Conversion Tracking Specialist (Jordan Tryon, active, role-named not person-named). Not hidden. |
| Hours estimate (required) | DECLINED per never-bill-hourly. Answered with canonical onboarding + management pricing. |
| Engagement shape | Setup, launch, monitor, train/handoff, door open to ongoing. Countered with the 90-day minimum term rather than agreeing to a short monitoring window. |
| Required items | 8 items + "Another Dimension" opener gate. All 8 answered. Length runs past the lindsey_default 200-350 word band (flagged). |

### Proof used, verified live 2026-09-14 via contractor_query

- **Tiami** (luxury mattress, operator Lindsey B., ACTIVE): Shopify Plus, headless ("Tiami Headless" channel), store nsk45p-wz.myshopify.com (agent_knowledge 468564b1). List prices $1,995 to $3,495 (same record). Klaviyo Added to Cart event URL points at the myshopify backend, not tiami.com, so CTAs must be hardcoded (agent_knowledge 81e54d3b, Lindsey's email account). No Tiami results cited (Meta results are uncitable).
- **Nightlark** (operator Lindsey B., Meta + account lead, email is hers): Klaviyo events API returned zero recent Added to Cart events, cart flow could not be relied on until onsite tracking verified (agent_knowledge 13134293). Platform not claimed.
- **Neue Maison** (luxury furniture, operator Lindsey B., CHURNED 2026-08-11): tenure window 2026-04-10 to 2026-08-10, $105,010.24 spend. Purchase count NOT cited, because the 343 conversions include OUTCOME_LEADS campaigns (TRADE PROGRAM, Calendly).
- **Doctor Laleh / Lux Dental Spa** (operator Lindsey B., ACTIVE): $93,854 last 30 days, $1,186,883 trailing 12 months. Spend only, never CPA.
- **Book range, last 30 days, Lindsey-operated Meta:** Chris Ideson $1,514, Quivr $2,213, The Tooth Co $2,642, Punch Drunk $4,199, Vida $5,057, Tiami $7,028, Nightlark $15,324, Laleh $93,854 (Mark My Words $135, just onboarded, excluded). 7 of 9 inside $1,500 to $15,000.
- **Blush Camera** (consumer camera brand, operator Lindsey B., CHURNED 2026-06-16): ATC/IC-optimized campaigns $4,971.99 / 16 purchases / $310.75; purchase-optimized campaigns $12,051.27 / 205 / $58.79, Feb to Apr 2026, all OUTCOME_SALES. Audiences differed, so the draft says it was not a controlled test.
- **Pricing:** canonical `pricing-reference.md` (20% to $30K, $1,500 minimum per platform, $1,500 onboarding per platform) + 90-day minimum from the 2026-05-28 standard contract terms decision.

### Deliberately excluded

- Neue Maison product-lane ROAS (Forge/Rolo/Chair/"5/8"): ROAS coverage only 19-29% on those campaigns and cost per conversion ranks them in the opposite order. Unreliable.
- Neue Maison "cold prospecting under 1x" (`{w} Andromeda | TOF + MOF`): not in the in-tenure pull, so it was the prior operator's campaign.
- Neue Maison July promo story, Master Spa Parts, CI Lifestyle, Punch Drunk numbers, Fusion Dental: not needed or not safe here.
- Every case-study PDF (no clean Lindsey artifact exists).

### Hard zeros

- Fine art, gallery, prints, collectibles, jewelry, interior design: 0 case studies, 0 clients (verified live). Fine art disclosed in the body.
- No CAPI or GTM build claimed. Tracking is framed as verification and review.
