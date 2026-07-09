/* ============================================================
   Language-independent data — icons, numeric metrics, tools.
   All translatable strings live in js/i18n.js (I18N).
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

// Skill icons in display order (titles + descriptions come from I18N)
const SKILL_ICONS = ['strategy', 'performance', 'growth', 'analytics', 'team', 'product', 'gtm', 'lead', 'crm', 'ai'];

// Each case has its own page (SEO). Slugs are language-independent and map
// 1:1 (by index) to the cases array in i18n.js.
const CASE_SLUGS = [
  'case-apple-service-centers.html',
  'case-glamping-crimea.html',
  'case-edtech-school.html',
  'case-remboard-saas.html',
  'case-glazur-brand.html',
  'case-xenna-meta-cpi.html',
  'case-hr-agency-leadgen.html',
  'case-magsafe-ecom.html',
  'case-cyberarena-stuttgart.html',
  'case-uac-mobile-app.html',
  'case-glaze-glass.html',
  'case-fintech-marketplace-eu.html'
];

// Case sub-categories (shown as filters on the Cases page) and the category
// of each case, parallel to CASE_SLUGS. Labels come from I18N (cat.*).
const CATEGORIES = ['complex', 'google', 'meta'];
const CASE_CATS = ['complex', 'complex', 'complex', 'complex', 'complex', 'meta', 'meta', 'meta', 'meta', 'google', 'complex', 'complex'];

// Stats: numeric ones animate from STAT_META; text ones take their value from I18N
const STAT_META = [
  { value: 7,   suffix: '+' },
  { value: 100, suffix: '+' },
  { text: true },
  { text: true }
];

// Core competencies — grouped tag clouds. Items are largely technical/brand
// terms (language-independent); group titles come from I18N (comp.*).
const COMPETENCIES = [
  { key: 'comp.strategy', items: ['Marketing Strategy', 'Brand Strategy & Positioning', 'Go-to-Market Strategy', 'Product Launch', 'Market Expansion', 'P&L Ownership', 'Team Leadership', 'Cross-Functional Collaboration'] },
  { key: 'comp.growth', items: ['Growth Marketing', 'Performance Marketing', 'Funnel Optimization', 'A/B Testing & Experimentation', 'Retention & Loyalty', 'CAC', 'LTV', 'ROAS', 'ROI', 'Unit-экономика', 'Revenue Growth'] },
  { key: 'comp.channels', items: ['Paid Social', 'Google Ads', 'Meta Ads', 'SEO', 'Content Marketing', 'SMM', 'Email Marketing', 'CRM', 'Affiliate & Influencer Marketing', 'Amplitude', 'Mixpanel', 'Tableau', 'Jira', 'Figma', 'Miro', 'ChatGPT'] },
  { key: 'comp.domains', items: ['Fintech', 'BNPL', 'Payments', 'E-commerce', 'Marketplace', 'EdTech', 'Subscription Products', 'B2C', 'SaaS', 'Mobile Apps'] }
];
