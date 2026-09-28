# Upwork Proposal - UNSENT (QC round 1 + expert review applied; recheck NOT run)
Job: ADHD assessment company (Australia + United Kingdom), "Senior Performance Marketing Manager", hands-on seat owning Meta + Google, works with Head of Marketing, designer, developer. Scorecard per market: completed assessments, CAC, spend scalability, conversion rate. Post says "build an in-house growth team, not recreate an agency relationship internally" and "inside the accounts, not managing someone else who is". PASTE ONLY: no company name, hire type, pay, hours, location, spend or screening questions.
Profile: Samuel Rainey | Style: samuel_strategic (gap first) | Date: 2026-09-27 Manila (Postgres Central 2026-09-26)

## Disposition
Screen reported first: seat-shaped (no literal "full time", every supporting tell present), explicitly anti-agency, zero AU/UK/ADHD proof. Recommendation was SKIP. Queenie chose "Full draft, gap first".

## Screens
- Session: no device key file, contractor mode, all SQL through `contractor_query`.
- Prior sighting of this buyer: none. `upwork_jobs` job_name and job_description searched for ADHD: 0 rows. Leads index and all draft folders: no ADHD post. (The 9/8 psychiatric-clinic draft is a US Google-audit post, a different buyer.)
- Cohort: 40 bids on "senior performance marketing" / "performance marketing manager" titles, 2025-07-23 to 2026-09-17: 8 viewed, 1 messaged, 0 won. Twelve most recent mental-health / psychiatry / therapy-practice bids: 1 viewed, 0 messaged, 0 won.
- Platform: needs Meta AND Google, so Samuel (Lindsey cannot sell Google).
- Geo: AU + UK, both inside US/CA/UK/AU.
- Hidden AI-canary line: none in the paste.
- UNSCREENED (not in the paste): $5K/month spend floor, $40/hr floor, hire type and hours, payment verification, client location, timezone requirement, screening questions, whether this is an Upwork post at all.
- Proof gaps disclosed in the letter: not a single in-team hire; no AU case study, no UK case study, no ADHD or mental-health case study.

## Verified live 2026-09-27 (contractor_query)
- `case_studies`: 28 rows, 0 match Australia / Sydney / Melbourne / Brisbane / Perth / United Kingdom / UK / London / ADHD / attention deficit / psychiatr / psycholog / therap / mental health / behavio in client_name, summary, key_result or keywords.
- Tooth Co Meta `act_1032713196182770`, August 2026, both campaigns first spent 8/1 of the window and last spent 8/31, 27 spend days each: `Engagement | 7/29` (objective engagement) $1,845.88 / 49,760 impressions / 1,584 clicks / conversions NULL; `Leads 7/29` (objective leads) $1,955.17 / 26,721 / 1,087 / 124 conversions. Combined $3,801.05, engagement = 48.6% of spend. Account is a US dental practice; `reporting_clients` status PAUSED (updated 2026-09-22); operator Lindsey B.
- Tooth Co spend dates (re-queried after QC): both campaigns first spent 2026-08-03 and last spent 2026-08-31, zero spend before August or after, so "started the same day" is supported and $3,801.05 is the whole run. `reporting_clients.lead_conversion_types` is NULL for this account, so the action type behind `conversions` cannot be confirmed; the body says "conversions", not "leads", for that reason.
- Roster check: `clients` has ONE Australia-targeted account, **Outback Peptides** (Health & Supplements, Google + Meta management listed, active, signed 2026-08-20, ~$10K/mo budget, zero rows in `google_insights_daily`, not serving as of 9/14 per notes). No UK-targeted client and no ADHD client. GM Therapy (inactive) is the only therapy row.
- Policy statements (Meta data-source restrictions, custom-event blocking, personal attributes; Google health personalised-ads restrictions) come from memory notes primary-verified 9/14 to 9/26, NOT re-read today.

