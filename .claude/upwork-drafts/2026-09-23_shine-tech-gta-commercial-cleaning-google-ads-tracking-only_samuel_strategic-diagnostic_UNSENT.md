# Upwork Proposal - Shine Tech Group (GTA commercial cleaning), Google Ads + tracking, 3 CRO pages
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-23
Disposition: Queenie override "Draft ads + tracking only" (landing-page build carved out, disclosed in body).

## SCREENS RUN (all reported before drafting)
- Spend: ~$1,000 CAD/mo (~$725 USD), bottom band, ~14.5% of the $5K floor. Google-only fee inversion ~207% steady at the
  $1,500 floor, ~414% month one with onboarding. Same client was SKIPPED 2026-08-21 (research-only post, same budget).
- Ads + landing page owned together: fires. Q1 and Q5 are CRO-gated. Carved out per override; body says we do not build pages.
- Zero-spend milestones: M1 (pages) and M2 (ads + tracking build) are both pre-launch fixed-price. Unpriceable under % of spend.
- 30-day M3 vs 90-day minimum: body states the 90-day minimum as a data argument, does not agree to 30 days.
- Vertical proof: commercial cleaning = zero. Closest honest analog is Perfect Parking (mixed commercial + residential paving).
- Geo: Toronto/GTA, Canada, passes.

## VERIFIED FACTS USED (from memory, no DB this session)
- Perfect Parking, 12 months 2025-09-09 to 2026-09-08: $79,094.48 / 372.6 conv / $212.26 CPL (verified 9/9).
- Perfect Parking Charlottesville time-matched test: Search $131.22 CPL vs PMax $289.38 CPL, PMax clicks 5.4x cheaper.
- Perfect Parking `Search - Construction Services`: 8.86% click-to-lead (through 2026-09-03).
- Perfect Parking PDF: "32 leads in 12 days at $127 CPL", verified against the real 12-day window (32.5 conv @ $120.70).
- Google call import mechanics (Help 6275629, verified 9/16): calls from ads need a Google forwarding number, mobile only,
  import matches caller number + call start time.
- Takeover with duplicate tracking = Join Piper case_studies row. Named by mechanism only, not attached.

## QC
- qc-reviewer-agent: PASS WITH FIXES. Applied: single closing question, Q3 forms/calls softened, chat line clarified.

## ATTACHMENT
- `.claude/attachments/Perfect_Parking_Asphalt_case_study.pdf` (Drive `1zmQjW1Oe0eZcbrIDIEzmIQP37sMSLqTT`), verified real PDF.
  Body quotes both its 12-day headline and the 12-month figure, so it cannot contradict the body.

## QUEENIE: DECIDE BEFORE SEND
- **Bid amount on Upwork: [QUEENIE: SET FIGURE].** M1 and M2 are pre-spend fixed-price and have no pricing instrument.
  The body quotes no fee.
- **Q3 "forms and calls: yes"**: not verified as a specific named build in the DB. Standard on accounts we run, but confirm.
- **Q2 "service line and market" structure**: inferred from Perfect Parking campaign names (Construction Services,
  Charlottesville), not a full structure pull.
- **Q6**: no real documented pre-launch rejection exists in memory. Body says so and substitutes the math on their plan.
  Swap in a real example from Peterson or an operator if one exists.
- Screenshots offered "once we talk". Perfect Parking is ACTIVE, so they can be pulled.

---

PROPOSAL (paste below this line)

Three landing pages on about $1,000 CAD a month work best as one Search campaign with an ad group per page and a shared budget. Split into three campaigns, each gets roughly $11 a day, and none of them collects enough data for search-term work or bidding to mean anything.

The number worth testing before launch is the target. Seven to twelve booked assessments on that budget means $83 to $143 CAD per assessment, all in. If about half of real leads book one, and around 9% of clicks turn into leads (what the main Search campaign on a paving account we run converts at), clicks need to land under roughly $4 to $6 CAD. Your research will show the real click prices. If they come back well above that, better to adjust the target or the budget now than find out in week three.

Straight answer on scope: our team does Google Ads and tracking. We don't build landing pages, so Milestone 1 needs your designer or developer. What we'd bring to the pages is a message-match brief per ad group and every tag on them.

1. Landing page proof: none to show, for that reason.

2. Google Ads: that paving contractor, Virginia, mixed commercial and residential. Twelve months to early September: $79,094 spend, 372.6 conversions, $212 per lead. The attached case study shows its best 12-day stretch, 32 leads at $127. Plan around the 12-month number. Search runs by service line and market, and a matched test showed why: Search ran $131 a lead against $289 on Performance Max over the same period, even with PMax clicks 5x cheaper. One of our Google specialists operates it. Screenshots once we talk.

3. Tracking: forms and calls through GTM, GA4 and Google Ads are standard on the accounts we run. Enhanced Conversions for Leads, GCLID capture and offline import, we'd build here, but there's no finished client example to show you. Same for live chat. The tracking project we can show in writing is a takeover where duplicate conversion tracking was inflating results. Fixing it made the numbers smaller and real.

4. Form path: GTM stores the GCLID and UTMs in a first-party cookie on landing, so they survive the visitor clicking around, then writes them into hidden fields. The conversion fires on a confirmed successful submit, not the button click, with the lead ID as the transaction ID so a double submit counts once, and hashed email and phone go along for Enhanced Conversions. To verify: Tag Assistant, GA4 DebugView, then one real click on the live ad, a test submission, and a check that the GCLID on the lead record matches the conversion Google Ads reports. That same GCLID is what a later import of booked assessments keys on.

Phone: a call placed straight from the ad never reaches the page, so it carries no GCLID. It's only tracked through a Google forwarding number on the call asset, mobile only, and later imports match on caller number and call time. Website calls use a forwarding number swapped onto the page. Tap-to-call stays secondary, since a tap isn't a call. Minimum call length gets set from what your real intake calls look like.

Chat: fire the conversion too early, on "chat opened", and Google learns to find chatters. It should fire when the chat captures a phone or email, which means choosing a widget that passes that event to GTM and stores the GCLID with the conversation. Plenty of them sit in a third-party frame GTM can't see into.

5. Ads, tracking and reporting are our team, nothing subcontracted. Pages are yours.

6. No documented pre-launch rejection we can put evidence behind. The one we'd raise here is the math above. Same logic on Milestone 3: 30 days on this budget cleans up search terms and proves the tracking, but it's too few clicks to call a keyword KEEP or PAUSE, which is why we work on a 90-day minimum.

What click prices is the research showing for the GTA?
