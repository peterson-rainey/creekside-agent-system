# Upwork Proposal - US creative marketing agency, part-time full-funnel performance marketer (Meta + Google)
Profile: Lindsey | Style: lindsey_default | Status: UNSENT, DQ FLAGGED | Drafted 2026-09-04 (Postgres `now()` Central; local clock said 09-05 and was ignored)

---

When a lead turns out to be qualified, or books, or buys, does that outcome get written back into Meta and Google, or does it stop in the CRM? That decides whether lead quality is something you report on or something you can optimize toward.

Everything up to the lead is an event the platforms can see. The customer is not. So the algorithm keeps buying more of the last event it was handed, gets very good at finding people who fill in forms, and cost per lead improves while nothing downstream moves. Creative testing does not fix that, because it is a signal problem. Further up, if clicks hold steady while conversions fall, the ads are fine and the page or the offer changed.

The clearest version I have run was a dental implant practice at about $20,000 a month on Meta, instant forms into a call center. $64,747 spent, 2,558 leads at $25.31, April to mid July. Cost per lead was not the interesting number. We throttled that account on how many calls the client could answer, not on form performance. Instant forms move the constraint onto whoever picks up the phone; website conversion campaigns buy fewer and better qualified on the same money.

Working behind a creative team is already how I operate. I run Meta for an agency where their creative director owns the work and I own the media and the read on what to test next. Ten years in, and I built and sold my own ecommerce business before that.

Google sits with a colleague on our team rather than with me, so on a both platforms seat I am half of that answer. On CRO I diagnose and recommend, with no conversion rate before and after from a page I owned.

Roughly what range are these accounts spending monthly, and what has to happen before a lead counts as qualified? Eastern overlap is fine, we are US Central, and we work flat monthly per account rather than hourly.

There is a short video on my profile covering how I read an account, and I can record a walkthrough of that dental one if useful.

---

## SCREEN (internal, not part of the proposal)

### DQ stack: this job fires the white-label auto-DQ, plus a foreclosing required-items screen

**1. White-label / agency subcontractor. AUTO-DQ, primary.**
"We are a U.S. creative marketing agency seeking an experienced performance marketer to support **client accounts**." Clients test hits in sentence one. Every listed responsibility is execution, and the only named audience for output is internal: "Turn data into clear recommendations for **our creative and web teams**." Zero client contact anywhere in the post. Textbook back-end white-label, the "briefs in, no client out" shape. Standing tally before this one: **20 skips vs 3 draft-anyways**, and every override was on a repeat sighting.

**Note the file-vs-rule conflict, already resolved.** `.claude/agents/upwork-proposal-agent/docs/lindsey-default.md` lists "Creative/SEO/web agencies seeking Meta specialist" under **THINGS THAT ARE NOT FLAGS**, which would green-light this job. The standing user instruction in memory explicitly names that agent file as stale and overrides it. Do not let Lindsey's own style doc rescue this structure.

**2. Hourly. Required item 4 asks for "your current hourly rate."**
Creekside never bills hourly. The one carve-out (a short, capped, PAID test that gates management) does not apply: this is an ongoing 20 hr/week seat, hourly all the way down. Draft states flat monthly per account up front rather than letting it surface late.

**3. Required-items screen. This is the part that is NOT overridable.**
A proof gap cannot be cleared without fabricating numbers. Item by item:

| Item | Answerable? |
|---|---|
| 1. Short introduction | Yes |
| 2. Meta, Google, CRO experience | **Partial.** Meta yes. Google is not Lindsey's, it is a colleague's. CRO is a hard zero |
| 3. 2-3 examples with dates, spend, what you personally changed, **before/after tied to qualified leads, booked appointments, or customers** | **NO.** We have CPL and lead volume. We have **no before/after arc tied to bookings or customers anywhere in the book** |
| 4. Hourly rate, availability, start date, ET overlap | **Partial.** ET overlap fine (US Central). Hourly conflicts with the fee model. **Lindsey's actual hours/week is unknown to me and blocks this item** |
| 5. **Required 2-3 min Loom walkthrough. "Applications without the requested video walkthrough will not be considered."** | **NO. Hard submission blocker.** First-touch Upwork proposals carry no links, so the URL cannot go in the proposal at all, and no such recording exists. Lindsey has to record it and it has to be attached through Upwork |

**4. Ad spend screen unmeasurable.** Budgets belong to the agency's clients, not the poster. The $5K/month floor cannot be cleared in either direction. Draft asks for a range.

**5. Not a full-time-employment-seat DQ.** "Approximately 20 hours per week" is explicitly part-time, so that auto-DQ does not fire. "Can grow into a major long-term role" is seat-shaped language but not the trigger.

**6. Geo cleared.** US agency, US service businesses, ET overlap. Inside US/CA/UK/AU.

### Verified live via `contractor_query`, 2026-09-04

- **Fusion Dental**, Meta, `platform_operator` = **Lindsey B.**, $20,000/mo, **churned 2026-07-22** ("went internal, kept the strategy"). Lifetime **$64,746.78 spend / 2,558 leads / $25.31 CPL, Apr 21 to Jul 15 2026**, standard lead event only. Corroborated across three independent `agent_knowledge` rows. Written past tense. Dental implant practice, Roseville and El Dorado Hills CA, $36-38K average case value.
- **The capacity-not-CPL read is documented, not invented.** The account was throttled on the client's answering capacity.
- **Creative-agency relationship: Full Circle Media**, `platform_operator` = **Lindsey B.**, Meta, **active**, $8,000/mo. Adam Holcomb is co-founder and **creative director**; Lindsey is Creekside POC. Flagged in `agent_knowledge` as a **partner, not a client**. Cited by shape only, never named.
- **US service-business lead gen on Meta, all Lindsey B. as operator:** Doctor Laleh (active), The Tooth Co (active, $5K/mo), Vida Dentistry (active), Fusion Dental (churned). The vertical claim is well covered.
- **CRO / landing page / GA4 / GTM / CAPI / tracking: ZERO rows in `case_studies`.** Query returned an empty set. Fifth consecutive live scan confirming this gap. Disclosed in the draft rather than papered over.
- **Laleh numbers deliberately excluded.** The `case_studies` row claims CPA $48.79 to $9.58 and consultations 50-60 to 105+, which would answer item 3 directly. Standing ruling: Laleh spend is citable, **CPA is not**, and case-study cost figures fail live verification. No Laleh number appears.
- **The final-week Fusion "conversion rate not traffic" note is a PENDING-REVIEW internal draft with root cause unconfirmed.** The draft uses the *method* (hold clicks constant to separate a traffic problem from a conversion problem) and cites **no** Fusion specifics from that note.

### Deliberate omissions

No links, no calendar link, no contact info (first touch). **No attachment line and none promised** per the standing ruling that no clean attachable PDF exists in Lindsey's book. No sign-off name. No em dashes. No certification claims (zero exist system-wide). Google/Bing/TikTok not claimed as Lindsey's services. Principals not named as the worker. Availability and start date left out of the body because Lindsey's hours are unknown.

**Length:** 361 words / 1,970 characters. Well under the 5,000-character Upwork ceiling. Eleven words over the style doc's 350-word multi-question ceiling, held deliberately: the post carries five numbered required items plus a nine-line requirements list, and the remaining words are all load-bearing (the honest CRO and Google disclosures, the fee model, and the spend question).
