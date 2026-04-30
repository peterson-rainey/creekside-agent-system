# Staleness Validation Gate (MANDATORY)

Before finalizing the agent or skill file: read every line, ask "Would this still be true in 6 months?" If NO or UNCERTAIN, move to agent_knowledge.

## Common Staleness Patterns That Slip Through QC

Check for ALL of these before shipping:

| Pattern | Example that FAILS | Fix |
|---------|-------------------|-----|
| Hardcoded pricing | "$1,000 onboarding fee" | Store in `agent_knowledge` with tag `pricing`, query at runtime |
| Hardcoded client IDs / ad account IDs | "Meta Ad Account: `act_868498138612020`" | Pull from `client_context_cache` or `reporting_clients` at runtime via `find_client()` |
| Hardcoded team routing | "Route Meta to Cade, Google to Peterson" | Store in `agent_knowledge` with tag `routing`, query at runtime |
| Hardcoded compensation / financial figures | "Owner draws: $8,500/month each" | Store in `agent_knowledge` with tag `financial-reference`, query at runtime |
| Standing corrections with specific amounts | "Nov-Dec ad spend ($16,600) was pass-through" | The correction belongs in `agent_knowledge` with `type='correction'`; the agent's correction-check step pulls it at runtime |
| Case study metrics used as examples | "CPA dropped from $48.79 to $9.58" | Use generic examples ("CPA dropped from $X to $Y") or pull real metrics from DB at runtime |
| Contact names / key personnel | "Kevin / Vizion Enterprise (content creator)" | Store in `agent_knowledge` or `client_context_cache`; people change roles |
| Slack as active platform | "Search Slack for real-time corrections" | Slack is deprecated at Creekside; reference it as historical data only |

## Exceptions (OK to hardcode)

- The Supabase project ID (`suhnpazajrmfcmbwckkx`) -- infrastructure constant
- Table and function names -- schema is stable
- Tool names (MCP tool identifiers) -- these are code references
- Generic dollar examples that are clearly hypothetical ("e.g., $100/day budget")
