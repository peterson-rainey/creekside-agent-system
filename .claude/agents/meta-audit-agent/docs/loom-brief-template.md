# Loom Recording Brief Template

This file defines the structure for the Loom Recording Brief PDF -- a freelancer handoff document for Lindsey or Scott.

The brief enables a screen-recorder who has NO Meta Ads expertise to record a compelling Loom video of the audit findings. They follow the breadcrumbs, record their screen navigating to each finding, and speak to the provided talking points.

---

## File Naming

`/tmp/meta-audit-loom-brief-[ACCOUNT_SLUG]-[YYYY-MM-DD].pdf`

---

## Audience and Purpose

**Who reads this:** Lindsey or Scott (freelance screen-recorders)
**Their skill level:** Familiar with navigating web platforms, but NOT Meta Ads experts
**Their task:** Record a 5-10 minute Loom video walking through the 5 biggest findings
**What they need:** Exact navigation steps, what to show on screen, what to say

**Voice for this document:** Clear, instructional, step-by-step. Like writing directions for someone who has never been to Meta Ads Manager but can follow a map.

---

## Brief Structure

### Cover Page

```
[Creekside Marketing Logo / Header]

LOOM RECORDING BRIEF
Meta Ads Audit: [Account Name]

Prepared for: [Lindsey/Scott -- freelancer name if known]
Account: [Account Name] ([act_XXXXXX])
Audit Date: [Month DD, YYYY]

Instructions:
Record a Loom video navigating through the 5 findings below.
For each finding: navigate to the screen shown, hover over the key metric,
and read the talking points in your own words.
Keep the recording under 10 minutes total.
```

---

### Before You Start

**Account URL:**
Meta Ads Manager for this account:
`https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=[account_id_numbers_only]`

(Remove the `act_` prefix from the account ID for the URL -- use only the numbers.)

**Login:**
Use the Creekside team login credentials in the shared 1Password vault. If you don't have access, message Peterson on Google Chat before starting.

**Recording setup:**
- Record your screen + audio
- Keep the recording under 10 minutes
- Start recording from the Campaigns tab (the default view when you open the account URL)
- Upload to Loom and share the link in the ClickUp task

---

### Finding 1: [Top EASY-SELL FLAG or most impactful finding]

**What this finding is (for your context -- don't say this on camera):**
[1-2 sentences explaining what the issue is, in plain language]

**Navigate to:**
```
Step 1: Open the account at the URL above
Step 2: [Menu > Submenu > specific tab, e.g., "Click 'Ads Manager' in the left sidebar > 'Campaigns'"]
Step 3: [What to look at, e.g., "Look at the Status column -- find any campaigns showing 'Learning Phase'"]
Step 4: [What to highlight, e.g., "Click into the campaign named '[campaign name]' and hover over the budget"]
```

**What to show on screen:**
[Specific metric, column, or UI element to have visible -- e.g., "The Frequency column in the ad-level view, filtered to the last 7 days, showing the value of [X]"]

**Talking points (say something like this -- use your own words):**
"[Talking point 1 -- 1-2 sentences. E.g., 'This campaign has been showing the same ad to the same people [X] times in the last week. That's called ad fatigue, and it means people are tuning it out.']"
"[Talking point 2 -- the fix. E.g., 'The fix here is to add new creative variations -- ideally [2-3 new ads] -- so Meta can rotate and test them.']"

---

### Finding 2: [Second finding]

*(Same format as Finding 1)*

**What this finding is:**
[Context]

**Navigate to:**
```
Step 1: [Starting point]
Step 2: [Navigation]
Step 3: [What to look at]
```

**What to show on screen:**
[Specific UI element and value]

**Talking points:**
"[Talking point 1]"
"[Talking point 2]"

---

### Finding 3: [Third finding]

*(Same format)*

---

### Finding 4: [Fourth finding]

*(Same format)*

---

### Finding 5: [Fifth finding]

*(Same format)*

---

### Closing (on camera)

**Talking points for the end of the recording:**
"[Account name]'s account has [N] issues out of [N] items we checked. The good news is most of these are fixable -- some within a week."
"[Top win from the account -- something genuinely positive]."
"If you have any questions about what you saw, just reply to the Loom and we'll follow up."

---

## Finding Selection Criteria

When populating this brief from the full audit:

1. **Prefer EASY-SELL FLAGS.** These are the most visually demonstrable and persuasive.
2. **Prefer findings with visible UI evidence.** Findings that show up as a clear metric or status in Ads Manager make better Loom content than findings that are purely technical.
3. **Prefer the most impactful findings.** CPA problems > naming convention problems.
4. **One finding per section of the checklist if possible** -- don't stack 5 creative findings. Spread across sections for variety.
5. **Order from most dramatic to least** -- open with the strongest finding.

**Priority order if all else equal:**
1. Pixel/tracking issues (visible in Pixels section)
2. No retargeting (visible as missing campaigns in Campaigns tab)
3. Creative fatigue (visible in Frequency column at ad level)
4. Wrong campaign objective (visible in Campaign objective column)
5. Budget too spread thin (visible in daily spend breakdown)

---

## Navigation Reference (Meta Ads Manager)

These are the common navigation paths Lindsey/Scott will need:

| To find... | Navigate to... |
|-----------|----------------|
| Campaign list | Ads Manager > Campaigns tab |
| Campaign objective | Campaigns tab > "Objective" column (may need to customize columns) |
| Ad set targeting | Campaigns tab > click campaign name > Ad Sets tab > click ad set name > Edit |
| Ad creative | Campaigns tab > campaign > Ad Sets > ad set > Ads tab > click ad name > Edit |
| Frequency metric | Ads or Ad Sets tab > Columns dropdown > "Delivery" columns > Frequency |
| Pixel status | Business Manager (business.facebook.com) > Events Manager > Pixels |
| Custom audiences | Ads Manager left menu > Audiences |
| Attribution window | Ad set edit view > Conversion window section |

**Note for Lindsey/Scott:** Meta Ads Manager changes its UI frequently. If a menu looks different from these instructions, look for the same concept in the nearby menus. The data is always there -- it may just be labeled or located slightly differently.

---

## PDF Generation Instructions

Use `mcp__desktop-commander__write_pdf` with the following approach:

1. Build the full brief as clear, instructional content
2. Keep it scannable -- bullet points, numbered steps, clear headers
3. Use larger font for navigation steps so they're easy to follow on a second monitor
4. Include the full account URL in the before-you-start section
5. File path: `/tmp/meta-audit-loom-brief-[ACCOUNT_SLUG]-[YYYY-MM-DD].pdf`

If `write_pdf` fails, write markdown to `/tmp/meta-audit-loom-brief-[ACCOUNT_SLUG]-[YYYY-MM-DD].md` and report fallback prominently.
