# Upwork Proposal — Generic Google + Meta Management (part-time)

- **Date drafted:** 2026-09-03 (confirmed via Postgres `now()`)
- **Profile:** Samuel Rainey
- **Style:** samuel_strategic
- **Status:** UNSENT — draft only
- **Dedup check:** clean. No matching `upwork_leads` row in the last 30 days, so no second Creekside profile is bidding this job.

## Job description (as supplied)

> We're looking for a freelancer to manage and optimize paid advertising campaigns across Google and Meta
> platforms. The role includes setting up campaigns, improving targeting, monitoring performance, and making
> data-driven adjustments to increase results. You should be comfortable handling campaign structure, budget
> allocation, and reporting while helping improve overall ad performance. This is a part-time opportunity for
> someone who can work independently and communicate progress clearly.

## Screening

| Screen | Result |
|---|---|
| Ads in scope | PASS. Ads are the entire scope. |
| Full-time employment seat | PASS. "Part-time" and "freelancer", the full-time DQ does not fire. |
| White-label / subcontractor | PASS. No agency-behind-agency signal. |
| Self-funded / profit-share | PASS. No comp-as-requirement language. |
| Detection evasion | PASS. |
| Coaching Upwork competitors | PASS. |
| Worker-location requirement | PASS. None stated. |
| Flat-fee portfolio owner | PASS. |
| **Ad spend (min $5K/mo)** | **OPEN. No budget stated anywhere.** Not a DQ because it is unstated, not stated-low. Asked in the body as a relative range. |
| **Geo (US/CA/UK/AU)** | **OPEN. No region stated.** Ambiguous, not a DQ. Asked in the body. |
| **Listed hourly rate vs $40/hr floor** | **UNVERIFIED.** The pasted post carries no rate or budget field. Screen the bottom of the range on Upwork before submitting. |
| Vertical | **NOT STATED.** No industry named, so no vertical proof can be selected. Proof is platform-breadth only. |
| **Engagement duration** | **UNVERIFIED.** "Part-time" is stated, duration is not. A sub-1-month engagement does not fit the % of spend retainer model even when the rate clears. Check the job detail page. |
| **Payment method verified** | **UNCHECKED.** Cannot be read off a pasted description. Unverified payment is an AUTO-DQ, so confirm on the job page (use public "total spent" as the proxy if logged out) before submitting. |

## Case study matching

`match_proposal_context()` returned only two candidates, Big Chad Law and BDC App, both at `relevance_score: 1`
against a threshold of 3. Per the agent spec, no case study is forced and none is referenced or attached.

## Verified facts used in the draft

- **Eight active clients run Google and Meta concurrently** (live `reporting_clients` query, 2026-09-03):
  Doctor Laleh (google+meta+tiktok), Myriad Traders, Nightlark, Retirement Income Solutions, Scattered Kind,
  The Tooth Co (google+lsa+meta), Tiami, Vida Dentistry. Verticals present: ecommerce, dental, financial services.
  This is a **capability** claim. No ROAS or CPA is attached to it.
- **Samuel = 6 years** paid-ads experience.
- No certifications claimed. None exist system-wide.
- No links, no calendar link, no contact info.
- Aura's branded-search figures were deliberately **excluded**: Aura is Google-only with no Meta account, so using
  it to illustrate Meta-created demand would be a false causal link.

## PROPOSAL (paste-ready)

Budget allocation between Google and Meta is where most accounts quietly leak money, and it is rarely a targeting
problem. Google's last-click reporting takes credit for demand that Meta created, so Meta reads as the weaker
platform, gets trimmed first, and then branded search volume on Google slides a few weeks later with nobody
connecting the two events.

So the data-driven adjustments that matter most in a two-platform account are not the in-platform ones. Before
touching structure, three things are worth settling: what a conversion is actually worth to you, whether Meta gets
judged on platform-reported numbers or on blended cost per acquisition, and what your branded search trend looks
like month over month. That last one is the cheapest read available on whether Meta is doing work that Google is
getting paid for.

On the tradeoff side, proving any of that cleanly is slow. A geo holdout or a deliberate Meta pause gives a real
answer but costs three to four weeks, and in-platform optimization has to sit fairly still while it runs. Moving
faster is possible, it is just less certain, and which one you want is your call rather than mine.

A few things that would change the approach: what you sell and what a customer is worth to you, which regions you
run in, and roughly what monthly range you are working with per platform. On that last point, a specific
recommendation is useless out of context. Naming a number that sits nowhere near your range helps neither of us,
so the range comes first.

For context, the book I work across has eight accounts running Google and Meta side by side right now, spanning
ecommerce, dental and financial services. Six years doing this.

Happy to hop on a quick call and dig into the account if that sounds useful.


Samuel
