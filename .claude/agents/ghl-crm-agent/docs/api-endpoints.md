# GHL API v2 Endpoint Reference

All endpoints use base URL `https://services.leadconnectorhq.com` with headers:
```bash
Authorization: Bearer ${GHL_API_KEY}
Version: 2021-07-28
Content-Type: application/json   # for POST/PUT requests
```

---

## Phase 1: Opportunities and Pipelines

### List Pipelines

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

Returns array of pipelines with their stages. Cache pipeline/stage IDs for the session.

### Search Opportunities

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/opportunities/search?locationId=${GHL_LOCATION_ID}&query={SEARCH_TERM}&limit=20&skip=0" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

Query params: `query` (name/email search), `pipelineId`, `stageId`, `status` (open/won/lost/abandoned), `assignedTo`, `limit` (max 100), `skip`.

### Get Single Opportunity

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/opportunities/{OPPORTUNITY_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Create Opportunity

```bash
curl -s -X POST \
  "https://services.leadconnectorhq.com/opportunities/" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "name": "OPPORTUNITY_NAME",
    "pipelineId": "PIPELINE_ID",
    "pipelineStageId": "STAGE_ID",
    "status": "open",
    "contactId": "CONTACT_ID",
    "monetaryValue": 0
  }'
```

### Update Opportunity (Stage / Status)

```bash
curl -s -X PUT \
  "https://services.leadconnectorhq.com/opportunities/{OPPORTUNITY_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "pipelineStageId": "NEW_STAGE_ID",
    "status": "won"
  }'
```

Valid statuses: `open`, `won`, `lost`, `abandoned`

### Contract Status (Documents API)

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/documents/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

Contract status may also be stored as a custom field. If Documents API returns nothing useful:

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/customFields" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

Find the field ID for "contract" or "signed" fields, then query the contact or opportunity record's `customFields` array.

---

## Phase 2: Call Logs and SMS History

GHL does not have a dedicated call log endpoint. Call logs appear as conversation messages with `type: TYPE_CALL`. SMS appears as `type: TYPE_SMS`.

### Find Conversations for a Contact

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/conversations/search?locationId=${GHL_LOCATION_ID}&contactId={CONTACT_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Get Messages in a Conversation

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/conversations/{CONVERSATION_ID}/messages?limit=50" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Message Type Filtering

After retrieving messages, filter by type:
- `TYPE_CALL` -- call log: includes `duration` (seconds), `recordingUrl`, `direction` (inbound/outbound)
- `TYPE_SMS` -- SMS: includes `body`, `direction`
- `TYPE_EMAIL` -- Email message
- `TYPE_ACTIVITY` -- System activity log

### Send SMS

```bash
curl -s -X POST \
  "https://services.leadconnectorhq.com/conversations/messages" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "SMS",
    "contactId": "CONTACT_ID",
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "message": "MESSAGE_BODY"
  }'
```

### Send Email

```bash
curl -s -X POST \
  "https://services.leadconnectorhq.com/conversations/messages" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "Email",
    "contactId": "CONTACT_ID",
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "subject": "SUBJECT",
    "html": "EMAIL_BODY_HTML"
  }'
```

**CONFIRM before sending any SMS or Email.** Show Peterson the exact message and recipient before executing.

---

## Phase 3: Contacts

### Search Contacts

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/contacts/?locationId=${GHL_LOCATION_ID}&query={SEARCH_TERM}&limit=20&skip=0" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

Advanced search:

```bash
curl -s -X POST \
  "https://services.leadconnectorhq.com/contacts/search" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "filters": [
      {"field": "email", "operator": "contains", "value": "SEARCH_VALUE"}
    ],
    "limit": 20,
    "skip": 0
  }'
```

GHL deduplicates contacts on email and phone. Always search before creating.

### Get Single Contact

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Create Contact

```bash
curl -s -X POST \
  "https://services.leadconnectorhq.com/contacts/" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "firstName": "FIRST",
    "lastName": "LAST",
    "email": "EMAIL",
    "phone": "PHONE",
    "tags": ["TAG1", "TAG2"]
  }'
```

### Update Contact

```bash
curl -s -X PUT \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "UPDATED_FIRST",
    "customFields": [
      {"id": "FIELD_ID", "value": "FIELD_VALUE"}
    ]
  }'
```

### Add / Remove Tags

```bash
# Add
curl -s -X POST \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}/tags" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["TAG1", "TAG2"]}'

# Remove
curl -s -X DELETE \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}/tags" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["TAG1"]}'
```

### Get Contact Notes / Tasks

```bash
# Notes
curl -s -X GET \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}/notes" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"

# Tasks
curl -s -X GET \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}/tasks" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Pagination Pattern

GHL uses `limit` (max 100) and `skip` for pagination:
```bash
# Pseudocode for full pagination
skip=0; limit=100; all_records=[]
while true:
  fetch page with skip=skip, limit=limit
  append results to all_records
  if len(results) < limit: break
  skip += limit
```

---

## Phase 4: Forms and Submissions

### List Forms

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/forms/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Get Form Submissions

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/forms/submissions?locationId=${GHL_LOCATION_ID}&formId={FORM_ID}&limit=20&skip=0" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

Forms are read-only via API. Direct Peterson to the GHL UI for form changes.

---

## Phase 5: Workflows and Funnels

### List Workflows

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/workflows/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Add / Remove Contact from Workflow

```bash
# Add
curl -s -X POST \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}/workflow/{WORKFLOW_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{}'

# Remove
curl -s -X DELETE \
  "https://services.leadconnectorhq.com/contacts/{CONTACT_ID}/workflow/{WORKFLOW_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

**CONFIRM before adding or removing from workflows.**

### List Funnels / Funnel Pages (Read-Only)

```bash
# Funnels
curl -s -X GET \
  "https://services.leadconnectorhq.com/funnels/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"

# Funnel pages
curl -s -X GET \
  "https://services.leadconnectorhq.com/funnels/pages?locationId=${GHL_LOCATION_ID}&funnelId={FUNNEL_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

Workflows and funnels cannot be created via API -- direct Peterson to the GHL UI.

---

## Additional Endpoints

### Calendars / Appointments

```bash
# List calendars
curl -s -X GET \
  "https://services.leadconnectorhq.com/calendars/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"

# List events
curl -s -X GET \
  "https://services.leadconnectorhq.com/calendars/events?locationId=${GHL_LOCATION_ID}&startTime={ISO_TIMESTAMP}&endTime={ISO_TIMESTAMP}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"

# Create appointment
curl -s -X POST \
  "https://services.leadconnectorhq.com/calendars/events" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "calendarId": "CALENDAR_ID",
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "contactId": "CONTACT_ID",
    "startTime": "ISO_TIMESTAMP",
    "endTime": "ISO_TIMESTAMP",
    "title": "APPOINTMENT_TITLE"
  }'
```

### Invoices

```bash
# List
curl -s -X GET \
  "https://services.leadconnectorhq.com/invoices/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"

# Create
curl -s -X POST \
  "https://services.leadconnectorhq.com/invoices/" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "contactId": "CONTACT_ID",
    "items": [{"name": "SERVICE", "qty": 1, "unitPrice": 0}]
  }'
```

### Custom Fields / Values

```bash
# Fields
curl -s -X GET \
  "https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/customFields" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"

# Values
curl -s -X GET \
  "https://services.leadconnectorhq.com/locations/${GHL_LOCATION_ID}/customValues" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Users

```bash
curl -s -X GET \
  "https://services.leadconnectorhq.com/users/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```

### Webhooks

```bash
# List
curl -s -X GET \
  "https://services.leadconnectorhq.com/webhooks/?locationId=${GHL_LOCATION_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"

# Create
curl -s -X POST \
  "https://services.leadconnectorhq.com/webhooks/" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d '{
    "locationId": "'"${GHL_LOCATION_ID}"'",
    "url": "WEBHOOK_URL",
    "events": ["ContactCreate", "OpportunityStatusUpdate"]
  }'

# Delete
curl -s -X DELETE \
  "https://services.leadconnectorhq.com/webhooks/{WEBHOOK_ID}" \
  -H "Authorization: Bearer ${GHL_API_KEY}" \
  -H "Version: 2021-07-28"
```
