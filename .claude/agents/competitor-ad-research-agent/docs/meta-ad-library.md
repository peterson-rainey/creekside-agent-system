## Meta Ad Library Research (Phases M1–M5)

**No Chrome. No browser. No permission prompts.** All Meta Ad Library research uses the official Meta Ad Library API via curl. This is the entire point -- authenticated HTTP requests return structured JSON, not scraped DOM.

---

## Access Token Setup

The Meta Ad Library API requires an App Access Token (not a user token).

**Resolution order:**
1. Check if `META_AD_LIBRARY_TOKEN` is set as an environment variable: `echo $META_AD_LIBRARY_TOKEN`
2. Check if PipeBoard has stored Meta app credentials: query `agent_knowledge WHERE title ILIKE '%meta%app%token%' OR title ILIKE '%pipeBoard%meta%'`
3. If neither: the agent cannot proceed with Meta research. Tell the user: "Meta Ad Library API requires an app access token. Set `META_AD_LIBRARY_TOKEN` as an env var or store it in agent_knowledge with title 'Meta Ad Library App Token'. To get one: create a Meta app at developers.facebook.com, enable the Ad Library API product, and use the App ID + App Secret to generate an app access token via `GET https://graph.facebook.com/oauth/access_token?client_id=APP_ID&client_secret=APP_SECRET&grant_type=client_credentials`."

**Store the token in a variable for the session:**
```bash
TOKEN=$(echo $META_AD_LIBRARY_TOKEN)
# or retrieve from DB and use in subsequent calls
```

---

## Phase M1: Resolve Advertiser Page IDs

**Goal:** Convert competitor business names into Meta Page IDs. Page-ID-locked searches (`search_page_ids`) are far more accurate than keyword searches and are the default search method.

For each competitor name, run a pages search:

```bash
curl -s "https://graph.facebook.com/pages/search?q=COMPETITOR_NAME&type=PAGE&fields=id,name,fan_count,verification_status,category&limit=10&access_token=$TOKEN"
```

**Disambiguation rules (in priority order):**
1. `verification_status = "blue_verified"` -- prefer verified pages first
2. Name match exactness -- exact or near-exact match beats partial
3. `fan_count` -- if multiple unverified matches, prefer larger fan count as signal of the real business
4. Category alignment -- if you know the competitor's industry, prefer pages with matching category

**Record per competitor:**
```
Competitor: [name]
Page Name: [exact FB page name]
Page ID: [numeric ID]
Fan Count: [number]
Verified: [yes/no]
Confidence: [HIGH/MEDIUM/LOW]
Resolution method: [page-id-locked / keyword-fallback]
```

**Fallback:** If no good page ID match, fall back to keyword search in Phase M2 and flag `[LOW confidence -- keyword fallback]`.

**Watch-out -- same-name businesses:** "Hatch" (home-services CRM at usehatchapp.com) vs. multiple unrelated businesses named Hatch. When in doubt:
- Check if the page URL or about section mentions the known domain
- If still ambiguous, note both candidates and flag for human review

---

## Phase M2: Pull Ads Per Advertiser

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

**Pagination:** The response includes a `paging.cursors.after` value and a `paging.next` URL. If `paging.next` exists and you have fewer than 200 ads for a competitor, follow the cursor:

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

**Known API limitations -- document these in the output:**
- Spend and impressions fields (`spend`, `impressions`) return data only for political/issue ads. Commercial ads return null. This is not a bug.
- Image and video assets are NOT returned directly. `ad_snapshot_url` renders the ad in a public preview page if needed.
- Page demographics are not returned for commercial ads.
- Ads older than ~7 years may not appear.

**Run length as performance proxy:**
```
run_days = (ad_delivery_stop_time OR today's date) - ad_delivery_start_time
```
Ads running 30+ days without stopping are likely performing. Ads running 90+ days are almost certainly winning creatives. Use this as the primary performance signal when spend data is unavailable.

---

## Phase M3: Competitive Attack Pass

**Goal:** Surface competitors attacking an incumbent by name in their ad copy.

For each major incumbent in the verticals (e.g., Gorgias for e-com, Podium for home services), run a keyword search to find ads that MENTION that incumbent:

```bash
curl -s "https://graph.facebook.com/v18.0/ads_archive?search_terms=INCUMBENT_NAME&search_type=KEYWORD_UNORDERED&ad_reached_countries=%5B%27US%27%5D&ad_active_status=ACTIVE&fields=id,page_name,page_id,ad_creative_bodies,ad_creative_link_titles,ad_creative_link_descriptions,ad_delivery_start_time,ad_snapshot_url,publisher_platforms&limit=50&access_token=$TOKEN"
```

