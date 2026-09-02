# Paid Ads Manager — Google + Meta + LinkedIn, courses & certifications (B2B + B2C)

- **Profile:** Lindsey
- **Style:** lindsey_default
- **Drafted:** 2026-09-03 (Central)
- **Status:** UNSENT — draft only
- **Counts:** 343 words / 2,034 chars (limits: 200-350 words, 5,000 chars) · 0 em dashes · 0 URLs
- **QC:** qc-reviewer-agent + expert-review-agent both run; all blocking + all high findings applied (v3)

---

## SCREEN

| Screen | Result |
|---|---|
| Ads in scope | PASS — paid media execution is the entire job |
| White-label / subcontractor | PASS — direct client |
| Full-time employment seat | PASS — "10-30 hours/week"; the words "full time" never appear |
| Self-funded / profit-share | PASS |
| Detection evasion | PASS |
| Worker-location requirement | PASS — "fully remote/international candidates" is permissive, not a location gate |
| Coaching Upwork competitors | PASS |
| Duplicate Creekside bid | NONE — no `upwork_leads` row matches this post; Samuel is not already on it |
| Geo (US/CA/UK/AU) | **OPEN** — "globally distributed team" describes their staff, not where ads run. Ad geo is never stated |
| Ad spend >= $5K/mo | **OPEN** — no budget figure anywhere in the post |
| Upwork $40/hr floor | **OPEN** — no rate listed, not even a range |
| Pricing-model collision | **LIVE** — post specifies "ongoing, hourly engagement." Creekside never bills hourly for ongoing management (% of spend only; the sole carve-out is a short capped paid TEST that gates management). Draft raises no pricing at all. Must be resolved on the call |
| Required-items foreclosure | **PARTIAL** — "proven, hands-on experience... across LinkedIn Ads" is unanswerable (see below). Does not foreclose the whole draft; conceded openly instead |

**Profile/style:** requester pre-resolved to Lindsey + `lindsey_default`. There is no Lindsey "strategic" style; `samuel-strategic` is Samuel-only.

## PROOF POSITION

**Claimed (all verified live this session):**
- Meta as Lindsey's own lane — 60 Meta rows in `reporting_clients`.
- Google attributed to **"our team"** only, never first-person — 29 Google rows. Per the pooling rule: pool the book, never the first person.
- **B2B SaaS, unnamed in body** = ReferPro. `platform_operator = Lindsey B.` on the Meta row (Google row is Ahmed I.). Churned 2026-04-06, so past tense. Verified result: "Doubled inbound leads and ARR within 6 months post-seed funding."
- **4.52x new-customer ROAS, unnamed in body** = `act_312458589232737`, ad account name "CI Lifestyle Meals", client **Chris Ideson Meal Prep**. Status **active**, `platform_operator = Lindsey Bouffard`. Present tense is correct and it is genuinely her own live account.
- "Built and sold my own e-commerce business" + "10+ years" — canonical identity anchors in `docs/lindsey-default.md`.

**Deliberately NOT claimed:**
- **LinkedIn Ads — conceded outright.** 0 of 28 case studies; 0 LinkedIn rows in `reporting_clients` (meta 60, google 29, email 7, other 4, chatgpt 4, lsa 1, tiktok 1, programmatic 1). Every LinkedIn hit in `agent_knowledge` is *organic* posting strategy for Peterson's personal content, not LinkedIn Ads. Nobody at Creekside has ever run a LinkedIn ad account.
- **HubSpot — silent.** 128 of 130 clients have a null `crm_platform`; the only two populated are Salesforce. Draft says "your CRM" and never names HubSpot, so no familiarity is implied.
- **YouTube — removed.** Entire video book is 1 account, $495 lifetime spend, zero conversions. v1 said "our team handles the search and YouTube build"; cut to "the search side."
- **Education / courses / certifications — no claim, no number.** The one education row (Adventures in Wisdom) collapsed, is not Lindsey's, and sells B2C to individuals. Not named.
- **No certifications.** Creekside holds none.
- No pricing, no rate, no hours, no fee of any kind.

## PROPOSAL (paste-ready)

Is the 4x measured against platform-reported revenue, or against what actually closes in your CRM? That gap is usually where a blended target starts lying. Search captures demand that already exists, so branded terms convert same session and pull the average up on their own. Meta has to create demand from nothing, and a considered purchase closes on a far longer cycle. Held to a single blended number, budget drifts toward whichever channel books revenue fastest, usually branded search, and the channel actually building your pipeline gets starved first. How your courses and certifications split across those two cycles is the first thing I would map. It decides which channel gets credit for what.

