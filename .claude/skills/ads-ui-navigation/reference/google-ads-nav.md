# Google Ads Navigation Reference

## URL reference (prefix: `https://ads.google.com`)

Placeholders: `{CID}` = 10-digit customer ID (no dashes), `{FROM}`/`{TO}` = `YYYY-MM-DD`.

### Core
- `/aw/overview?ocid={CID}` -- account summary
- `/aw/campaigns?ocid={CID}` -- campaign list
- `/aw/adgroups?ocid={CID}` -- ad group list
- `/aw/keywords/keywords?ocid={CID}` -- keyword list
- `/aw/keywords/searchterms?ocid={CID}` -- search terms report
- `/aw/keywords/negative?ocid={CID}` -- negative keywords
- `/aw/ads?ocid={CID}` -- ad list
- `/aw/assets?ocid={CID}` -- assets/extensions

### Targeting
- `/aw/audiences?ocid={CID}` -- audience manager
- `/aw/locations?ocid={CID}` -- location targeting
- `/aw/demographics?ocid={CID}` -- demographics

### Measurement
- `/aw/conversions/detail?ocid={CID}` -- conversion actions
- `/aw/conversions/diagnostics?ocid={CID}` -- conversion diagnostics
- `/aw/linkedaccounts?ocid={CID}` -- linked accounts (GA4, GMC, YouTube)
- `/aw/attribution?ocid={CID}` -- attribution reports

### Account admin
- `/aw/accountsettings?ocid={CID}` -- account-level settings
- `/aw/users?ocid={CID}` -- user management
- `/aw/billing?ocid={CID}` -- billing
- `/aw/policymanager?ocid={CID}` -- policy violations
- `/aw/changehistory?ocid={CID}` -- change history
- `/aw/recommendations?ocid={CID}` -- recommendations (UI-only territory)

### Reports / insights (mostly UI-only)
- `/aw/reports?ocid={CID}` -- custom reports
- `/aw/auctioninsights?ocid={CID}` -- auction insights
- `/aw/experiments?ocid={CID}` -- experiments/drafts
- `/aw/insights?ocid={CID}` -- insights page (demand forecasting, attribution viz)

### Date range URL params
`&dateRange=LAST_7_DAYS | LAST_30_DAYS | LAST_90_DAYS | THIS_MONTH`. Not every report honors URL-based date hacking -- if the displayed range doesn't match, fall back to UI click on the picker.

## Authentication state detection

### Logged-in signals
- URL contains `ads.google.com/aw/`
- Page text contains account ID pattern `XXX-XXX-XXXX`, or "Campaigns", "Ad groups", "Overview"
- Top-left shows an account name + ID (e.g., "Aura Displays 786-090-2494")

### Logged-out signals
- URL contains `accounts.google.com` or redirects to sign-in
- Page text contains "Sign in", "Choose an account"
- Page text contains "Add an account", "Use another account"

## Account switching

Agents often land on Chrome already signed in to a different Creekside account than the target client. Check current account state before navigating deep -- the URL's `ocid` param is authoritative.

1. Navigate to `https://ads.google.com/nav/selectaccount?dst=/aw/overview` (account switcher page).
2. Use `read_page` to list visible `menuitem` rows (each shows account name + dashed ID).
3. Use the menuitem snippet in the DOM cookbook -- match against the canonical name AND the dashed-format account ID (both must match; name alone can be ambiguous across multi-brand clients).
4. Click the menuitem. Wait `cold_settle_ms` (15000) for the new account's shell to load.
5. Verify: re-read the page; confirm the top bar shows the target account's name + ID. If it doesn't, STOP and report -- do not retry blindly.

If you can't locate the account selector via `read_page`, fall back to navigating directly: `https://ads.google.com/aw/overview?ocid=<numeric>` (the `ocid` forces the account context on most pages).

## Access model

**Google Ads: single MCC.** Every Creekside client's Google Ads account lives under the **Creekside MCC (`568-042-4954`, "Creekside Marketing")**. If `find_client()` returns a `google_account_ids[]` entry, expect it to be accessible through the MCC when signed in as `peterson@creeksidemarketingpros.com`. This makes account switching predictable -- the menuitem always exists under one parent.

## Loading behavior

- **Unreliable state:** animated "A" splash overlay that persists after `readyState=complete`.
- **Splash selectors:** `svg.la-b`, `svg.la-g`, `svg.la-b-t` (already checked by `ready_check.js`).
- **Settle:** 10-15s on first cold navigate. Expect 1-2 retries on ~50% of heavy pages.

## Recommendations -- general pattern

`/aw/recommendations?ocid={CID}` is UI-only territory for most apply/dismiss actions. The skill does not hardcode selectors because the layout changes -- use the discovery pattern:

1. Navigate and run `ready_check.js` (this is a heavy SPA -- expect 10-15s cold settle).
2. Use `read_page` to list visible recommendations. Each typically shows a title ("Add N new keywords", "Try a new bidding strategy"), an impact estimate, and action buttons.
3. To find a specific recommendation: text-match against the title via `javascript_tool`.
4. To apply: locate the "Apply" button WITHIN the matched card's DOM subtree (scoped, not global) and click. Apply the snapshot-before / verify-after rule from the write-safety section.
5. **Success signal:** after clicking Apply, the recommendation typically disappears from the list and a toast appears. Verify BOTH: re-read `/aw/recommendations` and confirm the title no longer appears. If it still appears, assume failure -- surface to user.
6. To dismiss: same pattern, locate the "Dismiss" / "X" / overflow-menu control within the card.

If a recommendation requires a multi-step modal (e.g., "Review the new keywords before adding"), stop at the modal, summarize what the platform is about to do, and wait for explicit user confirmation before clicking through.
