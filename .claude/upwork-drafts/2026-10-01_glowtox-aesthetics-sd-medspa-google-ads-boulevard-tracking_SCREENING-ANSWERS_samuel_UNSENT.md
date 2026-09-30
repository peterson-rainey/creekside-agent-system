# Screening answers: Glowtox Aesthetics (pairs with ..._samuel_strategic-diagnostic_UNSENT.md)

- Status: UNSENT. QC (qc-reviewer-agent) PASS WITH FIXES, all 14 fixes applied, recheck not run.
- Q1 answered gap-first: zero cost-per-paying-client proof. Integrity Naturopathic account 12mo $22,560/547 = $41.25 (live 10/1); Laleh branded $67.94 (since 8/28) vs PMax $224.98 90d; Tooth Co branded $86.23 vs veneer search $265.19 90d.
- Q2/Q3 rest on Boulevard article 11326791 + Google answer 15595717 (both read 10/1) and 16701855.
- Q3 appeal = gTech Health in Personalized Advertising win 2025-06-25; never date it or say recently.

## ANSWERS

Q1. What cost per new patient or client have you achieved for a med spa or clinic, and how did you measure it?

None of our clinic accounts measure cost per new paying client yet. What we report today is cost per conversion in Google Ads, split by campaign. For a naturopathic clinic we run on Google, the account has spent about $22.5K over the last 12 months at about $41 per conversion. In two cosmetic dental practices, branded search has recently cost about $68 and $86 per lead against about $225 and $265 on non-brand over the last 90 days, which is why we report branded separately: blended together, lead cost looks lower than it is. Going from cost per lead to cost per paying client is the step we'd build with you through Boulevard, and it becomes the headline number once it's in place.

Q2. How would you track a Google ad click through to a completed, paid appointment in a booking system like Boulevard?

Boulevard's booking overlay reports to GA4 rather than Google Ads or GTM, and its purchase event fires when the booking completes, not when it's paid. So there are two layers.

Booked: confirm the GA4 connection is on, mark the Boulevard booking event as a key event, and import it into Google Ads as the primary conversion. "Book Now" clicks and form fills stay secondary so they don't steer bidding. Calls go through call tracking with dynamic numbers that carry the click ID, since some clients book by phone.

Paid and completed: capture the click ID when someone lands on the site and store it in a first-party cookie. Whether we can tie that back to a Boulevard visit depends on whether Boulevard lets us pass the click ID, or the client's email or phone, into the booking record or an export we can read. If it does, completed, paid first visits get uploaded to Google Ads with the visit value and no treatment details. Once there's enough volume, that upload becomes the primary conversion and the booking event moves to secondary. If it doesn't, we'd tell you in the audit and keep optimizing to bookings. We haven't returned completed visits from a booking system before, so this is the part we'd build new with you.

We'd also check whether Reserve with Google is switched on, since those bookings can skip your site entirely.

Q3. How do you handle Google's advertising policies for injectables like Botox?

Two policies matter most.

Prescription drug terms: Botox and other toxin brand names are prescription drug terms. In the US they may appear in ad text and on landing pages where local law allows, but keyword-targeting them requires Google certification. So injectables campaigns are built on treatment searches like wrinkle relaxer, lip filler and near-me terms, and the audit checks whether the current account bids on brand names.

Health in personalized advertising: injections are named in it, which can switch off remarketing lists, customer-list targeting and lookalikes for that content. We'd rely on search intent and in-market audiences instead, and keep treatment details out of anything our tracking sends to Google.

When an ad does get flagged, the landing page can be the cause rather than the ad text, so we check the page alongside the ad. Our team has won a Health in Personalized Advertising appeal through Google support.

Q4. A campaign has spent $1,400 in 30 days with zero leads on Max Clicks bidding. What would you do in the first week?

First, find out whether it's really zero. $1,400 buys enough clicks that zero leads usually means either the tracking is broken or the traffic is wrong, and the fixes are different.

Days 1-2: run a test booking and a test call through the live landing page, and check Tag Assistant and GA4 real-time to see whether anything records. Check Boulevard and GA4 for bookings the campaign may have driven that Google never saw.

Days 2-3: go through the search terms report and add negatives. Check that location targeting is set to "Presence" (people in or regularly in your area) rather than "Presence or interest," that Display and Search Partners are off, and that the booking overlay loads properly on mobile.

Days 3-5: if tracking works and the traffic is bad, cut the budget or pause it and rebuild into tight service ad groups. If the traffic looks right but nobody books, fix the page before spending more.

We wouldn't switch that campaign straight to conversion-based bidding. With zero conversions, Smart Bidding has nothing to learn from. Until tracking is proven and the campaign produces bookings, a max CPC limit keeps spend under control.

Q5. What would your monthly report include, and what's the one number you'd hold yourself accountable to?

You'd get a written update every two weeks plus a live dashboard. Each update covers, and the month-end one rolls up:
- spend by location and campaign, with branded and non-brand on separate lines
- bookings, calls, and new versus returning clients as Boulevard data allows
- cost per booking, and cost per new paying client once completed visits are tied back
- search terms we cut and why
- what we're testing next and anything we need from you

The number we'd hold ourselves to is cost per new paying client from non-brand campaigns. Branded mostly captures people who already know you, so it stays on the report but doesn't count toward that number. Until the Boulevard tie-back is in place, we'd report cost per booking and say plainly that it's a stand-in.
