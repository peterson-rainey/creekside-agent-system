'use client';

import { BudgetProvider } from '@/lib/context/budget-context';
import { BudgetInputPanel } from '@/components/budget-calculator/BudgetInputPanel';
import { BudgetResultsPanel } from '@/components/budget-calculator/BudgetResultsPanel';

export default function AdBudgetCalculatorPage() {
  return (
    <BudgetProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--bg-primary)]">
        <BudgetInputPanel />
        <BudgetResultsPanel />
      </div>
    </BudgetProvider>
  );
}
