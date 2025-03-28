import * as Minio from 'minio'
import {env} from "@/env/server";

export const minioClient = new Minio.Client({
  endPoint: env.MINIO_ENDPOINT,
  port: parseInt(env.MINIO_PORT),
  useSSL: true,
  accessKey: env.MINIO_USER,
  secretKey: env.MINIO_PASSWORD,
})