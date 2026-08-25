# Dental Sequence Updates -- August 18, 2026
## New flows, text additions, newsletter bridge, and SDR dental pointers

All copy uses Peterson's voice. No em dashes. Casual texts. Plain-text emails.
Ad strategy context: 6-platform positioning (Google, Meta, TikTok, ChatGPT Ads, Programmatic, Bing), Dr. Laleh case study (5.7X ROAS, 105 consults, $200K+ additional monthly profit), Tooth Co ($60-80K/mo from $10K spend), Fusion Dental (4X ROAS, 5,000+ leads in 90 days, $18.62 CPL -- sourced from project_dental_marketing_plan.md), geographic exclusivity, progressive bracket pricing ($3K minimum).

**IMPORTANT: The master CRM plan (CRM-Automation-Plan-Creekside.md) still references "Barron" as the referral partner throughout. As of 2026-08-12, the referral partner is Keith McGonigle. The CRM plan needs a separate update pass to replace all Barron references with Keith before any implementer builds from it. This includes the `barron-referral` tag (should become `keith-referral`), pipeline stage 11 labels, custom field defaults, and stage transition notes.**

---

## 1. NEW FLOW: Form Abandonment (started form, didn't get blueprint)

### Overview
- **Entry:** Contact created in GHL from partial form submission (blueprint form step 1 or step 2 completed, but form not fully submitted)
- **Exit:** Completes the form (tag `lead-magnet-delivered` applied) OR Day 14 with no completion (moves to Nurture)
- **Cadence:** 2 hours after, Day 1, Day 3, Day 7, Day 14
- **Channels:** Email + Text
- **Tag:** `seq-form-abandonment`

### Suggested GHL Workflow Configuration

```
WORKFLOW: "Form Abandonment -- Dental"
TRIGGER: Contact Created from blueprint form (partial submission webhook or tag "form-started" applied)
STOP CONDITIONS: Tag "lead-magnet-delivered" added OR contact moves to Lost

[Action 1] Add Tag: "seq-form-abandonment"

--- 2 HOURS AFTER: SMS ---
[Wait] 2 hours
[If/Else] Tag "lead-magnet-delivered" exists? -> YES: Go to COMPLETED-EXIT. NO: Continue
[Action] Send SMS: Form abandonment text 1

--- 2 HOURS AFTER: EMAIL ---
[Wait] 30 minutes (staggers from SMS)
[If/Else] Tag "lead-magnet-delivered" exists? -> YES: Go to COMPLETED-EXIT. NO: Continue
[Action] Send Email: "Your Blueprint Is Almost Ready"

--- DAY 1: SMS ---
[Wait] 21 hours
[If/Else] Tag "lead-magnet-delivered" exists? -> YES: Go to COMPLETED-EXIT. NO: Continue
[Action] Send SMS: Form abandonment text 2

--- DAY 3: EMAIL ---
[Wait] 2 days
[If/Else] Tag "lead-magnet-delivered" exists? -> YES: Go to COMPLETED-EXIT. NO: Continue
[Action] Send Email: "What Your Blueprint Would Have Shown You"

--- DAY 7: SMS + EMAIL ---
[Wait] 4 days
[If/Else] Tag "lead-magnet-delivered" exists? -> YES: Go to COMPLETED-EXIT. NO: Continue
[Action] Send SMS: Form abandonment text 3
[Wait] 2 hours
[Action] Send Email: "Still Want Your Free Blueprint?"

--- DAY 14: FINAL EMAIL ---
[Wait] 7 days
[If/Else] Tag "lead-magnet-delivered" exists? -> YES: Go to COMPLETED-EXIT. NO: Continue
[Action] Send Email: "Last Chance for Your Blueprint"

--- NURTURE EXIT (Day 17, no completion) ---
[If/Else] Tag "lead-magnet-delivered" exists? -> YES: Go to COMPLETED-EXIT. NO: Continue
[Action] Add Tag: "nurture-pool" (triggers SEQ 1 with newsletter bridge)
[Action] Remove Tag: "seq-form-abandonment"
NOTE: No extra wait here. The newsletter bridge in SEQ 1 handles pacing (Day 1 intro email, Day 2 Buttondown enrollment, Day 5 first content).

--- COMPLETED-EXIT ---
[Action] Remove Tag: "seq-form-abandonment"
(Blueprint delivery triggers SEQ 4 entry via "Blueprint Received" pipeline stage)
```

### SMS Templates

