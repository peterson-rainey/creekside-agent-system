# Screenshot Pipeline — Gap Register

Known issues and open work, ranked by priority. Last updated: 2026-04-23.

## ✅ Validated and working

| Piece | Evidence |
|-------|----------|
| Chrome MCP viewport capture | 36 captures in pipeline_test3, zero wallpaper |
| Tool-name filter (only MCP screenshots extracted) | No PDF renders or other images leaked into extract output |
| Banner crop (80px bottom) | All 36 captures = 1568×658, banner gone |
| MD5 full-content dedup | Unique frames preserved, exact duplicates dropped |
| Variance + size verdict | Gap of 107 between highest FAIL (290) and lowest PASS (396) — threshold of 300 sits cleanly between |
| Retry-on-loader pattern | 8/8 Google Ads pages captured cleanly within 3 retries |
| Sequential tool-call pattern (navigate / poll / capture in separate messages) | Zero race conditions when followed |
| **Multi-tab ambiguity detection (Gap 3 FIXED 2026-04-23)** | Three-case return (`ACTIVATED` / `NOT_FOUND` / `AMBIGUOUS`) tested end-to-end; all 3 paths verified against live Chrome |
| **MCP tab group teardown (added 2026-04-22)** | Stress-tested with 4 scenarios: 1-tab close (auto-removes group), 3-tab group with partial + out-of-order close (group persists until last tab), close-already-closed (returns clear error, caller must catch), rapid create/close cycles (fresh `tabGroupId` each time, zero residue). Step 4 documented as mandatory in SKILL.md and README.md. |

## P0 — Will break in production

### Gap 1: Scheduled/unattended runs not tested
The pipeline has only run inside an active Claude session with a user at the computer. For Railway cron agents (overnight audits), the Chrome MCP extension needs a running Chrome instance. If Mac sleeps or Chrome is closed, no captures.

**Fix direction:**
- Option A: Document that scheduled runs require Chrome open + Mac awake
- Option B: Pivot to Playwright with `storageState` for truly unattended runs
- Needs decision + testing

### Gap 2: Auth session expiry mid-batch
Observed this session: Google logged out mid-work, required account-chooser click. Autonomous agents have no human to click.

**Fix direction:** Pre-capture auth check (poll a known protected URL, verify logged in). For true autonomous: Playwright `storageState`.

## P1 — Silent bad captures, fix soon

### Gap 3: Multi-tab ambiguity in activate_chrome.scpt — ✅ FIXED 2026-04-23
Two-pass AppleScript rewrite: collect all matches first, return `ACTIVATED` only on single match, `AMBIGUOUS: N matches | <t1> || <t2> ...` on 2+ (no activation), `NOT_FOUND` on zero. Verified with live test — 4-tab match returned AMBIGUOUS with all four titles, unique needle ("South River Mortgage") returned ACTIVATED, nonsense needle returned NOT_FOUND. SKILL.md and README.md updated with the three-case contract.

### Gap 4: Non-Google-Ads apps untested
Pipeline tuned specifically to Google Ads splash (`svg.la-b`, 20s settle). Meta Ads, Square, Fathom, ClickUp all have different patterns.

**Fix direction:** Profile each app once. For each:
1. Navigate while watching DOM in real time
2. Identify the splash selector
3. Measure typical splash duration
4. Add to `dom_ready_check.js` spinner selectors
5. Update skill docs with per-app settle time recommendations

## P2 — Known but unlikely to bite in normal use

### Gap 5: Chrome full-screen mode
AppleScript `set index of w to 1` doesn't switch macOS Spaces. Full-screen Chrome on a different Space silently fails activation.

**Mitigation:** Document "don't run capture batches while Chrome is full-screen," OR add bounds check (full-screen window size === display size → error).

### Gap 6: Autocompact chain
Investigated — autocompact files land in `subagents/agent-acompact-*.jsonl` under current project dir. Pipeline's `**/subagents/agent-*.jsonl` glob already catches them. **Working correctly**, no fix needed.

### Gap 7: Variance threshold calibrated for Google Ads only
Current: 300. Other apps may have different variance distributions (darker UIs lower, lighter UIs higher).

**Fix direction:** Per-app threshold config, OR relative threshold (compare to known-good baseline).

## P3 — Nice to have

### Gap 8: Retry loop is SOP, not reusable code
Agents must implement retry themselves (documented but not wrapped). A Python orchestrator wrapper would be cleaner.

**Blocker:** Would need Python access to Chrome MCP, which requires Claude Agent SDK. Worth exploring.

### Gap 9: Banner crop hardcoded at 80px
Works for current Claude in Chrome extension. If UI changes, crop becomes wrong.

**Fix direction:** Make crop configurable per-app, OR detect banner dynamically via edge color analysis.

### Gap 10: DOM-ready heuristics imperfect
- Text length check (>200 chars) could false-positive on sparse valid pages
- `[class*="loading"]` wildcard could match persistent nav elements on some apps

**Mitigation already exists:** retry-on-variance-fail catches these. DOM-ready is just the first gate.

## Not tested (known unknowns)

- Parallel captures of different tabs (race conditions unknown)
- Long sessions (>50 captures — JSONL size unknown)
- Sessions with autocompact firing mid-run
- Fresh Mac without prior tooling/permissions
- Running the pipeline from a scheduled cron context
- Any app other than Google Ads
- Firefox/Safari (Chrome MCP is Chrome-only)
- Headless Chrome (would need different tooling entirely)

## Recommended priority order for next session

1. **Fix Gap 3 multi-match in `activate_chrome.scpt`** (30 min, prevents wrong-client captures)
2. **Profile Meta Ads / Square splash selectors** (1-2 hr each, broadens coverage)
3. **Decision on Gap 1 scheduled runs: Chrome MCP vs Playwright?** (1 hr discussion + research)
4. **Gap 2 auth expiry detection** (1 hr, needed for any multi-page batch)
5. **Gap 8 capture orchestrator wrapper** (2-3 hr, makes retry reusable)

Everything below P1 can wait for real failures in the wild.
