# Upwork Screening Answers - The Coordinators (coordinators.pro), 4 questions
Profile: Lindsey | Style: lindsey_default | Status: UNSENT | Drafted 2026-09-08 (DB now(), Central)
Companion to: 2026-09-08_coordinators-pro-healthcare-staffing-meta-b2b_lindsey_default_UNSENT.md

---

1. [LOOM LINK - Lindsey to record and paste here before submitting]

My profile video is worth a watch as well.

If you would rather push back on the answers than listen to them, take 30 minutes with me and interrogate the technical ones directly: https://calendar.app.google/p4sWgHuykdV5kYHh8

Business Manager and tracking are where this role either works or it does not, so I would rather you press on those live than take a recording's word for it.

2. Straight numbers, and I will tell you which ones the data actually supports.

Dental implants, Meta lead forms feeding a call center. $64,746 in spend, 2,558 leads, $25.31 cost per lead, roughly 90 days. That account has since ended. It is my cleanest lead-gen dataset, and it ended in a phone call rather than a checkout.

The largest Meta account I run is high ticket elective health, live today, just under $99,000 a month and about $1.19 million over the last twelve months. Be clear on what that number is: total account spend across every objective, not lead gen alone. The lead-form share of it is a small fraction. I quote spend there and not a cost per lead, because that account's conversion reporting is incomplete enough that any CPL I handed you would be wrong.

I also ran a mortgage account on Meta inside a special ad category, restricted the same way Employment is, at $131,423 on lead campaigns. Since ended. I am giving you spend only and no lead figure, because four fifths of the days in that account carry no conversion data and anything I derived from it would be fiction.

Two more from our team's wider book, both cleanly measured: a nutrition lead-gen account at $9,115 and 926 leads, $9.84 CPL, and an oral surgery account at $1,812 and 73 leads, $24.82 CPL.

The gap you should know about: nobody on our team has run Meta selling a staffing or back office service to practice owners. Our healthcare volume is patient acquisition, so the audience points the opposite direction from yours even where the funnel shape matches.

3. Business Manager and permissions is the part I want first, before spend moves. On a new account I inventory who actually owns the pixel, which assets sit in someone's personal profile instead of the business, which partner still holds standing access from a previous agency, and where one person leaving locks an owner out of their own data. You get that back as a written list with owners on it.

Pixel and events: I read event quality and act on it. Match rates, duplicate events, which event is genuinely being optimized toward versus which one someone set once and forgot. A specific from a restricted healthcare account I ran: standard events were permitted and custom ones were not, which is exactly the kind of constraint that strands an optimization event without ever looking like a policy problem.

CAPI, straight: I have not shipped a server side Conversions API build end to end. I can read what a broken one is doing to delivery, and if you need one built I will spec it, sit the developer call and test the events myself rather than hand you a ticket and step back.

GoHighLevel: our team runs GHL at API level, both our own location and a client's. Pipelines and stages, contact level custom fields, calendars, and a server side endpoint that creates contacts from a form submission. That endpoint is on our own site rather than a client build, and no performance numbers hang off it. The limit worth knowing before you scope around it is that the API enrolls and removes contacts from workflows, which is the half that automates, but the sequence logic, copy, timing and trigger conditions are interface work and stay manual. Anyone quoting you full follow-up automation through the API is quoting the wrong half.

4. Three, and I will be precise about what was mine and what was our team's.

On the implant account I ran: custom conversion events would not register. It presented as a tracking bug and it was not one. The account sat in a restricted category where only standard events are permitted, so the custom event was never going to fire no matter how long anyone debugged the container. The resolution is to build the measurement on the permitted standard events rather than keep chasing the custom one.

Our team's, an access break: a private integration token started returning 403 on every endpoint. The token had lost access to the location it was scoped to; the integration itself was fine. Resolved by generating a new key. The useful part is the diagnosis, because a 403 on every endpoint at once is almost always credentials rather than code, and treating it as code burns a day.

Our team's, on our own property: a second Google Tag Manager container was live and firing on funnel pages next to the primary one, which puts duplicate firing on anything both containers tagged. We found it and consolidated to one. Flagging that this was our own site, not a client's.

On speed, the honest answer rather than the flattering one: I do not have logged resolution times on these, so I am not going to quote you hours. What I will commit to is that access and tracking breaks get looked at the day they surface, and that you hear about it from me when I find it rather than at the next scheduled call.

---

## Screening notes (internal, not part of the answers)

**TWO BLOCKING PRE-SEND ITEMS.**

1. **Q1 carries a placeholder, by design.** The question requires a recorded Loom/Vocaroo link pasted into the field. "I will paste the link here" was cut because it is structurally impossible once a screening answer is submitted. Lindsey must record the video and paste the real URL over the placeholder. Per Queenie's instruction the answer also pushes for a call and carries her calendar link.
2. **Q4 no longer contains a personally-owned fix with a resolution time, which is exactly what Q4 asks for.** The first draft claimed "Mine... the fix was rebuilding the measurement," and QC killed both halves: no Lindsey-attributed Meta access/pixel/permissions incident exists anywhere in `agent_knowledge`, the Fusion restricted-category item is a logged *correction* (2026-05-04) not a logged fix, Fusion was co-operated (Ahmed I. and Lindsey B.), and no rebuild is on record. The corrected answer describes the diagnosis honestly and states outright that no resolution times are logged. That is truthful but it under-answers a direct question. **Queenie's call on whether to send it as-is.**

