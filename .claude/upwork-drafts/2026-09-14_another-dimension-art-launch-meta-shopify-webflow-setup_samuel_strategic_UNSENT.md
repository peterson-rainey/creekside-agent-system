# Upwork Proposal - UNSENT
Job: Another Dimension, pre-launch online art business (premium acrylic artwork from a roster of established and emerging digital artists). Meta/Instagram marketing foundation: BM/Ads Manager audit, assets, Pixel, CAPI, Shopify purchase tracking, GA4/GTM review, Klaviyo integration, audiences, structure, testing strategy, launch, initial optimization, CAC/ROAS reporting, asset ownership, handoff/training. Stack: Shopify, Webflow, Klaviyo, Meta/IG, GA4, GTM. "Not an agency engagement or a request for a large ongoing marketing retainer", wants an "experienced individual freelancer". 8 required items. Must begin with the words "Another Dimension".
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-14 (Postgres now(), US Central; harness clock reads 9/15)
Disposition: DRAFT ANYWAY, chosen by Queenie over a recommended SKIP. Per Queenie from the job page: ad spend NOT stated anywhere; contract type HOURLY.

## SCREEN (run before drafting)

| Screen | Result |
|---|---|
| Repeat / two-profile | PASS. No upwork_jobs row, no upwork_leads row, no draft in .claude/upwork-drafts, .claude/drafts, agents/*/drafts, drafts, upwork-drafts. First sighting. |
| Ads in scope | PASS. Meta/Instagram is the core. |
| White-label | PASS. Direct brand owner. |
| No agencies / individual freelancer | FIRES, overridden. "Not an agency engagement" + "individual freelancer" + required Q8 "personally perform all of the work or outsource any portion". Proposal agent fit check red flag 1. Same two-way collision as myLawCLE (9/4) and LA luxury auto (9/11). Live cohort, posts with this wording: 119 bids, 43 viewed, 15 messaged, 5 calls, 1 won (Lindsey 12 bids, 0 messaged). Answered honestly in the body: small shop, not a solo freelancer, roles unnamed. |
| No-retainer / handoff shape | FIRES, overridden. Setup, launch, initial optimization, then training so the owner runs it. Ongoing consulting only "potential". 10 of 15 scope items run before any spend (zero-spend milestone gap). Near-twin of NextPoint Courts (8/22, drafted on override then skipped). Countered with the 90-day minimum framed as the launch window before handover. Cohort, setup/launch + training/handoff posts: 45 bids, 7 messaged, 2 calls, 1 won. |
| Hours estimate (Q7) + hourly contract | FIRES. Never bill hourly. Declined in the body, sized in elapsed time (about two weeks of setup from full access), answered with onboarding fee + % of spend + 90-day minimum. No rate typed. Cohort, "how many hours" posts: 19 bids, 2 messaged, 0 calls, 0 won. |
| Ad spend $5K floor | UNMEASURABLE, prose leans low. "Disciplined startup marketing budget", "start carefully", "begin relatively lean", plus the no-retainer line; vague conditional ramp, no figure. Queenie: not stated on the job page. Draft asks it as a bracket ($5,000 vs $20,000). Provisional, not a cleared screen. |
| Geo / payment verified | UNMEASURABLE. Not in the pasted text. Check the job page before sending. |
| Vertical proof | Fine art / artists / prints / collectibles: 0 of 28 case_studies, 0 clients. Disclosed in paragraph 2. Luxury/jewelry/art job-title cohort: 120 bids, 38 viewed, 13 messaged, 7 calls, 1 won. |
| match_proposal_context | Top score 3: Aura Displays (Google-only, 8-10x claim fails live), BDC App, ReferPro. None fits a Meta art launch. Not used, nothing attached. |

## REQUIRED ITEMS (8)

1. Meta Ads + Shopify ecommerce experience: ANSWERED, paragraph 2 (luxury furniture brand on Meta; luxury mattress brand on Shopify Plus across Meta, Google, Klaviyo).
2. High-ticket or luxury brands: ANSWERED adjacent, fine art zero disclosed first.
3. Typical budgets: ANSWERED (most live Meta accounts a few thousand a month, largest close to $100K).
4. Pixel / CAPI / conversion tracking: HALF. Opener diagnostic, dedicated conversion tracking specialist in browser + server-side GTM (verified), the event ID dedup test named, no CAPI case study said plainly.
5. Klaviyo + GA4/GTM: ANSWERED (GA4 cross-domain in the opener, in-house Klaviyo flows, zero add-to-cart events catch hedged to the record).
6. First 30 days: ANSWERED (testing structure + week-by-week).
7. Hours estimate: DECLINED as hours; sized as about two weeks of setup from full access; fee structure given.
8. Personally perform or outsource: ANSWERED honestly (not personally, stays inside our team).

## VERIFIED (contractor_query, 2026-09-14)

- Neue Maison (luxury furniture DTC, Meta, act_782415276397596, operator Lindsey B., churned 2026-08-11, "Taking in-house"): tenure window 2026-04-10 to 2026-08-10 = $105,010.24 / 343 purchases / $306.15. Monthly: Apr (from 4/10) $12,373.92 / 37 / $334.43; May $24,861.44 / 85 / $292.49; Jun $23,870.58 / 78 / $306.03; Jul $40,389.21 / 129 / $313.09; Aug $3,515.09 / 14. ROAS NOT cited (July was 59% a 50%-off promo). Unnamed in body.
- Tiami (luxury mattress, Shopify Plus per agent_knowledge 468564b1 "Ahmed - Tiami Sleep - Google Ads & Merchant Center Full Context"): reporting_clients meta ACTIVE (Lindsey B.), google ACTIVE (Ahmed Imran), email ACTIVE. Meta last 90d ~$5,377/mo avg, 4 conversions, so results NOT cited. Unnamed in body.
- Live Meta accounts, 90-day average monthly spend: Doctor Laleh $95,541 (active, spend only, CPA never cited); other active accounts MedWriter $7,639, RIS $7,050, Nightlark $7,017, Tiami $5,377, Vida $4,937, AIW $4,601, Punch Drunk $4,423, Quivr $2,698, MLS Signs $1,804, Myriad $1,548, Chris Ideson $1,395, Tooth Co $1,267, NutriPro $929. Supports "most spend a few thousand a month, largest close to $100,000".
- Book-wide Meta CPM (spend / impressions x 1000): Oct 2025 $24.45 on $207,672; Nov 2025 $33.78 on $213,933; Dec 2025 $33.90 on $199,706 (+38.2% / +38.6%). CUT from the body in review, kept here for a later touch.
- team_members: Jordan Tryon "Conversion Tracking Specialist" active; Lindsey Bouffard "Account Manager - Meta Ads" active. Roles used, names not.
- Tracking work, raw text: Fathom 1b9001f5 (Peterson + Jordan, Retirement Income Solutions): Jordan rebuilt client-side and server-side GTM containers ("about 200 changes into both containers"), server container passes GA4 events and Google Ads conversions; Meta browser + server dedup stated as being finished, completion NOT verified. Gmail 649afeb9 (2026-04-20, South River Mortgage): client developer starting Meta CAPI for Lead Submitted, Pricing Qualified and Offline Funded Deal with event_id dedup, asking Jordan for pixel ID, token and event_id format. No CAPI case study (0 of 28). Body claims only the role, browser + server-side Tag Manager, and the dedup test as a method.
- Klaviyo: agent_knowledge 13134293 (Nightlark flow rebuild, Aug 2026) raw: "Zero recent Added to Cart events returned by the events API; client should verify Klaviyo onsite tracking before relying on the cart flow." Client unnamed; body hedged to "unless the onsite tracking got fixed first".
- Pricing: onboarding $1,500 per platform including the audit (9/2 ruling); management greater of $1,500/mo or 20% of spend; 90-day minimum then month-to-month.

## GENERAL PLATFORM KNOWLEDGE IN THE DRAFT (not DB-backed; expert-review-agent confirmed each via WebSearch 2026-09-14)

- Shopify's Meta sales channel can send Purchase via Pixel and Conversions API; it does not install on external Webflow pages.
- Meta's _fbc / _fbp are first-party cookies on the landing domain; a checkout on a different registrable domain loses the click ID, leaving customer-information matching.
- GA4 needs cross-domain measurement configured on the data stream when the two sites are on different domains.
- Meta deduplicates browser and server events sharing an event name and event ID; Events Manager shows it.
- Meta learning phase: about 50 optimization events per ad set in 7 days.
- Klaviyo can sync lists/segments to Meta custom audiences.

## DELIBERATELY OUT

- Aura Displays (Google-only, 8-10x fails live), Fitness Superstore (no data), Punch Drunk 20x, Blush Camera numbers (not re-verified this session), Neue Maison ROAS, Tiami results, Laleh CPA, Q4 CPM timing (cut in review).
- South River / RIS tracking specifics (completion unverified).
- No certifications, no links, no calendar link, no contact info, no em dashes, no sign-off name, no hourly rate, no hours figure, no team member names.

## QC + EXPERT REVIEW (2026-09-14)

qc-reviewer-agent: PASS WITH FIXES, no blocking issues.
1. ACCEPTED, resolved by cut: "almost 40 percent" rounded past the verified 38.2-38.6%. Sentence removed (expert #4).
2. ACCEPTED: Klaviyo find overstated certainty against the record's "client should verify". Now conditional.
3. FLAGGED FOR QUEENIE: the job is an hourly contract and the fee structure may need the Upwork contract type changed.
4. Exact count run below.

expert-review-agent: Needs Work on offer shape, all platform claims confirmed.
1. ACCEPTED, reworded: GA4 cross-domain measurement named in the opener.
2. ACCEPTED, modified: Q7 sized as "setup runs about two weeks from full access, which is why launch lands in week three", no hours, no rate, consistent with the 30-day plan.
3. ACCEPTED: experience paragraph (Q1-3) moved to paragraph 2.
4. ACCEPTED: Q4 CPM timing sentence cut, the only sentence not answering a required item.
5. REJECTED: "Matching 'disciplined,' ... not a monthly retainer." Parrots the prospect's word and misstates the structure, since management is monthly with a 90-day minimum.
Own addition: Q4 names the dedup test (same purchase from browser and server with one event ID, Events Manager showing it counted once), method only, no past-build claim.
Offer-shape risk (fee floor + 90-day term against "not a large ongoing retainer") is policy-locked, not fixable in wording.

Length: v1 837 words / 4,702 chars. v2 792 words / 4496 chars. Above the samuel-strategic 400-word multi-question guide; 8 required items, precedents LA luxury 619 words and fine art 622 words.

## OPEN FOR QUEENIE BEFORE SENDING

- Fee paragraph states the $1,500 minimum and 90-day term against a post that says "not a large ongoing retainer". Honest, and the likeliest reason they pass.
- Job is posted HOURLY; our structure is onboarding + % of spend, so the contract type would need changing if they move forward.
- Commitments in the body: assets stay in their name with removable access, about two weeks of setup from full access, week-three launch, weekly Shopify-based report, one Meta specialist through handover, a post-90-day walkthrough. Confirm the team can deliver these.
- Whether to name the Meta specialist / tracking specialist.
- Geo and payment verification on the job page.
- DB LOG (upwork_proposal_logs INSERT): SKIPPED, contractor_query cannot INSERT.
- Attachment: none.

---

## PROPOSAL (paste-ready)

Another Dimension has Webflow and Shopify in the same stack, and that one detail decides how many of your sales Meta can actually see. Shopify's Meta integration can send the purchase from checkout through both the Pixel and the Conversions API, but it never reaches the Webflow pages, so a collector viewing a piece there needs its own tracking. If the two sit on different domains, GA4 also needs cross-domain measurement to count one visit instead of two, and the click ID from the ad stays behind on Webflow unless it's carried across. Meta then has to match the sale on customer details like email, and some sales your ads produced never get credited to them.

On experience, there is no fine art, artist or collectibles account in our book, and I'd rather you hear that first. The closest is a luxury furniture brand we ran on Meta, which spent $105,010 over four months for 343 purchases, about $306 each, before that engagement ended. We also run Meta, Google and Klaviyo for a luxury mattress brand on Shopify Plus. Most of our live Meta accounts spend a few thousand dollars a month, and the largest runs close to $100,000.

Testing has its own trap. Meta wants roughly 50 purchases a week in an ad set before it stops experimenting, and a premium piece won't get near that early, so splitting artists, messaging and audiences into separate ad sets leaves all of them stuck in learning. The first build is one purchase-optimized prospecting campaign on broad targeting, with artists and pieces tested as creative inside it, plus retargeting for people who viewed work or started checkout. It will sit in learning for a while, and switching it to optimize for add to carts tends to buy browsers rather than buyers. If you have a list of collectors you've sold to, it's the most valuable data you'll have at launch. Synced from Klaviyo into Meta, it seeds lookalikes and gets excluded from prospecting, so prospecting's cost per purchase is a new-collector CAC rather than past buyers counted again.

For the first 30 days, week one is ownership and tracking. Business Manager, ad account, Instagram, Pixel and Klaviyo stay in your name with our access removable at any time, and test orders get traced through Shopify, Meta and GA4. Week two is audiences, the build and first creative from your artists' work. Campaigns launch in week three, and the read for the rest of the month is cost per purchase and click-through by artist, not ROAS, since a handful of early sales is too few to judge. Reporting is one weekly page built from Shopify orders, covering spend, new-collector purchases, CAC and ROAS, so the numbers don't rest on what Meta chooses to credit.

Pixel, Conversions API, GA4 and Tag Manager sit with our dedicated conversion tracking specialist, who works in both browser and server-side Tag Manager. On your store the test is the same purchase arriving from browser and server with one event ID, and Events Manager showing it counted once. We don't have a Conversions API case study to hand you, so judge that part on those checks. We build Klaviyo flows in house for our ecommerce clients, and on one recent build the most useful find wasn't a flow. Klaviyo was receiving no recent add to cart events, so the abandoned cart flow would have had nothing to trigger on unless the onsite tracking got fixed first.

On hours, we don't price or bill by the hour. To size it, setup runs about two weeks from full access, which is why launch lands in week three. The audit, tracking, audiences and build are one onboarding fee of $1,500 per platform, so $1,500 for Meta, and management from launch is the greater of $1,500 a month or 20% of ad spend, with a 90-day minimum. That minimum suits a launch better than it sounds, since a handover at day 30 hands over numbers still in learning. After 90 days you can take it over with a walkthrough of how everything is built, or keep us on.

And no, I don't personally do all of it, though none of it leaves our team. We're a small shop, not a solo freelancer. One Meta specialist builds and runs your account from setup through the handover, our tracking specialist owns the tracking, and I stay on strategy. Better you know that now than after setup.

What price range will most pieces sell in, and roughly what monthly ad spend are you picturing at launch, closer to $5,000 or $20,000? Those two numbers set how many purchases Meta has to learn from each week, which decides how soon, if ever, artists can get their own ad sets.
