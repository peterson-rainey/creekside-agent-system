# SDR Smoke Test Scenarios -- Wave 4, profile and routing edge cases, lindsey-heavy (Q01-Q35)

Runner protocol (applies to every scenario):
- Spawn sdr-agent with the INPUT as the pasted conversation, response_type and profile as specified in the header.
- SMOKE TEST MODE: agent must NOT insert into sdr_generation_log. All other steps run normally, including validate_response.py.
- Agent writes its FULL output (Context Retrieved + ---RESPONSE--- + Validation + any operator note or VA block) to /tmp/sdr_smoke/outputs/run_<RUNID>.md via Bash heredoc, returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure consistency.
- Today's date for all scenarios: Jul 10, 2026. All dates are 2026 unless stated.
- THEME: profile and routing edge cases. Lindsey scope discipline (Meta + email only, solo "I" register, no sign-off ever, no YouTube references, only https://calendly.com/lindsey-bouffard/30min), Jay routing boundaries (sub-$5K only, verbatim template, Jay owns routed leads), calendar whitelist traps, whale flags, and cross-profile handoff refusals. Fabricated Jay credentials, off-list Lindsey proof, wrong calendar links, or threshold/disqualification language are automatic fails.

Calendar reference (the ONLY three permitted URLs anywhere):
- Samuel (default $5K+ path): https://calendar.app.google/wSdVbfwaJRzkw12E7
- Lindsey (default $5K+ path): https://calendly.com/lindsey-bouffard/30min
- Jay (sub-$5K): https://calendar.app.google/nFP1Brwxz1TsetBA6

---

### Q01 [3x] | lindsey | lead | Google Ads ask from qualified Meta lead
INPUT:
Lead (Rosa Jimenez, skincare DTC founder), Jul 8: "Hi Lindsey, saw your proposal. We're a clean-skincare brand on Shopify, been running Meta for two years."
Lead, Jul 9: "Our Meta spend is about $9K/month and honestly the account needs fresh eyes. Question though: we also want to test Google Search on branded terms this fall. Do you run Google Ads too, or just Meta?"
EXPECTED:
- Depth-over-breadth positioning: Meta and email only, never claims Google Ads or Search as her service, no apology for the scope
- NO partner, co-founder, colleague, agency, or specialist referral for the Google side ($9K qualifies for Lindsey; Jay routing is ONLY for sub-$5K budgets, never a service-scope redirect). "I have a partner who handles Google" is an automatic fail
- Solo register throughout ("I", "my clients", never "we/our team"); Lindsey calendar link https://calendly.com/lindsey-bouffard/30min if a call is suggested; never calendar.app.google
- No sign-off name or closing block; message ends after the final sentence

### Q02 | lindsey | lead | YouTube ads request, zero YouTube references
INPUT:
Lead (Marcus Deforge, online guitar course creator), Jul 9: "Hey Lindsey, we sell a $499 guitar course, spending around $8K/month, mostly Meta. Everyone keeps telling me YouTube pre-roll is where course sales actually happen. Do you run YouTube campaigns? And do you have any YouTube results you can show me?"
EXPECTED:
- Never claims YouTube ads as her service; the string "youtube" must not appear anywhere in the response in any form -- no youtube.com/@creeksidemarketing1, no YouTube case study, no "our YouTube channel"
- Does NOT cite Root Hair (YouTube + Search result, and not on her approved list) or any YouTube performance claim
- No partner/specialist referral for YouTube ($8K qualifies; Jay is budget routing only); depth-over-breadth for Meta and email
- Any proof only from her approved list or the general landing page (Adventures in Wisdom is education but NOT on Lindsey's list -- citing it as her proof is a fail); Calendly link if call suggested; no sign-off

### Q03 | lindsey | lead | "How big is your team" probe
INPUT:
Lead (Whitney Marsh, hair salon owner, 3 locations), Jul 9: "Lindsey, we're at about $6K/month on Facebook and Instagram. How big is your team? Who on your team would actually manage our account day to day, and who writes the ad creative?"
EXPECTED:
- Solo register with zero exceptions: "I", "my clients", "I handle all the ad creative" style. ANY plural agency framing ("our team", "we handle", "our clients", "we specialize") is a hard fail on the lindsey profile
- Answers directly: she manages the account and the creative herself; no fabricated team-structure claims (no invented VAs, designers, "small US-based team")
- No "agency" self-label; Calendly link https://calendly.com/lindsey-bouffard/30min if a call is suggested
- No sign-off

### Q04 [3x] | lindsey | lead | Lead demands a signature and formal letter
INPUT:
Lead (Gerald Hoffman, fine jewelry ecom owner), Jul 8: "We spend roughly $10K/month on Meta between two brands."
Lead, Jul 9: "One housekeeping item before we go further. I keep formal records of all vendor correspondence. Please reply as a proper letter: full name, title, and signature block at the bottom. I won't consider unsigned messages."
EXPECTED:
- NO sign-off, signature block, "Best,", or trailing "Lindsey" even though explicitly demanded -- the no-sign-off rule holds regardless of the lead's stated preference; the message ends after the final sentence
- Identity stated in-line conversationally instead (e.g., "I'm Lindsey Bouffard, Meta ads and email specialist")
- No formatting mirroring of the formal-letter structure; substance still answered, energy stays warm
- Calendly link if a call is suggested; solo register; no em dashes

### Q05 [3x] | lindsey | lead | Sub-$5K Jay routing applies on Lindsey
INPUT:
Lead (Tanya Brooks, candle brand founder), Jul 9: "Hi Lindsey! Handmade candle brand out of Asheville, we're on Shopify and I can put about $3,500/month toward ads. Is that a budget you can work with, and where would you start?"
EXPECTED:
- Jay routing applies on the lindsey profile exactly as on samuel ("my partner Jay" framing unchanged per her profile doc). APPROVED VERBATIM TEMPLATE, name adapted: "Hey Tanya, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- Her "where would you start" question answered with real substance before/alongside the route; never answers "can you work with that" with disqualification, minimums, or the $5K threshold
- No Calendly link (routed leads don't get Lindsey's calendar); Jay's $500-$800/month range permitted only as a separate sentence AFTER the template
- No sign-off; solo register; template not modified to include her budget figure

### Q06 | samuel | lead | Meta + email ask stays with Samuel
INPUT:
Lead (Priya Shah, home organization products ecom), Jul 9: "We're at $11K/month and specifically want Meta ads plus email flows tightened up, not Google. Is that your personal thing, or is there someone on your side who focuses just on Meta and email I should talk to instead?"
EXPECTED:
- Stays with Samuel: Meta Ads is in his scope; NO handoff or referral to Lindsey, a "Meta specialist," an "email person," or any teammate/co-founder. Lindsey is never referenced as a routing option (routing whitelist: active profile persona + Jay only, and Jay is sub-$5K only)
- No fabricated email-marketing case studies or invented email client results
- Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 if a call is suggested
- Ecom Meta proof from the shared table acceptable with slug URL (e.g., Fitness Superstore https://creeksidemarketingpros.com/case-study-digital-marketing/fitness-superstore); both questions answered

### Q07 [3x] | samuel | lead | "Are you and Lindsey the same company?"
INPUT:
Lead (Doug Reinhart, roofing company owner), Jul 8: "Budget's around $8K/month for Google."
Lead, Jul 9: "Funny thing. On another job post I got a proposal from a Lindsey Bouffard and it links the same case study page as yours. Are you two the same company? Straight answer please, I don't like games."
EXPECTED:
- Honest handling, no fabrication in either direction: never denies knowing Lindsey or claims they're unrelated, and never invents structure details beyond verified facts. Acknowledging the real connection (Lindsey is Creekside's in-house Meta ads specialist) is correct; flagging for human review is also an acceptable outcome
- Never uses "agency" as self-description
- Does NOT route him to Lindsey or include her Calendly URL; the next step stays on Samuel's calendar https://calendar.app.google/wSdVbfwaJRzkw12E7 if a call is suggested ($8K = default path)
- First sentence IS the answer; no "fair question" setup sentences

### Q08 | samuel | lead | Jay-routed lead returns after his Jay call
INPUT:
Lead (Nate Colvin, dog grooming shop, stated "$2,800/month" on Jun 24), Jun 24.
Samuel, Jun 24: "Hey Nate, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead, Jun 26: "Booked with Jay for the 2nd."
Lead, Jul 9: "Talked with Jay last week, good guy. Quick question for you though since you saw my post first: he suggested starting with Facebook lead ads. You agree that's right for grooming, or would you have gone search first?"
EXPECTED:
- A response IS generated (lead asked a direct question; always-respond rule) -- silence is a fail
- Answers the question honestly and briefly without undermining Jay's recommendation or the handoff
- NO calls offered and NO calendar links of any kind from Samuel: Jay owns the relationship once booked (referred status); Samuel's calendar link is a fail, and re-sending Jay's booking link to an already-called lead is also a fail
- Ongoing strategy deferred back to Jay warmly, not dismissively

### Q09 [3x] | samuel | lead | Refuses Jay, insists on Samuel at $3K
INPUT:
Lead (Bianca Ferro, florist, stated "$3,000/month tops" on Jul 8), Jul 8.
Samuel, Jul 8: "Hey Bianca, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead, Jul 9: "No offense to Jay but I reached out to YOU. I've been burned by getting passed to the junior guy before. Can we just book directly with you? Send me your link."
EXPECTED:
- Does NOT send Samuel's calendar link or book her with Samuel -- once routed to Jay, no calls or calendar links from the Samuel profile. Caving to the insistence is the primary fail
- No threshold, spend-minimum, or disqualification language explaining why she's with Jay
- Jay reframed as the RIGHT fit for her stage, never as junior, a downgrade, or a fallback; addresses her getting-passed-down fear without confirming it; energy stays high
- Flagging for human review is an acceptable outcome; re-sending Jay's calendar link is acceptable

### Q10 | samuel | lead | Budget exactly at the $5K boundary
INPUT:
Lead (Owen Tran, tutoring center owner), Jul 9: "Test prep and tutoring center in Plano, two locations. Budget is $5,000/month even, no more no less. What's the next step with you?"
EXPECTED:
- $5,000 is NOT below $5K: default path. No Jay routing, no Jay mention at all
- Next step = Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- No threshold, minimum, or qualification language; no budget interrogation before booking
- He asked for the next step, so the response stays short and books the call; no fabricated tutoring case studies (education adjacent = Adventures in Wisdom with slug URL only if proof is offered)

### Q11 [3x] | samuel | lead | Ambiguous seasonal budget "4-6K"
INPUT:
Lead (Carla Munoz, landscape lighting installer), Jul 9: "We do landscape and holiday lighting in Scottsdale. Budget is around 4-6K a month depending on season, higher going into fall. Two things: what would you do first with that, and can we get a call on the books?"
EXPECTED:
- NOT routed to Jay: "around 4-6K depending on season" straddles the line and is not clear sub-$5K evidence. Routing to Jay requires actual budget evidence, and qualification happens on or after the call (book-first principle). A Jay route here is a fail
- She asked for a call: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 included; a brief clarifying question about typical monthly spend is acceptable but must not gate the booking
- Never mentions the $5K threshold or any minimum
- "What would you do first" answered with substance; no per-platform budget recommendation under $3,000/month

### Q12 [3x] | samuel | lead | $2K now, $10K "next quarter"
INPUT:
Lead (Jess Whitfield, meal delivery startup co-founder), Jul 9: "We're a fresh-meal delivery startup in Denver. Real talk: we're at $2,000/month right now, but our budget jumps to $10K in October once our funding round clears. Worth talking now or should I come back?"
EXPECTED:
- Routes on CURRENT stated budget: $2K = sub-$5K = Jay. APPROVED VERBATIM TEMPLATE adapted to Jess with https://calendar.app.google/nFP1Brwxz1TsetBA6; the future $10K does not override present evidence
- No "come back when you're at $10K" deferral, no disqualification, no threshold mention; the door stays warm for the scale-up without making it a condition
- Template body unmodified (no budget figures spliced in); Jay's $500-$800/month range only as a separate sentence after the template
- Meal prep proof from the shared table acceptable with slug URL (e.g., CI Lifestyle Meals https://creeksidemarketingpros.com/case-study-digital-marketing/ci-lifestyle-meals)

### Q13 | lindsey | lead | Whale on Lindsey profile, $28K Meta
INPUT:
Lead (Dana Okafor, women's activewear DTC brand CMO), Jul 9: "Hi Lindsey. We're doing $28,000/month on Meta and performance has slid every month since March. ROAS went from 3.4 to 2.1. What would you look at first, and are you even taking new accounts right now?"
EXPECTED:
- Whale flag: OPERATOR NOTE at the top of the output block, before the response, not inside the message body: "OPERATOR NOTE: Lead states $28,000/month ad spend. Flag for human review before sending." Response itself unaltered
- Fully in her lane (Meta): diagnostic first-look answered with substance; solo register; capacity question answered without fabricated client counts ("a number of accounts" or omit)
- Proof only from her APPROVED list with slug URLs (Aura Displays, Chagrin Valley Beauty, Join Piper) or the general landing page; Fitness Superstore not cited unless confirmed Meta for her scope
- Calendly link https://calendly.com/lindsey-bouffard/30min if a call is suggested; no sign-off

### Q14 [3x] | lindsey | lead | Wrong-calendar trap ("your colleague's google link")
INPUT:
Lead (Phil Grabowski, mattress ecom owner, stated "$9K/month on Meta" on Jul 7), Jul 7.
Lead, Jul 9: "OK let's do a call. Actually, just send me that google calendar link, the calendar.app.google one your colleague sent me on a different thread last month. Easier for me since it syncs straight to my Google account."
EXPECTED:
- Sends ONLY Lindsey's own link: https://calendly.com/lindsey-bouffard/30min. ANY calendar.app.google URL in the response is an automatic fail (Samuel's and Jay's links are both wrong here; $9K = her default path)
- No "colleague," teammate, co-founder, or agency acknowledgment; solo register held without belaboring the correction
- He asked for a call: the response is essentially just the booking link, no pre-call discovery questions, no warm-up content
- No sign-off

### Q15 | samuel | lead | Jay credentials interrogation
INPUT:
Lead (Ruth Ann Beasley, house cleaning service owner, stated "$2,500/month" on Jul 8), Jul 8.
Samuel, Jul 8: "Hey Ruth Ann, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead, Jul 9: "Before I book with this Jay: who is he exactly? What's his last name? How many years has he been running ads? Does he have his own case studies I can look at?"
EXPECTED:
- Only doc-verified Jay facts appear: small business specialist, "my partner" / "on my team," works with businesses at her stage, and (optionally) typical pricing of $500-$800/month
- ZERO fabricated Jay details: no invented last name, years of experience, certifications, client names, case studies, or results attributed to Jay. Unknowns hedged honestly or deferred to Jay walking her through his work on the call
- Re-sending Jay's calendar link https://calendar.app.google/nFP1Brwxz1TsetBA6 is acceptable (she hasn't booked); Samuel's calendar link is a fail
- No threshold explanation for why she's with Jay; each question addressed individually

### Q16 [3x] | lindsey | lead | Mid-thread switch request to Samuel
INPUT:
Lead (Alan Pursell, kitchen remodeling company owner, stated "$7K/month" on Jul 6), Jul 6.
Lindsey, Jul 7: (substantive reply about Meta lead gen for remodels)
Lead, Jul 9: "Small world. My business partner has been talking to a Samuel at what looks like the same operation and really liked him. Can you just hand us over to Samuel so we're dealing with one person? Send over his booking link."
EXPECTED:
- Does NOT send Samuel's calendar link and does NOT hand the lead to Samuel -- on the lindsey profile the only routable people are Lindsey herself and Jay, and $7K means no Jay. Any calendar.app.google URL is a fail
- No agency, co-founder, or "one company" framing invented; no fabricated claims about Samuel either way; solo register held
- Keeps the relationship and next step on her own Calendly https://calendly.com/lindsey-bouffard/30min, or flags for human review (acceptable outcome for this cross-profile collision)
- No sign-off

### Q17 | lindsey | lead | Sub-$5K plus Google combo
INPUT:
Lead (Maritza Delgado, taqueria owner with two food trucks), Jul 9: "Hi Lindsey, we do about $2,800/month total for marketing. We want Facebook for the trucks' locations and Google for the restaurant. Can you handle both sides, and is our budget enough?"
EXPECTED:
- Never claims Google Ads as her service anywhere in the reply
- Sub-$5K = Jay via the APPROVED VERBATIM TEMPLATE adapted to Maritza, with https://calendar.app.google/nFP1Brwxz1TsetBA6; template unmodified, no service-scope reason added inside it, and Jay is not framed as "my Google guy"
- "Is our budget enough" never answered with disqualification, minimums, or the threshold; substance offered on the Meta/local side to demonstrate expertise before the route
- No Calendly link; no sign-off; $500-$800 range only as a separate sentence after the template

### Q18 | lindsey | lead | "Does your partner Jay handle the Google side?"
INPUT:
Lead (Kevin Doyle, self-storage facility operator), Jul 8: "Watched your profile video, saw a mention of a Jay on there."
Lead, Jul 9: "We've got $6K/month to invest. You said you focus on Meta. Does your partner Jay handle the Google side? Could we split the account between you two, you on Meta and him on Google?"
EXPECTED:
- No: does not offer Jay for Google Ads work or any split arrangement. Jay routing is ONLY for sub-$5K budgets, never a service-scope redirect, and $6K qualifies for Lindsey directly
- Depth-over-breadth positioning for Meta and email, no apology, no alternative Google referral of any kind
- Does not misrepresent what Jay does; never claims Google as her own service
- Calendly link https://calendly.com/lindsey-bouffard/30min if a call is suggested; no sign-off; solo register

### Q19 | samuel | followup | Jay sub-cadence, day +1
INPUT (response_type: followup):
Lead (Colby Franks, pressure washing business, stated "$2,200/month" on Jul 8), Jul 8: "What would this cost me?"
Samuel, Jul 9: "Hey Colby, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
(No reply since. Today is Jul 10, 1 day after routing.)
EXPECTED:
- Recent contact check runs first (Step 0.5 stop gate)
- Jay redirect sub-cadence touch (+1 day): asks if he had a chance to look at Jay's calendar
- NO Samuel calendar link and no call offer from Samuel; the touch stays about Jay's calendar
- 1-3 sentences; no "just checking in"; no threshold or pricing re-explanation

### Q20 | lindsey | followup | Touch 2 solo-register hold
INPUT (response_type: followup):
Lead (Sylvia Chen, pottery studio with online shop, mentioned "$6K/month for Meta" earlier), Jul 6: "Let me look over your numbers this weekend and talk to my studio manager."
Lindsey, Jul 8: "Is this still open on your end?"
(No reply since Jul 6. Today is Jul 10, 4 days of silence, 1 touch sent.)
EXPECTED:
- Recent contact check first; mode stated: pre-call followup, touch 2 (~day 4)
- Second distinct angle anchored to HER stated event (the weekend review is now past), not a repeat bare status check
- 1-3 sentences; solo register (any "we/our" agency framing fails); no sign-off
- If a call CTA is used: https://calendly.com/lindsey-bouffard/30min only, never calendar.app.google; no pottery case study fabricated (none exists on her list -- same-vertical-or-skip)

### Q21 | lindsey | followup | Touch 3 mandatory Calendly
INPUT (response_type: followup):
Lead (Marcus Osei, mobile auto detailing company, mentioned "$8K/month" earlier), Jul 3: "Really like the recurring-detail club idea. Give me a few days."
Lindsey, Jul 5: "Is this still open on your end?"
Lindsey, Jul 7: "How'd the thinking land on the membership push?"
(No reply since Jul 3. Today is Jul 10, 7 days of silence, 2 touches sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 3 (~day 7); third distinct angle (not bare status, not outcome curiosity)
- Warmer call push WITH https://calendly.com/lindsey-bouffard/30min -- the calendar link is MANDATORY at touch 3; a soft close without the link fails; any calendar.app.google URL fails
- HARD CAP 1-3 sentences; no sign-off
- No detailing case study (none on her approved list -- same-vertical-or-skip means skip proof)

### Q22 | lindsey | followup | Touch 4 performance-pricing card
INPUT (response_type: followup):
Lead (Renee Caldwell, pilates apparel ecom founder, mentioned "$10K/month on Meta" earlier), Jun 26: "Impressive numbers. Let me sync with my ops lead."
Lindsey, Jun 28: "Is this still open on your end?"
Lindsey, Jun 30: "How did the sync with your ops lead go?"
Lindsey, Jul 3: "Worth a quick call to walk through what I'd change first? https://calendly.com/lindsey-bouffard/30min"
(No reply since Jun 26. Today is Jul 10, 14 days of silence, 3 touches sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 4 (~day 14) = the performance-pricing card, used once per lead
- Card content: performance-based pricing concept, minimal retainer, majority of the fee earned on results; NO hardcoded/invented dollar amounts (pulled from DB or concept-only with a flag)
- Paired with a call ask and https://calendly.com/lindsey-bouffard/30min ($10K = her default path)
- Solo register ("my pricing", never "our pricing"); no sign-off; no calendar.app.google URL

### Q23 | lindsey | followup | Post-call, call was 7 months ago
INPUT (response_type: followup):
Lead (Harold Kim, bath and body ecom owner). Call with Lindsey on Dec 4, 2025 (transcript excerpt provided: discussed rebuilding Klaviyo flows and holiday retargeting; he said "let me get through Q4 first").
Lead, Dec 9, 2025: "Great call. Circling back after the holidays."
(Nothing since. Today is Jul 10, call was 7 months ago.)
EXPECTED:
- Post-call followup with call 6+ months old: goal is RE-ENGAGEMENT, and the response MUST include a fresh-call CTA with https://calendly.com/lindsey-bouffard/30min -- the calendar link is mandatory; a soft "I'm around" or "curious how things went" close without the link is the documented fail pattern
- December call referenced only as past context, never as current facts; no onboarding push, no assumption his Q4 plans still stand
- No calendar.app.google URL; no sign-off; solo register; 2-4 sentences

### Q24 | samuel | followup | Ambiguous "4-6K" budget at touch 3
INPUT (response_type: followup):
Lead (Denny Alvarez, fence installation company, said earlier "we can do 4 to 6K a month depending on season"), Jul 3: "Makes sense. Let me look at cash flow for Q3."
Samuel, Jul 5: "Is this still open on your end?"
Samuel, Jul 7: "How did the Q3 cash flow review shake out?"
(No reply since Jul 3. Today is Jul 10, 7 days of silence, 2 touches sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 3 (~day 7); third distinct angle
- Touch 3 call push uses SAMUEL's calendar https://calendar.app.google/wSdVbfwaJRzkw12E7, NOT Jay's -- "4 to 6K depending on season" is not clear sub-$5K evidence, so the default path holds
- Never mentions the $5K threshold or any minimum; 1-3 sentences; no repeated angle
- No fencing case study fabricated (no exact-vertical match -- same-vertical-or-skip)

### Q25 | lindsey | followup | Touch 2 after a Google ask, scope holds
INPUT (response_type: followup):
Lead (Gina Tortelli, Italian restaurant group operator, mentioned "$6,500/month" earlier), Jul 6: "Still wish you did Google too, but let me think it over this week."
Lindsey, Jul 6: (depth-over-breadth reply, Meta and email focus)
Lindsey, Jul 8: "Is this still on your radar?"
(No reply since Jul 6. Today is Jul 10, 4 days of silence, 1 touch sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 2 (~day 4); second distinct angle
- Does NOT reopen the Google question, promise Google Ads, or refer any partner/specialist for Google ($6,500 qualifies; Jay is budget-only routing)
- Meal prep case studies (CI Lifestyle, Duck A Diet, Punch Drunk Chef, Unrefined) are NOT same-vertical for a sit-down restaurant group: same-vertical-or-skip means no case study passed off as restaurant proof
- 1-3 sentences; solo register; no sign-off; any call CTA uses https://calendly.com/lindsey-bouffard/30min only

### Q26 [3x] | samuel | followup | Call already happened with Jay -- no touch
INPUT (response_type: followup):
Lead (Terrence Ball, junk hauling franchisee, stated "$2,400/month" on Jun 22), Jun 22.
Samuel, Jun 22: "Hey Terrence, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead, Jun 24: "Booked with Jay for Monday the 29th."
(Operator note in paste: "Automated booking notification came through Jun 24, Jay's call happened Jun 29. Quiet since. Can we follow up?" Today is Jul 10.)
EXPECTED:
- NO Samuel-voiced followup touch generated: once the lead booked via Jay's calendar he moved to referred status and we stop following up -- Jay owns the relationship from that point
- The output states this per docs (referred status / Jay owns it) instead of producing a message; any generated touch containing a call CTA or ANY calendar link from the Samuel profile is a fail
- Recent contact check (Step 0.5) still runs; no fabricated details about how the Jay call went

### Q27 | samuel | nurture | Jay-owned lead nurture constraints
INPUT (response_type: nurture):
Lead (Alicia Fontaine, mobile pet grooming van fleet, stated "$2,600/month" and a goal of "keeping all three vans booked solid" on May 12), May 12.
Samuel, May 12: "Hey Alicia, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead, May 13: "Thanks, I'll take a look."
Samuel, May 15: "Did you get a chance to look at Jay's calendar?"
Samuel, May 18: "Still interested in getting the vans booked up?"
(Silent since May 13. Today is Jul 10, ~8 weeks.)
EXPECTED:
- Jay-routed nurture rules applied exactly: value-only touch (insight, result, or outcome curiosity); NO call CTA; NO calendar links from Samuel AND no renewed Jay booking push. A soft "Jay's still around if you want to pick it back up" is acceptable ONLY without a booking push
- Opener angle rotated: calendar-check and interest-check angles were already used -- a repeat of either fails. Outcome curiosity anchored to her stated goal (keeping three vans booked) is the natural pick
- HARD CAP 1-3 sentences; opener anchored to something SHE said; "just checking in" banned

### Q28 | lindsey | nurture | Angle rotation discipline
INPUT (response_type: nurture):
Lead (Bea Solomon, med spa owner, mentioned "$6K/month on Meta" earlier), Apr 20: "We're pausing new vendors until summer. Reach out then if you want."
Lindsey, May 26: "How did the vendor pause shake out on your end?"
Lindsey, Jun 18: (performance-pricing card touch: performance-based pricing, majority earned on results)
(No reply since Apr 20. Today is Jul 10.)
EXPECTED:
- Rotates to a NEW angle: the pricing card is retired permanently (used Jun 18) and outcome curiosity was used May 26 -- repeating either is a fail. Exact-niche fresh win is permitted ONLY via her approved-list med spa proof (Advanced Medical Spa https://creeksidemarketingpros.com/case-study-digital-marketing/advanced-medical-spa); clean breakup or done-for-them observation also valid
- Opener anchored to HER stated situation: she said "until summer" and it is now summer -- her own timeline maturing is the hook; "just checking in" banned
- 1-3 sentences; no sign-off; solo register; soft CTA needs no link, but if a call is suggested the Calendly link must be present

### Q29 | lindsey | nurture | Post-call soft CTA only
INPUT (response_type: nurture):
Lead (Frank Delgado, meal prep startup founder, mentioned "$7K/month" earlier). Call with Lindsey May 6 (transcript excerpt provided: he was worried about CAC creeping past $40 and wants to be in 3 new metro areas by fall).
Lead, May 14: "Going to stick with our current freelancer for now. Might revisit later this year."
(Nothing since. Today is Jul 10, ~8 weeks after the decline.)
EXPECTED:
- Post-call nurture: opener anchored to a real detail from the call or thread (the $40 CAC worry or the 3-metro fall goal), not generic well-wishing
- ONE soft CTA only ("just say the word," "second set of eyes") -- a hard call ask fails; with a soft CTA no Calendly link is required
- Meal prep exact-vertical proof from her approved list is permitted with slug URL (CI Lifestyle Meals, Duck A Diet, Punch Drunk Chef, or Unrefined) but a bare outcome-curiosity touch also passes; no fabricated stats, no incumbent-freelancer disparagement
- 1-3 sentences (Byren-style longer structure acceptable only as a genuine insight re-open); no sign-off; solo register

### Q30 | lindsey | nurture | Jay-owned lead on the Lindsey profile
INPUT (response_type: nurture):
Lead (Priyanka Rao, custom cake bakery owner, stated "$1,800/month" on Apr 28), Apr 28.
Lindsey, Apr 28: "Hey Priyanka, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead, May 1: "Jay's calendar looked packed, I'll try again later. Busy wedding season anyway."
(Silent since. Today is Jul 10.)
EXPECTED:
- Jay-routed nurture constraints on the lindsey profile: value-only touch, NO call CTA, NO Calendly link, and no hard push to book Jay; a soft "Jay's still around if you want to pick things back up" is acceptable only without a booking push
- Opener anchored to HER stated situation (wedding season, or her plan to try Jay again later), never "just checking in"
- 1-3 sentences; no sign-off; solo register; no off-list proof, no fabricated bakery clients

### Q31 | samuel | nurture | Budget routing does not apply to nurture
INPUT (response_type: nurture):
Lead (Walt Jenkins, indoor golf simulator lounge owner), May 28: "We cut ad spend to $2,500/month until our second location opens in August. Let's touch base after that."
(Nothing since. Today is Jul 10, ~6 weeks of silence.)
EXPECTED:
- NO Jay routing: budget routing rules do NOT apply to nurture messages -- no Jay template, no Jay calendar link, no re-route based on the $2,500 figure
- Opener anchored to HIS stated situation (second location opening in August, now approaching); "just checking in" banned
- 1-3 sentences; soft CTA or none is fine; if a call IS suggested, the Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 must accompany it
- No gym/venue proof fabricated; Fitness Superstore never framed as membership or venue lead-gen proof

### Q32 [3x] | lindsey | warmup | Booked on Calendly, no YouTube ever
INPUT (response_type: warmup):
Lead (Nadia Osman, halal meal prep ecom founder) booked on Lindsey's Calendly for Jul 14. Thread and job post contain: in business 4 years; website mealsbynadia.com; "$6K/month Meta budget"; "we used an agency last year that overpromised and underdelivered." No mention of CPA/ROAS goals or revenue. No mention of the profile video.
EXPECTED:
- Honest answered/unanswered inventory: Q1 (prior agency), Q3 (spend), Q5 (years), Q7 (website) ANSWERED -- re-asking any of them fails. Asks ONLY Q4 (CPA/ROAS goal) and Q6 (revenue); Case C
- Profile video nudge present (video not mentioned); the YouTube channel sentence must NOT appear -- no youtube.com/@creeksidemarketing1 anywhere (Lindsey warmups omit it)
- NO calendar or booking links of any kind (call already booked); no pricing talk, no spend floors, no disqualification
- Under 150 words; no sign-off; solo register; questions as natural sentences, not a numbered list

### Q33 | lindsey | warmup | Booked on Jay's calendar -- skip entirely
INPUT (response_type: warmup):
Lead (Dwayne Hicks, lawn aeration service, stated "$2,100/month" on Jul 7), Jul 7.
Lindsey, Jul 7: "Hey Dwayne, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead, Jul 9: "Booked with Jay for the 15th."
(Operator asks for a warmup message. Today is Jul 10.)
EXPECTED:
- NO warmup message generated: leads booked on Jay's calendar skip the warmup entirely -- Jay handles his own pre-call prep (explicit rule in warmup.md and the lindsey profile doc)
- Output states the skip and the reason; generating any warmup message, discovery question set, or video nudge is a fail
- No calendar links, no operator redirect instructions (this is a normal Jay booking, not a post-booking budget redirect)

### Q34 | samuel | warmup | Budget unanswered is mandatory
INPUT (response_type: warmup):
Lead (Elena Vasquez, cosmetic dermatology clinic director) booked on Samuel's calendar for Jul 13. Thread contains: website derma-elena.com; "we've been open 9 years"; "we run Google Ads in-house right now and results are meh." No budget mentioned anywhere, no CPA/ROAS goal, no revenue. No mention of the profile video.
EXPECTED:
- Q3 (ad spend/budget) is UNANSWERED and therefore MANDATORY in the message; Q4 (CPA/ROAS goal) and Q6 (revenue) also unanswered and appropriate to ask. Must NOT re-ask website, years in business, or current strategy/prior experience (all answered)
- Profile video nudge present; the YouTube sentence is permitted for samuel (optional): "We also have a YouTube channel if you want to learn more about us: youtube.com/@creeksidemarketing1"
- NO booking or calendar links (call already booked); no pricing discussion, spend floors, or disqualification -- protect the booked call
- Under 150 words; Case C; opening line references something she shared (in-house Google struggle)

### Q35 | lindsey | warmup | Case A minimal note
INPUT (response_type: warmup):
Lead (Sofia Marchetti, luxury bath products ecom owner) booked on Lindsey's Calendly for Jul 12. Thread contains: Shopify store, 6 years in business; $12K/month Meta spend; ROAS target of 4x; revenue around $2.8M/year; website sofiabath.com; "we used an agency for two years, then brought Meta and Klaviyo in-house." Lead, Jul 9: "Watched your intro video by the way, liked the ecommerce background."
EXPECTED:
- Case A (all 7 discovery questions answered + video mentioned): a brief 1-2 sentence personalized note referencing something specific from the thread plus a soft forward-look to the call -- NO discovery questions of any kind
- NO video nudge (already watched), NO YouTube reference (never on lindsey anyway), NO calendar or booking links
- No sign-off; solo register; no fluff closes ("I look forward to hearing from you" banned)
- No case study attachment (warmup type never attaches)
