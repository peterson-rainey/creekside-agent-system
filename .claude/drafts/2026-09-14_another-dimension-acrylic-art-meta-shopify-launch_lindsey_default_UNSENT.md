# Upwork Proposal: Another Dimension, premium acrylic art (digital artists), Meta + Shopify + Webflow + Klaviyo + GA4/GTM launch

- **Profile:** Lindsey | **Style:** lindsey_default (request said "strategic + diagnostic", resolved to lindsey_default in the same message) | **Date:** 2026-09-14 (Postgres, US Central) | **Status:** UNSENT
- **Disposition:** Queenie chose "Draft, ask spend range" at the fork in this session. Job page: no budget, rate or spend figure (the Samuel session also recorded the contract type as HOURLY). Provisional until spend clears $5K/month.
- **DUAL BID WARNING:** a Samuel strategic draft of this same job already exists (`.claude/upwork-drafts/2026-09-14_another-dimension-art-launch-meta-shopify-webflow-setup_samuel_strategic_UNSENT.md`, parallel session, same day). Send ONE. Both drafts lean on the same accounts, so a buyer who reads both can connect them. The first version of THIS file was swept into commit 53a2847 by the parallel session's `git add -A`; this is the rewritten, reviewed version.
- **Attachment:** NONE. The template's results-reference line is dropped on purpose (no attachable Lindsey artifact exists).

## PROPOSAL (paste-ready)

Another Dimension will launch with one of two kinds of ad creative, the artists' digital files or real photos and video of the finished acrylic pieces. Which will you have ready?

I ask because the two test like different products. A flat digital image in a feed looks like any print, and the artist's own followers have often seen it already. What they haven't seen is the object, the depth and finish of the acrylic, the edge, and how big it looks on a real wall. Strangers are the ones who need that. On a consumer camera brand I ran on Meta, retargeting brought in only about one purchase in seven. Art may lean warmer than cameras, and your collectors give you a head start, but I'd still plan on strangers carrying most of the sales.

It changes the artist testing too. If one artist's ad uses a styled room shot and another's uses a flat file, you learn which photo won, not which artist. I'd have a handful of pieces shot the same three ways first, flat, on a wall at true scale, and a short clip of the acrylic catching light, then compare artists with the winning presentation held constant.

I've run Meta and email for e-commerce brands for over 10 years, and I built and sold my own e-commerce business before doing this for clients. The closest things to high-end art in my book are a luxury furniture brand I ran on Meta until August, about $105,000 over four months, and a luxury mattress brand on headless Shopify Plus that I run now, listing at $2,000 to $3,500. I haven't marketed fine art, and I'd rather you hear that from me. Most accounts I run spend $1,500 to $15,000 a month, and one cosmetic dentistry account I run is close to $100,000 a month.

On tracking, Shopify's Meta channel can send checkout events through both the Pixel and Conversions API, and I'd set its data sharing to Maximum. Your Webflow pages need their own setup, and a second pixel added by a developer can double count sales, so I reconcile what Meta reports against Shopify orders before budget goes up. Klaviyo has its own traps. That mattress brand's add-to-cart events arrive stamped with Shopify's backend address instead of the real site, so an email button built from them would send buyers to the wrong place. A cart flow also has to exclude anyone who has started checkout, or those people get both the cart and checkout emails. GA4 and GTM I review for what they do to ad attribution.

In the first 30 days, week one covers access and verification, with Business Manager, ad account, Pixel, catalog and Instagram in Another Dimension's name, purchase events checked against a real order, Klaviyo connected, and your collector list loaded with consent. Week two launches the purchase campaign with the presentation test inside it. With few sales yet, click-through only shows curiosity, so that early read stays provisional until orders confirm it. Weeks three and four compare artists on the presentation that holds up, add retargeting and an email signup for people not ready to buy, and come with a weekly note on new-customer cost, ROAS and what changed.

I don't quote hours because setup isn't billed by time. Onboarding is a one-time $1,500 covering the audit, tracking checks, audiences, build and launch. Management after that is 20% of ad spend with a $1,500 monthly minimum and a 90-day minimum, because a new account spends the first month learning and the next two showing what actually works. Training runs through those 90 days, with a handoff session at the end if you'd rather run it yourself.

