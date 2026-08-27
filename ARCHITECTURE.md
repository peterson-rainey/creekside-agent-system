# Creekside Marketing - System Architecture

Last updated: 2026-08-27. Maintained manually; the weekly `brain-steward` routine checks this file's last-commit age and queues a refresh proposal when it exceeds 60 days.

## 1. What This Is

Creekside Marketing's AI-powered operations platform. A RAG database in Supabase, an agent system powered by Claude, and data pipelines deployed on Railway. Run by Peterson Rainey (CEO) and Cade MacLean (CMO). The system spans roughly 130 tables, just over 100 active agents, and about 190 database functions.

## 2. Architecture Overview

Two layers make up the system:

**Agent Layer** (this GitHub repo)
Defines how agents behave. Agent prompts in `.claude/agents/*.md`, safety hooks in `.claude/hooks/*.sh`, shared skills in `.claude/skills/`, per-user config in `.claude/user-memory/`, and `CLAUDE.md` as the master instructions file. This layer is the operating system -- it controls behavior, not data.

**Knowledge Base** (Supabase)
Everything agents need to know. Client data, communications, ad performance, financials, SOPs, corrections, patterns, domain knowledge, and vector embeddings. Project ID: `suhnpazajrmfcmbwckkx`. The agent layer queries the knowledge base -- it does not replace it.

Data enters the knowledge base via **pipelines** (Railway). Python scripts on cron schedules pull from Gmail, ClickUp, Google Ads, Meta Ads, Square, Fathom, etc. and write to Supabase. Scheduled agents also run on Railway.

## 3. Agent Layer vs Knowledge Base

The GitHub repo is the agent layer. Supabase is the knowledge base. The agent layer defines behavior and queries the knowledge base for data. They are not interchangeable -- don't store knowledge in the repo, and don't store agent behavior in the database.

### What lives in the agent layer (this repo)

| Location | What | Purpose |
|----------|------|---------|
| `CLAUDE.md` | Universal rules, standing orders | Loaded every session, every user |
| `.claude/agents/{name}.md` | Agent prompts | Defines how each agent behaves |
| `.claude/agents/{name}/docs/*.md` | Agent-specific reference | Query templates, interpretation frameworks, loaded on-demand |
| `.claude/skills/{name}/SKILL.md` | Shared skills | Reusable capabilities across agents |
| `.claude/skills/{name}/reference/*.md` | Skill reference docs | Skill-specific patterns and config |
| `.claude/hooks/*.sh` | Safety and automation hooks | Guardrails, auto-commit, session management |
| `.claude/user-memory/{username}/` | Per-user preferences | Personal workflow patterns, persists via GitHub |
| `.claude/roles/*.md` | Role definitions | Admin vs contractor behavior |

### What lives in the knowledge base (Supabase)

Everything agents query at runtime: SOPs, corrections, patterns, domain facts, client data, communications, ad performance, financials, embeddings. See Section 6 for table details.

**Rule:** When in doubt, store in the knowledge base. The repo is for agent behavior. The database is for data and knowledge.

### Agent Prompts (GitHub-first since 2026-04-29)

- Agent prompts live in `.claude/agents/{name}.md` (source of truth)
- `agent_definitions.system_prompt` in Supabase is a **synced copy** maintained by the `agent-edit-monitor.sh` hook
- To edit an agent: modify the `.md` file. NEVER update `system_prompt` in the DB directly
- Railway scheduled agents (`ai_dispatcher` mode) read from DB, so the sync hook must stay healthy
- Current list: `SELECT name FROM scheduled_agents WHERE execution_mode = 'ai_dispatcher'` (9 as of 2026-08-21)
- `agent_definitions` table still stores metadata (name, description, department, tools, status, read_only) - that data stays in the DB

## 4. Repository Map

Five separate repos. NEVER confuse them.

