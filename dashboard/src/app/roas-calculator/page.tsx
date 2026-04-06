'use client';

import { CalculatorProvider } from '@/lib/context/calculator-context';
import { InputPanel } from '@/components/inputs/InputPanel';
import { DashboardPanel } from '@/components/dashboard/DashboardPanel';

export default function CalculatorPage() {
  return (
    <CalculatorProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--bg-primary)]">
        <InputPanel />
        <DashboardPanel />
      </div>
    </CalculatorProvider>
  );
}