**Post-filter step:** From the results, remove any ads from the incumbent's own page (filter out rows where `page_id` matches the incumbent's page ID). What remains is the competitive pressure landscape -- businesses actively targeting people who know the incumbent.

**Why this matters:** This is the highest-signal data in the entire research flow. Attack ads reveal: pricing pressure points, product weaknesses, positioning gaps, and what differentiated messaging is landing with the market.

**For Jybr's canonical run, attack passes to execute:**
- `search_terms=Gorgias` → filter out Gorgias's own page → shows Hoop AI, Brandwise, etc.
- `search_terms=Podium` → shows home-services competitors attacking Podium
- `search_terms=Weave` → shows dental/healthcare competitors

---

## Phase M4: Synthesis

After collecting all data across all competitors and verticals, synthesize as follows.

### Per-Vertical Comparison Table

For each vertical (e-com, home services, healthcare, agency), produce:

```
## [Vertical Name] -- Meta Ad Analysis

| Advertiser | Run Length (proxy) | Top Headline(s) | Body Copy Pattern | CTA | Format | Creative Tag |
|---|---|---|---|---|---|---|
| [name] | [X days / ongoing since YYYY-MM-DD] | [top 3 by run length] | [pattern summary] | [button text] | [Feed/Story/Reel] | [tag] |
```

**Creative tags to apply (tag each ad with the most applicable):**
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

After producing per-vertical tables, pull back to answer:

1. **What creative format is winning everywhere?** (e.g., "stat-claim hooks dominate across all 4 verticals")
2. **What's the single most common CTA across active ads?** (e.g., "Start free trial" vs. "Book a demo")
3. **Which verticals are highest-pressure (most attack ads)?** This signals where price sensitivity and competitive switching is highest -- which affects which verticals Jybr should position most aggressively.
4. **What's the biggest creative gap?** What emotional angle, format, or positioning is nobody using?

### Ad-Angle Recommendations for Jybr

Based on the research, generate 5 specific Meta ad-angle recommendations. Each must include:
- **Angle name** (short label)
- **Inspired by** (which competitor pattern or gap it responds to)
- **Suggested headline** (for Meta -- no character limit like Google, aim for 40-60 chars for feed ads)
- **Suggested body opening** (first 2 sentences)
- **Why this will work** (what the research tells you)
- **Format recommendation** (feed image / video / reel / story)

---

## Phase M5: Save to ads_knowledge

After producing the output, save the research to the database for future reuse.

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
  ARRAY['competitor-research', 'meta-ad-library', '[vertical]'],
  'Meta Ad Library API v18.0',
  'verified'
);
```

Run one INSERT per vertical. For the cross-vertical summary, use `vertical = 'cross-vertical'`.

**Before each INSERT, run:**
```sql
SELECT validate_new_knowledge('competitor_research', '[title]', ARRAY['competitor-research', 'meta-ad-library']);
```
If BLOCKED, UPDATE the existing row instead.

---

## Data Volume Minimums (Meta -- parallel to Google minimums)

Before including Meta findings in the output, verify:

1. **Page ID resolution:** At least 75% of competitors must have a resolved page ID (HIGH or MEDIUM confidence). Do not proceed with all-keyword searches if resolution is failing -- diagnose the token or API access first.
2. **Ads per competitor:** Minimum 5 active ads per competitor. If fewer, note "limited ad history" -- some businesses run very few ads and that itself is a finding.
3. **Attack pass coverage:** At least one attack pass per vertical with the major incumbent.
4. **Verticals covered:** All requested verticals must be represented in the output -- no vertical skipped due to data scarcity.

---

## API Error Handling

| Error | Cause | Action |
|---|---|---|
| `Invalid OAuth access token` | Token expired or wrong format | Regenerate app access token and retry |
| `Application request limit reached` | ~200 req/hr limit hit | Wait 15 min, then continue from where you left off |
| `(#10) This endpoint requires the 'ads_read' permission` | App not approved for Ad Library | Tell user: go to Meta for Developers > App > Add Product > Ad Library API. May require App Review for broad access. |
| Empty results from page-ID search | Wrong page ID, or page has no US ads | Try keyword fallback; flag in output |
| `search_page_ids` returns competitor's own-page ads alongside others | This should not happen -- page-ID search is locked | If it does, manually filter by `page_id` in the result |

---

## Chrome as Snapshot Fallback (rare)

If you need to visually inspect a specific ad (e.g., to see the image/video creative that the API does not return), use the `ad_snapshot_url` from the API response:

```
navigate → ad_snapshot_url value (e.g., https://www.facebook.com/ads/archive/render_ad/?id=...)
computer action=screenshot
computer action=zoom
```

This is a SINGLE navigate to a specific ad URL -- NOT browsing the Ad Library UI. One permission prompt maximum, only if needed. This is the exception, not the flow.
