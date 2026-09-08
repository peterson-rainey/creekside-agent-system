# Upwork Proposal — Therapy + Coaching Lead Gen (Phobia therapy / Christian men's coaching)

**Profile:** Samuel Rainey
**Style:** `strategic` (Samuel-only; "strategic version" resolves here with no mismatch)
**Date drafted:** 2026-09-09
**Status:** UNSENT
**Platform:** Unstated in post. Draft argues a two-platform read (Google for phobia, Meta for coaching) because the search-demand asymmetry is the core insight.

---

## PROPOSAL TEXT (paste-ready)

Phobia therapy and Christian men's coaching look like one job, and on the ad platforms they are two. The split that matters is where the demand already exists. Somebody with a flying phobia types the fear into Google at the moment it becomes a problem, so that niche has real search volume to capture. Almost nobody searches for Christian men's coaching. That audience has to be created on Meta against a felt problem, which is a different build, different creative, and a cost per lead you should never average with the other one.

Both niches then run into the same Meta rule, usually after the first disapproval. The personal attributes policy prohibits copy implying you know something about the reader, and both niches want to write exactly that. "Struggling with a fear of flying?" asserts a health condition. Religious affiliation stopped being a targeting input in 2022, so Christian is not selectable as an audience either. Neither group is addressable by the attribute that defines it.

So the lever is not targeting. It is creative that lets the right person self identify without the ad naming them, plus a qualifying step sitting ahead of your calendar. That is also where lead quality actually gets decided. Volume is a budget question. Quality is a form question.

First thing I would build is separate structures per niche with separate conversion actions, so the reporting can answer which niche is carrying the account. Run both through one funnel against one blended cost per lead and that answer stays hidden exactly when you need it.

On proof, straight: we have no therapy or counseling client and no faith based client, so I am not going to claim niche experience we do not have. Our team does run Meta for a coaching certification company on a recurring weekly webinar funnel, which is the same shape as a men's cohort program. The closest appointment based analog is a health practice we run Google for, and I have attached it. It leads with the best keyword CPA, the way case studies do. The number I would hold myself to is the blended one, $39.28 per conversion across 569 conversions over the last twelve months.

Two things before this could be sized properly. Roughly what range is current monthly ad spend across the two niches, and which countries are you advertising in?

---

## VERIFICATION LOG (checked live 2026-09-09)

| Claim in draft | Source | Status |
|---|---|---|
| No therapy / counseling / mental health client | `case_studies` full scan (28 rows) + `clients` + `reporting_clients` regex on therap/counsel/mental/psych | VERIFIED ZERO. Only hit is "Ida Jeltova / GM Therapy", `status=inactive`, no `reporting_clients` row at all = never launched, not citable |
| No faith based client | Same three tables + `agent_knowledge` scan on christian/church/faith/ministry | VERIFIED ZERO across all four |
| Coaching certification company, Meta, weekly webinar funnel | `reporting_clients` Adventures in Wisdom, `act_1553150081825`, status ACTIVE, platform meta, operator Scott C. Campaign `C \| Webi \| BeLC4K \| Feb 2025 \| Ongoing` ACTIVE, last data day 2026-09-07 | VERIFIED. Present tense correct. **No number attached**, per standing rule |
| $39.28 / 569 conv / 12 mo / under $2,000 mo | `google_insights_daily` x `google_campaigns`, account `5360677991` (Integrity Naturopathic), Sep 2025-Aug 2026: $22,352.28 / 569 conv = $39.28; $22,352.28 / 12 = $1,862.69 mo | VERIFIED live, recomputed. Account ACTIVE, operator Ahmed I. |
| Meta personal attributes policy | Platform policy, long standing | Policy fact, not a results claim |
| Religious affiliation removed as targeting input 2022 | Meta detailed-targeting removal, effective Jan 19 2022 | Policy fact. Deliberately NOT framed as Special Ad Category, which it is not |

## WITHHELD ON PURPOSE

