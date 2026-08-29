1.

The cleanest way to separate the two is to compare the same page against itself. Pull add-to-cart to purchase rate for paid traffic and for organic, email and direct over the same window. If organic converts carts at 30% and paid converts them at 8%, the page is fine and the objective is selecting a different population. If every source converts carts badly, it is the funnel and no optimization change will fix it. Then split the funnel one step further, because add-to-cart to checkout and checkout to purchase fail for different reasons. People initiating checkout and abandoning is usually shipping cost, price or trust at the final step, not targeting.

The threshold I use to switch is roughly 50 purchases per week per ad set, which is where Meta exits the learning phase. Count it per ad set, not account wide, because that distinction is what usually holds people on add-to-cart longer than they need to be. At $69 to $89 that is somewhere near $2,000 to $3,500 per week per ad set at a 2x target.

The week after the switch will look worse, and that is expected. CPMs rise, volume drops, and cost per purchase gets uglier for five to seven days while the ad set re-enters learning. I would hold through at least one full learning cycle before judging it, and I would judge on cost per purchase, not on cost per add-to-cart, which is supposed to get worse. One more thing on sequencing: do not switch the event and consolidate ad sets in the same week. One change at a time or you cannot attribute the result to either.

2.

Structure first. The instinct is to duplicate the winner into several new ad sets, and that is usually what breaks it, because you fragment the signal and every copy re-enters learning. I would consolidate into fewer ad sets, run broad, and keep the ad stack small at three to five ads so the winner keeps getting the majority of delivery. On budget, 20% to 30% increases every 48 to 72 hours on the existing ad set. If a bigger jump is needed, duplicate at the higher budget and let the original keep running until the new one stabilizes, rather than yanking the budget on something that is working.

Around it I would test hooks first, meaning the first three seconds, because that is the cheapest variable and the one your pipeline can turn around fastest. Copy and offer framing second. Audiences last, since on broad delivery audience testing is generally the lowest yield of the three.

The two lists judge different things. For an A/B test: hook rate, hold rate, outbound CTR, cost per outbound click, and cost per purchase against a sample size you declared before launching. Judge the test on the metric closest to what you changed, because a hook swap read on purchases is mostly noise at this AOV. For scaling health: frequency, CPM, CTR trend, cost per purchase, ROAS, new versus returning reach, and the share of total account spend concentrated in a single ad. That last one is a risk measure rather than a performance measure, and it matters once one video is carrying the account.

3.

Ring-fence the testing budget in a separate campaign, usually 10% to 20% of spend. It has to be a separate campaign rather than another ad set inside the winner, because campaign budget optimization will starve the test on purpose. That is the whole mechanism behind most angles that look dead.

The weekly rhythm is straightforward. Early in the week, review the prior week's tests against thresholds that were set before launch and make keep or kill calls. Midweek, ship two to four new concepts into the test campaign. Winners only graduate into the scaling campaign after clearing a threshold on hook rate and cost per add-to-cart, since waiting for purchase volume on a test budget takes too long to be useful.

Telling a dead angle from an unfunded one comes down to checking delivery before rendering a verdict. If a concept got under a couple thousand impressions or a few hundred dollars, Meta never gave it a real read and killing it is a false negative. So I look at impressions, spend, and whether the ad set was still in learning before I call anything. The structural fix is to test in a campaign with ad set level budgets or a spend floor, so every concept gets a guaranteed minimum before it is judged. On cannibalization, overlapping broad audiences do compete, and the read is whether the scaling campaign's CPM moved when the test campaign launched. At 10% to 20% it is usually noise.

4.

Fatigue and auction shifts leave different fingerprints. Fatigue looks like frequency climbing while hook rate and CTR fall, with CPM roughly flat. An auction or seasonality shift looks like CPM rising while CTR holds or even improves, and it shows up across every ad in the account at once rather than only on the winner. The clean separator is that if the creative metrics are stable or improving and only the cost metrics moved, the creative is not your problem.

Ran into exactly this on a parts account. Blended ROAS fell from 6.45x in October to 3.22x in December on essentially flat spend. CTR actually rose over that same stretch, 1.59% to 1.86%, while CPM climbed about 45%, from $8.06 to $11.68. Judging creative on ROAS that quarter would have meant cutting the best performers in the account. CPM came back to $8.10 in January and returns recovered without touching the creative. What I took from it is to hold per angle baselines on hook rate and CTR from before the expensive stretch, and cut on creative metrics rather than blended return when the auction is moving.

On refresh order, iterate first. New hook, same body, same offer, because it is cheap and it preserves whatever is working. Relaunch fresh only when frequency is genuinely high and iteration has stopped responding. Replace the angle only after successive iterations fail to restore hook rate, which is the point where the angle is exhausted rather than the execution.

5.

My responsibility ends at the click and at the match between what the ad promised and what the page says. I do not build or own the page. That said, treating it as someone else's problem is how you end up optimizing into a wall, so I will diagnose it, name the specific fix, and hand it to whoever owns the page.

The diagnosis is a comparison, not a judgment call. Pull the same page's conversion rate from other traffic sources over the same window. If organic and email convert at 3% and paid converts at 0.4%, it is a traffic or message match problem. If every source converts badly, it is the page, and that is worth knowing before anyone spends a week rewriting ads. From there, segment paid by placement, device and individual ad. A large mobile to desktop gap usually points at page speed or a broken mobile layout. One ad converting far worse than the others on the same page is a promise mismatch in that ad, not a page issue.

Before concluding any of it, I would confirm the mechanics: pixel and Conversions API firing correctly, no duplicate events inflating the numbers, and add-to-cart and purchase actually recording. Bad event data explains this exact symptom often enough that it is worth ruling out first. One honest pushback on the premise: cheap and qualified are frequently in tension, and broad cheap traffic can look qualified on click metrics while having no real intent. I would want to see engagement and bounce behavior before accepting that the clicks are qualified and the page is at fault.
