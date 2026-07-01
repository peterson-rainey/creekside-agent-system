# GHL Automation Sequences: Audit Funnel
## Copy for Cade/Scott to build in GoHighLevel

---

## SEQ 1: Booking Confirmation + Pre-Audit Prep

**Trigger:** Audit call booked via Cade's booking link
**Timing:** Immediately after booking

### Email

**Subject:** Your free ad account audit is confirmed

**Body:**

Hey [First Name],

Your free ad account audit with Cade is confirmed for [DATE] at [TIME].

Here's what will happen on the call: Cade will pull up your ad account on a screen share and walk through what's working, what's not, and what he'd change. No pitch, just a diagnosis from an ads expert who manages campaigns for dental practices spending $5K to $110K a month.

**To get the most out of the audit, here's what to have ready:**

1. **Ad account access (optional but ideal):** If you can add cade@creeksidemarketingpros.com as a viewer on your Meta or Google Ads account before the call, Cade can do a deeper analysis. No changes will be made, view-only access.
   - Meta: Business Settings > Ad Accounts > Add People > Analyst role
   - Google: Admin > Access > Add user > Read-only
2. **If you'd prefer not to share access:** No problem. Just have your ad account open so you can share your screen during the call.
3. **Know your numbers (roughly):** Monthly ad spend, approximate number of consultations from ads, average case value. If you don't know exactly, that's fine. We'll figure it out together.

**Meeting link:** [Cade's existing Google Meet link]

If you need to reschedule, use the link in your calendar invite.

Talk soon,
Peterson

Creekside Marketing
Specialized Patient Acquisition for Dental Practices

### SMS (send 1 hour after email)

"Hey [First Name], it's Peterson from Creekside. Your free ad account audit with Cade is confirmed for [DATE] at [TIME]. If you can, add cade@creeksidemarketingpros.com as a viewer on your ad account before the call so we can do a deeper analysis. No changes, view-only. See you then."

---

## SEQ 2: Reminder (Day Before)

**Trigger:** 24 hours before scheduled audit
**Timing:** Morning of the day before

### Email

**Subject:** Tomorrow: your free ad account audit

**Body:**

Hey [First Name],

Quick reminder that your free ad account audit with Cade is tomorrow at [TIME].

**Meeting link:** [Cade's existing Google Meet link]

If you haven't added viewer access yet, no worries. Just have your ad account open so you can share your screen.

See you tomorrow.

Peterson

### SMS

"Hey [First Name], just a reminder your free ad account audit with Cade is tomorrow at [TIME]. Here's the link: [Google Meet link]. See you there."

---

## SEQ 3: Reminder (1 Hour Before)

**Trigger:** 1 hour before scheduled audit
**Timing:** 60 minutes prior

### SMS only

"Hey [First Name], your free ad account audit with Cade starts in 1 hour at [TIME]. Link: [Google Meet link]"

---

## SEQ 4: No-Show Recovery

**Trigger:** No-show (didn't join the call within 10 minutes of scheduled time)
**Timing:** 30 minutes after scheduled start time

### SMS (immediate)

"Hey [First Name], it's Cade from Creekside. Looks like we missed each other for the audit today. No worries. Want to reschedule? Here's my link: [booking link]"

### Email (2 hours after no-show)

**Subject:** We missed you for the audit

**Body:**

Hey [First Name],

Looks like we missed each other today. No worries at all.

I had your account pulled up and ready to go. If you'd like to reschedule, here's my link:

[LINK: Cade's booking link]

The audit is still free, still 30 minutes, and I'll still walk through your ad account live and tell you exactly what I'd fix.

If something came up and you'd prefer a different time, just reply to this email and we'll find something that works.

Cade
Creekside Marketing

### Email (Day 3 after no-show, if no response)

**Subject:** Still want the free audit?

**Body:**

Hey [First Name],

Following up one more time on the ad account audit. I know things get busy.

If you still want to see what's going on in your ad account, I've got some time this week:

[LINK: Cade's booking link]

If now isn't the right time, no pressure. We're here when you're ready.

Cade

---

## SEQ 5: Post-Audit Follow-Up (Not Closed)

**Trigger:** Audit completed, prospect did not sign
**Timing:** 1 hour after audit call ends
**Note:** Cade sends the personalized audit findings email manually (see audit-call-script.md Section 8). This GHL sequence handles the automated follow-up after that.

### Email (Day 3)

**Subject:** Quick follow-up on your audit

**Body:**

Hey [First Name],

Wanted to follow up on what we discussed. The [biggest finding from audit] alone is something that would make a measurable difference in your results.

If you've had a chance to think it over and want to talk next steps, here's my calendar:

[LINK: Cade's booking link]

No pressure either way. Just wanted to make sure I followed up.

Cade

### Email (Day 7)

**Subject:** One spot open for [month]

**Body:**

Hey [First Name],

Quick note. We've got one dental practice spot open for [month]. We keep it limited because of our geographic exclusivity policy. Once we take on a practice in a market, we won't work with a competitor in that area.

If you're interested in moving forward based on what we discussed in the audit, now's the time.

[LINK: Cade's booking link]

If not, no hard feelings. We're here when the timing is right.

Cade

### Email (Day 14)

**Subject:** Last note from me

**Body:**

Hey [First Name],

Last follow-up from me on this. I'll keep it simple.

The issues we found in your audit are costing you money every day they go unfixed. Whether you fix them yourself, bring in another team, or work with us, the important thing is that they get fixed.

If you want to revisit the conversation, my calendar is always open:

[LINK: Cade's booking link]

Either way, thanks for taking the time to do the audit. Hope it was valuable.

Cade
Creekside Marketing

---

## SEQUENCE NOTES

- All emails should have a plain-text feel (no heavy HTML templates)
- SMS messages should be under 160 characters where possible
- If the prospect books a follow-up call at any point, stop the sequence
- If the prospect signs, stop the sequence and trigger onboarding workflow
- Baran referrals (under $50K revenue or under $5K/month ad spend): stop this sequence, trigger referral sequence with Baran's calendar link
- No em dashes in any copy
- Calendar links all point to Cade's existing Google Meet booking link
