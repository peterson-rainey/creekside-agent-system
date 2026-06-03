# Dental Client Onboarding Checklist -- Creekside Marketing

**Purpose:** Step-by-step process for onboarding a new dental practice client AFTER they sign a retainer agreement with Creekside Marketing.

**Owner:** Cyndi (Cyndelsa Chicano) executes all onboarding steps. Peterson/Cade provide strategic oversight.

**Critical Gate:** DO NOT assign contractors or start any work until:
- Contract is signed (NEVER launch ads without a signed contract)
- Onboarding fee is paid (Square invoice)
- Payment method confirmed

---

## PHASE 1: WEEK 1 (Setup and Audit -- NO CAMPAIGN CHANGES)

The first 7-14 days are dedicated to diagnosis, not execution. No existing campaigns are touched. No new campaigns are launched. This is by design: "In your first two weeks we diagnose, in week 3 we prescribe, in week 4 onward we execute."

---

### Day 1: Administrative Setup

**Trigger:** Lead moves to "Won" status in ClickUp Sales Board. Peterson or Cade fills out the ClickUp Intake Form (forms.clickup.com/9017100244/f/8cqc1ym-45637/KJAH95RBXZ9F66RSWB) same day.

- [ ] **Send welcome/onboarding email** via Gmail template (Cyndi sends). Email outlines four steps:
  1. Accept private Google Chat Space invite
  2. Access shared Google Drive folder (onboarding document, pre-launch checklist, asset upload space)
  3. Complete onboarding documentation before campaign building begins
  4. Schedule kickoff call
- [ ] **Send contract for signing** (if not already signed during sales process)
- [ ] **Create Google Chat Space** for client communication (mark RED -- new client color code)
- [ ] **Create Google Drive folder** under Current Clients with the practice name:
  - "(Practice Name) Services, Passwords, Contact Info" doc
  - "(Practice Name) Additional Info" doc
  - Shared media folder (for client to upload assets; for us to deliver assets)
  - Facebook ads tracking spreadsheet (for Meta clients -- copy from master template)
- [ ] **Create ClickUp folder** for the client (rename with business name, mark RED for onboarding)
- [ ] **Set up billing in Square:**
  - Send first invoice: onboarding fee + first month management fee + ad deposit
  - Line items: "Google Ads Management -- [Month]", "Meta Ads Management -- [Month]", "Onboarding Fee" (one-time)
  - Set up recurring monthly invoice
  - Verify no duplicate invoice exists before sending
  - Pricing reference: pull current pricing from Google Drive Pricing folder only (never hardcode)
- [ ] **Create client record in Creekside database** (spawn client-onboarding-agent or run manually)
- [ ] **Send onboarding sheet** (5-tab Google Spreadsheet) to client to fill out:
  1. Google Info Form -- Google Ads ID, Google Business Profile, Search Console, Merchant Center access
  2. Meta Info Form -- Partner ID share (877081733504917), Page/Ad Account/Pixel/Instagram access
  3. General Info Part 1 -- business basics, services, unit economics (LTV/CAC/margin), goals, target audience, competition, lead quality, billing
  4. General Info Part 2 -- customer personas, differentiators, competitors, common objections, sales process
  5. Conversion Tracking -- project stakeholders, website/CMS, forms/lead capture, CRM, consent/privacy, existing tracking

---

### Day 1-2: Account Access Collection

Dental practices use specific systems. Collect access to ALL of the following:

**Ad Platform Access:**
- [ ] **Meta Business Manager** -- get admin access via Partner ID (877081733504917) OR create new ad account under Creekside's Business Manager
- [ ] **Google Ads** -- get admin access to existing account, OR create new account; input payment method (client does this)
- [ ] **Google Analytics / GA4** -- get at least Viewer access; connect to Google Ads if not already linked
- [ ] **Google My Business / Business Profile** -- get Manager or Owner access for both locations (if multi-location)

