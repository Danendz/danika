import * as Minio from 'minio'

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT!,
  port: parseInt(process.env.MINIO_PORT!),
  useSSL: true,
  accessKey: process.env.MINIO_USER,
  secretKey: process.env.MINIO_PASSWORD,
})