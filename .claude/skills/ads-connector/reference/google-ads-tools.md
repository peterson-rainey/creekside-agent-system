# Google Ads Tool Reference

**Connection status: VERIFIED LIVE as of 2026-04-23.** `list_google_ads_customers` returned 33 queryable Creekside accounts under MCC `5680424954` (Creekside Marketing). One account (`2617643180` -- HostSwitch) is accessible but not under the MCC. 11 additional IDs are deactivated (`CUSTOMER_NOT_ENABLED`).

**Namespace:** `mcp__claude_ai_Pipeboard_google__*` (pre-declared) or `mcp__da1177e9-4cc5-4a06-8588-8631c91d4c03__*` (deferred via `ToolSearch`).

**Customer ID format:** 10-digit numeric (e.g. `9133281551`). No `act_` prefix. MCC manager ID is separate.

**Metrics gate:** `list_google_ads_customers` returns a `can_query_metrics` flag. MCC accounts return `false` -- do NOT call metrics tools on them directly.

## Read operations

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

## Write operations (confirm with user before executing)

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

## Standard read -- account list

```
Tool: list_google_ads_customers
Parameters: (none)
Returns: customers[] with id, name, currency, time_zone, can_query_metrics, manager_customer_id
```

## Standard read -- campaign performance via GAQL

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

## MCC / permission errors

If a write call returns `USER_PERMISSION_DENIED`, re-run `list_google_ads_customers` to refresh the server's MCC mapping, then retry. The MCP resolves `login-customer-id` automatically from that mapping.
