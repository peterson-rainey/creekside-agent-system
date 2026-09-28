# Exclusive SMS-verified residential solar leads (USA + UK), Meta media buyer, CPL — Lindsey, lindsey_default (gap-first), UNSENT

**Date:** 2026-09-28 (US Central day, confirmed via Postgres `now()`)
**Profile:** Lindsey Bouffard · **Style:** lindsey_default
**Status:** UNSENT — DRAFT ONLY. QC PASS WITH FIXES applied. Expert review NEEDS WORK items applied (verified, not genericized).

## Job summary
Lead-generation company (not the end solar installer) generating exclusive, SMS-verified residential solar leads for solar companies in the US and UK, one lead/one buyer, delivered to the buyer's CRM. Hiring a Meta media buyer, paid per accepted lead delivered (CPL) — explicitly not a retainer or day rate. Traffic can run to the buyer's own funnel or theirs. Must be available across overlapping US/UK hours, fluent English, based anywhere. Hard application gate: a 5-10 min screen-recorded walkthrough of a live solar campaign currently running; "applications without a screen recording will not be reviewed." Explicitly excludes agencies white-labeling the work out and "account managers who optimise but do not build."

## Screen (reported to Queenie before drafting; she chose "draft anyway, gaps disclosed")
- **Self-funded/profit-share pattern (feedback_dq_self_funded_profit_share.md):** CPL-only comp, "not a retainer, not a day rate," no management fee anywhere in the post. "Driving traffic to your own proven funnel (preferred)" reads as the self-funded-media tell by omission, same shape as the ClickBank/affiliate-JV skips. This screen has gone 8 skips to 2 overrides historically, and both overrides only occurred where a fee existed to counter from. Flagged as the primary reason to skip; Queenie overrode.
- **Mandatory video-only application format (feedback_screen_required_items_for_proof_gaps.md):** "Do not send a generic proposal... applications without a screen recording will not be reviewed." A text proposal does not satisfy the stated process independent of content quality. Disclosed in the draft.
- **Zero solar/energy proof, verified live 2026-09-28** via `execute_sql` against `case_studies` (0 rows matching solar/energy on client_name, industry_key, industry_label, key_result, keywords) and `industry_experience` (0 rows matching solar/energy on any column). No account in Lindsey's, Samuel's, or Cade's book to screen-record.
- **No-agencies-wanted (RED, base fit-check rule #1):** "Agencies looking to white-label this out to someone else" and "account managers who optimise but do not build" are explicitly, directly stated exclusions. Not resolved; disclosed as risk to Queenie, not addressed within the proposal itself (Lindsey applies and speaks entirely in first person, no "our team" framing used, consistent with [[feedback_lindsey_no_creekside_agency_framing]]).
- **Platform test:** Meta-only job, squarely Lindsey's scope. Passes cleanly, no partial/total platform mismatch.
- **Geo:** US + UK, both inside [[feedback_geo_dq_us_ca_uk_au]] — passes.
- **Style call:** User requested "strategic + diagnostic" then clarified "write it in lindsey_default" — resolved to lindsey_default per [[reference_upwork_proposal_styles_by_profile]] (Lindsey has one style; "strategic" is Samuel-only).
- **Twin found:** `.claude/upwork-drafts/2026-09-28_solar-leadgen-usa-uk-meta-media-buyer-cpl_samuel_strategic-diagnostic-GAPFIRST_UNSENT.md` — a Samuel strategic+diagnostic gap-first draft for the identical job, also UNSENT, also not yet QC'd/expert-reviewed as of its own file. Dual-bid is permitted per [[reference_upwork_multiple_profiles_one_job]], but per standing practice only ONE should actually be sent. Flagging to Queenie rather than deciding unilaterally. Note: the Samuel draft's own text ("day to day in Ads Manager sits with our Meta specialist; I'd be on strategy and the buyer relationship") explicitly reveals an account-manager/delegated-build structure, which is close to the exact thing this job's own exclusion clause names. Not this draft's problem to fix, but worth Queenie's attention if she compares the two.
- Case study headers do not reuse the Samuel twin's header text ("Where our book stands, plainly", "Funnel, team, and the CPL structure"), per [[feedback_upwork_proposals_bold_section_headers]].

## Proof used (verified live 2026-09-28)
- Fusion Dental Implants, Meta (`act_938570599860690`), operators Ahmed I. and Lindsey B., status CHURNED 2026-07-22. Per [[reference_fusion_dental_call_center_meta_proof]]: $20,000/mo Meta budget, Instant Form leads fed into a call center, qualifying questions deliberately added to the form to screen candidates, accepted as a CPL increase in exchange for lead quality. 90-day verified figures through 7/15/26: $64,746.78 spend, 2,558 leads, $25.31 CPL — cited as "mid-20s" (not "low 20s," corrected per QC). Not in `case_studies`, so no attachable PDF exists; the draft does not claim an attachment, offers to "walk through it" instead, per [[feedback_upwork_case_study_inclusion]]'s attachable-vs-cite-only distinction.
- TCPA/UK-consent point and the "accepted-lead signal back into Meta as an optimization event" point are general, sourced domain methodology (not tied to a specific client claim), independently arrived at and confirmed consistent with the opening insight already used in the Samuel twin draft — reworded differently here, not copied, per the no-shared-header-text principle extended to substance.
- South River Mortgage's canonical $81 CPL is NOT cited (fails live verification per [[reference_south_river_cpl_fails_verification]]). Dr. Laleh / Lux Dental Spa case study CPA figures are NOT used (Google+Meta blended, fail live verification, predate Lindsey's tenure per [[reference_laleh_meta_is_the_single_account_ceiling]]).

