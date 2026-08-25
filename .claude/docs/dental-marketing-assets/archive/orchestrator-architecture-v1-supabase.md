# Dental Sequence Orchestrator -- Architecture

## Overview

The Dental Sequence Orchestrator automates follow-up communication for dental leads moving through the Creekside pipeline. GHL (GoHighLevel) is the CRM and delivery layer (contacts, pipeline, tags, SMS/email sends). ALL automation logic lives outside GHL.

## Components

### 1. Webhook Receiver (Supabase Edge Function)

- **URL**: `https://suhnpazajrmfcmbwckkx.supabase.co/functions/v1/dental-sequence-webhook`
- **Receives**: GHL webhook events (ContactCreate, ContactUpdate, OpportunityStatusUpdate)
- **Actions**:
  - Parses the event type and payload
  - Checks sequence trigger conditions (e.g., Booked Call Date set, tag added, opportunity stage change)
  - Inserts/updates rows in `dental_sequence_state`
  - For `immediate` messages, calls GHL API directly to send
  - For timed messages, sets `next_message_id` and `next_scheduled_at` on the state row
- **Auth**: Validates `X-Webhook-Secret` header against `DENTAL_WEBHOOK_SECRET` env var

### 2. Orchestrator (Railway, runs every 15 minutes)

- **Location**: `creekside-pipelines/pipelines/dental-orchestrator/`
- **Files**:
  - `orchestrator.py` -- main loop
  - `ghl_client.py` -- GHL API wrapper
  - `sequence_loader.py` -- YAML parser
  - `requirements.txt` -- dependencies
- **Logic**:
  1. Loads all YAML sequence definitions
  2. Queries `dental_sequence_state` for rows where `status = 'active'` AND `next_scheduled_at <= NOW()`
  3. For each due row:
     a. Fetches contact from GHL to check exit conditions
     b. If exit condition met, marks row `status = 'exited'` with reason
     c. If not exited, resolves template variables and sends the message via GHL API
     d. Advances to next message (sets `next_message_id`, `next_scheduled_at`)
     e. If no more messages, runs completion actions and marks `status = 'completed'`
  4. Updates `messages_sent`, `last_message_sent_id`, `last_message_sent_at`, `updated_at`

### 3. Sequence Definitions (YAML files in repo)

- **Location**: `creekside-agent-system/.claude/sequences/`
- **Files**:
  - `pre-call-warmup.yaml`
  - `no-show-recovery.yaml`
  - `form-complete-no-book.yaml`
  - `nurture-newsletter-bridge.yaml`
- **Format**: Each file defines trigger, entry/exit actions, and messages with copy/timing/channel

### 4. State Table (`dental_sequence_state`)

- **Location**: Supabase project `suhnpazajrmfcmbwckkx`
- **Purpose**: Tracks every contact's position in every active sequence
- **Key columns**:
  - `ghl_contact_id` + `sequence_id` -- identifies the enrollment
  - `status` -- `active`, `exited`, `completed`
  - `next_message_id` + `next_scheduled_at` -- what to send next and when
  - `messages_sent` -- JSONB array of `{message_id, sent_at}` records
  - `contact_data` -- cached contact fields at enrollment (timezone, booked_call_date, etc.)

## Data Flow

```
GHL Webhook Event
       |
       v
Supabase Edge Function (dental-sequence-webhook)
       |
       +--> INSERT/UPDATE dental_sequence_state
       +--> Send immediate messages via GHL API (if any)
       |
       v
Railway Orchestrator (every 15 min)
       |
       +--> Query dental_sequence_state WHERE next_scheduled_at <= NOW()
       +--> For each due message:
       |       +--> GET contact from GHL (check exit conditions)
       |       +--> If exit: mark exited, run exit actions
       |       +--> If active: resolve templates, send via GHL API
       |       +--> Advance to next message
       v
GHL sends SMS/Email to contact
```

## GHL API Details

