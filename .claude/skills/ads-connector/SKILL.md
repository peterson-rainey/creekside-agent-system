---
name: ads-connector
description: "Routing reference for live ad-platform operations at Creekside Marketing — both READING data and MAKING CHANGES. Meta / Facebook / Instagram is handled via PipeBoard MCP (verified live, full read + write surface). Google Ads is handled via a dedicated Google Ads MCP under a separate namespace (verified live 2026-04-23 — `list_google_ads_customers` returned 33 Creekside accounts); full read + write surface. A read-only Google Ads Python SDK pipeline backs up historical data in Supabase. Use whenever a user or agent asks how to pull, query, read, create, update, pause, duplicate, or otherwise manage ads, ad sets, campaigns, creatives, audiences, pixels, keywords, or lead forms on either platform. Do NOT use for historical trend queries against Supabase tables (e.g. meta_insights_daily, google_ads_insights_daily) — this skill is for live, direct-from-platform operations."
---

# Ads Connector — Platform Routing

Route the caller to the correct live source for Google or Meta ads — for READS and for CHANGES. Never warehouse metrics at read time; always hit the platform live via the right MCP.

## Decision rule

| Platform | Primary connector | MCP namespace | Fallback |
|---|---|---|---|
| Meta / Facebook / Instagram | **PipeBoard MCP** | `mcp__claude_ai_PipeBoard__*` (pre-declared) or `mcp__748a69c8-a69a-40cc-97fb-98bd2c007663__*` (deferred) | None |
| Google Ads | **Google Ads MCP** | `mcp__claude_ai_Pipeboard_google__*` (pre-declared) or `mcp__da1177e9-4cc5-4a06-8588-8631c91d4c03__*` (deferred) | **3-Tier Fallback** (see below) |
| Both | Call per-platform connector, then combine | — | — |

**Critical distinction:** Meta and Google run on SEPARATE MCPs with different namespaces. PipeBoard is Meta-only. Google Ads MCP uses different tool names (prefixed `*_google_ads_*`, customer IDs are 10-digit numerics, not `act_*`).

If the request is ambiguous ("ads", "campaigns", "performance" with no platform named) — ask the user which platform.

---

## Shared conventions

**Deferred tools:** both MCPs expose tools through `ToolSearch`. Agents must `ToolSearch` for the tool by name (e.g. `select:list_google_ads_customers`) before calling it.

**Account resolution:** resolve via `SELECT * FROM find_client('<name>')`:
- Meta -> `meta_account_ids[]` (format: `act_XXXXXXXXX`)
- Google -> `google_account_ids[]` (format: 10-digit customer ID, no dashes)

If the array is empty, call the platform's account-listing tool and match by name.

**Write-safety rule (both platforms):** before any write, state exactly what will change, show parameters, wait for explicit "yes". Log to `ads_knowledge` as `knowledge_type: 'account_decision'` after execution.

---

## Google Ads 3-Tier Fallback (MANDATORY)

The Google Ads MCP (Pipeboard) is known to hit rate limits. When pulling Google Ads data, ALWAYS follow this waterfall. Do NOT skip tiers.

| Tier | Source | Type | When to escalate |
|------|--------|------|-----------------|
| **1** | Google Ads MCP (`mcp__claude_ai_Pipeboard_google__*`) | Full R+W, live | Rate limit (`429`, `RESOURCE_EXHAUSTED`, timeout, `503`) |
| **2** | Dashboard API via WebFetch (`creekside-dashboard.up.railway.app/api/google/*`) | Read-only, live | HTTP 500/502/503, timeout, empty response |
| **3** | Chrome Browser via `chrome-browser-nav` skill (`ads.google.com`) | Read-only, UI scrape | All tiers failed -> suggest Supabase historical tables |

**Write operations require Tier 1.** If Tier 1 is rate-limited and the user needs a write, they must wait. Do NOT attempt writes via Tiers 2 or 3.

**Full details:** Read `reference/google-ads-fallback.md` for rate limit signals, API endpoints, Chrome steps, and limitations per tier.

---

## Tool references (on-demand)

- **Meta Ads tools:** `reference/meta-ads-tools.md` — read/write operations, bulk tools, standard insights call, targeting
- **Google Ads tools:** `reference/google-ads-tools.md` — read/write operations, GAQL examples, MCC permissions

---

## Backup: Google Ads Python SDK pipeline (read-only, Supabase-bound)

A Python pipeline syncs Google Ads data into Supabase daily for historical trend analysis.

- **Location:** `creekside-pipelines/pipelines/google_ads/run_daily.py`
- **Use for:** historical trend queries, long-window comparisons, yesterday-and-older data
- **Not for:** today's data or any writes — use the live MCP for those

---

## When NOT to use this skill

- **Historical trend analysis** — query `meta_insights_daily` or Google Ads Supabase tables directly
- **Full audit or analysis deliverable** — use `ads-agent`
- **Authenticated screenshots** — use `chrome-screenshot-pipeline` skill

## Citations

- `[source: PipeBoard/Meta, act_XXXXXXXXX, last_30d]`
- `[source: Google Ads MCP, customer_id, last_30_days]`
- `[source: Dashboard API, customer_id, date_range]`
- `[source: Google Ads UI/Chrome, customer_id, date_range]` with `[MEDIUM]` confidence
- `[source: Supabase/google_ads_insights_daily, customer_id, date_range]` (backup pipeline)
