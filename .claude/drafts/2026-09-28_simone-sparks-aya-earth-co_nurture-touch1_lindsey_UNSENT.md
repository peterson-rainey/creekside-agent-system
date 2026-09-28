# Upwork Nurture Touch 1 - Simone Sparks / AYA Earth Co (Shopify DTC body care, Canada)
Profile: Lindsey Bouffard | Type: nurture (reply in live thread) | Status: UNSENT | Drafted 2026-09-28 (Postgres now(); Monday, US Central)

## WHY THIS TOUCH, TODAY
Lindsey's final message in the sent thread (Aug 28) promised exactly this:
"Rather than leave the check-in on you, I'll reach out toward the end of September to see where things landed."
Today is the end of September. This is the kept promise, not a cold check-in.

## STATE VERIFIED THIS SESSION (contractor_query)
- `upwork_leads`: Simone Sparks, status = **nurture**, salesman = Lindsey, funnel "New Lead",
  created 2026-08-26, date_last_contacted 2026-08-27.
- `upwork_jobs`: ONE row only. "Meta Ads Specialist for Shopify Beauty Brand - Customer Acquisition &
  Creative Strategy", client Simone Sparks, profile_used = **Lindsey**, applied 2026-08-26, Canada,
  hourly, sheet_row_num 259. **No second Creekside profile bid this job**, so no twin to deconflict.
- `keyword_search_all('AYA Earth')` returns zero rows.
- No pre-existing draft for this lead anywhere in the repo.

## TWO LIVE GATES (per project_simone_sparks_aya_earth_lead.md)
1. **Margin** - return trigger handed to her as gross margin >=60%, self-serve. She is working it.
2. **Spend - NEVER CLEARED.** She named $1,500-$2,000 CAD/mo media (~$1,100-$1,460 USD) against a
   $5,000 USD floor. Our $1,500 USD/platform minimum EXCEEDS her entire monthly ad spend. Fixing
   margin does NOT fix this. The warning was already DELIVERED in the sent thread ("the media budget
   has to grow alongside the margin, since management only pencils out against a certain level of
   spend"), so it is on record and is deliberately NOT repeated here. Flagged, not bolted on.

## ANGLE
Add the layer the 60% gate is missing: breakeven ROAS is set by contribution margin per order, not by
gross margin as she is computing it. For body care the hidden line is shipping (three full-size jars
make a heavy box), and a launch or signup code does the same to realized AOV. Resolved forward by
holding the 60% number and changing what it is measured on, never by correcting the earlier figure.
Then the free-shipping threshold as the one lever, with its conversion trade-off stated.

## THE DRAFT (203 words)

Hey Simone, end of the month, so here's the check-in I promised.

One layer to add before you lock a price. Same math as before, one more input. Breakeven ROAS keys off what's left per order after everything that varies with the order, not just product, packaging and processing. Shipping is the one that hides. A scrub, a butter and an oil make a heavy box, so if you cover delivery to stay competitive, that cost comes out of the same order and never shows up in a cost of goods line. A launch code or a signup offer does the same thing to the price you actually collect.

You can land on 60% on paper and sit well under it per order, and paid traffic is an expensive place to find that out. Same 60% target, it just has to survive shipping and the discount.

The shipping side has a fix. Set free shipping just above the price of one kit. The trade-off is a shipping line at checkout on single orders, so it only works if there is something cheap enough to add that clearing the threshold beats paying it.

Where did the rework land, and is delivery inside that number?

## FINAL QUESTION / FINAL SENTENCE (same line)
"Where did the rework land, and is delivery inside that number?"

## REVIEW TRAIL
- Built via `sdr-agent` (nurture, touch type 5 done-for-them observation). Variation B was DISCARDED:
  it opened "circling back like I said I would", a phrase `agent_knowledge` flags as a template tell
  that creates AI detectability across touches.
- `qc-reviewer-agent`: PASS WITH FIXES. Applied - (1) "One change covers both" was FALSE, a shipping
  threshold does nothing to discount codes, replaced with "The shipping side has a fix"; (2) "not just
  product and packaging" implied the earlier analysis stopped at COGS when it had already netted out
  processing, now "product, packaging and processing"; (3) "making good on the check-in" is off-idiom,
  now "here's the check-in I promised"; (4) the 60%-still-holds clause added so the new layer reads as
  additive and the self-serve return trigger survives. QC Fix 3 (verify the kit components) RESOLVED
  from the job post itself, which names the scrub, whipped body butter and body oil.
- `expert-review-agent`: Economic advice FAIR, nurture touch GOOD. Applied - the 60% gate breaks under
  the message's own logic and had to be resolved rather than hinted at; "nudges the second unit into
  the same box" was unrealistic for a one-hero-SKU catalog and was cut; the threshold's conversion
  risk is now stated instead of presented as pure upside; the close now keeps the literal promise
  ("see where things landed") and qualifies the deal instead of asking a tactical shipping question.
- NOT applied, by decision: returns/breakage and GST-on-revenue (real but 4th-priority, would bloat a
  200-word nurture); "send them over" on the close (edges into the free review Lindsey declined to
  sell); raising the stated target to 65-70% gross (reads as correcting her own earlier number).

## RULE COMPLIANCE
Strict first person, zero "we"/"our team"/Creekside framing (Lindsey replies only). No em dashes (0).
Sentence case. Greeting matches thread's newest outbound. No name sign-off. No links, no calendar link,
no contact info. Exactly ONE question and it is the final sentence. No finality, no breakup framing, no
stated intent to stop. No commitment, no scope, no free work, no offer to review her numbers. No
consultation pricing reopened. No parroting, no validating filler, no self-blame, no reference to the
message sent in error and removed.

## PROOF CONSTRAINTS HONOURED
- Zero body care / K-beauty / DTC skincare-product proof exists (0/130 clients, 0/28 case studies).
  No category experience implied; the shipping point rests on the physical weight of three jars.
- "I currently run Meta for a skincare brand" NOT repeated (Ella Skincare Meta access lost 2026-07-28).
- No Q4 or CPM content at all. Sept 2026 CPM already runs above last year's Nov/Dec, so this year's Q4
  is not forecastable and January cannot be promised as cheaper.
- Nothing attached, no attachment referenced.

## OPEN FLAGS FOR QUEENIE
1. **LANDMINE already in the sent thread.** Touch 1 cited Master Spa Parts Q4 ROAS as 7.69x -> 4.30x
   recovering to 8.57x by April. Live data says **6.45x -> 3.22x, 8.07x April**. Spend, CTR
   (1.59% -> 1.86%) and CPM (+44.9%) all verify clean; only the ROAS figures are wrong. Already sent,
   cannot be unsent. Never offer a month-by-month walkthrough of that account. This draft re-cites
   nothing from it.
2. **Spend gate still unresolved.** Even at 60%+ margin she is far below the $5K/mo floor and below the
   $1,500/platform minimum. Margin work alone will not make her viable.
3. `sdr_generation_log` INSERT not executed - contractor mode, `contractor_query` cannot INSERT (42601).
