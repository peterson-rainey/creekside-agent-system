---
name: ads-ui-navigation
description: "Reliable navigation of the live Google Ads and Meta Ads Manager UIs via Claude in Chrome. Use when an agent needs to read or modify something in the ad-platform UI that the PipeBoard MCP connectors don't expose (recommendations tab, asset strength ratings, Insights tab, delivery troubleshooting, policy detail, billing, Business Manager writes, etc.). Handles OAuth / login state detection, the Google Ads splash + Meta skeleton/spinner animation blind spots, client-side routing, ad-blocker blockers, tab lifecycle, and the navigate+action race condition. Read-only by default — any UI write requires explicit user confirmation. Pairs with ads-connector (MCP-first routing) and chrome-screenshot-pipeline (screenshot capture). Do NOT use for screenshots (use chrome-screenshot-pipeline) or for things PipeBoard already does (use ads-connector)."
---

# Ads UI Navigation

Reliable, error-tolerant navigation of the Google Ads and Meta Ads Manager UIs via `mcp__Claude_in_Chrome__*`. Built from the same foundations as `chrome-screenshot-pipeline`, plus every lesson we learned from the deprecated `google-ads-chrome-agent` and the e-commerce audit navigation SOP.

## When to use this skill

- An ad agent needs something from the UI that isn't in PipeBoard's MCP surface (Recommendations apply/dismiss, Insights tab, asset strength ratings, policy detail, Meta delivery troubleshooting, Events Manager test tool, Business Manager writes, billing, etc. — see `ads-connector` skill for the full list).
- An agent needs to read a page an MCP tool doesn't expose (PMax asset insights, Shopping product-group hierarchy, Change history with field-level detail).
- An agent needs to perform a UI write action a user authorized (pause a campaign via the UI, apply a recommendation).

## When NOT to use this skill

- **Anything PipeBoard MCP can do** — always try `ads-connector` first. UI is slower and fragile.
- **Screenshots** — use `chrome-screenshot-pipeline`. This skill navigates; that one captures.
- **Data pulls that exist in Supabase** — query the warehouse instead of scraping the UI.
- **Login / 2FA / CAPTCHA** — this skill does NOT handle auth. Stop and ask the user.
- **Server-side / Railway cron** — no Chrome is open there. Use Playwright with stored state instead.

## The non-negotiable rules

1. **Never attempt login or 2FA.** If the page shows `Sign in`, `Choose an account`, `accounts.google.com`, `m.facebook.com/login`, or a 2FA prompt — STOP, tell the user, and wait.
2. **Never batch navigate + [read|click|js] in a single parallel tool-call message.** They race. The action runs against the previous page. Sequential messages only.
3. **Never trust a single state check on a heavy SPA.** Google Ads renders a splash overlay AFTER `readyState=complete`. Meta /audiences renders a full-viewport spinner. Wait + re-check.
4. **Never dismiss CAPTCHAs, bot challenges, or ad-blocker blockers with scripting.** Report them and stop.
5. **Never fabricate selectors.** If `read_page` / `get_page_text` don't surface the element, don't invent one — escalate.
6. **Writes require explicit "yes" from the user.** State the action + target + params, wait for confirmation, then execute. Log to `ads_knowledge` (`knowledge_type: 'account_decision'`) afterward.

## Tool surface — use `mcp__Claude_in_Chrome__*` only

Do NOT mix in `Control_Chrome` or `Claude_Preview` — one MCP only. Claude in Chrome is the supported path.

| Tool | Use for |
|---|---|
| `navigate` | Change URL in the active tab |
| `tabs_create_mcp` | Open a new tab in the session's tab group (preferred over navigate when you want isolation) |
| `tabs_context_mcp` | List tabs in the session group |
| `tabs_close_mcp` | Close a tab (sequential, error-tolerant — see Teardown) |
| `get_page_text` | **Primary** text extraction — plain text of visible DOM |
| `read_page` | Accessibility tree — required for Angular/Material dynamic tables (Merchant Center, parts of Google Ads) |
| `find` | Selector-based element lookup |
| `javascript_tool` | **Last resort** — inject JS for direct DOM queries, button clicks text-match, tab activation |
| `form_input` | Fill form fields |
| `read_console_messages` | Diagnose what broke if a page doesn't render |
| `computer` | Mouse / keyboard primitives (prefer the higher-level tools) |

**Read order when extracting data:** `get_page_text` → `read_page` → `javascript_tool`. Stop at the first one that works.

