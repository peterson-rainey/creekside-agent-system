# Upwork Proposal - UNSENT
Job: Growing national preschool organization, 40+ US locations, each serving its own local market. Google Ads consultant to manage, optimize and improve; "strategic partner" to audit the account, identify opportunities, improve performance and explain what drives qualified leads and enrollments. Needs PPC plus local lead gen, multi-location campaigns and conversion-focused marketing.
Profile: Samuel Rainey | Style: strategic + diagnostic (Samuel `strategic` with a diagnostic opener; a bare "strategic + diagnostic" with no profile named resolves to Samuel, and the post is Google-only) | Date: 2026-09-26 Manila (Postgres now() 2026-09-25 20:07 UTC = 15:07 Central)

## Screens
- Duplicate: 0 `upwork_jobs` rows (job_name + job_description searched for "preschool", "40+ locations", "national preschool", "multi-location campaigns"; only older multi-location fitness / digital-marketer posts came back, different text). No file in any drafts folder, grepped at start, before QC and before commit. The only "preschool" hits on disk are the 9/2 single-campus childcare Meta video job, a different post. First sighting.
- Platform: Google only, so Samuel. Lindsey can't sell Google, so no twin.
- Ads in scope: YES. No full-time wording ("consultant", "strategic partner"). No trial, no required-items list, no screening questions, no CRO gate, no evasion language. Not white-label ("our account").
- Geo: US ("40+ locations across the U.S."). Pass.
- Spend: NOT stated, not foreclosed. 40+ locations makes sub-$5K unlikely. Asked as a bracket, $20,000 or $80,000 (about $500 vs $2,000 per school), tied to the structure decision.
- Contract type, hourly range, payment verification, client history: not in the paste, so UNSCREENED. Check the job page ($40/hr bottom-of-range rule; if hourly, % of spend still applies and no rate is ever typed).
- Vertical: ZERO preschool / childcare / daycare clients or case studies (ENLA Learning never closed; Adventures in Wisdom is Meta-only, adults buying a certification, presence-only). The post doesn't ask for vertical proof, so no disclosure and no claim.
- Multi-location: no current Google account anywhere near 40 locations (live book, last 365 days: South River churned, Laleh, Aura paused, Perfect Parking, Tooth Co, all single-market). The post asks for "understanding" of multi-location campaigns, which the body shows through mechanics. Proof = Luggage Drop 30+ US locations (structure only) + Winterbotham geo split.

## Verified this session
- **Winterbotham Parham Teeple** (CLEAN PDF text read 2026-09-26): bankruptcy firm, Google Ads, "Key Market: Orange County, CA". Strategy: four segments incl. "a dedicated Orange County-only campaign to test geo-specific performance. Budget was reallocated toward the highest-converting markets and keywords". Results: 229 conversions "Up from 117", $50.29 "Down from $86.09" (also labelled "Cost Per Bankruptcy Lead"), $11.5K spend "Only $1.44K more than the prior period". Not in `clients` / `reporting_clients`, so past tense and no operator claim.
- **Luggage Drop** (`case_studies` row, verbatim): Google Ads, "Drove 1,050 bookings at $2.44 per purchase across 30+ US locations using a dual national/local targeting strategy." INACTIVE, Track Digital white-label, so unnamed, past tense, no number cited. PDF not read (Google Drive connector disconnected this session) and not attached.
- **Google Ads Help 2732132** (fetched today): location bid adjustments unsupported under Target CPA, Target ROAS, Maximize conversions, Maximize conversion value; Performance Max supports no bid adjustments.
- **Help 15081888** (fetched today): "Offline conversions that were uploaded more than 90 days after the associated last click won't be imported into Google Ads" (63 days for enhanced conversions for leads).
- **Help 6263072 / 6263058** (fetched today): portfolio = "groups together multiple campaigns, ad groups, and keywords"; not available for Performance Max; shared budgets are best practice, not required. The body claims no data pooling, only "sits between the two".
- **Help 13020501** (fetched today): learning duration depends on "the number of conversions that your campaigns ... obtain"; "a few conversion cycles (1-2 typically)". The "up to around 50 conversions" line in memory is no longer on the page, so the body cites no number (memory corrected).

