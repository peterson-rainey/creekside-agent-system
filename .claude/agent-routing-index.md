# Agent Routing Index

Quick-reference for routing requests to the correct agent. Use this for fast pattern-matching. For BUILD and ACTION requests, always confirm against `agent_definitions` if the agent is unfamiliar or recently added.

**Maintained by:** agent-builder-agent (adds new entries after every build)
**Last updated:** 2026-07-09

---

## Ads & Campaign Management

| Agent | Use when... |
|-------|-------------|
| ad-account-monitor-agent | Daily morning monitor for Creekside ad accounts -- 6 health-check rules against live Meta data per monitored client (scheduled) |
| ad-copy-editor-agent | Changing ad copy across Google/Meta accounts (find/replace, lane-aware edits) |
| competitor-ad-research-agent | Competitor ad intelligence on Google (Transparency Center) AND Meta (Ad Library -- Chrome-driven, optional API). Use for pre-launch competitive analysis, single- or multi-vertical research, attack-ad discovery. |
| laleh-rebuttal-agent | Laleh/Lux Dental complaint rebuttals with live evidence + PDF |
| meta-audit-agent | Full Meta Ads audit (70-item checklist) for any client or prospect -- produces Creekside-branded audit PDF + Loom Recording Brief PDF. Use when Peterson or Cade needs a Meta audit deliverable. |

### Direct platform access (no agent needed)

For simple lookups, quick metrics pulls, or when contractors need raw data:

| Platform | MCP tools | Key entry points |
|----------|-----------|-----------------|
| Google Ads | `mcp__claude_ai_Pipeboard_google__*` | `list_google_ads_customers` (account list), `get_google_ads_campaign_metrics` (performance), `execute_google_ads_gaql_query` (custom queries) |
| Meta Ads | **Default:** `mcp__claude_ai_Meta_Ads__*` (official MCP). **Fallback:** `mcp__claude_ai_PipeBoard__*` (MCP-disabled accounts, lead gen forms, writes) | `ads_get_ad_accounts`, `ads_get_ad_entities` (unified query with `level` param), `ads_insights_performance_trend`. PipeBoard fallback: `get_insights`, `get_campaigns`/`get_adsets`/`get_ads` |
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
| newsletter-compiler-agent | Compile weekly newsletter from pasted contributor submissions (team + external partners). Returns Markdown draft + 3 subject line options for Peterson to edit. Hand off to newsletter-send-agent to deliver. |
| content-freshness-agent | Weekly pass: identifies blog posts with stale numeric data, updates CPCs/CPAs/ROI figures from RAG database, sets lastModified frontmatter for Google AI freshness signals. Runs Monday 6 AM CT. Admin-only. |
| faq-schema-agent | Monthly: mines real prospect questions from Fathom discovery/sales call transcripts, generates FAQ sections grounded in campaign data, injects into blog posts lacking FAQs. Improves Google rich results and AI Overview visibility. |
| linkedin-post-agent | LinkedIn post generation (Tommy Clark methodology) |
| seo-blog-agent | Blog posts for creeksidemarketingpros.com |
| marketing-messaging-agent | Ad copy, cold outreach sequences, landing page copy, social posts |

## Sales & Pipeline

| Agent | Use when... |
|-------|-------------|
| pre-call-prep-agent | Prep brief before any call (sales, client, internal) |
| sales-call-helper-agent | Live call support -- talking points, objection handling, pricing |
| proposal-generator-agent | Formal .docx proposals, retainer quotes, audit reports -- fetches live Google Doc template and customizes for the specific lead; outputs .docx + email draft |
| upwork-proposal-agent | Quick Upwork proposals from a job posting. Supports two profiles: `samuel` (Google/Meta/multi-platform, 4 styles) and `lindsey` (Meta Ads + email specialist, default style). Paste a job description, specify profile, get a ready-to-send proposal. Includes fit screening and case study matching. |
| sdr-agent | Upwork conversation responses (and SDR responses generally as scope expands). Supports two profiles: `samuel` (default, unchanged behavior) and `lindsey` (Meta/email specialist persona). Handles lead, followup, nurture, and warmup types. Validates for pricing leaks, banned phrases, timeline commitments, sign-off names. Alias: upwork-sdr-agent. |
| sdr-feedback-miner-agent | Mine ClickUp feedback Peterson gave Queenie on lead responses to generate a prioritized sdr-agent improvement digest. Use when: "what feedback have I given Queenie?", "I want to improve the SDR agent", or before any sdr-agent edit session. Read-only -- never applies changes. |
| case-study-builder-agent | Client case studies for proposals/social proof |

