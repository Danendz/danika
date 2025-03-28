import {env} from "@/env/client";

export const buckets = {
  uploads: {
    name: env.NEXT_PUBLIC_MINIO_UPLOADS_BUCKET,
    // 1 hour
    expiry: 60 * 60
  },
} as const