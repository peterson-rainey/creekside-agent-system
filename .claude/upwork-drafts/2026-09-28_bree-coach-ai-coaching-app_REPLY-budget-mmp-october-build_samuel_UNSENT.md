# Upwork REPLY - Bree Coach (AI personal growth / coaching consumer app), Marina Aghbalyan
Profile: Samuel Rainey (persona for Peterson Rainey) | Type: mid-conversation lead reply | Status: UNSENT
Date: 2026-09-28 Monday (US Central, confirmed via Postgres now() = 08:04 CT; local clock read Sep 28 21:04 PST and is unreliable)
Words: 304 | Chars: 1,731 (trimmed from 354 on Queenie 9/28) | Em dashes: 0 | Questions: 1 | Links: none | Attachments: none | Price figures: none

## Thread state
- Job: "Performance Media Buyer / Growth Marketer for Consumer AI App". DUAL BID 2026-09-24:
  General/Samuel @ $90 (upwork_jobs sheet_row 5486) AND Lindsey @ $75 (sheet_row 536). Samuel's is the live thread.
  ** The Lindsey twin draft (2026-09-24_bree-coach-..._lindsey_default_GAPFIRST_UNSENT.md) must NOT be sent. **
- Samuel's gap-first proposal SENT (matches the 9/24 draft verbatim). It disclosed: one consumer app not
  two or three, zero TikTok / Apple Search Ads / Google App Campaigns, never run an MMP, app numbers stop at install.
- Marina replied: "$5K/mo to start. What you think about that? ... no we dont have an MMP, we are open to having one
  though. FYI we are still in product development, launching in October."
- Peterson sent a holding message promising a proper response when back. THIS IS THAT RESPONSE.
- Upwork timestamps render in Manila time (Central +13): her reply 1:48 AM Sep 28 Manila = ~12:48 PM CT Sep 27.

## User rulings this session (Queenie)
1. Fee = SHAPE ONLY, no figures. (validation.md BLOCKs dollar/percentage fee figures and names $1,500;
   company_rules 41 would permit a quote since she disclosed spend. Conflict unresolved; she chose shape-only.)
2. Disclosed gaps are SETTLED. Do not re-list the zeros. She read them and engaged anyway.

## Fee math NOT typed in the body (for internal reference)
Meta only at $5,000 spend: 20% x 5,000 = $1,000, under the $1,500/platform minimum, so the minimum governs.
$1,500/mo = 30% of spend; month one with onboarding = 60%. Minimum threshold is $7,500 (min / rate1).
IF her $5,000 is all-in rather than media-only, spend falls to $3,500, BELOW the $5K floor, at a 43% effective rate.
That is exactly why the closing question exists.

## Verified live 2026-09-28
- Meta Business Help 721422165168355, app-events accordion expanded, VERBATIM:
  "Aggregated Event Measurement is currently available for the following types of campaigns when the destination is
  set to a mobile app: sales campaigns with catalog turned on or off, lead campaigns and engagement campaigns.
  It's currently not supported for custom event optimization."
  Also verbatim: AEM is "measurement of web and app events from people using iOS 14 and later devices" -> iOS-scoped.
- AppsFlyer dev docs (dev.appsflyer.com, in-app events), VERBATIM: "Ideally, the marketer should provide you with
  clear event structure definitions, based on the instructions in Defining In-app events."
  Doc structure confirms an MMP is an SDK integrated into iOS / Android / Unity / React Native app code.
- case_studies Birthday Club App: 2,662 installs, CPI $7.36 -> $3.90 (47% cut). Team work, churned, never first person.

## Review log
- sdr-agent drafted. It self-flagged that its own response-guidelines.md BLOCK rule ("first sentence of a reply to a
  direct question must BE the answer") was violated by the ordering I gave it. It was right; the reorder was applied.
- qc-reviewer-agent: PASS WITH FIXES, 5 required. ALL APPLIED:
  (1) opening now leads with the verdict, not arithmetic; (2) AppsFlyer "not after" softened to match "Ideally";
  (3) deleted "Your developers are writing that definition right now" (unsupported claim about her team);
  (4) CPI REWRITTEN - see below, the most material fix; (5) "volume is there" now tied to the media-only premise
  via the caveat framing that the closing question resolves.
- QC Fix 4 verified independently against reference_birthday_club_cpi_conflict.md: $3.90 is the BEST CAMPAIGN
  (Berrien County, 475 of 2,662 installs, ~18%); account-lifetime blended is ~$5.00 ($13,300 / 2,662). The memory
  carries an explicit standing instruction not to present sub-$5 as sustained. The v2 draft extrapolated
  "290 installs a week" off the $3.90 endpoint. Now uses blended ~$5.00 -> ~230/week, hedged as a different category.
- expert-review-agent: Good / Good-to-strong. ADOPTED: name the middle bid rung (registration or onboarding complete)
  rather than a vague "shallow"; scope AEM to iOS.
  REJECTED: its claim that the AEM custom-event limit is stale as of 2026. I re-read Meta's own page live today and
  the sentence is still there verbatim. The reviewer's sources were third-party aggregator blogs and it self-rated
  MEDIUM. This is the SECOND time an expert review has raised an AEM objection on this thread from third-party
  sources and been contradicted by Meta's primary doc; the 9/24 review made the same error.
  NOT ADOPTED: argue for TikTok on creative economics (we disclosed zero TikTok, cannot deliver it);
  add "what winning looks like" warmth (would push a reply toward a second proposal).

## Routing
ROUTED TO CADE 2026-09-28 via ClickUp DM channel 8cqc1ym-20257 (Kenneth Cade MacLean, user 89120814,
cade@creeksidemarketing1.com; lookups by "Cade" or the creeksidemarketingpros.com address fail).

## Open flags for Queenie
- Send ONE profile only. The Lindsey bid on this same job is still live and could draw its own reply.
- The $5,000 media-vs-all-in answer decides whether this lead clears the $5K floor at all.
- No calendar link included. Upwork's own policy calls pre-contract meeting links circumvention (verified 9/16),
  and she did not ask for a call.

<!-- REPLY START -->
Hi Marina,

The volume works at $5,000, with one caveat below. That is about $1,150 a week in the auction. At the blended $5 install cost our team saw on an app account, roughly 230 installs a week. That was a restaurant rewards app, a different category, so treat it as a reference point, not a forecast. Even well below that you clear the roughly 50 results a week an ad set needs to leave learning. A paid subscription will not, and the events between depend on rates only you have.

So the first bid target is neither the subscription nor the raw install. It is the first event that proves intent, a completed registration or finished onboarding, then deeper as volume earns it.

What decides more than budget is the October build. Whatever you measure with, an MMP or Meta's own SDK, it is code in the app, and the events have to ship in the same release. AppsFlyer's documentation puts the event structure on the marketer, reaching developers before integration, not after. Miss that build and the retrofit is another release cycle, on users who already installed without it.

That bites hardest on iOS, where Aggregated Event Measurement covers iOS 14 and later and still does not support custom event optimization. Whether a first coaching interaction can be a bid target depends on how the event is defined, not how the campaign is built.

Split across four platforms, that same $5,000 leaves none of them enough to learn from. One until the data exists is a media argument, not a preference.

On pricing at that level, it sits on the per platform minimum rather than the percentage, which only works in your favor as spend climbs.

Which brings me to the caveat: is the $5,000 the media budget, or media plus management?
<!-- REPLY END -->
