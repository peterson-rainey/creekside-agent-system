# Google Ads review + optimization recommendations, part-time (Samuel, strategic) UNSENT
Profile: Samuel Rainey (General) | Style: samuel_strategic | Date: 2026-09-16 US Central (Postgres now() 19:11 UTC) | 340 words / 1,913 chars | No sign-off | No attachment

## Job post (as pasted, no budget / rate / location / industry / screening questions)
> We need a freelancer to help improve our online advertising strategy through Google Ads. The work includes reviewing current campaigns, identifying optimization opportunities, and recommending changes to improve performance. You should be able to analyze campaign data, suggest improvements, and help refine targeting and messaging. This is a part-time project for someone who can provide clear recommendations and support ongoing campaign improvements.

## SCREEN
- Duplicate / twin: none. `upwork_jobs` job_description ILIKE on four distinctive phrases returned only older, different Google posts (2025-04 to 2025-09). Draft folders grepped at start and again right before save: no match. Lindsey can't pitch Google-only anyway.
- Ads in scope: yes, Google Ads is the whole job. Not white-label, not a seat ("part-time project", no "full time"), no trial, no profit-share, no worker-location requirement, no no-agency clause ("freelancer" alone is not one).
- Advisory-only shape: SOFT, not fired. Wording leans recommend/suggest, but nothing rules out hands-on work ("help refine", "support ongoing campaign improvements"). Draft steers to a steady cadence of changes, prices nothing.
- Spend: UNSTATED and no budget-size prose, so the $5K floor is unmeasurable, not cleared. Asked in the close as a relative range with a reason.
- Geo, listed rate ($40/hr floor), payment verification, job type, duration: all UNKNOWN from a pasted post. Check the job page before sending.
- Required items: none.
- Case-study matcher (`match_proposal_context`): zero matches.

## VERIFIED LIVE 2026-09-16 (contractor_query)
- 12 Google Ads accounts active in `reporting_clients` AND spending through 2026-09-15: Doctor Laleh, The Tooth Co, Vida Dentistry, Myriad Traders, Tiami, Nightlark, Scattered Kind, Perfect Parking, Canvas Homes, Integrity Naturopathic, Retirement Income Solutions, Tilly Mill Auto Center. Aura Displays excluded (status active, last spend 2026-08-31). -> "about a dozen".
- Perfect Parking (paving contractor, ACTIVE, operator Ade A.), strict window 2025-12-10 to 2026-04-17: `Search - Charlottesville` $5,752.02 / 396 clicks / 43.83 conv / $14.53 CPC / $131.22 per lead; `Perf Max - Charlottesville` $5,644.40 / 1,879 clicks / 21.05 conv / $3.00 CPC / $268.19 per lead. Exact match to the 9/16 strict slice in memory. Only click price vs lead price quoted; no reason or lead-quality claim (undocumented).
- Samuel = 6 years (memory, confirmed by Queenie 8/12).

## GOOGLE MECHANICS, primary-source checked 2026-09-16
- Conversion date: Google Ads Help 2375435, "Google Ads reports conversions from the date and time of the click that led to the successful action, not from the date of the successful action itself." (7457111 words it as "ad impression date"; draft uses click.)
- Learning status: Google Ads Help 6263057, triggered by a new strategy, a setting change or a composition change; "you may not want to measure performance until the learning period is over."
- Search terms report also exists for Performance Max (Google Ads Help 16327396, cited by expert review).

## WITHHELD, AND WHY
- "for the same city" on the Perfect Parking pair: only the campaign NAMES say Charlottesville, geo settings not pulled (QC catch). Cut.
- South River Mortgage CPA arc ($61.44 to $46.66): churned, and a before/after arc after an approach paragraph reads as causal.
- Aura brand vs non-brand split: account paused since 8/31, and the draft doesn't argue brand.
- "What do you sell?": cut on expert review, it didn't follow from the argument and made three asks.

## ATTACHMENT: none on first touch
- `Perfect_Parking_Asphalt_case_study.pdf` (.claude/attachments, real %PDF-1.4): headlines a peak 12-day window (31% CPL drop), not the Search vs PMax pair the body cites. Hold for the reply if they ask for examples.
- Integrity Naturopathic PDF: real, but fits only if they turn out to be small local lead gen. Hold.
- Aura (stale 8-10x, dead localhost link), Dr. Laleh (Google numbers fail live), South River (churned, PDF contradicts live): do not attach.

## QC + EXPERT REVIEW (2026-09-16)
- qc-reviewer-agent: PASS WITH FIXES, no blockers. Accepted: cut "for the same city" (unverified geo). Accepted the concern, rejected the wording: "Six years doing this" glued to the paving account could read as Samuel personally running it; QC's replacement "Six years of watching that split play out" overclaims (Performance Max is younger than six years). Fixed instead by opening the proof paragraph with "I've been in paid ads for six years, and our team runs..."
- expert-review-agent: Good. Accepted: "date of the ad" -> "date of the click" (verified above). Accepted: cut "what do you sell" for one sharper two-part ask. Rejected the wording "Our team has spent six years running Google Ads": six years is Samuel's tenure, the team's DB history only supports ~4.
- Not flagged by either: em dashes, links, fee, sign-off, "our team" attribution, budget-range rationale, causal juxtaposition.

## OPEN FOR QUEENIE
1. Job page: spend, client country, listed rate, payment verified, hourly vs fixed, duration.
2. `upwork_proposal_logs` INSERT skipped (contractor_query can't write).

## PROPOSAL

Optimization opportunities in a Google Ads account are only as reliable as what the campaign data counts as a conversion. If the Conversions column mixes real leads or sales with page views or a form fill counted twice, the recommendations built on it point the wrong way, and any campaign on Smart Bidding is already spending to get more of them.

Once that's clean, much of the targeting and messaging work starts in the search terms report. It shows what people actually typed before they clicked. The searches that convert tell you what to bid on and which words belong in the headlines, and the ones that keep spending without ever converting become negatives.

Changes then go in a sequence, not all at once. That's slower, but when several land in the same week there's no telling which one did the work, and a bid strategy change puts Smart Bidding back into a learning period that Google suggests waiting out before judging results. One more caution on reading the data. If leads or sales come in days after someone clicks, the latest week will look worse than it ends up, because Google reports each conversion on the date of the click, not the date it happened. Read at face value, that week tends to get the wrong campaigns cut. That's why this works better as a steady cadence than a one-time list.

I've been in paid ads for six years, and our team runs about a dozen Google Ads accounts right now. On one of them, a paving contractor, a Search campaign and a Performance Max campaign ran over the same four months at nearly the same spend. Performance Max clicks cost $3.00 against $14.53 on Search, and its leads cost $268 against $131. Judged on clicks, the budget moves to Performance Max. Judged on leads, it moves the other way.

What does the account count as a conversion today, and roughly what range does it spend each month? The right changes at $5,000 a month look different at $30,000.
