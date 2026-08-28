# Proposal Regression -- Budget and Pricing Trap Scenarios

Runner protocol (applies to every scenario in this file):
- Paste the INPUT into upwork-proposal-agent as the job description, with profile and style as specified.
- SMOKE TEST MODE: agent must NOT insert into upwork_proposal_logs (skip Step 5). All other steps run normally, including validate_proposal.py.
- Agent writes full output (Fit Check + Case Studies + Variant line + Proposal + Validation Checklist) to /tmp/proposal_regression/outputs/run_<RUNID>.md via Bash heredoc, then returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure stochastic consistency.

---

### BP01 [3x] | peterson | strategic | Below-minimum budget (RED flag)

INPUT:
Small family-owned bakery in Austin, TX. We have a physical storefront and a growing online order business. We want to start running Google Ads to drive both foot traffic and online orders. We have a budget of $800/month for ads and are looking for an experienced manager to handle this. Looking for affordable, results-focused management.

EXPECTED MUST contain:
- Fit Check: RED flag (AD BUDGET TOO SMALL -- $800/month is well under $3,000 minimum)
- RED flag cited clearly with specific dollar amount from the job post
- If a proposal is generated: it must acknowledge the stated budget ($800) WITHOUT endorsing it, and must state that meaningful results on Google Ads start at $3,000/month
- Budget framed as a constraint, not a plan

EXPECTED MUST NOT contain:
- Any language endorsing $800/month as workable ("can work," "tight but doable," "we've run similar budgets," "it can work at that range")
- Any case study cited showing results on a budget below $3,000/month used as proof the budget is viable
- Any feasibility claim that implies $800/month can deliver results ("similar-sized budgets have delivered," "with smart targeting this is achievable")
- Any proposal that proceeds as if the budget is fine

---

### BP02 [3x] | peterson | strategic | Hourly rate request

INPUT:
We're a boutique marketing agency looking for a PPC freelancer to manage Google Ads for two of our clients. Scope includes campaign management, keyword research, ad copy, and reporting. This is a part-time ongoing role. We prefer to pay hourly through Upwork. What is your hourly rate? Estimated 15-20 hours per month.

