# Opportunity niche Google Ads approvals + Meta agency account (Ollie, likely UK)
**Profile:** none | **Style requested:** strategic + diagnostic | **Status:** NOT DRAFTED, DQ reported, disposition PENDING
**Screened 2026-09-14** (Postgres now(), US Central). Detection-evasion auto-DQ fired: account-lending variant (Meta) plus a white-hat exclusion filter.

## Tells (verbatim from the post)

1. "If you can also help me get a facebook ad agency account (I had issues with my bm)"
   Own BM is the restricted asset and a different account is the fix. Account-lending tell, Meta form.
   Not the John Jackman carve-out: that lead ran ads inside other businesses' BMs; here the account itself is the product.
2. "If you're not in the opportunity niche - and you just run clean ads in white hat niches, please don't apply."
   Buyer filters OUT compliance-first operators. Softer phrasing of the 2026-08-18 "b h ads" ask.
3. "flagged for 'unreliable claims'" + "Sometimes they get approved, then get taken down again a week later"
   In this niche the flagged claim is usually the offer itself. Approval without changing it is evasion;
   changing it is the white-hat approach the buyer excluded.

## Screens

| Screen | Result |
|---|---|
| Detection evasion | **FIRES.** Tells 1-3. Category pass: no Jay, no repriced counter, no single-platform (Google-only) escape. |
| Already drafted / already bid | PASS. `upwork_jobs` searched by job_description (opportunity niche / unreliable claims / white hat / agency account): no row for this post. No draft in `.claude/drafts`, `.claude/upwork-drafts`, `.claude/agents/upwork-proposal-agent/drafts`, root `drafts/` or `upwork-drafts/`. `upwork_leads` has Oliver Evans (nurture) and Oliver Madison (lost); no memory or index entry ties either to this post. |
| Required items (proof) | **FIRES.** Opening question gates on opportunity-niche results. `clients`: 0 rows on make money / income or business opportunity / side hustle / passive income / work from home / affiliate marketing / dropship / forex / crypto / trading course / masterclass / online course. `case_studies`: only Adventures in Wisdom (children's education and life coaching franchise), not this niche. |
| Zero-spend milestone | **FIRES.** Approval phase (creative and LP edits, human review requests) runs with ads disapproved, so no spend for % of spend to attach to. |
| Ad spend | Target £30k/mo "once things are up and running again" clears $5K. Current live spend unknown. |
| Geo | GBP points to UK (allowed). Ad market not stated. |
| Niche alone | NOT the DQ. The 2026-09-02 masterclass income-opportunity proposal passed the evasion screen. |

## Policy checked live 2026-09-14

- Google Misrepresentation, Unreliable claims (support.google.com/adspolicy/answer/6020955): bans claims that present an improbable result as the likely outcome a user can expect.
- Meta (transparency.meta.com circumventing-systems page; facebook.com/business/help/975570072950669): prohibits helping anyone evade enforcement, and can restrict Business Managers closely linked to accounts that evade policy. Creekside's BM holds live client accounts.

## Disposition

PENDING. Asked Queenie: skip (recommended) or Google-only compliance draft anyway.
