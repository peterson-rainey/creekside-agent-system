# Fridja, UK home appliance brand, Meta/Instagram creative-craft post | Lindsey | lindsey_default | GAP-FIRST | UNSENT

Style note: Queenie asked for "strategic + diagnostic ... in lindsey_default". lindsey_default IS the
diagnostic style (mandatory diagnostic-question opener). "Strategic" is Samuel-only and was NOT applied.
Same handling as the 9/25 scaled-accounts draft.

## Screens

PLATFORM test PASS. Meta and Instagram only. Zero Google, zero TikTok. Squarely Lindsey scope, no bend.
GEO: client is UK. US/CA/UK/AU gate PASSES.
SPEND: unstated and NOT foreclosed ("bring our company to the masses"). $5K screen does not fire. Asked
as a relative bracket, current plus target.
No white-label. No "full time" wording ("part of a small team"). No worker-location requirement. No
detection-evasion. No self-funded or profit-share. No flat-fee portfolio owner. No coaching-competitors.
No CRO or landing-page ownership in scope, so the ads+LP screen does not fire. NOT auto-DQ'd.

NO required-items list and NO screening questions, so the required-items screen produces nothing to
report. The cover letter is the whole deliverable.

UNVERIFIED: payment-verified badge and client total spent. Logged out, not in upwork_jobs. Queenie should
eyeball the post before sending. Flagging, not DQ'ing.

No duplicate bid. Grepped all four draft dirs for "fridja" -> zero hits. Checked upwork_jobs for
fridja / appliance / "good ad" / "scroll" -> the one UK hit ("Good Ads Expert", 2025-10-21) is an
unrelated Google Ads HVAC job. No Samuel twin in `git log`.

## Vertical adjacency (checked, reported honestly)

ZERO home-appliance clients in the book. ZERO UK clients. The draft claims neither. Nearest real
adjacencies, all consumer hardware or home goods, all platform_operator "Lindsey B." (verified):
  Master Spa Parts  home spa/hot-tub parts ecom   -> "a home spa parts brand"
  Blush Camera      consumer camera DTC           -> "a consumer camera brand"
  Neue Maison       luxury furniture/interiors DTC -> "a home and interiors brand"

## Proof (computed live 2026-09-25, meta_insights_daily x meta_campaigns x meta_ad_accounts)

BASIS: ONE filtered row set for every figure -- conversions IS NOT NULL AND > 0 AND roas IS NOT NULL
AND > 0. CTR, CPM, CPC, cost-per-conversion and spend-weighted ROAS all come off that same set, so the
three rankings are directly comparable. All three accounts are currency USD (verified on
meta_ad_accounts.currency), which the body states so a UK client is not reading GBP.

  account            CTR     CPM     CPC   cost/conv   wtd ROAS   spend coverage
  Neue Maison       3.88%  $46.10  $1.19    $172.57       7.42    $70,755 / $206,077 = 34%
  Blush Camera      2.28%  $25.05  $1.10     $67.70       2.03    $41,771 /  $58,298 = 72%
  Master Spa Parts  1.58%   $8.79  $0.56     $24.57       6.45    $99,580 / $117,893 = 84%

THE FINDING: all three scoreboards rank these accounts in DIFFERENT orders.
  by CTR (best first):        interiors > camera > spa parts
  by cost/conv (best first):  spa parts > camera > interiors
  by ROAS (best first):       interiors > spa parts > camera
  The account with the WORST cost per conversion ($172.57) had the BEST return (7.42). The account that
  was middle-of-the-pack on both clicks and cost was the worst business by return (2.03).

  CAVEATS THE BODY STATES OUT LOUD: Meta-attributed, not store-reconciled; the interiors ROAS rests on
  only 34% of that account's spend so it is called directional; three different price points.
  ROAS is spend-weighted, not a mean of daily ratios. Neue Maison daily roas ranges 0.11 to 169.20, so
  the weighting matters -- an unweighted mean would be junk.

