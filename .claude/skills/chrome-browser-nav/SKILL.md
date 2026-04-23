---
name: chrome-browser-nav
description: "General Chrome browser automation for data extraction and UI interaction across authenticated web apps (Google Ads, Meta Ads, Square, SaaS dashboards, general web). Navigate, wait for ready, read page content, click/type/extract data, tear down — without saving screenshots. Reuses the deterministic per-app config and ready_check.js from the chrome-screenshot-pipeline skill. Use whenever an agent needs to browse to a page, extract data, or interact with UI without producing visual deliverables."
---

# Chrome Browser Navigation

Sibling skill to `chrome-screenshot-pipeline`. Same infrastructure (Chrome MCP, MCP tab group, `ready_check.js`, sequential tool-call pattern, error-tolerant teardown) — **minus the screenshot save/verify pipeline**.

Use this skill for:
- Data extraction from authenticated dashboards (read a page's text, pull numbers)
- UI interaction (click a button, fill a form, navigate a flow)
- State checks (did a campaign publish, is a workflow running, does a row exist)
- Any Chrome automation where the output is data/text/actions, not images

Use `chrome-screenshot-pipeline` instead when:
- The deliverable is the screenshot (client audit PDF, case study, visual proof)
- You need the variance+size verifier to catch loader frames

## The non-negotiable rules (shared with screenshot pipeline)

1. **Sequential tool calls only.** Never batch navigate + anything in a single parallel tool message. Chrome races.
2. **Use the MCP tab group.** Start every run with `tabs_context_mcp createIfEmpty:true`. Create tabs with `tabs_create_mcp`. Never touch tabs outside the group.
3. **Use `ready_check.js` as the first gate.** Inject after `navigate + settle wait`. It returns `{app, ready, reason?, cold_settle_ms, warm_settle_ms, ...}` deterministically.
4. **Teardown is mandatory.** Every run closes every tab it opened. Error-tolerant loop (swallow `no longer exists` as success).

## The flow

### Step 1 — Create/reuse the MCP tab group
```
mcp__Claude_in_Chrome__tabs_context_mcp  createIfEmpty=true
```
Returns a fresh `tabGroupId` and one empty tab. If you need more tabs, call `tabs_create_mcp`.

### Step 2 — Navigate
```
mcp__Claude_in_Chrome__navigate  tabId=<id>  url=<target>
```

### Step 3 — Wait + ready check
Wait the configured `cold_settle_ms` (first time on an app) or `warm_settle_ms` (subsequent route changes) — default 5s if you don't yet know the app. Then inject `ready_check.js`:

```
mcp__Claude_in_Chrome__javascript_tool  text=<contents of ready_check.js>
```

Returns:
```json
{
  "app": "google-ads" | "meta-ads-manage" | "meta-ads-audiences" | "generic",
  "ready": true,
  "cold_settle_ms": 5000,
  "warm_settle_ms": 2000,
  "max_retries": 3,
  "retry_wait_ms": 5000,
  "ready_signal": "Updated"
}
```

If `ready=false`, wait `retry_wait_ms` and re-inject, up to `max_retries`.

### Step 4 — (Optional) Dismiss popups / cookie banners

If the target page is known to show cookie banners, ad-blocker nags, or consent modals — OR if a subsequent `read_page` returns obvious overlay text — inject `dismiss_popups.js`:

```
mcp__Claude_in_Chrome__javascript_tool  text=<contents of dismiss_popups.js>
```

Returns:
```json
{ "dismissed": ["OneTrust accept", "cookie/consent button: \"accept all\""], "remaining_overlay": false }
```

What it handles: OneTrust, Cookiebot, TrustArc, Meta cookie dialogs, generic `Accept all` / `OK` / `Got it` buttons, `[role="dialog"]` close buttons (only on dialogs WITHOUT password/email fields — auth prompts are never touched).

What it does NOT handle: paywalls, login walls, captchas, permission prompts (camera/notifications), 2FA. Those require the user.

### Step 5 — Do the actual work

Pick the right tool for the task:

| Goal | Tool |
|------|------|
| Read page content as structured accessibility tree | `mcp__Claude_in_Chrome__read_page` |
| Read plain text of page | `mcp__Claude_in_Chrome__get_page_text` |
| Find specific element by natural language | `mcp__Claude_in_Chrome__find` |
| Execute JS (extract data, manipulate DOM, read state) | `mcp__Claude_in_Chrome__javascript_tool` |
| Click / type / scroll | `mcp__Claude_in_Chrome__computer` |
| Network / console logs | `mcp__Claude_in_Chrome__read_network_requests`, `read_console_messages` |

**Prefer `javascript_tool` over `computer` for data extraction.** Selectors + structured queries are deterministic; pixel-coordinate clicks are fragile. Reserve `computer action=click` for elements that truly need mouse events (drag, hover menus, non-interactive divs).

### Step 6 — Teardown (MANDATORY, same rules as screenshot pipeline)

```
mcp__Claude_in_Chrome__tabs_context_mcp       # list remaining tabs
mcp__Claude_in_Chrome__tabs_close_mcp  tabId=<id>   # SEQUENTIALLY, one tool message per close
```

Close calls must be in separate tool messages. Swallow `Tab <id> no longer exists` and `This session's tab group no longer exists` as successful teardown — Chrome sometimes cascades auto-removal.

## About "ad blocker issues"

Chrome MCP runs in the user's real Chrome profile with their real cookies, extensions, and user agent. This avoids most anti-automation detection (no Selenium webdriver flags, no headless-Chrome fingerprint). Real browser = real browsing.

What can still bite:
- **Sites that detect the user's own ad blocker** and refuse to render content. Not fixable from the agent side; the user would have to whitelist.
- **Cookie/consent modals** that block content until clicked. Handled by `dismiss_popups.js` (Step 4).
- **Rate limits** if the agent navigates too fast. Don't parallelize navigates.
- **Anti-scraping challenges** on some consumer sites (captchas, "are you human" interstitials). Cannot be defeated; fall back to asking the user.

## Shared files (all live at `~/scripts/screenshot_pipeline/` — reused, not copied)

| File | Purpose | Reused from |
|------|---------|-------------|
| `capture_config.json` | Per-app URL patterns, settle times, ready signals | chrome-screenshot-pipeline |
| `ready_check.js` | URL-aware injectable ready check | chrome-screenshot-pipeline |
| `build_ready_check.py` | Sync embedded CONFIG from JSON | chrome-screenshot-pipeline |
| `dismiss_popups.js` | Dismiss cookie banners / consent modals | **new, this skill** |

Editing `capture_config.json` updates both skills. Run `build_ready_check.py` after any config change.

## Example: read the number of Meta campaigns without screenshotting

```
# 1. tabs_context_mcp createIfEmpty=true  →  get tabId
# 2. navigate to https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=<ID>
# 3. wait 5000ms
# 4. inject ready_check.js  →  expect app=meta-ads-manage, ready=true
# 5. javascript_tool: document.querySelector('[data-testid="campaigns-count"]')?.textContent
#    or: extract from document.body.innerText via regex
# 6. tabs_close_mcp tabId  (error-tolerant)
```

Total: 6 sequential tool calls, no files written to disk, no artifacts to clean up.

## Anti-patterns

- Don't use `computer action=screenshot` unless you actually need the image
- Don't parallelize navigate + extract — page hasn't settled yet
- Don't skip ready_check.js — Meta's warm-route speed makes it cheap; the cold-load failure case is invisible without it
- Don't edit `ready_check.js`'s embedded CONFIG by hand — edit the JSON and rebuild
- Don't try to circumvent a captcha or hard paywall programmatically
- Don't forget teardown. Orphan tab groups pile up across sessions.

## When to extend

Add a new app: edit `capture_config.json`, add URL patterns + ready signals, run `build_ready_check.py`. Both chrome-browser-nav AND chrome-screenshot-pipeline pick up the change.

Add a new popup pattern: edit `dismiss_popups.js` directly (no canonical JSON for popups — patterns are text-based heuristics).
