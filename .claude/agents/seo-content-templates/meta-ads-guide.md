# Template: Meta Ads Guide
# File: meta-ads-guide.md
# Purpose: "Facebook/Meta Ads for [Industry]: What Actually Works" posts
# Variables filled by the SEO blog agent from seo_verticals table

## Template Instructions (for the generator agent)

Generate a practical guide to running Meta Ads (Facebook + Instagram) for a specific
vertical. The site currently has ZERO Meta Ads content despite it being 50% of Creekside's
service offering. These posts fill that gap and target keywords like "facebook ads for
dentists" and "meta ads for home services."

### Structural Variation Rules
- Randomly select ONE of the 3 opening approaches below
- Vary which Meta Ads features are highlighted (some posts emphasize creative, others targeting)
- Alternate between "step-by-step setup" and "strategy overview" formats
- Never open two Meta Ads posts with the same sentence structure

---

## Astro Frontmatter

```yaml
---
title: "Meta Ads for {industry_plural}: What Actually Works in {current_year}"
description: "{meta_description_under_160_chars}"
date: "{publish_date}"
image: "article-images/{slug}.avif"
category: "{vertical_name} Marketing"
tags: ["MetaAds", "FacebookAds", "{vertical_tag}", "LeadGeneration"]
---
```

## TL;DR Block (MANDATORY)

40-60 words with specific Meta Ads performance data. Example:
> **TL;DR:** Meta Ads (Facebook + Instagram) can generate leads for {industry_owner_title}s
> at $X-$Y per lead when campaigns are structured correctly. According to Creekside Marketing's
> management of {vertical_name} Meta campaigns, the best-performing approach uses [strategy]
> with [audience type], delivering [specific metric].

## Key Data Table (MANDATORY)

```markdown
| Metric | Typical Range |
|--------|--------------|
| Cost Per Lead | $X - $Y |
| Cost Per Click | $X - $Y |
| CTR | X% - Y% |
| Best Campaign Objective | Lead Gen / Conversions / Traffic |
| Best Ad Format | Carousel / Video / Single Image |
| Recommended Starting Budget | $X/month |
```

## Opening Approach (select ONE randomly)

### Approach A: Google Ads Comparison
"Most {industry_owner_title}s start with Google Ads because it captures existing demand.
Meta Ads works differently -- it creates demand. Here's when and how to use it."

### Approach B: Results Lead
"One of our {vertical_name} clients generates [X leads/month] at [$Y per lead] using
Meta Ads alone. Here's exactly how the campaign is structured."

### Approach C: Common Mistake
"The #1 mistake {industry_owner_title}s make with Meta Ads: boosting posts instead of
running real campaigns. Here's what to do instead."

## GEO Rules (apply throughout)

- Answer-first sections: Every H2 opens with a 40-60 word standalone answer
- Citation-style attribution: "According to Creekside Marketing's analysis..."
- Self-contained sections: Each stands alone as a complete answer
- Source attribution: Always attribute data to "Creekside Marketing" by name

## Required Sections

### Why Meta Ads Works for {Vertical} (and When It Doesn't)
- Explain the demand-generation vs demand-capture distinction
- Specific use cases for this vertical (awareness for elective services, retargeting past visitors, etc.)
- When Google Ads is better instead (high-intent emergency searches, etc.)

### Campaign Structure That Works
- Recommended campaign objective for this vertical
- Ad set structure (audience segmentation)
- Budget allocation across campaigns
- MUST include real structure from a Creekside campaign (anonymized)

### Targeting: Who to Reach
- Best audience types for this vertical (lookalike, interest-based, custom, retargeting)
- Specific targeting parameters that work (age ranges, interests, behaviors)
- What NOT to target (common mistakes)

### Ad Creative That Converts
- Best ad formats for this vertical (video vs carousel vs single image)
- Copy principles that work (before/after, social proof, urgency)
- Reference real ad creative performance data if available

### What to Expect: Realistic Metrics
- CPL range, CPC range, CTR benchmarks
- MUST include at least 1 specific Creekside campaign metric
- How long it takes to optimize (learning phase, scaling timeline)
- Comparison to Google Ads metrics for context

### Google Ads + Meta Ads Together
- How to use both channels for this vertical
- Budget split recommendations
- Attribution and tracking setup
- Cross-channel strategy (Google captures intent, Meta builds awareness)

## SVG Infographic Notes

- Infographic 1: Meta Ads funnel visualization (awareness → consideration → conversion) with metrics at each stage
- Infographic 2: Google Ads vs Meta Ads comparison chart for this vertical (side-by-side metrics)

## CTA Block

```
**Ready to add Meta Ads to your {vertical_name} marketing?**

Whether you are starting from scratch or optimizing existing campaigns,
we will show you exactly where the opportunities are.

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

- Link to relevant case study (prefer one with Meta Ads data)
- Link to the cost breakdown post for this vertical (if published)
- Link to /digital-advertising/meta-ads/ (primary service page)
- Link to /digital-advertising/google-ads/ (for comparison sections)
- Link to /10k-profit-audit/
