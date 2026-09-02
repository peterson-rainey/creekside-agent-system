# Multi-brand furniture/home goods ecom — read-only Google Ads + GMC audit
# Profile: peterson (strategic) | Status: UNSENT DRAFT | Drafted 2026-09-02 | Sign-off: Peterson (Queenie ruling)

A third of orders closing by phone does not spread evenly across your campaigns, and that is the part that usually gets missed. People who call already know who you are. So the untracked revenue lands disproportionately on brand terms, which are already the cheapest thing in the account. Brand looks better than it is, non-brand looks worse than it is, budget drifts toward brand, and platform ROAS climbs while blended MER falls. Same accounts, same spend, worse business.

That is my first answer on the MER gap. The other two candidates are mix shift toward returning customers, and PMax quietly absorbing brand demand it did not create. All three are separable. Segment reported revenue by new versus returning in GA4, pull the brand and non-brand split by campaign, then run a geo holdout or pause brand in one region for two to three weeks. The holdout is the only one of those that proves incrementality rather than describing a correlation.

Numbers from a Shopify account I ran on Google make the point. Ten months, roughly $83K spend against $1.04M tracked revenue. Reads as 12.6x. Brand search was 31% of the spend and 70% of the revenue. Strip it and the rest of the account runs 5.4x. Nothing was broken. The blended number was just describing the brand.

On the feed. At 200,000 SKUs the segmentation that matters is not category, it is margin. Category is how you talk about a catalogue. Margin is what you bid on. I would push a daily supplemental feed keyed on item ID that writes contribution margin into custom labels: label_0 margin band, label_1 supplier, label_2 price band, label_3 sixty day unit velocity. Campaigns then split by margin band, each with its own tROAS target, because a 22% margin SKU and a 45% margin SKU need very different ROAS to contribute the same dollar. One target across the whole catalogue silently funds your worst products. Below a floor margin the SKUs leave the feed entirely rather than getting a low bid, because in PMax a low bid is not a control. And since supplier prices move, the labels rebuild daily off your cost file, not quarterly by hand.

Phone orders change how I read every number in the account before I read any of them. Roughly a third of revenue is currently invisible, so no CPA or ROAS in the platform is describing your business. First fix is GCLID capture at the call, stored against the order in your system, then offline conversion import with the real order value, which also lets Smart Bidding see phone revenue instead of guessing at it. Second fix is refusing to assume the missing third is proportional. It is probably skewed toward higher AOV and toward particular categories, and that is exactly the distortion that misprices your feed segments.

Where this may not fit you. The largest catalogues I have worked on run in the thousands, not the hundreds of thousands. Merchant Center administration and feed rules on Shopify Plus, brand and non-brand separation, margin-based bidding, offline import, change history review, all of that is well inside what I do. A quarter million line feed is not. Better said now than discovered in week two.

Structure. Fixed fee, not hourly, because you should not be paying me to be thorough. $1,500 covers the written audit with the evidence behind each finding, the recorded walkthrough, and the do now, test, leave alone list. Start within a week of access.

One question before anything else. What does your cost file look like today, and does anything already join supplier cost to item ID?


Peterson
