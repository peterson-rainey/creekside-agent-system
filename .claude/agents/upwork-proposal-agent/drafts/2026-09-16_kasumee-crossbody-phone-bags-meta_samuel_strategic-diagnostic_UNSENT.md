# Upwork Proposal: Kasumee (kasumee.com), crossbody / mini bags, Meta setup + management

- **Profile:** General (displays as Peterson Rainey), Samuel strategic format
- **Style:** `strategic` with a diagnostic body (requested as "strategic + diagnostic", no profile named)
- **Date:** 2026-09-16 (US Central, Postgres now())
- **Status:** UNSENT. QC (PASS WITH FIXES) + expert review (Good) applied: v3 380 words -> v5 **386 words / 2,174 chars**. v5 edits were not re-run through QC; every changed claim re-checked against the verified facts below. No sign-off.
- **Twin:** none. No `upwork_jobs` row for Kasumee, crossbody, handbag or the post text. No prior draft in any draft folder. Send ONE profile.
- **Attach:** NONE (see ruling below).

---

## PROPOSAL (paste-ready)

Starting Meta now puts a crossbody bag brand's first two months into October and November, right as ad costs climb toward Black Friday and bags start selling as gifts. That makes the ROAS you see in month 1-2 a Q4 number, not a typical one.

Across our Meta accounts last year, CPMs went from about $24 in October to about $34 in November. One of them, a hot tub and spa parts store with orders averaging about $160, returned about 5.5x ROAS on more than $120,000 over eight months, yet dropped from 6.45x in October to 3.22x in December on the same spend. CPMs rose about 45% and a bigger share of people clicked, but fewer clicks turned into orders and the orders got smaller. Bags sell as gifts and spa parts don't, so your curve won't match, which is why I'd judge your first two months against break-even ROAS, from your margin after shipping and returns, not a benchmark.

Accessories and fashion, straight answer: we don't have a bag or accessories account with results I can quote, and the women's clothing boutique our team ran Meta for isn't one I have numbers from.

The first creative test I'd want is your AI-generated assets against real on-body photos of the same bag. A phone bag buyer wants to see whether their phone fits the small or needs the large, and where it sits, so that test shows fast which one sells the bag. The two free satin scarves deserve their own angle, since your scarves sell separately for $50 each. Targeting stays broad so the creative finds the buyers, and the testing lives in the ads, not audience splits. October finds what sells under break-even, and November's budget goes behind it.

A Meta specialist on our team builds and runs the account, and I stay on strategy. Setup starts with the pixel and Conversions API checked against real Shopify orders, and reports put ROAS and cost per purchase next to that break-even line.

Which country are the ads going into first? You ship internationally without prepaid duties, so what a buyer pays and waits for changes by country, and that shapes a realistic month two. And what monthly ad budget range are you picturing, since any number I'd suggest only helps if it fits inside it?

- **Last question:** "And what monthly ad budget range are you picturing, since any number I'd suggest only helps if it fits inside it?"
- **Last sentence:** same sentence (the proposal ends on the question).

---

## QC + expert review log (2026-09-16)

**qc-reviewer-agent: PASS WITH FIXES.** All numbers confirmed against the facts block.
1. ACCEPTED, modified: "The first creative test I'd run" contradicted "I stay on strategy". Now "The first creative test I'd want".
2. ACCEPTED, modified: Oct to Dec explanation omitted that CTR ROSE 17%. Now names CPM up, a bigger share clicking, fewer clicks becoming orders, smaller orders. QC's "most of that was auction pressure" REJECTED for ROAS: the ~76% auction share is the CPA decomposition. On ROAS (log terms) CPM is ~53%, conversions per click ~40%, order size ~30%, CTR offsets ~-23%, so "most" overstates it.
3. REJECTED: replacement opener "Costs stay high well past the holidays too" is false against the book: Jan 2026 CPM $24.17, Feb $24.52, Mar $22.12, Apr $24.46 (back to Oct 2025 levels) before the mid-2026 rise. The draft never calls Q4 the peak, which is the actual caveat.
4. ACCEPTED, modified: scarf line softened to "your scarves sell separately for $50 each" (the two scarf SKUs are not confirmed as the gift scarves).

**expert-review-agent: Good.** Opener earns the click; ROAS answer reads as honest expertise.
1. ACCEPTED in part: spa parts paragraph tightened (no separate "no typical month" sentence, one merged close). Kept the $160 order size (it answers the low-to-mid ticket ask) and all three components of the drop.
2. ACCEPTED, modified: "interest tests one at a time" called dated for 2026 Meta. Replaced with "Targeting stays broad so the creative finds the buyers, and the testing lives in the ads, not audience splits." The agent's claim that Meta treats interests as suggestions "as of February 2026" came from third-party blogs and was NOT put in the copy.
3. ACCEPTED: pixel + Conversions API checked against real Shopify orders added to the setup line.
4. REJECTED: "a bag plus one scarf lands $1 to $11 short of your $150 free-shipping line, worth a small add-on to close." Arithmetic is right ($89/$99 + $50) but two scarves already come free with every order, so a paid scarf add-on makes no sense, and it is a merchandising recommendation. The free-shipping-line point was left out for length.
5. ACCEPTED: "whether the AI work sells or just looks good" read as doubting their creative; now "which one sells the bag".
6. ACCEPTED: shipping question no longer quotes their policy at them; now "You ship internationally without prepaid duties, so what a buyer pays and waits for changes by country".

---

## Screen notes (internal, do not paste)

