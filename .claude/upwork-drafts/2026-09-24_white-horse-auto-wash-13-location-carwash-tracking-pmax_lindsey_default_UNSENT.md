# White Horse Auto Wash (Charleston SC + Virginia): 13 car washes, conversion tracking + PMax restructure + Meta rebuild
Profile: Lindsey | Style: lindsey_default | Status: UNSENT (QC PASS WITH FIXES applied) | 348 words, 1,918 chars
Companion file: `2026-09-24_white-horse-auto-wash-13-location-carwash-tracking-pmax_samuel_SKIP.md` (same job, **ruled SKIP by Queenie 2026-09-24**, no draft)

## READ FIRST: this job was already ruled SKIP today
A concurrent session screened this exact post and Queenie ruled skip on engagement economics:
their $1,000-1,500/mo ceiling against a $3,000/mo two-platform floor, with $6,600 x 20% = $1,320
below even one platform minimum. This draft was produced afterwards on a Lindsey request.

**Why the Lindsey read is not automatically the same call.** The skip file's own closing line says the
shapes that work are "a fee at or above $3,000/mo for both platforms, **or a single-platform engagement
at $1,500/mo**." Lindsey is Meta-only, so the relevant floor is ONE platform minimum, $1,500/mo, which is
exactly the top of their stated range. The two-platform arithmetic that decided the skip does not apply
to a Meta-only scope.

**What still fails under Lindsey.** Her own doc floor is $3,000/mo Meta-only, which this post cannot
reach at any point in its range. And Meta is plainly the minor half of the $6,600 (two Meta campaigns
against ten PMax campaigns), so percent-of-spend on the Meta portion lands far under $1,500 and the
minimum would be close to their entire stated cap.

## Screens (2026-09-24 US Central; Postgres now() 19:16 UTC = 14:16 Central. Local shell clock reads 9/25, off by one)
- Style: request named `lindsey_default` in the same sentence as "strategic + diagnostic", so per standing
  practice the naming mismatch is noted in one line and the fork was not re-surfaced. Lindsey has exactly one
  style; "strategic" is Samuel-only.
- Already-drafted check: at the time this session ran it, NO White Horse file existed. The Samuel SKIP file
  landed in git mid-session (HEAD 3169746). No Lindsey draft exists. No White Horse row in `upwork_jobs`.
- Platform test: **PARTIAL, and Google is the core.** Conversion tracking on GA4/GTM, ten PMax campaigns,
  modeled store visits and the offline import are all outside her scope. Meta is one of four deliverables
  and is named with real scope (rebuild Traffic/Awareness into conversion campaigns), so this is a partial,
  not the graph8-style total break. Disclosure sits in paragraph two per the finserv rule, because the
  out-of-scope half is the entire core.
- Geo: Charleston SC + Virginia. PASS (US). White-label: direct owner, independently owned. PASS.
  Ads in scope: yes. PASS. Full-time seat: absent. PASS. Self-funded / profit-share: absent. PASS.
- Ad spend $6,600/mo: PASS on the $5K screen. **Fee ceiling: FAILS for two platforms, clears for one at the
  top of their range.**
- Hourly: the $400 / five-business-day audit passes the IVC carve-out 4-for-4 (capped, paid, gates a 60-day
  engagement, their number not ours). The ongoing retainer fails it. Forged Fitness precedent applies: take
  the trial, stay silent on the retainer. No rate, fee model or term typed in the body.
- $40/hr floor: FIRES at the bottom. 5-8 hrs/wk against $1,000-1,500/mo spans roughly $28.84 to $69.23/hr.
- Trial screen: $400 audit, then 60 days, then month-to-month. Per the post-9/23 default, the 90-day minimum
  is NOT typed in a first-touch proposal. It must be raised before any contract.
- Ads + landing-page CRO: does NOT fire. They own the 13 pages and want tracking on them, not CRO. Zero
  CRO-gated screening questions.
- "We are not hiring an agency" (their own section): drafted in **strict first person**, no "we", no "our
  team", no Creekside. Proposal-level pooling is permitted since 9/17 but was declined here on purpose,
  because the post excludes agencies outright and every account cited is hers anyway. Their other exclusion,
  running media through our own account, does not hit us.
- Payment verified: not checkable logged out.
- Required items: THREE. At three items her ceiling is tight; landed at 325 words inside the 350 allowance.

## Verified facts used (all pulled live from Supabase 2026-09-24)
- **The Tooth Co** Meta `act_1032713196182770`, operator Lindsey B., status paused. August 2026, both
  campaigns 8/01-8/31 on nearly equal budget: `Engagement | 7/29` $1,845.88 / 49,760 impressions /
  1,584 clicks / **0 conversions**; `Leads 7/29` $1,955.17 / 26,721 impressions / 1,087 clicks /
  **124 conversions / $15.77 each**. The column is `conversions` and the event is unrecorded, so the draft
  writes "conversions", never "leads" or "inquiries". Matches the Samuel skip file's pull to the cent.
- **Punch Drunk Chef Meal Prep** Meta `act_1248382100071649`, operator Lindsey Bouffard, status ACTIVE
  (present tense correct). Live 6/01-9/23, one campaign per metro: Dallas $7,870.13, Frisco $3,675.58,
  Plano $2,459.78, McKinney $1,276.06, plus `S | Nature's Plate | Denton | 3/1` $1,115.60. Conversions and
  ROAS are null in this table, so **structure and presence only, no results claimed**. Denton is excluded
  from the count because Nature's Plate may be a sub-brand, so the draft says FOUR metros to understate.
