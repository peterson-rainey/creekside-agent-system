# Upwork Proposal - UNSENT
Job: "Meta Ads Specialist Needed – Campaign Structure, Optimization & Scaling for Fashion E-commerce". US footwear/fashion brand (women's + men's footwear, handbags, jewelry, accessories). Shopify store serving the US, physical store in Midtown Manhattan, Meta catalog, Pixel + CAPI live, ads running. Wants an audit + restructure (prospecting, retargeting, DPA/catalog, existing customers, NYC store "where appropriate", creative testing, scaling), then monthly management. Seven "when applying" questions. Closes: "someone who will personally review and manage the account".
Profile: Samuel Rainey (General) | Style: samuel_strategic, diagnostic body (asked as "strategic + diagnostic", no profile named) | Date: 2026-09-28 (Postgres now() 15:15 UTC) | MAIN: 669 prose words (694 with headers), 4,046 chars | no attachments, no pricing, no sign-off, no links

## TWIN: a Lindsey draft of this SAME job exists. SEND ONE.
- `.claude/upwork-drafts/2026-09-28_nyc-footwear-fashion-shopify-meta-audit-restructure-scale_lindsey_default_UNSENT.md` (parallel session, saved 15:39 UTC while this draft was in its first QC round, committed 10a263b5). Its header says "no twin" because this file did not exist yet.
- Divergence was handled on the SAMUEL side; the Lindsey draft does not need to change. Lindsey keeps: the Midtown-regulars-look-new opener, the camera brand, the 232-ads detail, ROAS figures, the boutique, the spend bracket close ($5,000 vs $25,000). Samuel MAIN uses: the catalog / 50-a-week arithmetic opener, Meta's two-ad-set replacement for the retired cap + audience segment reporting, the October launch timing, cost per conversion (not ROAS) on the spa parts store, the furniture brand instead of the camera brand, and a NON-spend close (weekly purchases).
- Diff vs the twin's CURRENT text (re-read after its QC edits): 5 shared 3-grams, all generic ("2 to 7", "a month in", "from advantage+ sales", "the ad account", "you'd get a").
- Shared ground that cannot be engineered away: both cite the same spa parts store (11 to 7 campaigns, ~$8 CPM) and both mention the retired existing-customer cap.
- Recommendation: send LINDSEY's. The post asks for the person who will "personally review and manage the account" and bans generic agency proposals; she runs every account both drafts cite and can say "I". Send Samuel instead only if you want the fuller structure answer; then use the ALTERNATE below.

## Screens
- Duplicate: `upwork_jobs` has no row for this title, "Midtown Manhattan", "footwear/fashion brand", "handbags, jewelry and accessories" or "NYC/local retail store campaigns" (nearest: 8/7 General + 8/10 Lindsey "Meta Ads Manager Needed to Scale Women's Fashion E-Commerce Brand", a different post).
- Profile fork: bare "strategic + diagnostic" = Samuel (as Kasumee 9/16, Classy Collection 9/10). Meta-only DTC ecom is Lindsey's lane.
- Ads in scope: yes, Meta only, owner-operated brand. Not white-label. Not a seat ("full time" absent, no hours, no non-duties clause).
- Spend: NOT STATED ("appropriate for our current budget" hints modest). $5K floor unmeasured. MAIN leaves the spend ask to the Lindsey twin (twin rule: one profile owns the spend ask); the ALTERNATE asks it.
- Geo: US. Pass.
- Rate / job type / payment verification / client history: not in the paste. Check the live post.
- Required items (7): all answered. Gaps stated in the body: fashion/footwear/apparel/accessories = zero citable results; store-visit campaigns = zero results. "Preferably fashion" is a preference, not a gate (contrast LÈBEN eyewear 8/26, which demanded that proof and excluded % of spend).
- "Personally review and manage": YELLOW for Samuel. Answered with roles: the Meta specialist does the audit and runs the account, tracking specialist on Pixel/CAPI, Samuel on structure and reasoning.
- Weekly reporting asked: live dashboard + written summary every other week, per your 9/23 and 9/25 rulings.
- Hidden AI-canary lines: none in the paste.

