# Matthew Kelly (Basis / Midnight Brands), telehealth tracking sprint: lead reply

- Profile: Peterson Rainey (General profile)
- Job: "US Telehealth Google Ads + Tracking Expert - GLP-1 / LegitScript Experience Required" (upwork_jobs 1ec67213, bid $1,500 fixed, applied 2026-09-02)
- Thread: proposal, then Matthew 2026-09-06 (questions A-I, never answered), then Matthew 2026-09-20 06:58 UTC (6 questions, deciding now)
- Status: UNSENT. Built from SDR agent Response 1 with edits in the main session. QC 2026-09-21: PASS WITH FIXES; written handover named in scope, "keyed on" changed to "tagged with" the order ID.
- Pending before send: $1,500 price, next-business-day start, 3-day findings and 2-week plumbing timing, and Peterson taking the findings call. The SDR rules need Peterson's approval on price and timelines.

---

Hi Matthew,

1. Yes.

2. Yes. Our team starts the next business day after the contract and access are in.

3. $1,500 fixed for the full sprint.

In: everything you listed, plus a findings call with me and a structural review of the Google Ads account, including whether the restricted-drug limits are holding traffic back. The build means GCLID and UTMs captured on the landing page, a first-party ID as the only thing passed into Remedora, and a webhook join from order to ID to click, imported into Google Ads. QA runs on test orders, the map shows the source of truth for each column in your daily sheet, and the written handover covers how to keep it running.

Out: anything Remedora has to build or change on their side, custom development beyond the capture-and-import plumbing, campaign restructuring, and ongoing account management. The ad hoc role after handover gets scoped separately.

4. No, not personally. The build and QA are done by our dedicated conversion tracking specialist, and the Google Ads review by our Google Ads specialist. None of it leaves our team. I own the architecture, the findings and the call with you, and stay across the build through handover. So the design you've seen here stays with me, and the build isn't waiting on my calendar.

5. Google Ads admin, or link it to our manager account. Edit access to the Lovable project, or time with whoever deploys it. Remedora's integration settings, webhook docs and a test order path. We don't need patient records. PostHog and Clarity admin, Ortto read-only, Stripe read-only if the account is yours rather than Remedora's, and the daily sheet. The table joining your first-party ID to the click lives on your side, not ours.

6. Initial findings within about 3 business days of full access. Core plumbing live within about 2 weeks of access, depending on what Remedora's webhook settings allow. It counts as working once real authorisations and captures have flowed through and matched in Google Ads, which at current spend takes days of data, not hours.

If checkout-first puts payment ahead of the questionnaire, authorisation becomes the first event worth pointing Google at, and it carries no questionnaire data. The trade-off is that anyone who pays and then doesn't qualify now sits between authorisation and capture, so capture rate becomes the number to watch, and it's the first number the plumbing should give you. Authorised and captured go into Google Ads as separate conversion actions, each tagged with the order ID, only one primary at a time so nothing counts twice, with voids and declines retracted on the same order ID.

Kept out on purpose: questionnaire answers, BMI, diagnoses and prescriptions in any marketing tool, session recording or product analytics on the intake and checkout pages, and drug names in conversion action or campaign names. Can Remedora limit its webhook payload to the fields you pick, or does it send the whole order record? That decides whether anything clinical ever passes through what we build.

Go ahead and send the fixed-price contract through Upwork, and once it opens we'll share where to send access.
