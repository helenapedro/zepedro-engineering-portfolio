# ZéPedro Engineering Portfolio

Personal portfolio web app built with React.

This project displays projects, profile information, skills, and education content in a single-page application with client-side routing. Data is loaded directly from Firebase Firestore, and some static assets/documents are referenced from CloudFront and S3 URLs configured in the app.

## What this project does

- Shows a project list on the home route (`/`).
- Allows opening a project details page (`/projects/:id`).
- Provides category filtering and pagination on the projects list.
- Shows additional pages for education (`/education`) and about (`/about`).
- Displays image carousels and modal previews for project images.

## Tech stack used in this repository

- React 18
- React Router
- Firebase Firestore (client SDK)
- React Bootstrap + CSS modules
- react-slick (project image carousel)

## Project structure (high level)

- `src/App.js` — app routes and top-level layout.
- `src/pages/projects/ProjectContainer.jsx` — project list, filters, pagination, modal.
- `src/components/Project/ProjectDetailsCard.jsx` — project details loader/view.
- `src/Hooks/useData.js` — generic Firestore fetch hook used across views.
- `src/components/Skills/SkillsTable.jsx` — skills table loaded from Firestore.
- `src/config.jsx` — configured URLs (including CloudFront/S3 links).

## Data and infrastructure currently referenced

- Firestore collections are queried directly from the frontend.
- Resume/document URL points to S3.
- Project media base URL references CloudFront.

## Local development

### Requirements

- Node.js `20.x`
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Serve production build

```bash
npm start
```

## Environment variables

Create `.env.local`:

```bash
REACT_APP_BASE_URL=http://localhost:3000/
```

If your local setup uses Firebase config from env, also define the Firebase web config variables expected by your local `firebase` initialization file.

## Firebase emulator (optional)

If you have Firebase CLI and emulator config in your local setup:

```bash
firebase emulators:start
```

Typical ports:

- Emulator UI: `4000`
- Auth emulator: `9099`
- Firestore emulator: `8080`

## Notes about current repository state

- This repo imports a local `firebase` module from multiple files; ensure your local project includes that file/config.
- In this container snapshot, `npm run build` fails because `public/index.html` is missing.

## License

No license file is currently included.
