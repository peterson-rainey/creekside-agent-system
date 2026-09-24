# Crescent Candles (UK) -- Google Ads ecommerce -- Samuel Strategic

**Drafted 2026-09-25. STATUS: UNSENT.** Profile: Samuel. Style: strategic. 365 words / 2,072 chars.
QC: qc-reviewer-agent PASS WITH FIXES (6 defects; #1/#2 HIGH and #3 MEDIUM applied, #4 applied, #5/#6 accepted as framed analysis).
Attachment: NONE.

## Job post
UK scented candle brand, Crescent Candles. Wants a Google Ads specialist to set up/optimise paid
search: keyword research, campaign + ad group structure, ad copy testing, reduce wasted spend,
conversion monitoring, budget + bidding recommendations, scaling opportunities. Wants ecommerce /
physical consumer product experience, ideally candles, home fragrance, gifts, homeware. Explicitly
wants help testing whether Google Ads can work as an acquisition channel, not launch-and-leave.
No budget stated. No screening questions. Site: crescentcandles.com

## Screens
| Screen | Result |
|---|---|
| Geo (US/CA/UK/AU) | PASS, UK |
| Ads in scope | PASS, Google Ads is the entire scope |
| White-label / subcontractor | PASS, direct brand |
| Full-time employment seat | PASS |
| Self-funded / profit-share | PASS |
| Ads + landing page CRO owned together | PASS, no CRO ask |
| Flat-fee portfolio owner | PASS |
| Duplicate draft / prior bid | PASS, only prior candle job is a 2026-01-04 Canadian one, unrelated |
| $5K/mo ad spend floor | **YELLOW, unstated.** Nothing forecloses it, so not an auto-DQ. 5 SKUs and a "test whether this works" framing point at a small budget. Draft brackets the ask at £4,000 vs £10,000 so the answer lands above the floor or reveals the DQ. |
| Payment verified | UNKNOWN, no Upwork client panel data supplied |

## Site findings (live, 2026-09-25)
- Shopify. British Muslim faith-inspired brand: Sacred Places / Sacred Moments collections.
- `/products.json` = exactly 5 SKUs. 4 candles at £28.00. "Fragrance Discovery Set" at **£0.00**.
- `/products/fragrance-discovery-set.js`: price 0, price_min 0, available true, requires_selling_plan
  false, one variant. Real £0 product through normal Shopify checkout. This is the proposal's opener.
- Google tag `GT-NNZX9ZMS` on homepage. No GTM container, no `AW-` conversion ID in homepage source.
- Meta Pixel installed (`2098508570969477`).

## Verified claims used (live query 2026-09-25, google_insights_daily trailing 180d)
| Claim in draft | Source | Verified |
|---|---|---|
| unbranded Shopping 4.4x | Aura Displays "CM - Shop - All Products - UNBRANDED", $10,049 / $44,667 = 4.44x, 77 conv, PAUSED, last 2026-08-31 | yes |
| 2.4x across 424 purchases | Myriad Traders "Shop - All Products - 24 Jun", $15,053 / $36,190 = 2.40x, 424 conv, ENABLED, last 2026-09-23 | yes |
| no candle / home fragrance client | zero rows in `clients` matching candle/fragrance/homeware/home decor/gift/home goods | yes |
| no UK account | only Europe/London account is wedcuts.com: 0 campaigns, $0 lifetime spend | yes |

**Deliberately EXCLUDED:** Aura branded Search 27.71x (brand-inflated). Any "$20M spend / 200+ audits" line.

**Attachment decision: DO NOT ATTACH.** The Aura Displays case-study PDF downloads as a real 3-page
PDF but contains a `http://localhost:4321/` link, the same print-to-PDF defect as the Unrefined file.
Numbers cited live from the DB instead. No other PDF matches candles or home fragrance.

**QC fixes applied:** (1)+(2) tracking claims were asserted present-tense although no `AW-` tag is
visible, so they are now conditional on tracking going in. (3) "The White Company and Amazon" were
unverified competitor names, genericised to "national brands and marketplaces". (4) "viable" was
lifted from the client's own post, removed.

**NOT LOGGED to `upwork_proposal_logs`:** contractor mode, `contractor_query` cannot INSERT. Needs an
admin session to log.

---

## PROPOSAL (paste-ready)

The free discovery set is listed on the store as a £0.00 product that runs through normal Shopify checkout, and that one detail will shape the whole account. Whenever purchase tracking goes in, every claimed set fires the same event as a £28 candle, just with no revenue attached. On a conversions goal that is quietly fatal, because the cheapest way for the algorithm to hit its target is to buy people claiming free sets. On a target ROAS goal it is subtler, the £0 orders drag the number down and nothing in the interface tells you why. The Shopify Google channel installs that tracking and syncs the catalogue on the same switch, so the £0 item lands in the Merchant Center feed too.

The fix is structural rather than clever. Give the discovery set its own conversion action, keep purchase as the only primary, pull the free SKU out of the feed, then decide deliberately whether the set is the offer you advertise. It can be a strong one, since £28 is a hard first purchase from a brand nobody has heard of yet. But you would be buying a lead rather than a sale, and the set to purchase rate is the number that makes or breaks the maths. Without it, no cost per acquisition in the account means anything.

The harder question is demand. Four candles at £28 means generic scented candle terms put you against national brands and marketplaces bidding the same words, where a single unit order rarely survives the click cost. What looks winnable is the heritage and gifting language, which is genuine intent but seasonal rather than steady. Worth knowing whether you are building toward Ramadan and Eid or trying to hold volume year round, because those are two different accounts.

Being straight about fit, our team has not run candles, home fragrance, or a UK account. The closest work is Shopify ecommerce on Merchant Center feeds, where one store's unbranded Shopping sits at 4.4x and another at 2.4x across 424 purchases.

Are you picturing something closer to £4,000 a month in ad spend or £10,000, and is there a cost per order you need to hit?


Samuel
