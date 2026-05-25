# Pricing Logic

## CRITICAL: Source of Truth

Pricing is maintained in Google Drive. The current source of truth is:
`https://docs.google.com/document/d/169PMfXB9y2gc3UnEHIqZo8Lk8CVBTK9A/edit`
(Doc ID: `169PMfXB9y2gc3UnEHIqZo8Lk8CVBTK9A`)

**The figures below reflect the live pricing as of 2026-05-25. If the fetched doc disagrees, the live doc wins.**

## Current Pricing Structure (2026-05-25)

Simplified to a single pricing plan on 2026-05-25. Plan B (Shared) and Plan C (Retainer) were removed. The fee structure is percentage-based with tiered rates and a monthly cap.

| Feature | Value |
|---|---|
| Base Fee | $0 base |
| Minimum Fee | $1,500 per platform (applies until ad spend exceeds $7,500/mo) |
| Variable Fee | 20% up to $30K/month; 15% from $30K-$60K; 10% over $60K (per platform) |
| Monthly Cap | $15,000 / month |
| Onboarding Fee | $1,500 per platform (one-time) |

**What changed on 2026-05-25:**
- Plan B (Shared: $3K base + 10% combined, $12K cap) removed
- Plan C (Retainer: $10K flat) removed
- The former "Plan A" fee structure is now the only pricing plan, no longer labeled with a plan letter
- All Plan A rates, tiers, cap, and onboarding fee remain unchanged
- Proposal display mode logic removed (always single plan)

**What changed on 2026-05-15 (prior update for reference):**
- Variable tier breakpoints raised: 20% to $30K / 15% to $60K / 10% over $60K
- Minimum raised: $1,000 to $1,500/platform
- Cap raised: $12K to $15K
- Onboarding raised: $1,000 to $1,500/platform

**Village Repair exception:** Shin Nagpal's $2K/month budget is below the $3K qualification floor but was grandfathered. His onboarding fee ($1,000) and management fee ($1,000 minimum) reflect OLD pricing via `pricing_override`. Do not use those figures as a template.

---

## Qualification Check (must pass BEFORE generating a proposal)

Tiered routing model (refreshed 2026-05-15):

**Tier 1 -- Creekside-managed track (Peterson/Cade close personally):**
- Stated budget $5K+/month -> book the discovery call
- Post-call adjustment OK down to $3K/month if budget can't reach $5K but prospect will pay our fee
- These leads become Creekside-managed clients

**Tier 2 -- Barron white-label routing (sub-$3K leads):**
- Leads with budget under $3K/month who are otherwise a good fit get passed to Barron for white-label fulfillment
- Creekside keeps a referral/spread arrangement
- Use sparingly -- not a primary track, only when the lead is a fit
- These leads do NOT go through the proposal-generator-agent flow

**Hard floor -- no engagement:**
- Budget under $2K/month AND not a Barron fit -> decline politely
- Existing pipeline carryovers from before this rule (e.g., Village Repair) are explicit exceptions, NOT precedent

Other YES criteria for Tier 1:
- Scaling mindset, treats ads as investment
- Has a proven offer/product with margins

NO regardless of budget:
- Price-shoppers or guarantee-seekers
- Status quo mindset, blames previous agencies without self-awareness
- Micromanagers or unwilling to give account access

If a lead doesn't qualify for Tier 1, STOP and tell Peterson. Do not generate a proposal. Peterson decides whether to route to Barron or decline.

## Fee Calculation

At the prospect's stated monthly ad spend, calculate their fee:

**Per platform:** `fee = MAX($1,500, tiered_rate * spend)` where:
- 20% on the first $30K
- 15% from $30K to $60K
- 10% above $60K

**Total fee** = sum of per-platform fees, capped at $15,000/month.

Show the math explicitly in the proposal. Example:

> "At $8K/month on Google Ads: 20% x $8,000 = $1,600/month management fee. If you add Meta at $5K/month: 20% x $5,000 = $1,500/month (the minimum). Total: $3,100/month across both platforms."

## Addressing the Optics Risk

Pure percentage-of-spend creates an alignment concern ("are you recommending more spend to earn more?"). Address this proactively in the proposal:

> "We only grow if your ad spend grows, which only happens when we're delivering results that justify the investment."

Peterson's verbatim responses to pricing objections:
- "We're not charging based on hours worked. We're charging based on value provided."
- "The people we work with, they won't stay if we aren't driving revenue for their business."
- "We can't control profit margins -- profit sharing would be too complex to scale."

