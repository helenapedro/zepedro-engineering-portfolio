# Scalable React-Firestore Architecture: Engineering Project Showcase

A high-performance single-page application architected to showcase complex civil engineering projects through a scalable React frontend, optimized Firestore querying, multilingual presentation, and offline-ready content delivery.

The platform is more than a portfolio site: it is a technical case study in building a resilient project showcase for infrastructure work, including social housing, bridges, drainage systems, airport pavement rehabilitation, and multimedia engineering documentation.

## Core Technical Achievements

### Multi-Tier Caching System

The application implements a TTL-based caching engine in [`src/utils/cacheStore.js`](src/utils/cacheStore.js) with two layers:

- In-memory cache for fast repeated reads during the active browser session.
- `localStorage` persistence for cross-session reuse of query results.
- One-hour default TTL expiration through `DEFAULT_CACHE_TTL_MS`.
- Fail-open resilience when browser storage is unavailable, allowing the app to continue with memory-only caching.

This strategy reduces redundant Firestore reads while keeping project data fresh enough for a live portfolio.

### Server-Side Query Strategy

Project listing is handled by [`src/Hooks/useProjectsServer.js`](src/Hooks/useProjectsServer.js), which avoids loading the full `projects` collection into the browser.

The data layer uses:

- Firestore `where("categoryId", "in", [...])` filtering.
- Cursor-based pagination with `orderBy(documentId())`, `startAfter(...)`, and `limit(pageSize)`.
- Cached cursor metadata to support page navigation without repeatedly walking every previous page.
- Defensive handling for Firestore's 10-value `in` filter limit.

### Optimized Data Metadata

The platform uses Firestore aggregate reads through `getCountFromServer(...)` for:

- Total project count per selected filter set.
- Category count metadata in the filter dropdown.

This avoids full document reads when the UI only needs totals.

### Globalization and Offline-First Delivery

Phase 1 of the technical roadmap adds:

- Runtime internationalization with `i18next` and `react-i18next`.
- English and Portuguese route support, including `/pt`, `/pt/projetos/:id`, `/pt/formacao`, and `/pt/sobre`.
- Compatibility localization for current flat Firestore strings, plus support for future map fields like `{ en, pt }`.
- PWA manifest, service worker, offline fallback, and persistent shell/media caching.

### Global Asset Delivery

The architecture is designed for high-resolution engineering assets delivered through AWS S3 and CloudFront. Project images, technical media, and video references can be served globally with low-latency CDN delivery while Firestore remains focused on metadata and queryable project structure.

## Tech Stack and Infrastructure

- Frontend: React 18, React Router v6, TypeScript, React-Bootstrap, CSS Modules.
- Internationalization: `i18next`, `react-i18next`, `i18next-browser-languagedetector`.
- Backend and Database: Firebase Firestore.
- Storage and CDN: AWS S3, AWS CloudFront-ready asset delivery.
- PWA: Custom service worker, web manifest, offline fallback, installable shell.
- Development: Node.js 20.x compatible workflow, Create React App / `react-scripts`.

## Architectural Deep Dive

### Data Layer Abstraction

- [`src/Hooks/useProjectsServer.js`](src/Hooks/useProjectsServer.js): server-side Firestore filtering, cursor pagination, count aggregation, and cached cursor metadata.
- [`src/Hooks/fetchProjectsByCategory.tsx`](src/Hooks/fetchProjectsByCategory.tsx): category-based Firestore reads.
- [`src/Hooks/useData.ts`](src/Hooks/useData.ts): generic document/collection access through a reusable hook.
- [`src/Hooks/homeData.ts`](src/Hooks/homeData.ts): cached profile/home document reads.

### State and Cache Management

- [`src/utils/cacheStore.js`](src/utils/cacheStore.js): memory-first cache with persistent fallback and TTL invalidation.
- [`src/Hooks/useCachedAsyncData.js`](src/Hooks/useCachedAsyncData.js): hook abstraction that lets Firestore-backed UI reuse cached data without duplicating fetch lifecycle logic.

