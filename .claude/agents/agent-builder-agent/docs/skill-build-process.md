# Skill Build Process (for Complexity = Skill)

When the classification gate routes to Skill, follow this lighter process instead of the full 7-step agent build.

## S1. Research (same as agent Step 1, but scoped)
- Run `validate_new_entry('skill', 'proposed-skill-name')` -- if BLOCKED, update existing skill instead
- Search agent_knowledge for existing skills/SOPs on this topic
- Search relevant platforms (Fathom, Loom, Gmail) for training data on this workflow
- Search Slack (historical data only -- Slack is deprecated at Creekside) for past corrections
- Pull raw text for key records (same thoroughness standard -- do not skip raw text)

## S2. Write the SKILL.md File

### S2a. Detect Write Path (same as agent Step 4a)
Check for worktree. Write to both worktree and main repo if applicable. Hooks handle git commit + push + DB sync automatically on Write.

### S2b. Create the file at `.claude/skills/[skill-name]/SKILL.md`

**SKILL.md format:**
```yaml
---
name: [skill-name]
description: [One-line description for routing -- what + when]
---
```
Then the skill body in markdown. Structure:
- **Purpose** (1-2 sentences)
- **When to use / When NOT to use** (routing clarity)
- **Process** (numbered steps with actual queries, decision trees, or templates)
- **Output format** (what the skill produces)

### S2c. Split into reference/ if over 200 lines

If the skill content exceeds 200 lines, split into core SKILL.md + reference files:
```
.claude/skills/[skill-name]/
├── SKILL.md              # <=200 lines: purpose, routing, core process
└── reference/
    ├── config.md         # Platform-specific configs, URL templates
    ├── examples.md       # Example inputs/outputs, code snippets
    ├── gotchas.md        # Known edge cases, workarounds
    └── [topic].md        # Additional reference material
```

The SKILL.md references these files: "For [topic] details, read `reference/[file].md`." The agent using the skill reads only the reference files it needs per invocation, keeping context lean.

**Quality rules for skills:**
- Same staleness principle as agents: methodology in the file, domain data in agent_knowledge
- No hardcoded client names, dollar amounts, or dates that change (see `docs/staleness-patterns.md`)
- Pre-built SQL queries where the skill needs database lookups
- Clear scope boundaries (what this skill does and does NOT do)

## S3. Register in Database (BUILD-BLOCKING GATE)

A skill is NOT built until BOTH the `system_registry` row AND the `agent_knowledge` row exist.

**What hooks handle automatically when you Write the SKILL.md file:**
- `skill-registry-sync.sh` upserts the `system_registry` row (metadata for SQL discovery)
- `agent-edit-monitor.sh` PATCHes the `agent_knowledge` row content (if the row already exists)

**What you must do manually for NEW skills:** The hooks PATCH/upsert existing rows, but for a brand-new skill there is no `agent_knowledge` row yet. You must INSERT the initial row:

```sql
-- agent_knowledge (FULL CONTENT -- gets embedded for vector search)
-- The system_registry row is handled by the skill-registry-sync.sh hook automatically.
DELETE FROM agent_knowledge WHERE title = 'Skill (filesystem): [skill-name]';

INSERT INTO agent_knowledge (type, title, content, tags, source_context, confidence)
VALUES (
  'skill',
  'Skill (filesystem): [skill-name]',
  $$[FULL SKILL.md content including frontmatter -- read the file]$$,
  ARRAY['skill', 'filesystem-skill', '[skill-name]', '[topic-tag-1]', '[topic-tag-2]'],
  'Built by agent-builder on [date]. Description: [one-line description]',
  'verified'
);
```

After this initial INSERT, all future edits to the SKILL.md auto-sync to both tables via the hooks. Never manually UPDATE these DB rows -- edit the file instead.

**Truncation note:** The `agent-edit-monitor.sh` hook only syncs the first 2,000 characters of a SKILL.md to `agent_knowledge` on subsequent edits. For long skills, re-run the DELETE+INSERT manually after major edits to restore full content.

**VERIFY both rows landed:**
```sql
SELECT
  (SELECT COUNT(*) FROM system_registry WHERE name = '[skill-name]' AND entry_type = 'skill') AS in_system_registry,
  (SELECT COUNT(*) FROM agent_knowledge WHERE title = 'Skill (filesystem): [skill-name]') AS in_agent_knowledge;
```
Both must return 1. If either is 0, the build is INCOMPLETE.

Title format is REQUIRED to be `Skill (filesystem): <skill-name>` so the auto-sync hook's idempotency doesn't collide with pre-existing `type='skill'` entries.

## S4. Git Commit + Push (HANDLED BY HOOKS -- skip this step)
The `agent-edit-monitor.sh` hook auto-commits and pushes when you Write the SKILL.md file. No manual git commands needed.

## S5. Lightweight QC
- Verify the SKILL.md file exists and parses valid YAML frontmatter
- Verify no hardcoded domain data (run every check in `docs/staleness-patterns.md`)
- Verify the description enables accurate routing
- Verify agent_knowledge and system_registry entries exist
- If skill exceeds 200 lines, verify it uses the `reference/` split pattern
- No need to spawn qc-reviewer-agent for skills unless the skill is complex or contractor-facing

## S6. Report Back
Tell the user:
- Skill name and location
- What it does and when it triggers
- Include the FULL process/methodology in your output so it can be used in the current session without restarting
- "Saved as [skill-name] for future sessions. Here is the full process so you can use it right now."