Worth being straight with you on scope, since your post is specific about it. My lane is Meta and email. I do not run LinkedIn Ads and will not pretend otherwise, and it is not a channel our team runs either, so if LinkedIn ownership is non-negotiable I am the wrong fit for a third of this. What I would recommend is owning Google and Meta properly first, since that is where both the volume and the attribution problem live. On Google, our team handles the search side, so both platforms stay under one plan and one reporting cadence.

On the B2B side, I ran Meta for a SaaS company where Meta carried top of funnel while Google captured demand. Over that six month post-seed window, inbound leads and ARR doubled. On the B2C side I build new-customer-only campaigns that separate cold acquisition from repeat buyers, so the ROAS number means something. One account I run holds 4.52x on pure new-customer purchases, excluding anyone who had already bought. Different vertical to yours, same method. That blended-versus-new-customer distinction is the second place these targets get muddy. Ten plus years doing this, and I built and sold my own e-commerce business before I managed anyone else's.

I have attached a few relevant results below. There is also a short video on my profile that covers how I run accounts like this.

## QC LOG

**qc-reviewer-agent — 1 BLOCKING, applied.**
- *"our team handles the search and YouTube build"* implied a YouTube track record that does not exist (1 account, $495, zero conversions). **Fixed:** cut to "the search side."
- Non-blocking, also applied: "B2B certification program instead of a B2C course purchase" echoed the post's own category labels. **Fixed:** generalized to "a considered purchase... on a far longer cycle."
- Non-blocking, verified rather than changed: the built-and-sold-e-commerce claim is canonical in `lindsey-default.md`. No action.

**expert-review-agent — Needs Work, 4 findings, 3 applied + 1 held.**
1. *Invented B2B/B2C segmentation (HIGH).* The post never says certifications are B2B and courses are B2C; it says track both across both. Asserting the mapping is rebuttable. **Fixed:** turned into a question the client answers ("How your courses and certifications split across those two cycles is the first thing I would map").
2. *Implied causation on ReferPro (HIGH).* v1 juxtaposed Lindsey running Meta with doubled ARR while conceding Google did demand capture, reading as a sole-cause claim. **Fixed:** "Meta carried top of funnel while Google captured demand. Over that six month post-seed window, inbound leads and ARR doubled."
3. *LinkedIn scope hole (HIGH).* v1 declined LinkedIn but never said who covers it, leaving 1 of 3 channels visibly unstaffed. **Fixed:** now states it is not a channel our team runs either, names the tradeoff plainly, and recommends owning Google and Meta first.
4. *Off-vertical proof used silently.* Meal delivery is not a course purchase. **Fixed:** "Different vertical to yours, same method."
5. **HELD, not applied — HubSpot.** Expert wanted an explicit line; QC ruled silence correct against zero HubSpot rows. Kept silent, since any line risks implying familiarity we cannot support. Carried as a call talking point instead.

## OPEN ITEMS FOR QUEENIE

1. **Pricing model is a live collision.** The post is explicitly "ongoing, hourly." We do not bill hourly for ongoing management. The draft raises no pricing, so nothing is conceded, but this has to be resolved before or during the first call.
2. **Spend floor unscreened.** No budget stated. The $5K/mo floor is untested, and Lindsey's own floor is $3K/mo Meta.
3. **Ad geo unscreened.** Only the team's distribution is described, never where ads run.
4. **4.52x needs re-derivation before the call.** It is the `case_studies` figure. The live 30-day cache on `act_312458589232737` ($1,761.53 spend, 262 purchases) does not reconcile cleanly with it and its `roas` field looks like a raw revenue sum, not a ratio. Citing 4.52x is the conservative direction (live looks higher, not lower), so it does not overclaim, but recompute before defending it live.
5. **Attachments.** The draft promises results below. Verify each `download_url` resolves before attaching. Do NOT attach Polaris (leaks the Samuel/Peterson persona) or the Chagrin Valley / American Foam / GPP PDFs (unverifiable). Birthday Club's PDF 404s.
6. **Known tradeoff:** conceding LinkedIn lowers win odds against bidders claiming all three channels. That is the honest position and the only one the data supports.

---

# SCREENING ANSWERS — added 2026-09-03, UNSENT

