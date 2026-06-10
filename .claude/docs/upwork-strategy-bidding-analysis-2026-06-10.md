# Upwork Outreach Strategy — Bidding & Proposal Analysis

**Source session:** 2026-06-10 deep analysis (3,741 applications, Mar 2025 – Jun 2026)
**Status:** Standalone doc, to be merged with parallel strategy doc from second session.

All findings below meet the significance standard unless marked otherwise: month-stratified (inverse-variance weighted) two-proportion z-test, p < 0.05 on a business outcome (reply or call), plus month sign-test record. "Months X-Y" = months won vs lost in within-month comparison.

**Baseline (all-time):** 26.7% view, 13.2% reply, 5.2% call, 36 won.
**Data caveat:** raw DB messaged/sales_call/won undercount ~40% — all numbers here use the ClickUp enrichment join.

---

## 1. Job Selection Rules (pre-apply)

### Hard skips
| Rule | Evidence |
|---|---|
| **20+ proposals** (the "20 to 50" band and up) | Strongest finding in dataset: props <20 vs 20+ wins 13 of 14 months, +7.9pts reply pooled. 20-50 band: 9.6% reply / 3.5% call / 2 wins in 456 apps. At 20+ props the US edge vanishes and rate does not rescue ("saturation dominates rate"). |
| **50+ proposals** — exception: (no rate listed OR max ≥$80) AND connects ≤12 | 50+ overall: 6.8% reply, 2 wins / 822. The exception cell holds baseline performance: 10.4% reply, 5.2% call, 2 wins on n=77 — both 50+ wins live there. |
| **Avg competitor bid <$40** (the "Avg" in the bid range panel) | Bargain-hunter pools: nothing works there, including discounting our rate (month-validated 4-0, +16.2pts for skipping). NOTE: sheet col AS "avg hourly rate" IS this avg bid, not client history. |
| **Low bid <$10** (the "Low" in the bid range panel) — NEW 2026-06-10 | View -17.9pts (z=-5.99, **loses 0-12 months**), reply -7.0pts (z=-3.20, p=0.0007, 2-10). Independent of avg-bid pool: inside the good $40-90 pool, low<$10 still drops view 35.8→21.1, reply 17.5→12.4. Signals race-to-bottom flood. Replicated on fresh sheet pull. |
| **Worldwide (no US-only requirement)** — exception: <10 proposals | US-only req: 14.6% reply / 6.0% call vs worldwide 9.3% / 2.4% (post-era 6.5% / 1.6%). 11-1 months, +6.1pts. `local_market_only` beats client country as the geo signal. Exception verified: worldwide & <10 props = 14.9% reply / 5.4% call / 5 wins (n=423). |
| **Min ≤$10/hr AND max $20-40** | 6.9% reply, 1.1% call, 0 wins (n=87). Do NOT extend to max $60+ (11.4%/4.4%, near baseline — tested and rejected 2026-06-10). Min ≤$10 & max $40-60 is actually a top cell (20.9% reply). |

### Soft skips / cautions
| Rule | Evidence |
|---|---|
| Stealth fixed-price: max ≥$150 with no min (or min=0/min=max) | Actually a fixed job regardless of label. Dead 65.6% vs 40.7%; view 21.8% vs 32.1% for real $150+ hourly. |
| High bid $200+ on hourly display | Reply -4.8pts, p=0.03, months 3-8 — does NOT survive multiple-comparison correction; mostly overlaps stealth-fixed (project-total bids). Caution, not a rule. |
| Full-time + project length <6 months — exception: <10 proposals | Weak: 11.2% reply, 3.7% call, **0 wins in 356**, vs 13.2/5.2 baseline. Keep as low-priority filter. |
| Hist-$90+ avg-bid pools | Predicts non-opening (+30.2pts dead, 4-0 months) but FAILS significance on reply (p=0.24). Do not cut on this alone. |

