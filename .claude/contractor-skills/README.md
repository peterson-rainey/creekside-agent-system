# Contractor Skills

Each contractor gets their own folder here for personal skills they build.

## Structure
```
contractor-skills/
  cade/
    my-custom-skill/
      SKILL.md
  new-contractor/
    their-skill/
      SKILL.md
```

## How it works

- **Claude Code**: On session start, a hook symlinks your folder into `.claude/skills/_personal/` so your skills auto-load alongside core skills.
- **Claude Chat / Co-work**: Ask Claude to check your contractor-skills folder for available skills.
- **Core skills** in `.claude/skills/` are always available to everyone.
- **Other contractors' skills** are visible in git but not auto-loaded. Ask Claude if you want to see what others have built.

## Creating a new skill

1. Create a folder: `.claude/contractor-skills/{your-name}/{skill-name}/`
2. Add a `SKILL.md` file with your skill content
3. It auto-commits to git and syncs on your next session
