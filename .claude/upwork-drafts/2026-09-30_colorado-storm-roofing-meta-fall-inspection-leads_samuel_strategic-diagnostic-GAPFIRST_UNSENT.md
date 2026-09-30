# Colorado storm restoration roofing (Thrive Roofing Co., Denver metro), Meta fall inspection-lead campaign
# Samuel strategic + diagnostic, GAP FIRST. DRAFT-ANYWAY OVERRIDE (Queenie 9/30 "Draft anyway, gap first") | Drafted 2026-09-30 | QC round 1 FAIL -> fixes applied (recheck not run) | UNSENT
# ATTACH: nothing required. Optional: LawnValue PDF (Drive 164ACwDb78XsjIMLbymJtzOHGBz61T0-E), lawn care not roofing.

## SCREENS (reported 9/30 before drafting)
- PROOF GAP (foreclosing): "ROOFING AD EXPERIENCE IS REQUIRED. Please do not apply if you have not previously managed Facebook/Instagram advertising for a roofing company." Items 1-2 want roofing Meta campaigns + CPL. Verified live 9/30: zero roofing rows in clients, reporting_clients, case_studies. Only home-services Meta = TX Gutter Expert (churned 9/9, no citable CPL).
- Bid record: ~28 Meta/FB roofing bids in upwork_jobs (General + Lindsey), 7 viewed, 0 messaged. No prior bid on this job (no Colorado / thrive-roofing row).
- 30-day test vs 90-day minimum: disclosed in body.
- "Not a full-service marketing agency": soft (scope, not agency identity). Answered with "Meta only, no website rebuild".
- Spend unstated: our recommendation is $5,000/mo, at the floor.
- Geo US: pass. White-label: no (direct roofer).

## FACTS USED (verified 9/30)
- thrive-roofing.com/request-inspection/ = Cal.com routing-form embed (iframe app.cal.com/forms/507bdf99...). No fbq, no facebook scripts on the page; only Google tag GT-5MCNNCJZ + cal.com. Checked in the in-app browser.
- Cal.com embed fires bookingSuccessfulV2 to the parent page (cal.com/help/embedding/embed-events). Cal.com's own Meta Pixel app only fires a PageView-type event on confirmation (GitHub calcom issue 25449).
- C.R.S. 6-22-105: roofing contractor on insurance-paid work "shall not advertise or promise to pay, waive, or rebate all or part of any insurance deductible" (colorado.public.law).
- Meta housing SAC (Business Help 2220749868045706, read in-app 9/30): ZIP, age, gender, exclusions, lookalikes limited; city/pin radius expanded. Meta's own pages do NOT list roofing/repairs explicitly (third-party sources say roofing falls under it), so the draft says "may".
- Meta learning ~50 results/week (Business Help 112167992830700, verified 9/16).
- TX Gutter Expert: city-split campaigns, financing vs city variants, proven Instant Form campaign split from new creatives; conversions exclude form leads so no CPL. Churned 9/9 -> "until September".
- Fusion Dental: 2,558 leads at $25.31, 78 active days -> "in under three months"; qualifying questions + higher CPL accepted (undated, so "Separately").
- Pricing: $1,500 onboarding/platform; 20% marginal, $1,500/mo minimum (applies under $7,500 spend).

---

**Your inspection path**

Your inspection page books appointments inside an embedded Cal.com form, and I couldn't find a Meta pixel anywhere on your site. As far as I can tell from the outside, Meta has no way to count a scheduled inspection yet, so it would learn to find people who click rather than people who book. Cal.com's embed does tell the page around it when a booking completes, so the first build step is a pixel plus Conversions API that sends that booking to Meta as the result to optimize for. That's a small script added through the site or a tag manager, not a redesign, and it's what lets the campaign learn from homeowners who book.

**Roofing experience**

We haven't run Meta for a roofing company, and I'd rather you read that here than find it out on a call. If that's the line, I don't clear it.

The closest work is a gutter company in the San Antonio area that our team ran on Meta until September. Each city ran as its own campaign, financing-offer ads were tested against ads naming the town, and proven Instant Form ads had their own campaign apart from new creative tests. I won't quote a cost per lead from it, because the account's recorded conversions didn't include the form leads. The nearest volume reference is a dental implant practice's call center, which took 2,558 leads from Meta lead forms at $25.31 each in under three months. Our team also added qualifying questions to those forms at one point, accepting a higher cost per lead to screen who reached the phones.

**First 30 days**

About $5,000 in spend. One campaign sends traffic to your booking page and optimizes to the booking, with three angles your designer can build from: damage that isn't visible from the ground, what the inspection actually involves, and how your team handles the insurance process. A second, smaller test runs an Instant Form with qualifying questions, which gives Meta more results a week to learn from than bookings will, but needs a fast call-back to turn into an inspection. At this spend the booking is unlikely to reach the roughly 50 results a week Meta's learning phase looks for, so expect the first weeks to be noisy.

Two Colorado details. A roofer doing insurance-paid residential work can't advertise or promise to pay, waive or rebate a deductible (C.R.S. 6-22-105), so any deductible-related copy gets checked before it runs. And Meta may place roofing ads in its housing category, which limits ZIP targeting and widens city radiuses, so your target areas get mapped to what the account actually allows.

We aim for about a week from access to live, and your designer's approval is what moves that most. Our engagements run a 90-day minimum, so these 30 days would be the opening month of it. A first month on a new pixel shows direction, not your settled cost per inspection.

**Fee**

$1,500 one-time setup for Meta, then 20% of monthly ad spend with a $1,500 minimum, so $1,500 a month at $5,000 in spend. A Meta specialist on our team builds and runs it day to day, and our tracking specialist handles the pixel and booking setup. Meta only, no website rebuild.

Which parts of your target areas took the most storm damage this year?