### Green lights (explicitly OK or positive)
- **"No agencies" language = POSITIVE.** Best-closing segment: 2-3 wins in ~45 apps (Conor Perrin, Joseph Adler, likely Waseem Ballou — his job_description row is a known scrape dupe), ~5-8x baseline win rate, p≈0.02. Red flag removed from upwork-proposal-agent 2026-06-10 (commit 13cd23c).
- **Urgent/ASAP language = fine.** Wins: Tony Amato, Isvik Dhillon.
- **No rate listed = GOOD.** 15.1% reply, 18 of 36 all-time wins. This regressed once before (fixed 2026-04-10) — never filter these out.
- **Tight-budget language in description = fine** (contrarian scan).
- **Short descriptions (<200 chars) = NOT a flag** (3.3% vs 5.2% call, p=0.34; platform data shows clients message normally).
- **"Not sure" hours-per-week / NOT_SURE engagement = best repliers** (19-20%). Undecided clients are open to being sold.

### Timing
- **Apply ASAP — but only because it catches jobs while proposal count is low.** Within proposal bands, timing has no effect (props<20 & 12-24h: 16.1% reply, 10.7% call, 3 wins, n=112).
- Recovery in raw timing curve is at 6-12h (12.6% reply), not 24h. The 1-6h trough (6.7%) is selection, not causation.
- **">24h" rules are untestable** — only 3-6 applications ever made that late. Do not write rules about waiting 24h.
- Rule for Queenie: proposal count decides, not the clock. <20 props is fine at any age.

### Bid positioning
- **Keep the rate at $90+. Never discount into cheap pools.** Bidding $90+ in $40-90 avg-bid pools is the best cell (17.6-20.8% reply). In <$40 pools, lowering the bid still loses (10.5% at ≤$74). Month-validated 4-0.
- Bid-to-avg ratio (>1.6x, >2.5x) findings were mostly proxying cheap pools — use the pool floor, not ratios.

### Economics
- US + ≤20 props costs ~84 connects per reply vs 285 (20+ props) and 192 (worldwide). Filtering to US + ≤20 props + ≤6h keeps 33% of replies on 21% of connect spend.
- Red-flag score (props50+, rate125+, worldwide, hist90+, eng_none): 0 flags = 17.6% reply / 6.3% call; 2+ flags = ~7% / 2%. Cutting 2+ flags drops 27% of volume / ~30% of connects for ~0.8 calls/month lost.

---

## 2. Activity Panel Signals (NEW 2026-06-10)

From the "Activity on this job" + "Bid range" UI panel:

| Field | Verdict |
|---|---|
| Proposals | #1 signal (see above) |
| Bid range **Avg** | Pool quality: $40-90 sweet spot, <$40 skip |
| Bid range **Low** | NEW hard skip at <$10 (see above) |
| Bid range **High** | $200+ caution only (stealth-fixed overlap) |
| **Avg interviewed bid** | NEW — strongest conditional signal in dataset (below) |
| Interviewing count | Unusable from our data (final-state snapshot, mechanically confounded). Plausible-but-untested: 12+ hrs old + 20+ props + Interviewing: 0 = ghost-job signature. |
| Invites sent | Not significant (11+ invites +31%, p=0.26) |
| Unanswered invites | No signal |

### Avg Interviewed Bid (sheet col BJ / API avgInterviewedRateBid)
| Band | Apps | View% | Reply% | Call% |
|---|---|---|---|---|
| <$40 | 177 | 19.2 | **8.5** | 2.3 |
| $40-60 | 163 | 43.6 | 21.5 | 6.1 |
| **$60-90** | 149 | **47.0** | **30.9** | **11.4** |
| $90-150 | 28 | 42.9 | 21.4 | 3.6 |

$40-90 vs <$40 month-stratified: view +27.3pts (z=5.97, 11-0), reply +15.3pts (z=4.28, 10-1), **call +6.2pts (z=2.66, p=0.004, 8-2)** — passes on CALL, which almost nothing does.

Interpretation: shows who the client is actually considering. Interviewing $60-90 people = we're in the consideration set. Interviewing <$40 people = they hire cheap and won't reply even though engaged.

Caveats: only exists once the client interviews someone (n=574); our DB value is a post-close snapshot.

Uses:
1. **Late applies (6+ hrs):** if interviews are underway, the number is live in the UI. <$40 = hard skip; $40-90 = strong green.
2. **Follow-up triage:** $60-90 = priority follow-up list (11.4% call); <$40 = write off.

---

