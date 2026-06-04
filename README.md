# Dmitry Masliev — Portfolio

A premium personal portfolio website for a **Head of Marketing with entrepreneurial experience**.
Positioned for B2B marketing-consulting clients and CMO / Marketing Director / Growth Lead opportunities.

> "I don't just run marketing campaigns. I build marketing systems that support business growth."

## ✨ Highlights

- **Premium dark, minimal aesthetic** inspired by modern portfolio sites (e.g. The Digital Panda)
- **Fully responsive**, desktop-first, mobile optimized
- **Smooth, performant animations** — scroll reveals, animated counters, animated gradient + particle background, hover interactions, floating elements
- **Zero build step** — plain HTML / CSS / vanilla JS, deploys anywhere static
- **SEO-friendly** — semantic markup, meta + Open Graph tags, JSON-LD structured data, `robots.txt`, `sitemap.xml`
- **Accessible** — keyboard-navigable nav and modals, focus management, `aria` attributes, `prefers-reduced-motion` support

## 🗂 Structure

```
portfolio/
├── index.html          # Home (hero)
├── skills.html         # Core Expertise
├── about.html          # About Me
├── cases.html          # Selected Cases (+ case modal)
├── contact.html        # Contact form + links
├── css/styles.css      # Design system + all styles (shared)
├── js/
│   ├── data.js         # Content: skills, stats, cases, icons
│   └── main.js         # Interactivity (reveals, counters, modal, form, particles)
├── assets/             # SVG portrait placeholder + favicon
├── robots.txt
├── sitemap.xml
└── README.md
```

### Pages (separate URLs, shared header/footer)
1. **Home** (`index.html`) — two-column hero with headline, offer, CTAs and portrait
2. **Skills** (`skills.html`) — 10-card "Core Expertise" grid
3. **About** (`about.html`) — narrative, animated statistics, core strengths, personal statement
4. **Cases** (`cases.html`) — selected case studies, each opening a detailed modal
5. **Contact** (`contact.html`) — form + contact links (LinkedIn, Telegram, Email, Location)

The navigation links to real pages (not in-page anchors); the active page is
highlighted automatically based on the current URL. `js/main.js` renders the
page-specific content and silently no-ops for sections not present on a page,
so all pages share one script and one stylesheet.

## 🎨 Design system

| Token            | Value     |
|------------------|-----------|
| Background        | `#0B0B0B` |
| Background alt    | `#141414` |
| Neutral           | `#222222` |
| Primary text      | `#FFFFFF` |
| Secondary text    | `#A0A0A0` |
| Accent            | `#6EE7B7` |
| Accent alt        | `#3B82F6` |
| Font              | Inter     |

## 🚀 Run locally

It's static — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## ✏️ Editing content

- **Skills / stats / cases:** edit `js/data.js`
- **Copy & layout:** edit `index.html`
- **Styling & theme tokens:** edit the `:root` variables in `css/styles.css`
- **Portrait:** replace `assets/portrait.svg` with a real photo (update the `<img>` `src` in `index.html`)

## 📝 Notes

- The contact form is front-end only and falls back to opening the visitor's mail client (`mailto:`). Connect a form backend (Formspree, Netlify Forms, etc.) for server-side submission.
- Update the placeholder LinkedIn / Telegram URLs and canonical domain when going live.

---

© 2026 Dmitry Masliev. All Rights Reserved.
