# Samantha Stupak (CBH Energetics / PetMedella) — win-back — Peterson — UNSENT

**Date drafted:** 2026-09-23 (Postgres now(), America/Chicago)
**Sender:** Peterson Rainey · **To:** samantha@cbhenergetics.com
**Thread:** NEW thread. Do NOT reply on the old "Full Circle Media Discovery Call" thread (Adam is on it, and its last three messages are an access request she never answered).
**Status:** UNSENT. Draft only.
**Trigger:** ClickUp `86e2b4ntp`, status "follow up pre-call", due TODAY. Peterson in-thread: "asap" then "draft a follow up for me".
**QC:** FAILed v3 on one blocking finding, now fixed (see below). Two non-copy items remain open.

## THE DRAFT

Subject: Four of your 17 live CBH ads point at Instagram, not the site

```
Samantha, this is Peterson from Creekside Marketing Pros. Adam introduced us back in June.

I went through all 17 of your live CBH ads in Meta's ad library this week. You're running two
systems side by side. Most are catalog ads, Shop Now or Learn More, click lands on
cbhenergetics.com. Four work differently: the button is an Instagram profile visit, and on three
of those four the next step is commenting a keyword.

Comment-to-DM is a legitimate play and the split may well be deliberate, so this isn't a knock.
It's a measurement question. On those four, the click never reaches cbhenergetics.com, so nothing
on your site fires from it. Whatever revenue comes out of that path is hard to separate from the
catalog ads.

The question I'd put to whoever runs the account now: on those four, what event is Meta optimizing
toward, and how do you know what those ads sold?

Same theme on the other brand. PetMedella is a working store with no ads in the library, and the
site loads without a Meta pixel where cbhenergetics.com has one. Public library, public page
source, nothing more. If paid isn't in the plan there, that explains both. If it is, the same
question lands there before the first ad does.

No pitch here. If what comes back doesn't sit right, reply here.
```

**Final question:** "The question I'd put to whoever runs the account now: on those four, what event is Meta optimizing toward, and how do you know what those ads sold?"
**Final sentence:** "If what comes back doesn't sit right, reply here."

## QC fix applied
v3 read "...so nothing on your site fires from it, **and Meta has no purchase signal coming back from that click to optimize toward.**" Cut. It asserted campaign-objective mechanics not in evidence (we have destination and button only, never the objective), and it half-answered the question the very next line asks her.

## OPEN BEFORE SEND (not copy edits)

1. **Adam's hold was never lifted.** 2026-06-30, Adam to Peterson: "Hold off on email her until I talk with her." Peterson agreed. Nothing on record releases it. The 7/14 "she went with another agency" closes the opportunity, not the hold. Full Circle Media is an ACTIVE client and re-engaged 9/21 on the Lipedema Summit, so this touches a live partner relationship. Peterson's call. If it stays open, the one clause to drop is "Adam introduced us back in June."
2. **Never escalate the pixel finding** in conversation to "she has no Meta tracking on PetMedella." Conversions API is server-side and would not appear in page source. The draft says "the site loads without a Meta pixel," which is a claim about what the browser loads and holds either way.
3. **QC flagged length** (~215 words, two brands, third unanswered email). If it needs to be shorter, cut the whole PetMedella paragraph, not the main one. The main one is load-bearing.

## VERIFIED EVIDENCE (Meta Ad Library, US, pulled programmatically 2026-09-23; all 17 ACTIVE, zero inactive)

| # | Started | Destination | Button |
|---|---|---|---|
| 1 | Aug 31 2026 | cbhenergetics.com | Shop Now |
| 2 | Aug 7 2026 | **Instagram profile** | Comment HISTAMINE |
| 3 | May 12 2026 | **Instagram profile** | Comment CLARITY |
| 4 | May 12 2026 | **Instagram profile** | Comment CLARITY |
| 5 | May 1 2026 | cbhenergetics.com | Shop Now |
| 6 | Apr 30 2026 | cbhenergetics.com | Learn More |
| 7 | Apr 30 2026 | cbhenergetics.com | Shop Now |
| 8 | Apr 29 2026 | cbhenergetics.com | Shop Now |
| 9 | Apr 17 2026 | cbhenergetics.com | Shop Now |
| 10 | Mar 2 2026 | cbhenergetics.com | Shop Now |
| 11 | Feb 27 2026 | cbhenergetics.com | Shop Now |
| 12 | Feb 10 2026 | cbhenergetics.com | Shop Now |
| 13 | Jan 29 2026 | cbhenergetics.com | Shop Now |
| 14 | Dec 21 2025 | domain unrendered, catalog | Shop Now |
| 15 | Jan 9 2025 | **Instagram profile** | no keyword |
| 16 | Aug 23 2024 | domain unrendered, catalog | Shop Now |
| 17 | Mar 18 2024 | cbhenergetics.com | Shop Now |

**4 of 17 to Instagram, 3 of those 4 with a comment keyword.**

**TRAP that killed draft v1:** the NEWEST ad (Aug 31 2026) goes to the SITE. Never imply the Instagram ads are her newest. The library does not sort chronologically and the page truncates, which is how v1 got it wrong.

**Sites, checked live 2026-09-23:**
- cbhenergetics.com: Meta pixel present, GTM-TJJ7RV3, GA4 G-CV99K2RZWY, Google Ads AW-605082050.
- petmedella.com: live WooCommerce store, product pages and cart. GTM-PQQ9K5F, GA4 G-6DY54XEHJ5. **No Meta pixel, no Google Ads tag.**
- PetMedella in the Ad Library: "No ads match your search criteria." Zero.

## RELATIONSHIP RECORD
Never had a call with her, never got account access, never ran the audit, zero performance data.
- 6/26 Adam introduces her to Peterson. Peterson replies, then sends the onboarding sheet.
- 6/29 Peterson follows up on the sheet. **She never replied to either email and never filled out the sheet.**
- 6/30 Adam: "Hold off on email her until I talk with her."
- **7/14** (not 7/15) Adam: "She went with another agency :(" Same day Cyndelsa created ClickUp `86e2b4ntp`.
- This is Peterson's **third consecutive unanswered email** to her. 71 days since the loss, 86 since our last email.
- Unknown whether she left Full Circle entirely or kept Adam and swapped ad vendors. Draft says "whoever runs the account now" so it works either way.
- If this goes unanswered, the next touch is a clean breakup, not a fourth value touch.
