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
      return `
        <button class="case-card reveal" style="--reveal-delay:${(i % 3) * 70}ms" data-case="${i}" aria-haspopup="dialog">
          <span class="case-card__tag">${c.tag || ''}</span>
          <h3 class="case-card__title">${c.title || ''}</h3>
          <p class="case-card__desc">${c.summary || ''}</p>
          <div class="case-card__chips">${chips}</div>
          <span class="case-card__open">${t('case.viewStudy')}</span>
        </button>`;
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
    renderSkills(); renderStats(); renderCases();
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
  function initModal() {
    const modal = $('#caseModal');
    const body = $('#modalBody');
    const grid = $('#casesGrid');
    if (!modal || !body || !grid) return;
    let lastFocused = null;

    function open(index) {
      const list = pack().cases;
      const c = list[index];
      if (!c) return;
      const chips = (c.highlights || []).map(h => `<span class="modal__chip">${h}</span>`).join('');
      const bullets = (c.bullets || []).map(b => `<li>${b}</li>`).join('');
      const next = (index + 1) % list.length;
      const wa = 'https://wa.me/491622134731?text=' +
        encodeURIComponent('Hi Dmitry, I saw your case "' + (c.title || '') + '" and would like to connect.');
      body.innerHTML = `
        <span class="case-tag">${c.tag || ''}</span>
        <h2 id="modalTitle">${c.title || ''}</h2>
        ${chips ? `<div class="modal__chips">${chips}</div>` : ''}
        ${c.summary ? `<p class="modal__summary">${c.summary}</p>` : ''}
        <div class="modal__block"><h4>${t('case.whatDone')}</h4><ul>${bullets}</ul></div>
        <div class="modal__actions">
          <a href="${wa}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">${t('case.contact')}</a>
          <button type="button" class="btn btn--secondary modal__next" data-next="${next}">
            <span>${t('case.nextCase')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </button>
        </div>`;
      lastFocused = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.modal__dialog').scrollTop = 0;
      const closeBtn = $('.modal__close', modal);
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    grid.addEventListener('click', e => {
      const card = e.target.closest('[data-case]');
      if (card) open(parseInt(card.dataset.case, 10));
    });
    modal.addEventListener('click', e => {
      if (e.target.hasAttribute('data-close')) { close(); return; }
      const nextBtn = e.target.closest('[data-next]');
      if (nextBtn) open(parseInt(nextBtn.dataset.next, 10));
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  }

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
    initReveal();
    initCounters();
    initNavScroll();
    initMobileMenu();
    initActiveNav();
    initLangSwitcher();
    initModal();
    initForm();
    initParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
