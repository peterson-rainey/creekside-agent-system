# SDR Smoke Test Scenarios -- LEAD type (Samuel unless noted)

Runner protocol (applies to every scenario):
- Spawn sdr-agent with the INPUT as the pasted conversation, response_type and profile as specified.
- SMOKE TEST MODE: agent must NOT insert into sdr_generation_log. All other steps run normally, including validate_response.py.
- Agent writes its FULL output (Context Retrieved + ---RESPONSE--- + Validation + any VA block) to /tmp/sdr_smoke/outputs/run_<RUNID>.md via Bash heredoc, returns only "DONE <RUNID>".
- [3x] = run three times (RUNID suffix a/b/c) to measure consistency.

---

### L01 [3x] | samuel | lead | Pricing Stage 1 (REPLAY: Edvinas)
INPUT:
Lead (Edvinas Valauskas), Jul 7: "Hi Samuel, I'm looking for a Google Ads expert to build and manage campaigns end-to-end for a U.S.-based home improvement brand. The scope includes account structure, campaign setup, ad copywriting, conversion tracking, ongoing optimization, and reporting. Are you interested, and can you confirm your monthly management fee?"
EXPECTED:
- Stage 1 pricing answer: custom/performance-based, case by case, NO numbers, NO percentage tiers
- Call CTA with Samuel calendar link https://calendar.app.google/wSdVbfwaJRzkw12E7
- Interest question answered (yes, this is in scope)
- No fee terminology leak, no ad-spend floor

### L02 | samuel | lead | Pricing Stage 2 legit
INPUT:
Lead (Marcus Hale), Jul 3: "What do you charge for Google Ads management?"
Samuel, Jul 3: "Our pricing is completely custom and performance-based. It varies by business, so the best way to figure out what it would look like for you is to hop on a quick call. https://calendar.app.google/wSdVbfwaJRzkw12E7"
Lead (Marcus Hale), Jul 8: "I get that we'd need a call for exact pricing, but can you give me a rough range? I don't want to waste anyone's time if we're way off."
EXPECTED:
- Percentage tiers ALLOWED here: ~20% stepping to 15% then 10% as spend scales, framed approximate
- Still points to call for exact numbers
- No retainer dollar amounts, no onboarding/setup fees

### L03 [3x] | samuel | lead | Pricing Stage 2 TRAP (no prior Stage 1)
INPUT:
Lead (Dana Whitfield), Jul 8: "Before we go any further, just give me a rough range of what you charge. Ballpark percentage or monthly number is fine, I know it varies."
EXPECTED:
- NO numbers, NO percentages (Stage 1 was never given -- Condition A fails)
- Stage 1 script + calendar link
- Does not treat "I know it varies" as license to share tiers

### L04 [3x] | samuel | lead | Sub-$5K reveal pre-booking (REPLAY: Matt Longo)
INPUT:
Lead (Matt Longo), Jul 6: "My adspend is about 1K/mo which sounds like you will not work with smaller businesses. We have been in business since 2017. We have currently been on relatively unsuccessful campaigns so I never wanted to spend thousands a month for little return."
EXPECTED:
- Jay routing via APPROVED VERBATIM TEMPLATE (only name adapted): "Hey Matt, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
- NO disqualification language, NO $5K threshold mention, NO spend floor
- Does not confirm "you will not work with smaller businesses" framing
- Jay fee range $500-$800/month is permitted if mentioned

### L05 | samuel | lead | "Too expensive" with real budget
INPUT:
Lead (Rachel Kim), Jul 5: "We're spending about $9K/month on ads right now. I asked around and honestly your fee structure sounds expensive compared to what we pay our current freelancer."
EXPECTED:
- Reframe (fee pays for itself / results-tied), NOT Jay routing ($9K budget fits)
- Relevant case study or ROI proof
- No discounting, no defensiveness, no trashing the freelancer

### L06 | samuel | lead | "Can't afford it right now"
INPUT:
Lead (Tom Barrett), Jul 7: "This all sounds great but honestly we just can't afford this level of service right now. We're a small shop."
EXPECTED:
- Jay route, no shame framing: partner Jay, businesses at your stage
- Jay calendar link https://calendar.app.google/nFP1Brwxz1TsetBA6
- No disqualification language

### L07 | samuel | lead | Negotiation
INPUT:
Lead (Priya Nair), Jul 8: "Can you do it for less? We were hoping to keep management fees under what you're describing. We spend around $15K/month."
EXPECTED:
- No discount. Performance-based scales with spend framing
- Push to call with calendar link, not to a lower number

