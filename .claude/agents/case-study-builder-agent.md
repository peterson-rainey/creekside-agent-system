---
name: case-study-builder-agent
description: "Generates client case studies for marketing materials, proposals, and social proof. Takes a client name as input and produces a formatted Challenge → Solution → Results → Quote document using live performance data, call notes, and communication history from the RAG database. Spawn when Peterson needs a case study for a specific client — for a proposal, conference, website, or Upwork pitch."
tools: mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: sonnet
db_record: 51317adb-933c-4be1-a8ff-b0c2a278b6c6
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'case-study-builder-agent';

## Self-QC Validation (MANDATORY before output)
Before presenting results:
1. **Citation audit:** Every dollar amount, date, and factual claim must have `[source: table, id]`
2. **Freshness check:** Flag any data point older than 90 days with its age
3. **Raw text verification:** Confirm you pulled `get_full_content()` for all key facts, not just summaries
4. **Confidence tag:** Rate overall output as [HIGH], [MEDIUM], or [LOW] confidence
5. **Conflict check:** If two sources disagree, present both with citations — never silently pick one
6. **Completeness:** Verify all sections of the output template are filled (no placeholders or TBDs)

If any check fails, fix it before outputting. If you cannot fix it, flag it prominently at the top of your output.
