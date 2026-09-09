# Upwork Proposal - Political Campaign: Meta Ads Setup + Social Media Strategy
Profile: Samuel/Peterson | Style: strategic | Status: UNSENT | Drafted 2026-09-09

DATE NOTE: harness says 2026-09-10, Postgres now() says 2026-09-09 16:01 US Central.
Used the DB per the standing rule.

## SCREENS RUN
- Ads in scope: YES. "set up Meta ads" is the first item in scope. PASS.
- Organic social also in scope ("social media strategy", "improve our social media presence").
  Blended seat, not a pure organic-social post, so the 3-straight-SKIP organic rule does not fire.
  Body sells the paid half and does not claim an organic-social results book.
- Full-time seat: NO. The words "full time" never appear. PASS.
- White-label / subcontractor: no. Coaching Upwork competitors: no. Self-funded / profit-share: no.
  Detection-evasion: no. Worker-location requirement: no. Flat-fee portfolio owner: no.
  Landing pages: not mentioned at all, so the ads+LP-owned-together skip does not apply.
- Geo: NOT STATED. No country, state, district or office named. Not an auto-DQ on its own, but the
  US/CA/UK/AU screen is unresolved AND political ad rules are country-specific, so it is a gating
  question, not a nice-to-have. Asked in the close.
- Spend: NOT STATED. Prose does not foreclose it (a campaign media budget can be any size), and no
  scale path is volunteered either. Unstated leaves the $5K/mo floor open. Close asks for it as a
  RELATIVE range so it screens the floor and anchors at the same time.
- Required items: no numbered screening questions, so no unanswerable proof demand forecloses the draft.
- Hourly: not requested, no pricing question asked, so no pricing quoted. % of spend if it comes up.
- Duplicate bid: no existing draft for this job. Grep across all three draft directories for
  political / election / campaign-for-office returned only unrelated therapy, ecom and coaching jobs.
  No Lindsey twin drafted.

## VERIFIED LIVE THIS SESSION (execute_sql)
- **Political vertical is a HARD ZERO, both tables.**
  `case_studies` filtered on political / advocacy / nonprofit / government: ZERO rows.
  (The only adjacent row returned was Adventures in Wisdom, Education, which is not political.)
  `clients` filtered on political / advocacy / nonprofit and on name patterns for campaign / PAC /
  vote / elect / "for congress": ZERO rows.
  Conceded outright in the body. No analog is dressed up as political proof.
- **Meta video-objective share: 53 of 1,815 campaigns across 35 accounts = 2.9%.** Structural fact
  about our own book, safe to quote, and it is the setup for the optimization-event point.
- **Fusion Dental, the transferable Meta lead-form cite: $64,746.78 spend, 2,558 conversions,
  $25.31 CPL, avg CPM $37.36, over 78 ACTIVE days, 2026-04-21 to 2026-07-15.** Read on active days
  per the standing rule. CHURNED 2026-07-22, so stated in the past tense. This is Meta lead forms
  routed into a call center, which is structurally the same machine as forms into a phone bank,
  which is why it is the analog used rather than any dressed-up political claim.

## THE CORE POSITION
The differentiating fact is that most freelancers conflate Meta's social issue / electoral / political
(SIEP) rules with the housing, employment and credit Special Ad Category. They are NOT the same regime.
SIEP ads keep lookalikes and custom audiences and carry no 15-mile radius floor; what SIEP actually
imposes is authorization plus a permanent public disclaimer and permanent Ad Library exposure. Getting
that distinction right is worth more to this buyer than any case study, and it is verifiable in our
own notes rather than borrowed.

## DELIBERATELY OUT
- No claim of political, advocacy, PAC or nonprofit experience. None exists.
- No claim of Special Ad Category equivalence, and no claim that SIEP strips targeting. It does not.
- No certifications. No Google Partner, no Meta Blueprint. None exist.
- No organic-social results claimed. There is no citable organic-social book.
- No attachment. Every attachable artifact in the book is a Google Search lead-gen PDF and this is a
  Meta-and-organic post, so the standing exclusion applies: attach nothing, let the body carry it.
- No pricing, no links, no calendar link, no contact info, no em dashes.
- UNSIGNED per the no-name-signoff ruling.

## CHAR COUNT
Body below is 3,302 characters, under the 5,000 cap.

## QC
qc-reviewer-agent and expert-review-agent have no working Supabase tool in this session (documented
gap), so QC was run inline against the live queries above. Every number in the body traces to one.

---

The thing that most often stalls a campaign's first Meta flight is not creative and not targeting. It is that the ad account and the Page both have to clear authorization before a single political ad can serve, and that clearance runs on identity documents and a mailed or scanned verification step rather than on anything you can accelerate by paying more. Campaigns routinely start this in the week they want ads live, then lose that week.

