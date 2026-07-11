# SDR Smoke Test Scenarios -- FOLLOWUP + NURTURE (Samuel)

Same runner protocol as scenarios_lead.md. response_type as marked.

---

### F01 | samuel | followup | Touch 1 (~day 2)
INPUT (response_type: followup):
Lead (Jake Morrow, landscaping co), Jul 5: "Thanks for the proposal, looks interesting. Let me review with my brother this week."
Samuel, Jul 5: "Sounds good, take your time."
[No lead response since. Today is Jul 9. No prior follow-up touches sent.]
EXPECTED:
- Recent contact check runs first (name is synthetic, should be clear)
- Mode stated: pre-call followup, touch 1
- Bare status question or outcome curiosity, 1-3 sentences, easy to answer
- No "just checking in" / "any updates?"; no resource blast

### F02 | samuel | followup | Touch 2 (~day 4)
INPUT (response_type: followup):
Lead (Tia Boland, med spa), Jun 30: "This looks good, need to talk to my business partner."
Samuel, Jul 2: "Is this project still open on your end?"
[No response. Today is Jul 9.]
EXPECTED:
- Touch 2 with a DIFFERENT angle than bare status (already used Jul 2)
- Short (1-3 sentences); some CTA
- Touch type labeled in output

### F03 | samuel | followup | Touch 3 (~day 7) warmer call push
INPUT (response_type: followup):
Lead (Omar Siddiqui, ecom supplements), Jun 27: "Impressive numbers. Give me a few days."
Samuel, Jun 29: "Is this still open on your end?"
Samuel, Jul 2: "How did the launch you mentioned end up going?"
[No response. Today is Jul 9.]
EXPECTED:
- Touch 3, third distinct angle (not status, not outcome curiosity)
- Warmer push toward call WITH Samuel calendar link
- 1-3 sentences

### F04 [3x] | samuel | followup | Touch 4 (~day 14) performance-pricing card
INPUT (response_type: followup):
Lead (Chris Yoder, roofing, ~$8K/mo spend mentioned earlier in thread), Jun 24: "Solid proposal. Let me get through this storm season backlog."
Samuel, Jun 26: "Is the ads project still open?"
Samuel, Jun 29: "How did the backlog week end up going?"
Samuel, Jul 2: "One thing worth flagging: roofing CPCs usually dip in late summer, good window to build history before fall demand. Worth a quick call? https://calendar.app.google/wSdVbfwaJRzkw12E7"
[No response. Today is Jul 9, ~day 15 since last lead reply.]
EXPECTED:
- Touch 4 = performance-pricing card: performance-based concept pulled from company_rules DB query (NO hardcoded dollar amounts) + call ask
- Samuel calendar link ($8K = default path)
- Card used once total; labeled as the touch type

### F05 [3x] | samuel | followup | Touch dedup trap
INPUT (response_type: followup):
Lead (Wanda Ellis, ecom jewelry), Jun 22: "Beautiful case studies. Talk to my cofounder and circle back."
Samuel, Jun 24: "Is this project still open?"
Samuel, Jun 27: "How did the cofounder conversation go?"
Samuel, Jul 1: "Is this still open on your end?"
[No response. Today is Jul 9.]
EXPECTED:
- Detects bare status was used TWICE already (rule violation in history) and outcome curiosity once
- New touch is neither bare status nor outcome curiosity; rotates to an unused type
- Prior touch types listed in Context Retrieved

### F06 [3x] | samuel | followup | Pricing card already used
INPUT (response_type: followup):
Lead (Hank Rossi, HVAC), Jun 15: "Let me think on it."
Samuel, Jun 17: "Still open on your end?"
Samuel, Jun 20: "How did the Trane distributor deal end up going?"
Samuel, Jun 24: "Worth knowing how our pricing works: minimal retainer, the majority is earned only when we deliver results. Puts the risk on us. Worth a call? https://calendar.app.google/wSdVbfwaJRzkw12E7"
Samuel, Jul 1: "Closing thought: HVAC search demand spikes first hot week of August, accounts that build history in July ride it cheaper."
[No response. Today is Jul 9.]
EXPECTED:
- Performance-pricing card NOT reused (retired after Jun 24)
- Rotates to an unused touch type; possibly clean breakup or another library type
- No repeated stat/insight from Jul 1 message

### F07 [3x] | samuel | followup | Lead-reply sanity check
INPUT (response_type: followup):
Samuel, Jul 6: "Is this project still open on your end?"
Lead (Diane Kessler, dental), Jul 8: "Yes! Sorry, crazy week. We're still very interested. What would onboarding look like?"
EXPECTED:
- Detects the LEAD replied last: this is NOT a followup
- Switches to lead mode (states the switch) and answers the onboarding question
- Does NOT generate a proactive follow-up touch

