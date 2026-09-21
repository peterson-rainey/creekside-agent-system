# Upwork Proposal - UNSENT
Job: "B2C Google Ads & Meta Ads Lead Generation Specialist – Mobility Products". UK mobility company (rise & recline chairs, adjustable / rise & recline beds, mobility scooters). Consumer enquiries for a sales team that calls back and books appointments / home visits. Google Search + Meta lead gen + landing pages or enquiry forms + conversion/call tracking + CPL and lead-quality monitoring + reporting. Spend, rate, hours not stated.
Profile: Lindsey | Style: lindsey_default (request said "strategic + diagnostic ... write it in lindsey_default"; pre-resolved, not re-asked) | Date: 2026-09-21 Central (Postgres now() 16:53 UTC)

## SEND ONE PROFILE
Samuel twin exists, written in a parallel session and saved while this one was verifying:
`.claude/agents/upwork-proposal-agent/drafts/2026-09-21_uk-mobility-rise-recline-beds-scooters-leadgen_samuel_strategic_UNSENT.md` (committed by its own session in 8aebb5c, which also notes this Lindsey twin and says send one profile only).
Samuel covers both platforms; this draft covers Meta only. Both cite the same dental implant account, so never send both.

## SCREEN
- Step 0: no draft of this job in any draft folder at session start; `upwork_jobs` (job_name / job_description ILIKE mobility, rise & recline, mobility scooter, stairlift) and `upwork_leads` both empty. Twin appeared mid-session (above).
- Platform: PARTIAL. Google Search is co-equal and listed first. Lindsey is Meta-only, so the Google half is conceded in the body.
- Geo: UK, passes.
- Spend: unstated. $5K company floor and her $3,000 floor both unmeasurable. Asked as a relative range (this profile owns the spend ask; the Samuel twin closes on visit capacity and regions).
- Required items: 3 (similar B2C campaigns, channels recommended, results). All answered. 349 words / 1,943 chars vs the 350 multi-question ceiling.
- Proof: mobility / stairlift / adjustable-bed = zero. UK = zero, not claimed (accounts described as US / California). Closest shape: high-ticket consumer lead gen feeding a call center (dental implants).
- Landing pages: one bullet, no CRO-gated question, so not foreclosing. Body claims no landing page builds.
- Attachments: none. No verified Lindsey PDF fits (Fusion has none). Results-attached line dropped on purpose.
- Pooling: strict first person (default since 9/18). Pooled variant line below.
- Anchors: "over 10 years" kept; "built and sold my own e-commerce business" dropped for length.
- Fee: none quoted. Her $3,000 floor vs the 8/24 $1,000 authorization is still unresolved.
- Hours: Lindsey works 10am-6pm Central = 4pm-midnight UK; overlap with a UK working day is roughly 4-6pm UK. Not mentioned in the body.

## FACTS (verified live 2026-09-21 via contractor_query)
- Fusion Dental Meta `act_938570599860690`: `reporting_clients` operator Lindsey B., churned 2026-07-22 ("Went internal / kept our strategy"). `meta_insights_daily` 2026-04-21 to 2026-07-15 (all recorded data): $64,746.78 / 2,558 conv / $25.31. Goals field: "Full mouth reconstructions at $36k-$38k avg case value." Notes: Roseville (incl Spanish) + EDH budgets (two locations).
- Fusion weekly report 2026-06-02 (`agent_knowledge` c544d91e): "we intentionally reduced ad spend to accommodate the call center"; Note A: both leads from the 5/27 campaigns "scheduled consultations", so "we are keeping the campaign live even at the higher cost per lead"; Note B: General Dentistry leads found in Salesforce (1 scheduled, 2 did not, 1 unqualified). Campaign brief v0.4: lead form ads (Instant Forms) pass UTMs in hidden fields into Salesforce.
- Doctor Laleh Meta `act_868498138612020` ("Lux Dental Spa FB Ads"): operator Lindsey Bouffard, active. Spend Mar-Aug 2026: $114,587 / $102,652 / $100,030 / $99,803 / $99,138 / $96,862; Sep 1-20 $62,439. Spend only, never a CPL.
- South River Mortgage Meta `act_1358674881898209`: operator Lindsey B., churned 2026-08-11. Goals: "Meta Ads for reverse mortgage leads". No numbers used (CPL fails verification).
- Neue Maison (luxury furniture, operator Lindsey B., churned 2026-08-11) and Tiami (luxury mattress, operator Lindsey B., active): named as brand types only, no numbers.
- Not used on purpose: Meta conversion leads goal / 200 leads a month (Samuel twin uses it), qualifying-question and spend-cut framing of Fusion (Samuel twin uses it), Meta health-copy policy, Google health rules.

