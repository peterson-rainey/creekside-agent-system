# Clarity hydration mix, Meta Ads (Taster Pack email leads, CPL to buyer) — Samuel, strategic + diagnostic — UNSENT

Profile: Samuel Rainey (strategic, diagnostic opener). Drafted 2026-09-16 (Postgres now(), US Central). Not sent.

## Job post (verbatim)

We're scaling Clarity, a hydration mix brand, and need a Meta Ads expert to help improve performance. Our current baseline is about $1 CPL for email leads on our Taster Pack. We want to reduce CPL to around $0.50 and increase lead-to-buyer conversion to 10% or more, bringing the cost per conversion down to about $5. If you have experience achieving similar results for DTC health or beverage brands and believe these targets are realistic, we'd love to connect.

## Screens

- Already drafted / already bid: NO. No local draft; `upwork_jobs` has no row for Clarity / hydration / Taster Pack; `upwork_leads` empty.
- Profile: bare "strategic + diagnostic" resolves to Samuel (recent practice). Platform test points at Lindsey (Meta-only DTC consumable). Flag at delivery; if a Lindsey twin is wanted, diverge the angle.
- Spend: NOT stated. Scale language volunteered ("We're scaling Clarity"), no foreclosing prose. Unmeasurable, asked in-proposal as a relative range. Brand price point unconfirmed (see geo).
- Geo: brand identity UNCONFIRMED. Candidates: Clarity Health Co (US electrolyte mix, clarityhealthco.com, no Taster Pack visible) or Crush Supplements' "Clarity" (UK nootropic + electrolyte drink, has a GBP 17.99 "Taster Pack"). Both in-geo. "Taster Pack" wording leans UK.
- Payment verified / client history: not provided, check the job page.
- Proof: SOFT conditional, not a required-items gate. Vertical zero (hydration / beverage / supplement, per case_studies + memory). Metric zero (no email-lead-to-buyer result anywhere). Disclosed in the body.
- `match_proposal_context`: top relevance_score 2 (ReferPro, Aura, Fitness Superstore), below the 3 threshold. No enrichment.
- Attachment (v3, on request): `.claude/attachments/unrefined_meal_prep_CLEAN.pdf` (sha1 6219bda2...; 4 pages, 0 annotations, 0 localhost, 0 Samuel/Rainey/Peterson strings; re-checked 9/16). SAMUEL VERSION ONLY: operator Trent L., not Lindsey, and the Lindsey twin cites meal prep brands she runs. Caveats: churned 2026-04-29 "Below average results"; PDF names client + founder; written in present tense; meal-prep CTA on the last page. Live 9/16: core `Sales Campaign Sept. 25` Jan $1,012.59 / 114 / $8.88 / 11.84x, Feb $1,588.54 / 144 / $11.03 / 9.84x; expansion Feb $408.83 / 7 / $58.40 / 2.82x measured, so printed 4x / $20 / $8-$10 / ~2x sit at or below live.
- Pricing: not asked, not included.

## Verified facts used

- Meta Business Help Center "About attribution models and attribution settings" (read in-app 2026-09-16): standard click-through counts events "within 1-day or 7-day after a link click"; view-through 1 day; attribution models "inform ad delivery".
- Meta Business Help Center "About the learning phase" (read in-app 2026-09-16): ad sets exit learning "after about 50 results in the week after the ad set's last significant edit".
- Meta for Developers, Conversions API for CRM (WebFetch 2026-09-16): conversion leads goal "only compatible with Facebook/Instagram's Lead Ads (Instant Forms)"; at least 200 leads/month; stage conversion rate 1%-40%; "lead stage ... occurs within 28 days of leads being generated"; upload at least daily.
- The Tooth Co Meta `act_1032713196182770`, ACTIVE, platform_operator Lindsey B. (live contractor_query 2026-09-16): `Engagement | 7/29` (objective engagement) and `Leads 7/29` (objective leads), created 2026-07-30 two minutes apart, both first spend 2026-08-03, last spend 2026-08-31, $0 in September through 9/14. Engagement $1,845.88 / 49,760 impr / 1,584 clicks / NULL conversions. Leads $1,955.17 / 26,721 impr / 1,087 clicks / 124 conversions / $15.77 CPL. Impression ratio 1.86x.

## Review log

- qc-reviewer-agent: PASS (no blockers). Should-fix x2 applied: cut "A lead-optimized campaign does the same thing one step further down the funnel" (implied causation, the dental account never ran a purchase stage); added the conversion leads gating (200 leads/month, daily upload). Nit declined: opener reuses the post's nouns because the Samuel strategic spec requires it.
- expert-review-agent: Good, not Strong. Applied: learning-phase line reworded to a first-week threshold; proof-gap line now says the tradeoff isn't category-specific; dental example reframed as "one level up the funnel" and ends on $15.77; realistic-targets line turned into direct questions. Declined: merging the lag question into the spend close (keeps the relative-range rationale attached to spend).
- v2 final: 397 words, 2,174 characters, zero dashes / bold / links, no sign-off.
- v3 (attachment requested): added "The attached case study is a meal prep brand our team ran on Meta, measured on cost per new customer." Trims: "The closest example I can give" became "One example" (avoids two closest-claims now that a meal prep PDF rides along), conversion leads line tightened, packs line tightened, "not a single recorded lead" became "no recorded leads". 399 words. No numbers in the tie-in; nothing in it claims the PDF proves the lead-to-buyer tradeoff.

---

On a Taster Pack offer, CPL and lead-to-buyer rate tend to pull against each other. When the campaign optimizes for the email lead, Meta goes looking for whoever hands over an email most cheaply, and the cheapest of those people are usually the least likely to buy.

So I'd manage to cost per conversion and let CPL land wherever that number is cheapest. A $0.50 lead is only a win if the buyer rate holds.

The lever is showing Meta who bought, not just who signed up, and the days between signup and first order decide how. Meta's standard click window tops out at 7 days. If most buyers order inside that week, the campaign can optimize for the purchase itself, and near your target cost per buyer, the roughly 50 purchases an ad set needs in its first week to exit learning are cheap to feed. If orders come later, purchases have to be sent back tied to the lead. On Instant Forms, Meta's conversion leads goal can then optimize toward the leads who buy within 28 days of signing up, once you clear 200 leads a month with purchase data flowing back daily. Either way, ad sets get judged on cost per buyer, not CPL.

Whether the targets are realistic depends on three things I can't see from here. How long do buyers take to order, where does lead-to-buyer sit today, and does the Taster Pack ship free? If it does, each buyer also carries the cost of packs sent to leads who never bought, which can easily outweigh the ad spend.

On experience, we haven't run a hydration, beverage or supplement brand, so there's no category result to point you to, though the tradeoff above isn't category-specific. One example sits one level up the funnel. Last month, a dental practice our team runs had two campaigns go live the same day, one optimized for engagement and one for leads. The engagement campaign bought nearly twice the impressions and no recorded leads. The leads campaign brought in 124 at $15.77. The attached case study is a meal prep brand our team ran on Meta, measured on cost per new customer.

What does your monthly Meta spend look like as a rough range? Anything I'd suggest on structure only helps if it fits what you can put behind it. Happy to jump on a quick call from there.
