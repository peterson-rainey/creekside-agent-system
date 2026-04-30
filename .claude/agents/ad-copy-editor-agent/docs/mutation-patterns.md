# Step 5: Execute Mutations (Snapshot-Before / Verify-After)

For every change row with `action: API ...`:

## 5a. Snapshot the before-state

Re-query the specific ad/asset (not from cached audit data -- always re-pull immediately before mutating). Capture exact text, status, and resource_name. Store in memory.

## 5b. Execute the mutation

### RSAs are immutable -- recreate + remove

RSAs cannot be edited in place. Workflow:

1. **Create new RSA** with the updated headlines/descriptions/paths/final_urls. Preserve everything else from the original (pinned positions, ad group, status). Use:
   ```
   mcp__claude_ai_Pipeboard_google__create_google_ads_responsive_search_ad
   customer_id: {{ cid }}
   ad_group_id: {{ ag_id }}
   headlines: [{text, pinned_position}]
   descriptions: [{text, pinned_position}]
   path1: ...
   path2: ...
   final_urls: [...]
   status: <match original ad's status>
   ```

   **Gotcha A -- PipeBoard's stricter character validator:** the dedicated tool counts dynamic-insertion `{KeyWord:fallback text}` literally (the whole `{KeyWord:...}` token), not the fallback-only length the actual Google Ads API uses. If a headline with dynamic insertion gets rejected for "exceeds 30 chars" but the fallback is <=30 chars:
   - Try `execute_google_ads_mutate` with `resource_type: "adGroupAds"` and the full operation payload -- this hits the API directly.
   - **Gotcha A.2:** the mutate path can be blocked by a permission heuristic that rejects "complex object payloads" (returns `[object Object]`). If that happens:
     - Drop the dynamic insertion when creating via the dedicated tool.
     - Add the dynamic insertion back via the Google Ads UI after creation. See Step 5c.
   - Log the path used (`dedicated`, `mutate-direct`, `dedicated-then-ui-restore`) in the per-change record.

2. **Preserve pinning.** When recreating, pinning fields from the original RSA must be set. `pinned_position` in the dedicated tool, or `pinnedField: 'HEADLINE_1' | 'HEADLINE_2' | ...` in the mutate payload.

3. **Remove the old RSA** via:
   ```
   mcp__claude_ai_Pipeboard_google__execute_google_ads_mutate
   resource_type: adGroupAds
   operations: [{ remove: "customers/{{ cid }}/adGroupAds/{{ AG_ID }}~{{ AD_ID }}" }]
   ```

### Text assets are immutable -- recreate + relink

Workflow for a PMax text asset (or any text asset linked via `asset_group_asset`, `campaign_asset`, `ad_group_asset`, or `customer_asset`):

1. **Create the new text asset:**
   ```
   execute_google_ads_mutate
   resource_type: assets
   operations: [{ create: { textAsset: { text: "{{ replace_text_full_field }}" } } }]
   ```
   The response returns the new asset's resource_name `customers/{cid}/assets/{new_asset_id}`.

2. **Create the new link** to the same parent with the same `field_type` (e.g., `HEADLINE`, `DESCRIPTION`, `LONG_HEADLINE`, `BUSINESS_NAME`). Asset-group-asset resource path:
   ```
   customers/{cid}/assetGroupAssets/{asset_group_id}~{new_asset_id}~{field_type}
   ```

3. **Remove the old link** (NOT the old asset itself):
   ```
   execute_google_ads_mutate
   resource_type: assetGroupAssets   (or campaignAssets, adGroupAssets, customerAssets)
   operations: [{ remove: "customers/{cid}/assetGroupAssets/{old_link_path}" }]
   ```

### Sitelinks, callouts, structured snippets

Same recreate-and-relink pattern. Each has its own typed field on `asset`:
- Sitelink: `asset.sitelink_asset` with `link_text`, `description1`, `description2`, `final_urls`
- Callout: `asset.callout_asset.callout_text`
- Structured snippet: `asset.structured_snippet_asset` with `header` and `values[]`

### Meta Ads (when extended)

Meta ad creatives are effectively immutable for substantive copy changes -- create a new ad with the updated creative and pause/delete the old one. Always state this is the path before executing.

## 5c. UI Fallback (`change_path: ui`)

Use `ads-ui-navigation` skill. Known gotchas:

- **Gotcha B -- Saved-view scope hides paused.** The default saved-view may filter out ads in paused campaigns. Open the saved-view dropdown, click Campaign status filter, ensure "Paused" is checked.
- **Gotcha C -- "Last 30 days" excludes today.** A freshly-created ad won't appear. Switch to "All time" or change end date to today.
- **Gotcha D -- Save can trigger 2FA.** STOP. Tell the user to complete 2FA, then re-click Save.
- **Gotcha E -- Removed campaigns are read-only.** Skip and surface.
- **Gotcha F -- Headline link opens the LANDING PAGE, not the editor.** To edit: click "View asset details" -> pencil/edit icon.
- **Gotcha G -- "View asset details" can navigate to a DIFFERENT ad.** Always verify `adId` and `entityId` in the URL.
- **Gotcha H -- Large GAQL results get written to disk.** Use Python/jq on the file to extract matches.
- **Gotcha I -- "Status: Pending" is normal on a new ad.** Google's review process. Not a problem.

For UI navigation patterns: defer to the `ads-ui-navigation` skill.

## 5d. Verify-after for every change

1. Re-query the specific resource to confirm it reads back the expected text.
2. Re-query the old resource -- confirm it no longer appears in the active set.
3. Mark the change row:
   - ✅ if before/after both verify
   - ⚠️ if mutation succeeded but verification is partial (e.g., "Pending review")
   - ❌ if mutation failed -- STOP the run, do not continue until the failure is understood.

**Hard rule:** if any single mutation fails verification, halt the batch. Report the failure, the partial state, and ask the user how to proceed.
