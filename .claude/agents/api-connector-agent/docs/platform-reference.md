# Platform Reference: Common Endpoints and Notes

This file is Read on demand by `api-connector-agent` during Step 4 (translating the contractor's request to an API endpoint).

---

## Klaviyo

**Base URL:** `https://a.klaviyo.com/api`
**Auth type:** Custom header (`Authorization: Klaviyo-API-Key {key}`)
**Required headers:** `revision: 2025-04-15`, `Accept: application/vnd.api+json`

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| Subscriber list / all profiles | `/profiles` | GET | Returns paginated list. Add `?page[size]=100` for larger pulls. |
| Single profile by email | `/profiles?filter=equals(email,"[email]")` | GET | URL-encode the filter. |
| All lists | `/lists` | GET | Returns list IDs and names. |
| Profiles in a list | `/lists/[list_id]/profiles` | GET | Replace [list_id] with the Klaviyo list ID. |
| All segments | `/segments` | GET | |
| Profiles in a segment | `/segments/[segment_id]/profiles` | GET | |
| All campaigns | `/campaigns` | GET | Add `?filter=equals(messages.channel,'email')` to filter by channel. |
| Campaign metrics (opens, clicks) | `/campaigns/[campaign_id]/campaign-messages` | GET | Message-level stats. |
| All flows | `/flows` | GET | |
| Flow actions | `/flows/[flow_id]/flow-actions` | GET | |
| All templates | `/templates` | GET | |
| Metrics (event types) | `/metrics` | GET | Lists available event metrics. |
| Events for a profile | `/events?filter=equals(profile_id,"[id]")` | GET | |
| All tags | `/tags` | GET | |

### Pagination
Klaviyo uses cursor-based pagination. The response includes `links.next` with the URL for the next page. If the contractor asks for "all" records and there are multiple pages, fetch them sequentially and combine.

### Common Klaviyo Gotchas
- The `revision` header is MANDATORY. Without it, the API returns 400.
- List and segment endpoints return profile IDs, not full profile data. Follow up with `/profiles/[id]` if full profile data is needed.
- Campaign stats require fetching campaign messages, then metrics per message.

---

## Mailchimp

**Base URL:** `https://{dc}.api.mailchimp.com/3.0`
**Auth type:** Basic auth (any string as username, API key as password)
**The `{dc}` placeholder** is extracted from the API key -- the key ends in `-us21` (for example), where `us21` is the datacenter. The Edge Function handles this automatically.

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| All lists (audiences) | `/lists` | GET | Returns all Mailchimp audiences. |
| Subscribers in a list | `/lists/[list_id]/members` | GET | Add `?count=1000` for larger pulls. |
| Single subscriber by email | `/lists/[list_id]/members/[md5_of_email]` | GET | Email must be lowercase MD5 hash. |
| All campaigns | `/campaigns` | GET | |
| Campaign report (stats) | `/reports/[campaign_id]` | GET | Opens, clicks, bounces. |
| Tags for a subscriber | `/lists/[list_id]/members/[md5]/tags` | GET | |
| Automations | `/automations` | GET | |

### Common Mailchimp Gotchas
- List ID is NOT the same as the audience name. Use `GET /lists` first to find the ID.
- The subscriber lookup endpoint requires an MD5 hash of the lowercase email. The Edge Function does NOT pre-hash -- if the endpoint fails on subscriber lookup, confirm the correct format.
- Datacenter mismatch causes 301 redirect. If the Edge Function doesn't follow redirects, the call will fail. Ask Peterson if Mailchimp calls consistently fail.

---

## Shopify

**Base URL:** `https://{store}.myshopify.com/admin/api/2024-10`
**Auth type:** Custom header (`X-Shopify-Access-Token: {key}`)
**The `{store}` placeholder** = the store subdomain before `.myshopify.com`. Always ask the contractor if you don't know it.

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| All customers | `/customers.json` | GET | Add `?limit=250` for max page size. |
| Single customer by email | `/customers/search.json?query=email:[email]` | GET | |
| All orders | `/orders.json` | GET | Add `?status=any` for all statuses. |
| Open orders | `/orders.json?status=open` | GET | |
| All products | `/products.json` | GET | |
| Product inventory | `/inventory_levels.json` | GET | |
| All collections | `/collections.json` | GET | |

### Common Shopify Gotchas
- Shopify uses cursor-based pagination with a `Link` header. Look for `rel="next"` in the response headers.
- Customer `id` in Shopify is a number, not a UUID.

---

## GoHighLevel (GHL)

**Base URL:** `https://services.leadconnectorhq.com`
**Auth type:** Bearer (`Authorization: Bearer {key}`)
**Required headers:** `Version: 2021-07-28`

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| All contacts | `/contacts/` | GET | Add `?locationId=[loc_id]` if required. |
| Search contacts | `/contacts/?query=[search]` | GET | |
| Opportunities (pipeline) | `/opportunities/search` | GET | |
| Conversations | `/conversations/search` | GET | |
| Appointments | `/calendars/events` | GET | |

### Common GHL Gotchas
- The `Version` header is mandatory. Without it, requests fail or return incorrect formats.
- Many GHL endpoints require a `locationId`. If calls fail, the stored key likely needs a locationId configured. Check with Peterson.

---

## HubSpot

**Base URL:** `https://api.hubapi.com`
**Auth type:** Bearer (`Authorization: Bearer {key}`)

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| All contacts | `/crm/v3/objects/contacts` | GET | |
| Search contacts | `/crm/v3/objects/contacts/search` | POST | Body: `{"filterGroups": [...]}` |
| All companies | `/crm/v3/objects/companies` | GET | |
| All deals | `/crm/v3/objects/deals` | GET | |
| All email campaigns | `/marketing/v3/emails` | GET | |
| Email stats | `/marketing/v3/emails/[id]/statistics/histogram` | GET | |

---

## SendGrid

**Base URL:** `https://api.sendgrid.com/v3`
**Auth type:** Bearer (`Authorization: Bearer {key}`)

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| Contacts / all lists | `/marketing/lists` | GET | |
| All contacts | `/marketing/contacts` | GET | Returns count + sample. |
| Export all contacts | `/marketing/contacts/exports` | POST then GET | Async operation -- creates export then polls for download URL. |
| All campaigns | `/marketing/singlesends` | GET | |
| Email stats | `/stats` | GET | Add `?start_date=YYYY-MM-DD` |
| Suppressions (unsubscribes) | `/suppression/unsubscribes` | GET | |

### Common SendGrid Gotchas
- Full contact exports are async. The POST creates an export job; you must then poll `GET /marketing/contacts/exports/[id]` until `status` is `ready`, then download from the `urls` field.

---

## ActiveCampaign

**Base URL:** `https://{account}.api-us1.com/api/3`
**Auth type:** Custom header (`Api-Token: {key}`)
**The `{account}` placeholder** = account subdomain. Always ask the contractor: "What is your ActiveCampaign account name? It's the part before `.activehosted.com` when you log in."

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| All contacts | `/contacts` | GET | Add `?limit=100`. |
| Contact by email | `/contacts?email=[email]` | GET | |
| All lists | `/lists` | GET | |
| All campaigns | `/campaigns` | GET | |
| Campaign stats | `/campaigns/[id]/links` | GET | |
| Automations | `/automations` | GET | |

---

## OpenAI Ads

**Base URL:** `https://api.ads.openai.com/v1`
**Auth type:** Bearer (`Authorization: Bearer {key}`)
**Rate limits:** 600 req/min per endpoint, 1,200 req/min per account
**Writes allowed with confirmation.** Contractors may make write calls (create/update/pause campaigns), but ONLY after showing the contractor the exact change (endpoint, method, body) and getting an explicit "yes". Verify state with a GET before and after every mutation. Write endpoints follow the platform docs (`docs_url` in `platform_configs`) -- they are not enumerated here yet, so confirm the endpoint against the docs before calling. Never DELETE anything.

Keys are per ad account (OpenAI has no agency/MCC layer). Stored keys exist for: Fusion Dental (Alex Antipov Dental Corp. account), The Tooth Co, Chattanooga Skydiving.

### Common Endpoints

| What contractor asks for | Endpoint | Method | Notes |
|---|---|---|---|
| All campaigns | `/campaigns` | GET | Paginated: `?limit=100`, then pass `after=[last_id]` while `has_more` is true. |
| Single campaign | `/campaigns/[campaign_id]` | GET | |
| Daily campaign metrics | `/campaigns/[campaign_id]/insights` | GET | `?time_granularity=daily&limit=[days]` plus the `fields[]` params below. Rows are newest-first; `readable_time` is the date. |

### CRITICAL: the `fields[]` quirk

Insights return ONLY impressions unless you explicitly request metrics using array syntax:

```
fields[]=impressions&fields[]=clicks&fields[]=spend&fields[]=ctr&fields[]=cpc&fields[]=cpm&fields[]=readable_time
```

- Plain `fields=impressions,clicks` returns 400 (invalid_type).
- Do NOT request `conversions` -- it requires a separate `time_ranges` request mode that is not supported yet (returns 400 if requested via fields[]).
- Always include `readable_time` in fields[] or the date column disappears from the response.

### Prefer the database for historical data

Daily metrics are synced to Supabase every day at 13:48 UTC. For trend/historical questions, query these instead of the live API (via `contractor_query()`):

- `openai_ad_accounts` -- account registry (account_id, account_name, client_id)
- `openai_campaigns` -- campaign records (campaign_id, account_id, campaign_name, status)
- `openai_insights_daily` -- daily metrics per campaign (date, impressions, clicks, spend, ctr, cpc, cpm)

Use the live API only for current-state checks (e.g., "is campaign X active right now?").

---

## Asking the Contractor for Missing Info

When a template variable is needed ({store}, {account}, {dc}):

- **Shopify store**: "To pull Shopify data for [client], I need one quick piece of info: what is the store name? It's the part before `.myshopify.com` in their store URL."
- **ActiveCampaign account**: "What is [client]'s ActiveCampaign account name? It's usually visible in the URL when you're logged in, right before `.activehosted.com`."
- **Mailchimp datacenter**: This is in the API key itself (e.g., key ends in `-us21`). The Edge Function handles extraction -- you don't need to ask.
