#!/bin/bash
# SessionStart hook: zero-secret machine heartbeat.
#
# WHY: session-autosave.sh requires SUPABASE_SERVICE_ROLE_KEY + jq, which only
# exist on Peterson's Mac. Result: zero visibility into contractor machines
# (discovered 2026-09-30 — Queenie ran a stale agent copy for 5 weeks with no
# way to detect it). This hook needs NOTHING secret: it posts to the
# log_session_heartbeat() SECURITY DEFINER RPC using the public anon key.
# The function validates, size-caps, and rate-limits (10 min per machine)
# server-side, so the anon key cannot be abused to write arbitrary data.
#
# Dependencies: curl only. No jq. No env vars. No key files.
# Failure policy: never block session start. Backgrounded curl, always exit 0.

# Public (publishable) anon key — safe to commit by design.
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aG5wYXphanJtZmNtYndja2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0OTUxODMsImV4cCI6MjA4ODA3MTE4M30.Kf4AmXXsf52r9HaQ3vTt4RxYnDeH5dVhwi9KN6D3U1g"
RPC_URL="https://suhnpazajrmfcmbwckkx.supabase.co/rest/v1/rpc/log_session_heartbeat"
HOOK_VERSION=1

command -v curl >/dev/null 2>&1 || exit 0

# Sanitize a value for embedding in a JSON string: strip backslashes, double
# quotes, and control characters. Values here are hostnames/emails/branch
# names, so lossy stripping is acceptable.
clean() {
  printf '%s' "$1" | tr -d '\\"' | tr -d '\000-\037' | head -c 300
}

# --- Machine identity ---
HOST=$(hostname -s 2>/dev/null)
OSUSER=$(whoami 2>/dev/null)
MACHINE_LABEL=$(clean "${OSUSER:-unknown}@${HOST:-unknown}")

# --- user-role.conf identity (optional) ---
USER_EMAIL=""
USER_ROLE=""
ROLE_FILE="$CLAUDE_PROJECT_DIR/.claude/user-role.conf"
if [ -f "$ROLE_FILE" ]; then
  USER_EMAIL=$(grep -E '^email=' "$ROLE_FILE" 2>/dev/null | head -1 | cut -d= -f2 | tr -d '[:space:]')
  USER_ROLE=$(grep -E '^role=' "$ROLE_FILE" 2>/dev/null | head -1 | cut -d= -f2 | tr -d '[:space:]')
fi

# --- Git state of the brain repo ---
GIT_BRANCH=""
GIT_COMMIT=""
GIT_COMMIT_DATE=""
if cd "$CLAUDE_PROJECT_DIR" 2>/dev/null; then
  GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
  GIT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null)
  GIT_COMMIT_DATE=$(git log -1 --format=%cI 2>/dev/null)
fi

PAYLOAD=$(printf '{"p_machine_label":"%s","p_user_email":"%s","p_role":"%s","p_cwd":"%s","p_git_branch":"%s","p_git_commit":"%s","p_git_commit_date":"%s","p_hook_version":%s}' \
  "$MACHINE_LABEL" \
  "$(clean "$USER_EMAIL")" \
  "$(clean "$USER_ROLE")" \
  "$(clean "$CLAUDE_PROJECT_DIR")" \
  "$(clean "$GIT_BRANCH")" \
  "$(clean "$GIT_COMMIT")" \
  "$(clean "$GIT_COMMIT_DATE")" \
  "$HOOK_VERSION")

# Fire and forget — never delay session start.
curl -s --max-time 5 -o /dev/null \
  -X POST "$RPC_URL" \
  -H "apikey: $ANON_KEY" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" >/dev/null 2>&1 &

exit 0