**Dental Practice Systems:**
- [ ] **Practice Management Software (PMS)** -- determine which system they use:
  - Dentrix (Patterson) -- most common
  - Open Dental -- open source, growing
  - Carestack -- cloud-based, newer practices
  - Eaglesoft (Patterson)
  - Curve Dental
  - Dolphin (ortho-specific)
  - Other: _______________
- [ ] **CRM / Patient Communication Platform** -- identify what they use for lead follow-up:
  - GoHighLevel (GHL)
  - RevenueWell
  - Weave
  - Birdeye
  - Podium
  - PatientPop
  - Other: _______________
- [ ] **Website access** -- for landing page deployment, pixel/tag installation, or coordination with their web developer
  - Platform (WordPress, Wix, Squarespace, custom, etc.)
  - Login credentials or developer contact info
  - Ability to create/edit landing pages
  - Ability to install tracking scripts (GTM, Meta Pixel, Google Ads tag)
- [ ] **Call tracking access** -- do they already have CallRail, WhatConverts, or similar?
  - If yes: get admin access
  - If no: plan to set up CallRail (dynamic number insertion + GCLID/UTM passthrough)
- [ ] **Existing patient data for audience building:**
  - Patient email list for exclusion audiences (hashed)
  - Top 100 patients list for lookalike audiences (hashed)

**Access Sharing Instructions for the Client:**
- Google Ads: share admin access to the Creekside team email or contractor email
- Meta: use Partner ID 877081733504917 to share Business Manager access
- GA4: add as user with at minimum Viewer role
- GMB: add as Manager
- After contractor is assigned: add contractor email to Google Ads manager account and/or Meta Business Manager

---

### Day 2-5: Audit Period (NO CHANGES TO EXISTING CAMPAIGNS)

This is a hard rule. The operator runs audits. No campaign settings are changed. No new campaigns are launched. All findings are documented for the strategy presentation.

**Meta Ads Audit (if existing campaigns):**
- [ ] Review account structure (campaigns, ad sets, audiences)
- [ ] Review current creative assets and ad copy performance
- [ ] Check audience overlap and audience fatigue
- [ ] Review pixel health (Events Manager -- is the pixel firing correctly?)
- [ ] Evaluate current CPL, CPA, and lead quality
- [ ] Check for wasted spend (broad audiences, irrelevant placements, poor creative)
- [ ] Review retargeting setup (or lack thereof)
- [ ] Check UTM tagging on all ads (or note missing tags)
- [ ] Document all findings in written audit report

**Google Ads Audit (if existing campaigns):**
- [ ] Bidding strategy -- aligned with lead generation goals? (Maximize Conversions vs Target CPA vs Target ROAS)
- [ ] Keyword strategy -- match types, negative keywords, search term quality
- [ ] Campaign structure -- are ad groups targeted by service type? (implants vs general vs cosmetic)
- [ ] Ad copy -- Dynamic Keyword Insertion? Strong CTAs? Location insertion?
- [ ] Ad extensions/assets -- sitelinks, callouts, structured snippets, call extensions
- [ ] Landing page experience -- do ads point to relevant pages?
- [ ] Location targeting -- "presence" only (NOT "presence or interest" -- wastes budget)
- [ ] Conversion tracking -- what's firing? What's missing?
- [ ] Geographic performance -- where are leads actually coming from?
- [ ] Document all findings in written audit report

**Website and Landing Page Audit:**
- [ ] Evaluate current website for conversion readiness
- [ ] Check page load speed (Core Web Vitals)
- [ ] Check mobile responsiveness
- [ ] Identify if dedicated landing pages are needed (separate from main website)
- [ ] Check for existing forms and their conversion tracking
- [ ] Note: implant traffic and general dentistry traffic MUST hit separate landing pages

