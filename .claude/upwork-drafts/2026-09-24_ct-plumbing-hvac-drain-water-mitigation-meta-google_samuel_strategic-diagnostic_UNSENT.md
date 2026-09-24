# Upwork Proposal - UNSENT
Job: Connecticut plumbing / HVAC / drain & sewer / water mitigation company. Meta (FB/IG) + Google Search + Google Local lead gen. Goal is phone calls and booked jobs. Expanding into water mitigation. Demands 6 answers at the top of the proposal and says "do not send a generic proposal."
Profile: Samuel Rainey | Style: samuel_strategic-diagnostic | Date: 2026-09-24 (Postgres now(); local clock read 9/25)
Length: 4,800 chars / 798 words (Upwork limit 5,000, 200 headroom)

## Screens
- Duplicate check: no draft on disk for a CT plumbing/HVAC/mitigation job. Closest priors are the 9/14 South Florida restoration and 9/22 home HVAC drafts, both different jobs, both Google-only. `upwork_jobs` duplicate check CLEARED: no row for a CT plumbing/HVAC/drain/mitigation job on either profile.
- Geo: Connecticut, US. PASS.
- Ads in scope: yes, both platforms. Direct client, not white-label. PASS.
- Employment seat: "work with long term" is retainer language, not "full time". No DQ.
- Landing pages: "Landing-page recommendations" is ONE item and is advisory only, not shared ownership of ads+LP, and there are zero CRO-gated screening questions. The ads+landing-page skip does NOT fire. Draft keeps page work to ad-to-page match and claims zero CRO results.
- Hourly: not requested. Canonical % of spend quoted.
- SPEND: unstated, and they asked US to recommend it. $5K floor unmeasurable. Recommending $7,500-$10,000 self-screens it: if they come back under $5K it is a DQ.
- Required items (6), all answerable, so no foreclosure:
  1. Count of plumbing/HVAC/restoration/home-service companies -> honest zero on the three named verticals, real categories named.
  2. Typical home-service CPL -> answerable with two real figures.
  3. Personally manage both platforms -> answered as "our team, a specialist on each" per the principals rule.
  4. Call + conversion tracking -> mechanism, writable.
  5. Starting budget -> answerable.
  6. A campaign personally improved -> UrCovered, "our team" per principals rule.
  Screenshots/case studies: "if available", soft. No screenshot library exists. One PDF attached.

## Verified live 2026-09-24 (contractor_query; google_insights_daily JOIN google_campaigns)
- Perfect Parking (acct 6775457442, ACTIVE, Google only, operator Ade A.):
  - "Search - Construction Services" 2025-11-01 to 2026-09-23: $42,460.99 / 2,434 clicks / 227.3 conv / $186.82 CPL. Body says "$187 across 227 leads since last November". MATCHES.
  - Matched slice 2025-12-10 to 2026-04-17: Search - Charlottesville $5,752.02 / 43.8 conv / $131.22 CPL vs Perf Max - Charlottesville $5,644.40 / 21 conv / $268.19 CPL, spend 1.9% apart. NOT USED in the body (see QC fix 3).
  - reporting_clients: goal_type=conversions, booked_conversion_actions=NULL. No qualified/booked stage exists on any account, which is why the tracking claim is mechanism-only.
  - LSA campaign is live but only $108.43 / 7 conv. Too thin to cite; the number is NOT in the body.
- UrCovered Construction (TN custom homes/barndominiums, Google): 15 -> 60 leads, CPL $454 -> $239. PDF re-read in full today.
- Zero plumbing, zero HVAC, zero drain/sewer, zero water mitigation/restoration in `clients`. Confirmed.
- No live google_insights rows for Landmark, LawnValue, awnings, pest or UrCovered, so only Perfect Parking is live-verifiable. Everything else is past tense.

## Deliberately NOT cited
- "Restoration24": industry_experience social_proof NAME ONLY, no client row, no account, no data. Known trap.
- TX Gutter Experts (only Meta home-service account with data): $5,567.56 / 12 conv / $463.96 CPL, churned. Would undercut the CPL figures.
- Green Shield Pest ($92.60 CPL): Track Digital white-label provenance.
- Perfect Parking case-study $127 CPL: fails live ($187/$131 depending on slice). Perfect Parking PDF NOT attached for that reason.
- Landmark $50.35 CPA / 298% ROI and LawnValue: not live-verifiable, and their URLs are HTML not PDFs.
- No certifications, no links, no sign-off name, no em dashes, no weekly cadence.

## Attachment
`.claude/attachments/urcovered_construction_CLEAN.pdf` - re-scanned in full today: 3 pages, 60 conversions / +45 vs prior / $239 CPL / down $215 (= $454), Google only. No localhost link, no URL, no persona string. Footer reads "CREEKSIDE MARKETING" (fine on the Samuel profile; body says "our team" and never names the agency).
CAUGHT ON RE-SCAN: the PDF says "the prior period", never "per month". The body's "15 to 60 a month" was an overclaim and "a month" was struck. The 9/22 HVAC draft carries the same error and should be corrected.

## QC: PASS WITH FIXES (all applied)
1. BLOCKING overclaim: "your CRM can send back qualified, booked and won" implied a track record we do not have (booked_conversion_actions NULL everywhere). Reworded to mechanism-only.
2. BLOCKING: "That write-up is attached" must be true on submission. PDF verified present and clean. QUEENIE MUST ACTUALLY ATTACH IT.
3. Data integrity: the "$130 to $240" range used Perfect Parking's Charlottesville slice as the floor and Perfect Parking's Construction slice as the named example, i.e. one client stretched into two data points. Replaced with the two real figures ($187, $239) plus an honest note that their ticket sizes differ.
4. Grammar: final comma splice fixed.
5. Optional, applied: explicit "Meta isn't getting dropped, just sequenced".