## Operations & Tasks

| Agent | Use when... |
|-------|-------------|
| api-connector-agent | Contractor wants to pull data from or interact with Klaviyo, Mailchimp, Shopify, GoHighLevel, HubSpot, SendGrid, or ActiveCampaign for a client (uses vault-stored keys, never exposes raw credentials) |
| daily-status-brief | Morning brief covering calendar, action items, email, pipelines, finances |
| clickup-task-manager-agent | ClickUp task CRUD, status updates, overdue reports |
| google-calendar-agent | Calendar management, event creation, time-block rules |
| post-call-agent | Extract deduplicated action items from sales/client call transcripts; writes approved Notes for Next Call items to the client's ClickUp weekly call notes doc |
| action-item-closer | Daily auto-close of completed action items (scheduled) |
| financial-analyst-agent | P&L, expenses, revenue, cash flow, budgets |
| ghl-crm-agent | GoHighLevel CRM queries -- contacts, opportunities, calls, SMS |
| pricing-update-agent | Peterson changes pricing (rates, breakpoints, cap, minimum, onboarding). Cascades the change across all scripts, docs, DB entries, Google Drive, website, and notifies Cade. Admin-only. |

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
| gmail-notification-dismissal-agent | SCHEDULED daily 8 AM CT (local launchd). Clears already-handled system notification emails from the [GPS] Peterson Gmail label. Deterministic -- no LLM calls. Admin-only. |
| cyndi-gmail-intelligence-agent | SCHEDULED (~30 min, business hours). Server-side Gmail drafter for Cyndi's inbox -- scans for emails addressed to "Cyndi" (exact spelling), pulls Supabase context, creates DRAFT replies. Never sends. DISABLED pending Cyndi Gmail OAuth + Railway MCP wiring. |
| peterson-gmail-draft-agent | SCHEDULED (every 30 min, business hours Mon-Fri). Server-side draft-reply agent for Peterson's inbox (peterson@). Scans for genuine human emails, pulls Supabase RAG context, creates DRAFT replies in Peterson's voice. Never sends. Ships DISABLED -- enable after Railway Gmail OAuth confirmed and first batch reviewed. Note: overlaps with gmail-manager skill; enable deliberately. |
| peterson-gmail-inbox-sorter-agent | SCHEDULED (3x daily Mon-Fri: 9am/12pm/4pm CT). Auto-sorts new emails in Peterson's inbox into his existing Gmail folders. Classifies via live label discovery + sampling. Archives sorted mail, marks non-important email read. Human-direct, client/lead, and urgent/money emails stay UNREAD. High-water mark ensures only new mail is touched per run. Browser delegation via Cyndi. Never sends/replies/deletes. Built by Cyndi. |
| filter-feedback-digest | Daily auto-filter candidate digest for approval |
| newsletter-send-agent | Peterson wants to send his weekly newsletter to GHL subscribers without opening the GHL UI. Handles opt-out suppression, shows preview + recipient count, requires explicit confirmation before sending. Admin-only (needs GHL_API_KEY). NOTE: status=draft in agent_definitions -- confirm before spawning |
| unresponded-message-agent | Find messages 48h+ without a reply (Gmail, GChat, ClickUp). Two-pass: Pass 1 filters candidates, Pass 2 detects partial responses, selective responses, and topic-shifted conversations. Drafts replies for inbound, auto-sends ClickUp follow-ups to team, flags client gaps |

## Infrastructure & Pipelines