## Review log
- QC PASS WITH FIXES (qc-reviewer-agent): fixed "low 20s" to "mid-20s" CPL precision; added a line addressing the job's explicit "your own funnel or ours" question, previously unaddressed; softened the "I'll be straight with you" hedge into a direct opening.
- Expert review NEEDS WORK -> addressed (expert-review-agent): flagged the Fusion Dental figures as potentially unverified without DB access on its end; independently verified against [[reference_fusion_dental_call_center_meta_proof]] this session via live SQL, confirmed accurate and sourced, not fabricated or genericized. Added the TCPA/consent-copy and acceptance-signal-to-Meta points it correctly identified as missing domain signal.

---

## PROPOSAL (paste-ready draft, ~305 words, well under Upwork's 5,000 character limit)

Have you defined what counts as an accepted lead yet, or is that still getting worked out per buyer? Whatever answers that needs to come back into Meta as its own event, not just form completions. Otherwise the algorithm keeps finding people who finish the form and has no idea which ones your buyers actually kept, and CPL drifts even when volume looks fine.

**No solar in my book, here's the closest thing**

I haven't run residential solar specifically, so I don't have a live account to screen record the way you're asking for. What I have run is Meta lead gen into a CRM at real volume, same one lead, one buyer mechanics, different vertical. On a dental implant account I worked on, we fed leads straight into a call center off Instant Form ads, about 20K a month in spend. The call center could only handle so much, so we added qualifying questions to the form to screen out people who weren't real candidates. That pushed cost per lead up into the mid 20s, but it kept the leads worth someone picking up the phone for. Same tradeoff SMS verification is solving for you, paying more per accepted lead to keep the reject rate down.

**Funnel and the SMS piece**

Either funnel works for me, yours or my own if you'd rather test one. One thing worth flagging on solar specifically, the consent language on the ad and the instant form needs to match exactly what the SMS step is allowed to claim consent for, and US and UK need separate copy since the UK runs on its own marketing consent rules, not TCPA.

**Before I'd run anything**

I'd want to know who's funding the Meta ad account. I don't put my own money into spend against a per-lead payout, that puts all the downside on me if a batch gets rejected. If the media is funded separately and the CPL is what I'm paid on top of that, I'm interested given the reorder upside you mentioned.

Happy to walk through the dental account in more detail, and there's a video on my profile that covers how I work, though it won't be solar specific for the reason above.
