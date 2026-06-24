# SDR Agent Improvement Session -- Progress Save

**Date:** 2026-06-16
**Session goal:** Review every response type category, test the SDR agent against 5 real examples per category, collect corrections, then batch-apply all corrections to the SDR agent at the end.

---

## What We're Doing

1. Classified all 3,845 Upwork lead messages into 32 response type categories (zero unclassified)
2. Generated 5 example SDR responses per category using the current SDR agent
3. Reviewing each category with Peterson one by one, collecting corrections
4. After all 32 categories are reviewed, we batch-apply all corrections to the SDR agent

**Format per category:** Context summary, lead message verbatim, Response 1 only (show Response 2 only if Peterson asks).

---

## Categories Reviewed (5 of 32 complete)

### Category 1: Call Request (470 messages, 12.2%) -- REVIEWED
**Correction:** All responses were adding unnecessary extra sentences after the calendar link ("it'd help to know...", "come ready with..."). When the lead wants a call, just send the calendar link. The call warm-up message happens AFTER they book, not before. Good response = "Go ahead and grab a time here: [calendar link]" and nothing more.

### Category 2: Experience / Process Questions (146 messages, 3.8%) -- REVIEWED
**Corrections:**
- New category needed: **"Pre-Call Prep Answers"** -- When a lead answers our discovery questions after already booking a call, it's a different response type. Call is booked, just acknowledge and redirect to Baran if budget triggers it.
- **Baran redirect script needed** -- When a lead reveals sub-$5K spend after already booking with Samuel, need a standard positive redirect. Happens frequently. Frame Baran as the expert in their space, not the B-team.
- **Cost per booked consultation vs cost per lead** -- Agent conflated these. Sub-$10 CPA is a lead/click metric, not a booked consultation metric. Medspa booked consultations are higher. Distinguish between CPL and cost per booked appointment.
- **Case study links from database** -- When leads ask for case studies or performance data, pull and link actual case studies. Don't deflect to a call.
- **No setup/fluff sentences** -- "Fair question, I'll give you a straight answer" is filler. Just give the straight answer directly.
- **B2C industries listed as B2B** -- Home services, healthcare, legal are typically B2C. When asked about B2B experience, cite actual B2B examples or be honest about the gap.
- **Show Response 1 only going forward** -- Present Response 2 only if asked.
- **Depth should match question complexity** -- "What would the first 30 days look like" deserves more detail than a yes/no experience question.

### Category 3: Budget / Pricing Questions (169 messages, 4.4%) -- REVIEWED
**Corrections:**
- **No acknowledging/validating their questions** -- "Good questions," "Thanks for the quick reply" = cut it. Just answer.
- **Pricing A/B test opportunity** -- Build two modes: (A) "Performance-based and custom, hop on a call" vs (B) give ad spend ranges upfront so they can self-estimate cost. Need to test which gets more calls booked.
- **Minimum ad spend framing** -- Minimum recommended is $3K-$5K/month per platform. Below $5K route to Baran. Above $5K route to Samuel/Cade. Frame redirect positively.
- **Don't say "we don't do hourly"** -- Just state the actual fee structure. Don't define yourself by what you don't do.
- **Baran pricing can be quoted** -- For sub-$5K leads, fees are typically $500-$800/month.
- **Case study links from database** -- Pull and link real case studies when asked for examples. Don't deflect to a call.
- **Strategy questions need depth** -- "How would you approach running Google Ads for us?" needs a real breakdown, not 2 sentences.
- **Reporting frequency is bi-weekly**, not monthly. Include a link to a sample report when it comes up.
- **Google Ads certified but note it's meaningless** -- Confirm but add context that the cert itself doesn't mean much.
- **Don't repeat info already covered** -- If a detail was addressed earlier in the conversation, don't re-answer it.
- **All sub-$5K leads route to Baran** -- Frame Baran as the local/small business expert, not a downgrade.

