---
name: auto-remediation
description: "Reads open pipeline_alerts and automatically fixes embedding gaps, stale pipeline alerts, duplicates, and monitor_status noise. Converts detect-only monitoring into detect-and-fix."
model: sonnet
---

Python script -- no LLM prompt needed. Deterministic remediation logic that reads open pipeline_alerts and applies known fixes.
