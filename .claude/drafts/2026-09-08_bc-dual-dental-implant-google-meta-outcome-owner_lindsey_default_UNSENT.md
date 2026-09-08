# Upwork Proposal — BC dual dental (general practice + full-arch implant brand), Google Search + Meta, "own the number"

- **Profile:** Lindsey
- **Style:** `lindsey_default` (user asked for "Lindsey's strategic + diagnostic style"; `strategic`/`diagnostic` are Samuel-only labels — resolved to `lindsey_default` per the explicit "write it in lindsey_default" instruction. Mismatch noted, fork not re-raised.)
- **Date:** 2026-09-08 (Postgres `now()`, US Central; local/harness clock was reading a day ahead)
- **Status:** UNSENT
- **Screen verdict:** WEAK-TO-FORECLOSED FIT FOR LINDSEY. This is a Google-Search-primary, dual-platform post, and it fails **two of the client's own hard bars** for the `lindsey_default` profile: (1) Google Search buying is outside Lindsey's scope, and the post's headline competency (impression share lost to budget vs rank, competitor terms eating $30/click, 10% IS starvation) is pure Google Search; (2) no high-ticket / long-cycle / full-arch-implant funnel proof exists anywhere in the book. **Recommendation: this is a Samuel post** (Samuel owns both platforms and can speak impression-share budget-vs-rank natively). Draft delivered as requested, written honestly with both gaps conceded in-body. See notes.
- **Char count (paste-ready block):** ~2,050 / ~347 words, 0 em dashes (well under the 5,000 Upwork cap)

---

## PROPOSAL (paste-ready)

The two economies don't just get run differently, they get judged on different clocks, and that's where most buyers quietly break the implant account. A hygiene campaign tells you inside a week whether it's working. A $49,000 case books months after the click, so if the implant campaigns get optimised to the fast signal, the form fill or the call, you scale the cheap lead that never seats a case while the dashboard looks great and the schedule stays flat. What I'd pin down first is which early signal actually predicts a booked-and-attended case, because until that's known, daily optimisation on that side is guessing faster.

The phone side I've lived in. I ran a local dental practice on Meta where every booking came by phone into a call team: $64,747 in spend, 2,558 leads at $25.31 each over about eleven weeks, before that account churned. The number that mattered wasn't the CPL. It was that the ceiling was how fast the front desk called leads back, not the cost of getting them, and that's the kind of thing a daily reviewer catches and a monthly-report agency never does. The dental accounts I run now live on GoHighLevel, so call tracking, offline conversion imports and the CRM as the one source of truth are the daily job, not a setup phase. One of them spends north of $90,000 a month on Meta.

Straight with you, since you clearly read every line. My depth and my numbers are Meta, the phone-close local-practice economy you're describing. I haven't personally owned a $49,000 full-arch funnel end to end, and Google Search buying isn't where my hands-on reps are. If a single owner across both platforms is firm, better you hear that now than in week two.

Your screen recording is the right test, and it's the easy part: I'll record it inside a live account I run, client name off. On pay: a percentage of the spend I manage, starting at 20% and easing to 15% then 10% as it scales, with a monthly floor at today's budgets. My fee only grows when the spend is earning its place, which is the number you're reviewing me on too.

There's a short walkthrough on my profile showing how I take an account from a standing start.

---

## Screen Notes (internal — do not send)

### Style-fork resolution
"Lindsey's strategic + diagnostic style" names a combination that doesn't exist (Lindsey has ONE style: `lindsey_default`; `strategic`/`diagnostic` are Samuel-only). User closed the fork in the same breath ("write it in lindsey_default"), so per standing rule the mismatch is noted here and not re-raised.

### THE HEADLINE PROBLEM — platform + proof fit (why this is really a Samuel post)
This post fails two of the client's OWN stated hard bars for a Meta-only operator:

1. **Google Search is the primary screen, and it's outside Lindsey's scope.** The competencies they test unprompted are all Google Search: "impression share lost to budget vs rank," "the competitor's name eating $30 a click," "the campaign starved at 10% impression share." Lindsey's doc bans claiming Google Ads as her service. In Creekside's own dental accounts the split is literal: Google is run by Ahmed I. / Ade A., **Meta is Lindsey**. The client wants ONE person to own BOTH platforms and explicitly does not want an agency/team — so a Meta-only operator structurally can't be the sole owner they're describing.
2. **No high-ticket / long-cycle / implant proof.** Verified live: 0 implant / full-arch / high-ticket rows in `case_studies`. The fit bar "at least one high-ticket, long-cycle funnel where the win came from qualification and follow-up" cannot be answered with proof. Conceded in-body rather than bluffed.

Both are conceded honestly in paragraph 3 (Welham-style candor). That honesty is correct, but it means the draft openly tells them Lindsey misses two firm bars — which is itself the argument for sending **Samuel** instead. Offer to generate the Samuel version.

### Screens cleared
| Screen | Result |
|---|---|
| Geo (ads market) | PASS. British Columbia, Canada; CA ∈ US/CA/UK/AU. |
| Ad spend floor ($5K/mo) | PASS. $10–20k/mo across both platforms, "room to go well past." Above floor even at the bottom. |
| Ads in scope | PASS. Daily buying/optimisation of live paid accounts is the core ask. |
| Full-time employment seat | PASS. "Work your own hours, anywhere in the world… we do not require live overlap." Contractor structure; the words "full time" do not appear. |
| White-label / subcontractor | PASS. Direct client (they own the practices and the accounts). |
| Self-funded / profit-share | PASS. They fund spend and pay the operator; no funding-the-spend or profit-share ask. |
| Worker-location requirement | PASS. Explicitly location-free. |
| Duplicate profile bid | Not checked live — grep `upwork_leads` for a Samuel/other twin on this exact job before sending (two Creekside profiles can bid one job, but confirm no collision). |