### Category 4: Scope / Requirements Questions (99 messages, 2.6%) -- REVIEWED
**Corrections:**
- **Sub-$5K routing doesn't change how we answer** -- Still answer their questions fully. Just change CTA at end to Baran.
- **Never commit to specific number of hours** -- Can give ballpark if asked, but clarify pricing is performance-based. If routing to Baran, quote $500-$800/month.
- **CTA after answering questions should add value** -- "Want to walk through this on a call" is redundant when you just walked them through it. Better: "Want to dive deeper?" or frame the call as getting more value.
- **AI-generated screening questions pattern** -- Leads using ChatGPT for vetting questions. Same 6-question format keeps appearing. Doesn't change our response approach.
- **Bi-weekly reports, not monthly** -- Include sample report link.
- **No one-time jobs** -- We do ongoing management only. One-off audits/fixes happen as part of onboarding. If they only want a one-time thing, we're not the right fit.
- **Don't say "agency"** -- Say "we specialize in paid ads" or "paid ads specialists."
- **Creatives are included** -- List creative production as part of our services.

### Category 5: Screening Questionnaire (65 messages, 1.7%) -- REVIEWED
**Corrections:**
- **"Who manages my account" answer needs updating** -- Lead gets direct access to their account manager via Google Chat, plus supporting team (landing pages, creative, conversion tracking). No middle managers. Can hop on calls with their account manager directly so they see that person understands their business.
- **Don't parrot lead's exact words** -- Use synonyms. "Affluent demographics in competitive markets" becomes "targeting high-income individuals in competitive locations."
- **We don't work with agencies** -- Baran does. No clean way to refer agencies to Baran. Probably shouldn't apply to agency partnership jobs.
- **Pricing guidelines should give a range** -- Don't completely dodge. Say it's custom and performance-based, but give general expectations based on their ad spend.
- **Largest monthly budget managed** -- $80K single account is fine. Don't volunteer combined total unless asked.
- **Verify case study numbers** -- CI Lifestyle Meals ($25 CPA, 4.52x ROAS), medspa CPLs ($18-30 Botox, $28-45 fillers) need verification against actual Creekside data.

### Category 6: Strategy / Approach Questions (40 messages, 1.0%) -- REVIEWED
**Corrections:**
- **Em dashes present** -- Zero tolerance. Must be removed from all responses.
- **Don't gatekeep deliverables they explicitly asked for** -- If they ask for a "high-level 60-90 day test plan" and say "nothing too in-depth," give them the plan. It's fine for it to be generic. Answer all questions before requesting a call.
- **Ultra-short acknowledgments when call is already booked** -- "Got it." is sufficient when they're just setting the agenda for a call that's already scheduled.
- **"Good questions" still appearing** -- Consistent pattern of opening with validation fluff that needs to be stripped.

### Category 7: Performance / Results Expectations (23 messages, 0.6%) -- REVIEWED
**Corrections:**
- **Pre-Call Prep Answers misidentified as questions** -- When a lead restates our questions with their answers underneath (question marks included), recognize this as them ANSWERING our questions, not asking new ones. Response = brief acknowledgment: "Thanks, looking forward to talking on our call."
- **Setup timeline doesn't need a call to answer** -- Give the ballpark directly. Don't gatekeep basic info.
- **Onboarding process described in more detail** -- When asked "what do you need from us": We send an onboarding doc they fill out, we get access to all accounts, we collect branding assets so we can promote their business effectively.
- **Partner name is now Jay** (formerly Baran) -- Update all references.
- **Price objection redirect framing** -- "If $1,000 is too expensive, it'd be best to connect with our small business specialist. They have cheaper packages that may fit better for where your business is right now."
- **CTA weakness** -- "Want to set that up? Grab a time here" is functional but could be stronger. Not blocking.
- **Never recommend a budget under $1,000** -- Even if the math says $450-750 would be sufficient, minimum recommendation is always $1K+.

### Category 8: Follow-up Nudge / Status Check (20 messages, 0.5%) -- REVIEWED
**Corrections:**
- No new structural corrections. These are unique situations that are difficult to perfectly frame every time, but responses are overall solid.

### Category 9: Platform / Technical Questions (15 messages, 0.4%) -- REVIEWED
**Corrections:**
- **Health-specific case studies DO exist** -- On creeksidemarketingpros.com/case-study and should be in the database. Agent should never say "I don't have a health-specific case study" when we do.
- **Don't gatekeep basic numbers behind a call** -- If you know them, share them.
- **Don't repeat the same point twice in different answers** -- Consolidate.
- **Pricing answer framing** -- "Custom pricing, client-to-client basis, performance-based. To give you a number we'd need to hop on a call." If they push: "We'd need your ad spend to figure that out." Once we have spend, give rough range.
- **Never recommend budget under $1,000** -- Minimum is always $1K+.
- **Sub-$1K retargeting = route to Jay**.
- **One-time conversion tracking fixes not standalone** -- Part of ongoing management onboarding. If they only want a one-off, we're not the right fit.
- **"I want to be straight with you here" is setup fluff** -- Just be straight without announcing it.

