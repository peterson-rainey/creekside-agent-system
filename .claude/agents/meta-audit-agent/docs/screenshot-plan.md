# Screenshot Plan (Meta Audit Agent)

This file defines exactly which screenshots the agent captures during an audit, how many, what URL each one targets, and where they land on disk. Read this during Step 4.5 (Screenshot Pass).

The goal: 3-5 deliverable-grade screenshots per audit, captured by the agent itself via Chrome MCP, that visually back up the most impactful findings.

---

## Output directory

Per audit, everything lives in one folder:

```
~/Desktop/meta-audit-<ACCOUNT_SLUG>-<YYYY-MM-DD>/
├── audit.docx
├── loom-brief.docx
└── screenshots/
    ├── 01-<finding-slug>.png
    ├── 02-<finding-slug>.png
    └── ...
```

`ACCOUNT_SLUG` = account name lowercased, spaces -> hyphens, non-alphanumeric removed. Example: `Dominniks Mortgage Ads` -> `dominniks-mortgage-ads`.

`<finding-slug>` is a short kebab-case label for the finding, e.g. `special-ad-category`, `zero-leads`, `creative-repetition`, `retargeting-frequency`, `targeting-narrow`.

Create the folder before any capture:
```bash
mkdir -p ~/Desktop/meta-audit-<slug>-<date>/screenshots
```

---

## How many screenshots (spend-tier rule)

