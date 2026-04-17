---
name: meta-ads-connector-agent
description: "[DEPRECATED 2026-04-16] This agent is superseded by ads-agent, which provides full Meta + Google Ads access with universal client resolution via find_client(). Use ads-agent instead."
---

# DEPRECATED — Use ads-agent Instead

This agent has been superseded by `ads-agent`.

**Why:** `ads-agent` provides all the same Meta Ads capabilities plus:
- Google Ads access via the dashboard API
- Universal client resolution via `find_client()` (fuzzy name matching)
- Report note editing
- Findings written to `ads_knowledge`

**Migration:** Replace any invocation of `meta-ads-connector-agent` with `ads-agent`.

The original content has been archived to `.claude/agents/_decommissioned/meta-ads-connector-agent.md`.