## Deliberately out of the body
- **Integrity Naturopathic (Google)**: live monthly CPA Oct $35.30, Nov $43.41, Dec $45.00, Jan $42.63, Feb $43.81, **Mar $37.65 (the policy-disapproval month)**, Apr $42.44, May $36.51, Jun $37.76, Jul $39.17, Aug $44.42, **Sep to date $51.05**. The stored trailing-12-month $38.31 no longer holds (about $41 now) and CPA is drifting up. Cite only with the drift disclosed.
- **Fusion Dental (Meta, churned 7/22, past tense)**: Apr 9 days $8,997.06 / 480 / $18.74 at $999.67 a day; May $32,562.41 / 1,091 / $29.85 at $1,206.02 a day; Jun $15,927.38 / 625 / $25.48 at $589.90 a day; Jul 15 days $7,259.93 / 362 / $20.06 at $484.00 a day; total $64,746.78 / 2,558 / $25.31. The only spend-vs-CAC series in the book, but confounded (9-day launch window, call-center capacity), so never present it as causal.
- **Won June 2025 Google health-policy appeal** (gmail_summaries a7751c8d, dated 2025-06-25): row exists, content not re-read today, advertiser unresolved. Add only after checking with Peterson which account it was.
- **Attachment**: none as things stand (see the Attachment section below).
- Price, rate, links, contact details, sign-off name.

## Open for Queenie
1. **QC and expert review ran once (see Review below); fixes applied; the edited text has NOT been rechecked.** Subagents lack DB access, so facts were inlined for them.
2. **Paste is partial.** Please paste the job page header fields and any screening questions before sending. This is a regulated vertical, and screening questions have arrived after the letter before.
3. **"no ADHD or mental health case study" is literally true, "no mental health account" would be false.** GM Therapy (a small talk-therapy practice, Google, 2025, about one month, inactive, failed) is in `clients`. Do not upgrade the sentence.
4. "If completed assessments land weeks after the click" is conditional on purpose: their funnel lag is unknown. It is also the closing question.
5. Spend bracket "30K or 150K" is currency-neutral because the company's home country is unknown.
6. DB log INSERT to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).
7. **Outback Peptides.** "No Australian case study" is literally true, but the company does run one Australia-targeted Google account (peptides, signed 8/20, no results, not citable, and a poor category to volunteer). If the buyer asks about Australian clients, the honest answer is one account, signed in August, nothing to show yet. Do not add it to the letter.
8. **Optional adds, each costs words (body is 348, cap 350):** (a) "Clinical and regulatory sign-off on creative would stay with you." (+10, expert edit 7, claims no experience); (b) a bridge sentence offering the measurement setup alone. NOT recommended: no standalone pricing instrument exists, hourly is banned, and % of spend has no base without managed spend.
9. **Google customer-data policy (support.google.com/adspolicy/answer/7475709)** may restrict health conversions in enhanced conversions and store-sales uploads. Surfaced by the expert review from a search summary, not read. Verify on the page before it goes in any draft or the verified-platform-facts index.
10. Odds are poor (0 of 40 on this title shape, and the post rejects the agency shape in words). Costs connects only.

