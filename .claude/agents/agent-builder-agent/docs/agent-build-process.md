# Agent Build Process (Steps 1-7)

The full build process for Standard and Complex agent classifications.

---

## Step 1: Research Phase (MOST IMPORTANT -- Do Not Skip)

Before writing a single line of the agent file, extract ALL training material from the RAG database.

### 1a. Validate Against System Registry (MANDATORY GATE)
```sql
-- Check registry for exact/similar names
SELECT validate_new_entry('agent', 'proposed-agent-name');

-- Check for functional duplicates
SELECT validate_new_agent('proposed-agent-name', 'proposed description of what the agent does');
```
- **BLOCKED** -> Stop. Agent already exists. Update instead.
- **WARNING** -> Review similar agents. Only proceed if genuinely distinct. Document WHY.
- **OK** -> Continue.

### 1a2. Discover Complementary Agents and Skills
```sql
-- Find agents with related capabilities
SELECT name, description, tools FROM agent_definitions
WHERE status = 'active'
AND (description ILIKE '%TOPIC%' OR description ILIKE '%RELATED_TERM%')
ORDER BY name;

-- Find skills on related topics
SELECT title, LEFT(content, 200) FROM agent_knowledge
WHERE type = 'skill'
AND (title ILIKE '%TOPIC%' OR content ILIKE '%TOPIC%')
ORDER BY created_at DESC;

-- Find SOPs that document related workflows
SELECT title, LEFT(content, 200) FROM agent_knowledge
WHERE type = 'sop'
AND (title ILIKE '%TOPIC%' OR content ILIKE '%TOPIC%')
ORDER BY created_at DESC;
```

For each match, decide: **Delegate** (spawn it), **Reference** (mention it), or **Incorporate** (reuse its patterns).

### 1a-orig. Check What Already Exists
```sql
SELECT title, content, type FROM agent_knowledge
WHERE title ILIKE '%TOPIC%' OR topic ILIKE '%TOPIC%'
ORDER BY created_at DESC;

SELECT name, department, purpose FROM agent_definitions
WHERE name ILIKE '%TOPIC%' OR purpose ILIKE '%TOPIC%';
```

### 1b. Identify All Relevant People
```sql
SELECT id, name, role, email FROM team_members;
SELECT id, name, status, services FROM clients WHERE status = 'active';
```

### 1c. Deep Search -- All Platforms
Run these searches IN PARALLEL where possible:

**Fathom meetings** (training conversations, corrections, preferences):
```sql
SELECT id, title, meeting_date, summary
FROM fathom_entries
WHERE summary ILIKE '%TOPIC%' OR title ILIKE '%PERSON_NAME%'
ORDER BY meeting_date DESC LIMIT 20;
```

**Loom videos** (training walkthroughs, corrections):
```sql
SELECT id, title, created_at, summary
FROM loom_entries
WHERE summary ILIKE '%TOPIC%' OR title ILIKE '%TOPIC%'
ORDER BY created_at DESC LIMIT 15;
```

**Dual semantic + keyword search** (MANDATORY -- always run BOTH in parallel):
```sql
SELECT * FROM search_all('TOPIC', NULL, 30);
SELECT * FROM keyword_search_all('TOPIC', NULL, 30);
```

**Slack messages** (historical only -- Slack is deprecated at Creekside, but past messages contain training data):
```sql
SELECT id, channel_name, message_date, summary
FROM slack_summaries
WHERE summary ILIKE '%TOPIC%'
ORDER BY message_date DESC LIMIT 20;
```

**ClickUp tasks** (SOPs, process documentation, task descriptions):
```sql
SELECT * FROM search_all_expanded('TOPIC', 'clickup_summaries', 20);
```

**Gmail threads** (client context, process discussions):
```sql
SELECT id, subject, sender, message_date, summary
FROM gmail_summaries
WHERE summary ILIKE '%TOPIC%' OR subject ILIKE '%TOPIC%'
ORDER BY message_date DESC LIMIT 15;
```

**Google Drive documents** (formal SOPs, process docs):
```sql
SELECT id, title, doc_type, summary
FROM gdrive_summaries
WHERE summary ILIKE '%TOPIC%' OR title ILIKE '%TOPIC%'
ORDER BY modified_at DESC LIMIT 10;
```

### 1d. Pull FULL Transcripts -- 100% Coverage Required
Pull raw text for EVERY relevant record found in 1c. Not a sample. ALL of them. Batch in groups of 10-15 IDs:

```sql
SELECT * FROM get_full_content_batch('fathom_entries', ARRAY['id1','id2','id3','id4','id5','id6','id7','id8','id9','id10']);
SELECT * FROM get_full_content_batch('loom_entries', ARRAY['id1','id2','id3','id4','id5']);
SELECT * FROM get_full_content_batch('slack_summaries', ARRAY['id1','id2','id3']);
SELECT * FROM get_full_content_batch('gmail_summaries', ARRAY['id1','id2','id3']);
```