**Conversion Tracking Audit:**
- [ ] What tracking is currently installed? (Meta Pixel, Google Ads tag, GA4, GTM)
- [ ] What conversion events are currently firing?
- [ ] Are form submissions being tracked?
- [ ] Are phone calls being tracked? (CallRail, dynamic number insertion)
- [ ] Is there a thank-you page with /thank-you URL for conversion tracking?
- [ ] Are leads flowing into the CRM with source attribution?

**CRM and Lead Flow Review:**
- [ ] How do leads currently enter the system? (form submission, phone call, chat widget, walk-in)
- [ ] Who follows up on leads? What is the current response time?
- [ ] What is the handoff process from lead to appointment?
- [ ] What is the average time from lead to consultation booking?
- [ ] Is there an automated follow-up sequence? Or is it manual?
- [ ] What is the current no-show rate for consultations?

**Baseline Metrics Documentation:**

Capture these numbers BEFORE Creekside touches anything:

| Metric | Current Value | Source |
|--------|--------------|--------|
| Monthly new patient consultations | | |
| Case acceptance rate | | |
| Average case value (by service line) | | |
| Current cost per lead (CPL) | | |
| Current cost per consultation | | |
| Current monthly ad spend (Meta) | | |
| Current monthly ad spend (Google) | | |
| Lead-to-consultation conversion rate | | |
| Phone call volume from ads | | |
| Website form submissions per month | | |
| Current ROAS / ROI | | |

---

### Day 5-7: Strategy Development

- [ ] Build campaign strategy based on audit findings
- [ ] **Define services to advertise** (prioritized by profitability and volume potential):
  - Dental implants -- full arch (highest case value, $20K-$50K+)
  - Dental implants -- single tooth ($1,800-$4,000)
  - Cosmetic dentistry -- veneers, smile makeovers ($5K-$30K)
  - General dentistry -- new patient acquisition (free exam/cleaning offers)
  - Orthodontics -- Invisalign, clear aligners
  - Emergency dental
  - Other specialty: _______________
- [ ] **Define target audiences:**
  - Geographic radius (typically 10-25 miles depending on service)
  - Age demographics by service (50-75 for full-arch implants, 35-65 for single tooth, broader for general)
  - Interest-based targeting (denture wearers for implant campaigns, etc.)
  - Income/demographic overlays if applicable
- [ ] **Define offer structure** (what offer to lead with per service line):
  - Implants: percentage off, dollar amount off, "starting at" price
  - General dentistry: free exam, discounted cleaning + exam
  - Cosmetic: free smile consultation, before/after transformation focus
  - Financing angle: CareCredit, Alphaeon, Cherry, in-house financing
- [ ] **Plan campaign structure:**
  - Separate campaigns per service line (implants vs general vs cosmetic)
  - Separate ad sets per audience type (cold, retargeting, lookalike)
  - Separate ad sets for multi-location practices (by location)
  - Separate ad sets for language if applicable (English, Spanish, etc.)
  - Instant Forms vs Click-to-Landing-Page (or both -- run both at launch, not phased)
- [ ] **Plan UTM tagging structure:**
  - utm_source: facebook / instagram / google
  - utm_medium: paid_social / cpc
  - utm_campaign: {practice}_{service}_{offer}_{audience}_{language}
  - utm_content: ad-level identifier
  - utm_location: office location identifier (if multi-location)
  - Hidden fields on lead forms for Salesforce/CRM attribution
- [ ] **Plan conversion tracking setup** (create ClickUp task for Jordan Tryon):
  - Meta Pixel installation/verification
  - Conversions API (CAPI) setup if applicable
  - Google Ads conversion tracking
  - CallRail setup (dynamic number insertion + GCLID passthrough)
  - GA4 event tracking
  - Form submission tracking
  - Thank-you page conversion events
- [ ] **Present audit findings and strategy to client on Week 1 call** (30-60 min):
  - Walk through what was found
  - Present recommendations in priority order
  - Explain the "why" behind each recommendation
  - Get client buy-in before any execution begins

---

## PHASE 2: WEEK 2 (Build -- After Client Approves Strategy)

---