## 3. Proposal Content Rules

### Opening containment is the #1 controllable lever
First 1-2 sentences reusing the client's own content words from the job description:
- **+9.6pts view (z=5.38, 10-0 months), +6.0pts reply (z=4.51)** — survives cross-control within full-letter overlap strata (+6.4/+6.7pts)
- 6-month window: holds (+9.4pts, z=4.48, 7-0); opening-high = 9 of 12 recent wins
- Worst cell (generic opening + generic letter): **n=710 recent, 19.9% view, 8.0% reply, 0 wins — 40% of recent volume**
- It's the OPENING, not the whole letter: full-letter overlap effect is carried by the first 2 sentences

### Rules now baked into upwork-proposal-agent (commits a7c6bf5 + 13cd23c, 2026-06-10)
1. Open with the client's own specific nouns/phrases from the JD
2. Never begin with "I"
3. No links/URLs anywhere
4. 250-word floor (strategic 250-350, up to 400 multi-question; v2 never under 250)
5. case_study_strategy mode INACTIVE (ran at half performance: 10.3% view, 0 wins, n=58)
6. "NO AGENCIES WANTED" red flag REMOVED from fit check

### Script performance (9mo, month-controlled where possible)
| Script | Apps | View% | Reply% | Won |
|---|---|---|---|---|
| strategic | 1,716 | 28.6 | 14.3 | 10 |
| strategic_exp | 211 | 29.4 | 12.3 | 1 |
| claude V2 | 369 | 25.7 | 12.2 | 4 |
| **case study + strategy** | 58 | **10.3** | 8.6 | **0** |

V2 vs strategic head-to-head (Mar-Apr): no significant difference. Script choice among the live three is NOT a significant lever — the opening style is.

### Compliance drift (root cause of recent decline)
- May shipped proposals: 10.3% "I" openers, 6.5% contained links, opening containment 0.175 (vs 0.245 Feb); June fell to 0.118
- Cause: "claude V2" usage stopped after April; May/June ran strategic + case-study only
- The 2026-06-10 agent update enforces the rules in all active modes

### AI-saturation watch
- Mirroring effect is NOT decaying (monthly view effect Sep -1.2 → Jun +15.6, slope +0.4pts/mo)
- But platform-wide open rate fell 27.2% → 14.9% (Sep'25 → May'26) at flat ~45 proposals/job — clients skim harder
- **Trigger:** if monthly opening-containment view effect runs <+3pts for 2-3 consecutive months, rotate strategy from mirroring to diagnosing (comprehension signals survive saturation; parroting does not). May was +3.4 — watch it.

---

## 4. Post-Apply Triage (Freelancer Plus funnel, n=1,355)

- Open-rate gradient: 0% open → 1.1% reply; <10% → 5.1%; 20-50% → 18.0%; 50%+ → 28.4% reply / 14.2% call
- **open<10% AND client messaged nobody = 0.0% reply on n=249** — absolute write-off
- Ghost jobs (opens ≥10%, messaged nobody): 7.6% reply, 1.1% call, 0 wins — replies never convert; deprioritize follow-up
- Reply→call stable ~39% both eras; May'26 dipped to 21.9% (deliberate call-declining below minimums, not job quality)

---

## 5. Myths / Tested Non-Signals

Do NOT build rules on these:
- Script choice among live modes (p=0.26) | fixed vs hourly | intermediate vs expert | rate bracket per se | cover-letter length (pre-era effect GONE post-era) | invites_sent | proposal velocity (props/hr) | payment_verified (data artifact — no real False rows) | short job descriptions | Expert/Guru title words | hist-rate missing (slightly BETTER than recorded)
- **Boost:** reply-neutral within-month (1-1, -0.6pts; the earlier "boost hurts" was month-mix confounding). Still skip on cost grounds — pays extra for no reply lift.
- **Qualifying questions: REGIME-FLIPPED.** 2+ questions dominant Aug'25-Feb'26, REVERSED Mar-May'26. Do not use either way until answer quality post-Queenie is investigated.

---

## 6. Queenie's Screening Rundown (finalized 2026-06-10)

