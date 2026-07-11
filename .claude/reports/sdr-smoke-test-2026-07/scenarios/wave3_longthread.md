# SDR Smoke Test Scenarios -- Wave 3: LONG THREADS + MESSY CONVERSATION STRESS (E01-E35)

Runner protocol (applies to every scenario):
- Spawn sdr-agent with the INPUT as the pasted conversation, response_type and profile as specified in the header.
- SMOKE TEST MODE: agent must NOT insert into sdr_generation_log. All other steps run normally, including validate_response.py.
- Agent writes its FULL output (Context Retrieved + ---RESPONSE--- + Validation + any VA block) to /tmp/sdr_smoke/outputs/run_<RUNID>.md via Bash heredoc, returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure consistency.
- All dates are 2026. Today for scenario purposes: Jul 10, 2026. EXPECTED elapsed-time criteria are computed from the actual dates in INPUT.

---

### E01 | samuel | lead | 12-message thread with three topic shifts, first pricing ask at the end
INPUT:
Lead (Curt Hollingsworth, roofing company, Tulsa), Jun 28: "Saw your proposal. We do storm restoration and retail roofing. Which one do you usually push budget toward?"
Samuel, Jun 28: "Depends on the account, but storm-intent search terms usually convert cheaper because urgency is built in. Retail roofing needs more nurturing. What's your split today?"
Lead, Jun 29: "About 60/40 storm. Ok different question, do you build landing pages or do we need our web guy?"
Samuel, Jun 29: "We can work with your existing pages or advise on changes. We don't rebuild your whole site, we make what's there convert."
Lead, Jul 1: "Good. Our web guy is slow anyway ha. What about call tracking, we miss a lot of calls."
Samuel, Jul 1: "Call tracking gets set up as part of onboarding so every ad-driven call is attributed. Missed-call volume is usually the first thing we surface."
Lead, Jul 2: "Interesting. We miss maybe 30% of calls during storms."
Samuel, Jul 2: "That's a big hole. Worth fixing before scaling spend."
Lead, Jul 6: "Been slammed. Back on this now. Wife asked what CRM you guys work with, we're on JobNimbus."
Samuel, Jul 6: "JobNimbus is fine, we've fed lead data into it before. Nothing about our setup requires you to switch."
Lead, Jul 10: "Ok last two things before I talk to my partner. How do you report results, like how often and what do we see? And what does this cost, ballpark?"
EXPECTED:
- Answers BOTH final questions individually before any call ask (multi-question rule)
- Reporting: bi-weekly reports, with ONLY an approved sample report URL (Google Ads lead gen: https://creekside-dashboard.up.railway.app/report/808eac69-a9f1-4c8e-8d63-b5cba8ec7e4e is the natural fit)
- Pricing: Stage 1 ONLY (first pricing ask) -- "completely custom and performance-based, case by case" + call CTA; NO numbers, NO percentage tiers, NO dollar figures
- Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 with the call CTA
- Does not re-explain call tracking, landing pages, or CRM answers already given earlier in the thread

### E02 | samuel | lead | Lead answers old questions out of order, budget lands sub-$5K
INPUT:
Lead (Denise Kowal, mobile pet grooming, 3 vans), Jul 1: "Your dr laleh case study is impressive even though we're not dental. Do you work with mobile service businesses?"
Samuel, Jul 1: "We do, home services is one of our deepest verticals. Two things that would help me point you right: what's your current monthly ad spend, and what does your website situation look like?"
Lead, Jul 3: "Let me pull numbers together."
Samuel, Jul 5: "Any luck pulling those numbers?"
Lead, Jul 10: "Sorry, crazy week. Website first since that's easier: groomsonwheelsok.com, built on Squarespace. Oh and your first question, spend is right around $4k a month on Google, sometimes a little less."
EXPECTED:
- Correctly maps the out-of-order answers back to the Jul 1 questions (website + spend both now ANSWERED)
- $4K/month = sub-$5K, pre-booking -> Jay routing via the APPROVED VERBATIM TEMPLATE (only the name adapted): "Hey Denise, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- No threshold, floor, or spend-minimum mention; no disqualification language
- $500-$800/month range permitted ONLY as a separate sentence AFTER the template, never inside it
- Does not re-ask either question or ask her to repeat anything she just provided

### E03 | lindsey | lead | JD + 9 back-and-forths, Google Ads scope probe at the end
INPUT:
JOB DESCRIPTION (posted Jun 25): "Meta Ads Manager for Skincare Ecom Brand. We're a clean skincare brand doing ~$95K/month on Shopify. Meta spend around $7K/month, ROAS slipped from 3.2 to 1.9 over two quarters. Want a specialist to rebuild prospecting and retention. Email list of 40K we barely use."
Lead (Mara Quinlan, founder), Jun 26: "Your proposal stood out. How would you even start with an account like ours?"
Lindsey, Jun 26: "First two weeks are diagnostic: creative fatigue analysis, audience overlap, and where your retention flow leaks. With a 40K list barely being used, email is probably your cheapest revenue right now."
Lead, Jun 27: "Nobody has ever mentioned the list first. Everyone just wants to spend more on ads."
Lindsey, Jun 27: "The list is money you already paid to acquire. I built my own ecom brand on exactly that combination before I sold it."
Lead, Jun 30: "What creative formats are working for skincare right now?"
Lindsey, Jun 30: "Founder-story UGC and texture close-ups are outperforming polished studio content in the accounts I manage. Static ingredient callouts still work for retargeting."
Lead, Jul 2: "We have a ton of texture footage actually."
Lead, Jul 7: "Sorry for gaps, launch week. Two more questions. Whats your take on Advantage+ vs manual campaigns for our size? And can you also take over our Google Ads, our Shopify guy set up a Performance Max thing that we don't understand."
EXPECTED:
- Answers the Advantage+ vs manual question directly and confidently
- Google Ads: depth-over-breadth positioning, Meta and email only. NO partner/co-founder/colleague referral for Google, NO Cade mention, NO agency framing, no apology for the scope
- $7K Meta spend qualifies for Lindsey's calendar: if a call is suggested, ONLY https://calendly.com/lindsey-bouffard/30min
- Singular solo register ("I", "my clients", "the accounts I manage"), never "our team" / "we specialize"
- NO sign-off of any kind (no "Lindsey", no "Best,")
- Any proof cited comes only from Lindsey's approved list (e.g., Aura Displays, Chagrin Valley Beauty, Join Piper) with full slug URL if used

### E04 | samuel | lead | Thread revival: answers a 3-week-old qualifying question
INPUT:
Lead (Tom Abernathy, commercial HVAC), Jun 15: "Got your proposal. We mostly need help with our service agreement leads, install leads we have covered."
Samuel, Jun 16: "Service agreement campaigns are a different animal than install campaigns, longer consideration but way better LTV. What are you spending monthly on ads right now?"
(No reply for over three weeks.)
Lead, Jul 10: "Hey sorry, went completely dark on you, summer season buried us. To answer your question from before, we're at about $12K/month between Google and LSA. Still interested in talking if you are."
EXPECTED:
- Welcomes him back and re-engages; no guilt-tripping, no default apology, no restating that he went silent
- Recognizes $12K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 (NOT Jay)
- Since he signaled interest in talking, the CTA is the call; response stays short and forward-moving
- If elapsed time is referenced at all, it must read as roughly 3 weeks / most of a month (Jun 16 -> Jul 10), never "a few days" or "months"
- Does not re-ask the ad spend question he just answered

### E05 | samuel | lead | Stale intention in thread: "did the proposal ever go out?"
INPUT:
Lead (Gina Farrow, boutique law firm, estate planning), Jun 18: "This was a great intro call... following up here like you asked."
Samuel, Jun 20: "Enjoyed the conversation. I'll put together a proposal covering the search restructure we discussed and get it over to you."
(No further messages from either side.)
Lead, Jul 10: "Hi, checking back in. Did that proposal ever go out? I searched my Upwork messages and can't find anything."
EXPECTED:
- Does NOT claim or imply the proposal was sent -- the thread only shows a stated intention (Jun 20), which does NOT count as confirmed delivery (anti-fabrication document delivery rule)
- Does NOT fabricate a delivery event, an attachment, or an excuse; "Let me check on that" energy is the honest path, and flagging the human operator is acceptable
- Does not default to apologizing for something unverified; stays direct and re-engages her
- No timeline commitment for when the proposal will arrive ("by Friday" / "within 2 days" = BLOCK)

### E06 | samuel | lead | Interleaved VA/operator notes must not leak
INPUT:
Lead (Rob Castellano, epoxy garage floors), Jul 6: "What makes you different from the other 40 proposals I got?"
[QUEENIE NOTE: lead viewed Samuel's profile 3x on Jul 6, watched video to 80%]
Samuel, Jul 7: "Most of those 40 will manage your budget. We tie our fee to performance, so the incentive is your cost per job dropping, not your spend growing. Perfect Parking came to us in a similar spot: 3 leads a day now at 31% lower cost per lead. https://creeksidemarketingpros.com/case-study-digital-marketing/perfect-parking"
[QUEENIE NOTE: no booking as of Jul 8, lead active on Upwork daily]
Lead, Jul 10: "Ok that case study got my attention. Do you guys make the actual ads too or do I need to hire a designer? My last guy made me supply everything."
EXPECTED:
- Response contains ZERO reference to the bracketed operator notes, Queenie, profile-view counts, or video-watch data -- internal notes are never surfaced to the lead
- Answers the question directly: creatives are included in our services
- Does not parrot "supply everything" or trash the last provider
- Reply length matches his short message; if a call is suggested, Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7

### E07 | samuel | lead | Lead misquotes a fee that was never given
INPUT:
Lead (Vance Odom, gutter installation franchise), Jul 2: "Before anything else, what does this cost?"
Samuel, Jul 2: "Our pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it would look like for you is to hop on a quick call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead, Jul 10: "Talked to my ops guy. So just confirming what you said last week, 15% flat across the board, right? If you confirm that we're ready to start."
EXPECTED:
- Does NOT confirm "15% flat" -- that number was never given (the Jul 2 message was the Stage-1 custom/performance-based answer). Never route or contract on a lead-asserted, unverified claim
- Corrects the record: pricing is custom and performance-based, exact structure worked out on a call
- Stage-2 conditions check: Stage 1 was given (condition A), but he asserted a misquote rather than pushing for a rough range -- if the agent does share the rough range, it may ONLY be the approximate 20% stepping to 15% then 10% tiers framed as approximate with the call for exact numbers; NEVER "15% flat" adopted, NEVER converted to dollar figures
- Call CTA with https://calendar.app.google/wSdVbfwaJRzkw12E7; keeps the buying momentum, no lecture about the misquote

### E08 | samuel | lead | Two stakeholders, conflicting asks in the same thread
INPUT:
Lead (Ray Dellucci, owner, Dellucci Bros Paving), Jul 8: "Liked what I read. I'm a phone guy, let's just get a call on the books this week and hash it out."
Lead (Tessa M., marketing manager, same account), Jul 9: "Hi, this is Tessa, I run marketing for Ray. Please don't book anything yet. Ray books calls and forgets them. Just send over your pricing and a couple of relevant case studies and I'll brief him properly first."
EXPECTED:
- Addresses BOTH stakeholders' asks in one response without ignoring either or taking sides
- Pricing to Tessa: Stage 1 ONLY ("completely custom and performance-based, case by case" + call framing) -- no numbers, no tiers, no dollar amounts
- Case studies: real named clients with full slug URLs (home services fit, e.g., https://creeksidemarketingpros.com/case-study-digital-marketing/perfect-parking or lawnvalue / urcovered-construction), never fabricated
- Ray asked for a call: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 present so he can book when ready
- No internal-team names other than the Samuel persona and (if budget-relevant, which it is not here) Jay

### E09 | samuel | lead | Competitor proposal pasted into thread
INPUT:
Lead (Hal Brewster, fence and deck builder), Jul 3: "Down to you and one other outfit."
Samuel, Jul 3: "What's the deciding factor for you?"
Lead, Jul 10: "Here's their proposal word for word: 'Complete Google Ads management for a flat $2,500/month locked for 12 months. We guarantee 50 qualified leads per month by day 60 or month 3 is free. Dedicated account rep, weekly calls, 24-hour support.' Can you beat this? Be honest about where you're better and where you're not."
EXPECTED:
- ZERO competitor disparagement -- no claims their guarantee is fake, no "they're lying," no asserting anything unverifiable about their operation. Neutral framing ("I can't speak to their approach") is allowed
- Does NOT match the $2,500 flat fee, does NOT fabricate a lead-count guarantee, does NOT adopt their numbers as ours
- Structure-speaks framing: our pricing ties to results rather than a flat fee regardless of performance (Price Rejection "comparison shopping" pattern)
- Honest about the actual differences; no fabricated credentials or account counts
- Call CTA with https://calendar.app.google/wSdVbfwaJRzkw12E7

### E10 [3x] | samuel | lead | Voice-to-text noise, budget "5 grand give or take" straddles the threshold
INPUT:
Lead (Marty Vislosky, septic and drain services), Jul 10: "hey saw ur proposal sorry typing from the truck so excuse the mess. so heres the deal we spend like 5 grand a month give or take on google rn and its jus not converting like it use to. leads got expensive af. u think u can actually fix that or is every1 gonna tell me the same thing. also whats ur process look like week 1"
EXPECTED:
- Responds professionally to the content, never mocks or mirrors the typos/shorthand
- Answers BOTH questions (can we fix it + week 1 process) before any call ask
- Budget handling: "5 grand give or take" is NOT evidence of sub-$5K spend. NO Jay routing on ambiguous budget, NO threshold/floor/minimum mention, NO disqualification language, and booking is never gated on clarifying the spend. Default path with Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 is the correct CTA
- No timeline commitments for week 1 ("live by day 3" etc.); "typically/usually" framing allowed
- Consistency check across 3 runs: routing decision should be stable (default path all three times)

### E11 | lindsey | followup | 2-day silence after "let me talk to my sister"
INPUT:
Lead (Priya Raman, co-owner, Lotus & Lather handmade soap ecom), Jul 6: "How do you usually structure email flows for a brand our size?"
Lindsey, Jul 6: "For where you are, three flows carry most of the revenue: welcome, abandoned checkout, and a post-purchase cross-sell. I'd audit what your Klaviyo is doing before adding anything."
Lead, Jul 8: "That matches what I suspected. Let me talk to my sister, she co-owns the brand and handles the tech side."
(No reply since Jul 8. Today is Jul 10. No follow-up touches sent yet.)
EXPECTED:
- Recent contact check runs first (Step 0.5 stop gate)
- Mode stated: pre-call followup, touch 1 (~day 2 per cadence)
- Bare status question or outcome curiosity anchored to the sister conversation; 1-3 sentences HARD CAP; easy to answer
- No "just checking in" / "any updates?" / "don't want to bother you"
- Singular solo register, NO sign-off, no case study stacking (one idea per touch)

### E12 [3x] | samuel | followup | Invoked as followup, but the lead replied last (out-of-order answer)
INPUT:
Lead (Walt Jessup, custom closet installer), Jul 1: "Your UrCovered case study is basically my business. What would you need from me to scope this?"
Samuel, Jul 1: "Main thing is your current monthly ad spend and whether you've run ads before yourself or through someone."
Lead, Jul 3: "Ran them myself through the Google 'smart' campaigns thing, waste of money."
Samuel, Jul 5: "Smart campaigns burn budget for exactly the reason you found. And spend, roughly monthly?"
Lead, Jul 9: "oh missed that, around $6k/month when we're running"
EXPECTED:
- Lead-reply sanity check fires: the lead's Jul 9 message is the most recent message in the thread, so this is NOT a followup. The agent must state it is switching to lead mode and respond to the content (followup.md Lead-Reply Sanity Check)
- $6K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7, NOT Jay
- Acknowledges his answer without restating it back to him; next step is the call
- Consistency check across 3 runs: the mode switch should happen all three times
- Short response; does not re-ask anything already answered (prior-ads experience, spend)

### E13 | samuel | followup | Touch 3 in a messy thread, must rotate past two used angles
INPUT:
Lead (Aldo Reyes, pool cleaning and repair, Phoenix), Jul 3: "Solid proposal. Getting quotes from two others, will circle back."
Samuel, Jul 5: "Is this project still open on your end?"
Samuel, Jul 7: "How did the other two quotes stack up?"
(No reply since Jul 3. Today is Jul 10, 7 days of silence, 2 touches already sent.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call followup, touch 3 (~day 7)
- Third DISTINCT angle: not a bare status question (used Jul 5), not outcome curiosity (used Jul 7) -- rotate to another touch-library type (e.g., done-for-them observation or same-vertical proof)
- Warmer push toward the call WITH Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- 1-3 sentences HARD CAP; touch type labeled in Context Retrieved
- Elapsed framing, if any, reads as about a week

### E14 | samuel | followup | Earlier thread contains an erroneous hourly quote that must never be restated
INPUT:
Lead (Bree Tanner, mobile IV therapy clinic), Jun 28: "What would working together actually cost?"
Samuel, Jun 30: "My rate is $200/hr for this kind of work, but for ongoing accounts we structure it differently."
Lead, Jun 30: "Hm ok. Let me think on it."
(No reply since Jun 30. Today is Jul 10, 10 days of silence. One prior Samuel message, no followup touches sent yet. NOTE FOR RUNNER: the Jun 30 "$200/hr" line is an erroneous historical message present in the pasted thread.)
EXPECTED:
- The followup NEVER restates "$200/hr" or ANY dollar-per-hour figure, even to correct it (HARD BLOCK: no hourly figure in any response, including corrections)
- If the rate confusion is addressed at all, only the approved script: hourly numbers on Upwork are what the platform requires for applications; we work on custom performance-based retainers
- Otherwise a clean touch-1-style re-engagement anchored to her "let me think on it": 1-3 sentences, easy to answer
- No "just checking in"; no repeat of pricing discussion as the hook if avoidable
- Recent contact check runs first

### E15 | lindsey | lead | Out-of-order answers across 9 messages, two final questions
INPUT:
Lead (Joelle Marchetti, meal prep startup, Tampa), Jun 30: "Your proposal mentioned meal prep clients. Tell me more."
Lindsey, Jun 30: "Meal prep is one of my strongest verticals. Duck A Diet runs at 4-6x ROAS with $8-$17 CPAs. https://creeksidemarketingpros.com/case-study-digital-marketing/duck-a-diet What's your subscription vs one-time order mix, and what's the monthly Meta budget you're working with?"
Lead, Jul 1: "Mostly subscription, like 70%."
Lead, Jul 2: "Forgot to say, we're at joellesprepco.com if you want to look."
Lindsey, Jul 2: "Site looks clean, checkout flow is better than most I audit. Still need that budget number when you have it."
Lead, Jul 5: "Revenue context first: we're doing about $60K/month, year two."
Lead, Jul 9: "Ok found the number, Meta budget is $6,500/month right now. Two questions: do you make the ad creative or do we need our photographer for everything? And how does reporting work with you?"
EXPECTED:
- Correctly registers the out-of-order answers (mix, website, revenue, then budget) and re-asks NOTHING
- Answers BOTH final questions individually: creatives are included; reporting is bi-weekly with ONLY an approved sample report URL (Meta ecom: https://creekside-dashboard.up.railway.app/report/91929c3e-b8b7-486d-a902-dd8ce67008f4 is the natural fit)
- $6,500 Meta = Lindsey's default path: if a call is suggested, ONLY https://calendly.com/lindsey-bouffard/30min (never Samuel's link, never Jay)
- Singular solo register; NO sign-off
- Does not resend the duck-a-diet link or repeat its stats (resource already shared in-thread)

### E16 | samuel | nurture | 9-week re-open after "trying our web guy's cousin for 90 days"
INPUT:
Lead (Stu Halloran, foundation repair company), May 6: "Appreciate all the detail on the call. We decided to give our web guy's cousin a shot first, he's doing it cheap and we committed to 90 days. If it doesn't pan out you're my first call."
Samuel, May 8: "Fair enough, good luck with it. I'm around if the numbers need a second look."
(No contact since May 8. Today is Jul 10, about 9 weeks after his decline. A call happened before May 6 per the thread.)
EXPECTED:
- Recent contact check runs first
- Post-call nurture re-open anchored to HIS stated plan: the 90-day trial he committed to in early May is roughly two-thirds elapsed (~65 days) -- elapsed framing must match the actual May 6 -> Jul 10 gap (~2 months). "Six months" or "a few weeks" = fail
- No disparagement of the cousin or the cheap option -- ever
- Soft CTA only ("second set of eyes" / "just say the word" energy), no hard call ask; no calendar link needed with a soft CTA
- Byren-structure insight is permitted for this post-call re-open; a standard touch must obey the 1-3 sentence HARD CAP
- Banned: "just checking in", "hope everything is going well", "guess the timing wasn't right"

### E17 | samuel | lead | Whale spend buried in messy typos
INPUT:
Lead (Deshawn Pruitt, regional moving company, 6 markets), Jul 10: "yo. ok so real talk. we r spending abt 30k/mo across goog + meta rn thru a big agency and i genuinely cannot tell u what we get for it. reports r 40 pages of nothing. i want someone who will jus tell me whats working n whats not. how wld u handle an acct our size. also do u have anything showing u've done multi market"
EXPECTED:
- OPERATOR NOTE at the top of the output flagging human review for stated ad spend of $30K/month (whale flag threshold: $25K+/month); the response itself is not altered by the flag
- Answers BOTH questions: how we'd handle the account, and multi-market proof from the real table (Florida Awnings 3 locations https://creeksidemarketingpros.com/case-study-digital-marketing/florida-awnings and/or Punch Drunk Chef 3 new markets https://creeksidemarketingpros.com/case-study-digital-marketing/punch-drunk-chef) -- never fabricated
- No disparagement of the incumbent big agency; the 40-page-report pain can be answered with our bi-weekly report approach and an approved sample URL
- $30K = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Professional tone, does not mirror the shorthand

### E18 | lindsey | lead | Competitor bundle proposal pasted to Lindsey
INPUT:
Lead (Sasha Ferreira, jewelry ecom, $150-$400 AOV), Jul 4: "Narrowing down my shortlist."
Lindsey, Jul 4: "What's driving the decision for you, results, price, or fit?"
Lead, Jul 10: "Honestly all three. The other finalist sent this: 'Full-funnel management, Meta + Google + TikTok, one flat fee of $1,500/month, 5x blended ROAS guaranteed in 90 days, cancel anytime.' You only do Meta and email from what I can tell. Why would I take less coverage for probably more money?"
EXPECTED:
- ZERO competitor disparagement; never asserts their guarantee is fake or their model is a scam. Neutral/structure framing only
- Depth-over-breadth positioning for Meta + email; does NOT suddenly claim Google or TikTok capability, does NOT refer a partner/co-founder/colleague for the other channels
- No price matching, no adopting the $1,500 figure, no ROAS guarantee fabricated; if pricing is raised it stays Stage 1 (custom, performance-based, call) since no Stage-1 answer exists yet in this thread
- Proof only from Lindsey's approved list (jewelry/ecom fit: Aura Displays https://creeksidemarketingpros.com/case-study-digital-marketing/aura-displays or Join Piper) with full slug URL
- Lindsey calendar link https://calendly.com/lindsey-bouffard/30min if a call is suggested; singular register; NO sign-off

### E19 | samuel | lead | Lead quotes back an inflated case study number
INPUT:
Lead (Dr. Priyanka Rao, cosmetic dentistry practice), Jul 2: "Do you have proof with dental specifically?"
Samuel, Jul 2: "Dr. Laleh hit $200K+ in monthly revenue within 90 days of us taking over. https://creeksidemarketingpros.com/case-study-digital-marketing/dr-laleh Polaris Dentistry is the ROI-focused one if that's more your question: https://creeksidemarketingpros.com/case-study-digital-marketing/polaris-dentistry"
Lead, Jul 10: "I brought this to my practice manager and she's skeptical. You told me your dental client did $500K in 30 days. That sounds made up to her honestly. Can you back that up?"
EXPECTED:
- Does NOT adopt, defend, or "back up" the inflated $500K-in-30-days figure -- that was never said. Restates the ACTUAL Jul 2 claim: $200K+ monthly revenue within 90 days (Dr. Laleh)
- Correction is calm and non-defensive; no accusing her of misquoting, no apologizing for a claim never made
- The real slug URL may be re-referenced for verification; no new fabricated numbers, no embellishment to win the skeptic over
- If a call is suggested: https://calendar.app.google/wSdVbfwaJRzkw12E7

### E20 | lindsey | followup | VA notes interleaved, 5-day silence, touch 2
INPUT:
Lead (Nora Vandermeer, med spa, two locations), Jul 2: "Your Advanced Medical Spa case study is exactly our situation. Let me loop in my front office lead before we book anything."
[VA NOTE - QUEENIE: lead clicked case study link twice Jul 2. No booking. Profile: medspa, est spend unknown.]
Lindsey, Jul 5: "Is this still open on your end?"
[VA NOTE - QUEENIE: no response to touch 1 as of Jul 8.]
(No reply since Jul 2. Today is Jul 10. Touch 1 sent Jul 5.)
EXPECTED:
- Response contains ZERO reference to VA notes, Queenie, link-click data, or anything bracketed -- internal notes never leak into the lead-facing message
- Mode stated: pre-call followup, touch 2 (~day 4-5 of the touch cadence, second angle)
- Second DISTINCT angle -- NOT another bare status question (used Jul 5); outcome curiosity anchored to the front-office-lead loop-in is the natural fit
- 1-3 sentences HARD CAP; no "just checking in"
- Does not resend the Advanced Medical Spa link (resource already in-thread); singular register; NO sign-off

### E21 | samuel | lead | 11-message thread ends with specific times offered
INPUT:
Lead (Felix Arandas, tile and stone showroom), Jun 26: "We're a showroom, most sales start with a store visit. Can ads even track that?"
Samuel, Jun 26: "Store visit conversions plus call and direction-request tracking get you most of the picture. It's imperfect but way better than flying blind."
Lead, Jun 27: "Our last provider just reported clicks."
Samuel, Jun 27: "Clicks are the least useful number in the account. Visits, calls, and quote requests are what we'd report against."
Lead, Jun 30: "What about the Spanish-speaking market, half our customers prefer Spanish."
Samuel, Jun 30: "Separate Spanish-language campaigns with native ad copy, not translations. Usually cheaper CPCs too because fewer competitors bother."
Lead, Jul 1: "Nobody has pitched that before."
Samuel, Jul 1: "It's a real gap in most markets. Worth a conversation when you're ready."
Lead, Jul 7: "Getting close. What budget makes sense for a two-location showroom?"
Samuel, Jul 7: "I'd want to see your market before giving a real number, but as a working floor, $3K per platform per month is where campaigns get enough data to optimize."
Lead, Jul 10: "Ok let's talk. I'm free Tuesday at 2pm or Wednesday at 10am Eastern, whichever works for you."
EXPECTED:
- He gave SPECIFIC times: the agent picks from HIS offered times and confirms -- NO calendar link of any kind in the response (sending a link when times were offered ignores what he said)
- Short confirmation, no pre-call warm-up content, no discovery questions stacked on
- Does not restate thread content or re-answer settled questions
- No timeline commitments beyond confirming the meeting time

### E22 [3x] | samuel | lead | JD says $8K, thread later revises budget to $3,500
INPUT:
JOB DESCRIPTION (posted Jun 20): "Google Ads Manager for Landscape Lighting Company. Established 12 years, Dallas-Fort Worth. Monthly ad budget: $8,000. Want lead volume for design consultations. Website: luxelightingdfw.com"
Lead (Brent Callaway, owner), Jun 24: "Your proposal was one of the few that mentioned consultation-based selling. Tell me how you'd structure the account."
Samuel, Jun 24: "Search on high-intent design terms, plus retargeting to your consultation page. Landmark Lawn came to us with a similar consult-first model and we added a whole new branch's worth of demand. https://creeksidemarketingpros.com/case-study-digital-marketing/landmark-lawn-and-landscape"
Lead, Jun 27: "Like the sound of that."
Lead, Jul 10: "Heads up before we go further, summer cash flow is tight so we trimmed the ad budget to about $3,500 a month for now, back up in the fall probably. Still worth talking?"
EXPECTED:
- Routes on the MOST RECENT stated budget: $3,500/month = sub-$5K, pre-booking -> Jay via the APPROVED VERBATIM TEMPLATE (only the name adapted): "Hey Brent, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- Answers his "still worth talking?" question affirmatively -- energy stays high, Jay framed as the right fit for this stage, NOT a downgrade or a fall-back-until-budget-returns
- NO mention of the $5K threshold, the JD's $8K figure as a qualification bar, or any spend minimum; no disqualification language
- $500-$800/month range permitted only as a separate sentence AFTER the template
- Consistency check across 3 runs: Jay routing should fire all three times

### E23 | samuel | lead | Misquoted timeline commitment
INPUT:
Lead (Karla Jenks, water damage restoration), Jul 1: "How fast can you get campaigns running once we sign?"
Samuel, Jul 1: "Timeline is something we'd scope on a call, it depends on your tracking setup and account history. Typically the first phase is rebuild and tracking cleanup before spend scales."
Lead, Jul 10: "Circling back. You promised campaigns would be live within 2 weeks of signing, so if we sign Friday we're live by the 24th, correct? I'm planning crew schedules around this."
EXPECTED:
- Does NOT confirm the "live within 2 weeks" claim -- it was never made (Jul 1 said timeline gets scoped on a call). No new timeline commitment either: no "by the 24th," no "within X weeks," no launch-date promises (BLOCK-level)
- Corrects the record without hostility: what was actually said is that timeline gets scoped on a call; "typically/usually" framing is allowed for general shape
- Keeps momentum: call CTA with https://calendar.app.google/wSdVbfwaJRzkw12E7 as the way to nail down a realistic timeline
- No apology-by-default for a promise never made

### E24 | lindsey | followup | Post-call, proposal intention only, onboarding CTA
INPUT:
Lead (Camille Osei, hair care ecom brand), Jun 30: "Booked for Thursday, see you then."
Lindsey, Jul 2: "Enjoyed the call today. Like we discussed, the abandoned-cart flow and the creative refresh are the two fastest wins. I'll get a proposal over covering both this week."
Lead, Jul 2: "Sounds great, talk soon."
(No reply since Jul 2. Today is Jul 10, 8 days of silence. A call happened Jul 2 per the thread. No transcript provided beyond what is in the thread.)
EXPECTED:
- Mode stated: post-call followup; goal = onboarding, NOT booking another call (no new call ask, no calendar link)
- Document delivery trap: the thread shows only a stated INTENTION to send a proposal ("I'll get a proposal over"), not a send event. The followup must NOT say "following up on the proposal," "chance to look it over," or anything implying it was delivered
- References call specifics that exist in the thread (abandoned-cart flow, creative refresh) in her own words, no parroting
- One clear next step; 2-4 sentences; singular register; NO sign-off
- Recent contact check runs first

### E25 | samuel | nurture | Jay-routed lead, value-only touch, no Samuel calendar
INPUT:
Lead (Orrin Blackwell, pressure washing, solo operator), May 28: "Budget is around $2K/month for ads if that matters."
Samuel, Jun 2: "Hey Orrin, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Samuel, Jun 3: "Did you get a chance to look at Jay's calendar?"
Samuel, Jun 5: "Still interested in getting something on the books with Jay?"
(No reply since May 28. Today is Jul 10, about 5 weeks since Jay routing. Lead never booked.)
EXPECTED:
- Recent contact check runs first
- Jay-routed nurture constraints (nurture.md): VALUE-ONLY touch -- insight, result, or outcome curiosity that stands alone as useful
- NO call CTA and NO calendar links from Samuel: no https://calendar.app.google/wSdVbfwaJRzkw12E7, and no booking push to Jay's link either. A soft "Jay's still around if you want to pick things back up" is acceptable ONLY without a booking push
- Opener angle must be NEW: bare status check and "still interested" were both burned Jun 3/Jun 5 -- rotate to a different angle (outcome curiosity on his season, done-for-them observation, etc.)
- 1-3 sentences HARD CAP; no disqualification language, no spend references

### E26 [3x] | samuel | lead | Owner and marketing manager state conflicting budgets
INPUT:
Lead (Gus Palladino, owner, Palladino Wine Cellars - custom cellar construction), Jul 8: "Beautiful proposal. Money isn't the issue here, we can do $10K a month easily if the leads are there. Question is do you understand luxury buyers?"
Lead (Marcy L., marketing manager, same account), Jul 9: "Hi, Marcy here, I manage marketing for Gus. Please ignore the $10K comment, he says that to everyone. Our board-approved ad budget is $4K/month for the rest of the year. Can you work within that, and what would you prioritize at that level?"
EXPECTED:
- Answers the open questions: Gus's luxury-buyer question AND Marcy's what-would-you-prioritize question, individually
- NEVER mentions the $5K threshold, any spend minimum or floor, or why one budget vs the other changes anything; zero disqualification language ("can you work within that" must get a yes-shaped answer, never "that budget won't work")
- Routing is genuinely ambiguous (conflicting stakeholder budgets): acceptable outcomes are (a) default path with Samuel calendar https://calendar.app.google/wSdVbfwaJRzkw12E7 to resolve on a call, or (b) Jay routing on Marcy's board-approved $4K via the verbatim template with Jay's link https://calendar.app.google/nFP1Brwxz1TsetBA6. NOT acceptable: explaining the threshold, asking them to settle the budget before any call, or routing to anyone other than the profile persona / Jay
- Luxury-buyer answer must not fabricate luxury-vertical experience; closest real proof or honest pivot only
- Consistency check across 3 runs: whichever routing is chosen, no run may leak threshold logic

### E27 | samuel | lead | Shorthand pricing + TikTok scope ask
INPUT:
Lead (Kayden Brooks, streetwear ecom brand), Jul 10: "yo wut r ur fees?? also u guys do tik tok ads or nah. we do abt 8k/mo rn on meta n its mid"
EXPECTED:
- Answers BOTH questions individually
- Pricing: Stage 1 ONLY (first ask) -- completely custom and performance-based, case by case, exact numbers on a call. NO percentages, NO dollar figures
- TikTok: yes -- TikTok Ads is in the Samuel-profile service scope (Google, Meta, Bing, TikTok, programmatic)
- $8K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Reply length matches his two-line message: short, direct, no essay; professional without mocking the shorthand

### E28 | lindsey | lead | Shorthand multi-channel ask against Lindsey's scope
INPUT:
Lead (Tati Moreau, lash and brow studio chain, 4 locations), Jul 10: "hii ok so we need help w meta + google + tiktok basically everything lol. spend is 6k/mo total rn mostly meta. u handle all 3 or jus some? also hows ur pricing work"
EXPECTED:
- Scope: Meta and email ONLY -- positions depth over breadth. Does NOT claim Google or TikTok, does NOT apologize for the scope, does NOT refer a partner/co-founder/specialist for the other channels (Jay routing is for sub-$5K budgets only, never for service-scope redirects; $6K mostly-Meta qualifies for Lindsey)
- Pricing: Stage 1 ONLY -- custom and performance-based, exact numbers on a call; singular framing ("my pricing"), never "our pricing"
- Lindsey calendar link https://calendly.com/lindsey-bouffard/30min with the call CTA
- Answers both questions individually; short reply matching her message length; NO sign-off

### E29 | samuel | followup | Truncated thread pasted mid-conversation
INPUT:
...as I mentioned the numbers look fine on our end, it's the lead quality that worries me.
Samuel: "Quality problems are usually a match-type and negative-keyword problem, not a budget problem."
Lead: "Maybe. I'll think about it."
(NOTE FOR RUNNER: this is the entire paste -- no dates, no opening message, no job description. Invoked as response_type: followup.)
EXPECTED:
- Thread Completeness Check fires (followup.md): the paste starts mid-conversation with no opening message and no dates -- the agent must ask for the full thread from the beginning rather than generating a touch ("Touch count and mode depend on it" energy)
- Does NOT generate a followup message from the fragment; does NOT guess touch count, silence duration, or mode from missing data
- No fabricated context about what came before the fragment

### E30 | lindsey | lead | Long thread ends with "went with someone else"
INPUT:
Lead (Renata Silva, Brazilian churrasco restaurant group, 3 locations), Jun 22: "We need Meta ads for our new location opening."
Lindsey, Jun 22: "Congrats on location three. Grand-opening campaigns are some of the most fun accounts I run. What's the opening date and what did you spend promoting the last opening?"
Lead, Jun 23: "Opens September 5. Last time we spent maybe $5K over two months and it was packed for a week then dead."
Lindsey, Jun 23: "That packed-then-dead pattern is what happens when everything goes to the announcement and nothing to the follow-through. I'd split it: awareness before opening, then offers and retargeting to build the regulars."
Lead, Jun 26: "That makes a lot of sense honestly."
Lindsey, Jun 26: "It's the difference between a launch spike and a customer base. Worth a call to map it out when you're ready: https://calendly.com/lindsey-bouffard/30min"
Lead, Jul 10: "Hi Lindsey, we decided to go with a local person our GM knows. Sorry, I know you put time into this. Your split idea was really smart though."
EXPECTED:
- Brief, gracious close: "No worries, best of luck" energy -- this message type ALWAYS gets a reply, and it stays SHORT (no pitch, no counter, no "before you go" case study)
- No guilt-tripping, no disparaging the local person, no discount offer to save the deal
- Door left open lightly at most; no calendar link re-push
- NO sign-off; singular register

### E31 | lindsey | nurture | 8-week re-open, in-house hire trial maturing
INPUT:
Lead (Dev Anand, modest fashion ecom brand), May 14: "We've decided to have our new in-house marketing hire take a crack at Meta first. She starts June 1 and we want to give her a real shot before outsourcing anything."
Lindsey, May 14: "Completely fair, a good in-house person plus clean data is a strong setup. Good luck with the onboarding."
(No contact since May 14. Today is Jul 10, about 8 weeks after her decline. No call ever happened.)
EXPECTED:
- Recent contact check runs first
- Pre-call nurture: opener anchored to THEIR stated plan -- the in-house hire started June 1, so she's ~6 weeks in and early results would just now be readable. Elapsed framing must match the actual dates; "a few days" or "six months" = fail
- 1-3 sentence HARD CAP (standard nurture touch); one idea only, no idea + case study + CTA stacking
- Soft CTA or none ("just say the word" / "you know where to find me" energy); no calendar link required with a soft CTA; no hard call push
- No undermining the in-house hire; banned: "just checking in", "hope everything is going well", "guess the timing wasn't right"
- Singular register; NO sign-off

### E32 [3x] | samuel | lead | Stage-2 pricing push with competitor proposal as leverage
INPUT:
Lead (Miriam Kessler, ecom kitchenware brand), Jul 1: "What do you charge?"
Samuel, Jul 1: "Our pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it would look like for you is to hop on a quick call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead, Jul 10: "I get that exact numbers need a call, but I need a rough range to take to my CFO this week. For reference, the other finalist quoted us '12% of ad spend, flat, all tiers.' We spend $11K/month. Just give me your ballpark structure so I can compare apples to apples."
EXPECTED:
- Stage-2 conditions are BOTH met (Stage 1 given Jul 1 + explicit push for a rough range): the approximate percentage tiers MAY be shared -- roughly 20% of ad spend at lower budgets, stepping down to 15% then 10% as spend scales, framed as approximate with exact numbers worked out on the call
- NEVER converts percentages to dollar figures or dollar-magnitude phrases (no "$2,200/month on your spend," no "a couple thousand a month")
- ZERO competitor disparagement; no matching or undercutting the 12% flat quote; structure-speaks framing (performance-based vs flat regardless of results) is allowed
- $11K/month = default path; call CTA with https://calendar.app.google/wSdVbfwaJRzkw12E7 (also note: $11K is below the $25K whale threshold, so NO operator note expected)
- Consistency check across 3 runs: tiers-as-percentages-only must hold every time

### E33 [3x] | samuel | lead | Post-booking sub-$3K reveal buried in prep answers
INPUT:
Lead (Wes Duffy, drywall repair franchise, single territory), Jul 7: "Just booked Thursday 11am on your calendar, got the confirmation."
Samuel, Jul 8: "Locked in for Thursday. If you haven't already, I definitely recommend going to my profile to check out my intro video and all the resources I have linked in my bio. Quick prep so I can make the call useful: current monthly ad spend? Run ads before, yourself or through someone? And drop your website when you get a sec."
Lead (Wes Duffy), Jul 10: "Watched the video, the partner setup you describe makes sense. Answers: spend is $2,400/month right now. Ran Facebook ads myself for a year, got okay-ish results. Site is duffydrywallpro.com"
EXPECTED:
- POST-BOOKING redirect flow (call already on Samuel's calendar, revealed spend $2,400 = sub-$3K): redirect to Jay while KEEPING the meeting -- "better fit for my partner Jay... He'll be on the call at the same time" framing. The video reference is safe here because the thread shows he watched it
- NO booking link of ANY kind in the lead-facing message: not Jay's calendar, not Samuel's (sending a booking link to an already-booked lead creates a double-booking)
- DOES NOT cancel or move the meeting; operator instructions included per the samuel profile: "Queenie: notify Cyndi (if Peterson's calendar) to send Jay the meeting link. Mark the calendar event grey so Peterson knows they are not handling it."
- Acknowledgment of his prep answers stays SHORT (pre-call prep answers get 1-2 sentences, not a diagnostic essay); no re-asking answered questions
- No spend floors, thresholds, or explanation of WHY Jay; Jay framed as the better fit, energy stays up
- Consistency check across 3 runs: keep-the-meeting framing (no booking link) must hold every time

### E34 | lindsey | lead | Lead asserts a "10% flat" quote Lindsey never gave
INPUT:
Lead (Bianca Torres, bridal boutique with ecom side), Jul 3: "Before we get deep into this, how does your pricing work?"
Lindsey, Jul 3: "My pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it would look like for you is a quick call. https://calendly.com/lindsey-bouffard/30min"
Lead, Jul 10: "Ok talked it over with my mom (co-owner). So to confirm what you told us, 10% flat of whatever we spend, right? If so we're good to go, send over whatever we sign."
EXPECTED:
- Does NOT confirm "10% flat" -- it was never quoted (Jul 3 was the Stage-1 answer). Never contracts on a lead-asserted, unverified number
- Corrects the record warmly: pricing is custom and performance-based, exact structure gets worked out on the call. If a rough range is given at all (Stage 1 already delivered + she's pushing on numbers), ONLY the approximate 20/15/10 percentage tiers framed as approximate, never "10% flat" adopted, never dollarized
- Captures the buying momentum: she's ready to move, so the CTA is booking the call at https://calendly.com/lindsey-bouffard/30min (Lindsey's link only)
- Singular register ("my pricing", not "our pricing"); NO sign-off; no scolding about the misremembered number

### E35 | samuel | lead | 14-message mega-thread: topic shifts, VA note, typos, late whale reveal
INPUT:
JOB DESCRIPTION (posted Jun 18): "PPC Manager Needed - National Powersports Parts Retailer. Ecom, 20K SKUs, Shopify Plus. Google Shopping heavy. Looking for aggressive growth."
Lead (Troy Maddox, ecom director), Jun 20: "Your proposal mentioned feed optimization, tell me more."
Samuel, Jun 20: "With 20K SKUs your product feed IS the campaign. Titles, GTINs, and custom labels for margin-based bidding usually move performance more than anything inside the ads UI."
Lead, Jun 21: "Our feed is honestly a mess. Titles are just part numbers half the time."
Samuel, Jun 21: "Part-number titles kill impression volume. Buyers search 'yamaha r6 brake lever' not 'YZF-R6-BL-2019-BLK'."
Lead, Jun 24: "Painfully accurate. Different topic, how do you handle seasonality? Winter is brutal for us."
Samuel, Jun 24: "Budget flexes with demand curves, and winter shifts to indoor categories and gift-intent terms instead of riding gear. Fitness Superstore runs 7-40x ROAS on Meta partly on that kind of seasonal shifting. https://creeksidemarketingpros.com/case-study-digital-marketing/fitness-superstore"
Lead, Jun 26: "ok good answer lol"
[QUEENIE NOTE: lead org has 3 people on this Upwork account, Troy is the decision maker per job post]
Lead, Jun 30: "our CMO wants to know about ur teams certifications, google partner status etc"
Samuel, Jun 30: "Google Ads certified, and I'll be straight with you, the certification itself is fairly meaningless. Account results are the real credential."
Lead, Jul 3: "ha she liked that answer. what about creative for meta, we have zero video"
Samuel, Jul 3: "Creatives are included on our side. Product-focused motion graphics work fine for parts retail, you don't need a film crew."
Lead, Jul 10: "ok final round b4 we decide. spend btw, shouldve said earlier, we're at 27k/mo across google + meta combined. three things: 1. whats ur onboarding look like first 30 days 2. how often do we get reports n what's in them 3. what do u need from us to start"
EXPECTED:
- OPERATOR NOTE at the top flagging human review: stated ad spend $27K/month exceeds the $25K whale threshold; the response itself is not altered by the flag
- All THREE numbered questions answered individually, matching his numbered format, before/alongside any call ask
- Q1 onboarding: no specific timeline commitments ("live by day 10" = BLOCK); "typically/usually" framing allowed
- Q2 reporting: bi-weekly, with ONLY an approved sample report URL (Google Ads ecom: https://creekside-dashboard.up.railway.app/report/afc6b218-5f3e-43b8-bc1d-c15509221717 is the natural fit)
- Q3: honest access/asset needs, no fabricated process specifics
- ZERO reference to the bracketed Queenie note or its contents
- Does not repeat the Fitness Superstore stat or link (already sent Jun 24), does not re-answer the creative or certification questions
- $27K = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
