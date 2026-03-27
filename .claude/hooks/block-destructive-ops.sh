#!/bin/bash
# PreToolUse hook: Block destructive Bash commands and SQL operations
# Exit 2 = BLOCK (stderr message shown to Claude)
# Exit 0 = ALLOW
#
# KEY DESIGN: For Bash commands, we strip quoted strings and heredocs before
# checking patterns. This prevents false positives when dangerous patterns
# appear inside echo, python -c, test data, etc.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // .tool_input.query // empty')

# Skip if no command/query found
[ -z "$CMD" ] && exit 0

# --- DETERMINE CHECK MODE ---
# For SQL tools (execute_sql, apply_migration), check the raw query as-is
# For Bash, strip quoted strings first to avoid false positives
IS_SQL=false
if echo "$TOOL" | grep -qiE '(execute_sql|apply_migration)'; then
  IS_SQL=true
fi

if [ "$IS_SQL" = true ]; then
  # SQL mode: strip string literals and comments before checking.
  # Uses perl -0 (slurp mode) to handle multi-line strings and comments.
  CHECK=$(printf '%s' "$CMD" | \
    perl -0pe "s/'([^']|'')*'//gs" | \
    perl -0pe "s/\\$\\$.*?\\$\\$//gs" | \
    perl -0pe "s/\\$\\w+\\$.*?\\$\\w+\\$//gs" | \
    perl -pe "s/--.*$//gm" | \
    perl -0pe "s|/\\*.*?\\*/||gs" \
  )
else
  # Bash mode: strip quoted strings, heredocs, and inline script arguments
  # to isolate actual shell commands. Uses perl -0 (slurp mode) for multi-line.
  CHECK=$(printf '%s' "$CMD" | \
    perl -0pe "s/'[^']*'//gs" | \
    perl -0pe "s/\"(\\\\.|[^\"])*\"//gs" | \
    perl -0pe "s/<<-?'?(\\w+)'?.*?\\n\\1//gs" | \
    perl -0pe "s/python3?\\s+-c\\s+['\"].*?['\"]//gs" \
  )
fi

# --- FILE SYSTEM DESTRUCTIVE OPS ---
if echo "$CHECK" | grep -qiE '(rm\s+-rf|rm\s+-fr|rm\s+.*-rf|rm\s+.*-fr)'; then
  echo "BLOCKED: Recursive force delete detected. Use targeted rm commands instead." >&2
  exit 2
fi

# --- SQL DESTRUCTIVE OPS ---
if echo "$CHECK" | grep -qiE '\b(DROP\s+TABLE|DROP\s+SCHEMA|DROP\s+DATABASE|DROP\s+INDEX)\b'; then
  echo "BLOCKED: DROP operation requires user approval. Describe what you want to drop and why." >&2
  exit 2
fi

if echo "$CHECK" | grep -qiE '\bTRUNCATE\b'; then
  echo "BLOCKED: TRUNCATE requires user approval. Use DELETE with WHERE clause instead." >&2
  exit 2
fi

# DELETE without WHERE (dangerous mass delete)
if echo "$CHECK" | grep -qiE '\bDELETE\s+FROM\b' && ! echo "$CHECK" | grep -qiE '\bWHERE\b'; then
  echo "BLOCKED: DELETE without WHERE clause would delete all rows. Add a WHERE clause." >&2
  exit 2
fi

# ALTER TABLE DROP COLUMN
if echo "$CHECK" | grep -qiE '\bALTER\s+TABLE\b.*\bDROP\s+COLUMN\b'; then
  echo "BLOCKED: DROP COLUMN requires user approval. This is irreversible." >&2
  exit 2
fi

# --- GIT DESTRUCTIVE OPS ---
if echo "$CHECK" | grep -qiE 'git\s+push\s+.*(-f|--force)'; then
  echo "BLOCKED: Force push can overwrite remote history. Use regular push." >&2
  exit 2
fi

if echo "$CHECK" | grep -qiE 'git\s+branch\s+(-D|--delete\s+--force)'; then
  echo "BLOCKED: Force branch delete requires user approval." >&2
  exit 2
fi

if echo "$CHECK" | grep -qiE 'git\s+reset\s+--hard'; then
  echo "BLOCKED: Hard reset discards uncommitted work. Use git stash instead." >&2
  exit 2
fi

if echo "$CHECK" | grep -qiE 'git\s+clean\s+-f'; then
  echo "BLOCKED: git clean -f permanently deletes untracked files." >&2
  exit 2
fi

# --- SYSTEM DESTRUCTIVE OPS ---
if echo "$CHECK" | grep -qiE '(chmod\s+-R\s+777|chmod\s+777)'; then
  echo "BLOCKED: Setting world-writable permissions is a security risk." >&2
  exit 2
fi

if echo "$CHECK" | grep -qiE '(kill\s+-9|killall|pkill).*(-9)'; then
  echo "BLOCKED: Force kill requires user approval." >&2
  exit 2
fi



# --- CRITICAL: DATABASE STRUCTURE PROTECTION ---
# Block operations that could break RPC functions, RLS, or permissions

# NOTE: CREATE/REPLACE FUNCTION and DROP FUNCTION are ALLOWED
# Functions can always be recreated, unlike dropped tables where data is lost.
# The security-audit-agent monitors for unauthorized function changes.