Read `get_account_info.amount_spent` (lifetime spend in account currency, account's local units -- divide by 100 if the field returns minor units).

| Lifetime spend (USD or CAD equivalent) | Number of screenshots |
|---|---|
| Under $25,000 | 3 |
| $25,000 -- $99,999 | 4 |
| $100,000 or more | 5 |

The agent always captures the top-N findings by severity (CRITICAL > HIGH > MEDIUM), preferring **EASY-SELL FLAGS** as defined in `audit-checklist.md`.

---

## Selection rules (which findings get screenshots)

After Step 5 (running the checklist) is complete, the agent has a ranked list of failed items. Select for screenshot in this priority order:

1. **All CRITICAL failures** that have a visible UI manifestation
2. Then **EASY-SELL FLAGGED HIGH** failures
3. Then **HIGH** failures
4. Skip findings that are not visually demonstrable (e.g., "wrong attribution window" reads better as a number in the PDF -- only worth a screenshot if the value is on a screen the reviewer would credibly land on)

Cap at the spend-tier number. If fewer findings qualify than the tier allows (e.g. 3-tier account has only 2 CRITICAL/HIGH findings), capture only the qualifying ones and note in the deliverable.

---

## Capture recipe per common finding

For each finding the agent picks, look up the recipe below. If a finding does not match a recipe, fall back to the "generic finding" recipe at the bottom.

The `URL` column uses the placeholders `{ACT_NO_PREFIX}` (the numeric account ID without `act_`) and `{ACT}` (the full `act_XXXXXXXXX`). Replace both before navigating.

| Finding (checklist ID) | Slug | URL (after substitution) | What must be visible | Notes |
|---|---|---|---|---|
| 1.1 Pixel not firing / 1.3 No CAPI | `pixel-health` | `https://business.facebook.com/events_manager2/list/pixel?business_id=<BID>` | Pixel row with "Last activity" timestamp and CAPI status column | Requires BID from `get_account_info.business.id`. If not in Business Manager, skip and note in PDF. |
| 2.1 Wrong campaign objective | `wrong-objective` | `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act={ACT}&date=last_30d` | Campaigns table with Objective column visible | Add the Objective column via "Columns -> Customize columns" if not default. |
| 2.5 No retargeting / 2.10 Paused budgets / 2.11 Too many campaigns | `campaign-structure` | Same as 2.1 | Campaigns list with Status + Daily Budget + Spend + Results columns | Last 30d preset |
| 2.8 Missing Special Ad Category | `special-ad-category` | `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act={ACT}` then check the campaign row checkbox, click the pencil Edit icon in the toolbar, then click the **Review** tab (top-right of the edit pane, NOT the Edit tab) | Review pane line: "Special Ad Categories: No categories declared" on a regulated vertical (mortgage, employment, etc.) | **The empty field lives in the Review tab, not the Edit tab.** Verified on the Dominnik build May 18, 2026 -- we wasted several clicks on Edit before finding it. The Edit tab hides the field entirely when none is declared; the Review tab surfaces the absence as text. |
| 3.1/3.4 No custom or retargeting audiences | `audience-gaps` | `https://adsmanager.facebook.com/audiences?act={ACT}` | Audiences table with subtype column visible | Shows clearly if no WEBSITE custom audiences exist |
| 4.1 < 3 ads per adset | `ad-count-thin` | `https://adsmanager.facebook.com/adsmanager/manage/ads?act={ACT}&date=last_30d` | Ads list grouped by adset (toggle "Group by ad set" in column controls) | Visually obvious when there's one ad per adset |
| 4.4 Frequency > 3 | `creative-fatigue` | `https://adsmanager.facebook.com/adsmanager/manage/ads?act={ACT}&date=last_7d` | Frequency column visible, sorted desc, showing values above 3 | Add Frequency column via "Delivery" preset |
| 4.13 Old creatives | `creative-age` | Same as 4.1 | Ads table with Created column visible | Show oldest active ads |
| 5.1 Stuck in learning phase | `learning-limited` | `https://adsmanager.facebook.com/adsmanager/manage/adsets?act={ACT}` | Delivery column showing "Learning Limited" or "Learning" status on active adsets | One row's status badge clicked open shows the diagnostic side panel -- capture with panel open if possible |
| 5.5 Budget spread too thin | `budget-fragmentation` | Same as 2.1 | Campaigns with Daily Budget column visible, all small values | Last 7d for current state |
| 6.1 Wrong attribution window | `attribution-window` | `https://adsmanager.facebook.com/adsmanager/manage/adsets?act={ACT}` then any adset -> Edit -> Conversion section | Conversion window field showing the misconfigured value | |
| 7.2 Audience Network on lead gen | `audience-network` | Adset Edit -> Placements section | Audience Network checkbox enabled on a lead-gen adset | |
| Generic / catch-all | `<custom-slug>` | URL the finding makes most sense on | Whatever data point proves the finding | Agent infers from the finding text |

---

## Capture procedure (per screenshot)

This is the inline loop the agent runs for each chosen screenshot. Sequential, not parallel.

### KEY LEARNING (verified 2026-05-18 on Dominnik's Mortgage Ads)
Direct URL navigation (`navigate url=...?act=<id>&business_id=<bid>`) HANGS indefinitely on "Loading your ad account." when the target account lives in a Business Manager that the MCP tab has not previously warmed in this session. The MCP tab inherits the Chrome profile's login cookie but NOT the BM-scope cookies the user's normal tabs built up.

The reliable workaround is to drive the **account selector UI** inside the SPA. Meta sets up a `redirect_session_id=...` parameter and bootstraps the BM scope only on UI-driven account switches.

### Step-by-step

1. **Create tab group once for the whole pass** (first capture only):
   ```
   mcp__Claude_in_Chrome__tabs_create_mcp
   ```
   Hold the returned `tabGroupId`. Reuse for all subsequent navigations.

2. **Initial warm-load** (first navigate in the pass only): land on the user's default Ads Manager URL with NO `act=` and NO `business_id=`:
   ```
   mcp__Claude_in_Chrome__navigate  url=https://adsmanager.facebook.com/adsmanager/manage/campaigns
   ```
   Wait 8 seconds. Verify ready (Step 5 below). Meta will route to the user's default ad account; this lets the SPA shell hydrate.

3. **Switch to the target account via the account-selector UI** (NOT via URL). This is the only reliable cross-BM nav path:
   - Click the account selector button (top-left of the Campaigns page, shows the current account ID). Coordinate is around `(390, 35)` at 1568x762 viewport; fall back to a JS `querySelector` on a button whose text contains the current account ID.
   - Wait 1.5s for the dropdown to render.
   - Click the search input inside the dropdown (around `(562, 99)`).
   - Type the target account name (or partial). For Dominnik: `Dominniks`.
   - Wait 2s for the search results to populate.
   - Click the matching account row (the text containing the account name). Wait 8s for the SPA to switch BM scope and route.

4. **Direct URL is the fallback only**: If the account is already in the same BM as the user's default (i.e. no BM switch needed), URL nav works fine:
   ```
   mcp__Claude_in_Chrome__navigate  url=<resolved URL with act_>
   ```
   Wait 6s on cold load, 2s on warm intra-app routes.

5. **Verify ready** (lightweight DOM check via `javascript_tool`):
   ```js
   (() => {
     const t = document.body && document.body.innerText || "";
     const tooShort = t.length < 200;
     const sawLoader = /Loading your ad account/i.test(t);
     const sawSpinner = !!document.querySelector('[role="progressbar"], [aria-busy="true"]');
     return { ready: !tooShort && !sawSpinner && !sawLoader, textLen: t.length, loader: sawLoader };
   })()
   ```
   If `ready=false`, wait another 4 seconds and retry once. If `loader=true` after the retry, this is a BM-scope-not-warmed hang. Either re-route via Step 3 (account selector) or abort this screenshot and flag.

6. **Hard timeout on "Loading your ad account."**: After 20 cumulative seconds since the navigate, if the `Loading your ad account` string is still present, abort this screenshot. Do NOT keep waiting. Log: `screenshot skipped: BM scope hang on <account_id>`.

7. **Click any one-time UI prep step** (e.g., open a side panel, expand a column set). Use `javascript_tool` to find and click the element by text match. Wait 1 second after the click.

8. **Screenshot capture -- TWO-STAGE approach** (verified working on macOS 2026-05-18):

   a) **Visual confirmation via Chrome MCP** (Claude sees the image inline, can verify content):
      ```
      mcp__Claude_in_Chrome__computer  action=screenshot  tabId=<id>  save_to_disk=true
      ```
      Note: `save_to_disk=true` does NOT return a file path the agent's Bash can read on macOS. Treat this call as visual-confirmation only -- use it to confirm the right view loaded before the disk capture.

   b) **Disk persistence via macOS `screencapture` -- focus-proof pattern** (verified on macOS 2026-05-18, after observing Slack steal focus from a non-blocking `activate` and capture private channel content):
      ```bash
      # CRITICAL: run activate + frontmost + delay + screencapture ALL inside a
      # single osascript context via `do shell script`. A standalone
      # `osascript activate; sleep 1; screencapture` loses the focus race when
      # Slack, Gmail, or any other app raises a notification window in between.
      osascript <<'EOF'
      tell application "Google Chrome" to activate
      tell application "System Events"
        set frontmost of process "Google Chrome" to true
      end tell
      delay 3
      do shell script "screencapture -x ~/Desktop/_meta-audit-<finding-slug>.png"
      EOF
      ```

      Then crop the top 240 px (= 120 px in screen units on retina) so the Chrome tab bar, URL bar, and Claude-in-Chrome debug banner are gone, and move into the audit folder:
      ```bash
      python3 - <<'PY'
      from PIL import Image
      f = "/Users/$USER/Desktop/_meta-audit-<finding-slug>.png"
      im = Image.open(f); im.crop((0, 240, im.width, im.height)).save(f)
      PY
      mv ~/Desktop/_meta-audit-<finding-slug>.png "$AUDIT_DIR/screenshots/NN-<finding-slug>.png"
      ```

   c) **Content verification (anti-leak guard, MANDATORY)**: after the capture but BEFORE moving into the audit folder, Read the file in Claude and visually confirm it shows Ads Manager (Meta logo, account selector, campaign columns). If it shows ANY other app (Slack, Gmail, ClickUp, Finder, etc.) -- delete the file immediately and re-attempt the capture with a longer `delay 5`. NEVER move a non-Ads-Manager capture into the audit folder; it can leak private channel content into client deliverables.

   **Permission check before first capture in the pass:**
   ```bash
   screencapture -x ~/Desktop/_perm_check.png 2>&1 && \
   test -s ~/Desktop/_perm_check.png && \
   file ~/Desktop/_perm_check.png | grep -q "PNG image" && \
   rm ~/Desktop/_perm_check.png && \
   echo "screencapture OK"
   ```
   If the file is missing, empty, or not a PNG, screencapture permission is denied. Abort the screenshot pass and tell the user: "Screen Recording permission required. Open System Settings -> Privacy & Security -> Screen Recording, enable Claude (or your Terminal app), restart Claude Code, and re-run."

