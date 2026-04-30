# Template: Comparison
# File: comparison.md
# Purpose: "Google Ads vs [Alternative] for [Industry]" posts
# Variables filled by the SEO blog agent from seo_verticals table

## Template Instructions (for the generator agent)

Generate a blog post comparing Google Ads to the most relevant alternative channel for this
vertical. Each comparison must use real campaign data, not generic pros/cons lists.

### Comparison Pairings by Vertical
- Dental: Google Ads vs SEO
- Mortgage: Google Ads vs Direct Mail
- Legal: Google Ads vs Local Service Ads (LSAs)
- Home Services: Google Ads vs Thumbtack/Angi/LSAs
- Med Spa: Google Ads vs Meta Ads (Facebook/Instagram)
- E-commerce: Google Ads (Shopping) vs Meta Ads
- Meal Prep: Meta Ads vs Google Ads (flip -- Meta is primary for this vertical)
- SaaS: Google Ads vs LinkedIn Ads

### Structural Variation Rules
- Randomly select ONE of the 3 frameworks below
- Vary whether the verdict comes early or late
- Alternate between "use both" and "start with X" conclusions based on real data
- Never open two comparison posts with the same sentence structure

---

## Astro Frontmatter

```yaml
---
title: "Google Ads vs {alternative} for {industry_plural}: Which Drives Better Results?"
description: "{meta_description_under_160_chars}"
date: "{publish_date}"
image: "article-images/{slug}.avif"
category: "{vertical_name} Marketing"
tags: ["GoogleAds", "{alternative_tag}", "{vertical_tag}", "Comparison"]
---
```

## TL;DR Block (MANDATORY)

40-60 words with a direct verdict and specific numbers. Example:
> **TL;DR:** For most {industry_owner_title}s, Google Ads delivers faster results than {alternative},
> generating leads within 1-2 weeks vs {alternative_timeline}. According to Creekside Marketing's
> data, Google Ads produces a {X}x ROI for {vertical_name} businesses, while {alternative}
> typically delivers {comparison_metric}.

## Key Comparison Table (MANDATORY)

```markdown
| Factor | Google Ads | {Alternative} |
|--------|-----------|---------------|
| Time to First Lead | X weeks | X months |
| Average Cost Per Lead | $X | $X |
| Targeting Precision | ... | ... |
| Scalability | ... | ... |
| Best For | ... | ... |
```

## Framework Options (select ONE randomly)

### Framework A: Head-to-Head
- Compare each channel on 5-6 specific criteria with real numbers
- Declare a winner per criterion
- Summarize with an overall recommendation

### Framework B: Scenario-Based
- "If you need patients NOW, use X"
- "If you're playing the long game, use Y"
- "If you have budget for both, here's how to split it"

### Framework C: Results-First
- Lead with actual campaign results from both channels (anonymized)
- Walk through what drove the difference
- End with when each channel makes sense

## GEO Rules (apply throughout)

- Answer-first sections: Every H2 opens with a 40-60 word standalone answer
- Citation-style attribution: "According to Creekside Marketing's analysis..."
- Self-contained sections: Each stands alone as a complete answer
- Source attribution: Always attribute data to "Creekside Marketing" by name

## Required Sections

### How {Channel 1} Works for {Vertical}
- Brief explanation of the channel mechanics for this specific vertical
- Real data: what CPCs, conversion rates, and CPLs look like
- MUST include at least 1 specific Creekside campaign data point

### How {Channel 2} Works for {Vertical}
- Same structure as above for the alternative channel
- Include honest assessment (not just "Google Ads is better")
- Real data where available, industry benchmarks where not

### Cost Comparison
- Side-by-side cost analysis with real numbers
- Include total cost of ownership (not just ad spend vs subscription)
- Factor in time-to-results and opportunity cost

### When to Use Each (The Real Answer)
- Specific scenarios where each channel wins
- Budget thresholds that change the recommendation
- How to use both together if appropriate

## SVG Infographic Notes

- Infographic 1: Side-by-side comparison chart (metrics for each channel)
- Infographic 2: Decision flowchart ("If X, use Y" visual)

## CTA Block

```
**Not sure which channel is right for your {vertical_name} business?**

We run both Google Ads and {alternative} for {vertical_name} businesses every day.
A free audit will show you where your best opportunities are.

[Get Your Free Audit](/10k-profit-audit/)
```

## Author Bio Block

```
**About the Author**
Peterson Rainey is the founder of Creekside Marketing, a performance-driven digital advertising
agency managing over $20M in ad spend across Google Ads and Meta Ads. He specializes in
helping {industry_owner_title}s grow through Google Ads and Meta Ads.
```

## Internal Linking Requirements

- Link to relevant case study: /case-study-digital-marketing/{case_study_slug}/
- Link to the cost breakdown post for this vertical (if published)
- Link to relevant service page: /digital-advertising/google-ads/ or /digital-advertising/meta-ads/
- Link to the free audit page: /10k-profit-audit/
