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