**QC:** qc-reviewer-agent (1 blocking, applied) + expert-review-agent (3 findings, all applied). 0 em dashes, 0 URLs, each answer well under 5,000 chars.

**Budget revealed:** Q3 states $5,000/mo. That **clears** the $5K auto-DQ rather than failing it, so the spend screen now PASSES, barely. See open items.

### Q1 — sustained 4x campaign (250 words)

Meta, a US replacement parts ecommerce brand, roughly $13,000 a month, September 2025 through May 2026. Blended return was about 5.5x across that run on roughly $131,000 of spend and about 4,500 conversions. It cleared 4x in eight of the nine months. December was the miss at 3.2x, and I would rather tell you that than pretend the line was flat.

The biggest lever was none of the four you listed. It was account structure and the conversion event. The account had fragmented into fourteen active campaigns, several of them optimized to shallow events like add to cart and time on site. I consolidated to seven and moved the money behind purchase optimization. Return went from 4.9x to 8.1x over the following two months while CPM actually rose about 11 percent and frequency fell, so cheaper media was not doing the work.

The related finding is the one I now check everywhere. The shallow-event campaigns showed the prettiest numbers in that account, over 10x on a website visits campaign, and not one of them ever carried real budget. The flattering return lived where the money was not. And some of the December to April recovery was Q4 auction pricing unwinding rather than anything I did.

Different product to yours, and a parts buyer decides faster than someone choosing a certification. The habit is what transfers. Before touching targeting or creative on your account, I would want to know which reported numbers are being produced by campaigns too small to matter.

### Q2 — HubSpot attribution, B2B + B2C (327 words)

I have not worked inside HubSpot specifically, so treat this as the architecture I would want your team to build rather than a tour of menus I know by heart.

The two funnels never share a scorecard, which in practice means two deal pipelines and an honest lifecycle stage split rather than one blended funnel with a filter on it.

B2C self-serve gets purchase as the optimization event, fired from the browser and server side with matching event IDs so it deduplicates, and I report new-customer return separately from blended. Blended return on a self-serve product with any repeat purchase is mostly your existing customers finding you again.

B2B is where reporting usually breaks. The form fill is not the thing that makes money, so optimizing to it teaches the platforms to find people who fill in forms. Capture the click identifiers on the contact record at submit, hold them through the lifecycle stages, then push the qualifying stage back into Meta, and into Google on our team's side, as an offline conversion. Now the bidding is aimed at qualified pipeline rather than raw volume.

Different metrics, then. B2C on new-customer return and payback measured in days. B2B on cost per qualified opportunity and pipeline value, reported on a lag that matches your real sales cycle.

One caveat that connects to your third question. Offline conversion signal only retrains bidding once there is enough of it. At $5,000 a month the B2B side will not produce that volume for a while, so early on that loop is for your reporting and my decisions, not for the algorithm. It is still worth building first, because it is the thing that tells you whether the 4x is real.

Also worth knowing before you scale lists: HubSpot bills on marketing contacts, so a high-volume B2C funnel can raise your CRM cost while it is raising your revenue. Better to plan the segmentation early than to discover it on a renewal.

### Q3 — $5,000 allocation (252 words)

Google 3,000, Meta 2,000, LinkedIn nothing.

LinkedIn is the deprioritization, and I would say that even if it were a channel I ran. B2B clicks there commonly run well into double digits, so a $1,000 slice buys somewhere around a hundred clicks a month. That is not a test, it is a rounding error, and the money does more work funding the two channels that can reach a readable volume.

Google takes the larger share because people search for certifications by name. That is existing demand with the shortest path to a read, and it tells us quickly which credentials actually carry commercial intent. Our team runs the search side.

Meta at 2,000 is one purchase-optimized campaign with very few ad sets, not a portfolio. That also means B2B demand creation on paid social is effectively zero at this budget, which is a decision rather than an oversight. The account I described earlier went from fourteen campaigns to seven before it had its best months, and at 5,000 a month the fragmentation risk is higher, not lower.

Also deprioritized: Display, YouTube, and any broad prospecting that needs volume to exit a learning phase you cannot feed.

The honest version of this answer is that 5,000 a month funds two channels properly or three channels badly. Three platforms, a sustained 4x floor, and separate B2B and B2C reporting is a larger program than this budget buys. I would rather put that on the table now than explain it to you in month two.

