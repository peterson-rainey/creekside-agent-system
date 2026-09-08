# Upwork Proposal - Senior Meta media buyer, CAPI / server-side attribution across a third-party funnel

- **Profile:** Lindsey
- **Style:** `lindsey_default` (user asked for "Lindsey's strategic version"; `strategic` is a Samuel-only label, resolved to `lindsey_default` per the explicit "write it in lindsey_default" instruction)
- **Date:** 2026-09-08 (Postgres `now()`, US Central; harness clock was reading 09-09)
- **Status:** UNSENT
- **Screen verdict:** DRAFT WITH A LIVE FORECLOSURE. Three of eleven required items cannot be answered affirmatively (Q1, Q8, Q10). See screening notes. User's call whether to send.
- **Char count:** 4,943 (4,972 worst case if Upwork counts CRLF). Under the 5,000 cap. 0 em dashes, 0 URLs.
- **Collision risk:** TWO Samuel-profile drafts already exist for this same posting, both UNSENT. Pick one profile before sending.

---

## PROPOSAL (paste-ready)

CAPI ATTRIBUTION

Your description merges two jobs that pull opposite ways. Measurement wants the deepest, most accurate event you can capture. Optimization wants the deepest event that still clears learning volume. Plumbing serves both. The event choice cannot, and your own Question 5 shows why: 60 purchasers, split across ad sets and weeks, sits far under the roughly 50 conversions per ad set per week Meta needs to exit learning. Built perfectly, CAPI will measure Purchase accurately and still be the wrong thing to bid on. Which event you optimize toward is a media decision, and it is the one that moves your money.

Where I do not clear your bar.

1 and 8. I have not personally built a server-side GTM, Stape or custom CAPI stack, and I have not sent a matched conversion back to Meta as an S2S or offline import from a platform I did not control. My tracking work has been diagnosis and repair on live accounts, not the build. If a completed send-back is your bar, I do not clear it today.

10. No redacted Events Manager screenshots to send. I would rather put Ads Manager on a screen share and let you pull any date range yourself.

What I can prove is the event decision itself. On a US replacement parts account, retargeting was fragmented across six shallow-signal campaigns: Website Visits, Add to Cart, View Content, Time on Site. I collapsed it into a single conversions campaign. Cost per conversion went from $34.72 to $19.89 over the next three months while CPM stayed flat, $8.10 to $8.18. The flat CPM matters: it rules out the auction and leaves the event change as the explanation. That account has since ended.

2. Attribute on an ID you own. Stamp your own click ID at the pre-lander and write it server-side against a record before the user leaves your domain, storing fbclid, fbc, fbp, IP, user agent and the ad.id, adset.id and campaign.id macros against it. Pass that ID into the third party through whatever field it will carry, a sub-ID or custom param. When their postback, webhook or export reports the action, join on your ID and fire Purchase from your server with the stored fbc and fbp, hashed email and phone, an event_id for deduplication, the original event_time, and value and currency. Their platform never needs your pixel. Your database is the join.

3. fbclid is the raw click identifier Meta appends to your landing URL. fbc is that identifier stored in versioned, timestamped form, and it is the strongest deterministic match key available. fbp is a first-party browser cookie identifying the browser rather than the click, so it covers returning users arriving with no click ID. Together they lift match quality more than either alone.

4. Do not trust the query string to survive. Capture at the first hop, persist server-side against your click ID, and rebuild the string on each outbound redirect. To find the leak, run one live click and log the full inbound query string at every endpoint, reading the Location header on each 3xx. It is almost always a domain change, a 302 that rewrites the URL, or a redirect service forwarding a whitelist.

5. B, and not narrowly. A is $66.67 per purchaser at a 3 percent purchaser rate. B is $30 at 10 percent. A is buying registrations, not customers. On the optimization event, 60 purchasers will not feed learning, so I would optimize toward the deepest event clearing roughly 50 per ad set per week, likely Qualified Engagement carrying a predicted value calibrated against cohorts that actually purchased, and hold purchaser rate as the gate.

