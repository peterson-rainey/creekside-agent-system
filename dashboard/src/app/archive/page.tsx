'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';

interface ArchivedClient {
  id: string;
  client_name: string;
  platform: string;
  ad_account_id: string | null;
  monthly_budget: number | null;
  monthly_revenue: number | null;
  account_manager: string | null;
  churned_date: string | null;
  churn_reason: string | null;
  status: string;
}

function formatCurrency(value: number): string {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function InlineTextArea({
  clientId,
  field,
  value,
  placeholder,
  onSaved,
}: {
  clientId: string;
  field: string;
  value: string | null;
  placeholder: string;
  onSaved: (clientId: string, field: string, value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (draft === (value ?? '')) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/clients', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: clientId, [field]: draft }),
      });
      if (res.ok) onSaved(clientId, field, draft);
    } catch { /* ignore */ }
    setSaving(false);
    setEditing(false);
  };

  if (editing) {
    return (
      <textarea
        autoFocus
        rows={2}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); } }}
        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--creekside-blue)] resize-none"
        placeholder={placeholder}
      />
    );
  }

  return (
    <span
      onClick={() => { setDraft(value ?? ''); setEditing(true); }}
      className={`cursor-pointer text-sm hover:text-[var(--creekside-blue)] transition-colors ${
        value ? 'text-slate-700 border-b border-dashed border-transparent hover:border-[var(--creekside-blue)]' : 'text-slate-300 italic'
      }`}
    >
      {saving ? '...' : value || placeholder}
    </span>
  );
}

export default function ArchivePage() {
  const [clients, setClients] = useState<ArchivedClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reactivating, setReactivating] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then((data: ArchivedClient[]) => {
        setClients(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const churned = useMemo(
    () => clients.filter(c => c.status?.toLowerCase() === 'churned'),
    [clients]
  );

  // Group by client name (a client may have multiple platform rows)
  const grouped = useMemo(() => {
    const map = new Map<string, ArchivedClient[]>();
    for (const c of churned) {
      const existing = map.get(c.client_name) ?? [];
      existing.push(c);
      map.set(c.client_name, existing);
    }
    return [...map.entries()].sort(([, a], [, b]) => {
      const dateA = a[0]?.churned_date ?? '';
      const dateB = b[0]?.churned_date ?? '';
      return dateB.localeCompare(dateA); // most recent churn first
    });
  }, [churned]);

  const handleFieldSaved = useCallback((clientId: string, field: string, value: string) => {
    setClients(prev => prev.map(c =>
      c.id === clientId ? { ...c, [field]: value } : c
    ));
  }, []);

  const handleReactivate = async (clientName: string, rows: ArchivedClient[]) => {
    if (!confirm(`Reactivate ${clientName}? This will move them back to the active client list.`)) return;
    setReactivating(clientName);
    try {
      await Promise.all(rows.map(row =>
        fetch('/api/clients', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: row.id, status: 'active' }),
        })
      ));
      setClients(prev => prev.map(c =>
        rows.some(r => r.id === c.id)
          ? { ...c, status: 'active', churned_date: null, churn_reason: null }
          : c
      ));
    } catch { /* ignore */ }
    setReactivating(null);
  };

  // Stats
  const totalLostRevenue = useMemo(() => {
    const seen = new Set<string>();
    let total = 0;
    for (const c of churned) {
      if (!seen.has(c.client_name)) {
        seen.add(c.client_name);
        total += Number(c.monthly_revenue ?? c.monthly_budget ?? 0);
      }
    }
    return total;
  }, [churned]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-[var(--creekside-blue)]" />
          <span className="text-sm text-slate-500">Loading archive...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl">
        <p className="font-semibold">Error loading clients</p>
        <p className="text-sm mt-1 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Client Archive</h2>
        <p className="text-sm text-slate-500 mt-1">Former clients — track why they left and reactivate when they return</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 px-6 py-4">
          <p className="text-sm font-medium text-slate-500">Archived Clients</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{new Set(churned.map(c => c.client_name)).size}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-6 py-4">
          <p className="text-sm font-medium text-slate-500">Ad Accounts Lost</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{churned.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-6 py-4">
          <p className="text-sm font-medium text-slate-500">Last Known Monthly Budget</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{formatCurrency(totalLostRevenue)}</p>
        </div>
      </div>

      {/* Table */}
      {grouped.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 px-6 py-16 text-center">
          <p className="text-slate-400 text-sm">No archived clients. When a client is marked as &quot;churned&quot;, they&apos;ll appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Client</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Platform(s)</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Last Budget</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Manager</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Churned Date</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6 min-w-[250px]">Reason</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grouped.map(([clientName, rows]) => {
                  const totalBudget = rows.reduce((sum, r) => sum + Number(r.monthly_budget ?? 0), 0);
                  const platforms = [...new Set(rows.map(r => r.platform))];
                  const firstRow = rows[0];
                  return (
                    <tr key={clientName} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-sm font-semibold text-slate-900">{clientName}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1.5">
                          {platforms.map(p => (
                            <span key={p} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                              p?.toLowerCase() === 'meta'
                                ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                                : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${p?.toLowerCase() === 'meta' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                              {p?.toLowerCase() === 'meta' ? 'Meta' : 'Google'}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-700">
                        {totalBudget > 0 ? formatCurrency(totalBudget) : <span className="text-slate-300">--</span>}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {firstRow.account_manager ?? <span className="text-slate-300">--</span>}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {firstRow.churned_date ?? <span className="text-slate-300">--</span>}
                      </td>
                      <td className="py-4 px-6">
                        <InlineTextArea
                          clientId={firstRow.id}
                          field="churn_reason"
                          value={firstRow.churn_reason}
                          placeholder="Click to add reason..."
                          onSaved={handleFieldSaved}
                        />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleReactivate(clientName, rows)}
                          disabled={reactivating === clientName}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                        >
                          {reactivating === clientName ? 'Reactivating...' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50">
            <span className="text-sm text-slate-500">
              {new Set(churned.map(c => c.client_name)).size} clients &middot; {churned.length} accounts
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
