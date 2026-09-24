# Upwork Proposal (UNSENT) - Bree Coach, AI personal growth / coaching app, early-stage B2C mobile UA
Profile: Lindsey | Style: lindsey_default | Date: 2026-09-24 (US Central, confirmed via Postgres: UTC 19:37 = Central 14:37 on 9/24)
Status: DRAFTED, NOT SENT. Gap-first draft over a SKIP-leaning screen.

## Style note
Asked for "Lindsey's strategic + diagnostic style, write it in lindsey_default". "Strategic" is Samuel-only;
lindsey_default was named in the same sentence, so that is what this is. Diagnostic opener is native to
lindsey_default (L2). Not re-asked.

## Screen (all verified live 2026-09-24 via contractor_query)
- Already bid: NO. Only near-name match in upwork_jobs is "Breevy.ai" (Google Ads, AI agentic workspace,
  General profile, 2026-04-20, not viewed). Different company, different scope. No draft file exists.
- Required-items screen: FIRES HARD. 3 of 6 requested items are unanswerable:
  1. "Two or three consumer apps" -> we have ONE (Birthday Club App / "BDC App"), churned 2026-01-01,
     platform_operator is NOT Lindsey. Cannot produce three.
  2. "Experience with each platform: Meta, TikTok, Apple Search Ads, Google App Campaigns" -> Meta only.
     TikTok, ASA, GAC are hard zeros. Note the post bolds TikTok and ASA/GAC as REQUIRED experience.
  3. "In-app events and attribution tools you've implemented or managed" -> hard zero. No MMP, no SKAN.
     Post explicitly asks to distinguish personally-configured from dev-coordinated tracking, so this
     will be probed.
  5. "One campaign example ... ideally beyond installs" -> our only app example is installs-only.
- Platform test (Lindsey): BENDS, does not break. Meta/Instagram is named first and is a required-experience
  bullet, so this is a PARTIAL scope mismatch, unlike White Horse (9/24) where zero platforms were in scope.
  Contrast 9/16 new-social-app post, where ASA was the immediate priority and Meta a later expansion: that
  one FAILED the platform test.
- No APP_INSTALLS / app-promotion objective exists anywhere in meta_campaigns. Confirmed by full objective list.
- reporting_clients.platform values: chatgpt, email, google, lsa, meta, other, programmatic. No app platform.
  (TikTok is no longer even in the enum; it was on 9/16.)
- Spend: UNSTATED ("disciplined budgets", "small team" - suggestive but no number, does not foreclose).
  Geo: UNSTATED. Both screened by the closing question.
- Not full-time seat, not white-label, not profit-share, not detection-evasion. "Coaching" here is a
  consumer product, NOT coaching Upwork competitors, so that DQ does not fire.
- Rate: post asks for hourly rate or monthly retainer. Lindsey's format has no pricing slot and we never
  bill hourly, so no fee is printed. Availability IS answered (the post asked for it).
- Verdict: SKIP-leaning on proof. Delivered gap-first, consistent with the standing override pattern.

## Proof used (recomputed live 2026-09-24)
- Birthday Club App (canonical case_studies key_result): 2,662 installs, CPI $7.36 -> $3.90 via
  "campaign restructuring and systematic creative testing". $3.90 = BEST campaign; ~$5 blended (13,300/2,662).
  Meta only. Operator NOT Lindsey -> "our team", past tense, never first person.
  CUT from the draft as unverifiable: "two markets" and the "optimizing for traffic / pointing at a web page"
  narrative. Those came from 9/16 draft notes citing the source PDF; that PDF is now HTTP 404, so they cannot
  be re-verified today. Only canonical key_result content survives.
- MEAL PREP CPA - CORRECTED. Both accounts have long runs of NULL (not zero) conversions while spend
  continues, so any lifetime spend / lifetime conversions ratio is a 12-month numerator over a 5-month
  denominator. Computed on tracked rows only (spend > 0 AND conversions IS NOT NULL):
  - Punch Drunk Chef, act_1248382100071649: $7,118.01 / 815 conv = $8.73 CPA (2025-10-17 -> 2026-02-06)
  - CI Lifestyle Meals, act_312458589232737: $8,326.24 / 844 conv = $9.87 CPA (2026-01-13 -> 2026-08-18)
  Draft cites "near $9 to $10 a purchase, on 844 and 815 purchases", with the tracking caveat stated in the
  body ("across the days their purchase tracking reported cleanly").