## Pricing Risk Note

Do NOT use objection-handling language in the proposal itself -- that's for the sales call. The proposal should state pricing clearly and move to next steps. Objection handling belongs in the email follow-up or next call.

---

## Pricing Override Mechanism

### When to use an override

An override is appropriate when Creekside made a commitment to a specific prospect at
old pricing terms before the current pricing was in effect. Examples:

- **Existing pipeline carryovers:** A deal has been in negotiation for months under
  the old pricing structure. Using new pricing mid-conversation would break trust.
- **Contractual commitments:** Peterson or Cade verbally quoted a specific price on a
  call that is on record. That quote is a commitment.
- **Executive exception:** Peterson has explicitly approved a one-off departure from
  standard pricing for a strategic reason (e.g., marquee client, referral relationship).
- **Grandfathered Plan B/C clients:** Clients who signed on Plan B or Plan C terms
  before the 2026-05-25 simplification keep their contracted rates. Use `pricing_override`
  to generate any future proposals at their existing terms.

### When NOT to use an override

- A prospect objects to the price and asks for a discount. That is a negotiation
  objection -- handle it on the call, do not silently re-run the proposal with lower
  numbers.
- A prospect "feels like" the price is high. Same rule.
- A prospect compares to a competitor's quote. Same rule.

If Peterson asks for an override in response to a sales objection, flag it: "This
looks like a negotiation scenario rather than a pipeline carryover. Are you sure you
want to log a pricing exception? This creates an audit trail."

### How to pass an override to the agent

Two forms are accepted:

**Form 1 -- Snapshot reference:** "Use pre-2026-05-25 pricing" or "Use Plan B terms
for Fusion." The agent looks up `agent_knowledge` for an entry tagged
`pricing-snapshot` or `pricing-exception` to resolve the exact figures.

**Form 2 -- Explicit values:** Pass a dict of override keys directly:

```
Override pricing: onboarding=$1,000, min=$1,000, variable_rate_desc=20/15/10 at $20K/$40K, cap=$12,000
```

These map to the `pricing_override` dict accepted by `build_lead_docx.py`:

```json
{
  "pricing_override": {
    "onboarding_fee": "$1,000 per platform (one-time)",
    "monthly_min": "$1,000 minimum per platform",
    "variable_rate_desc": "20% up to $20,000/month\n15% from $20,000 to $40,000\n10% above $40,000",
    "monthly_cap": "$12,000 / month"
  }
}
```

### How the override is logged

Every override automatically creates an `agent_knowledge` entry:

- **Type:** `decision`
- **Title:** `Pricing Exception: {lead/client name} {YYYY-MM-DD}`
- **Content:** What was overridden, what the standard pricing would have been, and
  the stated reason for the exception
- **Tags:** `['pricing-exception', 'grandfathered', 'precedent-risk']`

Run `validate_new_knowledge('decision', title, ARRAY['pricing-exception',
'grandfathered', 'precedent-risk'])` before inserting. If BLOCKED, UPDATE instead.

### Output banner (mandatory)

When an override is active, display this banner in the agent's output before
delivering the proposal:

```
NOTE: This proposal uses non-standard pricing per [reason stated].
The override has been logged to agent_knowledge (entry: [title]).
Do NOT use this as precedent for new leads. Every override is a one-off exception
tied to specific pipeline history, not a negotiating baseline.
```

### Validator behavior when override is active

`validate_output.py` does not currently check pricing math. If the validator is
extended in the future to verify pricing figures, it must accept both standard figures
AND any figures present in the active `pricing_override` dict. An override is not a
violation.

### Canonical examples

**Village Repair / Shin Nagpal (2026-05-15):**
- Old pricing used: onboarding=$1,000, min=$1,000, tiers=20/15/10 at $20K/$40K, cap=$12,000
- Standard pricing at time of proposal: onboarding=$1,500, min=$1,500, tiers=20/15/10 at $30K/$60K, cap=$15,000
- Reason: Deal had been in Creekside's pipeline for months at the old terms.
- agent_knowledge entry: "Pricing Exception: Village Repair / Shin Nagpal 2026-05-15"

**Fusion Dental Implants (signed May 2026 on Plan B terms):**
- Contracted rates: $1,000/platform onboarding, $2,000/mo base + 10% of spend, $10K cap
- Reason: Signed before Plan B/C removal. Contractual commitment honored.
- agent_knowledge entry: dee3545d (Fusion + Galleria contract renewal)
