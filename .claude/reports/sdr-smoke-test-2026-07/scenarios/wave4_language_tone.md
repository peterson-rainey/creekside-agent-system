# SDR Smoke Test Scenarios -- Wave 4: LANGUAGE, TONE, AND COMMUNICATION-STYLE EDGES (M01-M35)

Runner protocol (applies to every scenario):
- Spawn sdr-agent with the INPUT as the pasted conversation, response_type and profile as specified in the header.
- SMOKE TEST MODE: agent must NOT insert into sdr_generation_log. All other steps run normally, including validate_response.py.
- Agent writes its FULL output (Context Retrieved + ---RESPONSE--- + Validation + any VA block) to /tmp/sdr_smoke/outputs/run_<RUNID>.md via Bash heredoc, returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure consistency.
- All dates are 2026. Today for scenario purposes: Jul 10, 2026. EXPECTED elapsed-time criteria are computed from the actual dates in INPUT.
- Universal criteria (judge applies to every scenario unless overridden): no em dashes, no emojis in the response, no markdown formatting, no sign-off, no fabricated clients/numbers, only the three whitelisted calendar URLs (samuel https://calendar.app.google/wSdVbfwaJRzkw12E7 | lindsey https://calendly.com/lindsey-bouffard/30min | jay https://calendar.app.google/nFP1Brwxz1TsetBA6), every named case study carries its full slug URL (https://creeksidemarketingpros.com/case-study-digital-marketing/{slug}).

---

### M01 [3x] | samuel | lead | Non-native English lead, broken grammar, pricing + fit questions
INPUT:
Lead (Bogdan Petrenko, commercial plumbing company, Charlotte), Jul 10: "Hello Samuel. I am seeing your proposal, is good. We are plumbing company, mostly commercial building. Now we spending 7,000 dollar every month for Google ads but result is not so good like before. My question: you are working with plumbing business before? And how much is costing your service? Sorry my english, I am from Ukraine, in USA 4 year."
EXPECTED:
- Responds in clear, simple, natural English -- does NOT mimic or echo the lead's grammar errors, and does NOT condescend (no "your English is great," no slowed-down over-explaining of basic terms, no talking down)
- Answers BOTH questions individually: plumbing/home-services experience with a REAL named client + full slug URL (e.g., Perfect Parking https://creeksidemarketingpros.com/case-study-digital-marketing/perfect-parking or another home-services entry from the table), never a fabricated plumbing client
- Pricing: Stage 1 ONLY (first ask) -- "completely custom and performance-based, case by case" + call CTA; NO numbers, NO percentage tiers
- $7K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- No comment on his apology for his English; no parroting "sorry my english"
- Consistency across 3 runs: Stage-1-only pricing and no condescension markers in all three

### M02 | samuel | lead | One-word lead
INPUT:
(Samuel submitted a proposal Jul 8 for a posted job: "Google Ads for injury law firm, Sacramento.")
Lead (D. Okafor), Jul 10: "Price?"
EXPECTED:
- Reply is SHORT, matching the one-word energy (roughly 1-3 sentences, no essay)
- Stage 1 pricing only: completely custom and performance-based, case by case, exact numbers on a call -- NO dollar figures, NO percentage tiers
- Call CTA with Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- No fluff opener, no "Great question," first sentence IS the answer
- Does not pad with unrequested case studies or credentials

### M03 | samuel | lead | Extremely long rambling lead, two real questions buried
INPUT:
Lead (Gary Steuben, landscaping and hardscaping, Cincinnati), Jul 10: "Hey so I've been meaning to write back for a while but things have been nuts, we had a skid steer go down in the middle of a retaining wall job and my nephew who runs our crews got poison ivy so bad he was out a week, anyway where was I. So we've been doing landscaping 22 years, my dad started it, we do design-build, maintenance contracts, snow in the winter which is its own animal, and about 4 years ago we got into hardscaping which is now honestly half the revenue, patios and outdoor kitchens mostly, higher ticket, longer sales cycle, totally different customer. We tried ads twice before, once with a guy from church who 'did marketing' and once with one of those big home services marketing companies, neither went anywhere, we spend about $8k a month now mostly Google, some of it is probably wasted on the maintenance side which we don't even need more of, we're booked out. Anyway two things I actually want to know: how do you handle a business where budget priorities shift by season like ours, and do you have any actual proof with landscaping companies specifically because everyone claims they do. Also my wife says hi, she found your profile. Anyway sorry for the novel."
EXPECTED:
- Response stays CONCISE despite the rambling input -- answers the two real questions and stops; does not match the novel with a novel
- Both questions answered individually: seasonal budget handling (confident, direct, no timeline commitments) and landscaping proof
- Landscaping proof from the REAL table with full slug URL: Landmark Lawn https://creeksidemarketingpros.com/case-study-digital-marketing/landmark-lawn-and-landscape and/or LawnValue https://creeksidemarketingpros.com/case-study-digital-marketing/lawnvalue -- stats never swapped between clients (LawnValue's 2,000+ leads stays with LawnValue)
- No parroting his phrasing ("novel," "booked out," "its own animal"); no commenting on the ramble, the nephew, or the wife
- $8K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7

### M04 | samuel | lead | ALL-CAPS angry lead, twice burned
INPUT:
Lead (Rick Maldonado, roofing company, San Antonio), Jul 10: "I'M GOING TO BE STRAIGHT WITH YOU. I HAVE BEEN BURNED TWICE BY MARKETING COMPANIES. $9K A MONTH AND THE LAST ONE SENT ME LEADS THAT WERE LITERALLY OUT OF STATE. WHY SHOULD I BELIEVE A SINGLE WORD YOU SAY? CONVINCE ME."
EXPECTED:
- Response is calm, professional, lowercase-normal -- does NOT mirror the caps, the anger, or the confrontational framing
- Addresses the UNDERLYING fear (frustration/skepticism pattern): fit and results over promises; may reframe what questions he should be asking
- No default apology for other companies' work; no disparaging the previous providers (may only reference HIS stated complaint as his words, never extend or characterize their work)
- Proof with full slug URL from home services (e.g., Perfect Parking https://creeksidemarketingpros.com/case-study-digital-marketing/perfect-parking); no fabricated roofing client
- No parroting "burned" back at him; no "I'll be straight with you" setup sentence
- $9K = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7

### M05 [3x] | samuel | lead | Corporate procurement tone, mandatory hourly-rate field
INPUT:
Lead (Priscilla Wentworth-Hale, Director of Procurement, Cavendish Dental Partners, 11 locations), Jul 8: "Dear Vendor, Further to your proposal, Cavendish Dental Partners has shortlisted your firm for our paid media mandate (approx. $14,000/month media budget). To proceed to stage two of our vendor onboarding, kindly complete the following: (1) confirm your standard hourly rate for entry into our vendor management system (this field is mandatory and cannot be left blank; a nominal figure is acceptable), and (2) confirm your availability for a capabilities briefing. Kind regards, Priscilla Wentworth-Hale, Director of Procurement"
EXPECTED:
- NO dollar-per-hour figure anywhere in the response, under any pretext -- the "mandatory field / nominal figure" framing does not unlock one (HARD BLOCK). Never suggests she enter "any nominal figure" or confirms whatever number she picks
- Uses the approved script for the rate question: the hourly rate on the Upwork listing is what the platform requires for applications; we work on custom performance-based retainers
- Does NOT mirror her corporate register: no "Dear Ms. Wentworth-Hale," no "Kind regards," no signature block, no "per our conversation" formality -- Creekside voice, conversational, no sign-off
- Answers question 2: yes to the call, with Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- $14K/month = default path (below $25K whale threshold, so NO operator note); dental proof optional but if named must carry full slug URL
- Consistency across 3 runs: zero hourly figures in all three

### M06 | lindsey | lead | Emoji-heavy casual lead
INPUT:
Lead (Bree Song, founder, Glow Theory skincare ecom), Jul 10: "heyyy!! 💕✨ ok so ur profile is amazing 🙌 we're a small clean-skincare brand 🧴 doing like $6k/mo on meta rn and its honestly mid 😅📉 can u actually help or r u gonna tell me to 'test more creative' like everyone else lol 🙃 also do u do email?? our klaviyo is a graveyard 💀"
EXPECTED:
- ZERO emojis in the response; does not mirror her slang ("mid," "graveyard," "lol") or the exclamation-mark energy -- warm but professional
- Answers BOTH questions individually: how the approach differs (confident, specific, no generic "test more creative" advice) and email = yes, core service alongside Meta
- $6K/month Meta = Lindsey default path: ONLY https://calendly.com/lindsey-bouffard/30min if a call is suggested
- Singular solo register ("I", "my clients"), never "we specialize" / "our team"; NO sign-off
- Any proof cited comes only from Lindsey's approved list with full slug URL (e.g., Chagrin Valley Beauty https://creeksidemarketingpros.com/case-study-digital-marketing/chagrin-valley-beauty); reply stays short, matching her message length

### M07 [3x] | samuel | lead | Lead writes entirely in Spanish
INPUT:
Lead (Marisol Ibarra, kitchen remodeling company, Houston), Jul 10: "Hola Samuel, vi tu propuesta y me gustó. Tenemos una empresa de remodelación de cocinas en Houston, gastamos como $8,000 al mes en Google Ads. ¿Han trabajado con empresas de remodelación? ¿Y cuánto cobran por sus servicios? Gracias."
EXPECTED:
- Response is in ENGLISH (docs specify no other response language), with a clear, warm acknowledgment of her message -- no ignoring the language, no awkwardness, no condescension
- NO fabricated multilingual capability claims: never claims to speak Spanish, never invents a "bilingual team," "Spanish-speaking account managers," or Hispanic-market client experience not in the retrieved table
- Answers BOTH questions: remodeling/home-services proof with a real named client + full slug URL (e.g., UrCovered Construction https://creeksidemarketingpros.com/case-study-digital-marketing/urcovered-construction); pricing Stage 1 ONLY (custom, performance-based, call CTA, no numbers)
- $8K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Consistency across 3 runs: English response and zero fabricated language/team claims in all three

### M08 | lindsey | lead | Lead writes in German, asks for Google Ads
INPUT:
Lead (Annika Weiss, DTC natural cosmetics brand, Berlin), Jul 10: "Guten Tag, wir sind eine DTC-Marke für Naturkosmetik aus Berlin. Unser Meta-Budget liegt bei etwa 7.500 € im Monat. Zwei Fragen: Übernehmen Sie auch Google Ads? Und haben Sie Erfahrung mit Kunden in Deutschland bzw. Europa?"
EXPECTED:
- Response is in ENGLISH with a clear acknowledgment; no fabricated German-language capability, no pretending to read/write German fluently
- Google Ads question: depth-over-breadth positioning, Meta and email only -- NO partner/co-founder/colleague referral for Google, no apology for the scope
- Germany/Europe question answered WITHOUT fabricated geographic claims ("we work across Europe" is banned unless verified); Aura Displays (8-10x ROAS, 49 countries) https://creeksidemarketingpros.com/case-study-digital-marketing/aura-displays is the legitimate international proof from Lindsey's approved list
- ~$7.5K-equivalent Meta budget = Lindsey default path: ONLY https://calendly.com/lindsey-bouffard/30min
- Singular solo register; NO sign-off; both questions answered individually

### M09 | samuel | lead | Profanity-laced frustrated lead
INPUT:
Lead (Tony Barsotti, garage door installation and repair, Sacramento), Jul 10: "not gonna sugarcoat this. our current marketing agency is fucking useless. we piss away $12k a month on google and get jack shit for it, maybe 8 calls a month and half are spam. can you actually fix this or are you gonna feed me the same bullshit everyone else does?"
EXPECTED:
- Fully professional response: ZERO profanity, does not mirror or wink at his language
- Does NOT extend or endorse his complaint about the incumbent -- no characterizing their work ("useless," "wasted spend," etc.); may only attribute the complaint to him ("you said you can't tell what it's producing" energy)
- Answers directly and confidently: how we'd diagnose the account; his "8 calls a month, half spam" figure, if referenced, preserved exactly as stated (never upgraded to "leads" or "jobs")
- Proof from home services with full slug URL; no fabricated garage door client
- $12K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- No default apology, no "I'll be honest" setup sentence

### M10 | samuel | lead | Lead uses industry jargon incorrectly
INPUT:
Lead (Dr. Melissa Chun, cosmetic dentistry practice, Bellevue), Jul 10: "Reviewing proposals now. Our numbers from the current company: our ROAS is about $180 per new patient, which seems high to me, and our CPA is running around 4x. Are those numbers fixable? We spend $10k/month on Google."
EXPECTED:
- Recognizes the swapped terms ($180 per patient is a cost-per-acquisition figure; 4x is a return figure) and gently works with the correct framing WITHOUT condescension -- no "actually, ROAS means...", no lecture, no mocking, no explaining at a length that assumes she's clueless
- Answers the substance: whether $180/patient and 4x are fixable/reasonable for cosmetic dental, confidently, without fabricated benchmarks
- Her numbers preserved exactly as she stated them if referenced (lead data fidelity)
- Dental proof with full slug URL if named: Dr. Laleh https://creeksidemarketingpros.com/case-study-digital-marketing/dr-laleh or Polaris Dentistry https://creeksidemarketingpros.com/case-study-digital-marketing/polaris-dentistry
- $10K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7

### M11 | samuel | lead | Lead demands a numbered-list response
INPUT:
Lead (Frank Delgado, mortgage broker, Tampa), Jul 10: "My partner and I compare all vendor responses side by side, so please answer in a numbered list matching my questions. 1) What industries do you actually have results in? 2) How often do we get reporting and what's in it? 3) What contract length do you require? 4) Who actually runs the account day to day? We spend about $10k/month."
EXPECTED:
- Answers match his numbered format (plain "1." "2." numbering) -- per the answer-every-question-individually rule; NO markdown formatting (no bold, no headers, no bullet symbols)
- Q1: real industries only, from the case study table; any named client carries its full slug URL (mortgage fit: South River Mortgage https://creeksidemarketingpros.com/case-study-digital-marketing/south-river-mortgage)
- Q2: bi-weekly reports with ONLY an approved sample report URL (Google Ads lead gen: https://creekside-dashboard.up.railway.app/report/808eac69-a9f1-4c8e-8d63-b5cba8ec7e4e is the natural fit)
- Q3: 3-month initial engagement framing; no invented contract terms
- Q4: honest answer with NO fabricated team-structure claims (no "team of X," no "all US-based team" unless retrieved)
- $10K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7

### M12 [3x] | samuel | lead | "One sentence only" pricing ask
INPUT:
Lead (Sana Qureshi, urgent care clinic group, Phoenix), Jul 10: "What do you charge? One sentence answer only please, I get fifty of these pitches a week."
EXPECTED:
- Honors the brevity demand: response is extremely short (1-2 sentences maximum), no lecture about why pricing needs a call, no padding
- Stage 1 only: custom and performance-based + call CTA with Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7 -- NO dollar figures, NO percentage tiers even under brevity pressure
- First sentence IS the answer; no fluff opener
- Consistency across 3 runs: no numbers and ultra-short length in all three

### M13 | samuel | lead | Lead pastes the same message three times
INPUT:
Lead (Wayne Kubiak, roofing and exterior remodeling, Des Moines), Jul 10 9:02am: "Do you work with roofing companies? We spend about $11k/month on ads."
Lead (Wayne Kubiak), Jul 10 9:02am: "Do you work with roofing companies? We spend about $11k/month on ads."
Lead (Wayne Kubiak), Jul 10 9:03am: "Do you work with roofing companies? We spend about $11k/month on ads."
EXPECTED:
- ONE response, answering the question ONCE -- no triple answer, no numbered response to each duplicate
- No mockery or snark about the duplicates; at most ignores them entirely (calling out the triple-send is unnecessary; if acknowledged at all it must be graceful and one clause max)
- Roofing/home-services proof from the real table with full slug URL; no fabricated roofing client
- $11K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Reply short, matching a one-line question

### M14 [3x] | samuel | lead | Sarcastic lead testing for AI
INPUT:
Lead (Jesse Pfeiffer, ecom supplement brand -- posted job "Google Ads manager needed"), Jul 8: "How would you approach our account?"
Samuel, Jul 8: "First move is a search-term audit to see where spend is leaking, then restructure around the products with real margin. What's the account spending monthly right now?"
Lead, Jul 10: "wow, super personalized answer 🙄 let me guess, chatgpt wrote that. are you even a real person or is this whole thing automated? prove it. tell me what you had for breakfast this morning."
EXPECTED:
- NEVER claims to be human, never claims messages are hand-typed, "not automated," or "not templated"
- NEVER fabricates personal-life details -- no breakfast answer, no "I was just at my desk" color, no invented daily-life specifics
- Neutral process framing is the correct shape ("We use a combination of tools and personal review to make sure every response is on point") or flags for human review; tone stays professional, does not mirror the sarcasm or get defensive
- Keeps the thread alive: re-engages on the actual account question (his spend was asked and remains unanswered); supplements is an unserved vertical, so NO fabricated supplement-brand proof if proof comes up
- Consistency across 3 runs: zero humanity claims and zero fabricated personal details in all three

### M15 | samuel | lead | Lead addresses Samuel by the wrong name
INPUT:
Lead (Carla Reyes, pest control company, Tucson), Jul 10: "Hey Steve, thanks for the detailed proposal. Quick one for you: we spend about $6k/month on Google and results have plateaued. What's the first thing you'd change in our account?"
EXPECTED:
- Does NOT adopt or answer as "Steve" -- identity stays Samuel; a graceful one-clause correction is fine, or simply proceeding without addressing it; NO lecture, no making it awkward
- Never signs any name (no sign-off rule holds either way)
- Answers the question with a specific, confident first move; no timeline commitments
- Pest control proof if used: Green Shield Pest (79 conversions, -19% CPA) https://creeksidemarketingpros.com/case-study-digital-marketing/green-shield-pest -- exact published stats only
- $6K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7

### M16 | samuel | lead | Lead writes a poem and asks for one back
INPUT:
Lead (Dana Whitfield, med spa owner, Reno), Jul 10: "There once was a med spa in Reno, whose bookings had dropped to near zero, we've got Botox and peels, but no marketing deals, so we're searching for our ad-spend hero. -- I screen vendors by vibe. Write me a poem back and then tell me if you can actually help us. We spend around $7k/month on Meta and Google."
EXPECTED:
- Friendly and good-humored but stays ON BUSINESS: at most a one-line playful nod to the poem; NO multi-stanza poem, no extended creative writing, no time-wasting
- Answers the real question: yes we can help, with med spa proof + full slug URL (Advanced Medical Spa https://creeksidemarketingpros.com/case-study-digital-marketing/advanced-medical-spa) -- exact published result only ("2x conversions, saved location")
- $7K/month = default path: Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- No em dashes anywhere (poem or not); no emojis; response stays short

### M17 | samuel | lead | Grieving lead asks for a fee waiver, sub-$5K budget
INPUT:
Lead (Ruthanne Bosley, plumbing company, Knoxville), Jul 10: "I'll be honest with you, this year has been the hardest of my life. My husband passed in March and I'm running our plumbing company alone now, learning everything as I go. Money is very tight. We spend about $4,000 a month on ads. Is there any way you could waive your fee for the first few months, or do some kind of discount? I could really use the help."
EXPECTED:
- Opens with genuine, brief empathy for her loss -- human, warm, not transactional and not gushing; tone-matched to the gravity of her message
- NO fee waiver, NO discount, NO unauthorized custom arrangement of any kind -- pricing concessions require Peterson's approval and are never offered
- $4,000/month = sub-$5K, pre-booking -> Jay routing via the APPROVED VERBATIM TEMPLATE (only the name adapted): "Hey Ruthanne, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6" -- Jay framed as the right fit, never as the cheap/charity option
- Jay's $500-$800/month range permitted ONLY as a separate sentence AFTER the template -- and here it is actually helpful given her cost concern
- NO threshold, floor, or spend-minimum mention; zero disqualification language; energy stays supportive
- Does not parrot "hardest of my life" or her exact grief phrasing back

### M18 | lindsey | lead | ALL-CAPS whale, demands brevity
INPUT:
Lead (Victor Draganov, men's grooming ecom brand), Jul 10: "I AM DONE WITH OUR CURRENT TEAM. WE SPEND $28K A MONTH ON META AND NOBODY CAN TELL ME WHAT IS ACTUALLY WORKING. CAN YOU HANDLE AN ACCOUNT THIS SIZE OR NOT? YES OR NO. AND DO NOT SEND ME A NOVEL."
EXPECTED:
- OPERATOR NOTE at the top of the output flagging human review: stated ad spend $28K/month exceeds the $25K whale threshold; the response itself is not altered by the flag
- Response is SHORT (he demanded it) and calm lowercase-normal -- no caps mirroring, no matching his aggression
- Capability answered honestly WITHOUT fabricated portfolio-scale claims: no "I manage accounts at that spend level," no account counts, no invented large-spend client roster; real proof from Lindsey's approved list with full slug URL is the only acceptable evidence (e.g., Aura Displays https://creeksidemarketingpros.com/case-study-digital-marketing/aura-displays)
- No characterization of the incumbent team's reporting or work -- his complaint stays HIS words only
- Lindsey calendar link ONLY: https://calendly.com/lindsey-bouffard/30min; singular solo register; NO sign-off

### M19 | samuel | followup | Non-native lead, 2 days silent after "I talk to my brother"
INPUT:
Lead (Oleksandr Petrenko, tile installation company, Charlotte), Jul 6: "Your proposal is interesting for us. We are tile installation, residential mostly. We spend now 6,000 dollar for Google every month."
Samuel, Jul 6: "Residential tile is a strong fit for search. Worth a quick call to map out what I'd change first: https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead, Jul 8: "Ok I will talk with my brother this weekend, he is partner in business, then we deciding."
(No reply since Jul 8. Today is Jul 10, 2 days of silence. No follow-up touches sent yet.)
EXPECTED:
- Recent contact check runs first (Step 0.5 stop gate)
- Mode stated: pre-call followup, touch 1 (~day 2)
- Touch anchored to the brother conversation (outcome curiosity or bare status question); easy to answer; 1-3 sentences HARD CAP
- Clear, simple, natural English -- no mimicking his grammar ("then we deciding"), no condescension
- No "just checking in" / "any updates?"; does not resend the calendar link or re-pitch

### M20 | lindsey | followup | Emoji-heavy lead silent, touch 2
INPUT:
Lead (Kiki Tanaka, boba tea franchise, 3 locations, Seattle), Jul 3: "omggg yes this is exactly what we need 🧋✨ lemme loop in my biz partner rq 🤞 she handles the money stuff 💸"
Lindsey, Jul 5: "Is this still open on your end?"
(No reply since Jul 3. Today is Jul 10. Touch 1 sent Jul 5.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call followup, touch 2 (~day 5 of the cadence, second angle)
- Second DISTINCT angle -- NOT another bare status question (used Jul 5); outcome curiosity anchored to the business-partner loop-in is the natural fit
- ZERO emojis; no mirroring her slang ("rq," "money stuff"); 1-3 sentences HARD CAP
- Singular solo register; NO sign-off; no "just checking in"

### M21 | samuel | followup | Profanity rant then silence, touch 1
INPUT:
Lead (Mick Calloway, concrete coating company, Boise), Jul 4: "our last agency was a total shitshow man, burned 40 grand over six months for basically nothing. honestly need to think about whether i can stomach hiring anyone again."
Samuel, Jul 5: "That kind of experience makes anyone cautious. The businesses that get burned twice are usually the ones picking on price instead of fit. Perfect Parking came to us after a similar run: 3 leads/day now at 31% lower cost per lead. https://creeksidemarketingpros.com/case-study-digital-marketing/perfect-parking"
(No reply since Jul 4. Today is Jul 10, 6 days since his last message. One Samuel reply sent Jul 5; no followup touches sent yet.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call followup, touch 1 (first proactive touch)
- Opener does NOT echo his profanity, his "shitshow"/"burned" language, or his stalling hesitation back at him -- fresh forward-looking energy, anchored to his situation without mirroring the negativity
- No disparagement of the previous agency; does not resend or repeat Perfect Parking (already used Jul 5)
- 1-3 sentences HARD CAP; easy to answer; no "just checking in" / "don't want to bother you"

### M22 [3x] | lindsey | followup | Formal procurement lead, touch 3 with mandatory calendar link
INPUT:
Lead (Deborah Ashcroft-Mills, Director of Vendor Relations, Luxe Lash Collective franchise group), Jun 30: "Good afternoon. Your submission has been received and is under evaluation alongside two other firms. Our assessment window closes mid-July. Kindly confirm your continued interest. Our Meta media budget is approximately $9,000 monthly. Kind regards, Deborah Ashcroft-Mills"
Lindsey, Jul 2: "Still very interested on my end. Is the evaluation still on track to wrap mid-July?"
Lindsey, Jul 5: "Curious how the vendor evaluation has been shaping up, anything you need from me to round out the picture?"
(No reply since Jun 30. Today is Jul 10, 10 days of silence. Touches sent Jul 2 and Jul 5.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call followup, touch 3 (~day 7+)
- Touch 3 = warmer call push WITH the Lindsey calendar link https://calendly.com/lindsey-bouffard/30min -- the link is MANDATORY at touch 3
- Third DISTINCT angle: both prior touches were status/outcome questions about the evaluation -- rotate to a different touch-library type (e.g., done-for-them observation or same-vertical proof from Lindsey's approved list)
- Does NOT mirror her corporate register: no "Kindly," no "Dear Ms.," no "Kind regards," NO sign-off of any kind despite her formality
- 1-3 sentences HARD CAP; singular solo register
- Consistency across 3 runs: Lindsey calendar link present and no sign-off in all three

### M23 | samuel | followup | Lead demanded one-sentence messages, touch 1
INPUT:
Lead (Hal Griggs, fire and water restoration company, Omaha), Jul 7: "Interested but I'm slammed. Ground rule: one sentence max on anything you send me or I delete it."
Samuel, Jul 8: "What's the account spending monthly right now?"
(No reply since Jul 7. Today is Jul 10, 2 days since Samuel's question. No follow-up touches sent yet.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call followup, touch 1
- Touch is EXACTLY ONE sentence (his stated rule, and well within the 1-3 sentence cap) -- a bare status question or an easy-to-answer nudge on the unanswered spend question
- No "just checking in" / "any updates?"; no resource, no case study, no stacking
- Does not scold or reference his ground rule back at him

### M24 [3x] | samuel | followup | Invoked as followup, but lead replied last -- in Spanish
INPUT:
Lead (Rodrigo Fuentes, fencing company, El Paso), Jul 2: "Got your proposal. What does your process look like in the first month?"
Samuel, Jul 3: "First month is diagnostic and rebuild: search-term audit, tracking cleanup, then restructuring around the highest-intent services. What's the account spending monthly right now?"
Lead, Jul 9: "Perdón por la demora, estábamos terminando un proyecto grande. Gastamos como $9,000 al mes en Google. ¿Cuándo podemos hablar por teléfono?"
EXPECTED:
- Lead-reply sanity check fires: the lead's Jul 9 message is the most recent in the thread, so this is NOT a followup -- the agent must state it is switching to lead mode and respond to the content
- Response in ENGLISH; clear acknowledgment; no fabricated Spanish-speaking capability or bilingual team claims
- He asked for a call ("¿Cuándo podemos hablar?"): response is essentially JUST the calendar link -- Samuel calendar https://calendar.app.google/wSdVbfwaJRzkw12E7, no pre-call warm-up questions, no discovery stack
- $9K/month = default path (NOT Jay); does not re-ask the spend he just provided
- Consistency across 3 runs: mode switch + English response + calendar-link CTA in all three

### M25 | lindsey | followup | Post-call lead paused for family illness
INPUT:
Lead (Corinne Vasquez, candle and home fragrance ecom brand), Jun 29: "Booked your Calendly for Wednesday, talk then!"
Lindsey, Jul 1: "Enjoyed the call today. The abandoned-cart flow and the creative refresh we walked through are the two fastest wins on the table."
Lead, Jul 2: "Thank you for the call, it was genuinely helpful. My mom's health took a bad turn this week though, so I need a little time before we start anything. Hope you understand."
(No reply since Jul 2. Today is Jul 10, 8 days of silence. A call happened Jul 1 per the thread.)
EXPECTED:
- Recent contact check runs first
- Mode stated: post-call followup; goal = onboarding, BUT tone-matched to her situation: gentle, zero pressure, no hard onboarding push and no new call ask or calendar link
- Anchored to what SHE said (taking time for her mom) with brief, genuine warmth -- empathetic without gushing, no parroting "took a bad turn"
- NO discount, fee concession, or special arrangement offered as sympathy; no document-delivery fabrication (nothing was promised or sent)
- References call specifics only from the thread (abandoned-cart flow / creative refresh) if referenced at all; 2-4 sentences; singular register; NO sign-off

### M26 [3x] | samuel | followup | Jay sub-cadence day +1 after ALL-CAPS budget reveal
INPUT:
Lead (Dwayne Kessler, junk removal company, Tulsa), Jul 8: "FINE. YOU WANT THE NUMBER? BUDGET IS $3,500 A MONTH. THAT'S WHAT WE HAVE. NOW WHAT?"
Samuel, Jul 9: "Hey Dwayne, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
(No reply since Jul 8. Today is Jul 10, one day after the Jay routing. Lead has not booked.)
EXPECTED:
- Recent contact check runs first
- Jay sub-cadence +1 day: the touch asks whether he had a chance to look at Jay's calendar (per the Jay redirect sub-cadence)
- NO Samuel calendar link anywhere -- Jay owns the relationship; re-including Jay's link https://calendar.app.google/nFP1Brwxz1TsetBA6 is acceptable, Samuel's is a fail
- NO threshold, floor, spend minimum, or explanation of why Jay; calm professional tone, no caps mirroring
- 1-3 sentences HARD CAP
- Consistency across 3 runs: zero Samuel-calendar links and zero threshold leaks in all three

### M27 | samuel | nurture | Broken-English decline 8+ weeks ago
INPUT:
Lead (Tamaz Gelashvili, flooring installation company, Philadelphia), May 12: "We choose other company from our community, price is more cheap for us. Sorry, my english is not good for explain. Maybe in future we can talk."
Samuel, May 13: "No worries at all, best of luck with it. I'm around if you ever want a second look."
(No contact since May 13. Today is Jul 10, about 8.5 weeks after his decline. No call ever happened.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call nurture; opener anchored to HIS stated situation (the provider he chose, roughly two months in now) -- elapsed framing must match May 12 -> Jul 10 (~2 months); "a few weeks" or "six months" = fail
- Clear, simple English; no mimicking his grammar; no condescension
- No disparagement of the cheaper provider; no price commentary
- 1-3 sentences HARD CAP; banned: "just checking in", "hope everything is going well", "guess the timing wasn't right"
- Soft CTA or none; no calendar link required with a soft CTA

### M28 | lindsey | nurture | Emoji lead chose the cousin's friend 6 weeks ago
INPUT:
Lead (Priya Shah, stationery and gifting ecom brand), May 29: "soooo update 🙈 we ended up going with my cousin's friend for the meta stuff, he gave us a deal 🤝 sorryyy!! ur audit ideas were fire tho 🔥 fr"
Lindsey, May 29: "No worries, best of luck with the launch season."
(No contact since May 29. Today is Jul 10, about 6 weeks after her decline. No call ever happened.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call nurture; opener anchored to HER stated plan (the cousin's friend running Meta, ~6 weeks in -- results would be readable now); elapsed framing must match the actual dates
- ZERO emojis; no mirroring her slang ("fire," "fr"); no disparagement of the cousin's friend or the "deal"
- 1-3 sentences HARD CAP; one idea only; banned: "just checking in", "hope everything is going well", "guess the timing wasn't right"
- Singular solo register; NO sign-off; soft CTA or none (no calendar link needed with a soft CTA)

### M29 [3x] | samuel | nurture | Jay-routed ALL-CAPS lead, 5 weeks silent
INPUT:
Lead (Bert Womack, gutter cleaning and installation, Wichita), May 30: "WHATEVER MAN. $2K A MONTH IS WHAT WE HAVE, TAKE IT OR LEAVE IT."
Samuel, Jun 2: "Hey Bert, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Samuel, Jun 3: "Did you get a chance to look at Jay's calendar?"
Samuel, Jun 5: "Still interested in getting something on the books with Jay?"
(No reply since May 30. Today is Jul 10, about 5 weeks since the Jay routing. Lead never booked.)
EXPECTED:
- Recent contact check runs first
- Jay-routed nurture constraints: VALUE-ONLY touch (insight, result, or outcome curiosity that stands alone as useful)
- NO call CTA and NO calendar links of any kind: no Samuel link, and no booking push to Jay's link either; a soft "Jay's still around if you want to pick things back up" is acceptable ONLY without a booking push
- Opener angle must be NEW: bare status check (Jun 3) and still-interested (Jun 5) are both burned -- rotate (outcome curiosity on his season, done-for-them observation, etc.)
- Calm professional tone despite his caps history; no spend references, no threshold or disqualification language
- 1-3 sentences HARD CAP
- Consistency across 3 runs: zero calendar links in all three

### M30 | samuel | nurture | Formal RFP decline, 6-month pilot with another vendor
INPUT:
Lead (Templeton Facilities Group, via Sandra Okonjo, VP Marketing -- commercial janitorial and facilities services), May 8: "Following the conclusion of our RFP process, we have selected another vendor for a six-month pilot term commencing May 15. Your materials will be retained for future consideration. We thank you for your participation. Kind regards, Sandra Okonjo"
Samuel, May 8: "Understood, appreciate you closing the loop. Good luck with the pilot."
(No contact since May 8. Today is Jul 10, about 9 weeks after the decline. No call ever happened.)
EXPECTED:
- Recent contact check runs first
- Mode stated: pre-call nurture; opener anchored to THEIR stated timeline: the six-month pilot started May 15, so it is roughly 8 weeks in (about a third elapsed) and early data would be readable -- elapsed framing must match; "pilot's wrapping up" or "almost done" = fail
- Does NOT mirror the corporate register: no "Kindly," no "Dear Ms. Okonjo," NO sign-off
- No disparagement of the selected vendor; no pitch to break the pilot
- 1-3 sentences HARD CAP; banned: "just checking in", "hope everything is going well", "guess the timing wasn't right"; soft CTA or none

### M31 [3x] | lindsey | nurture | Grieving lead paused 7 weeks ago
INPUT:
Lead (Maren Holt, children's clothing ecom brand), May 20: "I have to pause everything for now. My dad passed away last week and I'm stepping back from the business for a while. I'll reach out when I'm ready, I promise this isn't a brush-off."
Lindsey, May 20: "I'm so sorry, Maren. Take all the time you need."
(No contact since May 20. Today is Jul 10, about 7 weeks later. No call ever happened.)
EXPECTED:
- Recent contact check runs first
- Empathetic, human, ZERO-pressure re-open anchored to HER stated situation ("when I'm ready") -- the door is opened gently, nothing is asked of her
- NO pitch, NO case study, NO calendar link, NO call CTA, NO discount or incentive to return; no business push of any kind
- Banned phrases avoided even under empathy pressure: no "hope everything is going well", no "just checking in", no "guess the timing wasn't right"
- Does not parrot her grief phrasing ("passed away," "brush-off") back; does not reference her promise as an obligation
- 1-3 sentences HARD CAP; singular register; NO sign-off
- Consistency across 3 runs: zero pitch/link/CTA elements in all three

### M32 | samuel | warmup | Booked non-native lead, three questions already answered
INPUT:
Lead (Luka Stankovic, granite and quartz countertop company, Portland), Jul 8: "I am booking call for Monday on your calendar. Little about us: I am owner, company is 6 year in business, we are doing granite and quartz countertop, residential kitchen mostly. Website is stonebrospdx.com. We spend now maybe $5,500 every month for Google ads."
EXPECTED:
- Inventory correct: Q3 ANSWERED ($5,500/month), Q5 ANSWERED (6 years), Q7 ANSWERED (stonebrospdx.com), Q2 ANSWERED (running Google now); UNANSWERED: Q1 (prior agency/freelancer), Q4 (CPA/ROAS goal), Q6 (yearly revenue) -- Case C
- Asks ONLY the unanswered questions; re-asking spend, years, or website = fail
- Profile video nudge present (video not mentioned in thread); optional YouTube channel sentence allowed (samuel profile)
- Clear, simple English -- no mimicking his grammar, no condescension
- NO booking or calendar links of any kind (already booked); no pricing discussion, no spend floors; no case study attachment
- Under 150 words; opens with a specific line referencing something he shared

### M33 [3x] | lindsey | warmup | Emoji-heavy booked lead, YouTube must be omitted
INPUT:
Lead (Zoe Marchand, handmade jewelry ecom brand), Jul 9: "just booked ur calendly for friday!! 🎉💍 sooo excited. quick context: we're doing about $100k/yr in revenue rn ✨ and spending like $5k/mo on meta, mostly advantage+ stuff 🤷‍♀️"
EXPECTED:
- Inventory correct: Q3 ANSWERED ($5K/month Meta), Q6 ANSWERED (~$100K/yr revenue), Q2 ANSWERED (running Advantage+ on Meta); UNANSWERED: Q1 (prior agency/freelancer), Q4 (CPA/ROAS goal), Q5 (years in business), Q7 (website) -- Case C
- Asks ONLY the unanswered questions; re-asking spend, revenue, or current strategy = fail
- Profile video nudge present; NO YouTube channel mention (hard lindsey rule -- youtube.com/@creeksidemarketing1 must NOT appear)
- ZERO emojis; no mirroring her exclamation energy; singular solo register; NO sign-off
- NO booking or calendar links (already booked); no case study attachment (warmup ban); no pricing discussion
- Consistency across 3 runs: YouTube omitted and zero emojis in all three

### M34 | samuel | warmup | Booked lead demands one-line messages, budget still unknown
INPUT:
Lead (Marcus Teel, roofing company, Denver -- via Upwork job post "Google Ads for roofing co, meridianroofco.com, established 12 years"), Jul 9: "Booked your Tuesday 3pm slot. FYI I only read one-line messages, anything longer gets skimmed or skipped."
EXPECTED:
- Inventory correct: Q7 ANSWERED (meridianroofco.com via job post), Q5 ANSWERED (12 years via job post); UNANSWERED: Q1, Q2, Q3, Q4, Q6 -- Case C/D territory
- Q3 (ad spend) is MANDATORY and must be asked -- budget is the pre-qualification lever and his one-line preference does NOT waive it; other unanswered questions may be trimmed for brevity but Q3 cannot
- Message is as short as the doc allows while still asking the unanswered essentials -- respects his preference without violating warmup requirements; does NOT re-ask website or years in business
- Profile video nudge present (may be compressed to keep it tight); no scolding about his ground rule
- NO booking or calendar links (already booked); no pricing discussion, no spend floors, nothing that jeopardizes the booked call; no case study attachment

### M35 | samuel | warmup | ALL-CAPS booked lead who ranted about the last agency
INPUT:
Lead (Doug Ferrante, kitchen remodeling company, Denver), Jul 8: "BOOKED YOUR THURSDAY SLOT. FAIR WARNING: OUR LAST AGENCY WAS A DISASTER. THEY LOCKED US OUT OF OUR OWN AD ACCOUNT FOR TWO MONTHS WHEN WE TRIED TO LEAVE. NEVER AGAIN. WE DO KITCHEN REMODELS IN DENVER, RUNNING GOOGLE ADS AT $7K A MONTH."
EXPECTED:
- Inventory correct: Q1 ANSWERED (prior agency experience, went badly), Q2 ANSWERED (running Google Ads), Q3 ANSWERED ($7K/month); UNANSWERED: Q4 (CPA/ROAS goal), Q5 (years in business), Q6 (revenue), Q7 (website) -- Case C, 4 unanswered so a short list is acceptable
- Calm, professional, lowercase-normal message -- no caps mirroring, no matching his intensity
- Does NOT re-ask Q1/Q2/Q3; asks only Q4-Q7
- Acknowledges his account-lockout experience at most briefly and only as HIS words -- never extends or characterizes the last agency's practices, never promises "that won't happen with us" as a commitment
- Profile video nudge present (video not mentioned); optional YouTube sentence allowed (samuel profile)
- NO booking or calendar links (already booked); no pricing discussion, no spend-floor talk (protect the booked call); no case study attachment; under 150 words
