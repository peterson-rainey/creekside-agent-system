import type {
  BudgetCalculatorInputs,
  BudgetCalculatorResults,
  BudgetRecommendation,
  BudgetBreakdown,
  BudgetTier,
  SpendAssessment,
  PlatformSplit,
  BudgetLimitation,
  SpendLevelRow,
} from './types';
import { INDUSTRY_BENCHMARKS } from '../benchmarks';
import { BUDGET_BENCHMARKS } from './budget-benchmarks';

export function calculateBudget(inputs: BudgetCalculatorInputs): BudgetCalculatorResults {
  const {
    revenueGoal,
    revenueTimeframe,
    industry,
    businessType,
    avgDealValue,
    conversionRate,
    targetGrowthRate,
    currentMonthlySpend,
  } = inputs;

  const industryBench = INDUSTRY_BENCHMARKS[industry];
  const budgetBench = BUDGET_BENCHMARKS[industry];

  // Normalize to monthly revenue
  const monthlyRevenueGoal = revenueTimeframe === 'annual' ? revenueGoal / 12 : revenueGoal;

  // How many customers needed per month
  const customersNeeded = Math.ceil(monthlyRevenueGoal / Math.max(avgDealValue, 1));

  // How many leads needed (accounting for conversion rate)
  const effectiveConversion = Math.max(conversionRate, 0.01);
  const leadsNeeded = Math.ceil(customersNeeded / effectiveConversion);

  // CPA range from industry benchmarks
  const [cpaLow, cpaHigh] = industryBench.cpaRange;
  const cpaMid = (cpaLow + cpaHigh) / 2;

  // Growth premium: scale aggressive tier by growth target
  const growthMultiplier = 1 + (targetGrowthRate / 100) * 0.5;

  // Calculate the three tiers
  const tiers: Record<BudgetTier, BudgetRecommendation> = {
    conservative: buildTier('conservative', leadsNeeded, cpaLow, monthlyRevenueGoal, avgDealValue, effectiveConversion),
    moderate: buildTier('moderate', leadsNeeded, cpaMid, monthlyRevenueGoal, avgDealValue, effectiveConversion),
    aggressive: buildTier('aggressive', leadsNeeded, cpaHigh * growthMultiplier, monthlyRevenueGoal, avgDealValue, effectiveConversion),
  };

  // Enforce minimum budget from industry benchmarks
  // For aggressive tier, apply growth multiplier to the floor too
  const tierFloors: Record<BudgetTier, number> = {
    conservative: industryBench.recommendedMinBudget,
    moderate: industryBench.recommendedMinBudget,
    aggressive: Math.round(industryBench.recommendedMinBudget * growthMultiplier),
  };
  for (const tier of Object.values(tiers)) {
    const floor = tierFloors[tier.tier];
    if (tier.monthlyBudget < floor) {
      tier.monthlyBudget = floor;
      tier.annualBudget = tier.monthlyBudget * 12;
      tier.budgetAsPercentOfRevenue = monthlyRevenueGoal > 0
        ? (tier.monthlyBudget / monthlyRevenueGoal) * 100
        : 0;
    }
  }

  // Budget breakdown by business type
  const budgetBreakdown: BudgetBreakdown = businessType === 'product'
    ? { search: 40, social: 30, retargeting: 20, creative: 10 }
    : { search: 50, social: 20, retargeting: 15, creative: 15 };

  // Current spend assessment
  let spendAssessment: SpendAssessment | null = null;
  if (currentMonthlySpend > 0) {
    const moderateBudget = tiers.moderate.monthlyBudget;
    const gap = currentMonthlySpend - moderateBudget;
    const ratio = currentMonthlySpend / moderateBudget;

    if (ratio < 0.7) {
      spendAssessment = {
        status: 'underspending',
        gap: Math.abs(gap),
        message: `You're spending ${Math.round((1 - ratio) * 100)}% less than recommended. Increasing your budget could unlock significant growth.`,
      };
    } else if (ratio > 1.3) {
      spendAssessment = {
        status: 'overspending',
        gap: Math.abs(gap),
        message: `You're spending ${Math.round((ratio - 1) * 100)}% more than needed for your revenue goal. Consider optimizing before scaling further.`,
      };
    } else {
      spendAssessment = {
        status: 'on-track',
        gap: Math.abs(gap),
        message: 'Your current spend is in a healthy range for your revenue goal. Focus on optimizing performance.',
      };
    }
  }

  // Platform split recommendation based on business type and industry
  const platformSplit = getPlatformSplit(businessType, industry);

  // Budget limitations based on the recommended (moderate) tier
  const budgetLimitations = getBudgetLimitations(tiers.moderate.monthlyBudget, industryBench.recommendedMinBudget, businessType);

  // "What you get at each spend level" table
  const spendLevelTable = buildSpendLevelTable(
    cpaMid, effectiveConversion, avgDealValue, currentMonthlySpend,
    tiers.conservative.monthlyBudget, tiers.moderate.monthlyBudget, tiers.aggressive.monthlyBudget,
    industryBench.recommendedMinBudget,
  );

  // Cost per lead vs cost per customer (the distinction prospects ask about)
  const costPerLead = Math.round(cpaMid);
  const costPerCustomer = effectiveConversion > 0 ? Math.round(cpaMid / effectiveConversion) : 0;

  return {
    monthlyRevenueGoal,
    customersNeeded,
    leadsNeeded,
    recommendations: tiers,
    industryAvgBudgetPercent: budgetBench.avgBudgetAsPercentOfRevenue,
    industryBenchmarkCpa: industryBench.cpaRange,
    budgetBreakdown,
    spendAssessment,
    industryMinBudget: industryBench.recommendedMinBudget,
    platformSplit,
    budgetLimitations,
    spendLevelTable,
    costPerLead,
    costPerCustomer,
  };
}

