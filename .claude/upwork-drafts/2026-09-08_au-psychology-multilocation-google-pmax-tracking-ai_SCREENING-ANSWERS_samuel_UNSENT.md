# Screening Answers - Australian psychology multi-location clinic (Google Ads + PMax + tracking + AI)
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-08
Companion to: 2026-09-08_au-psychology-multilocation-google-pmax-tracking-ai_samuel_strategic-diagnostic_UNSENT.md

## VERIFIED THIS SESSION (contractor_query)
- **CallRail IS real, and the mechanism is documented.** `agent_knowledge` strategy_update 2026-04-28
  (moderate magnitude, HIGH confidence, sourced to fathom:6f12b63c, Peterson+Jordan call 2026-04-27):
  "Added Call Tracking (CallRail) as committed service line -- **dynamic number insertion + GCLID/UTM
  passthrough for inbound call attribution**; updated Conversion tracking methodology and Operational
  metric to incorporate phone-call attribution." Client = The Tooth Co, ACTIVE.
  NOTE: my first CallRail sweep missed this (ORDER BY title + LIMIT 25 truncated it). Every other
  CallRail hit in the DB is vendor spam in Gmail logs (chris.case@callrail.com free-trial pitch) or a
  WhatConverts newsletter. Do NOT read those as evidence of use.
- The Tooth Co strategy_update 2026-04-29: phone calls are primary inbound channel, high
  call-to-appointment conversion, **Medi-Cal/HMO the primary non-converters**, competitor-city-name
  negatives added. Insurance type as the disqualifier is the direct AU rebate/Medicare parallel.
- **Integrity Naturopathic CRM = GoHighLevel**, client's own GHL location `cMiNFmHqT4OS1thS4IaX`,
  admin Denise, relayed by Ahmed 2026-06-09. NOT Creekside's own GHL. Combined with
  `booked_conversion_actions` = "FirstUp - Offline Conversion - Qualified Lead - Booked", the loop is
  fully verified: GHL -> partner qualifies/books -> booked status imported to Google as the target.
- **Integrity campaign detail, acct 5360677991, 12mo to 2026-09-07:**
  | Campaign | Type | Status | Cost | Conv | CPA | Window |
  |---|---|---|---|---|---|---|
  | Search - General Keywords (Updated) - 5 Sep | SEARCH | ENABLED | $17,685.78 | 482.6 | $36.65 | live |
  | Pmax - General - 20 Nov | PMAX | PAUSED | $4,589.18 | 91.3 | $50.25 | 11/20-4/22 |
  | Search - Sports Medicine - 6 Nov | SEARCH | PAUSED | $463.27 | **0** | n/a | 11/6-11/26 |
  All-Search blended = $37.61. Body uses $37.61 for consistency with the proposal.
  The Sports Medicine line is the service-line-testing proof: cut in 3 weeks at $463 with zero conversions.
- A **documented PMax-vs-Search debate** for Integrity exists on fathom f25fbf3f7 (2026-07-20, from
  00:05:03). The PMax pause was a deliberate, discussed decision, not drift.
- **Polaris Dentistry** live Search 12mo: $5,541.32 / 201 conv / **$27.57 CPA**, last day 2026-09-01,
  churned 2026-09-02. Its case-study claims ("sub-$4 CPA", "26 to 413") CONTRADICT live data. Only the
  live $27.57 figure is used.

## AI CLAIMS -- REALITY CHECK (agent_run_history)
- `ai-analyst-agent`: **8 runs, ALL success, 2026-05-18 to 2026-07-06.** Weekly per-account audit:
  performance vs prior period, search-terms waste, specific optimisation recommendations.
  **Explicitly READ-ONLY** -- "never pauses campaigns, adds negatives, or mutates ad accounts."
  Last successful run was 2026-07-06, so present-perfect phrasing only ("has run"). Never "runs weekly".
- `ad-account-monitor-agent`: **4 runs, ALL FAILURES, 2026-06-16 to 2026-06-18. Never succeeded.**
  Also TEST PHASE, Meta-only, Google layer never built. **NOT CLAIMED ANYWHERE.** Omitted rather than
  disclosed, per the no-self-blame-in-drafts rule: we simply do not claim daily monitoring, so there is
  no false claim needing a correction.
- Boundary stated plainly in Q2: this is our tooling on accounts we manage, NOT software installed
  inside a client's business. Prevents the obvious follow-up trap.

