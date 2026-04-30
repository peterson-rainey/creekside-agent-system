# Ads Platform Requirements

Read this doc when building any agent or skill that touches Google Ads, Meta/Facebook/Instagram Ads, or any ad platform.

## Available Ads Skills

Three skills exist in the system. Include them in the agent's methodology when they fit the use case:

### 1. Screenshot Skill (`chrome-screenshot-pipeline`)
- **What it does:** Captures authenticated screenshots from Google Ads, Meta Ads Manager, and other web dashboards via Chrome automation
- **When to include:** When the agent needs to produce visual evidence, audit screenshots, before/after comparisons, or any visual deliverable from an ads platform
- **How to reference in agent file:** Add a step: "For visual evidence or screenshot deliverables, use the `chrome-screenshot-pipeline` skill"

### 2. UI Navigation Skill (`chrome-browser-nav`)
- **What it does:** Navigates authenticated web apps (Google Ads UI, Meta Ads Manager) to extract data, click through settings, read page content -- without producing screenshots
- **When to include:** When the agent needs to read data directly from the ads platform UI that isn't available via API/MCP (e.g., specific UI-only settings, recommendation tabs, policy status, billing details)
- **How to reference in agent file:** Add a step: "For UI-only data not available via API, use the `chrome-browser-nav` skill"

### 3. Ads MCP Connector Skill (`ads-connector`)
- **What it does:** Routes to the correct MCP tools for live ad platform operations -- PipeBoard MCP for Meta/Facebook/Instagram (full read + write), Google Ads MCP for Google (full read + write)
- **When to include:** When the agent needs to read or write live campaign data, pull performance metrics, create/update/pause campaigns, manage audiences, keywords, or creatives via API
- **How to reference in agent file:** Add a step: "For live platform data and campaign operations, use the `ads-connector` skill to route to the correct MCP tools"

### Decision Matrix

| Agent needs to... | Skill(s) to include |
|---|---|
| Pull live performance data via API | `ads-connector` |
| Read UI-only settings or data | `chrome-browser-nav` |
| Capture visual proof / screenshots | `chrome-screenshot-pipeline` |
| Create/update/pause campaigns via API | `ads-connector` |
| Audit an account (comprehensive) | All three |
| Generate a visual report | `ads-connector` + `chrome-screenshot-pipeline` |
| Scrape keyword data from UI | `chrome-browser-nav` |
| API/MCP unavailable or error-prone | `chrome-browser-nav` (first-class fallback for ANY platform) |

## Google Ads Transparency Center: Domain-Based Search

Any agent that reads from the Google Ads Transparency Center (adstransparency.google.com) MUST search by the competitor's website **domain**, NOT by business name or advertiser name.

**Why:** The Transparency Center indexes advertisers by their verified legal entity name (e.g., "William M. Dorfman D.D.S., a Professional Corporation"), not by how people refer to them. Searching "Dr. Bill Dorfman" returns 0 results. Searching "billdorfmandds.com" returns 30 ads.

**Required methodology step (copy into every TC-using agent):**
```
## Transparency Center Search
- ALWAYS search by the competitor's website domain (e.g., "billdorfmandds.com")
- Look for the domain under the "Websites" section in the autocomplete dropdown
- Do NOT search by business name, practice name, or person name as the primary method
- Fallback sequence if domain returns nothing: try without www, try root domain only, try Google My Business name, search web for "[competitor] google ads transparency" to find their advertiser ID URL
```

## Client Context Requirement (MANDATORY for Ads-Related Agents)

Any agent you build that operates on a specific client or lead's ad account MUST pull comprehensive context on that client/lead BEFORE generating output. Ads recommendations divorced from client context are generic advice.

**Required methodology step (copy into every ads agent's workflow):**

```
## Pull Client/Lead Context (MANDATORY before generating output)

1. Resolve the client/lead via `find_client()` (see Client Resolution in quality-gates.md)
2. If matched, pull all available context BEFORE generating recommendations:
   - `client_context_cache` -- current strategy, goals, offer, pricing, positioning notes
   - Recent Fathom calls -- `search_all('<client_name>', 'fathom_entries', 10)` + raw text via `get_full_content_batch()`
   - Recent Gmail threads -- `search_all('<client_name>', 'gmail_summaries', 10)`
   - Recent ClickUp tasks/comments and Google Chat mentions for the client
   - Google Drive docs (contracts, onboarding sheets, strategy docs, brand guidelines)
   - Financial context -- `accounting_entries` for revenue, Square for payments, pricing tier
   - Prior ads work -- `agent_knowledge` entries tagged with the client name, historical campaign performance from `meta_insights_daily` / `google_ads_insights_daily`
   - Current live ad data via `ads-connector` skill (campaigns, ad sets, creatives, keywords) when relevant
3. If the target is a lead (not yet a client), pull from `leads`, discovery-call Fathom records, proposal docs, and Gmail threads with the lead
4. If NO match is found, explicitly tell the user and ask whether to proceed with generic analysis OR pause for clarification -- never silently produce generic output
5. Synthesize context into the output: reference brand voice, offer structure, prior results, stated goals, and known constraints in the recommendation itself (not just as a preamble)
```

## QC Build Gate (mandatory for ads-related agents)

Before marking any ads-related agent build COMPLETE:
- VERIFY the agent's methodology includes a "Pull Client/Lead Context" step that happens BEFORE output generation
- VERIFY the agent explicitly queries `client_context_cache` AND at least one communication source (Fathom/Gmail/ClickUp)
- VERIFY the agent pulls prior ads performance data when historical context is relevant to the task
- VERIFY the agent handles the "no match found" case explicitly (does not silently proceed with generic advice)
- VERIFY the agent's output format requires referencing the pulled context, not just listing it
- REJECT ads agents that generate recommendations without first loading client/lead context

## Pre-Build Corrections (ads-specific)

When the new agent or skill touches Google Ads, Meta Ads, or any ad platform, pull this entry:
```sql
SELECT id, title, content
FROM agent_knowledge
WHERE id = 'e94f86a68-c6e4-483d-ac34-d8547fbe9253';
-- "agent-builder-agent: 12 ad-platform learnings to apply when building ANY ads-related agent or skill"
```
This entry has 7 API-side gotchas (A1-A7), 5 UI-side gotchas (U1-U5), and 3 methodology patterns (M1-M3). Embed the relevant ones into the new agent's gotcha list verbatim.

When you discover a NEW ad-platform learning during a build:
1. Append it to entry `94f86a68-c6e4-483d-ac34-d8547fbe9253` (UPDATE, do NOT INSERT)
2. Propagate it to the relevant skill file (`.claude/skills/ads-connector/SKILL.md` for API gotchas, `.claude/skills/ads-ui-navigation/SKILL.md` for UI gotchas)
3. The skill file edits are auto-synced to `system_registry` and `agent_knowledge` by hooks, and auto-committed/pushed to GitHub
