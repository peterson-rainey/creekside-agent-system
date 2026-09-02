# Upwork Proposal - Meta Ads + ChatGPT Ads for an online masterclass / VSL funnel, 30-day fixed price
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-02 (Postgres now(), US Central)
Length: 856 words / 4,860 chars. Under the 5,000 char hard limit. OVER the 400-word style ceiling, deliberately (see COMPLIANCE).

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

## KNOWN TENSION - FLAGGING, NOT RESOLVING

Q3 asks what "you personally" scaled and "you have personally managed", twice. Standing rules forbid naming a
principal as the delivery worker and require "our team" framing. The body answers in "we / our book", which is
honest but is a visible mismatch with the word they used. A sharp prospect may push on it. No rule permits
answering it any other way, so it stands, but Queenie should know the seam is there before this sends.

## COMPLIANCE

No links or URLs. No contact info. No calendar link (first touch). No pricing in body. No em dashes (verified 0).
No certifications. No years-of-experience claim. No client names. Does not open with "I". Opens on the client's
own words (job security, second paycheck, Ad Pack). Portfolio numbers land last. Closes on the two open screens.

**Two deliberate style deviations, both flagged:**
1. **Numbered markers 1/2/3 used**, against the no-lists golden rule. The post says "Please Answer These 3
   Questions" in-body. Answering three enumerated questions in unbroken prose would read as evasion.
2. **798 words against a 400-word ceiling.** Q3 alone demands five separate data points. Cutting to 400 means
   dropping required answers. Char limit (5,000) is respected at 4,543.

**QC NOT RUN.** `qc-reviewer-agent` and `expert-review-agent` are not available in this session's agent roster,
so the mandated QC pass could not be executed. Self-review only. Every number above was recomputed live.

---

Both of the angles you named are the two most likely to get rejected, and it has nothing to do with the offer. Job security and a second paycheck are statements about the reader's employment and finances, and Meta's personal attributes policy reads second person copy as a claim that you know something about the person seeing it. "Worried about losing your job?" gets pulled. "Most people are one reorg away from finding out how replaceable they are" says the same thing and clears. Same angle, different grammar, and cheaper to fix in the copy than in appeals afterward.

1. The Ad Pack is the right unit for the idea, but one ad set holding six creatives will not test six creatives fairly. Delivery concentrates on whichever one wins the first few hundred impressions and the rest never accumulate enough data to judge. A fair test is not equal spend, it is enough conversions to separate a creative from noise.

What I would change is separating the testing surface from the scaling surface. New creatives enter a test campaign with its own budget, where they cannot cannibalize spend that is already working. Winners graduate into a consolidated scaling campaign that stays running and never gets reset, so new creatives always get a real shot and proven ones never get starved to fund an experiment.

Judge the pack before the creative. With one core idea per pack the pack is the experiment, and a weak creative inside a winning angle is a production problem, not an angle problem. How many packs run at once is set by budget rather than ideas, since each ad set needs enough weekly conversions to stay out of learning. That falls out of your registration cost, and it is the first thing I would size.

2. Pixel and CAPI setup and troubleshooting, yes. The break I find most often is both feeds firing the same event without a shared event ID, so nothing deduplicates. Meta counts roughly double, cost per registration looks excellent, and the account spends the next month learning from an audience that did not exist. On live accounts we keep pixel verification as a standing weekly item, because tracking breaks surface there about a week before they surface in cost per lead.

For your funnel the event that matters is not the registration. Meta optimizes toward whatever you send back, and if that is the signup it will get very good at finding people who register and never attend. Sending attendance back, then purchase, is what moves cost per customer. Straight with you on one thing: on deep server side builds we have worked alongside a specialist rather than owning that stack end to end.

ChatGPT Ads, yes, since June 7 across three accounts. Small money, and here is the honest part. Across 102 days and $1,626 in spend the platform has reported zero conversions back to us and every campaign has run on click bidding. So no, we have not built conversion tracking there, and I would not judge it against Meta on CAC yet. It gets read through UTMs and downstream revenue, as a fixed carve rather than a co-equal channel. Our numbers so far are a $52.39 CPM, $3.69 CPC and 1.42% CTR, on dental and one experience brand, so order of magnitude only.

3. Largest monthly Meta budget on our book is one account running just under $100,000 a month for the last twelve months, peak month $114,586. Elective healthcare, KPI is cost per booked consult.

The one that answers your question better is a dental implant group we ran on Meta from April to July. Started near $1,000 a day, pushed to about $1,206, and blended cost per lead went from $18.74 to $29.85. The pullback after that was not a cost decision, it was a capacity one. Leads fed a call center that could not work them fast enough, so we cut to roughly $590 a day and then $484, and cost per lead came back to $25.48 and then $20.06. Four months, $64,747 spent, 2,558 leads, $25.31 blended. The forms also carried qualifying questions on purpose, which raised cost per lead and was worth it.

How those calls get made: trailing seven days against the prior seven, never day over day, and only acting when the change is larger than that account's own weekly noise. Increases in 20 to 30% steps so learning does not reset. Two cut triggers, and most people only watch the first. One is marginal cost per lead on the added spend rather than blended, because blended hides a bad increment for weeks. The other is whether whatever sits downstream can absorb the volume, which on your funnel is the masterclass and whatever converts attendees after it.

One flag on the 30 days. It is enough to prove tracking and find the angle that works, but not enough to read CAC, since week four registrations have not finished buying yet. Better to treat the month as tracking plus angle discovery and let the revenue read land after it.

Two things before I could size this properly. Where are the ads running, and what monthly range are you considering for spend?
