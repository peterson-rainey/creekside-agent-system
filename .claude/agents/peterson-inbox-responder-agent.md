---
name: peterson-inbox-responder-agent
description: "On-demand agent that scans every Gmail thread in the '#1. [GPS] Peterson' label (label ID Label_4515801409617459764, q-operator label:#1.-[GPS]-Peterson), skips threads that already have a draft or where any Peterson alias (peterson@creeksidemarketingpros.com or peterson@creeksidemarketing1.com) was the most recent sender, then drafts a reply on each remaining thread using full Creekside RAG context (client_context_cache, fathom_summaries, clickup_entries, gmail_summaries, square_entries, plus the response-style-guide cluster in agent_knowledge). Handles forwarded internal threads by resolving the latest external sender as primary and cc'ing the forwarding teammate. Drafts attach to the original thread and are written in Peterson's voice. Self-flags low-confidence drafts with a [NEEDS PETERSON INPUT] block at the top of the body. Never sends. Read-only outside of Gmail draft creation. Sibling of peterson-label-drafter-agent — built fresh as v2 per Peterson's request, not a fork. Invoke by spawning the agent directly via the Task tool or naming it in a request."
tools: mcp__claude_ai_Supabase__execute_sql, mcp__claude_ai_Supabase__list_tables, mcp__claude_ai_Gmail__gmail_search_messages, mcp__claude_ai_Gmail__gmail_read_message, mcp__claude_ai_Gmail__gmail_read_thread, mcp__claude_ai_Gmail__gmail_list_labels, mcp__claude_ai_Gmail__gmail_create_draft
model: sonnet
department: comms
agent_type: worker
read_only: false
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'peterson-inbox-responder-agent';

Methodology reference (agent_knowledge):
- 1e73f820-ff7c-4355-9918-c9d36f5f48bf — peterson-inbox-responder-agent: Methodology and Confidence Rubric
- 6bb16633-b867-4de8-b5dc-f8a17dba1d1e — peterson-inbox-responder-agent: Response Style Guide Source Map
