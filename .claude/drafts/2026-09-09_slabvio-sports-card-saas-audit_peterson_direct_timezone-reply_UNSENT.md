# Slabvio (Geoff Lockerby) — timezone reply — UNSENT

**Thread:** Upwork — paid audit of Meta + TikTok paid social / funnel for Slabvio (sports card portfolio SaaS, pre-revenue)
**Profile:** Peterson Rainey, direct (existing thread, not a first-touch proposal)
**Type:** Reply, logistics
**Status:** UNSENT
**Drafted:** 2026-09-08 ~11:40am US Central (Postgres `now()`); thread timestamps render GMT+8
**Routed through:** sdr-agent → qc-reviewer-agent, then shortened to state Central, then updated to confirm the booked slot

## Prospect's question

> just scheduled some time. Were the times on the calendar all in PST or does it convert to EST?

## Verified before drafting

- Loaded the exact appointment-schedule link Peterson sent. Slots shown that load, for Thu Sep 10 GMT+8:
  12:30am, 1:30am, 4:00am, 4:30am, 5:00am, 5:30am. GMT+8 minus 13h = US Central Daylight Time, so the same
  window is Wed Sep 9, 11:30am / 12:30pm / 3:00pm / 3:30pm / 4:00pm / 4:30pm Central. Confirms the schedule
  sits on US Central business hours.
- Cade's `timezone` field is NULL in `team_members`. Draft says the calendar runs on US Central, never asserts
  Cade's personal timezone.
- Booked slot confirmed by Queenie: Wed Sep 9, 11:00am Central. This RECONCILES with the page observation
  rather than conflicting with it. The page was loaded after he booked, and a taken slot drops off the
  available list. First visible slot was 12:30am Thu GMT+8 (= 11:30am Wed Central), so an 11:00am Central
  slot sits at 12:00am GMT+8, exactly the gap before the first one shown. 30-minute cadence holds.
- 11:00am CDT (UTC-5) = 12:00pm EDT (UTC-4) in September.
- No `upwork_leads` row exists for this lead yet.

## Draft

Neither, that calendar runs on US Central. You're set for tomorrow, Wednesday at 11am Central, 12pm Eastern. Talk then.

## Notes

- Calendar link deliberately NOT resent. He already booked; no new booking CTA.
- Dropped the earlier "send over the day and time you booked" ask, now obsolete since the slot is confirmed.
- No name sign-off, no em dashes, no contact info.
- Open thread items are all answered already (price $19.99/mo, team vs solo, execute vs advise). Nothing re-asked.
