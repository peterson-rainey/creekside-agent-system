# Upwork Proposal - Australian psychology multi-location clinic, Google Ads + PMax, conversion tracking, CRM/call-tracking integration, AI optimisation
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-08
Date confirmed via Postgres now() = 2026-09-08 (local shell clock said 09-09, off by one).

## SCREENS RUN
- Ads in scope: YES. Google Ads management + PMax optimisation is item 1. Tracking, landing-page advice
  and AI systems are additive, not a replacement for ads.
- Geo: AUSTRALIA. Inside the US/CA/UK/AU allowed set. PASS.
- Spend: NOT STATED. Blocking. Under $5K/mo this is a skip. Asked as a relative range in the close.
  No pricing quoted anywhere, since % of spend cannot be computed against an unknown spend.
- Landing pages: "advise on" only, NOT owned. The ads+landing-page-owned-together skip does not fire.
  Only one CRO-adjacent ask, not two.
- Not white-label, not coaching, not a full-time seat, not profit-share, not detection-evasion,
  no worker-location requirement, payment method not visible (logged out).
- Experience gate: "5+ years Local SEM". Samuel = 6 years. Meets it. Stated once, briefly.
- Required items: 3 explicit questions (systems integrated / complex-structure examples / health or
  psychology). All three are answerable. No unanswerable proof demand, so no foreclosure.
- Duplicate bid: grepped both draft folders. No psychology or Australia draft exists. No matching
  upwork_leads row. Clear.
- NO exclusion clause in this post, so the 2026-09-05 attach-nothing ruling does not fire.

## VERIFIED LIVE THIS SESSION (contractor_query, 12mo window to 2026-09-07)
- **PSYCHOLOGY = HARD ZERO.** Zero rows in `reporting_clients` matching psych/mental/therap/counsel/behavio.
  Disclosed outright in the body rather than papered over with an adjacent health account.
- **PMax vs Search head-to-head, same account, our health book. Splits 2-2, does NOT support a
  blanket "PMax loses" claim:**
  | Account | PMax CPA | Search CPA | Winner |
  |---|---|---|---|
  | Integrity Naturopathic | $50.25 | $37.61 | Search |
  | Doctor Laleh | $148.66 | $109.00 | Search |
  | The Tooth Co | $163.39 | $178.52 | PMax |
  | Vida Dentistry | $137.65 | $459.37 | PMax |
- **Integrity Naturopathic** (acct 5360677991), ACTIVE, live to 2026-09-07:
  SEARCH $18,149.05 / 482.6 conv / **$37.61 CPA**. PMax ran 2025-11-20 to 2026-04-22 then ended.
  `booked_conversion_actions` = **"FirstUp - Offline Conversion - Qualified Lead - Booked"**. This is the
  ONLY row in the entire book with a booked offline-conversion action. It is the spine of the proposal.
- **FirstUp Marketing is a PARTNER, not a client** (confirmed in agent_knowledge). So the mechanism is:
  third-party lead handler qualifies and books, booked status imports back to Google as the optimisation
  target. Described as a "lead handling partner" in the body, not named.
- Book-wide PMax 12mo is $37.65 CPA across 14 accounts, but **73% of that spend is South River Mortgage
  alone** ($409,912 of $561,388), which churned 8/11/26. Book-wide PMax average is therefore NOT cited.

## ATTACHMENTS (both file IDs resolved live via Drive metadata, real PDFs by mimeType + size)
- **`integrity_naturopathic.pdf`** `1x5jAh7fB8S_kcPSdmeLsdiCj8rNV8iwX` (756KB, application/pdf).
  Local health practice, Google, offline booked-conversion loop. The on-mechanism and on-vertical cite.
- **`join_piper.pdf`** `1660mStqedvlkrdNKyyHNtvfGmV9_RCCo` (644KB, application/pdf). Takeover of an account
  with duplicate conversion tracking AND brand-only targeting. Health (GLP-1 telehealth). Answers their
  "complex account structures / end-to-end conversion" question with a real diagnosis.

## ATTACHMENT CAVEATS TO CARRY
- **Do NOT quote "10x" from the Join Piper PDF.** It headlines 10x ROAS but its own tracked figure is 8.81x.
  The body quotes neither and uses the honest direction of travel instead (dedup made the number smaller
  and real), which survives the prospect opening the PDF.
- Join Piper is ROAS-only with no CPL and is telehealth, not a clinic. Attached for MECHANISM, never as a
  psychology or multi-location comparable.
- `localhost:4321` dev artifact present in the Join Piper PDF (known April-2026 batch defect). Strip if quick.
- Integrity's PDF headlines "$14-$40 CPA, 150+ conversions, $2,350/month". Live 12mo is $37.61 and 482.6
  conversions, which sits at the top of that band and does not contradict it. The body quotes the LIVE figure.