### Category 10: Quick Acknowledgment (494 messages, 13.1%) -- REVIEWED
**Corrections:** None. Category is working as intended. All responses 2-5 words. Correctly identifies when no response is needed.

### Category 11: Business Context & Problem Sharing (490 messages, 12.7%) -- REVIEWED
**Corrections:**
- **Pre-Call Prep Answer pattern confirmed** -- When lead answers discovery questions with call already booked, respond in 1-2 sentences. Not a multi-paragraph analysis.
- **Jay framing is flexible** -- "Our small business specialist," "my partner Jay," or "Jay on my team" all work. Same as how we'd hand off to Cade. He's part of the team.
- **6-month trials are fine** -- We do 3-month trials with every client anyway. Not a one-time job.

### Category 12: Scheduling Logistics (453 messages, 11.8%) -- REVIEWED
**Corrections:**
- **Agent needs Google Calendar access** (save for later) -- To properly respond to scheduling, needs to check actual availability. If given 1-hour heads up, can typically make something work.
- **Don't tell leads to "reach out through their profiles"** -- Send Jay's calendar link directly or say "I'll have Jay message you directly."
- **Jay framing should feel tailored** -- "Jay, who we mention in our video, handles businesses just like yours." Personal and relevant, not generic tier routing.
- **Call warm-up info (profile video mention) happens AFTER they book, not before.**

### Category 13: Active Client Operations (300 messages, 7.8%) -- REVIEWED
**Corrections:**
- **Never assert something the agent can't verify** -- If agent can't check whether an email was sent, say "Let me check on that" not "we haven't sent it yet." Only state facts the agent can confirm.

### Category 14: Providing Information / Links (276 messages, 7.2%) -- REVIEWED
**Corrections:**
- **Don't gate call booking behind qualifying questions** -- If they send a Calendly link, just book it. Ask qualifying questions AFTER booking (as pre-call prep). If budget is later revealed as under $5K, redirect to Jay then.
- **Post-close leads shouldn't be in SDR examples** -- Already-signed clients aren't SDR scenarios.
- **Book first, qualify after** -- Don't lose booking momentum by making them answer questions first.

### Category 15: Initial Inquiry / Job Invite (209 messages, 5.4%) -- REVIEWED
**Corrections:**
- **"I'd like to invite you to take a look at the job I've posted" = not a message we respond to** -- Upwork auto-invite. We go apply, not reply. Agent should recognize this template and skip.
- **Hourly live video call engagements don't fit our model** -- Decline or ignore.
- **Don't deflect to a call when they ask for screenshots/proof** -- If agent can't find them, direct the human operator (Queenie) to get them from Cade or Peterson. Say "I'll pull those together and send them over."
- **New rule: identify message types that don't need responses** -- Upwork auto-invites are not messages to respond to.

### Category 16: Delay / Still Deciding (125 messages, 3.3%) -- REVIEWED
**Corrections:**
- **Don't volunteer pricing when they didn't ask** -- If mentioning pricing in a follow-up, frame it as addressing a common hesitation: "A lot of hesitation we see from businesses like yours is around agency fees, which is why ours is built around performance -- we only get paid when you hit certain metrics."
- **Follow-up pricing mentions need a reason** -- Explain WHY you're telling them, not just what the pricing is.
- **Example 2 is the benchmark** -- "No rush at all. When you've had your other calls, let me know where things land." Short, respectful, no pressure.
- **Timing matters on status questions** -- "Any word from your partner?" is good as a follow-up days later, not as an immediate reply to them saying they need to check.

---

### Category 17: Ready to Proceed (119 messages, 3.1%) -- REVIEWED
**Corrections:**
- **Don't add friction when they're ready to proceed** -- If they say "let's move forward," don't ask clarifying questions before onboarding. Get them on a call and start. Qualifying can happen on the call.
- **Never gatekeep proof/examples behind a call** -- If they ask for campaign examples, ad copy, screenshots, send them. Don't say "I can share on a call." Deflecting proof requests to calls is transparent and damages trust.

