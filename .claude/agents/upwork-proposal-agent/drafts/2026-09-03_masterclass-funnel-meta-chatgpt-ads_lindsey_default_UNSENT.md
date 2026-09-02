# UPWORK PROPOSAL — Online masterclass / sales funnel, Meta Ads + ChatGPT Ads, 30-day fixed price

- **Profile:** Lindsey | **Style:** `lindsey_default`
- **Drafted:** 2026-09-03 (Postgres `now()` UTC read 2026-09-02; harness + today's other drafts say 09-03, kept consistent)
- **Status:** UNSENT — draft only
- **Counts:** 337 words / 1,974 chars (limits 200-350 words, 5,000 chars) · 0 em dashes · 0 URLs · no pricing · no sign-off
- **Requested style:** "Lindsey's strategic version." **There is no Lindsey strategic style.** `samuel-strategic` is Samuel-only; Lindsey has exactly one, `lindsey_default`, which is diagnostic by construction. Written as `lindsey_default` straight, per the user's own "write it in lindsey_default."

---

## THE PROPOSAL (paste-ready)

Has this ad account been pulled into Meta's Employment special ad category yet, or has it only ever run unrestricted? I ask because of the two angles you named. Job security and building a second paycheck sit close enough to employment and income claims that review sometimes drags the whole account into that category, and once it lands there detailed targeting, age and radius come off the table. The part that catches people out is that it is a rebuild, not a settings reset. Campaigns do not carry over cleanly, so a flag landing partway through a 30 day test costs you the learning you paid for. If it does happen, your instinct that creative carries the targeting is correct, and it stops being a philosophy and becomes the only lever left.

On scaling, the account I would point to is a direct to consumer brand I ran from roughly $5,400 a month up to just over $40,000 a month across nine months. Since you asked to understand why things work rather than just what won, the honest tradeoff is that cost per purchase went from about $107 to about $313 across that ramp. That was deliberate. Every increase got measured against blended return across the business, not the number in Ads Manager, and at that order value the volume was worth the efficiency. Reacting to daily swings would have ended it early. The largest single month I have personally managed in one Meta account is about $114,000, and that account is still running.

On ChatGPT Ads, our team has had three accounts on the platform since early June, one of them still delivering this week, so the placement is not new to us. What I would flag honestly is that everything run there so far has been click bid. Conversion tracking on that side is the piece nobody has solved cleanly yet, ours included, which is exactly why your instinct to prove tracking before meaningful spend is the right one.

I have attached a few relevant results below. There is also a short video on my profile covering how I work through accounts like this one.

---

## THE 3 REQUIRED ANSWERS

The post asks these inside the job description. Upwork usually also surfaces them as separate screening fields. Paste into the fields if they exist; otherwise append below the proposal (the post says "keep your proposal simple," so do not merge them into the body).

### Q1 — Testing structure so new creatives get a fair shot and winners keep spend

Your pack shape is right. What breaks it is putting testing and scaling in the same ad set.

Inside one ad set, Meta concentrates delivery on whichever creative gets early traction, often within the first day. With 6 creatives that usually means 2 of them consume the budget and the other 4 never get read. You end up cutting creatives that were never actually tested.

I would split the two jobs:

1. **Testing campaign.** One ad set per core idea, 3 to 4 creatives, not 6. Same avatar, same offer, same landing page, so the only variable is the creative. Budget set so each creative can clear the event volume you need before anyone makes a call. Six-way splits need roughly double the budget or double the time to say anything.
2. **Scaling campaign.** Separate, consolidated, and left alone. Proven creatives graduate into it. It is not where testing happens, so its learning never gets disturbed by a new upload.

On fairness: I judge on a fixed window, not on whichever day someone looks. Nothing gets cut before it has had a real run at the event that matters, and I read upper-funnel signals such as hook rate and hold rate to separate "the creative is weak" from "the creative is fine and the offer or page is the problem." Those two look identical in a cost per registration column.

On the "one core idea" principle: I would keep it, and add that the angle is the unit of learning, not the ad. Three creatives losing on the same angle tells you something about the angle. One creative winning inside a losing angle usually tells you the hook worked and the argument did not.

### Q2 — Tracking and attribution experience

Yes on Meta Pixel, Events Manager and conversion event configuration, hands on rather than supervised. Two examples of the kind of work rather than a list of tools:

- A restricted-category client where custom events were blocked at the account level and only standard events would report. Diagnosing that is the difference between "the pixel is broken" and "the pixel is fine and the event you chose is not allowed here." Most of that job is Events Manager, not the ad account.
- A funnel that was running two tag manager containers at once, which double-fired events on the pages that mattered most and quietly inflated every downstream number. Found and removed.

Your funnel is Ad, Registration, Masterclass, Customer, Revenue. I would want those as distinct events, not one blended conversion, and I would want to see them fire in a test pass with UTMs carrying through to whatever holds the customer record before real budget goes live. Registration is the cheap event and the one Meta will happily optimise into the ground. Attendance and purchase are where the answer actually is, and two ads can produce an identical cost per registration while filling the room with completely different people.

**ChatGPT Ads:** our team has run three accounts on it since early June. Everything we have run there has been click bid, so I have real delivery and cost benchmarks on the platform but I have not yet stood up conversion tracking or CAPI on that side. Treating your build as the first clean one rather than claiming a track record I do not have.

### Q3 — One account I personally helped scale

- **Account:** direct to consumer brand, Meta, high average order value considered purchase.
- **Starting monthly spend:** about $5,400.
- **Ending monthly spend:** just over $40,000, reached across nine months.
- **Main KPI:** blended return across the business, with cost per purchase as the guardrail rather than the target.
- **How I decided to move spend:** increases came off a rolling multi-day read, never a single day, and only when the blended number held through the previous increase. Cost per purchase rose from roughly $107 to roughly $313 over the ramp. That was an accepted tradeoff at that order value, not a miss. When the blended number moved the wrong way I held the budget flat and worked creative instead of cutting, because pulling budget resets learning and costs more than waiting.
- **Largest monthly Meta budget personally managed:** about $114,000 in a single month in one account, on an account still running today.

---

## SCREEN

| Screen | Result |
|---|---|
| Ads in scope | **PASS** — paid media execution is the whole job |
| White-label / subcontractor | **PASS** — direct client |
| Full-time employment seat | **PASS** — "30-day fixed-price project"; the words "full time" never appear |
| Self-funded / profit-share | **PASS** — client funds spend |
| Detection evasion | **PASS** |
| Worker-location requirement | **PASS** — none stated |
| Coaching Upwork competitors | **PASS** |
| Client naming themselves as operator | **PASS** — they are hiring the buyer, not doing it |
| Duplicate Creekside bid | **NONE** — no `upwork_leads` row matches on "masterclass" or "ChatGPT Ads" |
| Geo (US/CA/UK/AU) | **OPEN** — never stated anywhere in the post |
| Ad spend >= $5K/mo | **OPEN** — no budget figure at all. Lindsey's own floor is $3,000/mo Meta |
| Upwork $40/hr floor | **N/A** — fixed price, no rate listed |
| 90-day minimum vs 30-day trial | **LIVE, needs your ruling.** See below |
| Pricing-model collision | **LIVE.** See below |
| Required-items foreclosure | **PARTIAL** — CAPI is the thin spot; ChatGPT conversion tracking is a true zero but the post pre-forgives it. Not a foreclosure |

## PROOF POSITION (all recomputed live this session)

### Usable

| Asset | Verified | Whose |
|---|---|---|
| **ChatGPT Ads, live** | 3 accounts, 3 campaigns, 102 daily rows, **$1,626.30** spend, 31,044 impressions, 441 clicks, 2026-06-07 to **2026-09-02**. One campaign still active (full-arch dental: $1,167.51 / 22 days / 19,661 impr / 291 clicks / **1.48% CTR, $4.01 CPC, $59.38 CPM**). **All three are `bidding_type = clicks`. Zero conversions recorded across all three.** | Operators Scott C., Ahmed I., Ade A. **NOT Lindsey.** Pooled as "our team" |
| **Scale story** `act_782415276397596` | Oct 2025 **$5,420.89** to Jul 2026 **$40,389.21**. Cost per purchase Dec 2025 **$107.44** to Jul 2026 **$313.09**. Churned 2026-08-10, so past tense | `platform_operator = Lindsey B.` **First person correct** |
| **Largest month** `act_868498138612020` | **$1,187,075.99** over 12 months. Peak single month **$114,586.56** (Mar 2026), sustained $89K-$114K. ACTIVE | `platform_operator = Lindsey Bouffard`. **First person correct** |
| **Pixel / Events Manager** | Restricted-category standard-vs-custom event diagnosis (documented correction, 2026-05-04). Duplicate GTM container removed from our own funnel pages (`GTM-KFQDMCH5` alongside `GTM-MWQVSPJ`) | Team work, described without attribution claims |

### Deliberately NOT claimed

- **Laleh CPA.** Standing rule: spend is citable, CPA is not. Live CPAs run $305.98 to $3,969.40. Not quoted anywhere.
- **Neue Maison ROAS.** The 4.17x is promo plus retargeting, not cold, and the "$100K+/mo" figure is **revenue, not spend**. Neither is used. Only spend and cost per purchase, both disclosed including the direction that hurts.
- **Adventures in Wisdom.** The closest funnel shape we own (education, real webinar architecture) and it is **excluded**. Operator is Scott C., not Lindsey, and it collapsed on our watch: $11.31 CPA / 905 conv (Nov 2025) to $162.06 / 31 conv (Jul 2026). Verified again this session. Nothing from it is citable.
- **Masterclass / info-product / course results.** Zero. No number claimed, vertical never implied.
- **Server-side CAPI.** No documented implementation anywhere in the system. Q2 claims Pixel, Events Manager and event configuration, which are real, and stops there. **See open item 4.**
- **ChatGPT Ads conversion tracking.** True zero, conceded outright in both body and Q2.
- **Certifications.** Creekside holds none. Never mentioned.

## OPEN ITEMS FOR YOU

1. **30-day fixed-price project vs the 90-day minimum.** The standing rule is no client trials, 90-day minimum, with the carve-out that an **unstated** budget leaves it open while a capped one forecloses it. Budget here is unstated, so it stays open and I drafted. But this is structurally a paid trial that gates the real engagement, so it needs your call before it goes out.
2. **Pricing collision.** They want a 30-day **fixed price**. We price management as % of spend, and the only sanctioned one-time fee is onboarding at $1,500 per platform with the audit included. Two platforms here. The draft raises no pricing at all, so nothing is conceded, but this has to be resolved before or on the call.
3. **Spend and geo both unscreened.** No budget and no geography anywhere in the post. Neither is asked in-body to protect length and because the post explicitly asks for a short proposal. Ask both on reply.
4. **CAPI needs a direct answer from Lindsey.** Our records show no server-side CAPI build. Q2 is written to the verified line and does not overclaim. **If she has personally done CAPI work that is not in our system, she should say so and Q2 should be strengthened.** Do not let me understate a real skill, and do not let it harden into a claim we cannot back either way.
5. **ChatGPT Ads is pooled as "our team," never first person.** Lindsey has not personally run it. Her documented lane is Meta and email, and the style doc does not list ChatGPT Ads as her service. Since it is half the job's scope, declining to mention it was not viable, so it is attributed to the team throughout. Flagging the judgment call.
6. **The Employment SAC opener is framed as a question, not an assertion.** I did not verify that Meta would in fact category-flag this specific offer, and it depends entirely on how the masterclass is worded. Asked, never claimed. Do not let it harden into a claim on the call.
7. **Attachments.** The body promises results below. Verify each `download_url` resolves before attaching. Do NOT attach Polaris (leaks the Samuel/Peterson persona) or the Chagrin Valley / American Foam / GPP PDFs (unverifiable). Birthday Club's PDF 404s.

## COMPLIANCE CHECK

Diagnostic-question opener (L3/L2 hybrid) · no "I" opener · 337 words, inside 200-350 · no links or URLs · no contact info · no pricing · no sign-off name · no certifications claimed · no Google/Bing/TikTok/programmatic · no em dashes · results-attached line present · profile-video line present · no earnings or income claims made on the client's behalf · Peterson/Samuel/Lindsey never named as the worker · no client names disclosed.
