## Platform-specific references

For Google Ads navigation details (URLs, auth detection, account switching, loading behavior, recommendations, DOM snippets), read `reference/google-ads-nav.md`.

For Meta Ads Manager navigation details (URLs, auth detection, account switching, access model, loading behavior), read `reference/meta-ads-nav.md`.

For ready-check mechanics, DOM cookbook, session stability, error recovery, sorting/filtering, and teardown rules, read `reference/ready-checks.md`.

For known gotchas, edge cases, and stress-tested behaviors (Google Ads, Meta, Merchant Center), read `reference/gotchas.md`.

## External references

- `chrome-screenshot-pipeline` skill -- screenshot capture (companion skill, same Chrome MCP foundation)
- `ads-connector` skill -- MCP-first routing for Meta + Google Ads; falls back to this skill when MCP can't do the job
- `/Users/petersonrainey/scripts/screenshot_pipeline/ready_check.js` -- deterministic per-app readiness IIFE
- `/Users/petersonrainey/scripts/screenshot_pipeline/capture_config.json` -- per-app settle/retry config
- `agent_knowledge` SOP `SOP: E-Commerce Audit Navigation Reference` -- fuller URL reference for the ecom audit case
- `agent_knowledge` pattern `Google Ads UI: click-based navigation paths (Aura Displays run 2026-04-17)` -- verified DOM selectors and the ad-blocker blocker gotcha
