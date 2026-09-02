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

## The draft (3,943 chars, under the 5,000 limit)

YOUTUBE

Straight answer before the specifics. Our team is strong on Google Ads for DTC ecommerce and on the tracking layer underneath it, and we have not run YouTube in-stream at $10k a day. If that is a hard gate, stop here and I will not waste your time.

What we do have is the thing that usually breaks when a YouTube channel goes from a testing budget to real spend, which is the measurement layer.

1. Most spent per day and per month.
Peak day across our Google book is $3,222. Peak month on a single account is $65,682, a reverse mortgage account we ran through August. YouTube specifically is much smaller, roughly $16,000 lifetime across five Demand Gen and video campaigns. I am not going to inflate that.

2. DTC brands and products managed.
Aura Displays (Shopify, monitors and displays, built from zero in November 2025 and still running). Tiami Sleep (Shopify Plus, luxury mattresses). Practical Survival Gear. Night Lark. Scattered Kind. Lindsey runs our DTC ecommerce side and would be the operator on your account.

3. A YouTube campaign we scaled, with economics.
We do not have one, and I would rather say that than dress up a Demand Gen test. Our two DTC YouTube attempts, one on Aura and one on Tiami, spent $108 and $1,223 and returned zero purchases. The scaling story I can give you honestly is Google cold traffic on Aura. We took non-brand spend up roughly 4x and watched non-brand ROAS go from 11.56x down to about 4.4x across ten months. At a $300 AOV that was still the right trade. That curve is what actually happens when you scale, and it is the number I would want a buyer to show me rather than a peak.

4. Can you build a Google Ads + GTM + GA4 stack from scratch.
Yes. Aura is the proof. Account, Merchant Center feed, GA4, GTM, purchase and transaction value tracking, all built by us from nothing in November 2025.

5. GTM/GA4 rating.
8. That means client and server side container work, dataLayer purchase events carrying transaction values, Enhanced Conversions, offline conversion imports, and debugging why a purchase fires twice or fires again on a thank you page refresh. It does not mean we write custom attribution models in BigQuery.

6. A hard tracking problem we solved.
Aura looked like an 8 to 9x account. It was not. The blend was being carried by branded search at 26.91x while non-brand had quietly decayed, and nobody caught it because reporting rolled brand and non-brand together. We split every campaign on naming, rebuilt reporting on the non-brand segment alone, and the real cold traffic number came back near 4.4x. The fix was not in the campaigns, it was in what we were measuring. This is the most common failure I see in ecommerce accounts, and it will bite harder on YouTube, where view-through conversions inflate a blend the same way branded search does.

7. Time to tracking verified and campaigns live.
Tracking verified in two to three business days, assuming site access and one real test purchase. Campaigns live the same week once creative is in hand.

8. Screenshots.
We do not keep a screenshot library, and I am not going to send numbers you cannot interrogate. I would rather walk you through the Aura account live and let you click into it yourself.

One diagnostic note, since you named RedTrack and Triple Whale. Once YouTube goes past a few thousand a day, Google's modeled and view-through conversions stop reconciling with your attribution tool, often by a wide margin, and the instinct is to trust the tool and cut YouTube. Deciding in advance which number governs budget, and holding to it, matters more than the campaign structure does. That is the conversation I would want to have first.

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
