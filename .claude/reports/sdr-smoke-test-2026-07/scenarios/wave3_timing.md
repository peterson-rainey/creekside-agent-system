# SDR Smoke Test Scenarios -- WAVE 3: TIMING, CADENCE MATH, CALL-LIFECYCLE EDGES
# 35 scenarios (H01-H35). Same runner protocol as scenarios_lead.md. response_type and profile as marked in each header.
# Today's date for ALL scenarios: Jul 10, 2026. All dates are 2026 unless a year is stated.
# EXPECTED elapsed-time criteria are computed from the actual dates in INPUT -- any elapsed-time framing in the response must match those dates (anti-fabrication).
# Calendar whitelist: samuel https://calendar.app.google/wSdVbfwaJRzkw12E7 | lindsey https://calendly.com/lindsey-bouffard/30min | jay https://calendar.app.google/nFP1Brwxz1TsetBA6
# Followup/nurture touches: 1-3 sentence hard cap.

---

### H01 | samuel | followup | Day 1 silence, before the day-2 boundary
INPUT (response_type: followup):
Lead (Tessa Marchetti, kitchen remodeling co), Jul 9: "This is helpful. Let me talk to my brother, he co-owns the business."
Samuel, Jul 9: "Sounds good."
(No reply since Jul 9. Today is Jul 10, 1 day of silence. No follow-up touches sent. Operator asked for a followup touch.)
EXPECTED:
- Recent contact check runs first (Step 0.5 stop gate); the Jul 9 exchange is in-thread context, not a blocking hit
- Recognizes cadence position: touch 1 fires ~day 2 and only 1 day has passed. Preferred: flag that it's a day early and recommend holding until Jul 11
- If a touch is generated anyway, it must be touch 1 (bare status / outcome curiosity), 1-3 sentences, easy to answer
- Must NOT jump to touch 2+ content, the pricing card, or any resource push
- Elapsed framing, if any, reads as ~1 day ("yesterday"), never "this week" or longer

