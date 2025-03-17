export const buckets = {
  uploads: {
    name: process.env.MINIO_UPLOADS_BUCKET ?? 'uploads',
    // 1 hour
    expiry: 60 * 60
  },
} as const