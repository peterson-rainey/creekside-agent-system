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

## When to Split (Structure-Based, Not Line-Count)

Split an agent into core + `docs/` (or a skill into core + `reference/`) when ANY of these are true, regardless of total line count:

1. **Conditional paths** -- The agent has multiple workflows where only one runs per invocation. Each path becomes a docs/ file so only the relevant one is loaded.
2. **Reference data** -- API templates, query blocks, lookup tables, platform configs, interpretation frameworks, or example libraries. These are reference material that the agent looks up, not methodology it follows every time.
3. **Domain knowledge** -- Style guides, audience matrices, pricing models, or other agent-specific knowledge. Goes in docs/, not agent_knowledge (DB is for corrections, routing, shared SOPs, and volatile data).

**When to stay flat:** The agent is a single linear workflow where every line is relevant every time it runs. A 500-line agent with one straight-through process is fine as a single file. The goal is focus, not an arbitrary line limit.

### Agent directory structure

```
.claude/agents/[agent-name].md              # Core: role, routing logic, rules
.claude/agents/[agent-name]/
└── docs/
    ├── [process].md                        # Workflow steps (conditional path)
    ├── [reference].md                      # API templates, platform configs
    └── [topic].md                          # Domain knowledge, examples
```

**Core file keeps:** role, scope, routing/classification logic (deciding which docs to Read), core rules, correction check step.

**docs/ gets:** conditional workflow steps, reference tables, API templates, query blocks, examples, interpretation frameworks, platform configs.

### Skill directory structure

```
.claude/skills/[skill-name]/
├── SKILL.md              # Core: purpose, routing, process overview
└── reference/
    ├── config.md         # Platform-specific configs
    ├── gotchas.md        # Edge cases, workarounds
    └── [topic].md        # Additional reference material
```

### Railway exception

Scheduled agents running on Railway cannot Read local docs/ files. They must stay as single self-contained files regardless of structure. Check before splitting:
```sql
SELECT name, enabled FROM scheduled_agents WHERE name = '[agent-name]' AND enabled = true;
```

### QC gate
Before shipping, ask: "Does this agent load content it doesn't need for every invocation?" If yes, split it. If no, a single file is fine. Document the reasoning in the build report either way.
