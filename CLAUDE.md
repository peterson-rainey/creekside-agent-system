# Creekside Marketing -- Shared Rules

These rules apply to ALL users (Peterson, Cade, contractors). Role-specific behavior is loaded from `.claude/roles/` by the session-init hook. In Claude Chat or Co-work (no hooks), read your role file directly:
- Admin/owner: `.claude/roles/ops-manager.md`
- Contractor: `.claude/roles/contractor.md`

## Infrastructure
- **Supabase project**: `suhnpazajrmfcmbwckkx` -- use `execute_sql` MCP tool. Use `SUPABASE_SERVICE_ROLE_KEY` for writes (anon key silently fails).
- **Git repo**: `https://github.com/peterson-rainey/creekside-agent-system.git` -- all agent files, hooks, skills, and settings live here. Auto-committed on every change. This is the source of truth for local files -- do NOT duplicate file content in the database.
- **System architecture**: Read `ARCHITECTURE.md` in the repo root for a comprehensive reference on how the entire system works (tables, functions, agents, hooks, pipelines, search, access control). Consult it when you need to understand how something connects.

## Repository Map (4 separate repos -- NEVER confuse them)

| Repo | Local Path | Purpose |
|------|-----------|---------|
| **creekside-agent-system** | `/Users/petersonrainey/C-Code - Rag database/` | RAG database, agents, hooks, skills, pipelines config, CLAUDE.md. This is the current working directory. |
| **creekside-dashboard** | `/Users/petersonrainey/creekside-dashboard/` | Internal ops dashboard (clients, billing, team, scorecard, Upwork funnel). Password-gated. Deployed on Railway. GitHub: `creekside-marketing/creekside-dashboard` |
| **creekside-pipelines** | `/Users/petersonrainey/creekside-pipelines/` | Data pipelines (Gmail, ClickUp, Slack (legacy), Google Chat, Meta, Square, Upwork, etc.). Deployed on Railway. GitHub: `peterson-rainey/creekside-pipelines` |
| **creekside-website** | `/Users/petersonrainey/creekside-website/` | Live website (creeksidemarketingpros.com). Astro 5 + Tailwind 4. Hosted by web designer Jonathan. GitHub: `drybonez235/creekside` |

**creekside-tools** (`~/creekside-tools/`) is the PUBLIC free marketing tools site -- completely separate. NEVER add internal features there.

