# Upwork REPLY - Bree Coach, Marina Aghbalyan - answers the duplicate-proposal / "is it an AI proposal?" challenge
Profile: General / renders to her as **"Peterson R."** (files call this the Samuel persona; the display name has
collapsed to the real name and Marina writes "Hi Peterson") | Type: mid-conversation lead reply | Status: UNSENT
Date: 2026-09-28 Monday, confirmed via Postgres now() = 09:37 CT. Local shell clock read Sep 28 22:xx and is unreliable.
Words: 148 (170 before QC fixes) | Em dashes: 0 | Questions: 1 | Links: none | Attachments: none | Price figures: none | Names: none

> # SUPERSEDED 2026-09-30. THIS DRAFT WAS NEVER SENT AND SHOULD NOT BE SENT.
>
> Peterson answered Marina himself, in his own words, roughly an hour after this was drafted. What he actually
> sent, verbatim from the synced room (`room_4c26e0b9624f42c03e536b8fe31097a7`, now 11 messages):
>
> 1. **2026-09-28 10:59 PM Manila / ~09:59 CT** - *"No, if you watch my profile video, you'll see that I have a
>    small agency and one of my other agents is the one doing the other proposal."*
> 2. Marina: *"Got it. To clarify, what's the agent's name who also applied for the role?"*
> 3. **Peterson:** *"Lindsey"*
> 4. **Peterson:** *"See the video for my partner cade who will also be on the call running through price negotiation"*
> 5. **Peterson, Mon 2026-09-28 11:39 AM CT:** *"Here's Lindsey's calendar, just grab whatever works: <link>"*
>
> **He answered "No" to the AI question.** This draft conceded the tool and pivoted to the 4-of-6 disclosure.
> His answer went the other way and pointed at the profile video instead. He also named Lindsey and named Cade,
> and pre-announced that Cade would be on the call "running through price negotiation". The dual-bid promise this
> draft was built around ("you will not get pitched twice") was never made, so the Lindsey bid never needed
> silencing and that blocking action item is CLOSED, moot.
>
> Keep this file for the record. Do not send it, do not mine it for a later touch without re-reading the room
> first: it answers questions that have since been answered differently.

## WHAT SHE ACTUALLY ASKED (two things, one message)
1. "Hi, it's the ad budget."  -> the $5,000 is MEDIA ONLY. Management sits on top.
2. "Also I noticed you've sent the same proposal as one other person? Is it an AI proposal?"

## SHE IS RIGHT. VERIFIED, DO NOT DISPUTE IT.
`upwork_jobs` holds TWO rows for job_name "Performance Media Buyer / Growth Marketer for Consumer AI App",
both application_date 2026-09-24:
  - sheet_row_num 5486, profile_used "General", $90.00/hr, sheet_source "peterson"  <- the live thread
  - sheet_row_num  536, profile_used "Lindsey", $75.00/hr, sheet_source "lindsey"   <- STILL LIVE, must go quiet
The two proposals are NOT verbatim identical (different openers, different section headers, different prose) but
share ~7 substantive points: same restaurant-rewards-app case study and install numbers, same "roughly 50 results a
week" learning mechanic, same disclosed zeros on TikTok / Apple Search Ads / Google App Campaigns, same "never run
an MMP", same "app numbers stop at the install", same recommendation to bid an event short of paid subscription.
A reader holding both correctly concludes one source. Her observation is accurate and the reply concedes it.

## THREAD STATE, VERIFIED AGAINST THE SYNCED ROOM
`upwork_conversations` room_id `room_4c26e0b9624f42c03e536b8fe31097a7`, profile `peterson`, 4 messages,
last_message_at 2026-09-27T20:57Z. The room is STALE and does not yet carry the 9/28 exchange; Queenie's paste is
current. Sequence confirmed:
  1. Peterson R. - the full 9/24 gap-first proposal, VERBATIM match to its draft file. SENT.
  2. Marina A.  - "$5K/mo to start. What you think about that?"
  3. Marina A.  - "no MMP, open to one. still in product development, launching in October."
  4. Peterson R. - holding message.
  then (paste only, not yet synced): Peterson's one-line budget question, and her answer + the AI question.

**The 9/28 304-word reply draft was NEVER sent. Only its closing question shipped.** That file's status has been
corrected. The AEM / iOS scoping, the October-build MMP argument, the bid-target reasoning and the
one-platform-vs-four argument are all still unspent and are deliberately HELD OUT of this reply.

## WHY THE FEE SHAPE IS NOT A NEW DISCLOSURE
`validation.md` treats "monthly minimum" as BLOCK-level pricing language even without figures. It does not bite here:
the 9/24 proposal Marina already received says, verbatim, *"We do not bill hourly: a percentage of ad spend with a
monthly minimum per platform, plus one time onboarding per platform, stepping down as spend grows."* This reply only
applies that already-disclosed structure to her number. Queenie ruled SHAPE ONLY, NO FIGURES for this touch.