**Decision rule (skip ahead when appropriate):**
- **Structured table data** (Google Ads performance table, Meta ad set grid, Merchant Center dynamic tables) → go straight to `read_page` (accessibility tree preserves row/cell structure that `get_page_text` flattens).
- **Plain visible text or status badge** → `get_page_text` is enough.
- **Need to interact with a specific element** (click, fill, read an attribute) → `javascript_tool` — but only after you've located the element in the accessibility tree or visible text. Do not query blindly.

## Discovery-first, escalation-second

**This skill deliberately does NOT document every DOM selector for every task.** UI selectors drift — a skill full of hardcoded selectors would silently rot. Instead, agents follow a discovery pattern:

1. **Land on the right page** (via URL reference below) and run `ready_check.js`.
2. **Inspect the live DOM** via `get_page_text` or `read_page` to find the target element.
3. **Build the selector from what you actually see** — text match, ARIA role, visible label. Never from assumption.
4. **If you can't find the element after a genuine attempt** (both read tools fail, or the element doesn't match any obvious pattern), STOP and surface the problem:
   > "I navigated to `<URL>` but couldn't locate the [action] control via `get_page_text` or `read_page`. The layout may have changed. Can you describe where it is in the UI, or should I escalate to Peterson?"
5. **Never fabricate a selector** because "it should be there." Rule 5 is absolute.

**Saving discoveries:** when an agent successfully discovers a non-obvious selector (especially for a write action), write it to `agent_knowledge` with tags `['google-ads'|'meta-ads', 'ui-path', 'selector']` so the next agent doesn't re-discover. Include the full JS snippet that worked and the date.

## The navigate-then-wait-then-act pattern

This is the central pattern. Every UI interaction follows it.

### Step 1 — Verify tab and login state (once per session)

Before ANY navigation, confirm Chrome is responding and the user is logged in.

```
tabs_context_mcp  (no args)
```

If no tab group exists, create one:
```
tabs_create_mcp  createIfEmpty: true  url: <target>
```

### Step 2 — Navigate to a URL (its own message)

```
navigate  tabId: <id>  url: https://ads.google.com/aw/overview?ocid=<customer_id>
```

### Step 3 — Wait for the page to settle, then probe readiness

The deterministic ready-check lives in the screenshot pipeline. Reuse it:

**Inject** `/Users/petersonrainey/scripts/screenshot_pipeline/ready_check.js` via `javascript_tool`. The IIFE returns:

```json
{
  "app": "google-ads" | "meta-ads-manage" | "meta-ads-audiences" | "generic",
  "ready": true | false,
  "reason": "...",
  "ready_signal": "...",
  "cold_settle_ms": 15000,
  "warm_settle_ms": 3000,
  "max_retries": 3,
  "retry_wait_ms": 5000
}
```

**Pattern:**
1. Navigate
2. Wait `cold_settle_ms` on first navigate to a fresh tab (use `5000` as a conservative default until you have a ready_check result)
3. Inject `ready_check.js`
4. If `ready=false` → wait `retry_wait_ms`, re-inject, up to `max_retries`
5. If `ready=true` → proceed to Step 4

Client-side routing (within Ads Manager, within Google Ads) after the first cold load is near-instant — use `warm_settle_ms` (1-3s) for subsequent route changes, not the full cold settle.

### Step 4 — Read or act (separate message, no parallelism)

```
get_page_text  tabId: <id>
```
or
```
javascript_tool  tabId: <id>  code: "<dom query>"
```

For write actions (click, fill form): single tool message per action.

### Step 5 — Verify the action took effect

After any write, re-read the page and confirm the target state is reflected. Don't assume a click landed just because the tool returned success.

## Authentication state detection

Before any work, verify the user is logged in. Scan the page text for these signals.

### Google Ads logged-in signals

- URL contains `ads.google.com/aw/`
- Page text contains account ID pattern `XXX-XXX-XXXX`, or "Campaigns", "Ad groups", "Overview"
- Top-left shows an account name + ID (e.g., "Aura Displays 786-090-2494")

### Google Ads logged-out signals

- URL contains `accounts.google.com` or redirects to sign-in
- Page text contains "Sign in", "Choose an account"
- Page text contains "Add an account", "Use another account"

### Meta Ads Manager logged-in signals

- URL contains `adsmanager.facebook.com/adsmanager/` or `business.facebook.com/`
- Page text contains "Campaigns", "Ad sets", "Ads" in the top nav
- Account selector visible top-left

