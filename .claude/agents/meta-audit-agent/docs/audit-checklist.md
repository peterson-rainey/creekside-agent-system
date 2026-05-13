# Meta Audit Checklist (70 Items) with PipeBoard Field Mappings

This file is the authoritative 70-item checklist. Load it during Step 5 of every audit.

**EASY-SELL FLAG** = a FAIL on this item is a high-impact, visually demonstrable finding that closes prospects. Elevate these in the deliverables.

## Severity Levels
- **CRITICAL** -- account is actively losing money or violating policy
- **HIGH** -- significant performance drag; fix within 7 days
- **MEDIUM** -- meaningful opportunity; fix within 30 days
- **LOW** -- best practice; fix in next sprint

---

## Section 1: Account & Pixel Health (12 items)

### 1.1 Pixel Installed
**Severity:** CRITICAL | **EASY-SELL FLAG**
**PipeBoard source:** `get_pixels` -- check that at least one pixel is returned
**Pass condition:** At least one pixel exists and has a `last_fired_time` within the last 7 days
**Evidence format:** "Pixel [id] last fired: [date]. Expected: within 7 days."

### 1.2 Pixel Firing on Key Pages
**Severity:** CRITICAL | **EASY-SELL FLAG**
**PipeBoard source:** `get_pixels` -- review `last_fired_time` and pixel event list
**Pass condition:** Pixel has fired PageView, ViewContent, Lead/Purchase events within last 7 days
**Evidence format:** "Events recorded: [list]. Last event fire: [date]."