- **Location ID**: pNy8KMWRuGF2sGihGTMo (env var `GHL_LOCATION_ID`)
- **API key**: env var `GHL_API_KEY`
- **Base URL**: `https://services.leadconnectorhq.com`
- **Rate limit**: 100 requests / 10 seconds per location
- **Endpoints used**:
  - `POST /conversations/messages` -- send SMS or email
  - `GET /contacts/{id}` -- fetch contact details
  - `PUT /contacts/{id}` -- update tags
  - `PUT /opportunities/{id}` -- update pipeline stage
  - `GET /contacts/?locationId=...` -- search contacts

## Dental Pipeline Stage IDs

| Stage | ID |
|-------|-----|
| New Lead | 4f189c75-99a3-4c83-81df-399c0631b92c |
| nurture | 65ddaf9d-024d-4ccf-95f4-347ed55d6a1c |
| Pre-call discussion | b70d2b92-2368-4b24-aa70-7146cd4d2098 |
| call booked | 8ad8a351-f55b-4fdc-b79d-41e2ba86e092 |
| no show | 467179c4-29d2-47e1-8fc0-e3d9425c5674 |
| pursuing | 1d19f619-8b5d-42f6-9270-e18105e5fa48 |
| invoice sent | a3d98bcc-2405-42ea-8fcd-f5c75bce7c27 |
| won | c223d438-2bca-47b6-816d-f60f2e2eac8a |
| unqualified | c6cbc333-15c3-48a2-a844-bb6a40c5615d |
| Lost | 98081afc-a861-4316-85c7-813198bbad3f |
| Referred | 211e19ab-0615-40ff-a04a-d966250831c5 |

## Custom Fields

| Field | ID |
|-------|-----|
| Booked Call Date | G5MN7xDI3JDv9QW8KMDf |

## Environment Variables

### Supabase Edge Function
- `DENTAL_WEBHOOK_SECRET` -- shared secret for GHL webhook validation
- `GHL_API_KEY` -- GoHighLevel API key
- `GHL_LOCATION_ID` -- GoHighLevel location ID
- `SUPABASE_URL` -- auto-set by Supabase
- `SUPABASE_SERVICE_ROLE_KEY` -- auto-set by Supabase

### Railway Orchestrator
- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SEQUENCE_FILES_PATH` -- path to YAML sequence files (default: local repo path)
- `BUTTONDOWN_API_KEY` -- for newsletter enrollment in nurture sequence

## Template Variables

Resolved at send time by fetching from GHL:

| Variable | Source | Fallback |
|----------|--------|----------|
| `{{ contact.first_name }}` | GHL contact `firstName` | "there" |
| `{{ contact.email }}` | GHL contact `email` | (required, skip send if missing) |
| `{{ contact.phone }}` | GHL contact `phone` | (required for SMS, skip if missing) |
| `{{ custom_values.cades_calendar }}` | GHL location custom value | (fetched once at startup, cached) |

## Timing Types

| Type | Description | Parameters |
|------|-------------|------------|
| `immediate` | Send right away on sequence entry | none |
| `offset` | Delay from sequence entry time | `offset_minutes` |
| `wall_clock` | Specific time relative to a contact field date | `anchor_field`, `anchor_offset_days`, `send_time`, `timezone` |

## Exit Conditions

Each sequence defines exit conditions checked before every send:

| Sequence | Exit Conditions |
|----------|----------------|
| Pre-Call Warm-Up | Opportunity moves to no-show, lost, or referred |
| No-Show Recovery | Booked Call Date gets set (rebooked), OR Day 7 no rebook (add nurture-pool tag) |
| Form Complete No Book | Booked Call Date gets set, OR Day 17 (add nurture-pool tag) |
| Nurture Newsletter Bridge | Booked Call Date gets set |

## Sequence Tag Convention

Each sequence adds a tag on entry and removes it on exit:
- `seq-precall-warmup`
- `seq-noshow-recovery`
- `seq-form-nobook`
- `seq-monthly-nurture`

## Email Formatting

All emails are plain text feel. The orchestrator wraps plain text in minimal HTML:
```html
<div style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
  {plain_text_with_line_breaks_converted_to_br}
</div>
```

No images, no graphics, no heavy HTML. All from Cade MacLean (cade@creeksidemarketingpros.com).