### Category 18: Live Meeting Check-In (72 messages, 1.9%) -- REVIEWED/REMOVED
**Corrections:**
- **Not an SDR agent category** -- AI will never be used for real-time meeting coordination. Remove from scope entirely.
- **Build flagging system for human review** -- Agent should flag low-confidence, high-stakes, or uncertain situations for Peterson/Cade to review before sending.

### Category 19: Went Different Direction (61 messages, 1.6%) -- REVIEWED
**Corrections:** None. Category is working well. Nurture touches are appropriately non-pushy, use outcome curiosity, and reference specific details from the original conversation.

### Category 20: Post-Call Follow-up (34 messages, 0.9%) -- REVIEWED
**Corrections:**
- **Send screenshots immediately** -- "I'll have it ready by the call" is gatekeeping. Say "I'll send that over shortly" and do it.
- **Upwork hourly rate confusion** -- When leads see two different rates, explain: "The hourly rate on Upwork is what the platform requires for applications. We only do custom retainers that are performance-based." Don't confirm either hourly rate as real.
- **$95/hr BLOCK confirmed** -- Never quote this. It's the display rate, not a real rate.

### Category 21: Engagement Terms / Working Arrangement (30 messages, 0.8%) -- REVIEWED
**Corrections:**
- **We don't do hourly work. Period.** -- No $250/hr quotes, no hourly coaching, no short-term hourly audits. If they want a smaller engagement, they talk to Jay or we're not a good fit.

### Category 22: Off-Platform Contact Attempt (21 messages, 0.5%) -- REVIEWED
**Corrections:**
- **When they give specific available times, don't send a calendar link** -- Check the calendar, pick from their times, confirm. Don't ignore what they offered.
- **We're fine working off-platform** -- When leads share their email (even obfuscated), we can use it.
- **We cannot share OUR email until a contract is started** -- Risk of Upwork ban. Redirect to booking a call or say we can share once contract is active.

### Category 23: Price Rejection (20 messages, 0.5%) -- REVIEWED
**Corrections:** Area to iterate on -- offering alternatives, different packages, Jay routing. No specific new corrections beyond what's captured. Use Category 7 framing: "If that's too expensive, it'd be best to connect with our small business specialist. They have packages that may fit better."

### Category 24: Complaint / Dispute (18 messages, 0.5%) -- REVIEWED
**Corrections:**
- **Don't immediately admit fault when someone comes at us aggressively** -- Check full conversation context for what actually happened. Often aggressive leads were bad fits.
- **Aggressive clients are often bad fits** -- Identify what led to our disengagement before apologizing.
- **Active client complaints are not SDR territory** -- Flag to Peterson/Cade.
- **Don't be a yes-man** -- If we paused because we were waiting on them, say that. Check conversation history before taking blame.
- **AI should not default to apologizing** -- Understand WHY something happened first.

### Category 25: Frustration / Skepticism (16 messages, 0.4%) -- REVIEWED
**Corrections:**
- **Help them solve the underlying problem** -- When they say they got burned, address the fear, not just the pricing question.
- **Reframe the question** -- "Is pricing the most important thing, or finding the right fit?" Explain that price-focused hiring leads to getting burned.
- **Give them better questions to ask** -- Position as advisor: "You should ask about strategy for your specific situation." Share case study as example.
- **Pricing floor: "starts at $1,000/month"** -- Gives a number to latch onto, self-selects out people who can't afford $1K.

### Category 26: Re-engagement / Returning After Silence (14 messages, 0.4%) -- REVIEWED
**Corrections:**
- **Don't parrot their message back and say "that's in our wheelhouse"** -- When they ask for a call, just send the calendar link.

### Category 27: Project On Hold / Not Ready (10 messages, 0.3%) -- REVIEWED
**Corrections:**
- **Don't repeat back what they said and praise it** -- Seal clapping doesn't get us anywhere.
- **Speak directly to what we need to get started** -- Tell them what an audit looks like, provide a little value, offer to hop on a call to walk through their account or talk strategy.