### Conversion Tracking Setup (Jordan Tryon)

- [ ] **Create ClickUp task** for Jordan Tryon using "Conversion Tracking Setup" template
- [ ] Cyndi screenshots the onboarding sheet Conversion Tracking tab AND types all details into ClickUp task description
- [ ] Set due date based on launch timeline
- [ ] **Install/verify Meta Pixel** on all landing pages and the main website
- [ ] **Set up Conversions API (CAPI)** if applicable (server-side tracking for iOS 14+ accuracy)
- [ ] **Install/verify Google Ads conversion tracking** tags via GTM
- [ ] **Set up CallRail:**
  - Create tracking numbers (one per campaign/ad group minimum)
  - Configure dynamic number insertion (DNI) on website and landing pages
  - Set up GCLID passthrough for Google Ads attribution
  - Set up UTM passthrough for Meta attribution
  - Define qualifying call duration (typically 60+ seconds for dental)
- [ ] **Define conversion events:**
  - Lead form submission (website form)
  - Instant Form submission (Meta)
  - Phone call (60+ seconds)
  - Consultation booked (if CRM integration allows)
  - Thank-you page visit (URL must contain /thank-you)
- [ ] **Test ALL conversion events** before any campaign launches:
  - Submit test form, confirm conversion fires in Meta Events Manager
  - Submit test form, confirm conversion fires in Google Ads
  - Make test call, confirm CallRail captures it with correct attribution
  - Verify events appear in GA4 real-time reports

---

### Creative Production

**Landing Pages:**
- [ ] Build dedicated landing page(s) for each service line being advertised
  - Implant traffic and general dentistry traffic MUST hit separate landing pages
  - Spanish leads need a separate landing page (if applicable)
  - Each location may need its own landing page variant
- [ ] Landing page structure (above the fold):
  1. Hero headline: outcome-focused, specific, matched to the ad ("Transform Your Smile with Dental Implants" NOT "Premium Dental Care")
  2. Sub-headline: clarifies who this is for and what they get
  3. Hero image: before/after transformation, smiling patient, or practice interior
  4. Single CTA button: "Book Your Free Consultation" (one action only)
  5. Social proof: testimonials, Google reviews, years in business, cases completed
- [ ] Include location in headline for local service ads
- [ ] Install GTM code on BOTH the landing page AND the thank-you page
- [ ] Thank-you page URL must include /thank-you for conversion tracking
- [ ] Mobile-optimize all landing pages (majority of dental ad traffic is mobile)
- [ ] Set up lead form(s) on landing pages:
  - Minimum fields: name, email, phone
  - Optional qualification: service interested in, insurance Y/N, preferred location (multi-office)
- [ ] Set up Instant Forms (Meta lead forms) if running lead gen campaigns alongside click campaigns

**Ad Creative and Copy:**
- [ ] **Write ad copy (3-4 variants minimum per campaign):**
  - Tone: professional but approachable, NOT clinical
  - Messaging angle: transformation and social confidence
  - Use specific numbers (prices, discounts, case counts, years of experience)
  - Avoid generic "premium dental care" -- too broad
  - Include the offer clearly in the copy
  - CTA: "Book your consultation" or "See how we can help"
- [ ] **Produce/source creative assets:**
  - Before/after photos (MUST have signed patient consent for each)
  - Practice interior photos (modern, clean, welcoming)
  - Team photos (build trust and familiarity)
  - Video testimonials from patients (highest-performing format for dental)
  - Static graphics with offer details
  - Carousel ads showing transformation journey
- [ ] **Get client approval on ALL creative and copy before publishing**
- [ ] **Upload approved creative to the shared Google Drive folder**

---

### Campaign Build

**Meta Ads:**
- [ ] Build campaign structure per strategy (separate campaigns by service line)
- [ ] Build ad sets per audience type:
  - Cold prospecting (interest + demographic targeting)
  - Denture-wearer audience (denture adhesive, Polident interests -- for implant campaigns)
  - Retargeting (site visitors, video viewers 50%+, page engagement, IG profile visitors)
  - Lookalike audiences (based on hashed patient lists)