**Text 1 -- 2 hours after abandonment**
```
Hey {{contact.first_name}}, looks like you started your Paid Ads Blueprint but didn't finish. It only takes a couple more minutes and you'll get a custom breakdown of where your practice is leaving patients on the table. Here's the link to pick up where you left off: [BLUEPRINT FORM LINK] -- Peterson, Creekside
```

**Text 2 -- Day 1**
```
Hey {{contact.first_name}}, just wanted to make sure you saw this. Your Paid Ads Blueprint is free and built specifically for your practice. Takes about 3 minutes to finish: [BLUEPRINT FORM LINK] -- Peterson
```

**Text 3 -- Day 7**
```
Hey {{contact.first_name}}, your blueprint is still waiting. Most practices we work with find at least 2-3 platforms where they're completely invisible to potential patients. Worth 3 minutes to find out: [BLUEPRINT FORM LINK] -- Peterson
```

### Email Templates

**Email 1 -- 2.5 hours after (Subject: Your blueprint is almost ready)**
```
Subject: Your blueprint is almost ready
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Looks like you started your Paid Ads Blueprint but didn't finish. No worries, it happens.

Here's the thing: the blueprint is built specifically for your practice based on the information you shared. It covers your growth potential across 6 platforms (Google, Meta, TikTok, ChatGPT Ads, Programmatic, and Bing) and shows you exactly where you're leaving patients on the table.

It takes about 3 more minutes to complete:

[BLUEPRINT FORM LINK]

Once you finish, you'll get your custom blueprint within 5 minutes. No cost, no commitment. Just a clear picture of what your ads should be doing for you.

Peterson
Creekside Marketing
Specialized Patient Acquisition for Dental Practices
```

**Email 2 -- Day 3 (Subject: What your blueprint would have shown you)**
```
Subject: What your blueprint would have shown you
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Since you didn't finish your Paid Ads Blueprint, I wanted to share the kind of thing it would have flagged for you.

The number one gap we see in cosmetic and implant dental practices: running ads on one platform and assuming you're covered. In reality, your ideal patients are searching on Google, scrolling Meta, watching TikTok, and now even asking ChatGPT for recommendations.

If you're only showing up in one or two of those places, you're handing cases to whoever is showing up in the other four.

We built a practice's blueprint recently that showed they were invisible on 4 out of 6 platforms. That's patients actively looking for cosmetic dental work and finding their competitors instead.

Your blueprint would show you exactly where those gaps are for your practice. Still free, still takes about 3 minutes:

[BLUEPRINT FORM LINK]

Peterson
```

**Email 3 -- Day 7 (Subject: Still want your free blueprint?)**
```
Subject: Still want your free blueprint?
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Quick follow-up. Your Paid Ads Blueprint is still available.

Here's what practices that have completed theirs are doing with it:

- Identifying which platforms their competitors are using that they're not
- Seeing exactly how many additional consultations they could generate per month
- Finding out where their ad spend is going to waste

Dr. Laleh, one of our cosmetic dental clients, was spending $110K/month on ads before she worked with us. Her campaigns were optimizing for the wrong thing. After we changed the strategy, her consultations jumped from 50 to 105 per month. Same budget. 5.7X return on ad spend.

Your blueprint won't cost you anything. It will show you whether you have the same kind of gaps in your ad strategy.

[BLUEPRINT FORM LINK]

Peterson
Creekside Marketing
```

**Email 4 -- Day 14 (Subject: Last chance for your blueprint)**
```
Subject: Last chance for your blueprint
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Last note from me on this. Your Paid Ads Blueprint is still waiting for you to finish it.

If now isn't the right time, I get it. I'll stop following up on the blueprint and just send you useful dental marketing insights every now and then instead.

But if you've been meaning to finish it, here's the link: [BLUEPRINT FORM LINK]

Either way, appreciate you checking us out. We're here whenever you're ready.

Peterson
Creekside Marketing
Specialized Patient Acquisition for Dental Practices
```

---

## 2. TEXT ADDITIONS: SEQ 4 (Post-Blueprint No-Book)

These pair with the 5 existing emails (Days 2, 4, 7, 14, 30). Blueprint delivery email is handled by the blueprint engine.

### New SMS Templates

**Text 1 -- Day 1 (day after blueprint delivered, before Email 1 on Day 2)**
```
Hey {{contact.first_name}}, it's Peterson from Creekside. Did you get a chance to look at your Paid Ads Blueprint? Check out the platform gap analysis section. That's where the biggest opportunities usually are. Let me know if you have any questions.
```

