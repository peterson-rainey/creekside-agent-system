# Precious metals dealer (CTO) — WooCommerce to Shopify migration, Meta audit + Google build from scratch
Profile: Samuel | Style: strategic | Drafted 2026-08-28 | STATUS: UNSENT | PROVISIONAL (spend unknown)

## Screening
- HOURLY SEAT DQ: "hourly, long-term, fewer than 30 hours per week." Banned shape, not the IVC carve-out
  (capped/short X, paid Y, gate-to-management X, rate demanded of us X). **Queenie: DRAFT IT ANYWAY 2026-08-28.**
  Fifth non-skip in 22+ rulings. Handling: never raise contract type. No rate, no model, no fixed-price counter.
  Model is UNRESOLVED and is a live obligation on touch 2.
- Live cohort re-verified 2026-08-28 on `upwork_jobs`: descriptions containing an hours-per-week count =
  **124 applications, 48 viewed, 16 messaged, 2 calls, 0 WON.** (Was 117/0 on 8/28; still zero.)
- SPEND: not stated anywhere. $5K/mo screen UNMEASURABLE, not cleared. Ninth consecutive. Asked as a range in-draft.
- HOURLY RATE: not in the paste. $40 floor UNVERIFIED. Post demands no rate from us, which is what made the
  8/28 overrides affordable and is why the profile-rate dodge was not needed here.
- SEAT TELLS: no hard ones (no "full-time", no salary, no resume ask, no desk hours, no timezone,
  no negative-duties clause). Soft only (Responsibilities list, Required experience block). "Comfortable working
  independently" reads vendor-side. Does NOT enumerate % of ad spend as excluded, so no forced collision.
- GEO: fine. Requires US/CA contractor; Samuel is Nashville TN.
- PROFILE/STYLE: no mismatch. Merchant Center + Google-inclusive = Samuel post per the platform-first
  resolution order. "Strategic" is a Samuel style.

## Proof gaps (flagged, not papered over)
- **Meta Conversions API + event deduplication: ZERO proof.** Named twice in the post (responsibility AND
  required experience). 0/28 case studies; every `agent_knowledge` hit for dedup is internal Gmail/DB dedup.
  Handled by technical specificity (event_id parity, Shopify native channel double-firing) rather than any
  claimed named result. No CAPI outcome is asserted anywhere in the draft.
- Zero precious metals proof: 0/28 case studies, 0/130 clients. One adjacent job ever applied to,
  "Meta Ads Specialist Needed for B2B Gold Jewelry Brand" (2026-03-10), viewed, never messaged, lost.
- Video ad proof is thin (whole video book = 1 acct, $495, 0 conv). Draft claims no video result.

## Verified proof used
**Aura Displays (Google, Shopify, ACTIVE)** — per [[reference_ecom_proof_status]], verified live 2026-08-24/26:
- BUILT from zero by us. `clients.start_date` 2025-11-06, zero insights rows before 11/02, all campaigns
  carry the `CM -` prefix. It is a SCALING story, never a takeover. Draft says "built from nothing."
- Segment figures (May-Aug 2026): Branded Search 26.91x / Non-brand Search 4.29x / Shopping 4.00x / PMax 4.27x.
- Non-brand decay: Nov 25 11.56x -> Aug 26 4.37x as cold spend scaled ~4x. Cited as the honest shape of scaling.
- NOT CITED: blended ROAS (branded artifact, banned), "49 countries" (an attempt at 0.65x, not a win),
  "$1M+/month" (organic Shopify revenue, not spend), "$35K+/mo managed spend" (contradicted live at $4.5-9.3K).
**Tiami Sleep** — active, Google + Meta, high-AOV considered-purchase Shopify. Not cited: non-brand results
are zero and roas is NULL. Held back for a call.

## Compliance with standing rules
No links or URLs. No em dashes. No pricing, no rate, no hours. No calendar link. Sign-off two line breaks then
"Samuel". 355 words. 2,013 characters, well under the 5,000 cap. Opens on their business, not "I".

## PROPOSAL

