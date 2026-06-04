/* Generates one static HTML page per case from the Russian content in
   js/i18n.js. Content is baked into the markup for SEO; js/main.js keeps it
   in sync when the language is switched. Re-run after editing cases:
     node scripts/generate-case-pages.js
*/
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
// Load I18N and CASE_SLUGS by evaluating the source files.
const ctx = {};
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/i18n.js'), 'utf8') + '\nthis.I18N = I18N;', ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8') + '\nthis.CASE_SLUGS = CASE_SLUGS;', ctx);
const cases = ctx.I18N.ru.cases;
const slugs = ctx.CASE_SLUGS;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => esc(s).replace(/"/g, '&quot;');

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
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer">Telegram</a>
      </nav>
    </div>
    <div class="container footer__bottom">
      <p data-i18n="footer.copyright">© 2026 Dmitry Masliev. All Rights Reserved.</p>
      <a href="#" class="footer__top" data-i18n="footer.backToTop" aria-label="Back to top">Back to top ↑</a>
    </div>
  </footer>`;

cases.forEach((c, i) => {
  const slug = slugs[i];
  const next = slugs[(i + 1) % slugs.length];
  const chips = (c.highlights || []).map(h => `<span class="case-card__chip">${esc(h)}</span>`).join('\n            ');
  const bullets = (c.bullets || []).map(b => `<li>${esc(b)}</li>`).join('\n            ');
  const wa = 'https://wa.me/491622134731?text=' +
    encodeURIComponent('Hi Dmitry, I saw your case "' + c.title + '" and would like to connect.');
  const jsonld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: c.title,
    description: c.summary,
    author: { '@type': 'Person', name: 'Dmitry Masliev', jobTitle: 'Head of Marketing' },
    inLanguage: 'ru'
  });

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0B0B0B" />

  <title>${esc(c.title)} — Кейс | Dmitry Masliev</title>
  <meta name="description" content="${escAttr(c.summary)}" />
  <meta name="author" content="Dmitry Masliev" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escAttr(c.title)}" />
  <meta property="og:description" content="${escAttr(c.summary)}" />

  <link rel="canonical" href="https://dmitrymasliev.com/${slug}" />
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

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
        <article class="case-page" data-case-index="${i}">
          <a class="case-page__back" href="cases.html" data-i18n="case.backToCases">← All cases</a>

          <span class="case-page__tag" data-case-field="tag">${esc(c.tag)}</span>
          <h1 class="case-page__title" data-case-field="title">${esc(c.title)}</h1>

          <div class="case-page__chips" data-case-field="chips">
            ${chips}
          </div>

          <p class="case-page__summary" data-case-field="summary">${esc(c.summary)}</p>

          <h2 class="case-page__what" data-i18n="case.whatDone">What I did and how</h2>
          <ul class="case-page__bullets" data-case-field="bullets">
            ${bullets}
          </ul>

          <div class="case-page__actions">
            <a class="btn btn--primary" href="${escAttr(wa)}" target="_blank" rel="noopener noreferrer" data-case-field="contactLink" data-i18n="case.contact">Get in touch</a>
            <a class="btn btn--secondary case-page__next" href="${next}">
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
  console.log('wrote', slug);
});
