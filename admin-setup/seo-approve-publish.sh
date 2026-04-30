#!/bin/bash
# seo-approve-publish.sh
# Approves a draft SEO blog post and publishes it to the creekside-website repo.
#
# Usage:
#   ./admin-setup/seo-approve-publish.sh <queue_id>
#   ./admin-setup/seo-approve-publish.sh list        # List pending drafts
#   ./admin-setup/seo-approve-publish.sh reject <queue_id> "reason"
#
# Requires: SUPABASE_SERVICE_ROLE_KEY env var, git access to creekside-website repo

set -euo pipefail

WEBSITE_REPO="/Users/petersonrainey/creekside-website"
BLOG_DIR="$WEBSITE_REPO/src/content/blog"
PROJECT_ID="suhnpazajrmfcmbwckkx"
SUPABASE_URL="https://${PROJECT_ID}.supabase.co"

# Check for service role key
if [ -z "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
  echo "Error: SUPABASE_SERVICE_ROLE_KEY not set"
  exit 1
fi

case "${1:-}" in
  list)
    echo "=== Pending SEO Blog Drafts ==="
    echo ""
    # Use psql-style output via the MCP tool instead
    echo "Run this in Claude Code to see drafts:"
    echo ""
    echo "  SELECT id, slug, target_keyword, template_type,"
    echo "         LEFT(draft_content, 200) as preview,"
    echo "         draft_generated_at"
    echo "  FROM seo_content_queue"
    echo "  WHERE status = 'draft'"
    echo "  ORDER BY priority DESC;"
    echo ""
    echo "Then approve with: ./admin-setup/seo-approve-publish.sh <queue_id>"
    ;;

  reject)
    QUEUE_ID="${2:-}"
    REASON="${3:-No reason given}"
    if [ -z "$QUEUE_ID" ]; then
      echo "Usage: $0 reject <queue_id> \"reason\""
      exit 1
    fi
    echo "Rejecting draft $QUEUE_ID: $REASON"
    echo "Run in Claude Code:"
    echo "  UPDATE seo_content_queue SET status = 'rejected', rejection_reason = '${REASON}', updated_at = now() WHERE id = '${QUEUE_ID}';"
    ;;

  "")
    echo "Usage:"
    echo "  $0 list                          # List pending drafts"
    echo "  $0 <queue_id>                    # Approve and publish a draft"
    echo "  $0 reject <queue_id> \"reason\"    # Reject a draft"
    echo ""
    echo "Recommended workflow:"
    echo "  1. Run the seo-blog-agent to generate drafts"
    echo "  2. Review drafts with: $0 list"
    echo "  3. Approve with: $0 <queue_id>"
    ;;

  *)
    QUEUE_ID="$1"
    echo "=== Publishing SEO Blog Post ==="
    echo "Queue ID: $QUEUE_ID"
    echo ""

    # This script provides the workflow guide.
    # Actual publishing is done through Claude Code because it needs
    # Supabase MCP access to read the draft content.
    echo "Run the following in Claude Code to publish this post:"
    echo ""
    echo "1. Read the draft:"
    echo "   SELECT slug, draft_content FROM seo_content_queue WHERE id = '${QUEUE_ID}' AND status = 'draft';"
    echo ""
    echo "2. Write the file to the website repo:"
    echo "   Write the draft_content to: ${BLOG_DIR}/{slug}.md"
    echo ""
    echo "3. Commit and push:"
    echo "   cd ${WEBSITE_REPO} && git add src/content/blog/{slug}.md && git commit -m 'Add blog post: {title}' && git push"
    echo ""
    echo "4. Update the queue:"
    echo "   UPDATE seo_content_queue SET status = 'published', published_at = now() WHERE id = '${QUEUE_ID}';"
    echo ""
    echo "5. Create published record:"
    echo "   INSERT INTO seo_published (queue_id, vertical_id, slug, title, template_type, target_keyword)"
    echo "   SELECT id, vertical_id, slug, (regexp_match(draft_content, 'title: \"([^\"]+)\"'))[1], template_type, target_keyword"
    echo "   FROM seo_content_queue WHERE id = '${QUEUE_ID}';"
    echo ""
    echo "Or just tell Claude: 'publish seo draft ${QUEUE_ID}'"
    ;;
esac
