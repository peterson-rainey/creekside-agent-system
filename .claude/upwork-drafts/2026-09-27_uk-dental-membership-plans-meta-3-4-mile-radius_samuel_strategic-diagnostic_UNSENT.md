# Upwork Proposal - UNSENT
Job: UK dental practice (anonymous, PARTIAL paste) wants Facebook + Instagram ads to drive new-patient sign-ups to tiered Dental Membership Plans (£20/mo Standard, £40/mo Smile Club, £5/mo Family Kids Plan). Target 35 new membership patients a month. "Strictly 3 to 4 miles surrounding our postcode."
Profile: Samuel Rainey | Style: strategic + diagnostic (Samuel `strategic` with a statement opener and a diagnostic body; "strategic" is Samuel-only) | Date: 2026-09-27 Manila (Postgres now() 2026-09-26 17:47 UTC = 12:47 Central)

## Screens
- Session: no device key file, so contractor mode; all SQL through `contractor_query`.
- Duplicate / twin: 0 `upwork_jobs` rows on the paste's phrases (membership plan, smile club, kids plan, membership patients, dental membership) in job_name, job_description and proposal_cover_letter. Nothing in any drafts folder or the leads index. `git log` and `ls -t` clean at start AND right before commit (a parallel session committed an unrelated Google AdWords draft meanwhile). First sighting.
- Nearby UK dental bids on DIFFERENT posts (same market, not this job): SmileCompare UK dental marketplace 9/15 (General viewed, no message; Lindsey not viewed), "UK Dental Marketing Specialist Google Ads & Meta" 2/20 (General, viewed), "Dental Ads Specialist for UK Market" 5/20 (General, not viewed), "Facebook and Google Ads specifically for dental implant campaigns?" 1/19 (Birmingham, General, viewed). Five bids, three viewed, none messaged.
- Platform: Meta only, a clean pass. Lindsey is eligible and her book IS the dental Meta book (Tooth Co, Fusion, Vida, Laleh are all hers), so a Lindsey first-person version would carry stronger proof. A bare "strategic + diagnostic" ask has resolved to Samuel on every recent Meta-only hit, so this is Samuel. No twin drafted; don't double-bid.
- Ads in scope: YES. Not white-label (no "client" language). No full-time or seat wording, no trial, no CRO gate, no numbered required-items list, no hidden AI-canary line in the paste.
- Geo: UK, inside US/CA/UK/AU.
- Spend: NOT stated. The prices (£5-£40/mo plans) plus a single 3-4 mile radius point to a small, single-site account, so the $5K floor (~£3,700) is unmeasurable here and may fail once the budget shows. Bracket used: £2,000 or £5,000, which straddles the floor (no incumbent agency named, so the 9/22 above-the-floor ruling does not apply). If the budget section reads under about £3,700/mo, the screen says SKIP.
- UNSCREENED because the paste stops short (its own numbering jumps from 1 to 3): budget, rate ($40/hr bottom-of-range rule), contract type, payment verification, hiring-location or timezone requirement (Samuel = Nashville, UK is 6 hours ahead), client history, screening questions, any required-items list.

## Verified this session (live, contractor_query)
- **Tooth Co Meta** `act_1032713196182770`: `reporting_clients` status PAUSED (row updated 2026-09-22), operator Lindsey B.; `meta_ad_accounts` name "The Tooth Co. - Veneers", currency USD. August 2026, both campaigns first spent 8/3 and last spent 8/31, 27 spend days each: `Engagement | 7/29` (objective engagement) $1,845.88 / 49,760 impressions / 1,584 clicks / no conversions recorded; `Leads 7/29` (objective leads) $1,955.17 / 26,721 / 1,087 / 124 / $15.77. Combined $3,801.05, engagement = 48.6% of spend. September = $0 on both.
- **Meta learning phase**: "about 50 results in the week after the ad set's last significant edit" (Business Help 112167992830700, primary-read 9/16 per memory note `reference_meta_lead_to_purchase_mechanics_verified`; not re-fetched today).
- **No UK dental, no membership-plan work on record**: `clients` has no UK `target_locations` on any row; the dental roster is Tooth Co, Vida, Fusion (Roseville/El Dorado Hills CA), LA Smiles (churned), Polaris (churned), Laleh; `case_studies` has no UK row; `keyword_search_all('dental membership plan')` and `agent_knowledge` returned nothing relevant. This is absence of RECORD, not proof of absence.
- **Fusion Dental** (not used in the body): Meta `act_938570599860690` churned 7/22, operator Lindsey B., AM Peterson. Apr 21 to Jul 15: $8,997.06 + $32,562.41 + $15,927.38 + $7,259.93 = $64,746.78 / 2,558 conversions / $25.31. Per active day $999.67 (Apr) to $1,206.02 (May) to $589.90 (Jun) to $484.00 (Jul).
- **Attachment** `.claude/attachments/meta_objective_split_case_study.pdf`: 1 page, Title "Meta Objective Split Case Study | Creekside Marketing", client "A local dental practice", Aug 2026, $15.77 / $30.65 / 49,760 / 49%. Text scan today: 0 hits for http, www, localhost, samuel, peterson, rainey, tooth, lindsey.