| Repo | Local Path | Purpose | GitHub |
|------|-----------|---------|--------|
| **creekside-agent-system** | `/Users/petersonrainey/C-Code - Rag database/` | This repo. RAG database, agents, hooks, skills | `peterson-rainey/creekside-agent-system` |
| **creekside-dashboard** | `~/creekside-dashboard/` | Internal ops dashboard. Railway deploy. | `creekside-marketing/creekside-dashboard` |
| **creekside-pipelines** | `~/creekside-pipelines/` | Data sync pipelines. Railway deploy. | `peterson-rainey/creekside-pipelines` |
| **creekside-website** | `~/creekside-website/` | Public website (creeksidemarketingpros.com). Astro 5 + Tailwind 4. | `drybonez235/creekside` |
| **creekside-ad-pages** | `~/creekside-ad-pages/` | Client landing pages monorepo (Astro + Cloudflare). Jonathan deploys via git subtree -- never run subtree commands. | `Drybonez235/creekside-ad-pages` |

Also exists: `~/creekside-tools/` is the PUBLIC free marketing tools site. Completely separate from internal systems.

## 5. Repo Structure

```
CLAUDE.md                              # System instructions (protected)
ARCHITECTURE.md                        # This file - system architecture reference
README.md                              # Contractor setup guide
.claude/
  agents/                              # Agent prompt files (source of truth)
    {name}/docs/                       # Agent-specific reference docs (loaded on-demand)
    _decommissioned/                   # Retired agents
  hooks/                               # Safety + automation hooks
  routines/                            # Local scheduled routine prompts (source of truth)
  skills/                              # Core shared skills
    {name}/reference/                  # Skill-specific reference docs
    _personal -> symlink               # Auto-created: points to your contractor-skills folder
  user-memory/                         # Per-user memories (isolated by directory)
    peterson/                          # Peterson's preferences, corrections, workflow
    cade/                              # Cade's preferences and workflow
  contractor-skills/                   # Per-contractor personal skills
    cade/
    {contractor-name}/
  settings.json                        # Hook matchers, permissions (protected)
  user-role.conf                       # Local identity (gitignored, per-machine)
```

## 6. Database Tables

Roughly 130 tables grouped by domain.

### Core/System
Agent definitions, knowledge base, run history, scheduled agents, system registry, events, flags, chat sessions, prompt config, API cost tracking, and company rules. The backbone of the agent system.

Key tables: `agent_definitions`, `agent_knowledge`, `scheduled_agents`, `system_registry`, `chat_sessions`, `api_cost_tracking`

### Clients
Client records, reporting configuration, cached context summaries, health scores, matching queue, and contractor goals. Everything about who we serve.

Key tables: `clients`, `reporting_clients`, `client_context_cache`, `client_health_scores`

### Communications
Ingested data from Gmail, ClickUp (chat, comments, docs, tasks, time entries), Google Calendar, Fathom transcripts, Loom videos, Google Chat summaries, and legacy Slack summaries. The full communication history across all platforms.

Key tables: `gmail_summaries`, `clickup_chat_entries`, `clickup_entries`, `fathom_entries`, `google_calendar_entries`

### Advertising
Meta and Google ad accounts, campaigns, daily insights, ad knowledge base, ROAS calculations and leads, and report notes. All paid media performance data.

Key tables: `meta_insights_daily`, `google_insights_daily`, `meta_campaigns`, `google_campaigns`, `roas_calculations`

### Financial
Accounting entries, Square transaction data, and weekly business scorecards.

Key tables: `accounting_entries`, `square_entries`, `weekly_scorecard`

### Content/RAG
Raw content for embeddings, search analytics, duplicate detection, ingestion logs, classification rules, approved content generations, case studies, and LinkedIn post examples. The RAG retrieval backbone.

Key tables: `raw_content` (central embedding table), `search_analytics`, `ingestion_log`

### Sales/Outbound
Leads, Upwork jobs and proposals, SDR generation logs and responses, tool interview data, and industry experience records. Everything related to new business.

Key tables: `leads`, `upwork_jobs`, `upwork_leads`, `upwork_lead_status_history`, `upwork_proposal_logs`, `sdr_generation_log`, `upwork_outbound_messages`