### Every number verified live this session (Postgres, 2026-09-08)
**Fusion Dental** (`act_938570599860690`, Meta, `platform_operator = Lindsey B.`, CHURNED 2026-07-22) — `meta_insights_daily` ⨝ `meta_campaigns`, window 2026-04-21 → 2026-07-15:
- Spend **$64,746.78**, conversions **2,558**, **$25.31 CPL**, 78 days (~11 weeks), 1,901,022 impressions.
- Objective = `OUTCOME_LEADS` (12 of 13 campaigns) → confirmed lead-gen. Cited **past tense** (churned).
- The "capacity, not CPL, was the ceiling" point is the load-bearing insight (matches `reference_fusion_dental_call_center_meta_proof`); it is stated as an operator lesson, not a metric claim.

**Doctor Laleh** (`act_868498138612020`, Meta, `platform_operator = Lindsey Bouffard`, ACTIVE) — last 46 days (2026-07-24 → 2026-09-07):
- Spend **$143,297.74** over 46 days → **~$93.5K/mo run-rate**. "North of $90,000 a month on Meta" is accurate and conservative.
- **CPA deliberately NOT cited** (per `reference_dental_proof_pack` / `reference_laleh_meta_is_the_single_account_ceiling`: her figure is a lead CPA, not a cost-per-booked-and-attended-patient; the client's review number does not exist in our book). Spend only.
- GoHighLevel is genuine (Creekside works Laleh's GHL at API level) → answers the post's "GoHighLevel is a plus" honestly.

**Live dental Meta book, all `platform_operator = Lindsey`** (not all cited, but real): Doctor Laleh, Dr. Laleh Cosmetic, The Tooth Co, Vida Dentistry (all ACTIVE) + Fusion Dental (churned). Four live local dental practices on Meta = the "local service, sale closes on the phone, dental" vertical they prefer. Google on those same accounts is operated by others, which is exactly the platform-split flag above.

### Proof gaps (disclosed in-body, never faked)
- **Full-arch / implant / $49k considered purchase:** absolute zero. Conceded.
- **Google Search buying:** outside scope. Conceded.
- **Cost per booked AND attended patient / show rate:** no such figure anywhere in the book (Laleh = lead CPA + consultation volume only). Not cited; not promised.

### Deliberate deviations (flag for QC)
- **Did NOT pool the three books.** Standing rule is to pool Samuel/Cade/Lindsey. Here the on-vertical proof is entirely Lindsey's own dental Meta book, and the post explicitly wants ONE hands-on owner, not an agency — pooling cuts against that and would drag off-vertical ecom (Master Spa, Neue Maison) into a dental phone-close pitch. Kept it Lindsey-dental. First-person "I ran / I run" is verified-correct (all her accounts).
- **No "attached results" reference.** Her format normally references an attachment, but the post bans decks/PDFs/cover letters and wants a screen recording. Substituted a live screen-share + the required-recording confirmation, which is on-ethos and stronger here.

### Rate / pay-line reasoning
- Post makes comp a required item ("ONE LINE: what you need to be paid… and why"). Answered with the model, not a flat number: % of spend (20→15→10 marginal per `pricing-reference.md`), monthly floor at today's budgets, rationale = incentive alignment. Never hourly (per standing rule; the paid 3-day trial is the only place a day/flat rate would be sanctioned, and that's downstream, not the application).
- **Underfunding note:** at $10–20k/mo split across two platforms, and with Lindsey only owning the Meta portion, % of spend lands near the $1,500/platform Meta floor — thin for a daily "own the number, build the follow-up sequence" role. This is another structural sign the engagement (single senior outcome-owner) fits a retainer/fractional shape better than our % model, and that the whole-mandate owner is a Samuel-shaped, both-platforms operator.

### Rule compliance (`lindsey_default`)
Diagnostic-question opener, no "I" as first word, goes one level BENEATH the client's own stated "two economies" framing (different clocks / which early signal predicts a booked case) rather than parroting it. Experience-first body. First-person only on verified-hers accounts. No principals named. No sign-off name. No links / contact info / calendar link (first touch, URL ban). Profile-video reference kept. No em dashes, no bullets/headers/bold in the paste block. Meta + phone-close framing only; Google buying not claimed. % of spend, never hourly. Spend context handled without parroting their range back.

### Word ceiling
~347 words — at the top of her 250–350 multi-item band. Two concessions + a required-item engagement + the pay line push it here; flagged rather than dropping a required answer (per the four-required-items precedent).

### MUST-DO before this can be submitted (Lindsey, not draftable by me)
1. **The 3-minute unedited screen recording is mandatory** — "Applications without one are not read." Lindsey must record it inside a real Meta account she runs (e.g. a live dental account), client name hidden, showing the account, monthly spend, the conversion column, the ad-set/search-terms breakdown, and one change she made and why, talking over it. The profile walkthrough is NOT a substitute.
2. Confirm payment-method verification on the client (logged out — screen before sending).
3. Grep `upwork_leads` for a duplicate/twin bid on this job.

### The real call for the user
Send Lindsey (honest, Meta-strong, concedes two firm bars) — or let me generate the **Samuel** version that actually covers Google Search + Meta and can claim the impression-share fluency this post is built to screen for. My recommendation is Samuel.
