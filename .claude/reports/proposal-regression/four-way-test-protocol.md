# Four-Way Proposal Test Protocol (Queenie Runner Guide)

**Started:** 2026-10-03 | **Owner:** Peterson | **Runner:** Queenie

## What this test is

The current upwork-proposal-agent has grown large and reply rates dropped. This test compares the CURRENT Peterson proposal pipeline against three byte-exact historical versions to find where quality degraded.

## The four arms

| Arm | Agent | Snapshot | Log mode |
|-----|-------|----------|----------|
| 1 | `upwork-proposal-jul01-agent` | July 1, 2026 (commit 83195d1) | `strategic_jul01` |
| 2 | `upwork-proposal-jul10-agent` | July 10, 2026 (commit e399da7) | `strategic_jul10` |
| 3 | `upwork-proposal-aug13-agent` | August 13, 2026 (commit 80f81af) | `strategic_aug13` |
| 4 | `upwork-proposal-agent` | Current | `strategic` |

All arms: Peterson profile, strategic style only. Historical arms have their era's alternate styles and Lindsey profile locked off (FOUR-WAY TEST LOCK markers in each agent file). Lindsey proposals are NOT part of this test; they go through `lindsey-proposal-agent` as usual.

## Assignment rule (mechanical round-robin -- no cherry-picking)

Arm selection is automated. For every Peterson-profile job:

1. Run `SELECT * FROM next_proposal_arm();` -- it returns the agent to spawn (lowest proposal count since 2026-10-03, ties broken jul01 -> jul10 -> aug13 -> current).
2. Spawn exactly that agent. Do NOT pick an arm yourself or skip one because the job "feels like" a better fit for another version. If a job is worth applying to, it gets whatever arm the function returns.
3. If a run fails mid-way (tool error, agent crash), just re-run `next_proposal_arm()` for the same job -- the failed run never logged, so it returns the same arm. Do not advance manually.
4. Track nothing by hand: each arm logs its own mode to `upwork_proposal_logs`, so rotation compliance is auditable with:

```sql
SELECT mode, count(*), max(created_at)
FROM upwork_proposal_logs
WHERE mode IN ('strategic_jul01','strategic_jul10','strategic_aug13','strategic')
  AND created_at >= '2026-10-03'
GROUP BY mode ORDER BY mode;
```

Compliance check: the four counts should NEVER differ by more than 1. A gap of 2+ means rotation was broken -- flag it to Peterson and identify which runs went out of turn via `created_at` order.

Routing is wired into contractor sessions: `.claude/roles/contractor.md` fast-path table sends every Peterson proposal request through `next_proposal_arm()` automatically (added 2026-10-03).

## How to run an arm

Spawn the agent by name with the full job description, exactly as you would the normal proposal agent. Each historical agent is self-contained (own folder under `.claude/agents/`). Every run must be in a FRESH Claude session if any proposal agent file was edited that session (agent prompts are cached at session start).

## Sample size and readout

- Target: 30+ submitted proposals PER ARM before comparing reply rates.
- Primary metric: client reply rate per mode (join `upwork_proposal_logs` modes to Upwork reply data / upwork_leads).
- Do not read intermediate results into decisions before each arm has meaningful volume.

## Known validity caveats (accepted by Peterson)

1. **Shared live retrieval:** all four arms call the same `match_proposal_context` Supabase function, which is NOT snapshotted. Diagnosed 2026-10-03: retrieval is NOT degraded -- case-study matching works and the data has been effectively static all year, so it is constant across eras and arms. Two known data gaps exist (79% NULL `industry_experience.result_statement`; generic jobs inherently score low on keyword matching) but both were equally true in July. Peterson deferred fixing them; if the NULL backfill ever happens, it must land BEFORE the test starts or not until after it ends -- never mid-test.
2. **Model drift:** all arms run on today's Claude model, not the model active in July/August.
3. **Market drift:** running arms concurrently (round-robin) controls for this; that is why the rotation rule is strict.
4. **July 1 arm has no validator script** (validate_proposal.py did not exist yet). That is authentic to the era, not a bug.
5. **Persona rename:** all historical arms say Peterson where the originals said Samuel (approved, uniform across arms).
6. **Fabricated proof points:** historical arms may fabricate results in proposals, as the originals did. Peterson explicitly accepted this for the test ("do not include the findings or make any changes to how the originals operated," 2026-10-03). Originals are byte-exact.

## Do not touch

- Do not edit any `upwork-proposal-jul01/jul10/aug13-agent` files. Byte fidelity is the whole point.
- Do not reactivate `upwork-proposal-legacy-agent` (July 8 snapshot, deactivated 2026-10-03, superseded by these arms).
- Deviation record for extraction methodology: `.claude/reports/proposal-regression/legacy-arm-deviations.md` (same approach applied to all three new arms).
