# Screening Answers — Psychiatric clinic, Google Ads audit + Standard Search rebuild
Profile: Samuel Rainey | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-08
Companion to: `2026-09-08_psychiatric-clinic-google-audit-standard-search-rebuild_samuel_strategic-diagnostic_UNSENT.md`

## WHAT CHANGED FROM THE ORIGINAL POST
The follow-up ask adds **GA4, GTM, and local lead generation**, none of which appear in the original posting.
It also promotes **certifications** from "if applicable" (soft, skippable) to a **flat direct question**.
That reverses the original draft's handling: silence was correct when hedged, and reads as evasion when asked
directly. Answered plainly below. `reference_no_certifications_exist` is unambiguous: ZERO exist system-wide.
**Do not let a follow-up talk you into naming one.**

---

## ANSWER TEXT (paste-ready)

Portfolio and results, healthcare first.

The closest match to your clinic is a naturopathic practice we run Google Search for right now. Over the last twelve months it produced 569 conversions at a blended $39.29 each. The most recent ninety days ran 108 conversions at $40.11, and that second number is the more useful one, since a twelve month average can hide a single good quarter. The case study is attached.

Past that one, the active Google book includes two dental practices, a med spa, a multi location parking operator, and an independent auto shop. All of them appointment or phone driven local businesses, which is the same buying motion a clinic runs on. Dental is the deepest of them, currently running Search alongside Local Services Ads and a managed Google Business Profile.

On certifications, plainly: we do not hold Google Ads certifications. I would rather say that up front than have it surface later. What I would offer in place of one is a screen share inside a live account, where you pick what we open, the search terms report, the conversion actions, the change history.

Search is the core of the book. Standard Search on exact and phrase, a negative list maintained weekly rather than reviewed quarterly, and a move to conversion based bidding only once the conversion action is worth bidding toward.

Conversion tracking is where the first week of any takeover goes. For a psychiatric practice that means call tracking with dynamic number insertion so a call attributes back to the query that produced it, and offline conversion import keyed on the click identifier so booked and attended appointments feed bidding without patient data going to Google.

On GA4 and GTM I should be exact about scope, because the deepest work there is on our own properties rather than a client's. One GTM container now serves the whole site, after consolidating a second container that was double firing on the funnel pages. The GA4 event schema was designed and implemented in house, and two event definition defects were found and fixed. One event had been firing on page mount, which made it track identically to pageview and useless as a funnel step. That class of defect is the first thing I look for in an audit, because it quietly inflates conversion counts and nothing downstream of it can be trusted.

Local lead generation is most of what the book does. Google Business Profile, Local Services Ads, radius and location targeting set against where patients actually come from rather than a default mile setting, and the local pack treated as its own surface rather than an afterthought to Search.

---

## VERIFICATION LOG (checked live 2026-09-08 via `contractor_query`)

| Claim | Source | Status |
|---|---|---|
| 569 conversions at blended $39.29, 12 months | `google_insights_daily` x `google_campaigns` x `reporting_clients`, acct `5360677991`, 2025-09-08 to 2026-08-31: $22,352.27 / 568.9 = **$39.29** | VERIFIED, recomputed |
| 108 conversions at $40.11, last 90 days | Same account, 2026-06-01 to 2026-08-31: $4,331.82 / 108 = **$40.11** | VERIFIED. Deliberately volunteered — it **corroborates** the 12-month figure instead of cherry-picking a window, which is stronger than a second unrelated account |
| Two dental practices, med spa, parking operator, auto shop, all active Google | `reporting_clients` platform=google AND status=active: The Tooth Co, Vida Dentistry (dental), Doctor Laleh (med spa), Perfect Parking, Tilly Mill Auto Center. All returned live Jun-Aug 2026 spend | VERIFIED. Named as breadth only, **no numbers attached** |
| Dental runs Search + LSA + GBP | `clients.services` for The Tooth Co = `['Google Business Profile','Local SEO','Google Ads']`; LSA $5K/mo alongside Google $11.5K/mo | VERIFIED. Corroborates `reference_no_seo_service_line`'s 8/28 correction that the GBP shelf is not bare |
| **No Google Ads certifications** | `reference_no_certifications_exist` + no supporting row anywhere in `agent_knowledge` | **VERIFIED ZERO.** Stated plainly because the ask is now direct |
| One GTM container after consolidating a second | `agent_knowledge` "Website Tracking Setup -- GTM + Meta Pixel" (consolidated 2026-08-14): GTM-MWQVSPJ across all pages, second container GTM-KFQDMCH5 on funnel pages **removed** | VERIFIED. Framed explicitly as **our own property** |
| GA4 schema built in house; two event defects fixed | `agent_knowledge` "Dental funnel diagnosis 2026-06-10": `Blueprint_FormStart` fired on page mount (tracked identically to PageView), FIXED 2026-06-11 commit `4481dac`; `Blueprint_PageView` fired on viewer pages, split to `Blueprint_ReportView` | VERIFIED. GA4 property 522247053 (Dental LP) and G-REHLM40KCD (main site) both real |

## WITHHELD ON PURPOSE

- **"We diagnosed the funnel in GA4."** We did not, and the record says so outright: the GA4 `Dental_LP_*` events
  were committed June 8 but **were not live** (site stuck on a ~June 4 manual build), so the diagnosis numbers
  came from **Meta Pixel, not GA4**. The answer claims schema design and defect fixes, which is what actually
  happened, and claims no GA4-sourced analysis.
- **Tilly Mill Auto Center, $2.85 CPA on 491 conversions (90d).** Verified and by far the most eye-catching
  number in the book. **Cut deliberately.** A $2.85 cost per conversion on an auto shop almost certainly means
  the conversion action counts something shallow, and the companion letter's entire thesis is that a number
  like that is untrustworthy until you know what it counted. Quoting it would refute our own argument, and it
  invites the one question we do not want to answer.
- **The Tooth Co / Vida / Perfect Parking CPAs** ($205.72 / $232.62 / $272.48 blended, 90d). Verified but
  unflattering stripped of patient value and lifetime context. Breadth only.
- **Canvas Homes.** $2,520 spend and **zero** conversions over 90 days. Excluded from the breadth list entirely.
- **Dr. Laleh's CPA.** Barred (`reference_laleh_meta_is_the_single_account_ceiling`). Named as a vertical only.
- **Chattanooga Skydiving**, the only client carrying "Google Analytics" as a contracted service line. **Churned.**
  Citing it would have been the one client-level GA4 claim available, which is exactly why it needed checking.
- **Behavioral health experience.** Still a verified zero. Disclosed in the companion letter, not repeated here.
- **Any calendar link or contact info.** First touch, URL ban holds. The screen share is offered without a link.
- **A name sign-off.** Ends on the closing line.

## QC

No em dashes; no name sign-off; no URLs; no booking CTA; "our team"/"the book" for delivery work and first
person only for judgment; every number recomputed live this session; the certifications answer states the
gap rather than routing around it. **1 attachment: Integrity Naturopathic only** (see the attachment ruling
in the companion file; three of the six healthcare case-study PDFs are dead Drive sign-in walls, and the two
other real PDFs are content-blocked).