**Text 2 -- Day 3 (between Email 1 Day 2 and Email 2 Day 4)**
```
Hey {{contact.first_name}}, quick question. After looking at your blueprint, are you running ads on more than one platform right now? Most practices we work with find they're missing 3-4 channels where their patients are actively looking. Happy to walk through it on a quick call: {{custom_values.cades_calendar}}
```

**Text 3 -- Day 10 (between Email 3 Day 7 and Email 4 Day 14)**
```
Hey {{contact.first_name}}, just checking in. Your blueprint showed some gaps that are worth addressing sooner rather than later. The practices that move first in each market get the lowest ad costs. Happy to talk through it whenever you're ready: {{custom_values.cades_calendar}} -- Peterson
```

**Text 4 -- Day 21 (between Email 4 Day 14 and Email 5 Day 30)**
```
Hey {{contact.first_name}}, Peterson from Creekside. If the timing isn't right for a call, no pressure at all. But if anything's changed and you want to talk through your blueprint, Cade's calendar is wide open: {{custom_values.cades_calendar}}
```

### Updated SEQ 4 Workflow (text additions only)

```
--- DAY 1: SMS (new) ---
[Wait] 24 hours after blueprint delivered
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send SMS: Text 1

--- DAY 2: EMAIL (existing) ---
[Wait] 24 hours
... (existing Email 1: "Did You Catch the Biggest Gap?")

--- DAY 3: SMS (new) ---
[Wait] 24 hours
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send SMS: Text 2

--- DAY 4: EMAIL (existing) ---
... (existing Email 2: Dr. Laleh Case Study)

--- DAY 7: EMAIL (existing) ---
... (existing Email 3: Two Ways We Can Help)

--- DAY 10: SMS (new) ---
[Wait] 3 days
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send SMS: Text 3

--- DAY 14: EMAIL (existing) ---
... (existing Email 4: 5.7X Return on Ad Spend)

--- DAY 21: SMS (new) ---
[Wait] 7 days
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send SMS: Text 4

--- DAY 30: EMAIL (existing) ---
... (existing Email 5: Still Thinking It Over?)

--- NURTURE EXIT (Day 37) ---
(existing logic)
```

---

## 3. TEXT ADDITIONS: SEQ 6 (No-Show Recovery)

Currently has: 1 SMS (1hr after) + 2 emails (Day 1, Day 3). Adding texts for Day 1 and Day 3.

### New SMS Templates

**Text 2 -- Day 1 (morning after no-show, pairs with Day 1 email sent later that day)**
```
Hey {{contact.first_name}}, no worries about yesterday. Things come up. Here's a link to grab a new time whenever works for you: {{custom_values.cades_calendar}} -- Peterson
```

**Text 3 -- Day 3 (same day as Day 3 email, sent morning, email sent afternoon)**
```
Hey {{contact.first_name}}, last text from me on this. If you still want to talk through your ad strategy, here's the calendar: {{custom_values.cades_calendar}}. If the timing just isn't right, totally fine. -- Peterson
```

### Updated SEQ 6 Workflow (text additions only)

```
--- 1 HOUR AFTER: SMS (existing) ---
... (existing Text 1: "looks like we missed each other")

--- DAY 1 MORNING: SMS (new) ---
[Wait] until next day 9:00 AM contact timezone
[If/Else] Tag "call-booked" exists? -> YES: Go to REBOOKED-EXIT. NO: Continue
[Action] Send SMS: Text 2

--- DAY 1 AFTERNOON: EMAIL (existing) ---
[Wait] 4 hours
... (existing Email 1: "Let's reschedule")

--- DAY 3 MORNING: SMS (new) ---
[Wait] until Day 3 9:00 AM contact timezone
[If/Else] Tag "call-booked" exists? -> YES: Go to REBOOKED-EXIT. NO: Continue
[Action] Send SMS: Text 3

--- DAY 3 AFTERNOON: EMAIL (existing) ---
[Wait] 4 hours
... (existing Email 2: "Still interested in improving your ads?")

--- NURTURE EXIT (Day 7) ---
(existing logic)
```

---

## 4. TEXT ADDITIONS: SEQ 2 (Pre-Call Warm-Up)

Currently has: 3 emails (immediate, +24hr, 2 days before) + 2 SMS (morning-of, 1hr before). Adding a booking confirmation text and a day-before text.

### New SMS Templates

**Text 0 -- Immediately after booking (new, fires before Email 1)**
```
Hey {{contact.first_name}}, you're on the calendar! Looking forward to talking through your ad strategy. You'll get an email shortly with everything you need to know before our call. -- Peterson, Creekside
```

