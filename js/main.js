/* ============================================================
   Main interactivity + i18n
   - language switching (en / de / ru), persisted in localStorage
   - render skills / stats / cases from META + active language
   - scroll reveal, animated counters
   - sticky nav, mobile menu, active link, case modal, contact form
   - particle background
   ============================================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- i18n state ---------- */
  const LANGS = ['en', 'de', 'ru'];
  // Russian is the primary working language for now. A saved choice still
  // wins, so the switcher works. Restore browser auto-detect before launch.
  const DEFAULT_LANG = 'ru';
  function detectLang() {
    try {
      const saved = localStorage.getItem('lang');
      if (saved && LANGS.includes(saved)) return saved;
    } catch (e) { /* ignore */ }
    return DEFAULT_LANG;
  }
  let currentLang = detectLang();
  const pack = () => I18N[currentLang] || I18N.en;
  const t = key => (pack().ui[key] != null ? pack().ui[key] : (I18N.en.ui[key] != null ? I18N.en.ui[key] : key));

  /* ---------- Static text ---------- */
  function applyStaticText() {
    document.documentElement.lang = currentLang;
    $$('[data-i18n]').forEach(el => {
      const val = t(el.getAttribute('data-i18n'));
      if (val != null) el.textContent = val;
    });
  }

  /* ---------- Render skills ---------- */
  function renderSkills() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    const items = pack().skills;
    grid.innerHTML = SKILL_ICONS.map((icon, i) => {
      const s = items[i] || {};
      return `<article class="skill-card reveal" style="--reveal-delay:${(i % 3) * 70}ms">
        <div class="skill-card__icon">${ICONS[icon] || ''}</div>
        <h3>${s.t || ''}</h3>
        <p>${s.d || ''}</p>
      </article>`;
    }).join('');
  }

  /* ---------- Render stats ---------- */
  function renderStats() {
    const grid = $('#statsGrid');
    if (!grid) return;
    const labels = pack().stats;
    grid.innerHTML = STAT_META.map((m, i) => {
      const s = labels[i] || {};
      const display = m.text
        ? (s.value || '')
        : `<span class="counter" data-target="${m.value}" data-suffix="${m.suffix || ''}">0${m.suffix || ''}</span>`;
      return `<div class="stat"><div class="stat__num">${display}</div><div class="stat__label">${s.label || ''}</div></div>`;
    }).join('');
  }

  /* ---------- Render cases ---------- */
  function renderCases() {
    const grid = $('#casesGrid');
    if (!grid) return;
    const items = pack().cases;
    const limit = grid.dataset.limit ? parseInt(grid.dataset.limit, 10) : items.length;
    grid.innerHTML = items.slice(0, limit).map((c, i) => {
      const chips = (c.highlights || []).slice(0, 3).map(h => `<span class="case-card__chip">${h}</span>`).join('');
      const href = (typeof CASE_SLUGS !== 'undefined' && CASE_SLUGS[i]) || '#';
      return `
        <a class="case-card reveal" style="--reveal-delay:${(i % 3) * 70}ms" href="${href}">
          <span class="case-card__tag">${c.tag || ''}</span>
          <h3 class="case-card__title">${c.title || ''}</h3>
          <p class="case-card__desc">${c.summary || ''}</p>
          <div class="case-card__chips">${chips}</div>
          <span class="case-card__open">${t('case.viewStudy')}</span>
        </a>`;
    }).join('');
  }

  /* ---------- Case page (own URL, SEO) ---------- */
  function renderCasePage() {
    const root = document.querySelector('[data-case-index]');
    if (!root) return;
    const idx = parseInt(root.getAttribute('data-case-index'), 10);
    const c = pack().cases[idx];
    if (!c) return;
    const setText = (field, val) => { const el = root.querySelector(`[data-case-field="${field}"]`); if (el) el.textContent = val; };
    setText('tag', c.tag || '');
    setText('title', c.title || '');
    setText('summary', c.summary || '');
    const chips = root.querySelector('[data-case-field="chips"]');
    if (chips) chips.innerHTML = (c.highlights || []).map(h => `<span class="case-card__chip">${h}</span>`).join('');
    const bullets = root.querySelector('[data-case-field="bullets"]');
    if (bullets) bullets.innerHTML = (c.bullets || []).map(b => `<li>${b}</li>`).join('');
    const contact = root.querySelector('[data-case-field="contactLink"]');
    if (contact) contact.href = 'https://wa.me/491622134731?text=' +
      encodeURIComponent('Hi Dmitry, I saw your case "' + (c.title || '') + '" and would like to connect.');
    document.title = (c.title || 'Case') + ' — Dmitry Masliev';
  }

  /* ---------- Render competencies ---------- */
  function renderCompetencies() {
    const grid = $('#competenciesGrid');
    if (!grid || typeof COMPETENCIES === 'undefined') return;
    grid.innerHTML = COMPETENCIES.map((g, gi) => {
      const tags = g.items.map(it => `<span>${it}</span>`).join('');
      return `<div class="comp-group reveal" style="--reveal-delay:${(gi % 2) * 80}ms">
        <h3 class="comp-group__title">${t(g.key)}</h3>
        <div class="comp-group__tags">${tags}</div>
      </div>`;
    }).join('');
  }

  /* ---------- Scroll reveal ---------- */
  let revealObserver = null;
  function initReveal() {
    const els = $$('.reveal');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    els.forEach(el => { if (!el.classList.contains('is-visible')) revealObserver.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isFloat = !Number.isInteger(target);
    if (prefersReduced) { el.textContent = (isFloat ? target.toFixed(1) : target) + suffix; return; }
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = $$('.counter');
    if (!counters.length) return;
    if (!('IntersectionObserver' in window)) { counters.forEach(animateCounter); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- Sticky nav + scroll progress ---------- */
  function initNavScroll() {
    const nav = $('#nav');
    const progress = $('#scrollProgress');
    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle('is-scrolled', y > 30);
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    if (!toggle || !links) return;
    function close() { links.classList.remove('is-open'); toggle.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', e => { if (e.target.matches('.nav__link')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---------- Active nav per page ---------- */
  function initActiveNav() {
    const links = $$('.nav__link');
    if (!links.length) return;
    let here = window.location.pathname.split('/').pop() || 'index.html';
    if (here === '') here = 'index.html';
    if (here.startsWith('case-')) here = 'cases.html'; // case detail pages -> Cases
    links.forEach(l => {
      const target = (l.getAttribute('href') || '').split('/').pop();
      const match = target === here || (here === 'index.html' && (target === '' || target === 'index.html'));
      l.classList.toggle('is-active', match);
      if (match) l.setAttribute('aria-current', 'page');
    });
  }

  /* ---------- Language switcher ---------- */
  function updateLangSwitcher() {
    $$('.lang__btn').forEach(b => {
      const on = b.dataset.lang === currentLang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }
  function setLang(l) {
    if (!LANGS.includes(l) || l === currentLang) { updateLangSwitcher(); return; }
    currentLang = l;
    try { localStorage.setItem('lang', l); } catch (e) { /* ignore */ }
    applyStaticText();
    renderSkills(); renderStats(); renderCases(); renderCasePage(); renderCompetencies();
    // page already visible: reveal new dynamic cards immediately and run counters
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
    $$('.counter').forEach(animateCounter);
    updateLangSwitcher();
  }
  function initLangSwitcher() {
    $$('.lang__btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
    updateLangSwitcher();
  }

  /* ---------- Case modal ---------- */
  /* ---------- Contact form ---------- */
  function initForm() {
    const form = $('#contactForm');
    const note = $('#formNote');
    if (!form) return;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#name'), email = $('#email'), message = $('#message');
      let ok = true;
      [name, email, message].forEach(f => f.classList.remove('invalid'));

      if (!name.value.trim()) { name.classList.add('invalid'); ok = false; }
      if (!emailRe.test(email.value.trim())) { email.classList.add('invalid'); ok = false; }
      if (!message.value.trim()) { message.classList.add('invalid'); ok = false; }

      if (!ok) {
        note.textContent = t('form.error');
        note.className = 'contact__form-note error';
        return;
      }

      const subject = encodeURIComponent(`Portfolio inquiry from ${name.value.trim()}`);
      const bodyText = encodeURIComponent(`${message.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`);
      window.location.href = `mailto:maslievads@gmail.com?subject=${subject}&body=${bodyText}`;

      note.textContent = t('form.success');
      note.className = 'contact__form-note success';
      form.reset();
    });
  }

  /* ---------- Particle background ---------- */
  function initParticles() {
    const canvas = $('#particles');
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles, raf;
    const COUNT = window.innerWidth < 768 ? 26 : 54;

    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    function make() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4, a: Math.random() * 0.4 + 0.15
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 231, 183, ${p.a})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(110, 231, 183, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    function start() { resize(); make(); cancelAnimationFrame(raf); draw(); }
    window.addEventListener('resize', () => { resize(); make(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else draw(); });
    start();
  }

  /* ---------- Init ---------- */
  function init() {
    applyStaticText();
    renderSkills();
    renderStats();
    renderCases();
    renderCasePage();
    renderCompetencies();
    initReveal();
    initCounters();
    initNavScroll();
    initMobileMenu();
    initActiveNav();
    initLangSwitcher();
    initForm();
    initParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
