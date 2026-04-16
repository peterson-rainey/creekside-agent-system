#!/bin/bash
# Parse YAML frontmatter from a .md agent definition file
# Usage: ./parse-frontmatter.sh /path/to/agent.md
# Output: YAML content between --- markers (without the markers)
FILE="$1"
if [ ! -f "$FILE" ]; then
  echo "Error: File not found: $FILE"
  exit 1
fi
awk '/^---$/{n++; next} n==1{print}' "$FILE"