## Expert review: Good (fixes applied)
- Core emergency-vs-considered diagnostic confirmed correct for this service mix.
- Insurance framing was incomplete. Added carrier preferred-vendor networks and deductible shopping.
- "roughly 50 conversions" was inflated (that is the tROAS threshold; Max Conversions/tCPA is lower). Number DROPPED rather than swapped, since I did not verify the replacement figure myself.
- Meta read as an afterthought. Added the concrete phase-two plays.
- Confirmed: water mitigation IS an LSA-eligible category, LSA ranks above Search ads, verification takes 1-3+ weeks, and CT heating season timing is accurate for late September.
- Added: phone system must support a Google forwarding number (pre-kickoff blocker), and review count feeds LSA rank.

## Open for Queenie
1. TRACK RECORD WARNING: across roughly 25 prior plumbing, HVAC, drain, restoration and Connecticut bids in `upwork_jobs`, we have zero wins and zero sales calls. This vertical has never converted for us. Worth weighing before spending connects.
2. Spend, payment verification and client history are all unscreened; none were in the pasted post.
3. Pricing is included even though they did not ask for it, because recommending a $7,500-$10,000 spend invites the question. Cut it if you would rather hold it for the call.
4. Recommendation is Google-first with Meta in phase two. This is defensible on the merits and both reviews agreed, but it is a deliberate re-sequencing of what they asked for. Say the word if you want both platforms from day one instead.
5. The 9/22 HVAC draft's "15 -> 60 leads/mo" needs the same "per month" correction.

## PROPOSAL

Answers first, in your order.

Home-service companies advertised: home services is the largest category on our book. Pest control, lawn and landscaping, paving, construction and remodeling, awnings. Plumbing, HVAC and water mitigation specifically: zero. Better you hear that now than after a contract.

Typical cost per lead: I'd rather give you two real numbers than a blended average. The paving contractor we run now sits at $187 across 227 leads since last November. A custom home builder came in at $239. Both are bigger-ticket, longer-consideration work than a drain clear, so I'd expect your emergency lines to land below that and boiler replacement to sit nearer the top.

Both platforms: our team runs both in house, with a separate specialist on each rather than one person splitting attention. One point of contact for you.

Call and conversion tracking: yes, and one detail worth knowing before you hire anyone. A call placed straight from the ad never touches your website, so it can only be imported back into Google as a conversion if it runs through Google's own forwarding number. If the ad shows your office line, those calls cannot be matched to booked jobs later. Worth checking early that your phone setup can route through a Google number, because the measurement plan depends on it. Forms capture the Google click ID, which is what lets a CRM report qualified, booked and won back into Google as offline conversions once it is wired up, and it is worth building correctly from day one.

Recommended starting budget: $7,500 to $10,000 a month, on two services, not five.

A campaign our team improved: a Tennessee builder was running every service line in one campaign. Splitting one line into its own campaign with its own budget, bidding and negatives took leads from 15 to 60 and cost per lead from $454 to $239. That write-up is attached.

Now the part that decides whether this works.

Your five services are two different businesses inside one ad account. Water mitigation, burst pipes, drain backups and no-heat calls are emergencies. Someone is standing in water and hires whoever answers. Water heaters, boiler replacement and drain maintenance are considered purchases with weeks of thinking behind them. If both count as one "lead," bidding chases whichever is cheapest to buy, and the cheap one here is a drain clear or a tire-kicker quote, not the mitigation job that pays for the month. The dashboard improves while the job board gets worse. That is the usual reason a home-service account looks efficient and still feels dead.

So emergency work gets its own call-focused campaigns, a 24/7 schedule and a tight radius. Water damage often rides an insurance claim, which takes price out of the conversation and puts speed in front of it. Two caveats, since that's the line you're expanding into: a share of mitigation work arrives through carrier preferred-vendor networks before anyone clicks an ad, and homeowners still shop the deductible even on a covered job. I wouldn't assume every mitigation lead is price-blind. Water heaters and boilers get separate campaigns, judged on a longer window and a higher allowable cost per lead. Ad-to-page match follows the same split: a boiler replacement click should land on a boiler page with the number tappable at the top on a phone.

That split is also why I'd start on Google rather than both platforms at once. Nobody opens Instagram because their basement is flooding. Google Search and Local Services Ads are where that demand already exists. LSA sits above the regular ads and charges per lead, and mitigation is an eligible category, so license and insurance verification should start in week one because approval is not instant. Your review count feeds LSA rank and lead volume too, so that runs in parallel.

Meta isn't getting dropped, just sequenced. It earns its budget on the planned side: weather-triggered geo campaigns after a freeze or a storm when burst pipes spike, homeowner audiences and lookalikes for boiler and water heater replacement, and native lead forms for the quote-gathering crowd. Splitting a starting budget across five services and two platforms leaves every campaign short of the conversion volume Google's bidding needs to learn, so nothing becomes readable.

Heating season is the argument for starting now rather than in January. No-heat and boiler work is about to get more expensive to buy and easier to sell in Connecticut.

Our fee is a one-time $1,500 setup covering the build and tracking, then 20% of monthly ad spend with a $1,500 minimum, stepping down above $30,000.

Two questions. Which is worth more to you right now, a mitigation job or a boiler replacement? And what do you use to manage leads and jobs today, and can it store a Google click ID against each one?
