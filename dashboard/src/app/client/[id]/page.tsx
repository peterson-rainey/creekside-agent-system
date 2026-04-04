import { createServiceClient } from '@/lib/supabase';
import ClientReport from '@/components/ClientReport';
import PerformanceGoals from '@/components/PerformanceGoals';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: client } = await supabase
    .from('reporting_clients')
    .select('*')
    .eq('id', id)
    .single();

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[var(--creekside-blue)] transition-colors group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to all clients
      </Link>
      <ClientReport client={client} />
      <PerformanceGoals clientName={client.client_name} />
    </div>
  );
}
