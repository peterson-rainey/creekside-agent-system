# Kids' outdoor apparel + gear store, Google Ads + Merchant Center takeover, fall/winter outerwear (Samuel, strategic) UNSENT
Profile: Samuel Rainey (General) | Style: samuel_strategic | Date: 2026-09-21 US Central (Postgres now() 2026-09-21 22:52 UTC) | 350 words / 2,015 chars | No sign-off | ATTACH: winterbotham_parham_teeple_CLEAN.pdf (no-attachment version kept below)

## Job post (as pasted: no title, budget, rate, client location or screening questions)
> We are looking for an experienced Google Ads Specialist to take over, fix, and optimize campaigns for our online retail store specializing in kids' outdoor apparel and gear. We do not just need a high-level audit; we need a hands-on expert to properly set up our ads and actively drive conversions in the United States market as we head into our busy fall season.
> Project Details:
> Audit & Fix: Review our current Google Ads and Google Merchant Center setup, identify areas of wasted ad spend, and correct structural issues.
> Campaign Setup: Build out highly targeted Google Shopping and Search campaigns focused on our fall and winter outerwear inventory.
> Optimization & Scaling: Actively manage bids, negative keywords, and ad copy to increase our sales volume and maximize return on ad spend (ROAS).
> Tracking: Verify that Google Tag Manager and Google Analytics are perfectly configured to capture e-commerce purchase conversions.

## SCREEN
- Step 0, already drafted / already bid: NO. `upwork_jobs.job_description` ILIKE outerwear / kids%outdoor / children%outdoor / outdoor apparel / "take over, fix, and optimize" / "busy fall season" returned only an unrelated April 2026 Meta apparel post (Ballad of the Bird Dog). Draft folders (`.claude/`, `drafts/`, `upwork-drafts/`) and the leads index grepped at start and again before QC: no match. No twin on any profile.
- Profile: Samuel strategic, as asked. Google Ads + Merchant Center post, outside Lindsey's permitted scope anyway.
- Ads in scope: yes, Google is the whole job. Owner-operated ("our online retail store"), not white-label. Not a seat. US market, geo passes. No trial, profit-share, no-agency clause, worker-location or detection-evasion language.
- Required items / screening questions: none in the paste, so no proof item can foreclose.
- Spend: UNSTATED, no budget-size prose, so the $5K floor is unmeasurable, not cleared. Asked in the close as a relative range with a reason.
- Rate, payment verification, client spend history, hourly vs fixed: unknown from a pasted post. Check the job page.
- Skip predictor: "merchant center" is 45 jobs / 0% call in the April 2026 Upwork filtering analysis (from the 9/21 BigCommerce screen). Worst-converting archetype in our data.
- Proof: kids' apparel and apparel on Google are true zeros (Field Day Apparel was Meta-only with no data; Pink Moon Bay was Meta, churned). The post asks for no proof, so no disclosure was written. No case study cited, see WITHHELD.

## VERIFIED 2026-09-21
- Google Ads Help 2454022: "Shopping ads use your existing Merchant Center product data (not keywords) to decide how and where to show your ads." Negative keywords in Shopping campaigns are standard (not on that page).
- Merchant Center Help 6324463 (age_group): "Required for Shopping ads for all Apparel & Accessories" products in Brazil, France, Germany, Japan, UK and US. Values: toddler "1-5 years old", kids "5-13 years old" (also newborn, infant, adult). "This attribute doesn't have a default value."
- Help 6324479 (gender) and 6324487 (color): required for Shopping ads for Apparel & Accessories (166) products targeting the US.
- Help 6324492 (size): required for Clothing (1604) and Shoes (187) in US Shopping ads. "Also submit each variant as a separate product with the same value for the item group ID [item_group_id] attribute." Toddler size examples "2 Toddler", "3 Toddler".
- Help 6324448 (availability): variant availability in the data should match the landing page; "If we find that a product is out of stock on your landing page or during checkout, but the availability attribute is set to in_stock in your product data, we disapprove the product." The draft cites this rule (added at expert review), feed says in stock + page says sold out only.
- Help 6324473 (custom labels): custom_label_0 to custom_label_4 "allow you to create specific filters to use in your Performance Max, Shopping, or Demand Gen campaigns"; examples "seasonal, clearance, or selling rate"; "won't be shown to customers."
- Google Ads Help 13020501: "It can take up to around 50 conversion events or 3 conversion cycles for the bid strategy to calibrate to the new objective." Also: "Conversion data from previous campaigns can help drive faster results."
- Help 6263057: Learning reasons are new strategy, setting change, composition change; "you may not want to measure performance until the learning period is over."
- Help 6268637 (Target ROAS): "Setting a target that's too high may limit the amount of traffic your ads may get." "If you want to increase conversion volume, consider gradually reducing the target ROAS. This allows the bid strategy to enter more auctions and generate more volume."
- Team (`team_members`, live): Jordan Tryon, Conversion Tracking Specialist, active. Ahmed Imran, Google Ads / PPC Specialist, active. Ade Aderibigbe, Google Ads Specialist, active. Roles named, not people.
- "About a dozen Google Ads accounts": 13 accounts with spend since 2026-09-10 in `google_insights_daily`, including Scattered Kind (client churned 9/18) and Vertify ($10.17). 11 to 12 live.
- "Three of them online stores": Tiami Sleep ($3,219 since 9/10), Myriad Traders / practicalsurvivalgear.com ($2,950), Night Lark USA ($776), all active in `clients` + `reporting_clients`, Google operator Ahmed Imran.
- Six years in paid ads: memory, confirmed by Queenie 8/12. Placed before the team claim.
- GA4 import double-count line: same practice point QC passed on the 9/21 BigCommerce draft.