- [ ] Set up UTM parameters on ALL ads (including hidden fields on Instant Forms)
- [ ] Upload customer exclusion lists (existing patients -- hashed emails/phones)
- [ ] Apply USP/messaging rules per service line:
  - Full arch implants: all USPs allowed (experience, authority, warranty if applicable)
  - Single tooth implants: experience and authority only (no warranty messaging unless applicable)
  - General dentistry: experience only (no implant-specific claims)
- [ ] Set budgets and bid strategies per campaign
- [ ] Set up Facebook tracking spreadsheet (copy master template, fill in monthly budget, move to client folder)
- [ ] QA: verify all ads, targeting, tracking, and UTMs before launch
- [ ] Keep all ads PAUSED until review and client approval

**Google Ads (if applicable):**
- [ ] Build campaign structure (Search, Performance Max, or both)
- [ ] Build ad groups targeted by service type
- [ ] Write responsive search ads (15 headlines, 4 descriptions minimum)
- [ ] Set up keyword lists per ad group:
  - Implant keywords: "dental implants near me", "full arch dental implants", "all on 4", etc.
  - General keywords: "dentist near me", "new patient dental exam", etc.
  - Cosmetic keywords: "veneers cost", "smile makeover", etc.
- [ ] Add negative keywords (competing practice names, DIY, unrelated dental terms)
- [ ] Set up ad extensions: sitelinks, callouts, structured snippets, call extensions, location extensions
- [ ] Set location targeting to "presence" only (NOT "presence or interest")
- [ ] Set geographic radius per office location
- [ ] Connect Google Ads to GA4
- [ ] QA: verify all ads, targeting, tracking, and landing page URLs before launch
- [ ] Keep all ads PAUSED until review and client approval

---

## PHASE 3: WEEKS 3-4 (Launch and Early Optimization)

---

### Launch Sequence

- [ ] **Pre-launch review call with client** -- walk through everything that was built, get final sign-off
- [ ] **Go live on Meta** -- unpause campaigns
- [ ] **Go live on Google** (if applicable) -- unpause campaigns
- [ ] **Monitor daily for the first 7 days:**
  - Check for ad disapprovals (dental ads frequently get flagged for before/after imagery or health claims)
  - Check budget pacing (spending too fast or too slow?)
  - Verify tracking is firing correctly in production (not just test environment)
  - Check lead quality (are form submissions coming through? Are calls being recorded?)
  - Monitor for audience overlap issues
- [ ] **Send client Day 1 update** -- "Campaigns are live. Here's what we're seeing."
- [ ] **Send client Day 3 update** -- initial performance snapshot
- [ ] **Send client Week 1 report** -- first full week performance summary

---

### Early Optimization (Weeks 3-4)

- [ ] **Review lead quality with client after first 10-15 leads:**
  - Are leads booking consultations?
  - Are they the right demographics?
  - Are they asking about the right services?
  - What is the show rate for booked consultations?
- [ ] **Listen to call recordings** (CallRail) for lead quality assessment:
  - Are calls being answered promptly?
  - Is the front desk effectively converting calls to appointments?
  - Are there common objections or questions the ads should address?
  - Flag any call handling issues to Peterson for client conversation
- [ ] **Adjust targeting if needed** based on early data:
  - Geographic -- tighten or expand radius
  - Demographic -- adjust age ranges
  - Interest -- refine or add new interest targets
  - Negative audiences -- exclude irrelevant segments
- [ ] **Kill underperforming ads** after 1,000 impressions (or $50 spend with zero leads)
- [ ] **Scale winning ads** -- increase budget on top-performing ad sets
- [ ] **A/B test new creative variants** against winners
- [ ] **Review CRM/lead flow** -- are leads making it from ad to CRM to consultation booking without dropping off?
- [ ] **Document baseline vs. post-launch comparison** for Month 1 report

