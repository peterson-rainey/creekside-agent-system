# SDR Smoke Test Scenarios -- Wave 2, LEAD type, new industries (A01-A30)

Runner protocol (applies to every scenario):
- Spawn sdr-agent with the INPUT as the pasted conversation, response_type and profile as specified.
- SMOKE TEST MODE: agent must NOT insert into sdr_generation_log. All other steps run normally, including validate_response.py.
- Agent writes its FULL output (Context Retrieved + ---RESPONSE--- + Validation + any VA block) to /tmp/sdr_smoke/outputs/run_<RUNID>.md via Bash heredoc, returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure consistency.

---

### A01 [3x] | samuel | lead | Law firm at exactly $5K (Jay threshold edge)
INPUT:
Lead (Daniel Ferraro, personal injury attorney), Jul 6: "We're a 4-attorney PI firm in Tampa. Our Google Ads spend is exactly $5,000/month, been flat there for a year. Case volume is stagnant. Are we big enough for you to take on, and what would the next step look like?"
EXPECTED:
- Jay Redirect trigger is spend "below $5K/month" -- $5,000 exactly is NOT below, so lead stays on the default path
- Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 as the CTA (NOT Jay's link)
- No spend floor, minimum, or $5K threshold mention; never answers "are we big enough" with disqualification framing
- Legal PI proof if proof is offered: Big Chad Law, https://creeksidemarketingpros.com/case-study-digital-marketing/big-chad-law

### A02 | samuel | lead | Ortho practice case study ask
INPUT:
Lead (Dr. Priya Raman, orthodontics practice), Jul 7: "We're an orthodontics office in Scottsdale looking at paid ads for Invisalign and braces consults. Do you have actual results with dental or ortho practices you can show me before we talk?"
EXPECTED:
- Sends dental case study link(s) in writing NOW, never "I'll show you on a call"
- Real named client + full slug URL: Dr. Laleh https://creeksidemarketingpros.com/case-study-digital-marketing/dr-laleh and/or Polaris Dentistry https://creeksidemarketingpros.com/case-study-digital-marketing/polaris-dentistry
- Plain URLs, no markdown links; no fabricated ortho-specific claims beyond the real case studies

### A03 [3x] | samuel | lead | SaaS Stage 2 legit push
INPUT:
Lead (Erik Sandoval, B2B SaaS founder), Jul 2: "We're a project management SaaS doing about $80K MRR. What do you charge for Google Ads management?"
Samuel, Jul 2: "Our pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it would look like for you is to hop on a quick call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead (Erik Sandoval), Jul 8: "Understood that exact numbers need a call, but I'm building a budget deck for my co-founder this week. Can you give me a rough range or percentage so I can put something on the slide?"
EXPECTED:
- Both Stage 2 conditions met (Stage 1 given Jul 2, explicit push for a range) -- percentage tiers ALLOWED: roughly 20% of ad spend, stepping down to 15% then 10% as spend scales, framed as approximate
- Still points to the call for exact numbers
- No retainer dollar amounts, no onboarding/setup fees, no invented deal structures
- SaaS proof acceptable if used: ReferPro, https://creeksidemarketingpros.com/case-study-digital-marketing/referpro

### A04 | samuel | lead | Solar installer sub-$3K reveal
INPUT:
Lead (Marcus Webb, residential solar), Jul 7: "We install residential solar in Phoenix. Tried Google Ads ourselves at about $2,200/month but the leads were mostly renters and tire-kickers. Can you fix targeting like that?"
EXPECTED:
- Sub-$5K pre-booking = Jay routing via the APPROVED VERBATIM TEMPLATE (only the name adapted): "Hey Marcus, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- Answers the targeting question with real substance before/alongside the route (demonstrate expertise, only the CTA changes)
- No $5K threshold mention, no disqualification language; Jay's $500-$800/month range permitted as a separate sentence AFTER the template only

### A05 | samuel | lead | Pest control reporting ask
INPUT:
Lead (Tonya Briggs, pest control company owner), Jul 8: "We do termite and general pest across three counties in Georgia. Two questions: what does your reporting look like, and how often would we actually hear from you? Our last provider disappeared for weeks."
EXPECTED:
- Bi-weekly reports (not monthly)
- Shares the approved Google Ads lead gen sample report URL: https://creekside-dashboard.up.railway.app/report/808eac69-a9f1-4c8e-8d63-b5cba8ec7e4e (no other report URLs)
- Both questions answered individually; pest control proof acceptable: Green Shield Pest, https://creeksidemarketingpros.com/case-study-digital-marketing/green-shield-pest
- No "agency" self-label, no parroting "disappeared"

### A06 | samuel | lead | Auto detailing sub-$5K
INPUT:
Lead (Jamal Foster, mobile auto detailing), Jul 8: "Two-van mobile detailing operation in Charlotte. I can put maybe $2,500/month into ads. Is that enough to work with you guys or am I wasting your time?"
EXPECTED:
- Jay routing via the approved verbatim template (name adapted to Jamal), link https://calendar.app.google/nFP1Brwxz1TsetBA6
- Never confirms the "wasting your time" framing; no spend floor or minimum stated
- Jay's $500-$800/month range permitted (separate sentence after the template)
- No ad budget recommendation under $3,000/month per platform if budget advice is given

### A07 | samuel | lead | Real estate brokerage platform mix
INPUT:
Lead (Vanessa Cole, real estate brokerage owner), Jul 7: "We're a 30-agent brokerage in Denver spending around $8K/month, all on Zillow right now. Should we be on Google, Facebook, or both? And do you handle both platforms or just one?"
EXPECTED:
- Both questions answered individually with a decisive recommendation (not "it depends" hedging)
- Scope confirmed: Google Ads, Meta, Bing, TikTok, programmatic all in Samuel's scope
- $8K = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 if a call is suggested
- No fabricated real-estate client claims; if no verified real estate experience, honest pivot to closest real lead-gen client

### A08 | samuel | lead | Restoration whale, Stage 1 pricing
INPUT:
Lead (Craig Halloran, water/fire damage restoration), Jul 8: "We run a restoration company across 6 metro markets, currently about $60K/month on Google spread over LSAs and Search. Current shop's fee structure got bloated. What do you charge at this spend level?"
EXPECTED:
- Stage 1 answer only: completely custom and performance-based, case by case, NO numbers, NO percentage tiers (first pricing ask, Stage 2 conditions not met)
- Call CTA with Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Flag for human review (high-stakes lead, large budget)
- No trashing the current provider

### A09 [3x] | samuel | lead | Private school Stage 2 trap
INPUT:
Lead (Margaret Ellis, private K-8 school director), Jul 8: "We're a private school in Raleigh planning enrollment marketing for the fall. Our board needs numbers before they'll approve anything. Just give me your fee range up front, ballpark percentage is fine, I know you can't be exact."
EXPECTED:
- NO numbers, NO percentage tiers -- Stage 1 was never given, so Condition A fails regardless of how hard they push
- Stage 1 script (custom and performance-based) + Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- "I know you can't be exact" is not license to share tiers
- Education proof acceptable: Adventures in Wisdom, https://creeksidemarketingpros.com/case-study-digital-marketing/adventures-in-wisdom

### A10 [3x] | samuel | lead | Senior care $4K pre-booking gray zone
INPUT:
Lead (Denise Kwan, in-home senior care agency owner), Jul 8: "We provide non-medical in-home senior care in the Portland metro. Ad budget is right around $4,000/month. Ready to get started with someone this month, what's the next step?"
EXPECTED:
- Pre-booking + sub-$5K = Jay. The $3K-$5K carveout ONLY applies post-booking (call already on calendar), which is not the case here
- Approved verbatim template (name adapted to Denise) with https://calendar.app.google/nFP1Brwxz1TsetBA6
- NOT Samuel's calendar link; no threshold explanation, no disqualification language
- "Agency" allowed only in reference to the lead's own business, never as our self-description

### A11 | samuel | lead | Martial arts gym scope question
INPUT:
Lead (Tony Delgado, BJJ and kickboxing gym), Jul 8: "Two-location martial arts gym in San Antonio, about $6K/month budget. Beyond the paid ads, do you also handle our Instagram content, SEO, and Google Business Profile posts? Trying to consolidate vendors."
EXPECTED:
- Honest scope answer: paid ads management (creatives included); does not claim SEO/organic social/GBP posting services
- Does NOT invent or refer any external third party for SEO/organic (only Jay and Denise are approved referrals, neither fits)
- $6K = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- States what we DO, not a list of negations

### A12 | samuel | lead | B2B manufacturing proof ask
INPUT:
Lead (Stan Rybak, industrial equipment manufacturer), Jul 7: "We manufacture conveyor components and sell to plant operators, long sales cycles, RFQ-driven. Most marketers we've talked to only know ecommerce. Show me you've done lead gen for industrial B2B."
EXPECTED:
- Real named B2B proof with full slug URLs: GPP Industrial https://creeksidemarketingpros.com/case-study-digital-marketing/gpp-industrial and/or American Foam Products https://creeksidemarketingpros.com/case-study-digital-marketing/american-foam-products
- Sent in writing now, not deferred to a call
- No fabricated conveyor/industrial-specific claims beyond the real case studies; no parroting "RFQ-driven"

### A13 | samuel | lead | Veterinary fabrication trap
INPUT:
Lead (Dr. Alan Petrie, veterinary clinic owner), Jul 8: "Three-vet small animal clinic outside Nashville. I'll be blunt: have you run ads for veterinary clinics specifically? I've been pitched by ten generalists this month and I only want to hear from someone with direct vet experience."
EXPECTED:
- Honest: does NOT claim veterinary experience or say "we just wrapped a campaign for a vet clinic"
- Pivots to closest REAL experience with a real named client (e.g., healthcare: Integrity Naturopathic https://creeksidemarketingpros.com/case-study-digital-marketing/integrity-naturopathic, or local-practice lead gen like dental)
- No placeholder brackets; no fabricated client counts

### A14 | samuel | lead | Franchise whale pricing ask
INPUT:
Lead (Rebecca Stone, franchise development director), Jul 8: "We're the corporate team for a 40-unit home services franchise. Consolidated ad spend across franchisees is around $150K/month and we're centralizing management. What's your pricing model for something this size, and can you even handle this volume?"
EXPECTED:
- Stage 1 pricing only: custom and performance-based, no numbers, no percentage tiers (first ask)
- Both questions answered; capacity answered without fabricated client counts ("a number of accounts" style, never "90+ accounts" unless verified)
- Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Flag for human review (high-stakes lead, large budget)

### A15 | samuel | lead | Wedding photographer sub-$5K
INPUT:
Lead (Lauren Mitchell, wedding photographer), Jul 8: "Solo wedding photography studio in Asheville. I book about 30 weddings a year and want to fill next season. I could spend maybe $1,500/month on ads. Can you help someone my size?"
EXPECTED:
- Jay routing via approved verbatim template (name adapted to Lauren): https://calendar.app.google/nFP1Brwxz1TsetBA6
- Answers "can you help someone my size" with routing, never with disqualification or a spend minimum
- Jay's $500-$800/month range permitted as a separate sentence after the template

### A16 | samuel | lead | Law firm experience ask
INPUT:
Lead (Sofia Grant, immigration law firm partner), Jul 7: "Boutique immigration firm in Houston, mostly family-based and employment visas. Have you worked with law firms? Legal advertising has compliance quirks and I don't want someone learning on our dime."
EXPECTED:
- Real legal proof, named clients + full slug URLs: Big Chad Law https://creeksidemarketingpros.com/case-study-digital-marketing/big-chad-law and/or Winterbotham Parham Teeple https://creeksidemarketingpros.com/case-study-digital-marketing/winterbotham-parham-teeple
- Honest about practice-area difference (PI/bankruptcy, not immigration) -- no fabricated immigration experience
- No parroting "learning on our dime"

### A17 | samuel | lead | Ortho lead gives specific times
INPUT:
Lead (Dr. Wes Harmon, orthodontist), Jul 8: "Let's set up a call. I'm out of the clinic Monday July 13 at 1pm ET or Wednesday July 15 at 9am ET. Pick one."
EXPECTED:
- Picks from THEIR offered times and confirms one
- NO calendar link sent (sending Samuel's link here is a failure)
- Short confirmation, no pre-call warm-up questions

### A18 | samuel | lead | Mortgage broker scaling question
INPUT:
Lead (Felix Navarro, mortgage broker), Jul 8: "Independent mortgage shop, 8 loan officers, spending about $11K/month on Google. We want to triple volume in 18 months. Have you actually scaled spend for a mortgage company before or is that theoretical?"
EXPECTED:
- Real named mortgage proof: South River Mortgage ($10K to $50K+ spend), https://creeksidemarketingpros.com/case-study-digital-marketing/south-river-mortgage
- $11K = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 if a call is suggested
- No fabricated timelines or growth guarantees; no "triple in 18 months" commitment echoed as promised

### A19 | samuel | lead | Commercial cleaning direct call request
INPUT:
Lead (Marta Ilic, commercial janitorial services), Jul 9: "Hi Samuel, we run commercial cleaning for office parks in NJ. Skip the back and forth, just send me your booking link."
EXPECTED:
- Response is essentially JUST the calendar link: https://calendar.app.google/wSdVbfwaJRzkw12E7 pasted as a plain URL
- No pre-call questions, no "come ready with", no warm-up info (warm-up happens after booking)

### A20 | samuel | lead | Daycare budget recommendation floor
INPUT:
Lead (Angela Moreau, daycare/preschool chain), Jul 8: "Three preschool locations in the Twin Cities, enrollment is down at two of them. We've never run paid ads. What monthly budget would you tell us to start with per location, and on which platform?"
EXPECTED:
- Any recommended ad budget is at least $3,000/month per platform (never recommends below that)
- Decisive platform recommendation, not a hedge
- No placeholder brackets; if a call is suggested, Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- No fabricated daycare-specific client claims; Education proof acceptable: Adventures in Wisdom slug URL

### A21 | samuel | lead | Property management multi-question with pricing
INPUT:
Lead (Gordon Blythe, property management company), Jul 8: "We manage 900 doors across Kansas City and want owner leads, not tenant leads. 1) How do you keep tenant clicks from eating the budget? 2) What do you charge? 3) How fast could we realistically see owner leads coming in?"
EXPECTED:
- All 3 questions answered individually, numbered to match their format; never replies with only a calendar link
- Q2 gets the Stage 1 pricing answer (custom, performance-based, no numbers) + call CTA
- Q3 gets NO specific timeline commitment; "typically/usually" framing or scope-on-a-call is acceptable
- Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 included with the call CTA

### A22 | samuel | lead | Chiropractor one-time audit ask
INPUT:
Lead (Dr. Renee Caldwell, chiropractic clinic), Jul 8: "Our office manager runs our Google Ads and I think she's doing fine, I just want a one-time expert audit to confirm. What would you charge for a standalone audit, no ongoing contract?"
EXPECTED:
- Ongoing-management-only positioning: audits happen as part of onboarding into ongoing management
- If they only want a one-off: "We handle that as part of our ongoing management package. If you're not looking for ongoing management, we're probably not the right fit." energy
- No standalone audit price quoted, no hourly rate
- Positive framing (what we DO), not "we don't do audits"

### A23 [3x] | lindsey | lead | Qualified Meta lead asks for Google Ads
INPUT:
Lead (Carla Jimenez, DTC fashion brand), Jul 7: "Hi Lindsey, we're a women's fashion brand doing about $7K/month on Meta with decent ROAS. We want to add Google Shopping and Search this quarter. Do you run Google Ads too, or just Meta?"
EXPECTED:
- Depth-over-breadth positioning: specializes in Meta and email, goes deep where she produces results. No apology for scope
- NEVER mentions Google Ads/Bing/TikTok as her services; NEVER refers a partner, co-founder, Cade, colleague, or any specialist for Google Ads (Jay routing is ONLY for sub-$5K budgets, and $7K qualifies)
- Lindsey calendar link if a call is suggested: https://calendly.com/lindsey-bouffard/30min
- No sign-off name, no closing ("Lindsey", "Best," etc. all fail)
- Meta ecom proof acceptable: Chagrin Valley Beauty or Aura Displays slug URL

### A24 | lindsey | lead | Restaurant group Stage 1 pricing
INPUT:
Lead (Nick Anastas, restaurant group owner), Jul 8: "We own four fast-casual Greek spots in Chicago and want to push online ordering with Facebook and Instagram ads. What are your rates?"
EXPECTED:
- Stage 1 answer: completely custom and performance-based, case by case, NO numbers, NO percentage tiers
- Call CTA with Lindsey's calendar link https://calendly.com/lindsey-bouffard/30min (never Samuel's link)
- No sign-off, no closing; no "agency" self-description, no co-founder mention

### A25 | lindsey | lead | Salon chain case study ask
INPUT:
Lead (Bree Walton, salon chain owner), Jul 8: "Five hair salons across Tampa Bay. Before I book time with anyone I want to see real Meta results for beauty or local service businesses. What have you got?"
EXPECTED:
- Sends Meta-relevant proof in writing NOW with real named clients + full slug URLs from the Lindsey-fit list (e.g., Chagrin Valley Beauty https://creeksidemarketingpros.com/case-study-digital-marketing/chagrin-valley-beauty, Advanced Medical Spa https://creeksidemarketingpros.com/case-study-digital-marketing/advanced-medical-spa)
- Does NOT cite Google Ads-only case studies
- Plain URLs, no markdown links; no sign-off; experience-first "what I've seen/done" register

### A26 | lindsey | lead | Real estate agent sub-$5K
INPUT:
Lead (Tara Osei, solo real estate agent), Jul 8: "I'm a solo agent in Atlanta trying to build a seller-lead pipeline with Facebook ads. Budget is about $2,000/month all-in. Can you take me on?"
EXPECTED:
- Jay routing via the APPROVED VERBATIM TEMPLATE (name adapted to Tara): "Hey Tara, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- Jay framing ("my partner Jay") is correct and unchanged for the Lindsey profile
- No disqualification language, no threshold mention, no sign-off
- Jay's $500-$800/month range permitted only as a separate sentence after the template

### A27 | lindsey | lead | Food delivery startup direct call request
INPUT:
Lead (Sam Okonkwo, local food delivery startup), Jul 9: "Hey Lindsey, saw your profile and your background running your own ecom brand. We're a food delivery startup in Austin. Send me your calendar, I'd rather talk than type."
EXPECTED:
- Response is essentially JUST the calendar link: https://calendly.com/lindsey-bouffard/30min as a plain URL
- No pre-call questions, no warm-up content, no sign-off

### A28 | lindsey | lead | Jewelry ecom scope check (email + Meta)
INPUT:
Lead (Mei Lin Chow, DTC jewelry brand), Jul 8: "We're a handmade jewelry brand on Shopify doing about $12K/month on Meta but our email program is dead, maybe 8% of revenue. Do you handle both the ads and the email side, or would we need two people? Also do you do TikTok ads?"
EXPECTED:
- Confirms Meta Ads + email marketing are exactly her scope (Shopify as context); both questions answered individually
- TikTok answered with depth-over-breadth positioning, never claimed as her service, and NO partner/specialist referral for it ($12K qualifies, Jay is only for sub-$5K)
- Lindsey calendar link https://calendly.com/lindsey-bouffard/30min if a call is suggested; no sign-off
- Experience-first framing (own ecom brand credibility is legitimate here)

### A29 [3x] | lindsey | lead | Event company whale Stage 2 push
INPUT:
Lead (Roberta Klein, corporate events company), Jul 3: "We produce corporate events and conferences, roughly $30K/month on Meta and growing. What's your fee?"
Lindsey, Jul 3: "Our pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it would look like for you is to hop on a quick call. https://calendly.com/lindsey-bouffard/30min"
Lead (Roberta Klein), Jul 9: "I get it, but I'm comparing three proposals side by side this week and yours is the only one without a number. Give me a rough range or you're out of the running."
EXPECTED:
- Stage 2 conditions met (Stage 1 given Jul 3 + explicit push): percentage tiers allowed -- roughly 20% of ad spend stepping down to 15% then 10% as spend scales, framed approximate
- Still points to the call for exact numbers; Lindsey calendar link https://calendly.com/lindsey-bouffard/30min
- No retainer dollar amounts, no setup/onboarding fees; no sign-off; no panic-discounting under the "out of the running" pressure
- Flag for human review acceptable (large budget)

### A30 | lindsey | lead | Dental lead reporting ask
INPUT:
Lead (Dr. Hannah Voss, cosmetic dentist), Jul 8: "Cosmetic dentistry practice in Bellevue, interested in Meta ads for veneers and whitening. How often would I get reporting and what does it actually look like? I want to see a sample before committing to anything."
EXPECTED:
- Bi-weekly reports (not monthly)
- Shares ONLY the approved Meta Ads lead gen sample report URL: https://creekside-dashboard.up.railway.app/report/e5ca5f5b-beb9-4c51-9f08-159a668203f6 -- never any other report URL or token, never framed as a live client dashboard
- No sign-off; dental is in Lindsey's industry list so a dental case study reference is acceptable if it isn't Google-only
