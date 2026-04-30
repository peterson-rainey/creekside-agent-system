# Ready Checks, DOM Cookbook, and Session Stability

## The navigate-then-wait-then-act pattern

This is the central pattern. Every UI interaction follows it.

### Step 1 -- Verify tab and login state (once per session)

Before ANY navigation, confirm Chrome is responding and the user is logged in.

```
tabs_context_mcp  (no args)
```

If no tab group exists, create one:
```
tabs_create_mcp  createIfEmpty: true  url: <target>
```

### Step 2 -- Navigate to a URL (its own message)

```
navigate  tabId: <id>  url: https://ads.google.com/aw/overview?ocid=<customer_id>
```

### Step 3 -- Wait for the page to settle, then probe readiness

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
4. If `ready=false` -> wait `retry_wait_ms`, re-inject, up to `max_retries`
5. If `ready=true` -> proceed to Step 4

Client-side routing (within Ads Manager, within Google Ads) after the first cold load is near-instant -- use `warm_settle_ms` (1-3s) for subsequent route changes, not the full cold settle.

### Step 4 -- Read or act (separate message, no parallelism)

```
get_page_text  tabId: <id>
```
or
```
javascript_tool  tabId: <id>  code: "<dom query>"
```

For write actions (click, fill form): single tool message per action.

### Step 5 -- Verify the action took effect

After any write, re-read the page and confirm the target state is reflected. Don't assume a click landed just because the tool returned success.

## Generic fallback (any other authenticated app)

Use `ready_check.js` as-is -- the generic branch covers `readyState`, `[aria-busy="true"]`, skeleton classes, and generic spinners.

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

### Find a button by exact text (aria-label often empty -- match innerText)
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
```javascript
const headers = Array.from(document.querySelectorAll('th, [role="columnheader"]'));
const target = headers.find(h => h.textContent.trim().toLowerCase() === 'cost'.toLowerCase());
target && target.click();
```
If the click doesn't sort (some SPAs re-route via URL params): fall back to the URL sort params documented per platform (Google Ads supports `&sortColumn=` / `&sortOrder=` on most reports).

### Toggle a status switch (pause/resume)
```javascript
const row = Array.from(document.querySelectorAll('[role="row"], tr')).find(r => r.textContent.includes('Summer Sale 2026'));
const sw = row && row.querySelector('[role="switch"], input[type="checkbox"]');
sw && sw.click();
```
**Do not click toggles without verifying the row match.** If `row` matches multiple entities or `querySelector` returns `null`, stop -- don't click blindly.

### Handle `undefined` / `null` returns
Every `.find()` and `.querySelector()` above can return `undefined` / `null`. ALWAYS guard:
```javascript
const el = Array.from(...).find(...);
if (!el) return { error: 'not-found', selector: '...', pageText: document.title };
el.click();
return { clicked: el.textContent.trim() };
```
If `javascript_tool` returns `undefined`, `null`, or `{error: 'not-found'}`: **do not attempt a follow-on action**. Escalate: "I couldn't locate `<element>` on `<URL>`. The layout may have changed. Can you describe where it is, or should I escalate to Peterson?"

## Sorting and filtering patterns

**Sort by a metric:**
1. Confirm the target column is visible (if hidden, open the Column/Metric picker first -- typically an icon button near the top-right of the table).
2. Use the "Sort a table by a column header" snippet above.
3. Verify: re-read the first row; confirm the metric value aligns with the sort direction.

**Filter to a subset:**
Most tables have a "Filter" or "Add filter" button. Click it, pick the filter type (status, ad type, label), specify the value. Discover via `read_page` rather than hardcoding.

**Column picker:** for columns not visible by default (e.g., "Ad strength" on Google Ads `/aw/ads`), the column picker is an icon button labeled "Columns" or "Modify columns". Click it, enable the target column, save.

## Session stability protocol

If Chrome disconnects mid-run or a tool call errors in a way that suggests broken state:

1. **Verify Chrome is alive.** Call `tabs_context_mcp`. If it returns an error about no connection, prompt the user to re-open Chrome and log back in.
2. **Check tab state.** If the target tab still exists with the expected URL, re-run `ready_check.js` before doing anything else -- the page may have reloaded and lost mid-flight state.
3. **Recreate if needed.** If the target tab is gone, call `tabs_create_mcp` with the last confirmed URL. Re-settle.
4. **Re-verify login.** Read `get_page_text`; check for the logged-in signals. If it now shows sign-in prompts, STOP -- tell the user auth was lost and wait for them to re-authenticate.
5. **Re-anchor account context.** Confirm the `ocid` / `act` query param in the current URL matches the target client from `find_client()`. If it drifted, reselect the account before continuing.
6. **Resume from the last completed navigate+verify pair** -- the concrete resume point is the last URL where `ready_check.js` returned `ready=true` AND you successfully extracted data.

If a specific page requires re-auth (2FA, re-login): mark that surface as `[PARTIAL] -- authentication required, manual follow-up` and continue with what you can access.

Before ending any run that involved a disconnect, log the recovery path to `agent_knowledge` (`knowledge_type: 'pattern'`) so the next agent has a precedent.

## Error recovery -- navigate, javascript_tool, read_page

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

## Teardown -- MANDATORY

Every run that creates tabs MUST close them. Same rules as `chrome-screenshot-pipeline`:

1. List tabs: `tabs_context_mcp`
2. Close each `tabId` sequentially -- one tool message per close -- NOT in parallel.
3. Swallow `Tab <id> no longer exists` and `tab group no longer exists` errors as success (Chrome auto-removes groups when the last tab goes).
4. Run teardown in both the success path AND any error path.

Parallel close calls race -- first close can auto-remove the group, second call errors. Sequential only.
