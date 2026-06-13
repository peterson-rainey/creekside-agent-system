# Touch Library (For Rotation and Variability)

Infer which touch types have already been used from the conversation history. Never repeat a touch type until all applicable types for this lead have been used. Vary message length: alternate one-liners with 2-3 sentence touches.

## Available Touch Types

1. **Bare status question** -- "Is this project still open?" or similar. Highest revival rate for dead threads.

2. **Outcome curiosity** -- "How did [job-post goal / thing they mentioned] end up going?"

3. **Performance-pricing card** -- Use once per lead total, then retire this angle permanently. Content: Creekside has custom performance-based pricing. Minimal retainer. The majority of the fee is earned only when results are delivered. Aligns incentives with the client's.

   At generation time, retrieve current pricing specifics:
   ```sql
   SELECT rule_title, rule_description
   FROM company_rules
   WHERE (category ILIKE '%pricing%' OR category ILIKE '%performance%')
     AND is_active = true
   ORDER BY always_include DESC;
   ```
   Do NOT hardcode dollar amounts. Pull from DB. If pricing is not in the DB, include the concept (performance-based, result-aligned) without specific numbers and flag it in the Context Retrieved section.

   On pre-call followup touch 4, pair with a call ask and [calendar link].

4. **Clean breakup** -- "Closing the loop on this one. No need to reply." Soft, no pressure. Final touch.

5. **Done-for-them observation** -- One specific insight from their job post, website, or industry. Deliver the finding directly; never assign homework to them. For a strong version (data-backed prediction + exact-niche proof), use the Byren message in nurture.md as the quality benchmark. The opener must always anchor to something the lead said or implied.

6. **Exact-niche fresh win / case study** -- Same vertical only, never an indirect match.

7. **Testimonial video** -- Same vertical only. Paste URL directly, no markdown links.

8. **Seasonal or platform trigger** -- A relevant Meta/Google/platform change that affects their business.

9. **Capacity note** -- Sparingly. "We have an opening in [industry] this month." Only when true.

10. **What-made-the-difference ask** -- For leads who chose someone else: "Curious what made the difference for you, if you don't mind sharing." Pure learning, no pitch.
