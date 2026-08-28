# Partner: Keith (INACTIVE -- 2026-08-27)

> **Status: INACTIVE.** Keith is no longer the active partner on any profile. Both Samuel and Lindsey profiles now use Brady. Do NOT load this file at runtime. This file is retained for historical reference only. Any mention of Keith's name or calendar URL in a lead-facing draft is a BLOCK (enforced by `validate_response.py` inactive-partner bleed check).

## Partner Fields

- **name:** Keith
- **lead_facing_name:** Keith
- **calendar_url:** https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1rM42oKd0V45PouVuipnzu1DvAy-uNRHnTgnnVaasVqfpOk1ekphBNJ0qYAvm-XgeH41ztaTFu
- **price_range:** $500-$800/month
- **has_upwork_video:** false

## Routing Trigger

Route to Keith (pre-booking) when the lead does not meet the revenue-tier thresholds defined in the Partner Redirect Mode section of `docs/response-guidelines.md`. This includes: pre-revenue leads (any budget), leads with revenue under $500k/yr whose ad spend is below $5k/mo, and any lead with ad spend below $3k/mo.

## has_upwork_video: false -- What This Means

Keith is NOT featured in the Upwork profile video. NEVER reference the profile video in connection with Keith. Do NOT say things like:
- "Keith, who I mentioned in my video"
- "check out my profile video where I talk about Keith"
- "my partner Keith, as mentioned on the video"
- "[Keith's name] within ~60 characters of 'video'"

Any video reference linking Keith to the Upwork profile video is factually wrong and is a BLOCK-level error (enforced by `validate_response.py`).

## Handoff Framing (Partner Redirect Mode)

Frame the active partner as the right-fit specialist for their stage, not a downgrade. Use any of:
- "our small business specialist"
- "my partner Keith"
- "Keith on my team"
- "Keith, who specializes in businesses at your stage"

Never mention the $5K threshold, any spend minimum, or explain why they're going to Keith. Route naturally.

## Approved Routing Template

Use this verbatim for pre-booking routing (lead has NOT yet booked). Substitute the lead's actual first name (example uses "Tanya"):

> "Hey Tanya, you'd actually be a great fit for my partner Keith. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1rM42oKd0V45PouVuipnzu1DvAy-uNRHnTgnnVaasVqfpOk1ekphBNJ0qYAvm-XgeH41ztaTFu"

If the $500-$800/month range is used, place it as a separate sentence AFTER the template, never inside it.

## Post-Booking Redirect Framing

For leads already booked on the profile calendar with a sub-$3K budget, use keep-the-meeting framing:

> "Sounds like you're actually going to be a better fit for my partner Keith, who I mentioned. He's helped scale businesses exactly like yours. He'll be on the call at the same time."

Never send a booking link to an already-booked lead.

## Sub-Cadence (After Calendar Sent, Lead Hasn't Booked)

- +1 day: "Did you get a chance to look at Keith's calendar?"
- +2 days after (if no response): One more follow-up asking if they're still interested.
- Still no response: Move to standard 60-day nurture sequence.

## Doc-Verified Facts Only

When a lead asks who Keith is, answer only with what is documented here: small business specialist, "my partner" / "on my team," works with businesses at their stage. Typical pricing: $500-$800/month. NOTHING else. No invented last name (no last name is on file -- do NOT introduce one). No invented years of experience, certifications, case studies, or results attributed to Keith. If the lead wants to know more, Keith will walk them through his work on the call.

## When Keith Books a Lead

An automated email notification will come through. Once that happens, the lead moves to "referred" status and Creekside stops following up -- Keith owns the relationship from that point.
