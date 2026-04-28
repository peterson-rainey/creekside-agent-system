---
name: ads-connector
description: "Routing reference for live ad-platform operations at Creekside Marketing — both READING data and MAKING CHANGES. Meta / Facebook / Instagram is handled via PipeBoard MCP's Meta connector (verified live, full read + write surface). Google Ads is handled via PipeBoard MCP's Google Ads connector under a separate namespace (verified live 2026-04-23 — `list_google_ads_customers` returned 33 Creekside accounts); full read + write surface. Both MCPs are provided by PipeBoard. A read-only Google Ads Python SDK pipeline backs up historical data in Supabase. Use whenever a user or agent asks how to pull, query, read, create, update, pause, duplicate, or otherwise manage ads, ad sets, campaigns, creatives, audiences, pixels, keywords, or lead forms on either platform. Do NOT use for historical trend queries against Supabase tables (e.g. meta_insights_daily, google_ads_insights_daily) — this skill is for live, direct-from-platform operations."
---

# Ads Connector — Platform Routing

Route the caller to the correct live source for Google or Meta ads — for READS and for CHANGES. Never warehouse metrics at read time; always hit the platform live via the right PipeBoard MCP connector.

## Decision rule

| Platform | Connector (all via PipeBoard) | MCP namespace | Status | Backup |
|---|---|---|---|---|
| Meta / Facebook / Instagram / WhatsApp / Audience Network | **PipeBoard — Meta connector** | `mcp__748a69c8-a69a-40cc-97fb-98bd2c007663__*` | **VERIFIED LIVE** — `get_ad_accounts` returned real Creekside accounts 2026-04-23 | — |
| Google Ads (search, display, PMax, shopping, YouTube) | **PipeBoard — Google Ads connector** | `mcp__da1177e9-4cc5-4a06-8588-8631c91d4c03__*` | **VERIFIED LIVE** — `list_google_ads_customers` returned 33 Creekside accounts 2026-04-23 | Python `google-ads` SDK pipeline in `creekside-pipelines/pipelines/google_ads/` — read-only, syncs daily into Supabase for historical trend data |
| Both | Call the right connector per platform, then combine | — | — | — |

**Critical distinction:** Both connectors are PipeBoard, but they run as **separate MCP instances under different namespace UUIDs**. The Meta connector (`748a69c8-...`) and the Google Ads connector (`da1177e9-...`) have entirely different tool names and parameter shapes. Google customer IDs are 10-digit numerics (no `act_` prefix); Meta account IDs are `act_XXXXXXXXX`. Do not mix them.

If the request is ambiguous ("ads", "campaigns", "last month's performance", "pause the underperformer" with no platform named) — ask the user which platform.

---

## Shared conventions

**Deferred tools:** both MCPs expose their tools through `ToolSearch`. Agents must `ToolSearch` for the tool by name (e.g. `select:list_google_ads_customers`) before calling it. Schemas are not pre-loaded.

**Account resolution:** if the caller gave a client name, resolve via `SELECT * FROM find_client('<name>')`:
- Meta → `meta_account_ids[]` (format: `act_XXXXXXXXX`)
- Google → `google_account_ids[]` (format: 10-digit customer ID, no dashes)

If the array is empty, call the platform's account-listing tool (`get_ad_accounts` for Meta, `list_google_ads_customers` for Google) and match by name.

**Write-safety rule (both platforms):** before any write, state exactly what is about to change, show the parameters, and wait for an explicit "yes" from the user. Log the change to `ads_knowledge` as `knowledge_type: 'account_decision'` after execution.

---

## Meta Ads via PipeBoard's Meta connector

Confirmed tool surface under `mcp__claude_ai_PipeBoard__*` (Sonnet agents with pre-declared tools) or `mcp__748a69c8-a69a-40cc-97fb-98bd2c007663__*` (deferred — fetch via `ToolSearch` first).

### Read operations

