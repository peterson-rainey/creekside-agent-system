#!/usr/bin/env python3
"""
Upwork Client Stats Sync -- runs daily via launchd.

For recent applications in upwork_jobs, looks each job up in the Upwork
marketplaceJobPostingsSearch API (only works while the job is still OPEN)
and snapshots client stats + applicant count into the DB:

    client_rating, client_review_count, client_jobs_posted,
    client_total_spent, client_total_hires, api_total_applicants,
    client_stats_synced_at

Also fills payment_verified and job_posting_uid when they are null.

Additionally syncs proposal_cover_letter (+api_proposal_id) for recent rows
from the vendorProposals GraphQL API, so every new application gets its
cover letter captured automatically (added 2026-07-06).

Modes:
    python3 upwork_client_stats_sync.py                  # rows from last 5 days, not yet synced
    python3 upwork_client_stats_sync.py --backfill-active # all rows with job_workflow_state=ACTIVE

No AI needed -- purely mechanical. Uses PostgREST table endpoints.
Upwork auth via ~/upwork-api/upwork_auth.py (auto-refreshing token).
"""

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

sys.path.insert(0, os.path.expanduser('~/upwork-api'))
from upwork_auth import upwork_graphql  # noqa: E402


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
LOG_FILE = os.path.expanduser('~/logs/upwork-client-stats.log')
LOOKBACK_DAYS = 5
SEARCH_SLEEP_SECONDS = 1.0

HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
}

SEARCH_QUERY = '''
query($f: MarketplaceJobPostingsSearchFilter) {
  marketplaceJobPostingsSearch(marketPlaceJobFilter: $f, searchType: USER_JOBS_SEARCH, sortAttributes: [{field: RECENCY}]) {
    edges { node {
      id
      title
      totalApplicants
      applied
      client {
        totalHires
        totalPostedJobs
        totalSpent { rawValue }
        totalReviews
        totalFeedback
        verificationStatus
      }
    } }
  }
}
'''


def log(msg: str):
    ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f'[{ts}] {msg}'
    print(line)
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    with open(LOG_FILE, 'a') as f:
        f.write(line + '\n')


def postgrest_get(table: str, params: str, select: str = '*') -> list:
    url = f'{SUPABASE_URL}/rest/v1/{table}?select={select}&{params}'
    req = urllib.request.Request(url, headers=HEADERS, method='GET')
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def postgrest_patch(table: str, params: str, body: dict) -> list:
    url = f'{SUPABASE_URL}/rest/v1/{table}?{params}'
    data = json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, headers=HEADERS, method='PATCH')
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode())


def search_job(title: str):
    """Search Upwork by exact full title. Returns list of result nodes."""
    variables = {'f': {
        'titleExpression_eq': title,
        # 'after' MUST be "0" -- omitting it causes an upstream 500
        'pagination_eq': {'after': '0', 'first': 10},
    }}
    result = upwork_graphql(SEARCH_QUERY, variables)
    search = (result.get('data') or {}).get('marketplaceJobPostingsSearch') or {}
    return [e['node'] for e in (search.get('edges') or [])]


def match_node(nodes: list, job_uid, title: str):
    """Match a search result to our DB row. Prefer uid match; fall back to
    exact title + applied=true when uid is missing (and the match is unique)."""
    if job_uid:
        for n in nodes:
            if str(n['id']) == str(job_uid):
                return n
        return None
    candidates = [n for n in nodes if n['title'] == title and n['applied']]
    return candidates[0] if len(candidates) == 1 else None


