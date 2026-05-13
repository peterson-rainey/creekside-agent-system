# Meta Audit PDF Template

This file contains the full section-by-section structure for the Creekside-branded audit document.

The format blends the **JSM-Sensate diagnostic style** (diagnostic-first, quantified findings, clear problem/impact/fix structure) with the **B2B Rocket Phase 1/2/3 framework** (90-day roadmap organized in three phases).

---

## File Naming

`/tmp/meta-audit-[ACCOUNT_SLUG]-[YYYY-MM-DD].pdf`

`ACCOUNT_SLUG` = account name lowercased, spaces to hyphens, special characters removed.
Example: "Sensate 2026" -> `sensate-2026`

---

## Creekside Branding Conventions

**Header/cover:**
- Agency name: Creekside Marketing
- Tagline (optional): Data-Driven Paid Social
- Colors: Use clean white/dark layout. No garish color blocks.
- Logo: Include "Creekside Marketing" as text header if logo file unavailable

**Typography:**
- Headers: Bold, clear hierarchy (H1 > H2 > H3)
- Body: Clean sans-serif, readable at 11pt
- Tables: Simple borders, alternating light row colors

**Voice and tone (NON-NEGOTIABLE):**
- No em dashes. Use double hyphens (--) or restructure.
- No emojis.
- No hedging ("could potentially", "may benefit from", "it seems").
- Direct statements. "Fix X because Y."
- Contractions OK in narrative sections ("you're", "we've", "don't").
- Write to the business owner, not a marketing manager.
- Lead with wins. Every section that identifies a problem also states the fix.
- Dollar impact wherever data supports it.

---

## PDF Section Structure

### Cover Page

```
[Creekside Marketing Logo / Header]

META ADS ACCOUNT AUDIT

Prepared for: [Account Name]
Account ID: [act_XXXXXX]
Audit Date: [Month DD, YYYY]
Prepared by: Creekside Marketing

CONFIDENTIAL
```

---

### Page 1: Executive Summary

**Headline:** What We Found in [Account Name]'s Meta Ads Account

**Checklist Scorecard Table:**

| Section | Items Evaluated | Pass | Fail | Score |
|---------|----------------|------|------|-------|
| Account & Pixel Health | [N] | [N] | [N] | [%]% |
| Campaign Structure | [N] | [N] | [N] | [%]% |
| Audience Strategy | [N] | [N] | [N] | [%]% |
| Ad Creative Quality | [N] | [N] | [N] | [%]% |
| Budget & Bidding | [N] | [N] | [N] | [%]% |
| Attribution & Tracking | [N] | [N] | [N] | [%]% |
| Placement Strategy | [N] | [N] | [N] | [%]% |
| Compliance & Policy | [N] | [N] | [N] | [%]% |
| **TOTAL** | **[N]** | **[N]** | **[N]** | **[%]%** |

**Overall Grade:** [A/B/C/D/F] based on score:
- 90-100%: A (well-managed account)
- 75-89%: B (solid foundation, gaps exist)
- 60-74%: C (significant issues, performance drag)
- 45-59%: D (major structural problems)
- < 45%: F (account needs a rebuild)

**What This Means:**
2-3 sentences in plain language. "Your account passed [X]% of our 70-point audit. The main issues are in [top 2 sections]. The good news: [top win]."

**Easy-Win Highlights (top 3 quick fixes):**
1. [Issue] -- [one-sentence fix]
2. [Issue] -- [one-sentence fix]
3. [Issue] -- [one-sentence fix]

---

### Page 2: What's Working

**Headline:** The Wins in This Account

For every PASS on a high-severity item, write a brief bullet:
- "Your pixel is firing correctly and your Event Match Quality score is [X] -- this is above average."
- "You have [N] custom audiences built, including a [X-day website visitor] audience ready for retargeting."
- "Your cost per lead of $[X] is below the [vertical] industry average of $[Y]."

Be specific. Use numbers from the data pull. Do not list generic platitudes.

Minimum 3 wins. Maximum 8 wins. If the account has very few wins, be honest but fair.

---

### Page 3-5: Critical Issues Found

**Headline:** What's Holding This Account Back

For each CRITICAL and HIGH FAIL, write one subsection:

```
[ISSUE TITLE IN BOLD -- e.g., "No Retargeting Campaigns"]

What we found:
[Specific finding with data. E.g., "Of the [N] active campaigns in this account, zero are targeting
people who have already visited your website. The pixel has tracked [X] visitors in the last 30 days --
none of them are being followed up with paid ads."]

Why it matters:
[Dollar/performance impact. E.g., "Retargeting audiences convert at 3-5x the rate of cold audiences
at a fraction of the cost. You're paying top-dollar for cold traffic while warm leads go cold."]

The fix:
[Specific action. E.g., "Set up a retargeting campaign targeting all website visitors from the last
30 and 90 days. Separate adsets for page visitors who did not convert vs. those who engaged with
a specific service page."]
```

