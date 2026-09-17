# Agency "Paid Media Manager" for a portfolio of B2B clients (Google + LinkedIn emphasis, AI workflows) — Samuel, strategic + diagnostic — UNSENT

Profile: Samuel Rainey (strategic, diagnostic opener). Drafted 2026-09-16 (Postgres now(), US Central). Not sent.

## Job post (verbatim)

We're looking for a strategic, data-driven Paid Media Manager to join our growing Digital team. In this role, you will own paid media strategy end-to-end for a portfolio of B2B clients, leading campaign execution, optimization, and performance storytelling across platforms. We're especially interested in candidates who are excited about how AI can reshape paid media workflows and performance. You'll operate as both a strategist and an operator. Someone who can zoom out to define direction, then zoom in to improve performance. You're also excited about the evolving role of AI in paid media and are motivated to experiment with tools and workflows that make campaigns smarter and more efficient over time.

WHO YOU ARE
You have deep experience managing and optimizing paid media campaigns across Google, LinkedIn, Meta, and Microsoft Ads (with an emphasis on Google & LinkedIn).
You have agency experience working with B2B clients and understand the nuances of longer sales cycles and lead quality.
You're confident owning paid media strategy end-to-end across multiple client accounts.
You're skilled in audience targeting, bid strategy, budget allocation, and A/B testing.
You're highly analytical and comfortable using performance data (CTR, CVR, CPA) to guide decisions and improve outcomes.
You're able to manage several clients at once and navigate shifting priorities with strong organization.
You're a clear communicator who can translate performance into insights and recommendations that clients understand and trust.
You're experienced in building reporting decks, ideally in Figma, and can clearly showcase impact and value.
You take ownership of your work, operate independently, and proactively seek answers or solutions when needed.
You contribute to team growth by building or improving internal documentation, templates, and processes.
You're curious about AI and automation, and interested in applying new tools to improve efficiency and campaign performance.
Experience with Demandbase, Reddit, Taboola, or other emerging platforms is a plus.

WHAT YOU'LL DO
Own paid media strategy and execution across a portfolio of B2B clients, ensuring campaigns align with client goals and KPIs.
Build, launch, and optimize campaigns across Google, LinkedIn, Meta, and other relevant platforms.
Continuously monitor performance and make data-driven optimizations to improve efficiency and results.
Develop and test audience strategies, creative approaches, and landing page hypotheses to drive growth.
Manage budgets and pacing to ensure spend is aligned with performance and client expectations.
Build clear, insight-driven reports and presentations that communicate results and next steps to clients.
Partner closely with internal teams across strategy, analytics, and creative to deliver integrated campaigns.
Ensure proper tracking and attribution, including UTM structure, conversion tracking, and platform setup.
Stay current on platform updates, industry trends, and new opportunities, bringing proactive recommendations to clients and the team.
Experiment with AI tools and workflows to streamline recurring tasks like reporting, QA checks, and performance analysis.
Help develop and refine internal systems, templates, and lightweight automation that improve team efficiency over time.
Contribute to a culture of testing, learning, and continuous improvement across the paid media team.

## Screens

