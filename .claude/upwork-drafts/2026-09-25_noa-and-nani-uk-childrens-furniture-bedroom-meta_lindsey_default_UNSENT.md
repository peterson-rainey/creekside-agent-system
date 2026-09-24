# Noa and Nani, UK children's furniture + bedroom accessories, Meta paid social | Lindsey | lindsey_default | UNSENT

Style note: Queenie asked for "strategic + diagnostic ... in lindsey_default". lindsey_default IS the
diagnostic style (mandatory diagnostic-question opener). "Strategic" is Samuel-only and was NOT applied.

## Screens run

PLATFORM test: PASS (bends, does not break). "Meta Ads required; Google/TikTok Ads a plus." Meta is the
required core and the optional extras are additive, so this is a PARTIAL, which the test bends on. It would
only BREAK on a total, i.e. zero Meta in scope.
Geo: UK. Inside US/CA/UK/AU. PASS.
Ads in scope: yes, and explicitly ads only. The post rules out organic content and community management.
Spend: UNSTATED and not foreclosed. $5K/month floor is UNVERIFIED, not violated. No price appears anywhere.
White-label / subcontractor: none. Direct brand.
Employment seat: does NOT fire. Asks "hours/week", never the words "full time".
Worker location: "Experience with UK audiences preferred." Preferred only, so it surfaces and does not
foreclose.
No CRO or landing-page gate, no detection evasion, no flat-fee portfolio owner, no zero-proof scope language.

Duplicate check: upwork_jobs queried for Noa and Nani by job_name, client_name and job_description, plus
children's/kids furniture patterns. ZERO rows. Grepped .claude/upwork-drafts, upwork-drafts/ and drafts/ for
"noa"/"nani". No existing draft under either profile, so no Samuel twin and no header or numeric collision.
NOTE: drafts/upwork-proposal-uk-furniture-beds-meta-samuel-strategic.md (2026-09-04) is a DIFFERENT job (UK bed
manufacturer). Its thesis is the 7-day click window; the 2026-09-19 Lindsey high-ticket furniture draft uses
the CPM-doubling and promo-share thesis. This draft deliberately runs neither, so all three stay distinct.

## Required-items screen (run BEFORE drafting)

1. "Examples of paid ad campaigns you've managed (with results, spend, ROAS, CPA)" -> ANSWERABLE. Recomputed
   live below.
2. "Your proposed approach to running paid social for a UK children's furniture/home brand" -> ANSWERABLE
   (mechanism, no data needed).
3. "Your availability (hours/week) and rate" -> PARTIAL. Lindsey's free capacity is NOT recorded anywhere in
   the DB (only 10am-6pm Central Mon-Fri), so no hours/week figure is stated. Rate is answered as a percentage
   of ad spend with no number, because the post states no ad spend to price against. FLAGGED below.
4. "portfolio/case studies" as an ATTACHMENT -> HARD ZERO. This is the DTC/ecom Meta shelf, which has zero
   attachable case studies. Declined in words and replaced with an in-thread offer.
5. Bonus: "experience advertising children's products, nursery/kids' room decor" -> HARD ZERO, verified.
   reporting_clients queried for kid/child/baby/nursery/toy/family across client_name and ad_account_name:
   ZERO rows. Named out loud in the body rather than finessed.

Two of five fully answerable, one partial, two zeros, but the CORE required item (campaign results) is
answerable, so the proof-gap screen does not foreclose. Drafted gap-first.

## Proof, recomputed live from Supabase 2026-09-24 (meta_insights_daily x meta_campaigns)

Account: Neue Maison (act_782415276397596), luxury furniture, platform_operator Lindsey B., status CHURNED
2026-08-11. Cited unnamed as "a furniture brand" and in PAST TENSE, since she no longer runs it.

Restricted to clean days only, i.e. spend > 0 AND conversions IS NOT NULL AND roas IS NOT NULL. This matters:
a first pass filtered only on conversions and produced a broken revenue figure, because the DPA feed campaign
carries NULL roas on roughly half its converting days, which silently understated its revenue and its AOV.

  Campaign                          clean days   spend      conv   CPA      ROAS    AOV
  Conversions | July 4th - 50%           16     $22,122.34   42   $526.72   4.49   $2,367
  2.2.2026 | Flagship: ROLO              17     $ 7,657.62   39   $196.35  10.86   $2,131
  Conversions | 30% Off | 5/13           13     $ 6,863.49   34   $201.87   4.69   $  947
  Retargeting | 4/13                     30     $ 6,050.84   54   $112.05  15.23   $1,706
  DPAs | PUR | 2026 In Stock (feed)      17     $ 5,614.74   49   $114.59   5.28   $  605
  {w} DPAs (2026 In Stock)                8     $ 2,500.57   24   $104.19   4.42   $  460

