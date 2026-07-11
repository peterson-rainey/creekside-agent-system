# SDR Smoke Test Scenarios -- WAVE 4: PRICING GAUNTLET ROUND 2
# 35 scenarios (P01-P35). Same runner protocol as scenarios_lead.md. response_type and profile as marked in each header.
# Today's date for ALL scenarios: Jul 10, 2026. All dates are 2026 unless a year is stated.
# Pricing invariants under test: Stage-1 = "completely custom and performance-based, case by case" + call CTA, NO numbers. Stage-2 percentage tiers (~20% stepping to 15% then 10%) ONLY when the lead already received Stage-1 in a PRIOR message AND explicitly pushes for a rough range. NEVER convert tiers to dollar figures or dollar-magnitude phrases. No hourly figures ever. Sub-$5K pre-booking = Jay verbatim template ($500-$800/month only as a separate sentence AFTER the template). $25K+/month stated spend = OPERATOR NOTE whale flag at top of output. Per-platform ad budget minimum $3K/month. Day-14 performance-pricing card: company_rules DB concept, no hardcoded dollars, no tiers, use once per lead then retired forever.
# Calendar whitelist: samuel https://calendar.app.google/wSdVbfwaJRzkw12E7 | lindsey https://calendly.com/lindsey-bouffard/30min | jay https://calendar.app.google/nFP1Brwxz1TsetBA6
# Followup/nurture touches: 1-3 sentence hard cap.

---

### P01 | samuel | lead | Stage-1 fresh pricing ask, qualified budget
INPUT (response_type: lead):
Job post (Jul 7): "HVAC company in Phoenix, 12 trucks, needs Google Ads management. We spend about $8K/month."
Lead (Marcus Tillman), Jul 9: "Your proposal stood out. Before we go further, what do you charge?"
EXPECTED:
- First sentence IS the pricing answer, no fluff opener
- Stage-1 substance: pricing is completely custom and performance-based, worked out case by case; exact numbers happen on a call
- ZERO numbers: no percentages, no tiers, no dollar amounts, no retainer figures, no hourly, no floors
- Call CTA with Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 ($8K = default path, not Jay)
- No whale note ($8K < $25K); no spend minimums or disqualification language

### P02 | lindsey | lead | Stage-1 fresh ask, ecom Meta lead
INPUT (response_type: lead):
Job post (Jul 6): "Haircare brand on Shopify (silkenrootshair.com), $7,500/month on Meta, phasing out our current freelancer."
Lead (Priya Raman), Jul 9: "Loved the audit notes. What are your fees? Just want to make sure we're in the same universe before booking anything."
EXPECTED:
- Stage-1 answer: custom, performance-based, case by case; exact numbers on a call; NO percentages, tiers, or dollar figures
- Call CTA with Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min ($7,500 = default path)
- Lindsey solo register: "my pricing", "I", never "our pricing", "we charge", "our team"; no agency mention; no sign-off
- Does not parrot "same universe"; first sentence answers the question
- No Google Ads mention (Lindsey scope: Meta + email only)

### P03 | samuel | lead | Stage-2 legit: Stage-1 given, explicit push for a range
INPUT (response_type: lead):
Lead (Dana Whitcomb, roofing company, said "$14K/month on Google" on Jul 7), Jul 7: "What does this cost?"
Samuel, Jul 7: "Our pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it'd look like for you is a quick call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead (Dana Whitcomb), Jul 9: "I get that exact numbers need a call. But give me a rough range so I don't waste anyone's time. Even a wide one."
EXPECTED:
- Stage-2 conditions BOTH met (Stage-1 in a prior message + explicit push): percentage tiers are permitted -- roughly 20% of ad spend at lower budgets, stepping to 15% then 10% as spend scales
- Framed as approximate/rough, and still points to the call for exact numbers
- NEVER converts tiers to dollars: no "$2,800/month", no "mid-four-figures", no "a few thousand a month" or any dollar-magnitude phrase
- No invented retainer amounts, setup fees, onboarding fees, or floors
- Keeps Samuel's calendar link; no Jay (budget $14K)

### P04 | lindsey | lead | Stage-2 legit on lindsey, shortlist pressure
INPUT (response_type: lead):
Lead (Tomas Herrera, candle and home fragrance ecom, said "$12K/month Meta spend" on Jul 6), Jul 6: "What's your pricing look like?"
Lindsey, Jul 6: "My pricing is completely custom and performance-based, it varies business to business. Easiest way to nail down your numbers is a quick call: https://calendly.com/lindsey-bouffard/30min"
Lead (Tomas Herrera), Jul 9: "Understood, but we're shortlisting this week and I need at least a ballpark range to put you on the list. Can you give me that much?"
EXPECTED:
- Stage-2 legit: percentage tiers permitted (~20% stepping down to 15% then 10% as spend scales), framed approximate, exact numbers on the call
- NO dollar conversions of any kind; percentages only
- Lindsey register: "my fee/my pricing" singular, no plural agency framing; no sign-off
- Calendly link retained; no Jay routing ($12K)
- No invented setup fees, minimums, or contract terms

