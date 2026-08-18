# Wave 5 Regression Cases -- 2026-08-18 Batch Edit

Added cases covering: partner affirmative framing, lost-lead via "I hired", availability assumption, short call-booking response, brady/lindsey partner redirect, outside-link blocking, new calendar URL.

---

### R-A1 | samuel | lead | Partner affirmative framing -- white-label fulfillment request

INPUT:
Lead: "Hey, I run a small agency and I'm looking for someone to run ads for one of my clients on a white-label basis -- basically you'd be the media buyer, I'd be the account manager. Are you open to that?"

EXPECTED:
- Response uses affirmative framing: "Yes, this is something we can help with" (or equivalent)
- Routes to active partner (Keith) with his calendar link (calendar.google.com/calendar/...)
- Does NOT say "not a fit for us" or "we don't do white-label" (BLOCK: flat_decline_not_fit)
- Does NOT say "what he takes on is his call" (BLOCK: flat_decline_partner_distance)
- Does NOT cite the lead's ad spend or budget as the reason for routing
- Never send a second Creekside calendar after Keith's has been sent
- Validator: PASS or WARN only (no BLOCK)

---

### R-A2 | samuel | lead | Partner affirmative framing -- lead says "yes we can help" after negative context

INPUT:
Lead: "I'm spending about $800/month on Meta ads for my fitness studio. Looking for help."

EXPECTED:
- Revenue + spend trigger partner routing (pre-$3K spend; assume no revenue data = low-tier)
- Response routes to Keith using the approved verbatim template
- No "not a fit" framing
- Affirms we can help via Keith, not a decline
- Validator: PASS or WARN only (no BLOCK)

---

### R-B1 | samuel | lead | "I hired" = lost lead

INPUT:
Lead: "Hey, I hired someone last week to handle my Google Ads. Just wanted to let you know."

EXPECTED:
- Treated as LOST LEAD (past-tense hiring language = they hired someone else)
- Response is short (2-3 sentences max), gracious well-wish, door left open
- Does NOT respond as if we were hired ("Great, let's get started")
- Does NOT ask diagnostic questions
- Does NOT validate their decision ("sounds like you made the right call")
- Validator: WARN at most (hired_someone_else_lost_lead_warn may fire -- acceptable); PASS preferred

---

### R-B2 | lindsey | lead | "We went with someone" = lost lead

INPUT:
Lead: "We went with another freelancer for the Meta campaign. Thanks though."

EXPECTED:
- Treated as LOST LEAD (went with someone = hired elsewhere)
- Short gracious response: "No worries, best of luck. Reach out anytime." or similar
- No self-incrimination ("I should have sent the proposal sooner")
- No validating ("sounds like you made a smart move")
- Validator: PASS or WARN (no BLOCK)

---

### R-C1 | samuel | lead | Availability assumption -- BLOCKed

INPUT:
Lead: "Are you free this week? I'd like to get on a call."

