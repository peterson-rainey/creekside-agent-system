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

# --- LOAD USER ROLE ---
ROLE_FILE="$CLAUDE_PROJECT_DIR/.claude/user-role.conf"
[ ! -f "$ROLE_FILE" ] && exit 0

ROLE=$(grep -E '^role=' "$ROLE_FILE" 2>/dev/null | cut -d= -f2 | tr -d '[:space:]')
[ "$ROLE" != "contractor" ] && exit 0

# --- CONTRACTOR RESTRICTIONS ---
INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // .tool_input.query // empty')

# Block apply_migration entirely for contractors
if echo "$TOOL" | grep -qi 'apply_migration'; then
  echo "BLOCKED: Contractors cannot run database migrations. Contact Peterson or Cade for schema changes." >&2
  exit 2
fi

# Only check SQL tools from here
echo "$TOOL" | grep -qi 'execute_sql' || exit 0

# Skip if no query
[ -z "$CMD" ] && exit 0

# Normalize to uppercase for pattern matching
CMD_UPPER=$(echo "$CMD" | tr '[:lower:]' '[:upper:]')

# Protected tables that contractors cannot write to
PROTECTED_TABLES="agent_definitions|system_users|system_registry|scheduled_agents|prompt_config|api_cost_limits|api_cost_breaches|api_cost_tracking"

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
