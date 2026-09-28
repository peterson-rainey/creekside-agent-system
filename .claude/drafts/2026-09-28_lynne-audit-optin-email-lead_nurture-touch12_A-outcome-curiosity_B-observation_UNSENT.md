# Lynne (lynnecherarizabal@gmail.com) — nurture touch 12 — UNSENT

**Date drafted:** 2026-09-28 (confirmed via Postgres `now()`; local clock unreliable)
**Mode:** pre-call nurture · **Profile:** Creekside email (not Upwork, no persona)
**Status:** UNSENT — send ONE version only, not both.

## Recipient facts (verified 2026-09-28 via execute_sql)

- Record is **blank**: zero rows in `leads`, `upwork_leads`, `clients` for her email, name, or any business.
- No vertical, website, monthly spend, platform, discovery call, or transcript.
- Appears only as one of five recipients on a bulk 2026-02-03 "Peterson here, just checking in" blast
  (`gmail_summaries` 866779bc-5ac4-400c-91b1-2cdd160cc4b9, 86bb79ce-f36d-4298-bde0-3e18e0dbf9eb).
  Same batch as MD Mehedy Hasan, Fazogir, Iryna, Naveen.
- Opted in for the Google + Facebook Ads audit worksheets.
- **Zero inbound across ~11 touches in 8 months.** No call ever happened.
- No pre-existing draft for her anywhere in the repo or git history (searched 2026-09-28).

## Two errors already SENT in this thread (do not repeat, do not correct in copy)

1. **"One Final Treat" is not her brand.** It is Creekside's own subject line
   ("One Final Treat - Google Ads Bid Calculator"). A sent touch wrote "for a brand like One Final Treat".
   Verified: zero rows matching `%final treat%` in `clients` or `leads`.
2. **"7x baseline to 40x+ peak ROAS on $8K/month Meta"** is Fitness Superstore's case-study line and is
   unverifiable in principle: zero rows in `meta_insights_daily`, no row at all in `meta_ad_accounts`,
   `reporting_clients.monthly_budget` says $3,000 not $8,000, churned 2026-02-15. The same touch offered
   to send "the short write-up" built on it — there is nothing defensible behind that offer.

## Angle state (pre-call nurture rotation)

- Angle 1 outcome curiosity — used by Version A.
- Angle 2 exact-niche fresh win — **SKIPPED**, vertical unknown (same-vertical-or-skip).
- Angle 3 performance-pricing card — **unused, preserved** for a later touch (one use per lead, ever).
- "You opted in for the audit sheets" anchor is spent (used in touch 11), not reused.
- No link in either version: every resource has already been sent.

---

## VERSION A — outcome curiosity (QC: PASS)

**Subject:** reply on thread (`Re: The Part Worth keeping`)

Hey Lynne, my last note was on why new creative stalls when it gets tested inside a winning ad set.

Different question, and nothing to look up: did anything ever turn up as the real problem in the account, or did it come back clean?

- **Final question:** "did anything ever turn up as the real problem in the account, or did it come back clean?"
- **Final sentence:** "Different question, and nothing to look up: did anything ever turn up as the real problem in the account, or did it come back clean?"

QC flag (not a defect): the question presupposes she runs an ad account. Unconfirmed, but consistent with
sequence precedent — touch 11 asked her spend outright. "The account" over "your account" is deliberate and
QC endorsed it. Optional hedge if wanted: *"if that ever got looked into, did anything turn up as the real
problem, or did it come back clean?"*

---

## VERSION B — done-for-them observation (QC: PASS WITH FIXES, applied)

**Subject:** how to tell which test actually won

Hey Lynne, my last note was about giving testing its own small campaign instead of running it inside the winner.

The piece that decides whether any of that pays off is how you call the winner. The default is to hand it to the ad with the best click-through rate, because that number moves first and it moves fast. Cheap clicks and cheap customers aren't always the same ad though. The CTR winner can turn out to be the expensive one once enough conversions land to separate them. Worth holding the call until each variation has real volume behind it, then making it on cost per result and nothing above that.

If you're already testing that way and seeing something different, I'd want to hear it.

- **Final question:** none — B deliberately ends on a statement (nurture.md line 86: not every touch needs a question).
- **Final sentence:** "If you're already testing that way and seeing something different, I'd want to hear it."

**QC fix applied:** "are rarely the same ad" → "aren't always the same ad"; "often turns out to be" → "can turn
out to be". Reason: "rarely"/"often" are frequency claims with no data behind them, same category of problem as
an unverifiable number.

QC flag (not a defect): B's new subject line unthreads it, so the "my last note" bridge has nothing visible for
her to scroll to. Tradeoff against re-earning an open on a stale unanswered chain.

---

## Recommendation

**Version A**, per sdr-agent and the touch-library data: bare curiosity questions revived 76% of dead threads
against 7.6-18% for resource blasts. Touch 11 was already a full insight plus a direct question, and B is a
second helping of the pattern that has drawn zero replies across four attempts. A costs her one word, needs no
account access, and rides the existing thread. Hold B as the next touch if A draws silence.

Queenie asked for both side by side to choose from — nothing sends without her pick.
