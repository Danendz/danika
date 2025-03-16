import { trpc } from "@/trpc/client"
import React, {useTransition} from "react";
import {uploadFileMinio} from "@/plugins/minio/client-utils";

export const useUploadFile = (callback: (filename: string) => Promise<void>) => {
  const uploadFileMutation = trpc.file.generateUploadUrl.useMutation()
  const [isPending, startTransition] = useTransition()

  const onFileInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]

    if (!file) return

    if (file.size)

    startTransition(async () => {
      const {url, filename} = await uploadFileMutation.mutateAsync({filename: file.name})
      await uploadFileMinio(url, file)
      await callback(filename)
    })
  }

  return [isPending, onFileInputChanged] as const
}