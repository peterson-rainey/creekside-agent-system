import type { Metadata } from "next";
import "./globals.css";
import NavTabs from '@/components/NavTabs';

export const metadata: Metadata = {
  title: "Creekside Command Center",
  description: "Internal reporting dashboard for Creekside Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      {/* suppressHydrationWarning: prevents false errors from browser extensions (Grammarly, etc.) injecting attributes into <body> */}
      <body suppressHydrationWarning>
        <nav className="bg-[var(--creekside-navy)] border-b border-white/10">
          <div className="max-w-[1600px] mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--creekside-blue)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <div>
                <h1 className="text-base font-semibold text-white tracking-tight">Command Center</h1>
                <p className="text-xs text-slate-400">Creekside Marketing</p>
              </div>
            </div>
            <NavTabs />
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">Internal Dashboard</span>
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-xs text-slate-300 font-medium">PR</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-[1600px] mx-auto px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