## DELIBERATELY OUT
- No HubSpot (vault-supported, zero delivery proof). No certifications. No Australian results claim.
- No Advanced Med Spa (PDF 404s, inactive, uncorroborated) despite being the only multi-location health cite.
- No pricing, no hourly, no links, no contact info, no em dashes, no sign-off, no principal named.
- Laleh's 600+ untouched CRM leads used as an unnamed finding, framed as a diagnosis, not a client dispute.
- Integrity's Apr-2026 drop and May-2026 reactivation: internal, irrelevant, omitted.

---

**1. Tell us about your experience tracking conversions with other systems like CRM and Call Tracking systems.**

Two mechanisms do most of the work.

For calls, dynamic number insertion with GCLID and UTM passthrough, so an inbound call is attributed back to the click, campaign and keyword that produced it rather than landing in an untracked pile. We run this on a dental account through CallRail, where the phone is the primary inbound channel and the account is judged on calls that become appointments. The setting that matters most is a minimum call duration, because without it the reception line counts every existing patient asking about an invoice as a new enquiry.

For CRM, offline conversion import. On a naturopathic practice the CRM is GoHighLevel, a lead handling partner qualifies and books each enquiry, and that booked status is imported back into Google Ads as the conversion the account optimises against. The platform is then bidding toward booked appointments instead of form fills. Elsewhere we have worked with Salesforce, Carestack as the practice management layer on the dental side, Klaviyo, and Zapier where no native integration exists, with GA4 and GTM underneath all of it. The same CRM connection also feeds customer match lists, which is how existing patients get excluded from prospecting instead of being paid for twice.

One pattern worth flagging, because it applies directly to a clinic. Connecting the CRM often shows the ads were never the constraint. On one account an audit found more than six hundred leads sitting untouched in the CRM, which meant the honest answer was that lead follow up, not lead volume, was the bottleneck. You only get to see that once the two systems are talking.

**2. Have you helped businesses to use AI to manage conversion optimisation and account spend? Please explain.**

Yes, in two layers, and the distinction matters.

The first is the platform's own AI, which is where nearly all the real money is decided. Smart Bidding on target CPA or target ROAS, and PMax, are already machine learning managing your spend every day. The highest leverage work there is not tuning the algorithm, it is fixing what you feed it. Sending a booked appointment back as the conversion instead of a form fill changes what the bidding optimises toward more than any bid setting will. That is the single biggest AI lever most accounts are leaving unused.

The second layer is our own. We built an automated weekly account review that reads each account, compares performance against the prior period, audits search terms for wasted spend, and writes specific optimisation recommendations per account. It has run across the accounts we manage.

It is deliberately read only. It flags and recommends, and a person decides and executes. We keep it that way on purpose, for the same reason as above: an autonomous system optimising against a conversion feed that counts the wrong event will scale that mistake faster than any human would. Automation is worth adding after the measurement is trustworthy, not before.

Worth being clear on the boundary. This is our tooling applied to accounts we manage, not software we install inside your business. If what you want is an AI layer that lives in your own stack and touches your CRM data directly, that is a different build and I would rather scope it honestly than pretend it is the same thing.

**3. Describe your recent experience with similar projects.**

Closest match is a naturopathic practice we run now. Google Search, 482 conversions at $37.61 over the last twelve months, live through last week, with the booked status imported from the CRM as the optimisation target. PMax ran alongside Search from November to April at $50.25 against Search at $37.61 and was paused after a direct comparison rather than on principle. Separately, a sports medicine service line was tested as its own campaign in November, spent $463 with zero conversions, and was cut inside three weeks. That last part is the piece that transfers to a multi location clinic: each service line gets its own campaign and its own kill criteria, so a weak one gets found in weeks instead of quietly absorbing budget for a year.

Second, an active dental practice where calls are the primary inbound channel. Call tracking carries the attribution, the account is measured on call to appointment rather than raw conversions, and competitor city name negatives were added to stop budget leaking to people searching for other practices. The main non converters there turned out to be a specific insurance category, which is the same shape as a rebate or referral pathway deciding whether an enquiry is worth anything.

Third, a takeover of an account that looked healthy and was not, carrying duplicate conversion tracking that inflated reported results and targeting that had narrowed to essentially the brand name. Deduplicating it made the reported numbers smaller and real. A dental account we ran until earlier this month was at $27.57 a conversion on Search.

All figures are USD from US accounts. These are health and appointment based local lead generation rather than psychology specifically, which I would rather state plainly than stretch an adjacent account to fit.
