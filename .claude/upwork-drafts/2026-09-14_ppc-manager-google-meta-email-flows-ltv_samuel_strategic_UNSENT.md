# Upwork Proposal - UNSENT
Job: PPC manager, Google + Meta campaign management, testing, reporting, plus email campaigns and flows to improve customer lifetime value.
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-14 (Postgres now(); local clock says 9/15)

## SCREEN
- Ads in scope: YES (Google + Meta named, day-to-day management). No-ads DQ does not fire.
- Email campaigns/flows: real in-house Klaviyo service line (reference_klaviyo_email_is_real_service_line). ZERO performance numbers, none cited. samuel-identity.md says ignore email; overridden by practice (9/11 Samuel draft, Glimmr).
- Spend: UNSTATED. $5K screen cannot fire (no prose forecloses it). Closing question asks spend as a range with the rationale (feedback_budget_ask_relative_range).
- Contract type / rate / geo / payment verification / vertical: UNSTATED. "Lifetime value" + "flows" reads as ecom or repeat-purchase, unconfirmed; the closing question asks what they sell.
- Duplicate bid: upwork_jobs last 30d has no job with this wording. Nearest: "Paid Media Manager: Google Ads, Meta & Email (Ecommerce)" (9/11 General, 9/12 Lindsey), a different post (the 9/11 text was three sentences, hourly). Job title not provided, so check the title against upwork_jobs before sending.
- No fee quoted (spend unknown; sdr pricing-docs conflict).

## Proof used
- Aura Displays (Google ONLY, ACTIVE, Shopify), live pull 2026-09-11, last 90d 6/12-8/31: branded Search 22.95x, non-brand Search 4.39x, non-brand Shopping 3.77x. Cited as "above 20x" / "about 4.4x" / "about 3.8x". Blend never quoted.
- Master Spa Parts (Meta, replacement parts ecom, CHURNED, past tense): Sep 2025-May 2026 $124,508 / 4,313 purchases / $28.87. ROAS not cited.
- Klaviyo zero Added-to-Cart onsite tracking catch (Nightlark, not named). No number.
- Platform features (expert-review web-verified 9/14): Google new customer acquisition goal (PMax, Search, Demand Gen; needs customer lists). Meta existing customer budget cap (Advantage+ sales; removed Feb 2025, reintroduced Mar 2026; needs custom audience), hence "where the account has it".

## QC (qc-reviewer-agent: NEEDS WORK) + expert review, fixes applied
1. Team line lifted "day-to-day management and reporting" from the post, reworded.
2. "around 4x" blended Search + Shopping inside a paragraph arguing against blends, split into 4.4x / 3.8x.
3. "we ran" vs "we run now" skim risk, "we used to run".
4. Opener implied platforms steal email's credit specifically, softened to "can end up taking credit".
5. Discount-buyer claim softened from a rule to "a segment flows can struggle to re-engage".
6. 90-day email value framed as a conservative estimate refined on cohort repeat data.
7. Meta cap hedged "where the account has it" (on/off availability history).

## PROPOSAL (paste-ready)

When email flows are doing their job on lifetime value, Google and Meta can end up taking credit for it. Both count a repeat order as a purchase, same as a first one, so any returning buyer who touched an ad inside the attribution window makes cost per purchase look lower than the real cost of a new customer. Bidding then drifts toward people who already bought.

The first split we'd make is new customers versus returning ones. Google's new customer acquisition goal and Meta's existing customer budget cap, where the account has it, both help, but only with customer lists synced and kept current. With acquisition cost measured on new buyers, the target can come from first order margin plus a conservative estimate of what email adds over 90 days, refined once cohort repeat data comes in, rather than asking the first order to pay for itself.

One tradeoff: lower cost per purchase isn't always better. Pushing it down can skew toward discount-driven buyers with smaller orders, a segment flows can struggle to re-engage. We'd read repeat rate by campaign alongside CPA, so a campaign that looks expensive but brings back buyers doesn't get cut on week-two numbers.

Blended numbers cause a similar problem on Google. On a Shopify store we run now, branded search sits above 20x while non-brand Search runs about 4.4x and Shopping about 3.8x, so budget calls get made on the non-brand lines. On Meta, a replacement parts store we used to run put about $124K into roughly 4,300 purchases at around $29 each from September through May.

We build Klaviyo flows in house for ecommerce clients, with no revenue figure to hand you there. That work mostly turns up plumbing. One store's onsite tracking was sending zero add-to-cart events, so its abandoned cart flow would have fired on nobody.

Our team runs the daily optimization and pulls the reporting, and I stay on strategy.

What are you selling, and what range is spend in across Google and Meta right now? Any split I'd suggest only helps if it fits the range you're working with.

## SCREENING QUESTION: "Describe your recent experience with similar projects"

### Verified 2026-09-14 via contractor_query
- reporting_clients active on email + google + meta: Tiami (d3a45c57, Shopify Plus luxury mattress) and Nightlark (9db79f64). Email retainers signed 2026-07-14, flows still early/draft. NO email, LTV or Meta conversion numbers citable for either (Tiami Meta conv NULL, Nightlark Google 0.21x): capability only.
- Active on google + meta (with or without email): 8 clients. Active email retainers: 6 (Tiami, Nightlark, Dr. Laleh Cosmetic, Snackify, MLS Signs, Pink Moon Bay).
- Tiami Klaviyo craft (2026-08 build record): existing Abandoned Cart excludes Checkout Started, so a new cart flow must mirror it or double-sends; GET /catalog-items/ returned empty, product blocks built from event properties.
- Aura (Google only, Shopify, built from zero Nov 2025), 9/11 pull: non-brand Nov 25 $1,901 @ 11.56x; Mar 26 $8,813 @ 4.81x (peak spend); Aug 26 $4,735 @ 3.41x.
- Master Spa Parts (Meta, CHURNED): best month Apr 2026 $19.89 per purchase. Q4 CPM-rise claim NOT used (retired).
- Nightlark zero add-to-cart catch deliberately NOT repeated (already in the cover letter).

### ANSWER (paste-ready)

The closest match is two ecommerce stores where our team runs Google, Meta and Klaviyo together right now, one of them a Shopify Plus mattress brand. Email on both started this summer, so there's no lifetime value figure I'd put in front of you yet. What that work has surfaced so far is mostly plumbing. On the mattress brand, the existing abandoned cart flow already excluded anyone who had started checkout, so a new cart flow had to mirror those exclusions or the same shopper would get both sequences. Its Klaviyo catalog also came back empty through the API, so product blocks had to be built from the shopping events themselves.

On the ad side, our team runs Google and Meta together for eight accounts today. The two with numbers worth sharing sit outside that group, one on Google only and one we no longer run.

A Shopify store we built on Google from zero last November opened non-brand at about 11.6x on under $2K a month. Cold spend reached about $8.8K at its March peak at roughly 4.8x, and August ran about $4.7K at 3.4x. Branded search makes the account-level number look far better than that, so budget calls get made on the non-brand line.

A replacement parts store we ran on Meta had its best month in April at about $20 per purchase, roughly a third under its account average.

### QC (qc-reviewer-agent: NEEDS WORK), fixes applied
1. BLOCKING: the two cited accounts read as part of the "eight on Google + Meta today" pool; neither is (Aura Google-only, Master Spa churned). Now stated explicitly.
2. Restated $29 average from the cover letter cut; delta kept ($19.89 vs $28.87 = 31% under).
3. "I mentioned" self-reference removed.
