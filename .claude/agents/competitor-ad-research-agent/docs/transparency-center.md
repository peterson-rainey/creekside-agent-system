## Phase 1: Google Ads Transparency Center Research

The Google Ads Transparency Center lives at `https://adstransparency.google.com/`. It lets you search by advertiser name and see all their active Google Ads. **This is the PRIMARY data source for this agent. The majority of ad copy should come from here.**

### Volume Target

**Minimum: 15 ads per competitor, 100+ total ads across all competitors.** The Transparency Center typically shows dozens to hundreds of ads per advertiser. You MUST scroll through and extract them all -- do not stop after the first page of results. If a competitor has 50 ads showing, record all 50. More data = better pattern detection.

### CRITICAL: How Ad Copy Extraction Actually Works

**The Transparency Center renders ad previews inside cross-origin iframes.** This means:
- `get_page_text` returns NOTHING from the ad cards (confirmed via live testing)
- `read_page` (accessibility tree) gets ad count, advertiser name, and card links -- but NOT the ad copy text
- `javascript_tool` CANNOT access iframe content (same-origin policy blocks it)

**The ONLY way to read ad copy is visually:**
- Use `computer action=screenshot` to capture the page
- Use `computer action=zoom` on specific ad card regions to read headlines/descriptions clearly
- OR click into individual ad detail pages and zoom there (larger preview, easier to read)

**You MUST search by DOMAIN, not advertiser name.** The Transparency Center indexes advertisers by their verified legal entity name (e.g., "William M. Dorfman D.D.S., a Professional Corporation"), NOT by how people refer to them. Searching "Dr. Bill Dorfman" returns 0 results. Searching "billdorfmandds.com" returns 30 ads. **Always use the competitor's website domain.**

### How to use it:

1. Call `tabs_context_mcp` to get/create a tab group
2. Create a new tab with `tabs_create_mcp`
3. Navigate to `https://adstransparency.google.com/`
4. Wait 5 seconds, then inject `ready_check.js` (read from `~/scripts/screenshot_pipeline/ready_check.js`). If `ready=false`, wait `retry_wait_ms` and re-inject up to `max_retries`.
5. Inject `dismiss_popups.js` (read from `~/scripts/screenshot_pipeline/dismiss_popups.js`) to clear any cookie/consent banners.
6. For each competitor:

   **Step A: Search by domain**
   a. Click the search box and type the competitor's DOMAIN (e.g., `billdorfmandds.com`, NOT "Bill Dorfman")
   b. Wait 2 seconds for the autocomplete dropdown
   c. Look for the domain under the "Websites" section in the dropdown and click it
   d. If no results, try without "www." or try just the root domain
   e. If still nothing, try the advertiser name search as a fallback

   **Step B: Load all ads**
   f. Note the ad count shown (e.g., "30 ads") -- record this as a data quality signal
   g. Use `read_page` to find the "See all ads" button and click it to load the full grid
   h. Scroll down to ensure all ad cards are loaded in the grid view

   **Step C: Extract ad copy visually**
   For **high-volume extraction** (reading many ads quickly from the grid view):
   i. Take a `screenshot` of the current viewport
   j. Use `zoom` on individual ad card regions to read headlines, descriptions, and extensions clearly
   k. Scroll down, screenshot again, zoom again -- repeat until all cards are covered
   l. The grid shows ~3-4 ads per row, so each viewport covers 6-12 ads

   For **detailed extraction** (getting full text including all variations):
   m. Click into the ad detail page (each card is a link like "Advertisement 1 of 30")
   n. On the detail page: zoom the ad preview to read full headline, description, sitelinks, callouts
   o. Check for "X of Y variations" badge in top-right of the preview -- click right arrow to see ALL variations
   p. Navigate back to the grid, click the next ad
   q. **Use this method for at least the first 10 ads per competitor** to catch all variations

   **Recommended approach:** Use grid-view zoom for a quick scan of all ads, then click into the 10-15 most interesting/different-looking ads for full detail + variation extraction.

   **Step D: Record everything**
   r. Record exact ad copy verbatim -- headlines, descriptions, display URLs, sitelinks, callout extensions
   s. Note the ad format (Text/Search, Display/Image, Video, Maps/Local)
   t. Note "Last shown" date from detail pages -- recent = still performing
   u. Count total ads and total unique ad copy variations

**Important navigation notes:**
- The Transparency Center defaults to "Ads in United States" -- verify this is set correctly
- Use the format filter dropdown to focus on "Text" (search ads) first, then check Display and Video
- Each detail page shows "Last shown: [date]" -- if it's today's date, the ad is actively running
- **Pace your navigation.** Wait 1-2 seconds between clicks. Do not rapid-fire click through ads.
- Detail pages have left/right arrows to navigate between ads WITHOUT going back to the grid

### If no competitors were provided:
Use WebSearch to search for "[industry] + [location]" and note which businesses are running Google Ads (the sponsored results at the top). Collect **5-10 competitor names AND their domains** (not just names), then research each domain in the Transparency Center.

### Fallback if Transparency Center fails for a competitor:
If the Transparency Center returns no results for a specific competitor:
1. You already searched by domain (Step A). If that returned nothing:
2. Try the exact Google My Business name as it appears in search results
3. Try the parent company or practice group name
4. Search WebSearch for "[competitor name] google ads transparency" to find their advertiser ID URL
5. If still nothing, note "0 ads found in Transparency Center" for that competitor -- do NOT substitute website copy as ad copy. Website copy and ad copy are different things.

---
