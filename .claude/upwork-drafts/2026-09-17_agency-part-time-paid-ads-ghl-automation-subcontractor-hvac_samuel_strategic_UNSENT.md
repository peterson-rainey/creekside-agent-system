# Upwork Proposal: Part-Time Digital Marketing, Paid Ads & Automation Specialist (agency subcontractor, home services)

- **Profile:** Samuel | **Style:** samuel_strategic | **Date:** 2026-09-17 | **Status:** UNSENT, v1
- **SCREEN:** White-label DQ fired ("reliable extension of our team", "our clients", occasional client Zooms = front-facing variant). Also fired: US-based freelancers only (worker location), hourly rate required at 10-20 hrs/mo (never bill hourly), mostly non-ads scope (SEO, WordPress, video, citations), no ad spend stated. Queenie chose "Draft anyway, gaps first." Grep of `.claude/upwork-drafts/` found no earlier draft of this post. The 9/11 agency paid-social post (SKIPPED) is a different job.
- **NO DB ACCESS THIS SESSION** (no Supabase connector). Every fact below comes from memory notes that were verified earlier, not re-checked live. `upwork_jobs` second-profile check NOT run: check whether Lindsey already bid before sending.
- **Attachment:** NONE (the LawnValue PDF URL serves HTML; Green Shield PDF content never read).
- **Hourly field:** body gives no rate. If Upwork forces an hourly bid, that's Queenie's call.

## PROPOSAL (paste-ready)

Two things in that HVAC setup break more often than the automations do. HighLevel only files a Facebook or Instagram lead as paid social when utm_source contains "fb_ad", and that match is case-sensitive, so a site tagged utm_source=facebook quietly drops Meta leads out of the paid social bucket. And plenty of HVAC leads never reach the website. A call placed straight from a Google ad can only be imported as a conversion if the call asset uses a Google forwarding number, so putting the shop's own number there leaves those calls out of the reporting.

How we'd set it up:

1. Capture: hidden fields hold the click ID and UTMs on the contact, so the source survives all the way to the sale. A service-type field on the form decides which pipeline the lead lands in.
2. Follow-up: the form submission fires SMS and email right away with a booking link to that service area's calendar, plus an internal alert so the office calls too. Missed calls get an automatic text back. No booking means a short sequence over a few days that stops the moment they book or reply.
3. Pipeline: repair, replacement and maintenance usually earn separate pipelines, with stages for booked, showed, quoted and sold.
4. Results back to the platforms: Meta's Conversions API action can fire on a pipeline stage change, so booked and sold jobs go back to Meta. HighLevel's Add to Google Ads action doesn't run on stage changes, so a workflow webhook passes the saved click ID and the stage into Google as an offline conversion import.
5. Retargeting: contacts who didn't book go into a Meta custom audience and a Google customer list, layered on top of pixel and Google tag audiences for visitors who never filled anything out. Sold customers get excluded.

Local Services Ads leads arrive through Google's own calls and messages, not the form, so they need their own path into HighLevel. And where the job actually closes, ServiceTitan or Housecall Pro versus HighLevel, decides whether step 4 needs a Zapier bridge.

On fit, so there are no surprises: we're a small US agency, not a solo freelancer, and our team does the work. If "US-based" needs to apply to every person touching your accounts rather than the business you contract with, that's worth knowing now. We also price ad management as a percentage of ad spend rather than by the hour, so there's no hourly number here.

Your list:

Google Ads / LSA: Google is our core. For a Tennessee home services company, Local Services Ads brought in 230+ phone leads and 70+ message leads over twelve months, running alongside Search.

Meta: The other half of what we run. On a dental implant account, Meta lead forms fed a call center, 2,558 leads in under three months. We added qualifying questions and pulled spend back on purpose when the call center couldn't keep up.

GoHighLevel / automation: We run HighLevel on client accounts, with a dedicated tracking specialist who builds the workflows and handles GA4 and Tag Manager.

SEO: Some Google Business Profile work. Broader SEO and backlink work isn't something we sell.

Video: We write the hooks, scripts and briefs. Editing isn't in house.

Home services: Beyond the LSA account, Google Ads for a pest control company and an asphalt paving company.

Strongest: Google and Meta lead gen for local businesses, tied into the CRM so the reporting reaches booked jobs.

Roughly what do your clients spend on ads each month, closer to $3,000 or $15,000?

---

## QC log
- qc-reviewer-agent: PASS WITH FIXES. Applied: "shows as direct traffic" softened to "drops out of the paid social bucket" (the notes don't back the Direct fallback). Changed the Google Business Profile line to "Some Google Business Profile work". Rejected the reviewer's "contracted out" reading: the account in our notes pays us for that work, it isn't outsourced. US-based flag already decided by Queenie.
- expert-review-agent: Good. Applied: named the webhook bridge for the Google import, pixel/tag audiences in retargeting, a separate LSA path, missed-call text back, a service-type field for pipeline routing. Cut the pest control $92.60/79 figure, since it shows no ticket or close-rate context.
- Unverified in body (general platform knowledge, not in notes): LSA leads needing a separate path, missed-call text back, the Zapier/webhook bridge.
- DB log to upwork_proposal_logs: SKIPPED (no DB this session).
