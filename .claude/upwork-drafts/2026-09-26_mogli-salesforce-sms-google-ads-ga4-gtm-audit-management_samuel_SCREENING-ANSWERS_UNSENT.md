# Mogli Technologies, screening answers (3), samuel, UNSENT

Pairs with `2026-09-26_mogli-salesforce-sms-google-ads-ga4-gtm-audit-management_samuel_strategic_UNSENT.md` (c7fbd421).

## Questions
1. Describe your experience with configuring and troubleshooting Google Ads conversion tracking.
2. What is your proposed initial approach to auditing our website tag hygiene?
3. Describe any recent experience with maintaining ongoing Google Ad campaigns.

## Screen
- No proof-gap foreclosure: all three are answerable from verified team work. No vertical demand (no SaaS/Salesforce requirement), no metric demand.
- Principals never do delivery work: tracking work attributed to "our conversion tracking specialist" (Jordan Tryon, `team_members` "Conversion Tracking Specialist", active), campaigns to "our team".
- Offline conversion import stays a PLAN everywhere: no completed Salesforce-to-Google return exists in the book, and Q1 says "working with ... developers" (in progress), never "built".

## Verified this session
- South River Mortgage (`clients`: Financial Services / Reverse Mortgage, churned 2026-08-04, "Taking in-house"; Google operator Ahmed I.). ClickUp chat 98430, 2026-05-28, Peterson: campaigns "are double-tracking and triple-tracking a lot of events ... The events that Jordan set up have the suffix JT or JTC and all of the campaigns need to be switched over." Ahmed same day: "Pricing Qualified - Realtime (JT)" conversion action, "Jordan's, single source, so no more double-counting." Chat 98831 (6/30): pricing qualified lead tracking resolved going forward. PAST TENSE; switch-over of bidding not independently confirmed, so the answer claims the rebuild only.
- Join Piper (`case_studies`, Google, churned Nov 2025): rebuilt an account with duplicate conversion tracking and brand-only targeting. Unnamed, past tense, no ROAS.
- Data layer form tracking: chat 100772 (2026-09-21), Creekside web developer Jonathan Lewis: "we are pushing to the data layer, as this is more scalable for all our accounts. So feel free to remove the tracking so it doesn't depend on button text."
- Canvas Homes (`clients`: active, Real Estate; `reporting_clients` Google active, Ahmed I.). Same chat, Scott Caldwell: client's developer team "is still working on" passing Google Click IDs into Salesforce; "we'll want to verify that the GCLID is being captured with each lead so we can eventually connect Salesforce outcomes back to the campaigns and keywords." In progress, present tense. The 28-vs-10 conversion discrepancy in the same thread is deliberately NOT cited (open issue in an account we run).
- Q2 facts all from the proposal's verified block (Pardot redirect drops gclid/UTMs; GA4 installed by HubSpot's integration and by a Google tag in GTM; GTM loads via HubSpot on consent and inside the booking-form iframe).
- Active Google accounts: 12 (`reporting_clients` platform google, status active) = "about a dozen".
- Doctor Laleh Google 5948318044 (active, Ahmed I.): May $18,704.25 / Jun $18,930.21 / Jul $18,440.39 / Aug $17,264.58 / Sep 1-24 $15,405.44 = "about $18,000 a month". No CPA.
- Search terms: SOP 7ca3e9ee ("Ade's weekly audits"): wasted spend = 0 conversions and >= $20 over a rolling 30 days.
- Perfect Parking 6775457442 (active, Ade A.), 2025-12-10..2026-04-17: Search - Charlottesville $5,752.02 / 396 clicks / $14.53 CPC / 43.83 conv / $131.22; Perf Max - Charlottesville $5,644.40 / 1,879 clicks / $3.00 CPC / 21.05 conv / $268.19. $3.00/$14.53 = 21% ("about a fifth"). Mixed residential + commercial, so "a big share of the buyers", never "B2B client".
- Reporting cadence: every two weeks plus a live dashboard (standing rule).

## Deliberately out
- Tea Can Company audit findings (shared retail/wholesale form, 4 purchase actions with 1 counted): churned, and the account was ours before the takeover, so citing its faults reads as our own lapse.
- SRM CPL/PQL numbers, Canvas Homes discrepancy, The Tooth Co offline-integration work (unfinished), server-side GTM (completion unverified).

## QC
- qc-reviewer-agent: PASS WITH FIXES. No fabrication, tense errors, client names, completed-import claim or self-blame; sourcing corroborated. All applied:
  - Q2 opener "Start at the ad click and follow it to Salesforce" -> "Start at each ad's URL and trace it to Salesforce" (the redirect was found by testing the URL with a test gclid, not by clicking a live ad).
  - Q3 "Upkeep runs on a weekly rhythm" -> "Search term audits run weekly" (weekly is documented for search-term audits only).
  - Q3 ad copy: side-by-side testing is documented once (on a churned takeover), so it's no longer presented as routine. QC suggested citing that takeover; used a plan for their account instead ("On your account, new copy would go in beside the current ads as a test rather than replacing them").
  - Optional: "on nearly the same spend" -> "at nearly the same spend" (sanctioned wording).
- Final: Q1 137 words, Q2 157, Q3 137. 0 em/en dashes, 0 colons, 0 URLs, no sign-off, no price.

## ANSWERS

**1.**
Most of it is finding where an account counts a lead twice or counts the wrong thing. A reverse mortgage lender's Google campaigns were counting the same leads two and three times, so our conversion tracking specialist rebuilt the tracking as single-source conversion actions, including one for leads that passed pricing qualification. A GLP-1 telehealth account we took over was double-counting conversions and bidding only on its own brand name, so we fixed the tracking and built out non-brand search. On the setup side, we build form tracking on a data layer push from the form itself rather than on button text, and right now we're working with a real estate client's developers to get the gclid onto every Salesforce lead, so outcomes can go back to Google Ads. The hands-on tracking work sits with that specialist.

**2.**
Start at each ad's URL and trace it to Salesforce. That's how the Pardot redirect in the cover letter turned up, and a tagged test click through each live ad's URL shows whether the gclid and UTMs survive to the page, the form and the lead record. Next comes an inventory of everything that fires, from page code and GTM, with how each piece handles consent, since GA4 is installed twice and the container loads in two places. Then one event map covering each Pardot form, the Qualified conversation and booking, and the page visits worth tracking, showing what fires each one, which GA4 key event and Google Ads action it lands in, whether that action is primary and how it counts, and what Salesforce shows for the same lead. Test submissions run through GTM preview and GA4 DebugView, flagged as tests with your team. You get the map and a ranked fix list before anything changes.

**3.**
Our team runs about a dozen Google Ads accounts right now, including about $18,000 a month for a dental aesthetics practice. Search term audits run weekly, and any term that's spent $20 in 30 days without converting gets a decision, with negatives coming out of that. Campaign types get compared on cost per lead, not cost per click. At a paving contractor where a big share of the buyers are property managers and general contractors, Performance Max bought clicks for about a fifth of the Search price over the same four months, at nearly the same spend, yet Search delivered leads at $131 against $268. On your account, new copy would go in beside the current ads as a test rather than replacing them. Reporting goes out every two weeks, with a live dashboard in between.
