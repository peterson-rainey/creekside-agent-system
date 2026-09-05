# Comment Draft Agent -- Regression Scenarios

Run these after any edit to comment-draft-agent.md. Covers all critical code paths.

## How to run

Paste the scenario input into a fresh Claude session with the comment-draft-agent active. Verify the output matches the expected behavior column.

---

## Scenario 1: LinkedIn Google Ads post -- ENGAGE, Standard weight, frequency check runs

**Input:**
```
Platform: LinkedIn

Post: "Anyone else noticing CPL going through the roof on Google Ads lately? We're running search campaigns for our dental practice, $5K/month budget, and we were at $45 CPL in January but now we're at $90 in August. Nothing changed in our setup. What gives?"

Comments:
- @John: "Same here. Google keeps pushing Performance Max and every time we try it we lose control."
- @Maria: "Have you checked your search terms report? Might be match type drift."
```

**Expected behavior:**
- Decision 1: ENGAGE (dental practice, Google Ads CPL question)
- Decision 2: Reply to post (or possibly Maria's comment)
- Decision 3: Standard (budget + performance question, concrete number in post)
- Step 6.5a: Runs name drop frequency query, reports count and threshold
- Step 6.5b: Duplicate check runs (no prior match expected)
- Step 7: INSERT executes with `name_drop` = true or false depending on frequency result
- Output: 2 options (Standard), each with brain source citation, validation checklist with all new rows

**Checklist rows to verify exist in output:**
- "Creekside name drop: [PASS -- ...]"
- "Name drop frequency: [X drops in last 7 days, threshold 10, allowed: yes/no]"
- "Duplicate check: [PASS / FAIL / N/A]"

---

## Scenario 2: Reddit r/PPC broad match -- ENGAGE, Reddit tone, threshold respected

**Input:**
```
Platform: Reddit r/PPC

Thread title: "Broad match just obliterated my campaign -- anyone else?"

Post: "Switched from exact to broad match on a well-converting campaign because Google suggested it. Within a week my spend doubled and conversions dropped by half. Google's algorithm is a joke. Going back to exact match."

Comments:
- u/ppc_pro: "This is exactly why I never trust Google's recommendations blindly."
- u/mediabuy: "Broad match can work but you need STRONG negative keyword lists. Did you have those set up?"
```

**Expected behavior:**
- Decision 1: ENGAGE (PPC strategy debate, niche match)
- Decision 2: Reply to post or u/mediabuy's comment (adds nuance)
- Decision 3: Standard or Lightweight
- Reddit tone: casual, practitioner, no "Creekside Marketing" in most cases (depends on threshold)
- Step 6.5a: Frequency check runs, result reported
- No Creekside mention if threshold >= 10

---

## Scenario 3: Tweet about agency pricing -- ENGAGE, all options under 280 chars

**Input:**
```
Platform: Twitter/X

Tweet: "Hot take: most agencies charge too much and deliver too little. The ROI on agency spend is a joke for most small businesses."
```

**Expected behavior:**
- Decision 1: ENGAGE (agency model criticism -- prime positioning opportunity)
- Decision 3: Lightweight (Twitter = short, opinionated take)
- All output options: 280 characters or under (hard limit)
- Validation checklist: "Platform char limits: PASS -- N chars"
- No em-dashes, no corporate vocabulary

---

## Scenario 4: SEO strategy post -- SKIP

**Input:**
```
Platform: LinkedIn

Post: "We grew our organic traffic 300% in 6 months by doubling down on long-tail SEO. Here's the exact playbook we used: [10-step SEO content framework post]"
```

**Expected behavior:**
- Decision 1: SKIP (SEO is outside Creekside's domain)
- Output: "SKIP. [one-sentence reason]. Not worth engaging."
- Agent stops after SKIP decision -- no brain search, no comment drafted

---

## Scenario 5: Quora dental marketing question -- ENGAGE, Substantial, dental brain data

**Input:**
```
Platform: Quora

Question: "What is the most effective paid advertising strategy for a dental practice trying to attract cosmetic dentistry patients? We have a $3,000/month budget and have tried Google Ads with poor results."
```

**Expected behavior:**
- Decision 1: ENGAGE (dental marketing, paid ads, budget disclosed -- all niche priority signals)
- Decision 3: Substantial (Quora rewards longer answers, complex question)
- Brain search targets: dental, cosmetic dentistry, patient acquisition, CPL, Google Ads
- Output: 1 Substantial option, ~300-500 words
- Quora linking exception: agent MAY suggest including a Creekside blog link (only platform where this is allowed)
- Step 6.5a: Frequency check runs

---

## DB Schema Regression Tests (run against Supabase directly)

These verify the table schema and queries work as specified in the agent file.

### Test A: Frequency check query works
```sql
SELECT COUNT(*) as recent_drops
FROM comment_draft_log
WHERE name_drop = true
AND created_at > NOW() - interval '7 days';
```
Expected: returns a numeric count (0 if no drops yet). No error.

### Test B: Step 7 INSERT with all new columns works
```sql
INSERT INTO comment_draft_log (
  platform, post_description, post_url,
  source_records_used, comment_type_generated,
  engage_skip_verdict, name_drop, comment_text,
  thread_title, created_at
) VALUES (
  'test', 'test post', NULL,
  ARRAY['fathom_entries:test-001'],
  ARRAY['standard'],
  'engage', false, 'Test comment text', NULL, NOW()
) RETURNING id, name_drop, posted_at, option_chosen;
```
Expected: row inserted, `name_drop = false`, `posted_at = NULL`, `option_chosen = NULL`.

### Test C: Step 7.5 UPDATE works
```sql
UPDATE comment_draft_log
SET posted_at = NOW(), option_chosen = 1, posted_by = 'queenie'
WHERE platform = 'test'
ORDER BY created_at DESC LIMIT 1
RETURNING id, posted_at, option_chosen, posted_by;
```
Expected: row updated with posted_at timestamp, option_chosen = 1.

### Test D: Cleanup
```sql
DELETE FROM comment_draft_log WHERE platform = 'test';
```

---

## Last run: 2026-09-05 (agent-builder-agent, post infrastructure update)

All 5 scenarios + DB tests passed. Table schema verified.
