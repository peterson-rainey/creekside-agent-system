# Upwork Proposal - Meta Ads + ChatGPT Ads for an online masterclass / VSL funnel, 30-day fixed price
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-02 (Postgres now(), US Central)
Length: 858 words / 4,900 chars. Under the 5,000 char hard limit. OVER the 400-word style ceiling, deliberately (see COMPLIANCE).

## RESOLUTION

- Step 0 (already-drafted check) run against BOTH folders this time, per the Geld Wealth miss on 2026-09-02.
  `.claude/drafts/` and `.claude/agents/upwork-proposal-agent/drafts/` grepped for masterclass / ChatGPT Ads /
  Ad Pack / One Avatar. ZERO hits. No `upwork_leads` row either. First submission, no duplicate-profile risk.
- Style was named by Queenie, profile was not. Strategic is Samuel-only, so this is a Samuel artifact.
- Local `docs/samuel-strategic.md` still says sign "Samuel". STALE against the 2026-08-29 rename.
  UNSIGNED per the 2026-09-01 workspace precedent.

## SCREENS RUN

| Screen | Result |
|---|---|
| Ads in scope | PASS. Meta + ChatGPT Ads, campaign setup, testing, budget, scaling. Core work. |
| Creative production | NOT REQUIRED. They supply VSL, video, stills, copy, offer. Favourable. |
| White-label / subcontractor | PASS. Direct client. |
| Full-time seat | PASS. No "full time" language, no hours-per-week count, no "Who You Are" block. |
| Self-funded / profit-share | PASS. Fixed price, they fund spend. |
| Coaching Upwork competitors | PASS. |
| Detection evasion | PASS. |
| Hourly ban | NOT ENGAGED. Fixed price, not hourly. No rate field collision. |
| **Ad spend** | **NOT STATED.** $5K/mo floor UNMEASURABLE. Asked in-body as a relative range, no brackets. |
| **Geo** | **NOT STATED.** Post never says where ads run. US/CA/UK/AU screen OPEN, not passed. Asked in-body. |
| **30-day engagement** | **90-DAY-MINIMUM RULE FIRES.** Standing record is 8 skips vs 3 overrides. Budget is UNSTATED, which per the standing rule leaves it open rather than foreclosing. Handled in-body by reframing the month as tracking + angle discovery with the revenue read landing after, which converts their trial into our gate without arguing about it. **Queenie ruling needed.** |
| Required items | PASS. Three in-body questions, no unanswerable proof demand. Q2 explicitly forgives no ChatGPT Ads experience. |

**Doc conflict flagged:** `docs/samuel-identity.md` lists "a trial period, test engagement, or short-term
contract (e.g. 1-month trial)" under THINGS THAT ARE NOT FLAGS. That contradicts the 90-day-minimum standing
ruling. The standing ruling is newer and is treated as operative. The doc line is stale.

## PRICING - QUEENIE DECISION REQUIRED

Body quotes NO price (post does not ask in-body; consistent with the fire-apparatus and courses precedents).
But Upwork REQUIRES a bid number on a fixed-price submission, so a number has to be chosen before this sends.

Canonical instrument (`pricing-reference.md`, current as of 2026-05-25): onboarding **$1,500 per platform**,
audit included. Meta + ChatGPT Ads = **$3,000** if ChatGPT Ads counts as a platform, **$1,500** if it does not.
No management percentage applies yet because spend is unknown. Recommend $3,000. Not my call.

## VERIFIED LIVE THIS SESSION (contractor_query, 2026-09-02)

**ChatGPT Ads is REAL and OURS.** `openai_ad_accounts` / `openai_campaigns` / `openai_insights_daily`:
3 campaigns across 3 client accounts (The Tooth Co., Chattanooga Skydiving, Alex Antipov Dental).
2026-06-07 to 2026-09-02, 87-day span, 102 daily rows. **$1,626.30 spend, 31,044 impressions, 441 clicks,
$3.69 CPC, $52.39 CPM, 1.42% CTR.** Conversions column is NON-NULL on all 102 rows and equals **0 on every
row**. `bidding_type` = "clicks" on all three campaigns. One campaign still active, two paused.
This CORRECTS the standing assumption that ChatGPT Ads is a proof zero. It is a small but genuine live channel.

