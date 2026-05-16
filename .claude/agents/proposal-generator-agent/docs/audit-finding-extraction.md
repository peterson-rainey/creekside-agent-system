# Audit Finding Extraction

Reference for Step 2.5 of the proposal-generator-agent. Covers when to extract findings,
how to detect a live audit from a transcript, what makes a finding usable, and what to skip.

---

## When to Look for Audit Findings

Only extract findings when Peterson conducted a **live account audit** during the discovery
call -- meaning he had the prospect's Google Ads or Meta Ads account open and was reading
from it in real time. This is distinct from:

- Peterson describing what he *would* look for in a future audit
- Peterson making general observations about the industry or platform
- Peterson asking the prospect to describe their account

If Peterson wasn't in the account live, there are no audit findings to extract. Use the
generic onboarding language instead.

---

## How to Detect a Live Audit from the Transcript

Look for ANY TWO of the following signals. One signal alone can be coincidental; two together
confirm a live audit happened.

**Verbal access signals:**
- "I'm looking at your account right now"
- "Let's look at your campaigns"
- "I can see..."
- "Here's what I'm seeing in your account"
- "While I have your account open..."
- "I'm in your Google Ads dashboard"

**Specific metric callouts** (figures Peterson could only know from live access):
- Exact cost per conversion, CPC, CTR, ROAS
- Exact number of ad groups, campaigns, or keywords
- Quality Score values
- Impression share percentages
- Attribution model in use (e.g., "data-driven", "last click")

**Account structure observations** (too specific to guess):
- "You're running broad match on all keywords"
- "You have no negative keywords"
- "Your bidding strategy is set to Maximize Clicks, not conversions"
- "You have five ad groups each with 15 headlines" (generates ~100K combinations)

**Tracking / optimization observations:**
- "You're optimizing for 60-second calls"
- "95% of your source attribution shows 'no source'"
- "You have no conversion actions set up"
- "Your conversion window is set to 7 days"

---

## What Makes a Good Finding

A usable audit finding is:

1. **Specific.** Tied to a number, a setting name, or a structural fact. "You have broad
   match keywords" is okay; "you have 47 keywords all on broad match with no negatives" is
   better.

2. **Verifiable.** The finding can be confirmed by looking at the account. Not an opinion.

3. **Account-derived.** Peterson could only know this from being in the account. Not
   something the prospect told him, not something visible without account access.

4. **Actionable.** The finding implies something Creekside would fix. Findings that don't
   connect to an improvement are not worth including.

**Good format:** Verbatim quote from Peterson on the call, trimmed to the key observation.
Or a clean paraphrase in past tense: "Optimizing for 60-second calls instead of revenue."

---

## Canonical Example: Shin Nagpal / Bob's Automotive (Village Repair, 2026-05-15)

Peterson reviewed Bob's Automotive's Google Ads account live during the discovery call
with Shin. The findings that made it into the proposal:

1. "Optimizing for 60-second calls instead of revenue -- the conversion goal is set to
   calls that last at least 60 seconds, which is easy for Google to game without actually
   producing booked appointments."

2. "5 ad groups with 15 headlines each -- that's approximately 100,000 ad combinations on
   a $2,000/month budget. The algorithm can't learn which combinations work because there's
   not enough data per variant."

3. "Going after competitor keywords at high CPC despite a low budget -- competitor terms
   like [competitor name] are expensive and rarely convert as well as intent-based terms.
   Pulling budget from high-intent keywords to chase brand terms at this budget level
   reduces efficiency."

4. "95% of customer source attribution shows 'no source' -- Google Ads clicks are not being
   tracked through to conversions in the CRM, so the algorithm has no signal about which
   clicks actually became customers."

The proposal section Peterson hand-built used this framing:
> "The 60-second-call conversion goal we saw in Bob's Automotive account is exactly the kind
> of metric that's easy to game -- Google can optimize for long calls without those calls
> ever becoming paying customers."

That specific, call-verified framing is the target output.

---

## Where Findings Go in the Proposal

Findings are rendered as a shaded callout block at the top of the **Onboarding Services**
section, under a header like "What We Found in Your Account."

The `build_lead_docx.py` script renders this via `build_audit_findings_callout()` when the
`audit_findings_section` dict is present in the input JSON. The callout uses a light-blue
background (#EBF5FB) to visually distinguish it from the surrounding body text.

**Why Onboarding, not Overview?**
The Overview sets the tone and context. The Onboarding section is where the prospect is
already thinking "what will you actually do?" -- the callout lands better there as proof
that the work has already started.

**If findings are short (1-2 items):** They can also be woven inline into the "Why Creekside
Marketing" section as a lead-specific bullet, e.g., "We already identified [finding] in your
account -- here's what that means for your results."

---

## Anti-Patterns (What NOT to Include)

**Fabricated specificity.** If you cannot tie a finding to a transcript quote or a stated
metric, do not include it. "They probably have broad match keywords" is not a finding.

**Generic audit promises.** "We'll conduct a full audit of your account" is fine as
onboarding copy but is NOT an audit finding. A finding is something already observed.

**Prospect-reported facts.** If the prospect said "our cost per lead is $80," that's
discovery context, not an audit finding. An audit finding is something Peterson saw in the
account, not something the prospect told him.

**Hypotheticals.** "If you're doing X, that might be causing Y" is a hypothesis. Include
it only if Peterson confirmed it by looking at the actual setting.

**Unverified claims.** If Peterson said "I think you might be..." or "you're probably...",
that's hedged. Hedged observations should not appear in the callout as facts.

---

## Step 2.5 Output Summary

After processing, note in the run summary:

```
Audit Findings: [DETECTED / NOT DETECTED]
Detection signals: [list the signals that triggered detection, or "none"]
Findings extracted: [N] -- [brief titles]
Callout header: "[header text]"
```