## Verified 2026-09-28
Meta's own pages (in-app browser, today unless dated):
- A. Business Help 1142614290190459: existing customer budget cap "is no longer available. You can still do the same thing manually": exclude existing-customer custom audiences, or one campaign with 2 ad sets (existing customers included, not as a suggestion, under an ad set spending limit; a duplicate that excludes them; same creative).
- B. Business Help 1362234537597370: "most advanced AI optimizations are enabled when your sales campaign uses Advantage+ audience, placement and budget"; audience segments enable reporting breakdowns for new, engaged or existing audiences.
- C. Business Help 112167992830700 (9/16): learning exits after about 50 results in the week after the last significant edit.
- D. Business Help 316478108955072 (9/16): adding a new ad to an ad set is a significant edit; big budget changes may be.
- E. Business Help 1423851372208214 (9/16): creative test = 2 to 7 copies of an existing ad in an existing campaign, learnings retained, Highest volume only, no more than 20% of budget suggested.
- F. Meta for Developers, offline events via Conversions API (updated Jan 5 2026): recommended way to send physical store events for measurement, attribution and targeting; customer info params include hashed email and phone.
Live DB (contractor_query):
- G. Meta spend, all client accounts, 8/29-9/27: $153,031 (14 ad accounts, 13 clients); ~$92.8K is one dental lead-gen account. Largest live ecom account ~$16.3K (Nightlark, conversions NULL, not citable).
- H. Master Spa Parts (act_2752863238119036, hot tub/spa parts, operator Lindsey B., paid audit Jan 29-30, taken over Feb 3, churned May 28, not performance): Jan 11 campaigns with spend / $15,587.79 / $34.72 / CPM $8.10; Feb 14 / $12,320.68 / $31.75 / $7.38; Mar 7 / $14,900.10 / $25.30 / $8.25; Apr 1-29 7 / $13,223.56 / $19.89 / $8.18; May 3-26 7 / $11,614.54 / $22.91 / $7.75. No record of WHY it improved, so the caveat stays.
- I. Neue Maison (act_782415276397596, luxury furniture, operator Lindsey B., tenure 4/10-8/10, churned 8/11 "Taking in-house"): Apr 10-30 $12,373.92, May $24,861.44, Jun $23,870.58, Jul $40,389.21, Aug 1-10 $3,515.09. Sales-objective campaigns $91,502.92 / 334 conv = $273.96. 59% of July spend was the "July 4th - 50%" campaign. Never pair the $105K total with $275.
- J. Blush Camera (ALTERNATE only): no spend 2025-09-21 to 2026-02-01; Feb $4,801.98 to May $19,972.01; total $58,298.09 / 623 conv / $93.58. ROAS not cited.
- K. Book Meta CPM Oct 2025 $24.45, Nov $33.78 (cut from the body at QC: mid-2026 CPMs were higher, so no Q4-peak framing).

## Reviews
- qc-reviewer-agent on v4: PASS WITH FIXES, both applied (creative test = "versions of an existing ad"; Oct-to-Nov CPM figures cut).
- expert-review-agent on v4: Good. Applied: catalog ads in prospecting, audience segment reporting, purchase optimization + Shopify cross-check, "live dashboard you can open anytime", specialist does the audit and runs it. NOT applied: its "same person every time, not a rotating team" rewrite (unverifiable, used em dashes).
- qc-reviewer-agent recheck on v6 (now the ALTERNATE): PASS, no fixes.
- qc-reviewer-agent on v7c (MAIN, after the twin rebuild): PASS WITH FIXES, all 3 applied (Samuel no longer the one sending store sales to Meta; 50%-off July note on the furniture brand; spa-parts caveat reshaped so it doesn't mirror Lindsey's). After QC: reporting sentence reworded (twin had added the same house line), and "campaigns" changed to "ad sets" in the opener and close so the learning math matches its unit. Not re-run through QC; each change re-checked against the facts above.

## Open for Queenie
1. SEND ONE profile (recommendation: Lindsey). See TWIN above.
2. Length: MAIN is 669 words against 250-350 (400 multi-question); the post asks 7 questions + 6 "tell us" items and every section answers one. A ~500-word cut would drop the timing line, the Shopify cross-check sentence and the audience-segment clause first.
3. Spend, job type, rate, payment verification: check the live post. If fixed-price, bid $1,500 (the one-time Meta onboarding fee, audit + rebuild included; management then % of spend, $1,500/mo minimum). If hourly, it needs your call (capped paid-test carve-out). Nothing is typed in the body.
4. Q1's "$150,000" is a portfolio figure; ~$93K of it is one dental account. If they probe ecom, the largest live ecom account is ~$16K/month with no citable results.
5. DB log INSERT skipped (contractor_query cannot INSERT).

