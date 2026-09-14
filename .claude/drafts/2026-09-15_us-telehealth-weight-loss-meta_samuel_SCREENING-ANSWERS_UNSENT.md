# Screening answers: US telehealth weight-loss Meta owner (PEPTIDIC post)

- **Profile:** Peterson Rainey (General, formerly Samuel) | **Date:** 2026-09-15 Manila / 2026-09-14 CT | **Status:** UNSENT
- Pairs with `.claude/agents/upwork-proposal-agent/drafts/2026-09-15_us-telehealth-weight-loss-meta-compounded-brandname_samuel_strategic_UNSENT.md`
- A Lindsey twin proposal exists. Send one profile at most.

## ANSWERS (sendable)

### Q1
Violates: "Still carrying the weight you can't seem to lose? Your GLP-1 plan starts here."

Does not: "GLP-1 weight loss treatment, prescribed online by licensed US providers."

The difference is who the sentence is about. The first line is about the reader: "you" tied to their body tells them we know something about their health, and Meta's personal attributes policy bans that whether it's stated outright or only implied. The second line is about the service, which is where Meta says ads should focus. It still needs your LegitScript certification and Meta's written permission to run, but it's clean on personal attributes.

"You" on its own is fine. "Start your online visit with a licensed provider" passes because no health attribute is attached to the reader. Meta's own examples draw the same line: "New diabetes treatment available" is allowed, "Do you have diabetes?" is not. Question hooks are where this slips in most easily, so they're the first thing I rewrite in this category.

### Q2
Available today: location, minimum age and language work as hard limits, along with custom audience exclusions. Age ranges, gender, detailed targeting and custom audience inclusions are suggestions by default, which Meta can deliver beyond. Weight-loss ads and prescription drug ads both have to target 18+, and prescription ads can only run in eligible countries, which includes the US. Weight loss isn't a Special Ad Category, so Advantage+ audience is available.

Removed: Meta took out detailed targeting tied to health causes in January 2022, and detailed targeting exclusions in 2025. The bigger constraint now is data. Meta says custom audiences can't reflect, imply or be based on health information, and its health and wellness data source category explicitly includes telemedicine platforms and pharmacies, which can bring core setup, restricted mid and lower funnel events, or full restrictions. As I read that, intake-starter audiences, patient lists and lookalikes built from patients are all out.

How I'd build around it: broad inside the hard limits, and let creative do the targeting, since each angle pulls a different buyer. Warm audiences come from engagement with your own content, like people who watched most of a provider video, defined by the content rather than any condition. Separate ad sets only where the offer itself changes, such as a state where a product isn't available. New versus returning patients gets read in your backend rather than built into audiences.

### Q3
None yet in this vertical. We haven't run Meta for a weight-loss telehealth brand, so I won't give you a list of winners I haven't seen.

What I can be specific about is what gets rejected, because Meta writes it down. Its weight-loss rules bar close-ups of a body area with pinched fat, statements that attack someone's appearance, and promises of a specific result in a set timeframe without disclaimers or qualifiers. Personal attributes rules out any hook that tells the viewer something about their health. For compounded products, implying sameness with the brand-name drug is one of the two practices the FDA cited in its letters to 30 telehealth companies this year.

What looks good but underperforms, from our own accounts: in August, a dental practice's Meta account ran an engagement campaign and a leads campaign side by side on nearly the same budget. The engagement campaign got almost twice the impressions and more clicks, and recorded no enquiries. The leads campaign recorded 124 at $15.77 each. Cheap attention is the easiest number to mistake for a winner.

How I test a new angle:
1. Compliance check first, on the ad and the page it points to.
2. The angle is the only variable: same format, same landing page, and three hooks per angle so one weak hook doesn't sink a good idea.
3. Its own budget, so a new ad isn't starved by an older winner.
4. A spend cap agreed up front from your target cost per approved patient. Hook rate and click-through can kill an obvious loser early, but the winner is picked on approved patients in your backend.
5. Rejections tracked per angle. An angle that converts but keeps getting rejected isn't a winner, because Meta can weigh an advertiser's compliance history when deciding which ads get extra review.

### Q4
We don't have a recovered Meta restriction to point to, in this vertical or any other, so this is process rather than a war story.

After it happens:
1. Open Business Support Home and pin down what was restricted. It can be the business portfolio, the ad account, a Page or a person's profile, and if a restricted person was the only user on an ad account, that account can be disabled too.
2. Treat "unusual activity" as a security problem first. Check payment activity and who has access, look for spend or people nobody recognizes, and check whether Meta already removed admins, paused ads or changed the payment method.
3. Secure it: remove anyone who shouldn't be there, reset passwords, confirm two-factor is on.
4. Work through what Meta asks for, which can include confirming identity, completing verification and securing the account before requesting a review. Review requests are limited and Meta says reviews typically take 48 hours, so we send one complete, accurate request rather than several fast ones.
5. No new ad accounts or borrowed business portfolios in the meantime. Meta's account integrity rules treat accounts used to evade enforcement as violations, including ones it links back by common ownership.
6. After reinstatement, paused ads don't restart on their own. We bring them back in stages and watch for a repeat.

