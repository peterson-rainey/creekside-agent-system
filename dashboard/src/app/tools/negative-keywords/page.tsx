'use client';

import { useState, useRef, useCallback } from 'react';
import { ToolModeToggle } from '@/components/ai-interview/ToolModeToggle';
import type {
  AIAnalysisResult,
  ClassifiedTerm,
  NegativeRecommendation,
  ExistingNegativeIssue,
  AccountStats,
} from '@/lib/ai-keyword-analyzer';
import {
  generateGoogleAdsCSV,
  generateGoogleAdsEditorCSV,
} from '@/lib/negative-keyword-analyzer';

// ── Extended types with UI state ─────────────────────────────────────────

interface CheckableClassifiedTerm extends ClassifiedTerm {
  checked: boolean;
}

interface CheckableNegativeRec extends NegativeRecommendation {
  checked: boolean;
}

interface AnalysisResultWithUI {
  classifiedTerms: CheckableClassifiedTerm[];
  negativeRecommendations: CheckableNegativeRec[];
  existingNegativeIssues: ExistingNegativeIssue[];
  healthScore: number;
  totalWastedSpend: number;
  wastePercentage: number;
  summary: string;
  keyInsights: string[];
  accountStats: AccountStats;
  wasLimited: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────────────

function classificationColor(c: string) {
  if (c === 'wasteful') return 'bg-red-100 text-red-700 border-red-200';
  if (c === 'underperforming') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  if (c === 'good') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  return 'bg-blue-100 text-blue-700 border-blue-200'; // acceptable
}

function priorityColor(p: string) {
  if (p === 'high') return 'bg-red-100 text-red-700 border-red-200';
  if (p === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  return 'bg-blue-100 text-blue-700 border-blue-200';
}

function severityColor(s: string) {
  if (s === 'critical') return 'bg-red-100 text-red-700 border-red-200';
  if (s === 'warning') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  return 'bg-blue-100 text-blue-700 border-blue-200';
}

function issueLabel(issue: string) {
  if (issue === 'unnecessary') return 'Unnecessary';
  if (issue === 'wrong_match_type') return 'Wrong Match Type';
  if (issue === 'too_broad') return 'Too Broad';
  if (issue === 'too_narrow') return 'Too Narrow';
  return issue;
}

function healthScoreColor(score: number) {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

function healthScoreBg(score: number) {
  if (score >= 80) return 'bg-emerald-950/30 border-emerald-800';
  if (score >= 60) return 'bg-yellow-950/30 border-yellow-800';
  return 'bg-red-950/30 border-red-800';
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

// ── Collapsible Section ──────────────────────────────────────────────────

function CollapsibleSection({
  title,
  count,
  defaultOpen = true,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[var(--bg-tertiary)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${open ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
        </div>
        <span className="text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-2.5 py-1 rounded-full">
          {count}
        </span>
      </button>
      {open && <div className="border-t border-[var(--border)]">{children}</div>}
    </div>
  );
}

// ── Email Gate Modal ─────────────────────────────────────────────────────

function EmailGateModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (email: string) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] shadow-xl max-w-md w-full p-6 space-y-4">
        <div className="text-center">
          <svg className="w-10 h-10 mx-auto text-[var(--accent)] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Enter your email to download your customized negative keyword list
          </h3>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          />
          {emailError && (
            <p className="text-xs text-red-600 mt-1">{emailError}</p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-6 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-light)] transition-colors"
        >
          Download
        </button>
        <p className="text-xs text-[var(--text-muted)] text-center">
          Your email is only used to deliver your report.
        </p>
      </div>
    </div>
  );
}

// ── Spinner ──────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── Download Icon ────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

// ── File Upload Zone ─────────────────────────────────────────────────────

function FileUploadZone({
  label,
  sublabel,
  placeholder,
  value,
  fileName,
  onTextChange,
  onFile,
  required,
}: {
  label: string;
  sublabel?: string;
  placeholder: string;
  value: string;
  fileName: string;
  onTextChange: (text: string) => void;
  onFile: (file: File) => void;
  required?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onFile(file);
      onTextChange(e.target?.result as string);
    };
    reader.readAsText(file);
  }, [onFile, onTextChange]);

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-5 space-y-3">
      <div>
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        {sublabel && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{sublabel}</p>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-[var(--accent)] bg-[var(--accent-glow)]'
            : 'border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg-tertiary)]'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.txt"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFile(e.target.files[0]);
          }}
        />
        <svg
          className="w-6 h-6 mx-auto text-[var(--text-muted)] mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        {fileName ? (
          <p className="text-xs text-[var(--text-secondary)] font-medium">{fileName}</p>
        ) : (
          <>
            <p className="text-xs text-[var(--text-secondary)]">
              Drop <span className="font-medium text-[var(--text-primary)]">.csv</span> or{' '}
              <span className="font-medium text-[var(--text-primary)]">.txt</span> here
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">or click to browse</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">or paste</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

      <textarea
        value={value}
        onChange={(e) => onTextChange(e.target.value)}
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-y"
      />
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────

export default function NegativeKeywordAnalyzer() {
  // Input state
  const [searchTermText, setSearchTermText] = useState('');
  const [searchTermFile, setSearchTermFile] = useState('');
  const [keywordListText, setKeywordListText] = useState('');
  const [keywordListFile, setKeywordListFile] = useState('');
  const [negativeListText, setNegativeListText] = useState('');
  const [negativeListFile, setNegativeListFile] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [competitors, setCompetitors] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResultWithUI | null>(null);
  const [exportGuideOpen, setExportGuideOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<(() => void) | null>(null);
  const [activeTermTab, setActiveTermTab] = useState<'wasteful' | 'underperforming' | 'good'>('wasteful');

  // ── Email gate wrapper ──

  const gatedDownload = (downloadFn: () => void) => {
    if (userEmail) {
      downloadFn();
    } else {
      setPendingDownload(() => downloadFn);
      setShowEmailModal(true);
    }
  };

  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    setShowEmailModal(false);

    fetch('/api/tools/negative-keywords/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        healthScore: result?.healthScore ?? null,
      }),
    }).catch(() => {});

    if (pendingDownload) {
      pendingDownload();
      setPendingDownload(null);
    }
  };

  // ── Analysis ──

  const analyze = async () => {
    if (!searchTermText.trim()) {
      setError('Please upload or paste your search term report');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const competitorList = competitors
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      const res = await fetch('/api/tools/negative-keywords/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchTermText: searchTermText.trim(),
          keywordListText: keywordListText.trim() || undefined,
          negativeListText: negativeListText.trim() || undefined,
          businessDescription: businessDescription.trim() || undefined,
          competitors: competitorList.length > 0 ? competitorList : undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Analysis failed. Please try again.');
      }

      const data: AIAnalysisResult & { wasLimited?: boolean } = await res.json();

      // Add checkbox state
      const uiResult: AnalysisResultWithUI = {
        ...data,
        wasLimited: data.wasLimited ?? false,
        classifiedTerms: (data.classifiedTerms || []).map((t) => ({
          ...t,
          checked: t.classification === 'wasteful' || t.classification === 'underperforming',
        })),
        negativeRecommendations: (data.negativeRecommendations || []).map((r) => ({
          ...r,
          checked: true,
        })),
        existingNegativeIssues: data.existingNegativeIssues || [],
      };

      setResult(uiResult);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ── Toggle helpers ──

  const toggleTerm = (idx: number) => {
    if (!result) return;
    const updated = [...result.classifiedTerms];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setResult({ ...result, classifiedTerms: updated });
  };

  const toggleRec = (idx: number) => {
    if (!result) return;
    const updated = [...result.negativeRecommendations];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setResult({ ...result, negativeRecommendations: updated });
  };

  // ── CSV downloads ──

  const getSelectedNegatives = (): { keyword: string; matchType: 'Broad' | 'Phrase' | 'Exact' }[] => {
    if (!result) return [];
    const fromTerms = result.classifiedTerms
      .filter((t) => t.checked && (t.classification === 'wasteful' || t.classification === 'underperforming'))
      .map((t) => ({ keyword: t.term, matchType: t.suggestedMatchType }));
    const fromRecs = result.negativeRecommendations
      .filter((r) => r.checked)
      .map((r) => ({ keyword: r.keyword, matchType: r.matchType }));
    return [...fromTerms, ...fromRecs];
  };

  const downloadGoogleAdsCsv = () => {
    const negatives = getSelectedNegatives();
    if (negatives.length === 0) return;
    const csv = generateGoogleAdsCSV(negatives);
    downloadBlob(csv, 'negative_keywords_google_ads.csv', 'text/csv');
  };

  const downloadEditorCsv = () => {
    const negatives = getSelectedNegatives();
    if (negatives.length === 0) return;
    const csv = generateGoogleAdsEditorCSV(negatives);
    downloadBlob(csv, 'negative_keywords_editor.csv', 'text/csv');
  };

  const downloadBlob = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // ── Filtered term lists ──

  const termsByClassification = (classification: string) =>
    result?.classifiedTerms.filter((t) => t.classification === classification) ?? [];

  const wastefulTerms = termsByClassification('wasteful');
  const underperformingTerms = termsByClassification('underperforming');
  const goodTerms = [
    ...termsByClassification('good'),
    ...termsByClassification('acceptable'),
  ];

  const recsBySource = (source: string) =>
    result?.negativeRecommendations.filter((r) => r.source === source) ?? [];

  const selectedCount = result
    ? result.classifiedTerms.filter((t) => t.checked).length +
      result.negativeRecommendations.filter((r) => r.checked).length
    : 0;

  // ── Render ─────────────────────────────────────────────────────────────

  const toolContext = result ? {
    healthScore: result.healthScore,
    wastePercentage: result.wastePercentage,
    termCount: result.accountStats.totalTerms,
  } : undefined;

  return (
    <ToolModeToggle tool="negative-keywords" toolLabel="negative keyword strategy" toolContext={toolContext}>
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <a href="/" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">All Tools</span>
        </a>
        <a
          href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
          className="text-sm text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors font-medium"
        >
          Book a Strategy Call
        </a>
      </nav>

      <main className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Email Gate Modal */}
          {showEmailModal && (
            <EmailGateModal
              onSubmit={handleEmailSubmit}
              onClose={() => {
                setShowEmailModal(false);
                setPendingDownload(null);
              }}
            />
          )}

          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Negative Keyword Analyzer</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Upload your Search Term Report and we&apos;ll use AI to classify every term, find wasted spend,
              and recommend negative keywords to add.
            </p>
          </div>

          {/* Input Section — 3 upload zones + options */}
          <div className="space-y-6">
            {/* Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileUploadZone
                label="Search Term Report"
                sublabel="Required"
                placeholder={`Paste your search term report here...\nSearch term, Clicks, Cost, Conversions\nfree lawn care tips, 45, 23.50, 0\ncheap landscaping near me, 32, 18.75, 0`}
                value={searchTermText}
                fileName={searchTermFile}
                onTextChange={(text) => { setSearchTermText(text); if (!text) setSearchTermFile(''); }}
                onFile={(file) => setSearchTermFile(file.name)}
                required
              />
              <FileUploadZone
                label="What are you bidding on?"
                sublabel="Optional"
                placeholder={`Paste your keyword list here...\nlawn care service\nlandscaping near me\ntree trimming`}
                value={keywordListText}
                fileName={keywordListFile}
                onTextChange={(text) => { setKeywordListText(text); if (!text) setKeywordListFile(''); }}
                onFile={(file) => setKeywordListFile(file.name)}
              />
              <FileUploadZone
                label="Current negatives"
                sublabel="Optional"
                placeholder={`Paste your negative keyword list here...\nfree\n[cheap services]\n"discount coupon"`}
                value={negativeListText}
                fileName={negativeListFile}
                onTextChange={(text) => { setNegativeListText(text); if (!text) setNegativeListFile(''); }}
                onFile={(file) => setNegativeListFile(file.name)}
              />
            </div>

            {/* Options Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Business Description */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-5">
                <label className="text-sm font-medium text-[var(--text-secondary)] block mb-2">
                  Describe your business in a few sentences{' '}
                  <span className="text-[var(--text-muted)] font-normal">(optional — helps the AI understand your context)</span>
                </label>
                <textarea
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  rows={3}
                  placeholder="e.g. We're a residential landscaping company in Austin, TX. We focus on lawn maintenance, tree trimming, and landscape design for homeowners."
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-y"
                />
              </div>

              {/* Competitors + Analyze */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-5 flex flex-col">
                <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
                  Competitor Brands <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  placeholder="e.g. CompetitorA, CompetitorB, CompetitorC"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
                <p className="text-xs text-[var(--text-muted)] mt-1.5">
                  Comma-separated. We&apos;ll flag search terms containing these brands.
                </p>

                <div className="mt-auto pt-4">
                  {error && (
                    <div className="mb-3 p-3 rounded-lg bg-red-950/30 border border-red-800 text-sm text-red-400">
                      {error}
                    </div>
                  )}
                  <button
                    onClick={analyze}
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Spinner />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Export Guide */}
            <div className="bg-[var(--bg-tertiary)] rounded-lg overflow-hidden">
              <button
                onClick={() => setExportGuideOpen(!exportGuideOpen)}
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-[var(--border)] transition-colors"
              >
                <svg
                  className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${exportGuideOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  How to export a search term report from Google Ads
                </span>
              </button>
              {exportGuideOpen && (
                <div className="border-t border-[var(--border)] px-4 py-4">
                  <ol className="space-y-2 text-xs text-[var(--text-secondary)] list-decimal list-inside">
                    <li>
                      Sign in to{' '}
                      <span className="font-medium text-[var(--text-primary)]">ads.google.com</span>
                    </li>
                    <li>
                      In the left menu, click{' '}
                      <span className="font-medium text-[var(--text-primary)]">Insights &amp; reports</span>, then{' '}
                      <span className="font-medium text-[var(--text-primary)]">Search terms</span>
                    </li>
                    <li>
                      Set your date range (we recommend at least 30 days for best results)
                    </li>
                    <li>
                      Click the{' '}
                      <span className="font-medium text-[var(--text-primary)]">Download</span>{' '}
                      icon (arrow pointing down) in the toolbar above the table
                    </li>
                    <li>
                      Select <span className="font-medium text-[var(--text-primary)]">.csv</span> as the format
                    </li>
                    <li>Upload or paste the downloaded file here</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* ── Results ── */}
          {result && (
            <div className="space-y-6">
              {/* Was Limited Banner */}
              {result.wasLimited && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800 flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm text-amber-300">
                    Your report had more than 500 terms. We analyzed the top 500 by spend. Try the AI Interview for a complete analysis.
                  </p>
                </div>
              )}

              {/* Summary Card */}
              <div className={`rounded-xl border p-6 ${healthScoreBg(result.healthScore)}`}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Health Score</p>
                    <p className={`text-4xl font-bold ${healthScoreColor(result.healthScore)}`}>{result.healthScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Total Spend</p>
                    <p className="text-4xl font-bold text-[var(--text-primary)]">{formatCurrency(result.accountStats.totalSpend)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Wasted Spend</p>
                    <p className="text-4xl font-bold text-red-500">{formatCurrency(result.totalWastedSpend)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Waste %</p>
                    <p className="text-4xl font-bold text-[var(--text-primary)]">{result.wastePercentage}%</p>
                  </div>
                </div>

                {/* AI Summary */}
                {result.summary && (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {result.summary}
                  </p>
                )}

                {/* Key Insights */}
                {result.keyInsights && result.keyInsights.length > 0 && (
                  <div className="space-y-2">
                    {result.keyInsights.map((insight, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--accent-glow)] border border-teal-800">
                        <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        <p className="text-sm text-teal-300">{insight}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Classified Terms */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--border)]">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Classified Search Terms</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {result.accountStats.totalTerms} terms analyzed. Select wasteful and underperforming terms to add as negatives.
                  </p>
                </div>

                {/* Tab bar */}
                <div className="flex border-b border-[var(--border)]">
                  <button
                    onClick={() => setActiveTermTab('wasteful')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTermTab === 'wasteful'
                        ? 'text-red-400 border-b-2 border-red-400 bg-red-950/10'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    Wasteful ({wastefulTerms.length})
                  </button>
                  <button
                    onClick={() => setActiveTermTab('underperforming')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTermTab === 'underperforming'
                        ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-950/10'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    Underperforming ({underperformingTerms.length})
                  </button>
                  <button
                    onClick={() => setActiveTermTab('good')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTermTab === 'good'
                        ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-950/10'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    Good ({goodTerms.length})
                  </button>
                </div>

                {/* Select All bar (wasteful/underperforming only) */}
                {(activeTermTab === 'wasteful' || activeTermTab === 'underperforming') && (
                  <div className="px-6 py-2 bg-[var(--bg-tertiary)] flex items-center gap-4 border-b border-[var(--border)]">
                    <button
                      onClick={() => {
                        if (!result) return;
                        const targetClass = activeTermTab;
                        const updated = result.classifiedTerms.map((t) =>
                          t.classification === targetClass ? { ...t, checked: true } : t
                        );
                        setResult({ ...result, classifiedTerms: updated });
                      }}
                      className="text-xs font-medium text-[var(--accent)] hover:underline"
                    >
                      Select All {activeTermTab === 'wasteful' ? 'Wasteful' : 'Underperforming'}
                    </button>
                    <button
                      onClick={() => {
                        if (!result) return;
                        const targetClass = activeTermTab;
                        const updated = result.classifiedTerms.map((t) =>
                          t.classification === targetClass ? { ...t, checked: false } : t
                        );
                        setResult({ ...result, classifiedTerms: updated });
                      }}
                      className="text-xs font-medium text-[var(--text-muted)] hover:underline"
                    >
                      Deselect All
                    </button>
                    <span className="text-xs text-[var(--text-muted)] ml-auto">
                      {result.classifiedTerms.filter(
                        (t) => t.classification === activeTermTab && t.checked
                      ).length}{' '}
                      selected
                    </span>
                  </div>
                )}

                {/* Terms list */}
                {(() => {
                  const terms =
                    activeTermTab === 'wasteful'
                      ? wastefulTerms
                      : activeTermTab === 'underperforming'
                      ? underperformingTerms
                      : goodTerms;

                  if (terms.length === 0) {
                    return (
                      <p className="px-6 py-4 text-sm text-[var(--text-muted)]">
                        No {activeTermTab} terms found.
                      </p>
                    );
                  }

                  return (
                    <>
                      {/* Table header */}
                      <div className="hidden sm:grid grid-cols-12 gap-2 px-6 py-2 bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border)]">
                        {(activeTermTab === 'wasteful' || activeTermTab === 'underperforming') && (
                          <div className="col-span-1" />
                        )}
                        <div className={activeTermTab === 'good' ? 'col-span-3' : 'col-span-2'}>Term</div>
                        <div className="col-span-1">Badge</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-1 text-right">Cost</div>
                        <div className="col-span-1 text-right">Clicks</div>
                        <div className="col-span-1 text-right">Conv.</div>
                        <div className={activeTermTab === 'good' ? 'col-span-3' : 'col-span-3'}>Reason</div>
                      </div>

                      <div className="divide-y divide-[var(--border)] max-h-[500px] overflow-y-auto">
                        {terms.map((term) => {
                          const globalIdx = result!.classifiedTerms.indexOf(term);
                          const showCheckbox = activeTermTab === 'wasteful' || activeTermTab === 'underperforming';

                          return (
                            <div key={globalIdx} className="px-6 py-3 hover:bg-[var(--bg-tertiary)]">
                              {/* Desktop row */}
                              <div className="hidden sm:grid grid-cols-12 gap-2 items-start">
                                {showCheckbox && (
                                  <div className="col-span-1">
                                    <input
                                      type="checkbox"
                                      checked={term.checked}
                                      onChange={() => toggleTerm(globalIdx)}
                                      className="mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                    />
                                  </div>
                                )}
                                <div className={showCheckbox ? 'col-span-2' : 'col-span-3'}>
                                  <span className="text-sm font-medium text-[var(--text-primary)]">{term.term}</span>
                                </div>
                                <div className="col-span-1">
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded border ${classificationColor(term.classification)}`}>
                                    {term.classification}
                                  </span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-2 py-0.5 rounded">
                                    {term.category}
                                  </span>
                                </div>
                                <div className="col-span-1 text-right">
                                  <span className="text-sm text-[var(--text-secondary)]">{formatCurrency(term.cost)}</span>
                                </div>
                                <div className="col-span-1 text-right">
                                  <span className="text-sm text-[var(--text-secondary)]">{term.clicks}</span>
                                </div>
                                <div className="col-span-1 text-right">
                                  <span className="text-sm text-[var(--text-secondary)]">{term.conversions}</span>
                                </div>
                                <div className="col-span-3">
                                  <p className="text-xs text-[var(--text-muted)]">{term.reason}</p>
                                </div>
                              </div>

                              {/* Mobile row */}
                              <div className="sm:hidden flex items-start gap-3">
                                {showCheckbox && (
                                  <input
                                    type="checkbox"
                                    checked={term.checked}
                                    onChange={() => toggleTerm(globalIdx)}
                                    className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-[var(--text-primary)]">{term.term}</span>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded border ${classificationColor(term.classification)}`}>
                                      {term.classification}
                                    </span>
                                    <span className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-2 py-0.5 rounded">
                                      {term.category}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-[var(--text-muted)]">Cost: {formatCurrency(term.cost)}</span>
                                    <span className="text-xs text-[var(--text-muted)]">Clicks: {term.clicks}</span>
                                    <span className="text-xs text-[var(--text-muted)]">Conv: {term.conversions}</span>
                                  </div>
                                  <p className="text-xs text-[var(--text-muted)] mt-1">{term.reason}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Negative Recommendations */}
              {result.negativeRecommendations.length > 0 && (
                <CollapsibleSection title="Negative Keyword Recommendations" count={result.negativeRecommendations.length}>
                  {/* Group: From Search Terms */}
                  {(() => {
                    const fromSearch = recsBySource('search_terms');
                    const fromPattern = [...recsBySource('pattern'), ...recsBySource('industry')];

                    return (
                      <div className="divide-y divide-[var(--border)]">
                        {fromSearch.length > 0 && (
                          <div>
                            <div className="px-6 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border)]">
                              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                From Your Search Terms
                              </span>
                            </div>
                            <div className="divide-y divide-[var(--border)]">
                              {fromSearch.map((rec) => {
                                const globalIdx = result.negativeRecommendations.indexOf(rec);
                                return (
                                  <div key={globalIdx} className="px-6 py-3 flex items-start gap-3 hover:bg-[var(--bg-tertiary)]">
                                    <input
                                      type="checkbox"
                                      checked={rec.checked}
                                      onChange={() => toggleRec(globalIdx)}
                                      className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-medium text-[var(--text-primary)]">{rec.keyword}</span>
                                        <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                          {rec.matchType}
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                          {rec.category}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded border ${priorityColor(rec.priority)}`}>
                                          {rec.priority}
                                        </span>
                                      </div>
                                      <p className="text-xs text-[var(--text-muted)] mt-1">{rec.reason}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {fromPattern.length > 0 && (
                          <div>
                            <div className="px-6 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border)]">
                              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                Industry Patterns
                              </span>
                            </div>
                            <div className="divide-y divide-[var(--border)]">
                              {fromPattern.map((rec) => {
                                const globalIdx = result.negativeRecommendations.indexOf(rec);
                                return (
                                  <div key={globalIdx} className="px-6 py-3 flex items-start gap-3 hover:bg-[var(--bg-tertiary)]">
                                    <input
                                      type="checkbox"
                                      checked={rec.checked}
                                      onChange={() => toggleRec(globalIdx)}
                                      className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-medium text-[var(--text-primary)]">{rec.keyword}</span>
                                        <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                          {rec.matchType}
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                          {rec.category}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded border ${priorityColor(rec.priority)}`}>
                                          {rec.priority}
                                        </span>
                                      </div>
                                      <p className="text-xs text-[var(--text-muted)] mt-1">{rec.reason}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </CollapsibleSection>
              )}

              {/* Existing Negative Issues */}
              {result.existingNegativeIssues.length > 0 && (
                <CollapsibleSection title="Issues with Current Negatives" count={result.existingNegativeIssues.length}>
                  <div className="divide-y divide-[var(--border)]">
                    {result.existingNegativeIssues.map((issue, i) => (
                      <div key={i} className="px-6 py-3 hover:bg-[var(--bg-tertiary)]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-[var(--text-primary)]">{issue.keyword}</span>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                            {issue.matchType}
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded border ${severityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                            {issueLabel(issue.issue)}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{issue.reason}</p>
                        {issue.suggestedFix && (
                          <p className="text-xs text-emerald-400 mt-1">
                            Suggested fix: {issue.suggestedFix}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              )}

              {/* Download Actions */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Download Selected Negatives
                  </h3>
                  <span className="text-xs text-[var(--text-muted)]">
                    {selectedCount} keywords selected
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => gatedDownload(downloadGoogleAdsCsv)}
                    disabled={selectedCount === 0}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <DownloadIcon />
                    Download Selected Negatives (Google Ads)
                  </button>
                  <button
                    onClick={() => gatedDownload(downloadEditorCsv)}
                    disabled={selectedCount === 0}
                    className="flex-1 py-2.5 px-4 rounded-lg border border-[var(--accent)] text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <DownloadIcon />
                    Download for Google Ads Editor
                  </button>
                </div>
              </div>

              {/* How to Upload Instructions */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
                <button
                  onClick={() => setInstructionsOpen(!instructionsOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${instructionsOpen ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      How to Upload to Google Ads
                    </h3>
                  </div>
                </button>
                {instructionsOpen && (
                  <div className="border-t border-[var(--border)] px-6 py-5 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                        Option 1: Google Ads Web Interface
                      </h4>
                      <ol className="space-y-2 text-sm text-[var(--text-secondary)] list-decimal list-inside">
                        <li>
                          Sign in to your Google Ads account at{' '}
                          <span className="font-medium text-[var(--text-primary)]">ads.google.com</span>
                        </li>
                        <li>
                          Click <span className="font-medium text-[var(--text-primary)]">Tools &amp; Settings</span>{' '}
                          (wrench icon) in the top navigation
                        </li>
                        <li>
                          Under <span className="font-medium text-[var(--text-primary)]">Shared Library</span>,
                          select{' '}
                          <span className="font-medium text-[var(--text-primary)]">Negative keyword lists</span>
                        </li>
                        <li>
                          Click the <span className="font-medium text-[var(--text-primary)]">+</span> button to
                          create a new list, or select an existing list to edit
                        </li>
                        <li>
                          Click <span className="font-medium text-[var(--text-primary)]">Upload</span> and choose
                          the downloaded CSV file
                        </li>
                        <li>
                          Review the keywords, then click{' '}
                          <span className="font-medium text-[var(--text-primary)]">Save</span>
                        </li>
                        <li>
                          Apply the list to your campaigns by selecting the list and clicking{' '}
                          <span className="font-medium text-[var(--text-primary)]">Apply to campaigns</span>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                        Option 2: Google Ads Editor
                      </h4>
                      <ol className="space-y-2 text-sm text-[var(--text-secondary)] list-decimal list-inside">
                        <li>
                          Open{' '}
                          <span className="font-medium text-[var(--text-primary)]">Google Ads Editor</span> and
                          download your latest account data
                        </li>
                        <li>
                          Go to{' '}
                          <span className="font-medium text-[var(--text-primary)]">
                            Account &gt; Import &gt; Import from file
                          </span>
                        </li>
                        <li>
                          Select the{' '}
                          <span className="font-medium text-[var(--text-primary)]">
                            &quot;Download for Google Ads Editor&quot;
                          </span>{' '}
                          CSV you downloaded
                        </li>
                        <li>Review the proposed changes in the editor</li>
                        <li>
                          Click <span className="font-medium text-[var(--text-primary)]">Post</span> to push
                          changes to your account
                        </li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    </ToolModeToggle>
  );
}
