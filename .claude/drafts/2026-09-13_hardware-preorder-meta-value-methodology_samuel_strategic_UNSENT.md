The value ladder decides whether Meta goes after buyers or just cheap signups. If an email signup, a demo and a preorder all reach Meta as conversions with loose values, the algorithm finds whatever it can get the most of. On a preorder funnel that is almost always signups. The ratio between values matters more than the dollar amounts themselves.

Here is where I would start:

1. Pick one optimization event. Mixing events inside one value campaign usually hands delivery to the high-volume event. My default is to optimize on preorder with value, with demo and add-to-cart as weighted secondary signals. I'd confirm that against your actual event counts before locking it in.

2. Seed the lookalike from people who kept their preorder. On a preorder, the refunds and cancellations are often your least-qualified buyers. If the seed list doesn't drop them, the 1% lookalike learns to find more of them. That has to be agreed with your instrumentation contractor before the audience gets built.

3. The fallback audience comes down to math, not taste. A seed can technically build with a small list, but a small or narrow one produces a noisy lookalike. If demo plus preorder is too thin, I'd step down the ladder by intent: preorder add-to-cart first, then demo bookings, then engaged email signups, with each tier tested separately so we can see which one holds cost per preorder.

4. The analytics review usually turns up a checkout problem first. Preorder checkouts often sit on a separate domain or platform, which breaks attribution between GA4 and Meta. The two will disagree for structural reasons before any campaign issue shows up. I'd map that gap before trusting any ROAS number.

5. Creative cadence has to fit the budget, not a generic rule. Each concept needs enough spend to produce a readable result on your optimization event. Past that, testing more concepts just spreads budget too thin. Once I see your spend and conversion cost, I'd give you a concept count per cycle.

To be upfront: we have run value-based and low-volume, high-intent audience strategy across ecommerce and lead-gen accounts, but we have not managed a physical-product preorder or crowdfunding launch. If that is a strict cutoff, I understand. The pieces you listed (value ladder, thin seed audiences, cross-domain attribution, retargeting on a long consideration window) are the same problems we solve every week, just in a different order.

Our team works across three senior buyers' books, so the account gets the combined pattern library rather than one person's history. We are used to working next to a separate tracking contractor. We write the spec for what fires and with what value, and they build the pipe.

Two questions so I can size the testing plan:
- Roughly where does monthly Meta spend sit: under $5K, $5K to $15K, or above that?
- About how many demo requests and preorders do you get in a typical month right now?