EXPECTED MUST contain:
- No hourly rate quoted in any form ($X/hr, $X per hour, $X/hour, $X hourly, any hourly figure)
- Proposal defers pricing to a discovery call OR states the retainer structure
- Proposal does NOT engage with the hourly framing (mirrors the client's problem language, not their pricing structure)
- Validator MUST return PASS (hourly rate patterns are BLOCK-level in validate_proposal.py)
- Fit Check: note the agency posting (check if competing ad agency red flag applies -- if they manage ads themselves it is RED; if they are a creative/PR/web agency it is NOT a flag)

EXPECTED MUST NOT contain:
- Any form of hourly rate: "$X/hr", "$X per hour", "$X an hour", "$X hourly", "X hourly"
- "Hourly with Time Tracker works" or any equivalent acceptance phrase
- Any pricing number that implies hourly billing

---

### BP03 | peterson | strategic | Budget straddling minimum ($2,500-$4,000)

INPUT:
Real estate brokerage focused on luxury residential properties in South Florida. We want to run Google Ads to generate buyer and seller leads. Our ad budget is somewhere between $2,500-$4,000 per month -- we're open to scaling if we see results. Looking for an expert who can build this out properly and manage it ongoing.

EXPECTED MUST contain:
- Fit Check: YELLOW flag (budget straddles minimum -- lower bound $2,500 is under $3K; upper bound $4K is in yellow zone)
- Reason in fit check: the $2,500 lower bound is below Creekside's minimum; the $4K upper is workable but still yellow territory
- If proposal is generated: budget treated honestly (not endorsed as fine, not slammed as impossible -- gray zone acknowledged)
- Per fit-check rule 4: between $3,000-$5,000/month is YELLOW (workable but below preferred starting point)

EXPECTED MUST NOT contain:
- Budget endorsed as fully workable without qualification
- RED flag (the range is not all-sub-$3k; only the lower bound is below minimum)
- Any proposal claiming "$2,500 can deliver strong results" or equivalent

---

### BP04 [3x] | peterson | strategic | Performance guarantee / pay-for-performance request

INPUT:
E-commerce brand in the home decor space. We've been burned by agencies that charge retainers with no accountability. We're not interested in paying a flat monthly fee regardless of results. We want a performance-based arrangement where you earn a percentage of revenue or ad spend only when we hit our ROAS targets. Specifically, we're thinking 8-12% of ad spend, paid only when ROAS exceeds 3x. Are you open to this model? Current spend is $15,000/month.

EXPECTED MUST contain:
- No acceptance of performance-only, pay-for-performance, or commission-based arrangement
- No "8-12% of ad spend" engagement or any ROAS-contingent fee structure
- Proposal declines the model positively (states what Creekside does offer -- standard retainer) without being preachy or defensive
- Validator PASS required (no guarantee language in the proposal)
- Fit Check: YELLOW flag (PERFORMANCE-ONLY PAY -- client explicitly wants pay-for-performance)

EXPECTED MUST NOT contain:
- Any acceptance of the performance/commission model
- "I'm open to a performance structure" or equivalent
- Any guarantee of ROAS targets or outcomes
- Rev-share, partnership, or "you close clients, I deliver" language

---

### BP05 | peterson | strategic | Two-platform budget below floor on one platform

INPUT:
We're a local gym chain with 4 locations in the Phoenix area. We want to run both Google Ads and Facebook/Instagram ads. For Google, we're thinking $2,000/month. For Meta, $3,500/month. Total about $5,500/month. Looking for someone who can manage both platforms end to end.

EXPECTED MUST contain:
- Fit Check: RED flag on Google Ads budget ($2,000 is below $3,000/month minimum per platform)
- Meta budget ($3,500) is in yellow zone -- flag it per the fit-check rule (YELLOW for $3k-$5k)
- If proposal is generated: Google budget acknowledged as below minimum ($3,000/month minimum on Google Ads stated explicitly); not endorsed as workable
- Per-platform framing maintained (not lumped as "$5,500 total")

EXPECTED MUST NOT contain:
- "Your $2,000 Google budget can work with smart targeting" or any equivalents
- A combined total budget presentation that obscures the per-platform breakdown
- Endorsement of the $2,000 Google budget

---

### BP06 | peterson | strategic | Minimum budget exactly at floor ($3,000)

INPUT:
Local personal injury law firm in Houston. First time running paid ads. Looking for a Google Ads specialist to generate consultation leads. Budget: $3,000/month for ad spend. Want to start with one platform and scale from there.

EXPECTED MUST contain:
- Fit Check: YELLOW flag ($3,000/month is at the very bottom of the yellow zone per fit-check rule 4 -- "between $3,000-$5,000/month is yellow")
- Proposal treats the $3,000 budget as workable but acknowledges it is the floor, not the preferred starting point
- No red flag (it is at or above the $3,000 threshold -- only under $3k is red)

EXPECTED MUST NOT contain:
- RED flag for the $3,000 budget (red is strictly under $3,000)
- Enthusiastic endorsement of $3,000 as a strong starting point without qualification
- Any hourly rate

---

### BP07 | peterson | strategic | Multi-platform with lump-sum budget

INPUT:
Specialty coffee roaster selling DTC and wholesale. Currently spending $10,000/month across "all our paid channels" (Google, Facebook, maybe Pinterest). Looking for a generalist ad manager who can handle everything under one budget and just make it work. Prefer simple billing, one flat fee.

EXPECTED MUST contain:
- Proposal does NOT treat $10,000 as a validated per-platform figure -- it is total across unknown platforms
- If budget is mentioned: frames it per platform ("on Google, I'd suggest X; on Meta, Y") rather than endorsing a lump-sum total
- Fit Check: check whether Pinterest triggers any flag (it should NOT -- programmatic/display adjacents are fine; note if the agent flags it)

EXPECTED MUST NOT contain:
- "Your $10,000 total is a solid starting point" without per-platform breakdown
- Pinterest flagged as out-of-scope (it is not a red or yellow flag)
- Any budget recommendation that is below $3,000 per platform for the platforms named
