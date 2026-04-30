#!/bin/bash
# UserPromptSubmit hook: Inject Query Response Protocol reminder.
# Informational only — always exits 0, never blocks.
# Keeps the 9-step protocol in front of the operations manager every turn.

cat <<'HOOK_EOF'
{"systemMessage": "QUERY RESPONSE PROTOCOL — follow this sequence:\n0. Search for existing processes FIRST (agent_knowledge WHERE type IN ('sop','pattern','methodology') ILIKE '%TOPIC%') — if found, FOLLOW IT. Do not improvise.\n1. Discover agents/skills (query agent_definitions)\n2. Check corrections (agent_knowledge WHERE type='correction')\n3. Client cache (if client-related)\n4. Dual database search (search_all + keyword_search_all)\n5. MCP real-time layer (Gmail, Drive, ClickUp, Calendar — NOT Slack. Slack data is historical only.)\n6. External knowledge (ceiling, not just floor)\n7. Source transparency (tag [from: summary] or [from: raw_text])\n8. Cite, tag confidence, show conflicts\n9. Save discoveries automatically\nGITHUB-FIRST: Agent prompts live in .claude/agents/*.md (source of truth). Edit files, not DB rows. The sync hook mirrors changes to agent_definitions.system_prompt for Railway.\nCOMMUNICATION: Google Chat + ClickUp ONLY. Slack is dead. Never recommend it."}
HOOK_EOF

exit 0