| Screen | Result |
|---|---|
| Already drafted / two profiles | PASS. Nothing in `upwork_jobs` (job_name or job_description) for kasumee / crossbody / mini bag / handbag; no draft in `.claude/upwork-drafts/` or `.claude/agents/upwork-proposal-agent/drafts/`. |
| Profile / style fork | "strategic + diagnostic", no profile named, first request, resolved to Samuel strategic with a diagnostic body (same as the 9/10 Classy Collection fashion post). Meta-only DTC ecom would normally route to Lindsey; flagged at delivery, not re-asked. |
| Ads in scope | PASS. Meta only. |
| White-label / full-time seat / self-funded / trial / coaching / evasion / worker location | PASS. "Performance marketing specialist" but no seat tells (no position/role language, no hours, no non-duties clause). |
| Ad spend $5K floor | UNMEASURABLE. No number; "long-term collaboration if results are good" is a volunteered scale path, so not foreclosed. RISK: the store calls itself "a small independent label", has 2 bags in stock, "mid-to-low price point". Asked in body as a relative range. |
| Geo (US/CA/UK/AU) | OPEN / AMBIGUOUS. Post names no market. Store is "Designed in Tel Aviv", prices in USD, `Shopify.country` = IL (primary market Israel), shipping policy is international only (10-20 business days standard, DHL Express 2-6, no DDP, duties on the buyer). Ads could run into the US or anywhere. Asked in body ("Which country are the ads going into first?"). If the answer is Israel or non-qualifying, the geo DQ fires before any second touch. |
| Payment verification / client spend | UNKNOWN from the pasted text. Check the job page. |
| Required items ("What we'd love to know", soft) | (1) Category experience: accessories = absolute zero; fashion = zero citable (boutique Meta work, no data); low-to-mid ticket = YES (spa parts store, ~$160 per order). Disclosed first. (2) "Typical ROAS in month 1-2": no honest benchmark exists; answered with a verified single-account monthly swing + book-level Q4 CPM step, and a break-even-ROAS method. Not foreclosing (soft ask, no anti-workaround clause). |
| Hourly / fee | Not asked, spend unknown, so no fee printed. |
| Landing page / CRO | Not in scope. |

## Verified facts used (live 2026-09-16 ~19:10 UTC)

- **Master Spa Parts** (`act_2752863238119036`, Meta, operator Lindsey B., AM Cade, CHURNED 2026-05-28, "client moved marketing in-house (NOT performance-related)"; Magento, never call it Shopify; unnamed as "a hot tub and spa parts store"). Warehouse window now **2025-09-16 to 2026-05-26**. All-spend ROAS denominator. Totals **$121,905.82 / 4,212 conv / $671,545.13 revenue / 5.51x / $159.44 per conversion**.
  - Oct 2025 $15,699.86 / 571 / $101,314.41 / **6.45x** / CPA $27.50 / CPM $8.06 / 30,901 clicks / 1,947,671 impr.
  - Nov 2025 $15,325.43 / 421 / $67,180.59 / 4.38x / CPA $36.40 / CPM $11.34 / 23,932 clicks.
  - Dec 2025 $15,681.83 / 349 / $50,445.49 / **3.22x** / CPA $44.93 / CPM $11.68 / 24,959 clicks / 1,342,334 impr.
  - Jan 4.57x, Feb 4.87x, Mar 5.87x, **Apr 8.07x (peak)**, May 6.53x.
  - Oct to Dec: CPM +44.9%; conversions per click 1.848% to 1.398% (-24%); revenue per conversion $177.43 to $144.54 (-18.5%); CTR 1.587% to 1.859% (+17%).
- **Book-level Meta CPM**: Oct 2025 $24.45 (21 accts, $207,672), Nov 2025 $33.78 (22, $213,933), Dec 2025 $33.90 (22, $199,706). Sep 2025 now starts 9/16 (partial). Mid-2026 CPMs are higher (Jul $46.90), so never imply Q4 is the peak.
- **Pink Moon Bay** (women's clothing boutique): Meta work documented (Loom 2026-06-17, brand book), 0 campaigns / 0 insight rows in the warehouse; email row CHURNED 2026-09-15 ("Wanted more work than we were willing to give at their price point"). Past tense, no numbers.
- **Kasumee store** (Shopify `products.json`, homepage, `/policies/shipping-policy`, fetched 2026-09-16): 6 products. In stock: Caramel Small Leather Phone Bag $89 (compare-at $250), Burgundy Large Leather Phone Bag $99 (compare-at $300). Sold out: White Mat + Black Glossy Leather Phone Bag, $249 (compare-at $349). Satin Scarf Gold $50, Satin Scarf Leopard $50, in stock. Banner: "Free shipping over $150", "2 Premium satin scarfs with each order", "Designed in Tel Aviv", "14-day returns". Shipping: standard international 10-20 business days (free over $150), DHL Express 2-6 business days, no DDP, import duties handled by the buyer's customs. Currency USD, `Shopify.country` IL.

## Attachment ruling (2026-09-16): attach NOTHING

- No bag, accessories or fashion artifact exists (accessories absolute zero; boutique has no data).
- Master Spa Parts has no PDF.
- `unrefined_meal_prep.pdf` is the one conservative Meta PDF, but it is meal prep ($3.5K total, operator Trent), off-category, and headlines a ROAS figure against a draft whose thesis is "there is no typical month 1-2 ROAS". Wrong-vertical attachment reads as spray-and-pray.
- `Blush_Camera.pdf` do-not-attach (revenue headline fails the spend denominator); `fitness_superstore.pdf` unverifiable; `punch_drunk_chef.pdf` 20x vs live ~1.76x.

## Open before sending

- Target market (geo screen) and payment verification on the job page.
- DB log to `upwork_proposal_logs`: SKIPPED, `contractor_query` cannot INSERT.