## Deliberately out
- **Fusion Dental** as proof (scale and call-center capacity, hers, churned): cut for words. Optional one-sentence add if you want more weight: "Our team also cut spend on a US dental implant practice's Meta account when its call center needed room." Never cite its Google account (built before we signed).
- Tooth Co's $15.77 in the BODY (it is in the PDF). It is a cost per ENQUIRY and would anchor a membership sign-up cost too low. Vida ($276.10 CPL), Laleh (CPA not citable), Polaris (churned, its PDF URL is HTML).
- "Veneers": the ad account is named "The Tooth Co. - Veneers", and elective cosmetic is a real gap against £20/month plans, but I could not verify the two campaigns actually promoted veneers, so the body says "a local practice's Meta account". Say it on the call if asked.
- Meta's Conversion Leads goal (Instant Forms only, 200 leads a month): unreachable at this volume, so it is not in the body.
- UK-specific claims, all UNVERIFIED and held for call prep only: NHS dentist access as a demand hook for private plans, ASA/CAP and GDC ad rules, health-data handling when member outcomes go back to Meta (send value only, no clinical detail), Conversions API / offline-event product names (Meta has renamed these before).
- Fee, links, contact info, sign-off name.

## Attachment
SEND WITH `.claude/attachments/meta_objective_split_case_study.pdf` (190,562 bytes, re-exported 2026-09-27 from the corrected HTML source; original was 189,896 bytes). Two lines were wrong and are fixed: "same budget to within a hundred dollars" is now "budgets within about $110 of each other" (actual gap $109.29, 5.9%), and "this account is active" is now "the client remains active" (the Meta account was paused 9/22; the client's Google and LSA accounts are active). Re-checked after export: 1 page, letter, title only in metadata (no browser string), 0 hits for http, www, localhost, samuel, peterson, rainey, tooth, lindsey, and a text diff against the original shows only those two lines changed. Unchanged and carried from earlier notes, not re-verified today: "same audience pool". The footer's "fewer than one in ten" was re-checked live (171 of 1,825 campaigns are engagement or video, 9.4%). The body says "The attached one-pager shows the split", so drop that sentence if the PDF is dropped. Caveat: the PDF's own headline argues the objective setting caused the split; the body deliberately does not ("one account, says nothing about membership economics"). The PDF's $15.77 is per enquiry, not per member.

## Review
- **qc-reviewer-agent round 1: PASS WITH FIXES.** Applied: the event advice contradicted the draft's own volume argument (a booked visit is a subset of an enquiry), so it now optimises the ENQUIRY and feeds back who booked and became a member; the ending now ties to the eight-a-week target; opener hedges reduced; the opener's mechanism reworded so it no longer implies a per-event signal to Meta; "small pool" made conditional on the postcode; kids-plan advice softened to "I'd also test"; trimmed to fit.
- **expert-review-agent: Good.** Applied: enquiry-not-visit; postcode-conditional radius; disclosure moved to the front of the proof paragraph and the header renamed so it stops overselling; phone-vs-online booking question added (a real dental operator point, and it decides whether a visit is trackable); the budget bracket. NOT applied: "no conversions" instead of "no enquiries" (the attached PDF says enquiries); naming veneers (unverified); the £1,500/£4,000 bracket (a £4,000 top barely clears the floor, so it stops doubling as the screen; £2,000/£5,000 was the compromise); NHS, ASA/GDC and product names (unverified).
- **qc recheck of v5: PASS WITH FIXES.** Applied: the funnel-order slip (visits are not thinner than members, so "barely better"); the implied-causation sentence replaced with "That is one account, and it says nothing about membership economics"; the opener's "drifts" made "can drift", with "counts every sign-up the same" as the reason. NOT applied: swapping "I'd" for "Our team would" in the methodology sentences (the 9/26 QC rulings hold that Samuel's first-person methodology is fine, and the ban is on naming a principal as the worker; the delivery claim in the proof paragraph is already "our team"). Left alone: leading with the adult plans lowers event volume right after arguing volume is the constraint. It is framed as a test.
- Final: 348 words incl. 3 headers (337 prose), 1,997 chars, 0 em dashes, 0 URLs, no sign-off, no price. Whitespace count; a counter that splits hyphenated words reads about 356. Two questions.

## Open for Queenie
1. **The paste is partial.** Please paste the rest before sending: budget, rate, screening questions, hiring location, any required items. Screening questions could change what is answerable (UK dental and membership-plan proof are both zero).
2. **Spend screen.** If the budget is under about £3,700/mo (~$5K), the standing screen says skip. Lead with that when you see it.
3. **Profile.** Lindsey would carry the stronger first-person dental proof. Say so if you want a `lindsey_default` twin, and I will diverge the angle (hers is native to what happens AFTER the enquiry: front-desk capacity, follow-up speed, a CRM booking check, backed by Fusion). Send ONE profile only.
4. **Disclosure sentence** "We haven't run UK dental or a membership plan." rests on absence of records, not proof. If you can check with Cade or Lindsey that no dental client ever ran a membership offer, do; cut the sentence if you would rather not volunteer it.
5. **Attachment**: default is the one-pager; drop the last sentence of paragraph 4 if you drop it.
6. DB log INSERT to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).
7. **Last question:** "Roughly what monthly ad budget are you planning, closer to £2,000 or £5,000?" **Last sentence:** "That tells me whether eight a week is a month-one target or a month-three one."
8. Call prep if they reply: route through `sdr-agent`. Rehearse the phone-booking and call-tracking answer, the kids-plan handling, and what a membership sign-up is worth over a year (take-up, cancellation, treatment attach rate).