1. Apply ASAP. If a job is found late, proposal count decides — <20 proposals is fine at any age. (Dropped: "wait 24hrs" — no data behind it.)
2. No boosting.
3. US-only-required jobs only, unless <10 proposals.
4. Skip 50+ proposals unless (no rate listed OR max ≥$80) AND connects ≤12. Apply the same exception bar to the 20-50 band.
5. Skip full-time + <6 months project length, unless <10 proposals.
6. Skip min ≤$10/hr with max $20-40. ($60+ leg dropped — not supported.)
7. Skip jobs with bid-range Low <$10.
8. Skip avg-bid pools <$40; never lower our rate to match.
9. Stealth fixed (max ≥$150, no min) = treat as fixed price, extra scrutiny.
10. Urgent/ASAP and no-agencies language: apply normally (no-agencies is a positive).
11. No-rate-listed jobs are good — always eligible.
12. Late applies: if interviewing is underway, check avg interviewed bid — <$40 hard skip, $40-90 strong green.
13. Proposal modes: strategic or v2 only; case study + strategy retired.

---

## 7. Platform & Competitive Benchmarks

### Our Performance vs Platform Average (same 1,410 jobs with Freelancer Plus data)
- Our view rate: 26.2% vs platform 16.8% (1.56x)
- Our reply rate: 13.7% vs platform 6.8% (2.01x)
- Our call rate: 5.0% vs platform shortlist 4.6% (1.09x)

### Platform-Wide Trends (monthly)
| Month | Platform Open Rate | Platform Msg Rate | Avg Props/Job |
|---|---|---|---|
| Sep '25 | 25.7% | 8.7% | 46 |
| Oct '25 | 22.4% | 9.1% | 45 |
| Jan '26 | 23.9% | 7.7% | 50 |
| Mar '26 | 16.5% | 5.6% | 47 |
| May '26 | 14.9% | 5.4% | 40 |

Client engagement declining platform-wide at stable proposal volume. Not Creekside-specific.

---

## 8. Min Rate + Max Rate 2D Matrix (last 6 months, view% included)

Best viewed as a heatmap. View% matters because it precedes reply.

| Min / Max | View% | Reply% | Call% | Apps | Signal |
|---|---|---|---|---|---|
| **$41-55 / $61-80** | 34.2% | **23.7%** | **13.2%** | 38 | BEST -- tight realistic range |
| $56+ / $81-100 | 42.3% | 23.1% | 7.7% | 26 | High quality |
| $41-55 / $81-100 | **35.4%** | **19.8%** | 6.3% | **96** | Volume sweet spot |
| $41-55 / $140+ | 50.0% | 16.7% | 4.2% | 24 | High views, lower conversion |
| $11-20 / $61-80 | 30.0% | 17.5% | 7.5% | 40 | Good |
| $21-30 / $41-60 | 33.3% | 11.5% | 5.8% | 156 | Average, highest win count |
| $0-10 / $81-100 | 21.7% | **0.0%** | 0.0% | 23 | DEAD -- wide spread, skip |
| $0-10 / $0-40 | 17.7% | 8.9% | 1.3% | 79 | Cheap client, cheap job |
| $31-40 / $61-80 | 34.4% | 6.3% | 0.0% | 32 | Trap -- high views, no replies |

Rate spread (max - min) itself is a signal: tight = client knows what they want. Wide = window shopping.

---

## 9. Invites Sent Signal (NEW -- counterintuitive)

| Invites Sent | Apps | Reply% | Call% | Won |
|---|---|---|---|---|
| **11+** | 154 | **24.7%** | 5.8% | 1 |
| 6-10 | 111 | 16.2% | 4.5% | 1 |
| 0 | 719 | 12.7% | 5.4% | 4 |
| 1-2 | 150 | 11.3% | 4.0% | 2 |
| **3-5** | 131 | **9.2%** | 4.6% | **0** |

11+ invites = active buyer shopping broadly. 3-5 = invited specific people, ignoring cold proposals. Contradicts the earlier zero-opens analysis -- the zero-open correlation with high invites was confounded by job saturation.

---

## 10. Upwork Recommendations Signal

| Recs | Apps | Reply% | Call% | Won |
|---|---|---|---|---|
| 0 recs | 901 | 14.3% | **6.0%** | **7** |
| 1-5 recs | 234 | 15.4% | 3.4% | 1 |
| **6+ recs** | 130 | **8.5%** | **2.3%** | **0** |