Body cites: CPA range about $104 to about $527 (5.06x), AOV about $460 against about $2,367 (5.15x), and the
50%-off campaign as the account's largest single line of clean-day spend AND its highest cost per purchase.
All three check out against the table.

CLAIM KILLED IN DRAFTING: "the deepest discount also had the account's worst ROAS" is FALSE. At 4.49 it sits
above Membership (0.66) and {w} DPAs (4.42). No ROAS superlative appears in the body.
CLAIM KILLED IN DRAFTING: "discount buyers are the least repeatable customer you'll get" is unevidenced. There
is no repeat-purchase data in the DB. Cut, not hedged.

Coverage is PARTIAL on every campaign (July 4th is 16 clean days of 22 spend days; the feed campaign 17 of
54). The body therefore compares campaigns against each other and never claims an account total or full
coverage. Do not let a later edit turn these into account-wide figures.

Figures are USD on a US account. Not converted to GBP, which would invent precision. The US/UK gap is
disclosed in the body anyway.

PipeBoard Meta not used (free-plan weekly limit). All figures from Supabase, which is why the body quotes
rounded bands.

Date note: Postgres now() read 2026-09-24 22:42 UTC, still 9/24 in US Central, while the session date is
2026-09-25. Filename follows the same-day siblings in this folder.

## Attach

NOTHING. No children's/nursery artifact exists, the DTC/ecom Meta shelf has zero attachable case studies, and
match_proposal_context returned nothing at relevance 3 that is both Meta and Lindsey's (top hit Aura Displays
is Google Ads and not her account). The results-attached element required by lindsey_default is replaced with
an in-thread offer to walk the account live.

Three bold section headers per Queenie's 9/25 standing instruction. The diagnostic-question opener stays
un-headered so the first-sentence-is-a-question rule holds. Upwork does not render markdown, so these paste as
literal asterisks. Headers deliberately do not reuse the 9/19 furniture draft's header text.

FLAG FOR QUEENIE: strict first person, no pooling. Everything cited is Lindsey's own Meta book. Pooling is
available per the 9/17 ruling if you want it.
FLAG FOR QUEENIE: the post names a TRIAL PERIOD before ongoing monthly. Per the 90-day-minimum rule an
unstated budget leaves this open, so the body neither endorses the trial nor pre-argues against it. Nothing
commits us to one.
FLAG FOR QUEENIE: the post asks for hours/week. Lindsey's free capacity is not recorded, so no number is
given. If you know her current availability, that line needs one.
FLAG FOR QUEENIE: no hourly rate quoted. Percentage of ad spend only, no figure, and the budget is asked as a
range rather than a number.

---

Before you agree a single cost per sale target, do you know how far apart your cheapest and most expensive orders sit? On a catalogue running from a bedding set to a cabin bed, one number covering both quietly picks a side.

**One target, two different businesses**

I ran Meta for a furniture brand earlier this year and the spread was the whole story. Cost per purchase across its campaigns ran from about $104 to about $527. The cheap purchases came from the catalogue feed campaigns, average basket around $460. The expensive ones came from campaigns selling baskets of about $2,400. Five times the cost, five times the order value. Hold every campaign to one target and the feed looks like the only thing working, while whatever is moving the furniture gets defunded for missing a number it was never going to hit.

**What the discount months actually cost**

In that same account, the deepest discount campaign was the largest single line of spend and its most expensive purchases, at about $527 each. That is not an argument against promotions. It is an argument for keeping them on their own line, because blended into the average they flatter the months they run in and distort every month after. Before agreeing any targets I would split reporting by price tier, then by promotional and full price.

**What I can and cannot show you**

Two gaps worth saying out loud. I have not run a children's or nursery brand, and that furniture account was US rather than UK, so the seasonal calendar and competitive read would take a cycle to earn. The mechanics travel. The local read does not.

No polished case study to attach either, but I can walk you through that account live, campaign by campaign. On rates, I work on a percentage of ad spend rather than hourly. Tell me roughly what range you work within monthly and I can put a figure to it.

After ten years of this, and having built and sold my own e-commerce business, I trust the accounts where one number ties back to money. There is a short video on my profile that covers how I work.
