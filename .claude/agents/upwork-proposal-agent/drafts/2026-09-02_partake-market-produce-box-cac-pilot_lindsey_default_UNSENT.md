# Partake Market -- $29/wk farmers-market produce box, Long Beach CA
## 3-month capped CAC-validation pilot | lindsey_default | UNSENT

Date drafted: 2026-09-02 (confirmed via Postgres now(); local shell clock drifts)
Profile: Lindsey
Style: lindsey_default (per Queenie instruction -- "strategic" is Samuel-only)
Status: UNSENT -- two blockers below need a ruling

---

## BLOCKERS FOR QUEENIE

### 1. Ad spend is 7.5x below the auto-DQ floor
$2,000 total media / 3 months = ~$667/month.
- Global auto-DQ: under $5,000/month = settled SKIP.
- Lindsey profile minimum (lindsey-default.md): $3,000/month Meta.
- Core agent rule 478: under $3,000/month = RED flag.
Fails all three. This is the single largest spend miss drafted to date.

### 2. Google is in scope; Lindsey cannot cover it
Post says campaigns live "across 2-3 channels (likely Meta, Google...)" and cites a
linked Google Ads account with the purchase conversion active.
lindsey-default.md: "Do NOT mention Google Ads, Bing Ads, TikTok Ads, or programmatic
as her services." Google-only-or-inclusive jobs are a Lindsey red flag.

This is the same shape as the 9/2 multi-location personal training ruling (commit 810e05a),
where the lindsey_default draft was SHELVED because Google sat outside her scope and the
post covered Google AND Meta. Samuel went out instead.

The draft below resolves this WITHOUT lying: the honest expert recommendation on a
$2,000 cap is to concentrate on one channel rather than split 2-3 ways, which is both
true on the math and inside Lindsey's scope. But it does mean the proposal declines
part of their stated scope. Queenie's call.

### 3. Fee-to-media ratio is unworkable at canonical pricing
Canonical: minimum $1,500/platform/month (pricing-reference.md, marginal tiers).
20% of $667 = $133, so the $1,500 floor applies.
$1,500/mo x 3 = $4,500 in fees against $2,000 in media = 225% fee-to-spend.
Precedent: Heather C / Mustard Seed Market was PARKED 8/14 at 60% fee-to-spend.

Hourly carve-out MAY apply: "a short capped PAID TEST that GATES MANAGEMENT may be
hourly." This engagement is explicitly that ("expands only if the pilot clears its
gates"). Upwork listed minimum $40/hr. No Lindsey hourly rate exists in the system;
$73/hr is Samuel's. NEEDS A RATE DECISION -- no fee is stated in the draft body.

---

## SCREENS CLEARED

- Geo: Long Beach, CA. US. Clears the US/CA/UK/AU rule.
- Payment: not screened (logged out). Flag if bidding.
- No duplicate bid: upwork_leads has zero rows matching partake / produce box /
  farmers market / Long Beach. No two-profile collision.
- Not white-label, not a full-time seat, not self-funded/profit-share, not
  detection-evasion, no worker-location requirement. Ads ARE in scope.
- Vertical fit: food / meal prep is one of Lindsey's listed industries. Real proof exists.

---

## PROOF USED (all live-verified 2026-09-02)

Source: meta_insights_daily joined to meta_campaigns, account act_1248382100071649
(Punch Drunk Chef Meal Prep, ACTIVE). Window 2025-09-02 to 2026-09-01.

Account blended: $45,480.48 spend / 827 conversions = $54.99 CPA
Per campaign:
  OFF - Sales Campaign June 25 (paused): $10,203.37 / 385 = $26.50 CPA
  S | Dallas | Dec 25 (core, active):    $16,349.78 / 397 = $41.18 CPA
  S | Plano | Dec 25 (active):            $3,918.80 /  19 = $206.25 CPA
  S | Frisco | Jan 26 (active):           $7,282.60 /  11 = $662.05 CPA
  S | Nature's Plate | Denton (active):   $1,951.17 / NULL conversions
  S | McKinney | April 26 (active):       $1,372.57 / NULL conversions

CITED ANONYMIZED in the draft. Punch Drunk Chef is an ACTIVE client and the numbers
are unflattering, so the name is withheld.