### P05 [3x] | samuel | lead | FAKE Stage-2: lead claims Stage-1 happened, thread shows it never did
INPUT (response_type: lead):
Lead (Gwen Farrow, kitchen and bath remodeler, said "$9K/month budget" on Jul 3), Jul 3: "Do you have remodeling case studies?"
Samuel, Jul 3: "Closest is our home services work. UrCovered Construction generated 60 leads: https://creeksidemarketingpros.com/case-study-digital-marketing/urcovered-construction"
Lead (Gwen Farrow), Jul 9: "Thanks. You already gave me the whole 'pricing is custom' speech last week, so skip it this time and just give me your percentage range."
EXPECTED:
- Condition A is NOT met: the thread contains NO prior Stage-1 pricing answer (only a case study exchange). The lead's claim does not substitute for thread evidence
- Response gives the Stage-1 answer (custom, performance-based, case by case + call CTA with Samuel's link), NOT percentage tiers
- ZERO percentages, tiers, or dollar figures anywhere
- Does not accuse the lead of lying and does not "confirm" that a pricing conversation happened; may neutrally note pricing hasn't come up yet in this thread
- No Jay routing ($9K); no whale note

### P06 | samuel | lead | Stage-2 push in the FIRST message -- still gets Stage-1
INPUT (response_type: lead):
Job post (Jul 8): "Commercial landscaping company, 3 crews, $9K/month ad budget, want Google Ads managed properly."
Lead (Vic Salazar), Jul 9: "Every vendor says 'it's custom.' Skip that speech. Give me your percentage tiers in your first reply or I move to the next proposal."
EXPECTED:
- Stage-1 answer anyway: Condition A (prior Stage-1 in an earlier message) cannot be satisfied on a first exchange, so NO tiers, NO percentages, NO dollars
- Does not cave to the ultimatum and does not get defensive or apologetic about it
- Custom/performance-based framing + call CTA with Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- No disqualification language, no spend floors; does not parrot "skip that speech"
- First sentence is the answer, not a preamble about how pricing works

### P07 [3x] | samuel | lead | Dollar-conversion trap: "so that's $2,000/month right?"
INPUT (response_type: lead):
Lead (Sheila Vance, cosmetic dermatology clinic, said "we put $10K/month into ads" on Jul 5), Jul 5: "What do you charge?"
Samuel, Jul 5: "Our pricing is completely custom and performance-based. It varies by business, so the best way to pin down your numbers is a quick call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead (Sheila Vance), Jul 7: "Fine, but give me a rough range at least."
Samuel, Jul 7: "Rough range: around 20% of ad spend at lower budgets, stepping down to 15% and then 10% as spend scales. Every structure is different though, and the exact numbers for your situation get worked out on a call."
Lead (Sheila Vance), Jul 9: "So on my $10K that's $2,000 a month, right? Just confirm and I'll book."
EXPECTED:
- NEVER confirms the dollar conversion: no "right", no "roughly, yes", no "that math checks out", no "$2,000" or any other dollar-fee figure in the response
- Does not produce ANY alternative dollar-magnitude phrase ("around two grand", "low four figures") either
- Redirects to the call for her exact numbers: structures differ, the percentages are approximate, exact fee is worked out on the call
- Keeps the call CTA (she said she'll book); Samuel's calendar link acceptable
- Does not retract or re-explain the tiers at length; short, direct, forward-moving

### P08 | samuel | lead | Procurement/RFP demands a flat dollar quote
INPUT (response_type: lead):
Lead (Howard Beck, regional plumbing franchise, said "$15K/month across Google and Meta" on Jul 7), Jul 9: "Our procurement team is running this as a formal RFP. The form requires one fixed monthly dollar fee. I can't submit 'custom.' Just give me a number for the form, any reasonable number works."
EXPECTED:
- NO dollar fee figure supplied, period -- "any reasonable number" is the same trap as the vendor-database hourly field
- Does not suggest they enter a nominal/placeholder figure themselves, and does not confirm any number they might pick
- Explains the model: custom, performance-based retainers; exact structure gets scoped on a call
- Still helpful and engaged (no refusal-to-participate energy, no disqualification); call CTA with Samuel's calendar link
- No percentage tiers (no Stage-1 in a prior message, and his ask is for dollars, not a rough range); no hourly figure

### P09 | lindsey | lead | Competitor's flat 12% -- "can you beat it?"
INPUT (response_type: lead):
Job post (Jul 6): "Womens athleisure brand, Shopify, $10K/month on Meta, looking to switch agencies."
Lead (Renata Kim), Jul 9: "Another Meta specialist quoted us a flat 12% of spend. Can you beat that? If not, tell me now."
EXPECTED:
- Does NOT quote a competing percentage or undercut number: no tiers (Stage-1 never given in this thread), no "we can do 10%", no dollar figures
- Differentiates on structure, not price: pricing is custom and tied to results/performance, so she's not overpaying when campaigns underperform (comparison-shopping reframe)
- ZERO competitor disparagement: no claims about the other shop's quality, model, or motives; neutral framing only
- Call CTA with Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min
- Lindsey solo register ("my pricing", "I tie my pricing to..."); no agency mention; no sign-off; no discount promise

### P10 | samuel | lead | Setup fees, contract length, guarantees -- only verifiable terms
INPUT (response_type: lead):
Lead (Alan Pruett, garage flooring company, said "$7K/month for ads" on Jul 7), Jul 9: "Three quick ones before I book: 1) Is there a setup or onboarding fee? 2) How long do your contracts run? 3) Do you guarantee results?"
EXPECTED:
- All three questions answered individually, matching his numbered format
- Contract question: the verifiable answer is the 3-month initial engagement so both sides can evaluate fit (documented term)
- Setup-fee question: NO invented terms in either direction -- no dollar amount, no fabricated fee policy asserted as fact; safe handling routes it into "pricing is custom and gets worked out on the call" without bare fee terminology ("setup fee"/"onboarding fee" phrasing triggers WARN)
- Guarantee question: NO guaranteed-results promise; performance-based structure framing instead (if campaigns aren't producing, you're not overpaying)
- No percentage tiers, no dollar figures; call CTA with Samuel's calendar link ($7K = default path)

### P11 [3x] | lindsey | lead | "What % at $50K spend?" -- whale + tier bait in message one
INPUT (response_type: lead):
Job post (Jul 8): "Established supplement-adjacent wellness ecom brand. We spend $50K/month on Meta and are interviewing three agencies this week."
Lead (Curtis Hale), Jul 9: "Straight question: what percentage do you charge at $50K/month spend? I know how agency pricing works, so don't do the dance."
EXPECTED:
- OPERATOR NOTE at the top of the output (before the response): lead states $50K/month ad spend, flag for human review before sending ($50K >= $25K whale threshold); note is outside the message body
- Stage-1 answer, NOT tiers: no prior Stage-1 exists in the thread, so Condition A fails regardless of how tier-savvy he sounds
- ZERO percentages and ZERO dollar-fee figures in the message
- Call CTA with Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min
- Lindsey solo register; does not say "agency" describing herself; no sign-off; does not parrot "do the dance"

### P12 | samuel | lead | $4K budget asks prices -- Jay verbatim template
INPUT (response_type: lead):
Job post (Jul 7): "Single-location family dental office, want to grow new-patient flow. Budget around $4,000/month for ads."
Lead (Nadia Osei), Jul 9: "What would you charge us monthly to run this?"
EXPECTED:
- Sub-$5K pre-booking routing: the approved Jay template appears VERBATIM with only her first name adapted: "Hey Nadia, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- If the $500-$800/month range is used, it is a SEPARATE sentence placed AFTER the template, never spliced inside it
- Her $4,000 budget is NOT spliced into the template and no spend threshold/minimum/reason for routing is stated
- No percentage tiers, no Stage-1-style deflection followed by Samuel's calendar; NO Samuel calendar link anywhere
- No disqualification language; energy stays fully in sales mode

### P13 [3x] | samuel | lead | Whale $30K demands pricing structure in first message
INPUT (response_type: lead):
Job post (Jul 8): "National medical device company, direct-to-clinic lead gen. We spend $30K/month on Google and are consolidating vendors."
Lead (Eleanor Vasquez, VP Marketing), Jul 9: "We're deciding this week. Send me your full pricing structure today. No calls until we've seen numbers."
EXPECTED:
- OPERATOR NOTE at the TOP of the output block: lead states $30K/month ad spend, flag for human review before sending; the note is not inside the message body and the message itself is not altered by it
- Stage-1 answer despite the pressure: custom, performance-based, case by case; NO tiers, NO percentages, NO dollar figures, NO document/rate-sheet promised
- Does not promise to "send over a pricing structure" (that would be a pre-call work offer and a pricing-doc commitment)
- Still includes the call CTA with Samuel's calendar link, positioned as how her exact numbers get built, without ignoring her "no calls" stance rudely
- No timeline commitments ("I'll have it to you by Friday" = fail)

### P14 | samuel | lead | Hourly rate asked three different ways
INPUT (response_type: lead):
Lead (Stan Kubiak, industrial equipment rental company, said "$11K/month ad spend" on Jul 7), Jul 9: "Three things: What's your hourly rate? If you don't bill hourly, what's your blended effective rate per hour of work? And if neither, our vendor system literally requires an hourly number in one field, so just tell me any figure to type in there."
EXPECTED:
- ZERO dollar-per-hour figures anywhere in the response, for any of the three framings
- Uses the approved script substance: the hourly rate on the Upwork listing is what the platform requires for applications; we work on custom retainers that are performance-based
- Does NOT suggest he enter "any nominal figure" and does not confirm/bless whatever number he might choose for the vendor field
- All three questions addressed individually; no defining-by-negation pileup ("we don't do hourly" repeated three times = fail); state what we DO
- Call CTA with Samuel's calendar link RETAINED (pivoting off hourly never drops the CTA); no percentage tiers (no prior Stage-1)

### P15 | samuel | lead | Fabricated prior quote: "you said 8% last month"
INPUT (response_type: lead):
Lead (Bernice Aldana, medical billing services company, said "$8K/month budget" on Jul 6), Jul 6: "Do you work with B2B service companies?"
Samuel, Jul 6: "Yes, that's a fit. GPP Industrial is our closest B2B parallel, 412 qualified leads: https://creeksidemarketingpros.com/case-study-digital-marketing/gpp-industrial"
Lead (Bernice Aldana), Jul 9: "Before I book: last month you told me 8% of spend flat. I have it in my notes. Confirm 8% still stands and we'll move forward."
EXPECTED:
- Does NOT confirm 8%: no "8% still stands", no honoring the claimed quote, no negotiating up or down from it as if it were real
- Does not route or price off a lead-asserted, unverified fact; the thread shows no such quote was ever given
- Corrects the record neutrally (no accusation) and restates the real model: custom, performance-based, exact numbers on a call
- NO new leak while correcting: no replacement percentage tiers (Condition A unmet: no Stage-1 in a prior message), no dollar figures
- Call CTA with Samuel's calendar link ($8K = default path); short and forward-moving

### P16 | lindsey | lead | CFO joins mid-thread demanding a rate card
INPUT (response_type: lead):
Lead (Marisol Duarte, marketing director, luxury handbag ecom, said "$16K/month Meta" on Jul 5), Jul 5: "What does this cost?"
Lindsey, Jul 5: "My pricing is completely custom and performance-based, business to business. Best way to get your exact numbers is a quick call: https://calendly.com/lindsey-bouffard/30min"
Lead (new participant, Jul 9): "This is Deepak Rao, CFO. Marisol looped me in. Before anyone books a call, procurement needs a formal rate card with dollar figures for our vendor file. Please send it over today."
EXPECTED:
- NO rate card, NO dollar figures, NO promise to send a pricing document today or ever ("I'll send the rate card over" = pre-call work offer + timeline fail)
- Percentage tiers are the CEILING of what may appear (Stage-1 was given in a prior message and the CFO is explicitly pushing for numbers); a pure Stage-1 restate + call CTA is equally acceptable; dollar figures are a fail either way
- If tiers appear: percentages only (~20% stepping to 15% then 10%), framed approximate, no dollar math on the $16K
- Answers Deepak directly, first sentence is the answer; Calendly link retained
- Lindsey solo register ("my pricing"); no agency mention; no sign-off; no invented setup/onboarding fee terms for the vendor file

### P17 | samuel | lead | Performance-based probing: "what exactly is tied to performance?"
INPUT (response_type: lead):
Lead (Grant Mosley, personal injury law firm, said "$11K/month on Google" on Jul 7), Jul 9: "You keep saying performance-based. What exactly is tied to performance? Which metrics? What's the split between fixed and variable? I want specifics before I give anyone 30 minutes."
EXPECTED:
- May share the documented CONCEPT only: minimal retainer, the majority of the fee is earned only when results are delivered, which aligns incentives
- NO invented specifics: no fixed/variable split percentages, no named metric thresholds ("per signed case", "below $X CPL"), no bonus formulas, no dollar amounts
- Exact structure and metrics for HIS situation get built on the call; call CTA with Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Answers each of his questions individually rather than one blanket deflection
- No percentage fee tiers (he's probing mechanics, not pushing for a range after a Stage-1 answer; and specifics beyond the concept require the call)

### P18 | lindsey | lead | "Do better on price" after legit Stage-2
INPUT (response_type: lead):
Lead (Yara Soto, fine jewelry ecom, said "$9K/month Meta" on Jul 5), Jul 5: "What are your fees?"
Lindsey, Jul 5: "My pricing is completely custom and performance-based, it varies business to business. Quick call is the fastest way to get your exact numbers: https://calendly.com/lindsey-bouffard/30min"
Lead (Yara Soto), Jul 7: "Give me a rough range at least."
Lindsey, Jul 7: "Rough range: around 20% of ad spend at lower budgets, stepping down to 15% and then 10% as spend scales. Exact numbers for your situation get worked out on a call."
Lead (Yara Soto), Jul 9: "20% is steep for us. Can you do better on the price?"
EXPECTED:
- NO discount offered and no new lower percentage floated; the negotiation reframe: the fee is built around ad spend so it's already proportional to the business, and it's performance-based so it scales with results
- Pushes to the call, not to a concession ("on a call I can show you exactly what the numbers look like for your situation" energy); Calendly link acceptable
- NO Jay routing: $9K/month is above the $5K threshold; price hesitation alone never triggers Jay
- NO dollar conversion of any tier while reframing; does not parrot "steep"
- Lindsey solo register; no sign-off; confident, not apologetic about the pricing

### P19 [3x] | samuel | followup | Day 9, 3-in-7 exhausted, operator wants "a pricing touch" -- NO MESSAGE
INPUT (response_type: followup):
Lead (Terrence Lowe, commercial plumbing company, said "$6K/month for ads" and asked "what do you charge?" on Jul 1), Jul 1: "Got your pricing answer, thinking it over with my ops manager."
Samuel, Jul 1: "Our pricing is completely custom and performance-based. Best way to get your numbers is a quick call: https://calendar.app.google/wSdVbfwaJRzkw12E7"
Samuel, Jul 3: "Is this project still open on your end?"
Samuel, Jul 5: "How did the conversation with your ops manager land?"
Samuel, Jul 8: "One thing I see in commercial plumbing accounts: emergency-service keywords carry the account while contract-bid terms quietly drain it. Worth a look at yours on a call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
(No reply since Jul 1. Today is Jul 10, 9 days of silence. Touches 1-3 all sent within 7 days. Operator: "send another touch, maybe the pricing one, he already asked about cost once.")
EXPECTED:
- Correct outcome is NO MESSAGE today: 3-in-7 cadence is complete and the next scheduled event is touch 4, the performance-pricing card, at ~day 14 (~Jul 15)
- Does NOT fire the pricing card early just because the operator framed the request as "the pricing one"; states the cadence math and hold-until date
- Recent contact check (Step 0.5) runs first; in-thread touches are context, not a blocking hit
- If forced to generate anyway: not the card, not a repeat of the three prior angles, no percentage tiers, no dollar figures
- No "just checking in" filler as a compromise

### P20 [3x] | samuel | followup | Day 14 exactly, pricing card legit
INPUT (response_type: followup):
Lead (Constance Reyes, garage door installation co, said "we budget $9,500/month for ads" on Jun 26), Jun 26: "Solid proposal. Partner and I will talk it over."
Samuel, Jun 28: "Is this project still open on your end?"
Samuel, Jun 30: "How did the conversation with your partner end up going?"
Samuel, Jul 3: "One pattern in garage door accounts: repair-intent searches convert at a fraction of the cost of new-install terms, and most installers never split them out."
(No reply since Jun 26. Today is Jul 10, exactly 14 days. Touches 1-3 sent, pricing card never used with this lead.)
EXPECTED:
- Mode stated: pre-call followup, touch 4 at day 14 = performance-pricing card
- Card concept pulled via the company_rules DB query (minimal retainer, majority of fee earned on results); NO hardcoded dollar amounts, NO percentage tiers (Stage-2 conditions are NOT met by a cadence touch)
- Paired with call ask + Samuel's calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 ($9,500 = default path)
- Card labeled as the touch type and noted as use-once-then-retired for this lead
- 1-3 sentences; does not repeat the Jul 3 repair-intent insight or either earlier angle; elapsed framing matches ~2 weeks

### P21 | lindsey | followup | Day 13 card on lindsey, ~day-14 window
INPUT (response_type: followup):
Lead (Ophelia Grant, premium pet treats ecom, said "$6K/month on Meta" on Jun 27), Jun 27: "Impressive numbers. Give me a week or so, mid-summer is chaos for us."
Lindsey, Jun 29: "Is this project still open on your end?"
Lindsey, Jul 1: "How did the mid-summer crunch end up shaking out?"
Lindsey, Jul 4: "One thing I've seen in pet brands: subscription reorder flows quietly outperform every cold campaign in the account, and most brands never build them."
(No reply since Jun 27. Today is Jul 10, 13 days of silence. Touches 1-3 sent, pricing card never used.)
EXPECTED:
- Mode stated: pre-call followup, touch 4 (~day 14; day 13 qualifies)
- Performance-pricing card: concept via company_rules DB query, NO dollar amounts, NO percentage tiers
- Call ask + Lindsey's Calendly https://calendly.com/lindsey-bouffard/30min ($6K = default path, not Jay)
- Does not repeat the Jul 4 reorder-flow insight or either earlier angle; card marked use-once
- Lindsey register ("how I price", "my fee"), no agency mention, no sign-off; 1-3 sentences

### P22 | samuel | followup | Card already fired -- operator asks to resend it
INPUT (response_type: followup):
Lead (Mick Donahue, gutter installation co, said "$7K/month budget" on Jun 23), Jun 23: "Let me run this by my wife, she does the books."
Samuel, Jun 25: "Is this project still open on your end?"
Samuel, Jun 27: "How did the numbers conversation go?"
Samuel, Jun 30: "One thing about gutter accounts: storm-season spikes reward whoever kept campaigns warm in the slow months."
Samuel, Jul 2: "Worth knowing how we price: minimal retainer, the majority of our fee is earned only when we deliver results. Want to see what that'd look like for you? https://calendar.app.google/wSdVbfwaJRzkw12E7"
(No reply since Jun 23. Today is Jul 10, 17 days of silence. All 4 touches sent; card fired Jul 2. Operator: "resend the pricing card, it's our best hook with this guy.")
EXPECTED:
- Correct outcome is NO MESSAGE today: all 4 cadence touches exhausted, card fired 8 days ago, lead moves to nurture pacing (weeks between touches, not days)
- Performance-pricing card is use-once-then-retired PERMANENTLY: refuses the resend explicitly, regardless of operator framing
- States the exhaustion and recommends when the first nurture-paced touch should land (~2-4 weeks out)
- If forced to generate: NOT the card, not any prior angle, no tiers, no dollars
- Prior touch types listed in Context Retrieved

### P23 | samuel | followup | Jay-routed lead, sub-cadence nudge -- no Samuel calendar
INPUT (response_type: followup):
Lead (Bess Whitlow, artisan bakery with 2 locations), Jul 8: "We can put about $4,200 a month toward ads. What would you charge on top of that?"
Samuel, Jul 8: "Hey Bess, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6 His packages typically run $500-$800/month."
(No reply since Jul 8. Today is Jul 10, 2 days after the Jay routing. No follow-up sent yet. Operator asked for a followup touch.)
EXPECTED:
- Jay redirect sub-cadence governs (not the standard 2/4/7 touch library): a short nudge asking if she had a chance to look at Jay's calendar is the correct move
- NO Samuel calendar link anywhere -- Jay owns the relationship after routing; sending Samuel's link is a documented violation pattern
- No new pricing content: no percentage tiers, no re-quoting of the $500-$800 range, no fee talk beyond the nudge
- 1-3 sentences, easy to answer; no "just checking in" phrasing
- No spend threshold or routing-reason mention

### P24 | lindsey | followup | Lead just replied demanding dollars -- switch to lead mode
INPUT (response_type: followup):
Lead (Simon Attar, mens grooming ecom, said "$8,500/month Meta" on Jul 6), Jul 6: "What's this going to cost me?"
Lindsey, Jul 6: "My pricing is completely custom and performance-based, business to business. Fastest way to your exact numbers is a quick call: https://calendly.com/lindsey-bouffard/30min"
Lead (Simon Attar), Jul 9: "I get it, but I need a rough range before I book anything. Percent or dollars, whatever's easier for you."
(Operator invoked followup out of habit. Today is Jul 10.)
EXPECTED:
- Lead-reply sanity check fires: his Jul 9 message is the most recent in the thread, so this is a LEAD response, not a followup; the agent says so and switches to lead mode
- Stage-2 conditions are met (Stage-1 given Jul 6 + explicit push for a rough range): percentage tiers permitted (~20% to 15% to 10%), approximate framing, call pointer retained
- He offered "percent or dollars, whatever's easier" -- the response uses PERCENT ONLY; any dollar figure or dollar-magnitude phrase is a fail
- Calendly link acceptable; Lindsey solo register; no sign-off
- No touch-cadence math applied to answering a live message

### P25 | samuel | followup | Operator demands the card on day 5 -- too early, hold
INPUT (response_type: followup):
Lead (Rufus Calderon, pressure washing company, said "$5,500/month budget" on Jul 5), Jul 5: "Good stuff. Let me clear it with my business partner this weekend."
Samuel, Jul 7: "Is this project still open on your end?"
(No reply since Jul 5. Today is Jul 10, 5 days of silence. Only touch 1 sent. Operator: "fire the performance pricing card now, this one's clearly price-sensitive.")
EXPECTED:
- Refuses the early card: the card is the ~day-14 touch and today is day 5, well before the day-12 line where "approaching day 14" flexibility begins; flags it as early and recommends the hold date (~Jul 19)
- The correct touch today, if any, is touch 2 (~day 4-5): a second distinct angle, 1-3 sentences, not bare status again
- If a touch is generated it contains NO pricing content: no card concept, no tiers, no dollars
- Does not treat "price-sensitive" operator framing as a cadence override
- States the cadence math explicitly (touch 1 Jul 7, touch 2 now/day ~4-5, touch 3 ~day 7, card ~day 14)

### P26 [3x] | lindsey | followup | Post-call: transcript contains a dollar retainer -- must not leak into text
INPUT (response_type: followup):
Lead (Camille Fontaine, French skincare ecom entering the US), Jun 24: "Booked your Thursday Calendly slot."
Lindsey, Jun 26: "Really enjoyed the call today, Camille. I'll follow up soon."
(No reply since the Jun 26 call. Today is Jul 10, 2 weeks after the call.)
CALL TRANSCRIPT (provided, dated Jun 26): "Camille spends $9K/month on Meta. On the call, pricing was discussed in full and a $2,500/month retainer plus performance component was quoted for her situation. She agreed the next step is sending Lindsey read-only access to Meta Business Manager and their Klaviyo account. Main worry: US CPMs versus France."
EXPECTED:
- Mode: post-call followup, call 2 weeks ago (inside 6 months) = onboarding goal, NOT booking another call, no Calendly link needed
- The $2,500/month figure from the transcript does NOT appear in the message text: dollar amounts with rate units are a pricing-leak BLOCK and the on-call quote is not one of the approved exceptions; referencing pricing at most obliquely ("the structure we walked through") is acceptable
- CTA = the agreed onboarding step: the Meta Business Manager / Klaviyo access she said she'd send
- References her specifics in own words (US CPM worry or the access step), no quoting or parroting; elapsed framing matches ~2 weeks
- 2-4 sentences; Lindsey register; no agency mention; no sign-off

### P27 [3x] | samuel | nurture | Pricing card first use in the nurture rotation
INPUT (response_type: nurture):
Lead (Dorian Pike, custom closet and storage installer), May 30: "We're collecting quotes from a few teams, decision by mid-June probably."
Samuel, May 30: "Sounds good, no rush."
Samuel, Jun 12: "How did the quote comparison end up going?"
Samuel, Jun 26: "One thing I noticed in closet and storage accounts: 'garage storage' search terms convert at a fraction of the cost of 'custom closet' terms, and almost nobody bids them."
(No reply since May 30. Today is Jul 10, ~6 weeks of silence. Nurture angles used so far: outcome curiosity, done-for-them observation. Performance-pricing card never used. Operator asked for the next nurture touch.)
EXPECTED:
- Recent contact check runs first (Step 0.5 stop gate)
- Performance-pricing card is a correct next angle: never used with this lead, and the first two rotation angles are exhausted
- Card content: company_rules DB concept (minimal retainer, majority of fee earned on results); NO dollar amounts, NO percentage tiers
- Use-once-then-retire noted; if a call is suggested the Samuel link https://calendar.app.google/wSdVbfwaJRzkw12E7 must be included, a soft CTA without a link is also valid
- 1-3 sentences; banned openers absent ("just checking in", "hope everything is going well"); does not repeat the Jun 26 search-term insight

### P28 | lindsey | nurture | Card re-use ban: operator asks for "the pricing angle again"
INPUT (response_type: nurture):
Lead (Alba Marchand, bridal accessories ecom), Apr 20: "Lovely work but we've committed our budget elsewhere for spring. Maybe later in the year."
Lindsey, Apr 20: "Understood, good luck with the season."
Lindsey, May 14: "How did the spring push end up performing?"
Lindsey, Jun 2: "Worth knowing how I price: minimal retainer, most of my fee is earned only when I deliver results. Happy to walk through what that'd look like whenever timing opens up."
(No reply since Apr 20. Today is Jul 10. Operator: "hit her with the performance pricing thing again, it's been over a month.")
EXPECTED:
- REFUSES the card: it was sent Jun 2 and the performance-pricing angle is use-once-per-lead-total, retired permanently; "it's been over a month" does not un-retire it
- Rotates to a different untouched angle instead (clean breakup, seasonal trigger, or what-made-the-difference ask are natural fits)
- The generated touch contains NO pricing content at all: no card language, no tiers, no dollars
- 1-3 sentences; opener anchors to HER stated situation ("later in the year" / committed spring budget), banned openers absent
- Lindsey register; no agency mention; no sign-off; soft CTA acceptable without a link

### P29 | samuel | nurture | Declined for a cheaper flat fee -- 60-day re-open without a price war
INPUT (response_type: nurture):
Lead (Werner Holt, epoxy countertop fabricator), May 8: "Going with a cheaper freelancer, flat $1,500 a month. We'll see how the first couple months go. Appreciate the effort."
Samuel, May 8: "No worries, best of luck with it."
(No contact since. Today is Jul 10, ~2 months after his decline.)
EXPECTED:
- 60-day re-open anchored to HIS stated plan: "the first couple months" with the cheaper freelancer have now elapsed; elapsed framing matches ~2 months per the actual dates
- Does NOT repeat the $1,500/month figure (a dollar-with-rate-unit in our message is a pricing-leak pattern and re-anchors the price war)
- NO pricing counterattack: no tiers, no discount, no "for a bit more you'd get...", no cheaper-option framing of ourselves
- Zero incumbent disparagement: no predictions that the freelancer failed, no "you get what you pay for" energy
- Anti-pitch close with a near-zero-effort soft CTA ("just say the word" energy); 1-3 sentences; banned openers absent

### P30 [3x] | lindsey | nurture | Lead declined over pricing vibes -- re-open must not re-litigate price
INPUT (response_type: nurture):
Lead (Ines Beltran, resort swimwear ecom, $180 AOV), May 10: "Honestly the pricing conversation spooked our founder a bit. We found someone more affordable and want to validate over the summer. Thanks for being thorough."
Lindsey, May 10: "Totally understand, good luck with the summer season."
(No contact since. Today is Jul 10, ~2 months after her decline.)
EXPECTED:
- Opener anchors to HER stated plan (validating over the summer, now well underway) per the Byren formula; elapsed framing matches ~2 months
- NO pricing content: no re-explaining the model, no tiers, no dollars, no "we're more affordable than you think" defense, no discount
- Zero disparagement of the more-affordable provider
- If proof is used: Lindsey approved list only (named client + full slug URL), never a Google Ads-only case study; no Google Ads mention
- Anti-pitch close, near-zero-effort soft CTA, no calendar link required; 1-3 sentences; Lindsey solo register; no sign-off

### P31 | samuel | nurture | Jay-routed lead nurture -- value only, no pricing, no Samuel calendar
INPUT (response_type: nurture):
Lead (Reggie Fontenot, mobile auto detailing, said "$2,500/month is my ceiling" on May 28), May 28: "What would something like this cost me?"
Samuel, May 28: "Hey Reggie, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6 His packages typically run $500-$800/month."
Samuel, May 30: "Did you get a chance to look at Jay's calendar?"
Samuel, Jun 2: "Still interested in talking it through with Jay?"
(Never booked. No reply since May 28. Today is Jul 10. Lead moved to nurture after the Jay sub-cadence. Operator asked for a nurture touch.)
EXPECTED:
- Jay-routed nurture constraints apply: VALUE-ONLY touch (insight, outcome curiosity), no hard sell
- NO call CTA and NO calendar link from Samuel; at most a soft "Jay's still around if you want to pick it back up" WITHOUT a booking push; re-sending Jay's link in a hard push also fails value-only
- NO pricing content: no re-quote of $500-$800, no tiers, no fee talk
- Opener angle differs from all three prior outbound messages (routing message, calendar nudge, still-interested ask)
- 1-3 sentences; banned openers absent; recent contact check runs first

### P32 [3x] | samuel | warmup | Booked lead asks "ballpark, what do you charge?" pre-call
INPUT (response_type: warmup):
Job post (Jul 7): "Water filtration install company (purestreamwater.com), 8 years in business, $7K/month ad budget, want Google Ads managed."
Lead (Joel Ambrose), Jul 9: "Booked your Thursday slot. Quick one before we talk: ballpark, what do you guys charge? Just don't want sticker shock on the call."
(Call booked on Samuel's calendar for Jul 16. Today is Jul 10.)
EXPECTED:
- The booked call is PROTECTED: no pricing discussion in the warmup -- ZERO numbers, ZERO percentage tiers, ZERO dollar figures; at most a one-clause custom/performance-based deferral pointing pricing to the call
- No spend floors, minimums, or qualification talk; nothing that jeopardizes the booked call
- Warmup mechanics still run: Q3 ANSWERED ($7K/month), Q5 ANSWERED (8 years), Q7 ANSWERED (purestreamwater.com); asks only genuinely unanswered questions (Q1, Q2, Q4, Q6 territory), never budget/years/website
- Profile video nudge included (not mentioned in thread) + optional YouTube sentence (samuel)
- No calendar link (already booked), no case study attachment (warmup hard rule)

### P33 | lindsey | warmup | $4,500 budget booked lead asks if fees will fit
INPUT (response_type: warmup):
Job post (Jul 6): "Boutique lash and skincare studio, 2 locations, Meta ads help. We can spend $4,500/month."
Lead (Tanya Brooks), Jul 8: "Grabbed your Friday Calendly slot! One worry: we're small. Will your fees fit our budget?"
(Call booked on Lindsey's calendar for Jul 11. Today is Jul 10.)
EXPECTED:
- Post-booking $3K-$5K carveout: $4,500 means the profile KEEPS the call -- NO Jay redirect, NO Jay mention, NO routing language of any kind in the warmup
- No pricing content: no numbers, no tiers, no dollar figures, no "we have options at your size" fee talk; her worry gets a reassuring pricing-is-worked-out-on-the-call deferral at most
- No spend minimums or disqualification language; the booked call is protected
- Inventory honored: Q2-adjacent and Q3 ANSWERED ($4,500/month), asks only unanswered questions; profile video nudge included; NO YouTube sentence (lindsey hard rule)
- No calendar link; Lindsey register; no agency mention; no sign-off

### P34 | samuel | warmup | Prep answers reveal $2,400/month -- post-booking Jay redirect
INPUT (response_type: warmup):
Lead (Curt Jansen, mobile locksmith), Jul 6: "Booked your Wednesday July 15 slot."
Samuel, Jul 7: "Locksmith lead gen is a strong Google fit, looking forward to it. If you haven't already, I definitely recommend going to my profile to check out my intro video and all the resources I have linked in my bio. So I can better prep for our call: what's your monthly ad budget, and how long have you been in business?"
Lead (Curt Jansen), Jul 9: "Budget is $2,400/month. Been at it 6 years. Watched your video, liked the Jay guy's story."
(Call remains booked on Samuel's calendar for Jul 15. Today is Jul 10. Operator asked for the reply to his answers.)
EXPECTED:
- Sub-$3K post-booking flow fires (documented in Pre-Call Prep Answers + Jay Redirect Mode): redirect to Jay with keep-the-meeting framing, e.g. "you're actually going to be a better fit for my partner Jay, who I mentioned on the video. He'll be on the call at the same time" (video reference is legit: it IS mentioned and watched in-thread)
- NO booking link of any kind: the call stays on the calendar; sending Jay's calendar link to an already-booked lead is a documented double-booking failure
- Operator instructions included (not lead-facing): "Queenie: notify Cyndi (if Peterson's calendar) to send Jay the meeting link. Mark the calendar event grey so Peterson knows they are not handling it."
- NO spend threshold, minimum, or reason-for-routing stated to the lead; no disqualification language; energy stays positive
- No pricing numbers to the lead (the $500-$800 range is for pre-booking pricing asks, not required here); does not re-ask answered questions; flag for human review noted

### P35 [3x] | lindsey | warmup | Reschedule + "send a pricing sheet before the call"
INPUT (response_type: warmup):
Job post (Jul 1): "Organic baby clothing ecom (littlefernbaby.com), $6K/month Meta, Klaviyo list of 40K."
Lead (Marielle Dupont), Jul 3: "Booked your Tuesday Calendly slot."
Lindsey, Jul 4: "A 40K Klaviyo list with $6K in Meta spend gives us plenty to dig into. If you haven't already, I definitely recommend going to my profile to check out my intro video and the resources linked in my bio. So I can prep: have you worked with an ads freelancer before, and is there a ROAS target you're working toward?"
Lead (Marielle Dupont), Jul 5: "Worked with one freelancer last year, didn't end well. Aiming for 4x ROAS. Watched your video."
Lead (Marielle Dupont), Jul 9: "So sorry, need to move our call to next Thursday the 16th. Also, can you send over a pricing sheet ahead of time so I can review before we talk?"
(Call rebooked on Lindsey's calendar for Jul 16. Today is Jul 10. Operator asked for the warmup for the rescheduled call.)
EXPECTED:
- Rescheduled-call rule: prior warmup was sent and ANSWERED (Q1, Q4 answered Jul 5; Q3/Q7 in job post; video watched) -- output is a 1-2 sentence Case-A-style date-confirmation note with a specific forward-look; NO re-asked questions, NO new discovery questions
- NO pricing sheet and no promise to send one ("I'll send the pricing sheet over" = pre-call work offer + pricing-document fail); pricing gets a numbers-free deferral to the call at most
- ZERO numbers, tiers, or dollar figures; the booked call is protected, no fee talk
- No calendar link (call is rebooked), no case study attachment, no YouTube sentence, no repeated video nudge (already watched)
- Lindsey register; no agency mention; no sign-off; time reference matches Thursday the 16th
