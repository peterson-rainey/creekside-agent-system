#!/bin/bash
# PreToolUse hook: Enforce contractor-level restrictions
# Exit 2 = BLOCK (stderr message shown to Claude)
# Exit 0 = ALLOW
#
# This hook checks .claude/user-role.conf for the current user's role.
# If role=contractor, it blocks:
#   1. Writes to agent_definitions, system_users, system_registry, scheduled_agents
#   2. Writes to prompt_config, api_cost_limits
#   3. apply_migration calls (contractors can't run DDL)
#   4. CREATE/ALTER FUNCTION, CREATE/DROP POLICY
#
# If role=admin or file doesn't exist, everything is allowed.

# Ensure jq is available (fail-open if missing — RLS is the real enforcement layer)
command -v jq >/dev/null 2>&1 || exit 0

# --- LOAD USER ROLE ---
ROLE_FILE="$CLAUDE_PROJECT_DIR/.claude/user-role.conf"
[ ! -f "$ROLE_FILE" ] && exit 0

ROLE=$(grep -E '^role=' "$ROLE_FILE" 2>/dev/null | cut -d= -f2 | tr -d '[:space:]')
[ "$ROLE" != "contractor" ] && exit 0

# --- CONTRACTOR RESTRICTIONS ---
INPUT=$(cat)
TOOL=$(printf '%s' "$INPUT" | jq -r '.tool_name // empty')
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // .tool_input.query // empty')

# Block apply_migration entirely for contractors
if printf '%s' "$TOOL" | grep -qi 'apply_migration'; then
  echo "BLOCKED: Contractors cannot run database migrations. Contact Peterson or Cade for schema changes." >&2
  exit 2
fi

# Only check SQL tools from here
printf '%s' "$TOOL" | grep -qi 'execute_sql' || exit 0

# Skip if no query
[ -z "$CMD" ] && exit 0

# Collapse newlines, strip double-quotes (prevent quoted identifier bypass),
# and normalize to uppercase for pattern matching
CMD_UPPER=$(printf '%s' "$CMD" | tr '\n' ' ' | tr -d '"' | tr '[:lower:]' '[:upper:]')

# Protected tables that contractors cannot write to
PROTECTED_TABLES="AGENT_DEFINITIONS|SYSTEM_USERS|SYSTEM_REGISTRY|SCHEDULED_AGENTS|PROMPT_CONFIG|API_COST_LIMITS|API_COST_BREACHES|API_COST_TRACKING"

# Check for INSERT/UPDATE/DELETE on protected tables
if echo "$CMD_UPPER" | grep -qE "(INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+($PROTECTED_TABLES)"; then
  echo "BLOCKED: Contractors cannot modify protected system tables (agent_definitions, system_users, scheduled_agents, etc.). Contact Peterson or Cade." >&2
  exit 2
fi

# Check for ALTER TABLE on protected tables
if echo "$CMD_UPPER" | grep -qE "ALTER\s+TABLE\s+($PROTECTED_TABLES)"; then
  echo "BLOCKED: Contractors cannot alter protected system tables." >&2
  exit 2
fi

# Check for CREATE OR REPLACE FUNCTION (contractors can't modify DB functions)
if echo "$CMD_UPPER" | grep -qE "CREATE\s+(OR\s+REPLACE\s+)?FUNCTION"; then
  echo "BLOCKED: Contractors cannot create or modify database functions. Contact Peterson or Cade." >&2
  exit 2
fi

# Check for policy modifications
if echo "$CMD_UPPER" | grep -qE "(CREATE|DROP|ALTER)\s+POLICY"; then
  echo "BLOCKED: Contractors cannot modify RLS policies." >&2
  exit 2
fi

# All other operations allowed (RLS handles row-level restrictions)
exit 0
