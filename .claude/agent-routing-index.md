# Agent Routing Index

Compact reference for routing requests to the correct agent. Read this BEFORE querying `agent_definitions` -- if a match is obvious here, skip the DB query.

**Maintained by:** agent-builder-agent (adds new entries after every build)
**Last updated:** 2026-05-01

---

## Ads & Campaign Management

| Agent | Use when... |
|-------|-------------|
| ads-agent | Any ad performance question, campaign analysis, creative review (Meta or Google) |
| ad-copy-editor-agent | Changing ad copy across Google/Meta accounts (find/replace, lane-aware edits) |
| competitor-ad-research-agent | Competitor ad intelligence, headline research, Transparency Center browsing |
| meta-ads-connector-agent | Routing reference for Meta Ads data operations via PipeBoard MCP |
| pretty-cool-ecom-audit-agent | Full Google Ads + Merchant Center audit with .docx deliverable |
| laleh-rebuttal-agent | Laleh/Lux Dental complaint rebuttals with live evidence + PDF |

## Clients

| Agent | Use when... |
|-------|-------------|
| client-context-agent | Any question about a client's status, history, performance, or projects |
| client-onboarding-agent | New client signs -- creates DB records, seeds cache, links data |
| client-retention-agent | Churn risk detection, retention offers, intervention workflows |
| client-health-scorer | Daily health score calculation (scheduled) |
| client-cache-refresher | Weekly rebuild of client_context_cache (scheduled) |
| client-field-sync-agent | Daily backfill of NULL fields on clients/reporting_clients (scheduled) |
| weekly-client-report-agent | Weekly status reports per client with red flags |

## Communication & Content

| Agent | Use when... |
|-------|-------------|
| communication-style-agent | Rewriting messages in Peterson's voice (Gmail, GChat, ClickUp, LinkedIn) |
| linkedin-post-agent | LinkedIn post generation (Tommy Clark methodology) |
| seo-blog-agent | Blog posts for creeksidemarketingpros.com |
| marketing-messaging-agent | Ad copy, cold outreach sequences, landing page copy, social posts |

## Sales & Pipeline

| Agent | Use when... |
|-------|-------------|
| pre-call-prep-agent | Prep brief before any call (sales, client, internal) |
| sales-call-helper-agent | Live call support -- talking points, objection handling, pricing |
| proposal-generator-agent | Proposals, audit reports, scope of work documents |
| case-study-builder-agent | Client case studies for proposals/social proof |
| sales-pipeline-agent | Pipeline status, lead tracking, follow-up cadence, stall analysis |

## Operations & Tasks

| Agent | Use when... |
|-------|-------------|
| clickup-task-manager-agent | ClickUp task CRUD, status updates, overdue reports |
| google-calendar-agent | Calendar management, event creation, time-block rules |
| meeting-followup-agent | Post-meeting action items, ClickUp tasks, Gmail follow-up drafts |
| call-action-extractor | Extract action items from call transcripts (read-only) |
| action-item-closer | Daily auto-close of completed action items (scheduled) |
| financial-analyst-agent | P&L, expenses, revenue, cash flow, budgets |
| invoice-billing-agent | Square invoicing, payment tracking, AR reports |
| cost-summary-agent | Daily API spend summary and cost optimization |
| ghl-crm-agent | GoHighLevel CRM queries -- contacts, opportunities, calls, SMS |

## Building & Meta

| Agent | Use when... |
|-------|-------------|
| agent-builder-agent | Build new agents/skills, edit/restructure existing ones |
| interview-agent | Requirement-gathering before major builds |
| training-extractor-agent | Find all training material Peterson has given on a topic |
| agent-installer | Install agents from awesome-claude-code-subagents repo |
| marketing-strategy-agent | CMO-level strategy advice (positioning, offers, niche, pricing) |

## QC & Compliance

| Agent | Use when... |
|-------|-------------|
| qc-reviewer-agent | Validate agent output before presenting (mandatory for deliverables) |
| expert-review-agent | Domain-expert audit on external deliverables |
| code-audit-agent | Run + review executable code (.sh, .js, .py, SQL) |
| security-audit-agent | Verify safety stack integrity (hooks, RLS, protected files) |
| sop-compliance-agent | Audit runtime behavior against documented SOPs |
| connectivity-auditor | Weekly compliance and connectivity audit |
| agent-quality-audit | Weekly agent definition completeness check |

## Email

| Agent | Use when... |
|-------|-------------|
| gmail-inbox-agent | Triage incoming email, route ambiguous messages |
| gmail-intelligence-agent | Draft replies in Peterson's voice with RAG context |
| filter-feedback-digest | Daily auto-filter candidate digest for approval |

## Infrastructure & Pipelines

| Agent | Use when... |
|-------|-------------|
| db-monitor-agent | Database health -- errors, gaps, anomalies |
| railway-monitor-agent | Railway service health, pipeline logs, failures |
| auto-remediation | Auto-fix embedding gaps, stale alerts, duplicates |
| context-linker-agent | Backfill missing client_id values across tables |
| entity-detector | Named entity detection and client linking |
| docs-agent | Keep DB documentation current |
| docs-refresh | Daily system_registry counts and stale entry cleanup |
| dedup-scanner | Weekly duplicate detection |
| sync-agents | Sync local agent files to DB (run after agent changes) |
| data-quality-agent | Spot-check data quality across tables |
| data-quality-audit | Weekly Monday data quality audit |

## Reporting

| Agent | Use when... |
|-------|-------------|
| report-editor-agent | Edit client dashboard reports (plain language changes) |
| kpi-tracking-agent | KPI dashboard -- revenue, churn, per-client metrics |

## Team & Onboarding

| Agent | Use when... |
|-------|-------------|
| contractor-onboarding-agent | New contractor setup -- team_member record, checklist, action items |
| contractor-health-check-agent | Diagnose contractor's local environment issues |
| user-onboarding-agent | New user setup in the multi-tenant system |

## Corrections & Knowledge

| Agent | Use when... |
|-------|-------------|
| correction-capture-agent | Write corrections with audit trail, invalidate cache, null embeddings |
| correction-graduation-agent | Check graduation status of provisional corrections |
| data-promotion-agent | Promote contributor data to authoritative dataset |
| sop-refinement-agent | Auto-refine SOPs from session execution data (scheduled) |

## Scheduled-Only (not directly invoked)

| Agent | Purpose |
|-------|---------|
| strategy-updater-agent | Per-client daily strategy judgment (Python orchestrator) |
| creekside-doc-updater-agent | Company living-doc updates (Python orchestrator) |
| session-summarizer-agent | Nightly chat_sessions cleanup |
| sdr-prompt-tuner-agent | Daily SDR instruction updates |
| cost-monitor | API spend limit enforcement |
| error-monitor | Hourly error detection |
| industry-experience-sync | Weekly industry_experience table sync |
| fathom-cade / gmail-cade | Cade's personal pipeline syncs |
| clickup-docs-sync | Daily ClickUp docs sync |
| upwork-leads-sync / upwork-sheet-sync | Upwork data syncs |
| agent-prompt-drift-check | Nightly prompt drift detection |