**Fusion Dental scale/pullback arc** (act_938570599860690, CHURNED 2026-07-22, past tense only):
Apr 21-29, 9 active days, $8,997.06 / 480 leads / $18.74 CPL / **$999.67 per active day**
May, 27 days, $32,562.41 / 1,091 / $29.85 / **$1,206.02 per day**
Jun, 27 days, $15,927.38 / 625 / $25.48 / **$589.90 per day**
Jul 1-15, 15 days, $7,259.93 / 362 / $20.06 / **$484.00 per day**
Total $64,746.78 / 2,558 leads / $25.31 blended. Matches the 2026-09-02 CAPI draft exactly.

**CAUSAL CORRECTION, caught in self-review.** The v1 body attributed the May-to-July pullback to marginal CPL
economics. That is FALSE. `reference_fusion_dental_call_center_meta_proof` records the documented reason:
spend was "intentionally reduced to accommodate the call center." The numbers are real, the motive was not.
Body now states the capacity reason and keeps the marginal-CPL rule as a general rule rather than as the
cause of this specific cut. Also restored from the same source: lead forms deliberately carried qualifying
questions, accepted as a CPL increase in exchange for quality.

**Laleh Meta ceiling** (act_868498138612020, ACTIVE): 12 full months Sep 2025 - Aug 2026, $1,183,940 total,
**$98,662/mo average, peak month $114,586.56 (March 2026)**. Cited as spend + KPI NAME only.
CPA deliberately NOT cited: it swings $305.98 to $3,969.40 across those months and the case-study PDF's
$48.79 to $9.58 does not reconcile with the Meta account. Standing rule held.

## DELIBERATELY OUT

- **Adventures in Wisdom** is the ONLY education / certification-course account and is the closest vertical
  analog to a masterclass. Recomputed live: $11.31 CPL Nov 2025 to $162.06 Jul 2026, $145.92 Aug, at flat
  ~$5K/mo. COLLAPSED. Standing rule allows vertical presence with no number; omitted entirely here because
  spending words on a weak analog costs more than the vertical claim is worth.
- **Aura Displays** 12.58x: ecommerce Google Shopping, wrong funnel shape. Also note the DB row still reads
  `active` while the 2026-09-03 commit says PAUSED for non-payment. Unresolved, so not used.
- **Blush Camera** ($4.8K to $20K/mo, ROAS 1.08 to 1.88 then 1.22): a real up-arc, but it never hit its 3 ROAS
  goal and churned 2026-06-16. Weak proof, excluded.
- **South River Mortgage**: churned, $81 CPL already fails live verification. Excluded.
- **act_663740117605644** (the $206K unattributed webinar account): still unattributed, PipeBoard slot limit
  until 2026-09-14. Excluded, same as on Geld Wealth.
- No CAPI/pixel case study exists anywhere in the library. Nothing attachable. **Attach NOTHING.**

## ATTACHMENT DECISION (verified 2026-09-02 by curl + gdrive_marketing)

**RECOMMENDATION: ATTACH NOTHING.** All 28 `case_studies` rows screened.

- **ZERO tracking/pixel/CAPI case studies exist.** The job's most emphasized requirement ("This is extremely
  important to us") has no attachable proof of any kind. Confirms the 2026-09-02 CAPI-draft finding.
- **ZERO webinar, masterclass or VSL-funnel case studies.** Nothing on registration-to-purchase funnels.

**The one real candidate, and why it is still a no.** `Adventures in Wisdom` is the ONLY Education row and the
only enrollment/application funnel we own on Meta. Its case_studies `download_url` (file_id 1sRK... pattern,
`1qoW2YJOCD_AwOnvAEdGjsh-adzQ_drD0`) returns **text/html**, stale as always. The **underscore twin IS LIVE**:
`Adventures_in_Wisdom_(AIW)_Case_Study_Creekside_Marketing_Pros.pdf`, file_id `1Q4IAix0Gc81lnfeWvRlMJYHwTijeIw-h`,
HTTP 200, application/octet-stream, correct content-disposition, **809,926 bytes**. Real file. Twin rule now 7/7.