### 1.3 Conversions API (CAPI) Active
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_pixels` -- check `is_consolidated_container` or CAPI data source fields
**Pass condition:** CAPI or Conversions API integration is present alongside pixel
**Evidence format:** "CAPI detected: [yes/no]. Without CAPI, iOS 14.5+ conversions are undercounted."

### 1.4 Event Match Quality Score
**Severity:** HIGH**
**PipeBoard source:** `get_pixels` -- `event_match_quality` field if available
**Pass condition:** EMQ score >= 6 (out of 10). Score below 6 means poor signal quality.
**Evidence format:** "EMQ score: [score]. Threshold: 6+."

### 1.5 Pixel Deduplication Active
**Severity:** MEDIUM**
**PipeBoard source:** `get_pixels` -- check for deduplication key configuration
**Pass condition:** Deduplication event keys are set when both pixel and CAPI are active
**Evidence format:** "Dedup keys present: [yes/no]."

### 1.6 Standard Events Used (Not Only Custom Events)
**Severity:** MEDIUM**
**PipeBoard source:** `get_pixels` -- review event names
**Pass condition:** Standard events (Lead, Purchase, ViewContent) used instead of only custom conversions
**Evidence format:** "Events found: [list]. Standard vs custom breakdown: [X/Y]."

### 1.7 Ad Account Age and Spending History
**Severity:** HIGH**
**PipeBoard source:** `get_account_info` -- `created_time`, cumulative spend
**Pass condition:** Account is not brand new (< 30 days old) running high budgets without warmup
**Evidence format:** "Account created: [date]. Total lifetime spend: $[amount]."

### 1.8 Business Manager Connected
**Severity:** MEDIUM**
**PipeBoard source:** `get_account_info` -- `business` field
**Pass condition:** Account is owned by a Business Manager (not personal ad account)
**Evidence format:** "Business Manager: [name/id or NOT CONNECTED]."

### 1.9 Payment Method Verified
**Severity:** CRITICAL**
**PipeBoard source:** `get_account_info` -- `account_status` field (status 1 = active, 2 = disabled, 9 = in_grace_period)
**Pass condition:** Account status = 1 (active). Any other status = investigate.
**Evidence format:** "Account status code: [code]. Active=1."

### 1.10 Account Spend Limit Set Appropriately
**Severity:** MEDIUM**
**PipeBoard source:** `get_account_info` -- `spend_cap` field
**Pass condition:** Spend cap is either not set (unlimited) or set at an appropriate monthly ceiling -- not so low it's capping delivery
**Evidence format:** "Spend cap: $[amount or NONE]. Monthly budget: $[calculated]."

### 1.11 Timezone Matches Business Location
**Severity:** MEDIUM**
**PipeBoard source:** `get_account_info` -- `timezone_name`
**Pass condition:** Account timezone matches the business's primary geographic market
**Evidence format:** "Account timezone: [timezone]. Business location timezone: [expected]."

### 1.12 Currency Matches Business Currency
**Severity:** LOW**
**PipeBoard source:** `get_account_info` -- `currency`
**Pass condition:** Account currency matches business's billing currency
**Evidence format:** "Account currency: [currency]."

---

## Section 2: Campaign Structure & Objectives (12 items)

### 2.1 Objective Matches Business Goal
**Severity:** CRITICAL | **EASY-SELL FLAG**
**PipeBoard source:** `get_campaigns` -- `objective` field
**Pass condition:** Campaigns use OUTCOME_LEADS, OUTCOME_SALES, or OUTCOME_TRAFFIC objectives (not BRAND_AWARENESS or REACH for conversion-focused accounts)
**Evidence format:** "Campaign objectives found: [list]. Expected for conversion account: OUTCOME_LEADS or OUTCOME_SALES."

### 2.2 Campaign Budget Optimization (CBO) Used on Top Campaigns
**Severity:** HIGH**
**PipeBoard source:** `get_campaigns` -- `daily_budget` vs `get_adsets` budget at adset level
**Pass condition:** Budget set at campaign level (CBO) for lead gen and sales campaigns. Adset-level budget acceptable only for testing.
**Evidence format:** "Budget distribution: [X campaigns using CBO, Y using adset budget]."

### 2.3 No Overlapping Audiences Across Active Campaigns
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** Cross-reference `targeting` fields from `get_adset_details` across active adsets
**Pass condition:** Active adsets targeting the same cold audience segment are in the same campaign (not separate campaigns). Separate campaigns with same audiences = internal auction competition.
**Evidence format:** "Adsets with overlapping targeting: [list]."

### 2.4 Campaign Naming Convention Consistent
**Severity:** LOW**
**PipeBoard source:** `get_campaigns` -- `name` field across all campaigns
**Pass condition:** Names follow a systematic pattern (e.g., [Objective] | [Audience] | [Date] or similar)
**Evidence format:** "Sample names: [3 examples]. Convention visible: [yes/no]."

### 2.5 Funnel Structure Present (Top/Middle/Bottom)
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_campaigns` -- `objective` across all campaigns; `get_adsets` -- `targeting` to identify retargeting vs cold
**Pass condition:** Account has at least one cold-audience campaign AND one retargeting/warm campaign
**Evidence format:** "Cold campaigns: [count]. Retargeting campaigns: [count]."

### 2.6 Campaign Is Not Running Overly Broad Objectives for Small Budgets
**Severity:** HIGH**
**PipeBoard source:** `get_campaigns` objectives + `get_adsets` daily_budget
**Pass condition:** Awareness or Reach campaigns only present when budget > $200/day for those campaigns (otherwise budget is too thin for meaningful reach)
**Evidence format:** "Awareness/Reach campaigns: [list with budgets]."

### 2.7 Buying Type Appropriate
**Severity:** MEDIUM**
**PipeBoard source:** `get_campaigns` -- `buying_type` (AUCTION vs RESERVED)
**Pass condition:** Most campaigns use AUCTION buying. RESERVED only justified for large-scale brand campaigns.
**Evidence format:** "Buying type: [AUCTION/RESERVED per campaign]."

### 2.8 Special Ad Categories Compliance
**Severity:** CRITICAL**
**PipeBoard source:** `get_campaigns` -- `special_ad_categories` field
**Pass condition:** If account is in housing, credit, employment, or social issues -- Special Ad Category is correctly declared. If not in those verticals, no special category declared.
**Evidence format:** "Special ad categories declared: [list or NONE]. Vertical: [vertical]. Compliant: [yes/no]."

