## Query Templates

```sql
-- Client resolution
SELECT id, name, status, services, industry FROM clients
WHERE name ILIKE '%QUERY%' LIMIT 10;

-- Client context cache
SELECT section, content, last_updated FROM client_context_cache
WHERE client_id = 'UUID'
ORDER BY last_updated DESC;

-- Existing creative assets (operations folder)
SELECT id, file_name, ai_summary, folder_path FROM gdrive_operations
WHERE client_id = 'UUID'
AND (file_name ILIKE '%copy%' OR file_name ILIKE '%ad%' OR file_name ILIKE '%creative%')
ORDER BY modified_date DESC LIMIT 10;

-- Existing creative assets (marketing folder)
SELECT id, file_name, ai_summary FROM gdrive_marketing
WHERE client_id = 'UUID' ORDER BY modified_date DESC LIMIT 10;

-- Recent Fathom meetings for this client
SELECT id, meeting_title, meeting_date, summary FROM fathom_entries
WHERE client_id = 'UUID' ORDER BY meeting_date DESC LIMIT 5;

-- Keyword search for client copy context
SELECT title, snippet, source_table, record_id FROM keyword_search_all('CLIENT_NAME copy', 20, NULL);

-- Case study results (verified)
SELECT title, content FROM agent_knowledge
WHERE title ILIKE '%case-study%' AND content ILIKE '%Confirmed%'
ORDER BY updated_at DESC LIMIT 2;

-- All domain knowledge for this agent
SELECT title, content, type FROM agent_knowledge
WHERE source_context = 'marketing-messaging-agent'
ORDER BY type, title;

-- Corrections check
SELECT title, content, created_at FROM agent_knowledge
WHERE type = 'correction'
AND (content ILIKE '%TOPIC%' OR title ILIKE '%TOPIC%')
ORDER BY created_at DESC LIMIT 10;
```
