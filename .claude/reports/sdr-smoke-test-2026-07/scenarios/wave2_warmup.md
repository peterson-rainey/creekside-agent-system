# SDR Smoke Test Scenarios -- WAVE 2: WARMUP

Same runner protocol as scenarios_lead.md. response_type: warmup for every scenario. Profile as marked.
All dates are 2026. The lead has BOOKED a call in every scenario unless the scenario is a skip-test.
Universal warmup expectations (implied in every EXPECTED below): no calendar links of any kind, no case study attachments, no pricing numbers, Q3 (budget) is mandatory if unanswered, never ask a question already answered anywhere in the thread/JD/screening answers.

---

### D01 | samuel | warmup | Only Q3 (budget) answered
INPUT (response_type: warmup):
Job post (Jul 6): "Need a Google Ads expert for our epoxy flooring business. Budget for ads is $6,000/month."
Lead (Curt Weaver), Jul 8: "Booked a time on your calendar for Friday."
(Call booked on Samuel's calendar for Jul 11. Today is Jul 9.)
EXPECTED:
- Inventory: Q3 ANSWERED ($6,000/month from the job post). Q1, Q2, Q4, Q5, Q6, Q7 UNANSWERED
- Case C/D territory with 6 unanswered: a short list is acceptable (4+ unanswered)
- Does NOT ask about ad spend/budget in any form
- Profile video nudge included (video never mentioned) + optional YouTube sentence (samuel profile)
- Opens with a specific reference to the epoxy flooring business, not a generic "looking forward to speaking"

### D02 | samuel | warmup | Only website (Q7) answered
INPUT (response_type: warmup):
Job post (Jul 5): "Looking for PPC management. Our site is summitgaragefloors.com."
Lead (Elaine Fischer), Jul 8: "Just grabbed a slot on your calendar for Monday."
(Call booked on Samuel's calendar for Jul 13. Today is Jul 9.)
EXPECTED:
- Inventory: Q7 ANSWERED (summitgaragefloors.com). Q1-Q6 UNANSWERED
- Does NOT ask for the website
- Q3 (budget) MUST be among the questions asked -- it is mandatory when unanswered
- 6 unanswered = short list format acceptable; video nudge + optional YouTube (samuel)
- No pricing discussion, no spend floors, nothing that jeopardizes the booked call

### D03 [3x] | samuel | warmup | Replay-style: answers spread across JD + screening + messages
INPUT (response_type: warmup):
Job post (Jul 3): "Med spa in Scottsdale looking for Google/Meta management. Website: desertglowmedspa.com. We've been open 6 years."
Upwork screening question (Jul 3): "What is your monthly advertising budget?" Lead answer: "Around $8K/month."
Lead (Dr. Melissa Tran), Jul 6: "We used a big agency for two years, felt like a small fish in their pond. Left in March."
Lead (Dr. Melissa Tran), Jul 8: "Booked Thursday morning on your calendar."
(Call booked on Samuel's calendar for Jul 10. Today is Jul 9.)
EXPECTED:
- Inventory maps ALL sources: Q1 ANSWERED (prior agency, left in March -- from message), Q3 ANSWERED ($8K/month -- from screening answer), Q5 ANSWERED (open 6 years -- from JD), Q7 ANSWERED (desertglowmedspa.com -- from JD)
- UNANSWERED: Q2 (current strategy), Q4 (CPA/ROAS goal), Q6 (revenue) -- asks ONLY these three
- Asking about budget, prior agency, years in business, or website = hard fail (the #1 real-world failure this doc exists to prevent)
- Case C: conversational phrasing (3 unanswered = no numbered list), opening line references something she shared (e.g., the big-agency experience) without parroting "small fish in their pond"
- Video nudge + optional YouTube (samuel); under 150 words

### D04 [3x] | samuel | warmup | Vague "saw your stuff" -- video not confirmed
INPUT (response_type: warmup):
Job post (Jul 5): "Family law firm needs Google Ads help. Spending $5,500/month now, CPL target is $90. Site: hartleyfamilylaw.com."
Lead (Doug Hartley), Jul 7: "Saw your stuff, looks legit. Booked a call for next week."
(Call booked on Samuel's calendar for Jul 14. Today is Jul 9.)
EXPECTED:
- Step W2: "saw your stuff" does NOT name the profile video, an intro video, or anything that only appears in the video -- video status = NOT confirmed mentioned, so the profile video nudge SHOULD be included
- Inventory: Q2 ANSWERED (spending on Google now), Q3 ANSWERED ($5,500/month), Q4 ANSWERED ($90 CPL target), Q7 ANSWERED (hartleyfamilylaw.com). UNANSWERED: Q1, Q5, Q6
- Asks only Q1 (prior agency/freelancer experience), Q5 (years in business), Q6 (revenue) -- conversational, not a numbered list
- Does not parrot "saw your stuff" or "looks legit" back
- YouTube sentence optional (samuel); under 150 words

### D05 | samuel | warmup | Booked on Jay's calendar -- SKIP
INPUT (response_type: warmup):
Lead (Rosa Jimenez, house cleaning service, said "$1,800/month is what we can spend" on Jul 6), Jul 6: "That's our budget."
Samuel, Jul 7: "Hey Rosa, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead (Rosa Jimenez), Jul 8: "Booked with Jay for Friday, thanks!"
(Call booked on JAY's calendar for Jul 11. Today is Jul 9.)
EXPECTED:
- NO warmup message generated
- States the skip reason: lead booked on Jay's calendar, and Jay handles his own pre-call prep
- Does not send discovery questions, video nudges, or any message content

### D06 | samuel | warmup | Booked on Cade's calendar -- SKIP
INPUT (response_type: warmup):
Lead (Pete Andrada, ecom golf accessories), Jul 7: "Your partner's Meta breakdown was great. I booked the Thursday slot on Cade's calendar since he'll run the Meta side."
(Call booked on CADE's calendar for Jul 10. Today is Jul 9.)
EXPECTED:
- NO warmup message generated
- States the skip reason per samuel.md warmup eligibility: Cade handles his own warmups; only Samuel's/Peterson's calendar bookings get warmups on this profile
- No partial message, no questions sent

### D07 | samuel | warmup | Case A: all 7 answered + video watched
INPUT (response_type: warmup):
Job post (Jul 2): "Pest control company, 12 years in business, ~$2.1M annual revenue. Site: shieldlinepest.com. Currently running Google Ads ourselves at $7K/month, CPL target is $45. Tried one freelancer in 2024, communication died after a month."
Lead (Wes Latham), Jul 7: "Watched your intro video on your profile, the performance pricing part sold me. Booked for Monday."
(Call booked on Samuel's calendar for Jul 13. Today is Jul 9.)
EXPECTED:
- Inventory: ALL 7 ANSWERED (Q1 freelancer 2024, Q2 running Google themselves, Q3 $7K/month, Q4 $45 CPL, Q5 12 years, Q6 $2.1M, Q7 shieldlinepest.com); video EXPLICITLY confirmed watched
- Case A: 1-2 sentences, ZERO questions, NO video nudge, NO YouTube mention (YouTube only rides with the video nudge)
- References something specific (e.g., digging into their self-managed Google account or the CPL target on the call)
- No "I look forward to hearing from you" style close; no pricing talk despite his pricing comment

### D08 | samuel | warmup | Case B: all 7 answered, video NOT mentioned
INPUT (response_type: warmup):
Job post (Jul 4): "Ecom store selling standing desks (deskforge.com). $15K/month Meta+Google spend, 3.5x blended ROAS goal, in business 4 years, about $4M/year revenue. In-house marketer runs it now, no outside help before."
Lead (Ingrid Sorensen), Jul 8: "Booked Wednesday. Come ready, we move fast."
(Call booked on Samuel's calendar for Jul 15. Today is Jul 9.)
EXPECTED:
- Inventory: ALL 7 ANSWERED from the JD (Q1 no outside help before counts, Q2 in-house marketer runs it, Q3 $15K/month, Q4 3.5x ROAS, Q5 4 years, Q6 $4M, Q7 deskforge.com); video NOT mentioned anywhere
- Case B: profile video nudge (one natural sentence) + optional YouTube sentence + brief specific forward-look. NO discovery questions
- Forward-look references their specifics (e.g., the 3.5x blended target or the in-house setup)
- Short; matches her brisk energy without parroting "we move fast"

### D09 [3x] | samuel | warmup | Pricing question inside the booking message
INPUT (response_type: warmup):
Job post (Jul 5): "HVAC company needs PPC management. Site: comfortcorehvac.com."
Lead (Stan Brzezinski), Jul 8: "Booked your Friday slot. Also, what do you guys charge? Want to make sure we're in the same ballpark before I block more time on this."
(Call booked on Samuel's calendar for Jul 11. Today is Jul 9.)
EXPECTED:
- Warmup hard rule "protect the booked call": NO pricing discussion in the warmup -- no numbers, no percentage tiers, no fee terminology, no spend floors, no disqualification language
- Acceptable handling of his pricing question: brief Stage-1-style deferral without numbers ("pricing is custom and performance-based, we'll get you exact numbers on Friday's call") -- it must acknowledge the question rather than ignore it, but give zero figures
- Inventory: Q7 ANSWERED (comfortcorehvac.com); Q1-Q6 UNANSWERED, so Q3 (budget) is mandatory among the asks
- Video nudge included (not mentioned); no calendar link (he already booked)
- Does not parrot "same ballpark"

### D10 | samuel | warmup | Hostile tone
INPUT (response_type: warmup):
Job post (Jul 6): "Roofing contractor. $9K/month ad budget. roofwrightexteriors.com. Third time hiring for this, last two 'experts' burned us."
Lead (Earl Wright), Jul 8: "Fine, I booked your Thursday slot. This better be worth my time, I've heard every pitch there is."
(Call booked on Samuel's calendar for Jul 10. Today is Jul 9.)
EXPECTED:
- Tone stays confident and low-friction: no groveling, no over-apologizing, no defensiveness, no "I understand your frustration" filler, no promising outcomes
- Inventory: Q1 ANSWERED (two prior experts burned them), Q3 ANSWERED ($9K/month), Q7 ANSWERED (roofwrightexteriors.com). UNANSWERED: Q2, Q4, Q5, Q6
- Asks only the unanswered four (short list acceptable at 4+); does NOT ask what went wrong with past providers in a way that re-asks Q1
- Does not parrot "worth my time" or "heard every pitch"; no seal clapping about his skepticism
- Video nudge + optional YouTube (samuel); nothing that jeopardizes the call

### D11 | samuel | warmup | Lead pasted Fathom-style call notes covering nearly everything
INPUT (response_type: warmup):
Lead (Monique Sabourin, boutique hotel group), Jul 7: "Booked Tuesday. So you're prepped, here are the notes my assistant took from our internal marketing review last week:
- Currently running: Google Hotel Ads + brand search in-house, paused Meta in May
- Spend: $11K/month, want to stay near that
- Target: $140 cost per direct booking (currently $210)
- Properties open since 2013 (11 years... actually 13 now)
- Revenue: roughly $6.5M/year across 3 properties
- Past help: worked with a hospitality agency 2022-2024, left over reporting transparency"
(Call booked on Samuel's calendar for Jul 14. Today is Jul 9.)
EXPECTED:
- Mines the pasted notes as answers: Q1 ANSWERED (hospitality agency 2022-2024), Q2 ANSWERED (Hotel Ads + brand search, Meta paused), Q3 ANSWERED ($11K/month), Q4 ANSWERED ($140 target), Q5 ANSWERED (since 2013), Q6 ANSWERED ($6.5M). UNANSWERED: Q7 (website) only
- Asks ONLY for the website, woven naturally into 1-2 sentences -- not a list
- Video nudge (not mentioned) + optional YouTube (samuel)
- Opening references a specific from her notes in own words (e.g., the direct-booking cost gap) without quoting the notes back
- No multi-paragraph diagnostic analysis of the notes; the call is where that happens

### D12 | samuel | warmup | Vague budget ("decent budget") does not count as Q3 answered
INPUT (response_type: warmup):
Job post (Jul 6): "Chiropractic clinic, opened 2019, currently doing SEO and referrals only, no paid ads yet. spinealignchiro.com. We have a decent budget for the right person."
Lead (Dr. Colin Freed), Jul 8: "Booked Monday afternoon."
(Call booked on Samuel's calendar for Jul 13. Today is Jul 9.)
EXPECTED:
- "Decent budget" is NOT a dollar amount or approximate range -- Q3 remains UNANSWERED and is MANDATORY in the message
- Inventory: Q1 ANSWERED (no paid help before is inferable from "no paid ads yet" + SEO/referrals only -- agent may reasonably mark Q1/Q2 answered from this), Q2 ANSWERED (SEO and referrals), Q5 ANSWERED (opened 2019), Q7 ANSWERED (spinealignchiro.com). UNANSWERED at minimum: Q3, Q4, Q6
- Asks Q3 explicitly (planned monthly ad investment), plus Q4 and Q6
- No spend floors, minimums, or pricing talk; video nudge + optional YouTube (samuel)

### D13 | samuel | warmup | Case D: all 7 unanswered, minimal thread
INPUT (response_type: warmup):
Lead (Benny Okafor), Jul 8: "Hey, found you through your profile, we run a chain of barbershops and need help with ads. Booked a call for Friday."
(Call booked on Samuel's calendar for Jul 11. Today is Jul 9. No job description exists -- profile-direct booking.)
EXPECTED:
- Inventory: ALL 7 UNANSWERED (barbershop chain context answers nothing in the matrix)
- Case D: video nudge first, then the questions -- a short list is fine with 7
- Still personalized: references the barbershop chain / multi-location angle, not a generic "looking forward to speaking with you" open
- Q3 included; no pricing, no calendar link, no attachments
- May exceed 150 words given 5+ unanswered questions, but stays tight

### D14 | samuel | warmup | Revenue given, budget still missing (Q6 vs Q3 confusion trap)
INPUT (response_type: warmup):
Job post (Jul 5): "Custom closet installation company doing $1.2M/year. Been at it since 2016. closetcraftco.com. Ran our own Meta ads last year, mediocre results."
Lead (Grace Palmieri), Jul 8: "Booked Thursday with you."
(Call booked on Samuel's calendar for Jul 10. Today is Jul 9.)
EXPECTED:
- Does NOT treat the $1.2M revenue figure as an ad budget: Q6 ANSWERED ($1.2M/year), Q3 (ad spend/planned investment) still UNANSWERED and MANDATORY
- Inventory: Q1 ANSWERED (ran own Meta ads), Q2 ANSWERED (self-run Meta last year), Q5 ANSWERED (since 2016), Q6 ANSWERED, Q7 ANSWERED (closetcraftco.com). UNANSWERED: Q3, Q4
- Asks only Q3 and Q4, conversationally (2 questions = no numbered list)
- Does not re-ask revenue, years, website, or past-ads experience; does not parrot "mediocre results"
- Video nudge + optional YouTube (samuel); under 150 words

### D15 | lindsey | warmup | Case C on Lindsey profile -- no YouTube ever
INPUT (response_type: warmup):
Job post (Jul 6): "Handmade jewelry brand on Shopify (lunavelvetjewelry.com) looking for Meta ads + email flows. Spending about $4,500/month on Meta now."
Lead (Opal Reyes), Jul 8: "Booked on your Calendly for Monday!"
(Call booked on LINDSEY's calendar for Jul 13. Today is Jul 9.)
EXPECTED:
- Inventory: Q2 ANSWERED (running Meta now), Q3 ANSWERED ($4,500/month), Q7 ANSWERED (lunavelvetjewelry.com). UNANSWERED: Q1, Q4, Q5, Q6
- Asks only the four unanswered (short list acceptable at 4+)
- Profile video nudge included (not mentioned) but NO YouTube channel sentence -- the Creekside channel never appears in Lindsey warmups
- No pricing/spend-floor talk even though $4,500 is sub-$5K: the call is booked and protected; Jay routing, if any, happens on/after the call, never in the warmup
- No agency/co-founder mention, no sign-off name, no calendar link

### D16 | lindsey | warmup | Case B on Lindsey profile: all answered, video not mentioned
INPUT (response_type: warmup):
Job post (Jul 4): "DTC organic tea brand, steepandstone.com, founded 2021, ~$900K/year revenue. Running Meta at $6K/month through a freelancer we're replacing (results flatlined). Target is 3x ROAS blended."
Lead (Naomi Feld), Jul 8: "Grabbed the Wednesday slot on your calendar."
(Call booked on LINDSEY's calendar for Jul 15. Today is Jul 9.)
EXPECTED:
- Inventory: ALL 7 ANSWERED from the JD (Q1 freelancer being replaced, Q2 Meta at $6K via freelancer, Q3 $6K/month, Q4 3x ROAS, Q5 founded 2021, Q6 $900K, Q7 steepandstone.com); video NOT mentioned
- Case B: profile video nudge + brief specific forward-look, ZERO questions
- NO YouTube sentence (lindsey profile hard rule)
- Forward-look in Lindsey's "what I've seen/done" register, referencing something specific (e.g., flatlined Meta results pattern) without parroting "flatlined"
- No sign-off, no agency mention, no calendar link

### D17 | lindsey | warmup | Booked on Jay's calendar via Lindsey thread -- SKIP
INPUT (response_type: warmup):
Lead (Denny Ruiz, food truck fleet, said "$1,000/month tops for ads" on Jul 6), Jul 6: "That's the whole budget."
Lindsey, Jul 7: "Hey Denny, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead (Denny Ruiz), Jul 8: "Cool, booked with Jay for Monday."
(Call booked on JAY's calendar for Jul 13. Today is Jul 9.)
EXPECTED:
- NO warmup message generated
- States the skip reason per lindsey.md warmup eligibility: booked on Jay's calendar, Jay handles his own pre-call prep
- No questions, no video nudge, no message content of any kind

### D18 | lindsey | warmup | Case A on Lindsey profile: all answered + video confirmed
INPUT (response_type: warmup):
Job post (Jul 3): "Women's athleisure brand (movewellactive.com), 5 years in, $2.8M/year. Meta spend $12K/month via an agency we just exited (creative went stale). CPA target $38, currently at $55. Also doing Klaviyo email in-house."
Lead (Carla Jenks), Jul 8: "Watched your intro video, love that you actually built and sold your own store. Booked Thursday."
(Call booked on LINDSEY's calendar for Jul 10. Today is Jul 9.)
EXPECTED:
- Inventory: ALL 7 ANSWERED (Q1 exited agency, Q2 Meta via agency + Klaviyo in-house, Q3 $12K/month, Q4 $38 CPA target, Q5 5 years, Q6 $2.8M, Q7 movewellactive.com); video EXPLICITLY confirmed
- Case A: 1-2 sentences, no questions, no video nudge, no YouTube (never for lindsey anyway)
- References a specific (e.g., getting CPA from $55 toward $38, or the stale-creative problem) in her own "seen/done" register
- Does not parrot "creative went stale"; no sign-off; no pricing talk

### D19 | lindsey | warmup | Google Ads scope question inside the booking message
INPUT (response_type: warmup):
Job post (Jul 5): "Skincare ecom brand (poreloveskin.com) spending $10K/month on Meta, 4x ROAS goal."
Lead (Farrah Motlagh), Jul 8: "Booked your Tuesday slot. Quick one before then: could you take over our Google Ads too down the line? Trying to consolidate vendors."
(Call booked on LINDSEY's calendar for Jul 14. Today is Jul 9.)
EXPECTED:
- Answers her Google Ads question with depth-over-breadth positioning: Lindsey does Meta and email only, no apology, no weakness framing
- NEVER refers a partner, co-founder, colleague, or "someone on the team" for Google Ads (documented lindsey.md failure); no Jay routing ($10K/month = qualified, and Jay is budget-routing only)
- Inventory: Q2 ANSWERED (Meta now), Q3 ANSWERED ($10K/month), Q4 ANSWERED (4x ROAS), Q7 ANSWERED (poreloveskin.com). UNANSWERED: Q1, Q5, Q6 -- asks only those three, conversationally
- Video nudge (not mentioned); NO YouTube sentence; no calendar link; no sign-off

### D20 | lindsey | warmup | Replay-style spread across screening + messages on Lindsey profile
INPUT (response_type: warmup):
Job post (Jul 4): "Meal delivery service in Austin needs Meta ads + email help."
Upwork screening question (Jul 4): "How long have you been in business?" Lead answer: "Launched in 2022, so three years... four next month actually."
Upwork screening question (Jul 4): "What is your website?" Lead answer: "atxfreshplates.com"
Lead (Marisol Duarte), Jul 6: "We've had two freelancers run our Meta ads since 2023. Second one just wrapped up last week. Spending $5K/month."
Lead (Marisol Duarte), Jul 8: "Booked Friday morning on your Calendly."
(Call booked on LINDSEY's calendar for Jul 11. Today is Jul 9.)
EXPECTED:
- Inventory across all sources: Q1 ANSWERED (two freelancers since 2023 -- message), Q2 ANSWERED (Meta ads via freelancers -- message), Q3 ANSWERED ($5K/month -- message), Q5 ANSWERED (launched 2022 -- screening), Q7 ANSWERED (atxfreshplates.com -- screening). UNANSWERED: Q4 (CPA/ROAS goal), Q6 (revenue)
- Asks ONLY Q4 and Q6, woven conversationally (2 questions = no list)
- Re-asking budget, years, website, or freelancer history = hard fail
- Video nudge included (not mentioned); NO YouTube sentence (lindsey)
- Opening references something she shared (e.g., the freelancer handoff) in own words; no sign-off; under 150 words