- **Any AIW performance number.** Standing rule is vertical presence only. Live check confirms why: blended account CPL ran $110-$162 Jun-Aug 2026.
- **The AIW blended-vs-campaign split.** Aug 2026: the webinar campaign produced all 35 conversions at $40.42 while ~$3,693 across three "Stry" top-funnel campaigns recorded zero. It is the perfect illustration of the blended-metric argument, but it is our own account underperforming, so the draft sells the *mechanism* and not our numbers.
- **Integrity's case-study figures** ("$14-$40 CPA", "150+ conversions on $2,350/month"). Live recompute gives $39.28 blended on ~$1,863/mo. Used the live number.
- **Dr. Laleh, Polaris, Join Piper, Root Hair, Advanced Med Spa.** Healthcare but not appointment-practice analogs at this budget, and each carries its own flagged caveats.
- **Any calendar link.** First-touch proposal, URL ban applies.
- **The Adventures in Wisdom case study PDF.** See attachment ruling below.
- **A name sign-off.** Draft ends on the closing question, per the 2026-09-04 ruling reaffirmed 2026-09-09.

## ATTACHMENT RULING (PDFs opened and read 2026-09-09)

**ATTACH: Integrity Naturopathic.** File id `1x5jAh7fB8S_kcPSdmeLsdiCj8rNV8iwX`. Curl returns a real
755KB PDF (%PDF magic bytes), 3 pages, rendered and read. Creekside Marketing branded footer, **no Samuel
byline**, so it clears the byline screen. Contents: "$14-$40 CPA" headline, $14 best CPA, 150+ total
conversions, 18.6% top keyword CTR, $2,350 monthly budget, Sacramento CA, Dr. Jamie Brinkley. Page 3
keyword table: holistic doctor near me $15.99, women's hormone doctors $17.61, medical wellness $35.79.

**It conflicts with the draft's number, and the draft was rewritten to absorb that.** The PDF leads with
a $14 best-case CPA; live blended is $39.28. Earlier wording also said "under $2,000 a month" against the
PDF's "$2,350 MONTHLY BUDGET" (spend vs budget, but it reads as a contradiction). The monthly figure is
now cut, and the body names the gap outright: the study leads with the best keyword CPA, the number held
to is the blended one. That turns the discrepancy into the proposal's own thesis about blended metrics.

**DO NOT ATTACH: Adventures in Wisdom.** Two independent reasons.
1. Its canonical `case_studies.download_url` (`1qoW2YJOCD...`) is **not a PDF** — curl returns 907KB of
   `text/html`, a Drive sign-in wall. Only the duplicate `1Q4IAix0Gc81lnfeWvRlMJYHwTijeIw-h` is a real PDF.
2. The real PDF is stamped "LAST REVIEWED ON 1/6/2025" and is built entirely on the CPA-improvement story
   (starting point Jan 2025 $10,503 / 41 apps / **$256 CPA**). The account today blends $110-$162. Attaching
   it would smuggle in exactly the numbers the standing rule withholds, and it would not survive follow-up.

*Corroboration for a known data defect:* the AIW PDF states scope as **"Meta-Only"**, confirming the
`case_studies` row's `platforms: ["Google Ads","Meta Ads"]` is wrong. Still needs an admin fix.

## SCREENS RUN

| Screen | Result |
|---|---|
| Ads in scope | PASS, paid ads are the whole job |
| Full-time employment seat | PASS, "freelancer" |
| White label / subcontractor | PASS, direct client |
| Coaching Upwork competitors | PASS, niches are consumer therapy and coaching, not Upwork help |
| Detection evasion / self-funded / profit share / trial | PASS, none present |
| **Ad spend** | **UNMEASURABLE.** Unstated. Not cleared, asked in body as a relative range |
| **Geo** | **UNSTATED.** Asked in body |
| **Payment verification** | **NOT CHECKED.** No job URL supplied |
| Landing page / CRO | **FLAG, not a DQ.** "Setting up funnels" is named first and "improving conversion rates" is in required experience, but no landing page *build* is named and the post carries zero screening questions, so the two-CRO-gated-questions line cannot fire. Draft handles it as campaign-funnel structure and claims no conversion-rate-lift results |

**Length:** 394 words / 2,304 characters (Upwork limit 5,000; strategic ceiling 400)
