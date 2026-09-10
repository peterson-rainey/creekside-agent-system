# Digital Marketing & Lead Generation Specialist (GTM/GA4 + Google, Meta, LinkedIn, YouTube, B2B/SaaS preferred)
Profile: Samuel Rainey | Style: strategic | Status: UNSENT
Drafted 2026-09-11 user local (GMT+8). Postgres now() = 2026-09-10T20:32Z.

## Screen
- Ads in scope: YES (Google, Meta, YouTube, remarketing, LinkedIn; plus GTM/GA4 tracking as part of management)
- Spend: UNSTATED, and they ask us to recommend allocation. Prose does not foreclose it. $5K DQ does not fire.
- Geo: NOT STATED. Unresolved, not a DQ.
- Full-time seat / white-label / hourly / coaching competitors / self-funded / worker-location: none fire.
- Duplicate bid: none. Closest in upwork_jobs is "B2B Lead Generation Specialist | LinkedIn, Meta & Google Ads" (Lindsey, 9/9), a different title. Worth an eyeball in Upwork that it is not the same client reposting.

## Required items
"Share 2-3 examples: industry, channels, approximate budget, results." Answerable with 2 numbered examples + 1 shape-only B2B example.
Gaps conceded in body: zero LinkedIn Ads. B2B SaaS engagement has no citable number.

## Proof used (verified sources)
- Fusion Dental Implants (unnamed): Meta lead forms into call center, $20K/mo budget, 90d to 7/15/26 $64,746.78 / 2,558 leads / $25.31 CPL; 30d English $22.79 vs Spanish $12.99. CHURNED 7/22/26, so past tense.
- Perfect Parking Asphalt (unnamed): Google, $8K/mo, ACTIVE. Charlottesville time-matched Search $131.22 CPL vs PMax $289.38 CPL, PMax CPC 5.4x cheaper. PDF verified real.
- ReferPro (unnamed): shape only, no figure (meta data does not back the case_studies claim).
- Not used: Big Chad Law ($1,500/case uncorroborated), Green Shield (white-label, unverifiable), South River ($81 CPL fails verification), BDC App.

## Attachment
`.claude/attachments/Perfect_Parking_Asphalt_case_study.pdf`

## Not done
- upwork_proposal_logs INSERT skipped: contractor_query cannot INSERT.

## PROPOSAL

Fake and junk leads usually trace back to the conversion setup, not the targeting. If Google Ads counts every form submit as a conversion, Smart Bidding goes out and buys more form submits, and bots and tire-kickers are the cheapest ones to find. So the tracking audit and the lead quality problem are really the same job.

How we'd build it: GTM and GA4 first, with forms, calls and enquiries set up as separate conversion actions. Then a qualification step in your CRM, and that status gets sent back to Google as an offline conversion and to Meta through the Conversions API. Until the platforms can see which leads your sales team actually accepted, they're optimizing for volume no matter what the report says. Spam gets handled at the form as well, with honeypot fields, server-side validation, and junk submissions kept out of the conversion count so they never train the bidding.

On channels, for B2B software I'd start with Google Search on the tightest buying-intent terms, since it's the one channel where the prospect has already told you they're looking. Meta and YouTube come next as remarketing to people who've been to the site, then cold prospecting once there's a qualified cost per lead to measure against. We haven't run LinkedIn Ads, so I won't pretend otherwise. I'd add it last, once Search gives you a qualified-lead cost to judge it by.

A few examples, as you asked.

Dental implant practice, Meta lead forms feeding a call center, around $20K/month budget. Over 90 days it produced 2,558 leads at $25.31 each, and splitting by language showed Spanish-language leads at $12.99 against $22.79 for English.

Asphalt paving contractor, Google Ads, $8K/month. In one market we ran Search and Performance Max side by side on nearly identical spend. Performance Max clicks were 5.4x cheaper, but its leads cost $289 against $131 on Search. A click-focused report would have backed the wrong campaign. Case study attached.

B2B software company, Meta for awareness and Google to capture the demand it created. That engagement ended without a clean acquisition-cost figure, so I won't put a number beside it.

Two things would shape the plan: roughly where your monthly ad budget sits, and whether any of it is running today. And how your sales team currently decides a lead is qualified, since that definition is what everything above optimizes toward.

Happy to walk through the tracking plan on a quick call.
