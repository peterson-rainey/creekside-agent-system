# Upwork Proposal: Out-of-home advertising agency, its own B2B lead gen on Google Ads + Microsoft Ads ("freelance PPC media buyer")

- **Profile:** General (displays as Peterson Rainey), Samuel strategic format with a diagnostic body (requested as "strategic + diagnostic", no profile named)
- **Date:** 2026-09-16 (US Central, Postgres now())
- **Status:** UNSENT. QC + expert review applied. v3 388 words (QC FAIL, expert "Good") -> v5 380 words (QC PASS) -> **v8 398 words / 2,381 chars with the attachment line (QC PASS WITH FIXES, both fixes applied)**. No sign-off. The v5 no-attachment body is kept at the end of this file.
- **Twin:** none. No `upwork_jobs` row, no earlier draft. Lindsey cannot sell Google or Microsoft.
- **Attach:** `.claude/attachments/winterbotham_parham_teeple_CLEAN.pdf` (chosen 9/16 on request; first pass was attach nothing). See Attachment ruling below.

---

## PROPOSAL (paste-ready)

Out-of-home search pulls in people from the other side of the deal. Property owners look up what a billboard lease pays, and a basic Google or Microsoft setup counts their form fills as leads next to a brand manager's. Those searches get blocked with negative keywords before launch, not discovered after the money's spent.

The bigger call is what counts as a lead. Last month our team audited an industrial manufacturer's Google and Microsoft accounts, and the headline finding was support requests counted as leads. I'd only count an inquiry once the form shows a market, a start date and a budget you'd take on. Fewer people finish that form, which is the point.

When your team marks a lead qualified or signed, that status goes back to Google and Microsoft against the click that produced it. Qualified inquiries steer bidding until signed campaigns come in often enough to learn from. Our dedicated conversion tracking specialist builds that.

On Microsoft, that loop needs one extra piece. Its own click ID has to be saved with every form fill and still be attached when qualified leads leave your CRM. Without it, uploads have to run through an enhanced conversion goal on hashed emails and phone numbers, which only match people signed in to a Microsoft account. Microsoft can also bid higher on searchers whose LinkedIn profile shows a marketing job function or your target industries, without narrowing who sees the ads.

For a paving contractor our team runs, a Search campaign and a Performance Max campaign ran over the same four months at nearly the same spend. Performance Max clicks cost $3.00 against $14.53 on Search, and its leads cost $268 against $131. Cheap clicks and cheap leads turned out to be different things, and the Google and Microsoft split gets judged on lead cost too, once each has enough leads to compare.

The attached case study is a bankruptcy law firm's Google account our team restructured into service and location campaigns. Google-reported conversions went from 117 to 229, and cost per conversion from $86 to $50.

Roughly where does monthly spend sit across both, closer to $3,000 or $15,000? Any split I'd suggest only helps inside your range. City-by-city builds look very different from builds around formats like billboards, transit and airports, so do most of your clients buy in a handful of cities, or run national campaigns?

---

## Screen notes (internal, do not paste)

| Screen | Result |
|---|---|
| Already drafted / two profiles | No match. `upwork_jobs` checked on job_name + description (out-of-home, OOH, billboard, Microsoft/Bing + B2B, "PPC Media Buyer"); latest rows 9/15. No file in any drafts folder. |
| White-label | PASS. The campaigns generate leads "for our out-of-home advertising agency" itself, not for its clients. Same shape as Mckora. |
| Seat | PASS. No hard tells (no full-time, position, salary/resume, desk hours, negative-duties clause). Soft only: job title as the ask, "The ideal freelancer will". "Freelancer" is not an agency exclusion. |
| Ads in scope / evasion / self-funded / trial / LP-CRO gate | PASS |
| Spend ($5K floor) | Unstated, not foreclosed. Asked as a relative range ($3,000 vs $15,000). Provisional until answered. |
| Geo / payment / rate / hourly | Not in the paste. Unscreened; check the job page. |
| Required items | None in the paste. The paste ended with a stray "*", so a list may have been cut off. Check before sending. |
| Proof | OOH/billboard/media: zero (0/28 case_studies, 0 clients/reporting_clients/industry_experience). Microsoft case study or results: zero. Clean B2B managed proof: none. |