## Suggested case study
- Best: Master Spa Parts (hot tub/spa parts ecom, Meta, Lindsey; paid audit, takeover, restructure; ~$13-15K/mo; $34.72 to $19.89 at flat ~$8 CPM). CITE-ONLY, genericized. No PDF exists.
- Second (MAIN): Neue Maison (luxury furniture DTC, Meta, Lindsey; ~$25K to $40K/mo; sales campaigns ~$275 per conversion). CITE-ONLY. No PDF.
- Second (ALTERNATE / Lindsey twin): Blush Camera. CITE-ONLY; `Blush_Camera.pdf` is DO-NOT-ATTACH (revenue headline fails the spend denominator, manus.im print artifacts).
- Gap: fashion/footwear/apparel/accessories = zero citable; store-traffic campaigns = zero.
- Attach: NOTHING. The one clean Meta PDF (`.claude/attachments/unrefined_meal_prep_CLEAN.pdf`) is meal prep and off-category.

## PROPOSAL (paste-ready, MAIN)

Footwear, handbags and jewelry sharing one catalog makes it tempting to give each category and audience its own campaign. Meta needs about 50 purchases a week in an ad set before it finishes learning, though, so the purchases Meta records each week cap how much structure the account can carry: at 150 a week, about three ad sets that learn properly.

**The structure I'd expect**

Usually one sales campaign with two ad sets: new customers, with past buyers excluded and catalog and creative ads side by side, and existing customers under a spending limit. That split is how Meta now says to replace the existing customer budget cap it removed from Advantage+ Sales, and once existing customers are defined, audience segment reporting shows how much spend was reaching them. Add one catalog retargeting campaign sized to what its pool absorbs before frequency climbs, and everything else merges in or stops. New customers run broad with Advantage+ settings on, where Meta's strongest optimizations run, and hard targeting is only for existing customers, retargeting and any store radius. Ad sets optimize for purchases where volume allows, and Meta's reported sales get checked against Shopify orders before anything scales.

**Budget steps, cuts and timing**

A campaign earns more budget after a full week with new-customer cost per purchase under target, and it gets it in moderate steps, because a large increase can put its ad sets back into learning. An ad that has spent twice the target without a sale is switched off, a campaign near target holds, and one well under it gets the next step. The rebuilt account should go live in October, giving it time to learn before Black Friday, with only small budget moves through Cyber Monday.

**Testing creative inside the campaigns you keep**

Meta's built-in creative test runs 2 to 7 versions of an existing ad on up to about a fifth of the campaign's budget, needs Highest volume bidding, and leaves the winners running where they already learned. Because every ad added to a live ad set is an edit that restarts learning, new creative ships in scheduled batches. Results get read by category and by how the product is shown (on foot, styled, flat lay), and that becomes the brief for the content team.

**Midtown**

Online conversion campaigns: that's the bulk of our e-commerce work. Store-visit campaigns: none with results to show. For Midtown, the baseline is a year of weekly register sales, with store sales sent to Meta through the Conversions API wherever checkout captures a phone number or email, before any store campaign gets a budget.

**Our record**

We manage about $150,000 a month in Meta spend across client accounts right now. A hot tub and spa parts store came to us through a paid audit in January, and the cleanup changed several things at once, the campaign count among them. In January it ran 11 campaigns on about $15,600 a month at $34.72 per conversion. By April, under our team, it ran 7 campaigns on $13,200 at $19.89, then $22.91 in May, with CPM near $8 throughout. A luxury furniture brand we ran from April to August went from about $25,000 to $40,000 a month on Meta, with a 50%-off sale taking most of July's spend, and its sales campaigns averaged about $275 per conversion. Neither is fashion, and we have no fashion results to quote.

**Access and who does the work**

