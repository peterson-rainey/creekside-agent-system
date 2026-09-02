# Screening answers - A Beauty Laser & Skin (Angela), Plainfield IL med spa, Google Ads takeover
Profile: Peterson Rainey | Q&A mode | Drafted 2026-09-02 (Postgres now()) | STATUS: UNSENT
Pairs with: upwork-medspa-laser-hair-removal-google-peterson-strategic-2026-09-02.md

## VERIFICATION FOR Q1 (the years claim)
- Med spa / medical aesthetics engagements on record, with dates:
  - Advanced Med Spa: case study window Oct 2023 to May 2024, "In 2023" per the PDF. Google + Meta. 3 locations,
    North Atlanta. `clients.start_date` is NULL so 2023 comes from the case study PDF + the Apr-May and
    Jun-Jul 2024 monthly report PDFs in gdrive_operations. Now `inactive`.
  - Doctor Laleh: `start_date` 2025-06-30, contract signed 2025-06-28. Dental aesthetics, "Lux Dental Spa".
    ACTIVE, both platforms.
  - Fusion Aesthetics: `start_date` 2026-06-11, industry "Healthcare / Medical Aesthetics", already `inactive`.
    NO reporting_clients row, NO ad account id, so NO evidence ads ever delivered. NOT CITED.
  - Ella Skincare (2026-06-15) and GlowXtra (churned 2026-01-15): no ad account ids. NOT CITED.
- So the honest span is 2023 to now, with a gap. Answer says "about three years" and then names the accounts
  and dates so she can judge it herself. Six years is the overall paid-ads figure for this profile, NOT ten.

## WITHHELD
- Advanced Med Spa's $74.12 -> $38.34 Google CPA. Same reports show conversions 65.77 -> 8.77/mo. See the
  proposal draft. Still out.
- "2x industry average." Unsourced benchmark.
- Fusion Aesthetics entirely. One month, no delivery evidence.
- Any laser hair removal cost-per-anything. We have the service line tracked, not citable LHR economics.
- Any certification. Zero exist.
- Any conquest or competitor-brand-defense result. Both are system-wide zeros. Q3 recommends defending HER
  OWN brand terms, which is not a conquest claim.
- No links, no contact info, no em dashes.

## VERIFIED NUMBERS USED
- Doctor Laleh, Google, live: 2026-04-20 to 2026-09-01, $82,637.12, 561.2 conv, $147.26 CPA.
- Integrity Naturopathic, Google, live: 2025-09-02 to 2026-09-01, $22,874.56, 584 conv, $39.17 CPA.
- Integrity keyword spread (from the attachable PDF, page 3): "naturopathic doctor near me" 30.5 conv @ $13.49
  / 12.64% CTR; "naturopathic doctor sacramento" 21 @ $13.39; "holistic doctor near me" 15.7 @ $15.99;
  "women's hormone doctors" 24 @ $17.61; "medical wellness" 45 @ $35.79.
- Advanced Med Spa service lines needing separate tracking links, per "Advanced Med Spa Additional Info":
  Medical Spa general search, Body Sculpting, Spider Vein Removal, LASER HAIR REMOVAL, InMode/Morpheus8/Forma.
  Owner requested a 20-30 mile radius per location.
- Diagnostic findings cited in Q2 are real: the presence vs presence-or-interest location setting causing six
  months of out-of-market traffic (60-min Loom, e4367859), and the duplicate tag traced to a WordPress site on
  a Dallas/Southlake med spa audit (16-min Loom, 3d806310). Both are ours.

---

## 1. How many years with the Medspa Industry?

About three years in med spa and medical aesthetics, inside six years running paid ads overall.

Rather than leave that as a number, here is what it actually consists of. The med spa work started in 2023 with a three location practice in the North Atlanta area, Google and Meta, running from late 2023 through mid 2024. Laser hair removal was one of five service lines we tracked separately there, alongside body sculpting, spider vein, injectables, and the InMode and Morpheus8 treatments. Since mid 2025 we have run a cosmetic aesthetics practice on both platforms, which is still live today.

I would rather be straight with you than round the number up. It has not been three continuous years of med spa specifically. It has been continuous years of local elective healthcare, with med spa and aesthetics accounts inside that.

