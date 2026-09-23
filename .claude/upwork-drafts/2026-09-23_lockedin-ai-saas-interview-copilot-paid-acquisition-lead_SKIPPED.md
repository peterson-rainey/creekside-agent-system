# SKIPPED - LockedIn AI (AI interview copilot + mobile mock interviewer, subscription SaaS)
Profile: Samuel | Style: strategic + diagnostic | **Status: SKIPPED, DO NOT SEND** | 2026-09-23 (Postgres now())

## DISPOSITION - SKIPPED 2026-09-23
Recommended action was SKIP on six screens, two of them hard stops. Queenie first chose **"Draft anyway,
gaps first"**, the draft below was written, and she then ruled **"skip it, agency excluded from applying"**.

**This is the second recorded override-then-skip on a finished draft** (after Bedspoke, 2026-09-16). A
"draft anyway" on the anti-agency screen is NOT durable. The pattern to carry: on a post that forbids a team,
the draft can be produced and still lose, because producing it does not change the structure.

**No QC verdict exists for this body.** `qc-reviewer-agent` and `expert-review-agent` were both launched and
then stopped when the skip landed. The text below is UNREVIEWED. Do not lift it into another proposal without
running QC first.

**Twin on the same job:** a concurrent session drafted a Lindsey version,
`2026-09-23_lockedin-ai-interview-copilot-saas-subscription-meta-google_lindsey_default_*`. Queenie's ruling
is categorical (Creekside is an agency, agencies are excluded from applying), so it applies to both profiles.
Two factual errors in that twin's screening record are corrected at the bottom of this file.


## SCREENS RUN - SIX FIRED, TWO OF THEM HARD STOPS

1. **Required-items proof gap (HARD STOP, not normally overridable).** Post demands "at least one case
   you can share (anonymized is fine): monthly spend, period, and **paid CAC or trial-to-paid before and
   after**." Verified live: that metric does not exist anywhere in the book. See VERIFIED below.
2. **Exclusion clause.** "Shopify, ecommerce, DTC, CPG and local lead-gen experience does not qualify on
   its own, however large the numbers." That rejects 25 of our 28 case_studies rows by category and
   pre-empts the exact substitution we would otherwise make. Same shape as the 2026-09-06 B2B SaaS skip,
   stated harder.
3. **Anti-agency / no-handoff two-way collision (HARD STOP).** "one U.S.-based paid acquisition lead who
   has **personally** grown" + "**Applying as an individual, not an agency or team**." Pooling all three
   books is mandatory for us; a principal in a delivery seat is banned. A post that forbids handoff forbids
   the only structure we are allowed to describe honestly. Standing tally roughly 23 skips vs 3-4
   draft-anyways, including three confirmed skips on 2026-09-22, two of which were asked for as the
   strategic version.
4. **Hourly floor.** $30-$50/hr. Bottom of range $30 fails the $40 floor. Their $50 ceiling also sits
   under Samuel's listed $73.
5. **Never bill hourly - IVC carve-out FAILS 2 of 4.** Capped and short YES (60 hrs / $3,000 / 4 weeks).
   Paid YES. Gate to management NO - the management behind the pilot is itself hourly at 15-25 hrs/week,
   which is the original ban verbatim. No rate quoted by us NO - an hourly Upwork contract requires our bid
   inside their band.
6. **Unpaid spec work at shortlist.** "Shortlisted applicants receive a full export... Review it and send
   back written findings, priorities, measurement concerns and the first tests you would run." A full
   paid-media audit, delivered free.

**Screens that CLEAR:** ads in scope (Meta + Google, client-side); US geo, and "Based in the United States"
is satisfiable since the persona is US-based; not white-label (client is the advertiser, no reseller layer);
not a full-time employment seat (contract, 15-25 hrs/week).
**Unmeasurable:** ad spend never stated; payment-verification and client history not in the paste.
**Dedupe:** no LockedIn AI row in `upwork_jobs`, no client row, no prior draft in any folder. First sighting,
single profile bidding.

## VERIFIED LIVE THIS SESSION (contractor_query, 2026-09-23)
- `case_studies` = 28 rows. Exactly **1 SaaS** (ReferPro) and **2 Apps** (BDC App, Birthday Club App). The
  other 25 are ecommerce, food, healthcare, home services, legal, auto, travel, education, finance,
  professional services - i.e. precisely the categories the post excludes by name.
