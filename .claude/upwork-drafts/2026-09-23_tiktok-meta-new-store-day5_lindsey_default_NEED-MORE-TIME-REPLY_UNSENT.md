# Upwork REPLY 2: "TikTok, Meta ads" — they withdrew the call ask, need-more-time

- **Profile:** Lindsey | **Style:** lindsey_default | **Type:** "need more time" reply
- **Date:** 2026-09-23 (Postgres `now()`, Wed) | **Status:** UNSENT
- **Job:** `a669116e-bf51-4b34-a7fc-443c01ae4575` "TikTok, Meta ads", US / Washington state (Pacific)
- **Supersedes:** `2026-09-23_tiktok-meta-new-store-day5_lindsey_default_CALL-ASK-REPLY_UNSENT.md` — DO NOT SEND that file. Its Variant A carries a calendar link, which is now explicitly wrong.

## INBOUND 2 (verbatim)

> great I think I should book a call with you when it finishes 9 days so you have something to look at, I know you are not supposed to tinker with it which I did for the first couple of days so am gonna give it a little more than a week before I decide if this is worth keeping or not, I will reach out when I am ready thanks

## HOW THE SHAPE CHANGED

They **withdrew the call ask**. They named their own trigger (~9 days), said they will reach out themselves, and will then decide "if this is worth keeping or not." They control the next step.

- Booking CTA and calendar link are now SUPPRESSED. Ruled twice: IVC 2026-08-25 ("All you needed to send is that first sentence") and Peterson on Nicole Nolan (sending our calendar back "makes it look like we are ignoring them").
- This is a "need more time" message → house cadence rule: minimum acknowledgment + reset the internal clock.
- **Spend ask excluded.** It has now gone unanswered across both their replies, but a third ask on a sign-off message is the same failure as an unwanted booking CTA. QC confirmed excluding it is correct. It belongs on the call.

---

## PRIMARY — ship this (QC-corrected)

```
Sounds good, no rush.
```

- Word count: 4
- **Final question:** none, by design. They control the next step.
- **Final sentence:** `Sounds good, no rush.`

## ALTERNATE — the value version (QC PASS, judgment call)

```
Sounds good, no rush. One thing that might make that read cleaner: TikTok's help docs say volatility usually settles after about 25 results or seven days from when the campaign enters learning, not from launch day. They also list edits that retrigger learning among the things to avoid during that window, without publishing which edits do that, so the clock can restart without being obvious. Worth confirming it's actually out of learning before you treat the numbers as final.
```

- Word count: 79
- **Final question:** none.
- **Final sentence:** `Worth confirming it's actually out of learning before you treat the numbers as final.`

---

## QC RESULT

**PRIMARY as originally drafted FAILED.** It read "Sounds good, no rush. Reach out when you've got a full read on it." The second sentence broke two rules: it restated the prospect's own stated next step back at them (they wrote "I will reach out when I am ready"), and "Reach out" is an imperative aimed at the prospect. Cut in full. Nothing else changed.

**ALTERNATE PASSED** every enumerated rule, with two non-rule flags:
- **Tone/volume.** 79 words of unsolicited mechanism landing right after "no rush," on a message that asked nothing. The retrigger-edits point sits thematically next to their own admission that they tinkered. Nothing names or blames them, but they may feel the connection.
- **Credibility tension.** Our sent proposal said in writing "it isn't in my account history" re TikTok. Fluent multi-clause learning-phase detail in the same thread reads as consistent only if read carefully. Every claim is attributed to "TikTok's help docs" and none claims operator experience, so rule 12 holds on the letter.

## SOURCE VERIFICATION (TikTok's own help page)

`ads.tiktok.com/help/article/learning-phase`, fetched 2026-09-23:
- "The learning phase is a period during which our ad system identifies the best users for a specific campaign target."
- Volatility typically declines after "about 25 campaign results or 7 days **from when the campaign enters the learning phase**."
- Lists "Edits that retriggers the learning phase status" among operations to avoid, alongside pausing campaigns/ad groups and unreasonable budget or creative volume settings.
- Does NOT publish which edits retrigger learning. Does NOT state a conversion threshold to exit.

Blog sources claiming a "50 conversions" exit threshold and a specific list of resetting edits were NOT used — not in TikTok's own text.

**One gloss to know about:** ALTERNATE's phrase "not from launch day" is an inference, not source wording. It is supported by the retrigger mechanism (a campaign can re-enter learning after launch) but TikTok does not say those words.

## OPEN FOR QUEENIE

1. **PRIMARY or ALTERNATE.** Every rule governing this situation points to PRIMARY. The one thing pulling the other way: the learning-phase insight expires the moment they decide. If their tinkering retriggered learning, the data they plan to judge the channel on is not clean, and they could kill a viable channel on a false-negative read with no record we flagged it.
2. **A TikTok kill does not kill this thread.** Meta has not started, and Meta is where the actual account history sits. That lowers the cost of holding the insight.
3. **If you want the value without the volume**, say so and I will compress ALTERNATE to roughly one sentence and re-run QC.
4. **Internal reminder.** Their trigger lands ~2026-10-02. Suggest a reminder for ~2026-10-06, a few days past it, so we only move if they have gone quiet. Not created — say the word. The next touch should bridge from their trigger; if PRIMARY ships, the learning-phase observation is unspent and is the natural payload.
5. **Spend still unknown, sub-$5K risk high** (new store, day 5, second platform dark). Ask on the call.
6. **Not logged** to `upwork_proposal_logs` / `sdr_generation_log` — `contractor_query` cannot INSERT.
