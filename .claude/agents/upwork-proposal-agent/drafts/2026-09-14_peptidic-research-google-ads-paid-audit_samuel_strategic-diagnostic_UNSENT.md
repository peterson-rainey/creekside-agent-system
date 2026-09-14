# Upwork Proposal: peptidicresearch.com, Google Ads paid audit then management (research peptides)

- **Profile:** General (displays as Peterson Rainey), Samuel strategic format
- **Style:** `strategic` with a diagnostic body (requested as "strategic + diagnostic"; Google-only post, so the platform test resolves to this profile, and Lindsey cannot pitch Google)
- **Date:** 2026-09-14 (Postgres `now()` 2026-09-14 19:33 UTC; the local clock reads 9/15 and is wrong)
- **Status:** UNSENT, pending QC + expert review
- **Disposition:** Required-items screen FIRED. Recommended skip. Queenie chose "Draft anyway, gap disclosed" on 2026-09-14.
- **Length:** see rule check below

---

## PROPOSAL (paste-ready)

A research peptide account that worked on Google Ads before a pause rarely comes back broken in an obvious way. More often it relaunches looking the same while serving in fewer auctions or bidding toward a purchase count that changed during the pause, and each needs a different fix.

Your non-negotiables first. We don't have a live peptide account with results to screenshot today, so if that's the bar, we don't clear it.

1. Our team took on a research peptide brand's Google Ads account last month. It's still in build because Google flagged the site's content before the ads ever ran, so nothing is serving yet. The closest finished work is a compounded GLP-1 telehealth brand on Google, already certified when we took it over, where the rebuild turned up duplicate conversion tracking.

2. None in your category, for the reason above.

3. I'd line up the last strong stretch before the pause against the weeks since relaunch. The first cut is Google's reported purchases against your store orders, week by week, because a checkout or app change during a pause can drop or double the purchase event. That shows how much of the drop is real.

Next, whether the search terms and SKUs that carried revenue are still serving, not just approved, since Merchant Center keeps re-checking products and the site even while ads are paused. Search and Shopping fail differently, too. A Search flag usually lands on an ad or its landing page, while a Merchant Center flag can pull a group of SKUs at once.

Then bidding. Smart Bidding relaunched on old ROAS or CPA targets leans on pre-pause data and holds back on thin new volume, which shows up as impression share lost to rank, not budget. Auction insights will show who moved in while you were off.

Higher bids can't fix a product Google won't serve, and nothing is worth tuning until the purchase signal is right. Some of what sold before may not be eligible anymore, and the written audit should say so instead of promising the old numbers back.

I'd start with read-only access to Google Ads and Merchant Center, plus an order export covering the same weeks.

Did you switch the original campaigns back on for the relaunch or rebuild them, and how does monthly spend now compare with before the pause? Both change how I'd read the numbers.

---

## Screen notes (internal, do not send)

### Required items
| Item | Result | Evidence |
|---|---|---|
| Proven Google Ads experience in peptides (past or current) | NOT MET as "proven" | Outback Peptides (Google, signed 2026-08-20) not serving through 2026-09-10: Fathom 9/1 `e6fd09c7` (site content blocked Search, compliance landing page the last blocker, Merchant Center after Search), 9/8 prep notes (tracking verification pending before go-live), Google Chat 9/9-9/10 (landing page approval still being chased, client says progress stalled), zero `google_campaigns` rows while the pipeline is current to 9/13 for 12 other accounts. Glow Peptides was a discovery-call diagnosis, never a client. Modern Peptides was refunded post-onboarding. |
| Google Ads screenshots showing the category | NOT MET | Nothing serving to capture. No screenshot library exists. Join Piper was unlinked from the MCC 2025-11-07. Live GAQL check blocked 9/14 (PipeBoard usage cap, 44/30). |
| Understands restricted vertical (Search vs Shopping, policy, what serves) | MET as knowledge | Peptide playbook plus the first-hand Outback build (site content, not ad copy, is the blocker; Merchant Center sequenced after Search). |
| Include: which peptide brands / comparable restricted verticals | PARTIAL | In-build peptide account (unnamed) plus the compounded GLP-1 telehealth rebuild (Join Piper, unnamed, Google only, Oct 15 to Nov 7 2025, already certified when inherited, duplicate conversion tracking fixed). No numbers: zero insight rows, 10x / 8.81x unverifiable. |
| Include: screenshots | NOT MET | Conceded in item 2. |
| Include: what you'd look at first and why | MET | Item 3. |

### Prior bid on the SAME store (read before sending)
`upwork_jobs` 7a2955fc: "Meta Ads Media Buyer / Agency, Peptides Experience Required (Proof Needed)", peptidicresearch.com, **General profile, applied 2026-09-03**, $90/hr, `script_used` strategic_dq, 17 Connects, **viewed = true, messaged = false**. The local file `.claude/drafts/2026-09-04_peptidic-research-meta-peptides_samuel_strategic_UNSENT.md` still says UNSENT; that label is stale, and the sent text was not verified. That draft conceded no peptide screenshots and no managed peptide account, and told the Glow "Not Eligible after attorney review" story. This draft deliberately does not retell Glow or reuse its phrasing.

### Other screens
| Screen | Result |
|---|---|
| Duplicate profile on THIS job | CLEAR. No `upwork_jobs` row for this Google audit post as of the 9/14 sync. Do not also bid it from Lindsey (Google-only post, outside her scope). |
| Detection evasion | PASS. No evasion tells in the post. Draft is compliance-first. |
| Geo | PASS. US store. |
| Ad spend ($5K/mo floor) | UNMEASURED. Not stated. Asked in the close. |
| Payment verification / client stats | UNMEASURED. Not in the pasted post. The prior Meta post listed a $30-$80/hr client range. |
| Pricing | NOT QUOTED. The post does not require a number. Standalone paid-audit pricing is UNRULED (Queenie's $1,000-$1,500 band vs Peterson's $90/hr x hours sends); the retainer is % of spend. Settle before any reply that asks for price. |
| Hourly rate field | The prior Meta bid went at $90/hr. Match it if Upwork requires a rate; never type it into the body. |

### Verify before sending
- Confirm with Dustin or Peterson that the peptide account still is not serving. The draft says "nothing is serving yet" and records only run through 9/10.
- Payment verification and client spend on the live post.
