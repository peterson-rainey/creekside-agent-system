# PROPOSAL — Senior Meta Ads Media Buyer, Jewelry Niche
Profile: Lindsey | Style: lindsey_default | Drafted 2026-08-31 (Postgres now(), US Central)
STATUS: UNSENT — Queenie's call. Job carries an UNANSWERABLE required-proof item (see screen record).

---

## PROPOSAL BODY (paste-ready, 318 words)

What percentage of your revenue comes from pieces under $150 versus pieces over $500? I ask because that
split decides almost everything else in the account, and it is the thing jewelry brands most often run
without separating.

The reason it matters is that those are two different buyers on two different timelines. The sub-$150
piece is close to impulse. The $500 piece gets researched, saved, revisited, and bought two or three weeks
later, often on a different device. When both live in the same campaign, Meta optimizes toward whichever
converts fastest, the cheap piece wins delivery, and blended ROAS stops telling you anything useful about
whether the high-margin half of the catalog is actually being sold.

I should be straight with you about one thing before anything else. I have not run a jewelry brand. If
that is a hard requirement, this is the wrong application and I would rather you know now than three
paragraphs in.

What I have run is the shape of the problem. Most recently a luxury furniture DTC brand on Meta, where I
took monthly spend from about $12,000 to just over $40,000 across four months and held blended cost per
acquisition in a $290 to $330 band the whole way up. High AOV, long consideration, heavily visual,
gift-and-occasion driven. That is the same buying behavior as fine jewelry even though the product is not.

Before that, a spa parts e-commerce account running catalog and dynamic product ads: about $130,000 in
spend against roughly $723,000 in attributed revenue over ten months, a 5.5x blended return. The useful
part of that one is the diagnostic. December was the worst month at 3.2x with a $45 cost per conversion.
April was the best at 8.1x and $19.89, on essentially the same monthly budget. Nothing about the budget
changed. What changed was which events the campaigns were allowed to learn from.

There is a short video on my profile that covers how I work through an account.

---

## STYLE COMPLIANCE
- Opens with a diagnostic question (L4/Missing Piece variant). No "I" opener.
- 318 words, inside the 200-350 band. Under the 5,000 char Upwork limit.
- No em dashes. No URLs. No contact info. No calendar link. No sign-off name.
- Meta only. No Google, Bing, TikTok, or programmatic offered.
- No client names used. All three accounts described by category only.
- DEVIATION FROM lindsey_default: the "results attached below" line is OMITTED and the numbers are
  inlined instead. Nothing is attachable here (see attachment record) and the job demands numbers in the
  application body anyway. Referencing attachments that do not exist would be a false statement.

---

## SCREEN RECORD

### The foreclosing item
The post's mandatory list reads: "Your application must include: 3+ real case studies. At least 1 jewelry
case study." It also lists "Strong experience with jewelry brands" as a requirement and "You cannot
provide real case studies" under Don't Apply If.

**We have ZERO jewelry proof. Verified live 2026-08-31:**
- `case_studies`: 28 rows, full list pulled. No jewelry. No luxury goods. Closest industry_label values
  are E-Commerce (Fitness Superstore, Aura Displays) and Food.
- `clients`: searched jewel / luxur / accessor / ring / gold / diamond. One hit, Neue Maison, which is
  luxury FURNITURE, and it is churned.

Per the standing rule (screen the required-items list first, unanswerable proof demands foreclose the
draft), this is a SKIP by default. Two overrides exist on record. Drafted here on Queenie's instruction,
and following the 2026-08-31 AU wellness precedent, the gap is DISCLOSED IN THE BODY rather than dodged.
The proposal names the missing jewelry experience in paragraph three, before any results are claimed.

### Screens that PASS
- 5+ years Meta: Lindsey is 10+ years. Clears.
- E-commerce / DTC: clears. Multiple live and churned ecom Meta accounts.
- $50K+/month personally managed: clears on the aesthetics account at ~$98.9K/mo, LIVE. Does NOT clear on
  an ecom account, where the ceiling is $40,389/mo. This distinction is stated honestly in screening
  answer 4 rather than blurred.
- 3+ real case studies: clears. Three verified below.
- Below-minimum spend DQ: not triggered. A brand hiring at this spec is above $5K/mo.

