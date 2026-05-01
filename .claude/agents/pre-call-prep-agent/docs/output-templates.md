## Output Templates

Use the template matching the classified call type. Skip any section that has no data -- don't include empty placeholders. For follow-up calls (any type where there's a prior call), prepend the Follow-Up Overlay before the type-specific content.

---

### Follow-Up Overlay (Prepend When Prior Call Exists)

This goes at the top of ANY brief where Peterson has met this person before. It's the highest-value section.

```
### Since Last Call ([Date] -- "[Meeting Title]")
[source: fathom_entries, id] | Transcript reviewed: Yes/No

**Action Items Set Last Call:**
- [x] [Completed item -- what was done]
- [ ] [Open item -- current status]
- [ ] [Blocked item -- what's blocking it]

**What Happened Since:**
- [Date]: [Email/Chat/Task] -- [1-line summary]
- [Date]: [Email/Chat/Task] -- [1-line summary]

**Commitments Still Open:**
- Peterson: [What he said he'd do] -- [done/not done]
- [Other person]: [What they said they'd do] -- [status if known]
```

---

### Sales / Discovery Call

```
## Prep: [Name] -- [Business Name] (Discovery)
[Date/Time CT] | Source: [Upwork/Referral/Website/Cold] | Status: [new/contacted/proposal_sent]
[Time pressure: Hard stop at X:XX -- [next meeting]] (only if applicable)

### Who They Are
[Business name, industry, what they do. 2-3 sentences from leads.notes, ClickUp, or website research.]
[Website: URL | "No website found -- ask on the call"]
[source: leads, id]

### What We Know
- [Key fact from leads.notes or ClickUp task]
- [Current marketing situation / ad spend if mentioned]
- [What they said their problem is]
- [Previous agency experience if mentioned -- Peterson uses this for rapport]
- [Budget indicators if available]
[source citations]

### Website Research
[3-5 bullets from WebFetch. What the business does, target market, marketing presence, team size.]
[Skip this section entirely if no website was available or fetchable.]

### Prior Contact Timeline
[Chronological list of every touchpoint]
- [Date]: [Channel] -- [What happened, who was involved]
- [Date]: [Channel] -- [What happened]

### Upwork Note
[Only include if lead came from Upwork]
Peterson has already read the Upwork chat. New info NOT in the Upwork thread:
- [Info from other sources Peterson hasn't seen]
[If nothing new: "No additional info found beyond the Upwork chat."]

### Proposals / Audits Delivered
[List any documents, Loom audit videos, or proposals already sent with dates]
[source: loom_entries/gdrive_operations, id]

### Cade's Notes
[Only if Cade had prior contact. Summarize what he discussed, what was promised, concerns flagged.]
[source: fathom_entries, id]

### Gaps to Explore
[Questions based on what we DON'T know -- what Peterson should learn on this call]
- [Specific gap 1]
- [Specific gap 2]

### Flags
[Concerns, red flags, data conflicts. Mark anything stale.]
```

---

### Client Check-In Call

```
## Prep: [Client Name] -- Check-In
[Date/Time CT] | Platforms: [Google/Meta/Both] | Budget: $[X]/mo
[Time pressure: Hard stop at X:XX -- [next meeting]] (only if applicable)

### Team
| Platform | Operator | Account Manager |
|----------|----------|----------------|
[From reporting_clients]

### Performance Snapshot
[From the last 7 days of ad data. Show only the metrics that matter for this client's KPI.]
| Metric | This Week | Prior Week | Trend |
|--------|-----------|------------|-------|
| Spend  | $[X]      | $[X]      | [up/down/flat] |
| [KPI]  | [value]   | [value]   | |
| Cost/[KPI] | $[X]  | $[X]      | |
[source: meta_insights_daily / google_insights_daily]
[Flag anomalies: spend 20%+ off budget, conversion drops, tracking gaps]

### Open Tasks
| Task | Status | Assignee | Due |
|------|--------|----------|-----|
[Top 5-10 active tasks. Overdue items bolded.]
[source: clickup_entries]

### Issues & Flags
- [Escalations, overdue items, health score warnings, churn signals]
- [Client health score: X/100] [source: client_health_scores]
- [Analyst notes if any] [source: ads_knowledge]
- [Mentions in other calls -- e.g., discussed in internal sync]

### Financial
[Last 3 months revenue trend. Flag open/overdue invoices. Keep to 2-3 lines.]
[source: revenue_by_client / square_entries]
```

---

### Internal / Team Sync

```
## Prep: [Name] -- [Role] Sync
[Date/Time CT]
[Time pressure: Hard stop at X:XX] (only if applicable)

### Their Portfolio
| Client | Platform | Role |
|--------|----------|------|
[Clients they manage as operator or account manager]
[source: reporting_clients]

### Portfolio Flags
[Only clients with issues -- low health scores, overdue tasks, recent escalations]
- [Client]: [Issue summary] (health: [X]/100)

### Open Items Involving [Name]
- [Action item / task -- status]
- [Action item / task -- status]
[source: action_items / clickup_entries]

### Ops Context
[Only for ops-level syncs (Cade, Scott). Skip for VA/contractor syncs.]
[Critical pipeline alerts, system issues, recent failures]
```

---

## Formatting Rules

1. **Bullet points, not paragraphs.** Peterson scans, he doesn't read prose.
2. **Bold the most important info** in each section -- the thing Peterson would look for first.
3. **Source citations on key facts:** `[source: table, id]`. Not every bullet, but dollar amounts, commitments, and dates must cite.
4. **Stale data marker:** `[STALE -- X months old]` for anything > 3 months.
5. **Low-confidence marker:** `[INFERRED]` for anything not directly from a database record.
6. **Skip empty sections.** If a query returned nothing, don't include the section header. Note the gap in a single "Data Gaps" line at the bottom instead.
7. **Target length:** Client calls ~1 page. Sales calls up to 1.5 pages (more research). Internal calls ~half page.