### Meta Ads Manager logged-out signals

- URL contains `facebook.com/login` or `m.facebook.com/login`
- Page text contains "Log in to Facebook", "Create account"
- Page text contains "Forgot password"

**If logged out** — stop immediately. Report:
> "[Google Ads | Meta Ads Manager] is not showing a logged-in session. Please log in to [platform] in Chrome and then re-run this task. I cannot handle login or 2FA — that must be done manually."

Do NOT attempt to fill credentials. Do NOT try to click past an `accounts.google.com` redirect.

## Account resolution (MANDATORY)

Never hardcode account IDs. Always resolve via `find_client()`.

```sql
SELECT * FROM find_client('<name>');
```

- Google: `google_account_ids[]` — 10-digit numerics, e.g. `7860902494`. Format for UI display as `786-090-2494`.
- Meta: `meta_account_ids[]` — `act_XXXXXXXXX`.

### Access model — Google vs Meta (important)

**Google Ads: single MCC.** Every Creekside client's Google Ads account lives under the **Creekside MCC (`568-042-4954`, "Creekside Marketing")**. If `find_client()` returns a `google_account_ids[]` entry, expect it to be accessible through the MCC when signed in as `peterson@creeksidemarketingpros.com`. This makes account switching predictable — the menuitem always exists under one parent.

**Meta Ads: mixed access model.** Creekside does NOT have a single unified business-manager holding every client account. Some client Meta accounts are owned by / shared with the Creekside Business Manager; others are shared directly to **Peterson's personal Facebook account** (not the business). This has practical consequences for UI navigation:

- **`business.facebook.com/settings?business_id=<bid>`** URLs only work for accounts actually inside the business manager. For personally-shared accounts, there is no business-manager settings page — go through `adsmanager.facebook.com` with the `act=` query param instead.
- **The Meta account selector** in `adsmanager.facebook.com` shows BOTH business-owned accounts AND accounts personally shared to Peterson, mixed together. Don't assume the selector list is scoped to one business.
- **For partner / permission writes on personally-shared accounts**, Business Manager is irrelevant. Those permissions are managed via the account's own Settings page at `adsmanager.facebook.com/adsmanager/manage/accounts` (click the account, then "Permissions").
- **When resolving a client Meta account**, don't try to infer its business-manager status from the account ID alone. Check `act_XXXXXXXXX` presence in `find_client()`'s `meta_account_ids[]` and navigate via `adsmanager.facebook.com/adsmanager/manage/campaigns?act=act_XXXXXXXXX` — that URL works regardless of access path.

If a Meta operation fails with a permission error and the account is personally-shared, do not redirect the agent through Business Manager — surface the permission issue to the user and ask whether to proceed under the personal-share context or add the account to the business.

If the array is empty:
- Google → navigate `https://ads.google.com/nav/selectaccount?dst=/aw/overview` and surface the list to the user.
- Meta → navigate `https://adsmanager.facebook.com/adsmanager/manage/accounts` and surface the list.

### Switching accounts when the wrong one is active

Agents often land on Chrome already signed in to a different Creekside account than the target client. Check current account state before navigating deep — the URL's `ocid` (Google) or `act` (Meta) param is authoritative.

**Google Ads — switch:**
1. Navigate to `https://ads.google.com/nav/selectaccount?dst=/aw/overview` (account switcher page).
2. Use `read_page` to list visible `menuitem` rows (each shows account name + dashed ID).
3. Use the menuitem snippet in the DOM cookbook — match against the canonical name AND the dashed-format account ID (both must match; name alone can be ambiguous across multi-brand clients).
4. Click the menuitem. Wait `cold_settle_ms` (15000) for the new account's shell to load.
5. Verify: re-read the page; confirm the top bar shows the target account's name + ID. If it doesn't, STOP and report — do not retry blindly.

**Meta — switch:**
1. On any `/adsmanager/*` page, the account selector dropdown lives top-left. Find it via `read_page` (accessibility tree usually labels it "Ad account" or shows the current account).
2. Click it, then match the target `act_XXXXXXXXX` in the dropdown list via `javascript_tool` text match.
3. Wait 5s for the shell to reload against the new account.
4. Verify: confirm the URL's `act=` parameter matches the target.