## Verified live 2026-09-16
- **Perfect Parking** (active, Google only, operator Ade A.), "a paving contractor" only, never B2B. Strict window 2025-12-10 to 2026-04-17, re-pulled from `google_insights_daily` JOIN `google_campaigns`, account 6775457442: Search - Charlottesville $5,752.02 / 396 clicks / 43.83 conv / $14.53 CPC / $131.22; Perf Max - Charlottesville $5,644.40 / 1,879 clicks / 21.05 conv / $3.00 CPC / $268.19. Lead quality and the reason are undocumented, so click price vs lead price only; no "same city/market".
- **IVC audit** (Industrial Video & Control, paid 3-hour Google Ads + Microsoft Ads audit, delivered 2026-08-27, "Amazing... Great work!"). Headline finding per the delivery record: the only working conversion fired on a thank-you page view, so support requests counted as leads. PDF not on disk. Cited unnamed, number-free, platform-neutral. **Reuse ruling still pending.**
- **South River Mortgage Microsoft history (NOT used in the proposal).** Account imported from Google 2025-11-19, live 2025-12-03, billed Dec-Feb, paused by 2026-03-03, qualified-lead upload never resolved (leads reached the sheet without Microsoft Click IDs, 1/21 + 1/23/26), no results recorded, client churned 8/11/26. Both reviewers flagged the v3 sentence ("Our team ran Microsoft alongside Google for a mortgage lender"): placed after the click-ID mechanism it implied a working example. Cut. If you want it back, put it somewhere away from the tracking paragraph and expect "how did that go?" on a call.
- **Microsoft Learn:** OfflineConversion (2024-11-13): "The MSCLKID is optional when you provide a hashed email address or phone number for enhanced conversions"; conversion time within 90 days. Enhanced conversions (2026-06-18): hashed data matches "users signed into Microsoft properties (Outlook, Microsoft Edge...)"; an upload without msclkid to a regular goal is rejected. LinkedIn profile targeting (2026-06-18): company, industry, job function on Search campaigns, "bid only", "will not narrow your ads' audience".
- **"Marketing" job function:** LinkedIn's targeting playbook lists Marketing ("includes advertising, branding..."); Microsoft's Profile Data page says job functions are "according to LinkedIn"; third-party Microsoft guides list it. Microsoft's own example list is sales, accounting, purchasing. Confirm in the UI at setup.
- **Landowner searches:** Lamar's "lease your land" page and several landowner guides rank for "how much do billboard companies pay landowners".
- "A dedicated conversion tracking specialist on our team" = verified role. Offline imports described as approach, not a shipped result.

## Review log
`qc-reviewer-agent` v3: FAIL.
1. BLOCKER, ACCEPTED: mortgage-lender clause read as a working example of the click-ID loop; the audit finding read as Microsoft-side. Clause cut; audit sentence moved to the lead-definition paragraph, both platforms named. REJECTED its replacement ("including one for a mortgage lender" implies several).
2. ACCEPTED: hashed fallback needs an enhanced conversion goal.
3. ACCEPTED: "job seekers look for installer work" unsupported, cut.
4. REJECTED: swap "marketing" for "purchasing or sales". Marketing is sourced (above) and purchasing or sales roles don't buy OOH media.
5. ACCEPTED (modified): the Google-vs-Microsoft prescription now reads "gets judged on lead cost too, once each has enough leads to compare".
6. REJECTED (optional): two closing questions kept; spend is needed for the $5K screen and the market question is the easier last answer.
v5 re-check: PASS.

`expert-review-agent` v3: Good. Platform mechanics confirmed.
1. ACCEPTED (modified): "Unless you also acquire sites," removed; most OOH agencies are buy-side and the conditional invited them to think the fix didn't apply.
2. REJECTED: "brand manager" -> "media planner". The agency's buyers are advertisers; planners sit on the agency side.
3. ACCEPTED in part: mortgage lender cut. REJECTED "the same blind spot a missing click ID creates"; support requests counted as leads is a conversion-definition problem, not a click-ID one.
4. REJECTED: "The same pattern shows up outside OOH" implies we saw it inside OOH (zero OOH clients).

