# SEO Blog Agent — Training Extraction
**Compiled:** 2026-04-29
**Purpose:** Everything Peterson has said, built, or decided about SEO, blog content, and website content strategy. Use this before building the automated SEO blog agent.

---

## STEP 1 — WHO IS INVOLVED

| Person | Role | Relevance |
|---|---|---|
| Peterson Rainey | CEO | Author of all blog posts; trained Malik personally; owns SEO task in ClickUp |
| Malik Qurban | Former VA (inactive) | Original human executor of the blog-from-YouTube workflow |
| Tobi Aderounmu | AI partner (Jybr) | Pitched AI blog service to law firm and Chattanooga Skydiving |
| Raven Lui | Current VA | Inherited YouTube content duties, video calendar |
| Cade MacLean | COO/CMO | YouTube channel owner; identified Ram Khaef finding Creekside via 198-subscriber channel |
| Justin Silvia (Chattanooga Skydiving) | Client | Prospect for AI blog service — Tobi quoted $400/mo, Justin pushed back |

---

## STEP 2 — WHAT PETERSON HAS ALREADY BUILT

### The Existing Blog-from-YouTube Workflow
Peterson personally trained a VA (Malik) on this workflow via Loom video and documented it as a formal SOP. This is the FOUNDATION for any automated version.

**Source:** Loom recording `fe891f8f` (7 min) — Peterson's voice walkthrough  
**Source:** Google Drive SOP `59c933f2` — "SOP: Generating Blogs from YouTube Videos on Google and Facebook Ads" (Owner: Malik, Last Updated: November 2025)  
**Source:** Google Drive doc `cfabb350` — "Create blogs from YT videos" quick-reference hub  
**Source:** ClickUp task `86e0bhrbu` — Peterson's personal SEO task checklist  

---

## STEP 3 — THE COMPLETE EXISTING SOP (verbatim from Peterson's documentation)

### Content Selection Rules (Non-Negotiable)

**Eligible videos — ALL of these must be true:**
- Video length: over 5 minutes
- Topic: Google Ads OR Facebook Ads
- Must reference "Google Ads," "Facebook Ads," ad strategy, ad reviews, audits, walkthroughs, or "Inside a real strategy call" videos
- Has not been used before (check tracker spreadsheet)

**Videos to skip entirely:**
- Short videos under 5 minutes
- Lo-fi music videos
- Non-marketing-related content
- Any video already converted to a blog

**Peterson's direct quote (Loom training):**
> "You're going to be specifically creating blogs from content that is over five minutes long regarding Google ads and Facebook ads. For Lo-fi music, obviously not something you should create a blog for. If we keep going down here, this one's a solid one. Inside a real strategy call is fine too."

> "There should be plenty for you to pull from and just go from the most recent to the oldest."

> "You can just use any video in here. Just make sure you don't use the same video twice. If you need to track the videos, you can create a spreadsheet to keep track of all the videos."

---

### The 10-Step Workflow (exactly as Peterson built it)

**Step 1: Select Video**
- Go to Creekside Marketing YouTube channel: https://www.youtube.com/@CreeksideMarketing1/videos
- Apply eligibility rules above
- Check tracker spreadsheet for duplicates

**Step 2: Copy Transcript**
- Open the video on YouTube
- Click "..." (More) → "Show transcript"
- Scroll to top, select all, copy full transcript

**Step 3: Generate Blog in ChatGPT**
- Open the Custom Blog Generator GPT (linked in SOP)
- Paste entire transcript
- Wait for output which includes:
  - Multiple headline options
  - Full blog content
  - Author bio
  - Meta description (under 160 characters)
  - Prompt for featured image creation

**Step 4-5: Create WordPress Post**
- Log into WordPress at creeksidemarketingpros.com/login
- Posts → Add New
- Choose headline: Peterson's exact instruction: "The more unique, the better, quite frankly."
- Paste blog body content (after H1 title, before author bio)
- Author: MUST be "Peterson Rainey" — Peterson: "do not skip that part, that is very important that you don't leave author name right there"

**Step 6: Featured Image**
- Use ChatGPT's image prompt to generate featured image
- Download image
- Upload to WordPress → Set as Featured Image
- Alt text: use blog title or ChatGPT image description

**Step 7: Meta Description**
- Ask ChatGPT for meta description under 160 characters
- In WordPress: click "Edit snippet" → remove existing text → paste new description
- Peterson: "I need a description of this article that is under 160 characters"

**Step 8: Category Assignment**
- Categories: "Google Ads" or "Facebook Ads"
- Peterson: "Typically, it's just going to be whichever name. It's going to be typically between Google or Facebook. If it doesn't fall into either of those, you can just either add a category or throw it into another one that's relevant."

**Step 9: Publish**
- Review checklist before publishing
- Click Publish, then confirm with Publish again

