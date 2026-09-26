# Paid Media Lead Generator, Google + Meta + Microsoft, home improvement / real estate / local services (hourly, "Green" gate) | Samuel | strategic, % of spend | UNSENT

- **Date drafted:** 2026-09-26 Central (Postgres `now()` 19:58 UTC); filename uses the 9/27 Manila date to sort beside the other 9/27 drafts
- **Profile / style:** Samuel Rainey (public profile name Peterson Rainey) / `strategic`. No diagnostic-question layer: the post's first line is fixed by the gate word
- **Status:** UNSENT, **provisional** (spend unknown), **NOT run through QC or expert review**
- **Length:** 399 words incl. 3 bold headers (band 250-350, up to 400 on a multi-ask post); 2,322 chars (Upwork cap 5,000 clear)
- **TWIN ON THIS JOB: SEND ONE PROFILE ONLY.** A Lindsey `lindsey_default` draft exists (commit 6465b1a5, `..._lindsey_default_UNSENT.md`). Its header still says "Twin on this job: none" because it was written first. This draft shares **0 four-grams** and **0 header text** with it (script-checked). Proof is different on purpose: this one uses Perfect Parking, Victory Land, UrCovered, South River (Microsoft) and CallRail; the twin uses Tooth Co Meta, Fusion and the missing-leads story. The buyer runs a keyword gate, so two near-simultaneous bids from one agency are the risky case
- **Prior bids on this job:** none (`upwork_jobs` by job name and by the gate phrase; the three hits are unrelated jobs). Job page not seen, only the pasted post
- **Fork ruling (Queenie, this session):** screen recommended SKIP; she chose **"Draft, % of spend"** and **"Unknown, draft provisional"** on spend. Options offered: skip / draft % of spend / draft audit as a gate / draft hourly as asked

## Gate word and hidden-instruction scan
The post says to start "the very first line" with the word **Green** or the proposal is archived. Visible, addressed to every applicant, so it is followed: line one begins "Green." and runs straight into the insight opener (the strategic style needs an insight; the preview shows the first sentences). If you want the gate word alone on line one, as the Lindsey twin does, put a line break after "Green." Scanned the paste for reversed text, bracketed asides and "if you are an AI" lines: none, so [[feedback_hidden_ai_canary_lines_in_posts]] does not fire.

## Screens
| Screen | Result |
|---|---|
| Platform test | PASS. Google (Search + LSA), Meta and Microsoft/Bing are all in Samuel's scope |
| Billing model | Open-ended hourly (Phase 2) on Upwork's Desktop App, with a rate and weekly bandwidth demanded. Fails the IVC carve-out (the Phase 1 audit gates management, but the management is hourly with no cap). Ruled "% of spend": one sentence declines hourly, canonical fees typed, **no rate and no hours typed** |
| Cohort (live, `upwork_jobs`) | Posts asking for "your hourly rate": 117 bids / 34 viewed / 7 messaged / 3 calls / 0 won |
| Ad spend / $5K floor | UNSTATED, unmeasurable. Closing question brackets it as a relative range ($5,000 vs $30,000 combined) |
| Geo / payment verified / client history / posted rate range | Not in the paste. Check the live job page. If a $40/hr floor fails or payment is unverified, stop |
| Proof vs required items | See below. Home improvement: Google-side only. Real estate: Victory Land (Meta + Google, churned, prose only). Roofing / HVAC / solar: zero, disclosed. Microsoft: ran it, no results, disclosed. CallRail: launched for a dental client, disclosed as such |

## Asks in the post and how each is answered
- **Key insights from past audits:** three findings (Perfect Parking Search vs PMax, Victory Land parcel and creative spread, UrCovered restructure). Only UrCovered is framed as an improvement; the other two are diagnostic reads.
- **Local lead gen experience (CPL, volume, tools):** Perfect Parking spend / leads / CPL, Victory Land spend / leads, UrCovered. No client CPL targets exist in the record, so none are claimed. Tools: CallRail only (below); GA4, Meta Pixel and CRM routing are NOT claimed as past work. The closing question asks about the CRM instead.
- **Hourly rate and weekly bandwidth:** declined in one sentence. Weekly free capacity is not recorded anywhere, so no bandwidth number is given.
- **Desktop App time tracking:** covered by the same decline sentence.

