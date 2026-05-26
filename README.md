# Which Font?

Static site for [Which Font?](https://whichfont.hagersew.com), a browser extension that identifies fonts, typography, colors, and CSS on any webpage. Built with Next.js and deployed as a static export.

**Live site:** [https://whichfont.hagersew.com](https://whichfont.hagersew.com)

**Install:**

- [Chrome Web Store](https://chromewebstore.google.com/detail/which-font/bkjnfjfgcpmiifbmlmcfljigdbmkhppl)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/whichfont/)

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, static export)
- React 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [Framer Motion](https://www.framer.com/motion/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Generate OG image, then build static site into `out/` |
| `npm run start` | Serve the production build (after `build`) |
| `npm run lint` | Run ESLint |

`prebuild` runs `scripts/generate-og-image.tsx`, which writes `public/og.png` from the shared OG layout in `lib/og-image-content.tsx`. Metadata in `app/layout.tsx` references `/og.png` for Open Graph and Twitter cards.

## Project structure

```
app/                 # Routes (home, privacy policy)
components/
  demo/              # Interactive product demos
  layout/            # Header, footer, page chrome
  sections/          # Landing page sections
  ui/                # Shared UI primitives
content/
  landing.ts         # Copy, store links, feature lists
lib/                 # OG image config, utilities
public/              # Static assets (logo, badges, chrome-store assets)
scripts/
  generate-og-image.tsx
```

## Editing content

Most landing copy, store URLs, and feature lists live in [`content/landing.ts`](content/landing.ts). Section components under `components/sections/` compose the page; animated demos live under `components/demo/`.

## Build & deploy

The site is configured for static export (`output: "export"` in `next.config.ts`). `npm run build` outputs HTML and assets to `out/`.

On push to `main` or `master`, [`.github/workflows/main.yml`](.github/workflows/main.yml) builds the site and deploys `out/` via FTP. Required repository secrets: `FTP_USERNAME`, `FTP_PASSWORD`.

## Chrome Web Store assets

Extension listing images under `public/chrome-store/` are documented in [`public/chrome-store/README.md`](public/chrome-store/README.md).
