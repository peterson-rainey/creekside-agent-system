# Upwork Proposal: RUO peptide company, older Meta ads account + 5x ROAS floor (compliance-first)

- **Profile:** Samuel Rainey (General)
- **Style:** `strategic`, compliance-first override
- **Date:** 2026-09-14 (Postgres `now()` = 2026-09-14 19:34 UTC; the local harness clock reads 2026-09-15 and is wrong)
- **Status:** UNSENT. QC round 1 = PASS WITH EDITS (applied). Expert review applied in part (decisions below). No second QC pass on the revision.
- **Screen verdict:** AUTO-DQ fired (detection evasion, account age as the deliverable) plus a required-proof foreclosure. Skip was recommended. Queenie chose **"Compliance-first draft"** on 2026-09-14.

## Job post (verbatim, as pasted)

> I dont currently have an older meta ads account. That would be how to get the account. Then setting up the account to run ads with a minimum 5x on ad spend. Only looking for someone who has already set this up for a ruo peptide company.

---

## PROPOSAL (paste-ready)

An older Meta ads account doesn't make an RUO peptide ad allowed. Meta reviews every ad, can check the page it sends people to, and can re-review live ads at any time, whatever the account's age. A bought account also starts on the wrong side of Meta's terms, which don't allow accounts to change hands without Meta's permission. Restrictions aren't limited to ad accounts either. Meta can also restrict the business portfolio, the Page and the personal profiles running them, and those are the assets a peptide store can't quickly replace.

Straight answer on your requirement. We haven't set up a Meta account for an RUO peptide company, and we won't source an older one. Our research peptide work so far has been on Google, not Meta, and none of it has results to show yet. One store's account read Not Eligible across Search and Shopping even though a healthcare attorney had reviewed the site before launch. Google's automated review flagged it anyway.

What we'd do instead is build on your own business from day one. That means a verified business portfolio, your own Page and domain, at least two admins, and the pixel and Conversions API firing before any spend. Before launch we'd read the store the way a reviewer will. We won't reword a rejected product to get it through, and we won't run anything that leans on implied human use. Meta doesn't allow ads that promote the sale or use of unsafe substances, so it's possible very little of the catalog can run at all, and your own account can still be restricted, which is why this starts small.

On the 5x floor, nobody can honestly promise a return on a new account with no purchase history, in a category where some products may never run. What we can commit to is when the number means something. Meta's delivery keeps shifting until an ad set gets around 50 purchases in a week, so that's the point we'd judge it against 5x.

Two questions. Has the store's domain, or any Page or business account tied to it, already been rejected or restricted on Meta? That decides whether a clean start is still possible. And what monthly spend range are you working with? Any budget I suggest is useless if it lands outside your range.

---

## Screen Notes (internal, do not send)

### The DQ and the override
- **Detection evasion: FIRED.** *"I dont currently have an older meta ads account. That would be how to get the account."* Deliverable one is sourcing an aged Meta account, which is account age as the product ([[feedback_dq_detection_evasion_jobs]]). Second override on this screen the same day, after the Ollie agency-account post.
- **What the override bought:** the body refuses to source an older account, refuses to reword rejected products until they pass, refuses to run anything leaning on implied human use, and says the client's own account can be restricted too. Nothing in it coaches review evasion: no compound-name sequencing, no boundary testing, no cloaking, no feed recategorization.

### Stacked screens
| Screen | Result |
|---|---|
| Required proof ("already set this up for a ruo peptide company") | **FORECLOSED, disclosed first in paragraph 2.** Zero Meta peptide accounts or campaigns anywhere in the book. |
| 5x ROAS floor | No peptide ROAS on any platform. Answered with when the number becomes readable, never with a number. No book ROAS anywhere in the body. |
| Ad spend ($5K/mo) | **UNMEASURED.** Post is silent. Closes on the relative-range ask. |
| Geo | **UNMEASURED.** Australia would be a hard zero (no TGA knowledge in the company). |
| Rate / payment verification | Not stated / unchecked (logged out). |
| Duplicate profile bid | CLEAR on this post. No `upwork_jobs` row matches (searched peptide, "older meta", "research use only", "5x on ad spend"); no synced `upwork_conversations` room mentions an older or aged account. |
| Same-buyer check | **UNRESOLVED.** The post names no business or domain. If it is peptidicresearch.com or the US telehealth weight-loss brand, Samuel already conceded peptide proof to that buyer on 9/3 (viewed, no message) and two more drafts are queued today. Do not send a third concession to them. |
| Ads in scope | PASS. Meta setup plus running ads. |
| White-label, full-time seat, profit-share, worker location, coaching competitors | None present. |