The margin structure is what breaks most precious metals accounts, and it breaks the measurement before it ever breaks the media buying. If Shopify order value goes into Meta and Google as the conversion value and you bid to a target ROAS, both platforms will learn to chase your largest orders. On bullion that is close to the worst outcome available, because a $5,000 gold order at a couple of points over spot can earn you less than a much smaller order on a premium or numismatic product. The fix is to send margin as the conversion value rather than the order total, so the bidding optimizes toward the money you actually keep.

Second thing, and it is the one I would audit before the pixel. Your three years of Meta purchase history and your catalog are keyed to WooCommerce product IDs. If Shopify issued new IDs during the migration, the catalog signal, the product level audiences and anything dynamic stop mapping to the history you are planning to build on. That is checkable in an afternoon and it decides how much of the old data is genuinely usable.

On dedup specifically, the two failures I would look for first are event_id parity between browser and server events, and Shopify's native Meta channel firing alongside a pixel that got installed manually during the move. Double counted purchases will make everything downstream look better than it is.

Closest work to yours is a Shopify brand where Google was built from nothing, Search, Shopping and PMax off a Merchant Center feed. The useful number is not the headline. Branded search runs near 27x there and non brand sits near 4x, and when we scaled cold spend roughly four times over, non brand ROAS fell from 11.5x to about 4.2x. It was still worth doing. That is the real shape of scaling, and non brand is the number I would want you judging me on.

Two things would tell me the most before we talk. What is your average gross margin per order, and roughly what range are you spending a month across both platforms right now?


Samuel

---

# SCREENING ANSWERS (5 questions received 2026-08-28)

## Verification done before answering (all live, this session)

**FINDING 1 — Aura Displays has NO Meta ad account.** Not present in `meta_ad_accounts` under any name or
client_id. The `case_studies` row says platforms = `["Google Ads","Meta Ads"]` and the SDR "Proven Results by
Industry" SOP says "Google + Meta." **Both are wrong. Aura is Google-only.** This kills Aura as a Q1 answer,
since Q1 requires one account with both platforms. See [[reference_aura_is_google_only]].

**FINDING 2 — Tiami Sleep is dual-platform but has no citable results on either side.**
Meta `act_1401195627889544`: $46,866 spend, 2025-11-13 to 2026-08-27, ~$4-6K/mo. **`conversions` and `roas`
are NULL on essentially every row** (Nov 582/582 null, Dec 1022/1023, Jan-May and Aug 100% null). The "16
conversions" total is a tracking artifact, not performance. Google `1537044023` only launched 2026-08-03:
Shopping $1,460/0 conv, cold Search $980/0 conv, Demand Gen $595/0 conv, branded Search $425/2 conv/10.92x.
**Neither side is quotable.**

**FINDING 3 — Myriad Traders (Practical Survival) is the ONLY Shopify-shaped ecom account with real,
concurrent, measurable data on both platforms.** Google: $15,625 / 352.1 conv / $30,061 / **1.92x**,
2026-07-07 to 2026-08-27. Meta: $4,643 / 148 conv / $10,611 / **2.29x**, 2026-07-08 to 2026-07-15 (8 days).
Both under 2.5x and both very young. Nightlark was checked and rejected: Google **0.21x** ($2,821 / $580) and
Meta tracking NULL. Scattered Kind is Google PMax 3.18x / Shopping 1.99x with negligible Meta.

**CONCLUSION: Q1 as written has no compliant answer.** There is no Shopify account in the book where we
personally ran both Meta and Google with a documented before-and-after ROAS improvement. Every candidate
fails at least one axis (Aura: no Meta, no "before"; Tiami: no results; Myriad: no "before", both under 2.5x,
8 days of Meta). Per [[feedback_screen_required_items_for_proof_gaps]] this is an unanswerable proof demand.
**Queenie said "Answer each," so Q1 states the limit plainly and gives the two real accounts that each cover
half of it, including the failures.** Nothing is merged, nothing is inflated. This is the Maré Q5 handling.

