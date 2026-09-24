# Fridja, UK home appliance brand, Meta/Instagram creative-craft post | Lindsey | lindsey_default | GAP-FIRST | UNSENT

Style note: Queenie asked for "strategic + diagnostic ... in lindsey_default". lindsey_default IS the
diagnostic style (mandatory diagnostic-question opener). "Strategic" is Samuel-only and was NOT applied.
Same handling as the 9/25 scaled-accounts draft and the 9/25 DTC media-buyer draft.

## Screens

PLATFORM test PASS. Post is Meta and Instagram only. Zero Google, zero TikTok. Squarely Lindsey scope,
no bend needed.

GEO: client is UK, ads presumably run UK. US/CA/UK/AU gate PASSES.

SPEND: unstated and NOT foreclosed (he wants "our company brought to the masses"). $5K screen does not
fire. Asked as a relative bracket per the rule, current plus target.

No white-label, no subcontractor framing. No "full time" wording ("part of a small team"). No
worker-location requirement. No detection-evasion. No self-funded or profit-share. No flat-fee portfolio
owner. No coaching-competitors. No CRO or landing-page ownership anywhere in scope, so the ads+LP screen
does not fire. No zero-proof language in scope. NOT auto-DQ'd.

NO required-items list and NO screening questions in the post, so the required-items screen produces
nothing to report. Cover letter is the whole deliverable.

UNVERIFIED: payment verification and client total spent. Logged out, not in upwork_jobs. Queenie should
eyeball the post for the payment-verified badge before sending. Flagging, not DQ'ing.

No duplicate bid. Grepped all four draft dirs for "fridja" -> zero hits. Checked upwork_jobs for
fridja / appliance / "good ad" / "scroll" -> the one UK hit ("Good Ads Expert", 2025-10-21) is an
unrelated Google Ads HVAC job. No Samuel twin in `git log` for the last two days.

## Vertical adjacency (checked, reported honestly)

ZERO home-appliance clients in the book. Nearest adjacencies actually in the data:
  - Master Spa Parts, home spa/hot-tub parts ecom  -> cited as "a home spa parts brand"
  - Blush Camera, consumer camera DTC              -> cited as "a consumer camera brand"
  - Neue Maison, luxury furniture / interiors DTC  -> cited as "a home and interiors brand"
All three consumer hardware or home goods. None is an appliance brand and the draft does not imply one.
No UK client exists in the book either, so the draft makes no UK claim.

## Proof (computed live 2026-09-25 from meta_insights_daily x meta_campaigns x meta_ad_accounts)

METHOD NOTE: every figure below is on TRACKED DAYS ONLY (conversions IS NOT NULL AND > 0), per the
standing NULL-conversions rule. CTR, CPM and cost-per-conversion are all computed on the SAME filtered
row set, so the ranking is internally consistent. Conversions are Meta-attributed and the optimization
event is not recorded per account, so "purchase" is the draft's hedge-free-enough word for consumer
ecom but the body says "per purchase" only because all three accounts are transactional ecom.

FINDING 1 -- click rate ranks these three in the EXACT reverse order of cost per conversion.

  Master Spa Parts   act_2752863238119036  CTR 1.58%  CPM  $8.79  CPC $0.56  cost/conv  $24.55
  Blush Camera       act_2050081878799128  CTR 2.28%  CPM $25.05  CPC $1.10  cost/conv  $67.05
  Neue Maison        act_782415276397596   CTR 3.79%  CPM $41.96  CPC $1.11  cost/conv $139.60

  CTR spread 1.58 -> 3.79 = 2.40x UP.  cost/conv spread $24.55 -> $139.60 = 5.69x UP. Monotonic, both
  directions, no inversions. Rounded in the body to 2.4x and 5.7x.

  Coverage (conv days / all days, conv spend / all spend):
    Master Spa Parts  237/237 days, $99,580 of $117,893 (84%), 2025-09-24 to 2026-05-26
    Blush Camera      112/124 days, $41,771 of  $58,298 (72%), 2026-02-02 to 2026-06-15
    Neue Maison       247/310 days, $124,103 of $206,077 (60%), 2025-09-24 to 2026-08-10

  CAVEAT THE BODY STATES OUT LOUD: three different brands at three different price points, so average
  order value explains part of the cost-per-sale spread. The claim is about the ORDERING, not about one
  brand's creative beating another's.

