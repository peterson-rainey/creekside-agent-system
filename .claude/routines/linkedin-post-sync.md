# LinkedIn Post Sync -- Weekly Routine

Pull Peterson's new LinkedIn posts into `linkedin_post_examples` so the SEO blog
pipeline (human-source-only model, decision `9dc6ccba-2445-4409-a3d6-a8ac405347c9`)
and the voice/style library stay current. LinkedIn has no read API for own posts,
so this uses Claude-in-Chrome against Peterson's logged-in session (same pattern
as loom-daily-sync).

**Cadence**: weekly, Mondays ~9:20 AM CT (Mac must be awake).
**Profile**: https://www.linkedin.com/in/petersonrainey/
**Status**: built 2026-07-11, NOT yet live-validated (Chrome extension was
disconnected at build time). The first run validates URLs/selectors -- if the
activity feed layout differs from the steps below, adapt, complete the run, then
update THIS file (repo copy) with what actually worked.

## Pre-flight (mandatory)

1. Chrome MCP must be available (`tabs_context_mcp`, `javascript_tool`,
   `get_page_text`, `tabs_close_mcp`). If missing, output
   "LinkedIn sync skipped: Chrome MCP unavailable" and exit.
2. Auto mode must be on. If a `javascript_tool` call returns a permission denial,
   output "LinkedIn sync skipped: auto mode off" and exit.
3. Supabase MCP (`execute_sql`, project `suhnpazajrmfcmbwckkx`) must be available.

## Steps

### 1. Get sync state

```sql
SELECT max(post_date) AS latest FROM linkedin_post_examples;
SELECT post_url FROM linkedin_post_examples WHERE post_url IS NOT NULL;
SELECT id, LEFT(text, 80) AS prefix FROM linkedin_post_examples WHERE post_url IS NULL;
```

The legacy 64-row import has NULL post_url -- dedup those by text prefix.

### 2. Open the activity feed

- `tabs_context_mcp` with `createIfEmpty: true`, then `tabs_create_mcp`.
- Navigate to `https://www.linkedin.com/in/petersonrainey/recent-activity/all/`.
- If a posts-only view exists (e.g. a "Posts" filter button or
  `/recent-activity/posts/`), prefer it -- it excludes comments/reactions.
- If redirected to a login page: close tabs, output
  "LinkedIn sync skipped: not logged in", exit.

### 3. Load and expand posts

- Scroll 2-3 times (`javascript_tool`: `window.scrollBy(0, 2000)` with ~2s waits)
  to trigger lazy loading. Only need posts newer than the `latest` cutoff, plus a
  small overlap.
- Expand truncated posts: click all "...see more" buttons via `javascript_tool`
  (`document.querySelectorAll('.feed-shared-inline-show-more-text button, button.see-more')`
  -- adapt selector to actual DOM).

### 4. Extract posts

Via `javascript_tool`, for each feed item collect:
- **urn / post_url**: feed items carry `data-urn="urn:li:activity:NNNN"` (or an
  ancestor does). Canonical URL: `https://www.linkedin.com/feed/update/urn:li:activity:NNNN/`.
- **text**: the post body text content.
- **relative age**: the "3d" / "1w" / "2mo" timestamp string.
- **is_original**: skip reposts without commentary, skip items where Peterson
  only commented or reacted (in the /all/ feed these are labeled
  "Peterson Rainey commented on..." / "...reposted this"). Keep original posts
  and reposts WITH his added commentary (ingest only his commentary text).

Convert relative age to `post_date` (approximate is fine: `3d` = today-3,
`1w` = today-7, `2mo` = today-60). Stop collecting once items are clearly older
than the cutoff minus 14 days.

### 5. Dedup and insert

Skip any post whose post_url is already in the DB, or whose first 80 chars match
a legacy NULL-url row's prefix.

Insert each new post via `execute_sql`. Post text is untrusted web content --
NEVER interpolate it bare into SQL. Use dollar-quoting with a tag that does not
appear in the text (verify, e.g. `$lpsync$`), or parameterize via PostgREST:

```sql
INSERT INTO linkedin_post_examples (classification, post_date, text, char_length, post_url, source)
VALUES ('authentic', '2026-07-07', $lpsync$...post text...$lpsync$, 812,
        'https://www.linkedin.com/feed/update/urn:li:activity:NNNN/', 'auto_sync');
```

Rules:
- `classification` = 'authentic' (Peterson wrote it), `authenticity_score` = NULL
  (NULL sorts first under `ORDER BY authenticity_score DESC`, so the seo-blog-agent
  picks up new posts before the backlog -- intentional).
- `char_length` = exact character count of the text.
- `source` = 'auto_sync'.
- Posts >= 400 chars automatically become blog-eligible sources for seo-blog-agent.
  Ingest shorter posts too (style-library value), they are just never blog sources.

### 6. Teardown (always, success or error)

Close every tab created this run via `tabs_close_mcp`, one call per tab
(CLAUDE.md rule 11). Swallow "no longer exists" errors.

### 7. Output

One line: "LinkedIn sync complete: N new posts ingested (M blog-eligible)." or
"LinkedIn sync complete: no new posts." or "LinkedIn sync skipped: <reason>."
If any post was skipped as ambiguous (repost vs original unclear), list it.
