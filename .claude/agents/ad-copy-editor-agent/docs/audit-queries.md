# Step 2: Comprehensive Audit Phase (READ-ONLY)

**The audit must sweep EVERY ad surface, not just RSAs.** This was the explicit instruction from the SRM session: "audit all of the ads across all the different campaign types."

For Google Ads via PipeBoard MCP:

## 2a. Responsive Search Ads (RSAs)

```
mcp__claude_ai_Pipeboard_google__execute_google_ads_gaql_query
customer_id: {{ google_account_id_numeric }}
gaql: |
  SELECT
    campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
    ad_group.id, ad_group.name, ad_group.status,
    ad_group_ad.ad.id, ad_group_ad.ad.resource_name, ad_group_ad.status,
    ad_group_ad.ad.responsive_search_ad.headlines,
    ad_group_ad.ad.responsive_search_ad.descriptions,
    ad_group_ad.ad.responsive_search_ad.path1,
    ad_group_ad.ad.responsive_search_ad.path2,
    ad_group_ad.ad.final_urls
  FROM ad_group_ad
  WHERE ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'
    AND campaign.status != 'REMOVED'
    AND ad_group.status != 'REMOVED'
    AND ad_group_ad.status != 'REMOVED'
```

Apply `status_filter`:
- `enabled_only` -> add `AND ad_group_ad.status = 'ENABLED' AND campaign.status = 'ENABLED' AND ad_group.status = 'ENABLED'`
- `enabled_and_paused` -> omit status filters (already excluding REMOVED)
- `all` -> also include REMOVED, but mark them read-only in the report

## 2b. Expanded Text Ads (legacy, deprecated 2022 -- still queryable)

Same query shape but `ad_group_ad.ad.type = 'EXPANDED_TEXT_AD'` and select `expanded_text_ad.headline_part1/2/3`, `description`, `description2`, `path1`, `path2`.

## 2c. Call Ads

`ad_group_ad.ad.type = 'CALL_AD'`, select `call_ad.headline1/2`, `description1/2`, `business_name`, `phone_number`.

## 2d. Demand Gen Ads

```sql
WHERE campaign.advertising_channel_type = 'DEMAND_GEN'
```

Pull whatever ad subtypes exist. Demand Gen has its own asset structure -- query `ad_group_ad.ad.demand_gen_*` variants.

## 2e. Performance Max Asset Group Assets (TEXT field type)

```
gaql: |
  SELECT
    campaign.id, campaign.name, campaign.status,
    asset_group.id, asset_group.name, asset_group.status,
    asset_group_asset.asset, asset_group_asset.field_type, asset_group_asset.status,
    asset.id, asset.text_asset.text, asset.type
  FROM asset_group_asset
  WHERE asset.type = 'TEXT'
    AND asset_group.status != 'REMOVED'
    AND campaign.status != 'REMOVED'
```

**Large-result handling:** the MCP tool will write results to disk if they exceed the inline token limit. The error message includes the file path. When this happens:

```bash
python3 -c "
import json, re
with open('<path-from-error-message>') as f:
    data = json.load(f)
matches = []
for row in data:
    text = row.get('asset', {}).get('text_asset', {}).get('text', '')
    if re.search(r'{{ find_text_regex }}', text, re.IGNORECASE):
        matches.append({
          'asset_id': row['asset']['id'],
          'asset_group': row['assetGroup']['name'],
          'campaign': row['campaign']['name'],
          'campaign_status': row['campaign']['status'],
          'asset_group_status': row['assetGroup']['status'],
          'link_status': row['assetGroupAsset']['status'],
          'field_type': row['assetGroupAsset']['fieldType'],
          'text': text
        })
print(json.dumps(matches, indent=2))
"
```

Then trace each match to its `asset_id`, `asset_group`, `campaign`, and `status`.

## 2f. Asset Library -- Catches Orphan Assets

```
gaql: |
  SELECT asset.id, asset.text_asset.text, asset.type, asset.resource_name
  FROM asset
  WHERE asset.type = 'TEXT'
```

Cross-reference with the `asset_group_asset` results. Any asset present in the library but not in any active link is an **orphan** -- Google Ads does not allow deleting these. Report them as "library orphans, no active link" -- do not try to delete.

## 2g. Sitelinks, Callouts, Structured Snippets

Each is a separate asset type. Query by `asset.type`:
- Sitelinks -> `asset.type = 'SITELINK'`, fields under `asset.sitelink_asset.*` (`link_text`, `description1`, `description2`, `final_urls`)
- Callouts -> `asset.type = 'CALLOUT'`, field under `asset.callout_asset.callout_text`
- Structured snippets -> `asset.type = 'STRUCTURED_SNIPPET'`, fields `header`, `values[]`

Then query the link tables to find where each asset is wired in:

```
gaql: |
  SELECT customer_asset.asset, customer_asset.status FROM customer_asset
gaql: |
  SELECT campaign_asset.campaign, campaign_asset.asset, campaign_asset.status, campaign_asset.field_type FROM campaign_asset
gaql: |
  SELECT ad_group_asset.ad_group, ad_group_asset.asset, ad_group_asset.status FROM ad_group_asset
```

Cross-reference asset_id -> these link rows to determine where each match is actually serving.

## 2h. Meta Ads (when platform=meta_ads or both)

Use PipeBoard MCP:
- `get_ads` per account -> list all ads
- `get_ad_creatives` + `get_creative_details` per ad -> headline/body/description/CTA copy
- Filter by status (use `effective_status` for "actually serving" determination)

For Meta find/replace, the immutable rule is similar: Meta ad creatives are not directly edited -- you create a new ad with the new creative, pause/delete the old one.