| Agent | Use when... |
|-------|-------------|
| quarterly-consumption-audit-agent | Quarterly fleet audit: which Railway + local scheduled agents are worth their cost? Produces KILL/REVIEW/KEEP verdicts based on 90-day cost, failure rates, and consumption evidence. Emails HTML report to Peterson. Runs automatically 1st Jan/Apr/Jul/Oct; can also be triggered on-demand. Admin-only. |
| db-monitor-agent | Database health -- errors, gaps, anomalies |
| railway-monitor-agent | Railway service health, pipeline logs, failures |
| auto-remediation | Auto-fix embedding gaps, stale alerts, duplicates |
| context-linker-agent | Backfill missing client_id values across tables |
| entity-detector | Named entity detection and client linking |
| docs-agent | Keep DB documentation current |
| docs-refresh | Daily system_registry counts and stale entry cleanup |
| dedup-scanner | Weekly duplicate detection |
| sync-agents | Sync local agent files to DB (run after agent changes) |
| data-quality-audit | Weekly Monday data quality audit |
| agent-prompt-drift-check | Nightly pg_cron check for broken/missing agent prompts (writes pipeline_alerts) |

## Reporting

| Agent | Use when... |
|-------|-------------|
| report-editor-agent | Edit client dashboard reports (plain language changes) |
| fusion-weekly-report-agent | Fusion Dental Implants weekly Meta report (scheduled Mon/Thu on Railway; emails Lindsey) |

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

## Topic Layer (direct SQL, no agent needed)

For "everything about X", "how do I do X", or cross-platform topic questions, use the topic layer before falling back to raw search:

| Question shape | Query |
|----------------|-------|
| "Everything we have on [topic]" (optionally per client) | `SELECT * FROM get_topic_360('topic', client_id, 10);` -- resolves 38 canonical topics AND aliases (e.g. 'GHL', 'pixel', 'lookalikes') |
| "How do I do X" / training video lookup | `agent_knowledge` entries titled `Loom How-To Index -- <category>` (6 categories, weekly auto-refresh) |
| Valid topic list | `SELECT name, category, aliases FROM topic_taxonomy ORDER BY category, name;` |
| Taxonomy feels incomplete | `agent_knowledge` entry 'Topic Taxonomy Gap Report (weekly auto-refresh)' |

get_topic_360 complements (does not replace) `search_all` + `keyword_search_all`: use it when the question is topic-shaped rather than free-text. Always pull raw text via `get_full_content` before answering specifics.

## Decision Frameworks (formats to use, not agents to spawn)

When a request triggers one of the patterns below, USE the named format. These are not agents — they are output structures that produced unusually clear results. Pull the canonical version from `agent_knowledge` before applying.

| Pattern in request | Format to use | Pull from |
|--------------------|---------------|-----------|
| "Should we do X?" / proposing operating norms / pitching SOPs / proposing workflow changes / decision recommendations | **What-Why-When-Who-How-Metric-Cost-Implementation** (8 sections, parallel structure across multiple ideas, sequenced rollout when proposing >1) | `SELECT content FROM agent_knowledge WHERE title = 'Idea Format: What-Why-When-Who-How-Metric-Cost-Implementation Template'` |

**When NOT to use:** quick lookups, factual claims, client-facing copy. The format is internal-decision oriented and overkill for everything else.

**Why it works (per Peterson 2026-05-06):** Forces parallel structure across ideas, names failure mode explicitly (not just "this would be good"), quantifies cost in hours, ties to existing data for the metric, names specific people and artifacts, sequences rollout by ascending cost. The fixed-section pattern catches vagueness automatically.

## Scheduled-Only (not directly invoked)

| Agent | Purpose |
|-------|---------|
| strategy-updater-agent | Per-client daily strategy judgment (Python orchestrator) |
| creekside-doc-updater-agent | Company living-doc updates (Python orchestrator) |
| client-core-doc-updater-agent | Per-client ClickUp Info/Project Info doc updater (Python orchestrator + direct CLI invocation). Keeps human-readable ClickUp docs current as contacts, budgets, operators, tracking setup, or engagement terms change. |
| session-summarizer-agent | Nightly chat_sessions cleanup (status=draft in agent_definitions; enabled on Railway) |
| error-monitor | Hourly error detection |
| industry-experience-sync | Weekly industry_experience table sync |
| fathom-cade / gmail-cade | Cade's personal pipeline syncs |
| clickup-docs-sync | Daily ClickUp docs sync |
| upwork-leads-sync / upwork-sheet-sync | Upwork data syncs |