## WITHHELD, AND WHY
- Practical Survival Gear (closest "outdoor gear" analog): built by us in June 2026 (start 2026-06-09, campaigns dated 23-24 Jun), not a takeover. US Shopping ROAS Jul 2.16x, Aug 2.81x, Sep 1-19 2.24x; branded Search under 1x. Modest, survival gear is not kids' apparel, and the July UK cut was client-directed. Not cited.
- Aura Displays: built from zero, not taken over, all campaigns paused since 2026-08-31, and its non-brand Shopping fell from 11.43x (Nov) to ~3x (Jul-Aug), which the 5.47x lifetime hides. Not cited.
- Out-of-stock sizes "stop being advertised": Help 6324448 does not say out_of_stock items are excluded from Shopping ads in so many words. Not claimed.
- Shopify's Google & YouTube app default conversions (add to cart + checkout started, Help 13494537): the store's platform is unknown. Cut for length.
- Fee / onboarding / 90-day minimum: not asked, spend unknown. Nothing priced.

## OPEN FOR QUEENIE
1. Job page: spend, the client's rate range (screen the bottom against our $40/hr floor), payment verified, client spend history.
2. `upwork_proposal_logs` INSERT skipped (contractor_query can't write).

## QC + EXPERT REVIEW (2026-09-21)
- qc-reviewer-agent pass 1: PASS WITH FIXES, no twin found (globbed all draft folders). Applied: "is mislabeled" -> "would be mislabeled" (we haven't seen their feed); the Search sentence's "each ad landing on the matching sizes" was awkward, cut to "Search gets built by product and age." Its hedge on the adult-searcher line ("can pull in") was handled by rewording instead: "Adults shopping for themselves type those too." is true without a hedge.
- expert-review-agent: Good. Opener wins the click. Accepted: add the in-stock disapproval rule (Help 6324448), the most seasonal fact available, in place of the Search detail. Its suggested wording was NOT used: it tied Search ad landing pages to feed stock and called disapproval "how fall sizes quietly stop running", which overstates. Accepted in spirit: the example now lands in sentence 2 (the preview). Noted, not changed: if the account turns out to be Performance Max, negatives are far more limited (Help 16668865), so confirm campaign type before leading with negatives. Also flagged the "merchant center" 0%-call predictor.
- The ROAS tradeoff moved into the close so it sets up the "which matters more" question.
- qc-reviewer-agent re-check: PASS. Optional polish applied ("a product that the feed lists").

## ATTACHMENT (Queenie asked "what case study should I attach?", 2026-09-21)
- PICK: `.claude/attachments/winterbotham_parham_teeple_CLEAN.pdf`. Re-verified today: %PDF-1.4, 785,596 bytes, sha1 7b245ac2fcc3a845c6a4723677c7f72ce5536b42, 3 pages, 0 link annotations, 0 "localhost", 0 samuel/rainey/peterson, text read in full. Bankruptcy law firm, existing Google account at $86+ per lead with flat volume, restructured into four focused segments, budget reallocated toward the highest-converting markets and keywords, underperformers paused. 229 conversions vs 117 prior period, $50.29 vs $86.09 CPA, $11.5K spend ($1.44K more than prior period).
- Why: this post is a takeover-and-fix, and it's the only artifact that shows an existing account restructured. It backs the draft's outerwear split (focused campaigns with their own budgets). House rule: on a Google audit/diagnostic post, Winterbotham over Aura. The draft's learning-period line is about phasing the split in, not a consolidation-for-volume argument, so the 9/5 carve-out doesn't apply.
- Passed over: Aura Displays (the only ecom Shopping PDF: "8-10x" x6 incl. title against ~3x recent non-brand Shopping, "49 Countries" in the title from an 8-day 0.65x test, "exceptional returns from the first week" against the draft's learning-period line, localhost link, account paused since 8/31, built rather than taken over). NYC Notary (search-term + tracking thesis fits, but $12.3K spend with no period, no clean copy on disk). Perfect Parking, Integrity, Big Chad Law, Unrefined (off-thesis or Meta).
- Soft spots to know: no dates in the PDF (can't answer "when"); white-label account, not in our live data; legal closing CTA; the PDF's "Halved Costs" headline rounds a 42% cut.
- Tie-in: own paragraph after the team paragraph, before the close, no numbers. Trims elsewhere kept it at 350 words.
- qc-reviewer-agent re-check on the attachment version: PASS (tie-in matches the PDF, placement implies no Shopping/feed work by the law firm, all six trims clean).

## PROPOSAL (with attachment, send this one if attaching)

Google Shopping doesn't let you pick keywords for your outerwear, only rule searches out. So on a kids' store, the first place I'd look for wasted spend is searches like "snow pants" or "puffer jacket" with no "kids", "toddler", "boys" or "girls" in them. Adults shopping for themselves type those too.

With fall this close, order matters: new Smart Bidding campaigns can take up to around 50 conversions to learn, so the current campaigns keep running while the outerwear ones build up data. Tracking goes first, since new campaigns learn from whatever the account counts as a conversion. Our tracking specialist would check GTM and GA4 and confirm each order reaches Google Ads once, with its value, not again through a GA4 import.

In Merchant Center, US Shopping ads require age group, gender, color and size on kids' clothing, and "toddler" (1 to 5) and "kids" (5 to 13) are separate age groups. A toddler snowsuit filed under "kids" would be mislabeled for the parent searching "toddler snowsuit 3T". Each size goes in as its own item, with stock kept current through a busy fall, since Google disapproves a product that the feed lists in stock but the page shows sold out.

The fall and winter outerwear then gets a custom label and its own Shopping campaign, budget and ROAS target instead of competing with the rest of the catalog. Search gets built by product and age.

I've been in paid ads for six years, and our team runs about a dozen Google Ads accounts, three of them online stores. Day to day, a Google Ads specialist on our team runs the account, and I stay on strategy.

The attached case study shows the same fix on a law firm's existing account: focused campaigns, budget moved to what converted.

One tradeoff: a higher ROAS target keeps Google out of more auctions, and lowering it gradually buys volume. So which matters more this fall: outerwear sold, or its ROAS? And roughly what range does the account spend monthly? What we'd set up first at $5,000 a month looks different at $30,000.

## PROPOSAL, NO-ATTACHMENT VERSION (349 words, send this one if attaching nothing)

Google Shopping doesn't let you pick keywords for your outerwear, only rule searches out. So on a kids' store, the first place I'd look for wasted spend is searches like "snow pants" or "puffer jacket" with no "kids", "toddler", "boys" or "girls" in them. Adults shopping for themselves type those too.

With fall this close, the order of fixes matters too. New Smart Bidding campaigns can take up to around 50 conversions to learn, so the current campaigns keep running while the outerwear ones build up data. Tracking goes first, since new campaigns learn from whatever the account counts as a conversion. Our tracking specialist would check GTM and GA4 and confirm each order reaches Google Ads once, with its value, not again through a GA4 import.

In Merchant Center, US Shopping ads require age group, gender, color and size on kids' clothing, and "toddler" (1 to 5) and "kids" (5 to 13) are separate age groups. A toddler snowsuit filed under "kids" would be mislabeled for the parent searching "toddler snowsuit 3T". Each size goes in as its own item, and in a busy fall its stock status has to keep up, since Google disapproves a product that the feed lists in stock but the page shows sold out.

The fall and winter outerwear then gets a custom label in the feed and its own Shopping campaign, budget and ROAS target, so it isn't competing with the rest of the catalog. Search gets built by product and age.

I've been in paid ads for six years, and our team runs about a dozen Google Ads accounts, three of them online stores. Day to day, your account would sit with a Google Ads specialist on our team, and I stay on strategy.

One tradeoff to settle early: a higher ROAS target keeps Google out of more auctions, and lowering it gradually buys volume. So this fall, which matters more, outerwear sold or the ROAS on it? And roughly what range does the account spend each month? What we'd set up first at $5,000 a month looks different at $30,000.
