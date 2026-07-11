# SDR Smoke Test Scenarios -- WARMUP (Samuel) + LINDSEY profile

Runner protocol (applies to every scenario):
- Spawn sdr-agent with the INPUT as the pasted conversation, response_type and profile as specified.
- SMOKE TEST MODE: agent must NOT insert into sdr_generation_log. All other steps run normally, including validate_response.py.
- Agent writes its FULL output (Context Retrieved + ---RESPONSE--- + Validation + any VA block) to /tmp/sdr_smoke/outputs/run_<RUNID>.md via Bash heredoc, returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure consistency.

---

### W01 | samuel | warmup | Case A (all answered + video mentioned)
INPUT:
Lead (Derek Vaughn), Jul 1: "Hi Samuel, we run an HVAC company in Phoenix, been in business 12 years, doing about $2.4M/year. We spend $8K/month on Google Ads through an agency we're firing -- results tanked. Target is $150 cost per booked job. Site is desertairpros.com. Watched your intro video, liked the tracking-first approach."
Samuel, Jul 1: "That drop-off usually traces back to conversion tracking or search term bloat. Worth a quick call to dig in: https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead (Derek Vaughn), Jul 2: "Booked for Thursday."
EXPECTED:
- Case A: NO discovery questions, NO video nudge, NO YouTube mention
- Brief personalized note (1-2 sentences) referencing their specifics (agency drop-off / tracking)
- No pricing, no disqualification, nothing that jeopardizes the call

### W02 | samuel | warmup | Case B (all answered, video NOT mentioned)
INPUT:
Lead (Monica Reyes), Jul 3: "We're a med spa in Austin, open 6 years, around $1.8M revenue. Currently spending $6K/month split between Google and Meta, managed in-house by our office manager. Goal is $80 per consultation booked. mrbeautyaustin.com"
Samuel, Jul 3: "In-house split budgets usually underperform on both platforms. Let's talk through it: https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead (Monica Reyes), Jul 4: "Just booked a time for Monday."
EXPECTED:
- Case B: profile video nudge, NO discovery questions
- YouTube channel sentence allowed (samuel): youtube.com/@creeksidemarketing1 -- separate sentence
- Personalized forward-look referencing their situation

### W03 [3x] | samuel | warmup | Case C partial (REPLAY-style: answers buried in JD + screening)
INPUT:
Job description (Paul McMillian): "Looking for a Google Ads expert for our roofing company. We've been burned by two agencies already -- lots of spend, few leads. Currently running Google Ads at about $4,500/month. Website: mcmillianroofing.com"
Upwork screening answer (Paul): "In business since 2009."
Lead (Paul McMillian), Jul 5: "Your proposal stood out. Booked a call on your calendar for Wednesday."
EXPECTED:
- Q1 (prior agency), Q2 (current strategy), Q3 (ad spend), Q5 (years), Q7 (website) = ANSWERED (from JD + screening)
- Asks ONLY Q4 (CPA/ROAS goal) and Q6 (revenue) -- asking budget/website/years/agency again = FAIL
- Video nudge included (not mentioned anywhere)
- Answered/unanswered inventory in Context Retrieved

### W04 | samuel | warmup | Case D (bare thread, all 7 unanswered)
INPUT:
Lead (Kelly Nguyen), Jul 7: "Hi, booked a call with you for Friday. Looking forward to it."
(No job description provided.)
EXPECTED:
- Case D: video nudge + all 7 questions (short list acceptable)
- Still personalized where possible; no generic "looking forward to speaking with you" close
- Q3 budget included

### W05 [3x] | samuel | warmup | Budget mandatory (Q3 unanswered, most else answered)
INPUT:
Lead (Omar Siddiqi), Jul 6: "We run an e-commerce supplement brand, 4 years in, about $3M/year revenue. Tried a freelancer last year, wasted six months. Site is vitaledgesupps.com. Target ROAS is 3x. Booked your Thursday slot."
EXPECTED:
- Q3 (ad spend) UNANSWERED -> MUST be asked (mandatory pre-qualification lever)
- Does NOT re-ask revenue, years, website, agency history, or ROAS
- Video nudge included

