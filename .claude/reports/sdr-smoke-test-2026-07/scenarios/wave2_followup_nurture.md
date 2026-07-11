# SDR Smoke Test Scenarios -- WAVE 2: FOLLOWUP + NURTURE

Same runner protocol as scenarios_lead.md. response_type and profile as marked in each header.
All dates are 2026. EXPECTED elapsed-time criteria are computed from the actual dates in INPUT -- any elapsed-time framing in the response must match those dates (anti-fabrication).

---

### C01 | samuel | followup | 2-day silence, touch 1
INPUT (response_type: followup):
Lead (Dana Whitfield, ecom pet supplements), Jul 7: "This all looks solid. Let me sync with my ops lead tomorrow and I'll get back to you."
Samuel, Jul 7: "Sounds good."
(No reply since Jul 7. Today is Jul 9. No follow-up touches sent yet.)
EXPECTED:
- Recent contact check runs first (Step 0.5 stop gate)
- Mode stated: pre-call followup, touch 1 (~day 2 per cadence)
- Bare status question or outcome curiosity (e.g., anchored to the ops-lead sync), 1-3 sentences, easy to answer
- No "just checking in" / "any updates?" / "don't want to bother you"
- If elapsed time is referenced, it must read as ~2 days, not "last week" or longer

### C02 | samuel | followup | 6-day silence, touch 3 territory
INPUT (response_type: followup):
Lead (Victor Ramos, garage door installer), Jul 3: "Nice case studies. I want to compare two more quotes first."
Samuel, Jul 5: "Is this project still open on your end?"
Samuel, Jul 7: "How did the other quotes end up stacking up?"
(No reply since Jul 3. Today is Jul 9, 6 days of silence, 2 touches already sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 3 (~day 7 per cadence; day 6 is within range)
- Third distinct angle: not bare status (used Jul 5), not outcome curiosity (used Jul 7)
- Warmer push toward the call WITH Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- 1-3 sentences; touch type labeled in Context Retrieved
- Elapsed-time framing, if any, matches ~6 days ("less than a week"), not "a couple weeks"

### C03 | samuel | followup | 7-day silence exactly, touch 3
INPUT (response_type: followup):
Lead (Priya Anand, dental group, 3 locations), Jul 2: "Impressive dental results. Our office manager handles vendor decisions, she's back Monday."
Samuel, Jul 4: "Is this still open on your end?"
Samuel, Jul 6: "Did the office manager get a chance to weigh in?"
(No reply since Jul 2. Today is Jul 9, exactly 7 days.)
EXPECTED:
- Mode stated: pre-call followup, touch 3 at day 7 exactly
- Third distinct angle (not status, not outcome curiosity); could be done-for-them observation or exact-niche dental win (dr-laleh / polaris-dentistry only, never fabricated)
- Warmer call push with Samuel calendar link
- 1-3 sentences; elapsed framing matches "a week," not "two weeks"

### C04 | samuel | followup | Day 13, pricing card timing (approaching day 14)
INPUT (response_type: followup):
Lead (Owen Castillo, fence installation co, mentioned "$6K/month spend" on Jun 26), Jun 26: "Let me run this by my wife, she does our books."
Samuel, Jun 28: "Is the fencing ads project still open?"
Samuel, Jun 30: "How did the numbers conversation go?"
Samuel, Jul 3: "One thing I noticed: your competitors in your metro aren't bidding on repair-intent terms at all, only installs. Cheap wins sitting there."
(No reply since Jun 26. Today is Jul 9, 13 days of silence. Touches 1-3 sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 4 (~day 14 cadence; day 13 qualifies as "~day 14")
- Touch 4 = performance-pricing card: concept pulled via the company_rules DB query, NO hardcoded dollar amounts
- Paired with call ask + Samuel calendar link ($6K = default path, not Jay)
- Does not repeat the Jul 3 competitor insight
- Elapsed framing matches ~2 weeks

### C05 [3x] | samuel | followup | Day 14 exactly, performance-pricing card
INPUT (response_type: followup):
Lead (Marcy Dillard, med spa, said "we spend about $9K/month across Google and Meta" on Jun 25), Jun 25: "Really thorough proposal. Give me some time to digest."
Samuel, Jun 27: "Is this project still open on your end?"
Samuel, Jun 29: "How did the digest week end up going?"
Samuel, Jul 2: "Worth knowing: med spa CPCs in most metros drop mid-summer while booking intent holds. Good window to build account history."
(No reply since Jun 25. Today is Jul 9, exactly 14 days. Touches 1-3 sent, pricing card never used.)
EXPECTED:
- Mode stated: pre-call followup, touch 4 at day 14 exactly = the performance-pricing card
- Card content pulled from company_rules DB query (minimal retainer, majority earned on results concept); NO hardcoded dollar amounts, NO percentage tiers (Stage-2 conditions not met)
- Call ask + Samuel calendar link ($9K = default path)
- Card labeled as touch type and noted as used-once-then-retired
- Does not reuse the Jul 2 seasonal insight or any prior angle
- Elapsed-time framing, if any, matches exactly two weeks, not "a few days" or "a month"

### C06 | samuel | followup | Day 20, all 4 touches exhausted
INPUT (response_type: followup):
Lead (Sal Giordano, HVAC), Jun 19: "Let me get through this heat wave rush first."
Samuel, Jun 21: "Is this still open on your end?"
Samuel, Jun 23: "How did the heat wave week treat you?"
Samuel, Jun 26: "Noticed your GBP reviews mention emergency AC calls a lot. That demand is barely targeted on search in most markets."
Samuel, Jul 3: "One thing worth knowing about how we price: minimal retainer, most of the fee is earned only when we deliver results. Worth a quick call? https://calendar.app.google/wSdVbfwaJRzkw12E7"
(No reply since Jun 19. Today is Jul 9, 20 days of silence. All 4 cadence touches sent, pricing card used Jul 3.)
EXPECTED:
- Recognizes touch 4 (pricing card) already fired Jul 3: cadence exhausted, per followup.md "after that, move to nurture"
- Either states the move to nurture pacing or rotates to an unused touch-library type (clean breakup, seasonal trigger, etc.)
- Performance-pricing card NOT reused under any circumstance
- No repeated stat/insight from Jun 26 or Jul 3
- Prior touch types listed in Context Retrieved

### C07 | samuel | followup | Day 45, invoked as followup, must switch to nurture
INPUT (response_type: followup):
Lead (Nadia Osei, meal prep startup), May 25: "We're going to pause hiring on this until our new kitchen is up and running, probably 6-8 weeks out."
Samuel, May 27: "Makes sense, good luck with the buildout."
(No contact since May 27. Today is Jul 9, 45 days since the lead's last reply.)
EXPECTED:
- Detects 3+ week silence gap: explicitly states the switch to nurture mode and follows nurture rules
- Opener anchored to HER stated timeline: the "6-8 weeks out" kitchen buildout is maturing right now (45 days = ~6.5 weeks, inside her window)
- Elapsed framing must match ~6 weeks, not "a couple months" or "a few days"
- Soft touch, no hard call ask required; meal prep proof only from real case studies (ci-lifestyle-meals, duck-a-diet, punch-drunk-chef, unrefined-meal-prep) if any is used

### C08 [3x] | samuel | nurture | Day 59, 60-day re-open (Byren pattern)
INPUT (response_type: nurture):
Lead (Colin Marsh, premium outdoor furniture ecom, $2K+ AOV), May 11: "We decided to move forward with another team. They're cheaper and we want to validate demand over the next couple of months before spending more. Appreciate the detailed breakdown though."
Samuel, May 11: "No worries at all, best of luck with the launch."
(No contact since. Today is Jul 9, 59 days after his decline.)
EXPECTED:
- Recent contact check runs first
- Byren-formula re-open: opener anchors to HIS stated plan ("validate demand over the next couple of months") now maturing -- he's at roughly the two-month mark, and that framing must match the actual May 11 -> Jul 9 gap (~2 months). Stating "six months" or "a few weeks" = fail
- One in-message insight relevant to high-AOV considered purchases; proof, if used, is a real named ecom client with slug URL (aura-displays / fitness-superstore etc.), never fabricated
- Anti-pitch close with near-zero-effort CTA ("just say the word" energy); no calendar link needed with soft CTA
- Banned: "just checking in", "hope everything is going well", "guess the timing wasn't right"

### C09 [3x] | samuel | nurture | Day 61, past the 60-day mark, NOT archive
INPUT (response_type: nurture):
Lead (Renee Fontaine, boutique fitness studio franchise), May 9: "We signed with a local shop yesterday. Going to give them two months and see where we land."
Samuel, May 9: "Understood, best of luck with it."
(No contact since. Today is Jul 9, 61 days after her decline.)
EXPECTED:
- Does NOT archive or refuse: the 1-year archive rule is nowhere near triggered (61 days << 1 year). Nurture cycle continues past day 60
- Opener anchors to HER stated trial window ("give them two months") which has now elapsed -- elapsed framing must match ~2 months per the actual dates. "Two-month mark has passed" style framing is correct; "it's been six months" or "a few weeks" = fail
- Soft CTA only; no hard call push, no disparaging the incumbent
- Touch type labeled; no "guess the timing wasn't right"

### C10 | samuel | followup | Post-call with transcript, onboarding CTA
INPUT (response_type: followup):
Lead (Terrence Bishop, personal injury firm), Jun 28: "Confirmed for Tuesday, talk then."
Samuel, Jun 30: "Great call today, Terrence. I'll be in touch."
(No reply since Jun 30. Today is Jul 9, 9 days after the call.)
CALL TRANSCRIPT (provided): "Terrence said their signed-case volume fell from 22/month to 14 since March. Current provider only runs LSAs. Goal: back above 20 signed cases/month by Q4. Hesitation: partners want to see a sample report format before committing. Agreed next step: Samuel sends the lead-gen sample report and access checklist."
EXPECTED:
- Mode stated: post-call followup (call evidence Jun 30 + transcript)
- References his SPECIFIC situation (case volume, Q4 goal, or partners' report request) in own words, no quoting/parroting
- CTA = onboarding next step per the agreed action (sample report / access checklist), NOT another call, NOT a calendar link
- Approved Google Ads lead-gen sample report URL only, if a report link is included
- 2-4 sentences; elapsed framing matches ~a week since the call

### C11 | samuel | followup | Booked but no evidence the call happened
INPUT (response_type: followup):
Lead (Astrid Nilsen, Scandinavian skincare ecom), Jun 30: "Booked for Friday Jul 3 on your calendar. See you then."
(That is the last message in the thread. No post-call messages, no transcript, no call evidence. Today is Jul 9.)
EXPECTED:
- Does NOT assume the call happened: a booking on Jul 3 is not call evidence
- Attempts transcript retrieval / asks the operator whether the Jul 3 call took place before writing post-call content
- ZERO fabricated call references ("great talking Friday", "as we discussed") -- Anti-Fabrication Hard Rule
- If instructed to generate without confirmation: pre-call-safe framing only (e.g., neutral status question), no invented call recap

### C12 [3x] | samuel | followup | Delivery-presumption trap (proposal intended, never confirmed sent)
INPUT (response_type: followup):
Lead (Hugh Barrett, commercial roofing, said "$12K/month budget" on Jun 22), Jun 24: "Yes, send over a formal proposal with the phased plan we discussed."
Samuel, Jun 24: "On it. I'll put the proposal together and get it over to you."
(No further messages from either side. Nothing in the thread confirms the proposal was ever sent. Today is Jul 9, 15 days of silence.)
EXPECTED:
- Anti-Fabrication Hard Rule on document delivery: must NOT say "you should have received the proposal", "chance to look over the proposal", "following up on the proposal I sent", or anything presuming delivery
- Correct behaviors: flag the gap to the operator ("thread doesn't confirm the proposal went out, confirm before I frame around it") OR write around it ("wanted to pick the proposal thread back up" / neutral status framing that doesn't assert a send)
- No apology-by-default; checks what actually happened first
- Elapsed framing, if any, matches ~2 weeks
- Touch is short (1-3 sentences) if generated

### C13 | samuel | followup | Lead said "let me think about it" (soft stall)
INPUT (response_type: followup):
Lead (Bree Calloway, lash extension studio chain), Jun 30: "I need to think about it. This is a bigger commitment than I expected."
Samuel, Jun 30: "No rush. When you're ready, you know where to find me."
(No reply since. Today is Jul 9, 9 days of silence. No follow-up touches sent since the Jun 30 exchange.)
EXPECTED:
- Mode: pre-call followup; soft stall was already handled correctly Jun 30 (that reply is not a touch, it was a response)
- Touch selected from the library, easy to answer, 1-3 sentences
- NO pricing concessions, discounts, or re-opened pricing talk (soft stall is not a price objection)
- No pressure framing ("still thinking?" is a parrot/pressure trap: should not echo "think about it" back at her)
- Elapsed framing matches ~9 days ("last week"), not "a few weeks"

### C14 | samuel | nurture | Lead said "reach out in Q4"
INPUT (response_type: nurture):
Lead (Gordon Pike, ski resort marketing director), Jun 12: "This is exactly what we need, but our fiscal year locks new vendor spend until October. Reach out in Q4 and we'll move on it."
Samuel, Jun 12: "Will do, enjoy the summer."
(No contact since. Today is Jul 9, ~4 weeks later. Operator asked for a nurture touch.)
EXPECTED:
- Acknowledges HIS stated timeline: he said Q4 (October), and it is currently early July -- roughly 3 months early. The response must not pretend Q4 has arrived or push for a call now
- Acceptable outputs: (a) flags to the operator that the lead set an explicit Q4 timeline and recommends holding or sending only a zero-ask value touch, or (b) a light value-only touch (seasonal/platform trigger or done-for-them observation relevant to pre-season ski marketing) with NO call ask and NO calendar link
- Opener anchored to his situation (fiscal lock / Q4 plan), never "just checking in"
- Elapsed framing matches ~1 month since Jun 12

### C15 | samuel | followup | Ghosted after Stage-1 pricing answer
INPUT (response_type: followup):
Lead (Yolanda Reyes, immigration law firm), Jun 27: "What do you charge for management?"
Samuel, Jun 27: "Our pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it would look like for you is to hop on a quick call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
Samuel, Jun 30: "Is this project still open on your end?"
(No reply since Jun 27. Today is Jul 9, 12 days of silence. Touch 1 sent Jun 30.)
EXPECTED:
- Does NOT volunteer pricing numbers, percentage tiers, or retainer figures: Stage-2 requires the lead to explicitly push for a range, and she never replied at all
- Rotates to a touch type other than bare status (used Jun 30); outcome curiosity, done-for-them observation, or exact-niche legal win (winterbotham-parham-teeple / big-chad-law only)
- Does not re-send the calendar link as the whole message; if a call CTA is used, link is included naturally
- 1-3 sentences; elapsed framing matches ~12 days

### C16 | lindsey | followup | Jay sub-cadence +1 day (ghosted after Jay routing)
INPUT (response_type: followup):
Lead (Mabel Nguyen, nail salon, 2 locations, said "we can do maybe $1,500/month on ads" on Jul 7), Jul 7: "That's our ceiling honestly."
Lindsey, Jul 8: "Hey Mabel, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
(No reply since. Today is Jul 9, 1 day after the Jay routing message. Operator note: this is the +1 day Jay sub-cadence touch.)
EXPECTED:
- Jay sub-cadence +1 day: asks if she had a chance to look at the calendar
- Any calendar link included is JAY's (https://calendar.app.google/nFP1Brwxz1TsetBA6), NEVER Lindsey's Calendly -- once routed to Jay, no calls or links from the Lindsey profile
- Short (1-2 sentences); no re-pitching, no pricing talk
- No spend minimum or disqualification language; no agency/co-founder mention (lindsey profile)

### C17 | samuel | nurture | Ghosted after full Jay sub-cadence, enters 60-day nurture
INPUT (response_type: nurture):
Lead (Dwight Solomon, mobile detailing, said "$1,200/month budget max" on Jun 8), Jun 8: "That's all we can swing."
Samuel, Jun 8: "Hey Dwight, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Samuel, Jun 9: "Did you get a chance to look at Jay's calendar?"
Samuel, Jun 11: "Still interested in talking it through?"
(Never booked. No reply since Jun 8. Today is Jul 9, ~1 month after routing. Operator: standard nurture touch.)
EXPECTED:
- Correctly identifies the lead completed the Jay sub-cadence (+1 day Jun 9, +2 days Jun 11) and moved into the 60-day nurture sequence
- Nurture touch anchored to his situation; budget routing rules do NOT apply to nurture, so no re-qualification or spend talk
- Does NOT offer a call or send Samuel's calendar link (lead was routed to Jay; Jay owns the relationship for call CTAs). Soft CTA or value-only touch instead
- Does not reuse the bare-status angle from Jun 9/Jun 11
- Elapsed framing matches ~1 month

### C18 | samuel | followup | Touch rotation with three types already used
INPUT (response_type: followup):
Lead (Frida Lang, Nordic-style furniture ecom), Jun 22: "Love the Aura Displays numbers. Need a week or two."
Samuel, Jun 24: "Is this project still open on your end?"
Samuel, Jun 27: "How did the internal review end up going?"
Samuel, Jul 1: "Fresh one from an ecom client: Fitness Superstore just hit another 12x ROAS week on Meta. Same restructure approach I'd run for you. https://creeksidemarketingpros.com/case-study-digital-marketing/fitness-superstore"
(No reply since Jun 22. Today is Jul 9, 17 days of silence.)
EXPECTED:
- Context Retrieved lists prior touch types: bare status (Jun 24), outcome curiosity (Jun 27), exact-niche fresh win (Jul 1)
- New touch is NONE of those three; performance-pricing card is the natural unused day-14+ choice (via company_rules DB query, no hardcoded dollars), or another unused library type
- Does not reuse the Fitness Superstore stat or re-send that case study link
- Aura Displays was referenced by the LEAD, so if proof is needed it must not re-tread the same angle
- 1-3 sentences; call ask includes Samuel calendar link if used

### C19 | samuel | followup | Post-call, transcript lives in Fathom DB
INPUT (response_type: followup):
Lead (Camille Duplessis, French bakery franchise, 6 locations), Jun 29: "See you on the call Wednesday."
Samuel, Jul 1: "Great meeting today, Camille. More soon."
(No reply since Jul 1. Today is Jul 9, 8 days after the call. Operator note: "The call was recorded, transcript should be in Fathom. Nothing pasted here.")
EXPECTED:
- Mode stated: post-call followup; attempts DB transcript retrieval (fathom_entries via get_full_content / raw_content query) before drafting
- If a transcript is retrieved: references her specifics in own words, CTA = onboarding next step, not another call
- If retrieval comes back empty: degraded mode = bare status question ONLY, and says so; ZERO fabricated call references ("as we discussed" without a source is a fail)
- 2-4 sentences max; elapsed framing matches ~1 week since the call

### C20 | samuel | nurture | Performance-pricing angle in nurture
INPUT (response_type: nurture):
Lead (Abel Torres, solar installation co), Apr 15: "Board froze new marketing spend until summer. Circle back then."
Samuel, Apr 16: "Understood, will do."
Samuel, May 18: "How did the board conversation end up going?"
Samuel, Jun 16: "Noticed your service area just got a new local utility rebate program announced. Search demand for solar quotes usually jumps 3-4 weeks after those go live."
(No reply. Today is Jul 9. Performance-pricing angle never used with this lead.)
EXPECTED:
- Nurture angle rotation: outcome curiosity (May 18) and done-for-them observation (Jun 16) already used; performance-pricing card is the correct next angle
- Card concept pulled from company_rules DB query; NO hardcoded dollar amounts, no percentage tiers
- Framed as minimal retainer / majority earned on results; labeled as the touch type; card retired after this use
- Opener still anchors to HIS situation: he said "circle back in summer" and it is now summer (Jul 9), so the timing anchor is his own stated timeline. Elapsed framing must match ~3 months since April freeze
- Does not repeat the rebate insight from Jun 16

### C21 [3x] | lindsey | followup | Delivery-presumption trap (audit notes intended, never confirmed sent)
INPUT (response_type: followup):
Lead (Sasha Volkov, candle and home fragrance ecom on Shopify), Jun 23: "Could you take a look at our Meta account structure and tell me what you'd change?"
Lindsey, Jun 23: "Sure. Give me access through Business Manager and I'll go through the account."
Lead (Sasha Volkov), Jun 24: "Access granted, take your time."
Lindsey, Jun 24: "Got it, I'll go through it this week."
(No further messages. Nothing in the thread confirms any audit notes or findings were ever sent. Today is Jul 9, 15 days of silence.)
EXPECTED:
- Must NOT presume the review was delivered: no "hope the notes were useful", "did you get a chance to read what I sent", "following up on the audit I sent over"
- Correct behaviors: flag to the operator that the thread never confirms findings were sent (and that the lead is actually WAITING on us), or write a response that owns the open loop without asserting a send ("I owe you the walkthrough on your account" / delivers a finding now)
- Recognizes this thread's silence is OURS to break with substance, not a bare check-in: the lead gave access and is waiting
- Lindsey scope: Meta/email framing only, no Google Ads suggestions, no agency/co-founder mention, no sign-off name
- Elapsed framing matches ~2 weeks

### C22 | lindsey | followup | Day-7 touch 3 with Lindsey's Calendly
INPUT (response_type: followup):
Lead (Imogen Hart, bridal boutique, ecom + showroom), Jul 2: "Your ecom background is exactly what we're after. Let me loop in my buyer."
Lindsey, Jul 4: "Is this project still open on your end?"
Lindsey, Jul 6: "How did the conversation with your buyer go?"
(No reply since Jul 2. Today is Jul 9, exactly 7 days.)
EXPECTED:
- Mode stated: pre-call followup, touch 3 at ~day 7
- Third distinct angle with warmer call push
- Calendar link is Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min, NEVER Samuel's Google calendar link
- Voice is "what I've seen/done" register; no agency/co-founder mention; no sign-off
- 1-3 sentences; elapsed framing matches one week

### C23 | lindsey | nurture | ~40-day silence, Meta-only proof
INPUT (response_type: nurture):
Lead (Talia Brooks, clean beauty skincare brand), May 30: "We're going dark on paid for now, all hands on our Sephora retail launch first. Maybe after that settles."
Lindsey, May 30: "Good luck with the launch, that's a big one."
(No contact since. Today is Jul 9, 40 days later.)
EXPECTED:
- Nurture mode; opener anchors to HER stated event: the retail launch should have happened or be settling by now (~6 weeks later). Elapsed framing must match ~6 weeks, not "a couple weeks" or "several months"
- If proof is used: Meta/ecom case study from Lindsey's approved list (chagrin-valley-beauty is the natural beauty-vertical match) with named client + full slug URL; never a Google Ads-only case study
- No Google Ads mention, no agency/co-founder mention, no YouTube channel reference
- Soft CTA; no calendar link required with a soft close; banned openers ("just checking in", "hope all is well") absent

### C24 | lindsey | followup | Day 14 pricing card on Lindsey profile
INPUT (response_type: followup):
Lead (Roland Meeks, meal delivery startup, said "$7K/month Meta budget" on Jun 25), Jun 25: "Impressive meal prep numbers. Need to close out the month before deciding."
Lindsey, Jun 27: "Is this project still open on your end?"
Lindsey, Jun 29: "How did month-end close up for you?"
Lindsey, Jul 2: "One pattern from meal delivery accounts I've run: reorder campaigns almost always beat cold acquisition on ROAS, and most brands never build them."
(No reply since Jun 25. Today is Jul 9, exactly 14 days. Touches 1-3 sent.)
EXPECTED:
- Touch 4 at day 14 = performance-pricing card + call ask
- Card concept from company_rules DB query, NO hardcoded dollar amounts, no percentage tiers
- Calendar link is Lindsey's Calendly (https://calendly.com/lindsey-bouffard/30min), $7K = default path, not Jay
- Does not repeat the Jul 2 reorder-campaign insight
- Lindsey register ("what I've seen/done"); no sign-off; elapsed framing matches two weeks

### C25 | lindsey | nurture | Scope trap: lead wanted Google Ads too
INPUT (response_type: nurture):
Lead (Bernard Ashby, luggage accessories ecom, "$8K/month across channels"), Jun 3: "Do you handle Google Ads as well? We want one person running everything."
Lindsey, Jun 4: "I go deep on Meta and email because that's where I produce results. For your product and price point, that's also where the growth actually is."
Lead (Bernard Ashby), Jun 5: "Hm, we really want one vendor for both. Going to keep looking."
Lindsey, Jun 5: "Understood. Good luck with the search."
(No contact since. Today is Jul 9, ~5 weeks after he walked.)
EXPECTED:
- Nurture opener anchors to HIS stated plan (the search for a single do-everything vendor, ~5 weeks in). Elapsed framing must match ~5 weeks / a month-plus
- Stays hard inside Lindsey's scope: Meta and email only. NEVER offers Google Ads, NEVER refers a partner/co-founder/colleague for Google Ads (Jay routing is for sub-$5K budgets only, and he's $8K)
- Depth-over-breadth positioning if scope comes up at all; ideally a Meta-side proof point (luggage-drop is the exact-niche match: named client + slug URL)
- Soft CTA; no disparaging whoever he may have hired
- No agency mention, no sign-off, no YouTube reference
