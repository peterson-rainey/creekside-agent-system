# Upwork Proposal - TrueBond Labs (research-use products / bacteriostatic water, GMC + Google Ads compliance audit)
Profile: Samuel | Style: strategic + diagnostic close | Status: UNSENT | Drafted 2026-09-29

## Screen
- Detection-evasion: NOT fired. Post explicitly wants an evidence-based, compliant, sustainable setup and "realistic expectations about Google's approval decisions." No evasion asked or offered.
- Duplicate/same-buyer: NONE. Live-searched `upwork_jobs` for "truebond" / "bacteriostatic" (job_name, job_description, client_name) — zero rows. First sighting.
- Platform test: Google Ads + Merchant Center only, no Meta component anywhere. Resolves to Samuel (Lindsey cannot claim Google Ads as a service).
- Already-drafted check: grepped `upwork-drafts/` and `drafts/` for truebond/bacteriostatic/peptide — no exact match for this job. Closest prior analog (different buyer): `2026-09-16_research-peptide-gmc-compliance-to-shopping-scale_samuel_strategic_gaps-disclosed_UNSENT.md`.
- Required-items screen (7 numbered questions) run per feedback_screen_required_items_for_proof_gaps.md: items 1/2/3/5/7 answerable as methodology; item 4 (peptide-catalog risk to bacteriostatic water) answered via the item-level (Healthcare and Medicines) vs account-level (Misrepresentation) distinction; item 1 (comparable product/policy outcome) is a PARTIAL gap, disclosed plainly in-body — no scaled peptide/bacteriostatic Shopping account exists, disclosed as "if that's the bar, we don't clear it."

## Facts used (live-verified this session)
- `case_studies` "Aura Displays": Google Ads only, ecommerce/Shopify, $1M+/mo revenue (NOT ad spend), 8-10x ROAS via Search/Shopping/PMax, $35K+/mo managed spend. Cite-only, not attached (attachability not re-verified this session despite a gdrive_file_id existing).
- `case_studies` "Join Piper": Healthcare/GLP-1 telehealth, Google Ads, 10x ROAS in 30 days post-rebuild. Deliberately left OUT of the body — healthcare-adjacent but not a Merchant Center/Unapproved-substances match; both QC and expert review confirmed this omission is correct.
- Google Ads support email, `gmail_summaries` id `a7751c8d-c3cc-4adb-a7d1-e1fb3e910def`, live-read verbatim via `get_full_content`: 2025-06-25, gTech ticket 6-9600000038737, policy "Health In Personalized Advertising," account 254-064-2609. Google's own words: "the team was able to review and approve the ads which were earlier marked for the said policy." This is an AD-LEVEL review/approval, not an account reinstatement — QC caught an earlier draft pass overstating this as "reinstating an account" and it was corrected. Per `reference_healthcare_policy_appeal_proof.md`, the real advertiser is unresolved/mis-linked in the DB, so the client is never named — only the policy is named, which the memory file does not restrict.
- "Hands-on diagnosis inside a peptide brand's Google Ads and Merchant Center accounts" carried from the 2026-09-16 prior draft, not independently re-verified this session — kept singular per QC's flag rather than implying multiple accounts.
- Integrity Naturopathic (Google Ads, health-policy disapproval held through, $22,985/600 conv/$38.31 CPA trailing 12mo) considered per `reference_healthcare_policy_appeal_proof.md` but NOT added — both QC and expert review found the draft complete without it; optional strengthening only.

## Pricing
- Phase 1 (audit): $720 fixed, hard cap not an estimate (backing math: $90/hr x 8hr cap, sized off the 2025-09-25 Alchmy Hospitality precedent for comparable multi-part scope) — rate and hour count deliberately NOT typed in the body per `reference_standalone_audit_fee.md` ("the body types the total only... never the $90 rate or the hours"), even though this job's Q6 directly asks for a price (the direct-ask exception only removes the ban on stating A price, not on exposing the hourly mechanics). Bid rate $90/hr goes in the Upwork bid field only.
- Phase 2 (implementation): explicitly NOT priced — pre-launch/pre-spend work with no priceable instrument yet per `reference_no_pricing_instrument_for_zero_spend_milestones.md`. Deferred to a fixed quote once the audit defines actual corrections; this doubles as the answer to the client's own exclusions/additional-fee-trigger ask.
- Phase 3 (ongoing management, "potential" only): canonical % of spend model — 20% to $30K/mo, 15% to $60K, 10% above, $1,500/mo minimum, one-time $1,500 onboarding (Google Ads = one platform). Framed as conditional. No credit promised from Phase 1/2 toward onboarding (that question is unruled — left unstated, not implied).
- Budget for the management phase is unstated by the client, asked back in-body as a relative range per `feedback_budget_ask_relative_range.md`.

