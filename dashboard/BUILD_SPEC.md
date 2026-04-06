## ROAS Calculator & Predictor — Build Spec (Session Handoff)

### Status: Phase 1 Ready to Build
- Next.js project scaffolded at `/Users/petersonrainey/creekside-roas-calculator/` but npm install FAILED due to root-owned directories in ~/.npm/_cacache
- **FIRST STEP next session:** Run `sudo chown -R $(whoami) ~/.npm` then `cd ~/creekside-roas-calculator && npm install`
- If that directory is incomplete, delete it and re-run: `npx create-next-app@latest creekside-roas-calculator --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm`

### What This Tool Is
A comprehensive ROAS Calculator & Predictor web app — the first free tool that:
1. Supports BOTH product and service businesses
2. Auto-populates real industry benchmarks from Creekside client data
3. Includes AI-powered insights (Claude API)
4. Has 3-scenario modeling (Conservative/Base/Optimistic)
5. Offers 5 ad spend models (Uniform/Ramp/Front-load/Seasonal/Pilot) + custom builder
6. Shows Revenue Forecast Envelope (low/bench/high projection bands)
7. Calculates: ROAS, CAC, LTV, LTV:CAC ratio, break-even month, net profit, cumulative customers

### Design Reference
- Dark theme dashboard aesthetic inspired by "Meridian" tool
- Screenshots saved locally: `/Users/petersonrainey/Downloads/Screenshot 2026-03-24 at 9.26.07 AM.png` through `9.28.04 AM.png` (5 screenshots)
- White-label reference: https://color-derby-71264204.figma.site/
- 7 tabs: ROAS Projections, CAC vs LTV, Profit Analysis, Volume & Growth, Insights, Cost Breakdown, Variance Tracking
- Left sidebar inputs, right side dashboard output
- Top KPI bar: Projected Revenue, Net Profit, Total Ad Spend, Total Cost, Avg CAC, Est. LTV, Break-even Month, LTV:CAC

### Tech Stack
- **Frontend:** Next.js + React + Tailwind CSS (dark theme)
- **Charts:** Recharts (not Chart.js — better React integration, native envelope chart support)
- **State:** React Context + useReducer (no external library needed)
- **AI:** Claude API (Haiku for speed) — Insights tab only
- **Database:** Supabase (existing project suhnpazajrmfcmbwckkx) — roas_leads + roas_calculations tables
- **Hosting:** Railway (separate service)
- **PDF Export:** Puppeteer or react-pdf (Phase 4)

### Industry Benchmarks to Hardcode (from real Creekside client data)
1. **Dental/Medical:** CPC $2.50-$8.00, CPA $10-$50, benchmark ROAS 5.0x, LOW RISK
2. **Home Services:** CPA $50-$160, benchmark ROAS 3-4x, MED RISK (Landmark 298% ROI, LawnValue 2K+ leads)
3. **Ecommerce:** ROAS floor 2.0x, sustainable 4.0x+, MED RISK
4. **Legal:** Cost per case ~$1,200, Google dominates Meta, MED RISK
5. **Mortgage/Financial:** CPL $38-$82, HIGH RISK (South River $10K-$80K/mo)
6. **Med Spa:** CPA ~$132, MED RISK (Advanced Med Spa 2x conversion rate)
7. **SaaS/B2B:** Benchmark ROAS 1.5-2x, HIGH RISK (ReferPro doubled ARR)
8. **Meal Prep/Food:** ROAS 13-14x home market, LOW RISK
9. **Other:** Manual entry

### Product Mode Inputs
Price, COGS, AOV, Estimated LTV, Gross Margin (auto-calc)

### Service Mode Inputs
Avg Contract Value, Close Rate from Lead, Client Retention (months), Monthly Recurring Value

### Key Calculation Logic
- Spend models generate monthly allocation array from total budget
- Each month: revenue = adSpend × ROAS (low/bench/high per phase)
- Phases auto-generated from duration (3mo=1 phase, 12mo=3 phases, 24mo=4 phases)
- Phase labels: Pilot → Scale → Optimize (→ Scale for 24mo)
- CAC = adSpend / customers acquired
- LTV scenarios: Conservative 0.7x, Base 1.0x, Optimistic 1.4x
- Break-even = first month where cumulative profit > 0

