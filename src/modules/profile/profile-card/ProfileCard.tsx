"use client"

import {Avatar} from "@/components/ui/avatar";
import {trpc} from "@/trpc/client";
import React, {useRef, useState} from "react";
import {generateFileUrl} from "@/plugins/minio/client-utils";
import {CameraIcon, UploadIcon} from "lucide-react";
import {ImageAsync} from "@/components/shared/image-async/ImageAsync";
import {useUploadFile} from "@/hooks/useUploadFile";

export const ProfileCard = () => {
  const [data] = trpc.user.getCurrent.useSuspenseQuery()
  const trpcUtils = trpc.useUtils()
  const [uploadType, setUploadType] = useState<'avatar' | 'background'>()
  const updateProfilePictureMutation = trpc.user.updatePicture.useMutation()
  const updateProfileBackgroundPictureMutation = trpc.user.updateBackgroundPicture.useMutation()

  const [isAvatarUploading, onAvatarInputChanged] = useUploadFile(async (filename) => {
    const res = await updateProfilePictureMutation.mutateAsync({filename})
    trpcUtils.user.getCurrent.setData(undefined, res)
  })

  const [isBackgroundUploading, onBackgroundInputChanged] = useUploadFile(async (filename) => {
    const res = await updateProfileBackgroundPictureMutation.mutateAsync({filename})
    trpcUtils.user.getCurrent.setData(undefined, res)
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const defaultBackgroundImage = generateFileUrl('uploads', 'default-bg.jpg')

  const backgroundImage = data.background_picture ?? defaultBackgroundImage

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadType === 'background') {
      onBackgroundInputChanged(e)
    } else {
      onAvatarInputChanged(e)
    }
  }

  const onImageChangeClick = (type: 'avatar' | 'background') => {
    if (!fileInputRef.current || isBackgroundUploading || isAvatarUploading) return

    setUploadType(type)

    fileInputRef.current.click()
  }

  return (
    <div className="flex w-full justify-center">
      <input ref={fileInputRef} type="file" name="avatar input" className="hidden" onChange={onFileInputChange}/>
      <div className="relative w-full">
        <div className="w-full h-[180px]">
          <ImageAsync
            isLoading={isBackgroundUploading}
            className="w-full h-full object-cover rounded-b-md"
            src={backgroundImage}
            width={1000}
            height={800}
            alt="user background"/>
        </div>
        <CameraIcon className="absolute text-white bottom-2 right-2" onClick={() => onImageChangeClick('background')}/>
        <div className="absolute left-[50%] -bottom-7 z-10 translate-x-[-50%]">
          <Avatar className="relative w-[100px] h-[100px]">
            {data.picture ?
              <ImageAsync
                isLoading={isAvatarUploading}
                className="w-full h-full object-cover"
                src={data.picture}
                alt="user avatar"
                width={100}
                height={100}
              /> : data.username}
            <div
              onClick={() => onImageChangeClick('avatar')}
              className="flex justify-center items-center absolute bg-slate-600/30 w-full h-full opacity-0 hover:opacity-80 active:opacity-100 duration-200 cursor-pointer">
              <UploadIcon color="white"/>
            </div>
          </Avatar>
        </div>
      </div>
    </div>
  )
}