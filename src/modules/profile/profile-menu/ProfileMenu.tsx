"use client";

import {Button} from "@/components/ui/button";
import {
  ActivityIcon,
  BookIcon,
  ChevronRightIcon, LogOutIcon,
  SettingsIcon, UsersIcon
} from "lucide-react";
import {signOut} from "next-auth/react";
import {useState} from "react";
import FriendsDialog from "@/modules/profile/profile-menu/menu-dialogs/Friends/FriendsDialog";
import DrawerDialog from "@/components/Dialog/DrawerDialog";

export const ProfileMenu = () => {
  const [showFriendsDialog, setFriendsDialog] = useState(false)

  const menuItems = [
    {
      type: 'me',
      children: [
        {
          name: "Friends",
          Icon: UsersIcon,
          action: () => {
            setFriendsDialog(true)
          }
        },
        {
          name: 'Favorites',
          Icon: BookIcon
        },
        {
          name: 'My posts',
          Icon: ActivityIcon
        }
      ]
    },
    {
      type: 'settings',
      children: [
        {
          name: 'Settings',
          Icon: SettingsIcon
        },
        {
          name: 'Logout',
          Icon: LogOutIcon,
          action: () => {
            void signOut()
          }
        }
      ]
    },
  ]

  return (
    <>
      <DrawerDialog isDialogVisible={showFriendsDialog} setIsDialogVisible={setFriendsDialog}>
        <FriendsDialog showFriendsDialog={showFriendsDialog} />
      </DrawerDialog>
      <div className="flex flex-col gap-4 justify-center md:justify-start mt-13">
        {menuItems.map(({type, children}) => (
          <div key={type}
               className="flex flex-col gap-1 w-full md:border-y-0 border-y-1 max-w-[100vw] md:max-w-[300px]">
            {children.map(({name, Icon, action}) => (
              <Button onClick={action} key={name} variant="ghost" className="w-full justify-start rounded-none">
                <Icon/>{name}<ChevronRightIcon className="ms-auto"/>
              </Button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}