# Upwork Proposal — RUO / Peptide Research Company (6-month trial, Meta + TikTok + Google + Reddit)

- **Profile:** Lindsey
- **Style:** `lindsey_default` (requested as "Lindsey's strategic version"; `strategic` is a Samuel-only label, and the same message named `lindsey_default`, so the fork was closed on arrival and not re-raised)
- **Date:** 2026-09-08 (Postgres `now()` = 2026-09-08 21:32 UTC → US Central; the local harness clock reads 2026-09-09 and is wrong)
- **Status:** UNSENT
- **Screen verdict:** DRAFT AND SEND-READY, with two unmeasured screens (ad spend, geo) that the body asks about rather than assumes.
- **Length:** 432 words / 2,457 chars (well under the 5,000 Upwork cap; over the 350-word `lindsey_default` ceiling by design, see Rule Compliance)

---

## PROPOSAL (paste-ready)

Quick question before anything else: is the domain and business manager fresh, or has either already taken a rejection? On research peptides that answer sets the launch order more than budget does, because enforcement here lands on the asset rather than the ad. A restricted page is not something you fix by rewriting copy, and a strike attached to a domain travels with it onto the next platform.

Four channels at once means four simultaneous reviews against the same assets, and the fastest way to lose a six month window is spending the first six weeks appealing. What has worked is sequencing. Safest part of the catalog before the best sellers, brand level creative with generic research framing and no compound names in headlines, clean delivery history, then test toward specifics once baselines clear. Catalog and Advantage+ shopping stay out of the launch, since feed rejections hit at the category level.

Before I trust a number I confirm the pixel and Conversions API are both firing, deduplication is clean, and event match quality is high enough to rely on, then set attribution windows deliberately. Month one should report an eligibility column beside cost per purchase. Which SKUs can actually run is the finding that decides months two through six.

Two of my own accounts show what that looks like. On a parts retailer, cost per purchase went from $45 to $20 over four months and conversions from 349 to 665 on slightly less spend. I could tell them it was auction cost and not creative because CPM moved $11.68 to $8.18 with frequency flat. On a DTC brand I ran cold, prospecting and retargeting were funded and judged separately at $97 and $71 per purchase.

Straight with you on the four. Meta is where my depth and my numbers are. Google is my team's, and the peptide work sits there: an account we took on last month, too new to have results, and one we diagnosed that read Not Eligible across Search and Shopping after a healthcare attorney had cleared the site. TikTok and Reddit are not on our record.

Instead of screenshots I would put Ads Manager on a screen share and let you pull any date range. We bill a percentage of ad spend rather than a retainer, 20 percent to start, dropping to 15 then 10 as spend scales, plus a one time onboarding per platform. What is the monthly spend behind this trial, a ceiling or a starting point?

There is a short video on my profile that shows how I work an account from a standing start.

---

## Screen Notes (internal — do not send)

### Screens cleared
| Screen | Result |
|---|---|
| Trial length / 90-day minimum | PASS. A six month trial run exceeds the 90-day floor. Deliberately NOT contested in the body. |
| Ads in scope | PASS. Managing paid media across four platforms is the core service. |
| Full-time employment seat | PASS. "Marketing expert to manage a trial run." No "full time" language. |
| White-label / subcontractor | PASS. Direct advertiser. |
| Self-funded / profit-share | PASS. No profit-share, rev-share, or fund-the-spend language. |
| Worker-location requirement | PASS. None stated. |
| Flat-fee portfolio owner | PASS. |
| Detection evasion | PASS, and checked deliberately given the vertical. The playbook offered is compliance-first (safest SKU first, generic research framing, clean delivery history, landing-page/RUO structure). Nothing in the draft proposes dodging review. |
| Duplicate profile bid | CLEAR. `upwork_leads` search on peptide/RUO/Reddit returns only Adam Diver (AU, status "won") and Anthony Del (Glow Peptides, nurture). Neither is this post. No Samuel twin to collide with. |
| Char limit | PASS. 2,457 chars < 5,000. |

### Screens UNMEASURED (the body asks rather than assumes)
- **Ad spend floor ($5K/mo)** — post states no budget at all. Per the standing rule an unstated budget leaves the screen open rather than foreclosing it, so the draft closes on the relative-range ask ("a ceiling or a starting point"). **Resolve this before any call.** Note the collision risk: four platforms at Lindsey's $3,000/mo Meta floor plus a $1,500/platform minimum means a thin trial budget split four ways cannot support four managed platforms. That is a call detail, not a first touch.
- **Geo** — never stated. RUO peptide companies in the book are US-context. **AU is a hard zero** (no TGA knowledge anywhere in the company), so if they answer Australia the playbook in the body does not transfer. Ask before scoping.

### Platform-by-platform proof position (verified live this session)
| Platform | Position | Evidence |
|---|---|---|
| **Meta** | Lindsey's depth. Claimed. | 24 active + 33 churned `reporting_clients` rows. |
| **Google** | Pooled to the team, never claimed as Lindsey's service (her style doc forbids naming Google as hers). | 16 active + 12 churned rows. |
| **TikTok** | Conceded outright. | Exactly ONE `reporting_clients` row (Doctor Laleh, dental, `ad_account_id` NULL). No `%tiktok%` insights table exists. 0 of 28 case studies. |
| **Reddit** | Conceded outright. | **Zero rows anywhere.** Platform census returns no Reddit row, active or churned. All 28 `case_studies.platforms` values are Google Ads / Meta Ads only. |

