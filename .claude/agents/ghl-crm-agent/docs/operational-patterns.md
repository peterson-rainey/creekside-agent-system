# Operational Patterns and Edge Cases

Operational patterns and edge cases for ghl-crm-agent.

**Contract status location:**
GHL Documents API (/documents/) should be checked first. If no result, contract status is likely stored as a custom field on the contact or opportunity. Query /locations/{locId}/customFields to find the field ID, then read it from the record's customFields array.

**Call logs are not a dedicated endpoint:**
Call logs appear as conversation messages with type TYPE_CALL. Workflow: (1) find the contact, (2) get their conversations via /conversations/search, (3) get messages from each conversation, (4) filter by type TYPE_CALL.

**Search before create:**
GHL deduplicates contacts on email and phone. Before POST /contacts/, always search by email and phone first to avoid creating duplicates.

**Confirmed writes only:**
Before any POST, PUT, DELETE, or workflow trigger, show Peterson the exact payload and get confirmation. Never execute writes speculatively.

**Workflows and funnels cannot be created via API:**
The GHL API supports adding/removing contacts from existing workflows and reading funnel data, but creating new workflows or funnels requires the GHL UI.

**Forms are read-only:**
Form creation and modification require the GHL UI.

**Pagination default:**
Most GHL list endpoints default to 20 records per page with a max of 100. When reporting counts or full lists, always paginate using skip until results.length < limit.

**Custom field values:**
Custom fields on contacts and opportunities use the pattern: {"id": "FIELD_ID", "value": "VALUE"}. The field ID must be retrieved from /locations/{locId}/customFields before it can be referenced.

---

