# Partner: Brady

## Partner Fields

- **name:** Brady Tibbits
- **lead_facing_name:** Brady
- **calendar_url:** https://app.reclaim.ai/m/brady-tibbits/flexible-quick-meeting
- **price_range:** $500-$800/month
- **has_upwork_video:** true

## Routing Trigger

Route to Brady (pre-booking) when the lead does not meet the revenue-tier thresholds defined in the Partner Redirect Mode section of `docs/response-guidelines.md`. This includes: pre-revenue leads (any budget), leads with revenue under $500k/yr whose ad spend is below $5k/mo, and any lead with ad spend below $3k/mo.

## has_upwork_video: true -- What This Means

Brady IS featured in the Upwork profile video. The agent MAY reference "my partner Brady, who I mentioned in my video" or "as you saw in the video." The validator will allow video+partner co-references for Brady (no partner-video co-reference BLOCK applies).

## Handoff Framing (Partner Redirect Mode)

Frame Brady as the right-fit specialist for their stage, not a downgrade. Use any of:
- "our small business specialist"
- "my partner Brady"
- "Brady on my team"
- "Brady, who specializes in businesses at your stage"

Never mention the $5K threshold, any spend minimum, or explain why they're going to Brady. Route naturally.

## Approved Routing Template

Use this verbatim for pre-booking routing (lead has NOT yet booked). Substitute the lead's actual first name (example uses "Tanya"):

> "Hey Tanya, you'd actually be a great fit for my partner Brady. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: https://app.reclaim.ai/m/brady-tibbits/flexible-quick-meeting"

If the $500-$800/month range is used, place it as a separate sentence AFTER the template, never inside it.

## Post-Booking Redirect Framing

For leads already booked on the profile calendar with a sub-$3K budget, use keep-the-meeting framing:

> "Sounds like you're actually going to be a better fit for my partner Brady, who I mentioned. He's helped scale businesses exactly like yours. He'll be on the call at the same time."

("who I mentioned" is allowed because `has_upwork_video: true`.)

Never send a booking link to an already-booked lead.

## Sub-Cadence (After Calendar Sent, Lead Hasn't Booked)

- +1 day: "Did you get a chance to look at Brady's calendar?"
- +2 days after (if no response): One more follow-up asking if they're still interested.
- Still no response: Move to standard 60-day nurture sequence.

## Doc-Verified Facts Only

When a lead asks who Brady is, answer only with what is documented here: small business specialist, "my partner" / "on my team," works with businesses at their stage. Typical pricing: $500-$800/month. NOTHING else. No invented case studies or results attributed to Brady. If the lead wants to know more, Brady will walk them through his work on the call.

## When Brady Books a Lead

An automated email notification will come through. Once that happens, the lead moves to "referred" status and Creekside stops following up -- Brady owns the relationship from that point.