## Proof, verified live 2026-09-26 Central (`contractor_query`)
- **Perfect Parking** (Google acct 6775457442, ENABLED, Google-only). `google_insights_daily` joined to `google_campaigns`, data through 2026-09-25. "Search - Construction Services": first day 2025-11-01, $42,691.14 / 2,448 clicks / 230.3 conversions / **$185.39** per conversion. Time-matched market pair, unchanged since 9/14: "Search - Charlottesville" 2025-11-22 to 2026-04-17 $5,752.02 / 396 clicks ($14.53 CPC) / 43.8 conv / **$131.22**; "Perf Max - Charlottesville" 2025-11-29 to 2026-04-17 $6,090.28 / 2,246 clicks ($2.71 CPC) / 21 conv / **$289.38**. CPC ratio 5.4x. "Leads" means Google-recorded conversions: `reporting_clients.booked_conversion_actions` is NULL, no qualified or booked stage exists (9/14). NOT cited: the $127 case-study CPL (fails live). No PDF attached. Windows differ by 7 days at the start, so the body says "November to April".
- **Victory Land Sales** (Texas vacant land, Meta act_1053463565900448 + Google 1747033046, CHURNED 2026-06-01, past tense). Figures come from [[reference_victory_land_sales_vacant_land_proof]] (verified 8/27, re-verified 9/2 with 45 active days, Housing special ad category confirmed 9/21 via PipeBoard). **Not re-pulled today.** The window 2026-04-16 to 06-09 is closed. $26,341.82 / 1,136 conversions. Cross-parcel spread at 20+ conversions, same offer: $14.86 to $32.99. One parcel (Randall 660), creative alone: PP-Old $17.66, Bo-Video $24.07, AI-Video $26.64, Video $32.99. The account has newer campaigns from Aug-Sep 2026 that are NOT ours; none are cited. Operators Scott C. (Meta) and Ade A. (Google), so Samuel-available and Lindsey-foreclosed. Prose only, no attachment exists.
- **UrCovered Construction** (`case_studies`, Google Ads, Home Services, inactive, past tense): "Grew lead volume 300% (15 to 60 leads) while cutting CPL from $454 to $239 for custom homes and barndominiums in Tennessee." The "own campaign, budget and negatives" line comes from the PDF read on 2026-09-14, **not re-read today**. The period is not stated as monthly, so the body says "went from 15 to 60 leads", never "per month".
- **Microsoft** ([[reference_no_microsoft_bing_ads_proof]]): South River Mortgage, Google-imported Microsoft account, live 2025-12-03, paused by 2026-03-03, churned 2026-08-11. Past tense, no numbers, no duration.
- **CallRail:** raw text of the ClickUp thread on task "CallRail conv. Tracking (use the tooth acct. that they own)", read 2026-09-26: 2026-04-28 Peterson "Jordan is going to help get call rail conversion tracking set up", 2026-05-18 Jordan Tryon "Callrail is launched! I will close this out". So the body says our tracking specialist **launched CallRail conversion tracking for a dental client**. It claims no dynamic number insertion, no GCLID passthrough and no result.

## FLAG: the Lindsey twin's "no call tracking" line may be wrong
The twin's body says of the Tooth Co August campaigns "with no call tracking I couldn't say whether it drove calls", resting on [[reference_tooth_co_meta_objective_pair]] (CallRail DNI "committed 4/27, never built"). The raw ClickUp thread above shows CallRail conversion tracking **launched 2026-05-18** on that same account. What the launch covered (Google click-to-call import, Meta, or both) is NOT recorded, so the twin's line is neither confirmed nor refuted. This draft is worded to the raw thread and does not touch the Meta question. If the Lindsey version is the one sent, resolve the line first. The memory files above need the correction.

