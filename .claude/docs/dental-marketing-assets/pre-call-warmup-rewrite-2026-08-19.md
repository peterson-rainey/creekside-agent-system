# Pre-Call Warm-Up Sequence -- Rewrite (August 2026)
## 3 SMS + 3 Email pairs, fired simultaneously

No blueprint references. No 3X ROAS guarantee. Aligned with current funnel:
Ad (pain-point talking head) -> Landing page (/dental-ads-audit/) -> 6-question form (/dental/start/) -> Booking page -> Confirmed/VSL page -> Call with Cade.

Confirmed/VSL page already covers: case studies (Dr. Laleh, Fusion, Tooth Co), "What to Expect in 30 Minutes," and the system VSL video. These emails complement, not repeat.

Elements used: geographic exclusivity, process (what happens after the call), pain point echo from ads, selectivity, VSL nudge.

---

## PAIR 1: Immediately After Booking

### SMS 1

```
Hey {{ contact.first_name }}, you're booked! Before your call, watch the 5-minute video on your confirmation page if you haven't already. It'll make our conversation a lot more productive. Talk soon. -- Peterson, Creekside
```

### Email 1

**Subject:** You're booked -- one thing before your call

```
Hey {{ contact.first_name }},

Your strategy call is confirmed. You'll find the details in your calendar invite.

One thing before we talk: there's a short video on the page you just came from that walks through exactly how we generate results for dental practices. If you closed the tab before watching it, here's the link:

[LINK: confirmed/VSL page URL]

It's about 5 minutes and covers the system behind the numbers you saw on our site. Watching it before your call means we can skip the overview and get straight into your specific situation.

Quick note: we're selective about who we work with. We only take on practices we know we can grow, and we limit the number of practices per market. The fact that you qualified through our form means we think there's a real opportunity here.

Looking forward to it.

Peterson
Creekside Marketing
```

---

## PAIR 2: Day Before the Call

### SMS 2

```
Hey {{ contact.first_name }}, our call is tomorrow. If you can, have your ad account login handy so we can look at your numbers together. If not, no worries. See you tomorrow. -- Peterson
```

### Email 2

**Subject:** Tomorrow: a few things worth knowing

```
Hey {{ contact.first_name }},

Quick note before our call tomorrow.

If you've been through 2 or 3 agencies before and felt like nothing changed, you're not alone. That's the most common thing we hear from dental practices that reach out to us. The difference with our approach is that we optimize for revenue and booked consultations, not clicks and impressions. That's why our clients see the numbers they do.

Here's what happens after our call if we both decide it's a good fit:

1. We audit your current ad accounts and identify exactly where money is being wasted
2. We build a campaign strategy specific to your practice and your market
3. Campaigns go live within 2 weeks of signing
4. You get regular reporting tied to actual revenue, not vanity metrics

No pressure on the call. If we're not the right fit, we'll tell you. We turn down about 40% of the practices that reach out because we'd rather be honest than take your money.

To get the most out of our time, it helps to have:
- A rough idea of your monthly ad spend (or target budget)
- Access to your Google Ads or Meta Ads account (so we can look together)
- Any specific goals or frustrations you want to cover

If you don't have all of that, it's fine. We'll work with whatever you've got.

See you tomorrow.

Peterson
Creekside Marketing
```

---

## PAIR 3: Morning of the Call

### SMS 3

```
Hey {{ contact.first_name }}, our call is today. We only work with one practice per market, so if your area is still open, today's a good day to lock it in. Check your calendar invite for the meeting link. -- Peterson
```

### Email 3

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

Peterson
Creekside Marketing
```

---

## Workflow Configuration

```
WORKFLOW: "SEQ 2 -- Pre-Call Warm-Up (Revised)"
TRIGGER: Pipeline Stage Changed = "Call Booked" (Dental Pipeline)
STOP CONDITIONS: Opportunity moves to "Lost", "Referred", or "No Show"

[Action 1] Add Tag: "seq-precall-warmup"
[Action 2] Remove Tag: "seq-post-leadmagnet" (cleanup)
[Action 3] Remove Tag: "seq-monthly-nurture" (cleanup)
[Action 4] Remove Tag: "nurture-pool" (cleanup)
[Action 5] Remove Tag: "seq-noshow-recovery" (cleanup)
[Action 6] Remove Tag: "seq-form-abandonment" (cleanup)

--- PAIR 1: IMMEDIATELY ---
[Action] Send SMS: SMS 1 (booking confirmation + VSL nudge)
[Wait] 5 minutes
[Action] Send Email: Email 1 (VSL link + selectivity)

--- PAIR 2: DAY BEFORE CALL ---
[Wait Until] Day before {{ contact.scheduled_call_date }}, 9:00 AM contact timezone
[If/Else] Call already passed or contact moved to No Show/Lost? -> YES: EXIT. NO: Continue
[Action] Send SMS: SMS 2 (what to have ready)
[Wait] 30 minutes
[Action] Send Email: Email 2 (pain point echo + process + prep)

--- PAIR 3: MORNING OF CALL ---
[Wait Until] Day of {{ contact.scheduled_call_date }}, 8:00 AM contact timezone
[If/Else] Call already passed or contact moved to No Show/Lost? -> YES: EXIT. NO: Continue
[Action] Send SMS: SMS 3 (geo exclusivity + excitement)
[Wait] 30 minutes
[Action] Send Email: Email 3 (what to expect + geo exclusivity)

--- EXIT ---
[Action] Remove Tag: "seq-precall-warmup"
```

## Sequence Notes

- All emails plain-text feel, no heavy HTML
- SMS under 300 characters where possible
- If prospect rebooks after a no-show, this sequence re-triggers (re-entry: yes)
- Calendar links are in the calendar invite, not repeated in emails (avoids confusion with Cade's scheduling system)
- VSL page link needs to be wired to the actual confirmed page URL
- No blueprint references anywhere
- No 3X ROAS guarantee
- Case study numbers only referenced indirectly ("the numbers you saw on our site") since the confirmed page already shows them in detail
- No em dashes
