'use client';

import { useEffect, useState } from 'react';

interface ScorecardData {
  activeClients: number;
  totalAccounts: number;
  totalMonthlyBudget: number;
  estimatedMRR: number;
  platformSplit: { meta: number; google: number };
  ownershipGaps: { noManager: number; noOperator: number };
  topClients: { name: string; budget: number; fee: number; pctOfMRR: number }[];
  churnedCount: number;
  budgetTiers: { under2k: number; '2k_5k': number; '5k_15k': number; over15k: number };
  budgetCoverage: { withBudget: number; total: number };
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function fmtDollar(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtPct(n: number): string {
  return n.toFixed(1) + '%';
}

export default function ScorecardPage() {
  const [data, setData] = useState<ScorecardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/scorecard');
        if (!res.ok) throw new Error('Failed to load scorecard data');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">KPI Scorecard</h2>
          <p className="text-sm text-slate-500 mt-1">Agency performance at a glance</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-[var(--creekside-blue)]" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">KPI Scorecard</h2>
          <p className="text-sm text-slate-500 mt-1">Agency performance at a glance</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-red-600 text-sm">
          {error || 'Failed to load data'}
        </div>
      </div>
    );
  }

  const tierLabels = [
    { key: 'under2k' as const, label: '< $2k', color: 'bg-slate-400' },
    { key: '2k_5k' as const, label: '$2k - $5k', color: 'bg-blue-400' },
    { key: '5k_15k' as const, label: '$5k - $15k', color: 'bg-emerald-400' },
    { key: 'over15k' as const, label: '$15k+', color: 'bg-purple-500' },
  ];

  const maxTierCount = Math.max(
    ...tierLabels.map((t) => data.budgetTiers[t.key]),
    1
  );

  const hasConcentrationRisk = data.topClients.some((c) => c.pctOfMRR > 20);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">KPI Scorecard</h2>
        <p className="text-sm text-slate-500 mt-1">Agency performance at a glance</p>
      </div>

      {/* Row 1 — Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-500">Active Clients</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{fmt(data.activeClients)}</p>
          <p className="text-xs text-slate-400 mt-1">{fmt(data.totalAccounts)} total accounts</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-500">Estimated MRR</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{fmtDollar(data.estimatedMRR)}</p>
          <p className="text-xs text-slate-400 mt-1">Based on fee tiers</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-500">Ad Spend Under Management</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{fmtDollar(data.totalMonthlyBudget)}</p>
          <p className="text-xs text-slate-400 mt-1">Monthly budgets combined</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-500">Churned Clients</p>
          <p className={`text-3xl font-bold mt-1 ${data.churnedCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>
            {fmt(data.churnedCount)}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {data.churnedCount === 0 ? 'No churn' : 'Review in Archive'}
          </p>
        </div>
      </div>

      {/* Row 2 — Operational Health */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-500">Platform Split</p>
          <div className="flex items-baseline gap-4 mt-2">
            <div>
              <span className="text-2xl font-bold text-slate-900">{fmt(data.platformSplit.meta)}</span>
              <span className="text-sm text-slate-500 ml-1">Meta</span>
            </div>
            <div className="text-slate-300">|</div>
            <div>
              <span className="text-2xl font-bold text-slate-900">{fmt(data.platformSplit.google)}</span>
              <span className="text-sm text-slate-500 ml-1">Google</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-500">Ownership Gaps</p>
          {data.ownershipGaps.noManager === 0 && data.ownershipGaps.noOperator === 0 ? (
            <p className="text-2xl font-bold text-emerald-600 mt-2">All assigned</p>
          ) : (
            <div className="mt-2 space-y-1">
              {data.ownershipGaps.noManager > 0 && (
                <p className="text-sm font-medium text-red-600">
                  {data.ownershipGaps.noManager} client{data.ownershipGaps.noManager !== 1 ? 's' : ''} missing manager
                </p>
              )}
              {data.ownershipGaps.noOperator > 0 && (
                <p className="text-sm font-medium text-red-600">
                  {data.ownershipGaps.noOperator} client{data.ownershipGaps.noOperator !== 1 ? 's' : ''} missing operator
                </p>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-500">Budget Coverage</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {data.budgetCoverage.withBudget}
            <span className="text-lg font-normal text-slate-400"> / {data.budgetCoverage.total}</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {data.budgetCoverage.total - data.budgetCoverage.withBudget === 0
              ? 'All clients have budgets set'
              : `${data.budgetCoverage.total - data.budgetCoverage.withBudget} missing budget`}
          </p>
        </div>
      </div>

      {/* Row 3 — Revenue Concentration */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Revenue Concentration</h3>
            <p className="text-xs text-slate-500 mt-0.5">Top 5 clients by estimated fee</p>
          </div>
          {hasConcentrationRisk && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20">
              Concentration Risk
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Budget</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Fee</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">% of MRR</th>
              </tr>
            </thead>
            <tbody>
              {data.topClients.map((client) => (
                <tr
                  key={client.name}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3 px-5 text-sm font-medium text-slate-900">{client.name}</td>
                  <td className="py-3 px-5 text-sm text-slate-600 text-right">{fmtDollar(client.budget)}</td>
                  <td className="py-3 px-5 text-sm text-slate-600 text-right">{fmtDollar(client.fee)}</td>
                  <td className="py-3 px-5 text-right">
                    <span
                      className={`text-sm font-medium ${
                        client.pctOfMRR > 20 ? 'text-red-600' : 'text-slate-600'
                      }`}
                    >
                      {fmtPct(client.pctOfMRR)}
                      {client.pctOfMRR > 20 && (
                        <span className="ml-1 text-xs text-red-500" title="Single client exceeds 20% of revenue">
                          !
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
              {data.topClients.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-slate-400">
                    No active clients with budgets
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4 — Budget Distribution */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900">Budget Distribution</h3>
        <p className="text-xs text-slate-500 mt-0.5 mb-4">Clients grouped by total monthly ad spend</p>
        <div className="space-y-3">
          {tierLabels.map((tier) => {
            const count = data.budgetTiers[tier.key];
            const widthPct = maxTierCount > 0 ? (count / maxTierCount) * 100 : 0;
            return (
              <div key={tier.key} className="flex items-center gap-3">
                <span className="text-sm text-slate-600 w-24 shrink-0 text-right">{tier.label}</span>
                <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                  <div
                    className={`h-full ${tier.color} rounded-lg transition-all duration-500`}
                    style={{ width: `${Math.max(widthPct, count > 0 ? 4 : 0)}%` }}
                  />
                  {count > 0 && (
                    <span className="absolute inset-y-0 flex items-center text-xs font-semibold text-slate-700 ml-2" style={{ left: `${Math.max(widthPct, 4)}%` }}>
                      {count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
