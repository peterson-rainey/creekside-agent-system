# Cade MacLean — Claude Code Admin Setup Guide

## What This Is

This sets up Claude Code on your machine with full admin access to the Creekside Marketing RAG database and agent system. Your setup mirrors Peterson's exactly — same agents, same hooks, same permissions. You can read, write, update, and delete across all tables, spawn any agent, and build new ones.

## Prerequisites

- macOS (or Linux)
- Node.js 18+ installed (`node --version` to check)
- Git installed (`git --version` to check)
- A Claude Max subscription (or Anthropic API key)

---

## Step 1: Install Claude Code

If you don't have it yet:

```bash
npm install -g @anthropic-ai/claude-code
```

Verify it works:

```bash
claude --version
```

If prompted, log in with your Anthropic/Claude account.

---

## Step 2: Clone the Repo

This repo contains everything — CLAUDE.md, all agents, hooks, skills, and settings:

```bash
git clone https://github.com/peterson-rainey/creekside-agent-system.git ~/creekside-workspace
cd ~/creekside-workspace
```

Make the hook scripts executable:

```bash
chmod +x .claude/hooks/*.sh
```

---

## Step 3: Connect MCP Servers

MCP servers connect Claude Code to external tools. You need these configured through Claude.ai:

1. Go to [claude.ai/settings](https://claude.ai/settings) and connect these MCP integrations:
   - **Supabase** — Peterson will provide the project ref and access token
   - **Slack** — Connect your Creekside Slack workspace
   - **Gmail** — Connect cade@creeksidemarketingpros.com
   - **ClickUp** — Connect the Creekside workspace
   - **Google Calendar** — Connect your Creekside calendar
   - **Square** — Connect the Creekside Square account
   - **Zapier** — Connect for ClickUp task automation

2. If any MCP needs local config instead, add it to your global settings:

```bash
# Open global settings (create if it doesn't exist)
nano ~/.claude/settings.json
```

The Supabase MCP can also be configured locally if needed:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref",
        "suhnpazajrmfcmbwckkx"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "<token-from-peterson>"
      }
    }
  }
}
```

---

## Step 4: Create Your Identity File

This file tells the system who you are so your sessions are attributed to your account:

```bash
cd ~/creekside-workspace
echo -e "role=admin\nemail=cade@creeksidemarketingpros.com" > .claude/user-role.conf
```

This file is gitignored (stays on your machine only). Without it, your sessions won't be linked to you in the database.

---

## Step 5: Set Your Database Password

Peterson has created your admin account in the database. You'll receive a password reset email at cade@creeksidemarketingpros.com — use it to set your password.

Your database identity:
- **Email**: cade@creeksidemarketingpros.com
- **Role**: admin
- **system_users ID**: 307b2652-effa-4ca0-82b6-8908ecd23a09
- **auth ID**: d565d5f3-2a19-42fa-959a-3c4d30020834

---

## Step 6: Verify Setup

Open Claude Code in the project directory:

```bash
cd ~/creekside-workspace
claude
```

Run these tests in order:

**Test 1 — Database connection (should work):**
> "Query the clients table and show me the first 5 rows"

You should see client data. This confirms your Supabase MCP is connected.

**Test 2 — Write access (should work):**
> "Insert a test row into agent_knowledge with type='test', title='Cade setup test', content='Testing admin write access', tags=ARRAY['test']"

This should succeed — you have full admin write access.

**Test 3 — Safety hooks (should be blocked):**
> "Drop the clients table"

The `block-destructive-ops` hook should block this. DROP/TRUNCATE are blocked for everyone, including admins.

**Test 4 — Kill switch:**

In a separate terminal:
```bash
echo "Testing kill switch" > ~/creekside-workspace/KILLSWITCH.md
```

Try any operation in Claude Code — it should be blocked. Remove the file to resume:
```bash
rm ~/creekside-workspace/KILLSWITCH.md
```

**Test 5 — Agent spawn:**
> "Spawn the client-context-agent and pull context for any active client"

This confirms agents are loading and MCP tools are accessible to sub-agents.

**Test 6 — Clean up the test row:**
> "Delete the agent_knowledge row where title = 'Cade setup test'"

---

## What You Have Access To

### Database Access

| Operation | Allowed? |
|-----------|----------|
| SELECT from any table | Yes |
| INSERT/UPDATE/DELETE on any table | Yes |
| CREATE TABLE | Yes |
| DROP TABLE / TRUNCATE | No (blocked by safety hooks) |
| All RPC functions (search_all, keyword_search_all, etc.) | Yes |

### Agents (40+)

All agents in `.claude/agents/` are available. Key ones:

| Agent | What It Does |
|-------|-------------|
| `client-context-agent` | Pull comprehensive client info |
| `financial-analyst-agent` | P&L, revenue, expense analysis |
| `meta-ads-analyst-agent` | Meta campaign performance |
| `clickup-task-manager-agent` | Manage ClickUp tasks |
| `gmail-intelligence-agent` | Draft email replies |
| `proposal-generator-agent` | Generate client proposals |
| `agent-builder-agent` | Build new agents |
| `qc-reviewer-agent` | Quality check any output |

### Hooks (Safety Layer)

These run automatically and cannot be bypassed:

| Hook | Purpose |
|------|---------|
| `killswitch-check.sh` | KILLSWITCH.md in project root freezes all operations |
| `block-destructive-ops.sh` | Blocks DROP, TRUNCATE, DELETE without WHERE, rm -rf, force push |
| `block-protected-files.sh` | Protects CLAUDE.md, settings, hooks, .env files |
| `audit-log.sh` | Logs all tool usage to /tmp/ |
| `snapshot-writes.sh` | Logs all database mutations to /tmp/ |
| `qc-gate.sh` | Forces QC review after 5+ writes in a session |
| `cost-guard.sh` | Monitors agent spawn costs |
| `correction-inject.sh` | Loads relevant corrections before agent runs |

### Protected Files

To edit CLAUDE.md, settings, or hooks, you need ADMIN_MODE:

```bash
touch .claude/ADMIN_MODE
# Make your edits
rm .claude/ADMIN_MODE
```

---

## Staying in Sync

The repo auto-pulls on session start (via `auto-pull.sh` hook). To manually sync:

```bash
cd ~/creekside-workspace
git pull
chmod +x .claude/hooks/*.sh
```

When you make changes to agents, hooks, or settings, commit and push so Peterson stays in sync too:

```bash
git add -A
git commit -m "Description of change"
git push
```

---

## Existing Data You Can Query

The RAG database contains data from:
- **Clients** — full client profiles and context cache
- **Fathom** — meeting transcripts and summaries
- **Slack** — channel message summaries
- **Gmail** — email summaries and draft queue
- **ClickUp** — tasks, comments, documents, chat, time entries
- **Square** — payments and invoices
- **Google Calendar** — events with AI summaries
- **Google Drive** — document metadata (operations, legal, marketing)
- **Agent Knowledge** — SOPs, corrections, configurations, patterns
- **Meta Ads** — campaign data, creatives, daily insights

Use `keyword_search_all('search term')` or `search_all()` (semantic) to search across all sources.

---

## Getting Help

- **Hook blocking something it shouldn't?** Check the audit log: `cat /tmp/cade-audit-$(date +%Y%m%d).log`
- **Something broke?** Check snapshot log: `cat /tmp/cade-snapshots-$(date +%Y%m%d).jsonl`
- **Need to edit a protected file?** Use ADMIN_MODE (see above)
- **Want to build a new agent?** Use the `/new-agent` skill or spawn `agent-builder-agent`
- **Database questions?** Query `agent_knowledge WHERE type = 'sop'` for documented procedures