When Upwork recommends 6+ freelancers, reply drops to 8.5% and 0 wins. Client gets flooded with handpicked suggestions.

---

## 11. Connect Cost Signal

| Connects | Apps (3mo) | Reply% | Call% | Won |
|---|---|---|---|---|
| **9-12** | 195 | **13.8%** | 4.6% | **2** |
| 5-8 | 121 | 10.7% | 5.8% | 1 |
| 13-16 | 183 | 10.9% | 5.5% | 0 |
| 17-20 | 249 | 8.4% | 3.2% | 0 |
| **21+** | 78 | **6.1%** | 2.6% | **0** |

9-12 is the sweet spot. 21+ = Upwork's signal the job is saturated. Skip.

---

## 12. US-Only Requirement vs Client Location (2x2 matrix)

| Requirement | Client Location | Apps | Reply% | Call% | Won |
|---|---|---|---|---|---|
| **US-only** | CA/UK/AU client | 27 | **18.5%** | 3.7% | 0 |
| **US-only** | US client | 642 | **15.4%** | **6.9%** | **5** |
| Worldwide | US client | 31 | 12.9% | **0.0%** | 0 |
| Worldwide | CA/UK/AU client | 111 | 9.9% | 1.8% | 1 |
| Worldwide | other client | 119 | 9.2% | 1.7% | 0 |

Filter on the REQUIREMENT, not the location. A Canadian client who requires US-only (18.5%) beats a US client who sets worldwide (12.9%, 0% call).

---

## 13. Fixed Price Job Details

### Fixed vs Hourly Overall
- Fixed: 520 apps, 15.2% reply, 5.8% call, 3 won, $39/call
- Hourly: 3,521 apps, 18.1% reply, 6.9% call, 55 won, $30/call
- ~30% less efficient but not a hard skip

### Fixed $500-2,500 (the main band): Dead Job Signals
- Zero opens on 41-44% of jobs in this range
- Dead jobs: 64% non-US clients (vs 44% on active), 37.5% full-time (vs 0% on active), 27% under-1-month (vs 21%)
- Full-time + fixed $500-2,500 = 100% dark -- zero opens across all
- Short duration + worldwide + fixed = hard skip

---

## 14. Queenie Transition Decomposition

### View Rate Drop: 33.2% -> 22.2% (11 points)
- Composition (more crowded jobs): 4.8 points (44%)
- Within-band decline: 6.2 points (56%)

### Competition Shift
- Pre: median 5 proposals, 52% had <=5
- Post: median 15 proposals, only 26% had <=5
- Volume increase = applying to harder jobs, not more of the same

### Within-Band Drop by Period
| Band | Pre | Post (pre-JSS) | Post (post-JSS) |
|---|---|---|---|
| 1-5 props | 39.3% | 35.2% | 31.2% |
| 6-10 props | 32.8% | 27.6% | 23.4% |
| 11+ props | 22.2% | 17.3% | 15.7% |

Gradual, all-band decline = platform-wide, not Queenie-specific.

---

## 15. Change Log Impact Analysis

| Date | Change | Observed Impact |
|---|---|---|
| 2025-12-24 | Rate dropped to $73 | Jan 26 week hit 31% reply (all-time high) |
| 2026-02-16 | Queenie took over | Immediate drop: 11.6% reply first week |
| 2026-04-03 | Rate $5 above max + JSS 96% | Apr 13 spiked to 20.2% (best post-Queenie week) |
| 2026-04-10 | Fixed no-rate job gap | Combined with rate change, brief improvement |
| 2026-04-22 | Case study proposal | 8.7% reply, sustained downturn. Half the performance. |
| 2026-05-04 | (no change) | 2.5% reply -- worst week ever |
| 2026-05-11 | Started boosting | Didn't help |
| 2026-06-09 | Boosting discontinued | Per data analysis |

---

## 16. Conversation-Extracted Rules (309 conversations + Fathom transcripts)

