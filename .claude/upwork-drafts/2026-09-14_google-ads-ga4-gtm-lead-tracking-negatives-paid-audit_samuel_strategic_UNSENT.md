# Upwork Proposal - UNSENT
Job (as pasted, no title supplied): "I'm looking for an independent expert to audit our Google Ads, GA4/GTM, and conversion tracking. We've found that actual leads aren't being recorded correctly and that valuable keywords are mistakenly added as negatives. Do you personally handle GA4/GTM and Google Ads conversion troubleshooting? I'd like to start with a paid audit before making changes."
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-14 (Postgres now(), US Central)

SCREEN (read before sending):
- REPEAT / TWO-PROFILE: no upwork_jobs row matches the description phrases, no existing draft (grep of .claude/upwork-drafts, drafts, upwork-drafts). First sighting.
- PLATFORM: Google Ads + GA4/GTM = Samuel profile. Outside Lindsey's scope.
- ADS IN SCOPE: YES. Google Ads account audit (negatives) plus tracking. Not the systems/plumbing-only variant (no "not looking for someone to run ads" line). Shape = paid audit as entry, same as the 9/11 senior-consultant and Montreal clinic drafts.
- "INDEPENDENT EXPERT" + "Do you personally handle...": YELLOW fit risk, not a DQ. It is a question, not a "must personally perform" clause or a handoff ban. Answered honestly per principals-never-deliver: not personally; dedicated conversion tracking specialist + Google Ads specialist; Samuel on strategy. If the buyer wants a solo freelancer, this answer may lose it.
- SPEND: not stated, prose does not foreclose it. $5K screen UNMEASURABLE. Draft asks it as a bracket ($3,000 vs $30,000).
- GEO / PAYMENT VERIFIED / CLIENT HISTORY / JOB TYPE / POSTED BUDGET: not in the pasted text. All UNMEASURABLE. Check the job page before sending.
- HOURLY: no rate or hours requested in the text. Contract type not raised.
- PRICING (OPEN, needs Queenie): no fee named in the body, same as the 9/11 senior-consultant ruling ("No fee named"). Upwork's bid field still needs a number. Options on record: (a) management follows = one $1,500/platform onboarding fee with the audit inside it (9/2 ruling); (b) true standalone = $1,000-$1,500 band by active campaigns (Queenie 8/25); (c) Peterson's own sends = $90/hr x est. hours (8/27 Southglenn, 9/9 Al Fawzy). (b) vs (c) is UNRULED.
- REQUIRED ITEMS: one question ("personally"). Answered.
- ATTACHMENT: none. Zero tracking-audit case studies exist; Join Piper (the only tracking-repair row) is standing do-not-attach (reporting_clients row conflict). Integrity Naturopathic is off-thesis, and its offline import runs through FirstUp Marketing, not us.
- DB LOG (upwork_proposal_logs INSERT): SKIPPED, contractor_query cannot INSERT.

VERIFIED (contractor_query, 2026-09-14):
- team_members: Jordan Tryon, role "Conversion Tracking Specialist", active. ClickUp (Fusion Dental task): "all conversion tracking tasks would be assigned to Jordan Tryon going forward." Aug 2026 Peterson/Jordan call items include tracking root-cause work. Supports "dedicated conversion tracking specialist". Not named in the draft.
- team_members: Ade Aderibigbe, "Google Ads Specialist", active; agent_knowledge SOP 7ca3e9ee is his search terms audit and negative keyword method. Supports "our Google Ads specialist". Not named.
- Join Piper (telehealth, Google, churned, past tense): slack_summaries 2025-10-08, Ahmed Imran presented an audit and action plan; a duplicate conversion action was set to Secondary. 2025-10-09, Ahmed warned the client that recorded conversions would trend downward going forward since past conversions had been duplicated. No result number cited (10x / 8.81x deliberately left out). Client not named.
- Negative-keyword mechanism seen in our own book: ClickUp 2025-05-08 (ReferPro), Peterson: "broad match negative with one of our keywords in it should never happen." Basis for the mechanism only. NOT cited (it was a Creekside contractor error).
- Peterson did hands-on conversion troubleshooting in 2025 (ClickUp chat 2025-07-22: duplicate thank-you page conversion set to secondary, GTM tag with the wrong label). Not cited.

GENERAL GOOGLE ADS / GA4 KNOWLEDGE IN THE DRAFT (not DB-backed, sanity check):
- A one-word broad or phrase negative blocks any query containing that word. TRUE (negatives do not match close variants, so plurals are not blocked).
- Change history shows the user and date for negative keyword changes. TRUE.
- A GA4 key event import and a Google Ads tag both set as primary for the same action double count. TRUE.
- View-only access exists in Google Ads (Read only), GA4 (Viewer) and GTM (Read). TRUE.

STYLE: no "I" opener, no em dashes, no bold, no bullets, no links, no sign-off name (9/4 rule), "our team" for delivery work.

---

Leads that aren't being recorded and valuable keywords ending up as negatives are often one problem, not two. When a real lead never reaches Google Ads as a conversion, the search that produced it shows cost and no conversions. A routine search term cleanup reads that as waste and blocks it. So the negatives can't be judged against the current conversion data.

Tracking comes first. We'd compare 30 to 60 days of real leads against what Google Ads and GA4 recorded, day by day. That shows what goes missing and what gets counted twice. Missing leads are often a form that never loads the thank-you page the tag waits for, or calls nobody tracks. Double counting is often a GA4 key event and a Google Ads tag both set as primary for the same lead.

Then every negative, including shared lists. A one-word broad or phrase negative blocks any search containing that word, even searches your own keywords are built to catch. Change history shows who added each negative and when, so you can see whether the additions line up with the tracking gap.

Plan for one tradeoff. Fixing tracking moves the reported numbers. When our team audited and rebuilt a telehealth account, we set a duplicate conversion action to secondary and warned the client that recorded conversions would trend down from then on, since past ones had been counted twice. Mark the fix date so nobody mistakes the shift for performance.

On your question, conversion troubleshooting is core work for us, but I don't do it personally. GA4 and GTM sit with our dedicated conversion tracking specialist, and search terms and negatives with our Google Ads specialist, while I stay involved on strategy. The audit runs on view-only access plus a few test leads agreed with you first, and ends in written findings with a ranked fix list.

Where do your real leads land today, a CRM or an inbox? That's what we'd check Google against. And roughly what's monthly Google spend, closer to $3,000 or $30,000? It sets how much search term history the review has to cover.
