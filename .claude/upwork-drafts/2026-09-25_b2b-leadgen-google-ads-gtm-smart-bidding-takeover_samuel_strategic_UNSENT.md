# B2B lead gen Google Ads + GTM takeover, Smart Bidding transition (Samuel, strategic) UNSENT
Profile: Samuel Rainey | Style: samuel_strategic | Date: 2026-09-25 (DB now() 2026-09-25 14:00 UTC) | No sign-off

## Job post (as pasted)
> We need a highly technical Google Ads and Google Tag Manager expert to take over and manage our B2B lead generation campaigns. The ideal candidate will ensure accurate conversion tracking, safely transition campaigns to smart bidding, and proactively optimize our monthly budget to improve lead quality and campaign performance.

## SCREENS
- Twin check: no hit in `.claude/upwork-drafts`, `drafts/`, `upwork-drafts/` on distinctive phrases; `upwork_jobs` has no row matching the description (checked live).
- Ads in scope: yes, Google Ads management. Not white-label, not a full-time seat, no required-items list, no screening questions, no CRO gate.
- Spend: UNSTATED, not foreclosed. Asked as a bracket in the close.
- Geo, payment verification, rate: unknown from a pasted post. Check the job page before sending.
- Platform test: Google only, so Samuel. Lindsey cannot sell Google.

## VERIFIED LIVE THIS SESSION
- Active Google accounts in `reporting_clients`: 12, so "about a dozen".
- Perfect Parking (acct 6775457442, active, operator Ade A.): `clients.target_audience` = commercial property managers and general contractors, price-sensitive leads excluded. Account is MIXED residential + commercial, so the body says "a big share of the buyers", never "B2B client". `Search - Construction Services` 2026-07-01..09-24: $18,484.93 / 1,054 clicks / **$17.54 CPC**. No CPL or lead-quality result cited.
- No bid-strategy history exists in our data (`google_campaigns` has no bidding column), so the body makes NO claim of a past Smart Bidding transition result. The transition section is method only.
- Google mechanics from verified memories: offline import window 90 days, 63 for enhanced conversions for leads; bid strategy change triggers learning; calls from ads attribute via Google forwarding numbers.

## ATTACHMENT (Queenie's call)
- Recommended: **ReferPro_B2B_SaaS_Case_Study.pdf** (Drive `1DSteRZ2ngRTa5Uw_UaU5PICa5dS4Cwso`). Only B2B Google+Meta artifact, Samuel byline. KNOWN DEFECT: platform icons swapped on page 2 (Meta logo beside the Google screenshot). Body does not quote its numbers. If you skip it, delete the last sentence of the "Where our work sits" section.
- Not attached: Winterbotham (consumer legal CTA visible on a B2B bid, and its thesis is segmentation, which isn't this post's argument).

## QC (2026-09-25)
- qc-reviewer-agent: FAIL on v1 (technical claims, Perfect Parking figure, no-transition-result discipline all PASS). Fixed in v2: (1) paving paragraph rewritten, v1 was near-verbatim to the 9/22 B2B draft; (2) cut from ~530 to ~400 words using QC's tightened P1-P3 plus a P4 trim.

## PROPOSAL

Smart Bidding on a B2B account learns from whatever the conversion column counts, and in most Tag Manager setups that counts every form submission: the buyer, the student, the vendor pitching you, the bot. Set Target CPA on top of that and Google gets efficient at finding more of the cheapest ones. Tracking first, a lead quality signal second, the bidding switch last.

**What the tracking audit checks**

Inside Tag Manager: which tags fire on which triggers, and whether the form trigger fires on a real submission or any click of the button, failed validation included. Inside Google Ads: which conversion actions are set to primary. A common failure is two primaries counting the same lead, often an Ads tag plus an imported GA4 key event, doubling what Smart Bidding chases. Calls get checked separately, since Google only attributes ad calls through its forwarding numbers.

**Getting lead quality into the account**

If your CRM marks which leads became real opportunities, those can feed back to Google as offline conversions, so bidding chases qualified leads instead of form fills. The same data decides where budget goes: campaigns get judged on qualified leads, not cost per form. One limit to plan around: Google won't accept an offline conversion uploaded more than 90 days after the click, 63 with enhanced conversions for leads. Deals that run longer need an earlier signal, like a qualified meeting booked.

**How the switch happens without breaking anything**

As a Google Ads experiment, the current campaign split against a Smart Bidding version rather than a flip of the live one. Starting targets come from what the account has actually paid per lead, and nothing else changes during learning. If volume is too thin for Target CPA, Maximize Conversions with a budget cap comes first.

**Where our work sits**

Our team currently runs close to a dozen Google Ads accounts. One useful comparison is a paving contractor, where much of the buyer base is property managers and general contractors: over the past three months its main Search campaign has averaged $17.54 a click. At that cost, an unqualified click is expensive enough that filtering who gets through matters as much as the bid strategy itself. The attached case study covers a B2B SaaS account run on Google and Meta together.

**Three questions before anything moves**

Roughly what does the account spend a month: under $5,000, $5,000 to $15,000, or more?

How many conversions does it record in a typical month, and what bid strategy runs today?

Does your sales team mark which leads turned into real opportunities, and where does that live?

With those I can tell you whether Smart Bidding is a few weeks out or the tracking needs work first.
