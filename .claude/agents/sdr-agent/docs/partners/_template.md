# Partner Template (Future Hire)

Fill in all fields below when onboarding a new white-label partner. Then update `active_partner:` in `sdr-agent.md` to this partner's filename (without `.md`).

## Partner Fields

- **name:** [Full legal name]
- **lead_facing_name:** [First name only, used in all lead-facing messages]
- **calendar_url:** [Full booking URL, e.g. https://calendar.app.google/XXXXXXXX]
- **price_range:** $500-$800/month (update if the new partner uses a different range)
- **has_upwork_video:** [true | false]

## has_upwork_video

- **true**: The partner is featured in the Upwork profile video. The agent MAY reference "my partner [name], who I mentioned in my video" or "as you saw in the video." The validator will allow video+partner co-references.
- **false**: The partner is NOT in the Upwork profile video. The agent must NEVER reference the video in connection with this partner. The validator will BLOCK any co-occurrence of the partner name and video references.

## Routing Trigger

Same as always: lead does not meet the revenue-tier thresholds defined in the Partner Redirect Mode section of `docs/response-guidelines.md`. See that section for the full tier table.

## Handoff Framing

Frame the new partner as the right-fit specialist for their stage. Use any of:
- "our small business specialist"
- "my partner [lead_facing_name]"
- "[lead_facing_name] on my team"

## Approved Routing Template

> "Hey [Lead Name], you'd actually be a great fit for my partner [lead_facing_name]. He specializes in businesses at your stage and has gotten results doing exactly what you're describing. I'd point you his way: [calendar_url]"

Adapt gender ("He/She/They") as appropriate. Adapt lead name only. Never modify the structure or splice budget figures inside the template.

## Switching to This Partner

1. Create this file (filled in) at `.claude/agents/sdr-agent/docs/partners/[slug].md`.
2. Add the new partner to `_PARTNER_REGISTRY` in `validate_response.py`.
3. In the target profile doc(s) (`docs/profiles/peterson.md` and/or `docs/profiles/lindsey.md`), change `active_partner: [old]` to `active_partner: [slug]`. Each profile can have a different active partner.
4. The `agent-edit-monitor.sh` hook will auto-commit and sync to DB.
5. Verify the change by running: `python3 .claude/agents/sdr-agent/validate_response.py --profile peterson /tmp/test_inactive.txt` (draft mentioning the OLD partner name should BLOCK).