If you can't locate the account selector via `read_page`, fall back to navigating directly:
- Google: `https://ads.google.com/aw/overview?ocid=<numeric>` (the `ocid` forces the account context on most pages).
- Meta: append `?act=act_XXXXXXXXX` to any `/adsmanager/manage/*` URL.

## Google Ads URL reference (prefix: `https://ads.google.com`)

Placeholders: `{CID}` = 10-digit customer ID (no dashes), `{FROM}`/`{TO}` = `YYYY-MM-DD`.

### Core
- `/aw/overview?ocid={CID}` — account summary
- `/aw/campaigns?ocid={CID}` — campaign list
- `/aw/adgroups?ocid={CID}` — ad group list
- `/aw/keywords/keywords?ocid={CID}` — keyword list
- `/aw/keywords/searchterms?ocid={CID}` — search terms report
- `/aw/keywords/negative?ocid={CID}` — negative keywords
- `/aw/ads?ocid={CID}` — ad list
- `/aw/assets?ocid={CID}` — assets/extensions

### Targeting
- `/aw/audiences?ocid={CID}` — audience manager
- `/aw/locations?ocid={CID}` — location targeting
- `/aw/demographics?ocid={CID}` — demographics

### Measurement
- `/aw/conversions/detail?ocid={CID}` — conversion actions
- `/aw/conversions/diagnostics?ocid={CID}` — conversion diagnostics
- `/aw/linkedaccounts?ocid={CID}` — linked accounts (GA4, GMC, YouTube)
- `/aw/attribution?ocid={CID}` — attribution reports

### Account admin
- `/aw/accountsettings?ocid={CID}` — account-level settings
- `/aw/users?ocid={CID}` — user management
- `/aw/billing?ocid={CID}` — billing
- `/aw/policymanager?ocid={CID}` — policy violations
- `/aw/changehistory?ocid={CID}` — change history
- `/aw/recommendations?ocid={CID}` — recommendations (UI-only territory)

### Reports / insights (mostly UI-only)
- `/aw/reports?ocid={CID}` — custom reports
- `/aw/auctioninsights?ocid={CID}` — auction insights
- `/aw/experiments?ocid={CID}` — experiments/drafts
- `/aw/insights?ocid={CID}` — insights page (demand forecasting, attribution viz)

### Date range URL params
`&dateRange=LAST_7_DAYS | LAST_30_DAYS | LAST_90_DAYS | THIS_MONTH`. Not every report honors URL-based date hacking — if the displayed range doesn't match, fall back to UI click on the picker.

## Meta Ads Manager URL reference (prefix: `https://adsmanager.facebook.com`)

Placeholders: `{ACT}` = `act_XXXXXXXXX`.

### Core
- `/adsmanager/manage/campaigns?act={ACT}` — campaign list
- `/adsmanager/manage/adsets?act={ACT}` — ad set list
- `/adsmanager/manage/ads?act={ACT}` — ad list
- `/adsmanager/audiences?act={ACT}` — audience manager (different app shell — cold load shows full-viewport spinner)

### Business & delivery
- `https://business.facebook.com/settings?business_id=<bid>` — Business Manager settings
- `https://business.facebook.com/events_manager2/list/pixel?business_id=<bid>` — Events Manager
- `/adsmanager/insights?act={ACT}` — Advantage+ insights / creative diagnostic (NOT for delivery troubleshooting)

**Delivery troubleshooting is NOT a separate URL.** On `/adsmanager/manage/campaigns?act={ACT}`, the "Delivery" column shows each campaign's status (Active, Learning, In review, Not delivering, etc.). To get the reason a campaign isn't delivering, click the status badge on the row — it opens an in-page side panel with diagnostic messages. To find the badge via DOM: look in the campaign row for the element whose text matches the delivery status, then use `javascript_tool` to click it. Do NOT navigate to `/insights` expecting delivery errors — that URL is for Advantage+ creative performance.

Date range in Meta UI is URL-managed via `date=<preset>` or the in-page picker; prefer the picker for any non-standard range.

## Per-app loading behavior (critical for timing)

Pulled verbatim from the screenshot-pipeline's observed patterns — same DOM states, same settle needs.

### Google Ads (`ads.google.com/aw/*`)
- **Unreliable state:** animated "A" splash overlay that persists after `readyState=complete`.
- **Splash selectors:** `svg.la-b`, `svg.la-g`, `svg.la-b-t` (already checked by `ready_check.js`).
- **Settle:** 10-15s on first cold navigate. Expect 1-2 retries on ~50% of heavy pages.