| Tool | Purpose |
|---|---|
| `get_ad_accounts` | List accessible Meta ad accounts |
| `get_campaigns` / `get_campaign_details` | Campaign data |
| `get_adsets` / `get_adset_details` | Ad set data |
| `get_ads` / `get_ad_details` | Individual ad data |
| `get_insights` | Spend, impressions, clicks, CTR, CPC, CPA, conversions, ROAS, reach, frequency |
| `get_ad_creatives` / `get_creative_details` | Creative assets |
| `get_custom_audiences` / `get_saved_audiences` | Audience data |
| `get_pixels` | Pixel / Events Manager listings |
| `get_lead_gen_forms` | Lead form data |
| `get_ad_previews` | Render ad preview |

### Write operations (confirm with user before executing)

| Tool | Purpose |
|---|---|
| `create_campaign` / `update_campaign` | Campaign management — create, pause, resume, edit budget / schedule / objective |
| `create_adset` / `update_adset` | Ad set management — targeting, placements, budget, schedule |
| `create_ad` / `update_ad` | Ad management — status, creative linkage |
| `create_ad_creative` / `update_ad_creative` | Creative management |
| `create_custom_audience` / `create_lookalike_audience` | Audience building |
| `upload_ad_image` / `upload_ad_video` | Asset uploads |
| `duplicate_campaign` / `duplicate_adset` / `duplicate_ad` | Duplication |
| `publish_lead_gen_draft_form` / `update_lead_gen_form_status` | Lead form management |

### Bulk (Premium tier)

`bulk_create_ads`, `bulk_update_ads`, `bulk_update_campaigns`, `bulk_update_adsets`, `bulk_create_ad_creatives`, `bulk_upload_ad_images`, `bulk_upload_ad_videos`, `bulk_get_insights`, `bulk_get_ad_creatives`, `bulk_search_interests`. Default batch cap is 20; can raise to 200 with explicit user confirmation.

### Standard `get_insights` call — last 30 days at campaign level

```
Tool: get_insights
Parameters:
  account_id: act_XXXXXXXXX      # from find_client()
  date_preset: "last_30d"
  level: "campaign"
  fields: ["spend","impressions","clicks","ctr","cpc","cpm","actions","cost_per_action_type","roas","reach","frequency"]
```

**Date preset values:** `last_7d`, `last_30d`, `last_quarter`, `this_month`, `last_month`. Custom: `time_range: {"since": "2026-01-01", "until": "2026-01-31"}`.

**Drill-down:** switch `level` to `"adset"` or `"ad"` and re-run, or chain `get_adsets` → `get_ads` → `get_ad_details` → `get_ad_creatives`.

### Targeting & sizing

`search_interests` / `search_behaviors` / `search_demographics` / `search_geo_locations` / `estimate_audience_size` / `search_pages_by_name`.

---

## Google Ads via PipeBoard's Google Ads connector

**Connection status: VERIFIED LIVE as of 2026-04-23.** `list_google_ads_customers` returned 33 queryable Creekside accounts under MCC `5680424954` (Creekside Marketing). One account (`2617643180` — HostSwitch) is accessible but not under the MCC. 11 additional IDs are in the list but deactivated (`CUSTOMER_NOT_ENABLED`) and cannot be queried.

**Namespace:** `mcp__da1177e9-4cc5-4a06-8588-8631c91d4c03__*` (deferred — always `ToolSearch` first). Separate from the Meta PipeBoard namespace despite both being PipeBoard connectors.

**Customer ID format:** 10-digit numeric (e.g. `9133281551`). No `act_` prefix. MCC manager ID is separate.

**Metrics gate:** `list_google_ads_customers` returns a `can_query_metrics` flag. MCC accounts return `false` — do NOT call metrics tools on them directly. Only call metrics tools on accounts where `can_query_metrics: true`.

### Read operations

