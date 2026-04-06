import type { Metadata } from 'next';
import NavTabs from '@/components/NavTabs';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Creekside Internal Dashboard',
    template: '%s | Creekside Dashboard',
  },
  description: 'Internal client tracker for Creekside Marketing.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <div className="min-h-screen bg-[var(--bg-primary)]">
          <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <span className="text-[var(--text-primary)] font-semibold hidden sm:inline">
                  Creekside Dashboard
                </span>
              </div>
              <NavTabs />
            </div>
          </nav>
          <main className="px-4 sm:px-6 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
