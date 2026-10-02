---
name: upwork-job-finder-agent
description: Hourly automated pipeline that finds Upwork jobs for Queenie to apply to, screens them against validated bidding rules, scores by priority, and serves a ranked HTML job queue on Railway.
tools: []
model: sonnet
department: ops
agent_type: scheduled-task
execution_mode: python_script
script_path: pipelines/upwork_job_finder/finder.py
---

# Upwork Job Finder Agent

Hourly Railway pipeline that surfaces pre-screened Upwork jobs for Queenie. She opens the internal web page, sees a prioritized job list sorted by 4 recency tiers, and dismisses jobs she has handled.

## Architecture

```
[Railway cron, hourly]
    finder.py
        -> marketplaceJobPostingsSearch GraphQL (both peterson + lindsey profiles)
        -> Dedup: already-applied from upwork_jobs + dismissed from upwork_job_queue
        -> Pass 1: Quantitative hard skips (deterministic, no LLM)
        -> Pass 2: Qualitative DQ (Claude Haiku)
        -> Score + tier surviving jobs
        -> Upsert to upwork_job_queue table
    app.py (long-lived stdlib http.server process -- no Flask, no dependencies)
        -> GET /  -> ranked HTML job list (optional ?key= auth via QUEUE_KEY env)
        -> POST /dismiss  -> marks job dismissed, hides immediately
```

## File Locations

| File | Path |
|------|------|
| Finder script | `~/creekside-pipelines/pipelines/upwork_job_finder/finder.py` |
| Web frontend | `~/creekside-pipelines/pipelines/upwork_job_finder/app.py` |
| Auth module | `~/upwork-api/upwork_auth.py` |
| Screening rules | `.claude/docs/upwork-strategy-bidding-analysis-2026-06-10.md` |
| DQ rules | `.claude/agents/upwork-proposal-agent/fit-check.md` |

## Recency Tiers (sort order)

Strictly freshest-first. There is NO 24-72h "sweet spot" -- the 3,741-application analysis showed proposal count decides outcomes, not posting age.

1. < 2 hours -- FRESH (green)
2. 2-24 hours -- TODAY (blue)
3. 24-72 hours -- 1-3 DAYS (amber)
4. 3-7 days -- OLDER (gray); jobs older than 7 days are hidden

Tiers are recomputed at render time in app.py from `posted_at` (the stored `recency_tier` goes stale between runs). Within each tier, sorted by priority score descending.

## Manual checks Queenie still does in the Upwork UI

The API cannot see these, so they stay manual before applying:
- Bid-range panel: skip if avg bid < $40/hr or lowest bid < $10/hr
- Payment Method panel must say Verified (the API boolean is not reliable)

## Database

Table: `upwork_job_queue` -- upsert on `job_posting_uid`. Key columns: `dismissed` (bool), `dq_reason` (NULL = passed), `recency_tier` (1-4), `priority_score`, `flags` (text[]).

## Deployment

- **finder.py**: Railway scheduled agent, `0 * * * *` (hourly)
- **app.py**: Railway always-on service (Python stdlib http.server)
- **Env vars**: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY (finder aborts without it -- Pass 2 is required), UPWORK_CLIENT_ID/SECRET (both profiles), QUEUE_KEY (optional shared secret; if set, page requires `?key=`)

## Debugging

```bash
# Dry run (no DB writes)
cd ~/creekside-pipelines && python3 pipelines/upwork_job_finder/finder.py --dry-run

# Check active queue
SELECT recency_tier, priority_score, flags, job_title, total_applicants, posted_at
FROM upwork_job_queue WHERE dismissed = false AND dq_reason IS NULL
ORDER BY recency_tier, priority_score DESC LIMIT 30;
```
