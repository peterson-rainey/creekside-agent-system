# Google Ads takeover, ongoing maintenance + optimization, weekly meeting (Samuel, strategic + diagnostic) UNSENT
Profile: Samuel Rainey (General) | Style: samuel_strategic, diagnostic opener | Date: 2026-09-21 US Central (Postgres now() 22:40 UTC) | 349 words / 1,943 chars (v2, post-QC) | No sign-off | ATTACH: winterbotham_parham_teeple_CLEAN.pdf

## Job post (as pasted, no title / budget / rate / location / industry / screening questions)
> I need an expert to take over and manage my Google Ads account. The account has already been set up, so this role is focused on ongoing maintenance and optimization. I'm looking for someone who can monitor performance, make adjustments, and keep the account running smoothly. I also expect one weekly meeting to review what is working, what is not, and next steps for improvement.

## SCREEN
- Already-drafted / twin: none. `upwork_jobs.job_description` ILIKE on five distinctive phrases returned only three older, different Google + Meta posts (June to Aug 2026). Draft folders grepped at start and again before saving: no match. Lindsey can't pitch Google-only, so Samuel.
- Ads in scope: yes, Google Ads is the whole job. Owner-operated ("my Google Ads account"), not white-label. Not a seat ("role" but no "full time"). No trial, no profit-share, no worker-location requirement, no no-agency clause.
- Required items: one, the weekly meeting. See OPEN #1.
- Spend: UNSTATED, no budget-size prose, so the $5K floor is unmeasurable, not cleared. Asked in the close as a relative range with a reason.
- Geo, listed rate ($40/hr floor), payment verification, hourly vs fixed, duration: all UNKNOWN from a pasted post. Check the job page before sending.
- Case-study matcher (`match_proposal_context`): zero matches.

## VERIFIED LIVE 2026-09-21 (contractor_query)
- Google Ads accounts with spend since 9/10 and `reporting_clients` status active: Doctor Laleh, Myriad Traders, The Tooth Co, Tiami, Perfect Parking, Canvas Homes, Vida Dentistry, Nightlark, Integrity Naturopathic, Retirement Income Solutions, Tilly Mill Auto Center (11), plus Outback Peptides at $10.17. Scattered Kind excluded (churned). -> "about a dozen". Operators are Ahmed I. / Ahmed Imran and Ade A., so "a Google Ads specialist on our team" is true.
- Perfect Parking (paving contractor, ACTIVE, operator Ade A., spending through 9/20), 2025-12-10 to 2026-04-17: `Search - Charlottesville` $5,752.02 / 396 clicks / 43.83 conv / $14.53 CPC / $131.22 per conversion; `Perf Max - Charlottesville` $5,644.40 / 1,879 clicks / 21.05 conv / $3.00 CPC / $268.19. Same as the 9/16 pull. Window check: both campaigns stopped spending in April 2026 (PMax ran Nov to Apr, Search Dec to Apr), so the window is the full side-by-side run, not a picked slice. PMax's Nov stub ($71.35, 0 conv) left out; adding it makes PMax slightly worse ($271.53), so the omission does not help our side of the argument. Past tense ("ran") is correct.
- Samuel = 6 years (memory, confirmed by Queenie 8/12).
- Winterbotham Parham Teeple: `case_studies` key_result "Doubled bankruptcy leads (117 to 229) and cut CPA 42% (from $86 to $50.29) through market-specific campaign restructuring in Orange County." PDF read in full 9/16: 229 conv up from 117, $50.29 CPA down from $86.09, strategy section titled "Market-Specific Campaign Restructuring". Mechanism is documented, so "restructure that took leads from 117 to 229" is not implied causation. No dates in the PDF; white-label account, not in `google_insights_daily`, so not live-verifiable.
- CLEAN file re-checked 9/21: `.claude/attachments/winterbotham_parham_teeple_CLEAN.pdf`, %PDF-1.4, 785,596 bytes (same as 9/16), 0 "localhost" strings, 0 samuel/rainey/peterson strings.
- Live report: every active `reporting_clients` row with an ad account has a live `/report/<token>` dashboard (Report Health Monitor SOP), per [[reference_client_reporting_cadence_biweekly]].

## GOOGLE MECHANICS, primary source read 2026-09-21
- Primary vs secondary, Help 11461796: primary actions "are reported in the "Conversions" column in your reports and used for bidding as long as the standard goal they are part of is used for bidding." Secondary are "for observation only ... not for bidding."
- Click-date reporting, Help 6270625: "The primary conversion columns mentioned above are calculated based on the time of the click, not the time of the conversion." Conversion-time columns exist ("Conversions (by conv. time)").
- Learning, Help 6263057: new strategy, setting change, composition change (campaigns, ad groups or keywords added or removed); "you may not want to measure performance until the learning period is over." Draft says "a bid strategy change", not "any bid change".
- Change history, Help 19888: "lists the changes made to your account, campaigns, and ad groups during the past 2 years"; details include "who added a keyword".

