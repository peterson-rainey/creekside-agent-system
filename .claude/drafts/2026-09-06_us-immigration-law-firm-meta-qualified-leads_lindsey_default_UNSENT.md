# Upwork Proposal - US immigration law firm, Meta Ads performance marketer (qualified leads / CAC)
Profile: Lindsey | Style: lindsey_default | Status: UNSENT | Drafted 2026-09-06

---

QUALIFIED LEADS

Before the eight answers, the thing I would want to know first if this were my account: how much of your Meta traffic is currently being reviewed as social issue advertising. Immigration sits on Meta's US social issue list, so immigration creative gets pulled into that review even when you are only advertising legal services. That path carries advertiser authorization, ID verification and a paid for by disclaimer on every placement, and authorization gates launch rather than delivery. It also does not carry the housing and employment restrictions people assume, so lookalikes and tight geo both survive. Knowing which side of that line your ads are landing on decides your creative rules and your first 30 days.

1. Law firms and practice areas. Straight answer: my own Meta work has not been for law firms. Our book has run legal, personal injury and consumer bankruptcy, and that work was Google Ads, not Meta. No immigration. I would rather you know that now than find it on a call.

2. Specific results. On Meta, the account I run is just under $100,000 a month in spend, about $1.19 million over the last twelve months, live today, high ticket elective health. Spend is the honest figure there because the account's conversion data is incomplete and I will not build a cost per patient out of it. On the legal side, our team took a bankruptcy firm from 117 to 229 leads and cut cost per lead 42 percent, from $86 to $50.29, by restructuring around one county. That was Google Ads. I can send the write up if useful.

3. Good CPL, bad leads. A dental implant account I worked, Meta lead forms feeding a call center. 2,558 leads at $25.31 over 90 days on $64,747, and the intake team could not close what was coming in. Two fixes. Qualifying questions inside the form, deliberately accepting a higher CPL to buy a better lead. Then we found the real ceiling was not cost at all, it was call center capacity, so spend was throttled to match how fast leads could actually be dialed. That account has since ended. In an immigration funnel the same question is case type and eligibility, asked in the form, before intake spends twenty minutes on someone with no path.

4. Who owns creative performance. The media buyer. The creative team owns craft, and craft is not the same as performance. If a hook fails, that is my brief, my angle, my read of the audience. Handing your video producer a losing concept and blaming the edit is how accounts stall.

5. Sales and CRM data. The honest version is two layers. Layer one I do every week: pull the disposition of every lead by campaign, ad set and ad, then judge creative on retained clients rather than form fills. Layer two is pushing a qualified or retained stage back into Meta as the optimization event so the algorithm chases cases instead of clicks. I have never built that send back myself and I have never worked in Lawmatics. That is a scoped build with your developer, not something I would claim as done.

6. First 30 to 90 days. Days 1 to 30, audit and instrument. Confirm pixel and CAPI event quality, match rates, UTM discipline, and where the handoff to Lawmatics breaks. Set the practice area split and one clear primary event. Days 30 to 60, test structure and message: two or three practice areas, form versus landing page, English and Spanish separated so you can read them. Days 60 to 90, kill on lead quality data, not CPL, and build retargeting off the people who started and abandoned intake.

7. Briefs. Yes. Written concepts with hook, audience, promise, format, length, and the specific objection each asset is meant to break.

8. Fee. Monthly, as a percentage of ad spend, not hourly. 20 percent below $30,000 a month, 15 percent from $30,000 to $60,000, 10 percent above that, with a $1,500 monthly minimum and a one time $1,500 onboarding that includes the full account audit. I can give you the actual number as soon as you tell me roughly what you are spending on Meta each month now.

Two questions back. Roughly what is your current monthly Meta spend, and what is an average retained immigration case worth to you?

There is a short video on my profile covering how I work an account like this one.

---

## Screening notes (internal, not part of the proposal)

