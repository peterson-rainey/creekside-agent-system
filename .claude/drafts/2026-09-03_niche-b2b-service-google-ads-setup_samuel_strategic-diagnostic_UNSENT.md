# Upwork Proposal - Google Ads setup for a "very niche" B2B service business
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-03

## DATE NOTE
Postgres now() = 2026-09-03 21:30 UTC = 16:30 US Central, so the US Central date is Wed 2026-09-03.
The local shell clock and several drafts committed in the same window are stamped 2026-09-04.
Filename follows the Postgres-confirmed date per reference_local_clock_unreliable.

## SCREENS RUN
- Ads in scope: PASSES. Google Ads build is the entire ask.
- White-label / subcontractor: no signal. Not fired.
- Full-time employment seat: no signal. Not fired.
- Coaching Upwork competitors, detection evasion, self-funded / profit-share: none fire.
- Worker-location requirement: none stated.
- Geo: NOT STATED. Where ads run is unknown, so the US/CA/UK/AU screen is UNRESOLVED, not cleared.
- Ad spend: NOT STATED. $5K/mo floor is UNMEASURABLE, not cleared. Per
  feedback_stated_budget_is_not_a_ceiling an unstated budget leaves it open rather than DQ'ing.
- Pay structure: NOT STATED. If they come back hourly-only that is a blocker
  (feedback_never_bill_hourly). Setup here is priced as the one-time onboarding fee, which is the
  sanctioned instrument, so this is not a zero-spend milestone problem.
- Duplicate profile: grepped all five draft directories for "very niche" and "b2b service".
  ZERO existing drafts on this posting, on either profile. No two-profiles-one-job risk.
- upwork_leads: no matching row. Fresh posting, not yet synced.

## VERIFIED LIVE THIS SESSION
- Active Google book, reporting_clients platform='google' AND status='active' = 16 accounts:
  Aura Displays, Bo Birkeland, Canvas Homes, Doctor Laleh, Integrity Naturopathic, Joseph Miller,
  Myriad Traders, Nightlark, Outback Peptides, Perfect Parking, Retirement Income Solutions,
  Scattered Kind, The Tooth Co, Tiami, Tilly Mill Auto Center, Vida Dentistry.
  EVERY ONE is consumer-facing. ZERO active B2B-service accounts. Confirms
  reference_referpro_b2b_saas_and_trade_audience_inversion.
- Axle Solutions: case_studies row, industry_label "Auto Repair", Google Ads only, PDF exists.
  Summary: "local semi-truck axle repair shop from referrals-only to #1 impression share in a
  3-state radius, beating national chains." Genuinely niche B2B (sells to fleets and owner-operators)
  and genuinely greenfield, which is the exact shape of this posting.
  clients row: status INACTIVE, notes "Cancelled Dec 2024, access revoked Sept 2025."
- ReferPro: clients says "active", reporting_clients says CHURNED on BOTH platforms at $2,000/mo each.
  reporting_clients wins. Weak cite, left out.

## DELIBERATELY OUT
- The Axle superlatives are NOT used. "#1 impression share" and "beating national chains" come only
  from case_studies, and account access was revoked Sept 2025, so they cannot be verified either way.
  Per reference_case_study_numbers_vs_live_data the case-study text is not sufficient on its own.
  Only the vertical and the referrals-only-to-paid shape are cited, and it is marked past tense.
- No CPL, CPA, ROAS or impression-share figure is claimed anywhere. There is no verified B2B-service
  Google number in the system to attach.
- ReferPro excluded: churned on both platforms, $2K/mo, no CAC.
- No certifications claimed (reference_no_certifications_exist).
- No links, no calendar link, no contact info. First touch.
- No em dashes. No sign-off name, per feedback_no_name_signoff_in_drafts (ruled 9/4).
- Delivery framed as "our team". No principal named as the worker.
- Six years, not Lindsey's 10+ (reference_samuel_years_experience).

## OPEN QUESTIONS FOR QUEENIE
1. Ad spend and geo are both unstated. The proposal asks for deal value rather than a budget number,
   which is the more useful lever here, but neither screen is actually cleared before a reply.
