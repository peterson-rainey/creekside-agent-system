# Upwork Proposal - UNSENT (QC round 1 + expert review applied; recheck NOT run)
Job: "Meta Ads Expert Needed - B2B Lead Gen for Painting Contractor Marketing Agency" (anonymous paste). Poster runs a marketing agency for established U.S. residential painting companies, pay-per-appointment (homeowner leads, qualified, estimates booked on the painter's calendar). NOT ongoing management: a 60-90 minute PAID audit/strategy call reviewing creative, targeting, Meta lead form/landing page, qualification, sales call, which leads became clients, which clients retained. Problem: lead quality and client retention inconsistent; does not want cheapest CPL. Budget $75-$125/hr, "open to more" if exceptionally qualified. EXPLICIT GATE: "Please only apply if you have direct experience generating B2B leads for agencies targeting contractors/home-service business owners." Five questions: niches, CPL + qualified-opportunity cost, instant forms vs landing pages, what to review before the call, one similar campaign you PERSONALLY ran.
Profile: Samuel Rainey | Style: samuel_strategic (insight opener, gap stated in the numbered answers) | Date: 2026-09-27

## Disposition
Screen said the poster's own gate is only partly met, so the recommendation was to report before drafting. Queenie asked for the draft twice ("Generate a proposal. Use the strategic version", then "paste the full draft here"), so it was drafted gap-first. **Expert verdict on v1: Weak as a bid for THIS poster (the gate filters it before the insight is weighed), Fair as writing.** Its fixes are applied in the final text; v6 was not re-rated. **Recommendation stands: skip, or send knowing the odds are low.**

## Screens
- Session: no device key file, so contractor mode; all SQL through `contractor_query`.
- Duplicate / twin: `upwork_jobs` sweep (job_name, job_description, proposal_cover_letter for painting / pay-per-appointment phrases) returned 20 rows (the query's limit). None is this post. They are bids on jobs FROM painting-company owners (Google/Facebook for a painting business), all on the General profile; the two that were viewed AND messaged: "Facebook Ads Media Buyer for US Painters" (2025-08-30) and "Fractional Marketing Manager for Local Painting Co" (2025-12-25). Drafts folders and leads index: no painting-agency post. First sighting. **UPDATE 9/27: a Lindsey twin now exists** (`2026-09-27_painting-agency-b2b-meta-audit-call-pay-per-appointment_lindsey_default_UNSENT.md`, different account, 0 header collisions, one shared 4-gram that is the poster's own phrase "cost per qualified opportunity"). Send ONE profile only; do not double-bid.
- Possible same buyer as Alex Harp (agency owner, painting + pressure washing Meta accounts, Lindsey thread)? Unlikely: he refuses calls and wanted a media buyer for his own clients. If the client's name is visible on the post, check it against that lead file before sending.
- Platform: Meta only. Lindsey is eligible on platform. **CORRECTED 9/27: "her book has zero home-service Meta accounts" (the 9/24 contractor-Meta skip premise) was true only of CONSUMER home-service accounts.** She personally operates Mark My Words Media, a marketing agency targeting fence contractors and sign businesses (signed 8/11/26, about a month old, no results); see `reference_mark_my_words_media_b2b_agency_to_contractors_account`. That is a closer audience match to the poster's gate than ReferPro (software, not an agency; its results window predates her tenure), and it is hers to claim in first person, so the Lindsey twin is the more honest fit on Q1 and Q5, though it has no results. A bare "strategic" ask still resolves to Samuel.
- Ads / economics: a standalone paid consult on the poster's OWN campaigns, no management, no spend under our control. Ruled standalone (9/22): $90/hr x capped hours, bid $90 in the rate field, never typed in the body. Posted $75-$125 clears the $40 floor. The $5K/month spend screen is unmeasurable (nothing under management).
- White-label: not fired. It is the poster's own funnel, no "our clients" delivery to us, we would be a consultant to him, not a hidden subcontractor.
- Geo: U.S. (painting companies in the U.S.), inside US/CA/UK/AU. No hidden AI-canary line, no CRO gate, no trial, no full-time seat wording.
- UNSCREENED (paste only): payment verification, client history/spend, hiring-location or timezone requirement, Upwork screening-question section beyond the five in the description, contract length.
- Required-items screen (the decisive one): Q4 fully answerable as methodology. Q1, Q2, Q5 partial (ReferPro matches the AUDIENCE, contractor owners as buyer, but the seller was software, not an agency, and not painting; no cost per qualified opportunity exists). Q3 answered only as "no controlled test". Q5 asks "personally ran".

## Verified this session (live, contractor_query, 2026-09-27)
- `upwork_jobs` schema and the sweep above.
- `clients` sweep on name/industry (painting, contractor, home services, roofing, construction, SaaS, B2B, agency, marketing): only Jybr (AI / SaaS, active) and Minnesota Pro Paintball (inactive, industry NULL). `industry` is NULL on many rows, so this is absence of RECORD, not proof of absence. No painting client, no case study.
- `case_studies` columns confirmed (`client_name, industry_key, industry_label, platforms, key_result, keywords, download_url, gdrive_file_id, summary`); the case-study rows themselves were NOT re-read today.

## From memory notes, NOT re-verified today (stamped 8/20 to 9/26)
- ReferPro: referral automation sold TO home-service contractors (its own proof asset is an HVAC company); Meta for awareness + Google for demand capture; campaign window Feb 1 to Jul 27 2025; Samuel-bylined PDF; page 2 carries two results screenshots (Google overview, Meta table incl. an "HVAC Targeting" campaign and a small "Lead form" row); our pipeline never wired the account (Meta 4 rows, $131.62, Google 0 rows), so no CPL is corroborated and there is no downstream metric; client STATUS CONFLICTED (clients row active, both reporting_clients rows churned), so no tense is asserted.
- All other trades proof (UrCovered, Perfect Parking, Landmark, LawnValue, Green Shield) is homeowner/property-owner side, mostly Google; zero citable Meta contractor result.
- Zero booked-appointment, cost-per-booked-appointment, show-rate or landing-page CRO proof anywhere in the book.

## Deliberately out
- ReferPro's NAME and every number on it (uncorroborated; the PDF carries them, the body does not).
- Big Chad Law ($1,500 per qualified case, uncorroborated, consumer legal), Perfect Parking (Google, mixed residential/commercial), Quivr (uncitable), LiveControl (never cite), Fusion / Tooth Co (dental, not this audience).
- Fee, links, contact info, sign-off name. "Personally" is not claimed: nothing on record says who ran ReferPro's Meta in the window (Cade's EOW lists it as his, Samuel bylined the PDF, Lindsey ran Meta at churn).
- Meta "higher-intent" form claim: the expert's own search could not confirm its details, so the body says only "a form with screening questions".