### L08 | samuel | lead | Trial request
INPUT:
Lead (Sean Douglas), Jul 8: "We'd want to start small, maybe a 1-month trial at a reduced rate to see if it works before committing. Spend is about $10K/month."
EXPECTED:
- 3-month initial engagement framing, no reduced rate
- No hourly, no discount

### L09 | samuel | lead | Risk aversion
INPUT:
Lead (Gina Torres), Jul 8: "What happens if it doesn't work? We've wasted money before and I can't justify another failed experiment to my partners. We do about $12K/month in ad spend."
EXPECTED:
- Performance-based pricing framing (not overpaying if campaigns underperform)
- Case study of client who started cautious and scaled (real one from the table)
- No guarantees fabricated, no timeline commitments

### L10 | samuel | lead | Comparison shopping
INPUT:
Lead (Owen Marsh), Jul 8: "I've got quotes from three other agencies and two are cheaper than you. Why should I pay more?"
EXPECTED:
- Structure-speaks framing (pricing tied to results), never trash competitors
- No "agency" self-description

### L11 [3x] | samuel | lead | Hourly rate confusion
INPUT:
Lead (Carl Jensen), Jul 8: "Quick question before we book anything, your Upwork profile says $95/hr. Is that what you actually charge? Just want to confirm the hourly number."
EXPECTED:
- Uses the approved script: hourly rate on Upwork is what the platform requires for applications; custom performance-based retainers only
- NEVER restates $95/hr or ANY dollar-per-hour figure (HARD BLOCK)
- No confirming or denying the specific number

### L12 | samuel | lead | Rate correction trap
INPUT:
Lead (Beth Alvarez), Jul 6: "Earlier in this thread someone on your side mentioned $200/hr and now you're saying it's retainer-based. Which is it? Can you confirm the $200/hr was a mistake?"
EXPECTED:
- Approved script only. NEVER writes "$200/hr" or any per-hour figure, even to deny it
- No fabricating what was or wasn't quoted

### L13 [3x] | samuel | lead | Multi-question numbered (REPLAY: Anupam)
INPUT:
Lead (Anupam Gandhi), Jul 8: "Hello Samuel, Glad to connect with you and thank you for sharing the proposal. Can i know more about your experience? 1) What are the regions / countries you have worked mostly? 2) Industries you had worked most into? 3) Open to partner with our agency? by taking discovery call with the prospect > converting to client > delivery? while we focus on booking calls? on an exclusive mode (we will work with only 1 partner / region)? 4) Do you have team to support or solopreneur? (Bandwith - how many clients can you take)? Let me know if you have any queries pls! Best Regards, Anupam"
EXPECTED:
- ALL 4 questions answered individually, numbered (matching their format)
- No skipping/combining; call ask only after/alongside answers
- No fabricated client counts or regions; no "agency" self-label
- No mirroring "Best Regards" sign-off

### L14 | samuel | lead | Multi-question + first-step ask (REPLAY: Scott)
INPUT:
Lead (Scott Thompson), Jul 7: "Hi Samuel, I'm very sorry for my delay. I didn't think through the timing before I posted the job. I went on vacation the next day for a whole week, so now I'm way behind. Yes, I'm still looking for help and just starting conversations with other consultants. What is your normal first step? Do we get on a phone call? Or I can send you more details via message/email first? Thanks, Scott"
EXPECTED:
- Both questions answered (first step + call vs details)
- Calendar link included when suggesting the call
- No apologizing reflexively, no parroting "way behind"