### Case study contradicted -- do NOT cite as written
case_studies row for Punch Drunk Chef claims: "Hit 20x peak ROAS and expanded from
South Dallas into 3 new Texas markets (Frisco, Plano, Denton), all profitable within
30 days."
Live data says the opposite. Frisco is $662 CPA against a $41 core. Denton has spend
and zero recorded conversions. "All profitable within 30 days" fails verification.
This matches the standing memory that the account's ROAS claim does not hold up.
No ROAS is cited anywhere in the draft (daily-average ROAS is unusable per the
Neue Maison rule).

### Proof deliberately NOT used
- Duck A Diet Power Bowls ($8-$17 CPA, small suburban market): client status INACTIVE,
  and per memory NOT Lindsey's personal account. Would be the single best-matching
  number in the system. Held back.
- Unrefined Meal Prep ($20 CPA core / ~2x month-one expansion): CHURNED, and NOT
  Lindsey's. Held back.
- CI Lifestyle Meals ($25 CPA, 4.52x, new-customer-only): NO client row exists at all.
  Unverifiable operator status, same defect as Fitness Superstore. Held back.
All three are pooled generically as "meal prep and local food delivery accounts."

---

## THE CORE ARGUMENT (why this draft opens where it does)

Their pilot as designed cannot answer its own question, and the arithmetic is not close.

$2,000 at a $35 target = 57 subscribers across the ENTIRE 3-month pilot.
Split across 3 channels in month one at ~$667/mo = ~$222/channel = ~6 conversions
per channel per month.

Meta needs roughly 50 optimization events per ad set per week to exit the learning
phase. This pilot produces about 4-5 conversions per week across everything. Nothing
ever stabilizes, so the month-2 CAC readout is measuring noise, and the month-3
go/no-go rests on a number that will not reproduce at scale.

Their stop rules are the sophisticated part of the brief and they are also the trap:
you cannot cut a channel for "sustaining CAC above the stop line" when n=6.

This is honest, non-flattering, and it is the thing no other bidder will tell them.
It also happens to resolve the Google-scope conflict without deception.

---

## PROPOSAL (paste-ready)

Have you worked out how many conversions $2,000 actually buys you? At your $35 target
that is about 57 subscribers across the whole pilot, and split three ways in month one
it lands near six or seven per channel per month. I ask because that number decides
whether this pilot can answer its own question.

Meta needs close to 50 conversions per ad set per week before delivery stabilizes. At
this volume nothing you run will exit the learning phase, so the CAC you read in month
two is not the CAC you would get at scale. Your stop rules are the sharpest part of this
brief and also where this bites. Cutting a channel for sustaining CAC above the line is
a coin flip at six conversions.

That is fixable, though not by splitting the budget. I would concentrate the whole
$2,000 into one channel and one tight geo so the pixel gets a dense signal, then let the
stop rules govern creative and audience inside that channel rather than which channel
survives. I would rather say this now than in month three: $3,000 a month on Meta is
where I have seen local subscription tests start producing numbers you can stand behind.

We run meal prep and local food delivery accounts, and the spread inside one of them is
the whole story. Cost per conversion sat near $26 on its best campaign and $41 in the
main market, then hit $662 in a suburb that got opened too fast, alongside two more new
markets that spent real money and never recorded a conversion. Same product, same
playbook. Geography and conversion density decided all of it. Your instinct to prove
Long Beach before anything else is the correct one, and it is the step most people skip.

Tracking already being verified changes the first week, so I would spend it on offer and
creative angles against your weekly cutoff instead of on plumbing.

I have attached a few relevant results below. There is also a short video on my profile
that walks through how I run tests like this.

---

## QC CHECKLIST

- Opens with a diagnostic question (L4 Missing Piece / L1 hybrid): YES
- Does not open with "I": YES
- Zero em-dashes: YES
- Zero bold / markdown: YES
- Zero bullets: YES
- Zero links or URLs: YES
- No contact info: YES
- Results-attached reference: YES
- Profile video CTA: YES
- No sign-off name: YES
- Google / Bing / TikTok never named as a service: YES
- Meta and creative only: YES
- Word count 350 (limit 350 for multi-question posts): YES, at ceiling
- Under 5000 chars: YES (~2,050 chars)
- Budget rule followed: acknowledges their cap, recommends $3,000/mo Meta rather than
  lowering to match: YES
- Every number traced to live data or arithmetic on their own stated figures: YES
- No implied-causation juxtaposition: YES
- Client name withheld on unflattering data: YES
- No booking CTA (post did not offer a call): YES
- No fee or hourly rate stated (pending Queenie's ruling): YES
