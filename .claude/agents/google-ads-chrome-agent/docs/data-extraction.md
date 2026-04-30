## Step 7: Sort by the Requested Metric and Extract Data

### 7a — Sort column

Use `execute_javascript` to find and click the sort column header matching `sort_metric`:

| `sort_metric` | Column header text to match |
|---|---|
| `ctr` | "CTR" |
| `clicks` | "Clicks" |
| `conversions` | "Conversions" |
| `cost` | "Cost" |

```javascript
// Find the column header and click for descending sort
const headers = Array.from(document.querySelectorAll('th, [role="columnheader"], .header-cell'));
const target = headers.find(h => h.textContent.trim().toLowerCase() === '{{ sort_metric_label }}');
if (target) {
  target.click();
  // If already sorted ascending, click again for descending
  return 'clicked: ' + target.textContent.trim();
} else {
  return 'header-not-found';
}
```

If the sort click does not work via JavaScript (returns 'header-not-found'), use URL sort parameters:
```
Tool: open_url
url: https://ads.google.com/aw/keywords?ocid={{ google_account_id_numeric }}&dateRange={{ date_range }}&sortColumn={{ sort_metric }}&sortOrder=DESCENDING
```

Wait for page reload, then confirm sort order via `get_page_content`.

### 7b — Extract keyword data

Use `execute_javascript` to extract the keyword table rows:

```javascript
// Extract keyword rows from the Google Ads keywords table
const rows = Array.from(document.querySelectorAll(
  'table tbody tr, [role="row"]:not([role="columnheader"])'
));

const data = rows.slice(0, {{ top_n }}).map(row => {
  const cells = Array.from(row.querySelectorAll('td, [role="cell"]'));
  return cells.map(c => c.textContent.trim()).join(' | ');
});

return JSON.stringify(data);
```

If the JavaScript extraction returns an empty array or fails, fall back to `get_page_content` and parse the text representation of the table manually. Look for rows containing "%" (CTR), "$" (cost), and keyword text.

### 7c — Parse extracted data

Map the raw extracted cells to the structured fields:

| Field | Source |
|-------|--------|
| Keyword text | First cell (usually the clickable keyword name) |
| Match type | "Broad", "Phrase", or "Exact" — look for match type column |
| CTR | Cell containing "%" |
| Clicks | Numeric cell labeled "Clicks" |
| Impressions | Numeric cell labeled "Impr." or "Impressions" |
| Cost | Cell containing "$" labeled "Cost" |
| Conversions | Cell labeled "Conv." or "Conversions" — mark as "not visible" if absent |

**If extraction fails or returns < 1 row:**
- Note the failure, apply `[LOW]` confidence
- Include raw page content excerpt (first 500 chars of the table area) in the response so Peterson can diagnose
- Do NOT fabricate or estimate values

---

## Step 8: Format and Return Results

Return the results in this exact format:

```
## Google Ads Keywords — {{ canonical_name }}
**Account:** {{ google_account_name_from_ui }} ({{ google_account_id }})
**Period:** {{ date_range_label }}
**Sorted by:** {{ sort_metric }} (descending)
**Pulled:** {{ timestamp_utc }}

### Top {{ top_n }} Keywords by {{ sort_metric }}

| # | Keyword | Match Type | CTR | Clicks | Impressions | Cost | Conversions |
|---|---------|------------|-----|--------|-------------|------|-------------|
| 1 | [keyword] | [Broad/Phrase/Exact] | X.XX% | XXX | X,XXX | $X.XX | XX or N/V |
| 2 | ... | | | | | | |
| 3 | ... | | | | | | |

*N/V = not visible in current UI view*

**[source: google-ads-ui, account={{ google_account_id }}, pulled={{ timestamp_utc }}]**
**[HIGH]** — Data scraped directly from live Google Ads UI
```

**Confidence rules:**
- `[HIGH]` — Data successfully extracted from live UI with confirmed account and date range
- `[MEDIUM]` — Extraction succeeded but date range could not be confirmed, or partial data
- `[LOW]` — Extraction failed or returned unexpected results; include raw excerpt

**Stale data flag:** If the account shows a "last synced" or "data delayed" notice anywhere on the page, capture and include it:
> "[DATA DELAY NOTICE: {{ notice_text }}]"

---

