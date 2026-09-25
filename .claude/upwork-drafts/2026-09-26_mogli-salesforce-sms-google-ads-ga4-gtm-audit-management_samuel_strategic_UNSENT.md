# Upwork Proposal - UNSENT
Job: Mogli Technologies (Salesforce SMS + WhatsApp app and Salesforce implementation services). "Google Ads Specialist" with GA4 + GTM fluency: technical conversion audit across GA4, Google Ads and GTM (tracking split across GA4 via GTM, HubSpot and Qualified), ongoing campaign maintenance (copy, audiences, ROAS), collaborator on new campaign builds. Reports to their Content Marketing Specialist, works solo with web developer / marketing / technical partner support.
Profile: Samuel Rainey (public profile name Peterson Rainey) | Style: samuel_strategic (requested "strategic version") | Date: 2026-09-26 Manila (Postgres now() 2026-09-25 20:30 UTC = 15:30 Central)

## Screens
- Duplicate: 0 `upwork_jobs` rows (job_name / job_description / client_name ILIKE mogli, "SMS and WhatsApp", "Tag hygiene"); 0 `upwork_leads` rows. No Mogli file in any drafts folder, re-grepped right before writing. First sighting.
- Platform: Google only, so Samuel. Lindsey can't sell Google, so no twin expected.
- Ads in scope: YES (maintain live campaigns + new builds). Tracking is part of a management engagement, not the whole scope, so the "conversion tracking only" red flag does not fire.
- Full-time DQ: NOT fired (never says full time). Seat-shaped wording only ("Specialist", "report to the Content Marketing Specialist").
- YELLOW: "You'll work solo in this role" reads like they picture one individual. Not a stated no-agency clause. Draft is honest that a tracking specialist and Google Ads specialists do the work.
- Geo: PASS, verified. Advertiser "Mogli Technologies, LLC", verified, based in the United States (Niwot, CO). The live search ad was shown in the US (last 2026-09-25) and Canada (last 2026-09-24), per Ads Transparency Center creative data (region codes 2840 / 2124).
- Spend: NOT stated, not foreclosed. Live program looks small: 5 creatives ever (1 search text ad running since 2025-07-21, 4 image ads since Feb-Sep 2026). Asked as a bracket that straddles the $5K floor ($3,000 or $10,000), since there is no incumbent agency.
- White-label: no (their own site and campaigns). No required-items list, no screening questions, no CRO gate.
- Hourly range, payment verification, client history: not in the paste, so UNSCREENED. Check the job page ($40/hr bottom-of-range rule).
- Pricing: not asked, none typed. If it comes up, the audit rides inside onboarding ($1,500 per platform), never a separate fee.

