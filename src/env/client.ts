import {createEnv} from '@t3-oss/env-nextjs'
import {z} from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_MINIO_PUBLIC_UPLOADS_URL: z.string().min(1),
    NEXT_PUBLIC_MINIO_UPLOADS_BUCKET: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_MINIO_PUBLIC_UPLOADS_URL: process.env.NEXT_PUBLIC_MINIO_PUBLIC_UPLOADS_URL,
    NEXT_PUBLIC_MINIO_UPLOADS_BUCKET: process.env.NEXT_PUBLIC_MINIO_UPLOADS_BUCKET
  }
})
