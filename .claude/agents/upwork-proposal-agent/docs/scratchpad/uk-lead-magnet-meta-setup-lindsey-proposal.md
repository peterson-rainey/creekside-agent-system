# UK Meta/Facebook Ads specialist - lead-gen setup + first campaign (free downloadable guide)
Profile: Lindsey | Style: lindsey_default | Drafted 2026-08-31 | STATUS: SKIPPED by Queenie 2026-08-31 -- DO NOT SEND (sub-$5K auto-DQ upheld)
All figures verified live against Supabase 2026-08-31. Accounts genericized (no case_studies rows exist for either).

## PROPOSAL BODY (starts with required phrase "Slow Lane")

Slow Lane

Before the budget question: does your thank-you page exist at its own URL, or does the confirmation swap in on the same page? That one answer decides whether anyone can ever tell you which advert produced a subscriber, and it is the thing I would want settled with your developer before a single pound goes out.

I ask because I have watched the alternative twice this year, in accounts I run myself. One was a US dental group on Meta lead campaigns. Across roughly three months it took about $64,700 and returned 2,558 leads at $25.31 each. Healthy account overall. But sitting inside it were four campaigns that spent about $3,200 between them, one of them at a 9.76% click-through rate, with no conversion ever recorded against them. Strong clicks, nothing measurable behind them. That is the exact situation you are describing wanting to avoid, and it is an event-definition problem rather than a creative one.

The second is smaller and much closer to your scale. It is a dental practice I still run on a genuinely small Meta budget, about $3,760 across the last twelve months. Half of that, $1,827, sat in an engagement objective and produced no tracked leads at all. The other half, $1,934, ran on a leads objective and produced 123 of them at $15.73. Same account, same market, same period. That is not a controlled experiment, but objective choice is the first thing I look at when a small budget is not producing.

Ten-plus years in, and having built and sold my own e-commerce brand before that, the pattern I keep returning to on small budgets is that you cannot afford to test two things at once. £300 buys a read on one variable. Choosing which variable that is, before launch, is most of the job.

I have answered your five questions in full, including where I would push back on the test structure. I have attached a few relevant results, and there is a short video on my profile covering how I work accounts like this.

---
Word count: 341 (within the 350 multi-question allowance)

## SCREENING ANSWERS

**Q1. Examples of Meta lead-generation campaigns where the objective was email subscribers/leads rather than traffic or engagement.**

Straight answer first, because it matters to your brief: I do not have a published lead-magnet-to-email-list result to hand you. My Meta lead-gen work has been form-fill and enquiry lead generation for service businesses, not free-guide list building. The mechanics are the same, the buying intent is not, and I would rather you hear that from me than find it on a call.

What I do have, both accounts I ran personally:

A US dental group, Meta, three months to mid-July this year. About $64,700 spent, 2,558 leads, $25.31 average cost per lead. The two campaigns carrying most of the budget landed at $22.75 and $24.49. Everything was on a leads objective with the conversion defined as a completed form, not a click.

A dental practice I still run on a small budget, about $3,760 on Meta across the last twelve months. The leads campaign took $1,934 and returned 123 leads at $15.73.

The relevant part of both is not the cost figure, it is what sat next to it. In the larger account, four campaigns spent roughly $3,200 with no conversion recorded against them at all, one at a 9.76% click-through rate. In the smaller account, $1,827 sat in an engagement objective and returned nothing trackable. If you had judged either account on clicks or engagement you would have reached the opposite conclusion to the correct one. That is the failure mode your brief is built around avoiding, and it is why I open on the thank-you page rather than the creative.

**Q2. With approximately £300 to test a new lead magnet, how would you structure the initial test?**

I would push back on one assumption first. £300 is not a testing budget, it is a reading budget, and being honest about that changes what we build.

The arithmetic: Meta needs roughly 50 optimisation events per ad set per week to leave the learning phase and optimise honestly. If a subscriber costs £15 to £25, which is a realistic UK range for a cold audience and an unproven guide, £300 buys somewhere between twelve and twenty of them in total. That is not enough to exit learning in one ad set, let alone split across several. Any structure that divides this budget across multiple ad sets produces four unreliable numbers instead of one usable one.

So, what I would actually run:

One campaign. Leads objective, optimising for the completed signup event, never for landing page views or link clicks.

One ad set. Broad, or a single loose interest stack if broad is unworkable for your niche. No audience test at this budget. Automatic placements.

Four ads inside that one ad set, all the same offer and the same audience, differing only in hook. That is the single variable this budget can resolve. Meta's own delivery does the rotation, which is cheaper than trying to force an even split.

Pacing of £20 to £30 per day for ten to fourteen days, rather than £10 per day for a month. Daily budget below about £15 tends to produce delivery so thin the data never settles.

