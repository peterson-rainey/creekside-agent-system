# SKIP SCREEN — DTC Ecom Meta Ads Manager ($100K+/mo proof gate)

**Screened:** 2026-09-02 (date confirmed via Postgres now(), not local clock)
**Requested style:** "strategic + diagnostic" — unresolved mismatch, see below
**Verdict:** SKIP — foreclosed by unanswerable proof demand
**Duplicate check:** no matching `upwork_leads` row in last 45 days. Fresh job, no double-bid risk.

## The gate

> "Minimum $100K/month in verifiable Meta ad spend managed ... for ecommerce/DTC brands
> specifically - not lead gen, not local business"
> "Screenshots of Meta Ads Manager account overviews showing $100K+/month spend ...
> date range and spend totals must be visible"
> "Applications without proof of $100K+/month spend will not be considered"

## Verified against meta_insights_daily -> meta_campaigns -> meta_ad_accounts

| Claim they require | Verified reality | Verdict |
|---|---|---|
| $100K+/mo Meta, **ecom/DTC only** | Only account ever >$100K/mo = **Lux Dental Spa FB Ads (Doctor Laleh)**. Peak $114,587 (Mar 2026), 13-mo avg $91,314. Cleared $100K in exactly 3 months (Mar/Apr/May 2026). It is a **cosmetic dental spa = local business + lead gen**, both excluded by name | FAIL |
| Largest true DTC ecom Meta account | **Neue Maison** (E-commerce / Luxury Furniture). Peak **$40,389** (Jul 2026), avg $18,042. **Churned 2026-08-11** | 40% of bar |
| Entire ecom Meta book pooled, best month | **$70,188** (May 2026, 6 accounts simultaneously) | 70% of bar, and that is 6 accounts not 1 |
| Screenshots w/ date range + totals | **No Meta Ads Manager screenshot library exists.** Only $100K+ account is the excluded dental spa | UNANSWERABLE |
| Scaling 5-fig -> 6-fig, protecting ROAS | Never happened on ecom. Neue Maison arc: Sep 2025 $13,148 @ 0.91 ROAS -> Jul 2026 $40,389 @ 4.17 -> **Aug 2026 $3,515 @ 0.86, then churn** | FAIL |
| Triple Whale / Northbeam / MMM | **Zero references** anywhere in agent_knowledge | NO PROOF |
| CAPI / server-side tracking | Generic Meta Ads Audit Checklist mention only, no case study | THIN |

## Why this is a skip, not a stretch

The only screenshot in existence that clears $100K/mo is a dental spa the post excludes twice
("not lead gen, not local business"). Submitting it as ecom proof is misrepresentation that
gets caught the first time they ask which brand it was.

The requested case study ("starting spend/ROAS -> ending spend/ROAS") for our best DTC ecom
account ends at $3,515 and 0.86 ROAS followed by churn. That is the opposite of the
"scaling without cratering ROAS" story they are buying.

Rule applied: unanswerable proof demands foreclose the draft; zero-proof language in scope
outranks the questions. Their closing line is explicit: "please don't apply 'to try'."

## Secondary: style mismatch (unresolved)

"strategic" is a **Samuel-only** style (`strategic`, `strategic_exp`, `v2`).
The **diagnostic opening is Lindsey's signature** and her only style is `lindsey_default`.
DTC ecom routes to Lindsey. "strategic + diagnostic" is not a configured combination —
needs a profile decision before any draft, override or not.

## If overridden

Only honest version concedes the bar in the opening line and repositions on the real numbers
($70K/mo pooled ecom book, $91K/mo sustained single-account Meta operation in a different
vertical). They have pre-rejected that, so expect a wasted Connect.
