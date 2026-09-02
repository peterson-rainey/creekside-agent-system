# YouTube / Google Ads media buyer, DTC ecom brands

**Profile:** Samuel Rainey (strategic + diagnostic style is Samuel-only)
**Operator named:** Lindsey (DTC ecom)
**Status: UNSENT**
**Recommendation: SKIP. Drafted anyway because the style was pre-named and the go-ahead was given.**

---

## Screening verdict: SKIP (three independent foreclosures)

Verified live against `google_campaigns` + `google_insights_daily` + `google_ad_accounts`, window 2025-09-02 to 2026-09-01.

**Every explicitly YouTube-labeled campaign in the entire Creekside book:**

| Campaign | Account | Spend | Conv | Value | ROAS |
|---|---|---|---|---|---|
| `Deman Gen - YT Ads` | Doctor Laleh | $12,216 | 59.9 | $4,288 | **0.35x** |
| `DG (YT) - Remarketing - 5 Dec` | Retirement Income Solutions | $2,951 | **0** | $0 | 0 |
| `DG(YT) - Jen Hatmaker - 20 Aug` | Tiami Sleep | $1,223 | **0** | $0 | 0 |
| `DG (YT) - Triple Monitor` | Aura Displays | $108 | **0** | $0 | 0 |
| `Video views` x2 (true `VIDEO`) | South River Mortgage | $207 | **0** | $0 | 0 |
| **TOTAL** | | **~$16,705** | **59.9** | **$4,288** | |

`VIDEO` channel type book-wide: **1 account, 2 campaigns, $207 lifetime, 0 conversions, dead since 2025-09-08.**
**Both DTC ecom YouTube attempts (Aura, Tiami) returned zero conversions.**

