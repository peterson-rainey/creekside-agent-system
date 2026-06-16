# SDR Agent Batch Test Runner

Run one test iteration: pull 3 random Upwork conversations, spawn sdr-agent for each, track progress toward 100.

## Batch Marker

All tests in this batch have `created_at > '2026-06-16T03:15:00Z'` in `sdr_generation_log`.

## Step 1: Check Progress

```sql
SELECT
  count(*) as done,
  count(*) FILTER (WHERE response_1_passed = true) as r1_passed,
  count(*) FILTER (WHERE response_2_passed = true) as r2_passed
FROM sdr_generation_log
WHERE created_at > '2026-06-16T03:15:00Z'
```

If `done >= 100`: Print the final summary below and STOP. Do NOT spawn more agents.

```sql
SELECT
  count(*) as total_tests,
  round(100.0 * count(*) FILTER (WHERE response_1_passed) / NULLIF(count(*), 0), 1) as r1_pass_pct,
  round(100.0 * count(*) FILTER (WHERE response_2_passed) / NULLIF(count(*), 0), 1) as r2_pass_pct,
  count(DISTINCT detected_industry) as industries_seen,
  count(*) FILTER (WHERE response_type = 'lead') as lead_tests,
  count(*) FILTER (WHERE response_type = 'followup') as followup_tests,
  count(*) FILTER (WHERE response_type = 'nurture') as nurture_tests
FROM sdr_generation_log
WHERE created_at > '2026-06-16T03:15:00Z'
```

## Step 2: Pull 3 Random Conversations

```sql
SELECT room_id, room_name, message_count, messages::text
FROM upwork_conversations
WHERE message_count BETWEEN 3 AND 30
ORDER BY random()
LIMIT 3
```

## Step 3: Format and Determine Response Type

For each conversation:

1. Parse the `messages` JSON array. Each element has `sender`, `timestamp`, `message`.
2. Format as readable text:
   ```
   {sender} ({YYYY-MM-DD}): {message text}
   ```
   Separate each message with a blank line.
3. Determine response type by looking at the conversation:
   - Find the last message's sender
   - If last sender is NOT "Samuel R." (i.e., the lead sent the last message) -> `lead`
   - If last sender IS "Samuel R." AND total messages > 6 -> `followup`
   - If total messages <= 6 and last sender is Samuel -> `lead` (treat as fresh thread)
   - Override: randomly assign 1 in 7 conversations as `nurture` regardless

## Step 4: Spawn sdr-agent (in parallel)

Spawn all 3 as sdr-agent (subagent_type: "sdr-agent") in parallel. Each gets this prompt:

```
Response type: {type}

Here is the Upwork conversation thread with {room_name}:

{formatted_conversation}
```

Do NOT add extra instructions. The sdr-agent reads its own docs/ files and handles everything.

## Step 5: Collect Results and Report

After all 3 agents complete, check which responses passed validation.

Print a one-line summary:
```
SDR Batch Test: {total_done}/100 | This iteration: {pass_count}/{total_this_round} passed | R1 pass rate: {pct}% | R2 pass rate: {pct}%
```

If any response FAILED validation, print the room_name and the failure reason.

Also check: did the agent mention reading docs/ files in its output? Note whether the Read tool appears to be working (look for references to "response-guidelines.md", "context-retrieval.md", etc. in agent output).
