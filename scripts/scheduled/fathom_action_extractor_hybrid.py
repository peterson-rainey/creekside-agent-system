#!/usr/bin/env python3
"""
fathom_action_extractor_hybrid.py — Hybrid replacement for fathom-action-extractor.
Script collects data, single Haiku call for extraction.
"""

import json
import os
import sys
from datetime import datetime, timedelta, timezone

import anthropic
import requests

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://suhnpazajrmfcmbwckkx.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
REST = f"{SUPABASE_URL}/rest/v1"

HEADERS = {
    "apikey": SUPABASE_KEY or "",
    "Authorization": f"Bearer {SUPABASE_KEY or ''}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}


def log(msg):
    print(f"[{datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}] {msg}")


def supabase_get(path, params=None):
    resp = requests.get(f"{REST}/{path}", headers=HEADERS, params=params or {}, timeout=30)
    resp.raise_for_status()
    return resp.json()


def supabase_post(path, body):
    resp = requests.post(f"{REST}/{path}", headers=HEADERS, json=body, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    return data[0] if isinstance(data, list) and data else data


# ---------------------------------------------------------------------------
# Data Collection
# ---------------------------------------------------------------------------

def fetch_recent_entries():
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=48)).strftime("%Y-%m-%dT%H:%M:%SZ")
    return supabase_get("fathom_entries", {
        "meeting_date": f"gte.{cutoff}", "order": "meeting_date.desc",
        "select": "id,meeting_title,action_items,summary,client_id,meeting_date,participants",
    })


def fetch_processed_ids():
    rows = supabase_get("action_items", {
        "source": "eq.fathom", "related_table": "eq.fathom_entries", "select": "context",
    })
    return {r["context"] for r in rows if r.get("context")}


def fetch_transcripts(ids):
    if not ids:
        return {}
    rows = supabase_get("raw_content", {
        "source_table": "eq.fathom_entries",
        "source_id": f"in.({','.join(ids)})",
        "select": "source_id,full_text",
    })
    return {r["source_id"]: r.get("full_text", "") for r in rows}


# ---------------------------------------------------------------------------
# AI Extraction
# ---------------------------------------------------------------------------

EXTRACTION_PROMPT = """Extract action items from these Fathom call transcripts. For each:
1. Title (concise, actionable)
2. Description (context from the call)
3. Assignee ("Peterson", "Cade", "Client", or "Unknown")
4. Priority (1-4, 1=urgent)
5. Category (client_work, internal, sales, admin)
6. Source fathom_entry_id

Look for: "I'll", "I will", "Can you", "Make sure", "by Friday", "next week".
Use BOTH pre-extracted action_items AND raw transcript. Deduplicate.
Return JSON array only: [{"title": "...", "description": "...", "assignee": "...", "priority": N, "category": "...", "fathom_entry_id": "..."}]"""


def call_haiku(entries, transcripts):
    blocks = []
    for e in entries:
        block = (
            f"--- Entry {e['id']} ---\n"
            f"Meeting: {e.get('meeting_title', 'N/A')}\n"
            f"Date: {e.get('meeting_date', 'N/A')}\n"
            f"Participants: {json.dumps(e.get('participants', []))}\n"
            f"Pre-extracted: {json.dumps(e.get('action_items', []))}\n"
        )
        transcript = transcripts.get(e["id"], "")
        if transcript:
            block += f"Transcript:\n{transcript}\n"
        blocks.append(block)

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    response = client.messages.create(
        model="claude-haiku-4-5-20251001", max_tokens=4096,
        messages=[{"role": "user", "content": EXTRACTION_PROMPT + "\n\n" + "\n".join(blocks)}],
    )
    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        raw = "\n".join(l for l in raw.split("\n") if not l.startswith("```")).strip()
    return json.loads(raw)


# ---------------------------------------------------------------------------
# Apply
# ---------------------------------------------------------------------------

def insert_actions(actions):
    # Get existing for dedup
    contexts = list({a["fathom_entry_id"] for a in actions if a.get("fathom_entry_id")})
    existing = set()
    if contexts:
        rows = supabase_get("action_items", {
            "source": "eq.fathom", "context": f"in.({','.join(contexts)})", "select": "title,context",
        })
        existing = {(r["title"].lower().strip(), r["context"]) for r in rows if r.get("title")}

    inserted = 0
    for a in actions:
        fid = a.get("fathom_entry_id", "")
        title = a.get("title", "").strip()
        if not title or not fid:
            continue
        if (title.lower(), fid) in existing:
            log(f"  SKIP dup: {title}")
            continue

        priority = a.get("priority", 3)
        if not isinstance(priority, int) or priority < 1 or priority > 4:
            priority = 3
        category = a.get("category", "client_work")
        if category not in {"client_work", "internal", "sales", "admin"}:
            category = "client_work"

        try:
            supabase_post("action_items", {
                "title": title, "description": a.get("description", ""),
                "priority": priority, "category": category,
                "source": "fathom", "related_table": "fathom_entries",
                "context": fid, "status": "open",
            })
            inserted += 1
            existing.add((title.lower(), fid))
            log(f"  INSERT: {title}")
        except Exception as e:
            log(f"  ERROR: {title}: {e}")
    return inserted


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    log("=== fathom_action_extractor_hybrid starting ===")
    if not SUPABASE_KEY or not ANTHROPIC_API_KEY:
        log("ERROR: Missing env vars")
        return 1

    entries = fetch_recent_entries()
    log(f"Recent fathom entries: {len(entries)}")
    if not entries:
        log("Nothing to process.")
        return 0

    processed = fetch_processed_ids()
    unprocessed = [e for e in entries if e["id"] not in processed]
    log(f"Unprocessed: {len(unprocessed)}")
    if not unprocessed:
        log("All already processed.")
        return 0

    transcripts = fetch_transcripts([e["id"] for e in unprocessed])
    log(f"Transcripts fetched: {len(transcripts)}")

    actions = call_haiku(unprocessed, transcripts)
    log(f"Haiku extracted: {len(actions)} items")
    if not actions:
        return 0

    inserted = insert_actions(actions)

    try:
        supabase_post("chat_sessions", {
            "title": f"Fathom Action Extractor — {datetime.now(timezone.utc).strftime('%Y-%m-%d')}",
            "summary": f"Processed {len(unprocessed)} entries, extracted {len(actions)}, inserted {inserted}.",
            "tags": ["scheduled", "fathom", "hybrid"],
        })
    except Exception:
        pass

    log(f"=== Done. Inserted {inserted}/{len(actions)} ===")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:
        log(f"FATAL: {e}")
        sys.exit(1)
