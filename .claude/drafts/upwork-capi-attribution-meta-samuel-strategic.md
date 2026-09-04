CAPI ATTRIBUTION

One thing worth putting on the table before the answers, because it would change how we run your audit. The deepest-event question usually gets settled by match quality, not by volume. A Purchase landing on a third-party platform you do not control often comes back with little more than an IP, a timestamp and an order reference, while a Registration you own on your own bridge page comes back with a hashed email, phone, fbc and fbp. Meta will often learn better from the shallower event it can actually resolve to a person. So the first question we would ask is not which event is deepest, it is which identifiers the third party hands back and in what shape. That answer constrains everything downstream.

First the parts where we are going to be straight with you, up front rather than buried at the end.

1. The most technically involved implementation we have personally built is our own qualification funnel, and it is not a CAPI implementation. It writes gclid and fbclid into CRM custom fields at form submit, through a static form, a session bridge, a server endpoint and the CRM API, with dataLayer, gtag and fbq events across the pages. It is our own lead funnel, not a client account, and it carries no performance numbers. Two failure modes drove the design: duplicate contact merges can overwrite a stored click ID, and third-party booking tools drop the parameter at the handoff. That is why the ID is written to the record before any redirect instead of being held in session.

8. The return leg is the piece we have not built. We have persisted a click ID onto a CRM record through a third-party handoff we did not control. We have not sent a matched conversion back to a platform as an S2S or offline import. If a completed send-back is your bar, we do not clear it today.

10. There is no redacted screenshot set to hand over for this kind of work. What we can speak to instead is the audit methodology itself, which is the same one we would run against your account.

The rest we can answer properly.

2. Generate your own click ID at the pre-lander and write it server side against a lead record before the user leaves your domain. Carry it plus fbclid, fbp and the dynamic macros for ad.id, adset.id and campaign.id as params through the bridge and the tracking link. Store fbc in its versioned, timestamped form at first touch, since fbclid decays and redirects strip query strings. When the third-party platform reports the action, by webhook, postback or export, join on your own ID and fire the CAPI event with fbc, fbp, hashed email and phone, an event_id for deduplication against any browser-side event, the original event_time, and value and currency on Purchase.

3. fbclid is the raw click identifier Meta appends to the landing URL. fbc is that identifier stored in versioned, timestamped form for pixel and CAPI payloads. fbp is a first-party browser cookie that persists independently of any single click. fbc ties an event to one ad click, fbp ties it to a browser, and both raise match quality when sent together.

4. Params have to ride every hop and be written server side at the earliest point rather than trusted to the browser across domains. To find the drop, run one live click and log the full inbound query string at each endpoint. The failure is almost always a domain change, a 302 that rewrites the URL, or a redirect service that forwards only a whitelist of params.

5. A is $66.67 per purchaser, B is $30. B wins, and registration cost was the misleading number. We would push optimization toward the deepest event that still clears roughly fifty conversions per ad set per week. If purchase does not clear it, qualified engagement is the honest proxy until volume supports going deeper.

6. We would key cohort reporting on acquisition date, campaign, ad set and creative, joining revenue back at 7, 14 and 30 days. Same-day ROAS against a 30-day revenue curve reads as failure for the first two weeks of every test, which is how good creative gets cut early.

7. In your audit we would check event match quality per event, whether pixel and CAPI are deduplicating on event_id rather than double counting, domain verification and aggregated event priority order, whether the optimization event still reflects the outcome you care about, and whether the spend increase keeps ad sets above the learning threshold.

9. Around $99,000 a month on a single active Meta account, inside a broader team book.

One constraint we have worked inside that looks relevant to you: on a healthcare account we could send Meta standard events only, not custom ones, which decided the optimization event for us rather than leaving it open. Restricted categories tend to pick your event ladder before you do.

If the audit is the next step, the reporting shape of the third-party platform is the first thing we would want to see.
