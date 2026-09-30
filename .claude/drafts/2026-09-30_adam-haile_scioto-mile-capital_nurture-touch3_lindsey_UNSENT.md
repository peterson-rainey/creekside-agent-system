# Upwork nurture: Adam Haile (Scioto Mile Capital), Lindsey thread, touch 3

- **Profile:** Lindsey | **Type:** pre-call follow-up, touch 3 | **Drafted:** 2026-09-30 ~11:10 Central | **Status:** UNSENT
- **Date note:** Postgres `now()` and the shell clock both read **Wed 2026-09-30**. The harness clock read 2026-10-01 and is the outlier. All spacing below is computed off 9/30.
- **Timing is clear.** 7 days since touch 2, inside the window. No hold this time.
- **QC:** sdr-agent drafted both; qc-reviewer-agent FAILed both on one edit each, all applied. Then I ran the Samuel-room leak diff QC could not run (no DB access), which **forecloses Response B**. See below.

## Thread state (verified from `upwork_conversations`, lindsey room, 6 messages)

1. Lindsey's proposal 7/28.
2. **Adam H. 7/28: "Thanks fro applying. Are you available later today to discuss?"** — his ONLY reply, ever.
3. Lindsey 7/28: "Yes, today works" + calendar + offered to bring specific questions.
4. (empty message = Upwork meeting-invite artifact). **Never booked, no call ever.**
5. Touch 1 SENT 9/21 ~10:34 CT (bare status question).
6. Touch 2 SENT 9/23 ~8:43 CT (test-dilution observation), **diff-confirmed verbatim** against the draft.

**Four consecutive outbound from us.** `upwork_conversations` last_message_at 2026-09-23T13:43:30Z, synced 9/24. No reply.

## Tracker is STALE (worth a fix)

`upwork_leads` 822f3a59 (Lindsey): `date_last_contacted` still **2026-09-21**, `due_date` still **2026-09-23**, both now past. last_synced_at 9/23 04:16 CT ran *before* the 08:43 send, so touch 2 was never recorded. `upwork_outbound_messages` has **zero rows** for this thread, so the 9/23 send is unlogged.

`upwork_leads` 4b4ac38e (Samuel/General): status nurture, **due 2026-10-06**, `date_last_contacted` 2026-08-07, `referred_to` still **"Scott"** and stale since the 8/7 Keith handoff. **Double-touch risk:** a Lindsey touch now plus the Samuel row firing 10/06 reaches Adam twice inside a week, from two "freelancers".

## RESPONSE 1: RECOMMENDED SEND (Lindsey's own leads-visibility story)

Hi Adam,

I wrote last time about tests spread across so many audiences that the report keeps coming back undecided on most of them. The other version of that problem is a number that looks definite and isn't.

In August a client told me his leads had fallen off, one online request in the past half week. I could see over 50 people had filled out forms, sitting in his CRM as contacts and never reaching the pipeline, so they were invisible where he was looking. I pointed him to where the leads were sitting in Business Manager, he confirmed he could see them, and said he was having his manager call them all. The cause was a sync issue on the CRM side.

Is anyone checking that the lead count in the report matches what actually shows up in the CRM?

- **Final question:** "Is anyone checking that the lead count in the report matches what actually shows up in the CRM?"
- **Final sentence:** same line.
- **QC fix D2-1 (BLOCKING, applied):** cut ", not a drop in demand" from the last story sentence. Unsourced inference, and the false certainty he says he dislikes.
- **QC fix D2-2 (applied):** closing was "...shows up in the CRM, or does the report get taken at face value?" The second branch read as a mild jab at the man who wrote the brief. Now one plain yes/no clause.
- **Source fidelity:** The Tooth Co, Aug 2026, Lindsey is `platform_operator`, verified 9/25 + 9/26 from raw Google Chat. Client, vertical and CRM product all unnamed. Manager calls stay reported intent, not confirmed action. **She is never shown fixing it** (the cause was a GoHighLevel sync issue escalated to a colleague).
- **QC ruling (c), CRM ban = no swap needed:** the banned Samuel-room angle is CRM→Meta (CAPI, match rate, lookalike seeds). This runs the opposite way, Meta→CRM→the view he reads, and uses none of those tokens. Lindsey's own 7/27 proposal already put "what actually flows back from your CRM" in front of him. The 8/17 incident also post-dates Samuel's last room message (8/7), so it cannot duplicate anything said there.
- **QC ruling (e):** does not re-ask Lindsey's 7/28 question. Hers was an open "name the account and your tracking setup"; this is a yes/no about one habit he can answer without describing his stack.

## RESPONSE 2: FORECLOSED — do not send on this thread

Fixes were applied and it would otherwise be sendable, but it duplicates Samuel's opening pitch and is retired for that reason.

Hi Adam,

I wrote last time about tests getting spread across too many audiences until nothing in the report has enough behind it to read. The harder version is a number that reads clean and is still wrong.

Cost per lead can sit flat for weeks while the leads themselves get worse. Meta optimizes toward the people most likely to fill out the form, and the ones who fill it out most readily can be the furthest from buying. The number on the report doesn't move much, so nothing looks broken until the sales side says the leads have gone soft. An account can rack up weeks of practice finding more of them before anyone notices.

If someone's running it now, is lead quality getting checked with the sales side yet, or is it too early to tell?

- **Final question:** "If someone's running it now, is lead quality getting checked with the sales side yet, or is it too early to tell?"
- **Final sentence:** same line.
- QC fix D1-1 (BLOCKING, applied): the old closing set his stated preference against the metric his own post calls insufficient, pre-writing the answer and strawmanning him; it also dropped the "or is it too early to tell" exit QC added on 9/23 and narrowed to 2 of the 7 factors he listed. QC fix D1-2 (applied): "are usually the furthest from buying" softened to "can be".
- **WHY FORECLOSED (my finding, 9/30, from the Samuel room text in `upwork_conversations`):** Samuel's first message to Adam on 7/24 reads: *"the algorithm learns to find people who'll fill out a form, not people who actually turn into qualified opportunities"* and *"you're optimizing for volume of leads instead of quality of leads"*. Response 2's core sentence is the same claim in different words. A mechanical 3-gram diff scores **0 shared 3-grams** against the Samuel room (so it is lexically clean, which is why QC passed it on ban-list grounds), but the **thesis is a duplicate**. If Adam reads both rooms he sees one argument twice from two supposedly independent freelancers. That is the exact tell the two-profile ban list exists to prevent, and a wording test cannot catch it.
- Response 1 was checked the same way: **0 shared 3-grams** and no thesis overlap. Samuel never mentions leads going missing from a pipeline, Business Manager, or a sync fault.

## Open questions for Queenie

1. **Mode conflict, unresolved since 8/21.** `followup.md` caps pre-call follow-ups at 1-3 sentences and wants a question every touch; `nurture.md` says vary length and a question is optional. Touches 1 and 2 ran as nurture. Response 1 is 7 sentences, so it is fine under nurture and over the cap under followup. QC flagged it as a WARN rather than deciding. Cheapest trim if you want it shorter: drop the second bridge sentence ("The other version of that problem is a number that looks definite and isn't.").
2. **The 10/06 Samuel row.** Hold it, retire it, or let it fire? `referred_to` also still says "Scott" when the 8/7 handoff was Keith.
3. Touch 3 stays silent on the role being open or filled. Touch 1 asked and touch 2 asked; a third ask would be the worst available move.
