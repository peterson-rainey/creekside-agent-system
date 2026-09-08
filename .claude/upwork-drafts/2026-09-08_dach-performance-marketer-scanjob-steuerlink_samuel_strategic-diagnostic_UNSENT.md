# Upwork Proposal - DACH multi-project performance marketer (scanjob.eu / steuerlink.tax)
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-08

## THIS IS THE THIRD ASK, AND THE PRIOR TWO WERE BOTH SKIPS
Trail on this posting, all in `2026-09-05_dach-performance-marketer-scanjob-steuerlink_SKIPPED.md`:
1. **2026-09-05** screened, SKIP, confirmed by Queenie.
2. **2026-09-08** re-asked as "Lindsey's strategic + diagnostic style, written in lindsey_default."
   **SKIP HELD, confirmed by Queenie a second time.** Nothing drafted. That file records a standing
   condition: *"Do not re-screen this posting unless the buyer states a US/CA/UK/AU ad market."*
3. **2026-09-08** re-asked again, this time naming the Samuel strategic + diagnostic style. Drafted.

**The buyer has NOT stated a qualifying ad market, so the standing condition is not met.** This was
drafted on the strength of a third direct request, not because the geo screen cleared. I did not see
entry 2 until after the draft was written; the file changed on disk mid-session. An earlier version
of this header claimed the geo override count went from two to three on a first re-request. That was
wrong and is corrected here: the count is unchanged pending Queenie's call, because the established
override pattern in feedback_geo_dq_us_ca_uk_au is a re-request following a *single* skip, not a
re-request following a skip the user personally re-confirmed hours earlier.

**Decide before sending, not after.** If Queenie wants the standing condition to hold, this draft
should be marked SKIPPED and the geo memory left at two overrides.

## SCREENS RUN
- **Geo (feedback_geo_dq_us_ca_uk_au): FIRES. This is the blocking DQ, overridden.** Ads run in
  Germany/DACH. steuerlink.tax is German (Steuer = tax) and tax products are jurisdictional;
  scanjob.eu is a .eu on a German host. Judged by where ads run, not HQ.
- **Employment seat (feedback_dq_full_time_employment_seat): does NOT auto-fire.** No literal
  "full time" string. Supporting tells present: Mission/Responsibilities/Requirements/KPIs
  structure, a 3+ years bar, third-person job-description voice, "in collaboration with dev/design"
  org embedding. Handled by reframing to an engagement, not by ignoring it.
- Spend: NO figure anywhere. feedback_min_ad_spend_5k UNMEASURABLE, not cleared. Asked in the close
  as a relative range per feedback_budget_ask_relative_range.
- Required items: no screening questions attached. feedback_screen_required_items_for_proof_gaps
  does not foreclose. LinkedIn is "a strong plus", not a required metric demand, so the LinkedIn
  zero caveats rather than forecloses.
- Not white-label, not profit-share, not coaching competitors, not detection-evasion, no
  worker-location demand, ads ARE in scope.
- Landing pages are advisory only ("recommend improvements, in collaboration with dev/design"), so
  reference_no_landing_page_cro_case_study does not fire. No CRO claim is made in the body.
- URL ban: no links, no calendar link, no contact info. First touch.

## VERIFIED LIVE THIS SESSION (recomputed, not recalled)
- Postgres now() = 2026-09-08T22:02Z. Local clock reads a day ahead again, same as the 9/05 screen.
- **LinkedIn = hard zero.** 0 reporting_clients rows, 0 of 28 case_studies. Distinct platforms:
  chatgpt, email, google, lsa, meta, other, programmatic, tiktok.
- **DACH = hard zero.** 0 clients with German/Europe/Berlin/Munich/Austria/Switzerland
  target_locations, 0 case_studies mentioning German or Europe.
- **Recruiting/staffing = hard zero.** 0 clients, 0 case_studies.
- **Tax/accounting: CORRECTS reference_vertical_proof_gaps.** The roster says "zero
  bookkeeping/CPA/tax/payroll rows". There IS one: `MI Tax CPA`, status=inactive, industry NULL,
  ZERO reporting_clients rows, no ad account, no budget, no notes. A never-launched name in the
  clients table, exactly the NULL-account trap in reference_clients_services_is_not_a_service_census.
  Not citable as results, which is why the body says "carrying published results".