To audit, we'd need the ad account, catalog and Pixel shared to our Business Manager, read access to Shopify orders and analytics, and that year of weekly store sales. A Meta specialist on our team would do the audit and then run the account day to day, our tracking specialist handles the Pixel and CAPI, and I stay on the structure and the reasoning behind it. Results sit on a live dashboard you can open anytime, and every other week you'd get a written summary of what's being cut, kept and scaled, and what the content team should make next.

How many purchases does Meta record in a typical week right now? That one number decides how many ad sets the new structure can hold.

- Last question: "How many purchases does Meta record in a typical week right now?"
- Last sentence: "That one number decides how many ad sets the new structure can hold."

## ALTERNATE (v6, QC PASS): use ONLY if Samuel is sent and the Lindsey twin is NOT
Stronger hook when sent alone (the retired-cap opener), but it shares the twin's opener angle and camera-brand proof, so never send it alongside Lindsey's.

Meta has retired the existing customer budget cap in Advantage+ Sales. Unless past buyers are now excluded by hand, part of what reads as prospecting is reaching people who already buy from you online or at the Midtown store, which tends to flatter ROAS on the campaigns you'd scale. Meta's audience segment reporting shows that share once existing customers are defined, so the audit starts there.

**How many campaigns, and where the budget goes**

Weekly purchases set the number. Meta needs about 50 results a week for an ad set to finish learning, so 150 purchases a week supports about three ad sets that learn properly. For a catalog brand that's usually one sales campaign with two ad sets: new customers, with past buyers excluded and catalog and creative ads side by side, and existing customers under a spending limit, which is Meta's own stand-in for the cap. Add one catalog retargeting campaign, and the rest merges in or stops. New customers run broad with Advantage+ settings on, where Meta's strongest optimizations run, and hard targeting stays for existing customers, retargeting and any store radius. Retargeting gets what its pool absorbs before frequency climbs. Ad sets optimize for purchases where volume allows, and Meta's reported sales get checked against Shopify orders before anything scales.

**Scaling and cutting**

Budget rises in steps once new-customer cost per purchase has held under target for a week, since a big jump can send an ad set back into learning. An ad that has spent twice target without a sale comes out, a campaign near target holds, and one well under it gets the next step. The new structure should launch in October so it can learn before Black Friday, with only small budget moves through Cyber Monday.

**Creative testing**

Meta's creative test adds 2 to 7 test versions of an existing ad inside the same campaign, on up to about 20% of its budget (Highest volume bidding only), and winners keep what the campaign learned. Since each added ad sends an ad set back into learning, creative goes in batches, tagged by product line, format (on foot, styled look, flat lay) and hook. Those tags write the content team's briefs.

**The Midtown store**

Online conversion campaigns, yes. Store-visit campaigns, not with results I can show you. The closest was a four-store women's clothing boutique whose Meta ads our team ran for online sales. The Pixel can't see a Midtown register sale, so before the store gets budget I'd want those sales reaching Meta through the Conversions API, matched on the email or phone taken at checkout.

**Our Meta work**

About $150,000 a month in Meta spend across our client accounts right now. A hot tub and spa parts store came to us through a paid audit in January, running 11 campaigns on about $15,600 a month at $34.72 per conversion. By April, under our team, it ran 7 campaigns on $13,200 at $19.89, then $22.91 in May, with CPM near $8 throughout. Several things changed at once, so I won't credit the structure alone. A consumer camera brand went from no Meta spend to about $20,000 a month in four months, averaging $93.58 per conversion. Neither is fashion, and we have no fashion results to quote.

**Access, and who does the work**

For the audit: partner access in Business Manager to the ad account, Pixel dataset and catalog, Shopify access to orders and analytics, and the store's weekly sales for the past year. A Meta specialist on our team would do the audit and then run the account day to day, our tracking specialist handles the Pixel and CAPI, and I stay on the structure and the reasoning behind it. Reporting is a live dashboard you can check any day, plus a written read every two weeks on what to cut, keep and scale and what to make next.

Roughly how many purchases does Meta record in a week now, and is monthly spend closer to $10,000 or $30,000? Those two numbers decide how many campaigns the new structure can hold.

- Last question: "Roughly how many purchases does Meta record in a week now, and is monthly spend closer to $10,000 or $30,000?"
- Last sentence: "Those two numbers decide how many campaigns the new structure can hold."
