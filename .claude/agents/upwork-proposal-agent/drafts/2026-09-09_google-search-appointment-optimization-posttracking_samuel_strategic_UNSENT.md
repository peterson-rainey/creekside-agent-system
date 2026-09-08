# Upwork Proposal — Google Search Optimization, Appointment Lead Gen (tracking + restructure already done)

**Profile:** Samuel Rainey
**Style:** Samuel `strategic` (strategic + diagnostic)
**Date drafted:** 2026-09-09
**Status:** UNSENT
**Platform test:** Google-primary post (Search, keywords, search terms, GA4/GTM/Wix) → Samuel, not Lindsey. `strategic` is Samuel's default style, so no style mismatch to resolve.

---

## PROPOSAL TEXT (paste-ready)

You have the tracking and the structure in place, so the next constraint is not setup, it is what the data can actually see. GA4 and GTM can confirm a booking was submitted, not whether it turned into a qualified appointment. So the account is optimizing toward form fills right now, and the more you scale volume, the further those two things drift apart.

We ran into that same setup with Winterbotham Parham Teeple, a bankruptcy firm in Orange County. It was an existing lead generation account that needed improvement rather than a rebuild, which is close to where you are now. Our team took it from 117 conversions to 229 while cost per conversion dropped from $86.09 to $50.29 on about $11.5K in spend, mostly from rebuilding campaigns around the actual local search market. On the appointment side, Integrity Naturopathic is an active practice in our book running 574 conversions over the last twelve months at $39.62 blended.

The first lever I would pull here is closing the qualification loop, feeding which bookings actually turned into kept appointments back into the account so bidding stops treating every form fill as equal. Once that signal exists the rest of the work gets sharper: search term and match type cleanup, ad and landing page tests measured against outcomes rather than raw conversions, and bid and budget moves that scale the segments that hold up. I would want that loop closed before pushing spend much harder, because scaling on unqualified signal just buys more of the wrong bookings faster.

What monthly spend range are you working with right now, under $5K, $5K to $10K, or higher? That changes how aggressively I would move on bidding.

**Character count: 1,671** (well under the 5,000 cap). Word count: 283. Verified with `wc`: 0 em dashes, 0 links, 1 question mark.

---

## VERIFICATION LOG (checked live 2026-09-09)

| Claim | Source | Status |
|---|---|---|
| Winterbotham: 117 → 229 conversions | `case_studies` + client-facing PDF read in full 2026-08-28 | VERIFIED |
| Winterbotham: $86.09 → $50.29 cost per conversion | Same PDF, matches canonical exactly | VERIFIED |
| Winterbotham: ~$11.5K spend, Orange County, bankruptcy, Google Ads | Same PDF | VERIFIED |
| Winterbotham: driven by market-specific campaign restructuring | Same PDF (`market-specific campaign restructuring`) | VERIFIED, causal link is documented |
| Integrity Naturopathic: 574 conversions, $39.62 blended, ACTIVE | Live recompute `google_insights_daily` × `google_campaigns` × `google_ad_accounts` × `clients`, 2025-09-08 → 2026-09-07: $22,738 / 6,758 clicks / 574 conv | VERIFIED, present tense |
| Integrity is Google Ads, not Meta | 4 corroborating sources vs 1 bad SOP line, per `reference_integrity_naturopathic_is_meta_not_google` | VERIFIED |
| GA4/GTM sees form submission, not appointment outcome | Standard platform mechanics + prospect's own stated stack | VERIFIED against post |
| Smart Bidding learning on thin sample after a rebuild | Inference from the prospect's own stated facts | Reasoning, not a Creekside proof claim |

---

## REJECTED PROOF (failed live verification, kept out)

| Candidate | Why it was cut |
|---|---|
| **Polaris Dentistry** | Canonical claims sub-$4 CPA and 26 → 413 annual conversions. Live trailing 12mo: $5,541 / 201 conv / **$27.57 CPA**, and the account is **churned**. The sub-$4 figure is off by ~7x. BANNED. |
| **The Tooth Co** | Active dental, but live CPA is **$161.97**. Undercuts a "cost under control" argument. |
| **Big Chad Law** | $20K/mo figure previously failed live verification. |
| **Perfect Parking** | $127 CPL previously failed live verification. |
| **NYC Notary, UrCovered, Winterbotham live recompute** | No `reporting_clients` rows, so no live insight data exists to recompute against. Winterbotham survives only because its client-facing PDF was read in full and matches canonical. |