`upwork_outbound_messages` (added 2026-08-27) is the queue + audit log for API-sent Upwork messages. The Upwork API token gained messaging WRITE scope 2026-08-26 (`createRoomStoryV2`; scope change revoked the old refresh token -- re-auth SOP in agent_knowledge). Sender: `~/upwork-api/send_message.py` -- validator-gated (`.claude/agents/sdr-agent/validate_response.py` BLOCK = hard stop), reply-only (never creates rooms), default dry-run (explicit `--send` required), daily cap 25, per-room content-hash dedup, post-send delivery verification via `roomStories`. Row lifecycle: `pending -> approved -> sent` (or `rejected`/`failed`). Queue modes (`--queue`, `--send --process-approved`) support the planned approval workflow; no launchd sender is armed yet -- all sends are currently manual CLI invocations. `createJobProposal` (proposal submission) remains scope-blocked.

`upwork_lead_status_history` (added 2026-08-25) logs every ClickUp status transition for `upwork_leads`: the pipeline `sync_leads.py` diffs incoming vs stored status each run and inserts transition rows (`source='sync'`; new leads get a NULL→status birth row). A one-time backfill from ClickUp's Time-in-Status API ran 2026-08-26 (`pipelines/upwork/backfill_status_history.py` in creekside-pipelines): 4,769 reconstructed transitions across 773 leads back to 2025-07-23, `source='backfill'` with `detected_at` = actual historical entry time (journeys reconstructed by sorting each visited status's last-entry timestamp; revisits collapsed). Pre-backfill sync rows were pruned as subsumed. `salesman_inferred` was also enriched from `call booked pete/cade/lindsey` history (+86 leads). The dashboard Sales tab computes no-shows and nurture saves from these transitions. `upwork_leads.salesman_inferred` holds salesperson attributions derived from ClickUp assignees/conversation evidence when the `salesman` field is empty. `upwork_leads.mrr_inferred` (added 2026-08-26) holds Square-billing-derived MRR (median billed month per matched `square_entries` customer) for won leads missing the ClickUp MRR field; 27 leads backfilled. `upwork_leads.loss_reason_inferred` + `loss_reason_confidence` (added 2026-08-26) hold AI-classified loss reasons for all nurture/lost leads (618 backfilled via `pipelines/upwork/backfill_loss_reasons.py` in creekside-pipelines): 11-value taxonomy (ghosted, price, chose_competitor, bad_timing, diy_in_house, no_show_never_rebooked, unqualified_too_small, stopped_after_proposal, dnd_asked_to_stop, other, no_data), classified by Claude Haiku from Upwork conversation threads + raw ClickUp task comments (live via ClickUp API, added 2026-08-27) + ClickUp comment summaries + status journeys (zero-evidence leads get no_data / no_show_never_rebooked deterministically, always low confidence). `loss_reason_note` (added 2026-08-27) stores the classifier's one-line evidence citation; `loss_reason_manual` (added 2026-08-27) syncs the ClickUp "Loss Reason" dropdown (field id 142f7aa5, options: Ghosted, Price, Chose Competitor, Bad Timing, DIY, too small, unqualified, unknown; falls back to the legacy "Reason lost" free-text field, whose 5 historical values are preserved verbatim in the column) and takes precedence over the inference in the dashboard ("unknown" falls through to the AI). A one-time migration (`pipelines/upwork/migrate_loss_reason_dropdown.py`) populated the dropdown on all ~635 lost/nurture leads from the AI classifications 2026-08-27 (two runs: 251 direct-mapped, then 384 more after Peterson's collapse rules; 2 stale-task-id failures). Collapse rules (Peterson 2026-08-27): no_show_never_rebooked and stopped_after_proposal → Ghosted; dnd_asked_to_stop, other, no_data → unknown. The dashboard keeps full 11-value granularity: `resolveLossReason` treats a manual "Ghosted" whose AI subtype is in the ghosted family (ghosted/no_show/stopped_after_proposal) as consistent AI provenance, not a human override. The legacy free-text "Reason lost" field was deleted from ClickUp 2026-08-27 (values preserved in `loss_reason_manual` first). Classification is ONGOING, not one-time: `sync_leads.py` calls `backfill_loss_reasons.run(0, True, False)` after every sync, which classifies only newly-lostish unclassified leads (cheap no-op otherwise; never fails the sync) and writes the collapsed dropdown back to ClickUp via `set_loss_dropdown_if_unset` (never overwrites an existing value) — so the dropdown should only be blank on not-yet-lost or won leads. DND status is NOT treated as "asked us to stop" — per Peterson 2026-08-27, DND can mean we chose to stop pursuing; dnd_asked_to_stop requires an explicit request in the messages, so each DND lead is classified from evidence individually. The dashboard excludes the junk lead named "test" from all Sales-tab analytics. `loss_reason_inferred/_confidence/_note` are sync-safe (`sync_leads.py` never writes them); `loss_reason_manual` IS in the sync payload since it is ClickUp-sourced. The dashboard Sales tab reads `mrr` first, `mrr_inferred` as fallback, and resolves loss reasons manual-first (`resolveLossReason`), showing a High Conf. share, a loss-reasons-by-salesperson pivot, and a monthly stacked trend. Dashboard-wide standard (agent_knowledge id a8932864-c101-446e-85bb-92ede66086bb): AI-inferred visuals always carry a confidence marker.