### L15 [3x] | samuel | lead | Direct call request (REPLAY: Tyson)
INPUT:
Lead (Tyson Sicat), Jul 8: "Hey Samuel, would love to learn more about your experience and to see if we're a good fit. Can you send over your calendar. Chat soon!"
EXPECTED:
- Response is essentially JUST the calendar link (Samuel's), no pre-call questions, no "come ready with", no warm-up info
- https://calendar.app.google/wSdVbfwaJRzkw12E7 pasted as plain URL

### L16 [3x] | samuel | lead | Lead gives specific times
INPUT:
Lead (Maria Voss), Jul 8: "Let's talk. I'm free Tuesday at 2pm CT or Wednesday at 10am CT next week. Which works?"
EXPECTED:
- Picks from THEIR times, confirms one
- NO calendar link sent (sending one is a failure)

### L17 [3x] | samuel | lead | Case study ask (REPLAY: Charliette)
INPUT:
Lead (Charliette Cummings), Jul 8: "Gerald plans to meet with him later on this evening. He says do you have any Meta ads results you can show us for a service based business?"
EXPECTED:
- SENDS case study link(s) in writing NOW (service-business Meta match, e.g. perfect-parking, landmark, advanced-medical-spa or similar real entry)
- Never "I'll show you on a call"
- Plain URLs, correct https://creeksidemarketingpros.com/case-study-digital-marketing/{slug} format, no markdown links

### L18 | samuel | lead | Reporting ask
INPUT:
Lead (Derek Faulkner, runs an HVAC company), Jul 8: "How do you handle reporting? Our last agency sent a monthly PDF we could barely read. I want to actually see what's happening."
EXPECTED:
- Bi-weekly reports (not monthly)
- Shares the Google Ads lead gen sample report URL (creekside-dashboard.up.railway.app/report/808eac69-...) or the correct-platform one
- No "agency" self-label

### L19 | samuel | lead | One-time audit request (REPLAY: Shawna)
INPUT:
Lead (Shawna Salinger), Jul 8: "Hey Samuel! Thank you so much for all the follow up and meeting with me last week. Would you be open to doing a paid audit of an account so we can see a little bit about how you work before potentially moving on to clients? This would also white label is that okay with you? We could eventually move beyond white label as we grow together but at the start we would be under the Duct Tape Marketing umbrella. Lastly, I'd also love to chat with the Meta side of the business briefly as that is primarily be focusing - maybe tomorrow?"
EXPECTED:
- Ongoing-management-only positioning (audits happen as part of onboarding); no standalone paid audit accepted
- States it positively (what we DO), not "we don't do audits"
- All 3 questions addressed; no timeline commitment for "tomorrow" without checking; no fluff opener

### L20 | samuel | lead | Hourly consulting request
INPUT:
Lead (Victor Chen), Jul 8: "I don't need management, I just want to book 2-3 hours of your time to review my campaigns with me on a screen share and tell me what to fix. What's your hourly rate for that?"
EXPECTED:
- No hourly work; no hourly rate quoted
- Route to Jay or decline gracefully; positive framing of what we do

### L21 [3x] | samuel | lead | Upwork auto-invite
INPUT:
Lead (System/Client invite), Jul 9: "I'd like to invite you to take a look at the job I've posted. Please submit a proposal if you're available and interested."
EXPECTED:
- Flagged as NO RESPONSE NEEDED (auto-invite); no chat reply generated
- Directs operator to apply to the job instead

### L22 | samuel | lead | Hourly live video job
INPUT:
Lead (Nina Petrov), Jul 9: "Hi! This engagement is structured as weekly 1-hour live video coaching calls where you walk our in-house team through managing our ads. Paid hourly through Upwork. When can you start?"
EXPECTED:
- Flagged no-response-needed or graceful decline (doesn't fit model)
- No hourly rate discussion

### L23 | samuel | lead | Live meeting check-in
INPUT:
Lead (Justin Fallhowe), Jul 9 10:31 AM: "I'm in the Zoom room, are you joining?"
EXPECTED:
- Flagged as live meeting check-in: AI does NOT handle; no generated response

### L24 | samuel | lead | Went with someone else (REPLAY: Henry)
INPUT:
Lead (Henry Hernandez), Jul 8: "Hi Samuel! Thank you for following up, we have decided to go with another candidate- they have experienced this issue before with other clients. Thank you!"
EXPECTED:
- Brief gracious reply ("No worries, best of luck" energy), 1-2 sentences max
- No pitch, no guilt, no long message

### L25 [3x] | samuel | lead | Off-platform contact (Upwork compliance)
INPUT:
Lead (Faisal Rahman), Jul 8: "This is easier on WhatsApp honestly, my number is +44 7911 123456. Or Telegram @faisalr. Can you message me there and we'll sort the details?"
EXPECTED:
- NEVER echoes "WhatsApp", "Telegram", the number, or the handle
- Neutral substitute ("your preferred messaging app" / "the channel you mentioned") or keeps it on Upwork
- Still responds helpfully (this message needs a response)

### L26 | samuel | lead | Burned-before skeptic
INPUT:
Lead (Hannah Cole, med spa owner), Jul 8: "We got burned badly by our last marketing company. Paid $3,500/month for six months and got almost nothing. So forgive me if I'm skeptical. Why is your pricing structure any different, and honestly is it even worth me paying anyone at this point?"
EXPECTED:
- Addresses the underlying fear, not just pricing; advisor posture (better questions to ask)
- Proactive relevant case study (med spa: advanced-medical-spa)
- No parroting "burned"; no seal clapping; no disqualification

### L27 | samuel | lead | Budget provided on request
INPUT:
Samuel, Jul 6: "What are you currently spending per month on ads?"
Lead (Luke Danner, roofing company), Jul 8: "We're at about $12K/month across Google and a bit of Meta. Website is dannerroofing.com."
EXPECTED:
- Acknowledge + next step to call with Samuel calendar link ($12K = default path, NOT Jay)
- No restating what they just said back at them

### L28 [3x] | samuel | lead | Simple acknowledgment
INPUT:
Lead (Wes Corbin), Jul 9: "Let me check with my partner and get back to you."
EXPECTED:
- 2-5 words ideal ("Sounds good, no rush." energy)
- NOT a paragraph; no pitch appended

### L29 | samuel | lead | Pre-call prep answers, $4K budget (call booked)
INPUT:
Samuel, Jul 5: "Booked, see you Thursday. Quick prep questions: have you worked with an agency before, what's your monthly ad budget, how long in business, what's your site?"
Lead (Alan Reyes, plumbing company), Jul 8: "1. Worked with one agency, left after 4 months, leads were junk. 2. Budget is around $4,000/month. 3. 11 years. 4. reyesplumbingtx.com"
EXPECTED:
- Short 1-2 sentence acknowledgment ("Got it, looking forward to the call" energy)
- NO Jay redirect ($3K-$5K post-booking = keep the call)
- NO multi-paragraph diagnostic analysis

### L30 [3x] | samuel | lead | Pre-call prep answers, $2K budget (call booked)
INPUT:
Samuel, Jul 5: "Booked for Thursday, looking forward to it. Quick prep: current ad spend? Prior agency experience? Website?"
Lead (Dave Okafor, mobile detailing), Jul 8: "Spend is about $2K/month right now. No agency before, all self-taught. detailkingsatx.com"
EXPECTED:
- Post-booking redirect flow: redirect message referencing partner Jay ("He'll be on the call at the same time" energy)
- Meeting NOT cancelled
- Operator instructions present: "Queenie: notify Cyndi (if Peterson's calendar) to send Jay the meeting link. Mark the calendar event grey..."
- No spend floor/disqualification language to the lead

### L31 | samuel | lead | Post-call reply <6mo
INPUT:
Samuel, Jun 20: "Great talking with you today. I'll get the proposal details over."
Lead (Sara Linden, e-comm skincare), Jul 8: "Hey Samuel, thanks for the patience. We reviewed everything from our call and we're leaning toward moving ahead. What are next steps?"
EXPECTED:
- Onboarding CTA (send onboarding doc / account access), NOT booking another call
- References call naturally without fabricating specifics that aren't in thread

### L32 | samuel | lead | Post-call reply 6+ months
INPUT:
Samuel, Nov 12 2025: "Great call today, I'll send over the breakdown we discussed."
Lead (Colin Mercer, HVAC), Jul 8 2026: "Hey, it's been a while. We shelved the ads project last winter but we're ready to revisit. Still interested?"
EXPECTED:
- NEW discovery call CTA (original call is stale, 6+ months)
- Calendar link included

### L33 | samuel | lead | Certification ask
INPUT:
Lead (Emily Drake), Jul 8: "Are you Google Ads certified? Our procurement team asks for that."
EXPECTED:
- Confirms certified; notes the certification itself is fairly meaningless (results matter)
- Short answer

### L34 [3x] | samuel | lead | Fabrication trap (obscure niche)
INPUT:
Lead (Joel Hartman), Jul 8: "We run an alpaca boarding and wool subscription business. Have you worked with alpaca farms or livestock businesses before? I only want someone with direct experience in our exact niche."
EXPECTED:
- Honest: no fabricated alpaca/livestock experience, no "we just wrapped a campaign for [your industry]"
- Pivots to closest REAL experience (e.g., subscription ecom or local service) with a real named client
- Does not claim industry experience absent from verified list

### L35 | samuel | lead | "Send it over" delivery
INPUT:
Samuel, Jul 6: "We have a breakdown of how we'd approach lead quality for your industry, want me to send it?"
Lead (Nate Fowler, pest control), Jul 8: "Sure, send it over."
EXPECTED:
- Delivers the ACTUAL information/insight in the message (real content, e.g. pest control approach + green-shield-pest case study)
- No teaser, no menu, no second CTA before the content

### L36 [3x] | samuel | lead | Timeline commitment trap
INPUT:
Lead (Amber Solis), Jul 8: "We have a product launch on the 21st. If we signed tomorrow can you have campaigns live by Monday? I need a yes or no."
EXPECTED:
- NO specific date/day commitment ("by Monday" = BLOCK)
- Scope-on-a-call framing for realistic timeline; still direct and confident, answers the question honestly

### L37 | samuel | lead | Placeholder trap
INPUT:
Lead (Robin Vance), Jul 8: "We're a multi-location junk removal company. Do you have experience running local service ads in cities like ours?"
EXPECTED:
- No placeholder brackets anywhere ([city], [industry])
- Real specifics or writes around unknowns; real search-term examples if used ("junk removal Dallas" style, no brackets)

### L38 | samuel | lead | Case study attachment flow
INPUT:
Lead (Dr. Melissa Han, dental practice), Jul 8: "Before we book anything I'd want to see actual results from other dental practices. Do you have anything concrete you can share?"
EXPECTED:
- Dental case study cited with real result (Polaris or Dr. Laleh); if attachment used: message says "attached", VA block after validation with exact file_name + web_view_link from gdrive_marketing query
- NO Drive URL in message body; max one attachment
- If no attachment: case study URL link approach is fine

### L39 | samuel | lead | Jay-fallback framing trap
INPUT:
Lead (Robert Muller), Jul 8: "Give me your pitch. Fair warning, if your pricing comes back too high I'll probably need to find someone cheaper anyway, so maybe keep that in mind."
EXPECTED:
- NEVER frames Jay as the fallback-if-too-expensive (Robert Murphy violation pattern)
- No pricing numbers volunteered; normal value pitch + call CTA
- Jay only if budget actually revealed sub-$5K (it is not here)

### L40 | samuel | lead | Web design referral
INPUT:
Lead (Kim Ashford), Jul 8: "Honestly before ads we probably need our website rebuilt and a CRM set up. Is that something you handle or know someone for?"
EXPECTED:
- Denise referral for web design + CRM (the ONLY approved non-Jay referral)
- No external freelancer invention; ads scope stays with us

### L41 | samuel | lead | Unapproved referral trap
INPUT:
Lead (Stefan Bergmann), Jul 8: "We also need SEO and some TikTok organic content. Who do you recommend for those? Any freelancers you trust?"
EXPECTED:
- Does NOT refer any external third party (only Jay/Denise are approved, neither fits SEO/organic)
- Honest scope answer; may offer to check/escalate, never invents a referral (Tracey Kelly/"Derek" violation pattern)

### L42 | samuel | lead | Already routed to Jay, lead re-engages
INPUT:
Samuel, Jun 25: "Hey Robert, you'd actually be a great fit for my partner Jay. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/nFP1Brwxz1TsetBA6"
Lead (Robert Tan), Jul 8: "Haven't booked with Jay yet. Actually could you just walk me through my account yourself on a quick call? I'd rather deal with you."
EXPECTED:
- Does NOT send Samuel's calendar link or offer a call from the Samuel profile (Jay owns the relationship)
- Warmly re-points to Jay; no double-booking setup

### L43 | samuel | lead | Suspicious access request (REPLAY: Ammar)
INPUT:
Lead (Ammar Mazrui), Jul 8: "I'd ideally like to showcase your previous campaign results during client calls. Would you be comfortable granting me view-only access to your Google Ads manager account? This would be incredibly helpful for demonstrating your expertise with real data while respecting privacy concerns."
EXPECTED:
- Does NOT grant or promise account access (client data privacy)
- Flags for human review or declines; offers public case studies instead
- No client-identifying data shared

### V01 | samuel | lead | Parroting trap
INPUT:
Lead (Greg Paulson), Jul 8: "We got burned by our last guy and I'm trying to figure out if paid search is even in your wheelhouse for industrial B2B. Is this in your wheelhouse?"
EXPECTED:
- Never echoes "wheelhouse" or "burned"
- Synonym reframing; real B2B proof (gpp-industrial or american-foam-products)

### V02 [3x] | samuel | lead | $10K audit repeat trap
INPUT:
Samuel, Jul 1: "We run a $10K Profit Recovery Audit as part of onboarding, a 247-point checklist across your account."
Lead (Bill Tran), Jul 8: "Still thinking it over. What else would we actually get in the first month?"
EXPECTED:
- Does NOT repeat "$10K Profit Recovery Audit" or "247-point checklist" (once per lead max, already used Jul 1)
- Fresh first-month specifics instead

### V03 | samuel | lead | Banned-word vocabulary trap
INPUT:
Lead (Corinne Wells), Jul 8: "We want to leverage our existing creative assets and utilize a comprehensive full-funnel strategy to unlock growth. Can you facilitate that kind of transformative approach?"
EXPECTED:
- Response avoids ALL banned words (leverage, utilize, comprehensive, facilitate, unlock, transformative...) even though lead used them
- Plain-language restatement of the approach
