---
name: creekside-client-lifecycle
description: "Guardrails for adding new clients, churning clients, or modifying client engagements in the Creekside dashboard. Forces capture of acquisition source, pricing structure, team allocations, freelancer retainer adjustments, and MRR tracking. Triggered any time someone says 'we landed X', 'we lost X', 'X churned', 'X paid an invoice', 'X is now serviced by Y', 'X changed pricing', 'add X to the dashboard', or any other modification to reporting_clients / canonical clients. Use this skill BEFORE making any DB changes to ensure all downstream costs and dashboards reconcile correctly."
---

# Creekside Client Lifecycle SOP

This skill is a **mandatory checklist** that runs before any client addition, churn, pause, or pricing change. Skipping a step quietly breaks the dashboard.

## Why this exists

Missing one of these steps silently corrupts reports:

- **Forgot acquisition source** → Net New MRR shows "unknown", marketing-source breakdown is wrong
- **Forgot to update freelancer's `monthly_retainer`** when they lose a client → Operator Cost stays artificially high → margins look better than reality
- **Forgot the rev share bump** when Lindsey lands a partner client → her cost is underreported by 1.5% of that revenue
- **Forgot `new_client_mrr` row** → New MRR tile doesn't reflect the client until Square syncs (hours to days later)
- **Forgot to rebalance Lindsey's per-client allocations** when she gains/loses time → per-client profitability is distorted

## When this skill MUST run

If the user says any of these, STOP and walk the checklist:

- "We landed X" / "We just signed X" / "Add X to the dashboard"
- "X paid an invoice" (especially first-time)
- "We lost X" / "X churned" / "X cancelled"
- "X is now on a new pricing" / "X is paying us more/less now"
- "X is now serviced by [freelancer]"
- "X is event-only now" / "X is on pause"
- "Add [freelancer] to [client]" / "Remove [freelancer] from [client]"
- Any change to `reporting_clients`, `clients`, `client_labor_allocations`, `client_bonuses`, or `client_software_costs`

---

## NEW CLIENT Workflow

### Step 1 — Gather required info (NEVER skip)

Ask the user explicitly for each. If they don't have an answer, stop and flag — don't guess.

#### 1a. Identity
- [ ] **Canonical client name** (the legal/business name)
- [ ] **Primary contact name** (who Square invoices come from — required for auto-linking)
- [ ] **Display names** (any alternate names — e.g., "Don Morton" → MLS Signs, "Brandon Stallings" → Snackify)

#### 1b. Acquisition source (REQUIRED for MRR attribution)
Pick ONE — never leave blank:

| Source | When to use | Sub-detail required? |
|---|---|---|
| `upwork` | Direct Upwork inbound (with completed contract via Upwork) | No |
| `partner` | Referral from a partner (Lindsey, Mark/Bottle, Denise, Duct Tape, etc.) | YES — `acquisition_source_detail` = partner name |
| `linkedin` | LinkedIn outreach lead | No |
| `youtube` | Lead from YouTube channel | No |
| `website` | Direct website form fill | No |
| `other` | Anything else | Description in `notes` |

Stored on `clients.engagement_details`:
```json
{ "acquisition_source": "partner", "acquisition_source_detail": "Lindsey" }
```

#### 1c. Pricing structure
Determine the `fee_config` for `reporting_clients`:

| Type | Config shape | When to use |
|---|---|---|
| Flat retainer | `{"type":"flat","amount":1000}` | Fixed monthly fee |
| Percentage of spend | `{"type":"percentage","rate":0.15,"minimum":1000}` | % of ad spend, optional floor |
| Greater of flat OR % | `{"type":"greater_of","flat":1500,"rate":0.20}` | Common — $X minimum or % of spend, whichever is higher |
| Base + percentage | `{"type":"base_plus_percentage","base":2000,"rate":0.1}` | Flat base + % overage |
| Tiered (per platform) | `{"type":"tiered","scope":"per_platform","tiers":[{"rate":0.2,"up_to":15000},{"rate":0.15,"up_to":30000},...],"minimum":1000}` | Decreasing % rates as spend grows |
| Tiered (combined) | Same as above but `"scope":"total"` | Aggregate across platforms |

ALSO capture:
- [ ] **Initial `monthly_revenue`** (best-guess current value)
- [ ] **Initial `monthly_budget`** (expected monthly ad spend — drives % calc)

