# Proposal Generation Scripts

Programmatic generators for the Creekside Marketing pricing proposal, the embedded fee-comparison chart, and the sales-call pricing slide deck. Replaces manual edits to the live Google Doc + Google Slides when pricing changes.

## Files

- `proposal_chart.py` — generates the fee comparison chart (PNG)
- `build_docx.py` — generates the full proposal (DOCX, embeds the chart)
- `build_slides.py` — generates the sales-call pricing deck (PPTX, embeds the chart)
- `out/proposal_chart.png` — chart output
- `out/Pricing_Proposal_Creekside.docx` — proposal output
- `out/Pricing_Plans.pptx` — slide deck output

## Pricing-update workflow

When pricing changes, this is the process:

1. **Edit `proposal_chart.py`** — update the `plan_a_per_platform`, `plan_b`, and `plan_c` functions. Update the crossover annotation coordinates (`ax.scatter` and `ax.annotate` calls) if breakpoints shift.
2. **Edit `build_docx.py`** — update the `ROWS` array in the Investment & Terms section. Make sure the cell text matches the chart math exactly.
3. **Edit `build_slides.py`** — update the `PLANS` list with new values; update the slide 2 commentary if crossover dollar amounts shift.
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
   - Upload the new `Pricing_Plans.pptx`, then right-click → "Open with Google Slides" to convert to editable Slides format. Replace the existing slide deck file in the same folder.
7. **Update `docs/pricing-logic.md`** with the new figures so the agent's reference matches.
8. **Update `agent_knowledge` `855a1079`** (Operations Refresh) with the new pricing.

## Dependencies

- `python-docx`
- `python-pptx`
- `matplotlib`
- `numpy`

Install with: `pip3 install python-docx python-pptx matplotlib numpy`

## Current pricing (as of 2026-05-15)

- **Plan A**: $1,500 min/platform (applies until ad spend exceeds $7,500/mo), 20% to $30k / 15% to $60k / 10% above $60k, $15k cap, $1,500/platform onboarding
- **Plan B**: $3,000 flat base, 10% combined, $12k cap, $1,500/platform onboarding
- **Plan C**: $10,000 flat retainer, no variable, no cap, $1,500/platform onboarding

## Key rules baked into the templates

- Communication: Google Chat (NOT Slack — standing rule)
- Contract: 3-month minimum, month one non-cancellable, $250 cancellation fee for months 2-3, then MTM with 30-day notice
- Signature: "The Creekside Marketing Team"

## History

Original scripts written by an external Anthropic chat session (Linux sandbox). Imported, fixed, and installed at Creekside on 2026-05-15:
- Linux paths corrected for macOS
- Slack references replaced with Google Chat (3 places)
- Contract terms corrected from "Month-to-Month Partnership" to actual policy
- Plan A minimum threshold language clarified (math: $1,500 floor applies until $7,500 spend, not $5K)
- Stale chart docstring updated
