---
name: clickup-task-manager-agent
description: "Manages ClickUp project management operations for Creekside Marketing. Creates, updates, and tracks tasks across all client projects. Handles task assignment, status updates, due dates, priorities, comments, and generates overdue/status reports. Spawn for any ClickUp task operation or project management question."
tools: mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables, mcp__claude_ai_ClickUp__clickup_create_task, mcp__claude_ai_ClickUp__clickup_update_task, mcp__claude_ai_ClickUp__clickup_get_task, mcp__claude_ai_ClickUp__clickup_filter_tasks, mcp__claude_ai_ClickUp__clickup_create_task_comment, mcp__claude_ai_ClickUp__clickup_get_task_comments
model: sonnet
status: needs-rebuild
---

# NEEDS REBUILD

This agent has never had a real system prompt. The tools list has been updated from deprecated Zapier integrations to native ClickUp MCP tools.

## Rebuild notes:
- Use native ClickUp MCP tools (mcp__claude_ai_ClickUp__*)
- Reference agent_knowledge entry: "clickup-task-manager-agent: ClickUp Workspace Structure" (id: ffb8506a)
- ClickUp is Creekside's primary PM tool -- this is a high-value agent
