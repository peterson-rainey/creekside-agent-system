---
name: ads-ui-navigation
description: "Reliable navigation of the live Google Ads and Meta Ads Manager UIs via Claude in Chrome. Use when an agent needs to read or modify something in the ad-platform UI that the PipeBoard MCP connectors don't expose (recommendations tab, asset strength ratings, Insights tab, delivery troubleshooting, policy detail, billing, Business Manager writes, etc.). Handles OAuth / login state detection, the Google Ads splash + Meta skeleton/spinner animation blind spots, client-side routing, ad-blocker blockers, tab lifecycle, and the navigate+action race condition. Read-only by default — any UI write requires explicit user confirmation. Pairs with ads-connector (MCP-first routing) and chrome-screenshot-pipeline (screenshot capture). Do NOT use for screenshots (use chrome-screenshot-pipeline) or for things PipeBoard already does (use ads-connector)."
---

# Ads UI Navigation

Reliable, error-tolerant navigation of the Google Ads and Meta Ads Manager UIs via `mcp__Claude_in_Chrome__*`. Built from the same foundations as `chrome-screenshot-pipeline`, plus every lesson from the deprecated `google-ads-chrome-agent` and the e-commerce audit navigation SOP.

## When to use this skill

- An ad agent needs something from the UI that isn't in PipeBoard's MCP surface (Recommendations apply/dismiss, Insights tab, asset strength ratings, policy detail, Meta delivery troubleshooting, Events Manager test tool, Business Manager writes, billing, etc.).
- An agent needs to read a page an MCP tool doesn't expose (PMax asset insights, Shopping product-group hierarchy, Change history with field-level detail).
- An agent needs to perform a UI write action a user authorized (pause a campaign via the UI, apply a recommendation).

## When NOT to use this skill

- **Anything PipeBoard MCP can do** -- always try `ads-connector` first. UI is slower and fragile.
- **Screenshots** -- use `chrome-screenshot-pipeline`. This skill navigates; that one captures.
- **Data pulls that exist in Supabase** -- query the warehouse instead of scraping the UI.
- **Login / 2FA / CAPTCHA** -- this skill does NOT handle auth. Stop and ask the user.
- **Server-side / Railway cron** -- no Chrome is open there.

## The non-negotiable rules

1. **Never attempt login or 2FA.** If the page shows `Sign in`, `Choose an account`, `accounts.google.com`, `m.facebook.com/login`, or a 2FA prompt -- STOP, tell the user, and wait.
2. **Never batch navigate + [read|click|js] in a single parallel tool-call message.** They race. Sequential messages only.
3. **Never trust a single state check on a heavy SPA.** Google Ads renders a splash overlay AFTER `readyState=complete`. Meta /audiences renders a full-viewport spinner. Wait + re-check.
4. **Never dismiss CAPTCHAs, bot challenges, or ad-blocker blockers with scripting.** Report them and stop.
5. **Never fabricate selectors.** If `read_page` / `get_page_text` don't surface the element, don't invent one -- escalate.
6. **Writes require explicit "yes" from the user.** State the action + target + params, wait for confirmation, then execute. Log to `ads_knowledge` (`knowledge_type: 'account_decision'`) afterward.

## Tool surface -- use `mcp__Claude_in_Chrome__*` only

Do NOT mix in `Control_Chrome` or `Claude_Preview` -- one MCP only.

| Tool | Use for |
|---|---|
| `navigate` | Change URL in the active tab |
| `tabs_create_mcp` | Open a new tab (preferred over navigate for isolation) |
| `tabs_context_mcp` | List tabs in the session group |
| `get_page_text` | **Primary** text extraction -- plain text of visible DOM |
| `read_page` | Accessibility tree -- required for Angular/Material dynamic tables |
| `find` | Selector-based element lookup |
| `javascript_tool` | **Last resort** -- inject JS for direct DOM queries, button clicks |
| `form_input` | Fill form fields |
| `read_console_messages` | Diagnose rendering failures |
| `computer` | Mouse / keyboard primitives (prefer higher-level tools) |

**Read order:** `get_page_text` -> `read_page` -> `javascript_tool`. Stop at the first one that works.

**Decision rule (skip ahead when appropriate):**
- **Structured table data** -> go straight to `read_page` (preserves row/cell structure).
- **Plain visible text or status badge** -> `get_page_text` is enough.
- **Need to interact with a specific element** -> `javascript_tool` -- but only after locating the element in the accessibility tree or visible text.

