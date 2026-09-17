# Upwork Proposal: TikTok and Meta ad management, "looking for someone with experience"

- **Profile:** Lindsey | **Style:** lindsey_default (request said "strategic + diagnostic style, write it in lindsey_default" — resolved in-message, same as the 9/14, 9/15, 9/16 and skincare 9/18 precedents)
- **Date:** 2026-09-17 (Postgres `now()`; local shell clock reads 9/18 and is unreliable) | **Status:** UNSENT
- **Attachment:** NONE. No attachable Lindsey artifact exists (Blush Camera PDF is DO-NOT-ATTACH; Master Spa Parts and Neue Maison have no case-study PDF). Results-attached line omitted.
- **Char count:** 3,612 of 5,000.

## PROPOSAL (paste-ready)

Run TikTok and Meta at the same time and both platforms will claim the same purchase. Which one do you plan to believe, and what happens to budget when they disagree?

I ask because the most convincing month I had this year wasn't real. A luxury furniture brand I run hit $40,389 in July at 4.17x, its best month in a year of management. It was a 50% off promo plus retargeting. Nothing in the prospecting had improved. Scaling off that number would have made August an expensive lesson.

Two platforms make that trap faster, not slower. Each one reports the conversions it can see, so a well-timed promo can look like two separate wins and you end up funding the same customer twice. The number that settles it is new-customer share, not blended ROAS. If spend is climbing and new-customer share is flat, the platforms are billing you for people who were already coming.

So the way I'd run this is to keep one platform as the volume engine and judge the second on what it adds to that number, not on its own reported return. In practice that means holding a winner flat for three to five days after a raise before touching it again, and moving budget in roughly 20% steps, because a bigger jump resets learning and costs you the read you were trying to get.

The accounts I've personally run on Meta:

A replacement parts store. $12,000 to $15,700 a month across nine months, about $121,000 total, 4,188 purchases at roughly $29 each, around 5.5x. Mine end to end: account structure, budget, testing, creative direction, reporting.

The luxury furniture brand above. $17,000 to $40,000 a month, about $210,000 over the past year, same scope. I split prospecting by product line instead of running one blended campaign, which is how I caught a chair lane sitting at 0.40x and cut it in 12 days while another lane held 2.36x.

A consumer camera brand. Up to $19,972 a month, $58,298 total, 623 purchases at $93.58. Cost per purchase started near $120, dropped to about $70 in months two and three, then climbed back above $115 as the creative fatigued.

My largest single account runs about $99,000 a month and peaked at $114,587.

On TikTok I'd be straight with you: it isn't in my account history. Meta is where my numbers are. If TikTok is the larger half of this and you want someone who has scaled it before, I'm probably not your first call, and I'd rather say that now than three weeks in.

What I would bring to it is the part that usually decides whether a second platform earns its budget, which is creative volume and how fast you cut. Each new ad gets about two to three times target cost per acquisition to prove itself and comes out if it doesn't earn it. That testing runs at the ad level inside the campaign rather than by spinning up new ad sets, because Meta wants roughly 50 conversions a week per ad set and splitting budget across five of them keeps all five stuck in learning. Hooks get briefed as angles, not variations, so what you learn from a losing ad is which promise failed rather than which thumbnail did.

I built and sold my own ecommerce business before this, and after 10+ years the first thing I still look at is what one order leaves after product cost, shipping and fees. I also work with a dedicated tracking specialist on pixel, CAPI and attribution, so what the platforms report and what your backend reports don't quietly drift apart.

Roughly what are you spending a month right now, and is that split across both platforms already or is TikTok the new one?

There's a short video on my profile showing how I run an account day to day.

## Screening notes (internal)

| Screen | Result |
|---|---|
| Duplicate / twin bid | PASS. Grep across `.claude/upwork-drafts/`, `.claude/drafts/`, agent scratchpad for a TikTok+Meta-only generic post: 0 hits. The 9/15 `ecom-store-paid-ads-growth-meta-tiktok-google` draft is a different post (ecom store, 3 platforms, Meta primary). |
| Ads in scope | PASS. Ongoing paid ad management, both platforms. |
| Ad spend ($5K floor) | **UNSTATED.** No number, no revenue, no scale language in the post. Per the standing rule an unstated budget leaves it open, so the floor is asked as a relative range in the body. Provisional until it clears $5K. |
| Full-time seat | PASS. No "full time" wording. |
| White-label / subcontractor | PASS. No agency or client-of-client framing in the post. |
| Geo | **UNKNOWN.** Nothing stated. Confirm on the job page before sending. |
| Payment verification | **UNKNOWN.** Confirm on the job page. |
| Listed rate ($40/hr floor) | **UNKNOWN.** Not in the pasted text. |
| TikTok proof | **GAP, company-wide.** Disclosed in the body. See below. |
| Booking CTA | Suppressed. Post makes no call offer; body ends on a spend question instead. |
| Trial / 90-day / pricing | Not raised by the post, not raised in the body. |

