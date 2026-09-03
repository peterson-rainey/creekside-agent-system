# Screening Answers — Meta Ads Specialist (generic, part-time)

- **Date drafted:** 2026-09-03 (Postgres `now()`; local shell clock reads 09-04 and is wrong)
- **Profile:** Samuel Rainey
- **Status:** UNSENT — draft only
- **Companion:** `2026-09-03_generic-meta-ads-specialist-parttime_samuel_strategic_UNSENT.md`

## Proof screen before drafting

| Claim needed | Verdict |
|---|---|
| A "biggest accomplishment" on Meta | **AVAILABLE.** Two clean options, both verified below. |
| Creative strategy | **AVAILABLE.** Campaign briefs, angle/offer testing, frequency-based fatigue monitoring. |
| Design | **GAP. Do not claim.** `team_members` has a Creative Director (active) but Samuel is not a designer. Answered honestly as a no, and the creative director is described by role only, never named, because the surname would leak the Samuel/Peterson persona link. |
| Conversion tracking | **AVAILABLE.** Pixel, CAPI, dedup, domain verification, Events Manager, restricted-category event limits. |

## Verified facts used

- **Fusion Dental Implants** (`act_938570599860690`), Apr 21 to Jul 15 2026: **$64,746.78 spend, 2,558 leads, $25.31 CPL.**
  Budget was $20K/mo. **CHURNED 2026-07-22**, so past tense throughout, and the churn is not volunteered.
  - **Data conflict found and resolved.** Four stored reports say $64,746.78 / $25.31 CPL. One stored report
    ("Fusion Meta Weekly Report 2026-07-15 v2") says $57,346.78 / $22.43 CPL for the identical window, a difference
    of exactly $7,400. A direct sum of `meta_insights_daily` joined to `meta_campaigns` for that account and window
    returns **$64,746.78 across 358 rows**, so the v2 figure is wrong. The draft uses the verified number.
  - Restricted-category constraint is real and separately sourced: correction `ccd0db1b` and the 2026-05-04
    correction confirm Fusion ran **standard `lead` events only, no custom events**. Every weekly report repeats it.
- **Birthday Club App** (`case_studies`, Meta Ads only): **2,662 installs, cost per install cut 47% from $7.36 to
  $3.90**, via campaign restructuring and systematic creative testing. Churned, so past tense. Cite the numbers,
  never promise the PDF, it 404s.
- **Meta Special Ad Category:** since **January 21, 2025** all insurance products in the US fall under "Financial
  products and services" SAC, mortgages and reverse mortgages included. SAC removes age narrowing (locked to an
  18-65+ band), gender, and ZIP-level targeting.
- **Dental/health restriction is NOT the same thing as SAC.** These were kept separate in the answer on purpose.
  Conflating them is the kind of error a vertical-expert buyer catches instantly.
- Samuel = 6 years. No certifications claimed, none exist. No pricing. No links. No names.
- Dr. Laleh's $48.79 to $9.58 CPA was **deliberately excluded** despite being the flashiest number in
  `case_studies`. It fails live verification ($9.58 canonical vs $1,241.65 live) and the account belongs to another
  operator's book, so it is not Samuel's accomplishment to claim.

## ANSWER 1 (paste-ready)

What's your biggest accomplishment with Meta Ads?

A dental implant account running lead gen under a restricted category. Because it was health related, custom conversion events were off the table, so everything had to optimize against a standard lead event and you lose most of the signal you would normally lean on. Over about three months it produced 2,558 leads on roughly $64,700 in spend, a little over $25 a lead, in a market where implant consults are not cheap to buy.

The result I am actually prouder of is smaller. An app account where cost per install came down 47 percent, from $7.36 to $3.90, across 2,662 installs. No clever targeting trick, just tearing the structure apart and testing creative in a disciplined order. That is usually where the gains are, which is less exciting than it sounds.

## ANSWER 2 (paste-ready)

What other skills do you have in launching Meta Ads campaigns?

Conversion tracking first, because that is where most accounts are quietly broken. Pixel and Conversions API setup, event deduplication, domain verification, Events Manager diagnostics. The part people underrate is which events you are even permitted to send. Health accounts often get limited to standard events with no custom events at all, so you are optimizing on a much thinner signal and your reporting has to be read differently. Separately, anything in finance, insurance, mortgage, credit, housing or employment falls into Meta's Special Ad Category, which since January 2025 covers every insurance product, and that strips age narrowing, gender and ZIP level targeting. Knowing which of those applies before you build saves you a rebuild later.

Creative strategy, yes. Briefs, angle and offer testing, and watching frequency so you catch fatigue before cost per lead moves rather than after it.

Design, no, not personally. There is a creative director on our side who handles production. I write the brief and decide what gets tested, and I would rather say that than pretend otherwise.

Beyond that, account structure and audience architecture, Advantage+ versus manual and when each is the right call, catalog and feed setup, and reporting that separates what the auction did from what the account did.

## QC

Pending.
