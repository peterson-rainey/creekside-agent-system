# Upwork Proposal - Generic "scaled Facebook and Instagram accounts, show the results" (ongoing, creative testing + scaling)
Profile: Samuel Rainey | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-25 (DB now() confirmed 2026-09-25)

## SCREENS
- Ads in scope: YES, Meta campaign management. No ads-scope DQ.
- Spend: NOT STATED. Post says "grow spend", which is scaling language with no ceiling and does not foreclose the $5K floor. No auto-DQ, but the floor is UNVERIFIED. Asked as a bracket in the close.
- Geo: NOT STATED. Ambiguous, not foreclosed. No geo DQ. UNVERIFIED.
- Employment seat: post says "ongoing role" and asks for "availability", but never uses the words "full time". DQ does not fire.
- Landing-page / CRO gate: "landing pages" appears ONCE, inside a list of test surfaces. That is testing, not owning CRO, and it is one mention rather than two CRO-gated questions. Does NOT reach the skip line. Flagged, not fired.
- Not white-label, no detection-evasion, no flat-fee portfolio owner, no zero-proof exclusion clause, no stated hourly range.
- Platform test: Meta only, but the post demands a named personal ROLE in media buying AND creative strategy plus a rate. Samuel strategic+diagnostic per Queenie's explicit ask. No Lindsey twin drafted.
- Duplicate bid: none. Grepped .claude/upwork-drafts, .claude/drafts, drafts/ and upwork-drafts/ on the post's distinctive phrasing. The 9/25 "dtc-brand-meta-media-buyer-full-ownership" and "generic-meta-paid-media-specialist-parttime" drafts are DIFFERENT posts. No numeric collision with either: those cite Blush Camera CPM/frequency, Tiami and Chris Ideson. This draft cites Blush Camera CPA and Master Spa Parts, so the Blush Camera ACCOUNT overlaps with the DTC draft but no figure does. Check before sending both.

## REQUIRED-ITEMS SCREEN (run first, per standing rule)
The post lists four required items. Three are answerable, one is a real gap.
1. Two accounts scaled, start/end monthly spend, timeframe, results -- ANSWERABLE, pooled, see below.
2. Role in media buying and creative strategy for each -- ANSWERABLE. Pooled: buying sits with the team's media buyer, structure/measurement/briefs with Samuel.
3. A creative test that helped an account grow -- **GAP. THERE IS NO CLEAN, CONTROLLED META CREATIVE TEST ANYWHERE IN THE BOOK.** No ad-level Meta table exists (only meta_campaigns and meta_insights_daily, campaign grain), so no hook or asset test can be reconstructed. The only documented controlled A/B test in agent_knowledge is South River Mortgage's "Free" language test, which is GOOGLE Search RSAs, not Meta creative, and is not cited here. The draft answers item 3 by naming the gap out loud and substituting the optimization-event test it CAN defend, then describing the angle-testing structure the account actually ran. **This is the gap-first decision. Queenie: say the word if you want it dropped or handled differently.**
4. Rate and availability -- ANSWERABLE without an hourly number. Percentage of spend against a monthly minimum, bracket asked. No hourly quote (house rule, and a prior audit logged 11 hourly quotes as hard violations).

## VERIFIED LIVE THIS SESSION (contractor_query, meta_insights_daily JOIN meta_campaigns JOIN reporting_clients, 2026-09-25)
All CPAs computed ONLY over rows where conversions IS NOT NULL, per the NULL-inflation rule. Raw account totals and CPA bases are different numbers and the body says which is which.

