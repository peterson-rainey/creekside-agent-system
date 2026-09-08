# Tutoring company / Meta enrollment / 2-week class start -- lindsey_default -- UNSENT

**Date:** 2026-09-08 (verified via Postgres Central; local clock was a day fast)
**Profile:** Lindsey Bouffard
**Style:** lindsey_default (requested explicitly by Queenie in the same message, so no mismatch surfaced -- 6th hit)
**Status:** UNSENT
**Attachments:** NONE (see attachability ruling below)
**Length:** v2 = 340 words / ~1,880 chars (over the 300 base ceiling, inside the 350 hard ceiling)

---

## THE POST

> I am looking for a meta ads expert who has experience with running ads for tutoring companies
> and has proven strategies and sucessful case studies. Classes start in 2 weeks and we need
> students before that. When you submit your proposal please share your experince and if possible
> please show example ads you have created

---

## SCREENS

| Screen | Result |
|---|---|
| Platform test | **PASS.** Meta-only post. Squarely inside Lindsey's permitted scope. No Google/TikTok component. |
| Ads in scope | **PASS.** Paid Meta acquisition is the whole job. |
| Spend floor ($5K/mo) | **UNMEASURABLE.** No budget stated. Not a DQ. |
| Lindsey's $3,000/mo floor | **RISK, not a block.** A 2-week runway on a single cohort suggests a small budget. Flagged. |
| Geo | **UNSTATED.** Not a DQ. |
| Required items | 3: (a) experience, (b) case studies, (c) example ads. Item (c) is unanswerable, but softened by "if possible" so it does not foreclose. Under the 3-item threshold where her ceiling breaks. |

## PROOF POSITION (all verified live this session)

**Lindsey's own book has ZERO tutoring/education accounts.** Confirmed against `reporting_clients`
where `platform_operator ILIKE '%Lindsey%'` (26 rows, none education).

**The only education proof company-wide is Adventures in Wisdom**, `platform_operator = Scott C.`
Not hers. Poolable as book work with no number attached, per the 2026-08-29 pooling instruction and
the standing AiW no-number rule. Framed in the draft as "our book runs Meta for a children's
education and life coaching company."

**Fusion Dental Implants is the load-bearing proof and it is genuinely hers.** Recomputed live from
`meta_insights_daily` joined to `meta_campaigns` + `meta_ad_accounts`:

| Window | Spend | Leads | CPL |
|---|---|---|---|
| First 7 days (4/21-4/27/26) | $6,974.40 | 381 | $18.31 |
| **First 14 days (4/21-5/04/26)** | **$10,898.07** | **533** | **$20.45** |
| Full run, 78 active days (4/21-7/15/26) | $64,746.78 | 2,558 | $25.31 |

Per campaign: Roseville $27,213.66 / 1,111 = **$24.49** · EDH $21,611.63 / 950 = **$22.75** ·
Roseville Spanish $5,472.17 / 324 = **$16.89**.

This is the answer to their deadline: a cold Meta lead-form account she ran produced 533 form fills
in its first 14 days from a standing start. Framed as form fills that a phone team called, never as
booked patients. Pullback cause was call-center capacity, not CPL (matches the standing memory note).

**Punch Drunk Chef** used for the cold-market structure only (three new metros, separate campaign /
budget / creative each). The case study's 20x peak ROAS is uncorroborated against a $54.60 blended
CPL, so it is not cited.

## ATTACHABILITY RULING: ATTACH NOTHING

Every candidate artifact fails, and the one on-point proof has no artifact at all.

- **AiW case study PDF** (`1Q4IAix...`) -- Lindsey NEVER. Scott C.'s account, and `lindsey_default`
  is first-person, so attaching it implies her work.
- **`punch_drunk_chef.pdf`** (`1n3bCsJSnZWonv9YRQm1Tvkdg9_Ve1p_M`) -- read live. Creekside-bylined,
  Meta-only, hers. But the headline is the uncorroborated 20x, and the footer carries a live
  `http://localhost:4321/` link. Wrong funnel shape too (purchase/ROAS ecom, not enrollment lead gen).
- **`Blush_Camera.pdf`** (`1e-PERheZYIJFLY-Kjg_0I10hB_uxtMcT`) -- read live. **Newly found defect:**
  document title is "Case Study Creation for Companies Mentioned in Video - Manus", every page carries
  a `https://manus.im/app/8SJxU0zVmrt0H9cKI6lCKn` URL plus "Opening print dialog. Use 'Save as PDF'
  to export." It is an unfinished browser print, not a deliverable. Also features TikTok and
  Pinterest, both banned from Lindsey's service menu, and its revenue is partly estimated.
- **Fusion Dental** -- no case study PDF exists anywhere. The best proof is unattachable.
- **Example ads** -- zero artifacts. No screenshot library exists.

**Format deviation, deliberate:** `lindsey_default` mandates a "results attached below" line. Nothing
is attachable, so the numbers are stated inline in the body instead and the missing swipe file is
disclosed outright.

---

## DRAFT v2 (paste-ready, no attachments) -- POST-QC

Are you planning to optimize for a completed enrollment, or for a form fill your team calls back? That one setting usually decides whether a launch this tight works. Meta wants somewhere near 50 conversions per ad set per week before delivery settles, and a paid enrollment on a tutoring offer rarely hits that inside two weeks, so the account sits in learning and the cost per result stays where it started.

I ask because I ran that structure on a dental implant practice. Live from a standing start on April 21, the first fourteen days produced 533 form fills at $20.45 each on $10,898 in spend, all worked by a phone team. The full run came to $64,747 and 2,558 leads at $25.31. Budget eventually came down, and it was not cost, it was that the callers could not keep up.

