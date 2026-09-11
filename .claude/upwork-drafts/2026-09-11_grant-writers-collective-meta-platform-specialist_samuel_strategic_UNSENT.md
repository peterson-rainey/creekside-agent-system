# Upwork Proposal - UNSENT
Job: Meta Ads Platform Specialist (Technical Expert & Guide), The Grant Writers Collective (online grant-writing course, women-owned startup). Works with Head of Marketing Josh, who owns strategy. Build/optimize campaigns, pixel + custom conversion events, weekly performance data (cost creep, audience fatigue, conversion drops), creative feedback, spend decisions, teach Josh the reasoning.
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-11 (Postgres now(), Central)

SCREEN: Queenie chose "Draft it" at the fork, based on the post body. The attached PDF (read after the fork) adds: "Starting pay at $65+/hour", "roughly 5-10 hours per week on a monthly retainer", "paid test project first before moving into the regular retainer", and a "What you won't be responsible for" clause (ad funnel structure, ad creative and copy). No rate is demanded from us, so contract type is never raised and no rate, hours or fee is typed. The paid test fits the IVC carve-out entry shape. The retainer behind it is hours-based. Spend and geo are stated nowhere, so the $5K screen is UNMEASURABLE and this draft is PROVISIONAL. Duplicate-bid check in upwork_jobs is clean.

APPLICATION ROUTE: the PDF says apply via Google Form (forms.gle/i2555sgQn9pv1RMS8), priority review by Sept 21. Form fields: Full Name, Email, Phone, "link your experience & case studies" (Drive links, anyone-with-link access), "Why does this position pique your interest?" (Loom preferred). Not filled or submitted.

VERIFIED (live via contractor_query, 2026-09-11):
- Master Spa Parts (Meta ecom, operator Lindsey B., CHURNED 2026-05-28, past tense, not named): Oct 2025 $15,699.86 spend / CPM $8.06 / CTR 1.587% / CVR 1.848% / CPA $27.50 vs Dec 2025 $15,681.83 / CPM $11.68 / CTR 1.859% / CVR 1.398% / CPA $44.93. CPM x1.449 (+45%), CTR x1.171 (+17%), CVR x0.757 (-24%, "about a quarter"), CPA x1.634 (+63%). Decomposition checks: 1.449 / (1.171 x 0.757) = 1.635. No cause is claimed for the CVR fall.
- Adventures in Wisdom (Meta, operator Scott C., ACTIVE, last spend day 2026-09-10, $4,455.97 last 30d, 6 campaigns spending): adult certification program, registration funnel. Presence only, NO number (standing rule).
- Own site: agent_knowledge "Website Tracking Setup -- GTM + Meta Pixel" (2026-08-14): second GTM container GTM-KFQDMCH5 removed from funnel pages, consolidated to GTM-MWQVSPJ. Stated as "our own site", not a client.
- No CAPI implementation claimed (service-line zero). No certifications claimed. No links, contact info, attachment, or sign-off name. No pronoun used for Josh.
- QC (qc-reviewer-agent): PASS WITH FIXES. Fix 2 applied (word count: dropped "actually" and "not less"). Fix 1 (delete the certification-program sentence) partly applied: the "familiar ground" capability claim was cut and the sentence kept as presence plus structure. QC misread "never as a reference", which in the standing rule means never offer the client as a contact. Citing the vertical and how the funnel is built is explicitly allowed.
- ATTACHMENT: none in the Upwork proposal. The Google Form wants case-study links. The AiW PDF (1Q4IAix...) is Samuel-attachable only with the Jan-Oct 2025 window stated, and sharing it means setting a Drive file to anyone-with-link, which is Queenie's call. Master Spa Parts has no PDF.

---

On a course funnel, cost creep, audience fatigue and a conversion drop all show up in Ads Manager as the same number going up, cost per result, and each one needs a different fix. Cost per result is built from three numbers: what impressions cost, how many people click, and how many of those clickers convert. CPM rising on its own is the auction getting more expensive. Click-through rate sliding while frequency climbs is fatigue. Conversion rate falling while clicks hold points past the ad, to the page, the checkout or the tracking. Splitting those apart every week tells you which problem you have before anyone moves budget or pulls a creative.

In an ecommerce account our team ran, cost per conversion rose 63% from October to December on nearly identical spend. CPM was up 45%, and click-through rate rose 17%, so people were clicking more. What fell was conversion rate after the click, down about a quarter. Rotating out creative would have been the wrong move there, because the ads were still pulling their weight.

That's also why tracking gets checked before any of those numbers are trusted, since a conversion drop is sometimes a tracking drop. When the sale completes on a course platform's checkout instead of your own domain, that handoff is where events go missing or fire twice, and a custom conversion built on a thank-you page URL can break quietly the day that URL changes. On our own site we recently found a second Tag Manager container firing on the funnel pages and consolidated down to one. Duplicate containers and doubled events are the first things we look for.

We currently run Meta for an online certification program for adults, where the ad earns a registration and the sale comes later.

On working with Josh: a Meta specialist on our team would be Josh's go-to for the build, the tracking cleanup and the weekly report, with the reasoning written into each report next to the numbers, so it's clear which of the three moved and why the recommendation follows. Over a few months that's what lets Josh read the account without needing us for every decision. I stay involved on the strategy reviews.

Roughly where does monthly Meta spend sit today, closer to $3,000 or $30,000? And does checkout happen on your own site or on the course platform?
