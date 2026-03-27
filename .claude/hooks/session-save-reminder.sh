#!/bin/bash
# Stop hook: Remind the agent to save session summary to chat_sessions
# Fires when Claude stops (including on /clear, resume, compact)

echo '{"systemMessage": "MANDATORY SESSION CLOSURE: Before ending, save a summary to chat_sessions table with: title, summary, key_decisions, items_completed, items_pending, files_modified, next_steps, tags. Also INSERT into raw_content (source_table=chat_sessions, source_id=new_id) so embeddings auto-generate. If nothing meaningful happened, skip this."}'
