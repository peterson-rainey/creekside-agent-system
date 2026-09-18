# Upwork Proposal - UNSENT
Job: Florida P&C insurance agency, Google Ads / Performance Marketing Manager, KPI Cost Per Issued Auto Item <= $150, $10K-$15K/mo Google spend, $1,500-$2,500/mo comp, opener keyword "AUTO CPI".
Profile: Samuel Rainey (display name Peterson Rainey) | Style: samuel_strategic | Date: 2026-09-18

SCREEN (reported before drafting, Queenie chose "Draft anyway"):
- FULL-TIME AUTO-DQ FIRES: "can become a long-term/full-time opportunity" (PT-to-FT counts, 9/2 ruling). Drafted on explicit override after the report.
- REQUIRED ITEMS: "AUTO CPI" opener is gated on having generated US auto insurance business. We have not. Phrase deliberately NOT used; the draft says so in line 1. Expect the filter to cost us the read.
- PROOF: zero insurance clients (clients ILIKE insur = 0 rows). ~35 prior insurance bids in upwork_jobs, incl. "Senior Google Search Media Buyer – Auto Insurance" (4/14). No row matches this post.
- COMP: $1,500-$2,500/mo flat for one person. Below our % of spend at $10-15K. No fee in the body. Bid field needs a number: OPEN for Queenie.
- WORKER LOCATION: "open to candidates in India" is permissive, not a requirement. Does not fire.

PROOF USED: Big Chad Law (PI law, Google + Meta). Recomputed table Apr-Sep 2025: 102 cases on $96,984.73 = $950.83 blended across Google + Meta (Sep partial). ~$16K/mo average. Calls over 3 minutes sent back to Google. Came through partner agency Sealvertise, ended 2025-09-24: never called a direct client. "Cases", never "signed". Return leg (offline import of cases) NOT proven, only a header-only template, so answers 5 and 9 say so.
ATTACHMENT (optional): `Big_Chad_Law_Legal_Case_Study_(1).pdf` (Drive 12s-vrheRosxUbskK0Kw6tD6BDqUDTg9c; local .claude/attachments/). Soft spots: byline "By: Samuel Rainey", names the client, vertical is legal not insurance.

VERIFIED MECHANISM FACTS (memory, verified 9/16):
- Imported conversions report on the click date (Google Help 2375435).
- Offline click imports stop 90 days after the click.
- Calls from ads import on caller number + call start time, only via a Google forwarding number.
- Creekside's own intake saves click IDs to the contact at form submit, before the booking step (agent_knowledge fd1b546e).
- Team by role: Jordan Tryon, Conversion Tracking Specialist; Ade / Ahmed, Google Ads specialists. Nobody named.
NOT CLAIMED: CallRail use (Tooth Co CallRail was committed, never built), any completed offline import, any insurance result.

DB LOG: skipped, contractor_query cannot INSERT.

---

No AUTO CPI at the top of this, because we haven't run Google Ads for an auto insurance agency and you'd see that at question 1 anyway. What we have done is track paid search past the lead to the outcome that actually pays, which is most of what a $150 CPI depends on.

One thing about that target: it's per issued item, not per policy. A two-car household is two items off one lead. If the offline import sends Google the number of issued items as the conversion value, bidding learns to pay more for searches that turn into multi-car households and less for single-car shoppers, which moves CPI without touching cost per lead. Most setups send a plain yes or no, so Google values a one-car policy the same as a three-car one.

Two timing points before judging weekly reports. Google reports imported conversions on the click date, so the most recent weeks always look worse than they end up once binds and issues come back. And an import has to land within 90 days of the click, so the CRM export needs to run on a schedule.

On ZIPs, the first question is which ones your carriers will write at a competitive rate. Clicks from ZIPs you can't quote well cost the same as good clicks and never bind.

1. No, not for an auto or P&C agency. The closest match is a personal injury law firm on Google and Meta, where the account was judged on cases, not leads, so tracking had to follow each lead through intake.
2. Roughly $16,000 a month across Google and Meta.
3. That account was managed on cost per case, not cost per lead, so that's the number I'd stand behind.
4. Legal has no quote or bind stage. The equivalent was a qualified case (see 6).
5. Cases were tied back to lead source in reporting, and Google bid toward calls over 3 minutes rather than every call. It was not a full import of cases back into Google.
6. About $950 per case, blended across Google and Meta over six months.
7. Calls from ads through Google forwarding numbers, which import matched on caller number and call time. Number swapping on the site so web calls keep their click. The click ID saved to the lead record at first contact, before any handoff, which is how we built our own intake. Quote, bind and issued items as separate conversion actions, bidding on quotes while volume builds, then moving to issued items with item count as the value. ZIPs cut by carrier appetite, and a weekly report of cost per lead, quote, bind and CPI by campaign with the newest weeks marked as still filling in.
8. Google's forwarding numbers for ad calls. For site calls, whichever of CallRail or CallTrackingMetrics connects cleanly to your lead manager.
9. I won't describe a finished import I can't show you. The setup is auto-tagging on, the click ID stored on the CRM record, each stage exported with that ID and a timestamp, uploaded on a schedule inside 90 days, and only one stage set as the bidding goal at a time.
10. US Central, one hour behind you, so your full business day overlaps.

Tracking sits with our dedicated conversion tracking specialist and the account with a Google Ads specialist, while I stay on strategy.

Does your lead manager record how many vehicles are on each quote?
