/* ============================================================
   Translations — English (en), German (de), Russian (ru).
   ui:    flat key -> string for static [data-i18n] text
   skills: [{ t: title, d: description }] x10
   stats:  [{ value?, label }] x4  (value only for non-numeric stats)
   cases:  [{ tag, title, summary, highlights:[], bullets:[] }] — full case content
   ============================================================ */

const I18N = {
  /* ----------------------------- ENGLISH ----------------------------- */
  en: {
    ui: {
      'nav.home': 'Home', 'nav.skills': 'Skills', 'nav.about': 'About', 'nav.cases': 'Cases', 'nav.contact': 'Contact',
      'hero.eyebrow': 'Strategic Marketing Leadership',
      'hero.accent': 'with Entrepreneurial Experience',
      'hero.subtitle': 'I build scalable marketing systems, align teams, organize analytics and turn marketing into a predictable growth engine.',
      'hero.btnCases': 'View Cases',
      'hero.btnContact': 'Contact me',
      'hero.badge1': 'Years Experience',
      'hero.badge2': 'Projects Delivered',
      'skills.eyebrow': 'What I Do',
      'skills.title': 'Core Expertise',
      'skills.lead': 'Ten disciplines that turn marketing from a cost center into a predictable, measurable growth engine.',
      'about.eyebrow': 'About Me',
      'about.title': 'Marketing Leader with Entrepreneurial Experience',
      'about.p1': 'Over the past several years, I have worked at the intersection of marketing, product development and business growth.',
      'about.p2': 'Unlike traditional marketers, I understand not only how to generate leads but also how businesses make money, scale operations and build sustainable growth systems.',
      'about.p3': 'My background combines entrepreneurship, marketing leadership and hands-on execution across multiple industries including digital services, education, e-commerce and technology projects.',
      'about.p4': 'I have managed marketing initiatives, built acquisition systems, launched products, coordinated teams and worked directly with business owners to achieve measurable results.',
      'about.principlesTitle': 'My approach is based on three principles',
      'about.principle1': 'Data-driven decision making',
      'about.principle2': 'Systematic growth processes',
      'about.principle3': 'Focus on business outcomes',
      'about.strengthsTitle': 'Core Strengths',
      'about.strength1': 'Strategic Marketing Leadership',
      'about.strength2': 'Performance Marketing',
      'about.strength3': 'Growth Systems Development',
      'about.strength4': 'Marketing Analytics',
      'about.strength5': 'Team Leadership',
      'about.strength6': 'Product Marketing',
      'about.strength7': 'Business Process Optimization',
      'about.strength8': 'AI & Automation',
      'about.statement': '“I enjoy turning marketing chaos into predictable systems. Whether the goal is increasing revenue, improving lead quality, reducing acquisition costs or building scalable reporting, my focus is always on creating clarity, efficiency and measurable business impact.”',
      'certs.title': 'Certifications',
      'cert.google.title': 'Certified Specialist',
      'cert.meta.title': 'Certified Professional · Media Buying',
      'comp.eyebrow': 'Expertise',
      'comp.title': 'Core Competencies',
      'comp.strategy': 'Strategy & Leadership',
      'comp.growth': 'Growth & Performance',
      'comp.channels': 'Channels & Tools',
      'comp.domains': 'Domains',
      'about.experienceTitle': 'Experience',
      'about.educationTitle': 'Education',
      'about.languagesTitle': 'Languages',
      'cases.eyebrow': 'Selected Work',
      'cases.title': 'Selected Cases',
      'cases.lead': 'A selection of marketing systems and growth initiatives — and the measurable business outcomes they produced.',
      'cases.viewAll': 'View all cases',
      'case.viewStudy': 'View case →',
      'case.whatDone': 'What I did and how',
      'case.nextCase': 'Next case',
      'case.contact': 'Get in touch',
      'case.backToCases': 'All cases',
      'contact.eyebrow': 'Get In Touch',
      'contact.title': "Let's Work Together",
      'contact.lead': 'Whether you are looking for a marketing leader, growth consultant or strategic partner, feel free to get in touch.',
      'contact.locationLabel': 'Location',
      'contact.locationVal': 'Germany',
      'form.name': 'Name', 'form.email': 'Email', 'form.message': 'Message', 'form.send': 'Send Message',
      'form.error': 'Please complete all fields with a valid email.',
      'form.success': 'Thanks! Your email client is opening — I’ll reply shortly.',
      'footer.statement': 'Building marketing systems that drive measurable business growth.',
      'footer.copyright': '© 2026 Dmitry Masliev. All Rights Reserved.',
      'footer.backToTop': 'Back to top ↑'
    },
    skills: [
      { t: 'Marketing Strategy', d: 'Developing scalable marketing systems aligned with business goals.' },
      { t: 'Performance Marketing', d: 'Managing paid acquisition channels with measurable ROI.' },
      { t: 'Growth Marketing', d: 'Building sustainable customer acquisition frameworks.' },
      { t: 'Analytics & Dashboards', d: 'Creating transparent reporting and decision-making systems.' },
      { t: 'Team Management', d: 'Coordinating marketing teams, contractors and stakeholders.' },
      { t: 'Product Marketing', d: 'Positioning products and translating value into market demand.' },
      { t: 'Go-To-Market Strategy', d: 'Launching products and entering new markets.' },
      { t: 'Lead Generation', d: 'Building predictable lead acquisition systems.' },
      { t: 'CRM & Funnels', d: 'Optimizing customer journeys and conversion processes.' },
      { t: 'AI Automation', d: 'Integrating AI tools and automation into marketing workflows.' }
    ],
    stats: [
      { label: 'Years — Entrepreneurial & Marketing Experience' },
      { label: 'Projects — Campaigns, Products & Initiatives' },
      { value: 'Multiple', label: 'Industries — Digital, Education, E-commerce, Tech' },
      { value: 'Full Funnel', label: 'Strategy → Acquisition → Analytics → Growth' }
    ],
    cases: [
      { tag: 'Marketing Agency Growth', title: 'Scaling a Digital Marketing Agency', desc: 'Rebuilt the agency’s acquisition and delivery systems to enable predictable, profitable growth.', industry: 'Digital Services', challenge: 'The agency relied on referrals and inconsistent outreach. Lead flow was unpredictable, margins were unclear, and there was no reporting layer to guide decisions.', actions: ['Built a structured outbound + inbound acquisition system', 'Implemented a CRM with stage-based pipeline tracking', 'Standardized offers, pricing and delivery processes', 'Introduced weekly performance dashboards for leadership'], results: 'Within two quarters the agency moved from unpredictable referral income to a documented, repeatable pipeline — tripling qualified leads while cutting acquisition costs by a third.', metricLabels: ['Revenue Growth', 'Lead Growth', 'CAC Reduction'] },
      { tag: 'Recruitment Marketing', title: 'Recruitment Marketing System', desc: 'Designed an employer-brand and candidate-acquisition funnel for a fast-hiring company.', industry: 'HR / Staffing', challenge: 'Hiring depended on expensive job boards with low-quality applicants and no measurable funnel.', actions: ['Built a candidate landing funnel with clear messaging', 'Launched targeted paid campaigns across social channels', 'Automated screening and follow-up sequences', 'Created a recruiting analytics dashboard'], results: 'Cost per qualified hire dropped 42% while application quality and volume rose sharply, giving the team a predictable hiring pipeline.', metricLabels: ['Qualified Applicants', 'Cost per Hire ↓', 'Conversion Rate'] },
      { tag: 'Education Projects', title: 'EdTech Launch & Enrollment Growth', desc: 'Took an online education product from concept to consistent monthly enrollments.', industry: 'Education', challenge: 'A new course offering had no audience, funnel or acquisition channel — only strong content.', actions: ['Defined positioning and a value-driven offer', 'Built a webinar-to-sales acquisition funnel', 'Launched performance campaigns with tight tracking', 'Implemented email nurture and re-engagement flows'], results: 'The product reached stable, scalable monthly enrollments with a positive return on ad spend and a repeatable launch playbook.', metricLabels: ['Enrollment Growth', 'ROAS', 'Funnel Conversion'] },
      { tag: 'Performance Marketing', title: 'E-commerce Performance Scaling', desc: 'Restructured paid acquisition to scale revenue while holding profitability targets.', industry: 'E-commerce', challenge: 'Ad spend was scaling but ROAS was falling and the team lacked visibility into true profitability.', actions: ['Rebuilt campaign structure around product margins', 'Implemented full-funnel tracking and attribution', 'Introduced creative testing framework', 'Optimized landing pages and checkout flow'], results: 'Profitable ad spend more than doubled in efficiency, unlocking confident scaling backed by clear margin-based reporting.', metricLabels: ['ROAS Improvement', 'Revenue Growth', 'CR Increase'] },
      { tag: 'Lead Generation Systems', title: 'B2B Lead Generation Engine', desc: 'Built a predictable, multi-channel B2B lead system for a service business.', industry: 'B2B Services', challenge: 'Sales had no consistent inbound flow and spent most of their time prospecting manually.', actions: ['Designed an inbound content + lead-magnet system', 'Built outbound sequences with enriched targeting', 'Connected forms, CRM and routing automation', 'Created an SLA-based lead scoring model'], results: 'Sales shifted from manual prospecting to working a steady, qualified pipeline — improving both lead volume and close rates.', metricLabels: ['Monthly Leads', 'Sales Time Saved', 'Lead-to-Deal ↑'] },
      { tag: 'AI Automation Projects', title: 'AI-Powered Marketing Operations', desc: 'Embedded AI and automation across content, reporting and lead handling.', industry: 'Technology', challenge: 'Repetitive marketing tasks consumed team capacity and slowed reporting and response times.', actions: ['Automated reporting aggregation across channels', 'Deployed AI content and creative assist workflows', 'Built AI-assisted lead qualification and routing', 'Created internal automation playbooks'], results: 'Automation freed significant team capacity and accelerated decision-making, turning routine operations into a scalable, low-overhead system.', metricLabels: ['Manual Work ↓', 'Reporting Speed', 'Faster Response'] }
    ]
  },

  /* ----------------------------- GERMAN ----------------------------- */
  de: {
    ui: {
      'nav.home': 'Start', 'nav.skills': 'Kompetenzen', 'nav.about': 'Über mich', 'nav.cases': 'Projekte', 'nav.contact': 'Kontakt',
      'hero.eyebrow': 'Strategische Marketing-Führung',
      'hero.accent': 'mit unternehmerischer Erfahrung',
      'hero.subtitle': 'Ich baue skalierbare Marketingsysteme auf, richte Teams aus, organisiere Analytics und mache Marketing zu einem planbaren Wachstumsmotor.',
      'hero.btnCases': 'Projekte ansehen',
      'hero.btnContact': 'Kontakt',
      'hero.badge1': 'Jahre Erfahrung',
      'hero.badge2': 'Projekte umgesetzt',
      'skills.eyebrow': 'Was ich mache',
      'skills.title': 'Kernkompetenzen',
      'skills.lead': 'Zehn Disziplinen, die Marketing von einem Kostenfaktor zu einem planbaren, messbaren Wachstumsmotor machen.',
      'about.eyebrow': 'Über mich',
      'about.title': 'Marketing-Leader mit unternehmerischer Erfahrung',
      'about.p1': 'In den letzten Jahren habe ich an der Schnittstelle von Marketing, Produktentwicklung und Unternehmenswachstum gearbeitet.',
      'about.p2': 'Anders als klassische Marketer verstehe ich nicht nur, wie man Leads generiert, sondern auch, wie Unternehmen Geld verdienen, Abläufe skalieren und nachhaltige Wachstumssysteme aufbauen.',
      'about.p3': 'Mein Hintergrund verbindet Unternehmertum, Marketing-Führung und praktische Umsetzung in verschiedenen Branchen – darunter digitale Dienstleistungen, Bildung, E-Commerce und Technologieprojekte.',
      'about.p4': 'Ich habe Marketinginitiativen geleitet, Akquisesysteme aufgebaut, Produkte gelauncht, Teams koordiniert und direkt mit Unternehmern zusammengearbeitet, um messbare Ergebnisse zu erzielen.',
      'about.principlesTitle': 'Mein Ansatz basiert auf drei Prinzipien',
      'about.principle1': 'Datengetriebene Entscheidungen',
      'about.principle2': 'Systematische Wachstumsprozesse',
      'about.principle3': 'Fokus auf Geschäftsergebnisse',
      'about.strengthsTitle': 'Kernstärken',
      'about.strength1': 'Strategische Marketing-Führung',
      'about.strength2': 'Performance-Marketing',
      'about.strength3': 'Aufbau von Wachstumssystemen',
      'about.strength4': 'Marketing-Analytics',
      'about.strength5': 'Teamführung',
      'about.strength6': 'Produktmarketing',
      'about.strength7': 'Optimierung von Geschäftsprozessen',
      'about.strength8': 'KI & Automatisierung',
      'about.statement': '„Ich liebe es, Marketing-Chaos in planbare Systeme zu verwandeln. Ob mehr Umsatz, bessere Lead-Qualität, niedrigere Akquisekosten oder skalierbares Reporting – mein Fokus liegt immer auf Klarheit, Effizienz und messbarem geschäftlichen Mehrwert.“',
      'certs.title': 'Zertifizierungen',
      'cert.google.title': 'Zertifizierter Spezialist',
      'cert.meta.title': 'Zertifizierter Professional · Media Buying',
      'comp.eyebrow': 'Kompetenzen',
      'comp.title': 'Kernkompetenzen',
      'comp.strategy': 'Strategie & Führung',
      'comp.growth': 'Growth & Performance',
      'comp.channels': 'Kanäle & Tools',
      'comp.domains': 'Domänen',
      'about.experienceTitle': 'Berufserfahrung',
      'about.educationTitle': 'Ausbildung',
      'about.languagesTitle': 'Sprachen',
      'cases.eyebrow': 'Ausgewählte Arbeiten',
      'cases.title': 'Ausgewählte Projekte',
      'cases.lead': 'Eine Auswahl an Marketingsystemen und Wachstumsinitiativen – und die messbaren geschäftlichen Ergebnisse, die sie erzielt haben.',
      'cases.viewAll': 'Alle Projekte ansehen',
      'case.viewStudy': 'Projekt ansehen →',
      'case.whatDone': 'Was ich getan habe und wie',
      'case.nextCase': 'Nächstes Projekt',
      'case.contact': 'Kontakt aufnehmen',
      'case.backToCases': 'Alle Projekte',
      'contact.eyebrow': 'Kontakt aufnehmen',
      'contact.title': 'Lassen Sie uns zusammenarbeiten',
      'contact.lead': 'Ob Sie einen Marketing-Leader, Growth-Berater oder strategischen Partner suchen – nehmen Sie gern Kontakt auf.',
      'contact.locationLabel': 'Standort',
      'contact.locationVal': 'Deutschland',
      'form.name': 'Name', 'form.email': 'E-Mail', 'form.message': 'Nachricht', 'form.send': 'Nachricht senden',
      'form.error': 'Bitte füllen Sie alle Felder mit einer gültigen E-Mail aus.',
      'form.success': 'Danke! Ihr E-Mail-Programm öffnet sich – ich melde mich in Kürze.',
      'footer.statement': 'Ich baue Marketingsysteme, die messbares Geschäftswachstum fördern.',
      'footer.copyright': '© 2026 Dmitry Masliev. Alle Rechte vorbehalten.',
      'footer.backToTop': 'Nach oben ↑'
    },
    skills: [
      { t: 'Marketingstrategie', d: 'Aufbau skalierbarer Marketingsysteme im Einklang mit den Unternehmenszielen.' },
      { t: 'Performance-Marketing', d: 'Steuerung bezahlter Akquisekanäle mit messbarem ROI.' },
      { t: 'Growth-Marketing', d: 'Aufbau nachhaltiger Frameworks zur Kundengewinnung.' },
      { t: 'Analytics & Dashboards', d: 'Aufbau transparenter Reportings und Entscheidungssysteme.' },
      { t: 'Teammanagement', d: 'Koordination von Marketingteams, Dienstleistern und Stakeholdern.' },
      { t: 'Produktmarketing', d: 'Produkte positionieren und Mehrwert in Marktnachfrage übersetzen.' },
      { t: 'Go-to-Market-Strategie', d: 'Produkte launchen und neue Märkte erschließen.' },
      { t: 'Leadgenerierung', d: 'Aufbau planbarer Systeme zur Leadgewinnung.' },
      { t: 'CRM & Funnels', d: 'Optimierung von Customer Journeys und Conversion-Prozessen.' },
      { t: 'KI-Automatisierung', d: 'Integration von KI-Tools und Automatisierung in Marketing-Workflows.' }
    ],
    stats: [
      { label: 'Jahre – Unternehmer- & Marketing-Erfahrung' },
      { label: 'Projekte – Kampagnen, Produkte & Initiativen' },
      { value: 'Mehrere', label: 'Branchen – Digital, Bildung, E-Commerce, Tech' },
      { value: 'Full Funnel', label: 'Strategie → Akquise → Analytics → Wachstum' }
    ],
    cases: [
      { tag: 'Wachstum einer Marketingagentur', title: 'Skalierung einer Digital-Marketing-Agentur', desc: 'Akquise- und Delivery-Systeme der Agentur neu aufgebaut für planbares, profitables Wachstum.', industry: 'Digitale Dienstleistungen', challenge: 'Die Agentur verließ sich auf Empfehlungen und unregelmäßige Akquise. Der Lead-Fluss war unvorhersehbar, Margen unklar und es gab kein Reporting als Entscheidungsgrundlage.', actions: ['Strukturiertes Outbound- + Inbound-Akquisesystem aufgebaut', 'CRM mit phasenbasiertem Pipeline-Tracking eingeführt', 'Angebote, Preise und Delivery-Prozesse standardisiert', 'Wöchentliche Performance-Dashboards für die Leitung eingeführt'], results: 'Innerhalb von zwei Quartalen wechselte die Agentur von unvorhersehbaren Empfehlungseinnahmen zu einer dokumentierten, wiederholbaren Pipeline – mit dreifachen qualifizierten Leads bei einem Drittel weniger Akquisekosten.', metricLabels: ['Umsatzwachstum', 'Lead-Wachstum', 'CAC-Senkung'] },
      { tag: 'Recruiting-Marketing', title: 'Recruiting-Marketing-System', desc: 'Employer-Branding- und Kandidaten-Akquisefunnel für ein schnell wachsendes Unternehmen entwickelt.', industry: 'HR / Personal', challenge: 'Die Personalbeschaffung hing von teuren Jobbörsen mit schwacher Bewerberqualität und ohne messbaren Funnel ab.', actions: ['Kandidaten-Landingfunnel mit klarer Botschaft aufgebaut', 'Gezielte Paid-Kampagnen über Social-Kanäle gestartet', 'Screening- und Follow-up-Sequenzen automatisiert', 'Recruiting-Analytics-Dashboard erstellt'], results: 'Die Kosten pro qualifizierter Einstellung sanken um 42 %, während Qualität und Volumen der Bewerbungen deutlich stiegen – für eine planbare Recruiting-Pipeline.', metricLabels: ['Qualifizierte Bewerber', 'Kosten pro Einstellung ↓', 'Conversion-Rate'] },
      { tag: 'Bildungsprojekte', title: 'EdTech-Launch & Wachstum der Anmeldungen', desc: 'Ein Online-Bildungsprodukt vom Konzept zu konstanten monatlichen Anmeldungen geführt.', industry: 'Bildung', challenge: 'Ein neues Kursangebot hatte weder Publikum, Funnel noch Akquisekanal – nur starke Inhalte.', actions: ['Positionierung und wertorientiertes Angebot definiert', 'Webinar-zu-Sales-Akquisefunnel aufgebaut', 'Performance-Kampagnen mit präzisem Tracking gestartet', 'E-Mail-Nurturing und Reaktivierungs-Flows eingeführt'], results: 'Das Produkt erreichte stabile, skalierbare monatliche Anmeldungen mit positivem Return on Ad Spend und einem wiederholbaren Launch-Playbook.', metricLabels: ['Wachstum der Anmeldungen', 'ROAS', 'Funnel-Conversion'] },
      { tag: 'Performance-Marketing', title: 'E-Commerce-Performance-Skalierung', desc: 'Paid-Akquise neu strukturiert, um den Umsatz zu skalieren und Profitabilitätsziele zu halten.', industry: 'E-Commerce', challenge: 'Die Ad-Spends stiegen, doch der ROAS sank und dem Team fehlte der Einblick in die echte Profitabilität.', actions: ['Kampagnenstruktur an Produktmargen ausgerichtet', 'Full-Funnel-Tracking und Attribution eingeführt', 'Framework für Creative-Testing etabliert', 'Landingpages und Checkout-Flow optimiert'], results: 'Die Effizienz profitabler Ad-Spends hat sich mehr als verdoppelt und ermöglichte selbstbewusstes Skalieren auf Basis klarer, margenbasierter Reportings.', metricLabels: ['ROAS-Verbesserung', 'Umsatzwachstum', 'CR-Steigerung'] },
      { tag: 'Lead-Generierungssysteme', title: 'B2B-Lead-Generierungs-Engine', desc: 'Ein planbares, mehrkanaliges B2B-Lead-System für ein Dienstleistungsunternehmen aufgebaut.', industry: 'B2B-Dienstleistungen', challenge: 'Der Vertrieb hatte keinen konstanten Inbound-Fluss und verbrachte die meiste Zeit mit manueller Akquise.', actions: ['Inbound-Content- + Lead-Magnet-System konzipiert', 'Outbound-Sequenzen mit angereichertem Targeting aufgebaut', 'Formulare, CRM und Routing-Automatisierung verbunden', 'SLA-basiertes Lead-Scoring-Modell erstellt'], results: 'Der Vertrieb wechselte von manueller Akquise zu einer konstanten, qualifizierten Pipeline – mit mehr Leads und höheren Abschlussquoten.', metricLabels: ['Leads pro Monat', 'Gesparte Vertriebszeit', 'Lead-to-Deal ↑'] },
      { tag: 'KI-Automatisierungsprojekte', title: 'KI-gestützte Marketing-Operations', desc: 'KI und Automatisierung in Content, Reporting und Lead-Handling integriert.', industry: 'Technologie', challenge: 'Wiederkehrende Marketingaufgaben banden Teamkapazität und verlangsamten Reporting und Reaktionszeiten.', actions: ['Reporting-Aggregation über Kanäle automatisiert', 'KI-gestützte Content- und Creative-Workflows eingeführt', 'KI-gestützte Lead-Qualifizierung und -Routing aufgebaut', 'Interne Automatisierungs-Playbooks erstellt'], results: 'Die Automatisierung setzte erhebliche Teamkapazität frei und beschleunigte Entscheidungen – aus Routineaufgaben wurde ein skalierbares, ressourcenschonendes System.', metricLabels: ['Manuelle Arbeit ↓', 'Reporting-Tempo', 'Schnellere Reaktion'] }
    ]
  },

  /* ----------------------------- RUSSIAN ----------------------------- */
  ru: {
    ui: {
      'nav.home': 'Главная', 'nav.skills': 'Навыки', 'nav.about': 'Обо мне', 'nav.cases': 'Кейсы', 'nav.contact': 'Контакты',
      'hero.eyebrow': 'Стратегическое маркетинговое лидерство',
      'hero.accent': 'с предпринимательским опытом',
      'hero.subtitle': 'Performance Marketing, сквозная аналитика, воронки продаж и масштабирование рекламных каналов.',
      'hero.btnCases': 'Смотреть кейсы',
      'hero.btnContact': 'Связаться',
      'hero.badge1': 'лет опыта',
      'hero.badge2': 'проектов реализовано',
      'skills.eyebrow': 'Чем я занимаюсь',
      'skills.title': 'Ключевые компетенции',
      'skills.lead': 'Десять дисциплин, которые превращают маркетинг из статьи расходов в предсказуемый, измеримый двигатель роста.',
      'about.eyebrow': 'Обо мне',
      'about.title': 'Маркетинговый лидер с предпринимательским опытом',
      'about.p1': 'CMO / Head of Marketing с 7+ годами опыта в fintech, e-commerce и EdTech.',
      'about.p2': 'Выстраивал маркетинговые стратегии и команды с нуля: от brand strategy и go-to-market до P&L ownership и revenue growth.',
      'about.p3': 'Масштабировал продукты до 500 000+ аудитории и 1M+ MAU, управлял бюджетами до $20 000/мес с фокусом на CAC/LTV и unit-экономику.',
      'about.p4': 'Веду кросс-функциональные команды до 50 человек, принимаю решения через данные. Использую AI-инструменты для ускорения роста и экспериментов.',
      'about.principlesTitle': 'Мой подход основан на трёх принципах',
      'about.principle1': 'Решения на основе данных',
      'about.principle2': 'Системные процессы роста',
      'about.principle3': 'Фокус на бизнес-результатах',
      'about.strengthsTitle': 'Ключевые сильные стороны',
      'about.strength1': 'Стратегическое маркетинговое лидерство',
      'about.strength2': 'Performance-маркетинг',
      'about.strength3': 'Разработка систем роста',
      'about.strength4': 'Маркетинговая аналитика',
      'about.strength5': 'Управление командой',
      'about.strength6': 'Продуктовый маркетинг',
      'about.strength7': 'Оптимизация бизнес-процессов',
      'about.strength8': 'ИИ и автоматизация',
      'about.statement': '«Мне нравится превращать маркетинговый хаос в предсказуемые системы. Будь то рост выручки, повышение качества лидов, снижение стоимости привлечения или построение масштабируемой отчётности — мой фокус всегда на ясности, эффективности и измеримом влиянии на бизнес.»',
      'certs.title': 'Сертификаты',
      'cert.google.title': 'Сертифицированный специалист',
      'cert.meta.title': 'Сертифицированный профессионал · Media Buying',
      'comp.eyebrow': 'Компетенции',
      'comp.title': 'Ключевые компетенции',
      'comp.strategy': 'Стратегия и лидерство',
      'comp.growth': 'Growth & Performance',
      'comp.channels': 'Каналы и инструменты',
      'comp.domains': 'Домены',
      'about.experienceTitle': 'Опыт работы',
      'about.educationTitle': 'Образование',
      'about.languagesTitle': 'Языки',
      'cases.eyebrow': 'Избранные работы',
      'cases.title': 'Избранные кейсы',
      'cases.lead': 'Подборка маркетинговых систем и инициатив роста — и измеримые бизнес-результаты, которые они принесли.',
      'cases.viewAll': 'Смотреть все кейсы',
      'case.viewStudy': 'Открыть кейс →',
      'case.whatDone': 'Что сделал и за счёт чего',
      'case.nextCase': 'Следующий кейс',
      'case.contact': 'Связаться',
      'case.backToCases': 'Все кейсы',
      'contact.eyebrow': 'Связаться',
      'contact.title': 'Давайте работать вместе',
      'contact.lead': 'Если вы ищете маркетингового лидера, консультанта по росту или стратегического партнёра — напишите мне.',
      'contact.locationLabel': 'Локация',
      'contact.locationVal': 'Германия',
      'form.name': 'Имя', 'form.email': 'Email', 'form.message': 'Сообщение', 'form.send': 'Отправить',
      'form.error': 'Пожалуйста, заполните все поля и укажите корректный email.',
      'form.success': 'Спасибо! Открывается ваш почтовый клиент — я скоро отвечу.',
      'footer.statement': 'Строю маркетинговые системы, которые обеспечивают измеримый рост бизнеса.',
      'footer.copyright': '© 2026 Dmitry Masliev. Все права защищены.',
      'footer.backToTop': 'Наверх ↑'
    },
    skills: [
      { t: 'Маркетинговая стратегия', d: 'Создание масштабируемых маркетинговых систем в соответствии с целями бизнеса.' },
      { t: 'Performance-маркетинг', d: 'Управление платными каналами привлечения с измеримым ROI.' },
      { t: 'Growth-маркетинг', d: 'Построение устойчивых систем привлечения клиентов.' },
      { t: 'Аналитика и дашборды', d: 'Создание прозрачной отчётности и систем принятия решений.' },
      { t: 'Управление командой', d: 'Координация маркетинговых команд, подрядчиков и стейкхолдеров.' },
      { t: 'Продуктовый маркетинг', d: 'Позиционирование продуктов и перевод ценности в рыночный спрос.' },
      { t: 'Go-To-Market стратегия', d: 'Запуск продуктов и выход на новые рынки.' },
      { t: 'Лидогенерация', d: 'Построение предсказуемых систем привлечения лидов.' },
      { t: 'CRM и воронки', d: 'Оптимизация пути клиента и процессов конверсии.' },
      { t: 'AI-автоматизация', d: 'Интеграция AI-инструментов и автоматизации в маркетинговые процессы.' }
    ],
    stats: [
      { label: 'лет — предпринимательский и маркетинговый опыт' },
      { label: 'проектов — кампании, продукты и инициативы' },
      { value: 'Множество', label: 'отрасли — digital, образование, e-commerce, tech' },
      { value: 'Полная воронка', label: 'Стратегия → Привлечение → Аналитика → Рост' }
    ],
    cases: [
      { tag: 'Performance · SEO · Контент · SMM', title: 'Агентство №1 в СНГ в нише авторизованных сервисных центров Apple', summary: 'Разработал и реализовал стратегию захвата рынка среди авторизованных сервисных центров Apple — комплексный подход вывел агентство на позицию №1 в СНГ в нише АСЦ.', highlights: ['№1 в СНГ', 'Ниша АСЦ Apple', '4 канала в системе'], bullets: ['Собрал стратегию захвата рынка в единую систему: SEO, performance, контент и SMM работают на общий результат', 'Закрепил позиционирование в нише АСЦ и охватил ключевые сегменты спроса', 'Параллельно усиливал органику и платный трафик, удерживая лидерство в нише'] },
      { tag: 'HORECA · Influence · Посевы', title: 'Глэмпинг в Крыму: 100% загрузка на 4 месяца вперёд с бюджетом $500', summary: 'Разработал и реализовал маркетинговую стратегию запуска глэмпинга в Крыму — с минимальным бюджетом через посевы и influencer-маркетинг.', highlights: ['Бюджет $500', '100% загрузка', '4 месяца вперёд'], bullets: ['Сделал ставку на посевы и influencer-маркетинг вместо дорогого performance', 'С бюджетом $500 обеспечил 100% загрузку объекта на 4 месяца вперёд', 'Через год привлёк инвестиции и продал долю для реновации объекта'] },
      { tag: 'EdTech · Мультиканальность', title: 'EdTech-школа с нуля: 80 000 000+ охвата аудитории за 3 года', summary: 'Вывел онлайн-школу с нуля, построив мультиканальную маркетинговую систему на длинной дистанции.', highlights: ['80 000 000+ охват', '5 каналов', '3 года роста'], bullets: ['Выстроил мультиканальную систему: paid, SMM, контент, email, affiliate', 'Связал каналы в единую воронку привлечения и прогрева', 'Суммарный охват аудитории за 3 года — 80 000 000+'] },
      { tag: 'B2B · SaaS · Go-To-Market', title: 'SaaS remboard.ru: выход в точку безубыточности за 3 месяца', summary: 'Реализовал B2B go-to-market стратегию для SaaS-сервиса remboard.ru и быстро вывел продукт в плюс.', highlights: ['Безубыточность за 3 мес', 'CPA + performance', 'B2B SaaS'], bullets: ['Запустил CPA (affiliate) и performance-каналы привлечения', 'Выстроил go-to-market под B2B-специфику продукта', 'Вывел продукт в точку безубыточности за 3 месяца'] },
      { tag: 'Brand · Influence · Performance', title: 'Запуск бренда аксессуаров «Глазурь — Стекло»: 3 000 000+ охвата в месяц', summary: 'Разработал концепцию нового бренда мобильных аксессуаров — от нейминга и brand strategy до performance и influencer-стратегии.', highlights: ['3 000 000+ охват/мес', 'Топовые блогеры', 'Новый бренд'], bullets: ['Создал бренд с нуля: нейминг и brand strategy', 'Запустил performance и influencer-стратегию с топовыми блогерами рынка', 'Вышел на охват 3 000 000+ в месяц'] }
    ],
    experience: [
      {
        role: 'CMO & Co-Founder', company: '4our — Digital-агентство полного цикла', period: 'фев 2021 — мар 2026',
        meta: 'Удалённо · 9 человек в прямом подчинении + до 50 подрядчиков · E-commerce · EdTech · Retail',
        bullets: [
          'Разработал и реализовал стратегию захвата рынка среди авторизованных сервисных центров Apple — агентство вышло на позицию №1 в СНГ в нише АСЦ через комплексный подход: SEO, performance, контент, SMM.',
          'Выстроил маркетинговую команду с нуля: 12+ человек (SEO, performance, контент, SMM), настроил процессы и KPI по каждому направлению — NPS клиентов 90, средний LTV контракта 2+ года.',
          'Построил систему сквозной аналитики: контроль эффективности каждого рекламного канала, регулярная отчётность по ключевым показателям, постоянный поиск точек роста и новых источников трафика.',
          'Разработал и реализовал маркетинговую стратегию запуска глэмпинга в Крыму (HORECA): с бюджетом $500 через посевы и influencer-маркетинг обеспечил 100% загрузку объекта на 4 месяца вперёд; через год привлёк инвестиции и продал долю для реновации.',
          'Вывел EdTech онлайн-школу с нуля: выстроил мультиканальную маркетинговую систему (paid, SMM, контент, email, affiliate) — суммарный охват аудитории за 3 года составил 80 000 000+.',
          'Реализовал B2B go-to-market стратегию для SaaS-сервиса remboard.ru: запустил CPA (affiliate) и performance-каналы, вывел продукт в точку безубыточности за 3 месяца.',
          'Разработал концепцию нового бренда мобильных аксессуаров «Глазурь — Стекло»: от нейминга и brand strategy до performance и influencer-стратегии с топовыми блогерами рынка — 3 000 000+ охват в месяц.'
        ]
      },
      {
        role: 'Head of Marketing', company: 're.Cover — розничная сеть мобильной техники', period: 'апр 2019 — фев 2021',
        meta: 'Повышен за бизнес-результаты · Полная ответственность за маркетинг и P&L',
        bullets: [
          'Возглавил маркетинговое направление: выстроил brand strategy, сформировал команду, внедрил систему метрик и отчётности перед собственниками.',
          'Разработал и запустил подписочную модель: рост LTV клиентов на 40%, снижение CAC — ключевая revenue growth инициатива через изменение продуктового позиционирования.',
          'Запустил программу лояльности: 15 000+ участников, retention +12%; проектировал механику, A/B-тестировал и итерировал на основе данных.',
          'Руководил разработкой e-commerce платформы: от стратегии и позиционирования до MVP за 1 месяц и полного запуска за 18 месяцев (Agile/Scrum).',
          'Вырастил бренд в социальных сетях до 20 000 подписчиков за 12 месяцев через системную контент-стратегию и управление командой (SMM, дизайн, видео).'
        ]
      },
      {
        role: 'Performance Marketing Manager', company: 're.Cover — розничная сеть мобильной техники', period: 'мар 2018 — мар 2019',
        meta: 'Запуск performance-направления с нуля',
        bullets: [
          'Запустил Google Ads и Meta Ads с нуля: конверсия e-commerce выросла с 0,8% до 2% за год, ROI ×10 в первом цикле кампаний.',
          'Выстроил систему сквозной аналитики и атрибуции; контролировал эффективность каждого канала и регулярно отчитывался по ключевым показателям перед руководством.'
        ]
      }
    ],
    education: [
      { degree: 'Бакалавр, Маркетинг', place: 'Южный федеральный университет, экономический факультет', period: '2014–2018' }
    ],
    certGroups: [
      { title: 'Product & Marketing Management', items: ['Pragmatic Institute Certification', 'Certified Scrum Product Owner (CSPO)', 'Google Project Management Certificate', 'AIPMM Certified Product Manager'] },
      { title: 'Performance Marketing', items: ['Google Ads', 'Meta Blueprint', 'Яндекс.Директ'] }
    ],
    languages: [
      { name: 'Русский', level: 'родной' },
      { name: 'Украинский', level: 'родной' },
      { name: 'Английский', level: 'C1' },
      { name: 'Немецкий', level: 'B2' }
    ]
  }
};

/* Russian-first phase: EN/DE reuse the Russian content for these
   resume-style sections until properly translated on request. */
['cases', 'experience', 'education', 'certGroups', 'languages'].forEach(k => {
  I18N.en[k] = I18N.ru[k];
  I18N.de[k] = I18N.ru[k];
});