- **ReferPro** - CHURNED 2026-04-06 on BOTH platforms (`reporting_clients`; the `clients` row says "active",
  which is the never-launched-shell trap). Meta `act_941419971419732` holds **ONE day** of ingested data
  (2026-04-16), **$131.62** across 4 campaigns, 4 conversions. `key_result` is a prose ARR claim with no
  numbers. NOT CITABLE.
- **Quivr** - the only LIVE SaaS account (B2B CRM, `act_26665370033052679`, ~$3K/mo, Lindsey operator).
  **$19,388.08 lifetime across 11 campaigns, 3 recorded conversions**, conversions NULL on 10 of 11.
  Counter-proof and untrackable. Deliberately NOT cited.
- **Birthday Club App** - a restaurant **rewards** app, not a subscription. Metric is cost per **install**
  ($7.36 -> $3.90, 2,662 installs), which is neither paid CAC nor trial-to-paid. Churned 2026-01-01,
  `ad_account_id` **NULL**, **zero campaign rows**. Unverifiable. Deliberately NOT cited.
- **Jybr** (Creekside's own AI SaaS, $250/mo per agent, 7-day trial) - no `reporting_clients` row, zero
  performance rows. Confirmed again today.
- **Zero trial / subscription / app-install campaigns** anywhere in `meta_campaigns` or `google_campaigns`.
  Only substring false positives: "Submit Application" (Adventures in Wisdom), "Reverse Mortgage Apply"
  (South River Mortgage), and "BSM - Search 2025 Trial 248" which is **Chattanooga Skydiving** with null
  cost and null conversions.
- **Track record in this vertical: ~30 SaaS / subscription bids logged in `upwork_jobs`. `won = false` and
  `messaged = false` on every single row.**

## VERIFIED PLATFORM MECHANICS USED IN THE BODY (re-read from memory, verified 2026-09-16 at source)
- Meta Business Help 460276478298895: standard attribution is "within 1-day or 7-day after a link click".
  Required wording used verbatim: "standard attribution counts a click for 7 days at most", plus the note
  that 1-day click is also a standard setting. No absolute "never shows" claim made.
- Google Ads Help **6270625** "Understand your conversion tracking data": primary conversion columns are
  "calculated based on the time of the click, not the time of the conversion"; "Conversions (by conv. time)"
  reports by conversion date. (Help 2375435 does NOT carry this line; 6270625 is the correct citation.)
- Google Ads Help 15081888: offline conversions uploaded more than **90 days** after the associated last
  click are not imported; enhanced conversions for leads is **63 days**.

## ATTACHMENTS: NONE. Every candidate is disqualified on content, not just on file health.
- **ReferPro PDF** - the `case_studies.download_url` 404s. The live underscore twin
  (`1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso`) has a **"Results:" block with no extractable numbers**, and page 1
  states target market "Home service contractors". Handing a buyer who demands paid CAC a case study with an
  empty Results section and the wrong ICP is worse than attaching nothing.
- **BDC App PDF** = Birthday Club App. Recorded rule: Meta-only B2C consumer app installs, **"never match it
  to a B2B or SaaS post."** It is also a browser print-to-PDF with live `manus.im` URLs and "Opening print
  dialog" artifacts baked into the page. Not client-ready.
- Every other PDF in the book is an excluded vertical by the post's own terms.

## DELIBERATELY OUT
- **No case-study numbers at all.** Citing ecommerce or local lead-gen ROAS is the exact dodge the post
  pre-rejects ("however large the numbers"). Gap-first means stating the zero, not decorating around it.
- **Quivr not mentioned.** It is the only live SaaS account and its conversion tracking is broken, which
  would be self-sabotage on a measurement-led pitch.
- **No SKAN / iOS app-attribution claim.** The mobile-app measurement split is raised as the closing
  question instead of asserted, because current SKAN specifics were not verified this session.
- No links, no URLs, no contact info, no calendar link (first touch). No hourly rate typed. No em dashes.
  No sign-off name per the 9/4 ruling. No principal named in a delivery seat; delivery framed by role.
- Opens with the literal keyword SAAS as the post requires.

---

SAAS. The reconciliation you are describing usually breaks in one specific place, and it is worth naming before anyone opens your export: the gap between the click and the first charge.

Meta's standard attribution counts a click for 7 days at most, and 1-day click is also a standard setting. If your trial runs long enough that the first charge lands outside that window, Meta will show you trial starts and stay largely blind to the paid subscriptions behind them. It also optimizes toward what it can see, so delivery gets taught by the trial signal rather than the paid one. That is not a tracking bug waiting to be fixed. It is the window.

Google distorts the same lag in the opposite direction. Conversions there are reported on the date of the click, not the date of the conversion, per Google's own conversion tracking documentation (Help 6270625). A subscription paid ten days after the click is reported back into the week of the click, so your weekly memo and the Google interface will disagree about which week revenue belongs to, even when the totals reconcile. The "Conversions (by conv. time)" column is the one that reads the way a ledger does.

That bears directly on the upside term. Offline conversions uploaded more than 90 days after the associated last click are not imported into Google at all, and for enhanced conversions for leads the ceiling is 63 days. A subscription that only proves out after two or three renewals is past both. So an incremental contribution baseline has to live in your ledger, with the platforms treated as spend and signal rather than as the scoreboard.

Two things to weigh before you shortlist. I cannot hand you a subscription case with paid CAC or trial-to-paid before and after, because that metric was never captured on a SaaS account in our book. Our results are ecommerce and local lead generation, which you have already ruled out, and I am not going to re-label them. Second, I am not a solo freelancer. None of the work leaves our team, but it is a small shop: a media buyer builds and runs the accounts, a tracking specialist owns measurement, and I stay on structure and the read. Better you know both now than after the export.

On the export, the first three cuts I would make: paid subscriptions grouped by the week of the click rather than the week of the report, trial starts separated from trials that survived the first billing event, and refunds stripped at the cohort level instead of netted against whatever month they land in. Accounts rarely arrive read that way, and the keep, cut and scale calls move once they are.

How long is the trial before the first charge, and does the mobile app bill through the App Store or through the same web checkout as the desktop product?

---

## CORRECTIONS TO THE LINDSEY TWIN'S SCREENING RECORD (both verified 2026-09-23)

The twin reached the right dispositions but recorded two facts backwards. Fix these before either record is
reused.

**1. Quivr's identity. The twin wrote: "Quivr looks like CRM software but is `jtryonconsulting.com`, not
citable as SaaS." That is wrong, and it re-litigates a question memory already closed.**
`reference_quivr_lindsey_b2b_saas_meta_proof` exists specifically "so nobody re-litigates Quivr a third
time." Quivr **IS** a CRM SaaS product, three-to-one on the evidence: `reporting_clients.goals` = "Meta Ads
for CRM SaaS product", `ad_account_name` = "Quivr CRM Main", contact = steve@quivrcrm.io. The
`clients.website` value `jtryonconsulting.com` is a **stale field**, not the truth of the name.
**Quivr is correctly uncitable, but for the numbers, not the name:** $19,388.08 lifetime across 11 campaigns
against **3 recorded conversions**, with conversions NULL on 10 of the 11 (live, 2026-09-23). Citing the
wrong reason risks someone later "discovering" it is real SaaS and citing it.

**2. The two PDFs are swapped.** The twin wrote: "ReferPro PDF serves HTML not PDF; Birthday Club PDF 404s."
Per `reference_case_study_pdf_attachability`, it is the other way round:
- **ReferPro's `case_studies.download_url` 404s.** A live underscore twin exists
  (`1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso`) whose **"Results:" block carries no extractable numbers** and whose
  page 1 names the target market as "Home service contractors."
- **BDC App / Birthday Club does not 404.** It is a browser print-to-PDF with live `manus.im` URLs and
  "Opening print dialog" artifacts baked into the page, under a standing rule to **never match it to a B2B or
  SaaS post.**
Both conclusions ("attach nothing") stand. The reasons do not.

**3. Unverified number worth flagging before reuse.** The twin's draft states ReferPro ran "roughly $2,000 a
month across six months." The $2,000 comes from `reporting_clients.monthly_budget`, which is a **budget
field, not recorded spend**. ReferPro's Meta account holds exactly ONE day of ingested data ($131.62 total).
The Google side was not checked this session. Do not repeat that figure as spend without verifying it.
