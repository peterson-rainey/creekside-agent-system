# Upwork Proposal - Generic "set up and manage a Google AdWords campaign" (new campaign, ongoing support, no industry/spend/geo/rate)
Profile: Samuel Rainey (General) | Style: strategic | Status: UNSENT | Drafted 2026-09-26 ~12:55 US Central (DB now() 2026-09-26 17:51 UTC; filename uses the 9/27 Manila date like the other recent drafts)

## THE POST (verbatim, this is all we have)
"We need a freelancer to set up and manage a Google AdWords campaign for our business. The work includes creating the campaign structure, writing and optimizing ad copy, setting up tracking and conversion goals, and providing ongoing support to improve performance. You should be able to recommend targeting strategies, monitor campaign results, and make adjustments to improve reach and return on investment. Experience managing paid search campaigns and improving campaign performance is important for this role."

## SCREENS (run this session)
- Ads in scope: YES (Google Ads set-up and ongoing management).
- Platform: Google-only, so Samuel. Lindsey is a total platform fail (she cannot sell Google Ads); no twin drafted. Style "strategic" exists for Samuel only, so there was no profile fork to raise.
- NOT fired: white-label ("our business"), full-time seat, hourly-seat wording, trial, required-items list, screening questions, CRO gate, gate word, setup-only-with-handoff ("set up and manage" plus "ongoing support" is the opposite), hidden AI-canary line (post is four sentences, read for it).
- NOT in the paste, so unscreened: ad spend, geo, hourly range or fixed price, payment verification, client history, industry. **Check the job page before sending.** Spend is asked in the close as a bracket at/above our $5,000 Google floor, so the answer does not double as a floor screen.
- The buyer writes "Google AdWords" (name retired in 2018). They may be new to ads or an older business. The draft says "Google Ads" and does not correct them.
- Prior bid: none on this post. `upwork_jobs` probed on distinctive fragments. "set up and manage a Google AdWords campaign" = 2 rows, both DIFFERENT posts (skincare treatments, 2025-08-27, General, not viewed; boutique-agency AdWords setup, 2025-06-18, General, not viewed). "reach and return on investment" = 2 rows, one dating-app Meta/TikTok post applied twice. "creating the campaign structure", "tracking and conversion goals", "ongoing support to improve performance" = 0 rows. A same-day send would not have synced yet.
- Twin/sibling check (both draft folders, `git log`, re-run right before QC and again before commit): no draft of this job, no concurrent commit. Nearest siblings are DIFFERENT posts from the same "We need a freelancer to..." template family, same profile:
  - `2026-09-26_google-ads-review-improve-account-performance-generic_samuel_strategic-diagnostic_UNSENT.md` (bid-adjustment compatibility; attaches the same Winterbotham PDF).
  - `2026-09-26_generic-google-ads-optimize-existing-campaigns-roi-parttime_samuel_strategic-diagnostic_v2_UNSENT.md` (branded search flatters ROI; same PDF).
  - This draft argues a third, unrelated thing (match type sets the reach/control trade at launch). Max shared 3-grams with any sibling = 10, all generic ("case study is attached", "a bankruptcy firm in Orange County"). **If the job page shows this buyer is the same as either sibling's, send ONE bid only.**
- Case-study matcher: `match_proposal_context` returned two rows at relevance_score 1 (ReferPro SaaS, Green Shield pest control), below the >= 3 threshold, so nothing forced. Proof is Winterbotham only.