function getPlatformSplit(businessType: string, industry: string): PlatformSplit {
  // Service businesses: search-heavy (high intent captures)
  // Product/ecommerce: more social (discovery + impulse)
  // Specific industries get tailored splits
  if (industry === 'ecommerce' || industry === 'meal_prep_food') {
    return { google: 35, meta: 55, other: 10, rationale: 'Product-based businesses benefit from Meta\'s visual discovery. Allocate more to social for prospecting, with Google capturing high-intent searches.' };
  }
  if (industry === 'saas_b2b') {
    return { google: 60, meta: 20, other: 20, rationale: 'B2B buyers search with high intent. Prioritize Google Search, supplement with LinkedIn (other), and use Meta for retargeting.' };
  }
  if (industry === 'legal' || industry === 'mortgage_financial') {
    return { google: 70, meta: 20, other: 10, rationale: 'High-intent verticals where people actively search for help. Google captures the majority of ready-to-act prospects.' };
  }
  if (industry === 'med_spa') {
    return { google: 40, meta: 50, other: 10, rationale: 'Aesthetics is highly visual. Meta excels at before/after creative and local targeting. Google captures "near me" searches.' };
  }
  if (businessType === 'service') {
    return { google: 60, meta: 30, other: 10, rationale: 'Service businesses should prioritize Google Search to capture people actively looking for help, with Meta for awareness and retargeting.' };
  }
  return { google: 45, meta: 45, other: 10, rationale: 'A balanced split lets you test both platforms and shift budget toward whichever performs better for your business.' };
}

function getBudgetLimitations(monthlyBudget: number, industryMin: number, businessType: string): BudgetLimitation[] {
  const dailyBudget = monthlyBudget / 30;
  const limitations: BudgetLimitation[] = [];

  if (monthlyBudget < 1500) {
    limitations.push({
      icon: 'block',
      text: 'At this budget, you likely can\'t run ads profitably. Most platforms need $50+/day to exit the learning phase and optimize delivery.',
    });
  } else if (dailyBudget < 50) {
    limitations.push({
      icon: 'warning',
      text: `Your daily budget of ${Math.round(dailyBudget)}/day is below the $50/day threshold where Google Ads can fully optimize. Expect a longer learning phase.`,
    });
  }

  if (monthlyBudget < 3000) {
    limitations.push({
      icon: 'warning',
      text: 'Limited to one platform. Running Google AND Meta requires enough budget for each platform to gather data independently.',
    });
  }

  if (monthlyBudget < 5000) {
    limitations.push({
      icon: 'info',
      text: 'A/B testing will be limited. You won\'t have enough traffic to split between ad variations and get statistically significant results quickly.',
    });
  } else {
    limitations.push({
      icon: 'info',
      text: 'You have enough budget to run A/B tests on ad copy, landing pages, and audiences — use this to continuously improve performance.',
    });
  }

  if (monthlyBudget < industryMin) {
    limitations.push({
      icon: 'block',
      text: `Below the ${formatBudgetCurrency(industryMin)}/mo industry minimum. Competitors are outbidding you, which means fewer impressions and higher costs per click.`,
    });
  }

  if (businessType === 'service' && monthlyBudget >= 3000) {
    limitations.push({
      icon: 'info',
      text: 'At this level, make sure you have call tracking and a CRM in place. Without tracking, you can\'t tell which leads came from ads vs. organic.',
    });
  }

  return limitations;
}

