# Upwork Proposal - UNSENT
Job: Meta ads specialist for Altira Acquisitions (off-market real estate investment firm, Rockville, MD) to generate qualified investor calls. BM + Page + Pixel set up, active Instagram with Reels, monthly ad budget left as a literal "[$X]" placeholder. Scope: lead-gen campaign strategy + setup, Reel scripts and shot lists (organic + ad), ad copy + landing page optimization, weekly reporting on cost per lead and cost per booked call. "Ideal candidates have proven high-ticket lead gen results in real estate, financial services, or B2B, and can show real account results, not just a portfolio." Starts as a 2-3 week paid test, potential long-term role.
Profile: Lindsey | Style: lindsey_default (request said "Lindsey's strategic + diagnostic style... write it in lindsey_default"; pre-resolved, not re-asked) | Date: 2026-09-21 Central (Postgres now() 20:58 UTC)

## WHAT ALTIRA ACTUALLY IS (read before editing the opener)
Not a capital raise and not a securities offering. They source off-market houses for people who want to buy investment property ("Investor-First Deal Sourcing & Execution"), mostly first-time and early-stage investors, plus a lender / contractor / wholesaler side. So "investor calls" = strategy calls with would-be buyers. No Reg D / 506(c) angle applies.

## SEND ONE PROFILE (Samuel twin finished in a parallel session)
- Samuel: `.claude/upwork-drafts/2026-09-21_altira-acquisitions-meta-investor-calls-rockville_samuel_strategic-diagnostic_UNSENT.md`, committed 00d5045, 420 words, QC PASS WITH FIXES + expert Strong. Same core finding as this draft (one Lead for every quiz answer, booking signal fires before a time is picked), plus Housing special ad category, week-one plumbing, Victory Land Sales (real estate, inside Housing) and South River. Its file already says: send one profile only.
- Samuel screening answers exist: `..._samuel_SCREENING-ANSWERS_UNSENT.md`. The job has two screening questions ("Describe your recent experience with similar projects", "How do you use metrics to inform your strategy?"). They were NOT in the text pasted to this session. A Lindsey bid needs its own answers; not drafted here.
- Recommendation: Samuel, unless Queenie wants the Lindsey profile on this post. The post prefers real estate / financial / B2B proof, and strict first person leaves Lindsey with no real estate account, while Samuel can cite the Texas land seller as team proof.
- Divergence tried and dropped: a rebuilt Lindsey body on the quiz finishers who never book (phone callbacks, sizing the test to call capacity) is archived at the bottom. Expert review rated it below this version, and Samuel's screening answers already use the same Fusion CRM-check and call-center facts, so it no longer bought real divergence.
- Wording overlap with Samuel's final proposal: 8 shared 3-grams, all the client's terms ("cost per booked call", "cost per lead"), "reverse mortgage lender", "$3,000 or", "Unless Calendly or". Shared facts: the funnel finding and South River. Never send both.