**Foreclosure 1 (Q1, spend).** They want $10k+/**day** on YouTube. Peak single day across our entire Google book, all channels, is **$3,222**. Our lifetime YouTube spend is under two days of their target.

**Foreclosure 2 (Q3, scaled YouTube campaign with CAC/ROAS).** Does not exist. The only YouTube campaign with any conversions is healthcare at 0.35x.

**Foreclosure 3 (Q8, screenshots).** No screenshot library exists system-wide. Case-study PDFs are largely unattachable and the Aura PDF's headline contradicts live data.

Job is **100% YouTube ownership**. This is not a proof gap at the edges, it is the whole role. Per the screen-required-items-first rule, this forecloses.

**Not fired:** full-time seat DQ (words "full time" absent), geo DQ, spend DQ (they clear $5K/mo comfortably).

---

## The draft (3,931 chars, mechanically counted, under the 5,000 limit)

YOUTUBE

Straight answer before the specifics. Our team is strong on Google Ads for DTC ecommerce and on the tracking layer underneath it, and we have not run YouTube in-stream at $10k a day. If that is a hard gate, stop here and I will not waste your time.

What we do have is the thing that usually breaks when a YouTube channel goes from a testing budget to real spend, which is the measurement layer.

1. Most spent per day and per month.
Peak day across our Google book is $3,222. Peak month on a single account is $65,682, a reverse mortgage account we ran through August. YouTube specifically is much smaller, roughly $16,700 lifetime across six Demand Gen and video campaigns on five accounts. I am not going to inflate that.

2. DTC brands and products managed.
Aura Displays (Shopify, monitors and displays, built from zero in November 2025 and still running). Tiami (Shopify Plus, luxury mattresses). Practical Survival Gear. Nightlark. Scattered Kind. Lindsey runs our DTC ecommerce side and would be the operator on your account.

3. A YouTube campaign we scaled, with economics.
We do not have one, and I would rather say that than dress up a Demand Gen test. Our two DTC YouTube attempts, one on Aura and one on Tiami, spent $108 and $1,223 and returned zero purchases. The scaling story I can give you honestly is Google cold traffic on Aura. We took non-brand spend from about $1,900 a month to a peak near $7,800, roughly 4x, and non-brand ROAS went from 11.56x down to 3.41x over ten months at roughly a $540 average order value. Whether the next increment of spend is worth buying is a live question on that account right now. That curve is the honest shape of scaling, and it is what I would want a buyer to show me rather than a peak month.

4. Can you build a Google Ads + GTM + GA4 stack from scratch.
Yes. Aura is the proof. Account, Merchant Center feed, GA4, GTM, purchase and transaction value tracking, all built by us from nothing in November 2025.

5. GTM/GA4 rating.
8. That means client and server side container work, dataLayer purchase events carrying transaction values, Enhanced Conversions, offline conversion imports, and debugging why a purchase fires twice or fires again on a thank you page refresh. It does not mean we write custom attribution models in BigQuery.

6. A hard tracking problem we solved.
Aura looked like an 8 to 9x account. It was not. The blend was carried by branded search at 28.74x while non-brand had quietly decayed to 3.41x, and nobody caught it because reporting rolled brand and non-brand together. We split every campaign on naming and rebuilt reporting on the non-brand segment alone. That did not improve the number, it revealed it. The problem was never in the campaigns, it was in what we were measuring. This is the most common failure I see in ecommerce accounts, and it will bite harder on YouTube, where view-through conversions inflate a blend the same way branded search does.

7. Time to tracking verified and campaigns live.
Tracking verified in two to three business days, assuming site access and one real test purchase. Campaigns live the same week once creative is in hand.

8. Screenshots.
We do not keep a screenshot library, and I am not going to send numbers you cannot interrogate. If it is useful, I would rather do a working session on your account once access exists and show you the tracking QA on your own data.

One thing worth settling early, since you named RedTrack and Triple Whale. Google's modeled and view-through conversions and a third party attribution tool will not agree on what YouTube did, and the gap grows with spend. I have not run YouTube at your target budget, so I am not going to tell you how wide that gap gets on your offers. What I will say is that deciding which number governs budget before you scale, rather than during, is the difference between a channel you can defend and one that gets cut in a bad week.

---

## Compliance notes

- Opens with `YOUTUBE` as instructed; all 8 questions answered in order.
- No em dashes. No links, no contact info, no calendar link (first touch).
- "Our team" throughout; Samuel/Peterson never named as the worker; Lindsey named as DTC ecom operator.
- **Aura blended ROAS never quoted as a win.** The blend is cited only as the thing that was misleading, which is the sanctioned use.
- Aura framed as **built from zero**, never a takeover. No "49 countries" claim.
- South River in **past tense** ("ran through August"), churned 8/11/26.
- No attachment promised. Q8 answered with a live walkthrough offer instead.
- Scattered Kind named as an account only, no figures (live pull 6.92x PMax conflicts with the 3.18x in memory; windows differ, so no number cited).

## QC pass (2026-09-03) — 8 findings, all resolved

QC ran without DB access, so every figure it flagged was re-verified live here. Three of its findings were real
defects, one was a false alarm, and the live re-pull caught a fourth error QC could not see.

| # | Finding | Resolution |
|---|---|---|
| 1 | `$65,682` peak month unsupported | **VERIFIED, kept.** South River Mortgage, June 2026, live from `google_insights_daily`. `clients.industry` = "Financial Services / Reverse Mortgage", so the descriptor is correct too. Churned, and the draft already uses past tense. |
| 2 | Closing note claimed YouTube-at-scale pattern knowledge we don't have | **VALID, rewritten.** Now explicitly says "I have not run YouTube at your target budget" and reframes as a decision to settle in advance rather than an observed pattern. |
| 3 | "five campaigns" vs six in the table | **VALID, fixed.** Now "six campaigns on five accounts," and $16,000 corrected to $16,700. |
| 4 | Aura figures unverified | **RE-PULLED, two were WRONG.** See below. |
| 5 | Implied causation in Q6 | **VALID, fixed.** Added "That did not improve the number, it revealed it." |
| 6 | Q8 committed to showing a live client account to a prospect | **VALID, fixed.** Now offers a working session on *their* account once access exists. No third-party account exposure. |
| 7 | Night Lark vs Nightlark | **Fixed.** `clients.name` = `Nightlark`. Also `Tiami`, not `Tiami Sleep`. |
| 8 | Char count self-reported | **Recounted mechanically: 3,931.** Header corrected from 3,943. |

### Finding 4: the live re-pull corrected two figures the draft had wrong

`google_insights_daily` JOIN `google_campaigns`, Aura Displays, campaigns tagged `UNBRANDED`:

| Month | Spend | ROAS | AOV |
|---|---|---|---|
| 2025-11 | $1,901 | **11.56x** | $477 |
| 2026-03 | $7,179 | 5.23x | $537 |
| 2026-05 | $7,793 (peak) | 4.17x | $585 |
| 2026-08 | $4,735 | **3.41x** | $556 |

- **Non-brand ROAS now closes at 3.41x, not the 4.4x the draft claimed.** Memory's 4.37x was a mid-August
  snapshot; the full month came in lower. Decay is steeper than written. Corrected.
- **AOV is roughly $540, not $300.** The draft's "$300 AOV" was wrong and materially so, since it was the
  premise for calling the trade worthwhile. Corrected, and the conclusion softened to "whether the next
  increment is worth buying is a live question," which is what 3.41x actually supports.
- Branded search lifetime is **28.74x** on $25,496 (was written as 26.91x, which was the May-Aug window).
- "Roughly 4x more cold spend" **verified**: $1,901/mo to a $7,793/mo peak.

**Standing note:** this is the second time an Aura figure carried from memory failed a live re-pull. Aura's
numbers decay month over month, so re-pull them before every send rather than citing any stored figure.
