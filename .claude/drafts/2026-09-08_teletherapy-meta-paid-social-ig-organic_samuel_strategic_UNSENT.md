# Upwork Proposal — Teletherapy Meta Paid Social + IG Organic

**Profile:** Samuel Rainey
**Style:** `strategic` (Samuel-only; "strategic version" resolves here with no mismatch)
**Date drafted:** 2026-09-08 (Postgres Central; local clock reads 09-09 and is unreliable)
**Status:** UNSENT
**Screening:** DQ'd white-label, **OVERRIDDEN by Queenie — "Draft it anyway."**

---

## PROPOSAL TEXT (paste-ready)

The most common thing you will hear about a mental health account is that it falls under Special Ad Category and that you give up lookalikes and detailed targeting. That is wrong, and believing it costs you the whole optimization surface for nothing. Special Ad Category covers credit, employment, housing, financial products and social issues. Behavioral health is not on that list. The full targeting and lookalike stack stays available.

What is actually restricted is the copy. Meta's personal attributes standards bar an ad from asserting or implying it knows something about the reader, and mental health is named directly. "Struggling with anxiety?" makes a claim about the person seeing it, and that phrasing is the most common rejection in this vertical. The same promise written about the work instead of the person runs clean.

Put those two together and you get the thing that should be driving the creative loop. You can reach the audience but you cannot name them, so the ad has to let the right person recognize themselves without the copy pointing at them. That makes creative the targeting mechanism, not a reporting exercise that happens after the media decisions are already made. When a static outperforms, the useful finding is almost never the hook style. It is which version of the problem the person recognized, and that is what should brief the next round.

The second thing I would instrument from day one is capacity. Our team ran a healthcare practice on Meta lead forms into a call center and produced 2,558 leads at $25.31 across about eleven weeks of delivery. The reason spend eventually came down was not cost per lead. Intake could not absorb the volume. For a therapy practice that ceiling is clinician hours, and it arrives earlier than most accounts plan for. A cost per lead that still looks healthy while bookings stall is the failure mode worth building reporting against, which means measurement has to reach past the form fill to booked and attended.

On experience, straight. Six years on Meta, and healthcare is a real part of our book. There is a dental practice we run on Meta right now that produced leads at $30.65 last month. Behavioral health specifically is not in that book, so I am not going to claim niche experience we do not have. The policy mechanics above are where that gap gets covered, and all of it is checkable against Meta's own published standards.

The other thing I should be straight about is that we are a paid media team. Instagram organic content management is not something we do. If that piece of the scope has to sit with the same person, I am not your fit for it. If it can sit elsewhere, the paid side is squarely what we do.

One question before this could be sized properly. Roughly what range is monthly spend on the account today, and is it running in one state or nationally?

---

## VERIFICATION LOG (checked live 2026-09-08 via contractor_query)

| Claim in draft | Source | Status |
|---|---|---|
| Behavioral health is not Special Ad Category | Meta published SAC list: credit, employment, housing, financial products, social issues/elections | Policy fact. Deliberately asserts the NEGATIVE, per the standing "do NOT claim SAC" rule |
| Personal attributes bars implied knowledge of reader; mental health named | Meta advertising standards, long standing | Policy fact. Worded "most common rejection", NOT "always rejected" — automated enforcement is inconsistent and a certainty claim is indefensible |
| 2,558 leads at $25.31, ~11 weeks delivery | `meta_insights_daily` x `meta_campaigns`, `act_938570599860690` (Fusion Dental): $64,746.78 / 2,558 = $25.31, **78 active delivery days** = 11.1 weeks, 2026-04-21 to 2026-07-15 | VERIFIED, recomputed live. Account CHURNED, so written in **past tense** |
| Pullback was capacity, not CPL | `reference_fusion_dental_call_center_meta_proof` | VERIFIED against standing memory |
| Dental practice on Meta at $30.65 last month | `act_1032713196182770` (The Tooth Co): $3,801.05 / 124 conv = $30.65, 2026-08-03 to 2026-08-31, status **active**, operator Lindsey B. | VERIFIED live. Account ACTIVE, so **present tense** correct. August is the latest complete month in the data |
| Six years on Meta | `reference_samuel_years_experience` | VERIFIED. Clears their stated 4+ years. Did NOT reuse Lindsey's "10+ years" |
| Healthcare is a real part of our book | 6 of 28 `case_studies` are Healthcare; 2 live Meta healthcare accounts | VERIFIED. Stated as book-level, not as first-person |
| No behavioral health experience | 0 of 28 `case_studies`, 0 `reporting_clients` on therap/mental/psych/counsel/behavioral | VERIFIED ZERO. Only hit is "Ida Jeltova / GM Therapy", inactive, empty services, no reporting_clients row = never launched |
| We do not do Instagram organic | `clients.services` full scan: 26 distinct service lines across 130 clients, zero organic social / social media management / Instagram | VERIFIED ZERO |

## WITHHELD ON PURPOSE

- **Every Google healthcare analog** (Integrity Naturopathic, Polaris, Root Hair, Join Piper). Google proof is barred as the fallback on a Meta-first post per the 2026-09-05 ruling. This is the trap the mental-health memory file flags in its own advice.
- **Dr. Laleh's CPA.** Spend is citable, CPA is not, per `reference_laleh_meta_is_the_single_account_ceiling`.
- **Advanced Med Spa.** Case study exists but the account is inactive; past tense only, and it adds nothing the two cited accounts do not.
- **Any attachment.** Meta-first post, no attachment demanded, and no Meta behavioral-health artifact exists. Attaching a Google PDF would contradict the body.
- **A third gap disclosure.** Only the two that answer stated must-haves are disclosed (Instagram organic, behavioral health). Per the 2026-08-14 override lesson, not claiming is not the same as confessing.
- **Any calendar link or contact info.** First-touch proposal, URL ban applies.
- **A name sign-off.** Ends on the closing question, per the 2026-09-04 ruling reaffirmed 2026-09-09.
- **Pricing.** Not requested, and no spend base is knowable yet.

## SCREENS RUN

| Screen | Result |
|---|---|
| White label / subcontractor | **FAIL.** Clients test hits 5x: "1-2 client accounts", "creative and client teams", "directly with the client", "client-provided video assets", "help clients understand". Client-facing does not rescue it (Imaginarium 8/7, Mariner11 8/12). **OVERRIDDEN by user.** |
| Ads in scope | PASS, Meta paid social is the bulk of the job |
| Full-time employment seat | PASS, "freelance" |
| Geo | UNSTATED, asked in the close |
| $5K/mo ad spend | UNMEASURABLE, budget belongs to their client. Asked in the close |
| $40/hr floor | UNMEASURABLE, no rate posted |
| Proof gap on stated requirements | 2 FAIL: Instagram organic (zero), behavioral health (zero). Both disclosed in body |
| Detection evasion / self-funded / profit share / trial / coaching competitors | PASS, none present |
