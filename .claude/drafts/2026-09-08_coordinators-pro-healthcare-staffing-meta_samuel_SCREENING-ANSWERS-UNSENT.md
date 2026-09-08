# Upwork Screening Answers - The Coordinators (coordinators.pro), healthcare staffing Meta
Profile: Samuel/Peterson | Companion to: 2026-09-08_coordinators-pro-...-samuel_strategic-diagnostic_UNSENT.md
Status: UNSENT | Drafted 2026-09-08 (Postgres now())

VERIFIED LIVE THIS SESSION (contractor_query)
- Cade calendar `https://calendar.app.google/85PWYBwxqYNq18qe9` CURL-VERIFIED: HTTP 200, resolves to the
  documented AcZssZ3j8qaC... appointment schedule. Short form sent, per standing rule. Only link in the file.
- Fusion Dental act_938570599860690, CHURNED 2026-07-22 ("went internal / kept our strategy"). Lifetime
  Apr 21 to Jul 15 2026: $64,747 / 2,558 leads / $25.31 CPL over 78 active days. L30D Jun 15 to Jul 15:
  $14,597.29 / 678 leads / $21.53 CPL. Spanish campaign $12.74 CPL vs English $24.26. Worst campaign
  $44.63. Two locations (Roseville, EDH).
- Correction ccd0db1b: this account was restricted to STANDARD events only, custom events not permitted.
  Every weekly report since carries "standard lead ONLY (no custom events per correction ccd0db1b)".
- Adventures in Wisdom: $83,820 / 2,810 leads / $29.83 CPL, ACTIVE, 365 active days.
- The Tooth Co: $3,801 / 124 leads / $30.65 CPL, ACTIVE, 365 active days.
- MedWriter: $117,895 / 12 months / ACTIVE, CPM $47.62 lifetime. CONVERSIONS NULL, so NO CPL claimed.
- Book: 30 Meta accounts, $2,341,875 trailing 12mo, weighted CPM $26.68.
- Own site tracking: GTM-MWQVSPJ single container, consolidated 2026-08-14 after a SECOND container
  GTM-KFQDMCH5 was found firing on funnel pages and removed. Commit 7508877, drybonez235/creekside main.
  Meta Pixel 2083657478846396, GA4 G-REHLM40KCD.

DELIBERATELY OUT
- NO CAPI implementation claimed anywhere. Verified zero as a service line: no case study, no SOP, no
  documented client deliverable. Q3 speaks to it diagnostically and concedes the build explicitly.
- Doctor Laleh CPA NOT cited (spend citable, CPA is not). TX Gutter $464 CPL not cited. South River CPL
  not cited (fails live verification). Vida Dentistry not cited (full-history $290 conflicts with 90d
  $97.39, unresolved).
- No certifications. No em dashes. No contact info. Cade's calendar is the only link, and it is sanctioned.
- No resolution-time figure invented for Q4. Dates and the durable outcome are given instead.

BLOCKER
- Q1 REQUIRES a Loom or Vocaroo recording. Placeholder is marked in caps. Do not submit until the real
  link replaces it.

---

## 1. Summarise your experience in a similar role by video or audio.

[[ PASTE LOOM OR VOCAROO LINK HERE BEFORE SUBMITTING ]]

The short version of what is in it. We run paid social and search for a book of thirty Meta ad accounts, about $2.34M in Meta spend over the last twelve months. The work closest to yours is lead generation in healthcare and in businesses selling a service into medical practices, which is a different motion from patient acquisition and is the one that matches what you are doing.

If it is easier to talk it through than to watch something, my partner Cade runs our Meta side with me and keeps open slots here:

https://calendar.app.google/85PWYBwxqYNq18qe9

There is also a video on our profile that covers how we work an account.

## 2. What Meta lead-gen campaigns have you managed? Ad spend, lead volume, CPL/CPA.

