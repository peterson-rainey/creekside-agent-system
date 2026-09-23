# Upwork Proposal: Google Ads specialist for a SaaS company (manage + optimize, targeting, lead gen, part-time ongoing)

- **Profile:** Samuel | **Style:** strategic + diagnostic (Samuel-only; Lindsey is out on the platform test, post is Google-only but "strategic" was the instruction)
- **Date:** 2026-09-23 (Postgres now(), US Central)
- **Status:** UNSENT | **Length:** 4,038 chars / 672 words
- **Attachment:** NONE (ReferPro Drive file fetched this session, returns HTML not PDF)
- **Operator:** UNNAMED in body

## SCREEN
Ads in scope PASS. Full-time seat PASS (post says part-time). White-label PASS. ads+CRO PASS (absent). No required-items list, no screening questions. Geo UNSTATED (logged, not guessed). Payment verification UNSTATED. Spend UNSTATED and prose does not foreclose it, so the $5K minimum does not auto-fire; asked as a relative bracket.

## DUPLICATE CHECK
No match in upwork_jobs or in .claude/drafts, drafts, upwork-drafts. Nearest adjacent: 2026-09-22 "B2B SaaS Google Ads / PPC Specialist - Product-Led Growth" (UK data-integration platform, detailed PLG post, General profile) and the 2026-09-18 AI-SaaS media buyer post. Both different jobs.

## EVIDENCE (live, google_insights_daily + google_campaigns)
South River Mortgage 3227317895, cited UNNAMED and explicitly labelled non-SaaS in the body.
- Shallow pair (Instant Quote 2 PMax + BOF): $121,544.13 / 3,942.4 conv / $30.83, 164 days from 2026-02-25
- Qualified pair (same + "Pricing Qualified"): $28,761.44 / 27.4 conv / $1,049.69, 130 and 145 days, both PAUSED
- Ratio 34.0x. Spend and duration gaps both disclosed inline.
- Search | General | IQ2 $92.72 vs PMax IQ2 $29.52, same conversion action (matched deliberately; the "Apply" search campaigns were rejected as a confound because they optimize a different action).
- ReferPro (case_studies, saas): doubled inbound leads and ARR in 6 months post-seed. Cited unnamed.
- Vertify 4532985243: $10.17 / 11 clicks / 0 conv, live 4 days. Named as live, zero numbers claimed.

## QC
qc-reviewer-agent: WARN, no fatal items. Two fixes applied: (1) duration gap between the compared pairs quantified inline, (2) the example account labelled as non-SaaS financial lead gen so vertical relevance is not implied. Self-caught pre-QC: the first version compared search "Apply" CPA against PMax "Instant Quote" CPA, two different conversion actions; swapped to the matched action.

## BODY

Most SaaS Google Ads accounts I look at aren't underperforming. They're optimizing toward the wrong event, and the reporting rewards them for it.

The cleanest example of this sits in our own data, and it isn't a SaaS account, it's high-consideration financial lead gen. The mechanic is the same. That account ran two sets of campaigns side by side, same offer, both starting late February. One set optimized toward the fast top-of-funnel action, an instant quote form. The other optimized toward the further-down-funnel action the sales team actually cared about, a pricing-qualified lead. Over about five months the fast-action campaigns spent $121,544 and recorded 3,942 conversions at $30.83 each. The qualified-action campaigns spent $28,761 and recorded 27.4 conversions at $1,049.69 each. Thirty-four times the cost per conversion, same weeks, same product.

There are two readings of that and only one is right. The tempting one is that the qualified campaigns failed and should be paused, which is what happened. The real problem is 27 conversions across five months. Most campaigns need roughly 30 in a single month before Google's bidding has enough signal to steer on, so those campaigns were never really bidding toward qualified leads at all. They were guessing, at a scale where guessing is expensive. Two gaps worth naming before you weigh that number: the spend was $121K against $29K, and the qualified campaigns ran 130 and 145 days against 164 before they were switched off. It isn't a matched test, it's a comparison of rates, and the rate difference is the point.

For SaaS this is the entire problem in one picture. Optimize to the demo request or the free trial and you get volume, a good-looking CPA, and a sales team complaining about lead quality. Optimize to the closed-won account and you starve the algorithm, because a B2B SaaS company rarely produces enough closed deals per month to train bidding directly. Either choice fails on its own.

What works is neither. You pick a mid-funnel event with enough volume to bid on, something like a qualified demo attended or a trial account that hits a real activation milestone, and you feed the downstream outcome back in separately through offline conversion import so Google learns which clicks became revenue without having to bid on that event directly. Google accepts offline uploads for clicks up to 90 days old, which usually covers a SaaS sales cycle. Then Search and PMax get judged against the same qualified event instead of against each other's vanity numbers.

So for the first 30 days on your account, before touching bids or adding keywords, I'd want to answer three things: which conversion action each campaign is actually optimizing toward and how many of those it gets per month, whether your CRM outcomes are flowing back into Google at all, and where non-brand search sits against branded and PMax once brand traffic is separated out. In the account above, general non-brand search ran $92.72 per conversion while PMax on the identical conversion action ran $29.52, and a three-to-one spread like that is rarely a real performance difference. More often PMax is being credited for demand that already existed, which is a question to ask rather than a conclusion I can draw from outside your account.

Relevant work: we ran Google and Meta for a post-seed B2B SaaS company where Meta built awareness and Google captured the demand it created, and inbound leads and ARR doubled within six months. Our team currently runs Google Ads for a B2B data integration platform selling into ecommerce and accounting firms, launched this month, so it is too early for me to quote numbers on it.

Reporting is every two weeks plus a live dashboard you can open any time, not a monthly slide deck.

Two things that would sharpen this: roughly what does your monthly Google spend look like relative to five thousand a month, a few times that, or above thirty thousand? And of the demos or trials you get today, roughly what share turn into paying customers?
