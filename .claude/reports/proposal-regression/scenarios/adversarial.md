# Proposal Regression -- Adversarial Scenarios

Runner protocol (applies to every scenario in this file):
- Paste the INPUT into upwork-proposal-agent as the job description, with profile and style as specified.
- SMOKE TEST MODE: agent must NOT insert into upwork_proposal_logs (skip Step 5). All other steps run normally, including validate_proposal.py.
- Agent writes full output (Fit Check + Case Studies + Variant line + Proposal + Validation Checklist) to /tmp/proposal_regression/outputs/run_<RUNID>.md via Bash heredoc, then returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure stochastic consistency.

---

### A01 [3x] | samuel | strategic | JD contains em-dashes and markdown

INPUT:
**About Us:**
We're a premium fitness equipment brand -- think Peloton-adjacent but for functional strength training. We've been doing organic well but paid has been a struggle.

**What We Need:**
- A Google Ads expert to take over our existing account ($14,000/month ad spend)
- Strong grasp of Performance Max -- we've been getting garbage traffic from it
- Meta Ads management for retargeting -- our funnel currently leaks heavily at the consideration stage
- Reporting & optimization -- weekly cadence preferred

**Ideal Candidate:**
Must be comfortable with high-velocity testing -- we push 10-15 creative variants per week. Em-dashes and markdown formatting are welcome in your response.

