# SCREENING ANSWERS — Paid Ads Manager, beauty/aesthetics agency
Profile: Lindsey | Style: lindsey_default | Drafted 2026-08-31 (Postgres now())
STATUS: UNSENT. Job carries a white-label/subcontractor auto-DQ. See the proposal file's screen record.

NOTE ON THE QUESTION SET: Q3, Q4 and Q5 are boilerplate from a design/creative job template and do not
match the media-buyer role described in the post. Answered as ad-creative process rather than visual design,
which is the honest read. Flagged for Queenie.

---

## 1. Describe your recent experience with similar projects

Straight answer first. Aesthetics is the strongest thing on my list, skincare product brands are not, and I would rather you know which is which before we talk.

The account I run day to day is a cosmetic and aesthetic practice on Meta, just under $100,000 a month and roughly $1.19 million across the last twelve months. It is live right now. That is the closest match to what you described, both in category and in the fact that nobody hands me a finished plan.

Creative testing, on a second aesthetics account I ran this past year. Video and static ran against the same audience for twelve months. Video bought impressions at about $27 CPM, static at about $60. Every surface read said cut the static. Static was the one producing results at a materially lower cost per action, on under a third of the budget. That only became visible because the two formats were in separate campaigns rather than competing inside one ad set.

Multi-client reporting, on a dental and implant group until they wrapped earlier this year. English and Spanish campaigns, weekly written notes tied to defined triggers rather than whatever moved that week, and an approval step before anything reached the client dashboard.

Email sits alongside this. Recent work includes a three flow rebuild for a home and lifestyle brand, welcome and abandoned checkout and abandoned cart, with the exclusion logic mirrored so the same person cannot get hit twice.

Before agency work I built and sold my own e-commerce business, which is where the margin side of this comes from.

---

## 2. Please list any certifications related to this project

None, and I would rather say that plainly than pad the answer.

I do not hold Meta Blueprint or a Google credential. I have never found that the certified buyers I have worked alongside made different decisions than the uncertified ones, and the exams test platform vocabulary rather than judgment about where budget should go.

What I would offer instead is that everything in my answers is checkable. Give me view access to one live account and an hour, and I will tell you what I think is wrong with it and why, before any money changes hands. That is a better read on whether I can do this work than a badge is.

If a certification is a hard requirement on your side, say so now and neither of us wastes a call.

---

## 3. Describe your typical design process and methods

Reading your post, I think this means ad creative rather than visual design, so that is what I will answer. I do not design assets myself. I work from what the brand or the designer provides.

First thing is reading the account before touching creative. The question is not which format is cheapest, it is which format is actually buying results. Those are frequently different answers, and CPM is where most people get it wrong.

Formats go in separate campaigns. If static and video share an ad set, delivery chases the cheaper impression and can starve the format that is actually converting. Separating them is most of what makes a creative test readable.

One variable at a time. Hook, format, offer, changed together tells you the combination moved and nothing about why.

Fatigue gets measured, not assumed. I work to explicit triggers: frequency crossing about 4.0, or a seven day cost per lead running more than 25 percent above the ninety day figure. On one account I left creative running past eight months because frequency was sitting at 1.24 and the seven day cost per lead was actually below the ninety day number. Rotating on a calendar instead of on a signal throws away winners and buys a fresh learning phase for nothing.

When there is a brief from the brand side, I treat the locked pieces as locked. Offers, claims, positioning are theirs. Format mix, test structure and what gets scaled are mine to design and recommend back.

---

## 4. Describe how you work on a cross-functional team

The clearest version of this was a dental and implant group where the client had a marketing director who wrote the strategic brief. He owned audiences, the offers, and the locked claims, including which claims were legally allowed on which service line. I owned bid strategy, optimization event, placements, budget allocation, creative format mix, frequency caps, naming conventions and the test methodology, and I recommended those back rather than just executing them.

That split worked because it was written down. Most cross-functional friction I have seen comes from two people each assuming the other owned a decision, and it usually surfaces at the worst moment.

