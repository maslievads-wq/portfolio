/* Generates static case-study pages in all site languages (ru / en / de)
   from js/i18n.js. Content is baked into the markup for SEO; each language
   gets its own URL, <html lang>, title/meta/JSON-LD and hreflang alternates.
   Re-run after editing cases:  node scripts/generate-case-pages.js
*/
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ctx = {};
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/i18n.js'), 'utf8') + '\nthis.I18N = I18N;', ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8') + '\nthis.CASE_SLUGS = CASE_SLUGS;', ctx);
const I18N = ctx.I18N;
const slugs = ctx.CASE_SLUGS;
const SITE = 'https://dmitrymasliev.com/';
const LANGS = ['ru', 'en', 'de'];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => esc(s).replace(/"/g, '&quot;');

// ru keeps the base slug; en/de get a language suffix
const slugFor = (i, lang) => lang === 'ru' ? slugs[i] : slugs[i].replace('.html', '-' + lang + '.html');

const META = {
  ru: { htmlLang: 'ru', ogLocale: 'ru_RU', titleSuffix: 'Кейс | Dmitry Masliev' },
  en: { htmlLang: 'en', ogLocale: 'en_US', titleSuffix: 'Case | Dmitry Masliev' },
  de: { htmlLang: 'de', ogLocale: 'de_DE', titleSuffix: 'Case Study | Dmitry Masliev' }
};

function titleHtml(c) {
  const full = esc(c.title);
  if (c.titleAccent && c.title.indexOf(c.titleAccent) !== -1) {
    return full.replace(esc(c.titleAccent), `<span class="hl">${esc(c.titleAccent)}</span>`);
  }
  return full;
}

function caseBody(c, lang) {
  if (Array.isArray(c.blocks)) {
    return c.blocks.map(b => {
      if (b.h) return `<h2 class="case-page__h">${esc(b.h)}</h2>`;
      if (b.sub) return `<h3 class="case-page__sub">${esc(b.sub)}</h3>`;
      if (b.p) return `<p class="case-page__p">${esc(b.p)}</p>`;
      if (b.ul) return `<ul class="case-page__bullets">${b.ul.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
      if (b.tags) return `<div class="case-page__chips">${b.tags.map(x => `<span class="case-card__chip">${esc(x)}</span>`).join('')}</div>`;
      if (b.metrics) return `<div class="case-metrics">${b.metrics.map(m => `<div class="case-metric"><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join('')}</div>`;
      if (b.img) return `<figure class="case-figure"><img src="${escAttr(b.img)}" alt="${escAttr(b.alt || '')}" loading="lazy" />${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`;
      return '';
    }).join('\n          ');
  }
  const whatDone = I18N[lang].ui['case.whatDone'];
  return `<h2 class="case-page__what">${esc(whatDone)}</h2>\n          <ul class="case-page__bullets">${(c.bullets || []).map(b => `<li>${esc(b)}</li>`).join('')}</ul>`;
}

const nav = `
  <header class="nav" id="nav">
    <div class="container nav__inner">
      <a href="index.html" class="nav__brand" aria-label="Dmitry Masliev — home">
        <span class="nav__brand-mark">DM</span>
        <span class="nav__brand-text">Dmitry Masliev</span>
      </a>
      <div class="nav__right">
        <nav class="nav__links" id="navLinks" aria-label="Primary">
          <a href="index.html" class="nav__link" data-i18n="nav.home">Home</a>
          <a href="skills.html" class="nav__link" data-i18n="nav.skills">Skills</a>
          <a href="about.html" class="nav__link" data-i18n="nav.about">About</a>
          <a href="cases.html" class="nav__link" data-i18n="nav.cases">Cases</a>
          <a href="contact.html" class="nav__link nav__link--cta" data-i18n="nav.contact">Contact</a>
        </nav>
        <div class="lang" role="group" aria-label="Language">
          <button class="lang__btn" type="button" data-lang="en">EN</button>
          <button class="lang__btn" type="button" data-lang="de">DE</button>
          <button class="lang__btn" type="button" data-lang="ru">RU</button>
        </div>
        <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navLinks">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;

const footer = `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="nav__brand-mark">DM</span>
        <p data-i18n="footer.statement">Building marketing systems that drive measurable business growth.</p>
      </div>
      <nav class="footer__nav" aria-label="Footer">
        <a href="index.html" data-i18n="nav.home">Home</a>
        <a href="skills.html" data-i18n="nav.skills">Skills</a>
        <a href="about.html" data-i18n="nav.about">About</a>
        <a href="cases.html" data-i18n="nav.cases">Cases</a>
        <a href="contact.html" data-i18n="nav.contact">Contact</a>
        <a href="https://www.linkedin.com/in/masliev/?locale=ru" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer">Telegram</a>
      </nav>
    </div>
    <div class="container footer__bottom">
      <p data-i18n="footer.copyright">© 2026 Dmitry Masliev. All Rights Reserved.</p>
      <nav class="footer__legal" aria-label="Legal"><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></nav>
      <a href="#" class="footer__top" data-i18n="footer.backToTop" aria-label="Back to top">Back to top ↑</a>
    </div>
  </footer>`;

let count = 0;
slugs.forEach((_, i) => {
  const nextIndex = (i + 1) % slugs.length;
  // hreflang alternates shared by all language versions of this case
  const alternates = LANGS.map(l => `  <link rel="alternate" hreflang="${l}" href="${SITE}${slugFor(i, l)}" />`).join('\n') +
    `\n  <link rel="alternate" hreflang="x-default" href="${SITE}${slugFor(i, 'ru')}" />`;
  const altAttrs = LANGS.map(l => `data-alt-${l}="${slugFor(i, l)}"`).join(' ');

  LANGS.forEach(lang => {
    const m = META[lang];
    const c = I18N[lang].cases[i];
    const slug = slugFor(i, lang);
    const chips = (c.highlights || []).map(h => `<span class="case-card__chip">${esc(h)}</span>`).join('\n            ');
    const wa = 'https://wa.me/491622134731?text=' +
      encodeURIComponent('Hi Dmitry, I saw your case "' + c.title + '" and would like to connect.');
    const jsonld = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'CreativeWork',
      name: c.title, description: c.summary,
      author: { '@type': 'Person', name: 'Dmitry Masliev', jobTitle: 'Head of Marketing' },
      inLanguage: lang, url: SITE + slug
    });

    const html = `<!DOCTYPE html>
<html lang="${m.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0B0B0B" />

  <title>${esc(c.title)} — ${m.titleSuffix}</title>
  <meta name="description" content="${escAttr(c.summary)}" />
  <meta name="author" content="Dmitry Masliev" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escAttr(c.title)}" />
  <meta property="og:description" content="${escAttr(c.summary)}" />
  <meta property="og:locale" content="${m.ogLocale}" />

  <link rel="canonical" href="${SITE}${slug}" />
${alternates}
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
  <link rel="stylesheet" href="css/styles.css" />

  <script type="application/ld+json">
  ${jsonld}
  </script>
</head>
<body>
  <div class="bg-fx" aria-hidden="true">
    <div class="bg-gradient"></div>
    <canvas id="particles"></canvas>
  </div>

  <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
${nav}

  <main>
    <section class="section section--page">
      <div class="container">
        <article class="case-page" data-case-index="${i}" data-page-lang="${lang}" ${altAttrs}>
          <a class="case-page__back" href="cases.html" data-i18n="case.backToCases">← All cases</a>

          <span class="case-page__tag" data-case-field="tag">${esc(c.tag)}</span>
          <h1 class="case-page__title" data-case-field="title">${titleHtml(c)}</h1>

          <div class="case-page__chips" data-case-field="chips">
            ${chips}
          </div>

          <p class="case-page__summary" data-case-field="summary">${esc(c.summary)}</p>

          <div class="case-page__body" data-case-field="body">
          ${caseBody(c, lang)}
          </div>

          <div class="case-page__actions">
            <a class="btn btn--whatsapp" href="${escAttr(wa)}" target="_blank" rel="noopener noreferrer" data-case-field="contactLink" aria-label="Contact me on WhatsApp">
              <svg class="btn__wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.86 1.21 3.06.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12 2.04a9.95 9.95 0 0 0-8.56 14.99L2.1 22l5.1-1.34A9.95 9.95 0 1 0 12 2.04zm0 18.18c-1.5 0-2.98-.4-4.27-1.16l-.31-.18-3.03.79.81-2.95-.2-.31A8.27 8.27 0 1 1 12 20.22z"/></svg>
              <span data-i18n="case.contact">Get in touch</span>
            </a>
            <a class="btn btn--secondary case-page__next" href="${slugFor(nextIndex, lang)}">
              <span data-i18n="case.nextCase">Next case</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </article>
      </div>
    </section>
  </main>
${footer}

  <script src="js/i18n.js"></script>
  <script src="js/data.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
`;
    fs.writeFileSync(path.join(root, slug), html);
    count++;
  });
});
console.log('wrote', count, 'case pages (' + slugs.length + ' cases × ' + LANGS.length + ' languages)');