def build_patch(node: dict, row: dict) -> dict:
    client = node['client'] or {}
    spent = (client.get('totalSpent') or {}).get('rawValue')
    patch = {
        'client_rating': client.get('totalFeedback'),
        'client_review_count': client.get('totalReviews'),
        'client_jobs_posted': client.get('totalPostedJobs'),
        'client_total_spent': float(spent) if spent is not None else None,
        'client_total_hires': client.get('totalHires'),
        'api_total_applicants': node.get('totalApplicants'),
        'client_stats_synced_at': datetime.now().astimezone().isoformat(),
    }
    # Bonus fills -- only when currently null in the DB
    if row.get('payment_verified') is None and client.get('verificationStatus') is not None:
        patch['payment_verified'] = client['verificationStatus'] == 'VERIFIED'
    if not row.get('job_posting_uid'):
        patch['job_posting_uid'] = str(node['id'])
    return patch


COVER_LOOKBACK_DAYS = 14
COVER_STATUSES = ['Activated', 'Archived', 'Accepted', 'Declined',
                  'Withdrawn', 'Offered', 'Hired', 'Pending']
COVER_QUERY = '''
{ vendorProposals(
    filter: { status_eq: %s },
    sortAttribute: { field: CREATEDDATETIME, sortOrder: DESC },
    pagination: { first: 40%s }
  ) {
    pageInfo { endCursor hasNextPage }
    edges { node {
      id
      auditDetails { createdDateTime { rawValue } }
      proposalCoverLetter
      marketplaceJobPosting { content { title } }
    } }
  } }
'''


def _norm_title(t: str) -> str:
    return re.sub(r'\s+', ' ', (t or '')).strip().lower()


def pull_recent_proposals(cutoff_ms: int) -> list:
    """Pull proposals created after cutoff_ms across all statuses (deduped).
    Pages are sorted DESC by created time, so each status stops as soon as a
    whole page is older than the cutoff."""
    out, seen = [], set()
    for status in COVER_STATUSES:
        cursor = None
        while True:
            after = ', after: "%s"' % cursor if cursor else ''
            result = upwork_graphql(COVER_QUERY % (status, after))
            vp = (result.get('data') or {}).get('vendorProposals') or {}
            edges = vp.get('edges') or []
            if not edges:
                break
            oldest_ms = None
            for e in edges:
                n = (e or {}).get('node')
                if not n:
                    continue
                created_ms = int(((n.get('auditDetails') or {})
                                  .get('createdDateTime') or {}).get('rawValue') or 0)
                oldest_ms = created_ms if oldest_ms is None else min(oldest_ms, created_ms)
                if created_ms < cutoff_ms or n['id'] in seen:
                    continue
                seen.add(n['id'])
                jp = n.get('marketplaceJobPosting') or {}
                out.append({
                    'proposal_id': n['id'],
                    'created_date': datetime.fromtimestamp(created_ms / 1000).strftime('%Y-%m-%d'),
                    'job_title': (jp.get('content') or {}).get('title'),
                    'cover_letter': n.get('proposalCoverLetter') or '',
                })
            cursor = (vp.get('pageInfo') or {}).get('endCursor')
            if oldest_ms is not None and oldest_ms < cutoff_ms:
                break
            if not cursor or not (vp.get('pageInfo') or {}).get('hasNextPage'):
                break
            time.sleep(0.15)
    return out


