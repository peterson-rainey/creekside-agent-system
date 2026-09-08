# Lumida - screening answers (3 questions)
Profile: Samuel/Peterson | Status: UNSENT | Drafted 2026-09-09 | Pairs with the narrowed Google-Ads-only proposal

## NOTE ON Q3
Q3 ("How do you use metrics to inform your strategy?") duplicates the first half of Q2. Answered as the
DECISION layer (cadence, kill thresholds, what metrics cannot settle) so it does not repeat Q2's definitions.

## VERIFIED LIVE THIS SESSION (recomputed, not recalled)
- Fusion Dental Implants, Google, CHURNED. Conquest vs brand, Nov 2025 - May 2026:
  SEM_Competition_Roseville $3,468.84 / 54 conv / $64.24 blended.
    Monthly: Nov $66.43, Dec $100.78, Jan $29.16, Feb $44.90, Mar $59.15, Apr $97.24, May $80.42
  SEM_Competition_ElDorado $381.58 / 0 conv, Nov 11 - Jan 1 (~7 weeks), killed
  SEM_BRAND $7,943.72 / 58 conv / $136.96 blended. Month 1 brand was $136.22.
- Aura Displays, Google, ACTIVE. Nov 2025 - Aug 2026, side by side:
  Branded $25,496.26 / $0.35 CPC / 1,508.5 conv / $16.90 CPA
  Non-brand $27,183.02 / $1.26 CPC / 260.8 conv / $104.25 CPA
- Integrity Naturopathic, Google, ACTIVE. 13 months, $22,738.23 total, $1,749.09/mo avg, 573.9 conv,
  $39.62 blended CPL. Month 1 $25.20, settles $36-45. Sept 2026 partial month ($77.19, 5 conv) EXCLUDED.
- Retirement Income Solutions, ACTIVE both platforms. Google 12mo $16,821.82 / 21 conv / $801.04 CPL.
  Vertical marker only. Number deliberately NOT quoted to the prospect.
- LTV: NO client LTV tracking exists anywhere. Only `dental_blueprint_leads.patient_ltv`, which is our own
  dental lead-magnet form, self-reported by leads. Not client performance data. Disclosed as a gap.

## DELIBERATELY OUT
- **Big Chad Law** ("50+ qualified PI cases in 4 months, $1,500/case, $20K/mo"): `reporting_clients` row exists
  (google, churned) but there is NO `google_ad_accounts` row and NO insights data. Figures unverifiable from our
  tables, and memory already flags the $20K as failing live verification. Q1 explicitly demands time AND budget,
  so citing it would assert unverifiable numbers on the exact axis asked. Excluded.
- **Winterbotham** (117->229 leads, $86->$50.29): no account row anywhere, not even in reporting_clients.
  Case-study row and PDF only. Same reason, excluded.
- **Integrity's case-study figures** ("$14-$40 CPA on a $2,350/month budget"): live is $39.62 blended on
  $1,749/mo. The claimed band's ceiling is roughly today's floor and the budget is overstated ~34%. Quoted LIVE
  numbers instead of the artifact's.
- Aura case-study PDF and its "8-10x ROAS on non-branded" headline. Fails live verification at 5.31x/5.47x.
- RIS's $801.04 CPL. Named as vertical presence with the withholding stated plainly, not concealed.
- No fee figures, no links, no contact info, no certifications, no sign-off name. No em dashes.

---
## ANSWERS

**1. Do you have example case studies that are relevant to share? Show time to achieving results and budget.**

Three that are relevant on mechanism, all Google Ads, all with the arc rather than the headline.

Competitor bidding, dental implant practice, since ended. Competitor-name campaigns ran against that account's own brand campaign from November through May. The conquest campaign spent $3,469 across those months and returned 54 conversions at $64.24 blended. Brand spent $7,944 in the same window at $136.96. Conquest was cheaper than brand in its first month, $66.43 against $136.22, and hit $29.16 in month three. A second metro ran the identical setup, spent $382, and produced nothing at all in seven weeks before it was shut off. Both outcomes came from one account.

Brand versus non-brand, ecommerce, active. Ten months, near-identical budgets of $25,496 and $27,183. Branded returned $0.35 a click and $16.90 per conversion. Non-brand returned $1.26 and $104.25. That result is readable in week one because it is a measurement decision, not a turnaround.

Steady state, naturopathic clinic, active. Thirteen months at about $1,749 a month, 574 conversions, $39.62 blended cost per lead. Month one was $25.20, then it settled in the high thirties to mid forties and stayed there. Worth including precisely because nothing dramatic happened. Most accounts look like this one, not like the first two.

On relevance, the closest thing to your vertical in our book is a financial advisory firm running retirement planning event registrations, active on both platforms. It is a small event-registration account and we are not putting numbers behind it as a case study, so treat it as evidence we work in the category rather than as proof of a result. There is no wealth management firm on our list.

**2. How do you use metrics to inform your approach and strategy? How do you measure CAC, LTV, CPL?**

Worth separating those three, because they get conflated constantly and only one of them is actually measured inside an ad platform.

Cost per lead is native. The platform knows what a form fill cost, and every number in the answer above is one. It is also the least useful of the three on its own, because it says nothing about whether the lead was worth having.

Customer acquisition cost is not cost per lead with a better name, which is how most reporting presents it. Getting it honestly requires a handshake with the CRM: the click identifier is stored on the record at first touch, and when your team marks something qualified or closed, that event goes back to the platform as the conversion. Bidding then trains on qualified pipeline instead of form volume. Until that is wired, anyone reporting CAC is reporting CPL.

Lifetime value is yours, not ours. It lives in your book of business and we have no way to observe it. Being straight with you, we have no lifetime-value tracking build in our portfolio to point at, and no case study where we implemented one. What we do with your number is use it to set the ceiling: what you can pay to acquire a client is a function of fee on assets compounding over years, not of what a form fill costs this month.

That distinction matters more in your business than in most. A firm optimizing to cost per lead will systematically underbid the searches worth the most, because the highest-value prospect is slower, more researched, and more expensive to reach. The whole point of pushing qualified opportunities back into bidding is to stop the algorithm from avoiding your best clients.

**3. How do you use metrics to inform your strategy?**

Reading that as the decision layer rather than the definitions, since it overlaps the question above.

Metrics earn their keep by having a threshold attached before the spend starts. The dead competitor market above is the clean example. It was allowed a fixed budget and a fixed window, produced zero, and was shut off at $382 and seven weeks. Nobody had to argue about it, because what would end it was agreed in advance. Most wasted budget comes from tests that were never given a stopping rule.

The reporting has to be built so a number cannot hide inside an average. Brand and non-brand separated from week one, campaign types never blended, geographies split where the buying behavior differs. A single blended cost per acquisition on a firm with strong name recognition will mislead you for two quarters and then appear to collapse the moment you scale.

Cadence follows the volume. At meaningful lead counts, weekly is enough to act on and daily is noise. On thinner accounts, the honest answer is that most weekly moves are reactions to variance, so structural changes get made monthly and the weekly look is a check that nothing broke.

The part worth saying out loud: metrics settle which of two things is working. They do not tell you what to try next. That still comes from search terms, competitor positioning, and what your advisors hear on calls, which is why the qualified-opportunity definition matters as much as the dashboard.