### 2.9 Bid Strategy Matches Budget Scale
**Severity:** HIGH**
**PipeBoard source:** `get_campaigns` -- `bid_strategy`; `get_adsets` -- `bid_amount`
**Pass condition:** Lowest cost (no bid cap) used unless account has strong historical data AND budget supports a bid cap
**Evidence format:** "Bid strategy: [list per campaign]. Any bid caps: [list with amounts]."

### 2.10 No Paused Campaigns Running Active Budget
**Severity:** CRITICAL**
**PipeBoard source:** `get_campaigns` -- `status` and `daily_budget`
**Pass condition:** No active budget on campaigns with status = PAUSED
**Evidence format:** "Paused campaigns with budget set: [list]."

### 2.11 Active Campaign Count Appropriate for Budget
**Severity:** MEDIUM**
**PipeBoard source:** `get_campaigns` count of ACTIVE campaigns + total `daily_budget` across account
**Pass condition:** Each active campaign has at least $20/day budget. Too many campaigns with thin budgets prevents Meta's learning algorithm from exiting the learning phase.
**Evidence format:** "Active campaigns: [count]. Total daily budget: $[amount]. Average per campaign: $[average]."

### 2.12 Catalog Connected (for eCommerce accounts)
**Severity:** HIGH (eCommerce only)**
**PipeBoard source:** `get_account_info` -- `promoted_object` or product catalog reference
**Pass condition:** eCommerce accounts have a product catalog connected. Skip for non-eCommerce.
**Evidence format:** "Product catalog: [connected/not connected/N/A]."

---

## Section 3: Audience Strategy (12 items)

### 3.1 Custom Audiences Created from Pixel Data
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_custom_audiences` -- filter for `subtype = WEBSITE`
**Pass condition:** At least one website custom audience exists (e.g., all website visitors last 180 days, landing page visitors)
**Evidence format:** "Website custom audiences: [count and names]."

### 3.2 Customer List Audience Uploaded
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_custom_audiences` -- filter for `subtype = CUSTOM` (email/phone list)
**Pass condition:** At least one customer list audience uploaded (for suppression and lookalike seeds)
**Evidence format:** "Customer list audiences: [count, approximate_count each]."

### 3.3 Lookalike Audiences Created
**Severity:** HIGH**
**PipeBoard source:** `get_custom_audiences` -- filter for `subtype = LOOKALIKE`
**Pass condition:** At least one lookalike audience exists, seeded from a customer list or high-quality pixel event
**Evidence format:** "Lookalike audiences: [count, seed source, percentage]."

### 3.4 Retargeting Audiences Set Up
**Severity:** CRITICAL | **EASY-SELL FLAG**
**PipeBoard source:** `get_custom_audiences` + `get_adsets` targeting
**Pass condition:** At least one retargeting adset targets website visitors, video viewers, or engagement audiences from the last 30-90 days
**Evidence format:** "Retargeting adsets: [count]. Retargeting audiences: [list]."

### 3.5 Audience Size Appropriate for Budget
**Severity:** MEDIUM**
**PipeBoard source:** `get_custom_audiences` `approximate_count` + adset daily budget
**Pass condition:** Audience size is not too narrow for the budget (rule of thumb: $10/day per 100K audience size minimum). Oversized audiences also flagged for inefficiency.
**Evidence format:** "Audience: [name]. Size: [count]. Daily budget targeting this audience: $[amount]."

