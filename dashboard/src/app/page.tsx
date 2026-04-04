import ClientTable from '@/components/ClientTable';

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Client Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Monitor all active ad accounts across platforms</p>
      </div>
      <ClientTable />
    </div>
  );
}
