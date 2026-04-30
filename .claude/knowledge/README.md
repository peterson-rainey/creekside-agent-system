# Shared Knowledge

Knowledge files committed to GitHub that all users benefit from. Organized by type.

## Directory structure

```
knowledge/
  patterns/          # Discovered patterns and conventions
  decisions/         # Key architectural and business decisions
  reference/         # Reference material and lookups
  troubleshooting/   # Bug fixes and solutions
```

## Rules

- Anyone can add files here. Use descriptive filenames (e.g., `railway-deploy-gotchas.md`).
- Keep each file focused on one topic.
- If the content also needs to be queryable by Railway agents or semantic search, add it to `agent_knowledge` in Supabase too (dual-write).
- SOPs currently stay in `agent_knowledge` until the knowledge-sync hook is built.