### 3.6 Existing Customers Excluded from Cold Campaigns
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_adsets` `targeting` -- check `excluded_custom_audiences` on cold-audience adsets
**Pass condition:** Cold campaigns exclude current customers (uploaded list or pixel-based purchaser audience)
**Evidence format:** "Cold adsets with customer exclusion: [X/Y total cold adsets]."

### 3.7 Audience Overlap Between Cold and Retargeting
**Severity:** HIGH**
**PipeBoard source:** Compare targeting across cold and retargeting adsets in the same account
**Pass condition:** Cold audience adsets and retargeting adsets use mutually exclusive audiences (no double-counting of prospects)
**Evidence format:** "Audience overlap detected: [yes/no, describe]."

### 3.8 Interest Targeting Specificity
**Severity:** MEDIUM**
**PipeBoard source:** `get_adset_details` -- `targeting.interests` array
**Pass condition:** Interests are specific and relevant (not generic catch-alls like "Business" or "Marketing"). Verify through adset details.
**Evidence format:** "Sample interests: [list from top 3 adsets]."

### 3.9 Geographic Targeting Correct
**Severity:** CRITICAL**
**PipeBoard source:** `get_adset_details` -- `targeting.geo_locations`
**Pass condition:** Geo targeting matches the business's service area. Not running national when local, not running local when leads can come from anywhere.
**Evidence format:** "Geo targeting: [cities/regions/countries]. Business service area: [from client context]."

### 3.10 Age and Gender Targeting Appropriate
**Severity:** MEDIUM**
**PipeBoard source:** `get_adset_details` -- `targeting.age_min`, `targeting.age_max`, `targeting.genders`
**Pass condition:** Age/gender restrictions are justified by the business type (not just defaults left in place)
**Evidence format:** "Age targeting: [min-max]. Gender: [all/male/female]. Justified: [yes/no based on vertical]."

### 3.11 Audience Refresh Cadence
**Severity:** MEDIUM**
**PipeBoard source:** `get_custom_audiences` -- `last_updated_time`
**Pass condition:** Customer list audiences updated within last 90 days
**Evidence format:** "Oldest customer list last updated: [date]."

### 3.12 Broad Audience Testing Present
**Severity:** MEDIUM**
**PipeBoard source:** `get_adsets` -- check for adsets with minimal targeting restrictions (broad match testing)
**Pass condition:** At least one campaign or adset tests broad/Advantage+ audience targeting alongside interest/custom targeting
**Evidence format:** "Broad audience adsets: [count]."

---

## Section 4: Ad Creative Quality (14 items)

### 4.1 Minimum 3 Active Ad Variations Per Adset
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_ads` count per adset_id (status = ACTIVE)
**Pass condition:** Each active adset has at least 3 active ad variants
**Evidence format:** "Adsets with < 3 active ads: [list with counts]."

### 4.2 Video Ads Present
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_ad_creatives` -- `video_id` not null, or `object_type = VIDEO`
**Pass condition:** At least one active video ad in the account
**Evidence format:** "Video ads found: [count]. Total active ads: [count]."

### 4.3 Static Image Ads Present
**Severity:** MEDIUM**
**PipeBoard source:** `get_ad_creatives` -- `image_url` not null and `video_id` null
**Pass condition:** Mix of video and static image ads
**Evidence format:** "Static image ads: [count]. Video ads: [count]."

### 4.4 Creative Fatigue Check (Frequency > 3)
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_insights` at ad level -- `frequency` field (last 7 days)
**Pass condition:** No active ad has frequency > 3 in the last 7 days for cold audiences
**Evidence format:** "Ads with frequency > 3 (last 7 days): [list with frequency scores]."

### 4.5 Ad Copy Includes a Clear CTA
**Severity:** HIGH**
**PipeBoard source:** `get_ad_creatives` -- `call_to_action_type`, `body` text review
**Pass condition:** Every ad has a clear call-to-action button AND the body copy directs the user to act
**Evidence format:** "Ads with no CTA button: [count]. CTAs found: [list of types]."

### 4.6 Primary Text Length Appropriate
**Severity:** MEDIUM**
**PipeBoard source:** `get_ad_creatives` -- `body` character count
**Pass condition:** Primary text is 1-3 sentences (under 125 characters for above-fold display). Long walls of text penalized.
**Evidence format:** "Average body length: [chars]. Max found: [chars]."

### 4.7 Headline Is Benefit-Focused (Not Feature-Focused)
**Severity:** MEDIUM**
**PipeBoard source:** `get_ad_creatives` -- `title` field
**Pass condition:** Headlines state a benefit or outcome, not just the product name or generic phrase
**Evidence format:** "Sample headlines: [list of 3]. Assessment: [benefit-focused / feature-focused]."