Content per `gdrive_marketing.ai_summary`: Meta only, Mar-Oct 2025, ends at **90 applications / $11,069 spend /
$123 CPA in Oct 2025**, down from $256 CPA in Jan 2025. Method content is an unusually good match for this post
(systematic testing, budget reallocation, a "Retirement" segment emerging as the winner, and a May improvement
with NO new creative, which is exactly their "understand why it is working" ask).

**Reconciliation check: the spend matches EXACTLY and the conversion count does not.** Live
`meta_insights_daily` for Oct 2025 on act_1553150081825 = **$11,069.43**, against the PDF's $11,069. But live
conversions = **573 at $19.32**, against the PDF's 90 at $123. That is NOT a contradiction, it is the Master Spa
Parts shallow-event ladder: the PDF counts applications, the insights table counts a shallower standard event.
Defensible if asked.

**Three reasons it still does not go:**
1. Standing rule on AiW is presence-only, cite NO number, because the account **collapsed after the PDF's
   window**: $11.31 CPL Nov 2025 to $162.06 Jul 2026 and $145.92 Aug 2026, at flat ~$5K/mo. A "how is that
   account doing now" question has a bad honest answer.
2. The proposal body does not mention AiW anywhere. Attaching a case study the body never references is
   incoherent and invites the exact question in #1.
3. Same family as the 2026-09-03 Aura ruling: do not attach a PDF whose headline the current data undercuts.
   Aura's was contradicted outright; AiW's is superseded by later decline. Softer, same direction.

**If Queenie overrides and wants an attachment, AiW's underscore twin is the only defensible file**, and the
body must be amended to reference it and to scope it to Mar-Oct 2025 explicitly.

**Screened and rejected:** Birthday Club App (creative-testing method match, but file_id
`1NOKmt8X-jCC8wFYtpDLYE_zRfa1_v9Ag` returns **HTTP 404** and NO underscore twin exists in `gdrive_marketing`.
Memory rule confirmed, cite but never promise). Fitness Superstore 40x (unbacked, churned). Aura Displays
(Google Shopping ecom, wrong funnel, headline contradicted by live ex-brand data). South River Mortgage
($81 CPL fails live verification, churned). ReferPro, Join Piper, Integrity, Polaris, Dr. Laleh (wrong vertical
or wrong funnel shape for a masterclass).

## KNOWN TENSION - FLAGGING, NOT RESOLVING

Q3 asks what "you personally" scaled and "you have personally managed", twice. Standing rules forbid naming a
principal as the delivery worker and require "our team" framing. The body answers in "we / our book", which is
honest but is a visible mismatch with the word they used. A sharp prospect may push on it. No rule permits
answering it any other way, so it stands, but Queenie should know the seam is there before this sends.

## QC LOG (qc-reviewer-agent, run 2026-09-02 after the roster refreshed)

**Verdict FAIL, 1 blocking. Fixed.**

1. **BLOCKING, my error, applied.** Body said "Across 102 days" one clause after "since June 7." 102 is the ROW
   COUNT across three accounts, not elapsed time. June 7 to September 2 is 87 days. The proposal handed the
   prospect the start date and then contradicted it with arithmetic they could do in their head, inside the one
   paragraph where our numbers are the whole point. Now reads "Close to three months in and $1,626 spent."
   The draft's own verification block had it right ("87-day span, 102 daily rows"); the body did not.
2. **Applied.** "KPI is cost per booked consult" on the $100K/mo account was invented. Checked live:
   `clients.conversion_events` is empty, `target_cpl` NULL, `reporting_clients.goal_type` and `goal_target`
   both NULL for act_868498138612020. No KPI is recorded anywhere. Clause struck. The KPI answer now sits on
   the Fusion paragraph instead, where it IS documented, and is stated explicitly as blended cost per lead
   into a call center.
