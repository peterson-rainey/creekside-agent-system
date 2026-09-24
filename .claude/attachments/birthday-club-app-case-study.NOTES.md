# Birthday Club App case study, clean rebuild (2026-09-24)

Rebuilt because the only fetchable copy in the book was unsendable. Source of content:
`case_studies` row **BDC App** (`gdrive_file_id 1PdZTkAEafd5FswFWmTmvXUwTqA6F5yyF`), which despite its
row name contains the Birthday Club App study. The sibling **Birthday Club App** row
(`1NOKmt8X-jCC8wFYtpDLYE_zRfa1_v9Ag`) hard 404s, verified again today.

## What was wrong with the original
- Browser print export of an internal "Case Study Editor": `4/8/26, 1:48 PM / Case Study Editor` header
  and `1/6` pagination on every page.
- `Opening print dialog. Use 'Save as PDF' to export.` spliced INTO body sentences mid-clause, 6 times.
- `https://manus.im/app/8SJxU0zVmrt0H9cKI6lCKn` printed on every page.

## Editorial decisions in the rebuild (NOT just artifact removal, read before sending)
1. **Dropped the legal entity "Loyal Patron LLC."** Not in our own `case_studies` record, permission to
   name it is unestablished. The sanctioned client_name "Birthday Club App" is used throughout.
2. **Dropped all forward-looking claims**: "pursuing government funding", "plans to expand nationally",
   "intent to scale to $6,000-$10,000 per month". `reporting_clients` shows this account **churned
   2026-01-01**, so those claims are stale at best and falsifiable at worst.
3. **Printed no date range.** The original claims a lifetime of "July 2025 to April 2026", which
   CONTRADICTS the churn date of 2026-01-01 in `reporting_clients`. Unresolved, so no dates are stated.
   Someone should settle this before the doc is used widely.
4. **Added a clarifying note under the campaign table.** The four listed campaigns total 475 installs
   against a stated lifetime 2,662 across 41 campaigns. The original never explained the gap and read as
   self-contradictory. The note now says these are the campaigns active at time of reporting.
5. **"CPR" replaced.** The original used an unexpanded "CPR" twice ("weekly CPR monitoring", "Berrien
   County CPR started rising"). Ambiguous, so reworded to "weekly monitoring" and "costs began rising"
   rather than guessing at cost-per-result.
6. **"$7.36+" normalized to "$7.36"** to match the canonical `case_studies.key_result`.
7. **NO contact info, no URLs, no email anywhere in the file**, so it is safe to attach on Upwork under
   the no-contact-info rule.
8. PDF metadata (Title/Author/Creator/Producer) set to Creekside Marketing; the raw export named
   HeadlessChrome.

## Still unverified, flag if challenged
- Every figure here is **case-study only**. None of it can be re-derived from live data: there is no
  app-install objective in `meta_campaigns` and no `meta_ad_accounts` row for this client.
- The "$2,000 to $3,500, 75% voluntary budget increase" is from the source document only.
  `reporting_clients.monthly_budget` records $2,000.
- Account is **churned**, so any use must be past tense, and it was **team work** (operator NULL,
  AM Cade). Never first person for Samuel or Lindsey.

Rebuild source: `birthday-club-app-case-study.source.html` (edit that, re-render with headless Chrome).
