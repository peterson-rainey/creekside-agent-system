Hi there,

When a long-cycle B2B account shows healthy CPA but sales says the leads are thin, the cause is usually not the keywords. It's that Google is being told a form fill is the win, and on a hardware site that form collects support requests, RMA questions, existing customers, resellers, students and vendors right alongside real buyers. Smart Bidding can't tell them apart, so it finds more of whatever is cheapest to convert.

The second trap is specific to cycles like yours. Google Ads only accepts an offline conversion within 90 days of the click. If your opportunities typically form after that, importing "closed" or even "opportunity" sends the bidder almost nothing, and it quietly optimizes to the form fill anyway. The fix is usually to import an earlier stage your team trusts (sales-accepted or qualified) as the primary goal, keep later stages as secondary for reporting, and pass a value so the account learns which products and use cases are worth more.

**What I'd look at first**

1. Conversion actions: which are set to primary, whether GA4 imports and Ads tags are double counting the same form, and whether enhanced conversions for leads is set up.
2. The capture path: is the GCLID (or hashed email) actually making it from the form into your CRM, and does it survive the handoff when a lead is converted or merged.
3. Search terms against intent: research and "how does X work" queries often look cheap and convert to forms, but they rarely become pipeline. Separating those from spec, model and vendor-comparison terms usually changes where the budget goes.
4. Campaign structure: whether products and use cases have their own budgets or are competing inside one campaign where the bidder picks the cheapest.
5. Bidding and settings: target CPA or max conversions sitting on a goal that isn't qualified intent, broad match without enough negatives, Display or partner traffic switched on by default.

**How we'd work together**

One thing worth knowing up front: we're a small shop, not a solo freelancer, and none of the work leaves our team. Our dedicated conversion tracking specialist owns the GA4, GTM and offline import side, a senior Google Ads specialist owns the account, and I stay on the strategy and the reasoning. For a collaborative engagement like this, that means the person explaining a GTM change in a working session is the person who built it.

The format you described is how we'd want to run it anyway:

- A written assessment first, before anything changes, with each finding split into high impact and lower priority.
- For every recommendation: what we see, why it should change, what we expect it to do, and what number tells us whether it worked and over what window. On a long cycle that window matters, since some changes won't show up in pipeline for a quarter.
- Live working sessions to go through findings and implement the agreed changes with your team, not for them.
- Documentation of every change, so your team can manage and evaluate the account after we're done.

We'll push back on the current setup where the data says to, and we'll also tell you when a Google recommendation doesn't fit a business like yours. Most of the auto-applied ones don't.

**Relevant experience**

On the B2B side, we ran Google for demand capture and Meta for awareness for a B2B SaaS company on HubSpot, and inbound leads and ARR both doubled within six months of their seed round. I'll be honest that we don't have a hardware or AV case study to show you. The measurement problem is the same one, though: the ad platform can only optimize to what the CRM tells it.

**A few questions**

1. Roughly what is your monthly Google Ads spend, under $10K, $10K to $30K, or above that?
2. What does your CRM treat as a qualified lead today, and is sales actually marking it?
3. Typically, how long from first click to an opportunity being created?

Once I know those, I can tell you what the first two weeks would look like.

---
SCREENING ANSWERS (UNSENT, QC fixes applied)

Q1. B2B SaaS is the closest. We ran Google for demand capture and Meta for awareness for a SaaS company on HubSpot, and inbound leads and ARR both doubled within six months of their seed round. We also run Google for a paving contractor that takes on both residential driveways and commercial lots, so lead quality matters more than lead volume. I'll be upfront that we haven't worked with a hardware or AV company, so I'd lean on your team for the product and buyer context early on.

Q2. A bankruptcy law firm in Orange County came to us with one Google Ads campaign carrying every service. We audited it and split it into four focused campaigns, each with its own keywords, ads and budget, so the bidder stopped spending on whatever was cheapest across the whole mix. Conversions went from 117 to 229 and cost per conversion dropped from $86.09 to $50.29, on $11.5K in spend, only about $1.4K more than before. It's not B2B, but it's the same structural problem I'd check first in your account: products and use cases competing inside one campaign.
