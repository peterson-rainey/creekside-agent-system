import type { BusinessType, Industry } from '@/lib/engine';
import type { RevenueTimeframe } from '@/lib/engine/budget-calculator';
import type { BudgetAction } from './budget-actions';

export interface BudgetState {
  revenueGoal: number;
  revenueTimeframe: RevenueTimeframe;
  industry: Industry;
  businessType: BusinessType;
  avgDealValue: number;
  conversionRate: number;
  targetGrowthRate: number;
  currentMonthlySpend: number;
}

export const initialBudgetState: BudgetState = {
  revenueGoal: 50000,
  revenueTimeframe: 'monthly',
  industry: 'other',
  businessType: 'service',
  avgDealValue: 500,
  conversionRate: 0.20,
  targetGrowthRate: 15,
  currentMonthlySpend: 0,
};

export function budgetReducer(state: BudgetState, action: BudgetAction): BudgetState {
  switch (action.type) {
    case 'SET_REVENUE_GOAL':
      return { ...state, revenueGoal: action.payload };
    case 'SET_REVENUE_TIMEFRAME':
      return { ...state, revenueTimeframe: action.payload };
    case 'SET_INDUSTRY':
      return { ...state, industry: action.payload };
    case 'SET_BUSINESS_TYPE':
      return { ...state, businessType: action.payload };
    case 'SET_DEAL_VALUE':
      return { ...state, avgDealValue: action.payload };
    case 'SET_CONVERSION_RATE':
      return { ...state, conversionRate: action.payload };
    case 'SET_GROWTH_RATE':
      return { ...state, targetGrowthRate: action.payload };
    case 'SET_CURRENT_SPEND':
      return { ...state, currentMonthlySpend: action.payload };
    case 'RESET':
      return initialBudgetState;
    default:
      return state;
  }
}
