# Template: Case Study SEO Repackage
# File: case-study-seo.md
# Purpose: Repackage existing case studies as SEO-optimized blog posts targeting "[Industry] PPC results" keywords
# Variables filled by the SEO blog agent from seo_verticals + actual case study content

## Template Instructions (for the generator agent)

This template takes an EXISTING published case study from /src/content/case-studies/ and
repackages it as a blog post optimized for search. The case study page is a structured
client-facing deliverable. The blog post is a narrative, educational piece that uses the
case study data as proof while targeting SEO keywords.

Key difference from the case study page:
- Blog post leads with the LESSON, not the client
- Blog post targets a keyword like "dental google ads results" or "law firm ppc case study"
- Blog post adds Peterson's commentary and broader industry context
- Blog post links BACK to the full case study for the detailed breakdown

### Structural Variation Rules
- Randomly select ONE of the 3 narrative frameworks below
- Vary whether the metrics table appears early or late in the post
- Alternate between first-person ("we did X") and third-person ("the campaign achieved X")
- Never open two consecutive case study posts with the same sentence structure

---

## Astro Frontmatter

```yaml
---
title: "{case_study_seo_title}"
description: "{meta_description_under_160_chars}"
date: "{publish_date}"
image: "article-images/{slug}.avif"
category: "{vertical_name} Marketing"
tags: ["CaseStudy", "{platform_tag}", "{vertical_tag}", "Results"]
---
```

## Title Formulas (select the best fit for the case study data)

- "How We [Achieved Result] for a [Industry] [Business Type] with [Platform]"
- "[Industry] [Platform] Case Study: [Specific Metric] in [Timeframe]"
- "[Result Metric]: What Happened When a [Industry] [Business Type] Switched to [Strategy]"
- "From [Before State] to [After State]: A [Industry] [Platform] Case Study"

Examples:
- "How We Cut Cost Per Lead 80% for a Dental Practice with Google Ads"
- "Bankruptcy Law Firm Doubles Conversions: A Google Ads Case Study"
- "20x ROAS: What Happened When a Meal Prep Brand Went All-In on Meta Ads"

## Narrative Framework (select ONE randomly)

### Framework A: Problem-Solution-Proof
1. Open with the problem the business faced (in industry context, not just client-specific)
2. Explain the strategic approach (what we changed and why)
3. Show the results with specific numbers
4. Extract the lesson that applies to other {industry_owner_title}s

### Framework B: Results-First
1. Lead with the headline metric ("229 conversions at $50.29 each")
2. Explain why that matters for {vertical_name} businesses
3. Walk backward through what made it possible
4. End with what the reader can apply to their own campaigns

### Framework C: Before/After Narrative
1. Paint the "before" picture (what the account looked like when we took it over)
2. Walk through the audit findings
3. Detail the strategic changes
4. Show the "after" metrics side by side

## Required Sections

### The Challenge (industry-contextualized)
- Don't just describe the client's problem -- frame it as a common {vertical_name} problem
- "Many {industry_owner_title}s face this exact scenario: [problem]"
- Reference industry benchmarks to show why this is typical

### What We Changed (strategic, not tactical)
- Focus on the STRATEGY, not button-clicking
- E.g., "We restructured campaigns around high-intent keywords" not "We created 3 ad groups"
- Include Peterson's reasoning -- why this approach, not another
- Reference the initial audit findings

### The Results (specific numbers, always)
- MUST include a metrics table or callout block with specific numbers
- Compare before vs after where data exists
- Calculate cost-per-acquisition and ROI
- Note the timeframe ("within 4 months", "over 6 months")

### What This Means for Your {Vertical} Business
- Extract 2-3 actionable takeaways
- Frame them as principles, not steps ("focus on high-intent keywords" not "go to Google Ads and click...")
- This section makes the post useful to readers who aren't going to hire you

## Metrics Callout Block (include in every post)

```markdown
> **Results at a Glance**
> - **[Primary Metric]**: [Value]
> - **[Secondary Metric]**: [Value]
> - **[Tertiary Metric]**: [Value]
> - **Platform**: [Google Ads / Meta Ads / Both]
> - **Timeframe**: [Duration]
```

## CTA Block

```
**Want results like these for your {vertical_name} business?**

Every engagement starts with a free audit. We'll review your current campaigns
and show you exactly where the opportunities are -- no commitment, no sales pitch.

[Get Your Free Audit →](/10k-profit-audit/)

Or read the full case study: [Client Name Case Study →](/case-study-digital-marketing/{case_study_slug}/)
```

## Author Bio Block

```
**About the Author**
Peterson Rainey is the founder of Creekside Marketing, a performance-driven digital advertising
agency managing over $20M in ad spend across Google Ads and Meta Ads. He specializes in
{vertical_name} advertising and has helped {vertical_specific_claim}.
```

## Internal Linking Requirements

- Link to the FULL case study page: /case-study-digital-marketing/{case_study_slug}/
- Link to the cost breakdown post for this vertical (if published): /blog/{vertical_slug}-google-ads-cost/
- Link to relevant service page: /digital-advertising/google-ads/ or /digital-advertising/meta-ads/
- Link to the free audit page: /10k-profit-audit/
- Cross-link to other case study blog posts in different verticals (shows breadth)

## SEO Notes

- Target keyword should appear in: title, H1, first paragraph, one H2, meta description
- Use secondary keywords naturally in subheadings and body
- Keep URL slug concise: e.g., "dental-google-ads-case-study-80-percent-cpa-reduction"
- Aim for 1,500-2,500 words (longer than a typical blog post, shorter than the full case study)