## FEE MATH, NOT TYPED IN THE BODY
Meta only at $5,000 media: 20% x 5,000 = $1,000, under the $1,500/platform minimum, so the minimum governs.
$1,500/mo = 30% of spend; month one with the $1,500 onboarding = 60%. Percentage overtakes the minimum at $7,500.
$5,000 MEDIA-ONLY clears the floor: the screen is "below $5,000/month" and this is at it, with the fee on top of
spend rather than inside it. "To start" is scaling language, so this is a floor, not a ceiling.

## RULINGS THIS SESSION (Queenie, 2026-09-28)
1. Fee = SHAPE ONLY, no figures. (Tail B with real numbers was drafted and is held in this file, unused.)
2. Commit in writing that she will not be pitched twice, and flag the second bid for closing.

## HOW THE DUPLICATE IS ANSWERED (governing playbook, reference_upwork_multiple_profiles_one_job)
After the prospect notices: match tone, do NOT apologise, do NOT over-explain the profile structure, do NOT get
defensive, do NOT name internal people, DO offer that she will not be pitched twice, do NOT claim personal ownership.
All six applied. Precedent: Martin Elfers noticed the same overlap 2026-08-27 and was amused, not annoyed.
The playbook's real warning is rule 3: two PRICES from one shop damages the deal more than the overlap did. Her two
bids carry $90/hr and $75/hr on the Upwork rate field. Neither proposal body quoted a rate, and the canonical fee
instrument is profile-independent, so the bodies stay consistent. Do not let the other profile quote anything.

## HOW "IS IT AN AI PROPOSAL?" IS ANSWERED
A flat denial was FORBIDDEN and not drafted: Creekside does use AI tooling to draft Upwork proposals, and a denial
she could later disprove would cost far more than the concession. The reply concedes the tool in one short sentence
and pivots to the checkable thing, that the letter talked itself out of the job by disclosing failures against 4 of
her 6 required items. **This is the one judgment call with real downside and Queenie should overrule it if she
disagrees** - see the flag at delivery.

## REVIEW LOG
- sdr-agent drafted, 170 words, against a verified fact pack (subagents have no DB access).
- qc-reviewer-agent: **PASS WITH FIXES, 2 required, BOTH APPLIED.** No factual contradictions, no standing-rule
  violations. Both fixes were tone, and both were aimed at the same risk: polish that reads AI-authored inside a
  message answering "is this an AI proposal?"
  (1) Cut a rule-of-three. "so they land on the same case study, the same platform gaps and the same recommendation"
      -> "which is why they read alike." A rule-of-three is a documented AI tell and self-defeating here.
  (2) Deleted the aphorism "A proposal mill does not talk itself out of the job." It was a mic-drop flourish on top
      of an argument that already landed. The paragraph now ends on "we do not clear it", our own admission, which
      is the humbler and stronger landing.
  QC also named, without requiring a change, that "Two profiles, one company" may prompt a NEW question about why
  one company runs two Upwork seller identities bidding one job. That tradeoff is accepted, not fixed.
  Length after fixes: 148 words, under the 160-230 target I set. Left short deliberately. A long answer to
  "is this AI?" reads like a machine justifying itself.
- expert-review-agent NOT run, deliberately. This is a short conversational reply carrying no platform mechanics,
  and expert review has twice produced a wrong AEM objection on this thread from third-party blogs.

## OPEN ACTION ITEMS FOR QUEENIE
1. **The Lindsey bid (sheet_row 536) must go quiet BEFORE this sends.** The draft promises she will not be pitched
   twice, which makes that operationally binding. Lindsey's room is NOT in `upwork_conversations`, so whether Marina
   has already replied over there is UNKNOWN from here. Absence of a room proves nothing.
2. **No `upwork_leads` row exists for Marina / Bree Coach at all.** A live, engaged, answering lead is not in the CRM.
3. ClickUp is unreachable from this session ("Must join workspace to have access"), so neither item could be filed.

<!-- REPLY START -->
Hi Marina,

Two profiles, one company. Both letters came from the same account history, which is why they read alike. You are reading one source, not two. You will not get pitched twice. This thread is the one.

We use AI tools to draft, yes. The better test is what that letter actually did: it told you, unprompted, that we fail most of your stated requirements, named the platforms where we have zero delivered accounts, and said that if hands-on mobile UA with an MMP is the bar, we do not clear it.

On budget, $5,000 as media works. Management sits on top of the spend, not inside it. At that level the fee lands on our per-platform monthly minimum rather than the percentage of spend, and it improves as spend grows.

What does the first month of spend need to prove for you to keep going?
<!-- REPLY END -->

## UNUSED ALTERNATE - Tail B (figures), NOT the ruled version. Swap as third paragraph if Queenie reverses.
On budget, $5,000 as media works. Management sits on top of the spend, not inside it. Our fee is a percentage of ad
spend, tiered by spend level, with a $1,500 per-platform monthly minimum and a $1,500 one-time onboarding per
platform that includes the audit. At $5,000 on one platform, 20 percent is $1,000, which is under the minimum, so
the minimum governs: $1,500 a month plus $1,500 once to onboard. We do not bill hourly.
