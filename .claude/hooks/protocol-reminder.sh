#!/bin/bash
# UserPromptSubmit hook: Protocol steps not covered by CLAUDE.md.
# Informational only -- always exits 0, never blocks.
# Removed (now in CLAUDE.md): dual search, client cache-first, corrections check (correction-inject.sh).

cat <<'HOOK_EOF'
{"systemMessage": "PROTOCOL REMINDER:\n1. Source transparency: tag every claim [from: summary] or [from: raw_text]\n2. Cite sources, tag confidence (HIGH/MEDIUM/LOW), flag conflicts between sources\n3. Save novel discoveries back to agent_knowledge automatically"}
HOOK_EOF

exit 0
