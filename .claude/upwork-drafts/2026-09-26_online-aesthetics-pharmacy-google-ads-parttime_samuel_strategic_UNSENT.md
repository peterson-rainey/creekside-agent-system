# Upwork Proposal - UNSENT
Job: Online aesthetics pharmacy. Manage and improve Google Ads: campaign setup, optimization, targeting, "qualified traffic", review current structure, growth recommendations. Healthcare or beauty experience "a plus". Ongoing part-time.
Profile: Samuel Rainey (public profile name Peterson Rainey) | Style: samuel_strategic (requested "strategic version") | Date: 2026-09-26 Manila (Postgres now() 2026-09-25 19:46 UTC = 14:46 Central)

## Screens
- Duplicate: 0 `upwork_jobs` rows for this post (searched job_name + job_description for "aesthetics pharmacy", "online aesthetic", "pharmacy"; 22 older aesthetics/pharmacy posts came back, all different text). 0 `upwork_leads` rows. No file in any drafts folder, grepped at start, before QC and before commit. First sighting.
- Platform: Google only, so Samuel. Lindsey can't sell Google, so no twin expected.
- Ads in scope: YES. Not a stated full-time seat ("ongoing part-time role"). No trial, no required-items list, no screening questions, no CRO gate, no evasion language.
- Spend: NOT STATED, not foreclosed. Asked as a bracket ($5,000 or $15,000).
- Geo: NOT STATED. "Aesthetics pharmacy" is common UK usage, but the post spells "optimizing" (US). Unresolved, so the draft names both US and UK rules and asks which countries.
- White-label: SOFT only. Third person ("for an online aesthetics pharmacy") with no agency or "our client" language; reads like Upwork's AI job-post template. Not a DQ. Check the client name on the job page.
- Hourly range, payment verification, client history: not in the paste, so UNSCREENED. Check the job page ($40/hr bottom-of-range rule).
- Regulated category: a licensed pharmacy (GPhC / LegitScript / NABP type), not grey-market peptides. Certification belongs to the advertiser; Creekside holds none and the draft claims none.

## Verified live this session
- Google Healthcare and medicines policy (support.google.com/adspolicy/answer/176031, page downloaded 2026-09-26 Manila): online pharmacies are a restricted category; "Advertisers must apply to serve ads for prescription drug services." Unauthorized pharmacies: "Targeting locations where you aren't licensed is not allowed ... considered egregious ... suspended upon detection and without prior warning." UK: GPhC registration, "Advertisers can't promote prescription drugs in their ads and landing pages. Advertisers must also be certified with Google." US: LegitScript or NABP accreditation, "Advertisers must also be certified with Google."
- Google Health in personalized advertising (answer/16701855, downloaded same session): covers "Invasive medical procedures, including cosmetic surgery, surgical procedures, or injections". Customer Match, Your data segments (remarketing), audience expansion and lookalikes can't be used; in-market segments can.
- Dental aesthetics account = Doctor Laleh, Google 5948318044, ACTIVE, operator Ahmed I., `clients.notes` "Dental Aesthetics, Irvine". `google_insights_daily` 2026-04-20 to 2026-09-24: $97,541.68 / 623.7 conv / 22,687 clicks. Body: "about $97,500 through the account since April". CPA ($156.40 blended) NOT cited.
- GLP-1 telehealth = Join Piper, Google only, churned (Oct 15 to Nov 7 2025). `case_studies`: rebuilt after "duplicate tracking and brand-only targeting". Account was already certified when inherited; we did not certify it. Cited UNNAMED, past tense, no ROAS figure.
- Three-location med spa = Advanced Med Spa (North Atlanta), `clients.status` inactive. `case_studies`: "2x industry average conversion rate at the same CPA across 3 locations". Past tense.
- Hair restoration clinic = Root Hair. `case_studies`: 690 patient inquiries at $134 CPA, $8K-$15K procedures. Unnamed, past tense, body says "Google" only (YouTube attribution is uncitable).

## Deliberately out
- Dental aesthetics CPA, Join Piper's name, ROAS figure (10x / 9.74x / 8.81x conflict) and PDF.
- Integrity Naturopathic (not beauty; already carried the 9/25 IV and generic Google drafts).
- The won Google health-policy appeal (cut for length; use it if a screening question asks about disapprovals).
- Shopping / Merchant Center rules for prescription products (not verified this session), custom-segment sensitive-content caveat (length).
- Any pharmacy-experience claim: zero pharmacy clients in the book, and the post only calls healthcare/beauty "a plus".
- Price (not asked), links, contact info, sign-off.

