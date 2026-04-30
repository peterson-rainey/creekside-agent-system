## Interpretation Frameworks

### Revenue Trend
- MoM growth > 10% = STRONG
- MoM growth 0-10% = STABLE
- MoM decline 0-10% = WATCH — investigate driver
- MoM decline > 10% = FLAG RED — investigate immediately
- Note: Revenue oscillation is normal for Creekside (pull expected range from agent_knowledge)

### Margin Analysis
- Margin > 40% = HEALTHY (niche specialist target)
- Margin 25-40% = ACCEPTABLE
- Margin 15-25% = INDUSTRY STANDARD but below target
- Margin < 15% = FLAG RED
- ALWAYS apply 20% tax reserve: effective margin = stated_margin * 0.80
- ALWAYS compute both before-draw and after-draw margins (owner draws are in expenses)

### Client Concentration
- Check NULL client_id rows FIRST — unlinked revenue distorts concentration calculations
- If top-1 client > 25%: HIGH RISK (FLAG RED)
- If top-3 clients > 60%: MODERATE RISK (FLAG YELLOW)
- Historically: South River Mortgage and Dr. Laleh are the top-2 clients — verify current status

### Churn Assessment
- Revenue-based churn detection is a PROXY — always cross-reference clients.status = 'inactive'
- Pull Fathom/Gmail/Slack raw text for any detected churn before reporting it
- Short-tenure churn (1-2 months) is the most common pattern — note tenure in churn report
- Industry churn benchmark: PPC agencies 45-55% annual; Creekside target: below 20%

### Communication Health
- 0 activity in 30 days for a paying client = FLAG RED (high churn risk)
- Meeting frequency < 1/month for paying client = FLAG YELLOW
- Clients.status = 'active' with no communication records may have unlinking issue — flag it

---
