import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

async function getCalculationCount(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return 0;

  try {
    const supabase = createClient(url, key);
    const { count } = await supabase
      .from('roas_calculations')
      .select('*', { count: 'exact', head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export const revalidate = 3600;

interface ToolCard {
  title: string;
  description: string;
  href: string;
  status: 'live' | 'coming-soon';
  stats?: string;
}

export default async function ToolsHub() {
  const roasCount = await getCalculationCount();

  const tools: ToolCard[] = [
    {
      title: 'ROAS Calculator & Predictor',
      description:
        'See your real return before you spend a dollar. 3-scenario modeling, 5 spend models, AI-powered insights, and PDF reports.',
      href: '/roas-calculator',
      status: 'live',
      stats: roasCount > 0 ? `${roasCount.toLocaleString()} projections run` : undefined,
    },
    {
      title: 'Google Ads Account Grader',
      description:
        'Get a free health score for your Google Ads account with actionable recommendations.',
      href: '#',
      status: 'coming-soon',
    },
    {
      title: 'Meta Ads Account Grader',
      description:
        'Audit your Facebook & Instagram ad performance against industry benchmarks.',
      href: '#',
      status: 'coming-soon',
    },
    {
      title: 'Landing Page Grader',
      description:
        'Analyze your landing page speed, SEO, and conversion elements with Google PageSpeed data.',
      href: '#',
      status: 'coming-soon',
    },
    {
      title: 'Ad Budget Calculator',
      description:
        'Find out how much you should be spending on ads based on your revenue goals and industry.',
      href: '/tools/ad-budget-calculator',
      status: 'live',
    },
    {
      title: 'Negative Keyword Builder',
      description:
        'Upload your search terms report and get AI-generated negative keyword lists instantly.',
      href: '/tools/negative-keywords',
      status: 'live',
    },
    {
      title: 'Agency Hiring Checklist',
      description:
        'Interactive checklist of what to look for before hiring a PPC agency. Score agencies objectively.',
      href: '#',
      status: 'coming-soon',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">CM</span>
          </div>
          <span className="text-[var(--text-primary)] font-semibold hidden sm:inline">
            Creekside Marketing
          </span>
        </div>
        <a
          href="https://calendar.app.google/4ierPN3nNxLMMTAz7"
          className="text-sm text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors font-medium"
        >
          Book a Strategy Call
        </a>
      </nav>

      <main className="flex-1 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium text-[var(--accent)] bg-[var(--accent-glow)] border border-[var(--accent)]/20 rounded-full">
              100% Free — No Signup Required
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
              Free Marketing Tools
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              Built for business owners who want to make smarter ad spend decisions. No fluff, no
              gated PDFs — just real tools with real data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <div key={tool.title} className="relative">
                {tool.status === 'live' ? (
                  <Link
                    href={tool.href}
                    className="block h-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)]/40 hover:shadow-[0_0_20px_var(--accent-glow)] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-[var(--success)] bg-[var(--success)]/10">
                        Live
                      </span>
                      {tool.stats && (
                        <span className="text-xs text-[var(--text-muted)]">{tool.stats}</span>
                      )}
                    </div>
                    <h3 className="text-[var(--text-primary)] font-semibold mb-2">{tool.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-4 text-[var(--accent)] text-sm font-medium flex items-center gap-1">
                      Launch tool
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div className="block h-full bg-[var(--bg-secondary)] border border-[var(--border)]/50 rounded-xl p-5 opacity-60">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-[var(--text-muted)] bg-[var(--bg-tertiary)]">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-[var(--text-primary)] font-semibold mb-2">{tool.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--border)] px-6 py-6 text-center">
        <p className="text-[var(--text-muted)] text-xs">
          Built by Creekside Marketing · creeksidemarketingpros.com
        </p>
      </footer>
    </div>
  );
}