**Aura live figures used (broad bucket = everything except the branded campaign; bucket stated per
[[reference_ecom_proof_status]]). Pulled from `google_insights_daily` + `google_campaigns`, account
`7860902494`, 2025-11-02 to 2026-08-27:**
| Segment | Cost | Conv | Value | ROAS |
|---|---|---|---|---|
| Brand Search | $25,321 | 1,499.5 | $728,329 | 28.76x |
| Non-brand Search | $27,299 | 258.8 | $143,135 | 5.24x |
| Non-brand Shopping | $22,685 | 250.7 | $131,464 | 5.80x |
| Non-brand PMax | $6,632 | 67.8 | $35,082 | 5.29x |
| Demand Gen | $108 | 0.0 | $0 | 0.00x |

Non-brand by month: Nov 11.56x ($1,901) / Dec 8.38x / Jan 5.16x / Feb 6.62x / Mar 4.81x ($8,813 peak spend) /
Apr 5.79x / May 4.17x / Jun 4.16x / Jul 4.10x / **Aug 3.69x ($4,029)**. Account monthly spend $5,372-$11,927.

**Clients are described, never named** (Maré precedent: "I will obscure the client name, that is not mine to
hand out"). No CAPI result is claimed anywhere. No precious metals experience is claimed anywhere.

---

## Q1 — One Shopify account, both Meta and Google, before and after

Straight answer first, because you will check it. I do not have a single Shopify store where I ran Meta and Google side by side and can hand you a clean before and after ROAS. The two accounts that get closest each cover about half of what you asked, so here is both, with the parts that did not work.

The Google one is a Shopify brand selling portable display equipment. I built it from nothing in November 2025, which means there is no before. That is the honest limitation and I am not going to invent a baseline. Since launch it has run about $82,000 in spend against roughly $1,038,000 in tracked conversion value, at $5,400 to $11,900 a month. The blended number is meaningless and I will not quote it, because branded search runs 28.76x on $25,300 and drags the average up. The real numbers are non brand search at 5.24x on $27,300, shopping at 5.80x on $22,700, and Performance Max at 5.29x on $6,600. A Demand Gen test spent $108, produced zero conversions, and I killed it in two days.

What I actually changed. The account was living on branded search, which looks great and buys you nothing. I split branded into its own capped campaign so the blend stopped lying, then opened a non brand lane through shopping and non brand search. Here is the part worth your attention: as I scaled non brand spend from $1,900 to a peak of $8,800 a month, non brand ROAS fell from 11.56x to 3.69x. It was still the right call at that margin. Efficiency decaying while contribution grows is what scaling actually looks like.

The dual platform one is a Shopify survival and preparedness brand, both channels running concurrently since July. Google is at 1.92x on $15,625 with 352 purchases, Meta at 2.29x on $4,643 with 148 purchases across an eight day window. Early, thin, and under 2.5x, so I am not selling it as a win. I mention it because that customer overlaps yours more than anything else I run.

## Q2 — Auditing three years of data in the first 14 days

Days one to three are inventory and a freeze on budget changes. I enumerate every measurement surface before touching any of it: pixel and dataset IDs, GA4 properties and streams, every Google Ads conversion action, GTM containers web and server, Shopify's native Meta and Google sales channels, and any app injected tags. Shopify apps quietly install their own pixels and a migration is when that surfaces.

The single most likely defect is a double fire. Shopify's native Meta channel sends Purchase, and a pixel hardcoded into the theme during the move sends Purchase again. Two events, no shared event_id, nothing to deduplicate against. For dedup specifically I check that browser and server Purchase share both event_id and event_name, since Meta matches on the pair and not on one of them. Then whether fbp, fbc, hashed email, phone and external_id are actually reaching the server payload, because without them match quality collapses and server only attribution inflates. I read Event Match Quality per event and treat Purchase below roughly 6 as unfinished. I also check the 48 hour dedup window, since late server events arriving outside it count twice.

GA4 next. One measurement ID, not the Woo tag plus the Shopify one. Then purchase count against Shopify orders for the same window in the same timezone, where anything past 5 percent is a real defect. I confirm transaction_id is populated and equals the Shopify order ID, which is what stops refresh and back navigation from double counting.

On Google Ads the migration failure is two primary purchase actions, the retired Woo one and the new Shopify one, both counted, with Smart Bidding pricing a world that does not exist. One primary. Everything else secondary. Then enhanced conversions verified by match rate in diagnostics, not by the toggle being on.

Value and currency get reconciled on one row: Shopify net sales, GA4 revenue, Meta purchase value, Google conversion value, thirty days, every gap explained. Missing currency parameters make Meta assume account currency and misprice everything silently. I check test orders and POS orders are not leaking in.

Audiences are where three years actually lives or dies. If Shopify reissued product IDs, your catalog content_ids no longer match what the pixel fires and the historical catalog signal is orphaned. Website audiences built on Woo URL paths stop filling on Shopify paths and decay over the retention window. The durable move is uploading the purchase history as a hashed customer list and building value based lookalikes from it, because that survives any URL or ID change.

Go live criteria, and budgets do not move until all six pass: one Purchase per order observed over 72 hours, Meta purchases within 5 percent of Shopify, GA4 within 5 percent with transaction_id on every order, one primary Google action within 5 percent, Event Match Quality at 6 or better, and the catalog ingesting with content_ids matching the pixel.

## Q3 — Exact Google Ads setup for a new Shopify store

Merchant Center first. Domain claimed and verified in Search Console, Shopify's Google and YouTube channel as the primary feed, plus a supplemental feed for overrides I do not want to manage in Shopify.

Two things are specific to your category. Bullion frequently has no GTIN, so identifier_exists has to be set false rather than left blank or those products get disapproved. And price accuracy will be your recurring suspension risk, because your prices move with spot and the default feed refresh does not. The feed needs scheduled fetches several times a day and the structured data price on the product page has to match the feed at every moment, or Merchant Center flags a mismatch. I would also carry custom_label_0 for margin band, custom_label_1 for metal, and custom_label_2 for price band, because those labels are what let you bid differently on thin bullion versus premium product.

GA4 is one property and one stream, Shopify native or GTM but never both, enhanced measurement on with anything that duplicates ecommerce events switched off, and purchase marked as a key event. Either import it to Ads or use the Google tag directly. Not both.

Primary is Purchase and nothing else. Add to cart, begin checkout, view item and signups all sit secondary. Smart Bidding buys whatever is primary, so a micro action in there teaches it to buy cheap noise. If purchase volume is genuinely too thin to bid on, I will run begin checkout as a temporary primary with a value and tell you it is temporary.

Enhanced conversions for web through the Google tag with hashed user provided data from checkout, verified by the reported match rate. Consent Mode v2 with ad_user_data and ad_personalization wired to Shopify's customer privacy API, so the banner and the tag are actually connected.

Structure. Brand search in its own capped campaign on exact and phrase, and this is the most important structural decision you will make, because brand will otherwise eat budget and inflate every number you look at. Non brand search split by intent, product and metal terms separate from category terms. Shopping split by margin band using the custom labels rather than one catch all, so the thin band can run a low target while the high margin band runs aggressive. Performance Max only after shopping and search have data, feed only asset group first, and with account level brand exclusions applied, otherwise it cannibalizes brand and reports it back to you as new revenue. Remarketing layered onto search rather than run as a separate display campaign.

Negatives from day one as shared lists: informational terms like spot price and gold price today, and the whole sell my gold and we buy gold cluster, which is your intent exactly inverted. Search terms reviewed three times a week for the first month.

Auto tagging on for GCLID, plus ValueTrack UTMs that do not conflict with it, so Shopify and the Ads UI can be reconciled against each other. Naming stays consistent as platform, funnel, type, segment, date.

Validation before spend scales: a real test purchase producing exactly one Ads conversion, one GA4 purchase and one Shopify order at matching value, Merchant Center at zero critical disapprovals, and a 72 hour reconciliation.

## Q4 — Break-even ROAS with a worked example

Break even ROAS is AOV divided by contribution per order, where contribution is gross margin minus payment fees minus fulfillment, then adjusted for cancellations. The reason it matters more in your category than almost any other is that margin percentage moves inversely to order size, so two products in the same store need completely different targets.

Take a bullion order. AOV $2,500 at 3 percent over spot is $75 gross. If that is paid by card at 2.9 percent plus $0.30, the processor takes $72.80 and your contribution is about $2. Break even ROAS would be 1,250x, which is another way of saying you cannot acquire card paying bullion customers at all. That is why the wire and check discount exists. Paid by wire at roughly $10 net cost you are at $65. Insured shipping at $25 takes you to $40. Assume 3 percent of orders cancel when spot moves and a market loss fee recovers part of it, call it $38.80. Break even ROAS is 2,500 divided by 38.80, or about 64x. Your maximum CPA is $38.80. To actually make money at a $20 CPA you need 125x.

Now a premium or numismatic order. AOV $600 at 20 percent is $120 gross. Card fees of $17.70 leave $102.30, shipping of $15 leaves $87.30, and 5 percent returns leave about $82.94. Break even ROAS is 7.2x with a maximum CPA of $82.94.

Same store. One line needs 64x and the other needs 7x. Any single account level target ROAS is guaranteed to be wrong for both, and it will quietly push budget toward the highest revenue and lowest profit orders you have.

The fix is to stop sending revenue. Send contribution margin as the conversion value. Break even then becomes 1.0 for every product regardless of metal or price, and you can run one coherent target across the account, say 2.5 on margin, and let the bidding sort the catalog out. It also solves your spot problem, because margin percentage stays roughly stable while revenue swings every time gold moves, so a revenue based target drifts constantly and a margin based one does not.

Two budget rules follow from that. Hold reserve rather than running flat daily budgets, because your demand spikes on spot moves and news, and a capped budget throttles you at the exact hour demand arrives. And push Shopify cancellations and refunds back into both platforms as conversion adjustments and refund events, so they learn from net rather than gross.

## Q5 — First 30 days when history exists but no creative winner is known

The history is worth very different things on each platform, and that decides the split. On Google it is close to immediately usable, since intent plus a customer match list from three years of buyers gets you to revenue fast. On Meta it is worth a lot as seed audiences and value based lookalikes and worth nothing as a shortcut past creative testing, because no creative has been tested under the new setup. You have data, not answers.

Weeks one and two I would run roughly 60 percent Google and 40 percent Meta, for the simple reason that the Google side is deterministic work with a known payoff while the Meta side is a search. Within Google, about 15 percent to capped brand defense, 45 percent to non brand shopping split by margin band, 25 percent to non brand search, 15 percent to remarketing, and no Performance Max in month one. Within Meta, 70 percent cold and 30 percent retargeting, with the cold side kept to three ad sets at most. Fragmenting into more is the most common way an account never finishes learning.

Creative cadence. Week one is five concepts across distinct angles rather than five variations of one, each built as a static and a short video. The angles I would start with are the physical object itself, dealer trust and buyback, premium over spot and price transparency, the objections around storage authenticity and delivery, and IRA eligibility. Weeks two through four add four to six assets a week, retiring losers and iterating hooks on whichever angle survives.

Decision thresholds have to account for the arithmetic in question four. At a 64x break even you cannot judge creative on purchases quickly, so I judge on the signals that arrive first. Cut at $150 and three days if hook rate is weak and cost per outbound click is more than 1.5x the account median. Cut at $400 and seven days on cost per landing page view or cost per add to cart against the same benchmark. Only survivors past $600 and ten days get judged on cost per purchase, and never on ROAS with fewer than about five attributed purchases. On Google, no keyword decisions under 100 clicks and no structural changes under two weeks or 30 conversions.

Reporting is the weekly you described, with one addition. Every report carries a reconciliation row showing Shopify orders against GA4, Meta and Google, so nobody spends a call arguing about which number is real. Tracking breaks get flagged the day I see them, not saved for Friday.

Scaling. A Meta ad set gets more budget only after seven consecutive days above target on margin based value, then by 20 to 30 percent every three days so learning does not reset. Google scales where impression share lost to budget is above 10 percent in a segment already beating target, by budget rather than by loosening the target. Performance Max waits for month two and launches with brand exclusions. If after 30 days margin adjusted contribution is negative with no upward trend in the early signals, I would tell you to stop rather than ask for another month.