## Claims NOT made, and why
1. Any Microsoft, roofing, HVAC, solar or real estate INVESTMENT result. None exist.
2. Any Meta home-improvement result. None citable (TX Gutter Expert churned 9/11, never cite its $464 CPL; Premier Kitchen & Bath has zero insight rows).
3. GA4, Meta Pixel, CAPI or CRM routing as past work. Not verified.
4. Client CPL targets. Not recorded.
5. Qualified or booked CPL. Book-wide zero ([[reference_no_downstream_funnel_proof]]).
6. Principals as the worker. "Our team" and "our tracking specialist" only; "I" appears only for the recommendation and the Microsoft-results disclosure.
7. Any hourly rate, weekly hours or capacity.

## Open for Queenie
1. **The hourly bid field.** Upwork's hourly proposal form still needs a number outside the cover letter. The body types none. Samuel's listed $73/hr is never used in the letter, so decide the field before sending, or treat this as the skip the screen recommended.
2. **Spend, geo, payment verification, client history and the posted rate range** are unscreened. Read the live job page first.
3. **Pricing typed per platform.** Three platforms means up to $4,500 onboarding. Google Search + LSA count as ONE platform ([[feedback_lsa_priced_with_search_one_platform]]). Say so if you want the letter to name that.
4. **Length** is 399 words with headers, at the 400 ceiling for a multi-ask post.
5. **The 90-day minimum** is stated as "a 90-day minimum term", per the 9/25 % of spend ruling.
6. **Send ONE profile.** This one or the Lindsey twin, not both. The call-tracking flag above applies to the twin.
7. DB log INSERT to `upwork_proposal_logs` skipped (`contractor_query` cannot INSERT).
8. **Last question:** "And do calls and form fills reach a CRM today with the ad source attached?" **Last sentence:** the same sentence.

## Review log
- Built in the main session from a verified fact pack (the `upwork-proposal-agent` has no database access and none of the standing draft rules).
- **No `qc-reviewer-agent` or `expert-review-agent` pass yet.** Mechanical checks by script: 0 em or en dashes, 0 URLs, first token "Green.", 0 shared four-grams with the twin, 0 header collisions, no sign-off name.

## PROPOSAL (paste below this line)

Green. Home improvement and local-service accounts tend to hide their waste in one setting: what counts as a lead. A call that ends in seconds, a form from someone who will never book, and a past customer ringing back can all register as conversions when the settings are loose, so Smart Bidding buys whichever is cheapest and cost per lead looks healthy while booked appointments don't move.

An audit here starts with the conversion list before the keywords: which actions count, what each is worth, and which one each campaign bids on. Search terms and geography come next, then whether calls, forms and appointments reach your CRM with the ad source attached.

**Findings from accounts we've run**

On a Virginia paving contractor's Google account, in one market from November to April, Search cost $131 a lead and Performance Max $289 on about $6,000 of spend each, even though PMax clicks were about five times cheaper. The main Search campaign there has spent about $42,700 since last November for roughly 230 leads at $185.

On Meta, our team ran a Texas vacant-land seller inside the Housing ad category, with a campaign for each parcel and creative: $26,342 and 1,136 leads between mid-April and early June. Across parcels with at least 20 leads, cost per lead ran from about $15 to about $33, and on one parcel four creatives ran from about $18 to about $33.

A Tennessee custom home builder went from 15 to 60 leads and from $454 to $239 a lead. The change was giving one service line its own campaign, budget and negatives.

**Gaps on our side**

We have no roofing, HVAC or solar account to point to. We've run Microsoft alongside Google for a mortgage lender, but I have no Microsoft results to cite. On call tracking, our tracking specialist launched CallRail conversion tracking for a dental client.

**Fees**

We don't bill hourly, so there's no rate or Desktop App time to give. Onboarding is a one-time $1,500 per platform and covers the audit and action plan. Management is 20% of each platform's monthly ad spend with a $1,500 minimum per platform, stepping down to 15% above $30,000 and 10% above $60,000, with a 90-day minimum term.

Where does combined monthly spend across the platforms sit, closer to $5,000 or $30,000? And do calls and form fills reach a CRM today with the ad source attached?
