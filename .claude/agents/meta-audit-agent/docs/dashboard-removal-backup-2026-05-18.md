# Dashboard Meta Audit -- Removal Backup (2026-05-18)

Rollback pointer for the `creekside-dashboard` TypeScript Meta audit implementation, removed on 2026-05-18 in favor of the Claude Code `meta-audit-agent` in this repo.

## Why removed

Two parallel implementations of the same audit workflow created drift risk and duplicate Anthropic API billing. The dashboard called the Anthropic API directly via `ANTHROPIC_API_KEY` env var. The Claude Code path runs under Peterson's Max plan. The Claude Code agent is now the canonical Meta audit runner at Creekside.

## What was in the dashboard

Repo: `creekside-dashboard` (Railway-deployed Next.js app)

| File | LOC | Purpose |
|---|---|---|
| `src/lib/meta-audit/checklist.ts` | 1,005 | 70-item Meta audit checklist |
| `src/lib/meta-audit/pdf-generator.ts` | 1,166 | jsPDF/pdfkit-based PDF builder |
| `src/lib/meta-audit/data-puller.ts` | 352 | PipeBoard data fetcher (mirrors steps 4a-4h of the Claude agent) |
| `src/lib/meta-audit/locales.ts` | 69 | Spanish locale strings |
| `src/lib/meta-audit/types.ts` | 225 | TS interfaces |
| `src/app/api/meta-audit/run/route.ts` | 274 | Next.js API route (POST, maxDuration 300s) |
| `src/app/(dashboard)/meta-audits/MetaAuditsClient.tsx` | 242 | React client component |
| `src/app/(dashboard)/meta-audits/page.tsx` | 53 | Page wrapper |
| `src/components/NavTabs.tsx` | (modified) | Removed `{ label: 'Meta Audits', href: '/meta-audits' }` |

**Total: 3,386 LOC across 8 files + 1 nav modification.**

## Architecture (for context)

Self-contained Next.js feature. Took an `accountId` in the POST body, pulled data via the `@/lib/pipeboard` helper, ran a 70-item checklist server-side, called Claude (claude-3-5-sonnet) via the Anthropic SDK for narrative synthesis (with a rule-based fallback if the API key was missing), generated two PDFs (audit + Loom brief), returned them base64-encoded in the HTTP response. No DB writes, no cron, no cross-agent dependencies.

## Pre-removal verification (read-only, 2026-05-18)

| Check | Result |
|---|---|
| `scheduled_agents` cron entries | None |
| `agent_definitions` rows | None |
| `agent_run_history` last 30 days | Zero runs |
| Cross-agent / pipeline references | None |
| Independence from Claude agent | Confirmed -- different repos, languages, auth, output paths, zero shared code |

The dashboard's `data-puller.ts` header comment explicitly states it "mirrors steps 4a-4h of the meta-audit-agent workflow" -- confirming it was always a parallel copy, not a dependency.

## Restore instructions

If the Claude Code path becomes unreliable across operators and a full rollback is needed:

```bash
cd ~/creekside-dashboard
git checkout 43a4461a806c837c3ae60231d5c6956c312171ad -- \
  src/lib/meta-audit/ \
  src/app/api/meta-audit/ \
  "src/app/(dashboard)/meta-audits/"
# Then manually re-add the nav entry in src/components/NavTabs.tsx:
#   { label: 'Meta Audits', href: '/meta-audits' }
npm run build && npm run test
git add -A && git commit -m "Restore dashboard Meta audit (rollback from Claude Code path)"
```

**Last known-working commit:** `43a4461a806c837c3ae60231d5c6956c312171ad` ("fix(meta-audit): increase gap between cover label and client name")

**Dashboard HEAD at removal time:** `fca9180da2678a4a81e9c90dbb2c870b3503ca75`

## Replacement

`.claude/agents/meta-audit-agent.md` in this repo (`creekside-agent-system`).

- Same JSM-Sensate + B2B Rocket Phase 1/2/3 structure
- 80-item checklist (expanded from the dashboard's 70)
- Tailwind blue + slate palette (sampled from a real Creekside Loom Brief PDF)
- Output: `~/Desktop/meta-audit-<slug>-<date>/audit.pdf` + screenshots
- Built via Python ReportLab + Pillow + PyMuPDF
- Invoked from Claude Code: ask Claude to "Run a Meta audit for [client name or act_XXXXXX]"
- See: `.claude/agents/meta-audit-agent/docs/deliverable-template.md` for structure
- See: `.claude/agents/meta-audit-agent/docs/build_pdf_reference.py` for the canonical build script

## Unrelated gap noted during removal audit

The Claude agent file exists in this repo but is NOT registered in the `agent_definitions` Supabase table. This is a pre-existing gap, not caused by the dashboard removal. The `agent-edit-monitor.sh` hook should have inserted it. Needs follow-up to either:
1. Manually insert the row matching the file frontmatter
2. Fix the hook so it auto-inserts on first push

Until that's fixed, operators can still invoke the agent via Claude Code (loads from `.claude/agents/` directly), but the operations manager protocol's routing lookup (`SELECT name, department FROM agent_definitions WHERE status = 'active'`) won't surface it.