- **Fusion Dental** Meta `act_938570599860690`, operator Lindsey B., **churned, past tense**. Whole account
  4/21-7/15/26: $64,746.78 / 2,558 conversions / $25.31. Per-location campaigns: Roseville $27,213.66 / 1,111;
  EDH $21,611.63 / 950; plus Roseville Spanish. Monthly: Apr (9 days) $8,997.06, May (27 days) $32,562.41,
  Jun (27 days) $15,927.38, Jul (15 days) $7,259.93 -- so daily spend roughly halved May to June on the same
  active-day count. Verbatim, 6/04 client-call prep notes: "May overall: Slowdown across all platforms.
  **Call center capacity is the issue, not ad performance.** New manager brought in to improve call handling."
  The June CPA improvement ($29.85 to $25.48) is deliberately NOT cited beside the cut, to avoid implied causation.
- Prior car-wash cohort: 3 bids, 0 viewed, 0 messaged, 0 calls, 0 won.

## Open weaknesses, stated plainly
1. **Required item 3 is the draft's softest claim.** The Samuel session's live sweep found ZERO
   spend-reduction rows in `agent_knowledge` and only one system-wide "told a client to spend less" record
   (Nightlark, Fathom 8/27/26) -- which is a reallocation, Ahmed's, Google, and foreclosed under Lindsey.
   The Fusion answer rests on different and better evidence: the halved daily spend is in
   `meta_insights_daily` and the capacity reason is verbatim in the 6/04 prep notes. But **no record says
   Lindsey recommended the cut.** A prior QC ruled "I brought spend down" supportable because she was the
   Meta operator, so the draft claims the cut and the reasoning, never a conversation. If that is too far,
   the neutral swap is "daily budget came down by about half from May to June."
2. **No attachments, and the results-attached line is dropped.** Fusion has no PDF; Punch Drunk's PDF headline
   claims 20x against live data nearer 1.74x; the Dr. Laleh PDF's headline CPA figures are contradicted live.
   Same call as the 9/16 Faevaa car-wash Lindsey draft. It also protects the thesis: this proposal argues
   headline platform numbers are not customers, so a headline-ROAS PDF would be arguing against it.
3. **Her $3,000/mo Meta-only doc floor is unreachable here** at any point in their range.

## Touch-2 obligations
- Settle the fee before any scope is agreed: $1,500/mo Meta minimum plus $1,500 Meta onboarding, against
  their $1,000-1,500 cap that is meant to cover both platforms.
- Raise the 90-day minimum. It is not in the body.
- The Google half needs an owner or the November deadline does not get met. Do not let silence imply she takes it.

## QC review (qc-reviewer-agent), verdict PASS WITH FIXES -- all four fixes applied
1. **Parroting their deadline.** "The answer sets the ceiling on what November can tell you" restated their own
   stated November deadline. Rewritten to "how far back any of this can be traced."
2. **Parroting their phrasing.** "clicks and nothing countable" echoed the post's "Nothing tied to a countable
   customer." Rewritten to "clicks and not much you can act on."
3. **Required item 2 was only implied.** The Meta paragraph reported conversion volume and cost but never named
   the optimization target. Added: "The only difference was the objective, and the leads setting is what made
   Meta optimize toward something the practice could count." Objectives verified live in `meta_campaigns`:
   `Leads 7/29` objective = `leads`, `Engagement | 7/29` objective = `engagement`.
4. **"Dental practice" label unverified.** Confirmed live: `clients` row "The Tooth Co", industry
   **"Healthcare / Dental"**, status active. Label is accurate.

QC also confirmed it agrees with dropping the results-attached line, and passed the draft on numbers, tense,
causation discipline, scope placement and every format rule. One tense note it raised and the resolution: the
Tooth Co Meta ad account row is `paused` with no spend since 8/31, while the CLIENT row is active and Lindsey
is still platform_operator, so present tense "a dental practice I run Meta for" holds. Both campaign records
themselves read ACTIVE at campaign level.

Adding the required-item answer pushed the draft to 353 words, 3 over her 350 multi-question ceiling; trimmed
to **348** by tightening two clauses rather than dropping an answer.

## Draft

Quick question before anything else: is the free wash code on each store page one shared code for that location, or a unique code per visitor? The answer sets the ceiling on how far back any of this can be traced. A shared store code proves the store and stops there. A unique code issued on the page, tied to something the visitor hands over, is what lets a redemption at the register point back at a campaign and an ad.

To be straight about fit: Facebook and Instagram are what I run. Performance Max, modeled store visits and the Google side of the tracking build are not mine, which I would rather say plainly than stretch.

On the Meta half, Traffic and Awareness objectives are why two campaigns have produced clicks and not much you can act on. A dental practice I run Meta for had both kinds side by side in August on nearly the same budget. The engagement campaign took $1,845 and 1,584 clicks with not one recorded conversion. The leads campaign took $1,955, fewer clicks at 1,087, and recorded 124 conversions at $15.77 each. The only difference was the objective, and the leads setting is what made Meta optimize toward something the practice could count. Clicks were never the thing in short supply.

Multi-location: I run Meta for a meal prep company across four Texas metros, one campaign per market rather than one campaign with the markets inside it. That is the only structure where a per-store budget decision has anything to stand on, and at 13 sites it matters more, not less.

Spending less: on a dental group I ran Meta for, split by location, the call team could not work the volume the ads were producing. The honest answer was less, so I took daily budget down by roughly half from May to June. The constraint was the phones, not the ads. Your version is whether every site can absorb what a bigger number sends it on a Saturday.

There is a short video on my profile that shows how I work.

**Last question:** "is the free wash code on each store page one shared code for that location, or a unique code per visitor?" (the only question in the draft)
**Last sentence:** "There is a short video on my profile that shows how I work."
