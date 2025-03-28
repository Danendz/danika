import {minioClient} from "@/plugins/minio/index";
import {buckets} from "@/plugins/minio/constants";

export const generateUploadUrl = (filename: string) => {
  return minioClient.presignedPutObject(buckets.uploads.name, filename, buckets.uploads.expiry)
}