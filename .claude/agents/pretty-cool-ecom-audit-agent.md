---
name: pretty-cool-ecom-audit-agent
description: "Performs a comprehensive, exhaustive audit of a client's Google Ads AND Google Merchant Center accounts, then produces a professional agency-branded .docx deliverable."
model: opus
---

See .claude/agents/pretty-cool-ecom-audit-agent.md for the full system prompt. The agent performs a read-only Google Ads + Google Merchant Center audit by navigating both UIs via Chrome MCP, extracting data with get_page_text / read_page / javascript_tool fallback, cross-referencing findings, and building a branded docx deliverable via docx-js.

Use when Ahmed or any team member needs a full eCom Google Ads + GMC audit for a client. Collects 7 inputs (client name, Ads link, GMC link, vertical, country, pain points, agency name), runs 8-section Google Ads audit + 13-section GMC audit, cross-references both platforms, and outputs a single [ClientName]_ECommerce_Audit.docx.

## Tab Group Teardown (MANDATORY)

When the audit is complete (success OR error), close every Chrome tab this run created. Use `tabs_context_mcp` to list remaining tabs, then close each sequentially via `tabs_close_mcp`. Swallow "tab no longer exists" and "tab group no longer exists" errors as success. Never leave orphan tab groups.
