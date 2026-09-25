# Upwork Proposal - UNSENT
Job: Shopify development agency (anonymous) wants a Facebook Ads specialist to build and manage campaigns that generate qualified leads for the agency itself. Targets SMB, mid-market and enterprise ecommerce brands. "Experience driving leads for web development companies is important." Wants campaign builds, optimization, better lead quality "while keeping costs efficient", and examples of similar work, "especially campaigns for development agencies or ecommerce-focused businesses."
Profile: Samuel Rainey | Style: strategic + diagnostic (Samuel `strategic` with a diagnostic opener and a what-I'd-check body; "strategic" is Samuel-only) | Date: 2026-09-26 Manila (Postgres now() 2026-09-25 22:08 UTC = 17:08 Central)

## Screens
- Duplicate: 0 `upwork_jobs` rows. Searched job_description / job_name for "shopify development agency", "development agencies", "web development compan", "development agency", and shopify + agency + leads + facebook. Only older, different posts came back: two Google-only "software development agency" posts (2026-02-05, 2026-04-15, both unviewed) and a 2025 publishing-house post. No file in any drafts folder and no leads-index hit (grepped at start, before QC and before commit). First sighting.
- Platform: Meta only. Lindsey could sell it, but the request was strategic + diagnostic, which is Samuel-only. No twin drafted. Don't double-bid.
- Ads in scope: YES. Not white-label: the leads are for the agency's own pipeline (same shape as the OOH agency 9/16 and Mckora 8/26). No full-time or seat wording, no trial, no CRO gate, no numbered required-items list, no screening questions in the paste, no hidden AI-canary line.
- Spend: NOT stated and not foreclosed ("keeping costs efficient" signals cost sensitivity, not a number). The $5K floor is provisional. Bracket $3,000 or $10,000 straddles the floor; no incumbent agency is named, so the 9/22 above-the-floor ruling doesn't apply.
- Geo, contract type, hourly range, payment verification, client history: not in the paste, so UNSCREENED. Check the job page.
- Proof ask: soft ("important", "especially ... or ecommerce-focused businesses"), with no gate clause and no numbered list, so it does not foreclose. Development-agency lead gen = ZERO, disclosed in one line. Ecommerce-focused = presence only (several active Meta ecom brands, including Tiami on Shopify Plus). B2B selling to business owners = ReferPro.

## Verified this session
- **Meta for Developers, Conversion Leads Optimization** (fetched 2026-09-25): "The Conversion Leads performance goal is currently only compatible with Facebook/Instagram's Lead Ads (Instant Forms)." "Generate at least 200 leads per month." Stage "has a conversion rate between 1% - 40%" and "occurs within 28 days of leads being generated". Upload "at least once per day".
- **Attribution**: standard click-through is 1-day or 7-day (Business Help 460276478298895, verified 9/16 per memory). House wording kept: "standard attribution counts a click for 7 days at most".
- **ReferPro**: `case_studies` key_result verbatim, "Doubled inbound leads and ARR within 6 months post-seed funding. Used Meta for awareness and Google for demand capture to build full-funnel pipeline." `reporting_clients` Meta row churned (updated 2026-04-18), operator Lindsey B.; Google row churned, Ahmed I.; `clients.status` active. Conflicted, so relationship tense omitted. Product = referral software sold to home-service contractors. The body keeps the source's funding caveat ("of a seed round").
- **No development-agency client**: `case_studies` (28 rows) has none. `clients` sweep: Suff Digital is an SEO company (suffdigital.com title "Search Engine Optimization Company Built for Revenue"), where we ran white-label Google Ads for ITS clients, now paused. Mark My Words Marketing and Full Circle Media are agencies whose clients we run. Threadleaf Design and Duct Tape Digital are inactive with no ad rows. So the precise true line is "We haven't run lead generation for a development agency."
- **Tiami**: `reporting_clients` Meta active, operator Lindsey B. `agent_knowledge` "Ahmed - Tiami Sleep - Google Ads & Merchant Center Full Context" (updated 2026-09-22): "Shopify Plus, headless". Other active Meta ecom accounts: Myriad Traders, Nightlark, MLS Signs, Snackify, plus meal-prep accounts. Presence only, because Tiami's results are poor.
- **Attachment** `.claude/attachments/meta_objective_split_case_study.pdf`: pdfinfo 1 page, Title "Meta Objective Split Case Study | Creekside Marketing", Producer pypdf. Text scan: 0 http / www / localhost, 0 Samuel / Peterson / Rainey / Tooth strings (only "Creekside Marketing"). Figures: Engagement $1,845.88 / 0 recorded enquiries; Leads $1,955.17 / 124 / $15.77; blended $3,801.05, so Engagement = 48.6% of spend.

## Deliberately out
- **MedWriter** (live B2B SaaS on Meta): the last 30 days show only ~$2,872 across 4 campaigns, though the budget row still says $10K/mo. Its specialty campaigns had $0 spend over 90 days, and 0 conversions are recorded. Neither "$10K a month" nor "split by specialty" is true today.
- Quivr (uncitable, conversions NULL). Mark My Words and Full Circle (their clients' ads, not their own lead gen; Full Circle is a partner). Suff Digital (SEO company, white-label).
- Aura Displays (Google-only, no spend since 8/31) and every ecom ROAS/CPA number (Tiami's results are poor, and the DTC Meta shelf is unattachable).
- Big Chad Law (qualified-case accounting, but consumer legal, and the $950 vs $1,500 figures conflict).
- Any claim that Meta can't target company size or revenue. PipeBoard is at its weekly limit, so the targeting list couldn't be checked, and the draft makes no targeting-capability claim.
- The ~50-per-week learning number. "Less data per campaign" carries the tradeoff without it.
- The one-pager's $15.77 cost per lead: it would anchor a local dental CPL against a B2B sale and undercut the draft's own "judge cost per qualified call".
- Price, links, contact info, sign-off.

## Attachment
SEND WITH `.claude/attachments/meta_objective_split_case_study.pdf` (189,896 bytes, 1 page, clean per the scan above). The body says "the attached one-pager", so drop that sentence if the PDF is dropped. Why this one: it is the only clean local artifact, and it is Meta proof of the opener's thesis, that a campaign buys the event it is told to optimize for. It is a genericized local dental practice, NOT similar work by vertical, which is why the body opens that sentence with "Separately".

Alternative: the ReferPro B2B SaaS case study PDF (Drive `1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso`, Samuel byline). It is closer on audience (B2B, sold to business owners) and carries Meta lead screenshots. But it could not be re-read today because the Google Drive connector is disconnected, and the last visual check (9/20) found the Meta and Google platform icons swapped, which a design-minded dev agency would likely notice. If it replaces the one-pager, swap the last proof sentence for "That case study is attached."

## Review
- **qc-reviewer-agent: PASS WITH FIXES.** Both required fixes APPLIED. (1) The ReferPro sentence dropped the source's own funding caveat, which tightened the implied causation, so it now reads "within six months of a seed round" (QC offered "post-funding"). (2) The close named only two of the three tiers, so it now reads "whether each tier can get its own campaign". Optional, NOT applied: "Below that" → "Under 200 leads a month" (low misread risk, no word room); the opener illustrates two of three tiers (an illustrative pair, not the recommendation); "A separate, unrelated Meta account" (no room). QC confirmed 350 words incl. headers, the Meta requirements verbatim, the 7-day house wording, "about half" = 48.6%, and no em dashes, URLs, sign-off, price or contact info.
- **expert-review-agent: Good.** Mechanics confirmed: 200 leads/month, 28 days, 1-40%, and the 7-day click as the reason to optimize on the booked call. NOT APPLIED:
  - "I'd check" → "three things matter most": the 9/25 supplement QC ruled Samuel's first person fine; the ban is on naming a principal as the worker.
  - Adding the one-pager's 124 leads at $15.77: see Deliberately out.
  - ", separately," before the ReferPro result: QC's funding-caveat fix is the more honest version.
  - Front-loading the opener for preview truncation: the expert rated that claim LOW confidence, and the payoff lands inside the first ~120 characters.
- Trims to hold the ceiling: "a catch too" → "a catch"; "rises, so judge" → "rises. Judge".
- Final: 350 words incl. 3 headers (338 prose), 2,068 chars, 0 em dashes, 0 URLs, no sign-off, no price, one question.

## Open for Queenie
1. The job page isn't in the paste: contract type, hourly range ($40/hr bottom-of-range rule), payment verification (unverified = auto-DQ), where the ads would run (US/CA/UK/AU), client history.
2. Spend is unstated, so the $5K floor is provisional. The bracket "$3,000 or $10,000" straddles it. Expert note: even $10,000 may fall short of 200 leads a month once quality questions raise cost per lead, so the website-form route may be the real starting point.
3. Proof risk: the post leans on development-agency experience, and there is none in the book. The draft says so in one line and leans on the "or ecommerce-focused businesses" half. The expert rates the screen-out risk High, and no copy fixes it. Your call on spending the connects.
4. Attachment: the one-pager (default) or the ReferPro PDF (reconnect Drive to pull it; icons swapped).
5. Call prep if they reply: how Meta reaches enterprise ecommerce decision-makers (expert flag; the CRM feedback loop and lookalikes from qualified leads are the answer to rehearse, not claimed in the body). Route any reply through `sdr-agent`.
6. DB log INSERT to `upwork_proposal_logs` skipped (contractor_query can't INSERT).
7. Last question: "Roughly what do you plan to spend on Meta each month, closer to $3,000 or $10,000?" Last sentence: "That decides whether each tier can get its own campaign from the start."

## PROPOSAL (paste below this line)

To Facebook, an SMB brand that wants a theme fixed and an enterprise brand planning a move to Shopify Plus are the same lead once they fill out the same form. Left to optimize on form fills, it finds more of whichever comes cheaper, and for a Shopify development agency that is rarely the enterprise brand.

**Where lead quality usually breaks**

In a live account, I'd check three things. What the campaigns optimize for, because a form submit tells Meta nothing about which leads were worth a call. Whether SMB and enterprise share one budget and one cost-per-lead target, which hands the spend to the cheaper tier. And what the form asks. Annual revenue, current platform and timeline questions do the sorting, and the offer can too: a replatforming review for brands leaving Magento pulls different people than a free store audit.

**Feeding quality back to Meta**

Only Instant Forms can use Meta's conversion leads goal, which optimizes toward a stage you send back from your CRM, like qualified or call booked. It needs at least 200 leads a month and a stage reached within 28 days of the lead. Below that, run a website form and optimize on the booked call rather than the signed project, since standard attribution counts a click for 7 days at most. Either way, cost per lead usually rises. Judge cost per qualified call instead. Splitting tiers has a catch: less data per campaign.

**Closest examples**

We haven't run lead generation for a development agency. The closest is a software company selling to home-service business owners, where Meta built awareness, Google captured the demand that followed, and inbound leads doubled within six months of a seed round. Our team also runs Meta for several ecommerce brands, one of them on Shopify Plus. Separately, the attached one-pager shows a Meta account where one campaign, optimized for engagement, took about half the budget and recorded no leads.

Roughly what do you plan to spend on Meta each month, closer to $3,000 or $10,000? That decides whether each tier can get its own campaign from the start.
