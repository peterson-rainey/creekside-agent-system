# Creekside Marketing — Agent System

AI-powered operations platform for Creekside Marketing. This repo contains the agent definitions, safety hooks, and configuration that power the system. All data lives in Supabase — this repo is the control layer.

## Repo Structure

```
CLAUDE.md                  # System instructions (protected — do not edit without ADMIN_MODE)
README.md                  # This file
.claude/
  agents/                  # Specialized AI agents
  hooks/                   # Safety + automation hooks
  settings.json            # Hook matchers, permissions (protected)
  user-role.conf           # Your local role config (gitignored, unique per machine)
admin-setup/               # CLI install guide — ADMINS ONLY (not for contractors)
scripts/                   # Utility scripts
migrations/                # Database migration files
creekside-tools/           # Next.js public tools site (lead magnets)
```

> **Note on `admin-setup/`** — this folder is the CLI install path used only by Peterson and Cade. Contractors use a completely different flow (see below). If a contractor's Claude Code session ever pulls setup advice from `admin-setup/`, that is a misroute — point them back here.

## Contractor Setup — Start Here

**You do not need to run Terminal commands.** Claude does all the technical work for you. You only paste plain-English prompts into Claude Code.

### New contractor (never set up before)

Ask Peterson or Cade for:
1. Your registration in the `system_users` table (one SQL INSERT on their side — confirms your identity)
2. A Bitwarden share for:
   - `ads@creeksidemarketingpros.com` password (shared Claude account)
   - Creekside Shared GitHub PAT (the token the installer uses to clone)
3. The **Contractor Onboarding — Copy-Paste Welcome Message** (in `agent_knowledge` — id `3d2647a8-99c9-45da-894c-ec1f1302273f`). They'll paste the message into ClickUp DM with your name and email filled in.

From there, you:
1. Install the Claude Code desktop app from https://claude.ai/code (NOT Claude Chat, NOT Claude Cowork)
2. Sign into `ads@creeksidemarketingpros.com` at https://claude.ai **in your browser**
3. Open Claude Code (any folder) and paste: `Run the Creekside contractor installer`
4. Answer two questions (copy-paste your GitHub PAT from Bitwarden, give your full name + personal email)
5. When Claude finishes, fully quit and reopen Claude Code, open the `creekside-workspace` folder, and paste: `Run the contractor verification tests`

All the database connectors (Supabase, ClickUp, Gmail, Calendar, Drive) are inherited automatically from the shared Claude account — you never touch claude.ai/settings.

### Existing contractor (already set up, just need to update identity)

If you already have a `creekside-workspace` folder on your computer from a previous setup, you only need to update your identity file:

1. Open Claude Code, click "Open folder", pick `creekside-workspace` from your home folder
2. Paste: `Update my Creekside identity`
3. Answer Claude's questions (your full name + personal email)
4. Fully quit and reopen Claude Code
5. Paste: `Run the contractor verification tests`

### What you CAN do as a contractor

| Operation | Details |
|-----------|---------|
| Read all shared data | Clients, emails, tasks, call notes, ad data, etc. |
| Insert into tables | Auto-flagged as `verified = false` |
| Edit/delete your own unverified entries | Full control over your own data |
| Run any agent | All agents in `.claude/agents/` are available |
| Search the database | `keyword_search_all()`, `search_all()` |

### What you CANNOT do

| Operation | Why |
|-----------|-----|
| See admin chat sessions | Privacy boundary |
| Edit admin-created data | Verified/admin-owned data is protected |
| Write to system tables | `agent_definitions`, `system_users`, `system_registry`, etc. |
| Run database migrations | Schema changes require admin |
| Create/modify functions or RLS policies | Security boundary |
| DROP/TRUNCATE any table | Blocked for everyone |

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

**Claude suggests installing Homebrew, Node.js, or configuring a Supabase token**
Ignore it. That advice is from the **admin CLI install path** (`admin-setup/`) and does NOT apply to contractors. Contractors inherit MCPs from the shared Claude account automatically. If it happens, message Peterson — he'll debug why your Claude picked up the wrong doc.

**"Database is not reachable" / Supabase test fails**
Almost always means you're signed into the wrong Claude account in your browser. Sign out of any personal Claude account, sign into `ads@creeksidemarketingpros.com` at https://claude.ai, then **fully quit** Claude Code (Cmd+Q on Mac, system-tray quit on Windows) and reopen. MCPs only load at app startup.

**Hook blocking something it shouldn't**
- Check the audit log: `cat /tmp/claude-audit-$(date +%Y%m%d).log`
- Send Peterson or Cade the exact error message in ClickUp

**Can't see certain data**
- Admin chat sessions are intentionally hidden from contractors
- If other data seems missing, it may be a pipeline issue — ask Peterson

**Git pull conflicts**
- The auto-pull hook runs on every new Claude Code session
- Your `user-role.conf` is gitignored so it never conflicts

## Full environment diagnostic

Anytime something feels off, paste this into Claude Code inside `creekside-workspace`:

> Run the contractor health check

Claude will run a full diagnostic (git state, hooks, agents, MCP connectivity, database access, your identity) and write the results to `contractor_diagnostics` so Peterson can audit remotely without being in your session.

## Key Reference

| Item | Value |
|------|-------|
| Supabase project | `suhnpazajrmfcmbwckkx` |
| Git repo | `https://github.com/peterson-rainey/creekside-agent-system.git` (private — access via shared GitHub account) |
| Shared GitHub account | Tied to `ads@creeksidemarketingpros.com` |
| Shared Claude account | `ads@creeksidemarketingpros.com` |
| Role config | `.claude/user-role.conf` (local, gitignored, unique per machine) |
| Blocked operations | DROP, TRUNCATE, DELETE without WHERE, system-table writes, migrations |

## Related SOPs in `agent_knowledge`

- **Contractor Onboarding Instructions** — `13ab6a57-66ad-4c67-a556-c80643186325`
- **Contractor Onboarding — Copy-Paste Welcome Message** — `3d2647a8-99c9-45da-894c-ec1f1302273f`
- **Contractor Installer — Claude Runbook** — `5bc0d86e-47a0-4e78-bd30-cf5c73ff2aa5`
- **Contractor Verification — Claude Runbook** — `2282fd9a-bfdd-44ee-9950-1c1ded88fc8b`
- **Contractor Identity Update — Claude Runbook** — `a3ab31b5-4fbe-4a1f-b1b7-3d89d54db17e`
- **Contractor Onboarding — Admin Process** — `c6a90ff3-88ef-4102-aae4-549b6fc83f78`