---

## WITHHELD ON PURPOSE

- **Integrity's ~$1,900/month spend.** Cited volume and efficiency instead. The prospect's own budget is unstated, and anchoring on a sub-$2K account risks reading small.
- **A second "volume up, cost down" claim for Integrity.** Only a current-state snapshot exists for that account, no baseline. Claiming a trend there would have been fabricated. QC caught this.
- **Winterbotham's CAC-to-value math** ($1,500–$4,000 case fees, 30–80x per closed case). Legal-specific and the prospect's vertical is unknown.
- **"Instead of generic legal terms."** Ground truth documents the restructure, not the prior keyword strategy. Cut as an uncited invention.
- **Any offline-conversion client result.** The mechanism is described as a recommendation only. No case study exists for it.
- **Certifications.** Zero exist system-wide.
- **Samuel's 6 years.** Not required by the post, and omitting it avoids any misstatement risk.
- **Pricing.** No fee, no percentage, no hourly. First touch.
- **Links, calendar link, contact info.** First-touch URL ban; the calendar-link carve-out does not apply.
- **Name sign-off.** Per the 2026-09-04 ruling.
- **The vertical, geo, and spend.** All three are unstated in the post. None were guessed.

---

## OPEN SCREENING GAPS (flag for Queenie)

1. **Monthly ad spend is unstated.** Sub-$5K/month is an auto-DQ. The closing bracket ask is built to surface this on the first reply.
2. **Geo is unstated.** The US/CA/UK/AU screen is unresolved. Wix + GA4/GTM gives no geo signal.
3. **Vertical is unstated.** Deliberately not guessed. Dropped the second question to keep the close to one ask, so this stays open until they reply.

## ATTACHMENT DECISION (2026-09-09, both PDFs read in full via Drive metadata)

**ATTACH: `winterbotham_parham_teeple.pdf`** (`18tz_I0lKY_ULzLG8NlspLfSg1H3bqFtv`, 794KB, resolves).
Titled "How Winterbotham Parham Teeple Doubled Conversions and Cut CPA 42% with Google Ads."
KPI tiles read 229 conversions / $50.29 / 42% CPA reduction / 2x conversion growth, and every one
matches the draft body exactly. It is the only artifact in the book that documents the
before/after arc the post actually asked for.
**BLOCKER: the `<http://localhost:4321/>` dev footer is STILL the last line** (confirmed by direct
read today, despite the 2026-07-08 modified date). Re-export before sending.
**Known cost:** the closing CTA reads "Ready to cut your legal marketing costs while growing your
caseload," so legal is visible on the last line and this post's vertical is unstated.

**DO NOT ATTACH: `integrity_naturopathic.pdf`.** Two reasons, the first fatal:
1. Its KPI tile headlines **"150+ TOTAL CONVERSIONS"** and **"$2,350 MONTHLY BUDGET"**. The draft
   body says 574 conversions and the live run rate is ~$1,895/mo. The attachment would contradict
   the proposal on sight. Classic "attachment that argues against the proposal."
2. It has no baseline, so it does not evidence an account "successfully improved" at all. It is a
   current-state snapshot. Fine as a prose cite, useless as proof of an improvement arc.

**DO NOT ATTACH: `Polaris_Dentistry_...pdf`.** Contains "below $4 per conversion" (banned live) and
mixes both identities: bylined "By: Samuel Rainey" with results panels reading "Before Peterson" /
"After Peterson." Persona leak on a Samuel bid.

**Opener edited as a consequence.** The original first sentence argued the account had "only a few
weeks of real data" with "Smart Bidding still learning off a thin sample." Winterbotham's thesis is
DECOMPOSITION (it splits into four focused segments), which fragments thin data further. Per the
2026-09-05 narrowing, Winterbotham is a contradiction on any draft resting on learning-phase volume
thresholds. Dropped the learning-phase claim and kept the qualified-vs-booked gap, which is the
load-bearing insight and does not fight the attachment.

## QC RESULT

`qc-reviewer-agent`: **SHIP WITH EDITS**. Three blocking findings applied (fabricated Integrity trend claim, two-questions-in-one close, spend disclosure). One recommendation overridden: QC suggested leading with the case study, but Samuel `strategic` opens on a strategic statement by definition, so paragraph order was kept deliberately.
