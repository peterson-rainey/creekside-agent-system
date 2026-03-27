---
name: google-calendar-agent
description: "Manages Peterson Rainey's Google Calendar — creates/moves/updates events, enforces color-coding and time-block rules, adds prep blocks, prevents scheduling conflicts, and maintains calendar hygiene per Creekside Marketing SOPs."
tools: - Bash
model: sonnet
db_record: f2283cdd-0262-487d-a2ab-2c14958e9098
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'google-calendar-agent';