def sync_cover_letters():
    """Fill proposal_cover_letter (+api_proposal_id) on recent upwork_jobs rows
    that are missing it. Matches by exact api_proposal_id first, then by exact
    (normalized) job title + closest application_date within 5 days. Ambiguous
    matches are skipped. Only NULL fields are ever written (PostgREST filter
    proposal_cover_letter=is.null guarantees no overwrite)."""
    cutoff_dt = datetime.now() - timedelta(days=COVER_LOOKBACK_DAYS)
    cutoff = cutoff_dt.strftime('%Y-%m-%d')

    rows = postgrest_get(
        'upwork_jobs',
        f'proposal_cover_letter=is.null&application_date=gte.{cutoff}'
        f'&order=application_date.desc',
        'id,api_proposal_id,job_name,application_date',
    )
    if not rows:
        log('Cover letters: nothing to sync')
        return

    proposals = [p for p in pull_recent_proposals(int(cutoff_dt.timestamp() * 1000))
                 if p['cover_letter']]
    by_pid = {p['proposal_id']: p for p in proposals}
    by_title = {}
    for p in proposals:
        by_title.setdefault(_norm_title(p['job_title']), []).append(p)

    # proposal ids already linked to some DB row must not be reused
    used = {r['api_proposal_id'] for r in postgrest_get(
        'upwork_jobs', f'api_proposal_id=not.is.null&application_date=gte.{cutoff}',
        'api_proposal_id') if r.get('api_proposal_id')}

    filled = skipped = 0
    for row in rows:
        pid = row.get('api_proposal_id')
        patch = None
        if pid and pid in by_pid:
            patch = {'proposal_cover_letter': by_pid[pid]['cover_letter']}
        elif not pid and row.get('application_date'):
            cands = [p for p in by_title.get(_norm_title(row['job_name']), [])
                     if p['proposal_id'] not in used]
            if cands:
                ad = datetime.strptime(row['application_date'], '%Y-%m-%d')
                scored = sorted(cands, key=lambda p: abs(
                    (datetime.strptime(p['created_date'], '%Y-%m-%d') - ad).days))
                best = scored[0]
                dist = abs((datetime.strptime(best['created_date'], '%Y-%m-%d') - ad).days)
                tied = len(scored) > 1 and abs(
                    (datetime.strptime(scored[1]['created_date'], '%Y-%m-%d') - ad).days) == dist
                if dist <= 5 and not tied:
                    used.add(best['proposal_id'])
                    patch = {'proposal_cover_letter': best['cover_letter'],
                             'api_proposal_id': best['proposal_id']}
        if patch:
            try:
                postgrest_patch(
                    'upwork_jobs',
                    f'id=eq.{row["id"]}&proposal_cover_letter=is.null', patch)
                filled += 1
            except Exception as e:
                log(f'  Cover letter ERROR on row {row["id"]}: {str(e)[:150]}')
        else:
            skipped += 1
    log(f'Cover letters: {filled} filled, {skipped} unmatched '
        f'(of {len(rows)} rows missing, {len(proposals)} recent API proposals)')


def main():
    backfill_active = '--backfill-active' in sys.argv

    if not SUPABASE_KEY:
        log('ERROR: SUPABASE_SERVICE_ROLE_KEY not set')
        sys.exit(1)

    select = 'id,job_name,job_posting_uid,payment_verified,application_date'
    if backfill_active:
        params = 'job_workflow_state=eq.ACTIVE&client_stats_synced_at=is.null&order=application_date.desc'
    else:
        cutoff = (datetime.now() - timedelta(days=LOOKBACK_DAYS)).strftime('%Y-%m-%d')
        params = (f'client_stats_synced_at=is.null&application_date=gte.{cutoff}'
                  f'&order=application_date.desc')

    rows = postgrest_get('upwork_jobs', params, select)
    log(f'Run start ({"backfill-active" if backfill_active else "daily"}): {len(rows)} rows to sync')

    synced = missed = errors = 0
    for row in rows:
        title = (row.get('job_name') or '').strip()
        if not title:
            continue
        try:
            nodes = search_job(title)
            node = match_node(nodes, row.get('job_posting_uid'), title)
            if node is None:
                missed += 1
            else:
                patch = build_patch(node, row)
                postgrest_patch('upwork_jobs', f'id=eq.{row["id"]}', patch)
                synced += 1
        except Exception as e:
            errors += 1
            log(f'  ERROR on "{title[:60]}": {str(e)[:200]}')
        time.sleep(SEARCH_SLEEP_SECONDS)

    log(f'Run done: {synced} synced, {missed} not found in search (likely closed), {errors} errors')

    # Phase 2: cover letters for recent applications (never blocks stats sync)
    try:
        sync_cover_letters()
    except Exception as e:
        log(f'Cover letter sync FAILED: {str(e)[:300]}')


if __name__ == '__main__':
    main()
