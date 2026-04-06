# Creekside Marketing — Agent System

AI-powered operations platform for Creekside Marketing. This repo contains the agent definitions, safety hooks, and configuration that power the system. All data lives in Supabase — this repo is the control layer.

## What's in this repo

```
CLAUDE.md                  # System instructions (do not edit)
.claude/
  agents/                  # 45 specialized AI agents
  hooks/                   # 21 safety + automation hooks
  settings.json            # Hook matchers, permissions
  user-role.conf           # Your local role config (gitignored)
scripts/                   # Utility scripts
migrations/                # Database migration files
dashboard/                 # Next.js operations dashboard
```

## Quick Start (Contractors)

### 1. Clone and set up hooks

```bash
git clone https://github.com/peterson-rainey/creekside-agent-system.git ~/creekside-workspace
cd ~/creekside-workspace
chmod +x .claude/hooks/*.sh
```

### 2. Create your role config

Create `.claude/user-role.conf` (this file is gitignored):

```
role=contractor
email=YOUR_EMAIL_HERE
```

Replace `YOUR_EMAIL_HERE` with the email Peterson or Cade gave you when they set up your account. This tells the safety hooks to apply contractor-level restrictions and attributes your work to you.

### 3. Connect Supabase MCP

Make sure Supabase MCP is connected at claude.ai/settings with project ref `suhnpazajrmfcmbwckkx`.

Test it:
```sql
SELECT count(*) FROM clients;
```

### 4. Verify your account

```sql
SELECT name, role, permissions, is_active FROM system_users WHERE email = 'YOUR_EMAIL_HERE';
```

Expected: `role = 'contractor'`, `is_active = true`.

### 5. Test permissions

```sql
-- Should work (read access)
SELECT name, status FROM clients LIMIT 5;

-- Should work (write, auto-flagged as unverified)
INSERT INTO agent_knowledge (type, title, content, tags)
VALUES ('reference', 'Contractor setup test', 'Testing contractor write access', ARRAY['test']);

-- Should be BLOCKED (protected table)
INSERT INTO agent_definitions (name, description) VALUES ('test', 'test');

-- Clean up
DELETE FROM agent_knowledge WHERE title = 'Contractor setup test';
```

## Permissions by Role

### Contractors CAN

| Operation | Details |
|-----------|---------|
| Read all shared data | Clients, emails, tasks, call notes, etc. |
| Insert into tables | Auto-flagged as `verified = false` |
| Edit/delete own unverified entries | Full control over your own data |
| Run any agent | All 45 agents are available |
| Search the database | `keyword_search_all()`, `search_all()` |

### Contractors CANNOT

| Operation | Why |
|-----------|-----|
| See admin chat sessions | Privacy boundary |
| Edit admin-created data | Verified/admin-owned data is protected |
| Write to system tables | `agent_definitions`, `system_users`, `system_registry`, etc. |
| Run database migrations | Schema changes require admin |
| Create/modify functions or RLS policies | Security boundary |
| DROP/TRUNCATE any table | Blocked for everyone |

### About unverified data

Anything you insert is automatically flagged as `verified = false`. It exists in the database and you can query it, but default search functions may filter it out. An admin can promote your entries to `verified = true` after review.

## Searching the Database

```sql
-- Keyword search (fast, exact match)
SELECT * FROM keyword_search_all('search term');

-- Semantic search (AI-powered, finds related content)
SELECT * FROM search_all('search term');

-- Client lookup
SELECT * FROM client_context_cache WHERE client_name ILIKE '%name%';
```

## Troubleshooting

**Hook blocking something it shouldn't**
- Check the audit log: `cat /tmp/claude-audit-$(date +%Y%m%d).log`
- Tell Peterson or Cade the exact error message

**"MCP server not found"**
- Check claude.ai/settings for connected MCPs
- Supabase project ref: `suhnpazajrmfcmbwckkx`

**Can't see certain data**
- Admin chat sessions are intentionally hidden from contractors
- If other data seems missing, it may be a pipeline issue — ask Peterson

**Git pull conflicts**
- The auto-pull hook runs on every new Claude Code session
- Always commit and push your changes before starting a new session

## Key Reference

| Item | Value |
|------|-------|
| Supabase project | `suhnpazajrmfcmbwckkx` |
| Git repo | `https://github.com/peterson-rainey/creekside-agent-system.git` |
| Agents | 45 in `.claude/agents/` |
| Safety hooks | 21 in `.claude/hooks/` |
| Role config | `.claude/user-role.conf` (local, gitignored) |
| Blocked ops | DROP, TRUNCATE, DELETE without WHERE, system table writes, migrations |
