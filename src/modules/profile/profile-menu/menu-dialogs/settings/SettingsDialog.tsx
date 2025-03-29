import {DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {trpc} from "@/trpc/client";
import {ImageAsync} from "@/components/shared/image-async/ImageAsync";
import SettingsMenuItem from "@/modules/profile/profile-menu/menu-dialogs/settings/SettingsMenuItem";
import {SettingMenuActionValue} from "@/modules/profile/profile-menu/menu-dialogs/settings/types";

export default function SettingsDialog() {
  const {data, isLoading, isError} = trpc.user.getCurrent.useQuery()

  if (isLoading) {
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">Loading...</div>
      </DrawerContent>
    )
  }

  if (!data || isError) {
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">Something went wrong...</div>
      </DrawerContent>
    )
  }

  const makeAction = (action: SettingMenuActionValue) => {

  }

  return (
    <>
      <DrawerContent className="h-[100vh]">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className="pl-4 pr-1">
          <SettingsMenuItem title="Profile photo" actionValue="change-photo" action={makeAction}>
            <div className="w-15 h-15 ">
              <ImageAsync src={data.picture ?? 'no-image'} alt={"profile image"} className="object-cover rounded"
                          width={100} height={100}/>
            </div>
          </SettingsMenuItem>
        </div>
      </DrawerContent>
    </>
  )
}