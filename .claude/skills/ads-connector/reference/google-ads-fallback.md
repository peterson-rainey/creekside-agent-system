# Google Ads 3-Tier Fallback Chain

When pulling Google Ads data, ALWAYS follow this waterfall. Do NOT skip tiers. Start at Tier 1 and only escalate when the current tier fails.

**Write operations require Tier 1.** If Tier 1 is rate-limited and the user needs a write (campaign change, bid update, keyword addition), tell the user they must wait for the rate limit to clear. Tiers 2 and 3 are read-only. Do NOT attempt writes via Tiers 2 or 3.

---

## Tier 1: Google Ads MCP (Pipeboard Google)

**Try this first.** Full read + write surface, live data.

- **Namespace:** `mcp__claude_ai_Pipeboard_google__*` (pre-declared) or `mcp__da1177e9-4cc5-4a06-8588-8631c91d4c03__*` (deferred)
- **How to call:** Use `ToolSearch` to fetch the tool schema, then call it directly
- **Example:** `list_google_ads_customers`, `get_google_ads_campaign_metrics`, `execute_google_ads_gaql_query`

**Rate limit detection (escalate to Tier 2 when you see these):**
- Error message containing `rate limit`, `quota exceeded`, `RESOURCE_EXHAUSTED`, `429`, or `too many requests`
- Timeout with no response after 30+ seconds
- Generic MCP connection error or `503`
- Any Pipeboard-specific throttle message

**When rate-limited:** Log the error, tell the user "Google Ads MCP is rate-limited (Pipeboard issue), falling back to Dashboard API", then proceed to Tier 2.

---

## Tier 2: Creekside Dashboard API (WebFetch)

**Second attempt.** Read-only, pulls live data through our own Next.js API on Railway.

- **Base URL:** `https://creekside-dashboard.up.railway.app`
- **Requires:** `WebFetch` tool access
- **Account list:** `GET /api/google/accounts`
- **Performance data:** `GET /api/google/insights?account_id=[id]&date_range=last_30_days`
- **Campaign data:** `GET /api/google/campaigns?account_id=[id]`
- **Keyword data:** `GET /api/google/keywords?account_id=[id]`

**Limitations vs Tier 1:**
- Read-only (no campaign changes, no bid updates, no keyword additions)
- Narrower data surface (no auction insights, no hour-of-day, no asset groups)
- Rate-limited to one call per account per 5 minutes (built into the dashboard)

**Failure detection:** HTTP 500, 502, 503, timeout, or empty response body.

**When this fails:** Tell the user "Dashboard API is also unavailable, falling back to Chrome browser extraction", then proceed to Tier 3.

---

## Tier 3: Chrome Browser Navigation (Ultimate Fallback)

**Last resort.** Scrapes data directly from the Google Ads web UI. Read-only.

- **Skill:** Use the `chrome-browser-nav` skill flow
- **Target:** `https://ads.google.com/aw/overview?ocid=[customer_id]`
- **Prerequisites:** Chrome must be open and already logged into Google Ads. Agent cannot handle login or 2FA.

**How to use:**
1. Follow `chrome-browser-nav` skill steps (tabs_context, navigate, ready_check, extract, teardown)
2. Navigate to the relevant Google Ads page (keywords, campaigns, etc.)
3. Use `javascript_tool` to extract table data from the UI
4. Parse and format the extracted data

**Limitations vs Tier 1 and 2:**
- Read-only (absolutely no writes)
- Requires Chrome to be open and logged in on Peterson's machine
- Fragile (UI changes can break selectors)
- Slower (multiple sequential tool calls)
- Cannot run in background/scheduled contexts (needs live browser)

**When Tier 3 also fails:** Report to the user that all three tiers failed. Suggest trying again later or querying Supabase historical tables (`google_ads_insights_daily`) for yesterday-and-older data.

---

## Summary

```
Tier 1: Google Ads MCP ──[rate limited/error]──> Tier 2: Dashboard API ──[error]──> Tier 3: Chrome Browser
     |                                                  |                                    |
  Full R+W, live                                  Read-only, live                     Read-only, live UI
  Best data surface                               Narrower surface                    Fragile but universal
```

## Citation by tier

- Tier 1: `[source: Google Ads MCP, customer_id, date_range]`
- Tier 2: `[source: Dashboard API, customer_id, date_range]`
- Tier 3: `[source: Google Ads UI/Chrome, customer_id, date_range]` with `[MEDIUM]` confidence
