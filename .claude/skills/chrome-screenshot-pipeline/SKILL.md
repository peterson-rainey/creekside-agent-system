---
name: chrome-screenshot-pipeline
description: "Capture authenticated web app screenshots (Google Ads, Meta, Square, Fathom, client dashboards) via Claude in Chrome. Handles the animation blind spot that causes loader-frame captures. Use whenever an agent needs to screenshot a logged-in web page for a deliverable, audit, or report. Do NOT use macOS screencapture — it silently returns wallpaper when permissions aren't granted."
---

# Chrome Screenshot Pipeline

Reliable screenshot capture of authenticated web apps via Claude in Chrome. Battle-tested 2026-04-22 against Google Ads across 8 page types. 100% reliability after retries; pipeline verification catches every loader frame.

## When to use this skill

Trigger when the current task requires a screenshot of any logged-in web app:
- Google Ads, Meta Ads, Square, Fathom, ClickUp, client dashboards
- Any screenshot that will end up in a client-facing deliverable
- Any capture where "wallpaper or loader frames shipped" is unacceptable

## When NOT to use this skill

- Taking screenshots of local desktop apps (use Peekaboo MCP)
- Scraping public pages (use WebFetch)
- Server-side / Railway cron runs where no Chrome is open (use Playwright with storageState, not this)

## The non-negotiable rules

1. **Never use `screencapture` shell command.** It silently returns wallpaper when macOS Screen Recording permission isn't granted. No error signal.
2. **Never batch navigate + screenshot in a single parallel tool call.** They race. Screenshot captures the next page mid-transition.
3. **Never trust a single capture of an animated SPA.** Google Ads has a splash that runs AFTER `readyState=complete`. Always retry on loader detection.
4. **Every capture must pass pipeline verification before it's used.** File size ≥ 30 KB AND pixel variance > 300 AND dimensions in 800-4000 × 400-3000.

## The pipeline

### Step 1 — Activate Chrome target tab (once per session)

Via `mcp__Control_your_Mac__osascript`:
```
osascript /Users/petersonrainey/scripts/screenshot_pipeline/activate_chrome.scpt "Perfect Parking"
```
Returns one of three values — the caller MUST branch on all three:

| Return | Meaning | Action |
|--------|---------|--------|
| `ACTIVATED: <title>` | Exactly one tab matched | Proceed to Step 2 |
| `NOT_FOUND: <needle>` | Zero tabs matched | Ask user to open the tab, or refine needle. Do NOT screenshot. |
| `AMBIGUOUS: N matches \| <t1> \|\| <t2> ...` | 2+ tabs matched. No activation happened. | Pick a unique substring from the titles (account ID, client name) and retry. Do NOT screenshot blindly — risk of capturing the wrong client's data. |

**Rule:** Use a needle specific enough to uniquely identify ONE tab. Prefer client account IDs or full client names over generic strings like "Google Ads".

### Step 2 — For EACH capture

Each substep is its OWN tool-call message. No parallelism.

**(a) Navigate**
```
mcp__Claude_in_Chrome__navigate → target URL
```

**(b) Wait + poll DOM readiness**
Wait 15 seconds for heavy SPA pages (Google Ads needs ~20s total before splash clears).

Then inject this via `mcp__Claude_in_Chrome__javascript_tool`:
```javascript
(function domReady() {
  if (document.readyState !== "complete") return {ready: false};
  var spinners = ['svg.la-b', 'svg.la-g', 'svg.la-b-t',
                  'mat-progress-bar[mode="indeterminate"]',
                  '[aria-busy="true"]', '[class*="shimmer"]:not([hidden])'];
  for (var i=0; i<spinners.length; i++) {
    var els = document.querySelectorAll(spinners[i]);
    for (var j=0; j<els.length; j++) {
      var el = els[j], s = window.getComputedStyle(el);
      if (el.offsetWidth > 0 && el.offsetHeight > 0 && s.display !== "none" && parseFloat(s.opacity) > 0.01) {
        // Walk up for ancestor opacity
        var p = el.parentElement, hidden = false;
        while (p) { var ps = window.getComputedStyle(p);
          if (parseFloat(ps.opacity) < 0.05 || ps.display === 'none') { hidden = true; break; }
          p = p.parentElement;
        }
        if (!hidden) return {ready: false, reason: spinners[i]};
      }
    }
  }
  return {ready: true};
})();
```

**(c) Screenshot** — separate message, no parallel navigate
```
mcp__Claude_in_Chrome__computer action=screenshot tabId=<id> save_to_disk=true
```

