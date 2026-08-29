# AU wall art / canvas print ecom - screening answers - samuel_strategic
# STATUS: DRAFT, NOT SENT. All figures verified live against Supabase 2026-08-29.

Q1. Largest ecommerce account across Google Ads, Meta and TikTok, with annual spend and ROAS.

Not one account across all three, so I will split it rather than hand you a number that blurs them.

TikTok sits in what I offer, but I have no ecommerce results to show you on it. If that is a proof requirement rather than a scope item, weight this answer accordingly.

Google, ecommerce: a Shopify brand I have run since November last year. Non-branded Shopping $17,883 at 5.52x, non-branded Search $26,847 at 5.35x, and a best seller Shopping carve-out at 8.30x on $3,889. Branded search in the same account reports 28.74x and I would ignore that number entirely, it is demand the brand already had.

Meta, ecommerce: a US replacement parts retailer, roughly $131,000 across nine months to May, about 4,500 orders at 5.53x blended, $29 per order on a $161 average order value. Separately a DTC home and lifestyle brand that peaked at $40,389 in a single month this July.

Straight answer on your $500k figure: no single ecommerce account I run reaches that on its own. My largest ecommerce accounts sit in the $100,000 to $200,000 a year range per platform. Across the whole book it is well past $20M lifetime, but that aggregate is not what you asked for and leading with it would be a dodge.

Q2. Have you managed a Google Merchant Center feed directly, and how do you approach feed structure or margin tier bidding?

Yes, directly. Not through Channable.

The structural answer first. Bidding by margin means the feed has to carry margin, so the work starts in Merchant Center with a custom label mapped to your tier, not in the campaign. Once that label exists each tier gets its own campaign and its own target, because a single campaign on one blended target will quietly average your best and worst products together and buy whatever is cheapest to sell.

I have run exactly that carve-out. On the Shopify account above, all products Shopping ran 5.52x. Pulling the best sellers into their own campaign with their own target put that subset at 8.30x, same feed, same account, same period. I have also run a category segmented PMax as feed only with no asset groups at 4.56x, which is the cleanest way to see what a feed is doing before creative gets credit for it.

The tradeoff you should hear before agreeing to any of this: every tier you add splits the conversion data further, and smart bidding on a thin campaign is worse than a blended target on a fat one. Three tiers is usually the ceiling. If your margin bands are narrow, the honest answer may be two tiers plus exclusions rather than a full tier structure.

Feed hygiene comes before all of it. Disapprovals, missing GTINs and price or availability mismatches between feed and site cost more than bid strategy does in most accounts I audit.

Q3. How would you approach the first two weeks with no briefing?

Week one is diagnosis and access, not changes.

Access first, because it is the part that becomes unrecoverable. Conversion history, audience lists, Merchant Center and the feed rules often sit in assets the outgoing agency owns rather than you. I would want ownership of the Google Ads account, Merchant Center, the GTM container and the Meta business assets confirmed in your name before they finish, since none of that history can be rebuilt afterwards.

Then a baseline built from your sales data rather than the platforms, broken out by storefront and margin tier and reconciled against what each platform claims it drove. That produces a per market offset, which is how NZ becomes a known quantity instead of a blocker.

Alongside it the diagnostics: feed disapprovals, GTIN and price mismatches, what is actually serving, which campaigns are budget limited, what each bid strategy and target is set to, and where conversion actions are firing from and being double counted.

Week two is the first changes, deliberately narrow. Feed fixes go first because they are non-destructive and usually the single largest win. The budget limited campaigns you already flagged come next, since lifting a cap on a campaign that is already efficient is the one change that does not need a new hypothesis behind it.

What I would not do in the first fortnight is restructure. Every restructure resets bid strategy learning, and doing that in week one costs you the baseline you just built plus three weeks getting back to level. Structure is a week three conversation, once the data says which part of the structure is actually wrong.

Q4. Creative production capability.

An existing team rather than something I would assemble for you. A creatives director and a creative handle static, motion and video. I write the briefs, the angles and the copy, and that split has been in place across the accounts described here.

Two things specific to your setup.

On PMax, asset groups need real volume or the campaign leans on the feed and your Shopping performance gets reported back to you as PMax performance. I run feed only asset groups deliberately when I want to see what the feed does on its own, then add assets once there is a baseline to compare against. Worth establishing which of those two your current PMax actually is before anyone judges it.

On wall art the constraint is the shot, not the volume. Most wall art accounts run the artwork flat off the product page. That works in Shopping, where the buyer expects a catalog image, and fails on Meta and TikTok, where nothing about a flat JPEG communicates scale, texture, or how the piece reads on a real wall. Room context at true scale is the asset that moves paid social in this category, and that is a photography and styling decision more than an editing one. Worth agreeing who owns it before the first test round.

Q5. Are you comfortable working from raw backend sales data instead of GA4 or platform conversions, and why might that be necessary?

Yes, and on a Shopping account it matters more than most people expect.

The reason is mechanical. Target ROAS bids against whatever conversion value you send Google. If that value is wrong the bidding does not merely misreport it, it compounds it, because the algorithm keeps spending toward the products and markets it believes are converting. A bad number in a dashboard is a bad report. A bad number inside a smart bidding signal is a bad account, and it gets worse daily.

The same distortion shows up on Meta from the other direction. On the replacement parts account there were separate campaigns optimized to website visits, add to cart, time on site and view content. Every one reported a better return than the broad purchase campaign that carried about half the budget and half the orders. None of them ever held real budget. Allocating on platform ROAS would have moved money toward the campaigns best at claiming credit.

For your three storefronts specifically: if NZ conversion data is unreliable then a target ROAS strategy in NZ is bidding against noise, and I would not run one there until the backend reconciliation exists. That market runs on a capped manual or maximise clicks strategy in the meantime, which is slower but honest, or it folds into a structure with enough combined data to bid on.

What I would want from you is orders by SKU or margin tier, by storefront, by date, with an order ID or UTM captured at checkout so it joins back to the platforms. With that I can also push corrected values back into Google as offline conversions, which fixes the bidding rather than only the reporting.

---

## INTERNAL NOTES (do not send)

**Scorecard against their required items, Samuel vs Lindsey:**

| Required item | Lindsey | Samuel |
|---|---|---|
| Google + Meta + TikTok ecom track record | Partial no | Partial (Google + Meta strong, TikTok none) |
| Google Merchant Center / Shopping feed | NO | **YES, verified** |
| Margin / product tier bidding | Meta catalogs only | **YES, 8.30x vs 5.52x carve-out** |
| Raw backend sales data | Yes | Yes, plus offline conversions |
| Self directed handover | Yes | Yes |
| Creative production | Yes | Yes |

Samuel answers 5 of 6. Lindsey answered 3.5 of 6. TikTok is the only unfixable gap and it is company-wide.

**Figures all verified live 2026-08-29.** Aura Displays acct 7860902494 (Nov 2025 - Aug 2026) for the Google
numbers; Master Spa Parts act_2752863238119036 and Neue Maison act_782415276397596 for the Meta numbers.
Accounts genericized throughout - Aura has a case_studies row but its headline is wrong (see proposal notes),
and neither Meta account has a row at all.

**Do NOT attach the Aura case study PDF.** Its stated "8-10x ROAS across 49 countries" contradicts the live
account and the answers above, which quote 5.52x. Attaching it would put two different numbers in front of the
same client.
