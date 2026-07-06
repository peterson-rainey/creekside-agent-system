# Context Detection & Retrieval

## Required Context Detection (Run First)

Before detecting the industry, check whether critical context is missing. This gate applies to `followup` and `nurture` types primarily, but also to `lead` responses on proposal-origin threads.

### Job Description

Look for proposal-origin evidence in the conversation: phrases like "your job post", "I applied to your posting", "I saw your job post", lead opens with hiring language, or messages are clearly responses to a posted role.

If proposal-origin evidence is present AND no job description was provided:

1. Try to pull it from the database:
```sql
SELECT id, job_name, job_description, platform, created_at
FROM upwork_jobs
WHERE client_name ILIKE '%{lead_name}%' OR job_name ILIKE '%{keyword_from_conversation}%'
ORDER BY created_at DESC
LIMIT 3;
```
Also check:
```sql
SELECT id, lead_name, description, upwork_proposal_url
FROM upwork_leads
WHERE lead_name ILIKE '%{lead_name}%'
ORDER BY created_at DESC
LIMIT 3;
```

2. If not found in the database, ask the user: "This looks like a proposal-origin thread. The job description often has context I need. Can you paste it in?"

3. If the user says "generate anyway," proceed in degraded mode: stick to safe, generic touches. Never fabricate job details or reference requirements that weren't stated in the conversation.

### Call Transcript

Scan the conversation for call evidence:
- Calendly or booking link in an earlier message, followed by a calendar confirmation or "booked" signal
- Phrases like "great talking to you", "on our call", "as we discussed", "per our conversation"
- Rescheduling language ("can we move our call", "I need to reschedule")
- A clear gap in conversation after a booking confirmation (call almost certainly happened)

If call evidence is found AND no transcript was provided:

1. Try to pull the Fathom transcript from the database:
```sql
SELECT id, meeting_title, meeting_date, LEFT(summary, 300) AS summary
FROM fathom_entries
WHERE (meeting_title ILIKE '%{lead_name}%' OR meeting_title ILIKE '%{company_name}%')
  AND meeting_type IN ('discovery', 'sales', 'client_call')
ORDER BY meeting_date DESC
LIMIT 5;
```
If a match is found, retrieve the full transcript:
```sql
SELECT full_text FROM raw_content
WHERE source_table = 'fathom_entries' AND source_id = '{fathom_entry_id}';
```
Or use: `get_full_content('fathom_entries', '{fathom_entry_id}')`

2. If not found in the database, ask the user: "I can see a call happened. Do you have the Fathom transcript? Post-call messages land better when grounded in what they actually said."

3. If the user says "generate anyway," proceed in degraded mode: stick to a bare status question or a soft outcome-curiosity touch. Never fabricate call references ("as we discussed") or claim to know their stated pain points.

### Post-Call Goal Shift

If call evidence is found, determine the call's recency:

```sql
SELECT id, meeting_title, meeting_date, duration_minutes
FROM fathom_entries
WHERE (meeting_title ILIKE '%{lead_name}%' OR meeting_title ILIKE '%{company_name}%')
  AND meeting_type IN ('discovery', 'sales', 'client_call')
ORDER BY meeting_date DESC
LIMIT 1;
```

Based on recency, set the post-call goal:

- **Call within the last 6 months:** The goal is to BEGIN ONBOARDING, not to book another call. CTA = next steps toward starting (send onboarding doc, get account access, confirm proposal details). Do NOT suggest booking another call unless they specifically ask for one.
- **Call was 6+ months ago:** Treat as a re-engagement. The original call is stale. Goal = book a NEW discovery call to reassess their situation.
- **Call evidence found but no date available:** Default to the onboarding goal. If unsure, ask the user: "I can see a call happened but can't confirm when. Should I aim to start onboarding or book a fresh call?"

This goal shift applies to lead and followup response types. It overrides the default "book a call" CTA. **Exception: nurture** -- if a lead had a call but didn't convert and is now in the 60-day nurture cycle, keep the CTA soft (see nurture.md post-call rules). A hard onboarding push in nurture will feel aggressive after they already declined.

---

## Industry Detection

Scan the conversation for industry keywords:

| Industry | Keywords |
|----------|----------|
| ecom | ecommerce, e-commerce, shopify, woocommerce, online store, DTC, direct to consumer, product sales |
| healthcare | dental, dentist, medical, healthcare, clinic, doctor, hospital, med spa, dermatology, chiropractic, veterinary, optometry |
| saas | SaaS, software, subscription, app, platform, B2B software, trial, freemium |
| agency_partner | agency, white label, white-label, partner, reseller |
| finance | financial, insurance, mortgage, lending, banking, fintech, accounting, CPA |
| real_estate | real estate, realtor, property, homes, apartments, commercial real estate |
| home_services | roofing, HVAC, plumbing, electrician, contractor, landscaping, pest control, cleaning, restoration |
| other_services | law, legal, attorney, restaurant, fitness, gym, salon, auto, automotive |

Also query the database for any additional keywords:
```sql
SELECT DISTINCT industry_key, keywords FROM industry_experience;
```

