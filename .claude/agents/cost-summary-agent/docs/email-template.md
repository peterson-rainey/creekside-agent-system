## Step 9: Compose and Store the Email Digest

Build the structured email from all collected data and store it in agent_knowledge.

### Email Structure

```
SUBJECT: Daily Cost Report — [YESTERDAY DATE] | $X.XX API spend | [NORMAL/WARNING/BREACH]

=== YESTERDAY'S SUMMARY ===
API Spend (Railway agents): $X.XX [HIGH]
  vs $10/day budget: X% | vs $25/day hard max: X%
  vs 7-day avg ($X.XX): +/-X% | vs 30-day avg ($X.XX): +/-X%

Claude Max Plan (fixed $200/month):
  Sessions yesterday: X | 30-day total: X | Avg/day: X
  Implied cost-per-session: $X.XX

=== TOP 5 AGENTS BY COST ===
[TABLE: Rank | Agent | Model | Runs | Cost | Avg/Run | Tokens]

=== ANOMALIES ===
[Anomaly list or "None detected"]
[Breach list or "No breaches yesterday"]

=== FAILED RUNS ===
[Failed run table or "No failures yesterday"]

=== 7-DAY TREND ===
[Date | Daily Cost | vs 30d Avg table]

=== OPTIMIZATION RECOMMENDATIONS ===
[Numbered list]

=== DATA NOTES ===
All API cost figures [HIGH] from api_cost_tracking.
Trend figures [MEDIUM] — derived from aggregates.
CLI utilization [MEDIUM] — session count proxy; individual token data unavailable.
Sources: api_cost_tracking, agent_run_history, chat_sessions, api_cost_breaches, api_cost_limits
```

Set STATUS in subject line:
- NORMAL: total spend < $10/day budget, no anomalies
- WARNING: spend between $10–$25, or anomalies detected, or failed runs with significant waste
- BREACH: any api_cost_breaches record yesterday

### Store the Digest
```sql
INSERT INTO agent_knowledge (title, content, type, tags)
VALUES (
  'Daily Cost Report — ' || TO_CHAR(NOW() AT TIME ZONE 'America/Chicago' - INTERVAL '1 day', 'YYYY-MM-DD'),
  '[FULL EMAIL DIGEST TEXT COMPOSED ABOVE]',
  'sop',
  ARRAY['api-costs', 'railway', 'daily-report', 'scheduled-agent', 'cost-summary']
)
RETURNING id;
```

Then insert into raw_content (do NOT include char_count — it is a generated column):
```sql
INSERT INTO raw_content (source_table, source_id, full_text)
VALUES ('agent_knowledge', '[id from above]', '[FULL EMAIL DIGEST TEXT]');
```

### Amnesia Prevention
If the analysis revealed any new pattern not already in agent_knowledge (recurring failure, model misconfiguration, trend anomaly), write it as a separate record:
```sql
INSERT INTO agent_knowledge (title, content, type, tags)
VALUES (
  '[Pattern title]',
  '[Pattern description with evidence and citation]',
  'pattern',
  ARRAY['api-costs', 'railway', 'discovery']
);
```

### Set result_summary for agent_run_history
End your run with this as your final output so it is captured in agent_run_history.result_summary:
```
Cost report stored: Daily Cost Report — [DATE]. Total spend: $X.XX. Status: [NORMAL/WARNING/BREACH]. Top agent: [name] at $X.XX. [N] recommendations generated. Email digest ready in agent_knowledge.
```

---
