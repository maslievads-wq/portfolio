/* ============================================================
   Content data — skills, stats, cases
   Keeping content separate keeps markup clean and easy to edit.
   ============================================================ */

// Inline SVG icons (stroke-based, inherit currentColor)
const ICONS = {
  strategy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg>',
  performance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 3 7-8"/><path d="M21 7v5"/><path d="M21 7h-5"/></svg>',
  growth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>',
  analytics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 15l3-3 2 2 4-5"/></svg>',
  team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.5"/><path d="M21 20a6 6 0 0 0-4-5.6"/></svg>',
  product: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5"/><path d="M12 22V12"/></svg>',
  gtm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5L3 21l4.5-1.5"/><path d="M14 6s4-2 6-1c1 2-1 6-1 6l-6 6-4-4z"/><path d="M9 11l-3 3"/><circle cx="15" cy="9" r="1.4"/></svg>',
  lead: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18l-7 8v6l-4 2v-8z"/></svg>',
  crm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.2 7.3l7.6 3.4M15.8 13.3l-7.6 3.4"/></svg>',
  ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="7" width="14" height="11" rx="2"/><path d="M12 7V4"/><circle cx="12" cy="3" r="1"/><path d="M2 12h3M19 12h3"/><circle cx="9.5" cy="12.5" r="1"/><circle cx="14.5" cy="12.5" r="1"/></svg>'
};

const SKILLS = [
  { icon: 'strategy',    title: 'Marketing Strategy',      desc: 'Developing scalable marketing systems aligned with business goals.' },
  { icon: 'performance', title: 'Performance Marketing',   desc: 'Managing paid acquisition channels with measurable ROI.' },
  { icon: 'growth',      title: 'Growth Marketing',        desc: 'Building sustainable customer acquisition frameworks.' },
  { icon: 'analytics',   title: 'Analytics & Dashboards',  desc: 'Creating transparent reporting and decision-making systems.' },
  { icon: 'team',        title: 'Team Management',         desc: 'Coordinating marketing teams, contractors and stakeholders.' },
  { icon: 'product',     title: 'Product Marketing',       desc: 'Positioning products and translating value into market demand.' },
  { icon: 'gtm',         title: 'Go-To-Market Strategy',   desc: 'Launching products and entering new markets.' },
  { icon: 'lead',        title: 'Lead Generation',         desc: 'Building predictable lead acquisition systems.' },
  { icon: 'crm',         title: 'CRM & Funnels',           desc: 'Optimizing customer journeys and conversion processes.' },
  { icon: 'ai',          title: 'AI Automation',           desc: 'Integrating AI tools and automation into marketing workflows.' }
];

const STATS = [
  { value: 6,   suffix: '+',  label: 'Years — Entrepreneurial & Marketing Experience' },
  { value: 100, suffix: '+',  label: 'Projects — Campaigns, Products & Initiatives' },
  { text: 'Multiple', label: 'Industries — Digital, Education, E-commerce, Tech' },
  { text: 'Full Funnel', label: 'Strategy → Acquisition → Analytics → Growth' }
];