### H02 | samuel | followup | Day 2 exactly, touch 1 on time
INPUT (response_type: followup):
Lead (Ray Delgado, epoxy garage floors, said "$6K/month for ads" on Jul 8), Jul 8: "Solid breakdown. Need a day or two to think."
(No reply since Jul 8. Today is Jul 10, exactly 2 days. No touches sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 1 at day 2 exactly
- Bare status question or outcome curiosity anchored to his "day or two to think" window now maturing; 1-3 sentences
- No "just checking in" / "any updates?" / "don't want to bother you"
- No pricing card, no resource, no case study needed at touch 1
- Elapsed framing matches ~2 days

### H03 | samuel | followup | Day 3, touch 1 sent yesterday -- too early for touch 2
INPUT (response_type: followup):
Lead (Wanda Pruitt, orthodontics practice), Jul 7: "Let me check with our office administrator."
Samuel, Jul 9: "Is this project still open on your end?"
(No reply since Jul 7. Today is Jul 10, 3 days of silence. Touch 1 sent Jul 9, one day ago. Operator asked for another touch.)
EXPECTED:
- Correct outcome is NO MESSAGE: touch 2 lands ~day 4 (Jul 11) and touch 1 went out only yesterday
- States the cadence math explicitly (touch 1 on day 2, touch 2 at ~day 4, hold ~1 more day)
- Does NOT send a second touch back-to-back with touch 1; two touches in two consecutive days is not the 2/4/7 cadence
- If forced to generate, it must be a second distinct angle (not bare status again), 1-3 sentences

### H04 | samuel | followup | Day 4 exactly, touch 2 on time
INPUT (response_type: followup):
Lead (Gil Harmon, storm restoration contractor), Jul 6: "Impressive. Give me a few days, we're mid-storm-season chaos."
Samuel, Jul 8: "Is this project still open on your end?"
(No reply since Jul 6. Today is Jul 10, exactly 4 days. Touch 1 sent Jul 8.)
EXPECTED:
- Mode stated: pre-call followup, touch 2 at day 4 exactly
- Second angle from the touch library, distinct from bare status (used Jul 8); outcome curiosity anchored to storm-season chaos is a natural fit
- 1-3 sentences, easy to answer, some CTA (minimum a re-engagement question)
- No pricing card (that is touch 4, ~day 14); no repeated angle
- Elapsed framing matches ~4 days

### H05 | lindsey | followup | Day 5, just past the day-4 boundary, touch 2 slightly late
INPUT (response_type: followup):
Lead (Cora Whitman, candle subscription box on Shopify), Jul 5: "Your ecom background fits. Let me finish our July box launch first."
Lindsey, Jul 7: "Is this project still open on your end?"
(No reply since Jul 5. Today is Jul 10, 5 days of silence. Only touch 1 sent, on Jul 7.)
EXPECTED:
- Mode stated: pre-call followup, touch 2 (~day 4 cadence; day 5 is just past it, still touch-2 territory, not a skip)
- Second distinct angle; the July box launch is the natural anchor
- 1-3 sentences; Lindsey register ("what I've seen/done"), no agency/co-founder mention, no sign-off
- If any call CTA with link is used, it is Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min, never Samuel's link
- Elapsed framing matches ~5 days, not "last week" or "a couple weeks"

### H06 | samuel | followup | Day 6, just before the day-7 boundary, touch 3
INPUT (response_type: followup):
Lead (Petra Novak, med spa, said "$8K/month across platforms" on Jul 4), Jul 4: "Beautiful results. Comparing two more proposals this week."
Samuel, Jul 6: "Is this project still open on your end?"
Samuel, Jul 8: "How did the other proposals stack up?"
(No reply since Jul 4. Today is Jul 10, 6 days of silence. Touches 1-2 sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 3 (~day 7 cadence; day 6 is within range)
- Third distinct angle: not bare status (Jul 6), not outcome curiosity (Jul 8)
- Warmer push toward the call WITH Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 ($8K = default path, not Jay)
- 1-3 sentences; med spa proof, if used, only advanced-medical-spa (real, named, slug URL), never fabricated
- Elapsed framing matches ~6 days ("this week"), not "two weeks"

### H07 | samuel | followup | Day 8, just past the day-7 boundary, touch 3 still correct
INPUT (response_type: followup):
Lead (Manny Ortiz, fleet washing service), Jul 2: "Need to see if we win the municipal contract first, decision was supposed to be Friday."
Samuel, Jul 4: "Is this still open on your end?"
Samuel, Jul 6: "Did the municipal decision land on Friday like they said?"
(No reply since Jul 2. Today is Jul 10, 8 days of silence. Touches 1-2 sent.)
EXPECTED:
- Mode stated: pre-call followup, touch 3 (day 8 is just past ~day 7; still touch 3, NOT the day-14 pricing card and NOT nurture)
- Third distinct angle with warmer call push + Samuel calendar link
- Does not repeat the municipal-decision angle from Jul 6
- 1-3 sentences; elapsed framing matches ~a week

### H08 [3x] | samuel | followup | 3-in-7 limit hit, day 9 -- SKIP until the day-14 card
INPUT (response_type: followup):
Lead (Dionne Baxter, weight loss clinic, said "$7,500/month budget" on Jul 1), Jul 1: "Let me sleep on it and talk to my clinic director."
Samuel, Jul 3: "Is this project still open on your end?"
Samuel, Jul 5: "How did the conversation with your clinic director go?"
Samuel, Jul 8: "One thing I keep seeing in weight loss accounts: branded search gets scooped by competitors the moment ads pause. Worth a quick call to walk through it? https://calendar.app.google/wSdVbfwaJRzkw12E7"
(No reply since Jul 1. Today is Jul 10, 9 days of silence. Touches 1-3 all sent within the last 7 days. Operator asked for another touch today.)
EXPECTED:
- Correct outcome is NO MESSAGE today: the 3-in-7-days standard cadence is complete (touches on days 2, 4, 7) and the next scheduled touch is touch 4, the performance-pricing card, at ~day 14 (~Jul 15)
- States the cadence math and the hold-until date instead of generating
- Does NOT send a fourth touch at day 9; does NOT fire the pricing card early just because the operator asked for "a touch"
- If forced to generate anyway, it must not repeat any of the three prior angles and must not be the pricing card
- No "just checking in" filler as a compromise

### H09 | lindsey | followup | Day 12, operator requests the pricing card early
INPUT (response_type: followup):
Lead (Yusuf Demir, halal meal delivery, said "$6K/month on Meta" on Jun 28), Jun 28: "Great numbers. Ramadan planning has us slammed, give me some time."
Lindsey, Jun 30: "Is this project still open on your end?"
Lindsey, Jul 2: "How did the planning crunch end up going?"
Lindsey, Jul 5: "One pattern from meal delivery accounts I've run: reorder flows almost always out-ROAS cold acquisition, and most brands never build them."
(No reply since Jun 28. Today is Jul 10, 12 days of silence. Touches 1-3 sent. Operator: "send the performance pricing card now.")
EXPECTED:
- Recognizes the card is scheduled ~day 14 and today is day 12: acceptable to flag it as ~2 days early and recommend holding until ~Jul 12, OR to send it with an explicit note that day 12 is treated as approaching ~day 14
- If sent: card concept pulled via the company_rules DB query, NO hardcoded dollar amounts, NO percentage tiers (Stage-2 conditions not met); paired with call ask + Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min ($6K = default path)
- Card noted as use-once-then-retire for this lead
- Does not repeat the Jul 5 reorder-flow insight or either earlier angle
- Lindsey register, no agency mention, no sign-off; 1-3 sentences

### H10 [3x] | samuel | followup | Day 14 exactly, performance-pricing card on time
INPUT (response_type: followup):
Lead (Harriet Boone, foundation repair co, said "we can put $10K/month behind this" on Jun 26), Jun 26: "Very thorough. Board meets next week, I'll bring it to them."
Samuel, Jun 28: "Is this project still open on your end?"
Samuel, Jun 30: "How did the board meeting end up going?"
Samuel, Jul 3: "Noticed most foundation repair advertisers in your region go dark on search after storm season. The leads don't stop, the bidders do."
(No reply since Jun 26. Today is Jul 10, exactly 14 days. Touches 1-3 sent, pricing card never used with this lead.)
EXPECTED:
- Mode stated: pre-call followup, touch 4 at day 14 exactly = the performance-pricing card
- Card content pulled from the company_rules DB query (minimal retainer, majority earned on results concept); NO hardcoded dollar amounts, NO percentage tiers
- Paired with call ask + Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 ($10K = default path)
- Card labeled as the touch type and noted as used-once-then-retired
- Does not reuse the Jul 3 seasonal insight or any prior angle; 1-3 sentences
- Elapsed framing matches exactly two weeks

### H11 | samuel | followup | Day 20, card never fired -- late card still correct
INPUT (response_type: followup):
Lead (Stellan Kovacs, custom deck builder), Jun 20: "Booked solid through July 4th weekend, revisit after."
Samuel, Jun 22: "Is this still open on your end?"
Samuel, Jun 24: "How's the pre-holiday rush treating the crew?"
Samuel, Jun 27: "One thing I noticed: deck builders in your metro barely bid on repair and refinishing terms. Cheaper clicks, same homeowners."
(No reply since Jun 20. Today is Jul 10, 20 days of silence. Touches 1-3 sent, performance-pricing card never used.)
EXPECTED:
- Recognizes touch 4 (the card) was never fired and is now overdue (day 20 vs ~day 14): sending it late is correct, the card is not forfeited by the delay
- His stated timeline is also the anchor: "revisit after July 4th weekend" has now passed, so the timing anchor is his own words
- Card via company_rules DB query, no hardcoded dollars, no percentage tiers; call ask + Samuel calendar link
- After this touch, cadence moves to nurture pacing (per followup.md, after touch 4 move to nurture)
- Does not repeat the Jun 27 repair-terms insight; 1-3 sentences; elapsed framing matches ~3 weeks

### H12 | lindsey | followup | Day 17, all 4 touches exhausted -- skip decision
INPUT (response_type: followup):
Lead (Odessa Grant, bridal shapewear ecom, said "$9K/month Meta spend" on Jun 23), Jun 23: "Let me get through our summer sale first."
Lindsey, Jun 25: "Is this project still open on your end?"
Lindsey, Jun 27: "How did the summer sale end up performing?"
Lindsey, Jun 30: "One thing I've seen in shapewear accounts: UGC try-on creative outlasts studio shots two to one on spend before fatigue."
Lindsey, Jul 7: "Worth knowing how I price: minimal retainer, most of the fee is earned only when I deliver results. Want to walk through what that'd look like for you? https://calendly.com/lindsey-bouffard/30min"
(No reply since Jun 23. Today is Jul 10, 17 days of silence. All 4 cadence touches sent; pricing card fired Jul 7, 3 days ago. Operator asked for another followup touch.)
EXPECTED:
- Correct outcome is NO MESSAGE today: all 4 cadence touches are exhausted and the card fired only 3 days ago; per followup.md the lead now moves to nurture pacing (weeks between touches, not days)
- States the exhaustion explicitly and recommends when the first nurture-paced touch should land
- Performance-pricing card NOT reused under any circumstance
- Does not repeat the UGC insight or any prior angle if forced to generate
- Prior touch types listed in Context Retrieved

### H13 [3x] | samuel | nurture | Day 58, just before the 60-day re-open
INPUT (response_type: nurture):
Lead (Beau Lachance, premium cooler and drinkware ecom, $150+ AOV), May 13: "We're going with a cheaper freelancer for now. Want two months of data before we invest more seriously. Appreciate the depth here."
Samuel, May 13: "No worries, best of luck with it."
(No contact since. Today is Jul 10, 58 days after his decline.)
EXPECTED:
- Recent contact check runs first (Step 0.5 stop gate)
- Day 58 is right at the front edge of the 60-day re-open window: generating the Byren-style re-open now is acceptable, and the framing must read as "coming up on / right at the two-month mark," NOT "well past two months" and NOT "a few weeks in"
- Opener anchors to HIS stated plan (two months of data with the freelancer) now maturing; banned: "just checking in", "hope everything is going well", "guess the timing wasn't right"
- Proof, if used, is a real named ecom client with full slug URL; never fabricated
- Anti-pitch close with near-zero-effort CTA ("just say the word" energy); no calendar link needed with a soft CTA; 1-3 sentences unless the full Byren-structure re-open is explicitly built

### H14 | lindsey | nurture | Day 60 exactly, Byren-quality re-open
INPUT (response_type: nurture):
Lead (Simone Adler, luxury silk sleepwear ecom, $300+ AOV), May 11: "We signed with another team yesterday. They came recommended and we want to validate the market over the next couple months before spending more. Thanks for the detailed audit though."
Lindsey, May 11: "Totally understand, good luck with the launch."
(No contact since. Today is Jul 10, exactly 60 days after her decline.)
EXPECTED:
- Byren-formula re-open at the two-month mark exactly: opener anchors to HER stated plan ("validate the market over the next couple months") now matured -- framing must match the actual May 11 -> Jul 10 gap (~2 months); "six months" or "a few weeks" = fail
- One in-message insight relevant to high-AOV considered purchases; the value lives inside the message, no homework links
- Proof, if used, only from Lindsey's approved list (named client + full slug URL); never a Google Ads-only case study; no Google Ads mention
- Anti-pitch close, near-zero-effort soft CTA; no calendar link required; no disparaging the incumbent
- Lindsey solo register ("I", "my clients"), no agency mention, no sign-off

### H15 | samuel | nurture | Day 62, just past 60 -- cycle continues, nothing expires
INPUT (response_type: nurture):
Lead (Ida Ferreira, pool construction co), May 9: "Going with a local shop, they can meet in person. We'll see how the first two months go."
Samuel, May 9: "Understood, best of luck."
(No contact since. Today is Jul 10, 62 days after her decline.)
EXPECTED:
- Day 62 does NOT trigger any archive or refusal: the only hard stop is 1 year of silence, and the 60-day mark is a pacing target, not a deadline. The re-open is still fully valid
- Opener anchors to HER stated trial window ("first two months") which has now elapsed; elapsed framing must match ~2 months per the actual dates
- Soft CTA only; no hard call push, no disparaging the local incumbent
- Touch type labeled; banned openers absent; 1-3 sentences

### H16 [3x] | samuel | nurture | Lead replies at day 59 -- clock resets, switch to lead mode
INPUT (response_type: nurture):
Lead (Grover Nash, fence and gate installer), May 12: "Decided to go with my nephew's buddy who does ads. Keeping it in the family."
Samuel, May 12: "Ha, understood. Good luck with it."
Lead (Grover Nash), Jul 10: "Well, the family experiment is over. You still taking on clients this summer?"
(His Jul 10 message arrived this morning. Today is Jul 10. Operator invoked nurture out of habit.)
EXPECTED:
- The lead's message is the most recent in the thread: this is a LEAD RESPONSE, not a nurture touch. The agent must say so and switch to lead mode instead of generating a 60-day-style touch
- The nurture clock resets from his Jul 10 reply; no touch-cadence math applies to answering a live message
- Response welcomes him back and re-engages (Messages That ALWAYS Need a Response); no "I told you so" energy, no parroting "family experiment"
- Call CTA appropriate with Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 (no budget evidence for Jay routing)
- Does NOT reference a nurture sequence, touch schedules, or that we were "about to reach out"

### H17 | samuel | lead | 9-month-dead thread revived by the lead
INPUT (response_type: lead):
Lead (Priscilla Yoder, commercial cleaning franchise), Oct 8, 2025: "Corporate froze all vendor onboarding until further notice. Sorry to leave you hanging."
Samuel, Oct 8, 2025: "No problem at all. You know where to find me when it thaws."
Lead (Priscilla Yoder), Jul 10, 2026: "The freeze finally lifted. Budget approved at $8K/month for ads. Are you still doing this?"
EXPECTED:
- Responds (never skip): a lead reviving a thread ALWAYS gets a reply, regardless of the 9-month gap; the 1-year archive rule governs outbound touches to silent leads, not replies to live ones
- Confirms yes and moves straight to the call: calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 ($8K = default path, not Jay)
- Elapsed framing, if any, matches ~9 months; must not fabricate memory of details that are not in the thread
- No guilt, no "wow it's been forever", no re-pitching from scratch; short and forward-moving
- Does not re-ask what she already told us (budget is stated: $8K/month)

### H18 | lindsey | nurture | 9.5 months silent, still inside the 1-year window
INPUT (response_type: nurture):
Lead (Roxanne Bellamy, artisan chocolate ecom), Sep 25, 2025: "Holiday season prep is eating us alive, let's talk in the new year maybe."
Lindsey, Sep 25, 2025: "Good luck with the holiday push."
(No contact since. Today is Jul 10, 2026, roughly 9.5 months after her last reply. Operator asked for a nurture touch.)
EXPECTED:
- Does NOT archive: 9.5 months is inside the 1-year window, so a touch is still permitted; the agent must not refuse citing the archive rule early
- Opener anchors to HER stated situation (the holiday season she was prepping for is long past; "the new year" she floated came and went) -- elapsed framing must match ~9-10 months, not "a few weeks" or "over a year"
- Value-only or outcome-curiosity touch, 1-3 sentences; soft CTA; banned openers absent
- If proof is used: Lindsey approved list only, named client + slug URL; no Google Ads mention, no agency mention, no sign-off

### H19 | samuel | followup | Call was YESTERDAY -- immediate post-call followup
INPUT (response_type: followup):
Lead (Vincent Okoro, personal injury firm), Jul 7: "Confirmed for Thursday morning, see you then."
Samuel, Jul 9: "Great call today, Vincent. More soon."
(No reply since Jul 9. Today is Jul 10, 1 day after the call.)
CALL TRANSCRIPT (provided): "Vincent's intake volume dropped 30% since a competitor started outspending them on LSAs. Goal: 25 signed cases/month by year end. He asked whether we could take over both LSAs and search. Agreed next step: Vincent sends read-only access to the Google Ads account this week."
EXPECTED:
- Mode stated: post-call followup, call within the last 6 months (yesterday) = onboarding goal, NOT booking another call
- References his specifics in own words (intake drop, LSA competitor, or the access next step), no quoting or parroting
- CTA = the agreed onboarding step (the read-only account access), NOT a calendar link, NOT "let's hop on another call"
- Elapsed framing matches "yesterday" / "after our call yesterday", never "last week"
- 2-4 sentences; no fabricated commitments beyond the transcript

### H20 | lindsey | followup | Call 5 months ago -- still onboarding goal, not re-book
INPUT (response_type: followup):
Lead (Marguerite Chan, premium tea and teaware ecom), Feb 8: "Booked on your Calendly for Tuesday."
Lindsey, Feb 10: "Really enjoyed the call today, Marguerite. I'll follow up soon."
Lindsey, Feb 24: "How did the fulfillment migration you mentioned end up going?"
(No reply since Feb 10 call. Today is Jul 10, 5 months after the call.)
CALL TRANSCRIPT (provided): "Marguerite runs $7K/month on Meta in-house. Main blocker: mid-migration to a new 3PL, wanted to finish before handing off ads. Timeline she gave: 'probably done by late spring.' Interested in email flows too."
EXPECTED:
- Mode stated: post-call followup with the call INSIDE the 6-month window (Feb 10 -> Jul 10 = 5 months): goal remains ONBOARDING, not booking a fresh discovery call
- Opener anchors to HER stated timeline: the 3PL migration she said would be "done by late spring" -- late spring has passed, so the anchor is her own words arriving
- CTA = onboarding next step (pick the handoff back up), not a new-call push; if any link were used it must be Lindsey's Calendly, but a soft/onboarding CTA without a link is the better fit
- Does not repeat the Feb 24 migration-status angle verbatim; elapsed framing matches ~5 months
- Lindsey scope: Meta/email only; no agency mention; no sign-off; 2-4 sentences

### H21 [3x] | samuel | followup | Call 7 months ago -- goal switches to re-engagement
INPUT (response_type: followup):
Lead (Douglas Ferrier, regional moving company), Dec 7, 2025: "See you on the call Tuesday."
Samuel, Dec 9, 2025: "Great talking today, Douglas. I'll be in touch."
(No reply since Dec 9, 2025. Today is Jul 10, 2026, 7 months after the call.)
CALL TRANSCRIPT (provided, dated Dec 9, 2025): "Douglas spends $6K/month on Google, unhappy with lead quality. Wanted to start in January after their slow season. Hesitation: locked into a 3-month contract with current provider through February."
EXPECTED:
- Mode stated: post-call followup with the call 6+ MONTHS ago (Dec 9 -> Jul 10 = 7 months): the original call is stale, goal = book a NEW discovery call to reassess, NOT push onboarding from December's context
- May reference the December situation only as past context (his contract ran through February, his January start window came and went); must NOT treat 7-month-old facts (spend, provider, hesitation) as current
- Call CTA with Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Elapsed framing matches ~7 months / "since December", never "a few weeks" or "about a month"
- 2-4 sentences; no fabricated updates about what happened since

### H22 | samuel | lead | No-show apologizes and asks to rebook
INPUT (response_type: lead):
Lead (Fern Whitaker, allergy and asthma clinic), Jul 6: "Booked Wednesday at 10 on your calendar."
Samuel, Jul 8: "Waited about 15 minutes on the call, hope everything's okay. Happy to find another time."
Lead (Fern Whitaker), Jul 10: "I am so sorry, we had a staffing emergency Wednesday. Can we rebook? I promise I'll be there."
EXPECTED:
- She asked for a call: the response is essentially JUST the calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7, gracious and short
- Zero guilt-tripping, no "no problem, these things happen" over-apology stack, no lecture about the missed slot
- No pre-call questions or warm-up content bundled in (warm-up happens after she books the new slot)
- Does not parrot "staffing emergency" back; 1-2 sentences plus the link

### H23 | lindsey | followup | No-show, silent since -- not post-call, nothing to recap
INPUT (response_type: followup):
Lead (Antonia Reyes, lash and brow studio, 3 locations), Jul 6: "Booked your Wednesday 2pm slot on Calendly!"
(Call was scheduled Jul 8 on Lindsey's calendar. Antonia never joined. No messages since her Jul 6 booking confirmation. Today is Jul 10, 2 days after the no-show.)
EXPECTED:
- Does NOT treat this as post-call: no call happened, there is no transcript, and any "great talking to you" or "as we discussed" framing is a fabrication fail
- Light, no-fault rebook nudge: assumes good faith (no accusatory "you missed our call"), offers the slot again with Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min
- 1-3 sentences; elapsed framing matches ~2 days since the scheduled time
- No discovery questions, no pricing, no case study; the single goal is getting the call rebooked
- Lindsey register; no agency mention; no sign-off

### H24 | samuel | lead | Third reschedule request
INPUT (response_type: lead):
Lead (Barrett Klein, commercial solar installer), Jun 30: "Booked for July 3rd."
Lead (Barrett Klein), Jul 2: "Have to push our call, permit inspection came up. Rebooked for the 8th."
Lead (Barrett Klein), Jul 7: "Ugh, moving it again to Tuesday the 14th, sorry."
Lead (Barrett Klein), Jul 10: "I hate to do this a third time but Tuesday isn't going to work now either. Can we find something later this month?"
EXPECTED:
- Gracious, short reply with the calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 so he can pick what actually holds
- Zero passive-aggression: no "third time's the charm", no counting his reschedules back at him, no "hope this one sticks"
- No parroting "I hate to do this"; no pressure framing or commitment demands
- 1-2 sentences plus the link; does not offer pricing, prep questions, or anything beyond rebooking

### H25 | samuel | warmup | Rescheduled twice, warmup already sent before the first date
INPUT (response_type: warmup):
Job post (Jun 28): "Family dentistry practice (brightbitedental.com), open since 2015, looking for Google Ads management."
Lead (Dr. Alan Voss), Jul 1: "Booked Thursday July 3rd on your calendar."
Samuel, Jul 2: "Managing Google yourselves for a practice open since 2015 gives us a lot to look at. If you haven't already, I definitely recommend going to my profile to check out my intro video and all the resources I have linked in my bio. So I can better prep for our call, a few quick things: what's your monthly ad budget, and is there a cost-per-patient target you're working toward?"
Lead (Dr. Alan Voss), Jul 2: "Budget is $5,500/month, no hard CPA target yet. Have to move the call to the 8th by the way."
Lead (Dr. Alan Voss), Jul 8: "So sorry, emergency root canal day. Moved us to July 15th, final answer."
(Call now booked on Samuel's calendar for Jul 15. Today is Jul 10. Operator asked for "a warmup for the rescheduled call.")
EXPECTED:
- Does NOT re-send discovery questions: Q3 and Q4 were asked Jul 2 and ANSWERED ($5,500/month, no hard CPA target counts as answered); re-asking anything already answered is the #1 documented warmup failure
- Does NOT repeat the profile video nudge (already sent Jul 2 = video mentioned in-thread)
- Correct output is either a skip ("warmup already sent and answered; nothing new to ask") or a 1-2 sentence Case-A-style note confirming the new date with a specific forward-look; nothing more
- No calendar link (call is booked), no pricing talk despite his budget being sub-$5K-adjacent territory: the booked call is protected, routing happens on/after the call
- No case study attachment (warmup hard rule)

### H26 [3x] | samuel | lead | Books at 10:02, cancels at 10:40 same morning
INPUT (response_type: lead):
Lead (Selma Fontaine, boutique pilates studio franchise), Jul 9, 10:02 AM: "Just booked your Friday slot, excited to talk."
Lead (Selma Fontaine), Jul 9, 10:40 AM: "Actually I have to cancel that. We just got hit with a surprise tax bill and I need to sort cash flow first. I'll rebook when things settle, promise."
(Today is Jul 10. No response sent yet to her cancellation.)
EXPECTED:
- Responds to the cancellation (leads who say "not ready / on hold" ALWAYS get a reply): brief, gracious, door open -- "no rush, you know where to find me" energy
- Short (1-2 sentences); a simple acknowledgment, NOT a paragraph, NOT a save-the-deal pitch
- No pricing concessions, no discount offer, no "what if we started smaller" (cash-flow comment is not an invitation to negotiate)
- No calendar link push (she knows where it is and said she'll rebook); no warmup content (the call is no longer booked)
- Thread returns to pre-call status: any future cadence math runs from her Jul 9 message

### H27 | samuel | warmup | Call in 2 hours -- same-day warmup
INPUT (response_type: warmup):
Job post (Jul 8): "Water damage restoration company needs Google Ads help ASAP. Site: rapiddryrestoration.com. We spend about $9K/month."
Lead (Cole Brennan), Jul 10, 8:50 AM: "Grabbed your 1 PM slot for today, talk soon."
(Call booked on Samuel's calendar for TODAY, Jul 10, 1:00 PM. Current time ~11 AM. Today is Jul 10.)
EXPECTED:
- Warmup still generates normally: same-day booking does not change the matrix, and 2 hours is enough for a low-friction prep note
- Inventory: Q2 answered-adjacent (spending now), Q3 ANSWERED ($9K/month), Q7 ANSWERED (rapiddryrestoration.com). Asks only genuinely unanswered questions (Q1, Q4, Q5, Q6 territory); never budget or website
- Any time reference reads as TODAY ("on our call this afternoon" / "later today"), never "this week" or "on Friday"
- Video nudge included (not mentioned) + optional YouTube sentence (samuel); message stays short given the tight window
- No calendar link, no pricing, no case study attachment

### H28 | lindsey | warmup | Call tomorrow -- standard timing
INPUT (response_type: warmup):
Job post (Jul 7): "Organic skincare brand on Shopify (herbalglowskin.com) needs Meta ads + Klaviyo help. Spending $6,500/month on Meta through a freelancer we're phasing out."
Lead (Dahlia Moreau), Jul 9: "Booked your Friday morning Calendly slot!"
(Call booked on Lindsey's calendar for Jul 11, tomorrow. Today is Jul 10.)
EXPECTED:
- Inventory: Q1 ANSWERED (freelancer being phased out), Q2 ANSWERED (Meta via freelancer + Klaviyo context), Q3 ANSWERED ($6,500/month), Q7 ANSWERED (herbalglowskin.com). UNANSWERED: Q4, Q5, Q6 -- asks only those three, conversationally (no numbered list at 3)
- Time reference, if any, reads as "tomorrow" / "Friday", matching the actual booking
- Profile video nudge included (not mentioned); NO YouTube sentence (lindsey hard rule)
- No calendar link, no pricing, no re-asking budget/website/freelancer history
- Lindsey register; no agency/co-founder mention; no sign-off; under 150 words

### H29 | samuel | warmup | Call a week out -- warmup timing unchanged
INPUT (response_type: warmup):
Job post (Jul 6): "B2B industrial fastener distributor (boltandbeamco.com) wants Google Ads for quote requests. In business 22 years, ~$8M/year revenue."
Lead (Ernie Slate), Jul 9: "Booked your calendar for Friday the 17th, only day I had open."
(Call booked on Samuel's calendar for Jul 17, a week away. Today is Jul 10.)
EXPECTED:
- Warmup generates now: a week-out call does not delay or change the warmup; the message rides between booking and call regardless of gap size
- Inventory: Q5 ANSWERED (22 years), Q6 ANSWERED ($8M/year), Q7 ANSWERED (boltandbeamco.com). UNANSWERED: Q1, Q2, Q3, Q4 -- Q3 (budget) is MANDATORY among the asks; short list acceptable at 4 unanswered
- Any date reference matches Jul 17 / "next Friday", not "tomorrow" or "this week" ambiguity that misstates the gap
- Video nudge + optional YouTube (samuel); opens with a specific reference (B2B quote-request angle), not generic
- No calendar link, no pricing, no case study attachment

### H30 | samuel | lead | Timezone-ambiguous time offer from Sydney
INPUT (response_type: lead):
Lead (Lachlan Petty, adventure tour operator based in Sydney, Australia), Jul 9: "We're keen to move on this. I'm in Sydney so scheduling is the fun part. Thursday at 9 works best on my end, does that suit? Otherwise Friday at 7."
EXPECTED:
- He gave specific available times: does NOT send a calendar link (guidelines hard rule); picks/confirms from HIS offered times
- Handles the timezone ambiguity explicitly: "Thursday at 9" Sydney time is a different day/time in the US -- the response must confirm the timezone and the AM/PM reading rather than silently assume ("Thursday 9 AM Sydney time works, that's Wednesday evening my side" style confirmation, or a direct ask to confirm AEST)
- Must not fabricate a precise UTC conversion presented as certain if the response instead chooses to ask; either confirm-with-stated-assumption or ask, never silently guess
- Short, decisive, no parroting "scheduling is the fun part"; no pre-call questions bundled in

### H31 | samuel | nurture | "Circle back in Q1" said last December -- Q1 came and went
INPUT (response_type: nurture):
Lead (Georgia Whitfield, CFO of a regional accounting firm), Dec 15, 2025: "This looks strong but our budgets are locked. Circle back in Q1 when the new fiscal opens and we'll take a real look."
Samuel, Dec 15, 2025: "Will do, enjoy the holidays."
Samuel, Apr 7, 2026: "Did the Q1 vendor window end up opening like you expected?"
(No reply since Dec 15, 2025. Today is Jul 10, 2026.)
EXPECTED:
- Correctly reads the calendar: she said Q1 in DECEMBER, meaning Jan-Mar 2026 -- that window opened AND closed over 3 months ago, and we already asked about it once (Apr 7). The response must not pretend Q1 is upcoming or ask the same Q1 question again
- Rotates to a new angle (not the Apr 7 outcome-curiosity bare question): done-for-them observation, seasonal trigger, or fresh-win framing anchored to her fiscal-year situation now being half over
- Elapsed framing matches ~7 months since December / Q1 being a full quarter behind us
- Soft CTA; 1-3 sentences; banned openers absent; no calendar link required with a soft close

### H32 | samuel | nurture | "Circle back in Q1" said LAST WEEK in July -- Q1 is 6 months away
INPUT (response_type: nurture):
Lead (Ansel Toomey, ski and snowboard shop, 2 locations), Jul 1, 2026: "Love this, but retail cash is brutal until the winter buying season pays off. Circle back in Q1 and we'll have room to move."
Samuel, Jul 1, 2026: "Makes sense, talk then."
(No contact since. Today is Jul 10, 2026, 9 days later. Operator asked for a nurture touch.)
EXPECTED:
- Correctly reads the calendar the OTHER direction: said in July, "Q1" means Q1 2027, roughly 6 months away; his stated window has NOT arrived and 9 days of silence is not even a nurture gap
- Flags the mismatch to the operator: the lead set an explicit far-future timeline 9 days ago, and per the silence-duration sanity check this recency doesn't fit nurture at all. Correct outcome is NO MESSAGE (hold until his window approaches) or at most a zero-ask value-only touch
- Any generated touch has NO call ask, NO calendar link, and does not pretend Q1 has arrived
- Elapsed framing, if any, matches ~1 week; opener anchored to his stated cash-cycle reason, never "just checking in"

### H33 [3x] | samuel | followup | Two calls with the same lead -- most recent transcript governs
INPUT (response_type: followup):
Lead (Rosalind Beaumont, multi-location physical therapy group), Mar 10: "Booked Thursday for a first chat."
Samuel, Mar 12: "Great meeting you today, Rosalind."
Lead (Rosalind Beaumont), Jul 2: "We're finally ready to get serious. Booked Monday to pick this back up."
Samuel, Jul 6: "Great call today. I'll get moving on next steps."
(No reply since Jul 6. Today is Jul 10, 4 days after the second call.)
TRANSCRIPT 1 (Mar 12 call): "Rosalind exploring options, ~$4K/month budget, main concern was whether ads work for PT referrals. No commitment, said timing was 6+ months out."
TRANSCRIPT 2 (Jul 6 call): "Budget now approved at $11K/month across two states. Wants patient-volume growth for the two newest clinics. Agreed next step: Rosalind sends Google and Meta account access plus location list by Friday."
EXPECTED:
- The Jul 6 transcript governs: mode = post-call followup on the MOST RECENT call (4 days ago, well inside 6 months) with an onboarding goal
- References the July specifics (approved $11K budget, two new clinics, or the access + location list next step); stale March facts (the $4K figure, the skepticism, the 6-month timeline) must NOT appear as current
- CTA = the agreed onboarding step (account access / location list), NOT a calendar link, NOT another call
- The "by Friday" in the transcript is HER deliverable; the response may reference her sending things without the agent committing to its own dated deadline
- Elapsed framing matches ~4 days since the call; 2-4 sentences

### H34 | lindsey | followup | Day 13, just before the day-14 card boundary
INPUT (response_type: followup):
Lead (Beatrix Kohl, European bakery cafe chain, said "$7K/month for Meta" on Jun 27), Jun 27: "Wonderful case studies. Our co-owner is on holiday until mid-July, decision waits for her."
Lindsey, Jun 29: "Is this project still open on your end?"
Lindsey, Jul 1: "How is the decision timeline looking with your co-owner away?"
Lindsey, Jul 4: "One thing I've seen with multi-location food brands: location-split campaigns almost always reveal one shop quietly subsidizing the others' ad spend."
(No reply since Jun 27. Today is Jul 10, 13 days of silence. Touches 1-3 sent, pricing card never used.)
EXPECTED:
- Mode stated: pre-call followup, touch 4 (~day 14 cadence; day 13 qualifies as "~day 14")
- Touch 4 = performance-pricing card: concept via the company_rules DB query, NO hardcoded dollar amounts, NO percentage tiers
- Paired with call ask + Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min ($7K = default path, not Jay)
- Does not repeat the Jul 4 location-split insight or either earlier angle; card marked use-once
- Lindsey register, no agency mention, no sign-off; 1-3 sentences; elapsed framing matches ~2 weeks

### H35 [3x] | lindsey | followup | Call exactly 6 months ago -- the onboarding/re-engage boundary
INPUT (response_type: followup):
Lead (Imelda Vargas, quinceanera and event dress ecom), Jan 8: "Booked your Calendly for Friday."
Lindsey, Jan 10: "Loved talking through the collection today, Imelda. I'll follow up soon."
Lindsey, Jan 26: "How did the spring collection photography end up turning out?"
(No reply since the Jan 10 call. Today is Jul 10, exactly 6 months after the call.)
CALL TRANSCRIPT (provided, dated Jan 10): "Imelda spends $5,500/month on Meta in-house. Peak season is spring quinceanera bookings. Wanted to revisit after peak season wrapped, roughly early summer."
EXPECTED:
- Recognizes the boundary: Jan 10 -> Jul 10 is exactly 6 months, the pivot point between "within the last 6 months = onboarding" and "6+ months = re-engagement." The response must explicitly state which side it lands on and why
- The defensible read: at 6 months the call context is stale AND her own stated timeline ("revisit after peak season, early summer") has matured -- a fresh-call re-engagement anchored to her early-summer window, with Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min, is correct. Also acceptable: flagging the boundary to the operator and asking whether to onboard or re-engage
- Confidently pushing onboarding specifics from the 6-month-old call as if current (her spend, her setup) without acknowledging staleness = fail
- Elapsed framing matches ~6 months / "since January", never "a few weeks" or "last month"
- Does not repeat the Jan 26 photography angle; Lindsey register; no agency mention; no sign-off; 2-4 sentences
