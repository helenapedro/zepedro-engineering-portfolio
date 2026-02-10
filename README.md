# ZéPedro Engineering Portfolio

A production-minded **React single-page application (SPA)** that showcases engineering projects, skills, and credentials using a serverless architecture: **Browser client -> Firebase (Firestore/Auth/Security Rules)** with CDN-hosted static assets. This repository is intentionally designed without a traditional backend service to demonstrate practical trade-offs for low-ops systems while preserving security, scalability, and cost awareness.

For US recruiters and hiring managers: this project demonstrates ownership beyond UI implementation—**data access patterns, authorization boundaries, cloud delivery, reliability guardrails, and operational readiness** in a modern serverless stack.

---

## Architecture Summary

- **Frontend:** React 18 SPA with route-driven views (project listing, project details, education, about).
- **Data plane:** Firestore collections queried from the client using Firebase SDK.
- **AuthN/AuthZ:** Firebase Authentication (identity) + Firestore Security Rules (authorization and data boundary enforcement).
- **Static files / documents:** CDN-delivered assets via CloudFront + S3 URLs (for portfolio media and resume distribution).
- **Deployment options:**
  - Option A: Firebase Hosting for SPA hosting.
  - Option B: Prebuilt static deploy (e.g., S3 + CloudFront or equivalent static host).
- **Local parity:** Firebase Emulator Suite for rules/auth/data testing and deterministic local development.

> Assumption note: this repository currently shows CDN/S3 asset usage in configuration. If final SPA hosting is not Firebase Hosting, keep the same architecture and adapt hosting docs to your chosen static platform.

---

## System Design (Decisions and Trade-offs)

### 1) Why direct Firebase access (no custom backend)

**Decision:** Keep architecture serverless and backendless for the main read-heavy portfolio use case.

**Why this is a valid production decision:**
- Reduces infrastructure and operational overhead.
- Fast iteration cycle for content-driven applications.
- Strong managed primitives for auth, data, and rule enforcement.

**Trade-off:**
- Client must be disciplined with query design and cost controls.
- Security and authorization logic must be explicit in Firestore Rules.
- Complex business workflows may eventually justify Cloud Functions (not a full backend) for asynchronous or privileged operations.

---

### 2) Authentication and authorization model

- **Authentication:** Firebase Auth establishes user identity.
- **Authorization:** Firestore Security Rules enforce least privilege at document/collection boundaries.
- **Principle:** Treat the client as untrusted; every read/write must be rule-validated.

Recommended rule strategy:
- Public read access only for explicitly public portfolio data.
- Write access restricted to owner/admin identities.
- Validate schema-critical fields (`title`, `categoryId`, allowed array sizes, etc.) at rule level where feasible.
- Separate public and private document paths to avoid accidental overexposure.

---

### 3) Read scalability: query filtering, cursor pagination, indexes

For large project catalogs, avoid loading entire collections then filtering client-side.

Use:
- **Query-based filtering** (`where("categoryId", "==", value)`).
- **Cursor pagination** (`orderBy + startAfter + limit`) instead of offset-like patterns.
- **Composite indexes** for common query combinations.

Example query shape:
- `projects` by `categoryId` + `updatedAt desc` + `limit(12)`.

Benefits:
- Lower latency and fewer reads.
- Predictable cost profile.
- Better UX on mobile/slow connections.

---

### 4) Reliability and error handling

Reliability in SPA + managed backend should be explicit:

- **UX states:** loading, empty, partial failure, retry path.
- **Friendly error mapping:** convert low-level Firebase errors to user-safe messages.
- **Retry policy:** retry only transient failures (network/unavailable), avoid retries for permission failures.
- **Graceful degradation:** render core page skeleton even when secondary modules fail.

Implementation expectations:
- Centralized error normalization utility.
- Route-level fallback boundaries for resilient rendering.
- Clear support/debug context (`request context`, `timestamp`, and redacted diagnostic hints).

---

### 5) Observability plan (without a backend)

Even with serverless direct access, observability should be first-class:

- **Error tracking:** Sentry (or equivalent) for uncaught exceptions, route errors, promise rejections.
- **Performance telemetry:** Web Vitals + route navigation timings + Firestore query timing spans.
- **Operational signals:**
  - error rate by route,
  - slow query surfaces,
  - asset load latency,
  - frontend release health by version.