### Team
Team member records, error tracking, contractor diagnostics and issues. Also Cade-specific tables for his agents, sessions, meeting notes, and secrets.

Key tables: `team_members`, `cade_agents`, `cade_chat_sessions`

### Files
Google Drive file metadata for legal, marketing, and operations folders, plus sync state tracking.

Key tables: `gdrive_legal`, `gdrive_marketing`, `gdrive_operations`

### Infrastructure
Pipeline health alerts, user pipeline config, cache configuration and versioning, strategy updater runs, scratch pad, internal tools registry, and vendor records.

Key tables: `pipeline_alerts`, `user_pipeline_config`, `cache_section_config`

## 7. Key Database Functions

### Search
- `search_all(query, match_count)` - semantic search via embeddings across 17 tables
- `keyword_search_all(query, table_filter, limit)` - full-text search across same tables
- `search_all_expanded(query, count)` - expanded semantic search
- `logged_search_all()` / `logged_keyword_search()` - same searches but log to `search_analytics` for gap detection
- `list_searchable_tables()` - shows which tables have RAG coverage

### Client
- `get_client_360(client_id)` - comprehensive cross-platform client view
- `get_client_timeline(client_id)` - chronological activity for a client
- `match_incoming_client(name, source)` - fuzzy name resolution
- `resolve_client_id(identifier)` - resolve name/ID to client record
- `find_client(search_term)` - lightweight client search
- `calculate_client_health_scores()` - refresh health score calculations

### Content
- `get_full_content(source_table, source_id)` - retrieve full raw text for a record
- `get_full_content_batch(items)` - batch version of above
- `sync_*_to_rag()` functions - sync source tables into `raw_content` for embedding

### System
- `system_overview()` - all tables with purpose and row counts
- `system_connections()` - foreign key relationships between tables
- `system_health_dashboard()` - overall system health check
- `get_recent_changes()` - recent modifications across the system
- `validate_new_entry(type, name)` - prevent duplicate creation
- `validate_new_knowledge(type, title, tags)` - prevent duplicate knowledge entries
- `docs_refresh_full()` - refresh all documentation caches

### Maintenance
- `auto_link_client_ids()` / `auto_link_*()` - link orphaned records to client IDs
- `run_duplicate_scan()` - detect duplicate content
- `detect_*()` functions - various anomaly detection
- `queue_reembedding()` - queue content for re-embedding

## 8. How Agents Work

Agent files live in `.claude/agents/{name}.md`. Each file has:

- **YAML frontmatter**: name, description, tools, model
- **Body**: the system prompt (instructions for the agent)

The `agent_definitions` table stores metadata plus a synced copy of the prompt. The sync is handled by the `agent-edit-monitor.sh` hook on every file save.

**Discovery:**
```sql
SELECT name, description FROM agent_definitions WHERE status = 'active';
```

