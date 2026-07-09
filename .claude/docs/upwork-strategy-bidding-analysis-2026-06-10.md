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
| **Payment method Unverified** (client About panel) — NEW 2026-07-09 | 0 wins, 0 calls, 2 replies in 94 apps (2.1% reply, 13.8% view), loses 0-4 months. Not a new-account proxy (new accounts overall reply 10.0%). Keyed to the UI panel value (sheet col AJ), NOT the API boolean. See Section 22. |

### Soft skips / cautions
| Rule | Evidence |
|---|---|
| Stealth fixed-price: max ≥$150 with no min (or min=0/min=max) | Actually a fixed job regardless of label. Dead 65.6% vs 40.7%; view 21.8% vs 32.1% for real $150+ hourly. |
| High bid $200+ on hourly display | Reply -4.8pts, p=0.03, months 3-8 — does NOT survive multiple-comparison correction; mostly overlaps stealth-fixed (project-total bids). Caution, not a rule. |
| Full-time + project length <6 months — exception: <10 proposals | Weak: 11.2% reply, 3.7% call, **0 wins in 356**, vs 13.2/5.2 baseline. Keep as low-priority filter. |
| Hist-$90+ avg-bid pools | Predicts non-opening (+30.2pts dead, 4-0 months) but FAILS significance on reply (p=0.24). Do not cut on this alone. |
| Hire rate 90%+ AND (20+ proposals OR non-US client) — NEW 2026-07-09 | 3.7-4.0% reply, 0 wins (n=164/224). Bonferroni-survivor. Confirm on a fresh month before hard-coding. Hire 90%+ alone is watch-list only (z=-2.40, 1-6). |
| 50+ client reviews AND 20+ proposals — NEW 2026-07-09 | 3.3% reply, 0 wins (n=150). Bonferroni-survivor. Confirm on a fresh month. Reviews 50+ ALONE is NOT a skip (fails multiple-comparison correction). |

