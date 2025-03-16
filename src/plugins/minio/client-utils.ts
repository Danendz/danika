import {buckets} from "@/plugins/minio/constants";

export const uploadFileMinio = async (url: string, file: File) => {
  const res = await fetch(url, {
    method: 'PUT',
    body: file
  })

  if (!res.ok) {
    throw new Error('Failed to upload file')
  }

  return res
}

export const generateFileUrl = (bucket: keyof typeof buckets, filename: string) => {
  return `${process.env.NEXT_PUBLIC_MINIO_PUBLIC_UPLOADS_URL}/${filename}`
}

