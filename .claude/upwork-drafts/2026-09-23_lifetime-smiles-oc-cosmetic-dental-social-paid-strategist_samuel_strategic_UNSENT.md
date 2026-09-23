# Lifetime Smiles of OC — Cosmetic Dental, Social + Paid Ads Strategist

- **Date drafted:** 2026-09-23 (confirmed via Postgres `now()` America/Chicago)
- **Profile:** Samuel Rainey
- **Style:** strategic
- **Status:** UNSENT
- **Client:** Lifetime Smiles of OC, Santa Ana CA (Orange County). Dr. Kareem Abraham. lifetimesmilesoc.com
- **Length:** 398 words / 2,384 chars (limits: 400 words multi-question, 5,000 chars)
- **Prior bids on this job:** none found (`upwork_jobs` + drafts grep + leads index)

## Screens applied

| Screen | Result |
|---|---|
| Geo (US/CA/UK/AU) | PASS — Orange County, CA |
| Required-items proof gate | PASS — all 4 answerable; CPL proof is live and in-vertical |
| Ad spend floor ($5K/mo) | Not stated; not foreclosed. We recommend $6-8K, above floor |
| White-label / subcontractor | Not present |
| Full-time seat | Not present — phased project into retainer |
| No-ads-in-scope | Not present — Meta + Google Search + YouTube all in scope |
| Landing page / CRO ownership | Not in scope. No CRO-gated questions. Screen does not fire |
| Zero-spend milestone pricing | Phase 1 is ONE pre-spend milestone gating real ongoing management. Priceable as onboarding |
| **Scope fraction** | **FLAG — see below** |

**Scope-fraction flag.** Of six "what we need" items, the brand-look restructure and the content plan/calendar
sit outside Google+Meta management, and "strong eye for elegant, upscale branding" is one of four stated
requirements. This is the same family as the 2026-08-18 aesthetics skip (`reference_no_landing_page_cro_case_study`),
where strong vertical proof did not buy back out-of-scope deliverables. It is materially softer here: no website
build, no landing pages, they already have an in-house content team and want direction not production, none of
the four required items is proof-gated on branding or CRO, and a fee model attaches cleanly to Phase 2.
Draft handles it with an explicit scope line rather than claiming the capability.

## Verified facts behind every number (all checked 2026-09-23)