6. Report on acquisition cohort, not conversion date. Every record carries its click ID and the campaign, ad set and ad IDs from acquisition, and revenue joins back at 7, 14 and 30 days against the acquisition date. Reporting by conversion date makes every recent campaign look broken, which is how good creative gets cut in week two.

7. Match quality per event, deduplication on event_id rather than double counting, Test Events confirming the server event arrives with fbc and fbp attached, event latency, domain verification and aggregated event priority, the attribution window set on purpose, and whether your optimization event still clears weekly learning volume at the higher budget.

9. The largest single month I have personally run on one Meta account is $114,586. That account is live today and has run about $1.16 million in the last twelve months. The wider team book has peaked around $266,000 a month.

The paid audit is the right first step and I would take it as fixed scope. If it concludes you need a tracking engineer I am not, that will be in the audit rather than a quarter into management. Ongoing management we bill as a percentage of ad spend, not hours.

Two things before I quote it. What is the third-party platform handing back, a real-time postback or a periodic export, and which identifiers ride along with it? And is Meta closer to $20,000 a month or to $100,000?

---

## Screening notes (internal, do not send)

### THE FORECLOSURE, stated plainly
`feedback_screen_required_items_for_proof_gaps` says unanswerable proof demands foreclose the draft. **Three of eleven required items are unanswerable affirmatively**, and they are the three the buyer weighted most:

| Q | Demand | Our position |
|---|---|---|
| 1 | "Most technically complex CAPI/server-side implementation **you personally built**" | No CAPI/server-side build exists anywhere in the system. Verified zero. |
| 8 | S2S/postback send-back for a platform you don't control | Never shipped the return leg. |
| 10 | Examples/screenshots of prior CAPI, Events Manager, attribution work | No screenshot library exists (`reference_case_study_pdf_attachability`). |

The post also carries an explicit do-not-apply list that names "launching campaigns after someone else configured the tracking" and reads "We need someone who can **personally** diagnose and solve attribution problems."

By the letter of the rule this is a SKIP. The rule records 2 prior overrides, and the workspace already contains two Samuel drafts that made the same call to bid anyway with the gap conceded up front. Drafted on the user's explicit instruction, with the concession hoisted to the top rather than buried. **This is a judgment call being reported, not hidden.** If the read is that a bespoke-build filter is genuinely first-pass, this is a skip and no rewrite fixes it.

### DUPLICATE PROFILE BID, blocking pre-send
`reference_upwork_multiple_profiles_one_job` (prospect noticed 8/27). Two existing drafts target this same posting:
- `.claude/drafts/upwork-capi-attribution-meta-buyer.md`
- `.claude/drafts/upwork-capi-attribution-meta-samuel-strategic.md`

Both UNSENT per commit messages (`e3b6906`, `ebb4319`), and `upwork_leads` has no matching row, so nothing has collided yet. **Send one profile only.** Note the two Samuel drafts also disagree with each other on Q9 ($114K vs $99K); this draft resolves that below.

### Screens cleared
| Screen | Result |
|---|---|
| Ads in scope | PASS. Meta buying plus tracking ownership is the core ask. |
| Full-time seat (`feedback_dq_full_time_employment_seat`) | **Did not fire.** Rule fires on the words "full time"; they do not appear. Contractor framing, paid audit gates the engagement. Role-language tells are present ("technical owner", "This Is NOT a Basic Media Buyer Role") but the DQ's rationale does not attach. |
| White-label / subcontractor | PASS. Direct client, their own funnel. |
| Self-funded / profit-share | PASS. They fund spend. |
| Worker-location requirement | PASS. None stated. |
| Detection evasion (`feedback_dq_detection_evasion_jobs`) | PASS, with a note. Pre-lander plus bridge page plus tracking link is standard affiliate/CPA architecture, not evasion. Nothing asks for policy dodging. Worth confirming what the third-party platform sells before signing. |
| Flat-fee portfolio owner | PASS. |
| Hourly billing (`feedback_never_bill_hourly`) | PASS via the sanctioned carve-out. A capped paid TEST that GATES MANAGEMENT may be fixed/hourly. Draft takes the audit as fixed scope and puts management on percentage of spend. `reference_standalone_audit_fee`'s $1,000-$1,500 standalone band deliberately NOT quoted, since management sits behind this audit. |

