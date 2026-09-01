# Upwork Proposal - Meta Pixel/CAPI diagnosis + FB Ads lead gen
Profile: Samuel | Style: strategic (Samuel's documented default) | Status: UNSENT | Drafted 2026-09-02
Supersedes the lindsey_default draft per Queenie 2026-09-02.

## Proposal text

Fixing the Pixel and CAPI is the easy half. The part that decides whether you get qualified leads instead of cheap clicks is what you feed back through CAPI after the form fill.

Most accounts I audit have both the pixel and CAPI firing Lead without a shared event ID, so the two feeds never deduplicate. Meta counts roughly double, the CPL in Ads Manager looks great, and the algorithm spends the next month learning from an audience that never actually converted. That part gets fixed in a day. The more valuable move is sending a second, later event back through CAPI once a lead is qualified on your end, whether that is a booked call, a sales-accepted lead, or a closed deal. Then Meta optimizes toward the leads your team actually wants rather than the ones that were cheapest to collect.

The tradeoff is worth saying up front. Optimizing on a downstream event costs volume, and it only holds if that event fires often enough weekly to keep ad sets out of learning. If your qualified-lead count is thin, we stage it: clean the event layer first, run on Lead while we build volume, then move the optimization event once the data supports it.

We ran Meta for a dental implant group where this was the whole problem. Restricted category, so custom events were off the table and we had to establish which standard events were even permissible before optimizing toward anything real. Once that was settled the account produced 2,558 leads at a $25.31 blended cost per lead over four months, going into a call center where a human graded quality daily. On live accounts our team keeps pixel verification and conversion checks as a standing weekly item rather than a setup task, because a tracking break shows up there about a week before it shows up in CPL.

I have audited over 200 ad accounts and helped manage more than $20 million in spend, mostly Google and Meta.

Two things before I could scope this properly: what range is your monthly Meta budget in, and what does a qualified lead mean on your end? Happy to jump on a quick call and dig into the account.


Samuel

## Verification notes
- 2,558 leads / $25.31 CPL: recomputed live from meta_insights_daily x Fusion Dental Meta account, Apr-Jul 2026, $64,746 spend.
- Restricted-category standard-events constraint: agent_knowledge ccd0db1b (2026-05-04).
- "We ran" is accurate: Peterson (= Samuel) was account_manager on Fusion Dental Meta; Lindsey was platform_operator. No first-person delivery claim.
- $20M+ / 200+ accounts: sanctioned aggregates in samuel-identity.md. No years-of-experience claim made (Samuel = 6, not Lindsey's 10+).

## Disclosed gaps (NOT in proposal)
- No operator-owned CAPI/server-side BUILD proof. Fusion event-layer resolution came via Jordan (Growth Channel), external.
- No durable turnaround arc. South River Mar $296.68 -> May $59.33 at flat spend reversed to $846.63 in June, churned 8/11. Not citable.

## Attachment decision (verified 2026-09-02 by curl)
ATTACH: Dr. Laleh, underscore twin file_id 1puRdRRI80FMcw7dRUQvLjHbR3hYqYjSu
  ("Dr._Laleh_Elective_Health_Care_Case_Study.pdf") -> 200 application/octet-stream, real file.
SECONDARY (only if prospect turns out to be B2B): ReferPro underscore twin 1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso -> 200 octet-stream.

DO NOT ATTACH:
- Advanced Med Spa (1FvkUORPMVb3dnFH_nvyFkZ36AcsZvqQx): ai_summary names PETERSON = persona leak on a Samuel
  proposal. Also link returns text/html, not a file. Double disqualifier.
- Birthday Club App (1NOKmt8X-jCC8wFYtpDLYE_zRfa1_v9Ag): 404. File is gone from Drive.
- South River Mortgage: $81 CPL fails live verification, churned 8/11.
- case_studies.download_url for Dr. Laleh (1sRKepK03dL8...) returns text/html. Stale, as the standing rule says.
  Confirms the "underscore twin is live" rule again (now 6/6).

RISK: the Laleh PDF claims CPA $48.79 -> $9.58. Live Laleh META data is $306-$2,439 per conversion (May-Aug 2026).
The PDF is Google-led historical, but the numbers do not reconcile with the Meta account. Do not volunteer Laleh
Meta specifics on a call.

GAP: zero pixel/CAPI/tracking case studies exist anywhere in the library. The job's headline deliverable has no
attachable proof.
