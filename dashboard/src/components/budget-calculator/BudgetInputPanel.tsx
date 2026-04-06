'use client';

import { useState } from 'react';
import { useBudgetCalculator } from '@/lib/context/budget-context';
import { INDUSTRY_BENCHMARKS } from '@/lib/engine';
import { BUDGET_BENCHMARKS } from '@/lib/engine/budget-calculator';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { SliderInput } from '@/components/ui/SliderInput';
import { ToggleGroup } from '@/components/ui/ToggleGroup';
import { formatCurrency } from '@/lib/utils/formatters';
import type { Industry } from '@/lib/engine';

const industryOptions = Object.entries(INDUSTRY_BENCHMARKS).map(([value, bench]) => ({
  value,
  label: bench.label,
}));

export function BudgetInputPanel() {
  const { state, dispatch } = useBudgetCalculator();
  const benchmark = INDUSTRY_BENCHMARKS[state.industry];
  const budgetBench = BUDGET_BENCHMARKS[state.industry];
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full lg:w-[380px] shrink-0 bg-[var(--bg-secondary)] border-b lg:border-b-0 lg:border-r border-[var(--border)] lg:h-screen overflow-y-auto">
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <h2 className="text-[var(--text-primary)] text-lg font-semibold mb-1">
            Budget Inputs
          </h2>
          <p className="text-[var(--text-muted)] text-xs">
            Tell us about your business and we'll recommend the right ad spend
          </p>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[var(--accent)] bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg"
        >
          {collapsed ? 'Show' : 'Hide'}
          <svg
            className={`w-3.5 h-3.5 transition-transform ${collapsed ? '' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div
        className={`p-6 pt-4 space-y-6 transition-all overflow-hidden ${
          collapsed ? 'max-h-0 p-0 lg:max-h-none lg:p-6 lg:pt-4' : 'max-h-[2000px]'
        }`}
      >
        {/* Revenue Goal */}
        <section>
          <ToggleGroup
            options={[
              { value: 'monthly', label: 'Monthly Goal' },
              { value: 'annual', label: 'Annual Goal' },
            ]}
            value={state.revenueTimeframe}
            onChange={(v) => dispatch({ type: 'SET_REVENUE_TIMEFRAME', payload: v as 'monthly' | 'annual' })}
          />
          <NumberInput
            label={state.revenueTimeframe === 'monthly' ? 'Monthly Revenue Goal' : 'Annual Revenue Goal'}
            value={state.revenueGoal}
            onChange={(v) => dispatch({ type: 'SET_REVENUE_GOAL', payload: v })}
            min={0}
            step={1000}
            prefix="$"
          />
        </section>

        {/* Industry + Business Type */}
        <section>
          <SelectInput
            label="Industry"
            value={state.industry}
            onChange={(v) => dispatch({ type: 'SET_INDUSTRY', payload: v as Industry })}
            options={industryOptions}
          />
          <ToggleGroup
            options={[
              { value: 'product', label: 'Product' },
              { value: 'service', label: 'Service' },
            ]}
            value={state.businessType}
            onChange={(v) => dispatch({ type: 'SET_BUSINESS_TYPE', payload: v as 'product' | 'service' })}
          />
          {benchmark && (
            <div className="bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-lg p-3 text-xs text-[var(--text-secondary)]">
              <span className="text-[var(--accent)] font-medium">Industry benchmarks:</span>{' '}
              CPA {formatCurrency(benchmark.cpaRange[0])}-{formatCurrency(benchmark.cpaRange[1])}
              {' · '}Ad spend typically {budgetBench.avgBudgetAsPercentOfRevenue[0]}-{budgetBench.avgBudgetAsPercentOfRevenue[1]}% of revenue
              {' · '}Min budget {formatCurrency(benchmark.recommendedMinBudget)}/mo
            </div>
          )}
        </section>

        {/* Deal Value */}
        <section>
          <NumberInput
            label={state.businessType === 'product' ? 'Average Order Value' : 'Average Deal Value'}
            value={state.avgDealValue}
            onChange={(v) => dispatch({ type: 'SET_DEAL_VALUE', payload: v })}
            min={1}
            step={50}
            prefix="$"
          />
        </section>

        {/* Conversion Rate */}
        <section>
          <SliderInput
            label={state.businessType === 'product' ? 'Conversion Rate' : 'Close Rate (Lead → Customer)'}
            value={Math.round(state.conversionRate * 100)}
            onChange={(v) => dispatch({ type: 'SET_CONVERSION_RATE', payload: v / 100 })}
            min={1}
            max={80}
            step={1}
            suffix="%"
          />
        </section>

        {/* Growth Rate */}
        <section>
          <SliderInput
            label="Target Growth Rate"
            value={state.targetGrowthRate}
            onChange={(v) => dispatch({ type: 'SET_GROWTH_RATE', payload: v })}
            min={0}
            max={100}
            step={5}
            suffix="%"
          />
        </section>

        {/* Current Spend (Optional) */}
        <section>
          <div className="mb-1">
            <span className="text-[var(--text-secondary)] text-sm">Current Monthly Ad Spend</span>
            <span className="text-[var(--text-muted)] text-xs ml-2">(optional)</span>
          </div>
          <NumberInput
            label=""
            value={state.currentMonthlySpend}
            onChange={(v) => dispatch({ type: 'SET_CURRENT_SPEND', payload: v })}
            min={0}
            step={100}
            prefix="$"
          />
        </section>
      </div>
    </div>
  );
}
