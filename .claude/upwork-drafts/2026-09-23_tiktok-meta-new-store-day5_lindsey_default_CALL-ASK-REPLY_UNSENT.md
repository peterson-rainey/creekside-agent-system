# Upwork REPLY: "TikTok, Meta ads" — new store, day 5 TikTok, call ask

- **Profile:** Lindsey | **Style:** lindsey_default | **Type:** call-ask reply (lead)
- **Date:** 2026-09-23 (Postgres `now()`, Wed, 8:46am US Central) | **Status:** UNSENT
- **Job:** `a669116e-bf51-4b34-a7fc-443c01ae4575` "TikTok, Meta ads", US / Washington state (Pacific)
- **Proposal sent:** 2026-09-17, `sheet_row_num` 482, 3,594 chars — CONFIRMED SENT (stored cover letter matches the draft; nouns match the job, no +5 row offset issue)

## INBOUND (verbatim)

> Hi Lindsey
> Do you have time for a call today, I have a new store and would like some ad advice, I didn't start meta yet but started tiktok GMV (on day 5). Let me know, thanks!

## THE READ

Our proposal closed on a COMPOUND question: "Roughly what are you spending a month right now, and is that split across both platforms already, or is TikTok the new one?"

They answered the **platform-split half** (TikTok new, day 5, Meta not started) and gave **no spend number**. So spend has been asked once and not answered. That is the documented trigger condition for the spend-first gate (Queenie 9/2, Peterson 9/3) — hence two variants below.

---

## VARIANT A — yes + link + one bare question (QC's pick, and mine)

```
Yes, happy to talk. Calendar's here: https://calendar.app.google/p4sWgHuykdV5kYHh8

Roughly where's the monthly ad budget headed, closer to $2,000 or $6,000?
```

- Word count: 21
- **Final question:** `Roughly where's the monthly ad budget headed, closer to $2,000 or $6,000?`
- **Final sentence:** `Roughly where's the monthly ad budget headed, closer to $2,000 or $6,000?`

## VARIANT B — yes + bare spend question, calendar link HELD

```
Yes, happy to talk. First though, roughly where's the monthly ad budget headed, closer to $2,000 or $6,000?
```

- Word count: 19
- **Final question:** `First though, roughly where's the monthly ad budget headed, closer to $2,000 or $6,000?`
- **Final sentence:** `First though, roughly where's the monthly ad budget headed, closer to $2,000 or $6,000?`

---

## QC RESULT

`qc-reviewer-agent`: **both variants PASS** all 11 enumerated rules. One substantive catch, applied:

- **The bracket leaked the $5K floor.** Both drafts originally read `under $5k, $5-15k, or higher`, printing our internal AUTO-DQ line as a literal labeled boundary. Verified against `feedback_budget_ask_relative_range.md`: the no-incumbent precedent (Sunshine) straddles with **$2,000 vs $6,000** and never names $5K; only the incumbent-agency case says "$5,000" aloud. There is no incumbent here, so the straddle is correct and the number must not be printed. Changed to `closer to $2,000 or $6,000`, which matches the validated precedent form exactly.

QC verdicts on the other questions: "First though" is a sequencing marker, not a disguised justification (PASS). Withholding ad advice is correct, not non-responsive — the advice is the call's content. Silence on "today" is not a gap, since rule 7 forbids promising it.

## CALENDAR LINK

`https://calendar.app.google/p4sWgHuykdV5kYHh8` — curl-verified live 2026-09-23, HTTP 200, title "30 min with Lindsey". Prospect is Washington state (Pacific), same zone as Lindsey (`America/Los_Angeles`); her ~9:00am-2:30pm Pacific Tue-Fri window sits inside their working day, so the APAC dead-zone problem does not apply. Today is Wednesday, in-window.

## OPEN FOR QUEENIE

1. **A or B.** A books the call now and qualifies alongside it. B holds the link until a spend number comes back. The standing rule is "book first, never gate booking on spend"; the gate is the documented exception and its trigger (spend asked, not answered) is literally met here. Recorded cost of gating: on Eddy Jellal 9/3 the prospect asked for a call, got a gate, and went quiet for the weekend.
2. **Sub-$5K DQ risk is high.** Brand-new store, 5 days into its first platform, second not launched. If the answer comes back under $5K this is an AUTO-DQ. Worth knowing before Lindsey spends a slot.
3. **Upwork circumvention conflict, still unresolved (Peterson).** Upwork's own help text, verified verbatim 2026-09-16: sharing a meeting link before a contract starts is circumvention. Creekside `company_rules` #21/#37 and Queenie's 8/27 ruling say paste it. Variant A carries the link; Variant B does not. Compliant fallback exists (Upwork's native in-thread scheduler, used successfully 9/10).
4. **They asked for "ad advice" and neither variant gives any.** Deliberate per the call-ask shape.
5. **TikTok proof gap** was already disclosed in the sent proposal ("it isn't in my account history"). There is still zero citable TikTok spend/CPA/ROAS anywhere in the system. Nothing in either variant implies otherwise.
6. **Not logged** to `upwork_proposal_logs` / `sdr_generation_log` — `contractor_query` cannot INSERT.
