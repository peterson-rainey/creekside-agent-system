## Query Templates (Ready to Run)

### Find lead in leads table
```sql
SELECT id, name, business_name, source, status, notes, first_contact_date,
  last_contact_date, interested_in, source_refs
FROM leads
WHERE name ILIKE '%LEAD_NAME%' OR business_name ILIKE '%LEAD_NAME%'
ORDER BY created_at DESC LIMIT 5
```

### Find all Fathom meetings with this person
```sql
SELECT id, meeting_title, meeting_date, summary, action_items, participants
FROM fathom_entries
WHERE meeting_title ILIKE '%LEAD_NAME%'
   OR summary ILIKE '%LEAD_NAME%'
   OR participants::text ILIKE '%LEAD_NAME%'
ORDER BY meeting_date DESC LIMIT 10
```

### Find Gmail threads with this person
```sql
SELECT id, date, participants, ai_summary, context_type
FROM gmail_summaries
WHERE participants::text ILIKE '%LEAD_NAME%'
   OR ai_summary ILIKE '%LEAD_NAME%'
ORDER BY date DESC LIMIT 10
```

### Dual search for any record mentioning this person
```sql
SELECT * FROM keyword_search_all('LEAD_NAME', 20, NULL)
```

### Pull full transcript for a Fathom meeting
```sql
SELECT * FROM get_full_content('fathom_entries', 'FATHOM_ID')
```

### Pull multiple transcripts at once
```sql
SELECT * FROM get_full_content_batch('fathom_entries', ARRAY['id1', 'id2'])
```

### Load this agent's full methodology at runtime
```sql
SELECT title, content FROM agent_knowledge
WHERE source_context = 'sales-call-helper-agent'
ORDER BY updated_at DESC
```

---

## Interpretation Frameworks

### How to Identify the Best Rapport Hook
From the lead's notes, prior call transcripts, or email history:
1. Did they mention a previous agency? Use the "previous agency frustration" opener
2. Did they describe a specific problem? Mirror that problem back using Phase 4 technique
3. Are they a Laleh follower? Use the Laleh Question Opener (from cold calling SOP)
4. Are they cold outreach? Use the "free until profitable" hook
5. No context available? Use the universal Phase 2 opener: "Tell me about your business — what's working, what's not"

### How to Determine Urgency Level
- HIGH urgency: Explicit timeline stated, event-driven (e.g., product launch, season), decision-maker is present
- MEDIUM urgency: Aware of problem, no hard deadline, willing to engage
- LOW urgency: Shopping around, no stated urgency, "I want to think about it" pattern
Flag MEDIUM and LOW — recommend specific follow-up cadence steps for each.

### How to Score Red Flags
Count flags present from the loaded Red Flag SOP:
- 0-1 flags: Clean — proceed with standard approach
- 2-3 flags: Moderate risk — probe for fit explicitly during qualification phase
- 4+ flags: High disqualification risk — recommend Peterson qualify out early and not invest time in a proposal

### How to Match Case Studies
Load the industry-to-case-study mapping from the Competitive Differentiators SOP retrieved in Step 2:
```sql
SELECT content FROM agent_knowledge
WHERE title ILIKE '%competitive differentiator%'
AND source_context = 'sales-call-helper-agent'
ORDER BY updated_at DESC LIMIT 1;
```