## SCREEN
- Step 0: no draft of this job in `.claude/upwork-drafts/`, `.claude/drafts/`, `upwork-drafts/`, `drafts/` at session start (grep altira / rockville / off-market). `upwork_jobs` (job_name / description ILIKE altira, off-market, investor call, Rockville) and `upwork_leads`: no match. Samuel twin appeared mid-session (above).
- Platform: CLEAN PASS. Meta only.
- Geo: US (Rockville MD; ads run US). Passes.
- Spend: "[$X]" placeholder, so the $5K company floor and her $3,000 floor are both unmeasurable. Their ads ARE live (3 active since Jul 29-30), so some spend exists. Asked as a relative range tied to the learning-phase tradeoff.
- Trial term: "2-3 week paid test" fires [[reference_no_client_trial_90day_minimum]] (8 skips vs 5 overrides), but the budget is unstated, which that file says leaves it open, and it passes the IVC carve-out on all four conditions (short and capped, paid, gates a long-term role, no rate asked of us). Handled per IVC: accepted by not raising contract type. The 90-day minimum on any management that follows is NOT in the draft and must be raised before contract.
- Proof preference: "ideal candidates... real estate, financial services, or B2B" is an OR-list preference, not a numbered required item. Strict first person: real estate = zero for Lindsey; financial services = reverse mortgage lender (hers, churned 8/11, CPL fails verification, so no number); high-ticket result with real numbers = Fusion Dental (hers, churned 7/22, dental, outside the three named verticals). First draft said "the closest account I've run to real estate investing"; expert review said that reads as reaching, so the final says "Financial services is in my book too" and makes no real estate claim either way. If Queenie wants the gap stated outright, add: "I haven't run a real estate investing account yet."
- Organic Reels: scripts serve both organic and ads; draft commits to scripts, shot lists and ad copy only, claims no organic results.
- Landing page: one bullet, below the two-CRO-gated-questions line. Answered via the Calendly hand-off drop-off check.
- Attachments: NONE. Post says "real account results, not just a portfolio", so a case-study PDF is the thing they discount. Matcher top rows: South River PDF (score 4, $81 CPL dead, combined Google+Meta, churned: never attach), Big Chad Law (score 4, Google, not hers). Results-attached line replaced on purpose by a walkthrough offer on the implant group's numbers.
- Pooling: strict first person (default since 9/18). Pooled variant below adds Victory Land Sales (Scott C.'s account).
- Anchors: "over 10 years" kept (closing line); "built and sold my own e-commerce business" dropped (irrelevant to real estate investors, and length).
- Fee / rate: none quoted; post asks for none. Her $3,000 floor vs the 8/24 $1,000 authorization is still unresolved.
- Hours: Lindsey 10am-6pm Central = 11am-7pm Eastern for Rockville. Not in the body.
- Payment verification, hourly/fixed, proposal count: not in the pasted text. Check the listing before sending.
- Length: 344 words / 1,880 chars. Over her 200-300 band, under the 350 ceiling (four scope items plus a proof preference).

## FACTS
### Their funnel (read 2026-09-21 in the in-app browser; public page code, same as any visitor)
- Ads link to altiracquisitions.com/invest ("Smart Capital. Strategic Returns... Built for first-time investors", buttons "See What You Qualify For" / "Book a Call").
- /invest loads Meta Pixel `1345138164382076` (PageView fired, facebook.com/tr request seen). Events in the funnel code: `PageView` on load; custom `QuizStarted` when a path is chosen; standard `Lead` after the details submit succeeds, on BOTH the quiz path and the book-a-call path, with no parameters; custom `CallBookingOpened` on the book-a-call path, fired right before `window.open` to `calendly.com/admin-altiracquisitions/30min` in a new tab. The page's own state marks `booked: true` at that moment (the Samuel session also found the confirmation screen says the call is booked then). Nothing on the page fires when a time is actually picked on Calendly.
- NOT visible from outside, so hedged in the copy: whether Calendly's own Meta Pixel integration is on (paid plans track scheduled meetings, per the Samuel session's check of calendly.com/help/calendly-meta-pixel), and whether the `submit-funnel` Supabase edge function forwards anything to Meta ("Unless Calendly or your backend passes Meta something extra").
- Quiz answers include capital (Under $25K / $25K to $75K / $75K to $150K / $150K+), credit band, timeline (incl. "Just researching for now"), funding, strategy, state; contact step collects first name, last name, email, phone. The code grades readiness Strong ($75K+ AND ready within 3 months AND credit 660+) / Solid / Building (under $25K or just researching). Draft uses only the capital answers, never the internal labels or credit.
- The funnel stores utm_source / utm_campaign / utm_content in sessionStorage and sends them with each submission. Not in the body (Samuel uses it).
- Homepage (/) has no Pixel; its separate 3-step "Apply for Investor Strategy Call" form posts to `submit-lead` and ends in a toast. The ads don't point there.
- Site deal breakdowns: Dundalk, Temple Hills, Silver Spring (MD), Orlando (FL). Claims: 100+ investors served, 7+ markets, $2M+ in investor deals closed.
### Their ads (Meta Ad Library, US, "Altira Acquisitions" exact phrase, 2026-09-21)
- 3 active ads, started Jul 29-30, 2026, each with multiple versions, all to ALTIRACQUISITIONS.COM/INVEST, CTA Learn More, copy aimed at first-time investors. At least one includes video (media-type filter), so no claim about ad formats. Page "Altira Acquisitions" (Real Estate Service, 12 followers); Instagram @altiracquisitions 13.7K followers.
### Lindsey proof (verified live 2026-09-21 via contractor_query)
- Fusion Dental Meta `act_938570599860690`: operator Lindsey B., churned 2026-07-22 ("Went internal / kept our strategy"). 2026-04-21 to 2026-07-15, 78 active days: $64,746.78 / 2,558 / $25.31. Goals: "Full mouth reconstructions at $36k-$38k avg case value." CRM-check line is the QC-passed wording from [[reference_fusion_dental_call_center_meta_proof]] (weekly report 2026-06-02, Salesforce); call center per the same report.
- South River Mortgage Meta `act_1358674881898209`: operator Lindsey B., churned 2026-08-11. `reporting_clients.lead_conversion_types` = "offsite_conversion.fb_pixel_custom.(JTC) Pre-qualified Lead" (the lead counted in reporting). gchat dm-jordan (43cef849): "the prequalified event is a post-lead event". Campaigns from June 2026 named "Conversion | JT Prequalified 6/4 - Copy" ($28,211), "Retargeting | JT Prequalified 6/4" ($11,589), "Conversion | JT Prequalified | Broad". CORRECTION: the same chat's "The SRM campaign goals for JT events are working" is about GOOGLE (it runs straight into "Google Ads says that our pricing qualified event is active"), caught by the Samuel session. So "optimizing on" the prequalified event is NOT verified; the final says only that the lead that counted was the prequalified event. Blended Meta CPL fails verification ($384), never cite.
- Doctor Laleh Meta (hers, active): May $100,029.64, Jun $99,803.03, Jul $99,138.21, Aug $96,862.44, Sep 1-20 $62,438.94. Not in the final.
- Meta learning phase: ad sets exit learning "after about 50 results in the week after the ad set's last significant edit" (Business Help 112167992830700, per [[reference_meta_lead_to_purchase_mechanics_verified]]).
- Tracking specialist: "I work with a tracking specialist" is the 9/16-approved phrasing ([[feedback_lindsey_no_creekside_agency_framing]]).

