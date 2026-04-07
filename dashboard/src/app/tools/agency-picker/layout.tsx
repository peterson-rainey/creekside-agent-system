import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agency vs Freelancer Finder — Who Should Run Your Ads?',
  description:
    'Find out whether you need a marketing agency, freelancer, or can handle ads in-house. Answer 8 quick questions and get a personalized recommendation.',
  openGraph: {
    title: 'Agency vs Freelancer Finder | Creekside Marketing',
    description:
      'Find out whether you need an agency, freelancer, or in-house team for your marketing.',
  },
};

export default function AgencyPickerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
