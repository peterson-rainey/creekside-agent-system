# SKIP SCREEN — HydroGuard Water Protection (South Africa) / Meta tracking build

Date screened: 2026-09-04
Requested style: "strategic + diagnostic" written in lindsey_default
Disposition: **SKIP** — 4 stacked auto-DQs, each independently a documented skip
Status: NOT DRAFTED

## Job summary
New brand launching in South Africa. New Facebook Page. Wants Meta Pixel, CAPI, GTM,
domain verification, Lead conversion tracking on a website Risk Calculator, plus testing,
working alongside their WordPress/Elementor developer. Opens with a 3-hour milestone,
"expand if successful."

## DQs that fire

### 1. GEO — South Africa (auto-DQ, unambiguous)
Rule: auto-DQ outside US/CA/UK/AU, judged by where ads RUN not where HQ sits.
Ads run in South Africa. This is not the ambiguous "global markets" case that leaves
room to ask — the geo is stated outright.
DB check: 130 clients, 46 active, zero South Africa. Only substring hit was
"Chris Neal / Zamplo" (matched on 'za', inactive) — a false positive, not proof.

### 2. NO ADS IN SCOPE (auto-DQ)
Rule: no ads in scope = don't draft at all. 13 variants logged, 3 overrides.
Entire scope is tracking infrastructure: Pixel, CAPI, GTM, domain verification,
Lead event, testing. No campaign build, no media buying, no management.
The client keeps the ads. We would be the tracking subcontractor to their dev.

### 3. HOURLY / 3-HOUR MILESTONE
Rule: never bill hourly. ONE carve-out — a capped PAID TEST that GATES MANAGEMENT.
This fails the carve-out: the stated expansion is more tracking work, not management.
Nothing downstream converts to a % of spend.
Also fires: no pricing instrument for zero-spend milestones (pre-launch, no spend exists).

### 4. SPEND FLOOR UNCLEARABLE
Rule: auto-DQ under $5K/mo. Brand-new Page, pre-launch, spend is zero today and
unstated for later. Not "hidden and worth asking" — structurally absent.

## Proof position if it were drafted anyway
Queried case_studies for pixel / conversion api / CAPI / tracking / tag manager: **zero rows.**
Queried for South Africa: **zero rows.**
Confirms the existing memory that CAPI is part of a triple zero (music software +
WooCommerce + CAPI).

Honest tracking assets that DO exist (none are case studies, none are SA, none are
attachable client proof):
- Our own site: GTM-MWQVSPJ container, Meta Pixel 2083657478846396, GA4 G-REHLM40KCD.
  Consolidated 2026-08-14, including removing a duplicate second container on funnel pages.
- Fusion Dental: restricted-category event work — standard events allowed, custom events
  not (correction logged 2026-05-04). Real CAPI-adjacent judgment, but the account CHURNED
  7/22/26 and it is healthcare, not a consumer risk calculator.
- Sales methodology living doc carries "Tracking Validation as Hard Prerequisite" as a
  documented internal practice.

That is a mechanism story, not a results story. There is no number to cite.

## Style conflict (separate from the DQs)
Request asked for "strategic + diagnostic" written in lindsey_default. Lindsey has ONE
proposal style — lindsey_default. "Strategic" is a Samuel-only style. The two cannot be
combined; this needs resolving before any draft regardless of the screen outcome.

## If overridden
An override draft would have to concede, in the body: no South Africa experience, no
CAPI/GTM case study, no tracking results number of any kind. It would sell the
tracking-validation-before-spend mechanism and the duplicate-container catch on our own
site. It would also need a decision on the 3-hour hourly milestone, which no current
pricing instrument covers.