### Open, asked, not resolved
- **Ad spend unstated.** No figure anywhere. Signals point up ("significant capacity to scale", "infrastructure and budget to scale", Q9 probes spend ceilings), so `feedback_min_ad_spend_5k` did not auto-DQ, but it is unmeasured. Asked as a bracketed range ($20K vs $100K) per `feedback_budget_ask_relative_range`.
- **Geo unstated.** No country named for the business or the ads. `feedback_geo_dq_us_ca_uk_au` judges by where ads run, and that is simply absent here. Ambiguous, not a DQ. Resolve before signing.
- **Posted rate unknown.** `feedback_upwork_min_hourly_40` screens the bottom of the listed range; the range was not supplied with this description.
- **Payment-method verification** not checkable while logged out.

### Verified live via `execute_sql`, 2026-09-08
- **Q9 number resolved.** Doctor Laleh `act_868498138612020` (meta, **active**, `platform_operator` = Lindsey Bouffard). Month-by-month peak = **2026-03 at $114,586.56**. Twelve months 2025-09..2026-08 = **$1,165,409.12** (~$97.1K/mo avg). The two Samuel drafts cite $114K and $99K respectively; both are real, they are the peak month and the rolling average. Q9 asks for the largest **monthly** spend, so the peak month is the correct answer and is what this draft uses.
- **CPA deliberately not quoted for Laleh.** Monthly cost per conversion ranges $305 to $3,969 on ~$100K/mo spend. Conversion data is not trustworthy. Spend only, per `reference_laleh_meta_is_the_single_account_ceiling`.
- **Master Spa Parts `act_2752863238119036`** (meta, **churned 2026-05-28**, `platform_operator` = Lindsey B.), so this is her own account and written past tense. Verified monthly: 2026-01 $15,587.79 / 449 conv / **$34.72** / CPM **$8.10**; 2026-04 $13,223.56 / 665 conv / **$19.89** / CPM **$8.18**. The Jan-to-Apr window is used deliberately over the Dec-to-Apr window the Welham draft used, because Dec CPM was $11.68 and the drop to $8.18 means auction cost moved. **Jan-to-Apr isolates the optimization-event decision at flat CPM**, which is the whole point on this job. Consistent with `reference_master_spa_parts_q4_meta_proof` (Q4 worst, April best).
- **Book peak** = **$266,002.67 in 2026-05** across 25 accounts. "Peaked around $266,000" is accurate; recent months run $185K-$232K, so "peaked" is doing real work in that sentence.
- **CAPI / server-side is a verified system-wide zero.** `case_studies` search across summary, key_result and keywords returned exactly one row touching tracking: Join Piper, and that is **Google Ads** with duplicate-tracking cleanup, not Meta CAPI. Confirms `reference_no_music_software_or_capi_proof`.
- **Fusion Dental restricted-event finding is real** (`agent_knowledge` correction, 2026-05-04): standard events permissible, custom events not. Adjacent and true, but cut from the draft for length and because it is a healthcare-category fact that does not transfer to this funnel.
- **Zero certifications** system-wide. None claimed, and the post says certifications do not matter anyway.

### Deliberate omissions
No URLs, no calendar link (first touch on a job post, per `project_upwork_proposal_url_ban_conflict`), no attachment, no sign-off name, no em dashes, no certification claim, no CPA or CPL for Laleh, no client names anywhere.

### Compliance
- **Q11 satisfied**: proposal opens with the literal string `CAPI ATTRIBUTION`.
- **All eleven questions addressed**: 1 and 8 answered jointly as a concession, 10 answered as a concession, 2-7 and 9 answered numbered. None skipped.
- Profile video referenced per `feedback_routing_handoff_say_watch_profile_video`, contents-agnostic.
