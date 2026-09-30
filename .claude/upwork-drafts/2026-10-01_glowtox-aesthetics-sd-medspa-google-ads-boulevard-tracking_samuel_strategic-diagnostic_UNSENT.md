# Upwork Proposal: Glowtox Aesthetics, 2-location San Diego med spa (Pacific Beach + Solana Beach), Google Ads takeover, Boulevard tracking

- Profile: Samuel (General), strategic + diagnostic. Status: UNSENT. ~455 words / 2,819 chars (over the 400 guide; post asks for tracking, compliance, results, ownership and reporting).
- Screens (10/1): Google-only, US. Spend unstated (closing bracket asks). Required items PASS (dental/appointment-based proof exists; tracking partial and disclosed). Trial "60-90 day" countered with the 90-day minimum, not agreed. Paid audit: no price typed. Screening questions referenced in the post but NOT provided.
- Dupe check (upwork_jobs, 10/1): no prior bid on this post. Aesthetics/med spa bid record: ~20 bids since March, 0 messaged, 0 won.
- Proof, verified live 10/1: Doctor Laleh Google branded "Search - Branded - 28 Aug" $2,174/32 = $67.94 vs "PMAX - Specific" 90d $37,043/164.7 = $224.98. The Tooth Co "Search - Branded" 90d $977/11.3 = $86.23 vs "Search - Veneer Specific" $9,547/36 = $265.19. Both ACTIVE. Advanced Med Spa INACTIVE, run through partner FirstUp, no number.
- Tracking proof: enhanced conversions via GTM = standard task on many accounts (ClickUp, incl. Laleh); Tooth Co CallRail DNI + GCLID passthrough (4/28). Offline import of completed visits = ZERO, disclosed. Boulevard = ZERO, disclosed.
- Platform facts, primary-read 10/1: Google Restricted Drug Terms US (answer 15595717): Rx terms allowed in ads + landing pages, certification required to keyword-target. Boulevard GA4 article 11326791: overlay on site, GA4-only (not Google Ads/GTM), purchase/cart_completed fires at booking, location_id/location_name params. Health personalized ads (16701855) covers injections.
- QC (qc-reviewer-agent) PASS WITH FIXES + expert-review-agent "Good". Fixes applied: opener softened (no "usually makes things worse"), Botox claim corrected to the US rule, "limited serving" line cut, offline-import gap disclosed for ALL booking systems, med spa line = "through a partner agency", Tooth Co uses veneer campaign not the brand-named SERP one, Laleh branded window stated, cuts/bidding contradiction fixed, dashboard promise staged (cost per booking then cost per paying client), brand exclusions on PMax, email/phone match fallback, treatment details kept out of Google, trial reframed. Recheck not run.
- Attach: nothing recommended.

## PROPOSAL

Moving Glowtox to conversion-based bidding while the counted conversion is still a form fill or a "Book Now" click can teach Google to chase returning clients who search your name, because those are the cheapest conversions to find.

Boulevard adds one wrinkle. Its booking overlay reports to GA4, not to Google Ads or GTM, and its purchase event fires when the booking is made, not when the visit is paid. Importing that event gets Google to "booked," and "paid and completed" needs a second step.

**Order of work**

1. **Measurement first.** Check what counts as a conversion today and what Boulevard already sends to GA4. Make the booking the primary conversion, keep clicks and forms secondary, and add enhanced conversions and call tracking that carries the click ID. Then return paid, completed visits, matching on the email or phone from the booking if the click ID can't be stored.

2. **Branded on its own campaign**, excluded from Performance Max and negated in non-brand search, so returning clients don't flatter new-client cost.

3. **Cuts, then bidding.** Campaigns spending with zero leads get paused or rebuilt in month one. The rest get judged on bookings, and bidding moves to conversion-based once that signal holds.

4. **Injectables.** In the US, Botox can appear in ad text and on landing pages, but keyword-targeting it requires Google certification, so the audit checks whether the account bids on it. Google's health policy can also limit remarketing and customer lists for injection content, and treatment details stay out of anything sent to Google.

**What we've run**

Our closest live accounts are two cosmetic dental practices on Google, both appointment-based. In one, branded search has cost about $68 per lead since launching in late August, against about $225 on non-brand Performance Max over the last 90 days. The other shows a similar gap: about $86 branded against about $265 on non-brand veneer search. Both report on leads, not paid visits. We haven't yet sent completed or paid appointments back to Google from any booking system, Boulevard included, so that step would be new work for us. We've also supported a three-location med spa through a partner agency in the past.

**How it runs**

The account stays yours, with you as admin. Our team runs search day to day and our tracking specialist handles GTM, GA4 and call tracking. You get a written update every two weeks and a live dashboard showing cost per booking from day one, then cost per new paying client once visits are tied back. Rather than a trial, our minimum term is 90 days, the long end of your window, since month one is mostly measurement. We'd start with the paid read-only audit.

Is Boulevard's GA4 connection already switched on, and is monthly spend across both locations closer to $5K, $10K or $20K?
