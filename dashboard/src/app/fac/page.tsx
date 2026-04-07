'use client';

interface FunctionArea {
  name: string;
  owner: string;
  responsibilities: string[];
}

const FUNCTIONS: FunctionArea[] = [
  {
    name: 'Finance / Accounting',
    owner: 'Cade',
    responsibilities: [
      'Invoicing',
      'Bookkeeping',
      'Contractor payments',
      'Cash flow management',
      'Tax planning',
      'Budget planning',
      'Profitability by client',
      'Pricing strategy',
      'Cash reserve management',
    ],
  },
  {
    name: 'Sales / Business Development',
    owner: 'Cade',
    responsibilities: [
      'Testimonials',
      'Referral network',
      'Discovery calls',
      'Proposal / pricing',
      'Contract negotiation',
      'Pipeline / CRM',
      'Partnership development',
    ],
  },
  {
    name: 'Client Satisfaction',
    owner: 'Cade',
    responsibilities: [
      'Communication / check-ins',
      'Performance reporting',
      'Client health monitoring',
      'Escalation handling',
      'Upsell / cross-sell',
      'Churn prevention',
      'Offboarding / exit interviews',
      'NPS',
      'Expectation setting',
      'Whale concentration monitoring',
    ],
  },
  {
    name: 'Onboarding',
    owner: 'Peterson',
    responsibilities: [
      'New client intake',
      'Ad account access / setup',
      'Conversion tracking',
      'Initial market research',
      'Campaign strategy',
      'Creative development',
      'Milestone tracking',
      'Landing page / CRO',
    ],
  },
  {
    name: 'Fulfilment',
    owner: 'Cade',
    responsibilities: [
      'Google Ads management',
      'Facebook Ads management',
      'Platform risk monitoring',
      'Contractor QA',
      'Reporting / analytics',
      'Ad account audits',
      'Audience research',
      'A/B testing',
      'White-labelling partnerships',
    ],
  },
  {
    name: 'Marketing',
    owner: 'Peterson',
    responsibilities: [
      'LinkedIn content',
      'YouTube strategy',
      'Website / SEO',
      'Case studies',
      'Branding',
      'Thought leadership',
      'Social proof',
      'Upwork proposals',
      'LinkedIn outreach',
      'Market positioning',
    ],
  },
  {
    name: 'Operation Systems',
    owner: 'Peterson',
    responsibilities: [
      'SOPs',
      'ClickUp / workflow',
      'Zapier automations',
      'Tool / vendor management',
      'Internal reporting dashboards',
      'Meeting structure',
      'Knowledge base',
      'File organization',
    ],
  },
  {
    name: 'Strategy / Innovation',
    owner: 'Peterson',
    responsibilities: [
      'Internal strategic planning',
      'Competitive analysis',
      'Service offering expansion',
      'AI integration',
      'Scaling roadmap',
      'Revenue diversification',
    ],
  },
  {
    name: 'Legal',
    owner: 'Cade',
    responsibilities: [
      'Client contracts',
      'Contractor agreements',
      'Liability / risk',
      'IP protection',
      'Business continuity',
    ],
  },
  {
    name: 'HR',
    owner: 'Peterson',
    responsibilities: [
      'Contractor sourcing',
      'Interviewing / hiring',
      'Onboarding / training',
      'Performance reviews',
      'Compensation',
      'Role definition',
      'Culture / standards',
      'Firing / offboarding',
    ],
  },
  {
    name: 'AI Business',
    owner: 'Peterson',
    responsibilities: [
      'AI agent system',
      'RAG database',
      'Pipeline automation',
      'AI-powered tools',
      'Internal dashboards',
    ],
  },
];

function OwnerBadge({ owner }: { owner: string }) {
  const isPeterson = owner === 'Peterson';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
      isPeterson
        ? 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20'
        : 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
    }`}>
      {owner}
    </span>
  );
}

export default function FACPage() {
  const petersonCount = FUNCTIONS.filter((f) => f.owner === 'Peterson').length;
  const cadeCount = FUNCTIONS.filter((f) => f.owner === 'Cade').length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Function Accountability Chart</h2>
        <p className="text-sm text-slate-500 mt-1">Who owns what across the business</p>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <OwnerBadge owner="Peterson" />
          <span className="text-sm text-slate-600">{petersonCount} functions</span>
        </div>
        <div className="flex items-center gap-2">
          <OwnerBadge owner="Cade" />
          <span className="text-sm text-slate-600">{cadeCount} functions</span>
        </div>
      </div>

      {/* Function Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FUNCTIONS.map((fn) => (
          <div key={fn.name} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">{fn.name}</h3>
              <OwnerBadge owner={fn.owner} />
            </div>
            <ul className="space-y-1">
              {fn.responsibilities.map((r) => (
                <li key={r} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-slate-300 mt-1.5 flex-shrink-0">-</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
