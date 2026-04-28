# Meta Ads Tool Reference

Confirmed tool surface under `mcp__claude_ai_PipeBoard__*` (Sonnet agents with pre-declared tools) or `mcp__748a69c8-a69a-40cc-97fb-98bd2c007663__*` (deferred via `ToolSearch`).

## Read operations

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

## Write operations (confirm with user before executing)

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

## Bulk (Premium tier)

`bulk_create_ads`, `bulk_update_ads`, `bulk_update_campaigns`, `bulk_update_adsets`, `bulk_create_ad_creatives`, `bulk_upload_ad_images`, `bulk_upload_ad_videos`, `bulk_get_insights`, `bulk_get_ad_creatives`, `bulk_search_interests`. Default batch cap is 20; can raise to 200 with explicit user confirmation.

## Standard `get_insights` call

```
Tool: get_insights
Parameters:
  account_id: act_XXXXXXXXX      # from find_client()
  date_preset: "last_30d"
  level: "campaign"
  fields: ["spend","impressions","clicks","ctr","cpc","cpm","actions","cost_per_action_type","roas","reach","frequency"]
```

**Date preset values:** `last_7d`, `last_30d`, `last_quarter`, `this_month`, `last_month`. Custom: `time_range: {"since": "2026-01-01", "until": "2026-01-31"}`.

**Drill-down:** switch `level` to `"adset"` or `"ad"` and re-run, or chain `get_adsets` -> `get_ads` -> `get_ad_details` -> `get_ad_creatives`.

## Targeting & sizing

`search_interests` / `search_behaviors` / `search_demographics` / `search_geo_locations` / `estimate_audience_size` / `search_pages_by_name`.
