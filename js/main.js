/* ============================================================
   Main interactivity
   - render skills / stats / cases
   - scroll reveal, animated counters
   - sticky nav, mobile menu, scrollspy
   - case modal, contact form, particle background
   ============================================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Render skills ---------- */
  function renderSkills() {
    const grid = $('#skillsGrid');
    if (!grid) return;
    grid.innerHTML = SKILLS.map((s, i) => `
      <article class="skill-card reveal" style="--reveal-delay:${(i % 3) * 70}ms">
        <div class="skill-card__icon">${ICONS[s.icon] || ''}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </article>`).join('');
  }

  /* ---------- Render stats ---------- */
  function renderStats() {
    const grid = $('#statsGrid');
    if (!grid) return;
    grid.innerHTML = STATS.map(st => {
      const display = st.text
        ? st.text
        : `<span class="counter" data-target="${st.value}" data-suffix="${st.suffix || ''}">0${st.suffix || ''}</span>`;
      return `<div class="stat"><div class="stat__num">${display}</div><div class="stat__label">${st.label}</div></div>`;
    }).join('');
  }

  /* ---------- Render cases ---------- */
  function renderCases() {
    const grid = $('#casesGrid');
    if (!grid) return;
    grid.innerHTML = CASES.map((c, i) => {
      const metrics = c.metrics.slice(0, 2).map(m =>
        `<div class="case-card__metric"><strong>${m.value}${m.suffix}</strong><span>${m.label}</span></div>`).join('');
      return `
        <button class="case-card reveal" style="--reveal-delay:${(i % 3) * 70}ms" data-case="${i}" aria-haspopup="dialog">
          <span class="case-card__tag">${c.tag}</span>
          <h3 class="case-card__title">${c.title}</h3>
          <p class="case-card__desc">${c.desc}</p>
          <div class="case-card__metrics">${metrics}</div>
          <span class="case-card__open">View case study →</span>
        </button>`;
    }).join('');
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = $$('.reveal');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
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
      nav.classList.toggle('is-scrolled', y > 30);
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

  /* ---------- Scrollspy ---------- */
  function initScrollSpy() {
    const sections = $$('main section[id]');
    const links = $$('.nav__link');
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const map = {};
    links.forEach(l => { map[l.getAttribute('href').slice(1)] = l; });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          if (map[e.target.id]) map[e.target.id].classList.add('is-active');
        }
      });
    }, { threshold: 0.5, rootMargin: '-20% 0px -40% 0px' });
    sections.forEach(s => io.observe(s));
  }

  /* ---------- Case modal ---------- */
  function initModal() {
    const modal = $('#caseModal');
    const body = $('#modalBody');
    const grid = $('#casesGrid');
    if (!modal || !body || !grid) return;
    let lastFocused = null;

    function open(index) {
      const c = CASES[index];
      if (!c) return;
      const metrics = c.metrics.map(m =>
        `<div class="modal__metric"><strong>${m.value}${m.suffix}</strong><span>${m.label}</span></div>`).join('');
      const actions = c.actions.map(a => `<li>${a}</li>`).join('');
      const tools = c.tools.map(t => `<span>${t}</span>`).join('');
      body.innerHTML = `
        <span class="case-tag">${c.tag}</span>
        <h2 id="modalTitle">${c.title}</h2>
        <p class="case-meta">${c.industry}</p>
        <div class="modal__metrics">${metrics}</div>
        <div class="modal__block"><h4>Challenge</h4><p>${c.challenge}</p></div>
        <div class="modal__block"><h4>Actions Taken</h4><ul>${actions}</ul></div>
        <div class="modal__block"><h4>Tools Used</h4><div class="modal__tools">${tools}</div></div>
        <div class="modal__block"><h4>Results</h4><p>${c.results}</p></div>`;
      lastFocused = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
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
    modal.addEventListener('click', e => { if (e.target.hasAttribute('data-close')) close(); });
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
        note.textContent = 'Please complete all fields with a valid email.';
        note.className = 'contact__form-note error';
        return;
      }

      // No backend in this static build — open the user's mail client as a graceful fallback.
      const subject = encodeURIComponent(`Portfolio inquiry from ${name.value.trim()}`);
      const bodyText = encodeURIComponent(`${message.value.trim()}\n\n— ${name.value.trim()} (${email.value.trim()})`);
      window.location.href = `mailto:maslievads@gmail.com?subject=${subject}&body=${bodyText}`;

      note.textContent = 'Thanks! Your email client is opening — I’ll reply shortly.';
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

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
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
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 231, 183, ${p.a})`;
        ctx.fill();
      });
      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(110, 231, 183, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    function start() { resize(); make(); cancelAnimationFrame(raf); draw(); }
    window.addEventListener('resize', () => { resize(); make(); });
    // pause when tab hidden to save CPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf); else draw();
    });
    start();
  }

  /* ---------- Footer year ---------- */
  // (kept static per spec: © 2026)

  /* ---------- Init ---------- */
  function init() {
    renderSkills();
    renderStats();
    renderCases();
    initReveal();
    initCounters();
    initNavScroll();
    initMobileMenu();
    initScrollSpy();
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