## Attachment ruling (2026-09-16, on request)
**Winterbotham Parham Teeple CLEAN PDF.** Read page by page today: bankruptcy law, Google Ads, Orange County; four segments (general bankruptcy, Chapter 7/13, Orange County-only), budget moved to winners; 229 conversions up from 117, $50.29 down from $86.09, $11.5K spend only $1.44K more than the prior period, clicks +21%. pypdf: 3 pages, 0 annotations, 0 localhost, 0 samuel/rainey/peterson, 785,596 bytes. Period comparison, not a best window. Its service + location restructure is the closest documented example of the city-by-city build the closing question asks about. Matches the canonical `case_studies` row; client is not in `clients`/`reporting_clients`, so not recomputable live. Visible defect: legal footer CTA ("cut your legal marketing costs while growing your caseload").
- **Perfect Parking PDF rejected:** headline is its best 12-day window ($127), frames the account as residential driveway paving on a B2B post, and the body already quotes a different slice of that account.
- **Big Chad Law (1) is the alternative** if you'd rather back the lead-quality angle: live, Samuel byline, shows cost per conversion and cost per case. Caveats: its per-case figure uses total spend across channels while the conversion figure is Google only (never put the two side by side), say "cases" never "signed", and the account came through a partner agency and has ended.
- **ReferPro / Axle rejected:** empty Results blocks. Nothing OOH or Microsoft exists.

QC on the v7 tie-in: PASS WITH FIXES. ACCEPTED: "split by service and by location" reworded to "restructured into service and location campaigns" (the paving paragraph uses "split" for the Google/Microsoft budget); ACCEPTED: "Conversions" -> "Google-reported conversions", since paragraph 2 teaches the reader to distrust raw conversion counts. Trims ("being", "actually", "real", "on our team", "an industry you sell into") confirmed meaning-neutral.

## Open before sending
1. IVC audit reuse is unruled. If not approved, cut sentence 2 of paragraph 2 ("Last month our team audited...").
2. Geo, payment verification, rate/contract type, and whether anything followed the "*" in the paste.
3. Bid field: no price in the body. Your call.
4. DB log to `upwork_proposal_logs` skipped (`contractor_query` cannot INSERT).
5. Security, for Peterson: a Microsoft Ads login password is in plain text in a ClickUp comment on the SRM "Onboarding for Bing Ads" task. Rotate it and delete the comment.

- **Last question:** "City-by-city builds look very different from builds around formats like billboards, transit and airports, so do most of your clients buy in a handful of cities, or run national campaigns?"
- **Last sentence:** same as the last question.

## Send-with-nothing body (v5, 380 words, QC PASS)

Out-of-home search pulls in people from the other side of the deal. Property owners look up what a billboard lease pays, and a basic Google or Microsoft setup counts their form fills as leads next to a brand manager's. Those searches get blocked with negative keywords before launch, not discovered after the money is spent.

The bigger call is what counts as a lead. Last month our team audited an industrial manufacturer's Google and Microsoft accounts, and the headline finding was support requests being counted as leads. For an out-of-home agency, I'd only count an inquiry once the form shows a market, a start date and a budget you'd actually take on. Fewer people finish that form, which is the point.

When your team marks a lead qualified or signed, that status goes back to Google and Microsoft against the click that produced it. Qualified inquiries steer bidding until signed campaigns come in often enough to learn from. A dedicated conversion tracking specialist on our team builds that.

On Microsoft, that loop needs one extra piece. Its own click ID has to be saved with every form fill and still be attached when qualified leads leave your CRM. Without it, uploads have to run through an enhanced conversion goal on hashed emails and phone numbers, which only match people signed in to a Microsoft account. Microsoft can also bid higher on searchers whose LinkedIn profile shows a marketing job function or an industry you sell into, without narrowing who sees the ads.

Our team runs Google Ads for a paving contractor where a Search campaign and a Performance Max campaign ran over the same four months at nearly the same spend. Performance Max clicks cost $3.00 against $14.53 on Search, and its leads cost $268 against $131. Cheap clicks and cheap leads turned out to be different things, and the Google and Microsoft split gets judged on lead cost too, once each has enough leads to compare.

Roughly where does monthly spend sit across both, closer to $3,000 or $15,000? Any split I'd suggest only helps inside your real range. City-by-city builds look very different from builds around formats like billboards, transit and airports, so do most of your clients buy in a handful of cities, or run national campaigns?
