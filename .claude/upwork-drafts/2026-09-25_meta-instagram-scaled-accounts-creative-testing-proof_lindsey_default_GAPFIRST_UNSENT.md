# Meta/Instagram scaling + creative testing, proof-heavy required-items post | Lindsey | lindsey_default | GAP-FIRST | UNSENT

Style note: Queenie asked for "strategic + diagnostic ... in lindsey_default". lindsey_default IS the
diagnostic style (mandatory diagnostic-question opener). "Strategic" is a Samuel-only style and was not
applied. Same handling as the 9/25 DTC media-buyer draft.

## Screens

PLATFORM test PASS. Post is Meta/Instagram only, zero Google/TikTok, squarely Lindsey scope.
No white-label. No "full time" wording ("ongoing role"). No worker-location requirement. No
detection-evasion. No zero-proof scope language. Rate is asked but no hourly range is listed, so the
$40/hr screen does not fire. NOT auto-DQ'd.

ADS + LANDING PAGE screen: "landing pages" appears once, inside a list of test surfaces, with ZERO
CRO-gated screening questions. Two CRO-gated questions is the line, so this lands on the override side
(same read as the 9/24 Easy Button Real Estate draft). Flagging, not skipping.

Unknowns, generic paste with no client profile: geo, monthly ad spend, payment verification.
Spend is unstated but explicitly NOT foreclosed (the post is about growing spend), so no $5K screen.

No duplicate bid: grepped all draft dirs for the post's distinctive phrases, no hit. No Samuel twin in
`git log` for the last two days.

## REQUIRED-ITEMS SCREEN (run first, per the standing rule)

1. Two accounts scaled, with starting/ending monthly spend, timeframe, results -- ANSWERABLE. Verified below.
2. Role in media buying AND creative strategy -- PARTIAL. Media buying is verified via platform_operator.
   Creative strategy is NOT documented anywhere in the DB. Softened per QC to a claim she can stand behind.
3. An example of a creative test that helped an account grow -- HARD ZERO. There is no ad-level or
   creative-level table in the database at all (meta_insights_daily is campaign-level only). No controlled
   creative test can be evidenced. The draft DECLINES this in words rather than inventing one, and offers
   the auction/ads split as the substitute. This is the gap the draft leads into honestly.
4. Rate and availability -- ANSWERABLE. % of spend, never hourly. No figure quoted because the post states
   no ad spend to price against; the draft asks for current + target spend instead (relative-range rule).

Two of four fully answerable, one partial, one a hard zero. Queenie's instruction was to generate the
proposal, so drafted GAP-FIRST per the 5+ override precedent rather than reported-and-held.

## Proof (recomputed live 2026-09-25 from meta_insights_daily x meta_campaigns x reporting_clients)

IMPORTANT METHOD NOTE: all CPA/CPM/impressions-per-conversion figures below are computed on TRACKED DAYS
ONLY (conversions IS NOT NULL), per the standing NULL-conversions rule. Spend figures use the full month,
which is complete. This differs from the 9/25 Blush Camera draft, which used a full-spend basis and so
quoted $68/$116 CPA and $12.24/$31.60 CPM. Both bases are internally consistent; this draft uses the
tracked-only basis throughout so the decomposition arithmetic actually closes. Do not mix the two.

ACCOUNT A -- Neue Maison, act_782415276397596, home/interiors DTC, platform_operator Lindsey B.,
churned 2026-08-11. Cited GENERICALLY as "a home and interiors brand", never named.
  Oct 2025 $5,420.89/mo -> Jul 2026 $40,389.21/mo (9 months)
  Conversions 24 -> 129
  CPA $52.65 -> $266.84 (5.07x) | CPM $27.25 -> $79.26 (2.91x) | K-impr/conv 1.93 -> 3.37 (1.75x)
  Decomposition closes: 2.91 x 1.75 = 5.09 vs actual 5.07.
  CAVEAT: Oct coverage is thin, only $1,263.62 of $5,420.89 fell on tracked days (23%).

ACCOUNT B -- Blush Camera, act_2050081878799128, consumer camera DTC, platform_operator Lindsey B.,
churned 2026-06-16. Cited GENERICALLY as "a consumer camera brand", never named.
  Feb 2026 $4,801.98/mo -> May 2026 $19,972.01/mo (4 months)
  Conversions 40 -> 172
  CPA $46.03 -> $91.57 (1.99x) | CPM $19.60 -> $34.20 (1.74x) | K-impr/conv 2.35 -> 2.68 (1.14x)
  Decomposition closes: 1.74 x 1.14 = 1.98 vs actual 1.99.
  CAVEAT: Feb coverage 38%, May 79%.
All conversion figures are Meta-attributed. Both accounts churned, so past tense throughout.

## Scale claims I checked and THREW OUT

