## Output Templates

Use the template matching the classified call type. Skip any section that has no data -- don't include empty placeholders. State skipped sections in a single "Data Gaps" line at the bottom. For any call where Peterson has met this person before, prepend the Follow-Up Overlay.

---

### Follow-Up Overlay (Prepend When a Prior Call Exists -- Any Call Type)

This is the highest-value section for repeat contacts. It goes at the top, before the type-specific content.

```
### Since Last Call ([Date] -- "[Meeting Title]")
[source: fathom_entries, ID] | Transcript: Full / Partial / Not available
[from: raw_text] or [from: summary]

**Action Items Set Last Call:**
- [x] [Completed item -- what was done]
- [ ] [Open item -- current status if known]
- [ ] [Blocked item -- what is blocking it]

**What Happened Since ([LAST_CALL_DATE] to today):**
- [Date]: [Email / Chat / Task] -- [1-line summary]
- [Date]: [Email / Chat / Task] -- [1-line summary]

**Commitments Still Open:**
- Peterson: [What he said he'd do] -- [done / not done]
- [Other person]: [What they said they'd do] -- [status if known]
```

---

### Sales / Discovery Call (Type 1)

```
## Prep: [Name] -- [Business Name] (Discovery)
[Date/Time CT] | Source: [Upwork/Referral/Website/Cold] | Status: [new/contacted/proposal_sent]
[ROUTING: Facebook-only -- route to Cade, not Peterson] (include only if applicable)
[Time pressure: Hard stop at X:XX -- [next meeting]] (include only if applicable)

### Who They Are
[Business name, industry, what they do. 2-3 sentences from leads.notes, ClickUp, or website research.]
[Website: URL] or [No website found -- ask on the call]
[source: leads, ID] [HIGH/MEDIUM/LOW]

### What We Know
- [Key fact from leads.notes or ClickUp task]
- [Current marketing situation / ad spend if mentioned]
- [What they said their problem is]
- [Previous agency experience if mentioned]
- [Budget indicators if available]
[source citations]

### Website Research
[3-5 bullets: what the business does, target market, marketing presence, team size]
[from: WebFetch] or [Skip section if no website was available or fetchable]

### Prior Contact Timeline
[Chronological list of every touchpoint]
- [Date]: [Channel] -- [what happened, who was involved]
- [Date]: [Channel] -- [what happened]

### Warm-Up Sent
[Number of warm-up messages sent and which resources -- tells Peterson what the prospect has already seen]
[If none: "No warm-up messages found."]

### Upwork Note (Only if lead came from Upwork)
Peterson has already read the Upwork chat. New info NOT in the Upwork thread:
- [Info from other sources Peterson hasn't seen]
[If nothing new: "No additional info found beyond the Upwork chat."]

### Proposals / Audits Delivered
[List any documents, Loom audit videos, or proposals already sent, with dates]
[source: loom_entries/gdrive_operations, ID]

### Cade's Notes (Only if Cade had prior contact)
[Summarize what he discussed, what was promised, concerns flagged]
[source: fathom_entries, ID]

### Data Gaps
[One-line list of sources checked that returned nothing]
```

---

### Cold Outreach Call (Type 7)

Same as Sales / Discovery template above, with this addition at the top:

```
## Prep: [Name] -- [Business Name] (Cold Outreach)
[Date/Time CT] | Source: Cold Call | Status: [new/follow-up]

> OFFER: Cold calling offer applies -- free until profitable. NOT the standard percentage-of-spend model.
> [source: fathom_entries, e928fc5b]

[Remainder same as Discovery template]
```

---

### Follow-Up Call -- Non-Closed Lead (Type 2b)

```
## Prep: [Name] -- [Business Name] (Follow-Up Pre-Call)
[Date/Time CT] | Source: [source] | Board Status: Follow Up Pre-Call
[Time pressure: Hard stop at X:XX] (only if applicable)

### Why They Didn't Close on Call 1
[What was the sticking point? Price, timing, competitor, needs more info, wrong person?]
[source: fathom_entries/clickup_entries, ID] [HIGH/MEDIUM/LOW]

### Likelihood to Close
[Based on last call sentiment, follow-up activity, any signals since]

[Follow-Up Overlay here -- what happened since call 1]

[Then: Who They Are, What We Know, Website Research, Proposals/Audits from Discovery template]
```

---

### Client Check-In Call (Type 3)

