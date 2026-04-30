#!/bin/bash
# UserPromptSubmit hook: Inject the 6 protocol steps not covered by CLAUDE.md or ops-manager.md.
# Informational only — always exits 0, never blocks.
# Steps covered elsewhere (and removed): search existing processes (Rule 3), discover agents (ops-manager.md),
# MCP real-time layer (Rule 1), external knowledge ceiling (Rule 9), GitHub-first (Rule 10), Slack-is-dead (Rule 1).

cat <<'HOOK_EOF'
{"systemMessage": "PROTOCOL REMINDER (6 steps):\n1. Check corrections BEFORE producing output (agent_knowledge WHERE type='correction')\n2. Dual search: use BOTH search_all() AND keyword_search_all() — never just one\n3. Client queries: check client_context_cache FIRST, then get_client_360() if needed\n4. Source transparency: tag every claim [from: summary] or [from: raw_text]\n5. Cite sources, tag confidence (HIGH/MEDIUM/LOW), flag conflicts between sources\n6. Save novel discoveries back to agent_knowledge automatically"}
HOOK_EOF

exit 0
