## Step 4: Gather Live Evidence

For each complaint type, pull the corresponding evidence. Run data pulls in parallel where possible. Screenshots are captured in Step 5.

### Type 1: Lead Quality / Conversions

**GHL CRM data** (via Bash + GHL API, same pattern as ghl-crm-agent):
```bash
# Count opportunities in pipeline
curl -s -X GET \
  "https://services.leadconnectorhq.com/opportunities/search?locationId=${GHL_LOCATION_ID}&status=open&limit=100" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" | jq '.opportunities | length'

# Get pipeline stages breakdown
curl -s -X GET \
  "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

**Meta messaging connections** (via PipeBoard):
```
get_insights: account_id=act_868498138612020, date_preset="this_month",
  level="account", fields=["messaging_first_reply","cost_per_messaging_first_reply","reach","frequency"]
```

**GHL CRM: recent leads only** (filter to last 14 days):
```bash
# Get opportunities created in the last 14 days
FOURTEEN_DAYS_AGO=$(date -v-14d +%s)000
curl -s -X GET \
  "https://services.leadconnectorhq.com/opportunities/search?locationId=${GHL_LOCATION_ID}&status=open&limit=100&date_range_start=${FOURTEEN_DAYS_AGO}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

**Evidence to capture:** Untouched lead count FROM THE LAST 14 DAYS, average response time for recent leads, current lead status breakdown, messaging connections, cost per connection. Historical CRM data (e.g., "600+ untouched in Jan") can show a pattern but CANNOT be the primary evidence for a current complaint.

### Type 2: Ad Fatigue

**Meta frequency metric** (via PipeBoard):
```
get_insights: account_id=act_868498138612020, date_preset="last_30d",
  level="campaign", fields=["campaign_name","frequency","reach","impressions","spend"]
```

**Creative rotation evidence** (via PipeBoard):
```
get_ad_creatives: account_id=act_868498138612020, fields=["name","status","effective_status"]
```

**Interpretation:** Industry fatigue threshold is 5-10x frequency. If current frequency < 3x, ads are NOT fatigued regardless of how long they have been running.

### Type 3: Out-of-State Leads

**Meta targeting settings** (via PipeBoard):
```
get_adsets: account_id=act_868498138612020, fields=["name","targeting","status"]
```

**Meta geo breakdown** (via PipeBoard):
```
get_insights: account_id=act_868498138612020, date_preset="last_30d",
  level="account", fields=["impressions","reach","spend"],
  breakdowns=["region"]
```

**Evidence to capture:** Geographic targeting settings showing California-only constraint. Geographic delivery breakdown showing where impressions are actually being served.

### Type 4: Performance Declining

**Current Meta metrics** (via PipeBoard):
```
get_insights: account_id=act_868498138612020, date_preset="this_month",
  level="account", fields=["spend","impressions","clicks","ctr","cpc","cpm","actions","cost_per_action_type","reach","frequency"]
```

**Current Google metrics** (via Pipeboard Google):
```
get_google_ads_campaign_metrics: customer_id=5948318044, date_range="THIS_MONTH"
```

**Historical comparison** (from PipeBoard API, NOT from stale database):
```
get_insights: account_id=act_868498138612020, date_preset="last_90d",
  level="account", fields=["spend","impressions","clicks","reach","frequency"],
  time_increment="monthly"
```
If PipeBoard monthly breakdown is unavailable, fall back to Supabase:
```sql
SELECT date, spend, impressions, clicks, reach,
       (spend / NULLIF(clicks, 0)) as cpc
FROM meta_insights_daily
WHERE account_id = 'act_868498138612020'
ORDER BY date DESC LIMIT 90;
```

**Goalpost check trigger:** If she claims performance is worse than before, compare current metrics to the historical satisfaction baselines from Step 1. If current metrics meet or exceed the baseline, this is a goalpost shift, not a performance decline.

### Type 5: Reactive Communication

**ClickUp activity** (from Supabase):
```sql
SELECT source_table, record_id, title, LEFT(snippet, 200)
FROM keyword_search_all('Laleh', 20, 'clickup_entries');
```