### Verified this session (2026-09-14)
- `case_studies`: **0** peptide or supplement rows. `match_proposal_context(job text)`: 0 case studies, 0 industries.
- `meta_ad_accounts` + `meta_campaigns`: **0** rows matching peptid / bpc-157 / tb-500 / ghk-cu / research chem / glow pep / outback.
- **Outback Peptides:** `clients` active; `reporting_clients` Google only, Australia-only targeting, operator Dustin Bowser, "Meta account ID not yet provided." `google_campaigns` and `google_insights_daily` hold **0 rows** for 4532985243. Covered only by "none of it has results to show yet."
- **Glow Peptides line:** `fathom_entries` 6eb8d213: *"Account status shows 'Not Eligible' with policy violation flags preventing search and Shopping campaigns. Despite legal review by South Florida healthcare attorney pre-launch and compliance modifications, Google's automated system is flagging the account."* Written as "reviewed the site before launch", not "cleared". Client not named.
- **Meta Terms of Service** (facebook.com/terms): no transferring an account "to anyone else (without our permission)."
- **Meta Drugs and Pharmaceuticals policy** (transparency.meta.com, fetched): *"Advertisers can't run ads that promote the sale or use of illicit or recreational drugs, or other unsafe substances, products or supplements."* The page does not mention peptides, research chemicals or RUO, so the body does not claim Meta names peptides.
- **Meta restriction and review wording** per [[reference_meta_restriction_policy_verbatim]] (read 9/14 in-browser by another session): restrictions "may be applied" to business portfolio, ad account, Page and personal profile; review may include the ad destination; "all ads are subject to re-review at any time"; Meta "may consider an advertiser's historical compliance" when deciding on further review.
- **Same-shape outcome:** the 9/3 peptidicresearch.com Meta post (General, `strategic_dq`, 17 connects) was viewed, never messaged, not won.

### Revision log (QC + expert review)
1. **Sentence 1** changed from "doesn't get an RUO peptide ad approved" to "doesn't make an RUO peptide ad allowed". Meta says it may weigh an advertiser's compliance history when deciding on further review, so account history can change review depth. It does not change what is allowed.
2. **Restriction reach** rewritten to Meta's own list (business portfolio, Page, personal profiles) with no spread claim. Domain, pixel and payment method were cut because they came from secondary sources only.
3. **QC issue 1 applied:** "A rejection is a no for that product" read as a cousin of the Merchant Center "category level, not copy level" over-scope. Restated as our commitments.
4. **QC issue 2 applied:** "can't replace in a week" became "can't quickly replace".
5. **Expert issue 1, partly applied:** Meta's verbatim unsafe-substances rule added. The expert's "educational content only, no product link" line was NOT used, because it comes from a peptide-ads blog and Meta's page never names peptides.
6. **Expert issue 2, applied in spirit:** "diagnosis and strategy on Google" became "on Google, not Meta, and none of it has results to show yet", which also stays true of Outback.
7. **Expert issue 3 NOT applied; the scale line was cut instead.** The ~$99K/mo Meta figure was already sent by Samuel to peptidicresearch.com on 9/3 and removed from today's telehealth twin for that reason. The buyer here is unknown, and the juxtaposition rule prefers cutting a severed proof line.
8. **Expert issue 4** ("will keep getting flagged") was superseded by the rewrite in item 3.

### Attachment: ATTACH NOTHING
No peptide case study exists, and no Meta attachment fits a compliance-first thesis.

### Rule compliance
Opens on the client's own nouns ("older Meta ads account", "RUO peptide") with a statement, not "I". The proof gap is conceded first in its own paragraph. Book pooled as "we" / "our"; no principal in a delivery seat. No sign-off name. No links, contact info or calendar link. No price (spend unknown). Budget asked as a relative range with the reason. No em dashes, bold, bullets or headers in the paste block. No "category level, not copy level" claim. Every "may" in Meta's wording is written as "can".

### Open items before sending
- **Same-buyer check** (see table). Look at the client name or domain on the job page before sending.
- Ad spend and geo are both unmeasured. Australia would invalidate the US-context framing.
- Payment-method verification is unchecked.
- If screening questions exist on the post, paste them and they get answered separately.
