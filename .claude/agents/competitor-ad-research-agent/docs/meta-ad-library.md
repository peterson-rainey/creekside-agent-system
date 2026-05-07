## Meta Ad Library Research (Phases M1–M5)

---

## Section A: Path Selection (check this first)

Before doing anything else, check whether a Meta API token is available:

```bash
echo $META_AD_LIBRARY_TOKEN
```

| Result | Path to use |
|--------|-------------|
| Empty / unset | **Section B: Chrome path (default)** |
| Returns a token value | You may use **Section C: API path (opt-in)** OR still use Chrome -- both work. Chrome is the simpler UX. |

**Default is always Chrome.** The API path requires a Meta app with App Review approval -- significant setup friction. Chrome requires a one-time "Always allow facebook.com" approval in Claude Code's Chrome MCP settings, then no further prompts.

---

## Section B: Chrome Path (Primary -- Default)

### Permission Setup (one-time)

The Meta Ad Library is on `facebook.com`. The first time `navigate` is called for a `facebook.com` URL, Chrome MCP will prompt for permission. Grant "Always allow for facebook.com" in the Claude Code MCP settings popup. After that, all subsequent facebook.com navigates in this and future sessions are prompt-free.

If the prompt fires mid-run (user hasn't set "Always allow" yet):
1. The navigate call will block waiting for approval.
2. Tell the user to click "Always allow for facebook.com" in the Claude Code permission popup.
3. After they grant it, retry the navigate. Do not restart the session.

### Tab Management

```
1. tabs_context_mcp         -- verify active tab group at session start
2. tabs_create_mcp          -- create a dedicated tab for Ad Library browsing
3. [research -- see below]
4. tabs_close_mcp           -- MANDATORY teardown, every tab, sequentially
                               Swallow "tab no longer exists" errors as success.
```

Create one tab per advertiser if running sequential research, or reuse a pool of 2-3 tabs for multi-advertiser runs. Guard against Chrome window-switching: if the run involves long waits (e.g., scroll-wait loops), call `tabs_context_mcp` again after the wait to confirm the tab group hasn't shifted.

**Teardown is mandatory regardless of success or failure.** If the run errors out mid-way, still close all tabs you opened before surfacing the error.

### URL Pattern

```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=COMPETITOR_NAME&search_type=keyword_unordered&media_type=all
```

Replace `COMPETITOR_NAME` with the URL-encoded competitor name (spaces as `+` or `%20`).

For page-locked search (when you have the advertiser's Facebook Page handle):
```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=COMPETITOR_NAME&search_type=advertiser&media_type=all
```

### Page Rendering

- **Wait 4-5 seconds after navigate** before reading. The Ad Library is canvas-rendered and lazy-loads ad results.
- **Use `read_page` with `filter: all` and `depth: 7` (or 8 if results are sparse).** This is the proven extraction method -- it returns ad block data cleanly.
- Set `max_chars: 35000` to avoid overflow. If overflow still occurs, drop depth to 6.
- **Do NOT use `get_page_text`** -- it fails on Meta's heavy DOM ("page too large" error).
- **Do NOT use `javascript_tool`** -- Facebook blocks JS execution from extensions on facebook.com pages.

### Search Modes

**Keyword search** (`search_type=keyword_unordered`) -- loose, surfaces all advertisers running ads mentioning the query term. Use this for:
- Initial discovery of who is advertising in a space
- The attack-pass (Phase M3) -- intentionally loose to find attackers
- When you don't have the advertiser's Page handle

**Page-locked search** (`search_type=advertiser`) -- precise, returns only ads from the advertiser whose page name matches the query. Use this when you want to research a specific competitor's own ad library. Note: Meta sometimes silently downgrades this to keyword search. Verify by checking the page header after load -- it should say "Ads for [exact advertiser name]" not a broad results count.

**Page Transparency workaround (most precise):** Navigate directly to the advertiser's Facebook Page, then click "Page Transparency" > "View in Ad Library." This is the most reliable page-locked method because it uses the Page's internal ID directly, not a name match.

```
1. Navigate to: https://www.facebook.com/{page_handle}/
2. Wait 3 seconds for page load
3. read_page to find "Page Transparency" section and "View in Ad Library" link
4. navigate to that link
5. Wait 4 seconds
6. read_page filter=all depth=7 max_chars=35000
```

### Data Extraction Per Ad

Each ad in the `read_page` output appears as a structured accessibility block. Walk the tree by these markers:

| Data point | Where to find it in read_page output |
|---|---|
| `ad_id` | `Library ID: NNN` text node |
| `start_date` | `Started running on DATE` text node |
| `status` | `Active` or `Inactive` label |
| `advertiser_name` | `image "X"` or `link href="https://www.facebook.com/{handle}/"` |
| `page_handle` | The `{handle}` portion of the advertiser's Facebook page link |
| `body_text` | `button > generic` block (first occurrence per ad) |
| `headline` | Subsequent `button > generic` block (second occurrence) |
| `sub_headline` | Third `button > generic` block if present |
| `cta_text` | Last `button > generic` block (often "Learn More", "Shop Now", etc.) |
| `destination_url` | `link href="https://l.facebook.com/l.php?u=..."` (decode the `u=` parameter) |

The pattern is consistent across ad blocks. Build a parser that walks these markers for each `Library ID:` occurrence.

**Record per ad:**
```
Library ID: [ad_id]
Advertiser: [name]
Page Handle: [handle from link href]
Status: Active / Inactive
Started: [date]
Body: [verbatim text]
Headline: [verbatim text]
Sub-headline: [verbatim text, if present]
CTA: [button text]
Destination URL: [decoded URL]
```

### Pagination (Scrolling)

Meta's Ad Library lazy-loads additional ads as you scroll. After the initial `read_page`:

1. `computer action=scroll` -- scroll down at page center coordinates
2. Wait 4-5 seconds (lazy-load fires after scroll)
3. `read_page filter=all depth=7` again
4. Count new Library IDs found that weren't in the previous read
5. Repeat steps 1-4 until 3 consecutive scrolls produce zero new ads

Stop and move to the next competitor. Do not loop indefinitely.

### Phase M1 via Chrome: Resolve Advertiser Identifiers

For each competitor name, do one of the following to establish a precise page handle:

**Method 1 (preferred): Direct URL test**
- Navigate to `https://www.facebook.com/{guessed_handle}/` (e.g., `gorgiasio`, `gorgias.io`, `gorgiasapp`)
- If the page loads a real Facebook Page, capture the handle from the URL after any redirect
- Record confidence: HIGH if the page name exactly matches the competitor name

**Method 2: Keyword search + inspect results**
- Navigate to Ad Library with `search_type=keyword_unordered&q=COMPETITOR_NAME`
- In the `read_page` output, find the first advertiser link (`link href="https://www.facebook.com/{handle}/"`)
- Cross-check: does the Page name match the competitor we expect?
- Record confidence: HIGH if exact match, MEDIUM if near-match (e.g., "Gorgias Inc" vs "Gorgias"), LOW if name is ambiguous

**Method 3: Page Transparency path**
- Navigate to `https://www.facebook.com/{name_as_slug}/`
- Look for the "Page Transparency" section in `read_page` output
- The Ad Library link in Page Transparency contains the numeric Page ID if needed

**Record per competitor:**
```
Competitor: [name]
FB Page Handle: [handle]
Page Name (as shown): [exact name from FB]
Confidence: HIGH / MEDIUM / LOW
Resolution method: direct-url / keyword-search / page-transparency
```

### Phase M2 via Chrome: Pull Ads Per Advertiser

For each competitor with a resolved handle:

1. Navigate to the page-locked Ad Library URL (using `search_type=advertiser` or the Page Transparency path)
2. Wait 4-5 seconds
3. `read_page filter=all depth=7 max_chars=35000`
4. Extract all ad blocks (by `Library ID:` markers)
5. Scroll and read until no new ads appear (3 consecutive empty scrolls)
6. If `search_type=advertiser` silently downgrades (page header shows broad results), switch to the Page Transparency method

For competitors without a confirmed handle, use `search_type=keyword_unordered` and flag all results as `MEDIUM confidence -- keyword search`.

### Phase M3 via Chrome: Competitive Attack Pass

**Goal:** Find advertisers who are attacking an incumbent by name in their ad copy.

For each attack-pass target (default: the largest competitor per vertical by ad count):

1. Navigate to: `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=INCUMBENT_NAME&search_type=keyword_unordered&media_type=all`
2. Wait 4-5 seconds
3. `read_page filter=all depth=7 max_chars=35000`
4. Extract all ad blocks
5. **Post-filter:** Remove any ads where the `page_handle` in the advertiser link matches the incumbent's own handle. What remains is the attack-ad landscape.
6. Scroll and read until 3 consecutive scrolls produce no new ads

This is exactly how the Gorgias / Brandwise / Hoop AI / Noem.AI attack-pass was run in the session that produced this Chrome-first refactor. The `keyword_unordered` mode's looseness is the feature here -- it finds any advertiser whose ad copy contains the incumbent's name.

**Why this matters:** Attack ads reveal pricing pressure points, product weaknesses, positioning gaps, and what differentiated messaging is landing. This is the highest-signal data in the research flow.

**Selecting attack-pass targets:**
- If `attack_pass_targets` was provided as input, use that list verbatim.
- Otherwise, auto-select the largest competitor per vertical (by active ad count from Phase M2). One target per vertical minimum; up to two per vertical in highly competitive spaces.

---

## Section C: API Path (Opt-In -- when META_AD_LIBRARY_TOKEN is set)

**Path B: API (opt-in, when `META_AD_LIBRARY_TOKEN` is set in the environment).**

Use this path when the token is available and you prefer structured JSON over DOM parsing. The API path requires App Review for standard-tier access (commercial competitor research). See prerequisites below before using with a fresh app.

### Access Token Setup

**Resolution order:**
1. Check env var: `echo $META_AD_LIBRARY_TOKEN`
2. Check `agent_knowledge WHERE title ILIKE '%meta%app%token%' OR title ILIKE '%pipeBoard%meta%'`
3. If neither: route to Chrome (Section B). Do not attempt API research without a token.

```bash
TOKEN=$(echo $META_AD_LIBRARY_TOKEN)
```

### Prerequisites: API Access Tiers and App Review

**Ad Library API tiers:**

- **Basic tier (no App Review needed):** Returns ads from your own app's pages, plus political/issue ads. Limited for commercial research.
- **Standard tier (requires App Review):** Returns ads from any commercial advertiser. Required for real competitor research. Request `ads_read` via Meta App Dashboard > App Review > Permissions and Features.

If basic tier only, you'll see `(#10) This endpoint requires the 'ads_read' permission` for commercial advertisers. Tell the user: "Your Meta app needs App Review approval for `ads_archive` to research commercial competitors."

**`pages/search` endpoint:** Requires `pages_read_engagement` permission (App Review). A fresh Meta app will hit a permission error. Fallback: use Chrome (navigate to `https://www.facebook.com/COMPANY_NAME`) to find the page ID from the page source.

### Phase M1 via API: Resolve Advertiser Page IDs

For each competitor name:

```bash
curl -s "https://graph.facebook.com/pages/search?q=COMPETITOR_NAME&type=PAGE&fields=id,name,fan_count,verification_status,category&limit=10&access_token=$TOKEN"
```

**Disambiguation rules (in priority order):**
1. `verification_status = "blue_verified"` -- prefer verified pages
2. Name match exactness -- exact beats partial
3. `fan_count` -- larger fan count signals the real business when multiple unverified matches exist
4. Category alignment -- match industry/category if known

**Record per competitor:**
```
Competitor: [name]
Page Name: [exact FB page name]
Page ID: [numeric ID]
Fan Count: [number]
Verified: [yes/no]
Confidence: HIGH / MEDIUM / LOW
Resolution method: page-id-locked / keyword-fallback
```

**Fallback when `pages/search` fails:** Fall back to keyword search in Phase M2 and flag `[LOW confidence -- keyword fallback]`.

**Watch-out -- same-name businesses:** "Hatch" (home-services CRM) vs. multiple unrelated businesses. When ambiguous, check the page URL/about section for the known domain.

### Phase M2 via API: Pull Ads Per Advertiser

**Default parameters:**
- Countries: `US` only
- Status: `ACTIVE` only (unless caller requests `ALL` for historical analysis)
- Limit: 50 per request, paginate with `after` cursor for more
- Fields: full creative data + delivery metadata

**Primary request (page-ID-locked -- use when confidence is HIGH or MEDIUM):**

```bash
curl -s "https://graph.facebook.com/v18.0/ads_archive?search_page_ids=PAGE_ID&ad_reached_countries=%5B%27US%27%5D&ad_active_status=ACTIVE&fields=id,page_name,page_id,ad_creative_bodies,ad_creative_link_titles,ad_creative_link_captions,ad_creative_link_descriptions,ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,publisher_platforms,languages&limit=50&access_token=$TOKEN"
```

**Fallback request (keyword -- use when page ID could not be resolved):**

```bash
curl -s "https://graph.facebook.com/v18.0/ads_archive?search_terms=COMPETITOR_NAME&search_type=KEYWORD_EXACT_PHRASE&ad_reached_countries=%5B%27US%27%5D&ad_active_status=ACTIVE&fields=id,page_name,page_id,ad_creative_bodies,ad_creative_link_titles,ad_creative_link_captions,ad_creative_link_descriptions,ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,publisher_platforms,languages&limit=50&access_token=$TOKEN"
```

**Pagination:** Follow `paging.cursors.after` if `paging.next` exists and you have fewer than 200 ads:

```bash
curl -s "https://graph.facebook.com/v18.0/ads_archive?...&after=CURSOR_VALUE&access_token=$TOKEN"
```

**For each ad, capture:**

| Field | API Field | Notes |
|---|---|---|
| Ad ID | `id` | Unique identifier |
| Advertiser | `page_name` | The FB Page running the ad |
| Page ID | `page_id` | For cross-referencing |
| Body copy | `ad_creative_bodies` | Array -- may have multiple variations |
| Headline | `ad_creative_link_titles` | Array -- link ad titles / card titles |
| Description | `ad_creative_link_descriptions` | Array -- below-headline text |
| CTA caption | `ad_creative_link_captions` | Array -- button/link label |
| Start date | `ad_delivery_start_time` | When the ad started running |
| Stop date | `ad_delivery_stop_time` | Null = still active |
| Preview URL | `ad_snapshot_url` | Public URL to render the actual ad visual |
| Platforms | `publisher_platforms` | `["facebook","instagram","audience_network"]` |
| Languages | `languages` | Array of language codes |

**Known API limitations:**
- Spend and impressions fields return data only for political/issue ads. Commercial ads return null. Not a bug.
- Image and video assets are NOT returned directly. Use `ad_snapshot_url` to render a preview if needed.
- Page demographics not returned for commercial ads.
- Ads older than ~7 years may not appear.

**Run length as performance proxy:**
```
run_days = (ad_delivery_stop_time OR today's date) - ad_delivery_start_time
```
Ads running 30+ days are likely performing. 90+ days are almost certainly winning creatives.

### Phase M3 via API: Competitive Attack Pass

For each major incumbent, search for ads that MENTION that incumbent:

```bash
curl -s "https://graph.facebook.com/v18.0/ads_archive?search_terms=INCUMBENT_NAME&search_type=KEYWORD_UNORDERED&ad_reached_countries=%5B%27US%27%5D&ad_active_status=ACTIVE&fields=id,page_name,page_id,ad_creative_bodies,ad_creative_link_titles,ad_creative_link_descriptions,ad_delivery_start_time,ad_snapshot_url,publisher_platforms&limit=50&access_token=$TOKEN"
```

**Post-filter:** Remove rows where `page_id` matches the incumbent's page ID. Remaining rows are the attack-ad landscape.

**Selecting targets:** Same logic as Chrome path -- use `attack_pass_targets` input if provided, otherwise auto-select the largest competitor per vertical.

### API Error Handling

| Error | Cause | Action |
|---|---|---|
| `Invalid OAuth access token` | Token expired or wrong format | Regenerate app access token and retry |
| `Application request limit reached` | ~200 req/hr limit hit | Wait 15 min, then continue from where you left off |
| `(#10) This endpoint requires the 'ads_read' permission` | App not approved for Ad Library | Tell user: go to Meta for Developers > App > Add Product > Ad Library API. May require App Review. |
| Empty results from page-ID search | Wrong page ID, or page has no US ads | Try keyword fallback; flag in output |

---

## Section D: Writeback to ads_knowledge (both paths)

After completing the Meta research (via Chrome or API), save findings to the database. This step applies regardless of which path was used. Tag the source so data quality can be audited later.

**Duplicate check first** (required before every INSERT -- `validate_new_knowledge()` only covers `agent_knowledge`, not `ads_knowledge`):

```sql
SELECT id, title, created_at
FROM ads_knowledge
WHERE platform = 'meta'
  AND knowledge_type = 'competitor_research'
  AND vertical = '[vertical]'
  AND (client_id = '[client_id]'::uuid OR (client_id IS NULL AND '[client_id]' IS NULL))
  AND created_at > NOW() - interval '7 days';
```

If a row is returned, UPDATE that row's `content` and `tags` instead of INSERTing.

**INSERT (when no duplicate found):**

```sql
INSERT INTO ads_knowledge (
  client_id,
  platform,
  knowledge_type,
  vertical,
  title,
  content,
  tags,
  source_context,
  confidence
) VALUES (
  '[client_id or NULL for vertical-level research]',
  'meta',
  'competitor_research',
  '[vertical name]',
  'Meta Ad Library Research: [vertical] -- [date]',
  '[full synthesis text]',
  ARRAY['competitor-research', 'meta-ad-library', '[vertical]', '[chrome-source OR api-source]'],
  '[Meta Ad Library Chrome path OR Meta Ad Library API v18.0]',
  'verified'
);
```

- Use `'chrome-source'` in the tags array when Chrome was the research method.
- Use `'api-source'` in the tags array when the API was the research method.
- Run one INSERT per vertical. For the cross-vertical summary, use `vertical = 'cross-vertical'`.

---

## Phase M4: Synthesis (both paths)

After collecting all ad data (via Chrome or API), synthesize as follows.

### Per-Vertical Comparison Table

For each vertical, produce:

```
## [Vertical Name] -- Meta Ad Analysis

| Advertiser | Run Length (proxy) | Top Headline(s) | Body Copy Pattern | CTA | Format | Creative Tag |
|---|---|---|---|---|---|---|
| [name] | [X days / ongoing since YYYY-MM-DD] | [top 3 by run length] | [pattern summary] | [button text] | [Feed/Story/Reel] | [tag] |
```

**Creative tags:**
- `price-comparison` -- explicitly compares pricing against a competitor
- `use-case-wedge` -- leads with a specific pain point or use case
- `founder-led` -- features a real person, founder story, or human face
- `stat-claim` -- leads with a number ("save 3 hours/week", "2x faster ROI")
- `attack-ad` -- directly names a competitor in the copy
- `social-proof` -- customer quotes, review counts, or customer logos
- `feature-list` -- bullet-style list of features
- `demo-hook` -- leads with showing the product in action
- `urgency-offer` -- limited time, trial offer, or promotional window

### Cross-Vertical Pattern Summary

1. **What creative format is winning everywhere?**
2. **What is the single most common CTA across active ads?**
3. **Which verticals are highest-pressure (most attack ads)?**
4. **What is the biggest creative gap?**

### Ad-Angle Recommendations for [client_name]

Use the resolved client name from Phase 0. If no client was provided, use `[Generic Vertical]` and flag recommendations as vertical-generic.

Generate 5 specific Meta ad-angle recommendations grounded in the client's USPs (Phase 0) and gaps surfaced in the analysis. Each must include:
- **Angle name** (short label)
- **Inspired by** (which competitor pattern or gap it responds to)
- **Suggested headline** (aim for 40-60 chars for feed ads -- no hard Meta limit)
- **Suggested body opening** (first 2 sentences)
- **Why this will work** (what the research tells you)
- **Format recommendation** (feed image / video / reel / story)

---

## Data Volume Minimums (Meta -- both paths)

Before including Meta findings in the output:

1. **Advertiser resolution:** At least 75% of competitors resolved (HIGH or MEDIUM confidence).
2. **Ads per competitor:** Minimum 5 active ads per competitor. Fewer = "limited ad history" finding.
3. **Attack pass coverage:** At least one attack pass per vertical with the major incumbent.
4. **Verticals covered:** All requested verticals represented -- none skipped.
