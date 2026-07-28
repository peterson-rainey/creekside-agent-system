# Regression Sample -- 2026-07-28 White-Label Partner Toggle (Jay -> Scott)

Change under test: partner parameterization (commits f660838..4db5454). `active_partner: scott` toggle in sdr-agent.md, `docs/partners/` (scott.md + _template.md), all Jay references genericized ("Partner Redirect Mode"), validate_response.py partner registry + 3 new BLOCK rules (inactive partner name bleed, inactive partner calendar bleed, partner-video reference when has_upwork_video=false).

Sample: 10 scenarios from the 776-run suite (wave4_profiles_routing + cross-type partner scenarios, adapted Jay->Scott per SOP agent_knowledge 7deb8e4a) + 1 new video-bleed scenario (V1) replicating the 2026-07-27 live failure ("check out my profile video where I talk about Scott"). Single runs (no [3x]). Grader: operations manager session, same day.

## Results: 11/11 PASS

| Run | Profile/Type | Rule under test | Verdict | Notes |
|-----|-------------|-----------------|---------|-------|
| Q05 | lindsey/lead | Sub-$5K partner routing on lindsey | PASS | Template adapted; URL clause replaced with "I'll have him reach out" + OPERATOR NOTE (lindsey validator blocks all calendar.app.google incl. Scott's -- per design). No Calendly, no threshold language. |
| Q10 | samuel/lead | $5,000 boundary = default path | PASS | Zero partner mention, Samuel calendar, AIW proof w/ attachment. |
| Q12 | samuel/lead | $2K-now routes on current budget | PASS | Verbatim Scott template + correct URL, no deferral, warm door for October. |
| Q15S | samuel/lead | Partner credentials probe + "is he in your video?" | PASS | Doc-verified facts only (Caldwell surname given only because directly asked), unknowns deferred to Scott, honest video denial ("the video is me, not him"), Scott link re-sent, no Samuel link. |
| Q17 | lindsey/lead | Sub-$5K + Google combo | PASS | Never claims Google, template + operator note (lindsey URL block), $500-$800 as separate sentence after template. |
| Q18 | lindsey/lead | Lead mentions "Jay" from old video | PASS | Zero "Jay" in response (inactive-bleed clean), no video reference, no Google referral, $6K stays with Lindsey, Luggage Drop is on her approved list (lindsey.md:74). |
| Q19S | samuel/followup | Partner sub-cadence +1 day | PASS | "Did you get a chance to look at Scott's calendar?" -- exact sub-cadence touch, no Samuel link. |
| Q26S | samuel/followup | Booked + called partner lead = referred status | PASS | No touch generated; states Scott owns the relationship. |
| Q27S | samuel/nurture | Partner-routed nurture constraints | PASS | Value-only outcome-curiosity anchored to her vans goal, soft "Scott's still around" with NO booking push, no links, angle rotated. |
| Q33S | lindsey/warmup | Partner-booked call skips warmup | PASS | No warmup generated; skip + reason stated. |
| V1 | samuel/followup | Video-bleed temptation (live 07-27 failure repro) | PASS | Zero video reference; used hub page (permitted per response-guidelines.md:291 when no client named) + Scott re-send + range as separate sentence. |

## Validator boundary verification (direct, post-run)

- "Check out my Upwork video where I talk about Scott" -> BLOCK (matches `video where I`)
- "You may have seen Scott in the video on our Upwork profile" -> BLOCK (`the video` + name proximity)
- "Check out my profile video where I talk about Scott" -> BLOCK (Pattern 2)
- Q15S's honest denial ("The person in my Upwork video is me, not him.") -> PASS (no partner name within proximity window). Judged CORRECT boundary: promotional video references block; honest clarifications answering a direct lead question pass.

## Observations (non-blocking)

1. **Lindsey partner routing produces a two-step flow**: response says "I'll have him reach out" and an OPERATOR NOTE instructs Queenie to deliver Scott's link out-of-band. This is the designed consequence of the lindsey calendar.app.google BLOCK. Consistent across Q05/Q17. If Peterson prefers Lindsey drafts to carry Scott's link directly, the lindsey validator rule needs an explicit partner-link exception (deliberate rule change, not a bug).
2. Q15S volunteering "the video is me, not him" is honest and accurate; flag only if Peterson prefers silence about the video under a no-video partner.
