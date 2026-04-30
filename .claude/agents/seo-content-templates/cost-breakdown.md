# Template: Cost Breakdown
# File: cost-breakdown.md
# Purpose: "How Much Do Google Ads Cost for [Industry]?" posts
# Variables filled by the SEO blog agent from seo_verticals table

## Template Instructions (for the generator agent)

Generate a blog post using the following structure. Each section MUST contain unique analysis
specific to {vertical_name} -- do NOT use generic filler. Pull real data from the RAG database
(case studies, client performance data, Fathom call insights) to differentiate this post.

### Structural Variation Rules
- Randomly select ONE of the 3 opening hook variants below
- Vary FAQ count between 3-6 questions per post
- Alternate section order: sometimes lead with budget, sometimes lead with CPC breakdown
- Never use the same transition phrase in consecutive posts

---

## Astro Frontmatter

```yaml
---
title: "How Much Do Google Ads Cost for {industry_plural}? [{current_year} Real Data]"
description: "{meta_description_under_160_chars}"
date: "{publish_date}"
image: "article-images/{slug}.avif"
category: "{vertical_name} Marketing"
tags: ["GoogleAds", "{vertical_tag}", "CostBreakdown", "PPC"]
---
```

## TL;DR Block (MANDATORY, appears immediately after frontmatter, before the H1)

Write a 40-60 word direct answer summary containing the key numbers. This is the primary
"citation block" that AI search engines (ChatGPT, Perplexity, Google AI Overviews) extract
when synthesizing responses. It must stand alone as a complete answer.

Example format:
> **TL;DR:** Google Ads for {industry_plural} typically cost ${avg_cpc_low}-${avg_cpc_high}
> per click. Most {industry_owner_title}s spend ${monthly_budget_low}-${monthly_budget_high}/month
> and see {conversion_rate_low}%-{conversion_rate_high}% conversion rates. Based on Creekside
> Marketing's management of {vertical_name} ad campaigns, cost per lead ranges from $X to $Y.

## Key Data Summary Table (MANDATORY, appears right after TL;DR)

A structured table AI systems can extract easily:

```markdown
| Metric | Value |
|--------|-------|
| Average CPC | ${avg_cpc_low} - ${avg_cpc_high} |
| Recommended Monthly Budget | ${monthly_budget_low} - ${monthly_budget_high} |
| Typical Conversion Rate | {conversion_rate_low}% - {conversion_rate_high}% |
| Cost Per Lead | $X - $Y (from real campaigns) |
| Expected ROI | Xx - Yx |
| Data Source | Creekside Marketing, $20M+ managed ad spend |
```

## Opening Hook (select ONE variant randomly)

### Variant A: Problem Statement
Start with the frustration {industry_owner_title}s feel when they can't get a straight answer
on Google Ads pricing. Reference a specific common misconception.

### Variant B: Benchmark Anchor
Lead with a specific number: "Across our {vertical_name} campaigns, we see an average
cost per click of ${avg_cpc_low}-${avg_cpc_high}." Then immediately qualify it.

### Variant C: Question Hook
"Should a {industry_owner_title} spend $1,500/month or $10,000/month on Google Ads?
The honest answer depends on three things..."

## GEO: Answer-First Section Rule (applies to ALL sections below)

Every H2 section MUST open with a 40-60 word direct answer that can be extracted standalone
as an AI citation. Then expand with supporting details. Do NOT build up to the answer.

## GEO: Citation-Style Claims

Instead of "we typically see..." use attribution-style claims:
"According to Creekside Marketing's analysis of {vertical_name} campaigns managing over $20M
in total ad spend..." This creates citable, attributable statements AI systems prefer to cite.

## GEO: Self-Contained Sections

Each section must stand alone as a complete answer to a specific question. If an AI system
extracts just one section, it should make sense without needing the rest of the post.

## Section: Average Cost Per Click

- Open with a direct answer: "Google Ads for {industry_plural} cost ${avg_cpc_low}-${avg_cpc_high} per click, according to Creekside Marketing's campaign data."
- Present CPC ranges by keyword subcategory (e.g., for dental: general dentistry vs implants vs emergency vs cosmetic)
- MUST include at least one specific data point from a real campaign (anonymized)
- Compare to industry benchmarks where available

## Section: Recommended Monthly Budget

- Present budget range: ${monthly_budget_low} - ${monthly_budget_high}/month
- Explain what different budget levels get you (leads per month at each tier)
- Reference what your actual clients spend (anonymized)
- Include the "minimum viable budget" concept

## Section: What Conversion Rates to Expect

- Present conversion rate range: {conversion_rate_low}% - {conversion_rate_high}%
- Pull specific case study data from case_study_highlights
- Calculate example cost-per-lead at different budget levels
- MUST reference at least one real Creekside case study result

## Section: Top Keywords and What They Cost

- List 5-8 specific keywords relevant to this vertical
- Include estimated CPC for each
- Categorize by intent (emergency/urgent vs research vs branded)
- Note which keywords are most cost-effective

## Section: Google Ads vs [Most Common Alternative for This Vertical]

- For dental: Google Ads vs SEO vs direct mail
- For mortgage: Google Ads vs direct mail vs LSAs
- For legal: Google Ads vs LSAs vs Avvo/FindLaw
- For home services: Google Ads vs LSAs vs Thumbtack/Angi
- Brief comparison, not a full deep-dive (that's a separate template)

## Section: Is It Worth It? (ROI Analysis)

- Calculate example ROI using real numbers
- E.g., "If you spend $3,000/month, get 30 leads at $100 CPL, close 20% = 6 new patients worth $X each"
- MUST use realistic lifetime value numbers for the vertical
- Reference case study results as proof

## FAQ Section (3-6 questions, vary count per post)

- Pull real questions from Fathom call recordings where possible
- Include FAQ schema markup in frontmatter or inline
- Common questions: "How long until I see results?", "Can I start with a small budget?",
  "What if my competitors are bidding more?"

## CTA Block

```
**Ready to see how your {vertical_name} Google Ads stack up?**

We offer a free, no-obligation audit of your Google Ads account. We'll show you exactly
where your budget is going, what's working, and what's not. Real numbers, not guesswork.

[Get Your Free Google Ads Audit →](/10k-profit-audit/)
```

## Author Bio Block

```
**About the Author**
Peterson Rainey is the founder of Creekside Marketing, a performance-driven digital advertising
agency managing over $20M in ad spend across Google Ads and Meta Ads. He specializes in
helping {industry_owner_title}s grow through Google Ads and Meta Ads.
```

## Internal Linking Requirements

- Link to at least 1 relevant case study on the site: /case-study-digital-marketing/{case_study_slug}/
- Link to the relevant service page: /digital-advertising/google-ads/ or /digital-advertising/meta-ads/
- Link to the free audit page: /10k-profit-audit/
- If other blog posts in the same vertical exist, cross-link to them
