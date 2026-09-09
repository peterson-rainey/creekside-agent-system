# Upwork Proposal - UNSENT
Job: Meta + Google Ads specialist to migrate/rebuild existing campaigns off a third-party ad platform into native Meta and Google accounts. VMS/dietary supplement DTC ecom. Fixed-price project, no ongoing management at this stage.
Profile: Samuel Rainey | Style: samuel_strategic-diagnostic | Date: 2026-09-10

---
Most of the risk in this project sits in one question the post does not touch: whose pixel and whose conversion actions has the third-party platform actually been firing into?

If it ran your ads through its own Business Manager and its own dataset, three things are true on day one and none of them appear in a campaign export.

1. Your custom audiences do not come with you. Site visitors, ATC 30/60/180 day, past purchasers, and the lookalike seeds built off them all live on their pixel. If your own pixel was not firing in parallel this whole time, your retargeting pools start empty, and "retargeting where applicable" becomes a 30 day wait rather than a build task.

2. Meta's learning does not transfer either. Identical creative, identical targeting, rebuilt natively, still starts at zero conversion history. How long the dip lasts is a function of your volume rather than the calendar: an ad set clearing 50 purchases a week re-stabilizes in days, one sitting at 15 can take a month. Either way it is structural, not a build error.

3. On Google, if their tag was the conversion source, the account has no conversion history to bid against, which rules out tCPA and tROAS at launch. Before defaulting to manual or max clicks with a threshold, I would check whether the current platform can export historical conversion events with timestamps, because those can often be imported to seed Smart Bidding instead of waiting out a cold ramp. Porting the old bid strategy over untouched is how these rebuilds fail in week one.

The same ownership question applies to Merchant Center. If they owned the feed, your Shopping and PMax inventory carries it too.

So the first thing I would do is not build anything. It is pull the current setup and confirm which of those apply, because that changes the sequencing of everything after.

Supplement specific: dietary supplements are a restricted category on Meta, 18+ gated, and review runs stricter on a fresh account with no spend history. Creative approved for a year under their account can get rejected on first pass in yours, usually on implied health claims or personal attribute phrasing. I would push your top spending existing ads through review before the full build, so that surfaces on your schedule and not on launch day.

On the Add to Cart campaigns, worth checking whether you need them as separate campaigns at all. It is the same 50 event threshold as above. Under it, optimizing to ATC is right because the purchase signal is too thin to learn on. Above it, a separate ATC campaign competes with the purchase campaign in the same auction and buys the same user twice. We ran that comparison on a parts ecommerce account: the purchase optimized structure came in at 5.53x, and inside it the broad pair beat the interest stacked pair 4.99x to 3.37x.

Six years on Meta and Google. Our team currently manages roughly $249K a month in combined spend across the two platforms. Closest relevant work:

Join Piper. We inherited a Google account with duplicate conversion tracking and brand only targeting, likely the same diagnosis waiting under a third-party platform. We fixed the tracking before touching structure, then rebuilt.

Aura Displays. Shopify ecommerce on Google, Search plus Shopping plus PMax across 49 countries. $82,928 spend against $1,043,575 tracked revenue over ten months. Return ran in the thirties early and has come down into the 7x to 9x range as we pushed budget into colder non brand inventory, which is the honest shape of scaling past brand demand.

We also run a supplements brand on both platforms. It signed recently, so I am not going to quote results that do not exist yet.

On keyword research, the deliverable is a grouped map rather than a list. Every term tagged by intent stage, split brand vs non brand vs competitor before any of it reaches an ad group, match types per group instead of per account, and a negative list seeded from the search terms report of the nearest adjacent account we run. On Aura, that brand split is what exposed a $0.35 branded CPC sitting against $1.26 non brand, which is the number that tells you what the account is actually buying. For a supplement brand the first pass also screens terms Google restricts under healthcare and medicines, so we are not building ad groups around keywords that will never serve.

Fixed price: $3,000 total, $1,500 per platform. That covers the audit of the existing setup, the rebuild in both accounts, tracking verification including Conversions API on Meta and enhanced conversions on Google, QA, launch, and the written structure and recommendations summary. Ten business days for both platforms, clock starting at account access, not at signature.

One question before I quote the management side: is current monthly spend across the two platforms closer to $5K or closer to $50K, and do you expect it to hold or grow after the rebuild? We price management as a percentage of spend, so that range is the only thing I need.