### Meta Ads Manager `/manage/*` (campaigns, adsets, ads)
- **Unreliable state:** skeleton top-bar on cold load. Data table renders first, top-bar mounts 2-3s later.
- **Ready signal:** visible button matching `/Review and publish|Updated|Create a view/`.
- **Cold settle:** 5s. Warm route changes: 1-2s (client-side router is fast once the shell is mounted).

### Meta Ads Manager `/audiences`
- **Unreliable state:** full-viewport spinner overlay on cold load.
- **Ready signal:** visible `Create audience` button.
- **Cold settle:** 5s. Different app shell — do NOT rely on `/manage/*` selectors here.

### Generic fallback (any other authenticated app)
- Use `ready_check.js` as-is — the generic branch covers `readyState`, `[aria-busy="true"]`, skeleton classes, and generic spinners.

## DOM query cookbook (battle-tested)

These JS snippets worked in live UIs. Use them via `javascript_tool`.

### List all tabs on a page
```javascript
Array.from(document.querySelectorAll('[role="tab"]')).map((t, i) => `${i}: ${t.innerText}`)
```

### Click a tab by index
```javascript
document.querySelectorAll('[role="tab"]')[INDEX].click()
```

### Find an anchor by exact text
```javascript
Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Sign in')
```

### Find a menu item containing text
```javascript
Array.from(document.querySelectorAll('[role="menuitem"]')).find(el =>
  el.textContent.includes('Aura Displays') && el.textContent.includes('786-090-2494')
)
```

### Find a button by exact text (aria-label often empty — match innerText)
```javascript
Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Change date range')
```

### Extract table rows
```javascript
const rows = Array.from(document.querySelectorAll('table tbody tr, [role="row"]:not([role="columnheader"])'));
const data = rows.slice(0, N).map(row => {
  const cells = Array.from(row.querySelectorAll('td, [role="cell"]'));
  return cells.map(c => c.textContent.trim());
});
JSON.stringify(data);
```

### Click a sidebar link by visible text (redirect recovery)
```javascript
const link = Array.from(document.querySelectorAll('a')).find(a => a.innerText.trim() === 'Products');
if (link) link.click();
```

### Sort a table by a column header
Most ad-platform tables (Google Ads performance, Meta `/manage/*`, etc.) sort when you click the column header. Find the header by its label text, then click. Clicking once typically sorts descending; twice for ascending — verify against the page.
```javascript
const headers = Array.from(document.querySelectorAll('th, [role="columnheader"]'));
const target = headers.find(h => h.textContent.trim().toLowerCase() === 'cost'.toLowerCase());
target && target.click();
```
If the click doesn't sort (some SPAs re-route via URL params): fall back to the URL sort params documented per platform (Google Ads supports `&sortColumn=` / `&sortOrder=` on most reports).

### Toggle a status switch (pause/resume)
Ad-platform status toggles commonly use `[role="switch"]`, a checkbox, or a named button. Discover via `read_page` first — the accessibility tree will show the control type and its current state. Then click:
```javascript
// Find the switch in a known row (row identified by some visible text — e.g. campaign name)
const row = Array.from(document.querySelectorAll('[role="row"], tr')).find(r => r.textContent.includes('Summer Sale 2026'));
const sw = row && row.querySelector('[role="switch"], input[type="checkbox"]');
sw && sw.click();
```
**Do not click toggles without verifying the row match.** If `row` matches multiple entities or `querySelector` returns `null`, stop — don't click blindly.

### Handle `undefined` / `null` returns
Every `.find()` and `.querySelector()` above can return `undefined` / `null`. ALWAYS guard:
```javascript
const el = Array.from(...).find(...);
if (!el) return { error: 'not-found', selector: '...', pageText: document.title };
el.click();
return { clicked: el.textContent.trim() };
```
If `javascript_tool` returns `undefined`, `null`, or `{error: 'not-found'}`: **do not attempt a follow-on action**. Escalate: "I couldn't locate `<element>` on `<URL>`. The layout may have changed. Can you describe where it is, or should I escalate to Peterson?"

## Known gotchas

### Google Ads

