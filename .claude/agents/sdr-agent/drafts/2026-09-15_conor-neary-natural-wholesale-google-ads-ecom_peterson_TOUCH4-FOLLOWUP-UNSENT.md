# Conor Neary / Natural Wholesale: pre-call touch 4, sample-first follow-up (UNSENT)

- **Job:** Senior Google Ads Strategist / Media Buyer — Ecommerce (Upwork, applied 2026-09-01, posted $60-$110/hr)
- **Profile:** Peterson Rainey (upwork_jobs.profile_used = General, strategic script, single application, no dual bid)
- **ClickUp task:** 86e32mr2a (Upwork Leads). Salesman Peterson, Qualified, value band $1,500-$2,500. Only hold in threaded replies: Peterson had pricing answer #2 rewritten to one one-time fee (onboarding, audit included), then approved it.
- **Directed by:** Queenie, 2026-09-15: "SDR follow-up"
- **Context:** Conor's last message was Sep 1 US Central (thread displays Sep 2 because it shows GMT+8), asking five pricing questions before scheduling interviews. Our Sep 2 pricing answer, Sep 4 PMax note and Sep 8 short note are all unanswered. Job status (filled or interviewing) is unknown.
- **Link:** LINK-SUPPRESSED BY DESIGN. DO NOT ADD A CALENDAR LINK. He schedules interviews himself after narrowing the pool.
- **Pricing:** already sent and Peterson-approved. Not re-quoted, not referenced.
- **Pipeline:** sdr-agent (verified facts inlined, no DB access) -> qc-reviewer-agent (PASS WITH FIXES) + expert-review-agent (SHIP WITH THE CHANGES) -> fixes merged -> scripted check PASS.

## FINAL MESSAGE

Since my last note I looked at your site, and it points to one place where the consumer and wholesale split may already exist in your order data.

The homepage tells buyers to start with samples, and on the retinol and vitamin C serum bases there's no size between the 2oz sample and the gallon. The gallon is about 14x the sample price, and 25 gallons is over 300x.

So a private-label brand that follows that path shows up first as a 2oz sample order. On transaction value, it looks the same as a sample that never turns into a gallon, so that value alone can't tell bidding which one it was.

Roughly what share of your gallon-and-up buyers ordered a sample first?

- **Last question:** "Roughly what share of your gallon-and-up buyers ordered a sample first?"
- **Last sentence:** "Roughly what share of your gallon-and-up buyers ordered a sample first?"

## Verification (checked 2026-09-15)

| Claim | Source |
|---|---|
| Homepage tells buyers to start with samples | naturalwholesale.com: "Start With Samples: Order smaller sizes to evaluate products before moving into larger quantities" |
| No size between the 2oz sample and the gallon on the retinol and vitamin C serum bases | Super Antioxidant Retinol Serum: 2oz Sample $7.99, 1 Gallon $113.99, 5 Gallons $538.99, 25 Gallons $2,443.99. Vitamin C & Hyaluronic Acid Serum: $6.99, $94.99, $452.99, $2,191.75. Site search shows these are the only retinol serum and the only vitamin C serum (other hits are face creams and oils). |
| Gallon about 14x the sample | 113.99 / 7.99 = 14.27; 94.99 / 6.99 = 13.59 |
| 25 gallons over 300x | 2,443.99 / 7.99 = 305.9; 2,191.75 / 6.99 = 313.6 |
| Split may already exist in the order data | Echoes our Sep 2 answer: "the separation usually already exists in the order data even when it doesn't exist in the reporting" |
| That value alone can't tell bidding which one it was | Definitional: same product and list price at the first order. Scoped per QC and expert review. |

## Reviews applied

- **QC, PASS WITH FIXES:**
  - (A) The opener must acknowledge our last touch.
  - (B) Scope "nothing in the conversion tells bidding" to the transaction value alone.
  - Also ruled: this is not a ping, so the 1-3 sentence cap does not apply. The size line reads as observation, not product criticism. The recommended draft beats the alternate.
- **Expert review, SHIP WITH THE CHANGES:** the absolute claim was overstated. Google's high-value new customer mode uses "your high-value existing customer list to predict which new customers are likely to be high-value" (support.google.com/google-ads/answer/14005876, re-fetched and confirmed).
- **Not taken from QC's text:** the opener "Following up again, this time with something concrete." It is ping filler, and it disparages our own Sep 4 note, which carried a number. The final opener names the last note and what this one adds.
- **Not taken from the expert's text:**
  - "a sample that never reorders." A sample buyer can reorder samples without ever buying bulk, so "never turns into a gallon" is the precise contrast.
  - Narrowing the question to the two serum bases. The sample-first instruction is on the homepage, so the store-wide question is supported.

## Flags

1. **Job status is unknown.** `upwork_jobs` client stats are NULL, so this may land after he has hired.
2. **How his conversions record value is unknown** (shipping, tax, server-side). That is why the message uses list-price ratios and no dollar values.
3. **Likely pushback:** gallon buyers include spas and estheticians buying treatment volume, not only private-label brands. The message uses a private-label brand as an example, not as a claim about all gallon buyers.
4. **Pocket facts if he engages** (not for this message):
   - High-value new customer mode needs an uploaded Customer Match list (Data Manager, API or Direct Upload). Autodetection and tag-based lists are not compatible. Verified.
   - Per the expert review, conversion value restatements only count for autobidding within 7 days. That is likely shorter than a sample-to-gallon cycle. Expert-quoted from support.google.com/google-ads/answer/7686447, not re-fetched.
5. **Next step if no reply:** the 60-day nurture cycle (sdr-agent docs/nurture.md). The one-year window from his last message closes Sep 1, 2027.

## Rule compliance

- No em dashes in the message, no sign-off, no links, and no pricing or fee language.
- No client names or client numbers.
- One question, asked bare.
- No commitments, no free-work offers, no day names, no self-blame.
- Scripted check: PASS.

## Not done

sdr_generation_log insert (contractor_query cannot INSERT).
