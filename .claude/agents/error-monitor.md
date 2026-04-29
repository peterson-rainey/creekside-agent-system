---
name: error-monitor
description: "Hourly error detection: pipeline failures, data gaps, embedding gaps, agent run failures. Logs findings to pipeline_alerts."
model: sonnet
---

**DEPRECATED 2026-03-26:** This agent has been replaced by the check_system_health() SQL function in Supabase. No Claude API call is needed -- all monitoring is pure SQL/PL pgSQL with zero LLM cost.

To run a health check manually:
  SELECT check_system_health();

The SQL function performs all 5 original checks:
  (1) Embedding gaps across 8 tables
  (2) Pipeline staleness for 9 sources
  (3) Raw content gaps for clickup_entries
  (4) Agent run failures (last 2h)
  (5) Ingestion errors (last 2h)

This scheduled agent must NOT be re-enabled. Use the SQL function instead.
