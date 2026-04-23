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
Returns `ACTIVATED: <title>` or `NOT_FOUND: <needle>`.

**Gotcha:** If multiple tabs match the needle (e.g., "Google Ads" matches 3 client tabs), this currently silently picks the first. See `reference/gap-register.md` Gap 3. Use a unique needle like the specific client name.

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

## Measured reliability (2026-04-22)

| Scenario | Rate |
|----------|------|
| Chrome MCP captures what's on screen | 100% |
| First-try clean on heavy SPA pages | ~50% |
| First try + one retry | ~85% |
| First try + up to 3 retries | 100% (8/8 pages) |
| Pipeline correctly classifies PASS/FAIL | 100% (gap of 107 between highest FAIL variance 290 and lowest PASS variance 396) |

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
