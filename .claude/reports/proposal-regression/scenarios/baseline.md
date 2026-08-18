# Proposal Regression -- Baseline Scenarios

Runner protocol (applies to every scenario in this file):
- Paste the INPUT into upwork-proposal-agent as the job description, with profile and style as specified.
- SMOKE TEST MODE: agent must NOT insert into upwork_proposal_logs (skip Step 5). All other steps run normally, including validate_proposal.py.
- Agent writes full output (Fit Check + Case Studies + Variant line + Proposal + Validation Checklist) to /tmp/proposal_regression/outputs/run_<RUNID>.md via Bash heredoc, then returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure stochastic consistency.

---

### B01 [3x] | samuel | strategic | Standard Google Ads job

INPUT:
We're a mid-sized e-commerce brand selling premium outdoor gear (tents, sleeping bags, backpacks). We've been running Google Ads on our own for about 18 months but our ROAS has been stuck around 2x for the past 6 months. Looking for an experienced Google Ads specialist to take over account management. We spend about $18,000/month on ads. Must be familiar with Shopping campaigns and Performance Max. We need ongoing campaign management, creative testing, and weekly reporting.

EXPECTED MUST contain:
- Strategic opening insight about e-commerce Google Ads (ROAS, Shopping, or PMax angle) that mirrors the client's problem language (outdoor gear, ROAS plateau, Shopping/PMax)
- No opening with the word "I"
- No em-dashes anywhere
- No bold markdown
- No hourly rate in any form
- Word count 250-350 (strategic style)
- Sign-off: two blank lines then "Samuel" with no prefix
- Validation checklist present (all lines PASS)
- Fit Check output present (no flags expected for this job)

EXPECTED MUST NOT contain:
- Any em-dash character or " -- "
- Any ** bold markers
- Any bracket placeholders ([Company], [Client], etc.)
- Any URL or link
- Any pricing numbers or retainer figures
- Any performance guarantee language

---

### B02 | samuel | strategic_dq | Standard Google Ads job (strategic_dq style)

INPUT:
Regional dental practice (3 locations in the greater Chicago area) looking for a Google Ads expert. We've been running ads for about a year with a local agency but results have been inconsistent. We need someone to take over full management including new patient acquisition campaigns, call tracking, and local service ad optimization. Budget is $6,000/month total across the 3 locations.

EXPECTED MUST contain:
- Diagnostic question within the first 200 characters (must contain "?")
- Strategic insight about dental Google Ads or local service ads
- Word count 250-350
- Sign-off: two blank lines then "Samuel"
- Fit Check output with YELLOW flag (budget $6k/3 locations = $2k per location, per-platform totals are ambiguous -- agent should use judgment on whether to flag)
- Validation checklist present

EXPECTED MUST NOT contain:
- Any opening without a diagnostic question (the "?" must appear in the first 200 chars -- validator blocks this as WARN)
- Any hourly rate
- Any performance guarantee
- Any em-dashes

---

### B03 | samuel | strategic_exp | Standard Google Ads + Meta job

INPUT:
We run a SaaS product for small law firms. Monthly recurring revenue around $180k, growing fast. We've done a lot of SEO and content and it's worked well but we want to start paid ads for the first time. Looking for someone who can build and manage both Google Ads (search and display) and Facebook/Instagram ads. Budget TBD but we're serious about scaling. Strong preference for someone with B2B SaaS experience.

EXPECTED MUST contain:
- Strategic opening that speaks to B2B SaaS paid ads nuances (long sales cycle, demo quality, etc.)
- Experience credential woven naturally (strategic_exp style mandates experience anchor -- check that it appears)
- No em-dashes
- Word count 250-400 (multi-service, experience style)
- Sign-off: two blank lines then "Samuel"
- Fit Check: no flags expected (dual platform, clear scope, no budget stated)

EXPECTED MUST NOT contain:
- Any fabricated B2B SaaS case study results (must be from actual matched case studies or genuine past experience described generally)
- Any hourly rate
- Both-platform budget recommendation unless warranted (budget is TBD so do not volunteer one)

---

### B04 | samuel | v2 | Standard Google Ads job (v2 style)

INPUT:
Home services company (HVAC + plumbing, serving metro Atlanta). We do about $2.5M in annual revenue and want to accelerate with paid ads. Currently spending $5,000/month on Google Ads with a national agency but they don't feel like they understand local home services. Looking for a Google Ads specialist with local service ad experience. We're open to adding Meta if you think it makes sense.

