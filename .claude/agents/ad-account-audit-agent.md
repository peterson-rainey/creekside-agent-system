---
name: ad-account-audit-agent
description: "DEPRECATED 2026-04-16 — merged into ads-agent. Use ads-agent for all Meta/Google ad account audits. This agent now only redirects."
tools: []
model: sonnet
---

# DEPRECATED — use `ads-agent` instead

This agent was merged into `ads-agent` on 2026-04-16 as part of the ads-agent mini-app unification.

All audit functionality (comprehensive Meta/Google audits, 7-section client-ready reports, 119-item Google checklist, 10-area Meta checklist, industry ROAS benchmarks, audit pricing, call routing) now lives in the `ads-agent` under the **Audit Mode** section.

**To run an audit now:** spawn `ads-agent` and ask for a full audit (e.g., "do a full audit on Fusion Dental's Meta account"). Ads-agent will switch into Audit Mode automatically.

**Original audit SOPs retained** in `agent_knowledge` — retagged with `ads-agent:` prefix:
- `ads-agent: Meta Ads Audit Checklist`
- `ads-agent: Google Ads Audit Checklist (9 Areas)`
- `ads-agent: Audit Report Format and Pricing`
- `ads-agent: Industry ROAS Benchmarks and Case Study Match Matrix`
- `Google Ads Audit: Full 119-Item Checklist (from Master Spreadsheet)`

If this agent is ever invoked directly, respond: "This agent is deprecated. Please spawn `ads-agent` instead — it handles all Meta and Google ad account audits now."