## PROPOSAL (paste below this line)

A £5 Family Kids Plan will probably be easier to sign than a £40 Smile Club, so a campaign that counts every sign-up the same can drift toward it. The headcount can look healthy while monthly revenue barely moves, and the ad account can't see the difference unless someone records which plan each sign-up chose.

**What to optimise for**

A target in the thirties a month is about eight a week, well short of the roughly fifty results a week per ad set Meta needs to finish learning. So sign-ups are too thin to optimise on reliably, booked visits are barely better, and even enquiries may fall short. I'd start with one ad set optimising for the enquiry, then have the practice send back weekly which enquiries booked, which became members, and on which plan. Ads then get judged on cost per member and plan value, not cost per enquiry. I'd also test leading with the adult plans and offering the kids plan at the visit.

How do first visits get booked, by phone or online? If mostly phone, call tracking comes first, so bookings tie back to an ad.

**The radius**

Whether three to four miles is a small pool depends on your postcode. In a small one, frequency climbs and creative goes stale fast, so before committing to a monthly number, check the estimated audience for that circle in Ads Manager against eight members a week.

**The nearest thing we've run**

We haven't run UK dental or a membership plan. The closest is one local practice's Meta account in August: two campaigns launched the same day on roughly $3,800 between them. The engagement one took about half the budget and recorded no enquiries; the leads one recorded 124. That is one account, and it says nothing about membership economics, so I'd want your take-up and cancellation numbers before setting a month-one target. The attached one-pager shows the split.

Roughly what monthly ad budget are you planning, closer to £2,000 or £5,000? That tells me whether eight a week is a month-one target or a month-three one.