- **ReferPro** case_studies row confirmed verbatim: industry_label SaaS, platforms {Google Ads,
  Meta Ads}, key_result "Doubled inbound leads and ARR within 6 months post-seed funding. Used Meta
  for awareness and Google for demand capture to build full-funnel pipeline." Relationship tense
  OMITTED per the conflicted-status rule; the no-CPL limitation is disclosed in the body on purpose.
- **Retirement Income Solutions dispersion, RECOMPUTED** 2026-06-01 to 2026-09-07, same leads
  objective, both accounts one owner:
  act_663740117605644  $32,610.31 / 178 conv / **$183.20 CPL** / CPM $174.93
  act_1423698879754960 $24,517.99 /  13 conv / **$1,886.00 CPL** / CPM $28.89
  Weaker account holds 42.9% of combined budget. Memory had $24,072 / $1,851.69 on a shorter
  window; the recompute moved it, which is why the rule to recompute exists. Anonymized as an
  internal comparison, never a benchmark.
- **Prospect domains, checked live.** steuerlink.tax serves a parked-domain page carrying a legacy
  Google Analytics tag (UA-59154711-35), nameservers at Porkbun. scanjob.eu presents a self-signed
  cert, A record 85.13.142.50, ns5/ns6.kasserver.com (All-Inkl, German host). Neither serves a real
  site. This is the factual basis for the opening line and it is the whole reason the draft has a
  diagnostic to make: there is no pixel history, no conversion baseline, nothing to audit.

## STRATEGIC ANGLE
The prior screen noted correctly that a pre-launch pair gives a strategic-diagnostic nothing to bite
on. The way through was to make the absence itself the diagnostic: **Search captures demand, it does
not create it, so on a product in a category nobody searches for yet, keyword research's most
important output is whether the demand exists at all** and Search may belong second rather than
first. That is caused by the prospect's own situation, covers three of their bullets at once
(keyword research, channel mix, Google Search), and needs no result we do not have.

Second beat is the budget-fragmentation argument: 2 projects x 5 surfaces is 10+ under-fed
campaigns, all permanently in learning. Third beat is the RIS dispersion card, which lands directly
on their "CPA/CPL per project" KPI by showing that cross-project CPL comparison misreads a healthy
account as broken.

## DELIBERATELY OUT
- Any fee or pricing instrument. Spend is unstated so % of spend has nothing to attach to, and
  hourly is banned (feedback_never_bill_hourly). Post asks no pricing question.
- MI Tax CPA named as tax experience. It never ran.
- Any DACH, LinkedIn, recruiting or tax RESULT. All four are zeros and all four are disclosed.
- Any certification or Google Partner claim (reference_no_certifications_exist).
- Any attachment. reference_case_study_pdf_attachability: the ReferPro PDF exists and is
  technically attachable, but it is Samuel-bylined and this draft's whole move is leading with the
  disqualifications. Offer the call instead.
- No em dashes, no links, no contact info, no sign-off name.
- Did not parrot their Mission/Responsibilities/KPI framing back at them.

## OPEN QUESTION FOR QUEENIE
Geo remains live. If they answer that spend is DACH-primary, which is nearly certain given a German
tax product, the screen is unresolved and the second touch needs a decision before it is sent.

---
## PROPOSAL (4033 characters, 713 words) — QC-corrected

Both of the domains in your posting are still dark this week, so the first useful thing to say is about sequence rather than tactics.

Search captures demand that already exists. It does not create it. For a tax product and a job product that nobody has typed into Google yet, the real question underneath keyword research is not which terms to bid on, it is whether anyone is searching in volume for the thing being sold or only for the old way of doing it. Sometimes the volume is sitting there under a competitor's category name and the plan writes itself. Sometimes the honest finding is that those searches do not exist yet, and Search becomes the second channel rather than the first, because paid social has to go make people aware the category exists before anyone can search for it.