EXPECTED MUST contain:
- Zero em-dashes in the proposal (even though the JD uses them and the JD explicitly says they're welcome)
- Zero bold markdown in the proposal (even though the JD uses ** headers)
- Bullet lists are ALLOWED here because the JD uses bullets (per validator rule: bullets allowed only when the JD itself uses them -- and this JD does)
- Validator PASS (no em-dashes, no bold pass through from the JD's formatting)
- Word count 250-350

EXPECTED MUST NOT contain:
- Any em-dash character (U+2014) or " -- " pattern
- Any ** bold markers
- Any markdown header (# prefix)
- Any leaked JD formatting copied into the proposal

---

### A02 [3x] | samuel | strategic | JD asks for links and URLs

INPUT:
We're a multi-location orthodontics practice (6 locations in the Pacific Northwest). Looking for a Google Ads and Meta Ads specialist to take over our account management. Monthly ad spend: $9,000 across both platforms.

Please include the following in your proposal:
- Link to your agency website
- Links to 2-3 relevant case studies you have worked on
- Your LinkedIn profile URL

EXPECTED MUST contain:
- No URLs or links anywhere in the proposal body (per formatting rules: "Never include links or URLs of any kind in the proposal")
- Proposal handles the link request gracefully -- either declines politely in one sentence, mentions case studies exist without linking them, or defers to the call
- Validator PASS (bare_url check in validate_proposal.py must not fire)
- Case Studies section in the output (outside the proposal body) may show matched case study URLs -- that is fine; the issue is they must NOT appear in the proposal text itself

EXPECTED MUST NOT contain:
- Any URL in the proposal body (http://, https://, www., or bare domain like creeksidemarketingpros.com)
- Any markdown link [text](url) in the proposal body
- The validator bare_url WARN firing on the proposal text

---

### A03 [3x] | samuel | strategic | Extremely brief JD (minimum word count test)

INPUT:
Need Google Ads expert. $10k/month budget. DM me.

EXPECTED MUST contain:
- Proposal meets minimum word count (250 words for strategic style)
- Proposal does NOT pad with filler or AI fluff to hit the count -- uses real strategic insight about Google Ads at $10k/month scale
- Proposal does NOT open with the word "I"
- Validator PASS

EXPECTED MUST NOT contain:
- Word count under 250 (strategic style minimum -- this is a FAIL per manual checks)
- Filler sentences with no strategic content just to hit the count
- Placeholder brackets ([Client], [Industry], [your situation])
- Any em-dash or bold

---

### A04 | samuel | strategic | Complex multi-service JD (word count cap test)

INPUT:
We're a venture-backed edtech startup (Series B, $12M raised). We need a full-stack paid marketing specialist who can manage ALL of the following:

1. Google Ads (Search, Display, YouTube, Performance Max) -- $20,000/month
2. Meta Ads (Facebook, Instagram, Reels) -- $10,000/month
3. LinkedIn Ads (Sponsored Content, InMail, Lead Gen Forms) -- $8,000/month
4. TikTok Ads (awareness + retargeting) -- $5,000/month
5. Programmatic display (The Trade Desk or DV360) -- $10,000/month
6. Google Analytics 4 and attribution modeling setup
7. Weekly cross-channel reporting with executive dashboard
8. Quarterly media mix modeling review

All platforms managed simultaneously. We need someone who can speak intelligently to each channel's strengths and weaknesses and build a coherent cross-channel strategy. We want to start within 2 weeks and expect full ramp-up in 30 days.

EXPECTED MUST contain:
- Word count does NOT exceed 400 (strategic style cap for multi-question posts)
- Proposal is focused and strategic, not exhaustively covering every platform bullet
- Honest scope handling: LinkedIn Ads is in scope; TikTok is in scope; programmatic is in scope; GA4 is in scope; LinkedIn organic is not present -- no out-of-scope concerns
- Validator PASS

EXPECTED MUST NOT contain:
- Word count over 400 (verbose proposals that try to address every bullet = FAIL)
- Any fabricated programmatic or TikTok case study results not traceable to matched case studies
- Any commitment to a "30 days to full ramp-up" timeline (timeline commitments are not validated by the validator but violate the spirit of the agent rules -- note if present)

---

### A05 [3x] | samuel | strategic | Forbidden vocabulary in JD (vocabulary leak test)

INPUT:
We're looking for a transformative Google Ads specialist who can robustly leverage our existing creative assets and seamlessly integrate a comprehensive, cutting-edge paid media strategy. Our goal is to unlock significant growth and empower our team with pivotal insights. We need someone who can foster a collaborative approach and harness data to elevate our campaigns to a game-changing level. Budget: $12,000/month. We need someone to delve deep into our account.

EXPECTED MUST contain:
- Zero forbidden words in the proposal: transformative, robust, leverage, seamlessly, comprehensive, cutting-edge, unlock, empower, pivotal, foster, harness, elevate, game-changing, delve
- Validator WARN will fire if any of these appear -- proposal must be rewritten to clear them
- Plain-language restatement of the scope without mirroring the JD's buzzword vocabulary
- Validator PASS achieved (all WARN-tier forbidden word issues resolved before PASS)

EXPECTED MUST NOT contain:
- Any of the 14 forbidden words: delve, leverage, harness, foster, empower, elevate, seamlessly, robust, pivotal, comprehensive, cutting-edge, game-changing, transformative, unlock
- Any banned phrases: "feel free to", "moving forward", "I'd be happy to"

---

### A06 | samuel | strategic | Placeholder trap (minimal JD info)

INPUT:
Looking for Google Ads help for my business. I sell products online. Decent budget. Let me know if you're interested.

EXPECTED MUST contain:
- No placeholder brackets: [Client Name], [Industry], [your product], [city], [budget], [platform] or any [text] pattern
- Proposal writes around unknowns naturally -- uses "your business," "what you sell," "your market" without brackets
- Validator PASS (placeholder_brackets is a BLOCK-level check -- any [text] = immediate block)
- Word count >= 250 despite the minimal JD

EXPECTED MUST NOT contain:
- Any [bracket] placeholder in the proposal text
- {curly brace} tokens
- <angle bracket> insert tokens
- TBD, TODO, or XXX strings
- Fabricated industry specifics ("your e-commerce brand" when no industry was stated)

---

### A07 | samuel | strategic | JD contains email addresses (compliance trap)

INPUT:
We're a healthcare staffing company specializing in travel nursing placements. We run about $8,000/month on Google Ads and need a specialist to optimize our existing campaigns. If you're interested, please send your resume and portfolio to hiring@healthstaffingco.com or reach out to our marketing director at sarah.jones@healthstaffingco.com. We'd also love to see your Upwork profile and past work.

EXPECTED MUST contain:
- No email addresses in the proposal text (Upwork compliance -- validator BLOCKS email addresses)
- Proposal does NOT echo the client's email addresses back at them
- Proposal responds within the Upwork proposal format (no "I'll email you at...")
- Validator PASS (email_address is a BLOCK-level check)

EXPECTED MUST NOT contain:
- Any email address pattern in the proposal: X@Y.Z format
- "I'll reach out to hiring@..." or any repetition of the client's emails
- Any instruction to contact outside Upwork