FINDING 2 -- on Master Spa Parts, frequency bands move CTR and cost per conversion in opposite directions.

  freq 1.06-2.00  827 rows  $73,062  CTR 1.64%  2,711 conv  cost/conv $26.95
  freq 2.00-2.99  356 rows  $25,449  CTR 1.40%  1,235 conv  cost/conv $20.61

  CTR down ~15%, cost/conv down ~24%. Rounded in the body to 1.6% vs 1.4% and ~$27 vs ~$21.
  Band 3 (freq 3.01-3.10) is n=2 rows and was DISCARDED. Blush Camera band 2 is n=1 row, DISCARDED.
  CAVEAT THE BODY STATES: these are different campaign-days, not a controlled test, and higher-frequency
  days skew toward warmer audiences. Held loosely in the body, explicitly.

## What I checked and did NOT use

  - No ad-level or creative-level table exists in the database. meta_insights_daily is campaign-level
    (campaign_id, spend, impressions, clicks, ctr, cpc, cpm, reach, frequency, conversions, roas).
    meta_campaigns has no creative columns. So NO controlled creative test can be evidenced. Given the
    post is explicitly about ad craft, this is THE gap and the draft names it rather than dressing it up.
  - Meta data starts 2025-09-24, so every Sept 2025 month is a 7-day partial. No month-over-month scale
    claim is made anywhere in this draft, which sidesteps that artifact entirely.
  - Lux Dental Spa, Retirement Income Solutions, Fusion Dental, Adventures in Wisdom etc. all have more
    conversion volume but are lead-gen or medical, not consumer product. Excluded as non-comparable.

## Flags for Queenie

- ATTACHING NOTHING. No attachable DTC/ecom Meta case study exists (standing rule). Blush_Camera.pdf is
  DO-NOT-ATTACH. Offers a live walkthrough instead, same handling as the 9/24 and 9/25 drafts.
- STRICT FIRST PERSON, no pooling, no "our team", no Creekside or agency framing anywhere. All three
  accounts are Lindsey's own book, platform_operator verified "Lindsey B." on each, so pooling was not
  needed and the 9/17 ask-each-time question does not arise.
- Thesis deliberately differs from the 9/25 scaled-accounts draft (that one split CPA into auction cost
  vs ad efficiency). This one is the CTR-vs-cost-per-sale inversion. No header text reused.
- Three bold headers, none above the opener, so the first-sentence-is-a-question rule holds. Upwork does
  not render markdown, so these paste as literal asterisks.
- Does NOT use his words "scroll" or "stops a scroll" anywhere, per the no-parroting rule. Also does not
  restate his humour line or his "generic AI replies" warning back at him.
- No price. No spend stated, so nothing is computable. Asked as current + target.
- Availability is her recorded hours, weekdays 10 to 6 Central. Free capacity is not recorded anywhere,
  so none is claimed.
- Filed under 2026-09-25 to match today's sibling drafts. Postgres now() Central was 2026-09-24 16:53,
  so the repo's filing convention is running on Manila date. Noting, not changing.

---

Do you know which of your ads gets the most clicks and which one actually pays for itself? Across three accounts I ran, click rate ranked them in the exact reverse order of what a sale cost.

**Three consumer brands, ranked by click rate**

A home spa parts brand ran a 1.6 percent click-through rate at about $25 per purchase. A consumer camera brand ran 2.3 percent at about $67. A home and interiors brand ran 3.8 percent at about $140. Click rate rose 2.4 times across those three and cost per purchase rose 5.7 times in the same direction. Part of that is order value, since these are three different price points, and I would rather say that than pretend the ranking is purely about the ads. The account earning the most attention was still the most expensive place to make a sale, and that held all three times.

**What happened when the same people saw the ads more often**

On the spa parts brand, the days where someone saw an ad two to three times ran a 1.4 percent click rate against 1.6 percent on the lighter days. Cost per purchase on those heavier days was about $21 against about $27. Clicks got worse and sales got cheaper. Those are different campaign days rather than a controlled test, and heavier frequency leans toward warmer audiences, so I hold it loosely. It still means a falling click rate is not by itself a reason to kill an ad.

**What I cannot show you**

A clean creative test with a before and after on one ad. My records run at account level rather than ad level, so anything I put in that shape would be reconstructed. Building you real ad-level reporting in month one is worth more than a story about one I ran.

I work on a percentage of ad spend rather than hourly, so the figure depends on where your spend sits now and where you want it. Tell me both and I will give you a real one. Availability is weekdays, 10 to 6 Central.

I built and sold my own e-commerce business before this, and ten years in, my read on your question is that a good ad is one you can prove paid, and most accounts cannot tell you which one did.

Happy to walk you through any of those three accounts live rather than send screenshots. There is a quick video on my profile that covers how I work.