2. If they want setup-only with no management behind it, the fee is onboarding $1,500 for Google.
   Confirm that is the intended instrument before quoting anything further.

## ATTACHMENT DECISION (resolved 2026-09-03)
RECOMMEND: Axle_Solutions_Auto_Repair_Case_Study.pdf, Drive file id 1vIvJ6QQzV16kBItpD9dODDt9sWIT4HhZ.
DO NOT use the case_studies.download_url id 1YnM0jqMHFzVh0jGSTusO8YtoRs6O7E0- . It returns a ~908KB
Google Drive HTML interstitial, not a PDF, at HTTP 200. Landmark and ReferPro fail the same way.
The underscore twin in Drive/Case Studies is the live file. Verified by magic bytes this session.

Why Axle: only artifact in the book that is B2B, niche, Google-only and built from referrals. Its own
headline is "Niche Market Dominated By National Chains, Local Repair Shop Becomes Market Leader" and its
challenge paragraph reads "holding on by their bootstraps with referrals", which corroborates the body
claim word for word. Bylined "By: Samuel Rainey", which is consistent on Samuel's own profile.

Four hazards, all disclosed to Queenie:
1. Zero numbers in the document. No spend, CPL, CPA or conversion count.
2. Results window May 2023 to April 2024. PDF says impression share "(and still is) #1" in present tense.
   Client cancelled Dec 2024 and account access ended Sept 2025, so that is stale. The body deliberately
   does not restate it.
3. About half the document is GMB and local SEO, not Google Ads. Invites an ask we cannot service.
4. Strictly local, Illinois and a 3-state radius. Does not transfer to a national B2B niche.

OPTIONAL SECOND: nyc_notary.pdf, id 17ltXGV_GTMHFyMg0OE8bNL9pygghyG3l. Verified real PDF, Google Ads only,
440 conversions at $27.92 CPA, $16.04 CPA reduction, 3.85K clicks, mobile notary and apostille. Carries the
numbers Axle lacks. Not B2B, so it is a shape match on "narrow service business" only.

REJECTED: ReferPro (twin 1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso is real, but thesis credits Meta, Google half is
mostly PMax, and page 1 states "target market: Home service contractors"). Winterbotham and Green Shield and
UrCovered are all real PDFs but consumer-facing and are optimization stories, not greenfield builds.

NOTE: none of these four has a reporting_clients row, so their numbers cannot be cross-checked against live
insights. PDF-only claims. The proposal body cites no number from any of them, so there is no contradiction.

## WORD COUNT: 320 (strategic target 250-350)

---

Very niche B2B usually means the entire category's search volume is smaller than the account needs in order to run itself, and that one fact should shape how the whole thing gets built. Google's smart bidding wants somewhere around 30 to 50 conversions a month before it optimizes well. A specialized B2B service with a long sales cycle often produces 5 to 15. Launch on Maximize Conversions anyway and the algorithm never leaves the learning phase, so it widens out into loosely related searches hunting for volume, and the budget goes to people who were never buyers.

So the first thing worth knowing before anything gets built: what does monthly search volume actually look like on your three or four core terms? If the category really is that thin, Google is a capture channel rather than a growth one, and that is much better to find out now than three months in.

How our team handles these: open on manual CPC or Maximize Clicks with exact and phrase match only, build the negative keyword list before launch instead of cleaning it up afterward, and wire offline conversion import from day one so that once deals actually close, Google is learning from closed revenue instead of from form fills. In a narrow B2B account the form-fill count is almost never the number that matters.

Closest thing in our book is a semi-truck axle repair shop, about as narrow as a B2B service gets, that came to us on referrals only with no paid history at all. Being straight with you, they are a past client rather than a current one, and our active Google accounts today skew consumer-facing. Worth saying outright instead of letting you assume otherwise.

Six years across Google and Meta. Setup is a fixed onboarding fee and management is a percentage of spend, never hourly.

What is the service, and what is one closed deal worth to you?