Use the first matching industry. If no match, set industry to `null`.

---

## Context Retrieval Queries

Run these queries to gather all context. Run as many in parallel as possible.

### Industry Experience
```sql
SELECT industry_key, industry_label, keywords, business_name, platforms, result_statement
FROM industry_experience
ORDER BY industry_key;
```
Group by industry_key. For the detected industry, collect the label, client count, platforms, and result statements.

### Company Rules
```sql
SELECT id, category, rule_title, rule_description, always_include
FROM company_rules
WHERE is_active = true
ORDER BY always_include DESC, category;
```
Split into "Always Apply" (always_include = true) and "Relevant" rules. For the relevant set, select those whose category or content relates to the conversation topic. If this is a followup/nurture, ensure "Follow-up Strategy" category rules are included.

### Similar Past Responses (skip for nurture type)
```sql
SELECT * FROM logged_search_all(
  'Lead said: ' || (extract last lead message from conversation),
  20, NULL, NULL, 'sdr-agent'
);
```
Also do a keyword search:
```sql
SELECT * FROM keyword_search_all(
  (key terms from conversation),
  20, NULL, NULL, 'sdr-agent'
);
```
Filter results to `sdr_responses` table entries.

For any sdr_responses found, also query directly:
```sql
SELECT id, conversation_id, turn_index, platform, lead_name, industry,
       immediate_context, context_summary, full_response, response_type, outcome
FROM sdr_responses
WHERE industry = '{detected_industry}'
ORDER BY conversation_date DESC NULLS LAST
LIMIT 20;
```

Filter out initial proposals: responses at turn_index=1 that match the active profile's initial proposal filter pattern (see the loaded profile doc). For samuel: contains "Samuel Rainey" + "Case Study" references + credential boilerplate. For lindsey: contains "Lindsey Bouffard" + "Case Study" references + credential boilerplate.

Deduplicate by first 200 characters of full_response to prevent canned message bias.

### Discovery Call Insights
```sql
SELECT * FROM logged_search_all(
  (lead's business type or industry from conversation),
  5, NULL, NULL, 'sdr-agent'
);
```
Filter results to `fathom_entries` table.

Alternatively query directly:
```sql
SELECT id, meeting_title, meeting_date,
       LEFT(summary, 500) AS summary, key_topics, action_items
FROM fathom_entries
WHERE meeting_type IN ('discovery', 'client_call', 'sales')
ORDER BY meeting_date DESC
LIMIT 5;
```

### Voice Samples
Use the voice sample query string from the loaded profile doc (e.g., `'Samuel Rainey Upwork response ...'` for samuel, `'Lindsey Bouffard Upwork response ...'` for lindsey):

```sql
SELECT * FROM logged_search_all(
  {profile_voice_query_string} || (key topic from conversation),
  5, NULL, NULL, 'sdr-agent'
);
```
Filter results to `gmail_summaries` table. Take top 3 results, truncate each to 1500 characters.

Fallback if search returns no gmail results: use the sender name from the loaded profile doc (samuel: `'%peterson%' OR '%samuel%'`; lindsey: `'%lindsey%'`):
```sql
SELECT id, LEFT(ai_summary, 1500) AS text
FROM gmail_summaries
WHERE sender ILIKE '{profile_sender_pattern}'
ORDER BY message_date DESC
LIMIT 3;
```

### Relevant Knowledge
```sql
SELECT title, content, type
FROM agent_knowledge
WHERE type IN ('sop', 'correction', 'methodology', 'rule')
AND (
  title ILIKE '%upwork%' OR title ILIKE '%sdr%' OR title ILIKE '%proposal%'
  OR title ILIKE '%proven results%' OR title ILIKE '%follow-up%'
  OR content ILIKE '%{detected_industry}%'
)
ORDER BY created_at DESC
LIMIT 8;
```

For the "Proven Results by Industry" SOP, extract only the section relevant to the detected industry.

### Report Match (only if lead asks about reports/dashboards)

Check if the conversation mentions: report, dashboard, live data, campaign data, real-time, performance data, analytics, tracking, see results, show data, example report.

If so:
```sql
SELECT rc.client_name, rc.platform, rc.client_type,
       'https://creekside-dashboard.up.railway.app/report/' || rc.report_token AS report_url,
       c.industry
FROM reporting_clients rc
LEFT JOIN clients c ON c.id = rc.client_id
WHERE rc.status = 'active'
ORDER BY rc.client_name;
```

Score each report:
- Industry match with detected industry: +10 points
- Client type match (ecom vs lead_gen based on conversation): +5 points
- Platform match (meta/google based on conversation): +3 points

Return the top-scoring report.

### Approved Generations
```sql
SELECT id, response_text
FROM approved_generations
WHERE response_type = '{response_type}' OR response_type IS NULL
ORDER BY created_at DESC
LIMIT 10;
```

### Conversation Summary (only if conversation > 2000 characters)
If the conversation text exceeds 2000 characters, generate a 1-2 sentence summary of the conversation so far.
