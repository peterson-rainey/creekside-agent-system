import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Ad Budget Calculator — How Much Should You Spend on Ads?',
  description:
    'Find out exactly how much you should spend on ads based on your revenue goals and industry. Get conservative, moderate, and aggressive budget recommendations instantly.',
  openGraph: {
    title: 'Free Ad Budget Calculator | Creekside Marketing',
    description:
      'Find out how much you should spend on ads based on your revenue goals. 3-tier recommendations with industry benchmarks.',
  },
};

export default function AdBudgetCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
