# Proposal Generation Scripts

Programmatic generators for the Creekside Marketing pricing proposal, the embedded fee-scaling chart, and the sales-call pricing slide deck. Replaces manual edits to the live Google Doc + Google Slides when pricing changes.

## Files

- `proposal_chart.py` -- generates the fee scaling chart (PNG)
- `build_docx.py` -- generates the full proposal (DOCX, embeds the chart)
- `build_slides.py` -- generates the sales-call pricing deck (PPTX, embeds the chart)
- `out/proposal_chart.png` -- chart output
- `out/Pricing_Proposal_Creekside.docx` -- proposal output
- `out/Pricing_Plans.pptx` -- slide deck output

## Pricing-update workflow

When pricing changes, this is the process:

1. **Edit `proposal_chart.py`** -- update `fee_per_platform()` tier breakpoints/percentages and `management_fee()` cap. Update chart annotations if breakpoints shift.
2. **Edit `build_docx.py`** -- update the `ROWS` array in the Investment & Terms section. Make sure the cell text matches the chart math exactly.
3. **Edit `build_slides.py`** -- update the pricing card values and slide 2 commentary.
4. **Run all three scripts in order:**
   ```bash
   cd .claude/agents/proposal-generator-agent/scripts
   python3 proposal_chart.py  # generates chart first
   python3 build_docx.py      # embeds chart, builds proposal
   python3 build_slides.py    # embeds chart, builds slide deck
   ```
5. **Verify outputs** in `out/`. Open the docx + pptx and check the table, chart, and contract section.
6. **Upload to Google Drive:**
   - Replace the proposal at doc ID `169PMfXB9y2gc3UnEHIqZo8Lk8CVBTK9A` (drag the new `.docx` to overwrite).
   - Upload the new `Pricing_Plans.pptx`, then right-click > "Open with Google Slides" to convert to editable Slides format.
7. **Update `docs/pricing-logic.md`** with the new figures so the agent's reference matches.
8. **Update `agent_knowledge` `855a1079`** (Operations Refresh) with the new pricing.

## Dependencies

- `python-docx`
- `python-pptx`
- `matplotlib`
- `numpy`

Install with: `pip3 install python-docx python-pptx matplotlib numpy`

## Current pricing (as of 2026-05-25)

Single plan (Plan B and Plan C removed 2026-05-25):
- $1,500 min/platform (applies until ad spend exceeds $7,500/mo)
- 20% to $30k / 15% to $60k / 10% above $60k (per platform)
- $15k/month cap
- $1,500/platform onboarding

## Key rules baked into the templates

- Communication: Google Chat (NOT Slack -- standing rule)
- Contract: 3-month minimum, month one non-cancellable, $250 cancellation fee for months 2-3, then MTM with 30-day notice
- Signature: "The Creekside Marketing Team"

## History

- 2026-05-25: Simplified from 3-plan to single-plan pricing (Plan B Shared and Plan C Retainer removed)
- 2026-05-15: Original scripts imported from external Anthropic chat session, adapted for macOS, Slack references replaced with Google Chat, contract terms corrected, Plan A minimum threshold clarified
