# Upwork Proposal - A Beauty Laser & Skin (Angela), Plainfield IL med spa, Google Ads takeover after third-party audit
Profile: Peterson (formerly Samuel) | Style: strategic | Status: UNSENT | Drafted 2026-09-02 (Postgres now(); local clock said 09-03)

## SCREENS RUN
- Ads in scope: YES, Google Ads takeover. Not white-label, not coaching, not an FTE seat, not profit-share,
  not a flat-fee portfolio owner. She is the business owner, not the operator.
- Geo: Plainfield, Illinois. US. Clears the US/CA/UK/AU screen.
- Spend: NOT STATED anywhere in the post. $5K/mo floor is unmeasurable either way, so not a DQ. Asked as a
  relative range in the close per the budget-ask rule.
- Payment verification: NOT SCREENABLE. Job text was pasted, no live Upwork job URL, logged out. Flag before send.
- Duplicate-profile check: no matching row in `upwork_leads` (searched laser / spa / beauty / Plainfield /
  "laser hair removal"). Only hit was Simone Sparks, unrelated. No second Creekside profile is on this job.
- Required items: no screening-question list. She asks for recommendations + approach, both answered in the body.
- Pricing: not asked, and management sits BEHIND the audit, so no fee quoted. If it comes up later the correct
  structure is $1,500/platform onboarding with the audit included, then % of spend. The $1,000-$1,500 standalone
  audit band does NOT apply, and she is not paying us for the audit anyway.
- Landing page / CRO: she names WordPress only as an audit surface, does not ask us to own the site. No skip.

## VERIFIED THIS SESSION (contractor_query)
- Advanced Med Spa IS a real Creekside med spa engagement, now `status = inactive`. Corroborated across SIX
  independent artifacts, not just a case study: `clients` row (industry null), `google_ad_accounts` row
  "Advanced Medical Spas LLC" (1095690703), gdrive_marketing case study PDF (two filename twins), gdrive_ops
  "Advanced Med Spa Additional Info", "Advanced Med Spa Checklist", two monthly report PDFs (Apr-May 2024,
  Jun-Jul 2024), a 880-row contacts CSV, and the "Med Spa Ads - Nov - March" creative brief.
- The single most useful verified detail: "Advanced Med Spa Additional Info" lists the service categories that
  each needed their OWN tracking link. LASER HAIR REMOVAL is one of them, alongside Medical Spa general search,
  Body Sculpting, Spider Vein Removal, and InMode/Morpheus8/Forma. Three GA locations (Braselton, Cumming,
  Duluth), owner requested a 20-30 mile radius per location. This is direct, documented laser hair removal
  experience, which is exactly what she is screening for.
- Integrity Naturopathic (LIVE, active, Google-only, acct 5360677991): 2025-09-02 to 2026-09-01, $22,874.56
  spend, 584 conversions, $39.17 CPA. Computed from `google_insights_daily` joined to `google_campaigns`.
- Doctor Laleh (LIVE, active, acct 5948318044): 2026-04-20 to 2026-09-01, $82,637.12 spend, 561.2 conversions,
  $147.26 CPA. Computed the same way. Confirms and updates the prior $80.9K/552-conv figure through 09-01.
- Case study `key_result` for Advanced Med Spa: "Saved a struggling 3rd location from closure, put business on
  track for 4th location." Campaign window Oct 2023 to May 2024.

## DELIBERATELY OUT
- Advanced Med Spa's Google CPA of "$74.12 last year to $38.34" (Apr-May 2024 report). REAL and corroborated
  across two of our own monthly reports, but in the SAME report conversions fall 65.77 to 8.77/mo and clicks
  fall 4,004 to 269. Quoting the CPA improvement without the volume collapse is a cherry-pick that would not
  survive the first call. Withheld entirely.
- "2x industry average conversion rate at the same CPA." The case study's own charts benchmark against
  "Everybody Else," which is a marketing construct with no stated source. Unciteable.
- The Meta figures on Advanced Med Spa ($4.35 and $4.99 cost per conversion). She asked about Google only.
- Any laser hair removal PERFORMANCE number. We have the service line tracked, we do not have citable LHR
  cost-per-anything. Account 1095690703 has ZERO rows in `google_insights_daily`, so nothing is recomputable.
