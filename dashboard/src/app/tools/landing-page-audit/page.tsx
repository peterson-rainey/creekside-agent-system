'use client';

import Link from 'next/link';
import { AuditProvider } from '@/lib/context/landing-page-audit-context';
import { AuditInputPanel } from '@/components/landing-page-audit/AuditInputPanel';
import { AuditResultsPanel } from '@/components/landing-page-audit/AuditResultsPanel';

export default function LandingPageAuditPage() {
  return (
    <AuditProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 mr-4">
              <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">CM</span>
              </div>
              <span className="text-[var(--text-primary)] text-sm font-medium hidden sm:inline">Creekside</span>
            </Link>
            <span className="text-[var(--text-secondary)] text-sm font-medium">Landing Page Audit</span>
          </div>
          <a
            href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white bg-[var(--accent)] rounded-lg hover:brightness-110 transition-all"
          >
            Get a Free Audit
          </a>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row flex-1 bg-[var(--bg-primary)]">
          <AuditInputPanel />
          <AuditResultsPanel />
        </div>
      </div>
    </AuditProvider>
  );
}
