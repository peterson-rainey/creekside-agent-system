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

1. Take Peterson-profile jobs in the ORDER you decide to apply to them.
2. Assign arms in strict rotation: jul01 -> jul10 -> aug13 -> current -> jul01 -> ...
3. Do NOT skip an arm because the job "feels like" a better fit for another version. If a job is worth applying to, it gets whatever arm is next in rotation.
4. If a run fails mid-way (tool error, agent crash), re-run the SAME job on the SAME arm. Do not advance the rotation on failures.
5. Track nothing manually: each arm logs its own mode to `upwork_proposal_logs`, so rotation compliance is auditable with:

```sql
SELECT mode, count(*), max(created_at)
FROM upwork_proposal_logs
WHERE mode IN ('strategic_jul01','strategic_jul10','strategic_aug13','strategic')
  AND created_at >= '2026-10-03'
GROUP BY mode ORDER BY mode;
```

To find whatever arm is next, check which mode has the lowest count (ties broken by rotation order jul01 -> jul10 -> aug13 -> current).

## How to run an arm

Spawn the agent by name with the full job description, exactly as you would the normal proposal agent. Each historical agent is self-contained (own folder under `.claude/agents/`). Every run must be in a FRESH Claude session if any proposal agent file was edited that session (agent prompts are cached at session start).

## Sample size and readout

- Target: 30+ submitted proposals PER ARM before comparing reply rates.
- Primary metric: client reply rate per mode (join `upwork_proposal_logs` modes to Upwork reply data / upwork_leads).
- Do not read intermediate results into decisions before each arm has meaningful volume.

## Known validity caveats (accepted by Peterson)

1. **Shared live retrieval:** all four arms call the same `match_proposal_context` Supabase function, which is NOT snapshotted and is currently degraded (relevance scores collapsed; often 0-1 proof points vs 2-4 historically). This affects all arms equally but means no arm fully reproduces its era's case-study quality.
2. **Model drift:** all arms run on today's Claude model, not the model active in July/August.
3. **Market drift:** running arms concurrently (round-robin) controls for this; that is why the rotation rule is strict.
4. **July 1 arm has no validator script** (validate_proposal.py did not exist yet). That is authentic to the era, not a bug.
5. **Persona rename:** all historical arms say Peterson where the originals said Samuel (approved, uniform across arms).
6. **Fabricated proof points:** historical arms may fabricate results in proposals, as the originals did. Peterson explicitly accepted this for the test ("do not include the findings or make any changes to how the originals operated," 2026-10-03). Originals are byte-exact.

## Do not touch

- Do not edit any `upwork-proposal-jul01/jul10/aug13-agent` files. Byte fidelity is the whole point.
- Do not reactivate `upwork-proposal-legacy-agent` (July 8 snapshot, deactivated 2026-10-03, superseded by these arms).
- Deviation record for extraction methodology: `.claude/reports/proposal-regression/legacy-arm-deviations.md` (same approach applied to all three new arms).
