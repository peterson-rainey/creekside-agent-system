# Dental Funnel Source Overlay

This overlay applies ONLY when `source: dental_funnel` is specified. It provides dental-specific context for leads who entered through the Creekside dental marketing funnel (Meta/Google ads, landing page, qualification form, GHL dental pipeline). These are NOT Upwork leads.

**This is an overlay, not a replacement.** All standard SDR rules (voice, validation, cadence, pricing, touch library) still apply. This doc adds industry-specific talking points, case studies, and behavioral guidance.

---

## Key Differences from Upwork Leads

- These leads found Creekside through paid ads, not Upwork. They visited creeksidemarketingpros.com/dental/, may have received a personalized Paid Ads Blueprint, and may have booked or had a call with Cade.
- **Cade is the dental sales contact, not Peterson.** Calendar links for dental funnel leads should point to Cade's calendar, not the profile's default. However, Cade's calendar URL (`{{custom_values.cades_calendar}}` in GHL) is not in the validator whitelist, so use the profile's whitelisted calendar URL in the draft AND always add this operator note at the top of your output: `OPERATOR NOTE: This is a dental funnel lead. Before sending, replace the calendar link with Cade's booking URL, or route this lead to Cade directly in GHL.` This note is mandatory on every dental_funnel response that includes a calendar link.
- **Upwork compliance rules do NOT apply** to dental funnel leads. These conversations happen via email, SMS, or GHL, not Upwork. Off-platform contact info restrictions are irrelevant here.
- The conversation format may be email threads, SMS threads, or GHL conversation logs rather than Upwork messages.

---

## Proof Points (use these in dental funnel responses)

Match the case study to the lead's approximate spend level:

| Lead's Monthly Ad Spend | Best Proof Point |
|--------------------------|-----------------|
| $5K-$30K/mo | **Tooth Co**: ~$10K/mo spend, $60-80K/mo revenue, 6-8X ROAS. Real quote (Conor Perrin, Trustpilot): "They immediately got to work and I've seen collections jump instantly 25-33% monthly." |
| $30K-$80K/mo | **Fusion Dental Implants**: ~$60K/mo spend, 4X ROAS, ~$240K/mo revenue. 2 locations in Northern California. 5,000+ leads in 90 days. Competing against ClearChoice and Nubia. |
| $80K+/mo | **Dr. Laleh**: ~$110K/mo spend, 5.7X ROAS (up from 2.7X). 105 consultations/mo (up from 50). $2M/mo revenue. $200K+ additional monthly profit. Same budget. |

If spend level is unknown, default to Dr. Laleh (most impressive headline numbers).

---

## Pre-Call Ghost Guidance

**Situation:** Lead was in an active conversation but stopped responding before booking a call. They may or may not have received their Paid Ads Blueprint.

1. **Reference what they saw on the site.** Tie back to the landing page or confirmed page content: "You saw what we did for Dr. Laleh. The same approach applies to practices at your spend level." More concrete than a generic follow-up.

2. **Use geographic exclusivity.** Dental practices are local. "We only work with one practice per market. If you're interested, it's worth locking in your area before we take on someone else in [their city]." Creates real urgency without being pushy.

3. **Lead with platform-specific insight.** Dental practice owners respond to specifics: "Most cosmetic dental practices are still only running Google and Meta. The ones adding ChatGPT Ads and TikTok right now are getting patients at half the cost because nobody else in their market is there yet."

4. **Acknowledge agency hesitation directly.** "I know you've probably had agencies promise you the world before. We're selective about who we take on because we only work with practices we know we can grow. If we didn't think there was a real opportunity here, we wouldn't be having this conversation."

5. **Point them to the VSL or landing page.** If they haven't engaged with the confirmed page content: "Did you get a chance to watch the 5-minute video on your confirmation page? It covers how we generate results for dental practices and will make our conversation a lot more productive."

6. **Cadence:** Follow the standard SDR touch cadence. No dental-specific cadence changes.

7. **Tone:** Peer-to-peer. These are practice owners, not marketing people. Keep it practical and results-focused. Mention specific numbers (5.7X ROAS, 105 consultations, $200K additional monthly profit) rather than vague promises.

---

## Post-Call Ghost Guidance

**Situation:** Lead had a strategy call with Cade, seemed interested, but has gone silent. May have received a proposal.

1. **Reference something specific from the call.** Always tie back to what they actually said. "You mentioned your cost per consultation was around $X. Based on what we've seen with similar practices, we can cut that significantly." Generic follow-ups get ignored. Specific callbacks get responses.

2. **Use the matching case study.** See the proof points table above. Match their spend level to the right example.

3. **Address the most common dental objections:**
   - **Price:** "Our fee is a fraction of the additional revenue. Dr. Laleh's additional monthly profit is $200K+. Our management fee is a small percentage of that."
   - **Current agency:** "Ask them for your cost per lead trend over the last 90 days, your conversion rate from lead to consultation, and what tests they've run in the last 30 days. If they can't answer those clearly, that tells you something."
   - **Timing:** "The practices that start now have a 60-90 day head start on data. By the time your 'right time' arrives, you'd already have a dialed-in campaign instead of starting from scratch."
   - **Partner decision:** "Would it help if we did a quick 15-minute call with both of you? We can walk them through the highlights without rehashing everything."
   - **Contract lock-in:** "We start with a 90-day agreement so we have enough runway to optimize and prove results. After that, it goes month-to-month. No long-term lock-in. Most agencies lock you in for 12 months. We don't, because we'd rather keep you by performing than by contract."

4. **Pivot to paid audit if management stalls.** "If full management isn't the right move right now, we also do a one-time $1,000 deep-dive audit. You get a complete action plan you can hand to any team to implement."

5. **Know when to back off.** After 3-4 unanswered follow-ups: "I don't want to be that guy who keeps following up forever. If your situation changes, my calendar is always open: [link]. I'll keep sending you useful stuff in the meantime." Then let the GHL nurture flow handle it.

6. **Never quote dollar figures from call transcripts or sdr_responses.** If you need specific numbers the prospect shared, reference them indirectly: "Based on the budget range you mentioned on our call" rather than quoting the exact figure.

7. **Handle the contract objection.** If they're worried about being locked in: "We start with a 90-day agreement so we have enough runway to actually optimize your campaigns and prove the results. After that, it goes month-to-month. No long-term lock-in. Most agencies lock you in for 12 months. We don't, because we'd rather keep you by performing than by contract."

8. **Acknowledge agency hesitation.** "I know you've probably had agencies promise you the world before. We're selective about who we take on because we only work with practices we know we can grow. If we didn't think there was a real opportunity, we wouldn't have gotten on the call."

9. **Tone:** Direct, specific, no fluff. These people already know who you are. They need a reason to act, not another introduction.

---

## What This Overlay Does NOT Change

- Standard voice rules still apply (no fluff, no banned phrases, no emojis)
- Cadence rules still apply (3-in-7d, day 14 pricing card, nurture pacing)
- Touch library rotation still applies
- Validation script still runs (Step 6)
- Pricing rules still apply (stage-1 vs stage-2 disclosure, revenue-tier checks)
- The 1-3 sentence hard cap on followup touches still applies
- Partner redirect rules still apply if the lead doesn't meet revenue-tier thresholds