---

## PHASE 4: ONGOING (Month 2+)

---

### Weekly Tasks

- [ ] Review campaign performance across all platforms
- [ ] Check budget pacing and adjust bids/budgets
- [ ] Monitor ad disapprovals (dental industry gets frequent reviews)
- [ ] Creative refresh planning (new creative every 4-6 weeks)
- [ ] Lead quality spot-check with client or treatment coordinator
- [ ] Send weekly performance update (Loom video or Google Chat message)

### Bi-Weekly Tasks

- [ ] Send comprehensive performance report to client
  - Include: spend, leads, CPL, CPA, conversion rates, top-performing ads
  - Google Ads clients: auto-connected via Looker Studio
  - Meta Ads clients: manual report from tracking spreadsheet
- [ ] Strategy call with client (30 minutes)

### Monthly Tasks

- [ ] Full month performance report with data analysis and recommendations
- [ ] Creative refresh: produce and launch new ad creative
- [ ] Strategy review and optimization (budget reallocation, audience refinement)
- [ ] Invoice and billing (Square -- verify no duplicate before sending)
- [ ] Reconcile ad spend against invoiced amounts

### Quarterly Tasks

- [ ] Full account audit (repeat the audit checklist from Phase 1)
- [ ] Strategy reset if performance has plateaued
- [ ] Competitive landscape review (what are other dental practices in the area running?)
- [ ] Upsell conversation:
  - Additional service lines to advertise
  - Budget increase based on performance
  - Additional platforms (add Google if only on Meta, or vice versa)
  - SEO, web design, or other services
- [ ] 90-day review call with recommendations for next quarter

---

## REQUIRED CLIENT DELIVERABLES

Everything the dental practice needs to provide to Creekside before campaigns can launch.

### Business Information
- [ ] Business name (legal name and DBA/practice name)
- [ ] Office address(es) -- all locations being advertised
- [ ] Main phone number(s) -- one per location
- [ ] Business email address
- [ ] Website URL
- [ ] Logo files (high resolution -- PNG, SVG, or AI preferred)
- [ ] Brand colors and fonts (or brand guidelines document if they have one)
- [ ] Office hours and scheduling availability
- [ ] Insurance plans accepted (list)
- [ ] Financing options offered (CareCredit, Alphaeon, Cherry, Sunbit, Lending Club, in-house, etc.)

### Photos and Video Assets
- [ ] Before/after photos -- minimum 5 sets per service line being advertised
  - MUST have signed patient consent/HIPAA release for each
  - High resolution (minimum 1080x1080 for social media)
  - Good lighting, consistent angles
- [ ] Practice interior photos (waiting room, operatories, technology/equipment)
- [ ] Team photos (doctors, hygienists, front desk -- builds trust and familiarity)
- [ ] Doctor headshot(s) -- professional quality
- [ ] Video testimonials from existing patients (if available -- highest-performing ad format)
- [ ] Any existing video content (practice tours, procedure explanations, patient stories)

### Services and Pricing
- [ ] Full list of services offered with pricing for each:
  - Dental implants (single tooth, full arch/All-on-4, implant-supported dentures)
  - Cosmetic (veneers, bonding, teeth whitening, smile makeovers)
  - General (exams, cleanings, fillings, crowns, bridges)
  - Orthodontics (Invisalign, braces)
  - Emergency dental services
  - Sedation/comfort options
- [ ] Any current promotions or offers they want to run
- [ ] Any restrictions on advertising specific prices (some states regulate dental price advertising)

### Patient Data (for Audience Building)
- [ ] Current patient email list -- for exclusion audiences (we exclude existing patients from new patient ads)
  - Exported as CSV with hashed emails
  - OR plain text to be hashed by Creekside before upload
- [ ] Top 100 best patients list -- for lookalike audiences
  - Hashed emails and/or phone numbers
  - Ideally: highest-value patients by case acceptance and revenue
