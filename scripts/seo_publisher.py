#!/usr/bin/env python3
"""
SEO Blog Publisher -- runs daily at 3 PM CT via launchd.
Reads the oldest draft from seo_content_queue, writes it to the website repo,
commits, pushes, verifies, and marks as published in the DB.

No AI needed -- purely mechanical file operations.
Uses PostgREST table endpoints (not raw SQL RPC).
"""

import json
import os
import re
import subprocess
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone


def load_env_from_zshrc():
    """Load env vars from .zshrc for launchd (which doesn't inherit shell env)."""
    zshrc = os.path.expanduser('~/.zshrc')
    if not os.path.exists(zshrc):
        return
    with open(zshrc) as f:
        for line in f:
            line = line.strip()
            if line.startswith('#') or '=' not in line:
                continue
            m = re.match(r'export\s+(\w+)=["\']?([^"\'#]*)["\']?', line)
            if m and m.group(1) not in os.environ:
                os.environ[m.group(1)] = m.group(2).strip()


load_env_from_zshrc()

SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://suhnpazajrmfcmbwckkx.supabase.co')
SUPABASE_URL = SUPABASE_URL.rstrip('/').removesuffix('/rest/v1').removesuffix('/rest')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
WEBSITE_REPO = os.path.expanduser('~/creekside-website')
LOG_FILE = os.path.expanduser('~/logs/seo-publisher.log')

HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
}


def log(msg: str):
    ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f'[{ts}] {msg}'
    print(line)
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    with open(LOG_FILE, 'a') as f:
        f.write(line + '\n')


def postgrest_get(table: str, params: str, select: str = '*') -> list:
    """GET from a PostgREST table endpoint."""
    url = f'{SUPABASE_URL}/rest/v1/{table}?select={select}&{params}'
    req = urllib.request.Request(url, headers=HEADERS, method='GET')
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def postgrest_patch(table: str, params: str, body: dict) -> list:
    """PATCH a PostgREST table endpoint."""
    url = f'{SUPABASE_URL}/rest/v1/{table}?{params}'
    data = json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, headers=HEADERS, method='PATCH')
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def postgrest_post(table: str, body: dict) -> list:
    """POST to a PostgREST table endpoint."""
    url = f'{SUPABASE_URL}/rest/v1/{table}'
    data = json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, headers=HEADERS, method='POST')
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def git_run(*args, cwd=None) -> subprocess.CompletedProcess:
    """Run a git command and return the result."""
    return subprocess.run(
        ['git'] + list(args),
        cwd=cwd or WEBSITE_REPO,
        capture_output=True,
        text=True,
        timeout=60,
    )


def get_oldest_draft() -> dict | None:
    """Get the highest-priority draft ready for publishing."""
    rows = postgrest_get(
        'seo_content_queue',
        'status=eq.draft&draft_content=not.is.null&order=priority.desc,draft_generated_at.asc&limit=1',
        select='id,slug,vertical_id,target_keyword,template_type,draft_content',
    )
    if not rows:
        return None
    draft = rows[0]
    if not draft.get('draft_content') or len(draft['draft_content']) < 1000:
        log(f'Draft found but content too short ({len(draft.get("draft_content", ""))} chars)')
        return None
    return draft


def check_queue_health():
    """File a pipeline_alert (once) when the generation queue is fully drained.

    Without this, an empty queue stalls both the remote generator and this
    publisher silently -- happened 2026-06-22 to 2026-07-11 (19 days unnoticed).
    """
    pending = postgrest_get(
        'seo_content_queue',
        'status=in.(queued,generating,draft)&limit=1',
        select='id',
    )
    if pending:
        return
    existing = postgrest_get(
        'pipeline_alerts',
        'pipeline_name=eq.seo_publisher&alert_type=eq.queue_empty&acknowledged=eq.false&limit=1',
        select='id',
    )
    if existing:
        log('Queue empty; open queue_empty alert already exists. Not re-alerting.')
        return
    postgrest_post('pipeline_alerts', {
        'pipeline_name': 'seo_publisher',
        'alert_type': 'queue_empty',
        'severity': 'high',
        'source': 'seo_publisher.py',
        'message': 'SEO content queue fully drained: no queued, generating, or draft items. '
                   'Generator and publisher are idle until seo_content_queue is refilled.',
        'details': {'checked_at': datetime.now(timezone.utc).isoformat()},
    })
    log('Queue empty. Filed queue_empty pipeline_alert.')


def extract_title(content: str) -> str:
    """Extract title from frontmatter."""
    for line in content.split('\n'):
        if line.strip().startswith('title:'):
            return line.split(':', 1)[1].strip().strip('"').strip("'")
    return 'Untitled'


def find_svg_references(content: str, slug: str) -> list[str]:
    """Find SVG filenames referenced in the blog post markdown."""
    import re
    # Match ![alt text](/article-images/filename.svg) patterns
    pattern = r'!\[[^\]]*\]\(/article-images/([^)]+\.svg)\)'
    return re.findall(pattern, content)