**(d) If the capture looks like a loader, retry up to 3 times**
After each attempt: if the returned image is a loader (the pipeline's verification step catches this), wait 5 seconds, re-capture.

### Step 3 — Extract + verify (once at end of session)

```bash
python3 /Users/petersonrainey/scripts/screenshot_pipeline/capture_pipeline.py pipeline \
  --session-dir ~/.claude/projects/<project-slug>/ \
  --out-dir ~/Desktop/captures_<date>/ \
  --min-size 30000 \
  --crop-bottom 80
```

Writes a `manifest.json` with PASS/FAIL per capture. FAIL verdicts mean re-capture that URL.

### Step 4 — Teardown (MANDATORY — close every tab in the MCP group)

Every pipeline run that created tabs MUST close them. Skipping this leaves orphan tab groups that accumulate across sessions, clutter the user's Chrome, and break the "tab group per conversation" contract.

```
# 1. List current tabs
mcp__Claude_in_Chrome__tabs_context_mcp   (no args)

# 2. Close each returned tabId one at a time, SEQUENTIALLY (one tool message per close)
mcp__Claude_in_Chrome__tabs_close_mcp  tabId=<id>

# 3. Chrome auto-removes the group when the last tab closes.
#    No separate "delete group" call is needed.
```

**Do NOT parallelize close calls.** Closing multiple tabIds in a single parallel tool-call message causes a race: the first close can trigger auto-removal before the second close lands, and the second returns `This session's tab group no longer exists`. Same rule as navigate+screenshot: sequential messages only.

Run this in the success path AND in any error-handling path. If a run errors mid-way, the agent should still attempt to close any tabs it created before reporting the error.

**Stress-tested 2026-04-22:**
- 1-tab group: close last tab → `Group is now empty (auto-removed)` → subsequent `tabs_context_mcp` returned `No tab group exists for this session`
- 3-tab group: closed middle tab → group persisted with 2 remaining. Closed out of order (last, then first) → group auto-removed when the final tab went
- Idempotency: closing an already-closed `tabId` returns a clear error (`Tab <id> no longer exists`) — caller must catch, no crash
- Rapid create/close cycles: each `tabs_context_mcp createIfEmpty:true` after a teardown returned a fresh `tabGroupId` (no reuse across cycles); zero residue between runs
- Parallel-close race: two `tabs_close_mcp` calls in one tool message for different tabIds → first succeeds, second errors with `tab group no longer exists`. Must close sequentially.

## Per-app loading patterns

Different web apps have different unreliable states. The DOM ready check (`dom_ready_check.js`) is a first gate tuned for Google Ads + generic `[aria-busy]` / spinner selectors; it is the **same script for every app** and has not been forked per-platform. The **post-capture variance+size verifier is always authoritative**. If variance < 300 or size < 30KB, retry — regardless of what DOM-ready said.

The per-app sections below document OBSERVED loading patterns and recommended *settle waits + retry expectations* — they do not correspond to app-specific code in `dom_ready_check.js`. Meta's ready signals ("Review and publish" / "Updated" / "Create audience" buttons) were identified during profiling but NOT added to the script; they're useful for ad-hoc DOM probes if you need to confirm ready state mid-capture, but the pipeline itself relies on fixed-wait + variance verification.

### Google Ads (`ads.google.com/aw/*`)
- **Unreliable state:** full-page splash overlay (animated A logo at viewport center). `readyState=complete` returns true while the splash still obscures content.
- **Splash selectors:** `svg.la-b`, `svg.la-g`, `svg.la-b-t` (already in `dom_ready_check.js`)
- **Recommended settle:** wait 10-15s after navigate, then poll DOM, then screenshot. Expect 1-2 retries on ~50% of heavy pages.
- **Typical first-try success rate:** ~50% | After up to 3 retries: 100% (8/8 pages).

### Meta Ads Manager (`adsmanager.facebook.com/adsmanager/*`) — profiled 2026-04-22
- **Unreliable state varies by route:**
  - `/manage/campaigns|adsets|ads`: skeleton top-bar on cold load (data table renders first, top-bar mounts ~2-3s later). Ready signal: visible button with text matching `/Review and publish|Updated|Create a view/`.
  - `/audiences`: full-viewport spinner overlay on cold load. Textual content is minimal (`textLen ≈ 659`), ready signal is different — use visible `Create audience` button.
- **Client-side routing:** After the first load, route changes within Ads Manager are near-instant (<10ms) because the app shell stays mounted. Only the first navigate needs the cold-load settle.
- **Recommended settle:** wait 5s after first cold navigate; subsequent route changes need only 1-2s. The variance verifier catches the spinner-only state reliably.
- **Does NOT use** Google Ads' `svg.la-*` classes or Angular Material progress bars.

### Generic fallback (any authenticated web app)
- Use the existing `dom_ready_check.js` as-is. It covers readyState, generic spinners, `[aria-busy="true"]`, and skeleton classes.
- Always rely on the post-capture variance+size verifier for authoritative pass/fail.

## Measured reliability

| Scenario | Rate | Source |
|----------|------|--------|
| Chrome MCP captures what's on screen | 100% | 2026-04-22 Google Ads run |
| First-try clean on heavy SPA pages | ~50% | 2026-04-22 Google Ads run |
| First try + one retry | ~85% | 2026-04-22 Google Ads run |
| First try + up to 3 retries | 100% (8/8 pages) | 2026-04-22 Google Ads run |
| Pipeline correctly classifies Google Ads PASS/FAIL | 100% (gap of 107 between highest FAIL variance 290 and lowest PASS variance 396) | 2026-04-22 Google Ads run |
| Pipeline correctly classifies Meta Ads Manager PASS/FAIL | 100% (gap of 362 between highest Meta FAIL variance 6 and lowest PASS variance 368) | 2026-04-22/23 Meta stress test |
| Meta /manage/* warm-route capture reliability | 100% first-try (3/3 pages, variances 1523–1700) | 2026-04-22/23 Meta stress test |
| Meta /manage/* cold-navigate reliability (5s settle) | 100% first-try (1/1 pages, variance 1546) | 2026-04-22/23 Meta stress test |
| Meta /audiences cold-navigate reliability (5s settle, different app shell) | 100% first-try on settled frame (variance 368); mid-load spinner frame captured separately and correctly rejected | 2026-04-22/23 Meta stress test |

## Stress test log

### 2026-04-22 — Google Ads (original battle-hardening)
8 audit-page types captured, 100% clean after up to 3 retries. Pipeline correctly rejected every loader frame. Full write-up in `chat_sessions` ID `86f11aac-e4eb-4134-a691-84698c58f013`.

### 2026-04-22/23 — Gap 3 multi-tab fix
`activate_chrome.scpt` rewritten to return `ACTIVATED` / `NOT_FOUND` / `AMBIGUOUS`. All three paths verified against live Chrome. Silent-wrong-client failure mode closed.

### 2026-04-22/23 — MCP tab group lifecycle
- 1-tab close → auto-remove: ✅
- 3-tab partial + out-of-order close: ✅ (group persists until final tab)
- Close-already-closed: returns clear error, no crash: ✅
- Rapid create/close ×3: fresh `tabGroupId` each cycle, zero residue: ✅
- **Parallel-close race:** deterministic on 2/2 reproductions. Closing two tabIds in one tool-call message → first succeeds ("1 tab(s) remain"), second errors ("tab group no longer exists"). Self-healing (both tabs still close), but sequential-close is the documented rule.

### 2026-04-22/23 — Meta Ads Manager E2E (gap 4 partial)
- 4 pages captured: `/manage/campaigns` (cold), `/manage/adsets` (warm), `/manage/ads` (warm), `/audiences` (cold, different app shell).
- 15 captures extracted from session JSONL (4 Google Ads + 11 Meta). 12 PASS, 3 FAIL. All 3 FAILs were loader/intermediate frames correctly rejected.
- Most striking Meta data point: `/audiences` mid-load spinner frame had variance=6 (vs threshold 300) and size=17KB (vs threshold 30KB) — a 362-point gap below threshold. The variance verifier catches Meta's spinner state more decisively than Google Ads' splash.
- Test output: `~/Desktop/meta_stress_test_2026_04_23/` (15 jpgs + manifest.json).

## Reference docs

- `reference/gap-register.md` — open issues, priority ranking, what still needs work
- `reference/next-session.md` — concrete pickup instructions for the next session
- `~/scripts/screenshot_pipeline/README.md` — script-level usage
- `agent_knowledge` SOP ID `56b31f9d-8352-4fcf-8bbf-8186f5092f7f` — canonical DB-level SOP

## Key files

- `/Users/petersonrainey/scripts/screenshot_pipeline/activate_chrome.scpt`
- `/Users/petersonrainey/scripts/screenshot_pipeline/dom_ready_check.js`
- `/Users/petersonrainey/scripts/screenshot_pipeline/strip_banner.js` (mostly superseded by crop-bottom)
- `/Users/petersonrainey/scripts/screenshot_pipeline/capture_pipeline.py`
- `/Users/petersonrainey/scripts/screenshot_pipeline/README.md`
