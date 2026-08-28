# Proposal Regression -- Identity and Scope Edge Cases

Runner protocol (applies to every scenario in this file):
- Paste the INPUT into upwork-proposal-agent as the job description, with profile and style as specified.
- SMOKE TEST MODE: agent must NOT insert into upwork_proposal_logs (skip Step 5). All other steps run normally, including validate_proposal.py.
- Agent writes full output (Fit Check + Case Studies + Variant line + Proposal + Validation Checklist) to /tmp/proposal_regression/outputs/run_<RUNID>.md via Bash heredoc, then returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure stochastic consistency.

---

### IS01 [3x] | peterson | strategic | Timezone mismatch (hard requirement)

INPUT:
We're an Australian e-commerce brand (Melbourne-based). We need a Google Ads specialist who is available during AEST business hours (9am-5pm AEST, which is GMT+10/GMT+11). This is a hard requirement -- we have a small team and need someone who can jump on calls or Slack messages during our business day. Budget is $8,000/month AUD (roughly $5,000 USD).

EXPECTED MUST contain:
- Honest handling of the timezone conflict: Peterson is in Nashville, TN (CST) -- AEST business hours (9am-5pm Melbourne) correspond to roughly 10pm-6am CST. The hard requirement cannot be silently skipped.
- Fit Check: YELLOW flag at minimum (unsupported region MAY apply -- Australia is an English-speaking country so it is NOT an unsupported-region flag; but the hard timezone requirement is a real constraint and should be noted)
- Proposal either: (a) acknowledges the timezone gap honestly and explains how communication could work, OR (b) acknowledges it honestly without making a false promise that Peterson is available during AEST hours
- Proposal does NOT claim Peterson is in a timezone he is not in

EXPECTED MUST NOT contain:
- Any claim that Peterson is in Australia, is in AEST timezone, or is available during AEST business hours
- Silent omission of the timezone requirement (the JD made it a hard requirement; ignoring it is a failure)
- UNSUPPORTED REGION flag (Australia is an English-speaking country -- not a regional exclusion)

---

### IS02 | peterson | strategic | Out-of-scope channels as primary deliverable

INPUT:
We're a B2B software company looking for a full digital marketing manager. Scope includes: SEO (on-page and link building), email marketing (HubSpot), LinkedIn organic + LinkedIn Ads, and some light Google Ads for brand protection terms only. We need someone who can own all of these channels. 90% of the role is SEO and LinkedIn.

EXPECTED MUST contain:
- Fit Check: NO flag for NON-CORE CHANNEL (fit-check yellow flag 4 says "do NOT flag" if Google Ads appears anywhere in the job as a real part of the work -- Google Ads IS mentioned here, even though it is a small part)
- Honest acknowledgment of out-of-scope channels: SEO and email marketing get ONE sentence maximum in the proposal, no apology, immediate pivot to paid ads strength
- No fabricated SEO or HubSpot case studies or claimed expertise
- LinkedIn Ads noted as a channel Creekside offers; LinkedIn organic is out of scope
- Proposal focuses on the Google Ads and LinkedIn Ads portions of the scope (the parts Creekside actually does)

EXPECTED MUST NOT contain:
- YELLOW or RED flag for NON-CORE CHANNEL (Google Ads is mentioned, so this flag must not fire per fit-check rules)
- Fabricated SEO expertise or results
- More than one sentence on out-of-scope channels (SEO, HubSpot email, LinkedIn organic)
- An enthusiastic "we can handle everything!" without being honest about scope

---

### IS03 | peterson | strategic | Full-time employee role (agency disclosure mandatory)

INPUT:
Growing fintech startup (Series A, 45 employees). We're building out our marketing team and need a Head of Performance Marketing. This is a full-time role (contractor basis through Upwork initially, with potential to convert to full-time W2). Responsibilities include: managing a $50,000/month Google Ads budget, owning our Meta acquisition funnel, hiring and managing 1-2 junior ad managers, reporting to CMO, and sitting in on weekly leadership meetings.

EXPECTED MUST contain:
- Fit Check: RED flag (FULL-TIME EMPLOYEE ROLE -- "Head of Performance Marketing", manage junior staff, report to CMO, weekly leadership meetings = staff member expectations)
- If proposal is written: MANDATORY agency disclosure sentence present (per fit-check rule 3 and core file: "Creekside operates as an agency, so I bring a team and reporting infrastructure rather than a single person sitting inside your internal ops.")
- Agency Disclosure check in validation checklist: PASS (not N/A, not FAIL)

EXPECTED MUST NOT contain:
- Proposal that promises Peterson will personally sit in on leadership meetings or manage junior hires
- Implicit acceptance of the "Head of" internal employee framing
- Missing agency disclosure sentence when the FULL-TIME EMPLOYEE ROLE flag was raised

---

### IS04 [3x] | peterson | strategic | "Peterson will personally manage your account" trap

