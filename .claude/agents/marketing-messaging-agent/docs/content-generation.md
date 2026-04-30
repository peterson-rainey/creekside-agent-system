### Step 4: Pull Existing Creative Assets
Search for any existing copy or creative documents for this client:
```sql
-- Search for existing copy assets in Google Drive
SELECT id, file_name, ai_summary, folder_path FROM gdrive_operations
WHERE client_id = 'CLIENT_UUID'
AND (file_name ILIKE '%copy%' OR file_name ILIKE '%ad%' OR file_name ILIKE '%creative%'
  OR file_name ILIKE '%script%' OR file_name ILIKE '%email%')
ORDER BY modified_date DESC LIMIT 10;

-- Also check gdrive_marketing
SELECT id, file_name, ai_summary FROM gdrive_marketing
WHERE client_id = 'CLIENT_UUID'
ORDER BY modified_date DESC LIMIT 10;
```

Pull full content for any existing copy documents found — never build on summaries alone:
```sql
SELECT * FROM get_full_content('gdrive_operations', 'FILE_UUID');
```

### Step 5: Search for Additional Context
Use unified search to find any meetings, emails, or tasks with relevant context for this client and content type:
```sql
-- Keyword search using unified interface
SELECT title, snippet, source_table, record_id FROM keyword_search_all('CLIENT_NAME CONTENT_TYPE', 20, NULL);
SELECT title, snippet, source_table, record_id FROM keyword_search_all('CLIENT_NAME industry copy', 20, NULL);
```

For important records, pull raw text before using:
```sql
SELECT * FROM get_full_content('fathom_entries', 'RECORD_ID');
SELECT * FROM get_full_content('loom_entries', 'RECORD_ID');
```

### Step 6: Pull Case Study Numbers (if relevant)
When writing ad copy that requires social proof, pull verified case study results:
```sql
SELECT title, content FROM agent_knowledge
WHERE title ILIKE '%case-study%' AND content ILIKE '%Confirmed%'
ORDER BY updated_at DESC LIMIT 2;
```

Use ONLY verified case study numbers with citations. Never invent or approximate.

### Step 7: Generate Copy
Apply the domain knowledge loaded in Step 2. Structure output by content type (see Output Format section).

Key rules for generation:
- Lead with the pain or problem, not the service
- Match copy angle to funnel stage (awareness vs conversion)
- Use specific numbers from verified case studies — never round or approximate
- Match tone to the client's industry using the Industry Tone rules
- Produce minimum 3 variants per unit (each testing a different message angle)
- Name variants by concept angle, not just "Option 1, 2, 3"

### Step 8: Apply Platform Constraints
Before finalizing, run this checklist:

**Google Ads:**
- Headlines: 30 characters max
- Descriptions: 90 characters max
- Minimum: 3 headlines + 2 descriptions per RSA
- Flag any that exceed character limits

**Meta Ads:**
- Primary text: 2-4 sentences recommended for top of funnel
- Headline: 40 characters recommended
- Flag special category restrictions if client is in legal, finance, or health

**Email Sequences:**
- Subject lines: 50 characters max for mobile
- Email 1: soft CTA, max 150 words
- Email 2: max 20 words (brief follow-up only)
- Emails 3-4: medium length, single purpose

**Landing Pages:**
- Headline must match or reinforce the ad that sends traffic to it (message match)
- Single primary CTA per page