## The thesis I BUILT, QC'd, and THREW OUT

First pass ran "CTR ranks in the exact reverse order of cost per sale." Both reviews broke it and they
were right on the substance:
  1. The ranking is NOT reversed. CTR ascending (1.58, 2.28, 3.79) gives cost/conv ascending
     ($24.55, $67.05, $139.60) -- the SAME order. The inversion is against expectation, not in rank.
     The first draft then said "in the same direction" two sentences later, contradicting its own hook.
  2. Fatal: CPC is $1.10 vs $1.19 on camera vs interiors -- effectively identical -- while cost/conv is
     $68 vs $173. So the whole gap between those two is post-click (site CVR and price point), nothing
     the ads did on the click side. And CPM spreads 5.2x against a CPC spread of 2.1x, meaning auction
     price is the driver. A technical client would break the claim in one question. Killed.
Replaced with the three-scoreboards-disagree finding above, which survives both objections because it
no longer claims CTR drives cost.

ALSO THREW OUT -- the frequency section from the first pass. It read "the days where someone saw an ad
two to three times", but frequency here is campaign-day impressions/reach, and 827 + 356 rows across a
237-day window are CAMPAIGN-days, not days. High-frequency campaign-days are mechanically the low-reach
ones, i.e. retargeting and small-budget days, so the finding reduced to "retargeting converts cheaper
than prospecting" dressed up as a creative insight -- and then drew an AD-level conclusion from campaign
aggregates. Cut entirely. Those characters went to the craft POV section instead.

ALSO REJECTED -- expert-review's headline recommendation was to swap in "the highest-CTR account had the
lowest return." I queried it before acting on it and it is FALSE: highest CTR (interiors, 3.88%) has the
HIGHEST ROAS (7.42). Acting on that suggestion would have put a fabricated claim in the body. Logged
because this is the second time expert-review has asserted an unverified mechanism.

## Other checks

  - No ad-level or creative-level table exists anywhere in the DB. meta_insights_daily is campaign-level
    (campaign_id, spend, impressions, clicks, ctr, cpc, cpm, reach, frequency, conversions, roas).
    meta_campaigns has no creative columns. So no controlled creative test can be evidenced. Since the
    post is explicitly about ad craft, that is THE gap and the body names it.
  - Meta data starts 2025-09-24, so every Sept 2025 month is a 7-day partial. This draft makes NO
    month-over-month scale claim anywhere, which sidesteps the artifact entirely.
  - Lead-gen and medical accounts (Lux Dental, Retirement Income, Fusion, Adventures in Wisdom) have more
    conversion volume but are not consumer product. Excluded as non-comparable.

## QC dispositions

ACCEPTED: hook contradiction fixed; "purchase" -> "recorded conversion" plus an attribution clause;
coverage hedge added (34/72/84%); de-parroted off "gets clicks" and "a good ad"; frequency section cut;
craft POV added; USD and timezone overlap stated; closes on the ask rather than the profile video.
REJECTED: QC wanted the "built and sold my own e-commerce business ... ten years in" line confirmed or
cut. It is established in prior approved Lindsey drafts verbatim. False positive, kept.
REJECTED: expert-review wanted the diagnostic-question opener dropped on the theory that it trips his
"generic AI reply" filter. That opener is mandatory in lindsey_default and the bold headers are Queenie's
9/25 instruction. Not overriding a house style rule on a subagent's hunch. Flagged for Queenie below.

## Flags for Queenie

- ATTACHING NOTHING. No attachable DTC/ecom Meta case study exists. Blush_Camera.pdf is DO-NOT-ATTACH.
  Offers a live walkthrough instead, same handling as the 9/24 and 9/25 drafts.
- STRICT FIRST PERSON. No pooling, no "our team", no Creekside or agency framing. All three accounts are
  Lindsey's own book (platform_operator verified), so the 9/17 ask-each-time question does not arise.
