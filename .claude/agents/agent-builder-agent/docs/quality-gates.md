# Quality Gates

Build-blocking checks that apply based on agent type. Read the sections relevant to your build.

---

## Client Resolution (MANDATORY in All New Agents That Touch Client Data)

Every new agent that accesses client data MUST resolve client names through `find_client()`.
Direct queries on `clients.name` or `reporting_clients.client_name` are FORBIDDEN.

### Required Pattern (copy into every new agent's methodology)

```sql
-- ALWAYS resolve clients with find_client() first
SELECT * FROM find_client('client name from user input');
```

### Three cases to handle:
1. **Single clear match** (top score, gap > 0.15 over second) -> proceed with that client
2. **Multiple close matches** (scores within 0.15) -> ask user to confirm, show top 3 options
3. **No match** (empty result or all < 0.3) -> stop, ask user to verify client name

### QC Build Gate
- REJECT any agent whose system_prompt queries `clients` or `reporting_clients` by name directly
- VERIFY the agent's Client Resolution section exists and calls `find_client()`
- This is a build-blocking check -- don't pass QC until it's fixed

### Reference
- SOP: `SELECT content FROM agent_knowledge WHERE title = 'SOP: Client Resolution via find_client()';`
- Function DDL: `/migrations/find_client_function.sql`
- agent_knowledge SOP id: 0cb2c3aa-159e-41af-9484-e193ab0fe8b3

---

## Issue Logging Capability (MANDATORY in All Contractor-Facing Agents)

Every new agent used by contractors (anyone who is NOT Peterson in `.claude/user-role.conf`) MUST include a short "Issue Logging" section in its system_prompt.

### Required pattern (copy into every new contractor-facing agent)

```markdown
## Issue Logging

If the user asks you to log an issue, report a problem, or notify Peterson about something not working (trigger phrases: "log this issue", "report a problem", "tell Peterson", "this isn't working"), follow the SOP verbatim:

\```sql
SELECT content FROM agent_knowledge WHERE title = 'SOP: How to Log a Contractor Issue';
\```

The SOP covers: identity (user-role.conf), session_id (session-state.json), field extraction, INSERT into `contractor_issues`, and the confirmation message. Do not reinvent the flow -- read the SOP and follow it.
```

### QC Build Gate
- VERIFY the agent's system_prompt includes an "Issue Logging" section referencing `SOP: How to Log a Contractor Issue`
- REJECT agents missing this capability if contractors will use them
- Admin-only agents (Peterson-only) are exempt

### Reference
- SOP agent_knowledge title: `SOP: How to Log a Contractor Issue`
- Target table: `contractor_issues` (RLS-enabled, INSERT open to authenticated)

---

## Draft-First Status Workflow (MANDATORY)

When you register a newly built agent in `agent_definitions`, default its `status` to `draft` -- NOT `active`.

### Status values and meaning
| Status | Meaning | Who sets it |
|---|---|---|
| `draft` | Just built, QC-passed, but unproven in real use | agent-builder (default) |
| `active` | Used successfully at least once; ready for contractors | Peterson (manually) or after first clean invocation |
| `deprecated` | Do not use; superseded or broken | Peterson or admin |

### Workflow
1. You build the agent and run QC -> it passes
2. INSERT into `agent_definitions` with `status = 'draft'`
3. Report back to Peterson: "Agent built and QC-passed. Currently status=draft. Promote to active after first successful run."
4. Peterson or a promotion workflow flips `draft -> active` after verifying it works end-to-end

### Do NOT
- Default a new agent to `active`
- Skip the draft stage for "trivial" or "safe" agents
- Auto-promote draft -> active without Peterson's sign-off

### QC gate addition
Before inserting into `agent_definitions`, verify `status = 'draft'` in the INSERT statement. Reject the build if it's set to `active`.

---

## Size Management

Large files waste context tokens at runtime and make maintenance harder.

### Agent directory structure (for complex agents)

When an agent exceeds 400 lines, restructure it as a directory with docs:

```
.claude/agents/[agent-name].md              # Core prompt (<=300 lines): role, router, rules
.claude/agents/[agent-name]/
└── docs/
    ├── [process].md                        # Workflow steps, methodology
    ├── [reference].md                      # API templates, platform configs
    └── [topic].md                          # Additional reference material
```

The `.md` entry point stays where Claude Code expects it. The agent uses Read to pull only the docs it needs per invocation. This is the same pattern as skills with `reference/` -- adapted for agents.

**What goes in the core `.md` file:** role, scope, routing/classification logic (deciding which docs to read), core rules, pre-build corrections.

**What goes in `docs/`:** step-by-step build processes, platform-specific requirements, reference tables, examples, quality gate details.

### Skill directory structure (for complex skills)

When a SKILL.md exceeds 200 lines, split into core + reference:

```
.claude/skills/[skill-name]/
├── SKILL.md              # <=200 lines: purpose, routing, core process
└── reference/
    ├── config.md         # Platform-specific configs, URL templates, selectors
    ├── gotchas.md        # Known edge cases, workarounds
    └── [topic].md        # Additional reference material
```

The SKILL.md references these files: "For [topic] details, read `reference/[file].md`."

### When to stay flat
- Agent <=400 lines, single purpose -> flat `.md` file, no directory
- Skill <=200 lines -> flat `SKILL.md`, no `reference/` directory

### QC gate
If an agent exceeds 400 lines or a skill SKILL.md exceeds 200 lines at build time, the builder MUST either (a) split the file using the patterns above, or (b) document in the build report why the size is justified.
