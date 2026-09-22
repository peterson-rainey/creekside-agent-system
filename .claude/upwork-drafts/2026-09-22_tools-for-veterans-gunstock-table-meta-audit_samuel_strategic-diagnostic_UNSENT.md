If every M1 Garand Gunstock Table sells for about $400, and that $400 is the full order value, Meta's purchase ROAS should equal $400 divided by your cost per purchase. When those two numbers don't reconcile, the purchase count and the purchase value are coming from different places, and the audit is about finding out which one is wrong. The answer decides whether the old campaign lost money or was just measured badly.

How the audit would investigate the 1.50:

1. Divide purchase conversion value by purchases, same date range, same attribution setting. That is Meta's own average order value. If it lands near $400, the ROAS and purchase columns are being read on different windows, and nothing is broken. If it lands well under $400, it's tracking.

2. Split Purchase events by source in Events Manager, browser and server. The simplest cause comes first: some purchases firing with no value at all. The other common shape is the Pixel sending the purchase with a value and the Conversions API sending the same purchase without one, event IDs mismatched, so Meta counts two purchases carrying $400 between them. Our tracking specialist would also check currency, whether value excludes shipping, and whether checkout finishes on a third-party payment page that fires the event without a value.

3. Line Meta's purchases up against your actual order export by day, 7-day click only. Store revenue divided by ad spend is the one number tracking can't distort.

4. One live test purchase through Test Events, refunded, to confirm one event, one value, deduplicated.

Worth checking too whether any ad was ever rejected or restricted on the product image itself, since restricted delivery can look a lot like weak creative in a report.

On the relaunch, your math is tight. A $100 cost per purchase is 25% of price. Meta wants roughly 50 purchases a week to exit learning, which is $5,000 a week at your target. Under that, learning just takes longer, so the 30-day campaign stays one consolidated campaign rather than splitting budget by age or geography to force volume. Stop-loss rules pause any ad set that spends $200 without a purchase once it's past the first 48 hours, and reporting shows profit per table after ad cost, not ROAS alone.

Two examples, and neither sits in your $250 to $500 band, one below and one above. Not me personally on either. Our Meta specialist ran both hands on, our tracking specialist owns Pixel and CAPI work, and I stay on strategy.

A replacement parts store that came to us through a paid audit, like yours. Our specialist took fourteen campaigns down to seven in the first month. March to May: about $40,000 in spend, about 6.8x Meta-reported ROAS, around $23 per conversion on orders averaging about $150. I can't tell you which change moved it, and that engagement has since ended.

A luxury furniture brand, orders running roughly $480 to $1,300. About $105,000 over four months, around $274 per conversion on the sales campaigns, Meta-reported ROAS 1.65x in May and 1.84x in June. July hit 4.17x, but 59% of July spend was a 50%-off sale, so I'd never hand you that number as a run rate. That brand has since taken ads in-house.

One thing to flag: we don't run 30-day management trials. A new purchase campaign is usually still learning at day 30, so the verdict would judge noise. Management runs a 90-day minimum, then month to month. The audit stands alone: typically $1,000 to $1,500 depending on campaign count, and yours sits at the low end. Reporting is a live dashboard you can check any day, with a written profitability read every two weeks. Your account, Pixel, data, audiences and creative stay yours throughout.

Where does checkout actually happen, your own store or a donation or payment platform? That one answer usually tells me which of the four checks finds it.
