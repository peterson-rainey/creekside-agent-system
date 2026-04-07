'use client';

import { useEffect, useState, useCallback } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  employment_type: string;
  hourly_rate: number | null;
  status: string;
  notes: string | null;
  specialties: string[] | null;
}

function StatusDot({ status }: { status: string }) {
  const lower = status?.toLowerCase() ?? '';
  const dotColor = lower === 'active' ? 'bg-emerald-500' : 'bg-slate-300';
  const textColor = lower === 'active' ? 'text-emerald-700' : 'text-slate-500';
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium capitalize ${textColor}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const labels: Record<string, string> = {
    contractor: 'Contractor',
    full_time: 'Full-Time',
    owner: 'Owner',
  };
  const styles: Record<string, string> = {
    contractor: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20',
    full_time: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
    owner: 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${styles[type] || styles.contractor}`}>
      {labels[type] || type}
    </span>
  );
}

function InlineRateEditor({
  member,
  onSaved,
}: {
  member: TeamMember;
  onSaved: (id: string, rate: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(member.hourly_rate?.toString() ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed === member.hourly_rate) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/team/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: member.id, hourly_rate: parsed }),
      });
      if (res.ok) {
        onSaved(member.id, parsed);
      }
    } finally {
      setSaving(false);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <input
        type="number"
        step="0.01"
        className="w-24 px-2 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--creekside-blue)] focus:border-transparent"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === 'Enter') save();
          if (e.key === 'Escape') setEditing(false);
        }}
        autoFocus
        disabled={saving}
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="text-sm text-slate-700 hover:text-[var(--creekside-blue)] cursor-pointer transition-colors"
      title="Click to edit"
    >
      {member.hourly_rate != null ? `$${member.hourly_rate.toFixed(2)}` : '--'}
    </button>
  );
}

function NotesCell({
  member,
  onSaved,
}: {
  member: TeamMember;
  onSaved: (id: string, notes: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(member.notes ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (value === (member.notes ?? '')) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/team/members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: member.id, notes: value }),
      });
      if (res.ok) {
        onSaved(member.id, value);
      }
    } finally {
      setSaving(false);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <textarea
        className="w-full px-2 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--creekside-blue)] focus:border-transparent resize-none"
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); }
          if (e.key === 'Escape') setEditing(false);
        }}
        autoFocus
        disabled={saving}
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="text-sm text-slate-500 hover:text-[var(--creekside-blue)] cursor-pointer transition-colors text-left max-w-[200px] truncate"
      title={member.notes || 'Click to add notes'}
    >
      {member.notes || '--'}
    </button>
  );
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch('/api/team/members');
      const data = await res.json();
      if (Array.isArray(data)) setMembers(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const filtered = members.filter((m) => {
    // Only show active team members
    if (m.status !== 'active') return false;
    if (typeFilter !== 'all' && m.employment_type !== typeFilter) return false;
    return true;
  });

  const handleRateSaved = (id: string, rate: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, hourly_rate: rate } : m))
    );
  };

  const handleNotesSaved = (id: string, notes: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, notes } : m))
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Team Members</h2>
        <p className="text-sm text-slate-500 mt-1">Manage team members, rates, and notes</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--creekside-blue)] focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="contractor">Contractor</option>
            <option value="full_time">Full-Time</option>
            <option value="owner">Owner</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading team members...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">No team members found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hourly Rate</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => (
                  <tr key={member.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-slate-900">{member.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-600">{member.role}</span>
                    </td>
                    <td className="py-3 px-4">
                      <TypeBadge type={member.employment_type} />
                    </td>
                    <td className="py-3 px-4">
                      <InlineRateEditor member={member} onSaved={handleRateSaved} />
                    </td>
                    <td className="py-3 px-4">
                      <NotesCell member={member} onSaved={handleNotesSaved} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