## Attachment
SEND WITH the ReferPro case study PDF, or delete Q2's second sentence ("The attached case study has the platform results screens."). The PDF is NOT in `.claude/attachments`; it is in gdrive_marketing (`ReferPro B2B SaaS Case Study.pdf`, downloadable from Drive). Known defects from the 9/20 note: the platform ICONS ARE SWAPPED (Meta logo beside the Google screenshot and vice versa), and its numbers are uncorroborated by our pipeline. Open page 2 before attaching. Samuel byline is correct for this profile.

## Review
- **qc-reviewer-agent round 1: PASS WITH FIXES** (against a facts pack, no DB). Applied: Q1 states the gate is not met in plain words; Q2 no longer says "results stop at the lead" (implied lead-level data we do not hold); Q5 adds "in 2025" and "about six months" (window ended ~14 months ago) and drops "delivery half" (his delivery includes qualifying and booking, we have zero booked-appointment proof); opener "tends to leave" became "has little reason to stay" (reasoning, not an observed tendency); the categorical "a better Meta funnel won't touch it" was cut; Q4 asks for "a few" recorded calls, not five each (unpaid prep on a 60-90 minute call). NOT applied: "not by me personally" in Q5 (unverifiable) and the "Lead form row" line in Q3 (PDF page not checkable from here; see Open item 3).
- **expert-review-agent: Weak-as-a-bid / Fair-as-writing.** Applied: a test to separate his two bins (compare how one lead source converts across clients in one market), a market-supply check, appointment definition and no-show terms, contracted/delivered/held/won by month with "won" from their CRM, retention split Meta vs referral, behavior-not-revenue form questions, Q3 judged upstream on booked and held calls then followed to month three, the yes/no closing question replaced with an open one, Q1 and Q5 tightened. NOT applied: naming the applicant's other proof at more length (no honest material), and the "Higher intent" form type (unconfirmed).
- Recheck of the final v6 by QC: NOT run. Changes since round 1 are QC's own wording fixes plus the expert's methodology sentences.
- Final: 396 words incl. 2 bold headers (389 prose), 2,376 chars, 0 em dashes, 0 URLs, no sign-off, no price, ONE question. Multi-question post, so the 400-word ceiling applies (strategic band is 250-350).

