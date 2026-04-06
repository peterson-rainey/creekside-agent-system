'use client';

import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';
import { calculateBudget } from '@/lib/engine/budget-calculator';
import type { BudgetCalculatorResults } from '@/lib/engine/budget-calculator';
import { budgetReducer, initialBudgetState, type BudgetState } from './budget-reducer';
import type { BudgetAction } from './budget-actions';

interface BudgetContextValue {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetAction>;
  results: BudgetCalculatorResults | null;
}

const BudgetContext = createContext<BudgetContextValue | null>(null);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(budgetReducer, initialBudgetState);

  const results = useMemo(() => {
    try {
      return calculateBudget({
        revenueGoal: state.revenueGoal,
        revenueTimeframe: state.revenueTimeframe,
        industry: state.industry,
        businessType: state.businessType,
        avgDealValue: state.avgDealValue,
        conversionRate: state.conversionRate,
        targetGrowthRate: state.targetGrowthRate,
        currentMonthlySpend: state.currentMonthlySpend,
      });
    } catch {
      return null;
    }
  }, [state]);

  return (
    <BudgetContext.Provider value={{ state, dispatch, results }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgetCalculator(): BudgetContextValue {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudgetCalculator must be used within BudgetProvider');
  return ctx;
}
