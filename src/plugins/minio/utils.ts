import {buckets} from "@/plugins/minio/constants";
import {minioClient} from "@/plugins/minio/index";

export const generateUploadUrl = (filename: string) => {
  return minioClient.presignedPutObject(buckets.uploads.name, filename, buckets.uploads.expiry)
}