3. **Applied.** "Four months" for Apr 21 to Jul 15 is 86 days. Now "Twelve weeks."
4. **Applied.** "we have not built conversion tracking there" was an inference from conversions = 0. Softened
   to "we have not gotten conversion data flowing back there," which is exactly what the data proves.
5. **Rejected, QC lacked the roster.** "on dental and one experience brand" is accurate: the three ChatGPT Ads
   accounts are The Tooth Co., Alex Antipov Dental Corp. and Chattanooga Skydiving Company. Two dental, one
   experience. No change.
6. **Open, out of QC scope.** The Meta personal-attributes policy claim in the opening paragraph is domain
   expertise, not a DB fact. `expert-review-agent` spawned separately to check it, since it is the hook.
7. **Applied.** Recounted after edits: 867 words / 4,918 chars.

## EXPERT REVIEW LOG (expert-review-agent, 2026-09-02)

**Verdict: Needs Work. Opening rewritten. 6 of 7 applied.**

1. **HIGH, applied, the important one.** v2 opened "Both of the angles you named are the two most likely to
   get rejected." The client gave two-word ANGLE DESCRIPTIONS, not ad copy. Predicting a rejection outcome for
   copy we have never seen is presumptuous, unfalsifiable, and it was the Upwork PREVIEW text in front of a
   prospect who said they value reasoning. Opener rebuilt as a mechanism explanation rather than a prediction.
2. **HIGH, applied, real gap.** The opener led with personal attributes and MISSED the likelier vector.
   Income-opportunity offers are among Meta's most enforced categories under unrealistic outcomes and
   misleading claims, and "a second paycheck without working a second job" is an implied-earnings promise that
   flags in second person or third. Grammar does not save it. That is now the FIRST thing in the proposal and
   personal attributes is second.
3. **MEDIUM, applied.** Financial status is the enumerated personal attribute; employment status is derivative,
   not a standalone codified category. v2 implied both were enumerated. Reworded to route job-security copy
   through the financial-situation read, which is the accurate path.
4. **MEDIUM, applied.** v2's binary ("gets pulled" / "clears") asserted deterministic enforcement. Meta's
   classifiers are topic and sentiment driven, not a grammar test. Now "lowers the odds without guaranteeing
   anything." The concrete before/after rewrite example was CUT with it, which costs some punch. Flagging that
   as a real loss, not a free win.
5. **LOW, applied.** "never gets reset" on the scaling campaign contradicted the client's own stated concern
   about creative fatigue. Now "not reset without cause, fatigue being the cause that counts."
6. **MEDIUM, applied.** The attendance-then-purchase advice had no volume caveat and no attribution-lag caveat.
   Both added, and the weekly-conversion point was moved out of answer 1 into answer 2 rather than duplicated.
7. **LOW, NOT applied.** Recommended naming Meta's native A/B test tool. Rejected: it does not solve the actual
   problem (spend concentration inside one ad set across six creatives), and it costs characters the SAC risk
   needed more.

**Also carried in, hedged as the reviewer asked:** the Special Ad Category question. A teaching product usually
stays out of Employment or Financial Products SAC, but classifier drift can force the toggle and that strips
targeting. Named as a risk, not asserted. One clause only, because it is the least settled item in the opener.

## COMPLIANCE

No links or URLs. No contact info. No calendar link (first touch). No pricing in body. No em dashes (verified 0).
No certifications. No years-of-experience claim. No client names. Does not open with "I". Opens on the client's
own words (job security, second paycheck, Ad Pack). Portfolio numbers land last. Closes on the two open screens.

**Two deliberate style deviations, both flagged:**
1. **Numbered markers 1/2/3 used**, against the no-lists golden rule. The post says "Please Answer These 3
   Questions" in-body. Answering three enumerated questions in unbroken prose would read as evasion.
2. **798 words against a 400-word ceiling.** Q3 alone demands five separate data points. Cutting to 400 means
   dropping required answers. Char limit (5,000) is respected at 4,543.