## VERIFICATION OF EVERY FIGURE IN Q1

Source: `meta_insights_daily` JOIN `meta_campaigns` on `act_2752863238119036` (Master Spa Parts, Meta, `platform_operator` = Lindsey B., churned 2026-05-28). Recomputed live this session; result matched the canonical memory figure exactly.

| Claim in answer | Verified value |
|---|---|
| "roughly $13,000 a month" | $13,208 avg |
| "roughly $131,000 of spend" | $131,597 |
| "about 4,500 conversions" | 4,526 |
| "about 5.5x" | 5.53x (all-spend) / 5.57x (9-month window). Both defensible; "about 5.5x" is the standing instruction |
| "cleared 4x in eight of the nine months" | Sep 6.70, Oct 6.45, Nov 4.38, Dec 3.22, Jan 4.57, Feb 4.87, Mar 5.87, Apr 8.07, May 6.53 — only Dec below 4x |
| "December was the miss at 3.2x" | 3.22x, tenure low |
| "fourteen... consolidated to seven" | 14 (Feb) to 7 (Mar) to 7 (Apr) |
| "4.9x to 8.1x over the following two months" | 4.87x (Feb) to 8.07x (Apr) |
| "CPM actually rose about 11 percent" | $7.38 to $8.18, +10.8% |
| "frequency fell" | 1.72 to 1.63 |
| "over 10x on a website visits campaign" | 10.26x on $3,418.45 / 170 conv |

Account is **genericized deliberately** — no `case_studies` row and no PDF exists, so it can only be told in the body and can never be attached.

## QC LOG (screening answers)

**qc-reviewer-agent — 1 BLOCKING, applied.**
- *"my CRM work has been on other stacks, not HubSpot specifically"* asserted personal CRM experience that nothing in the data supports (only 2 of 130 clients have a populated `crm_platform`, both Salesforce, neither attributed to Lindsey) and sat outside her Meta + email remit. **Fixed:** cut to "I have not worked inside HubSpot specifically."
- Non-blocking, applied: "Retargeting had fragmented into fourteen campaigns" was wrong — the largest of those campaigns is "No Targeting - Simp Obj", broad prospecting at ~52% of account spend. **Fixed:** "The account had fragmented."
- Non-blocking, applied: Google now attributed to the team inside the offline-conversion sentence, matching Q3's pattern.
- Confirmed clean: all Q1 figures, past tense throughout, "conversions" not "purchases", shallow-event claim stays budget-allocation rather than causal, required Q4-CPM caveat present.

**expert-review-agent — Needs Work, 3 findings, all applied.**
1. *LinkedIn CPC arithmetic was falsifiable.* "$8 to $15 a click... under a hundred clicks" fails at the bottom of its own range ($1,000/$8 = 125). **Fixed:** "well into double digits... somewhere around a hundred clicks."
2. *Budget/scope mismatch never named* — rated the single biggest gap across all three answers. **Fixed:** Q3 now closes on it directly.
3. *Q1 never bridged the vertical gap* to courses and certifications. **Fixed:** added the closing paragraph conceding the buying-speed difference and transferring the diagnostic habit instead of the result.
4. *Q2 was CRM-agnostic wearing a HubSpot label.* **Fixed:** added deal pipelines, lifecycle stages and the marketing-contacts billing mechanic (all public product facts, not experience claims), and cross-referenced the $5K volume problem that Q2 and Q3 previously ignored in each other.

## OPEN ITEMS FOR QUEENIE — UPDATED

1. **Spend screen now PASSES at exactly $5,000/mo**, no longer open. But it clears the floor by $0.
2. **Engagement economics are thin.** At percent-of-spend, $5,000/mo produces roughly $750-$1,000/mo in fee against $1,500 per platform in onboarding. Two platforms in scope.
3. **The $2,000 Meta allocation sits below Lindsey's own $3,000/mo Meta floor.** The answer is honest media strategy, but it prices her lane under her stated minimum. Worth a decision before this goes out.
4. **Pricing model collision unchanged.** Post is "ongoing, hourly"; we bill percent of spend. Nothing conceded in writing. Still a call topic.
5. **Ad geo still unscreened.** Never stated.
6. **Three concessions now stand in writing**: LinkedIn, HubSpot, and the budget/scope mismatch. Each is individually correct and verifiable. Together they are a lot of "no" for one application, and that is a judgment call about whether to send, not a defect in the answers.