Two other things from that engagement. Scope boundaries were explicit, so channels handled by other specialists stayed out of my lane and I did not quietly optimize against someone else's numbers. And the weekly client notes went through an approval step before posting, which matters when the person reading them is a client rather than a colleague.

With designers I try to send back the specific thing rather than a verdict. Not "this one underperformed" but which format, at what frequency, against which audience, and what I would change first. A designer cannot act on a ROAS number.

With account or client leads, the useful habit is flagging a problem while it is still small and boring. Nobody minds a heads up in week two. Everybody minds finding out in month three.

---

## 5. Where do you get inspiration from?

Honestly, not from ad inspiration galleries. Those show you what looks good, not what worked, and the two come apart constantly in this category.

Most of it comes from customer language. Reviews, comments on the ads, the questions people ask before they book or buy. Customers describe the thing they want in words the brand almost never uses about itself, and that gap is usually where the good hook is hiding. Brands talk about ingredients and technology. Customers talk about what they stopped being self conscious about.

Competitor ad libraries, but for longevity rather than aesthetics. Anything running six months or longer is working, and that is the only free signal you get about someone else's testing budget. A beautiful ad that ran for three weeks tells you nothing.

The account's own losers, which get looked at more carefully than the winners. A winner tells you one thing works. A pattern across failures tells you what the audience does not believe, which is more useful and much cheaper than finding out at scale.

And my own time running an e-commerce business. Having been the person paying for ads out of actual margin changes what looks like a good idea.

---

## Verification record (live, Postgres 2026-08-31)

- **$100K/mo aesthetics account** = `act_868498138612020`, " Lux Dental Spa FB Ads ". $1,186,491.11 / 12mo, $98,874.26/mo, live, Lindsey is platform operator. Cosmetic/aesthetic dentistry and med spa. **Spend only. No CPA cited anywhere** (412 of 47,450 rows carry conversions, 99.1% NULL). Present tense is correct.
- **Static vs video** = `act_1216889619869757`, "Doctor Laleh Main Ad Account". Video $10,695.91 / $26.90 CPM / 75 conv; static $3,344.20 / $60.15 CPM / 38 conv. Letter and Q1 cite the **CPM spread and budget share only**; cost per action stated as "materially lower" with no figure, because Laleh CPA is non-citable. Past tense: all 8 campaigns PAUSED. Called "a second account", never conflated with the $100K one.
- **Dental/implant group** = Fusion Dental Implants, `act_938570599860690`. CHURNED 2026-07-22, written in **past tense**, unnamed. Cross-functional detail from `agent_knowledge` reference "Fusion Dental Implants — Meta Campaign Brief v0.4 (2026-04-29)", client-side Marketing Director, verbatim ownership split: specialists own "bid strategy, optimization event, placements, exact budget allocation, creative format mix, frequency caps, naming conventions, A/B test methodology, ad set structure." English + Spanish confirmed. Approval-gated dashboard notes confirmed across four `strategy_update_pending` rows, all "Pending Lindsey Review".
- **Fatigue triggers** (freq >= 4.0; 7d CPL >25% above 90d) and the **1.24 frequency / 7d CPL below 90d** example are verbatim from the 2026-07-15 Fusion Note D row. The 8+ months figure is that row's "Legacy EDH start: 2025-10-31". Real, not invented.
- **Three flow rebuild** = Nightlark (ACTIVE, Lindsey's). Welcome 4 emails, abandoned checkout 3, abandoned cart 3, message-level filters Placed Order=0 AND Checkout Started=0. Claimed as a build only; Nightlark has no results on file and none are claimed.
- **CERTIFICATIONS: ZERO, re-verified this session.** No certifications table exists; `agent_knowledge` returns no Meta Blueprint or Google Partner credential for anyone. Standing rule upheld: never claim either. Q2 answers "none" outright.
- **Not claimed anywhere:** any skincare product result, any gender/demographic breakdown (no such data exists in our Meta tables), any digital-product result, any Ella Skincare figure (access lost 2026-07-28, zero rows).

### Style compliance
No em dashes, no URLs, no contact info, no calendar link, no client names, no sign-off on any answer. Google not offered as a service. Q2 refuses the credential rather than padding. Each answer leads with the honest limit where one exists.
