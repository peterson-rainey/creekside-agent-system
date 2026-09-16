# Upwork Proposal: Merge Facebook + Google ads into a "high-level account" (GoHighLevel), lead tracking, reporting, automation funnel

- **Profile:** Lindsey | **Style:** lindsey_default | **Date:** 2026-09-16 (Postgres now()) | **Status:** UNSENT
- Request said "Lindsey's strategic + diagnostic style - write it in lindsey_default". Lindsey has one style (`lindsey_default`), which already opens on a diagnostic question. Resolved in the request itself, not re-asked.
- **Attachment:** NONE. No case-study PDF covers GHL, CRM, tracking or consolidation work, and Vida Dentistry has no PDF. Results-reference line deliberately omitted.
- **Version:** v3 FINAL. 286 words / ~1,640 chars. QC (qc-reviewer-agent): SEND-READY after one fix, applied ("which platform each booked consultation came from" generalized Google-only pipeline evidence; now "trace a lead from its ad to a booked consultation"). Expert review: no technical errors (cross-platform double counting and manual GHL opportunity value both web-verified); applied "counted once across both platforms" (consolidation), the automations framing on message ads (funnel for automations), and named who executes (two specialists: Google campaigns, GoHighLevel side). Rejected its "so nothing routes through a black box" line and any spend ask or GHL-attribution-bucket angle (twin territory).
- **TWIN EXISTS, SEND ONE PROFILE:** `.claude/upwork-drafts/2026-09-16_ghl-merge-facebook-google-lead-source-tracking-automations_samuel_strategic_UNSENT.md` (parallel session, saved while v1 was being written). v1 collided on the spend bracket + lead-volume rationale and the "last step" framing. v2 drops the spend ask (the twin asks it), drops the hold-budget-until-tracking-works beat (the twin's tracking-first sequence), and has zero shared 3-grams with the twin body.

## PROPOSAL (paste-ready)

If you add up the leads Facebook reports and the leads Google reports for last month, does the total match the new contacts who actually came in? It rarely does. Each platform counts by its own rules, so someone who clicked both ads can get counted twice, and connecting everything to GoHighLevel doesn't change what either platform reports. What it can change is which number you run the business on. That should be the contacts in your CRM, counted once across both platforms, with each platform's own count kept for decisions inside that platform.

I ask because I manage the ads for a dental practice where Facebook ads and Google ads both feed one GoHighLevel account. I run the Facebook side day to day and work with two specialists, one running the Google campaigns and one building out the GoHighLevel side.

On that account, GoHighLevel could trace a lead from its ad to a booked consultation. Revenue was a different story, because it only shows up once someone at the practice enters what the patient agreed to. That's the number an owner judges the ads on, so if entering it isn't part of anyone's routine, the reporting stops right before the part that matters.

Message ads taught me the most about automations. They fill an inbox fast, and without a couple of qualifying questions built into the flow, whoever answers them ends up buried sorting serious patients from casual ones.

When a lead becomes a paying customer today, where does that sale get recorded, if anywhere? That answer decides how much of the reporting can update automatically and how much depends on a person.

There's a short video on my profile that shows how I work.

---

## Screening notes (internal)

| Screen | Result |
|---|---|
| Already drafted / two profiles | PASS. `upwork_jobs` has no row matching "merge my Facebook", "high-level account", "funnel for automations" or "visibility into lead sources". Grep of `.claude/`, `drafts/`, `upwork-drafts/` empty for this post. |
| No ads in scope (systems/implementation variant) | PARTIAL FIRE, ALREADY RESOLVED: Queenie chose "Draft: build leads into ads" on the Samuel twin. Not re-raised. Most of the scope is plumbing (consolidate data, tracking structure, automation funnel, follow-up workflow). But ads are live on both platforms, "streamline ad management" is named, and nothing excludes management. Not the hard stop; report-and-ask. |
| Platform fit (Lindsey) | PARTIAL. Facebook is hers. Google Ads is banned as her service, and the GHL build and tracking sit outside her doc. Draft claims only the Facebook side; Google and tracking are attributed to specialists she works with. |
| Ad spend ($5K / her $3K floor) | UNSTATED, not foreclosed. NOT asked in v2 because the Samuel twin asks it. If Lindsey's is the one sent, spend stays unasked. |
| Geo, payment verified, rate | UNKNOWN. Check the job page before sending. |
| White-label / full-time / coaching | PASS. Owner's own ads ("my Facebook and Google ads"). |
| Required items | NONE. 200-300 word band applies. |
| Pricing | No fee named. Build scope has no spend base; post did not ask for a rate. |
| Interpretation | "High-level account" read as GoHighLevel (paired with "funnel for automations" and follow-up workflow). Confirm before sending. |

## Verified facts used (contractor_query, 2026-09-16)

- **Vida Dentistry** (`reporting_clients`): Meta operator Lindsey B. + account manager Lindsey B.; Google operator Ade, account manager Lindsey B. Client start 2026-07-09 (`clients`). Active.
- **GHL on Vida:** Cade 7/20 Fathom ("we'll own his Go High Level tracking and his landing pages"); Cade 7/15 (GHL workflows set up by Jordan, the tracking specialist).
- **(Used in v1 only, cut in v2 for twin divergence) Held budget until GHL confirmed:** Lindsey, 9/9 Lindsey/Cade/Pete Sync (fathom `af8ee02c`): "we started your spend out low because we wanted to confirm GoHighLevel was working, the flows were working, confirm your leads. And then we barely started increasing it." Meta spend supports the raise timing: about $1,040/wk 7/20 to 8/10, raised to $1,867 the week of 8/31 (`meta_insights_daily`). Draft claims the Facebook budget only.
- **Message ads + qualifying questions:** same call. Owner "freaking out about the whole engagement ads", "hasn't liked how the automations have come in"; Lindsey sent a doc to "put more qualifications in here so we can help you weed out some of these people... help with the overwhelm and help you book consultations". Implementation not confirmed, so the draft states the lesson, not a completed fix.
- **Booked consults by source visible, revenue not:** Ade, 9/9 Gemini notes (gmail_summaries `3fe1b562`): Google leads visible in the GHL pipeline "turning into actual appointments"; "one that I cannot see for them is revenue". Owner 9/11 message (Lindsey, 9/15 call): revenue from booked consults and cases was down, "only tracked like 9,000 in cases from go high level".
- **Tracking specialist / Google specialist roles:** Jordan Tryon (Conversion Tracking Specialist), Ade (Google Ads Specialist). Named by role only. "I work with a tracking specialist" is the sent 9/16 FRQNCY wording.

## Not used, and why

- Vida CPL ($276.10 over 12 months) and Ade's "$192 cost per booked appointment": the 12-month figure mixes the prior agency's period, and the $192 is a 4-appointment sample off one schedule. Account is currently contentious (owner's 9/11 revenue complaint). No numbers cited.
- The Tooth Co "Go High Level connection" issue (Lindsey 8/17): details not on record.
- Creekside's own GHL location (Get Pinnacle AI) and dental funnel click-ID build: Creekside's own sales CRM, not Lindsey's work, and agency framing is off-limits on her profile.
- "Built and sold my own e-commerce business" / "10+ years": dropped for length and relevance on a lead-gen CRM post.

## Commitments made in the body (flag before sending)

- None priced. Implied approach only: CRM contacts as the one decision number, platform counts kept for in-platform decisions, revenue entry as part of someone's routine, qualifying questions in the message-ad flow.
- DB log to `upwork_proposal_logs`: SKIPPED (contractor_query cannot INSERT).
- Cohort context from the twin's screen: 175 prior bids on GHL-language posts, 0 won (116 with tracking/attribution language: 37 viewed, 8 messaged, 4 calls).