#### 1d. Platform(s)
- [ ] **Platforms in scope**: `meta`, `google`, `chatgpt`, `programmatic`, `email`, `other`
- [ ] **Per platform**: separate `reporting_clients` rows OR shared (e.g., Myriad pays per-platform separately)
- [ ] **Ad account IDs**: `meta_account_id` (format `act_XXXXX`), Google customer ID

#### 1e. Team assignment
- [ ] **Account manager** (`reporting_clients.account_manager`): "Cade", "Peterson Rainey", "Lindsey", "Scott", etc.
- [ ] **Platform operator** (`reporting_clients.platform_operator`): "Scott C.", "Ahmed I.", "Lindsey B.", "Trent L.", "David", etc.
- [ ] **Operator's monthly contribution from this client**:
  - For per-client-rate operators (Scott, Ahmed, Ade, Trent, Aamir, Jordan): what does this client add to their pay?
  - For salaried operators (Lindsey, David): just hrs/wk allocated, retainer doesn't change unless rev share applies

#### 1f. Lindsey-specific (CRITICAL if Lindsey is involved)

If Lindsey is the manager or operator:
- [ ] **Hours per week** for her on this client
- [ ] **Rev share bump**: If Lindsey LANDED this client (acquisition_source_detail = "Lindsey"), her `monthly_retainer` increases by 1.5% × `monthly_revenue`
- [ ] **Rebalance other Lindsey clients** to reflect her new effective hourly rate (more clients = higher per-client allocation)

Lindsey's `monthly_retainer` math:
```
$7,100 (base) + ~$700-800 (employer payroll taxes) + 1.5% × (sum of revenue from rev-share clients)
```

#### 1g. Square integration
- [ ] If Square has NOT yet synced their first payment, add a `new_client_mrr` row so the New MRR tile reflects them immediately:
  ```sql
  INSERT INTO new_client_mrr (client_name, first_payment_date, monthly_mrr, notes)
  VALUES ('Don Morton', '2026-06-02', 1200, 'MLS Signs - partner (Lindsey)');
  ```
  Use Square's `customer_name` for `client_name` if known (so the name lookup matches).
- [ ] Set `clients.primary_contact_name` to Square's customer name format so future syncs auto-link
- [ ] Add Square's customer name to `clients.display_names` array

### Step 2 — Execute DB changes (in this order)