## Verified live this session (public fetches only, nothing submitted)
- Search ad (Transparency Center creative CR17650347374846935041, format Text, "Official Site - Mogli SMS - Proven Success") displays go.mogli.com/text-smarter. `curl` of `https://go.mogli.com/text-smarter?gclid=paramcheck123&utm_source=google&utm_medium=cpc` returns `302 Found`, header `X-Pardot-Route`, `location: http://www.mogli.com`. Query string dropped: gclid and all UTMs gone. Lands on the homepage.
- HubSpot CMS site (`meta generator HubSpot`, portal 6890739). Two Google installs in page HTML: "Added by GoogleAnalytics4 integration" (gtag.js G-4NXKBNG68D, loads unconditionally with Consent Mode v2 defaults denied) and "Added by GoogleTagManager integration" (GTM-N35638F loaded only inside `_hsp addPrivacyConsentListener` when `consent.allowed || categories.analytics`).
- HubSpot banner policy (`js.hs-banner.com/6890739.js`): single default policy, `privacyPolicy: 1` = OPT_IN, `privacyHideDecline: false`, `targetedCountries: []` = every country. Built-in browser (no consent given): banner with Accept / Decline, GTM never requested, one GA4 page_view sent with `gcs=G100` from HubSpot's GA4 install.
- GTM-N35638F version 23, parsed from public gtm.js: 16 tags. One Google Ads conversion tag (`__awct`, AW-17046573654, label GG2XCLP40KEcENakuMA_, enhanced conversions checkbox false) firing ONLY on custom event `pardot_form_submit`, no form-name condition. GA4 event `pardot_form_submit` (param form_name from DLV `formName`) on the same trigger.
- Two custom HTML message listeners (tag_id 14 and 33), both on All Pages, both push `pardot_form_submit` on a `{event:"pardot_form_submit"}` postMessage. Sandbox test on example.com with the exact code: one message = 2 dataLayer pushes. So each submission fires the GA4 event and the Ads tag twice (whether Ads counts both depends on the action's Count setting, not visible; not claimed).
- Qualified: GA4 events `meeting_booked` and `conversation_started` on `ga_event` with category "Qualified Chat". No Ads tag on either. (A GA4 import into Ads is invisible from outside, so the body says "nothing in GTM sends them".)
- Pardot forms: `go.mogli.com/l/1088872/2025-01-29/cqgxn3` embedded on /demo, /contact and /clientresources (the resources hub); `.../2025-02-19/cr3jvp` ("Book A Meeting") on /meeting-calendar. Contact page meta: "Connect with Mogli app team ..., Salesforce Implementation Services, Sales, or Customer Success, all right here."
- gclid: cqgxn3 has no UTM or gclid field or script. cr3jvp maps only utm_source/medium/campaign/term/content into Pardot fields; no gclid field. GTM tags 26/28/29 (append UTMs + gclid/wbraid/gbraid to the iframe URL, or try to write into the iframe DOM) fire only on /meeting-calendar; tag 29's DOM write is cross-origin (www vs go.mogli.com) and cannot work.
- Extra, NOT in the body: GTM-N35638F also loads inside the cr3jvp iframe with no cookie-consent gate (so on /meeting-calendar the container runs even for a visitor who declined on the parent page, and GA4 gets an extra page_view for the iframe URL); tag 35 logs "GCLID FOUND" to the console in production; Clarity + Crazy Egg both load via GTM; RB2B, ZoomInfo, Pardot tracker (piAId 1089872) and Qualified also on page. Good call material.
- Team roles (`team_members`, active): Jordan Tryon "Conversion Tracking Specialist"; Ade Aderibigbe "Google Ads Specialist"; Ahmed Imran "Google Ads / PPC Specialist". Body names roles only.
- ReferPro (`case_studies`, SaaS, Google Ads + Meta Ads): "Used Meta for awareness and Google for demand capture". Status conflicted (clients active, reporting_clients churned), so the body uses "We've run" and no tense beyond that; no numbers quoted. Google operator Ahmed I.

## Deliberately out
- Any claim that Google Ads loses the conversion entirely (third-party cookies and modeling can still attribute some); the body says the Google tag has no click ID to store, which is exact.
- Double counting in Google Ads (depends on the Count setting); body says the event is sent twice.
- The iframe consent gap, console logging, duplicate heatmap tools (length; held for the call).
- HubSpot or Salesforce experience claims (HubSpot is a system-wide zero; offline import is described as the plan, not a past build).
- Price, links, contact info, sign-off.

## Attachment
- Recommended: `ReferPro_B2B_SaaS_Case_Study.pdf` (Drive `1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso`), the only B2B SaaS artifact, same call Queenie made on the 9/25 B2B GTM draft. NOT fetched: the Drive connector is disconnected this session and no local copy exists in `.claude/attachments/`. Download it and confirm it opens as a real 2-page PDF before uploading.
- Known defects: platform icons swapped on page 2 (Meta logo beside the Google screenshot); bylined "By: Samuel Rainey" while the profile now displays Peterson Rainey. Body quotes none of its numbers.
- If it is not attached, delete "That case study is attached." (the sentence before it still stands).

## QC
- qc-reviewer-agent: PASS WITH FIXES. Recount 350 total / 338 prose on the reviewed version. Formatting, tone, role attribution, budget-ask mechanics and case-study handling all clean.
  - APPLIED (issue 1): opener no longer asserts the ad's configured final URL. It now says the URL the ad SHOWS is the text-smarter Pardot redirect and that "any click through it" loses the gclid, which is true either way.
  - APPLIED IN SPIRIT (issue 2): "GA4 sees visits from people whose form fills and Qualified bookings never reach it or Google Ads" was unscoped. QC's replacement ("never see their form fills") was NOT used, because the booking form's iframe loads the same GTM container with no consent check (verified after the first pass), so it could be false on that form. Paragraph now states the three verified consent behaviors and concludes "GA4 and Google Ads aren't measuring the same visitors."
  - APPLIED (issue 3, two rounds): "can count the same as a booked meeting" and then "can't tell a Customer Success question from a booked meeting" both assumed the contact form sends the event (not observable without submitting it). Final: "so any form that sends it, contact or booking, lands in the same conversion", true either way. QC's longer conditional wording would have pushed the draft to ~356 words.
  - NOT APPLIED: "key event" -> "tracked action" (it's GA4's own term, not a client-invented phrase); "How I'd" -> "How we'd" (Samuel keeps first person for methodology; delivery stays with the team).
  - Targeted recheck of the changed sentences: 5 of 6 PASS (opener, header, consent paragraph incl. the new iframe fact, bidding-target sentence, close). The 6th (Customer Success example) was replaced as above. QC recount before that swap: 347 / 334.
- expert-review-agent: Strong. No technical claim wrong; confirmed gclid/GA4 mechanics, the consent paragraph and the restraint on Count settings.
  - APPLIED: internal-consistency fix. "Booked meetings ... become the bidding target once volume supports it, with form fills carrying the signal until then", and the close now reads "That decides how soon meetings alone can carry the bidding."
  - NOT APPLIED: "resource-hub download" as the example. The form on the resources hub is the general contact form (First/Last/Work Email/Company/Mobile/Salesforce tenure/Comments), not a download, so that would be false.
  - NOT APPLIED (optional): enhanced-conversions-off clause (length; held for the call).
- Final: 349 words incl. three headers (336 prose), 2040 chars, 0 em/en dashes, 0 URLs, no colons, no sign-off, no price.

## Open for Queenie
1. Hourly range, payment verification and client history aren't in the paste, so they're unscreened. Check the job page ($40/hr bottom-of-range, unverified-payment DQ).
2. Attachment: ReferPro PDF recommended but not fetched (Drive connector disconnected). Download `1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso`, confirm it's a real 2-page PDF, or delete "That case study is attached."
3. Spend bracket "$3,000 or $10,000" straddles the $5K floor on purpose (small live program, no incumbent agency). "$5,000 or $15,000" is the alternative if you'd rather not signal a sub-$5K range.
4. YELLOW: "You'll work solo in this role." The draft says plainly that a tracking specialist and Google Ads specialists do the work.
5. DB log INSERT to `upwork_proposal_logs` skipped (contractor_query can't INSERT).
6. Call material not in the body: gclid console.log left in production, Clarity + Crazy Egg both loading, enhanced conversions off, GTM scripts that append the gclid only run on the meeting calendar page (and one tries to write into a cross-origin iframe), extra GA4 page_view from the iframe.
7. Last question: "What does Google Ads spend a month, closer to $3,000 or $10,000?" Last sentence: "That decides how soon meetings alone can carry the bidding."

## PROPOSAL

The URL your Google search ad shows, the text-smarter redirect in Pardot, forwards to your homepage and drops everything after the question mark, including the gclid Google Ads adds to each click. Any click through it lands with nothing for GA4 to mark as paid and no click ID for the Google tag in GTM to store.

**What else the tags show**

HubSpot's own GA4 install loads for everyone, HubSpot only loads GTM after a visitor clicks Accept on your opt-in cookie banner, and the booking form's iframe loads the same container with no consent check. So GA4 and Google Ads aren't measuring the same visitors.

The container's one Google Ads conversion fires on any Pardot form event without checking which form sent it, so any form that sends it, contact or booking, lands in the same conversion. Two listeners for that event load on every page, so each submission sends it twice. Qualified bookings reach GA4 as meeting_booked, but nothing in GTM sends them to Google Ads. And neither Pardot form keeps the gclid, so form leads reach Salesforce without it.

**How I'd sequence it**

Click ID and consent come first, since every number depends on them. Then one map of each key event, showing where it fires and whether a native Ads tag or a GA4 import owns it, never both as primary. Booked meetings, from Qualified or the calendar, become the bidding target once volume supports it, with form fills carrying the signal until then. Once leads carry the gclid, Salesforce stages can go back to Google Ads as offline conversions. From there, ROAS reflects pipeline, and copy, audience and new campaign decisions get judged on it.

**Who does the work**

A dedicated conversion tracking specialist on our team owns GTM and GA4, and our Google Ads specialists run the campaigns. We've run Google for a B2B SaaS company alongside Meta, with Google capturing the search demand Meta created. That case study is attached.

What does Google Ads spend a month, closer to $3,000 or $10,000? That decides how soon meetings alone can carry the bidding.
