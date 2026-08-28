# Proposal Agent Regression Sample

Run this set of ~10 scenarios after ANY edit to:
- `upwork-proposal-agent.md`
- Any file in `.claude/agents/upwork-proposal-agent/` (style files, fit-check.md, lindsey.md)
- `validate_proposal.py`

Full runner instructions: `RUNNER.md`. SMOKE TEST MODE is mandatory for all runs (skip Step 5).

---

## Why These 10

Each scenario in this sample covers a distinct critical rule cluster. Together they catch regressions across: formatting rules, budget rules, identity rules, fit check logic, Lindsey profile, validator integration, and the case-study match path. Running more than this is encouraged but not required for a post-edit check.

| ID | Rule Cluster | Why It's Here |
|----|-------------|---------------|
| B01 | Baseline formatting + validator | Confirms the full happy path works end to end |
| B02 | strategic_dq diagnostic question check | Confirms the ? opener requirement fires and is satisfied |
| B05 | Lindsey profile + persona rules | Confirms Lindsey identity rules (no Creekside, no name sign-off) |
| B06 | Screening questions + direct-number rule | Confirms anti-duplication and concrete-number requirements |
| BP01 | Below-minimum budget RED flag | Confirms the $3k minimum is enforced at fit-check AND proposal level |
| BP02 | Hourly rate prohibition | Confirms no hourly rate leaks through (BLOCK-level validator check) |
| BP04 | Performance guarantee prohibition | Confirms pay-for-performance rejection |
| IS03 | Agency disclosure on full-time role flag | Confirms the disclosure sentence appears when the flag fires |
| IS04 | Peterson personal-management trap | Confirms the "Peterson will personally manage" identity rule |
| A01 | JD formatting leak (em-dash, bold, markdown) | Confirms JD formatting does not contaminate the proposal |

---

## Regression Sample Scenarios

For each scenario below: copy the INPUT from the source file listed, add the SMOKE TEST MODE header, run the agent, then evaluate against the EXPECTED criteria in that source file.

---

### RS01 -- from B01 | peterson | strategic [3x]

Source: `scenarios/baseline.md`, scenario B01.

Run three times (RS01_a, RS01_b, RS01_c).

Key checks:
- Strategic opening mirrors client language (outdoor gear, ROAS plateau, Shopping/PMax)
- No em-dashes, no bold, no links, no hourly rate
- Word count 250-350
- Sign-off: two blank lines + "Peterson"
- Validator returns PASS
- Fit Check: no flags

---

### RS02 -- from B02 | peterson | strategic_dq

Source: `scenarios/baseline.md`, scenario B02.

Key checks:
- Diagnostic question present in first 200 characters (must contain "?")
- Validator does NOT fire diagnostic_question_missing WARN
- Fit Check result present for dental multi-location budget scenario

---

### RS03 -- from B05 | lindsey | lindsey_default

Source: `scenarios/baseline.md`, scenario B05.

Key checks:
- "Creekside" does not appear anywhere in the proposal text
- "our team", "my team", "our agency", "as an agency" absent from proposal
- No sign-off name at the end (no "Lindsey", no "Best,", no closing phrase)
- Validator --profile lindsey returns PASS (Lindsey persona WARN checks do not fire)
- Fit Check uses Lindsey overrides (Meta + Klaviyo = good fit)

---

### RS04 -- from B06 | peterson | strategic [3x]

Source: `scenarios/baseline.md`, scenario B06.

Run three times (RS04_a, RS04_b, RS04_c).

Key checks:
- All 3 screening questions answered
- Q2 answer gives ONE concrete number first (not a range-only answer)
- Proposal body and screening answers cover different material (anti-duplication)
- No fabricated legal/PI case study if not in matched results

---

### RS05 -- from BP01 | peterson | strategic [3x]

Source: `scenarios/budget_pricing.md`, scenario BP01.

Run three times (RS05_a, RS05_b, RS05_c).

Key checks:
- RED flag fired: AD BUDGET TOO SMALL ($800/month)
- If proposal generated: no endorsement of $800 budget as workable
- $3,000/month minimum stated explicitly
- No language like "tight but doable," "can work," "similar budgets have delivered"

---

### RS06 -- from BP02 | peterson | strategic [3x]

Source: `scenarios/budget_pricing.md`, scenario BP02.

Run three times (RS06_a, RS06_b, RS06_c).

Key checks:
- Zero hourly rates in proposal (BLOCK-level -- if any appear, validator returns BLOCK)
- Validator returns PASS
- Pricing deferred to call or retainer structure mentioned without quoting an hourly figure

---

### RS07 -- from BP04 | peterson | strategic [3x]

Source: `scenarios/budget_pricing.md`, scenario BP04.

Run three times (RS07_a, RS07_b, RS07_c).

Key checks:
- No acceptance of performance/commission/rev-share model
- No "8-12% of ad spend" framing
- No ROAS guarantee language
- Validator PASS (no performance guarantee patterns in text)
- Fit Check: YELLOW flag (PERFORMANCE-ONLY PAY)

---

### RS08 -- from IS03 | peterson | strategic

Source: `scenarios/identity_scope.md`, scenario IS03.

Key checks:
- RED flag: FULL-TIME EMPLOYEE ROLE
- Agency disclosure sentence present in proposal (mandatory when this flag fires)
- Validation checklist shows Agency Disclosure: PASS (not N/A)
- No claim that Peterson will personally manage the team or sit in leadership meetings

---

### RS09 -- from IS04 | peterson | strategic [3x]

Source: `scenarios/identity_scope.md`, scenario IS04.

Run three times (RS09_a, RS09_b, RS09_c).

Key checks:
- No statement that Peterson will personally be the day-to-day account manager
- No "I will be your dedicated manager" or equivalent forward commitment
- Past experience in first person is fine; forward commitment is the issue
- Stochastic failure mode: some runs may slip and add a personal commitment -- [3x] catches this

---

### RS10 -- from A01 | peterson | strategic [3x]

Source: `scenarios/adversarial.md`, scenario A01.

Run three times (RS10_a, RS10_b, RS10_c).

Key checks:
- Zero em-dashes in proposal (even though JD uses them and explicitly invites them)
- Zero ** bold markers in proposal
- Zero markdown headers
- Validator returns PASS (em-dash and bold are WARN auto-fixed; if they appear, validator catches them)
- Stochastic failure mode: agent occasionally mirrors JD formatting -- [3x] catches this

---

## Grading the Sample

After running all 10 scenarios (counting [3x] runs as 3 each = up to 24 total runs):

- **PASS:** All EXPECTED MUST contain criteria met, all EXPECTED MUST NOT contain criteria absent.
- **FAIL:** Any single assertion missed.
- **BLOCK:** Any scenario where validate_proposal.py returned BLOCK and the agent did NOT rewrite to PASS. This is a hard failure -- the agent's validate-fix-revalidate loop is broken.

If any scenario FAILs, do not ship the edit. Fix the underlying issue and re-run the failing scenario (at minimum) before proceeding.

Document results in: `/tmp/proposal_regression/judgments/<YYYYMMDD>/regression_sample.json`