### Green lights (explicitly OK or positive)
- **"No agencies" language = POSITIVE.** Best-closing segment: 2-3 wins in ~45 apps (Conor Perrin, Joseph Adler, likely Waseem Ballou — his job_description row is a known scrape dupe), ~5-8x baseline win rate, p≈0.02. Red flag removed from upwork-proposal-agent 2026-06-10 (commit 13cd23c).
- **Urgent/ASAP language = fine.** Wins: Tony Amato, Isvik Dhillon.
- **No rate listed = GOOD.** 15.1% reply, 18 of 36 all-time wins. This regressed once before (fixed 2026-04-10) — never filter these out.
- **Tight-budget language in description = fine** (contrarian scan).
- **Short descriptions (<200 chars) = NOT a flag** (3.3% vs 5.2% call, p=0.34; platform data shows clients message normally).
- **"Not sure" hours-per-week / NOT_SURE engagement = best repliers** (19-20%). Undecided clients are open to being sold.
- **3+ screening questions = PRIORITIZE** — NEW 2026-07-09. Within <20 props: 44.4% view / 19.7% reply / 3 wins (n=178) vs 30.7/15.3 for 0 questions. View z=+3.26 (borderline Bonferroni), 7-0 months. NOT a low-competition proxy. Never skip a job because it has questions. See Section 23.
- **"Cover letter not required" = PRIORITIZE, not spam** — NEW 2026-07-09. Within <20 props: 40.2% view / 19.3% reply / 5 wins (n=257) vs 31.4/15.4 when required. 7-0 months (sub-Bonferroni — prioritization, not a rule). See Section 23.
- **90+ JSS requirement = fine, slightly positive** — NEW 2026-07-09. 34.6% view / 14.9% reply (n=208). We qualify; the requirement filters weak competitors.

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
- Script choice among live modes (p=0.26) | fixed vs hourly | intermediate vs expert | rate bracket per se | cover-letter length (pre-era effect GONE post-era) | invites_sent | proposal velocity (props/hr) | payment_verified DB/API boolean (data artifact — no real False rows. NOTE 2026-07-09: the UI "Payment Method" panel value, sheet col AJ, IS a valid strong signal — see Section 22. API field and UI panel disagree on 62/94 unverified rows; the skip rule keys off the UI value, which is what's visible pre-apply) | short job descriptions | Expert/Guru title words | hist-rate missing (slightly BETTER than recorded)
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

## 9. Invites Sent Signal (RESOLVED 2026-06-10: watch list, not a rule)

| Invites Sent | Apps | Reply% | Call% | Won |
|---|---|---|---|---|
| **11+** | 154 | **24.7%** | 5.8% | 1 |
| 6-10 | 111 | 16.2% | 4.5% | 1 |
| 0 | 719 | 12.7% | 5.4% | 4 |
| 1-2 | 150 | 11.3% | 4.0% | 2 |
| **3-5** | 131 | **9.2%** | 4.6% | **0** |

11+ invites = active buyer shopping broadly. 3-5 = invited specific people, ignoring cold proposals.

**MERGE RESOLUTION (Peterson, 2026-06-10): the raw gradient above does NOT survive month stratification (11+ invites: +31% reply, p=0.26) and call rate is flat across all bands.** The raw spread is partly month-mix. Status: watch-list candidate for the Section 18 interaction scan — do not bid or skip on invites alone. The directional story (11+ = broad shopper, 3-5 = made their shortlist) remains plausible and worth re-testing with more data.

---

## 10. Upwork Recommendations Signal

| Recs | Apps | Reply% | Call% | Won |
|---|---|---|---|---|
| 0 recs | 901 | 14.3% | **6.0%** | **7** |
| 1-5 recs | 234 | 15.4% | 3.4% | 1 |
| **6+ recs** | 130 | **8.5%** | **2.3%** | **0** |

When Upwork recommends 6+ freelancers, reply drops to 8.5% and 0 wins. Client gets flooded with handpicked suggestions.

**UPDATE 2026-07-09 (Section 23 scan): direction confirmed, but capped at CAUTION.** In the Dec+ window: sheet-captured 6+ recs = 13.6% view / 8.5% reply / 0 wins (n=177); holds within <20-prop jobs. HOWEVER, the sheet value and DB `total_recommended` disagree on 23% of rows (381/1,680) — the count drifts after apply, so the at-apply value is unknowable from our data. Also unconfirmed whether the recommended count is even visible to Queenie pre-apply. Status: caution/deprioritize, NOT a skip rule.

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

**REVISED 2026-07-09 (full Dec+ window, n=2,415 non-boosted):** 17-20 connects is FINE (27.2% view / 12.8% reply / 7 wins, n=997) — the old 3-month dip was noise. The skip at **21+** stands (13.7% view / 7.4% reply / 0 wins, n=175). NEW: very cheap jobs (**≤8 connects**) also underperform (19.4% view / 9.0% reply, n=346) — Upwork prices connects by job value, so ultra-cheap = low-value post. Best range: 9-20.

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

## 16. Conversation-Extracted Rules (795 conversations + Fathom transcripts)

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

### Reply-to-Booking Analysis (2026-06-10, FULL dataset: 795 rooms, 9-month window n=524)
Backfilled all 486 missing rooms (DMs, invites, unmatched leads) + fixed 20-message truncation. 517 threads where the client replied; 22.8% booked.

**Booking-ask timing is the #1 lever (z=3.4):**
| When we proposed the call | Threads | Booked% | Won |
|---|---|---|---|
| Never proposed | 282 | 17.4% | 12 |
| Immediately (0 client msgs first) | 34 | 20.6% | 1 |
| **After 1 client msg** | **115** | **33.0%** | 4 |
| After 2+ client msgs | 86 | 27.9% | 4 |

**55% of replied threads never got a call proposal at all.** Failure modes of 399 lost threads: one-and-done 32%, fizzled-no-call-ask-ever 30%, engaged-after-ask 22%, explicit decline 10%, ghosted-at-ask 6%.

Confirmed at full scale:
- Baran/Baron referral threads book 7.1% vs 23.7% (z=2.0) — deliberate punts, expected
- 29 lost threads end on an unanswered client question
- 34 threads where the client wrote and we NEVER replied (11.8% booked, via other channels)

Debunked at full scale (were artifacts of the 309-room sample):
- First-reply latency: <1h = 25.4% vs >24h = 22.9% — no meaningful standalone effect; only total non-response hurts
- Ad-spend gate on hot leads: only 8 instances, no rate difference (25.0% vs 26.7%)

Era check: pre/post Queenie overall flat (23.6% vs 21.7%), but "ask after 1 client msg" converted 41.9% pre vs 22.6% post (z=2.2) — ask timing is right, ask execution post-era needs a read-through of those 53 threads.

**Rule for Queenie:** propose the call in our first reply after the client's first message. Always answer their question in the same message as the ask. Never leave a client question as the last message in a thread.

---

## 17. Data Infrastructure

### Automated Pipelines
- Daily client stats sync: `scripts/upwork_client_stats_sync.py` (5 PM launchd)
- Conversation sync: `~/upwork-api/sync_conversations.py` (hourly launchd) — REWRITTEN 2026-06-10 to room-first: pages full `roomList`, syncs any room that is new or has newer activity, fetches up to 500 stories per room (old version required clickup_task_id + api_proposal_id, used `proposalRoom`, missed ~60% of rooms, and truncated threads at 20 messages)
- Token refresh: `~/upwork-api/refresh.py` (12-hour launchd)

### Database Tables
- `upwork_jobs`: 4,012 rows, master table (87 columns)
- `upwork_leads`: ClickUp lead pipeline
- `upwork_conversations`: 795 conversations (ALL rooms incl. DMs/invites as of 2026-06-10 backfill); backfilled rows have NULL upwork_job_id/api_proposal_id — outcome matching for those is room_name → upwork_leads.lead_name

### Spreadsheet
- 75 columns (A through BW), synced from DB
- BT-BW added this session: Invites Sent, Required Hours Worked, Client Country, Avg Interviewed Bid

### Critical: Enrichment Query
Raw DB messaged/sales_call/won undercount by ~40%. All analysis must use the ClickUp enrichment join. See `memory/upwork_data_analysis.md` for the query.

### Win-count reconciliation (2026-06-10, FINAL — full re-verification against fresh DB enrichment)
Re-built the ClickUp enrichment fresh from the DB and diffed row-by-row against the analysis snapshot:
- **Zero outcome flips.** All 3,741 analyzed rows have identical e_msg/e_call/e_won in the fresh enrichment. No analysis in this doc used stale outcomes; nothing needs re-running.
- **The 36 vs 58 win gap is funnel scope, not accuracy.** Full DB = 4,041 rows / 58 wins. The 300 rows outside the analysis set are 135 Invites + 98 DMs + 56 Outreach + 11 untyped, carrying 22 wins (9 DM, 8 Invite, 4 untyped, 1 Outreach) and 80 calls. These are mostly INBOUND — a different funnel that never passes through job screening.
- **Correct usage:** bidding/screening rules must use the cold-outreach set (36 wins). Total-business win reporting uses the full enrichment (58). Never mix them. Only 1 outreach win sits outside the analysis set.
- ClickUp is the source of truth for ALL outcome fields (Peterson, 2026-06-10). The sheet's MESSAGED/SALES CALL/WON columns and pivot tabs are outdated — sheet lagged 9 ClickUp-confirmed wins at verification. Sheet remains authoritative only for apply-time INPUT fields. Saved as agent_knowledge correction `4184a8f8`.
- Data error found: one row has application_date 2026-11-15 (future date) — needs fixing in source.

---

## 18. Exhaustive 2-Way / 3-Way Interaction Scan (EXECUTED 2026-07-09 — results in Section 22; spec retained for method reference)

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

## 19. Lead Response Process Overhaul (Peterson directive, 2026-06-11)

Sent to Queenie and Cade. All changes apply immediately.

### Response Speed & Confidence Routing
- When confident about response: respond within 5 minutes. Still send the message + lead's context to Peterson/Cade for accuracy check.
- When less confident: run by Peterson or Cade first. If no response within 2 hours, send anyway.

### Call Booking (top priority)
- When lead is trying to book a call: book by any means necessary, ASAP
- If they ask about availability: send calendars + a few specific times same-day and next-day
- If they ask about same-day: check Cade/Peterson's calendar yourself, tell lead what's free, book it for them, notify Cade/Peterson via Google Chat
- If they send their own calendar: coordinate with Melvin or Cyndi to book ASAP on their calendar
- If they ask to book: keep the message SHORT. No AI slop when all they need is a calendar link.
- They do NOT need to confirm ad spend before booking. Route to Baran after if needed, but book first.

### Baran Positioning
- Position Baran as "our small business consultant" and "my partner" -- same level as Cade
- Cade = Meta Ads expert. Baran = small business expert.
- Never say "we have a minimum of $5K" as the reason for redirecting
- Stay in sales mode during the redirect -- position Baran as the best solution, not a handoff
- When unqualified: "My partner Baran specializes in helping businesses at your stage. He'd be the best person to talk to about this."

### Baran Redirect Follow-Up
- Still send a couple of follow-ups after redirecting to Baran (adjusted sequence, coordinated with Baran)
- Automation will email Queenie when a lead books through Baran's calendar
- If link sent but no booking: follow up next day
- If still no response: one more follow-up 2 days later
- If still nothing: move to lost follow-up, 60-day cycle
- If booking email received: move to Referred status

### Response Quality Rules
- Keep answers short to basic questions. Don't over-elaborate.
- Don't repeat the client's words back to them.
- Don't mirror their language unnecessarily.
- Answer direct questions directly -- first sentence is the answer.
- No filler phrases: "happy to share," "happy to walk through," "great question," "absolutely," "that's exactly"
- When asked about pricing: "Our pricing is performance-based and custom for every client. We'd need to hop on a call to give you accurate numbers."
- Confirmation messages: short and sweet ("Great, see you then.")
- No generic template messages -- use Claude to write everything
- Pre-call warmup messages must NOT ask questions already answered in the job description or conversation

### Follow-Up Cadence
- 1-2 days after last message
- 2 days later
- 2 days later
- 6 days later
- 1 week later
- Then every 60 days until they say stop, or 1 year, whichever first
- Don't repeat follow-ups -- each must be different
- Send follow-ups on ALL channels: Upwork, email, LinkedIn
- Connect with every prospect on LinkedIn via Cade and Peterson accounts

### AI Usage Rules
- Include the full job description AND entire conversation in every Claude prompt
- Use Opus with 1M token context window
- Open a new chat for every new conversation
- Rename chats to the lead name for reuse on multi-message threads
- Don't reupload everything -- reuse the same named chat

### Additional Response Rules (Peterson-approved, 2026-06-11)
1. First sentence of every response must BE the direct answer. No filler before it ("happy to share," "great question," "absolutely").
2. Never restate what the client just told you. If they described their setup, don't describe it back.
3. Remove the "we just wrapped a campaign for [your exact industry]" template entirely. If you have real experience, name the client or give a specific detail. If you don't, say so honestly.
4. When a client says "sure, tell me" or "send it over" -- deliver the actual information. Not a teaser, not a menu without numbers, not another CTA.
5. Double-check client names before sending. Three misspellings found in last 2 months.
6. "$10K Profit Recovery Audit" / "247-point checklist" -- maximum ONE mention per lead across the entire conversation. Never repeat it in follow-ups.
7. Pricing escalation flow when asked:
   - First: "Our pricing is performance-based and custom for every client. We'd need to hop on a call to give you accurate numbers."
   - If they push for specifics: Give the New Mason example -- "$2,000 retainer plus a percentage of ad spend bonus tied to hitting ROAS and spend goals. That client spends around $30K/month."
   - Then: "Every client's structure is different based on their situation. Want to hop on a call to figure out what makes sense? [calendar link]"

### Specific Corrections (from conversation audit)
- Joseph Nguyen: He asked detailed questions, we just sent a calendar link. Answer all questions THEN ask to book.
- Taylor Cyr: Same issue -- answer first, then route to call.
- Johnathan Flanagan: We turned him down based on ad spend instead of routing to Baran as the expert.
- Stan the Men: 60-day follow-up said "I guess the timing isn't right" -- makes no sense 2 months later. Each follow-up must provide value.

---

## 20. Conversation Audit Findings (2026-06-10/11)

### Drop-Off Analysis (155 conversations, Feb 14+)
| Reason | Count | % |
|---|---|---|
| Follow-ups ignored after engagement | 68 | 43.9% |
| Budget too low | 18 | 11.6% |
| Other (project paused, scam, tech) | 14 | 9.0% |
| Not a fit / we turned away | 13 | 8.4% |
| Went with someone else | 8 | 5.2% |
| Ghosted after $5K minimum | 7 | 4.5% |
| Just stopped (no reason) | 7 | 4.5% |
| Wanted freelancer/coaching | 6 | 3.9% |
| Calendar friction | 5 | 3.2% |
| Handoff confusion | 4 | 2.6% |
| Ghosted after budget question | 3 | 1.9% |
| Pricing model objection | 2 | 1.3% |

### Response Quality (last 3 months, correct timestamp ordering)
| Rating | Count | % |
|---|---|---|
| Appropriate | 64 | 47.8% |
| We didn't respond | 58 | 43.3% |
| AI slop | 4 | 3.0% |
| Formulaic | 2 | 1.5% |
| Can't tell | 6 | 4.5% |

Non-response rate WORSENED from 32.4% (full dataset) to 43.3% (last 3 months).

### Overelaboration Audit (283 conversations, 6 months)
- 47 instances: 19 from the "check my profile" template, 28 genuine overelaboration
- 14.8% of conversations have at least one
- Average response to short client messages: 114 words (should be 15-40)

### Active Issues (30 of 46 still happening in last 2 months, 0 fixed)
Top 5 by volume: "watch my profile video" (44 mentions), "just wrapped a campaign" fabricated (31), $5K minimum as rejection (28), messages unanswered (25), long conversations below minimums (17)

---

## 21. Open Items

- Interviewing-at-apply-time signal untested (ghost-job signature) — would need capturing the panel value at apply
- Qualifying-questions regime flip — investigate answer quality post-Queenie
- `competitor_avg_earned` 100% NULL in DB (sheet col exists; sync drops it)
- ~~Client-profile UI fields never recorded~~ RESOLVED: manually backfilled to sheet cols AJ-AV for all rows since Dec 1 2025 (87-89% fill); analysis in Section 22. Auto-capture for open jobs continues via `scripts/upwork_client_stats_sync.py`
- Webapp at ~/upwork-proposal-generator/ is downgraded; uncommitted edits there are moot
- NEW 2026-07-09: fresh-month confirmation needed for hire90+ and reviews50+ conditional skips (Section 22)
- NEW 2026-07-09: live spot-check UI "Payment Method: Unverified" vs API payment_verified — they disagree on 62/94 rows; likely measuring different things (billing method vs identity verification)

---

## 22. Client-Panel Backfill Analysis (2026-07-09) — Section 18 scan executed

**Data:** Sheet cols AJ-AV (Payment Method, rating, # reviews, location, jobs posted, hire rate, open jobs, total spent, # hires, active hires, avg hourly rate paid, hours paid, member since) manually backfilled from the client About panel for all applications since Dec 1 2025. Fill 87-89%. Window: n=2,593 cold Outreach, baseline 24.3% view / 11.6% reply / 4.2% call / 15 won. Join and enrichment verified deterministically (0 mismatches on 2,593 rows; SQL re-run matched Python). QC'd by qc-reviewer-agent 2026-07-09.

### Confirmed findings
1. **Payment method Unverified = hard skip.** 94 apps, 13.8% view, 2.1% reply (2 replies), 0 calls, 0 wins, month record 0-4. Costs 802 connects for nothing. Not a new-account proxy. IMPORTANT: this is the UI panel value (col AJ). The DB/API `payment_verified` boolean remains an artifact (no FALSE rows ever) AND disagrees with the UI on 62/94 unverified rows — always use the UI value.
2. **Col AT is the REAL client avg hourly rate paid** (1/652 match vs avg_bid_rate — not the old avg-bid artifact). **No rate sweet spot exists**: <$15 payers reply 13.7% (5 wins), $15-30 10.2%, $50+ 12.8% (1 win). The old "hist $50-90 sweet spot" was always the avg-BID signal (Section 2), never client history. Never discount our rate for cheap-paying clients — they convert fine at our rate.
3. **Bonferroni-surviving skip pairs** (each worse than either component alone): nonUS & hire90+ (3.7% reply, 0 calls, n=164, z=-5.40); hire90+ & comp20+ (4.0%, n=224, z=-5.25); reviews50+ & comp20+ (3.3%, n=150, z=-3.99); unverified & hires0 (1.1%, n=89, z=-3.40). Pattern: established/high-hire-rate/heavily-reviewed clients only respond to cold proposals when competition is low or they're US.
4. **Dead-job (open<10%) prediction unchanged**: client-panel fields do NOT predict dead jobs; worldwide (z=+3.73) and comp20+ (z=+2.06) still do. Client fields predict WHO gets replied to; saturation/worldwide predict whether the client engages at all. One addition: hires=0 clients message nobody 37.9% vs 27.7%.
5. **Non-signals (tested, do not build rules)**: client rating (5.0 vs <4.7 — nothing), jobs posted, total spent (even $0-spent replies 14.1%), # hires, active hires, hours paid, avg rate paid (finding 2), open jobs (also invalidated by capture-time volatility — struck entirely).
6. **Composite pre-apply score** (count of: unverified, hire90+, reviews50+, nonUS, comp20+, worldwide; scoreable on 89% of rows): 0 flags = 35.5% view / 18.7% reply / 7.6% call / 9 won; 3+ flags = 12.8 / 3.6 / 1.7 / 0 won (n=360). Cutting 3+ saves 17.7% of connects (verified 6,167/34,903) for 0 wins and ~6 calls over 7 months. **CAVEAT: in-sample — flags were selected on this same data; expect shrinkage out-of-sample. Directional until a fresh month confirms.**

### Watch list (NOT rules)
- Hire rate 90%+ alone (z=-2.40, 1-6 months) — likely invite-hirers; holds within jobs-posted strata at 1-4 and 20+
- Reviews 50+ alone (z=-1.94) — fails multiple-comparison correction
- Account age 6y+ (z=-1.97), open jobs 0 (z=-2.05) — weak, uncorrected
- Profile unfillable at backfill = mild negative itself (unfilled rows: 9.0% reply, 0 wins, n=277 — survivorship confirmed but doesn't bias within-filled comparisons)

### Timing-bias exposure (values are current-state, not at-apply)
Safe: member since, rating, payment method (rarely reverts). Moderate: reviews, hire rate, hires, spent (drift upward post-apply — why fresh-month confirmation is required). Invalid: open jobs, active hires (too volatile — excluded from all rules).

### Method
Month-stratified inverse-variance z per Analysis Rule 6, Agresti-adjusted proportions, min stratum n=5/side, min cell n=80, interaction-beats-best-single criterion enforced, ~145 total tests, Bonferroni z≈3.3. Scripts archived in session; data: /tmp/upwork_clean.json (regenerable from sheet + DB).

---

## 23. Full-Sheet Scan — Remaining Columns (2026-07-09, QC'd)

Scanned every column not covered by Sections 1-22 (scripts, verticals, boost, connects, screening questions, cover letter, English/JSS requirements, recommendations, invites, timezone, category) against the Dec 1+ cold-outreach window (n=2,593, enriched outcomes, month-stratified, ~30 tests → Bonferroni z≈3.1-3.3). QC'd by qc-reviewer-agent 2026-07-09; enrichment discrepancies in the QC re-run were resolved in favor of the verified ClickUp enrichment (QC's re-run used raw `messaged`, which undercounts — e.g., JSS segment: 31 enriched replies vs 20 raw).

### Positive (prioritize, added to Section 1 green lights)
1. **3+ screening questions**: 44.4% view / 19.7% reply / 3 wins within <20 props (n=178) vs 30.7/15.3 for 0 questions. View z=+3.26, 7-0 months. Avg competition nearly identical (17.9 vs 20.9) — not a proxy. Serious clients write questions; fewer freelancers finish those applications.
2. **Cover letter not required**: 40.2% view / 19.3% reply / 5 wins within <20 props (n=257) vs 31.4/15.4 required. 7-0 months, sub-Bonferroni.
3. **90+ JSS required**: 34.6% view / 14.9% reply (n=208).

### Negative
4. **Connects 21+ skip re-confirmed; 17-20 rehabilitated; ≤8 weak** (Section 11 revised).
5. **Upwork recommended 6+ = caution only** (Section 10 updated — field drifts post-apply, sheet vs DB disagree on 23% of rows; both versions still show the effect and 0 wins).
6. **Google-vertical jobs underperform Meta**: 9.7% vs 13.3% reply, 3 vs 8 wins; persists controlled (<20 props & US-only: 14.3% vs 17.8%). Google jobs also more saturated (40% vs 36% hit 20+ props). Prioritization when rationing connects, not a skip.
7. **Boosting doesn't pay**: 71 boosted bids, 1,011 connects: +4pts view, baseline reply, 0 calls, 0 wins. Default: don't boost.

### Non-findings
- **Scripts**: no statistically significant difference between 'strategic' and 'claude V2' when controlled (same months, <20 props, US-only: 15.8% vs 15.4% enriched reply). 'Case study + Strategic' raw 9.0% view is job-mix — 46/67 uses were on 20+ prop jobs. Unproven, not bad.
- ecom vs service: gap nearly vanishes controlled (14.0 vs 16.7 within good cells) — watch only.
- Unanswered invites, persons-to-hire, English proficiency requirement, client timezone: nothing significant.

### Caveats
- **Fill window**: the API-backfill columns (questions, cover letter, JSS, recommendations) are ~88-93% filled Dec-Apr, 70% May, 15% June, 0% July — findings are effectively Dec-May data. Missing rows perform worse (8.5% reply), consistent with the Section 22 survivorship note; doesn't bias within-filled comparisons.
- Bonferroni-clean: only recommended-6+ (view) and screening-questions-3+ (view, borderline). Cover-letter-No and Google-vertical act on month records / z≈2.8-3.0 — prioritization guidance, not rules.
- Open item: confirm whether Queenie can see the Upwork-recommended count pre-apply before any rule uses it.