## QC / Expert review
- **qc-reviewer-agent: PASS WITH FIXES (1 blocking).** Blocking: "reinstating an account" overstated the source (ad-level approval, not account reinstatement) — fixed. Non-blocking: soften "peptide-adjacent brands" plural (fixed to singular), address "Removed" Search campaign status in the taxonomy section (fixed), verify char count before send (verified: 4,679 chars / 725 words, under the 5,000 cap).
- **expert-review-agent: SHIP WITH CHANGES.** Fixes applied: removed $90/hr rate and hour count from body pricing sentence (house rule violation), added the "Removed" campaign-status distinction, tightened the Misrepresentation/business-verification sentence, named the actual policy ("Health In Personalized Advertising") instead of vague "a healthcare-related policy" since only the client identity is restricted, not the policy name.
- Formatting: bold section headers (literal asterisks) per the 2026-09-25 ruling; zero em dashes; "our team" framing throughout, no principal name; no sign-off per the 2026-09-04 ruling.

## Open items for Queenie
1. Client geo not explicitly stated in the post (Shopping/US eligibility language implies US) — worth a client-panel check before sending.
2. Whether the $720 audit fee credits toward the $1,500 Phase 3 onboarding fee later is deliberately left unstated (unruled question) — your call if you want it addressed before sending.
3. Not logged to `upwork_proposal_logs` (contractor_query cannot INSERT; this session had direct execute_sql access but the logging step was not run — flag if you want it added).
4. Case-study attachability (Aura PDF) not re-verified this session — recommend attaching nothing, cite-only, unless verified separately.

## PROPOSAL

Three disapproved ads under Unapproved substances, two removed Search campaigns, and a Merchant Center account showing zero products with no active policy flags are not one problem. They need separating before anything gets filed for review.

**Disapproval vs Warning vs Suspension**
An ad disapproval for Unapproved substances judges that specific ad's text, image, or destination, and it's fixable per-ad without touching account standing. A Merchant Center warning is broader, a policy risk read from the product data and domain itself, and it can block Shopping and free listings while Search keeps running. Suspension is an enforcement action tied to verification or a pattern across surfaces, and it stops everything. Removed is different again, that status comes from the advertiser, not from Google's enforcement, so whether those two Search campaigns were paused in response to the disapprovals or pulled for another reason changes whether we're rebuilding an existing structure or starting fresh. What's described here reads as ad-level disapprovals with no live Merchant Center flag and no suspension, narrower than where most healthcare-adjacent accounts land. Worth confirming in writing before filing anything.

**Before Any Review or Appeal**
We'd want the disapproval text verbatim for all three ads, full policy history for both accounts, the exact landing pages, and every place bacteriostatic water is described anywhere on the domain, on product pages, in the footer, in old blog posts, in FAQs. Healthcare and Medicines reviewers read the whole domain. A review filed before that sweep is complete usually burns a strike on a site that still has disqualifying language sitting somewhere forgotten.

**Does the Peptide Catalog Put Bacteriostatic Water at Risk**
Two different policies can be doing the flagging. Healthcare and Medicines is item-level, evaluating what the product is, so a clean bacteriostatic water listing can in principle run even with peptides elsewhere on the domain. Misrepresentation is account-level, judged on whether the business, products, and offers are accurately represented across the domain, a separate question from business identity verification, which is its own requirement. If a reviewer reads peptide dosing or benefit claims anywhere on the domain while assessing the water ads, the peptide catalog can taint the account even though only the water ads are flagged. Part of the audit is mapping every peptide URL, checking whether Merchant Center pulls items automatically or from feed only, and confirming nothing outside the intended feed submits. Some items may just never be approvable regardless of wording, and we'd flag those early.

**Comparable Work, Stated Plainly**
We have not scaled a Shopping account specifically for research peptides or bacteriostatic water, and won't claim that if it isn't there. What our team has done: hands-on diagnosis inside a peptide brand's Google Ads and Merchant Center accounts, and a won healthcare-policy appeal through a gTech escalation in 2025, getting ads flagged under Google's Health In Personalized Advertising policy reviewed and approved. Separately, our team runs Search, Shopping, and PMax for a Shopify ecommerce brand at over $1M monthly revenue, holding 8 to 10x ROAS on over $35K monthly spend, the structuring logic we'd carry into Phase 2 once eligibility clears. If a scaled peptide Shopping account specifically is the bar, we don't clear it.

**Access and Documentation**
Read access to both accounts, the current feed source, the disapproval and warning text, and any COA or lab documentation for bacteriostatic water. No backend access needed since your team handles implementation.

**Pricing and Timeline**
Phase 1 audit: $720, fixed, a hard cap not an estimate, delivered within 5 business days of access, covering both accounts and a written prioritized corrections list. Phase 2 implementation depends on what the audit finds, so we're not quoting a number for unscoped work. Once the audit defines the fixes, that becomes a fixed quote, which also answers exclusions and additional-fee triggers up front. That fee covers initial submission and the first appeal cycle tied to the audit's findings; a second appeal after a material account change would be scoped separately. Phase 3, if and when management starts: percentage of monthly ad spend, 20 percent to 30K, 15 percent from there to 60K, 10 percent above, 1,500 monthly minimum, one-time 1,500 onboarding for Google Ads as the single platform.

What range of monthly spend are you planning once the account is clean, a few thousand or into five figures? That changes how tightly we'd sequence Phase 2.