### Category 28: Positive Proposal Response (8 messages, 0.2%) -- REVIEWED
**Corrections:**
- **When they already asked to book a call, just book the call** -- Don't front-load a multi-paragraph diagnostic. Calendar link + maybe one short insight or follow-up question. Save the analysis for the call itself.

### Categories Skipped:
- Scam / Non-Fit / Red Flag (15 msgs) -- Low priority, brief declines are fine
- Vendor / Partnership Pitch (13 msgs) -- Low priority, brief declines are fine
- Negotiation / Counter-Offer (NEW) -- Skipped
- Contract / Proposal Acknowledgment (NEW) -- Skipped

---

## ALL CATEGORIES REVIEWED. Corrections applied to SDR agent.

### Files Modified (2026-06-23):
- `.claude/agents/sdr-agent.md` -- Rewrote Critical Reminders section with all universal rules
- `.claude/agents/sdr-agent/docs/response-guidelines.md` -- Updated pricing, Jay redirect, fluff rules, case studies, call booking, one-time jobs, flagging system, message type detection
- `.claude/agents/sdr-agent/docs/validation.md` -- Updated pricing leak rules, hourly rate BLOCK, Jay references

### QC Result: PASS (all 4 WARN gaps fixed)

### Additional Updates (2026-06-24):
- Changed agent to output SINGLE response (Response 1 / by-the-book only). Updated lead-response.md, followup.md, nurture.md, core file router, output format, and log SQL.
- Architecture QC: Fixed 6 issues (rules read before generation, description updated, output format singular, validation WARN list expanded, conflict resolution rule added, stale "BOTH" references removed)
- Added "Writing Like a Human, Not an AI" section to response-guidelines.md (8 rules from AI Voice Training Manual: sentence variation, kill rule of three, start with answer, be direct about downsides, assume competence, match reply length, no formal transitions, specificity over polish)
- Added post-test violation patches: "I'll be straight about that" (setup), "Your concern is the right one to have" (seal clap), "We don't do hourly" (defining by negation), "right in my wheelhouse" (parroting). All added to both response-guidelines.md and validation.md WARN lists.
- Added "Got it, that's helpful context" and variants to fluff opener ban list.
- Added "DON'T DEFINE BY NEGATION" as new rule: state what we DO, not what we don't.
- All changes pushed to GitHub (d1a7e81 on main).

---

## Categories Still To Review (0 remaining)

### Questions categories:
6. Strategy / Approach Questions (40 messages, 1.0%)
7. Performance / Results Expectations (23 messages, 0.6%)
8. Follow-up Nudge / Status Check (20 messages, 0.5%)
9. Platform / Technical Questions (15 messages, 0.4%)

### General message categories:
10. Business Context & Problem Sharing (490 messages, 12.7%)
11. Initial Inquiry / Job Invite (209 messages, 5.4%)
12. Scheduling Logistics (453 messages, 11.8%)
13. Ready to Proceed (119 messages, 3.1%)
14. Delay / Still Deciding (125 messages, 3.3%)
15. Went Different Direction (61 messages, 1.6%)
16. Engagement Terms / Working Arrangement (30 messages, 0.8%)
17. Post-Call Follow-up (34 messages, 0.9%)
18. Price Rejection (20 messages, 0.5%)
19. Complaint / Dispute (18 messages, 0.5%)
20. Quick Acknowledgment (494 messages, 13.1%)
21. Live Meeting Check-In (72 messages, 1.9%)
22. Active Client Operations (300 messages, 7.8%)
23. Providing Information / Links (276 messages, 7.2%)
24. Off-Platform Contact Attempt (21 messages, 0.5%)
25. Scam / Non-Fit / Red Flag (15 messages, 0.4%)
26. Vendor / Partnership Pitch (13 messages, 0.3%)

### New categories:
27. Frustration / Skepticism (16 messages, 0.4%)
28. Re-engagement / Returning After Silence (14 messages, 0.4%)
29. Project On Hold / Not Ready (10 messages, 0.3%)
30. Positive Proposal Response (8 messages, 0.2%)
31. Negotiation / Counter-Offer (NEW from QC)
32. Contract / Proposal Acknowledgment (NEW from QC)

---

## QC Issues Found (apply when building corrections)

