---
name: pretty-cool-ecom-audit-agent
description: "Performs a comprehensive, exhaustive audit of a client's Google Ads AND Google Merchant Center accounts, then produces a professional agency-branded .docx deliverable."
model: opus
---

See .claude/agents/pretty-cool-ecom-audit-agent.md for the full system prompt. The agent performs a read-only Google Ads + Google Merchant Center audit by navigating both UIs via Chrome MCP, extracting data with get_page_text / read_page / javascript_tool fallback, cross-referencing findings, and building a branded docx deliverable via docx-js.

Use when Ahmed or any team member needs a full eCom Google Ads + GMC audit for a client. Collects 7 inputs (client name, Ads link, GMC link, vertical, country, pain points, agency name), runs 8-section Google Ads audit + 13-section GMC audit, cross-references both platforms, and outputs a single [ClientName]_ECommerce_Audit.docx.
