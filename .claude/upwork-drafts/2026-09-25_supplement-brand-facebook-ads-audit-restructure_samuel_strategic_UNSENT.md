# Upwork Proposal - UNSENT
Job: Supplement brand, Facebook Ads account review. Uneven performance; full audit, strategy, revised campaign structure, creative/messaging guidance, conversion tracking review, optimization notes tied to data; cleanup where structure blocks optimization. Wants differentiation + repeat purchase experience.
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-25 (Postgres now() 15:48 UTC)

## Screens
- Duplicate: no upwork_jobs row matching this post (checked supplement rows back to 8/19: VIBRA, Google supplement buyer, native 8-fig, etc., all different posts). No hit in any drafts folder. No concurrent commit.
- Platform: Meta only. Lindsey twin possible (Meta DTC), not drafted.
- Ads in scope: YES. Not white-label, not a seat, no trial, no hourly named, no CRO gate.
- Spend: NOT STATED. Asked as a bracket ($5,000 vs $20,000) against the $5K floor.
- Geo, payment verification, budget/contract type: not in the paste, UNSCREENED.
- Proof: supplement = ZERO (reference_no_supplement_case_study). Soft ask, not a named-brand demand, so disclosed in one line.

## Verified this session
- Master Spa Parts (Meta, churned 5/28, taken over 2/3/26), meta_insights_daily JOIN meta_campaigns, tracked rows only (conversions IS NOT NULL): Jan (inherited) $12,666 / 449 / $28.21 CPA, CPM $8.16, 11 campaigns with spend. Apr $12,455 / 665 / $18.73, CPM $8.40, 6 campaigns. May $21.43, CPM $7.89, 6 campaigns. 232 active ads on $15K/mo = owner's 1/27/26 email (memory). Audit also changed targeting + creative, stated in body, no mechanism claimed.
- CI Lifestyle Meals: tracked rows $8,326 / 844 = $9.87 (2026-01-13 to 2026-08-18), per memory reference_meta_insights_null_conversions_inflate_cpa. Tracking went NULL after 8/18, so phrased "across the days purchase tracking reported cleanly."
- Meta "Privacy Violations and Personal Attributes" ad standard: bars ads that assert or imply personal attributes incl. health/medical condition (Transparency Center page title confirmed via search; policy page itself would not load in-app, wording corroborated by several secondary sources).

## Deliberately out
- Pricing (not asked). Punch Drunk 20x, CI Lifestyle 4.52x/$25, Fitness Superstore (all fail live).
- No links, no names, no sign-off, no em dashes.

## QC
- qc-reviewer PASS WITH FIXES: applied hedge-before-number, dropped "flat CPM" (Jan $8.16 vs Apr $8.40), header renamed from "Creative and messaging" (parroting), trimmed. Kept "I'd" (Samuel profile is first person; the ban is on naming principals as the worker).

## Attachment: NONE (DTC Meta shelf has zero attachable case studies).

## PROPOSAL

Uneven results on a supplement Facebook Ads account usually come from new and returning customers being measured as one number. When reorders and first purchases sit in the same campaigns and the same ROAS, a strong reorder week makes the account look healthy and a quiet one makes it look broken, while the actual cost of a new customer barely moves. Meta can report new and existing customers separately once your customer list is connected, and that split is where I'd start the audit, because it changes which campaigns really look like winners.

**What the audit covers**

Tracking first. Brands with subscriptions often have renewals or upsell orders passing through the Conversions API as new purchases, which inflates results and teaches Meta to chase people who were already buying. We check pixel and server event deduplication, which purchases count, and whether Meta's numbers line up with Shopify.

Then structure. Most uneven accounts have too many campaigns and ad sets splitting too little data, so nothing gets out of the learning phase. The usual rebuild is a new-customer campaign, a retargeting layer, and a separate lane for existing customers timed to the reorder window, each judged against its own target.

**Trust and creative**

Meta doesn't allow ads that imply a viewer's health condition ("struggling with bloating?"), so the trust has to come from proof: ingredient amounts, third-party testing, real reviews, and a clear reason your formula is different from the one next to it. Testing works best with one variable per round, angle first, then hook and format.

Every recommendation ties back to account data, and changes get made in the account, not just listed in a document.

**Relevant experience**

We haven't run a supplement account. The closest matches in our book: a meal prep brand, also a repeat-purchase product, running on Meta at about $10 per purchase across the days purchase tracking reported cleanly. And a replacement parts ecommerce brand that came to us with 232 active ads across 11 campaigns. Targeting and creative changed in the same stretch, so structure wasn't the only lever, but it went from 11 campaigns to 6 and cost per purchase moved from $28 in the inherited month to $19 by April, then $21 in May.

Roughly where does monthly Meta spend sit right now, closer to $5,000 or $20,000?
