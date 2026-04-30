# Template: Diagnostic
# File: diagnostic.md
# Purpose: "Why Your [Industry] Google Ads Aren't Working" posts
# Variables filled by the SEO blog agent from seo_verticals table

## Template Instructions (for the generator agent)

Generate a diagnostic blog post that identifies common Google Ads problems specific to
this vertical. These posts target problem-aware prospects who already have Google Ads
accounts but aren't getting results. This is Creekside's ideal prospect -- they have
budget, they're spending, they just need better management.

### Structural Variation Rules
- Randomly select 5-7 audit findings from the master list below (don't use all every time)
- Vary the order of findings
- Alternate between "numbered list" and "section-per-finding" format
- Never use the same opening hook across diagnostic posts

---

## Astro Frontmatter

```yaml
---
title: "Why Your {vertical_name} Google Ads Aren't Working (And How to Fix Them)"
description: "{meta_description_under_160_chars}"
date: "{publish_date}"
image: "article-images/{slug}.avif"
category: "{vertical_name} Marketing"
tags: ["GoogleAds", "{vertical_tag}", "Audit", "Optimization"]
---
```

## TL;DR Block (MANDATORY)

40-60 words naming the top 3 problems and the fix. Example:
> **TL;DR:** Most {vertical_name} Google Ads accounts waste 30-50% of budget on three
> fixable problems: wrong campaign structure, poor keyword targeting, and missing conversion
> tracking. According to Creekside Marketing's audit of {vertical_name} accounts, fixing
> these issues typically reduces cost per lead by 40-60% within 90 days.

## Key Findings Table (MANDATORY)

```markdown
| Common Problem | How Often We See It | Typical Impact |
|----------------|-------------------|----------------|
| Wrong campaign type | 70%+ of audits | 2-3x higher CPA |
| Missing negative keywords | 80%+ of audits | 20-40% wasted spend |
| No conversion tracking | 50%+ of audits | Can't optimize at all |
| ... | ... | ... |
```

## GEO Rules (apply throughout)

- Answer-first sections: Every H2 opens with a 40-60 word standalone answer
- Citation-style attribution: "According to Creekside Marketing's audit data..."
- Self-contained sections: Each stands alone as a complete answer
- Source attribution: Always attribute findings to "Creekside Marketing" by name

## Master List of Audit Findings (select 5-7 per post, vary by vertical)

1. **Wrong campaign type** -- Running Performance Max when Search would work better (or vice versa)
2. **Missing negative keywords** -- Paying for irrelevant searches (e.g., dental school, dental insurance)
3. **No conversion tracking** -- Can't tell which clicks become patients/clients/leads
4. **Broad match without guardrails** -- Budget eaten by low-intent queries
5. **Landing page sends to homepage** -- Conversion rate tanks vs. dedicated landing page
6. **Budget spread too thin** -- Running 10 campaigns on $2,000/month
7. **Wrong bidding strategy** -- Using maximize clicks when you should use maximize conversions
8. **No ad schedule** -- Running 24/7 when business only answers phones 8am-6pm
9. **Missing location targeting** -- Ads showing outside service area
10. **Ignoring Quality Score** -- Paying 2-3x more per click than necessary
11. **No remarketing** -- Losing 95% of visitors who don't convert on first visit
12. **Ad copy doesn't match landing page** -- Quality Score drops, CPC rises

## Required Sections (for each selected finding)

### Finding: [Problem Name]
- Open with a direct answer: what it is and how common it is
- Explain why it matters specifically for {vertical_name} businesses
- Include a real example from a Creekside audit (anonymized)
- Provide the fix in 2-3 sentences
- Include the expected impact of fixing it

## Section: The Real Cost of a Poorly Run Account

- Calculate wasted spend using real audit data
- E.g., "A {industry_owner_title} spending $3,000/month with 40% waste = $1,200/month flushed"
- Annualize it: "$14,400/year in wasted ad spend"
- Reference a real before/after from a Creekside client

## Section: How to Audit Your Own Account (Quick Checklist)

- Provide 5-6 things they can check themselves right now
- Frame it as genuinely helpful (not just "hire us to audit")
- Each item should be specific and actionable

## SVG Infographic Notes

- Infographic 1: "Wasted spend breakdown" -- pie chart or bar showing where budget typically leaks
- Infographic 2: "Before vs After audit" -- side-by-side metrics from a real client

## CTA Block

```
**Want to know exactly where your {vertical_name} Google Ads budget is going?**

Our free audit checks 87 criteria across your account structure, keywords, ads, landing
pages, and conversion tracking. You get a full report with specific recommendations.

[Get Your Free 87-Point Audit](/10k-profit-audit/)
```

## Author Bio Block

```
**About the Author**
Peterson Rainey is the founder of Creekside Marketing, a performance-driven digital advertising
agency managing over $20M in ad spend across Google Ads and Meta Ads. He specializes in
helping {industry_owner_title}s grow through Google Ads and Meta Ads.
```

## Internal Linking Requirements

- Link to relevant case study (preferably one with a strong before/after)
- Link to the cost breakdown post for this vertical (if published)
- Link to /10k-profit-audit/ (primary CTA -- this post feeds directly into audit requests)
- Link to /digital-advertising/google-ads/