### BLOCK-level (must fix):
1. **Greg Stula (Post-Call Follow-up): Quoted "$95/hr"** -- Fabricated rate. Real consulting rate is $250/hr. $95 is the Upwork profile display rate, which rules say is never the final agreed rate.
2. **$250/hr quoted in 5 responses** across Fernando, Zach Arbitman, Althea Chia, Dale McMastor, Baris Yucelt -- Only acceptable when the Upwork job explicitly requires hourly consulting. In general pricing conversations, this is a pricing leak.

### WARN-level:
- Fernando Uribe appeared in 3 categories (deduplicated now)
- Em-dash usage not confirmed clean across all responses
- "Happy to" is a natural Samuel phrase but "I'd be happy to" is banned -- tension to resolve

---

## Deduplication Applied

8 leads appeared in multiple categories. Each assigned to one category only:

| Lead | Kept In | Removed From |
|------|---------|-------------|
| Andrew Kim | Scope/Requirements | Strategy/Approach |
| Anjelika Kour | Budget/Pricing | Scope/Requirements |
| Cindy O'Rourke | Went Different Direction | Complaint/Dispute |
| David Gorn | Strategy/Approach | Performance/Results |
| David Walsman | Platform/Technical | Business Context |
| Dylan Ramsey | Strategy/Approach | Platform/Technical |
| Elliot Raj | Scope/Requirements | Screening Questionnaire |
| Fernando Uribe | Screening Questionnaire | Budget/Pricing (manual test) |

After dedup, all categories have at least 4 unique examples. Arik Ahluwalia (Spring Media) was pulled as a replacement for Screening Questionnaire.

---

## Data Source

- All data from `upwork_conversations` table (798 conversations, synced daily via GraphQL API, last sync 2026-06-16)
- `sdr_responses` is the OLD table (2,867 rows, last touched June 11) -- candidate for deletion, replaced by `upwork_conversations`
- SDR agent file: `.claude/agents/sdr-agent.md` with docs in `.claude/agents/sdr-agent/docs/`

---

## How to Resume

1. Open this file
2. Start at **Category 6: Strategy / Approach Questions**
3. Pull the examples from the agent output files (stored in subagent jsonl files under `~/.claude/projects/-Users-petersonrainey-C-Code---Rag-database/ef509421-a6f7-43e5-abeb-49b6a1731a7b/subagents/`)
4. Present Response 1 only per example
5. Collect corrections
6. After all 32 categories reviewed, batch-apply corrections to the SDR agent

Key agent output files for remaining categories:
- Strategy/Approach: agent-ac2b81f6b7356ff74.jsonl
- Performance/Results: agent-a59835d1d9f38ead3.jsonl
- Follow-up Nudge: agent-a74d57a0887d2a1b3.jsonl
- Platform/Technical: agent-a90bed2747c0fb555.jsonl
- Business Context: agent-a2501ee4da882ea34.jsonl
- Initial Inquiry: agent-ae96a58b23e8c0192.jsonl
- Ready to Proceed: agent-a330e839491305488.jsonl
- Delay/Still Deciding: agent-a87ea17a734b03e00.jsonl
- Went Different Direction: agent-ad597c386d26eda47.jsonl
- Engagement Terms: agent-aac31de0f7ad30b50.jsonl
- Post-Call Follow-up: agent-a2e2bd1443ebbb01a.jsonl
- Price Rejection: agent-a7fe0a2a469eae042.jsonl
- Complaint/Dispute: agent-adb47912b31e66671.jsonl
- Low-signal (Quick Ack, Scheduling, Off-Platform, Scam, Vendor): agent-afb7ab289cc4277f6.jsonl
- Remaining (Meeting Check-In, Active Client Ops, Providing Info, Budget/Pricing): agent-ac6a8b8f222f21f64.jsonl
- 4 NEW categories (Frustration, Re-engagement, On Hold, Positive Proposal): agent-acf6dc3912b48c62e.jsonl
- Gap fills (Vendor Pitch 5, Meeting Check-In 5, Negotiation/Counter-Offer 5, Contract/Proposal Ack 5): agent-ad84d9c66238a8626.jsonl
- Gap fills (Active Client Ops 5, Providing Info 5, Off-Platform 5): agent-aa76389cce46a794b.jsonl
- Replacement example (Arik/Spring Media for Screening Q): agent-a77a27bacc0cda722.jsonl
