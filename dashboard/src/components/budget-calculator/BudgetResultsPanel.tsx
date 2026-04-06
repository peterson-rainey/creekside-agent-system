'use client';

import { useBudgetCalculator } from '@/lib/context/budget-context';
import { KpiCard } from '@/components/ui/KpiCard';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils/formatters';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line, CartesianGrid, ReferenceLine } from 'recharts';
import type { BudgetTier } from '@/lib/engine/budget-calculator';

const TIER_LABELS: Record<BudgetTier, string> = {
  conservative: 'Conservative',
  moderate: 'Recommended',
  aggressive: 'Aggressive',
};

const TIER_COLORS: Record<BudgetTier, string> = {
  conservative: 'var(--chart-blue, #3B82F6)',
  moderate: 'var(--accent)',
  aggressive: 'var(--chart-red, #EF4444)',
};

const BREAKDOWN_COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'];

export function BudgetResultsPanel() {
  const { state, results } = useBudgetCalculator();

  if (!results) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--text-muted)]">
        Adjust inputs to see your budget recommendation
      </div>
    );
  }

  const { recommendations, budgetBreakdown, spendAssessment, industryAvgBudgetPercent, platformSplit, budgetLimitations, spendLevelTable, costPerLead, costPerCustomer, diminishingReturns } = results;
  const moderate = recommendations.moderate;

  const breakdownData = [
    { name: 'Search Ads', value: budgetBreakdown.search, dollars: Math.round(moderate.monthlyBudget * budgetBreakdown.search / 100) },
    { name: 'Social Ads', value: budgetBreakdown.social, dollars: Math.round(moderate.monthlyBudget * budgetBreakdown.social / 100) },
    { name: 'Retargeting', value: budgetBreakdown.retargeting, dollars: Math.round(moderate.monthlyBudget * budgetBreakdown.retargeting / 100) },
    { name: 'Creative & Mgmt', value: budgetBreakdown.creative, dollars: Math.round(moderate.monthlyBudget * budgetBreakdown.creative / 100) },
  ];

  const comparisonData = state.currentMonthlySpend > 0
    ? [
        { name: 'Current', budget: state.currentMonthlySpend },
        { name: 'Conservative', budget: recommendations.conservative.monthlyBudget },
        { name: 'Recommended', budget: recommendations.moderate.monthlyBudget },
        { name: 'Aggressive', budget: recommendations.aggressive.monthlyBudget },
      ]
    : null;

  return (
    <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]" id="budget-dashboard-panel">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
        <div>
          <h2 className="text-[var(--text-primary)] text-lg font-semibold">
            Your Budget Recommendation
          </h2>
          <p className="text-[var(--text-muted)] text-xs mt-1">
            Based on {formatCurrency(results.monthlyRevenueGoal)}/mo revenue goal
          </p>
        </div>
        <a
          href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--accent)] rounded-lg hover:brightness-110 transition-all"
        >
          Get a Custom Plan
        </a>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard
            label="Recommended Budget"
            value={formatCurrency(moderate.monthlyBudget)}
            subtitle="/month"
          />
          <KpiCard
            label="Expected CPA"
            value={formatCurrency(moderate.expectedCpa)}
            subtitle="cost per lead"
          />
          <KpiCard
            label="Leads Needed"
            value={formatNumber(results.leadsNeeded)}
            subtitle="/month"
          />
          <KpiCard
            label="Budget % of Revenue"
            value={formatPercent(moderate.budgetAsPercentOfRevenue)}
            subtitle={`Industry avg: ${industryAvgBudgetPercent[0]}-${industryAvgBudgetPercent[1]}%`}
          />
        </div>

        {/* Three-Tier Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['conservative', 'moderate', 'aggressive'] as BudgetTier[]).map((tier) => {
            const rec = recommendations[tier];
            const isRecommended = tier === 'moderate';
            return (
              <div
                key={tier}
                className={`relative bg-[var(--bg-secondary)] border rounded-xl p-5 ${
                  isRecommended
                    ? 'border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]'
                    : 'border-[var(--border)]'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-xs font-semibold text-white bg-[var(--accent)] rounded-full">
                    Recommended
                  </div>
                )}
                <h3 className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-3">
                  {TIER_LABELS[tier]}
                </h3>
                <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                  {formatCurrency(rec.monthlyBudget)}
                  <span className="text-sm font-normal text-[var(--text-muted)]">/mo</span>
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  {formatCurrency(rec.annualBudget)}/yr
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Expected CPA</span>
                    <span className="text-[var(--text-primary)] font-medium">{formatCurrency(rec.expectedCpa)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Leads/mo</span>
                    <span className="text-[var(--text-primary)] font-medium">{formatNumber(rec.expectedLeadsPerMonth)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Customers/mo</span>
                    <span className="text-[var(--text-primary)] font-medium">{formatNumber(rec.expectedCustomersPerMonth)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Expected ROAS</span>
                    <span className="text-[var(--text-primary)] font-medium">{rec.expectedRoas}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">% of Revenue</span>
                    <span className="text-[var(--text-primary)] font-medium">{formatPercent(rec.budgetAsPercentOfRevenue)}</span>
                  </div>
                  {rec.monthsToBreakEven && (
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Break-even</span>
                      <span className="text-[var(--text-primary)] font-medium">
                        {rec.monthsToBreakEven === 1 ? '~1 month' : `~${rec.monthsToBreakEven} months`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* The Math Breakdown */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-primary)] font-semibold mb-3">The Math</h3>
          <div className="space-y-2 text-sm">
            <p className="text-[var(--text-secondary)]">
              To hit <span className="text-[var(--text-primary)] font-medium">{formatCurrency(results.monthlyRevenueGoal)}/mo</span> in revenue,
              you need <span className="text-[var(--text-primary)] font-medium">{formatNumber(results.customersNeeded)} customers</span> per month
              at <span className="text-[var(--text-primary)] font-medium">{formatCurrency(state.avgDealValue)}</span> avg deal value.
            </p>
            <p className="text-[var(--text-secondary)]">
              At a <span className="text-[var(--text-primary)] font-medium">{Math.round(state.conversionRate * 100)}%</span> conversion rate,
              that means <span className="text-[var(--text-primary)] font-medium">{formatNumber(results.leadsNeeded)} leads</span> per month.
            </p>
            <p className="text-[var(--text-secondary)]">
              At an industry-average CPA of <span className="text-[var(--text-primary)] font-medium">{formatCurrency(moderate.expectedCpa)}</span>,
              you need <span className="text-[var(--accent)] font-semibold">{formatCurrency(moderate.monthlyBudget)}/mo</span> in ad spend.
            </p>
          </div>
        </div>

        {/* Cost Per Lead vs Cost Per Customer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Cost Per Lead</h3>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{formatCurrency(costPerLead)}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">What you pay for each person who contacts you</p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Cost Per Customer</h3>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{formatCurrency(costPerCustomer)}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              What you actually pay to acquire a paying customer ({Math.round(state.conversionRate * 100)}% of leads convert)
            </p>
          </div>
        </div>

        {/* What You Get at Each Spend Level */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-primary)] font-semibold mb-4">What You Get at Each Spend Level</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-[var(--text-muted)] text-xs uppercase tracking-wider py-2 pr-4">Level</th>
                  <th className="text-right text-[var(--text-muted)] text-xs uppercase tracking-wider py-2 px-3">Monthly</th>
                  <th className="text-right text-[var(--text-muted)] text-xs uppercase tracking-wider py-2 px-3">Daily</th>
                  <th className="text-right text-[var(--text-muted)] text-xs uppercase tracking-wider py-2 px-3">Leads/mo</th>
                  <th className="text-right text-[var(--text-muted)] text-xs uppercase tracking-wider py-2 px-3">Customers/mo</th>
                  <th className="text-right text-[var(--text-muted)] text-xs uppercase tracking-wider py-2 pl-3">Cost/Customer</th>
                </tr>
              </thead>
              <tbody>
                {spendLevelTable.map((row) => (
                  <tr
                    key={row.label}
                    className={`border-b border-[var(--border)]/50 ${
                      row.isRecommended ? 'bg-[var(--accent)]/5' : row.isCurrentSpend ? 'bg-yellow-900/10' : ''
                    }`}
                  >
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-[var(--text-primary)] font-medium ${row.isRecommended ? 'text-[var(--accent)]' : ''}`}>
                          {row.label}
                        </span>
                        {row.isCurrentSpend && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-900/30 text-yellow-400">YOU</span>
                        )}
                      </div>
                    </td>
                    <td className="text-right py-2.5 px-3 text-[var(--text-primary)]">{formatCurrency(row.monthlyBudget)}</td>
                    <td className="text-right py-2.5 px-3 text-[var(--text-secondary)]">{formatCurrency(row.dailyBudget)}/day</td>
                    <td className="text-right py-2.5 px-3 text-[var(--text-primary)]">{formatNumber(row.expectedLeads)}</td>
                    <td className="text-right py-2.5 px-3 text-[var(--text-primary)] font-medium">{formatNumber(row.expectedCustomers)}</td>
                    <td className="text-right py-2.5 pl-3 text-[var(--text-secondary)]">{row.costPerCustomer > 0 ? formatCurrency(row.costPerCustomer) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diminishing Returns Chart */}
        {diminishingReturns.length > 0 && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-[var(--text-primary)] font-semibold mb-1">Diminishing Returns on Ad Spend</h3>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Each additional dollar spent buys fewer leads. Early dollars capture high-intent, cheap clicks. As you scale, you compete for more expensive placements and less interested audiences.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* CPA Curve: Average vs Marginal */}
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider">Cost Per Lead as You Scale</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={diminishingReturns}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="monthlyBudget"
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => formatCurrency(v)}
                    />
                    <YAxis
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                      formatter={(value, name) => [
                        `$${value}`,
                        name === 'effectiveCpa' ? 'Avg Cost/Lead' : 'Marginal Cost/Lead',
                      ]}
                      labelFormatter={(label) => `Budget: ${formatCurrency(label as number)}`}
                    />
                    <ReferenceLine
                      x={moderate.monthlyBudget}
                      stroke="var(--accent)"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                    />
                    <Line
                      type="monotone"
                      dataKey="effectiveCpa"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      dot={false}
                      name="effectiveCpa"
                    />
                    <Line
                      type="monotone"
                      dataKey="marginalCpa"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="6 3"
                      name="marginalCpa"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 bg-[var(--accent)]" />
                    <span>Avg Cost/Lead</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 bg-[#EF4444]" style={{ borderTop: '2px dashed #EF4444' }} />
                    <span>Marginal Cost/Lead</span>
                  </div>
                </div>
              </div>

              {/* Efficiency Curve */}
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider">Spend Efficiency</p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={diminishingReturns}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="monthlyBudget"
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => formatCurrency(v)}
                    />
                    <YAxis
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v}%`}
                      domain={[0, 110]}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                      formatter={(value) => [`${value}%`, 'Efficiency']}
                      labelFormatter={(label) => `Budget: ${formatCurrency(label as number)}`}
                    />
                    <ReferenceLine
                      x={moderate.monthlyBudget}
                      stroke="var(--accent)"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                    />
                    <defs>
                      <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="efficiency"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      fill="url(#efficiencyGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-[var(--text-muted)] text-center mt-2">
                  100% = every dollar works as hard as your first. Lower % = diminishing returns.
                </p>
              </div>
            </div>

            {/* Key insight callout */}
            <div className="mt-4 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text-secondary)]">
              {(() => {
                const atDouble = diminishingReturns.find(p => p.monthlyBudget >= moderate.monthlyBudget * 1.9);
                const atRecommended = diminishingReturns.find(p => p.monthlyBudget >= moderate.monthlyBudget * 0.9);
                if (atDouble && atRecommended) {
                  const leadLift = atRecommended.leads > 0 ? Math.round(((atDouble.leads / atRecommended.leads) - 1) * 100) : 0;
                  return (
                    <>
                      <span className="text-[var(--accent)] font-medium">Key insight:</span> Doubling your budget from {formatCurrency(moderate.monthlyBudget)} to {formatCurrency(moderate.monthlyBudget * 2)} would increase leads by ~{leadLift}%, not 100%.
                      Your marginal cost per lead rises from {formatCurrency(atRecommended.marginalCpa)} to {formatCurrency(atDouble.marginalCpa)}.
                      {leadLift < 60 && ' Consider optimizing conversion rates and landing pages before doubling spend.'}
                    </>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        )}

        {/* Platform Split Recommendation */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-primary)] font-semibold mb-4">Where to Run Ads</h3>
          <div className="flex gap-2 mb-4 h-4 rounded-full overflow-hidden">
            <div className="bg-[#4285F4] rounded-l-full" style={{ width: `${platformSplit.google}%` }} />
            <div className="bg-[#1877F2]" style={{ width: `${platformSplit.meta}%` }} />
            <div className="bg-[var(--text-muted)] rounded-r-full" style={{ width: `${platformSplit.other}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                <span className="text-sm text-[var(--text-primary)] font-medium">Google</span>
              </div>
              <p className="text-lg font-bold text-[var(--text-primary)]">{platformSplit.google}%</p>
              <p className="text-xs text-[var(--text-muted)]">{formatCurrency(Math.round(moderate.monthlyBudget * platformSplit.google / 100))}/mo</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1877F2]" />
                <span className="text-sm text-[var(--text-primary)] font-medium">Meta</span>
              </div>
              <p className="text-lg font-bold text-[var(--text-primary)]">{platformSplit.meta}%</p>
              <p className="text-xs text-[var(--text-muted)]">{formatCurrency(Math.round(moderate.monthlyBudget * platformSplit.meta / 100))}/mo</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]" />
                <span className="text-sm text-[var(--text-primary)] font-medium">Other</span>
              </div>
              <p className="text-lg font-bold text-[var(--text-primary)]">{platformSplit.other}%</p>
              <p className="text-xs text-[var(--text-muted)]">{formatCurrency(Math.round(moderate.monthlyBudget * platformSplit.other / 100))}/mo</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-tertiary)] rounded-lg p-3">
            {platformSplit.rationale}
          </p>
        </div>

        {/* Budget Limitations */}
        {budgetLimitations.length > 0 && (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-[var(--text-primary)] font-semibold mb-3">What to Know at This Budget Level</h3>
            <div className="space-y-3">
              {budgetLimitations.map((lim, i) => (
                <div key={i} className={`flex gap-3 p-3 rounded-lg text-sm ${
                  lim.icon === 'block' ? 'bg-red-950/20 border border-red-800/30' :
                  lim.icon === 'warning' ? 'bg-yellow-950/20 border border-yellow-800/30' :
                  'bg-[var(--bg-tertiary)] border border-[var(--border)]'
                }`}>
                  <span className="shrink-0 mt-0.5">
                    {lim.icon === 'block' ? (
                      <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    ) : lim.icon === 'warning' ? (
                      <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                  </span>
                  <span className="text-[var(--text-secondary)]">{lim.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Budget Breakdown Chart + Current Spend Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pie Chart: Budget Allocation */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-[var(--text-primary)] font-semibold mb-4">Where Your Budget Goes</h3>
            <div className="flex items-center gap-4">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {breakdownData.map((_, i) => (
                        <Cell key={i} fill={BREAKDOWN_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`]}
                      contentStyle={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {breakdownData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: BREAKDOWN_COLORS[i] }} />
                      <span className="text-[var(--text-secondary)]">{item.name}</span>
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{formatCurrency(item.dollars)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart: Current vs Recommended */}
          {comparisonData ? (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-[var(--text-primary)] font-semibold mb-4">Current vs Recommended</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={comparisonData} barSize={32}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => formatCurrency(v)}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value as number), 'Budget']}
                    contentStyle={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="budget" radius={[4, 4, 0, 0]}>
                    {comparisonData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={i === 0 ? 'var(--text-muted)' : i === 2 ? 'var(--accent)' : 'var(--border)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-[var(--text-primary)] font-semibold mb-3">Industry Comparison</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Businesses in your industry typically spend <span className="text-[var(--accent)] font-medium">{industryAvgBudgetPercent[0]}-{industryAvgBudgetPercent[1]}%</span> of revenue on advertising.
              </p>
              <div className="relative h-6 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                {/* Industry range */}
                <div
                  className="absolute top-0 h-full bg-[var(--accent)]/20 rounded-full"
                  style={{
                    left: `${industryAvgBudgetPercent[0]}%`,
                    width: `${industryAvgBudgetPercent[1] - industryAvgBudgetPercent[0]}%`,
                  }}
                />
                {/* User's position */}
                <div
                  className="absolute top-0 h-full w-1 bg-[var(--accent)] rounded-full"
                  style={{
                    left: `${Math.min(moderate.budgetAsPercentOfRevenue, 30)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-[var(--text-muted)]">
                <span>0%</span>
                <span>Your budget: {formatPercent(moderate.budgetAsPercentOfRevenue)}</span>
                <span>30%+</span>
              </div>
            </div>
          )}
        </div>

        {/* Spend Assessment */}
        {spendAssessment && (
          <div className={`border rounded-xl p-5 ${
            spendAssessment.status === 'underspending'
              ? 'bg-yellow-950/20 border-yellow-700/30'
              : spendAssessment.status === 'overspending'
              ? 'bg-red-950/20 border-red-700/30'
              : 'bg-emerald-950/20 border-emerald-700/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                spendAssessment.status === 'underspending'
                  ? 'text-yellow-400 bg-yellow-900/30'
                  : spendAssessment.status === 'overspending'
                  ? 'text-red-400 bg-red-900/30'
                  : 'text-emerald-400 bg-emerald-900/30'
              }`}>
                {spendAssessment.status === 'underspending' ? 'Underspending' :
                 spendAssessment.status === 'overspending' ? 'Overspending' : 'On Track'}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Gap: {formatCurrency(spendAssessment.gap)}/mo
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{spendAssessment.message}</p>
          </div>
        )}

        {/* Insights */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-primary)] font-semibold mb-3">Tips for Your Industry</h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {moderate.monthlyBudget < results.industryMinBudget && (
              <li className="flex gap-2">
                <span className="text-yellow-400 shrink-0">!</span>
                Your calculated budget is below the industry minimum of {formatCurrency(results.industryMinBudget)}/mo. We've adjusted upward to give you a fighting chance.
              </li>
            )}
            <li className="flex gap-2">
              <span className="text-[var(--accent)] shrink-0">-</span>
              Start at the conservative tier for 60-90 days to build data before scaling.
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--accent)] shrink-0">-</span>
              Focus {budgetBreakdown.search}% on search ads to capture high-intent traffic first.
            </li>
            {state.businessType === 'service' && (
              <li className="flex gap-2">
                <span className="text-[var(--accent)] shrink-0">-</span>
                For service businesses, track cost-per-lead (not just clicks) to measure real performance.
              </li>
            )}
            {state.targetGrowthRate > 30 && (
              <li className="flex gap-2">
                <span className="text-[var(--accent)] shrink-0">-</span>
                A {state.targetGrowthRate}% growth target is aggressive. Make sure your operations can handle the volume before scaling ads.
              </li>
            )}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-6 text-center">
          <h3 className="text-[var(--text-primary)] font-semibold mb-2">
            Want a custom budget plan for your business?
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Our team will build a detailed media plan with channel-specific budgets, creative strategy, and projected ROI.
          </p>
          <a
            href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[var(--accent)] rounded-lg hover:brightness-110 transition-all"
          >
            Book a Free Strategy Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
