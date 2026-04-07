# Cade — Paste This Into Your Claude Code Chat

Walk me through setting up my full admin environment for the Creekside Marketing agent system. I'm Cade MacLean (cade@creeksidemarketingpros.com), co-founder. My setup should mirror Peterson's exactly.

Here's what I need you to help me with, step by step. Don't skip ahead — confirm each step works before moving to the next.

---

## STEP 1: Clone the repo

Help me clone the Creekside agent system repo and make the hooks executable:

```bash
git clone https://github.com/peterson-rainey/creekside-agent-system.git ~/creekside-workspace
cd ~/creekside-workspace
chmod +x .claude/hooks/*.sh
```

After this is done, confirm the following files exist:
- `~/creekside-workspace/CLAUDE.md`
- `~/creekside-workspace/.claude/settings.json`
- `~/creekside-workspace/.claude/agents/` (should have 40+ .md files)
- `~/creekside-workspace/.claude/hooks/` (should have 20 .sh files)

If any are missing, troubleshoot before continuing.

---

## STEP 2: Connect MCP servers

I need to connect these MCP integrations. Walk me through each one:

### Supabase
The Supabase MCP should already be connected. Test it by running:
```sql
SELECT count(*) FROM clients;
```
If this returns a number, Supabase is working. If not, I may need to update my MCP config. The project ref is `suhnpazajrmfcmbwckkx`.

### Gmail
I need to connect my Gmail (cade@creeksidemarketingpros.com). When I try to use Gmail tools, it should open an OAuth authorization link in my browser. Help me:
1. Try calling `gmail_search_messages` with query "is:inbox" and max_results 1
2. If it prompts me to authorize, I'll click the OAuth link and approve access
3. After approval, retry the search to confirm it works

If the OAuth link doesn't appear automatically, check if the Gmail MCP is listed in my connected integrations at claude.ai/settings. If it's there but not working, try disconnecting and reconnecting it.

### Google Sheets / Google Drive
Known issue: Google Sheets files are INVISIBLE to the Google Drive MCP tools. They don't appear in search results or folder listings. This is a known MCP limitation, not a bug in our setup.

Workarounds if I need Sheet data:
1. Use the Google Sheets API directly via Python (the `gspread` library)
2. If the data is already in our database, check `gdrive_operations`, `gdrive_legal`, or `gdrive_marketing` tables — the pipeline has already imported it
3. For accounting data specifically, check the `accounting_entries` table — our gsheets_accounting pipeline pulls from the master spreadsheet

### Other MCPs
Confirm these are connected by testing each:
- **Slack**: Try `slack_search_channels` for "general"
- **ClickUp**: Try listing tasks in any project
- **Google Calendar**: Try `gcal_list_events` for today
- **Square**: Try getting service info

For any that fail, walk me through reconnecting them at claude.ai/settings.

---

## STEP 3: Create your identity file

This file tells the system who you are so your sessions get attributed to your account:

```bash
cd ~/creekside-workspace
echo -e "role=admin\nemail=cade@creeksidemarketingpros.com" > .claude/user-role.conf
```

This file is gitignored (stays on your machine only). Without it, your sessions won't be linked to you in the database and we can't tell who did what.

Verify it was created:
```bash
cat .claude/user-role.conf
```

Expected output:
```
role=admin
email=cade@creeksidemarketingpros.com
```

---

## STEP 4: Verify database access

Run these queries to confirm my admin access:

```sql
-- Confirm I exist as admin
SELECT name, role, permissions, is_active FROM system_users WHERE email = 'cade@creeksidemarketingpros.com';
```

Expected: role = 'admin', permissions has can_promote and can_write_main both true, is_active = true.

```sql
-- Test write access
INSERT INTO agent_knowledge (type, title, content, tags)
VALUES ('test', 'Cade setup verification', 'Testing admin write access - delete after verification', ARRAY['test']);
```

This should succeed. If it does, clean it up:
```sql
DELETE FROM agent_knowledge WHERE title = 'Cade setup verification';
```

---

## STEP 5: Verify hooks are working

Test the safety layer:

1. Try to run a destructive query: `DROP TABLE clients;` — this should be BLOCKED by the block-destructive-ops hook.
2. Try to edit CLAUDE.md — this should be BLOCKED by the block-protected-files hook.

Both blocks are expected and correct. These hooks protect against accidental damage.

If I need to edit protected files (CLAUDE.md, settings, hooks), I run:
```bash
touch .claude/ADMIN_MODE
```
Make my edits, then:
```bash
rm .claude/ADMIN_MODE
```

---

## STEP 6: Test agent spawning

First, grab a client to test with:
```sql
SELECT id, name FROM clients WHERE status = 'active' LIMIT 5;
```

Then spawn the `client-context-agent` and pull context for one of those clients by name. This confirms:
- Agents load correctly from `.claude/agents/`
- Sub-agents can access MCP tools
- The QC pattern works

---

## TROUBLESHOOTING

If something isn't working, here's how to diagnose:

### "MCP server not found" or tool calls fail
- Check `claude.ai/settings` to see which MCPs are connected
- For Supabase specifically, verify the project ref is `suhnpazajrmfcmbwckkx`
- Try disconnecting and reconnecting the MCP

### Gmail OAuth won't authorize
- The OAuth flow should open a browser link automatically when you first try to use a Gmail tool
- Make sure you're authorizing with cade@creeksidemarketingpros.com (not a personal Gmail)
- If the link doesn't appear, the Gmail MCP may not be connected — check claude.ai/settings
- If you see a "token expired" error, disconnect and reconnect the Gmail MCP to get a fresh token

### Google Sheets data not showing up
- This is expected — Sheets are invisible to the Drive MCP
- Check if the data already exists in our database: `SELECT DISTINCT source_type FROM gdrive_operations;`
- For accounting data: `SELECT count(*) FROM accounting_entries;`
- If you need fresh Sheet data, ask Peterson — the pipeline runs monthly

### Hooks blocking something they shouldn't
- Check the audit log: `cat /tmp/claude-audit-$(date +%Y%m%d).log`
- Check the snapshot log: `cat /tmp/claude-snapshots-$(date +%Y%m%d).jsonl`
- If a hook is incorrectly blocking, tell Peterson the exact error message

### Git pull conflicts on session start
- The auto-pull hook runs `git pull --ff-only` on every new chat
- If you've made local changes that conflict with remote, you'll need to commit and push your changes first, or run `git pull --rebase`
- For day-to-day: always commit and push your changes rather than leaving them uncommitted

### Need to search the database
- Keyword search: `SELECT * FROM keyword_search_all('search term');`
- Semantic search: `SELECT * FROM search_all('search term');`
- Client lookup: `SELECT * FROM client_context_cache WHERE client_name ILIKE '%name%';`
- Full raw text: `SELECT * FROM get_full_content('table_name', 'record_id');`

---

## KEY REFERENCE

- **Supabase project**: suhnpazajrmfcmbwckkx
- **Git repo**: https://github.com/peterson-rainey/creekside-agent-system.git
- **My system_users ID**: 307b2652-effa-4ca0-82b6-8908ecd23a09
- **My role**: admin (full read/write access to all tables)
- **Protected operations**: DROP, TRUNCATE, DELETE without WHERE, rm -rf, force push — always blocked
- **Protected files**: CLAUDE.md, .claude/settings*.json, .claude/hooks/*.sh, .env* — use ADMIN_MODE to edit
