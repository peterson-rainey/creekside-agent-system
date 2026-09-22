# PI law firm, Meta lead gen + landing pages + CRM/webhook intake + Pixel/CAPI (anonymous) — Samuel strategic — UNSENT

Drafted 2026-09-22. No DB access this session; facts from memory files verified 9/16-9/17.

## Screens
- Required items: Meta for professional services, "ideally" PI. Big Chad Law (AZ PI, Google + Meta + LSA) satisfies it; no Meta-specific number exists, disclosed.
- Q2 legal CRMs: no Clio/Filevine/Lawmatics build on record; HighLevel only, disclosed.
- Landing pages: one of five responsibilities, zero CRO-gated screening questions, so BELOW the two-question line in reference_no_landing_page_cro_case_study. Zero LP results, disclosed; landing page developer named by role.
- Spend, geo, payment, rate: not in paste. Spend asked as $5,000 vs $30,000.
- Same-client check UNVERIFIED (no DB): could be Justin Nelson PI-law Meta lead (Dec 2025). Check upwork_jobs / upwork_leads before sending.
- Attachment: Big_Chad_Law_Legal_Case_Study_(1).pdf, Drive id 12s-vrheRosxUbskK0Kw6tD6BDqUDTg9c. Visible byline "By: Samuel Rainey" vs the renamed Peterson profile: flag.

## Review log
- qc-reviewer-agent PASS WITH FIXES: applied Clio (not Clio Grow), iframe line scoped to HighLevel, CAPI line in "we'd" tense, Q1 answered explicitly, trimmed.
- expert-review-agent Good: applied policy softening ("the kind of language ... bars"), Meta vs bar review split, A/B testing line. REJECTED "50 leads/week" swap (Meta doc says 200/month, verified 9/16). Skipped TCPA consent line (unverified legal claim, word budget).
- Final: 422 words / 2,400 chars.

---

## PROPOSAL (paste-ready)

Getting a Meta ad lead into your CRM as a qualified case is two different builds, and the one you pick decides what Meta learns from. Meta will only optimize toward a CRM stage like "qualified" on Instant Form leads, at 200 or more leads a month, with that stage reached within 28 days of the lead. Leads from your own landing page go back through the Conversions API instead, where we choose the event.

Either way, I'd send back the intake result, not the signed case. Meta's standard click window is 7 days at most, so a retainer signed three weeks later teaches delivery nothing.

On Meta, our legal work is personal injury: our team ran Meta, Google and Local Service Ads for an Arizona PI firm. The attached case study shows 102 cases from April through a partial September 2025, about $950 per case on total ad spend across channels. That's not Meta-only, and I have no Meta cost per case from it I'd stand behind. That account has since ended. Bankruptcy we've run on Google only.

On CRMs, most of our integration work is in HighLevel. I haven't built into Clio, Filevine or Lawmatics, so we'd confirm what yours accepts through its API or webhooks first.

For zero drop-off, the form posts straight to the CRM through its API or webhook, with Zapier or Make only where there's no native connection. We'd have the same submission fire the pixel Lead event and a Conversions API event sharing one event ID, with the click ID and UTMs in hidden fields, since HighLevel forms load in an iframe Tag Manager can't read. Then the failure path: every submission alerts intake instantly, failed runs get retried and flagged, and Ads Manager lead counts get matched against the CRM daily.

A hook like "Were you hurt in a crash?" asks about the viewer's physical health, which is the kind of language Meta's personal attributes policy bars. State bar rules are a separate check, so your sign-off on every ad and page comes before launch.

Our Meta specialist runs Ads Manager, our tracking specialist builds the tracking and CRM connections, and our landing page developer builds pages, with me on strategy. Tests change one thing at a time, creative first, judged on cost per qualified lead. I don't have a landing page before-and-after to show you. Reporting is every two weeks plus a live dashboard.

Which CRM does your intake team work in, and is Meta spend closer to $5,000 or $30,000 a month?