I'd do the Meta and Klaviyo work myself, from the audit through the build, launch, optimization, reporting and your training. Changes to the Pixel, Conversions API, GA4 or GTM go to a conversion tracking specialist I work with, and I check the results against your orders.

What are you planning to spend on ads each month over the first three months, a few thousand or closer to five figures? Anything I recommend is only useful if it fits that range.

There's a short video on my profile that shows how I run accounts like this.

---

## Screening notes (internal, not part of the proposal)

### Divergence from the Samuel twin (deliberate)

| Samuel twin argues | This Lindsey draft argues instead |
|---|---|
| Opener: Webflow + Shopify split, GA4 cross-domain, click ID lost across domains | Opener: digital files vs photos of the physical acrylic pieces. Webflow appears only as one clause in the tracking answer |
| Learning wall (50/week), one purchase campaign, artists as creative, add-to-cart shortcut buys browsers | Presentation must be held constant before artists are compared, or the test measures photography. No learning-phase math, no add-to-cart argument |
| Collector list as lookalike seed + prospecting exclusion (new-collector CAC) | Retargeting brought one purchase in seven on a Lindsey account, so plan on strangers carrying sales. Collector list only loaded with consent in week one |
| Klaviyo zero add-to-cart catch (Nightlark); event-ID dedup test | Tiami headless event-URL trap + cart flow excluding checkout starters (neither in the twin) |
| "About $105,000 over four months"; mattress brand on Shopify Plus; "largest close to $100,000" | Same accounts (unavoidable, it is Lindsey's book) with different details: headless, list price band, dentistry named by category |
| Setup about two weeks, launch week three | Launch in week two with the presentation test inside the purchase campaign |
| Spend bracket $5,000 vs $20,000 + piece price range | Spend asked as "a few thousand or closer to five figures" |
| Kept consistent on purpose | Canonical pricing (same numbers), 90-day minimum, tracking changes owned by the tracking specialist |

### Screens

| Screen | Result |
|---|---|
| Already drafted / dual bid | **TWIN EXISTS** (Samuel, same day). Not in `upwork_jobs` or `upwork_leads`, so neither has been sent. |
| Ads in scope, white-label, full-time seat | PASS |
| Platform fit (Lindsey scope) | PASS. Meta + Shopify + Klaviyo. GA4/GTM only as attribution review. No Google Ads claimed. |
| Geo, payment verification | OPEN. Not in the pasted post. Check the job page. |
| Ad spend ($5K floor) | SIGNALLED LOW, UNMEASURED. Draft asks it as a range. Provisional. |
| Anti-agency + "personally perform or outsource" | ANSWERED HONESTLY. Lindsey does the Meta and Klaviyo work; Pixel/CAPI/GA4/GTM changes go to the Conversion Tracking Specialist (Jordan Tryon, role-named, not person-named). Cohort per the Samuel session: Lindsey's 12 bids on anti-agency posts, 0 messaged. |
| Hours estimate (required) | DECLINED per never-bill-hourly, answered with canonical pricing. Contract type not raised in the body. |
| Engagement shape | Setup, launch, train/handoff. Countered with the 90-day minimum. |
| Required items | 8 + "Another Dimension" opener. All answered. About 700 words, past the lindsey_default 200-350 word band. |

### Proof used, verified live 2026-09-14 via contractor_query

- **Blush Camera** (consumer camera brand, operator Lindsey B., CHURNED 2026-06-16): retargeting campaigns 89 of 623 conversions (14.3%, about one in seven); other campaigns 534. All sales campaigns OUTCOME_SALES.
- **Neue Maison** (luxury furniture, operator Lindsey B., CHURNED 2026-08-11): tenure 2026-04-10 to 2026-08-10, $105,010.24 spend. Purchase count deliberately not cited: the 343 conversions include OUTCOME_LEADS campaigns (TRADE PROGRAM 1, Local Calendly 8).
- **Tiami** (luxury mattress, operator Lindsey B., ACTIVE): Shopify Plus, headless (agent_knowledge 468564b1). List prices $1,995 to $3,495. Klaviyo Added to Cart event URL points at the myshopify backend, not tiami.com; existing Abandoned Cart flow filters Placed Order=0 AND Checkout Started=0 so it does not double-send against the checkout flow (agent_knowledge 81e54d3b). No Tiami results cited.
- **Doctor Laleh / Lux Dental Spa** Meta (`reporting_clients.platform_operator` Lindsey Bouffard, manual override): $93,854 last 30 days. Present tense only, no duration claim: Lindsey handed the account to Trent Lucas around 9/2025 and is operator again now ([[reference_laleh_meta_is_the_single_account_ceiling]]). Spend only, never CPA.
- **Book band, last 30 days, Lindsey-operated Meta:** Chris Ideson $1,514, Quivr $2,213, The Tooth Co $2,642, Punch Drunk $4,199, Vida $5,057, Tiami $7,028, Nightlark $15,324, Laleh $93,854 (Mark My Words $135 just onboarded). 7 of 9 within $1,500 to $15,000.
- **Pricing:** canonical `pricing-reference.md` + 90-day minimum (2026-05-28 standard terms).

### General platform knowledge (not DB-backed)

- Shopify's Facebook & Instagram channel sends Pixel and Conversions API events; Maximum is the fullest data sharing level. Deliberately no claim about which tier first enables Conversions API (expert review read Shopify's page as Enhanced; wording avoids the dispute).
- The channel does not reach pages hosted outside Shopify (Webflow). A second pixel installed outside the channel can duplicate events.