- STYLE TENSION WORTH YOUR CALL: this client threatens to thumbs-down "generic AI replies". A rhetorical
  question opener plus bold headers plus a tidy triad is a recognizable LLM silhouette. I kept the house
  style because it is your rule, and made the opener concrete rather than rhetorical. If you want the
  question opener dropped for this one post, say so and I will rework it in one pass.
- Thesis differs from the 9/25 scaled-accounts draft (that one split CPA into auction vs ad efficiency).
  No header text reused from any prior draft.
- Four bold headers, none above the opener, so the first-sentence-is-a-question rule holds. Upwork does
  not render markdown, so these paste as literal asterisks.
- Does NOT use "scroll" or "a good ad" or "gets clicks", and does not restate his humour line or his
  AI-reply warning, per the no-parroting rule.
- The craft POV section is explicitly labelled as opinion in the body. It is NOT a proof claim and is not
  backed by DB data. It commits no scope and promises no free work.
- No price. No spend stated, so nothing is computable. Asked as current + target.
- PRECISION FIX applied after the rule sweep: the body first said cost per conversion "pointed the wrong
  way twice out of three". Checked it -- no account holds the same rank on cost/conv and on ROAS, so it is
  three out of three, not two. Reworded to "did not agree on a single one of the three", which is exact.
- Availability is her recorded hours (weekdays 10 to 6 Central). Free capacity is not recorded anywhere,
  so none is claimed. UK conversion stated as roughly 4pm to midnight (Sept: CDT UTC-5, BST UTC+1).
- Filed under 2026-09-25 to match today's sibling drafts. Postgres now() Central was 2026-09-24 16:53, so
  the repo's filing convention is running on Manila date. Noting, not changing.

---

When your best ad by click rate and your best ad by return on spend turn out to be two different ads, which one do you keep? I have run three consumer accounts where clicks, cost per conversion and return each put them in a different order.

**Three accounts, three scoreboards, three different winners**

A home spa parts brand ran a 1.6 percent click-through rate, about $25 per recorded conversion, and a return of roughly 6.5 times spend. A consumer camera brand ran 2.3 percent, about $68, return roughly 2.0. A home and interiors brand ran 3.9 percent, about $173, return roughly 7.4. So the account with the worst cost per conversion was the best business of the three, and the one sitting mid-pack on both clicks and cost was the weakest. These are US accounts in dollars, the conversions are Meta-attributed rather than reconciled to the store, and the interiors return rests on about a third of that account's spend, so treat that one as directional.

**What that changes before anyone writes an ad**

Cost per conversion and return did not agree on a single one of the three. So the first thing I want from you is not creative direction, it is which number you are actually managing to and what one order is worth. On an appliance with a real price tag, those two answers decide whether a $40 conversion is a win or a problem, and until they are settled nobody can tell you whether an ad is good.

**How I would build the first slate**

This part is opinion rather than something I can put numbers behind. For a product people have to picture in their own kitchen, I would not start from concepts. I would start from the reasons people do not buy, ranked, and write one ad against each. The product doing its job, uncut and unhurried, goes first, because that is the one thing a competitor cannot lift off you. Price objection second. Whatever it replaces third. Then I let the auction tell me which objection was the expensive one, and that picks the next round rather than my taste picking it.

**What I cannot show you**

A clean before and after on a single creative test. My records run at account level rather than ad level, so anything I handed you in that shape would be reconstructed, and I would rather say that than dress one up. Getting ad-level reporting standing up early is worth more to you than a story about one I ran.

I built and sold my own e-commerce business before this, and ten years in, my honest answer to your question is that an ad is only ever as good as the number you agreed to judge it by.

My hours are weekdays 10 to 6 Central, roughly 4pm to midnight your time, so there is a real overlap with your afternoon most days. Happy to walk you through any of those three accounts live rather than send screenshots, and there is a short video on my profile covering how I work.

I charge a percentage of ad spend rather than hourly, so the figure depends on where your spend sits now and where you want to take it. What are those two numbers?
