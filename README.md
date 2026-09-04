# trevona.dev

A single-page marketing site for trevona.dev. Positioning: **"More customers. Not
just a website."** - the site's job is framed as generating leads/bookings, not just
looking good. It builds fast, mobile-friendly websites for **any business, anywhere**,
with an optional AI-powered reservation/booking assistant for businesses that take
appointments (salons, restaurants, clinics, etc).

The site funnels visitors toward a contact form (Netlify Forms) rather than any
outbound-only channel like WhatsApp - the goal is a direct, trackable lead, and the
highest-intent actions on the page (form submits, CTA clicks, demo link clicks, call
button clicks) are individually tracked in GA4 (see "Analytics" below).

## Stack

- **React 18** + **Vite 5** (`@vitejs/plugin-react`) - no router, everything is one
  page with anchor-link navigation (`#about`, `#pricing`, `#contact`, etc).
- Plain CSS (`src/styles.css`) with a small design-token system (CSS custom
  properties for color/spacing) - no CSS framework.
- No backend. The contact form posts to **Netlify Forms**.

## Project structure

```
index.html          Document head: meta tags, SEO, analytics, fonts, JSON-LD
vite.config.js       Vite config + a build-only plugin (see "Netlify Forms" below)
src/
  main.jsx           React entry point
  App.jsx             The entire site - all sections, copy, and the contact form
  analytics.js         trackEvent() helper - the only place code should call gtag()
  styles.css          Design tokens + all component styles
  assets/
    logo2.svg          Current logo (used in the nav)
    Trevonalogo.svg    Earlier logo variant, unused - safe to delete if unwanted
public/
  favicon.svg          Browser tab icon (same artwork as logo2.svg)
  logo-512.png          Square PNG version of the logo (apple-touch-icon, JSON-LD logo)
  og-image.png          1200x630 social share banner (rendered from the site's own palette)
  illustrations/         Flat-illustration SVGs used in the hero and service sections
  robots.txt, sitemap.xml
  _redirects           Netlify SPA redirect rule (`/* /index.html 200`)
```

## Getting started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Sections (in `App.jsx`)

Hero -> Why trevona.dev (capsule panel) -> Our Services (alternating service bands) ->
What You Get / AI Reservations (feature rows) -> Demo websites -> Pricing -> Contact ->
Footer.

The visual design (color palette, pill buttons, capsule/stadium-shaped section
backgrounds, illustration style) was adapted from a Figma community reference file,
then reworked with trevona.dev's own copy and content.

## Contact form -> Netlify Forms

The form in `App.jsx` posts to Netlify via `fetch('/', { method: 'POST', ... })`, the
standard AJAX pattern for Netlify Forms.

There's a wrinkle specific to this being a client-rendered SPA: Netlify's form
detection scans the **static HTML** in `dist/` at deploy time, and doesn't run
JavaScript - so it can never see a form that only exists once React renders. To work
around this, `vite.config.js` has a build-only plugin (`injectNetlifyShadowForm`,
`apply: 'build'`) that injects a hidden, never-submitted duplicate of the form into
`dist/index.html` during `npm run build` only. It never appears in `npm run dev` or in
the source `index.html`. If you add/remove/rename a field on the real form, update the
field list in that plugin to match, or Netlify won't register the new field.

## Analytics

`index.html` loads **two** separate tracking setups:

1. A direct `gtag.js` snippet for GA4 property **`G-381CQRLBZC`**.
2. A **Google Tag Manager** container, **`GTM-MDKXZGMB`**.

These are independent delivery paths. GTM currently has no GA4 tag configured inside
it, so it forwards nothing to GA4 today. **All custom event tracking in this codebase
goes through the direct `gtag.js` path only** (via `src/analytics.js`) - if a GA4
Configuration tag is ever added inside the GTM container pointed at the same property,
pageviews (and these custom events, if also wired there) would double-count. Don't add
one without removing the direct snippet at the same time.

### Custom events

`src/analytics.js` exports a single `trackEvent(name, params)` helper - a thin,
guarded wrapper around `window.gtag('event', name, params)`. Every custom event in the
app goes through it rather than calling `gtag` directly, so the "is GA loaded yet"
guard only has to live in one place.

Four events are wired up in `App.jsx`, covering the highest-intent actions on the page:

| Event | Fires on | Params |
|---|---|---|
| `contact_form_submit` | Netlify form fetch resolving with `response.ok` (not on click - failed/pending submissions don't count) | `{ method: 'contact_form' }` |
| `cta_click` | Any "Get in Touch" button/link (nav, hero, footer) | `{ cta_location: 'nav' \| 'hero' \| 'footer' }` |
| `demo_site_click` | Either outbound "Open" link in the Demo Websites section | `{ demo_name: 'barbershop' \| 'takeaway' }` |
| `call_button_click` | The `tel:` link in the Contact section | `{ location: 'contact_section' }` |

None of these carry user-entered form data (name, email, business, message) - they
confirm *that* an action happened, not what was typed. Verified directly: submitting
the form with real-looking values and inspecting every `gtag()` call made confirms no
PII reaches the event params.

Note the `contact_form_submit` wiring also fixed a latent bug: the fetch handler
previously treated any resolved response as success (Netlify Forms 404s don't reject
the `fetch` promise), so a broken form endpoint would have silently shown "message
sent!" to a visitor whose submission never arrived. It now checks `response.ok` before
reporting success.

**Manual follow-up, not code** - once these events are confirmed flowing in the real
GA4 property (GA4 Admin -> DebugView, or Realtime): mark `contact_form_submit` (and
optionally `call_button_click`) as a **Key event** in GA4 Admin -> Events. That's what
lets Google/Meta Ads later optimize toward real leads instead of raw clicks - hold off
on paid ad spend until Key events are confirmed live for a few days.

## SEO

- Per-page `<title>` / meta description, canonical URL, `robots` meta.
- Open Graph + Twitter Card tags, backed by a real `public/og-image.png`.
- `Organization` JSON-LD structured data.
- `public/robots.txt` + `public/sitemap.xml`.
- Google Fonts (Poppins) loaded via `<link rel="preconnect">` + `<link rel="stylesheet">`
  rather than a CSS `@import`, for a faster first paint.

**All the absolute URLs above (canonical, `og:url`, `og:image`, sitemap `loc`, JSON-LD
`url`/`logo`) are hardcoded to `https://trevona.dev/`.** If the production domain ever
differs, these need updating or search engines/social crawlers will index the wrong URL.

## Known placeholders

These are stand-ins, not real business details - replace before going live:

- `phoneNumberDisplay` in `App.jsx` (`+447541052535`) - used for the `tel:` link.
- The two demo site links in `App.jsx` (`barbershopinit.netlify.app`,
  `takeawayinit.netlify.app`) - marked as placeholder live links in the source.
- Pricing figures (`GBP 250-500`, AI add-on `+GBP 40-80/month`) are illustrative, not
  confirmed real pricing.
