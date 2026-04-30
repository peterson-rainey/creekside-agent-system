# Known Gotchas and Edge Cases

## Google Ads

- **Ad-blocker blocker dialog (no dismiss button).** If Chrome has an ad-blocker extension enabled, `ads.google.com` shows a modal saying "Turn off ad blockers / Google Ads can't work when you're using an ad blocker." The nav/shell renders but data-bearing requests are blocked -- tables show header-only. **Remediation:** user must disable the ad blocker for `ads.google.com`. Do not try to bypass.
- **Sub-menu nav is nested.** Left-sidebar items like "Keywords" live under a parent like "Audiences, keywords, and content" (an `<a>` with `aria-expanded`). Clicking the parent expands; then click the child `<a>` whose `pathname === '/aw/keywords'`.
- **Account dash format mismatch.** DB stores `1234567890`; UI shows `123-456-7890`. Convert when matching UI text.
- **MCC label quirk.** The Manager account shows as a single compound token in some extractors (observed 2026-04-23: `Creekside MarketingManager 568-042-4954` with no space between "Marketing" and "Manager"). Using `.includes()` with the client name + dashed ID handles this correctly -- do NOT match on whitespace boundaries.
- **PMax insights.** Many insights only surface in the UI. Use `read_page` (accessibility tree) -- `get_page_text` drops too much structure.
- **Shopping product groups.** Hierarchy requires expanding each node. Script the expand clicks via `javascript_tool`.
- **Date range URL params don't always stick.** Always confirm via page text before trusting the range.
- **Saved-view default scope hides paused-campaign content** (added 2026-04-28). Even with table-level "Ad status: All" selected, the saved-view filter at top-left ("All campaigns") includes a "Campaign status: Enabled, Paused" chip that defaults to Enabled-only. Symptom: empty table with "You don't have any enabled ads" message while the API confirms the ad exists. **Fix:** click the "All campaigns" dropdown at top-left -> ensure both "Campaign status" AND "Ad group status" filter chips include "Paused" -> click "Apply view".
- **"Last 30 days" date range excludes today** (added 2026-04-28). The preset defaults to "30 days up to YESTERDAY" (e.g., Mar 29 - Apr 27 when today is Apr 28). Freshly-created ads do not appear in any view scoped to "Last 30 days". **Fix:** switch to "All time", change end date to today via the calendar, or pick the "30 days up to today" radio option in the date picker.
- **"Save ad" button can trigger Google account 2FA** (added 2026-04-28). The RSA editor's "Save ad" click can spawn a "Confirm it's you" dialog followed by a phone/Authenticator approval. Skill rules forbid handling 2FA -- escalate to user. After the user confirms, the editor stays open with form values intact. Re-click "Save ad" to commit.
- **Headline link in the Ads table opens the LANDING PAGE in a new tab, not the editor** (added 2026-04-28). It's a preview link, not an edit link. Edit path: click "View asset details" link in the row -> land on `/aw/unifiedassetreport/rsaassetdetails` -> click pencil icon -> land on `/aw/ads/edit/search`.
- **"View asset details" can navigate to a DIFFERENT ad than the row clicked** (added 2026-04-28). Symptom: clicked row A's "View asset details" but URL shows `adId` for row B. **Fix:** always verify `adId` and `entityId` in the URL after clicking. If wrong, edit the URL directly with the correct `adId` and `adGroupIdForEntity` and re-navigate. Pattern: `/aw/unifiedassetreport/rsaassetdetails?...&entityId={adId}&adGroupIdForEntity={agId}&adId={adId}`.
- **Ad-edit form input via `javascript_tool` value-set requires the React `valueSetter` trick** (added 2026-04-28). Plain `input.value = "..."` does not trigger React state updates and the change is lost on save. Use `Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, newValue)` followed by `dispatchEvent(new Event('input', {bubbles: true}))` and `dispatchEvent(new Event('change', {bubbles: true}))`.
- **Ads in paused or removed campaigns won't render in the standard ads list views** (added 2026-04-28). Even with the saved-view fix above, removed campaigns are excluded entirely. Removed campaigns are read-only at the platform level -- cannot be edited, paused, or modified. Surface in reports but never attempt mutation.

## Meta Ads Manager

- **Two app shells.** `/adsmanager/manage/*` and `/audiences` have different loading behaviors AND different selectors. Do NOT reuse one's ready signals on the other.
- **Top-bar appears late.** On cold `/manage/*` load, the data table renders before the top-bar. If you query for "Review and publish" too early, it isn't there yet. Wait the full 5s settle.
- **Route changes are fast.** After the first cold load, switching `/manage/campaigns` -> `/manage/adsets` is <10ms. Don't over-wait.

## Merchant Center (if a workflow touches it)

- **Tab URL params often redirect.** `?tab=automations` frequently redirects to `/overview`. Use `javascript_tool` to list `[role="tab"]` elements and click by index instead.
- **Angular/Material tables.** `get_page_text` misses dynamic cells -- use `read_page` for the accessibility tree.
- **Source deep-links need `afmDataSourceId`.** Without it, you can only hit the source list page.

## Stress-tested behaviors

- **Navigate + screenshot race** (chrome-screenshot-pipeline, 2026-04-22): parallel tool message -> screenshot captures the previous page. **Fix:** sequential messages.
- **Parallel-close race** (2026-04-22/23): two `tabs_close_mcp` calls in one tool message -> first succeeds, second errors `tab group no longer exists`. **Fix:** sequential + error-tolerant.
- **Google Ads splash** (2026-04-22): 50% first-try success, 100% after up to 3 retries with `ready_check.js`.
- **Meta `/manage/*` cold load** (2026-04-22/23): skeleton top-bar absent for 2-3s after table renders. 100% first-try after 5s settle.
- **Meta `/audiences` cold load** (2026-04-22/23): full-viewport spinner. Variance-verifier caught the spinner-only frame (variance=6 vs threshold 300).
- **Ad-blocker blocker on `ads.google.com`** (2026-04-17 Aura Displays run): no-dismiss modal, tables empty. No scripting bypass -- user must whitelist.