- **Ad-blocker blocker dialog (no dismiss button).** If Chrome has an ad-blocker extension enabled, `ads.google.com` shows a modal saying "Turn off ad blockers / Google Ads can't work when you're using an ad blocker." The nav/shell renders but data-bearing requests are blocked — tables show header-only. **Remediation:** user must disable the ad blocker for `ads.google.com`. Do not try to bypass.
- **Sub-menu nav is nested.** Left-sidebar items like "Keywords" live under a parent like "Audiences, keywords, and content" (an `<a>` with `aria-expanded`). Clicking the parent expands; then click the child `<a>` whose `pathname === '/aw/keywords'`.
- **Account dash format mismatch.** DB stores `1234567890`; UI shows `123-456-7890`. Convert when matching UI text.
- **MCC label quirk.** The Manager account shows as a single compound token in some extractors (observed 2026-04-23: `Creekside MarketingManager 568-042-4954` with no space between "Marketing" and "Manager"). Using `.includes()` with the client name + dashed ID handles this correctly — do NOT match on whitespace boundaries.
- **PMax insights.** Many insights only surface in the UI. Use `read_page` (accessibility tree) — `get_page_text` drops too much structure.
- **Shopping product groups.** Hierarchy requires expanding each node. Script the expand clicks via `javascript_tool`.
- **Date range URL params don't always stick.** Always confirm via page text before trusting the range.
- **Saved-view default scope hides paused-campaign content** (added 2026-04-28). Even with table-level "Ad status: All" selected, the saved-view filter at top-left ("All campaigns") includes a "Campaign status: Enabled, Paused" chip that defaults to Enabled-only. Symptom: empty table with "You don't have any enabled ads" message while the API confirms the ad exists. **Fix:** click the "All campaigns" dropdown at top-left → ensure both "Campaign status" AND "Ad group status" filter chips include "Paused" → click "Apply view".
- **"Last 30 days" date range excludes today** (added 2026-04-28). The preset defaults to "30 days up to YESTERDAY" (e.g., Mar 29 - Apr 27 when today is Apr 28). Freshly-created ads do not appear in any view scoped to "Last 30 days". **Fix:** switch to "All time", change end date to today via the calendar, or pick the "30 days up to today" radio option in the date picker.
- **"Save ad" button can trigger Google account 2FA** (added 2026-04-28). The RSA editor's "Save ad" click can spawn a "Confirm it's you" dialog followed by a phone/Authenticator approval. Skill rules forbid handling 2FA — escalate to user. After the user confirms, the editor stays open with form values intact. Re-click "Save ad" to commit.
- **Headline link in the Ads table opens the LANDING PAGE in a new tab, not the editor** (added 2026-04-28). It's a preview link, not an edit link. Edit path: click "View asset details" link in the row → land on `/aw/unifiedassetreport/rsaassetdetails` → click pencil icon → land on `/aw/ads/edit/search`.
- **"View asset details" can navigate to a DIFFERENT ad than the row clicked** (added 2026-04-28). Symptom: clicked row A's "View asset details" but URL shows `adId` for row B. **Fix:** always verify `adId` and `entityId` in the URL after clicking. If wrong, edit the URL directly with the correct `adId` and `adGroupIdForEntity` and re-navigate. Pattern: `/aw/unifiedassetreport/rsaassetdetails?...&entityId={adId}&adGroupIdForEntity={agId}&adId={adId}`.
- **Ad-edit form input via `javascript_tool` value-set requires the React `valueSetter` trick** (added 2026-04-28). Plain `input.value = "..."` does not trigger React state updates and the change is lost on save. Use `Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, newValue)` followed by `dispatchEvent(new Event('input', {bubbles: true}))` and `dispatchEvent(new Event('change', {bubbles: true}))`.
- **Ads in paused or removed campaigns won't render in the standard ads list views** (added 2026-04-28). Even with the saved-view fix above, removed campaigns are excluded entirely. Removed campaigns are read-only at the platform level — cannot be edited, paused, or modified. Surface in reports but never attempt mutation.

### Meta Ads Manager

- **Two app shells.** `/adsmanager/manage/*` and `/audiences` have different loading behaviors AND different selectors. Do NOT reuse one's ready signals on the other.
- **Top-bar appears late.** On cold `/manage/*` load, the data table renders before the top-bar. If you query for "Review and publish" too early, it isn't there yet. Wait the full 5s settle.
- **Route changes are fast.** After the first cold load, switching `/manage/campaigns` → `/manage/adsets` is <10ms. Don't over-wait.

### Merchant Center (if a workflow touches it)

- **Tab URL params often redirect.** `?tab=automations` frequently redirects to `/overview`. Use `javascript_tool` to list `[role="tab"]` elements and click by index instead.
- **Angular/Material tables.** `get_page_text` misses dynamic cells — use `read_page` for the accessibility tree.
- **Source deep-links need `afmDataSourceId`.** Without it, you can only hit the source list page.