**Step 10: Update Tracking Spreadsheet**
- Record: YouTube video title, video link, blog publish date, blog URL
- Purpose: prevents duplicate content

---

### Pre-Publication Checklist (from official SOP)
- Video > 5 min
- Topic is Google Ads or Facebook Ads
- Not a duplicate
- Transcript copied
- Title selected
- Blog pasted cleanly
- Author set to Peterson Rainey
- Featured image created and added
- Alt text added
- SEO description under 160 characters
- Category selected
- Blog confirmed live
- Tracking spreadsheet updated

---

## STEP 4 — PETERSON'S OPINIONS AND PREFERENCES

### On Content Selection
- **Topic focus is strict:** Only Google Ads and Facebook Ads content. Not general business, not motivation, not lo-fi music, not anything off-topic.
- **Length minimum is firm:** Over 5 minutes. Short videos don't have enough substance to generate a real blog.
- **Strategy calls are valid source material:** "Inside a real strategy call" videos are explicitly acceptable.
- **No date restriction:** "I'm not going to worry about that. You can just use any video in here." Peterson removed the idea of restricting by upload date — use the full archive.
- **Source order:** Start from most recent and work toward oldest.

### On Blog Quality
- **Headline uniqueness matters:** "The more unique, the better, quite frankly."
- **Author attribution is critical:** Peterson called this out explicitly as "very important" — every post must show "By Peterson Rainey." This is a branding/authority signal.
- **SEO meta description:** Must be under 160 characters. Non-negotiable technical requirement.
- **Alt text on images:** Required for every featured image. Use the blog title or ChatGPT's image description.
- **Clean formatting:** EA task list specifies "ensure clean formatting and internal linking" — internal links matter.
- **Categories matter:** Google Ads or Facebook Ads. Correct taxonomy is required.

### On the Purpose of the Blog Program
From Peterson's ClickUp SEO task (`86e0bhrbu`), his four SEO priorities are:
1. Drive more reviews across several review sites
2. Create accounts on several review sites
3. **Create AI agent to spin out new blogs from YouTube content daily**
4. Post to GMB, get location changed to Spring Hill, TN

This confirms the blog agent is explicitly on Peterson's to-do list as a **daily automation task.**

### On Organic vs. Paid
From `marketing-strategy-agent: Company Identity & Positioning`:
> "Services NOT offered: Organic SEO, content marketing, organic social, email marketing, brand design/web dev, direct mail. Peterson's own words: 'jack of all trades are masters of none.'"

**Critical distinction:** Creekside does NOT offer SEO as a client service. The blog program is for **Creekside's own website authority** — not a service sold to clients. When Peterson says "we don't do SEO," he means as a client deliverable. The blog automation is for Creekside's inbound marketing.

From the sales competitive differentiators document:
> "What Creekside Does NOT Do (Be Upfront): SEO / content marketing... Saying 'we don't do that because we specialize' is a trust-builder, not a weakness."

### On Content Authority and YouTube
From `marketing-strategy-agent: Acquisition Channels`:
> "YouTube: Cade running channel at 2 hours/week. Ram Khaef found Creekside through YouTube with only 198 subscribers and 35 views — he owns 5 dental offices and had $300K Upwork lifetime spend. This is a signal, not an anomaly. Tutorial content (not broad business content) drives inbound discovery."

This validates the blog strategy: tutorial/educational content about Google Ads and Facebook Ads is what generates qualified inbound discovery. The blog-from-YouTube workflow amplifies YouTube reach to Google search.

### On AI Blog Services (as a product for clients)
Peterson evaluated selling AI blog generation as a service through the Tobi partnership (Jybr). Key findings:

**From Google Chat (Tobi → Peterson, March 2026):**
> Tobi: "The current AI agent scrours the news for local car accidents, blah blah blah, writes blogs, right? If it could just scour for local accidents and then just clip the news video, post out on TikTok repeatedly..."

**From Google Chat (Tobi → Peterson, Chattanooga Skydiving pricing):**
The gchat entry `7cfe2542` shows: "Justin wants the AI blog service, which Tobi quoted at $400 per month, prompting a negative reaction from Justin."
> "Peterson responded that the actual cost needs to be determined before committing to any price."

Peterson's position on AI blog pricing:
- $400/month is a real price point that was tested on a client
- Justin's negative reaction to the price means cost-of-goods math must be solid before committing
- Peterson: "the actual cost needs to be determined before committing to any price"

