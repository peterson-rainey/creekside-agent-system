# Upwork Proposal — AI-First Meta Ads Strategist / U.S. Home Remodeling

- **Profile:** Lindsey
- **Style:** lindsey_default (user resolved the "strategic" mismatch explicitly; no lindsey_strategic exists)
- **Date:** 2026-09-08 (DB now(), local clock was one day ahead)
- **Status:** UNSENT
- **Attachments:** NONE. Nothing is attachable (see Attachability below).
- **BLOCKER: a Loom/video is the actual application gate.** Text alone does not satisfy "To apply."
  Loom outline is at the bottom for Lindsey to record.

---

## PROPOSAL (paste-ready)

Do you know how many lead events a week your funnel will produce at $1,500 a month? That number will shape this build more than the creative does, and it is the first thing I would work out.

I ask because a Meta ad set needs roughly 50 optimization events a week to get out of learning and stay there. $1,500 a month is about $350 a week of delivery. Even at a $30 cost per lead, which would be strong for high-ticket local work, that is a dozen events a week, not fifty. It does not make the first phase pointless, but it changes what the phase is. It is a creative and message read that I judge by hand, and the algorithm will not be doing much of the work yet. Anyone promising to optimize toward qualified opportunities at that budget is describing something Meta cannot do on that little signal.

Where I have done this at volume is high-ticket local lead gen on the healthcare side. I ran a dental implant account on Meta that produced 2,558 leads at $25.31 each over about three months, split by market and run in English and Spanish separately. The part that matters for you is that we deliberately put qualifying questions into the form and accepted a higher cost per lead in exchange for leads the phone team could actually work. And what eventually capped that account was not cost per lead. It was call center capacity. Any funnel with a human step in the middle hits that wall first, which is why I would want your sales capacity before I would want your budget.

The gap, plainly: remodeling is not on my record. My own accounts are dental, aesthetics and consumer ecom, plus a brand I built and sold. Our team does run exterior home services on Meta, though that account is not mine to claim.

On the AI question, we run 109 purpose built agents against our own database, 54 of them on schedules, including a morning monitor that checks pacing, frequency and pixel health across every account before anyone opens Ads Manager. I go through that in the video.

Rather than send screenshots, I would put live Ads Manager on a screen share and let you pick the date range.

Is the $1,500 a ceiling for the learning phase, or sized to it? If it can flex toward the $5,000 end sooner, the read gets clean much faster.

There is also a short video on my profile covering how I separate testing from scaling.

---

## Verification log (every number checked live, 2026-09-08)

| Claim | Source | Status |
|---|---|---|
| 2,558 leads @ $25.31 | `meta_insights_daily` × `meta_campaigns`, `act_938570599860690`, 2026-04-21 to 2026-07-15: $64,746.78 / 2,558 conv | VERIFIED |
| Lindsey ran it | `reporting_clients.platform_operator` = "Lindsey B." on Fusion Dental | VERIFIED — first person is safe |
| Geo + language split | Campaigns: Roseville, EDH, Roseville Spanish (all OUTCOME_LEADS) | VERIFIED |
| Qualifying questions / capacity cap | `agent_knowledge` weekly reports: spend "intentionally reduced to accommodate the call center" | VERIFIED |
| 109 agents / 54 scheduled | `agent_definitions` status='active' = 109; `scheduled_agents` enabled = 54 | VERIFIED |
| "exterior home services, not mine" | TX Gutter Expert `platform_operator` = **David** | VERIFIED — hence the disclaimer |

**Deliberately NOT used:**
- TX Gutter Expert's $39.05 CPM / 142,589 impressions. Real, but David's account. First person would be an overclaim.
- Its 12 conversions / $463.96 CPL. Website-side only, excludes instant-form leads.
- Premier Kitchen & Bath. Exact remodeling vertical and the only one in the book: **churned, $900/mo, `ad_account_id` NULL, zero insight rows.**
- Any ROAS figure. `meta_insights_daily.roas` is corrupted book-wide.
- Fusion's Apr $8,997 to May $32,562 as "scaling." April is 9 active days; per-active-day it is a 21% rise, not 3.6x.

## Attachability: attach nothing

Her strongest proof (Fusion Dental) has **no PDF and is not in `case_studies`**. The home-services PDFs
(LawnValue, Landmark Lawn, florida_awnings) are Google-side and Samuel-bylined, and florida_awnings
carries no outcome metric at all. Screen-share offer replaces the results-attached beat, same as the
pet-brands precedent.

## Screen

- **Spend:** $1,500/mo start is below the $5K auto-DQ floor, **but** "We will begin with" plus an explicit
  scaling path to $5-8K is a floor, not a ceiling. Per the STEARIE ruling (2026-09-01) that is an ASK,
  not a skip. Proposal asks it directly.
- **Economics to know before a call:** our minimum is $1,500/platform/mo. At $1,500 media spend the fee
  equals 100% of spend. At $5K it is 30%, at $8K it is 20%. Lindsey's own floor is $3,000/mo.
  No pricing in the draft: they did not ask, and the budget question has to resolve first.
- **Required items:** all three are methodology, none demands a named account plus metric. No foreclosure.
- Geo US, ads in scope, direct client, not a full-time seat, no hourly ask. All clear.

## Loom outline (Lindsey to record — this is the real application gate)

1. **Competitor research and creative strategy.** Ad library, sort by longevity, since how long an ad has
   run is the only public signal of what converts. Map their offers and guarantees against theirs, then
   test angle before audience. Say plainly that research narrows what you test, it does not replace testing.
2. **Winning funnel for a high-ticket local business.** The 5-rung ladder: hook rate, hold rate, CTR, form
   completion, lead to appointment. Each rung fails differently and each produces a different brief.
   Land on the Fusion example: qualifying questions in the form, higher CPL, better leads.
3. **AI, automation, KPI tracking daily.** 109 agents / 54 scheduled, morning monitor before Ads Manager
   opens. Concrete, not "I use ChatGPT for copy."

## Rule compliance

Diagnostic question opener (L4, missing metric), no "I" opener, no parroting their own chain back at them.
Experience-first body. No em dashes. No links or contact info. No sign-off name. Meta only, no Google Ads
mentioned. Profile video referenced. Budget asked as a relative range. Gap conceded outright.
~410 words against the 200-300 guide, justified by three required items plus the explicit AI section;
precedent is the 578-word pet-brands draft. Well inside the 5,000-character cap.