### File Structure (Planned)
```
creekside-roas-calculator/
├── src/
│   ├── app/
│   │   ├── layout.tsx, globals.css, page.tsx (landing)
│   │   ├── calculator/page.tsx (main calculator)
│   │   └── api/leads/route.ts
│   ├── components/
│   │   ├── ui/ (KpiCard, ToggleGroup, SliderInput, NumberInput, etc.)
│   │   ├── inputs/ (IndustrySelector, BusinessTypeToggle, ProductInputs, ServiceInputs, ForecastDuration, AdSpendPlan, RoasAssumptions, LtvVariants)
│   │   ├── dashboard/ (KpiBar, RevenueForecastChart, MonthlyProjectionsTable, CacVsLtvChart, CustomerGrowthChart, CumulativeBaseChart)
│   │   └── lead-capture/LeadCaptureModal.tsx
│   ├── lib/
│   │   ├── engine/ (types.ts, benchmarks.ts, spend-models.ts, roas-calculator.ts, ltv-calculator.ts, customer-model.ts, scenario-engine.ts, index.ts)
│   │   ├── context/ (calculator-context.tsx, calculator-reducer.ts, calculator-actions.ts)
│   │   └── utils/ (formatters.ts, csv-export.ts, validators.ts)
│   └── hooks/ (useCalculator.ts, useDerivedMetrics.ts)
```

### Build Phases
- **Phase 1:** Core calculator engine + inputs + KPI bar + monthly table + forecast chart
- **Phase 2:** All visualizations (CAC vs LTV, customer growth, cumulative base)
- **Phase 3:** Spend model builder, LTV variants, phase labels, CSV export
- **Phase 4:** AI insights (Claude API), email gate, PDF export, Supabase storage
- **Phase 5:** Polish, mobile responsive, Creekside branding, Railway deploy

### Lead Capture Strategy
- Basic results visible free
- Full report (all 7 tabs + AI insights + PDF) gated behind email
- Data stored in Supabase roas_leads table
- CTA: "Want help hitting these numbers? Book a free strategy call with Creekside"

### Auto-Benchmark Feature
When user selects industry, auto-populate: CPC range, CPA range, benchmark ROAS, risk level, recommended budget minimums. Pre-fills ROAS assumptions with industry benchmark as "bench" value.

### Other Tools in the Suite (Future — NOT this build)
2. Google Ads Account Health Grader
3. Meta Ads Account Health Grader
4. Landing Page Grader (with Google PageSpeed API)
5. Negative Keyword Auto-Builder (search terms CSV upload → AI analysis)
6. "What Should My Ad Spend Be?" Calculator
7. "What to Look for Before Hiring a PPC Agency" (interactive checklist)

### Source Assets in Google Drive
- $10K Profit Recovery Audit: https://docs.google.com/spreadsheets/d/1xgNpzNtwPkW5oYDI3Vc0eRFzW2YiGSuN1W7Z7KZ1-ns/edit (81-criteria Facebook audit, gdrive_marketing 3afc3c3e)
- Account Audit Scorecard: https://docs.google.com/spreadsheets/d/19s3Bo6No7gGuBQWS_AzYtG4xTmSYlLHzK-SrLkDpRW8/edit (273 rows, 7 tabs, gdrive_operations 128a82bc)
- Facebook Ads Audit xlsx: gdrive_marketing 71ab7433
- Google Ads Audit xlsx: gdrive_marketing 36361917

### Competitive Research Summary
- Reviewed 22 ROAS calculators — none combine LTV + scenarios + service business support + AI
- Top competitors: Scenarical (best scenarios), GrowthOptix (best projections), breakevenroas.org (best hidden cost inclusion)
- Interactive tools convert 2.4x higher than PDFs (30-50% for quizzes vs 3-5% for PDFs)
- Agencies using audit tools as lead magnets report 80% close rates
- WordStream's Google Ads Grader was their #1 lead source for years
- HubSpot Website Grader generated "millions of dollars of revenue"

### Dark Theme Design System
```css
:root {
  --bg-primary: #0B0F1A;
  --bg-secondary: #111827;
  --bg-tertiary: #1F2937;
  --border: #374151;
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  --accent: #14B8A6;
  --accent-light: #2DD4BF;
  --accent-glow: rgba(20,184,166,0.15);
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --chart-low: #EF4444;
  --chart-bench: #14B8A6;
  --chart-high: #10B981;
  --chart-fill: rgba(20,184,166,0.08);
}
```

### Detailed Architecture Notes
- **Reactive calculation:** Pure function engine (no side effects). User input → dispatch to reducer → useMemo calls engine → components re-render. Sub-millisecond computation.
- **No SSR for calculator page:** 'use client' top-level. Only server interaction is /api/leads POST.
- **Phase auto-generation:** 3mo=1 phase, 6mo=2 phases, 12mo=3 phases, 18mo=3 phases, 24mo=4 phases.
- **Two-column layout:** Input panel ~380px fixed left, output panel filling remainder. Stacks vertically on mobile with collapsible accordion for inputs.
- **Spend model functions:** Each returns number[] (spend per month). Uniform=equal, Ramp=40%→160%, Front-load=160%→40%, Seasonal=bell curve, Pilot=20% first 2mo then uniform.
