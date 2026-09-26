# Painting-contractor marketing agency, B2B Meta paid audit/strategy call (pay-per-appointment), $75-$125/hr | Lindsey | lindsey_default | UNSENT

- **Date drafted:** 2026-09-26 Central (Postgres `now()` 15:02 Central at session start); filename uses the 9/27 Manila date to sort beside the other 9/27 drafts
- **Profile / style:** Lindsey / `lindsey_default`
- **Status:** UNSENT. Expert review and QC rounds 1 and 2 applied; the two final trims (v5: "realistically" cut, "ran on" became "used") were checked by script only, not re-reviewed
- **Length:** 331 prose words + 18 header words = 349; 1,918 chars (band 200-300, up to 350 on a multi-question post; the header rule lets the headers ride, here they still fit under 350; Upwork cap 5,000 clear)
- **Job:** "Meta Ads Expert Needed - B2B Lead Gen for Painting Contractor Marketing Agency" (anonymous paste, job page not seen). Poster runs a marketing agency for established U.S. residential painters, pay-per-appointment. NOT ongoing management: a 60-90 minute PAID audit/strategy call over creative, targeting, lead form/funnel, qualification, sales process, which leads became clients and which retained. GATE: "only apply if you have direct experience generating B2B leads for agencies targeting contractors/home-service business owners." Five questions: niches, CPL and qualified-opportunity cost, instant forms vs landing pages, what to review before the call, one similar campaign you personally ran.
- **Twin on this job:** the Samuel strategic gap-first draft (`c52f9df5`, `2026-09-27_painting-agency-b2b-meta-audit-call-pay-per-appointment_samuel_strategic-GAPFIRST_UNSENT.md`). **SEND ONE PROFILE ONLY.** The two diverge on purpose: Samuel answers through ReferPro (referral software sold to contractors, "run by our team") with a methodology-heavy numbered answer; this one answers through Lindsey's own account and two consumer dental stories. 0 header collisions; the only shared 4-grams are the poster's own phrase "cost per qualified opportunity". The Samuel file's screen line "her book has zero home-service Meta accounts" was corrected in place (see below).
- **Prior bids on this job:** none by either profile (`upwork_jobs` sweep 9/26 by job_name, job_description and cover letter: no row for this post; the hits are other B2B posts). Not on the leads index before today.
- **Style-name note:** "Lindsey's strategic + diagnostic style ... write it in lindsey_default": the mismatch and its resolution came in one sentence, so noted here and not re-asked. `lindsey_default` IS the diagnostic style; "strategic" is Samuel-only.

## Screens
| Screen | Result |
|---|---|
| Platform test | **Pass.** Meta only. |
| The poster's gate | **Met, but only thinly, and only through ONE account.** Lindsey personally operates Mark My Words Media, a marketing agency whose Meta campaigns target fence contractors and sign businesses (see [[reference_mark_my_words_media_b2b_agency_to_contractors_account]]). It is about a month old and has no results. This CORRECTS the 9/24 contractor-Meta skip premise and the Samuel twin's screen line ("zero home-service Meta accounts in her book"): that was true of consumer accounts only, and industry is NULL on the row so a sweep cannot find it |
| Required items | Q1 answered (fence, sign; nothing else). Q2 answered as "too early / none". Q3 partial (the two dental accounts used Meta lead forms; no test against pages; the MMW form type is UNKNOWN and not claimed). Q4 answered (her best section). Q5 thin by design: one clause, no creative, targeting or offer, because the records hold none |
| Engagement shape | **Advisory-only paid call, and the post flatly forecloses management** ("not looking for ongoing campaign management"). The hourly carve-out fails condition 3 (an hourly call gates nothing). Default is SKIP; advisory-only is overridable per the 17th and 22nd rulings in `feedback_never_bill_hourly`. Queenie asked for the draft, so it was written |
| Bid record (last 270 days) | Lindsey on contractor / home-service / paint / roof / HVAC / B2B-titled posts: **31 bids, 6 viewed, 0 messaged, 0 won.** General: 284 / 75 / 15 / 0. Supports the skip recommendation |
| Ad spend $5K floor | Unmeasurable (nothing under management) |
| Geo / white-label | U.S. painters, inside US/CA/UK/AU. White-label not fired: his own funnel, we would be a consultant to him |
| NOT screened (paste only) | Payment verification, client history and spend, hiring-location or timezone requirement, screening-question section beyond the five, contract length |

