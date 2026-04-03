---
name: meta-ads-connector-agent
description: Reference agent that directs users to the correct connector (PipeBoard MCP) for all Meta Ads data operations. Use when anyone asks about pulling Meta Ads data, managing Meta campaigns, or accessing Facebook/Instagram ad accounts.
---

# Meta Ads Connector Reference

## Connector: PipeBoard MCP

All Meta Ads operations go through **PipeBoard**, connected as an MCP server.

### Authentication
- PipeBoard handles all Meta API authentication and token refresh automatically
- All PipeBoard MCP tools are prefixed with `mcp__claude_ai_PipeBoard__` in the tool list
- To discover available accounts, call `get_ad_accounts` first

### Available Operations

**Read Operations (via MCP tools):**
- `get_ad_accounts` — List all accessible ad accounts
- `get_campaigns` / `get_campaign_details` — Campaign data
- `get_adsets` / `get_adset_details` — Ad set data
- `get_ads` / `get_ad_details` — Individual ad data
- `get_insights` — Performance metrics (spend, impressions, clicks, conversions, ROAS, etc.)
- `get_ad_creatives` / `get_creative_details` — Creative assets
- `get_custom_audiences` — Audience data
- `get_pixels` — Pixel/Events Manager data
- `get_lead_gen_forms` — Lead form data
- `get_ad_previews` — Ad preview rendering

**Write Operations (via MCP tools):**
- `create_campaign` / `update_campaign` — Campaign management
- `create_adset` / `update_adset` — Ad set management
- `create_ad` / `update_ad` — Ad management
- `create_ad_creative` / `update_ad_creative` — Creative management
- `create_custom_audience` / `create_lookalike_audience` — Audience building
- `upload_ad_image` / `upload_ad_video` — Asset uploads
- `duplicate_campaign` / `duplicate_adset` / `duplicate_ad` — Duplication

**Search & Targeting:**
- `search_interests` / `search_behaviors` / `search_demographics` — Targeting options
- `search_geo_locations` — Location targeting
- `estimate_audience_size` — Audience size estimation

**Reporting:**
- `create_email_report` / `list_email_reports` — Automated reports

### How to Think About It

- **Need live Meta Ads data?** → Use PipeBoard MCP tools directly
- **Need historical trends from our database?** → Use `meta-ads-analyst-agent` which queries the `meta_insights_daily` table in Supabase
- **Need Google Ads data?** → PipeBoard is NOT for Google Ads. Use the direct Google Ads API instead
- **Need to find a client's ad account ID?** → Call `get_ad_accounts` to list all accessible accounts, then match by name
- **Need Events Manager / pixel data?** → PipeBoard can list pixels via `get_pixels` but cannot access real-time event streams or match quality diagnostics