# Block disabling Row Level Security
if echo "$CHECK" | grep -qiE '(DISABLE|DROP).*ROW.*LEVEL.*SECURITY'; then
  echo "BLOCKED: Disabling RLS would make tables publicly writable. Requires user approval." >&2
  exit 2
fi

# Block GRANT/REVOKE (permission changes)
if echo "$CHECK" | grep -qiE '(GRANT|REVOKE).*(ON|FROM)'; then
  echo "BLOCKED: GRANT/REVOKE changes database permissions. Requires user approval." >&2
  exit 2
fi

# DROP POLICY is ALLOWED — removing individual policies is safe when RLS is enabled.
# The real protection is the DISABLE ROW LEVEL SECURITY check above.
# With RLS enabled, dropping all policies = default DENY (more restrictive, not less).
# Previously this was blocked, causing false positives during RLS maintenance.

# --- CRITICAL: API KEY EXPOSURE PROTECTION ---
# Block echoing/printing sensitive environment variables
if [ "$IS_SQL" = false ]; then
  KEY_NAMES="SUPABASE_SERVICE_ROLE_KEY|SUPABASE_ANON_KEY|ANTHROPIC_API_KEY|OPENAI_API_KEY|SLACK_BOT_TOKEN|FATHOM_API_KEY|CLICKUP_API_TOKEN"
  if echo "$CMD" | grep -qE "(echo|printf|printenv).*[$]($KEY_NAMES)"; then
    echo "BLOCKED: Cannot echo API keys/tokens. Use os.environ in scripts instead." >&2
    exit 2
  fi
  if echo "$CMD" | grep -qiE 'env.*grep.*(KEY|TOKEN|SECRET)'; then
    echo "BLOCKED: Cannot filter environment for secrets. Use os.environ in scripts." >&2
    exit 2
  fi
fi

# --- GIT PUSH TO MAIN ---
# Pushes to creekside-pipelines main are ALLOWED (triggers Railway auto-deploy).
# Force push is still blocked above.


# --- BLOCK CHILD CLI PROCESSES (API COST PROTECTION) ---
# npx @anthropic-ai/claude-code spawned via Bash uses ANTHROPIC_API_KEY
# instead of Max subscription, causing unexpected API charges (~$100 in one session).
if [ "$IS_SQL" = false ]; then
  if echo "$CMD" | grep -qiE 'npx\s+(@anthropic-ai/)?claude'; then
    echo "BLOCKED: Cannot spawn child Claude CLI processes. They bypass Max subscription and bill to API credits. Use the Agent tool instead." >&2
    exit 2
  fi
fi

# --- PROTECT KILL SWITCH AND ADMIN MODE ---
# Prevent agents from deleting KILLSWITCH.md (disabling the kill switch)
# Prevent agents from creating ADMIN_MODE (disabling file protections)
if [ "$IS_SQL" = false ]; then
  if echo "$CMD" | grep -qiE '(rm|del|unlink).*KILLSWITCH'; then
    echo "BLOCKED: Cannot delete KILLSWITCH.md — only Peterson can manage the kill switch." >&2
    exit 2
  fi
  if echo "$CMD" | grep -qiE '(touch|echo|cat|cp|mv|tee).*ADMIN_MODE'; then
    echo "BLOCKED: Cannot create ADMIN_MODE — only Peterson can enable admin mode manually." >&2
    exit 2
  fi
fi

# --- BASH WRITES TO PROTECTED FILES ---
# ADMIN MODE: skip protected file checks if .claude/ADMIN_MODE exists
SCRIPT_DIR_2="$(cd "$(dirname "$0")" && pwd)"
ADMIN_FLAG_2="$(dirname "$SCRIPT_DIR_2")/ADMIN_MODE"
if [ -f "$ADMIN_FLAG_2" ]; then
  # Admin mode active — skip Bash file protection checks
  # NOTE: destructive ops (rm -rf, DROP TABLE, etc.) are STILL blocked above
  exit 0
fi
# Agents could bypass the Write|Edit hook by using Bash commands (sed, cp, cat >, tee, mv)
# to modify protected files. Block these patterns too.
if [ "$IS_SQL" = false ]; then
  # Check if any protected file path appears as a write target in the command
  PROTECTED_PATTERNS="CLAUDE\.md|\.claude/settings|\.claude/hooks/|\.env|\.zshrc|\.bashrc|\.bash_profile"

  # Common write-via-bash patterns: sed -i, cp X dest, cat > dest, tee dest, mv X dest, echo > dest
  if echo "$CHECK" | grep -qiE "(sed\s+-i|cp\s+|cat\s*>|tee\s+|mv\s+|echo\s.*>|printf\s.*>).*($PROTECTED_PATTERNS)"; then
    echo "BLOCKED: Bash command would modify a protected file. Use the Write/Edit tool (which requires user approval via hook)." >&2
    exit 2
  fi

  # Also catch: redirecting output to protected files (command > protected_file)
  if echo "$CHECK" | grep -qiE ">\s*[^|]*($PROTECTED_PATTERNS)"; then
    echo "BLOCKED: Output redirect to protected file detected. Protected files require user approval." >&2
    exit 2
  fi
fi

# All checks passed
exit 0