function buildSpendLevelTable(
  cpaMid: number, conversionRate: number, avgDealValue: number,
  currentSpend: number, conservativeBudget: number, moderateBudget: number, aggressiveBudget: number,
  industryMin: number,
): SpendLevelRow[] {
  const levels: SpendLevelRow[] = [];

  // Helper to build a row
  const makeRow = (label: string, budget: number, isCurrentSpend = false, isRecommended = false): SpendLevelRow => {
    const leads = budget > 0 ? Math.round(budget / cpaMid) : 0;
    const customers = Math.round(leads * conversionRate);
    const costPerCust = customers > 0 ? Math.round(budget / customers) : 0;
    return { label, monthlyBudget: budget, dailyBudget: Math.round(budget / 30), expectedLeads: leads, expectedCustomers: customers, costPerCustomer: costPerCust, isCurrentSpend, isRecommended };
  };

  // Add current spend if provided
  if (currentSpend > 0) {
    levels.push(makeRow('Your Current Spend', currentSpend, true));
  }

  // Industry minimum
  if (industryMin < conservativeBudget * 0.9) {
    levels.push(makeRow('Industry Minimum', industryMin));
  }

  levels.push(makeRow('Conservative', conservativeBudget));
  levels.push(makeRow('Recommended', moderateBudget, false, true));
  levels.push(makeRow('Aggressive', aggressiveBudget));

  // Add a "2x Recommended" row to show scaling potential
  levels.push(makeRow('Scale Mode (2x)', moderateBudget * 2));

  return levels;
}

function formatBudgetCurrency(n: number): string {
  if (n >= 10000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function buildTier(
  tier: BudgetTier,
  leadsNeeded: number,
  cpa: number,
  monthlyRevenue: number,
  avgDealValue: number,
  conversionRate: number,
): BudgetRecommendation {
  const monthlyBudget = Math.round(leadsNeeded * cpa);
  const annualBudget = monthlyBudget * 12;
  const budgetAsPercentOfRevenue = monthlyRevenue > 0
    ? (monthlyBudget / monthlyRevenue) * 100
    : 0;

  // Leads this budget can buy at this CPA, then convert to customers
  const expectedLeads = monthlyBudget > 0 ? Math.round(monthlyBudget / cpa) : 0;
  const expectedCustomersPerMonth = Math.round(expectedLeads * conversionRate);

  const expectedRevenue = expectedCustomersPerMonth * avgDealValue;
  const expectedRoas = monthlyBudget > 0 ? expectedRevenue / monthlyBudget : 0;

  // Simplified break-even: months of spend before cumulative revenue covers cumulative cost
  let monthsToBreakEven: number | null = null;
  if (expectedRoas >= 1) {
    monthsToBreakEven = 1;
  } else if (expectedRoas > 0) {
    monthsToBreakEven = Math.min(Math.ceil(1 / expectedRoas), 24);
  }

  return {
    tier,
    monthlyBudget,
    annualBudget,
    budgetAsPercentOfRevenue,
    expectedLeadsPerMonth: expectedLeads,
    expectedCustomersPerMonth,
    expectedCpa: Math.round(cpa),
    expectedRoas: Math.round(expectedRoas * 10) / 10,
    monthsToBreakEven,
  };
}
