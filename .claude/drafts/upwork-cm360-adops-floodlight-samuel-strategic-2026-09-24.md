# Upwork Proposal -- Google Campaign Manager 360 (CM360) Expert
**Date:** 2026-09-24 | **Profile:** Samuel Rainey | **Style:** strategic + diagnostic | **Status:** UNSENT
**Chars:** 3,294 (limit 5,000)

## Screening: FORECLOSED, user overrode to gap-first reframe
- `keyword_search_all('Campaign Manager 360 Floodlight trafficking', 15)` returned ZERO rows.
  No CM360 / Floodlight / u-variable / SA360 / trafficking record in agent_knowledge,
  fathom, gmail, clickup, clients, or team_members. Not thin proof. Zero.
- `team_members` roster: Google Ads specialists, Meta AMs, one Conversion Tracking
  Specialist (Jordan Tryon), landing pages, creatives. NO ad ops / trafficking person exists.
- Scope is ad OPERATIONS, not ad management. Media planners, creative agencies and
  third-party vendors are named as separate parties. Creekside would manage zero ad spend,
  so the % of spend pricing instrument does not apply and the hourly carve-out
  (capped paid test gating management) does not fit an ongoing ops seat.
- Seat-shaped ("Role Summary", "the ideal candidate", "3-5+ years", certification preferred)
  but the words "full time" never appear, so that auto-DQ does not literally fire.
- Only adjacent prior bids: "Meta and Google (Google Ads and/or DV360) Media Buyers Needed"
  (2026-07-14, General) and "US-Based Ad Ops for Meta" (2025-09-03, $90/hr, General).
- Queenie ruled: override, gap-first reframe. Recommendation had been SKIP.

## Verified this session (primary sources, in-app browser)
- privacysandbox.google.com, Chavez, 2025-04-22: Google will "maintain our current approach
  to offering users third-party cookie choice in Chrome" and will NOT roll out a standalone
  prompt. Chrome did not deprecate third-party cookies.
- privacysandbox.google.com, Chavez, 2025-10-17: RETIRED Attribution Reporting API, Topics,
  Protected Audience, Private Aggregation, IP Protection, On-Device Personalization,
  Protected App Signals, Related Website Sets, SelectURL, SDK Runtime. KEPT CHIPS, FedCM,
  Private State Tokens. Attribution moving to an interoperable W3C standard (PATWG).
- Chrome phase-out from v144, full removal targeted v150 (secondary sources, hedged in body).
- CM360 cross-environment reporting links cookies + resettable device IDs + aggregated
  sign-in data, plus modeled conversions. NOT purely cookie-based -- this killed an earlier
  "cross-device exposure" line that would have been wrong.
- Spend: ~$3.84M trailing 12mo, ~$249K/mo current run rate. Pooled team book.

## QC + expert review (both FAILed v1, all blocking items fixed)
1. "The Floodlight third-party cookie keeps working in Chrome" -- asserted a product
   internal we never verified, to a buyer who lives in the product. Rewritten.
2. "W3C working group, which does not exist yet" -- PATWG exists, the STANDARD does not.
   Misplaced modifier, factually false as written. Fixed.
3. "dropped quietly rather than rejected loudly" -- wrong. Both APIs return per-conversion
   status. Claim removed, point re-anchored to Google Ads import lag.
4. $249K/mo vs $3.84M/12mo read as a 22% shrinking book to a buyer who monitors pacing.
   Reconciled and labeled.
5. Double dismissal ("keep looking" + "skip us") told the reader to pass twice. Cut to one.
6. Closing question had a canonical answer (the ad server, per the IO), which would have
   signalled we do not know standard IO terms. Replaced; the IO point is now conceded
   inside the pushback, which converts the weakness into a credential.
7. U-variable pushback DROPPED entirely -- it asserted CM360 internals two paragraphs after
   conceding zero CM360 hours, and `conversions.batchupdate` can append custom Floodlight
   variables, so "they do not backfill" was too absolute. Three pushbacks became two.
8. Safari/Firefox "blocked" -> "restricted by default" (Firefox partitions, not blocks).

REJECTED from expert review: naming CM360's 28-day/60-day import limits, and adding
DV360/SA360/CTV angles. Both would assert hands-on CM360 knowledge we just disclaimed.

## Rule checks
Under 5,000 chars | no em dashes | no URLs | no contact info | no Samuel/Peterson/Pete named
book pooled not first-person singular | no certifications claimed | no name sign-off
no case studies or result claims (correct: zero CM360 proof) | no self-blame | no filler

---

CAMPAIGN MANAGER 360

Worth putting one thing on the table first, because most of the market is still planning against the old version of it. Third-party cookie deprecation in Chrome is not happening. Google reversed that in April 2025 and kept cookie choice as it stands. Then in October 2025 it went further and retired most of Privacy Sandbox itself. Attribution Reporting, Topics, Protected Audience, Private Aggregation and IP Protection are all gone, with Chrome phasing them out from version 144 and full removal targeted for 150. CHIPS, FedCM and Private State Tokens survived. What replaces the measurement layer is an interoperable attribution standard at the W3C, and that standard does not exist yet.

That inverts the assumption a lot of measurement roadmaps were built on. There is no Sandbox migration left to run, because the thing everyone was told to migrate toward was withdrawn. What is left is the ordinary answer: first-party data, durable identifiers, and modeling for the gaps, on browsers that never waited for Google anyway. Safari and Firefox have restricted third-party cookies by default for years and that has not changed either.

Now the part we will be straight with you about rather than bury at the end.

We are not your CM360 trafficker. We have not spent three to five years inside Campaign Manager 360, we do not hold the certification you list as preferred, and we have not built Floodlight schemas, designed u-variables, or QA'd creative trafficking at the volume this role assumes. If hands-on trafficking and taxonomy is the core of the hire, we are the wrong shop and you should hire the specialist.

What we do is the measurement and media half of your brief. Our team runs around $3.84 million in live Google and Meta spend across the book over the trailing twelve months, roughly $249,000 a month at the current run rate. Our tracking specialist handles conversion tracking on those accounts: GTM containers, GA4, Enhanced Conversions, Consent Mode, offline and call conversion imports.

Two things in your brief worth pushing on.

Publisher discrepancy is not a defect to be closed. Two systems counting different events under different windows with different dedup rules are not going to agree, so a gap is the expected output. The IO already settles who counts for billing. The question worth answering is the other one: which number governs an optimization decision, which number governs a client conversation, and how big a gap is actually worth an investigation. Teams without that written down re-litigate it every month.

The second is import lag. Offline and CRM-sourced conversions arrive late by definition, and in Google Ads the click conversion import window is finite. Anything arriving after it does not make the account at all. When path-to-conversion analysis is driving budget shifts, that lag quietly decides which channels look profitable, and the channels with the longest sales cycle are the ones that lose.

If there is a measurement and media scope sitting next to the trafficking seat, or if the Floodlight work is really a question about what your conversion data is worth once it lands, that is where we would be useful.

Is Floodlight still the reporting spine now that Chrome kept cookies, or has GA4 quietly become it?
