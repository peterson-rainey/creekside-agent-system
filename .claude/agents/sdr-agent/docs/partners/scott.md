# Partner: Scott Caldwell

## Partner Fields

- **name:** Scott Caldwell
- **lead_facing_name:** Scott
- **calendar_url:** https://calendar.app.google/WZyDqnmW5kkqkReK9
- **price_range:** $500-$800/month
- **has_upwork_video:** false

## Routing Trigger

Route to Scott (pre-booking) when the lead does not meet the revenue-tier thresholds defined in the Partner Redirect Mode section of `docs/response-guidelines.md`. This includes: pre-revenue leads (any budget), leads with revenue under $500k/yr whose ad spend is below $5k/mo, and any lead with ad spend below $3k/mo.

## has_upwork_video: false -- What This Means

Scott is NOT featured in the Upwork profile video. NEVER reference the profile video in connection with Scott. Do NOT say things like:
- "Scott, who I mentioned in my video"
- "check out my profile video where I talk about Scott"
- "my partner Scott, as mentioned on the video"
- "[Scott's name] within ~60 characters of 'video'"

Any video reference linking Scott to the Upwork profile video is factually wrong and is a BLOCK-level error (enforced by `validate_response.py`).

## Handoff Framing (Partner Redirect Mode)

Frame the active partner as the right-fit specialist for their stage, not a downgrade. Use any of:
- "our small business specialist"
- "my partner Scott"
- "Scott on my team"
- "Scott, who specializes in businesses at your stage"

Never mention the $5K threshold, any spend minimum, or explain why they're going to Scott. Route naturally.

## Approved Routing Template

Use this verbatim for pre-booking routing (lead has NOT yet booked). Substitute the lead's actual first name (example uses "Tanya"):

> "Hey Tanya, you'd actually be a great fit for my partner Scott. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://calendar.app.google/WZyDqnmW5kkqkReK9"

If the $500-$800/month range is used, place it as a separate sentence AFTER the template, never inside it.

## Post-Booking Redirect Framing

For leads already booked on the profile calendar with a sub-$3K budget, use keep-the-meeting framing:

> "Sounds like you're actually going to be a better fit for my partner Scott, who I mentioned. He's helped scale businesses exactly like yours. He'll be on the call at the same time."

Never send a booking link to an already-booked lead.

## Sub-Cadence (After Calendar Sent, Lead Hasn't Booked)

- +1 day: "Did you get a chance to look at Scott's calendar?"
- +2 days after (if no response): One more follow-up asking if they're still interested.
- Still no response: Move to standard 60-day nurture sequence.

## Doc-Verified Facts Only

When a lead asks who Scott is, answer only with what is documented here: small business specialist, "my partner" / "on my team," works with businesses at their stage. Typical pricing: $500-$800/month. NOTHING else. No invented last name (his last name is Caldwell but only use it if it comes up naturally -- do not introduce it unprompted). No invented years of experience, certifications, case studies, or results attributed to Scott. If the lead wants to know more, Scott will walk them through his work on the call.

## When Scott Books a Lead

An automated email notification will come through. Once that happens, the lead moves to "referred" status and Creekside stops following up -- Scott owns the relationship from that point.