### F08 | samuel | followup | Silence gap → nurture switch
INPUT (response_type: followup):
Lead (Paulo Mendes, ecom fitness), May 28: "Going to pause this conversation, we picked a direction internally."
Samuel, May 30: "No worries, best of luck with it."
[No contact since. Today is Jul 9, ~6 weeks.]
EXPECTED:
- Detects 3+ week silence: states switch to nurture mode and follows nurture rules
- Output reflects nurture logic (anchored opener), not followup cadence

### F09 | samuel | followup | Truncated thread check
INPUT (response_type: followup):
[Thread starts mid-conversation:]
Lead (partial): "...so that's why the last quarter was rough. Anyway, let me think about it."
EXPECTED:
- Asks for the full thread from the beginning (truncation detected)
- Does NOT generate a touch from incomplete context

### F10 [3x] | samuel | followup | Post-call with transcript
INPUT (response_type: followup):
Lead (Brianna Cole, meal prep startup), Jun 26: "Booked for Monday, see you then."
Samuel, Jun 30: "Great talking today, I'll get you the breakdown."
[No response since. Today is Jul 9.]
CALL TRANSCRIPT (provided): "Brianna said her biggest issue is CAC on Meta doubled since April, sitting at $58 against a $40 target. She wants to hit 200 weekly orders by September. Main hesitation: locked into a 3-month contract with her current freelancer through July 31. Agreed next step: Samuel sends over the proposal and a sample bi-weekly report."
EXPECTED:
- Post-call followup: references her SPECIFIC stated situation (CAC target, September goal, or July 31 contract) in own words, no quoting/parroting
- CTA = onboarding next step (proposal/report as agreed), NOT another call
- 2-4 sentences; no fabricated details beyond transcript

### F11 [3x] | samuel | followup | Post-call degraded (no transcript)
INPUT (response_type: followup):
Lead (Marcus Webb, pest control), Jun 24: "Perfect, booked for Thursday."
Samuel, Jun 26: "Great call today. I'll follow up soon."
[No response since. Today is Jul 9. No transcript provided.]
EXPECTED:
- Agent attempts DB transcript retrieval (fathom query); on not found, asks user for transcript OR (if instructed generate anyway) degraded mode: bare status question ONLY
- ZERO fabricated call references ("as we discussed X" banned)
- For this test the operator instruction is: "No transcript exists, generate anyway."

### F12 | samuel | followup | Resource re-send trap
INPUT (response_type: followup):
Lead (Elise Tanaka, ecom beauty), Jun 30: "Thanks for the report sample, will review."
Samuel, Jul 1: "Here's that sample report: https://creekside-dashboard.up.railway.app/report/91929c3e-b8b7-486d-a902-dd8ce67008f4"
Samuel, Jul 4: "Is this still open on your end?"
[No response. Today is Jul 9.]
EXPECTED:
- Does NOT re-send the sample report link (already shared)
- New angle from touch library

### F13 | samuel | followup | Sub-$5K touch cadence
INPUT (response_type: followup):
Lead (Gary Plunkett, lawn care, said "$2,500/month is my max spend" on Jun 24), Jun 24: "Let me mull it over."
Samuel, Jun 26: "Hey Gary, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
[No response. Today is Jun 27 equivalent: +1 day. Operator note: this is the +1 day Jay sub-cadence touch.]
EXPECTED:
- Jay sub-cadence: asks if they had a chance to look at the calendar
- Any calendar link included is JAY's, never Samuel's
- Short; no Samuel-profile call offer

### F14 | samuel | followup | Recent contact check STOP
INPUT (response_type: followup):
Lead (Tim Napier), Jun 20: "Interesting, let me review internally."
[No response in thread. Today is Jul 9.]
EXPECTED:
- Recent contact check finds the cross-channel hit (Fathom call "Meeting with Tim Napier - Upwork lead" on Jul 3) and STOPS
- Presents findings table + "generate anyway" override offer
- NO response generated

---

### N01 [3x] | samuel | nurture | Pre-call nurture touch 1
INPUT (response_type: nurture):
Lead (Felix Grant), posted job "Scale our DTC coffee subscription with Meta ads", May 12: "Goal is 500 new subscribers by end of summer. Interviewing a few people this week."
Samuel, May 13: "Strong goal. Happy to walk through how we'd get there."
[Lead went silent. No follow-ups sent since May. Today is Jul 9.]
EXPECTED:
- Recent contact check first
- Outcome-curiosity opener anchored to THEIR stated goal ("500 subscribers by end of summer" arriving now) -- NOT "just checking in"/"hope all is well"
- Short, soft; touch type labeled

### N02 [3x] | samuel | nurture | 60-day re-open, chose another provider (Byren pattern)
INPUT (response_type: nurture):
Lead (Isabelle Moreau, luxury watch ecom, $4k+ AOV), May 8: "We decided to go with another team for now. They offered a lower fee and we want to validate the market before investing more. Thanks for your time."
Samuel, May 8: "No worries at all, best of luck with the launch."
[Today is Jul 9, ~60 days later.]
EXPECTED:
- Opener anchors to HER stated situation ("validate the market" now matured ~2 months)
- In-message insight relevant to luxury/high-AOV buying behavior; exact-niche or honest-adjacent proof with real client (no fabrication)
- Anti-pitch close with near-zero-effort CTA ("just say the word" energy); NO calendar link needed with soft CTA
- No "guess the timing wasn't right"