- Any claim of certification. Zero exist system-wide. No Google Partner, no Meta Blueprint.
- Polaris Dentistry (churned) and the dental framing generally. She is a med spa, not a dental practice.
- Advanced Med Spa PDF. DOWNLOADED AND READ 2026-09-02. Byline reads "By: Samuel Rainey" while the Google
  chart legend on page 2 reads "Peterson Creekside." BOTH names in one document, so it does not just invert
  the persona against the 2026-08-29 rename, it contradicts itself in front of the prospect. Also written in
  first person ("I used my campaign optimization techniques", "I got them 2x"), which fights the "our team"
  framing in the body. Its charts have unlabeled axes and no dollar values. DO NOT ATTACH.
- Dr. Laleh PDF (1puRdRRI80FMcw7dRUQvLjHbR3hYqYjSu, live). "By: Samuel Rainey", same inverted byline, plus
  "$100k in ad spend -> $2 Million+ in revenue" off a stated $20k average client value. DO NOT ATTACH.
- No links, no URLs, no calendar link, no contact info. She already offered to talk, so no booking push.
- No em dashes.

## ATTACHMENT (Drive-verified 2026-09-02, downloaded and read, not just HTTP-checked)
- ATTACH `integrity_naturopathic.pdf` (1x5jAh7fB8S_kcPSdmeLsdiCj8rNV8iwX). ONLY attachable candidate.
  3 pages, real PDF, no personal byline anywhere, footer is "CREEKSIDE MARKETING". Zero persona leak.
  Fits her stated screen ("understands how people search for and choose providers") better than the vertical
  match does: page 3 is a keyword table showing service-intent terms beating broad wellness terms.
  "naturopathic doctor near me" 30.5 conv @ $13.49 / 12.64% CTR, "naturopathic doctor sacramento" 21 @ $13.39,
  "medical wellness" 45 @ $35.79. That is the laser-hair-removal-near-me vs med-spa argument in her words.
  Survives live verification: PDF claims "$14-$40 CPA" and "150+ conversions", live blended is $39.17 over
  584 conversions. Nothing in it is contradicted by `google_insights_daily`.
  TWO CAVEATS: (1) it carries the known Apr-2026 batch defect, a dead `http://localhost:4321/` link annotation
  on the last page, same defect as green_shield and urcovered. (2) The "$14" headline anchors low against the
  $39.17 blended figure quoted in the proposal body. Expect her to ask. The band in the PDF covers it.
- Liveness sweep: `case_studies.download_url` returns HTTP 200 for all six healthcare rows but the BYTES are
  an HTML sign-in page for Advanced Med Spa and Dr. Laleh. Only the underscore twins are real PDFs. Integrity
  is the exception where the db-row ID and the marketing-drive ID are the same live file. Status codes alone
  do not prove attachability. Download and `file` it.

## OPEN BEFORE SEND
1. Ad spend range still unknown. The close asks for it.
2. Payment-method verification unscreened. Check the live job post.
3. Signed "Peterson" per the Queenie ruling and the 2026-09-01 / 2026-09-03 workspace precedent.
   `samuel-strategic.md` still says sign "Samuel" and remains STALE.

---

Laser hair removal is the one service in a med spa where inquiry volume and revenue pull in opposite directions, and that gap is usually what makes a Google Ads account look fine on paper and feel disappointing in the schedule. It is a package purchase, six or more sessions, so the money lives in who buys the series. Price shoppers fill out forms at a great rate and never book one. If the account counts form fills and calls, Google will go buy more of the cheap ones.

Which is why the Square half of your audit matters more than the rest of it. Square knows who paid and what they paid for. Once that comes back into Google as the conversion with a value attached, bidding starts chasing packages instead of inquiries. Confirming the tags fire and pointing them at the right outcome are two different jobs, and the second one is where the account actually moves.

Next is separation. We ran a three location med spa in North Atlanta on Google and Meta where laser hair removal, body sculpting, spider vein, and injectables were each tracked as their own service line instead of one blended number. Injectables convert faster and cheaper than laser, so when they share a budget and a target, Botox quietly eats the laser money while the reporting still looks healthy. That spa came to us with a third location close to closing and ended up planning a fourth.

Then geography. Laser is a repeat visit, six to eight trips, so drive time is a decent predictor of who finishes the package. A tight radius around Plainfield will look worse on lead count and better on revenue, which is the trade we would make.

Worth being straight about the ceiling. There is a finite amount of laser hair removal search in your area each month, and past that point growth comes from widening the radius or leaning harder on the other services. Both cost something.

For reference, we have a naturopathic clinic in Sacramento at 584 conversions over the last twelve months at $39 each on Google, and a cosmetic aesthetics practice at 561 conversions at $147 on about $82K since April. Different price points, same structure underneath.

Happy to look at the account once your audit lands. What monthly range is the ad budget in now, and what does Square currently treat as a booked package versus a first visit?


Peterson