**Calendar link verified live 2026-09-08:** `https://calendar.app.google/p4sWgHuykdV5kYHh8` returns HTTP 200, page title "30 min with Lindsey". Short `calendar.app.google` form, which is the one Queenie ruled for on 2026-08-27. Prospect is US-based (medical practices, US testimonials), so her bookable window (roughly midday to 5pm US Central, **Tuesday through Friday only** and nothing on Sunday or Monday) is genuinely bookable. The APAC unusability recorded in `reference_lindsey_has_no_calendar_link` does not apply here. Note the DB still has no Lindsey booking link, so this was curl-verified rather than looked up; `team_members.google_calendar_id` is still NULL and should be backfilled.

**Verified live via `execute_sql` 2026-09-08.** Meta lead-objective campaigns, trailing 12 months, with a conversion-data-quality flag (`pct_zero` = share of campaign-days with zero recorded conversions; high `pct_zero` means the CPL is unusable):

| Account | Operator | Status | Spend | Leads | CPL | pct_zero | Cited? |
|---|---|---|---|---|---|---|---|
| Fusion Dental Implants | Lindsey B. | churned 7/22 | $64,746.78 | 2,558 | **$25.31** | 13.7 | yes, full |
| SRM Ads (South River) | Lindsey B. | churned | $131,423.01 | 383 | $343.14 | 80.0 | **spend only** |
| NutriPro | Scott C. | active | $9,115.25 | 926 | **$9.84** | 9.5 | yes, as team |
| Galleria OMS | (null) | churned | $1,811.82 | 73 | **$24.82** | 0.0 | yes, as team |
| Vida Dentistry | Lindsey B. | active | $41,335.20 | 146 | $283.12 | 99.3 | no |
| Retirement Income Sol. | (null) | active | $203,775.27 | 927 | $219.82 | 96.7 | no |
| Adventures in Wisdom | Scott C. | active | $82,465.66 | 2,759 | $29.89 | 98.4 | no |
| Laleh leads subset | Lindsey Bouffard | active | $2,048.46 | 219 | $9.35 | 99.8 | no |

- **Laleh mislabel caught by QC and fixed.** The first draft answered "what lead-gen campaigns have you managed, share ad spend" with her **$1.19M total-account** figure. Her lead-objective subset is **$2,048.46**, so ~99.8% of that spend is not lead gen. The answer now states explicitly that the figure is total account spend across every objective and that the lead-form share is a small fraction. The $2,048/219 pair is deliberately **not** substituted, because dividing it recreates the banned $9.35 CPL.
- **South River: spend disclosed, lead count withheld on purpose.** Giving both would disclose the banned $343 CPL by division. The withholding is stated in the answer with the reason. Category still not named, per `reference_google_hec_is_not_meta_sac`; phrasing tightened to "restricted the same way Employment is" so it cannot be misread as declaring it *was* Employment.
- **Fusion "roughly 90 days" is sanctioned** (canonical window is 90d through 7/15/26), not rounded up from the 85-day row span.

**Other QC fixes applied:** "revoked token" corrected to a scope/access failure (the logged error is 403 "token does not have access to this location") and the invented "re-storing it" step removed; "inflating every event we were reading" downgraded to duplicate firing on commonly tagged events, since no measured inflation is on record; the GHL server-side endpoint now carries the mandatory "our own site, no performance numbers attached" qualifier required by `reference_no_consolidation_or_tracking_build_case_study` every time it is cited; "locks you out of your own data" moved to third person so it stops implying their account has the problem; "closest match to your funnel shape" cut and the shape-versus-audience distinction made explicit so it no longer reads as contradicting the B2B gap disclosure; "where the measurement is clean" reworded so it stops implying Lindsey's own accounts measure poorly.

**Two things that will not survive a follow-up, worth knowing before the call:**
- Q3's permissions and Business Manager answer is written in methodology tense because **no documented Business Manager migration or permissions-modeling engagement exists in `case_studies`**. A "walk me through one you did" question on the call has no cited answer behind it.
- The Q1 profile-video reference uses the sanctioned contents-agnostic phrasing, but **that a Lindsey profile video exists was not verified this session** (the standing rule keeps the video requirement live for Lindsey while recording her contents as unconfirmed). Confirm before submitting.

**Unchanged from the proposal draft:** zero em dashes, no sign-off name, no certification claim, no CPL quoted for Laleh or South River, and nothing asserted about the prospect's current ads or account. The calendar URL is the only link, authorized by Queenie's explicit instruction, which overrides the first-touch URL ban for these answers.

**Per-answer lengths:** Q1 449, Q2 1,551, Q3 1,729, Q4 1,495 characters. All well inside any per-field ceiling.
