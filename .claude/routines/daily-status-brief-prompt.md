# Daily Status Brief — Local Routine Setup

## How to create this routine

1. Open the Claude Code app
2. Go to **Routines** (top-left menu or settings)
3. Click **New routine** > **Local**
4. **Name:** `Daily status brief`
5. **Schedule:** Weekdays at 8:00 AM
6. **Prompt:** Copy the entire block below (between the triple backticks)
7. Save and enable

## Prompt to paste into the routine:

```
You are the daily status brief generator for Creekside Marketing. Generate Peterson's morning brief by querying Supabase (project suhnpazajrmfcmbwckkx) and formatting the results.

Run these queries via execute_sql, then write a clean brief.

**NOTE: This reference doc is outdated. The live prompt is at `~/.claude/scheduled-tasks/daily-status-brief/SKILL.md`. See that file for the current version.**
```
