# Upwork Proposal: LA luxury automotive rental, Google Ads only specialist (Search brand + generic, PMax, legacy DG/Display), $20-30K/mo, setup then fixed retainer, December domain + brand change, ROAS-floor budget stages

- **Profile:** Samuel
- **Style:** `samuel_strategic` strategic + diagnostic (user asked for "strategic + diagnostic")
- **Date:** 2026-09-11 (Postgres `now()`, US Central; harness clock reads 9/12)
- **Status:** UNSENT
- **Opener requirement:** post demands the first words be "Quality Score". Proposal starts with exactly those words.
- **Operator:** UNNAMED per Queenie ("Draft, operator unnamed"). Assign before send, see notes.
- **Char count (paste-ready block):** 3,437 / 619 words / 0 em dashes / 0 URLs / no sign-off (under the 5,000 Upwork cap)

---

## SCREEN RESULT

| Gate | Result |
|---|---|
| Ads in scope | PASS. Google Ads only. |
| Ad spend >= $5K/mo | PASS. $20-30K/mo stated. |
| Geo (US/CA/UK/AU) | PASS. Los Angeles, US. |
| White-label | PASS. Direct advertiser, 11+ years. |
| Hourly / pricing model | PASS. Fixed monthly retainer, a flat-fee shape our model can take. No rate demanded, none quoted. |
| Trial / no-retainer | PASS. Setup then ongoing retainer. |
| Badge (Expert-Vetted or Top Rated Plus) | PASS per Queenie: Samuel is **Top Rated Plus**. Not recorded anywhere in the DB. |
| US / Americas time zone | Samuel PASS (Nashville, CST). **The person in the account is the real test.** See operator notes. |
| **"Not an agency, not a team" / "You are the person in the account"** | **FAILS, overridden.** Same two-way collision as myLawCLE (9/4): our rules force team framing and bar principals from delivery, their post bans a team. Queenie chose "Draft, operator unnamed". Body names it openly in one paragraph. |

## PROOF (verified live 2026-09-11 via contractor_query)

- **Offline conversion import, REAL but not our build.** Integrity Naturopathic, Google, ACTIVE, operator Ahmed I., $1,500/mo. `booked_conversion_actions` = `FirstUp - Offline Conversion - Qualified Lead - Booked`. Data through 2026-09-10: 12mo **$22,717.64 / 572.9 conv (~$39.65)**; 90d $4,030.31 / 98 conv ($41.13).
  - **The import carries the FirstUp prefix.** FirstUp Marketing (Denise Mistich) is the client-side CRM/GHL partner. Treat the CRM leg as theirs, not ours. Draft says "the client's CRM partner sends" and "the CRM side is theirs". Never claim we built it.
  - Conversions in `google_insights_daily` are ALL conversions, not only the booked offline action. Draft says "per conversion", never "per booked qualified lead".
  - Shilpa Dhawan (the 9/8 "moving Google Ads to First Up" offboarding email) is **Polaris Dentistry**, NOT Integrity. Integrity is not churning on that evidence.
- **Click ID capture on our own funnel, REAL, no results.** Creekside's own dental qualification funnel writes gclid/fbclid to the GHL contact at form submit. Two failure modes: booking tools dropping the parameter at handoff, duplicate-contact merges overwriting a stored ID. Stated as "our own lead funnel, not a client account."
- **Call tracking: ZERO.** No `reporting_clients` row has a call/phone conversion action. The only CallRail rows in `agent_knowledge` are vendor sales emails. Tooth Co CallRail was committed on 4/27, never built. Disclosed.
- **Luxury / exotic car rental: ZERO.** `case_studies` auto match is Axle Solutions (semi-truck axle repair), irrelevant. Disclosed.
- **Domain / brand migration: ZERO** case study. The December section is methodology only, with no claim of past migrations.
- Not cited: Victory Land Sales Google ($11,963.82 / 1,023 leads / $11.69, 2025-10-13 to 2026-05-20, Ade A., churned). It is CPL only with no lead-quality data, which is the one metric this post tells us not to care about.

## OPERATOR NOTES (assign before send)

- **Ade Aderibigbe** is the only Google operator whose `team_members` row shows both a Google-only role ("Google Ads Specialist") and an Americas time zone (`America/Chicago`). That fits both "not a generalist who also does Meta" and "US or Americas time zone."
- Ahmed Imran: Google Ads / PPC Specialist, time zone NULL (unverified).
- Scott Caldwell: "Account Manager - Google & Meta Ads", time zone NULL. Fails "not a generalist who also does Meta."
- The body makes no time-zone claim about the operator because none is assigned. If Ade is assigned, consider adding "on US Central time" to the operator sentence.

---

## PROPOSAL (paste-ready)

Quality Score is worth reading in your account and not worth steering by. It is scored per keyword from expected click-through rate, ad relevance and landing page experience, and none of the three can see what happens after the click. On generic rental terms, the ad that earns the best click-through is often the one that pulls in the shopper hunting the lowest day rate. Quality Score rises, cost per click falls, and revenue per lead can fall right along with them. Use it to find relevance problems, not as the target.

What should decide each budget stage is what the ROAS floor is actually measured on, and two things usually corrupt it in an account built like yours.

The first is Performance Max serving on your brand name. PMax can take credit for people who were already searching for you, so its ROAS looks excellent, generic search looks weak next to it, and a stage gets approved on what is mostly branded demand. Brand exclusions on PMax, with brand and non-brand ROAS judged separately at every stage, keep the floors honest.

The second is revenue. ROAS on lead gen is only real if booked value goes back into Google against the click. Otherwise a multi-day booking on your most expensive car and a one-day booking on your least expensive one count as the same conversion, and Smart Bidding chases volume while the floor claims to measure value.

That is also where the December domain and brand change is most dangerous. If a redirect from the old domain drops the query string, it drops the click ID with it. The offline import keeps running without an error and simply stops matching anything, and the first sign is a budget stage that misses its floor for reasons that have nothing to do with the ads. People also keep searching the old brand name long after a rebrand, so those terms stay live well past launch.

What we can show, and what we cannot.

Offline conversion import is live on a Google account our team manages. The client's CRM partner sends qualified leads that booked back into Google Ads as an offline conversion, and over the last twelve months that account has spent about $22.7K at around $40 per conversion. To be plain, it is a healthcare clinic with a small ticket, not a rental fleet, and the CRM side is theirs. It shows we work inside that setup, not that we know your economics.

On our own lead funnel, not a client account, the click ID is written to the contact record at form submit, before any redirect or booking handoff. Booking tools tend to drop the parameter at the handoff, and duplicate contacts merging can overwrite a stored ID, so holding it in the session is not safe.

Call tracking is the gap. We do not have a client account where calls are tracked with the click ID passed back into Google Ads and results attached. If a large share of your bookings start on the phone, that is a build on your account, not a repeat of one. We have also not run a luxury or exotic rental account.

One more thing to be straight about, since you were clear about it. We are a small shop, not a solo freelancer. One Google Ads operator builds and runs your account, the same person every week, and it does not get passed around. I would rather say that now than have it surface after setup.

Two questions. How do most bookings close today, by phone, form or booking engine, and does your CRM record the rental value? And is Performance Max currently allowed to serve on your brand name?