## Open for Queenie
1. **Skip or send.** The poster's own gate is partly unmet and the expert rates this Weak as a bid. If you send, this profile only.
2. **Attachment**, per the section above (or drop Q2's second sentence).
3. **Q3 optional line.** If page 2 of the PDF really shows a small "Lead form" row beside the other Meta campaigns, you may add: "That account's Meta screen has a small lead-form row beside its other campaigns, which is not a comparison." Do not add it unchecked.
4. **Q5 says "run by our team", not "personally".** That answers his question by omission. If Peterson personally ran any of ReferPro's Meta, say so and it becomes a stronger answer.
5. **Rate field: $90/hr** (standalone-audit ruling 9/22). Nothing about price in the body.
6. **Staleness:** the ReferPro window ended 2025-07-27; the body says "in 2025".
7. DB log INSERT to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).
8. **Last question:** "When a painter cancels, what reason do they give, and how many of their estimates were still open?" **Last sentence** (same line, it is the whole closing paragraph).
9. If he replies, route through `sdr-agent`. Rehearse: who ran the account, the lead-form vs landing-page answer, and what "held" and "won" mean in his data.

## PROPOSAL (paste below this line)

Which ad brought a painting company in may matter less to retention than whether the homeowner estimates you delivered turned into jobs for them. An owner who buys ten appointments and closes one has little reason to stay whatever the sales call promised, so the audit needs both halves: acquisition, and what your delivery did afterward.

**Your five questions**

1. One audience: home-service contractor owners as the buyer (HVAC among them), for a referral-software company. That falls short of your requirement: not painting, and not an agency selling appointments.
2. I don't have a cost per qualified opportunity or any downstream numbers for it. The attached case study has the platform results screens.
3. I haven't run a controlled test of instant forms against a landing page for contractor owners. I'd run a form with screening questions against a landing page and compare booked and held sales calls, then follow signed clients to month three. Signings alone are too few to pick a winner.
4. Per client, by month: appointments contracted, delivered, held and won, with won from their CRM, not their word. Your appointment definition and no-show terms. Retention split by Meta-sourced versus referral clients, each traced to its ad and form. Plus a few sales calls with painters who stayed, a few who left, and your qualification questions.
5. The same account, run by our team: Meta for awareness and Google for demand capture across about six months in 2025. Our other contractor work is homeowner-side lead generation, mostly Google.

**How I'd read it**

I'd sort every lost client into two bins: they never had the crews, capacity or close rate you screen for, or they did and the estimates you delivered didn't convert. To separate them, I'd compare how one lead source converts across your clients in one market: if three painters close it and one doesn't, that points to acquisition; if all four close it poorly, delivery. I'd also check that each painter's market can supply ten to fifteen held estimates a month.

On the form I'd ask for behavior, not revenue: estimates a week they can run without hiring, average job size in bands, whether they buy leads elsewhere. Owner-operators with no crew should screen themselves out, at the cost of fewer leads.

When a painter cancels, what reason do they give, and how many of their estimates were still open?
