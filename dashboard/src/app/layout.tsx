import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Free Marketing Tools | Creekside Marketing',
    template: '%s | Creekside Marketing',
  },
  description:
    'Free marketing tools for business owners. ROAS calculators, ad account graders, and more — built by Creekside Marketing.',
  openGraph: {
    title: 'Free Marketing Tools | Creekside Marketing',
    description:
      'Free marketing tools for business owners. ROAS calculators, ad account graders, and more.',
    type: 'website',
    siteName: 'Creekside Marketing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Marketing Tools | Creekside Marketing',
    description:
      'Free marketing tools for business owners. Built by Creekside Marketing.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