EXPECTED MUST contain:
- V2 style structure (whatever the v2 file specifies -- agent reads samuel-v2.md and follows it)
- Local home services insight in the opening
- Word count within v2 style's defined range
- Sign-off: two blank lines then "Samuel"
- Fit Check: no red flags expected; $5k/month is above minimum so no budget flag

EXPECTED MUST NOT contain:
- Any hourly rate
- Any em-dash
- Any bold markdown
- Any guarantee of results

---

### B05 | lindsey | lindsey_default | Standard Meta/email job

INPUT:
We're a DTC skincare brand doing about $800K/year in revenue on Shopify. We've been managing our own Facebook and Instagram ads but ROAS has been declining for the past quarter. Also looking for help with our email list (Klaviyo) which we've been neglecting. Looking for a specialist who can handle both paid social and email. Budget for ads is around $8,000/month.

EXPECTED MUST contain:
- Lindsey identity (no mention of "Creekside", "our team", "my team", "our agency", "as an agency")
- DTC/Shopify/Klaviyo angle in the opening
- No sign-off name (Lindsey proposals must NOT end with a name sign-off)
- No em-dashes
- Fit Check via Lindsey overrides (Meta + email = good fit for Lindsey)
- Validation checklist with profile: lindsey noted

EXPECTED MUST NOT contain:
- "Creekside" anywhere in the proposal text
- "our team" or "my team"
- "Samuel" in the proposal text
- Any sign-off closing phrase ("Best,", "Thanks,", "Regards,") or name

---

### B06 [3x] | samuel | strategic | Job with screening questions

INPUT:
We're a regional law firm (personal injury, 4 offices in the Southeast US). Currently spending $12,000/month on Google Ads with mediocre results -- too many unqualified leads. Looking for an experienced Google Ads manager to take over. We're specifically looking for someone with legal/law firm experience.

Please answer the following questions when applying:
1. How many years have you been running Google Ads?
2. What is the peak monthly ad spend you have personally managed?
3. Do you have experience in the legal/personal injury niche specifically?

EXPECTED MUST contain:
- Proposal body that does NOT duplicate material covered in the screening answers
- All 3 screening questions answered individually and clearly
- Answer to Q2 that gives ONE concrete number first (direct-number rule -- no range-only answers)
- Answer to Q3 that is honest about legal experience (no fabrication; pivot to closest real niche if no direct legal experience)
- No em-dashes
- Sign-off: two blank lines then "Samuel"
- Word count 250-400 (multi-question)

EXPECTED MUST NOT contain:
- Range-only answer for Q2 (e.g., "I've managed between $10K-$100K" -- BLOCK per direct-number rule)
- Vague deflection on Q2 ("it varies," "substantial budgets")
- Fabricated legal/PI industry experience not traceable to real matched case studies

---

### B07 | samuel | strategic | High-relevance case study match

INPUT:
We're a local med spa in Dallas offering laser treatments, Botox, fillers, and skin rejuvenation services. We've never run paid ads before and need someone to build out a Google Ads + Instagram strategy from scratch. Looking for someone who has worked with aesthetics or med spa businesses specifically. Budget around $5,000/month.

EXPECTED MUST contain:
- Case study match expected (med spa is a known vertical with results in the database -- advanced-medical-spa entry)
- If relevance_score >= 3: specific case study result referenced naturally in the proposal (NOT a formal case study summary)
- Brief sentence near end mentioning a relevant case study is attached (only if case study was used)
- Fit Check: YELLOW flag on budget ($5k = yellow zone for dual platform; or PASS for single-platform at $5k which is above minimum)
- No fabricated results beyond what the matched case study actually contains

EXPECTED MUST NOT contain:
- Fabricated med spa results with no traceable source
- Formal case study summary block (keep it brief and casual per instructions)
- Any URL or link in the proposal body (links go in fit check/case study section only)

---

### B08 | samuel | strategic | No case study match

INPUT:
We manufacture industrial-grade fire suppression systems for large commercial facilities, data centers, and manufacturing plants. We've never done paid ads and need someone to build out Google Ads from scratch to generate B2B leads. Decision makers are facility managers and building owners. Budget is flexible, around $4,000/month to start.

EXPECTED MUST contain:
- Proposal written from general B2B/industrial experience (no fabricated fire suppression case study)
- Case Study section in output should show "No case study matches" or low-score result -- no forced match
- Strategic opening that speaks to B2B industrial Google Ads (long sales cycle, intent signals, decision maker targeting)
- Fit Check: YELLOW budget flag ($4k = yellow zone for Google Ads)

EXPECTED MUST NOT contain:
- Fabricated fire suppression or industrial case study results
- A forced case study reference when no high-relevance match was found
- Any claim that Creekside has direct fire suppression industry experience (unless a real case study confirms it)