## REVIEW LOG
- qc-reviewer-agent pass 1: PASS WITH FIXES, no blocking issues. Applied: "$150K ready or just researching" mixed two quiz fields, now capital only ("Under $25K or $150K or more"); "50 results a week" read as a standing quota, now "in a week"; ad copy was unaddressed, now in the scripts sentence. Not applied: swapping the $15,000 anchor (a question anchor, not a claim; house practice pairs the floor with a higher anchor).
- expert-review-agent: Good. Applied: "closest account I've run to real estate investing" read as reaching, reframed as financial services; the budget line now says what the test optimizes on (leads) versus what it's judged on (booked calls). Saved for the call: Housing special ad category, show-up rate, retargeting Reels viewers.
- qc-reviewer-agent re-check: PASS, no fixes.
- Rebuilt divergent version (archived below): QC PASS WITH FIXES (one blocking: "every one your team books by phone" assumed they already call back), expert Good but below this version. Not used.
- Final edits after the Samuel session's findings: South River line narrowed to the verified reporting fact; hedge and reporting sentences reworded so they don't match Samuel's text word for word. QC re-check on those three sentences: PASS, no fixes.
- DB LOG: skipped, contractor_query cannot INSERT.

---

Does your Pixel know when an investor actually books a call? On your invest page, it fires a Lead when someone submits their details and another event when the Calendly tab opens, but the booking itself happens on Calendly. Every Lead also looks the same, whether the person picked Under $25K or $150K or more. Unless Calendly or your backend passes Meta something extra, it's learning to find form fills, not booked calls.