### Globalization Layer

- [`src/i18n/index.ts`](src/i18n/index.ts): i18next initialization and browser language detection.
- [`src/i18n/routes.ts`](src/i18n/routes.ts): localized route generation and language-aware path translation.
- [`src/i18n/localizedValue.ts`](src/i18n/localizedValue.ts): Firestore localization adapter for both current flat strings and future localized map fields.
- [`src/i18n/firestoreFallbacks.ts`](src/i18n/firestoreFallbacks.ts): Portuguese compatibility translations for existing Firestore content.

### PWA Layer

- [`public/service-worker.js`](public/service-worker.js): shell and media caching, offline navigation fallback, and cache cleanup.
- [`public/manifest.json`](public/manifest.json): installable application metadata.
- [`public/offline.html`](public/offline.html): offline fallback screen.
- [`src/pwa/registerServiceWorker.ts`](src/pwa/registerServiceWorker.ts): production service worker registration.

## Real-World Engineering Context

The application presents infrastructure and architecture work with direct connection to field delivery, public works, and technical coordination.

- Social Housing Infrastructure: the 120 social apartments project in Buco-Zau, funded by PIIM, including media coverage and construction progress context.
- Public Works and Access Infrastructure: the New Bridge over the Lucola River and its access roads.
- Urban Systems: stormwater drainage rehabilitation in Cabinda City.
- Aviation Infrastructure: pavement rehabilitation at Maria Mambo Café Airport.
- Multimedia Engineering Documentation: TV interview clips, high-resolution project galleries, and electronic model references such as the Mamaland / Tchiela Farm project.

## Installation

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment Variables

Create `.env.local` in the project root and provide Firebase/Web asset configuration:

```bash
GENERATE_SOURCEMAP=false
REACT_APP_BASE_URL=http://localhost:3000/
REACT_APP_FIREBASE_STORAGE_BASE_URL=...

REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_MEASUREMENT_ID=...
```

## App Routes

- `/`: English project showcase.
- `/projects/:id`: English project details.
- `/education`: education and certificates.
- `/about`: profile/about page.
- `/pt`: Portuguese project showcase.
- `/pt/projetos/:id`: Portuguese project details.
- `/pt/formacao`: Portuguese education route.
- `/pt/sobre`: Portuguese about route.

Legacy English routes remain available so existing links continue to work.

## Firestore Requirements

The app expects readable Firestore collections for:

- `projects`
- `category`
- `home`

For filtered project queries, Firestore may request composite indexes depending on production query shape. If Firestore returns an index link at runtime, create the suggested index in the Firebase console.

Firestore rules must allow the public read operations required by the portfolio:

- Project listing and detail reads.
- Category reads and count aggregation.
- Home/profile document reads.

## Localized Content Model

The current application supports two Firestore content shapes.

Current flat string schema:

```json
{
  "title": "Construction of 120 Social Apartments in Buco-Zau"
}
```

Future localized map schema:

```json
{
  "title": {
    "en": "Construction of 120 Social Apartments in Buco-Zau",
    "pt": "Construção de 120 Apartamentos Sociais no Buco-Zau"
  }
}
```

The compatibility layer translates known flat English values today and will automatically prefer localized Firestore maps as the database schema evolves.

## Future Technical Roadmap

- GIS Integration: interactive mapping for project sites across Luanda, Soyo, Cabinda, and other regions.
- 3D BIM Visualization: browser-based rendering of 3D construction and architectural models.
- Enterprise Admin CMS: authenticated content management with Firebase Auth, Firestore rules, and controlled S3 uploads.
- AI/LLM Assistant: RAG-based search over project documents, site reports, and technical specifications.
- Computer Vision: automated tagging and progress verification for QHSE and construction milestone tracking.

## Why This Repository Matters

This project demonstrates how frontend engineering, cloud data modeling, construction-domain knowledge, and performance architecture can come together in a practical technical showcase. The result is a portfolio system that communicates both engineering delivery experience and full-stack implementation judgment.