## Discovery-first, escalation-second

This skill deliberately does NOT document every DOM selector. UI selectors drift. Instead, agents follow a discovery pattern:

1. **Land on the right page** (via URL references below) and run `ready_check.js`.
2. **Inspect the live DOM** via `get_page_text` or `read_page` to find the target element.
3. **Build the selector from what you actually see** -- text match, ARIA role, visible label. Never from assumption.
4. **If you can't find the element after a genuine attempt**, STOP and surface the problem.
5. **Never fabricate a selector** because "it should be there."

**Saving discoveries:** when an agent successfully discovers a non-obvious selector (especially for a write action), write it to `agent_knowledge` with tags `['google-ads'|'meta-ads', 'ui-path', 'selector']` so the next agent doesn't re-discover. Include the full JS snippet and the date.

## Core process: navigate-then-wait-then-act

Every UI interaction follows these steps. For detailed ready-check mechanics, DOM cookbook snippets, session stability, error recovery, and teardown rules, read `reference/ready-checks.md`.

1. **Verify tab and login state** -- call `tabs_context_mcp`. Create a tab if none exists.
2. **Navigate** -- `navigate` with the target URL. This MUST be its own message (no parallel read/click).
3. **Wait and probe readiness** -- inject `/Users/petersonrainey/scripts/screenshot_pipeline/ready_check.js` via `javascript_tool`. If `ready=false`, retry up to `max_retries`. Use `cold_settle_ms` for first load, `warm_settle_ms` for client-side route changes.
4. **Read or act** -- in a separate message. One tool call per action for writes.
5. **Verify** -- after any write, re-read the page and confirm the target state changed.

## Account resolution (MANDATORY)

Never hardcode account IDs. Always resolve via `find_client()`:

```sql
SELECT * FROM find_client('<name>');
```

- Google: `google_account_ids[]` -- 10-digit numerics (format as `XXX-XXX-XXXX` for UI matching).
- Meta: `meta_account_ids[]` -- `act_XXXXXXXXX`.

For platform-specific account switching, auth detection, and access model details, read the per-platform references below.

## Write-action safety (UI clicks that change platform state)

Any click that changes campaign / ad / bid / budget / status / conversion / extension state is a WRITE:

1. **Snapshot the before-state** -- read the specific field BEFORE acting.
2. **State the action** -- describe what will change, the target, current value, new value.
3. **Show how** -- describe the UI element you will click.
4. **Wait for explicit "yes"** from the user.
5. **Execute** -- one click, one tool message.
6. **Wait** 3s for the UI to reflect the change.
7. **Verify** -- re-read the same field. It MUST show the new expected state.
   - If unchanged after two re-reads (3s apart): report to the user that the action may have failed.
   - If an unexpected third state appears (e.g., "Pending review"): surface verbatim.
8. **Log** to `ads_knowledge` as `knowledge_type: 'account_decision'`.

Never run write actions in a parallel batch. Never skip snapshot-before or verify-after.

## Platform-specific references

For Google Ads navigation details (URLs, auth detection, account switching, loading behavior, recommendations, DOM snippets), read `reference/google-ads-nav.md`.

For Meta Ads Manager navigation details (URLs, auth detection, account switching, access model, loading behavior), read `reference/meta-ads-nav.md`.

For ready-check mechanics, DOM cookbook, session stability, error recovery, sorting/filtering, and teardown rules, read `reference/ready-checks.md`.

For known gotchas, edge cases, and stress-tested behaviors (Google Ads, Meta, Merchant Center), read `reference/gotchas.md`.

## External references

- `chrome-screenshot-pipeline` skill -- screenshot capture (companion skill, same Chrome MCP foundation)
- `ads-connector` skill -- MCP-first routing for Meta + Google Ads; falls back to this skill when MCP can't do the job
- `/Users/petersonrainey/scripts/screenshot_pipeline/ready_check.js` -- deterministic per-app readiness IIFE
- `/Users/petersonrainey/scripts/screenshot_pipeline/capture_config.json` -- per-app settle/retry config
- `agent_knowledge` SOP `SOP: E-Commerce Audit Navigation Reference` -- fuller URL reference for the ecom audit case
- `agent_knowledge` pattern `Google Ads UI: click-based navigation paths (Aura Displays run 2026-04-17)` -- verified DOM selectors and the ad-blocker blocker gotcha
