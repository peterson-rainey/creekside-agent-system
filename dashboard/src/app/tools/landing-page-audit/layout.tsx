import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Landing Page Audit — Grade Your Page in 2 Minutes',
  description:
    'Score your landing page across 20+ conversion factors. Get a detailed audit report with prioritized recommendations to increase your conversion rate.',
  openGraph: {
    title: 'Free Landing Page Audit Tool | Creekside Marketing',
    description:
      'Grade your landing page across 20+ conversion factors and get prioritized fixes.',
  },
};

export default function LandingPageAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