Data begins 2025-09-24, so every September 2025 month is a 7-day partial. Several apparent "scale" stories
are artifacts of that and were discarded before drafting:
  - Doctor Laleh: looks like $21K -> $97K Sept->Oct. Actually flat at ~$3,100/day from day one. NOT a scale.
  - Master Spa Parts: looks like $3.5K -> $15.7K. Actually ~$505/day both months. NOT a scale.
  - Fusion Dental: looks like $9K -> $32.6K Apr->May. April data starts 4/21, so ~$900/day -> ~$1,050/day.
    A 17% ramp, not 3.6x. NOT a scale.
  - Nightlark ($91 -> $565/day) and Disc It are real scale but have ZERO conversion data, so no results
    can be stated. Unusable for this post.
I also initially read Neue Maison's creative as getting 3.8x MORE efficient. That was a NULL-conversion
artifact (impressions are total, conversions only land on tracked days). On a tracked-only basis the
creative got 1.75x WORSE. Claim killed before it reached the body.

## QC

PASS WITH FIXES. Applied four:
  1. Added the partial-coverage hedge on the starting figures.
  2. REWROTE the analysis section. The first pass narrated the SAME pattern two opposite ways -- camera got
     "the ads held up", interiors got "the creative work genuinely earned its place". In both accounts the
     auction outran the ads, and interiors' ad side was 1.75x worse (vs camera's 1.14x), so calling that a
     creative win was backwards. Now framed consistently: same shape both times, ad side slipped ~5x harder
     on interiors, and THAT gap is the decision input. Better insight than the original.
  3. Cut "Same headline number, two different jobs." CPA multiples are 5.07x vs 1.99x, not the same number.
  4. Softened "I briefed it against what the numbers showed" -> "my part was telling them what the numbers
     said to test next." Creative-strategy ownership is not documented in the DB.
REJECTED QC fix: it wanted "ten years in" rewritten as "ten years into doing this work" for clarity. The
existing construction is established in prior approved Lindsey drafts; false positive.

## Flags for Queenie

- ATTACHING NOTHING. No attachable DTC/ecom Meta case study exists. Blush_Camera.pdf is DO-NOT-ATTACH.
  The draft offers a live walkthrough in place of lindsey_default's usual "results attached" line, same
  handling as the 9/24 home-textiles and 9/25 media-buyer drafts.
- Item 3 is declined in the body. If you would rather not concede a gap in a first touch, say so and I will
  rework it, but there is genuinely no ad-level data to build a creative test from.
- Written strict first person. Both accounts are Lindsey's own book (platform_operator verified), so no
  pooling was needed. Pooling is available per the 9/17 ruling if you want it.
- Three bold section headers per your 9/25 instruction. Header text does not reuse any prior draft's.
  The diagnostic-question opener stays un-headered so the first-sentence-is-a-question rule holds.
  Upwork does not render markdown, so these paste as literal asterisks.
- Availability line states her recorded hours (weekdays 10 to 6 Central). Free capacity is NOT recorded
  anywhere, so the draft does not claim any.
- No price anywhere. The post states no ad spend, so nothing is computable.

Length: 350 words of prose (373 with the 23 header words), 2,110 characters. Under the 5,000 limit.

---

Do you know how much of your cost per purchase is auction price and how much is the ads themselves? They move independently, and at higher spend only one is something a creative test can fix.

**Two accounts, and what the scale actually cost**

A home and interiors brand went from about $5,400 a month to about $40,400 a month over nine months, monthly purchases from 24 to 129, cost per purchase from roughly $53 to roughly $267. A consumer camera brand went from about $4,800 to about $20,000 a month across four months, purchases from 40 to 172, cost per purchase roughly $46 to $92. Coverage in each account's first month was partial, so treat the starting figures as directional. I ran the media buying day to day on both. Creative production sat with the brands; my part was telling them what the numbers said to test next.

**Where those two accounts point in different directions**

On the camera brand CPM rose about 74 percent while the impressions needed per purchase rose about 14 percent. Multiply those and you land almost exactly on the doubling. On the interiors brand the auction moved about 191 percent and the ads about 75 percent. Same shape both times, auction outrunning the creative, but the ad side slipped roughly five times harder on interiors. That gap decides what a creative test is worth buying.

**On the creative test you asked for**

I can't hand you a clean before-and-after on one with numbers attached, and I'd rather say so than dress one up. My ad-level records are thinner than my account-level ones. The split above is what I'd bring instead.

I work on a percentage of ad spend rather than hourly, so the figure depends on where you are now and where you want to get to. Tell me both and I'll give you a real one. Availability is weekdays, 10 to 6 Central.

I built and sold my own e-commerce business before this, and ten years in, the accounts that scale without nasty surprises are the ones watching those two lines separately.

Happy to walk you through either account live rather than send screenshots. There's a quick video on my profile that covers how I work.

---

## Milestone description (UNSENT)

Meta audit splitting cost per purchase into auction cost and ad efficiency, prospecting and retargeting apart, plus a creative test list ranked by whichever side of that split is actually moving

**194 characters.** Scoped to the diagnostic, not month 1 of management. No price (no spend stated to
price against), no cadence word, and no promise of a creative test result since the body concedes that gap.
