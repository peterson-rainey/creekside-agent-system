# Upwork Proposal — Psychiatric clinic, Google Ads account audit + Standard Search rebuild
Profile: Samuel Rainey | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-08

## DATE NOTE
Postgres `now()` at America/Chicago = 2026-09-08 16:01 Central, so the US Central date is Mon 2026-09-08.
The local shell clock and the harness both read 2026-09-09. Filename follows the Postgres-confirmed date
per `reference_local_clock_unreliable`. (Several drafts committed earlier today are stamped 09-09.)

---

## PROPOSAL TEXT (paste-ready)

Before anything gets rebuilt there is a number worth pulling from the existing account, and it is not in the search terms report. Total the cost of every term the report lists for a date range, then compare that to what those campaigns actually spent over the same range. The two will not match. Google withholds queries that fall below its volume threshold, so they take budget without ever appearing as a line anyone can read or exclude. That difference is the share of the account nobody has been able to optimize, and in a clinical vertical running broad or phrase match it is usually the share that matters most. Worth knowing how big it is before deciding what the past twelve months actually taught you.

Conversion tracking carries a constraint most Google Ads builds walk straight past. Google will not sign a business associate agreement for Ads, which means a covered entity cannot send it protected health information. That rules out the default modern setup, enhanced conversions built on patient email and phone, because an identifier tied to contacting a psychiatric provider is itself protected. The instrument that does work is offline conversion import keyed on the click identifier. It carries a click and an outcome and no patient data at all, so bidding can optimize toward appointments that were actually booked and attended rather than toward form fills, without putting the practice on the wrong side of the rule.

Then the negative list, which here is not a waste trimming exercise. Psychiatric search splits into four kinds of query that look nearly identical in a keyword tool and behave nothing alike: people researching a condition, people in crisis, people seeking a specific controlled medication, and people qualifying a payer before they qualify a provider. Only the last group is close to booking. That insurance lane decides the economics of the account, because every click from someone searching a plan you do not accept is simply spent, and every plan you do accept is a lane worth owning outright and usually a cheap one. Crisis terms come out for reasons that have nothing to do with cost. That list gets built before launch, not discovered in month three.

On proof, straight. Healthcare and medical practices are a real part of our book. The closest match to a clinic at your scale is a naturopathic practice we run Google Search for right now, 569 conversions at a blended $39.29 each over the last twelve months, and I have attached that one. It leads with its best keyword CPA the way case studies do; the number I would hold myself to is the blended one. We also run Google for two dental practices and a med spa, all appointment based, all closing on the phone. Behavioral health specifically is not in that book, so I am not going to claim it. The policy and structural mechanics above are where that gap gets covered, and every one of them is checkable against Google's own published documentation.

As for how an existing account gets improved, the ordering matters more than the checklist. Measurement first, because every decision after it inherits whatever the conversion action was counting. Then the query surface, match types and negatives, which is what stops the bleed. Then structure and bids, which is where the gains actually show up. Most audits run that sequence backwards and spend the first month optimizing hard toward a number that was never trustworthy.

Two things before this could be sized properly. Roughly what range is the account spending per month now, and is this advertising around a single location or across several states?

---

## VERIFICATION LOG (checked live 2026-09-08 via `contractor_query`)

| Claim in draft | Source | Status |
|---|---|---|
| 569 conversions at blended $39.29, last 12 months | `google_insights_daily` x `google_campaigns` x `reporting_clients`, account `5360677991` (Integrity Naturopathic), 2025-09-08 to 2026-08-31: $22,352.27 / 568.9 conv = **$39.29** | VERIFIED, recomputed live this session. Account **ACTIVE**, so present tense correct. Prior draft cited $39.28 off a rounded 569; $39.29 is the true blended |
| Naturopathic practice, Google Search, running now | `reporting_clients` Integrity Naturopathic, platform google, status **active**, AM Peterson, operator Ahmed I. | VERIFIED |
| Two dental practices + a med spa on Google, active | `reporting_clients` platform=google AND status=active: The Tooth Co, Vida Dentistry, Doctor Laleh. All three returned live Jun-Aug 2026 spend | VERIFIED. Named as vertical presence only, **no numbers attached** |
| Healthcare is a real part of our book | 6 of 28 `case_studies` are `industry_label='Healthcare'`; 4 healthcare accounts live on Google today | VERIFIED, stated at book level |
| No behavioral health experience | `case_studies` + `clients` + `reporting_clients` scanned on psych/mental/therap/counsel/behavioral/adhd/ketamine | **VERIFIED ZERO.** Sole hit is "Ida Jeltova / GM Therapy", `clients.status=inactive`, no `reporting_clients` row at all = never launched, not citable |
| Google will not sign a BAA for Google Ads | Google's HIPAA-covered services list covers Workspace and Cloud, not Ads | Platform fact, not a results claim |
| Search terms report withholds low-volume queries | Google search terms privacy threshold, in force since 2020 | Platform fact. Deliberately **not quantified** — no invented percentage |
| Six years (implicit seniority, not stated numerically) | `reference_samuel_years_experience` | Samuel = 6 years. Number not used in body; did NOT reuse Lindsey's "10+ years" |

## ATTACHMENT RULING

**ATTACH: Integrity Naturopathic.** Drive id `1x5jAh7fB8S_kcPSdmeLsdiCj8rNV8iwX`. Re-verified this session:
curl returns a real **755,933-byte, 3-page PDF** (`%PDF-1.4` magic bytes), byte-identical in size to the copy
pulled 2026-09-06, so contents are unchanged since it was last opened and read in full. Creekside-branded
footer, **no Samuel byline**, so it clears the byline screen. It is the only attachable healthcare artifact
per `reference_case_study_pdf_attachability`, and it is Google-only, which matches a Google-only posting.

