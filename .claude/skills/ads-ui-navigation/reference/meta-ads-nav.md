# Meta Ads Manager Navigation Reference

## URL reference (prefix: `https://adsmanager.facebook.com`)

Placeholders: `{ACT}` = `act_XXXXXXXXX`.

### Core
- `/adsmanager/manage/campaigns?act={ACT}` -- campaign list
- `/adsmanager/manage/adsets?act={ACT}` -- ad set list
- `/adsmanager/manage/ads?act={ACT}` -- ad list
- `/adsmanager/audiences?act={ACT}` -- audience manager (different app shell -- cold load shows full-viewport spinner)

### Business & delivery
- `https://business.facebook.com/settings?business_id=<bid>` -- Business Manager settings
- `https://business.facebook.com/events_manager2/list/pixel?business_id=<bid>` -- Events Manager
- `/adsmanager/insights?act={ACT}` -- Advantage+ insights / creative diagnostic (NOT for delivery troubleshooting)

**Delivery troubleshooting is NOT a separate URL.** On `/adsmanager/manage/campaigns?act={ACT}`, the "Delivery" column shows each campaign's status (Active, Learning, In review, Not delivering, etc.). To get the reason a campaign isn't delivering, click the status badge on the row -- it opens an in-page side panel with diagnostic messages. To find the badge via DOM: look in the campaign row for the element whose text matches the delivery status, then use `javascript_tool` to click it. Do NOT navigate to `/insights` expecting delivery errors -- that URL is for Advantage+ creative performance.

Date range in Meta UI is URL-managed via `date=<preset>` or the in-page picker; prefer the picker for any non-standard range.

## Authentication state detection

### Logged-in signals
- URL contains `adsmanager.facebook.com/adsmanager/` or `business.facebook.com/`
- Page text contains "Campaigns", "Ad sets", "Ads" in the top nav
- Account selector visible top-left

### Logged-out signals
- URL contains `facebook.com/login` or `m.facebook.com/login`
- Page text contains "Log in to Facebook", "Create account"
- Page text contains "Forgot password"

## Account switching

1. On any `/adsmanager/*` page, the account selector dropdown lives top-left. Find it via `read_page` (accessibility tree usually labels it "Ad account" or shows the current account).
2. Click it, then match the target `act_XXXXXXXXX` in the dropdown list via `javascript_tool` text match.
3. Wait 5s for the shell to reload against the new account.
4. Verify: confirm the URL's `act=` parameter matches the target.

If you can't locate the account selector via `read_page`, fall back to navigating directly: append `?act=act_XXXXXXXXX` to any `/adsmanager/manage/*` URL.

## Access model

**Meta Ads: mixed access model.** Creekside does NOT have a single unified business-manager holding every client account. Some client Meta accounts are owned by / shared with the Creekside Business Manager; others are shared directly to **Peterson's personal Facebook account** (not the business). Practical consequences:

- **`business.facebook.com/settings?business_id=<bid>`** URLs only work for accounts actually inside the business manager. For personally-shared accounts, there is no business-manager settings page -- go through `adsmanager.facebook.com` with the `act=` query param instead.
- **The Meta account selector** in `adsmanager.facebook.com` shows BOTH business-owned accounts AND accounts personally shared to Peterson, mixed together. Don't assume the selector list is scoped to one business.
- **For partner / permission writes on personally-shared accounts**, Business Manager is irrelevant. Those permissions are managed via the account's own Settings page at `adsmanager.facebook.com/adsmanager/manage/accounts` (click the account, then "Permissions").
- **When resolving a client Meta account**, don't try to infer its business-manager status from the account ID alone. Check `act_XXXXXXXXX` presence in `find_client()`'s `meta_account_ids[]` and navigate via `adsmanager.facebook.com/adsmanager/manage/campaigns?act=act_XXXXXXXXX` -- that URL works regardless of access path.

If a Meta operation fails with a permission error and the account is personally-shared, do not redirect the agent through Business Manager -- surface the permission issue to the user and ask whether to proceed under the personal-share context or add the account to the business.

## Loading behavior

### `/manage/*` (campaigns, adsets, ads)
- **Unreliable state:** skeleton top-bar on cold load. Data table renders first, top-bar mounts 2-3s later.
- **Ready signal:** visible button matching `/Review and publish|Updated|Create a view/`.
- **Cold settle:** 5s. Warm route changes: 1-2s (client-side router is fast once the shell is mounted).

### `/audiences`
- **Unreliable state:** full-viewport spinner overlay on cold load.
- **Ready signal:** visible `Create audience` button.
- **Cold settle:** 5s. Different app shell -- do NOT rely on `/manage/*` selectors here.