Before it happens:
- A verified business portfolio, with two-factor required for everyone, not only admins.
- At least two people with full control, and no ad account where one person is the only user.
- Our team works through partner access in your portfolio, never shared logins.
- One payment method in the business's name, kept current.
- LegitScript and Meta's written permission in place before any prescription ad runs.
- Every ad and its landing page checked before launch, since Meta can weigh compliance history when deciding which ads get extra review.
- A pixel that sends no health information. Meta lists data restrictions and suspension among the consequences.
- Budget increases in steps on a new account, not jumps.

### Q5
First I'd find out whether the later steps aren't firing or are firing and getting blocked, because the fixes are different.

Not firing: on its own, the pixel only logs a new page view when the URL changes, so a form that swaps steps without changing the URL looks like a single page. The same happens if the intake loads inside an iframe or runs on a template the pixel was never added to. Test Events in Events Manager and the browser's network requests show which one it is quickly.

Getting blocked: Meta's health and wellness data source category explicitly includes telemedicine platforms. That can bring core setup, which strips the part of the URL after the domain so separate step URLs can look identical, restrictions on mid and lower funnel events, or full restrictions. Events Manager shows the category and any restriction on the dataset.

Then I'd rebuild it deliberately rather than switching everything on:
1. A short list of milestone events, such as started, account created and checkout complete, named for the step and never for the treatment.
2. Nothing from the answers in event names, parameters or URLs. Meta treats health information as prohibited and puts responsibility for what the integration sends on the advertiser.
3. The pixel stays off the medical question screens, and automatic events and automatic advanced matching stay off, so Meta isn't detecting events or reading form fields on its own.
4. Checkout completion sent server-side from your backend, deduplicated against the browser event, with your counsel signing off on which identifiers go with it. The FTC has brought cases against online health companies over this, including one whose custom events carried names like "Paid: Weekly Therapy" and went to ad platforms with email addresses.
5. The click ID carried across the jump from the main site to the subdomain. On a dental account earlier this year, what held up validation after our tracking specialist rebuilt the tags was the click ID not being in the lead records the conversion had to match.

Whatever Meta ends up allowing, cost per approved patient gets read from your backend.

## VERIFICATION (2026-09-14 CT)

- Q1: Meta Transparency Center, Privacy Violations and Personal Attributes (changelog Jun 26, 2024), read in-app browser: examples "New diabetes treatment available" allowed, "Do you have diabetes?" not; "Use you/your language without a personal attribute" allowed; "ads should focus on the benefits of the product or service".
- Q2: Advantage+ audience help (938372127764391): controls = Locations, Minimum age, Custom audiences to exclude, Languages; suggestions = Age, Gender, Detailed targeting, Custom audience inclusions; SAC campaigns lack Advantage+ audience. Data source categories (1402913027039332): health and wellness includes telemedicine platform, pharmacy. Restriction types (511197658391698): core setup, certain standard events (mid and lower funnel), full. Prohibited information (361948878201809): custom audience names/criteria must not reflect, imply or be based on prohibited info. Jan 19, 2022 health-cause targeting removal (Search Engine Land, Adweek). Detailed targeting exclusions removed Mar 31, 2025 (Social Media Today, secondary). PipeBoard interest search NOT run: weekly free-plan cap hit, so no specific interest is claimed.
- Q3: Meta H&W help (2489235377779939): pinched-fat close-ups, statements of inferiority, specific outcomes in a set timeframe without disclaimers. FDA Mar 3, 2026 press release (two practices, 30 companies). Tooth Co (unnamed) re-verified live 2026-09-14: Aug 2026, Engagement $1,845.88 / 49,760 impr / 1,584 clicks / no conversions; Leads $1,955.17 / 26,721 / 1,087 / 124 = $15.77. Both $0 in Sept, so "in August" only. Historical compliance wording: reference_meta_restriction_policy_verbatim.
- Q4: request review (530209463124901): admin only, typically 48 hours, limited number of requests, ads not automatically restarted. Troubleshoot (422289316306981): confirm identity, complete verification, secure account, request review. Unrecognized activity (524424920973484): Meta may remove admins, pause ads, change payment methods. 2FA (280940009201586): admins only / everyone / no one. Restriction targets and sole-user disable: reference_meta_restriction_policy_verbatim. Account Integrity evasion clause (common ownership). Zero Meta recovery proof: feedback_dq_no_ads_in_scope.
- Q5: Meta developer blog (2017): pixel History State listener fires PageView on pushState. Automatic events (555177831677798, note dated Aug 3, 2026: AI detects and adds events). Automatic advanced matching reads form fields (1993001664341800 summary). FTC Monument press release (Apr 2024): custom events like "Paid: Weekly Therapy" plus email addresses to ad platforms. Fusion Dental (unnamed, churned 7/22/26): GTM client + server containers rebuilt (Fathom 1b9001f5); ClickUp thread 41131 (Jul 12, 2026): "Zapier can't find records with FBclid", manual event needed to validate.
