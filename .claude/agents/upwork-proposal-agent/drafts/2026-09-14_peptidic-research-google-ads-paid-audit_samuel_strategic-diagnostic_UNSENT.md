# Upwork Proposal: peptidicresearch.com, Google Ads paid audit then management (research peptides)

- **Profile:** General (displays as Peterson Rainey), Samuel strategic format
- **Style:** `strategic` with a diagnostic body (requested as "strategic + diagnostic"; Google-only post, so the platform test resolves to this profile, and Lindsey cannot pitch Google)
- **Date:** 2026-09-14 (Postgres `now()` 2026-09-14 19:33 UTC; the local clock reads 9/15 and is wrong)
- **Status:** UNSENT. QC round 1 FAIL (3 blocking) fixed; expert review applied. No second QC pass was run on the revision.
- **Disposition:** Required-items screen FIRED. Recommended skip. Queenie chose "Draft anyway, gap disclosed" on 2026-09-14.

---

## PROPOSAL (paste-ready)

A research peptide account that worked on Google Ads before a pause rarely comes back broken in an obvious way. More often it relaunches looking the same and quietly serves less, or bids toward a purchase count that changed during the pause, and those need different fixes.

1. None with results yet. Our team took on a research peptide brand's Google Ads account last month, and as of last week we were still reworking its site to clear Google's review, the usual first step here. The nearest comparable is compounded GLP-1 telehealth, where a short rebuild of a Google account certified before we arrived turned up duplicate conversion tracking.

2. None to send. The peptide account has nothing worth showing yet, and we no longer have access to the telehealth one, so that's a requirement we can't meet today.

3. Before any numbers, I'd read account standing in Merchant Center and Policy Manager, plus the change history for what was touched around the relaunch. A warning or review can cap everything downstream without showing up in the performance numbers.

The numbers start with Google's reported purchases against your store orders, week by week, before the pause and since. A checkout or app change can drop or double the purchase event, so this shows how much of the drop is real.

With a clean count, I'd check whether the search terms and SKUs that carried revenue are still serving, not just approved, with brand split out, since brand usually recovers first and flatters the average. Merchant Center keeps re-checking products and the site during a pause, and its flags can pull whole groups of SKUs, where a Search flag usually hits one ad or landing page.

On bidding, old ROAS or CPA targets on thin new volume tend to hold delivery back, and the bid strategy status shows whether it's still learning or limited. Auction insights for both periods will show whether new advertisers moved in.

Some of what sold before may not be eligible anymore, and the written audit should say so rather than promise the old numbers back. All of it needs read-only access to both accounts, plus an order export for the same weeks.

Did you switch the original campaigns back on or rebuild them, and how does monthly spend now compare with before the pause? Both change how I'd read the numbers.

---

## Screen notes (internal, do not send)

### Required items
| Item | Result | Evidence |
|---|---|---|
| Proven Google Ads experience in peptides (past or current) | NOT MET as "proven" | Outback Peptides (Google, signed 2026-08-20) not serving through 2026-09-10: Fathom 9/1 `e6fd09c7` (site content blocked Search, compliance landing page the last blocker, Merchant Center after Search), 9/8 prep notes (tracking verification pending before go-live), Google Chat 9/9-9/10 (landing page approval still being chased, client says progress stalled), zero `google_campaigns` rows while the pipeline is current to 9/13 for 12 other accounts. Glow Peptides was a discovery-call diagnosis, never a client. Modern Peptides was refunded post-onboarding. |
| Google Ads screenshots showing the category | NOT MET | Nothing serving to capture. No screenshot library exists. Join Piper was unlinked from the MCC 2025-11-07. Live GAQL check blocked 9/14 (PipeBoard usage cap, 44/30). |
| Understands restricted vertical (Search vs Shopping, policy, what serves) | MET as knowledge | Peptide playbook plus the first-hand Outback build (site review is the first gate; Merchant Center sequenced after Search). |
| Include: which peptide brands / comparable restricted verticals | PARTIAL | In-build peptide account (unnamed) plus the compounded GLP-1 telehealth rebuild (Join Piper, unnamed, Google only, Oct 15 to Nov 7 2025, already certified when inherited, duplicate conversion tracking fixed). No numbers: zero insight rows, 10x / 8.81x unverifiable. |
| Include: screenshots | NOT MET | Conceded in item 2. |
| Include: what you'd look at first and why | MET | Item 3. |

### Prior bid on the SAME store (read before sending)
`upwork_jobs` 7a2955fc: "Meta Ads Media Buyer / Agency, Peptides Experience Required (Proof Needed)", peptidicresearch.com, **General profile, applied 2026-09-03**, $90/hr, `script_used` strategic_dq, 17 Connects, **viewed = true, messaged = false**. The local file `.claude/drafts/2026-09-04_peptidic-research-meta-peptides_samuel_strategic_UNSENT.md` still says UNSENT; that label is stale, and the sent text was not verified. That draft conceded no peptide screenshots and no managed peptide account, and told the Glow "Not Eligible after attorney review" story. This draft does not retell Glow or reuse its phrasing.

### Possible third proposal to the same buyer
Parallel sessions drafted Samuel and Lindsey twins for a US telehealth weight-loss Meta post gated on the keyword PEPTIDIC (see memory `project_us_telehealth_weight_loss_meta_owner_lead`). If the Upwork client panel shows the same buyer, send at most one proposal across all three. This draft avoids the Samuel twin's wording ("came to us already certified", "by your cutoff, that rules us out").

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

### Review log
**QC round 1 (qc-reviewer-agent): FAIL, 3 blocking, all fixed.**
1. "Nothing is serving yet" was stated as current while records stop at 9/10. Now time-anchored ("as of last week").
2. "Your non-negotiables first." parroted the post's heading. Deleted; the gap is disclosed inside items 1 and 2.
3. First/Next/Then signposting in item 3. Rewritten with varied transitions.
Non-blocking, applied: item 2 was too thin; it now says why (nothing to show yet, no access to the telehealth account). QC's suggested fix for #1 contained an em dash and was not used verbatim.

**Expert review (expert-review-agent, checked against Google help docs).**
- VERIFIED: Merchant Center keeps re-checking during a pause (items expire 30 days after the last refresh; account reviews run independently of Ads); Search flag vs Merchant Center group-level flag; approved vs limited; purchase event can drop or double.
- OVERSTATED, fixed: "Smart Bidding ... shows up as impression share lost to rank" (only an indirect signal), replaced with targets holding delivery back plus the bid strategy status; "auction insights will show who moved in" now reads "for both periods will show whether new advertisers moved in".
- Added: account standing in Merchant Center and Policy Manager plus change history before any numbers (the first gate in a restricted category, matching our own Outback build); brand split out.
- Softened item 1 so the site review reads as the normal first step, not a problem on our side.
- Not adopted: a specific advertiser-verification track for peptides (unconfirmed without seeing the account), and the exact status label "Limited by conversions" (label wording unverified).

### Verify before sending
- Confirm with Dustin or Peterson where the peptide account stands. The draft anchors it to "as of last week"; if ads have gone live with data, item 2 and the screenshot answer change.
- Payment verification and client spend on the live post.
- Check whether the PEPTIDIC telehealth post is the same buyer before sending anything to either.
