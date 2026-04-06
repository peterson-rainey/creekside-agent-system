'use client';

import { BudgetProvider, useBudgetCalculator } from '@/lib/context/budget-context';
import { BudgetInputPanel } from '@/components/budget-calculator/BudgetInputPanel';
import { BudgetResultsPanel } from '@/components/budget-calculator/BudgetResultsPanel';
import { ToolModeToggle } from '@/components/ai-interview/ToolModeToggle';

function BudgetCalculatorInner() {
  const { state, results } = useBudgetCalculator();

  const toolContext = results ? {
    industry: state.industry,
    businessType: state.businessType,
    revenueGoal: state.revenueGoal,
    revenueTimeframe: state.revenueTimeframe,
    avgDealValue: state.avgDealValue,
    conversionRate: state.conversionRate,
    currentMonthlySpend: state.currentMonthlySpend,
    recommendedBudget: results.recommendations.moderate.monthlyBudget,
    expectedCpa: results.recommendations.moderate.expectedCpa,
    leadsNeeded: results.leadsNeeded,
  } : undefined;

  return (
    <ToolModeToggle
      tool="ad-budget-calculator"
      toolLabel="budget recommendation"
      toolContext={toolContext}
    >
      <div className="flex flex-col lg:flex-row flex-1 bg-[var(--bg-primary)]">
        <BudgetInputPanel />
        <BudgetResultsPanel />
      </div>
    </ToolModeToggle>
  );
}

export default function AdBudgetCalculatorPage() {
  return (
    <BudgetProvider>
      <BudgetCalculatorInner />
    </BudgetProvider>
  );
}