## Session stability protocol

If Chrome disconnects mid-run or a tool call errors in a way that suggests broken state:

1. **Verify Chrome is alive.** Call `tabs_context_mcp`. If it returns an error about no connection, prompt the user to re-open Chrome and log back in.
2. **Check tab state.** If the target tab still exists with the expected URL, re-run `ready_check.js` before doing anything else — the page may have reloaded and lost mid-flight state.
3. **Recreate if needed.** If the target tab is gone, call `tabs_create_mcp` with the last confirmed URL (the URL after your last successful `navigate` + `ready_check`). Re-settle.
4. **Re-verify login.** Read `get_page_text`; check for the logged-in signals documented above. If it now shows sign-in prompts, STOP — tell the user auth was lost and wait for them to re-authenticate.
5. **Re-anchor account context.** Confirm the `ocid` / `act` query param in the current URL matches the target client from `find_client()`. If it drifted (Chrome may have restored a different tab), reselect the account before continuing.
6. **Resume from the last completed navigate+verify pair** — not from a conceptual "last confidence tag." The concrete resume point is the last URL where `ready_check.js` returned `ready=true` AND you successfully extracted data. Anything after that is re-doable.

If a specific page requires re-auth (2FA, re-login): mark that surface as `[PARTIAL] — authentication required, manual follow-up` and continue with what you can access.

Before ending any run that involved a disconnect, log the recovery path to `agent_knowledge` (`knowledge_type: 'pattern'`) so the next agent has a precedent.

## Write-action safety (UI clicks that change platform state)

Any click that changes campaign / ad / bid / budget / status / conversion / extension state is a WRITE. Treat it exactly like an MCP write:

1. **Snapshot the before-state.** Read the specific field (status badge text, current budget amount, toggle aria-checked value) BEFORE acting. Record it.
2. **State the action.** "About to pause campaign `Summer Sale 2026` (ID `123456`) on Google Ads account `786-090-2494`. Current status: `Active`. New status: `Paused`."
3. **Show how.** "I'll click the campaign's status toggle in the row labeled `Summer Sale 2026`."
4. **Wait for explicit "yes"** from the user.
5. **Execute.** One click, one tool message.
6. **Wait** 3s for the UI to reflect the change.
7. **Verify.** Re-read the same field. It MUST show the new expected state.
   - **If new state matches expected:** log success.
   - **If it still shows the before-state after one re-read:** DO NOT assume success. Wait another 3s and re-read. If still unchanged, report to the user: "The click appears to have fired but the status still reads `<before>`. The action may have failed or requires a confirmation modal. Do not assume the change took effect."
   - **If the field shows an unexpected third state** (e.g., "Pending review", "Limited"): surface that verbatim to the user before logging.
8. **Log** to `ads_knowledge` as `knowledge_type: 'account_decision'` with timestamp, customer_id / account_id, before-state, after-state, and the selector used.

Never run write actions in a parallel batch. Never skip the snapshot-before or verify-after steps.

## Recommendations (Google Ads) — general pattern

`/aw/recommendations?ocid={CID}` is UI-only territory for most apply/dismiss actions. The skill does not hardcode selectors because the layout changes — use the discovery pattern:

1. Navigate and run `ready_check.js` (this is a heavy SPA — expect 10-15s cold settle).
2. Use `read_page` to list visible recommendations. Each typically shows a title ("Add N new keywords", "Try a new bidding strategy"), an impact estimate, and action buttons.
3. To find a specific recommendation: text-match against the title via `javascript_tool`.
4. To apply: locate the "Apply" button WITHIN the matched card's DOM subtree (scoped, not global) and click. Apply the snapshot-before / verify-after rule from the write-safety section.
5. **Success signal:** after clicking Apply, the recommendation typically disappears from the list and a toast appears. Verify BOTH: re-read `/aw/recommendations` and confirm the title no longer appears. If it still appears, assume failure — surface to user.
6. To dismiss: same pattern, locate the "Dismiss" / "X" / overflow-menu control within the card.

If a recommendation requires a multi-step modal (e.g., "Review the new keywords before adding"), stop at the modal, summarize what the platform is about to do, and wait for explicit user confirmation before clicking through.

## Sorting and filtering patterns

Every ad-platform table has this pattern somewhere. The skill documents the general approach; specific column labels live in the DOM cookbook.

