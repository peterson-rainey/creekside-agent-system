# Standard Agent Contract (MANDATORY -- Enforced at Build Time)

Every agent built by this system MUST comply with the Standard Agent Contract. This contract is non-negotiable -- if an agent violates any clause, it fails QC and cannot ship. The agent-builder enforces this by embedding the contract requirements into every agent file and validating compliance before finalization.

## Contract Clauses

**1. Unified Search Interface**
Agents use `search_all()` and `keyword_search_all()` for content discovery. Agents NEVER query content tables directly (no `SELECT FROM fathom_entries WHERE summary ILIKE ...`). The unified search functions are maintained centrally -- update once, all agents benefit. The only exception is when an agent needs a specific column not returned by search functions (e.g., `meeting_date` for timeline ordering), in which case the agent may query the table directly AFTER finding records via unified search.

**2. Source Transparency**
Every claim must be tagged with its source depth:
- `[from: summary]` -- answer derived from AI-generated summary
- `[from: raw_text]` -- answer derived from full raw content via `get_full_content()`

This lets the user decide if deeper retrieval is worth it. Always use `get_full_content()` or `get_full_content_batch()` when:
- The user explicitly requests it
- Citing dollar amounts, dates, commitments, or action items

**3. Confidence Scoring**
Every factual claim must be tagged:
- **[HIGH]** -- directly from a database record with citation (dollar amounts, dates, record IDs)
- **[MEDIUM]** -- derived from multiple records or summarized data (trends, patterns, aggregates)
- **[LOW]** -- inferred, speculative, or based on old data (>90 days) -- always flag these

**4. Mandatory Citations**
Every fact from the database must include a citation: `[source: table_name, record_id]`
- If a fact comes from raw text, note it: `[source: raw_content for table_name, record_id]`
- If a fact is inferred (not from a specific record), tag it `[INFERRED]` -- never present inferences as sourced facts

**5. Amnesia Prevention**
Before ending a session, every agent must ask itself: "Did I discover something important that isn't already in the database?" If yes:
- Write it to `client_context_cache` (if about a client)
- Write it to `agent_knowledge` (if about a process, pattern, or system behavior)
- Never let important discoveries die with the session

**6. Correction Check First**
Every agent must check for corrections before doing its main work:
```sql
SELECT title, content FROM agent_knowledge WHERE type = 'correction'
AND (content ILIKE '%TOPIC%' OR title ILIKE '%TOPIC%')
ORDER BY created_at DESC LIMIT 10;
```

**7. Conflicting Information Protocol**
When two data sources disagree:
- Present BOTH sources with citations
- Note which source is more recent
- Flag the conflict explicitly -- never silently pick one
- If the conflict involves a client-facing fact, recommend the user verify

**8. Prompt = Methodology, Database = Data**
Agent system prompts contain ONLY methodology -- how to think, where to look, how to interpret. All domain-specific data (client names, revenue figures, pricing, team members, dates, targets) lives in `agent_knowledge` and is retrieved at runtime via `execute_sql`. The staleness test: "Would this still be true in 6 months?" If uncertain, it belongs in the database.

**9. Stale Data Flagging**
Any data older than 90 days must be flagged with its age. Agents must never present old data as current without noting the date.

**10. MCP as Real-Time Layer**
Always query applicable MCP sources (Gmail, Google Drive, ClickUp, Google Calendar) as part of the standard search flow, not just when database results are empty. Database pipelines sync each morning, so data is stale by afternoon. MCP provides the current-state layer. Skip sources clearly irrelevant to the query type. Tag MCP-sourced answers as `[SOURCE: MCP/<service>]` with `[MEDIUM]` confidence. Agents without MCP access should note this gap and suggest the operations manager search MCP sources.

## Contract Enforcement in the Build Process

During Step 4 (Create the Agent File), the builder MUST embed these contract clauses into the agent's Rules section. During QC (Step 7), the builder validates that every clause is present.

Every new agent file MUST contain these elements to satisfy the contract:
- A "Check Corrections First" step at the start of its methodology
- Pre-built SQL using `search_all()`/`keyword_search_all()` (not direct table queries)
- A rule requiring `get_full_content()` for important answers
- Source transparency tagging (`[from: summary]` / `[from: raw_text]`) defined in its Rules section
- An MCP real-time layer step in the methodology (query MCP sources as part of standard search, not just on empty results)
- Confidence tags ([HIGH]/[MEDIUM]/[LOW]) defined in its Rules section
- Citation format (`[source: table_name, record_id]`) defined in its Rules section
- An amnesia prevention step before session end (for write-capable agents)
- A query template to retrieve its own domain knowledge from `agent_knowledge` at startup
- Conflicting information handling in its Failure Modes section
