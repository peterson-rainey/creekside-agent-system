# Agent Routing Index

Quick-reference for routing requests to the correct agent. Use this for fast pattern-matching. For BUILD and ACTION requests, always confirm against `agent_definitions` if the agent is unfamiliar or recently added.

**Maintained by:** agent-builder-agent (adds new entries after every build)
**Last updated:** 2026-05-01

---

## Ads & Campaign Management

| Agent | Use when... |
|-------|-------------|
| ads-agent | Any ad performance question, campaign analysis, creative review (Meta or Google) |
| ad-copy-editor-agent | Changing ad copy across Google/Meta accounts (find/replace, lane-aware edits) |
| competitor-ad-research-agent | Competitor ad intelligence, headline research, Transparency Center browsing |
| laleh-rebuttal-agent | Laleh/Lux Dental complaint rebuttals with live evidence + PDF |

### Direct platform access (no agent needed)

For simple lookups, quick metrics pulls, or when contractors need raw data:

| Platform | MCP tools | Key entry points |
|----------|-----------|-----------------|
| Google Ads | `mcp__claude_ai_Pipeboard_google__*` | `list_google_ads_customers` (account list), `get_google_ads_campaign_metrics` (performance), `execute_google_ads_gaql_query` (custom queries) |
| Meta Ads | `mcp__claude_ai_PipeBoard__*` | `get_ad_accounts` (account list), `get_insights` (performance), `get_campaigns`/`get_adsets`/`get_ads` (structure) |
| Historical data | Supabase `execute_sql` | `meta_insights_daily`, `google_ads_insights_daily` tables |

Full reference (API keys, auth, troubleshooting): `SELECT content FROM agent_knowledge WHERE title = 'Platform MCP Access Reference for Contractors'`

## Clients

| Agent | Use when... |
|-------|-------------|
| client-context-agent | Any question about a client's status, history, performance, or projects |
| client-onboarding-agent | New client signs -- creates DB records, seeds cache, links data |
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

## Operations & Tasks

| Agent | Use when... |
|-------|-------------|
| daily-status-brief | Morning brief covering calendar, action items, email, pipelines, finances |
| clickup-task-manager-agent | ClickUp task CRUD, status updates, overdue reports |
| google-calendar-agent | Calendar management, event creation, time-block rules |
| meeting-followup-agent | Post-meeting action items, ClickUp tasks, Gmail follow-up drafts |
| call-action-extractor | Extract action items from call transcripts (read-only) |
| action-item-closer | Daily auto-close of completed action items (scheduled) |
| financial-analyst-agent | P&L, expenses, revenue, cash flow, budgets |
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
| connectivity-auditor | Weekly compliance and connectivity audit |
| agent-quality-audit | Weekly agent definition completeness check |

## Email

| Agent | Use when... |
|-------|-------------|
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

## Team & Onboarding

| Agent | Use when... |
|-------|-------------|
| contractor-onboarding-agent | New contractor setup -- team_member record, checklist, action items |
| contractor-health-check-agent | Diagnose contractor's local environment issues |
| user-onboarding-agent | New user setup in the multi-tenant system |

## Corrections & Knowledge

| Agent | Use when... |
|-------|-------------|
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
