# Multi-state psychiatric medication management practice, Meta + GoHighLevel patient acquisition
Profile: Samuel | Style: strategic + diagnostic | Status: UNSENT, QC FAIL -> all 7 fixes applied 9/30 (re-QC not run)
Screens: spend unstated (ask), US multi-state (passes geo), healthcare "strongly preferred" not required (gap disclosed), no hourly typed.
Dual-bid check against upwork_jobs NOT run (no DB call this session); no existing draft in upwork-drafts matches.

---

Hi there,

Before anything gets built, one thing decides what Meta can be told about a completed appointment for a psychiatric practice: how Meta has categorized your pixel.

**The problem most setups hit**

Meta assigns data sources to categories, and health and wellness explicitly covers provider/patient relationships. Once a pixel lands there, Meta may restrict mid and lower funnel standard events and may block custom events that suggest a health condition. So the obvious build (HighLevel fires "Completed Psychiatry Appointment" back to Meta through the Conversions API when the pipeline stage moves) can get blocked, or worse, send the kind of health data the FTC took action on in the BetterHelp and Cerebral pixel cases.

The first thing I'd check is Events Manager, where Meta shows any category it has assigned to your data source. That answer sets the whole architecture.

**How I'd set it up**

1. Keep the real scoreboard in HighLevel. Cost per completed new-patient appointment gets calculated from HighLevel pipeline stages against Meta spend, by campaign. That number never depends on what Meta allows us to share.
2. Feed Meta the deepest neutral signal it will accept. Event names and parameters that carry no diagnosis, medication or condition, sent from a stage change in HighLevel. If the category allows the booked or completed stage, we use it. If not, we step up the funnel and let the HighLevel scoreboard decide which campaigns get budget.
3. Get attribution right on day one. HighLevel only counts a Facebook or Instagram lead as Paid Social when utm_source contains "fb_ad", and that match is case-sensitive. Tag it "facebook" and every Meta lead shows up as something else, which breaks the cost-per-appointment math before it starts.
4. Nurture built around the no-show, not the lead. Speed-to-lead SMS, booking reminders, and a rescue sequence for missed intakes, since in med management the gap between booked and completed is worth measuring separately. US SMS in HighLevel requires A2P 10DLC registration, so that goes in week one.
5. Copy that clears review. Meta bans ads that assert or imply something about the reader's mental health. "Depression getting you down?" is Meta's own example of what gets rejected. Copy written about the service rather than the person avoids that trigger.
6. Campaigns split by state, so budget follows where your prescribers are licensed and have open slots.

**Honest gap**

Our team hasn't run ads for a psychiatric or behavioral health practice. The closest work is appointment-based healthcare on Meta: our team currently runs Meta for a dental practice at $30.65 cost per lead for August. Our team has also built HighLevel lead routing and workflows for a dental client.

**A few questions**

- Has anything in Events Manager shown a data source category or a restriction on your pixel?
- Is your HighLevel account set up for HIPAA with a signed BAA, since intake details will flow through it?
- Which states are live now, and is capacity even across them?
- Roughly where does monthly ad spend sit: $5K to $10K, $10K to $25K, or above that?

If it helps, I'm happy to walk through the Events Manager check with you on a call.

---

## Suggested case study
- Best match: The Tooth Co (Meta, dental, ACTIVE, Lindsey operator): $30.65 CPL, 124 conv on $3,801.05, 2026-08-03 to 08-31. Cite-only, no PDF on file for Meta.
- GHL process fact: Vida Dentistry (practice unnamed, no numbers; account contentious since 9/11).
- Honest gap: zero psychiatry/behavioral health (0/28 case_studies, 0 reporting_clients). Google analogs (Integrity Naturopathic) barred on a Meta-only post. Attach nothing.
