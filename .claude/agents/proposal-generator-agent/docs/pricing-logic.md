# Pricing Logic

## CRITICAL: Source of Truth

Pricing is maintained in Google Drive. The current source of truth is:
`https://docs.google.com/document/d/169PMfXB9y2gc3UnEHIqZo8Lk8CVBTK9A/edit`
(Doc ID: `169PMfXB9y2gc3UnEHIqZo8Lk8CVBTK9A`)

This replaces the prior doc `131aD_M5-gPkYuIaoJknWjWKLrQ4wAu8L` as of 2026-05-15.

**The figures below reflect what is IN the live doc as of 2026-05-15. If the fetched doc disagrees, the live doc wins.**

## Current Pricing Structure (from live doc, 2026-05-15)

| Feature | Plan A: Growth | Plan B: Shared | Plan C: Retainer |
|---|---|---|---|
| Best For | Lower initial cost; fee scales with ad spend | Predictable base with lower percentage at scale | Total cost certainty — one flat fee |
| Base Fee | $0 base + $1,500 minimum per platform if spend is under $5K | $3,000 flat base (covers all platforms) | $10,000 flat retainer (covers all platforms) |
| Variable Fee | 20% up to $30K spend; 15% from $30K–$60K; 10% over $60K (per platform, $1,500 minimum) | 10% of total combined ad spend across all platforms | None |
| Monthly Cap | $15,000 / month | $12,000 / month | N/A — always $10,000 |
| Onboarding Fee | $1,500 per platform | $1,500 per platform | $1,500 per platform |

**What changed from the prior pricing (pre-2026-05-15):**
- Plan A base structure: was $1,000 minimum/platform; now $0 base with $1,500 minimum kicking in only when spend < $5K
- Plan A variable tier breakpoints raised: was 20% to $20K / 15% to $40K / 10% over $40K; now 20% to $30K / 15% to $60K / 10% over $60K
- Plan B base raised: $2,000 → $3,000
- Plan C flat fee raised: $8,000 → $10,000
- Plan C onboarding: was waived ($0); now $1,500/platform (CHANGE — Plan C no longer has waived onboarding)
- All plans onboarding raised: $1,000 → $1,500/platform
- Caps raised: Plan A $12K → $15K; Plan B $10K → $12K

## Proposal Display Mode (single-plan vs comparison)

After selecting a plan, determine how many plans to show in the proposal. This is enforced in `build_lead_docx.py` via the `single_plan_mode` parameter.

| Stated monthly ad spend | Plans shown in proposal | Rationale |
|---|---|---|
| Below $5,000/month | Recommended plan only (single-plan mode) | Comparison table adds friction and confusion for sub-$5K leads. Showing three plans invites objection on Plan C pricing they'll never use. |
| $5,000 to $30,000/month | Recommended plan + Plan B (two-plan mode) | The Plan A/B crossover is around $20-30K combined. Showing both is genuinely useful at this tier. |
| Above $30,000/month | All three plans (A, B, C) | At this spend level, Plan C is a real option and the comparison is meaningful. |

The `single_plan_mode` bool passed to `build_lead_docx.py` is derived automatically from `starting_ad_spend` unless explicitly overridden. The derivation logic lives in the script; do not hardcode spend thresholds in the agent prompt.

**Village Repair is the explicit exception:** Shin Nagpal's $2K/month budget is below the $3K qualification floor but was grandfathered as a verification test. His onboarding fee ($1,000) and management fee ($1,000 minimum) reflect OLD pricing. Do not use those figures as a template for future sub-$5K clients.

---

## Plan Selection Decision Tree

### Step 1: Qualification check (must pass BEFORE recommending any plan)

Tiered routing model (refreshed 2026-05-15):

**Tier 1 — Creekside-managed track (Peterson/Cade close personally):**
- Stated budget $5K+/month → book the discovery call
- Post-call adjustment OK down to $3K/month if budget can't reach $5K but prospect will pay our fee
- These leads become Creekside-managed clients

**Tier 2 — Barron white-label routing (sub-$3K leads):**
- Leads with budget under $3K/month who are otherwise a good fit get passed to Barron for white-label fulfillment
- Creekside keeps a referral/spread arrangement
- Use sparingly — not a primary track, only when the lead is a fit
- These leads do NOT go through the proposal-generator-agent flow

**Hard floor — no engagement:**
- Budget under $2K/month AND not a Barron fit → decline politely
- Existing pipeline carryovers from before this rule (e.g., Village Repair) are explicit exceptions, NOT precedent

Other YES criteria for Tier 1:
- Scaling mindset, treats ads as investment
- Has a proven offer/product with margins

NO regardless of budget:
- Price-shoppers or guarantee-seekers
- Status quo mindset, blames previous agencies without self-awareness
- Micromanagers or unwilling to give account access

If a lead doesn't qualify for Tier 1, STOP and tell Peterson. Do not generate a proposal. Peterson decides whether to route to Barron or decline.

### Step 2: Plan selection logic

**Start with the math. Show all three calculations.**

At any given monthly ad spend level:
- Plan A cost = MAX($1,000, 20% of spend) per platform [tiers kick in above $20K/platform]
- Plan B cost = $2,000 + 10% of total combined spend [across all platforms]
- Plan C cost = $8,000 flat

**Crossover points (approximate):**
- Plan B beats Plan A (single platform): spend > ~$22K/month (Plan A at 15% = $3,300 vs Plan B = $2,000 + $2,200 = $4,200 -- actually Plan A still better at $22K; crossover depends on platform count)
- For MULTI-PLATFORM clients: Plan B base splits across platforms, so it often wins at $10-15K combined
- Plan C beats Plan B: combined spend > ~$60K/month ($2,000 + 10% of $60K = $8,000)

**General guidance (show the math, don't just apply these rules):**
- Single platform, $3K-$20K: Plan A usually wins
- Two platforms, $8K-$20K combined: run the math -- often comparable
- Two platforms, $20K+: Plan B often better
- Enterprise, $50K+ or high-certainty account: Plan C worth discussing

### Step 3: Address the optics risk

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

**Form 1 -- Snapshot reference:** "Use OLD Plan A pricing" or "Use 2025 Q4 pricing
snapshot." The agent looks up `agent_knowledge` for an entry tagged
`pricing-snapshot` to resolve the exact figures.

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

### Canonical example: Shin Nagpal / Village Repair (2026-05-15)

- Old pricing used: onboarding=$1,000, min=$1,000, tiers=20/15/10 at $20K/$40K, cap=$12,000
- Standard pricing at time of proposal: onboarding=$1,500, min=$1,500, tiers=20/15/10
  at $30K/$60K, cap=$15,000
- Reason: Deal had been in Creekside's pipeline for months at the old terms.
  Shin had been quoted that pricing verbally.
- agent_knowledge entry created: "Pricing Exception: Village Repair / Shin Nagpal 2026-05-15"
