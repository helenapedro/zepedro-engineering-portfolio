# S3 Presigned Upload Lambda

This Lambda signs direct browser uploads from the Admin CMS to AWS S3.

The React app never receives AWS credentials. It sends the Firebase ID token to this function, the function verifies the user, checks `admins/{uid}` in Firestore, and returns temporary S3 `PUT` upload URLs.

## Environment Variables

```bash
AWS_REGION=us-east-1
S3_BUCKET=your-s3-bucket-name
PUBLIC_ASSET_BASE_URL=https://your-cloudfront-domain.example.com
FIREBASE_PROJECT_ID=portfolio-backend-d4da0
ALLOWED_ORIGIN=https://zepedro-portfolio.hmpedro.com
MAX_UPLOAD_BYTES=15728640
URL_TTL_SECONDS=300
```

For local/dev testing, `ALLOWED_ORIGIN` can be `http://localhost:3000`.

## Request

```http
POST /admin/s3-presign
Authorization: Bearer <firebase-id-token>
Content-Type: application/json
```

```json
{
  "projectId": "construction-of-120-social-apartments-in-buco-zau",
  "files": [
    {
      "fileName": "site-photo.jpg",
      "contentType": "image/jpeg",
      "size": 2400000
    }
  ]
}
```

## Response

```json
{
  "uploads": [
    {
      "method": "PUT",
      "uploadUrl": "https://s3-presigned-upload-url",
      "publicUrl": "https://cdn.example.com/projects/project-id/images/site-photo.jpg",
      "key": "projects/project-id/images/site-photo.jpg",
      "expiresIn": 300
    }
  ]
}
```

## IAM Permissions

Attach a minimal role policy to the Lambda execution role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::your-s3-bucket-name/projects/*"
    }
  ]
}
```

## S3 CORS

Configure the bucket CORS to allow browser `PUT` uploads from the portfolio domain:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT"],
    "AllowedOrigins": ["https://zepedro-portfolio.hmpedro.com", "http://localhost:3000"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## Firebase Admin Auth

The Lambda uses `firebase-admin` to:

1. Verify the Firebase ID token.
2. Read `admins/{uid}` from Firestore.
3. Reject non-admin users.

Deploy it with credentials that can access Firebase Admin SDK. In production, prefer a service account injected through the Lambda environment or a secure secret manager, not a committed JSON key.