**Spawning:** Use the Agent tool with the agent's `subagent_type`.

**Special statuses:**
- `active` - ready to use
- `draft` - in development, not routable
- `deprecated` - retired
- `needs-rebuild` - broken, needs work

Decommissioned agents are moved to `.claude/agents/_decommissioned/`.

## 9. How Skills Work

Skills are reusable capabilities shared across agents.

- **Core skills**: `.claude/skills/{name}/SKILL.md`
- **Personal contractor skills**: `.claude/contractor-skills/{username}/{name}/SKILL.md`

In Claude Code, the `session-init.sh` hook auto-symlinks personal skills to `.claude/skills/_personal` so they load automatically. In Claude Chat and Co-work, read skill files directly from the `contractor-skills` directory.

## 10. How Hooks Work

Hooks are shell scripts that fire at specific lifecycle points. They enforce safety, automate syncing, and maintain system integrity.

| Hook | Trigger | Purpose |
|------|---------|---------|
| `auto-pull.sh` | SessionStart | Git pull latest from GitHub |
| `session-init.sh` | SessionStart | Identify user, load startup guide, symlink contractor skills |
| `load-config.sh` | SessionStart | Verify DB connectivity, count active agents |
| `block-protected-files.sh` | PreToolUse | Block edits to CLAUDE.md, hooks, settings without ADMIN_MODE |
| `block-destructive-ops.sh` | PreToolUse | Block DROP, TRUNCATE, DELETE without WHERE, rm -rf, force push |
| `enforce-contractor-scope.sh` | PreToolUse | Block contractor writes to system tables |
| `killswitch-check.sh` | PreToolUse | Freeze all ops if KILLSWITCH.md exists |
| `agent-edit-monitor.sh` | PostToolUse | Auto-commit agent/skill file edits, push to GitHub, sync prompt to DB |
| `qc-gate.sh` | PreToolUse | Enforce QC reviewer after N writes |
| `qc-enforce.sh` | PreToolUse | Enforce QC pattern on outputs |
| `correction-inject.sh` | PreToolUse | Inject relevant corrections before agent output |
| `protocol-reminder.sh` | UserPromptSubmit | Inject query response protocol every turn |
| `compliance-check.sh` | PreToolUse | Verify compliance with standing rules |
| `session-autosave.sh` | PostToolUse | Track session state for auto-save |
| `session-finalize.sh` | SessionEnd/Stop | Save session summary to `chat_sessions` |
| `session-save-reminder.sh` | PostToolUse | Remind to save session at end |
| `audit-log.sh` | PostToolUse | Log all tool calls to audit trail |
| `snapshot-writes.sh` | PostToolUse | Snapshot file states before/after writes |
| `suggest-compact.sh` | PostToolUse | Suggest /compact when context gets large |
| `pre-compact.sh` | PreToolUse | Save state before context compaction |
| `track-session-state.sh` | PostToolUse | Track write counts and session state |
| `deploy-verify.sh` | PostToolUse | Verify Railway deploys after push |
| `cost-guard.sh` | PreToolUse | Monitor API cost per session |
| `agent-build-guard.sh` | PreToolUse | Enforce build process for new agents |
| `skill-registry-reconcile.sh` | PostToolUse | Keep skill registry in sync |
| `skill-registry-sync.sh` | PostToolUse | Sync skill metadata to DB |
| `surface-admin-questions.sh` | PostToolUse | Surface unanswered admin questions |

## 11. How Pipelines Work

Railway runs Python data sync scripts on cron schedules. Each pipeline pulls data from an external source and writes to its target table(s) in Supabase.

**Active pipelines:** Gmail, ClickUp, Google Calendar, Fathom, Google Ads, Meta Ads, Square, Upwork, Google Drive, Loom, Google Chat, Dental Orchestrator

