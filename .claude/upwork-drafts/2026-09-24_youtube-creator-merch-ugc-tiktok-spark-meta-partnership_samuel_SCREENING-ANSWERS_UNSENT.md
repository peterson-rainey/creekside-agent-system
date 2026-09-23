# YouTube Creator Merch Brand (16M+ subs) -- SCREENING ANSWERS (3 questions)
Profile: Samuel | Style: strategic + diagnostic | Status: UNSENT | Drafted 2026-09-24
Companion to: 2026-09-24_youtube-creator-merch-ugc-tiktok-spark-meta-partnership-oct4-drop_samuel_strategic-diagnostic_UNSENT.md

## THE THREE QUESTIONS
1. Largest monthly TikTok + Meta spend personally managed for a single DTC ecom brand, and blended ROAS/CPA.
2. How would you set up a new Meta + TikTok ad account for a Shopify store so tracking/attribution are right day one.
3. Have you run TikTok Spark Ads or Meta partnership (whitelisted) ads from a creator's handle? How did you handle permissions?

## VERIFIED LIVE THIS SESSION (contractor_query, recomputed not recalled)
- Neue Maison act_782415276397596, Meta, CHURNED 2026-08-11, operator Lindsey B. Tenure 2026-04-10..08-10 ONLY.
  Monthly: Apr $12,373.92 | May $24,861.44 | Jun $23,870.58 | Jul $40,389.21 | Aug $3,515.09.
  Tenure total $105,010.24, ~$26,252/mo, peak $40,389.21.
  BY OBJECTIVE over tenure (this is the new pull, and it CONFIRMS the memory correction to the cent):
    OUTCOME_SALES      15 campaigns  $91,502.92 / 334 conv / $273.96 CPA
    OUTCOME_LEADS       2 campaigns  $13,185.48 /   9 conv / $1,465.05 CPA
    OUTCOME_ENGAGEMENT  2 campaigns     $304.72 / NULL conv
    OUTCOME_TRAFFIC     1 campaign       $17.12 / NULL conv
  Campaign spread inside OUTCOME_SALES: low "{w} Rolo Flagship | tCPA" $691.53/10/$69.15;
  high "Conversions | July 4th - 50%" $23,843.26/42/$567.70; "Retargeting | 4/13" $16,999.77/85/$200.00.
- ROAS: DECLINED and stated as declined in the answer. The only roas column available is an unweighted
  mean of daily roas values (13.23 on the sales slice). Revenue by campaign is not in the table, so a real
  blended ROAS cannot be computed. Citing 13.23 would be citing a junk statistic.
- meta_campaigns = 1,825. Creator-sourced = 2 (Neue Maison UGC, NULL spend; Tiami "[Conversion] [Influencer]",
  $3,930.66, NULL conv).
- reporting_clients DISTINCT platform: chatgpt, email, google, lsa, meta, other, programmatic. ZERO tiktok.

## DELIBERATELY OUT
- Any ROAS figure. Any TikTok spend claim. Any first-person operator credit (the operator was Lindsey B.,
  and principals never do delivery work, so the account is "our team" throughout).
- The $1,465.05 lead-objective CPA, other than as the reason the blended number is refused.
- Audience-type labels on campaigns. Campaign NAMES are not verified audience definitions.
- No em dashes, no sign-off name, no links, no fee figure.

## QC
qc-reviewer-agent: FAIL on first pass, two blocking issues, both accepted and fixed.
  (a) "Retargeting sat at $200 against far more expensive cold prospecting" invented an audience label.
      The $567.70 campaign is named "Conversions | July 4th - 50%"; nothing verifies it as prospecting.
      Rewritten to compare against "the most expensive campaign in the account" with no audience claim.
  (b) Q3 stated Spark Ads and partnership-ad mechanics flatly two paragraphs after conceding zero TikTok
      experience, while Q2 hedged the same platform. Internal inconsistency. Added a matching hedge to Q3.
Non-blocking applied: softened the unsourced "20 to 30 percent" browser-event loss stat to "a meaningful
share". Non-blocking declined: rounding $105,010.24. The cents are consistent with the proposal body and
signal the number came from data rather than memory.
QC confirmed all numbers trace to the verified list, no fabricated figures, and full rule compliance on
em dashes, sign-off, links, certifications, book-pooling and operator credit.
NOTE: qc-reviewer-agent had NO database access this session. Every number was verified by me directly.

