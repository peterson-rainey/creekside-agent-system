# Pricing Reference -- Current Values

This file is the canonical source for the Step 1 confirmation block. The pricing-update-agent reads this file to display "current" values when Peterson initiates an update.

**Update this file in Step 15 of every pricing update run.**

---

## Current Pricing (as of 2026-05-25)

| Parameter | Value |
|---|---|
| Tier breakpoint 1 | $30,000 |
| Tier breakpoint 2 | $60,000 |
| Rate tier 1 (below breakpoint 1) | 20% |
| Rate tier 2 (breakpoint 1 to 2) | 15% |
| Rate tier 3 (above breakpoint 2) | 10% |
| Minimum per platform | $1,500 |
| Monthly cap (total) | $15,000 |
| Onboarding fee per platform | $1,500 |
| Minimum threshold (min / rate1) | $7,500 |

**Single-plan model.** Plan B (Shared) and Plan C (Retainer) were removed on 2026-05-25.

---

## History

| Date | Change |
|---|---|
| 2026-05-25 | Simplified from 3-plan to single-plan (Plan B Shared and Plan C Retainer removed). All Plan A rates unchanged. |
| 2026-05-15 | Variable tier breakpoints raised to $30K/$60K; minimum raised from $1,000 to $1,500/platform; cap raised from $12K to $15K; onboarding raised from $1,000 to $1,500/platform. |

---

## Grandfathered Exceptions (do not modify these when running a pricing update)

| Client | Terms | Notes |
|---|---|---|
| Shin Nagpal / Village Repair | Onboarding $1K, min $1K, tiers 20/15/10 at $20K/$40K, cap $12K | Pipeline carryover from pre-2026-05-15 pricing. agent_knowledge: "Pricing Exception: Village Repair / Shin Nagpal 2026-05-15" |
| Fusion Dental Implants | $1K/platform onboarding, $2K/mo base + 10% of spend, $10K cap | Signed on Plan B terms before Plan B/C removal. agent_knowledge: dee3545d |
| Dr. Laleh / Lux Dental Spa | $6,000/month flat | Pre-current-pricing contract. agent_knowledge entry: ee5eab92 (Proposal Generator - Pricing Rules, item #2) |

---

## Fee Calculation Formula

```python
def fee_per_platform(spend, breakpoint1, breakpoint2, rate1, rate2, rate3, minimum):
    if spend <= breakpoint1:
        fee = spend * rate1
    elif spend <= breakpoint2:
        fee = breakpoint1 * rate1 + (spend - breakpoint1) * rate2
    else:
        fee = breakpoint1 * rate1 + (breakpoint2 - breakpoint1) * rate2 + (spend - breakpoint2) * rate3
    return max(fee, minimum)

def management_fee(platform_spends, cap):
    return min(sum(fee_per_platform(s, ...) for s in platform_spends), cap)
```

**Minimum threshold calculation:** `minimum / rate1` = the spend level at which the percentage rate naturally exceeds the minimum. Below this spend, the minimum floor applies. Above it, the percentage rate takes over. Example at current pricing: $1,500 / 0.20 = $7,500.
