### Step 4: Pull Prior Call Transcripts
MANDATORY for follow-up and closing calls. Also pull for discovery calls if any prior contact exists.

After finding fathom_entry IDs in Step 3, pull the most recent full transcript:
```sql
SELECT * FROM get_full_content_batch('fathom_entries', ARRAY['id1', 'id2'])
```

NEVER answer "what was discussed last time" from the summary field alone. The full transcript is required. Prior commitments, specific dollar amounts, stated objections, and exact quotes are in the transcript — not the summary.

### Step 5: Pull Email and Communication History
Use unified search:
```sql
SELECT * FROM keyword_search_all('LEAD_NAME', 15, NULL)
```

Also check Gmail directly:
```sql
SELECT id, date, participants, ai_summary, context_type
FROM gmail_summaries
WHERE participants::text ILIKE '%LEAD_NAME%'
   OR ai_summary ILIKE '%LEAD_NAME%'
ORDER BY date DESC
LIMIT 10
```

Check Google Drive for any proposals or audits sent:
```sql
SELECT id, title, doc_type, ai_summary
FROM gdrive_operations
WHERE ai_summary ILIKE '%LEAD_NAME%' OR title ILIKE '%LEAD_NAME%'
ORDER BY modified_at DESC
LIMIT 5
```

Also check marketing docs:
```sql
SELECT id, title, doc_type, ai_summary
FROM gdrive_marketing
WHERE ai_summary ILIKE '%LEAD_NAME%' OR title ILIKE '%LEAD_NAME%'
ORDER BY modified_at DESC
LIMIT 5
```

### Step 6: Pull SDR Response History (If Upwork Lead)
If the lead source is Upwork or the leads.source field indicates SDR outreach:
```sql
SELECT conversation_id, turn_index, response_pattern, immediate_context,
  full_response, outcome, ai_summary
FROM sdr_responses
WHERE lead_name ILIKE '%LEAD_NAME%'
ORDER BY conversation_date DESC, turn_index ASC
LIMIT 20
```

If SDR responses exist, pull full text for the most recent conversation:
```sql
SELECT * FROM get_full_content_batch('sdr_responses', ARRAY['id1', 'id2', 'id3'])
```

### Step 7: Determine Pricing Recommendation
Retrieve current pricing tiers from agent_knowledge — do not hardcode values:
```sql
SELECT content FROM agent_knowledge
WHERE title ILIKE '%pricing%'
AND source_context IN ('marketing-strategy-agent', 'proposal-generator-agent', 'sales-call-helper-agent')
ORDER BY updated_at DESC
LIMIT 5
```

Apply the tier to the lead's stated or estimated ad spend.
- If budget is unknown: flag as "TBD — ask on the call"
- For cold outreach leads: entry offer is "we don't charge until you're profitable off ads." Standard pricing applies after conversion.

### Step 8: Match Case Studies to Industry/Situation
Pull the competitive differentiators SOP:
```sql
SELECT content FROM agent_knowledge
WHERE title ILIKE '%competitive differentiator%'
AND source_context = 'sales-call-helper-agent'
ORDER BY updated_at DESC
LIMIT 1
```

Apply the industry match logic from the retrieved content. Do NOT hardcode case study numbers — retrieve them at runtime and cite the source.

### Step 9: Synthesize the Call Brief
Combine all findings into the output format. Tag every fact with confidence. Cite every factual claim. Apply the red flag scoring framework from the loaded methodology.

---