| Tool | Purpose |
|---|---|
| `list_google_ads_customers` | List accessible Google Ads customer accounts (MCC + children) |
| `get_google_ads_account_info` | Account-level metadata |
| `execute_google_ads_gaql_query` | Run arbitrary GAQL queries |
| `get_google_ads_campaigns` / `get_google_ads_campaign_metrics` | Campaign list + performance |
| `get_google_ads_ad_groups` / `get_google_ads_ad_group_metrics` | Ad group list + performance |
| `get_google_ads_ads` / `get_google_ads_ad_metrics` | Ad list + performance |
| `get_google_ads_keywords` / `get_google_ads_keyword_metrics` | Keyword list + performance |
| `get_google_ads_negative_keywords` | Negative keyword inventory |
| `get_google_ads_search_terms_report` | Actual search queries that triggered ads |
| `get_google_ads_auction_insights` | Competitor auction data |
| `get_google_ads_audiences` | Audience list |
| `get_google_ads_bidding_strategy_report` | Bid strategy performance |
| `get_google_ads_device_performance` | Device breakdown |
| `get_google_ads_geo_performance` | Geo breakdown |
| `get_google_ads_hour_of_day_performance` | Hour-of-day breakdown |
| `get_google_ads_extensions` | Extensions (sitelinks, callouts, structured snippets) |
| `get_google_ads_pmax_asset_groups` | PMax asset groups |
| `list_google_ads_assets` | Asset library |
| `query_google_ads_api_docs` | Inline Google Ads API docs search |

### Write operations (confirm with user before executing)

| Tool | Purpose |
|---|---|
| `create_google_ads_campaign` / `update_google_ads_campaign` | Standard campaign management |
| `create_google_ads_pmax_campaign` | PMax campaign creation |
| `enable_google_ads_campaign` / `pause_google_ads_campaign` | Campaign status |
| `create_google_ads_ad_group` / `update_google_ads_ad_group` | Ad group management |
| `create_google_ads_responsive_search_ad` | RSA creation |
| `enable_google_ads_ad` / `pause_google_ads_ad` | Ad status |
| `add_google_ads_keywords` / `remove_google_ads_keywords` | Keyword inventory |
| `enable_google_ads_keyword` / `pause_google_ads_keyword` | Keyword status |
| `update_google_ads_keyword_bid` | Bid updates |
| `add_google_ads_negative_keywords` / `remove_google_ads_negative_keywords` | Negative keyword inventory |
| `create_google_ads_sitelink` / `create_google_ads_callout` / `create_google_ads_structured_snippet` | Extensions |
| `update_google_ads_extension_status` / `remove_google_ads_extension` | Extension management |
| `update_google_ads_pmax_asset_group` / `create_google_ads_shopping_listing_group_tree` | PMax management |
| `upload_google_ads_asset` | Asset upload |
| `add_google_ads_audience_to_campaign` | Audience targeting |
| `set_google_ads_geo_targeting` / `set_google_ads_language_targeting` | Targeting |
| `update_google_ads_network_settings` | Network settings (search, display, partners) |
| `execute_google_ads_mutate` | Arbitrary mutate operations |
| `create_google_ads_email_report` | Scheduled email reports |

### Standard read — account list

```
Tool: list_google_ads_customers
Parameters: (none)
Returns: customers[] with id, name, currency, time_zone, can_query_metrics, manager_customer_id
```

### Standard read — campaign performance via GAQL

```
Tool: execute_google_ads_gaql_query
Parameters:
  customer_id: "9133281551"            # from find_client() or list_google_ads_customers
  query: |
    SELECT campaign.id, campaign.name, campaign.status,
           metrics.cost_micros, metrics.impressions, metrics.clicks,
           metrics.ctr, metrics.conversions, metrics.cost_per_conversion
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
```

### MCC / permission errors

If a write call returns `USER_PERMISSION_DENIED`, re-run `list_google_ads_customers` to refresh the server's MCC mapping, then retry. The MCP resolves `login-customer-id` automatically from that mapping.

---

## Backup: Google Ads Python SDK pipeline (read-only, Supabase-bound)

Separate from the live MCP path, a Python pipeline syncs Google Ads data into Supabase daily for historical trend analysis.

- **Location:** `creekside-pipelines/pipelines/google_ads/run_daily.py`
- **SDK:** `google-ads>=24.0.0`
- **Operations:** read-only — `ga_service.search_stream()` GAQL queries
- **Destination:** Supabase tables (account / campaign / daily-insights, 365-day retention)
- **Use for:** historical trend queries, long-window comparisons, anything cached rather than live