### W06 [3x] | samuel | warmup | Jay-calendar skip
INPUT:
Lead (Matt Longo), Jul 6: "My adspend is about 1K/mo which sounds like you will not work with smaller businesses."
Samuel, Jul 6: "Hey Matt, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead (Matt Longo), Jul 7: "Thanks, I booked a time on Jay's calendar for next Tuesday."
EXPECTED:
- NO warmup message generated. Agent states the lead is booked on Jay's calendar and warmup is skipped
- Does not produce a discovery-question message

### W07 | samuel | warmup | Pricing protection (lead asked pricing pre-booking)
INPUT:
Lead (Sara Bloom), Jul 5: "What are your fees roughly? We're a boutique fitness studio, 3 years in, spending $5,500/month on Meta ourselves. sarabloomfit.com"
Samuel, Jul 5: "Pricing is custom and performance-based, easiest to walk through it live: https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead (Sara Bloom), Jul 6: "Fair enough, booked for Monday."
EXPECTED:
- Warmup does NOT revisit pricing in any form (no ranges, no percentages, no fee terms)
- Asks only unanswered: Q4 (CPA/ROAS), Q6 (revenue). Q1 arguably unanswered (no agency mention -- "ourselves" answers Q2; asking Q1 is acceptable)
- Video nudge included, under 150 words

### W08 | samuel | warmup | Video-confirmed via content reference
INPUT:
Lead (Jared Holt), Jul 7: "Booked! By the way, the point in your video about wasted spend from broad match hit home -- that's exactly our problem. We're a moving company, $7K/month on Google, been operating 9 years, movewisela.com. Want cost per booked move under $120. Revenue around $2.2M."
EXPECTED:
- Video counts as WATCHED (referenced content) -> no video nudge, no YouTube
- All 7 answered except arguably Q1/Q2 partially -- broad match problem covers current strategy; prior agency unknown, asking Q1 alone is acceptable
- Short, personalized; Case A or minimal Case C

---

## LINDSEY PROFILE SCENARIOS

### X01 [3x] | lindsey | lead | Google Ads ask -> scope redirect
INPUT:
Lead (Brian Mercer), Jul 8: "Hi Lindsey, we're a landscaping company spending about $6K/month. We want help with Google Ads mainly, maybe some Facebook later. Can you manage both?"
EXPECTED:
- States she specializes in Meta and email -- depth over breadth, NO apology
- Does NOT claim Google Ads as a service, does NOT say "we have a Google Ads expert" or reference co-founders/agency/Cade
- Jay framing would be wrong here ($6K spend fits) -- should pitch Meta value or ask diagnostic
- If call CTA: https://calendly.com/lindsey-bouffard/30min (NOT Samuel's link)

### X02 [3x] | lindsey | lead | Pricing Stage 1 + her calendar
INPUT:
Lead (Alicia Fontaine), Jul 8: "Hi Lindsey, we run a skincare e-commerce brand doing about $12K/month in Meta spend. What's your monthly rate for full management?"
EXPECTED:
- Stage 1: custom/performance-based, NO numbers, NO percentage tiers
- Calendar link is Lindsey's Calendly: https://calendly.com/lindsey-bouffard/30min
- NO sign-off name ("Lindsey", "Best," etc.)
- "I've seen/done" register acceptable, no agency/co-founder mention

### X03 | lindsey | lead | Case study ask -> Meta-first re-rank
INPUT:
Lead (Tessa Wu), Jul 8: "Do you have examples of results with e-commerce beauty brands? We sell clean skincare on Shopify, spending around $8K/month on Meta."
EXPECTED:
- Meta/ecom case study (e.g., Chagrin Valley Beauty or Aura Displays), NOT a Google-only case study
- Real URL from the case study table, no placeholder brackets
- Shopify treated as context, not a service

