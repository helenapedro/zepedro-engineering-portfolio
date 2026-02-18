# ZePedro React App

React single-page portfolio application that showcases projects, education, certificates, and profile information.

## Tech Stack

- React 18 (`react-scripts`)
- React Router v6
- Firebase Firestore (client-side reads)
- Bootstrap / React-Bootstrap

## Requirements

- Node.js `20.x`
- npm (bundled with Node)

## Installation

```bash
npm install
```

## Available Scripts

- `npm run dev`: starts the React development server.
- `npm run build`: creates production build in `build/`.
- `npm start`: serves the production build from `build/`.
- `npm test`: runs tests.
- `npm run clean`: removes `build/`.

## Environment Variables

Create `.env.local` in the project root:

```bash
REACT_APP_BASE_URL=http://localhost:3000/

REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_MEASUREMENT_ID=...
```

## App Routes

- `/`: projects landing page
- `/projects/:id`: project details
- `/education`: certificates and education section
- `/about`: about page
- `*`: not found page

## Data Layer and Caching

Firestore/JSON reads are handled by reusable hooks and utilities:

- `src/Hooks/useData.js`
- `src/Hooks/homeData.js`
- `src/Hooks/useProjectDevData.jsx`
- `src/Hooks/fetchProjectsByCategory.js`

Caching is implemented in `src/utils/cacheStore.js` with:

- In-memory cache for fast repeated reads during a session.
- `localStorage` persistence for suitable cached values.
- TTL-based expiration (`DEFAULT_CACHE_TTL_MS`, currently 1 hour).
- Memory-first lookup with persistent fallback.
- Fail-open behavior if browser storage is unavailable (app continues using memory cache).

## Notes

- This app uses Firebase Web config values in environment variables for portability.
- `npm start` serves static production files; use `npm run dev` for local development iteration.