**Style label resolved.** Request said "strategic + diagnostic style ... write it in lindsey_default." `strategic` is a Samuel-only style label; Lindsey has one sanctioned style and it is diagnostic by construction. Written in lindsey_default as instructed.

**Required-items screen (run FIRST).** Q1 and Q2 demand Meta results for law firms including retained clients. That is a hard proof gap: zero legal Meta rows anywhere. It is a strong preference, not a stated required qualification, and "immigration law experience is a major plus" is explicitly a plus, so this did not foreclose the draft. It IS conceded outright in answer 1 rather than bridged. If Peterson would rather not bid a post where the first two questions are unanswerable, this is the one to skip.

**Verified live 2026-09-06 via `execute_sql`:**
- **Zero legal Meta proof.** `case_studies` legal rows are Big Chad Law and Winterbotham Parham Teeple, both `platforms = {Google Ads}`. `reporting_clients` has Big Chad Law (google, churned) and Helix Law (meta, churned). Joining `meta_insights_daily` -> `meta_campaigns` -> `meta_ad_accounts` for any law account returns **zero rows**, so there is no citable legal Meta performance number, including for Big Chad Law. Zero immigration anything.
- Big Chad Law's "$20K/month, $1,500 per qualified case" is deliberately absent: it fails live verification.
- Winterbotham 117 -> 229 leads, $86 -> $50.29 CPA is cited **and labeled Google Ads in the same sentence**, so it cannot read as Meta proof. Its PDF is the one verified-attachable legal artifact, hence "I can send the write up," with no attachment made on first touch.
- Lux Dental Spa `act_868498138612020`: ~$99K/mo, $1,187,450 trailing 12 months, active, Lindsey operator. **Spend only.** ~99% of rows have NULL conversions, so no CPA. Pulled via the leaderboard, not a name search.
- Fusion Dental `act_938570599860690`: $64,746.78 / 2,558 leads / $25.31 CPL, 2026-04-21 to 2026-07-15. Churned 2026-07-22, written past tense. Lindsey was on the account, so first person is accurate. **The pullback is attributed to call center capacity, not CPL economics**, which is the documented reason.
- Laleh and Fusion sit in **different numbered answers**, never adjacent, so the CPL cannot read as coming off the $100K account.
- **Lawmatics: 0 rows in `agent_knowledge`.** Named once, as their tool, with an explicit statement that I have not worked in it.
- **Offline conversion send-back has never been completed** at Creekside. Answer 5 splits the mechanism (real, weekly, honest) from the build (disclosed as not done, scoped to their developer). Do not let a follow-up soften this.

**SIEP opener.** Immigration is on Meta's US social issue list. The opener claims classification risk and authorization gating, and explicitly says the HEC restrictions do NOT apply, which is the corrected fact. No claim is made that we have run an authorized SIEP account.

**No DQ fires, one thing open.**
- Ad spend: unstated, and "managed meaningful monthly Meta ad spend" is not a number. Not sub-floor, so no auto-DQ. Asked as a relative question at the end and the fee is gated on it.
- Geography: US firm, US ads. Clear.
- Ads are the scope. Not white-label, not a full-time seat, no profit share, no worker-location requirement, no detection evasion.
- Landing pages are owned by **their** developer and we only direct, so the ads-plus-CRO-ownership skip does not apply.
- Payment-method verification not checkable while logged out.

**Fee.** Percentage of spend per the canonical tiers (20/15/10 at $30K/$60K, $1,500/mo minimum, $1,500 onboarding including the audit). Their question explicitly offers an hourly option; it is declined in one clause without a lecture.

**Deliberate omissions:** no URLs, no calendar link (first touch on a job post), no attachment sent, no sign-off name, no em dashes, no certification claims. "QUALIFIED LEADS" is the first line as instructed.

**Length:** 4,214 characters. Under the 5,000-character Upwork ceiling.

**Duplicate check.** Before sending, confirm the Samuel profile is not bidding this same posting.