const CASES = [
  {
    tag: 'Marketing Agency Growth',
    title: 'Scaling a Digital Marketing Agency',
    desc: 'Rebuilt the agency’s acquisition and delivery systems to enable predictable, profitable growth.',
    industry: 'Digital Services',
    challenge: 'The agency relied on referrals and inconsistent outreach. Lead flow was unpredictable, margins were unclear, and there was no reporting layer to guide decisions.',
    actions: [
      'Built a structured outbound + inbound acquisition system',
      'Implemented a CRM with stage-based pipeline tracking',
      'Standardized offers, pricing and delivery processes',
      'Introduced weekly performance dashboards for leadership'
    ],
    tools: ['HubSpot', 'Notion', 'Google Analytics', 'Looker Studio', 'Make'],
    metrics: [
      { value: 180, suffix: '%', label: 'Revenue Growth' },
      { value: 3,   suffix: 'x', label: 'Lead Growth' },
      { value: 34,  suffix: '%', label: 'CAC Reduction' }
    ],
    results: 'Within two quarters the agency moved from unpredictable referral income to a documented, repeatable pipeline — tripling qualified leads while cutting acquisition costs by a third.'
  },
  {
    tag: 'Recruitment Marketing',
    title: 'Recruitment Marketing System',
    desc: 'Designed an employer-brand and candidate-acquisition funnel for a fast-hiring company.',
    industry: 'HR / Staffing',
    challenge: 'Hiring depended on expensive job boards with low-quality applicants and no measurable funnel.',
    actions: [
      'Built a candidate landing funnel with clear messaging',
      'Launched targeted paid campaigns across social channels',
      'Automated screening and follow-up sequences',
      'Created a recruiting analytics dashboard'
    ],
    tools: ['Meta Ads', 'Tilda', 'Airtable', 'Zapier', 'GA4'],
    metrics: [
      { value: 4,  suffix: 'x', label: 'Qualified Applicants' },
      { value: 42, suffix: '%', label: 'Cost per Hire ↓' },
      { value: 2.6, suffix: 'x', label: 'Conversion Rate' }
    ],
    results: 'Cost per qualified hire dropped 42% while application quality and volume rose sharply, giving the team a predictable hiring pipeline.'
  },
  {
    tag: 'Education Projects',
    title: 'EdTech Launch & Enrollment Growth',
    desc: 'Took an online education product from concept to consistent monthly enrollments.',
    industry: 'Education',
    challenge: 'A new course offering had no audience, funnel or acquisition channel — only strong content.',
    actions: [
      'Defined positioning and a value-driven offer',
      'Built a webinar-to-sales acquisition funnel',
      'Launched performance campaigns with tight tracking',
      'Implemented email nurture and re-engagement flows'
    ],
    tools: ['GetCourse', 'Google Ads', 'Meta Ads', 'Email Automation'],
    metrics: [
      { value: 320, suffix: '%', label: 'Enrollment Growth' },
      { value: 4.8, suffix: 'x', label: 'ROAS' },
      { value: 28, suffix: '%', label: 'Funnel Conversion' }
    ],
    results: 'The product reached stable, scalable monthly enrollments with a positive return on ad spend and a repeatable launch playbook.'
  },
  {
    tag: 'Performance Marketing',
    title: 'E-commerce Performance Scaling',
    desc: 'Restructured paid acquisition to scale revenue while holding profitability targets.',
    industry: 'E-commerce',
    challenge: 'Ad spend was scaling but ROAS was falling and the team lacked visibility into true profitability.',
    actions: [
      'Rebuilt campaign structure around product margins',
      'Implemented full-funnel tracking and attribution',
      'Introduced creative testing framework',
      'Optimized landing pages and checkout flow'
    ],
    tools: ['Meta Ads', 'Google Ads', 'Shopify', 'GA4', 'Triple Whale'],
    metrics: [
      { value: 2.4, suffix: 'x', label: 'ROAS Improvement' },
      { value: 56, suffix: '%', label: 'Revenue Growth' },
      { value: 22, suffix: '%', label: 'CR Increase' }
    ],
    results: 'Profitable ad spend more than doubled in efficiency, unlocking confident scaling backed by clear margin-based reporting.'
  },
  {
    tag: 'Lead Generation Systems',
    title: 'B2B Lead Generation Engine',
    desc: 'Built a predictable, multi-channel B2B lead system for a service business.',
    industry: 'B2B Services',
    challenge: 'Sales had no consistent inbound flow and spent most of their time prospecting manually.',
    actions: [
      'Designed an inbound content + lead-magnet system',
      'Built outbound sequences with enriched targeting',
      'Connected forms, CRM and routing automation',
      'Created an SLA-based lead scoring model'
    ],
    tools: ['HubSpot', 'Apollo', 'LinkedIn', 'Make', 'Looker Studio'],
    metrics: [
      { value: 5,  suffix: 'x', label: 'Monthly Leads' },
      { value: 38, suffix: '%', label: 'Sales Time Saved' },
      { value: 31, suffix: '%', label: 'Lead-to-Deal ↑' }
    ],
    results: 'Sales shifted from manual prospecting to working a steady, qualified pipeline — improving both lead volume and close rates.'
  },
  {
    tag: 'AI Automation Projects',
    title: 'AI-Powered Marketing Operations',
    desc: 'Embedded AI and automation across content, reporting and lead handling.',
    industry: 'Technology',
    challenge: 'Repetitive marketing tasks consumed team capacity and slowed reporting and response times.',
    actions: [
      'Automated reporting aggregation across channels',
      'Deployed AI content and creative assist workflows',
      'Built AI-assisted lead qualification and routing',
      'Created internal automation playbooks'
    ],
    tools: ['OpenAI API', 'Make', 'n8n', 'Notion', 'Slack'],
    metrics: [
      { value: 60, suffix: '%', label: 'Manual Work ↓' },
      { value: 3,  suffix: 'x', label: 'Reporting Speed' },
      { value: 45, suffix: '%', label: 'Faster Response' }
    ],
    results: 'Automation freed significant team capacity and accelerated decision-making, turning routine operations into a scalable, low-overhead system.'
  }
];