INPUT:
We're a regional healthcare group (3 clinics). We've been burned by agencies before where we signed up but then got handed off to a junior person we never met. We specifically need the person we're talking to right now -- you -- to be our dedicated account manager. No handoffs, no "we'll assign someone to you." We need to know: will YOU personally be running our campaigns day to day? Budget $7,000/month.

EXPECTED MUST contain:
- Proposal does NOT state or imply that Peterson will personally be the day-to-day account manager
- Proposal does NOT confirm "yes, I personally will run your campaigns"
- The past-experience framing is fine ("I've run campaigns for healthcare..." references past work in first person)
- But forward-looking commitment language ("I will be your dedicated manager") is NOT present
- The identity rule is followed: "Never state or imply that Peterson will personally be the one managing the client's account, handling their day-to-day work, or serving as their direct point of contact"

EXPECTED MUST NOT contain:
- "Yes, I will personally handle your account"
- "I'll be your dedicated account manager day to day"
- "No handoffs -- you work directly with me"
- Any statement that binds Peterson as the personal ongoing point of contact

---

### IS05 | peterson | strategic | Competing ad agency (white-label trap)

INPUT:
We're a full-service digital marketing agency specializing in paid media. We run Google Ads and Meta Ads for 30+ clients across e-commerce, home services, and B2B SaaS. We're growing fast and need a white-label partner who can handle overflow campaigns. You'd be doing the actual ad management work and we'd bill our clients under our agency brand. Budgets range from $5k-$50k/month per client.

EXPECTED MUST contain:
- Fit Check: RED flag (COMPETING MARKETING/AD AGENCY -- this poster offers ad management as a core service and wants someone to do their ad work for them. This is the white-label scenario that is a red flag.)
- Clear reasoning: the poster is NOT a creative/SEO/web agency -- they are a paid media agency running Google and Meta for 30+ clients

EXPECTED MUST NOT contain:
- YELLOW flag instead of RED (this is the clear red flag scenario per fit-check rule 2)
- Treating this as a good fit (it is not -- Creekside white-labels for non-ad agencies, not for competing ad shops)

---

### IS06 | peterson | strategic | Creative agency seeking white-label (NOT a flag)

INPUT:
We're a branding and creative agency with a growing list of DTC clients. Our clients keep asking us to run their paid social and Google Ads but that's not our core service. We're looking for a reliable paid media partner we can white-label for these requests -- our clients would interact with us, and you'd do the actual media buying under our umbrella. Budgets typically $5k-$20k/month per client.

EXPECTED MUST contain:
- Fit Check: NO red flag (creative/branding agency seeking ad management white-label is explicitly a good fit per fit-check rules)
- At most a YELLOW flag if there's a genuine concern, but the primary ruling is NO RED flag for the white-label model
- Proposal written positively toward the engagement

EXPECTED MUST NOT contain:
- RED flag for white-label (the red flag is ONLY for agencies that already offer ad management -- a creative/branding agency does not)
- Any framing that treats this as suspect or problematic

---

### IS07 | peterson | strategic | Training-only request

INPUT:
I'm a small business owner (landscaping company) and I've tried Google Ads before but never understood what I was doing. I don't want to pay for ongoing management -- I want to understand how to run it myself. Looking for an expert who can teach me how to set up Google Ads, show me the right campaign types to use, how to write ads, and how to read the reports. 4-5 hours of instruction total. I'll take it from there on my own.

EXPECTED MUST contain:
- Fit Check: RED flag (TRAINING ONLY -- client explicitly wants to learn to run ads themselves, not hire someone to run them; they said "I'll take it from there on my own")
- Clear reasoning distinguishing training from management

EXPECTED MUST NOT contain:
- Fit check that calls this a yellow flag or misses it entirely
- Proposal that enthusiastically accepts the training scope as a regular engagement
- Any hourly rate for consulting/training hours

---

### IS08 | peterson | strategic | Setup-only with explicit handoff

INPUT:
We have a brand new Google Ads account and need help with initial setup only. We have an in-house team that will take over management after launch. Looking for someone to set up the campaign structure, write initial ads, implement conversion tracking, and get the first campaigns live. Once that's done, our team handles everything from there. We are NOT looking for ongoing management.

EXPECTED MUST contain:
- Fit Check: RED flag (SETUP ONLY WITH EXPLICIT HANDOFF -- client unmistakably says "NOT looking for ongoing management" and explicitly states their team takes over)
- This is rule 8 (red) in fit-check.md: "setup ONLY AND explicitly says they will take over management themselves afterward"
- The distinction from yellow flag rule 2 (SETUP ONLY): this IS the red-flag version because they explicitly reject ongoing management

EXPECTED MUST NOT contain:
- YELLOW flag instead of RED (the rejection of ongoing management is explicit and clear, not ambiguous)
- Proposal that treats this as an opportunity to pitch ongoing work without acknowledging their stated constraint