- **Doctor Laleh** (cosmetic dentistry, Google acct `5948318044`, ACTIVE) 90d thru 9/22:
  $52,740.68 / 252.5 conv / **$208.90 CPA**. Split: PMax $37,894.85/172.9/$219.24 · Search $7,874.82/58.1/**$135.47** · Demand Gen $6,971.01/21.5/**$324.46**
- **The Tooth Co** (dental, Google acct `1403705303`, ACTIVE) 90d thru 9/22: $39,753.14 / 194.2 / **$204.74**
- Source: Supabase `google_insights_daily` ⋈ `google_campaigns`. Clients unnamed in body.
- **Stale figures deliberately NOT used:** Laleh case-study CPA $9.58 (live is $208.90); Polaris sub-$4
  (live $28.54, churned 9/2/26). Per `reference_case_study_numbers_vs_live_data`.
- **Meta policy** (transparency.meta.com health/wellness, change log Jul 22 2026): cosmetic procedure ads must
  target 18+; before-and-after transformation imagery **IS permitted** at 18+; banned = specific outcome in a set
  timeframe without qualifier. Per `reference_meta_cosmetic_procedure_ad_rules_verified`.
- **Google policy** (adspolicy/answer/16701855): cosmetic procedures covered; remarketing / Customer Match /
  lookalikes restricted; in-market, affinity, custom segments allowed. Hedge "can rule out" is deliberate.
- **Their site, inspected live:** gtag `AW-11256429906` present. No Meta pixel (`fbq` absent; PixelYourSite
  console-warns "no pixel configured"). "Schedule Appointment" → `app.nexhealth.com/appt/Lifetime_Smiles_of_OC`.
  That NexHealth page was loaded and inspected: **separate origin, no AW tag, no GTM, no pixel.** Booking
  completion reports nothing back to either platform as wired.
- **Refused on purpose:** no cost-per-booked-appointment and no show-rate figure exists anywhere in the book.
  Draft says so explicitly rather than substituting a lead CPA.

## Attachments — both verified as real PDFs, Creekside-branded

| File | Why | Verification |
|---|---|---|
| Root Hair case study | Elective cosmetic, **YouTube Shorts + long-form + Search** = exact channel ask. 690 conv, $134, $8-15K procedures | `%PDF-`, 750KB, "CREEKSIDE MARKETING" footer, no Track Digital branding |
| Integrity Naturopathic case study | Local healthcare practice, patient calendar, $14-$40 CPA, 150+ conv on $2,350/mo | `%PDF-`, 756KB, "CREEKSIDE MARKETING" footer |

**Do NOT attach:** Laleh, Advanced Med Spa, Polaris — all three `download_url`s return `text/html`, not PDFs
(confirmed by magic bytes this session). Polaris additionally churned and its headline number fails live.

## Open items for Queenie

1. **Bid field figure.** Not in the body on purpose (post never asks our fee; `reference_standalone_audit_fee`
   9/11 Montreal rule). Path-to-management means the 9/2 ruling governs: ONE fee, onboarding $1,500/platform with
   the audit inside it. Google (Search+YouTube+Shorts = one platform) + Meta = **$3,000 fixed for Phase 1**.
   $90/hr does NOT apply here — that ruling is scoped to a true standalone read with no management attached.
2. **Phase 2 economics worth a look.** At $6-8K/mo spend the two-platform minimum ($3,000/mo) is 38-50% of media.
   Marginal 20% would only be $1,200-$1,600, so the minimum governs. A Google-first start (one platform,
   $1,500/mo) is far more proportionate and is what the draft's sequencing already implies.
3. **Secondary site finding, left out of the body as uncertain:** two `tel:` links, `415` (San Francisco) and
   `612` (Minneapolis), on a practice whose pitch is local OC. Likely call-tracking pool or template leftovers.
   Not asserted without knowing the cause.
4. Weekly video call is their ask. Draft promises **no reporting cadence** per the 9/23 ruling.

## Second site discovered — cantsleepcenter.com (verified theirs, 2026-09-23)

The job post never mentions it. Found via an unlabelled link on the main site, then loaded and inspected:

- Dr. Abraham named on it; address `720 N. Tustin Ave #102A, Santa Ana CA 92705`; **second location
  `2111 San Joaquin Hills Rd, Newport Beach`**; local phone `714-543-9413`. Audience skew: "Veterans and
  Active Military". Scope: snoring, sleep apnea, TMJ.
- **Carries the SAME Google Ads tag `AW-11256429906` as the main site.**
- **Has a Meta pixel (`fbq` true) while the main cosmetic-dentistry site has none.** That is backwards
  relative to their stated goal of more cosmetic and general dentistry patients.

**Why it matters and how the draft hedges it.** One tag spanning both domains means sleep cases and smile
makeovers plausibly share a conversion pool, which would have Smart Bidding optimising across two very
different case economics. Conversion *action* configuration is not visible from the page (no GTM container,
gtag only), so the draft says "likely landing in the same conversion pool", never asserts it as fact.
Newport Beach also widens the geo beyond the Santa Ana the post implies, which the 30-day answer reflects.

## DRAFT BODY

Before-and-after photos are the most misunderstood asset in cosmetic dental advertising. Most people will tell you Meta bans them. Meta's health and wellness standard actually permits before-and-after transformation imagery as long as the ad targets 18 and over. What pulls an ad down is a caption promising a specific result in a specific timeframe with no qualifier attached. The library your team already shoots is usable as it is.

Worth knowing on the other side: cosmetic procedures sit inside Google's health policy for personalized ads, which can rule out remarketing, Customer Match and lookalikes. In-market and custom segments still work.

1. Healthcare numbers. Our team runs two dental practices on Google right now. Last 90 days, one spent $52,741 and produced 252 patient inquiries at $209 each; the other $39,753 for 194 at $205. Inside the first account, Search is the cheapest inquiry at $135 and Demand Gen is $324. Two case studies attached: a hair transplant clinic at $134 per inquiry across YouTube Shorts, long-form and Search, and a Sacramento practice holding $14 to $40. Those are all cost per inquiry, not cost per booked appointment. Nobody can honestly quote you the second number yet, which leads to your site.

2. What to change first. Your Schedule Appointment button hands patients to NexHealth on a separate domain that carries none of your tracking, so the booking itself is invisible to Google and Meta. That is the exact number you said you want reported. Alongside that, your sleep center site runs a Meta pixel and your main practice site does not, and both sit under one Google Ads tag, so sleep cases and smile makeovers are likely landing in the same conversion pool despite very different case values.

3. Starting budget. $6,000 to $8,000 a month, weighted to Search first and Meta second. Hold YouTube and Shorts until Search is producing conversion data worth feeding them.

4. First 30 days. Week one, measurement and separating those conversion actions. Weeks two and three, the audit and competitor research across Santa Ana and Newport Beach. Week four, the written plan and the Search build.

Straight with you on one point: we would own paid and the content direction feeding it. The visual rebrand is not our craft and you would want a designer on it. We are Central time, so your mornings overlap fine.

Happy to jump on a call.