## Attachment: NONE recommended
- Advanced Med Spa PDF: "Peterson" chart label + "By: Samuel Rainey" byline, no figures. Root Hair PDF: YouTube-framed. Join Piper PDF: blocked. Dr. Laleh PDF: inflated vs canonical.
- Only sendable healthcare PDF is `.claude/attachments/integrity_naturopathic_CLEAN.pdf`, but it is naturopathy, not beauty, and its headline ($14 best CPA, $2,350/mo) runs well ahead of live ($40.33 over 12 months, ~$1,500/mo budget). Attach only if you want something attached; the body doesn't mention it.

## QC (2026-09-26)
- qc-reviewer-agent: PASS WITH FIXES, no blocking issues, twin check clean (no other profile's draft of this job on disk).
  - APPLIED: "We've also run" to "We also ran" (med spa inactive, hair clinic past tense).
  - NOT APPLIED: swap "toxins" for plain "prescription drugs". QC's point was sourcing: Google's page doesn't name toxins. But botulinum toxin products are prescription-only medicines in the UK (expert review confirmed, and it confirmed the draft correctly does not call fillers prescription-only), so the example is accurate and is the sentence's whole value.
- expert-review-agent: Good, no factual errors; toxin/POM, certification and personalized-ads claims all confirmed.
  - APPLIED: 90-day offline import limit added to the tradeoff sentence (Google Ads Help 15081888: offline conversions uploaded more than 90 days after the last click won't be imported; verified in memory 2026-09-16).
  - APPLIED (derived from its keyword finding): trade-search examples changed from "brand plus price, supplier, wholesale" to "supplier, wholesale, price list", so the draft never suggests bidding on prescription brand names (Google restricts prescription drug terms in keywords as well as ads and landing pages).
  - NOT APPLIED: its replacement text for the trade/consumer sentence (it folded the ad-content rule into a budget point; that rule already sits in the section above). Merchant Center pharmacy certification skipped (not verified this session, no room).

## Open for Queenie
1. Geo, spend, hourly range, payment verification and client history aren't in the paste, so they're unscreened. Check the job page.
2. White-label: soft third-person signal only, not a DQ.
3. Spend bracket "$5,000 or $15,000" follows the shape of your 9/22 ruling. There's no incumbent agency here, so "$3,000 or $10,000" (straddling the floor) is the alternative if you'd rather screen below $5K.
4. Length: 427 words (411 prose + 16 header words), 2,639 chars. Over the 350-word style target like recent drafts, well under 5,000 chars.
5. DB log INSERT to `upwork_proposal_logs` skipped (contractor_query can't INSERT).
6. Last question = last sentence: "Any number I'd suggest only helps if it fits your range, so roughly where does monthly Google spend sit, closer to $5,000 or $15,000?"

## PROPOSAL

For an online aesthetics pharmacy, qualified traffic comes down to something Google can't see on its own: whether the person clicking is allowed to buy from you. A practitioner restocking and a member of the public researching the same product often type the same search, and if the account counts a registration or an add to cart as the conversion, Smart Bidding finds more of whoever does that cheapest, whether or not they clear your checks.

So the first thing I'd check is what the account counts. Counting the step after verification instead, an approved account or a first order sent back to Google when approval comes later, points the bidding at buyers. The tradeoff is volume and timing, since Smart Bidding needs enough of those to learn from and Google won't import them more than 90 days after the click.

**Where pharmacy accounts get into trouble**

Beyond LegitScript or NABP in the US, or GPhC registration in the UK, an online pharmacy needs Google's own certification for the countries it targets, and targeting a location it isn't licensed in is treated as egregious: suspension on detection, no warning. In the UK, prescription-only products like toxins can't be promoted in the ads or on the pages they link to, so the structure has to follow what each market allows.

**What the health rules take off the table**

Google's personalized ads rules for health cover cosmetic surgery and injections. Where they apply, remarketing lists, customer list uploads and lookalikes are off, though Google's in-market audiences still work. So most targeting gains come from the search terms. If you sell to practitioners, that means pulling trade searches (supplier, wholesale, price list) apart from consumer ones (near me, cost, before and after) so budget stops paying for clicks that can't order.

**Relevant accounts**

Our team runs Google for a dental aesthetics practice today, about $97,500 through the account since April. We rebuilt the Google account of a GLP-1 telehealth company selling prescription medication online, already certified when it came to us, after finding duplicate conversion tracking and brand-only keywords. We also ran a three-location med spa that converted at twice the industry average for the same cost per acquisition, and a hair restoration clinic with $8,000 to $15,000 procedures, where Google brought in 690 patient inquiries at $134 each.

Who buys from you today, licensed practitioners, patients with a prescription or both, and in which countries?

Any number I'd suggest only helps if it fits your range, so roughly where does monthly Google spend sit, closer to $5,000 or $15,000?