- Punch Drunk NULL-conversion onset: 2026-03 onward, every row NULL, zero rows at conversions=0. Spend
  continues ~$4K/mo. This is a tracking/sync gap, not a performance collapse.

## CORRECTION to prior drafts (carry forward)
The 2026-09-08 sports-fitness-app draft claims Portland ~$12 vs Dallas $56, "almost five times the cost".
That $56 is an ARTIFACT of dividing Punch Drunk's full-year spend by conversions that stop in February.
On matched tracked rows the two accounts are $9.87 and $8.73, i.e. essentially the SAME, not 5x apart.
qc-reviewer-agent independently reproduced the artifact ($55.90) and tried to FAIL this draft on it; the
monthly NULL-vs-zero breakdown disproves it. Any future draft reusing the "five times" contrast is wrong.

## Attachments
NONE. Verified by download today:
- Birthday Club App PDF (1NOKmt8X...): HTTP 404, 1,652-byte HTML error page. Dead. Confirms prior ruling.
- CI Lifestyle PDF (1Tc13tk4V5a...): live 5-page PDF, but cover asserts "$25 CPA / 14x overall ROAS /
  4.52x new-customer ROAS". None corroborated in the warehouse.
- Punch Drunk PDF (1n3bCsJSnZW...): live PDF, cover asserts "20x Peak ROAS / ~$10 new-customer CPA".
  Live ROAS is ~1.73x. Not attachable.
Handing a prospect who is explicitly auditing attribution honesty a PDF with uncorroborated ROAS headlines
is the worst possible mismatch. Attach nothing.

## Format deviations (flag at delivery)
- Results-attached line DROPPED (nothing attachable). Same deviation as the 9/16 app draft.
- Bold section headers applied per the 9/25 ruling; opener left unbolded.
- Availability line added (post asked for it); no rate printed.

## Review log
- qc-reviewer-agent: returned FAIL on the Dallas CPA, asserting ~$55.90. REJECTED after direct check: the
  monthly breakdown shows NULL conversions from 2026-03 with spend continuing, so its figure divides a
  12-month numerator by a 5-month denominator. Its other findings were ACCEPTED and applied: unverifiable
  "two markets" / "traffic + web page" narrative cut; CI Lifestyle purchaser-exclusion structural claim cut
  (not visible in live campaign data, and prior rulings agree); implied-causation on the CPI sentence fixed
  by separating mechanism from number; availability added.
- expert-review-agent: Good, no blockers. Applied: named the ~50 conversions/week learning threshold instead
  of vague "too rare to learn from"; bridged the opening diagnostic to the month-one plan (agree an upstream
  event short of paid subscription); hedged the reinstall claim so it reads as transferable reasoning rather
  than asserted MMP knowledge; added trial-to-paid to the opening question alongside activation.

## Word count
349 (within the 350 multi-question allowance; hard floor 200).

---

Do you know what share of people who finish onboarding come back for a second session, and how many of those ever start paying? Those decide which event is safe to optimize toward. Meta wants near 50 conversions a week per ad set to learn, and paid subscriptions will not clear that at your volume, so left alone it settles on registration and fills the app with people who never open it twice.

**Where I don't clear your bar**

Apple Search Ads and Google App Campaigns are not channels I run. Neither is TikTok. I have never configured an MMP or in-app events, nor coordinated that build with a dev team, so on your configured versus coordinated question, the answer is neither. Our team has worked on one consumer app, not three, and it was not mine.

**The one app account our team has**

A restaurant rewards app, Meta install campaigns. Cost per install finished at $3.90 on the best campaign and around $5 blended across 2,662 installs, down from $7.36. Installs is where that story stops.

**What I actually run**

Meta and Instagram for recurring consumer products, ten years of it, after building and selling my own e-commerce brand. I run two meal prep brands, Portland and Dallas. Across the days their purchase tracking reported cleanly, both sat near $9 to $10 a purchase, on 844 and 815 purchases. On a recurring product, never let a returning buyer count as an acquisition. Otherwise your cost per new customer stops being real. A subscription app has a harder version of that, since a reinstall can look like a new user, and in tools I have not configured myself, that goes quietly wrong.

Month one I would want an event agreed that fires often enough for Meta to learn on, well short of paid subscription, and verified clean before spend scales. I work 10 to 6 Central, Monday to Friday.

What monthly range are you looking to test on, and which countries first?

There's a short video on my profile if you want a better sense of how I work.
