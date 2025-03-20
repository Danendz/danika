"use client";

import {Button} from "@/components/ui/button";
import {
  ActivityIcon,
  BookIcon,
  ChevronRightIcon, LogOutIcon,
  SettingsIcon
} from "lucide-react";
import {signOut} from "next-auth/react";

export const ProfileMenu = () => {
  const menuItems = [
    {
      type: 'services',
      children: [
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
    <div className="flex flex-col gap-4 justify-center md:justify-start mt-13">
      {menuItems.map(({type, children}) => (
        <div key={type} className="flex flex-col gap-1 w-full md:border-y-0 border-y-1 max-w-[100vw] md:max-w-[300px]">
          {children.map(({name, Icon, action}) => (
            <Button onClick={action} key={name} variant="ghost" className="w-full justify-start rounded-none">
              <Icon/>{name}<ChevronRightIcon className="ms-auto"/>
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}