**Text 1.5 -- Day before call (new, pairs with Email 3 "Quick Homework")**
```
Hey {{contact.first_name}}, our call is tomorrow. If you can, have your ad account login handy so we can look at your campaigns together. If not, no stress. See you tomorrow! -- Peterson
```

### Updated SEQ 2 Workflow (text additions only)

```
--- IMMEDIATELY: SMS (new) ---
[Action] Send SMS: Text 0 (booking confirmation)

--- IMMEDIATELY: EMAIL (existing) ---
[Wait] 10 minutes
... (existing Email 1: "What to Expect")

--- +24 HOURS: EMAIL (existing, conditional) ---
... (existing Email 2: Social Proof, skip if call within 36hr)

--- DAY BEFORE: SMS (new) ---
[Wait Until] Day before {{contact.scheduled_call_date}}, 10:00 AM contact timezone
[If/Else] Call already happened? -> YES: EXIT. NO: Continue
[Action] Send SMS: Text 1.5

--- DAY BEFORE: EMAIL (existing) ---
[Wait] 2 hours
... (existing Email 3: "Quick Homework")

--- MORNING OF: SMS (existing) ---
... (existing Text 1: morning-of message)

--- 1 HOUR BEFORE: SMS (existing) ---
... (existing Text 2: one hour reminder)
```

---

## 5. NEWSLETTER BRIDGE: Addition to Front of SEQ 1 (Monthly Nurture)

This replaces the current 3-day wait at the start of SEQ 1. When someone enters `nurture-pool`, they first get the newsletter intro email, then get enrolled in Buttondown, then the monthly nurture loop starts.

### Updated SEQ 1 Entry (replaces current [Wait] 3 days)

```
WORKFLOW: "SEQ 1 -- Monthly Nurture" (UPDATED ENTRY)
TRIGGER: Tag Added = "nurture-pool"

[Action 1] Add Tag: "seq-monthly-nurture"
[Action 2] Remove Tag: "seq-post-leadmagnet" (cleanup)
[Action 3] Remove Tag: "seq-postcall-followup" (cleanup)
[Action 4] Remove Tag: "seq-noshow-recovery" (cleanup)
[Action 5] Remove Tag: "seq-form-abandonment" (cleanup, new)

--- DAY 1: NEWSLETTER INTRO EMAIL ---
[Wait] 24 hours
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Newsletter Intro"

--- DAY 2: BUTTONDOWN ENROLLMENT ---
[Wait] 24 hours
[Action] Webhook: POST to Buttondown API to add subscriber
         URL: https://api.buttondown.com/v1/subscribers
         Headers: Authorization: Token {{BUTTONDOWN_API_KEY}}
         Body: {"email": "{{contact.email}}", "metadata": {"source": "dental_nurture", "first_name": "{{contact.first_name}}"}}

--- DAY 5: MONTH 1 (existing nurture content starts) ---
[Wait] 3 days
... (existing Month 1: Value Insight email, then monthly rotation)
```

### Newsletter Intro Email

```
Subject: Something free for you
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Sorry we weren't able to connect or find the right time to work together. That happens, and there are no hard feelings on our end.

We still want to be able to provide you value. We put out a newsletter with practical dental marketing tips, ad strategy breakdowns, and real results from campaigns we're running. No pitches, just useful stuff you can apply to your practice.

You'll start getting it in the next week or so. If it's not for you, there's an unsubscribe link at the bottom of every email. One click and you're out.

And if your situation ever changes and you want to revisit working together, my calendar is always open:
{{custom_values.cades_calendar}}

Appreciate you,
Peterson

Creekside Marketing
Specialized Patient Acquisition for Dental Practices
```

---

## 6. SDR AGENT: Dental-Specific Pointers

These go into the SDR agent as guidance for when the lead came through the dental marketing funnel. Not GHL flows. The SDR (or whoever is managing the conversation) uses these pointers to craft appropriate follow-ups.

### Pre-Call Ghost (conversation started, never booked)

**Context:** Dental funnel lead was in an active conversation (email, SMS, or GHL) but stopped responding before booking a call.

**Dental-specific pointers:**

1. **Reference what they saw on the site.** Tie back to the landing page or confirmed page content: "You saw what we did for Dr. Laleh. The same approach applies to practices at your spend level." More concrete than a generic follow-up.

2. **Use the geographic exclusivity angle.** Dental practices are local businesses. "We only work with one practice per market. If you're interested, it's worth locking in your area before we bring on someone else in [their city]." This creates real urgency without being pushy.

