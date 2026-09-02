import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Netlify's form detection only scans the static HTML produced by `npm run build` -
// it can't see the contact form that React renders at runtime. This plugin injects a
// hidden shadow copy of that form into the built index.html (build only, never in the
// dev server or the source index.html) purely so Netlify's bot can register it.
// Field names must stay in sync with the real form in src/App.jsx.
function injectNetlifyShadowForm() {
  return {
    name: 'inject-netlify-shadow-form',
    apply: 'build',
    transformIndexHtml() {
      return {
        html: '',
        tags: [
          {
            tag: 'form',
            attrs: {
              name: 'contact',
              'data-netlify': 'true',
              'netlify-honeypot': 'bot-field',
              hidden: true,
              style: 'display: none',
            },
            children: [
              { tag: 'input', attrs: { type: 'text', name: 'name' } },
              { tag: 'input', attrs: { type: 'text', name: 'business' } },
              { tag: 'input', attrs: { type: 'text', name: 'contact' } },
              { tag: 'textarea', attrs: { name: 'message' } },
              { tag: 'input', attrs: { type: 'text', name: 'bot-field' } },
            ],
            injectTo: 'body',
          },
        ],
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), injectNetlifyShadowForm()],
});
