# All Dental Sequences, First Draft (August 22, 2026)
## Complete copy for all 4 flows. All messages from Cade.

Sender on everything: Cade MacLean, cade@creeksidemarketingpros.com
Sign-off: Cade, Creekside Marketing

No blueprint references. No 3X ROAS guarantee. Aligned with current funnel:
Ad (pain-point talking head) -> Landing page (/dental-ads-audit/) -> Qualification form (/dental/start/) -> Booking page -> Confirmed/VSL page -> Call with Cade.

---
---

# SEQUENCE 1: PRE-CALL WARM-UP

**Trigger:** Booked Call Date field is set
**Exit:** Opportunity moves to no-show, lost, or referred
**Re-entry:** Yes (if they rebook after a no-show, they go through this again)
**On entry:** Add tag seq-precall-warmup, move opportunity to "call booked" stage, remove other sequence tags

## Pair 1: Immediately After Booking

### SMS 1 (immediate)

```
Hey {{ contact.first_name }}, you're booked! Before your call, watch the 5-minute video on your confirmation page if you haven't already. It'll make our conversation a lot more productive. Talk soon. | Cade, Creekside
```

### Email 1 (5 minutes after)

**Subject:** You're booked. One thing before your call

```
Hey {{ contact.first_name }},

Your strategy call is confirmed. You'll find the details in your calendar invite.

One thing before we talk: there's a short video on the page you just came from that walks through exactly how we generate results for dental practices. If you closed the tab before watching it, here's the link:

https://creeksidemarketingpros.com/dental/start/confirmed/

It's about 5 minutes and covers the system behind the numbers you saw on our site. Watching it before your call means we can skip the overview and get straight into your specific situation.

Quick note: we're selective about who we work with. We only take on practices we know we can grow, and we limit the number of practices per market. The fact that you qualified through our form means we think there's a real opportunity here.

Looking forward to it.

Cade
Creekside Marketing
```

---

## Pair 2: Day Before the Call (9:00 AM contact timezone)

### SMS 2

```
Hey {{ contact.first_name }}, our call is tomorrow. If you can, have your ad account login handy so we can look at your numbers together. If not, no worries. See you tomorrow. | Cade
```

### Email 2 (9:30 AM)

**Subject:** Tomorrow: a few things worth knowing

```
Hey {{ contact.first_name }},

Quick note before our call tomorrow.

If you've worked with other ad teams before and felt like nothing changed, you're not alone. That's the most common thing we hear from dental practices that reach out to us. The difference with our approach is that we optimize for revenue and booked consultations, not clicks and impressions. That's why our clients see the numbers they do.

Here's what happens after our call if we both decide it's a good fit:

1. We audit your current ad accounts and identify exactly where money is being wasted
2. We build a campaign strategy specific to your practice and your market
3. Campaigns go live within 2 weeks of signing
4. You get regular reporting tied to actual revenue, not vanity metrics

No pressure on the call. If we're not the right fit, we'll tell you. We're selective about who we take on because we'd rather be honest than take your money.

To get the most out of our time, it helps to have:
- A rough idea of your monthly ad spend (or target budget)
- Access to your Google Ads or Meta Ads account (so we can look together)
- Any specific goals or frustrations you want to cover

If you don't have all of that, it's fine. We'll work with whatever you've got.

See you tomorrow.

Cade
Creekside Marketing
```

---

## Pair 3: Morning of the Call (8:00 AM contact timezone)

### SMS 3

```
Hey {{ contact.first_name }}, our call is today. We only work with one practice per market, so if your area is still open, today's a good day to lock it in. Check your calendar invite for the meeting link. | Cade
```

### Email 3 (8:30 AM)

**Subject:** In a few hours

```
Hey {{ contact.first_name }},

Our call is today. Here's a quick reminder of what to expect:

1. We'll ask about your practice, your patient flow, and how you're currently getting new patients
2. We'll identify the gaps and opportunities in your ad strategy
3. Honest conversation, no pitch deck

One thing worth mentioning: we limit the number of dental practices we take on per market. Once we're working with a practice in a given area, we won't take on a competitor. If your market is still available, this call is a good time to move on it.

Meeting link is in your calendar invite.

Talk soon.

Cade
Creekside Marketing
```

---
---

# SEQUENCE 2: NO-SHOW RECOVERY

**Trigger:** Opportunity moves to "no show" stage
**Exit:** Booked Call Date gets reset (they rebooked) OR Day 7 with no rebook -> enters Nurture sequence
**Re-entry:** Yes
**On entry:** Add tags no-show + seq-noshow-recovery, remove seq-precall-warmup

## SMS 1 (1 hour after no-show)