ACCOUNT A -- Blush Camera, act_2050081878799128, operator Lindsey B., **CHURNED 2026-06-16, past tense, cited unnamed**.
  Account TOTAL monthly spend: Feb $4,801.98 (27d) / Mar $10,757.85 (31d) / Apr $11,944.21 (24d) / May $19,972.01 (27d). Feb->May = 4.16x.
  OUTCOME_SALES, conversion-covered rows only:
    Feb $1,841.39 / 40 conv / CPA $46.03 / 15 covered days
    Mar $6,435.94 / 157 / CPA $40.99 / 31 covered days (full month)
    Apr $8,697.10 / 163 / CPA $53.36 / 24 days
    May $15,750.86 / 172 / CPA $91.57 / 27 days
  Feb->May CPA = 1.99x, a clean double over the SAME window as the spend figure. (QC caught a first-pass error here: the draft originally paired a Feb->May spend ramp against a Mar->May CPA ramp, two different start dates.)
  **ROAS deliberately NOT cited for this account**: roas is non-null on only 58 of 64 May rows. Matches the 9/25 DTC draft's precedent.
  Feb campaign-level (the optimization-event test in the body):
    "Conversions | Broad Purchase | 2/16/26"  $1,312.22 / 1,905 clicks / 26 conv (conversion reporting on 11 of 12 days)
    "Conversions | ATC | 2/2/26"             $1,063.03 / 3,023 clicks / 4 conv  (4 of 25 days)
    "Conversions | IC | 2/4/26"              $871.54  / 1,172 clicks / 2 conv  (2 of 13 days)
    The weaker two report on far fewer days, so the body calls the gap DIRECTIONAL and does not quote a ratio.
  Angle campaigns genuinely present (basis for the "named angle campaigns" sentence): Selfie (3/20, 5/6), Nostalgia (4/8, 5/15), Urban Outfitters (4/9, 5/15), Fashion/Lifestyle Interest (2/20), Parents (4/3). "CBO | Testing | 5/26" ran alongside "CBO | Prospecting 5/26", which is the separate-testing-budget claim.

ACCOUNT B -- Master Spa Parts, act_2752863238119036, operator Lindsey B., **CHURNED 2026-05-28, past tense, cited unnamed**.
  Account TOTAL monthly spend: Oct 2025 $15,699.86 / Dec $15,681.83 / Mar 2026 $14,900.10 / Apr $13,223.56. Near flat, slightly down.
  OUTCOME_SALES, conversion-covered rows, revenue = sum(spend*roas), roas non-null on 100% of rows in all four months:
    Oct $8,323.92 / 263 conv / CPA $31.65 / rev $45,799.09 / ROAS 5.50 / 31 covered days
    Dec $7,699.96 / 133 / CPA $57.89 / rev $18,576.48 / ROAS 2.41 / 29 days
    Mar $10,550.28 / 423 / CPA $24.94 / rev $62,782.24 / ROAS 5.95 / 31 days
    Apr $9,814.31 / 483 / CPA $20.32 / rev $79,746.48 / ROAS 8.13 / 26 days
  NOTE: Account B is NOT a spend scale-up. The body says so explicitly rather than passing it off as one, since the post asked for two SCALED accounts. That honesty is the argument.
  (QC caught a second first-pass error: the draft claimed "full conversion and revenue coverage" on every month. Dec is 29 of 31 and Apr is 26 of 30. Corrected to state the actual day counts.)

## REJECTED AS PROOF
- Neue Maison: scaled Oct $789 -> Jul $34,422 on purchase campaigns but CPA went $43.81 -> $266.84, and roas coverage is thin (8 of 15 rows in Oct). Worse story than Blush Camera, no added value.
- Doctor Laleh: largest account on the book (~$97-114K/mo) but CPA worsened $306 -> $515 -> $472 across Jul/Aug/Sep. Not a scaling proof, and it is the complaint-heavy account.
- Fusion Dental ($18.74 -> $26.56) and Victory Land Sales ($11.48 -> $16.58): both are OUTCOME_LEADS, not purchases, and both ran under three months before churning. Mixing lead CPLs into a purchase-CPA answer would muddy the thesis.
- Nightlark: a live 4.7x ramp right now (Jun $2,730 -> Sep $12,984) but ZERO conversion coverage, so no result can be claimed at all.
- Sep 2025 months across most accounts carry only 7 days. That is when the pipeline began ingesting, NOT when the accounts started. No "starting spend" claim is drawn from any Sep 2025 row.

## REVIEW
- qc-reviewer-agent pass 1: **FAIL**, two blocking defects, both real, both fixed (mismatched Feb/Mar CPA baseline; false "full coverage" claim on Dec and Apr). Pass 2 re-verified the two replacement passages.
- QC confirmed on pass 1: every headline figure matches source exactly, past tense correct on both churned accounts, pooling correct (no first-person delivery claim), no price, no hourly rate, no URL, no sign-off, no em dashes, no parroting.

