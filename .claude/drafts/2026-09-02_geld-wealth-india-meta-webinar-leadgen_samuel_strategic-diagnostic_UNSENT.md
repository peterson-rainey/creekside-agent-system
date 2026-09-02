# Upwork Proposal - Geld Wealth (Mumbai), Meta ads to weekly investment webinar + private meetings
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-02 (Postgres now())

RESOLUTION
- Step 0 (already-drafted check) FIRED, CAUGHT LATE: `.claude/agents/upwork-proposal-agent/drafts/
  2026-09-03_geld-wealth-india-webinar-meta_lindsey_default_UNSENT.md` exists for this exact job.
  My first Step 0 pass queried `upwork_leads` only (no row there) and missed the drafts folder.
  TWO PROFILES NOW HOLD A DRAFT ON ONE JOB. Queenie must pick one before anything sends.
- Queenie's ask named the STYLE ("strategic + diagnostic") and no profile. Strategic is Samuel-only,
  which the Lindsey draft itself concedes in its style note, so this Samuel artifact is the requested
  one and the Lindsey draft is the shelving candidate. Ruling is still hers.
- Angle deliberately DIVERGES from the Lindsey draft. Lindsey opens on whether the registration event
  reaches Meta at all. This opens one level earlier, on two offers sharing one campaign, then the
  weekly-relaunch structure. The show-rate point overlaps and is framed differently in each.
- GEO SCREEN FIRED AND WAS OVERRIDDEN by Queenie 2026-09-02. This is the THIRD override of the geo screen,
  and the FIRST on a first submission rather than a next-day re-request. The two prior overrides
  (AU/UAE, MySportsNotes) both came from re-requests. Screen default is unchanged for future jobs.
- Per the override rule, the draft must let the client's own answer resolve geo. Body asks whether any
  spend targets NRI audiences abroad, which is the only realistic path to a qualifying market here.

SCREENS RUN
- Ads in scope: YES, Meta lead gen. Not white-label, not coaching, not a full-time seat, not profit-share,
  not creative-production-only. Clean on that family.
- Geo: FAILS. Site lists office at "Lodha Signet, A-618, Senapati Bapat Marg, next to Kamala Mills,
  Lower Parel, Mumbai, Maharashtra 400013". Services are PMS, AIF and mutual funds, all SEBI-only
  instruments. "Private meetings in our office" pins the audience to Mumbai. Drafted on override.
- Spend: NOT STATED. $5K/mo screen unmeasurable. Asked as a relative range, no brackets.
- Required items: ZERO numbered items, no screening questions. No proof demand to foreclose the draft.
- Pricing: post does not ask and spend is unknown, so NO fee quoted. Consistent with the fire-apparatus
  precedent. Canonical marginal tiers untouched.

VERIFIED LIVE THIS SESSION (contractor_query)
- India / SEBI / brokerage / PMS / AIF / wealth management: ZERO rows in `clients`, `reporting_clients`
  and `case_studies`. Conceded outright in body.
- `case_studies` finance rows = ONE: South River Mortgage. CHURNED 2026-08-11 (both platforms).
  Its $81 CPL already flagged as failing live verification. EXCLUDED entirely, not even in past tense.
- Retirement Income Solutions: ACTIVE, both platforms. Meta act_1423698879754960, $1,000/mo,
  AM Peterson, operator Trent L. `goals` field reads verbatim "Meta Ads for financial advisory event
  registrations". Used for VERTICAL + FUNNEL SHAPE ONLY, no number, per the pooling and team-framing rules.
- RIS attributed Meta account 12mo (2025-09-02 to 2026-09-01): $45,169.30 / 25 conv = ~$1,807 per
  conversion. Confirms the no-number decision.

DELIBERATELY OUT
- act_663740117605644 ($206,257.64 / 925 conv / $222.98 CPL / avg CPM $156.47, 87 RMD/SS/IRA/estate
  webinar campaigns, active through 2026-09-01) is NOT cited. It maps to NO `reporting_clients` row.
  PipeBoard account lookup blocked by a monthly slot limit until 2026-09-14, so ownership is UNRESOLVED.
- Its SAC vs non-SAC CPL split ($165.38 vs $226.61) is NOT cited. Fails date integrity: SAC campaign
  start_time is 2026-07-22 but carries 335 daily insight rows back to 2025-09-02, and there are zero
  duplicate campaign_ids to explain it.
- The dated-campaign-relaunch pattern IS used, but framed as a general pattern in the category rather
  than as an account we own, since attribution is unresolved.
- No links, no calendar link, no contact info (first touch). No em dashes. No certifications claimed.
- UNSIGNED per the 2026-09-01 workspace precedent (local samuel-strategic.md is stale against the
  2026-08-29 rename).

---

A weekly webinar and a private meeting are two different offers, and the most common way these accounts leak money is running both through one campaign. Meta will find the cheaper conversion and quietly move most of the budget there. Registrations are always cheaper than booked meetings, so the webinar fills, the calendar stays thin, and it gets read as a targeting problem when it is a structure problem.

The weekly cadence creates a second issue that is easy to miss. If each session gets its own dated campaign, the account restarts learning every seven days and never accumulates enough conversion history to optimize on. It is a very common pattern in financial event advertising, a long series of campaigns named by event date, each one relaunching from zero. The alternative is an evergreen registration campaign that runs continuously, with the date handled on the landing page and in the creative rather than in the campaign structure.

Then there is the number that usually gets tracked too late. Meta optimizes toward whatever event you send back to it, and if that event is the registration, it will get very good at finding people who register and never attend. Show rate is where webinar funnels actually die. Feeding attendance back as the conversion, and eventually the booked meeting, is what moves cost per client instead of cost per signup.

One thing worth flagging before any budget goes live. Your site leads with a 34.88% three year CAGR and a since inception return. Performance and return claims are the most common rejection reason in this category, and the review applies to the landing page as well as the ad. The strongest hook you already own is probably the one that will not clear, so the creative has to be built around the education itself rather than the numbers.

Straight with you on proof. We have no India based account and no brokerage or portfolio management client, so nothing in our book speaks to SEBI rules or to that audience, and stretching something adjacent would not survive your first question. What is close is the machine itself. Our team currently runs a financial advisory firm whose Meta program exists specifically to fill event registrations and convert them into private appointments, which is structurally the same funnel you are describing.

Two things would sharpen this. Does all of the spend target India, or is any of it aimed at NRI audiences abroad? And what monthly range are you considering for ad spend?
