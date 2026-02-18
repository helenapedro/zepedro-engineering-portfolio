# ZéPedro Engineering Portfolio

A **React single-page application (SPA)** that showcases engineering projects, skills, and credentials using a serverless architecture: **Browser client -> Firebase (Firestore/Auth/Security Rules)** with CDN-hosted static assets.

---

## Local Development

## Prerequisites

- **Node.js:** `20.x`
- npm (bundled with Node)
- Firebase CLI (`npm i -g firebase-tools`) for emulator workflows

## Install

```bash
npm install
```

## Run (dev server)

```bash
npm run dev
```

## Production build

```bash
npm run build
npm start
```

---

## Environment Variables

Create `.env.local` (do not commit secrets):

```bash
# App base URL used for static paths
REACT_APP_BASE_URL=http://localhost:3000/

# Firebase Web config (public client config, still keep out of source for hygiene)
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

> Note: Firebase web config is not a server secret, but keeping it in env variables improves environment portability and prevents accidental hardcoding.

---

## Credits

Built and maintained by **Helena Pedro**.
Project includes React ecosystem libraries and Firebase managed services.