When Peterson says "website" or "creeksidemarketingpros", he means **creekside-website** at `~/creekside-website/`. GitHub repo is `drybonez235/creekside` (Jonathan's account).

When Peterson says "dashboard" or "internal dashboard", he means **creekside-dashboard** at `~/creekside-dashboard/`. NOT anything in the current working directory.

## Standing Rules

1. **Communication: Google Chat + ClickUp.** These are the ONLY internal and client communication platforms. Slack is DEAD at Creekside -- do NOT recommend it, reference it as active, or suggest sending messages through it. When listing platforms, use: Google Chat, ClickUp, Gmail, LinkedIn. This applies to all agents, all users (Peterson, Cade, contractors). **"Send to [person] in ClickUp" means chat message (`clickup_send_chat_message`), NOT creating a task.** Only create tasks when explicitly asked. For ClickUp contact lookup, check `agent_knowledge` for their identity first (display names and emails often differ from expected).
2. **Peterson's voice.** All outbound messages (ClickUp, Gmail, Google Chat, LinkedIn) must match Peterson's communication style. Never use em dashes. Run through `communication-style-agent` for non-trivial messages.
3. **Build simple, search first.** Default to the simplest solution. Search `agent_knowledge` for existing build processes before improvising. Scripts/deterministic systems over AI for repeatable work. Plan, then QC, then build. Details: `SELECT content FROM agent_knowledge WHERE title = 'Build Workflow -- detailed process (interview, QC, agent-builder)';`
4. **Content dates, not ingestion dates.** Use each table's content date column (e.g., `date`, `sent_at`, `call_date`) for chronological queries, NOT `created_at`. `created_at` is when the pipeline ingested the row.
5. **Client data validation.** Before writing to the `clients` table, query `agent_knowledge WHERE type='correction' AND tags @> ARRAY['client-data']` to avoid repeating known data errors.
6. **Run it yourself.** Always attempt commands, scripts, and shell operations yourself. Only ask Peterson to run something when it genuinely requires his credentials or interactive input.
7. **Promote universal corrections to CLAUDE.md.** When a correction applies to every session universally (not agent-specific or client-specific), add it to CLAUDE.md via ADMIN_MODE. Then delete the agent_knowledge entry. agent_knowledge is for searchable context -- CLAUDE.md is for always-loaded rules.
8. **Search before debugging.** When encountering an unresolved error or bug, search `agent_knowledge` for prior solutions before proposing a new fix. If the solution is novel, save it back as `type='solution'`.
9. **Capability vs inventory.** For "can I", "is it possible", "what's the best way" questions: name the CEILING (what the system allows), the FLOOR (what's currently built), and the GAP. Never let a database-only answer cap what's actually possible. Anti-pattern: "convenience anchoring."
10. **GitHub-first for agent prompts.** Agent prompts live in `.claude/agents/{name}.md` (source of truth). The `agent-edit-monitor.sh` hook syncs changes to `agent_definitions.system_prompt` in the DB. To edit an agent prompt, modify the file. NEVER UPDATE `system_prompt` directly in the DB.

## Safety Rules

Enforced by deterministic hooks -- these cannot be overridden:

**NEVER:** `DROP TABLE/SCHEMA/DATABASE/COLUMN` | `TRUNCATE` | `DELETE FROM` without WHERE | `rm -rf` | `git push --force` | `git reset --hard` | `chmod 777` | `npx @anthropic-ai/claude-code` or any child Claude CLI process (bypasses Max subscription, bills API directly)

**Protected files (hooks block writes):** `CLAUDE.md` | `.claude/settings*.json` | `.claude/hooks/*.sh` | `.claude/roles/*.md` | `.env*` | `.zshrc`

**ADMIN_MODE:** Peterson runs `touch .claude/ADMIN_MODE` to edit protected files. Agents CANNOT create this file. After edits, agent MUST run `rm .claude/ADMIN_MODE`.

**Kill switch:** Create `KILLSWITCH.md` in project root to freeze all operations. Delete to resume.

**Before creating anything new:** Run `SELECT validate_new_entry('type', 'name')` -- if BLOCKED or WARNING, stop and review. Before inserting into `agent_knowledge`, run `SELECT validate_new_knowledge('type', 'title', ARRAY['tags'])` -- if BLOCKED, UPDATE instead. After any structural creation, register it in `system_registry`. Never include `char_count` in `raw_content` INSERTs (generated column).

## Coding Standards

Query from database when writing code:
```sql
SELECT content FROM agent_knowledge WHERE title = 'Coding Standards Reference';
```

## Coding Behavior (Karpathy Principles)

10. **Ask before assuming.** If a request is ambiguous, has multiple interpretations, or you're uncertain about scope -- stop and ask. Do not silently pick an interpretation and build. Name what's confusing. Present the options. Wait for confirmation. Correcting a plan is cheap; unwinding a half-finished build is expensive.
11. **Define success criteria, then loop autonomously.** Before implementing, state what "done" looks like in verifiable terms. Transform vague asks into testable goals: "Add validation" becomes "Write tests for invalid inputs, then make them pass." Then execute all steps autonomously until done -- do not pause for user input between steps. Only stop to ask if you are genuinely blocked or the requirement is ambiguous. Loop until the success criteria are verified -- do not declare done without confirming they are met.

## On-Demand Reference

Everything else lives in the database. Query when needed:
```sql
-- Scheduled agents and their schedules
SELECT name, cron_expression, description, enabled FROM scheduled_agents ORDER BY name;

-- Operational SOPs
SELECT title, content FROM agent_knowledge WHERE type = 'sop' AND title ILIKE '%keyword%';

-- Architectural principles and system reference
SELECT title, content FROM agent_knowledge WHERE type = 'configuration' AND tags @> ARRAY['config','admin'];

-- Pipeline status
SELECT * FROM get_all_pipeline_status();

-- Capability vs inventory framework (full detail)
SELECT content FROM agent_knowledge WHERE title ILIKE '%capability vs inventory%';
```