## Verified live this session (contractor_query, 2026-09-26 Central)
- `reporting_clients`, every row with Lindsey as `platform_operator`: no painting, roofing, HVAC or other consumer trade account. Mark My Words Marketing: Meta, active, operator AND account manager Lindsey B., updated 2026-08-31, `act_1228742844209195`.
- `meta_campaigns` + `meta_insights_daily` for that account: `Traffic | 8/24` (traffic objective) first row 8/31, $228.63; `CS | Leads | 8/24` (leads objective) first row 9/15, $684.59; **`conversions` NULL on both**; both ACTIVE as of 9/25; every other campaign in the account is paused at $0 and predates her.
- Scope of the account: the executed services agreement (signed 8/11, three versions' AI summaries agree) is "Meta management for B2B lead generation across fence and sign verticals"; the onboarding-sheet personas are established dentists, sign manufacturers and fencing contractors. **All AI summaries: the Drive connector was invalidated and Fathom returned access denied on 9/27, so nothing was read raw.**
- ClickUp conversion-tracking thread (8/18-9/14, AI summary): lead-gen conversion tracking on the website done, GTM created, the client's CRM pipeline events empty, downstream events for Meta to be configured once the client confirmed pipeline use. The ONLY basis for the opener's "part of the build" clause; it stops at 9/14.
- **Not re-queried this session:** the Tooth Co 8/17 leads story and the Fusion Dental figures ($32,562.41 May, $15,927.38 June, both 27 active days). They come from the memory notes verified 9/26 and 9/27 ([[reference_lindsey_own_diagnostic_stories]], [[reference_fusion_dental_call_center_meta_proof]]) and were passed to QC as facts.

## Claims NOT made, and why
1. Any result, lead count or cost per lead for the fence-and-sign account: none in the records (`conversions` NULL). The body says any cost per lead is "too early to quote", which stays true if Meta's own column shows one.
2. The 9/23 sync remark that its leads "underperformed" (ONE AI summary, not raw). Confirm with Lindsey; if she confirms and wants it disclosed, add it to the Q2 sentence.
3. Instant form vs landing page for the MMW campaigns (unknown), and any offer, creative or targeting description.
4. Painting experience. The niche sentence says fence and sign are "the only niches I can name" and the ceiling analogy is hedged ("I'd expect"). The explicit sentence "I haven't run Meta for a painting company" was left OUT: the expert argued it raises a bar the poster did not set; QC round 2 preferred it or the hedge. Hedge chosen. Restore it if you would rather state it outright.
5. ReferPro (Samuel twin's proof): its Meta results window (Feb-Jul 2025) predates her tenure and its numbers are uncorroborated, so it is not hers to claim as a result.
6. Tooth Co CPL, Vida, Doctor Laleh, Neue Maison and any e-commerce proof: not this audience.
7. Any fix claim on the Tooth Co leads story (a GoHighLevel sync issue a colleague escalated). "Then found them in its CRM" is the practice's discovery, not her fix.
8. Rate, hours, "10+ years", "built and sold my own e-commerce business" (not relevant to a B2B contractor audit), the client's name, any pooled "our team" language.

## Spec deviation (intentional): NO results-attached line
The style spec wants one. No attachable artifact exists for her on this topic: ReferPro's PDF is Samuel-bylined with swapped platform icons, and the Tooth Co one-pager is consumer dental with defects (see the 9/27 home-services draft). No Mark My Words case study exists. Nothing is attached.

## Review log
- **expert-review-agent (on v1): Weak as a bid, Good as writing; recommendation REWORK, send only if the twin is out.** Applied: opener no longer confesses a plumbing gap (now a plain diagnostic hook scoped to "part of the build"), Q3 and Q5 each got a clause from what the records show, the dental story 1 now says the leads were sitting in the CRM as contacts, story 2 is tied to his capacity criterion, header made neutral, "every lead you sent" became "each homeowner lead you sent them", the closing question no longer skips months 2 and 3, the opener names "a qualified call or a booked estimate" as the events. Not applied: adding qualifying-field, territory-overlap and speed-to-first-call items (length), a proxy-event-volume argument in the body (kept as a question, since the expert's Meta mechanics were recalled from vendor pages, not Meta's own help, so no platform rule is asserted).
- **qc-reviewer-agent round 1 (on v1): PASS WITH FIXES.** Applied: "about a month old" now attaches to the account (the lead campaign is younger still), "generated B2B leads" became "Meta lead work", "sells to" became "targeting", the "sent back to Meta" claim rescoped, the dental stories labelled consumer at the point of use, "gate" out of the header, the prep list bounded to "a handful who stayed and a handful who left".
- **qc-reviewer-agent round 2 (on v3): PASS WITH FIXES.** Applied: "no cost per lead" became "any cost per lead is too early to quote" (the records cannot say none exists), the "painter's version of that ceiling" sentence hedged ("I'd expect"), the CRM-contacts observation reattributed to the practice ("the practice then found them"), "myself" dropped, "target buyers". Fusion "queue" clause cut earlier for length.
- **v5 was NOT re-run through QC.** Only two trims after round 2 (see Status); banned tokens, dashes, URLs, word count and overlap with the twin were re-checked by script.

## Open for Queenie
1. **Skip or send, and which profile.** Recommendation: skip, or send ONE knowing the odds are low. Both twins rate Weak as a bid; the shape (advisory-only, management foreclosed) is a default skip and Lindsey's record on this category is 31 bids, 0 messaged. If you send one: this Lindsey draft is the more honest fit on the poster's gate (an agency selling to contractors, hers, current) but has zero results; the Samuel draft has a Samuel-bylined ReferPro PDF with uncorroborated numbers and answers "our team", not "personally". Do NOT send both.
2. **Confirm with Lindsey before sending:** (a) that she personally runs the account day to day ("I run it"; she delegates some fulfillment to David and Aldo); (b) the lead count and cost per lead in Ads Manager for the 9/15+ campaign: if leads have arrived and a cost per lead exists, Q2 can carry it; (c) that "working that out with the agency's CRM has been part of the build" is still true (the source stops at 9/14) and whether the downstream events are wired now; (d) that the campaigns target fence and sign (not dentists) and what the lead campaign's form type is: if she knows, add it to Q3 in one clause; (e) that both campaigns are still live at send time; (f) that her profile video covers her process (the closing line asserts it); (g) whether describing the client as "a marketing agency targeting fence contractors and sign businesses" is acceptable to Cade, since it is a small niche; (h) the 9/23 "underperforming leads" remark (item 2 above).
3. **The bid field.** Posted range $75-$125/hr; her profile is $75/hr; the 9/22 standalone-audit ruling is $90/hr x a hard hour cap (a 60-90 minute call plus prep suggests capping at 2 hours), typed only in the bid field, never in the body. BUT that ruling assumed hourly gates management, and this post flatly forecloses management, so decide the number and the cap yourself. Nothing about price is in the body.
4. **Q5 and Q3 are thin on purpose.** The poster will notice that the fence-and-sign campaign is not described beyond "a traffic campaign and a lead campaign live".
5. **Likely follow-ups the records cannot answer:** what is the cost per lead and lead count; is the feedback loop wired now; which form type; and a launch that ran rough (the 8/28 sync says the wrong Instagram account was connected, the client has 20+, and Jordan fixed it with the client; the Meta report was empty at 8/31; her onboarding task sat overdue 8/13-9/16). The implant practice also churned 7/22, so "did that client stay?" has an awkward answer; the past tense in the body is deliberate.
6. **Drive is disconnected.** Reconnect it in your claude.ai connector settings if you want the agreement re-read raw. Fathom access is denied for calls 832792727 (9/23 sync) and 774077637 (8/6 discovery).
7. DB log INSERT to `upwork_proposal_logs` skipped (`contractor_query` cannot INSERT).
8. **Last question:** "Do painters who stop buying usually go in the first month or after a few months?" **Last sentence:** "There's a short video on my profile that explains my process better than text."
9. If he replies, route through `sdr-agent`. Rehearse the four gaps in item 5 first.

## PROPOSAL (paste below this line)

Does anything that happens after the form, like a qualified call or a booked estimate, get sent back to Meta, or does Meta only see that someone filled it in? I ask because working that out with the agency's CRM has been part of the build on a Meta account I run for a marketing agency targeting fence contractors and sign businesses.

**Contractor buyers, as it stands**

That account is my only Meta lead work for a business whose target buyers are contractors, so fence contractors and sign businesses are the only niches I can name. I run it, with a traffic campaign and a lead campaign live. The account is about a month old and the lead campaign younger still, so any cost per lead is too early to quote, and I have no cost per qualified opportunity or result to report yet. The two consumer dental accounts below used Meta's own lead forms, but I haven't tested forms against landing pages for contractor buyers.

**Where leads stall on dental accounts**

On one, the practice told me in August that leads had dropped. I could see over 50 people had filled out forms, and the practice then found them in its CRM as contacts, not in its pipeline. On the other, a dental implant practice whose Meta forms fed a call center, the call center couldn't handle the lead inflow, so spend fell from about $32,600 in May to about $15,900 in June. I'd expect a painter's version of that ceiling to be crews and estimators.

**What I'd look at before the call**

For a handful of painters who stayed and a handful who left: the ad and form that brought them in, the event Meta was optimizing for, what your CRM shows happened to each homeowner lead you sent them, and how many estimates they could run in a month. Plus two or three recorded qualification calls.

Do painters who stop buying usually go in the first month or after a few months?

There's a short video on my profile that explains my process better than text.