```
Hey {{ contact.first_name }}, looks like we missed each other for our call today. No worries, things come up. Here's a link to grab a new time: {{ custom_values.cades_calendar }} | Cade, Creekside Marketing
```

## Email 1 (1 hour after no-show, 5 min after SMS 1)

**Subject:** We missed each other

```
Hey {{ contact.first_name }},

Looks like we missed each other for our call today. No worries at all, things come up.

Here's a link to grab a new time whenever works for you:
{{ custom_values.cades_calendar }}

If something came up and you'd prefer a different time, just reply to this email and we'll find something that works.

Cade
Creekside Marketing
```

## SMS 2 (Day 1 morning, 9:00 AM contact timezone)

```
Hey {{ contact.first_name }}, no worries about yesterday. Things come up. Here's a link to grab a new time whenever works for you: {{ custom_values.cades_calendar }} | Cade
```

## Email 2 (Day 1, 1:00 PM contact timezone)

**Subject:** Let's reschedule

```
Hey {{ contact.first_name }},

No worries about yesterday. Things come up.

Here's my calendar for this week. Pick whatever works:
{{ custom_values.cades_calendar }}

Cade
Creekside Marketing
```

## SMS 3 (Day 3 morning, 9:00 AM contact timezone)

```
Hey {{ contact.first_name }}, last text from me on this. If you still want to talk through your ad strategy, here's the calendar: {{ custom_values.cades_calendar }}. If the timing just isn't right, totally fine. | Cade
```

## Email 3 (Day 3, 1:00 PM contact timezone)

**Subject:** Still interested in improving your ads?

```
Hey {{ contact.first_name }},

Wanted to reach out one more time. If you're still interested in talking about your ad strategy, here's the calendar:
{{ custom_values.cades_calendar }}

In the meantime, here's something useful: practices that diversify their ads across Google, Meta, and at least one emerging platform are generating significantly more consultations than single-platform practices at the same budget.

If the timing just isn't right, no hard feelings. We'll keep sending you useful stuff.

Cade
Creekside Marketing
```

**Day 7: No rebook -> Add tag "nurture-pool", remove no-show and seq-noshow-recovery tags. Contact enters Nurture sequence.**

---
---

# SEQUENCE 3: FORM COMPLETE, NO BOOK

**Trigger:** Tag "dental-qualified" added AND Booked Call Date is empty after 2 hours
**Exit:** Booked Call Date gets set at any point (they booked) -> exit immediately
**Day 14 exit:** If no booking by Day 14, add "nurture-pool" tag -> enters Nurture sequence
**On entry:** Add tag seq-form-nobook

## Pair 1: 2 Hours After Form Completion

### SMS 1

```
Hey {{ contact.first_name }}, thanks for filling out the form. You qualified, which means we think there's a real opportunity for your practice. Grab a time to talk through it: {{ custom_values.cades_calendar }} | Cade, Creekside
```

### Email 1 (30 min after SMS 1)

**Subject:** You qualified. Here's the next step

```
Hey {{ contact.first_name }},

Thanks for taking the time to fill out our form. Based on your answers, your practice is exactly the type we work with.

The next step is a 30-minute strategy call. Here's what that looks like:

1. We ask about your practice, your patient flow, and how you're currently getting new patients
2. We identify the gaps and opportunities in your ad strategy
3. Honest conversation, no pitch deck

We're selective about who we take on. We only work with practices we know we can grow, and we limit the number of practices per market. The fact that you qualified means we think there's real potential here.

Book a time that works for you:
{{ custom_values.cades_calendar }}

If you want to see how we get results before the call, here's a 5-minute video that walks through our system:
https://creeksidemarketingpros.com/dental/start/confirmed/

Cade
Creekside Marketing
```

---

## Pair 2: Day 3

### SMS 2

```
Hey {{ contact.first_name }}, quick question. Are you currently running ads for your practice, or thinking about starting? Either way, worth a conversation. {{ custom_values.cades_calendar }} | Cade
```

### Email 2 (30 min after SMS 2)

**Subject:** What we did for Dr. Laleh on the same budget

```
Hey {{ contact.first_name }},

Quick story.

Dr. Laleh runs a cosmetic dental practice in California. She was spending $110,000 a month on ads and getting a 2.7X return. 50 to 60 consultations a month. Her results had been flat for over a year.

We didn't increase her budget. We changed what the campaigns were optimizing for.

The result: consultations jumped from 50 to 105 per month. Return on ad spend went from 2.7X to 5.7X. Over $200,000 in additional monthly profit. Same ad spend.

That's the kind of thing we look for on a strategy call. Whether your budget is $5K or $100K a month, the approach is the same: find where the money is being wasted and redirect it toward revenue.

Worth 30 minutes to see what's possible for your practice:
{{ custom_values.cades_calendar }}

Cade
Creekside Marketing
```

