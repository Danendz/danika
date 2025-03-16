import {buckets} from "@/plugins/minio/constants";
import {minioClient} from "@/plugins/minio/index";

export const generateFileUrl = (bucket: keyof typeof buckets, filename: string) => {
  return `${process.env.MINIO_PUBLIC_UPLOADS_URL}/${filename}`
}

export const generateUploadUrl = (filename: string) => {
  return minioClient.presignedPutObject(buckets.uploads.name, filename, buckets.uploads.expiry)
}