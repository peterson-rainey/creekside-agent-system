**1. A campaign spends 30% of budget at a much worse cost per conversion than the account average. First three checks before pausing.**

First, whether the number is real. I would check what conversion actions that campaign is counting versus what the account average is counting. If it is credited with a different mix, or if it is a Performance Max or cross-network campaign sitting downstream of a broken tracking template, its cost per conversion is a measurement artifact rather than a performance fact. A campaign carrying the more valuable action will always look worse on a blended count.

Second, conversion lag against the window I am reading. If the action has a two or three week lag and I am looking at the last 30 days, the most recent spend has conversions that have not landed yet and the campaign is being charged for outcomes it has not been credited with. I would rerun it on a window that ends where the lag ends.

Third, segment before judging. Network, device, geography, campaign type, and search terms. A bad blended number is usually a decent core with an expensive tail attached, and the tail is a negative keyword list or a network setting rather than a pause. Thirty percent of budget almost never deserves a binary decision.

The thing I would want to know before pausing at all is what happens to the volume. If that campaign is capturing demand another campaign would simply recapture, pausing frees real money. If it is the only thing serving that demand, you do not get the budget back at the account average, you get less volume and a flattering dashboard.

**2. Two conversion actions of very different value in one campaign. Problem and fix.**

Maximize Conversions and Target CPA treat a conversion as a unit. Both actions count as 1.0, so the bidder is being told a brochure request and an open day signup are the same win. It will do exactly what you asked and go find the cheapest one. That reallocation happens everywhere at once, in which queries it bids on, which audiences it leans into, which assets it serves, and it compounds, because the cheap action generates more conversion data, which makes the model more confident about the cheap action.

Your Target CPA also stops meaning anything. Hitting a $50 target is excellent if those are all signups and terrible if they are all brochures, and the reported figure cannot tell you which.

The fix is to stop counting and start valuing. Assign real values to both actions, derived from your own funnel rather than guessed, so signup value equals what a signup is worth times the rate it converts downstream, and the same for the brochure. Then move to Maximize Conversion Value with a target ROAS. Budget chases the signup because it is worth five times more, which is the truth, rather than because you told the algorithm to prefer it.

Two honest constraints. Value based bidding needs volume, and if signups are sparse in a given campaign the strategy drifts and you get erratic spend. Below roughly fifteen of the valuable action per campaign per month I would instead make the signup the only primary conversion action, demote the brochure to secondary so it is still observed but not bid on, and accept the lost signal. The better long term answer is importing the downstream outcome, the actual enrollment, as an offline conversion, so Google optimizes to the thing you get paid for rather than a proxy for it.

**3. Why cost per conversion A and cost per conversion B cannot be added to explain the budget.**

Because each of those calculations already assigns one hundred percent of the campaign cost to a single action. Cost divided by A charges the whole budget to A. Cost divided by B charges the same whole budget again to B. Adding them charges the budget twice.

The arithmetic makes it obvious. Cost over A plus cost over B equals cost times the quantity one over A plus one over B, which is not cost over the quantity A plus B. Cost per conversion is a ratio with cost on top, and ratios with a shared numerator do not add.

What does add is the reciprocal. Conversions per dollar is additive, because A over cost plus B over cost equals A plus B over cost. So the identity that actually holds is that one over the blended cost per conversion equals one over CPA of A plus one over CPA of B. The blended figure is a harmonic combination, not an average and not a sum.

Practically, there are only two honest ways to talk about this. Either report blended cost per conversion, cost divided by all conversions, and say plainly that it mixes two products. Or allocate the cost between the actions on a defensible basis, share of conversion value being the usual one, and report an allocated cost per action with the allocation rule stated. What you cannot do is present two unallocated figures side by side and let a reader infer they partition the spend. They do not, they overlap completely, and the same click can produce both actions.

**4. Checking whether a Google Ads tracking setup is leaking into Direct in GA4.**

Start with the volume gap. Pull Google Ads clicks for a date range and GA4 sessions where session source medium is google / cpc for the same range and property timezone. Clicks and sessions never match exactly, because of bounces before the tag fires, consent, and cross device, but a shortfall past about twenty or thirty percent is structural rather than noise.

Then look at where Direct is landing. In GA4 traffic acquisition, filter to Direct and add landing page as a secondary dimension. Direct traffic should concentrate on the homepage and branded pages. Direct sessions arriving straight onto a paid only landing page, one nobody could reach without clicking an ad, is the leak showing itself. I would also check Unassigned, not just Direct, because a partially recognized click often lands there instead.

Then prove it on a real click. Take the ad's final URL with the tracking template applied, load it, and inspect what actually arrives in the address bar after every redirect resolves. This is where a renamed gclid shows up as itself. If the parameter has been renamed, GA4 never sees gclid, auto tagging cannot attribute the session, and it falls back to UTMs. With no UTMs present, that session is Direct by definition. I would watch the network request to the collect endpoint on that same load to confirm what the tag received rather than what the URL appeared to carry.

Three specific things I would confirm while in there. That auto tagging is switched on in the Google Ads account. That the Google Ads and GA4 link is live and GA4 is populating campaign names rather than showing paid traffic with no campaign. And that nothing in the redirect chain strips query parameters, which is the common silent failure when a tracking template points at a redirector or the site canonicalizes URLs and drops everything after the question mark.

**5. When to narrow geography to cities and when to stay nationwide. The mechanism.**

The mechanism is data density per model, not targeting precision. Smart bidding already sets a different bid for a rich postal code than for a rural one, using far more signal about that location than either of us has. Location targeting is a filter that decides who is eligible. It is not an optimization lever, and treating it as one is where accounts get hurt.

So splitting a nationwide campaign into city campaigns does not make the bidding smarter. It takes one well fed model and divides its conversion history into several starved ones, each now learning independently and each more likely to sit in a thin data regime where target CPA overshoots and spend goes erratic. You have replaced Google's per location bidding with your own prior about which cities matter, and you have paid for it with signal.

I would narrow in three situations. When you physically cannot serve outside the area, in which case it is not a strategy question. When the conversion economics genuinely differ by region, different value per lead or different competitive cost, and each resulting campaign still clears enough conversions on its own to keep the bidder out of thin data. And when creative or offer must differ, language, currency, compliance, since that is an ad level requirement rather than a bidding one.

There is one budget argument for narrowing that is legitimate and often mistaken for a targeting argument. If the budget cannot cover the full footprint at a competitive impression share, you are thinly present everywhere and winning nowhere. Concentrating the same money into a subset buys a winnable share there. That is a spend sufficiency decision, and I would make it explicitly on impression share and lost share to budget rather than dressing it up as better targeting.

I would stay nationwide whenever you can serve nationwide and the budget supports it, and let the algorithm allocate. The setting I would check first in either case is Presence versus Presence or Interest, because that decides who is actually included, and it moves more money than any city list does.
