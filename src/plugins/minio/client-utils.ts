import {env} from "@/env/client";

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

export const generateFileUrl = (filename: string) => {
  return `${env.NEXT_PUBLIC_MINIO_PUBLIC_UPLOADS_URL}/${env.NEXT_PUBLIC_MINIO_UPLOADS_BUCKET}/${filename}`
}

