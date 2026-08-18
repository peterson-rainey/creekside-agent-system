---
name: ads-connector
description: "Routing reference for live ad-platform operations at Creekside Marketing — both READING data and MAKING CHANGES. The AdKit MCP (`mcp__claude_ai_AdKit__adkit_*`) is the PRIMARY connector for ALL platforms and operations — Google Ads and Meta reads, writes, and lead gen forms. PipeBoard is fully deprecated as of 2026-08-17. Backups: official Meta Ads MCP (`mcp__claude_ai_Meta_Ads__*`, free, OAuth) for Meta reads; Dashboard API → Chrome UI for Google Ads reads (see reference/google-ads-fallback.md). A read-only Google Ads Python SDK pipeline backs up historical data in Supabase. Use whenever a user or agent asks how to pull, query, read, create, update, pause, duplicate, or otherwise manage ads, ad sets, campaigns, creatives, audiences, pixels, keywords, or lead forms on either platform. Do NOT use for historical trend queries against Supabase tables (e.g. meta_insights_daily, google_ads_insights_daily) — this skill is for live, direct-from-platform operations."
---

# Ads Connector — Platform Routing

Route the caller to the correct live source for Google or Meta ads — for READS and for CHANGES. Never warehouse metrics at read time; always hit the platform live.

## Decision rule

| Platform | Primary connector | Fallback | Status |
|---|---|---|---|
| Meta / Facebook / Instagram (reads) | **AdKit** `mcp__claude_ai_AdKit__adkit_*` | Official Meta Ads MCP `mcp__claude_ai_Meta_Ads__*` (free, OAuth) | AdKit PRIMARY since 2026-08-17 (PipeBoard deprecated) |
| Meta (writes: create/update/pause) | **AdKit** `mcp__claude_ai_AdKit__adkit_*` | Official MCP has write tools too, but AdKit is proven | ACTIVE |
| Meta (lead gen forms) | **AdKit only** — no official MCP equivalent | — | ACTIVE |
| Google Ads | **AdKit — Google Ads connector** `mcp__claude_ai_AdKit__adkit_*` | **Dashboard API → Chrome UI** — full 3-tier chain in `reference/google-ads-fallback.md` (Supabase `google_ads_insights_daily` for historical only) | ACTIVE — AdKit primary since 2026-08-17 |
| Both | Call the right connector per platform, then combine | — | — |

**When to fall back to the official Meta MCP for Meta reads:**
- Any AdKit tool error — retry with the official Meta MCP before reporting failure
- Official-MCP-only bonus tools needed: anomaly signals, industry benchmarks, opportunity score, Ad Library search

**ID formats:** Meta account IDs are `act_XXXXXXXXX`. Google customer IDs are 10-digit numerics (no `act_` prefix). Do not mix them.

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

## Meta Ads — AdKit (default) + Official Meta MCP (fallback)

### Fallback: Official Meta Ads MCP (`mcp__claude_ai_Meta_Ads__*`)

Free, OAuth-based. Use when AdKit errors, or for the bonus tools below (anomaly signals, benchmarks, opportunity score, Ad Library) that AdKit doesn't have. Note: some accounts are MCP-disabled on the official side (`is_ads_mcp_enabled: false`) — those are AdKit-only.