EXPECTED:
- Response sends calendar link (https://calendar.app.google/iwVAR8raqiD9a7dx6)
- Does NOT say "should be wide open this week" or "I'll make it work" or "any time works"
- Response is SHORT (75 words max per the data-backed call-request rule)
- Validator: PASS (availability_assumption_warn must NOT fire)

---

### R-D1 | samuel | lead | Short response when lead asks for call

INPUT:
Lead: "Can we get on a call? Want to walk through our situation."

EXPECTED:
- Response is SHORT: yes + optional budget ask + calendar link. Under 75 words.
- NO diagnostic content, audit preview, strategy paragraphs before the call
- Calendar link: https://calendar.app.google/iwVAR8raqiD9a7dx6
- Validator: PASS (reply_length_excessive should not fire)

---

### R-D2 | lindsey | lead | Short response when lead asks for call

INPUT:
Lead: "Let's hop on a call, what does your availability look like?"

EXPECTED:
- Response sends Lindsey's calendar (https://calendly.com/lindsey-bouffard/30min)
- Short, under 75 words
- No availability assumptions ("I'm pretty open")
- Validator: PASS

---

### R-E1 | lindsey | lead | Brady/lindsey partner redirect -- reclaim.ai link passes

INPUT:
Lead: "I'm just starting out, haven't launched yet. I'm thinking about $500/month in ads for my salon."

EXPECTED:
- Pre-revenue / sub-$3K lead triggers partner routing on lindsey profile
- Active partner for lindsey = Brady; loads docs/partners/brady.md
- Response routes to Brady with his reclaim.ai calendar link
- Brady's calendar URL (https://app.reclaim.ai/m/brady-tibbits/flexible-quick-meeting) is whitelisted for lindsey
- does NOT contain Keith's calendar.google.com link (BLOCK: inactive partner on this profile path)
- Validator: PASS or WARN only (no BLOCK for Brady's reclaim.ai URL)

---

### R-E2 | lindsey | lead | Keith's calendar on lindsey profile still BLOCKs

INPUT:
(Simulate: a draft that accidentally contains Keith's calendar.google.com URL in a lindsey-profile response)

VALIDATOR ONLY TEST:
Run: echo "Hey Tanya, check out Keith's calendar: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1rM42oKd0V45PouVuipnzu1DvAy-uNRHnTgnnVaasVqfpOk1ekphBNJ0qYAvm-XgeH41ztaTFu" | python3 .claude/agents/sdr-agent/validate_response.py --profile lindsey

EXPECTED:
- VERDICT: BLOCK
- Issues include: inactive_partner_name_bleed (Keith) AND non_whitelisted_calendar_url or inactive_partner_calendar_bleed

---

### R-F1 | samuel | lead | Old Samuel calendar URL is blocked

VALIDATOR ONLY TEST:
Run: echo "Go ahead and book here: https://calendar.app.google/wSdVbfwaJRzkw12E7" | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- VERDICT: BLOCK
- Issues include: non_whitelisted_calendar_url (old URL is no longer whitelisted)

---

### R-F2 | samuel | lead | New Samuel calendar URL passes

VALIDATOR ONLY TEST:
Run: echo "Go ahead and grab a time here: https://calendar.app.google/iwVAR8raqiD9a7dx6" | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- VERDICT: PASS (or WARN for unrelated issues only)
- No calendar BLOCK

---

### R-G1 | samuel | lead | Outside link (YouTube URL) is blocked

VALIDATOR ONLY TEST:
Run: echo "Check out our YouTube channel: https://youtube.com/@creeksidemarketing1 and let me know what you think." | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- VERDICT: BLOCK
- Issues include: outside_link_block (youtube.com URL)

---

### R-G2 | samuel | lead | Case study URL passes the outside-link check

VALIDATOR ONLY TEST:
Run: echo "Here's a case study from a similar client: https://creeksidemarketingpros.com/case-study-digital-marketing/lawnvalue" | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- VERDICT: PASS (or WARN for unrelated issues only)
- No outside_link_block (case study URLs are whitelisted)

---

### R-H1 | samuel | lead | AI-slop phrases blocked

VALIDATOR ONLY TEST for S1:
Run: echo "You can clearly tell the difference between a specialist and a generalist -- and that matters." | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- Issues include: seal_clapping (can tell the difference between)
- VERDICT: WARN (auto-fixed)

VALIDATOR ONLY TEST for S7:
Run: echo "You asked for honest, so here it is: your current campaigns are burning money." | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- Issues include: setup_sentence (you asked for honest so here it is)
- VERDICT: WARN (auto-fixed, opener stripped)

---

### R-I1 | samuel | followup | Stale-link path -- 6-month-old-call followup must use new calendar URL

VALIDATOR ONLY TEST:
Run: echo "It has been a while since we talked. If you want to reconnect and see where things stand, grab a time here: https://calendar.app.google/iwVAR8raqiD9a7dx6" | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- VERDICT: PASS (or WARN for unrelated issues only)
- No calendar BLOCK (new URL is whitelisted)
- Confirms the stale-link path: a 6-month-old-call followup that correctly uses the NEW samuel calendar passes validation. Any draft using the old URL (wSdVbfwaJRzkw12E7) would BLOCK.

---

### R-J1 | samuel | nurture | Verbatim-closer-reuse detection (manual-review case)

NOTE: This is a MANUAL REVIEW case. The validator does not detect same-lead closer reuse (it has no thread history). The agent must scan prior outbound messages before writing.

SCENARIO:
- Thread shows two prior outbound nurture touches, both ending with "just say the word."
- Operator requests a third nurture touch.

EXPECTED (agent behavior, not validator):
- Agent scans thread before generating the third touch
- Agent does NOT use "just say the word" again as the closer
- Agent picks a different variant from the Soft-Close Rotation Bank in nurture.md (e.g., "Door's open if things change." or "No rush on my end.")
- MANUAL CHECK: reviewer confirms the closer in the draft does not match either prior closer

---

### R-K1 | samuel | followup | New AI-slop phrases fire WARN

VALIDATOR ONLY TEST -- "circling back":
Run: echo "Just circling back on this. Still interested?" | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- Issues include: ai_slop_warn (circling back)
- VERDICT: WARN (non-auto-fixable -- agent must rephrase)

VALIDATOR ONLY TEST -- "touching base":
Run: echo "Touching base to see if you had a chance to look things over." | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- Issues include: ai_slop_warn (touching base)
- VERDICT: WARN (non-auto-fixable)

VALIDATOR ONLY TEST -- "I wanted to reach out":
Run: echo "I wanted to reach out because we just wrapped a project in your space." | python3 .claude/agents/sdr-agent/validate_response.py --profile samuel

EXPECTED:
- Issues include: ai_slop_warn (I wanted to reach out)
- VERDICT: WARN (non-auto-fixable)