Nothing switched off before day five, regardless of how the first two days look.

Zero of the £300 goes to retargeting. There is no audience to retarget yet. Retargeting audiences get built during this test and spent against later.

What that honestly delivers: a believable cost per subscriber, usually one hook clearly ahead of the others, a working measurement chain, and seeded retargeting pools. What it will not deliver: a statistically clean winner, an audience answer, or a cost per subscriber stable enough to forecast from. If the number comes back workable, the second £300 is where structured testing genuinely starts.

**Q3. Own landing page or Meta Instant Forms, and why?**

Your own landing page, provided the tracking is verified before launch. Instant Forms as the fallback if your developer's build slips.

The reasoning is about what each one costs you rather than which is better.

Instant Forms will almost always report a lower cost per lead. The form loads inside Facebook, nothing depends on your site, and the email field prefills. That prefill is the problem for you specifically: prefilled addresses are whatever the person registered with Meta years ago, and a meaningful share of them are not addresses anyone still reads. For a list you intend to email repeatedly, a cheaper subscriber who never opens is worse than a dearer one who does. Instant Forms also give you far less to work with afterwards, because the traffic never reaches your site, so your pixel builds no page-level retargeting pool.

I have run both in the same account. In the dental group above, the instant-form campaigns sat around $36 to $43 per lead while the campaigns sending traffic elsewhere sat at $22 to $25. That is not a controlled comparison, they ran at different budgets over different windows, so I would not present it as proof. It is the reason I do not assume instant forms are automatically the cheap option.

The genuine argument for Instant Forms here is risk. At £300 you cannot absorb a broken landing page or a misfiring event. If your page is not verified and tested by launch day, Instant Forms remove two failure points, and I would rather run those than burn the budget diagnosing a page.

If we do use them, I would add a review step before submission rather than running pure prefill, and accept the higher cost for it.

**Q4. What tracking would I want your web developer to have in place?**

Before launch, non-negotiable:

A dedicated thank-you page at its own URL that is only reachable after a successful submission. Not a modal, not a same-page state swap. Nearly every "I cannot tell which advert worked" problem traces back to this.

The Meta pixel installed base-code across the whole site, with a single standard Lead event firing on that thank-you URL. One event, one definition, agreed in writing. Not a button-click listener, which fires whether or not the submission succeeded.

Conversions API alongside the pixel, with event_id deduplication so a single signup is not counted twice. On WordPress and Elementor this is usually the official Meta integration or a server-side setup through your tag manager. It matters more than it used to because browser-side tracking is losing a real share of events.

Hashed email and any other available customer parameters passed with the event, so event match quality is high enough for Meta to attribute properly.

Domain verification completed in your Business Portfolio, and Aggregated Event Measurement configured with the Lead event ranked first.

UTM parameters on every ad link, and the landing page capturing them into a hidden field that is stored with the subscriber record in your email platform.

That last point is the one that answers your "show me which advert generated subscribers" requirement. Meta's own reporting is a modelled estimate. The reconciliation I want to give you weekly is Meta's reported leads against the actual subscriber count in your email tool, split by campaign and by ad. Where those two numbers diverge, and by how much, is the useful information. Without the UTM capture, that reconciliation cannot be built at all, and it is the cheapest thing on this list to implement.

I would also want the pixel firing on the landing page view separately, so we have a page-view audience to retarget from day one.

**Q5. Fee for the initial setup and first test, and what it includes.**

£900, fixed, for the setup and the first campaign through to a readout. Not hourly, not a percentage of a £300 budget.

That covers: audit or build of the Business Portfolio and ad account with ownership and admin correctly in your name, not mine; pixel and Conversions API implementation checked and event-tested end to end with your developer, including the thank-you page and event definition; domain verification and Aggregated Event Measurement setup; the campaign built as described in question two, with four hooks written against your existing copy and positioning; retargeting audiences created and seeded; UTM structure and the Meta-to-email-platform reconciliation built; active management across the test window; and a written readout at the end covering cost per subscriber by hook, what I would keep, what I would kill, and what the next test should be.

Ad spend is separate and stays on your own card throughout.

I will be direct about one thing. That fee is three times the test budget, and I would rather say so than let you work it out afterwards. It is priced against the setup work, which is the same amount of work whether you spend £300 or £3,000 behind it, and you keep it permanently. If that ratio is not one you want to accept, the sensible alternative is to hold the £300 until you are ready to commit a larger test budget, and do the setup and the first meaningful test as one piece of work.

On ongoing management, if the test justifies it: I work on a percentage of ad spend rather than a retainer, and it only makes commercial sense once monthly spend is materially above where this test sits. I would rather flag that now than discover it at the point you want to scale.

---

## INTERNAL NOTES (do not send)

