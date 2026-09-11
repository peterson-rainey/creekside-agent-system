# Yinstill Reproductive Wellness — 5 screening answers

**Profile:** Samuel Rainey | **Style:** samuel_strategic-diagnostic | **Date:** 2026-09-11 (US Central) | **Status:** UNSENT
**Companion to:** `2026-09-11_yinstill-reproductive-wellness-google-search-6week_samuel_strategic-diagnostic_spend-ceiling_UNSENT.md` (commit 57095d4). Same job, same sub-$5K DQ, same ask-the-ceiling disposition.

## Facts verified live for these answers (2026-09-11)

- **Integrity Naturopathic**, account `5360677991`: **$22,781.77 / 574.9 conv / $39.62 CPA**, 2025-09-11 → 2026-09-10. Cited as "around $40 a conversion", blended, never as cost per booked patient. Only row in the book with `booked_conversion_actions` populated.
- **Integrity held CPA through a policy flag** (memory, live-verified 8/27): March 2026 disapproval month ran $1,958 / 52 conv = $37.65, in line with its trailing average.
- **Won Google appeal**, gTech ticket 6-9600000038737, policy "Health In Personalized Advertising", 2025-06-25. Cited as work done; client never named (the row is mis-linked anyway).
- **GM Therapy** (inactive): ads naming diagnostic categories did not serve while the rest of the account ran under a "limited" warning. Policy experience only, explicitly no results claim — the account produced 1 form + 1 call in two weeks and was terminated June 2025.
- **The Tooth Co**: active Healthcare/Dental on google + lsa + meta.
- **Target-CPA correction** (`agent_knowledge`): a Google target CPA was lowered from $50 to $30; Google shifted to lower-quality leads, qualified volume collapsed and cost per qualified lead rose above target. Cited unnamed.
- **Vancouver keyword data**, pulled live via Google Ads KeywordPlanIdeaService (geo `1001970`, through account 5948318044, which returns **USD**): "fertility clinic" **260/mo, LOW competition, top-of-page $1.80–$4.44 USD** (≈ CAD $2.50–$6); "infertility" 110/mo; "conception" 170/mo; most IVF long-tails **10/mo**; every embryo-transfer acupuncture variant **~10/mo with no bid range reported**. Canada-wide "fertility clinic" is 5,400/mo at $2.01–$14.26 USD.
- Six-week media = 42 × $50 = **$2,100 CAD**; at ~$4 CAD/click ≈ **500 clicks total**, ~12/day, ~3/day per campaign if split four ways.

## Rules applied

No hourly figure (Q5 asks for hours; declined per [[feedback_never_bill_hourly]], answered with the fee). No links, no sign-off, no em dashes, no parroting, no answer-validating filler. Jane App, fertility/IVF and Canada zeros disclosed. No Creekside budget figure quoted (below-floor anchor screen). Book pooled as "our team"/"we".

---

## Answers

**1. Tracking a completed booking through Jane, and separating it from a button click**

Two conversion actions, not one. Booking started fires on the button click and stays secondary, for diagnostics only. Attended appointment is the single primary action, and it comes in by import.

The audit checks two things first. Where Jane's flow actually runs: if booking sits on a Jane subdomain rather than your own site, the session breaks at that hop, and without cross-domain measurement and a referral exclusion for that domain the booking gets credited as a referral instead of to the ad. Then whether the confirmation step will accept a tag at all. Practice systems vary on this and several will not take custom code, so it gets verified rather than assumed.

Even when a tag does fire there, it counts a booking, not an attendance. So the click ID is captured at booking time and stored against the appointment, attendance is exported weekly, and those are uploaded back to Google as offline conversions. Bidding then learns from people who actually showed up, and you get a cost per attended patient rather than a cost per click on a button.

We have not done this specific integration on Jane. The same mechanism runs today on a naturopathic clinic account, with a booked-appointment conversion imported from that client's CRM.

**2. Most relevant healthcare or sensitive-category experience**

That naturopathic clinic is the closest match. Google Search, live now, roughly $40 a conversion across the last twelve months, using the booked-appointment import described above. It also took a policy disapproval in March and held the same cost per conversion through it, which is more useful than a claim of never being flagged.

We have also filed and won a Health in Personalized Advertising appeal on a health account, self-service appeal first, then escalation to Google's policy team. And on a therapy practice we watched ads naming diagnostic categories quietly fail to serve while the rest of the account kept running under a limited warning. That account was small and short-lived, so there is no results story attached to it, but the policy behaviour is the part worth having seen.

Two things worth knowing early. Disapprovals in this category usually trace to landing page content rather than ad copy. And fertility falls under restricted interest categories, so audience-based remarketing stays off the table later even though Search keywords are unaffected.

Dental practices on Google, Local Services and Meta fill out the rest of the healthcare side. No fertility or IVF clinic, and no Canadian client.

**3. Structure and staging on $50 CAD per day**

Some numbers from Vancouver first. Fertility clinic runs about 260 searches a month locally with top-of-page bids around $2.50 to $6, competition low. Most IVF variations sit at 10 a month. Embryo transfer acupuncture terms are about 10 a month each, too thin for Google to even report a bid range. At roughly $4 a click, six weeks buys somewhere near 500 clicks in total, about 12 a day. Split four ways that is 3 a day for Vancouver and one or two for the outer areas.

Separate campaigns per area will not be readable at that volume. Separate campaigns are only needed for separate budget control, and location reporting already gives you cost and bookings per area inside one campaign.

So weeks one and two: a single Vancouver campaign with two ad groups, general fertility and infertility care, then IVF and embryo transfer support. Exact and phrase only, search terms reviewed daily, negatives built from day one.

Weeks three to six: add Surrey/Delta and Tri-Cities as targeted locations with bid adjustments, reported separately. Each becomes its own campaign when it earns enough volume to hold its own budget, not before.

Embryo transfer stays a keyword theme rather than a campaign. The searches are real, there are just very few of them.

**4. Bidding before there is reliable completed-booking data**

Manual CPC to start, or Maximize Clicks with a bid ceiling. With no conversion history there is nothing for smart bidding to learn from, and the first two weeks are really about controlling CPC and cleaning up search terms.

The trap is moving to Target CPA early and pointing it at the booking button. Smart bidding optimizes toward whatever you feed it, so it buys the cheapest button clicks it can find and the attendance gap never shows up in the numbers. We had a Google account where the target CPA was lowered to chase efficiency, and Google shifted to cheaper, lower-quality leads. Qualified volume dropped and the real cost per qualified lead went up rather than down.

The sequence is manual first, attended appointments importing from week two or three, then Maximize Conversions once that action has enough history to bid on. At this budget six weeks may not reach that point, and if it does not, staying manual is the right call rather than handing the account to an algorithm working off twenty data points.

**5. Hours and cost**

We do not bill by the hour, so rather than give you an hours figure that would not determine what you pay, here is the fee.

Audit, tracking setup, campaign build and launch is $1,500, one time. That covers the Google Ads, GA4 and Tag Manager review, the conversion actions, the Jane and offline-import work, and the build. Figure about a week of elapsed time before launch.

Six weeks of monitoring and optimization is 20% of ad spend with a $1,500 monthly minimum, so roughly $2,250 for the period. Ongoing support afterward continues on those same terms, with the percentage taking over from the minimum as spend grows.

At $50 a day that minimum sits above your media, which is worth naming plainly. It is also why the range you would scale into, if the six weeks works, changes what I would build now.