### 4.8 Landing Page URL Matches Ad Promise
**Severity:** HIGH**
**PipeBoard source:** `get_ad_creatives` -- `link_url` or `object_url`
**Pass condition:** The landing page URL is specific to the offer (not the homepage). Homepage as landing page = FAIL.
**Evidence format:** "Landing URLs found: [list]. Homepage used: [yes/no]."

### 4.9 Dynamic Creative (DCO) Tested
**Severity:** MEDIUM**
**PipeBoard source:** `get_ad_creatives` -- `asset_feed_spec` or `degrees_of_freedom_spec` fields
**Pass condition:** At least one campaign uses Dynamic Creative Optimization or Advantage+ creative
**Evidence format:** "DCO/Advantage+ creative detected: [yes/no]."

### 4.10 No Disapproved Ads Running
**Severity:** CRITICAL**
**PipeBoard source:** `get_ads` -- `status` field (check for DISAPPROVED, WITH_ISSUES)
**Pass condition:** Zero ads with DISAPPROVED or WITH_ISSUES status on active campaigns
**Evidence format:** "Disapproved/with-issues ads: [count and names]."

### 4.11 Social Proof Present (Likes/Comments)
**Severity:** LOW**
**PipeBoard source:** `get_insights` -- engagement metrics (post_engagement action type)
**Pass condition:** At least some ads have accumulated social proof (likes, comments, shares)
**Evidence format:** "Total engagements across active ads: [count]."

### 4.12 Carousel Ads Used (where relevant)
**Severity:** LOW**
**PipeBoard source:** `get_ad_creatives` -- `object_type = SHARE` or multi-card creative formats
**Pass condition:** Carousel format tested for products, services, or testimonial stacks
**Evidence format:** "Carousel ads: [count or N/A for single-offer accounts]."

### 4.13 Ad Creative Ages (Average Age of Active Creatives)
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_ads` -- `created_time` for ACTIVE ads
**Pass condition:** Oldest active creative is not more than 90 days old without performance review
**Evidence format:** "Oldest active creative created: [date, X days ago]. Newest: [date]."

### 4.14 Hook Variety (Different First 3 Seconds)
**Severity:** MEDIUM**
**PipeBoard source:** `get_ad_creatives` -- `title` and `body` review across variants
**Pass condition:** Multiple ad variants with different lead hooks (question, bold statement, problem-focused)
**Evidence format:** "Hook types identified: [list from creative review]."

---

## Section 5: Budget & Bidding (8 items)

### 5.1 Account is Not in Learning Phase with Low Budget
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_adsets` -- `learning_phase_outcome` or inferred from low conversion volume + insights
**Pass condition:** Account is generating enough conversions per adset per week (50+ per adset recommended) to exit learning phase
**Evidence format:** "Weekly conversions per active adset: [calculated from insights]. Learning phase exit threshold: 50/week."

### 5.2 Budget Pacing Consistent
**Severity:** MEDIUM**
**PipeBoard source:** `get_insights` at campaign level -- compare daily spend variance
**Pass condition:** Spend is consistent day-over-day (not spiking or flat-lining due to budget constraints)
**Evidence format:** "Daily spend variance: [describe pattern from 7-day data]."

### 5.3 No Ad Sets with $0 Spend
**Severity:** HIGH**
**PipeBoard source:** `get_insights` at adset level (last 7 days) -- filter for spend = 0 on ACTIVE adsets
**Pass condition:** All ACTIVE adsets have some spend in the last 7 days
**Evidence format:** "Active adsets with $0 spend (last 7d): [count and names]."

### 5.4 Cost Per Lead / Cost Per Purchase vs Benchmark
**Severity:** HIGH**
**PipeBoard source:** `get_insights` -- `cost_per_action_type` for lead or purchase events
**Pass condition:** CPL/CPA is within 2x the industry benchmark for the vertical. If no benchmark available, flag for Peterson to assess.
**Evidence format:** "CPL: $[amount]. CPP: $[amount]. Benchmark for [vertical]: $[amount] (source: [how derived])."