## Deliberately out
- Any preschool, childcare or education claim, and Adventures in Wisdom.
- Perfect Parking Search vs PMax (strong local lead-gen proof, but the argument here is location structure + conversion signal; alternate if Queenie wants a third proof).
- Advanced Med Spa, 3 locations, "saved a struggling 3rd location" (inactive, no live data, PDF blocked by the Samuel byline and "Peterson" chart label).
- Calls from ads only count through a Google forwarding number (verified 9/16). Cut for length, good follow-up material.
- Luggage Drop's $2.44 per booking (travel economics, misleading next to enrollment costs).
- Price, links, contact info, sign-off.

## Attachment
SEND WITH `.claude/attachments/winterbotham_parham_teeple_CLEAN.pdf` (785KB, 3 pages, re-checked 2026-09-26: 0 localhost, 0 URLs, 0 Samuel / Peterson / Rainey strings; title metadata "Winterbotham Parham Teeple Case Study | Creekside Marketing"). Body says "That case study is attached." Drop that sentence if the PDF is dropped. Why this one: its strategy is a geo split plus budget moved to the markets that converted, the closest documented analog to steering budget school by school.

## Review
- qc-reviewer-agent: **PASS**, no required fixes; every number traced to source, word count confirmed. Optional fix APPLIED: "markets that converted" to "markets and keywords that converted" (source wording; only one of the four segments was geographic).
- expert-review-agent: **Good**; mechanics confirmed (Smart Bidding spend behavior, location adjustments, 90-day import, tour as the optimization step). APPLIED: seasonality tie-in ("a family that joins a fall waitlist in spring"); proof transition fixed by opening the paragraph on the bankruptcy firm and moving the booking service to "Our team also ran", so the two accounts read as separate. NOT APPLIED: "30+ US markets" / "booking network" (the source says locations; markets would overstate). Bracket: called well placed; suggested $30,000 as a tighter floor (left for Queenie).
- Final: 346 words incl. 3 headers (332 prose), 2,051 chars, 0 em dashes, 0 URLs, no sign-off, no price, one question.

## Open for Queenie
1. Contract type, rate range, payment verification and client history aren't in the paste. Check the job page.
2. Spend bracket "$20,000 or $80,000". Expert suggested $30,000 as the low anchor.
3. Attach the Winterbotham CLEAN PDF.
4. DB log INSERT to `upwork_proposal_logs` skipped (contractor_query can't INSERT).
5. Last question = last-but-one sentence: "Roughly what does the account spend a month across all locations, closer to $20,000 or $80,000?" Last sentence: "Spread across 40+ schools, that number decides how much can run school by school before each campaign's data gets too thin to learn from."

## PROPOSAL (paste below this line)

A preschool with a waitlist and one with empty classrooms can post the same cost per lead. Across 40+ locations, an account-wide average hides which is which, and Google Ads has no idea which schools have seats to fill.

**Where the budget goes**

That makes structure the first thing to check. One campaign covering many schools gives Smart Bidding plenty of data, but it spends wherever inquiries come cheapest, which can mean the schools that are already full. Location bid adjustments won't redirect it, because Smart Bidding doesn't support them. A campaign per school lets budget follow open seats, but each campaign has far fewer conversions to learn from. Grouping schools by market, or running school campaigns under one portfolio bid strategy, sits between the two.

**What counts as a qualified lead**

Then the conversion itself. If the account counts a form fill or a call, Smart Bidding gets better at finding inquiries and never sees which families toured or enrolled. Tours and enrollments can be sent back from the enrollment system, with one limit: Google won't import an offline conversion uploaded more than 90 days after the click, and a family that joins a fall waitlist in spring can take longer than that. A booked tour sits much closer to the click, which often makes it the better step to optimize toward, with enrollments still tracked school by school in your own system.

**Closest work to this**

A bankruptcy firm in Orange County went from 117 leads to 229, and cost per lead fell from $86.09 to $50.29 on about $1,400 more spend, after one market got its own campaign and budget moved toward the markets and keywords that converted. That case study is attached. Our team also ran Google Ads for a booking service across 30+ US locations, using national and local targeting together.

Roughly what does the account spend a month across all locations, closer to $20,000 or $80,000? Spread across 40+ schools, that number decides how much can run school by school before each campaign's data gets too thin to learn from.
