# Upwork Proposal - UNSENT
Job (as pasted, no title supplied): "Seeking a freelancer to merge my Facebook and Google ads into a high-level account to improve lead tracking and reporting. The work includes consolidating ad performance data, setting up a more organized tracking structure, and building a funnel for automations. I'm looking for someone who can streamline ad management, improve visibility into lead sources, and help create a more efficient workflow for tracking and follow-up."
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-16 (Postgres now(), US Central)

SCREEN (read before sending):
- REPEAT / TWO-PROFILE: no upwork_jobs or upwork_leads row matches the description phrases ("high-level account", "merge my Facebook", "funnel for automations", "streamline ad management"). No existing draft (grep of .claude/agents/upwork-proposal-agent/drafts + docs/scratchpad, .claude/upwork-drafts, .claude/drafts, drafts, upwork-drafts). First sighting.
- READ OF THE POST: "high-level account" read as GoHighLevel (funnel + automations + lead sources + follow-up vocabulary). If the client meant something else, the draft misfires. Check the job title and skills tags before sending.
- ADS IN SCOPE: BORDERLINE, DQ REPORTED BEFORE DRAFTING. Center of gravity is the systems/implementation variant (GHL attribution, tracking structure, automation funnel). But ads are named ("my Facebook and Google ads", "streamline ad management") and there is no "not looking for someone to run ads" or "launch campaigns myself" line. Queenie chose "Draft: build leads into ads" (tracking + GHL build pitched as the step before judging and running the ads). Closest precedent: Nikki Cheatham 8/18 (GHL workflow + Google Ads + tracking, strategic_dq, booked a call).
- COHORT: upwork_jobs with GHL in the description = 175 bids, 0 won (116 with tracking/attribution language: 37 viewed, 8 messaged, 4 calls, 0 won).
- PLATFORM: Google + Meta = Samuel profile. Lindsey cannot pitch Google and has no personal GHL claim.
- SPEND: not stated, prose does not foreclose it. $5K screen UNMEASURABLE. Asked as a bracket ($5,000 vs $50,000 a month across both).
- GEO / PAYMENT VERIFIED / CLIENT HISTORY / JOB TYPE (hourly vs fixed) / POSTED BUDGET: not in the pasted text. All UNMEASURABLE. Check the job page before sending.
- LANDING PAGE / CRO: "building a funnel for automations" read as GHL follow-up automation. No CRO-gated questions, so the ads + landing page skip screen does not fire. Re-screen if the job page lists landing-page design as a deliverable.
- REQUIRED ITEMS: none (prose post, no questions).
- PRICING (OPEN, needs Queenie): no fee in the body. Upwork's bid field still needs a number. On record: onboarding $1,500/platform with the audit inside it, then % of spend. Whether a GHL automation build fits inside onboarding is UNRULED. If the job page is hourly, the never-bill-hourly carve-out (capped paid block that gates management) is the only fit.
- ATTACHMENT: none. match_proposal_context returned zero matches. 0 of 28 case_studies rows cover GHL, CRM, attribution, consolidation or offline conversions (live regex 9/16). Join Piper (only tracking-repair row) rejected: 10x headline vs 8.81x deduplicated, restricted-health vertical, and a Google duplicate-conversion fix is not this ask.
- DB LOG (upwork_proposal_logs INSERT): SKIPPED, contractor_query cannot INSERT. Mode would be strategic (DQ override).

VERIFIED (contractor_query, 2026-09-16):
- agent_knowledge fd1b546e "Dental Qualification Funnel -- Build Reference": Creekside's own funnel on creeksidemarketingpros.com. /api/csb/ghl-lead creates the GHL contact on form submit and "Maps form answers to GHL custom field IDs (gclid, fbclid, ... UTMs)". The booking page comes after the form. Our own property, not a client account, no performance results. Supports "click IDs and UTMs are saved to the contact at form submit, before the booking step".
- agent_knowledge 52fd8cab "ghl-crm-agent: Ad Attribution Custom Field IDs": fbclid + UTM custom fields created on the Get Pinnacle AI location 2026-05-29.
- agent_knowledge 3b444d29 (2026-06-01): SEQ 6 No-Show Recovery, SEQ 4 Post-Lead-Magnet No-Book, SEQ 2 Pre-Call Warm-Up built in GHL. "All sequences trigger on pipeline stage changes (not tags)". Supports the stage-trigger line.
- team_members (active): Jordan Tryon "Conversion Tracking Specialist"; Lindsey Bouffard "Account Manager – Meta Ads"; Ade Aderibigbe "Google Ads Specialist"; Ahmed Imran "Google Ads / PPC Specialist". Supports the by-role team line. Nobody named.
- case_studies: 28 rows. Regex for highlevel/ghl/crm/attribution/lead source/consolidat/offline conversion/gclid/automation/workflow/follow-up/tracking matched only Join Piper.
- Laleh GHL deliberately NOT cited: her GHL is run by First Up Marketing (outside vendor), agency-level not operator-level.

