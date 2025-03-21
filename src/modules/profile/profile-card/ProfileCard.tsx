"use client"

import {Avatar} from "@/components/ui/avatar";
import {trpc} from "@/trpc/client";
import React, {useRef, useState} from "react";
import {CameraIcon, PlusIcon, UploadIcon} from "lucide-react";
import {ImageAsync} from "@/components/shared/image-async/ImageAsync";
import {useUploadFile} from "@/hooks/useUploadFile";
import {ProfileCardLoader} from "@/modules/profile/profile-card/ProfileCardLoader";
import {ProfileCardError} from "@/modules/profile/profile-card/ProfileCardError";
import {Button} from "@/components/ui/button";
import {DEFAULT_ASSETS} from "@/constants/default-assets";

export const ProfileCard = () => {
  const {data, isLoading, isError} = trpc.user.getCurrent.useQuery()
  const {
    data: defaultBackground,
    isLoading: defaultBackgroundLoading,
  } = trpc.defaultAsset.getDefaultAsset.useQuery({key: DEFAULT_ASSETS.defaultUserBackground})
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

  if (isLoading || defaultBackgroundLoading) {
    return <ProfileCardLoader/>
  }

  if (isError || !data) {
    return <ProfileCardError/>
  }

  const backgroundImage = data.background_picture ?? defaultBackground?.url ?? 'no-image'

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
    <div className="flex flex-col w-full justify-center">
      <input ref={fileInputRef} type="file" name="avatar input" className="hidden" onChange={onFileInputChange}/>
      <div className="relative flex-1">
        <div className="h-[180px]">
          <ImageAsync
            isLoading={isBackgroundUploading}
            className="object-cover rounded-b-md"
            src={backgroundImage}
            width={1000}
            height={800}
            priority={true}
            alt="user background"/>
        </div>
        <CameraIcon className="absolute text-white bottom-2 right-2" onClick={() => onImageChangeClick('background')}/>
        <div className="flex gap-1.5 absolute md:-left-1 -bottom-9 z-10 left-0">
          <Avatar className="relative w-[100px] h-[100px] shadow-2xl">
            <ImageAsync
              isLoading={isAvatarUploading}
              className="object-cover"
              src={data.picture ?? 'no-image'}
              alt="user avatar"
              width={100}
              height={100}
            />
            <div
              onClick={() => onImageChangeClick('avatar')}
              className="flex justify-center items-center absolute bg-slate-700 w-full h-full opacity-0 hover:opacity-90 active:opacity-100 duration-200 cursor-pointer">
              <UploadIcon color="white"/>
            </div>
          </Avatar>
          <div className="flex flex-col drop-shadow-lg pt-1 w-[calc(100vw-150px)] max-w-[400px]">
            <span className="text-2xl font-bold">{data.name}</span>
            <span className="font-medium truncate">Danika ID: {data.user_id}</span>
            <div className="pt-2">
              <Button size="xsm">
                <PlusIcon/>
                <div style={{lineHeight: 'normal'}}>Status</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}