- Already drafted / already bid: NO. `upwork_jobs` checked on `job_description` (Demandbase, "performance storytelling", "zoom out to define direction", "ideally in Figma") and `job_name` ILIKE "Paid Media Manager": 15 title hits, every one a different post. No file in `.claude/upwork-drafts/`, `.claude/agents/upwork-proposal-agent/drafts/`, `drafts/` or `upwork-drafts/`. No Lindsey twin possible (she can't sell Google or LinkedIn).
- White-label: FIRES, first sighting. An agency hiring a seat for its own clients: "own paid media strategy end-to-end for a portfolio of B2B clients", "reports and presentations that communicate results and next steps to clients", "agency experience working with B2B clients". Front-facing variant (Imaginarium 8/7, Mariner11 8/12). Reported before drafting with skip recommended; Queenie chose **"Draft anyway, gaps stated"**. Keith and Jay offered as options three and four, not taken.
- Seat: no literal "full time", so that rule did not fire on the words. Supporting tells only (job title as the ask, WHO YOU ARE / WHAT YOU'LL DO voice, internal docs/templates/team-culture duties). Draft states we'd come as an agency team, not a single hire.
- Geo: US or Canada (Queenie, from the listing). Payment verified, rate OK (Queenie).
- Spend: unmeasurable, the budgets are their clients'. Asked per account as a $5,000 vs $50,000 bracket.
- Proof: LinkedIn Ads hard zero (0/28 `case_studies`, 0 `clients`, re-verified 9/16); Reddit, Taboola, Demandbase, Figma 0 in `case_studies` and `clients`; the one `agent_knowledge` Figma row is the "Lead Magnet Tools Suite" project decision, not reporting. Microsoft: South River Mortgage ran alongside Google Dec 2025-Feb 2026, churned, no results. `reporting_clients` platforms: meta 60, google 29, email 7, other 4, chatgpt 4, lsa 1, programmatic 1, tiktok 1.
- Attachment: NONE. The B2B PDFs (ReferPro, Axle) have empty Results blocks; Winterbotham is consumer legal with the localhost footer.
- Pricing: not asked, not included.

## Verified facts used

- Google Ads Help 6270625, "Understand your conversion tracking data" (WebFetch 2026-09-16): "The primary conversion columns mentioned above are calculated based on the time of the click, not the time of the conversion." "For example, if your ad was clicked on last week and that traffic converted this week, both the click and the conversion are reported back to last week in the primary conversions columns." "You can also report on conversions based on the time the conversion occurred." Time-of-conversion columns include "Conversions (by conv. time)".
- Google Ads Help 2375435 (WebFetch 2026-09-16): "Google Ads reports conversions from the date and time of the click that led to the successful action, not from the date of the successful action itself."
- Google Ads Help 15081888, "Guidelines for importing offline conversions" (WebFetch 2026-09-16): "Offline conversions that were uploaded more than 90 days after the associated last click won't be imported into Google Ads and, therefore, won't show up in your conversion statistics." "Offline conversions for enhanced conversion leads that were uploaded more than 63 days after the associated last click won't be imported into Google Ads." Help 10029210, "Offline conversion imports FAQs": "We retain the GCLID for only 90 days." Surfaced by expert review, verified by the main session.
- IVC audit (Industrial Video & Control, delivered 2026-08-27, Google Ads + Microsoft Ads, read-only access): headline finding per the delivery record in memory, the only working conversion action fired on a thank-you page view, so support requests counted as leads. Cited unnamed, number-free, as audit work. **Reuse ruling still pending; this is the fifth proposal to cite it.**
- Offline conversion imports: zero as a delivered build (methodology only). Click ID + UTM passthrough is real (The Tooth Co, CallRail DNI + GCLID/UTM). Draft describes the import leg as the first build we'd take on, not a shipped one. "Dedicated conversion tracking specialist" = Jordan Tryon's verified role wording, named by role only.
- `scheduled_agents` `ad-account-monitor` (contractor_query 2026-09-16): enabled, cron `0 11 * * 1-5` (6am CT weekdays), run_count 164, last run 2026-09-16 success; `agent_run_history` 82 runs, 82 success. Rules: account live, schedule, budget pacing, KPI trend, frequency, pixel + CAPI. Test phase, digest to Cade + Lindsey. `client_monitoring_rules`: 4 rows, all Meta, all enabled (Chris Ideson Meal Prep, Punch Drunk Chef Meal Prep, Doctor Laleh, Quivr). Described as automated, never as AI.
- `scheduled_agents` `report-health-monitor`: enabled, cron `30 11 * * 1-6`, run_count 120, last run 2026-09-16 success; `agent_run_history` 60/60. Hits each active client report page and its data endpoint, alerts on 404, "Report Not Available", API errors or empty data.
- Not usable: meta-audit-agent / ad-copy-editor-agent / report-editor-agent have no run history, so no "we use AI agents for X" claim.

## Review log

- v1: 386 words / 2,206 chars.
- qc-reviewer-agent on v1: PASS WITH FIXES, no blockers. Applied: "that's the slide where a client asks..." softened to "which is often the slide where...". Nit applied in spirit: the monitor no longer sits next to the word AI (paragraph now opens "For recurring QA"). Nit carried to delivery: IVC reuse ruling still pending.
- expert-review-agent on v1: Good, not Strong. Applied: the 90-day / 63-day import ceiling (verified above) as its own paragraph, reframed as a stage choice on long deals rather than a parenthetical; LinkedIn given its own sentence; AI tied to Google plus a first-pass analysis idea (forward-looking, no claim of current use); reporting/team line trimmed ("agency" dropped before "team"). Its note that no wording rescues zero LinkedIn against a Google + LinkedIn seat is carried to delivery.
- v2: see body. Focused QC pass on the v2 changes pending.

---

## PROPOSAL (paste-ready)

On B2B accounts with long sales cycles, the newest month in a client's reporting deck looks worse than it will end up. Google Ads reports conversions back to the day of the click, so a lead that turns into a qualified opportunity six weeks later, once it's imported from the CRM, lands in a month that's already been presented.

Set that month beside one that's had time to fill in and cost per opportunity looks like it jumped, which is often when a client asks to pull budget from a campaign that's actually working. I'd compare every month at the same age, say 60 days after its clicks, flag the newest as still filling in, and watch recent volume in Google's conversion-time columns, which count each one on the day it happened.

Past a point it stops filling in. Google won't import an offline conversion uploaded more than 90 days after the click, or 63 with enhanced conversions for leads, so on a six-month deal the closed sale never makes it back, and bidding has to learn from the qualified opportunity.

That only helps if the imported conversion means something. Last month our team audited an industrial manufacturer's Google and Microsoft accounts, and the headline finding was support requests being counted as leads. The first build I'd give our dedicated conversion tracking specialist saves click IDs and UTMs with every form fill, so qualified stages have something to match back to.

For recurring QA, our team is testing an automated morning check on four client Meta accounts. Before the day starts it flags pacing, frequency, KPI trend and pixel health, and a separate check confirms every live client report loads with real data. Next I'd extend it to Google and put AI on the first pass of each month's analysis, starting with catching an unfinished month before a client sees it.

The main gap is LinkedIn Ads, which our team hasn't run. We run Google and Meta, have run Microsoft alongside Google, and haven't touched Demandbase, Reddit or Taboola either. Reporting runs on live dashboards, not Figma decks, and we'd come to this as a team rather than a single hire.

How many B2B accounts would this cover, and what does a typical one spend a month, closer to $5,000 or $50,000? And is LinkedIn judged on the same pipeline stages as Google, or on its own lead forms?