## Proof verified 2026-09-17 (carried from the same-cycle live verification)

- **Master Spa Parts** `act_2752863238119036`, CHURNED 2026-05-28. Sep 2025–May 2026: $121,420.92 / 4,188 conv / $28.99 CPA. ROAS ~5.5x ($122,461 / $674,942 = 5.51x); cited as "around 5.5x", not exact.
- **Neue Maison** `act_782415276397596`, luxury furniture, CHURNED. Sep 2025–Aug 2026: $210,468.08. Jul 2026 peak $40,389.21 / 129 conv / 4.17x (promo + retargeting). Lane figures 2.36x hold vs 0.40x chair lane cut in 12 days.
- **Blush Camera** `act_2050081878799128`, CHURNED 2026-06-16. Feb–Jun 2026: $58,298.09 / 623 conv / $93.58 CPA. Monthly CPA $120.05 → $68.52 → $73.28 → $116.12 → $118.92.
- **Doctor Laleh** `act_868498138612020`, ACTIVE. Oct 2025–Aug 2026 avg $99,349/mo; Mar 2026 peak $114,586.56. Spend only — CPA and ROAS are barred on this account, and the body cites spend only.

## Proof gap: TikTok (company-wide, not just Lindsey)

`reporting_clients` has exactly **one** TikTok row: **Doctor Laleh**, status `active`, `ad_account_id` NULL, `platform_operator` NULL. Per the standing rule, an `active` row with a NULL account is a never-launched trap, not a managed account. The only other TikTok trace in the system is a `strategy_update_pending` note about a closed ClickUp task named "TikTok Onbaording", which the same note flags as unexplained and weakly conflicting with TikTok being listed under Laleh's *discontinued* services.

**There is no citable TikTok spend, CPA or ROAS anywhere in the database — for Lindsey, for Samuel, or for Creekside.** Do not let any version of this proposal imply otherwise.

## Scope note: Lindsey and TikTok

The 9/15 ruling left TikTok and Google unmentioned as outside Lindsey's permitted services, which worked there because Meta was primary and TikTok was a "potentially". Here TikTok is half the job and silence would read as dodging the one thing they asked about. The body discloses it in Lindsey's own voice instead.

The "our team" pooling route was **not** used for TikTok, because pooling implies the capability sits somewhere in the book and it does not. Pooling appears only on tracking, named by role, with no person and no agency named — consistent with the 9/16 no-Creekside-framing ruling and the 9/17 one-pick pooling allowance.

## General platform practice in the body (not DB-backed)

- ~50 conversions per ad set per week to exit learning.
- Kill threshold of 2–3x target CPA; budget raises in ~20% steps; 3–5 day hold after a raise.
- Testing at the ad level inside one campaign rather than by ad set proliferation.
- New-customer share as the cross-platform incrementality read.

## Open for Queenie before sending

- **The TikTok disclosure is a real fork.** As written, the body tells them Lindsey may not be their first call if TikTok is the larger half. That is honest and it will cost some replies. Say if you want it softened to "TikTok is newer for me" — but there is no number behind any stronger version.
- **Geo, payment verification and listed rate all unknown.** All three need a look at the live job page.
- **Spend unstated**, so the $5K floor is unresolved. Asked as a relative range per the standing rule.
- **No attachment and no "results attached" line**, which lindsey_default normally carries.
- **Commitments stated in the body:** 2–3x CPA kill rule, ~20% budget steps, 3–5 day hold after a raise, ad-level testing inside one campaign.
- **QC agents not run** (qc-reviewer-agent / expert-review-agent unavailable this session).
- **DB log to `upwork_proposal_logs` skipped** (contractor_query cannot INSERT).