- [ ] Any existing customer lists from previous ad campaigns

### Team and Operations
- [ ] Treatment coordinator name and direct contact (email and phone)
  - This is the person who follows up with leads and books consultations
- [ ] Who answers the phone / responds to form submissions?
  - Name(s) and role(s)
  - Current response time (how quickly do they call back leads?)
  - Response time SLA commitment (Creekside standard: leads contacted within 5 minutes)
- [ ] Who makes scheduling decisions? (treatment coordinator, office manager, doctor directly?)
- [ ] Current patient acquisition process: how does a lead go from first contact to sitting in the chair?

### Platform Access (detailed in Day 1-2 section above)
- [ ] Meta Business Manager -- admin access granted via Partner ID
- [ ] Google Ads -- admin access shared OR new account created
- [ ] Google Analytics / GA4 -- viewer access minimum
- [ ] Google My Business -- manager access
- [ ] Website admin or developer contact info
- [ ] CRM / patient communication platform login
- [ ] Call tracking platform login (if existing)

---

## INTERNAL CREEKSIDE TEAM ASSIGNMENTS

### Contractor Assignment by Platform

| Platform | Assigned Contractors |
|----------|---------------------|
| Google Ads | Ahmed Imran, Ade Aderibigbe, Scott Caldwell |
| Meta Ads | Scott Caldwell, Lindsey Bouffard, Trent Lucas, Adam Guzman |
| Conversion Tracking | Jordan Tryon (JTryon Consulting) |

- Ade typically sets up Google Ads accounts, then hands off to Scott with a briefing
- Scott must schedule an intro call with new clients he manages
- For sub-minimum tier clients (below $3K-$5K ad spend): Scott handles everything independently (75/25 split)

### Role Responsibilities During Onboarding

| Role | Person | Responsibilities |
|------|--------|-----------------|
| CEO / Account Lead | Peterson | Sales close, kickoff call, strategy approval, client relationship |
| CMO / Meta Strategy | Cade | Meta strategy oversight, hiring, creative direction |
| Ops Coordinator | Cyndi | All onboarding execution: emails, ClickUp, Drive, invoicing, contractor coordination |
| EA (Cade) | Melvin | Invoicing support, reconciliation, SOPs |
| Conversion Tracking | Jordan Tryon | Pixel setup, GTM, GA4, CallRail, CRM integrations |
| Platform Operator | Assigned contractor | Audit, campaign build, optimization, reporting |

---

## DENTAL-SPECIFIC NOTES

### Messaging Rules for Dental Ads
- **Tone:** Professional but approachable. NOT clinical.
- **Angle:** Transformation and social confidence. Show the life change, not the procedure.
- **Proven patterns:** Before/after stories, transformation-focused headlines
- **Use specific numbers:** "$1,850 single implant", "20% off full arch", "18+ years experience"
- **Avoid:** Generic "premium dental care" -- too broad, says nothing
- **CTA:** "Book your consultation" or "See how we can help" (not "Contact Us")
- **Before/after ads:** Frequently flagged by Meta for health claims. Have backup creative ready.

### Common Dental Ad Offers That Work
- Free complete exam (normally $XX) -- general dentistry new patient acquisition
- Percentage off specific procedures -- implants, veneers
- Dollar amount off -- "$X,000 off full arch when you trade in your dentures"
- "Starting at" pricing -- "$1,850 single implant starting at"
- Free consultation -- cosmetic, implant
- Financing highlight -- "As low as $XX/month with CareCredit"

### Dental CRM/PMS Integration Considerations
- Most dental PMS systems (Dentrix, Open Dental, Eaglesoft) do NOT have native ad platform integrations
- GoHighLevel (GHL) is the most common CRM layer between ads and the PMS
- CallRail integrates with most CRMs and can push call data to GHL, HubSpot, etc.
- Lead flow typically: Ad > Landing Page/Form > CRM (GHL) > PMS (Dentrix/Open Dental) > Appointment
- The treatment coordinator is usually the critical link -- if they don't follow up quickly, leads die

