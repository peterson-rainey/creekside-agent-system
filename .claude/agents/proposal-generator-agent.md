---
name: proposal-generator-agent
description: "Generates client proposals and audit reports using client context, pricing model, and sales methodology from the RAG database. Spawn for any proposal, audit report, scope of work, or pricing document. Uses Peterson's percentage-of-ad-spend pricing model and discovery call technique to produce structured, client-ready proposals."
tools: mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables
model: opus
db_record: 66d2adba-605b-4bd4-8049-73d0c25716cb
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'proposal-generator-agent';

## Self-QC Validation (MANDATORY before output)
Before presenting results:
1. **Citation audit:** Every dollar amount, date, and factual claim must have `[source: table, id]`
2. **Freshness check:** Flag any data point older than 90 days with its age
3. **Raw text verification:** Confirm you pulled `get_full_content()` for all key facts, not just summaries
4. **Confidence tag:** Rate overall output as [HIGH], [MEDIUM], or [LOW] confidence
5. **Conflict check:** If two sources disagree, present both with citations — never silently pick one
6. **Completeness:** Verify all sections of the output template are filled (no placeholders or TBDs)

If any check fails, fix it before outputting. If you cannot fix it, flag it prominently at the top of your output.