That check is worth running per project before the channel mix gets locked, because the two products will almost certainly answer it differently. Tax sits in a category people already search for, so Search probably earns its place from day one. A job product may be inventing its own category, and those launch in the opposite order.

Our team ran that sequence for a B2B software company after a seed round: Meta for awareness on a category their buyers did not know existed, Google to capture the search demand that awareness created. The case study on file credits that structure with doubled inbound leads and doubled ARR over six months. Being straight about it, that account was never wired deeply enough into reporting for a defensible cost per lead to be reconstructed, so take it as a sequencing precedent rather than a number to hold us to.

The second thing worth settling before launch is what one budget can actually support. Both Google and Meta need a minimum volume of conversions before bidding stops guessing. Two projects across Search, Display, Shopping, Meta and LinkedIn is about ten separate places for money to go, and a budget that would train one of them properly will leave all ten stuck in learning, reporting numbers that look like performance and are closer to noise. So the first decision is not the split. It is which project goes first and which channel proves the funnel, then the rest gets funded out of what that one learns.

That matters more because per-project economics rarely land near each other. A client of ours runs two Meta accounts under one owner, same objective, same quarter. One spent $32,610 and returned 178 leads at $183 each. The other spent $24,518 and returned 13, at $1,886 each. The account that looked cheaper on media cost was the expensive one by roughly a factor of ten, and it was still holding 43 percent of the combined budget. Your two projects will not split like that. The point is that a KPI sheet comparing cost per lead across projects will call one of them broken well before that is the right read, so each needs its own target built from its own funnel instead of a shared one.

Being straight on where we do not fit, since your list covers more ground than we should claim. Creekside runs Google and Meta. There is no LinkedIn advertising anywhere in our book, no campaigns and no results to show you, so if LinkedIn is load-bearing for the B2B side then we are the wrong shop for that piece. We have never run a campaign in Germany or the wider DACH region, and there is no recruiting or accounting client in our book carrying published results either. The one tax-adjacent account we have ever signed never launched, so there is nothing to show you there. That is three gaps on one posting and they are worth weighing.

Two answers would shape the plan more than anything else. What range are you considering per project per month, and is that a ceiling or a number you would size against what it returns? And for each product, what is the event actually worth paying for, a sign-up or something further down that your team would call qualified?

Happy to get on a call and work through the search volume question for both products before anything is committed.

---
## QC PASS (qc-reviewer-agent, 2026-09-08)
Four defects raised. Three adopted, one rejected, and one adopted with a different fix.

- **ADOPTED (high).** ReferPro paragraph put the mechanism immediately before the result, which reads
  causal per feedback_no_implied_causation_juxtaposition, and the caveat only disclaimed cost per
  lead rather than the whole claim. Restructured so the number is attributed to the case study record
  and the caveat now covers it ("a sequencing precedent rather than a number to hold us to").
- **REJECTED its proposed fix for that same item.** QC wanted the body to say "$131.62 total tracked
  spend". That figure is a PIPELINE INGESTION gap, not media spend. Real contracted spend was ~$2K per
  platform at start, roughly double after month 3 per the ReferPro PDF. Publishing $131.62 to a
  prospect would understate the account by two orders of magnitude.
- **REJECTED (unsupported-claim flag).** QC called "a category their buyers did not know existed"
  an invented detail. It is verified: the ReferPro PDF, read 2026-08-26, records that Meta generated
  awareness for a category contractors did not know existed. QC only had the one-line `key_result`
  passed to it, so it could not see the PDF note. Kept.
- **ADOPTED (medium).** Cut "Our accounts are US-based". Memory supports it but it was not load-bearing
  and the DACH sentence stands without it.
- **ADOPTED (low).** "north of ten" was wrong arithmetic: 5 surfaces x 2 projects is exactly ten.
  Now "about ten".
- **ADOPTED (low), reworded.** The tax gap now names the never-launched account explicitly rather than
  leaning on the looser "carrying published results", which could be misread as never having signed one.

Passed clean: no em dashes, no links or contact info, no sign-off name, no principal named, no
certifications, no pricing instrument, budget asked as a range plus a ceiling question, RIS figures
correct and correctly anonymized.