## OPEN ITEMS FOR QUEENIE
1. Q1 answers a question about "personally managed" with a team-book number and says "our team ran it".
   That is the pooling rule working as intended, but it does read as a slight sidestep of the word
   "personally". If you want it answered more directly, that is a call to make before sending.
2. Q1 volunteers the TikTok zero a second time, after the proposal already conceded it. That repetition is
   deliberate, since screening answers are often read on their own, but it is a double concession.
3. The account cited churned 8/11/26. The answer uses past tense throughout and never implies it is live.

---
## SCREENING ANSWERS (paste as-is)

**1. Largest monthly spend on a single DTC brand, and what it ran at.**

Meta, around $40,000 in the single biggest month. The account was a direct to consumer brand on Shopify at a considered price point, and our team ran it for four months, averaging about $26,000 a month and $105,010.24 in total.

Graded on the sales campaigns only, which is the slice that was actually buying orders, it spent $91,502.92 for 334 purchases, or $273.96 each. I would rather give you that number than a blended one. The account also carried lead and engagement campaigns, and folding those in drags the average toward something flattering and meaningless. The campaign level spread inside that same window ran from $69 to $568, so even the $273.96 is a summary, not a result. The retargeting campaign came in at $200 while the most expensive campaign in the account ran nearly three times that, and which end of that range a new campaign lands on is the actual conversation.

I am not going to quote you a blended ROAS. Revenue by campaign is not something I can reconstruct honestly from what I have in front of me, and a ROAS figure I cannot show the working on is not worth much to either of us.

TikTok, the honest answer is nothing. No paid TikTok account in our book at any spend level. If that is a hard filter for you, it is better said here than discovered in week two.

**2. Setting up Meta and TikTok on a Shopify store so tracking is right from day one.**

Meta first. Shopify's native Meta channel handles the browser pixel and the Conversions API together, which is the setup worth having, because server side events survive the ad blockers and iOS opt outs that quietly eat a meaningful share of browser events. The piece people skip is deduplication: both paths fire the same purchase, and without a shared event ID the account double counts and optimizes against inflated numbers. Then domain verification in Business Manager, because without it you cannot control event priority, and then ranking the eight allowed events with Purchase at the top.

TikTok is the same architecture, pixel plus Events API through the Shopify channel, and I will say plainly that I would be verifying the specifics against current documentation rather than from repetition.

The harder problem is not the pixel. On a drop driven by an existing audience, Meta, TikTok and your YouTube traffic will all claim the same orders, and the platform totals will exceed real revenue, possibly by a lot. So the setup needs one source of truth outside the ad platforms. Shopify order data, disciplined UTM tagging on every link, and a post purchase "how did you hear about us" survey, which is blunt but is the only thing that catches YouTube. The number we grade on gets agreed before launch, not after the reports disagree.

**3. Spark Ads and partnership ads from a creator's handle.**

No track record I can point to. Across more than 1,800 Meta campaigns in our book, two were creator sourced. One never spent. The other ran $3,930.66 with nothing recorded against it. I would rather tell you that than stretch a thin example.

What I can tell you is where these break, because the mechanics are unforgiving and they are mostly a scheduling problem rather than a media problem. The same caveat applies as above: the shape of this is stable, the exact steps and durations move, and I would confirm them against current documentation before building a workflow on top of them.

For Spark Ads the creator has to enable ad authorization on their own account, then generate a code for the specific video and send it over. The brand cannot create it. The code carries an expiry, and when it lapses the ad stops serving, which is the failure that tends to surface mid flight rather than at setup. So codes get requested at the longest available duration and tracked against a calendar.

Meta partnership ads work the same way. The creator authorizes from their own profile, and only then can the post run as an ad. The thing worth knowing is that you cannot edit the creative, and duplicating a winning ad mints a new post ID, which resets the view count and the comment thread. The social proof that made the post worth buying does not come with the copy.

Which is why with fan videos arriving from a promo, the authorization gets collected at submission, inside the promo flow. Chasing permissions afterward, across people who have no obligation to reply, is where a late September setup window quietly becomes mid October.
