# Upwork Proposal — Therapy + coaching lead gen (phobia therapy / Christian men's coaching), paid ads funnels

- **Profile:** Lindsey | **Style:** `lindsey_default` | **Status:** UNSENT | **Drafted:** 2026-09-08 (Central)
- Postgres `now()` = 2026-09-08 19:36 UTC. Local shell clock reads 09-09 and is wrong by one day.

## STYLE MISMATCH, PRE-RESOLVED BY REQUESTER
Requested as "Lindsey's strategic + diagnostic style ... write it in lindsey_default." There is no Lindsey
strategic style; `strategic` and `strategic-diagnostic` are Samuel-only. Requester pre-resolved to
`lindsey_default`, which is the only style Lindsey has. Diagnostic substance is carried inside the
lindsey_default form, which is already diagnostic-first (it mandates an L1-L5 diagnostic opening).

## RECOMMENDATION: DRAFT AND SEND, with one screen flagged below.

## SCREENS

| Screen | Result |
|---|---|
| Ads in scope | **PASS.** "paid ads funnels", "launching campaigns", "managing ad performance", "ad performance". Four of five listed responsibilities are pure ads |
| Ads + landing page owned together | **CLOSEST CALL IN THIS DRAFT.** "setting up funnels" is ownership language and "improving conversion rates" is a second CRO-adjacent ask. Two CRO-gated asks is the stated line. It does NOT fire cleanly because the post never says landing page, website, page copy or design, and "conversion rates" reads as an outcome of ad optimisation. Drafted anyway; the body draws the funnel boundary explicitly, which both de-risks the screen and doubles as diagnostics |
| Coaching = Upwork-competitor auto-DQ | **DOES NOT FIRE.** That DQ covers coaching that arms our own job feed (profile/proposal/bidding help). This is Christian men's life coaching |
| White-label / subcontractor | **DOES NOT FIRE.** Direct owner of both niches, not an agency reselling us |
| Full-time employment seat | **DOES NOT FIRE.** "work independently" = freelance. The words "full time" never appear |
| Ad spend >= $5K/mo | **OPEN — never stated.** Unstated leaves it open. Asked as a bracket in the close. No pricing quoted anywhere, since % of spend cannot be computed against an unknown spend |
| Geo (US/CA/UK/AU) | **OPEN — never stated.** Not assumed anywhere in the body |
| Upwork $40/hr floor | **OPEN** — no rate or range listed |
| Payment method verified | **UNVERIFIABLE** — logged out. Public "total spent" proxy not readable from the post text alone |
| Required-items foreclosure | **DOES NOT FIRE.** Niche proof is "**preferred**", not required. A preferred-but-absent proof is disclosable, not foreclosing |
| Therapy / mental health proof | **HARD ZERO** (verified live, below). Disclosed outright in the body |
| Christian / faith / religious proof | **HARD ZERO** (verified live, below). Never claimed |
| Duplicate Creekside bid | **CLEAR.** No matching `upwork_leads` row (the four "Christian" hits are people's first names). No therapy/phobia/coaching draft in either draft folder |
| Lindsey profile fit | **GOOD.** Meta lead-gen is the whole job. Her book is 12 live Meta accounts. No Google-only red flag fires |

## VERIFIED LIVE THIS SESSION (`contractor_query`)

**The zeros:**
- **Therapy / mental health / counselling / psychology: HARD ZERO.** 0 of 28 `case_studies`; 0 `reporting_clients` rows matching therap/counsel/psych/mental/phobia/anxiet. The 6 healthcare case studies are med spa, cosmetic dentistry, naturopathic, GLP-1 telehealth, dentistry and hair transplant.
- **Christian / faith / church / religious: HARD ZERO.** 0 of 28 `case_studies`; 0 `reporting_clients`.

**Adventures in Wisdom** (`act_1553150081825`, ACTIVE, life-coaching franchise, Meta). The only
coaching-adjacent account in the system. **`platform_operator` = Scott C., NOT Lindsey.** Referenced in the
body as "our team", never as her own hands-on work, per the pool-the-book-never-the-first-person rule.

12 months to 2026-09-07: $83,820.32 spend / 2,810 conv / **$29.83 blended CPL** / CPM $24.89 / CTR 3.96%.
**98.4% of spend sits on the `leads` objective** ($82,466 / 2,759 conv), so it is genuinely a lead-form account.

**The blended $29.83 is NOT citable and is NOT cited.** Monthly trend shows why:

| Month | Spend | Conv | CPL | CPM | CTR |
|---|---|---|---|---|---|
| 2025-11 | $10,234 | **905** | **$11.31** | $30.11 | 4.22% |
| 2026-03 | $8,086 | 89 | $90.85 | $24.67 | 3.70% |
| 2026-07 | $5,024 | 31 | **$162.06** | $27.15 | **4.31%** |
| 2026-08 | $5,107 | 35 | $145.92 | $27.26 | 4.22% |

CPL rose ~14x at roughly flat spend while **CPM FELL** ($30.11 to $27.15) and **CTR HELD** (4.22% to 4.31%).
Media got cheaper and clicks held; leads still collapsed. This is the memory rule "the collapse is CPL not
spend", now corroborated live. The body uses the **shape** of this decline (qualitative, no figures) as the
diagnostic spine. Quoting any AiW number would misrepresent a currently-underperforming account.

**Fusion Dental** (`act_938570599860690`, `platform_operator` = **Lindsey B.**, churned 2026-07-22, past tense).
This is the one figure Lindsey cites, and it is hers.

| Month | Spend | Conv | CPL |
|---|---|---|---|
| 2026-04 | $8,997 | 480 | $18.74 |
| 2026-05 | $32,562 | 1,091 | $29.85 |
| 2026-06 | $15,927 | 625 | $25.48 |
| 2026-07 | $7,260 | 362 | **$20.06** |

Active-days total 2026-04-21 to 2026-07-15: **$64,746.78 / 2,558 conv / $25.31 CPL**. Spend was cut 78% from
May to July **while CPL improved to $20.06**, which is the evidence for "the pullback was capacity, not cost".
Genericized to "a dental group" in the body: no `case_studies` row and no PDF exist, so it can never be attached.

**Lindsey's live Meta book, trailing 30 days to 2026-09-07:** **12 accounts, $139,730.28 spend, 484 conversions.**
Not cited in the body; held in reserve for a scale question on reply.

**Doctor Laleh** (`act_868498138612020`, hers, ACTIVE): $1,187,589 / 992 conv = $1,197 per conv. Confirms the
standing "spend citable, CPA is NOT" rule. Neither figure used.

## THE TWO POLICY CLAIMS IN THE BODY (both load-bearing, both checkable by the prospect)

1. **Personal attributes.** Meta's advertising standards prohibit copy asserting or implying knowledge of a
   reader's personal characteristics, including physical or mental health and religious affiliation. This is the
   single largest avoidable rejection cause in therapy advertising. Second-person diagnosis ("struggling with
   your fear of flying") is rejected; the same promise written about the work runs clean.
2. **Religious targeting removed.** Meta removed sensitive detailed-targeting categories, religious practices
   and groups included, on 2022-01-19. "Christian" is not an available interest. That audience must self-select
   from creative.

**Deliberately NOT claimed: Special Ad Category.** Mental health services are NOT SAC. SAC is credit,
employment, housing, financial products and social issues/elections. The 2026-07-21 SAC correction in
`agent_knowledge` is precedent for how badly a wrong policy claim reads to a vertical expert.

## ATTACH NOTHING — every candidate fails an exclusion (all file IDs checked live against Drive)

- **Adventures in Wisdom** `1qoW2YJOCD_AwOnvAEdGjsh-adzQ_drD0`: **404s, "Requested entity was not found."** No
  underscore twin exists (Drive search returns only a tracking spreadsheet, an Agreement folder and an unrelated
  video). Its `case_studies` summary carries no numbers at all. Even if it resolved, it is Scott's account and
  children's coaching, not adult men's coaching.
- **Dr. Laleh** `1sRKepK03dL8gYVbGRvzX9-myZqOarIfF`: **also 404s.** Its headline "$48.79 to $9.58 CPA" is also
  not defensible against live data ($1,197 per recorded conversion).
- **Punch Drunk Chef** `1n3bCsJSnZWonv9YRQm1Tvkdg9_Ve1p_M`: real PDF, resolves (1.59MB). Excluded anyway. Meal
  prep pulls the wrong vertical frame onto a therapy post, and its "20x peak ROAS" headline is contradicted by
  live data (1.76x).
- **Integrity Naturopathic**: the one attachable healthcare PDF, but it is Google proof on a Meta/Lindsey bid,
  barred by the 2026-09-05 ruling.

`lindsey_default` mandates a "results attached" line. With nothing attachable, that slot is filled by the
profile-video CTA rather than a false claim of an attachment.

## DELIBERATELY OUT
- No therapy, mental-health or faith results claim. Both named as gaps or simply absent.
- No Google Ads as Lindsey's service. The single "Google" mention is a scope disclaimer ("I run Meta and email,
  not Google"), which is permitted and useful since the post says "paid ads funnels" without naming a platform.
- No certification or Google Partner claim. System-wide zero.
- No pricing, no hourly, no fee. Spend is unknown.
- No calendar link, no contact info, no URLs. First-touch Upwork.
- No booking CTA. They did not offer a call.
- No sign-off name, per the 2026-09-04 ruling.
- No em dashes.

## OPEN, BLOCKING NOTHING
- Monthly ad spend: unstated. Asked as a bracket. If it lands under $3,000/mo, that is below Lindsey's Meta
  minimum and the thread should be re-routed rather than continued.
- Geo: unstated. If ads run outside US/CA/UK/AU the geo DQ fires on reply.

## PROPOSAL (paste-ready)

**Counts:** 333 words / 1,843 chars (limits: 200-350 words for a multi-question post, 5,000 chars) · 0 em dashes · 0 URLs · no sign-off name

Quick question before anything else: is the shortage actually in lead volume, or in how many of those leads turn into someone who shows up? Those two point to opposite fixes, and in this space they almost never break in the same place.

The reason I ask is a life coaching franchise our team runs Meta lead campaigns for. The most useful thing that account showed me was the shape of a decline. Cost per lead climbed for months while CPM actually fell and click-through held steady. The ads were not tired and the media was not getting more expensive. What broke sat after the click, in the offer and the form and who the campaign had been trained to go find. Reading only the ad metrics, you would rewrite creative for months against a problem that was never there.

Two things specific to your niches that change how I would build this. Meta does not allow copy that implies you know something personal about the reader, so a line like "struggling with your fear of flying" gets rejected, while the same promise written about the work instead of the person runs clean. And religious affiliation stopped being a targeting option in 2022, so Christian men cannot be reached directly. They have to self select from the creative. Phobia therapy and men's coaching are two different funnels and I would not run them in one account.

Straight on the gap: I run Meta and email, not Google, and I have no therapy case study for you. What I have is healthcare lead generation. A dental group I ran took 2,558 lead form submissions at about $25 each, and we pulled spend not because cost rose but because the practice ran out of calendar. A therapy practice hits that same ceiling.

Are you closer to a few thousand a month in ad spend, or well past that?

There is a short video on my profile showing how I audit an account before changing anything.