---

## Pair 3: Day 7

### SMS 3

```
Hey {{ contact.first_name }}, we only take one dental practice per market. If your area is still open, it's worth a conversation before that changes: {{ custom_values.cades_calendar }} | Cade
```

### Email 3 (30 min after SMS 3)

**Subject:** Your market is still open

```
Hey {{ contact.first_name }},

One thing I wanted to mention: we limit the number of dental practices we work with per market. Once we take on a practice in a given area, we won't work with a competitor in that same market.

Your area is currently open. I can't guarantee how long that stays the case.

If you've been thinking about the call but haven't gotten around to it, here's the link:
{{ custom_values.cades_calendar }}

30 minutes, no pressure. If we're not the right fit, we'll tell you.

Cade
Creekside Marketing
```

---

## Day 14: Nurture Transition

### Email 4

**Subject:** No pressure

```
Hey {{ contact.first_name }},

I know the timing might not be right, and that's completely fine. I'm not going to keep following up about the call.

We still want to provide value though. We put out useful dental marketing content that you can apply to your practice whether we ever work together or not. You'll start seeing that in your inbox over the coming weeks.

If your situation changes and you want to revisit the conversation, the link is always here:
{{ custom_values.cades_calendar }}

Appreciate you taking the time to reach out.

Cade
Creekside Marketing
```

**Day 17: Add tag "nurture-pool", remove seq-form-nobook. Contact enters Nurture sequence.**

---
---

# SEQUENCE 4: NURTURE (6 Monthly Emails -> Newsletter Handoff)

**Trigger:** Tag "nurture-pool" added
**Exit:** Booked Call Date gets set at any point (they re-engage) -> exit immediately, remove nurture tags
**Flow:** 6 monthly emails (one per month, NOT looping), then a newsletter handoff email from Cade introducing Peterson, then Buttondown enrollment. After enrollment, Buttondown handles everything.
**On entry:** Add tag seq-monthly-nurture, remove other sequence tags

---

## Month 1 (3 days after entry): Value Insight

**Subject:** What's actually working in cosmetic dental ads right now

```
Hey {{ contact.first_name }},

Quick thought for you.

We've been running patient acquisition campaigns across cosmetic dental accounts this quarter, and there's a clear pattern: practices that run ads on more than one platform are generating significantly more consultations than single-platform practices at the same budget.

Most practices are still putting everything into one platform and hoping for the best. The ones pulling ahead are diversifying their ad spend and optimizing for booked consultations, not just leads.

If you want to see the data behind this, just reply and I'll send it over. No pitch, just the numbers.

Talk soon,
Cade
Creekside Marketing

P.S. If your situation's changed and you want to revisit working together, here's my calendar: {{ custom_values.cades_calendar }}
```

---

## Month 2 (30 days after Month 1): Mini Case Study

**Subject:** How a cosmetic dental practice cut their cost per consultation by 52%

```
Hey {{ contact.first_name }},

Wanted to share a quick win from one of our cosmetic dental clients.

The situation: They were spending $110K/month on ads with a high cost per consultation. Their previous team had them running broad targeting with generic creative and optimizing for form fills instead of revenue.

What we changed:
- Shifted optimization from leads to booked consultations and revenue
- Restructured campaigns around high-value services (veneers, implants)
- Built platform-specific creative instead of running the same ads everywhere

Result: Consultations jumped from 50 to 105 per month. Cost per consultation dropped from ~$2,200 to ~$1,050. Over $200,000 in additional monthly profit. Same budget.

Not saying your situation is identical, but the patterns tend to rhyme.

Cade
Creekside Marketing

P.S. Calendar's here if you ever want to talk through your account: {{ custom_values.cades_calendar }}
```

---

## Month 3 (30 days after Month 2): Platform Updates

**Subject:** Something changed in dental ads this month

```
Hey {{ contact.first_name }},

Quick heads up on something that might affect your ads.

The ad platforms keep changing how they serve dental-related ads. Targeting restrictions, creative approval rules, and bidding algorithms shift every few months. Most practices don't notice until their costs jump or their reach drops.

We keep all our client accounts updated as these changes roll out. If you're running your own campaigns or working with another team, make sure they're staying on top of platform updates. It's the kind of thing that quietly eats into your results if nobody's watching.

If you want to know what specifically changed and whether it affects your practice, just reply and I'll fill you in.

Cade
Creekside Marketing
```

---

## Month 4 (30 days after Month 3): Quick Win / DIY Tip

**Subject:** 2-minute fix that could save you money on ads

