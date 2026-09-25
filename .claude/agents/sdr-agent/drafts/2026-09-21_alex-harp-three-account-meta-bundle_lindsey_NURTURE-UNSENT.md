# Alex Harp (agency owner, 3 client Meta accounts): nurture touch 1
**Date drafted:** 2026-09-21 (Monday, confirmed via Postgres now())
**Profile:** Lindsey Bouffard
**Type:** nurture, pre-call, partner-routed (Brady's link sent 8/19)
**Lead records:** upwork_leads `ae4c4a14-87da-4c1f-92ce-eaf5675a9ddb` (stale, still "in discussion") | ClickUp `86e2ecxg3` (Referred Leads list, "Referred to?" = Brad, status "new lead") | Upwork room `room_121e1f1de2623e198204bc6c872ecfd1` (15 msgs, synced 9/19)
**Status:** UNSENT

---

## GATE: check before sending
1. **Ask Brady whether Alex booked.** If he did, send nothing: brady.md says Creekside stops following up once Brady books. There's no booking evidence in the DB. Brady's emails since 8/19 are about other leads. Queenie's inbox couldn't be checked because the Gmail connector was disconnected on 9/21 and her inbox isn't ingested.
2. **The chat is hidden in Upwork.** ClickBot, 8/19: "hide Alex Harp chat in Upwork". Unhide it to send.

## RECOMMENDED: send this one (outcome curiosity, QC's pick)

How are jobs coming in from Meta for the painting and pressure washing accounts?

## BANKED for a later nurture touch (done-for-them observation, QC PASS)

Heads up on the anxiety subscription box: its site can land in Meta's health and wellness data source category, which covers health-related products as well as providers. If it does, Meta may restrict some mid and lower funnel events, and purchases can be one of them.

Sequencing note (revised 2026-09-25): this banked observation IS touch 2. nurture.md's pre-call order was outcome curiosity, exact-niche win, pricing card, then clean breakup, and the earlier version of this note flagged that strict doc order forced the breakup into touch 2, since the exact-niche win is unavailable (no same-vertical Meta proof) and the pricing card doesn't fit a partner-routed lead. That dilemma is gone: Queenie ruled 2026-09-24 that a touch must never announce finality, and angle 4 is retired (commits 5bb6ff8 + c80ef86). No breakup to schedule, so this text is the natural touch 2. It doesn't go stale.

---

## Timeline (US Central; the Upwork paste renders Manila time, +13h)
| When | Who | What |
|---|---|---|
| Tue 7/21 11:38 AM | Alex | Wants a media buyer, Meta + TikTok, asks for capacity and results |
| Wed 7/29 5:12 PM | Alex | 3 accounts (painting, therapy, pressure washing), bundle discount, **no calls/Zooms, text/email only**, Meta only |
| Thu 7/30 3:56 PM | Alex | ~$1K/mo spend each, already running, creative needed on 2, booked jobs x2 + online product subscription, single market, "therapy" = subscription box for people with anxiety; flags the "$X" |
| Thu 7/30 4:21 PM | Alex | **LAST MESSAGE.** Asks for a ballpark, needs $500-$750 per account |
| Thu 7/30 7:25 PM | Lindsey | "$750 per account works" + asks for an onboarding call |
| Thu 8/6 3:58 PM | Lindsey | No call needed; $2,250/mo for all three; promises checklist, Loom, creative number, results |
| Thu 8/13 3:52 PM | Lindsey | "Are all three still on at $750 each?" |
| Wed 8/19 4:03 PM | Lindsey | Perfect Parking (Google case study) + routed to Brady, his Reclaim link, "$500 to $800 a month" |

As of 9/21: 53 days since his last reply, 33 since our last touch, 4 touches unanswered. Recent-contact check (14 days: Gmail, Upwork, Fathom, sdr_generation_log): clear. No expiry: the cycle ends only when he tells us to stop (ruling 2026-09-24).

## Meta facts behind the banked touch (read live on Meta's Business Help Center, 2026-09-21)
- facebook.com/business/help/1402913027039332: Health and wellness "Is associated with medical conditions or specific health statuses, provider/patient relationships, services for accessing personal health information, or health-related products and services". Categories are assigned "based on the topics related to the data source and the products and/or services provided." A Meta-assigned category can't be modified, only sent back for review.
- facebook.com/business/help/511197658391698: "Restriction on certain standard events: Restricts the sharing of specific mid and lower funnel events." Full restrictions block all events. Meta notifies "via email and notifications in Meta Events Manager". Purchase is not named, so the draft hedges with "can be one of them".
- Not reused: the 7/30 message already covered Meta's targeting/ad-copy strictness and disapprovals. The banked touch is about event data, a different mechanism, but QC flagged the overlap as a WARN.

## Validation and QC
- `validate_response.py --profile lindsey` (origin/main copy, updated 9/15): **PASS** on both final texts.
- QC (qc-reviewer-agent):
  - Recommended touch: **PASS WITH EDITS**. It cut "Heading into fall," because the seasonality of a single, unnamed market is unverified.
  - Banked touch: **PASS** after three edits. The parroting clause "where the goal is subscriptions sold online" was removed. "Once it's in" became "If it does". Sentence 3 was merged into sentence 2 with a hedged purchase claim.
- SDR's original versions, before QC:
  - A: "Heads up on the anxiety subscription box: its site can land in Meta's health and wellness data source category, which covers health-related products as well as providers. Once it's in, Meta can restrict some mid and lower funnel events. And on that account, where the goal is subscriptions sold online, purchases may not be usable for optimization."
  - B: "Heading into fall, how are jobs coming in from Meta for the painting and pressure washing accounts?"
- Rule checks:
  - Neither version mentions Brady. His only channel is a call link, and Alex refuses calls.
  - Neither restates a price.
  - No links, no em dashes, no name opener, no sign-off.
  - No we/our/agency.
  - No experience claim: Lindsey has no home-services, mental-health or subscription Meta account.

## If he replies
- Lindsey's "$750 per account works" (7/30) and "$2,250 a month" (8/6) are on record next to Brady's $500-$800. **Get Cade's ruling** before confirming any number or taking the accounts back.
- Brady's route is call-only and Alex doesn't do calls. Ask Brady whether he'll take a text-only client before offering it.
- If he asks whether Lindsey has handled the Meta category issue before: she hasn't. The tip is policy knowledge only.
- The sdr_generation_log row wasn't written (contractor_query can't insert). Next nurture touch around 2026-11-20.
