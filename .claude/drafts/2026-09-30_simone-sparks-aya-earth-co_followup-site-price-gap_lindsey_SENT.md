# Upwork Follow-Up - Simone Sparks / AYA Earth Co (Shopify DTC body care, Alliston ON)
Profile: Lindsey Bouffard | Type: followup (value touch, live-store observation) | Status: SENT (her reply answers its closing question) | Drafted 2026-09-30 (Postgres Central; harness clock showed 10-01, Manila)

## WHY THIS TOUCH EXISTS
The 9/29 reply was SENT and is UNANSWERED (~3 days). A plain follow-up at 3 days would be TOO EARLY:
the cadence rule's window for a basic touch after a substantive one is 5-10 days, the prior message was
424 words, and a FOURTH budget ask is explicitly banned (asked Aug 27 x2, Sep 28).

What changes it: a verified external fact that affects a decision she is making RIGHT NOW.

## VERIFIED LIVE 2026-10-01 (ayaearthco.com, Shopify /products.json + /meta.json, read-only)
| Her claim (9/28) | Live store | Verdict |
|---|---|---|
| Kit is now **$110 CAD** | "Complete Body Collection" = **$98.00 CAD** | **DOES NOT MATCH** |
| All three sold individually | Scrub $38, Butter $44, Oil $46; published **2026-08-30** | CONFIRMED |
| Shipping charged separately | Weight-calculated at checkout, NO threshold set | CONFIRMED |

- Store currency **CAD**, rate 1.0. Alliston, Ontario. Ships CA/GB/US. 21 scents, 84 published products.
- Kit contents confirmed: Body Scrub 250 mL + Whipped Body Butter 250 mL + Body Oil 100 mL. Matches her
  description exactly (incl. the 100 mL oil), so it is unambiguously the same product.
- Individual SKUs published **three days AFTER** the August conversation, corroborating that she acted on
  Lindsey's advice. Nothing in this draft casts doubt on that.
- Arithmetic verified: 110 x 0.40 = 44.00 | 98 x 0.40 = 39.20 | 38+44+46 = 128 | 128-98 = 30 (23.4%).

## THE POINT
The 9/29 message handed her a **$44 all-in cost ceiling**, correct arithmetic for the $110 she stated.
If $98 is the real launch price the ceiling is **$39.20**. She is finalizing packaging costs against our
number right now, so this is worth sending immediately rather than waiting out the cadence window.
Most likely innocent explanation: she quoted the price she PLANS to launch at, not the live page. The
closing either/or makes "I just haven't updated the page yet" a completely comfortable answer.

## THE DRAFT (56 words)

Hey Simone, one thing from my last note worth updating. Your site has the collection at $98. The ceiling tracks the price, so $44 at $110 and under $39 at $98, and that still has to survive a launch code and any shipping you absorb. Is $98 the launch price, or is $110 where it's going?

## FINAL QUESTION / FINAL SENTENCE (same line)
"Is $98 the launch price, or is $110 where it's going?"

## REVIEW TRAIL
- `sdr-agent` round 1 (before the site check) produced a bare packaging nudge and a light value touch.
  Superseded once the store was pulled.
- `sdr-agent` round 2 on the verified facts produced the 78-word version. Recommended raising the site
  observation, and moved its own send window from Oct 3-6 to Oct 1-2 because the trigger is now an
  external fact rather than elapsed silence.
- `qc-reviewer-agent`: PASS WITH FIXES. All applied:
  - **R1 (BLOCKING)** the 60% qualifier was dropped AGAIN. QC notes this is the THIRD time the same
    regression has been caught on this lead (expert review on the 9/28 touch, QC R5 on the 9/29 draft).
    "All in" covers all-in COST, not what comes out of the ORDER. Her launch discount is still unlocked
    and she likes the free-shipping-threshold idea, which would put shipping back inside the margin.
    Now reads "...still has to survive a launch code and any shipping you absorb."
  - **R2 (BLOCKING)** the $30-gap sentence stated a FALSE mechanism. A single-item buyer compares $98 to
    $38, never $98 to $128, so the $30 saving governs kit-vs-three-singles, not kit-vs-single. QC offered
    a corrected version or a cut; **CUT taken** - the AOV point was already made on 9/29 and she has not
    replied to it, so restating it is piling on, and dropping it removes the one sentence that made the
    message read like an audit of her store.
  - **R3** "$44 was right at $110" was a past-tense correctness claim pointing at her supplied number and
    reading faintly defensive. Now "The ceiling tracks the price, so $44 at $110 and under $39 at $98",
    which lets the formula own it. Also removes the most template-flavored construction in the draft.
  - **R4** "about $39" softened a ceiling she currently holds as hard ($39.50 reads fine but is 59.7%).
    Now "under $39", matching the "under $44" framing already in her hands. $39.20 rejected as false
    precision.
- QC also flagged the stale `_UNSENT` label on the 9/29 draft. Resolved: that message appears VERBATIM in
  the live thread, so the file is renamed SENT and the lead record updated.

## RULE COMPLIANCE
Strict first person, zero agency framing. No em dashes (0). ONE question, and it is the final sentence.
No links, no calendar link, no contact info. No name sign-off. NO fourth budget ask - the word "budget"
does not appear and the $5,000-$10,000 bracket is not mentioned, softened or hinted at. No direct re-ask
for the COGS/packaging number; the question is about her PRICE, not her cost. No accusation and no
implication she misstated. No self-blame. No commitments, no scope, no free work, no offer to review her
numbers (recomputing a ceiling from her PUBLIC price is not reviewing her numbers). Consultation pricing
not reopened. Onboarding fee and 90-day minimum still undisclosed, correctly absent. No Q4/holiday CPM
claim, no January seasonality claim. No replacement-parts figures. No body care category experience
implied. No call ask - the 9/28 call-window ask is still open and this touch does not press it.

## BEFORE SENDING
1. **Re-confirm the live collection price.** Every figure here is load-bearing. If the page has moved to
   $110 since 2026-10-01, this draft is void and a bare "has the packaging landed?" is the fallback.
2. She has TWO open asks already (cost per kit, budget bracket). This touch deliberately adds no third
   and re-raises neither.

## OPEN FLAGS
1. **Spend gate still undecided and still the deal.** Below $5,000 USD/mo this does not pencil.
2. Onboarding $1,500/platform and the 90-day minimum remain undisclosed; they belong on the call.
3. `sdr_generation_log` INSERT not executed - contractor mode cannot INSERT (42601).
