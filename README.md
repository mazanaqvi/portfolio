# alihumza.com

Portfolio of **Ali Humza**, full-stack and mobile engineer in Lahore. Flutter, React Native and Next.js products, with 10+ apps live on the App Store and Google Play.

Live at **[alihumza.com](https://alihumza.com)**.

## Stack

- React 19 + TypeScript, Vite 7
- React Router 7
- [Motion](https://motion.dev) for animation (scroll reveals, layout transitions, drag carousel, magnetic buttons)
- SCSS with CSS custom properties for theming
- lucide-react for UI icons, Font Awesome brands for store and social glyphs
- Capacitor wrappers for iOS and Android (`ios/`, `android/`)

## Design

The visual system is called **Ink & Signal**: warm near-black canvases in dark mode, paper-white in light mode, one electric lime accent used as a signal (status dot, highlighted words, primary button), hairline borders, large Geist type with Instrument Serif italics for emphasis, and a subtle film grain instead of blurred blobs. Tokens live in `src/styles/_tokens.scss`.

Interactive bits worth knowing about:

- `⌘K` / `Ctrl+K` opens a command palette (pages, projects, copy email, theme). `T` toggles the theme.
- Project cards have a cursor-following spotlight and link to a case-study page (`/work/glory-global-driver/`); the active filter lives in the URL (`/work/?filter=mobile`).
- Reviews are a draggable carousel on the home page and a full list on `/reviews`.
- The footer shows a live Lahore clock.

## Project images

Every project card uses one fixed resolution so the grid never crops inconsistently:

```
public/img/projects/<id>.webp   1600 × 1000 (16:10)
```

Sources and modes are declared in `scripts/project-images.json`. `cover` is for 16:10 live screenshots; `fit` places the full source on a blurred, darkened copy of itself so nothing is cut off. Rebuild with:

```bash
npm run build:images
```

The Open Graph card is `public/og.jpg` (1200 × 630), rebuilt from `public/img/preview.png` with `npm run build:og`.

## SEO and static pages

GitHub Pages only answers 200 for files that exist, so a plain single-page build makes every route except `/` return HTTP 404 to search engines. `npm run build` therefore ends with `scripts/prerender.mjs`, which loads each route in headless Chrome and saves the rendered HTML:

```
dist/index.html
dist/work/index.html
dist/work/<project-id>/index.html   one case-study page per project
dist/about/index.html  …            and so on
dist/sitemap.xml                    every indexable URL
```

- Routes are published as folders, so canonical URLs end in a slash (`/work/`).
- `src/data/seo.ts` holds the title and description for every page; `useSeo` keeps the head in sync and the prerender step saves the result.
- `index.html` carries JSON-LD for the person (name "Ali Humza", alternate spelling "Ali Hamza", job title, profiles) and the site.
- The payment and game pages are marked `noindex`.
- Prerendered markup sits in `#root` for crawlers and stays hidden for visitors with JavaScript until the app mounts, so there is no flash.
- If Chrome is missing the build still succeeds as a plain SPA and prints a warning. Set `CHROME_PATH` to point at a browser.

After a deploy, submit `https://alihumza.com/sitemap.xml` in Google Search Console.

## Structure

```
src/
├── components/
│   ├── layout/   Navbar, Footer, CommandPalette, ScrollProgress, ThemeToggle, ToTop
│   ├── home/     Hero, TechStrip, FeaturedWork, StoreLedger, NowSection, Experience, Skills, Testimonials, ContactCta
│   ├── work/     ProjectCard, ProjectGrid
│   ├── ui/       Reveal, Magnetic, Counter, Marquee, SectionHead, StoreLink, ToastProvider
│   └── Payment/  Bank and wallet cards for /payment-method
├── data/         projects.ts, site.ts, seo.ts, resume.ts, reviews.ts, payments.ts
├── hooks/        useTheme, useToast, useCopy, useSpotlight, useMediaQuery, useCommandPalette, use2048
├── pages/        Home, Work, Project (case study), About, Reviews, Resume, Contact, Game, Payment*
└── styles/       _tokens, _base, _components, _sections, _game, _payment
```

## Scripts

```bash
npm run dev            # start Vite
npm run build          # typecheck + production build + prerender + sitemap
npm run preview        # serve the build
npm run lint
npm run build:images   # regenerate 1600x1000 project images
npm run build:og       # regenerate the 1200x630 OG card
```

## Deployment

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`. Old URLs (`/mobile`, `/websites`, `/products`, `/live-apps`) redirect to the filtered `/work/` page.

## Contact

- alihumza.dev@gmail.com
- [LinkedIn](https://www.linkedin.com/in/mazanaqvi/) · [GitHub](https://github.com/mazanaqvi) · [XrossApps](https://www.xrossapps.com/)
