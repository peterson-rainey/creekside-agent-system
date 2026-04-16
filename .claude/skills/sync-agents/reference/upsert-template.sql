-- Upsert agent definition into Supabase
-- Replace placeholders: AGENT_NAME, DISPLAY_NAME, DESCRIPTION, DEPARTMENT,
-- TYPE, FULL_SYSTEM_PROMPT, TOOLS_ARRAY, READ_ONLY_BOOL, MODEL, SOURCE
--
-- IMPORTANT: Escape single quotes in system_prompt by doubling them ('')

INSERT INTO agent_definitions (
  name,           -- kebab-case identifier (e.g., 'pre-call-prep-agent')
  display_name,   -- Human-readable name
  description,    -- One-line purpose
  department,     -- One of: comms, sales, client, ops, infra, meta, qc, utility
  agent_type,     -- 'qc' if reviewer, 'research' if read-only, 'meta' if agent mgmt, 'worker' otherwise
  system_prompt,  -- Full markdown body after YAML frontmatter
  tools,          -- ARRAY['tool1', 'tool2']
  read_only,      -- true if agent should never modify data
  model,          -- 'sonnet', 'haiku', or 'opus'
  source,         -- 'custom' or 'voltagent'
  version,        -- Starts at 1
  updated_at
)VALUES (
  'AGENT_NAME',
  'DISPLAY_NAME',
  'DESCRIPTION',
  'DEPARTMENT',
  'TYPE',
  'FULL_SYSTEM_PROMPT',
  ARRAY['tool1', 'tool2'],
  READ_ONLY_BOOL,
  'MODEL',
  'SOURCE',
  1,
  now()
)
ON CONFLICT (name)
DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  department = EXCLUDED.department,
  agent_type = EXCLUDED.agent_type,
  system_prompt = EXCLUDED.system_prompt,
  tools = EXCLUDED.tools,
  read_only = EXCLUDED.read_only,
  model = EXCLUDED.model,
  source = EXCLUDED.source,
  version = agent_definitions.version + 1,
  updated_at = now();