Worth correcting a second thing early, because it changes the whole media plan. Political and social issue ads on Meta are not the same restriction regime as housing, employment and credit ads. Those get their targeting stripped: no lookalikes, a minimum radius, no detailed demographics. Political does not work that way. Lookalikes off your donor and volunteer files still work, custom audiences still work, and you can still target tight geography down to the precinct-adjacent level. What political actually costs you is privacy. Every ad runs with a permanent "Paid for by" disclaimer, and every one of them sits in the public Ad Library with spend and reach ranges attached, for years, searchable by anyone. Your opponent's team can read your entire creative rotation and infer your budget curve from it. That is a real constraint on what belongs in the first test batch and what should stay off Meta entirely.

The third piece is the clock. A commercial account can afford a two week learning phase per ad set because there is always next month. A campaign has one fixed date and no next month. That means fewer ad sets, consolidated budgets, and an optimization event chosen for volume rather than for purity, so the algorithm actually exits learning before the window that matters. Across the Meta accounts our team runs, only about 3% of campaigns optimize to a video objective even though most of the creative is video, and that is deliberate. Video objectives produce beautiful view numbers and almost no identified supporters.

Being straight about the evidence: our team has not run a political campaign. There is no candidate, PAC or advocacy account in our book, and anyone telling you their commercial results transfer cleanly to a ballot deadline is selling. What does transfer is the machine underneath, which is Meta lead forms feeding a human contact operation. The closest match we have run is a multi-location dental group where lead forms fed a central call center: about $64,700 in Meta spend produced 2,558 form completions at $25.31 each across roughly eleven weeks of active delivery. Swap the call center for a volunteer phone bank and the build is nearly identical, including the part most people skip, which is making sure the form data lands in the system your callers actually work out of on the same day.

On the organic side, the honest role for it here is supply rather than performance. Organic gives you the volume of raw footage and the surface where a proven paid angle gets repeated for free, and it earns its place in the plan on that basis rather than on follower growth.

Two things would let me size this properly. Which country and which office or ballot measure, since the authorization rules and the lead time differ by country. And where does the media budget land, roughly, against a $5K to $25K a month band?

---

## SCREENING QUESTIONS (added 2026-09-09)

RE-SCREEN: both required items are ANSWERABLE, but both answer in the negative.
Q1 (similar experience) has a real transferable answer. Q2 (certifications) is a BARE ZERO with no
substitute available. Re-verified live this session: `agent_knowledge` filtered on certif / blueprint /
"google partner" returned only Dental Blueprint Engine rows, which are an internal build and NOT Meta
Blueprint. `reporting_clients` filtered on polit / PAC / elect / vote / committee returned ZERO rows,
corroborating the earlier `clients` and `case_studies` zeros. Standing rule holds: never claim Google
Partner or Meta Blueprint. Answered straight.

Q1 body: 1,614 chars. Q2 body: 1,188 chars.

### Q1. Describe your recent experience with similar projects

No political campaign, and it would be easy to imply otherwise here so it is worth saying plainly. Our team has not run ads for a candidate, a PAC, a party or a ballot measure. If that is a hard requirement, the rest of this will not change your mind.

What is genuinely similar is the machine underneath a voter contact program, which is Meta lead forms feeding a human calling operation against a deadline. The closest recent build was a multi-location dental group where forms fed a central call center. Roughly $64,700 in Meta spend produced 2,558 completed forms at $25.31 each across about eleven weeks of active delivery. The work that actually mattered there was not creative. It was consolidating ad sets so budgets exited learning quickly, choosing the optimization event for volume rather than for a cleaner-looking number, and making sure form submissions landed in the callers' queue the same day rather than in a CSV nobody opened. A phone bank is the same build with different scripts.

The other similar strand is restricted-category work, where the constraint is a platform policy gate rather than a bidding problem. Recent examples include a telehealth account operating under health advertising restrictions, a Google Merchant Center misrepresentation suspension, and an ongoing Google Business Profile reinstatement appeal. Political sits in that same family: the account-level clearance decides whether anything serves at all, and it has to be handled before media planning, not alongside it.

### Q2. Please list any certifications related to this project

None. Our team holds no Meta Blueprint certification and no Google Partner status, and I would rather you hear that here than discover it later.

The reason I am not going to dress that up is that neither one is a proxy for what this project needs. Blueprint is a multiple choice exam on platform features. It does not test the thing that decides a campaign's Meta program, which is whether the disclaimer and authorization clear in time and whether your budget exits learning before early voting starts.

There is one credential that genuinely matters on this project, and it is not the vendor's. Meta's advertiser authorization for ads about social issues, elections or politics has to be held by your campaign, tied to your ad account and your Page, in the name of the entity that appears in the "Paid for by" disclaimer. Nobody can carry it on your behalf, and it cannot be transferred from an agency account. Whoever you hire, ask them who is completing that verification and on which entity. If the answer is that they will handle it under their own account, that is the wrong answer.
