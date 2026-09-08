# Upwork Proposal (UNSENT) - Senior Meta buyer, CAPI / server-side attribution, third-party platform funnel
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-09
Status: DRAFTED. Supersedes .claude/drafts/upwork-capi-attribution-meta-samuel-strategic.md (2026-09-05).
Length: 4,996 chars (Upwork limit 5,000). Opens with required flag "CAPI ATTRIBUTION". All 10 numbered Qs answered; Q11 = the opener.
No pricing quoted: spend unstated, and the engagement is a paid fixed-scope audit gating management (sanctioned carve-out).

VERIFIED LIVE 2026-09-08 (Postgres):
- Largest single Meta account month = $114,586.56 (Mar 2026). Book peak = $266,002.67/mo (May 2026). Framed as team book, not one person.
- Master Spa Parts (CHURNED, past tense): CPA $34.72 Jan 2026 -> $19.89 Apr 2026; CPM $8.10 -> $8.18. Exact.
- Own dental qualification funnel (Aug 2026): form -> sessionStorage bridge -> Astro SSR booking -> server endpoint -> GHL contacts API, maps gclid + fbclid + 5 UTMs. GHL ad-attribution custom fields created 2026-05-29.

CORRECTIONS APPLIED vs the 2026-09-05 draft:
1. Q9 was "around $99,000" -- that is a typical month, not the largest. Q9 asks for the largest. Now $114,000.
2. CUT the healthcare "standard events only" claim. Source is an UNRESOLVED 2026-05-04 note ("may be able to send standard events... next step: confirm with the Meta rep"), not a shipped implementation.
3. Restored "CAPI ATTRIBUTION" as a standalone flag line (agent draft folded it into "CAPI ATTRIBUTION is the wrong place to start", which argues against the requirement we already concede we cannot meet).
4. Softened "the event change did the work" to "which rules out the auction" (flat CPM excludes the auction; it does not prove causation).
5. Restored numbered answers -- buyer numbered 11 questions and said generic applications are ignored.

HARD ZEROS CONCEDED IN BODY: no client CAPI build, no completed S2S return leg, no screenshot library, no certifications.

---

CAPI ATTRIBUTION

One thing before the answers, because it changes how we would run the audit. The deepest event question usually gets settled by match quality, not volume. A Purchase on a platform you do not control comes back with an IP, a timestamp and an order reference. A Registration on your own bridge page comes back with a hashed email, phone, fbc and fbp. Meta often learns better from the shallower event it can resolve to a person. So the first question is not which event is deepest, but which identifiers the third party hands back, since that constrains everything downstream.

Second, your Purchase arrives 7 to 30 days late while learning needs roughly 50 conversions per ad set per week inside the window. A perfectly plumbed Purchase landing on day 21 is a poor steering signal. The real build is a value weighted proxy at Qualified Engagement carrying a predicted value calibrated against cohorts that actually purchased, reconciled to revenue monthly. Get that wrong and the tracking works while the algorithm learns the wrong thing.

1. We have not built a client CAPI implementation or a server side GTM or Stape stack. What we have built is the front half of it on our own site: a qualification form feeding a session bridge into a server rendered booking page, with a server side endpoint posting into a CRM contacts API that maps gclid, fbclid and all five UTMs to dedicated fields. One decision matters for your funnel. A duplicate contact returning an error is treated as a merge, and because a merge can overwrite a stored click ID, the ID is written to the record before any redirect fires. It is our own funnel, not a client account, with no performance numbers.

8. The return leg is what we have not built. We have persisted a click ID onto a CRM record through a third party handoff we did not control, but have not sent a matched conversion back as an S2S postback. If a completed send back is your bar, we do not clear it today.

10. No redacted screenshot set for this pattern, and no certifications to point at. We will not invent proof that does not exist.

2. Stamp your own click ID at the pre lander and write it server side against a lead record before the user leaves your domain. Store fbclid, fbc, fbp, IP, user agent and the dynamic ad, adset and campaign IDs against it. Pass that ID into the third party through whatever field it carries, a sub ID or custom param. Take their postback, webhook or export, join on your ID, and fire the CAPI event server side with the stored fbc and fbp, hashed email and phone, an event_id for deduplication, the original event_time, and value and currency on Purchase. Your database is the join.

3. fbclid is the raw click identifier Meta appends to the landing URL. fbc is that identifier stored in versioned, timestamped form, and the strongest deterministic match key available. fbp is a first party cookie identifying the browser rather than the click, covering returning users with no click ID.

4. Do not trust the query string to survive. Capture at the first hop, persist server side, and rebuild the string on each outbound redirect. To find the drop, run one live click and log the inbound query string at every endpoint, reading the Location header at each 3xx. It is almost always a domain change, a 302 that rewrites the URL, or a redirect service forwarding only whitelisted params.

5. A is $66.67 per purchaser at a 3 percent rate. B is $30 at 10 percent. B wins, and registration cost was the misleading number. Neither clears that threshold, so we would optimize toward the deepest event that does, likely Qualified Engagement with a value parameter, holding purchaser rate as the gate. We ran that call on a replacement parts ecom account with retargeting fragmented across six shallow signal campaigns. Collapsing them into one conversions campaign moved cost per conversion from $34.72 to $19.89 while CPM stayed flat at $8.10 to $8.18, which rules out the auction.

6. Report on acquisition cohort, not conversion date. Every record carries its click ID and the campaign, adset and ad IDs from acquisition, and revenue joins in at 7, 14 and 30 days against that date. Reporting by conversion date makes every recent campaign look broken, the most common way teams kill their winners.

7. Event Match Quality per event, dedup rate on event_id across pixel and CAPI, Test Events confirming the server event arrives with fbc and fbp attached, event latency, domain verification and aggregated event priority order, the attribution window, and whether the optimization event has the weekly volume to exit learning.

9. Just over $114,000 in a single month on one Meta account, and roughly $266,000 a month across the book at peak. That is our team's book, not one person's.

The paid audit is the right first step and we would take it as fixed scope. If it concludes your attribution needs an engineer we do not have, you will read that in the audit rather than after a quarter of management.