Order issues by severity: CRITICAL first, then HIGH.

Include evidence citations for every finding: `[source: PipeBoard/Meta, act_XXXXXX, field_name]`

---

### Page 6-7: Opportunities Found

**Headline:** Where This Account Can Grow

For each MEDIUM FAIL, write a condensed version of the above format (2 paragraphs max per issue):

```
[ISSUE TITLE]
What we found: [finding]
The fix: [action]
```

---

### Page 8: Performance Snapshot

**Headline:** Account Performance: Last 30 Days

Pull from `get_insights` account-level and campaign-level data:

```
ACCOUNT OVERVIEW (Last 30 Days)

Total Spend:          $[amount]
Impressions:          [number]
Reach:                [number]
Clicks:               [number]
CTR:                  [%]
CPC:                  $[amount]
CPM:                  $[amount]
Average Frequency:    [number]

Conversions:          [number]
Cost Per Conversion:  $[amount]
```

**Top Campaigns Table:**

| Campaign | Spend | Impressions | Clicks | CTR | CPA |
|----------|-------|-------------|--------|-----|-----|
| [name] | $[X] | [N] | [N] | [%]% | $[X] |
| [name] | $[X] | [N] | [N] | [%]% | $[X] |

**Performance Commentary:**
2-3 sentences interpreting the numbers in the context of the findings. "Your $[X] spend generated [N] conversions at $[X] CPA. Given the [issue found], there is clear room to improve this."

---

### Page 9-10: 90-Day Improvement Plan (B2B Rocket Phase Structure)

**Headline:** The 90-Day Plan to Fix This Account

---

**Phase 1 -- Foundation (Days 1-30)**

Fix the critical issues. These are the items blocking performance at a basic level.

For each CRITICAL FAIL, list it as a task:

```
Task: [Action]
Why now: [1 sentence]
Expected impact: [what changes]
Who does it: Creekside | [Your team]
Timeline: Week [N]
```

End Phase 1 with: "At the end of Day 30, the account will have [N critical issues] resolved and a clean foundation to scale from."

---

**Phase 2 -- Optimization (Days 31-60)**

Fix the high-severity issues and begin systematic testing.

Same format as Phase 1. Focus on:
- Audience structure improvements
- Creative testing plan (minimum 3 ad variants per adset, video assets)
- Attribution and tracking cleanup

End Phase 2 with: "By Day 60, the account will be testing [N creative variants], running a full-funnel strategy (cold + retargeting), and tracking conversions accurately."

---

**Phase 3 -- Scale (Days 61-90)**

Optimize what Phase 1-2 built. Add medium-severity improvements.

Focus on:
- Budget reallocation to top performers
- Lookalike audience expansion
- Placement testing (Reels, Stories)
- Advanced bidding strategy

End Phase 3 with: "By Day 90, you'll have a systematically optimized account that can scale budget without wasting spend on structural inefficiencies."

---

### Page 11: Next Steps

**Headline:** What Happens Next

Two columns:

**What Creekside handles:**
- [List of specific Phase 1-3 tasks Creekside would execute as the agency]

**What we need from you:**
- [Assets, approvals, access required from the client]

**Investment:**
[Leave blank or write: "Our management fee is based on your ad spend. We'll cover the exact numbers in our kickoff call."]

**Contact:**
[Peterson Rainey / Creekside Marketing / [contact info from client context or leave as placeholder]]

---

### Appendix: Full Checklist Results

One page showing the complete 70-item checklist with PASS / FAIL / N/A for every item. No prose -- just the table.

| # | Item | Result | Evidence |
|---|------|--------|----------|
| 1.1 | Pixel Installed | PASS/FAIL | [brief evidence] |
| ... | ... | ... | ... |

---

## PDF Generation Instructions

Use `mcp__desktop-commander__write_pdf` with the following approach:

1. Build the full document content as structured HTML or rich text
2. Use clear section separators and page breaks
3. Include all tables formatted as HTML tables for clean rendering
4. Embed data values directly -- do not use placeholder text in the final PDF
5. File path: `/tmp/meta-audit-[ACCOUNT_SLUG]-[YYYY-MM-DD].pdf`

If `write_pdf` fails, write markdown to `/tmp/meta-audit-[ACCOUNT_SLUG]-[YYYY-MM-DD].md` and report fallback prominently.