I've worked this gap before, at a dental implant group I ran on Meta where full-mouth cases averaged in the upper $30Ks and leads went to a call center. From late April to mid-July it brought in 2,558 leads on $64,746.78, about $25 each. I checked their CRM for who booked a consultation, and kept one campaign running even though its leads cost more, because they were booking.

Financial services is in my book too: at a reverse mortgage lender, the lead that counted was a prequalified event fired after the form submission, not the submission itself.

In the test, I'd start by getting the booking itself back to Meta with a tracking specialist I work with, and checking the Calendly hand-off for drop-off. Each week you'd see cost per lead next to cost per booked call by ad, plus the share of applicants who picked $75K or more. I'd build the Reel scripts, shot lists and ad copy around your deal breakdowns, so each Reel runs as an ad and as a post.

Roughly what are you planning to spend a month, nearer $3,000 or nearer $15,000? An ad set needs about 50 results in a week to get out of learning, so at the lower end one ad set optimizes on leads and gets judged on booked calls, while the higher end has enough volume to compare the Reels against each other.

I've been doing this for over 10 years, and on a call I can walk you through the implant group's numbers. There's a short video on my profile that shows how I run accounts week to week.

---

## POOLED VARIANT (only if colleague pooling is allowed on this post; strict first person is the default)
Insert after the reverse mortgage sentence:
"A Meta buyer I work with ran a Texas land seller with one campaign per parcel, which brought in 1,136 buyer leads on $26,341.82 between mid-April and early June."
(Victory Land Sales `act_1053463565900448`, operator Scott C., churned 2026-06-01; $26,341.82 / 1,136 / 2026-04-16 to 06-09, 48 campaigns, re-verified live 9/21. Adds 28 words, which pushes the draft past 350, so trim elsewhere if used. Samuel's twin already cites it as team proof.)

## ARCHIVED: divergent rebuild (not recommended, see SEND ONE PROFILE)
What happens to the people who finish your quiz but don't book a call? They've already told you their capital and timeline and left a phone number, so a callback can turn some of them into booked calls, and Meta should hear about those bookings too.

I've worked that handoff before. At a dental implant group I ran on Meta, where full-mouth cases averaged in the upper $30Ks, leads went to a call center. From late April to mid-July the account brought in 2,558 leads on $64,746.78, about $25 each. I checked their CRM for who booked a consultation, and kept one campaign running even though its leads cost more, because they were booking. When the call center needed room, I cut daily spend by more than half.

On the financial side, I ran a lender's reverse mortgage campaigns aimed at older homeowners, and my largest account today spends just under $100,000 a month on Meta.

In the test, every booked call should reach Meta, whether it came through Calendly or a phone call, and I'd set that up with a tracking specialist I work with. The screen after the quiz is also the first place I'd look for drop-off. Each week you'd see cost per lead next to cost per booked call, split by ad and by how the call got booked. I'd write the Reel scripts, shot lists and ad copy around your deal breakdowns, so each Reel works as an ad and as a post.

Roughly what are you planning to spend a month, nearer $3,000 or nearer $15,000? I'd size the test to the number of calls your team can take in a week, so the ads don't get ahead of the follow-up.

I've been doing this for over 10 years, and on a call I can walk you through the implant group's numbers. There's a short video on my profile that shows how I run accounts week to week.

## FOR THE CALL, NOT THE PROPOSAL
- Special ad category: their live ads are not filed under Housing (Samuel session checked the Ad Library filter); Meta's housing page covers "real estate and house hunting services". Samuel's letter raises it; Lindsey's doesn't.
- Getting the booking back: Calendly's own Meta Pixel integration (paid plans), or embedding Calendly on the page so `calendly.event_scheduled` reaches the parent page, per the Samuel session's check of Calendly's help pages.
- Don't send the quiz's capital / credit answers to Meta as event data (Meta's Business Tools terms on sensitive financial information). A qualified event should pass a yes only.
- 90-day minimum and the fee must be raised before any management contract.