## 2. How do you determine whether poor results are caused by the Google Ads campaign, the landing page, or the tracking setup?

Tracking first, always, because until it is right you cannot judge the other two. The specific test is not whether tags fire, it is whether the number in Google matches what actually happened. Pull the same date range from Google and from Square and see if the conversion counts reconcile. They usually do not. Then check whether the conversion linker is in place so the click ID passes back, whether enhanced conversions are on, and how many actions are marked primary, because when several are primary at once the count inflates and bidding learns from the wrong thing. On one account a chat widget was set as primary and had recorded zero conversions all year despite firing correctly, so every lead through it was invisible.

Once the numbers reconcile, campaign and landing page separate cleanly. Look at the conversion rate on the page by traffic source. If the page converts normally for organic and direct traffic but poorly for paid, the page is fine and you have a traffic quality problem, which means search terms, match types, or geography. If it converts poorly for everyone, it is the page. The search terms report settles most of these in about ten minutes.

Two real ones worth mentioning since they match your setup. A location setting left on presence or interest instead of presence sent six months of out of market traffic that everyone had been calling spam. And on a med spa with a WordPress site, a plugin was firing a duplicate tag, which double counted conversions and quietly made every cost per lead look better than it was.

## 3. How would you approach growing laser hair removal bookings for a local med spa like mine?

Laser hair removal gets its own campaign, its own budget, and its own target. It does not share with injectables. Injectables convert faster and cheaper, so on a shared budget they win the auction internally and the laser money drains without anyone noticing, because the blended report still looks fine.

Then split by intent rather than by service. Someone searching laser hair removal plus a body area, underarms, legs, brazilian, is a different buyer than someone searching for price or a deal. Deal seekers convert on forms at a great rate and rarely buy a package. Early on I would rather negative those terms out than pay to learn that lesson twice.

The bigger lever is what you optimize toward. Laser is a package, six or more sessions, so the money is in who buys the series. Once Square can tell Google who actually purchased a package, and for how much, bidding chases packages instead of consult requests. That single change usually matters more than anything done inside the campaign.

Geography matters more here than in most local advertising. Six to eight return visits means drive time predicts who finishes the package, so a tight radius will look worse on lead count and better on revenue.

One honest limit. There is a finite amount of laser hair removal search around Plainfield each month. We can capture more of it and capture it more profitably, but past a certain point growth comes from widening the radius or leaning on your other services, and both cost something. I would want to look at your Square history to see the seasonal shape before we set budget.

## 4. Describe your recent experience with similar projects

Two current, one older and closer to your vertical.

Running now is a cosmetic aesthetics practice on Google, about $82,600 in spend and 561 conversions since April at roughly $147 each. High ticket elective, local, consultation driven, so the whole job is qualified consults rather than volume.

Also running is a naturopathic practice in Sacramento, Google only, 584 conversions over the last twelve months at $39 blended on about $1,900 a month. That one is the better structural match to your situation: a modest budget, one location, and a market where the service intent searches carry the account and the broad wellness terms waste money.

The closest vertical match is the North Atlanta med spa from 2023 into 2024, Google and Meta across three locations, with laser hair removal tracked as its own line. They came to us with a third location close to closing and ended up planning a fourth. That one is a couple of years old now, which is why I am putting the two live accounts in front of it.

## 5. How do you use metrics to inform your strategy?

The metric that governs the account is the deepest one I can feed back into Google, not the one that looks best in the dashboard. For you that is a purchased package out of Square. Cost per lead is a check, not a decision metric, because you can always buy a cheaper lead by making the form easier.

Past that, segment before averaging, because blended numbers hide the decision. On the Sacramento account the blended figure is $39, but inside it the core service intent terms convert at $13 to $18 while broader wellness terms sit around $36. Same account, same month, roughly a 2.6x spread. That spread is the strategy. Money moves toward the terms that convert and the rest get negatived.

I also hold to volume thresholds before acting. A bad week on a local account is usually noise, and rebuilding on it costs you the learning period for nothing. I would rather set the review cadence up front, agree on what counts as a real signal, and only touch structure when a segment crosses it.
