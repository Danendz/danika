"use client"

import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {trpc} from "@/trpc/client";
import React, {useTransition} from "react";
import {uploadFileMinio} from "@/plugins/minio/client-utils";

export const ProfileCard = () => {
  const [data] = trpc.user.getCurrent.useSuspenseQuery()
  const trpcUtils = trpc.useUtils()
  const uploadFileMutation = trpc.file.generateUploadUrl.useMutation()
  const updateProfilePictureMutation = trpc.user.updatePicture.useMutation()
  const [isPending, startTransition] = useTransition()

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]

    if (!file) return

    startTransition(async () => {
      const {url, filename} = await uploadFileMutation.mutateAsync({filename: file.name})
      await uploadFileMinio(url, file)
      const res = await updateProfilePictureMutation.mutateAsync({filename})
      trpcUtils.user.getCurrent.setData(undefined, res)
    })
  }

  return (
    <div>
      {isPending ? <div>Loading</div> : <div></div>}
      <input type="file" onChange={uploadFile} />
      <Avatar>
        {data.picture ? <AvatarImage src={data.picture} /> : data.username}
      </Avatar>
    </div>
  )
}