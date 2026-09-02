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
