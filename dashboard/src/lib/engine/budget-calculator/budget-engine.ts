import type {
  BudgetCalculatorInputs,
  BudgetCalculatorResults,
  BudgetRecommendation,
  BudgetBreakdown,
  BudgetTier,
  SpendAssessment,
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
  };
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
