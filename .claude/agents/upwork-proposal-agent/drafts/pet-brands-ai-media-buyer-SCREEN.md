# SCREEN — "AI MEDIA BUYER" / Three Pet Brands (ASK A VET, WOOPF, PURRZ)

**Screened:** 2026-09-02 (date confirmed via Postgres `now()`, not local clock)
**Requested:** "Lindsey's strategic version ... write it in lindsey_default"
**Style mismatch:** resolved by Queenie in the request itself. `strategic` is Samuel-only; Lindsey has one style. Written as `lindsey_default`.
**Duplicate check:** no matching `upwork_leads` row (searched pet/vet/WOOPF/PURRZ/"AI MEDIA BUYER"/"pet brands"). Fresh job, no double-bid risk.
**Verdict:** SKIP recommended by precedent. Draft produced anyway per explicit request. UNSENT.

---

## Primary screen: 30-day trial term

> "I would prefer to begin with an account audit and a structured 30-day plan. If we work well
> together and the results are strong, this can become an ongoing role."

Near-exact match to the **Artcast SKIP (2026-08-22)** — mobile app UA specialist, *"30-day paid
engagement and continue monthly if the fit and performance are strong."* Queenie skipped it.
Running tally on this screen: **8 skips vs 2 overrides.**

The rule says screen the compounders, not the trial wording. Compounders below.

---

## Compounder 1 — staffing-seat signature, strongest form seen

> "I want a dedicated personal media buyer" / "Be an individual media buyer, not an agency" /
> "This is not a role for an agency"

Item 7 asks weekly availability. Item 8 asks for an **hourly or monthly** fee. Every requirement in
the post is a deliverable or a time commitment, and **no ad spend figure appears anywhere**. That
leaves the $5K/mo minimum unmeasurable and gives % of ad spend nothing to attach to.

Does NOT fire the literal full-time-seat auto-DQ (the words "full time" are absent), but it is that
shape. It also means the post excludes us by category on its face.

---

## Compounder 2 — platform gate: 5 of 7 unproven

Item 1 asks which of the listed platforms have been **personally managed**.

| Platform required | Verified | Verdict |
|---|---|---|
| Meta Ads | Book runs **$185,273 (Aug 2026) to $266,003 (May 2026)/mo across 21-28 accounts** | PASS |
| Google Ads | 197 campaigns live (`google_campaigns`) | PASS at book level; **Lindsey does not sell Google** |
| Google Play app campaigns | **0 of 197** Google campaigns are an app type (SEARCH 110, PMAX 57, DEMAND_GEN 15, SHOPPING 9, VIDEO 2, SMART 2, LSA 1, DISPLAY 1) | ZERO |
| Apple Search Ads / App Store | 0 of 28 case studies, 0 of 130 clients | ZERO |
| TikTok Ads | 0 performance rows anywhere. One churned client (Blush Camera) lists `tiktok-ads` in `services` — a services array, not proof | ZERO |
| LinkedIn Ads | 0. Only `linkedin_post_examples`, which is organic posts | ZERO |
| Reddit Ads | 0 | ZERO |

Honest answer to item 1 is **2 of 7 at book level, 1 of 7 for Lindsey personally.**

---

## Compounder 3 — app proof is real but thin; subscription proof is zero

Item 3 asks about acquiring **users and subscribers** for mobile apps.

- **Birthday Club App** (Loyal Patron LLC) — Meta Ads only, **2,662 installs, CPI $7.36 to $3.90
  (47% cut)**, 493,484 reach, Jul 2025 to Apr 2026, **$2,000-$3,500/mo, ~$13,300 lifetime**,
  blended CPI ~$5.00. Eight creatives, six rounds of CPC testing, retargeting killed at $10.22 CPI.
  **CHURNED.** No `meta_ad_accounts` row exists, so it **cannot be recomputed live** — canonical
  `case_studies` figure only.
- **"BDC App"** is the same client under a second name with no numbers, and it claims Google + Meta,
  contradicting the Meta-only canonical. Known conflict, canon already resolved in favor of Meta-only.
- **Zero subscription / in-app conversion proof** anywhere in the system.
- **Zero app-install campaigns in live Meta data** — 1,812 campaigns, no APP_INSTALLS objective.
  Name matches on "Submit App" are application forms (Wisdom Coach Cert); "RIK Download" is a lead
  magnet.

---

## Compounder 4 — zero pet/vet proof

0 of 130 clients, 0 of 28 case studies. (`%pet%` matches "Peterson"; `%cat%` matches "FabriCATion".)

---

## Compounder 5 — nothing attachable

The sanctioned Birthday Club PDF `1NOKmt8X-jCC8wFYtpDLYE_zRfa1_v9Ag` — recorded readable on
2026-08-12 — now returns **"Requested entity was not found"** on authenticated Drive
`get_file_metadata`, and 404s on both public download URL forms. A Drive title search returns no
replacement PDF.

The only surviving file is `BDC_App_Case_Study.pdf` (`1PdZTkAE...`, 2.0MB, modified 2026-07-08),
which carries `manus.im` URLs and "Opening print dialog" artifacts. **Never send it.**

Consequence: the `lindsey_default` "results attached below" beat cannot be used literally. Handled
the same way as the 2026-09-02 $100K draft — replaced with a live screen-share offer.

---

## What actually PASSES, and it is the strongest card

**Item 5, the AI agents question.** Verified live: **109 active agents, 135 total, 54 enabled
scheduled agents**, running against our own RAG database. This is the one requirement where the
honest answer beats most applicants, and the prospect weighted it heavily ("Simply saying that you
use ChatGPT is not enough").

Also passing: ads clearly in scope; landing page is **recommend-only, not owned**, so the
ads-plus-CRO skip does not fire; not white-label; not self-funded/profit-share; no
detection-evasion; no worker-location requirement; no coaching-competitor.

**Geo: unconfirmed.** British spelling ("optimise") suggests UK or AU, both allowed, but where the
ads actually run is never stated.

---

## Deliberately NOT cited in the draft

- **Any ROAS figure, anywhere.** The prospect states outright that a high ROAS on one or two sales is
  not evidence. `meta_insights_daily.roas` is an average of daily ROAS and returns garbage
  (CI Lifestyle Meals, Aug 2026: 179,306). The case-study $25 CPA / 4.52x for CI Lifestyle also fails
  live recomputation — live CPA runs $5.50 to $11.58 across May-Aug 2026. Citing a shaky multiple to
  this particular buyer is the worst available move.
- Fitness Superstore "40x" (unbacked, churned) and Punch Drunk Chef "20x" (actually 1.76x).
- Any Apple Search Ads, Play Store, TikTok, LinkedIn or Reddit capability claim.
- Any subscription or in-app-event result.

## Verified figures used in the draft

| Figure | Source |
|---|---|
| 2,662 installs; CPI $7.36 to $3.90; $2,000-$3,500/mo; retargeting killed at $10.22 CPI | `case_studies` (Birthday Club App) + resolved canon |
| $185K to $266K/mo Meta, 21-28 accounts | `meta_insights_daily` x `meta_campaigns`, Mar-Aug 2026 |
| 109 active agents, 54 scheduled | `agent_definitions`, `scheduled_agents` |
| 20/15/10 marginal, $1,500/platform min, $15K cap, $1,500/platform onboarding | `pricing-reference.md` |
| 90-day minimum | Standard Contract Terms decision, 2026-05-28 |
