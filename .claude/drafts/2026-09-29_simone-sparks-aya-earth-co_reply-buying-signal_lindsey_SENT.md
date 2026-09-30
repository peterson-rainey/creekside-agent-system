# Upwork Reply - Simone Sparks / AYA Earth Co (Shopify DTC body care, Canada)
Profile: Lindsey Bouffard | Type: reply to buying signal | Status: SENT (confirmed verbatim in the live thread) | Drafted 2026-09-29

## WHAT CHANGED
The 9/28 nurture was SENT and ANSWERED overnight. Simone has moved on every lever:
- Kit **$68 -> $110 CAD**. All three products (body butter, scrub, 100 mL oil) now ALSO sold individually.
- **Shipping NOT included** - customer pays separately at checkout, so delivery is out of the $110.
  This resolves the exact leak the 9/28 touch was built on.
- No free-shipping threshold and no launch discount locked yet; she likes the threshold idea.
- New cheaper packaging **ordered but NOT arrived**, and **no COGS figure given**.
- **She says the job is Lindsey's.** Mid-December launch target.
- Her two questions: working backwards from mid-December, when would Lindsey start? And what should
  she prepare/send now, before packaging and photos are finalized?

## THE TWO THINGS SHE DID NOT SAY
1. **No COGS number.** She answered the price half of the gate, not the cost half. At $110, all-in cost
   must land under $44 for 60% gross margin (verified: 110 x 0.40 = 44.00). If the old $58 were
   unchanged she is at 47%, not 60%. The gate is NOT demonstrably cleared.
2. **No budget.** August figures were $1,500-$2,000 CAD/mo media and $750-$1,000 USD management,
   against a $5,000 USD/mo approved minimum media budget and a $1,500 USD/platform monthly minimum.
   This is now the binding constraint.

## THE SPINE
Fixing the margin RAISED the bar on the media budget, which is the honest consequence of the advice she
took. Verified arithmetic handed to her as self-serve: her August range weekly, divided by 50, is
$6.92-$9.23 CAD per optimization event. A $110 kit does not reach that as a cost per purchase, and even
optimizing to add to cart it funds one ad set with nothing to compare against.

## THE DRAFT (424 words)

Hey Simone,

Good to hear you want me running it, and raising the price was the right call.

That's the price half of the 60%. The cost half decides it, and at $110 the all-in cost per kit needs to come in under $44, before shipping and any launch discount come out of the order. Cheaper packaging helps, but until it lands that's an assumption rather than a number.

One thing to watch. Selling the three individually lowers the entry price, which is fine in itself, but it also means your average order may not be $110. The 60% has to hold on the order you actually get, not on the kit.

Raising the price also raised the media budget this launch needs. Worth settling now rather than in December. Meta wants roughly 50 optimization events per ad set per week before it has enough to work with, whichever event you optimize to. Take the range you named in August, turn it into a weekly number, and divide by fifty. It lands around seven to nine dollars Canadian per event. That is not a cost per purchase a $110 kit reaches. Add to cart costs less, which is why I would start there, but at that budget it buys one ad set with nothing left to compare it against.

On timing, the order matters more than the date. Store live, tracking verified on real orders, enough traffic through it that the pixel has some history, then spend. The lead time is set by how fast those test orders happen, not by my calendar, and none of it waits on packaging or photos.

So the thing to move on now is tracking. Pixel and Conversions API in and verified, standard events firing correctly, proven on real orders before a dollar moves. Then push traffic through it from organic, email, any pre-launch list, so the pixel is collecting and you start seeing a repeat purchase rate, which is what decides whether a consumable can afford to buy customers.

Mid-December worries me for one reason. New pixel, new price, new creative, all learning inside the back half of the month. What it learns there is unlikely to carry into January, and a bad result won't tell you which piece broke. Being live earlier gives you a baseline.

Worth a call to settle structure. Send a few windows.

Two numbers before then: where did the packaging put your cost per kit, and is the monthly media budget you're planning closer to $5,000 USD or closer to $10,000 USD?

## FINAL QUESTION / FINAL SENTENCE (same line)
"Two numbers before then: where did the packaging put your cost per kit, and is the monthly media budget you're planning closer to $5,000 USD or closer to $10,000 USD?"

## REVIEW TRAIL
- `sdr-agent` produced A and B, recommended B. **Both contained a factual regression**: "Meta wants
  roughly 50 PURCHASES per ad set per week". It is 50 OPTIMIZATION EVENTS, which is what Lindsey said
  correctly in August, and the add-to-cart ladder she sold Simone depends on that distinction.
  Corrected before review.
- `qc-reviewer-agent`: PASS WITH FIXES, 5 required, all applied:
  R1 (BLOCKING) "the number this category actually runs on" claimed body-care category authority where
  proof is zero; replaced with a mechanism clause. R2 (BLOCKING) the draft told her to run her own cost
  per purchase and then two paragraphs later said she has no purchase history; replaced with the
  budget-divided-by-50 arithmetic she CAN run. R3 "a $68 one did" asserted sales that never happened
  (pre-launch). R4 the 50-events sentence silently re-priced a generic event as a purchase. R5 the $44
  ceiling dropped the contribution-per-order qualifier from the 9/28 touch.
- QC omission catch applied: the individually-sold products were unacknowledged, and they mean AOV may
  not be $110, which the whole $44 / 60% / 50-event chain rests on. Added as an observation, not a
  third question.
- Self-caught after QC: the close was phrased as a statement with NO question mark. Made a direct
  question so the ask is unmistakable.
- Arithmetic verified independently in-session: $1,500/mo -> $346.15/wk -> $6.92/event;
  $2,000/mo -> $461.54/wk -> $9.23/event; 60% GM at $110 -> $44.00 COGS ceiling.

## RULE COMPLIANCE
Strict first person, zero agency framing. No em dashes (0). One question, and it is the final sentence.
No links, no calendar link, no contact info (windows requested instead, the pattern already used in this
thread). No name sign-off. Not signed, so no scope, no deliverables, no start date, no free work; "when
to start" is answered as a SEQUENCE, which is not a commitment. No offer to review or model her numbers.
Consultation pricing not reopened. Onboarding fee and 90-day minimum deliberately NOT introduced, they
belong on the call. No Q4 or holiday CPM forecast and no claim January is cheaper; the December argument
rests only on the pixel, the learning window and generalizability. No replacement-parts figures. No body
care category experience implied.

## OPEN FLAGS
1. **Spend gate is the deal.** If she comes back under $5,000 USD/mo the engagement does not pencil.
   This draft surfaces it now, deliberately, so she is not declined twice after doing all the margin work.
2. Onboarding $1,500/platform and the 90-day minimum are still undisclosed. They land on the call.
3. The sent thread's Master Spa Parts Q4 ROAS figures remain wrong (6.45x/3.22x/8.07x live). Never walk
   that account month by month.
4. `sdr_generation_log` INSERT not executed - contractor mode cannot INSERT (42601).
