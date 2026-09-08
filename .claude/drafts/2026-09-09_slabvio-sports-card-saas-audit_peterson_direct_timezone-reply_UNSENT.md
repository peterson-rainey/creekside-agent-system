# Slabvio (Geoff Lockerby) — timezone reply — UNSENT

**Thread:** Upwork — paid audit of Meta + TikTok paid social / funnel for Slabvio (sports card portfolio SaaS, pre-revenue)
**Profile:** Peterson Rainey, direct (existing thread, not a first-touch proposal)
**Type:** Reply, logistics
**Status:** UNSENT
**Drafted:** 2026-09-08 ~11:40am US Central (Postgres `now()`); thread timestamps render GMT+8
**Routed through:** sdr-agent → qc-reviewer-agent (verdict REVISE, corrections applied)

## Prospect's question

> just scheduled some time. Were the times on the calendar all in PST or does it convert to EST?

## Verified before drafting

- Loaded the exact appointment-schedule link Peterson sent, from a device on GMT+8. The page rendered a timezone
  label reading "(GMT+08:00) Philippine Standard Time" and showed the slots in GMT+8. Not PST, not the host's
  timezone. Confirms the page auto-detects the visitor's device timezone.
- Slots shown that load, for Thu Sep 10 GMT+8: 12:30am, 1:30am, 4:00am, 4:30am, 5:00am, 5:30am.
  GMT+8 minus 13h = US Central Daylight Time, so the same window is Wed Sep 9, 11:30am / 12:30pm / 3:00pm /
  3:30pm / 4:00pm / 4:30pm Central.
- ONE day observed only. Not generalized in the draft — scoped to "when I pulled up that link just now."
- Cade's `timezone` field is NULL in `team_members`. Draft says "our side runs on US Central," never asserts
  Cade's personal timezone.
- No `upwork_leads` row exists for this lead yet.

## Draft

Neither. That scheduling page reads the timezone on your device and renders every slot in it, not a fixed PST time or the host's timezone, so the times you saw were already in your local time and there's nothing to convert. Our side runs on US Central, and when I pulled up that link just now, Wednesday's openings ran from 11:30am to 4:30pm Central, so if your slot sits outside that window it just means you picked a different day, not a timezone problem. The confirmation and the calendar invite should show in your calendar's timezone too. The only thing that throws this off is a device set to the wrong timezone, so send over the day and time you booked as you see it and I'll confirm we're on the same hour.

## Notes

- Calendar link deliberately NOT resent. He already booked; no new booking CTA.
- No name sign-off, no em dashes, no contact info.
- Open thread items are all answered already (price $19.99/mo, team vs solo, execute vs advise). Nothing re-asked.
