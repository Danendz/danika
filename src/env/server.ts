import {createEnv} from '@t3-oss/env-nextjs'
import {z} from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_TRUST_HOST: z.literal('true'),
    DATABASE_URL: z.string().min(1),
    MINIO_ENDPOINT: z.string().min(1),
    MINIO_PORT: z.string().min(2),
    MINIO_USER: z.string().min(3),
    MINIO_PASSWORD: z.string().min(3),
    SERWIST_SUPPRESS_TURBOPACK_WARNING: z.union([
      z.literal('1'),
      z.literal('0')
    ]),
    APP_ENV: z.union([
      z.literal('development'),
      z.literal('production')
    ])
  },
  experimental__runtimeEnv: process.env
})