### VERIFIED LIVE 2026-08-31 (Supabase, contractor_query)

Fusion Dental, act_938570599860690, platform_operator Lindsey B., CHURNED 2026-07-22 (past tense, genericized as "a US dental group"):
- Account totals, meta_insights_daily joined to meta_campaigns: $64,746.78 spend / 2,558 conversions /
  $25.31 CPL / 1,901,022 impressions / 38,261 clicks / dates 2026-04-21 to 2026-07-15 (~86 days).
- Top campaigns: "Roseville Lead Gen Fusion" $27,213.66 / 1,111 conv / $24.49.
  "EDH Lead Gen Fusion - Copy" $21,611.63 / 950 conv / $22.75. "Roseville Lead Gen Spanish" $5,472.17 / 324 / $16.89.
- Instant-form campaigns: "Leads | CS | Forms Roseville | 5/19" $2,387.19 / 64 / $37.30.
  "Leads | CS | Forms Roseville | 5/4" $869.07 / 24 / $36.21. "Leads | CS | EDH | 5/4" $2,353.36 / 55 / $42.79.
  "Leads | CS | Roseville LF | 6/4" $1,584.53 / 30 / $52.82.
- ZERO-CONVERSION campaigns (spend, NULL conversions): "General Dentistry | 5/20" $1,872.15 @ 9.76% CTR;
  "Roseville | 5/27" $553.79; "EDH | 5/27" $492.89; "Spanish | 5/27" $336.34. Total $3,255.17.
  Proposal says "about $3,200" and "four campaigns" -- correct.
- CAVEAT USED IN DRAFT: instant-form vs other CPL is NOT a controlled comparison. Draft states this explicitly.

The Tooth Co, act_1032713196182770, platform_operator Lindsey B., ACTIVE (present tense, genericized):
- Account totals: $3,761.06 / 123 conv / $30.58 blended CPL / dates 2025-08-31 to 2026-08-30.
- "Leads 7/29" $1,934.47 / 123 conv / $15.73 CPL.
- "Engagement | 7/29" $1,826.59 / NULL conversions.
- Draft avoids implied causation: "That is not a controlled experiment, but objective choice is the first thing I look at."

Postgres now() = 2026-08-31 (local shell clock unreliable per standing note; harness showed 2026-09-01).

### SCREENING FLAGS FOR QUEENIE -- READ BEFORE SENDING

1. **AD SPEND AUTO-DQ, UNRESOLVED.** Total advertising budget is ~£300 (~$380), a one-off test. The standing
   auto-DQ is under $5,000/month. Lindsey's own stated floor is $3,000/month. This job is roughly 1/13th of
   the DQ line. The post also says explicitly: "rather than someone who simply wants to manage a large monthly
   ad spend." This is the least ambiguous sub-minimum job drafted to date. Drafted on request; the SKIP screen
   has NOT been cleared.

2. **PRICING INSTRUMENT IS OFF-CANON.** Percentage of spend is unusable at £300. The sanctioned carve-out for
   a capped paid test that gates management permits hourly, which Lindsey does not bill. I priced £900 fixed,
   sitting inside the $1,000-$1,500 standalone-scoped-work band at current rates. **This number is a placeholder
   for Queenie to set.** Fee-to-spend ratio is ~300%, disclosed openly in Q5 rather than hidden. Prior comparable
   flag was 60% on the Heather / Mustard Seed split, and that one was parked.

3. **PROOF GAP, DISCLOSED NOT PAPERED OVER.** Q1 asks specifically for email-subscriber lead-gen campaigns.
   There is no lead-magnet-to-email-list result anywhere in case_studies (0/28) or in the client book. All Meta
   lead-gen proof is form-fill enquiry generation for service businesses. Q1 opens by stating this plainly.
   Email/Klaviyo is a real service line but carries zero performance numbers, so it is not cited.

4. **BOTH ACCOUNTS ARE GENUINELY LINDSEY'S.** platform_operator = Lindsey B. on both, so first person is correct
   and no book-pooling attribution issue arises. Fusion Dental is churned and is written in past tense throughout.
   The Tooth Co is active and is written in present tense.

5. **NO DUPLICATE UPWORK LEAD.** upwork_leads searched for this job (Slow Lane / lead magnet / downloadable
   guide) -- zero rows. No second Creekside profile has bid it.

6. **CLEAN ON OTHER SCREENS.** Geo is UK (in-policy). Ads are in scope. Not white-label, not a competitor
   coaching job, not self-funded or profit-share, no worker-location requirement, no detection evasion,
   payment method unverified from a logged-out view and not checked. The landing page is owned by their own
   developer, so the ads-plus-landing-page-CRO screen does not fire.

7. **NOT SENT.** No contact info or URLs in the body. No sign-off name. Profile video referenced.
