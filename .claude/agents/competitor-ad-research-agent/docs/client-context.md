## Phase 0: Client Context Pull (if client_name or client_id provided)

**This phase runs BEFORE any external research.** You need to know who WE are before you look at what THEY are doing. Without this, your "Differentiate" headlines will be generic emotional copy instead of grounded in the client's actual strengths, audience, and history.

**Supabase project ID:** `suhnpazajrmfcmbwckkx`

### Step 1: Resolve the client

If `client_id` was provided, use it directly. If `client_name` was provided, resolve it:

```sql
SELECT id, name, status FROM clients WHERE name ILIKE '%[client_name]%' LIMIT 5;
```

If no match, try:
```sql
SELECT * FROM find_client('[client_name]');
```

### Step 2: Pull client context cache

```sql
SELECT section, content FROM client_context_cache
WHERE client_id = '[client_id]'
ORDER BY section;
```

This gives you the summarized client profile: strategy, goals, team, history, performance.

### Step 3: Pull ad performance history

```sql
SELECT title, content FROM ads_knowledge
WHERE client_id = '[client_id]'
ORDER BY created_at DESC LIMIT 10;
```

### Step 4: Pull corrections and feedback

```sql
SELECT title, content FROM agent_knowledge
WHERE type IN ('correction', 'feedback')
AND (content ILIKE '%[client_name]%' OR tags @> ARRAY['[client_name_lowercase]'])
ORDER BY created_at DESC LIMIT 10;
```

### Step 5: Pull prior keyword and campaign performance

```sql
SELECT content FROM agent_knowledge
WHERE type IN ('audit', 'analysis', 'sop')
AND content ILIKE '%[client_name]%'
AND (content ILIKE '%keyword%' OR content ILIKE '%headline%' OR content ILIKE '%ad copy%')
ORDER BY created_at DESC LIMIT 5;
```

### What to extract from Phase 0

Compile a **Client Brief** with these fields before moving to Phase 1:

- **USPs:** What makes this business different from competitors?
- **Target audience:** Demographics, psychographics, income level, age range
- **Location reality:** Where are they actually located? Does their geo match the keywords?
- **What's worked:** Which keywords, ad groups, or messaging angles have performed best?
- **What's failed:** Which keywords or messaging angles underperformed?
- **Client preferences:** Any feedback on ad copy, creative fatigue sensitivity, tone preferences?
- **Pricing stance:** Do they lead with price? Avoid price? Offer consultations?
- **CTA history:** What calls-to-action have been used and what converted?
- **Known gaps:** Any missing data (credentials, before/after photos, specific technique names)?

**If no client_name or client_id was provided:** Skip Phase 0 entirely. The agent will still work -- it just produces more generic recommendations. Note at the top of the output: "No client context was provided. Recommendations are based on competitor research and general customer psychology only."

---
