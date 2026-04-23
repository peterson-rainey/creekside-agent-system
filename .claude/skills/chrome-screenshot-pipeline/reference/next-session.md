# Next Session Handoff — Chrome Screenshot Pipeline

**Last session:** 2026-04-22 (extended, worktree `elated-khorana-575b21`)
**Session duration:** ~10 hours across multiple user messages
**Primary outcome:** Screenshot pipeline working autonomously at 100% success after retries, on Google Ads. 5 files shipped, SOP saved to DB, skill created.

## TL;DR — Where we are

The screenshot piece works. Agents can reliably capture authenticated web pages using Claude in Chrome + a retry-on-loader pattern + a post-extract verification step. Proven against Google Ads with 8/8 pages captured cleanly after up to 3 retries.

The work ahead is breadth (more apps) and robustness (scheduled runs, multi-tab ambiguity, auth expiry), not core functionality.

## How we got here (condensed)

1. **Original problem:** Perfect Parking audit PDF shipped with 16 fake screenshots — all macOS wallpaper. Pipeline appeared to work but was producing garbage.
2. **Root cause:** macOS `screencapture` silently returns wallpaper when Screen Recording permission isn't granted. The old pipeline used that as a fallback.
3. **Fix direction:** Switch to Chrome MCP's native viewport capture. But that introduced its own issues.
4. **Problem 2:** Chrome MCP's `save_to_disk: true` doesn't actually save to a filesystem path — it stores in an internal buffer.
5. **Fix:** Extract images directly from the Claude Code session JSONL file (base64 decode).
6. **Problem 3:** The extractor grabbed ALL images from JSONL, including PDF page renders from unrelated sub-agents. 1/8 images was actually a Chrome screenshot.
7. **Fix:** Added `tool_name` filter — only extract from tool results where the originating tool is `mcp__Claude_in_Chrome__computer`.
8. **Problem 4:** Google Ads has a splash animation that runs AFTER `readyState=complete`. DOM-ready polling returns true but the viewport still shows a loader. Captures were half-loaded.
9. **Fix:** Retry-on-loader pattern — after each capture, if variance < 300 or size < 30KB, wait 5s and re-capture.
10. **Problem 5:** Even with retries, the real question was "did the page actually render what we wanted?" Visual inspection of every image was required.
11. **Fix:** Pipeline verification catches loader frames with 100% accuracy (clean gap of 107 between highest FAIL variance and lowest PASS variance).

## Files and locations

### Scripts (stable location, version-controlled at `~/scripts/`)
- `/Users/petersonrainey/scripts/screenshot_pipeline/activate_chrome.scpt`
- `/Users/petersonrainey/scripts/screenshot_pipeline/dom_ready_check.js`
- `/Users/petersonrainey/scripts/screenshot_pipeline/strip_banner.js` (mostly superseded)
- `/Users/petersonrainey/scripts/screenshot_pipeline/capture_pipeline.py`
- `/Users/petersonrainey/scripts/screenshot_pipeline/README.md`

### Skill (this directory)
- `.claude/skills/chrome-screenshot-pipeline/SKILL.md`
- `.claude/skills/chrome-screenshot-pipeline/reference/gap-register.md`
- `.claude/skills/chrome-screenshot-pipeline/reference/next-session.md` (this file)

### Database
- `agent_knowledge` ID `56b31f9d-8352-4fcf-8bbf-8186f5092f7f` — canonical SOP

### Test outputs (can delete, just for reference)
- `/Users/petersonrainey/Desktop/pipeline_test/` — first pipeline run (pre-fixes)
- `/Users/petersonrainey/Desktop/pipeline_test2/` — after tool_name filter added
- `/Users/petersonrainey/Desktop/pipeline_test3/` — final run, 36 captures, 20 PASS / 16 FAIL

## Quick test to verify the pipeline still works

```bash
# Run the pipeline against the current session
python3 /Users/petersonrainey/scripts/screenshot_pipeline/capture_pipeline.py pipeline \
  --session-dir ~/.claude/projects/<your-project-slug>/ \
  --out-dir /tmp/screenshot_test/ \
  --min-size 30000 \
  --crop-bottom 80

# Should output: extracted N images, PASS/FAIL/WARN counts, manifest.json
```

If that runs clean, the pipeline is still functional.

## What to do first in the next session

Priority order from the gap register:

### Option A — Harden for multi-client work (recommended first)
1. Read `reference/gap-register.md` fully
2. **Fix Gap 3** — update `activate_chrome.scpt` to return `AMBIGUOUS:` when multiple tabs match. 30 min of AppleScript. Prevents the "wrong client screenshot" risk.
3. Test the updated script against a browser with multiple Google Ads tabs open.

### Option B — Broaden to other apps
1. Profile one of: Meta Ads, Square, Fathom, ClickUp
2. Open the app, watch DOM while navigating, identify splash selectors
3. Add selectors to `dom_ready_check.js`
4. Run a 5-page capture test, measure reliability
5. Document per-app settle times in the skill

### Option C — Build the retry orchestrator (Gap 8)
1. Research: can we call Chrome MCP tools from Python via the Claude Agent SDK?
2. If yes: build `capture_pipeline.py capture --url X` that does navigate → poll → capture → verify → retry in a single command
3. If no: keep the pattern as SOP, document more clearly

## Open design questions

1. **Scheduled runs:** Do we commit to "Chrome must be open during scheduled captures" OR pivot to Playwright for unattended work? (Gap 1) — This is the biggest unresolved strategic question.

2. **Per-app vs generic verification:** Current variance threshold (300) is tuned for Google Ads. Should each app have its own threshold, or use relative comparison to a known-good baseline?

3. **Banner detection:** Current crop is 80px hardcoded. If Claude in Chrome ever moves the banner, every capture breaks silently. Worth auto-detecting?

## Gotchas to remember

- **Don't batch navigate + screenshot in parallel.** They race. Always sequential messages.
- **Don't trust DOM-ready alone.** SPAs animate AFTER readyState. Always verify the capture itself.
- **Don't use macOS screencapture.** It returns wallpaper silently when permissions aren't granted.
- **Don't trust a single capture of an animated page.** Always retry on loader detection.
- **Don't assume the extractor's PASS verdict is correct without spot-checking.** Especially on borderline variance values (280-320).

## One-line summary for whoever picks this up

"The screenshot pipeline works — use the skill + retry on loaders + verify with the pipeline script. The gap register says what's next."