**Sort by a metric:**
1. Confirm the target column is visible (if hidden, open the Column/Metric picker first — typically an icon button near the top-right of the table).
2. Use the "Sort a table by a column header" snippet in the DOM cookbook.
3. Verify: re-read the first row; confirm the metric value aligns with the sort direction.

**Filter to a subset:**
Most tables have a "Filter" or "Add filter" button. Click it, pick the filter type (status, ad type, label), specify the value. This is platform-specific UI — discover via `read_page` rather than hardcoding.

**Column picker:** for columns not visible by default (e.g., "Ad strength" on Google Ads `/aw/ads`), the column picker is an icon button labeled "Columns" or "Modify columns". Click it, enable the target column, save. Every ad platform has this pattern.

## Error recovery — navigate, javascript_tool, read_page

The MCP tools themselves can fail. Handle each class:

**`navigate` returns an error (timeout, Chrome unresponsive, tab ID invalid):**
1. Call `tabs_context_mcp` to verify the tab still exists and Chrome is responsive.
2. If tab does not exist: create a fresh tab via `tabs_create_mcp` with the target URL. Re-run `ready_check.js`.
3. If Chrome is entirely unresponsive: STOP and report to the user. Do not retry blindly.
4. If the tab exists but navigation failed on a specific URL: check for a URL-level error (bad `ocid`, malformed customer ID). Log the URL that failed.

**`javascript_tool` returns `undefined`, `null`, or an error object:**
Already covered in the DOM cookbook's "Handle `undefined` / `null` returns" snippet. Do NOT follow up with a dependent action.

**`read_page` returns empty or truncated tree:**
The page may not have finished rendering. Wait `retry_wait_ms` and re-run `ready_check.js`. If still empty after `max_retries`, fall back to `javascript_tool` with a direct DOM query and report the degraded read to the user.

**Page renders a full-page error (404, 403, "Something went wrong"):**
Read the error text via `get_page_text` and report it verbatim. Common causes: the account ID doesn't exist under the logged-in user, the URL path has been deprecated, or session expired.

## Teardown — MANDATORY

Every run that creates tabs MUST close them. Same rules as `chrome-screenshot-pipeline`:

1. List tabs: `tabs_context_mcp`
2. Close each `tabId` sequentially — one tool message per close — NOT in parallel.
3. Swallow `Tab <id> no longer exists` and `tab group no longer exists` errors as success (Chrome auto-removes groups when the last tab goes).
4. Run teardown in both the success path AND any error path.

Parallel close calls race — first close can auto-remove the group, second call errors. Sequential only.

## Reference
- `chrome-screenshot-pipeline` skill — screenshot capture (companion skill, same Chrome MCP foundation)
- `ads-connector` skill — MCP-first routing for Meta + Google Ads; falls back to this skill when MCP can't do the job
- `/Users/petersonrainey/scripts/screenshot_pipeline/ready_check.js` — deterministic per-app readiness IIFE (reuse as-is)
- `/Users/petersonrainey/scripts/screenshot_pipeline/capture_config.json` — per-app settle/retry config
- `agent_knowledge` SOP `SOP: E-Commerce Audit Navigation Reference` — fuller URL reference for the ecom audit case (Google Ads + Merchant Center)
- `agent_knowledge` pattern `Google Ads UI: click-based navigation paths (Aura Displays run 2026-04-17)` — verified DOM selectors and the ad-blocker blocker gotcha

## Stress-tested behaviors

- **Navigate + screenshot race** (chrome-screenshot-pipeline, 2026-04-22): parallel tool message → screenshot captures the previous page. **Fix:** sequential messages.
- **Parallel-close race** (2026-04-22/23): two `tabs_close_mcp` calls in one tool message → first succeeds, second errors `tab group no longer exists`. **Fix:** sequential + error-tolerant.
- **Google Ads splash** (2026-04-22): 50% first-try success, 100% after up to 3 retries with `ready_check.js`.
- **Meta `/manage/*` cold load** (2026-04-22/23): skeleton top-bar absent for 2-3s after table renders. 100% first-try after 5s settle.
- **Meta `/audiences` cold load** (2026-04-22/23): full-viewport spinner. Variance-verifier caught the spinner-only frame (variance=6 vs threshold 300).
- **Ad-blocker blocker on `ads.google.com`** (2026-04-17 Aura Displays run): no-dismiss modal, tables empty. No scripting bypass — user must whitelist.