### N03 | samuel | nurture | Performance-pricing card in nurture
INPUT (response_type: nurture):
Lead (Trent Kavanagh, home services), Apr 2: "Budget approvals got frozen, revisit in the summer."
Samuel, Apr 3: "Makes sense, I'll circle back."
Samuel, May 20: "How did the budget conversation end up going?"
Samuel, Jun 15: "One thing I noticed on your reviews page: you're getting weekend emergency calls mentioned a lot. That demand is basically un-targeted on Google right now in most markets."
[No response. Today is Jul 9. Performance-pricing angle never used.]
EXPECTED:
- Performance-pricing card angle: concept from DB (company_rules query), NO hardcoded dollar amounts
- Frames minimal retainer / majority earned on results
- Labeled; card retired after this use

### N04 | samuel | nurture | Clean breakup
INPUT (response_type: nurture):
Lead (Yusuf Ali, ecom electronics), Mar 15: "Not right now."
Samuel, Apr 20: "How did Q2 planning end up going?"
Samuel, May 25: "Fresh win from an electronics store we run ads for: 6.2x ROAS on a new campaign structure. Relevant to what you were building."
Samuel, Jun 20: "Our pricing runs performance-based: small retainer, most of the fee earned on results. Worth a look when you're ready."
[No response. Today is Jul 9.]
EXPECTED:
- Clean breakup touch: "Closing the loop, no need to reply" energy; soft, no pressure
- No new pitch content; very short

### N05 [3x] | samuel | nurture | Post-call nurture with transcript
INPUT (response_type: nurture):
Lead (Deb Halloran, bankruptcy law firm), had call May 2, declined May 9: "We're going to hold off, the partners want to focus on referral channels this year."
CALL TRANSCRIPT (provided): "Deb said intake volume dropped 30% since January. Partners skeptical of paid ads after a bad LSA experience. Goal was 25 signed cases/month. She personally thought search ads made sense but was outvoted."
[Today is Jul 9, ~60 days after decline.]
EXPECTED:
- Opener anchored to a transcript specific (referral-channel focus / intake drop timeline) in own words
- Soft CTA ONLY ("second set of eyes", "you know where to find me") -- NOT onboarding push, NOT hard call ask
- Legal proof if used = real (winterbotham-parham-teeple); no fabrication

### N06 | samuel | nurture | Post-call nurture degraded
INPUT (response_type: nurture):
Lead (Stu Perkins, gym franchise), had a call in early May per thread ("great chatting today" May 6), went silent after.
[No transcript provided. Today is Jul 9. Operator instruction: "No transcript available, generate anyway."]
EXPECTED:
- Degraded mode: outcome-curiosity framing from job-post goal; NO fabricated call references ("as we discussed")
- Soft CTA

### N07 [3x] | samuel | nurture | 1+ year silence archive
INPUT (response_type: nurture):
Lead (Martin Voigt, ecom furniture), last reply May 30, 2025: "We'll reach out when we're ready."
[Multiple nurture touches through 2025, no reply since May 30 2025. Today is Jul 9, 2026.]
EXPECTED:
- NO message generated
- States the lead is past the 1-year silence mark and should be archived per nurture policy

### N08 | samuel | nurture | What-made-the-difference ask
INPUT (response_type: nurture):
Lead (Tessa Bright, med spa), Jun 25: "We signed with another provider yesterday. Appreciate your thoroughness though, it was a close call."
Samuel, Jun 25: "No worries, best of luck with the launch."
[Today is Jul 9. Operator: send a learning touch.]
EXPECTED:
- What-made-the-difference ask: pure learning, no pitch, no case study shoehorned
- Gracious, 1-2 sentences

### N09 | samuel | nurture | Link rules
INPUT (response_type: nurture):
Lead (Andre Silva, SaaS scheduling tool), May 15: "Pausing this, going to try LinkedIn organic first like our advisor suggested."
[Today is Jul 9. Operator note: if you include any resource, you were considering our YouTube teardown video AND a LinkedIn post AND a Google Doc checklist.]
EXPECTED:
- MAX one link; LinkedIn links banned; plain URL only if used
- Opener anchored to "LinkedIn organic experiment" maturing

### N10 | samuel | nurture | Budget-routing exemption
INPUT (response_type: nurture):
Lead (Renata Cruz, bakery chain, said "$2K/month tops" back in April), Apr 18: "Too rich for us right now honestly."
Samuel, Apr 18: "Understood. My partner Jay works with businesses at your stage: https://calendar.app.google/nFP1Brwxz1TsetBA6"
[Never booked. Today is Jul 9. Operator: nurture touch.]
EXPECTED:
- Nurture message does NOT force Jay routing again or budget-qualify (budget rules don't apply to nurture)
- Soft re-engagement anchored to her situation; no spend talk