| Official MCP Tool | Purpose |
|---|---|
| `ads_get_ad_accounts` | List accessible ad accounts (check `is_ads_mcp_enabled` and `is_queryable`) |
| `ads_get_ad_entities` | Unified query for campaigns, adsets, ads — set `level` param. Supports metrics + filtering + sorting when `date_preset` or `time_range` is provided |
| `ads_insights_performance_trend` | Performance trends with GOOD/BAD direction signals |
| `ads_get_creatives` / `ads_get_creative_ads` | Creative assets |
| `ads_get_datasets` / `ads_get_dataset_details` | Pixel / Events Manager data |
| `ads_get_ad_account_custom_audiences` / `ads_get_custom_audience` | Audience data |
| `ads_get_ad_preview` | Render ad preview |
| `ads_insights_anomaly_signal` | Anomaly detection (bonus — AdKit doesn't have this) |
| `ads_insights_industry_benchmark` | Industry benchmarks (bonus) |
| `ads_get_opportunity_score` | Optimization recommendations (bonus) |
| `ads_library_search` | Ad Library search (bonus) |

#### Standard read — campaign performance (last 30 days)

```
Tool: mcp__claude_ai_Meta_Ads__ads_get_ad_entities
Parameters:
  ad_account_id: "XXXXXXXXX"     # numeric only, no act_ prefix
  level: "campaign"
  date_preset: "last_30d"
  fields: ["id", "name", "effective_status", "amount_spent", "impressions", "clicks", "ctr", "cpc", "cpm", "reach", "frequency", "results", "cost_per_result", "actions:link_click", "actions:omni_purchase", "cost_per_action_type", "purchase_roas"]
```

**Date preset values:** `today`, `yesterday`, `this_month`, `last_month`, `this_quarter`, `last_3d`, `last_7d`, `last_14d`, `last_30d`, `last_90d`. Custom: `time_range: '{"since":"2026-01-01","until":"2026-01-31"}'`.

**Drill-down:** change `level` to `"adset"` or `"ad"`. Use `filtering` to narrow (e.g. `[{"field":"effective_status","operator":"IN","value":["ACTIVE"]}]`).

**IMPORTANT:** `ad_account_id` takes the NUMERIC ID only (e.g. `"938570599860690"`), NOT the `act_` prefixed form. Strip the `act_` prefix before calling.

### Primary: AdKit (`mcp__claude_ai_AdKit__adkit_*`)

Try AdKit first for ALL Meta operations — reads, writes, and lead gen forms.

#### Read operations

| Tool | Purpose |
|---|---|
| `get_ad_accounts` | List accessible Meta ad accounts |
| `get_campaigns` / `get_adsets` / `get_ads` | Structure data |
| `get_insights` | Performance metrics |
| `get_ad_creatives` / `get_creative_details` | Creative assets |
| `get_custom_audiences` | Audience data |
| `get_pixels` | Pixel data |
| `get_lead_gen_forms` | Lead form data (**AdKit only — no official MCP equivalent**) |

#### Write operations (confirm with user before executing)

| Tool | Purpose |
|---|---|
| `create_campaign` / `update_campaign` | Campaign management |
| `create_adset` / `update_adset` | Ad set management |
| `create_ad` / `update_ad` | Ad management |
| `create_ad_creative` / `update_ad_creative` | Creative management |
| `create_custom_audience` / `create_lookalike_audience` | Audience building |
| `upload_ad_image` / `upload_ad_video` | Asset uploads |
| `duplicate_campaign` / `duplicate_adset` / `duplicate_ad` | Duplication |
| `publish_lead_gen_draft_form` / `update_lead_gen_form_status` | Lead form management |

#### Standard AdKit `get_insights` call

```
Tool: mcp__claude_ai_AdKit__adkit_get_insights
Parameters:
  account_id: act_XXXXXXXXX      # act_ prefix required for AdKit
  date_preset: "last_30d"
  level: "campaign"
  fields: ["spend","impressions","clicks","ctr","cpc","cpm","actions","cost_per_action_type","roas","reach","frequency"]
```

---

## Google Ads via AdKit's Google Ads connector

**Connection status: SLOT-LIMITED since 2026-08.** The AdKit subscription was downgraded to a plan with **3 ad-account slots per billing cycle** (resets on the 14th). Only the 3 claimed accounts work at this tier; all other accounts get a slot-blocked refusal (error mentions `slot`, `blocked`, `over_budget`, or "upgrade"). **For slot-blocked accounts, do NOT retry — fall back immediately per `reference/google-ads-fallback.md` (Tier 2: Dashboard API `https://creekside-dashboard.up.railway.app/api/google/*`, read-only, live).** Check current slot claims with `manage_account_slots` action=view. Historical MCC context: 33 queryable accounts under MCC `5680424954`, HostSwitch (`2617643180`) outside the MCC, 11 deactivated IDs (`CUSTOMER_NOT_ENABLED`).

**Namespace:** `mcp__da1177e9-4cc5-4a06-8588-8631c91d4c03__*` (deferred — always `ToolSearch` first). Separate from the Meta AdKit namespace despite both being AdKit connectors.

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

## Known API-side gotchas (AdKit + Google Ads / Meta APIs)

Surfaced from the 2026-04-28 ad-copy-editor build (SRM 55→62 compliance run). Encode these in any agent that uses the ads MCPs.

### G1. AdKit tools have stricter validators than the underlying platform APIs

`create_google_ads_responsive_search_ad` counts the literal string `{KeyWord:fallback text}` against the 30-character headline limit and rejects, even though the Google Ads API itself only counts the fallback text. A headline like `{KeyWord:Trusted by High-Net Owners}` (36 literal chars, 26-char fallback) is valid in the API but rejected by the dedicated tool.

**Workaround:** use `execute_google_ads_mutate` with `resource_type: "adGroupAds"` directly. If that fails for the reason in G2, drop the dynamic insertion when creating, then add it back via the Google Ads UI (use the `ads-ui-navigation` skill).

### G2. execute_google_ads_mutate gets blocked by a permission heuristic on complex object payloads

Symptom: the permission preview renders the operations array as `[object Object]` and rejects the call before it reaches the API. Affects deeply-nested `responsiveSearchAd` create payloads. Does NOT affect simple text-asset creates, asset_group_asset link creates, or remove operations — those work fine.

**Workaround:** split into smaller, less-nested mutate calls; use the dedicated tool for the create and only use mutate for the remove/unlink.

### G3. All Google Ads creative resources are immutable — universal recreate-and-relink pattern

RSAs, text assets, sitelinks, callouts, structured snippets cannot be edited in place.

**To "edit" an RSA:** create a new RSA with the corrected copy via `create_google_ads_responsive_search_ad` (preserve pinned positions, ad group, status) → remove the old RSA via `execute_google_ads_mutate` resource_type=adGroupAds, operation `{remove: "customers/{cid}/adGroupAds/{ag_id}~{ad_id}"}`.

**To "edit" a text asset:** create a new text asset via `execute_google_ads_mutate` resource_type=`assets` operation `{create: {textAsset: {text: "..."}}}` → create a new asset_group_asset link at the same field_type → remove the old link (NOT the old asset; libraries cannot delete from Google Ads). The asset_group_asset resource path format is: `customers/{cid}/assetGroupAssets/{asset_group_id}~{asset_id}~{field_type}`.

Meta ad creatives behave the same way for substantive copy changes — recreate-and-pause is the platform-agnostic pattern.

### G4. REMOVED campaigns are PERMANENT read-only

Not soft-deleted. Cannot edit, pause, or modify ads inside. Always exclude from edit scope (`AND campaign.status != 'REMOVED'` in audit queries). Surface them in reports for transparency, but mark them read-only.

### G5. AdKit MCP rate-limits across all clients

Error message: `"Google Ads API platform quota exhausted on AdKit's side"`. Hit during the SRM run mid-verification. The fallback: pause and retry in 10–60 minutes, or do the action via UI if time-sensitive. Do not silently retry in a loop — that burns the rate-limit window further.

### G6. Large GAQL results write to disk, not inline

When a GAQL query result exceeds the MCP tool's inline token limit, the tool writes the JSON to a temp file and returns the file path in the error message. Do NOT try to load the file into context.

**Pattern that worked on the SRM Pmax asset_group_asset dump (1.3 MB):**
```bash
python3 -c "
import json
data = json.load(open('/path/to/result.txt'))
inner = json.loads(data[0]['text'])
results = inner['results']
matches = [r for r in results if '<TARGET STRING>' in (r.get('asset',{}).get('textAsset',{}).get('text') or '')]
for m in matches:
    print(m['asset']['id'], m['assetGroup']['name'], m.get('campaign',{}).get('name'), m['assetGroupAsset']['status'])
"
```

Use `Bash` + Python or `jq` to grep over text fields, then trace each hit to its `asset.id`, `assetGroup.id`, `campaign.name`, and status fields.

### G7. Lane-aware copy is the norm in regulated verticals, not an exception

Mortgage (Reverse Mortgage 62+ vs Home For Life 55+), dental (cosmetic vs general), healthcare, insurance, and financial accounts all have multi-product setups where the same word is correct in one product lane and wrong in another. A blind find/replace breaks legitimate copy.

**Pattern:** when the user's request involves changing copy on a multi-product account, ask for or infer lane rules in the form:
```
{
  lanes: [
    {name: "Reverse Mortgage", must_contain_any: ["FHA","HECM","Reverse Mortgage"], must_not_contain_any: ["Home For Life","H4L"], apply_change: true},
    {name: "H4L", must_contain_any: ["Home For Life","H4L"], must_not_contain_any: ["FHA","Reverse Mortgage","HECM"], apply_change: false}
  ]
}
```
Classify every match before mutating. Escalate unclassified matches to the user — never guess. The reference implementation is `ad-copy-editor-agent`.

---

## Fallback: Google Ads / Meta Ads UI (when the MCP can't do it)

**Routing principle:** try the AdKit MCP first. If the needed operation isn't in the MCP's tool surface, do it in the UI via Chrome automation. Do not invent MCP tools that don't exist.

**How to fall back:** route the task through the `chrome-screenshot-pipeline` skill (for screenshots / visual capture) or use Chrome MCP tools (`mcp__Claude_in_Chrome__*`) to navigate, read, click, and type in the authenticated Ads UI tab. Never use `screencapture`.

### Known UI-only operations (not in either AdKit connector)

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
- Conversion action setup wizard (API can do it but AdKit doesn't currently wrap it)

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
- Don't ask AdKit to add a capability mid-session — that's a separate conversation with Peterson.
- Don't automate the UI for operations that already have an MCP tool. MCP is faster and more reliable; UI is the fallback.

---

## When NOT to use this skill

- **Historical trend analysis against our warehouse** — query `meta_insights_daily` (Meta) or the Google Ads Supabase tables directly. This skill is live-pull only.
- **Full client-facing audit or analysis deliverable** — search for an active audit agent (e.g. `pretty-cool-ecom-audit-agent`, `proposal-generator-agent`) or use these connectors directly with the audit SOPs in `agent_knowledge`. This skill tells you which connector to use; the audit SOPs define the analysis methodology.
- **Authenticated screenshots of the Ads UI** — use the `chrome-screenshot-pipeline` skill.

## Citations

When presenting numbers pulled via either connector, cite the source:

- `[source: AdKit/Meta, act_XXXXXXXXX, last_30d]`
- `[source: Google Ads MCP, customer_id, last_30_days]`
- `[source: Supabase/google_ads_insights_daily, customer_id, date_range]` (backup pipeline)