## DIVERGENCE MAP vs the Samuel twin
- Samuel: cheapest enquiry vs home-visit enquiry; platforms learn from sales outcomes (imports, conversion leads at 200+); Search split by product; Google forwarding numbers; Google caretaker health rule; Instant Forms with postcode + who it's for; Meta health-copy ban; Fusion as qualifying questions / higher CPL / spend cut; asphalt Search vs PMax; tracking specialist call tracking; closer on visit capacity + regions.
- Lindsey: who enquires (the user or a son or daughter) decides audiences, ads and forms, judged by home visits; Fusion through the CRM consultation check; Laleh scale; reverse mortgage older homeowners; what each channel is for; closer on a spend range tied to the user / family test.
- Shared 3-grams with the twin: 0 (scripted check). Shared facts: the Fusion account, furniture and mattress brands, a tracking specialist.

## REVIEW LOG
- qc-reviewer-agent pass 1: PASS WITH FIXES. Applied: tracking sentence made a plan ("to track"), calls added, weekly reporting line added. Not applied: "implant" flagged as inferred, but it is verified (ad_account_name "Fusion Dental Implants"; goals "Maintain 4x+ ROAS on dental implants").
- expert-review-agent: Good. Applied: Google concession reframed as working alongside whoever runs Search (no implication she supplies one), "call centre" for a UK reader, "Search and Meta do different jobs" cut. Not applied: "$100,000 to $115,000 a month" (Jun-Aug were under $100K, so "about $100,000" stays); opener rewrite to "current ad budget" (the post doesn't say they run ads now); dropping furniture/mattress (kept because the post names furniture and adjustable beds; "selling online" added so they don't read as lead gen). Blind spot noted, not added: UK VAT relief on mobility aids (details unverified here).
- Twin re-checked after its update: 0 shared 3-grams.
- qc-reviewer-agent re-check: PASS WITH FIXES, one fix applied (tracking sentence put in the conditional: "so I'd track"). No blocking issues.
- DB LOG: skipped, contractor_query cannot INSERT.

---

When an enquiry comes in for a chair, bed or scooter, how often is it from the person who'll use it, and how often from a son or daughter looking on a parent's behalf?

I ask because they're not the same buyer on Facebook. They sit in different age brackets and act for different reasons, and an ad that gets someone to enquire for themselves rarely works on a daughter worried about her dad. I'd run them as separate audiences with their own ads and forms, then see which one books more home visits.

At a two-location dental implant group in California that I ran on Meta, a full-mouth reconstruction averaged $36,000 to $38,000, and leads went to their call centre. From late April to mid-July the account brought in 2,558 leads on $64,746.78 of spend, about $25 each. I checked the practice's CRM for who booked a consultation, and kept one campaign running even though its leads cost more, because they were booking.

I've been doing this for over 10 years. My largest account today is a cosmetic dental practice at about $100,000 a month on Meta. Other Meta accounts I've run include a reverse mortgage lender selling to older homeowners, plus furniture and mattress brands selling online.

Meta reaches the user and the family before either starts searching, and Search catches them once they do. I run Meta, not Google Ads, and I'd work alongside whoever runs your Search from day one, so what each channel learns reaches the other. I work with a tracking specialist on GA4 and GTM, so I'd track each enquiry, calls included, from the ad that brought it in to the visit it books.

Roughly what are you planning to spend a month, nearer £3,000 or nearer £30,000? At the lower end I'd test the user and the family on one product first; at the higher end each product can have both. Either way, you'd see each week which of the two is filling your diary.

There's a short video on my profile that shows how I run accounts week to week.

---

## POOLED VARIANT (only if colleague pooling is allowed on this post; strict first person is the default)
Replace "I run Meta, not Google Ads, and I'd work alongside whoever runs your Search from day one, so what each channel learns reaches the other." with:
"I run Meta, and a Google Ads specialist I work with would run Search, so what each channel learns reaches the other."
(6 words shorter. Still no "our team", "we" or Creekside.)