### 5.5 Budget Spread Across Too Many Campaigns
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_campaigns` -- count ACTIVE, sum budgets
**Pass condition:** Budget is concentrated in 2-4 core campaigns rather than spread thin across 10+ campaigns
**Evidence format:** "Active campaigns: [count]. Campaigns receiving >10% of budget: [count]."

### 5.6 Lifetime Budget Campaigns Not Orphaned
**Severity:** MEDIUM**
**PipeBoard source:** `get_campaigns` -- `lifetime_budget` + `stop_time`
**Pass condition:** Any campaign with a lifetime budget has a stop_time set. Lifetime budgets without stop dates are Meta policy violations.
**Evidence format:** "Lifetime budget campaigns without stop_time: [count]."

### 5.7 Daily Spend Caps Not Blocking Delivery
**Severity:** MEDIUM**
**PipeBoard source:** `get_campaigns` -- `spend_cap` vs actual spend from `get_insights`
**Pass condition:** Campaign spend is not consistently hitting the spend cap (< 95% of cap)
**Evidence format:** "Campaigns near spend cap: [list with cap vs actual spend]."

### 5.8 Bid Overlap Between Adsets in Same Campaign
**Severity:** MEDIUM**
**PipeBoard source:** `get_adsets` -- `bid_amount` and `optimization_goal` across adsets in same campaign
**Pass condition:** Adsets in the same campaign using manual bidding do not have conflicting bid amounts that cannibalize each other
**Evidence format:** "Bid amounts per adset in each campaign: [list if manual bidding detected]."

---

## Section 6: Attribution & Tracking (8 items)

### 6.1 Attribution Window Set Correctly
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_adset_details` -- `attribution_spec` field (requires per-adset call)
**Pass condition:** Attribution window is 7-day click / 1-day view for most conversion campaigns. 1-day click acceptable for short purchase cycles. 28-day windows are deprecated by Meta.
**Evidence format:** "Attribution windows found: [list per adset from get_adset_details calls]."

### 6.2 Conversion Event Optimizing on Correct Action
**Severity:** CRITICAL | **EASY-SELL FLAG**
**PipeBoard source:** `get_adsets` -- `optimization_goal` + `promoted_object.custom_event_type`
**Pass condition:** Lead gen campaigns optimize on Lead event (not PageView or LinkClick). eCommerce optimize on Purchase.
**Evidence format:** "Optimization goals: [list per adset]. Expected: Lead or Purchase. Mismatches: [count]."

### 6.3 UTM Parameters on All Ads
**Severity:** MEDIUM**
**PipeBoard source:** `get_ad_creatives` -- `link_url` contains utm_source=facebook
**Pass condition:** All ad URLs include UTM parameters for GA4/analytics attribution
**Evidence format:** "Ads with UTM parameters: [X/Y total]."

### 6.4 Conversion Tracking Consistent with Business Goals
**Severity:** HIGH**
**PipeBoard source:** `get_campaigns` objectives + `get_adsets` optimization goals
**Pass condition:** The optimization goal at adset level matches the campaign objective and the business's actual revenue event
**Evidence format:** "Campaign objective: [X]. Adset optimization goal: [Y]. Revenue event: [from client context]. Aligned: [yes/no]."

### 6.5 No Duplicate Pixel Events
**Severity:** HIGH**
**PipeBoard source:** `get_pixels` -- review event counts. Duplicate events inflate conversion counts.
**Pass condition:** Each conversion event fires once per user action (no double-counting from multiple pixel implementations)
**Evidence format:** "Event counts (from pixel data): [list]. Suspicious duplicates: [flag if counts are round multiples]."

### 6.6 Offline Conversions Integrated (where applicable)
**Severity:** MEDIUM**
**PipeBoard source:** `get_pixels` -- check for offline event set connections
**Pass condition:** For businesses with significant offline revenue (dental, med spa, service businesses), offline conversions should be uploaded or connected
**Evidence format:** "Offline event set: [connected/not connected/N/A]."

