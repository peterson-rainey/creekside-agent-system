## Step 3: Verify Chrome Is Open and Logged In

### 3a — Check Chrome state

Use `get_current_tab` to verify Chrome is responding. If it fails, report:
> "Chrome is not responding. Make sure Chrome is open and try again."

### 3b — Navigate to Google Ads

```
Tool: open_url
url: https://ads.google.com/
```

Wait for the page to load, then use `get_page_content` to check the page state.

### 3c — Login check

Scan the page content for login indicators:
- **Logged in signals:** URL contains `ads.google.com/aw/` or page contains "Campaigns", "Overview", account name
- **Logged out signals:** Page contains "Sign in", "Choose an account", "google.com/accounts", or redirects to accounts.google.com

**If NOT logged in:**
> "Google Ads is not showing a logged-in session. Please log in to ads.google.com in Chrome and then re-run this agent. I cannot handle login or 2FA — that must be done manually."
STOP immediately. Do NOT attempt to fill in credentials.

**Confidence tag:** `[LOW]` until login confirmed. Switch to `[HIGH]` after verified.

---

## Step 4: Switch to the Correct Ad Account

Google Ads supports multiple accounts. The `google_account_ids` array from `find_client()` gives you the account identifier(s).

### 4a — Navigate to account switcher

Google Ads account IDs are formatted as `XXX-XXX-XXXX` (with dashes) in the UI. The raw ID from the database may be stored without dashes (e.g., `1234567890`) — format it as `123-456-7890` for UI matching.

### 4b — Check current account

Use `get_page_content` to read the current account name/ID shown in the top-left of Google Ads (near the account selector dropdown). Compare against the target `google_account_ids`.

**If already on the correct account:** Proceed to Step 5.

**If on the wrong account:**

Navigate to the account switcher:
```
Tool: open_url
url: https://ads.google.com/aw/overview
```

Use `execute_javascript` to find and click the account switcher:
```javascript
// Attempt to find the account name element and read it
const accountEl = document.querySelector('[data-account-name], .account-name, [aria-label*="account"]');
return accountEl ? accountEl.textContent.trim() : document.title;
```

Then navigate directly to the account using the numeric ID:
```
Tool: open_url
url: https://ads.google.com/aw/overview?ocid={{ google_account_id_numeric }}
```

After navigation, use `get_page_content` to confirm the correct account is active. If it still shows the wrong account, try the account switcher URL format:
```
Tool: open_url
url: https://ads.google.com/nav/selectaccount?dst=/aw/keywords&authuser=0
```

**If account cannot be found after 2 attempts:**
Report:
> "I navigated to Google Ads but couldn't switch to the account for {{ canonical_name }} (account ID: {{ google_account_id }}). The account may not be accessible under the currently logged-in Google user, or the account ID in our system may be outdated. Please check manually."
STOP with `[LOW]` confidence.

---

## Step 5: Navigate to the Keywords Report

### 5a — Navigate to Keywords tab

```
Tool: open_url
url: https://ads.google.com/aw/keywords?ocid={{ google_account_id_numeric }}
```

Use `get_page_content` after load to confirm the Keywords table is visible (look for "Keyword", "Match type", "CTR", "Clicks" in the page content).

**If the page shows "No data" or an empty table:** Note this. If it's a date range issue, proceed to Step 6 first, then re-check.

**If the Keywords tab is not found:**
Try the alternative navigation path:
```
Tool: open_url
url: https://ads.google.com/aw/keywords
```

---

## Step 6: Set Date Range

The date range picker in Google Ads UI is controlled via URL parameters or UI interaction.

### 6a — Map input to Google Ads date preset

| `date_range` input | Google Ads URL param |
|--------------------|---------------------|
| `LAST_7_DAYS` | `dateRange=LAST_7_DAYS` |
| `LAST_30_DAYS` | `dateRange=LAST_30_DAYS` |
| `LAST_90_DAYS` | `dateRange=LAST_90_DAYS` |
| `THIS_MONTH` | `dateRange=THIS_MONTH` |

### 6b — Apply via URL

Append the date range to the keywords URL:
```
Tool: open_url
url: https://ads.google.com/aw/keywords?ocid={{ google_account_id_numeric }}&dateRange={{ date_range }}
```

Use `get_page_content` to confirm the date range is reflected in the page (look for the date range label in the page content).

**If URL param does not set the date range reliably** (check via page content — if the displayed date range doesn't match), use `execute_javascript` to click the date range picker:
```javascript
// Find the date range selector button
const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
const dateBtn = buttons.find(b => b.textContent.includes('Last 30') || b.textContent.includes('Last 7') || b.getAttribute('data-date') !== null);
return dateBtn ? dateBtn.textContent.trim() : 'date-button-not-found';
```

If JavaScript interaction is needed, report the selector used in the session notes (Step 9) for future optimization.

---