Minimal production target:
- p95 route transition time,
- p95 project list render time,
- top 10 error fingerprints by release.

---

### 6) Cost-awareness strategy

Firestore cost is primarily read-driven.

Mitigations:
- Query only required fields and pages.
- Prefer cursor pagination and avoid repeated full scans.
- Cache stable metadata (categories/profile) in memory with TTL.
- Cache static assets aggressively at CDN edge.
- Track read counts in performance dashboards to detect regressions after UI changes.

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

## Firebase Emulator Workflow

Use Emulator Suite for local auth/data/rules validation.

## Typical ports

- Emulator UI: `4000`
- Auth Emulator: `9099`
- Firestore Emulator: `8080`
- Hosting Emulator (optional): `5000`

## Start emulators

```bash
firebase emulators:start
```

## Run frontend against emulators

- Ensure Firebase initialization detects local mode and points SDK to:
  - Firestore: `localhost:8080`
  - Auth: `localhost:9099`
- Then run:

```bash
npm run dev
```

---

## Testing

## 1) Unit tests

```bash
npm test -- --watchAll=false
```

## 2) Firestore Security Rules tests (Emulator)

Recommended:
- Add rules tests with `@firebase/rules-unit-testing`.
- Validate both allow and deny cases for each collection path.

Example command pattern:

```bash
firebase emulators:exec --only firestore "npm run test:rules"
```

## 3) CI-equivalent checks locally

Run before merge:

```bash
npm run build
npm test -- --watchAll=false
```

Recommended CI quality gates:
- dependency audit,
- lint/type checks,
- unit tests,
- rules tests via emulator,
- production build verification.

---

## Security

### Least-privilege rules approach

- Public read only for explicitly public documents.
- Owner/admin-only writes.
- Deny-by-default fallback.
- Rule tests required for all policy changes.

### Secrets handling

- No secrets committed to repository.
- Environment-specific values injected via `.env.local` / CI secrets.
- Use secret managers in deployment environments.

### OWASP considerations for SPA + Firebase

- Validate and sanitize user-controlled content before rendering.
- Protect against XSS via safe rendering patterns.
- Enforce auth checks at rule level (not only in UI logic).
- Apply rate-limiting and abuse protection where possible (e.g., App Check, provider controls).
- Keep dependencies patched and scanned regularly.

---

## Roadmap (No Traditional Backend Required)

1. **Query and indexing hardening**
   - Convert any client-side full-list filtering into Firestore query + cursor pagination.
   - Add composite indexes for top query patterns.

2. **Client caching strategy**
   - Add stale-while-revalidate for low-churn data (categories/profile).
   - Add explicit cache invalidation strategy for admin updates.

3. **Observability maturity**
   - Integrate Sentry + Web Vitals dashboards.
   - Add release health view by commit/version.

4. **Security/rules maturity**
   - Formalize rules test matrix (public read, unauthorized write denial, owner update allowed).
   - Add PR checklist requiring rules test updates.

5. **Optional Cloud Functions (justified use only)**
   - Use only for asynchronous or privileged workflows (e.g., media processing, audit logging fan-out), while keeping core architecture backendless.

---

## Recruiter Notes (US Market)

## What to look at first

- Routing and component composition for production-like SPA flows.
- Firestore integration patterns and query boundaries.
- Cloud asset delivery integration (CDN + object storage).
- Documentation of trade-offs, reliability, and cost controls.

## Skills this project demonstrates

- Serverless architecture decisions under real constraints.
- Auth + authorization boundary design (Firebase Auth + Rules).
- Read scalability and cost-aware data access.
- Production mindset in frontend systems: observability, reliability, release discipline.

## Strong interview talking points

- Why direct Firebase was selected and where the boundary is.
- How rule design prevents unauthorized access despite direct client data access.
- How pagination/index strategy reduces reads and improves p95 latency.
- How you would evolve with Cloud Functions without introducing a full backend.

---

## License

No license file is currently defined in this repository.
If open-source distribution is intended, add an explicit `LICENSE` (e.g., MIT/Apache-2.0).

---

## Credits

Built and maintained by **Helena Pedro**.
Project includes React ecosystem libraries and Firebase managed services.