def publish_draft(draft: dict) -> bool:
    """Write draft to website repo, commit, push, verify."""
    slug = draft['slug']
    content = draft['draft_content']
    title = extract_title(content)
    blog_path = os.path.join(WEBSITE_REPO, 'src', 'content', 'blog', f'{slug}.md')

    # Stash any uncommitted changes (e.g. Jonathan's in-progress work)
    stash = git_run('stash', '--include-untracked')
    stashed = stash.returncode == 0 and 'No local changes' not in stash.stdout

    # Pull latest from remote first
    pull = git_run('pull', '--rebase', 'origin', 'main')
    if pull.returncode != 0:
        log(f'Git pull failed: {pull.stderr}')
        if stashed:
            git_run('stash', 'pop')
        return False

    # Write the blog post
    os.makedirs(os.path.dirname(blog_path), exist_ok=True)
    with open(blog_path, 'w') as f:
        f.write(content)
    log(f'Wrote {len(content)} chars to {blog_path}')

    # Check for SVG infographics referenced in the post
    svg_files = find_svg_references(content, slug)
    svg_dir = os.path.join(WEBSITE_REPO, 'public', 'article-images')
    staged_svgs = []
    for svg_name in svg_files:
        svg_path = os.path.join(svg_dir, svg_name)
        if os.path.exists(svg_path):
            git_run('add', f'public/article-images/{svg_name}')
            staged_svgs.append(svg_name)
            log(f'Staged SVG: {svg_name}')
        else:
            log(f'Warning: SVG referenced but not found: {svg_name}')

    # Stage and commit
    git_run('add', f'src/content/blog/{slug}.md')
    commit_msg = f'Add blog post: {title}'
    if staged_svgs:
        commit_msg += f' (with {len(staged_svgs)} infographic{"s" if len(staged_svgs) > 1 else ""})'
    commit = git_run('commit', '-m', commit_msg)
    if commit.returncode != 0:
        if 'nothing to commit' in commit.stdout + commit.stderr:
            log('File already committed (no changes)')
        else:
            log(f'Git commit failed: {commit.stderr}')
        if stashed:
            git_run('stash', 'pop')
        return False
    log(f'Committed: {commit.stdout.strip().split(chr(10))[0]}')

    # Push
    push = git_run('push', 'origin', 'main')
    if push.returncode != 0:
        log(f'Git push failed: {push.stderr}')
        git_run('reset', '--soft', 'HEAD~1')
        if stashed:
            git_run('stash', 'pop')
        return False

    # Verify push succeeded
    git_run('fetch', 'origin')
    verify = git_run('log', 'origin/main', '--oneline', '-1')
    if slug not in verify.stdout and title[:30] not in verify.stdout:
        log(f'Push verification failed. Remote HEAD: {verify.stdout.strip()}')
        if stashed:
            git_run('stash', 'pop')
        return False

    log(f'Push verified. Remote HEAD: {verify.stdout.strip()}')

    # Restore any stashed changes
    if stashed:
        pop = git_run('stash', 'pop')
        if pop.returncode == 0:
            log('Restored stashed local changes')
        else:
            log(f'Warning: could not restore stashed changes: {pop.stderr}')

    return True


def mark_published(draft: dict):
    """Update DB status to published via PostgREST."""
    queue_id = draft['id']
    now = datetime.now(timezone.utc).isoformat()

    # Update seo_content_queue status
    postgrest_patch(
        'seo_content_queue',
        f'id=eq.{queue_id}',
        {'status': 'published', 'published_at': now, 'updated_at': now},
    )

    # Insert into seo_published
    title = extract_title(draft['draft_content'])
    postgrest_post('seo_published', {
        'queue_id': queue_id,
        'vertical_id': draft['vertical_id'],
        'slug': draft['slug'],
        'title': title,
        'template_type': draft['template_type'],
        'target_keyword': draft['target_keyword'],
        'published_at': now,
    })

    log(f'DB updated: {draft["slug"]} marked as published')


def main():
    log('=== SEO Publisher starting ===')

    if not SUPABASE_KEY:
        log('ERROR: SUPABASE_SERVICE_ROLE_KEY not set')
        sys.exit(1)

    if not os.path.isdir(WEBSITE_REPO):
        log(f'ERROR: Website repo not found at {WEBSITE_REPO}')
        sys.exit(1)

    draft = get_oldest_draft()
    if not draft:
        log('No drafts ready to publish. Done.')
        check_queue_health()
        return

    slug = draft['slug']
    title = extract_title(draft['draft_content'])
    log(f'Publishing: "{title}" (slug: {slug}, {len(draft["draft_content"])} chars)')

    if publish_draft(draft):
        mark_published(draft)
        log(f'SUCCESS: Published "{title}" to creeksidemarketingpros.com/blog/{slug}/')
    else:
        log(f'FAILED: Could not publish "{title}". Draft stays in queue for retry.')

    log('=== SEO Publisher done ===')


if __name__ == '__main__':
    main()
