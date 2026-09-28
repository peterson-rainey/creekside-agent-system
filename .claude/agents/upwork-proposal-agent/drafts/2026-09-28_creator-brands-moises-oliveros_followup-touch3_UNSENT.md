# Upwork follow-up touch 3: Moises Oliveros, creator brands media buyer

- **Profile:** Peterson (displays "Peterson Rainey"). **Status:** UNSENT. **Date:** 2026-09-28 (Mon, confirmed via Postgres now(), 09:11 America/Chicago)
- **Thread state:** touch 3. Our last message Mon 2026-09-21. Seven days silent. He asked for a call 9/15, was sent Cade's link, never booked, never replied. Prior two follow-ups (9/17, 9/21) were both substantive value touches.
- **Send ONE variation only.**

## MATERIAL CONTEXT — read before sending

**He already declined us on a recorded call.** `fathom_entries` `25554152-72eb-45bf-b3b2-6a697c027b47`,
"30 min with Lindsey (Moises Oliveros)", 2026-09-17 13:51 Central, participants Moises Oliveros +
Lindsey Bouffard. Raw transcript pulled (diarization labels are scrambled; substance is not):

- Moises runs an organic marketing agency (YouTube primary, plus IG/FB/TikTok/X/LinkedIn), funnels,
  VSLs, landing pages, tracking, internal sales team. Paid ads live for TWO clients, planned as an
  add-on for every client going forward. He does all the media buying himself and is unhappy with his
  current buyer's communication and ownership.
- Creekside disclosed the model on the call ("I do work with a marketing agency... we charge a fee per
  client that we manage") and self-DQ'd ("I don't know if that's a good fit then").
- Moises: **"We were looking for someone internal."** Mutual, amicable close.

`upwork_leads`: Lindsey row `dcd1f747` = **lost**. Cade row `7515944f` = **follow up pre-call** (STALE,
predates the call, date_last_contacted 2026-09-17).

Queenie was shown this and chose **"Draft follow-up #3 anyway"** (same disposition as 9/15). Neither
variation references the call, any other Creekside person, or anything outside the Peterson thread.

## Open flags

- **Pay figure conflict:** this session's pasted post says **$3,000/month base**; the 9/15 draft's screen
  notes say **$2,000/mo** twice (lines 7 and 46). Possible edit or repost. No `upwork_jobs` row exists for
  this job, so neither can be confirmed from the DB. Neither draft cites a pay figure.
- Calendar link deliberately NOT re-pasted; he already has Cade's and did not use it.
- No `sdr_generation_log` INSERT (contractor mode; `contractor_query` cannot INSERT).

## Review

sdr-agent generated 2 variations (touch types 1 and 2, no repeat of the type-5 data-ask used on 9/17 and
9/21). qc-reviewer-agent: **PASS WITH FIXES** on both. Fix applied to both: the closing question asked
about "the role" / "the seat", which contradicts our own 9/15 message ("I'm not a solo buyer, or a
40-hour hire... we work on a percentage of spend rather than base pay"). We already declined the posted
structure, so asking whether it is still open re-asserts interest in it and edges toward parroting his
job-post wording. Both now ask about the paid ads work instead. B's question was additionally rewritten
off losing polarity ("did you end up getting someone" hands him a one-word thread-closing yes).

QC optional, not applied: adding "rather than cost per lead" to B's bridge for parity with A. Left off to
keep the two variations distinct; B's bridge is accurate as written.

## Paste-ready — VARIATION A (recommended, 29 words incl. greeting)

Hi Moises,

My last note was on comparing the funnels on cost per show rather than cost per lead. Is the paid ads work still open on your end?

## Paste-ready — VARIATION B (30 words incl. greeting)

Hi Moises,

The last thing I sent was on putting the funnels side by side on cost per show. Are you still looking for help on the paid ads side?
