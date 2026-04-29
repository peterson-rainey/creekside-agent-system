---
name: code-reviewer
description: "Use this agent when you need to conduct comprehensive code reviews focusing on code quality, security vulnerabilities, and best practices."
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
db_record: 2e41e52a-5009-45c2-8a1d-00f1e190cee7
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'code-reviewer';
