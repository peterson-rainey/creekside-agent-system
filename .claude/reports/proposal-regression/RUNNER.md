# Upwork Proposal Agent -- Regression Runner

This document explains how to run the proposal regression test suite. All scenarios live in `scenarios/`. The curated quick-check subset lives in `regression_sample.md`.

---

## Directory Structure

```
.claude/reports/proposal-regression/
  RUNNER.md                         # This file
  regression_sample.md              # ~10 curated scenarios for post-edit runs
  scenarios/
    baseline.md                     # B01-B08: normal usage across styles and profiles
    budget_pricing.md               # BP01-BP07: budget traps and pricing edge cases
    identity_scope.md               # IS01-IS08: timezone, scope, agency disclosure
    adversarial.md                  # A01-A07: formatting leaks, vocabulary, placeholders
```

---

## SMOKE TEST MODE

When running any scenario for testing, the agent MUST skip the database logging step (Step 5 in its execution flow). This prevents polluting the `upwork_proposal_logs` A/B alternation counters and audit trail with synthetic runs.

**Instructions to give the agent at the top of every test invocation:**

```
SMOKE TEST MODE: You are running a regression scenario. Skip Step 5 (do NOT insert into upwork_proposal_logs). All other steps run normally including validate_proposal.py. Write your full output to /tmp/proposal_regression/outputs/run_<RUNID>.md via Bash heredoc, then return only "DONE <RUNID>".
```

Set RUNID as: `<scenario_id>_<YYYYMMDD>` (e.g., `B01_20260818`) or append `_a`, `_b`, `_c` for [3x] runs.

---

## Setup (first time only)

```bash
mkdir -p /tmp/proposal_regression/outputs
```

This directory is ephemeral (cleared on reboot). Judgments should be saved to permanent locations if you want to keep them.

---

## Running a Single Scenario

1. Spawn `upwork-proposal-agent` using the Agent tool with the SMOKE TEST MODE header prepended to the prompt.
2. Include this header at the top of the prompt:
   ```
   SMOKE TEST MODE: Skip Step 5. Write full output to /tmp/proposal_regression/outputs/run_<RUNID>.md via Bash heredoc. Return only "DONE <RUNID>".
   ```
3. Paste the INPUT from the scenario.
4. Add the profile and style if specified (e.g., "Profile: peterson, Style: strategic_dq").
5. Let the agent run all steps (fit check, case study match, generation, validate_proposal.py, manual checks, output file write).
6. The agent returns "DONE <RUNID>".
7. Read the output file and evaluate against the EXPECTED criteria.

**Example invocation for B01:**
```
SMOKE TEST MODE: Skip Step 5. Write full output to /tmp/proposal_regression/outputs/run_B01_20260818.md via Bash heredoc. Return only "DONE B01_20260818".

[paste B01 INPUT from scenarios/baseline.md]
```

---

## Running a [3x] Scenario

For scenarios marked [3x], run the scenario three times in three separate Claude sessions. Use RUNID suffixes `_a`, `_b`, `_c`:

- Run 1: RUNID = `B01_20260818_a`
- Run 2: RUNID = `B01_20260818_b`
- Run 3: RUNID = `B01_20260818_c`

Then compare the three outputs against the EXPECTED criteria. [3x] scenarios test stochastic failure modes -- a rule that fails only occasionally (not deterministically) will show up across multiple runs.

---

## Running the Full Suite

There are approximately 30 scenarios across 4 files. A full suite run takes significant time (each scenario spawns a full agent execution including SQL calls and validate_proposal.py). Recommended sequence:

1. Run `regression_sample.md` first (10 scenarios) as a quick health check.
2. If sample passes, continue with the full suite in this order: baseline, budget_pricing, identity_scope, adversarial.
3. Mark each scenario PASS/FAIL in a judgment file at `/tmp/proposal_regression/judgments/<date>/`.

**Judgment file format (per scenario):**

```json
{
  "scenario_id": "B01",
  "run_id": "B01_20260818_a",
  "verdict": "PASS",
  "notes": "",
  "expected_met": ["strategic_opening", "no_em_dash", "sign_off", "word_count_250_350"],
  "expected_failures": []
}
```

---

## Running the Regression Sample

The regression sample is the mandatory post-edit check. After ANY edit to:
- `upwork-proposal-agent.md`
- Any file in `.claude/agents/upwork-proposal-agent/` (style files, fit-check.md, lindsey.md)
- `validate_proposal.py`

...run the regression sample before declaring the edit complete. See `regression_sample.md` for the scenario list and instructions.

**Estimated time:** 10-15 minutes for the full 10-scenario sample (each scenario is a single agent run).

---

## Output File Naming Convention

```
/tmp/proposal_regression/outputs/run_<SCENARIO_ID>_<YYYYMMDD>[_<abc>].md
```

Examples:
- `run_B01_20260818_a.md` (first of 3 runs for B01)
- `run_BP04_20260818.md` (single run)
- `run_IS03_20260818.md`

---

## What the Output File Contains

Each output file from the agent should contain all of the following in order:

1. **Fit Check Results** (RED/YELLOW flags with reasoning, or "No fit warnings")
2. **Matched Case Studies** (list with relevance scores, or "No case study matches")
3. **Variant line** (style used and how assigned)
4. **Proposal** (raw proposal text, exactly as it would be pasted into Upwork)
5. **Validation Checklist** (all 13 checklist lines with PASS/FAIL/N/A)
6. **Validator script output** (the actual VERDICT: PASS|WARN|BLOCK line from validate_proposal.py)

If any of these sections are missing from the output, that is itself a FAIL (incomplete execution).

---

## Judging EXPECTED Criteria

The EXPECTED section in each scenario has two parts:

**EXPECTED MUST contain:** Items the proposal or fit check output MUST include. Each item is a separate assertion. Failure on any single assertion = FAIL for that scenario.

**EXPECTED MUST NOT contain:** Items that must be absent. Presence of any item = FAIL.

Some checks are deterministic (handled by validate_proposal.py -- BLOCK or WARN patterns). For these, simply confirm the validator returned PASS. Other checks require reading the proposal text and applying judgment (e.g., "did the agent fabricate a case study?", "did the proposal imply Peterson will personally manage the account?"). These are the LLM-judgment checks that the validator cannot perform.

---

## Adding New Scenarios

When a real-world failure mode is discovered (proposal leaked an hourly rate, case study was fabricated, fit flag was wrong), add a scenario that captures it:

1. Write the scenario in the appropriate file (or create a new file if the category doesn't fit).
2. Assign the next sequential ID for that category (B09, BP08, IS09, A08, etc.).
3. Add a [3x] marker if the failure was stochastic (happened sometimes but not always).
4. Add the scenario to `regression_sample.md` if it covers a newly-discovered critical rule.
5. Run the scenario at least once to confirm it catches the failure.
