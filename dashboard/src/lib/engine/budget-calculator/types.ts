import type { Industry, BusinessType } from '../types';

export type RevenueTimeframe = 'monthly' | 'annual';
export type BudgetTier = 'conservative' | 'moderate' | 'aggressive';

export interface BudgetCalculatorInputs {
  revenueGoal: number;
  revenueTimeframe: RevenueTimeframe;
  industry: Industry;
  businessType: BusinessType;
  avgDealValue: number;
  conversionRate: number;
  targetGrowthRate: number;
  currentMonthlySpend: number;
}

export interface BudgetRecommendation {
  tier: BudgetTier;
  monthlyBudget: number;
  annualBudget: number;
  budgetAsPercentOfRevenue: number;
  expectedLeadsPerMonth: number;
  expectedCustomersPerMonth: number;
  expectedCpa: number;
  expectedRoas: number;
  monthsToBreakEven: number | null;
}

/** Allocation percentages (0-100, sum to 100) */
export interface BudgetBreakdown {
  search: number;
  social: number;
  retargeting: number;
  creative: number;
}

export interface SpendAssessment {
  status: 'underspending' | 'on-track' | 'overspending';
  gap: number;
  message: string;
}

export interface BudgetCalculatorResults {
  monthlyRevenueGoal: number;
  customersNeeded: number;
  leadsNeeded: number;
  recommendations: Record<BudgetTier, BudgetRecommendation>;
  industryAvgBudgetPercent: [number, number];
  industryBenchmarkCpa: [number, number];
  budgetBreakdown: BudgetBreakdown;
  spendAssessment: SpendAssessment | null;
  industryMinBudget: number;
}
