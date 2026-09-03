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

**Attachment decision, after a byte-level sweep of all 8 dual-platform rows (2026-09-03): attach nothing on this
first touch.**

The matcher ranks on industry keywords and this post names no industry, so there is nothing to match on. Ranking
instead on the one thing the post does specify, Google + Meta management, and then testing whether each file is
actually attachable:

| Case study | Downloads as | Verdict |
|---|---|---|
| Dr. Laleh | HTML sign-in page | Unattachable. Would have been the best proof, a real CAC reduction on both platforms |
| ReferPro | HTML sign-in page | Unattachable. Best thematic match, "Meta for awareness, Google for demand capture" |
| Adventures in Wisdom | HTML sign-in page | Unattachable |
| LawnValue | HTML sign-in page | Unattachable |
| Advanced Med Spa | HTML sign-in page | Unattachable |
| Big Chad Law | HTML sign-in page | Unattachable, and its $20K/mo figure is unsupported anyway |
| South River Mortgage | REAL PDF | **Do not send.** Churned 8/11/26; the PDF's numbers contradict canonical `case_studies`, and the canonical $81 CPL itself fails live verification |
| BDC App | REAL PDF | Real file, but its only documented result is "Digital marketing campaign for a B2B/B2C application". No outcome, adds nothing |
| Central Florida Awnings | REAL PDF, verified by rendering it | The only defensible option. See below |

Drive answers these with HTTP 200 and ~908KB of sign-in HTML, so a naive download "succeeds" and writes an HTML
page named `.pdf`. Attachability was confirmed on the `%PDF-` magic bytes, not the status code.

**Central Florida Awnings is the one to hold, not the one to send yet.** Rendered and read: a genuine
Creekside-branded study, "How Florida Awnings Ran Google + Meta Ads Across 3 Florida Service Areas", 3 entities,
$7.2K+ combined monthly budget, 85 audit criteria. It is the best-shaped proof we own for this exact job, because
allocating budget across Google and Meta over three territories is what it documents, and that is the proposal's
hook. The problem is the anchor: $7.2K across three entities is about $2.4K each, below our own $5K/mo screen. On a
post with no stated budget, sending it pre-commits us to the low end before they answer the range question the
proposal asks. Hold it, get the range, then send it only if the range is in that neighborhood.

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
problem. Monitoring each platform on its own reported performance makes Meta look like the weaker one, because
Google takes credit for demand that Meta created, and the adjustment that follows is to trim the wrong budget.
Branded search volume on Google then slides a few weeks later with nobody connecting the two events.

So the data-driven adjustments that matter most in a two-platform account are not the in-platform ones. Before
touching campaign structure, three things are worth settling: what a conversion is actually worth to you, whether Meta gets
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

## QC

`qc-reviewer-agent`, 2026-09-03: **PASS.** Zero hallucinations, zero unsupported claims, zero forbidden names, zero
mechanism/number causal juxtaposition, full compliance on length, em-dashes, markdown, bullets, links, opening word,
sign-off, book-pooling and the budget-ask rationale. It also checked the draft against the canonical style file
`.claude/agents/upwork-proposal-agent/docs/samuel-strategic.md`.

One craft defect raised and **fixed after review**: the original second sentence ("Google's last-click reporting
takes credit for demand that Meta created...") drifted into agency jargon that appears nowhere in the job post,
which matters because the client sees only a 1-2 sentence preview before deciding whether to click. Rewritten to
sit on the post's own nouns, "monitoring", "performance", "adjustment", "budget", with the insight intact. Also
threaded "campaign structure" into the second paragraph.

QC's other note was non-blocking and needs no change: the draft carries no literal question marks, but the
canonical rule is disjunctive ("Ask questions, flag tradeoffs, or offer two paths forward") and the draft satisfies
it via an explicit tradeoff plus two paths.
