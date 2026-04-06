import type { BusinessType, Industry } from '@/lib/engine';
import type { RevenueTimeframe } from '@/lib/engine/budget-calculator';

export type BudgetAction =
  | { type: 'SET_REVENUE_GOAL'; payload: number }
  | { type: 'SET_REVENUE_TIMEFRAME'; payload: RevenueTimeframe }
  | { type: 'SET_INDUSTRY'; payload: Industry }
  | { type: 'SET_BUSINESS_TYPE'; payload: BusinessType }
  | { type: 'SET_DEAL_VALUE'; payload: number }
  | { type: 'SET_CONVERSION_RATE'; payload: number }
  | { type: 'SET_GROWTH_RATE'; payload: number }
  | { type: 'SET_CURRENT_SPEND'; payload: number }
  | { type: 'RESET' };