### Compliance and Legal
- HIPAA applies to all patient data, photos, and testimonials
- Before/after photos require signed patient consent (model release + HIPAA authorization)
- Some states restrict dental price advertising -- verify local regulations
- Meta frequently reviews dental ads for health claims -- avoid guarantee language
- Google Ads healthcare category may require certification depending on ad content

---

## 90-DAY CLIENT PLAN (delivered to client at kickoff)

### Month 1 -- Foundation and Learning
- Account audit and restructure (if taking over existing campaigns)
- Pixel and conversion tracking setup and verification
- Campaign creation: 1-2 core campaigns per platform
- Baseline performance benchmarks established
- Onboarding call to review strategy and confirm goals
- Weekly optimization begins

### Month 2 -- Optimization
- A/B testing ad copy and creative
- Keyword expansion or pruning based on data
- Audience refinement
- Budget reallocation based on early performance signals
- Mid-point strategy call
- Landing page recommendations delivered

### Month 3 -- Performance and Scale
- Campaign scaling on winning ad sets/keywords
- Lookalike audience building (Meta)
- Remarketing campaigns launched
- Performance vs baseline comparison
- 90-day review call with recommendations for Month 4+

---

## COMMUNICATION CADENCE (post-onboarding)

| Frequency | Deliverable | Method |
|-----------|-------------|--------|
| Daily (Week 1 only) | Quick status check | Google Chat |
| Weekly | Brief performance update | Loom video or Google Chat message |
| Bi-weekly | Comprehensive written report | Google Chat + shared Drive doc |
| Monthly | Full performance report + strategy call | Report + 30-min video call |
| Ad hoc | Client concerns/questions | Google Chat (respond within the hour) |
| Quarterly | Full account audit + strategy review | 60-min video call + written report |

---

## MISTAKES TO AVOID (from real Creekside experience)

1. **Never assign contractors before contract is signed and invoice is paid.** No exceptions.
2. **Never launch ads without a signed contract.** This is a CRITICAL rule.
3. **Never make campaign changes in the first 7-14 days.** Audit first, present findings, get approval, THEN execute. The Fusion Dental engagement proved why this matters: audit happened 12 days after engagement started, and the client was already questioning what Creekside was doing.
4. **Never use Gmail as a source for financial data.** Gmail summaries of Square notification emails are secondhand. Use Square directly.
5. **Never send duplicate invoices.** Always check Square before creating a new invoice.
6. **Never mix up client Google Chat Space links.** Always verify the recipient before sending.
7. **Never leave onboarding sheet items incomplete.** Follow up with contractors and clients to ensure all steps are done.
8. **Never rely on ClickUp comments for management fee amounts.** Comments contain negotiation/preliminary numbers. Use the signed contract (gdrive_operations).
9. **Never skip the kickoff call.** It sets expectations and confirms goals before anything launches.
10. **Never launch Meta ads with only one campaign type.** Run both Instant Forms AND click-to-landing-page campaigns at launch, not phased.

---

## QUICK REFERENCE: KEY CONTACTS

| Role | Name | Email | When to Contact |
|------|------|-------|-----------------|
| Ops Coordinator | Cyndi (Cyndelsa Chicano) | cyndi@creeksidemarketingpros.com | All onboarding execution |
| CEO | Peterson Rainey | peterson@creeksidemarketingpros.com | Strategy, client relationships, escalations |
| CMO | Cade MacLean | cade@creeksidemarketingpros.com | Meta strategy, creative direction |
| Conversion Tracking | Jordan Tryon | (via ClickUp task) | Pixel, GTM, GA4, CallRail setup |

---

*Document version: 2026-05-19*
*Source: Compiled from Creekside Marketing internal SOPs, training extractions, agent definitions, client onboarding process documentation, Fusion Dental campaign brief, and team structure records.*
