# Meta Ads Tool Reference

## Primary: Official Meta Ads MCP (`mcp__claude_ai_Meta_Ads__*`)

Default for all Meta read operations. Free, OAuth-based. Try these first.

### Read operations

| Tool | Purpose | Notes |
|---|---|---|
| `ads_get_ad_accounts` | List accessible ad accounts | Check `is_ads_mcp_enabled` before querying |
| `ads_get_ad_entities` | Campaigns, adsets, ads — unified query with `level` param | Supports metrics when `date_preset` or `time_range` provided |
| `ads_insights_performance_trend` | Performance trends with direction signals | Bonus: not in PipeBoard |
| `ads_insights_anomaly_signal` | Anomaly detection | Bonus |
| `ads_insights_industry_benchmark` | Industry benchmarks | Bonus |
| `ads_insights_auction_ranking_benchmarks` | Auction ranking vs competitors | Bonus |
| `ads_get_opportunity_score` | Optimization recommendations | Bonus |
| `ads_get_creatives` / `ads_get_creative_ads` | Creative assets | |
| `ads_get_datasets` / `ads_get_dataset_details` / `ads_get_dataset_quality` | Pixel / Events Manager | |
| `ads_get_ad_account_custom_audiences` / `ads_get_custom_audience` | Audience data | |
| `ads_get_ad_preview` | Render ad preview | |
| `ads_get_ad_images` / `ads_get_ad_videos` | Media assets | |
| `ads_get_customconversions` | Custom conversion events | |
| `ads_get_ig_accounts` / `ads_get_ig_media` | Instagram data | |
| `ads_library_search` | Ad Library search | |
| `ads_account_get_activity_logs` | Activity history | |
| `ads_get_field_context` | Field documentation (call before `ads_get_ad_entities` to verify fields) | |

### Write operations

| Tool | Purpose |
|---|---|
| `ads_create_campaign` | Create campaign |
| `ads_create_ad_set` | Create ad set |
| `ads_create_ad` | Create ad |
| `ads_create_creative` | Create creative |
| `ads_update_entity` | Update any entity (campaign, adset, ad) |
| `ads_activate_entity` | Activate/pause entity |
| `ads_create_custom_audience` / `ads_update_custom_audience` / `ads_delete_custom_audience` | Audience management |
| `ads_boost_ig_post` | Boost Instagram post |

### Standard read — campaign performance

```
Tool: mcp__claude_ai_Meta_Ads__ads_get_ad_entities
Parameters:
  ad_account_id: "XXXXXXXXX"     # NUMERIC ONLY — strip act_ prefix
  level: "campaign"
  date_preset: "last_30d"
  fields: ["id", "name", "effective_status", "amount_spent", "impressions", "clicks", "ctr", "cpc", "cpm", "reach", "frequency", "results", "cost_per_result"]
```

**IMPORTANT:** `ad_account_id` takes NUMERIC ID only (e.g. `"938570599860690"`), NOT `act_938570599860690`.

**Date presets:** `today`, `yesterday`, `this_month`, `last_month`, `this_quarter`, `last_3d`, `last_7d`, `last_14d`, `last_30d`, `last_90d`, `last_week_sun_sat`, `last_quarter`, `last_year`, `this_year`, `maximum`.

**Custom range:** `time_range: '{"since":"2026-01-01","until":"2026-01-31"}'`

**Drill-down:** change `level` to `"adset"` or `"ad"`. Use `filtering` for status filters.

---

## Fallback: PipeBoard (`mcp__claude_ai_PipeBoard__*`)

Use when official MCP returns errors, for MCP-disabled accounts, lead gen forms, and as a write fallback.

### PipeBoard-only operations (no official MCP equivalent)

| Tool | Purpose |
|---|---|
| `get_lead_gen_forms` | Lead form data |

### Read operations (fallback)

| Tool | Purpose |
|---|---|
| `get_ad_accounts` | List accounts |
| `get_campaigns` / `get_adsets` / `get_ads` | Structure data |
| `get_insights` | Performance metrics |
| `get_ad_creatives` / `get_creative_details` | Creative assets |
| `get_custom_audiences` | Audience data |
| `get_pixels` | Pixel data |

### Standard PipeBoard `get_insights` (fallback)

```
Tool: mcp__claude_ai_PipeBoard__get_insights
Parameters:
  account_id: act_XXXXXXXXX      # act_ prefix REQUIRED for PipeBoard
  date_preset: "last_30d"
  level: "campaign"
  fields: ["spend","impressions","clicks","ctr","cpc","cpm","actions","cost_per_action_type","roas","reach","frequency"]
```
