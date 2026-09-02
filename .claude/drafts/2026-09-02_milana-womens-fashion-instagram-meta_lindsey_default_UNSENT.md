# Upwork Proposal — Milana L. / new women's fashion brand (Instagram + Meta)

**Profile:** Lindsey · **Style:** `lindsey_default` · **Status:** UNSENT · **Drafted:** 2026-09-02 (Postgres `now()`, US Central)

---

## PROPOSAL (paste-ready)

Do you know roughly how many purchases a week your launch budget will realistically produce? That number shapes your first month more than targeting does. Meta wants about 50 conversions a week per ad set to get out of learning, and a new fashion brand with no pixel history almost never hits that on purchase optimization out of the gate. So you either consolidate into one ad set, or you optimize on a shallower event for the first two or three weeks and move up once the signal is there. Most new brands skip that, split budget across five ad sets, and spend six weeks thinking nothing works.

The reason I ask is I watched it play out on a DTC brand called Blush Camera, selling into the same Instagram fashion and lifestyle audience you are describing. We launched them cold in February. Month one, cost per purchase ran about $120. Month two it was $68 on the same offer, because the account finally had signal and we had enough creative in rotation to hold frequency down. Then we pushed spend up about 70 percent and CPA went back to the $116 range. That was not a targeting problem. We ran out of fresh creative and CPMs climbed.

That is the tradeoff nobody flags on a launch. Reels and Stories burn creative faster than Feed does, so creative volume caps how fast you can scale, not audience research. On Neue Maison we took Meta from roughly $13K to $40K a month over about a year, same constraint the entire way. Before agency work I built and sold my own e-commerce brand, and after 10 plus years the pattern has not moved.

Worth saying plainly, paid is the side I run. The creative that proves out in ads is what I would hand whoever posts organically.

What range were you considering for monthly ad spend, and is that a launch number or where you want to land?

There is a short video on my profile that shows how I work an account like this.

---

## Fact base (all verified against the DB this session)

| Claim in draft | Source | Verified value |
|---|---|---|
| Blush Camera, DTC, Instagram fashion/lifestyle audience | `meta_campaigns` names: "Conversions/IC \| Fashion/Lifestyle Interest", "Conversions/Purchase \| Urban Outfitters", "Selfie", "Nostalgia" | confirmed |
| Lindsey ran it | `reporting_clients.platform_operator` = Lindsey B. (AM: Cade) | confirmed |
| Launched cold in February | first insight row 2026-02-02; campaign names dated 2/2/26, 2/3/26, 2/4/26 | confirmed |
| Month one CPA ~$120 | Feb 2026: $4,801.98 / 40 conv | $120.05 |
| Month two $68 | Mar 2026: $10,757.85 / 157 conv | $68.52 |
| Spend up ~70%, CPA back to ~$116 | Apr $11,944 → May $19,972 (+67%); May CPA | $116.12 |
| CPMs climbed | Mar $12.24 → May $31.60 CPM | confirmed |
| Neue Maison $13K → $40K/mo | Sep 2025 $13,148.49 → Jul 2026 $40,389.21 | confirmed |
| Lindsey 10+ yrs, sold own e-comm brand | `upwork-proposal-agent.md` Lindsey Identity | confirmed |

**Blush Camera totals (not cited, for context):** $58,298.09 spend, 623 purchase-objective conversions, 2.12% CTR, $0.92 CPC, Feb 2 – Jun 15 2026, 124 active days. Retargeting 2.96x vs prospecting 1.93x (spend-weighted, not the misleading average-of-daily 2.83x). **Churned 6/16/26** — draft keeps it in past tense throughout.

## Screens

- **Ads in scope** — PASS. Meta ad strategy, targeting, retargeting, campaign setup/optimization all named.
- **Profile fit** — PASS, strongest possible for Lindsey. Meta/Instagram only, fashion + e-commerce are both on her industry list. Zero Google in the post, so no scope collision.
- **$5K/mo ad spend minimum** — OPEN, not cleared. No budget stated anywhere. Unstated budget leaves it open rather than auto-DQ, so the spend ask is carried in-body as a relative range.
- **Geo (US/CA/UK/AU)** — OPEN. No country given, "Milana L." alone is not a signal. Not a DQ on an unstated geo; needs clearing before any call.
- **Payment verification** — UNCHECKED (logged out). Screen before sending.
- **Duplicate profile bid** — CLEAR. No `upwork_leads` row matches Milana or this post, so no Samuel twin to collide with.
- **Required-items screen** — PASSES. She demands "examples of brands/accounts you've worked with and any results you're able to share." Answerable: two named brands with real numbers.

## Proof gaps handled, not hidden

- **Zero women's fashion case studies exist.** 0 of 28 `case_studies` rows. Field Day Apparel is the only apparel account ever and it churned 6/15/26 at $1,800/mo with zero insight rows. The draft therefore never claims fashion experience. Blush Camera is presented for what it is: a DTC brand sold to the same Instagram fashion-and-lifestyle audience, evidenced by its own interest targeting.
- **Zero organic Instagram growth proof.** She explicitly asks for organic page growth. Rather than ignore the ask or claim the capability, the draft concedes the boundary in one line and offers the honest adjacency (paid-proven creative feeding the organic feed). No follower-growth promise.
- **Pink Moon Bay** (thepinkmoonbay.com, active boutique, Lindsey is AM) deliberately left out. It is email-only at 8 emails/month with Trent operating, so citing it as ads proof would not survive a follow-up question.

## Attachment decision: ATTACH NOTHING

`lindsey_default` mandates a "results attached below" line. Overridden here. The only Meta e-commerce PDF in `case_studies` is Fitness Superstore, whose 40x figure is on record as unbacked and whose account churned, and it is not fashion. Blush Camera and Neue Maison have no case study rows at all, so there is no file to promise. Standing rule is cite but never promise an attachment that has not been verified live. The required item is instead satisfied better than an attachment would: two named brands with month-by-month numbers in the body.

## Other deliberate choices

- **Style.** Request said "Lindsey's strategic version, write it in lindsey_default." `strategic` is a Samuel-only label; Lindsey has exactly one sanctioned style and it is diagnostic by construction. Written straight as `lindsey_default` per the explicit instruction. No mismatch left open.
- **The declining arc is kept in.** Month three regression is stated rather than trimmed to the flattering $120-to-$68 half. It is the setup for the creative-volume point, which is the actual answer to her "advise on which content/creatives we should be producing" ask.
- **No pricing.** Post did not ask, and `lindsey_default` carries no fee table first touch.
- **No URLs, no calendar link, no contact info** (first touch on a job post). No sign-off name. No em dashes, no bold, no bullets. Principals not named as the worker.
- 343 words / 1,856 chars, well inside the 5,000-char Upwork cap. Runs slightly over the 200-300 guide, consistent with the multi-part ask and the two named examples she required.
