# High-ticket coaching webinar funnel, 30-day Meta management: screening answers (Samuel, pairs with the strategic proposal) UNSENT
Profile: Samuel Rainey (General) | Date: 2026-09-21 (US Central) | Proposal: `2026-09-21_high-ticket-coaching-webinar-funnel-meta-30day-management_samuel_strategic_UNSENT.md` (commit 8d100f4)

Questions (verbatim from Queenie):
1. Describe a coaching or high-ticket lead-generation account you have managed and the outcomes you measured.
2. How do you test new Meta ad messaging without disrupting established campaigns?
3. How do booked-call and sales data change your budget decisions when registrations are inexpensive but not all leads convert?

## VERIFIED 2026-09-21 (contractor_query unless noted)
- Fusion Dental Implants, Meta `act_938570599860690`, CHURNED 2026-07-22 ("Went internal / kept our strategy"), operator Lindsey B., so "our team". `meta_insights_daily` deduplicated by campaign-day (51 of 51 and 358 of 358 rows distinct): Apr $8,997.06 / 480 leads, 9 active days from 4/21; May $32,562.41 / 1,091, 27 days; Jun $15,927.38 / 625, 27 days; Jul 1-15 $7,259.93 / 362, 15 days. Total **$64,746.78 / 2,558 / $25.31**, 78 active days.
- Goals: "Full mouth reconstructions at $36k-$38k avg case value" ("upper $30Ks").
- Weekly report 2026-06-02 (`agent_knowledge` c544d91e), raw text: leads rolled up by location (Roseville, EDH) and by language (English, Spanish); "we intentionally reduced ad spend to accommodate the call center"; "updated lead forms that now ask more qualifying questions to better qualify candidates"; Note A, the 2 leads from the 5/27 campaigns "both scheduled consultations ... we are keeping the campaign live even at the higher cost per lead"; Note B, leads "found in Salesforce".
- Meta help pages re-read live 2026-09-21 (in-app browser): creative test "2 to 7 copies", "no more than 20% of your existing budget", "A confidence level is not included", test ads "continue to run in your existing campaign", Highest volume only (1423851372208214). Adding an ad and changing bid strategy are significant edits; "$100 to $101 ... isn't likely", "$100 to $1000 ... may reenter" (316478108955072). Learning exit "about 50 results in the week after the ad set's last significant edit"; "When you create many ads and ad sets, the delivery system learns less about each" (112167992830700).

## DELIBERATELY OUT
- The Salesforce-attributed $491,195 (client-reported, attribution method unknown).
- "Every week" for the CRM check (recorded in one report only).
- The ~60% per-active-day spend cut (May $1,206.02 to Jul $484.00): verified, but only the 6/2 week's cut is documented as call-center capacity.
- "Completed" UTM tracking (the 6/2 report says "we are adding").
- Any coaching-client number (AiW rule: presence only). The proposal already covers coaching, and Q1 allows "coaching OR high-ticket".
- South River event ladder (verified in the Altira file today, but it would stack a second account on a one-account question).

## QC + EXPERT REVIEW (2026-09-21)
- qc-reviewer-agent on v3: PASS WITH FIXES. NIT applied: dropped "and accepted a higher cost per lead" from the Q1 decisions sentence. The 6/2 report does tie that week's CPL rise to the new form questions, but it also credits landing page testing, and the phrase was doubled in the sentence.
- expert-review-agent on v3: Good x3. Taken: Q1 names Salesforce; Q1 drops "has since brought its marketing in-house" (read as a performance exit right after the spend-cut line); Q1 adds the current coaching account as one presence line; Q2 fixes "winners stay live" (all test ads keep running until switched off, so losers get switched off); Q2 adds prospecting and retargeting tested separately; Q3 adds that booked calls must fire as their own conversion event before they can be the optimization event; Q3's dental line now points back to Q1 instead of repeating it. Not taken: ending Q3 with a weekly booked-call question (the proposal already asks spend for the same reason).
- qc-reviewer-agent re-check on v4: PASS WITH FIXES. BLOCKER applied: Q3's "in the first answer" breaks the stand-alone rule, so the dental example is restated in Q3 in different words ("Our team did exactly that on a dental implant account: a campaign stayed live..."). Cleared: Salesforce line, coaching presence line, test-ads-keep-running line, conversion-event condition.
- Pre-review self-fixes: Q2 opener changed from "never goes into the ad sets that are working" to "never gets dropped straight into" (Meta's creative test does run inside the existing campaign); Q3's second dental call-center mention swapped for a general calendar-capacity line.

## ANSWERS (v5 FINAL, QC re-check PASS WITH FIXES applied)

**1. Describe a coaching or high-ticket lead-generation account you have managed and the outcomes you measured.**

A two-location dental implant practice our team ran on Meta, selling full-mouth reconstructions in the upper $30Ks. Leads went to the practice's call center to be booked for consultations, so like your funnel, there was a conversation between the lead and the sale.

What we measured: spend, leads and cost per lead, split by location and by English and Spanish campaigns, plus which leads actually booked a consultation, checked in the practice's Salesforce. From late April to mid-July, about $65,000 in spend brought in 2,558 leads at $25.31 each.

The decisions were about lead quality and capacity, not lead count. Our team added qualifying questions to the forms, kept one campaign running at a higher cost per lead because its leads were booking consultations, and pulled spend back when the call center needed room.

On the coaching side, our team currently runs Meta for a company that certifies coaches, with a recurring webinar.

**2. How do you test new Meta ad messaging without disrupting established campaigns?**

New messaging never gets dropped straight into the ad sets that are working, since adding an ad to a live ad set is the kind of edit that sends it back into learning.

Where it goes depends on the bid strategy. On Highest volume, we use Meta's creative test: 2 to 7 variants run inside the existing campaign on a slice of its budget (Meta suggests 20% at most), and the campaign keeps its learnings. The test ads keep running there afterward, so winners stay put and losers get switched off. On a cost cap, switching bid strategy to use that test would itself restart learning, so new messaging runs in a separate test ad set with its own budget, and winners move into the main ad sets in batches.

Each test changes one thing: the same approved video or image with a new hook, first line or headline, so a result traces back to the message. Prospecting and retargeting get tested separately. We run fewer, bigger tests, because Meta's delivery system learns less about each ad when there are many of them. Its test results carry no confidence level, so we set the minimum registrations before calling a winner, and judge winners on how many of their registrants book, not cost per registration.

Budget on proven campaigns moves in modest steps. Meta's own example: $100 to $101 isn't likely to restart learning, while $100 to $1,000 may.

**3. How do booked-call and sales data change your budget decisions when registrations are inexpensive but not all leads convert?**

Registrations can stay what Meta optimizes for, unless booked calls fire as their own conversion event and reach about 50 a week per ad set, the volume Meta usually needs to exit learning. Either way, booked calls and sales decide where the budget goes. Both come from your sales team's records, grouped by the week someone registered, so each week's spend is judged on what its own registrants produced.

An ad with cheap registrations and a low booking rate gets a new hook or audience, then gets cut if it doesn't improve. A pricier ad whose registrants book gets more budget. Our team did exactly that on a dental implant account: a campaign stayed live at a higher cost per lead because its leads were booking consultations.

Closers' notes break ties. If an angle keeps booking people who can't afford the program, it loses budget even when its cost per booked call looks good. Sales confirm the verdict at the message level, since one ad rarely closes enough in a month to judge on its own, and on payment plans we'd count cash collected rather than the package price.

Spend also has to fit your closers' calendar. If they're booked out, more registrations just wait longer for a call, so budget holds until there's room.