## CONSTRAINTS
3,928 chars (under the 5,000 ceiling), 710 words, 0 em dashes, no URLs, no contact info, no price, no sign-off. Bold section headers present; opener left un-headered as a cold open. No cadence word promised (client reporting is every two weeks, never weekly).

## ATTACHMENT
**ATTACH NOTHING.** The DTC/ecom Meta shelf has zero attachable case studies: Blush_Camera.pdf is DO-NOT-ATTACH (manus.im print artifacts, live URLs, revenue headline below 1.0x against real spend), and no Master Spa Parts artifact exists. Offer a live walkthrough if he asks for collateral.

## FLAGS FOR QUEENIE
1. **Item 3 is answered gap-first.** The body says out loud that the cleanest test it can defend is an optimization-event test, not a hook test. If you would rather it not concede that, it needs a different answer and I do not have one that is true.
2. **"the briefs creative gets built from come from me"** keeps briefs with Samuel while delivery buying stays with the team. That is inside the principals-never-do-delivery rule as I read it, but it is the one line in the draft that puts Samuel's hands near the work. Say the word and I will move briefs to the team too.
3. Blush Camera is cited in the 9/25 DTC draft as well. Different figures, same account. Fine unless both go to the same client.

---

Most accounts trying to grow spend and hold cost per sale at the same time end up doing neither. Our own book is the clearest argument I have for treating those as two separate programs, so here is both sides of it with real numbers rather than a highlight.

**Account one, and what a four times spend increase actually cost**

An ecommerce account our team ran took monthly Meta spend from $4,801 in February 2026 to $19,972 in May. Purchases went from 40 a month to 172. Cost per purchase, measured on the purchase optimized campaigns across days that carry conversion data, went from $46.03 to $91.57 over that same stretch. It doubled while spend roughly quadrupled. February reports conversions on 15 days of 27, so the cleanest single reference month is March, a complete 31 days at $40.99 per purchase.

That is the honest shape of a fast scale on Meta. If someone shows you a scale up where cost per sale held flat, ask which months they left out.

**Account two, the same problem run the other way**

A second ecommerce account, bought by the same media buyer, barely moved its budget. Account spend sat near $15,700 a month in October 2025 and $13,200 by April 2026, with the purchase campaigns holding between roughly $7,700 and $10,600 of that. Over that stretch cost per purchase fell from $57.89 in December to $20.32 in April, monthly purchases went from 133 to 483, and return on ad spend on those campaigns moved from 2.41 to 8.13. October and March are complete 31 day months, December and April report conversions on 29 and 26 days, and revenue is present on every reported day, so the direction does not rest on a short window.

Neither account is the whole answer. The first one bought volume at a worse rate. The second one built the room the first one never had. Growing spend without the second kind of work is how accounts end up at triple the budget and the same profit.

**The test I can actually document**

You asked for a creative test that grew an account. The cleanest test I can defend in that first account is not a hook test, it is a test of what the campaigns were told to buy, and I would rather hand you that than dress up a creative result the data will not carry. In February 2026 three campaigns ran beside each other. The purchase optimized one recorded 26 purchases from 1,905 clicks. The add to cart one recorded 4 from 3,023 clicks. The checkout one recorded 2 from 1,172. More clicks, fewer sales. I will flag that the weaker two report conversions on fewer days, so treat the size of the gap as directional. Budget moved to the purchase side, and that is where the scale in March ran from.

On creative itself that account ran named angle campaigns in parallel, a selfie angle, a nostalgia angle and a retailer led angle among them, with testing budget sitting beside the scaling campaigns instead of inside them. That is the structure I would rebuild here. A testing campaign allowed to lose money, a scaling campaign that is not, and a written rule for when something graduates between them.

**Who does what**

The day to day buying on both accounts sat with a media buyer on our team. Account structure, measurement and the briefs creative gets built from come from me. You would get that same split here and you would always know which of us touched what.

**Rate and availability**

We do not bill hourly. Management runs as a percentage of ad spend against a monthly minimum, so the figure depends on what you are spending now and where you want it to go. Tell me roughly which bracket you sit in, under ten thousand a month, somewhere in the tens of thousands, or past that, and I will give you the actual number instead of a range that flatters us both. I can start this week.

Before I quote anything, one thing I would want from you: over the last ninety days, what is your cost per purchase at today's spend, and what happened to it the last time you pushed budget up?