9. **Wallpaper-bug guard**: After every capture, run a quick byte-size sanity check. A pure-wallpaper capture (permission denied silent failure) is usually under 500 KB at retina resolution -- real Ads Manager captures with UI chrome and tables are typically 1.5-4 MB. If size < 500000 bytes, flag the capture as suspicious and re-attempt once. If still suspicious, log and skip.

10. **Repeat** for the next finding.

11. **At the end of the screenshot pass, tear down**. Per Standing Rule 11, every tab MUST be closed:
    ```
    mcp__Claude_in_Chrome__tabs_context_mcp        # list tabs
    mcp__Claude_in_Chrome__tabs_close_mcp tabId=X  # one call per tab, sequential
    ```
    Swallow "no longer exists" errors as success.

---

## Failure modes

| Situation | Action |
|---|---|
| Chrome MCP not available | Skip the screenshot pass entirely. Emit deliverables without embedded screenshots. Flag prominently: "Screenshots skipped -- Claude in Chrome MCP not installed. Install instructions: <link>." |
| Not logged in to Meta | The first navigation lands on `facebook.com/login`. Detect via URL. Pause and report: "Meta Ads Manager session not authenticated. Log in to Chrome at facebook.com and re-run the screenshot pass." Provide a `--skip-screenshots` fallback so the user can still get the PDF. |
| Wrong account loaded after switch | Verify `act=` in the URL after each navigate. If mismatch, re-navigate. |
| Loader frame captured (low variance / tiny file) | After move into the audit folder, run a lightweight size check: `stat -f %z` on the file. If < 30000 bytes, re-capture once. If second attempt also tiny, keep the file but flag it in the PDF as "low-confidence capture." |
| BM-scope hang on "Loading your ad account." | The target account lives in a Business Manager the MCP tab hasn't warmed. URL-direct nav will sit forever. Switch to the account-selector click flow (Step 3 in the capture procedure). If the click flow also fails after 30s, abort the screenshot, log `screenshot skipped: BM scope hang on <account_id>`, and continue to the next finding. |
| `save_to_disk` returns no path the agent can read | Known behavior on macOS as of 2026-05-18. The Chrome MCP screenshot is shown inline in the conversation but no file lands at a Bash-readable path. Persistence is handled by the macOS `screencapture` two-stage approach in Step 8b. Do NOT rely on MCP `save_to_disk` for the audit folder. |
| Screen Recording permission not granted | Pre-flight permission check at the top of Step 8 fails. Tell the user to enable Screen Recording for the Claude Code app in System Settings -> Privacy & Security, then restart Claude Code. Without it, `screencapture` silently captures the wallpaper. |
| Chrome MCP tab not visible when `screencapture` fires | `screencapture` captures whatever's on the active display. If the MCP-driven Chrome tab is hidden behind another window or in a different desktop space, the capture won't show Ads Manager. The Step 8b `osascript -e 'tell application "Google Chrome" to activate'` + `-T 1` delay handles foregrounding. If a different Chrome window is active (multiple Chrome windows open), use `osascript` to also select the right window by URL match before activating. |
| BID required but account is personally shared (not in BM) | For pixel/Business Manager screenshots, skip and substitute with a finding-text-only entry in the PDF. Note: "Account is personally shared with Peterson, not under a Business Manager. Pixel screenshot unavailable via business.facebook.com." |
| Account switcher needed | The `act={ACT}` query param is sufficient -- never depend on UI account switching. |
| Login expired mid-pass | Detect via URL match on `login.php` or `checkpoint`. Pause and report. |

---

## Filename convention summary

```
~/Desktop/meta-audit-<slug>-<YYYY-MM-DD>/screenshots/<NN>-<finding-slug>.png
```

`NN` = capture order, zero-padded.
`<finding-slug>` = the slug from the table above, or a custom one.

Example for Dominnik:
```
~/Desktop/meta-audit-dominniks-mortgage-ads-2026-05-18/screenshots/
├── 01-special-ad-category.png
├── 02-zero-leads.png
└── 03-creative-repetition.png
```

The PDF generator reads these filenames to embed each image inline next to its finding.