## WITHHELD, AND WHY
- "a form that fires twice": a conversion set to count One per click would not double count, so the draft says the action counts one form fill twice (the outcome), not that the form fires twice.
- Who is on the calls: in Fathom since 7/15, client calls on Google-inclusive accounts are Peterson and/or Cade (Tooth Co, South River, Laleh); no Google specialist appears on any client call. So the draft doesn't say the specialist joins the calls, and doesn't put Samuel on them either ([[feedback_principals_never_do_delivery_work]], [[feedback_never_assume_peterson_availability]]).
- Search terms for Performance Max: Help 16327396 still unread, so no PMax search-terms claim.
- Fee / onboarding / 90-day minimum: not asked, spend unknown. Nothing priced.
- Weekly scorecard sample (`.claude/attachments/weekly-scorecard-sample-redacted.pdf`): DTC retail, built for Mitchell Wool, and it sells a weekly cadence that isn't approved yet. Not attached.
- Perfect Parking PDF: headlines a 12-day window and is silent on Performance Max, so it would contradict the body. Integrity Naturopathic CLEAN: shows a $14 best CPA vs ~$40 live. Aura: a build, not a takeover, and no spend since 8/31.

## OPEN FOR QUEENIE
1. WEEKLY MEETING. The post expects one weekly meeting. Our documented cadence is reports every two weeks plus a live dashboard, and the standing rule is to confirm anything faster with you first. So the draft says "meeting time goes to decisions" with no cadence and no attendee. Weekly client calls do happen on some accounts (Myriad Traders touchbase with Lindsey 9/3, 9/10, 9/17; Fusion Dental "Weekly Call" 7/16), but on Google accounts the client calls are Peterson or Cade. If weekly is OK, swap the fifth paragraph's second sentence for: "You'd have a live report to check any day, so the weekly meeting goes to decisions instead of reading numbers out." (+1 word, 350.)
2. Job page: spend, client country, listed rate, payment verified, hourly vs fixed, duration.
3. `upwork_proposal_logs` INSERT skipped (contractor_query can't write).

## QC + EXPERT REVIEW (2026-09-21, v1 -> v2)
- qc-reviewer-agent: PASS WITH FIXES, no blockers. (1) Heavy sentence reuse from the 9/16 part-time Google review draft (different client): whole clauses and the proof paragraph were near-verbatim. ACCEPTED: P1 tail, P3, P4 and the close rewritten; shared 5-grams with the 9/16 text went from 35 to 2 ("about a dozen Google Ads accounts"), 0 with the 9/18 takeover draft. (2) "who made them" beyond the fact block. REJECTED after a re-read of Help 19888: "The 'User' column will show the email address of the person who made the change if it was done through the Google Ads interface."
- QC also found `.claude/upwork-drafts/2026-09-18_google-ads-takeover-20yr-business-weekly-reporting_samuel_strategic-diagnostic_UNSENT.md` (dcdd46b), which my phrase grep missed. It is a DIFFERENT post (20-year business, beat the current campaigns on the same budget, weekly change log). Not a twin, but it also cites the Perfect Parking pair and attaches the weekly scorecard; if both buyers turn out to be one account, send only one.
- expert-review-agent: Good. (1) "the calls" had no antecedent. ACCEPTED in spirit: "meeting time goes to decisions" (no cadence, no attendee named; the expert's "the meeting becomes decisions" would point at their weekly meeting, which is the unapproved cadence). (2) The restructure read as contradicting one-change-at-a-time. ACCEPTED: "takes that read further: split by market, budget moved to the best one" (PDF strategy = four market segments, budget reallocated to the winning market). (3) "the account sits with a specialist" was passive. ACCEPTED: "watches the account and makes the changes".
- Other v2 changes: "that week" line reworded ("Taken literally"); close now a bracket spend ask ("closer to $5,000 or $30,000") with the reason; "Google suggests not judging it until that ends" (Help 6263057: "you may not want to measure performance until the learning period is over").
- qc-reviewer-agent RE-CHECK on v2: PASS, no open issues (reuse resolved, remaining overlap is shared constants only; "who made them" accepted per Help 19888; rules 1-8 pass).

## PROPOSAL

On a Google Ads account that's already set up, the first thing to check is what it counts as a conversion. When the primary conversions include page views, or count one form fill twice, every review of what's working judges campaigns on the wrong number, and Smart Bidding, if it's on, is already bidding for more of the wrong thing.

So the first two weeks are mostly reading, fixing only what's broken. Change history lists two years of changes and who made them, which tells you whether today's numbers come from the setup or from recent edits.

After that, changes go in one at a time, starting with searches that spend without converting. That's slower, but stack three changes into one week and nobody can say which one moved the number. A bid strategy change also puts Smart Bidding into learning again, and Google suggests not judging it until that ends. And Google dates each conversion to the click, so when leads or sales lag, the latest week looks worse than it will end up. Taken literally, that week is where good campaigns get cut.

I've spent six years in paid ads, and about a dozen Google Ads accounts run through our team today. One, a paving contractor, ran Search and Performance Max side by side for four months at almost equal spend. Performance Max won on clicks, $3.00 against $14.53. Search won on leads, $131 against $268. Which one is working depends on the column you read. The law firm case study I've attached takes that read further: split by market, budget moved to the best one, leads up from 117 to 229, cost per lead down from $86 to $50.

Day to day, a Google Ads specialist on our team watches the account and makes the changes, and I stay on strategy. You'd have a live report to check any day, so meeting time goes to decisions instead of reading numbers out.

What does the account treat as a conversion today, and is monthly spend closer to $5,000 or $30,000? The first month looks different at each.
