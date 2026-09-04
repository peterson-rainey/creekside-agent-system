# Upwork Proposal - Storage facility, Google Ads launch + management, GTM tracking diagnosis
Profile: Samuel/Peterson | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-05

## SCREENS RUN
- Ads in scope: YES. Google Ads launch + ongoing management is the job. Tracking is the lead ask, not a
  replacement for ads. Not white-label, not coaching, not a full-time seat, not profit-share,
  not detection-evasion, no worker-location requirement, no landing-page/CRO ownership.
- Geo: NOT STATED. Storage is inherently local but no city or country given. Asked in the close.
- Spend: NOT STATED. Below the $5K/mo floor this is a skip, so the budget range is the blocking question.
  Asked as a relative range in the close. Do not send a fee until it is answered.
- Hourly: not requested. No pricing quoted at all, since a % of spend cannot be computed with no spend.
- Required items: one embedded screen, "respond to the specific issue." Satisfied by the opening, which
  answers the phantom-conversion problem directly rather than announcing that the post was read.
- Duplicate bid: no prior storage draft in any drafts folder, no matching upwork_leads row.

## VERIFIED LIVE THIS SESSION (contractor_query)
- **SELF-STORAGE = HARD ZERO.** `clients` has one row, Airport Self Storage (c16a2193), status inactive.
  Both `reporting_clients` rows are churned, $150/mo budget, $0 revenue, `ad_account_id` NULL. Zero rows in
  `google_ad_accounts`, zero campaigns, zero `google_insights_daily`. Never launched. Textbook never-launched
  trap. NOT cited as proof anywhere in the body. Vertical gap disclosed outright instead.
- **Aura Displays**, one account, branded vs unbranded side by side, verified to 2026-08-31:
  - `CM - Branded - Search - 11/1` (from 2025-11-02): $25,496.26 / 72,466 clicks / **$0.35 CPC** /
    1,508.5 conv / **$16.90 CPA**
  - `CM - Search - Triple Screen - UNBRANDED` (from 2025-11-14): $27,183.02 / 21,498 clicks / **$1.26 CPC** /
    260.8 conv / **$104.25 CPA**
  - Matches the 2026-09-04 correction exactly. Vertical named as ecommerce in the body, per that ruling.
- **Perfect Parking**, account 6775457442, through 2026-09-03. `Search - Construction Services`: ENABLED,
  $39,064.73 / 199.3 conv = **$196 CPL**, 2,249 clicks = **8.86% click-to-lead**.
- **Green Shield Pest Solutions**, `case_studies`: Google Ads, **79 leads @ $92.60**, CPL down 19%.

## DELIBERATELY OUT
- Airport Self Storage. An inactive row with no spend is not proof and naming it invites a question we lose.
- Perfect Parking's $127 CPL and "1 to 3 leads/day" headline. Both fail live verification against the $196.
- No pricing. Spend is unstated, so any % of spend or minimum would be quoted into a vacuum.
- No attachments. Vertical is a zero and no storage artifact exists. Green Shield and Perfect Parking PDFs
  would both need a home-services framing this post does not have, and the Perfect Parking PDF headlines
  the $127 that contradicts the $196 in the body.
- No certifications, no Google Partner claim, none exist.
- No links, no calendar link, no contact info. No em dashes. Unsigned per the 2026-09-04 ruling.
- Recurring delivery attributed to the team rather than first person, per the principals rule.

## OPEN, BLOCKING SEND
- Monthly ad budget. Under $5K/mo this becomes a skip regardless of how good the tracking diagnosis is.
- Single location vs portfolio. Changes campaign structure and the geo build entirely.

---

Form submits and phone calls firing with no leads behind them is almost never a traffic problem at a storage facility. It is usually the measurement counting things that were never rentals.

Start with the calls. A storage office phone is mostly existing tenants asking about gate codes, autopay, hours, or notice to move out. If the call conversion has no minimum duration on it, every one of those counts as a lead, and so does the same person tapping the number three times on mobile.

Then the forms. The two usual causes are a thank-you page trigger that fires on a page view anyone can reach or reload, and a submit-button click trigger that fires before validation, so abandoned and failed attempts get counted. If the conversion action is also set to count Every rather than One, a single inquiry reports as four. Containers built in a hurry tend to carry a GTM tag and a hardcoded gtag on the same page, or a GA4 event imported into Google Ads next to a native tag, which doubles everything again.

Worth checking one more thing before any of it: how much of the spend is going to people searching the facility by name. Brand clicks are cheap and convert beautifully, so they can carry an account's entire conversion number while producing no new tenants. In one account we split branded from unbranded and branded ran $0.35 a click at $16.90 per conversion against $1.26 and $104.25 unbranded. That one is ecommerce, but the distortion is the same shape.

The order would be to rebuild tracking against the real money event, which for storage is a completed move-in or reservation rather than a form, take two weeks of clean numbers, then build campaigns on top of that. Launching first and fixing measurement later just buys expensive data nobody can read.

Our book is local lead generation on Google: pest control at 79 leads and $92.60 each with cost per lead down 19%, and a paving contractor currently running $196 a lead at an 8.86% click-to-lead rate. No self-storage client, so unit mix and local click costs get measured rather than assumed.

What monthly ad budget range are you working with, and is this one location or several?
