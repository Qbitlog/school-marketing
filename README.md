# School OS — Marketing Website

A static marketing landing page for **School OS**, an all-in-one school management platform. Built with plain HTML, CSS, and JavaScript — no build step or framework required.

Developed by [QBITLOG](https://www.qbitlog.com/).

## Features

- **Responsive layout** — mobile-first design with a collapsible navigation menu
- **Hero section** — product overview with call-to-action buttons
- **Modules** — showcase of core platform capabilities (students, teachers, academics, finance, transport, communication)
- **Benefits** — role-based value props for admins, teachers, students, and parents
- **Pricing** — four tiers based on student strength, plus enterprise custom pricing
- **About** — company information with a link to QBITLOG
- **Testimonials** — auto-playing carousel with touch/swipe support
- **Contact form** — enquiry form with package pre-selection from pricing or demo buttons

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Markup      | HTML5                               |
| Styles      | Plain CSS (BEM naming, mobile-first)|
| Scripts     | Vanilla JavaScript (ES5-compatible) |
| Fonts       | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |

## Project Structure

```
marketing-website/
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # Global styles and component styles
├── js/
│   └── main.js         # Navigation, carousel, contact form logic
├── assets/             # Images (hero, modules, roles, testimonials, etc.)
└── README.md
```

## Getting Started

No installation is required. Open the site locally using any static file server or directly in a browser.

### Option 1 — Open in browser

Double-click `index.html`, or open it from your browser's file menu.

### Option 2 — Local dev server (recommended)

Using Python:

```bash
python -m http.server 8080
```

Using Node.js (`npx`):

```bash
npx serve .
```

Then visit `http://localhost:8080`.

## Page Sections

| Section        | Anchor      | Description                                      |
| -------------- | ----------- | ------------------------------------------------ |
| Modules        | `#modules`  | Platform feature cards                           |
| Benefits       | `#benefits` | Built-for-everyone role cards                    |
| Pricing        | `#pricing`  | Starter, Growth, Premium, Enterprise plans       |
| About Us       | `#about`    | QBITLOG company overview                         |
| Testimonials   | `#testimonials` | School feedback carousel                     |
| Contact        | `#contact`  | Enquiry form and trust stats                     |

## Pricing Plans

| Plan       | Target              | Price          |
| ---------- | ------------------- | -------------- |
| Starter    | Up to 200 students  | ₹999/month     |
| Growth     | Up to 1,000 students| ₹2,999/month   |
| Premium    | Up to 5,000 students| ₹4,999/month   |
| Enterprise | School chains       | Custom         |

Clicking **Get Started** on any pricing card scrolls to the contact form and pre-selects that package.

## Contact Form

The contact section collects:

- Name
- Email
- Phone number
- School name
- Package (Demo, Starter, Growth, Premium, or Enterprise)

### Package pre-selection

Buttons with a `data-package` attribute automatically scroll to the contact form and select the matching package:

```html
<a href="#contact" data-package="growth" class="btn btn--primary">Get Started</a>
```

Supported values: `demo`, `starter`, `growth`, `premium`, `enterprise`.

The URL is updated to `#contact?package=<name>` for shareable links. **Book a Demo** buttons use `data-package="demo"`.

> **Note:** Form submission currently shows a client-side success message only. Connect it to your backend API, email service, or form provider (e.g. Formspree, Netlify Forms) for production use.

## JavaScript Behavior

`js/main.js` handles:

- Sticky header shadow on scroll
- Mobile navigation toggle
- Testimonials carousel (auto-play, arrows, dots, swipe)
- Contact form validation and success feedback
- Package pre-selection and smooth scroll to `#contact`

## Customization

| What to change        | Where                                              |
| --------------------- | -------------------------------------------------- |
| Page content          | `index.html`                                       |
| Colors, spacing, layout | `css/style.css` (`:root` CSS variables at the top) |
| Interactions          | `js/main.js`                                       |
| Images                | `assets/` folder, then update `src` paths in HTML  |
| Valid package values  | `validPackages` array in `js/main.js` and `<select>` options in `index.html` |

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses progressive enhancement with no external runtime dependencies beyond Google Fonts.

## License

© 2026 School OS. All rights reserved.