## Review (2026-09-27)
- **qc-reviewer-agent: PASS WITH FIXES.** Applied: opener no longer says Google limits what it "will accept" (Google's health policy restricts audience features), and the optimisation clause now names Meta only; event advice rebuilt as "send each platform only what it allows, with no condition or assessment detail in event names, parameters or URLs" (renaming alone can still be "based on" prohibited information); "launched the same day" verified against first-spend dates (both 8/3) and reworded "started the same day"; "recorded no leads" and "recorded 124" now say "conversions" because the lead action type is unconfirmed; the "nearest thing we've run" heading dropped (it implied proximity to ADHD care the facts do not support) and is now "What we can show"; "I'd stay on strategy" cut (a principal's ongoing time is not confirmed, and it contradicts the post's "inside the accounts"); "creative director would make the statics" softened to "lead the creative"; "What I'd set up first" is now "What we'd set up first"; the funnel stages are no longer asserted ("from booking to completed assessment"); "has to come from" softened to "is best read from"; the cohorting claim now says "estimate ... once cohorts mature".
- **expert-review-agent: Needs work as a bid (accuracy Good, no outright factual error).** Applied: the same event-advice rewrite; cohorting claim corrected (cohorts give like-for-like average cost per matured cohort, and marginal cost needs stepped spend against a comparison, so a stepped-spend sentence was added); the dental sentence now carries the verified clicks-vs-conversions contrast (1,584 vs 1,087 clicks, no conversions); the personal-attributes copy sentence was CUT (table stakes for this buyer, and "common ... usually clears" reads as ADHD field experience we do not have). NOT applied: a regulator-named clause (ASA, Ahpra, TGA: search-summary level only, not opened), any Google customer-data claim (unverified), the measurement-only bridge (no pricing instrument), and anything asserting CQC/MHRA status, geo holdouts we have run, or "compliant" creative.
- **Expert's structural warning (not fixable in copy):** the draft answers completed-assessments-over-clicks and part of marginal CAC, but its only proof is $3.8K over 27 days on a US local dental account against a buyer sizing 30K to 150K a month, and it has no spend-scale or CAC-at-scale evidence. Expect a read, not a reply. Fusion Dental's spend-vs-CPL series (see Deliberately out) is the only scale-flavoured alternative and is confounded.
- Not re-run after fixes. Word count, dash, URL, name, first-person, US-spelling and figure scans re-checked by script: 348 prose words (361 with 3 headers), 2,160 characters, 0 dashes, 0 URLs, 0 names, 0 first-person "I", 0 US spellings, 1 question.

## Attachment (ruled 2026-09-27, Queenie asked "what case study should I attach?")
**Recommendation: attach nothing as things stand. The only candidate is `meta_objective_split_case_study.pdf`, after a two-line fix.**
- Why not as-is (checked today): the PDF's "One Variable, Held Clean" section says "same audience pool" and "the only difference between them was the conversion event". That is a controlled-test claim. It cannot be verified (PipeBoard is still on its free-plan weekly cap, ad-set data is not in the DB), and it contradicts this body's "not a controlled comparison". Its "budgets within about $110 of each other" is really the SPEND gap ($1,955.17 - $1,845.88 = $109.29); campaign-level `daily_budget` and `lifetime_budget` are NULL for both campaigns. What IS verified: both campaigns had start_time 2026-07-30 (seconds apart), first spend 8/3, last spend 8/31, spend within $109.29.
- The fix: heading "Same Account, Two Objectives"; setup sentence becomes "Both started on the same day, and spend ended within about $110 of each other. Each was set to a different conversion event."; drop "same audience pool" from the subtitle. Then add "The attached one-pager shows the split." to the last proof paragraph (+8 words, so trim 6 elsewhere to stay at 350). Not done: awaiting Queenie's yes, because the PDF is also attached to the UK dental Samuel draft.
- Ruled out: `integrity_naturopathic_CLEAN.pdf` (headline "$14 best CPA" is a best-keyword figure; live blended trailing-12 is about $41 and September to date is $51.05; Google, US, $2,350/mo; the PDF and live numbers are unreconciled). `Big_Chad_Law_Legal_Case_Study_(1).pdf` (legal, account ended abruptly, its spend column covers more than Google, bylined "By: Samuel Rainey" which sits badly beside "we aren't that", and its table shows cost per case rising from $858.77 to $1,169.48 as monthly spend went from $12,881 to $22,220, which this buyer will read as a marginal-CAC result). `weekly-scorecard-sample-redacted.pdf` (a weekly deliverable; our cadence is every two weeks plus a dashboard, never weekly). Perfect Parking, UrCovered, Unrefined Meal Prep, Winterbotham, Birthday Club: wrong vertical or platform.
- If the Lindsey twin is sent instead, attach nothing (its proof is Fusion Dental, which has no PDF). Send ONE profile only.

## PROPOSAL (paste below this line)

Completed ADHD assessments are health information, and both Meta and Google restrict how you can use it. If Meta classes your data source as health and wellness, it can restrict mid- and lower-funnel events, and may block custom events that could contain health information. Google's health policy can rule out remarketing lists, Customer Match and lookalikes for mental health content. So what Meta optimises toward may not be the event you're scored on, and cost per completed assessment is best read from your own booking data.

**Where we don't fit**

You're hiring one person to work inside your team, and we aren't that. Our Meta and Google specialists would run the accounts, our tracking specialist would own measurement, and our creative director would lead the creative. We also have no Australian or UK case study and no ADHD or mental health case study.

**What we'd set up first**

Keep the true funnel, from booking to completed assessment, in your own data, joined to spend by market and click week, and send each platform only what it allows, with no condition or assessment detail in event names, parameters or URLs. If deeper events are restricted, the price is a weaker signal for the algorithm. If completed assessments land weeks after the click, a spend increase can't be judged week by week, so we'd cohort by click week and estimate marginal cost per assessment once cohorts mature. To forecast a spend increase, we'd step spend up in stages and read each step against matched regions where volume allows, since platform-reported results can credit bookings that would have happened anyway.

**What we can show**

In August, two Meta campaigns for a US dental practice started the same day and spent about $3,800 between them. The engagement one took about half the budget and drew more clicks (1,584 vs 1,087) but recorded no conversions, while the leads one recorded 124. That's one account, not a controlled comparison: it shows why we count outcomes, not that an objective causes them.

Is combined monthly paid spend nearer 30K or 150K across both markets, and roughly how many days pass between a first click and a completed assessment?