**Dental Sequence Orchestrator (live 2026-08-26):** `pipelines/dental-orchestrator/` on Railway, cron `*/15` via `scheduled_agents` row `dental-orchestrator` (python_script mode). ClickUp Dental Leads list (901716331481) is the single source of truth for lead state; GHL is delivery-only (initial contact sync + SMS/email sends -- never read for state). Sequence definitions are YAML files bundled at `pipelines/dental-orchestrator/sequences/` (canonical deployed copy; `.claude/sequences/` holds editing copies). ClickUp status changes trigger sequence enrollment/transitions; sends are logged as task comments.

**Local pipelines (Peterson's Mac, NOT Railway):** Three sync jobs run locally in standalone folders, each with its own README documenting scripts, conventions, and gotchas:
- `~/gdrive_pipeline/` -- Google Drive shared-drive crawl + Gmail attachment filing (Railway has no Drive pipeline; this is the real one)
- `~/loom_pipeline/` -- Loom transcript sync via browser scraping (the Railway `pipelines/loom/` script is a health-check stub only)
- `~/youtube_pipeline/` -- YouTube channel transcript sync (launchd `com.creekside.youtube-sync`, feeds the SEO blog generator)

**Monitoring:**
```sql
SELECT * FROM get_all_pipeline_status();  -- Current health of all pipelines
```

The `pipeline_alerts` table tracks failures and anomalies. Scheduled agents (~50 enabled) also run on Railway in two modes: `python_script` (deterministic) and `ai_dispatcher` (Claude-powered).

**Scheduled work lives in three places -- check all three when investigating what runs and when:**

1. **Railway scheduled agents** -- `scheduled_agents` table (`SELECT name, cron_expression FROM scheduled_agents`)
2. **Local routines** -- Peterson's Mac (only when awake). Prompts live in `.claude/routines/*.md` (source of truth); `~/.claude/scheduled-tasks/*/SKILL.md` files are thin pointers. Examples: brain-steward, daily-status-brief, pre-call-prep, gmail-triage.
3. **Remote triggers** -- claude.ai cloud (`RemoteTrigger list`). Example: SEO blog generator.

**Ad platform connectors (since 2026-08-17):** AdKit MCP (`mcp.adkit.so`) is the primary connector for ALL live Google Ads and Meta operations -- reads and writes. PipeBoard is fully deprecated. Backups: official Meta Ads MCP for Meta reads; dashboard API / Chrome UI for Google reads. See the `ads-connector` skill.

## 12. How Search Works

Two search modes. Always use BOTH for comprehensive results.

**Semantic search** (`search_all`): Embedding similarity across 17 tables via the `raw_content` table. Best for conceptual and natural language queries.

**Keyword search** (`keyword_search_all`): Full-text search across the same 17 tables. Best for exact terms, names, and IDs.

Use `logged_` variants (`logged_search_all`, `logged_keyword_search`) to feed `search_analytics` for gap detection.

**Critical rule:** Summaries are for FINDING records. Raw text (via `get_full_content`) is for ANSWERING questions. Always retrieve the full content before generating a response based on search results.

```sql
SELECT * FROM list_searchable_tables();  -- Which tables have RAG coverage
```

## 13. How the Client Data Model Works

- `clients` - core client records (name, status, contact info, services)
- `reporting_clients` - per-platform reporting config (one client can have multiple entries for Meta, Google, etc.)
- `client_context_cache` - summarized view of each client, refreshed by the `client-cache-refresher` agent
- `client_health_scores` - calculated by the `client-health-scorer` agent
- `get_client_360(client_id)` - comprehensive cross-platform view pulling from all related tables
- `match_incoming_client(name, source)` - fuzzy name resolution for incoming data

**Date rule:** Use content date columns (`date`, `sent_at`, `call_date`) for chronological queries. NEVER use `created_at` for timeline ordering. `created_at` is when the pipeline ingested the row, not when the event happened.

## 14. Safety and Access Control

### Protected Files
CLAUDE.md, hooks, settings.json, .env files. Require ADMIN_MODE to edit:
```bash
touch .claude/ADMIN_MODE   # Peterson runs this to unlock
rm .claude/ADMIN_MODE      # Agent removes after edits
```

### Blocked Operations
- `DROP TABLE/SCHEMA/DATABASE/COLUMN`
- `TRUNCATE`
- `DELETE FROM` without a WHERE clause
- `rm -rf`
- `git push --force`
- `git reset --hard`
- `npx @anthropic-ai/claude-code` (prevents child CLI processes that bill API directly)

### Contractor Scope
Contractors cannot write to: `agent_definitions`, `system_users`, `scheduled_agents`, and other system tables. Enforced by `enforce-contractor-scope.sh`.

### Row-Level Security
Supabase tables use RLS policies. Service role key bypasses RLS for system operations.

### Kill Switch
Create `KILLSWITCH.md` in project root to freeze all operations. Delete to resume.

### Duplicate Prevention
- `validate_new_entry(type, name)` - check before creating anything new
- `validate_new_knowledge(type, title, tags)` - check before inserting into `agent_knowledge`

## 15. Session Types and What Works Where

| Feature | Claude Code | Claude Chat | Claude Co-work |
|---------|------------|-------------|----------------|
| CLAUDE.md loads | Yes | Yes | Yes |
| Hooks fire | Yes | No | No |
| Auto-pull from git | Yes (hook) | No (manual) | No (manual) |
| User identity auto-detected | Yes (hook) | No (ask user) | No (ask user) |
| Skills auto-load | Yes | No (read files) | No (read files) |
| MCP tools (Supabase, ads, etc.) | Yes | Yes | Yes |
| Agent spawning | Yes | Limited | Limited |
| File read/write | Yes | No | Project files only |

In Claude Chat and Co-work, compensate for missing hooks by: manually identifying the user, reading skill files directly, and running `git pull` when prompted.

## 16. Communication Platforms

**Active:** Google Chat, ClickUp, Gmail, LinkedIn

**Ingestion-only:** Slack. The daily pipeline reads a few client channels (e.g. medwriter, tiami-nightlark) into the brain, but NEVER send messages via Slack, recommend it, or list it as a communication platform.

**ClickUp messaging:** "Send to [person] in ClickUp" means chat message (`clickup_send_chat_message`), NOT creating a task. Only create tasks when explicitly asked.

**Peterson's voice:** No em dashes in any outbound content. Run non-trivial messages through the `communication-style-agent` before sending.

## 17. Quick Reference

### Key IDs

| Item | Value |
|------|-------|
| Supabase project | `suhnpazajrmfcmbwckkx` |
| Session startup guide | `agent_knowledge` ID `83308752-50a8-42cd-bb15-54bfa04e7764` |
| Coding standards | `agent_knowledge` title = `'Coding Standards Reference'` |

### Key Queries

```sql
-- System health
SELECT * FROM system_health_dashboard();

-- All tables with purpose + row counts
SELECT * FROM system_overview();

-- Active agents
SELECT name, department, description FROM agent_definitions
WHERE status = 'active' ORDER BY department, name;

-- Search (always use both)
SELECT * FROM logged_search_all('query text', 10);
SELECT * FROM logged_keyword_search('term', NULL, 20);

-- Full content for answering (after search finds a record)
SELECT * FROM get_full_content('source_table', 'source_id');

-- Client lookup
SELECT * FROM client_context_cache WHERE client_name ILIKE '%name%';

-- Comprehensive client view
SELECT * FROM get_client_360('client_id');

-- Pipeline health
SELECT * FROM get_all_pipeline_status();

-- Corrections (check before producing output)
SELECT title, content FROM agent_knowledge
WHERE type = 'correction' ORDER BY created_at DESC;

-- SOPs for a topic
SELECT title, content FROM agent_knowledge
WHERE type = 'sop' AND title ILIKE '%keyword%';

-- Scheduled agents
SELECT name, cron_expression, description, enabled
FROM scheduled_agents ORDER BY name;
```

### QC Pattern (Mandatory for All Output)

For any output the user will act on or that writes data:
1. Spawn the worker agent, get result
2. Spawn `qc-reviewer-agent` with the result
3. PASS = present to user. FAIL/WARN = fix and re-validate.

For externally shared deliverables, also spawn `expert-review-agent`.
For executable code, also spawn `code-audit-agent`.
Simple read-only lookups skip QC.
