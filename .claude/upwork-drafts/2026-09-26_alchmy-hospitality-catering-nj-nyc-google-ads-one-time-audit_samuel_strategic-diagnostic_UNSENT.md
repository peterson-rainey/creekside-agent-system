# Alchmy Hospitality, catering NJ + NYC, one-time Google Ads audit (Samuel, strategic + diagnostic) UNSENT

Profile: Samuel Rainey (General) | Style: `samuel_strategic` with a diagnostic opener | Date: 2026-09-25 US Central (Postgres now() 20:26 UTC; filename uses the 9/26 Manila date like today's other drafts) | No sign-off | ATTACH: `.claude/attachments/winterbotham_parham_teeple_CLEAN.pdf` | BID: $720 fixed (OPEN #1)

## Job post (as pasted, no title, budget, job type or screening questions)
> I own Alchmy Hospitality, a catering company serving New Jersey and NYC. We have an existing Google Ads account, but results are inconsistent: sometimes we receive a lot of inquiries, and other times almost none. I'm looking for an experienced specialist to perform a thorough, one-time audit to identify wasted spending and explain what's driving these swings. Please review: search terms, keywords, match types, and negative keywords; geographic targeting, networks, and ad scheduling; budgets, bidding strategies, and campaign change history; conversion tracking, including calls and form submissions, to check for missing or duplicate conversions; lead quality and cost per qualified inquiry; strong versus weak periods to distinguish campaign issues from changes in demand. The deliverable should be a clear, prioritized report showing where money is being wasted, evidence supporting each finding, and recommended fixes ranked by impact. Please audit before making account changes. Any implementation or ongoing management would be agreed separately. In your proposal, include your fixed audit price, turnaround time, required access, and an example of a similar audit.

## SCREEN
- **Step 0 / twin: EMPTY.** Grep `catering|alchmy|caterer` over `.claude/upwork-drafts/`, `.claude/drafts/`, `.claude/agents/*/drafts/`, root `drafts/` and `upwork-drafts/`: nothing. `upwork_jobs`: no Alchmy row and no match on this post's phrases; the only catering bid is 2026-02-03 "Google Ads Campaign Setup & Optimization" (corporate catering, General, not viewed), a different job. Latest synced application 2026-09-24. `git log -5`: no concurrent catering commit.
- **Profile:** Google-only, so Lindsey is a total platform fail. Samuel.
- **Ads in scope:** YES. Owner-operated ("I own Alchmy Hospitality"). Not white-label, not a seat, no hours or hourly rate asked, no no-agency clause.
- **Geo:** New Jersey + NYC. US, passes.
- **Job shape: TRUE STANDALONE AUDIT of a live account**, management left open ("would be agreed separately"). That is the exact shape the 9/22 ruling closed: $90/hr x capped hours ([[reference_standalone_audit_fee]]). The post asks for a FIXED price, so the body types the total only, never the rate or the hours.
- **Spend: unstated.** The $5K floor is a management screen and has nothing to attach to on a standalone audit. Unmeasurable, not cleared.
- **Required items: 4** (fixed price, turnaround, access, example of a similar audit). All answerable. Multi-question post, so the 400-word ceiling applies.
- **Vertical: catering / hospitality / events = ZERO.** 0 `case_studies` rows; the only food-ish `clients` row is Punch Drunk Chef Meal Prep (Meta meal prep). The post never asks for catering experience, so no disclosure, and the draft claims none.
- **CRO:** not in scope. No landing-page claim made.
- **Not in the paste:** payment verification, client history, posted budget, fixed vs hourly. Check the job page before sending.

## VERIFIED LIVE 2026-09-25 (contractor_query + Google Help)
- **IVC audit, the "similar audit" (unnamed, number-free).** `upwork_conversations` room f78813cb: Marc's offer text "This is one of five identical reads."; read-only access; 9/4 Marc: "Your read was the deepest technical work in the pool and everything in it checked out against the account." The four findings named in the body (only working conversion fired on a thank-you page view that support requests also reached; call reporting off on the call asset, phone impressions with zero recorded calls; Google Ads and the GA4 import disagreeing on the same form; three fixes in order) come from the 8/27 memory record of the delivered PDF. The PDF is not on disk or in Drive tables, so they're cited qualitatively, with no numbers. Ahmed ran it. Lost to a referral 9/4, not mentioned in the body (the audit is the product being sold here, and the praise is about the audit).
- **Winterbotham** `case_studies`: "Doubled bankruptcy leads (117 to 229) and cut CPA 42% (from $86 to $50.29) through market-specific campaign restructuring in Orange County." CLEAN PDF on disk, 785,596 bytes, same file read 9/22 with 0 localhost strings and no Samuel/Peterson byline. The body cites no numbers from it.
- **Help 7103314:** Search impression share = "The impressions you've received on the Search Network divided by the estimated number of impressions you were eligible to receive." Lost IS (budget) = "...due to insufficient budget. This data is available at the campaign level only." Lost IS (rank) = "...due to poor Ad Rank in the auction."
- **Help 2497703:** "Eligible impressions are estimated using many factors, including targeting settings, approval statuses, and quality." That's why "fewer searches to win" is paired with change history: a narrowed target also shrinks eligibility, so falling impressions at steady share is only demand if the targeting didn't move.
- **Help 10276486:** "Smart Bidding uses conversions and conversion value data in Google Ads to help meet your goals." Conversion data outages listed include "Broken conversion tracking for a certain period" and "Incorrectly placed conversion tag on a website resulting in inaccurate conversion counts." Hedged in the body with "If the account uses automated bidding".
- **Help 1722038** (memory, verified 9/16): "Presence or interest" is "the default and recommended option".
- **Help 19888** (memory, verified 9/22): change history covers the past two years.
- **Help 7193800:** does NOT say Display Expansion is on by default, so the body makes no default-network claim, just "networks and schedule" as review items.
- **Creekside 119-item checklist** (agent_knowledge 9f7c2dd6) covers Presence-only targeting (28), Search Partners and Display (30), budget per campaign (32), call conversions primary vs secondary (34-35). Report format SOP 1724ed71: issues ranked critical / moderate / minor, quick wins with time to implement, revenue impact per recommendation.

## PRICING, and why $720
- 9/22 ruling: true standalone audit of a live account = **$90/hr x capped hours**. $720 = **8 hours**.
- Why 8 and not Peterson's usual "around 5 hours" (~$450): this scope adds two things a normal audit doesn't have, matching 12 months of their inquiry records against conversions (lead quality + cost per qualified inquiry) and a strong-vs-weak period comparison against last year plus change history. IVC ran 3 capped hours, but it was a one-page read on a 90-day window.
- Carve-out check ([[feedback_never_bill_hourly]]): capped ✓ (fixed total), paid ✓, gates management ✓ (left open by the post itself, cleaner than the 9/22 post), no rate typed ✓ (only the fixed total). It's also a fixed-price contract, so nothing is billed hourly.
- The audit-credits-toward-onboarding question is still unruled, so the body says nothing about it.

## OPEN FOR QUEENIE
1. **Price.** $720 (8 hrs at the ruled $90). Swap to **$450** (5 hrs, Peterson's usual) or **$540** (6 hrs) if you want it closer to his standard. Only the one figure changes. If the job is posted fixed-price, bid the same total. If it's hourly, bid $90/hr with an 8-hour cap.
2. **IVC reuse is still unruled** (pending since 9/14, now about the sixth proposal citing it). Unnamed and number-free here, as before.
3. **Attachment:** Winterbotham CLEAN, per the standing audit-post rule (which you asked for on the 9/14 paid-audit post). If you drop it, delete the last sentence of "A similar audit".
4. **Job page:** payment verification, client country, posted budget (if a fixed budget is far under $720, flag before sending), fixed vs hourly, applicant count.
5. `upwork_proposal_logs` INSERT skipped: `contractor_query` can't write.

## REVIEW (2026-09-25)
- **qc-reviewer-agent: PASS WITH FIXES, zero blocking text issues.** It confirmed every mechanic and the IVC findings against the fact block, found no rate or hours typed, and found all four required items answered and all six scope bullets touched. Its "fixes" were process items already listed under OPEN (price, job-page screen, IVC reuse ruling). Nits it left alone: "law firm" (supported: Winterbotham `industry_label` = Legal), "industrial equipment manufacturer" (deliberately looser than "camera manufacturer"), "of the five" vs the client's "in the pool" (the same five reads).
- **expert-review-agent: Good.** It re-confirmed Presence-or-interest as the default and data exclusions for broken or miscounting tracking against live Google Help. Edits:
  - ACCEPTED, reworded: "there were fewer searches to win" read as demand-only, so it now says "there were fewer eligible searches", which covers the targeting case the next sentence names.
  - ACCEPTED, reworded: the qualified-inquiries opener now reads "Once you mark which inquiries qualified and which booked, that same check gives cost per qualified inquiry." ("check" matches the paragraph above it.)
  - REJECTED: the proposed attachment line, "what a finding like that looks like once fixed", would imply Winterbotham's fix was a tracking finding. It was a market-specific campaign restructure. The current line stays.
  - RAISED, not changed: its biggest concern is that the similar-audit example has no artifact behind it, and the attached PDF is a results case study, not an audit. That's true, and no sanitized sample audit is on file (the nurture sequence's "sample audits" aren't in the Drive tables). See OPEN #3.
  - Also raised: 8 hours may be tight for six threads plus a 12-month inquiry reconciliation. See OPEN #1.
- Final: **398 words incl. headers, 2,457 chars**, 0 dashes, 0 URLs.

## STYLE CHECKS
No "I" opener. First two sentences use their nouns (catering inquiries, Google Ads) without restating their "some months a lot, some months none" line. Bold headers as literal asterisks (9/25 standing instruction), opener un-headered. 0 em/en dashes, 0 URLs, 0 contact info, no sign-off, no principal in a delivery seat ("our team" / "we"). Rate and hours never typed.

---

PROPOSAL (paste below this line)

A slow month of catering inquiries can come from the calendar or the account, and Google Ads keeps the evidence to tell which. Impression share on Search compares the impressions your ads got with those they were eligible for. If impressions fall while share holds, there were fewer eligible searches. Last year's same weeks show whether that's the season, and change history shows whether someone narrowed the targeting. If share falls, the ads missed searches they qualified for, and the lost-to-budget and lost-to-rank columns say why.

Tracking can manufacture a slump too. If the account uses automated bidding, it learns from whatever gets recorded, which is why Google treats broken or miscounting tracking as a data outage. A form that stops registering looks like fewer people converting. An inquiry counted twice looks like a cheap win. So every conversion action, calls included, gets checked against the inquiries you actually received.

**Qualified inquiries**

Once you mark which inquiries qualified and which booked, that same check gives cost per qualified inquiry. Whatever traces to the ads gets priced by month and campaign, and the report says plainly how much couldn't be traced.

**Where waste usually hides**

Broad match tends to buy searches from people hunting catering jobs or chafing dishes, so search terms and negatives come next, then networks and schedule. Google's default location option also reaches people who have only shown interest in your area. For a caterer that's either a real client planning from out of state or pure waste, and the location report shows which.

**Price, timing, access**

$720, fixed, delivered within seven days of access. We'd need read-only access to Google Ads, Viewer in GA4, read access in Tag Manager, your call tracking if you use one, and the last 12 months of inquiries.

**A similar audit**

An industrial equipment manufacturer had five audits of its live accounts done side by side. Ours found its only working conversion firing on a thank-you page that support requests also reached, calls from the ads going unrecorded, and Google Ads and Analytics disagreeing on the same form, then ranked the fixes. The client called it the deepest technical work of the five, and said everything checked out against the account. The attached case study shows the implementation side, for a law firm.

When a slow stretch hits, do phone inquiries drop along with web forms, or only the forms?
