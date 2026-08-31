# Upwork Proposal - Google Ads Specialist, Beauty & Aesthetics Brands (multi-account)
Profile: Samuel | Style: strategic (diagnostic opener variant) | Drafted 2026-08-31 | STATUS: UNSENT

## Fork resolution
"strategic + diagnostic" is not a real style pair. `strategic` is Samuel-only; the diagnostic-question
opener belongs to `lindsey_default`. No profile named. Beauty/aesthetics + female audience + DTC would
normally route to Lindsey, but Lindsey has only one style (lindsey_default), so honoring the requested
style forces Samuel. Resolved to Samuel strategic with a diagnostic open. 9th hit on this fork.

## Screening
- RED, white-label / subcontractor. "manage paid advertising for beauty and aesthetics brands ...
  for multiple client accounts ... you may interact directly with clients." An agency staffing its own
  client book, not a brand hiring for itself. Brands do not call their own brands "clients."
  Settled auto-DQ: 19 skips vs 2 draft-anyways, both on repeat sightings. This is a first sighting.
  Recommendation is SKIP. Drafted on explicit user instruction.
- YELLOW, spend never stated. $5K/mo floor cannot be cleared.
- YELLOW, geo never stated. US/CA/UK/AU screen cannot be cleared. "Strong English communication skills"
  reads as a worker-language note, not a client-market statement.
- YELLOW, rate never stated. $40/hr listed-minimum screen cannot be cleared.
- YELLOW, month-to-month vs the 90-day minimum (8 skips vs 2 overrides). Softened by "potential to grow."
- YELLOW, role is framed as a staffed Specialist seat, which conflicts with % of spend only.
  No rate, no hours, and no pricing appear in the proposal.
- Title/body contradiction: "Google Ads Specialist" but Meta is required and Google is "a plus."
  Not a DQ. Used as the diagnostic beat.
- No duplicate `upwork_leads` row: only aesthetic/beauty-matching lead is Fusion Dental (won, Apr 2026).

## Proof verified live this session (contractor_query)
Doctor Laleh (cosmetic/aesthetics, client status ACTIVE, Lindsey's) is the only real aesthetics proof.
  Meta, via meta_insights_daily x meta_campaigns x meta_ad_accounts:
    "Lux Dental Spa FB Ads" (act_868498138612020) $1,186,491 over 365 days, spend by month
    Feb $89,945 / Mar $114,587 / Apr $102,652 / May $100,030 / Jun $99,803 / Jul $99,138 / Aug $92,807
    => $90K-$115K a month for 12 straight months. Cited as a range. CPA NOT cited.
  Google, via google_insights_daily x google_campaigns x google_ad_accounts:
    "Doctor Laleh" $80,917 cost / 552 conversions / $146.55 CPA / 1.58% CTR / 2026-04-20 to 2026-08-30.
    Spend and conversion count cited. CPA not cited.
Neue Maison (DTC selling to women, CHURNED 2026-08) $218,468 over 334 days, CTR 4.10-5.05% Apr-Aug.
    CTR cited only. ROAS NOT cited (it is promo + retargeting, not cold). Audience split unknown, so
    the proposal does not say "cold."

## Corrections found against stored records
1. case_studies "Dr. Laleh ... CPA from $48.79 to $9.58, 500%+ ROI" FAILS live verification.
   Live blended CPA is $146.55 on Google and $138.68 on Meta. That number is not used.
2. Memory `reference_laleh_meta_is_the_single_account_ceiling` implies the $1.19M/12mo sits on a
   "Laleh Meta" account. It actually sits on "Lux Dental Spa FB Ads", one of three Meta accounts under
   the Doctor Laleh client. "Doctor Laleh Main Ad Account" is only $15,671/365d. Client is right,
   account name is wrong.
3. Elaa Skincare has an ad account row but zero insight rows. Confirms there is no skincare proof.

## Compliance
- No links, no URLs, no contact info, no calendar link. No em dashes. No bold, bullets, or headers.
- Does not open with "I". Insight lands in the first 15 words, built from their nouns.
- No client named. Delivery attributed to "our team" per feedback_principals_never_do_delivery_work.
- No pricing, no rate, no hours volunteered. Job does not ask about budget.
- No implied-causation juxtaposition: no metric is placed immediately after a mechanism claim.
- 331 words / 1,975 characters. Under the 5,000-character Upwork limit.

---

Beauty and aesthetics are two different Google problems, and most multi account setups run them as one.

Aesthetics is local high intent search with a booking event and a real gap between consult and treatment, so the account has to be pointed at the booking that actually shows up rather than the form fill. Beauty and skincare products are close to the opposite. Non brand search is thin because nobody searches for a brand they have not met yet, so Google mostly runs Shopping and PMax against demand that Meta created. Aim the same conversion logic at both and you end up with an aesthetics account chasing leads that never book and a product account buying back brand traffic Meta already paid for.

Worth flagging something in the post itself. The title asks for a Google Ads Specialist, then the requirements make Meta the must have and Google the nice to have. Usually that means the book is Meta led and Google is the underbuilt half. If that is the case, the honest first move is not new campaigns. It is a read across the accounts to find which ones have enough non brand demand to justify Google at all, because for a few of these brands the right answer is that Google stays small and Meta takes the budget.

Our team currently runs a cosmetic and aesthetics practice on both platforms. Meta spend there has held between $90K and $115K a month for twelve straight months, and the Google side has run since late April and produced about 550 conversions. On the product side we have run a DTC brand selling to women where click through held above four percent.

One tradeoff worth naming up front. Month to month works against aesthetics accounts specifically, since the consult to treatment lag means the first thirty days rarely show you the real number.

How many of these accounts are treatment based versus product based, and what does monthly spend look like across them?


Samuel