### Deliberately excluded

- Blush add-to-cart/checkout vs purchase optimization pair (time-matched 2026-02-17 to 04-09: $3,466.11 / 12 / $288.84 vs $9,644.86 / 172 / $56.07): verified, but it would duplicate the Samuel twin's add-to-cart argument.
- Neue Maison product-lane ROAS (coverage 19-29%, ranking inverts on cost per conversion); "cold under 1x" campaign (pre-tenure).
- Nightlark zero add-to-cart catch (used by the twin). Q4 CPM seasonality. Cross-domain cookie explanation (the twin's opener). Every case-study PDF.

### QC + expert review, applied 2026-09-14

`qc-reviewer-agent`: PASS WITH FIXES.
1. ACCEPTED, modified: the camera-brand split sat right after "they carry most of the sales" and read as proof for art. Now hedged: "Art may lean warmer than cameras ... but I'd still plan on strangers carrying most of the sales."
2. ACCEPTED: cart flow line now matches the Tiami record (exclude anyone who has started checkout).
3. ACCEPTED, modified: the "$5,000 or ..." anchor mirrored the twin's close. Now "a few thousand or closer to five figures".
4. Length flagged to Queenie (about 700 words, 8 required items).

`expert-review-agent`: Good.
1. ACCEPTED differently: Shopify data-sharing line no longer ties Conversions API to Maximum; now "can send ... and I'd set its data sharing to Maximum".
2. ACCEPTED by cut: "A Webflow front end on Shopify can open the same kind of gap" conflated two different bugs and would converge on the twin's cross-domain argument. Removed.
3. ACCEPTED, modified: click-through read in week two now marked provisional until orders confirm it.
4. REJECTED for the body: adding "we'd switch this job's contract type" raises contract mechanics in a first touch (never-raise-contract-type handling; the Samuel twin also keeps it out). Flagged below instead. Side note ACCEPTED: the 90-day reason now covers all three months.

Final length: see delivery note (under 5,000 characters). 0 em dashes, 0 colons, no links, no sign-off.

### Open for Queenie before sending

- Pick ONE profile for this job.
- Job is posted HOURLY; our structure (onboarding + % of spend) needs the contract type changed if they move forward.
- Geo and payment verification on the job page.
- Commitments in the body: week-one verification, week-two launch with a presentation test, weekly note, training through 90 days plus a handoff session. The creative shoot is framed as "have pieces shot" (client-side), not something we produce.
- DB log to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).
