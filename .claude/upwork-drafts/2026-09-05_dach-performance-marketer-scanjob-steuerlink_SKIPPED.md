# SKIPPED — DACH performance marketer seat (scanjob.eu / steuerlink.tax)

**Date screened:** 2026-09-05 (Postgres now(); local clock was a day ahead)
**Requested style:** samuel_strategic-diagnostic
**Disposition:** SKIP — not drafted. Skip confirmed by Queenie.

## Job shape
Multi-project performance marketing seat: Google Ads (Search/Display/Shopping),
Meta Ads, and LinkedIn Ads for B2B. Named projects: scanjob.eu, steuerlink.tax.
Structured as Mission / Key Responsibilities / Requirements / KPIs with a
"3+ years experience" bar and "in collaboration with dev/design" — an in-house
seat, not an agency engagement. Does NOT say "full time", so the employment-seat
auto-DQ does not technically fire.

## Blocking DQ — geo (outside US/CA/UK/AU)
Ads would run in Germany/DACH. Judged by where ads run, not HQ. Evidence:
- "steuerlink.tax" — Steuer = German for tax. Tax services are jurisdictional;
  a German tax product cannot meaningfully advertise into US/CA/UK/AU.
- scanjob.eu — .eu TLD, A record 85.13.142.50, NS ns5/ns6.kasserver.com
  (All-Inkl, German host).
- Zero US-market signal in the posting or on either domain.

## Compounding factors
- **Both projects pre-launch.** scanjob.eu returns "Please stand by while
  configuration is in progress." steuerlink.tax returns an empty body over a
  failed TLS handshake. No pixel history, no conversion baseline, no landing
  pages — nothing for the diagnostic half of a strategic-diagnostic to bite on.
- **LinkedIn Ads = system-wide zero, and load-bearing here.** Posting names
  LinkedIn for both B2B projects. Verified: SELECT DISTINCT platform FROM
  reporting_clients returns google, meta, tiktok, lsa, email, chatgpt,
  programmatic, other. No LinkedIn row exists. Posting calls it "a strong plus,"
  so not fatal alone.
- **Zero adjacent vertical proof.** clients queried for tax / accounting /
  recruiting / staffing / job / HR industries plus German/Europe target
  locations returned zero rows.
- **Spend unstated** — $5K/mo minimum screen could not be run either way.

## Reversal condition
Geo is the gate and is not arguable: a German tax product is Germany-only.
An override would route through sdr-agent, samuel strategic-diagnostic, with the
LinkedIn zero and DACH-proof zero disclosed in the body, and a monthly-spend-
per-project ask before committing to scope.

---

## Re-ask #1 — 2026-09-08 (Postgres now(); local clock a day ahead again)

**Requested:** "Lindsey's strategic + diagnostic style proposal, written in lindsey_default."
**Disposition:** SKIP HELD. Confirmed by Queenie a second time. Nothing drafted.

### Style mismatch, resolved
"strategic-diagnostic" is a Samuel-only style. Lindsey has exactly one style,
lindsey_default. The request self-resolved by naming lindsey_default explicitly.

### Re-verification (all facts unchanged)
- scanjob.eu — still A 85.13.142.50, still ns5/ns6.kasserver.com (All-Inkl, DE).
  Same IP as the 9/5 screen. HTTPS still fails (HTTP 000).
- steuerlink.tax — HTTPS still fails (HTTP 000). Now on porkbun NS,
  A 207.207.210.107/.229. Still no served content.
- Both projects still pre-launch. Still no pixel, landing page, or baseline,
  so the diagnostic half of any strategic-diagnostic has nothing to bite on.
- LinkedIn still a system-wide zero. reporting_clients platform census:
  meta 60, google 29, email 7, other 4, chatgpt 4, lsa 1, programmatic 1,
  tiktok 1. No LinkedIn row.
- Tax/accounting/recruiting/staffing/job verticals + DE/DACH/Europe
  target_locations: one row only, "MI Tax CPA", status inactive, US, no
  results. Not usable proof.

### Why the Lindsey profile made the fit worse, not better
Lindsey's book is 35 reporting_clients rows across meta/google/email only:
DTC ecom, dental, meal prep, two financial. Zero LinkedIn, zero DACH, zero tax.
Her only B2B SaaS row (Quivr, $3K/mo) is already ruled uncitable. Samuel was the
stronger of the two profiles for this shape and still did not clear the gate.

### Standing reversal condition (unchanged)
Geo is the gate and is not arguable. Do not re-screen this posting unless the
buyer states a US/CA/UK/AU ad market. If that ever happens, route through
sdr-agent on samuel strategic-diagnostic, disclose the LinkedIn and DACH zeros
in the body, and ask monthly spend per project before committing to scope.
