import "dotenv/config";
import { readFileSync } from "node:fs";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  writeBatch,
  Timestamp,
} from "firebase/firestore";

const INPUT_PATH = process.argv[2] || "projects-normalized-export.json";
const shouldCommit = process.argv.includes("--commit");

const requiredEnv = [
  "REACT_APP_FIREBASE_API_KEY",
  "REACT_APP_FIREBASE_AUTH_DOMAIN",
  "REACT_APP_FIREBASE_PROJECT_ID",
  "REACT_APP_FIREBASE_STORAGE_BUCKET",
  "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  "REACT_APP_FIREBASE_APP_ID",
];

const missing = requiredEnv.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function toFirestoreValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => toFirestoreValue(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if (
    value.type === "firestore/timestamp/1.0" &&
    Number.isFinite(value.seconds) &&
    Number.isFinite(value.nanoseconds)
  ) {
    return new Timestamp(value.seconds, value.nanoseconds);
  }

  const out = {};
  for (const [key, val] of Object.entries(value)) {
    out[key] = toFirestoreValue(val);
  }
  return out;
}

function sanitizeDocForWrite(project) {
  const clone = toFirestoreValue(project);
  const { id, ...data } = clone;
  return { id: String(id || "").trim(), data };
}

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

const raw = JSON.parse(readFileSync(INPUT_PATH, "utf-8"));
const projects = Array.isArray(raw.projects) ? raw.projects : [];

const normalized = projects.map(sanitizeDocForWrite);
const invalid = normalized.filter((p) => !p.id);
const valid = normalized.filter((p) => p.id);

const summary = {
  inputPath: INPUT_PATH,
  totalInFile: projects.length,
  validDocs: valid.length,
  invalidDocs: invalid.length,
  mode: shouldCommit ? "commit" : "dry-run",
};

console.log("Import summary:");
console.log(JSON.stringify(summary, null, 2));

if (invalid.length > 0) {
  console.log("Invalid docs (missing id):");
  console.log(invalid.map((p) => p.id || "<empty>").join("\n"));
}

if (!shouldCommit) {
  console.log("Dry-run only. Re-run with --commit to write to Firestore.");
  process.exit(0);
}

const BATCH_LIMIT = 450;
const groups = chunk(valid, BATCH_LIMIT);

for (let i = 0; i < groups.length; i += 1) {
  const group = groups[i];
  const batch = writeBatch(db);

  for (const item of group) {
    const ref = doc(collection(db, "projects"), item.id);
    batch.set(ref, item.data, { merge: true });
  }

  await batch.commit();
  console.log(`Committed batch ${i + 1}/${groups.length} (${group.length} docs)`);
}

console.log(`Done. Upserted ${valid.length} project docs into 'projects'.`);