### Budget Routing
- $5K/month minimum per platform (Cade/Peterson)
- $3K/month minimum for Google Ads-only
- Under $1,500/month: disqualify entirely
- $1,500-$5K: route to Baran
- Cade requires $5K/month guaranteed for 3 months
- Non-USD clients need $10-20K USD minimum

### Pricing
- $75/hr minimum on proposals regardless of posted budget
- Consulting: $250/hr
- Management: $1,500/mo minimum per platform, 20% of spend up to $30K
- Audit: $400 per platform

### Communication
- Ask about ad spend before booking calls
- Don't volunteer pricing unprompted
- Send calendar immediately when lead wants a call
- Never offer pre-call work
- 5-minute reply target
- On Upwork, Samuel is an individual expert (don't reveal team unprompted)

---

## 17. Data Infrastructure

### Automated Pipelines
- Daily client stats sync: `scripts/upwork_client_stats_sync.py` (5 PM launchd)
- Conversation sync: `~/upwork-api/sync_conversations.py` (hourly launchd)
- Token refresh: `~/upwork-api/refresh.py` (12-hour launchd)

### Database Tables
- `upwork_jobs`: 4,012 rows, master table (87 columns)
- `upwork_leads`: ClickUp lead pipeline
- `upwork_conversations`: 309 conversations, 3,056 messages

### Spreadsheet
- 75 columns (A through BW), synced from DB
- BT-BW added this session: Invites Sent, Required Hours Worked, Client Country, Avg Interviewed Bid

### Critical: Enrichment Query
Raw DB messaged/sales_call/won undercount by ~40%. All analysis must use the ClickUp enrichment join. See `memory/upwork_data_analysis.md` for the query.

---

## 18. Planned: Exhaustive 2-Way / 3-Way Interaction Scan (BLOCKED on client-data backfill)

**Goal:** once client variables are backfilled, scan ALL variable pairs and triples for combinations that show a distinct, significant DECREASE in performance (skip-rule mining).

**Blocked on:** manual UI backfill of client-profile fields that exist nowhere in the API and were never recorded (0% historical fill): client avg hourly rate paid, hours paid, member since, active hires, open jobs, hire rate, rating, # reviews, jobs posted, total spent. (`scripts/upwork_client_stats_sync.py` auto-captures rating/reviews/jobs-posted/spent/hires going forward, but only for OPEN jobs at sync time — historical rows need the manual UI pass.)

**Backfill caveat to resolve first:** values captured from the UI today are CURRENT client stats, not stats at apply time. Fine for slow-moving fields (member since, rating, jobs posted), distorted for fast-moving ones (active hires, open jobs, total spent on long-running clients). Record the capture date alongside each backfilled row.

**Method spec (so either session can execute):**
1. Bin every variable to 3-5 levels; include established singles (props band, US-only req, avg-bid pool, low bid, rate structure, connect cost, invites, recs, engagement type, duration) plus the new client fields
2. For every pair/triple: month-stratified inverse-variance pooled z on REPLY (primary) and CALL (confirmatory) vs the complement population
3. Minimum cell n ≈ 80-100; smaller cells reported as "insufficient n," never as findings
4. Multiple-comparison control is mandatory: thousands of hypotheses → Benjamini-Hochberg FDR (q=0.05); hard skip rules additionally require Bonferroni survival or a clean month sign-test record. Everything else goes to a "needs fresh-month confirmation" watch list
5. An interaction only counts if it BEATS its best single-variable component (the pair must be worse than either variable alone predicts) — otherwise it's the single restated
6. Report in standard format: Segment | Apps | View% | Reply% | Call% | Won, with month record
7. Rank final skip-rule candidates by economics: connects saved vs replies/calls lost (per Section 1 pattern)

---

## 19. Open Items

- Interviewing-at-apply-time signal untested (ghost-job signature) — would need capturing the panel value at apply
- Qualifying-questions regime flip — investigate answer quality post-Queenie
- `competitor_avg_earned` 100% NULL in DB (sheet col exists; sync drops it)
- Client-profile UI fields never recorded (rating, reviews, hire rate, open jobs, member since…) — now partially auto-captured by `scripts/upwork_client_stats_sync.py` (daily 5 PM) for open jobs going forward
- Webapp at ~/upwork-proposal-generator/ is downgraded; uncommitted edits there are moot