**Known discrepancy, absorbed on purpose.** The PDF headlines "$14-$40 CPA" and "150+ conversions on a
$2,350/month budget"; live blended is $39.29. The body names that gap outright rather than hiding it
("it leads with its best keyword CPA the way case studies do; the number I would hold myself to is the
blended one"), which turns the discrepancy into the proposal's own argument. The **monthly spend figure is
cut entirely** — live is ~$1,863/mo against the PDF's "$2,350 MONTHLY BUDGET", and spend-vs-budget reads as
a contradiction to a stranger. Same handling as the 2026-09-09 phobia/therapy draft.

## WITHHELD ON PURPOSE

- **Join Piper.** Its case study is the perfect shape for this job ("10x ROAS in the first 30 days after
  rebuilding a broken Google Ads account with duplicate tracking and brand-only targeting") and it is the
  only restricted-health/telehealth row we have. **Cut anyway:** its only `reporting_clients` row is
  **meta**, **churned 2026-02-01**, `ad_account_id` NULL. No Google account row exists anywhere in the
  system, so the Google rebuild claim has zero live corroboration. Per `reference_case_study_numbers_vs_live_data`
  the case-study text is not sufficient on its own.
- **Polaris Dentistry.** `reference_case_study_numbers_vs_live_data`: sub-$4 CPA failed live recompute twice
  ($48.10, $27.57) and the account has churned.
- **Dr. Laleh's CPA.** Case study says $9.58; live Jun-Aug 2026 blended is $163.13. Spend is citable, CPA is
  not, per `reference_laleh_meta_is_the_single_account_ceiling`. Named as vertical presence only.
- **The Tooth Co / Vida Dentistry CPAs** ($205.72 / $232.62 blended Jun-Aug). Verified but unflattering out
  of context and unnecessary. Vertical presence only.
- **Root Hair, Advanced Med Spa.** Root Hair's YouTube claim is not citable (`reference_root_hair_youtube_claim_unciteable`);
  Advanced Med Spa is inactive.
- **Certifications.** **ZERO exist system-wide** (`reference_no_certifications_exist`). The posting asks for
  them "if applicable", which is a soft ask, so none are claimed and none are confessed. Per the 2026-08-14
  override lesson, not claiming is not the same as confessing. **Do not answer a follow-up by inventing one.**
- **Google audience/remarketing restrictions on sensitive health categories.** Real and relevant, but
  `reference_google_hec_is_not_meta_sac` warns against parity claims in this exact area and the point is
  subtler than one sentence can carry safely. The two certain diagnostics (search-term gap, HIPAA/OCI) carry
  the letter instead.
- **Pricing.** Not requested, and no spend base is knowable yet. See the pricing note below for the bid field.
- **Any calendar link or contact info.** First touch, URL ban applies (`project_upwork_proposal_url_ban_conflict`).
- **A name sign-off.** Ends on the closing question, per the 2026-09-04 ruling.

## SCREENS RUN

| Screen | Result |
|---|---|
| Ads in scope | **PASS.** A Google Ads audit and Search build is the entire ask. |
| Ad spend ≥ $5K/mo | **UNRESOLVED, not cleared.** Spend is not stated. Per `feedback_stated_budget_is_not_a_ceiling` an unstated budget leaves it open rather than DQ'ing. The closing question asks for it as a range. |
| Geo US/CA/UK/AU | **UNRESOLVED, not cleared.** Not stated. "Local-service" phrasing implies US but implication is not evidence. The closing question asks. |
| Required-items list (proof gaps) | **PASS.** Six items requested; five are answerable from verified material and the sixth (certifications) is hedged "if applicable". Nothing unanswerable forecloses the draft. |
| Never bill hourly | **PASS as drafted.** One-time scope is priced as the sanctioned onboarding fee, not an hourly rate. If they come back hourly-only that is a blocker. |
| Zero-spend milestone | **NOT TRIGGERED.** The account already exists and has spend history, so this is not an unpriceable pre-launch build. |
| White-label / subcontractor | No signal. Not fired. |
| Full-time employment seat | No signal. "Project" framing throughout. |
| Coaching competitors / detection evasion / self-funded / profit-share / worker-location | None fire. |
| Duplicate profile bid | **CLEAR.** Grepped all four draft directories: only hit is the 2026-09-08 teletherapy draft, a different posting (Meta paid social + IG organic). `upwork_leads` returns zero rows on psych/behavioral/mental. Fresh posting. |

## PRICING NOTE (for the Upwork bid field, not the letter)

Canonical, verified against `pricing-reference.md` (2026-05-25). One-time audit + build = the **onboarding
fee, $1,500 for one platform, audit included** (`reference_standalone_audit_fee`). The $1,000-$1,500
standalone-audit band does **not** apply here because management sits behind it. If it converts to ongoing:
20% up to $30K/mo, 15% to $60K, 10% above, **$1,500/platform minimum**, $15K cap. At any spend below $7,500/mo
the minimum governs. Do not quote the ongoing number until the spend range comes back.

## QC

Self-QC against the memory checklist: no em dashes; no name sign-off; no calendar link or contact info; no
booking CTA; no parroted deadline, format, or terminology (their "Standard Search" phrasing is built on, not
repeated); "our team" for delivery work and first person only for judgment; budget asked as a relative range;
every numeric claim recomputed live this session; the one attachment opened and byte-verified. Subagent QC
skipped: `qc-reviewer-agent` and `expert-review-agent` have no database access in this session type, so they
cannot verify the numeric claims, which are the only real risk surface here.
