import {ReactNode} from "react";
import {ChevronRightIcon} from "lucide-react";
import {SettingMenuActionValue} from "@/modules/profile/profile-menu/menu-dialogs/settings/types";

interface Props {
  title: string
  children?: ReactNode
  actionValue: SettingMenuActionValue
  action: (action: SettingMenuActionValue) => void
}

export default function SettingsMenuItem({children, title, action, actionValue}: Props) {
  return (
    <div className="flex justify-between items-center cursor-pointer" onClick={() => action(actionValue)}>
      <span>{title}</span>

      <div className="flex gap-1 items-center">
        {children}
        <div>
          <ChevronRightIcon size={20}/>
        </div>
      </div>
    </div>
  )
}