### X04 [3x] | lindsey | lead | Sub-$5K -> Jay verbatim template
INPUT:
Lead (Ron Delgado), Jul 8: "Love your background. We're a small taqueria group, only spending about $1,200/month on Facebook ads. Is that too small for you?"
EXPECTED:
- Jay routing with approved verbatim template (name adapted): "Hey Ron, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- "my partner Jay" framing is fine for Lindsey
- No disqualification language, no $5K threshold mention, no sign-off

### X05 | lindsey | lead | Hourly rate confusion
INPUT:
Lead (Gwen Farrell), Jul 8: "Your Upwork profile says $75/hr -- so would this be billed hourly? Roughly how many hours a month would our Meta account need?"
EXPECTED:
- HARD BLOCK: no $/hr figure restated anywhere (not even $75/hr)
- Approved script: hourly rate on Upwork is what the platform requires for applications; we only do custom retainers that are performance-based
- Calendly link if call CTA

### X06 [3x] | lindsey | warmup | Case C, no YouTube
INPUT:
Lead (Dana Okafor), Jul 6: "Hi Lindsey, we're a meal prep company in Tampa, been running Facebook ads ourselves at about $3,500/month with mixed results. tampafreshprep.com. Booked a call on your calendar for Wednesday."
EXPECTED:
- Q1/Q2/Q3/Q7 answered; asks only Q4 (CPA/ROAS), Q5 (years), Q6 (revenue)
- Profile video nudge YES, YouTube channel mention NO (hard rule for lindsey)
- No sign-off name, under 150 words, no pricing

### X07 [3x] | lindsey | lead | Sub-$3K post-booking redirect (operator instructions)
INPUT:
Lead (Felix Grant), Jul 5: "Booked a time on your Calendly for Thursday. To answer your budget question -- we're at about $2K/month on Meta right now for our barbershop chain."
EXPECTED:
- Sub-$3K + already booked on Lindsey's calendar -> redirect to Jay handling per post-booking rules
- Includes Lindsey's operator instructions block (not visible to lead): "Queenie: notify team that Felix Grant's call on Lindsey's calendar should be redirected to Jay. Send Jay the meeting link. Mark the calendar event grey."
- Lead-facing text stays positive, no disqualification language

### X08 | lindsey | lead | Voice register check ("I've seen/done")
INPUT:
Lead (Hana Lieber), Jul 8: "We've run Meta ads for our event venue for a year and CPMs keep climbing. What would you change first?"
EXPECTED:
- Experience-first framing: patterns from accounts she's audited / her own business, "what I've seen" over "here's what I'd do"
- Concrete first-move answer, then diagnostic or call CTA with Calendly link
- No agency/co-founder mention, no sign-off

### X09 | lindsey | followup | Pre-call touch with her calendar
INPUT:
Lead (Marcus Bell), Jun 30: "Interested in Meta management for our furniture store, spend is around $9K/month."
Lindsey, Jul 1: "That range is where creative testing structure matters most. Worth a quick call: https://calendly.com/lindsey-bouffard/30min"
(No reply since Jul 1. Today is Jul 9.)
EXPECTED:
- Followup mode, touch 2-3 territory (~8 days silent), 1-3 sentences, easy to answer
- If calendar link included, it is Lindsey's Calendly, never Samuel's
- No "just checking in" / "any updates?", no re-sent resources, no sign-off

### X10 | lindsey | lead | Email marketing scope (second service)
INPUT:
Lead (Iris Templeton), Jul 8: "Besides ads, our email list of 40K is basically dormant. Do you do email marketing too, or just Meta?"
EXPECTED:
- Yes -- email marketing IS in scope (Meta + email are her two services)
- Credibility anchor available: built and sold her own e-commerce business
- No mention of Google/TikTok/programmatic, no agency framing, no sign-off
