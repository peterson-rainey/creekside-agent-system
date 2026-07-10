#!/usr/bin/env python3
"""
topic_taxonomy_embed.py — Embed topic_taxonomy rows (name + description + aliases)
with OpenAI text-embedding-3-small (1536-dim, matches all brain embeddings).

Run after inserting/updating taxonomy rows. Only processes rows where
embedding IS NULL (to force re-embed after editing a description, null it first).

Keys: OPENAI_API_KEY from env (~/.zshrc). SUPABASE_SERVICE_ROLE_KEY from env
or ~/gdrive_pipeline/.env fallback.
"""
import json
import os
import sys
from datetime import datetime, timezone

import requests

SUPABASE_URL = 'https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1'


def load_supabase_key():
    key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')
    if key:
        return key
    env_path = os.path.expanduser('~/gdrive_pipeline/.env')
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line.startswith('SUPABASE_SERVICE_ROLE_KEY=') and not line.startswith('#'):
                    return line.split('=', 1)[1].strip().strip('"').strip("'")
    return ''


def main():
    openai_key = os.environ.get('OPENAI_API_KEY', '')
    supabase_key = load_supabase_key()
    if not openai_key:
        print('ERROR: OPENAI_API_KEY not in env'); sys.exit(1)
    if not supabase_key:
        print('ERROR: SUPABASE_SERVICE_ROLE_KEY not found'); sys.exit(1)

    headers = {'apikey': supabase_key, 'Authorization': f'Bearer {supabase_key}',
               'Content-Type': 'application/json'}

    r = requests.get(
        f'{SUPABASE_URL}/topic_taxonomy?select=id,name,description,aliases&embedding=is.null',
        headers=headers, timeout=30)
    r.raise_for_status()
    rows = r.json()
    if not rows:
        print('No taxonomy rows need embedding.'); return

    print(f'Embedding {len(rows)} taxonomy rows...')
    texts = [f"{row['name'].replace('_', ' ')}: {row['description']} "
             f"Related terms: {', '.join(row.get('aliases') or [])}" for row in rows]

    er = requests.post('https://api.openai.com/v1/embeddings',
                       headers={'Authorization': f'Bearer {openai_key}',
                                'Content-Type': 'application/json'},
                       json={'model': 'text-embedding-3-small', 'input': texts},
                       timeout=120)
    er.raise_for_status()
    embeddings = [d['embedding'] for d in er.json()['data']]

    ok = fail = 0
    for row, emb in zip(rows, embeddings):
        p = requests.patch(
            f"{SUPABASE_URL}/topic_taxonomy?id=eq.{row['id']}",
            headers={**headers, 'Prefer': 'return=representation'},
            json={'embedding': json.dumps(emb),
                  'updated_at': datetime.now(timezone.utc).isoformat()}, timeout=30)
        if p.status_code == 200 and p.json():
            ok += 1
        else:
            print(f"  [FAIL] {row['name']} — {p.status_code}")
            fail += 1

    print(f'DONE: {ok} embedded, {fail} failed')
    sys.exit(0 if fail == 0 else 1)


if __name__ == '__main__':
    main()