This pipeline is a **backup data-ingestion path**, not a real-time connector. If the live MCP is down or rate-limited, agents can query the Supabase tables directly for yesterday-and-older data. For today's data or any write, use the live MCP.

---

## Fallback: Google Ads / Meta Ads UI (when the MCP can't do it)

**Routing principle:** try the PipeBoard MCP first. If the needed operation isn't in the MCP's tool surface, do it in the UI via Chrome automation. Do not invent MCP tools that don't exist.

**How to fall back:** route the task through the `chrome-screenshot-pipeline` skill (for screenshots / visual capture) or use Chrome MCP tools (`mcp__Claude_in_Chrome__*`) to navigate, read, click, and type in the authenticated Ads UI tab. Never use `screencapture`.

### Known UI-only operations (not in either PipeBoard connector)

Use the UI when the user asks for any of these. This list is not exhaustive — if the MCP doesn't surface a tool for the task, assume UI fallback.

**Google Ads UI-only:**
- Recommendations tab (apply / dismiss individual recs, auto-apply settings)
- Insights tab (demand forecasting, attribution viz, audience insights)
- Policy / disapproval deep detail and appeal flow
- Asset strength ratings (POOR / AVERAGE / GOOD / EXCELLENT) for RSAs and PMax
- Ads Preview & Diagnosis tool
- Billing and payment method management
- PMax search-theme / category reports (Insights tab for PMax)
- Account access / user management
- Field-level change history beyond what the API exposes
- Conversion action setup wizard (API can do it but PipeBoard doesn't currently wrap it)

**Meta Ads UI-only:**
- Delivery troubleshooting ("Why isn't this delivering")
- Events Manager Test Events tool and Match Quality deep view
- Business Manager partner / people / asset writes
- Instant Experiences full-canvas editor
- Creative Hub (mockups, previews, collaboration)
- Brand Safety Center / inventory filter management
- Ads Library competitor research
- Advantage+ creative diagnostic recommendations
- Shop / Commerce Manager catalog work
- Billing and payment method management

### Fallback protocol for agents

1. Try `ToolSearch` for an MCP tool that matches the request. If a tool surfaces, use it.
2. If no MCP tool exists, say plainly: "This has to be done in the [Google Ads | Meta Ads] UI. Switching to browser automation."
3. Use Chrome MCP (`mcp__Claude_in_Chrome__navigate`, `read_page`, `find`, `form_input`, `javascript_tool`) to drive the UI. For screenshots, use the `chrome-screenshot-pipeline` skill.
4. For write actions in the UI, same safety rule as MCP writes — state what is about to change, show the target, wait for explicit "yes."
5. Log the action to `ads_knowledge` (`knowledge_type: 'account_decision'`) afterward.

### What NOT to do

- Don't fabricate an MCP tool name because you think one should exist.
- Don't ask PipeBoard to add a capability mid-session — that's a separate conversation with Peterson.
- Don't automate the UI for operations that already have an MCP tool. MCP is faster and more reliable; UI is the fallback.

---

## When NOT to use this skill

- **Historical trend analysis against our warehouse** — query `meta_insights_daily` (Meta) or the Google Ads Supabase tables directly. This skill is live-pull only.
- **Full client-facing audit or analysis deliverable** — search for an active audit agent (e.g. `pretty-cool-ecom-audit-agent`, `proposal-generator-agent`) or use these connectors directly with the audit SOPs in `agent_knowledge`. This skill tells you which connector to use; the audit SOPs define the analysis methodology.
- **Authenticated screenshots of the Ads UI** — use the `chrome-screenshot-pipeline` skill.

## Citations

When presenting numbers pulled via either connector, cite the source:

- `[source: PipeBoard/Meta, act_XXXXXXXXX, last_30d]`
- `[source: Google Ads MCP, customer_id, last_30_days]`
- `[source: Supabase/google_ads_insights_daily, customer_id, date_range]` (backup pipeline)
