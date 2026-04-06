'use client';

import { useState, useRef, useCallback } from 'react';
import { ToolModeToggle } from '@/components/ai-interview/ToolModeToggle';

// ── Types ──────────────────────────────────────────────────────────────────

type UploadType = 'search_terms' | 'negative_keywords';

interface MissingKeyword {
  keyword: string;
  matchType: string;
  category: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  checked: boolean;
}

interface UnnecessaryKeyword {
  keyword: string;
  matchType: string;
  reason: string;
  severity: 'critical' | 'warning' | 'info';
  checked: boolean;
}

interface MatchTypeRec {
  keyword: string;
  currentMatchType: string;
  suggestedMatchType: string;
  reason: string;
}

interface WastefulTerm {
  searchTerm: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  cost: number;
  clicks: number;
  reason: string;
  suggestedMatchType: string;
  checked: boolean;
}

interface ClaudeInsights {
  summary: string;
  warnings?: string[];
  industryTips?: string[];
  businessSpecificNegatives?: { keyword: string; matchType: string; reason: string; checked: boolean }[];
}

interface NegativeKeywordResult {
  mode: 'negative_keywords';
  healthScore: number;
  totalAnalyzed: number;
  issuesFound: number;
  detectedIndustry: string;
  claudeInsights?: ClaudeInsights;
  parsedKeywords?: { keyword: string; matchType: string }[];
  missing: MissingKeyword[];
  unnecessary: UnnecessaryKeyword[];
  matchTypeChanges: MatchTypeRec[];
}

interface SearchTermResult {
  mode: 'search_terms';
  healthScore: number;
  termCount: number;
  totalSpendAnalyzed: number;
  totalWastedSpend: number;
  wastePercentage: number;
  detectedIndustry: string;
  claudeInsights?: ClaudeInsights;
  wastefulTerms: WastefulTerm[];
}

type AnalysisResult = NegativeKeywordResult | SearchTermResult;

// ── Helpers ────────────────────────────────────────────────────────────────

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

// ── Collapsible Section ────────────────────────────────────────────────────

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

// ── Email Gate Modal ───────────────────────────────────────────────────────

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