**Communication volume** (from Supabase):
```sql
SELECT source_table, count(*) as message_count
FROM keyword_search_all('Laleh', 200)
GROUP BY source_table;
```

### Type 6: Account Paused / Broken

**Campaign status** (via PipeBoard):
```
get_campaigns: account_id=act_868498138612020, fields=["name","status","effective_status","daily_budget"]
```

**Google campaign status** (via Pipeboard Google):
```
get_google_ads_campaigns: customer_id=5948318044
```

---

## Step 5: Capture Screenshots

Use the `chrome-screenshot-pipeline` skill for all screenshots. Visual proof is the entire point of this agent.

### Screenshot Pipeline Steps

**(a) Create a tab:**
```
mcp__claude-in-chrome__tabs_create_mcp
```

**(b) Navigate to target URL:**
```
mcp__claude-in-chrome__navigate -> target URL
```

**(c) Wait and verify readiness:**
Inject `/Users/petersonrainey/scripts/screenshot_pipeline/ready_check.js` via `javascript_tool`. Follow the `cold_settle_ms` / `warm_settle_ms` from the response. Retry up to `max_retries` if `ready=false`.

**(d) Capture screenshot:**
```
mcp__claude-in-chrome__computer action=screenshot tabId=<id> save_to_disk=true
```

**(e) Verify capture:**
Run `capture_pipeline.py` to verify file size >= 30KB and pixel variance > 300. Re-capture on FAIL.

**(f) Teardown (MANDATORY):**
Close all tabs sequentially via `tabs_close_mcp`. Swallow "no longer exists" errors.

### Screenshots to Capture Per Complaint Type

| Complaint | Screenshot Targets |
|-----------|-------------------|
| Lead quality | GHL pipeline view (https://app.gohighlevel.com), Meta campaign performance (https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=868498138612020) |
| Ad fatigue | Meta Ads Manager frequency column |
| Out-of-state | Meta ad set targeting settings, geo breakdown |
| Performance | Meta performance dashboard, Google Ads overview (https://ads.google.com/aw/overview?ocid=5948318044) |
| Reactive | ClickUp task board if accessible via Chrome |
| Account paused | Meta campaign status page, Google Ads campaign page |

### Important Screenshot Rules
- Each substep (navigate, wait, screenshot) is its OWN tool call. No parallelism between navigate and screenshot.
- First navigate to a new app needs `cold_settle_ms`. Subsequent route changes within the same app need only `warm_settle_ms`.
- The post-capture variance+size verifier is always authoritative. If variance < 300 or size < 30KB, retry.

---

## Step 6: Historical Evidence (Goalpost Check Mode Only)

When goalpost shifting is detected, also gather:

**Satisfaction baselines** (from agent_knowledge, loaded in Step 1).

**Historical metrics** (from PipeBoard API):
```
get_insights: account_id=act_868498138612020, date_preset="maximum",
  level="account", fields=["spend","impressions","clicks","reach","frequency"],
  time_increment="monthly"
```
Fallback (Supabase):
```sql
SELECT date, spend, impressions, clicks, reach,
       (spend / NULLIF(clicks, 0)) as cpc
FROM meta_insights_daily
WHERE account_id = 'act_868498138612020'
ORDER BY date;
```

**Satisfaction quotes** (search for moments when she or Kevin expressed happiness):
```sql
SELECT * FROM search_all('Laleh happy satisfied record amazing', 'fathom_entries', 20);
SELECT * FROM keyword_search_all('Laleh happy record month', 20, 'fathom_entries');
SELECT * FROM keyword_search_all('Laleh happy record', 20, 'slack_entries');
SELECT * FROM keyword_search_all('Laleh happy record', 20, 'gmail_summaries');
```

Pull raw text via `get_full_content_batch()` for exact quotes. Summaries are not sufficient for rebuttal evidence.

**Side-by-side comparison format:**
- Column 1: "Period You Were Satisfied" with metrics and dates
- Column 2: "Current Period" with metrics
- Column 3: "Delta" showing the difference
- Conclusion: expectations have increased, not performance decreased

---