### Peptide proof — the ceiling, and exactly what the draft claims
- `case_studies`: **28 rows, zero peptide, zero supplement.**
- `meta_campaigns`: **0 of 1,815** peptide/supplement campaigns. (A keyword sweep returned 7 hits; all 7 are false positives on the "NAD" substring inside "Canada", "ProvenAds", and "LouisianaDebtReliefHelp". Verified individually.)
- **Outback Peptides** — `clients` row: industry "Health & Supplements", **status active, start_date 2026-08-20**, `reporting_clients` platform google, `monthly_budget` $10,000, ad account 4532985243, operator **Dustin Bowser**, AM Peterson. **`google_campaigns` and `google_insights_daily` have ZERO rows for account 4532985243** — the account is signed and configured but no campaign data exists, so it may not have launched. The draft therefore says only "an account we took on last month, too new to have results" and attaches no number. Do not upgrade this claim.
- **Glow Peptides** — the "read Not Eligible across Search and Shopping after a healthcare attorney had cleared the site" line is verbatim real (Fathom 2026-05-27, Anthony A, co-founder). Never converted to a client, so the draft says "one we diagnosed," not "one we ran."
- **Modern Peptides deliberately not mentioned.** We backed out post-onboarding and refunded. It is not a delivered engagement.
- Honest ceiling preserved throughout: **diagnosis and strategy rather than a managed peptide account.** Not upgraded anywhere in the body.

### Every number in the draft, verified live
**Master Spa Parts** (`act_2752863238119036`, operator **Lindsey B.**, churned — historicals frozen, first person is honest):

| Month | Spend | Conv | CPA | CPM |
|---|---|---|---|---|
| Dec 2025 | $15,681.83 | 349 | $44.93 | $11.68 |
| Apr 2026 | $13,223.56 | 665 | $19.89 | $8.18 |

Cited "$45 to $20, 349 to 665, slightly less spend, CPM $11.68 to $8.18, frequency flat." All exact. **ROAS deliberately not cited** (standing ruling: Master Spa is CPA/CPM/frequency only). Frequency-flat claim carries over from the 2026-09-08 verification (band 1.63–1.74 across the window).

**Blush Camera** (`act_2050081878799128`, operator **Lindsey B.**, churned) — lane split recomputed this session:

| Lane | Spend | Conv | CPA |
|---|---|---|---|
| Prospecting | $52,002.68 | 534 | $97.38 |
| Retargeting | $6,295.41 | 89 | $70.73 |

Cited as "$97 and $71 per purchase." **Discrepancy to note:** memory records prospecting at $92.85; my classification (campaign-name ILIKE retarget/remarket/RT) reproduces $97.38. Totals reconcile either way ($58,298.09 / 623 conv = $93.58 blended), so the difference is lane-assignment, not data. The draft rounds to $97 and $71, which is safe under both. **ROAS not cited** (standing ruling on this account).

### Attachment decision: ATTACH NOTHING
`lindsey_default` normally requires an "attached results" reference. Overridden here, and the screen-share substitution used instead:
- Master Spa Parts, Blush Camera and Neue Maison have **no `case_studies` row and therefore no PDF**. The numbers in the body are not attachable.
- Every Meta PDF that does exist fails a different test: Birthday Club and Fitness Superstore are **not Lindsey's** (`platform_operator` NULL); CI Lifestyle's $25/4.52x contradicts live data; Punch Drunk's 20x is uncorroborated; Duck A Diet and Unrefined are not hers.
- Integrity Naturopathic is the only attachable healthcare PDF and it is **Google-only naturopathic clinic** — wrong platform for Lindsey and wrong shape for RUO ecom.

### Rule compliance
Diagnostic question opener (L3 pattern), no "I" as first word, no parroting their scope list (opens on domain/BM rejection history, which they never raised). Experience-first body. Book pooled on Google ("my team's"), first person only on two accounts where `platform_operator` = Lindsey B. — verified, per the standing "check the operator before any 'an account I ran' line" rule. No principals named. No sign-off name. No links, URLs, contact info, or calendar link (first touch). Zero em dashes. No bold, bullets, or headers in the paste block. Percentage of spend, never hourly. Spend asked as a relative range. No trial objection raised (six months clears the 90-day floor). No unrequested commitments.

**Deliberate deviation — length.** 432 words against the 350-word `lindsey_default` ceiling. The post stacks four platforms, an explicit process question, an explicit results question, and a four-part tracking requirement (tracking setup, pixels, conversion reporting, dollar-level accountability). Cutting to 350 means dropping either the platform honesty or the tracking process, both of which they asked for by name. Precedent supports the overrun on multi-requirement posts.

### Open items before sending
- **Ad spend** — unstated. The body asks. Nothing else should be scoped until it lands.
- **Geo** — unstated, and AU would invalidate the playbook in the body.
- **Payment-method verification** — unchecked (logged out). Screen against public "total spent" before sending.
- **Screening questions** — not included in the post text provided. If they exist, paste them and I will answer separately in their own file.
