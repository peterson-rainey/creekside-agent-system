# Creekside CRM Automation Plan -- Full Build Specs (Dental)
## GoHighLevel (Get Pinnacle AI) Sequence Architecture
### Created: 2026-05-21 | Updated: 2026-05-30 (dental-specific, Google Calendar, nurture sequence aligned)

---

## Pre-Build Checklist (Blockers)

### 1. GHL API Key -- EXPIRED / REVOKED
- Current key `pit-a3cfcaf0...` returns 403 on all endpoints
- **Peterson action:** Go to GHL Settings > Integrations > Private Integrations > regenerate token
- Grant ALL scopes (contacts, calendars, workflows, conversations, opportunities, locations)
- Update `/Users/petersonrainey/C-Code - Rag database/.env` with new key

### 2. Google Calendar Booking for Cade
Booking is handled via Google Calendar appointment scheduling (NOT GHL's native calendar). The booking link routes directly to Cade's Google Calendar.

**Setup:**
- Cade's Google Calendar: cade@creeksidemarketingpros.com
- Appointment type: "Strategy Call - Cade"
- Duration: 30 minutes
- Buffer time: 15 minutes before and after
- Available hours: match Cade's working hours
- Google Calendar handles conflict checking natively

**GHL integration:** When a prospect books via the Google Calendar link, manually add the `call-booked` tag in GHL (or use a Zapier/Make webhook from Google Calendar to GHL to auto-tag). This triggers SEQ 2.

**Booking link:** Use the Google Calendar appointment scheduling URL as `[BOOKING LINK]` throughout all email templates.

### 3. Email Configuration
- Sender: Peterson's email (peterson@creeksidemarketingpros.com)
- Verify email domain in GHL: Settings > Email Services
- Set up DKIM/SPF/DMARC if not already done (critical for deliverability)

### 4. SMS Configuration
- A2P messaging confirmed enabled
- Verify phone number in GHL: Settings > Phone Numbers
- Register SMS campaign use case for A2P compliance

---

## Tag Taxonomy

Tags control sequence entry, exit, and routing. Consistent naming prevents workflow collisions.

| Tag | Applied When | Removed When |
|-----|-------------|--------------|
| `lead-magnet-delivered` | Blueprint sent to prospect | Never (permanent record) |
| `seq-post-leadmagnet` | Enters SEQ 4 | Books a call OR completes SEQ 4 |
| `call-booked` | Books via Google Calendar link | Call completed or no-show |
| `seq-precall-warmup` | Enters SEQ 2 | Call happens |
| `no-show` | Missed scheduled call | Rebooks or enters nurture |
| `seq-noshow-recovery` | Enters SEQ 6 | Rebooks or enters nurture |
| `call-completed` | Discovery/strategy call happened | Closes or moves to follow-up |
| `seq-postcall-followup` | Enters SEQ 3 | Signs or enters nurture |
| `client-signed` | Contract signed / first payment | Never (permanent record) |
| `seq-welcome` | Enters SEQ 5 | Onboarding complete |
| `nurture-pool` | Falls out of any active sequence | Books a call (re-enters SEQ 2) |
| `seq-monthly-nurture` | Enters SEQ 1 | Books a call or unsubscribes |
| `audit-purchased` | Buys $1K audit | Never (permanent record) |
| `unsubscribed` | Opts out of all sequences | Never (permanent record) |
| `barron-referral` | Below $10K threshold, routed to Barron | Never |
| `disqualified` | Below $2K, not a fit | Never |

**Naming convention:** `seq-` prefix = currently in a sequence. Non-prefixed = permanent status tags.

---

## Custom Fields Required

Create these in GHL: Settings > Custom Fields > Contact

| Field Name | Field ID (suggested) | Type | Purpose |
|-----------|---------------------|------|---------|
| `Industry` | `cf_industry` | Dropdown | Set to "Cosmetic Dental" for all dental leads |
| `Monthly Ad Spend` | `cf_monthly_ad_spend` | Number | From questionnaire |
| `Current Revenue` | `cf_monthly_revenue` | Number | From questionnaire |
| `Location` | `cf_location` | Text | City/State from questionnaire |
| `Website URL` | `cf_website` | Text | From questionnaire |
| `Blueprint Delivered` | `cf_blueprint_delivered` | Date | When blueprint was sent |
| `Blueprint URL` | `cf_blueprint_url` | Text | Link to their personalized blueprint |
| `Lead Source` | `cf_lead_source` | Dropdown | Meta Ads / Google Ads / Upwork / Referral / Organic |
| `Call Type` | `cf_call_type` | Dropdown | Discovery / Follow-Up / Close |
| `Call Date` | `cf_call_date` | Date | Scheduled call date |
| `Post-Call Notes` | `cf_postcall_notes` | Large Text | AI-populated from Fathom transcript |
| `Primary Objection` | `cf_primary_objection` | Dropdown | Price / Timing / Partner Decision / Current Agency / DIY |
| `Nurture Content Month` | `cf_nurture_month` | Number | Tracks which month of nurture rotation (1-6) |
| `Qualification Status` | `cf_qual_status` | Dropdown | Qualified / Under Threshold / Disqualified |
| `Referred To` | `cf_referred_to` | Text | "Barron" or other referral partner |

---

## Sequence 1: Monthly Nurture (The Long Game)

### Overview
- **Entry:** Tag `nurture-pool` added
- **Exit:** Books a call (tag `call-booked` added) OR tag `unsubscribed`
- **Cadence:** 1 email per month, rotating 6 topics
- **Build method:** HYBRID -- Railway generates content monthly, GHL sends on schedule

### GHL Workflow Configuration

```
WORKFLOW: "SEQ 1 -- Monthly Nurture"
TRIGGER: Tag Added = "nurture-pool"
PUBLISH STATUS: Draft (until Railway pipeline is built)

[Action 1] Add Tag: "seq-monthly-nurture"
[Action 2] Remove Tag: "seq-post-leadmagnet" (cleanup from SEQ 4)
[Action 3] Remove Tag: "seq-postcall-followup" (cleanup from SEQ 3)
[Action 4] Remove Tag: "seq-noshow-recovery" (cleanup from SEQ 6)

--- MONTH 1: Value Insight ---
[Wait] 3 days (don't email immediately after going cold)
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Nurture -- Value Insight" (template below)
[Action] Update Custom Field: cf_nurture_month = 1

--- MONTH 2: Mini Case Study ---
[Wait] 30 days
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Nurture -- Mini Case Study"
[Action] Update Custom Field: cf_nurture_month = 2

--- MONTH 3: What We're Seeing ---
[Wait] 30 days
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Nurture -- Platform Updates"
[Action] Update Custom Field: cf_nurture_month = 3

--- MONTH 4: Quick Win / DIY Tip ---
[Wait] 30 days
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Nurture -- Quick Win"
[Action] Update Custom Field: cf_nurture_month = 4

--- MONTH 5: Soft CTA ---
[Wait] 30 days
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Nurture -- What's New at Creekside"
[Action] Update Custom Field: cf_nurture_month = 5

--- MONTH 6: Loop Back ---
[Wait] 30 days
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Nurture -- Value Insight (Month 6)"
[Action] Update Custom Field: cf_nurture_month = 6
[Action] Update Custom Field: cf_nurture_month = 0 (reset)
[Go To] MONTH 1 (loop indefinitely)

--- EXIT ---
[Action] Remove Tag: "seq-monthly-nurture"
[Action] Remove Tag: "nurture-pool"
```

### Railway Pipeline (for AI content)
A monthly Railway cron job that:
1. Pulls recent Creekside case study results from `meta_insights_daily` / `google_ads_insights_daily`
2. Pulls recent blog posts from `seo_content_queue` (published)
3. Fetches 2-3 marketing industry news items via web search
4. For each contact in `nurture-pool`:
   - Uses dental-specific content angles
   - Generates email body using Claude API
   - Writes the content to a GHL custom field or sends via GHL conversations API
5. Triggers the GHL workflow step

**Alternative (simpler v1):** Skip Railway entirely for v1. Use the dental-specific templated emails in GHL. Add AI personalization in v2 once the basic flow is proven.

### Email Templates

**Month 1 -- Value Insight**
```
Subject: What's actually working in cosmetic dental ads right now
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Quick thought for you.

We've been running patient acquisition campaigns across a few
dozen cosmetic dental accounts this quarter, and there's a clear
pattern showing up: practices that run ads on 3+ platforms
(Google, Meta, and at least one of TikTok/ChatGPT Ads) are
generating 40-60% more consultations than single-platform practices
at the same budget.

Most practices are still dumping everything into one platform and
hoping for the best. The ones pulling ahead are diversifying their
ad spend and optimizing for booked consultations, not just leads.

If you want to see the data behind this, just reply and I'll send
it over. No pitch, just the numbers.

Talk soon,
Peterson

P.S. If your situation's changed and you want to revisit working
together, here's my calendar: [BOOKING LINK]
```

**Month 2 -- Mini Case Study**
```
Subject: How a cosmetic dental practice cut their cost per consultation by 43%
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Wanted to share a quick win from one of our cosmetic dental clients.

The situation: They were spending $110K/month on Meta and Google ads
with a high cost per consultation. Previous agency had them running
broad targeting with generic creative and optimizing for form fills
instead of revenue.

What we changed:
- Shifted optimization from leads to booked consultations and revenue
- Restructured campaigns around high-value services (veneers, implants)
- Built platform-specific creative instead of running the same ads everywhere

Result: Consultations jumped from 50 to 105 per month. ROAS went from
2.7X to 5.7X. Over $200,000 in additional monthly profit. Same budget.

Not saying your situation is identical, but the patterns tend to rhyme.

Peterson

P.S. Calendar's here if you ever want to talk through your account:
[BOOKING LINK]
```

**Month 3 -- Platform Updates**
```
Subject: [Meta/Google] just changed [THING] -- here's what it means for you
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Quick heads up on something that might affect your ads.

[PLATFORM] rolled out [CHANGE] this month. Here's what it means
in plain English:

- [IMPACT 1]
- [IMPACT 2]
- [WHAT TO DO ABOUT IT]

We've already adjusted all our client accounts. If you're running
your own campaigns or working with another team, make sure they're
on top of this.

Peterson
```

**Month 4 -- Quick Win**
```
Subject: 10-minute fix that could save you $X/month on ads
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Here's something you can do today that most businesses miss:

Go into your Google Ads account, click Campaigns > Settings >
Locations. Change from "Presence or interest" to "Presence only."
This stops showing your ads to people who are just researching
your area but don't actually live there. For dental practices,
this is one of the biggest sources of wasted spend we see.

It takes 2 minutes and we've seen it reduce wasted spend by 10-25%
for practices like yours.

Try it and let me know what happens.

Peterson
```

**Month 5 -- What's New**
```
Subject: Few things we've been building
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Quick update on what we've been up to at Creekside:

- [NEW CAPABILITY OR SERVICE]
- [RECENT RESULT OR EXPANSION]
- [SOMETHING RELEVANT TO THEIR INDUSTRY]

Not trying to sell you on anything. Just figured you'd want to know
where we're at since we last talked.

If any of this is relevant to where your practice is right now,
happy to chat: [BOOKING LINK]

Peterson
```

**Month 6 -- Fresh Value Insight (new content)**
```
Subject: The #1 mistake cosmetic dental practices make with paid ads
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

We audited over 30 cosmetic dental ad accounts this past quarter.
The single most common mistake?

Optimizing for leads instead of revenue. Practices celebrate form
fills and phone calls while ignoring whether those leads actually
show up and accept treatment. The result: inflated lead numbers,
a busy front desk, and a practice owner wondering why revenue
hasn't moved.

Here's what the top-performing practices do instead:
1. Track all the way from ad click to consultation to case accepted
2. Optimize campaigns for booked consultations, not form fills
3. Run ads on multiple platforms so they're not invisible on 4 out of 6 channels

If you want us to take a look at your account and see if this
applies, we do a one-time deep-dive audit for $1,000 that gives
you a complete action plan. No ongoing commitment required.

Details here if you're interested: [AUDIT INFO LINK]

Peterson
```

---

## Sequence 2: Pre-Call Warm-Up

### Overview
- **Entry:** Opportunity moved to "Call Booked" stage in Dental Pipeline
- **Exit:** Call time arrives OR opportunity moves to No Show/Lost/Referred
- **Cadence:** Fires immediately, drips until call date
- **Build method:** GHL-NATIVE (templated content)
- **Re-entry:** Yes (if contact rebooks after a no-show)

### GHL Workflow Configuration

```
WORKFLOW: "SEQ 2 -- Pre-Call Warm-Up"
TRIGGER: Pipeline Stage Changed = "Call Booked" (Dental Pipeline, stage ID: 8ad8a351-f55b-4fdc-b79d-41e2ba86e092)
STOP CONDITIONS: Opportunity moves to "Lost", "Referred", or "No Show"

[Action 1] Add Tag: "seq-precall-warmup"
[Action 2] Remove Tag: "seq-post-leadmagnet" (if coming from SEQ 4)
[Action 3] Remove Tag: "seq-monthly-nurture" (if coming from SEQ 1)
[Action 4] Remove Tag: "nurture-pool"
[Action 5] Remove Tag: "seq-noshow-recovery" (if coming from SEQ 6)

--- EMAIL 1: Immediately ---
[Action] Send Email: "Pre-Call -- What to Expect"

--- EMAIL 2: +24 hours (skip if call is within 36 hours) ---
[Wait] 24 hours
[If/Else] scheduled_call_date is today or tomorrow? -> YES: Skip to SMS 1. NO: Continue
[Action] Send Email: "Pre-Call -- Social Proof"

--- EMAIL 3: 2 days before call ---
[Wait Until] 2 days before {{contact.scheduled_call_date}}
[If/Else] scheduled_call_date already passed? -> YES: Go to EXIT. NO: Continue
[Action] Send Email: "Pre-Call -- Quick Homework"

--- SMS 1: Morning of call ---
[Wait Until] Day of {{contact.scheduled_call_date}}, 8:00 AM contact's timezone
[Action] Send SMS: Morning-of message

--- SMS 2: 1 hour before ---
[Wait Until] 1 hour before scheduled call time
[Action] Send SMS: One hour reminder

--- EXIT ---
[Action] Remove Tag: "seq-precall-warmup"
```

### Email Templates

**Email 1 -- What to Expect (immediately)**
```
Subject: Your strategy call is booked -- here's what to expect
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

You're on the calendar for {{contact.scheduled_call_date}}. Here's what's going to happen on our call:

1. You'll tell us about your practice and what you're trying to accomplish with paid ads
2. We'll ask a few questions about your current setup, budget, and goals
3. If it makes sense, we'll walk through what a campaign strategy would look like for your specific situation

This isn't a hard sell. We turn down about 40% of the businesses that reach out to us because we only take clients where we're confident we can deliver results. If we're not the right fit, we'll tell you.

You'll find the meeting link in your calendar invite. If you need to reschedule:
{{custom_values.cades_calendar}}

Talk soon,
Peterson
Creekside Marketing
```

**Email 2 -- Social Proof (+24 hours)**
```
Subject: What we've done for dental practices like yours
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Before our call on {{contact.scheduled_call_date}}, wanted to share a few quick results from dental practices we work with:

The Tooth Co (cosmetic dental):
- Came to us spending $10K/month on ads with broad targeting and no real conversion tracking
- Within 3 months: $60,000-$80,000 per month in new revenue directly from ads
- What changed: rebuilt campaign structure, proper attribution, multi-platform presence

Dr. Laleh (cosmetic dental, California):
- Before: 50 consultations/month, 2.7X return on $110K/month in ads
- Within 90 days: 105+ consultations, 5.7X ROAS. Full optimization at 6 months.
- What changed: shifted optimization from leads to revenue and booked consultations

Real message from Dr. Laleh:
"We are at a record high of 100 consults! Whatever we are doing let's keep doing it!"

These aren't cherry-picked. This is what happens when campaigns are built correctly from the start.

See you on {{contact.scheduled_call_date}}.

Peterson
Creekside Marketing
```

**Email 3 -- Quick Homework (2 days before)**
```
Subject: Quick prep for our call on {{contact.scheduled_call_date}}
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Our call is coming up on {{contact.scheduled_call_date}}.

To make sure we pack as much value into our time as possible, it'd help if you have these handy:

- Your current monthly ad spend (or target budget)
- Admin access to your Google Ads / Meta Ads accounts (we can look at them together on the call)
- Any specific goals or pain points you want to cover

Don't stress if you don't have all of this. We can work with whatever you've got.

The meeting link is in your calendar invite. If you need to reschedule:
{{custom_values.cades_calendar}}

See you soon,
Peterson
Creekside Marketing
```

### SMS Templates

**SMS 1 -- Morning of call**
```
Hey {{contact.first_name}}, looking forward to our call today. I pulled some data on your industry -- excited to walk through it with you. Check your calendar invite for the meeting link. -- Peterson, Creekside Marketing
```

**SMS 2 -- 1 hour before**
```
Quick reminder -- our call is in about an hour. Meeting link is in your calendar invite. Talk soon! -- Peterson
```

---

## Sequence 3: Post-Call Follow-Up

### Overview
- **Entry:** Tag `call-completed` added (manually by Cade/Peterson after call, or via Fathom webhook)
- **Exit:** Signs (tag `client-signed`) OR goes cold after Day 21 (enters SEQ 1)
- **Cadence:** Days 1, 3, 5, 7, 14, 21
- **Build method:** GHL-NATIVE + AI assist for Day 1 personalization

### GHL Workflow Configuration

```
WORKFLOW: "SEQ 3 -- Post-Call Follow-Up"
TRIGGER: Tag Added = "call-completed"

[Action 1] Add Tag: "seq-postcall-followup"
[Action 2] Remove Tag: "seq-precall-warmup"
[Action 3] Remove Tag: "call-booked"

--- DAY 1: Personalized Recap ---
[Wait] 4 hours (give time for Fathom transcript to process)
[If/Else] Tag "client-signed" exists? -> YES: Go to SIGNED-EXIT. NO: Continue
[Action] Send Email: "Post-Call -- Recap" (uses cf_postcall_notes for personalization)

--- DAY 3: Proposal / Blueprint ---
[Wait] 2 days
[If/Else] Tag "client-signed" exists? -> YES: Go to SIGNED-EXIT. NO: Continue
[Action] Send Email: "Post-Call -- Your Proposal"

--- DAY 5: Objection Handler ---
[Wait] 2 days
[If/Else] Tag "client-signed" exists? -> YES: Go to SIGNED-EXIT. NO: Continue
[If/Else Branch on cf_primary_objection]
  -> "Price": Send Email variant A
  -> "Timing": Send Email variant B
  -> "Partner Decision": Send Email variant C
  -> "Current Agency": Send Email variant D
  -> Default: Send Email variant E (generic)

--- DAY 7: Vertical Case Study ---
[Wait] 2 days
[If/Else] Tag "client-signed" exists? -> YES: Go to SIGNED-EXIT. NO: Continue
[Action] Send Email: "Post-Call -- Case Study" (dental-specific: Dr. Laleh)

--- DAY 14: Check-In ---
[Wait] 7 days
[If/Else] Tag "client-signed" exists? -> YES: Go to SIGNED-EXIT. NO: Continue
[Action] Send Email: "Post-Call -- Check-In"

--- DAY 21: Final Ask / Audit Pivot ---
[Wait] 7 days
[If/Else] Tag "client-signed" exists? -> YES: Go to SIGNED-EXIT. NO: Continue
[Action] Send Email: "Post-Call -- Final + Audit Offer"

--- COLD EXIT (after Day 21, no response) ---
[Wait] 7 days
[If/Else] Tag "client-signed" exists? -> YES: Go to SIGNED-EXIT. NO: Continue
[Action] Add Tag: "nurture-pool" (triggers SEQ 1)
[Action] Remove Tag: "seq-postcall-followup"
[Action] Remove Tag: "call-completed"

--- SIGNED-EXIT ---
[Action] Remove Tag: "seq-postcall-followup"
[Action] Remove Tag: "call-completed"
[Action] Add Tag: "seq-welcome" (triggers SEQ 5)
```

### Email Templates

**Day 1 -- Personalized Recap**
```
Subject: Great talking today -- here's a quick recap
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Really enjoyed our conversation today. Here's a quick summary
of what we covered:

{{contact.cf_postcall_notes}}

Based on what you shared, I think we can significantly improve
your cost per consultation and get more high-value cases
(veneers, implants, smile makeovers) through the door.

Next step from our end: {{contact.cf_postcall_notes}}

If you have any questions in the meantime, just reply to this
email or text me directly.

Peterson
```

**Day 3 -- Proposal**
```
Subject: Your proposal is ready
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Put together the proposal we discussed on our call. Here it is:
[PROPOSAL LINK]

Key highlights:
- [THEIR PRIMARY GOAL] -> our strategy to get there
- Timeline: first results within 30 days, full optimization by 90
- Investment: [RELEVANT PLAN BASED ON THEIR SPEND]

Take a look and let me know if anything needs clarifying. Happy
to jump on a quick call to walk through it if that's easier.

Peterson
```

**Day 5 -- Objection: Price (variant A)**
```
Subject: Quick thought on the investment
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Wanted to follow up on something you mentioned about the pricing.

Here's how most of our clients think about it: our fee isn't a
cost, it's the price of not leaving money on the table.

Example: Dr. Laleh was spending $110K/month on ads with a 2.7X
return. After we took over, her return jumped to 5.7X. That's
over $200,000 in additional monthly profit. Our management fee
is a fraction of that.

The question isn't really "can I afford this?" It's "can I afford
to keep running ads without someone optimizing them?"

No pressure either way. Just wanted to put that in perspective.

Peterson
```

**Day 5 -- Objection: Timing (variant B)**
```
Subject: Timing and what we're seeing right now
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Totally understand wanting to wait for the right time. Just
wanted to flag something:

The businesses that start now have a 60-90 day head start on
data collection and optimization. By the time your "right time"
arrives, you'd already have a dialed-in campaign instead of
starting from scratch.

We can also start conservative -- lower budget, one platform --
and scale up when you're ready. No need to go all-in on day one.

Just food for thought. The calendar link is below whenever
you're ready to revisit.

Peterson

[BOOKING LINK]
```

**Day 5 -- Objection: Partner Decision (variant C)**
```
Subject: Happy to include your partner
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Completely understand needing to loop in your [partner/spouse/
business partner]. That's smart.

Would it help if we did a quick 15-minute call with both of you?
I can walk them through the highlights without rehashing
everything. Usually takes care of any remaining questions.

Here's a link to book that whenever works for you both:
[BOOKING LINK]

Peterson
```

**Day 5 -- Objection: Current Agency (variant D)**
```
Subject: No rush -- but one thing to consider
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

I know you mentioned you're working with someone currently.
No pressure to switch. But here's something worth thinking about:

Ask your current team for these three things:
1. Your cost per lead trend over the last 90 days
2. Your conversion rate from lead to customer
3. What tests they've run in the last 30 days

If they can't answer those clearly, that tells you something.

We're here whenever you're ready to compare notes. And if your
current team is killing it, that's great too -- keep doing
what's working.

Peterson
```

**Day 5 -- Default (variant E)**
```
Subject: Following up on our conversation
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Just circling back from our call last week. Wanted to make sure
you got the proposal and see if you had any questions.

Happy to jump on a quick call to clarify anything:
[BOOKING LINK]

Peterson
```

**Day 7 -- Vertical Case Study**
```
Subject: How we helped a cosmetic dental practice like yours
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Wanted to share a more detailed look at what we did for a
cosmetic dental practice. Figured it's more useful than
me telling you what we can do -- this shows it.

The challenge: Practice was spending $110K/month on ads and
stuck at 50-60 consultations. Same results for over a year.
Previous agency was optimizing for leads, not revenue.

Our approach:
- Rebuilt campaign structure around high-value services
- Shifted optimization from form fills to booked consultations
- Diversified across Google, Meta, and emerging platforms

The results: 105+ consultations/month. 5.7X ROAS. $2M/month
in revenue. Over $200K in additional monthly profit.
Timeline: 6 months to full optimization.

The full case study is here: [LINK]

This is pretty close to what we'd do for your practice based
on what you told me on our call.

Peterson
```

**Day 14 -- Check-In**
```
Subject: Checking in
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Just wanted to check in. The proposal we put together is still
on the table, and the strategy we discussed would still apply
to your practice.

If anything's changed on your end or you have new questions,
I'm here.

Peterson

[BOOKING LINK]
```

**Day 21 -- Final Ask + Audit Pivot**
```
Subject: One last thing before I go quiet
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

I don't want to be that guy who keeps following up forever, so
this'll be my last direct outreach for a while.

Two options if you're still thinking about this:

1. If you're ready to move forward, here's the calendar:
   [BOOKING LINK]

2. If full management isn't the right move right now, we also do
   a one-time $1,000 deep-dive audit. You get a complete action
   plan for your ad accounts -- what's working, what's not, and
   exactly what to fix. You can hand it to any team to implement.

Either way, I'll keep sending you useful stuff monthly. No
pressure, just value.

Peterson
```

---

## Sequence 4: Post-Lead-Magnet No-Book

### Overview
- **Entry:** Opportunity moved to "Blueprint Received" stage in Dental Pipeline
- **Exit:** Books a call (moves to "Call Booked") OR completes Day 37 (moves to "Nurture")
- **Cadence:** Days 2, 4, 7, 14, 30 (exits Day 37)
- **Build method:** GHL-NATIVE
- **Priority:** BUILD FIRST (dental campaign launching soon)
- **Re-entry:** No

### GHL Workflow Configuration

```
WORKFLOW: "SEQ 4 -- Post Lead Magnet No-Book (Dental)"
TRIGGER: Pipeline Stage Changed = "Blueprint Received" (Dental Pipeline, stage ID: 8923dd30-d33a-4d68-b25e-7a34e339a9ec)
STOP CONDITIONS: Opportunity moves to "Lost" or "Referred"

[Wait] 24 hours
[If/Else] Tag "call-booked" exists? -> YES: Go to EXIT (they already booked). NO: Continue

[Action 1] Add Tag: "seq-post-leadmagnet"

--- DAY 2: Follow-Up + Key Insight ---
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send Email: "Post-LM -- Did You Catch the Biggest Gap?"

--- DAY 4: Case Study (Dr. Laleh) ---
[Wait] 2 days
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send Email: "Post-LM -- Dr. Laleh Case Study"

--- DAY 7: Two Options (Call vs Audit) ---
[Wait] 3 days
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send Email: "Post-LM -- Two Ways We Can Help"

--- DAY 14: Social Proof + Urgency ---
[Wait] 7 days
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send Email: "Post-LM -- 5.7X Return on Ad Spend"

--- DAY 30: Long-Term Nurture Transition ---
[Wait] 16 days
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Send Email: "Post-LM -- Still Thinking It Over?"

--- NURTURE EXIT (no book after Day 37) ---
[Wait] 7 days
[If/Else] Tag "call-booked" exists? -> YES: Go to BOOKED-EXIT. NO: Continue
[Action] Move opportunity to "Nurture" stage in Dental Pipeline
[Action] Add Tag: "nurture-pool" (triggers SEQ 1)
[Action] Remove Tag: "seq-post-leadmagnet"

--- BOOKED-EXIT ---
[Action] Remove Tag: "seq-post-leadmagnet"
(Calendar Booking Router moves opportunity to "Call Booked" stage; SEQ 2 triggers on that stage change)
```

### Email Templates

**NOTE:** Blueprint delivery email (Day 0) is handled by the blueprint engine itself, not GHL. These emails start at Day 2 for leads who received their blueprint but have not booked a call.

**Day 2 -- Follow-Up + Key Insight**
```
Subject: Did you catch the biggest gap in your blueprint?
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

The number one thing most practices miss: they're running ads on one platform and assuming they're covered. In reality, your ideal patients are searching on Google, scrolling Meta, watching TikTok, and now even asking ChatGPT for recommendations. If you're only showing up in one place, you're handing cases to whoever is showing up in the other five.

Your Paid Ads Blueprint breaks down exactly where you have gaps and what filling them would look like in terms of new consultations per month.

Worth 30 minutes to talk it through. We'll walk you through the implementation plan, no commitment required.

{{custom_values.cades_calendar}}

Peterson
Creekside Marketing
```

**Day 4 -- Case Study (Dr. Laleh)**
```
Subject: How Dr. Laleh doubled her return on ad spend without spending more
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Quick story.

Dr. Laleh runs a cosmetic dental practice in California. She was spending $110,000 a month on ads and getting a 2.7X return. 50 to 60 veneer consultations a month. Her consultations had plateaued at that level for over a year.

We didn't increase her budget. We changed what we were optimizing for.

Within 90 days, her return jumped from 2.7X to 5.7X. Consultations went from 50 to 105 per month. Same ad spend. Over $200,000 in additional monthly profit. Full optimization hit at 6 months.

The biggest takeaway: she was getting a mediocre return because her campaigns were optimizing for leads. We shifted the optimization to revenue and booked consultations. One change. Completely different result.

Reply to this email and I'll send you the full breakdown of exactly what we changed and why it worked.

If you want to see whether the same approach would work for your practice, that's what the strategy call covers. We'll map your Paid Ads Blueprint to a real implementation plan.

{{custom_values.cades_calendar}}

Peterson
Creekside Marketing
```

**Day 7 -- Two Ways We Can Help**
```
Subject: Two ways we can help (one is free)
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Most practice owners who get their Paid Ads Blueprint fall into one of two camps.

Camp 1: "This looks great, let's talk." That's what the strategy call is for. 30 minutes, we walk through your blueprint together, answer your questions, and show you what working with us looks like. No cost, no commitment.

Camp 2: "I want to see the full picture before I commit to anything." For that, we offer a deep-dive paid audit for $1,000. We go platform by platform through your current ad accounts, your competitors' strategies, your landing pages, your follow-up systems, and your conversion data. You get a full diagnostic with specific recommendations you can execute yourself or bring to any agency.

Either way, your blueprint already shows you the gaps. The question is just how deep you want to go before taking action.

Book the free strategy call here:
{{custom_values.cades_calendar}}

If you want the paid audit instead, reply to this email and I'll send the details.

Peterson
Creekside Marketing
```

**Day 14 -- Social Proof (The Tooth Co)**
```
Subject: $60K in new monthly revenue from $10K in ad spend
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Here's what happened with a cosmetic dental practice that started where a lot of our clients start.

The Tooth Co came to us spending around $10,000 a month on ads. They had decent traffic but their campaigns were structured wrong -- broad targeting, no conversion tracking beyond form fills, and creative that looked like every other dental ad in their market.

We rebuilt their campaign structure around high-value services, set up proper attribution from ad click to booked consultation, and diversified their ad presence across Google and Meta.

Within 3 months: $60,000 to $80,000 per month in new revenue directly attributed to ads. From $10K in monthly spend.

For context, here's what that looks like at scale: Dr. Laleh, a cosmetic dental practice in California, went from 50 consultations/month to 105 and from 2.7X to 5.7X return on ad spend within 90 days. Same budget, different optimization.

Real message from Dr. Laleh: "We are at a record high of 100 consults! Whatever we are doing let's keep doing it!"

Your Paid Ads Blueprint already outlines the strategy we'd use for your practice. The strategy call walks through the implementation.

{{custom_values.cades_calendar}}

Peterson
Creekside Marketing
```

**Day 30 -- Still Thinking It Over?**
```
Subject: Still thinking it over?
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

It's been a few weeks since you received your Paid Ads Blueprint. No pressure.

I know timing matters. Maybe you're mid-contract with another agency. Maybe it's your busy season and you don't have bandwidth to think about marketing changes. Maybe you're just not ready yet.

All of that is fine.

Here's what I'd leave you with: the dental marketing landscape is shifting fast. ChatGPT Ads, TikTok, and programmatic are opening up new channels that most practices haven't touched yet. The practices that move first in each market get the lowest costs and the best positioning. That window doesn't stay open forever.

Your blueprint is still valid. The strategy we outlined for your practice still applies. When you're ready to talk through it, we're here.

{{custom_values.cades_calendar}}

Peterson
Creekside Marketing
```

---

## Sequence 5: New Client Welcome

### Overview
- **Entry:** Tag `client-signed` added
- **Exit:** Day 7 (onboarding complete)
- **Cadence:** Days 0, 1, 3, 7
- **Build method:** GHL-NATIVE

### GHL Workflow Configuration

```
WORKFLOW: "SEQ 5 -- New Client Welcome"
TRIGGER: Tag Added = "client-signed"

[Action 1] Add Tag: "seq-welcome"
[Action 2] Remove all sequence tags (cleanup)

--- DAY 0: Welcome ---
[Action] Send Email: "Welcome -- What Happens Next"

--- DAY 1: Access Checklist ---
[Wait] 24 hours
[Action] Send Email: "Welcome -- Access Checklist"

--- DAY 3: Behind the Scenes ---
[Wait] 2 days
[Action] Send Email: "Welcome -- Our Process"

--- DAY 7: Campaigns Live ---
[Wait] 4 days
[Action] Send Email: "Welcome -- You're Live"

--- EXIT ---
[Action] Remove Tag: "seq-welcome"
[Action] Add Tag: "active-client"
```

### Email Templates

**Day 0 -- Welcome**
```
Subject: Welcome to Creekside -- here's what happens next
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Welcome aboard. Excited to get started.

Here's what happens from here:

1. TODAY: You'll get an email from our team requesting access
   to your ad accounts and website analytics
2. DAYS 1-3: We audit your current setup and build your
   campaign strategy
3. DAY 3-5: We schedule your onboarding call to walk through
   the plan
4. WEEK 2: Campaigns go live

Your main points of contact:
- Cade Maclean (strategy + account management)
- Peterson Rainey (that's me -- oversight + escalation)

We communicate through Google Chat and ClickUp. You'll get
invites to both shortly.

If you need anything in the meantime, just reply to this email.

Peterson
Creekside Marketing
```

**Day 1 -- Access Checklist**
```
Subject: Quick access checklist -- we need a few things
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

To get your campaigns built, we need access to a few things.
Here's the checklist:

[ ] Google Ads admin access (add cade@creeksidemarketingpros.com)
[ ] Meta Business Manager admin access (same email)
[ ] Google Analytics access
[ ] Website admin/CMS access (for conversion tracking)
[ ] Any existing creative assets (logos, photos, brand guidelines)

If you're not sure how to grant any of these, no worries. We'll
walk you through it on our onboarding call. Or just reply and
we'll send instructions.

Peterson
Creekside Marketing
```

**Day 3 -- Our Process**
```
Subject: Here's what we're building for you
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Quick update: we're in the middle of building your campaigns.
Here's a peek at our process:

1. Account audit (done) -- reviewed your current setup
2. Competitor research (done) -- analyzed what's working in
   your market
3. Campaign structure (in progress) -- building your ad groups,
   targeting, and creative
4. Tracking setup (in progress) -- making sure every lead and
   sale is attributed correctly

You'll see everything on our onboarding call before anything
goes live. No surprises.

Peterson
Creekside Marketing
```

**Day 7 -- You're Live**
```
Subject: Your campaigns are live -- here's how to read your reports
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Your campaigns are live. Here's what to expect:

Week 1-2: Data collection phase. We're gathering information
on what works for your specific audience. Don't judge results
yet.

Week 3-4: First optimizations. We start cutting what's not
working and doubling down on what is.

Month 2-3: Scaling phase. By now we have real data and start
pushing for maximum results.

You'll get a bi-weekly report from our team. It covers spend,
leads, cost per lead, and what we're testing next.

Questions anytime -- just ping us in Google Chat or reply here.

Peterson
Creekside Marketing
```

---

## Sequence 6: No-Show Recovery

### Overview
- **Entry:** Opportunity moved to "no show" stage in Dental Pipeline
- **Exit:** Rebooks (enters SEQ 2) OR Day 3 with no response (enters SEQ 1)
- **Cadence:** 1 hour after, Day 1, Day 3
- **Build method:** GHL-NATIVE

### GHL Workflow Configuration

```
WORKFLOW: "SEQ 6 -- No-Show Recovery"
TRIGGER: Pipeline Stage Changed = "no show" (Dental Pipeline, stage ID: 467179c4-29d2-47e1-8fc0-e3d9425c5674)

[Action 1] Add Tag: "no-show"
[Action 2] Add Tag: "seq-noshow-recovery"
[Action 3] Remove Tag: "seq-precall-warmup"

--- 1 HOUR AFTER: SMS ---
[Wait] 1 hour
[If/Else] Tag "call-booked" exists (they rebooked)? -> YES: Go to REBOOKED-EXIT. NO: Continue
[Action] Send SMS: No-show recovery SMS

--- DAY 1: Email ---
[Wait] 23 hours
[If/Else] Tag "call-booked" exists? -> YES: Go to REBOOKED-EXIT. NO: Continue
[Action] Send Email: "No-Show -- Reschedule"

--- DAY 3: Final Email ---
[Wait] 2 days
[If/Else] Tag "call-booked" exists? -> YES: Go to REBOOKED-EXIT. NO: Continue
[Action] Send Email: "No-Show -- Last Chance + Value"

--- NURTURE EXIT ---
[Wait] 4 days
[If/Else] Tag "call-booked" exists? -> YES: Go to REBOOKED-EXIT. NO: Continue
[Action] Move opportunity to "Nurture" stage in Dental Pipeline
[Action] Add Tag: "nurture-pool" (triggers SEQ 1)
[Action] Remove Tag: "seq-noshow-recovery"
[Action] Remove Tag: "no-show"

--- REBOOKED-EXIT ---
[Action] Remove Tag: "seq-noshow-recovery"
[Action] Remove Tag: "no-show"
(Calendar Booking Router moves opportunity to "Call Booked" stage; SEQ 2 triggers on that stage change)
```

### Templates

**SMS -- 1 hour after**
```
Hey {{contact.first_name}}, looks like we missed each other for our call today. No worries, things come up. Here's a link to grab a new time: {{custom_values.cades_calendar}} -- Peterson, Creekside Marketing
```

**Day 1 -- Reschedule Email**
```
Subject: Let's reschedule
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

No worries about yesterday -- things come up.

Here's my calendar for this week. Pick whatever works:
{{custom_values.cades_calendar}}

Peterson
Creekside Marketing
```

**Day 3 -- Last Chance + Value**
```
Subject: Still interested in improving your ads?
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

Wanted to reach out one more time. If you're still interested in talking about your ad strategy, here's the calendar:
{{custom_values.cades_calendar}}

In the meantime, here's something useful: practices that diversify their ads across Google, Meta, and at least one emerging platform (TikTok, ChatGPT Ads) are generating 40-60% more consultations than single-platform practices at the same budget. Your Paid Ads Blueprint already shows where those gaps are for your practice.

If the timing just isn't right, no hard feelings. I'll keep sending you useful stuff monthly.

Peterson
Creekside Marketing
```

---

## Sequence 7: Referral / Review Request

### Overview
- **Entry:** Tag `active-client` added AND 90 days have passed
- **Exit:** Completes or ignores (no penalty)
- **Cadence:** One-time at 90 days, then quarterly
- **Build method:** GHL-NATIVE

### GHL Workflow Configuration

```
WORKFLOW: "SEQ 7 -- Referral & Review"
TRIGGER: Tag Added = "active-client"

[Wait] 90 days

--- 90-DAY CHECK-IN ---
[If/Else] Tag "active-client" still exists? -> NO: Stop. YES: Continue
[Action] Send Email: "90-Day Check-In + Review Request"

--- REVIEW FOLLOW-UP ---
[Wait] 7 days
[Action] Send Email: "Referral Ask"

--- QUARTERLY LOOP ---
[Wait] 83 days (brings total to ~6 months)
[If/Else] Tag "active-client" still exists? -> NO: Stop. YES: Continue
[Action] Send Email: "Quarterly Check-In + Referral"
[Go To] QUARTERLY LOOP (repeat every 90 days)
```

### Email Templates

**90-Day Check-In**
```
Subject: 90 days in -- how's it going?
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

We've been working together for about 3 months now. Wanted to
check in and see how you're feeling about everything.

If you're happy with the results, it'd mean a lot if you left
us a quick Google review. Doesn't need to be long -- just your
honest experience:
[GOOGLE REVIEW LINK]

And if there's anything we can improve, I'd rather hear it from
you directly than find out later. Just reply to this email.

Peterson
Creekside Marketing
```

**Referral Ask**
```
Subject: Quick favor
From: Peterson Rainey <peterson@creeksidemarketingpros.com>

Hey {{contact.first_name}},

One more thing. Do you know any other practice owners who are
spending money on ads but not sure if they're getting the most
out of it?

We're always looking for good-fit clients, and a referral from
someone who's seen our work firsthand is the best introduction
we can get.

No pressure at all. Just figured I'd ask.

Peterson
Creekside Marketing
```

---

## Pipeline Stages & Automation Map

### Dental Pipeline -- All Stages

| # | Stage | GHL Stage ID | Automation Trigger |
|---|-------|-------------|-------------------|
| 0 | New Lead | 4f189c75-99a3-4c83-81df-399c0631b92c | Contact created (ad form, blueprint form, manual) |
| 1 | Blueprint Received | 8923dd30-d33a-4d68-b25e-7a34e339a9ec | Blueprint engine delivers blueprint |
| 2 | Nurture | 65ddaf9d-024d-4ccf-95f4-347ed55d6a1c | Multiple entry points (see below) |
| 3 | Pre-call Discussion | b70d2b92-2368-4b24-aa70-7146cd4d2098 | Contact engages (replies, clicks) but hasn't booked |
| 4 | Call Booked | 8ad8a351-f55b-4fdc-b79d-41e2ba86e092 | Google Calendar booking detected |
| 5 | No Show | 467179c4-29d2-47e1-8fc0-e3d9425c5674 | Prospect misses scheduled call |
| 6 | Pursuing | 1d19f619-8b5d-42f6-9270-e18105e5fa48 | Call completed, prospect interested but not closed |
| 7 | Invoice Sent | a3d98bcc-2405-42ea-8fcd-f5c75bce7c27 | Proposal accepted, invoice delivered |
| 8 | Won | c223d438-2bca-47b6-816d-f60f2e2eac8a | Invoice paid, contract signed |
| 9 | Unqualified | c6cbc333-15c3-48a2-a844-bb6a40c5615d | Below threshold, not a fit |
| 10 | Lost | 98081afc-a861-4316-85c7-813198bbad3f | Prospect explicitly declines (says no, unsubscribes) |
| 11 | Referred | **NEEDS CREATION** | Referred to Barron (below $10K threshold or not right fit for Creekside) |

**ACTION NEEDED:** Add "Referred" stage to the Dental Pipeline in GHL UI (position 11, before or after Lost).

---

### Nurture Stage -- Entry Points (all paths that lead to Nurture)

| Source | Condition | Sequence That Handles It |
|--------|-----------|--------------------------|
| Blueprint Received | 30-day post-blueprint sequence completes, prospect never books | SEQ 4 exits → moves to Nurture |
| No Show | No-show recovery sequence completes (3+ days), prospect never rebooks | SEQ 6 exits → moves to Nurture |
| Pursuing | Prospect ghosts after 3-4 messages post-call (no responses) | SEQ 3 exits → moves to Nurture |
| Pre-call Discussion | Engaged but never books after extended follow-up | Manual move or SEQ 4 variant |
| Any stage | Not a fit right now but may be in the future | Manual move by Cade/Peterson |

**What Nurture means:** Contact stays in the system, receives monthly value emails (SEQ 1). They can re-enter the active pipeline at any time by booking a call (moves back to Call Booked, triggers SEQ 2).

---

### Lost Stage -- Entry Points

| Source | Condition |
|--------|-----------|
| Any stage | Prospect explicitly says no / asks to stop contact / hostile response |
| Any stage | Unsubscribes from email |

**What Lost means:** All sequences stop. No further automated outreach. Contact stays in GHL for records but receives nothing.

---

### Referred Stage -- Entry Points

| Source | Condition |
|--------|-----------|
| Any stage | Below $10K ad spend threshold (referred to Barron) |
| Any stage | Not a fit for Creekside but fits Barron's services |

**What Referred means:** Tag `barron-referral` applied. All Creekside sequences stop. Contact may still receive monthly nurture (SEQ 1) unless they opt out. Barron handles the relationship from here.

---

### Stage-to-Sequence Mapping (which automation fires at each stage)

| Stage Moved TO | Automation Triggered | Workflow Name |
|----------------|---------------------|---------------|
| Blueprint Received | SEQ 4 fires after 24hr if no booking | "SEQ 4 -- Post Lead Magnet No-Book" |
| Call Booked | SEQ 2 fires immediately | "SEQ 2 -- Pre-Call Warm-Up" |
| No Show | SEQ 6 fires after 1 hour | "SEQ 6 -- No-Show Recovery" |
| Nurture | SEQ 1 fires after 3 days | "SEQ 1 -- Monthly Nurture" |
| Pursuing | SEQ 3 fires after 4 hours | "SEQ 3 -- Post-Call Follow-Up" |
| Won | SEQ 5 fires immediately | "SEQ 5 -- New Client Welcome" |
| Invoice Sent | No automation (manual follow-up) | -- |
| Unqualified | No automation | -- |
| Lost | All sequences stop, remove all seq- tags | Global stop workflow |
| Referred | Tag barron-referral, stop active sequences | -- |

---

### Stage Transition Rules (who/what moves contacts between stages)

| From | To | Moved By | How |
|------|----|----------|-----|
| New Lead | Blueprint Received | Automated | Blueprint engine delivers, updates GHL via API |
| Blueprint Received | Call Booked | Automated | Google Calendar sync script detects booking |
| Blueprint Received | Nurture | Automated | SEQ 4 completes Day 30 with no booking |
| Call Booked | No Show | Manual | Cade/Peterson moves opportunity after missed call |
| Call Booked | Pursuing | Manual | Cade/Peterson moves after call completed |
| No Show | Call Booked | Automated | Google Calendar sync detects rebooking |
| No Show | Nurture | Automated | SEQ 6 completes Day 7 with no rebook |
| Pursuing | Invoice Sent | Manual | Cade/Peterson sends proposal + invoice |
| Pursuing | Nurture | Manual | Prospect ghosts 3-4 messages |
| Invoice Sent | Won | Manual | Payment confirmed |
| Invoice Sent | Nurture | Manual | Prospect goes cold after invoice |
| Any | Lost | Manual | Prospect explicitly declines |
| Any | Referred | Manual | Below $10K threshold, referred to Barron |
| Nurture | Call Booked | Automated | Prospect books from nurture email CTA |

---

### Sequence Exit Conditions (what stops each automation)

| Sequence | Stops When |
|----------|-----------|
| SEQ 1 (Monthly Nurture) | Contact books a call (tag `call-booked` detected) OR moves to Lost |
| SEQ 2 (Pre-Call Warm-Up) | Call time arrives OR contact moves to No Show OR Lost |
| SEQ 3 (Post-Call Follow-Up) | Contact signs (tag `client-signed`) OR Day 21 completes → Nurture |
| SEQ 4 (Post-LM No-Book) | Contact books a call (tag `call-booked`) OR Day 30 → Nurture |
| SEQ 5 (New Client Welcome) | Day 7 completes (onboarding done) |
| SEQ 6 (No-Show Recovery) | Contact rebooks (tag `call-booked`) OR Day 7 → Nurture |
| SEQ 7 (Referral/Review) | Contact leaves active-client status |

---

### Global Stop Rule

**If a contact is moved to Lost at ANY point:**
- Remove ALL `seq-*` tags
- Remove `nurture-pool` tag
- All active workflows should have an If/Else checking for Lost stage or an `unsubscribed` tag
- No further automated outreach of any kind

---

### Visual Flow

```
META AD CLICK
    |
    v
LANDING PAGE -> Questionnaire -> Blueprint Delivered
    |                                    |
    +--- Books call immediately          +--- Doesn't book (24hr wait)
    |         |                          |
    |    Stage: CALL BOOKED              Stage: BLUEPRINT RECEIVED
    |    [SEQ 2: Pre-Call]               [SEQ 4: Post-LM No-Book, 30 days]
    |         |                          |
    |    Call happens                Books? --YES--> CALL BOOKED + SEQ 2
    |         |                          |
    |    Stage: PURSUING             Day 30, no book
    |    [SEQ 3: Post-Call]              |
    |         |                     Stage: NURTURE
    |    +----+----+                [SEQ 1: Monthly Nurture]
    |    |         |                     |
    | Signs    Ghosts (3-4 msgs)    Re-engages? --YES--> CALL BOOKED
    |    |         |                     |
    | Stage: WON   Stage: NURTURE   Says no? --> LOST (all stop)
    | [SEQ 5]      [SEQ 1]
    |
    +--- No-show on call
              |
         Stage: NO SHOW
         [SEQ 6: No-Show Recovery, 7 days]
              |
         Rebooks? --YES--> CALL BOOKED + SEQ 2
              |
         Day 7, no rebook
              |
         Stage: NURTURE
         [SEQ 1: Monthly Nurture]

SPECIAL EXITS (from any stage):
    Says no / hostile    --> LOST (all automations stop)
    Below $10K / not fit --> REFERRED (tag barron-referral, sequences stop)

ACTIVE CLIENT (90 days in):
    [SEQ 7: Referral/Review] (quarterly loop)
```

---

## Build Execution Plan

### Phase 1: Foundation (before any sequences)
1. Regenerate GHL API key (Peterson)
2. Set up Google Calendar appointment scheduling for Cade (30 min, "Strategy Call")
3. Create all custom fields in GHL
4. Create all tags in GHL
5. Set up automation to add `call-booked` tag in GHL when Google Calendar appointment is booked (Zapier/Make webhook or manual)
6. Verify email domain/deliverability settings (DKIM/SPF/DMARC for peterson@creeksidemarketingpros.com)
7. Verify SMS A2P compliance

### Phase 2: Build Priority Sequences
Build in this order (each one is testable independently):

1. **SEQ 4: Post-Lead-Magnet No-Book** -- dental campaign is launching
2. **SEQ 2: Pre-Call Warm-Up** -- immediate ROI for every booked call
3. **SEQ 6: No-Show Recovery** -- quick build, saves lost appointments
4. **SEQ 5: New Client Welcome** -- professional onboarding

### Phase 3: Build Remaining Sequences
5. **SEQ 3: Post-Call Follow-Up** -- needs Fathom integration for Day 1
6. **SEQ 1: Monthly Nurture** -- needs Railway pipeline for AI content (or use templates for v1)
7. **SEQ 7: Referral/Review** -- nice to have, low urgency

### Phase 4: Testing & QA
- Create test contacts with each tag to verify workflow triggers
- Verify exit conditions work (adding `call-booked` tag stops active sequences)
- Check email deliverability (SPF/DKIM/inbox placement)
- Test SMS delivery
- Verify Google Calendar booking link works and `call-booked` tag gets applied
- End-to-end test: submit blueprint form -> receive blueprint -> verify SEQ 4 fires -> book call -> verify SEQ 2 fires and SEQ 4 stops

---

## Railway Integration Points (Phase 3+)

Only two sequences benefit from AI/Railway integration:

1. **SEQ 1 (Monthly Nurture):** Railway cron generates personalized email content monthly
   - Pulls case study data from Supabase
   - Fetches marketing news via web search
   - Personalizes by contact industry
   - Writes content to GHL custom field or sends via API

2. **SEQ 3 (Post-Call Follow-Up, Day 1 only):** Railway processes Fathom transcript
   - Fathom webhook fires after call
   - Railway extracts key points and objection type
   - Writes to `cf_postcall_notes` and `cf_primary_objection` on GHL contact
   - GHL workflow uses those fields in Day 1 email

Everything else is pure GHL with templates and merge fields.