## THE ARGUMENT
Opener: on a new campaign the match type that widens reach is the same setting that loosens control (Google's own match-type help), so structure decides where early budget goes. Body: one core campaign on exact and phrase match with its own budget; reach as a separate campaign that keeps budget only while cost per conversion stays under what a conversion is worth; ad copy by keyword group; conversion goals set before spend (primary vs secondary), tag tested and week-one counts checked against the real inbox and call log; weekly search-terms loop with a dated change log. Proof: Winterbotham, described ONLY as what the record documents (segments, an Orange County-only campaign, budget reallocated toward converting markets and keywords). One spend question.

## VERIFIED THIS SESSION
- **Google Ads Help 7478529 (About keyword matching options), fetched 9/26:** exact match "gives you the most steering over who views your ad, but reaches fewer searches than both phrase and broad match"; phrase reaches "more searches than with exact match and fewer searches than with broad match". The draft says "Google's match-type help says exact match gives the most steering but reaches fewer searches than phrase or broad" (paraphrase, not a quote). "Broad reaches the most" is the complement of those two lines.
- **Google Ads Help 6270625 (Understand your conversion tracking data), fetched 9/26:** the Conversions column "is generally used for bidding optimization"; secondary actions and view-through are in "All conversions"; only bottom-of-funnel actions should be Primary. The page gives no crisp primary-vs-secondary definition, so the draft says "land in" for primary and "show up in" for secondary and hedges the bidding clause with Google's own "generally". Consistent with `reference_google_ads_reporting_mechanics_verified`.
- **Google Ads Help 1722038 (About advanced location options), fetched 9/26. NOT USED in the draft, recorded for the next one:** "By default, location targeting includes both physical locations and locations of interest"; Presence or interest is the default AND recommended option for Search. Expert review wanted a "target people in the area, not people interested in it" line. Google itself recommends the default, so a blanket line would contradict Google and would be wrong for any business that serves travelers or sells nationally. It is a judgment call that depends on the business type. No word room for a conditional version.
- **Winterbotham Parham Teeple** (`case_studies` row d740fec4, updated 2026-04-13, re-read live) and the CLEAN PDF text re-read this session: bankruptcy law, Google Ads, Orange County CA; prior 117 conversions at $86.09; "Conversion volume was flat"; restructured into focused segments incl. an Orange County-only campaign; "Budget was reallocated toward the highest-converting markets and keywords, while underperforming segments were paused or restructured"; result 229 at $50.29 (42% lower); $11.5K spend, "Only $1.44K more than the prior period". 117 x $86.09 = $10,072 and 229 x $50.29 = $11,516, a $1,444 difference, matching $1.44K. No `reporting_clients` row, so no operator claim; body says "Our team". "Conversions" not "leads" in the body, because the DB column is conversions and the tracking section warns about what counts as one (the PDF itself says "leads"). PDF has zero localhost/Railway/http strings.
- **Deliberately omitted from the body:** the PDF's "clicks up 21%" line. Placed after a reach argument it would read as evidence that reach was not the driver, and the record does not document that ([[feedback_no_implied_causation_juxtaposition]]). The paragraph is headed neutrally ("One restructured account"). An earlier header, "Separate campaigns let budget move", was changed after QC because, sitting under the reach-budget rule, it read as the case study validating the core-versus-reach split, which the record does not document.

## ATTACHMENT
**SEND WITH `.claude/attachments/winterbotham_parham_teeple_CLEAN.pdf`** (785,596 bytes, real 3-page PDF, tracked in git). Body says "Its case study is attached." Drop that sentence if the PDF is dropped. Do not attach the raw Drive download. Same PDF is on the two sibling drafts above.

## FEE / BID
Nothing typed in the body (the post asks for none). Carried from the 9/26 sibling notes, NOT re-verified this session: the General bid rate on recent Google bids has been $90; if the job turns out fixed-price, revisit; raise the 90-day minimum and the onboarding fee ($1,500 per platform, audit inside it) on a call, not in the body. Fixed vs hourly is not in the paste.

## REVIEW
- qc-reviewer-agent round 1: **PASS WITH FIXES**. Applied: "spends" to "can spend" (the "so" clause follows a Google reference, so readers credit it to Google); "teaches" to "can teach"; "ad spend" so the bracket cannot be read as the freelancer's fee; "only appear in All conversions" softened to "show up in"; "Reach gets" to "Reach can get" (the close says the low end keeps everything on the core). Its residual note that the Winterbotham paragraph sits near "core/reach" wording is why the close now says "how wide the launch can go" and not "core".
- expert-review-agent: **Good** (Strong with its top two fixes). Applied: opener rebuilt so the first ~150 characters name the lever (match type) instead of an aphorism; the reach-budget rule replaced (the old "holds up against the core's cost per conversion" was rigged, because looser-intent traffic rarely beats an exact-match core on cost and a small slice logs only a handful of conversions, so it is now a customer-value ceiling, which is also the return-on-investment the buyer asked for); "decides" varied; ad-copy line rewritten because echoing typed queries is naive for responsive search ads; "conversions" instead of "leads"; "$1,400" to "$1,440" (PDF says $1.44K); inbox-and-call-log reconciliation added to tracking.
  - NOT taken: "Bidding starts on Maximize Conversions and moves to a target cost per conversion once the core has about 30 conversions a month". The expert itself called the 30 a common convention, not a Google rule, and the 9/26 sibling notes record that a "30 conversions" figure is unverified and must not be reused. No bidding sentence was added; the reach rule no longer depends on it.
  - NOT taken: location line (see above).
- qc-reviewer-agent recheck on the revised text: **PASS WITH FIXES**, one required. Applied: (1) header "Separate campaigns let budget move" to "One restructured account" (required; implied-causation risk, and "separate campaigns" was broader than the record's "focused segments including an Orange County-only campaign"); (2) "what a customer is worth to you" to "what a conversion is worth to you" (cost per conversion is a lead or call cost, so measuring it against customer value is too loose a bar). QC confirmed the opener does not overclaim beyond the match-type quotes ("can spend" is hedged; "the campaign structure is where you decide that" is slightly loose because match type is set per keyword, but the next section delivers how budget rides on it, so acceptable), the body of the case-study paragraph is free of implied causation, and the $1,440 arithmetic checks ($10,073 to $11,516). Its low-risk note: "form fill or call" and "inbox and call log" assume a lead-gen business; the post names no industry and "buy or call" in the opener covers both. Optional cosmetic on "the search terms report sorts" not taken.
- Final (counted from this file's proposal block): 345 words incl. four headers (331 prose), 2,007 chars against Upwork's 5,000, 0 em dashes, 0 URLs, no sign-off, no price.

## NOT LOGGED
`upwork_proposal_logs` INSERT was not run: `contractor_query` cannot INSERT (42601) and this session did not bypass it. Flag for Peterson/Queenie if the log row matters.

## CONSTRAINTS
250-350 words. No sign-off (ruled 9/4), no URLs, no contact info, no price, zero em dashes. Bold headers per the 9/25 standing instruction (paste as literal asterisks); opener left un-headered. "Our team" for delivered work, never a named principal. Weekly search-terms review is a work cadence, not a promise of weekly client updates (reporting cadence is every two weeks).

---

PROPOSAL (paste below this line)

In a new Google Ads campaign, the match type that widens your reach is the same setting that loosens your control over who sees the ad. Google's match-type help says exact match gives the most steering but reaches fewer searches than phrase or broad, so a launch built for reach can spend early budget where you steer least, and the campaign structure is where you decide that.

**How I'd structure the launch**

One core campaign on exact and phrase match, built around the searches where someone is ready to buy or call, with its own budget so nothing broader can drain it later. Reach can get a separate campaign once the core has conversions to compare against, and it keeps its budget only while its cost per conversion stays under what a conversion is worth to you. Ad copy follows the same keyword groups, written to what each group is after, and headlines that lag get swapped out monthly.

**Tracking before any spend**

Conversion goals get set first. Actions marked primary land in the Conversions column, which Google says is generally what bidding optimizes toward, and secondary ones show up in All conversions. So a page view marked primary can teach the account to buy page views. The tag gets tested with a real form fill or call before launch, and week-one counts get checked against the actual inbox and call log.

**After launch**

Each week the search terms report sorts real searches into new keywords and negatives, and each change is logged with its date so results can be read against it.

**One restructured account**

A bankruptcy firm in Orange County was paying $86.09 per conversion on flat volume. Our team cut its campaigns into separate segments, one for Orange County alone, and shifted budget to the markets and keywords already converting. Conversions climbed from 117 to 229 at $50.29 each, on about $1,440 more spend. Its case study is attached.

Roughly what ad spend is set aside each month, closer to $5,000 or $10,000? That range decides how wide the launch can go.