**QC RUN 2026-09-02** once the agent roster refreshed. See QC LOG above. `expert-review-agent` pending on the
opening policy claim. Every number above was recomputed live.

---

Two things decide whether these angles ever run, and neither is the offer. Start with the income claim. A second paycheck without working a second job reads as an easy-money promise, and income-opportunity offers are among the most heavily enforced categories on Meta. Implied earnings outcomes draw flags in second person or third, so grammar will not save that one. Job security is the subtler one. Addressed to the reader it can read as a claim about their financial situation, which is a protected personal attribute, and moving it off the reader lowers the odds without guaranteeing anything. Both usually get solved the same way, by promising what the class teaches rather than what the viewer will earn. There is also a chance of landing in a restricted category, which costs you targeting. Cheaper to settle before launch than in appeals.

1. The Ad Pack is the right unit for the idea, but one ad set holding six creatives will not test six creatives fairly. Delivery concentrates on whichever wins the first few hundred impressions and the rest never accumulate enough data to judge. A fair test is not equal spend, it is enough conversions to separate a creative from noise.

What I would change is separating the testing surface from the scaling one. New creatives enter a test campaign with its own budget, where they cannot cannibalize spend that is already working. Winners graduate into a consolidated scaling campaign that keeps running and is not reset without cause, fatigue being the cause that counts.

Judge the pack before the creative, since with one idea per pack the pack is the experiment and a weak creative inside a winning angle is a production problem, not an angle problem.

2. Pixel and CAPI setup and troubleshooting, yes. The break I find most often is both feeds firing the same event without a shared event ID, so nothing deduplicates. Meta counts roughly double, cost per registration looks excellent, and the account spends a month learning from an audience that did not exist. On live accounts we keep pixel verification as a standing weekly item, because breaks surface there about a week before they surface in cost per lead.

For your funnel the event that matters is not the registration. Meta optimizes toward whatever you send back, and if that is the signup it will get very good at finding people who register and never attend. Sending attendance back, then purchase, is what moves cost per customer. Two conditions. The deeper event has to fire often enough weekly to keep ad sets out of learning, so it gets staged, not switched on in week one, and the click to purchase lag has to sit inside your attribution window or the credit never lands. One thing straight: on deep server side builds we have worked alongside a specialist rather than owning that stack end to end.

ChatGPT Ads, yes, since June 7 across three accounts. Small money. Close to three months in and $1,626 spent, the platform has reported zero conversions back to us and every campaign has run on click bidding. So no, we have not gotten conversion data flowing back there, and I would not judge it against Meta on CAC yet. It gets read through UTMs and downstream revenue, as a fixed carve. Our numbers so far are a $52.39 CPM, $3.69 CPC and 1.42% CTR, on dental and one experience brand, so order of magnitude only.

3. Largest monthly Meta budget on our book is one account running just under $100,000 a month for the last twelve months, peak month $114,586. Elective healthcare.

The one that answers your question better is a dental implant group we ran on Meta from April to July, where the KPI was blended cost per lead into a call center. Started near $1,000 a day, pushed to about $1,206, and cost per lead went from $18.74 to $29.85. The pullback after that was a capacity decision, not a cost one. Leads fed a call center that could not work them fast enough, so we cut to roughly $590 a day and then $484, and cost per lead came back to $25.48 and then $20.06. Twelve weeks, $64,747 spent, 2,558 leads, $25.31 blended.

How those calls get made: trailing seven days against the prior seven, never day over day, and only acting when the change beats that account's own weekly noise. Increases in 20 to 30% steps so learning does not reset. Two cut triggers. One is marginal cost per lead on the added spend rather than blended, because blended hides a bad increment for weeks. The other is whether what sits downstream can absorb the volume, which on your funnel is the masterclass itself.

One flag on the 30 days. It is enough to prove tracking and find the angle that works, but not enough to read CAC, since week four registrations have not finished buying. Better to treat it as tracking plus angle discovery and let the revenue read land after.

Two things before I could size this. Where are the ads running, and what monthly range are you considering for spend?