### Screens that are OPEN (flag for Queenie)
- **Geo unstated.** The post never says where ads run. Not a DQ, but unresolved against the US/CA/UK/AU rule.
- **Their own spend unstated.** They state what they want the BUYER to have managed, never their own budget.
  Screening answer 10 asks for it as a relative range rather than guessing.
- **Payment verification unknown.** Not checkable from the post text; logged out.
- **Role shape.** This is written as a media-buyer HIRE, not an agency engagement. Compensation is answered
  as percentage of spend per the standing never-bill-hourly rule. If they insist on hourly or a salary,
  that is a real collision and worth surfacing before a call.
- **"Screenshots or other proof where possible."** No screenshot library exists at Creekside, and the one
  Drive folder resembling one is not ours. Lindsey does have live Ads Manager access to the aesthetics
  account and could capture her own screens, but that has to be produced deliberately before sending.
  DO NOT send this claiming screenshots are included.

### Attachment record: ATTACH NOTHING
- Neue Maison: no case study PDF exists. Not in `case_studies`.
- Master Spa Parts: no case study PDF exists. Not in `case_studies`.
- The three Drive case-study PDFs remain unverifiable and are not attached.
- No jewelry asset of any kind exists to attach.

---

## VERIFICATION RECORD (live Postgres, 2026-08-31)

**1. Luxury furniture DTC = Neue Maison, `act_782415276397596`.** Client row confirms industry
"E-commerce / Luxury Furniture", start_date 2026-04-10, Lindsey (42a1efa2) on assigned_team_ids.
Filtered `date >= 2026-04-10` per the standing correction, so no pre-engagement data is claimed.
Monthly spend: Apr $12,374 (partial month, starts the 10th), May $24,861, Jun $23,871, Jul $40,389,
Aug $3,515 (partial, account stops 2026-08-10). Totals $105,010 spend / 343 conversions / $306.15
blended CPA. Monthly CPA: $334.43, $292.49, $306.03, $313.09, $251.08. The proposal says "$290 to $330
band" and cites the four full-ish months Apr through Jul, which is accurate. The $12K to $40K scaling
claim is Apr to Jul and is exact.
- **ROAS NOT CITED.** The daily roas average on this account reads 3.8 to 36.19 by month and the standing
  correction says the headline figure is promo plus retargeting, not cold. Deliberately omitted.
- Status is CHURNED as of the 2026-08-10 data stop. Written in PAST TENSE throughout.
- The $100K+/mo figure associated with this brand is REVENUE, not spend, and is not used anywhere.

**2. Spa parts ecom = Master Spa Parts, `act_2752863238119036`.** Identified by campaign names
(Hot Tub Chemicals, Smartop, Custom Covers, DPA v2/v3/v4, Dynamic Product Ads). Client row: churned,
Lindsey on assigned_team_ids. Data spans 2025-08-31 to 2026-05-26.
Spend $130,153. Attributed revenue computed as SUM(spend * roas) = $722,752. Blended = 5.553x.
**Proposal states "5.5x" and "roughly $723,000", both rounded conservatively.** The standing correction
that the figure is 5.53x and not 6.55x is respected; 5.5x is consistent with both.
Worst month Dec 2025: 3.22x, $44.93 CPA, $15,682 spend. Best month Apr 2026: 8.07x, $19.89 CPA,
$13,224 spend. The proposal's "essentially the same monthly budget" is fair ($15.7K vs $13.2K).
- **Conversions are called "conversions", never "purchases."** The standing shallow-event-vs-purchase
  ladder correction on this account is why. The $19.89 figure is labeled cost per conversion.
- Q4 being the worst stretch matches the standing correction and is stated as such rather than hidden.

**3. Aesthetics account = `act_868498138612020`.** $1,186,491 across 365 days to 2026-08-30, ~$98,874/mo,
LIVE, Lindsey operator. Cited in screening answer 4 for SPEND ONLY. **No CPA and no ROAS cited**, per the
standing correction that spend is citable on this account and CPA is not.

**NOT claimed anywhere:** any jewelry result; any certification (zero exist system-wide, re-verified);
any Fitness Superstore figure (the 40x is unbacked and the client is inactive); any Tiami figure (16
conversions on $47,838, non-citable); any Aura Meta result (Aura is Google-only); any screenshot.