```
## Prep: [Client Name] -- Check-In
[Date/Time CT] | Platforms: [Google/Meta/Both] | Budget: $[X]/mo
[Time pressure: Hard stop at X:XX] (only if applicable)

[Follow-Up Overlay here -- prior call delta]

### Team
| Platform | Operator | Account Manager |
|----------|----------|----------------|
[From reporting_clients]

### Performance Snapshot (Last 7 Days vs Prior 7 Days)
[Show only the metrics that matter for this client's KPI]
| Metric | This Week | Prior Week | Trend |
|--------|-----------|------------|-------|
| Spend | $[X] | $[X] | [up/down/flat] |
| [KPI] | [value] | [value] | |
| Cost/[KPI] | $[X] | $[X] | |
[Flag anomalies: spend 20%+ off budget, conversion drops, tracking gaps]
[Never cite ROAS targets unless confirmed in Fathom recordings or client records]
[source: meta_insights_daily / google_insights_daily] [HIGH]

### Open Tasks
| Task | Status | Assignee | Due |
|------|--------|----------|-----|
[Top 5-10 active tasks. Bold overdue items.]
[source: clickup_entries]

### Issues and Flags
- [Escalations, overdue items, churn signals] [source: table, ID]
- Client health score: [X]/100 [source: client_health_scores] [HIGH]
- [Analyst notes] [source: ads_knowledge]
- [Mentions in other calls -- e.g., discussed in internal sync]

### Financial
[Last 3 months revenue trend. Flag open or overdue invoices. 2-3 lines max.]
[source: revenue_by_client / square_entries] [HIGH]

### Data Gaps
[One-line list of sources checked that returned nothing]
```

---

### Joint Pitch (Type 4)

```
## Prep: [Prospect Name] -- Joint Pitch with [Partner Name]
[Date/Time CT] | Partner: [Full Circle / Adam Holcomb / Erika Schlick]
[Time pressure: Hard stop at X:XX] (only if applicable)

### Role Split
[What is Peterson's portion? What is the partner's portion?]
[Flag if unknown -- Peterson will ask: "What portion specifically do you need me to be handling?"]

[Follow-Up Overlay if prior call exists]

[Then: Who They Are, What We Know, Website Research from Discovery template]

### Verified Performance Targets
[Only include targets explicitly confirmed in Fathom recordings or client records]
[If none confirmed: "No verified targets found -- do not cite ROAS numbers on this call"]
[source: fathom_entries, ID] [HIGH]
```

---

### Internal / Team Sync (Type 5)

```
## Prep: [Name] -- [Role] Sync
[Date/Time CT]
[Time pressure: Hard stop at X:XX] (only if applicable)

[Follow-Up Overlay if a prior call with this person exists]

### Their Portfolio
| Client | Platform | Role |
|--------|----------|------|
[Clients they manage as operator or account manager]
[source: reporting_clients] [HIGH]

### Portfolio Flags (Issues Only)
[Only include clients with problems -- low health scores, overdue tasks, recent escalations]
- [Client]: [Issue summary] (health: [X]/100)
[If no flags: "No portfolio issues found."]

### Open Items Involving [Name]
- [Action item / task -- status]
- [Action item / task -- status]
[source: action_items / clickup_entries]
[If none: "No open action items found involving [Name]."]

### Ops Context (Ops-Level Syncs Only -- Cade, Scott)
[Critical pipeline alerts, system issues, recent failures]
[Skip entirely for VA or contractor syncs]

### Data Gaps
[One-line list of sources checked that returned nothing]
```

---

## Formatting Rules

1. **Bullet points, not paragraphs.** Peterson scans, he does not read prose.
2. **Bold the most important info** in each section -- the fact Peterson would look for first.
3. **Source citations on key facts:** `[source: table, id]`. Required for dollar amounts, commitments, and dates.
4. **Source depth tagging:** `[from: raw_text]` or `[from: summary]` on any prior-call content.
5. **Confidence tags:** `[HIGH]` / `[MEDIUM]` / `[LOW]` on factual claims.
6. **Stale data marker:** `[STALE -- X months old]` for anything > 3 months.
7. **Low-confidence marker:** `[INFERRED]` for anything not directly from a database record.
8. **Skip empty sections.** No section headers with nothing under them. Consolidate all gaps into one "Data Gaps" line at the bottom.
9. **Target length:** Client calls ~1 page. Sales / cold calls up to 1.5 pages (more research). Internal calls ~half page.
10. **Not an agenda.** No "Suggested Discussion Topics," no questions to ask, no suggested talking points. Context only.
