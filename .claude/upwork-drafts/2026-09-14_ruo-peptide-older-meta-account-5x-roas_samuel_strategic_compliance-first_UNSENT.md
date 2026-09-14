# Upwork Proposal: RUO peptide company, older Meta ads account + 5x ROAS floor (compliance-first)

- **Profile:** Samuel Rainey (General)
- **Style:** `strategic`, compliance-first override
- **Date:** 2026-09-14 (Postgres `now()` = 2026-09-14 19:34 UTC; the local harness clock reads 2026-09-15 and is wrong)
- **Status:** UNSENT, pending QC + expert review
- **Screen verdict:** AUTO-DQ fired (detection evasion, account age as the deliverable) plus a required-proof foreclosure. Skip was recommended. Queenie chose **"Compliance-first draft"** on 2026-09-14.

## Job post (verbatim, as pasted)

> I dont currently have an older meta ads account. That would be how to get the account. Then setting up the account to run ads with a minimum 5x on ad spend. Only looking for someone who has already set this up for a ruo peptide company.

---

## PROPOSAL (paste-ready)

An older Meta ads account doesn't get an RUO peptide ad approved. Every ad and the page behind it still goes through review, and a bought account starts on the wrong side of Meta's terms, which don't allow accounts to change hands without Meta's permission. If it gets restricted, that can reach the business portfolio, domain, pixel and payment method connected to it, the assets a peptide store can't replace in a week.

Straight answer on your requirement. We haven't set up a Meta account for an RUO peptide company, and we won't source an older one. Our research peptide work so far has been diagnosis and strategy on Google, not a managed Meta account. The closest was a store whose account read Not Eligible across Search and Shopping after a healthcare attorney had already cleared the site. The legal review was clean, and the automated review still said no.

What we'd do instead is build on your own business from day one. That means a verified business portfolio, your own page and domain, at least two admins, and the pixel and Conversions API firing before any spend. Before launch we'd read the store the way a reviewer will, then run only what reads cleanly. A rejection is a no for that product, not something to reword until it gets through, and anything that leans on implied human use will keep getting flagged. It's possible very little of the catalog runs on Meta at all, and your own account can be restricted too, which is why this starts with a small test.

On the 5x floor, nobody can honestly promise a return on a new account with no purchase history, in a category where some products may never run. What we can commit to is when the number means something. Meta's delivery keeps shifting until an ad set gets around 50 purchases in a week, so that's the point we'd judge it against 5x.

For scale, our team runs a Meta account in cosmetic dentistry and med spa at roughly $100K a month.

Two questions. Has the store's domain, or any page or business account tied to it, already been rejected or restricted on Meta? That decides whether a clean start is still possible. And what monthly spend range are you working with? Any budget I suggest is useless if it lands outside your range.

---

## Screen Notes (internal, do not send)

### The DQ and the override
- **Detection evasion: FIRED.** *"I dont currently have an older meta ads account. That would be how to get the account."* Deliverable one is sourcing an aged Meta account, which is account age as the product ([[feedback_dq_detection_evasion_jobs]]). Same class as the 2026-08-08 account-lending skip, different mechanism (that post wanted our account's age; this one wants us to source one).
- **Override taken:** Queenie selected "Compliance-first draft." The body refuses to source an older account, refuses to reword rejected products until they pass, and states that the client's own account can be restricted too. Nothing in it coaches review evasion: no compound-name sequencing, no boundary testing, no cloaking, no feed recategorization.

### Stacked screens
| Screen | Result |
|---|---|
| Required proof ("already set this up for a ruo peptide company") | **FORECLOSED, disclosed first in paragraph 2.** Zero Meta peptide accounts or campaigns anywhere in the book. |
| 5x ROAS floor | No peptide ROAS on any platform. Answered with when the number becomes readable, never with a number. No book ROAS placed near "5x". |
| Ad spend ($5K/mo) | **UNMEASURED.** Post is silent. Closes on the relative-range ask. |
| Geo | **UNMEASURED.** Australia would be a hard zero (no TGA knowledge in the company). |
| Rate / payment verification | Not stated / unchecked (logged out). |
| Duplicate profile bid | CLEAR. No `upwork_jobs` row matches (searched peptide, "older meta", "research use only", "5x on ad spend"); no synced `upwork_conversations` room mentions an older/aged account. |
| Ads in scope | PASS. Meta setup plus running ads. |
| White-label, full-time seat, profit-share, worker location, coaching competitors | None present. |

### Verified this session (2026-09-14)
- `case_studies`: **0** peptide or supplement rows.
- `meta_ad_accounts` + `meta_campaigns`: **0** rows matching peptid / bpc-157 / tb-500 / ghk-cu / research chem / glow pep / outback.
- `match_proposal_context(job text)`: 0 matched case studies, 0 industries.
- **Outback Peptides:** `clients` active; `reporting_clients` Google only, Australia-only targeting, operator Dustin Bowser, notes say "Meta account ID not yet provided." `google_campaigns` and `google_insights_daily` hold **0 rows** for 4532985243. **Not cited.**
- **Lux Dental Spa Meta** (`act_868498138612020`, operator Lindsey B., the Laleh ceiling account): full months Oct 2025 to Aug 2026 ranged $89,944.62 to $114,586.56, 11-month total $1,092,841.16 (**avg $99,349.20/mo**); Sep 2026 MTD $40,282.29 through 2026-09-13. Cited as "roughly $100K a month", **spend only, no CPA** ([[reference_laleh_meta_is_the_single_account_ceiling]]).
- **Glow Peptides line** ("Not Eligible across Search and Shopping after a healthcare attorney had already cleared the site"): verbatim-real per [[reference_peptide_ruo_proof_and_playbook]] (Fathom 2026-05-27). Never converted, so written as diagnosis, not a managed account. Client not named.
- **Meta Terms of Service**, facebook.com/terms: users may not "transfer your account to anyone else (without our permission)." Verified via web search 2026-09-14.
- **Restriction spillover** (business portfolio, payment method, domain): secondary sources only (Jon Loomer, Stubgroup), so the body hedges with "can".
- **Same-shape outcome:** the 2026-09-03 peptidicresearch.com Meta post (General, `strategic_dq`, 17 connects) was viewed, never messaged, not won.

### Attachment: ATTACH NOTHING
No peptide case study exists, and no Meta attachment fits a compliance-first thesis.

### Rule compliance
Opens on the client's own nouns ("older Meta ads account", "RUO peptide") with a statement, not "I". The proof gap is conceded first in its own paragraph. Book pooled as "our team"; no principal in a delivery seat. No sign-off name. No links, contact info or calendar link. No price (spend unknown). Budget asked as a relative range with the rationale. No em dashes, bold, bullets or headers in the paste block. No "category level, not copy level" claim (Merchant Center specific, a known repeat over-scope on peptide drafts).

### Open items before sending
- Ad spend and geo are both unmeasured. Australia would invalidate the US-context framing.
- Payment-method verification is unchecked.
- If screening questions exist on the post, paste them and they get answered separately.
