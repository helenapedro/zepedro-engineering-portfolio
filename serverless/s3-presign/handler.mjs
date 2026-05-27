import { randomUUID } from "node:crypto";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import admin from "firebase-admin";

const {
  AWS_REGION,
  S3_BUCKET,
  PUBLIC_ASSET_BASE_URL,
  ALLOWED_ORIGIN = "*",
  FIREBASE_PROJECT_ID,
  MAX_UPLOAD_BYTES = "15728640",
  URL_TTL_SECONDS = "300",
} = process.env;

const maxUploadBytes = Number(MAX_UPLOAD_BYTES);
const urlTtlSeconds = Number(URL_TTL_SECONDS);
const s3 = new S3Client({ region: AWS_REGION });

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: FIREBASE_PROJECT_ID,
  });
}

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "authorization,content-type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);

const parseBody = (event) => {
  if (!event.body) return {};
  const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
  return JSON.parse(raw);
};

const getBearerToken = (event) => {
  const headers = event.headers || {};
  const authorization = headers.authorization || headers.Authorization || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
};

const assertAdmin = async (event) => {
  const token = getBearerToken(event);
  if (!token) throw Object.assign(new Error("Missing Firebase ID token."), { statusCode: 401 });

  const decoded = await admin.auth().verifyIdToken(token);
  const adminDoc = await admin.firestore().doc(`admins/${decoded.uid}`).get();

  if (!adminDoc.exists) {
    throw Object.assign(new Error("Authenticated user is not an admin."), { statusCode: 403 });
  }

  return decoded;
};

const validateFile = (file) => {
  const fileName = String(file.fileName || "").trim();
  const contentType = String(file.contentType || "application/octet-stream").trim();
  const size = Number(file.size || 0);

  if (!fileName) throw new Error("Each upload requires fileName.");
  if (!contentType.startsWith("image/")) throw new Error(`${fileName} is not an image.`);
  if (!Number.isFinite(size) || size <= 0) throw new Error(`${fileName} has an invalid size.`);
  if (size > maxUploadBytes) throw new Error(`${fileName} exceeds the upload size limit.`);

  return { fileName, contentType, size };
};

const makeObjectKey = ({ projectId, fileName }) => {
  const extension = path.extname(fileName).toLowerCase();
  const baseName = slugify(path.basename(fileName, extension)) || "image";
  const safeProjectId = slugify(projectId);
  const uniqueName = `${Date.now()}-${randomUUID()}-${baseName}${extension}`;

  return `projects/${safeProjectId}/images/${uniqueName}`;
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS" || event.httpMethod === "OPTIONS") {
    return json(204, {});
  }

  if ((event.requestContext?.http?.method || event.httpMethod) !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  try {
    if (!AWS_REGION || !S3_BUCKET || !PUBLIC_ASSET_BASE_URL) {
      return json(500, { error: "Missing AWS_REGION, S3_BUCKET, or PUBLIC_ASSET_BASE_URL." });
    }

    await assertAdmin(event);
    const body = parseBody(event);
    const projectId = slugify(body.projectId);
    const files = Array.isArray(body.files) ? body.files : [];

    if (!projectId) return json(400, { error: "projectId is required." });
    if (!files.length) return json(400, { error: "files array is required." });

    const uploads = await Promise.all(
      files.map(async (rawFile) => {
        const file = validateFile(rawFile);
        const key = makeObjectKey({ projectId, fileName: file.fileName });
        const command = new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: key,
          ContentType: file.contentType,
          CacheControl: "public, max-age=31536000, immutable",
        });

        const uploadUrl = await getSignedUrl(s3, command, { expiresIn: urlTtlSeconds });
        const publicBase = PUBLIC_ASSET_BASE_URL.replace(/\/+$/, "");

        return {
          method: "PUT",
          uploadUrl,
          publicUrl: `${publicBase}/${key}`,
          key,
          expiresIn: urlTtlSeconds,
        };
      })
    );

    return json(200, { uploads });
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return json(statusCode, { error: error.message || "Unable to create S3 upload URL." });
  }
};