**From the Adibe Law email thread (Tobi's SEO content proposal to a law firm):**
The model for an external AI blog service:
- $3,000 one-time setup fee
- $400/month ongoing
- 30 blog posts per month (1/day), SEO-optimized for relevant keywords
- Trend-tracking: identify trending topics in client's space and prioritize those
- Success in first 0-3 months measured by Google indexing, NOT traffic
- Competitor tracking: analyze what topics other firms are publishing

**What Peterson observed and approved of in the law firm pitch:**
- Google indexing as the right early metric ("if you can search for the blog title in Google and see your website amongst the resulting sites, this is how we know the SEO is working")
- 30 posts/month cadence
- Trend-monitoring as a differentiator

---

## STEP 5 — DECISIONS AND STRATEGIC CONTEXT

### What Peterson Has Decided (from marketing-strategy-agent recommendations)

**Next 90 Days priorities include:**
- "Add vertical-specific landing pages for mortgage, dental, and legal case studies on main site"

**Next 6 Months:**
- "Build one owned inbound channel (dental YouTube series or Clutch + review SEO)"

**Channel investment guidance:**
- "INVEST: Paid Meta Ads for dental, Clutch.co, YouTube tutorials"

### The Website
- Live at creeksidemarketingpros.com
- Built on WordPress
- Blog section is live and active
- GitHub repo: https://github.com/drybonez235/creekside (Jonathan manages hosting)
- `agent_knowledge` entry `90a10e67`: "Purpose: SEO, AEO, design, and content updates to creeksidemarketing.com"

### EA Task List Requirement
From the official EA task list (Tier 3 tasks):
> "Turn YouTube videos into blog posts — Use ChatGPT to generate posts from transcripts — Ensure clean formatting and internal linking."

This is listed as a permanent recurring responsibility in the EA role, confirming it is an ongoing operational expectation, not a one-time project.

---

## STEP 6 — COMPILED SOP FOR THE AUTOMATED SEO BLOG AGENT

### What the Agent Must Do

1. **Source:** Pull videos from https://www.youtube.com/@CreeksideMarketing1/videos
2. **Filter:** Only videos over 5 minutes covering Google Ads or Facebook Ads
3. **Dedup:** Check tracking record before processing any video
4. **Extract:** Get full video transcript via YouTube's transcript feature
5. **Generate:** Use a blog generator prompt to produce:
   - Multiple headline options (pick the most unique)
   - Full blog body content
   - Author bio for Peterson Rainey
   - Meta description under 160 characters
   - Featured image prompt
6. **Publish to WordPress:**
   - Title: most unique headline option
   - Body: content between H1 and author bio
   - Author: Peterson Rainey (mandatory, no exceptions)
   - Featured image: generated image with alt text = blog title
   - Meta/SEO snippet: description under 160 characters
   - Category: Google Ads or Facebook Ads
7. **Log:** Record video title, video URL, publish date, blog URL in tracking sheet
8. **Cadence:** Daily (Peterson's ClickUp task explicitly says "daily")

### What the Agent Must NOT Do
- Convert lo-fi music videos or non-marketing content
- Convert videos under 5 minutes
- Publish without author attribution to Peterson Rainey
- Skip the tracking log
- Leave SEO meta description blank
- Create blogs from already-used videos
- Attempt to handle client SEO — this is only for Creekside's own website

### Open Questions Before Building
1. Where is the current video tracking spreadsheet? (Agent needs read/write access)
2. What is the WordPress login credential path? (creeksidemarketingpros.com/login — need service account)
3. What custom ChatGPT GPT is currently used? (URL: https://chatgpt.com/share/e/6916a030-2600-8011-bc0a-246d166cd183 — need to replicate in the agent's prompt)
4. Should the agent publish immediately, or queue for Peterson's review?
5. Does "daily" mean one per day from the newest unwatched video? Confirmed: yes, most recent to oldest.
6. Should the agent also handle GMB posts (also on Peterson's SEO task list)?

---

## KEY SOURCES (with direct links)

| Source | Type | Link / ID |
|---|---|---|
| Peterson's Loom training for Malik | Video | https://www.loom.com/share/026df0b98cfa4f4291595176f36de7b8 |
| Official SOP doc in Google Drive | SOP | https://docs.google.com/document/d/1hmpmzQ49s6ia87OjBqxI1XbPClgqNqljLmacOOo_V7s/edit |
| Quick-reference hub doc | Reference | https://docs.google.com/document/d/1RPj3eyG6k7s9qPUVFB5k2mNN5ZHSychVuzGnmbNs3Pc/edit |
| Custom Blog Generator GPT | Tool | https://chatgpt.com/share/e/6916a030-2600-8011-bc0a-246d166cd183 |
| YouTube channel | Source | https://www.youtube.com/@CreeksideMarketing1/videos |
| ClickUp SEO task | Task | ClickUp task ID 86e0bhrbu |
| Marketing strategy agent knowledge (SEO context) | agent_knowledge | ID: 9a8e9f96, 8548a56f, 2c5da36e, 080dc8fd |
| Creekside website GitHub | Code | https://github.com/drybonez235/creekside |

