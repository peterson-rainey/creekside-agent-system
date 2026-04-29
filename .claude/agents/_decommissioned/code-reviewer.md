---
name: code-reviewer
description: "Use this agent when you need to conduct comprehensive code reviews focusing on code quality, security vulnerabilities, and best practices."
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
---
Agent prompt lives in the database.
Query: SELECT system_prompt FROM agent_definitions WHERE name = 'code-reviewer';