Healthcare lead gen, closest in shape to yours. A dental implant group running Meta lead forms into a call center: $64,747 in spend, 2,558 leads at a $25.31 cost per lead, across two locations over about three months. In the final thirty days it ran $14,597 at $21.53. The detail worth more than the average is the spread inside it. The Spanish language campaign delivered leads at $12.74 while English ran $24.26, and the weakest campaign sat at $44.63, so the account average was hiding a nearly four to one range. That client has since taken the work in house.

Also worth knowing about that account: the constraint was never cost. It was how fast the call team could dial. We throttled spend to match answering capacity and deliberately pushed qualifying questions into the form to buy fewer and better leads at a higher cost per lead. Your funnel ends in a discovery call, so that is the same ceiling waiting for you.

Two more that are live today. A cohort education business at $83,820 and 2,810 leads, a $29.83 cost per lead over a full year. A dental practice at $30.65 per lead, also running a full year.

The account that matches your audience rather than your vertical is MedWriter, an AI assistant sold to solo practitioners and group practices. Twelve months, $117,895, about $10K a month, live now. I am not quoting a cost per acquisition on that one, because its conversion reporting is incomplete on our side and I will not build a number on that. Spend, tenure and media cost are the honest figures there, and the media cost is the interesting part: it runs at a $47.62 CPM against a $26.68 average across the whole book, which is what buying practice owners costs.

## 3. How hands-on are you with Pixel, CAPI, Business Manager, permissions, and GoHighLevel?

Business Manager and permissions is the part I would call routine. We operate inside client owned Business Managers across thirty Meta accounts, as users rather than owners, so assets stay with the client. Asset ownership, partner access, page and pixel sharing, and the handoffs that go wrong when an agency is removed before assets are transferred, that is regular work rather than an occasional favour.

Pixel and event configuration I read and act on: which event is actually being optimised toward, whether the browser and server sides agree, duplicate or double firing, and whether the event you are optimising for is one the category even permits. That last one bites in healthcare specifically. On the dental account above, the account was restricted to standard events only and custom events were not permitted, which is the kind of detail that quietly degrades optimisation while everything still looks like it is working.

On Conversions API I want to be straight rather than sell you something. I read event quality, diagnose what a broken or shallow setup is doing to delivery, and specify what needs to exist. I have not built a server side CAPI integration end to end and will not claim I have. A net new build is scoped work alongside whoever holds your development access. If yours is already in place, auditing and correcting it is inside what I do.

GoHighLevel we run ourselves, including through its API: pipelines and stages, contact level custom fields, calendars, workflow membership. One thing worth knowing before you scope around it, the GHL API will list workflows and add or remove contacts from them, but sequence logic, copy, timing and trigger conditions are interface work. Anyone telling you they will automate your follow up through the API is describing the manual part.

## 4. Tell us about a Meta, tracking, or access issue you personally fixed.

Two, one on a client account and one on our own.

The client one is the dental account. Its lead reporting was not lining up with what the practice was actually receiving, and the cause was event configuration rather than targeting or budget: the account sat in a restricted category where standard events are permitted and custom events are not, so events were being counted in a way the platform would not optimise against. The fix was to move reporting and optimisation onto the standard lead event only. What matters more than the speed is that it stuck. It was written down as a standing constraint on that account, and every weekly report produced afterwards carried it explicitly, so nobody could quietly reintroduce a custom event three months later.

The second was on our own site, which I mention because it is the failure mode I look for first in someone else's account. Our funnel pages were firing a second Google Tag Manager container alongside the main one, so those pages were double tagged while the rest of the site was not. Traced it to the funnel page templates, which carry their own inline head rather than inheriting the site layout, removed the duplicate container and consolidated everything onto one. It went out as a single commit once the cause was identified.

Both are the same category of problem, and it is the category I would look at first in your account: the numbers look plausible enough that nobody questions them, while the platform is quietly optimising toward the wrong thing.