### 6.7 Value Optimization Active (for eCommerce)
**Severity:** MEDIUM (eCommerce only)**
**PipeBoard source:** `get_campaigns` -- `bid_strategy` = VALUE or adsets with ROAS bid
**Pass condition:** eCommerce accounts with sufficient purchase data (200+ purchases in last 30 days) should use value-based optimization
**Evidence format:** "Value optimization: [active/not active]. Purchase volume: [count] (threshold: 200 in last 30d)."

### 6.8 Lead Quality Signals Configured
**Severity:** MEDIUM**
**PipeBoard source:** `get_pixels` -- check for `QUALIFY_LEAD`, `SCHEDULE`, or downstream funnel events
**Pass condition:** Lead gen accounts track post-lead actions (booked appointment, qualified lead) in addition to the lead event itself
**Evidence format:** "Post-lead events tracked: [list or NONE]."

---

## Section 7: Placement Strategy (8 items)

### 7.1 Placement Strategy Defined (Auto vs Manual)
**Severity:** MEDIUM**
**PipeBoard source:** `get_adset_details` -- `publisher_platforms` field (requires per-adset call)
**Pass condition:** Placement strategy is intentional -- either Advantage+ Placements (auto) or manual placement with a reason
**Evidence format:** "Placement mode: [auto/manual per adset]."

### 7.2 Audience Network Disabled for Lead Gen (if not reviewed)
**Severity:** HIGH | **EASY-SELL FLAG**
**PipeBoard source:** `get_adset_details` -- `audience_network_positions` and `publisher_platforms`
**Pass condition:** Lead gen accounts using manual placements should NOT include Audience Network unless they have tested and validated lead quality from it. Audience Network leads are often low quality.
**Evidence format:** "Audience Network active on lead gen adsets: [yes/no. list adsets]."

### 7.3 Instagram Placement Active (where appropriate)
**Severity:** MEDIUM**
**PipeBoard source:** `get_adset_details` -- `instagram_positions`
**Pass condition:** Instagram placements active for visually-driven businesses or where target audience is on IG
**Evidence format:** "Instagram placements: [active/not active per adset]."

### 7.4 Reels Placement Tested
**Severity:** MEDIUM**
**PipeBoard source:** `get_adset_details` -- check `facebook_positions` and `instagram_positions` for `reels`
**Pass condition:** At least one campaign tests Reels placement (high reach, lower CPM trend in 2025-2026)
**Evidence format:** "Reels placement tested: [yes/no]."

### 7.5 Stories Placement Tested
**Severity:** LOW**
**PipeBoard source:** `get_adset_details` -- `facebook_positions` or `instagram_positions` for `story`
**Pass condition:** Stories placement tested or excluded intentionally
**Evidence format:** "Stories placement: [active/excluded/not configured]."

### 7.6 Messenger Placement Reviewed
**Severity:** LOW**
**PipeBoard source:** `get_adset_details` -- `messenger_positions`
**Pass condition:** Messenger placements either tested or explicitly excluded based on account vertical
**Evidence format:** "Messenger placement: [active/excluded]."

### 7.7 Placement Customization Active
**Severity:** MEDIUM**
**PipeBoard source:** `get_adset_details` -- `placement_customization` field
**Pass condition:** Creative is customized per placement where manual placements are used (different aspect ratios for Feed vs Story vs Reels)
**Evidence format:** "Placement customization: [active/not active]."

### 7.8 Desktop vs Mobile Placement Split
**Severity:** LOW**
**PipeBoard source:** `get_adset_details` -- `device_platforms` field
**Pass condition:** Device targeting is reviewed and intentional. Mobile-only for most consumer lead gen. Desktop included when B2B or desktop-heavy demographic.
**Evidence format:** "Device platforms: [mobile/desktop/all per adset]."

---

## Section 8: Compliance & Policy (6 items)

