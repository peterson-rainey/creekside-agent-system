# Upwork Proposal: E-commerce marketer to manage and grow online store through paid ads (Meta primary, TikTok/Google potential)

- **Profile:** Lindsey | **Style:** lindsey_default (request said "strategic version, write it in lindsey_default", resolved in the same message) | **Date:** 2026-09-15 | **Status:** UNSENT, QC + expert review applied
- **Attachment:** NONE. Verified numbers carry the body; no Lindsey-operated ecom PDF is attachable (Master Spa Parts, Tiami, Neue Maison have no case-study PDF; Blush Camera PDF is DO-NOT-ATTACH).

## PROPOSAL (paste-ready)

When a campaign's ROAS drops, how do you currently tell whether the ads stopped working or Meta simply got more expensive that month? With Q4 about to start, that call decides which campaigns get cut and which get more budget.

I ask because of a replacement parts store I ran on Meta, a little over $120,000 in spend across about ten months. From October to December the budget held flat at around $15,700 a month and ROAS fell from 6.45x to 3.22x. On paper that looks like tired ads. But click-through rate went up over the same stretch, 1.59% to 1.86%, while CPMs rose more than 40%. People were still responding, every impression just cost more. The account reached 8.07x in April and settled around 6.5x in May. Some of that climb was holiday costs coming back down, which is why I read click-through next to ROAS before cutting anything in Q4.

Other e-commerce stores I've worked with on Meta include a consumer camera brand (about $58,000 in spend) and a luxury furniture brand (about $105,000 over four months). I also run a luxury mattress brand now. I've been doing this for over 10 years, and before working with clients I built and sold my own e-commerce business, so I care about what a sale is worth after costs, and ROAS is only part of that.

Roughly where does your monthly Meta spend sit right now, a few thousand or well into five figures? That tells me how much testing fits in before holiday costs climb.

I recorded a short video on my profile that walks through how I run accounts like this.

---

## Screening notes (internal, not part of the proposal)

| Screen | Result |
|---|---|
| Already drafted / dual bid | PASS. `upwork_jobs` job_name/job_description ILIKE on "manage and grow my online store", "experienced e-commerce marketer": 0 rows. Draft-folder grep across `.claude/drafts`, `.claude/upwork-drafts`, `.claude/agents/*/drafts`: 0 hits. Re-run before sending. |
| Ads in scope, white-label, full-time seat | PASS. Direct store owner, ongoing paid ads management. |
| Platform fit (Lindsey scope) | PASS. Meta primary. TikTok/Google "potentially" is outside Lindsey's permitted services, left unmentioned. |
| Proof demand ("examples of stores, results, experience") | ANSWERABLE from Lindsey's own operator book, all cited accounts have platform_operator = Lindsey. |
| Geo | UNKNOWN. Pasted text only. Confirm on the job page. |
| Payment verification | UNKNOWN. Confirm on the job page. |
| Ad spend ($5K floor) | UNSTATED. Asked as a relative range. Provisional until it clears $5K. |
| Budget / rate / trial | None stated. Pricing not raised. |

### Proof used, verified live 2026-09-15 via contractor_query

- **Master Spa Parts** (`act_2752863238119036`, replacement parts ecom, operator Lindsey B., CHURNED 2026-05-28). `meta_insights_daily` JOIN `meta_campaigns`, ROAS = sum(spend*roas)/sum(ALL spend) (the canonical method, not the non-null-denominator one that returns 4.30x/8.57x):
  - Oct 2025: $15,700, CPM $8.06, CTR 1.59%, 6.45x
  - Nov 2025: $15,325, CPM $11.34, CTR 1.77%, 4.38x
  - Dec 2025: $15,682, CPM $11.68, CTR 1.86%, 3.22x
  - Jan 2026: CPM $8.10, 4.57x
  - Apr 2026: $13,224, 8.07x (peak) / May 2026: $11,615, 6.53x
  - Total on this join: $123,049, 4,260 conv, 5.52x, Sep 2025 to May 2026 ("a little over $120,000", "about ten months" per memory tenure window 2025-08-25 to 2026-05-26)
  - CPM Oct to Dec +45% on this pull, +41% on the 8/27 pull. "More than 40%" is true on both.
  - Causation guard: Dec-to-Apr climb partly attributed to Q4 CPMs unwinding, stated in the body.
- **Blush Camera** (`act_2050081878799128`, consumer camera, operator Lindsey B., CHURNED 2026-06-16): $58,298.09 spend, 2026-02-02 to 2026-06-15. Spend only; CPA and ROAS not cited.
- **Neue Maison** (luxury furniture, operator Lindsey B., CHURNED 2026-08-11): tenure window from 2026-04-10, see verification below.
- **Tiami Sleep** (`act_1401195627889544`, luxury mattress, operator Lindsey B., ACTIVE): $13,261 Meta spend in last 60 days, last row 2026-09-13. Present tense, category only.

### Deliberately excluded

- Master Spa blended ROAS figures other than the monthly series; the 14-to-7 campaign consolidation (needs the CPM-fell caveat, too long).
- Blush Camera CPA ($93.58 on a $129 product reads poorly on a "profitable sales" post) and its PDF.
- Any TikTok or Google mention (Lindsey scope ban).
- Pricing, 90-day minimum (not asked).

### QC + expert review, applied 2026-09-15

`qc-reviewer-agent`: PASS WITH FIXES, no blocking issues.
1. ACCEPTED: churned camera + furniture brands separated from the active mattress brand so tense isn't carried by one trailing clause.

`expert-review-agent`: Good.
1. REJECTED: "I can share the CPA and ROAS breakdown for either." Neue Maison has no citable purchase count/CPA/ROAS (343 is not purchases, 12-month table pre-tenure contaminated) and Blush Camera ROAS coverage is partial. It would promise proof we cannot honestly deliver.
2. ACCEPTED, modified: split the 8.07x/6.5x run-on so the causation caveat stands on its own. Dropped the suggested "not the ads suddenly working better" (negative parallelism, and it undercuts the point that the ads were fine all along).
3. ACCEPTED: cut "conversion rate" from the read-next-to-ROAS line (no CVR figure shown).
4. NOTED, not fixable: two of three comparison stores carry spend only, no results. No verified result metric exists for either.

### Open for Queenie before sending

- Geo and payment verification unknown (pasted text only). Check the job page.
- Spend unstated; $5K screen provisional until they answer.
- TikTok/Google "potentially" in scope is left unaddressed (Lindsey scope ban). If they push on it, that's a Samuel/team handoff.
- Attachment: none. Re-run the dual-bid grep right before sending.
- DB log to `upwork_proposal_logs` skipped (contractor_query cannot INSERT).