3. **Lead with platform-specific insight.** Dental practice owners respond to specifics, not generalities. Instead of "we can help with your ads," try: "Most cosmetic dental practices are still only running Google and Meta. The ones adding ChatGPT Ads and TikTok right now are getting patients at half the cost because nobody else in their market is there yet."

4. **Acknowledge the hesitation directly.** Dental practice owners have been burned by agencies. Don't dance around it: "I know you've probably had agencies promise you the world before. We're selective about who we take on because we only work with practices we know we can grow. If we didn't think there was a real opportunity here, we wouldn't be having this conversation."

5. **Point them to the VSL or landing page.** If they haven't engaged with the confirmed page content: "Did you get a chance to watch the 5-minute video on your confirmation page? It covers how we generate results for dental practices and will make our conversation a lot more productive."

6. **Cadence:** Follow the standard SDR touch cadence (3-in-7d for active threads, day 14 pricing touch, 60-day nurture). No dental-specific cadence changes needed.

7. **Tone:** Peer-to-peer, not salesy. These are practice owners who went to dental school, not marketing people. Keep it practical and results-focused. Mention specific numbers (5.7X ROAS, 105 consultations, $200K additional monthly profit) rather than vague promises.

### Post-Call Ghost (had the call, went silent)

**Context:** Dental funnel lead had a strategy call with Cade, seemed interested, but has gone silent. May have received a proposal.

**Dental-specific pointers:**

1. **Reference something specific from the call.** Always tie back to what they actually said on the call. "You mentioned your cost per consultation was around $X. Based on what we've seen with similar practices, we think we can cut that significantly." Generic follow-ups get ignored. Specific callbacks get responses.

2. **Use comparable case studies.** Match their situation to the right proof point:
   - Spending $10K-$30K/mo? Reference Tooth Co ($60-80K revenue from $10K spend, 6-8X ROAS)
   - Spending $30K-$80K/mo? Reference Fusion Dental (4X ROAS, 5,000+ leads in 90 days, competing against ClearChoice)
   - Spending $80K+/mo? Reference Dr. Laleh (5.7X ROAS, 105 consults, $200K+ additional monthly profit)

3. **Address the most common dental objections in the follow-up:**
   - **Price:** "Our fee is a fraction of the additional revenue we generate. Dr. Laleh's additional monthly profit is $200K+. Our management fee is a small percentage of that."
   - **Current agency:** "Ask them for your cost per lead trend over the last 90 days, your conversion rate from lead to consultation, and what tests they've run in the last 30 days. If they can't answer those clearly, that tells you something."
   - **Timing:** "The practices that start now have a 60-90 day head start on data collection and optimization. By the time your 'right time' arrives, you'd already have a dialed-in campaign instead of starting from scratch."
   - **Partner decision:** "Would it help if we did a quick 15-minute call with both of you? We can walk them through the highlights without rehashing everything."

4. **Pivot to the paid audit if full management stalls.** "If full management isn't the right move right now, we also do a one-time $1,000 deep-dive audit. You get a complete action plan you can hand to any team to implement."

5. **Know when to back off.** After 3-4 unanswered follow-ups, don't keep pushing. One final message: "I don't want to be that guy who keeps following up forever. If your situation changes, my calendar is always open: [link]. I'll keep sending you useful stuff in the meantime." Then let the nurture flow handle it.

6. **Never quote dollar figures from call transcripts or sdr_responses.** If you need specific numbers the prospect shared, reference them indirectly: "Based on the budget range you mentioned on our call" rather than quoting the exact figure.

7. **Handle the contract objection.** If they're worried about being locked in: "We start with a 90-day agreement so we have enough runway to actually optimize your campaigns and prove the results. After that, it goes month-to-month. No long-term lock-in. Most agencies lock you in for 12 months. We don't, because we'd rather keep you by performing than by contract."

8. **Tone:** Same as pre-call. Direct, specific, no fluff. These people already know who you are. They need a reason to act, not another introduction.

---

## SEQUENCE NOTES (applies to all new copy above)

- All emails should have a plain-text feel (no heavy HTML templates, no graphics)
- Include unsubscribe link per CAN-SPAM on all emails
- SMS messages should be under 300 characters where possible (160 ideal but not always realistic)
- If the prospect books a call at any point, stop all active sequences
- If the prospect replies at any point, flag for manual review
- No em dashes anywhere
- Calendar links use GHL Custom Value `cades_calendar`
- Blueprint form links use [BLUEPRINT FORM LINK] placeholder (wire to actual URL)
- Newsletter enrollment uses Buttondown API (existing Creekside Buttondown account)
- All copy leverages the 6-platform positioning and case study proof points from the dental ad strategy
