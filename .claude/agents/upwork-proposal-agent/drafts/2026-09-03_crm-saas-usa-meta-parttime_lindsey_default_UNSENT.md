# Upwork Proposal — CRM SaaS (USA), Meta Ads, Part-Time
Profile: Lindsey | Style: lindsey_default | Date: 2026-09-03 | Status: UNSENT

## Job (verbatim)
We are seeking a freelancer with proven experience in SaaS marketing, particularly Meta ads, to support our
CRM SaaS product in USA. The role involves developing and executing marketing campaigns, optimizing ad
performance, and improving lead generation efforts. You should be comfortable working independently,
communicating clearly, and contributing to growth-focused strategies. This is a part-time opportunity for
someone who can help drive results and support ongoing marketing initiatives.

---

## Proposal (paste-ready)

Do you know what share of your Meta signups are still logged in at day 30? That number usually decides whether
paid social is a lead problem or a fit problem for a CRM, and the two look identical inside Ads Manager.

The reason I ask is that CRM is the hardest category I run on paid social, and I say that as someone managing
Meta for a CRM platform right now. Switching software happens on a timeline the buyer owns, not one an ad sets
for them. So accounts that optimize toward demo requests and free trials end up teaching Meta to find form
fillers, and signup volume climbs while nothing reaches the pipeline. Ten years in, that is still the most
common way B2B software burns paid social budget.

What has worked better is treating Meta as the layer that creates consideration and letting search catch people
once they start shopping. I ran the paid social half of a referral SaaS account on exactly that split, Meta
carrying awareness while our team handled demand capture on search, and over the following six months their
inbound leads and ARR both doubled. I built and sold my own e-commerce business before this, which left me
biased toward what actually banked over what the dashboard reported.

One tradeoff worth naming: Meta and email are mine. If search becomes part of the plan, that is a different
person on our team rather than me splitting a part-time week across both.

Before a plan means anything, roughly what range are you spending on Meta monthly right now?

There is a short video on my profile covering how I work accounts like this.

---

## Screening notes (internal, not part of the proposal)

**No auto-DQ fires.** Ads ARE the scope (Meta). Geo is USA, inside US/CA/UK/AU. "Part-time" is the opposite of
the full-time-employment-seat trigger. Direct client ("our CRM SaaS product"), so not white-label. Not
detection-evasion, not coaching Upwork competitors, not self-funded/profit-share, no worker-location
requirement, no flat-fee portfolio shape.

**Platform fit: CLEAN.** Meta-only job, Lindsey's core service. No Google-only red flag.

**Duplicate-bid check:** zero matching rows in `upwork_leads` (searched description ILIKE CRM + SaaS). No second
Creekside profile has bid this job.

**Verified live against the DB (2026-09-03, date confirmed via Postgres `now()`; local shell clock said 09-04
and was ignored per the unreliable-clock rule):**
- `reporting_clients`: **Quivr**, platform `meta`, status **active**, ad account "Quivr CRM Main",
  platform_operator AND account_manager both **Lindsey B.**, monthly_budget $3,000. This is a live CRM SaaS Meta
  account Lindsey personally runs. The proposal's "managing Meta for a CRM platform right now" is literally true
  and independently verifiable.
- **Quivr numbers are NOT cited, deliberately.** Live pull: `$18,307.25` spend, 8,052 clicks, `$2.27` CPC,
  **3 conversions**, 2025-09-03 to 2026-09-02. This confirms the standing UNCITABLE ruling (canon said ~$17.9K;
  now $18.3K). The account supplies the *mechanism* in the draft, never a result. No number from it appears.
- `case_studies`: **ReferPro**, industry_key `saas`, platforms `Google Ads + Meta Ads`, key_result "Doubled
  inbound leads and ARR within 6 months post-seed funding. Used Meta for awareness and Google for demand capture
  to build full-funnel pipeline." Cited in the draft in past tense, unnamed ("a referral SaaS account").
- `reporting_clients` corroborates ReferPro's split: TWO rows, `meta` operated by **Lindsey B.** and `google`
  operated by Ahmed I., both churned 2026-04-06. This is what licenses the first-person/team split in the draft.
- **ReferPro live-data caveat (flagged, not hidden):** `meta_insights_daily` holds only ONE day for ReferPro
  (2026-04-16, `$131.62`, 84 clicks, 4 conv). That is a pipeline coverage gap, not a contradiction of the case
  study, but it means the doubling claim rests on the sanctioned `case_studies` row alone with no live
  corroboration. Handled by (a) citing it exactly as canon words it, (b) attributing the outcome to the
  full-funnel structure rather than to Meta alone, and (c) adding no invented figure. If Queenie wants a
  zero-risk version, drop that sentence and the draft still stands on the Quivr mechanism.
- Lindsey's operator book: 26 rows, all `meta` / `email` / `other`, **zero Google**. Confirms the tradeoff
  paragraph is honest rather than modest.

**Attachments: ATTACH NOTHING.** Standing ruling that Lindsey's entire book currently has no clean attachment
(ReferPro, Punch Drunk Chef, Dr. Laleh, South River, Master Spa Parts, Neue Maison, CI Lifestyle all fail for
distinct reasons). The style doc's golden rule "always reference attached results" is therefore OVERRIDDEN and
the results-reference line was REMOVED, consistent with the 9/03 generic Meta+Google draft.

**Screens still OPEN:**
- Meta spend vs the $5K/mo company floor and Lindsey's $3K/mo Meta floor. Unstated in the post, so not an
  auto-DQ. Asked in-proposal as a relative range per the budget-ask rule.
- Listed hourly rate vs the $40/hr bottom-of-range screen. Unstated; "part-time" carries no rate.
- Geo is NOT open. The post says USA, so no geo question was asked.

**Required-items count: zero.** No numbered list, no screening questions, no keyword gate. Easy case, so the
200-300 word band applies rather than the 350 multi-question ceiling.

**Opening pattern:** L4 (Missing Piece). Rotated off L2, used by the 9/03 generic part-time Meta+Google draft,
so the two artifacts do not read as one template.

**Deliberate omissions:** no pricing (not asked; lindsey_default carries no fee table first-touch); no calendar
link (first touch on a job post, they offered no call, per the no-booking-CTA screen); no URLs; no sign-off
name; Queenie is not named anywhere.

**Formatting check:** zero em-dashes, zero bold, zero bullets, plain prose. 279 words / ~1,670 characters.
Inside the band and far under Upwork's 5,000-char limit.

**DB log step NOT performed:** the `upwork_proposal_logs` INSERT is impossible from contractor mode
(`contractor_query` is SELECT-only; writes raise 42601). Flagged rather than bypassed.
