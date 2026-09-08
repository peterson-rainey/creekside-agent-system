# Upwork Proposal — Ecommerce Facebook audit + targeting/settings guidance + possible ongoing management — SAMUEL STRATEGIC

- **Profile:** Samuel
- **Style:** `samuel_strategic` (user asked for "the strategic version"; `strategic` is a Samuel-only label)
- **Date:** 2026-09-08 (Postgres `now()`, US Central; harness clock reads a day ahead)
- **Status:** UNSENT
- **Screen verdict:** DRAFT. No disqualifier fires. Two gates are OPEN, not failed: monthly ad spend is unstated and geo is unstated. An unstated budget leaves the spend gate open rather than auto-DQ, so the draft asks for it as a relative range.
- **Char count (paste-ready block):** 3,656 / 0 em dashes (under the 5,000 Upwork cap)

---

## PROPOSAL (paste-ready)

Both of the questions you asked are the same question wearing different clothes, and the answer to each is a number rather than a preference.

Whether one audience should sit behind several ads, and whether you should drop interest targeting entirely, both come down to how many conversions the account produces per week. Meta's optimizer wants roughly 50 conversions a week per ad set before it stops guessing. Several ads inside one ad set share that pool, which is usually what you want, since the system allocates between them. The same audience split across several ad sets divides the pool instead, and you end up with two half trained ad sets bidding against each other. No interest selection is that same test from the other side. Broad works once the pixel has enough recent purchase history for Meta to find the pocket on its own. Below that line broad just spends into noise, and interests are less a strategy than a way to narrow the guess while you build signal. So the first thing an audit settles is not which audiences to run. It is whether the account generates enough signal to earn the settings you want.

Here is what reading an account that way looks like in practice. On an ecommerce parts store our team ran, October spend was about $15,700 and purchases cost $27.50. December spend was almost exactly the same, about $15,700, and purchases cost $44.93. CPM across that stretch went from $8.06 to $11.68. The auction got about 45 percent more expensive. Cost per purchase got about 63 percent more expensive. Roughly half the damage was the season and half was the account, and only the second half was ours to fix. That decomposition is the difference between an audit that tells you what happened and one that tells you what to do, and it matters for anything you are about to launch into Q4.

The other half of the answer is what happens when you push budget through an audience that is already working. On a DTC brand our team ran, cost per purchase came down from about $120 to $68 in the second month, once the account had enough signal to work with. We then raised spend roughly 67 percent. CPM went from $17.06 to $31.60 and cost per purchase went back to $116. Nothing was mistargeted. We were buying the same people harder and running out of fresh creative to put in front of them. That is the ceiling most ecommerce accounts actually hit, and it is why creative planning and campaign settings cannot be two separate conversations. Deciding what to shoot next is a media buying decision.

None of those numbers mean anything until the measurement is sound, so before reading performance we confirm the pixel and Conversions API are both firing, that events are deduplicated rather than double counted, and that attribution windows were set on purpose instead of left at the default. An audit that reads reported numbers without checking how they were produced is just repeating the account back to you.

The buyer who would own this is Lindsey, 10 plus years on ecommerce paid social. She ran both accounts above and currently runs Meta for one of our DTC brands. Not overflow work, the same hands on the account.

On structure, we bill a percentage of ad spend rather than hourly, so our incentive tracks yours: 20 percent to start, stepping down to 15 and then 10 as monthly spend grows, plus a one time onboarding that covers the audit and the 30 day plan that comes out of it. If you would rather see the audit first and decide about ongoing management afterward, that works too.

What range is your monthly Facebook spend in right now, and is that roughly where you expect to stay or the floor you are scaling off of?

---

## Screen Notes (internal — do not send)

### Screen result
| Gate | Result |
|---|---|
| Ads in scope | PASS. Facebook audit + settings + possible ongoing management. |
| Ad spend ≥$5K/mo | **OPEN.** Not stated anywhere in the post. Unstated budget leaves the gate open; the draft asks for it as a relative range. Screen before send if the posting body (not provided) carries a budget. |
| Geo (US/CA/UK/AU) | **OPEN.** Not stated. Judge by where ads run, not HQ. Screen before send. |
| Hourly billing | Not requested by the post. Draft declines hourly explicitly and prices on % of spend. |
| White-label / subcontractor | PASS (not an agency-behind-agency seat). |
| Full-time employment seat | PASS ("freelancer", project + possible ongoing). |
| Payment method verified | **UNCHECKED** (logged out). Use public "total spent" as proxy before sending. |

### Numbers used — all recomputed live this session
All three ecom Meta accounts below are operated by **Lindsey B.** (`reporting_clients.platform_operator`), which is what licenses naming her as the buyer.

- **Master Spa Parts** (ecom parts store, Meta, **CHURNED 2026-05-28** so past tense): Oct 2025 spend $15,699.86 / CPA $27.50 / CPM $8.06 → Dec 2025 spend $15,681.83 / CPA $44.93 / CPM $11.68. Spend is near identical across the two months, which is what makes the comparison clean: the CPM rise is not us scaling. CPM +44.9%, CPA +63.4%. Framed as "roughly half the season, half the account." Blended ROAS deliberately not cited.
- **Blush Camera** (DTC, Meta, **CHURNED 2026-06-16**): Feb 2026 CPA $120.05 → Mar $68.52. Apr $11,944.21 → May $19,972.01 spend (+67%), CPM $17.06 → $31.60, CPA $73.28 → $116.12. ROAS deliberately not cited (standing rule on this account).
- **"currently runs Meta for one of our DTC brands"** = Tiami Sleep, `status = active`, platform meta, operator Lindsey B. Named generically, no numbers attached, because Tiami's non-brand results are not citable.

### Two memory-held figures that FAILED live verification — do not reuse
1. **"Q4 CPM is 2.3x at flat spend"** does NOT reproduce. Book-level Meta CPM: Sep 2025 $22.93 → Nov $33.78 → Dec $33.90. That is ~1.47x, not 2.3x. Book spend also rose 37% over that stretch ($156K → $214K), so it was not flat either. **The 2.3x claim is not citable** and was kept out of the draft entirely.
2. Because of (1), the Q4 argument in the draft rests on the single-account Master Spa Parts series (where spend genuinely was flat) rather than on a book-level seasonal multiple.

### Rule compliance
`samuel_strategic`: declarative diagnostic opener that reframes their own two questions into one signal question rather than restating the scope list. Book POOLED ("our team ran", "we"); Samuel never claims delivery work; Lindsey named as operator. Lindsey = "10 plus years" (correct; never reused for Samuel, who is 6 years). No certifications claimed. No profile-video line (the Samuel/Peterson video leaks the persona). No links, no contact info, no calendar link (first touch). No booking CTA (they did not offer one). No em dashes, no bold/bullets/headers in the paste block. % of spend, never hourly. Spend asked as a relative range, one question only. No trial offered. No implied-causation juxtaposition: the CPM and CPA figures are explicitly decomposed rather than juxtaposed. Churned accounts in past tense.

### Open items before any send
- **Spend range** and **geo** both unresolved. If the full posting body carries either, re-screen: sub-$5K/mo is a settled skip, and outside US/CA/UK/AU is a geo DQ.
- **Payment-method verification** unchecked.
- **Screening questions** not provided. Paste them and they can be answered in a separate file.
- **Send ONE profile only.** No Lindsey companion draft was written for this posting; if one is added later, do not submit both (two Creekside profiles on one job was flagged by a prospect on 2026-08-27).