```
Hey {{ contact.first_name }},

Here's something you can do today that most practices miss:

Go into your Google Ads account, click Campaigns > Settings > Locations. Change from "Presence or interest" to "Presence only." This stops showing your ads to people who are just researching your area but don't actually live there. For dental practices, this is one of the biggest sources of wasted spend we see.

It takes 2 minutes and we've seen it reduce wasted spend by 10-25% for practices running local campaigns.

Try it and let me know what happens.

Cade
Creekside Marketing
```

---

## Month 5 (30 days after Month 4): Social Proof

**Subject:** $60K in new monthly revenue from $10K in ad spend

```
Hey {{ contact.first_name }},

Here's what happened with a cosmetic dental practice that started where a lot of our clients start.

Tooth Co came to us spending around $10,000 a month on ads. They had decent traffic but their campaigns were structured wrong. Broad targeting, no conversion tracking beyond form fills, and creative that looked like every other dental ad in their market.

We rebuilt their campaign structure around high-value services, set up proper attribution from ad click to booked consultation, and diversified their ad presence across Google and Meta.

Within 3 months: $60,000 to $80,000 per month in new revenue directly attributed to ads. From $10K in monthly spend.

Real quote from the owner: "They immediately got to work and I've seen collections jump instantly 25-33% monthly. Can't recommend them enough."

If your situation's changed and you want to talk, my calendar is here: {{ custom_values.cades_calendar }}

Cade
Creekside Marketing
```

---

## Month 6 (30 days after Month 5): Full-Arch / Implant Proof Point

**Subject:** 5,000 leads in 90 days for an implant practice

```
Hey {{ contact.first_name }},

One more result I wanted to share.

Fusion Dental Implants is a full-arch implant practice with 2 locations in Northern California. They're competing head-to-head with ClearChoice and Nubia in their market.

We ran campaigns across Meta, Google, Programmatic, and ChatGPT Ads simultaneously. The result: 5,000+ leads in 90 days at $18.62 average cost per lead. 4X return on ad spend. 30-40 arches per month at $36K-$38K average case value.

The key was going multi-platform instead of putting everything into one channel. Each platform reaches a different slice of patients, and when you stack them, the numbers compound.

Whether you do veneers, implants, or general cosmetic work, the multi-platform approach applies the same way.

Cade
Creekside Marketing
```

---

## Newsletter Handoff (7 days after Month 6)

### Email 7: Cade Introduces Peterson

**Subject:** Introducing you to someone

```
Hey {{ contact.first_name }},

I've enjoyed staying in touch over the past few months. I hope the tips and case studies have been useful, even if the timing hasn't been right for us to work together.

I want to introduce you to my partner Peterson Rainey. He writes a newsletter specifically for business owners about marketing, growth, and how to get more out of your ad spend. It's free, it's practical, and it's the kind of stuff you can actually apply to your practice.

You'll start getting it in the next week or so. If it's not for you, there's an unsubscribe link at the bottom of every email. One click and you're out.

And if your situation ever changes and you want to revisit working together, you know where to find me:
{{ custom_values.cades_calendar }}

It's been good connecting with you.

Cade
Creekside Marketing
```

### Day 9 after Month 6: Buttondown API Enrollment

Enroll the contact in Buttondown via API:
```
POST https://api.buttondown.com/v1/subscribers
Authorization: Token {{ env.BUTTONDOWN_API_KEY }}
Body: {"email": "{{ contact.email }}", "metadata": {"source": "dental_nurture", "first_name": "{{ contact.first_name }}"}}
```

**After enrollment: remove tag seq-monthly-nurture, remove tag nurture-pool. Sequence complete. Buttondown handles everything from here.**

---
---

# SEQUENCE NOTES (all flows)

- All emails are plain text feel. No heavy HTML, no images, no graphics.
- All messages come from Cade MacLean (cade@creeksidemarketingpros.com).
- Exception: after the newsletter handoff, Buttondown emails come from Peterson.
- Cade's calendar link uses the GHL custom value {{ custom_values.cades_calendar }}.
- No blueprint references anywhere (discontinued).
- No 3X ROAS guarantee.
- The orchestrator checks exit conditions before every send. If the contact booked (Booked Call Date gets set), the sequence exits immediately regardless of where it is.
- If a contact replies to any message, the orchestrator does NOT auto-stop. Replies are handled by Cade manually or by the SDR agent.
- Contact timezone is used for wall-clock sends. Fallback: America/Chicago.
- Case study numbers used: Dr. Laleh (5.7X ROAS, 105 consults, $200K+ profit), Tooth Co (6-8X ROAS, $60-80K/mo from $10K spend), Fusion Dental (4X ROAS, 5,000+ leads, $18.62 CPL).