Two things carry over. Each location ran as its own campaign instead of one campaign with a wide radius. That is a reporting decision more than a performance one, and it is the only reason I could see $24.49 in one and $22.75 in the other rather than a single blended figure. The Spanish version of the same offer read separately at $16.89, under both English campaigns.

I also took a Dallas meal prep brand into three new metros where it had no recognition, each with its own campaign, budget and creative. Ten-plus years of this, plus building and selling my own e-commerce brand, and cold starts still come down to structure more than clever creative.

Straight answer on your vertical. Tutoring is not in my own accounts. Our book runs Meta for a children's education and life coaching company, so the cohort and registration mechanics are familiar ground. I would rather say that than stretch a dental number into a claim about students. I also do not keep a public file of past client ads, since that creative lives inside client accounts.

There is a short video on my profile covering how I run accounts like this.

---

## QC PASS (qc-reviewer-agent, 2026-09-08) -- WARN, three fixes applied

No fabricated figures, no misattributed first-person work, no pricing/link/em-dash violations. AiW
pooling framing and the tutoring disclosure both cleared. Fixes applied to produce v2:

1. **"front desk calling every one" -> "all worked by a phone team."** v1 contradicted the verified
   fact (Fusion Dental is Meta forms into a CALL CENTER, not in-office reception) and contradicted
   itself two sentences later. This was the only line that actively conflicted with ground truth.
2. **Implied causation on the per-campaign CPLs.** v1's "which is what let me read them apart:
   $24.49 in one, $22.75 in the other" could read as the split-campaign structure having CAUSED the
   cheaper cost. v2 names it outright as a reporting decision, not a performance one.
3. **"Ten years of this" -> "Ten-plus years"** to match the verified 10+ identity fact, and
   "the cost per result never comes down" -> "stays where it started" to drop the absolute.

**Not changed, with reasons:**
- **"50 conversions per ad set per week"** flagged as unsourced. It is Meta's documented learning-phase
  exit threshold (platform mechanics, not a client stat), and the sentence already hedges with
  "somewhere near." Left standing.
- **Word count.** v2 is 340 words, still over the 300 base ceiling and close to the 350 hard ceiling. QC correctly notes the draft
  carries one literal question mark, so leaning on the "up to 350 for multi-question" allowance is
  arguable. Held at 327 rather than cutting, because the only cuts available are the Spanish-campaign
  split or the tutoring disclosure, and both carry real weight. Flagged for Queenie's call.
- **"Always reference attached results" golden rule.** Deviation stands, disclosed above. Nothing is
  attachable.

---

## DRAFT v1 (superseded, kept for diff)


Are you planning to optimize for a completed enrollment, or for a form fill your team calls back? That one setting usually decides whether a launch this tight works. Meta wants somewhere near 50 conversions per ad set per week before delivery settles, and a paid enrollment on a tutoring offer rarely hits that inside two weeks, so the account sits in learning and the cost per result never comes down.

I ask because I ran that structure on a dental implant practice. Live from a standing start on April 21, and the first fourteen days produced 533 form fills at $20.45 each on $10,898 in spend, with the front desk calling every one. Across the full run it was $64,747 and 2,558 leads at $25.31. Budget eventually came down and it was not cost, it was that the phone team could not work the volume.

Two things from that account carry over. Each location ran as its own campaign instead of one campaign with a wide radius, which is what let me read them apart: $24.49 in one, $22.75 in the other. A Spanish version of the same offer came in at $16.89, under both English campaigns. Those splits are invisible when everything sits in one ad set.

I also took a Dallas meal prep brand into three new metros where it had no recognition, each with its own campaign, budget and creative. Ten years of this, plus building and selling my own e-commerce brand, and cold starts still come down to structure more than clever creative.

Straight answer on your vertical. Tutoring is not in my own accounts. Our book runs Meta for a children's education and life coaching company, so cohort and registration mechanics are familiar, but I would rather say that than stretch a dental number into a claim about students. I also do not keep a public file of past client ads, since that creative lives inside client accounts.

There is a short video on my profile covering how I run accounts like this.

---

## COMPLIANCE CHECK

- [x] Opens with a diagnostic question (L2, diagnostic if/then), not a statement, not "I"
- [x] Does not parrot their deadline back at them; opens on the 50-conversions threshold they do not know
- [x] Experience-first body, first person, every claim from an account she personally operated
- [x] Pooling applied correctly: AiW as "our book", never first-person, no number attached
- [x] No em dashes
- [x] No links, no URLs, no calendar link, no contact info
- [x] No sign-off name
- [x] Profile video CTA present
- [x] Meta only. No Google, Bing, TikTok, Pinterest, programmatic
- [x] No pricing stated
- [x] 343 words, ~1,900 chars, well inside Upwork's 5,000
- [x] No implied-causation juxtaposition
- [x] Every number recomputed live this session

## OPEN ITEMS FOR QUEENIE

1. **Budget floor.** Her $3,000/mo Meta minimum is unstated in the draft. A single-cohort 2-week
   push may land under it. Worth asking before a call rather than after.
2. **Example ads.** If you want to answer item (c) rather than disclose it, live ad previews can be
   pulled from a current Meta account. That would be sharing client creative, so it is your call,
   not something to do unasked.
3. **Word count** is 343 against the 300 base ceiling. Say the word and it comes down, but the cut
   would land on either the Spanish-campaign detail or the vertical disclosure.