### 8.1 No Active Policy Violations
**Severity:** CRITICAL**
**PipeBoard source:** `get_ads` -- `status = WITH_ISSUES` or `DISAPPROVED`; `get_campaigns` -- check for policy flags
**Pass condition:** Zero active policy violations
**Evidence format:** "Ads with policy issues: [count and descriptions]."

### 8.2 Ad Text Not Misleading
**Severity:** CRITICAL**
**PipeBoard source:** `get_ad_creatives` -- `body` and `title` review
**Pass condition:** No before/after claims, guaranteed results language, or personal attributes targeting
**Evidence format:** "Potential policy-sensitive copy: [flag specific instances if found]."

### 8.3 Landing Page Compliant with Meta Policies
**Severity:** HIGH**
**PipeBoard source:** `get_ad_creatives` -- `link_url` (review destination manually)
**Pass condition:** Landing page URLs point to live, relevant pages (not broken, not pop-up heavy, not requiring login to view)
**Evidence format:** "Landing URLs reviewed: [list]. Any broken or suspicious: [flag]."

### 8.4 Restricted Content Categories Properly Declared
**Severity:** CRITICAL**
**PipeBoard source:** `get_campaigns` -- `special_ad_categories` and account-level restrictions
**Pass condition:** Health/wellness, financial products, and political content correctly declared with appropriate targeting restrictions
**Evidence format:** "Special categories detected/declared: [list or NONE]."

### 8.5 Account Not Flagged for Suspicious Activity
**Severity:** CRITICAL**
**PipeBoard source:** `get_account_info` -- `account_status`, `disable_reason`
**Pass condition:** `disable_reason` is null and `account_status = 1`
**Evidence format:** "Account status: [code]. Disable reason: [none or description]."

### 8.6 Age-Restricted Content Properly Targeted
**Severity:** HIGH**
**PipeBoard source:** `get_adset_details` -- `targeting.age_min` where content is age-restricted
**Pass condition:** Alcohol, gambling, or adult content accounts properly age-gate at adset level (18+ minimum)
**Evidence format:** "Age-restricted content: [yes/no]. Min age targeting: [age]."

---

## EASY-SELL FLAGS Summary (Quick Reference)

When running an audit, these are the items to lead with in the sales pitch. A prospect FAILING these is a clear signal that Creekside can improve their results:

| # | Finding | Why It Closes Prospects |
|---|---------|------------------------|
| 1.1 | Pixel not installed or stale | "You're spending money with your eyes closed" |
| 1.3 | No CAPI | "You're missing 30-40% of conversions due to iOS 14 changes" |
| 2.1 | Wrong campaign objective | "Your campaigns are optimizing for the wrong goal" |
| 2.3 | Audience overlap | "Your campaigns are bidding against themselves" |
| 2.5 | No retargeting | "You have no funnel -- all cold, no warm" |
| 3.1 | No website custom audiences | "You can't retarget or create lookalikes without pixel audiences" |
| 3.4 | No retargeting adsets | "Website visitors leave and you never follow up" |
| 3.6 | Not excluding existing customers | "You're spending money advertising to people who already bought from you" |
| 4.1 | < 3 ad variants | "Meta can't optimize with only one ad -- you're not testing anything" |
| 4.2 | No video ads | "Video outperforms static by 3-5x in CPL. You're not in the game." |
| 4.4 | High frequency | "Same person has seen this ad 7 times. They're tuning it out." |
| 4.13 | Old creatives | "Your creatives are [X] days old. Creative fatigue is killing performance." |
| 5.1 | Stuck in learning phase | "Meta is still guessing. You need 50 conversions/week to exit learning phase." |
| 5.5 | Budget too spread out | "You're spreading $[X]/day across [N] campaigns. None of them can scale." |
| 6.1 | Wrong attribution window | "You're not seeing all your conversions. Attribution is misconfigured." |
| 6.2 | Optimizing on wrong event | "You're paying for clicks, not leads. The campaigns are set up backwards." |
| 7.2 | Audience Network on lead gen | "Audience Network leads are junk. You're paying for quantity, not quality." |