HIGHLEVEL PLATFORM FACTS IN THE DRAFT (primary help docs, fetched 2026-09-16):
- "Understanding Attribution Traffic Sources" (help.gohighlevel.com article 48001219997, last updated 26 Aug 2026). Paid Social (Facebook & Instagram Ads): "The 'utm_source' parameter contains the word 'fb_ad' for Facebook Ad". UTM matching "is case-sensitive". fbclid is NOT listed as a Paid Social condition. Paid Search (Google Ads): utm_source contains 'adwords', OR "The 'gclid', 'wbraid' or 'gbraid' parameter is present", OR a UTM is present with a google.com referrer. Others: "incoming calls, SMS, emails, WhatsApp messages, or Facebook messages". CRM UI: "created manually through the HighLevel App CRM".
- Instant forms: HighLevel's Facebook Lead Ads integration syncs lead-form leads into the CRM, and the Facebook Ad Reporting page (48001204042) lists "Facebook Lead Form" as an attribution entry point. The draft only says the fb_ad link rule "doesn't touch them". It makes no claim about how HighLevel labels them.
- "Facebook Conversions API Trigger in Workflows" (article 48001185099, modified 13 Aug 2026): "Facebook Lead Form Submission and Pipeline Stage Change are commonly used triggers". "If the contact does not have the required Facebook attribution information ... Meta may not be able to receive or correctly attribute the conversion."
- "Add to Google Ads" workflow action (article 155000003368, Feb 2026): needs GCLID/GBRAID/WBRAID on the contact; "only works for Form Submission, Order Purchase, Number Pool Calling, Survey Submission, and Chat Widget". Expert review also found stage-change triggers are still an open request on HighLevel's ideas board ("Update Triggers for 'Add to Google Adwords' to include Opportunity Stage change"). Supports "HighLevel's Google Ads action doesn't fire on stage changes". The Google return leg is worded as a separate upload matched on the saved click ID. Creekside has never completed an offline conversion import (return leg = zero), so no build or result is implied.
- "Google Ads Widgets for Dashboards & Reporting" (155000008112, modified 14 Jul 2026): total cost, clicks, conversions, impressions, by campaign, CPC; "Combine Google Ads widgets with Meta Ads and Google Analytics widgets on the same dashboard". "Dashboards: Meta Ad Widgets and Insights" (155000006608, modified 15 Jan 2026): Amount Spent, Conversions, Cost Per Conversion and more; "Add widgets from both libraries to compare channels side by side". Changelog "Sub Account Dashboards: Attribution Parameters on Opportunity Widgets": filter opportunities on First or Last attribution and UTM fields, graph by Session Source and Medium. Supports "one dashboard with spend from both ad accounts next to the pipeline split by lead source".

GENERAL GOOGLE ADS KNOWLEDGE IN THE DRAFT (not DB-backed, sanity check):
- Auto-tagging appends the GCLID click ID to ad click URLs. TRUE (Google Ads Help, auto-tagging).
- Google offline click-conversion imports match uploaded conversions on the stored GCLID. TRUE.
- Optimizing to later-funnel conversions means fewer, later conversion signals for bidding. TRUE (general).

REVIEW LOG:
- QC pass 1 (qc-reviewer-agent): MUST-FIX, the Google leg hung off "stage changes" as if HighLevel-native. FIXED (Google now "takes an extra step ... uploaded separately and matched on the saved click ID"). SHOULD-FIX, "auto-tagging" is not in the HighLevel evidence. KEPT as a true Google Ads fact, logged above.
- Expert review (expert-review-agent): (1) opener assumed landing-page traffic. FIXED by scoping the fb_ad rule to landing-page clicks and adding the instant-form sentence. (2) Google/Meta parity overclaim. FIXED, same as QC. (3) "consolidating ad performance data" unanswered. FIXED with the verified dashboard line. Kept the insight-first opener over the suggested "depends on how your leads reach you" opener, because the fb_ad rule wins the preview.
- Trimmed from 373 to 350 words.
- QC pass 2 (qc-reviewer-agent) on the revised text: No issues.

STYLE: no "I" opener, no em dashes, no bold, no bullets, no links, no sign-off name (9/4 rule), no fee, delivery work by role. 350 words / 2,019 chars.

---

Merging Facebook and Google into HighLevel only improves lead source visibility if HighLevel can tell where each lead came from, and Facebook is the strict side. When a Facebook or Instagram ad sends someone to a landing page, HighLevel counts that lead as paid social only if the link's utm_source contains fb_ad, in lowercase. Tag it facebook or fb and it never shows up as paid social. Instant form leads come in through the Facebook integration instead, so that rule doesn't touch them. Google is more forgiving, since the click ID auto-tagging adds is enough on its own.

Calls and texts land under Others and hand-entered leads under CRM UI, so if leads call in, they need call tracking or they won't tie back to an ad.

We built our own lead intake on HighLevel with this in mind. Click IDs and UTMs are saved to the contact at form submit, before the booking step, and each follow-up sequence triggers off a pipeline stage change rather than a tag, so the pipeline also shows where leads stall.

I'd go tracking first, then the follow-up automations, then one dashboard with spend from both ad accounts next to the pipeline split by lead source, so the ads get judged on what leads do after they come in.

From there, stage changes can go back to Meta through HighLevel's Conversions API action, so Meta can optimize toward leads that move forward instead of form fills. Google takes an extra step. HighLevel's Google Ads action doesn't fire on stage changes, so those updates get uploaded separately and matched on the saved click ID. The tradeoff is fewer, later conversions to learn from, so that step waits until lead volume can support it.

Tracking sits with our dedicated conversion tracking specialist and each ad account with a specialist on that platform, while I stay on strategy.

Do your Facebook leads come through instant forms or a landing page today? And roughly what do the two platforms spend a month, closer to $5,000 or $50,000? That sets how soon there's enough volume for that last step.