**Do NOT truncate with `left(full_text, N)`.** Corrections hide at the end of transcripts.
**Do NOT use summaries as a proxy.** Summaries miss 10-second corrections buried in 30-minute meetings.

### 1d2. Coverage Verification (MANDATORY)
```
- Fathom: [N found] -> [N pulled]
- Loom: [N found] -> [N pulled]
- Slack: [N found] -> [N pulled]
- Gmail: [N found] -> [N pulled]
- ClickUp: [N found] -> [N pulled]
- GDrive: [N found] -> [N pulled]
```
If pulled < found on ANY platform, go back. 100% is the only acceptable coverage.

### 1e. Check All Corrections
```sql
SELECT title, content, created_at
FROM agent_knowledge
WHERE type = 'correction'
AND (content ILIKE '%TOPIC%' OR title ILIKE '%TOPIC%')
ORDER BY created_at DESC;
```

### 1f. Compile Research Summary
- Total records found per platform
- Key patterns and rules discovered
- Verbatim quotes that encode specific preferences
- Corrections to store in agent_knowledge (the agent retrieves these at runtime)
- Gaps in the data (what we don't know)

---

## Step 2: Requirements Gathering

If the research phase surfaced enough data -> skip to Step 3.

If gaps remain -> ask specific questions based on what the research revealed. Frame questions around gaps:
- **Trigger**: When should this agent run?
- **Scope**: What can it do? What must it NOT do? Read-only or write?
- **Data sources**: Which tables/platforms does it need?
- **Output**: What format? Who consumes it?
- **Integration**: Does it chain with other agents?
- **Edge cases**: What happens when data is missing, conflicting, or stale?

---

## Step 3: Determine Agent Type and Tools

| Agent Type | Department | Read-Only? | Standard Tools |
|-----------|-----------|-----------|---------------|
| **QC / Validation** | qc | YES (always) | Read, Grep, Glob, execute_sql, list_tables |
| **Platform Integration** | comms/ops | Usually NO | Platform MCP tools + execute_sql |
| **Database Analysis** | varies | YES | Read, Grep, Glob, execute_sql, list_tables |
| **Database Writer** | infra/client | NO | Bash, Read, Write, Edit, Grep, Glob, execute_sql |
| **Conversational** | ops/meta | YES | Read, Grep, Glob, execute_sql |
| **Code Execution** | qc/infra | NO | Bash, Read, Write, Edit, Grep, Glob |

**MCP Tool Reference:**
- Supabase SQL: `mcp__claude_ai_Supabase__execute_sql`
- Supabase tables: `mcp__claude_ai_Supabase__list_tables`
- Gmail: `mcp__claude_ai_Gmail__*`
- Calendar: `mcp__claude_ai_Google_Calendar__*`

**Tool Selection Rules:**
- Give agents ONLY the tools they need
- Read-only agents must NOT have Write, Edit, or Bash
- Every database agent needs execute_sql
- Platform agents need their specific MCP tools PLUS execute_sql

---

## Step 4: Create the Agent File

### 4a. Detect Write Path (MANDATORY)
```bash
WORKTREE_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
MAIN_REPO_ROOT=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null | sed 's|/.git$||')
```
- If different, you are in a worktree. Write to BOTH locations.
- If equal, write to `.claude/agents/[agent-name].md` as normal.

The `agent-edit-monitor.sh` hook fires on Write and handles git commit + push + DB sync automatically.

### 4b. Same-Session Usability (MANDATORY)
Claude Code loads agents at session startup, so a new file cannot be dispatched by name until next session.
- Save the file for future reuse
- Include the FULL methodology in your output so it can be used NOW
- "Saved as [agent name] for future sessions. Here is the full process so you can use it right now."

### 4c. Write the Agent File
Standard structure: YAML frontmatter, Role, Goal, Supabase Project, Scope, Methodology, Query Templates, Interpretation Rules, Output Format, Failure Modes, Rules, Anti-Patterns.

### 4d. Create docs/ directory if agent exceeds 400 lines
If the agent's content exceeds 400 lines, split into a core `.md` file + companion `docs/` directory. See `docs/quality-gates.md` Size Management section for the pattern.

### Required Sections (Every Agent Must Have):
1. YAML Frontmatter -- name, description, tools, model
2. Title + Intro -- role and personality
3. Supabase Project -- project ID
4. Scope -- can/cannot do, read-only status
5. Workflow -- numbered steps with actual queries/logic
6. Output Format -- exact structure with examples
7. Rules -- hard constraints including mandatory patterns

### System Prompt Quality Checklist:
- No stale data: run every pattern in `docs/staleness-patterns.md`
- Domain knowledge stored in agent_knowledge, not the agent file
- Query templates present for runtime data retrieval
- Interpretation frameworks present (HOW to analyze, not WHAT the data says)
- Workflow uses ACTUAL SQL queries, not placeholders
- Output format shows a complete example
- Rules section includes: correction check, citation format, confidence scoring, raw text retrieval, "no data" response
- Description answers "what + when" for routing
- No vague instructions
- Write agents include verification queries after writes
- Read-only agents do NOT have Write/Edit/Bash tools
- Failure modes defined
- Size check passed (see quality-gates.md)

---

## Step 5: Store Domain Knowledge in the Database (MANDATORY)

### 5a. Store domain facts as agent_knowledge entries
```sql
SELECT validate_new_knowledge('domain_knowledge', '[agent-name]: [category]', ARRAY['agent-name-tag']);
-- If OK:
INSERT INTO agent_knowledge (title, content, type, topic, confidence)
VALUES (
  '[agent-name]: [knowledge category]',
  '[Structured knowledge content]',
  'domain_knowledge',
  '[agent-name]',
  'verified'
);
```

### 5b. Build query templates INTO the agent file
### 5c. Build interpretation frameworks INTO the agent file

### 5d. Staleness Validation Gate (MANDATORY)
Read `docs/staleness-patterns.md` and check every line of the agent file against every pattern.

---

## Step 6: Post-Build Documentation

### GitHub-First Architecture
Hooks handle all syncing automatically:
- **`agent-edit-monitor.sh`** (PostToolUse): auto-commits + pushes, PATCHes `agent_definitions.system_prompt`
- **`skill-registry-sync.sh`** (PostToolUse): upserts `system_registry` for skills
- **`auto-pull.sh`** (SessionStart): pulls latest so all users get new files

You do NOT need to run manual git commands. You DO still need the initial `agent_definitions` INSERT.

### 6a. Update CLAUDE.md Agent Table (no ADMIN_MODE required for additions)

### 6b. Insert into agent_definitions (Supabase) -- initial row only
```sql
INSERT INTO agent_definitions (
  name, display_name, description, department, agent_type,
  system_prompt, tools, read_only, model, status
)
VALUES (
  '[agent-name]',           -- matches the .md filename (without extension)
  '[Agent Display Name]',   -- human-readable name
  '[description]',          -- routing description (what + when)
  '[department]',           -- ops, qc, comms, infra, client, meta, etc.
  '[type]',                 -- sub_agent, scheduled, on_demand, etc.
  '[full prompt content]',  -- read from the .md file you just wrote
  ARRAY['tool1', 'tool2'],  -- only tools the agent needs
  [true|false],             -- true for read-only agents
  '[model]',                -- sonnet (default), opus, or haiku
  'draft'                   -- ALWAYS draft for new agents
);
```

### 6c. Insert into agent_knowledge (capabilities entry)
```sql
SELECT validate_new_knowledge('capability', '[agent-name]: capabilities summary', ARRAY['[agent-name]']);
INSERT INTO agent_knowledge (type, title, content, tags, source_context, confidence)
VALUES (
  'capability',
  '[agent-name]: capabilities summary',
  'What it does: [1-2 sentences]. When to use: [trigger conditions]. Output: [what it produces]. Limitations: [what it cannot do].',
  ARRAY['capability', '[agent-name]', '[department]'],
  'Built by agent-builder on [date]',
  'verified'
);
```

### 6d. If Scheduled Agent, seed scheduled_agents

### 6e. Git Commit + Push (HANDLED BY HOOKS -- skip)

---

## Step 7: Mandatory QC Validation (BUILD IS NOT COMPLETE UNTIL THIS PASSES)

### 7a. Prepare QC Payload
Collect all build artifacts for validation.

### 7b. QC Validation Criteria
| Check | What It Validates | Fail Condition |
|-------|-------------------|----------------|
| Principle 6 Violation | No hardcoded domain data | Any specific number, client name, etc. in the prompt |
| Standard Contract Compliance | All 10 contract clauses present | Missing any clause |
| Security Concerns | Only necessary tools | Over-provisioning |
| Description Quality | Enables accurate routing | Doesn't answer "what + when" |
| Query Template Validity | Correct table/function names | Non-existent tables or direct queries |
| Domain Knowledge Stored | Research findings in agent_knowledge | Domain data not stored |
| Output Format Complete | Concrete example | Only field names |
| Size Management | Agent <=400 lines, or uses docs/ pattern | Exceeds threshold without justification |
| Staleness Patterns | No hardcoded pricing, client IDs, routing, compensation, contacts, or Slack-as-active | Any pattern from staleness-patterns.md found |
| Cost Estimation (scheduled) | Within budget | Over $10/day WARN, over $25/day FAIL |

### 7b-cost. Cost Estimation for Scheduled Agents
Budget limits: $10/day normal, $25/day hard max.

**Model Recommendation:**
- Simple agents: Haiku (~$0.01-0.05/run)
- Medium agents: Sonnet (~$0.05-0.30/run)
- Complex agents: Opus (~$0.30-2.00/run)

### 7c. Run QC -- spawn qc-reviewer-agent with full build artifacts
### 7d. Handle QC Results: PASS -> present. WARN -> fix and re-run. FAIL -> fix and re-run until PASS.
### 7e. Include QC result in final output.
