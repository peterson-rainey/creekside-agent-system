# Upwork Proposal - Shopify brand, 90-day organic + paid social growth (Shima / Dr Andy on camera)
Profile: Lindsey | Style: lindsey_default | Status: UNSENT | Drafted 2026-09-04

---

Do you know how much of your Shopify revenue comes from people who saw Shima or Dr Andy on camera before they bought, versus people who only ever saw a product image? That split usually decides where a ninety day plan should put its money, and most brands have never separated it.

The reason I ask is that a face on camera changes what paid can do, not just what organic can do. Practitioner footage tends to hold attention long enough to survive being run as a cold ad. When brands treat that footage as organic only, the best asset they own never gets budget behind it, and posting frequency becomes the number everyone watches instead of cost per first order.

I ran Meta for a consumer camera brand selling to a young, very online audience. Roughly $58,000 through that account across four and a half months, 623 purchases at about $94 each. What it really showed was the gap between the two lanes. Retargeting sat near $71 per purchase and prospecting near $93, and the honest read is that the warm pool was small, so the cheaper number was never something you could scale by shifting budget into it. That is the kind of thing a weekly report should say out loud.

Worth being direct on fit. My lane is Meta and Instagram paid, email capture and retargeting, and the path from social into Shopify. I do not build content calendars, edit footage, run community engagement, or manage creator outreach, and TikTok ads are not something I run. If those pieces are the core of this hire, I am half of it at best, and I would rather say so now.

Two things worth knowing before anyone builds a plan. What monthly range are you considering for paid, separate from the content work? And is the pixel with server side events and the product catalog already live on the store.

I have attached a few relevant results below. There is also a short video on my profile covering how I approach accounts like this.

---

## Screening notes (internal, not part of the proposal)

**Style:** Request said "Lindsey's strategic version ... write it in lindsey_default." `strategic` is a Samuel-only style label; Lindsey has exactly one sanctioned style, which is diagnostic by construction. Written in lindsey_default as instructed. Same resolution as the RuggedWorkman draft (2026-09-03).

**Screens that FIRE (report-and-ask, not auto-skip):**
- **Majority of scope is outside the service line.** Content calendars, hooks/scripts/captions, editing and repurposing footage, brand identity, community engagement, and UGC/micro-influencer coordination are all organic content production. Verified live 2026-09-04: **0 of 130 clients** carry organic social, social media management, content creation, community, or video in `clients.services`, and `reporting_clients.platform` has no organic or social value at all (meta 60, google 29, email 7, other 4, chatgpt 4, lsa 1, programmatic 1, tiktok 1). Conceded outright in the body rather than papered over.
- **TikTok ads carry no citable result, and are off-profile anyway.** No TikTok performance table exists anywhere in the schema (checked `information_schema`). `reporting_clients` does hold **one active TikTok row, Doctor Laleh at $5,000/mo**, but its `ad_account_id` is NULL and the note reads "Lindsey needs to get tiktok situated", so it was never launched. This is the known NULL-account trap: the row must not be read as TikTok experience. Blush Camera also lists `tiktok-ads` in `services` with zero performance rows. Separately, the Lindsey profile spec forbids naming TikTok, Google, Bing or programmatic as her services. The draft declines TikTok explicitly.
- **UGC / micro-influencer proof is a zero.** Only **4 of 1,814** Meta campaigns match ugc/creator/influencer/whitelist/partnership/boost by name, all PAUSED, and Neue Maison's UGC campaign has no insight rows. No number exists to cite, so none is claimed.

**Verified live against the DB, 2026-09-04 (Postgres `now()` returned 2026-09-03, local clock reads 09-04; date kept as 09-04 per the workspace convention, the discrepancy is the known clock skew):**
- Blush Camera (`act_2050081878799128`, Meta, platform_operator **Lindsey B.**, account_manager Cade): recomputed from `meta_insights_daily` joined to `meta_campaigns`. **$58,298.09 spend, 2,988,086 impressions, 63,358 clicks, 623 conversions, $93.58 blended cost per conversion, $19.51 CPM**, 2026-02-02 to 2026-06-15. Draft rounds to "$58,000", "623 purchases", "about $94".
- Lane split, sales campaigns only: prospecting/other **$49,583.87 / 534 conv / $92.85**; retargeting **$6,295.41 / 89 conv / $70.73**. Draft cites "near $71" and "near $93". Conversion coverage is complete (534 + 89 = 623), so the CPA figures are fully backed.
- **ROAS deliberately NOT cited.** Weighted ROAS is 1.93x prospecting / 2.96x retargeting, but only $41.8K of the $55.9K sales spend carries a non-null `roas`, so coverage is partial. Per the Master Spa Parts precedent, an average-of-daily-ROAS figure is window-skewed and was not used.
- Blush Camera **churned 2026-06-16**, so it is written in past tense and cited unnamed as "a consumer camera brand."
- **No implied causation.** The retargeting/prospecting gap is presented as an observed split with the honest limit (small warm pool, not scalable by shifting budget), not as a result Lindsey produced.
- Duplicate-bid check: **no matching row in `upwork_leads`** on Shima or Dr Andy. No second Creekside profile has bid this job.

**Memory index CONFIRMED, my first read was wrong.** `clients.services` returns 1 total / 0 active on email or Klaviyo, but that is the wrong column. `reporting_clients WHERE platform = 'email'` returns **7 rows, 6 active** (Dr. Laleh Cosmetic, MLS Signs, Nightlark, Pink Moon Bay, Snackify, Tiami active; Mark Wolf churned), which matches the index exactly. Lesson for the next draft: `clients.services` is sparsely populated and is not a service-line census. No email number is claimed in the draft either way, since the email book still carries zero performance figures.

**Screens still OPEN (do not treat as cleared):**
- **Ad spend vs the $5,000/month minimum, and Lindsey's $3,000/month Meta floor.** No budget stated anywhere. Unstated is not a low number, so this stays open rather than auto-DQ. The draft asks for a range and separates it from the content budget.
- **Geography.** "optimise" spells British, which reads UK or AU, both in territory. Not stated outright, so unconfirmed rather than cleared.
- **Whether the hire is severable.** If they will only take one person doing content and ads together, this is a real DQ and the thread stops. The draft surfaces that directly instead of hiding it.
- Five years experience requirement is cleared (Lindsey is 10+). Never reuse that figure for Samuel, who is 6.

**Deliberate omissions:** no pricing (lindsey_default carries no fee table first touch, and with spend unstated there is nothing for a percentage to attach to). No calendar link and no URLs, first touch on a job post. Shima and Dr Andy named once each to show the post was read, no scope parroting. Principals not named as the worker. No sign-off name. No em dashes.

**Length:** 345 words, 1,905 characters. Within the 350 multi-question ceiling and well under the 5,000 character Upwork limit.
