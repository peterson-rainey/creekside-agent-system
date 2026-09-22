# Tools For Veterans (Michigan nonprofit, M1 Garand Gunstock Table ~$400) Meta tracking audit + relaunch (Lindsey, lindsey_default) UNSENT
Profile: Lindsey | Style: lindsey_default (request said "strategic + diagnostic ... write it in lindsey_default"; pre-resolved, not re-asked) | Date: 2026-09-22 | No sign-off | ATTACH: nothing

## SCREEN
- TWIN: none found (grep of .claude/upwork-drafts, drafts/, upwork-drafts/ for veteran/gunstock/garand = 0). `upwork_jobs` NOT checked (no DB tool this session).
- Platform: PASS (Meta only, ecom, Pixel/CAPI). Geo: Michigan, US. PASS.
- Spend: unstated, prose does not foreclose it. $5K DQ does not fire; asked as a relative range. Lindsey's $3K floor unmeasurable until they answer.
- TRIAL: "may progress to ... a 30-day management trial." 90-day minimum rule: not agreed to; draft offers the 90-day structure with the reason. FLAG before sending.
- Paid audit: onboarding $1,500/platform includes the audit; standalone audit band UNRULED. No fee in draft (her format has no pricing slot, none asked).
- Required items: two examples w/ price, spend, cost per purchase, ROAS + what she personally did + discrepancy method. Answered, with two gaps stated below.
- White-label / hourly / full-time / coaching competitors / self-funded / worker-location: none fire.
- UNVERIFIED RISK, not in draft: firearm-themed product (gunstock imagery) vs Meta's weapons ad policy. Transparency Center page 404'd this session; not checked.

## PROOF (memory files, not re-pulled today: ads-agent had no PipeBoard access this session)
- Neue Maison (`act_782415276397596`), luxury furniture, Lindsey operator, CHURNED 2026-08-11 (past tense). Tenure 4/10-8/10/26 only.
  - Spend $105,010.24 over the tenure ("about $105,000 over four months").
  - Sales-objective slice: $91,502.92 / 334 conversions / $273.96. Called "conversions" per the 9/14 correction (includes promo sales and a 39-conv membership campaign).
  - CPM May $41.83 -> Jul $78.88 (verified 9/14). Spend May $24,861 -> Jul $40,389.
  - Implied revenue per purchase ~$480-1,300 by month (8/25 note), so "roughly $500 to $1,300".
  - **ROAS = BLOCKER.** Supabase `roas` is null on part of the spend (July: 23 of 129 conversions carry no value), so no tenure ROAS is citable. Needs a live PipeBoard pull (4/10-8/10, sales campaigns) before sending. If it can't be pulled, use the FALLBACK line below.
- Practical Survival / Myriad Traders (`act_1529816118863696`), survival gear, Lindsey Meta operator, ACTIVE. Verified live 9/21.
  - 6/26-8/10/26: $27,185.51 / 825 purchases / $63,185.04 value = 2.32x, $32.95 per purchase.
  - US 3.79x vs GB 0.59x same window. Products $17.95-$85.95 (products.json 9/21).
  - UK pause was CLIENT-directed: the draft never mentions a cut.
- GAP: neither account sits in their $250-500 band (one above, one below) and neither hit 4.0. Prices are stated plainly; the buyer will see it.

## QC + EXPERT REVIEW (2026-09-22, v1 -> v3)
- qc-reviewer-agent: PASS WITH FIXES. Applied: trimmed under 350 words; removed the CPM clause ("while CPM nearly doubled" read as caused by her spend). NOT applied: its "the category's CPM" rewording (CPM data is this one account, not the category).
- expert-review-agent: Needs Work. Applied: attribution window added as a cause; placement added next to geography; a bridge line for the price-band mismatch. NOT applied: cutting the 90-day line (standing rule says offer the real structure when a trial is raised; kept short, flagged below).

## OPEN FOR QUEENIE
1. Neue Maison ROAS: live pull needed, or use FALLBACK.
2. 90-day line vs their "30-day management trial": kept per the no-trial rule; expert review says cut it at first touch. Your call.
3. Job page: budget type, payment verified, total spent.
4. Meta weapons-policy exposure on gunstock creative: unverified.
5. `upwork_proposal_logs` INSERT skipped (no DB access).

FALLBACK if no live pull: delete ", at [X.X]x ROAS" and accept that the furniture example misses one of the four requested metrics. Do NOT explain the gap as "sales recorded without a value": the nulls are in our Supabase copy and may be a pipeline artifact, not the client's Pixel.

## PROPOSAL

When you divide Meta's reported purchase value by its reported purchase count, what does one sale come out to? At $400 a table it should land near $400, and where it lands tells you the problem.

On accounts I audit, it lands in one of three places. Near $200 usually means each sale is counted twice, once by the Pixel and once by the Conversions API, with the value on only one, so deduplication is failing. A steady odd number means the value comes from the wrong field, like a subtotal or another currency. Close to $400 means the values are fine and Meta is crediting fewer sales than you made, either because checkout finishes on a domain the Pixel never sees or because sales close outside the attribution window. I start by lining up 20 real orders against Events Manager and checking value, currency and event ID on both sides.

Two accounts I ran on Meta:

A luxury furniture brand, average order $500 to $1,300 by month. About $105,000 in spend over four months; the sales campaigns spent $91,500 for 334 conversions, about $274 each, at [X.X]x ROAS. I built and ran the prospecting, retargeting and sale campaigns, and took spend from $25,000 in May to $40,000 in July.

A survival gear store, products $18 to $86. Late June to mid-August: $27,186 in spend, 825 purchases at $32.95 each, 2.32x ROAS. I ran a UK launch alongside the US, and the blend described neither country: the US returned 3.79x, the UK 0.59x. That's why I'd break your history out by geography and placement first.

Neither sits at your price point, but the tracking mechanics are the same at $30 or $1,000.

After 10+ years, and building and selling my own e-commerce business, I judge an account by margin per sale.

For management I work on a 90-day minimum, since a relaunch on repaired tracking spends much of its first month relearning.

What was the monthly spend when the campaign last ran, closer to $2,000 or $10,000? There's a short video on my profile that shows how I work.