// ── Spinner ────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── Download Icon ──────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function NegativeKeywordAnalyzer() {
  const [uploadType, setUploadType] = useState<UploadType>('search_terms');
  const [keywordText, setKeywordText] = useState('');
  const [url, setUrl] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [showManualDescription, setShowManualDescription] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<(() => void) | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── File handling ──

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      setError('Please upload a .csv or .txt file');
      return;
    }
    setFileName(file.name);
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setKeywordText(e.target?.result as string);
    };
    reader.readAsText(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const onFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) handleFile(e.target.files[0]);
    },
    [handleFile]
  );

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

    // Capture lead (non-blocking — don't delay the download)
    fetch('/api/tools/negative-keywords/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        industry: result && 'detectedIndustry' in result ? result.detectedIndustry : null,
        uploadType: result && 'mode' in result ? result.mode : null,
        healthScore: result?.healthScore ?? null,
      }),
    }).catch(() => {}); // silently ignore failures

    if (pendingDownload) {
      pendingDownload();
      setPendingDownload(null);
    }
  };

  // ── Analysis ──

  const analyze = async () => {
    if (!keywordText.trim()) {
      setError(
        uploadType === 'search_terms'
          ? 'Please provide your search term report'
          : 'Please provide your negative keyword list'
      );
      return;
    }
    if (!url.trim()) {
      setError('Please enter your website URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setShowManualDescription(false);

    try {
      // Step 1: Scrape website
      const scrapeRes = await fetch('/api/tools/negative-keywords/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      let scrapeData = null;
      if (!scrapeRes.ok) {
        const body = await scrapeRes.json().catch(() => null);
        // If scrape fails, show manual description fallback instead of hard-erroring
        if (!manualDescription.trim()) {
          setShowManualDescription(true);
          setLoading(false);
          setError(body?.error || 'We couldn\'t read your website. Please describe your business below so we can still analyze your keywords.');
          return;
        }
      } else {
        scrapeData = await scrapeRes.json();

        // Check if scrape returned too few keywords (< 5)
        const extractedCount = scrapeData?.keywords?.length ?? 0;
        if (extractedCount < 5 && !manualDescription.trim()) {
          setShowManualDescription(true);
          setLoading(false);
          setError('We couldn\'t fully read your website. Please describe your business below for better results.');
          return;
        }
      }

      // Step 2: Analyze
      const competitorList = competitors
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      const analyzeRes = await fetch('/api/tools/negative-keywords/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: keywordText.trim(),
          siteContext: scrapeData,
          competitors: competitorList.length > 0 ? competitorList : undefined,
          manualDescription: manualDescription.trim() || undefined,
          uploadType,
        }),
      });

      if (!analyzeRes.ok) {
        const body = await analyzeRes.json().catch(() => null);
        throw new Error(body?.error || 'Analysis failed. Please try again.');
      }

      const data = await analyzeRes.json();

      // Initialize checkbox state based on response mode
      data.mode = data.uploadType || (data.wastefulTerms ? 'search_terms' : 'negative_keywords');
      if (data.mode === 'search_terms') {
        data.wastefulTerms = data.wastefulTerms.map((t: WastefulTerm) => ({ ...t, checked: true }));
        if (data.claudeInsights?.businessSpecificNegatives) {
          data.claudeInsights.businessSpecificNegatives = data.claudeInsights.businessSpecificNegatives.map(
            (n: { keyword: string; matchType: string; reason: string }) => ({ ...n, checked: true })
          );
        }
      } else {
        data.missing = (data.missing || []).map((k: MissingKeyword) => ({ ...k, checked: true }));
        data.unnecessary = (data.unnecessary || []).map((k: UnnecessaryKeyword) => ({ ...k, checked: false }));
        if (data.claudeInsights?.businessSpecificNegatives) {
          data.claudeInsights.businessSpecificNegatives = data.claudeInsights.businessSpecificNegatives.map(
            (n: { keyword: string; matchType: string; reason: string }) => ({ ...n, checked: true })
          );
        }
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ── Toggle helpers ──

  const toggleWasteful = (idx: number) => {
    if (!result || result.mode !== 'search_terms') return;
    const updated = [...result.wastefulTerms];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setResult({ ...result, wastefulTerms: updated });
  };

  const toggleMissing = (idx: number) => {
    if (!result || result.mode !== 'negative_keywords') return;
    const updated = [...result.missing];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setResult({ ...result, missing: updated });
  };

  const toggleUnnecessary = (idx: number) => {
    if (!result || result.mode !== 'negative_keywords') return;
    const updated = [...result.unnecessary];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setResult({ ...result, unnecessary: updated });
  };

  const toggleAiNegative = (idx: number) => {
    if (!result || !result.claudeInsights?.businessSpecificNegatives) return;
    const updated = [...result.claudeInsights.businessSpecificNegatives];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setResult({
      ...result,
      claudeInsights: { ...result.claudeInsights, businessSpecificNegatives: updated },
    });
  };

  // ── CSV downloads ──

  // Extract just the keyword from each line, handling multi-column CSV and TSV formats
  const extractKeyword = (line: string): string => {
    // Handle Google Ads Editor TSV format: Campaign\tAd Group\tKeyword\tCriterion Type
    if (line.includes('\t')) {
      const parts = line.split('\t').map(p => p.trim());
      // Find the keyword column — it's the one before Criterion Type, or the second-to-last meaningful column
      const criterionIdx = parts.findIndex(p => /^negative (broad|phrase|exact)$/i.test(p));
      if (criterionIdx > 0) {
        const kw = parts[criterionIdx - 1];
        return kw.replace(/^\[|\]$/g, '').replace(/^"|"$/g, '');
      }
      // Fallback: if no criterion type column, take column with most word-like content
      const kw = parts.find(p => p.length > 0 && !/^(negative |campaign|ad group)/i.test(p)) || parts[0];
      return kw.replace(/^\[|\]$/g, '').replace(/^"|"$/g, '');
    }
    // Handle CSV rows with commas
    if (line.includes(',')) {
      const first = line.split(',')[0].trim();
      return first.replace(/^\[|\]$/g, '').replace(/^"|"$/g, '');
    }
    // Plain text format
    return line.replace(/^\[|\]$/g, '').replace(/^"|"$/g, '');
  };

  const parseExistingKeywords = (): string[] => {
    return keywordText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !/^(keyword|criteria|campaign|ad group|account|match type|criterion type|negative|report|date range)/i.test(l));
  };

  const getAiNegatives = (): { keyword: string; matchType: string }[] => {
    if (!result?.claudeInsights?.businessSpecificNegatives) return [];
    return result.claudeInsights.businessSpecificNegatives
      .filter((n) => n.checked)
      .map((n) => ({ keyword: n.keyword, matchType: n.matchType }));
  };

  // -- Search Term mode downloads --

  const downloadSearchTermGoogleAdsCsv = () => {
    if (!result || result.mode !== 'search_terms') return;

    const checked = result.wastefulTerms.filter((t) => t.checked);
    const aiNegs = getAiNegatives();

    const lines = checked.map((t) => {
      if (t.suggestedMatchType === 'Exact') return `[${t.searchTerm}]`;
      if (t.suggestedMatchType === 'Phrase') return `"${t.searchTerm}"`;
      return t.searchTerm;
    });

    const aiLines = aiNegs.map((n) => {
      if (n.matchType === 'Exact') return `[${n.keyword}]`;
      if (n.matchType === 'Phrase') return `"${n.keyword}"`;
      return n.keyword;
    });

    const csv = 'Keyword\n' + [...lines, ...aiLines].join('\n');
    downloadBlob(csv, 'negative_keywords_from_search_terms.csv', 'text/csv');
  };

  const downloadSearchTermEditorCsv = () => {
    if (!result || result.mode !== 'search_terms') return;

    const checked = result.wastefulTerms.filter((t) => t.checked);
    const aiNegs = getAiNegatives();

    const header = 'Campaign\tAd Group\tKeyword\tCriterion Type';
    const rows = checked.map((t) => {
      const mt = t.suggestedMatchType || 'Broad';
      return `\t\t${t.searchTerm}\tNegative ${mt.toLowerCase()}`;
    });

    const aiRows = aiNegs.map((n) => {
      const mt = n.matchType || 'Broad';
      return `\t\t${n.keyword}\tNegative ${mt.toLowerCase()}`;
    });

    const csv = header + '\n' + [...rows, ...aiRows].join('\n');
    downloadBlob(csv, 'negative_keywords_editor_from_search_terms.csv', 'text/csv');
  };

  // -- Negative Keyword mode downloads --

  const downloadGoogleAdsCsv = () => {
    if (!result || result.mode !== 'negative_keywords') return;
    const existing = parseExistingKeywords();

    const toRemove = new Set(
      result.unnecessary.filter((k) => k.checked).map((k) => k.keyword.toLowerCase())
    );
    const kept = existing.filter((kw) => {
      const clean = extractKeyword(kw).toLowerCase();
      return !toRemove.has(clean);
    });

    const toAdd = result.missing
      .filter((k) => k.checked)
      .map((k) => {
        if (k.matchType === 'Exact') return `[${k.keyword}]`;
        if (k.matchType === 'Phrase') return `"${k.keyword}"`;
        return k.keyword;
      });

    const aiNegs = getAiNegatives().map((n) => {
      if (n.matchType === 'Exact') return `[${n.keyword}]`;
      if (n.matchType === 'Phrase') return `"${n.keyword}"`;
      return n.keyword;
    });

    const all = [...kept, ...toAdd, ...aiNegs];
    const csv = 'Keyword\n' + all.join('\n');
    downloadBlob(csv, 'negative_keywords_updated.csv', 'text/csv');
  };

  const downloadEditorCsv = () => {
    if (!result || result.mode !== 'negative_keywords') return;
    const existing = parseExistingKeywords();

    const toRemove = new Set(
      result.unnecessary.filter((k) => k.checked).map((k) => k.keyword.toLowerCase())
    );
    const kept = existing.filter((kw) => {
      const clean = extractKeyword(kw).toLowerCase();
      return !toRemove.has(clean);
    });

    const toAdd = result.missing
      .filter((k) => k.checked)
      .map((k) => {
        const mt = k.matchType || 'Broad';
        return `${k.keyword}\t${mt}`;
      });

    const aiNegs = getAiNegatives().map((n) => {
      const mt = n.matchType || 'Broad';
      return `${n.keyword}\t${mt}`;
    });

    const header = 'Campaign\tAd Group\tKeyword\tCriterion Type';
    const rows = kept.map((kw) => {
      let matchType = 'Broad';
      const clean = extractKeyword(kw);
      if (kw.startsWith('[') || kw.split(',')[0].trim().startsWith('[')) {
        matchType = 'Exact';
      } else if (kw.startsWith('"') || kw.split(',')[0].trim().startsWith('"')) {
        matchType = 'Phrase';
      }
      return `\t\t${clean}\tNegative ${matchType.toLowerCase()}`;
    });

    const addRows = toAdd.map((line) => {
      const [kw, mt] = line.split('\t');
      return `\t\t${kw}\tNegative ${mt.toLowerCase()}`;
    });

    const aiRows = aiNegs.map((line) => {
      const [kw, mt] = line.split('\t');
      return `\t\t${kw}\tNegative ${mt.toLowerCase()}`;
    });

    const csv = header + '\n' + [...rows, ...addRows, ...aiRows].join('\n');
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

  // ── Upload type labels ──

  const uploadLabel =
    uploadType === 'search_terms' ? 'Search Term Report' : 'Negative Keyword List';
  const uploadPlaceholder =
    uploadType === 'search_terms'
      ? `Paste your search term report data here...\nSearch term, Clicks, Cost, Conversions\nfree lawn care tips, 45, 23.50, 0\ncheap landscaping near me, 32, 18.75, 0`
      : `One keyword per line, e.g.:\nfree\n[cheap services]\n"discount coupon"`;
  const dropZoneLabel =
    uploadType === 'search_terms'
      ? 'search term report'
      : 'negative keyword list';

  // ── Render ───────────────────────────────────────────────────────────────

  const toolContext = result ? {
    uploadType,
    healthScore: 'healthScore' in result ? result.healthScore : undefined,
    detectedIndustry: result.detectedIndustry,
    issuesFound: 'issuesFound' in result ? result.issuesFound : undefined,
    termCount: 'termCount' in result ? result.termCount : undefined,
    wastePercentage: 'wastePercentage' in result ? result.wastePercentage : undefined,
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
              Upload a Search Term Report to find wasteful spend, or upload your existing negative keyword
              list for a health check. We&apos;ll analyze it using your website context and recommend
              improvements.
            </p>
          </div>

          {/* Upload Type Toggle */}
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-1.5 inline-flex">
            <button
              onClick={() => {
                setUploadType('search_terms');
                setResult(null);
                setError('');
              }}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadType === 'search_terms'
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              Search Term Report
            </button>
            <button
              onClick={() => {
                setUploadType('negative_keywords');
                setResult(null);
                setError('');
              }}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                uploadType === 'negative_keywords'
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              Negative Keyword List
            </button>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: File Upload / Paste */}
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6 space-y-4">
              <label className="text-sm font-medium text-[var(--text-secondary)]">{uploadLabel}</label>

              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
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
                  onChange={onFileInput}
                />
                <svg
                  className="w-8 h-8 mx-auto text-[var(--text-muted)] mb-2"
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
                  <p className="text-sm text-[var(--text-secondary)] font-medium">{fileName}</p>
                ) : (
                  <>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Drag & drop your <span className="font-medium text-[var(--text-primary)]">{dropZoneLabel}</span>{' '}
                      (<span className="font-medium text-[var(--text-primary)]">.csv</span> or <span className="font-medium text-[var(--text-primary)]">.txt</span>)
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">or click to browse</p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">or paste below</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <textarea
                value={keywordText}
                onChange={(e) => {
                  setKeywordText(e.target.value);
                  setFileName('');
                }}
                rows={8}
                placeholder={uploadPlaceholder}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-y"
              />
            </div>

            {/* Right: URL + Competitors + Analyze */}
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6 flex flex-col">
              <label className="text-sm font-medium text-[var(--text-secondary)] mb-2">Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
              <p className="text-xs text-[var(--text-muted)] mt-2">
                We&apos;ll scan your site to understand your business and tailor our recommendations.
              </p>

              {/* Competitor Brands */}
              <div className="mt-4">
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
              </div>

              {/* Manual Description Fallback */}
              {showManualDescription && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
                    Describe Your Business
                  </label>
                  <textarea
                    value={manualDescription}
                    onChange={(e) => setManualDescription(e.target.value)}
                    rows={4}
                    placeholder="We couldn't fully read your website. Please describe what your business does, the services you offer, and your target customers..."
                    className="w-full rounded-lg border border-amber-700 bg-amber-950/30 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-y"
                  />
                </div>
              )}

              <div className="mt-auto pt-6">
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-950/30 border border-red-800 text-sm text-red-400">
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

          {/* ── Results ── */}
          {result && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className={`rounded-xl border p-6 ${healthScoreBg(result.healthScore)}`}>
                {result.mode === 'search_terms' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Health Score</p>
                      <p className={`text-4xl font-bold ${healthScoreColor(result.healthScore)}`}>{result.healthScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Terms Analyzed</p>
                      <p className="text-4xl font-bold text-[var(--text-primary)]">{result.termCount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Wasted Spend</p>
                      <p className="text-4xl font-bold text-red-500">{formatCurrency(result.totalWastedSpend)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Waste %</p>
                      <p className="text-4xl font-bold text-[var(--text-primary)]">{result.wastePercentage}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Industry</p>
                      <p className="text-lg font-semibold text-[var(--text-primary)] mt-2">{result.detectedIndustry}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Health Score</p>
                      <p className={`text-4xl font-bold ${healthScoreColor(result.healthScore)}`}>{result.healthScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Keywords Analyzed</p>
                      <p className="text-4xl font-bold text-[var(--text-primary)]">{result.totalAnalyzed}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Issues Found</p>
                      <p className="text-4xl font-bold text-[var(--text-primary)]">{result.issuesFound}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">Detected Industry</p>
                      <p className="text-lg font-semibold text-[var(--text-primary)] mt-2">{result.detectedIndustry}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Claude Insights */}
              {result.claudeInsights && (
                <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[var(--border)] flex items-center gap-2">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">AI Analysis</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Summary */}
                    {result.claudeInsights.summary && (
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {result.claudeInsights.summary}
                      </p>
                    )}

                    {/* Warnings */}
                    {result.claudeInsights.warnings && result.claudeInsights.warnings.length > 0 && (
                      <div className="space-y-2">
                        {result.claudeInsights.warnings.map((w, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-950/30 border border-amber-800">
                            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className="text-sm text-amber-300">{w}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Industry Tips */}
                    {result.claudeInsights.industryTips && result.claudeInsights.industryTips.length > 0 && (
                      <div className="space-y-2">
                        {result.claudeInsights.industryTips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--accent-glow)] border border-teal-800">
                            <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <p className="text-sm text-teal-300">{tip}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* AI-Recommended Negatives */}
                    {result.claudeInsights.businessSpecificNegatives &&
                      result.claudeInsights.businessSpecificNegatives.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">AI-Recommended Negatives</h4>
                          <div className="divide-y divide-[var(--border)] border border-[var(--border)] rounded-lg overflow-hidden">
                            {result.claudeInsights.businessSpecificNegatives.map((neg, i) => (
                              <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-[var(--bg-tertiary)]">
                                <input
                                  type="checkbox"
                                  checked={neg.checked}
                                  onChange={() => toggleAiNegative(i)}
                                  className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-[var(--text-primary)]">{neg.keyword}</span>
                                    <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                      {neg.matchType}
                                    </span>
                                  </div>
                                  <p className="text-xs text-[var(--text-muted)] mt-1">{neg.reason}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* ── Search Term Mode Results ── */}
              {result.mode === 'search_terms' && (
                <CollapsibleSection title="Wasteful Search Terms" count={result.wastefulTerms.length}>
                  {result.wastefulTerms.length === 0 ? (
                    <p className="px-6 py-4 text-sm text-[var(--text-muted)]">No wasteful search terms found.</p>
                  ) : (
                    <>
                      {/* Select All / Deselect All */}
                      <div className="px-6 py-2 bg-[var(--bg-tertiary)] flex items-center gap-4 border-b border-[var(--border)]">
                        <button
                          onClick={() => {
                            const updated = result.wastefulTerms.map((t) => ({ ...t, checked: true }));
                            setResult({ ...result, wastefulTerms: updated });
                          }}
                          className="text-xs font-medium text-[var(--accent)] hover:underline"
                        >
                          Select All
                        </button>
                        <button
                          onClick={() => {
                            const updated = result.wastefulTerms.map((t) => ({ ...t, checked: false }));
                            setResult({ ...result, wastefulTerms: updated });
                          }}
                          className="text-xs font-medium text-[var(--text-muted)] hover:underline"
                        >
                          Deselect All
                        </button>
                        <span className="text-xs text-[var(--text-muted)] ml-auto">
                          {result.wastefulTerms.filter((t) => t.checked).length} selected
                        </span>
                      </div>

                      {/* Table header */}
                      <div className="hidden sm:grid grid-cols-12 gap-2 px-6 py-2 bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border)]">
                        <div className="col-span-1" />
                        <div className="col-span-3">Search Term</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-1">Priority</div>
                        <div className="col-span-1 text-right">Cost</div>
                        <div className="col-span-1 text-right">Clicks</div>
                        <div className="col-span-3">Reason</div>
                      </div>

                      <div className="divide-y divide-[var(--border)]">
                        {result.wastefulTerms.map((term, i) => (
                          <div key={i} className="px-6 py-3 hover:bg-[var(--bg-tertiary)]">
                            {/* Desktop row */}
                            <div className="hidden sm:grid grid-cols-12 gap-2 items-start">
                              <div className="col-span-1">
                                <input
                                  type="checkbox"
                                  checked={term.checked}
                                  onChange={() => toggleWasteful(i)}
                                  className="mt-0.5 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                />
                              </div>
                              <div className="col-span-3">
                                <span className="text-sm font-medium text-[var(--text-primary)]">{term.searchTerm}</span>
                              </div>
                              <div className="col-span-2">
                                <span className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-2 py-0.5 rounded">{term.category}</span>
                              </div>
                              <div className="col-span-1">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded border ${priorityColor(term.priority)}`}>
                                  {term.priority}
                                </span>
                              </div>
                              <div className="col-span-1 text-right">
                                <span className="text-sm text-[var(--text-secondary)]">{formatCurrency(term.cost)}</span>
                              </div>
                              <div className="col-span-1 text-right">
                                <span className="text-sm text-[var(--text-secondary)]">{term.clicks}</span>
                              </div>
                              <div className="col-span-3">
                                <p className="text-xs text-[var(--text-muted)]">{term.reason}</p>
                              </div>
                            </div>

                            {/* Mobile row */}
                            <div className="sm:hidden flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={term.checked}
                                onChange={() => toggleWasteful(i)}
                                className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-medium text-[var(--text-primary)]">{term.searchTerm}</span>
                                  <span className="text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] px-2 py-0.5 rounded">{term.category}</span>
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded border ${priorityColor(term.priority)}`}>
                                    {term.priority}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs text-[var(--text-muted)]">Cost: {formatCurrency(term.cost)}</span>
                                  <span className="text-xs text-[var(--text-muted)]">Clicks: {term.clicks}</span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-1">{term.reason}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CollapsibleSection>
              )}

              {/* ── Negative Keyword Mode Results ── */}
              {result.mode === 'negative_keywords' && (
                <>
                  {/* Missing Negative Keywords */}
                  <CollapsibleSection title="Missing Negative Keywords" count={result.missing.length}>
                    {result.missing.length === 0 ? (
                      <p className="px-6 py-4 text-sm text-[var(--text-muted)]">No missing keywords found.</p>
                    ) : (
                      <div className="divide-y divide-[var(--border)]">
                        {result.missing.map((kw, i) => (
                          <div key={i} className="px-6 py-3 flex items-start gap-3 hover:bg-[var(--bg-tertiary)]">
                            <input
                              type="checkbox"
                              checked={kw.checked}
                              onChange={() => toggleMissing(i)}
                              className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-[var(--text-primary)]">{kw.keyword}</span>
                                <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                  {kw.matchType}
                                </span>
                                <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                  {kw.category}
                                </span>
                                <span
                                  className={`text-xs font-medium px-2 py-0.5 rounded border ${priorityColor(kw.priority)}`}
                                >
                                  {kw.priority}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)] mt-1">{kw.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CollapsibleSection>

                  {/* Potentially Unnecessary Keywords */}
                  <CollapsibleSection
                    title="Potentially Unnecessary Keywords"
                    count={result.unnecessary.length}
                  >
                    {result.unnecessary.length === 0 ? (
                      <p className="px-6 py-4 text-sm text-[var(--text-muted)]">
                        No unnecessary keywords detected.
                      </p>
                    ) : (
                      <div className="divide-y divide-[var(--border)]">
                        {result.unnecessary.map((kw, i) => (
                          <div key={i} className="px-6 py-3 flex items-start gap-3 hover:bg-[var(--bg-tertiary)]">
                            <input
                              type="checkbox"
                              checked={kw.checked}
                              onChange={() => toggleUnnecessary(i)}
                              className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-[var(--text-primary)]">{kw.keyword}</span>
                                <span
                                  className={`text-xs font-medium px-2 py-0.5 rounded border ${severityColor(kw.severity)}`}
                                >
                                  {kw.severity}
                                </span>
                              </div>
                              <p className="text-xs text-[var(--text-muted)] mt-1">{kw.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CollapsibleSection>

                  {/* Match Type Recommendations */}
                  <CollapsibleSection
                    title="Match Type Recommendations"
                    count={result.matchTypeChanges.length}
                  >
                    {result.matchTypeChanges.length === 0 ? (
                      <p className="px-6 py-4 text-sm text-[var(--text-muted)]">No match type changes suggested.</p>
                    ) : (
                      <div className="divide-y divide-[var(--border)]">
                        {result.matchTypeChanges.map((rec, i) => (
                          <div key={i} className="px-6 py-3 hover:bg-[var(--bg-tertiary)]">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-[var(--text-primary)]">{rec.keyword}</span>
                              <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                                {rec.currentMatchType}
                              </span>
                              <svg
                                className="w-4 h-4 text-[var(--text-muted)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                              <span className="text-xs font-medium text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800">
                                {rec.suggestedMatchType}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] mt-1">{rec.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CollapsibleSection>
                </>
              )}

              {/* Download Actions */}
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                  {result.mode === 'search_terms' ? 'Download Negative Keywords' : 'Download Updated List'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  {result.mode === 'search_terms' ? (
                    <>
                      <button
                        onClick={() => gatedDownload(downloadSearchTermGoogleAdsCsv)}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-light)] transition-colors flex items-center justify-center gap-2"
                      >
                        <DownloadIcon />
                        Download Negative Keywords (Google Ads)
                      </button>
                      <button
                        onClick={() => gatedDownload(downloadSearchTermEditorCsv)}
                        className="flex-1 py-2.5 px-4 rounded-lg border border-[var(--accent)] text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent-glow)] transition-colors flex items-center justify-center gap-2"
                      >
                        <DownloadIcon />
                        Download for Google Ads Editor
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => gatedDownload(downloadGoogleAdsCsv)}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-light)] transition-colors flex items-center justify-center gap-2"
                      >
                        <DownloadIcon />
                        Download Updated List (Google Ads)
                      </button>
                      <button
                        onClick={() => gatedDownload(downloadEditorCsv)}
                        className="flex-1 py-2.5 px-4 rounded-lg border border-[var(--accent)] text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent-glow)] transition-colors flex items-center justify-center gap-2"
                      >
                        <DownloadIcon />
                        Download for Google Ads Editor
                      </button>
                    </>
                  )}
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