## NOT ATTACHED, AND WHY
- **Advanced Med Spa** `1TRlcVCPZFqNlm2ch3nJuFYLOx_1Wld8b`. Our ONLY multi-location healthcare case study and
  the tempting pick for this exact job. **The file ID 404s.** Client row is also `inactive` with no website,
  no target_locations, zero google_campaigns and zero insight rows. The "3 locations / 2x industry average"
  claim has no live corroboration anywhere. Not attached and NOT cited.
- **Polaris Dentistry** `1lrG-MYfeQ58n0TbC55OxVqj3Wf0QNhTc`. **Also 404s.** Churned 2026-09-02. Its $27.57
  Search CPA is real in the data but there is no artifact, so it is left out of the body entirely.
- Doctor Laleh / The Tooth Co / Vida. Cited as anonymous CPA comparisons in the PMax table only. Not attached,
  since a cosmetic or dental artifact would pull the wrong vertical frame onto a psychology post.

## DELIBERATELY OUT
- **No Australian results claim.** Outback Peptides is our one AU Google account ($10K/mo, signed 8/20) but has
  **zero insight rows**, so it is not evidence of anything yet. Not mentioned.
- No psychology claim. Named as a gap instead.
- No certifications, no Google Partner claim, none exist.
- No links, no calendar link, no contact info. No em dashes. No sign-off per the 9/4 ruling.
- No pricing, no hourly. Spend is unknown.
- HubSpot deliberately omitted from the systems list (vault-supported but zero delivery proof).
- Figures flagged as USD once, since the prospect reads dollars as AUD by default.

## OPEN, BLOCKING SEND
- Monthly ad budget range. Under $5K/mo this becomes a skip regardless of fit.
- Number of live locations. Drives the whole geo and campaign structure.

---

A multi location psychology clinic usually has a measurement problem before it has a traffic problem, and it tends to hide in two places.

The first is the phone. A clinic line is mostly existing clients rescheduling, asking about rebates, or chasing an invoice. If the call conversion carries no minimum duration, all of that counts as a new enquiry, and so does the same person tapping the number twice on mobile. The second is the gap between an enquiry and an attended first session. In psychology that gap is unusually wide, because intake waitlists, cancellations and no shows all sit inside it. Optimising to form fills teaches Google to find people who fill in forms, which is not the same as people who turn up.

That gap is also why the AI layer tends to underperform. Automated bidding, and anything you build on top of it, can only ever be as good as the event it is fed. Fix what gets counted first, then automate on top of it. Otherwise you are scaling a number that never reconciles with your practice management system.

On PMax, our own health accounts do not give one answer. Over the last twelve months, head to head against Search inside the same account, in US accounts so these are USD: a naturopathic clinic ran PMax at $50.25 a conversion against $37.61 on Search, and a cosmetic practice ran $148.66 against $109.00. Two dental accounts went the other way, $163.39 PMax against $178.52 Search, and $137.65 against $459.37. So it swings, and it swings hard. What usually decides it is how much brand and existing patient search PMax quietly absorbs and reports back as new. For a multi location clinic with returning clients, that is the specific thing worth measuring before you commit either way.

To your three questions.

Systems. Google Ads offline conversion import is the main one, feeding a qualified and booked status back into the account instead of leaving the platform to optimise against raw enquiries. Around that, GA4 and GTM, Salesforce, Carestack on the dental side, GoHighLevel, Klaviyo, and Zapier where no direct integration exists. Six years on Google Ads, most of it local lead generation.

Complex structures, end to end. The Integrity attachment is the cleanest example of that loop actually running: a local health practice on Google where a lead handling partner qualifies and books every enquiry, and the booked status is imported back as the conversion the account optimises to. Live twelve month Search performance is 482 conversions at $37.61. The second attachment is a takeover of an account that looked healthy and was not, carrying duplicate conversion tracking and targeting that had narrowed to essentially the brand name. Deduplicating it made the reported numbers smaller and real, which is the part that matters.

Health and psychology. Health yes, across naturopathic, dental, cosmetic and telehealth accounts. Psychology specifically, no. Worth saying plainly rather than dressing up an adjacent account as the same thing, because the parts that differ are real ones: referral and rebate pathways, and the sensitivity rules that limit what can be targeted and remarketed.

On your audit offer, read access is the right starting point. The first two weeks would be diagnosis with no campaign changes, because restructuring before the measurement is trusted just buys expensive data nobody can read.

What monthly ad budget range are you working with, and how many locations are live right now?
