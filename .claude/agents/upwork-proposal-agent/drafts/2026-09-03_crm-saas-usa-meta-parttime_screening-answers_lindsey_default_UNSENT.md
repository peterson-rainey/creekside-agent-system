# Screening Answers — CRM SaaS (USA), Meta Ads, Part-Time
Profile: Lindsey | Style: lindsey_default | Date: 2026-09-03 | Status: UNSENT
Companion to: 2026-09-03_crm-saas-usa-meta-parttime_lindsey_default_UNSENT.md

## Questions (verbatim)
1. Please share a recent or ongoing similar project result.
2. How long does it take for your to get first 100 saas clients?

---

## Answers (paste-ready)

**1. Please share a recent or ongoing similar project result.**

The closest recent one is a referral SaaS platform we picked up right after their seed round. I ran the paid
social side, our team ran search, and Meta was built to create the consideration rather than close anything.
Over the following six months their inbound leads and ARR both doubled. Worth saying plainly that this was a
full funnel result rather than Meta on its own, and the engagement ended earlier this year.

Ongoing, I manage Meta for a CRM platform right now. I am not going to put a live client's numbers into a
proposal, and I would give you the same answer if you hired me and someone else asked about yours. What I will
tell you is that CRM is a genuinely hard category on cold paid social, harder than most of what I run, and the
accounts I have seen struggle all struggle in the same spot. It is the gap between someone who signs up and
someone who actually moves their pipeline into your product.

**2. How long does it take for you to get first 100 saas clients?**

Nobody can give you that number without two things I do not have yet, and I would be careful with anyone who
answers it quickly.

Getting to 100 paying customers is arithmetic once you know your price point and what share of signups convert.
If a seat is worth a few hundred a year, cold Meta has to acquire very cheaply to work at all, and that turns
into a volume and creative problem. If a seat is worth a few thousand, the math opens up and the real
constraint moves to your sales follow up rather than the ads. Those are two different builds and the timelines
that fall out of them are nowhere near each other.

What I can speak to is the part inside my control. At $3,000 a month minimum on Meta, the first sixty to ninety
days is about producing an acquisition cost you can actually trust, with tracking set so a signup and a paying
customer are separate events instead of one blurred number. Once that number exists, 100 customers stops being
a guess and becomes division.

So two questions back at you. What does a customer pay you monthly or annually, and out of every hundred people
who sign up today, roughly how many are still paying at ninety days?

---

## Screening notes (internal, not part of the answers)

**Q1 is the constrained answer. Read this before sending.**

Verified the full `case_studies` library this session (28 rows, pulled in full). **ReferPro is the ONLY row with
`industry_key = 'saas'`.** There is no second SaaS result to choose from, which confirms canon rather than
revising it. So Q1 had exactly one citable option and it carries three caveats, all of which are disclosed in
the answer itself rather than papered over:
- It is **blended Google + Meta**, not Meta alone. `reporting_clients` shows two ReferPro rows, `meta` operated
  by Lindsey B. and `google` by Ahmed I. The answer says "full funnel result rather than Meta on its own."
- It is **churned** (2026-04-06, about five months ago). The answer says "ended earlier this year" rather than
  implying an active client.
- **Live-data gap, flagged again:** `meta_insights_daily` holds ONE day for ReferPro (2026-04-16, $131.62,
  84 clicks). The doubling claim rests on the sanctioned `case_studies` row with no live corroboration. It is
  worded exactly as canon words it, with no invented figure.

**Quivr handling (the live CRM account).** `reporting_clients` confirms active, "Quivr CRM Main", Lindsey B. as
operator and account manager, $3,000/mo. Live pull: **$18,307.25 spend, 8,052 clicks, 3 conversions** over
2025-09-03 to 2026-09-02. Cited as an ONGOING ENGAGEMENT, never as a result, and no number from it appears.
Two reasons, both real: the standing uncitable ruling, and the fact that publishing a live client's poor
performance to a prospect is a confidentiality problem regardless of what it does to the pitch. The answer
declines on the confidentiality ground and then immediately concedes "CRM is a genuinely hard category on cold
paid social, harder than most of what I run," so nothing in the phrasing can be read as an implied win.

**Considered and deliberately left out: Birthday Club App** (2,662 installs, CPI cut 47% from $7.36 to $3.90,
Meta only, Lindsey-adjacent). It is a real citable Meta cost-per-signup reduction, but it is a consumer birthday
app driving installs, not SaaS driving paid seats. Including it would have padded a thin answer with a
dissimilar shape, which is what the question is screening for. Available if you want it, but I would not.
Note it is also churned and its PDF now 404s, so it could never be attached.

**Q2 is an unanswerable-by-design question and is answered as one.** Any timeline to 100 customers is
fabrication without their price point and signup-to-paid rate. Rather than guess a number that would become a
commitment, the answer gives the arithmetic, names the two missing inputs, commits only to producing a
trustworthy acquisition cost in the first sixty to ninety days, and asks the two questions back. No promise of
100 customers appears anywhere.

**Budget rules applied:** $3,000/mo Meta floor stated, per Lindsey's minimum. Volunteering a budget figure is
normally avoided first-touch, but Q2 is a volume-over-time question that cannot be answered without spend, so
the floor is directly relevant here rather than unprompted. No fee or pricing for our services is quoted.

**Screens unchanged from the proposal:** no auto-DQ. Meta is the scope, geo is USA, part-time is not a
full-time seat, direct client not white-label. Spend still OPEN and asked. Hourly rate still unstated.

**Formatting check:** zero em-dashes, zero bold inside the answers, plain prose. Numbered headers used only
because the client posed a numbered list and each answer maps to one question, which is the sanctioned
exception. No links, no calendar link, no pricing, no sign-off name, Queenie not named.

**DB log step NOT performed:** `upwork_proposal_logs` INSERT is impossible from contractor mode
(`contractor_query` is SELECT-only; writes raise 42601). Flagged rather than bypassed.