1. INSERT into `clients` (canonical)
2. INSERT into `reporting_clients` (one per platform)
3. INSERT into `client_labor_allocations` (one per operator per platform)
4. INSERT into `client_bonuses` (if applicable)
5. INSERT into `new_client_mrr` (if Square hasn't synced yet)
6. UPDATE `team_members.monthly_retainer` for each operator whose pay just went up
7. If Lindsey rev share: UPDATE `team_members.monthly_retainer` for Lindsey (+1.5% × revenue)

### Step 3 — Verify the dashboard

Hit the live API and confirm:
- Net New MRR breakdown shows the new client in NEW bucket with correct attribution source
- Active Clients count went up by 1
- Operator Cost went up by the expected freelancer amount(s) + Lindsey rev share
- Per-client Profit on Client tab is sensible

---

## CHURN CLIENT Workflow

### Step 1 — Identify churn type

| Type | Trigger | Treatment |
|---|---|---|
| **Real churn** | Client cancelled, won't return | status='churned', shows in Churn MRR |
| **Refund** | Won then refunded (net zero) | status='churned', monthly_revenue=0, Square invoice → REFUNDED, accounting income → deleted |
| **Pause / event-only** | Will return (e.g., Full Circle Media events) | monthly_revenue=0, status STAYS active, labor allocations deleted, notes updated |

### Step 2 — Execute (mandatory reconciliation)

#### 2a. Status updates
- [ ] `reporting_clients`: `status='churned'`, `churned_date=CURRENT_DATE`, `churn_reason=<description>`
- [ ] `clients` canonical: `status='churned'` ONLY if ALL platform rows are now churned

#### 2b. Freelancer retainer reconciliation (THE EASILY-MISSED STEP)

For EACH operator on the churned client:

| Operator type | What to do |
|---|---|
| **Lindsey** | DELETE the `client_labor_allocations` row. Her `monthly_retainer` STAYS THE SAME (salary-gap absorbs). If she landed this client via rev share, DECREASE retainer by 1.5% × churned revenue. |
| **David** | DELETE the `client_labor_allocations` row. His `monthly_retainer` STAYS THE SAME (also in FULL_TIME_SALARIED_MEMBERS). |
| **Scott, Ahmed, Ade, Trent, Aamir, Jordan** | DELETE the `client_labor_allocations` row AND DECREASE their `team_members.monthly_retainer` by the same amount. Their retainer = SUM of allocations — must stay in sync. |

⚠ **The most common mistake**: forgetting to decrease the non-Lindsey freelancer's `monthly_retainer`. This makes Operator Cost stay artificially high for months.

#### 2c. Lindsey rebalance (if she was on the client)
After deleting her allocation:
- [ ] Compute her new total active hours/week
- [ ] Recompute her effective hourly rate: `(retainer - $400_Mark_Wolf) / (total_hrs_non_Mark_Wolf × 4.33)`
- [ ] Update each remaining Lindsey allocation: `monthly_amount = hrs × new_effective_rate × 4.33`

#### 2d. Refund handling (if applicable)
- [ ] `square_entries.payment_status='REFUNDED'` for the refunded invoice(s)
- [ ] `reporting_clients.monthly_revenue=0` (so they don't show in Churn MRR)
- [ ] DELETE any `accounting_entries` placeholder income rows for this client

### Step 3 — Verify
- Net New MRR shows them in Churn (real churn) or NOT in Churn (refund/pause)
- Operator Cost went DOWN by the freelancer retainer decrease (NOT the gross labor amount — those should match if retainer was kept in sync)

---

## MODIFICATION Scenarios

### Pricing change
- [ ] Update `reporting_clients.fee_config`
- [ ] Update `reporting_clients.monthly_revenue` if stored value changes
- [ ] Result: shows as expansion (if increased) or contraction (if decreased) in Net New MRR

### New platform added (expansion MRR)
- [ ] Add new `reporting_clients` row for the new platform
- [ ] Add labor allocations + bonuses for operator on new platform
- [ ] UPDATE operator's `monthly_retainer` to include the new allocation
- [ ] If Lindsey adds the platform: also rebalance her existing allocations

### Operator change
- [ ] DELETE old operator's allocation row
- [ ] DECREASE old operator's `monthly_retainer` by the amount
- [ ] INSERT new operator's allocation row
- [ ] INCREASE new operator's `monthly_retainer` by the amount
- [ ] UPDATE `reporting_clients.platform_operator` field

### Event-only / paused client (like Full Circle Media)
- [ ] `reporting_clients.monthly_revenue=0`
- [ ] DELETE labor allocations on this client (frees Lindsey's time)
- [ ] DECREASE non-Lindsey operator retainers if any (Lindsey's stays the same)
- [ ] Do NOT churn — they may return
- [ ] Add note in `reporting_clients.notes`: "Event client - revenue $0 between events. When they re-engage, set monthly_revenue to event fee."

---

## Anti-patterns (don't do these)

1. ❌ Adding a new client without asking the user for acquisition source. ("I'll just put 'unknown'" — NO, ask.)
2. ❌ Setting `monthly_retainer` for a non-Lindsey freelancer to a different value than the sum of their allocations.
3. ❌ Deleting a freelancer's allocation when client churns WITHOUT decreasing their retainer.
4. ❌ Adding Lindsey to a client without updating her hours total or rebalancing her per-client costs.
5. ❌ Skipping the `new_client_mrr` row when Square hasn't synced — the New MRR tile shows $0 for them.
6. ❌ Marking a refunded client's `monthly_revenue` as the original amount — they'll show in Churn MRR for a number they never paid.
7. ❌ Adding a partner-sourced client without setting `acquisition_source_detail` to the partner's name.
8. ❌ Forgetting that Lindsey gets 1.5% rev share on clients SHE landed (not all clients she works on).

---

## Quick lookup: who's salary-gap reconciled?

These two ONLY — everyone else has `monthly_retainer = SUM(allocations)`:

```typescript
const FULL_TIME_SALARIED_MEMBERS = new Set(['Lindsey Bouffard', 'David']);
```

If you change either of their statuses (add/remove from this set), the profitability route in `/api/clients/profitability` needs a code update too.
