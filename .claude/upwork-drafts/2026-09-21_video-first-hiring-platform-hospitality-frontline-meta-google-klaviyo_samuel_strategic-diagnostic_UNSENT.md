# Upwork Proposal - UNSENT
Job: Video-first hiring platform (hospitality, retail, warehousing, frontline). Candidates record a 30-second video, venues watch and hire. Founded by Melbourne cafe operators, live in Melbourne + Sydney with paying venues. "First proper marketing hire": owns paid acquisition on Meta + Google (campaigns, audiences, exclusions, creative tests for venues AND job seekers), tracking (pixel, CAPI, GTM, GA4), directs Klaviyo welcome/activation/win-back flows, briefs designer + content creator, works with founders. KPIs: qualified employer leads, CPL, paying venues, completed candidate video profiles.
Profile: Samuel / General (public display name Peterson Rainey) | Style: strategic, diagnostic opener | Date: 2026-09-21 (Postgres now() 16:07 UTC = 11:07 Central)

## Screens
- Step 0 already-drafted: no hit in .claude/drafts, .claude/upwork-drafts, .claude/agents/*/drafts, docs/scratchpad, root drafts/ or upwork-drafts/ (grep video-first / 30-second video / cafe operators / video profile / hiring platform + venue/Melbourne/Sydney). upwork_jobs: 0 rows (job_description + job_name keyword sweep). First sighting. Re-grepped before QC: still no twin.
- Profile: bare "strategic + diagnostic" request, no profile named, Google-inclusive post -> Samuel. Lindsey can't pitch Google, so no twin planned.
- Full-time: the words are NOT in the post, so the auto-DQ does not fire. Seat tells present ("first proper marketing hire", "you will own", "work directly with the founders"). Every pillar is sellable (Meta, Google, tracking, Klaviyo, creative briefs), unlike Lumida (1 of 7). Handled like the 9/16 and 9/19 seat drafts: seat conceded in the body, team not one hire, % of spend not hourly.
- Spend: NOT stated. No self-described small budget, no anti-retainer prose; "paying venues and ready to grow" is mild scale signal. $5K screen UNMEASURABLE, asked in-proposal as a relative range (A$5K vs A$30K). USD $5K is about A$7.5K, so an A$5K answer is below the floor.
- Geo: ads run in Australia (Melbourne, Sydney). PASS.
- Worker location: none stated. PASS. We're US-based; draft says so in one line.
- White-label: no, direct company. Ads in scope: yes. Trial: none stated.
- Required items / screening questions: none pasted. Rate, job type (hourly vs fixed), payment verification, client history: not in the paste. UNSCREENED, check the job page.
- Proof: hiring platform / recruiting / staffing / HR-tech / hospitality = verified ZERO (0 of 28 case_studies; clients sweep 9/21 matched nothing). Australian results = ZERO (only AU client is Outback Peptides, signed 8/20, no results on record). Disclosed plainly in the body.

## Verified facts used
- case_studies (live 9/21): Birthday Club App, Meta only, "2,662 app installs and cut cost per install 47% (from $7.36 to $3.90) through campaign restructuring and systematic creative testing." reporting_clients: churned (past tense), AM Cade, operator null, so "our team". PDF cover: restaurant deals / dining rewards, restaurants pay subscription fees to be featured; audit at takeover found a traffic objective instead of installs. $3.90 is the best campaign (blended ~$5.00). No dates cited (churn date and PDF window conflict). Attachment: NONE possible (PDF 404s; Manus export unsendable).
- case_studies (live 9/21): ReferPro, Google + Meta, "Doubled inbound leads and ARR within 6 months post-seed funding. Used Meta for awareness and Google for demand capture." PDF: referral software sold to home service contractors; Meta built awareness for a category contractors didn't know existed, Google captured the resulting search demand. reporting_clients both rows churned (clients row was 'active' per 8/26 memory), so no relationship tense in the body. No spend/CPL quoted.
- team_members (live 9/21): Jordan Tryon, "Conversion Tracking Specialist", active. Named by role only.
- reporting_clients platform='email' (live 9/21): 6 active rows. Klaviyo cited as build craft only (flows mirror each other's exclusions; no results).
- Google Ads Help "About account-default conversion goals" (verified 9/14 on the Counseling For You draft): primary actions in account-default goals drive bidding in every campaign without campaign-specific goals.
- Meta learning phase ~50 optimization events per ad set per week (verified 9/16), used only as "once volume allows".
- Timezone: 5pm CDT = 8am AEST (9am AEDT after Oct 4; 10am AEDT after US clocks change Nov 1). "Our late afternoon is your morning" holds.

## Deliberately out
- Perfect Parking, Fusion Dental, Punch Drunk Chef (20x uncorroborated), Master Spa Parts (pre-tenure), Laleh CPA, South River CPL, Unrefined, CI Lifestyle, Aura, Jybr: off-shape or fail live checks.
- IVC audit finding: support requests, not job seekers; reuse ruling pending.
- Meta/Google employment special-category rules: Google's apply in US/Canada (verified 9/14); Meta's AU applicability unverified. Not used.
- No aggregate stats, years, certifications, names, links, sign-off name, em dashes.

## Attachment
- Recommended: NONE. Optional: ReferPro_B2B_SaaS_Case_Study.pdf (Drive 1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso). Page 2 carries Google + Meta screenshots, but the platform icons are swapped (Meta logo beside the Google screenshot), its numbers are uncorroborated by our pipeline, and it is bylined "Samuel Rainey" while the public profile now reads Peterson Rainey. Birthday Club has nothing attachable.

## Open for Queenie
1. Spend is unmeasurable. If the reply comes back under about A$7.5K/mo, this is the usual sub-$5K fork.
2. Rate/job type unknown. If the job is hourly, the bid still needs a rate on Upwork; the body says we bill as % of ad spend.
3. US-based line: honest and preempts the founder-collaboration question, but can be cut (Samuel identity doc: mention location only if asked).
4. DB log (upwork_proposal_logs INSERT): SKIPPED, contractor_query cannot INSERT.
5. upwork-proposal-agent errored (64K output-token limit) before producing a draft, so the main session wrote it from the same verified brief. QC + expert review below.

## Review (R1)
- qc-reviewer-agent: PASS WITH FIXES. No twin in any draft folder. Applied: restored the seed-round confound on the ReferPro result; reworded the Meta hiring-ads line as reasoning (more job seekers than owners) instead of implied track record; hedged the venue-search claim ("probably"). Length trimmed to under 400.
- expert-review-agent: Good. Opener kept. Applied: stated the Google fix (campaign-specific goals); gated the completed-video optimization on the event firing reliably at volume; added a candidate-side creative line; covered GA4 and Tag Manager by function (events defined once so pixel, CAPI and GA4 agree); trimmed the Birthday Club sentence. Rejected: "After fixing the wrong optimization target, cost per install fell" (drops the documented creative-testing cause, implied causation).
- No R2 pass. Merge changes were mechanism wording only, no new proof claims; self-checked against the verified facts above.

## Length
398 words / 2,445 characters (Samuel strategic guideline 400 max, Upwork limit 5,000). Draft path: v1 597 -> v5 413 (review version) -> v9 398.

## PROPOSAL (final)

On a two-sided hiring platform, venue ads and job-seeker ads pull in each other's audience. "Cafes hiring near me" is someone looking for a shift, while "hiring app for cafes" is an owner, so venue campaigns need job-seeker phrases as negatives, not "hiring" itself. On Meta, hiring ads find job seekers first, because there are far more of them.

If venue leads and candidate sign-ups are both primary account-level conversions, Google bids every campaign toward both, so cost per employer lead looks great while many are candidates.

Each side gets its own events, defined once in Tag Manager so the pixel, Conversions API and GA4 agree, with campaign-specific goals on Google. Venue forms screen out job seekers, candidate sign-ups are excluded from venue audiences, and qualified leads and paying venues flow back, becoming the target once volume allows. Candidate campaigns move to the completed video once it fires reliably at volume; sign-ups alone find people who never record. That gap is the activation flow's job.

Budget follows whichever side is short in each city: a venue seeing few videos rarely renews, a candidate getting no views rarely returns, and no win-back email fixes either.

Klaviyo flows get the same split and mirror each other's exclusions, so nobody gets two at once. For venues, the best creative is the product: a real 30-second candidate video. For candidates, it's someone like them recording one.

We haven't marketed a hiring platform, and have no Australian results. Our closest parallels: the consumer side of a restaurant rewards app where restaurants paid to be featured. It had been optimizing for traffic, not installs; after a restructure and creative testing, cost per install fell from $7.36 to $3.90 on the best campaign. And referral software for home service contractors: Meta built awareness of a category they didn't know existed, Google caught the resulting searches, and inbound leads and ARR doubled in the six months after their seed round. Venue owners probably aren't searching for video hiring yet either.

You'd get a team, not one hire: a media buyer per platform, our dedicated conversion tracking specialist, and one account lead for the founders and your creative team. We're US-based, so our late afternoon is your morning. We bill as a percentage of ad spend, not hourly.

Roughly what's the monthly ad budget, closer to A$5K or A$30K? The venue and candidate split depends on it.
